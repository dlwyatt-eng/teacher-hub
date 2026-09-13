// Suggested dates, not confirmed report deadlines. Existing saved plans are never overwritten.
export type MathPacingLesson = { id: string; unit: string; title: string; packId: string; experienceId: string; model: string; task: string; check: string; answer: string };
export type MathPacingWeek = { weekOf: string; unit: string; lessonIds: string[]; note: string; kind: 'teach' | 'flex' };
export type MathPacingUnit = { id: string; title: string; packId: string; experienceId: string; coverage: string[] };
export const mathPacingUnits: MathPacingUnit[] = [
  {
    "id": "number",
    "title": "Place value and number size",
    "packId": "magnitude-place-value-pack",
    "experienceId": "magnitude-gallery",
    "coverage": [
      "small to large numbers"
    ]
  },
  {
    "id": "operations",
    "title": "Whole-number strategies",
    "packId": "operations-fluency-pack",
    "experienceId": "strategy-league",
    "coverage": [
      "multiplication and division facts"
    ]
  },
  {
    "id": "factors",
    "title": "Factors, multiples and brackets",
    "packId": "factors-multiples-pack",
    "experienceId": "pack-and-sync",
    "coverage": [
      "factors and multiples",
      "order of operations"
    ]
  },
  {
    "id": "fractions",
    "title": "Fractions, ratios and percents",
    "packId": "fraction-ratio-percent-pack",
    "experienceId": "fraction-ratio-remix",
    "coverage": [
      "improper fractions and mixed numbers",
      "ratios",
      "whole-number percents"
    ]
  },
  {
    "id": "decimals",
    "title": "Decimals, discounts and budgets",
    "packId": "decimal-operations-pack",
    "experienceId": "decimal-dispatch",
    "coverage": [
      "multiplication and division of decimals",
      "percentage discounts",
      "financial literacy"
    ]
  },
  {
    "id": "algebra",
    "title": "Patterns and equations",
    "packId": "pattern-relations-pack",
    "experienceId": "pattern-forecast",
    "coverage": [
      "increasing and decreasing patterns",
      "one-step equations"
    ]
  },
  {
    "id": "data",
    "title": "Line graphs and evidence",
    "packId": "collect-summarize-data-pack",
    "experienceId": "graph-story-lab",
    "coverage": [
      "line graphs"
    ]
  },
  {
    "id": "chance",
    "title": "Probability",
    "packId": "single-outcome-probability-pack",
    "experienceId": "probability-game-audit",
    "coverage": [
      "single-outcome probability"
    ]
  },
  {
    "id": "angles",
    "title": "Angles and triangles",
    "packId": "angle-triangle-pack",
    "experienceId": "geometry-field-lab",
    "coverage": [
      "angle measurement and classification",
      "triangles"
    ]
  },
  {
    "id": "area",
    "title": "Perimeter and area",
    "packId": "area-recompose-pack",
    "experienceId": "zoo-design-studio",
    "coverage": [
      "perimeter of complex shapes",
      "area of triangles parallelograms and trapezoids"
    ]
  },
  {
    "id": "volume",
    "title": "Volume and capacity",
    "packId": "volume-capacity-pack",
    "experienceId": "zoo-design-studio",
    "coverage": [
      "volume and capacity"
    ]
  },
  {
    "id": "moves",
    "title": "Coordinates and transformations",
    "packId": "first-quadrant-transformations-pack",
    "experienceId": "transformation-cipher",
    "coverage": [
      "combinations of transformations"
    ]
  }
];
export const mathPacingLessons: Record<string, MathPacingLesson> = {
  "n1": {
    "id": "n1",
    "unit": "number",
    "title": "Thousandths have a place",
    "packId": "magnitude-place-value-pack",
    "experienceId": "magnitude-gallery",
    "model": "0.008 is 8 thousandths. On a line from 0 to 0.01 with ten equal spaces, each space is 0.001. The eighth mark is 0.008.",
    "task": "Draw that line. Place 0.003 and 0.009, then explain why 0.03 is outside it.",
    "check": "Which is greater: 0.006 or 0.06? Explain using place value.",
    "answer": "0.06 = 60 thousandths, so it is greater than 6 thousandths."
  },
  "n2": {
    "id": "n2",
    "unit": "number",
    "title": "Read and compare billions",
    "packId": "magnitude-place-value-pack",
    "experienceId": "magnitude-gallery",
    "model": "In 2,306,000,000 and 2,360,000,000, the billions and hundred-millions agree. Compare the ten-millions: 0 is less than 6, so the first number is smaller.",
    "task": "Read 3,405,000,000 and 3,450,000,000 by groups of three digits. Mark the first place that differs.",
    "check": "Order 4,090,000,000 and 4,009,000,000 from least to greatest.",
    "answer": "4,009,000,000 then 4,090,000,000; compare the ten-millions."
  },
  "n3": {
    "id": "n3",
    "unit": "number",
    "title": "Changing the scale changes the picture",
    "packId": "magnitude-place-value-pack",
    "experienceId": "magnitude-gallery",
    "model": "A line from 0 to 1 with ten equal spaces has intervals of 0.1. A line from 0 to 0.1 with ten equal spaces has intervals of 0.01. The same 0.08 belongs between 0 and 0.1 on the first, and at mark eight on the second.",
    "task": "Draw both lines and place 0.04. Explain which line shows it more precisely. Make a scale puzzle for a partner.",
    "check": "Ten equal spaces run from 0 to 0.01. What is the value at the seventh mark after zero?",
    "answer": "0.007. Each space is 0.001."
  },
  "o1": {
    "id": "o1",
    "unit": "operations",
    "title": "Multiply by breaking apart",
    "packId": "operations-fluency-pack",
    "experienceId": "strategy-league",
    "model": "23 × 16 = 23 × 10 + 23 × 6 = 230 + 138 = 368. Both parts still count groups of 23.",
    "task": "Draw a rectangle for 24 × 15. Split 15 into 10 and 5. Compare with splitting 24 into 20 and 4.",
    "check": "Calculate 32 × 14 and check with an estimate.",
    "answer": "448; 32 × 10 + 32 × 4 = 320 + 128. An estimate such as 30 × 15 = 450 is reasonable."
  },
  "o2": {
    "id": "o2",
    "unit": "operations",
    "title": "Divide by making groups",
    "packId": "operations-fluency-pack",
    "experienceId": "strategy-league",
    "model": "936 ÷ 24: 30 groups use 720, leaving 216. Nine more groups use 216. There are 39 groups; 39 × 24 = 936 checks it.",
    "task": "Solve 672 ÷ 24 with a running list of groups. Compare taking 20 groups first with taking 10 at a time.",
    "check": "Solve 840 ÷ 24 and check it.",
    "answer": "35; 30 groups use 720 and 5 use 120. 35 × 24 = 840."
  },
  "o3": {
    "id": "o3",
    "unit": "operations",
    "title": "Explain a mistake and choose a strategy",
    "packId": "operations-fluency-pack",
    "experienceId": "strategy-league",
    "model": "For 36 × 24, 36 × 20 = 720 is correct. The remaining four groups are 144, not 24. The total is 864.",
    "task": "Repair the claim 48 × 12 = 480 + 12. Then solve it a second way. Explain when doubling or breaking apart is helpful.",
    "check": "A student says 72 ÷ 8 = 8. How can multiplication check this?",
    "answer": "8 × 8 = 64, so the claim fails. 9 × 8 = 72, so the quotient is 9."
  },
  "f1": {
    "id": "f1",
    "unit": "factors",
    "title": "Prime, composite and divisibility",
    "packId": "factors-multiples-pack",
    "experienceId": "pack-and-sync",
    "model": "18 has factors 1, 2, 3, 6, 9 and 18, so it is composite. 17 has only 1 and 17, so it is prime. One is neither.",
    "task": "Sort 1, 12, 19 and 25. Use arrays or division to justify each choice. Build a factor tree for 24 using products, without needing exponent notation.",
    "check": "Is 21 prime or composite? List its factors.",
    "answer": "Composite: 1, 3, 7 and 21."
  },
  "f2": {
    "id": "f2",
    "unit": "factors",
    "title": "Make equal kits with no leftovers",
    "packId": "factors-multiples-pack",
    "experienceId": "pack-and-sync",
    "model": "24 blue and 36 gold counters can make 12 identical kits: 2 blue and 3 gold each. Twelve is the greatest factor shared by 24 and 36.",
    "task": "Find every possible number of identical kits using 18 blue and 30 gold counters. Which choice makes the greatest number of kits?",
    "check": "What is the greatest number of identical kits from 16 red and 24 yellow counters, with none left over?",
    "answer": "8 kits, with 2 red and 3 yellow in each."
  },
  "f3": {
    "id": "f3",
    "unit": "factors",
    "title": "Predict when events meet again",
    "packId": "factors-multiples-pack",
    "experienceId": "pack-and-sync",
    "model": "A light flashes every 4 seconds and another every 6. After flashing together at zero, their next shared time is 12 seconds: the least common multiple.",
    "task": "List multiples of 6 and 8 to find when two bells next ring together. Explain why finding equal kits was a different problem.",
    "check": "Bells ring every 3 and 5 minutes from zero. When do they next ring together?",
    "answer": "15 minutes."
  },
  "f4": {
    "id": "f4",
    "unit": "factors",
    "title": "Brackets change what happens first",
    "packId": "factors-multiples-pack",
    "experienceId": "scoreboard-rules",
    "model": "18 − 3 × 4 = 6 because multiplication happens first. (18 − 3) × 4 = 60 because brackets group the subtraction first.",
    "task": "Compare 24 ÷ 3 + 5 with 24 ÷ (3 + 5). Make another pair where brackets change the answer. Use whole numbers and brackets; leave exponent work as an extension.",
    "check": "Find 30 − 2 × (4 + 3).",
    "answer": "16: brackets give 7, multiplication gives 14, then subtract."
  },
  "r1": {
    "id": "r1",
    "unit": "fractions",
    "title": "Fractions can be more than one whole",
    "packId": "fraction-ratio-percent-pack",
    "experienceId": "fraction-ratio-remix",
    "model": "Seven quarter-pieces make 7/4 = 1 3/4. Four pieces make a whole and three remain. The whole must stay the same size.",
    "task": "Draw 11/4 with equal-sized wholes. Write a mixed number and show both names on a number line.",
    "check": "Write 13/5 as a mixed number and 2 1/3 as an improper fraction.",
    "answer": "13/5 = 2 3/5; 2 1/3 = 7/3."
  },
  "r2": {
    "id": "r2",
    "unit": "fractions",
    "title": "Compare with benchmarks and equal parts",
    "packId": "fraction-ratio-percent-pack",
    "experienceId": "fraction-ratio-remix",
    "model": "3/4 = 6/8, so it is greater than 5/8 when the wholes match. Renaming changes the number of pieces, not the amount.",
    "task": "Order 2/3, 3/4 and 5/6 using twelfths or equal-length strips. Explain why comparing denominators alone is unreliable.",
    "check": "Which is greater: 1 1/2 or 7/5? Show a comparison.",
    "answer": "1 1/2 = 15/10 and 7/5 = 14/10, so 1 1/2 is greater."
  },
  "r3": {
    "id": "r3",
    "unit": "fractions",
    "title": "A ratio tells which quantities we compare",
    "packId": "fraction-ratio-percent-pack",
    "experienceId": "fraction-ratio-remix",
    "model": "A mix has 2 red and 3 blue beads. Red:blue is 2:3; red:all is 2:5. Doubling both colours gives 4:6 with the same colour balance.",
    "task": "Draw equivalent batches for 3 yellow to 2 green. Label part-to-part and part-to-whole comparisons. Explain why adding one to each colour changes the balance.",
    "check": "A batch has 4 red and 6 blue. Give red:blue and red:all in simplest form.",
    "answer": "2:3 and 2:5."
  },
  "r4": {
    "id": "r4",
    "unit": "fractions",
    "title": "Connect fractions, decimals and percent",
    "packId": "fraction-ratio-percent-pack",
    "experienceId": "fraction-ratio-remix",
    "model": "25% means 25 of every 100: 25/100 = 1/4 = 0.25. On a 100-square grid, one quarter is 25 squares.",
    "task": "Draw or fold a hundred grid to show 50%, 25%, 75% and 10%. Match each with a fraction and decimal.",
    "check": "Write 75% as a fraction in simplest form and a decimal.",
    "answer": "3/4 and 0.75."
  },
  "d1": {
    "id": "d1",
    "unit": "decimals",
    "title": "Multiplying decimals counts equal groups",
    "packId": "decimal-operations-pack",
    "experienceId": "decimal-dispatch",
    "model": "0.125 × 3 = 0.375: three groups of 125 thousandths make 375 thousandths. The result is less than 1, which matches the estimate.",
    "task": "Show 0.24 × 4 using a place-value drawing or equal jumps. Explain the value of each digit in the answer.",
    "check": "Find 0.16 × 3. Explain why the answer is not 4.8.",
    "answer": "0.48: three groups of 16 hundredths are 48 hundredths."
  },
  "d2": {
    "id": "d2",
    "unit": "decimals",
    "title": "Division shares a decimal amount",
    "packId": "decimal-operations-pack",
    "experienceId": "decimal-dispatch",
    "model": "7.2 ÷ 9 = 0.8: 72 tenths shared into nine groups gives eight tenths per group. 9 × 0.8 = 7.2 checks it.",
    "task": "Share 4.8 into six equal groups using a sketch. Compare with sharing 48 into six groups.",
    "check": "Find 6.3 ÷ 7 and check with multiplication.",
    "answer": "0.9; 7 × 0.9 = 6.3."
  },
  "d3": {
    "id": "d3",
    "unit": "decimals",
    "title": "Estimate before trusting a decimal answer",
    "packId": "decimal-operations-pack",
    "experienceId": "decimal-dispatch",
    "model": "A claim that 0.48 × 5 = 24 cannot fit: five groups of about one half should be about 2.5. The exact product is 2.4.",
    "task": "Repair 8.4 ÷ 4 = 21. Explain the estimate, the place-value mistake and the corrected calculation. Select a few worksheet questions that practise the same idea.",
    "check": "Find 0.125 × 8. Explain a useful estimate or fraction connection.",
    "answer": "1; 0.125 is one eighth, and eight eighths make one."
  },
  "d4": {
    "id": "d4",
    "unit": "decimals",
    "title": "Find the discount, then the price",
    "packId": "decimal-operations-pack",
    "experienceId": "sale-lab",
    "model": "25% off $40 removes $10, leaving $30. The discount is the part removed, not the amount paid. Ignore tax for this task.",
    "task": "Compare 10% off $60 and 25% off $60. Draw the discount and the amount remaining for each.",
    "check": "An $80 item is 25% off. Find the saving and price before tax.",
    "answer": "Save $20; pay $60."
  },
  "d5": {
    "id": "d5",
    "unit": "decimals",
    "title": "Make a budget and defend a purchase",
    "packId": "decimal-operations-pack",
    "experienceId": "sale-lab",
    "model": "Saving $6 each week for a $36 item takes six weeks. A cheaper item is not automatically a better choice; compare what each option provides.",
    "task": "With a $50 budget, compare a $40 kit at 25% off plus a $12 refill with a $38 kit that needs no refill. Ignore tax. Explain which fits and what else you would want to know.",
    "check": "A $45 item is 20% off. Can you buy it with $35 before tax? Explain.",
    "answer": "The discount is $9 and the price is $36, so you need $1 more."
  },
  "a1": {
    "id": "a1",
    "unit": "algebra",
    "title": "Describe how a pattern grows",
    "packId": "pattern-relations-pack",
    "experienceId": "pattern-forecast",
    "model": "A pattern 3, 5, 7, 9 adds two each time. At stage n it has 2n + 1 pieces: two per stage plus one extra.",
    "task": "Draw stages 1–4 with tiles or squares. Predict stage 10 without drawing every stage. Explain where the extra one appears.",
    "check": "For 4, 7, 10, 13, write a rule and find stage 8.",
    "answer": "3n + 1; stage 8 is 25."
  },
  "a2": {
    "id": "a2",
    "unit": "algebra",
    "title": "Use tables and graphs for patterns",
    "packId": "pattern-relations-pack",
    "experienceId": "pattern-forecast",
    "model": "For y = 2n + 1, stages 1, 2, 3 give points (1,3), (2,5), (3,7). Plot discrete stages in the first quadrant; half a stage may not make sense.",
    "task": "Make a table and plot stages 1–5 of y = 3n + 1. Compare it with y = 2n + 1. Explain the steeper increase.",
    "check": "A pattern follows y = 4n + 2. What point represents stage 3?",
    "answer": "The point (3,14)."
  },
  "a3": {
    "id": "a3",
    "unit": "algebra",
    "title": "Decreasing patterns have limits",
    "packId": "pattern-relations-pack",
    "experienceId": "pattern-forecast",
    "model": "A display has 20 tiles at stage 1 and loses 3 each stage: 20, 17, 14, 11. Its rule can be 20 − 3(n − 1). Stop before a stage asks for a negative number of tiles.",
    "task": "Make a table for a 25-tile display that loses 4 per stage. Find the last stage that can be built. Explain why the story matters.",
    "check": "For 18, 14, 10, 6, what is stage 5 and can stage 6 be built from tiles?",
    "answer": "Stage 5 is 2. Stage 6 would be −2, so it cannot be built in this context."
  },
  "a4": {
    "id": "a4",
    "unit": "algebra",
    "title": "Keep an equation balanced",
    "packId": "one-step-equations-pack",
    "experienceId": "equation-balance",
    "model": "x + 4 = 11. Removing four from both sides leaves x = 7. Check: 7 + 4 = 11. Changing only one side breaks equality.",
    "task": "Draw a balance for x + 6 = 15. Solve and check it. Explain why both sides must change in the same way.",
    "check": "Solve x − 5 = 8 and check it.",
    "answer": "x = 13; 13 − 5 = 8."
  },
  "a5": {
    "id": "a5",
    "unit": "algebra",
    "title": "An unknown can stand for equal groups",
    "packId": "one-step-equations-pack",
    "experienceId": "equation-balance",
    "model": "3x = 12 means three equal groups total 12. Divide both sides by 3 to get x = 4, then check 3 × 4 = 12.",
    "task": "Write and solve an equation for four equal bags holding 28 counters. Compare it with a story about one bag plus four extra counters.",
    "check": "Solve 5x = 35 and check it.",
    "answer": "x = 7; 5 × 7 = 35."
  },
  "g1": {
    "id": "g1",
    "unit": "data",
    "title": "Choose a useful scale for a line graph",
    "packId": "collect-summarize-data-pack",
    "experienceId": "graph-story-lab",
    "model": "A fictional plant is 2, 4, 5 and 8 cm tall in weeks 1–4. Put time on the horizontal axis and height on the vertical axis. Plot and join the points to show change over time.",
    "task": "Graph those values with labelled axes and units. Explain what joining the points suggests and why these are measurements over time.",
    "check": "What was the increase from week 2 to week 4?",
    "answer": "4 cm: 8 − 4 = 4."
  },
  "g2": {
    "id": "g2",
    "unit": "data",
    "title": "A graph supports some claims, not every claim",
    "packId": "collect-summarize-data-pack",
    "experienceId": "graph-story-lab",
    "model": "The plant grew from 5 to 8 cm between weeks 3 and 4. That shows a 3 cm increase; it does not prove that a particular fertilizer caused it.",
    "task": "Draw the same data with two different vertical scales. Explain how the appearance changes while the measurements stay the same. Use a class science data set only if its source and units are clear.",
    "check": "Can the four measurements prove the plant will be 11 cm at week 5? Explain.",
    "answer": "No. Eleven is a possible prediction, but the observed data do not guarantee future growth."
  },
  "p1": {
    "id": "p1",
    "unit": "chance",
    "title": "List possible outcomes before predicting",
    "packId": "single-outcome-probability-pack",
    "experienceId": "probability-game-audit",
    "model": "For a fair six-sided die, rolling a 4 is one outcome out of six: 1/6. Rolling an even number uses three outcomes: 2, 4 and 6, so its probability is 3/6 = 1/2.",
    "task": "List outcomes for rolling a number greater than 4. Explain why equal likelihood matters before counting outcomes.",
    "check": "What is the probability of rolling less than 3 on a fair six-sided die?",
    "answer": "2/6 = 1/3: outcomes 1 and 2."
  },
  "p2": {
    "id": "p2",
    "unit": "chance",
    "title": "Trials vary, even with a fair device",
    "packId": "single-outcome-probability-pack",
    "experienceId": "probability-game-audit",
    "model": "Ten fair coin tosses need not give exactly five heads. One group's result is experimental evidence; 1/2 is the theoretical chance of heads on each toss.",
    "task": "Predict, toss a coin 20 times and record a tally. Combine class results. Compare the observed fraction with 1/2 without changing any results.",
    "check": "A group gets 12 heads in 20 tosses. Give its experimental fraction. Does this alone prove the coin unfair?",
    "answer": "12/20 = 3/5. No; small samples can vary by chance."
  },
  "p3": {
    "id": "p3",
    "unit": "chance",
    "title": "Audit a simple game",
    "packId": "single-outcome-probability-pack",
    "experienceId": "probability-game-audit",
    "model": "On a fair die, a player who wins on 1 or 2 has probability 2/6. A player who wins on 3, 4, 5 or 6 has 4/6. Equal rewards do not make those chances equal.",
    "task": "Change the winning numbers to give both players equal chances. Play several rounds, then explain why unequal results can still occur.",
    "check": "A player wins on an odd number; another wins on an even number. Are the theoretical chances equal?",
    "answer": "Yes. Each has 3 of the 6 equally likely outcomes, or 1/2."
  },
  "t1": {
    "id": "t1",
    "unit": "angles",
    "title": "Estimate and measure an angle",
    "packId": "angle-triangle-pack",
    "experienceId": "geometry-field-lab",
    "model": "A 120° angle is obtuse: larger than 90° and smaller than 180°. Put the protractor centre on the vertex, align zero with one ray and read the scale that starts at that zero.",
    "task": "Draw and measure 45°, 90° and 120° angles in different orientations. Compare estimates before using a protractor.",
    "check": "Classify 35°, 180° and 240°.",
    "answer": "Acute, straight and reflex, respectively."
  },
  "t2": {
    "id": "t2",
    "unit": "angles",
    "title": "Triangles have two kinds of names",
    "packId": "angle-triangle-pack",
    "experienceId": "geometry-field-lab",
    "model": "A triangle with sides 5, 5, 6 is isosceles because two sides match. Angle names answer a separate question: acute, right or obtuse. Turning the drawing does not change its properties.",
    "task": "Draw an equilateral triangle, then a right triangle. Sort your drawings by sides and by angles. Measure rather than deciding from orientation.",
    "check": "Can a triangle be both right and isosceles? Explain or sketch.",
    "answer": "Yes. A right triangle can have two equal legs; its other two angles are 45°."
  },
  "e1": {
    "id": "e1",
    "unit": "area",
    "title": "Trace every outside edge",
    "packId": "formula-perimeter-pack",
    "experienceId": "zoo-design-studio",
    "model": "Start with a 10 cm by 8 cm rectangle and remove a 4 cm by 3 cm corner. The new boundary is 10 + 5 + 4 + 3 + 6 + 8 = 36 cm. Count the two new inside-corner edges because they are on the boundary.",
    "task": "Draw and label that L-shape. Trace its whole boundary with a finger. Explain why adding only the original outside edges that remain misses part of the perimeter.",
    "check": "A 12 cm by 7 cm rectangle loses a 3 cm by 2 cm corner. What is the L-shape perimeter?",
    "answer": "38 cm; 12 + 5 + 3 + 2 + 9 + 7 = 38."
  },
  "e2": {
    "id": "e2",
    "unit": "area",
    "title": "A parallelogram can become a rectangle",
    "packId": "area-recompose-pack",
    "experienceId": "zoo-design-studio",
    "model": "Cut a triangular end from a parallelogram and slide it to the other side. Its area stays the same. Base 6 cm and perpendicular height 4 cm give area 24 cm²; the sloping side is not the height.",
    "task": "Draw a parallelogram on squared paper. Mark a base and perpendicular height. Cut and slide a paper copy to explain base × height.",
    "check": "A parallelogram has base 8 cm, height 3 cm and sloping side 5 cm. Find its area.",
    "answer": "24 cm²; use the perpendicular height, not the sloping side."
  },
  "e3": {
    "id": "e3",
    "unit": "area",
    "title": "A triangle is half a matching parallelogram",
    "packId": "area-recompose-pack",
    "experienceId": "zoo-design-studio",
    "model": "Two matching triangles can make a parallelogram. With base 8 cm and perpendicular height 5 cm, its area is 40 cm². One triangle has area 20 cm².",
    "task": "Draw two different triangles with base 6 cm and height 4 cm. Explain why both have area 12 cm² despite different appearances.",
    "check": "Find the area of a triangle with base 10 cm and height 3 cm.",
    "answer": "15 cm²: 10 × 3 ÷ 2."
  },
  "e4": {
    "id": "e4",
    "unit": "area",
    "title": "Build the trapezoid rule",
    "packId": "area-recompose-pack",
    "experienceId": "zoo-design-studio",
    "model": "Two matching trapezoids with parallel sides 4 and 8 cm make a parallelogram with base 12 cm. At height 3 cm its area is 36 cm², so one trapezoid is 18 cm².",
    "task": "Draw a trapezoid with parallel sides 3 and 7 cm and height 4 cm. Use a second copy or split it into familiar shapes to explain its area.",
    "check": "Find the area with parallel sides 5 and 9 cm and height 2 cm.",
    "answer": "14 cm²: (5 + 9) × 2 ÷ 2."
  },
  "e5": {
    "id": "e5",
    "unit": "area",
    "title": "Choose a measurement that answers the question",
    "packId": "area-recompose-pack",
    "experienceId": "zoo-design-studio",
    "model": "For the 10-by-8 rectangle with a 4-by-3 corner removed, floor area is 80 − 12 = 68 cm²; edging needs perimeter 36 cm. Area and perimeter answer different questions.",
    "task": "Use the existing Zoo Design plan or a grid-paper room. Label what needs area and what needs perimeter. Change one dimension and explain the effect. Continue the same project later instead of starting a second major design.",
    "check": "For a 6 m by 4 m room, how much flooring and how much edging are needed, ignoring doors?",
    "answer": "24 m² of flooring and 20 m of edging."
  },
  "v1": {
    "id": "v1",
    "unit": "volume",
    "title": "Count cubes in layers",
    "packId": "volume-capacity-pack",
    "experienceId": "zoo-design-studio",
    "model": "A box of cubes is 5 cm long, 3 cm wide and 4 cm tall. Each layer has 15 cubes and there are four layers: 60 cm³.",
    "task": "Build or sketch two different rectangular prisms with volume 24 cm³. Label their dimensions and layers. Explain why a flat area count is incomplete.",
    "check": "Find the volume of a prism 6 cm by 2 cm by 3 cm.",
    "answer": "36 cm³."
  },
  "v2": {
    "id": "v2",
    "unit": "volume",
    "title": "Capacity describes what fits inside",
    "packId": "volume-capacity-pack",
    "experienceId": "zoo-design-studio",
    "model": "An internal space of 1 cm³ holds 1 mL. A container with inside dimensions 10 cm × 5 cm × 4 cm holds 200 mL. Outside dimensions can overstate capacity because walls take space.",
    "task": "Estimate how many 250 mL cups fill 1 L. Test with water if practical, or draw four labelled cups. Add a capacity calculation to the existing design only if it fits.",
    "check": "A container has an inside volume of 750 cm³. Give its capacity in mL and L.",
    "answer": "750 mL = 0.75 L."
  },
  "c1": {
    "id": "c1",
    "unit": "moves",
    "title": "Plot across first, then up",
    "packId": "first-quadrant-transformations-pack",
    "experienceId": "transformation-cipher",
    "model": "The point (3,4) means move three units right from zero, then four up. Swapping the numbers gives a different point, (4,3).",
    "task": "Plot A(1,1), B(3,1), C(2,3). Translate every vertex two right and one up. Label the new coordinates.",
    "check": "Where does (2,5) move after a translation three right and two down?",
    "answer": "To (5,3)."
  },
  "c2": {
    "id": "c2",
    "unit": "moves",
    "title": "Every vertex follows both transformations",
    "packId": "first-quadrant-transformations-pack",
    "experienceId": "transformation-cipher",
    "model": "Translate A(1,1), B(3,1), C(2,3) two right and one up to (3,2), (5,2), (4,4). Reflect across x = 6 to get (9,2), (7,2), (8,4). Shape and size stay the same.",
    "task": "Draw both moves on a first-quadrant grid. Measure corresponding sides. Explain which way the reflected image faces and why the order of moves matters.",
    "check": "Translate (2,2) one right, then reflect across x = 5. Where is it?",
    "answer": "First (3,2), then (7,2)."
  },
  "c3": {
    "id": "c3",
    "unit": "moves",
    "title": "Describe a rotation precisely",
    "packId": "first-quadrant-transformations-pack",
    "experienceId": "transformation-cipher",
    "model": "A quarter-turn needs a centre and direction. Rotating (4,2) 90° anticlockwise about (2,2) gives (2,4): two units right of the centre becomes two units above it.",
    "task": "Plot triangle (3,2), (4,2), (3,3). Rotate it 90° anticlockwise about (2,2), then translate one right. Use tracing paper; keep every result in the first quadrant.",
    "check": "Rotate (2,4) 90° clockwise about (2,2). Where is it?",
    "answer": "At (4,2)."
  }
};
export const mathPacingWeeks: MathPacingWeek[] = [
  {
    "weekOf": "2026-09-21",
    "unit": "number",
    "lessonIds": [
      "n1",
      "n2"
    ],
    "note": "Start with what students can already explain.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-09-28",
    "unit": "number",
    "lessonIds": [
      "n3"
    ],
    "note": "Spend the remaining time on scale puzzles and targeted place-value practice.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-10-05",
    "unit": "operations",
    "lessonIds": [
      "o1",
      "o2"
    ],
    "note": "Use drawings and regrouping before asking for efficient written methods.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-10-12",
    "unit": "operations",
    "lessonIds": [
      "o3"
    ],
    "note": "One launch leaves space for a shorter week and strategy practice.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-10-19",
    "unit": "factors",
    "lessonIds": [
      "f1",
      "f2"
    ],
    "note": "Use actual arrays and kits before naming the greatest common factor.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-10-26",
    "unit": "factors",
    "lessonIds": [
      "f3",
      "f4"
    ],
    "note": "Compare a factors problem with a multiples problem; keep exponent work optional.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-11-02",
    "unit": "fractions",
    "lessonIds": [
      "r1",
      "r2"
    ],
    "note": "Protect time for equal-sized wholes, number lines and mixed numbers.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-11-09",
    "unit": "fractions",
    "lessonIds": [
      "r3"
    ],
    "note": "Revisit fraction comparisons before moving to new representations.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-11-16",
    "unit": "fractions",
    "lessonIds": [
      "r4"
    ],
    "note": "Connect models and symbols; choose a small worksheet selection rather than the whole archive.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-11-23",
    "unit": "fractions",
    "lessonIds": [],
    "note": "Movable report-writing buffer: use familiar fraction games and brief conferences.",
    "kind": "flex"
  },
  {
    "weekOf": "2026-11-30",
    "unit": "decimals",
    "lessonIds": [
      "d1",
      "d2"
    ],
    "note": "Teach place-value explanations for multiplying and dividing decimals separately.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-12-07",
    "unit": "decimals",
    "lessonIds": [
      "d3"
    ],
    "note": "Use an error-repair workshop; postpone a new idea if decimal place value is insecure.",
    "kind": "teach"
  },
  {
    "weekOf": "2026-12-14",
    "unit": "decimals",
    "lessonIds": [],
    "note": "Playful review before the break; no new unit or required upload.",
    "kind": "flex"
  },
  {
    "weekOf": "2027-01-04",
    "unit": "decimals",
    "lessonIds": [
      "d4",
      "d5"
    ],
    "note": "Apply percent to discounts and choices. Continue one budget task rather than starting several projects.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-01-11",
    "unit": "algebra",
    "lessonIds": [
      "a1",
      "a2"
    ],
    "note": "Move between a drawing, a rule, a table and discrete points.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-01-18",
    "unit": "algebra",
    "lessonIds": [
      "a3",
      "a4"
    ],
    "note": "Keep the decreasing-pattern context separate from the first balance model.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-01-25",
    "unit": "algebra",
    "lessonIds": [
      "a5"
    ],
    "note": "Use the extra time for checking equations and explaining the meaning of an unknown.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-02-01",
    "unit": "data",
    "lessonIds": [
      "g1"
    ],
    "note": "Build a labelled line graph from supplied data before collecting new data.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-02-08",
    "unit": "data",
    "lessonIds": [
      "g2"
    ],
    "note": "Use science or class data when available; check the claim as carefully as the graph.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-02-15",
    "unit": "chance",
    "lessonIds": [
      "p1"
    ],
    "note": "List equally likely outcomes before calculating a probability.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-02-22",
    "unit": "chance",
    "lessonIds": [],
    "note": "Other-subject priority week: revisit familiar games; keep new math optional and unscheduled.",
    "kind": "flex"
  },
  {
    "weekOf": "2027-03-01",
    "unit": "chance",
    "lessonIds": [
      "p2",
      "p3"
    ],
    "note": "Run trials, combine evidence and repair a simple game.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-03-08",
    "unit": "chance",
    "lessonIds": [],
    "note": "Movable report-writing buffer and pre-break game week; short checks from existing work.",
    "kind": "flex"
  },
  {
    "weekOf": "2027-03-29",
    "unit": "angles",
    "lessonIds": [
      "t1"
    ],
    "note": "A lighter return week: estimate, draw and measure angles.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-04-05",
    "unit": "angles",
    "lessonIds": [
      "t2"
    ],
    "note": "Classify by sides and angles, including rotated drawings.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-04-12",
    "unit": "area",
    "lessonIds": [
      "e1",
      "e2"
    ],
    "note": "Distinguish boundary from surface; show the cut-and-slide explanation.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-04-19",
    "unit": "area",
    "lessonIds": [
      "e3",
      "e4"
    ],
    "note": "Derive the triangle and trapezoid rules with paper copies.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-04-26",
    "unit": "area",
    "lessonIds": [
      "e5"
    ],
    "note": "Continue Zoo Design or another existing design; assess the mathematics within it.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-05-03",
    "unit": "volume",
    "lessonIds": [
      "v1"
    ],
    "note": "Use cubes or layered drawings before applying a volume rule.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-05-10",
    "unit": "volume",
    "lessonIds": [
      "v2"
    ],
    "note": "Connect volume with capacity and add one calculation to the same design.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-05-17",
    "unit": "moves",
    "lessonIds": [
      "c1",
      "c2"
    ],
    "note": "Keep core work in the first quadrant and apply both moves to every vertex.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-05-24",
    "unit": "moves",
    "lessonIds": [
      "c3"
    ],
    "note": "One launch leaves time for a shorter week and transformation practice.",
    "kind": "teach"
  },
  {
    "weekOf": "2027-05-31",
    "unit": "moves",
    "lessonIds": [],
    "note": "Movable report-writing buffer: familiar coordinate games and evidence checks.",
    "kind": "flex"
  },
  {
    "weekOf": "2027-06-07",
    "unit": "area",
    "lessonIds": [],
    "note": "Protected catch-up: teach any carried core lesson, or revisit a misconception found in recent work.",
    "kind": "flex"
  },
  {
    "weekOf": "2027-06-14",
    "unit": "operations",
    "lessonIds": [],
    "note": "Math choice week: repeat a favourite known game, improve a strategy and explain one discovery.",
    "kind": "flex"
  },
  {
    "weekOf": "2027-06-21",
    "unit": "number",
    "lessonIds": [],
    "note": "Celebrate growth: revisit an early problem and compare strategies; no new unit or mandatory upload.",
    "kind": "flex"
  }
];

export const mathPacingWeekFor = (date: string) => mathPacingWeeks.find(w => w.weekOf === date);
export const mathPacingTotals = { lessons: Object.keys(mathPacingLessons).length, teachingWeeks: mathPacingWeeks.filter(w => w.kind === 'teach').length, flexWeeks: mathPacingWeeks.filter(w => w.kind === 'flex').length };
export function mathUnitPacing(unit: string) {
  const weeks = mathPacingWeeks.filter(w => w.unit === unit && w.kind === 'teach');
  return { lessons: weeks.reduce((n,w) => n + w.lessonIds.length, 0), weeks: weeks.length, first: weeks[0]?.weekOf, last: weeks.at(-1)?.weekOf };
}
