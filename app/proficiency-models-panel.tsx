"use client";

import { useId, useState } from "react";
import {
  proficiencyLevels,
  proficiencyModelProtocol,
  proficiencyModelSets,
  proficiencyModelSetById,
  type ProficiencyLevel,
  type ProficiencyModel,
  type ProficiencyModelSetId,
} from "./proficiency-models";
import { CompanionMark } from "./classroom-companions";
import "./proficiency-models-panel.css";

export type ProficiencyModelsPanelProps = {
  setId: ProficiencyModelSetId | string;
  audience?: "teacher" | "student";
  display?: "focus" | "compare";
  initialLevel?: ProficiencyLevel;
  className?: string;
};

export type ProficiencyModelsLibraryProps = {
  audience?: "teacher" | "student";
  initialSetId?: ProficiencyModelSetId | string;
  display?: "focus" | "compare";
  className?: string;
};

function ModelCard({ model, audience, headingId }: { model: ProficiencyModel; audience: "teacher" | "student"; headingId?: string }) {
  return <article className={`proficiency-model-card proficiency-model-card--${model.level.toLowerCase()}`} aria-labelledby={headingId}>
    <header>
      <span aria-hidden="true" />
      <div>
        <small>{model.level}</small>
        <h4 id={headingId}>{model.growthLabel}</h4>
      </div>
    </header>
    <section className="proficiency-model-card__sample" aria-label={`${model.level} student example`}>
      <small>ONE POSSIBLE STUDENT RESPONSE</small>
      <blockquote>{model.sample}</blockquote>
    </section>
    <div className="proficiency-model-card__feedback">
      <section>
        <h5>What is already working</h5>
        <ul>{model.whatWorks.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section>
        <h5>Try next</h5>
        <p>{model.nextImprovement}</p>
      </section>
    </div>
    {audience === "teacher" && <aside className="proficiency-model-card__teacher"><b>Teacher use note</b><p>{model.teacherUseNote}</p></aside>}
  </article>;
}

export function ProficiencyModelsPanel({
  setId,
  audience = "teacher",
  display = "focus",
  initialLevel = "Proficient",
  className = "",
}: ProficiencyModelsPanelProps) {
  const set = proficiencyModelSetById(setId);
  const [level, setLevel] = useState<ProficiencyLevel>(initialLevel);
  const headingId = useId();
  const focusId = useId();

  if (!set) return null;

  const model = set.models.find((item) => item.level === level) ?? set.models[2];

  return <section className={`proficiency-models-panel proficiency-models-panel--${display} ${className}`.trim()} aria-labelledby={headingId}>
    <header className="proficiency-models-panel__hero">
      <CompanionMark role="build" size="large" motion="once" />
      <div>
        <small>GRADE 6 · PROFICIENCY MODEL GARDEN</small>
        <h3 id={headingId}>{set.title}</h3>
        <p>{set.subtitle}</p>
      </div>
      <span className="proficiency-models-panel__trail">Notice → name → try → revise</span>
    </header>

    <section className="proficiency-models-panel__prompt">
      <small>THE SAME LEARNING TARGET AT EVERY LEVEL</small>
      <p>{set.prompt}</p>
      <ul aria-label="Criteria">{set.criteria.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul>
    </section>

    {set.sourceCapsule && <aside className="proficiency-models-panel__source">
      <b>{set.sourceCapsule.label}</b>
      <p>{set.sourceCapsule.text}</p>
    </aside>}

    <aside className="proficiency-models-panel__guardrail">
      <span aria-hidden="true">↗</span>
      <div><b>Models are possibilities—not answers to copy.</b><p>{set.copyGuard}</p></div>
    </aside>

    {display === "focus" ? <>
      <nav className="proficiency-models-panel__levels" aria-label="Choose a proficiency example">
        {proficiencyLevels.map((item) => <button
          key={item}
          type="button"
          className={item === model.level ? "active" : ""}
          aria-pressed={item === model.level}
          aria-controls={focusId}
          onClick={() => setLevel(item)}
        ><small>VIEW</small><b>{item}</b></button>)}
      </nav>
      <div id={focusId} className="proficiency-models-panel__focus" aria-live="polite">
        <ModelCard model={model} audience={audience} headingId={`${focusId}-heading`} />
      </div>
    </> : <div className="proficiency-models-panel__comparison">
      {set.models.map((item, index) => <ModelCard key={item.level} model={item} audience={audience} headingId={`${focusId}-heading-${index}`} />)}
    </div>}

    <details className="proficiency-models-panel__protocol">
      <summary><span><small>USE THE MODEL WITHOUT COPYING IT</small><b>{proficiencyModelProtocol.title}</b></span><strong>Open protocol ↓</strong></summary>
      <div>
        <ol>{proficiencyModelProtocol.studentSteps.map((step) => <li key={step}>{step}</li>)}</ol>
        {audience === "teacher" && <section><h4>Teacher moves for this set</h4><ul>{set.teacherUse.map((note) => <li key={note}>{note}</li>)}</ul></section>}
      </div>
    </details>

    {audience === "teacher" && <details className="proficiency-models-panel__teacher-guardrails">
      <summary>Whole-scale assessment guardrails</summary>
      <ul>{proficiencyModelProtocol.teacherGuardrails.map((note) => <li key={note}>{note}</li>)}</ul>
    </details>}
  </section>;
}

/** A single teacher-facing entry point for choosing among the reusable model sets. */
export function ProficiencyModelsLibrary({
  audience = "teacher",
  initialSetId = proficiencyModelSets[0].id,
  display = "focus",
  className = "",
}: ProficiencyModelsLibraryProps) {
  const [setId, setSetId] = useState<string>(() => proficiencyModelSetById(initialSetId)?.id ?? proficiencyModelSets[0].id);
  const libraryHeadingId = useId();

  return <section className={`proficiency-model-library ${className}`.trim()} aria-labelledby={libraryHeadingId}>
    <header>
      <div><small>WORKED EXAMPLES · NOT ANSWER KEYS</small><h2 id={libraryHeadingId}>A model garden for noticing growth</h2></div>
      <p>Let students try first. Reveal one example, name what is visible, and borrow a move—not the wording.</p>
    </header>
    <nav aria-label="Choose a worked-example set">
      {proficiencyModelSets.map((set) => <button
        key={set.id}
        type="button"
        aria-pressed={setId === set.id}
        onClick={() => setSetId(set.id)}
      ><small>MODEL SET</small><strong>{set.title}</strong></button>)}
    </nav>
    <ProficiencyModelsPanel setId={setId} audience={audience} display={display} />
  </section>;
}
