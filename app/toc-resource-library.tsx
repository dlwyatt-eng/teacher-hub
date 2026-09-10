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
  { label: "Student booklet", detail: "12 black-and-white pages with a connected mystery, response spaces and early-finisher choices.", href: "/printables/Booklet_1_Missing_Time_Capsule_Student.pdf", action: "Open student booklet (PDF)" },
  { label: "Teacher directions", detail: "Three pages: a complete 90-minute route, a longer sequence, materials, support and collection directions.", href: "/printables/Booklet_1_Missing_Time_Capsule_TOC_Guide.pdf", action: "Open TOC guide (PDF)" },
  { label: "Teacher-only answer key", detail: "The matching two-page key is supplied separately to Daryl. Place it with the printed staff handoff or in approved private staff storage before leaving this lesson.", href: null, action: "Private staff copy required" },
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
            <p>READY TO PRINT · NO STUDENT DEVICES</p>
            <h2 id="capsule-home-title">The Mystery of the Missing Time Capsule</h2>
            <span>Read witness statements, solve a maths route, examine clues and explain what happened. Use 90 minutes for the short route or about 3–4 hours for the full sequence.</span>
          </div>
          <strong>BOOKLET 1 · CHECKED SEPTEMBER 2026</strong>
        </header>

        <aside className="toc-discovery-distinction">
          <b>Keep the two booklets distinct.</b>
          <p><strong>Grade 6 Discovery Booklet</strong> is the verified five-page opening-rotation resource already used for belonging, learning conditions, community design, and private handoff.</p>
          <p><strong>Missing Time Capsule</strong> is a separate device-free mystery. Print one student booklet per child and one guide for the TTOC; leave the private answer key separately.</p>
        </aside>

        <div className="toc-capsule-slots">
          {capsuleSlots.map((slot, index) => (
            <article key={slot.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{slot.href ? "PDF READY" : "STAFF COPY ONLY"}</small>
              <h3>{slot.label}</h3>
              <p>{slot.detail}</p>
              {slot.href ? <a href={slot.href} target="_blank" rel="noreferrer">{slot.action} ↗</a> : <strong>{slot.action}</strong>}
            </article>
          ))}
        </div>

        <footer>
          <div><small>QUICK START</small><strong>Short route: pages 2–6, 10 and 11. Always finish with the evidence-based explanation on page 11.</strong></div>
          <ul>
            <li>Print 12 pages per student, or seven selected pages for the short route. Supply pencils, erasers, rulers and colouring tools.</li>
            <li>Read aloud as needed. Accept labelled drawings or spoken explanations. The science activity is a paper planning task; no experiment is required.</li>
            <li>The answer key stays in an access-controlled staff system and is never published to GitHub Pages.</li>
          </ul>
        </footer>
      </section>

      <section className="toc-opening-resources" aria-labelledby="opening-resources-title">
        <p>OPENING LESSONS · PRINT ONLY WHAT YOU NEED</p>
        <h2 id="opening-resources-title">A small paper toolkit for the first teaching blocks</h2>
        <p>The sequence follows the existing lessons. Place its ten blocks around your confirmed school timetable; it is not a complete fortnight schedule.</p>
        <ul>
          <li><a href="/printables/opening-blocks-teacher-guide.pdf" target="_blank" rel="noreferrer">Opening blocks and preparation guide · 2 pages ↗</a></li>
          <li><a href="/printables/opening-response-sheets.pdf" target="_blank" rel="noreferrer">Response sheets · 4 pages ↗</a> — object story, attributed listening, soundwalk and evidence/maths thinking.</li>
          <li><a href="/printables/magnitude-number-lines-and-periods.pdf" target="_blank" rel="noreferrer">Existing maths number lines and period chart · 2 pages ↗</a></li>
        </ul>
        <nav aria-label="Opening lesson plans">
          <a href="?subject=English+Language+Arts&amp;experience=ordinary-object-story&amp;mode=teacher">Object story lesson</a>
          <a href="?subject=English+Language+Arts&amp;experience=semiahmoo-story-source-lab&amp;mode=teacher">Listen first lesson</a>
          <a href="?subject=English+Language+Arts&amp;experience=place-soundwalk&amp;mode=teacher">Soundwalk lesson</a>
          <a href="?subject=Mathematics&amp;experience=magnitude-gallery&amp;mode=teacher">Opening maths lesson</a>
        </nav>
      </section>

      <section className="toc-library-finish">
        <div><p>NEXT PRACTICAL MOVE</p><h2>Turn the current week into one clear day.</h2><span>Open the existing builder, import only what is useful, and replace generic notes with the real school-day details.</span></div>
        <button type="button" onClick={onOpenTtocPlan}>Build the TTOC day →</button>
      </section>
    </div>
  );
}
