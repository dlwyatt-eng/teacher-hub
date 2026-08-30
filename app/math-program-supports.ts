import type { ReadinessLevel, ReadinessQuestion, WordHelp } from "./program-types";

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
    learningGoal: "Start at (0, 0), move across first and then up. Later, cross zero so a negative sign can send the move left or down.",
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
    supplied: ["Projectable −10 to 10 line", "Four-quadrant coordinate grid", "Ordered-pair point cards", "Coordinate traps", "Three-item check and answer key"],
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
    supportRoute: "Start on a taped line from −10 to 10. Walk every move from zero, then use two colours on the grid: one arrow for the across move and another for the up-or-down move.",
    extensionRoute: "Encode a short picture across all four quadrants. After transformations are taught, predict coordinate changes after a reflection or translation.",
    spaces: "Classroom practice; no separate SpacesEDU post.",
  },
  {
    id: "operations-fluency-pack",
    anchorIds: ["strategy-league", "scoreboard-rules"],
    title: "Choose, estimate, calculate, and check",
    shortTitle: "Whole-number operations workshop",
    timing: "September–October, then spiral all year",
    blocks: "3 × 40–50 min + 8–10 min recurring",
    role: "FLUENCY ROUTINE",
    readinessLevel: "review",
    mathUpTopics: ["Whole Number Operations"],
    prerequisite: "Recall or derive multiplication and division facts to 100 with a strategy or reference chart.",
    learningGoal: "Make a quick size prediction, solve the exact calculation in a way you understand, and check it from another direction.",
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
    supplied: ["Method comparison cards", "Estimate-exact-check mat", "Six calculation cards", "Error analysis cards", "Answer key"],
    gather: ["Mini-whiteboards", "Multiplication chart as an access tool", "Base-ten blocks optional"],
    vocabulary: words(
      ["estimate", "a close, sensible value used to predict or check", "23 × 16 is about 20 × 20, or 400"],
      ["efficient", "accurate and reasonably direct for these numbers", "Doubling and halving is efficient for 25 × 16"],
      ["inverse operation", "an operation that undoes another operation", "Multiplication checks division"],
      ["decompose", "break a number into useful parts", "16 becomes 10 + 6"],
    ),
    model: { label: "GUESS THE SIZE · BUILD THE ANSWER · CHECK", prompt: "There are 16 packs with 23 cards in each. About how many cards is that—and exactly how many?", steps: ["Quick size check — 16 is near 20 and 23 is near 20, so expect something around 400.", "Split 16 into 10 and 6: find 23 × 10, then 23 × 6.", "Join the parts: 230 + 138 = 368 cards.", "Check from the other direction: 368 ÷ 16 = 23, and 368 is close to the quick 400 prediction."], conclusion: "The estimate tells us the neighbourhood; the exact calculation gives the address; the check helps us catch a wrong turn." },
    partnerCards: [
      { title: "MAKE 100", body: "Find 25 × 16. Can you join four groups of 25 to make 100 first? Draw or write the regrouping.", answer: "400; four 25s make 100, and sixteen 25s make four groups of 100." },
      { title: "SPLIT 13", body: "Find 47 × 13 by splitting 13 into 10 and 3. Show both smaller products before joining them.", answer: "47 × 10 + 47 × 3 = 470 + 141 = 611." },
      { title: "DIVIDE + RUN IT BACK", body: "Find 864 ÷ 24. Then multiply your answer by 24. Did you return to 864?", answer: "36; 24 × 36 = 864." },
      { title: "SUSPICIOUS OR SOLID?", body: "A card claims 302 × 18 = 5,436. First predict the size using 300 × 20, then check the exact answer.", answer: "Yes. The prediction is about 6,000; exactly, 302 × (20 − 2) = 5,436." },
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
    title: "Build the part before calculating it",
    shortTitle: "Fractions, ratios, and friendly percents",
    timing: "Late October–November",
    blocks: "4 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Representing, Comparing, and Ordering Fractions", "Proportional Reasoning", "whole-number percents and percentage discounts"],
    prerequisite: "Recognize common unit fractions and use equal-sized wholes.",
    learningGoal: "Build the parts with strips and colour first, then give the same amount fraction, ratio, decimal, or percent names.",
    whyBefore: "The Remix and Sale Lab ask students to apply several representations. This workshop gives each representation a concrete and visual meaning first.",
    background: ["Half of a sticky note is not the same amount as half of a poster. Before comparing fractions, check that the wholes are the same size.", "Lay down seven quarter-strips. Four quarters make one whole and three remain, so 7/4 and 1 3/4 are two names for the same amount.", "Place 2 blue tiles beside 3 gold tiles. The comparison 2 blue to 3 gold is written 2:3 and is called a ratio.", "Shade 25 tiny squares on a 100-square grid. That is 25 out of 100, or 25 percent; ‘percent’ means ‘out of 100.’"],
    teacherMoves: ["Build 7/4 with fraction strips and rename it 1 3/4.", "Compare 5/6 and 7/9 with a benchmark and then a common representation.", "Grow 2:3 through whole batches: 2:3, 4:6, 6:9.", "Shade 25/100 and connect 25% = 1/4 = 0.25."],
    studentMoves: ["Build seven quarters, circle each complete whole, and write both names: 7/4 and 1 3/4.", "Place two fractions beside a one-half strip or on the same number line before deciding which is larger.", "Repeat the whole 2-blue-and-3-gold batch to make 4:6 and 6:9 without changing its colour balance.", "Shade 10%, 25%, 50%, and 75% on hundred grids, then fold or divide a price to find the matching discount."],
    supplied: ["Fraction-strip cards", "Number-line mat", "Ratio batch cards", "Hundred-grid percent cards", "Practice and answer key"],
    gather: ["Crayons or highlighters", "Fraction strips or Cuisenaire rods optional", "Mini-whiteboards"],
    vocabulary: words(
      ["improper fraction", "a fraction with a numerator at least as large as its denominator", "7/4 is 1 3/4"],
      ["mixed number", "a whole number and a fraction together", "2 1/3"],
      ["ratio", "a comparison between two quantities", "2 red tiles for every 3 blue tiles is 2:3"],
      ["percent", "a comparison out of 100", "25% means 25 out of 100"],
    ),
    model: { label: "ONE SHAPED PART · FOUR NUMBER NAMES", prompt: "Shade one quarter of this 100-square mural. How many different ways can we name the shaded part?", steps: ["Shade one complete 25-square corner of the 100-square mural.", "Count it as 25 out of 100 and write 25/100.", "Regroup the mural into four equal quarters: one of the four is shaded, so write 1/4.", "Read the same spot as 25% and 0.25—four names pointing to the very same shaded area."], conclusion: "The picture does not change when its number-name changes: 25/100, 1/4, 25%, and 0.25 all point to the same part of one equal whole." },
    partnerCards: [
      { title: "RENAME", body: "Build 11/4, then write it as a mixed number.", answer: "2 3/4" },
      { title: "COMPARE", body: "Which is greater: 5/6 or 7/9? Show a fair method.", answer: "5/6; 15/18 > 14/18." },
      { title: "KEEP THE RATIO", body: "A mix uses 2 blue parts for every 3 yellow parts. Complete 2:3 = 6:__.", answer: "9" },
      { title: "FRIENDLY DISCOUNT", body: "$48 is discounted by 25%. Find the discount and sale price.", answer: "$12 discount; $36 sale price." },
    ],
    check: [
      { prompt: "Order 3/4, 5/8, and 7/10.", answer: "5/8, 7/10, 3/4" },
      { prompt: "Complete 4:5 = 12:__.", answer: "15" },
      { prompt: "Find 50% of $36 and explain with a fraction.", answer: "$18 because 50% = 1/2." },
    ],
    readinessQuestions: [
      { prompt: "Which equals 25%?", choices: ["1/2", "1/4", "3/4"], answer: 1, feedback: "25 out of 100 simplifies to 1 out of 4." },
      { prompt: "Which ratio is equivalent to 2:3?", choices: ["4:5", "4:6", "6:6"], answer: 1, feedback: "Both parts were multiplied by 2." },
    ],
    likelyMisconceptions: ["Comparing denominators without considering fraction size", "Adding the same number to both parts of a ratio", "Subtracting the percent number as dollars"],
    supportRoute: "Use only matching-size fraction strips. Compare each fraction with one half, and begin percent work with the easy landmarks 10%, 25%, 50%, and 75%.",
    extensionRoute: "Find a missing whole or percentage and justify why more than one representation agrees.",
    spaces: "Keep practice local. The Sale Lab budget can be the selected end evidence.",
  },
  {
    id: "decimal-operations-pack",
    anchorIds: ["decimal-dispatch", "sale-lab"],
    title: "Estimate, model, then operate with decimals",
    shortTitle: "Decimal operations workshop",
    timing: "November–December",
    blocks: "4 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Representing, Estimating, and Comparing Decimal Numbers", "Multiplying and Dividing With Decimal Numbers"],
    prerequisite: "Read place value to thousandths and multiply or divide whole numbers with a strategy.",
    learningGoal: "Draw what each decimal is worth, make a quick size guess, calculate, and reject an answer that cannot fit the story.",
    whyBefore: "Decimal Dispatch is an error-analysis application. Students need a base-ten or place-value model and a guided written method before auditing invoices.",
    background: ["In $2.35, the 2 means two dollars, the 3 means three tenths of a dollar or 30 cents, and the 5 means five hundredths or 5 cents. A digit’s position gives it its value.", "Six notebooks at a little more than $2 each must cost a little more than $12. Make that quick size prediction before multiplying 6 × 2.35 exactly.", "If $7.20 is shared equally among 9 people, each share must be less than one dollar. An answer of $8.00 cannot fit the story, even if a calculator-looking display says it does."],
    teacherMoves: ["Represent 0.125 × 3 with a thousandths grid or place-value chart.", "Connect the model to 125 thousandths × 3 = 375 thousandths = 0.375.", "Model 7.2 ÷ 9 as 72 tenths shared among 9 groups = 8 tenths.", "Use an estimate and context to reject a misplaced decimal."],
    studentMoves: ["Build or shade the amount on a tenths, hundredths, or thousandths grid and label what one tiny part is worth.", "Say a quick size prediction in ordinary language: ‘six groups of just over two will be just over twelve.’", "Find the exact answer with the grid, a place-value chart, or clear written steps.", "Put the unit back into the answer—dollars, metres, or litres—and reject any result that makes the story impossible."],
    supplied: ["Tenths/hundredths/thousandths grids", "Place-value charts", "Estimate-exact-check cards", "Decimal error cards", "Practice and key"],
    gather: ["Base-ten blocks optional", "Grid paper", "Calculator only after an estimate and method"],
    vocabulary: words(
      ["decimal", "a way to write parts of a whole using place value", "0.375 is 375 thousandths"],
      ["thousandth", "one of one thousand equal parts", "0.001"],
      ["reasonable", "sensible for the numbers and situation", "7.2 ÷ 9 must be less than 1"],
      ["place value", "the value a digit has because of its position", "The 7 in 0.72 means seven tenths"],
    ),
    model: { label: "$7.20 SHARED NINE WAYS", prompt: "Nine creators split $7.20 equally. How much does each person receive?", steps: ["Predict first: nine people are sharing less than $9, so each share must be less than $1.", "Rename 7.2 as 72 tenths and share those 72 tenths among 9 groups.", "Each group gets 8 tenths, which is 0.8 or $0.80.", "Check by joining the shares again: $0.80 × 9 = $7.20."], conclusion: "The story and the multiplication check both confirm $0.80; an answer of $8 would be larger than the entire amount being shared." },
    partnerCards: [
      { title: "THREE TINY PIECES", body: "Shade 0.125 three times on a thousandths grid, then write the total.", answer: "0.375" },
      { title: "SHARE $7.20", body: "Nine people share $7.20 equally. Explain why each share must be less than $1 before calculating.", answer: "$0.80" },
      { title: "NOTEBOOK INVOICE", body: "Six notebooks cost $2.35 each. Use $2 × 6 for a quick size check, then find the exact total.", answer: "A little more than $12; exactly $14.10." },
      { title: "DECIMAL RESCUE", body: "A card says 4.8 ÷ 6 = 8. Draw 48 tenths shared into six groups and repair the answer.", answer: "0.8; 48 tenths ÷ 6 = 8 tenths." },
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
    title: "From a fair question to an honest graph",
    shortTitle: "Collect and summarize data",
    timing: "February",
    blocks: "3 × 40–55 min",
    role: "MATHUP / WNCP BRIDGE",
    readinessLevel: "full",
    mathUpTopics: ["WNCP_Collecting and Summarizing Data", "Graphing Data"],
    prerequisite: "Read a table and count with tallies.",
    learningGoal: "Ask one question we can actually count, collect every observation the same way, and draw a graph that says only what the numbers show.",
    whyBefore: "Graph Story Lab currently begins with supplied data. This pack restores the missing question, collection, and organization stage while keeping personal information out of the task.",
    background: ["‘Is our schoolyard good?’ is too foggy to count. ‘How many of 8 marked seats are shaded at noon?’ tells us exactly what to observe, where, and when.", "If one group checks at 9:00 and another at noon, their shade counts do not mean the same thing. Use the same rule for every spot so the comparison is fair.", "A graph of one noon in September can show which marked spots were shadier that day. It cannot tell us which spot is coolest in June or why the shade appeared."],
    teacherMoves: ["Sort four questions: answerable, vague, biased, or private.", "Model a consistent count using the supplied schoolyard shade data.", "Turn raw values into a tally/frequency table and check the total.", "Choose intervals and a scale that show the data without distortion."],
    studentMoves: ["Turn one foggy question into a countable one by naming what, where, and when.", "Write one collection rule that every team will follow, such as ‘check each marked seat at noon for one minute.’", "Collect a small non-personal set with clipboards or use the supplied schoolyard cards.", "Make tally marks first, then a table, then a graph with equal steps along the scale.", "Trade graphs and highlight one sentence the numbers support; cross out one sentence that asks the graph to know too much."],
    supplied: ["Question-sort deck", "Environmental raw-data strips", "Tally/frequency table", "Pre-labelled axes", "Graph checklist", "Check and key"],
    gather: ["Clipboards optional", "Grid paper", "Pencil and ruler"],
    vocabulary: words(
      ["data question", "a question that can be answered by collecting information", "How many minutes of shade does each marked spot receive at noon?"],
      ["category", "a group used to organize data", "sun, partial shade, full shade"],
      ["frequency", "how many times a value or category occurs", "The value 5 appears three times, so its frequency is 3"],
      ["bias", "a feature that unfairly pushes results in one direction", "Only asking basketball club members about favourite sports"],
    ),
    model: { label: "MESSY NUMBERS → TALLIES → PICTURE → WHAT WE CAN SAY", prompt: "Twelve marked seats were checked at noon. Which area gave us the most shade—and what are we still unable to know?", steps: ["Read the shared rule aloud: same twelve seats, same noon time, same way of judging shade.", "Mark every reading once in a tally table and recount: the total must still be 12.", "Draw the graph with equal-size steps so one extra shaded seat looks like one extra seat—not a dramatic cliff.", "Finish two sentences: ‘At noon today, the graph shows…’ and ‘This graph cannot tell us…’"], conclusion: "A truthful graph says exactly what these observations show and leaves the bigger mysteries open for another investigation." },
    partnerCards: [
      { title: "WE CAN COUNT THIS", body: "Could we answer ‘How many of 8 marked seats are shaded at noon?’ with one careful observation? Explain.", answer: "Yes, if all groups use the same eight seats, time, and shade rule." },
      { title: "CLEAR THE FOG", body: "‘Is our schoolyard good?’ is too broad. Rewrite it so a group could count or measure one thing at one place and time.", answer: "Example: How many minutes of shade does each marked bench receive from 12:00 to 1:00?" },
      { title: "THE QUESTION IS PUSHING", body: "What is unfair about ‘Why is the sunny area the best place to sit?’ Rewrite it without choosing the answer first.", answer: "It assumes sunny is best. Ask: Which marked area do students choose at lunch, and what shade does each have?" },
      { title: "MESSY NUMBERS", body: "The readings are 3, 5, 5, 7, 10, 5. Tally how often each number appears and make sure the total is still six.", answer: "3:1, 5:3, 7:1, 10:1; total 6." },
    ],
    check: [
      { prompt: "Organize 3, 5, 5, 7, 10, 5 in a frequency table.", answer: "3:1, 5:3, 7:1, 10:1; total 6." },
      { prompt: "Choose a useful equal-interval scale for values from 3 to 10.", answer: "Examples include 0–10 by 1 or 0–12 by 2; intervals must be equal and clearly labelled." },
      { prompt: "Reject: ‘Most results are 10.’", answer: "Only one of six results is 10; three of six results are 5." },
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
    title: "List, predict, test, and compare one outcome",
    shortTitle: "Probability foundations",
    timing: "Late February–March",
    blocks: "2 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["WNCP_Probability", "BC_Probability"],
    prerequisite: "Represent a part-to-whole fraction and record repeated results.",
    learningGoal: "Count the chance built into a spinner or die, test it many times, and explain why a surprising streak does not rewrite the game’s design.",
    whyBefore: "The game audit is an application. This workshop explicitly teaches sample space and the difference between theoretical and experimental probability first.",
    background: ["On a spinner with four equal sections and one blue section, blue owns 1 of the 4 equally sized landing spaces. The design predicts a 1/4 chance; this is called theoretical probability.", "After 20 real spins, blue might appear 3, 5, or 7 times. The fraction made from what actually happened is called experimental probability.", "Three blue spins in a row can happen without magic or cheating. A short streak is not a promise about the next spin; combining many class trials gives us a steadier picture."],
    teacherMoves: ["List every possible outcome before making a fraction.", "Model a four-section equal spinner and select one outcome only.", "Run 10 class trials, then combine groups to compare 40 or more trials.", "Discuss why fair-looking equipment still needs inspection and evidence."],
    studentMoves: ["Point to and list every place the spinner, die, or bag can land before writing a fraction.", "Choose one result, count its winning places, and write the design’s predicted chance.", "Spin, roll, or draw 20 times and record every result with tally marks—even the surprising ones.", "Pool the class trials, compare the real result with the design prediction, and explain why neither one guarantees the next turn."],
    supplied: ["Equal and unequal spinner cards", "Die/coin outcome lists", "40-trial recording mat", "Bottle-flip optional data set", "Check and key"],
    gather: ["Coins, dice, or paper clips and pencils for spinners", "Counters"],
    vocabulary: words(
      ["outcome", "one possible result of a chance event", "Rolling a 4 is one die outcome"],
      ["theoretical probability", "a prediction based on all equally likely outcomes", "One 4 on a fair die gives 1/6"],
      ["experimental probability", "the result found from actual recorded trials", "A 4 appeared 7 times in 36 rolls"],
      ["trial", "one performance of a chance event", "One spin is one trial"],
    ),
    model: { label: "THE SPINNER’S DESIGN · THE SPINS WE ACTUALLY GET", prompt: "Blue covers one of four equal sections. Must blue appear exactly 5 times in 20 spins?", steps: ["Point to all four equal landing spaces; only one is blue.", "Write the design prediction: blue has a 1/4 chance on each spin. This is theoretical probability.", "Spin 20 times without erasing odd-looking results. Tally how often blue actually appears.", "Write the experiment fraction, such as 7/20, beside 1/4. They can differ because 20 spins are a small, chance-filled sample."], conclusion: "The spinner promises no exact short-term score. Its design predicts the pattern we expect to see more clearly across many, many spins." },
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
    title: "Estimate, measure, classify, and construct",
    shortTitle: "Angles and triangles workshop",
    timing: "Late March",
    blocks: "3 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Angles", "Triangles"],
    prerequisite: "Identify a vertex and use a ruler to measure side length.",
    learningGoal: "Compare an opening with a paper corner, measure its turn in degrees, and give a triangle every family name its sides and angles earn.",
    whyBefore: "The Geometry Field Lab asks students to measure and classify. This workshop explicitly teaches protractor placement, reference angles, and the two triangle naming systems first.",
    background: ["Put two pencils tip-to-tip and open them like a beak. The amount of opening—the turn from one pencil to the other—is the angle; longer pencils do not create a larger angle.", "A square paper corner opens 90°. Fold it in half for about 45°, or open it flat for 180°. These familiar openings help us guess before measuring.", "A triangle with sides 5 cm, 5 cm, and 7 cm is isosceles because two sides match. If one angle is 90°, it is also a right triangle; a triangle can have both names.", "Turn the paper sideways or upside down: its side lengths and angles do not change, so its mathematical family does not change."],
    teacherMoves: ["Model centre-on-vertex, baseline-on-ray, and the correct protractor scale.", "Estimate each angle before measuring.", "Sort triangles once by sides and again by angles.", "Construct one triangle from constraints and verify every condition."],
    studentMoves: ["Hold a paper corner beside the projected opening and decide whether the turn is less than, equal to, or greater than 90°.", "Mark the vertex, line up the protractor’s centre and zero line, and write the measured degrees beside the arc.", "Measure or match all three sides and angles before giving the triangle one side name and one angle name.", "Build a triangle from a clue card, trade it, and have a partner mark each clue that the drawing truly satisfies."],
    supplied: ["Projectable angle benchmarks", "Protractor placement diagrams", "Triangle sort deck", "Constraint cards", "Check and key"],
    gather: ["Protractors", "Rulers", "Plain paper or grid paper"],
    vocabulary: words(
      ["acute angle", "an angle greater than 0° and less than 90°", "45° is acute"],
      ["obtuse angle", "an angle greater than 90° and less than 180°", "120° is obtuse"],
      ["reflex angle", "an angle greater than 180° and less than 360°", "250° is reflex"],
      ["scalene triangle", "a triangle with three different side lengths", "A 4 cm, 5 cm, 6 cm triangle is scalene"],
      ["isosceles triangle", "a triangle with at least two equal side lengths", "A 5 cm, 5 cm, 7 cm triangle is isosceles"],
    ),
    model: { label: "PAPER CORNER FIRST · PROTRACTOR SECOND", prompt: "This cave opening looks wider than a square corner. Is it near 120° or 60°?", steps: ["Dot the vertex where the two sides meet and trace the two rays outward.", "Place a 90° paper corner inside: extra opening remains, so the angle must be greater than 90°.", "Put the protractor’s centre on the dot and its zero line along the lower ray.", "Read the scale growing from that zero. About 120° fits our first look; 60° would be smaller than the paper corner."], conclusion: "The quick paper-corner comparison protects us from reading the wrong row of numbers on the protractor." },
    partnerCards: [
      { title: "WIDER THAN A CORNER", body: "Place a 90° paper corner inside the shown opening. Is the turn less or more than 90°? Then measure it.", answer: "It is greater than 90°, so it is obtuse, and it should measure near 120°." },
      { title: "MATCH THE SIDES", body: "Draw or build a triangle with side lengths 5 cm, 5 cm, and 7 cm. Mark the matching sides. What family name fits?", answer: "Isosceles." },
      { title: "SPOT THE SQUARE CORNER", body: "A triangle’s angles are 35°, 55°, and 90°. Mark the square corner and name the triangle by its angles.", answer: "Right triangle." },
      { title: "BUILD FROM TWO CLUES", body: "Make a triangle with one square corner and two equal sides. Mark both clues on your drawing before naming it.", answer: "A right isosceles triangle; its angles are 45°, 45°, and 90°." },
    ],
    check: [
      { prompt: "Classify 38°.", answer: "Acute angle." },
      { prompt: "Classify a triangle with sides 6, 6, 6 and angles 60°, 60°, 60°.", answer: "Equilateral and acute." },
      { prompt: "Name the three protractor placement checks.", answer: "Centre on vertex; baseline on one ray; read the scale beginning at 0° on that ray." },
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
    title: "Shape property detective",
    shortTitle: "Polygons and quadrilaterals bridge",
    timing: "Early April",
    blocks: "2 × 40–50 min",
    role: "MATHUP / WNCP BRIDGE",
    readinessLevel: "quick",
    mathUpTopics: ["Polygons"],
    prerequisite: "Count straight sides and vertices and recognize a right angle.",
    learningGoal: "Touch, measure, and mark what a shape actually has, then place it in every family whose rule it passes.",
    whyBefore: "The Zoo and pavilion projects use complex shapes. This bridge prevents students from choosing formulas by appearance alone and restores the prior Quadrilaterals activity.",
    background: ["Trace a shape with your finger. If the straight sides join all the way around with no gap, it is a polygon; a circle or an open zigzag is not.", "A square has four straight sides, four right angles, two pairs of parallel sides, and four equal sides. Those features let it live in several families at once.", "Arrow marks show sides that stay the same distance apart (parallel). Tiny square corners show 90° meetings (perpendicular). These marks matter more than whether the shape looks tilted."],
    teacherMoves: ["Sort exact shapes by marked properties, not their familiar look.", "Build a nested quadrilateral family map.", "Display the class definition of trapezoid used by MathUP and note that published conventions can differ.", "Test always/sometimes/never statements."],
    studentMoves: ["Cut out the shape cards and first sort them into closed-straight-sided polygons and not-polygons.", "Use rulers, corner cards, and property symbols to mark equal, parallel, and perpendicular sides.", "Place each quadrilateral on every family mat whose rule it passes—even if it belongs in several places.", "Draw one mystery enclosure, hide its picture, and give only enough property clues for another team to identify its families."],
    supplied: ["Exact shape-card set", "Property icon legend", "Nested family-map mat", "Mystery and always/sometimes/never cards", "Check and key"],
    gather: ["Scissors optional", "Rulers", "Grid paper or geoboards"],
    vocabulary: words(
      ["polygon", "a closed 2D shape made only of straight line segments", "A pentagon is a polygon; a circle is not"],
      ["quadrilateral", "a polygon with four sides", "Squares, rectangles, rhombi, and trapezoids are quadrilaterals"],
      ["parallel", "lines in the same plane that stay the same distance apart", "Opposite sides of a rectangle are parallel"],
      ["perpendicular", "lines that meet at a right angle", "Adjacent sides of a square are perpendicular"],
      ["rhombus", "a quadrilateral with four equal sides", "A square is a special rhombus"],
    ),
    model: { label: "A SQUARE HAS A WHOLE FAMILY TREE", prompt: "How many true family names can one ordinary square collect?", steps: ["Trace all the way around four straight sides: it is a polygon and a four-sided quadrilateral.", "Mark the two pairs of sides that never meet: it also passes the parallelogram rule.", "Place a paper corner at all four vertices: four right angles make it a rectangle.", "Measure or match all four sides: four equal sides make it a rhombus—and with every clue together, it is a square."], conclusion: "Family names are not prizes with only one winner. A shape keeps every name whose rule it truly meets." },
    partnerCards: [
      { title: "MYSTERY A", body: "Two pairs of parallel sides, four equal sides, no right angles.", answer: "Rhombus and parallelogram; not a rectangle or square." },
      { title: "MYSTERY B", body: "Four right angles; opposite sides equal; not all four sides equal.", answer: "Rectangle and parallelogram; not a square or rhombus." },
      { title: "ALWAYS?", body: "Every square is a rectangle.", answer: "Always, because a square has four right angles." },
      { title: "REVERSE?", body: "Every rectangle is a square.", answer: "Sometimes; only when all four sides are equal." },
    ],
    check: [
      { prompt: "Classify a quadrilateral with two pairs of parallel sides and four equal sides but no right angles.", answer: "Rhombus and parallelogram." },
      { prompt: "Why is every square a rectangle?", answer: "A square meets the rectangle rule of four right angles." },
      { prompt: "What must the class confirm before sorting trapezoids?", answer: "The definition or convention used by the selected MathUP lesson." },
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
    title: "Build the rule before using the formula",
    shortTitle: "Measurement formulas and complex perimeter",
    timing: "Early–mid April",
    blocks: "3 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Developing Measurement Formulas"],
    prerequisite: "Multiply whole numbers and distinguish distance around from space covered.",
    learningGoal: "Trace around, tile inside, and stack cubes so every measurement rule grows from something you can see and touch.",
    whyBefore: "Projects should not be the first place students encounter formulas or complex perimeter. This pack makes the structure visible before symbolic use.",
    background: ["Run a string once around the edge of a desk mat: that outside trip is perimeter, so we measure it in centimetres or metres.", "Cover the same mat with 1-by-1 paper squares: the number needed to hide the surface is area, so we use square centimetres or square metres.", "On an 8-by-3 rectangle, counting 8 squares in each of 3 rows gives 8 × 3. A formula is simply that repeated pattern written as a short reusable rule.", "Letters such as l, w, b, and h are labels for measurements, not secret code. Write the word rule before swapping in the letters."],
    teacherMoves: ["Count a tiled rectangle by ones, rows, and repeated groups.", "Trace the boundary separately from the covered tiles.", "Build a complex shape, infer missing sides from aligned lengths, and add only the outside boundary.", "Write word rules before letter rules and test each on a new model."],
    studentMoves: ["Build an 8-by-3 rectangle with tiles, count them one by one, then count 3 rows of 8.", "Trace the outside boundary in one colour and shade the covered surface in another.", "On an L-shape, extend imaginary straight lines to find the missing side lengths before walking the entire outside edge.", "Say the rule in words, replace the measurement words with letters, and test it on a different paper shape."],
    supplied: ["Tiled rectangle cards", "Boundary/cover overlays", "Complex-perimeter diagrams", "Moveable l/w/b/h labels", "Formula cards", "Check and key"],
    gather: ["Square tiles", "Rulers", "Grid paper", "Unit cubes for the volume preview"],
    vocabulary: words(
      ["perimeter", "the total distance around a 2D shape", "A 3 cm by 8 cm rectangle has perimeter 22 cm"],
      ["area", "the amount of 2D surface covered", "A 3 cm by 8 cm rectangle has area 24 cm²"],
      ["formula", "a rule written with words or symbols", "A = b × h"],
      ["dimension", "a measurement such as length, width, or height", "The prism dimensions are 4 cm, 3 cm, and 5 cm"],
      ["square unit", "a unit that covers a 1-by-1 square", "cm²"],
    ),
    model: { label: "WALK THE EDGE · TILE THE INSIDE", prompt: "A tiny creature garden is 8 cm long and 3 cm wide. How much fence goes around it, and how many square tiles cover it?", steps: ["Walk a pencil around every edge: 8 + 3 + 8 + 3 = 22 cm of fence. That outside distance is perimeter.", "Cover the inside with 3 rows of 8 one-centimetre squares.", "Count by rows: 8 × 3 = 24 cm² of covered space. That is area.", "Keep the units attached: centimetres describe the fence line; square centimetres describe the tiles."], conclusion: "Ask what the story needs first: a trip around the edge or a cover for the inside. Then choose the matching rule." },
    partnerCards: [
      { title: "RECTANGLE", body: "8 cm by 3 cm: find perimeter and area and label units.", answer: "P = 22 cm; A = 24 cm²." },
      { title: "THE HIDDEN EDGE", body: "An L-shape came from a 10-by-8 rectangle. Draw dotted lines to rebuild the missing corner, then use the full 10-across and 8-up distances to find the short unlabeled edges.", answer: "The horizontal pieces together must span 10 and the vertical pieces together must span 8; the exact missing lengths come from the displayed cut." },
      { title: "WRONG RULE, RIGHT REPAIR", body: "A card says perimeter = length × width. Trace a finger around the rectangle and rewrite the rule to include all four edges.", answer: "P = length + width + length + width, or P = 2l + 2w. Multiplying length × width finds area." },
      { title: "SAME AREA", body: "Make two rectangles with area 24 square units and compare perimeters.", answer: "Examples 4×6 has P20; 3×8 has P22." },
    ],
    check: [
      { prompt: "Rectangle 8 cm by 3 cm: find perimeter and area.", answer: "22 cm; 24 cm²." },
      { prompt: "Why do the units differ?", answer: "Perimeter is one-dimensional distance; area counts two-dimensional square units." },
      { prompt: "A prism has 4×3 cubes per layer and 5 layers. Write the structure, not only the answer.", answer: "4 × 3 × 5 = 60 cubic units." },
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
    title: "Cut, move, and explain area",
    shortTitle: "Area of parallelograms, triangles, and trapezoids",
    timing: "Mid April",
    blocks: "3 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["BC_Areas of Parallelograms, Triangles, and Trapezoids"],
    prerequisite: "Find rectangle area and identify perpendicular lines.",
    learningGoal: "Cut and move slanted paper shapes into familiar ones, then use what you built to understand their area rules.",
    whyBefore: "The current field and design activities mention these areas but do not teach them. This pack supplies the required cut-and-move reasoning and keeps perpendicular height visible.",
    background: ["Cut the triangular tip from one end of a paper parallelogram and slide it to the other end. The pieces make a rectangle without adding, losing, overlapping, or stretching paper, so the area stays the same.", "Choose a bottom side as the base. The height is the shortest straight climb to the opposite side and must meet the base at a square 90° corner; a longer slanted edge is not that climb.", "Two matching triangles can join into one parallelogram. One triangle therefore owns half the paired area, which is where the divide-by-2 rule comes from.", "Two matching trapezoids can also join into a parallelogram. Cutting and joining lets us understand the rule instead of treating letters as a spell."],
    teacherMoves: ["Cut and slide a parallelogram corner to make a rectangle.", "Pair two matching triangles to make a parallelogram and explain the half.", "Join two matching trapezoids to make a parallelogram and derive the average-of-bases rule.", "Circle the measurement not used on slanted-side trap cards."],
    studentMoves: ["Cut and slide the coloured corner of a paper parallelogram until it becomes a rectangle; label the unchanged base and 90° height.", "Pair two matching paper triangles, trace the new parallelogram, then separate them to see why one triangle is half.", "Build the trapezoid rule with two matching cut-outs before using any letter formula.", "Choose one slanted Zoo habitat, mark the base and true 90° height, and show its area beside the design."],
    supplied: ["Cut-and-slide parallelogram", "Duplicate triangle set", "Double-trapezoid set", "Base/height overlays", "12 practice cards", "Check and key"],
    gather: ["Scissors", "Grid paper", "Rulers", "Highlighters"],
    vocabulary: words(
      ["base", "the chosen side used with its perpendicular height", "The bottom 9 cm side can be the base"],
      ["perpendicular height", "the shortest distance to the opposite side measured at 90°", "The 4 cm vertical segment, not the slanted side"],
      ["parallelogram", "a quadrilateral with two pairs of parallel sides", "A slanted parallelogram can share a base and height with a rectangle"],
      ["trapezoid", "a quadrilateral classified using the definition displayed for this class", "Confirm the MathUP convention before sorting"],
      ["recompose", "rearrange pieces to make a new shape without changing total area", "Move a triangle from one side of a parallelogram to the other"],
    ),
    model: { label: "TWO TRIANGLES SNAP INTO ONE BIG SHAPE", prompt: "Why do we divide base × height by 2 for a triangle?", steps: ["Trace one triangle twice on coloured paper and cut out the matching pair.", "Turn one copy and fit the two together into a parallelogram with no gaps or overlaps.", "The joined shape has base × 90° height square units.", "Our original triangle is exactly one of the two equal pieces, so its area is (base × height) ÷ 2."], conclusion: "The 2 is not an unexplained rule: it is visible in the two matching triangles that built the full parallelogram." },
    partnerCards: [
      { title: "SLIDE THE CORNER", body: "A parallelogram has a 9 cm base, a 4 cm square-corner height, and a 5 cm slanted edge. Cut and slide the corner, then find the area.", answer: "36 cm²; the moved shape is a 9-by-4 rectangle, and the 5 cm slanted edge is not the height." },
      { title: "FIND ITS TWIN", body: "Make two matching triangles with 12 cm bases and 5 cm square-corner heights. Join them, find the pair’s area, then take half.", answer: "The pair is 12 × 5 = 60 cm², so one triangle is 30 cm²." },
      { title: "DOUBLE THE TRAPEZOID", body: "Join two copies of a trapezoid with parallel sides 7 cm and 11 cm and a 4 cm square-corner height. Use the joined shape to find one copy’s area.", answer: "((7 + 11) ÷ 2) × 4 = 36 cm²." },
      { title: "HEIGHT IMPOSTOR", body: "One label points to a 6 cm slanted edge and another to a 4 cm line meeting the base at a square corner. Which one is the height?", answer: "Use 4 cm; height must meet the chosen base at 90°." },
    ],
    check: [
      { prompt: "Parallelogram b=9 cm, h=4 cm.", answer: "36 cm²." },
      { prompt: "Triangle b=12 cm, h=5 cm.", answer: "30 cm²." },
      { prompt: "Trapezoid bases 7 cm and 11 cm, h=4 cm.", answer: "36 cm²." },
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
    title: "How much space? How much can it hold?",
    shortTitle: "Volume and capacity workshop",
    timing: "Late April–early May",
    blocks: "3 × 40–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["BC_Capacity and Volume"],
    prerequisite: "Multiply three whole-number factors and understand area as cubes per layer.",
    learningGoal: "Build a box from cube layers, count the space it takes up, and connect exact inside cubic centimetres with millilitres it can hold.",
    whyBefore: "The final pavilion brief currently asks for volume and capacity without prior instruction. This pack restores cube models, unit relationships, and an in-class route before the project.",
    background: ["Build a small box-shape from 1 cm cubes. The number of cubes filling that three-dimensional space is its volume, measured in cubic centimetres (cm³).", "A solid block takes up volume. An open container also has capacity—the amount of material or liquid that can fit inside it.", "A perfectly measured inside space of 1 cm by 1 cm by 1 cm holds 1 mL. A real bottle has walls, so measuring only its outside cannot reveal its exact capacity.", "If the bottom layer holds 5 × 3 = 15 cubes and the model has 4 layers, it contains 15 × 4 = 60 cubes altogether."],
    teacherMoves: ["Build one rectangular prism and count cubes in a base layer, then count layers.", "Connect cubes per layer × layers to length × width × height.", "Sort examples into solid volume, container capacity, or both.", "Use exact internal dimensions and unit relationships before applying them to storage."],
    studentMoves: ["Build or draw one complete bottom layer and write how many cubes fit in its rows.", "Stack or sketch the remaining layers, then multiply cubes per layer by the number of layers and label cm³.", "Sort classroom examples: use mL or L for what a container holds, and cm³ or m³ for space a solid or room takes up.", "Rebuild the same number of cubes into a long-low prism and a short-tall prism to see volume stay equal while the shape changes.", "Design one shelf box or storage container for the pavilion and show both its dimensions and volume or capacity."],
    supplied: ["Printable prism layers", "Isometric/grid prism cards", "Volume/capacity sort", "1 cm³ ↔ 1 mL and 1 L = 1000 mL visuals", "Storage brief", "Check and key"],
    gather: ["Unit cubes if available", "Small classroom containers optional", "Rulers", "Grid paper"],
    vocabulary: words(
      ["volume", "the amount of three-dimensional space an object occupies", "A 5×3×4 cm prism has volume 60 cm³"],
      ["capacity", "the amount a container can hold", "An ideal 60 cm³ inside space holds 60 mL"],
      ["cubic unit", "a unit shaped like a 1-by-1-by-1 cube", "cm³"],
      ["layer", "one level of cubes in a solid", "A 5-by-3 base has 15 cubes per layer"],
      ["rectangular prism", "a 3D solid with rectangular faces", "A box shape with length, width, and height"],
    ),
    model: { label: "BUILD ONE FLOOR · STACK THE FLOORS", prompt: "A creature-supply box is 5 cm long, 3 cm wide, and 4 cm high. How many 1 cm cubes would fill it?", steps: ["Build or draw the bottom floor: 5 rows across by 3 rows back makes 15 cubes.", "Stack the same floor 4 cubes high, giving 4 equal layers.", "Multiply what you can see in the structure: 15 cubes per layer × 4 layers = 60 cm³.", "If those are exact inside measurements, the empty space can hold 60 mL."], conclusion: "Length × width × height is a shortcut for something visible: cubes in one layer multiplied by the number of layers." },
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
  { timing: "September · Weeks 1–2", focus: "Magnitude and place value", blocks: "7–9 blocks", mathUpTopics: ["Whole Numbers Greater Than One Million", "Representing, Estimating, and Comparing Decimal Numbers"], lessonIds: ["magnitude-gallery"], fluency: "Place-value talks and benchmark estimates", check: "Place, compare, and justify one value on an appropriate scale.", spaces: "No post" },
  { timing: "September–October · Weeks 3–6", focus: "Whole-number operations and fluency", blocks: "12–14 blocks + spiral", mathUpTopics: ["Whole Number Operations"], lessonIds: ["operations-fluency-pack", "strategy-league", "scoreboard-rules"], fluency: "Three 8–10 minute routines each week; no speed ranking", check: "Estimate, calculate, and verify with another route.", spaces: "Optional strategy snapshot only if needed" },
  { timing: "October · Weeks 7–8", focus: "Factors, multiples, and order", blocks: "7–8 blocks", mathUpTopics: ["Factors and Multiples", "BC_Working With Factors and Multiples"], lessonIds: ["pack-and-sync", "scoreboard-rules"], fluency: "Fact families, divisibility, and factor puzzles", check: "Choose factor or multiple reasoning and defend it.", spaces: "No post" },
  { timing: "Late October–November", focus: "Fractions, ratios, and friendly percents", blocks: "12–15 blocks", mathUpTopics: ["Representing, Comparing, and Ordering Fractions", "Proportional Reasoning"], lessonIds: ["fraction-ratio-percent-pack", "fraction-ratio-remix"], fluency: "Benchmarks, equivalence, and ratio batches", check: "Connect a model, symbol, and comparison.", spaces: "No separate post" },
  { timing: "November–December", focus: "Decimal operations, percent, and budget decisions", blocks: "12–15 blocks", mathUpTopics: ["Representing, Estimating, and Comparing Decimal Numbers", "Multiplying and Dividing With Decimal Numbers"], lessonIds: ["decimal-operations-pack", "decimal-dispatch", "sale-lab"], fluency: "Estimate first; use place-value and money contexts", check: "Reject one unreasonable answer and explain the estimate.", spaces: "Optional Sale Lab evidence only when it fills a real Math evidence gap" },
  { timing: "January–early February", focus: "Patterns and algebra", blocks: "12–14 blocks", mathUpTopics: ["Patterns", "Algebra"], lessonIds: ["pattern-forecast", "equation-balance"], fluency: "Tables, mental rules, and balance puzzles", check: "Represent one relation and verify one equation.", spaces: "Optional pattern evidence" },
  { timing: "February", focus: "Question, collect, organize, and graph", blocks: "9–11 blocks", mathUpTopics: ["WNCP_Collecting and Summarizing Data", "Graphing Data"], lessonIds: ["collect-summarize-data-pack", "graph-story-lab"], fluency: "Read scales and make careful comparisons", check: "Build an honest graph and state one claim plus one limit.", spaces: "Optional environmental graph; reuse Science data" },
  { timing: "Late February–mid March", focus: "Single-outcome probability", blocks: "8–10 blocks", mathUpTopics: ["WNCP_Probability", "BC_Probability"], lessonIds: ["single-outcome-probability-pack", "probability-game-audit"], fluency: "Outcome lists, fractions, and combined class trials", check: "Compare theoretical and experimental results.", spaces: "One selected game-audit post if useful" },
  { timing: "Late March", focus: "Angles and triangles", blocks: "5–6 blocks", mathUpTopics: ["Angles", "Triangles"], lessonIds: ["angle-triangle-pack", "geometry-field-lab"], fluency: "Reference-angle estimates and triangle clues", check: "Measure, classify, and construct from constraints.", spaces: "No post" },
  { timing: "April", focus: "Polygons, formulas, perimeter, and area", blocks: "10–12 blocks", mathUpTopics: ["Polygons", "Developing Measurement Formulas", "BC_Areas of Parallelograms, Triangles, and Trapezoids"], lessonIds: ["polygon-classification-pack", "formula-perimeter-pack", "area-recompose-pack", "zoo-design-studio"], fluency: "Missing sides, units, and one cut-and-move explanation", check: "Choose the right measurement and show why the rule works.", spaces: "One combined Zoo design artifact" },
  { timing: "Late April–early May", focus: "Volume and capacity", blocks: "5–6 blocks", mathUpTopics: ["BC_Capacity and Volume"], lessonIds: ["volume-capacity-pack"], fluency: "Cubes per layer and sensible capacity benchmarks", check: "Explain one volume structure and distinguish volume from capacity.", spaces: "Feed one calculation into the final design" },
  { timing: "May · coordinate graphing", focus: "First-quadrant transformations, then a negative-coordinate extension", blocks: "5–6 blocks", mathUpTopics: ["Location and Movement", "WNCP_Representing and Comparing Integers"], lessonIds: ["transformation-cipher", "integer-number-line-pack"], fluency: "Plot positive pairs first; then extend the same x-first, y-second rule across zero", check: "Assess one first-quadrant transformation; use negative coordinates only in the optional four-quadrant challenge.", spaces: "No separate post" },
  { timing: "Mid May–June", focus: "Apply, audit, and revise", blocks: "10–14 blocks", mathUpTopics: [], lessonIds: ["space-under-constraints"], fluency: "Mixed retrieval chosen from current evidence", check: "Use accurate calculations to cause one design revision.", spaces: "Optional pavilion evidence only when it replaces another substantial Math design artifact" },
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
  return mathSupportPacks.filter(pack => pack.anchorIds.includes(experienceId));
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
