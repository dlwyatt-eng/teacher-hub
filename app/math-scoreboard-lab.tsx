"use client";

import { useMemo, useState } from "react";

export const scoreboardRuleExperienceId = "scoreboard-rules";

type ScoreRound = {
  title: string;
  story: string;
  repeatLabel: string;
  onceLabel: string;
  choices: readonly string[];
  correct: number;
  answer: string;
  why: string;
  retry: readonly string[];
};

const rounds: readonly ScoreRound[] = [
  {
    title: "Moon-crystal run",
    story: "The team finds 3 moon crystals. Each crystal is worth 8 points. After all three, the whole team earns one 5-point portal bonus.",
    repeatLabel: "3 crystals × 8 points each",
    onceLabel: "+ one 5-point team bonus",
    choices: ["3 × 8 + 5", "3 × (8 + 5)", "(3 + 8) × 5"],
    correct: 0,
    answer: "3 × 8 + 5 = 24 + 5 = 29",
    why: "The 8 repeats for each crystal. The 5 happens once after the crystal points are counted.",
    retry: [
      "Read the last sentence again. Does the team earn the 5-point bonus once or three times?",
      "Those brackets would give every crystal an extra 5 points. The story says one team bonus.",
      "This rule groups the number of crystals with the points. Draw three groups of 8 to see what repeats.",
    ],
  },
  {
    title: "Combo-boost remix",
    story: "The team finds 3 moon crystals. This time, every crystal is worth 8 points plus a 5-point combo boost.",
    repeatLabel: "3 crystals",
    onceLabel: "each one gets 8 + 5 points",
    choices: ["3 × 8 + 5", "3 × (8 + 5)", "3 + 8 × 5"],
    correct: 1,
    answer: "3 × (8 + 5) = 3 × 13 = 39",
    why: "The brackets hold together the 8 points and 5-point boost that repeat for every crystal.",
    retry: [
      "This gives the 5-point boost only once. The story says every crystal gets the boost.",
      "That matches the story. Check what is inside the brackets before multiplying.",
      "Draw three identical score boxes. What two numbers belong inside every box?",
    ],
  },
  {
    title: "Co-op energy share",
    story: "The team shares 48 energy points equally among 6 players. Then each player earns a 4-point rescue bonus.",
    repeatLabel: "48 points ÷ 6 equal shares",
    onceLabel: "+ 4 points for each player",
    choices: ["48 ÷ 6 + 4", "48 ÷ (6 + 4)", "(48 + 6) ÷ 4"],
    correct: 0,
    answer: "48 ÷ 6 + 4 = 8 + 4 = 12",
    why: "Share the 48 first. Then add the 4-point bonus to each player's share.",
    retry: [
      "That matches the story: share first, then add each player's bonus.",
      "These brackets would share 48 among 10, but there are only 6 players.",
      "The story never adds the 6 players to the 48 points. Sketch 6 equal boxes instead.",
    ],
  },
];

export default function ScoreboardRuleLab({ audience = "student" }: { audience?: "student" | "teacher" }) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [choices, setChoices] = useState(() => rounds.map(() => -1));
  const [checked, setChecked] = useState(() => rounds.map(() => false));
  const [remixReady, setRemixReady] = useState(false);
  const round = rounds[roundIndex] ?? rounds[0];
  const solved = useMemo(() => rounds.map((item, index) => checked[index] && choices[index] === item.correct), [checked, choices]);
  const solvedCount = solved.filter(Boolean).length;

  if (!round) return null;

  const choose = (index: number) => {
    setChoices((current) => current.map((value, itemIndex) => itemIndex === roundIndex ? index : value));
    setChecked((current) => current.map((value, itemIndex) => itemIndex === roundIndex ? false : value));
  };

  const check = () => setChecked((current) => current.map((value, index) => index === roundIndex ? true : value));
  const reset = () => {
    setRoundIndex(0);
    setChoices(rounds.map(() => -1));
    setChecked(rounds.map(() => false));
    setRemixReady(false);
  };

  return (
    <section className="scoreboard-rule-lab" aria-labelledby="scoreboard-rule-title">
      <header>
        <div><small>ARCADE RULE REMIX</small><h2 id="scoreboard-rule-title">Which score rule matches the story?</h2><p>Picture what repeats. Circle what happens only once. Then choose the matching number rule.</p></div>
        <span><b>{solvedCount}</b> of {rounds.length} rounds cracked</span>
      </header>

      <div className="scoreboard-rule-preteach">
        <article><b>RULE</b><p>The exact instructions for making the score.</p><small>Example: “8 points for every crystal, plus one 5-point bonus.”</small></article>
        <article><b>BRACKETS</b><p>A fence around the part that must be done together first.</p><small>3 × (8 + 5) repeats the whole 8 + 5 package three times.</small></article>
        <article><b>YOUR FIRST MOVE</b><p>Draw quick groups or point to the part that repeats.</p><small>No one needs an individual device. One person can tap the class choice.</small></article>
      </div>

      <nav aria-label="Score-rule rounds">
        {rounds.map((item, index) => <button type="button" key={item.title} aria-current={roundIndex === index ? "step" : undefined} data-solved={solved[index] || undefined} onClick={() => setRoundIndex(index)}><b>{solved[index] ? "✓" : index + 1}</b><span>{item.title}</span></button>)}
      </nav>

      <article className="scoreboard-rule-round" aria-live="polite">
        <div className="scoreboard-rule-story">
          <small>ROUND {roundIndex + 1} · READ IT LIKE A GAME DESIGNER</small>
          <h3>{round.title}</h3>
          <p>{round.story}</p>
          <div className="scoreboard-rule-model" aria-label={`${round.repeatLabel}; ${round.onceLabel}`}>
            <span><i /><i /><i /><b>{round.repeatLabel}</b></span>
            <strong>THEN</strong>
            <span className="once"><i /><b>{round.onceLabel}</b></span>
          </div>
        </div>

        <fieldset>
          <legend>Which rule tells that exact scoring story?</legend>
          {round.choices.map((choice, index) => {
            const selected = choices[roundIndex] === index;
            const result = checked[roundIndex] && selected ? index === round.correct ? "correct" : "retry" : undefined;
            return <button type="button" key={choice} aria-pressed={selected} data-result={result} onClick={() => choose(index)}><span>{String.fromCharCode(65 + index)}</span><b>{choice}</b></button>;
          })}
          <div className="scoreboard-rule-check">
            <button type="button" disabled={choices[roundIndex] < 0} onClick={check}>Check the class choice</button>
            {checked[roundIndex] && <p className={solved[roundIndex] ? "correct" : "retry"}><b>{solved[roundIndex] ? "That rule matches." : "Not this story yet."}</b> {solved[roundIndex] ? round.why : round.retry[choices[roundIndex]]}</p>}
          </div>
        </fieldset>
      </article>

      {solved[roundIndex] && <section className="scoreboard-rule-reveal"><small>RUN THE RULE</small><strong>{round.answer}</strong><p>{round.why}</p>{roundIndex < rounds.length - 1 && <button type="button" onClick={() => setRoundIndex(roundIndex + 1)}>Open the next remix →</button>}</section>}

      {solvedCount === rounds.length && <section className="scoreboard-rule-remix">
        <div><small>NOW BREAK THE TEMPLATE</small><h3>Invent a scoring rule another group can decode.</h3><p>On paper, draw 2–5 objects. Choose points that repeat for every object. Add one bonus that happens either every time or only once.</p></div>
        <ol><li><b>1</b><span>Write the scoring story in everyday words.</span></li><li><b>2</b><span>Write the matching number rule. Use brackets only if a whole package repeats.</span></li><li><b>3</b><span>Trade papers. If the other group reads it differently, fix the words or the brackets.</span></li></ol>
        <button type="button" aria-pressed={remixReady} onClick={() => setRemixReady(value => !value)}>{remixReady ? "✓ We can explain our remix" : "We made a rule and tested it"}</button>
      </section>}

      {audience === "teacher" && <aside className="scoreboard-rule-teacher"><b>Teacher move</b><p>Have every group sketch or hold up A, B, or C before anyone taps the screen. Ask “What repeats?” and “What happens once?” before naming order of operations.</p></aside>}
      <footer><button type="button" onClick={reset}>Reset all rounds</button><p>The screen holds the shared game. Students do the mathematics with talk, quick sketches, cards, or paper.</p></footer>
    </section>
  );
}
