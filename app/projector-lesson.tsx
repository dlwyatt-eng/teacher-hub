"use client";

import { useState } from "react";
import type { ReadinessLaunch, WordHelp } from "./program-types";

type ProjectorQuickStartProps = {
  launch: ReadinessLaunch;
  words: WordHelp[];
  question: string;
  firstMove: string;
};

const partLabels = ["Idea", "Words", "Model", "Check"] as const;

export function ProjectorQuickStart({ launch, words, question, firstMove }: ProjectorQuickStartProps) {
  const [part, setPart] = useState(0);
  const [answers, setAnswers] = useState<number[]>(launch.questions.map(() => -1));
  const [checked, setChecked] = useState(false);
  const allAnswered = answers.every((answer) => answer >= 0);
  const allCorrect = allAnswered && launch.questions.every((item, index) => item.answer === answers[index]);
  const visibleWords = words.slice(0, 6);

  const choosePart = (next: number) => {
    setPart(Math.max(0, Math.min(partLabels.length - 1, next)));
    document.getElementById("screen-lesson")?.focus({ preventScroll: true });
  };

  return (
    <section id="screen-lesson" className="projector-quick-start" tabIndex={-1} aria-labelledby="projector-quick-start-title">
      <header>
        <div>
          <small>QUESTION</small>
          <h2 id="projector-quick-start-title">{question}</h2>
        </div>
        <span>PART {part + 1} OF {partLabels.length}</span>
      </header>

      <nav aria-label="On-screen teaching parts">
        {partLabels.map((label, index) => <button type="button" key={label} aria-current={part === index ? "step" : undefined} onClick={() => choosePart(index)}><b>{index + 1}</b><span>{label}</span></button>)}
      </nav>

      <div className="projector-quick-start__stage" aria-live="polite">
        {part === 0 && <section>
          <div className="projector-stage-heading"><small>LOOK</small><h3>Point to one useful detail.</h3></div>
          <ul className="projector-background-cards">{launch.background.map((idea) => <li key={idea}>{idea}</li>)}</ul>
          <aside><small>DO</small><strong>{firstMove}</strong></aside>
        </section>}

        {part === 1 && <section>
          <div className="projector-stage-heading"><small>WORDS</small><h3>Use one when it makes your idea clearer.</h3></div>
          {visibleWords.length > 0 ? <div className="projector-word-grid">{visibleWords.map((word) => <article key={word.term}><strong>{word.term}</strong><p>{word.meaning}</p><small><b>Example:</b> {word.example}</small></article>)}</div> : <p className="projector-no-words">No special vocabulary is needed before this activity. Move to the model.</p>}
        </section>}

        {part === 2 && <section>
          <div className="projector-stage-heading"><small>MODEL</small><h3>{launch.example.title}</h3></div>
          <ol className="projector-model-steps">{launch.example.steps.map((step, index) => <li key={step}><b>{index + 1}</b><span>{step}</span></li>)}</ol>
          <aside><small>NOTICE</small><strong>{launch.example.conclusion}</strong></aside>
        </section>}

        {part === 3 && <section>
          <div className="projector-stage-heading"><small>CHECK</small><h3>Choose. Explain. Reveal.</h3></div>
          <div className="projector-check-grid">{launch.questions.map((item, questionIndex) => <fieldset key={item.prompt}>
            <legend>{questionIndex + 1}. {item.prompt}</legend>
            {item.choices.map((choice, choiceIndex) => {
              const selected = answers[questionIndex] === choiceIndex;
              const result = checked && selected ? choiceIndex === item.answer ? "correct" : "retry" : "";
              return <label key={choice} data-result={result}><input type="radio" name={`projector-check-${questionIndex}`} checked={selected} onChange={() => { setChecked(false); setAnswers((current) => current.map((value, index) => index === questionIndex ? choiceIndex : value)); }} /><span>{choice}</span></label>;
            })}
            {checked && answers[questionIndex] >= 0 && <p className={answers[questionIndex] === item.answer ? "correct" : "retry"}><b>{answers[questionIndex] === item.answer ? "That works." : "Revisit this one."}</b> {item.feedback}</p>}
          </fieldset>)}</div>
          <div className="projector-check-actions"><button type="button" disabled={!allAnswered} onClick={() => setChecked(true)}>Reveal</button>{checked && <strong role="status">{allCorrect ? "Ready." : "Change one choice and try again."}</strong>}</div>
        </section>}
      </div>

      <footer>
        <button type="button" disabled={part === 0} onClick={() => choosePart(part - 1)}>← Previous</button>
        <span>{partLabels[part]}</span>
        {part < partLabels.length - 1 ? <button type="button" onClick={() => choosePart(part + 1)}>Next →</button> : <span>Ready for the next lesson part.</span>}
      </footer>
    </section>
  );
}
