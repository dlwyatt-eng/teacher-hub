import type { ProficiencyModelSet } from "./proficiency-models";

/** Task-specific Mathematics models. Each sample includes a visible next move. */
export const mathProficiencyModelSets = [
  {
    id: "number-scale-explanation",
    title: "Number Scale Explanation",
    subtitle: "Read the line, place the number, and explain what changes",
    activityIds: ["magnitude-gallery"],
    spacesEvidenceIds: [],
    sourceCapsule: { label: "Fresh practice number · 0.06", text: "Place 0.06 on a 0-to-1 line and a 0-to-0.1 line. Both lines have ten equal sections." },
    prompt: "Where does 0.06 belong on each line? Use the endpoints and equal jumps, then explain why its spot changes even though the number does not.",
    criteria: ["Endpoints read", "Equal jump found", "Placement accurate", "Scale change explained", "Clear visual or oral reasoning"],
    copyGuard: "Use 0.06 only for studying the examples. Change the number or endpoints before students show independent learning.",
    teacherUse: ["Show the examples after students make a first placement.", "Ask students to point to endpoints and equal jumps before discussing the sentence.", "Accept a labelled drawing, pointing with oral explanation, or a brief written response."],
    models: [
      { level: "Emerging", growthLabel: "The size is noticed", sample: "I put 0.06 near zero because it is a small number.", whatWorks: ["Recognizes that 0.06 is less than 1", "Makes a starting placement"], nextImprovement: "Read the endpoint and calculate what one equal section is worth.", teacherUseNote: "Keep the starting intuition, then mark the tenths and hundredths physically." },
      { level: "Developing", growthLabel: "One scale is read accurately", sample: "On the 0-to-1 line, each section is 0.1. Since 0.06 is less than 0.1, it goes in the first section.", whatWorks: ["Uses both endpoints", "Finds one section's value", "Places the number in a correct region"], nextImprovement: "Place it more exactly and explain its position on the 0-to-0.1 line.", teacherUseNote: "Ask where six hundredths sits inside the first tenth." },
      { level: "Proficient", growthLabel: "The same number works across two scales", sample: "On 0 to 1, each section is 0.1, so 0.06 is six tenths of the way through the first section. On 0 to 0.1, each section is 0.01, so 0.06 is at the sixth mark. The number stayed 0.06; only the endpoint and jump changed.", whatWorks: ["Reads both scales correctly", "Places the same value accurately", "Explains the changing position"], nextImprovement: "Choose which scale would make a new comparison easiest to see and defend that choice.", teacherUseNote: "This meets the target; added length is unnecessary." },
      { level: "Extending", growthLabel: "A useful scale is selected and defended", sample: "I would use 0 to 0.1 to compare 0.056 and 0.064 because the values spread apart enough to see. On 0 to 1 they bunch near zero. For 36 million and 42 million, I would use 0 to 50 million for the same reason.", whatWorks: ["Transfers the idea to decimals and large numbers", "Selects a scale for a purpose", "Names the detail-versus-range trade-off"], nextImprovement: "Design another valid scale and compare what it makes easier or harder to notice.", teacherUseNote: "Extending is purposeful scale choice, not larger numbers or more words." },
    ],
  },
  {
    id: "truthful-line-graph",
    title: "Truthful Line Graph",
    subtitle: "Build an accurate graph and explain what its scale makes noticeable",
    activityIds: ["graph-story-lab"],
    spacesEvidenceIds: [],
    sourceCapsule: { label: "Fictional five-day temperatures", text: "Monday to Friday noon temperatures were 24°C, 25°C, 24°C, 27°C, and 26°C. One graph uses 0–40°C; another uses 23–28°C." },
    prompt: "Graph the data accurately. Make one supported claim, name one limit, and explain how the chosen scale affects the picture.",
    criteria: ["Title, axes, and units", "Equal useful scale", "Points plotted accurately", "Supported claim", "Scale effect and honest limit"],
    copyGuard: "Use the fictional temperatures to study graphing moves. Supply different data before students create independent evidence.",
    teacherUse: ["Place each model beside its graph; the words alone are not the complete evidence.", "Check mathematical accuracy before colour, neatness, or polish.", "Keep the Evidence → Claim models available as a separate reasoning lens."],
    models: [
      { level: "Emerging", growthLabel: "The data begins to appear", sample: "The weekdays and five points are present, but the vertical jumps are uneven and °C is missing. Claim: It got much hotter.", whatWorks: ["Includes the five points", "Attempts to describe a change"], nextImprovement: "Use equal vertical jumps, add the unit, and make the claim match the small changes.", teacherUseNote: "Repair the axis with the student before asking for a longer explanation." },
      { level: "Developing", growthLabel: "The graph is readable", sample: "The graph has a title, weekday labels, °C, equal one-degree jumps, and correct points. Claim: Friday was warmer than Monday.", whatWorks: ["Uses a consistent scale", "Plots and labels accurately", "Makes a supported claim"], nextImprovement: "Describe the full pattern, name something the data cannot explain, and compare the two scales.", teacherUseNote: "Celebrate the accurate construction; the next step is careful interpretation." },
      { level: "Proficient", growthLabel: "Construction, claim, scale, and limit agree", sample: "My 23–28°C scale uses equal one-degree jumps and makes small daily changes easy to read. The temperature ranged from 24°C to 27°C and ended 2°C higher on Friday than Monday. The graph does not tell us why temperatures changed or whether these days represent the month.", whatWorks: ["Builds an accurate graph with a useful scale", "Supports the claim with values", "Explains scale purpose and a real limit"], nextImprovement: "Compare how the 0–40°C scale changes the visual impression without changing the data.", teacherUseNote: "This meets the target; a brief oral explanation can accompany the graph." },
      { level: "Extending", growthLabel: "Two honest displays are compared for purpose", sample: "Both graphs plot the same values correctly. The 23–28°C graph shows daily variation but can make a three-degree range look dramatic. The 0–40°C graph gives broader weather context but hides small changes. I would use the close scale for daily comparison and include the values.", whatWorks: ["Distinguishes accuracy from framing", "Connects scale to purpose and audience", "Explains a trade-off"], nextImprovement: "Design a third scale and justify whether it balances detail and context better.", teacherUseNote: "Extending is careful comparison, not a more decorative graph." },
    ],
  },
  {
    id: "zoo-design-mathematics",
    title: "Zoo Design Mathematics",
    subtitle: "Make the measurements visible, survive a check, and revise",
    activityIds: ["zoo-design-studio"],
    spacesEvidenceIds: ["spaces-apr-zoo"],
    sourceCapsule: { label: "Fictional practice zone · night garden", text: "A rectangular night garden is 8 m by 6 m. It needs a 2 m accessible path. A peer check finds that the first plan labels area correctly but counts one shared fence twice." },
    prompt: "Show how the plan meets size and access rules. Explain one calculation, the peer-check evidence, and the revision it caused.",
    criteria: ["Exact labelled plan", "Correct area and perimeter", "Units and heights", "Access checked", "Evidence-based revision"],
    copyGuard: "The night garden is a practice example, not a habitat answer. Students must use their own layout and calculations.",
    teacherUse: ["Show the plan beside the explanation.", "Separate mathematical evidence from drawing skill, materials, and decoration.", "Pair this Math set with Creative / Making Reflection when useful."],
    models: [
      { level: "Emerging", growthLabel: "A design and calculation have started", sample: "My night garden is 8 by 6. I wrote 8 + 6 = 14. I changed the path.", whatWorks: ["Uses the dimensions", "Attempts a calculation and revision"], nextImprovement: "Decide whether you need area or perimeter, use the full calculation and unit, and show why the path changed.", teacherUseNote: "Trace the inside for area and outer boundary for perimeter before correcting symbols." },
      { level: "Developing", growthLabel: "Key measurements are mostly correct", sample: "The area is 8 × 6 = 48 m². Its perimeter is 8 + 6 + 8 + 6 = 28 m. I drew a 2 m path. My partner said one shared fence was counted twice.", whatWorks: ["Calculates area and perimeter", "Uses correct units", "Records a useful peer finding"], nextImprovement: "Show the repaired fence total and explain its effect on the complete plan.", teacherUseNote: "The next step is closing the evidence loop, not more decoration." },
      { level: "Proficient", growthLabel: "The plan survives a mathematical check", sample: "The 8 m by 6 m garden has area 48 m² and perimeter 28 m. The path is 2 m wide. Our first total counted the shared 6 m fence for both zones. The peer trace exposed it, so we removed one 6 m length and marked the old count, correction, and new total.", whatWorks: ["Connects calculations to the drawing", "Checks an access rule", "Uses peer evidence for a revision"], nextImprovement: "Compare the revised arrangement with another layout and explain one mathematical trade-off.", teacherUseNote: "This meets the target when the labelled plan is attached." },
      { level: "Extending", growthLabel: "Two workable layouts are compared", sample: "Layout A uses more shared boundaries and 18 m less fencing, but creates a narrow turn. Layout B uses more fence but keeps the 2 m route clear. Both fit. I chose Layout B because access matters more than the lowest fence total, then checked every shared edge once.", whatWorks: ["Compares two valid designs", "Uses calculations to explain a trade-off", "Balances efficiency with access"], nextImprovement: "Test one new limit, such as a changed habitat size, and update the affected calculations.", teacherUseNote: "Extending is mathematical trade-off reasoning, not a larger zoo." },
    ],
  },
] as const satisfies readonly ProficiencyModelSet[];
