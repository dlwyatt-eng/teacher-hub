"use client";

import { useState } from "react";
import { mathFluencyRhythm, mathPacksFor, mathSupportPacks, mathYearSequence, pairedMathUpTopics, type MathSupportPack } from "./math-program-supports";
import { MathDeliveryModePanel } from "./math-delivery-mode-panel";
import type { LearningProgram, ReadinessLevel } from "./program-types";
import { printClosest } from "./print-support";

const levelCopy: Record<ReadinessLevel, { label: string; time: string; description: string }> = {
  full: { label: "Full background lesson", time: "40–55 MIN", description: "Teach the model, guided practice, partner task, and independent check." },
  quick: { label: "Quick readiness check", time: "8–15 MIN", description: "Use when a Math Antics explanation or another recent lesson made the idea clear." },
  review: { label: "Already taught / review", time: "3–6 MIN", description: "Start with the check; reteach only the missed idea." },
};

function MathModelVisual({ pack }: { pack: MathSupportPack }) {
  if (pack.id === "magnitude-place-value-pack") return (
    <div className="math-model-magnitude">
      <svg viewBox="0 0 640 205" role="img" aria-label="The number zero point zero zero eight shown on three number lines: very close to zero on a zero-to-one line, eight percent across a zero-to-zero-point-one line, and eighty percent across a zero-to-zero-point-zero-one line">
        <title>The value 0.008 stays fixed while its visible position changes with the scale.</title>
        <g><text x="18" y="28">0 to 1</text><path d="M110 24H600"/><circle cx="114" cy="24" r="7"/><text className="marker-label" x="125" y="30">0.008 · 0.8% across</text><text x="104" y="49">0</text><text x="590" y="49">1</text></g>
        <g><text x="18" y="94">0 to 0.1</text><path d="M110 90H600"/><circle cx="149" cy="90" r="7"/><text className="marker-label" x="162" y="96">0.008 · 8% across</text><text x="104" y="115">0</text><text x="578" y="115">0.1</text></g>
        <g><text x="18" y="160">0 to 0.01</text><path d="M110 156H600"/><circle cx="502" cy="156" r="7"/><text className="marker-label" x="390" y="146">0.008 · 80% across</text><text x="104" y="181">0</text><text x="568" y="181">0.01</text></g>
      </svg>
      <p><b>SAME VALUE</b><span>0.008 = eight thousandths</span><small>Read the endpoints. Divide the interval. Then place the number.</small></p>
    </div>
  );
  if (pack.id === "factors-multiples-pack") return (
    <div className="math-model-factors" role="img" aria-label="A packing model uses the greatest common factor of twenty-four and thirty-six to make twelve packs, while timelines show twenty-four and thirty-six first meeting at seventy-two">
      <section><small>FIXED SUPPLIES · GCF</small><div>{Array.from({ length: 12 }, (_, index) => <i key={index}><b>2</b><b>3</b></i>)}</div><p><strong>24 ÷ 12 = 2</strong><strong>36 ÷ 12 = 3</strong></p><em>12 greatest identical packs</em></section>
      <section><small>REPEATING CYCLES · LCM</small><div className="math-cycle-row"><b>24</b><span>24</span><span>48</span><mark>72</mark></div><div className="math-cycle-row"><b>36</b><span>36</span><mark>72</mark></div><em>72 is the first shared meeting</em></section>
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
        <defs><pattern id="transformation-grid" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M18 0H0V18"/></pattern></defs>
        {[25, 275, 525].map((x, index) => <g key={x}><rect x={x} y="74" width="162" height="144"/><path className="axes" d={`M${x} 74V218H${x + 162}`}/><text x={x} y="239">{index === 0 ? "START" : index === 1 ? "1 · TRANSLATE (3, 1)" : "2 · REFLECT ACROSS x=6"}</text></g>)}
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
    <div className="math-model-percent" aria-label="Twenty-five shaded squares out of one hundred connected to one quarter and zero point two five">
      <div>{Array.from({ length: 100 }, (_, index) => <i key={index} className={index < 25 ? "filled" : ""} />)}</div>
      <p><b>25%</b><span>=</span><b>25/100</b><span>=</span><b>1/4</b><span>=</span><b>0.25</b></p>
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
      <svg viewBox="0 0 600 220" role="img" aria-label="Reference angles and triangle classification">
        <g transform="translate(70 165)"><path d="M0 0H125 M0 0L90-90"/><path className="arc" d="M43 0A43 43 0 0 0 30-30"/><text x="42" y="-15">45°</text></g>
        <g transform="translate(260 165)"><path d="M0 0H125 M0 0V-125"/><path className="arc" d="M43 0A43 43 0 0 0 0-43"/><text x="22" y="-22">90°</text></g>
        <g transform="translate(470 170)"><path d="M-80 0L0-125L80 0Z"/><text x="-35" y="30">isosceles</text></g>
      </svg>
    </div>
  );
  if (pack.id === "polygon-classification-pack") return (
    <div className="math-model-polygons" aria-label="Nested quadrilateral family map">
      <section><span>QUADRILATERALS</span><section><span>TRAPEZOIDS · AT LEAST 1 PARALLEL PAIR</span><section><span>PARALLELOGRAMS</span><div><b>RECTANGLES</b><b>RHOMBI</b><em>SQUARES</em></div></section></section></section>
    </div>
  );
  if (pack.id === "formula-perimeter-pack") return (
    <div className="math-model-formula" aria-label="Eight by three rectangle showing perimeter and area">
      <div>{Array.from({ length: 24 }, (_, index) => <i key={index} />)}</div>
      <p><span>AROUND</span><b>P = 8 + 3 + 8 + 3 = 22 cm</b></p><p><span>COVER</span><b>A = 8 × 3 = 24 cm²</b></p>
    </div>
  );
  if (pack.id === "area-recompose-pack") return (
    <div className="math-model-area">
      <svg viewBox="0 0 720 250" role="img" aria-label="Parallelogram, triangle pair, and trapezoid pair used to derive area formulas">
        <g transform="translate(25 25)"><path d="M45 155L95 15H250L200 155Z"/><path className="height" d="M95 15V155"/><text x="110" y="190">A = b × h</text></g>
        <g transform="translate(290 25)"><path d="M0 155L115 15L230 155Z"/><path className="copy" d="M0 155L115 15L230 155L115 155Z"/><text x="45" y="190">A = b × h ÷ 2</text></g>
        <g transform="translate(540 25)"><path d="M0 155L45 15H145L205 155Z"/><path className="copy" d="M0 155L45 15H145L205 155L160 15H60Z"/><text x="0" y="190">A = (a + b) × h ÷ 2</text></g>
      </svg>
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
  return <header className="math-pack-heading"><div><p>{pack.role} · {pack.timing.toUpperCase()}</p><h3>{pack.title}</h3><span>{pack.blocks} · {pack.mathUpTopics.join(" · ")}</span></div><button type="button" onClick={(event) => printClosest(event.currentTarget, ".math-teaching-pack")}>Print pack</button></header>;
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
      <div className="math-pack-logistics"><section><b>SUPPLIED ON THIS PAGE</b>{pack.supplied.map(item => <span key={item}>✓ {item}</span>)}</section><section><b>GATHER</b>{pack.gather.map(item => <span key={item}>○ {item}</span>)}</section><section><b>RESOURCE SLOTS</b><span>Main explanation: matching Math Antics video</span><span>MathUP check / games: {pack.mathUpTopics.join(" · ")}</span><span>Optional: teacher-owned practice or organizer</span><em>The on-page investigation remains usable with one projector and ordinary classroom materials.</em></section></div></>}
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
      <header><div><p>{hasCoreAndBridge ? "B.C. CORE FIRST · OPTIONAL BRIDGE LAST" : placement === "extension" ? "OPEN AFTER THE REQUIRED CORE" : "TEACH, CHECK, THEN APPLY"}</p><h2>{hasCoreAndBridge ? "The complete first-quadrant lesson comes before the optional four-quadrant bridge." : packs.length === 1 ? "One complete background lesson is ready." : `${packs.length} background lessons are sequenced here.`}</h2><span>Choose Math Antics supported, hybrid, or teacher-led replacement. In every mode, the Hub model, guided practice, authentic task, and independent check remain available.</span></div><b>{packs.length} READY-TO-PROJECT + PRINT PACK{packs.length === 1 ? "" : "S"}</b></header>
      <MathDeliveryModePanel experienceId={experienceId} />
      {packs.map(pack => <TeacherMathPack key={pack.id} pack={pack} />)}
    </section>
  );
}

export function MathStudentWorkshops({ experienceId, placement = "before" }: { experienceId: string; placement?: "before" | "extension" }) {
  const packs = mathPacksFor(experienceId).filter(pack => placement !== "extension" || pack.role === "MATHUP / WNCP BRIDGE");
  if (!packs.length) return null;
  return (
    <section className="student-math-workshops">
      <header><span>{placement === "extension" ? "OPTIONAL · AFTER THE FIRST-QUADRANT WORK" : "LEARN THESE IDEAS FIRST"}</span><h2>{placement === "extension" ? "Open this bridge only when your teacher chooses the four-quadrant challenge." : "Open the workshop your teacher chooses."}</h2><p>{placement === "extension" ? "The required Grade 6 evidence is already complete. This picture, worked example, and practice extend the coordinate grid across zero." : "Your teacher may use a short Math Antics explanation, teach directly from this Hub model, or combine both. The picture, worked example, partner task, and support route work without the video."}</p></header>
      {packs.map((pack, packIndex) => <details key={pack.id} open={packIndex === 0}><summary><span><small>{pack.role} · {pack.blocks}</small><strong>{pack.title}</strong></span><b>Open workshop ▾</b></summary><div className="student-math-workshop-body"><section className="student-math-goal"><small>WE ARE LEARNING TO</small><p>{pack.learningGoal}</p></section><section className="math-pack-model"><header><span>{pack.model.label}</span><h4>{pack.model.prompt}</h4></header><MathModelVisual pack={pack} /><ol>{pack.model.steps.map(step => <li key={step}>{step}</li>)}</ol><p><b>WHAT IT SHOWS:</b> {pack.model.conclusion}</p></section><section className="student-math-words"><span>WORD HELP</span><div>{pack.vocabulary.map(word => <article key={word.term}><b>{word.term}</b><p>{word.meaning}</p><small>Example: {word.example}</small></article>)}</div></section><section className="math-partner-cards"><header><span>PARTNER / GROUP CARDS</span><strong>Show your method before asking for an answer check.</strong></header><div>{pack.partnerCards.map(card => <article key={card.title}><b>{card.title}</b><p>{card.body}</p></article>)}</div></section><footer><b>IF YOU NEED A SMALLER FIRST STEP</b><p>{pack.supportRoute}</p></footer></div></details>)}
    </section>
  );
}

export function MathYearImplementation({ program }: { program: LearningProgram }) {
  const nameFor = (id: string) => program.experiences.find(experience => experience.id === id)?.title ?? mathSupportPacks.find(pack => pack.id === id)?.shortTitle ?? id;
  return (
    <section className="math-year-implementation">
      <header><div><p>TEACHING CALENDAR · FLEXIBLE 40–55 MINUTE BLOCKS</p><h2>Clear visual explanation. Shared investigation. Practice when it helps.</h2><span>Use Math Antics to make the first model visible, let the Classroom OS carry the class investigation, and open MathUP when a game, check, or extra practice would help.</span></div><a href="https://curriculum.gov.bc.ca/curriculum/mathematics/6/core" target="_blank" rel="noreferrer">B.C. Mathematics 6 ↗</a></header>
      <section className="math-fluency-rhythm"><header><span>RECURRING FLUENCY · THREE SHORT OPENERS/WEEK</span><strong>Accurate · flexible · efficient · no public speed ranking</strong></header><div>{mathFluencyRhythm.map(item => <article key={item.day}><b>{item.day}</b><div><strong>{item.title}</strong><small>{item.minutes}</small><p>{item.detail}</p></div></article>)}</div></section>
      <div className="math-calendar-list">{mathYearSequence.map((item, index) => <article key={`${item.timing}-${item.focus}`}><span>{String(index + 1).padStart(2, "0")}</span><header><small>{item.timing} · {item.blocks}</small><h3>{item.focus}</h3><div>{item.mathUpTopics.map(topic => <b key={topic}>{topic}</b>)}</div></header><section><p><strong>TEACH / APPLY:</strong> {item.lessonIds.map(nameFor).join(" → ")}</p><p><strong>FLUENCY:</strong> {item.fluency}</p><p><strong>FORMATIVE CHECK:</strong> {item.check}</p><small>{item.spaces}</small></section></article>)}</div>
      <aside className="math-paired-topics"><header><span>DO NOT DOUBLE-COUNT THESE</span><strong>Two MathUP labels; one coherent learning sequence.</strong></header>{pairedMathUpTopics.map(pair => <p key={pair.primary}><b>{pair.primary}</b><i>+</i><b>{pair.companion}</b><span>{pair.note}</span></p>)}</aside>
    </section>
  );
}
