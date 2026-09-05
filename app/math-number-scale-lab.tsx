"use client";

import { useId, useMemo, useState } from "react";

export const magnitudeScaleLabExperienceId = "magnitude-gallery";

type Audience = "student" | "teacher";

export type MathNumberScaleLabProps = {
  audience?: Audience;
};

type NumberCard = {
  id: string;
  label: string;
  spoken: string;
  value: number;
};

type ScaleView = {
  id: string;
  max: number;
  label: string;
  scene: string;
};

type ScaleLens = {
  id: string;
  tab: string;
  title: string;
  invitation: string;
  cards: readonly NumberCard[];
  views: readonly ScaleView[];
  paperMove: string;
};

type Prediction = number | "off" | null;

type PreviousView = {
  lensId: string;
  cardId: string;
  view: ScaleView;
};

type Feedback = {
  kind: "correct" | "revise" | "watch";
  title: string;
  message: string;
};

const lenses: readonly ScaleLens[] = [
  {
    id: "decimal-lens",
    tab: "Tiny decimals",
    title: "How far across is the same decimal?",
    invitation: "Pick any mixed-up card. The class decides where it belongs before the location appears.",
    cards: [
      { id: "decimal-008", label: "0.008", spoken: "eight thousandths", value: 0.008 },
      { id: "decimal-08", label: "0.08", spoken: "eight hundredths", value: 0.08 },
      { id: "decimal-8", label: "0.8", spoken: "eight tenths", value: 0.8 },
    ],
    views: [
      { id: "decimal-1", max: 1, label: "0 → 1", scene: "One-whole view" },
      { id: "decimal-01", max: 0.1, label: "0 → 0.1", scene: "Hundredths close-up" },
      { id: "decimal-001", max: 0.01, label: "0 → 0.01", scene: "Thousandths close-up" },
    ],
    paperMove: "Draw three equal-length lines ending at 0.01, 0.1, and 1. Place 0.008 on each without changing the number.",
  },
  {
    id: "million-lens",
    tab: "Millions",
    title: "Can a huge number look tiny?",
    invitation: "Choose a card first. Then decide whether it fits and which part of the line it reaches.",
    cards: [
      { id: "million-428m", label: "428,000,000", spoken: "four hundred twenty-eight million", value: 428_000_000 },
      { id: "million-428", label: "4,280,000", spoken: "four million two hundred eighty thousand", value: 4_280_000 },
      { id: "million-4280", label: "42,800,000", spoken: "forty-two million eight hundred thousand", value: 42_800_000 },
    ],
    views: [
      { id: "million-500", max: 500_000_000, label: "0 → 500 million", scene: "Wide view" },
      { id: "million-100", max: 100_000_000, label: "0 → 100 million", scene: "Closer view" },
      { id: "million-50", max: 50_000_000, label: "0 → 50 million", scene: "Closest view" },
    ],
    paperMove: "Draw a 0-to-50-million line and a 0-to-500-million line. Place 42.8 million on both and explain why it moves.",
  },
  {
    id: "billion-lens",
    tab: "Up to a billion",
    title: "What happens when the map gets enormous?",
    invitation: "One million, one hundred million, and half a billion are shuffled. Let the endpoints settle the argument.",
    cards: [
      { id: "billion-500m", label: "500,000,000", spoken: "five hundred million", value: 500_000_000 },
      { id: "billion-1m", label: "1,000,000", spoken: "one million", value: 1_000_000 },
      { id: "billion-100m", label: "100,000,000", spoken: "one hundred million", value: 100_000_000 },
    ],
    views: [
      { id: "billion-1", max: 1_000_000_000, label: "0 → 1 billion", scene: "Wide view" },
      { id: "billion-500", max: 500_000_000, label: "0 → 500 million", scene: "Closer view" },
      { id: "billion-100", max: 100_000_000, label: "0 → 100 million", scene: "Closest view" },
    ],
    paperMove: "Draw one line from 0 to 1 billion. Place 1 million, 100 million, and 500 million. Which one almost disappears beside zero?",
  },
] as const;

function positionPercent(value: number, max: number) {
  return (value / max) * 100;
}

function formatExact(value: number) {
  if (value >= 1) return value.toLocaleString("en-CA");
  return value.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
}

export function formatCompact(value: number, max: number) {
  if (value === 0) return "0";
  if (value >= 1_000_000_000) return `${Number((value / 1_000_000_000).toFixed(2))}B`;
  if (value >= 1_000_000) return `${Number((value / 1_000_000).toFixed(2))}M`;
  const digits = max <= 0.01 ? 3 : max <= 0.1 ? 2 : max <= 1 ? 1 : 0;
  return digits === 0 ? value.toFixed(0) : value.toFixed(digits).replace(/0+$/, "").replace(/\.$/, "");
}

function formatFactor(factor: number) {
  if (factor >= 10) return Number(factor.toFixed(1)).toLocaleString("en-CA");
  return Number(factor.toFixed(2)).toLocaleString("en-CA");
}

function tickValues(max: number) {
  const interval = max / 10;
  return Array.from({ length: 11 }, (_, index) => interval * index);
}

export function zoneFor(value: number, max: number): Exclude<Prediction, null> {
  if (value > max) return "off";
  // A point on a boundary ends the preceding section: 0.008 is eight
  // thousandth-sized jumps from zero, at the end of section 8.
  return Math.max(0, Math.min(9, Math.ceil(positionPercent(value, max) / 10 - 1e-9) - 1));
}

function zoneLabel(index: number, view: ScaleView) {
  const start = (view.max / 10) * index;
  const end = (view.max / 10) * (index + 1);
  return `Section ${index + 1}, from ${formatExact(start)} to ${formatExact(end)}`;
}

function explainPosition(card: NumberCard, view: ScaleView) {
  const percent = positionPercent(card.value, view.max);
  if (percent > 100) {
    return `${card.label} is ${formatFactor(card.value / view.max)} times the endpoint ${formatExact(view.max)}, so it is past the right edge.`;
  }
  if (percent === 100) {
    return `${card.label} is exactly the right-hand endpoint, so it lands at the very end.`;
  }
  const jumps = Number((card.value / (view.max / 10)).toFixed(4));
  return `${card.label} is ${jumps} jumps from 0. Each equal jump is ${formatExact(view.max / 10)}.`;
}

function mixedCards(lens: ScaleLens, turn: number) {
  const cards = [...lens.cards];
  const offset = turn % cards.length;
  const rotated = [...cards.slice(offset), ...cards.slice(0, offset)];
  return turn % 2 === 0 ? rotated : rotated.reverse();
}

function ScalePlot({
  view,
  card,
  prediction,
  revealed,
  previous,
  onPredict,
}: {
  view: ScaleView;
  card: NumberCard | null;
  prediction: Prediction;
  revealed: boolean;
  previous: PreviousView | null;
  onPredict: (prediction: Exclude<Prediction, null>) => void;
}) {
  const ticks = tickValues(view.max);
  const percent = card ? positionPercent(card.value, view.max) : 0;
  const onLine = Boolean(card && percent <= 100);

  return (
    <section className="number-scale-plot" aria-label={`Number line from 0 to ${formatExact(view.max)}`}>
      <div className="number-scale-sky" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="number-scale-selected-card">
        <small>PLACE THIS NUMBER</small>
        <strong>{card?.label ?? "Choose any card"}</strong>
        <span>{card?.spoken}</span>
      </div>
      <p className="number-scale-plot-caption">{card && revealed ? explainPosition(card, view) : prediction === null ? "Read the ends of the line. Where would you place the number?" : prediction === "off" ? "Your guess: past the end of the line." : `Your guess: section ${prediction + 1}. Each section ends at its next mark.`}</p>

      <div className="number-scale-axis" role="img" aria-label={card ? `${card.label} on a number line from 0 to ${formatExact(view.max)}. ${revealed ? explainPosition(card, view) : "Its exact location is covered for the class prediction."}` : `Empty number line from 0 to ${formatExact(view.max)}.`}>
        <div className="number-scale-axis-line" aria-hidden="true" />
        {ticks.map((value, index) => (
          <span className="number-scale-tick" data-edge={index === 0 ? "start" : index === 10 ? "end" : "middle"} data-labelled={index === 0 || index === 5 || index === 10 ? "true" : "false"} key={`${view.id}-${index}`} style={{ left: `${index * 10}%` }}>
            <i aria-hidden="true" />
            {index === 0 || index === 5 || index === 10 ? <b>{formatCompact(value, view.max)}</b> : null}
          </span>
        ))}

        {card && prediction !== null && prediction !== "off" && !revealed && (
          <span className="number-scale-prediction-flag" style={{ left: `${prediction * 10 + 5}%` }} aria-hidden="true"><i /></span>
        )}

        {card && revealed && onLine && (
          <span className="number-scale-marker number-scale-marker--exact" style={{ left: `${percent}%` }} data-edge={percent < 4 ? "start" : percent > 96 ? "end" : "middle"}>
            <i aria-hidden="true" />
          </span>
        )}

        {card && revealed && !onLine && (
          <span className="number-scale-off-map"><b>{card.label} is past the end →</b></span>
        )}
      </div>

      <div className="number-scale-zone-key"><small>CHOOSE A SECTION</small><span>Each section is worth {formatExact(view.max / 10)}. A point on a mark ends that section.</span></div>
      <div className="number-scale-prediction-zones" role="group" aria-label="Choose the section where the number belongs">
        {Array.from({ length: 10 }, (_, index) => (
          <button
            type="button"
            key={`${view.id}-zone-${index}`}
            disabled={!card || revealed}
            aria-label={zoneLabel(index, view)}
            aria-pressed={prediction === index}
            onClick={() => onPredict(index)}
          >
            <span>{index + 1}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="number-scale-past-end"
        disabled={!card || revealed}
        aria-pressed={prediction === "off"}
        onClick={() => onPredict("off")}
      >
        It is past the endpoint →
      </button>
    </section>
  );
}

function PositionComparison({ card, view, previous, revealed }: { card: NumberCard; view: ScaleView; previous: PreviousView; revealed: boolean }) {
  const beforePercent = positionPercent(card.value, previous.view.max);
  const nowPercent = positionPercent(card.value, view.max);
  const scaleFactor = view.max / previous.view.max;
  const changedMessage = scaleFactor > 1
    ? "The new line reaches a larger number, so this point appears closer to zero."
    : scaleFactor < 1
      ? "The new line reaches a smaller number, so this point moves farther right. It may pass the end."
      : "The endpoint did not change, so the position stays the same.";

  return (
    <section className="number-scale-comparison" aria-label="Compare the previous and current scale">
      <article>
        <small>PREVIOUS VIEW</small>
        <b>{previous.view.label}</b>
        <strong>{beforePercent <= 100 ? `Each jump: ${formatExact(previous.view.max / 10)}` : "past the endpoint"}</strong>
        <i aria-hidden="true"><span style={{ width: `${Math.min(100, beforePercent)}%` }} /></i>
      </article>
      <div aria-hidden="true">→</div>
      <article data-current="true">
        <small>CURRENT VIEW</small>
        <b>{view.label}</b>
        <strong>{revealed ? (nowPercent <= 100 ? `Each jump: ${formatExact(view.max / 10)}` : "past the endpoint") : "covered—predict first"}</strong>
        <i aria-hidden="true">{revealed && <span style={{ width: `${Math.min(100, nowPercent)}%` }} />}</i>
      </article>
      <p><b>{card.label} never changed.</b> {changedMessage}</p>
    </section>
  );
}

export function MathNumberScaleLab({ audience = "student" }: MathNumberScaleLabProps) {
  const titleId = useId();
  const [lensIndex, setLensIndex] = useState(0);
  const [viewIndex, setViewIndex] = useState(2);
  const [selectedCardId, setSelectedCardId] = useState<string | null>("decimal-008");
  const [prediction, setPrediction] = useState<Prediction>(null);
  const [revealed, setRevealed] = useState(false);
  const [previous, setPrevious] = useState<PreviousView | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [mixTurns, setMixTurns] = useState(() => lenses.map((_, index) => index + 1));
  const [announcement, setAnnouncement] = useState("Start with 0.008 on the 0-to-0.01 line. Read the endpoints and one equal jump before predicting.");

  const lens = lenses[lensIndex] ?? lenses[0];
  const view = lens.views[viewIndex] ?? lens.views[0];
  const cards = useMemo(() => mixedCards(lens, mixTurns[lensIndex] ?? 0), [lens, lensIndex, mixTurns]);
  const selectedCard = lens.cards.find((card) => card.id === selectedCardId) ?? null;
  const jump = view.max / 10;

  const openLens = (index: number) => {
    const next = lenses[index] ?? lenses[0];
    setLensIndex(index);
    setViewIndex(index === 0 ? 2 : 0);
    setSelectedCardId(index === 0 ? "decimal-008" : null);
    setPrediction(null);
    setRevealed(false);
    setPrevious(null);
    setFeedback(null);
    setAnnouncement(index === 0 ? "Tiny decimals open. Start with 0.008 on the 0-to-0.01 line." : `${next.tab} open. Choose one card, read the scale, and predict.`);
  };

  const chooseCard = (card: NumberCard) => {
    setSelectedCardId(card.id);
    setPrediction(null);
    setRevealed(false);
    setPrevious(null);
    setFeedback(null);
    setAnnouncement(`${card.label} selected. Read zero, ${formatExact(view.max)}, and one jump before predicting.`);
  };

  const mixAgain = () => {
    setMixTurns((current) => current.map((turn, index) => index === lensIndex ? turn + 1 : turn));
    setAnnouncement("The cards were mixed again. Choose any one; no target is being named.");
  };

  const predict = (next: Exclude<Prediction, null>) => {
    setPrediction(next);
    setFeedback(null);
    setAnnouncement(next === "off" ? "The class predicts that the number is past the endpoint." : `The class predicts section ${next + 1} of the line.`);
  };

  const revealLocation = () => {
    if (!selectedCard || prediction === null) return;
    const exactZone = zoneFor(selectedCard.value, view.max);
    const correct = prediction === exactZone;
    const message = explainPosition(selectedCard, view);
    setRevealed(true);
    setFeedback({
      kind: correct ? "correct" : "revise",
      title: correct ? "That prediction fits this scale." : "The scale changed the picture—revise the prediction.",
      message: correct ? `${message} Now choose another scale without changing the card.` : `${message} Read the endpoint again, then compare the part to the whole line.`,
    });
    setAnnouncement(`${correct ? "Prediction confirmed." : "Prediction tested."} ${message}`);
  };

  const changeView = (nextIndex: number) => {
    const bounded = Math.max(0, Math.min(lens.views.length - 1, nextIndex));
    if (bounded === viewIndex) return;
    const next = lens.views[bounded] ?? lens.views[0];
    if (selectedCard && revealed) {
      setPrevious({ lensId: lens.id, cardId: selectedCard.id, view });
      setFeedback({ kind: "watch", title: "Same card. New map.", message: `The number stayed ${selectedCard.label}. Only the endpoint changed from ${formatExact(view.max)} to ${formatExact(next.max)}.` });
    }
    setViewIndex(bounded);
    setPrediction(null);
    setAnnouncement(`${next.label}. The selected number has not changed; the scale has.`);
  };

  const coverForPrediction = () => {
    if (!selectedCard) return;
    if (revealed) setPrevious({ lensId: lens.id, cardId: selectedCard.id, view });
    setRevealed(false);
    setPrediction(null);
    setFeedback(null);
    setAnnouncement("The exact marker is covered. Change the scale if you wish, then point and predict again.");
  };

  const reset = () => {
    setLensIndex(0);
    setViewIndex(2);
    setSelectedCardId("decimal-008");
    setPrediction(null);
    setRevealed(false);
    setPrevious(null);
    setFeedback(null);
    setAnnouncement("Start with 0.008 on the 0-to-0.01 line. Each jump is 0.001.");
  };

  return (
    <section className="math-number-scale-lab" data-audience={audience} data-experience-id={magnitudeScaleLabExperienceId} aria-labelledby={titleId}>
      <header className="number-scale-header">
        <div>
          <small>SCALE CITY · SAME NUMBER, NEW SCALE</small>
          <h2 id={titleId}>The number stays. The scale changes.</h2>
          <p>Place 0.008 on the line. Then change the end number. Does 0.008 belong in the same place?</p>
        </div>
        <aside><strong>START HERE · 0.008 ON 0 → 0.01</strong><span>Each jump is 0.001. Count eight jumps from zero.</span></aside>
      </header>

      <section className="number-scale-class-routine" aria-label="Shared-screen class routine">
        <article><b>1 · READ</b><span>Say the number, 0, the endpoint, and one equal jump.</span></article>
        <article><b>2 · PREDICT</b><span>Point, vote, or sketch before the marker appears.</span></article>
        <article><b>3 · REVEAL</b><span>Check the point. Explain why it belongs there.</span></article>
        <article><b>4 · CHANGE SCALE</b><span>Keep the number. Choose a new endpoint and try again.</span></article>
      </section>

      <nav className="number-scale-lenses" aria-label="Choose a number scale lab">
        {lenses.map((item, index) => (
          <button type="button" key={item.id} aria-current={lensIndex === index ? "page" : undefined} onClick={() => openLens(index)}>
            <b>{index + 1}</b><span>{item.tab}</span>
          </button>
        ))}
      </nav>

      <p className="number-scale-live" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>

      <article className="number-scale-workbench" data-lens={lens.id}>
        <header>
          <div><small>{view.scene} · {lens.tab}</small><h3>{lens.title}</h3><p>{lens.invitation}</p></div>
          <aside><b>ONE EQUAL JUMP</b><strong>{formatExact(jump)}</strong><span>because {formatExact(view.max)} ÷ 10 = {formatExact(jump)}</span></aside>
        </header>

        <section className="number-scale-card-area">
          <div className="number-scale-card-heading"><div><small>CHOOSE A NUMBER</small><h4>{lens.id === "decimal-lens" ? "Begin with 0.008. Then try another card." : "Choose one number to place."}</h4><p>Say each card aloud. Keep one number fixed while the scale changes.</p></div><button type="button" onClick={mixAgain}>Mix cards ↻</button></div>
          <div className="number-scale-card-deck">
            {cards.map((card, index) => (
              <button type="button" key={card.id} aria-label={`Card ${index + 1}: ${card.spoken}`} aria-pressed={selectedCard?.id === card.id} onClick={() => chooseCard(card)}>
                <small>CARD {String.fromCharCode(65 + index)}</small><strong>{card.label}</strong><span>{selectedCard?.id === card.id ? "Keep this number fixed" : "Choose this card"}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="number-scale-range-control">
          <div><small>CHANGE THE SCALE</small><h4>Choose a new right-hand endpoint</h4><p>The selected number stays fixed. Only the number line changes.</p></div>
          <div className="number-scale-slider">
            <p>Current line: <strong>{view.label}</strong></p>
            <div className="number-scale-range-stops">
              {lens.views.map((item, index) => <button type="button" key={item.id} aria-pressed={index === viewIndex} onClick={() => changeView(index)}>{item.label}</button>)}
            </div>
          </div>
        </section>

        <ScalePlot view={view} card={selectedCard} prediction={prediction} revealed={revealed} previous={previous} onPredict={predict} />

        <section className="number-scale-check-row">
          <div><small>STEP 3 · TEST THE CLASS IDEA</small><strong>{selectedCard ? prediction === null ? "Point first, then tap one numbered section—or choose past the endpoint." : "The class prediction is locked. Ready to reveal?" : "Choose any mixed-up card to begin."}</strong></div>
          <div>
            <button type="button" disabled={!selectedCard || prediction === null || revealed} onClick={revealLocation}>Reveal and test</button>
            <button type="button" disabled={!selectedCard || !revealed} onClick={coverForPrediction}>Cover for a new prediction</button>
          </div>
        </section>

        {feedback && (
          <aside className="number-scale-feedback" data-kind={feedback.kind} aria-live="polite">
            <b aria-hidden="true">{feedback.kind === "correct" ? "✓" : feedback.kind === "revise" ? "↺" : "↔"}</b>
            <div><strong>{feedback.title}</strong><span>{feedback.message}</span></div>
          </aside>
        )}

        {selectedCard && previous && previous.lensId === lens.id && previous.cardId === selectedCard.id && (
          <PositionComparison card={selectedCard} view={view} previous={previous} revealed={revealed} />
        )}

        <aside className="number-scale-paper-route">
          <div><small>BOARD / PAPER VERSION</small><strong>{lens.paperMove}</strong></div>
          <p>No student device is needed. Everyone can point, hold up a section number from 1–10, or sketch a quick line. One person controls the shared screen.</p>
        </aside>
      </article>

      {audience === "teacher" && (
        <aside className="number-scale-teacher-note">
          <strong>TEACHER / TTOC ROUTE</strong>
          <ol>
            <li>Choose the route: teach from this shared model, show the useful part of a matching Math Antics explanation first, or combine both.</li>
            <li>Do not name a target card. Mix the cards and let the class choose one.</li>
            <li>Read 0, the right endpoint, and one jump. Students point or sketch before you tap their section.</li>
            <li>Reveal the exact spot. Keep the card and choose another endpoint so the same number visibly shifts.</li>
            <li>Cover the marker before the next prediction. Ask: “The number stayed fixed—what changed?”</li>
          </ol>
          <p><b>Optional blank tool:</b> The <a href="https://apps.mathlearningcenter.org/number-line/" target="_blank" rel="noreferrer">Math Learning Center Number Line</a>. The activity above already contains everything needed to teach it.</p>
        </aside>
      )}

      <footer className="number-scale-footer">
        <button type="button" onClick={reset}>Reset Scale City</button>
        <p><b>Listen for:</b> “The number did not get smaller. The endpoint got larger, so the number uses less of the line.”</p>
      </footer>
    </section>
  );
}

export default MathNumberScaleLab;
