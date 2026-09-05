import type { MathSupportPack } from "./math-program-supports";
import type { WordHelp } from "./program-types";

const words = (...items: [string, string, string][]): WordHelp[] => items.map(([term, meaning, example]) => ({ term, meaning, example }));

/**
 * Complete teacher-led replacement packs for the five experiences that already
 * had strong applications but did not yet have a full, printable concept lesson.
 * Math Antics can support these lessons; none of the core learning depends on it.
 */
export const mathCoreDepthPacks: MathSupportPack[] = [
  {
    id: "magnitude-place-value-pack",
    anchorIds: ["magnitude-gallery"],
    title: "Read and compare numbers on a number line",
    shortTitle: "Magnitude and place-value workshop",
    timing: "September · Weeks 1–2",
    blocks: "2 × 45–55 min + short retrieval",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Whole Numbers Greater Than One Million", "Representing, Estimating, and Comparing Decimal Numbers"],
    prerequisite: "Read whole numbers to one million and connect tenths and hundredths to equal parts of one whole.",
    learningGoal: "read numbers from thousandths to billions, compare their place values, and place them on a labelled number line.",
    whyBefore: "The Magnitude Gallery becomes meaningful only when students can name what one interval is worth. This complete paper-and-projector lesson teaches that idea before the interactive scale changes.",
    background: [
      "A digit has a face value and a place value. In 0.008, the 8 means eight thousandths; in 0.08 it means eight hundredths.",
      "Read a number line in this order: left endpoint, right endpoint, number of equal spaces, value of one space. Do not assume every mark is worth one.",
      "On a 0-to-1 line, 0.008 sits in the first hundredth. On a 0-to-0.01 line, the same number sits eight tenths of the way across. The number stays fixed while the scale changes.",
      "For large numbers, group digits in threes and name the periods: ones, thousands, millions, billions. Compare the greatest place first.",
    ],
    teacherMoves: [
  "Write 0.008 in a chart: 0 ones, 0 tenths, 0 hundredths, 8 thousandths. Compare it with 0.080, which has 8 hundredths.",
  "Draw 0 to 0.01 with ten equal spaces. Label every mark from 0.001 to 0.010, then place 0.008.",
  "Widen the range to 0–0.1, then 0–1. Ask which two marks enclose 0.008. Draw a magnified section to show its exact position.",
  "Use the supplied model to compare 2,306,000,000 with 2,360,000,000 from left to right. Then let partners try the different 3-billion pair.",
  "Show 0.45 and 0.405 as 0.450 and 0.405. The tenths match; compare the hundredths: 5 is greater than 0."
],
    studentMoves: [
      "Label the endpoints and calculate one equal interval before placing any card.",
      "Build 0.008 in a place-value chart and place it on three differently scaled lines.",
      "Compare two decimals by aligning place values and using a benchmark or number line.",
      "Read two large numbers by periods, locate the first unequal place, and justify the comparison.",
      "Create a two-scale trap for a partner, then revise any label that allowed two interpretations.",
    ],
    supplied: ["Thousandths place-value chart","Three worked number lines for 0.008", "Reusable blank scales and period chart", "Two-page printable maths sheet", "Worked billions comparison","Decimal and large-number comparison questions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Board or projector", "Plain paper or printed lines", "Pencils and two colours", "Optional place-value disks"],
    vocabulary: words(
      ["place value", "the value a digit has because of its position", "The 8 in 0.008 means eight thousandths"],
      ["thousandth", "one of one thousand equal parts of a whole", "0.008 is eight thousandths"],
      ["scale", "the values represented by the marks on a line or graph", "A line may count by 0.1, 0.01, or ten million"],
      ["interval", "the equal space between two neighbouring marks", "Ten equal spaces from 0 to 0.1 are worth 0.01 each"],
      ["period", "a group of three digits in a large number", "3 | 405 | 000 | 000 has billions, millions, thousands, and ones periods"],
    ),
    model: {
  "label": "WORKED EXAMPLES · THOUSANDTHS AND BILLIONS",
  "prompt": "Place 0.008 on three scales. Then compare two large numbers.",
  "steps": [
    "Read 0.008 as eight thousandths. One hundredth, 0.01, is ten thousandths, so 0.008 is less than 0.01.",
    "Start with the 0-to-0.01 line. Ten equal spaces divide ten thousandths into jumps of one thousandth: 0.001.",
    "Count eight jumps from 0. The eighth mark is 0.008. It is three jumps after the halfway point, 0.005.",
    "On the 0-to-0.1 line, each jump is 0.01. Since 0.008 is less than 0.01, place it between 0 and the first mark.",
    "On the 0-to-1 line, each jump is 0.1. The point is very close to 0. Enlarge the first hundredth if you need to mark 0.008 exactly.",
    "Now compare 2,306,000,000 and 2,360,000,000. Group the digits into billions, millions, thousands and ones periods.",
    "Read from the left. Both numbers have 2 billions and 3 hundred-millions. The ten-millions digits are the first to differ: 0 and 6.",
    "Six ten-millions is greater than zero ten-millions, so 2,360,000,000 is greater than 2,306,000,000."
  ],
  "conclusion": "The number stays eight thousandths. A line covering a larger range puts the same number closer to 0. For large numbers, compare from the greatest place and stop at the first different digit."
},
    partnerCards: [
  {
    "title": "TINY DECIMAL",
    "body": "Draw a line from 0 to 0.01 with ten equal spaces. Label the value of one jump, then place 0.006.",
    "answer": "Each jump is 0.001. Place 0.006 at the sixth mark after 0."
  },
  {
    "title": "CHANGE THE ENDPOINT",
    "body": "Place 0.04 on two lines with ten equal spaces: 0 to 0.1 and 0 to 1. Which marks enclose it on each line?",
    "answer": "On 0–0.1, each jump is 0.01, so 0.04 is at the fourth mark. On 0–1, it lies between 0 and the first mark, 0.1. Its value stays the same."
  },
  {
    "title": "COMPARE BY PLACE",
    "body": "Which is greater: 0.405 or 0.045? Compare the tenths first and explain your answer.",
    "answer": "0.405 > 0.045. Four tenths is greater than zero tenths."
  },
  {
    "title": "BILLION VIEW",
    "body": "Read 3,405,000,000 and 3,450,000,000. Compare them from left to right. Which place first has different digits?",
    "answer": "3 billion 405 million and 3 billion 450 million. The ten-millions digits first differ: 0 and 5. Therefore 3,450,000,000 is greater."
  }
],
    check: [
  {
    "prompt": "A line from 0 to 0.1 has ten equal spaces. What is each jump worth?",
    "answer": "0.01, or one hundredth."
  },
  {
    "prompt": "A line from 0 to 0.01 has ten equal spaces. Where does 0.008 belong? Explain using the value of one jump.",
    "answer": "At the eighth mark after 0. Each jump is 0.001, and eight thousandths is 0.008."
  },
  {
    "prompt": "Which is greater: 807,090,000 or 870,009,000? Name the first place that decides.",
    "answer": "870,009,000. Both have 8 hundred-millions. The ten-millions digits are 0 and 7, so the second number is greater."
  }
],
    readinessQuestions: [
      { prompt: "Ten equal spaces run from 0 to 0.1. What is one space?", choices: ["0.1", "0.01", "0.001"], answer: 1, feedback: "Divide the whole interval, 0.1, by ten equal spaces." },
      { prompt: "Which number is eight thousandths?", choices: ["0.8", "0.08", "0.008"], answer: 2, feedback: "The third place to the right of the decimal is thousandths." },
    ],
    likelyMisconceptions: ["Counting tick marks instead of equal spaces", "Assuming every interval is worth one", "Treating a farther-right display as a larger value when the scale changed", "Comparing decimals by digit count"],
    supportRoute: "Start with 0 to 0.01 only. Label all ten jumps, then count to 0.008. Compare 0.008 with 0.005 and 0.010 before changing the scale.",
    extensionRoute: "Design two accurate scales that make the same change look visually steep and gentle, then explain why neither changes the underlying values.",
    spaces: "Keep the scale comparison in the Math folder; no separate SpacesEDU post is required.",
  },
  {
    id: "factors-multiples-pack",
    anchorIds: ["pack-and-sync"],
    title: "Make equal packs and time flashing lights",
    shortTitle: "Factors, multiples, GCF, and LCM workshop",
    timing: "October · Weeks 7–8",
    blocks: "3 × 45–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Factors and Multiples", "BC_Working With Factors and Multiples"],
    prerequisite: "Build equal groups and use multiplication/division facts within 100 with a chart or manipulatives when needed.",
    learningGoal: "find common factors to make identical packs, and find common multiples to work out when two lights next flash together.",
    whyBefore: "Pack It / Sync It asks students to select the idea from context. This workshop makes factors, multiples, greatest common factor, and least common multiple visible before the mission.",
    background: [
      "A factor divides an amount into equal whole-number groups with no leftovers. Factor pairs multiply to make the amount.",
      "A common factor divides two or more amounts exactly. The greatest common factor makes the greatest possible number of identical packs.",
      "Multiples are the results of counting by a number. Common multiples are meeting points shared by two repeating sequences.",
      "The least common multiple is the first positive meeting point. GCF and LCM can use the same numbers but answer different story questions.",
    ],
    teacherMoves: [
      "Arrange 24 red and 36 blue counters into equal packs; test possible pack counts and record the common factors.",
      "Use the greatest common factor, 12, to make 12 identical packs with 2 red and 3 blue in each.",
      "Act out signals every 4 and 6 counts on one timeline; mark 12 as the first shared meeting.",
      "Place two nearly identical stories side by side and underline the clues ‘greatest identical packs’ and ‘first meet again.’",
      "Model a divisibility or skip-counting check instead of requiring prime factorization as the only method.",
    ],
    studentMoves: [
      "Build several exact pack counts and list the numbers that divide both supplies.",
      "Choose the greatest common factor and prove what belongs in each pack.",
      "Tap, step, list, or draw two repeating sequences and circle every meeting point.",
      "Choose the least positive common multiple and connect it to the first meeting time.",
      "Sort new stories into factor, multiple, or not enough information, then justify the clue used.",
    ],
    supplied: ["Twelve-pack diagram","Factor lists and flashing-light times","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Two colours of counters or small objects", "Paper plates, hoops, or drawn group circles", "Timeline strips", "Pencils"],
    vocabulary: words(
      ["factor", "a whole number that divides an amount exactly", "6 is a factor of 24 because 24 ÷ 6 = 4"],
      ["multiple", "a number reached by multiplying or skip-counting", "24 is a multiple of 6"],
      ["common factor", "a factor shared by two or more numbers", "6 is a common factor of 24 and 36"],
      ["greatest common factor", "the greatest factor shared by the amounts", "GCF(24,36)=12"],
      ["least common multiple", "the first positive multiple shared by repeating sequences", "LCM(4,6)=12"],
    ),
    model: {
  "label": "WORKED EXAMPLE · THE SAME NUMBERS, TWO JOBS",
  "prompt": "How do 24 and 36 help us make packs and time flashing lights?",
  "steps": [
    "Packing problem: use 24 blue and 36 gold badges to make as many identical packs as possible, with none left over. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36.",
    "The shared factors are 1, 2, 3, 4, 6 and 12. Choose the greatest, 12. Each pack gets 24 ÷ 12 = 2 blue and 36 ÷ 12 = 3 gold badges.",
    "Check the supplies: 12 × 2 = 24 blue and 12 × 3 = 36 gold. All badges are used in 12 identical packs.",
    "Light problem: two lights flash together at 0 seconds. One flashes every 24 seconds: 24, 48, 72. One flashes every 36 seconds: 36, 72.",
    "The first shared time after 0 is 72 seconds. This is the least common multiple of 24 and 36. The lights next flash together after 72 seconds."
  ],
  "conclusion": "The pack count must divide both supplies exactly. The shared flash time must be a multiple of both time intervals."
},
    partnerCards: [
  {
    "title": "RESCUE PACKS",
    "body": "Use 18 blue and 30 gold badges to make the greatest possible number of identical kits with none left. List the common factors, then state the number of kits and each kit's contents.",
    "answer": "Common factors: 1, 2, 3, 6. Make 6 kits, each with 3 blue and 5 gold badges. Check: 6 × 3 = 18 and 6 × 5 = 30."
  },
  {
    "title": "SIGNAL MEETING",
    "body": "Two lights flash together at 0 seconds. One repeats every 9 seconds and one every 12 seconds. List both sets of flash times until you find their next shared flash.",
    "answer": "9, 18, 27, 36 and 12, 24, 36. They next flash together at 36 seconds."
  },
  {
    "title": "CHOOSE THE TOOL",
    "body": "Use 28 pencils and 42 erasers to make as many identical prize bags as possible, with none left. Do you need common factors or common multiples? Solve and check.",
    "answer": "Common factors. GCF(28,42) = 14. Make 14 bags with 2 pencils and 3 erasers each. Check: 14 × 2 = 28 and 14 × 3 = 42."
  },
  {
    "title": "REPAIR THE CLAIM",
    "body": "A learner says the LCM of 4 and 6 is 24 because both lists include 24. Write the first six positive multiples of 4 and first four of 6. Find and explain the mistake.",
    "answer": "4: 4, 8, 12, 16, 20, 24. 6: 6, 12, 18, 24. Both include 12 before 24, so the least common multiple is 12."
  }
],
    check: [
  {
    "prompt": "Use 20 red and 32 blue counters in the greatest possible number of identical groups, with none left. How many groups, and what is in each?",
    "answer": "GCF(20,32) = 4. Four groups, each with 5 red and 8 blue counters."
  },
  {
    "prompt": "Two lights flash together now, then every 5 seconds and every 8 seconds. When is their next shared flash? Show both lists.",
    "answer": "5, 10, 15, 20, 25, 30, 35, 40 and 8, 16, 24, 32, 40. Next together at 40 seconds."
  },
  {
    "prompt": "Why must a pack count be a factor of both supply amounts?",
    "answer": "Every pack needs the same whole-number count of each item, with none left. Dividing either supply by the pack count must give no remainder."
  }
],
    readinessQuestions: [
      { prompt: "Which number is a factor of both 24 and 36?", choices: ["5", "6", "8"], answer: 1, feedback: "Both 24 and 36 divide exactly by 6." },
      { prompt: "Which list shows multiples of 4?", choices: ["1, 2, 4", "4, 8, 12", "4, 6, 8"], answer: 1, feedback: "Multiples of 4 are reached by counting 4, 8, 12, and onward." },
    ],
    likelyMisconceptions: ["Calling factors and multiples the same thing", "Choosing any common value instead of the greatest or least one requested", "Using GCF for a repeating meeting story", "Assuming prime factorization is required"],
    supportRoute: "Try 2, 3 and 6 equal packs with 12 blue and 18 gold counters. Divide each colour separately. For multiples, mark every fourth and sixth second on one line from 0 to 12.",
    extensionRoute: "Design two stories using the same pair of numbers—one requiring GCF and one requiring LCM—and peer-test whether the clues are unambiguous.",
    spaces: "Keep the packing mat and timeline in class; teacher observation is sufficient evidence.",
  },
  {
    id: "pattern-relations-pack",
    anchorIds: ["pattern-forecast"],
    title: "Describe growing and shrinking patterns",
    shortTitle: "Increasing and decreasing relations workshop",
    timing: "January · before Pattern Forest",
    blocks: "3 × 45–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Patterns"],
    prerequisite: "Continue a numeric or visual pattern and plot ordered pairs in the first quadrant.",
    learningGoal: "show a pattern in a table and graph, write a rule, and use the rule to find a later stage.",
    whyBefore: "Pattern Forest interactively develops increasing rules. This full workshop adds an equally visible decreasing route and connects both directions to tables, graphs, expressions, forecasts, and context limits.",
    background: [
      "A relation connects an input, such as stage number n, with one output value. Each table row and graph point must describe the same stage.",
      "A constant change means the same amount is added or removed each stage. Increasing and decreasing patterns can both have a constant change.",
      "For a Stage 1 value of 7 that grows by 4, 4n + 3 works because 4(1)+3=7. Testing n=1 catches many rules with the right change but wrong start.",
      "For a Stage 1 value of 42 that loses 5, 42 − 5(n−1) keeps Stage 1 at 42. A symbolic rule may continue below zero even when a physical story must stop.",
    ],
    teacherMoves: [
      "Build Stages 1–4 of 7, 11, 15, 19 with counters; colour the four new pieces and the three fixed pieces differently.",
      "Record the same stages in a table and plot (1,7), (2,11), (3,15), and (4,19) with equal axis intervals.",
      "Write the rule first in words, then as 4n+3, and test n=1 and n=10.",
      "Build the decreasing route 42, 37, 32, 27 and connect it to 42−5(n−1).",
      "Ask when the decreasing physical context must stop even though an expression can keep producing values.",
    ],
    studentMoves: [
      "Build or draw four stages and mark what changes and what stays fixed.",
      "Complete a value table and verify that every row matches the model.",
      "Plot the ordered pairs with stage on the horizontal axis and value on the vertical axis.",
      "Write the rule in words and symbols; test Stage 1 before making a far forecast.",
      "Compare one increasing and one decreasing route, including the stage where a physical interpretation no longer makes sense.",
    ],
    supplied: ["Growing and shrinking pattern tables","Worked stage rules","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Counters or tiles", "Grid paper", "Pencils and two colours", "Ruler"],
    vocabulary: words(
      ["relation", "a connection between an input and an output", "Stage 3 connects to 15 lights"],
      ["constant change", "the same amount added or removed each step", "The pattern changes by −5 each stage"],
      ["expression", "numbers, operations, and variables that describe a value", "4n+3"],
      ["variable", "a letter standing for a number that can change", "n stands for stage number"],
      ["coordinate", "an ordered pair locating one input and output on a graph", "(3,15) means Stage 3 has value 15"],
    ),
    model: {
  "label": "WORKED EXAMPLE · WRITE A RULE THAT FITS STAGE 1",
  "prompt": "How many lights are at Stage 10 if Stage 1 has 7 and each new stage adds 4?",
  "steps": [
    "Write the first four stages: 1 → 7, 2 → 11, 3 → 15, 4 → 19. The number of lights increases by 4 each time.",
    "From Stage 1 to Stage 10 there are 9 increases. Start with 7, then add nine groups of 4: 7 + 9 × 4 = 43 lights.",
    "Let n stand for the stage number. There are n − 1 increases after Stage 1. The rule is 7 + 4 × (n − 1), which is also 4n + 3.",
    "Check Stage 1: 4 × 1 + 3 = 7. Plot (1,7), (2,11), (3,15), (4,19), with stage across and lights up. Each point must match the table.",
    "For a shrinking pattern starting at 42 and losing 5 each stage, use 42 − 5 × (n − 1). Stage 9 has 2 left. Stage 10 would give −3, so this count of objects stops at Stage 9."
  ],
  "conclusion": "Start with Stage 1 and count the changes. Test the rule at Stage 1 before using it to predict a later stage."
},
    partnerCards: [
      { title: "INCREASING ROUTE", body: "Stage 1 has 6 tiles and each new stage adds 3. List Stages 1–5, write a rule, and find Stage 10.", answer: "6,9,12,15,18; rule 3n+3; Stage 10=33." },
      { title: "DECREASING ROUTE", body: "Stage 1 has 50 tickets and each stage uses 6. List Stages 1–5 and write a rule using n−1.", answer: "50,44,38,32,26; rule 50−6(n−1)." },
      { title: "GRAPH CHECK", body: "A table shows (1,12), (2,9), (3,6), (4,3). Which axis holds stage, and what direction should the points move?", answer: "Stage is horizontal; the points move down from left to right with constant change −3." },
      { title: "CONTEXT LIMIT", body: "For 25−4(n−1), find the last stage with a non-negative whole number of objects.", answer: "Stage 7 gives 1; Stage 8 gives −3, so Stage 7 is the last physical stage." },
    ],
    check: [
      { prompt: "For 5, 9, 13, 17, write a rule with Stage 1 equal to 5 and find Stage 20.", answer: "4n+1; Stage 20=81." },
      { prompt: "For 36, 31, 26, 21, write a decreasing rule and find Stage 7.", answer: "36−5(n−1); Stage 7=6." },
      { prompt: "Explain one way a graph can reveal whether a table and rule disagree.", answer: "The plotted points will not follow the expected constant rise/fall or one point will not match the rule's output." },
    ],
    readinessQuestions: [
      { prompt: "The values are 8, 11, 14, 17. What is the constant change?", choices: ["+3", "+8", "−3"], answer: 0, feedback: "Each output is three more than the one before it." },
      { prompt: "Which rule gives 7 at Stage 1 and then adds 4 each stage?", choices: ["4n+3", "7n+4", "4n+7"], answer: 0, feedback: "Test n=1: 4+3=7." },
    ],
    likelyMisconceptions: ["Using the Stage 1 value as the coefficient", "Putting value on the horizontal axis without defining it", "Writing a decreasing rule that already subtracts once at Stage 1", "Treating a negative symbolic output as a possible count of physical objects"],
    supportRoute: "Draw Stage 1 with 7 counters. Add 4 for Stage 2 and another 4 for Stage 3. Record each total beside its stage. Count the number of additions before writing a letter rule.",
    extensionRoute: "Compare two rules with the same constant change but different starting values and explain why their graphs cannot meet. Then change one rate and design a context where the revised graphs do meet or where one must stop.",
    spaces: "A model-table-graph-rule page may serve as selected evidence; it is not a default upload.",
  },
  {
    id: "one-step-equations-pack",
    anchorIds: ["equation-balance"],
    title: "Find the missing number and check it",
    shortTitle: "One-step equation workshop",
    timing: "Late January–early February",
    blocks: "2 × 45–55 min + retrieval",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Algebra"],
    prerequisite: "Use fact families and explain that the equals sign means both expressions have the same value.",
    learningGoal: "solve an equation by making the same calculation on both sides, then put the answer back to check.",
    whyBefore: "The Equation Balance Room is an application and feedback lab. This pack supplies the physical model, inverse-operation explanation, guided cases, and independent check needed to teach without a video.",
    background: [
      "An equals sign means the value on the left is the same as the value on the right. It does not mean ‘the answer comes next.’",
      "A variable is a symbol for an unknown value. Solving means finding the value that makes the original equation true.",
      "An inverse operation undoes an operation. Subtraction undoes addition; division undoes multiplication.",
      "Whatever change preserves equality must be applied to both sides. After solving, substitute the value into the original equation to check.",
    ],
    teacherMoves: [
      "Build x+4=11 with one covered cup and counters on a balance mat. Remove four counters from both sides.",
      "Record the physical move symbolically as x+4−4=11−4, then simplify to x=7.",
      "Model 4x=52 as four equal covered groups sharing 52 counters; divide both sides by four.",
      "Contrast x÷6=9 and 72−x=29 so students choose the inverse from the actual structure rather than a memorized switch rule.",
      "Substitute every solution into the unchanged original equation and reject any value that makes the sides unequal.",
    ],
    studentMoves: [
      "Build or draw both sides of the equation and mark the unknown.",
      "Name the operation attached to the unknown and choose an inverse move.",
      "Apply an equality-preserving move to both sides and isolate the unknown.",
      "Substitute the value into the original equation and calculate both sides.",
      "Write a one-step mystery for a partner and revise it if more than one reading is possible.",
    ],
    supplied: ["Balance example","Four equation questions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Counters", "Cups or folded paper covers", "Plain paper", "Optional balance scale"],
    vocabulary: words(
      ["equation", "a statement that two expressions have equal value", "x+4=11"],
      ["variable", "a letter or symbol standing for an unknown or changing number", "x is the hidden number"],
      ["inverse operation", "an operation that undoes another operation", "Subtract 4 to undo adding 4"],
      ["solution", "a value that makes the original equation true", "7 is the solution to x+4=11"],
      ["substitute", "replace a variable with a value to test it", "7+4=11 verifies x=7"],
    ),
    model: {
  "label": "WORKED EXAMPLE · x + 4 = 11",
  "prompt": "A cup holds an unknown number of counters. The cup and 4 extra counters make 11. How many are in the cup?",
  "steps": [
    "Use x for the number in the cup. Write x + 4 = 11. The equals sign means the two sides have the same value.",
    "Subtract 4 from both sides: x + 4 − 4 = 11 − 4. This removes the extra counters without changing the balance.",
    "On the left, +4 and −4 cancel. On the right, 11 − 4 = 7. Therefore x = 7.",
    "Check by replacing x in the original equation: 7 + 4 = 11. Both sides equal 11, so the cup holds 7 counters."
  ],
  "conclusion": "A solution is a number that makes the original equation true. Show the calculation on both sides and check your answer."
},
    partnerCards: [
  {
    "title": "ADDITION MYSTERY",
    "body": "Solve x + 17 = 45. Subtract the same amount from each side, then check in the original equation.",
    "answer": "Subtract 17: x = 45 − 17 = 28. Check: 28 + 17 = 45."
  },
  {
    "title": "MULTIPLICATION MYSTERY",
    "body": "4x means four equal groups of x. Solve 4x = 52 by dividing both sides by 4. Check your answer.",
    "answer": "x = 52 ÷ 4 = 13. Check: 4 × 13 = 52."
  },
  {
    "title": "DIVISION MYSTERY",
    "body": "Solve x ÷ 6 = 9. Which operation undoes dividing by 6? Apply it to both sides and check.",
    "answer": "Multiply both sides by 6: x = 9 × 6 = 54. Check: 54 ÷ 6 = 9."
  },
  {
    "title": "SUBTRACTION TRAP",
    "body": "Solve 72 − x = 29. Think: 29 remains after x is taken from 72. Find the missing part, then check using 72 − x.",
    "answer": "The missing part is 72 − 29 = 43, so x = 43. Check: 72 − 43 = 29. An equality method is to add x to both sides, then subtract 29."
  }
],
    check: [
      { prompt: "Solve y+26=70 and check.", answer: "y=44; 44+26=70." },
      { prompt: "Solve 8m=96 and check.", answer: "m=12; 8×12=96." },
      { prompt: "A student solves p÷5=7 as p=2. Diagnose and repair the move.", answer: "The student subtracted instead of undoing division. Multiply both sides by 5: p=35; 35÷5=7." },
    ],
    readinessQuestions: [
      { prompt: "What does the equals sign mean in 8+5=10+3?", choices: ["The answer comes next", "Both sides have the same value", "Add every number"], answer: 1, feedback: "Both expressions have value 13." },
      { prompt: "Which operation undoes multiplication by 6?", choices: ["Add 6", "Subtract 6", "Divide by 6"], answer: 2, feedback: "Division by the same non-zero number undoes multiplication." },
    ],
    likelyMisconceptions: ["Reading equals as ‘write the answer’", "Changing only one side", "Using a memorized opposite operation without reading the equation", "Checking a rearranged equation instead of the original"],
    supportRoute: "Draw x + 4 = 11 as one cup plus 4 counters on the left and 11 counters on the right. Cross out 4 counters on each side. Count what remains, then put the number back into the equation.",
    extensionRoute: "Create and diagnose a false solution line, or compare two different one-step equations that share the same solution.",
    spaces: "Keep the balance proof and substitution check in the Math folder; no default post.",
  },
  {
    id: "first-quadrant-transformations-pack",
    anchorIds: ["transformation-cipher"],
    title: "Move a shape using coordinates",
    shortTitle: "First-quadrant transformation workshop",
    timing: "May · before Transformation Cipher",
    blocks: "2–3 × 45–55 min",
    role: "BC CORE",
    readinessLevel: "full",
    mathUpTopics: ["Location and Movement"],
    prerequisite: "Plot and read positive whole-number ordered pairs in the first quadrant, always moving across for x and then up for y.",
    learningGoal: "plot points in the first quadrant and move a shape twice, checking every point after each move.",
    whyBefore: "The Cipher asks students to combine moves. This core pack explicitly teaches each move, coordinate recording, overlay checking, and sequencing before the optional negative-coordinate extension.",
    background: [
      "A translation slides every point the same distance and direction. The image keeps its size, shape, and orientation.",
      "A reflection flips an image across a named mirror line. Each point and its image stay the same perpendicular distance from that line.",
      "A rotation turns an image around a named centre by a stated angle and direction. Tracing paper makes the preserved size and turn visible.",
      "A combination applies moves in order. The output of Move 1 becomes the input for Move 2, so changing the order can change the final image.",
    ],
    teacherMoves: [
      "Plot a five-point creature in the first quadrant and rehearse x first, then y.",
      "Translate every vertex 3 right and 1 up; record each primed coordinate and verify the same move occurred.",
      "Reflect the translated image across x=6 using equal perpendicular distances; record double-prime coordinates.",
      "Demonstrate a quarter-turn with tracing paper around a marked centre, naming clockwise or counterclockwise.",
      "Compare two move orders and use an overlay or side-length check to distinguish a valid transformation from distortion.",
    ],
    studentMoves: [
      "Plot and connect the starting coordinates in the first quadrant.",
      "Apply one translation to every point and label the image with prime marks.",
      "Apply a reflection or rotation to the new image and label double-prime points.",
      "Use tracing paper, equal distances, or matching side lengths to verify size and shape stayed fixed.",
      "Write a two-move cipher, trade it, and revise any instruction a partner could not reproduce.",
    ],
    supplied: ["Start, translation and reflection diagrams","Starting point list and move instructions","Worked steps, practice and independent check","Separate teacher answers"],
    gather: ["Grid paper", "Tracing paper or transparent sleeve", "Pencils", "Ruler", "Optional coordinate pegboard"],
    vocabulary: words(
      ["translation", "a slide that moves every point the same distance and direction", "Move every point 3 right and 1 up"],
      ["reflection", "a flip across a named mirror line", "Reflect across x=6"],
      ["rotation", "a turn around a named centre", "Turn 90° counterclockwise around (4,4)"],
      ["image", "the new figure after a transformation", "A′B′C′ is the image after Move 1"],
      ["combination", "two or more transformations applied in a stated order", "Translate, then reflect"],
    ),
    model: {
  "label": "WORKED EXAMPLE · SLIDE, THEN REFLECT",
  "prompt": "Move A(2,2), B(5,2), C(5,4), D(3,6), E(2,4) three right and one up, then reflect across x = 6.",
  "steps": [
    "Plot each point by moving right for x and up for y. Join A–B–C–D–E–A to make the starting shape.",
    "Translate three right and one up: add 3 to every x-coordinate and 1 to every y-coordinate. A(2,2) becomes A′(5,3).",
    "The other translated points are B′(8,3), C′(8,5), D′(6,7) and E′(5,5). Join them in the same order.",
    "Draw the vertical mirror line x = 6. A′(5,3) is 1 unit left of it, so A″ is 1 unit right, at (7,3). Keep the y-coordinate unchanged.",
    "Reflect the remaining points: B″(4,3), C″(4,5), D″(6,7), E″(7,5). D stays on the mirror line. Check that matching points are equally far from the line."
  ],
  "conclusion": "A translation moves every point the same distance and direction. A reflection puts each point equally far across the mirror line. Both keep the shape's size."
},
    partnerCards: [
      { title: "TRANSLATE", body: "Move P(2,3), Q(4,3), R(3,5) two right and three up.", answer: "P′(4,6), Q′(6,6), R′(5,8)." },
      { title: "REFLECT", body: "Reflect A(3,2) across the vertical line x=5. Keep the same y-coordinate.", answer: "A′(7,2), two units on the other side of x=5." },
      { title: "QUARTER-TURN", body: "Rotate P(5,4) and Q(4,6) 90° counterclockwise around (4,4).", answer: "P′(4,5) and Q′(2,4)." },
      { title: "ORDER TEST", body: "Explain why ‘reflect, then translate’ may not land in the same place as ‘translate, then reflect.’", answer: "Move 2 acts on the result of Move 1; changing the intermediate image can change every final coordinate." },
    ],
    check: [
      { prompt: "Translate (1,4) four right and two up.", answer: "(5,6)." },
      { prompt: "A point is 3 units left of x=7 at (4,5). Where is its reflection across x=7?", answer: "(10,5), three units right of the mirror line." },
      { prompt: "Name two pieces of evidence that a transformation preserved the figure.", answer: "Examples: an overlay matches; corresponding side lengths and angles remain equal; every point followed the same defined move." },
    {"prompt":"Plot A(1,1), B(3,1), C(1,3). Translate two right and one up. Then reflect that new triangle across x = 4. Record the points after each move.","answer":"After translation: A′(3,2), B′(5,2), C′(3,4). After reflection: A″(5,2), B″(3,2), C″(5,4). Apply the reflection to the translated points; keep all points in the first quadrant."},
    ],
    readinessQuestions: [
      { prompt: "How do you plot (3,5) in the first quadrant?", choices: ["3 right, then 5 up", "5 right, then 3 up", "3 left, then 5 down"], answer: 0, feedback: "Read x first, then y." },
      { prompt: "Which move is a reflection?", choices: ["Slide 4 right", "Flip across x=6", "Turn 90° around a point"], answer: 1, feedback: "A reflection flips across a named mirror line." },
    ],
    likelyMisconceptions: ["Moving only one vertex", "Swapping x and y without a defined rule", "Measuring reflection distance diagonally instead of perpendicular to the mirror line", "Applying both moves to the original instead of using the first image"],
    supportRoute: "Start with A(2,2) only. Plot it, move three right and one up to (5,3), then reflect it across x = 6 to (7,3). Draw the one-unit distances on both sides of the mirror before moving the other points.",
    extensionRoute: "Compare two move orders or open the separately labelled negative-coordinate bridge only after the first-quadrant combination is independently secure.",
    spaces: "Keep the decoded cipher in class; assess the first-quadrant combination before any optional four-quadrant work.",
  },
];
