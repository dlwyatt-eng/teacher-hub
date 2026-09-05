import type { ExperienceKit } from "./program-types";

/**
 * Paper-first task kits for the Mathematics experiences that do not already
 * have a dedicated kit in program-supports.  Answer cards are deliberately
 * labelled so the lesson renderer can keep them out of student/projector
 * copies while still giving the teacher a separate printable key.
 */
export const mathExperienceKits: Record<string, ExperienceKit> = {
  "strategy-league": {
    setupMinutes: 5,
    provided: ["Strategy cards", "Estimate–exact–check mat", "Error-analysis cards", "Independent check", "Separate answer key"],
    gather: ["Paper or mini-whiteboards", "Pencils", "Optional base-ten blocks", "Calculator only for the final check"],
    shortRoute: "Choose one multiplication and one division card. Estimate, solve with a visible strategy, check with the inverse operation, and repair one fictional error.",
    cards: [
      { title: "ESTIMATE · EXACT · CHECK", body: "Problem: __. Estimate: __ because __. Exact strategy (draw, break apart, or partial products/quotients): __. Inverse check: __. My answer is reasonable because __." },
      { title: "STRATEGY A · BREAK APART", body: "Solve 23 × 16 by breaking 16 into 10 + 6. Show both partial products, combine them, and compare the exact answer with 20 × 20." },
      { title: "STRATEGY B · PARTIAL QUOTIENTS", body: "Solve 936 ÷ 24. Remove friendly groups of 24, keep a running total of groups, and multiply to check." },
      { title: "STRATEGY C · AREA MODEL", body: "Solve 47 × 32 with a rectangle split into tens and ones. Label all four regions before adding." },
      { title: "ERROR LAB", body: "A learner says 36 × 24 = 720 + 24 = 744. Mark the correct step, locate the missing amount, and repair the calculation without erasing the evidence." },
      { title: "INDEPENDENT CHECK", body: "Estimate and solve: 68 × 14 and 1,008 ÷ 28. Check each answer by a different route." },
      { title: "ANSWER KEY · STRATEGY LEAGUE", body: "23 × 16 = 368; 936 ÷ 24 = 39; 47 × 32 = 1,504. Error Lab: 36 × 20 = 720 and 36 × 4 = 144, so 864. Independent: 68 × 14 = 952; 1,008 ÷ 28 = 36." },
    ],
  },
  "pack-and-sync": {
    setupMinutes: 7,
    provided: ["Divisibility strip", "Factor-tree cards", "Supply-kit mission", "Sync-timeline mission", "Separate answer key"],
    gather: ["Counters or linking cubes", "Paper strips", "Pencils", "Optional two-colour markers"],
    shortRoute: "Sort the numbers, build one factor tree, then solve either the equal-pack GCF mission or repeating-event LCM mission and explain why that tool fits.",
    cards: [
  {
    "title": "QUICK SORT",
    "body": "A prime number has exactly two positive factors: 1 and itself. A composite number has more than two. Sort 17, 24, 29, 36, 45 and 51. Show a factor pair other than 1 × the number for each composite."
  },
  {
    "title": "DIVISIBILITY STRIP",
    "body": "2: even last digit · 3: digit sum divisible by 3 · 5: ends in 0 or 5 · 9: digit sum divisible by 9 · 10: ends in 0. Test 270, 324, 455, and 1,026."
  },
  {
    "title": "FACTOR TREE",
    "body": "Start one tree with 84 = 2 × 42 and another with 84 = 7 × 12. Keep splitting composite factors until every end number is prime. Write each result as a multiplication of primes."
  },
  {
    "title": "PACK IT · GCF",
    "body": "A club has 24 blue badges and 36 gold badges. Make the greatest possible number of identical packs with no badges left. How many packs? What goes in each?"
  },
  {
    "title": "SYNC IT · LCM",
    "body": "A blue signal flashes every 6 seconds and a gold signal every 8 seconds. They flash together now. When will they next flash together? Show multiples or a timeline."
  },
  {
    "title": "CHOOSE THE TOOL",
    "body": "For the badge packs, explain why the number of packs must divide both 24 and 36 exactly. For the lights, explain why the next shared time must appear in both lists of multiples."
  },
  {
    "title": "ANSWER KEY · PACK AND SYNC",
    "body": "Prime: 17, 29. Composite examples: 24 = 4 × 6; 36 = 6 × 6; 45 = 5 × 9; 51 = 3 × 17. Divisibility: 270 by 2,3,5,9,10; 324 by 2,3,9; 455 by 5; 1,026 by 2,3,9. Both trees give 84 = 2 × 2 × 3 × 7. Badges: GCF(24,36) = 12 packs, each with 2 blue and 3 gold. Lights: 6,12,18,24 and 8,16,24 first share 24 seconds."
  }
],
  },
  "scoreboard-rules": {
    setupMinutes: 4,
    provided: ["Number and operation tiles", "Bracket cards", "Story-to-expression rounds", "Remix card", "Separate answer key"],
    gather: ["Scissors optional", "Paper or mini-whiteboards", "Pencils"],
    shortRoute: "Build and compare the two opening expressions, match two stories to expressions, then write and peer-test one unambiguous scoring rule.",
    cards: [
      { title: "CUT-APART TILES", body: "5 · 3 · 4 · 6 · 8 · 48 · + · − · × · ÷ · ( · )" },
      { title: "OPENING CLAIM", body: "Two teams read 5 + 3 × 4. One claims 32; one claims 17. Use the shared convention to decide, then move brackets to make the other score." },
      { title: "ROUND A", body: "Three crystals are worth 8 points each. The team earns one 5-point bonus. Build the expression and score." },
      { title: "ROUND B", body: "Forty-eight points are shared among 6 players. Then each player earns a 4-point rescue bonus. Build the expression and each player's score." },
      { title: "REMIX", body: "Write a scoring story with one part that repeats and one part that happens once. Build its expression, solve it, and trade with another group. Revise if their reading differs." },
      { title: "ORDER CHECK", body: "Brackets first · multiplication or division from left to right · addition or subtraction from left to right. No exponents are required in this Grade 6 task." },
      { title: "ANSWER KEY · SCOREBOARD", body: "5 + 3 × 4 = 17; (5 + 3) × 4 = 32. Round A: 3 × 8 + 5 = 29. Round B: 48 ÷ 6 + 4 = 12 points per player." },
    ],
  },
  "fraction-ratio-remix": {
    setupMinutes: 6,
    provided: ["Fraction-strip directions", "Ratio batch cards", "Part-to-part and part-to-whole table", "Broken-batch repair", "Separate answer key"],
    gather: ["Paper strips", "Two colours of counters or pencil crayons", "Pencils"],
    shortRoute: "Build one equivalent-fraction strip, complete one ratio batch, and repair one batch whose parts were scaled by different factors.",
    cards: [
  {
    "title": "FRACTION STRIPS",
    "body": "Fold equal-length strips into halves, fourths, and eighths. Shade 1/2, 2/4, and 4/8. Align the strips and write what the model proves."
  },
  {
    "title": "BATCH A",
    "body": "A trail mix uses 2 scoops oats for every 3 scoops seeds. Complete batches with 4, 6, and 10 scoops of oats."
  },
  {
    "title": "RATIO TABLE",
    "body": "Oats: 2 | 4 | 6 | 10. Seeds: 3 | __ | __ | __. Total parts: 5 | __ | __ | __."
  },
  {
    "title": "PART TO PART / PART TO WHOLE",
    "body": "In the base batch, write oats:seeds, oats:total, seeds:total, and the fraction of the mix that is seeds."
  },
  {
    "title": "BROKEN BATCH",
    "body": "A learner changes 2 scoops oats to 6 and 3 scoops seeds to 6. Which multiplier did they use for each ingredient? Keep 6 scoops oats and repair the number of seeds."
  },
  {
    "title": "COMPARE",
    "body": "Which has a greater seed share: Mix A at 2:3 or Mix B at 3:4? Use a table, common total, fraction, or diagram."
  },
  {
    "title": "ANSWER KEY · FRACTION AND RATIO",
    "body": "Strips: 1/2 = 2/4 = 4/8 for equal-sized wholes. Seeds: 6,9,15; totals: 10,15,25. Oats:seeds = 2:3; oats:total = 2:5; seeds:total = 3:5, so seeds are 3/5 of the mix. Broken batch: oats ×3 but seeds ×2. Use ×3 for both to make 6:9. Compare seed shares: A is 3/5 = 21/35; B is 4/7 = 20/35. Mix A has the greater seed share."
  }
],
  },
  "decimal-dispatch": {
    setupMinutes: 5,
    provided: ["Fictional invoice", "Price cards", "Place-value mat", "Decimal-grid prompt", "Separate answer key"],
    gather: ["Paper", "Pencils", "Base-ten grids optional", "Calculator after estimating"],
    shortRoute: "Estimate the invoice, calculate each line with a visible decimal model, locate and repair the planted error, then verify the total.",
    cards: [
      { title: "FICTIONAL CLASSROOM INVOICE", body: "4 sketchbooks at $3.75 · 6 marker packs at $2.40 · 3 rolls of tape at $1.85. Estimate first, then calculate each line and the subtotal." },
      { title: "PLACE-VALUE MAT", body: "ONES | TENTHS | HUNDREDTHS. Line up equal place values, not the first digits. Rename across the decimal when needed." },
      { title: "GRID MODEL", body: "Show 2.4 × 6 as 24 tenths × 6. Rename the result in ones and tenths." },
      { title: "DISPATCH ERROR", body: "A clerk writes 3 × $1.85 = $3.555. Use an estimate and place value to explain why this cannot be the invoice amount." },
      { title: "DIVISION STOP", body: "$7.20 is shared equally among 9 table groups. Use 72 tenths ÷ 9 to find each share." },
      { title: "FINAL CHECK", body: "Compare the exact subtotal with your estimate. Circle the line item most likely to cause a place-value error and explain why." },
      { title: "ANSWER KEY · DECIMAL DISPATCH", body: "Sketchbooks $15.00; markers $14.40; tape $5.55; subtotal $34.95. Error repair: 3 × $1.85 = $5.55. $7.20 ÷ 9 = $0.80." },
    ],
  },
  "sale-lab": {
    setupMinutes: 6,
    provided: ["Hundred-grid routes", "Offer cards", "Fictional event budget", "Surprise cards", "Separate answer key"],
    gather: ["Hundred grids or graph paper", "Pencils and two colours", "Calculator after showing a method"],
    shortRoute: "Model one percent on a grid, compare two offers, then solve one missing-part and one missing-whole budget question.",
    cards: [
      { title: "PERCENT GRID", body: "Shade 25 of 100 squares. Label 25%, 25/100, 1/4, and 0.25. Explain why all four names represent the same amount." },
      { title: "OFFER A", body: "A fictional art kit costs $48. Offer A takes 25% off. Find the discount and sale price." },
      { title: "OFFER B", body: "The same kit has $10 off. Compare the final prices; do not decide from the larger-looking number alone." },
      { title: "MISSING PART", body: "A class uses 35% of a $240 event budget for materials. How much is that? Show a benchmark or decomposition." },
      { title: "MISSING WHOLE", body: "$18 is 30% of the original price. Find 10%, then the whole." },
      { title: "MISSING PERCENT", body: "$21 of a $60 budget has been used. What percent is that? Connect the fraction, decimal, and percent." },
      { title: "SURPRISE CARD", body: "Shipping adds $6 after discounts. Recalculate both art-kit offers and explain whether the better discount changes." },
      { title: "ANSWER KEY · SALE LAB", body: "Offer A: $12 off, sale $36; Offer B: sale $38; with shipping $42 vs $44. 35% of $240=$84. If $18 is 30%, whole=$60. $21/$60=0.35=35%." },
    ],
  },
  "pattern-forecast": {
    setupMinutes: 5,
    provided: ["Increasing and decreasing stage cards", "Table-and-graph organizer", "Rule tester", "Forecast card", "Separate answer key"],
    gather: ["Counters or tiles", "Grid paper", "Pencils"],
    shortRoute: "Build stages 1–4 for one route, complete its table and graph, write the rule in words and symbols, then test stage 10.",
    cards: [
      { title: "ROUTE A · GROWING", body: "Stage 1 has 5 lights. Add 3 lights each new stage. Build or draw stages 1–4, then predict stage 10." },
      { title: "ROUTE B · DECREASING", body: "Stage 1 has 38 stones. Remove 4 stones each new stage. Draw stages 1–5 and decide the last stage that still has a non-negative number." },
      { title: "TABLE", body: "Stage: 1 | 2 | 3 | 4 | 5 | 10. Value: __ | __ | __ | __ | __ | __. Circle the constant change." },
      { title: "GRAPH", body: "Horizontal axis = stage number. Vertical axis = number of items. Use equal intervals, plot every table pair, and describe the direction." },
      { title: "RULE TESTER", body: "Write the rule in words. Then use n for the stage: Route A is 3n + __. Route B is __ − 4(n − 1). Test n=1 before trusting it." },
      { title: "ANSWER KEY · PATTERN FORECAST", body: "Route A values 5,8,11,14,17; stage 10=32; rule 3n+2. Route B values 38,34,30,26,22; rule 38−4(n−1); stage 10=2 and stage 11 would be −2, so stage 10 is the last non-negative stage." },
    ],
  },
  "equation-balance": {
    setupMinutes: 5,
    provided: ["Balance mat", "Crate and counter cards", "Four mystery equations", "Check strip", "Separate answer key"],
    gather: ["Counters", "Paper", "Pencils", "Optional balance scale"],
    shortRoute: "Model and solve one addition/subtraction and one multiplication/division mystery. Keep both sides balanced and substitute to check.",
    cards: [
      { title: "BALANCE MAT", body: "LEFT SIDE = RIGHT SIDE. Whatever change you make on one side must be made on the other. Draw a vertical line between the sides." },
      { title: "CASE A", body: "x + 17 = 45. Show how undoing 17 on both sides keeps the equation balanced." },
      { title: "CASE B", body: "4x = 52. Draw four equal crates, share the 52 counters, and write the value of one crate." },
      { title: "CASE C", body: "x ÷ 6 = 9. Use the inverse operation, then substitute your answer into the original equation." },
      { title: "CASE D", body: "72 − x = 29. Test your solution in the exact original order; do not turn the subtraction around." },
      { title: "WRITE A MYSTERY", body: "Choose an unknown whole number. Build a one-step equation whose solution is not shown. Trade and solve; the author checks by substitution." },
      { title: "ANSWER KEY · EQUATION BALANCE", body: "A x=28; B x=13; C x=54; D x=43. A correct check replaces x in the original equation and makes both sides equal." },
    ],
  },
  "probability-game-audit": {
    setupMinutes: 7,
    provided: ["Equal and unequal spinner cards", "Outcome-list frame", "Trial tables", "Redesign brief", "Separate answer key"],
    gather: ["Paper clips and pencils for spinners", "Counters", "Pencils"],
    shortRoute: "Predict and run 20 trials on one game, compare experimental with theoretical probability, then change the design to meet a fairness goal.",
    cards: [
      { title: "SPINNER A · EQUAL", body: "Four equal sections: blue, blue, red, green. List the equally likely outcomes and predict P(blue), P(red), and P(green)." },
      { title: "SPINNER B · UNEQUAL", body: "Half the spinner is blue; one quarter is red; two eighths are green. Are the colours equally likely? Explain from area, not appearance." },
      { title: "20-TRIAL TABLE", body: "Trial numbers 1–20. Tally blue, red, and green. Experimental probability = observed count ÷ 20." },
      { title: "40-TRIAL MERGE", body: "Combine your table with another group. Compare the 20-trial and 40-trial results with the theoretical values. Variation is expected." },
      { title: "REDESIGN", body: "Change Spinner A so blue and red are equally likely and green remains possible. Draw exact equal fractions and state the new probabilities." },
      { title: "ANSWER KEY · PROBABILITY", body: "Spinner A: P(blue)=2/4=1/2, P(red)=1/4, P(green)=1/4. Spinner B has the same probabilities; colours are not all equally likely. One redesign: 2/5 blue, 2/5 red, 1/5 green." },
    ],
  },
  "geometry-field-lab": {
    setupMinutes: 8,
    provided: ["Reference-angle strip", "Rotated triangle sort", "Straight/reflex angle prompts", "Polygon-angle investigation", "Separate answer key"],
    gather: ["Protractors", "Rulers", "Pencils", "Scrap paper for folding"],
    shortRoute: "Construct and check three angles, classify the four triangles from their given sides or angles, then find the reflex angle paired with 125°.",
    cards: [
  {
    "title": "REFERENCE ANGLES",
    "body": "Fold or draw 45°, 90°, and 180°. Estimate first. Place the protractor centre on the vertex and line up zero with one ray before reading."
  },
  {
    "title": "ANGLE SET",
    "body": "Choose three angles from 35°, 89°, 90°, 125°, 180° and 235°. Draw each accurately. Hide the number and ask a partner to estimate, measure and classify it. For 235°, mark the larger turn around the vertex."
  },
  {
    "title": "TRIANGLE SORT",
    "body": "A: sides 5,5,7 · B: angles 90°,45°,45° · C: sides 6,6,6 · D: angles 30°,60°,90°. Give every name supported by the class's inclusive definitions."
  },
  {
    "title": "POLYGON TURN",
    "body": "Draw a triangle, a quadrilateral and a pentagon. Mark and classify an inside angle in each. A triangle has no reflex inside angle. To make a reflex inside angle in another polygon, draw a corner pointing inward."
  },
  {
    "title": "FULL TURN",
    "body": "Use 360° around a point. If the smaller angle is 125°, find the reflex angle that completes the turn."
  },
  {
    "title": "ANSWER KEY · ANGLE EXPEDITION",
    "body": "35° acute; 89° acute; 90° right; 125° obtuse; 180° straight; 235° reflex. A isosceles; B right and isosceles; C equilateral and also isosceles under ‘at least two equal sides’; D right and scalene. Reflex partner of 125° is 235°."
  }
],
  },
  "transformation-cipher": {
    setupMinutes: 6,
    provided: ["First-quadrant grids", "Point cards", "Tracing-overlay directions", "Cipher record", "Separate answer key"],
    gather: ["Grid paper", "Tracing paper or transparent sleeves", "Pencils and rulers"],
    shortRoute: "Plot one creature, complete two transformations in sequence, record the coordinate rule for each, and let a partner decode the final image.",
    cards: [
      { title: "STARTING CREATURE", body: "Plot A(2,2), B(5,2), C(5,4), D(3,6), E(2,4), then connect A–B–C–D–E–A in the first quadrant." },
      { title: "MOVE 1 · TRANSLATE", body: "Move every point 3 right and 1 up. Record the new coordinates and the rule (x,y) → (x+3,y+1)." },
      { title: "MOVE 2 · REFLECT", body: "On a new grid, reflect the translated image across the vertical line x=6. Use equal perpendicular distance from the mirror line." },
      { title: "OVERLAY CHECK", body: "Trace the starting image. Slide, flip, or turn the tracing as directed. Size and shape must stay unchanged." },
      { title: "CIPHER", body: "Write a two-move code using a translation plus a reflection or quarter-turn. Give only the start points and rules to another group; repair any ambiguous instruction." },
      { title: "ANSWER KEY · TRANSFORMATION", body: "After Move 1: A′(5,3), B′(8,3), C′(8,5), D′(6,7), E′(5,5). Reflection across x=6: A″(7,3), B″(4,3), C″(4,5), D″(6,7), E″(7,5)." },
    ],
  },
  "space-under-constraints": {
    setupMinutes: 10,
    provided: ["Exact 8 m × 6 m site brief", "$2,200 budget", "Zone and price cards", "Capacity and doorway rules", "Break-test sheet", "Separate answer key"],
    gather: ["1 cm grid paper", "Rulers", "Pencils and coloured pencils", "Calculator after methods are shown"],
    shortRoute: "Choose the required welcome, work, storage, and quiet zones; draw a scale plan; prove area, capacity, access, and cost; then repair one failed break test.",
    cards: [
      { title: "DESIGN BRIEF", body: "Plan a fictional 8 m × 6 m community maker room on 1 cm grid paper (1 cm = 1 m). Budget: $2,200. Capacity: 18 people. Keep a continuous 1.2 m route from the 1.2 m doorway to every zone. Zones may not overlap." },
      { title: "REQUIRED ZONES", body: "WELCOME 2 m × 2 m · WORK zone at least 18 m² · QUIET zone 3 m × 2 m · STORAGE with at least 12 m³ capacity. Label every dimension." },
      { title: "PRICE CARDS", body: "Work surface: $45/m² · Welcome zone: $120 flat · Quiet zone: $210 flat · Storage A 3 m × 1 m × 2 m: $360 · Storage B 2 m × 1.5 m × 2.5 m: $420 · Route marking: $90." },
      { title: "CAPACITY RULE", body: "Allow at least 2 m² of WORK-zone floor area per working person. At least 9 of the 18 people must be able to use the work zone at once." },
      { title: "PLAN RECORD", body: "Total room area __ · zone areas __ · open circulation area __ · work capacity __ · storage volume __ · itemized cost __ · budget remaining __." },
      { title: "BREAK TESTS", body: "1) A table blocks half the doorway. 2) Storage loses 1 m³ to shelving thickness. 3) Work surfaces rise by $5/m². Test all three; revise one part while keeping every rule." },
      { title: "ACCESS CHECK", body: "Trace the 1.2 m route with a coloured pencil. Mark the doorway width and every turn. A route that exists only in the written explanation does not pass." },
      { title: "ANSWER KEY · SPACE CONSTRAINTS", body: "Room area 48 m². Minimum 18 m² work zone supports 9 people at 2 m² each. Storage A volume=6 m³ and B=7.5 m³, so neither alone meets 12 m³; A+B=13.5 m³ costs $780. Example minimum cost with 18 m² work: $810+$120+$210+$780+$90=$2,010, leaving $190. If work surfaces rise by $5/m², add $90 for a new total of $2,100. If storage loses 1 m³, 12.5 m³ remains. The blocked-door test requires a layout revision." },
    ],
  },
};
