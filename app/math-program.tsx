"use client";

import { useState } from "react";
import { mathFluencyRhythm, mathPacksFor, mathSupportPacks, mathYearSequence, pairedMathUpTopics, type MathSupportPack } from "./math-program-supports";
import { MathDeliveryModePanel } from "./math-delivery-mode-panel";
import { mathStudentPacksFor, type MathStudentWorkshopPlacement } from "./math-student-route";
import type { LearningProgram, ReadinessLevel } from "./program-types";
import { printClosest } from "./print-support";

const levelCopy: Record<ReadinessLevel, { label: string; time: string; description: string }> = {
  full: { label: "Full background lesson", time: "40–55 MIN", description: "Teach the model, guided practice, partner task, and independent check." },
  quick: { label: "Quick readiness check", time: "8–15 MIN", description: "Use when a Math Antics explanation or another recent lesson made the idea clear." },
  review: { label: "Already taught / review", time: "3–6 MIN", description: "Start with the check; reteach only the missed idea." },
};

function MathModelVisual({ pack, step }: { pack: MathSupportPack; step?: number }) {
  if (pack.id === "magnitude-place-value-pack") return (
    <div className="math-model-magnitude">
      <div className="math-place-value-row" aria-label="Zero ones, zero tenths, zero hundredths and eight thousandths">{["Ones", "Tenths", "Hundredths", "Thousandths"].map((label, index) => <span key={label}><small>{label}</small><b>{index === 3 ? 8 : 0}</b></span>)}</div>
      <svg viewBox="0 0 640 110" role="img" aria-label="A number line from zero to one hundredth. Ten equal jumps each worth one thousandth. Eight jumps reach zero point zero zero eight.">
        <title>0.008 is eight jumps of 0.001 from zero.</title>
        <path d="M35 48H605"/>
        {Array.from({length:11}, (_,index)=><path key={index} d={`M${35+index*57} 38V58`}/>)}
        <circle cx="491" cy="48" r="8"/>
        <text x="35" y="90">0</text><text x="320" y="90" textAnchor="middle">0.005</text><text x="605" y="90" textAnchor="end">0.010</text><text x="491" y="22" textAnchor="middle">0.008</text>
      </svg>
      <p><b>EACH JUMP = 0.001</b><span>8 jumps = 0.008</span><small>0.010 is the same number as 0.01.</small></p>
    </div>
  );
  if (pack.id === "factors-multiples-pack") return (
    <div className="math-model-factors" role="img" aria-label="A packing model uses the greatest common factor of twenty-four and thirty-six to make twelve packs, while timelines show twenty-four and thirty-six first meeting at seventy-two">
      <section><small>24 BLUE + 36 GOLD BADGES</small><div>{Array.from({ length: 12 }, (_, index) => <i key={index}><b>2</b><b>3</b></i>)}</div><p><strong>24 ÷ 12 = 2 blue</strong><strong>36 ÷ 12 = 3 gold</strong></p><em>12 identical packs. None left over.</em></section>
      <section><small>LIGHTS FLASH TOGETHER AT 0 SECONDS</small><div className="math-cycle-row"><b>Every 24 s</b><span>24</span><span>48</span><mark>72</mark></div><div className="math-cycle-row"><b>Every 36 s</b><span>36</span><mark>72</mark></div><em>The next shared flash is at 72 seconds.</em></section>
    </div>
  );
  if (pack.id === "pattern-relations-pack") return (
    <div className="math-model-patterns" role="img" aria-label="An increasing pattern seven, eleven, fifteen, nineteen with rule four n plus three and a decreasing pattern forty-two, thirty-seven, thirty-two, twenty-seven with rule forty-two minus five times n minus one">
      <section><header><small>INCREASING · +4</small><b>4n + 3</b></header><div><span>STAGE</span>{[1, 2, 3, 4].map(value => <b key={value}>{value}</b>)}<span>VALUE</span>{[7, 11, 15, 19].map(value => <i key={value}>{value}</i>)}</div><p>Stage 10: 4(10)+3 = <strong>43</strong></p></section>
      <section><header><small>DECREASING · −5</small><b>42 − 5(n−1)</b></header><div><span>STAGE</span>{[1, 2, 3, 4].map(value => <b key={value}>{value}</b>)}<span>VALUE</span>{[42, 37, 32, 27].map(value => <i key={value}>{value}</i>)}</div><p>Stage 9: 2 · Stage 10: −3 <strong>→ context stops</strong></p></section>
    </div>
  );
  if (pack.id === "one-step-equations-pack") return (
    <div className="math-model-equation" role="img" aria-label="A balance model solves x plus four equals eleven by removing four from both sides, leaving x equals seven, then checks seven plus four equals eleven">
      <section><b>x + 4</b><i>=</i><b>11</b></section><p>remove 4 from <strong>both</strong> sides</p><section><b>x</b><i>=</i><b>7</b></section><p className="math-equation-check">CHECK · 7 + 4 = 11 ✓</p>
    </div>
  );
  if (pack.id === "first-quadrant-transformations-pack") return (
    <div className="math-model-transformations">
      <svg viewBox="0 0 770 255" role="img" aria-label="A five-point figure in the first quadrant, translated three right and one up, then reflected across x equals six">
        <title>Every vertex follows both moves in order while the figure keeps the same size and shape.</title>
        <defs>{[25, 275, 525].map((x, index) => <pattern key={x} id={`transformation-grid-${index}`} x={x} y="74" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M18 0H0V18"/></pattern>)}</defs>
        {[25, 275, 525].map((x, index) => <g key={x}><rect className={`transformation-grid-panel transformation-grid-panel-${index}`} x={x} y="74" width="162" height="144"/><path className="axes" d={`M${x} 74V218H${x + 162}`}/><text x={x} y="239">{index === 0 ? "START" : index === 1 ? "1 · TRANSLATE (3, 1)" : "2 · REFLECT ACROSS x=6"}</text></g>)}
        <polygon className="shape-start" points="61,182 115,182 115,146 79,110 61,146"/>
        <polygon className="shape-move-one" points="365,164 419,164 419,128 383,92 365,128"/>
        <path className="mirror" d="M383 74V218"/><text className="mirror-label" x="388" y="87">x=6</text>
        <polygon className="shape-move-two" points="651,164 597,164 597,128 633,92 651,128"/>
        <text x="58" y="177">A</text><text x="356" y="159">A′</text><text x="654" y="159">A″</text>
      </svg>
    </div>
  );
  if (pack.id === "integer-number-line-pack") return (
    <div className="math-model-coordinate">
      <div className="coordinate-number-line" role="img" aria-label="Number line from negative ten to positive ten showing that negative two is to the right of negative seven">
        <small>COMPARE FROM ZERO</small>
        <div>{[-10, -5, 0, 5, 10].map(value => <span key={value} className={value === 0 ? "zero" : ""} style={{ left: `${((value + 10) / 20) * 100}%` }}><i/>{value}</span>)}<b className="point-a">−7</b><b className="point-b">−2</b></div>
        <p>−2 is farther right, so −2 &gt; −7.</p>
      </div>
      <svg viewBox="0 0 500 360" role="img" aria-label="Four-quadrant coordinate plane comparing positive three comma four and negative three comma four">
        <title>Plot (3, 4) by moving three right and four up, then plot (−3, 4) by moving three left and four up.</title>
        <defs><pattern id="coordinate-grid" x="26" y="18" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#d9e6e7" strokeWidth="1" /></pattern></defs>
        <rect x="74" y="18" width="352" height="320" fill="url(#coordinate-grid)" />
        <path className="axis" d="M250 18V338M74 178H426" />
        <path className="arrow" d="M250 18L242 31M250 18L258 31M250 338L242 325M250 338L258 325M74 178L87 170M74 178L87 186M426 178L413 170M426 178L413 186" />
        <text x="432" y="183">x</text><text x="256" y="18">y</text><text x="256" y="194">0</text>
        <path className="route route-positive" d="M250 178H346V50" />
        <path className="route route-negative" d="M250 178H154V50" />
        <circle className="point-positive" cx="346" cy="50" r="10" />
        <circle className="point-negative" cx="154" cy="50" r="10" />
        <text className="point-label" x="106" y="42">(−3, 4)</text>
        <text className="point-label positive-label" x="355" y="42">(3, 4)</text>
        <text className="move-label" x="178" y="169">3 left</text><text className="move-label" x="160" y="112">4 up</text>
        <text className="move-label positive-label" x="281" y="169">3 right</text><text className="move-label positive-label" x="352" y="112">4 up</text>
      </svg>
    </div>
  );
  if (pack.id === "operations-fluency-pack") return (
    <div className="math-model-operation" aria-label="Worked multiplication with an estimate, decomposed method, and check">
      <span><small>ESTIMATE</small><b>20 × 20 ≈ 400</b></span><i>→</i><span><small>BREAK APART</small><b>23 × 10 + 23 × 6</b></span><i>→</i><span><small>EXACT + CHECK</small><b>368 · 368 ÷ 16 = 23</b></span>
    </div>
  );
  if (pack.id === "fraction-ratio-percent-pack") return (
    <div className="math-fraction-examples">
      <section data-current={step === undefined || step === 0} className="math-quarter-model" aria-label="Seven quarters grouped into one whole and three quarters"><h4>7 quarter pieces = 1 whole + 3 quarters</h4><div>{[4,3].map((filled, group) => <span key={group}>{Array.from({length:4},(_,index)=><i key={index} data-filled={index<filled}>{index<filled ? "¼" : ""}</i>)}</span>)}</div><p>7/4 = 4/4 + 3/4 = 1 3/4</p></section>
      <section data-current={step === undefined || step === 1} className="math-fraction-compare" aria-label="Five sixths is fifteen eighteenths; seven ninths is fourteen eighteenths"><p><b>5/6 = 15/18</b> · multiply top and bottom by 3</p><p><b>7/9 = 14/18</b> · multiply top and bottom by 2</p><p>15 eighteenth-parts &gt; 14 eighteenth-parts</p></section>
      <section data-current={step === undefined || step === 2} className="math-ratio-model"><p><b>One batch:</b> 2 blue + 3 gold</p><p><b>Three batches:</b> 6 blue + 9 gold</p><p>More tiles; the same colour proportions.</p></section>
      <div data-current={step === undefined || step >= 3} className="math-model-percent" aria-label="Twenty-five shaded squares out of one hundred connected to one quarter and zero point two five">
      <div>{Array.from({ length: 100 }, (_, index) => <i key={index} className={index < 25 ? "filled" : ""} />)}</div>
      <p><b>25%</b><span>=</span><b>25/100</b><span>=</span><b>1/4</b><span>=</span><b>0.25</b></p>
      </div>
    </div>
  );
  if (pack.id === "decimal-operations-pack") return (
    <div className="math-model-place-value" aria-label="Place value model for seven point two divided by nine">
      <div><small>ONES</small><b>7</b></div><div><small>TENTHS</small><b>2</b></div><span>÷ 9</span><i>→</i><div className="result"><small>EACH GROUP</small><b>0.8</b></div>
      <p>72 tenths ÷ 9 = 8 tenths</p>
    </div>
  );
  if (pack.id === "collect-summarize-data-pack") return (
    <div className="math-model-data" aria-label="Raw values organized into a frequency display">
      <header><small>RAW</small><b>3 · 5 · 5 · 7 · 10 · 5</b></header>
      <div>{[[3,1],[5,3],[7,1],[10,1]].map(([value, frequency]) => <span key={value}><b>{value}</b><i style={{ height: `${frequency * 28}px` }} /><small>{frequency}</small></span>)}</div>
      <p>One value occurs three times. The graph does not explain why.</p>
    </div>
  );
  if (pack.id === "single-outcome-probability-pack") return (
    <div className="math-model-probability" aria-label="Four equal section spinner with one blue outcome">
      <div><span>BLUE</span><span>RED</span><span>GREEN</span><span>YELLOW</span></div>
      <p><b>P(blue) = 1/4</b><small>Prediction, not a promise of exactly one blue in every four spins.</small></p>
    </div>
  );
  if (pack.id === "angle-triangle-pack") return (
    <div className="math-model-angles">
      <svg viewBox="0 0 440 250" role="img" aria-label="An angle of 120 degrees opening counterclockwise from a ray pointing right. A dashed vertical ray shows 90 degrees for comparison.">
        <path d="M170 200H350M170 200L90 61.44"/><path className="arc" d="M230 200A60 60 0 0 0 140 148.04"/><path className="math-shape-guide" d="M170 200V35"/><text x="245" y="185">0° start</text><text x="185" y="50">90°</text><text x="185" y="130">120°</text><text x="113" y="230">vertex</text>
      </svg>
      <p>120° opens wider than a right angle. Start at the 0° on your first ray.</p>
    </div>
  );
  if (pack.id === "polygon-classification-pack") return (
    <div className="math-model-polygons" aria-label="Nested quadrilateral family map">
      <section><span>QUADRILATERALS</span><section><span>TRAPEZOIDS · AT LEAST 1 PARALLEL PAIR</span><section><span>PARALLELOGRAMS</span><div><b>RECTANGLES</b><b>RHOMBI</b><em>SQUARES</em></div></section></section></section>
    </div>
  );
  if (pack.id === "formula-perimeter-pack") return (
    <div className="math-dimensioned-shape">
      <svg viewBox="0 0 420 330" role="img" aria-label="An L-shape made by removing a four by three centimetre corner from the upper right of a ten by eight centimetre rectangle. The six boundary lengths clockwise are six, three, four, five, ten and eight centimetres.">
        <title>Trace all six outside edges, including the two edges of the cut.</title>
        <path className="math-shape-fill" d="M65 45H245V135H365V285H65Z"/>
        <path className="math-shape-guide" d="M245 45H365V135"/>
        <text x="150" y="30">6 cm</text><text x="190" y="98">3 cm</text><text x="283" y="122">4 cm</text><text x="370" y="215">5 cm</text><text x="180" y="318">10 cm</text><text x="8" y="170">8 cm</text>
      </svg>
      <p><b>Perimeter:</b> 6 + 3 + 4 + 5 + 10 + 8 = 36 cm</p>
      <p><b>Area:</b> 10 × 8 − 4 × 3 = 68 cm²</p>
    </div>
  );
  if (pack.id === "area-recompose-pack") return (
    <div className="math-area-models">
      <article><h4>Move the corner to make a rectangle.</h4><svg viewBox="0 0 400 210" role="img" aria-label="A parallelogram cut vertically at its top-left vertex. Moving the left triangle to the right forms a rectangle with the same base and perpendicular height."><path className="math-shape-fill" d="M25 155L75 35H315L265 155Z"/><path className="math-shape-guide" d="M75 35V155H315V35"/><path className="math-shape-copy" d="M265 155L315 35V155Z"/><path className="math-shape-guide" d="M75 140H90V155"/><text x="110" y="193">Area = base × height</text></svg><p>Cut the left triangle along the height. Slide it to the dashed space on the right. No area is added or lost.</p></article>
      <article><h4>Two matching triangles make a parallelogram.</h4><svg viewBox="0 0 400 210" role="img" aria-label="Two congruent triangles join along a diagonal to form a parallelogram. Each triangle has half its area."><path className="math-shape-fill" d="M25 155L95 35L285 155Z"/><path className="math-shape-copy" d="M95 35H355L285 155Z"/><path className="math-shape-guide" d="M95 35V155M95 140H110V155"/><text x="90" y="193">Area = base × height ÷ 2</text></svg><p>Both triangles have the same area. Find the parallelogram's area, then divide by 2.</p></article>
      <article><h4>Two matching trapezoids make a parallelogram.</h4><svg viewBox="0 0 400 220" role="img" aria-label="Two congruent trapezoids, one turned half a turn, form a parallelogram. Its base is the sum of a trapezoid's parallel sides, a plus b."><path className="math-shape-fill" d="M15 155L55 35H175L215 155Z"/><path className="math-shape-copy" d="M175 35H375L335 155H215Z"/><path className="math-shape-guide" d="M55 35V155M55 140H70V155"/><text x="108" y="25">b</text><text x="110" y="179">a</text><text x="270" y="179">b</text><text x="50" y="213">Area = (a + b) × height ÷ 2</text></svg><p>Add the two parallel sides, a and b. Multiply by the perpendicular height. Divide by 2 for one trapezoid.</p></article>
    </div>
  );
  if (pack.id === "volume-capacity-pack") return (
    <div className="math-model-volume" aria-label="Rectangular prism as fifteen cubes per layer times four layers">
      <div>{Array.from({ length: 15 }, (_, index) => <i key={index} />)}</div><span>× 4 LAYERS</span><b>= 60 cm³</b><p>5 × 3 cubes per layer × 4 layers</p>
    </div>
  );
  return <div className="math-model-generic" role="img" aria-label="Build, label, test, and explain the mathematical model"><span>BUILD</span><i>→</i><span>LABEL</span><i>→</i><span>TEST</span><i>→</i><span>EXPLAIN</span></div>;
}

function PackHeader({ pack }: { pack: MathSupportPack }) {
  return <header className="math-pack-heading"><div><p>{pack.role} · {pack.timing.toUpperCase()}</p><h3>{pack.title}</h3><span>{pack.blocks} · {pack.mathUpTopics.join(" · ")}</span></div><button type="button" onClick={(event) => printClosest(event.currentTarget, ".math-teaching-pack")}>Print teacher pack + answers</button></header>;
}

function TeacherMathPack({ pack }: { pack: MathSupportPack }) {
  const [level, setLevel] = useState<ReadinessLevel>(pack.readinessLevel);
  return (
    <article className="math-teaching-pack">
      <PackHeader pack={pack} />
      <div className="math-readiness-choice" role="group" aria-label={`Readiness route for ${pack.title}`}>
        {(Object.keys(levelCopy) as ReadinessLevel[]).map(item => <button type="button" key={item} className={level === item ? "selected" : ""} aria-pressed={level === item} onClick={() => setLevel(item)}><b>{levelCopy[item].label}</b><small>{levelCopy[item].time}</small><span>{levelCopy[item].description}</span></button>)}
      </div>
      <section className="math-pack-purpose"><div><small>LEARNING GOAL</small><p>{pack.learningGoal}</p></div><div><small>WHY BEFORE THE PROJECT</small><p>{pack.whyBefore}</p></div><div><small>PREREQUISITE</small><p>{pack.prerequisite}</p></div></section>
      {level !== "review" && <><section className="math-pack-model"><header><span>{pack.model.label}</span><h4>{pack.model.prompt}</h4></header><MathModelVisual pack={pack} /><ol>{pack.model.steps.map(step => <li key={step}>{step}</li>)}</ol><p><b>WHAT IT SHOWS:</b> {pack.model.conclusion}</p></section>
      <div className="math-pack-logistics"><section><b>SUPPLIED ON THIS PAGE</b>{pack.supplied.map(item => <span key={item}>✓ {item}</span>)}</section><section><b>GATHER</b>{pack.gather.map(item => <span key={item}>○ {item}</span>)}</section><section><b>RESOURCE SLOTS</b><span>Explanation choice: matching Math Antics video, this Hub model, or both</span><span>MathUP check / games: {pack.mathUpTopics.join(" · ")}</span><span>Optional: teacher-owned practice or organizer</span><em>The on-page investigation remains usable with one projector and ordinary classroom materials.</em></section></div></>}
      {level === "full" && <><section className="math-pack-flow"><div><small>TEACH EXPLICITLY</small>{pack.teacherMoves.map((move, index) => <p key={move}><b>{index + 1}</b>{move}</p>)}</div><div><small>STUDENTS THEN</small>{pack.studentMoves.map((move, index) => <p key={move}><b>{index + 1}</b>{move}</p>)}</div></section><section className="math-partner-cards"><header><span>PROJECT OR PRINT · PARTNER / GROUP CARDS</span><strong>Answer key stays visible in Teacher mode.</strong></header><div>{pack.partnerCards.map(card => <article key={card.title}><b>{card.title}</b><p>{card.body}</p><small><strong>ANSWER:</strong> {card.answer}</small></article>)}</div></section></>}
      <section className="math-independent-check"><header><span>{level === "review" ? "START HERE · RETEACH ONLY WHAT IS MISSED" : "INDEPENDENT CHECK"}</span><strong>{pack.check.length} items · answers included</strong></header><div>{pack.check.map((item, index) => <article key={item.prompt}><b>{index + 1}</b><p>{item.prompt}</p><small>{item.answer}</small></article>)}</div></section>
      <footer className="math-pack-routes"><section><b>IF STUDENTS NEED MORE SUPPORT</b><p>{pack.supportRoute}</p></section><section><b>IF READY FOR MORE</b><p>{pack.extensionRoute}</p></section><section><b>LIKELY MISCONCEPTIONS</b><p>{pack.likelyMisconceptions.join(" · ")}</p></section><section><b>SPACES EDU</b><p>{pack.spaces}</p></section></footer>
    </article>
  );
}

export function MathTeacherWorkshops({ experienceId, placement = "before" }: { experienceId: string; placement?: "before" | "extension" }) {
  const packs = mathPacksFor(experienceId);
  if (!packs.length) return null;
  const hasCoreAndBridge = packs.some(pack => pack.role === "BC CORE") && packs.some(pack => pack.role === "MATHUP / WNCP BRIDGE");
  return (
    <section className="math-workshop-stack teacher-math-workshops">
      <header><div><p>{hasCoreAndBridge ? "B.C. CORE FIRST · OPTIONAL BRIDGE LAST" : placement === "extension" ? "OPEN AFTER THE REQUIRED CORE" : "TEACH, CHECK, THEN APPLY"}</p><h2>{hasCoreAndBridge ? "The complete first-quadrant lesson comes before the optional four-quadrant bridge." : packs.length === 1 ? "Background lesson and practice" : `${packs.length} background lessons are available.`}</h2><span>Choose Math Antics supported, hybrid, or teacher-led replacement. In every mode, the Hub model, guided practice, authentic task, and independent check remain available.</span></div><b>{packs.length} TEACHING PACK{packs.length === 1 ? "" : "S"}</b></header>
      <MathDeliveryModePanel experienceId={experienceId} />
      {packs.map(pack => <TeacherMathPack key={pack.id} pack={pack} />)}
    </section>
  );
}

function StudentMathPack({ pack }: { pack: MathSupportPack }) {
  const [stage, setStage] = useState<"example" | "practice" | "check">("example");
  const [step, setStep] = useState(0);
  const [card, setCard] = useState(0);
  const [check, setCheck] = useState(0);
  const stages = [{ id: "example", label: "1 · See an example" }, { id: "practice", label: "2 · Try together" }, { id: "check", label: "3 · Try on your own" }] as const;
  return (
    <article className="student-math-workshop-pack" data-stage={stage} data-model-step={step}>
      <header className="student-math-print-heading"><h3>{pack.title}</h3><button className="student-math-print" type="button" onClick={(event) => printClosest(event.currentTarget, ".student-math-workshop-pack")}>Print student workshop</button></header>
      <div className="student-math-workshop-body">
        <section className="student-math-goal"><small>WE ARE LEARNING TO</small><p>{pack.learningGoal}</p></section>
        <nav className="math-workshop-stages" aria-label={`${pack.shortTitle}: lesson steps`}>{stages.map(item => <button key={item.id} type="button" aria-pressed={stage === item.id} onClick={() => setStage(item.id)}>{item.label}</button>)}</nav>
        <section className="math-pack-model math-workshop-panel" data-panel="example" aria-label="Worked example">
          <header><span>WORKED EXAMPLE</span><h4>{pack.model.prompt}</h4></header>
          <MathModelVisual pack={pack} step={step} />
          <ol className="math-model-steps">{pack.model.steps.map((text, index) => <li key={text} data-current={index === step} value={index + 1}>{text}</li>)}</ol>
          <nav className="math-workshop-controls" aria-label="Example steps"><button type="button" disabled={step === 0} onClick={() => setStep(value => value - 1)}>Previous step</button><span>Step {step + 1} of {pack.model.steps.length}</span><button type="button" disabled={step === pack.model.steps.length - 1} onClick={() => setStep(value => value + 1)}>Next step</button></nav>
          <p className="math-model-conclusion" data-visible={step === pack.model.steps.length - 1}><b>WHAT WE FOUND:</b> {pack.model.conclusion}</p>
        </section>
        <section className="math-partner-cards math-workshop-panel" data-panel="practice" aria-label="Partner practice"><header><span>TRY TOGETHER</span><strong>Draw or write your method. Explain it to your partner.</strong></header><div>{pack.partnerCards.map((item, index) => <article key={item.title} data-current={index === card}><b>{item.title}</b><p>{item.body}</p></article>)}</div><nav className="math-workshop-controls" aria-label="Practice questions"><button type="button" disabled={card === 0} onClick={() => setCard(value => value - 1)}>Previous question</button><span>Question {card + 1} of {pack.partnerCards.length}</span><button type="button" disabled={card === pack.partnerCards.length - 1} onClick={() => setCard(value => value + 1)}>Next question</button></nav></section>
        <section className="math-independent-check student-math-check math-workshop-panel" data-panel="check" aria-label="Independent check"><header><span>TRY ON YOUR OWN</span><strong>Show your thinking. Your teacher will check it with you.</strong></header><div>{pack.check.map((item, index) => <article key={item.prompt} data-current={index === check}><b>{index + 1}</b><p>{item.prompt}</p></article>)}</div><nav className="math-workshop-controls" aria-label="Check questions"><button type="button" disabled={check === 0} onClick={() => setCheck(value => value - 1)}>Previous question</button><span>Question {check + 1} of {pack.check.length}</span><button type="button" disabled={check === pack.check.length - 1} onClick={() => setCheck(value => value + 1)}>Next question</button></nav></section>
        <details className="math-workshop-help"><summary>Need a word or a hint?</summary><section className="student-math-words"><div>{pack.vocabulary.map(word => <article key={word.term}><b>{word.term}</b><p>{word.meaning}</p><small>{word.example}</small></article>)}</div></section><p>{pack.supportRoute}</p></details>
      </div>
    </article>
  );
}

export function MathStudentWorkshops({ experienceId, placement = "before" }: { experienceId: string; placement?: MathStudentWorkshopPlacement }) {
  const packs = mathStudentPacksFor(experienceId, placement);
  if (!packs.length) return null;
  return (
    <section className="student-math-workshops">
      <header><span>{placement === "extension" ? "OPTIONAL CHALLENGE" : "MATH WORKSHOP"}</span><h2>{placement === "extension" ? "Try coordinates on both sides of zero." : "See it. Try it. Explain it."}</h2><p>{placement === "extension" ? "Start here after your teacher checks your first-quadrant work." : "Use paper or a whiteboard. Start with the example, then try a question together."}</p></header>
      {packs.map((pack, packIndex) => (
        <details key={pack.id} open={packIndex === 0}>
          <summary><span><strong>{pack.title}</strong></span><b>Open / close ▾</b></summary>
          <StudentMathPack key={pack.id} pack={pack} />
        </details>
      ))}
    </section>
  );
}

export function MathYearImplementation({ program }: { program: LearningProgram }) {
  const nameFor = (id: string) => program.experiences.find(experience => experience.id === id)?.title ?? mathSupportPacks.find(pack => pack.id === id)?.shortTitle ?? id;
  return (
    <section className="math-year-implementation">
      <header><div><p>TEACHING CALENDAR · FLEXIBLE 40–55 MINUTE BLOCKS</p><h2>Clear visual explanation. Shared investigation. Practice when it helps.</h2><span>Choose a Math Antics-supported, hybrid, or teacher-led Hub model, let the Classroom OS carry the class investigation, and open MathUP when a game, check, or extra practice would help.</span></div><a href="https://curriculum.gov.bc.ca/curriculum/mathematics/6/core" target="_blank" rel="noreferrer">B.C. Mathematics 6 ↗</a></header>
      <section className="math-fluency-rhythm"><header><span>RECURRING FLUENCY · THREE SHORT OPENERS/WEEK</span><strong>Accurate · flexible · efficient · no public speed ranking</strong></header><div>{mathFluencyRhythm.map(item => <article key={item.day}><b>{item.day}</b><div><strong>{item.title}</strong><small>{item.minutes}</small><p>{item.detail}</p></div></article>)}</div></section>
      <div className="math-calendar-list">{mathYearSequence.map((item, index) => <article key={`${item.timing}-${item.focus}`}><span>{String(index + 1).padStart(2, "0")}</span><header><small>{item.timing} · {item.blocks}</small><h3>{item.focus}</h3><div>{item.mathUpTopics.map(topic => <b key={topic}>{topic}</b>)}</div></header><section><p><strong>TEACH / APPLY:</strong> {item.lessonIds.map(nameFor).join(" → ")}</p><p><strong>FLUENCY:</strong> {item.fluency}</p><p><strong>FORMATIVE CHECK:</strong> {item.check}</p><small>{item.spaces}</small></section></article>)}</div>
      <aside className="math-paired-topics"><header><span>DO NOT DOUBLE-COUNT THESE</span><strong>Two MathUP labels; one coherent learning sequence.</strong></header>{pairedMathUpTopics.map(pair => <p key={pair.primary}><b>{pair.primary}</b><i>+</i><b>{pair.companion}</b><span>{pair.note}</span></p>)}</aside>
    </section>
  );
}
