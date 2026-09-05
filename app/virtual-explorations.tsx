"use client";

import { useState } from "react";
import register from "../content/virtual-explorations.json";
import { ExplorationPlayer, type Exploration } from "./exploration-player";

export const explorationRegister = register;
export function explorationsForLesson(lessonId: string, scene?: number): Exploration[] {
  return register.placements.filter(p => p.lessonId === lessonId && (scene === undefined || p.scene === scene))
    .map(p => register.trips.find(t => t.id === p.tourId)!).filter(Boolean);
}
export function LessonExplorations({ lessonId, scene, audience = "student", initiallyOpen = false }: { lessonId: string; scene?: number; audience?: "teacher" | "student"; initiallyOpen?: boolean }) {
  const tours = explorationsForLesson(lessonId, scene);
  return tours.length ? <ExplorationChoice key={`${lessonId}:${scene ?? "all"}`} tours={tours} audience={audience} initiallyOpen={initiallyOpen} /> : null;
}
function ExplorationChoice({ tours, audience, initiallyOpen }: { tours: Exploration[]; audience: "teacher" | "student"; initiallyOpen: boolean }) {
  const [selected, setSelected] = useState(tours[0].id);
  const tour = tours.find(t => t.id === selected) ?? tours[0];
  return <section className="lesson-explorations" aria-label="Explore in this lesson">
    {audience === "teacher" && <p><strong>Optional source route.</strong> Use within the existing lesson time. Preview the media or use the prepared backup; access checks are in the teacher notes.</p>}
    {tours.length > 1 && <div className="exploration-choice"><p><strong>Choose one destination.</strong> Then return to your exhibit work.</p><div role="group" aria-label="Choose a destination">{tours.map(t => <button type="button" key={t.id} aria-pressed={t.id === tour.id} onClick={() => setSelected(t.id)}>{t.title}</button>)}</div></div>}
    <ExplorationPlayer key={tour.id} tour={tour} audience={audience} initiallyOpen={initiallyOpen} />
  </section>;
}
export function explorationLessonUrl(p: typeof register.placements[number], student = false) {
  const params = new URLSearchParams();
  if (student) params.set("mode", "student");
  if (p.kind === "science") params.set("lesson", p.lessonId);
  else { params.set("subject", p.subject); params.set(p.kind === "social" ? "socialLesson" : "experience", p.lessonId); if (p.kind === "social") params.set("socialScene", String(p.scene ?? 0)); }
  return `?${params}`;
}
export type ExplorationDestination = { subject: string; lessonId: string; kind: string; scene?: number };
export function ExplorationAnnualMap({ onExplore }: { onExplore?: (destination: ExplorationDestination, student: boolean) => void }) {
  return <details id="virtual-explorations" className="exploration-annual"><summary>Virtual explorations · flexible annual map</summary>
    <p>Visit a place when it strengthens the current unit. These are source options within lessons, with no fixed bookings or extra portfolio requirement. Space destinations are alternatives. Media preview is still needed; every visit has a prepared backup.</p>
    <div className="exploration-annual__table"><table><caption>World, space, body and animal viewpoints · reviewed {register.reviewDate}</caption><thead><tr><th scope="col">Teaching window</th><th scope="col">Visit</th><th scope="col">Lesson and subject</th><th scope="col">Open</th></tr></thead><tbody>{register.placements.map(p => <tr key={p.tourId}><td>{p.window}</td><td>{register.trips.find(t => t.id === p.tourId)?.title}</td><td>{p.subject}<br />{p.lessonTitle}</td><td><a href={explorationLessonUrl(p)} onClick={event => { if (onExplore && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onExplore(p, false); } }}>Teacher lesson</a><br /><a href={explorationLessonUrl(p, true)} onClick={event => { if (onExplore && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onExplore(p, true); } }}>Project lesson</a></td></tr>)}</tbody></table></div>
  </details>;
}
