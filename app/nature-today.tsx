/// <reference types="vite/client" />
"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import natureData from "../content/nature-today.json";
import "./nature-today.css";

type NatureCard = {
  id: string;
  title: string;
  sourceTitle?: string;
  filename: string;
  alt: string;
  creator: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  location: string;
  date: string;
  notice: string;
  explain: string;
  returnPrompt: string;
  teacherNote: string;
  notes?: string | string[];
  changes?: string | string[];
  context?: string | string[];
};

type NatureSource = { title: string; url: string; note: string };
type Stage = "notice" | "explain" | "revisit";
type NatureTodayProps = { audience?: "teacher" | "student"; hub?: "teacher" | "equity" };
type VancouverDay = { key: string; month: number; weekday: number; utc: number; label: string };

const cards: NatureCard[] = natureData.cards;
const sources: NatureSource[] = natureData.sources;
const stages: { id: Stage; label: string; cue: string; starter: string }[] = [
  { id: "notice", label: "Notice", cue: "LOOK CLOSELY", starter: "I notice ___ in the photograph." },
  { id: "explain", label: "Explain", cue: "USE EVIDENCE", starter: "I think ___ because ___. We could check ___." },
  { id: "revisit", label: "Revisit", cue: "LOOK AGAIN, OVER TIME", starter: "We could observe ___ again and compare ___." },
];
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function vancouverDay(now = new Date()): VancouverDay {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  const year = value("year");
  const month = value("month");
  const day = value("day");
  const utc = Date.UTC(year, month - 1, day);
  return {
    key: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    month,
    utc,
    weekday: new Date(utc).getUTCDay(),
    label: new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Vancouver", weekday: "long", month: "long", day: "numeric", year: "numeric",
    }).format(now),
  };
}

function dailyIndex(day: VancouverDay) {
  if (!cards.length) return 0;
  const days = Math.floor((day.utc - Date.UTC(2026, 9, 5)) / 86_400_000);
  const week = Math.floor(days / 7);
  const weekday = ((days % 7) + 7) % 7;
  const schoolDay = week * 5 + Math.min(weekday, 4);
  return ((schoolDay % cards.length) + cards.length) % cards.length;
}

function selectionFromUrl() {
  if (typeof window === "undefined") return null;
  const requested = new URL(window.location.href).searchParams.get("nature");
  return cards.some((card) => card.id === requested) ? requested : null;
}

function NaturePhoto({ card }: { card: NatureCard }) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");
  return (
    <figure className="nature-today__figure">
      <div className={`nature-today__photo nature-today__photo--${state}`} aria-busy={state === "loading"}>
        {state === "loading" && <span className="nature-today__loading" role="status">Loading photograph…</span>}
        {state !== "error" && (
          <img
            src={asset(`images/nature-today/${card.filename}`)}
            alt={card.alt}
            decoding="async"
            onLoad={() => setState("loaded")}
            onError={() => setState("error")}
          />
        )}
        {state === "error" && (
          <div className="nature-today__image-error" role="status">
            <strong>The photograph could not load.</strong>
            <p>{card.alt}</p>
            <a href={card.sourceUrl} target="_blank" rel="noreferrer">Open the original photograph ↗</a>
            <span>Use the description to begin, or choose another image.</span>
          </div>
        )}
      </div>
      <figcaption>
        <span>{card.location} <span aria-hidden="true">·</span> {card.date}</span>
        <span>
          Photo: <a href={card.sourceUrl} target="_blank" rel="noreferrer">{card.creator}</a>
          {" · "}<a href={card.licenseUrl} target="_blank" rel="noreferrer">{card.license}</a>
        </span>
      </figcaption>
    </figure>
  );
}

/** A display-time weekday rotation. No student data or accounts are required. */
export function NatureToday({ audience = "teacher", hub = "teacher" }: NatureTodayProps) {
  const uid = useId();
  const [day, setDay] = useState(vancouverDay);
  const [selectedId, setSelectedId] = useState<string | null>(selectionFromUrl);
  const [stage, setStage] = useState<Stage>("notice");
  const [focused, setFocused] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const focusButtonRef = useRef<HTMLButtonElement>(null);
  const focusCloseRef = useRef<HTMLButtonElement>(null);
  const seasonal = day.month === 10 || day.month === 11;
  const index = selectedId ? Math.max(0, cards.findIndex((card) => card.id === selectedId)) : seasonal ? dailyIndex(day) : 0;
  const card = cards[index];
  const weekend = day.weekday === 0 || day.weekday === 6;
  const activeStage = stages.find((item) => item.id === stage)!;

  useEffect(() => {
    const refresh = () => {
      const next = vancouverDay();
      setDay((current) => current.key === next.key ? current : next);
    };
    const interval = window.setInterval(refresh, 60_000);
    const onVisibility = () => { if (document.visibilityState === "visible") refresh(); };
    const onPop = () => { setSelectedId(selectionFromUrl()); setStage("notice"); refresh(); };
    window.addEventListener("popstate", onPop);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (focused && !dialog.open) {
      dialog.showModal();
      focusCloseRef.current?.focus();
    } else if (!focused && dialog.open) {
      dialog.close();
    }
  }, [focused]);

  function closeFocus() {
    setFocused(false);
    focusButtonRef.current?.focus();
  }

  function choose(id: string | null) {
    setSelectedId(id);
    setStage("notice");
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("nature", id);
    else url.searchParams.delete("nature");
    window.history.pushState(window.history.state, "", url);
  }

  function changeStage(event: KeyboardEvent<HTMLButtonElement>, position: number, prefix: string) {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (position + 1) % stages.length;
    if (event.key === "ArrowLeft") next = (position + stages.length - 1) % stages.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = stages.length - 1;
    if (next === null) return;
    event.preventDefault();
    setStage(stages[next].id);
    document.getElementById(`${prefix}-tab-${stages[next].id}`)?.focus();
  }

  if (!card) return <section className="nature-today"><h2>Nature Today</h2><p>The image bank is unavailable. Look through a window or revisit a familiar outdoor place: name one detail you can observe and one question you could investigate.</p></section>;

  const question = stage === "notice" ? card.notice : stage === "explain" ? card.explain : card.returnPrompt;

  function workSurface(prefix: string, inFocus = false) {
    const Heading = inFocus ? "h2" : "h1";
    return (
      <>
        <header className="nature-today__heading">
          <div>
            <p className="nature-today__eyebrow">{hub === "equity" ? "PLACE, ACCESS & BELONGING" : "A SMALL DAILY OBSERVATION"}</p>
            <Heading id={`${prefix}-heading`}>Nature Today</Heading>
            <p className="nature-today__intro">Look closely. Build an explanation. Return and compare.</p>
          </div>
          {inFocus ? (
            <button ref={focusCloseRef} type="button" className="nature-today__focus" onClick={closeFocus}>Exit focus <span aria-hidden="true">×</span></button>
          ) : (
            <button ref={focusButtonRef} type="button" className="nature-today__focus" onClick={() => setFocused(true)}>Projector / focus <span aria-hidden="true">⤢</span></button>
          )}
        </header>

        <div className="nature-today__datebar">
          <time dateTime={day.key}>{day.label}</time>
          <span className="nature-today__selection-status">{selectedId ? "Selected from the image bank" : seasonal ? weekend ? "Friday’s rotation image" : "Weekday rotation image" : "Manual study · autumn seasonal example"}</span>
        </div>

        <div className="nature-today__work">
          <div className="nature-today__image-heading">
            <h3>{card.title}</h3>
            <span className="nature-today__count">{String(index + 1).padStart(2, "0")} <span aria-hidden="true">/</span><span className="nature-today__sr-only">of</span> {String(cards.length).padStart(2, "0")}</span>
          </div>
          <p className="nature-today__provenance">Archival photo reference · not a live local sighting</p>
          <NaturePhoto key={`${prefix}-${card.id}`} card={card} />

          <div className="nature-today__thinking">
            <div className="nature-today__tabs" role="tablist" aria-label="Observation stages">
              {stages.map((item, position) => (
                <button
                  type="button" role="tab" id={`${prefix}-tab-${item.id}`} key={item.id}
                  aria-selected={stage === item.id} aria-controls={`${prefix}-panel`}
                  tabIndex={stage === item.id ? 0 : -1}
                  onClick={() => setStage(item.id)} onKeyDown={(event) => changeStage(event, position, prefix)}
                >
                  <span aria-hidden="true">0{position + 1}</span>{item.label}
                </button>
              ))}
            </div>
            <div className="nature-today__prompt" role="tabpanel" id={`${prefix}-panel`} aria-labelledby={`${prefix}-tab-${stage}`} tabIndex={0}>
              <span className="nature-today__cue">{activeStage.cue}</span>
              <p className="nature-today__question">{question}</p>
              <p className="nature-today__starter">{activeStage.starter}</p>
            </div>
          </div>
        </div>

        <div className="nature-today__controls">
          <div className="nature-today__arrows">
            <button type="button" aria-label="Previous photograph" onClick={() => choose(cards[(index + cards.length - 1) % cards.length].id)}>← <span>Previous</span></button>
            <button type="button" aria-label="Next photograph" onClick={() => choose(cards[(index + 1) % cards.length].id)}><span>Next</span> →</button>
          </div>
          <label className="nature-today__bank" htmlFor={`${prefix}-bank`}>
            <span>Image bank</span>
            <select id={`${prefix}-bank`} value={card.id} onChange={(event) => choose(event.target.value)}>
              {cards.map((item, position) => <option key={item.id} value={item.id}>{position + 1}. {item.title}</option>)}
            </select>
          </label>
          <button type="button" className="nature-today__reset" onClick={() => choose(null)} disabled={!selectedId}>
            {seasonal ? "Use weekday image" : "Reset selection"}
          </button>
        </div>
        <p className="nature-today__participate">Think quietly, then share by speaking, pointing, drawing or writing. Everyone contributes an observation.</p>
      </>
    );
  }

  return (
    <>
      <section className="nature-today" aria-labelledby={`${uid}-heading`}>
        {workSurface(uid)}
        {audience === "teacher" && (
          <div className="nature-today__teacher">
            <details>
              <summary>Teach this image <span>2–5 minutes · flexible entry points</span></summary>
              <div className="nature-today__details-content">
                <p><strong>Begin:</strong> Allow 20 quiet seconds to look. Invite one visible detail before an explanation. Ask partners to name their evidence and something they would need to check. Finish with one shared observation and one question to revisit.</p>
                <p><strong>Image note:</strong> {card.teacherNote}</p>
                <p><strong>Equal participation:</strong> Offer rotating roles—detail finder, question collector, recorder and sharer. Let students choose how to respond; a seated or indoor observer contributes equally. Describe the image aloud. Provide the same question and photo for anyone staying indoors.</p>
                <p><strong>Places and access:</strong> Before choosing a return visit, ask whose access needs the route meets and what could improve it. Seek students’ ideas without asking anyone to disclose a disability or personal experience.</p>
                <p><strong>Use with care:</strong> This is an archived photograph with a known source, not evidence of what is happening in Surrey today. Compare it with your own dated observations. This bank supports autumn observation, using photographs taken in different seasons and places.</p>
                <p><strong>Planning:</strong> During October and November, a new image is selected each Vancouver weekday; weekends retain Friday’s image. The 15-image bank cycles again. In other months, choose an autumn example manually. A chosen image stays in the page URL so it can be bookmarked or shared.</p>
                {card.sourceTitle && <p><strong>Original photograph:</strong> <a href={card.sourceUrl} target="_blank" rel="noreferrer">{card.sourceTitle}</a></p>}
                {card.context && <p><strong>Photograph context:</strong> {Array.isArray(card.context) ? card.context.join(" ") : card.context}</p>}
                {card.notes && <p><strong>Source notes:</strong> {Array.isArray(card.notes) ? card.notes.join(" ") : card.notes}</p>}
                {card.changes && <p><strong>Image preparation:</strong> {Array.isArray(card.changes) ? card.changes.join(" ") : card.changes}</p>}
              </div>
            </details>
            <details>
              <summary>Download the classroom materials <span>Print or use offline</span></summary>
              <div className="nature-today__downloads">
                <a href={asset("downloads/nature-today/Nature_Today_Teacher_Pack.pdf")} target="_blank" rel="noreferrer"><strong>Teacher pack ↗</strong><span>Routine, inclusion and outdoor observation</span></a>
                <a href={asset("downloads/nature-today/Nature_Today_Student_Journal.pdf")} target="_blank" rel="noreferrer"><strong>Student journal ↗</strong><span>Low-ink noticing and comparison pages</span></a>
                <a href={asset("downloads/nature-today/Nature_Today_Image_Bank.pdf")} target="_blank" rel="noreferrer"><strong>Image bank ↗</strong><span>Photographs, prompts and attribution</span></a>
                <a href={asset("downloads/nature-today/Nature_Today_Complete_Package.zip")} download><strong>Complete package ↓</strong><span>All three PDFs and the reusable image bank</span></a>
              </div>
            </details>
            <details>
              <summary>Sources & curriculum connections <span>Evidence, communication and place</span></summary>
              <div className="nature-today__details-content">
                <p>Use this as a short routine alongside your planned units. Connections include scientific observation and questioning, evidence-based explanations, oral language, visual interpretation and shared responsibility for accessible places. These are possible connections, not a claim that one photograph meets an entire learning standard.</p>
                <ul className="nature-today__sources">
                  {sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a><span>{source.note}</span></li>)}
                </ul>
              </div>
            </details>
          </div>
        )}
      </section>
      {typeof document !== "undefined" && createPortal(
        <dialog
          ref={dialogRef} className="nature-today nature-today__dialog" aria-labelledby={`${uid}-focus-heading`}
          onCancel={(event) => { event.preventDefault(); closeFocus(); }}
          onClose={closeFocus}
        >
          {focused && workSurface(`${uid}-focus`, true)}
        </dialog>, document.body,
      )}
    </>
  );
}

export default NatureToday;
