"use client";

import { useEffect, useId, useRef, useState } from "react";

export type StudentTeacherLayerText = string | readonly string[];

export type StudentTeacherLayerProps = {
  bigIdea: string;
  coreCompetencies: readonly string[];
  say: StudentTeacherLayerText;
  ask: StudentTeacherLayerText;
  watchFor: StudentTeacherLayerText;
  ifStuck: StudentTeacherLayerText;
  nextMove: StudentTeacherLayerText;
  contentBackground?: StudentTeacherLayerText;
  timing?: string;
  teacherResource?: {
    title: string;
    url: string;
    pausePrompt: string;
    secondary?: { title: string; url: string };
  };
};

function lines(value: StudentTeacherLayerText, limit = 2): string[] {
  return (Array.isArray(value) ? value : [value])
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function NoteList({ value, limit = 2 }: { value: StudentTeacherLayerText; limit?: number }) {
  const items = lines(value, limit);
  if (items.length === 1) return <p>{items[0]}</p>;
  return <ul>{items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul>;
}

/**
 * A private, optional teacher overlay. The closed state contributes no lesson
 * explanation to the projector: students see only the lesson itself.
 */
export function StudentTeacherLayer({
  say,
  ask,
  watchFor,
  ifStuck,
  timing,
  teacherResource,
}: StudentTeacherLayerProps) {
  const [open, setOpen] = useState(false);
  const guideId = useId();
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      window.requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <div className="student-teacher-layer" aria-label="Optional teacher support">
      <button
        ref={triggerRef}
        className="student-teacher-layer__trigger"
        type="button"
        aria-controls={guideId}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">✦</span>
        <span>{open ? "Close guide" : "Teacher"}</span>
      </button>

      {open && (
        <aside id={guideId} className="student-teacher-layer__guide" aria-labelledby={titleId}>
          <header>
            <div><small>QUICK REFERENCE</small><h2 id={titleId} tabIndex={-1}>Run this part</h2>{timing && <p>{timing}</p>}</div>
            <button type="button" aria-label="Close teacher guide" onClick={() => setOpen(false)}>×</button>
          </header>

          {teacherResource && <section className="student-teacher-layer__resource">
            <small>OPEN</small>
            <strong>{teacherResource.title}</strong>
            <p>{teacherResource.pausePrompt}</p>
            <div><a href={teacherResource.url} target="_blank" rel="noreferrer">Play ↗</a>{teacherResource.secondary && <a href={teacherResource.secondary.url} target="_blank" rel="noreferrer">Also useful ↗</a>}</div>
          </section>}

          <div className="student-teacher-layer__quick">
            <section className="student-teacher-layer__say"><small>SAY</small><blockquote>“{lines(say, 1)[0]}”</blockquote></section>
            <section><small>ASK</small><NoteList value={ask} limit={1} /></section>
            <section><small>WATCH FOR</small><NoteList value={watchFor} limit={2} /></section>
            <section className="student-teacher-layer__stuck"><small>IF STUCK</small><NoteList value={ifStuck} limit={1} /></section>
          </div>
        </aside>
      )}
    </div>
  );
}
