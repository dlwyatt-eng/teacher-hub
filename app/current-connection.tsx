"use client";

import { useId, useState } from "react";
import { printClosest } from "./print-support";
import { currentConnectionIsFresh, type CurrentConnection } from "./current-connections";
import { newsroomProgram } from "./newsroom-program";

export type CurrentConnectionPlayerProps = {
  connection: CurrentConnection;
  audience?: "student" | "teacher";
  route?: "quick" | "deep";
};

function ConnectionVisual({ connection }: { connection: CurrentConnection }) {
  if (connection.visual.kind === "population-estimate") {
    const groups = connection.visual.headline.split(",");
    return (
      <section className="current-connection__visual current-connection__visual--population" aria-label={`${connection.visual.headline}. ${connection.visual.detail}`}>
        <small>{connection.visual.eyebrow}</small>
        <div className="current-connection__number" aria-hidden="true">
          {groups.map((group, index) => <span key={`${group}-${index}`}><b>{group}</b><i>{["MILLIONS", "THOUSANDS", "ONES"][index]}</i></span>)}
        </div>
        <p>{connection.visual.detail}</p>
        <div className="current-connection__signals">{connection.visual.signals.map((signal) => <span key={signal.label}><small>{signal.label}</small><strong>{signal.value}</strong></span>)}</div>
      </section>
    );
  }

  if (connection.visual.kind === "civic-power" || connection.visual.kind === "results-check") {
    return (
      <section className="current-connection__visual current-connection__visual--civic" aria-label={`${connection.visual.headline}. ${connection.visual.detail}`}>
        <small>{connection.visual.eyebrow}</small>
        <h4>{connection.visual.headline}</h4>
        <p>{connection.visual.detail}</p>
        <div className="current-connection__signals">{connection.visual.signals.map((signal) => <span key={signal.label}><small>{signal.label}</small><strong>{signal.value}</strong></span>)}</div>
      </section>
    );
  }

  return (
    <section className="current-connection__visual current-connection__visual--transit" aria-label={`${connection.visual.headline}. ${connection.visual.detail}`}>
      <small>{connection.visual.eyebrow}</small>
      <h4>{connection.visual.headline}</h4>
      <div className="current-connection__transit-line" aria-hidden="true">
        <span><i>NOW</i><b>CONSTRUCTION</b></span>
        <em />
        <span><i>NEXT</i><b>BUILD + TEST</b></span>
        <em />
        <span><i>LATER</i><b>ANTICIPATED SERVICE</b></span>
      </div>
      <p>{connection.visual.detail}</p>
      <div className="current-connection__signals">{connection.visual.signals.map((signal) => <span key={signal.label}><small>{signal.label}</small><strong>{signal.value}</strong></span>)}</div>
    </section>
  );
}

function SourceLookPanel({ connection }: { connection: CurrentConnection }) {
  return (
    <section className="current-connection__source-look" aria-label="What to inspect in the named source">
      <header><b>THE SOURCE IS OPEN IN THE PROJECTOR TAB</b><p>Look before the caption, context, or class explanation. These are clues to inspect—not answers to copy.</p></header>
      <div>{connection.sources.map((source) => <article key={source.id}><small>{source.organization}</small><strong>{source.title}</strong><p>{source.lookFor}</p></article>)}</div>
    </section>
  );
}

function ConnectionSourcePage({ connection }: { connection: CurrentConnection }) {
  return (
    <article className="current-connection__print-sheet" aria-label={`${connection.title} source check page`}>
      <header>
        <small>SOURCE LAB · SOURCE CHECK PAGE</small>
        <h2>{connection.title}</h2>
        <p>{connection.question}</p>
        <span>Sources checked {connection.checkedOn} · Refresh by {connection.reviewBy}</span>
      </header>
      <section><b>1 · LOOK</b><p>What is literally here before anyone explains it?</p><i /></section>
      <section><b>2 · NOTICE</b><p>Write or sketch two details you can point to in the source.</p><i /></section>
      <section><b>3 · CLAIM</b><p>Our possible claim is… The question or uncertainty that must stay attached is…</p><i /></section>
      <section><b>4 · COMPARE</b><p>Another interpretation is… Its strongest clue is… An assumption we noticed is…</p><i /></section>
      <section><b>5 · CHECK</b><p>Who made the source? When? What changes after reading its caption, context, data notes, or another source?</p><i /></section>
      <section><b>6 · NEXT</b><p>At first… Now… because… We still cannot say… We will stop, save a question, or follow up.</p><i /></section>
      <footer>{connection.sources.map((source) => <p key={source.id}><b>{source.organization}:</b> {source.title} · checked {source.checkedOn}</p>)}</footer>
    </article>
  );
}

export function CurrentConnectionPlayer({ connection, audience = "student", route = "quick" }: CurrentConnectionPlayerProps) {
  const titleId = useId();
  const [stageIndex, setStageIndex] = useState(0);
  const [selectedClaim, setSelectedClaim] = useState<number | null>(null);
  const [selectedWonder, setSelectedWonder] = useState<number | null>(null);
  const [revealedClaims, setRevealedClaims] = useState<Set<number>>(() => new Set());
  const stages = route === "quick"
    ? connection.stages.filter((item) => ["watch", "notice", "question", "imagine"].includes(item.id))
    : connection.stages;
  const stage = stages[stageIndex] ?? stages[0];
  const fresh = currentConnectionIsFresh(connection);

  const revealClaim = (index: number) => setRevealedClaims((current) => {
    const next = new Set(current);
    next.add(index);
    return next;
  });

  if (!fresh) {
    return (
      <section id={`current-connection-${connection.id}`} className="current-connection current-connection--stale" data-audience={audience} aria-labelledby={titleId}>
        <div>
          <small>SOURCE LAB · REFRESH NEEDED</small>
          <h2 id={titleId}>{connection.title}</h2>
          <p>{audience === "teacher" ? `This source capsule was scheduled for review by ${connection.reviewBy}. Reopen the official sources before projecting it.` : "Your teacher is refreshing this current story. Continue with the main lesson for now."}</p>
        </div>
        {audience === "teacher" && <nav aria-label="Official sources to refresh">{connection.sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer">Open {source.organization}: {source.title} ↗</a>)}</nav>}
      </section>
    );
  }

  return (
    <section id={`current-connection-${connection.id}`} className="current-connection" data-audience={audience} data-connection={connection.id} aria-labelledby={titleId}>
      <header className="current-connection__header">
        <div><small>SOURCE LAB · {connection.minutes}</small><h2 id={titleId}>{connection.title}</h2><p>{connection.question}</p></div>
        <span><b>CHECKED</b>{connection.checkedOn}<small>REVIEW BY {connection.reviewBy}</small></span>
      </header>

      <section className="current-connection__source-launch" aria-label="Named sources for this activity">
        <div><small>SOURCE FIRST</small><strong>Open the real source on the projector.</strong><span>Look once before reading the caption or explanation. Keep the publisher, archive, and date attached.</span></div>
        <nav>{connection.sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><small>{source.sourceKind.replaceAll("-", " ")} · checked {source.checkedOn}</small><strong>{source.title}</strong><span>{source.organization} ↗</span><em>Look for: {source.lookFor}</em></a>)}</nav>
      </section>

      <nav className="current-connection__route" data-route={route} aria-label={`Source Lab ${route} route`}>
        {stages.map((item, index) => <button type="button" key={item.id} aria-current={index === stageIndex ? "step" : undefined} data-visited={index < stageIndex || undefined} onClick={() => setStageIndex(index)}><b>{index + 1}</b><span>{item.label}</span></button>)}
      </nav>

      <div className="current-connection__stage" aria-live="polite">
        <header><small>{stage.label} · MOVE {stageIndex + 1} OF {stages.length}</small><h3>{stage.title}</h3><p>{stage.studentPrompt}</p><div>{stage.responseModes.map((mode) => <span key={mode}>{mode}</span>)}</div></header>

        {stage.id === "watch" && <SourceLookPanel connection={connection} />}

        {stage.id === "notice" && (
          <section className="current-connection__notice-board">
            <SourceLookPanel connection={connection} />
            <aside><b>POINT TO THE PROOF</b><p>Use an exact number, date, label, status word, or visible feature. Save explanations for later.</p><span>“I notice ___.”</span><span>“The source shows ___.”</span></aside>
          </section>
        )}

        {stage.id === "question" && (
          <section className="current-connection__claim-question" aria-label="Possible claim and question">
            <div className="current-connection__claim-picker"><p><strong>1 · Choose a possible claim to test.</strong> It may be supported, too certain, or not supported.</p><div>{connection.claims.map((claim, index) => <button type="button" key={claim.statement} aria-pressed={selectedClaim === index} onClick={() => setSelectedClaim(index)}><b>{index + 1}</b><span>{claim.statement}</span></button>)}</div></div>
            <div className="current-connection__wonder-list"><p><strong>2 · Keep one question attached.</strong> Choose one, combine two, or write a stronger question.</p><div>{connection.wonderChoices.map((wonder, index) => <button type="button" key={wonder} aria-pressed={selectedWonder === index} onClick={() => setSelectedWonder(index)}><b>{String.fromCharCode(65 + index)}</b><span>{wonder}</span></button>)}</div></div>
            <aside><strong>Our possible claim:</strong><span>{selectedClaim === null ? "Choose one claim to test." : connection.claims[selectedClaim].statement}</span><strong>Our question:</strong><span>{selectedWonder === null ? "Choose one—or write a different question on the board." : connection.wonderChoices[selectedWonder]}</span></aside>
          </section>
        )}

        {stage.id === "discuss" && (
          <section className="current-connection__discussion" aria-label="Pair or triad discussion choices">
            <header><b>DECIDE BEFORE THE SOURCE CHECK</b><p>Choose one statement. Do not reveal the verdict yet.</p></header>
            <div className="current-connection__roles"><span><b>1 · EVIDENCE FINDER</b>Point to one exact source detail.</span><span><b>2 · CHALLENGER</b>Name what is uncertain or missing.</span><span><b>3 · REPORTER</b>Give the team&apos;s careful sentence.</span></div>
            <div className="current-connection__discussion-claims">{connection.claims.map((claim) => <article key={claim.statement}><p>{claim.statement}</p><div><span>SUPPORTED?</span><span>TOO CERTAIN?</span><span>NOT SUPPORTED?</span></div></article>)}</div>
          </section>
        )}

        {stage.id === "investigate" && (
          <section className="current-connection__claims">
            <ConnectionVisual connection={connection} />
            <header><b>DECIDE BEFORE THE REVEAL</b><p>Supported, too certain, or not supported?</p></header>
            <div>{connection.claims.map((claim, index) => {
              const revealed = revealedClaims.has(index);
              return <article key={claim.statement} data-revealed={revealed || undefined}><p>{claim.statement}</p>{revealed ? <aside><b>{claim.verdict}</b><span>{claim.explanation}</span></aside> : <button type="button" onClick={() => revealClaim(index)}>Reveal source check</button>}</article>;
            })}</div>
          </section>
        )}

        {stage.id === "imagine" && (
          <section className="current-connection__reconsider">
            {route === "quick" && <ConnectionVisual connection={connection} />}
            <blockquote><span>AT FIRST I THOUGHT…</span><span>NOW I THINK…</span><span>BECAUSE THE SOURCE SHOWS…</span><span>WE STILL CANNOT SAY…</span></blockquote>
            <div><article><b>WE CAN SAY</b>{connection.boundary.supported.map((item) => <p key={item}>✓ {item}</p>)}</article><article><b>WE CANNOT CLAIM YET</b>{connection.boundary.notSupported.map((item) => <p key={item}>? {item}</p>)}</article></div>
            <aside className="current-connection__endings" aria-label="Choose how this story ends">{newsroomProgram.shared.endings.map((ending) => <article key={ending.id}><small>{ending.label}</small><strong>{ending.title}</strong><p>{ending.detail}</p></article>)}</aside>
          </section>
        )}

        <footer className="current-connection__controls">
          <button type="button" disabled={stageIndex === 0} onClick={() => setStageIndex((current) => Math.max(0, current - 1))}>← Previous move</button>
          <span>{audience === "teacher" ? stage.teacherMove : "One shared screen · answers can happen through pointing, talking, the board, or paper."}</span>
          <button type="button" disabled={stageIndex === stages.length - 1} onClick={() => setStageIndex((current) => Math.min(stages.length - 1, current + 1))}>Next move →</button>
        </footer>
      </div>

      {audience === "teacher" && (
        <aside className="current-connection__teacher">
          <header><div><small>TEACHER / TTOC</small><strong>Use the source; do not turn the source into wallpaper.</strong></div><button type="button" onClick={(event) => printClosest(event.currentTarget, ".current-connection")}>Print one-page source check</button></header>
          <div><section><b>BEFORE CLASS</b>{connection.teacher.beforeClass.map((item) => <p key={item}>• {item}</p>)}</section><section><b>SHORT ROUTE</b><p>{connection.teacher.shortRoute}</p><b>IF A LINK FAILS</b><p>{connection.teacher.offlineFallback}</p></section></div>
          <nav aria-label="Source Lab official sources">{connection.sources.map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><small>{source.sourceKind.replaceAll("-", " ").toUpperCase()} · CHECKED {source.checkedOn}</small><strong>{source.title}</strong><span>{source.organization} ↗</span></a>)}</nav>
        </aside>
      )}

      <ConnectionSourcePage connection={connection} />
    </section>
  );
}

export default CurrentConnectionPlayer;
