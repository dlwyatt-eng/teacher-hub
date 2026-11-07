"use client";
import { useId, useState } from "react";
import { fractionModel, countParts } from "./fraction-explorer-model.mjs";
import "./fraction-explorer.css";

export const fractionExplorerExperienceId = "fraction-ratio-remix";
const challenges = [
  { n: 7, d: 4, prompt: "Build seven quarters. How many whole strips can you make?", reverse: false },
  { n: 7, d: 3, prompt: "Build 2 whole strips and 1 third. How many thirds is that altogether?", reverse: true },
  { n: 11, d: 4, prompt: "Build eleven quarters. Predict both number names before you regroup.", reverse: false },
  { n: 8, d: 4, prompt: "Build eight quarters. Does every improper fraction need a fractional part in its other name?", reverse: false },
];
export default function FractionExplorer({ teacher = false }: { teacher?: boolean }) {
  const id = useId();
  const [denominator, setDenominator] = useState(4);
  const [numerator, setNumerator] = useState(7);
  const [regrouped, setRegrouped] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [task, setTask] = useState(0);
  const [projector, setProjector] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [checked, setChecked] = useState(false);
  const m = fractionModel(numerator, denominator);
  const challenge = challenges[task];
  const isTarget = numerator === challenge.n && denominator === challenge.d;
  const correct = /^\d+$/.test(prediction.trim()) && Number(prediction) === (challenge.reverse ? challenge.n : Math.floor(challenge.n / challenge.d));
  function change(n: number, d = denominator) { setNumerator(n); setDenominator(d); setRegrouped(false); setRevealed(false); setChecked(false); }
  function chooseTask(index: number) { setTask(index); setPrediction(""); change(0, challenges[index].d); }
  return <section className={`fraction-explorer${projector ? " fraction-explorer--projector" : ""}`} aria-labelledby={`${id}-title`}>
    <header className="fraction-explorer__hero">
      <div><p className="fraction-explorer__eyebrow">NUMBER STUDIO / SAME AMOUNT, NEW NAME</p><h2 id={`${id}-title`}>Pieces → wholes</h2><p>What changes when you regroup? What stays the same?</p></div>
      <div className="fraction-explorer__badge" aria-hidden="true"><span>●●</span><span>●●</span><b>→</b><strong>▣</strong></div>
    </header>
    <div className="fraction-explorer__toolbar"><button type="button" aria-pressed={projector} onClick={() => setProjector(!projector)}>Large-screen view {projector ? "on" : "off"}</button><a href="printables/fraction-explorer-paper.html" target="_blank" rel="noreferrer">Paper version ↗</a><button type="button" onClick={() => { setTask(0); setPrediction(""); change(7, 4); }}>Reset to 7/4</button></div>
    <div className="fraction-explorer__task"><span className="fraction-explorer__eyebrow">01 / CHOOSE A QUESTION</span><div className="fraction-explorer__tasks" role="group" aria-label="Investigation"><button type="button" aria-pressed={task === 0} onClick={() => chooseTask(0)}>Seven quarters</button><button type="button" aria-pressed={task === 1} onClick={() => chooseTask(1)}>Work backwards</button><button type="button" aria-pressed={task === 2} onClick={() => chooseTask(2)}>Try another</button><button type="button" aria-pressed={task === 3} onClick={() => chooseTask(3)}>What about 8/4?</button></div><h3>{challenge.prompt}</h3><p>Talk, point, or sketch your prediction first. Then use the controls to build it.</p></div>
    <div className="fraction-explorer__workbench">
      <div className="fraction-explorer__controls"><span className="fraction-explorer__eyebrow">02 / BUILD</span><label htmlFor={`${id}-parts`}>Equal parts in one whole</label><select id={`${id}-parts`} value={denominator} onChange={e => change(0, Number(e.target.value))}>{[2,3,4,5,6,8].map(d => <option value={d} key={d}>{d} equal parts</option>)}</select><p className="fraction-explorer__note">Changing the part size starts a new model at zero. Every whole strip stays the same size.</p><div className="fraction-explorer__counter"><button type="button" aria-label={`Remove one ${denominator}th part`} disabled={numerator === 0} onClick={() => change(numerator - 1)}>−</button><output aria-live="polite">{numerator}<small>parts selected</small></output><button type="button" aria-label={`Add one ${denominator}th part`} disabled={numerator === denominator * 3} onClick={() => change(numerator + 1)}>+</button></div><button type="button" className="fraction-explorer__primary" aria-pressed={regrouped} onClick={() => setRegrouped(!regrouped)}>{regrouped ? "See individual parts" : "Regroup into wholes"}</button></div>
      <div className="fraction-explorer__canvas"><p className="fraction-explorer__eyebrow">THREE EQUAL WHOLES / EACH PART IS 1/{denominator}</p><div className={`fraction-explorer__strips${regrouped ? " is-grouped" : ""}`} role="img" aria-label={`${numerator} of ${denominator * 3} parts filled across three equal whole strips, each divided into ${denominator} equal parts.${regrouped ? ` ${m.whole} complete wholes and ${m.remainder} remaining parts.` : ""}`}>
        {[0,1,2].map(row => <div className="fraction-explorer__strip-row" key={row}><span>whole {row + 1}</span><div className={`fraction-explorer__strip${numerator >= (row + 1) * denominator ? " is-full" : ""}`} style={{gridTemplateColumns: `repeat(${denominator}, 1fr)`}}>{Array.from({length: denominator}, (_, col) => <span key={col} className={row * denominator + col < numerator ? "is-filled" : ""}>{row * denominator + col < numerator ? "●" : ""}</span>)}</div></div>)}
      </div><p className="fraction-explorer__caption">{regrouped ? `${denominator} equal parts make each whole. No pieces were added or removed.` : "Filled dots show your pieces. Empty spaces are not part of your amount."}</p><button type="button" onClick={() => setRevealed(!revealed)} aria-expanded={revealed} aria-controls={`${id}-names`}>{revealed ? "Hide" : "Compare"} the number names</button><div id={`${id}-names`} aria-live="polite">{revealed && <div className="fraction-explorer__equation"><strong>{numerator}/{denominator} = {m.mixed}</strong><p>{m.whole} × {denominator} + {m.remainder} = {countParts(m.whole, m.remainder, denominator)} equal parts. The denominator stays {denominator} because the pieces did not change size.</p></div>}</div></div>
    </div>
    <div className="fraction-explorer__check"><span className="fraction-explorer__eyebrow">03 / TEST YOUR IDEA</span><label htmlFor={`${id}-guess`}>{challenge.reverse ? "How many thirds altogether in 2⅓?" : `How many complete wholes in ${challenge.n}/${challenge.d}?`}</label><div><input id={`${id}-guess`} inputMode="numeric" value={prediction} onChange={e => {setPrediction(e.target.value); setChecked(false);}} placeholder="Your prediction" /><button type="button" onClick={() => setChecked(true)}>Check my idea</button></div>{checked && <p role="status">{!/^\d+$/.test(prediction.trim()) ? "Enter a whole number, such as 1 or 2." : correct ? "That matches. Now explain how the equal parts prove it." : "Try grouping the equal parts into full strips. Count each full strip, then count what remains."}{!isTarget ? " Your model is showing a different amount right now. Build the question’s amount to compare." : ""}</p>}<p><b>Leave with:</b> a sketch and both number names for 7/4 and 2⅓. Explain why the amount is unchanged. Say it, draw it, or write it. No upload needed.</p></div>
    <details className="fraction-explorer__support"><summary>Need a starting point? / Go further</summary><p><b>Start here:</b> Set 4 equal parts. Add one part at a time. Stop at four. You have 4/4, or one whole. Add three more. What could you call the whole and the remaining three quarters?</p><p><b>Go further:</b> Build 6/4. It can be named 1 2/4 and 1 1/2. Explain why those names describe the same amount. Then invent two improper fractions between 1 and 2 and prove they belong there.</p><p><b>Words:</b> The numerator counts selected parts. The denominator tells how many equal parts make one whole. An improper fraction has a numerator at least as large as its denominator. A mixed number combines a whole number and a proper fraction.</p></details>
    {teacher && <aside className="fraction-explorer__support"><b>Teacher move</b><p>Ask for predictions before revealing names. Start with seven quarter-pieces, regroup, and then reverse with 2⅓. Listen for an unchanged whole and unchanged part size, not just a memorized rule. This is the fraction entry into the broader fraction/ratio lesson; the existing ratio work remains optional for a later block.</p></aside>}
  </section>;
}
