"use client";

import { useState } from "react";
import type { StudentStep } from "./program-types";
import { type UnitWorldTheme, worldStyle } from "./unit-worlds";

type StudentWorldEntryProps = {
  theme: UnitWorldTheme;
  subject: string;
  unit: string;
  title: string;
  question: string;
  why?: string;
  firstMove: string;
  finish: string;
  duration?: string;
  choices?: string[];
  materials?: string[];
  onMap?: () => void;
  compact?: boolean;
  startHref?: string;
  startLabel?: string;
  helpHref?: string | null;
};

/** A single projector launch: identity, question, and one start control. */
export function StudentWorldEntry({ theme, subject, unit, title, question, onMap, compact = false, startHref = "#mission-path", startLabel = "Start" }: StudentWorldEntryProps) {
  return (
    <section className={`student-world-entry student-world-entry--lean world-family-${theme.family} ${compact ? "compact" : ""}`} data-world={theme.id} style={worldStyle(theme)}>
      <div className="student-world-entry-art" aria-hidden="true"><i /><i /><i /></div>
      <header><span>{subject}</span><b>{unit}</b></header>
      <div className="student-world-entry-copy"><small>TODAY</small><h1>{title}</h1><p>{question}</p></div>
      <footer><a href={startHref}>{startLabel} <span>↓</span></a>{onMap && <button type="button" onClick={onMap}>Unit map</button>}</footer>
    </section>
  );
}

export function StudentStepPath({ steps, product, spacesPrompt }: { steps: StudentStep[]; product: string; spacesPrompt: string }) {
  const [current, setCurrent] = useState(0);
  const step = steps[current] ?? steps[0];
  if (!step) return null;
  const last = current === steps.length - 1;

  return (
    <section id="mission-path" className="student-step-path student-step-path--lean" tabIndex={-1}>
      <header><div><small>MOVE {current + 1} OF {steps.length}</small><h2>{step.title}</h2></div><span>{current + 1}/{steps.length}</span></header>
      <nav aria-label="Mission steps">{steps.map((item, index) => <button type="button" key={`${item.title}-${index}`} className={current === index ? "active" : ""} aria-current={current === index ? "step" : undefined} onClick={() => setCurrent(index)}><b>{index + 1}</b><span>{item.title}</span></button>)}</nav>
      <article aria-live="polite" key={`${step.title}-${current}`}>
        <div><small>DO</small><p>{step.action}</p></div>
        <aside><small>READY WHEN</small><strong>{step.show}</strong></aside>
      </article>
      {last && <section className="student-step-finish"><header><small>FINISH</small><h3>{product}</h3></header>{/spaces/i.test(spacesPrompt) && <footer><p>{spacesPrompt}</p></footer>}</section>}
      <footer>
        <button type="button" disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))}>← Back</button>
        <strong>{last ? "Finish this move." : "Talk, point, move, draw, or make—then continue."}</strong>
        <button type="button" disabled={last} onClick={() => setCurrent((value) => Math.min(steps.length - 1, value + 1))}>Next →</button>
      </footer>
    </section>
  );
}
