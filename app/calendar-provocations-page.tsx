"use client";

import { useEffect, useRef, useState } from "react";
import masterInquiryPack from "../content/master-inquiry-pack-v1.json";
import { printClosest } from "./print-support";
import "./calendar-provocations-page.css";

const provocations = masterInquiryPack.calendarProvocations;
const evidenceProtocol = masterInquiryPack.evidenceProtocol;

export type CalendarProvocationsAudience = "teacher" | "student";
export type CalendarProvocationId = (typeof provocations)[number]["id"];

export type CalendarProvocationsPageProps = {
  audience?: CalendarProvocationsAudience;
  initialProvocationId?: CalendarProvocationId;
  onHome?: () => void;
  onProvocationChange?: (id: CalendarProvocationId) => void;
};

type ProjectorPart = {
  label: string;
  verb: string;
  eyebrow: string;
  title: string;
  body: string;
  items?: readonly string[];
};

type ListeningRehearsal = NonNullable<(typeof provocations)[number]["listeningRehearsal"]>;

export function CalendarListeningRehearsal({ rehearsal, onReturn, audience = "teacher" }: { rehearsal: ListeningRehearsal; onReturn: () => void; audience?: CalendarProvocationsAudience }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const directions = audience === "student" ? rehearsal.student : rehearsal;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="calendar-rehearsal" aria-labelledby="calendar-rehearsal-title" aria-describedby="calendar-rehearsal-boundary">
      <header>
        <p className="calendar-rehearsal__label">FICTIONAL LISTENING REHEARSAL · CLASSROOM OS</p>
        <h1 id="calendar-rehearsal-title" ref={headingRef} tabIndex={-1}>{rehearsal.title}</h1>
        <p><strong>Learning goal:</strong> {directions.goal}</p>
        <p className="calendar-rehearsal__attribution"><strong>Credit:</strong> {rehearsal.attribution}</p>
        <p id="calendar-rehearsal-boundary" className="calendar-rehearsal__boundary">{directions.boundary}</p>
        <div className="calendar-rehearsal__actions">
          <button type="button" onClick={onReturn}>← Back to authentic-source lesson</button>
          <button type="button" onClick={(event) => printClosest(event.currentTarget, ".calendar-rehearsal")}>Print fictional rehearsal</button>
        </div>
      </header>
      <div className="calendar-rehearsal__sources">
        {rehearsal.sourceCards.map((card) => (
          <article key={card.id} aria-labelledby={`calendar-rehearsal-${card.id}`}>
            <h2 id={`calendar-rehearsal-${card.id}`}>{card.title}</h2>
            <p className="calendar-rehearsal__context">{card.context}</p>
            <blockquote>{card.text}</blockquote>
            <p className="calendar-rehearsal__attribution">{rehearsal.attribution}</p>
          </article>
        ))}
      </div>
      <section aria-labelledby="calendar-rehearsal-prompts">
        <h2 id="calendar-rehearsal-prompts">Try three listening moves</h2>
        <ol>{directions.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ol>
      </section>
      <section aria-labelledby="calendar-rehearsal-finish">
        <h2 id="calendar-rehearsal-finish">Finish in words, drawing, or talk</h2>
        <ol className="calendar-rehearsal__finish">{rehearsal.finishFrame.map((frame) => <li key={frame}>{frame}</li>)}</ol>
      </section>
      <aside className="calendar-rehearsal__care" aria-labelledby="calendar-rehearsal-care">
        <h2 id="calendar-rehearsal-care">Careful use of this fictional practice</h2>
        {audience === "teacher" && <p>{rehearsal.teacherNote}</p>}
        {audience === "student" && <p>{rehearsal.student.care}</p>}
        <p>{directions.returnToAuthentic}</p>
      </aside>
    </section>
  );
}

function validProvocationId(candidate?: string): CalendarProvocationId {
  return provocations.some((item) => item.id === candidate)
    ? candidate as CalendarProvocationId
    : provocations[0].id;
}

export function projectorPartsFor(provocation: (typeof provocations)[number]): ProjectorPart[] {
  const student = provocation.student;
  return [
    {
      label: "Look",
      verb: "Start",
      eyebrow: "LOOK OR LISTEN TOGETHER",
      title: student.before,
      body: student.lookListen,
    },
    {
      label: "Notice",
      verb: "Point",
      eyebrow: "WHAT DO YOU NOTICE?",
      title: student.noticeWonder[0],
      body: "Point to a detail you can see or hear. Do not guess what someone thinks or feels.",
    },
    {
      label: "Wonder",
      verb: "Ask",
      eyebrow: "KEEP A REAL QUESTION OPEN",
      title: student.noticeWonder[1],
      body: "Choose a question that the source cannot answer by itself.",
      items: student.questions,
    },
    {
      label: "Discuss",
      verb: "Test",
      eyebrow: "LISTEN · USE EVIDENCE · RECONSIDER",
      title: student.questions[0],
      body: student.discussion,
      items: student.questions.slice(1),
    },
    {
      label: "Create",
      verb: "Make",
      eyebrow: "SHOW THE THINKING",
      title: "Make your response",
      body: student.product,
    },
    {
      label: "Check",
      verb: "Finish",
      eyebrow: "YOU ARE DONE WHEN",
      title: "Show what you know and what you still need to check.",
      body: `Name your source: ${provocation.source.label}. Explain what it shows and what you think it means. Finish your response and name a next step or a question to check.`,
      items: [
        "I used a detail another person can find in the source.",
        "I did not guess about a person's feelings, identity, or experience.",
        "I named something we do not know yet or need another source to check.",
      ],
    },
  ];
}

function ProvocationChooser({
  selectedId,
  onChoose,
}: {
  selectedId: CalendarProvocationId;
  onChoose: (id: CalendarProvocationId) => void;
}) {
  return (
    <nav className="calendar-provocations__chooser" aria-label="Choose a calendar provocation">
      {provocations.map((provocation, index) => (
        <button
          type="button"
          key={provocation.id}
          aria-pressed={selectedId === provocation.id}
          onClick={() => onChoose(provocation.id)}
        >
          <b>{String(index + 1).padStart(2, "0")}</b>
          <span><strong>{provocation.title}</strong><small>{provocation.timing}</small></span>
        </button>
      ))}
    </nav>
  );
}

function TeacherProvocationPlan({ provocation }: { provocation: (typeof provocations)[number] }) {
  const parts = projectorPartsFor(provocation);
  return (
    <section className="calendar-provocations__teacher-plan" id={`calendar-provocation-${provocation.id}`}>
      <header className="calendar-provocations__title-block">
        <div><p>CALENDAR PROVOCATION · {provocation.timing}</p><h1>{provocation.title}</h1><span>{provocation.lens}</span></div>
        <aside><small>WE ARE LEARNING</small><strong>{provocation.learning.replace(/^We are learning\s+/i, "")}</strong></aside>
      </header>

      <section className="calendar-provocations__launch" aria-labelledby={`${provocation.id}-launch-title`}>
        <header><span>01</span><div><small>PROJECTOR HOOK</small><h2 id={`${provocation.id}-launch-title`}>Prepare one exact source before students arrive.</h2></div></header>
        <div className="calendar-provocations__launch-grid">
          <article><small>PURPOSE + ACTION</small><p>{provocation.hook}</p></article>
          <article><small>BEFORE VIEWING</small><strong>{provocation.before}</strong></article>
          <article><small>NOTICE</small><p>{provocation.noticeWonder[0]}</p></article>
          <article><small>WONDER + BRIDGE</small><p>{provocation.noticeWonder[1]}</p></article>
        </div>
        <footer><b>IF THE LINK FAILS</b><span>{provocation.fallback}</span></footer>
      </section>

      <section className="calendar-provocations__sequence" aria-labelledby={`${provocation.id}-sequence-title`}>
        <header><div><small>CLASS-FACING SEQUENCE</small><h2 id={`${provocation.id}-sequence-title`}>Six calm projector stops</h2></div><span>LOOK → NOTICE → WONDER → DISCUSS → CREATE → CHECK</span></header>
        <ol>{parts.map((part, index) => <li key={part.label}><b>{index + 1}</b><div><small>{part.label} · {part.verb}</small><strong>{part.title}</strong></div></li>)}</ol>
      </section>

      <section className="calendar-provocations__teacher-grid" aria-label="Teacher preparation and safeguards">
        <article className="calendar-provocations__inquiry-card">
          <small>QUESTIONS WORTH KEEPING OPEN</small>
          <ol>{provocation.questions.map((question) => <li key={question}>{question}</li>)}</ol>
          <strong>Discussion move</strong><p>{provocation.discussion}</p>
        </article>
        <article className="calendar-provocations__product-card">
          <small>WHAT STUDENTS MAKE</small><h2>{provocation.product}</h2>
          <strong>Curriculum connections</strong><ul>{provocation.curriculum.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="calendar-provocations__access-card">
          <small>ACCESS WITHOUT LOWERING THE THINKING</small><p>{provocation.differentiation}</p>
          <strong>Offline route</strong><p>{provocation.fallback}</p>
        </article>
        <article className="calendar-provocations__care-card">
          <small>CARE + ANTI-TOKENISM</small><p>{provocation.antiTokenism}</p>
          <a href={provocation.source.href} target="_blank" rel="noreferrer"><span>PREVIEW + VERIFY THE SOURCE</span><strong>{provocation.source.label} ↗</strong></a>
        </article>
      </section>

      <details className="calendar-provocations__evidence-reference">
        <summary><span><small>REUSABLE EVIDENCE ROUTINE</small><strong>{evidenceProtocol.title}</strong></span><b>Open teacher reference ↓</b></summary>
        <div>{evidenceProtocol.steps.map((step, index) => <article key={step.label}><b>{index + 1}</b><div><small>{step.label}</small><strong>{step.prompt}</strong><p>{step.move}</p></div></article>)}</div>
      </details>
    </section>
  );
}

export function StudentProvocationPlayer({ provocation, initialPartIndex = 0 }: { provocation: (typeof provocations)[number]; initialPartIndex?: number }) {
  const [partIndex, setPartIndex] = useState(initialPartIndex);
  const parts = projectorPartsFor(provocation);
  const part = parts[partIndex] ?? parts[0];

  useEffect(() => setPartIndex(0), [provocation.id]);

  return (
    <section className="calendar-provocations__projector" id={`calendar-provocation-${provocation.id}`}>
      <header className="calendar-provocations__projector-bar">
        <div><small>CALENDAR PROVOCATION · {provocation.timing}</small><h1>{provocation.title}</h1></div>
        <nav aria-label="Choose a lesson part">{parts.map((item, index) => <button type="button" key={item.label} aria-current={partIndex === index ? "step" : undefined} onClick={() => setPartIndex(index)}><b>{index + 1}</b><span>{item.label}</span></button>)}</nav>
      </header>

      <section className="calendar-provocations__clarity-strip" aria-label="Learning goal, first move, and finish">
        <article><small>WE ARE LEARNING</small><strong>{provocation.student.learning.replace(/^We are learning\s+/i, "")}</strong></article>
        <article><small>FIRST MOVE</small><strong>{provocation.student.noticeWonder[0]}</strong></article>
        <article><small>WE WILL MAKE</small><strong>{provocation.student.productSummary}</strong></article>
      </section>

      <section className="calendar-provocations__projector-stage" aria-live="polite">
        <div className="calendar-provocations__stage-mark" aria-hidden="true"><span>{partIndex + 1}</span><i /></div>
        <article>
          <small>{part.eyebrow}</small>
          <h2>{part.title}</h2>
          <p>{part.body}</p>
          {part.items && <ol>{part.items.map((item, index) => <li key={item}><b>{index + 1}</b><span>{item}</span></li>)}</ol>}
        </article>
      </section>

      <footer className="calendar-provocations__projector-footer">
        <span><b>SOURCE</b>{provocation.source.label}</span>
        <strong>Use details. Ask questions. Listen carefully.</strong>
        <div><button type="button" disabled={partIndex === 0} onClick={() => setPartIndex((value) => Math.max(0, value - 1))}>← Previous</button><button type="button" disabled={partIndex === parts.length - 1} onClick={() => setPartIndex((value) => Math.min(parts.length - 1, value + 1))}>Next →</button></div>
      </footer>
    </section>
  );
}

function CalendarProvocationRoute({ provocation, audience }: { provocation: (typeof provocations)[number]; audience: CalendarProvocationsAudience }) {
  const [rehearsalOpen, setRehearsalOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRehearsal = useRef(false);
  const rehearsal = provocation.listeningRehearsal;

  useEffect(() => {
    if (!rehearsalOpen && hasOpenedRehearsal.current) openButtonRef.current?.focus();
  }, [rehearsalOpen]);

  if (rehearsalOpen && rehearsal) {
    return <CalendarListeningRehearsal rehearsal={rehearsal} audience={audience} onReturn={() => setRehearsalOpen(false)} />;
  }

  return (
    <>
      {rehearsal && (
        <aside className="calendar-rehearsal-launch" aria-labelledby="calendar-rehearsal-option">
          <div><h2 id="calendar-rehearsal-option">Practise careful listening with a made-up story</h2><p>This made-up school story is for listening practice only. It does not teach the history of residential schools or replace learning from real sources. Your teacher will guide the next lesson.</p></div>
          <button ref={openButtonRef} type="button" onClick={() => { hasOpenedRehearsal.current = true; setRehearsalOpen(true); }}>Open fictional listening rehearsal</button>
        </aside>
      )}
      {audience === "teacher"
        ? <TeacherProvocationPlan provocation={provocation} />
        : <StudentProvocationPlayer provocation={provocation} />}
    </>
  );
}

export function CalendarProvocationsPage({
  audience = "teacher",
  initialProvocationId,
  onHome,
  onProvocationChange,
}: CalendarProvocationsPageProps) {
  const [selectedId, setSelectedId] = useState<CalendarProvocationId>(() => validProvocationId(initialProvocationId));
  const selected = provocations.find((item) => item.id === selectedId) ?? provocations[0];

  const chooseProvocation = (id: CalendarProvocationId) => {
    setSelectedId(id);
    onProvocationChange?.(id);
  };

  return (
    <div className={`page calendar-provocations calendar-provocations--${audience}`} data-audience={audience}>
      <header className="calendar-provocations__shell-header">
        {onHome && <button className="calendar-provocations__home" type="button" onClick={onHome}>← Classroom home</button>}
        <div><small>{audience === "teacher" ? "TEACHER PLAN · SEVEN RECURRING INQUIRIES" : "CHOOSE TODAY'S INQUIRY"}</small><strong>Calendar provocations</strong></div>
      </header>
      <ProvocationChooser selectedId={selected.id} onChoose={chooseProvocation} />
      <CalendarProvocationRoute key={`${selected.id}:${audience}`} provocation={selected} audience={audience} />
    </div>
  );
}

export default CalendarProvocationsPage;
