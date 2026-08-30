"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { authenticSourceNeeds, codeVisualConcepts, visualAuditFacts, visualCandidates, type CodeVisualConcept } from "./visual-review-catalog";

type Decision = "selected" | "hold" | "rejected";
type ReviewRecord = { decision?: Decision; note?: string; allowReuse?: boolean; reviewedAt?: string };
type ReviewState = Record<string, ReviewRecord>;

const storageKey = "classroom-os.visual-review.v1";
const categories = ["All", "Morning Screen", "Technology & AI", "Object Story", "Lesson Visual", "Public Site", "Unit World"] as const;
const previewModes = ["Projector", "Desktop", "Mobile crop", "Print"] as const;

function readReviews(): ReviewState {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) ?? "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function safeImport(value: unknown): ReviewState | null {
  if (!value || typeof value !== "object") return null;
  const source = "reviews" in value && value.reviews && typeof value.reviews === "object" ? value.reviews : value;
  const result: ReviewState = {};
  const reviewableIds = new Set([...visualCandidates.map(candidate => candidate.id), ...codeVisualConcepts.map(concept => concept.id)]);
  for (const [id, record] of Object.entries(source as Record<string, unknown>)) {
    if (!reviewableIds.has(id) || !record || typeof record !== "object") continue;
    const raw = record as Record<string, unknown>;
    const decision = raw.decision === "selected" || raw.decision === "hold" || raw.decision === "rejected" ? raw.decision : undefined;
    result[id] = {
      decision,
      note: typeof raw.note === "string" ? raw.note.slice(0, 500) : "",
      allowReuse: raw.allowReuse === true,
      reviewedAt: typeof raw.reviewedAt === "string" ? raw.reviewedAt : undefined,
    };
  }
  return result;
}

function ConceptVisual({ concept }: { concept: CodeVisualConcept }) {
  if (concept.kind === "shape") return <div className="concept-shape"><b>ARRIVE</b><i /><b>LEARN</b><i /><b>BREAK</b><i /><b>MAKE</b><i /><b>GO</b></div>;
  if (concept.kind === "compass") return <div className="concept-compass"><span>HELPS<br/>LEARNING</span><span>CHECK<br/>IT</span><span>STOP +<br/>ASK</span></div>;
  if (concept.kind === "roles") return <div className="concept-roles">{[["?","THINKER"],["›","PROMPTER"],["✓","CHECKER"],["↔","CONNECTOR"]].map(([icon,label]) => <span key={label}><b>{icon}</b><small>{label}</small></span>)}</div>;
  if (concept.kind === "story") return <div className="concept-story">{["VISIBLE CLUE","BEGINNING","TURN","MEANING"].map((label,index) => <span key={label}><b>{index + 1}</b><small>{label}</small></span>)}</div>;
  if (concept.kind === "source") return <div className="concept-source"><span className="source-picture"/><div><small>SOURCE · CREATOR · DATE</small><b>LOOK BEFORE THE EXPLANATION</b><p>What can this source show? What can it not prove?</p></div></div>;
  if (concept.kind === "student") return <div className="concept-student">{["START","PAIR","CHECK","FINISH","POST?"].map((label,index) => <span key={label}><b>{index + 1}</b>{label}</span>)}</div>;
  if (concept.kind === "family") return <div className="concept-family">{["AT SCHOOL","STUDENTS MAKE","TEACHER NOTICES","ASK AT HOME"].map((label,index) => <span key={label}><b>0{index + 1}</b>{label}</span>)}</div>;
  return <div className="concept-year">{["SEP","NOV","JAN","MAR","MAY","JUN"].map((label,index) => <span key={label} style={{ "--stop": index } as React.CSSProperties}><i />{label}</span>)}</div>;
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export default function VisualReviewStudio({ onHome }: { onHome: () => void }) {
  const [reviews, setReviews] = useState<ReviewState>(readReviews);
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [previewMode, setPreviewMode] = useState<(typeof previewModes)[number]>("Projector");
  const [onlyUndecided, setOnlyUndecided] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  const saveReviews = (next: ReviewState) => {
    setReviews(next);
    try { window.localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
  };

  const updateReview = (id: string, patch: Partial<ReviewRecord>) => {
    saveReviews({ ...reviews, [id]: { ...reviews[id], ...patch, reviewedAt: new Date().toISOString() } });
  };

  const visible = visualCandidates.filter(candidate => (category === "All" || candidate.category === category) && (!onlyUndecided || !reviews[candidate.id]?.decision));
  const grouped = useMemo(() => Array.from(new Set(visible.map(candidate => candidate.briefId))).map(briefId => ({ briefId, candidates: visible.filter(candidate => candidate.briefId === briefId) })), [visible]);
  const counts = [...visualCandidates, ...codeVisualConcepts].reduce((total, item) => {
    const decision = reviews[item.id]?.decision ?? "undecided";
    total[decision] += 1;
    return total;
  }, { selected: 0, hold: 0, rejected: 0, undecided: 0 });

  const exportReviews = () => downloadJson("classroom-os-visual-review.json", {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    note: "Selections are review decisions only. They do not change either live site until an approved implementation pass.",
    reviews,
    selected: visualCandidates.filter(candidate => reviews[candidate.id]?.decision === "selected").map(candidate => ({ ...candidate, review: reviews[candidate.id] })),
  });

  const importReviews = async (file?: File) => {
    if (!file) return;
    try {
      const next = safeImport(JSON.parse(await file.text()));
      if (!next) throw new Error("Invalid review file");
      saveReviews(next);
    } catch {
      window.alert("That file is not a Classroom OS visual-review export.");
    } finally {
      if (importRef.current) importRef.current.value = "";
    }
  };

  const clearReviews = () => {
    if (!window.confirm("Clear every visual decision and note on this computer?")) return;
    saveReviews({});
  };

  return (
    <div className={`visual-review page preview-${previewMode.toLowerCase().replaceAll(" ", "-")}`}>
      <header className="visual-review-hero">
        <div><button type="button" onClick={onHome}>← Teacher Home</button><p>PRIVATE · VISUAL REVIEW STUDIO</p><h1>Choose the visuals before they enter the classroom.</h1><span>Twenty original image candidates, eight live diagram concepts, and four authentic-source requirements. Nothing here automatically changes the Teacher or public site.</span></div>
        <aside><strong>If this disappeared, would noticing, understanding, discussion, or action become weaker?</strong><p>If not, it is probably decoration.</p></aside>
      </header>

      <section className="visual-audit-strip" aria-label="Current visual audit">{visualAuditFacts.map(fact => <article key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></article>)}</section>

      <section className="visual-review-command" aria-label="Visual review controls">
        <div className="visual-review-counts"><span><b>{counts.selected}</b> Select</span><span><b>{counts.hold}</b> Hold</span><span><b>{counts.rejected}</b> No</span><span><b>{counts.undecided}</b> Open</span></div>
        <div className="visual-review-actions"><button type="button" onClick={exportReviews}>Download decisions</button><button type="button" onClick={() => importRef.current?.click()}>Restore decisions</button><button type="button" onClick={() => window.print()}>Print summary</button><button type="button" className="danger" onClick={clearReviews}>Clear</button><input ref={importRef} type="file" accept="application/json" onChange={event => importReviews(event.target.files?.[0])} /></div>
      </section>

      <section className="visual-review-filters">
        <div role="group" aria-label="Filter visuals by category">{categories.map(item => <button type="button" aria-pressed={category === item} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <label><input type="checkbox" checked={onlyUndecided} onChange={event => setOnlyUndecided(event.target.checked)} /> Show only undecided</label>
        <div role="group" aria-label="Preview size">{previewModes.map(item => <button type="button" aria-pressed={previewMode === item} key={item} onClick={() => setPreviewMode(item)}>{item}</button>)}</div>
      </section>

      <main className="visual-candidate-groups">
        {grouped.map(group => {
          const lead = group.candidates[0];
          return <section key={group.briefId} className="visual-candidate-group">
            <header><div><p>{lead.category.toUpperCase()}</p><h2>{lead.learningJob}</h2></div><span>{group.candidates.length} candidate{group.candidates.length === 1 ? "" : "s"}</span></header>
            <div className="visual-candidate-grid">{group.candidates.map(candidate => {
              const review = reviews[candidate.id] ?? {};
              return <article key={candidate.id} className={`visual-candidate-card decision-${review.decision ?? "undecided"}`}>
                <div className="visual-context-frame">
                  <header><span>{candidate.id} · {candidate.category}</span><b>{previewMode}</b></header>
                  <figure><Image unoptimized src={candidate.src} alt={candidate.alt} fill sizes="(max-width: 780px) 100vw, (max-width: 1200px) 50vw, 34vw" /><figcaption>{candidate.caption}</figcaption></figure>
                </div>
                <div className="visual-candidate-copy">
                  <header><div><h3>{candidate.title}</h3><p>{candidate.difference}</p></div>{candidate.publicSafe && <span>PUBLIC-SAFE</span>}</header>
                  <details><summary>Where and why ▾</summary><div><strong>PROPOSED PLACEMENT</strong>{candidate.proposedPlacements.map(item => <p key={item}>→ {item}</p>)}<strong>INTENTIONAL REUSE RULE</strong><p>{candidate.reuseRule}</p><strong>ALT TEXT DRAFT</strong><p>{candidate.alt}</p></div></details>
                  <fieldset><legend>Your decision</legend>{(["selected", "hold", "rejected"] as const).map(decision => <button type="button" key={decision} aria-pressed={review.decision === decision} onClick={() => updateReview(candidate.id, { decision })}>{decision === "selected" ? "Select" : decision === "hold" ? "Hold" : "No"}</button>)}</fieldset>
                  <label className="visual-note"><span>Teacher note</span><textarea rows={2} maxLength={500} value={review.note ?? ""} onChange={event => updateReview(candidate.id, { note: event.target.value })} placeholder="Crop, change, combine, or placement note…" /></label>
                  <label className="visual-reuse"><input type="checkbox" checked={review.allowReuse ?? false} onChange={event => updateReview(candidate.id, { allowReuse: event.target.checked })} /> Allow intentional reuse beyond the proposed placement</label>
                  <div className="visual-file-actions">
                    <a href={candidate.src} target="_blank" rel="noreferrer">Open full image ↗</a>
                    <a href={candidate.src} download>Download image ↓</a>
                  </div>
                </div>
              </article>;
            })}</div>
          </section>;
        })}
        {!grouped.length && <section className="visual-review-empty"><strong>Every visible candidate has a decision.</strong><button type="button" onClick={() => setOnlyUndecided(false)}>Show all</button></section>}
      </main>

      <section className="code-visual-review">
        <header><div><p>CODE-BUILT · EXACT WORDING · PRINTABLE</p><h2>Eight diagrams that should not be generated as pictures.</h2><span>These remain crisp on projector, mobile, and paper. Select/Hold/No applies to the design direction; exact wording stays editable.</span></div><b>LIVE CONCEPTS</b></header>
        <div>{codeVisualConcepts.map(concept => {
          const review = reviews[concept.id] ?? {};
          return <article key={concept.id} className={`decision-${review.decision ?? "undecided"}`}><ConceptVisual concept={concept}/><section><small>{concept.id} · {concept.placement}</small><h3>{concept.title}</h3><p>{concept.job}</p><fieldset><legend>Decision</legend>{(["selected", "hold", "rejected"] as const).map(decision => <button type="button" key={decision} aria-pressed={review.decision === decision} onClick={() => updateReview(concept.id, { decision })}>{decision === "selected" ? "Select" : decision === "hold" ? "Hold" : "No"}</button>)}</fieldset></section></article>;
        })}</div>
      </section>

      <section className="authentic-source-review">
        <header><p>DO NOT GENERATE</p><h2>Four places where authenticity matters more than original artwork.</h2><span>These need real, attributed images, maps, documents, or data inside a strong visual frame.</span></header>
        <div>{authenticSourceNeeds.map((item, index) => <article key={item.title}><b>0{index + 1}</b><div><h3>{item.title}</h3><p>{item.need}</p><small>{item.placement}</small></div></article>)}</div>
      </section>
    </div>
  );
}
