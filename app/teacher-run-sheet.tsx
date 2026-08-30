"use client";

import { useId } from "react";
import { AddToDayPlanButton, type TtocDayPlanLesson } from "./ttoc-day-plan";
import { AddToWeekButton, SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY, septemberFormedWeekDayForSourceId, type WeekPlanSeedLesson } from "./weekly-plan";
import { printClosest } from "./print-support";
import { aiDilemmasForLesson } from "./ai-literacy";

export type TeacherRunSheetMove = {
  title: string;
  action: string;
  finishCheck: string;
  minutes?: string;
};

export type TeacherRunSheetReadiness = {
  ideas: readonly string[];
  modelTitle: string;
  modelConclusion: string;
  check?: { prompt: string; choices: readonly string[]; answer: number; feedback: string };
  reteach?: string;
};

export type TeacherRunSheetProps = {
  title: string;
  duration: string;
  bigIdea?: string;
  coreCompetencies?: readonly string[];
  learningQuestion: string;
  learningPurpose?: string;
  firstAction: string;
  steps: readonly TeacherRunSheetMove[];
  finishEvidence: readonly string[];
  saveMessage?: string;
  readiness?: TeacherRunSheetReadiness;
  prepare?: readonly string[];
  materials?: readonly string[];
  shortRoute?: string;
  extension?: string;
  studentViewLabel?: string;
  dayPlanLesson?: TtocDayPlanLesson;
  launchResource?: {
    title: string;
    url: string;
    pausePrompt: string;
    secondary?: { title: string; url: string };
  };
};

type CompactRouteStep = { label: string; minutes: string; action: string; doneWhen: string };

function clean(text: string) {
  return text.trim().replace(/\s+/g, " ");
}

function sentence(text: string) {
  const value = clean(text);
  return value && !/[.!?]$/.test(value) ? `${value}.` : value;
}

function oneClassBlock(duration: string) {
  const match = duration.match(/(?:\d+(?:\s*[–-]\s*\d+)?\s*[×x]\s*)?(\d+(?:\s*[–-]\s*\d+)?)\s*min/i);
  if (!match) return duration;
  const block = `${match[1].replace(/\s+/g, " ")} min`;
  return /[×x]/.test(duration) ? `${block} · one class block` : block;
}

function compactRoute(props: TeacherRunSheetProps): CompactRouteStep[] {
  const work = props.steps.map((step, index) => ({
    label: step.title || `Move ${index + 1}`,
    minutes: step.minutes ?? "8–12 min",
    action: sentence(step.action),
    doneWhen: sentence(step.finishCheck),
  }));
  return work.length ? work : [{ label: "Start", minutes: "10–15 min", action: sentence(props.firstAction), doneWhen: sentence(props.finishEvidence.at(-1) ?? "One useful idea is visible.") }];
}

function prepItems(props: TeacherRunSheetProps) {
  const gather = props.materials?.length
    ? `Gather: ${props.materials.slice(0, 5).join(" · ")}${props.materials.length > 5 ? " · + lesson materials" : ""}`
    : null;
  return [gather, ...(props.prepare ?? [])].filter((item): item is string => Boolean(item)).slice(0, 3).map(sentence);
}

export function TeacherRunSheet(props: TeacherRunSheetProps) {
  const {
    title,
    duration,
    bigIdea,
    coreCompetencies = [],
    learningQuestion,
    learningPurpose,
    finishEvidence,
    saveMessage,
    readiness,
    shortRoute,
    extension,
    dayPlanLesson,
    launchResource,
  } = props;
  const headingId = useId();
  const route = compactRoute(props);
  const prep = prepItems(props);
  const watchFor = finishEvidence.slice(0, 2);
  const ifStuck = readiness?.reteach ?? `Model only the first move: ${props.firstAction}`;
  const destination = /spaces/i.test(saveMessage ?? "") ? "SpacesEDU" : "In class";
  const preparedDayPlanLesson = dayPlanLesson ? {
    ...dayPlanLesson,
    timing: oneClassBlock(duration),
    runSteps: route.map((step) => `${step.minutes} · ${step.label} — ${step.action}`),
    notes: /[×x]/.test(duration) ? "This lesson continues across classes. Mark the next move before stopping." : dayPlanLesson.notes,
  } satisfies TtocDayPlanLesson : null;
  const formedWeekDay = preparedDayPlanLesson ? septemberFormedWeekDayForSourceId(preparedDayPlanLesson.sourceId) : undefined;
  const weekStorageKey = formedWeekDay ? SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY : undefined;
  const preparedWeekPlanLesson = preparedDayPlanLesson ? { ...preparedDayPlanLesson, day: formedWeekDay } satisfies WeekPlanSeedLesson : null;
  const aiExtensions = preparedDayPlanLesson ? aiDilemmasForLesson(preparedDayPlanLesson.sourceId) : [];

  return (
    <section className="teacher-run-sheet" aria-labelledby={headingId}>
      <header className="teacher-run-sheet__header">
        <div><p>PLAN / TTOC</p><h2 id={headingId}>{title}</h2><strong>{duration} · {route.length} moves</strong></div>
        <div className="teacher-run-sheet__plan-actions">
          {preparedDayPlanLesson && preparedWeekPlanLesson && <><AddToDayPlanButton lesson={preparedDayPlanLesson} /><AddToWeekButton lesson={preparedWeekPlanLesson} storageKey={weekStorageKey} label={weekStorageKey ? `Add to week · ${formedWeekDay}` : "Add to week"} /></>}
          <button type="button" onClick={(event) => printClosest(event.currentTarget, ".teacher-run-sheet")}>Print / PDF</button>
        </div>
      </header>

      <section className="teacher-run-sheet__question"><small>ASK</small><p>{learningQuestion}</p></section>

      <div className="teacher-run-sheet__ready">
        <section><small>PREP</small>{prep.length ? <ul>{prep.map((item) => <li key={item}>{item}</li>)}</ul> : <p>No special preparation.</p>}</section>
        {launchResource && <section className="teacher-run-sheet__media"><small>OPEN</small><strong>{launchResource.title}</strong><p>{launchResource.pausePrompt}</p><div><a href={launchResource.url} target="_blank" rel="noreferrer">Play ↗</a>{launchResource.secondary && <a href={launchResource.secondary.url} target="_blank" rel="noreferrer">Also useful ↗</a>}</div></section>}
      </div>

      <ol className="teacher-run-sheet__route" aria-label="Lesson route">
        {route.map((step, index) => <li key={`${step.label}-${index}`}><b>{index + 1}</b><time>{step.minutes}</time><div><strong>{step.label}</strong><p>{step.action}</p></div><span><small>DONE WHEN</small>{step.doneWhen}</span></li>)}
      </ol>

      <div className="teacher-run-sheet__support">
        <section><small>SAY</small><p>“Today we are asking: {learningQuestion}”</p></section>
        <section><small>WATCH FOR</small>{watchFor.length ? <ul>{watchFor.map((item) => <li key={item}>{item}</li>)}</ul> : <p>One clear answer with evidence.</p>}</section>
        <section><small>IF STUCK</small><p>{ifStuck}</p></section>
      </div>

      <footer className="teacher-run-sheet__finish"><div><small>FINISH / SAVE</small><strong>{destination}</strong></div><p>{saveMessage ?? finishEvidence.at(-1) ?? "Close with one answer and one supporting detail."}</p></footer>

      <details className="teacher-run-sheet__more">
        <summary>Need more support? <span>Background, short route, and extension</span></summary>
        <div>
          <section><small>BIG IDEA</small><p>{bigIdea ?? learningPurpose ?? learningQuestion}</p></section>
          {coreCompetencies.length > 0 && <section><small>CORE COMPETENCIES</small><ul>{coreCompetencies.map((item) => <li key={item}>{item}</li>)}</ul></section>}
          {shortRoute && <section><small>SHORT ROUTE</small><p>{shortRoute}</p></section>}
          {readiness && <section><small>QUICK MODEL</small><p><b>{readiness.modelTitle}</b> {readiness.modelConclusion}</p></section>}
          {extension && <section><small>EXTENSION</small><p>{extension}</p></section>}
          {aiExtensions.length > 0 && <section><small>AI TENSION · OPTIONAL 5–15 MIN</small><p><b>{aiExtensions[0].title}:</b> {aiExtensions[0].situation}</p><p>Open <strong>AI Tensions Lab</strong> from Student Agency. Students vote Human / AI / Both / Not sure, hear new information, then reconsider.</p></section>}
        </div>
      </details>
    </section>
  );
}
