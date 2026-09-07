"use client";

import { useRef, useState, type ReactNode } from "react";
import { ExperienceInfographic, LocalRestorationInfographic, ResponsibleDataInfographic } from "./infographic-library";
import { LessonExplorations, explorationsForLesson } from "./virtual-explorations";
import { extraInfographics } from "./teaching-diagrams";
import { ReadyMadeActivities } from "./ready-made-activity-panel";
import { readyMadeForLesson } from "./ready-made-activities";
import { earthResources } from "./earth-stuff-resources";
import "./optional-teaching-resources.css";

export type TeachingResource = { id: string; title: string; content?: ReactNode; onOpen?: () => void };
export const infographicTitles: Record<string, string> = {
  "pattern-forecast": "One pattern, five views", "equation-balance": "Keep both sides equal",
  "three-voices": "Evidence, inference, unknown", "map-what-maps-miss": "Contrast and emphasis",
  "access-by-design": "Keep the goal; remove the barrier", "trusted-health-studio": "Check health information",
  "project-rescue-studio": "A project planning map", "each-one-teach-one": "Design a learning experience",
  "fraction-ratio-remix": "Grow a ratio batch", "decimal-dispatch": "Estimate and check an invoice",
  "probability-game-audit": "Predictions and real results", "hook-cold-audience": "Four ways to open",
  "edit-room": "Same facts, different edit", "precision-poetry": "Science into poetry",
  "search-under-hood": "Search rank is not evidence", "bloxels-game-studio": "The game and feedback loop",
  "everyone-in-game": "A rule change and participation", "effort-meter-trail": "Your private effort scale",
  "learning-user-manual": "Evidence into a learning plan", "career-constellation": "Many roles, one project",
  "rhythm-movement-lab": "An eight-count movement score", "audience-remix": "Sequence and spacing",
  "metaphor-with-limits": "Where a comparison breaks", "four-arts-languages": "Four Arts focus pairs",
};

export function infographicResources(lessonId: string): TeachingResource[] {
  const entries: TeachingResource[] = infographicTitles[lessonId]
    ? [{ id: "infographic", title: `Infographic · ${infographicTitles[lessonId]}`, content: <ExperienceInfographic experienceId={lessonId} /> }] : [];
  if (lessonId === "graph-story-lab") entries.push(
    { id: "restoration", title: "Infographic · Salmon River restoration", content: <LocalRestorationInfographic /> },
    { id: "data-care", title: "Infographic · Who controls community data?", content: <ResponsibleDataInfographic /> },
  );
  return [...entries, ...extraInfographics(lessonId)];
}

export function OptionalTeachingResources({ lessonId, teacher = false, extras = [] }: { lessonId: string; teacher?: boolean; extras?: TeachingResource[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<TeachingResource | null>(null);
  const resources: TeachingResource[] = [...earthResources(lessonId, teacher), ...infographicResources(lessonId), ...(explorationsForLesson(lessonId).length ? [{ id: "visits", title: "Videos & virtual visits", content: <LessonExplorations lessonId={lessonId} audience={teacher ? "teacher" : "student"} initiallyOpen /> }] : []), ...(teacher && readyMadeForLesson(lessonId).length ? [{ id: "ready-made", title: "Ready-made class activities", content: <ReadyMadeActivities lessonId={lessonId} /> }] : []), ...extras];
  if (!resources.length) return null;
  return <section className="optional-teaching-resources" aria-label="Optional teaching resources">
    <details><summary>Optional teaching resources · {resources.length} choices</summary>
      <p>Choose what helps today. Close a resource to return to the same lesson step. No extra assignment or post is required.</p>
      <div className="teaching-resource-choices">{resources.map(resource => <button type="button" key={resource.id} aria-haspopup={resource.onOpen ? undefined : "dialog"} onClick={() => { if (resource.onOpen) { resource.onOpen(); return; } setSelected(resource); dialog.current?.showModal(); }}>{resource.title} ↗</button>)}</div>
    </details>
    <dialog ref={dialog} className="teaching-resource-dialog" aria-label={selected?.title ?? "Teaching resource"} onKeyDown={event => event.stopPropagation()} onClose={() => setSelected(null)}>
      <header><strong>{selected?.title}</strong><button type="button" autoFocus onClick={() => dialog.current?.close()}>Close · return to lesson</button></header>
      <div className="teaching-resource-content">{selected?.content}</div>
    </dialog>
  </section>;
}
