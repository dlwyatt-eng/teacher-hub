"use client";

import { useId } from "react";
import "./toc-resource-library.css";

export type TocResourceLibraryProps = {
  onHome: () => void;
  onOpenTtocPlan: () => void;
};

const emergencyPreflight = [
  {
    title: "Confirm the school procedure",
    detail: "Open the current school or district emergency directions. This page is a planning prompt, not a replacement for those directions.",
  },
  {
    title: "Check attendance and student support",
    detail: "Use the approved private school record for attendance, medical, communication, mobility, sensory, and regulation information. Do not copy private details into a public or shared page.",
  },
  {
    title: "Record the real day",
    detail: "Add exact bells, supervision, specialists, room changes, dismissal, and who to contact when a routine changes.",
  },
  {
    title: "Know the safety routes",
    detail: "Locate the room-specific evacuation, lockdown, hold-and-secure, first-aid, and reunification information supplied by the school.",
  },
  {
    title: "Set out a no-tech route",
    detail: "Prepare plain paper, pencils, a read-aloud or printed source, and one complete learning task that needs no account, device, Wi-Fi, or AI.",
  },
  {
    title: "Make the finish visible",
    detail: "Leave one short learning goal, numbered route, stopping point, collection location, and note about what the returning teacher should know.",
  },
] as const;

const capsuleSlots = [
  {
    label: "Student booklet",
    detail: "A finished, device-free mixed-subject mystery that a substitute can distribute and students can follow.",
  },
  {
    label: "Teacher directions",
    detail: "Timing, materials, read-aloud cues, support routes, collection steps, and a no-tech fallback.",
  },
  {
    label: "Teacher-only answer key",
    detail: "Answers, likely misconceptions, flexible response notes, and privacy-safe assessment guidance.",
  },
] as const;

export default function TocResourceLibrary({ onHome, onOpenTtocPlan }: TocResourceLibraryProps) {
  const checklistId = useId();

  return (
    <div className="toc-resource-library page">
      <header className="toc-library-hero">
        <div>
          <button type="button" className="toc-library-back" onClick={onHome}>← Teacher Home</button>
          <p>TEACHER OPERATIONS · DO NOT STORE STUDENT DATA HERE</p>
          <h1>TOC &amp; Emergency Plans</h1>
          <span>Build a usable day, protect school-specific safety information, and keep complete device-free learning within reach.</span>
        </div>
        <aside>
          <small>READY NOW</small>
          <strong>The live TTOC day-plan builder</strong>
          <p>Bring in a seeded week, add exact routines, and print one coherent handoff for the teacher-on-call.</p>
          <button type="button" onClick={onOpenTtocPlan}>Open TTOC day plan →</button>
        </aside>
      </header>

      <section className="toc-library-quick-route" aria-labelledby="toc-quick-route-title">
        <header>
          <p>START HERE</p>
          <h2 id="toc-quick-route-title">A dependable handoff has three layers.</h2>
        </header>
        <ol>
          <li><b>1</b><span><strong>School procedures</strong>Use the current private directions for safety, attendance, supervision, and dismissal.</span></li>
          <li><b>2</b><span><strong>A runnable day</strong>Put exact times, transitions, materials, lesson moves, and finish evidence in the day-plan builder.</span></li>
          <li><b>3</b><span><strong>A complete fallback</strong>Keep one worthwhile paper-first route ready in case plans, links, staffing, or technology change.</span></li>
        </ol>
      </section>

      <section className="toc-emergency-preflight" aria-labelledby="emergency-preflight-title">
        <header>
          <div>
            <p>GENERIC PREFLIGHT · COMPLETE WITH LOCAL INFORMATION</p>
            <h2 id="emergency-preflight-title">Before a substitute enters the room</h2>
            <span>Ticking these boxes changes nothing outside this open page and stores no student information.</span>
          </div>
          <strong>School and district procedures always take priority.</strong>
        </header>
        <div>
          {emergencyPreflight.map((item, index) => {
            const inputId = `${checklistId}-preflight-${index}`;
            return (
              <article key={item.title}>
                <input id={inputId} type="checkbox" />
                <label htmlFor={inputId}><b>{item.title}</b><span>{item.detail}</span></label>
              </article>
            );
          })}
        </div>
        <footer>
          <b>Privacy boundary</b>
          <span>Keep names, medical details, accommodation records, family contacts, passwords, door codes, and other protected information only in the school-approved private system.</span>
        </footer>
      </section>

      <section className="toc-capsule-home" aria-labelledby="capsule-home-title">
        <header>
          <div>
            <p>RESERVED RESOURCE DESTINATION</p>
            <h2 id="capsule-home-title">The Mystery of the Missing Time Capsule</h2>
            <span>This is the future TOC mystery route. Its home is ready; its files are not being presented as finished.</span>
          </div>
          <strong>RESERVED · NOT YET PUBLISHED</strong>
        </header>

        <aside className="toc-discovery-distinction">
          <b>Keep the two booklets distinct.</b>
          <p><strong>Grade 6 Discovery Booklet</strong> is the verified five-page opening-rotation resource already used for belonging, learning conditions, community design, and private handoff.</p>
          <p><strong>Missing Time Capsule</strong> is a separate future device-free, mixed-subject TOC mystery with its own student booklet, directions, and protected answer key.</p>
        </aside>

        <div className="toc-capsule-slots">
          {capsuleSlots.map((slot, index) => (
            <article key={slot.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>FUTURE SLOT</small>
              <h3>{slot.label}</h3>
              <p>{slot.detail}</p>
              <strong>Nothing to download yet</strong>
            </article>
          ))}
        </div>

        <footer>
          <div><small>RELEASE GATE</small><strong>Do not activate a file until all three pieces are finished, checked, and clearly separated by audience.</strong></div>
          <ul>
            <li>Student pages contain no answers or teacher-only notes.</li>
            <li>Directions identify timing, materials, support, fallback, and collection.</li>
            <li>The answer key stays in an access-controlled staff system and is never published to GitHub Pages.</li>
          </ul>
        </footer>
      </section>

      <section className="toc-library-finish">
        <div><p>NEXT PRACTICAL MOVE</p><h2>Turn the current week into one clear day.</h2><span>Open the existing builder, import only what is useful, and replace generic notes with the real school-day details.</span></div>
        <button type="button" onClick={onOpenTtocPlan}>Build the TTOC day →</button>
      </section>
    </div>
  );
}
