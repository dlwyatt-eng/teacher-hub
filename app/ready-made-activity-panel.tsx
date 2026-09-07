"use client";

import { readyMadeForLesson } from "./ready-made-activities";
import "./ready-made-activities.css";

export function ReadyMadeActivities({ lessonId }: { lessonId?: string }) {
  const activities = readyMadeForLesson(lessonId);
  if (!activities.length) return null;
  return <aside className="ready-made-activities" tabIndex={-1} aria-label="Ready-made class activities">
    <h3>Ready-made class activities</h3>
    <p>Open, think together, then reveal. No quiz creation or question import.</p>
    {activities.map(activity => <article key={activity.id}>
      <header><h4>{activity.title}</h4><span>{activity.publisher} · {activity.minutes}</span></header>
      <p><strong>When:</strong> {activity.when}</p>
      <p>{activity.directions}</p>
      <a className="ready-made-open" href={activity.url} target="_blank" rel="noreferrer">Open ready-made activity ↗</a>
      <details><summary>Access, teaching note and offline route</summary>
        <p>{activity.access}</p><p>{activity.note}</p>
        <p><strong>Without Wi-Fi:</strong> {activity.offline}</p>
        <p>Reviewed {activity.reviewed}. External content can change. Keep the existing lesson evidence plan; this activity needs no extra SpacesEDU post.</p>
      </details>
    </article>)}
  </aside>;
}
