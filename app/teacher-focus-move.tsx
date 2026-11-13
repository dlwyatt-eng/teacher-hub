"use client";

import { useId, type Dispatch, type SetStateAction } from "react";

// Both views receive the same normalized route. This component adds no lesson content.
export type FocusRouteStep = { label: string; minutes: string; action: string; doneWhen: string };

export function boundedMove(index: number, count: number) {
  return Math.max(0, Math.min(count - 1, index));
}

export function TeacherFocusMove({ route, activeMove, onMove, offline, studentScreensAvailable = false }: {
  route: readonly FocusRouteStep[];
  activeMove: number;
  onMove: Dispatch<SetStateAction<number>>;
  offline: string;
  studentScreensAvailable?: boolean;
}) {
  const headingId = useId();
  const index = boundedMove(activeMove, route.length);
  const step = route[index];
  if (!step) return null;

  return <section className="teacher-focus-move" aria-labelledby={headingId}>
    <div className="teacher-focus-move__navigation">
      <p role="status" aria-live="polite" aria-atomic="true">Move {index + 1} of {route.length} · {step.label}</p>
      <div role="group" aria-label="Teaching moves">
        <button type="button" disabled={index === 0} onClick={() => onMove(current => boundedMove(current - 1, route.length))}>← Previous move</button>
        <button type="button" disabled={index === route.length - 1} onClick={() => onMove(current => boundedMove(current + 1, route.length))}>Next move →</button>
      </div>
    </div>
    <article>
      <p className="teacher-focus-move__timing">{step.minutes}</p>
      <h3 id={headingId}>{step.label}</h3>
      <p className="teacher-focus-move__action">{step.action}</p>
      <div className="teacher-focus-move__check"><strong>Check for understanding · done when</strong><p>{step.doneWhen}</p></div>
    </article>
    <section className="teacher-focus-move__paper" aria-label="Paper and no-tech route"><strong>Paper / no-tech route</strong><p>{offline}</p><p>{studentScreensAvailable && <>Use “Open student screens” above for the existing lesson and its student materials. </>}“Print / PDF” prints all teaching moves, not a student worksheet.</p></section>
  </section>;
}
