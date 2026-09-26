"use client";

import { useState } from "react";
import "./math-thinking-routines.css";

type Routine = {
  id: string;
  title: string;
  source?: string;
  sourceUrl?: string;
  time: string;
  materials: string;
  focus: string;
  board: string;
  first: string;
  together: string;
  finish: string;
  check: string;
  next: string;
};

// These classroom examples were written for this Hub. Creator links open the
// original resource; no third-party slides, questions, images or answer keys
// are reproduced here.
export const mathThinkingRoutines: Routine[] = [
  {
    id: "number-day", title: "Number of the Day / Week", time: "6–10 min", materials: "Paper or mini-whiteboard",
    focus: "Represent, compare and round a decimal", board: "Today's number: 6.204",
    first: "Write 6.204 as a sum of place values. Round it to the nearest hundredth.",
    together: "Compare 6.204 with 6.24. Find a different number between them and explain how you know it fits.",
    finish: "Keep one representation and one comparison with a reason. For a week-long version, add a new question about the same number each day.",
    check: "6.204 = 6 + 0.2 + 0.004. To the nearest hundredth it is 6.20. Since 6.204 < 6.240, 6.21 is one number between them.",
    next: "Change the number or ask for a fraction, measurement, equation or number-line location.",
  },
  {
    id: "mystery-number", title: "Mystery Number", time: "5–8 min", materials: "Paper or mini-whiteboard",
    focus: "Use place-value clues and justify a unique solution", board: "I have three digits. My tens digit is 0. My hundreds digit is twice my ones digit. My digits add to 9.",
    first: "List possible ones digits. Test each clue instead of guessing once.",
    together: "Agree on a number and show how each clue fits. Then change one clue to make a new solvable puzzle.",
    finish: "Write the number and a two-sentence proof. Trade your new puzzle with a partner.",
    check: "603. If the ones digit is 3, the hundreds digit is 6; 6 + 0 + 3 = 9. No other whole-digit pair has both a 2:1 ratio and a sum of 9.",
    next: "Use decimals, factors, multiples or a range once the class knows those ideas.",
  },
  {
    id: "esti-mysteries", title: "Clue and estimate", source: "Esti-Mysteries · Steve Wyborney", sourceUrl: "https://stevewyborney.com/2018/11/esti-mysteries-estimation-meets-math-mysteries/", time: "6–10 min", materials: "Paper or mini-whiteboard",
    focus: "Revise an estimate when new information arrives", board: "A hidden whole number is between 20 and 40, inclusive.",
    first: "Record a first estimate and a reason. New clues: it is even; it is a multiple of 3; its digits add to 9. Revise after each clue.",
    together: "Compare the numbers each clue removed. Explain when your estimate changed and why.",
    finish: "Record the final number plus the clue that helped most.",
    check: "36 fits every clue. The even multiples of 3 from 20 to 40 are 24, 30 and 36; only 36 has digits that add to 9.",
    next: "Open Wyborney's original Esti-Mysteries separately when you want his visual activity.",
  },
  {
    id: "splat", title: "Hidden-total reasoning", source: "Splat! · Steve Wyborney", sourceUrl: "https://stevewyborney.com/2017/02/splat/", time: "5–8 min", materials: "24 counters or a sketch; cover 8",
    focus: "Use subtraction and different decompositions", board: "There are 24 counters altogether. You can see 5 blue, 7 green and 4 yellow counters. The rest are covered.",
    first: "Find the covered amount. Show a calculation or a drawing before anyone uncovers it.",
    together: "Compare two ways to find it. What if 3 of the visible counters move under the cover? Does the total change?",
    finish: "Show the equation and explain what remains constant.",
    check: "5 + 7 + 4 = 16 visible, so 24 − 16 = 8 covered. Moving 3 underneath gives 13 visible and 11 covered; the total stays 24.",
    next: "Use Wyborney's Splat! slides for his authored visuals and sequence.",
  },
  {
    id: "leaping", title: "Leaping number pattern", source: "Leaping Numbers · Steve Wyborney", sourceUrl: "https://stevewyborney.com/2024/02/leaping-numbers-leap-day-pattern-challenge-series/", time: "5–8 min", materials: "Paper or mini-whiteboard",
    focus: "Describe a multiplicative pattern", board: "0.25 → 0.5 → 1 → 2 → ___ → ___",
    first: "Fill both spaces. Describe the rule in words and show one step with an equation.",
    together: "What value would come before 0.25 if the same rule continues backward? How is this different from adding 0.25 each time?",
    finish: "Write the next two values and a reason that works for every step shown.",
    check: "Each value doubles, so the next two are 4 and 8. Before 0.25 comes 0.125. Adding 0.25 would give 0.25, 0.5, 0.75, 1, which does not match.",
    next: "Try the linked creator series for its own animated pattern challenges.",
  },
  {
    id: "wodb", title: "Which One Doesn't Belong?", source: "WODB collection · Talking Math With Your Kids", sourceUrl: "https://talkingmathwithkids.com/wodb-numbers/", time: "7–10 min", materials: "Paper or mini-whiteboard",
    focus: "Use precise properties and listen to different valid claims", board: "0.25     1/4     25%     0.2",
    first: "Choose one that does not belong. Name a mathematical property, not a preference.",
    together: "Find a defensible reason for a different choice. Can your group defend all four?",
    finish: "Record two different claims, each with evidence.",
    check: "For example, 0.2 is the only value not equal to one quarter; 1/4 is the only fraction notation; 25% is the only percent notation; 0.25 is the only decimal written to hundredths. Other accurate distinctions are welcome.",
    next: "Create a new set tied to the current unit. Link to the credited collection for more authored sets.",
  },
  {
    id: "estimation-180", title: "Estimate, measure, revise", source: "Estimation 180 · Andrew Stadel", sourceUrl: "https://estimation180.com/", time: "8–12 min", materials: "A classroom table, one pencil and paper",
    focus: "Use a benchmark and examine estimation error", board: "About how many pencil lengths span the long edge of our table?",
    first: "Write a low estimate, a best estimate and a high estimate. Name the pencil as your benchmark.",
    together: "Place the pencil end to end along the edge. Count full lengths and estimate any leftover part. Compare with each range.",
    finish: "Record your measured result and how far your best estimate was from it. Say what you would change next time.",
    check: "The measured answer depends on your table and pencil. Your best estimate should lie between your low and high values; error is the absolute difference between the estimate and the measured result.",
    next: "Use a new classroom object, or open Stadel's original photo-based estimation tasks.",
  },
  {
    id: "open-middle", title: "Open Middle digit challenge", source: "Open Middle®", sourceUrl: "https://www.openmiddle.com/", time: "8–12 min", materials: "Digits 1, 2, 5 and 8 on paper squares",
    focus: "Try, improve and explain a place-value strategy", board: "Use 1, 2, 5 and 8 exactly once to make two two-digit numbers. Make their sum as close to 100 as possible.",
    first: "Make one pair. Calculate its sum and its distance from 100.",
    together: "Swap digits to improve your result. Compare which digits you place in the tens positions and why.",
    finish: "Record your closest sum, the distance from 100 and why another arrangement cannot get closer.",
    check: "82 + 15 = 97 and 85 + 12 = 97, each 3 from 100. Tens digits 8 and 1 give a total of 97; tens digits 8 and 2 give 106. Other tens-digit choices are farther away.",
    next: "Change the four digits or the target. The linked site has its own published problems.",
  },
  {
    id: "visual-patterns", title: "Growing visual pattern", source: "Visual Patterns · Fawn Nguyen", sourceUrl: "https://visualpatterns.org/", time: "8–12 min", materials: "Paper squares or a sketch",
    focus: "Connect a picture, a table and a rule", board: "Stage 1: ■■■     Stage 2: ■■■■■     Stage 3: ■■■■■■■",
    first: "Draw stage 4 without writing a rule first. Count its squares.",
    together: "Predict stage 10 in two ways: keep adding and use a rule for any stage number. Explain what the starting square and each pair of new squares do.",
    finish: "Record a sketch, a stage-number table and a rule.",
    check: "The counts are 3, 5, 7, 9, … . Stage n has 2n + 1 squares, so stage 10 has 21. The display here is an original simple pattern; Nguyen's site has its own visual patterns.",
    next: "Build a two-dimensional pattern with tiles, then open Nguyen's collection for more authored visuals.",
  },
  {
    id: "clipboards", title: "Quick estimation clipboard", source: "Estimation Clipboards · Steve Wyborney", sourceUrl: "https://stevewyborney.com/2021/10/new-estimation-clipboards/", time: "8–12 min", materials: "15–30 small scrap-paper squares, a cup and paper",
    focus: "Estimate repeatedly and revise from evidence", board: "Partner A: secretly put 15–30 paper squares in a cup. Show the pile for five seconds, then cover it.",
    first: "Partner B: record low, best and high estimates. Explain the benchmark you used.",
    together: "Reveal about half the squares, count them, and revise the total estimate. Swap roles for a second round.",
    finish: "Count all the squares. Record both estimates, the actual count and which evidence improved your estimate.",
    check: "The answer depends on the prepared pile. A revised estimate should use the counted part as a benchmark; compare each best estimate with the actual count.",
    next: "Use Wyborney's original Estimation Clipboards for his prepared visuals.",
  },
  {
    id: "pass-pigs", title: "Pass the Pigs · math lens", source: "Pass the Pigs® rules · Winning Moves", sourceUrl: "https://winning-moves.com/images/PTP_Rule_2023.pdf", time: "12–20 min", materials: "The game, its own scoring guide, paper and a pencil",
    focus: "Record scores, compare outcomes and make a risk decision", board: "Play with the game's scoring guide. After each throw, decide: bank the turn score or try again?",
    first: "Make columns for throw, landing, turn points and banked total. Predict one likely and one rare outcome before playing.",
    together: "Play at least eight throws. Tally how often each landing occurs. Before a risky throw, explain what you could gain or lose.",
    finish: "Record a score calculation and a sentence comparing two observed outcomes. A small sample does not prove the true probability.",
    check: "Use the game's own guide for every score and penalty, including any event that changes an earlier banked total. Compare frequencies as counts out of your total throws; eight throws are not enough for a stable probability estimate.",
    next: "No pig pieces? Choose the one-die Pig routine below. The original game's scoring chart stays with the game publisher.",
  },
  {
    id: "pig-dice", title: "Pig dice · one-die class version", time: "12–20 min", materials: "One ordinary six-sided die per pair, paper and a pencil",
    focus: "Add, bank and reason about a one-in-six risk", board: "Aim for 50 points. On your turn, roll and add 2–6 to your turn total. After each roll, bank that turn total or roll again. A 1 ends the turn with zero points for that turn. Banked points stay safe.",
    first: "Draw columns for banked score and current turn. Play a trial turn while your partner checks the arithmetic.",
    together: "Take turns. Before each new roll, state the gain you hope for and the risk. Swap the recorder every turn.",
    finish: "Keep the score table. Explain one bank-or-roll choice with your score and the one-in-six chance of a 1 on a fair die.",
    check: "Only banked turn points add to the game score. A 1 erases the current turn's unbanked points, not earlier banked points. The chance of rolling 1 on the next fair roll is 1/6 regardless of earlier rolls.",
    next: "Try a shorter game to 30 or compare two different banking strategies over several rounds.",
  },
];

export default function MathThinkingRoutines({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  const [selected, setSelected] = useState(mathThinkingRoutines[0].id);
  const [focusMode, setFocusMode] = useState(false);
  const routine = mathThinkingRoutines.find(item => item.id === selected) ?? mathThinkingRoutines[0];
  return <section id="math-thinking-routines" className={`math-thinking-routines${focusMode ? " math-thinking-routines--focus" : ""}`} aria-label="Math thinking routines">
    <header className="math-thinking-routines__header">
      <div><small>REPEATABLE · PARTNER FRIENDLY · PROJECTOR READY</small><Heading>Math thinking routines</Heading><p>Choose one 5–20 minute start. Students think alone, compare strategies, and leave a small record. Every example below works with paper and classroom materials.</p></div>
      <button type="button" aria-pressed={focusMode} onClick={() => setFocusMode(value => !value)}>{focusMode ? "Show all routines" : "Focus on one routine"}</button>
    </header>
    <nav className="math-thinking-routines__menu" aria-label="Choose a math thinking routine">
      {mathThinkingRoutines.map(item => <button type="button" key={item.id} aria-pressed={item.id === routine.id} onClick={() => setSelected(item.id)}>{item.title}</button>)}
    </nav>
    <article className="math-thinking-routines__card" key={routine.id}>
      <header><div><small>{routine.time} · {routine.focus}</small><h3>{routine.title}</h3></div><span>{routine.materials}</span></header>
      <div className="math-thinking-routines__board"><small>PROJECT THIS</small><p>{routine.board}</p></div>
      <ol>
        <li><strong>Think first</strong><p>{routine.first}</p></li>
        <li><strong>Work together</strong><p>{routine.together}</p></li>
        <li><strong>Leave a record</strong><p>{routine.finish}</p></li>
      </ol>
      <details className="math-thinking-routines__check"><summary>Check after discussion</summary><p>{routine.check}</p></details>
      <footer><p><strong>Next time:</strong> {routine.next}</p>{routine.sourceUrl && <a href={routine.sourceUrl} target="_blank" rel="noreferrer">Optional creator resource: {routine.source} ↗</a>}</footer>
    </article>
    <p className="math-thinking-routines__credit">The Hub examples are independently written. Linked creators' slides, photos, games and scoring materials remain on their own sites or with the physical game.</p>
  </section>;
}
