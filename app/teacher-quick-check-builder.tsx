"use client";

import { useId, useMemo, useState } from "react";
import type { ReadinessQuestion } from "./program-types";
import { printClosest } from "./print-support";
import "./teacher-quick-check-builder.css";

type QuickCheckMode = "kahoot" | "forms" | "paper" | "prototype";

export type TeacherQuickCheckBuilderProps = {
  lessonTitle: string;
  learningPurpose: string;
  questions: readonly ReadinessQuestion[];
  includePrototypeFeedback?: boolean;
};

const modes: readonly { id: QuickCheckMode; label: string; note: string }[] = [
  { id: "kahoot", label: "Kahoot / whole class", note: "Copy a ready quiz and teacher key." },
  { id: "forms", label: "Forms / Copilot prompt", note: "Copy one precise build prompt." },
  { id: "paper", label: "Paper check", note: "Print the questions without accounts." },
  { id: "prototype", label: "Prototype feedback", note: "Use a no-name closed-choice learner test." },
];

const prototypeFeedbackText = `GRADE 6 PROTOTYPE TEST · NO-NAME FEEDBACK

Do not write your name, email, class, teacher, account, or another person's information. Respond only about the teaching experience you tried.

1. Which route did you test?
□ Physical or no-tech station
□ Paper branching experience
□ Bloxels teaching route
□ Minecraft model or knowledge world
□ Private app or website prototype
□ Another teacher-approved route

2. I could tell what the creator wanted me to learn.
□ Not yet  □ A little  □ Mostly  □ Clearly

3. Which part helped your learning most?
□ Clear first step  □ Useful example  □ Choice or interaction
□ Visual explanation  □ Practice or check  □ Feedback after an action

4. Where did you get stuck?
□ Beginning  □ Instructions  □ Navigation  □ Information
□ Technology  □ Understanding check  □ Nowhere

5. Which revision would help most?
□ Clearer first step  □ Shorter text  □ Better example
□ Easier navigation  □ Stronger feedback or check  □ Better offline or access route

6. Did the experience work without entering personal information or creating a personal account?
□ Yes  □ Not sure  □ No

Teacher: gather Notice / Next comments orally or on paper only when useful. Do not copy learner responses into SpacesEDU.`;

function questionLines(questions: readonly ReadinessQuestion[], includeAnswers: boolean) {
  return questions.flatMap((question, index) => {
    const choices = question.choices.map((choice, choiceIndex) => `${String.fromCharCode(65 + choiceIndex)}. ${choice}`);
    const answer = includeAnswers
      ? [`ANSWER: ${String.fromCharCode(65 + question.answer)} · ${question.choices[question.answer]}`, `FEEDBACK: ${question.feedback}`]
      : [];
    return [`${index + 1}. ${question.prompt}`, ...choices, ...answer, ""];
  }).join("\n").trim();
}

function buildOutput(mode: QuickCheckMode, lessonTitle: string, learningPurpose: string, questions: readonly ReadinessQuestion[]) {
  if (mode === "prototype") return prototypeFeedbackText;
  const studentQuestions = questionLines(questions, false);
  const teacherQuestions = questionLines(questions, true);

  if (mode === "forms") return `COPILOT / MICROSOFT FORMS BUILD PROMPT

Create a short Grade 6 quiz titled “${lessonTitle} · quick check.”
Purpose: ${learningPurpose}

Use exactly the questions, choices, correct answers, and feedback below. Keep the reading load concise and make every question required. Do not add a name, email, student number, class, upload, open-response, location, or personal-information field. Do not shuffle choices until the teacher verifies every answer. Keep results private to the teacher and use the district-approved account and retention settings. The teacher must review whether the platform records names or email before sharing the link. Also create an equivalent paper version.

${teacherQuestions}`;

  if (mode === "paper") return `${lessonTitle.toUpperCase()} · PAPER QUICK CHECK
Purpose: ${learningPurpose}

Circle one answer for each question. You may point, use a response card, or tell the teacher instead.

${studentQuestions}`;

  return `KAHOOT / WHOLE-CLASS QUICK CHECK
Title: ${lessonTitle}
Purpose: ${learningPurpose}

Use as a shared class check, not a confidential survey or individual grade. Students may answer with team names, response cards, mini-whiteboards, fingers, or movement corners; real names are unnecessary.

${teacherQuestions}`;
}

function buildTeacherKey(lessonTitle: string, questions: readonly ReadinessQuestion[]) {
  return `${lessonTitle.toUpperCase()} · TEACHER KEY
KEEP SEPARATE FROM THE STUDENT PAPER

${questions.map((question, index) => `${index + 1}. ${String.fromCharCode(65 + question.answer)} · ${question.choices[question.answer]}\n   ${question.feedback}`).join("\n")}`;
}

export default function TeacherQuickCheckBuilder({
  lessonTitle,
  learningPurpose,
  questions,
  includePrototypeFeedback = false,
}: TeacherQuickCheckBuilderProps) {
  const titleId = useId();
  const [mode, setMode] = useState<QuickCheckMode>("kahoot");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [keyCopyState, setKeyCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const availableModes = includePrototypeFeedback ? modes : modes.filter((item) => item.id !== "prototype");
  const activeMode = availableModes.find((item) => item.id === mode) ?? availableModes[0];
  const output = useMemo(
    () => buildOutput(activeMode.id, lessonTitle, learningPurpose, questions),
    [activeMode.id, learningPurpose, lessonTitle, questions],
  );
  const teacherKey = useMemo(() => buildTeacherKey(lessonTitle, questions), [lessonTitle, questions]);

  async function copyOutput() {
    try {
      await navigator.clipboard.writeText(output);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  async function copyTeacherKey() {
    try {
      await navigator.clipboard.writeText(teacherKey);
      setKeyCopyState("copied");
    } catch {
      setKeyCopyState("failed");
    }
  }

  return <section className="teacher-quick-check-builder" aria-labelledby={titleId}>
    <header>
      <div><small>TEACHER-ONLY · TEXT EXPORTER</small><h3 id={titleId}>Quick Check Builder</h3><p>Reuse the lesson’s reviewed questions without building another system. This panel stores and submits nothing.</p></div>
      <span>NO STUDENT RESPONSES ENTER THE HUB</span>
    </header>

    <nav aria-label="Choose a quick-check format">
      {availableModes.map((item) => <button
        key={item.id}
        type="button"
        className={activeMode.id === item.id ? "active" : ""}
        aria-pressed={activeMode.id === item.id}
        onClick={() => { setMode(item.id); setCopyState("idle"); setKeyCopyState("idle"); }}
      ><strong>{item.label}</strong><small>{item.note}</small></button>)}
    </nav>

    <section className="teacher-quick-check-builder__workspace">
      <div>
        <small>READY TO COPY, ADAPT, OR PRINT</small>
        <h4>{activeMode.label}</h4>
        <p>{activeMode.id === "prototype" ? "Closed choices reduce accidental personal disclosure. Paper remains the safest default." : `${questions.length} reviewed lesson question${questions.length === 1 ? "" : "s"} with a separate teacher answer route.`}</p>
      </div>
      <textarea readOnly value={output} aria-label={`${activeMode.label} text`} rows={18} />
      <footer>
        <button type="button" onClick={copyOutput}>{copyState === "copied" ? "Copied ✓" : "Copy text"}</button>
        <button type="button" onClick={(event) => printClosest(event.currentTarget, ".teacher-quick-check-builder")}>Print this check</button>
        <span aria-live="polite">{copyState === "failed" ? "Clipboard access was blocked. Select the text above and copy it manually." : "Edit in the destination before sharing."}</span>
      </footer>
    </section>

    {activeMode.id === "paper" && <details className="teacher-quick-check-builder__answer-key">
      <summary><span><small>TEACHER-ONLY</small><strong>Answer key · keep separate from student copies</strong></span><b>Open ▾</b></summary>
      <div>
        <pre>{teacherKey}</pre>
        <button type="button" onClick={copyTeacherKey}>{keyCopyState === "copied" ? "Key copied ✓" : "Copy teacher key"}</button>
        <span aria-live="polite">{keyCopyState === "failed" ? "Clipboard access was blocked. Select the key and copy it manually." : "This key is intentionally excluded from Print this check."}</span>
      </div>
    </details>}

    <aside className="teacher-quick-check-builder__routes">
      <article><b>KAHOOT</b><p>Useful for lively whole-class concept checks. Keep confidential questions and individual grading elsewhere.</p></article>
      <article><b>DISTRICT FORMS</b><p>Preferred when responses must be collected. Verify name/email recording, access, retention, and sharing settings before launch.</p></article>
      <article className="caution"><b>JOTFORM · HOLD FOR PRIVACY REVIEW</b><p>Do not call a student form anonymous while technical identifiers such as submission IP may be retained. Keep it teacher/synthetic-only unless the district approves the account, data location, access, retention, and deletion route.</p><a href="https://www.jotform.com/help/31-how-to-find-the-ip-addresses-of-form-respondents/" target="_blank" rel="noreferrer">IP documentation ↗</a><a href="https://www.jotform.com/answers/4686253-how-to-disable-capturing-ip-addresses" target="_blank" rel="noreferrer">Capture setting answer ↗</a></article>
    </aside>

    <footer className="teacher-quick-check-builder__guardrail"><strong>The Hub makes question text—not a response database.</strong><span>Never paste names, student work, confidential information, survey responses, or raw AI conversations into a generator.</span></footer>
  </section>;
}
