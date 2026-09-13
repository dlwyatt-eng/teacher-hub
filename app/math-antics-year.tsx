"use client";

import { mathAnticsCatalogue as catalogue } from "./math-antics-catalogue";
import { printClosest } from "./print-support";

type Slug = keyof typeof catalogue;
type Plan = { core: Slug[]; support?: Slug[]; before: string; pause: string; paper: string; bridge: string; preview: string };
/** Keys are existing workshop IDs, so changes in calendar order cannot mispair resources. */
export const mathAnticsPlans: Record<string, Plan> = {
  "magnitude-place-value-pack": {
    core: ["place-value", "decimal-place-value", "number-line"], support: ["rounding"],
    before: "What is the 8 worth in 0.8, 0.08 and 0.008?",
    pause: "Before a digit's value or a point's position is revealed, predict it and explain the scale.",
    paper: "Draw a place-value chart. Write the three numbers, then place 0.008 on a line from 0 to 0.01 split into ten equal intervals. Label the interval size.",
    bridge: "Use the Hub's three-scale model and billions chart. Collect one labelled number line and explanation.",
    preview: "Choose the relevant place-value or equal-interval explanation. Include thousandths and extend to billions with the Hub model."
  },
  "operations-fluency-pack": {
    core: ["multi-digit-multiplication-pt2", "division-partial-quotients"], support: ["long-division"],
    before: "About how large is 23 × 16? How could multiplication check 936 ÷ 24?",
    pause: "Before the next partial product or partial quotient, predict the easier calculation and name what it counts.",
    paper: "After the teacher models 23 × 16 and 936 ÷ 24, solve 864 ÷ 24 with a partner. Independently solve 735 ÷ 21. Show an estimate and a multiplication check.",
    bridge: "Use the existing full operations workshop. Keep both strategies available; choose extra practice from the exit check.",
    preview: "Choose one worked example per lesson. Connect each written step to groups or place value. Long division is an alternative method."
  },
  "factors-multiples-pack": {
    core: ["factoring", "prime-factorization", "order-of-operations"],
    before: "How many identical kits can use all 24 pencils and 36 stickers, with no leftovers?",
    pause: "Before a factor pair or prime factor is revealed, predict it. In the order lesson, choose the next operation before calculating.",
    paper: "List factors of 24 and 36 to find the greatest number of identical kits. Then list multiples of 4 and 6 to find when two signals next flash together. Explain why the two problems need different lists.",
    bridge: "Teach GCF and LCM explicitly with the Hub's kits and timelines. Use the separate bracket-tile lesson for operation order.",
    preview: "Choose factor pairs, prime factorization or bracket order to match today's goal. Core order questions exclude exponents; the bonus card below introduces them separately."
  },
  "fraction-ratio-percent-pack": {
    core: ["fractions-on-the-number-line", "comparing-fractions", "intro-to-mixed-numbers", "ratios-and-rates"],
    before: "Where would 7/4 go on a line from 0 to 2? What does 2 red to 3 blue tell us?",
    pause: "Before a fraction is placed or a batch is enlarged, draw your prediction with equal parts or repeated whole batches.",
    paper: "Draw 7/4, rename it as a mixed number, and compare it with 3/2. In a later ratio lesson, draw 2:3 and 4:6 colour batches and explain what stayed the same.",
    bridge: "Use fraction strips and ratio tables from the Hub. Keep the whole the same size and distinguish part-to-part from part-to-whole.",
    preview: "Spread these choices across the unit. Focus on fraction size, mixed numbers and equivalent ratios; do not add a full fraction-arithmetic unit."
  },
  "decimal-operations-pack": {
    core: ["decimal-arithmetic", "what-are-percentages", "finding-a-percent-of-a-number"],
    before: "Estimate 2.4 × 3. What is one quarter of $48? Is that the discount or the final price?",
    pause: "Before an exact answer, predict a reasonable range. Before a percent calculation, identify the whole.",
    paper: "Model and calculate 2.4 × 3 and 7.2 ÷ 9. In the later sale lesson, show the discount and final price for 25% off $48 using a sketch and labels.",
    bridge: "Use the decimal workshop and fictional Sale Lab offers. Collect one estimate, model and explained decision, without asking about family finances.",
    preview: "Choose decimal multiplication or division first. Later choose a percent model and one missing-part example; keep discount and price separate."
  },
  "pattern-relations-pack": {
    core: ["number-patterns", "solving-basic-equations-1"],
    before: "A pattern has 3, 5, 7 tiles. What changes? How could both sides of a balance stay equal?",
    pause: "Before the next pattern step or equation move, predict it and explain why it works.",
    paper: "Build and draw four stages of a growing pattern. Make a stage-number table and rule. In the equation lesson, solve x + 5 = 11 and 3x = 12; substitute to check.",
    bridge: "The Hub adds decreasing patterns, expressions and first-quadrant discrete graphs. Use balance models for one-step equations.",
    preview: "Select the matching pattern or one-step balance example. Do not make two-step equations or continuous-function notation a prerequisite."
  },
  "collect-summarize-data-pack": {
    core: ["data-and-graphs"],
    before: "What must a graph tell us so we can read it fairly?",
    pause: "When a scale appears, name the value of one interval and predict how a different scale would change its appearance.",
    paper: "Use fictional plant heights of 2, 4, 5 and 8 cm at weeks 1–4. Make a labelled line graph, write one supported claim and one question the graph cannot answer.",
    bridge: "Use the Hub's collection and graphing lessons to teach line graphs explicitly; later reuse suitable Science data.",
    preview: "Choose axes, scale or graph interpretation. The general video does not replace creating and interpreting a line graph."
  },
  "single-outcome-probability-pack": {
    core: ["basic-probability"],
    before: "A fair die has six outcomes. Must a six appear exactly five times in 30 rolls?",
    pause: "Before the probability or trial result is shown, list possible outcomes and make a prediction.",
    paper: "List a die's outcomes, predict the fraction that are sixes, then tally 30 rolls with a partner. Compare your result with the prediction and the pooled class results.",
    bridge: "Use the supplied game-audit lesson. Collect a prediction, tally and explanation of why a short experiment can differ.",
    preview: "Choose one single-outcome example with equally likely outcomes. Teach theoretical and experimental probability together through the paper trial."
  },
  "angle-triangle-pack": {
    core: ["angles-and-degrees", "triangles"], support: ["angle-basics"],
    before: "Is this opening smaller or larger than 90°? Can a triangle belong to both a side group and an angle group?",
    pause: "Before measuring or classifying, estimate from a square corner and identify the feature you are using.",
    paper: "Construct 45°, 90° and 120° angles with a protractor. Draw an isosceles right triangle; label the equal sides and right angle.",
    bridge: "Use the Hub's construction task and classification check. Rotate examples so orientation does not become a false rule.",
    preview: "Choose measuring degrees or triangle classification for today's lesson; use Angle Basics only if vocabulary needs review."
  },
  "polygon-classification-pack": {
    core: ["polygons", "perimeter", "area"],
    before: "Would fencing a space and covering its floor require the same measurement?",
    pause: "Before a formula, trace the boundary or count the inside squares and explain the units.",
    paper: "Draw a 10 cm by 8 cm rectangle and remove a 4 cm by 3 cm corner. Label every remaining edge; find its perimeter and area with units and a sketch of your method.",
    bridge: "Use the Hub's cut-and-recompose models for triangles, parallelograms and trapezoids. Apply these to the existing Zoo design.",
    preview: "Choose one geometry idea at a time. The general Area video is support; the Hub must still derive the required non-rectangular area rules."
  },
  "volume-capacity-pack": {
    core: ["volume"], support: ["intro-to-the-metric-system"],
    before: "How many cubes are in one layer? What is different about how much a container holds?",
    pause: "Before the total volume, count cubes in one layer and predict the number of layers.",
    paper: "Sketch a 4 × 3 × 2 cube structure, showing its layers. Label the volume in cubic units. Choose an empty container and estimate its capacity in mL; measure with water if practical.",
    bridge: "Use the supplied capacity lesson to connect mL, L and cm³. Add a useful calculation to the existing design rather than starting another project.",
    preview: "Select cubes and layers. Preview the metric review only if units are unfamiliar; it does not replace hands-on capacity comparison."
  },
  "first-quadrant-transformations-pack": {
    core: ["graphing-on-the-coordinate-plane"], support: ["negative-numbers"],
    before: "In (2, 3), which number tells us to move across first?",
    pause: "Before a point is plotted, mark your own prediction. Discuss the signs only when introducing the bonus route.",
    paper: "Plot A(1,1), B(3,1), C(1,2). Translate the triangle 2 right and 1 up, then reflect that image across x = 4. Label both images and describe the two moves.",
    bridge: "Use the complete first-quadrant workshop for the core check. The four-quadrant bonus below builds on it and remains available to interested early finishers.",
    preview: "For core teaching, choose positive ordered pairs. Use the negative-coordinate explanation separately with the optional four-quadrant challenge."
  },
  "space-under-constraints": {
    core: ["area", "volume"],
    before: "Which measurement would help you improve your existing design?",
    pause: "Before choosing a rule, identify exactly what needs measuring and which units fit.",
    paper: "Choose one part of your existing design. Show its dimensions and calculation, revise it to meet a constraint, and explain what changed.",
    bridge: "Revisit only the resource a student needs. Use this studio when it replaces another design or supports the existing showcase, not as an extra compulsory June project.",
    preview: "Reuse a previously previewed area or volume example only when the work calls for it."
  }
};

const plans = mathAnticsPlans;

function ResourceLinks({ slugs, label }: { slugs: Slug[]; label: string }) {
  return <div className="math-year-links"><b>{label}</b><ol>{slugs.map(slug => <li key={slug}><a href={catalogue[slug].youtube} target="_blank" rel="noreferrer">{catalogue[slug].title} · YouTube ↗</a>{" · "}<a href={catalogue[slug].url} target="_blank" rel="noreferrer">Lesson / member practice ↗</a></li>)}</ol></div>;
}

export function MathAnticsQuickLinks({ lessonIds }: { lessonIds: string[] }) {
  const selected = [...new Set(lessonIds.flatMap(id => plans[id]?.core ?? []))];
  if (!selected.length) return null;
  return <section><h3>Math Antics · watch and print</h3><p>Open the lesson, then choose <strong>Worksheets</strong> or <strong>Exercises</strong> below the video. Sign in to Math Antics for member practice. Print the student file; answer files are separate. Links open in a new tab so your Hub lesson stays ready.</p><nav className="math-resource-launches" aria-label="Math Antics worksheet access">{selected.map(slug => <div key={slug}><strong>{catalogue[slug].title}</strong><a href={catalogue[slug].url} target="_blank" rel="noreferrer">Open worksheets &amp; lesson ↗</a><a href={catalogue[slug].youtube} target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>)}</nav>{selected.includes("place-value") && <p>Place Value: the six-page member worksheet PDF opened successfully. Page 2, Identifying Number Places – Set 1, offers digit-place practice. Use the chart through trillions too, as you have in previous years. Pages 3, 5 and 6 were also visually reviewed on September 13. Choose the digit-value or expanded-form practice that matches today’s goal.</p>}<p>Use the matching worksheets as regular practice alongside the Hub models, discussion and checks. Preview the pages you plan to assign. Member files remain on Math Antics.</p></section>;
}

export function MathAnticsYearPlan({ lessonIds }: { lessonIds: string[] }) {
  const plan = lessonIds.map(id => plans[id]).find(Boolean);
  if (!plan) return null;
  return <details className="math-year-media"><summary>Math Antics choices + paper activity</summary><div>
    <p>Choose one explanation when it helps. Suggested viewing budget: 3–5 minutes, then stop to model and practise. Exact start/stop points need teacher preview; these are not verified excerpts.</p>
    <ResourceLinks slugs={plan.core} label="Suggested order across this unit" />
    {plan.support && <ResourceLinks slugs={plan.support} label="Only if useful for support or an alternative method" />}
    <p><strong>Select during preview:</strong> {plan.preview}</p>
    <p><strong>Ask before viewing:</strong> {plan.before}</p>
    <p><strong>Pause and discuss:</strong> {plan.pause}</p>
    <p><strong>Paper activity / no-video route:</strong> {plan.paper}</p>
    <p><strong>Teach next / collect:</strong> {plan.bridge}</p>
    <p><strong>Practice selection:</strong> Use matching Math Antics sheets regularly alongside Hub practice. Choose pages for today’s goal and use the check to decide who needs support or a challenge. The place-value PDF and pages 1–2 have been checked; the remaining member pages still need review.</p>
  </div></details>;
}

export function MathAnticsYearIntro() {
  return <aside className="math-year-resource-note"><h3>Math Antics through the year</h3><p>Open a unit's resource choices below. One teacher screen, speakers and paper are enough; students do not need accounts or devices. Videos support the existing Hub models and activities.</p><p>Checked September 6, 2026: all 32 official lesson pages opened and their YouTube links were recorded. Member access and the place-value PDF were subsequently confirmed; pages 1–2 were visually inspected. Remaining member pages, full video playback, captions and exact excerpts still need review. Preview on the school network before class. Link to the original resources; do not upload member PDFs to this public Hub.</p></aside>;
}

export function MathEarlyFinisherBonuses() {
  return <details className="math-year-bonuses"><summary>Optional early-finisher challenges · exponents and four quadrants</summary><div><p>Offer after a student can explain the core task, or as a teacher-supported choice. These are enrichment, not extra requirements for everyone's Grade 6 assessment. Each takes about 10–20 minutes and works on paper. No SpacesEDU post is required.</p>
    <ResourceLinks slugs={["intro-to-exponents"]} label="October onward: optional exponent explanation" />
    <article className="math-bonus-paper"><header><h3>Bonus: power puzzles</h3><button type="button" onClick={event => printClosest(event.currentTarget, ".math-bonus-paper")}>Print power puzzles</button></header>
      <p><strong>You need:</strong> pencil and paper. An exponent tells how many times to use the base as a factor.</p>
      <p><strong>Model:</strong> 3⁴ = 3 × 3 × 3 × 3 = 81. It does not mean 3 × 4.</p>
      <ol><li>Write 2³, 3² and 2⁴ as repeated multiplication. Calculate each one.</li><li>Compare 2³ and 3². Does swapping the base and exponent keep the answer the same?</li><li>Write 16 as a power in two different ways, with both exponents greater than 1. Explain using multiplication.</li><li>Optional next challenge: compare 3 + 2³ × 2 and (3 + 2³) × 2. Evaluate the power first, then follow operation order.</li></ol>
      <p><strong>Show your learning:</strong> leave a page of calculations and one sentence explaining what an exponent means. Success: the number of repeated factors matches the exponent and you can explain a comparison.</p>
    </article>
    <ResourceLinks slugs={["negative-numbers", "graphing-on-the-coordinate-plane"]} label="May, or earlier after a short introduction: optional coordinate explanation" />
    <article className="math-bonus-paper"><header><h3>Bonus: a creature in four quadrants</h3><button type="button" onClick={event => printClosest(event.currentTarget, ".math-bonus-paper")}>Print coordinate challenge</button></header>
      <p><strong>You need:</strong> squared paper, ruler and pencil. Draw x and y axes from −6 to 6 with equal spacing.</p>
      <p><strong>Model:</strong> (−3, 2) means start at (0, 0), move 3 left, then 2 up. Across the y-axis it becomes (3, 2); across the x-axis the original becomes (−3, −2).</p>
      <ol><li>Draw a creature using 6–10 points in the upper-right quadrant. Keep every coordinate between 1 and 5. List the points in joining order.</li><li>Reflect it across the y-axis to make a second creature. List the new coordinates.</li><li>Reflect both creatures across the x-axis. Now you have a creature in each quadrant.</li><li>Swap your original coordinate list with a partner. Can they recreate it? Explain which coordinate changes sign in each reflection.</li></ol>
      <p><strong>Show your learning:</strong> leave your labelled drawing, coordinate lists and reflection explanation. Success: a partner can reconstruct your drawing and each reflection keeps the shape and size.</p>
    </article>
    <p>Before either optional video, predict the model on its paper card. Pause before the video's answer to explain the repeated factors or coordinate signs. Choose a 3–5 minute section during preview; exact timestamps are not verified. If the video fails, use the supplied model and complete the same paper task.</p>
  </div></details>;
}
