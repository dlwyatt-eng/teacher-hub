"use client";
import { useState } from "react";
import "./math-counter-model.css";

export function counterDistribution(blue: number, gold: number, packs: number) {
  return { blue: Math.floor(blue / packs), gold: Math.floor(gold / packs), blueLeft: blue % packs, goldLeft: gold % packs };
}
export function MathCounterModel() {
  const [packs, setPacks] = useState(2);
  const [shared, setShared] = useState(false);
  const result = counterDistribution(24, 36, packs);
  const exact = result.blueLeft === 0 && result.goldLeft === 0;
  return <section className="counter-lesson" aria-label="Counter demonstration">
    <h4>Can we make {packs} identical packs?</h4>
    <p><strong>24 blue circles + 36 gold squares.</strong> Each object is one item. Each box is a pack.</p>
    <div className="counter-controls"><label>Number of packs <select value={packs} onChange={event => { setPacks(Number(event.target.value)); setShared(false); }}>{[1,2,3,4,5,6,8,9,12,18,24].map(n => <option key={n} value={n}>{n}</option>)}</select></label><button type="button" onClick={() => setShared(!shared)}>{shared ? "Hide and predict again" : "Share the counters"}</button></div>
    <p>Predict first: how many of each colour will go in every pack? Will anything be left?</p>
    {shared && <div aria-live="polite">
      <div className="counter-packs">{Array.from({length:packs},(_,i)=><article className="counter-pack" key={i}><strong>Pack {i+1}</strong><div aria-label={`${result.blue} blue counters`} className="counter-dots">{Array.from({length:result.blue},(_,j)=><span className="counter-blue" key={j} aria-hidden="true" />)}</div><div aria-label={`${result.gold} gold counters`} className="counter-dots">{Array.from({length:result.gold},(_,j)=><span className="counter-gold" key={j} aria-hidden="true" />)}</div><p>{result.blue} blue · {result.gold} gold</p></article>)}</div>
      <p><strong>Left over:</strong> {result.blueLeft} blue and {result.goldLeft} gold.</p>
      <p>{exact ? "All supplies are used in identical packs. Why does this pack count divide both totals?" : "These equal packs leave items unused. Which colour prevents this pack count from working?"}</p>
      <p>Check: {packs} × {result.blue} + {result.blueLeft} = 24; {packs} × {result.gold} + {result.goldLeft} = 36.</p>
    </div>}
    <p className="counter-print-note">Paper route: draw pack circles. Test 2, 3, 4, 5, 6, 8 and 12 packs. Record blue per pack, gold per pack and leftovers. Use division when drawing becomes slow.</p>
  </section>;
}
