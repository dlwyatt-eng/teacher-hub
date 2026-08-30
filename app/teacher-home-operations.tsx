"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
import { currentLearningState, currentLearningWindowForDate } from "./current-learning-phase";
import {
  getMorningActivity,
  getMorningScreenServerSnapshot,
  getMorningScreenSnapshot,
  subscribeMorningScreen,
  suggestedMorningActivityId,
  vancouverDateKey,
} from "./morning-screen-state";
import type { MorningTimelineItem } from "./morning-screen";

export type TeacherHomeDestination =
  | "Morning Screen"
  | "First Week Mission"
  | "Weekly Plan"
  | "TTOC Day Plan"
  | "Monthly Calendar"
  | "Visual Review Studio"
  | "Newsroom";

export type TeacherHomeOperationsProps = {
  timeline: readonly MorningTimelineItem[];
  onNavigate: (destination: TeacherHomeDestination) => void;
  onProjectMorning: () => void;
  publicSiteHref: string;
};

function displayDate(date: string) {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "America/Vancouver",
  }).format(new Date(`${date}T12:00:00Z`));
}

function displayTime(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Vancouver",
  }).format(new Date(value));
}

export default function TeacherHomeOperations({ timeline, onNavigate, onProjectMorning, publicSiteHref }: TeacherHomeOperationsProps) {
  const date = vancouverDateKey();
  const subscribe = useCallback((listener: () => void) => subscribeMorningScreen(date, listener), [date]);
  const getSnapshot = useCallback(() => getMorningScreenSnapshot(date), [date]);
  const morning = useSyncExternalStore(subscribe, getSnapshot, getMorningScreenServerSnapshot);
  const activity = getMorningActivity(morning?.activityId ?? suggestedMorningActivityId(date));
  const safeTimeline = useMemo(() => timeline.slice(0, 8), [timeline]);
  const hiddenStops = Math.max(0, safeTimeline.length - 6);
  const current = currentLearningWindowForDate(date);
  const currentState = currentLearningState(current, date);

  return (
    <section className="teacher-home-operations" aria-labelledby="teacher-home-title">
      <header>
        <div><p>{displayDate(date).toUpperCase()}</p><h1 id="teacher-home-title">Good morning, Mr. Wyatt.</h1></div>
        <span className="teacher-home-local-state"><i aria-hidden="true" />Saved on this computer</span>
      </header>

      <div className="teacher-home-primary-grid">
        <article className="teacher-home-morning-card">
          <div className="teacher-home-morning-image"><Image unoptimized src={activity.imageSrc} alt={activity.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 60vw, 34vw" /></div>
          <div className="teacher-home-morning-copy">
            <header><span>MORNING SCREEN</span><b data-ready={morning ? true : undefined}>{morning ? `Ready · ${displayTime(morning.publishedAt)}` : "Needs publishing"}</b></header>
            <div><small>{activity.label}</small><h2>{activity.title}</h2></div>
            <dl>
              <div><dt>WEATHER</dt><dd>{morning?.weather?.summary ?? "Not added"}</dd></div>
              <div><dt>NOTICES</dt><dd>{(morning?.announcements.length ?? 0) + (morning?.reminders.length ?? 0)}</dd></div>
            </dl>
            <nav aria-label="Morning Screen actions">
              <button type="button" onClick={() => onNavigate("Morning Screen")}>{morning ? "Edit" : "Prepare"}</button>
              <button type="button" className="primary" disabled={!morning} onClick={onProjectMorning}>Project</button>
            </nav>
          </div>
        </article>

        <article className="teacher-home-today-card">
          <header><div><span>TODAY</span><h2>Day plan</h2></div><button type="button" onClick={() => onNavigate("Weekly Plan")}>Open week</button></header>
          {safeTimeline.length ? <ol>{safeTimeline.slice(0, 6).map((item, index) => <li key={`${item.time}-${item.label}-${index}`}><time>{item.time}</time><strong>{item.label}</strong></li>)}</ol> : <div className="teacher-home-today-empty"><span aria-hidden="true">▤</span><strong>No blocks planned yet.</strong><button type="button" onClick={() => onNavigate("Weekly Plan")}>Build the week</button></div>}
          {hiddenStops > 0 && <small className="teacher-home-more-stops">+{hiddenStops} more</small>}
          <footer><div><small>{currentState === "active" ? "TEACHING NOW" : currentState === "up-next" ? "UP NEXT" : "RECENT"}</small><strong>{current.shared.title}</strong><span>{current.teacher.duration}</span></div><button type="button" onClick={() => onNavigate(current.teacher.primaryView as TeacherHomeDestination)}>{current.teacher.primaryView === "Weekly Plan" ? "Open week" : current.teacher.primaryView === "Newsroom" ? "Open sources" : "Open lesson"}</button></footer>
        </article>
      </div>

      <nav className="teacher-home-quick-links" aria-label="Planning and classroom links">
        <button type="button" onClick={() => onNavigate("Weekly Plan")}><span aria-hidden="true">▤</span><strong>Week plan</strong></button>
        <a href="/printables/grade-6-weekly-desk-plan-legal.xlsx" download><span aria-hidden="true">↓</span><strong>Legal desk sheet</strong></a>
        <button type="button" onClick={() => onNavigate("TTOC Day Plan")}><span aria-hidden="true">☷</span><strong>TTOC / print</strong></button>
        <button type="button" onClick={() => onNavigate("Monthly Calendar")}><span aria-hidden="true">▦</span><strong>Month</strong></button>
        <button type="button" onClick={() => onNavigate("Visual Review Studio")}><span aria-hidden="true">◫</span><strong>Choose visuals</strong></button>
        <a href={publicSiteHref} target="_blank" rel="noreferrer" aria-label="Open the public Student and Family site"><span aria-hidden="true">↗</span><strong>Public site</strong></a>
      </nav>
    </section>
  );
}
