"use client";

import Image from "next/image";
import { useState } from "react";
import {
  fairSocietyDecisions,
  fairSocietyPressureTests,
  heronCommonsFacts,
  heronSources,
  powerCheckQuestions,
  powerInquiry,
  powerLenses,
  powerTerms,
  unitPowerFocus,
  type PowerLensId,
} from "./power-inquiry-data";
import "./power-inquiry.css";
import "./power-inquiry-readiness.css";

export function PowerInquiryThread({ unitId, compact = false }: { unitId?: string; compact?: boolean }) {
  const focus = unitId ? unitPowerFocus[unitId] ?? [] : [];
  return (
    <section className={`power-thread ${compact ? "power-thread--compact" : ""}`} aria-labelledby={`power-thread-title-${unitId ?? "all"}`}>
      <header>
        <div>
          <small>RECURRING INQUIRY · RETURN TO IT ALL YEAR</small>
          <h2 id={`power-thread-title-${unitId ?? "all"}`}>{powerInquiry.recurringQuestion}</h2>
        </div>
        <p>Look through four connected lenses. No lens gives the whole answer.</p>
      </header>
      <div className="power-lens-grid">
        {powerLenses.map((lens) => {
          const highlighted = focus.length === 0 || focus.includes(lens.id);
          return (
            <article key={lens.id} data-lens={lens.id} className={highlighted ? "is-focus" : ""}>
              <span>{lens.number}</span>
              <div><small>{lens.label}</small><strong>{lens.studentLabel}</strong><p>{lens.question}</p>{!compact && <ul>{lens.clues.map((clue) => <li key={clue}>{clue}</li>)}</ul>}</div>
            </article>
          );
        })}
      </div>
      {!compact && <footer><b>DEEPER QUESTION</b><span>{powerInquiry.culminatingQuestion}</span></footer>}
    </section>
  );
}

const questionLens: readonly PowerLensId[] = ["political", "political", "economic", "economic", "relational", "information", "relational"];

export function PowerCheckCard({ compact = false, quick = false, title = "Run a Power Check" }: { compact?: boolean; quick?: boolean; title?: string }) {
  const questionIndexes = quick ? [0, 1, 6] : powerCheckQuestions.map((_, index) => index);
  return (
    <aside className={`power-check ${compact ? "power-check--compact" : ""}`} aria-label={title}>
      <header><small>PAUSE · POINT TO EVIDENCE · STAY OPEN TO REVISION</small><h3>{title}</h3></header>
      <ol>{questionIndexes.map((index) => <li key={powerCheckQuestions[index]} data-lens={questionLens[index]}><b>{index + 1}</b><span>{powerCheckQuestions[index]}</span></li>)}</ol>
      {!compact && <p>Use all seven for a major decision. For a quick check, choose the two or three that matter most.</p>}
    </aside>
  );
}

const heronRecordGroups = [
  { label: "DECIDED", indexes: [0, 1] },
  { label: "PROPOSED OR FORECAST", indexes: [2, 3, 4, 6, 7] },
  { label: "EVIDENCE + STILL OPEN", indexes: [5, 8, 9] },
] as const;

function HeronEventRecord({ printOnly = false }: { printOnly?: boolean }) {
  return <section className={`same-event-record ${printOnly ? "same-event-record--print" : "same-event-record--screen"}`}>
    <h3>What the public record says</h3>
    <div>{heronRecordGroups.map((group) => <article key={group.label}><h4>{group.label}</h4><ol>{group.indexes.map((index) => <li key={heronCommonsFacts[index]}>{heronCommonsFacts[index]}</li>)}</ol></article>)}</div>
    <p><b>Remember:</b> a decision, forecast, promise, public submission, and completed result are not the same kind of evidence.</p>
  </section>;
}

export function SameEventSourceLab({ compact = false }: { compact?: boolean }) {
  const [sourceIndex, setSourceIndex] = useState<number | null>(null);
  const [showRecord, setShowRecord] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const source = sourceIndex === null ? null : heronSources[sourceIndex];
  return (
    <section className={`same-event-lab ${compact ? "same-event-lab--compact" : ""}`} aria-labelledby="same-event-title">
      <header>
        <div><small>FICTIONAL PRACTICE CASE · BAYTREE IS NOT A REAL PLACE</small><h2 id="same-event-title">One event. Eight frames.</h2><p>{powerInquiry.keyUnderstanding}</p></div>
        <span>SAME FACTS · DIFFERENT SPOTLIGHTS</span>
      </header>
      <figure className="same-event-scene">
        <Image unoptimized src="/images/heron-commons-media-case-v1.webp" width={1672} height={941} alt="Illustrated fictional public works yard beside a river with housing plans, workers, community members, mature cottonwood trees, young plants, a city building, river path, and a great blue heron" />
        <figcaption><b>FICTIONAL CONCEPT ILLUSTRATION</b><span>This helps us picture the proposed place. It is not evidence that building or planting has begun. Notice what a crop or caption could push to the centre.</span></figcaption>
      </figure>
      <div className="same-event-record-toggle">
        <button type="button" aria-expanded={showRecord} onClick={() => setShowRecord((value) => !value)}>{showRecord ? "Hide" : "Open"} the confirmed event record</button>
        <p>Read the common record before deciding which frame is most useful.</p>
      </div>
      {showRecord && <HeronEventRecord />}
      <HeronEventRecord printOnly />
      <nav className="same-event-source-tabs" aria-label="Choose one fictional source frame">
        {heronSources.map((item, index) => <button type="button" key={item.id} className={index === sourceIndex ? "selected" : ""} aria-current={index === sourceIndex ? "true" : undefined} aria-controls="same-event-source-card" onClick={() => { setSourceIndex(index); setShowAnalysis(false); }}><b>{index + 1}</b><span><small>{item.role}</small><strong>{item.publisher}</strong></span></button>)}
      </nav>
      {!source && <section className="same-event-source-start"><small>DO NOT START WITH A “CORRECT” SOURCE</small><h3>Your teacher will assign or choose a frame.</h3><p>Read its headline and account. Find what it shows, skips, spotlights, and could lead an audience to think, feel, or do.</p></section>}
      {source && <article id="same-event-source-card" className="same-event-source-card" data-source={source.id} aria-live="polite">
        <header><div><small>SOURCE {(sourceIndex ?? 0) + 1} OF {heronSources.length} · {source.role}</small><h3>{source.headline}</h3></div><span>{source.publisher}</span></header>
        <blockquote>{source.account}</blockquote>
        <div className="same-event-source-meta"><p><b>Who pays?</b>{source.funding}</p><p><b>Image choice</b>{source.imageChoice}</p></div>
        <button type="button" className="same-event-reveal" aria-expanded={showAnalysis} onClick={() => setShowAnalysis((value) => !value)}>{showAnalysis ? "Hide the frame notes" : "Reveal the frame notes"}</button>
        {showAnalysis && <section className="same-event-analysis"><article><b>SPOTLIGHTS</b><p>{source.centres}</p></article><article><b>SKIPS</b><p>{source.skips}</p></article><article><b>COULD LEAD US TO…</b><p>{source.wants}</p></article></section>}
      </article>}
      <section className="same-event-print-sources" aria-label="All eight fictional source frames for print">{heronSources.map((item, index) => <article key={item.id}><header><small>SOURCE {index + 1} · {item.role}</small><h3>{item.headline}</h3><span>{item.publisher}</span></header><p>{item.account}</p><dl><div><dt>WHO PAYS?</dt><dd>{item.funding}</dd></div><div><dt>SPOTLIGHTS</dt><dd>{item.centres}</dd></div><div><dt>SKIPS</dt><dd>{item.skips}</dd></div><div><dt>POSSIBLE EFFECT</dt><dd>{item.wants}</dd></div></dl></article>)}</section>
      <section className="same-event-routine" aria-label="Source comparison routine">
        {[
          ["SOURCE", "Who made it? Who pays?"],
          ["SHOWS", "Which confirmed facts appear?"],
          ["SKIPS", "Which important facts are absent?"],
          ["SPOTLIGHTS", "What comes first or looks largest?"],
          ["STEERS", "What might it want us to think, feel, or do?"],
          ["SUPPORT", "What is evidence, a promise, or still unknown?"],
        ].map(([label, prompt], index) => <article key={label}><b>{index + 1}</b><strong>{label}</strong><p>{prompt}</p></article>)}
      </section>
      <footer><strong>Do not rank source types from “good” to “bad.”</strong><span>Ask what each source is useful for, what it cannot prove alone, and what another source must check.</span></footer>
    </section>
  );
}

export function PowerTermBank() {
  return (
    <details className="power-term-bank">
      <summary><span><small>GRADE 6 WORD HELP</small><strong>Framing, bias, propaganda, misinformation, oligarchy, and more</strong></span><b>Open</b></summary>
      <div>{powerTerms.map(({ term, meaning }) => <article key={term}><h4>{term}</h4><p>{meaning}</p></article>)}</div>
      <footer><b>LABEL WITH CARE</b><span>Describe the evidence first. Disagreement is not propaganda. If you do not know whether someone meant to deceive, say “false or misleading,” not “disinformation.”</span></footer>
    </details>
  );
}

export function ConcentratedPowerOverlay() {
  return (
    <aside className="oligarchy-overlay">
      <header><small>CONCENTRATED-POWER OVERLAY</small><h3>Could a small group hold much more power?</h3></header>
      <p><b>Oligarchy</b> means a small group holds much more power than most people. It is not a fourth classroom model or a verdict about a whole country.</p>
      <div>{["money or resource ownership", "media or information control", "access to leaders", "control of institutions"].map((mechanism) => <span key={mechanism}>{mechanism}</span>)}</div>
      <strong>Place this question over any system: Which steps still exist on paper, and which choices have become hard for ordinary people to shape or challenge?</strong>
    </aside>
  );
}

export function NationGovernanceTransfer() {
  return (
    <section className="nation-governance-transfer">
      <header><small>NATION-SPECIFIC TRANSFER · LEARN FROM THE NATION'S OWN SOURCE</small><h3>Governance can also be about relationships and responsibilities.</h3></header>
      <div>
        <article><b>1 · NAME</b><p>Which Nation is connected to this place? Do not merge distinct Nations into one model.</p></article>
        <article><b>2 · READ</b><p>What authority, relationship, responsibility, or priority does the Nation name in its own public source?</p></article>
        <article><b>3 · CHANGE</b><p>What changes in the decision because of that authority or relationship?</p></article>
        <article><b>4 · LIMIT</b><p>What does this public page not tell us, and what must not be copied or generalized?</p></article>
      </div>
      <nav><a href="https://katzie.ca/governance/self-government/" target="_blank" rel="noreferrer">Katzie incremental self-government ↗</a><a href="https://katzie.ca/governance/referrals/" target="_blank" rel="noreferrer">Katzie Territorial Guardianship ↗</a></nav>
      <p><b>Important:</b> a First Nation is a government and rights-holder, not simply another stakeholder or a “fourth level” of municipal government.</p>
    </section>
  );
}

export function FairSocietyStudio({ teacher = false }: { teacher?: boolean }) {
  const [pressure, setPressure] = useState(0);
  return (
    <section className="fair-society-studio" aria-labelledby="fair-society-title">
      <header><div><small>{teacher ? "CULMINATING TRANSFER · TEACHER PREVIEW" : "CULMINATING TRANSFER · PAPER OR GROUP BOARD"}</small><h2 id="fair-society-title">Design a fair society—then put it under pressure.</h2><p>Do not design a perfect world. Make rules, face a tension, and show what you would revise.</p></div><span>TRADE-OFFS ARE THE WORK</span></header>
      <section className="fair-society-decisions"><h3>Your society must decide:</h3><ol>{fairSocietyDecisions.map((decision, index) => <li key={decision}><b>{index + 1}</b><span>{decision}</span></li>)}</ol></section>
      <section className="fair-society-pressure"><header><small>PRESSURE TEST</small><h3>Choose one tension. What breaks?</h3></header><nav>{fairSocietyPressureTests.map((item, index) => <button type="button" key={item} className={pressure === index ? "selected" : ""} aria-pressed={pressure === index} onClick={() => setPressure(index)}><b>{index + 1}</b><span>{item}</span></button>)}</nav><article><small>TEST THIS TENSION</small><strong>{fairSocietyPressureTests[pressure]}</strong><p>Who gains power? Who loses voice or carries a cost? Which rule protects people? Which new problem appears? Revise one rule and name the trade-off.</p></article></section>
      <ol className="fair-society-print-tests">{fairSocietyPressureTests.map((item) => <li key={item}>{item}</li>)}</ol>
      <PowerCheckCard compact title="Check the society you created" />
      <footer><p><b>How much power would an ordinary person have in the society you created?</b></p><p><b>{powerInquiry.culminatingQuestion}</b></p></footer>
    </section>
  );
}
