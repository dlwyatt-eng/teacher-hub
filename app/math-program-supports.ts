import type { ReadinessLevel, ReadinessQuestion, WordHelp } from "./program-types";
import { mathCoreDepthPacks } from "./math-core-depth-packs";

export type MathSupportPack = {
  id: string;
  anchorIds: string[];
  title: string;
  shortTitle: string;
  timing: string;
  blocks: string;
  role: "BC CORE" | "MATHUP / WNCP BRIDGE" | "FLUENCY ROUTINE";
  readinessLevel: ReadinessLevel;
  mathUpTopics: string[];
  prerequisite: string;
  learningGoal: string;
  whyBefore: string;
  background: string[];
  teacherMoves: string[];
  studentMoves: string[];
  supplied: string[];
  gather: string[];
  vocabulary: WordHelp[];
  model: {
    label: string;
    prompt: string;
    steps: string[];
    conclusion: string;
  };
  partnerCards: { title: string; body: string; answer?: string }[];
  check: { prompt: string; answer: string }[];
  readinessQuestions: ReadinessQuestion[];
  likelyMisconceptions: string[];
  supportRoute: string;
  extensionRoute: string;
  spaces: string;
};

export type MathYearBlock = {
  timing: string;
  focus: string;
  blocks: string;
  mathUpTopics: string[];
  lessonIds: string[];
  fluency: string;
  check: string;
  spaces: string;
};

const words = (...items: [string, string, string][]): WordHelp[] => items.map(([term, meaning, example]) => ({ term, meaning, example }));

export const mathSupportPacks: MathSupportPack[] = [
  ...mathCoreDepthPacks,
  {
    id: "integer-number-line-pack",
    anchorIds: ["transformation-cipher"],
    title: "Across zero: negative coordinates",
    shortTitle: "Negative-coordinate bridge",
    timing: "May · during the coordinate-graphing sequence",
    blocks: "1 × 30–40 min + short practice",
    role: "MATHUP / WNCP BRIDGE",
    readinessLevel: "full",
    mathUpTopics: ["WNCP_Representing and Comparing Integers"],
    prerequisite: "Locate and compare whole numbers on a number line; plot positive whole-number ordered pairs in the first quadrant.",
    learningGoal: "compare integers on a number line and plot points by moving across first, then up or down.",
    whyBefore: "Start with the B.C. Grade 6 first-quadrant coordinate work. Then, near the end of the sequence, open this short MathUP/WNCP bridge before students try the optional four-quadrant challenge. It is not a separate B.C. Grade 6 integer unit or an introduction to Grade 7 integer operations.",
    background: [
      "Start at (0, 0). The point (3, 4) means walk 3 squares right, then 4 squares up. Mathematicians read x first and y second.",
      "A winter temperature of −4°C is four degrees below zero. The minus-looking sign tells us the number is on the other side of zero; here it does not mean ‘do a subtraction.’",
      "Whole-number locations such as −6, 0, and 14 are called integers. Decimals and fractions, such as 1.5 and 3/4, are not integers.",
      "On a number line, −2 is warmer and farther right than −7, so −2 is greater even though 7 is the larger-looking digit.",
    ],
    teacherMoves: [
      "Rehearse x first, then y by plotting (3, 4) and two other positive whole-number pairs in the first quadrant.",
      "Use one familiar temperature or elevation example to extend a horizontal number line across zero.",
      "Extend both axes across zero to make a four-quadrant plane. Plot one negative-coordinate point at a time and read it aloud.",
      "Repair the false claim ‘(−3, 4) and (3, −4) are the same point because they use the same numbers.’",
    ],
    studentMoves: [
      "Start at (0, 0), walk the x move across, then the y move up, and plot three positive points.",
      "Walk temperature cards from −10°C to 10°C on a taped floor line and decide which location is warmer.",
      "Draw a horizontal and vertical line crossing at zero. Label that meeting place the origin.",
      "Plot one point in each region, saying the move aloud: left or right first, then down or up.",
      "Join the points into a tiny creature or route and trade the coordinate list with a partner.",
    ],
    supplied: ["Negative-number line","Four-quadrant point diagram","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Floor tape or string", "Number cards from this page", "Mini-whiteboards or scrap paper"],
    vocabulary: words(
      ["integer", "a whole number, zero, or the opposite of a whole number", "−6, 0, and 14 are integers; 1.5 is not"],
      ["negative", "less than zero", "−4°C is four degrees below zero"],
      ["opposite", "the same distance from zero on the other side", "−7 and 7 are opposites"],
      ["compare", "decide whether one value is greater than, less than, or equal to another", "−2 > −7 because −2 is farther right"],
      ["ordered pair", "two coordinates written x first and y second", "(−3, 4) means move 3 left, then 4 up"],
      ["origin", "the point where both axes meet at zero", "The origin is (0, 0)"],
      ["quadrant", "one of the four regions made by the crossing axes", "The point (−3, 4) is in the upper-left quadrant"],
    ),
    model: {
      label: "FIRST QUADRANT · THEN ACROSS ZERO",
      prompt: "How does (3, 4) become (−3, 4)?",
      steps: ["Plot (3, 4): move 3 right, then 4 up.", "Return to the origin (0, 0).", "For (−3, 4), move 3 left, then 4 up.", "Compare the points: the y-coordinate stays 4 while the x-direction changes."],
      conclusion: "The rule never changes: start at zero, move across for x, then move up or down for y. A negative sign simply sends that move left or down.",
    },
    partnerCards: [
      { title: "QUADRANT ROUTE", body: "Start at (0, 0). Move 4 left and 3 up. Name and plot the point.", answer: "(−4, 3)." },
      { title: "SAME Y · OPPOSITE X", body: "Plot (5, 2) and (−5, 2). What stays the same, and what changes?", answer: "Both move 2 up; one moves 5 right and the other 5 left." },
      { title: "READ THE MOVE", body: "Describe how to travel from (0, 0) to (−2, −6).", answer: "Move 2 left and 6 down." },
      { title: "REPAIR", body: "A student plots (−3, 4) by moving 3 right and 4 down. Correct both moves.", answer: "Move 3 left and 4 up." },
    ],
    check: [
      { prompt: "Order −6, 4, 0, and −1 from least to greatest.", answer: "−6, −1, 0, 4." },
      { prompt: "Plot and label (−3, 5).", answer: "Three left and five up from the origin." },
      { prompt: "Which ordered pair means 4 left and 2 down from the origin?", answer: "(−4, −2)." },
    ],
    readinessQuestions: [
      { prompt: "Which directions correctly plot (3, 4) in the first quadrant?", choices: ["Move 3 right, then 4 up", "Move 3 left, then 4 down", "Move 4 right, then 3 up"], answer: 0, feedback: "Read x first and y second: positive x moves right; positive y moves up." },
      { prompt: "Which directions correctly plot (−3, 4)?", choices: ["Move 3 left, then 4 up", "Move 3 right, then 4 down", "Move 4 left, then 3 up"], answer: 0, feedback: "Read x first and y second: negative x moves left; positive y moves up." },
      { prompt: "Which comparison is true?", choices: ["−4 > 1", "−3 > −8", "−9 > −2"], answer: 1, feedback: "−3 is farther right than −8." },
    ],
    likelyMisconceptions: ["Treating the larger digit as the greater negative integer", "Using ‘minus’ when the context means a location below zero", "Forgetting to name what zero represents"],
    supportRoute: "Start at 0 on a line from −10 to 10. Mark −7 and −2. The point farther right is greater. On a grid, rehearse (3,4), then change only the x-coordinate to plot (−3,4).",
    extensionRoute: "Encode a short picture across all four quadrants. After transformations are taught, predict coordinate changes after a reflection or translation.",
    spaces: "Classroom practice; no separate SpacesEDU post.",
  },
  {
    id: "operations-fluency-pack",
    anchorIds: ["strategy-league", "scoreboard-rules"],
    title: "Estimate, multiply, divide and check",
    shortTitle: "Whole-number operations workshop",
    timing: "September–October, then spiral all year",
    blocks: "3 × 40–50 min + 8–10 min recurring",
    role: "FLUENCY ROUTINE",
    readinessLevel: "review",
    mathUpTopics: ["Whole Number Operations"],
    prerequisite: "Recall or derive multiplication and division facts to 100 with a strategy or reference chart.",
    learningGoal: "estimate products and quotients, calculate with a clear method, and use multiplication or division to check.",
    whyBefore: "The games are stronger after students have seen mental, decomposed, and standard written methods side by side. Fluency is accuracy, flexibility, and efficiency—not public speed.",
    background: [
      "Before finding 23 × 16 exactly, use friendly nearby numbers: 20 × 20 = 400. The exact answer should live somewhere near 400. This quick prediction is called an estimate.",
      "For 23 × 16, you can split 16 into 10 + 6 and find 23 × 10 plus 23 × 6. Mathematicians call splitting a number into helpful parts decomposing.",
      "You can also stack the numbers in the familiar written steps. That shared written recipe is called the standard algorithm; it is one tool, not the only intelligent way.",
      "A second route can catch a mistake. For 864 ÷ 24 = 36, multiply 24 × 36 and see whether it returns to 864.",
    ],
    teacherMoves: [
      "Model 23 × 16 as (23 × 10) + (23 × 6), then connect it to the standard algorithm.",
      "Model 864 ÷ 24 with an estimate, partial quotients, and multiplication to check.",
      "Compare methods by number fit, accuracy, and clarity—not by who finishes first.",
      "Start three weekly 8–10 minute routines: strategy compare, computation/check, and puzzle/game.",
    ],
    studentMoves: ["Make a quick prediction with nearby friendly numbers before doing the exact work.", "Choose a route: draw groups, split a number, stack the written steps, or use a fact you already know.", "Check from a different direction—for division, multiply the answer back.", "Put two correct routes side by side and point to the one you would actually choose for these numbers."],
    supplied: ["Worked multiplication example","Multiplication and division questions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Mini-whiteboards", "Multiplication chart as an access tool", "Base-ten blocks optional"],
    vocabulary: words(
      ["estimate", "a close, sensible value used to predict or check", "23 × 16 is about 20 × 20, or 400"],
      ["efficient", "accurate and reasonably direct for these numbers", "Doubling and halving is efficient for 25 × 16"],
      ["inverse operation", "an operation that undoes another operation", "Multiplication checks division"],
      ["decompose", "break a number into useful parts", "16 becomes 10 + 6"],
    ),
    model: {
  "label": "WORKED EXAMPLE · 23 × 16",
  "prompt": "There are 16 packs with 23 cards in each. How many cards are there?",
  "steps": [
    "Estimate: 23 is near 20 and 16 is near 20. Since 20 × 20 = 400, expect a total around 400 cards.",
    "Split 16 packs into 10 packs and 6 packs. Ten packs hold 23 × 10 = 230 cards. Six packs hold 23 × 6 = 138 cards.",
    "Add both parts: 230 + 138 = 368 cards. Both groups of packs have been counted once.",
    "Check a different way: 23 × (8 × 2) = 184 × 2 = 368. The result matches and is close to the estimate."
  ],
  "conclusion": "Breaking 16 into 10 + 6 makes two easier products. Add them to count all 16 packs."
},
    partnerCards: [
  {
    "title": "MAKE 100",
    "body": "Find 25 × 16. Can you join four groups of 25 to make 100 first? Draw or write the regrouping.",
    "answer": "400; four 25s make 100, and sixteen 25s make four groups of 100."
  },
  {
    "title": "SPLIT 13",
    "body": "Find 47 × 13 by splitting 13 into 10 and 3. Show both smaller products before joining them.",
    "answer": "47 × 10 + 47 × 3 = 470 + 141 = 611."
  },
  {
    "title": "DIVIDE AND CHECK",
    "body": "Find 864 ÷ 24. Start with 30 groups of 24. How much remains, and how many more groups does it make? Multiply to check.",
    "answer": "30 × 24 = 720. Remaining: 864 − 720 = 144 = 6 × 24. There are 30 + 6 = 36 groups. Check: 24 × 36 = 864."
  },
  {
    "title": "SUSPICIOUS OR SOLID?",
    "body": "A card claims 302 × 18 = 5,436. First predict the size using 300 × 20, then check the exact answer.",
    "answer": "Yes. The prediction is about 6,000; exactly, 302 × (20 − 2) = 5,436."
  }
],
    check: [
      { prompt: "Estimate and solve 38 × 24.", answer: "About 40 × 20 = 800; exact 912." },
      { prompt: "Solve 735 ÷ 21 and check.", answer: "35; 21 × 35 = 735." },
      { prompt: "Name why your method fit one problem.", answer: "The explanation connects a number feature to the chosen method." },
    ],
    readinessQuestions: [
      { prompt: "Which is the strongest check for 864 ÷ 24 = 36?", choices: ["36 is a whole number", "24 × 36 = 864", "The answer looks neat"], answer: 1, feedback: "Multiplication directly checks the division." },
    ],
    likelyMisconceptions: ["Treating estimation as optional decoration", "Losing place value in partial products", "Calling the fastest method the best method for everyone"],
    supportRoute: "Choose the card with smaller numbers. Use a multiplication chart, blocks, or a drawing, and explain your moves aloud while a partner records them.",
    extensionRoute: "Solve one problem three ways and identify when each method would become less efficient.",
    spaces: "Use teacher observation. A short strategy recording is optional only when evidence is otherwise thin.",
  },
  {
    id: "fraction-ratio-percent-pack",
    anchorIds: ["fraction-ratio-remix", "sale-lab"],
    title: "Compare fractions, scale ratios and find percents",
    shortTitle: "Fractions, ratios, and friendly percents",
    timing: "Late October–November",
    blocks: "4 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Representing, Comparing, and Ordering Fractions", "Proportional Reasoning", "whole-number percents and percentage discounts"],
    prerequisite: "Recognize common unit fractions and use equal-sized wholes.",
    learningGoal: "rename and compare fractions, multiply both parts of a ratio by the same number, and find a simple percent of an amount.",
    whyBefore: "The Remix and Sale Lab ask students to apply several representations. This workshop gives each representation a concrete and visual meaning first.",
    background: ["Half of a sticky note is not the same amount as half of a poster. Before comparing fractions, check that the wholes are the same size.", "Lay down seven quarter-strips. Four quarters make one whole and three remain, so 7/4 and 1 3/4 are two names for the same amount.", "Place 2 blue tiles beside 3 gold tiles. The comparison 2 blue to 3 gold is written 2:3 and is called a ratio.", "Shade 25 tiny squares on a 100-square grid. That is 25 out of 100, or 25 percent; ‘percent’ means ‘out of 100.’"],
    teacherMoves: ["Build 7/4 with fraction strips and rename it 1 3/4.", "Compare 5/6 and 7/9 with a benchmark and then a common representation.", "Grow 2:3 through whole batches: 2:3, 4:6, 6:9.", "Shade 25/100 and connect 25% = 1/4 = 0.25."],
    studentMoves: ["Build seven quarters, circle each complete whole, and write both names: 7/4 and 1 3/4.", "Place two fractions beside a one-half strip or on the same number line before deciding which is larger.", "Repeat the whole 2-blue-and-3-gold batch to make 4:6 and 6:9 without changing its colour balance.", "Shade 10%, 25%, 50%, and 75% on hundred grids, then fold or divide a price to find the matching discount."],
    supplied: ["Seven-quarters diagram","Fraction comparison and ratio examples","Hundred grid","Saving-plan question","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Crayons or highlighters", "Fraction strips or Cuisenaire rods optional", "Mini-whiteboards"],
    vocabulary: words(
      ["improper fraction", "a fraction with a numerator at least as large as its denominator", "7/4 is 1 3/4"],
      ["mixed number", "a whole number and a fraction together", "2 1/3"],
      ["ratio", "a comparison between two quantities", "2 red tiles for every 3 blue tiles is 2:3"],
      ["percent", "a comparison out of 100", "25% means 25 out of 100"],
    ),
    model: {
  "label": "WORKED EXAMPLES · FRACTIONS, RATIOS AND PERCENTS",
  "prompt": "What changes when we rename a fraction or make a larger batch?",
  "steps": [
    "Seven quarter pieces make one group of four with three pieces left. Four quarters make one whole, so 7/4 = 1 3/4. Check: 1 × 4 + 3 = 7 quarters.",
    "To compare 5/6 and 7/9, divide equal-sized wholes into eighteenth parts. 5/6 = 15/18 and 7/9 = 14/18. Therefore 5/6 is greater.",
    "A batch has 2 blue tiles for every 3 gold tiles. Repeat the complete batch three times: 2 × 3 = 6 blue and 3 × 3 = 9 gold. The ratio 6:9 has the same colour proportions as 2:3.",
    "Shade 25 of 100 equal squares. This is 25/100 = 1/4 = 0.25 = 25%. The fraction, decimal and percent name the same part of one whole.",
    "Find 25% of $48: one quarter of $48 is $48 ÷ 4 = $12. A 25% discount saves $12, so the sale price is $48 − $12 = $36."
  ],
  "conclusion": "A fraction can have different names for the same amount. An equivalent ratio keeps the same proportions. A percent compares an amount with 100."
},
    partnerCards: [
      { title: "RENAME", body: "Build 11/4, then write it as a mixed number.", answer: "2 3/4" },
      { title: "COMPARE", body: "Which is greater: 5/6 or 7/9? Show a fair method.", answer: "5/6; 15/18 > 14/18." },
      { title: "KEEP THE RATIO", body: "A mix uses 2 blue parts for every 3 yellow parts. Complete 2:3 = 6:__.", answer: "9" },
      { title: "FRIENDLY DISCOUNT", body: "$48 is discounted by 25%. Find the discount and sale price.", answer: "$12 discount; $36 sale price." },
    ],
    check: [
  {
    "prompt": "Write 7/4 as a mixed number. Then write 1 2/3 as an improper fraction. Show how you grouped the parts.",
    "answer": "7/4 = 1 3/4 because 7 = 4 + 3. 1 2/3 = 5/3 because one whole is 3/3 and 3/3 + 2/3 = 5/3."
  },
  {
    "prompt": "Order 7/4, 1 2/3, 2 and 9/4 from least to greatest. Show a common denominator or number line.",
    "answer": "1 2/3, 7/4, 2, 9/4. In twelfths: 20/12, 21/12, 24/12, 27/12."
  },
  {
    "prompt": "Order 3/4, 5/8 and 7/10 from least to greatest. Show a method.",
    "answer": "5/8, 7/10, 3/4. In fortieths: 25/40, 28/40, 30/40."
  },
  {
    "prompt": "Complete 4:5 = 12:__. Explain why the ratio stays equivalent.",
    "answer": "15. Both parts are multiplied by 3: 4 × 3 = 12 and 5 × 3 = 15."
  },
  {
    "prompt": "Find 50% of $36. Explain using a fraction.",
    "answer": "50% = 1/2, and $36 ÷ 2 = $18."
  },
  {
    "prompt": "A fictional class saves $6 each week for an art kit with a sale price of $36. How many weeks will it take? How much will be saved after 4 weeks?",
    "answer": "$36 ÷ $6 = 6 weeks. After 4 weeks: 4 × $6 = $24, with $12 still needed."
  }
],
    readinessQuestions: [
      { prompt: "Which equals 25%?", choices: ["1/2", "1/4", "3/4"], answer: 1, feedback: "25 out of 100 simplifies to 1 out of 4." },
      { prompt: "Which ratio is equivalent to 2:3?", choices: ["4:5", "4:6", "6:6"], answer: 1, feedback: "Both parts were multiplied by 2." },
    ],
    likelyMisconceptions: ["Comparing denominators without considering fraction size", "Adding the same number to both parts of a ratio", "Subtracting the percent number as dollars"],
    supportRoute: "Use equal-length fraction strips. Make one whole from four quarters, then add three quarters to show 7/4. For ratios, repeat one complete 2-blue-and-3-gold batch. For 25%, divide the whole into four equal parts.",
    extensionRoute: "Find a missing whole or percentage and justify why more than one representation agrees.",
    spaces: "Keep practice local. The Sale Lab budget can be the selected end evidence.",
  },
  {
    id: "decimal-operations-pack",
    anchorIds: ["decimal-dispatch", "sale-lab"],
    title: "Multiply and divide decimals using place value",
    shortTitle: "Decimal operations workshop",
    timing: "November–December",
    blocks: "4 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Representing, Estimating, and Comparing Decimal Numbers", "Multiplying and Dividing With Decimal Numbers"],
    prerequisite: "Read place value to thousandths and multiply or divide whole numbers with a strategy.",
    learningGoal: "estimate, multiply and divide decimals, then check the answer using place value and the units in the problem.",
    whyBefore: "Decimal Dispatch is an error-analysis application. Students need a base-ten or place-value model and a guided written method before auditing invoices.",
    background: ["In $2.35, the 2 means two dollars, the 3 means three tenths of a dollar or 30 cents, and the 5 means five hundredths or 5 cents. A digit’s position gives it its value.", "Six notebooks at a little more than $2 each must cost a little more than $12. Make that quick size prediction before multiplying 6 × 2.35 exactly.", "If $7.20 is shared equally among 9 people, each share must be less than one dollar. An answer of $8.00 cannot fit the story, even if a calculator-looking display says it does."],
    teacherMoves: ["Represent 0.125 × 3 with a thousandths grid or place-value chart.", "Connect the model to 125 thousandths × 3 = 375 thousandths = 0.375.", "Model 7.2 ÷ 9 as 72 tenths shared among 9 groups = 8 tenths.", "Use an estimate and context to reject a misplaced decimal."],
    studentMoves: ["Build or shade the amount on a tenths, hundredths, or thousandths grid and label what one tiny part is worth.", "Say a quick size prediction in ordinary language: ‘six groups of just over two will be just over twelve.’", "Find the exact answer with the grid, a place-value chart, or clear written steps.", "Put the unit back into the answer—dollars, metres, or litres—and reject any result that makes the story impossible."],
    supplied: ["Place-value calculation model","Decimal questions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Base-ten blocks optional", "Grid paper", "Calculator only after an estimate and method"],
    vocabulary: words(
      ["decimal", "a way to write parts of a whole using place value", "0.375 is 375 thousandths"],
      ["thousandth", "one of one thousand equal parts", "0.001"],
      ["reasonable", "sensible for the numbers and situation", "7.2 ÷ 9 must be less than 1"],
      ["place value", "the value a digit has because of its position", "The 7 in 0.72 means seven tenths"],
    ),
    model: {
  "label": "WORKED EXAMPLE · $7.20 ÷ 9",
  "prompt": "Nine people share $7.20 equally. How much does each person receive?",
  "steps": [
    "Estimate: $7.20 is less than $9. If nine people share it equally, each person gets less than $1.",
    "Rename $7.20 as 720 cents. Divide 720 by 9: 72 ÷ 9 = 8, so 720 ÷ 9 = 80.",
    "Each person receives 80 cents, or $0.80. The same calculation in tenths is 72 tenths ÷ 9 = 8 tenths.",
    "Check: 9 × $0.80 = $7.20. The total is correct, and each share is less than $1."
  ],
  "conclusion": "Keep track of the unit as you calculate: 80 cents is $0.80. The multiplication check returns the original amount."
},
    partnerCards: [
  {
    "title": "THREE TINY PIECES",
    "body": "Shade 0.125 three times on a thousandths grid, then write the total.",
    "answer": "0.375"
  },
  {
    "title": "SHARE $7.20",
    "body": "Nine people share $7.20 equally. Explain why each share must be less than $1 before calculating.",
    "answer": "$0.80"
  },
  {
    "title": "NOTEBOOK INVOICE",
    "body": "Six notebooks cost $2.35 each. The total must be between 6 × $2 and 6 × $3. Split $2.35 into dollars and cents, then find the exact total.",
    "answer": "Between $12 and $18. Six lots of $2 make $12; six lots of 35 cents make 210 cents, or $2.10. Total: $14.10."
  },
  {
    "title": "DECIMAL RESCUE",
    "body": "A card says 4.8 ÷ 6 = 8. Draw 48 tenths shared into six groups and repair the answer.",
    "answer": "0.8; 48 tenths ÷ 6 = 8 tenths."
  }
],
    check: [
      { prompt: "Estimate and solve 3.6 × 4.", answer: "About 4 × 4 = 16; exact 14.4." },
      { prompt: "Solve 5.25 ÷ 5 and check.", answer: "1.05; 1.05 × 5 = 5.25." },
      { prompt: "Explain why 0.4 × 3 cannot equal 0.012.", answer: "Four tenths × 3 is twelve tenths, or 1.2; 0.012 is far below the estimate." },
    ],
    readinessQuestions: [
      { prompt: "Which is the best estimate for 6 × 2.35?", choices: ["About 1", "About 12–15", "About 140"], answer: 1, feedback: "Six groups of a little more than 2 is a little more than 12." },
      { prompt: "What is 7.2 ÷ 9?", choices: ["8", "0.8", "0.08"], answer: 1, feedback: "72 tenths shared among 9 groups gives 8 tenths." },
    ],
    likelyMisconceptions: ["Counting decimal places without understanding the model", "Assuming multiplication always makes larger", "Using a calculator result without checking the units or estimate"],
    supportRoute: "Begin with tenths only. Colour each place-value column differently and keep the grid beside your written calculation so every digit has a visible home.",
    extensionRoute: "Create and repair an invoice error that looks plausible until an estimate exposes it.",
    spaces: "No separate post; use the later budget or invoice evidence if needed.",
  },
  {
    id: "collect-summarize-data-pack",
    anchorIds: ["graph-story-lab"],
    title: "Organize data and read a graph",
    shortTitle: "Collect and summarize data",
    timing: "February",
    blocks: "3 × 40–55 min",
    role: "MATHUP / WNCP BRIDGE",
    readinessLevel: "full",
    mathUpTopics: ["WNCP_Collecting and Summarizing Data", "Graphing Data"],
    prerequisite: "Read a table and count with tallies.",
    learningGoal: "write a question that can be counted or measured, organize the results, and make a graph with a clear scale.",
    whyBefore: "Graph Story Lab currently begins with supplied data. This pack restores the missing question, collection, and organization stage while keeping personal information out of the task.",
    background: ["‘Is our schoolyard good?’ is too foggy to count. ‘How many of 8 marked seats are shaded at noon?’ tells us exactly what to observe, where, and when.", "If one group checks at 9:00 and another at noon, their shade counts do not mean the same thing. Use the same rule for every spot so the comparison is fair.", "A graph of one noon in September can show which marked spots were shadier that day. It cannot tell us which spot is coolest in June or why the shade appeared."],
    teacherMoves: ["Sort four questions: answerable, vague, biased, or private.", "Model a consistent count using the supplied schoolyard shade data.", "Turn raw values into a tally/frequency table and check the total.", "Choose intervals and a scale that show the data without distortion."],
    studentMoves: ["Turn one foggy question into a countable one by naming what, where, and when.", "Write one collection rule that every team will follow, such as ‘check each marked seat at noon for one minute.’", "Collect a small non-personal set with clipboards or use the supplied schoolyard cards.", "Make tally marks first, then a table, then a graph with equal steps along the scale.", "Trade graphs and highlight one sentence the numbers support; cross out one sentence that asks the graph to know too much."],
    supplied: ["Six fictional counts","Frequency display and graph directions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Clipboards optional", "Grid paper", "Pencil and ruler"],
    vocabulary: words(
      ["data question", "a question that can be answered by collecting information", "How many minutes of shade does each marked spot receive from noon to 1:00?"],
      ["category", "a group used to organize data", "sun, partial shade, full shade"],
      ["frequency", "how many times a value or category occurs", "The value 5 appears three times, so its frequency is 3"],
      ["bias", "a feature that unfairly pushes results in one direction", "Only asking basketball club members about favourite sports"],
    ),
    model: {
  "label": "WORKED EXAMPLE · SIX COUNTS",
  "prompt": "A fictional class counts shaded seats at six marked areas at noon: 3, 5, 5, 7, 10, 5. How often does each count occur?",
  "steps": [
    "Use one counting rule for every area: count a seat as shaded only if its whole seat is in shade at noon. Each number is one area's shaded-seat count.",
    "List the different values in order: 3, 5, 7, 10. Tally each of the six readings once.",
    "Write the frequencies: 3 occurs once; 5 occurs three times; 7 occurs once; 10 occurs once. Check: 1 + 3 + 1 + 1 = 6 readings.",
    "Draw a frequency bar graph. Label the horizontal axis 'Shaded seats in an area' with categories 3, 5, 7, 10. Label the vertical axis 'Number of areas' from 0 to 3 in steps of 1.",
    "The most common count is 5 shaded seats: three of the six areas have that count. These observations do not tell us which areas stay shaded all day."
  ],
  "conclusion": "A frequency tells how many times a value occurs. Its total must match the number of readings you started with."
},
    partnerCards: [
      { title: "WE CAN COUNT THIS", body: "Could we answer ‘How many of 8 marked seats are shaded at noon?’ with one careful observation? Explain.", answer: "Yes, if all groups use the same eight seats, time, and shade rule." },
      { title: "CLEAR THE FOG", body: "‘Is our schoolyard good?’ is too broad. Rewrite it so a group could count or measure one thing at one place and time.", answer: "Example: How many minutes of shade does each marked bench receive from 12:00 to 1:00?" },
      { title: "THE QUESTION IS PUSHING", body: "What is unfair about ‘Why is the sunny area the best place to sit?’ Rewrite it without choosing the answer first.", answer: "It assumes sunny is best. Ask: Which marked area do students choose at lunch, and what shade does each have?" },
      { title: "MESSY NUMBERS", body: "The readings are 3, 5, 5, 7, 10, 5. Tally how often each number appears and make sure the total is still six.", answer: "3:1, 5:3, 7:1, 10:1; total 6." },
    ],
    check: [
  {
    "prompt": "Organize 3, 5, 5, 7, 10, 5 in a frequency table. Check the total.",
    "answer": "Value 3: frequency 1; 5: 3; 7: 1; 10: 1. Total 6."
  },
  {
    "prompt": "For a bar graph of that frequency table, label both axes and choose a useful vertical scale.",
    "answer": "Horizontal: observed value (categories 3, 5, 7, 10). Vertical: frequency, from 0 to 3 in steps of 1. A larger clearly labelled equal-interval scale is also valid."
  },
  {
    "prompt": "A learner says 'Most results are 10.' Use the data to explain the mistake.",
    "answer": "Only one of six readings is 10. The most common reading is 5, occurring three times. Three of six is half, not more than half."
  }
],
    readinessQuestions: [
      { prompt: "Which question is safest and most answerable?", choices: ["Who in class has the most money?", "How many marked garden spots are shaded at noon?", "Why is our schoolyard bad?"], answer: 1, feedback: "It is specific, observable, and does not collect private information." },
      { prompt: "What must graph intervals do?", choices: ["Change whenever convenient", "Stay equal along an axis", "Hide zero every time"], answer: 1, feedback: "Equal intervals make the scale readable and honest." },
    ],
    likelyMisconceptions: ["Collecting personal data because it feels easy", "Changing the collection rule halfway through", "Claiming cause from a small descriptive data set"],
    supportRoute: "Use the supplied six-number set and the graph with labels already started. Finish aloud: ‘The numbers show…’ and ‘These numbers cannot tell us…’",
    extensionRoute: "Compare two collection methods or show the same data with two valid scales and explain how the first impression changes.",
    spaces: "Optional only if an individual environmental graph is needed; reuse Science data rather than creating a duplicate post.",
  },
  {
    id: "single-outcome-probability-pack",
    anchorIds: ["probability-game-audit"],
    title: "Predict chance and compare trial results",
    shortTitle: "Probability foundations",
    timing: "Late February–March",
    blocks: "2 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["WNCP_Probability", "BC_Probability"],
    prerequisite: "Represent a part-to-whole fraction and record repeated results.",
    learningGoal: "find the chance of one outcome, record trials, and explain why results can differ from the prediction.",
    whyBefore: "The game audit is an application. This workshop explicitly teaches sample space and the difference between theoretical and experimental probability first.",
    background: ["On a spinner with four equal sections and one blue section, blue owns 1 of the 4 equally sized landing spaces. The design predicts a 1/4 chance; this is called theoretical probability.", "After 20 real spins, blue might appear 3, 5, or 7 times. The fraction made from what actually happened is called experimental probability.", "Three blue spins in a row can happen without magic or cheating. A short streak is not a promise about the next spin; combining many class trials gives us a steadier picture."],
    teacherMoves: ["List every possible outcome before making a fraction.", "Model a four-section equal spinner and select one outcome only.", "Run 10 class trials, then combine groups to compare 40 or more trials.", "Discuss why fair-looking equipment still needs inspection and evidence."],
    studentMoves: ["Point to and list every place the spinner, die, or bag can land before writing a fraction.", "Choose one result, count its winning places, and write the design’s predicted chance.", "Spin, roll, or draw 20 times and record every result with tally marks—even the surprising ones.", "Pool the class trials, compare the real result with the design prediction, and explain why neither one guarantees the next turn."],
    supplied: ["Four-section spinner diagram","Trial example and probability questions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Coins, dice, or paper clips and pencils for spinners", "Counters"],
    vocabulary: words(
      ["outcome", "one possible result of a chance event", "Rolling a 4 is one die outcome"],
      ["theoretical probability", "a prediction based on all equally likely outcomes", "One 4 on a fair die gives 1/6"],
      ["experimental probability", "the result found from actual recorded trials", "A 4 appeared 7 times in 36 rolls"],
      ["trial", "one performance of a chance event", "One spin is one trial"],
    ),
    model: {
  "label": "WORKED EXAMPLE · ONE BLUE SECTION OUT OF FOUR",
  "prompt": "A fair spinner has four equal sections: blue, red, green and yellow. Must blue occur exactly five times in 20 spins?",
  "steps": [
    "There are four equally likely sections, and one is blue. The probability from the design is 1/4.",
    "One quarter of 20 is 5. This gives an expected count, but it does not guarantee exactly five blue results in 20 spins.",
    "Suppose a trial record shows 3 blue results in 20 spins. The experimental probability is 3/20. Keep all 20 results in the record.",
    "Compare 1/4 = 5/20 with the observed 3/20. They differ by 2 blue results. A short set of trials can vary by chance.",
    "The next spin still has a 1/4 chance of blue if the spinner and method have not changed. More trials give more evidence; they do not guarantee an exact match."
  ],
  "conclusion": "Theoretical probability comes from the design. Experimental probability comes from the results you record."
},
    partnerCards: [
      { title: "ROLL A FOUR", body: "Point to all six faces of a fair die. How many faces show 4, and what fraction of the faces is that?", answer: "One of six faces, so the chance is 1/6." },
      { title: "TWENTY COIN FLIPS", body: "Before flipping, predict the chance of heads. Flip 20 times and keep every result, even if your tally looks strange.", answer: "The coin design predicts 1/2; the actual fraction depends on the 20 flips." },
      { title: "RED SPINNER", body: "A spinner has four equal sections: red, red, blue, green. Colour the red landing spaces and write red’s chance.", answer: "Two of four equal sections are red: 2/4 = 1/2." },
      { title: "FOUR TURNS ARE NOT FOREVER", body: "A player wins 3 of the first 4 turns and claims the game will always give a 75% win rate. What should the class do next?", answer: "Four turns cannot guarantee a long-run result; inspect the game design and run many more trials." },
    ],
    check: [
      { prompt: "Find P(rolling an even number on a fair die).", answer: "3/6 = 1/2." },
      { prompt: "A coin lands heads 12 times in 20 trials. State the experimental probability.", answer: "12/20 = 3/5 or 60%." },
      { prompt: "Why need the two probabilities not match exactly?", answer: "Chance creates variation in finite trials; theoretical probability describes expected long-run behaviour." },
    ],
    readinessQuestions: [
      { prompt: "What comes before finding theoretical probability?", choices: ["List all possible outcomes", "Run only one trial", "Choose the answer you hope for"], answer: 0, feedback: "The denominator comes from the complete set of possible outcomes." },
      { prompt: "A fair coin gives 7 heads in 10 tosses. What is true?", choices: ["The coin must be unfair", "The experimental result is 7/10; more trials are needed", "Theoretical probability changed to 7/10"], answer: 1, feedback: "A short experiment can differ from the theoretical 1/2." },
    ],
    likelyMisconceptions: ["Treating theoretical probability as a guarantee", "Using unequal sections as equally likely", "Changing or discarding an unexpected result"],
    supportRoute: "Start with one coin or a four-part equal spinner. Draw every possible landing place, test only one chosen result, and add your tally to the class total.",
    extensionRoute: "Compare two games with the same theoretical win probability but different designs or rewards.",
    spaces: "Pair with the Probability Game Audit; use one combined post only if selected as the unit evidence.",
  },
  {
    id: "angle-triangle-pack",
    anchorIds: ["geometry-field-lab"],
    title: "Measure angles and name triangles",
    shortTitle: "Angles and triangles workshop",
    timing: "Late March",
    blocks: "3 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Angles", "Triangles"],
    prerequisite: "Identify a vertex and use a ruler to measure side length.",
    learningGoal: "estimate and measure angles, then classify triangles by their side lengths and angles.",
    whyBefore: "The Geometry Field Lab asks students to measure and classify. This workshop explicitly teaches protractor placement, reference angles, and the two triangle naming systems first.",
    background: ["Put two pencils tip-to-tip and open them like a beak. The amount of opening—the turn from one pencil to the other—is the angle; longer pencils do not create a larger angle.", "A square paper corner opens 90°. Fold it in half for about 45°, open it flat for 180°, or measure the larger turn beyond 180° as a reflex angle. These familiar openings help us guess before measuring.", "A triangle with sides 5 cm, 5 cm, and 7 cm is isosceles because two sides match. In this course, isosceles means at least two equal sides, so an equilateral triangle also fits the isosceles family; use equilateral when the more specific name helps.", "Turn the paper sideways or upside down: its side lengths and angles do not change, so its mathematical family does not change."],
    teacherMoves: ["Model centre-on-vertex, baseline-on-ray, and the correct protractor scale.", "Estimate each angle before measuring.", "Sort triangles once by sides and again by angles.", "Construct one triangle from constraints and verify every condition."],
    studentMoves: ["Hold a paper corner beside the projected opening and decide whether the turn is less than, equal to, or greater than 90°.", "Mark the vertex, line up the protractor’s centre and zero line, and write the measured degrees beside the arc.", "Measure or match all three sides and angles before giving the triangle one side name and one angle name.", "Build a triangle from a clue card, trade it, and have a partner mark each clue that the drawing truly satisfies."],
    supplied: ["120° angle diagram with a 90° reference","Angle construction and triangle questions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Protractors", "Rulers", "Plain paper or grid paper"],
    vocabulary: words(
      ["acute angle", "an angle greater than 0° and less than 90°", "45° is acute"],
      ["obtuse angle", "an angle greater than 90° and less than 180°", "120° is obtuse"],
      ["reflex angle", "an angle greater than 180° and less than 360°", "250° is reflex"],
      ["scalene triangle", "a triangle with three different side lengths", "A 4 cm, 5 cm, 6 cm triangle is scalene"],
      ["isosceles triangle", "a triangle with at least two equal side lengths", "A 5 cm, 5 cm, 7 cm triangle is isosceles"],
    ),
    model: {
  "label": "WORKED EXAMPLE · DRAW AND MEASURE 120°",
  "prompt": "How can you draw a 120° angle and check that you used the correct protractor scale?",
  "steps": [
    "Draw a horizontal ray pointing right. Mark its endpoint as the vertex, where the two rays will meet.",
    "Put the protractor centre on the vertex. Line up the first ray with 0°. Use the scale that starts at that 0°.",
    "Follow that scale to 120°. Mark a dot there, then draw the second ray from the vertex through your dot.",
    "Compare with a 90° paper corner. The 120° opening must be wider. If your opening is 60°, you used the other scale.",
    "Name the angle: 120° is greater than 90° and less than 180°, so it is obtuse."
  ],
  "conclusion": "Line up the centre and zero first. An estimate helps catch a reading from the wrong scale."
},
    partnerCards: [
  {
    "title": "WIDER THAN A CORNER",
    "body": "Draw a 120° angle using the worked steps. Ask a partner to estimate whether it is less than or greater than 90°, then measure it without seeing your label.",
    "answer": "Greater than 90°; obtuse; the measurement should be close to 120°. A reading near 60° uses the wrong scale."
  },
  {
    "title": "MATCH THE SIDES",
    "body": "Draw or build a triangle with side lengths 5 cm, 5 cm, and 7 cm. Mark the matching sides. What family name fits?",
    "answer": "Isosceles."
  },
  {
    "title": "SPOT THE SQUARE CORNER",
    "body": "A triangle’s angles are 35°, 55°, and 90°. Mark the square corner and name the triangle by its angles.",
    "answer": "Right triangle."
  },
  {
    "title": "BUILD FROM TWO CLUES",
    "body": "Make a triangle with one square corner and two equal sides. Mark both clues on your drawing before naming it.",
    "answer": "A right isosceles triangle; its angles are 45°, 45°, and 90°."
  }
],
    check: [
  {
    "prompt": "Classify 38° and explain using 90°.",
    "answer": "Acute: 38° is greater than 0° and less than 90°."
  },
  {
    "prompt": "A triangle has sides 6, 6, 6 and angles 60°, 60°, 60°. Name it by its sides and angles.",
    "answer": "Equilateral by sides and acute by angles. It is also isosceles under this class's 'at least two equal sides' definition."
  },
  {
    "prompt": "Name the three protractor placement checks.",
    "answer": "Centre on the vertex; baseline along one ray; read the scale starting at 0° on that ray."
  }
],
    readinessQuestions: [
      { prompt: "Which angle is obtuse?", choices: ["42°", "90°", "128°"], answer: 2, feedback: "128° is between 90° and 180°." },
      { prompt: "A triangle has three different side lengths. What side name fits?", choices: ["Scalene", "Isosceles", "Equilateral"], answer: 0, feedback: "Scalene means all three side lengths differ." },
    ],
    likelyMisconceptions: ["Reading the wrong protractor scale", "Classifying by appearance or orientation", "Giving only one triangle name when both side and angle names are requested"],
    supportRoute: "Use a large projected angle, a paper corner, and two differently coloured rays. Practise with upright triangles first, then turn the same cards sideways to prove their names stay put.",
    extensionRoute: "Use angle sums to find an unknown triangle angle and design the fewest constraints that force one triangle type.",
    spaces: "Classroom field cards; no separate post.",
  },
  {
    id: "polygon-classification-pack",
    anchorIds: ["zoo-design-studio", "space-under-constraints"],
    title: "Classify shapes by their properties",
    shortTitle: "Polygons and quadrilaterals bridge",
    timing: "Early April",
    blocks: "2 × 40–50 min",
    role: "MATHUP / WNCP BRIDGE",
    readinessLevel: "quick",
    mathUpTopics: ["Polygons"],
    prerequisite: "Count straight sides and vertices and recognize a right angle.",
    learningGoal: "use sides, angles and parallel lines to explain which shape families a polygon belongs to.",
    whyBefore: "The Zoo and pavilion projects use complex shapes. This bridge prevents students from choosing formulas by appearance alone and restores the prior Quadrilaterals activity.",
    background: ["Trace a shape with your finger. If the straight sides join all the way around with no gap, it is a polygon; a circle or an open zigzag is not.", "A square has four straight sides, four right angles, two pairs of parallel sides, and four equal sides. Those features let it live in several families at once.", "Arrow marks show sides that stay the same distance apart (parallel). Tiny square corners show 90° meetings (perpendicular). These marks matter more than whether the shape looks tilted."],
    teacherMoves: ["Sort exact shapes by marked properties, not their familiar look.", "Build a nested quadrilateral family map.", "Use the inclusive convention: a trapezoid has at least one pair of parallel sides. Note that some published resources use exactly one pair, so read their definition before comparing answers.", "Test always/sometimes/never statements."],
    studentMoves: ["Cut out the shape cards and first sort them into closed-straight-sided polygons and not-polygons.", "Use rulers, corner cards, and property symbols to mark equal, parallel, and perpendicular sides.", "Place each quadrilateral on every family mat whose rule it passes—even if it belongs in several places.", "Draw one mystery enclosure, hide its picture, and give only enough property clues for another team to identify its families."],
    supplied: ["Shape-family diagram","Shape-property questions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Scissors optional", "Rulers", "Grid paper or geoboards"],
    vocabulary: words(
      ["polygon", "a closed 2D shape made only of straight line segments", "A pentagon is a polygon; a circle is not"],
      ["quadrilateral", "a polygon with four sides", "Squares, rectangles, rhombi, and trapezoids are quadrilaterals"],
      ["trapezoid", "a quadrilateral with at least one pair of parallel sides in our class convention", "A parallelogram also belongs to the inclusive trapezoid family"],
      ["parallel", "lines in the same plane that stay the same distance apart", "Opposite sides of a rectangle are parallel"],
      ["perpendicular", "lines that meet at a right angle", "Adjacent sides of a square are perpendicular"],
      ["rhombus", "a quadrilateral with four equal sides", "A square is a special rhombus"],
    ),
    model: {
  "label": "WORKED EXAMPLE · A SQUARE HAS SEVERAL NAMES",
  "prompt": "Why is every square also a rectangle and a rhombus?",
  "steps": [
    "A square is closed and has four straight sides. It is a polygon and, more specifically, a quadrilateral.",
    "Its opposite sides form two parallel pairs, so it is a parallelogram.",
    "It has four right angles, so it meets the definition of a rectangle.",
    "It has four equal sides, so it also meets the definition of a rhombus.",
    "Our class defines a trapezoid as having at least one pair of parallel sides. A square has two pairs, so it fits that definition too."
  ],
  "conclusion": "A shape can belong to several families. Check each definition against its properties, even when the drawing is turned."
},
    partnerCards: [
  {
    "title": "MYSTERY A",
    "body": "A quadrilateral has two pairs of parallel sides, four equal sides and no right angles. Name its shape families and give a reason.",
    "answer": "Rhombus, parallelogram and trapezoid under the class's inclusive definition. It is also a quadrilateral and polygon. No right angles means it is not a rectangle or square."
  },
  {
    "title": "MYSTERY B",
    "body": "A quadrilateral has four right angles and two pairs of equal opposite sides, but not all four sides are equal. Name its shape families.",
    "answer": "Rectangle, parallelogram and inclusive trapezoid; also quadrilateral and polygon. It is not a rhombus or square because its four sides are not all equal."
  },
  {
    "title": "ALWAYS?",
    "body": "Every square is a rectangle.",
    "answer": "Always, because a square has four right angles."
  },
  {
    "title": "REVERSE?",
    "body": "A rectangle is also a square: always, sometimes, or never?",
    "answer": "Sometimes; when all four sides are equal."
  }
],
    check: [
  {
    "prompt": "Classify a quadrilateral with two parallel pairs and four equal sides but no right angles.",
    "answer": "Rhombus and parallelogram; also an inclusive trapezoid, quadrilateral and polygon. It is not a rectangle or square."
  },
  {
    "prompt": "Why is every square a rectangle?",
    "answer": "A rectangle is a quadrilateral with four right angles. Every square has those properties."
  },
  {
    "prompt": "What definition does our class use for trapezoids?",
    "answer": "A quadrilateral with at least one pair of parallel sides. Some resources use exactly one pair, so check the stated definition."
  }
],
    readinessQuestions: [
      { prompt: "Which property proves a shape is a quadrilateral?", choices: ["Four straight sides in a closed shape", "It looks like a box", "It has one right angle"], answer: 0, feedback: "Quadrilateral means a closed polygon with four sides." },
      { prompt: "Can one shape have more than one correct family name?", choices: ["Yes", "No", "Only if it is rotated"], answer: 0, feedback: "A square belongs to several nested families." },
    ],
    likelyMisconceptions: ["Using one exclusive label for every shape", "Classifying a rotated square as a different shape", "Switching trapezoid definitions without making the convention explicit"],
    supportRoute: "Use six large cut-outs and check one feature at a time: closed, straight sides, side count, equal sides, parallel marks, then square corners. Say: ‘It is a ___ because I can see ___.’",
    extensionRoute: "Find the fewest clues that force one shape or create an impossible clue set and explain the contradiction.",
    spaces: "Fold the classification into the Zoo or pavilion evidence; no separate upload.",
  },
  {
    id: "formula-perimeter-pack",
    anchorIds: ["zoo-design-studio", "space-under-constraints"],
    title: "Find perimeter and area, including an L-shape",
    shortTitle: "Measurement formulas and complex perimeter",
    timing: "Early–mid April",
    blocks: "3 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Developing Measurement Formulas"],
    prerequisite: "Multiply whole numbers and distinguish distance around from space covered.",
    learningGoal: "find the distance around a shape, find the area inside it, and choose the correct units for each.",
    whyBefore: "Projects should not be the first place students encounter formulas or complex perimeter. This pack makes the structure visible before symbolic use.",
    background: ["Run a string once around the edge of a desk mat: that outside trip is perimeter, so we measure it in centimetres or metres.", "Cover the same mat with 1-by-1 paper squares: the number needed to hide the surface is area, so we use square centimetres or square metres.", "On an 8-by-3 rectangle, counting 8 squares in each of 3 rows gives 8 × 3. A formula is simply that repeated pattern written as a short reusable rule.", "Letters such as l, w, b, and h are labels for measurements, not secret code. Write the word rule before swapping in the letters."],
    teacherMoves: ["Count a tiled rectangle by ones, rows, and repeated groups.", "Trace the boundary separately from the covered tiles.", "Build a complex shape, infer missing sides from aligned lengths, and add only the outside boundary.", "Write word rules before letter rules and test each on a new model."],
    studentMoves: ["Build an 8-by-3 rectangle with tiles, count them one by one, then count 3 rows of 8.", "Trace the outside boundary in one colour and shade the covered surface in another.", "On an L-shape, extend imaginary straight lines to find the missing side lengths before walking the entire outside edge.", "Say the rule in words, replace the measurement words with letters, and test it on a different paper shape."],
    supplied: ["Dimensioned L-shape","Perimeter and area questions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Square tiles", "Rulers", "Grid paper", "Unit cubes for the volume preview"],
    vocabulary: words(
      ["perimeter", "the total distance around a 2D shape", "A 3 cm by 8 cm rectangle has perimeter 22 cm"],
      ["area", "the amount of 2D surface covered", "A 3 cm by 8 cm rectangle has area 24 cm²"],
      ["formula", "a rule written with words or symbols", "A = b × h"],
      ["dimension", "a measurement such as length, width, or height", "The prism dimensions are 4 cm, 3 cm, and 5 cm"],
      ["square unit", "a unit that covers a 1-by-1 square", "cm²"],
    ),
    model: {
  "label": "WORKED EXAMPLE · AN L-SHAPE",
  "prompt": "A 4 cm by 3 cm corner is cut from a 10 cm by 8 cm rectangle. What are the new perimeter and area?",
  "steps": [
    "Start at the upper-left corner. The remaining top edge is 10 − 4 = 6 cm. The remaining right edge is 8 − 3 = 5 cm.",
    "Trace the whole boundary once, including the two edges of the cut-out. The six lengths are 6, 3, 4, 5, 10 and 8 cm.",
    "Add all six lengths: 6 + 3 + 4 + 5 + 10 + 8 = 36 cm. This is the perimeter.",
    "For area, start with the full rectangle: 10 × 8 = 80 cm². Subtract the removed corner: 4 × 3 = 12 cm². The remaining area is 80 − 12 = 68 cm²."
  ],
  "conclusion": "Perimeter follows every boundary edge. Area measures the surface that remains."
},
    partnerCards: [
  {
    "title": "RECTANGLE",
    "body": "8 cm by 3 cm: find perimeter and area and label units.",
    "answer": "P = 22 cm; A = 24 cm²."
  },
  {
    "title": "THE HIDDEN EDGE",
    "body": "Draw a 10 cm by 8 cm rectangle. Remove a 4 cm by 3 cm corner from the upper right. Label every edge of the remaining L-shape. Find its perimeter and area.",
    "answer": "Clockwise from the upper-left corner: 6, 3, 4, 5, 10, 8 cm. The missing lengths are 10 − 4 = 6 and 8 − 3 = 5. Perimeter: 6 + 3 + 4 + 5 + 10 + 8 = 36 cm. Area: 10 × 8 − 4 × 3 = 68 cm²."
  },
  {
    "title": "WRONG RULE, RIGHT REPAIR",
    "body": "A card says perimeter = length × width. Trace a finger around the rectangle and rewrite the rule to include all four edges.",
    "answer": "P = length + width + length + width, or P = 2l + 2w. Multiplying length × width finds area."
  },
  {
    "title": "SAME AREA",
    "body": "Make two rectangles with area 24 square units and compare perimeters.",
    "answer": "Examples 4×6 has P20; 3×8 has P22."
  }
],
    check: [
  {
    "prompt": "Find the perimeter and area of an 8 cm by 3 cm rectangle. Include units.",
    "answer": "Perimeter = 22 cm. Area = 24 cm²."
  },
  {
    "prompt": "Remove a 4 cm by 3 cm upper-right corner from a 10 cm by 8 cm rectangle. Label all six edges and find the L-shape's perimeter.",
    "answer": "Edges: 6, 3, 4, 5, 10, 8 cm. Perimeter = 36 cm. Include the two edges along the cut-out; they are now part of the boundary."
  },
  {
    "prompt": "Why do perimeter and area use different units?",
    "answer": "Perimeter measures length along the boundary, so it uses cm. Area counts one-centimetre squares, so it uses cm²."
  },
  {
    "prompt": "A prism has 4 × 3 unit cubes in each layer and 5 layers. Show how you find its volume.",
    "answer": "4 × 3 = 12 cubes per layer; 12 × 5 = 60 cubic units."
  }
],
    readinessQuestions: [
      { prompt: "Which unit fits area?", choices: ["cm", "cm²", "cm³"], answer: 1, feedback: "Area covers a two-dimensional surface with square units." },
      { prompt: "What should happen before choosing a formula?", choices: ["Name the attribute being measured", "Multiply every number shown", "Ignore the diagram"], answer: 0, feedback: "First decide whether the job is distance, covering, or filling." },
    ],
    likelyMisconceptions: ["Multiplying every pair of dimensions", "Adding interior edges to perimeter", "Writing square units for perimeter"],
    supportRoute: "Trace the edge with string for perimeter and cover the inside with tiles for area. Colour one complete row before using multiplication, and write the rule in words before letters.",
    extensionRoute: "Find a missing dimension from a known area and compare rectangles with equal area but different perimeters.",
    spaces: "Keep practice local and apply the rules inside one selected design project.",
  },
  {
    id: "area-recompose-pack",
    anchorIds: ["zoo-design-studio", "space-under-constraints"],
    title: "Find the area of triangles and other quadrilaterals",
    shortTitle: "Area of parallelograms, triangles, and trapezoids",
    timing: "Mid April",
    blocks: "3 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["BC_Areas of Parallelograms, Triangles, and Trapezoids"],
    prerequisite: "Find rectangle area and identify perpendicular lines.",
    learningGoal: "use a base and its perpendicular height to find the area of a parallelogram, triangle or trapezoid.",
    whyBefore: "The current field and design activities mention these areas but do not teach them. This pack supplies the required cut-and-move reasoning and keeps perpendicular height visible.",
    background: ["Cut the triangular tip from one end of a paper parallelogram and slide it to the other end. The pieces make a rectangle without adding, losing, overlapping, or stretching paper, so the area stays the same.", "Choose a bottom side as the base. The height is the shortest straight climb to the opposite side and must meet the base at a square 90° corner; a longer slanted edge is not that climb.", "Two matching triangles can join into one parallelogram. One triangle therefore owns half the paired area, which is where the divide-by-2 rule comes from.", "Two matching trapezoids can also join into a parallelogram. Cutting and joining lets us understand the rule instead of treating letters as a spell."],
    teacherMoves: ["Cut and slide a parallelogram corner to make a rectangle.", "Pair two matching triangles to make a parallelogram and explain the half.", "Join two matching trapezoids to make a parallelogram and derive the average-of-bases rule.", "Circle the measurement not used on slanted-side trap cards."],
    studentMoves: ["Cut and slide the coloured corner of a paper parallelogram until it becomes a rectangle; label the unchanged base and 90° height.", "Pair two matching paper triangles, trace the new parallelogram, then separate them to see why one triangle is half.", "Build the trapezoid rule with two matching cut-outs before using any letter formula.", "Choose one slanted Zoo habitat, mark the base and true 90° height, and show its area beside the design."],
    supplied: ["Parallelogram cut-and-slide diagram","Paired triangle and trapezoid diagrams","Four practice questions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Scissors", "Grid paper", "Rulers", "Highlighters"],
    vocabulary: words(
      ["base", "the chosen side used with its perpendicular height", "The bottom 9 cm side can be the base"],
      ["perpendicular height", "the shortest distance to the opposite side measured at 90°", "The 4 cm vertical segment, not the slanted side"],
      ["parallelogram", "a quadrilateral with two pairs of parallel sides", "A slanted parallelogram can share a base and height with a rectangle"],
      ["trapezoid", "a quadrilateral with at least one pair of parallel sides in our class convention", "Parallelograms fit the inclusive trapezoid family"],
      ["recompose", "rearrange pieces to make a new shape without changing total area", "Move a triangle from one side of a parallelogram to the other"],
    ),
    model: {
  "label": "WORKED EXAMPLE · WHY TRIANGLE AREA IS HALVED",
  "prompt": "A triangle has a 12 cm base and a perpendicular height of 5 cm. What is its area?",
  "steps": [
    "Mark the 12 cm base. Draw the 5 cm height at a right angle to the base. Use this perpendicular height, not a sloping side.",
    "Make an identical copy of the triangle. Turn one copy and join the two triangles into a parallelogram with no gaps or overlaps.",
    "The parallelogram has the same 12 cm base and 5 cm height. Its area is 12 × 5 = 60 cm².",
    "The two triangles have equal areas, so one triangle has half of 60 cm²: 60 ÷ 2 = 30 cm².",
    "Write the rule: triangle area = base × perpendicular height ÷ 2. For this triangle, 12 × 5 ÷ 2 = 30 cm²."
  ],
  "conclusion": "Two matching triangles form a parallelogram. One triangle has half the area of that parallelogram."
},
    partnerCards: [
      { title: "SLIDE THE CORNER", body: "A parallelogram has a 9 cm base, a 4 cm square-corner height, and a 5 cm slanted edge. Cut and slide the corner, then find the area.", answer: "36 cm²; the moved shape is a 9-by-4 rectangle, and the 5 cm slanted edge is not the height." },
      { title: "FIND ITS TWIN", body: "Make two matching triangles with 12 cm bases and 5 cm square-corner heights. Join them, find the pair’s area, then take half.", answer: "The pair is 12 × 5 = 60 cm², so one triangle is 30 cm²." },
      { title: "DOUBLE THE TRAPEZOID", body: "Join two copies of a trapezoid with parallel sides 7 cm and 11 cm and a 4 cm square-corner height. Use the joined shape to find one copy’s area.", answer: "((7 + 11) ÷ 2) × 4 = 36 cm²." },
      { title: "HEIGHT IMPOSTOR", body: "One label points to a 6 cm slanted edge and another to a 4 cm line meeting the base at a square corner. Which one is the height?", answer: "Use 4 cm; height must meet the chosen base at 90°." },
    ],
    check: [
  {
    "prompt": "Find the area of a parallelogram with base 9 cm and perpendicular height 4 cm. Show your calculation.",
    "answer": "9 × 4 = 36 cm²."
  },
  {
    "prompt": "Find the area of a triangle with base 12 cm and perpendicular height 5 cm. Explain why you divide by 2.",
    "answer": "12 × 5 ÷ 2 = 30 cm². Two matching triangles form a parallelogram with that base and height."
  },
  {
    "prompt": "Find the area of a trapezoid with parallel sides 7 cm and 11 cm and perpendicular height 4 cm.",
    "answer": "(7 + 11) × 4 ÷ 2 = 36 cm². Two copies form a parallelogram with base 18 cm and height 4 cm."
  }
],
    readinessQuestions: [
      { prompt: "Which measurement must meet the base at 90°?", choices: ["Perpendicular height", "Any slanted side", "Perimeter"], answer: 0, feedback: "Area formulas use perpendicular height." },
      { prompt: "Why is triangle area divided by 2?", choices: ["Triangles have two sides", "Two matching triangles form a parallelogram", "All areas are halved"], answer: 1, feedback: "One triangle is half of the paired parallelogram." },
    ],
    likelyMisconceptions: ["Using the slanted side as height", "Forgetting the half for triangle or trapezoid derivation", "Using linear rather than square units"],
    supportRoute: "Use pre-cut matching colours and whole-number lengths. First turn a parallelogram into a rectangle; only then pair two triangles. Save the double-trapezoid puzzle for last.",
    extensionRoute: "Find a missing base or height, build a composite enclosure, or prove that different slants with the same base and height have equal area.",
    spaces: "Use one Zoo or pavilion calculation in the combined April design evidence; no formula worksheet upload.",
  },
  {
    id: "volume-capacity-pack",
    anchorIds: ["space-under-constraints"],
    title: "Calculate volume and container capacity",
    shortTitle: "Volume and capacity workshop",
    timing: "Late April–early May",
    blocks: "3 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["BC_Capacity and Volume"],
    prerequisite: "Multiply whole numbers, count equal rows, and find the area of a rectangle.",
    learningGoal: "count cube layers to find a prism's volume and use inside measurements to work out a container's capacity.",
    whyBefore: "The final pavilion brief currently asks for volume and capacity without prior instruction. This pack restores cube models, unit relationships, and an in-class route before the project.",
    background: ["Build a small box-shape from 1 cm cubes. The number of cubes filling that three-dimensional space is its volume, measured in cubic centimetres (cm³).", "A solid block takes up volume. An open container also has capacity—the amount of material or liquid that can fit inside it.", "A perfectly measured inside space of 1 cm by 1 cm by 1 cm holds 1 mL. A real bottle has walls, so measuring only its outside cannot reveal its exact capacity.", "If the bottom layer holds 5 × 3 = 15 cubes and the model has 4 layers, it contains 15 × 4 = 60 cubes altogether."],
    teacherMoves: ["Build one rectangular prism and count cubes in a base layer, then count layers.", "Connect cubes per layer × layers to length × width × height.", "Sort examples into solid volume, container capacity, or both.", "Use exact internal dimensions and unit relationships before applying them to storage."],
    studentMoves: ["Build or draw one complete bottom layer and write how many cubes fit in its rows.", "Stack or sketch the remaining layers, then multiply cubes per layer by the number of layers and label cm³.", "Sort classroom examples: use mL or L for what a container holds, and cm³ or m³ for space a solid or room takes up.", "Rebuild the same number of cubes into a long-low prism and a short-tall prism to see volume stay equal while the shape changes.", "Design one shelf box or storage container for the pavilion and show both its dimensions and volume or capacity."],
    supplied: ["Cube-layer calculation model","Volume and capacity questions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Unit cubes if available", "Small classroom containers optional", "Rulers", "Grid paper"],
    vocabulary: words(
      ["volume", "the amount of three-dimensional space an object occupies", "A 5×3×4 cm prism has volume 60 cm³"],
      ["capacity", "the amount a container can hold", "An ideal 60 cm³ inside space holds 60 mL"],
      ["cubic unit", "a unit shaped like a 1-by-1-by-1 cube", "cm³"],
      ["layer", "one level of cubes in a solid", "A 5-by-3 base has 15 cubes per layer"],
      ["rectangular prism", "a 3D solid with rectangular faces", "A box shape with length, width, and height"],
    ),
    model: {
  "label": "WORKED EXAMPLE · 15 CUBES IN EACH OF FOUR LAYERS",
  "prompt": "A rectangular box measures exactly 5 cm by 3 cm by 4 cm inside. What is its capacity?",
  "steps": [
    "Picture 1 cm cubes covering the inside base. There are 3 rows of 5 cubes: 5 × 3 = 15 cubes in one layer.",
    "The inside height is 4 cm, so four one-centimetre layers fit. Multiply: 15 × 4 = 60 cubes.",
    "Each cube occupies 1 cm³. The inside volume is 5 × 3 × 4 = 60 cm³.",
    "An inside volume of 1 cm³ holds 1 mL. Therefore the box has a capacity of 60 mL, assuming these are exact inside dimensions."
  ],
  "conclusion": "Volume counts cubes in all three dimensions. Capacity is how much a container can hold, so use its inside space."
},
    partnerCards: [
      { title: "BUILD TWO FLOORS", body: "Make a bottom floor of 4 cubes by 3 cubes. Stack one matching floor on top. How many cubes fill the model?", answer: "12 cubes per layer × 2 layers = 24 cubic units." },
      { title: "RESHAPE 60 CUBES", body: "One prism is 6 × 2 × 5 and another is 4 × 3 × 5. Find cubes per layer and layers for each. Do they use the same total?", answer: "Yes. Both have volume 60 cubic units." },
      { title: "PICK THE UNIT THAT FITS", body: "Choose units for water in a lunch bottle, space inside a classroom, and a small cube model. Explain each choice.", answer: "mL or L for the bottle; m³ for the classroom; cm³ for the cube model." },
      { title: "HOW MANY LAYERS?", body: "A 5-by-3 bottom holds 15 cubes. The full box holds 60 cubes. How many matching layers are stacked?", answer: "4 layers, because 15 × 4 = 60." },
    ],
    check: [
      { prompt: "Find volume: 5 cm × 3 cm × 4 cm.", answer: "60 cm³." },
      { prompt: "How much can the ideal 60 cm³ inside space hold?", answer: "60 mL." },
      { prompt: "Explain volume versus capacity.", answer: "Volume is space occupied; capacity is how much a container can hold." },
    ],
    readinessQuestions: [
      { prompt: "A 4×3 base has 5 layers. How many cubes?", choices: ["12", "20", "60"], answer: 2, feedback: "12 cubes per layer × 5 layers = 60." },
      { prompt: "Which unit fits a small prism's volume?", choices: ["cm", "cm²", "cm³"], answer: 2, feedback: "Volume uses cubic units." },
    ],
    likelyMisconceptions: ["Counting only visible cubes", "Using square units for volume", "Treating outside container dimensions as exact capacity"],
    supportRoute: "Use real cubes or printed cube floors. Colour the bottom layer one colour and each copied layer another; keep every side length at 5 or less until the layers are easy to see.",
    extensionRoute: "Find missing dimensions or design three different whole-centimetre internal dimensions for a 1 L rectangular container.",
    spaces: "The in-class core is complete. A take-home measurement extension is optional; feed one result into the pavilion post.",
  },
];

export const mathYearSequence: MathYearBlock[] = [
  { timing: "September · Weeks 1–2", focus: "Magnitude and place value", blocks: "7–9 blocks", mathUpTopics: ["Whole Numbers Greater Than One Million", "Representing, Estimating, and Comparing Decimal Numbers"], lessonIds: ["magnitude-place-value-pack", "magnitude-gallery"], fluency: "Place-value talks and benchmark estimates", check: "Place, compare, and justify one value on an appropriate scale.", spaces: "No post" },
  { timing: "September–October · Weeks 3–6", focus: "Whole-number operations and fluency", blocks: "12–14 blocks + spiral", mathUpTopics: ["Whole Number Operations"], lessonIds: ["operations-fluency-pack", "strategy-league", "scoreboard-rules"], fluency: "Three 8–10 minute routines each week; no speed ranking", check: "Estimate, calculate, and verify with another route.", spaces: "Optional strategy snapshot only if needed" },
  { timing: "October · Weeks 7–8", focus: "Factors, multiples, and order", blocks: "7–8 blocks", mathUpTopics: ["Factors and Multiples", "BC_Working With Factors and Multiples"], lessonIds: ["factors-multiples-pack", "pack-and-sync", "scoreboard-rules"], fluency: "Fact families, divisibility, and factor puzzles", check: "Choose factor or multiple reasoning and defend it.", spaces: "No post" },
  { timing: "Late October–November", focus: "Fractions, ratios, and friendly percents", blocks: "12–15 blocks", mathUpTopics: ["Representing, Comparing, and Ordering Fractions", "Proportional Reasoning"], lessonIds: ["fraction-ratio-percent-pack", "fraction-ratio-remix"], fluency: "Benchmarks, equivalence, and ratio batches", check: "Connect a model, symbol, and comparison.", spaces: "No separate post" },
  { timing: "November–December", focus: "Decimal operations, percent, and budget decisions", blocks: "12–15 blocks", mathUpTopics: ["Representing, Estimating, and Comparing Decimal Numbers", "Multiplying and Dividing With Decimal Numbers"], lessonIds: ["decimal-operations-pack", "decimal-dispatch", "sale-lab"], fluency: "Estimate first; use place-value and money contexts", check: "Reject one unreasonable answer and explain the estimate.", spaces: "Optional Sale Lab evidence only when it fills a real Math evidence gap" },
  { timing: "January–early February", focus: "Patterns and algebra", blocks: "12–14 blocks", mathUpTopics: ["Patterns", "Algebra"], lessonIds: ["pattern-relations-pack", "pattern-forecast", "one-step-equations-pack", "equation-balance"], fluency: "Tables, mental rules, and balance puzzles", check: "Represent one increasing and one decreasing relation, then verify one equation.", spaces: "Optional pattern evidence" },
  { timing: "February", focus: "Question, collect, organize, and graph", blocks: "9–11 blocks", mathUpTopics: ["WNCP_Collecting and Summarizing Data", "Graphing Data"], lessonIds: ["collect-summarize-data-pack", "graph-story-lab"], fluency: "Read scales and make careful comparisons", check: "Build an honest graph and state one claim plus one limit.", spaces: "Optional environmental graph; reuse Science data" },
  { timing: "Late February–mid March", focus: "Single-outcome probability", blocks: "8–10 blocks", mathUpTopics: ["WNCP_Probability", "BC_Probability"], lessonIds: ["single-outcome-probability-pack", "probability-game-audit"], fluency: "Outcome lists, fractions, and combined class trials", check: "Compare theoretical and experimental results.", spaces: "One selected game-audit post if useful" },
  { timing: "Late March", focus: "Angles and triangles", blocks: "5–6 blocks", mathUpTopics: ["Angles", "Triangles"], lessonIds: ["angle-triangle-pack", "geometry-field-lab"], fluency: "Reference-angle estimates and triangle clues", check: "Measure, classify, and construct from constraints.", spaces: "No post" },
  { timing: "April", focus: "Polygons, formulas, perimeter, and area", blocks: "10–12 blocks", mathUpTopics: ["Polygons", "Developing Measurement Formulas", "BC_Areas of Parallelograms, Triangles, and Trapezoids"], lessonIds: ["polygon-classification-pack", "formula-perimeter-pack", "area-recompose-pack", "zoo-design-studio"], fluency: "Missing sides, units, and one cut-and-move explanation", check: "Choose the right measurement and show why the rule works.", spaces: "One combined Zoo design artifact" },
  { timing: "Late April–early May", focus: "Volume and capacity", blocks: "5–6 blocks", mathUpTopics: ["BC_Capacity and Volume"], lessonIds: ["volume-capacity-pack"], fluency: "Cubes per layer and sensible capacity benchmarks", check: "Explain one volume structure and distinguish volume from capacity.", spaces: "Feed one calculation into the final design" },
  { timing: "May · coordinate graphing", focus: "First-quadrant transformations, then a negative-coordinate extension", blocks: "5–6 blocks", mathUpTopics: ["Location and Movement", "WNCP_Representing and Comparing Integers"], lessonIds: ["first-quadrant-transformations-pack", "transformation-cipher", "integer-number-line-pack"], fluency: "Plot positive pairs first; then extend the same x-first, y-second rule across zero", check: "Assess one first-quadrant transformation combination; use negative coordinates only in the optional four-quadrant challenge.", spaces: "No separate post" },
  { timing: "Teacher-selected alternate · late May–June", focus: "Optional apply, audit, and revise studio", blocks: "5–7 blocks only when replacing another substantial design or becoming the Math layer of the expert showcase", mathUpTopics: [], lessonIds: ["space-under-constraints"], fluency: "Mixed retrieval chosen from current evidence", check: "Use accurate calculations to cause one design revision.", spaces: "Not a default June addition. Use pavilion evidence only when it replaces Zoo Design or serves as the shared showcase format." },
];

export const mathFluencyRhythm = [
  { day: "A", title: "Notice + estimate", minutes: "8–10 min", detail: "Number talk, benchmark, or reasonableness choice. Everyone thinks before anyone shares." },
  { day: "B", title: "Calculate + check", minutes: "8–10 min", detail: "One focused fact or operation strategy, then a different checking route." },
  { day: "C", title: "Play + explain", minutes: "8–12 min", detail: "Partner game, puzzle, card sort, or error repair. No elimination or public speed ranking." },
];

export const pairedMathUpTopics = [
  { primary: "Factors and Multiples", companion: "BC_Working With Factors and Multiples", note: "One sequence: explicit concept work followed by B.C. review and application." },
  { primary: "WNCP_Probability", companion: "BC_Probability", note: "One sequence: outcome/sample-space instruction followed by B.C. single-outcome application." },
];

export function mathPacksFor(experienceId: string) {
  return mathSupportPacks
    .filter(pack => pack.anchorIds.includes(experienceId))
    .sort((a, b) => Number(a.role === "MATHUP / WNCP BRIDGE") - Number(b.role === "MATHUP / WNCP BRIDGE"));
}

export function mathWordsFor(experienceId: string) {
  const seen = new Set<string>();
  return [...mathPacksFor(experienceId)].reverse().flatMap(pack => pack.vocabulary).filter(word => !seen.has(word.term) && seen.add(word.term));
}

export function mathReadinessLevelFor(experienceId: string): ReadinessLevel {
  const packs = mathPacksFor(experienceId);
  if (!packs.length) return experienceId === "strategy-league" ? "review" : "full";
  return packs.some(pack => pack.readinessLevel === "full") ? "quick" : packs[0].readinessLevel;
}
