"use client";

import { useMemo, useState } from "react";
import { aiDilemmas, aiLiteracySources, aiSystemChain, humanAgencyProgression } from "./ai-literacy";

type Audience = "teacher" | "student";
type Decision = "HUMAN 👤" | "AI 🤖" | "BOTH 🤝" | "NOT SURE ❓";

const decisions: readonly Decision[] = ["HUMAN 👤", "AI 🤖", "BOTH 🤝", "NOT SURE ❓"];

export default function AiTensionsLab({ audience, onHome }: { audience: Audience; onHome: () => void }) {
  const [index, setIndex] = useState(0);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [revealed, setRevealed] = useState(false);
  const dilemma = aiDilemmas[index];
  const sources = useMemo(() => aiLiteracySources.filter((source) => dilemma.sourceIds.includes(source.id)), [dilemma]);

  const chooseCard = (nextIndex: number) => {
    setIndex(nextIndex);
    setDecision(null);
    setRevealed(false);
  };

  return <div className={`page ai-tensions-lab ${audience === "student" ? "student" : "teacher"}`}>
    <button className="back-link" type="button" onClick={onHome}>← Classroom home</button>

    <header className="ai-tensions-header">
      <div><p>AI TENSIONS LAB · 5–15 MINUTES</p><h1>What should the human still do?</h1></div>
      <nav aria-label="Choose an AI dilemma">{aiDilemmas.map((item, cardIndex) => <button key={item.id} className={cardIndex === index ? "active" : ""} aria-label={`Open ${item.title}`} onClick={() => chooseCard(cardIndex)}>{cardIndex + 1}</button>)}</nav>
    </header>

    <main className="ai-tensions-stage">
      <section className="ai-dilemma-card" aria-labelledby="ai-dilemma-title">
        <div className="ai-dilemma-meta"><span>{dilemma.horizon}</span><b>{dilemma.tension}</b></div>
        <h2 id="ai-dilemma-title">{dilemma.title}</h2>
        <p className="ai-dilemma-situation">{dilemma.situation}</p>

        <div className="human-ai-choice" role="group" aria-label="Who should make this decision?">
          {decisions.map(item => <button key={item} className={decision === item ? "selected" : ""} aria-pressed={decision === item} onClick={() => setDecision(item)}>{item}</button>)}
        </div>

        <button className="ai-reveal" type="button" onClick={() => setRevealed(value => !value)}>{revealed ? "Hide new information" : "Reveal new information"}</button>
        {revealed && <div className="ai-new-information"><small>NOW RECONSIDER</small><p>{dilemma.newInformation}</p></div>}

        <div className="ai-tension-balance">
          <article><small>OPPORTUNITY</small><p>{dilemma.opportunity}</p></article>
          <article><small>COULD GO WRONG</small><p>{dilemma.risk}</p></article>
        </div>
        <p className="ai-evidence-caution">These are competing considerations—not proof that evidence is equal. Check what is known, disputed, or still uncertain.</p>

        <div className="ai-strong-questions">{dilemma.questions.map((question, questionIndex) => <article key={question}><b>{questionIndex + 1}</b><p>{question}</p></article>)}</div>
      </section>

      <aside className="ai-agency-rail">
        <section className="ai-agency-loop"><small>HUMAN AGENCY</small><div>{humanAgencyProgression.map((move, moveIndex) => <span key={move}><b>{move}</b>{moveIndex < humanAgencyProgression.length - 1 && <i>→</i>}</span>)}</div><p>AI can contribute without becoming the decision-maker.</p></section>
        <section className="ai-uncertainty-key"><small>NAME THE HORIZON</small>{["EXISTS NOW", "EMERGING / UNCERTAIN", "PREDICTED", "HYPOTHETICAL"].map(label => <span key={label} className={label === dilemma.horizon ? "active" : ""}>{label}</span>)}</section>
      </aside>
    </main>

    <section className="ai-infrastructure" aria-labelledby="ai-infrastructure-title">
      <header><small>MAKE THE SYSTEM VISIBLE</small><h2 id="ai-infrastructure-title">An AI answer has a physical route.</h2></header>
      <div>{aiSystemChain.map((step, stepIndex) => <article key={step.label}><b>{stepIndex + 1}</b><strong>{step.label}</strong><span>{step.detail}</span></article>)}</div>
      <p><b>ZOOM OUT:</b> minerals → manufacturing → transport → electricity → cooling → replacement → e-waste</p>
    </section>

    {audience === "teacher" && <details className="ai-teacher-reference">
      <summary><span>TEACHER QUICK REFERENCE</span><strong>{dilemma.curriculum.join(" · ")}</strong><b>Open ↓</b></summary>
      <div>
        <article><small>PURPOSE</small><p>Students identify a real opportunity, a possible harm, who has power, what evidence matters, and which responsibility should remain human.</p></article>
        <article><small>RUN</small><p>Read → vote → hear two reasons → reveal → reconsider → name evidence or a rule. Stop after one careful revised position.</p></article>
        <article><small>WATCH FOR</small><p>{dilemma.misconception}</p></article>
        <article><small>USE WITH</small><p>{dilemma.lessonIds.join(" · ")}</p></article>
        <article className="wide"><small>BACKGROUND</small><p>{dilemma.teacherNote}</p></article>
        <nav className="wide" aria-label="Evidence sources for this dilemma">{sources.map(source => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><strong>{source.title} ↗</strong><span>{source.organization} · {source.use}</span></a>)}</nav>
      </div>
    </details>}

    <footer className="ai-tensions-footer"><button disabled={index === 0} onClick={() => chooseCard(index - 1)}>← Previous</button><p><b>{index + 1} / {aiDilemmas.length}</b><span>No official answer. Use evidence, values, uncertainty, and reasons.</span></p><button disabled={index === aiDilemmas.length - 1} onClick={() => chooseCard(index + 1)}>Next →</button></footer>
  </div>;
}
