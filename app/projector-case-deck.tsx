"use client";

import { useId, useMemo, useState } from "react";
import type { ExperienceKit } from "./program-types";

type ThinkingLens = "notice" | "connect" | "question" | "change";

type ProjectorCaseDeckProps = {
  cards: ExperienceKit["cards"];
  mission: string;
  title?: string;
  nextMove?: string;
  eyebrow?: string;
  cardNoun?: string;
  progressNoun?: string;
  navigationLabel?: string;
  classMoveTitle?: string;
  classMovePrompt?: string;
};

type CardResponse = {
  lens: ThinkingLens | null;
  note: string;
  discussed: boolean;
};

const thinkingLenses: { id: ThinkingLens; label: string; prompt: string }[] = [
  { id: "notice", label: "We notice…", prompt: "We notice ___ in this card." },
  { id: "connect", label: "We think…", prompt: "We think this matters because ___." },
  { id: "question", label: "We wonder…", prompt: "We still wonder ___." },
  { id: "change", label: "We would change…", prompt: "We would change ___ because ___." },
];

function emptyResponses(total: number): CardResponse[] {
  return Array.from({ length: total }, () => ({ lens: null, note: "", discussed: false }));
}

export function ProjectorCaseDeck({ cards, mission, title = "Read one case. Find evidence. Build a stronger idea.", nextMove, eyebrow = "CASE DISCUSSION", cardNoun = "CASE", progressNoun = "CASES DISCUSSED", navigationLabel = "Choose a case", classMoveTitle = "First read. Then point to evidence. Then talk.", classMovePrompt = "Choose a response starter. Support it with a word, detail, number, or example from this case." }: ProjectorCaseDeckProps) {
  const headingId = useId();
  const noteId = useId();
  const [cardIndex, setCardIndex] = useState(0);
  const [responses, setResponses] = useState<CardResponse[]>(() => emptyResponses(cards.length));
  const [resetReady, setResetReady] = useState(false);
  const card = cards[cardIndex];
  const response = responses[cardIndex];
  const discussedCount = responses.filter((item) => item.discussed).length;
  const currentLens = thinkingLenses.find((item) => item.id === response?.lens);
  const allDiscussed = cards.length > 0 && discussedCount === cards.length;

  const discussedSummary = useMemo(() => responses.flatMap((item, index) => {
    if (!item.discussed) return [];
    const lens = thinkingLenses.find((option) => option.id === item.lens);
    return [{ title: cards[index]?.title ?? `Card ${index + 1}`, lens: lens?.label ?? "Shared", note: item.note }];
  }), [cards, responses]);

  if (!card || !response) return null;

  const updateResponse = (change: Partial<CardResponse>) => {
    setResponses((current) => current.map((item, index) => index === cardIndex ? { ...item, ...change } : item));
    setResetReady(false);
  };

  const moveTo = (index: number) => {
    setCardIndex(Math.max(0, Math.min(cards.length - 1, index)));
    setResetReady(false);
  };

  const saveAndAdvance = () => {
    updateResponse({ discussed: true });
    if (cardIndex < cards.length - 1) setCardIndex(cardIndex + 1);
  };

  const resetDeck = () => {
    setResponses(emptyResponses(cards.length));
    setCardIndex(0);
    setResetReady(false);
  };

  return (
    <section className="projector-case-deck" aria-labelledby={headingId}>
      <header>
        <div>
          <small>{eyebrow}</small>
          <h2 id={headingId}>{title}</h2>
          <p><b>Today’s mission:</b> {mission}</p>
        </div>
        <div className="projector-case-deck__progress">
          <span>{discussedCount} OF {cards.length} {progressNoun}</span>
          <div role="progressbar" aria-label={progressNoun.toLowerCase()} aria-valuemin={0} aria-valuemax={cards.length} aria-valuenow={discussedCount}>
            <i style={{ width: `${cards.length ? (discussedCount / cards.length) * 100 : 0}%` }} />
          </div>
        </div>
      </header>

      <nav aria-label={navigationLabel}>
        {cards.map((item, index) => (
          <button
            type="button"
            key={`${item.title}-${index}`}
            aria-label={`${cardNoun.toLowerCase()} ${index + 1}: ${item.title}${responses[index]?.discussed ? ", discussed" : ""}`}
            aria-current={cardIndex === index ? "step" : undefined}
            data-discussed={responses[index]?.discussed || undefined}
            onClick={() => moveTo(index)}
          >
            <b>{responses[index]?.discussed ? "✓" : index + 1}</b>
            <span>{item.title}</span>
          </button>
        ))}
      </nav>

      <div className="projector-case-deck__stage">
        <article className="projector-case-deck__card" key={cardIndex} aria-live="polite" aria-atomic="true">
          <small>{cardNoun} {cardIndex + 1} OF {cards.length}</small>
          <h3>{card.title}</h3>
          <p>{card.body}</p>
        </article>

        <section className="projector-case-deck__class-move" aria-labelledby={`${headingId}-class-move`}>
          <header>
            <small>YOUR MOVE</small>
            <h3 id={`${headingId}-class-move`}>{classMoveTitle}</h3>
          </header>
          <div className="projector-case-deck__lenses" aria-label="Choose a thinking starter">
            {thinkingLenses.map((lens) => (
              <button type="button" key={lens.id} aria-pressed={response.lens === lens.id} onClick={() => updateResponse({ lens: lens.id, discussed: false })}>
                {lens.label}
              </button>
            ))}
          </div>

          {currentLens ? (
            <div className="projector-case-deck__capture">
              <label htmlFor={noteId}><span>Say it aloud, or keep the shared words here.</span><strong>{currentLens.prompt}</strong></label>
              <textarea
                id={noteId}
                value={response.note}
                rows={2}
                placeholder="Optional shared note — this stays on this screen"
                onChange={(event) => updateResponse({ note: event.target.value, discussed: false })}
              />
              <button type="button" onClick={saveAndAdvance}>{response.discussed ? "Keep this thinking" : cardIndex < cards.length - 1 ? "Save thinking + next card →" : "Save our final card"}</button>
            </div>
          ) : (
            <p className="projector-case-deck__prompt">{classMovePrompt}</p>
          )}
        </section>
      </div>

      {allDiscussed && (
        <section className="projector-case-deck__finish" aria-live="polite">
          <div><small>ALL CARDS EXPLORED</small><h3>You have enough thinking to make the next move.</h3>{nextMove && <p>{nextMove}</p>}</div>
          <ol>{discussedSummary.map((item) => <li key={item.title}><b>{item.title}</b><span>{item.lens}{item.note ? ` ${item.note}` : " — shared aloud"}</span></li>)}</ol>
        </section>
      )}

      <footer>
        <button type="button" disabled={cardIndex === 0} onClick={() => moveTo(cardIndex - 1)}>← Previous card</button>
        <strong role="status">{response.discussed ? "This card is saved in your thinking." : currentLens ? "Finish the sentence together, then save it." : "Choose one way to respond."}</strong>
        {cardIndex < cards.length - 1 ? <button type="button" onClick={() => moveTo(cardIndex + 1)}>Next card →</button> : <a href="#mission-path">Continue the mission ↓</a>}
      </footer>

      <div className="projector-case-deck__reset">
        {!resetReady ? <button type="button" onClick={() => setResetReady(true)}>Reset the {cardNoun.toLowerCase()}s</button> : <><span>Clear every shared note and start again?</span><button type="button" onClick={resetDeck}>Yes, reset</button><button type="button" onClick={() => setResetReady(false)}>Keep our thinking</button></>}
      </div>

      <section className="projector-case-deck__print" aria-hidden="true">
        <h2>{title}</h2><p>{mission}</p>
        {cards.map((item, index) => <article key={`${item.title}-print-${index}`}><small>CARD {index + 1}</small><h3>{item.title}</h3><p>{item.body}</p></article>)}
      </section>
    </section>
  );
}

export default ProjectorCaseDeck;
