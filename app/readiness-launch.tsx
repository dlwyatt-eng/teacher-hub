"use client";

import { useState } from "react";
import type { ReadinessLaunch, ReadinessLevel, WordHelp } from "./program-types";

type ReadinessPanelProps = {
  launch: ReadinessLaunch;
  words: WordHelp[];
  mode: "teacher" | "student";
  onReady?: () => void;
  onBypass?: () => void;
  level?: ReadinessLevel;
  anchorId?: string;
};

const levelLabels: Record<ReadinessLevel, { teacher: string; student: string; time: string }> = {
  full: { teacher: "Teach the background before the main activity.", student: "Let’s make sure the mission will make sense.", time: "ABOUT 8–15 MINUTES" },
  quick: { teacher: "Check the key idea after the background lesson.", student: "Try a quick check before the mission.", time: "ABOUT 4–8 MINUTES" },
  review: { teacher: "Start with recall. Reteach only what is missed.", student: "Remember one useful idea, then begin.", time: "ABOUT 2–4 MINUTES" },
};

export function ReadinessPanel({ launch, words, mode, onReady, onBypass, level = "full", anchorId }: ReadinessPanelProps) {
  const background = level === "full" ? launch.background : launch.background.slice(0, level === "quick" ? 2 : 1);
  const visibleWords = level === "full" ? words.slice(0, 8) : words.slice(0, level === "quick" ? 5 : 3);
  const exampleSteps = level === "full" ? launch.example.steps : launch.example.steps.slice(0, level === "quick" ? 2 : 1);
  const questions = level === "full" ? launch.questions : launch.questions.slice(0, level === "quick" ? 2 : 1);
  const stages = ["Know this first", "Open word help", "Watch one example", `Try ${questions.length === 1 ? "one question" : `${questions.length} questions`}`];
  const [answers, setAnswers] = useState<number[]>(questions.map(() => -1));
  const [checked, setChecked] = useState(false);
  const allAnswered = answers.every(answer => answer >= 0);
  const passed = allAnswered && questions.every((question, index) => question.answer === answers[index]);

  const check = () => {
    setChecked(true);
    if (passed) onReady?.();
  };

  return (
    <section id={anchorId} className={`readiness-launch readiness-${mode} readiness-level-${level}`}>
      <header className="readiness-heading">
        <div><p>{level === "full" ? "QUICK START" : level === "quick" ? "QUICK CHECK" : "REMEMBER + BEGIN"}</p><h2>{levelLabels[level][mode]}</h2></div>
        <span>{mode === "teacher" ? `${level.toUpperCase()} ROUTE · ACTIVITY STAYS OPEN` : levelLabels[level].time}</span>
      </header>

      <ol className="readiness-stages" aria-label="Readiness sequence">
        {stages.map((stage, index) => <li key={stage}><b>{index + 1}</b><span>{stage}</span></li>)}
      </ol>

      <div className="readiness-grid">
        <article className="readiness-background">
          <small>1 · KNOW THIS FIRST</small>
          <h3>{mode === "teacher" ? "Explain or demonstrate these ideas" : "Read these short ideas. Ask about anything that is unclear."}</h3>
          <ul>{background.map(item => <li key={item}>{item}</li>)}</ul>
        </article>

        <article className="readiness-words">
          <small>2 · OPEN WORD HELP</small>
          <h3>You do not need to memorize these. Open the meaning when you need it.</h3>
          <div>{visibleWords.map(word => <section key={word.term}><strong>{word.term}</strong><p>{word.meaning}</p><em><b>Example:</b> {word.example}</em></section>)}</div>
          {!visibleWords.length && <p className="readiness-no-words">No special vocabulary is needed beyond the background explanation.</p>}
        </article>

        <article className="readiness-example">
          <small>3 · WATCH ONE EXAMPLE</small>
          <h3>{launch.example.title}</h3>
          <ol>{exampleSteps.map((step, index) => <li key={step}><b>{index + 1}</b><span>{step}</span></li>)}</ol>
          <p><strong>The important part:</strong> {launch.example.conclusion}</p>
        </article>

        <article className="readiness-check">
          <small>4 · TRY TWO QUESTIONS</small>
          <h3>{mode === "teacher" ? "Answer key and likely reteach" : "Choose an answer. If it does not work yet, use the feedback and try again."}</h3>
          {questions.map((question, questionIndex) => (
            <fieldset key={question.prompt}>
              <legend>{questionIndex + 1}. {question.prompt}</legend>
              {question.choices.map((choice, choiceIndex) => {
                const selected = answers[questionIndex] === choiceIndex;
                const answerClass = mode === "teacher"
                  ? choiceIndex === question.answer ? "correct" : ""
                  : checked && selected ? choiceIndex === question.answer ? "correct" : "incorrect" : "";
                return <label key={choice} className={answerClass}><input type="radio" name={`readiness-${questionIndex}`} checked={selected} onChange={() => { setChecked(false); setAnswers(current => current.map((value, index) => index === questionIndex ? choiceIndex : value)); }} /><span>{choice}</span>{mode === "teacher" && choiceIndex === question.answer && <b>ANSWER</b>}</label>;
              })}
              {checked && answers[questionIndex] >= 0 && <p className={answers[questionIndex] === question.answer ? "feedback-correct" : "feedback-reteach"}>{answers[questionIndex] === question.answer ? "Yes. " : "Not yet. "}{question.feedback}</p>}
            </fieldset>
          ))}
          {mode === "student" && <div className="readiness-actions"><button type="button" disabled={!allAnswered} onClick={check}>Check my answers</button>{onBypass && <button type="button" className="readiness-bypass" onClick={onBypass}>My teacher checked with me another way</button>}</div>}
          {mode === "teacher" && <aside><b>IF STUDENTS ARE NOT READY</b><p>{launch.reteach}</p><small>Use the bypass when this background was already taught, assessed orally, or provided through an accessibility route.</small></aside>}
          {mode === "student" && checked && passed && <p className="readiness-success" role="status">You have the starting idea. Return to the mission when you are ready.</p>}
          {mode === "student" && checked && !passed && <aside><b>TRY THIS PART AGAIN</b><p>{launch.reteach}</p><small>Ask about the one idea that is still confusing, then choose again.</small></aside>}
        </article>
      </div>
    </section>
  );
}

export function ReadinessSupport({ launch, words, level = "full" }: { launch: ReadinessLaunch; words: WordHelp[]; level?: ReadinessLevel }) {
  return (
    <details id="quick-start" className="student-readiness-support">
      <summary><span><small>WORDS &amp; HELP</small><strong>Open this if you want a quick example before you begin.</strong></span><b>Open help ▾</b></summary>
      <ReadinessPanel launch={launch} words={words} mode="student" level={level} />
    </details>
  );
}
