"use client";

import { ExplorationAnnualMap } from "./virtual-explorations";
import { useState } from "react";
import { equityCalendar, spacesEvidenceForMonth, yearMonths } from "./classroom-program";
import { coreLearningPrograms } from "./core-programs";
import { integratedLearningPrograms } from "./integrated-programs";

const teachingMonths = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June"];
const learningPrograms = { ...coreLearningPrograms, ...integratedLearningPrograms };

function programArcsForMonth(month: string) {
  const monthIndex = teachingMonths.indexOf(month);
  return Object.values(learningPrograms).flatMap((program) => program.arcs.filter((arc) => {
    const namedMonths = teachingMonths.filter((name) => arc.timing.toLowerCase().includes(name.toLowerCase()));
    if (!namedMonths.length) return false;
    const start = teachingMonths.indexOf(namedMonths[0]);
    const end = teachingMonths.indexOf(namedMonths[namedMonths.length - 1]);
    return monthIndex >= start && monthIndex <= end;
  }).map((arc) => ({ subject: program.subject, title: arc.title, question: arc.question })));
}
export default function YearPlanPage({ mode, onHome, onAssessment, onWeeklyPlan }: { mode: "teacher" | "projector"; onHome: () => void; onAssessment: () => void; onWeeklyPlan: (month: string) => void }) {
  const [phase, setPhase] = useState("All year");
  const [calendarScope, setCalendarScope] = useState("All");
  const phases = ["All year", "Social Studies first", "Inquiry bridge", "Science second"];
  const visibleMonths = phase === "Social Studies first"
    ? yearMonths.slice(0, 5)
    : phase === "Inquiry bridge"
      ? yearMonths.slice(4, 6)
      : phase === "Science second"
        ? yearMonths.slice(5)
        : yearMonths;
  const visibleEquityCalendar = calendarScope === "All" ? equityCalendar : equityCalendar.filter((item) => item.scope === calendarScope);

  return (
    <div className={`page year-plan-page ${mode === "projector" ? "year-plan-projector" : ""}`}>
      <button className="back-link" onClick={onHome}>← Classroom home</button>
      <section className="framework-hero year-plan-hero">
        <div>{mode === "teacher" && <span className="recent-section-badge">● RECENTLY UPDATED · AUG. 11</span>}<p className="eyebrow">COMPLETE 2026–27 TEACHING SEQUENCE</p><h1>Teach inquiry before asking for independence.</h1><p>Built around Surrey&apos;s Sept. 8–June 24 school year: Social Studies develops source, rights, systems, and inquiry work first; Science deepens testing, modelling, and design after the February bridge.</p><div className="year-source-links"><a href="https://www.surreyschools.ca/school-year-calendars" target="_blank" rel="noreferrer">Surrey 2026–27 calendar ↗</a><a href="https://curriculum.gov.bc.ca/curriculum" target="_blank" rel="noreferrer">Official B.C. Curriculum ↗</a><a href="https://ca.spacesedu.com/" target="_blank" rel="noreferrer">SpacesEDU Canada ↗</a></div></div>
        <div className="year-arc" aria-label="Year learning arc"><span>SUPPORTED INQUIRY</span><i>→</i><span>EXPERT TEAMS</span><i>→</i><span>SOLUTIONARY INQUIRY</span></div>
      </section>

      {mode === "teacher" && <ExplorationAnnualMap />}

      <section className="calendar-reality" aria-label="School year timing notes">
        <article><small>SCHOOL OPENS</small><strong>Tuesday, Sept. 8</strong><p>Use the first two weeks for belonging, routines, learning profiles, and inquiry habits.</p></article>
        <article><small>WINTER BREAK</small><strong>Dec. 21–Jan. 1</strong><p>Finish a coherent Human Rights Day product before the break; restart inquiry roles Jan. 4.</p></article>
        <article><small>SPRING INTERRUPTION</small><strong>Mar. 15–29</strong><p>Complete one Science evidence cycle before the break and use retrieval on return.</p></article>
        <article><small>LAST STUDENT DAY</small><strong>Thursday, June 24</strong><p>Finish showcases early enough to protect portfolio reflection and closure.</p></article>
      </section>

      <section className="phase-filter" role="group" aria-label="Filter year plan">
        {phases.map(item => <button key={item} className={phase === item ? "selected" : ""} onClick={() => setPhase(item)}>{item}</button>)}
      </section>

      <section className="month-roadmap">
        {visibleMonths.map((item) => {
          const monthEvidence = spacesEvidenceForMonth(item.month).filter(moment => moment.kind === "Required portfolio" || moment.kind === "Optional evidence");
          return (
          <article key={item.month} className={`month-card status-${item.status.toLowerCase()}`}>
            <header><div><small>{item.status.toUpperCase()}</small><h2>{item.month}</h2></div><span>{String(yearMonths.indexOf(item) + 1).padStart(2, "0")}</span></header>
            <p className="month-dates">{item.dates}</p>
            <h3>{item.phase}</h3>
            <strong>{item.focus}</strong>
            <p>{item.learning}</p>
            <div className="month-subjects">{item.subjects.map(subject => <span key={subject}>{subject}</span>)}</div>
            <details className="month-running-arcs"><summary>Also running across subjects ▾</summary><div>{programArcsForMonth(item.month).map(arc => <article key={`${arc.subject}-${arc.title}`}><small>{arc.subject}</small><strong>{arc.title}</strong><p>{arc.question}</p></article>)}</div></details>
            <section className="month-sequence"><small>TEACHING SEQUENCE · {item.teachingTime}</small>{item.sequence.map((step) => <p key={step}>{step}</p>)}</section>
            <section className="month-planning-grid"><div><small>PREPARE</small><p>{item.preparation}</p></div><div><small>ASSESSMENT</small><p>{item.assessment}</p></div><div><small>DISPLAY / SHARE</small><p>{item.display}</p></div></section>
            <footer className="month-evidence-plan"><b>SPACES EDU EVIDENCE</b><div>{monthEvidence.map(moment => <span key={moment.id} className={`evidence-kind-${moment.kind.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-")}`}><small>{moment.kind}</small><strong>{moment.title}</strong></span>)}</div><button type="button" onClick={() => onWeeklyPlan(item.month)}>Open a seeded week →</button></footer>
          </article>
          );
        })}
      </section>

      <section className="equity-calendar-section">
        <header><div><p className="section-kicker">EQUITY &amp; SOCIAL-JUSTICE TIMING</p><h2>Begin before the date—then keep the learning alive.</h2><p>Anchor projects receive enough time to learn, create, revise, and prepare a real display. Connected lessons strengthen the current curriculum. Community spotlights stay purposeful and do not displace the main sequence.</p></div><span>2026–27</span></header>
        <nav aria-label="Filter equity calendar">{["All", "Anchor project", "Connected lesson", "Community spotlight"].map((item) => <button key={item} className={calendarScope === item ? "selected" : ""} onClick={() => setCalendarScope(item)}>{item}</button>)}</nav>
        <div className="equity-calendar-grid">{visibleEquityCalendar.map((item) => <article key={item.id} className={`scope-${item.scope.toLowerCase().replaceAll(" ", "-")}`}><header><small>{item.scope.toUpperCase()}</small><h3>{item.observance}</h3><strong>{item.observanceDate}</strong></header><div className="date-route"><span><small>START</small><b>{item.recommendedStart}</b></span><i>→</i><span><small>SHARE / DISPLAY</small><b>{item.shareDate}</b></span></div><p>{item.learning}</p><dl><div><dt>Student product</dt><dd>{item.product}</dd></div><div><dt>Curricular home</dt><dd>{item.curricularHome}</dd></div><div><dt>Follow-up</dt><dd>{item.followUp}</dd></div></dl></article>)}</div>
        <footer><strong>Planning rule</strong><span>Begin most creation 1–2 weeks before the observance. Begin 2–3 weeks ahead when research, community knowledge, revision, or a public display is involved. Dates guide meaningful learning; they do not turn cultures or identities into one-day themes.</span></footer>
      </section>

      <section className="year-flex-panel">
        <div><p className="section-kicker">USE THIS AS A COMPASS, NOT A CALENDAR CONTRACT</p><h2>Three kinds of time stay protected.</h2></div>
        <div><article><span>01</span><strong>Teach the process</strong><p>Model questioning, sources, evidence, collaboration, and revision before expecting independence.</p></article><article><span>02</span><strong>Follow worthwhile learning</strong><p>Allow strong discussions, investigations, community opportunities, and student questions to change the pace.</p></article><article><span>03</span><strong>Keep flex weeks</strong><p>Protect time for reteaching, interruptions, conferences, presentations, and learning that needs another attempt.</p></article></div>
        <button onClick={onAssessment}>Open the assessment highlights →</button>
      </section>
    </div>
  );
}
