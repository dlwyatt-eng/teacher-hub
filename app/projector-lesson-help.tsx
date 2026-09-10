"use client";

import { useState, type ReactNode } from "react";
import "./projector-lesson-help.css";

/** One expandable place for teaching support, without leaving the active lesson. */
export function ProjectorLessonHelp({ panels }: { panels: { label: string; content: ReactNode }[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  return <details className="projector-lesson-help" onToggle={event => setOpen(event.currentTarget.open)}>
    <summary>Lesson help · setup, examples, checks &amp; resources</summary>
    {open && <div>
      <nav aria-label="Choose lesson help">{panels.map((panel, index) => <button type="button" key={panel.label} aria-pressed={index === selected} onClick={() => setSelected(index)}>{panel.label}</button>)}</nav>
      <section className="projector-help-panel" aria-label={panels[selected].label}>{panels[selected].content}</section>
    </div>}
  </details>;
}

export function RevealForDiscussion({ children, label = "Show an example after discussing" }: { children: ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  return <div className="projector-help-reveal"><button type="button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Hide example / notes" : label}</button>{open && <div>{children}</div>}</div>;
}

export function HelpList({ title, items }: { title: string; items?: string[] }) {
  return items?.length ? <section><h3>{title}</h3><ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul></section> : null;
}
