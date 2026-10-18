import type { StudentLessonContract } from "./student-lesson-contract";

/** Reviewed projector contracts for the Mathematics lessons not defined in the core file. */
export const mathStudentLessonContracts = {
  "strategy-league": {
    id: "strategy-league", reviewState: "reviewed",
    challenge: "Which multiplication or division method fits these numbers—and can another person follow it?",
    why: "We are learning to estimate, choose a method we understand, and check our answer another way. Clear thinking matters more than speed.",
    firstAction: "Read today's problem. Write a quick estimate, then start one method that makes sense to you.",
    materials: ["Problem on the projector or board", "Mini-whiteboard or scrap paper", "Pencil or marker", "Multiplication chart if useful", "Optional strategy cards"],
    choices: [{ prompt: "How will you show your calculation?", options: [
      { label: "Numbers + arrows", detail: "Break apart or regroup the numbers and connect each move." },
      { label: "Quick drawing", detail: "Use groups, an array, or a place-value sketch." },
      { label: "Written steps", detail: "Use a written method and label what each line means." },
    ] }],
    steps: [
      { title: "Estimate + start", action: "Predict the answer's size, then begin with any sensible method.", finishCheck: "You have an estimate and a visible first move.", minutes: "3 min" },
      { title: "Compare two routes", action: "Compare two correct class solutions. Find the shared facts, then decide which route you would use for these numbers and why.", finishCheck: "You can explain one connection between the routes.", minutes: "5 min" },
      { title: "Borrow one move", action: "Solve again using one useful move from another route, then compare it with your first attempt.", finishCheck: "Both routes agree, or you repaired the mismatch. Explain when the borrowed move would be useful.", minutes: "8 min" },
      { title: "Coach + check", action: "Teach one route to a partner one move at a time. Switch, then check the answer another way.", finishCheck: "Both partners can reuse one move and explain why the answer is reasonable.", minutes: "7 min" },
    ],
    finishEvidence: ["A quick estimate", "One accurate calculation route", "A second route or check", "A connection between methods", "A partner explanation"],
    saveAction: { kind: "keep-in-class", message: "Keep both routes in your Math folder. Make a Strategy Snapshot only if asked; do not make a separate post." },
    readiness: "quick",
  },
  "pack-and-sync": {
    id: "pack-and-sync", reviewState: "reviewed",
    challenge: "How many identical packs can you make from 24 blue and 36 gold counters, with none left over? When will two flashing lights next flash together?",
    why: "Factors tell us which numbers divide the supplies exactly. Multiples tell us the times reached by counting equal intervals.",
    firstAction: "Predict what goes in each of two identical packs made from 24 blue and 36 gold counters. Use objects, sketches, or the projected counter model.",
    materials: [
  "Optional: 24 blue and 36 gold counters per pair (buttons, cubes or paper squares work)",
  "Projector counter model if physical counters are unavailable",
  "Plain paper or mini-whiteboard and pencil; no special printing required"
],
    choices: [{ prompt: "How will you make the pattern visible?", options: [
      { label: "Build it", detail: "Move counters or tap the repeating signals." }, { label: "List it", detail: "Record factor pairs or growing multiples." }, { label: "Draw it", detail: "Use group circles, a table, or a number line." },
    ] }],
    steps: [
  {
    "title": "Predict, then build two packs",
    "action": "Start with 24 blue and 36 gold counters, or watch the screen model. Predict what belongs in each of two identical packs. Share each colour separately.",
    "finishCheck": "Check that the packs match colour by colour and use all supplies.",
    "minutes": "Lesson 1 · 8 min"
  },
  {
    "title": "Test and record",
    "action": "Try 3, 4, 5, 6, 8 and 12 packs. Before building, predict whether each will work. Record: number of packs | blue per pack | gold per pack | leftovers. Partners alternate building and checking.",
    "finishCheck": "Keep failed attempts: explain why 5 and 8 do not work. Use drawings or division once the pattern is clear.",
    "minutes": "Lesson 1 · 12 min"
  },
  {
    "title": "Prove you have them all",
    "action": "List all factor pairs of 24 and 36. Identify every shared factor, including 1. Choose the greatest possible pack count and multiply back.",
    "finishCheck": "Explain why equal total size alone is not enough: every pack needs the same number of EACH colour.",
    "minutes": "Lesson 1 · 8 min"
  },
  {
    "title": "Change the supplies",
    "action": "With 48 pencils and 72 erasers, find every possible number of identical packs. Then add 30 rulers and require identical contents with no leftovers.",
    "finishCheck": "Show how adding a third supply changes the possible pack counts. Explain why your new maximum works.",
    "minutes": "Lesson 1 · 15 min"
  },
  {
    "title": "Show your own reasoning",
    "action": "Independently use 20 red and 32 blue counters to find the greatest number of identical packs. State each pack’s contents and explain why there cannot be more.",
    "finishCheck": "A pack count, both per-pack quantities, and a proof or complete common-factor list.",
    "minutes": "Lesson 1 · 7 min"
  },
  {
    "title": "Choose factors or multiples",
    "action": "In the next lesson, model lights flashing every 4 and 6 seconds. Then solve 9/12-second and 6/8-second signals. Mix these with packing stories; decide which relationship each needs before calculating.",
    "finishCheck": "Explain first shared time versus greatest pack count; repair a claim that any common multiple is the least.",
    "minutes": "Lesson 2 · 45–55 min"
  }
],
    finishEvidence: [
  "A record of successful and unsuccessful pack counts",
  "A complete common-factor list and proof of the maximum",
  "A solution for 48 pencils, 72 erasers and then 30 rulers",
  "An individual 20/32 packing check",
  "In Lesson 2: a timeline and explanation distinguishing factors from multiples"
],
    saveAction: { kind: "keep-in-class", message: "Keep the kit record and signal timeline in class. No SpacesEDU post is needed." }, readiness: "teach",
  },
  "scoreboard-rules": {
    id: "scoreboard-rules", reviewState: "reviewed",
    challenge: "Why do 5 + 3 × 4 and (5 + 3) × 4 give different scores?",
    why: "We are learning to use one shared calculation order and add brackets when a rule could be misunderstood.",
    firstAction: "Build or copy 5 + 3 × 4. Work out how one team reached 32 and another reached 17.",
    materials: ["Score expressions", "Number and operation tiles or paper symbols", "Bracket cards", "Whiteboards or paper", "Pencils or markers"],
    choices: [{ prompt: "How will you test each rule?", options: [
      { label: "Move tiles", detail: "Build the expression and group completed moves." }, { label: "Mark the order", detail: "Number each calculation move." }, { label: "Point + explain", detail: "Follow the shared screen and name the next move." },
    ] }],
    steps: [
  {
    "title": "Test both claims",
    "action": "Recreate the thinking that produces 32 and the thinking that produces 17.",
    "finishCheck": "You can point to the different first move.",
    "minutes": "Session 1 · 10 min"
  },
  {
    "title": "Use the calculation order",
    "action": "Calculate inside brackets first. Then multiply or divide from left to right. Finally add or subtract from left to right.",
    "finishCheck": "5 + 3 × 4 becomes 5 + 12 = 17. Multiplication and division have equal priority; so do addition and subtraction.",
    "minutes": "Session 1 · 20 min"
  },
  {
    "title": "Change the brackets",
    "action": "Build (5 + 3) × 4 and compare it with the first expression.",
    "finishCheck": "Your work produces 32 and identifies why.",
    "minutes": "Session 1 · 20 min"
  },
  {
    "title": "Design a score card",
    "action": "Invent a whole-number expression. Put the ordered moves and checked score on a hidden answer side.",
    "finishCheck": "The front is clear and the hidden solution is correct.",
    "minutes": "Session 2 · 25 min"
  },
  {
    "title": "Trade + repair",
    "action": "Solve another team's card, compare results, and repair the rule if two readings were possible.",
    "finishCheck": "Both teams now read the rule the same way.",
    "minutes": "Session 2 · 25 min"
  }
],
    finishEvidence: ["5 + 3 × 4 solved as 17", "(5 + 3) × 4 solved as 32", "One checked score card", "A partner solution", "Any needed repair"],
    saveAction: { kind: "keep-in-class", message: "Keep the score card with the game materials or in your Math folder. No post is needed." }, readiness: "teach",
  },
  "fraction-ratio-remix": {
    id: "fraction-ratio-remix", reviewState: "reviewed",
    challenge: "How can we grow a 2:3 colour pattern without changing its balance, and rename 7/4 without changing its amount?",
    why: "Equivalent fractions name the same amount. Equivalent ratios keep the same proportions even when the total amount changes.",
    firstAction: "Build 2 blue tiles beside 3 gold tiles. Repeat that entire batch once.",
    materials: ["Coloured tiles or paper squares", "Fraction strips", "Broken-batch example", "Plain paper", "Scissors, glue, pencils, and colours"],
    choices: [{ prompt: "How will you build the models?", options: [
      { label: "Move pieces", detail: "Use tiles and fraction strips." }, { label: "Cut paper", detail: "Make equal parts and repeated batches." }, { label: "Draw + colour", detail: "Draw equal boxes or strips and label each amount." },
    ] }],
    steps: [
  {
    "title": "Build and distinguish",
    "action": "Build 2 blue and 3 gold. Label blue:gold and blue:all. Double the batch and explain what changes and what stays the same.",
    "finishCheck": "Part-to-part and part-to-whole comparisons have different totals.",
    "minutes": "Lesson 1 · 8 min"
  },
  {
    "title": "Scale and find missing quantities",
    "action": "For a 2:3 blue:gold mix, find the gold needed for 8 blue; the blue needed for 18 gold; and both quantities for 35 tiles altogether. Explain why adding 2 to both parts changes the balance.",
    "finishCheck": "Use a ratio table and a multiplier or repeated whole batches.",
    "minutes": "Lesson 1 · 17 min"
  },
  {
    "title": "Design under a constraint",
    "action": "You have 20 blue and 24 gold tiles. Build the largest possible 2:3 mix. State what is used and left. Could you use every tile? Justify.",
    "finishCheck": "Your design keeps the ratio and respects both supplies.",
    "minutes": "Lesson 1 · 18 min"
  },
  {
    "title": "Independent ratio check",
    "action": "A mix is 3 red:2 white. There are 35 tiles altogether. Find both colours; give red:all and explain the difference from red:white.",
    "finishCheck": "Show a calculation or model and label both quantities.",
    "minutes": "Lesson 1 · 7 min"
  },
  {
    "title": "Rename and compare fractions",
    "action": "In Lesson 2, model 7/4, then independently rename 11/4, 13/5 and 2 1/3. Order 7/5, 1 1/2 and 5/3 using equal wholes and benchmarks or common denominators.",
    "finishCheck": "Explain how you know the order; do not compare denominators alone.",
    "minutes": "Lesson 2 · 25 min"
  },
  {
    "title": "Reason, repair and check",
    "action": "Place 9/4 and 2 2/5 on one number line. Find a fraction between them. Repair “7/4 = 1 1/4.” Finish with the independent workshop questions.",
    "finishCheck": "The model, number names and explanation agree.",
    "minutes": "Lesson 2 · 25 min"
  }
],
    finishEvidence: [
  "A ratio table with missing quantities",
  "A constrained tile mix with leftovers explained",
  "An individual ratio solution",
  "Improper/mixed conversions and justified ordering",
  "A repaired fraction error"
],
    saveAction: { kind: "keep-in-class", message: "Keep the completed models in your Math folder. No post is needed." }, readiness: "teach",
  },
  "decimal-dispatch": {
    id: "decimal-dispatch", reviewState: "reviewed",
    challenge: "Could six $2.35 notebooks really cost $141—and how can we prove it?",
    why: "We are learning to estimate before calculating, use decimal place value, and catch answers that do not fit the situation.",
    firstAction: "Six notebooks cost a little more than $2 each. Write the total you expect before calculating exactly.",
    materials: ["Fictional invoices", "Price cards", "Place-value chart or decimal grid", "Paper and pencil", "Calculator for the final check"],
    choices: [{ prompt: "How will you show the calculation?", options: [
      { label: "Decimal grid", detail: "Build each amount, then combine the parts." }, { label: "Place-value chart", detail: "Keep every digit in its correct column." }, { label: "Written route", detail: "Use repeated addition or clear multiplication steps." },
    ] }],
    steps: [
  {
    "title": "Estimate and model",
    "action": "Estimate six notebooks at $2.35 each. Split 2.35 into 2 + 0.30 + 0.05 and calculate. Compare the result with the estimate.",
    "finishCheck": "Explain why $141 cannot fit.",
    "minutes": "Lesson 1 · 8 min"
  },
  {
    "title": "Practise varied quantities",
    "action": "Estimate then calculate 1.25 × 8, 0.125 × 6, 3.6 × 7 and 4.08 × 5. Show your method for two. Compare a method with your partner.",
    "finishCheck": "Check place value and explain why the answers have different sizes.",
    "minutes": "Lesson 1 · 15 min"
  },
  {
    "title": "Meet a budget",
    "action": "A club needs 8 notebooks at $2.35 and 6 pens at $1.40. The budget is $30; ignore tax. Can it afford one extra notebook? Show totals and money left.",
    "finishCheck": "A recommendation supported by calculations and units.",
    "minutes": "Lesson 1 · 20 min"
  },
  {
    "title": "Independent multiplication check",
    "action": "Calculate 0.24 × 7. Use an estimate and explain why 16.8 is unreasonable.",
    "finishCheck": "An exact product and a size-based explanation.",
    "minutes": "Lesson 1 · 7 min"
  },
  {
    "title": "Share and reverse",
    "action": "In Lesson 2 model 7.2 ÷ 9. Solve 4.8 ÷ 6, 9.6 ÷ 8, 12.6 ÷ 3 and 3.75 ÷ 5. Check with multiplication.",
    "finishCheck": "Connect whole-number facts to tenths and hundredths.",
    "minutes": "Lesson 2 · 20 min"
  },
  {
    "title": "Solve, diagnose and check",
    "action": "Share 7.5 m of ribbon equally among 6 groups. Each uses 0.85 m; how much remains per group? Repair 8.4 ÷ 4 = 21. Finish with the independent workshop questions.",
    "finishCheck": "Choose operations, show units and check the result.",
    "minutes": "Lesson 2 · 30 min"
  }
],
    finishEvidence: [
  "Estimates and varied decimal products",
  "A checked purchasing decision",
  "Decimal quotients checked by multiplication",
  "A ribbon problem with units",
  "Independent calculation and error explanation"
],
    saveAction: { kind: "keep-in-class", message: "Keep the repaired invoice in your Math folder. No post is needed." }, readiness: "teach",
  },
  "sale-lab": {
    id: "sale-lab", reviewState: "reviewed",
    challenge: "A sign says 25% off. How much do you save, what do you pay, and is the item useful?",
    why: "We are learning to connect simple percents to fractions, calculate discounts, and make a budget choice based on needs.",
    firstAction: "Shade 25 squares on a hundred grid and mark the same part as one quarter.",
    materials: ["Hundred grids", "Fictional offer cards", "Event brief and budget sheet", "Paper, pencils, and colours", "Calculator for checking"],
    choices: [{ prompt: "How will you find each percent?", options: [
      { label: "Hundred grid", detail: "Shade the percent and connect it to the price." }, { label: "Friendly fraction", detail: "Use one tenth, one quarter, or one half." }, { label: "Number table", detail: "Record original price, savings, and final price." },
    ] }],
    steps: [
      { title: "Build percent landmarks", action: "Match 10%, 25%, and 50% to shaded grids, friendly fractions, and whole-number examples.", finishCheck: "Every model and number agrees.", minutes: "Session 1 · 55 min" },
      { title: "Find sale prices", action: "Find the amount saved first, then subtract it from the original price.", finishCheck: "Each offer separates original price, discount, and final price.", minutes: "Session 2 · 55 min" },
      { title: "Read the brief", action: "Mark the required items, spending limit, and two useful or welcoming features.", finishCheck: "Your group knows the must-haves before shopping.", minutes: "Session 3 · 20 min" },
      { title: "Build a budget plan", action: "Compare two possible purchases using the brief. Show the prices and running total, then justify your choice using both cost and usefulness.", finishCheck: "Every must-have is included and the checked total stays within the limit.", minutes: "Session 3 · 35 min" },
      { title: "Respond + redesign", action: "Draw a surprise card, change the plan, recalculate affected totals, and show before and after.", finishCheck: "The revised plan still meets the needs and budget.", minutes: "Session 4 · 55 min" },
    ],
    finishEvidence: ["Percent and fraction models", "Correct savings and prices", "A complete event plan", "A checked total", "A recalculated redesign"],
    saveAction: { kind: "keep-in-class", message: "Keep the event board in class. Use it as January evidence only if asked; do not make a separate post." }, readiness: "quick",
  },
  "equation-balance": {
    id: "equation-balance", reviewState: "reviewed",
    challenge: "How can we uncover a missing number without making the equation unbalanced?",
    why: "An equals sign means both sides have the same value. Whatever changes on one side must also change on the other.",
    firstAction: "Build □ + 4 = 11 with a covered cup and tiles. Check that both sides show the same total.",
    materials: ["Balance mat", "Covered cup or mystery card", "Counters", "Equation cards", "Paper or whiteboard"],
    choices: [{ prompt: "How will you show the balance?", options: [
      { label: "Build it", detail: "Use a cup, counters, and a balance mat." }, { label: "Draw it", detail: "Sketch both sides and cross out matching changes." }, { label: "Act + explain", detail: "Direct a partner moving pieces and explain each move." },
    ] }],
    steps: [
      { title: "Build equality", action: "Build and read □ + 4 = 11 as two amounts that are equal.", finishCheck: "Both sides show the same total before anything moves.", minutes: "Session 1 · 15 min" },
      { title: "Undo on both sides", action: "Remove 4 from both sides and record the matching move.", finishCheck: "The balance remains equal and the mystery value is 7.", minutes: "Session 1 · 25 min" },
      { title: "Check the answer", action: "Put 7 back into the original equation and calculate both sides.", finishCheck: "The original equation becomes 7 + 4 = 11.", minutes: "Session 1 · 15 min" },
      { title: "Solve new positions", action: "Solve several one-step equations with the mystery before or after an operation.", finishCheck: "Each solution keeps both sides equal and includes a check.", minutes: "Session 2 · 55 min" },
      { title: "Design + trade", action: "Create one mystery equation, trade it, and repair any unclear clue.", finishCheck: "The final equation has one whole-number solution and a correct check.", minutes: "Session 3 · 55 min" },
    ],
    finishEvidence: ["A balanced model", "Matching changes on both sides", "A correct missing value", "A check", "One solved partner mystery"],
    saveAction: { kind: "keep-in-class", message: "Keep the equation work in your Math folder. No post is needed." }, readiness: "teach",
  },
  "graph-story-lab": {
    id: "graph-story-lab", reviewState: "reviewed",
    challenge: "How can two graphs use the same numbers but make the change look different?",
    why: "We are learning to read scales, build an accurate line graph, and say only what its evidence can support.",
    firstAction: "Look at both projected graphs. Circle where each vertical scale begins and write what one jump is worth.",
    materials: ["Same-data graph pair", "Anonymous or fictional data cards", "Painter's tape or string", "Grid paper, ruler, pencil, and colours", "Optional shared graphing tool"],
    choices: [{ prompt: "How will you join the class model?", options: [
      { label: "Human graph", detail: "Hold a data card and stand at its value." }, { label: "Desk model", detail: "Arrange cards or objects at different heights." }, { label: "Point + record", detail: "Direct placements and record values." },
    ] }],
    steps: [
      { title: "Become the graph", action: "Place the shared data in time order and make each height match its value.", finishCheck: "The class model matches every data card.", minutes: "Session 1 · 25 min" },
      { title: "Tell the pattern", action: "Describe where the amount rises, falls, or stays close without explaining why yet.", finishCheck: "Every statement can be checked against the values.", minutes: "Session 1 · 25 min" },
      { title: "Compare the scales", action: "Compare the starting points and jumps on two graphs of the same data. Which helps you read exact values? Which helps you notice small changes? Justify a scale for your purpose.", finishCheck: "You can explain why one graph looks steeper without calling its values false.", minutes: "Session 2 · 50–55 min" },
      { title: "Build an honest graph", action: "Draw the data with a title, labelled axes, units, equal jumps, and a useful scale.", finishCheck: "A partner can recover the original values. Explain what your scale makes easier to notice and what it makes less obvious.", minutes: "Session 3 · 35–40 min" },
      { title: "Claim + limit", action: "Write one sentence the graph supports and one question it cannot answer.", finishCheck: "The claim uses visible data and the limit names missing information.", minutes: "Session 3 · 15 min" },
    ],
    finishEvidence: ["A correct class or desk model", "A same-data scale comparison", "An accurate line graph", "One supported claim", "One honest limit"],
    saveAction: { kind: "add-to-existing-post", message: "Keep the graph in Math. If it strengthens the existing Science Investigation Story, add it there once when asked." }, readiness: "quick",
  },
  "probability-game-audit": {
    id: "probability-game-audit", reviewState: "reviewed",
    challenge: "If blue has a 1-in-4 chance, must it appear exactly 5 times in 20 tries?",
    why: "We are learning to predict chance from a game's design, compare it with real trials, and explain why short results vary.",
    firstAction: "Choose one result. Count all equally likely outcomes, then count how many give your chosen result.",
    materials: ["Dice, paper spinners, or opaque bags", "Counters and paper clips", "Trial table", "Markers, scissors, and tape", "Class total board"],
    choices: [{ prompt: "Which chance model will you test?", options: [
      { label: "Spinner", detail: "Use equal-sized sections." }, { label: "Die", detail: "Use equally likely faces." }, { label: "Mystery bag", detail: "Draw, record, replace, and mix each time." },
    ] }],
    steps: [
      { title: "Predict from the design", action: "Write the chosen result as favourable outcomes over all equally likely outcomes.", finishCheck: "The fraction matches the game design.", minutes: "Session 1 · 30–35 min" },
      { title: "Test 20 times", action: "Test the game 20 times in the same way. Tally every result, including repeated results that surprise you.", finishCheck: "The table contains exactly 20 trials.", minutes: "Session 1 · 20 min" },
      { title: "Combine + compare", action: "Add class results and compare the experimental fraction with the design prediction.", finishCheck: "You name both fractions and describe the difference without calling normal variation cheating.", minutes: "Session 2 · 50–55 min" },
      { title: "Change the chance", action: "Alter one section, face, or counter. Predict the new chance before testing.", finishCheck: "The changed design and prediction agree.", minutes: "Session 3 · 45–55 min" },
      { title: "Retest + explain", action: "Run another fair test. Separate the chance predicted by the design from the results you observed. Explain why another group could get different results without either group making an error.", finishCheck: "Your conclusion uses the design and trial evidence.", minutes: "Session 4 · 45–55 min" },
    ],
    finishEvidence: ["A design-based probability", "A complete tally", "A class-total comparison", "A redesigned game", "An explanation of variation"],
    saveAction: { kind: "keep-in-class", message: "Keep the chance-game record in class. Add it only if it is selected as the Data and Probability example." }, readiness: "teach",
  },
  "zoo-design-studio": {
    id: "zoo-design-studio", reviewState: "reviewed",
    challenge: "Can six habitats fit while every area, fence, path, and access rule still works?",
    why: "We are learning to use shape properties, perimeter, area, and checking to make a design that survives real limits.",
    firstAction: "Read the fictional brief. Mark the site size, six habitats, path width, entry, quiet area, and every unit.",
    materials: ["Zoo brief and habitat cards", "Plain and 1 cm grid paper", "Rulers, scissors, glue, pencils, and colours", "Calculator after showing a method", "Peer-check card"],
    choices: [{ prompt: "How will you plan before the final map?", options: [
      { label: "Cut + move", detail: "Copy and move habitat shapes on the grid." }, { label: "Sketch options", detail: "Draw two rough layouts before choosing." }, { label: "Build a table model", detail: "Use paper shapes or tiles, then record the grid plan." },
    ] }],
    steps: [
      { title: "Build the shape skills", action: "Complete the opened polygon, perimeter, and area workshops. Mark perpendicular heights where needed.", finishCheck: "Your practice has a checked example for each project skill.", minutes: "Block 1 · 45–55 min" },
      { title: "Read + rough-plan", action: "Choose six habitats and make at least two arrangements before selecting one.", finishCheck: "Both rough plans respond to the site and access rules.", minutes: "Block 2 · 45–55 min" },
      { title: "Draw + calculate", action: "Make the exact grid plan. Label dimensions, areas, fence lengths, paths, entry, quiet area, and connections.", finishCheck: "Every required space fits and each calculation includes the correct unit.", minutes: "Blocks 3–4 · 90–110 min" },
      { title: "Peer inspection", action: "Trade plans. Check one area calculation, one perimeter calculation, one shape rule, and whether the 2 m path connects the required places.", finishCheck: "The card contains evidence and one precise question or correction.", minutes: "Block 5 · 20–25 min" },
      { title: "Revise + explain", action: "Change one part because of the inspection. Mark the before, evidence, change, and result.", finishCheck: "The final map works and you can explain one calculation and revision.", minutes: "Block 5 · 25–30 min" },
    ],
    finishEvidence: ["A complete zoo map", "Labelled dimensions and units", "Checked calculations", "A peer inspection", "One visible revision and explanation"],
    saveAction: { kind: "new-post", message: "Make one April Zoo Design Mathematics post when asked. Add clear images, one calculation, the peer finding, and the change it caused." }, readiness: "teach",
  },
  "transformation-cipher": {
    id: "transformation-cipher", reviewState: "reviewed",
    challenge: "Can a partner follow two moves in your code and place the shape exactly?",
    why: "We are learning to combine two slides, flips or turns on a coordinate grid. Every point must follow both moves in order.",
    firstAction: "Plot one point in the first quadrant. Read the ordered pair across first, then up.",
    materials: ["First-quadrant grids", "Optional four-quadrant extension grid", "Creature point cards", "Tracing paper", "Rulers, pencils, and colours"],
    choices: [{ prompt: "Which two moves will your code use?", options: [
      { label: "Slide", detail: "Move every point the same distance and direction." }, { label: "Flip", detail: "Reflect every point across the named line." }, { label: "Turn", detail: "Rotate every point around the named centre." },
    ] }],
    steps: [
      { title: "Plot the creature", action: "Plot and connect the supplied positive-coordinate points.", finishCheck: "Every ordered pair is read x first, then y.", minutes: "Session 1 · 15 min" },
      { title: "Combine two moves", action: "Apply a slide, flip or turn. Then apply a second move. Record every point after each move. Keep all points in the first quadrant.", finishCheck: "Both new figures keep the starting shape's size and shape.", minutes: "Session 1 · 30–35 min" },
      { title: "Write the code", action: "Create a shape and write a code for two moves in order. Name any mirror line or turn centre. Record the points after both moves.", finishCheck: "The code names starting points, both moves in order, and points after each move.", minutes: "Session 2 · 30 min" },
      { title: "Decode without coaching", action: "Exchange codes and build the other team's result without asking what they meant.", finishCheck: "The decoded figure can be compared point by point with the original.", minutes: "Session 2 · 25 min" },
      { title: "Find + repair", action: "Circle the first mismatch, identify the unclear instruction, and test a repaired version.", finishCheck: "A new reader can now reproduce the move.", minutes: "Optional Session 3 · 20–30 min" },
    ],
    finishEvidence: ["An accurate first-quadrant figure", "Two correct transformations in order", "A complete code", "A partner's decoded drawing", "One repaired instruction if needed"],
    saveAction: { kind: "keep-in-class", message: "Keep the cipher card with the partner game or in your Math folder. No post is needed." }, readiness: "teach",
  },
  "space-under-constraints": {
    id: "space-under-constraints", reviewState: "reviewed",
    challenge: "Can a bold learning space fit the site, budget, materials, visitors, and access rules?",
    why: "We are learning to use measurement, area, capacity, cost, and checking to improve a design instead of decorating an impossible plan.",
    firstAction: "Read the brief and copy the site size, budget, visitor number, doorway width, and must-have spaces.",
    materials: ["Fictional brief and price cards", "Plain and grid paper", "Rulers, scissors, tape, glue, and colours", "Unit cubes or paper models", "Calculator for checking"],
    choices: [{ prompt: "How will you explore the first plan?", options: [
      { label: "Free sketch", detail: "Draw boldly first, then transfer it to a measured grid." }, { label: "Cut + arrange", detail: "Move paper zones before recording sizes." }, { label: "Table model", detail: "Arrange cubes or folded pieces, then draw the matching plan." },
    ] }],
    steps: [
      { title: "Read + imagine", action: "Mark every fixed limit, then make a free first sketch without calculating yet.", finishCheck: "The sketch has every must-have space and the limit list is complete.", minutes: "Block 1 · 45–55 min" },
      { title: "Draw to scale", action: "Redraw on the grid using the stated scale. Label boundaries, dimensions, and area.", finishCheck: "The plan fits the site and another person can check its measurements.", minutes: "Blocks 2–3 · 90–110 min" },
      { title: "Cost + capacity check", action: "Complete the price record and check visitor space, doorway width, storage, and one capacity calculation.", finishCheck: "The design stays within limits and every number has a unit.", minutes: "Block 4 · 45–55 min" },
      { title: "Build one feature", action: "Make one paper or cube model that matches a labelled part of the plan.", finishCheck: "The model's measurements match the drawing.", minutes: "Block 5 · 45–55 min" },
      { title: "Break-test + redesign", action: "Trade plans, find one size, cost, capacity, or access failure, then show the old and new versions.", finishCheck: "The revision responds to evidence and protects the main purpose.", minutes: "Blocks 6–7 · 75–105 min" },
    ],
    finishEvidence: ["A complete limit list", "An exact scaled plan", "A checked cost and measurement record", "One physical feature", "A before-and-after revision"],
    saveAction: { kind: "keep-in-class", message: "Save this work in SpacesEDU only if your teacher uses it in place of Zoo Design or another major design project. It does not need an extra post." }, readiness: "quick",
  },
} as const satisfies Record<string, StudentLessonContract>;
