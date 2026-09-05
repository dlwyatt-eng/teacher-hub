import type { ProficiencyModelSet } from "./proficiency-models";

type MathModelSpec = {
  id: string;
  title: string;
  subtitle: string;
  activityId: string;
  prompt: string;
  criteria: string[];
  source: string;
  samples: [string, string, string, string];
  next: [string, string, string, string];
};

const levels = ["Emerging", "Developing", "Proficient", "Extending"] as const;
const growthLabels = ["A relevant start is visible", "The method is mostly connected", "The complete reasoning is clear", "A new case or trade-off is tested"] as const;

const specs: MathModelSpec[] = [
  {
    id: "operation-strategy-check",
    title: "Operation Strategy and Check",
    subtitle: "Estimate, calculate, verify, and explain the route",
    activityId: "strategy-league",
    source: "Fresh practice pair · 34 × 27 and 864 ÷ 24",
    prompt: "Choose an efficient strategy, show enough working to follow it, and verify the result by another route.",
    criteria: ["Useful estimate", "Accurate method", "Place value visible", "Second-route check", "Strategy explained"],
    samples: [
      "34 × 27 = 918. I used a calculator.",
      "34 × 27 = 34 × 20 + 34 × 7 = 680 + 238 = 918. My estimate was about 900.",
      "I estimated 30 × 30 ≈ 900. I decomposed 27 into 20 + 7: 680 + 238 = 918. I checked with 918 ÷ 27 = 34, so the product and place value agree.",
      "For 864 ÷ 24, I used 24 × 30 = 720 and 24 × 6 = 144, so the quotient is 36. Long division also gives 36. Partial quotients made the multiples and check easiest to see.",
    ],
    next: ["Show the calculation route and a reasonable estimate.", "Add an inverse or second-strategy check.", "Compare when another strategy would be more efficient.", "Create an error case that the estimate exposes."],
  },
  {
    id: "factor-multiple-mission",
    title: "Factor or Multiple Mission",
    subtitle: "Choose GCF or LCM from the story and prove it",
    activityId: "pack-and-sync",
    source: "Fresh missions · 18 blue/30 gold badges; signals every 9/12 seconds",
    prompt: "Name whether the mission needs factors or multiples, solve it, and connect the answer to the story.",
    criteria: ["Tool chosen from context", "Factor or multiple evidence", "Accurate solution", "Units and meaning", "Reason checked"],
    samples: [
      "I got 6 for the badges.",
      "Factors of 18 and 30 include 1, 2, 3, and 6. Six is the greatest common factor, so there are 6 packs.",
      "This is a greatest-equal-packs question, so I need GCF, not LCM. GCF(18,30)=6; each pack has 3 blue and 5 gold badges, and 6(3)=18 and 6(5)=30.",
      "The signal story needs LCM because two repeating schedules meet: multiples of 9 are 9,18,27,36; multiples of 12 are 12,24,36. They meet at 36 seconds. I can distinguish the clue from the equal-pack GCF clue.",
    ],
    next: ["Name what the 6 represents and show factor evidence.", "Verify what belongs in each pack.", "Solve the repeating-event case and contrast the clue.", "Write two similar-looking stories that require different tools."],
  },
  {
    id: "score-rule-design",
    title: "Unambiguous Score Rule",
    subtitle: "Match the story, brackets, calculation, and peer reading",
    activityId: "scoreboard-rules",
    source: "Fresh round · four tokens at 6 points each plus one 7-point finish bonus",
    prompt: "Write the expression, calculate it in the shared order, and explain what repeats and what happens once.",
    criteria: ["Story matched", "Order followed", "Brackets purposeful", "Calculation accurate", "Peer reading tested"],
    samples: [
      "4 × 6 + 7 = 31.",
      "The 6 repeats four times and then I add 7, so 4 × 6 + 7 = 31.",
      "Four token groups give 4 × 6 = 24. The finish bonus happens once, so 24 + 7 = 31. Writing 4 × (6 + 7) would incorrectly repeat the bonus four times.",
      "I changed the story so every token also gets the 7-point boost. Now 4 × (6 + 7)=52 is correct. A partner decoded both versions, so the wording and brackets are unambiguous.",
    ],
    next: ["Explain what repeats and what happens once.", "Compare the expression with one tempting wrong rule.", "Peer-test a rule you invent.", "Change one story condition and update the expression consistently."],
  },
  {
    id: "fraction-ratio-batch",
    title: "Equivalent Fraction and Ratio Batch",
    subtitle: "Scale every part by the same factor and compare shares",
    activityId: "fraction-ratio-remix",
    source: "Fresh batch · 3 red tiles for every 5 blue tiles",
    prompt: "Build equivalent batches, record part-to-part and part-to-whole relationships, and repair a non-equivalent batch.",
    criteria: ["Equal scaling", "Ratio table", "Part-to-whole connection", "Equivalent representation", "Repair explained"],
    samples: [
      "The next ratio is 6:5.",
      "I doubled both parts, so 3:5 becomes 6:10. There are 16 tiles in the doubled batch.",
      "Red:blue is 3:5 and red:whole is 3:8. Doubling gives 6:10 and 6:16; 6/16 simplifies to 3/8. A 6:5 batch is not equivalent because only the red part was doubled.",
      "I compared 3:5 with 4:7 using the red share: 3/8=0.375 and 4/11≈0.364, so the first mix has a slightly greater red share even though 4 is larger than 3.",
    ],
    next: ["Scale both parts by the same factor.", "Add the part-to-whole relationship.", "Compare a second batch by its share of the whole.", "Design a close comparison where raw counts are misleading."],
  },
  {
    id: "decimal-invoice-repair",
    title: "Decimal Invoice Repair",
    subtitle: "Estimate, align place values, calculate, and locate an error",
    activityId: "decimal-dispatch",
    source: "Fresh invoice · 5 items at $2.35 and 4 items at $1.80",
    prompt: "Estimate and calculate the invoice, then use place value to explain why the total is reasonable.",
    criteria: ["Estimate", "Decimal place value", "Accurate operations", "Money notation", "Error/reasonableness check"],
    samples: [
      "$2.35 × 5 = $10.175.",
      "$2.35 × 5 = $11.75. I know it should be near $10.",
      "Five groups of 235 hundredths are 1,175 hundredths, or $11.75. Four groups of $1.80 are $7.20, so the subtotal is $18.95. My estimate $10+$8=$18 is close.",
      "A clerk’s $10.175 answer has three decimal places for money and is below five groups of more than $2. I used both unit reasoning and an estimate to find the error before recalculating.",
    ],
    next: ["Rename the product in dollars and cents and estimate first.", "Add the second line and subtotal.", "Explain which check would catch a planted error fastest.", "Create and diagnose a believable place-value error."],
  },
  {
    id: "percent-budget-decision",
    title: "Percent Budget Decision",
    subtitle: "Find the part, whole, or percent and use it in a decision",
    activityId: "sale-lab",
    source: "Fresh budget · 40% of $150; $24 is 30% of a price",
    prompt: "Show the percent relationship with a benchmark, grid, fraction, or equation, then interpret the amount.",
    criteria: ["Part/whole/percent identified", "Representation", "Accurate calculation", "Money or percent units", "Decision explained"],
    samples: [
      "40% of 150 is 40.",
      "10% of $150 is $15, so 40% is 4 × $15 = $60.",
      "The whole is $150. Since 10%=$15, 40%=$60; $90 remains. For the missing whole, 30%=$24 means 10%=$8 and 100%=$80.",
      "I compared 40% off $150 with $55 off. Forty percent saves $60, which is $5 more. If a fixed fee is added after either discount, it changes both final prices equally and does not change which discount saves more.",
    ],
    next: ["Identify the whole and show a percent route.", "State what remains after the part is found.", "Solve a missing-whole or missing-percent case.", "Test whether a new fee or limit changes the decision."],
  },
  {
    id: "pattern-table-graph-rule",
    title: "Pattern Table, Graph, and Rule",
    subtitle: "Connect stages, constant change, symbolic rule, and forecast",
    activityId: "pattern-forecast",
    source: "Fresh routes · begin 7 and add 4; begin 42 and remove 5",
    prompt: "Represent one increasing or decreasing pattern in a model, table, graph, words, and a rule that passes a stage-one check.",
    criteria: ["Stages accurate", "Constant change", "Table and graph connected", "Rule tested", "Forecast justified"],
    samples: [
      "The pattern adds 4. Stage 10 is 40.",
      "The values are 7,11,15,19. I added 4 each time and graphed the four points.",
      "The rule is 4n+3 because stage 1 gives 7. The table and rising straight-line points show the same constant change. Stage 10 is 43, not 40, because the fixed 3 remains.",
      "For the decreasing route, 42−5(n−1) gives 42 at stage 1 and 2 at stage 9. Stage 10 would be −3, so stage 9 is the last stage with a non-negative physical count.",
    ],
    next: ["List enough stage values to test the forecast.", "Write and test a rule at stage 1.", "Represent a decreasing route too.", "Interpret when a symbolic pattern stops making sense in its context."],
  },
  {
    id: "equation-balance-proof",
    title: "Equation Balance Proof",
    subtitle: "Keep both sides equal and check by substitution",
    activityId: "equation-balance",
    source: "Fresh cases · x+19=63 and 7x=84",
    prompt: "Model the equality, isolate the unknown with an inverse operation, and substitute to verify it.",
    criteria: ["Equality maintained", "Inverse operation", "Unknown isolated", "Accurate solution", "Substitution check"],
    samples: [
      "x + 19 = 63, so x = 44.",
      "I subtract 19: x=44. The answer works because 44+19=63.",
      "I removed 19 from both sides, not only the left: x+19−19=63−19, so x=44. Substitution gives 44+19=63, making both sides equal.",
      "For 7x=84, seven equal crates share 84, so x=12. Division isolates x and multiplication checks it. I can explain why doing a different operation to each side would break the balance.",
    ],
    next: ["Show the same change on both sides and check.", "Explain why the inverse operation preserves equality.", "Solve and compare a multiplication/division case.", "Create a false balance step and diagnose it."],
  },
  {
    id: "probability-game-evidence",
    title: "Probability Game Evidence",
    subtitle: "Predict, run trials, compare variation, and redesign",
    activityId: "probability-game-audit",
    source: "Fresh spinner · 3/6 blue, 2/6 red, 1/6 green",
    prompt: "State theoretical probability, collect experimental evidence, and explain whether a redesign meets its fairness goal.",
    criteria: ["Outcomes listed", "Theoretical probability", "Trial record", "Variation interpreted", "Redesign verified"],
    samples: [
      "Blue should happen 10 times in 20 spins.",
      "P(blue)=3/6=1/2. We got blue 12/20 times, which is close but not exact.",
      "The model predicts P(blue)=1/2, red=1/3, green=1/6. Our 40 trials gave 21,13,6. Experimental results vary, but the larger sample is reasonably close to 20,13.3,6.7.",
      "To make blue and red equally likely while keeping green possible, I used 2/5 blue, 2/5 red, 1/5 green. Equal area—not colour order—proves the fairness condition.",
    ],
    next: ["Call it a prediction, not a promise, and record trials.", "Compare the result with all theoretical outcomes.", "Verify a redesign with exact fractions.", "Compare how sample size affects the strength of the evidence."],
  },
  {
    id: "angle-triangle-evidence",
    title: "Angle and Triangle Evidence",
    subtitle: "Estimate, measure, classify, and retain every true name",
    activityId: "geometry-field-lab",
    source: "Fresh set · 38°, 90°, 142°, 222°; triangle sides 6,6,6",
    prompt: "Measure from the correct zero, classify the angles or triangle, and justify every name from marked evidence.",
    criteria: ["Estimate before measure", "Protractor aligned", "Angle class", "Triangle properties", "Inclusive family language"],
    samples: [
      "The angle is 142 because that number was on the protractor.",
      "I estimated obtuse and measured 142° from the zero on the starting ray.",
      "142° is obtuse because it is between 90° and 180°. The 222° turn is reflex because it is greater than 180° and less than 360°. I marked the rays and vertex.",
      "A 6,6,6 triangle is equilateral and, under our inclusive ‘at least two equal sides’ rule, also isosceles. Equilateral is the more specific useful label; rotating it changes neither name.",
    ],
    next: ["Name the angle class and show the starting ray.", "Include a straight or reflex angle.", "Classify a rotated triangle from properties.", "Explain how an inclusive family definition affects naming."],
  },
  {
    id: "transformation-cipher-proof",
    title: "Transformation Cipher Proof",
    subtitle: "Apply two transformations and make the coordinate changes traceable",
    activityId: "transformation-cipher",
    source: "Fresh points · A(1,2), B(3,2), C(2,4)",
    prompt: "Apply a combination of transformations, record each coordinate set, and prove that size and shape were preserved.",
    criteria: ["Points plotted", "Rule applied to every point", "Two-move sequence", "Image labelled", "Preservation/check explained"],
    samples: [
      "I moved the triangle right.",
      "I translated every point 4 right: A′(5,2), B′(7,2), C′(6,4).",
      "Move 1 uses (x,y)→(x+4,y). Then I reflect A′B′C′ across x=4, giving A″(3,2), B″(1,2), C″(2,4). I labelled all three sets and checked equal side lengths on an overlay.",
      "I wrote a two-move cipher and another group reproduced the same final image without coaching. Their first error exposed that I had not named the mirror line, so I revised the code and they retested it.",
    ],
    next: ["Record every new coordinate and the exact move.", "Add a second transformation.", "Have a partner decode the sequence.", "Use test evidence to repair an ambiguous cipher."],
  },
  {
    id: "constraint-design-proof",
    title: "Constraint Design Proof",
    subtitle: "Make space, capacity, access, cost, and revision visible",
    activityId: "space-under-constraints",
    source: "Fresh maker-room brief · 8 m × 6 m, $2,200, 18 people",
    prompt: "Build a scale plan and show the calculations that prove every required constraint is met before and after a break test.",
    criteria: ["Scale and dimensions", "Area/volume/capacity", "Accessible route", "Itemized budget", "Evidence-based revision"],
    samples: [
      "Everything fits and costs $2,010.",
      "The room is 48 m². My work zone is 18 m², and I added both storage units for 13.5 m³. The total is $2,010.",
      "At 2 m² per person, the 18 m² work zone supports 9 of 18 people at once. Storage A+B holds 13.5 m³. My itemized cost is $2,010, leaving $190. A coloured 1.2 m route reaches every zone from the 1.2 m doorway.",
      "The surface-price break test adds 18×$5=$90, so the total becomes $2,100 and remains under budget. The blocked-door test failed, so I rotated the welcome zone and redrew the 1.2 m route; the dimensions and revised plan show the repair.",
    ],
    next: ["Show the capacity, storage, route, and itemized cost—not only a claim.", "Connect each number to one named constraint.", "Run and document a break test.", "Compare two feasible plans and defend a trade-off."],
  },
];

function buildSet(spec: MathModelSpec): ProficiencyModelSet {
  return {
    id: spec.id,
    title: spec.title,
    subtitle: spec.subtitle,
    activityIds: [spec.activityId],
    spacesEvidenceIds: [],
    sourceCapsule: { label: spec.source, text: spec.prompt },
    prompt: spec.prompt,
    criteria: spec.criteria,
    copyGuard: "Study the mathematical moves in these examples, then change the numbers, layout, or case before students show independent learning.",
    teacherUse: ["Reveal after a genuine first attempt.", "Show the sample beside its calculation, diagram, table, graph, or plan.", "Assess mathematical evidence and explanation rather than decoration or length."],
    models: levels.map((level, index) => ({
      level,
      growthLabel: growthLabels[index],
      sample: spec.samples[index],
      whatWorks: index === 0
        ? ["Begins with a relevant value or mathematical idea"]
        : index === 1
          ? ["Uses a mostly accurate task-specific method", "Shows some evidence another person can follow"]
          : index === 2
            ? ["Completes the required mathematics accurately", "Connects the representation, calculation, and explanation", "Includes a meaningful check"]
            : ["Transfers the reasoning to a new condition", "Uses evidence to compare, revise, or explain a trade-off"],
      nextImprovement: spec.next[index],
      teacherUseNote: index === 2 ? "This meets the task target; extra length or polish is unnecessary." : "Use the named next move for focused feedback.",
    })),
  };
}

export const expandedMathProficiencyModelSets: ProficiencyModelSet[] = specs.map(buildSet);
