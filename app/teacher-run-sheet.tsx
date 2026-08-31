"use client";

import { useId } from "react";
import { AddToDayPlanButton, type TtocDayPlanLesson } from "./ttoc-day-plan";
import { AddToWeekButton, SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY, septemberFormedWeekDayForSourceId, type WeekPlanSeedLesson } from "./weekly-plan";
import { printClosest } from "./print-support";
import { aiDilemmasForLesson } from "./ai-literacy";
import { schoolAIActivitiesForLesson } from "./schoolai-activities";
import { PLAN_BLOCK_NOTE_MAX } from "./planning-contract";

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

export type TeacherRunSheetSaveKind = "in-class" | "spaces-optional" | "spaces-required" | "reuse-existing";

export type TeacherRunSheetSaveTarget = {
  kind: TeacherRunSheetSaveKind;
  label: string;
  message: string;
};

export type TeacherRunSheetDeliveryRoutes = {
  projector: string;
  sharedDevice: string;
  offline: string;
};

export function teacherRunSheetSaveTarget(decision: "none" | "optional" | "required" | "reuse", message: string): TeacherRunSheetSaveTarget {
  if (decision === "required") return { kind: "spaces-required", label: "SpacesEDU · required", message };
  if (decision === "optional") return { kind: "spaces-optional", label: "SpacesEDU · optional", message };
  if (decision === "reuse") return { kind: "reuse-existing", label: "Carry into existing post", message };
  return { kind: "in-class", label: "In class · no separate upload", message };
}

export type TeacherRunSheetProps = {
  title: string;
  duration: string;
  bigIdea?: string;
  coreCompetencies?: readonly string[];
  learningQuestion: string;
  learningPurpose?: string;
  provocation?: string;
  firstAction: string;
  steps: readonly TeacherRunSheetMove[];
  finishEvidence: readonly string[];
  saveTarget: TeacherRunSheetSaveTarget;
  lookFors?: readonly string[];
  discussionMoves: readonly string[];
  misconception: { idea: string; respond: string };
  accessibility: readonly string[];
  routes: TeacherRunSheetDeliveryRoutes;
  safetyPrivacyCleanup?: readonly string[];
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

function planTiming(duration: string) {
  return /[×x]/.test(duration) ? `${clean(duration)} · multi-class sequence` : clean(duration);
}

function fitCompleteNoteSegments(segments: readonly (string | null | undefined)[], maximum: number) {
  const kept: string[] = [];
  let omitted = false;
  for (const segment of segments) {
    if (!segment) continue;
    const value = sentence(segment);
    const candidate = [...kept, value].join(" ");
    if (candidate.length <= maximum) kept.push(value);
    else omitted = true;
  }
  const fallback = "See the full Teacher Hub plan for omitted setup details.";
  if (omitted && [...kept, fallback].join(" ").length <= maximum) kept.push(fallback);
  return kept.join(" ");
}

function compactRoute(props: TeacherRunSheetProps): CompactRouteStep[] {
  const work = props.steps.map((step, index) => ({
    label: step.title || `Move ${index + 1}`,
    minutes: step.minutes ?? "Flexible",
    action: sentence(step.action),
    doneWhen: sentence(step.finishCheck),
  }));
  return work.length ? work : [{ label: "Start", minutes: "Flexible", action: sentence(props.firstAction), doneWhen: sentence(props.finishEvidence.at(-1) ?? "One useful idea is visible.") }];
}

function prepItems(props: TeacherRunSheetProps) {
  const gather = props.materials?.length
    ? `Gather: ${props.materials.slice(0, 8).join(" · ")}${props.materials.length > 8 ? " · + lesson materials" : ""}`
    : null;
  return [gather, ...(props.prepare ?? [])].filter((item): item is string => Boolean(item)).map(sentence);
}

export function TeacherRunSheet(props: TeacherRunSheetProps) {
  const {
    title,
    duration,
    bigIdea,
    coreCompetencies = [],
    learningQuestion,
    learningPurpose,
    provocation,
    finishEvidence,
    saveTarget,
    lookFors,
    discussionMoves,
    misconception,
    accessibility,
    routes,
    safetyPrivacyCleanup,
    readiness,
    shortRoute,
    extension,
    dayPlanLesson,
    launchResource,
  } = props;
  const headingId = useId();
  const route = compactRoute(props);
  const prep = prepItems(props);
  const watchFor = (lookFors?.length ? lookFors : finishEvidence).slice(0, 3);
  const ifStuck = readiness?.reteach ?? `Model only the first move: ${props.firstAction}`;
  const ttocNoteSegments = [
    safetyPrivacyCleanup?.length ? `SAFETY / PRIVACY / CLEANUP: ${safetyPrivacyCleanup.map(sentence).join(" ")}` : null,
    `FINISH: ${finishEvidence.at(-1) ?? saveTarget.message}`,
    /[×x]/.test(duration) ? "CONTINUITY: Full sequence across classes. For today, stop at a natural move and mark the next move" : null,
    `NO TECH: ${routes.offline}`,
    `WATCH / RESPOND: ${misconception.idea} ${misconception.respond}`,
    prep.length ? `Prep: ${prep.slice(0, 3).join(" ")}` : null,
    dayPlanLesson?.notes,
  ];
  const ttocNotes = fitCompleteNoteSegments(ttocNoteSegments, PLAN_BLOCK_NOTE_MAX);
  const preparedDayPlanLesson = dayPlanLesson ? {
    ...dayPlanLesson,
    timing: planTiming(duration),
    runSteps: route.map((step) => `${step.minutes} · ${step.label} — ${step.action}`),
    notes: ttocNotes,
  } satisfies TtocDayPlanLesson : null;
  const formedWeekDay = preparedDayPlanLesson ? septemberFormedWeekDayForSourceId(preparedDayPlanLesson.sourceId) : undefined;
  const weekStorageKey = formedWeekDay ? SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY : undefined;
  const preparedWeekPlanLesson = preparedDayPlanLesson ? { ...preparedDayPlanLesson, day: formedWeekDay } satisfies WeekPlanSeedLesson : null;
  const aiExtensions = preparedDayPlanLesson ? aiDilemmasForLesson(preparedDayPlanLesson.sourceId) : [];
  const schoolAIExtensions = preparedDayPlanLesson ? schoolAIActivitiesForLesson(preparedDayPlanLesson.sourceId) : [];

  return (
    <section className="teacher-run-sheet" aria-labelledby={headingId}>
      <header className="teacher-run-sheet__header">
        <div><p>PLAN / TTOC</p><h2 id={headingId}>{title}</h2><strong>{duration} · {route.length} moves</strong></div>
        <div className="teacher-run-sheet__plan-actions">
          {preparedDayPlanLesson && preparedWeekPlanLesson && <><AddToDayPlanButton lesson={preparedDayPlanLesson} /><AddToWeekButton lesson={preparedWeekPlanLesson} storageKey={weekStorageKey} label={weekStorageKey ? `Add to week · ${formedWeekDay}` : "Add to week"} /></>}
          <button type="button" onClick={(event) => printClosest(event.currentTarget, ".teacher-run-sheet")}>Print / PDF</button>
        </div>
      </header>

      <div className="teacher-run-sheet__launch">
        {learningPurpose && <section><small>LEARN</small><p>{learningPurpose}</p></section>}
        {provocation && <section><small>LAUNCH</small><p>{provocation}</p></section>}
        <section className="teacher-run-sheet__question"><small>ASK</small><p>{learningQuestion}</p></section>
      </div>

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

      {misconception && <section className="teacher-run-sheet__misconception"><div><small>IF YOU HEAR / SEE</small><p>{misconception.idea}</p></div><div><small>RESPOND</small><p>{misconception.respond}</p></div></section>}

      {routes && <section className="teacher-run-sheet__routes" aria-label="Equivalent delivery routes"><div><small>PROJECTOR</small><p>{routes.projector}</p></div><div><small>SHARED DEVICE</small><p>{routes.sharedDevice}</p></div><div><small>NO TECH</small><p>{routes.offline}</p></div></section>}

      <footer className="teacher-run-sheet__finish" data-save-kind={saveTarget.kind}><div><small>FINISH / SAVE</small><strong>{saveTarget.label}</strong></div><p>{saveTarget.message || finishEvidence.at(-1) || "Close with one answer and one supporting detail."}</p></footer>

      <details className="teacher-run-sheet__more">
        <summary>Need more support? <span>Background, short route, and extension</span></summary>
        <div>
          <section><small>BIG IDEA</small><p>{bigIdea ?? learningPurpose ?? learningQuestion}</p></section>
          {coreCompetencies.length > 0 && <section><small>CORE COMPETENCIES</small><ul>{coreCompetencies.map((item) => <li key={item}>{item}</li>)}</ul></section>}
          {shortRoute && <section><small>SHORT ROUTE</small><p>{shortRoute}</p></section>}
          {discussionMoves?.length && <section><small>DISCUSSION MOVES</small><ul>{discussionMoves.map((item) => <li key={item}>{item}</li>)}</ul></section>}
          {accessibility?.length && <section><small>ACCESSIBILITY + DIFFERENTIATION</small><ul>{accessibility.map((item) => <li key={item}>{item}</li>)}</ul></section>}
          {readiness && <section><small>QUICK MODEL</small>{readiness.ideas.length > 0 && <ul>{readiness.ideas.map((item) => <li key={item}>{item}</li>)}</ul>}<p><b>{readiness.modelTitle}</b> {readiness.modelConclusion}</p>{readiness.check && <p><b>Check:</b> {readiness.check.prompt} <span>{readiness.check.feedback}</span></p>}</section>}
          {extension && <section><small>EXTENSION</small><p>{extension}</p></section>}
          {aiExtensions.length > 0 && <section><small>AI TENSIONS · OPTIONAL 5–15 MIN</small><p>Choose at most one when it deepens today&apos;s learning; skip the extension otherwise.</p>{aiExtensions.slice(0, 3).map((item) => <p key={item.id}><b>{item.title}:</b> {item.situation}</p>)}<p>Open <strong>AI Tensions Lab</strong> from teacher navigation, then switch to Teach / Project. Students vote Human / AI / Both / Not sure, hear new information, then reconsider.</p></section>}
          {schoolAIExtensions.length > 0 && <section><small>SCHOOLAI · CURATED OPTIONAL SUPPORT</small>{schoolAIExtensions.map((activity) => <div key={activity.id}><p><b>{activity.title}</b> · {activity.participation.label}</p><p><strong>PROMPT-READY — NOT A STUDENT LAUNCH.</strong> Create, test, and add the exact student link in AI Activity Studio first.</p><p><b>Before AI:</b> {activity.prerequisiteExperience}</p><p><b>Offline equivalent:</b> {activity.offlineAlternative}</p></div>)}</section>}
        </div>
      </details>
    </section>
  );
}
