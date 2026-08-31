"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PLAN_BLOCK_NOTE_MAX } from "./planning-contract";
import { PlanningPrivacyNote } from "./planning-privacy";

export const WEEKLY_PLAN_STORAGE_KEY = "mr-wyatt-weekly-plan-v1";
export const WEEKLY_PLAN_CHANGE_EVENT = "mr-wyatt:weekly-plan-change";
export const SEPTEMBER_ROTATION_WEEK_STORAGE_KEY = "mr-wyatt-weekly-plan-v1:september-rotation-2026-09-07";
export const SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY = "mr-wyatt-weekly-plan-v1:september-formed-class-2026-09-14";
export const SCHOOL_YEAR_FIRST_WEEK = "2026-09-07";
export const SCHOOL_YEAR_LAST_WEEK = "2027-06-21";

function isoDatePlusDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day));
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function weeklyPlanStorageKeyForWeek(date: string) {
  const source = /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : SCHOOL_YEAR_FIRST_WEEK;
  const [year, month, day] = source.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day));
  const weekday = value.getUTCDay();
  value.setUTCDate(value.getUTCDate() + (weekday === 0 ? -6 : 1 - weekday));
  return `${WEEKLY_PLAN_STORAGE_KEY}:school-week-${value.toISOString().slice(0, 10)}`;
}

export const SCHOOL_YEAR_WEEK_MONDAYS = (() => {
  const weeks: string[] = [];
  for (let week = SCHOOL_YEAR_FIRST_WEEK; week <= SCHOOL_YEAR_LAST_WEEK; week = isoDatePlusDays(week, 7)) weeks.push(week);
  return weeks;
})();

export const SCHOOL_YEAR_WEEK_STORAGE_KEYS = SCHOOL_YEAR_WEEK_MONDAYS.map(weeklyPlanStorageKeyForWeek);
export const WEEKLY_PLAN_STORAGE_KEYS = [
  SEPTEMBER_ROTATION_WEEK_STORAGE_KEY,
  SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY,
  ...SCHOOL_YEAR_WEEK_STORAGE_KEYS,
  WEEKLY_PLAN_STORAGE_KEY,
] as const;

export const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const;

export type Weekday = (typeof WEEKDAYS)[number];
export type WeeklyPlanBlockKind = "lesson" | "transition" | "recess" | "lunch";

export type WeekPlanSeedLesson = {
  sourceId: string;
  subject: string;
  title: string;
  timing: string;
  /** When omitted, selected lessons are distributed Monday through Friday in order. */
  day?: Weekday;
  startTime?: string;
  runSteps?: readonly string[];
  notes?: string;
};

/** Plain, serializable input supplied by the curriculum/pacing layer. */
export type WeekPlanSeed = {
  weekOf?: string;
  title?: string;
  weekNote?: string;
  lessons: readonly WeekPlanSeedLesson[];
};

export type CurriculumLessonForWeek = {
  id: string;
  subject: string;
  title: string;
  duration: string;
  question?: string;
  day?: Weekday;
  startTime?: string;
  steps?: readonly (string | { title?: string; action: string; minutes?: string })[];
  notes?: string;
};

export type WeeklyPlanBlock = {
  id: string;
  kind: WeeklyPlanBlockKind;
  day: Weekday;
  sourceId?: string;
  subject: string;
  title: string;
  startTime: string;
  timing: string;
  runSteps: string[];
  notes: string;
};

export type WeeklyPlanData = {
  version: 1;
  weekOf: string;
  title: string;
  weekNote: string;
  blocks: WeeklyPlanBlock[];
};

export type WeeklyPlanProps = {
  /** Lessons selected by the year map, pacing view, or teacher. */
  seed?: WeekPlanSeed;
  storageKey?: string;
  /** Optional prior namespace to copy once when it contains this same calendar week. */
  legacyStorageKey?: string;
  heading?: string;
};

export type WeeklyPlanPresetOption = {
  id: string;
  label: string;
  dateRange: string;
  description: string;
};

export type WeeklyPlanPresetSelectorProps = {
  presets: readonly WeeklyPlanPresetOption[];
  value: string;
  onChange: (presetId: string) => void;
  heading?: string;
};

export type AddToWeekButtonProps = {
  lesson: WeekPlanSeedLesson;
  storageKey?: string;
  label?: string;
  className?: string;
};

const weekdaySet = new Set<string>(WEEKDAYS);
const blockKindSet = new Set<WeeklyPlanBlockKind>(["lesson", "transition", "recess", "lunch"]);
const safeId = /^[a-z0-9][a-z0-9:_-]{0,119}$/i;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
const EMPTY_SEED: WeekPlanSeed = { lessons: [] };
const formedWeekDayBySourceId: Record<string, Weekday> = {
  "ordinary-object-story": "monday",
  "magnitude-gallery": "tuesday",
  "learning-user-manual": "wednesday",
  "place-soundwalk": "thursday",
  "september-learning-story-synthesis": "friday",
};

function cleanText(value: unknown, maximum: number, allowEmpty = false) {
  if (typeof value !== "string") return null;
  const clean = value.trim().replace(/\s+/g, " ");
  if ((!clean && !allowEmpty) || clean.length > maximum) return null;
  return clean;
}

function cleanLongText(value: unknown, maximum: number, allowEmpty = false) {
  if (typeof value !== "string") return null;
  const clean = value.trim().replace(/\r\n?/g, "\n");
  if ((!clean && !allowEmpty) || clean.length > maximum) return null;
  return clean;
}

function localToday() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

/** Returns an ISO date for the Monday containing the supplied date. */
export function mondayOfWeek(date = localToday()) {
  const source = datePattern.test(date) ? date : localToday();
  const [year, month, day] = source.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day));
  const weekday = value.getUTCDay();
  value.setUTCDate(value.getUTCDate() + (weekday === 0 ? -6 : 1 - weekday));
  return value.toISOString().slice(0, 10);
}

export function dateForWeekday(weekOf: string, day: Weekday) {
  const monday = mondayOfWeek(weekOf);
  const [year, month, date] = monday.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, date));
  value.setUTCDate(value.getUTCDate() + WEEKDAYS.indexOf(day));
  return value.toISOString().slice(0, 10);
}

function dayLabel(weekOf: string, day: Weekday) {
  const date = dateForWeekday(weekOf, day);
  const [year, month, dateNumber] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, dateNumber)));
}

function createId(kind: WeeklyPlanBlockKind) {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().slice(0, 12)
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return `${kind}-${random}`;
}

function emptyWeeklyPlan(weekOf = ""): WeeklyPlanData {
  return {
    version: 1,
    weekOf,
    title: "Grade 6 weekly learning plan",
    weekNote: "",
    blocks: [],
  };
}

function normalizeDay(value: unknown): Weekday | null {
  return typeof value === "string" && weekdaySet.has(value) ? value as Weekday : null;
}

function parseBlock(value: unknown): WeeklyPlanBlock | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const id = cleanText(record.id, 120);
  const kind = cleanText(record.kind, 20);
  const day = normalizeDay(record.day);
  const sourceId = record.sourceId === undefined ? undefined : cleanText(record.sourceId, 120);
  const subject = cleanText(record.subject, 80);
  const title = cleanText(record.title, 180);
  const startTime = cleanText(record.startTime, 5, true);
  const timing = cleanText(record.timing, 80, true);
  const notes = cleanLongText(record.notes, PLAN_BLOCK_NOTE_MAX, true);
  if (!id || !safeId.test(id) || !kind || !blockKindSet.has(kind as WeeklyPlanBlockKind) || !day || !subject || !title) return null;
  if (sourceId === null || startTime === null || timing === null || notes === null || (startTime && !timePattern.test(startTime))) return null;
  if (!Array.isArray(record.runSteps) || record.runSteps.length > 8) return null;
  const runSteps = record.runSteps.map((step) => cleanText(step, 320)).filter((step): step is string => Boolean(step));
  if (runSteps.length !== record.runSteps.length || (kind === "lesson" && runSteps.length === 0)) return null;
  return {
    id,
    kind: kind as WeeklyPlanBlockKind,
    day,
    sourceId,
    subject,
    title,
    startTime,
    timing,
    runSteps,
    notes,
  };
}

/** Guards all device-local data before it reaches the weekly planner. */
export function parseWeeklyPlan(value: unknown): WeeklyPlanData | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const weekOf = cleanText(record.weekOf, 10);
  const title = cleanText(record.title, 180);
  const weekNote = cleanLongText(record.weekNote, 1800, true);
  if (record.version !== 1 || !weekOf || !datePattern.test(weekOf) || mondayOfWeek(weekOf) !== weekOf || !title || weekNote === null) return null;
  if (!Array.isArray(record.blocks) || record.blocks.length > 80) return null;
  const blocks = record.blocks.map(parseBlock);
  if (blocks.some((block) => block === null)) return null;
  const validBlocks = blocks as WeeklyPlanBlock[];
  if (new Set(validBlocks.map((block) => block.id)).size !== validBlocks.length) return null;
  return { version: 1, weekOf, title, weekNote, blocks: validBlocks };
}

/** Adapts existing Generic, Science, Social, or cross-curricular lesson data without importing a renderer. */
export function lessonSeedFromCurriculum(lesson: CurriculumLessonForWeek): WeekPlanSeedLesson {
  const sourceId = cleanText(lesson.id, 120) ?? "selected-lesson";
  const subject = cleanText(lesson.subject, 80) ?? "Learning block";
  const title = cleanText(lesson.title, 180) ?? "Selected lesson";
  const timing = cleanText(lesson.duration, 80, true) ?? "";
  const startTime = cleanText(lesson.startTime ?? "", 5, true) ?? "";
  const runSteps = (lesson.steps ?? []).slice(0, 8).map((step) => {
    if (typeof step === "string") return cleanText(step, 320);
    const action = cleanText(step.action, 260);
    const stepTitle = cleanText(step.title ?? "", 80, true);
    const minutes = cleanText(step.minutes ?? "", 30, true);
    if (!action) return null;
    return [minutes, stepTitle, action].filter(Boolean).join(" · ");
  }).filter((step): step is string => Boolean(step));
  const question = cleanText(lesson.question ?? "", 280, true);
  const extraNotes = cleanLongText(lesson.notes ?? "", 1000, true);
  return {
    sourceId,
    subject,
    title,
    timing,
    day: normalizeDay(lesson.day) ?? undefined,
    startTime: timePattern.test(startTime) ? startTime : "",
    runSteps: runSteps.length ? runSteps : ["Open the matching lesson and follow its projected class route."],
    notes: [question ? `Learning question: ${question}` : "", extraNotes].filter(Boolean).join("\n"),
  };
}

export function lessonBlockFromWeekSeed(lesson: WeekPlanSeedLesson, fallbackDay: Weekday = "monday"): WeeklyPlanBlock {
  const sourceId = cleanText(lesson.sourceId, 120) ?? "selected-lesson";
  const subject = cleanText(lesson.subject, 80) ?? "Learning block";
  const title = cleanText(lesson.title, 180) ?? "Selected lesson";
  const timing = cleanText(lesson.timing, 80, true) ?? "";
  const suppliedStart = cleanText(lesson.startTime ?? "", 5, true) ?? "";
  const runSteps = (lesson.runSteps ?? []).slice(0, 8).map((step) => cleanText(step, 320)).filter((step): step is string => Boolean(step));
  return {
    id: createId("lesson"),
    kind: "lesson",
    day: normalizeDay(lesson.day) ?? fallbackDay,
    sourceId,
    subject,
    title,
    startTime: timePattern.test(suppliedStart) ? suppliedStart : "",
    timing,
    runSteps: runSteps.length ? runSteps : ["Open the matching lesson and follow its projected class route."],
    notes: cleanLongText(lesson.notes ?? "", PLAN_BLOCK_NOTE_MAX, true) ?? "",
  };
}

export function simpleWeekBlockFrom(day: Weekday, kind: Exclude<WeeklyPlanBlockKind, "lesson">): WeeklyPlanBlock {
  const copy = {
    transition: { subject: "DAY FLOW", title: "Transition", timing: "5 min" },
    recess: { subject: "BREAK", title: "Recess", timing: "15 min" },
    lunch: { subject: "BREAK", title: "Lunch", timing: "45 min" },
  }[kind];
  return { id: createId(kind), kind, day, ...copy, startTime: "", runSteps: [], notes: "" };
}

/** Builds a complete editable week from the lessons selected by a pacing layer. */
export function weeklyPlanFromSeed(seed: WeekPlanSeed = EMPTY_SEED, fallbackDate = localToday()): WeeklyPlanData {
  const weekOf = mondayOfWeek(seed.weekOf && datePattern.test(seed.weekOf) ? seed.weekOf : fallbackDate);
  const title = cleanText(seed.title ?? "", 180, true) || "Grade 6 weekly learning plan";
  const weekNote = cleanLongText(seed.weekNote ?? "", 1800, true) ?? "";
  let nextOpenDay = 0;
  const blocks = seed.lessons.slice(0, 60).map((lesson) => {
    const assignedDay = normalizeDay(lesson.day);
    const fallbackDay = WEEKDAYS[nextOpenDay % WEEKDAYS.length];
    if (!assignedDay) nextOpenDay += 1;
    return lessonBlockFromWeekSeed(lesson, assignedDay ?? fallbackDay);
  });
  return { version: 1, weekOf, title, weekNote, blocks };
}

/** Starts known dated presets in their intended week even when the teacher adds a lesson before opening the planner. */
export function starterPlanForStorageKey(storageKey: string): WeeklyPlanData {
  if (storageKey === SEPTEMBER_ROTATION_WEEK_STORAGE_KEY) {
    return weeklyPlanFromSeed({
      weekOf: "2026-09-07",
      title: "Grade 6 opening rotations · schedule pending",
      weekNote: "Classes are not formed and the visit order, group count, duration, and end date are not confirmed. A teacher may see four of five groups each day and some groups may return in the following week. Choose a standalone Discovery organizer and 45-, 60-, or 75-minute route only after the arriving group and available block are known. Add exact bells, group history, supervision, support, and transitions. Collect named originals face-down for private transfer; display only a separately student-approved copy or excerpt.",
      lessons: [],
    });
  }
  if (storageKey === SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY) {
    return weeklyPlanFromSeed({
      weekOf: "2026-09-14",
      title: "First Formed Class Week · September 14–18",
      weekNote: "Begin with low-risk story and shared noticing, establish an accurate Mathematics starting point, name current learning conditions without fixed labels, then gather evidence from place. Friday brings the week together in one September Learning Story rather than creating separate uploads.",
      lessons: [],
    });
  }
  return weeklyPlanFromSeed();
}

export function septemberFormedWeekDayForSourceId(sourceId: string): Weekday | undefined {
  return formedWeekDayBySourceId[sourceId];
}

/** Repairs data written by the earlier undated Add-to-Week path without discarding teacher-created blocks or notes. */
export function normalizePlanForStorageKey(plan: WeeklyPlanData, storageKey: string): WeeklyPlanData {
  if (storageKey !== SEPTEMBER_ROTATION_WEEK_STORAGE_KEY && storageKey !== SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY) return plan;
  const expected = starterPlanForStorageKey(storageKey);
  if (plan.weekOf === expected.weekOf) return plan;

  const blocks = storageKey === SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY
    ? plan.blocks.map((block) => {
      const intendedDay = block.sourceId ? septemberFormedWeekDayForSourceId(block.sourceId) : undefined;
      return intendedDay ? { ...block, day: intendedDay } : block;
    })
    : plan.blocks
      .filter((block) => block.sourceId !== "welcome-signal-studio")
      .map((block) => {
        const matchedDay = block.sourceId?.match(/^(?:welcome-signal-studio|rotation-(?:identity-constellation|how-i-learn|ideal-learning-space|build-better-grade-6|grade-6-quest-map))-(monday|tuesday|wednesday|thursday|friday)$/)?.[1];
        return matchedDay && weekdaySet.has(matchedDay) ? { ...block, day: matchedDay as Weekday } : block;
      });

  return {
    ...plan,
    weekOf: expected.weekOf,
    title: plan.title === "Grade 6 weekly learning plan" ? expected.title : plan.title,
    weekNote: plan.weekNote || expected.weekNote,
    blocks,
  };
}

/** Adds new curriculum selections without overwriting teacher edits or duplicating a selected lesson. */
export function mergeWeekPlanSeed(plan: WeeklyPlanData, seed: WeekPlanSeed): WeeklyPlanData {
  const seeded = weeklyPlanFromSeed({ ...seed, weekOf: plan.weekOf }, plan.weekOf);
  const existing = new Set(plan.blocks.filter((block) => block.kind === "lesson").map((block) => block.sourceId ?? ""));
  const additions = seeded.blocks.filter((block) => !existing.has(block.sourceId ?? ""));
  if (!additions.length) return plan;
  return { ...plan, blocks: [...plan.blocks, ...additions].slice(0, 80) };
}

export function readWeeklyPlan(storageKey: string) {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? parseWeeklyPlan(JSON.parse(stored)) : null;
  } catch {
    return null;
  }
}

/** Adds one curriculum lesson to the current device-local week without opening the full planner. */
export function addLessonToDeviceWeek(lesson: WeekPlanSeedLesson, storageKey = WEEKLY_PLAN_STORAGE_KEY): "added" | "exists" | "blocked" {
  const stored = readWeeklyPlan(storageKey);
  const current = stored ? normalizePlanForStorageKey(stored, storageKey) : starterPlanForStorageKey(storageKey);
  const day = normalizeDay(lesson.day) ?? WEEKDAYS.reduce((bestDay, candidate) => {
    const candidateCount = current.blocks.filter((block) => block.day === candidate && block.kind === "lesson").length;
    const bestCount = current.blocks.filter((block) => block.day === bestDay && block.kind === "lesson").length;
    return candidateCount < bestCount ? candidate : bestDay;
  }, WEEKDAYS[0]);
  if (current.blocks.some((block) => block.kind === "lesson" && block.sourceId === lesson.sourceId)) {
    if (current !== stored) {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(current));
        window.dispatchEvent(new Event(WEEKLY_PLAN_CHANGE_EVENT));
      } catch {
        return "blocked";
      }
    }
    return "exists";
  }
  if (current.blocks.length >= 80) return "blocked";
  const next = { ...current, blocks: [...current.blocks, lessonBlockFromWeekSeed(lesson, day)] } satisfies WeeklyPlanData;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(WEEKLY_PLAN_CHANGE_EVENT));
    return "added";
  } catch {
    return "blocked";
  }
}

export function AddToWeekButton({ lesson, storageKey = WEEKLY_PLAN_STORAGE_KEY, label = "Add to weekly plan", className = "" }: AddToWeekButtonProps) {
  const [result, setResult] = useState<"idle" | "added" | "exists" | "blocked">("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  const add = () => {
    setResult(addLessonToDeviceWeek(lesson, storageKey));
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setResult("idle"), 2200);
  };

  return (
    <button
      type="button"
      className={`add-to-week ${className}`.trim()}
      data-result={result}
      aria-label={`${label}: ${lesson.title}`}
      onClick={add}
    >
      <span aria-hidden="true">{result === "added" || result === "exists" ? "✓" : result === "blocked" ? "!" : "+"}</span>
      <b>{result === "added" ? "Added to the week" : result === "exists" ? "Already in the week" : result === "blocked" ? "Week is full or cannot save" : label}</b>
    </button>
  );
}

/** Chooses between independently saved week presets without owning either plan. */
export function WeeklyPlanPresetSelector({ presets, value, onChange, heading = "Choose a teaching week" }: WeeklyPlanPresetSelectorProps) {
  const headingId = useId();
  const privacyId = useId();
  const detailId = useId();
  const selected = presets.find((preset) => preset.id === value) ?? presets[0];
  if (!selected) return null;

  return (
    <section className="weekly-plan" aria-labelledby={headingId}>
      <header className="weekly-plan__hero">
        <div>
          <small>WEEK LAUNCHER · EACH WEEK SAVES SEPARATELY</small>
          <h2 id={headingId}>{heading}</h2>
          <p>Open the seeded week, then adjust the timetable. Every edit stays with that week on this computer.</p>
        </div>
      </header>
      <PlanningPrivacyNote id={privacyId} />
      <div className="weekly-plan__setup">
        <label>
          <span>WEEK PRESET</span>
          <select value={selected.id} aria-describedby={detailId} onChange={(event) => onChange(event.target.value)}>
            {presets.map((preset) => <option key={preset.id} value={preset.id}>{preset.label} · {preset.dateRange}</option>)}
          </select>
        </label>
        <div id={detailId} aria-live="polite">
          <strong>{selected.label} · {selected.dateRange}</strong>
          <p>{selected.description}</p>
        </div>
        <p><strong>Safe to switch.</strong><br />Returning to another week opens its own saved lessons, notes, and times.</p>
      </div>
    </section>
  );
}

export function WeeklyPlan({ seed = EMPTY_SEED, storageKey = WEEKLY_PLAN_STORAGE_KEY, legacyStorageKey, heading = "Build the teaching week" }: WeeklyPlanProps) {
  const [plan, setPlan] = useState<WeeklyPlanData>(() => emptyWeeklyPlan());
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("Opening the weekly plan saved on this teacher device…");
  const headingId = useId();
  const privacyId = useId();
  const planRef = useRef<HTMLElement>(null);
  const serializedSeed = JSON.stringify(seed);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const currentSeed = JSON.parse(serializedSeed) as WeekPlanSeed;
      const storedPlan = readWeeklyPlan(storageKey);
      const stored = storedPlan ? normalizePlanForStorageKey(storedPlan, storageKey) : null;
      const repairedStoredPlan = Boolean(storedPlan && stored !== storedPlan);
      const seedWeek = weeklyPlanFromSeed(currentSeed).weekOf;
      const legacy = !stored && legacyStorageKey && legacyStorageKey !== storageKey
        ? readWeeklyPlan(legacyStorageKey)
        : null;
      const compatibleLegacy = legacy?.weekOf === seedWeek ? legacy : null;
      const saved = stored ?? compatibleLegacy;
      const next = saved ? mergeWeekPlanSeed(saved, currentSeed) : weeklyPlanFromSeed(currentSeed);
      setPlan(next);
      setReady(true);
      setStatus(repairedStoredPlan
        ? "Your earlier saved work was moved into the correct September week. Lesson days were repaired without deleting your edits."
        : compatibleLegacy
        ? "Your earlier saved plan was preserved in this week preset."
        : stored
          ? "Saved week opened. New selected lessons were added without replacing your edits."
          : "The selected curriculum lessons have populated this week.");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [legacyStorageKey, serializedSeed, storageKey]);

  useEffect(() => {
    const syncFromDevice = () => {
      const storedPlan = readWeeklyPlan(storageKey);
      const stored = storedPlan ? normalizePlanForStorageKey(storedPlan, storageKey) : null;
      if (stored) {
        setPlan(stored);
        setStatus("The weekly plan was updated.");
      }
    };
    const syncFromAnotherTab = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) syncFromDevice();
    };
    window.addEventListener(WEEKLY_PLAN_CHANGE_EVENT, syncFromDevice);
    window.addEventListener("storage", syncFromAnotherTab);
    return () => {
      window.removeEventListener(WEEKLY_PLAN_CHANGE_EVENT, syncFromDevice);
      window.removeEventListener("storage", syncFromAnotherTab);
    };
  }, [storageKey]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(plan));
    } catch {
      window.setTimeout(() => setStatus("This browser blocked saving. Keep this tab open or print the week now."), 0);
    }
  }, [plan, ready, storageKey]);

  const updatePlan = (update: Partial<Pick<WeeklyPlanData, "weekOf" | "title" | "weekNote">>) => {
    setPlan((current) => ({ ...current, ...update }));
    setStatus("Changes save automatically on this teacher device.");
  };

  const updateBlock = (id: string, update: Partial<Pick<WeeklyPlanBlock, "day" | "subject" | "title" | "startTime" | "timing" | "notes">>) => {
    setPlan((current) => ({ ...current, blocks: current.blocks.map((block) => block.id === id ? { ...block, ...update } : block) }));
    setStatus("Changes save automatically on this teacher device.");
  };

  const addSimpleBlock = (day: Weekday, kind: Exclude<WeeklyPlanBlockKind, "lesson">) => {
    setPlan((current) => {
      if (current.blocks.length >= 80) {
        setStatus("This week already has the maximum of 80 blocks.");
        return current;
      }
      const block = simpleWeekBlockFrom(day, kind);
      setStatus(`${block.title} added to ${day}.`);
      return { ...current, blocks: [...current.blocks, block] };
    });
  };

  const moveBlock = (day: Weekday, id: string, direction: -1 | 1) => {
    setPlan((current) => {
      const positions = current.blocks.map((block, index) => ({ block, index })).filter((entry) => entry.block.day === day);
      const position = positions.findIndex((entry) => entry.block.id === id);
      const destination = position + direction;
      if (position < 0 || destination < 0 || destination >= positions.length) return current;
      const blocks = [...current.blocks];
      const fromIndex = positions[position].index;
      const toIndex = positions[destination].index;
      [blocks[fromIndex], blocks[toIndex]] = [blocks[toIndex], blocks[fromIndex]];
      return { ...current, blocks };
    });
    setStatus("The teaching order was updated.");
  };

  const removeBlock = (id: string) => {
    setPlan((current) => ({ ...current, blocks: current.blocks.filter((block) => block.id !== id) }));
    setStatus("The block was removed from this week.");
  };

  const resetWeek = () => {
    if (!window.confirm("Reset this weekly plan from the selected curriculum lessons? Your edits to this week will be replaced.")) return;
    const next = weeklyPlanFromSeed({ ...seed, weekOf: plan.weekOf || seed.weekOf });
    setPlan(next);
    setStatus("The week was rebuilt from the selected curriculum lessons.");
  };

  const printWholeWeek = () => {
    if (!planRef.current || !plan.blocks.length) return;
    document.body.classList.add("print-target-active");
    planRef.current.classList.add("print-target");
    try {
      window.print();
      setStatus("The complete weekly plan is ready to print or save as a PDF.");
    } finally {
      planRef.current.classList.remove("print-target");
      document.body.classList.remove("print-target-active");
    }
  };

  return (
    <section ref={planRef} className="weekly-plan" aria-labelledby={headingId} data-ready={ready || undefined}>
      <header className="weekly-plan__hero">
        <div>
          <small>WEEK PLAN</small>
          <h2 id={headingId}>{heading}</h2>
        </div>
        <div className="weekly-plan__hero-actions">
          <button type="button" disabled={!plan.blocks.length} onClick={printWholeWeek}>Print week</button>
          <a href="/printables/grade-6-weekly-desk-plan-legal.xlsx" download>Download legal Excel</a>
        </div>
      </header>

      <PlanningPrivacyNote id={privacyId} />

      <section className="weekly-plan__setup" aria-label="Weekly plan details">
        <label>
          <span>WEEK STARTING MONDAY</span>
          <input type="date" value={plan.weekOf} onChange={(event) => updatePlan({ weekOf: mondayOfWeek(event.target.value) })} />
          <b className="weekly-plan__print-value">Week of {plan.weekOf || "date not set"}</b>
        </label>
        <label>
          <span>PLAN TITLE</span>
          <input type="text" value={plan.title} maxLength={180} onChange={(event) => updatePlan({ title: event.target.value })} />
          <b className="weekly-plan__print-value">{plan.title}</b>
        </label>
        <label className="weekly-plan__week-note">
          <span>WHOLE-WEEK NOTES FOR THE TTOC</span>
          <textarea aria-describedby={privacyId} value={plan.weekNote} maxLength={1800} rows={2} placeholder="General routines or changes only—no student-specific or confidential information." onChange={(event) => updatePlan({ weekNote: event.target.value })} />
          <p className="weekly-plan__print-value">{plan.weekNote || "No whole-week notes."}</p>
        </label>
      </section>

      <div className="weekly-plan__days">
        {WEEKDAYS.map((day) => {
          const dayBlocks = plan.blocks.filter((block) => block.day === day);
          return (
            <article key={day} className="weekly-plan__day" data-day={day}>
              <header>
                <div><small>{dayLabel(plan.weekOf || mondayOfWeek(), day)}</small><h3>{day}</h3></div>
                <span>{dayBlocks.length} {dayBlocks.length === 1 ? "block" : "blocks"}</span>
              </header>

              <div className="weekly-plan__add-parts" role="group" aria-label={`Add a part to ${day}`}>
                <button type="button" onClick={() => addSimpleBlock(day, "transition")}>+ Transition</button>
                <button type="button" onClick={() => addSimpleBlock(day, "recess")}>+ Recess</button>
                <button type="button" onClick={() => addSimpleBlock(day, "lunch")}>+ Lunch</button>
              </div>

              {dayBlocks.length === 0 ? <p className="weekly-plan__empty">No lesson selected for this day yet.</p> : (
                <ol className="weekly-plan__blocks">
                  {dayBlocks.map((block, index) => (
                    <li key={block.id} className="weekly-plan__block" data-kind={block.kind}>
                      <header>
                        <span className="weekly-plan__number">{index + 1}</span>
                        <div><small>{block.subject}</small><strong>{block.title}</strong></div>
                        <div className="weekly-plan__order" role="group" aria-label={`Reorder ${block.title}`}>
                          <button type="button" disabled={index === 0} onClick={() => moveBlock(day, block.id, -1)} aria-label={`Move ${block.title} earlier`}>↑</button>
                          <button type="button" disabled={index === dayBlocks.length - 1} onClick={() => moveBlock(day, block.id, 1)} aria-label={`Move ${block.title} later`}>↓</button>
                          <button type="button" className="remove" onClick={() => removeBlock(block.id)} aria-label={`Remove ${block.title}`}>×</button>
                        </div>
                      </header>

                      <div className="weekly-plan__fields">
                        <label className="weekly-plan__subject"><span>SUBJECT</span><input type="text" value={block.subject} maxLength={80} onChange={(event) => updateBlock(block.id, { subject: event.target.value })} /><b className="weekly-plan__print-value">{block.subject}</b></label>
                        <label className="weekly-plan__lesson"><span>LESSON / ACTIVITY</span><input type="text" value={block.title} maxLength={180} onChange={(event) => updateBlock(block.id, { title: event.target.value })} /><b className="weekly-plan__print-value">{block.title}</b></label>
                        <label><span>DAY</span><select value={block.day} onChange={(event) => updateBlock(block.id, { day: event.target.value as Weekday })}>{WEEKDAYS.map((option) => <option key={option} value={option}>{option}</option>)}</select><b className="weekly-plan__print-value">{block.day}</b></label>
                        <label><span>START</span><input type="time" value={block.startTime} onChange={(event) => updateBlock(block.id, { startTime: event.target.value })} /><b className="weekly-plan__print-value">{block.startTime || "—"}</b></label>
                        <label><span>LENGTH</span><input type="text" value={block.timing} maxLength={80} onChange={(event) => updateBlock(block.id, { timing: event.target.value })} /><b className="weekly-plan__print-value">{block.timing || "Flexible"}</b></label>
                      </div>

                      {block.runSteps.length > 0 && <section className="weekly-plan__route"><small>QUICK TEACHING ROUTE</small><ol>{block.runSteps.map((step, stepIndex) => <li key={`${block.id}-${stepIndex}`}>{step}</li>)}</ol></section>}

                      <label className="weekly-plan__notes">
                        <span>{block.kind === "lesson" ? "NOTES FOR THE TTOC" : "DETAILS / DUTY / WHERE TO GO"}</span>
                        <textarea aria-describedby={privacyId} value={block.notes} maxLength={PLAN_BLOCK_NOTE_MAX} rows={2} placeholder={block.kind === "lesson" ? "Only non-confidential directions needed to run this block." : "Optional non-confidential details"} onChange={(event) => updateBlock(block.id, { notes: event.target.value })} />
                        <p className="weekly-plan__print-value">{block.notes || "—"}</p>
                      </label>
                    </li>
                  ))}
                </ol>
              )}
            </article>
          );
        })}
      </div>

      <footer className="weekly-plan__footer">
        <p role="status" aria-live="polite">{status}</p>
        <button type="button" onClick={resetWeek}>Reset from selected lessons</button>
      </footer>
    </section>
  );
}
