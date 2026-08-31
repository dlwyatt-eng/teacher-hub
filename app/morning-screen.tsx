"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import {
  MAX_MORNING_ITEMS,
  MORNING_ACTIVITY_BANK,
  MORNING_SCREEN_TIME_ZONE,
  createMorningScreenDraft,
  draftFromMorningScreen,
  getMorningActivity,
  getMorningScreenServerSnapshot,
  getMorningScreenSnapshot,
  parseMorningScreenDraft,
  publishMorningScreen,
  subscribeMorningScreen,
  vancouverDateKey,
  type MorningActivity,
  type MorningActivityId,
  type MorningScreenDraft,
  type MorningScreenItem,
  type MorningSource,
  type MorningWeather,
} from "./morning-screen-state";
import {
  getDailyLaunchServerSnapshot,
  getDailyLaunchSnapshot,
  subscribeDailyLaunch,
  type DailyLaunch,
} from "./daily-launch";
import "./morning-screen.css";

export type MorningTimelineItem = {
  time: string;
  label: string;
};

export type MorningScreenProps = {
  audience: "teacher" | "student";
  onOpenHome: () => void;
  timeline?: readonly MorningTimelineItem[];
};

type SchoolCandidate = {
  category: "announcement" | "event";
  text: string;
  source: MorningSource;
};

type DraftResponse = {
  date: string;
  partial: boolean;
  weather: MorningWeather | null;
  schoolCandidates: SchoolCandidate[];
  suggestedActivityId: MorningActivityId;
  suggestedActivityPrompt: string;
  warnings: string[];
};

function displayDate(date: string) {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: MORNING_SCREEN_TIME_ZONE,
  }).format(new Date(`${date}T12:00:00Z`));
}

function displayFetchedAt(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: MORNING_SCREEN_TIME_ZONE,
    timeZoneName: "short",
  }).format(new Date(value));
}

function safeTimeline(timeline: readonly MorningTimelineItem[] | undefined) {
  return (timeline ?? []).slice(0, 8).flatMap((item) => {
    const time = typeof item?.time === "string" ? item.time.replace(/[<>]/g, "").trim().slice(0, 14) : "";
    const label = typeof item?.label === "string" ? item.label.replace(/[<>]/g, "").trim().slice(0, 64) : "";
    return time && label ? [{ time, label }] : [];
  });
}

function readSource(value: unknown, kind: MorningSource["kind"]): MorningSource | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const source = value as Record<string, unknown>;
  const expectedUrl = kind === "school" ? "https://www.surreyschools.ca/walnutroad" : "https://open-meteo.com/";
  if (source.kind !== kind || source.url !== expectedUrl || typeof source.label !== "string" || typeof source.fetchedAt !== "string") return null;
  if (!Number.isFinite(Date.parse(source.fetchedAt))) return null;
  return {
    kind,
    url: expectedUrl,
    label: source.label.replace(/[<>]/g, "").trim().slice(0, 80),
    fetchedAt: new Date(source.fetchedAt).toISOString(),
  };
}

function readDraftResponse(value: unknown, date: string): DraftResponse | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (record.date !== date || !MORNING_ACTIVITY_BANK.some((activity) => activity.id === record.suggestedActivityId)) return null;
  const candidates: SchoolCandidate[] = [];
  if (Array.isArray(record.schoolCandidates)) {
    for (const item of record.schoolCandidates.slice(0, MAX_MORNING_ITEMS * 2)) {
      if (!item || typeof item !== "object" || Array.isArray(item)) continue;
      const candidate = item as Record<string, unknown>;
      if (candidate.category !== "announcement" && candidate.category !== "event") continue;
      const candidateText = typeof candidate.text === "string" ? candidate.text.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 160) : "";
      const source = readSource(candidate.source, "school");
      if (candidateText && source) candidates.push({ category: candidate.category, text: candidateText, source });
    }
  }

  let weather: MorningWeather | null = null;
  if (record.weather && typeof record.weather === "object" && !Array.isArray(record.weather)) {
    const raw = record.weather as Record<string, unknown>;
    const source = readSource(raw.source, "weather");
    const summary = typeof raw.summary === "string" ? raw.summary.replace(/[<>]/g, "").trim().slice(0, 80) : "";
    if (source && summary) {
      const numberOrNull = (field: "highC" | "lowC" | "rainChance") => typeof raw[field] === "number" && Number.isFinite(raw[field]) ? Math.round(raw[field]) : null;
      weather = {
        summary,
        highC: numberOrNull("highC"),
        lowC: numberOrNull("lowC"),
        rainChance: numberOrNull("rainChance"),
        source,
      };
    }
  }

  return {
    date,
    partial: record.partial === true,
    weather,
    schoolCandidates: candidates,
    suggestedActivityId: record.suggestedActivityId as MorningActivityId,
    suggestedActivityPrompt: typeof record.suggestedActivityPrompt === "string"
      ? record.suggestedActivityPrompt.replace(/[<>]/g, "").trim().slice(0, 360)
      : getMorningActivity(record.suggestedActivityId as MorningActivityId).prompt,
    warnings: Array.isArray(record.warnings)
      ? record.warnings.flatMap((warning) => typeof warning === "string" ? [warning.replace(/[<>]/g, "").trim().slice(0, 180)] : []).slice(0, 3)
      : [],
  };
}

function WeatherLine({ weather }: { weather: MorningWeather | null }) {
  if (!weather) return <span className="morning-weather-empty">Weather not published</span>;
  return <>
    <strong>{weather.summary}</strong>
    {weather.highC !== null && <span>High {weather.highC}°</span>}
    {weather.lowC !== null && <span>Low {weather.lowC}°</span>}
    {weather.rainChance !== null && <span>{weather.rainChance}% rain</span>}
  </>;
}

function SourceNote({ source, prefix = "Source" }: { source: MorningSource; prefix?: string }) {
  return <small className="morning-source-note">
    {prefix}: <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a> · fetched {displayFetchedAt(source.fetchedAt)}
  </small>;
}

function MorningActivityVisual({ activity, compact = false }: { activity: MorningActivity; compact?: boolean }) {
  if (activity.id === "number-puzzle") return <div className={`morning-turn-composer${compact ? " compact" : ""}`} role="img" aria-label="A full 360 degree turn split into eight equal 45 degree sectors, with 45, 90, and 180 degree reference turns">
    <svg viewBox="0 0 640 420" aria-hidden="true">
      <circle cx="250" cy="210" r="156" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const radians = angle * Math.PI / 180;
        return <line key={angle} x1="250" y1="210" x2={250 + Math.cos(radians) * 156} y2={210 + Math.sin(radians) * 156} />;
      })}
      <circle className="morning-turn-composer__centre" cx="250" cy="210" r="60" />
      <text x="250" y="201" textAnchor="middle">FULL TURN</text>
      <text className="morning-turn-composer__total" x="250" y="234" textAnchor="middle">360°</text>
      <path className="morning-turn-composer__arc" d="M 406 210 A 156 156 0 0 1 360 320" />
      <text className="morning-turn-composer__sector" x="375" y="268">45°</text>
      <g className="morning-turn-composer__anchors">
        <rect x="455" y="75" width="150" height="70" rx="14" />
        <text x="530" y="105" textAnchor="middle">SQUARE CORNER</text><text x="530" y="132" textAnchor="middle">90°</text>
        <rect x="455" y="175" width="150" height="70" rx="14" />
        <text x="530" y="205" textAnchor="middle">STRAIGHT TURN</text><text x="530" y="232" textAnchor="middle">180°</text>
        <rect x="455" y="275" width="150" height="70" rx="14" />
        <text x="530" y="305" textAnchor="middle">ONE SECTOR</text><text x="530" y="332" textAnchor="middle">45°</text>
      </g>
    </svg>
    <strong>Combine the three reference turns in more than one way.</strong>
  </div>;
  if (!activity.sourceCard) return <img src={activity.imageSrc} alt={activity.imageAlt} />;
  return <div className={`morning-source-card${compact ? " compact" : ""}`}>
    <small>{activity.sourceCard.label}</small>
    <blockquote>“{activity.sourceCard.text}”</blockquote>
    <cite>{activity.sourceCard.credit} · checked {activity.sourceCard.checkedOn}</cite>
    <a href={activity.sourceCard.url} target="_blank" rel="noreferrer">Open the full source ↗</a>
  </div>;
}

function MorningProjector({
  saved,
  launch,
  timeline,
  onOpenHome,
}: {
  saved: ReturnType<typeof getMorningScreenSnapshot>;
  launch: DailyLaunch | null;
  timeline: readonly MorningTimelineItem[];
  onOpenHome: () => void;
}) {
  if (!saved) {
    return <main className="morning-projector morning-projector-empty" aria-labelledby="morning-empty-title">
      <button className="morning-projector-home" type="button" onClick={onOpenHome} aria-label="Return to Classroom OS home">⌂</button>
      <div><span aria-hidden="true">☀</span><p>MORNING SCREEN</p><h1 id="morning-empty-title">Today&apos;s screen is not published yet.</h1><small>Ask your teacher to prepare and publish the Morning Screen on this classroom device.</small></div>
    </main>;
  }

  const activity = getMorningActivity(saved.activityId);
  return <main className="morning-projector" aria-labelledby="morning-projector-title" data-morning-date={saved.date}>
    <header className="morning-projector-header">
      <button className="morning-projector-home" type="button" onClick={onOpenHome} aria-label="Return to Classroom OS home">⌂</button>
      <div><small>WALNUT ROAD · GRADE 6</small><h1 id="morning-projector-title">{saved.greeting}</h1></div>
      <div className="morning-projector-date"><strong>{displayDate(saved.date)}</strong><span><WeatherLine weather={saved.weather} /></span></div>
    </header>

    <div className="morning-projector-grid">
      <section className="morning-arrival-card">
        <div className="morning-arrival-image"><MorningActivityVisual activity={activity} /></div>
        <div className="morning-arrival-copy"><small>{activity.label} · ARRIVAL CHALLENGE</small><h2>{activity.title}</h2><p>{saved.activityPrompt}</p><strong>{activity.move}</strong></div>
      </section>

      <aside className="morning-projector-rail">
        <section className="morning-shape-card"><header><small>SHAPE OF THE DAY</small><span>{timeline.length} stops</span></header>{timeline.length
          ? <ol>{timeline.map((item, index) => <li key={`${item.time}-${item.label}-${index}`}><time>{item.time}</time><strong>{item.label}</strong></li>)}</ol>
          : <p>Your teacher will talk through today&apos;s learning blocks.</p>}</section>

        <section className="morning-notice-card"><header><small>ANNOUNCEMENTS</small><span>{saved.announcements.length}</span></header>{saved.announcements.length
          ? <ul>{saved.announcements.map((item, index) => <li key={`${item.text}-${index}`}><span>{item.text}{item.source && <small>Walnut Road · checked {displayFetchedAt(item.source.fetchedAt)}</small>}</span></li>)}</ul>
          : <p>No new announcements this morning.</p>}</section>

        <section className="morning-reminder-card"><header><small>REMEMBER</small><span>{saved.reminders.length}</span></header>{saved.reminders.length
          ? <ul>{saved.reminders.map((item, index) => <li key={`${item.text}-${index}`}><span>{item.text}{item.source && <small>Walnut Road · checked {displayFetchedAt(item.source.fetchedAt)}</small>}</span></li>)}</ul>
          : <p>Bring your curiosity. We&apos;ll add reminders when needed.</p>}</section>
      </aside>
    </div>

    <footer className="morning-projector-footer">
      <div className="morning-mission-snapshot"><small>TODAY&apos;S PINNED MISSION</small>{launch
        ? <><strong>{launch.title}</strong><span>{launch.question}</span></>
        : <><strong>No mission pinned yet</strong><span>Your teacher will introduce the first learning move.</span></>}</div>
      {saved.weather && <SourceNote source={saved.weather.source} prefix="Weather" />}
    </footer>
  </main>;
}

function ItemEditor({
  title,
  hint,
  items,
  onChange,
}: {
  title: string;
  hint: string;
  items: MorningScreenItem[];
  onChange: (items: MorningScreenItem[]) => void;
}) {
  const replace = (index: number, value: string) => {
    const next = items.map((item, itemIndex) => itemIndex === index
      ? { text: value, source: value === item.text ? item.source : undefined }
      : item);
    onChange(next);
  };
  return <fieldset className="morning-item-editor">
    <legend>{title}</legend><p>{hint}</p>
    <div>{items.map((item, index) => <label key={`${title}-${index}`}><span>{index + 1}</span><input value={item.text} maxLength={160} onChange={(event) => replace(index, event.target.value)} aria-label={`${title} ${index + 1}`} /><button type="button" onClick={() => onChange(items.filter((_entry, itemIndex) => itemIndex !== index))} aria-label={`Remove ${title.toLowerCase()} ${index + 1}`}>Remove</button>{item.source && <SourceNote source={item.source} />}</label>)}</div>
    {items.length < MAX_MORNING_ITEMS && <button className="morning-add-item" type="button" onClick={() => onChange([...items, { text: "" }])}>+ Add {title.toLowerCase().replace(/s$/, "")}</button>}
  </fieldset>;
}

function MorningTeacherEditor({
  date,
  saved,
  launch,
  timeline,
  onOpenHome,
}: {
  date: string;
  saved: ReturnType<typeof getMorningScreenSnapshot>;
  launch: DailyLaunch | null;
  timeline: readonly MorningTimelineItem[];
  onOpenHome: () => void;
}) {
  const assemblyEndpoint = import.meta.env.VITE_MORNING_DRAFT_URL?.trim();
  const liveAssemblyReady = Boolean(assemblyEndpoint && /^https:\/\//i.test(assemblyEndpoint));
  const [draft, setDraft] = useState<MorningScreenDraft>(() => saved ? draftFromMorningScreen(saved) : createMorningScreenDraft(date));
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(saved ? "Published screen loaded." : "Ready to assemble.");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [weatherEdited, setWeatherEdited] = useState(false);

  const changeDraft = (next: MorningScreenDraft) => {
    setDraft(next);
    setStatus("Draft changed.");
  };

  const assembleDraft = async () => {
    setLoading(true);
    setWarnings([]);
    setStatus("Checking weather and the school site…");
    try {
      if (!liveAssemblyReady || !assemblyEndpoint) throw new Error("Draft service is not configured");
      const endpoint = new URL(assemblyEndpoint);
      endpoint.searchParams.set("date", date);
      const response = await fetch(endpoint, { cache: "no-store" });
      if (!response.ok) throw new Error("Draft service unavailable");
      const payload = readDraftResponse(await response.json(), date);
      if (!payload) throw new Error("Draft response was not valid");
      const announcements = payload.schoolCandidates.filter((item) => item.category === "announcement").slice(0, MAX_MORNING_ITEMS).map(({ text, source }) => ({ text, source }));
      const reminders = payload.schoolCandidates.filter((item) => item.category === "event").slice(0, MAX_MORNING_ITEMS).map(({ text, source }) => ({ text, source }));
      const next = parseMorningScreenDraft({
        ...draft,
        date,
        weather: payload.weather,
        announcements,
        reminders,
        activityId: payload.suggestedActivityId,
        activityPrompt: payload.suggestedActivityPrompt,
      });
      if (!next) throw new Error("Draft could not be safely assembled");
      setDraft(next);
      setWeatherEdited(false);
      setWarnings(payload.warnings);
      setStatus(payload.partial ? "Partial draft ready. Review, then publish." : "Draft ready. Review, then publish.");
    } catch {
      setWarnings(["Live sources could not be reached. The local arrival activity is still ready; add announcements yourself or try again."]);
      setStatus("Live sources unavailable. Edit manually or try again.");
    } finally {
      setLoading(false);
    }
  };

  const publish = () => {
    const result = publishMorningScreen(draft);
    setDraft(draftFromMorningScreen(result.record));
    setStatus(result.stored
      ? `Published for ${displayDate(date)} on this classroom device.`
      : "Published for this open classroom session. Browser storage is unavailable on this device.");
  };

  const activity = getMorningActivity(draft.activityId);
  const canPublish = Boolean(parseMorningScreenDraft(draft));
  const updateWeather = (field: keyof Pick<MorningWeather, "summary" | "highC" | "lowC" | "rainChance">, value: string) => {
    if (!draft.weather) return;
    const nextValue = field === "summary" ? value : value === "" ? null : Number(value);
    changeDraft({ ...draft, weather: { ...draft.weather, [field]: nextValue } });
    setWeatherEdited(true);
  };

  return <main className="morning-editor" aria-labelledby="morning-editor-title">
    <header className="morning-editor-hero">
      <button type="button" onClick={onOpenHome}>← Teacher Home</button>
      <div><p>{displayDate(date).toUpperCase()}</p><h1 id="morning-editor-title">Morning Screen</h1><span>Assemble · review · publish</span></div>
      <div className="morning-publish-state"><small>STATUS</small><strong>{saved ? `Published ${displayFetchedAt(saved.publishedAt)}` : "Not published today"}</strong></div>
    </header>

    <details className="morning-privacy-note"><summary>Student-safe screen</summary><p>Use general class wording only. Do not enter student names, attendance, birthdays, learning needs, grouping notes, passwords, join codes, or private messages.</p></details>

    <div className="morning-editor-actions">
      {liveAssemblyReady ? <button className="morning-assemble-button" type="button" disabled={loading} onClick={assembleDraft}>{loading ? "Assembling…" : "Assemble from live sources"}</button> : <span className="morning-assembly-unavailable"><b>MANUAL MODE</b> Live source assembly is not configured for this static deployment.</span>}
      <p role="status">{status}</p>
      <button className="morning-publish-button" type="button" disabled={!canPublish || loading} onClick={publish}>Publish</button>
    </div>
    {warnings.length > 0 && <div className="morning-warning-list" role="note">{warnings.map((warning) => <p key={warning}>⚠ {warning}</p>)}</div>}

    <div className="morning-editor-grid">
      <section className="morning-editor-panel morning-editor-basics">
        <header><small>1</small><h2>Greeting &amp; weather</h2></header>
        <label><span>Morning greeting</span><input value={draft.greeting} maxLength={90} onChange={(event) => changeDraft({ ...draft, greeting: event.target.value })} /></label>
        {draft.weather ? <div className="morning-weather-editor">
          <div><label><span>Forecast</span><input value={draft.weather.summary} maxLength={80} onChange={(event) => updateWeather("summary", event.target.value)} /></label><label><span>High °C</span><input type="number" min="-60" max="60" value={draft.weather.highC ?? ""} onChange={(event) => updateWeather("highC", event.target.value)} /></label><label><span>Low °C</span><input type="number" min="-60" max="60" value={draft.weather.lowC ?? ""} onChange={(event) => updateWeather("lowC", event.target.value)} /></label><label><span>Rain %</span><input type="number" min="0" max="100" value={draft.weather.rainChance ?? ""} onChange={(event) => updateWeather("rainChance", event.target.value)} /></label></div>
          <SourceNote source={draft.weather.source} prefix={weatherEdited ? "Teacher-edited forecast adapted from" : "Weather"} />
        </div> : <div className="morning-weather-missing"><span aria-hidden="true">☁</span><p><strong>No forecast in this draft.</strong> {liveAssemblyReady ? "Use live assembly, or publish without weather." : "Publish without weather; live retrieval needs a configured authenticated endpoint."}</p></div>}
      </section>

      <section className="morning-editor-panel morning-editor-activity">
        <header><small>2</small><h2>Arrival challenge</h2></header>
        <label><span>Activity</span><select value={draft.activityId} onChange={(event) => {
          const activityId = event.target.value as MorningActivityId;
          const nextActivity = getMorningActivity(activityId);
          changeDraft({ ...draft, activityId, activityPrompt: nextActivity.prompt });
        }}>{MORNING_ACTIVITY_BANK.map((item) => <option key={item.id} value={item.id}>{item.label} · {item.title}</option>)}</select></label>
        <div className="morning-activity-editor-card"><MorningActivityVisual activity={activity} compact /><label><span>Prompt students will see</span><textarea rows={5} maxLength={360} value={draft.activityPrompt} onChange={(event) => changeDraft({ ...draft, activityPrompt: event.target.value })} /></label><p><strong>Pair move:</strong> {activity.move}</p></div>
      </section>

      <section className="morning-editor-panel morning-editor-notices">
        <header><small>3</small><h2>Announcements &amp; reminders</h2></header>
        <ItemEditor title="Announcements" hint="News or information the whole class needs." items={draft.announcements} onChange={(announcements) => changeDraft({ ...draft, announcements })} />
        <ItemEditor title="Reminders" hint="Events, materials, or actions students should remember." items={draft.reminders} onChange={(reminders) => changeDraft({ ...draft, reminders })} />
      </section>

      <section className="morning-editor-panel morning-editor-preview" aria-label="Morning Screen content check">
        <header><small>4</small><h2>Preview</h2></header>
        <div><span>{displayDate(date)}</span><strong>{draft.greeting}</strong><p>{activity.label}: {draft.activityPrompt}</p></div>
        <dl><div><dt>SHAPE</dt><dd>{timeline.length ? timeline.map((item) => item.label).join(" · ") : "No timeline supplied yet"}</dd></div><div><dt>MISSION</dt><dd>{launch?.title ?? "No mission pinned yet"}</dd></div><div><dt>VISIBLE ITEMS</dt><dd>{draft.announcements.length} announcement{draft.announcements.length === 1 ? "" : "s"} · {draft.reminders.length} reminder{draft.reminders.length === 1 ? "" : "s"}</dd></div></dl>
      </section>
    </div>
  </main>;
}

export function MorningScreen({ audience, onOpenHome, timeline }: MorningScreenProps) {
  const date = vancouverDateKey();
  const safeSchedule = useMemo(() => safeTimeline(timeline), [timeline]);
  const subscribe = useCallback((listener: () => void) => subscribeMorningScreen(date, listener), [date]);
  const getSnapshot = useCallback(() => getMorningScreenSnapshot(date), [date]);
  const saved = useSyncExternalStore(subscribe, getSnapshot, getMorningScreenServerSnapshot);
  const launch = useSyncExternalStore(subscribeDailyLaunch, getDailyLaunchSnapshot, getDailyLaunchServerSnapshot);

  return audience === "student"
    ? <MorningProjector saved={saved} launch={launch} timeline={safeSchedule} onOpenHome={onOpenHome} />
    : <MorningTeacherEditor key={`${date}:${saved?.publishedAt ?? "draft"}`} date={date} saved={saved} launch={launch} timeline={safeSchedule} onOpenHome={onOpenHome} />;
}

export default MorningScreen;
