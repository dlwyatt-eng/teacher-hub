"use client";

import { useEffect, useState } from "react";
import masterInquiryPack from "../content/master-inquiry-pack-v1.json";
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

function validProvocationId(candidate?: string): CalendarProvocationId {
  return provocations.some((item) => item.id === candidate)
    ? candidate as CalendarProvocationId
    : provocations[0].id;
}

function projectorPartsFor(provocation: (typeof provocations)[number]): ProjectorPart[] {
  return [
    {
      label: "Look",
      verb: "Start",
      eyebrow: "TEACHER OPENS THE SOURCE",
      title: provocation.before,
      body: provocation.hook,
    },
    {
      label: "Notice",
      verb: "Point",
      eyebrow: "EVIDENCE BEFORE EXPLANATION",
      title: provocation.noticeWonder[0],
      body: "Look quietly first. Name details you can point to. Leave feelings, motives, and missing context as questions.",
    },
    {
      label: "Wonder",
      verb: "Ask",
      eyebrow: "KEEP A REAL QUESTION OPEN",
      title: provocation.noticeWonder[1],
      body: "Choose a question that the source cannot answer by itself.",
      items: provocation.questions,
    },
    {
      label: "Discuss",
      verb: "Test",
      eyebrow: "LISTEN · USE EVIDENCE · RECONSIDER",
      title: provocation.questions[0],
      body: provocation.discussion,
      items: provocation.questions.slice(1),
    },
    {
      label: "Create",
      verb: "Make",
      eyebrow: "SHOW THE THINKING",
      title: provocation.product,
      body: "Use the named source carefully. Make one claim you can support and keep one limit or uncertainty visible.",
    },
    {
      label: "Check",
      verb: "Finish",
      eyebrow: "YOU ARE DONE WHEN",
      title: "Your response is evidence-based, useful, and careful.",
      body: `Credit ${provocation.source.label}. Separate what the source shows from your interpretation, complete the product, and name one responsible next step or open question.`,
      items: [
        "I used a detail another person can inspect.",
        "I did not guess about a person's feelings, identity, or experience.",
        "I named what remains uncertain or needs another source.",
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

function StudentProvocationPlayer({ provocation }: { provocation: (typeof provocations)[number] }) {
  const [partIndex, setPartIndex] = useState(0);
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
        <article><small>WE ARE LEARNING</small><strong>{provocation.learning.replace(/^We are learning\s+/i, "")}</strong></article>
        <article><small>FIRST MOVE</small><strong>{provocation.noticeWonder[0]}</strong></article>
        <article><small>WE WILL MAKE</small><strong>{provocation.product}</strong></article>
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
        <strong>{provocation.lens}</strong>
        <div><button type="button" disabled={partIndex === 0} onClick={() => setPartIndex((value) => Math.max(0, value - 1))}>← Previous</button><button type="button" disabled={partIndex === parts.length - 1} onClick={() => setPartIndex((value) => Math.min(parts.length - 1, value + 1))}>Next →</button></div>
      </footer>
    </section>
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
      {audience === "teacher"
        ? <TeacherProvocationPlan provocation={selected} />
        : <StudentProvocationPlayer provocation={selected} />}
    </div>
  );
}

export default CalendarProvocationsPage;
