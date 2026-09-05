"use client";

import { useState } from "react";
import { mathModePlanFor, type MathDeliveryModeId } from "./math-delivery-modes";
import "./math-delivery-mode-panel.css";

export function MathDeliveryModePanel({ experienceId }: { experienceId: string }) {
  const plan = mathModePlanFor(experienceId);
  const [selectedMode, setSelectedMode] = useState<MathDeliveryModeId>("hybrid");
  if (!plan) return null;
  const mode = plan.modes[selectedMode];

  return (
    <section className="math-delivery-panel" aria-labelledby={`${experienceId}-delivery-title`}>
      <header>
        <div>
          <p>THREE COMPLETE DELIVERY MODES · SAME B.C. LEARNING</p>
          <h3 id={`${experienceId}-delivery-title`}>{plan.title}</h3>
          <span>{plan.curriculum.join(" · ")}</span>
        </div>
        <strong>{plan.conceptPackIds.length} CORE PACK{plan.conceptPackIds.length === 1 ? "" : "S"}</strong>
      </header>

      <nav aria-label={`Choose a delivery mode for ${plan.title}`}>
        {(Object.values(plan.modes)).map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={selectedMode === item.id}
            onClick={() => setSelectedMode(item.id)}
          >
            <b>{item.label}</b>
            <span>{item.bestWhen}</span>
          </button>
        ))}
      </nav>

      <section className="math-delivery-panel__route" aria-live="polite">
        <header><small>ACTIVE ROUTE</small><strong>{mode.label}</strong><span>{mode.bestWhen}</span></header>
        <ol>{mode.steps.map((step, index) => <li key={step}><b>{index + 1}</b><span>{step}</span></li>)}</ol>
      </section>

      <div className="math-delivery-panel__evidence">
        <article><small>EXPLANATION</small><p>{plan.explanation}</p></article>
        <article><small>VISUAL MODEL</small><p>{plan.visualModel}</p></article>
        <article><small>WORKED EXAMPLE</small><p>{plan.workedExample}</p></article>
        <article><small>GUIDED PRACTICE</small><p>{plan.guidedPractice}</p></article>
        <article className="teacher-answer"><small>TEACHER ANSWERS</small><p>{plan.teacherAnswers}</p></article>
        <article><small>INDEPENDENT CHECK</small><p>{plan.independentCheck}</p></article>
        <article><small>COLLABORATE</small><p>{plan.collaborativeTask}</p></article>
        <article><small>APPLY</small><p>{plan.authenticApplication}</p></article>
      </div>

      <section className="math-delivery-panel__corrections">
        <header><small>MISCONCEPTION → CORRECTIVE MOVE</small><strong>Respond with a model students can inspect.</strong></header>
        <div>{plan.misconceptionMoves.map((item) => <article key={item.misconception}><b>{item.misconception}</b><span>{item.correctiveMove}</span></article>)}</div>
      </section>

      <section className="math-delivery-panel__routes">
        <article><small>SUPPORT</small><p>{plan.differentiation.support}</p></article>
        <article><small>CORE</small><p>{plan.differentiation.core}</p></article>
        <article><small>EXTEND</small><p>{plan.differentiation.extension}</p></article>
      </section>

      <footer>
        <div><small>PRINTABLE + NO-TECH</small><p><b>Print:</b> {plan.printableSupport}</p><p><b>Offline:</b> {plan.offlineFallback}</p></div>
        <div><small>EVIDENCE + OPTIONAL PRACTICE</small><p><b>SpacesEDU:</b> {plan.spacesEvidence}</p><p><b>MathUP:</b> {plan.mathUpUse}</p></div>
      </footer>
    </section>
  );
}
