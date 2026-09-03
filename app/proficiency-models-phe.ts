import type { ProficiencyModelSet } from "./proficiency-models";

/** PHE models use fictional or class-level evidence and never require health disclosure. */
export const pheProficiencyModelSets = [
  {
    id: "phe-inclusive-game-strategy",
    title: "Inclusive Game Change",
    subtitle: "Notice a pattern, change one feature, and replay",
    activityIds: ["everyone-in-game", "strategy-remix-league"],
    spacesEvidenceIds: [],
    sourceCapsule: { label: "Fictional class tally", text: "In round one, four players waited for most of the game and two players made most choices. The team adds two safe zones and a pass-before-score rule." },
    prompt: "What pattern did the team notice? Explain the change, replay evidence, and one next adjustment.",
    criteria: ["Class pattern noticed", "One clear change", "Safe replay", "Before-and-after evidence", "Next adjustment"],
    copyGuard: "Use no-name class totals only. Never rank, label, photograph, or post individual movement performance.",
    teacherUse: ["Model observing actions rather than judging people.", "Accept oral, card, diagram, or teacher-recorded evidence.", "Assess tactical thinking, inclusion, and safety—not athletic speed."],
    models: [
      { level: "Emerging", growthLabel: "A rule change is suggested", sample: "We should pass more so the game is fair.", whatWorks: ["Notices a participation concern", "Suggests a change"], nextImprovement: "Name the pattern you saw and what the replay would show if the change helped.", teacherUseNote: "Prompt with: Before we changed it… After we changed it…" },
      { level: "Developing", growthLabel: "The change connects to a pattern", sample: "Some players waited, so we added a pass-before-score rule. More people touched the ball in round two.", whatWorks: ["Links a rule to a class pattern", "Uses replay evidence"], nextImprovement: "Use a no-name count or observation and name one safety or strategy effect.", teacherUseNote: "Keep the evidence at group level." },
      { level: "Proficient", growthLabel: "Evidence decides whether the rule stays", sample: "Round one had four long waits. We added two safe passing zones and a pass-before-score rule. In round two, waiting dropped and the team used more of the space, but players crowded one zone. We would keep the passing rule and move the zones farther apart.", whatWorks: ["Uses before-and-after evidence", "Explains inclusion and strategy", "Chooses a focused next change"], nextImprovement: "Replay with a different game shape to see whether the idea transfers.", teacherUseNote: "This meets the target without a student video or post." },
      { level: "Extending", growthLabel: "The team weighs a trade-off", sample: "The pass rule widened participation but slowed quick attacks. Moving the safe zones protected entry without forcing every play to look the same. We would test it with smaller teams and watch both waiting and decision choices.", whatWorks: ["Names a benefit and cost", "Separates two design features", "Plans a useful new test"], nextImprovement: "Decide which evidence matters most if access and game flow point in different directions.", teacherUseNote: "Extending is design judgment, not harder physical performance." },
    ],
  },
  {
    id: "phe-movement-plan",
    title: "Movement Sequence or Effort Plan",
    subtitle: "Use movement ideas safely and explain one choice",
    activityIds: ["rhythm-movement-lab", "effort-meter-trail"],
    spacesEvidenceIds: [],
    sourceCapsule: { label: "Fictional practice sequence", text: "Four moves use low and high levels, a curved pathway, and an eight-count. The transition from turn to balance feels rushed." },
    prompt: "Show the complete sequence or private plan, explain one safe adjustment, and identify what you would try next.",
    criteria: ["Complete chosen route", "Movement ideas visible", "Safe control", "Adjustment explained", "Realistic next step"],
    copyGuard: "The example is fictional. Students choose live, seated, card, director, or private conference routes. Never compare bodies, fitness scores, speed, or appearance.",
    teacherUse: ["Name movement concepts, not body judgments.", "A visual card sequence can be complete evidence.", "Keep effort numbers private; assess the adjustment and reasoning."],
    models: [
      { level: "Emerging", growthLabel: "A sequence or plan has started", sample: "I made four moves. I will try harder next time.", whatWorks: ["Completes a starting route", "Names a next intention"], nextImprovement: "Name one movement idea or one safe adjustment and explain why it fits.", teacherUseNote: "Offer choices such as level, direction, pace, rest, or space." },
      { level: "Developing", growthLabel: "One choice is explained", sample: "My four moves change from low to high. I slowed the turn before the balance so I could stay in control.", whatWorks: ["Uses a movement concept", "Connects an adjustment to safety"], nextImprovement: "Show how the counts or transition connect the whole sequence, then choose one next test.", teacherUseNote: "Observation plus a one-sentence explanation is enough." },
      { level: "Proficient", growthLabel: "The full route is controlled and intentional", sample: "My eight-count uses four moves: low reach, curved travel, turn, and high balance. I changed counts five and six to a slower turn because the first version rushed the balance. The new timing kept the pathway clear. Next I would ask a partner whether the level change is easy to notice.", whatWorks: ["Completes the full design", "Uses precise movement language", "Explains evidence-based adjustment"], nextImprovement: "Try the same idea with silence, visual cues, or another access route.", teacherUseNote: "A student using the effort route can show the same chain: notice, adjust, explain, plan." },
      { level: "Extending", growthLabel: "The idea transfers across routes", sample: "I kept the curved pathway and level change but translated the travelling move into a seated arm pathway. Both versions use the same eight-count and pause before the balance shape. The second route changed the range, not the purpose.", whatWorks: ["Transfers an idea without ranking routes", "Explains what changed and stayed", "Uses access as a design condition"], nextImprovement: "Invite another chosen route and compare which cues make the shared pattern clearest.", teacherUseNote: "Extending is flexible design and explanation, not greater intensity." },
    ],
  },
  {
    id: "phe-safe-health-decision",
    title: "Safe Health Decision",
    subtitle: "Check the source, protect first, and choose a help route",
    activityIds: ["trusted-health-studio", "safety-help-circuit"],
    spacesEvidenceIds: [],
    sourceCapsule: { label: "Fictional scenario", text: "A confident video gives health advice, sells the product it recommends, and names no evidence. A fictional student feels pressured to act immediately." },
    prompt: "What is the safest useful next step? Check the source, name an immediate protection, a trusted help route, and a follow-up.",
    criteria: ["Risk or message noticed", "Immediate safety first", "Trusted source or adult", "Realistic follow-up", "No private disclosure"],
    copyGuard: "Use fictional, low-detail cases only. Do not ask students to reveal health, identity, relationship, substance, or safety experiences. Follow school procedures for any real concern.",
    teacherUse: ["Teach urgent and non-urgent routes directly.", "Assess the decision chain, not a perfect speech.", "Keep all evidence private or teacher-observed; nothing goes to SpacesEDU."],
    models: [
      { level: "Emerging", growthLabel: "Help is recognized", sample: "The student should ignore the video and tell someone.", whatWorks: ["Recognizes possible risk", "Names help as useful"], nextImprovement: "Name the safe action now, who the trusted person is, and what makes the source weak.", teacherUseNote: "Offer the Pause, Protect, Get Help card." },
      { level: "Developing", growthLabel: "A safe action and help route are clear", sample: "The video is selling the product and gives no source. The student should pause, not buy or share it, and ask a caregiver, teacher, nurse, or approved health source.", whatWorks: ["Notices purpose and missing evidence", "Prioritizes a safe pause", "Names trusted help"], nextImprovement: "Add what to do if the first helper is unavailable or the situation becomes urgent.", teacherUseNote: "Keep the scenario fictional and the list of school routes visible." },
      { level: "Proficient", growthLabel: "The whole safety chain is usable", sample: "Because the creator profits from the product and gives no checkable evidence, confidence is not enough. The student should pause, leave the page, avoid sharing details, and check an approved health source with a trusted adult. If pressure continues, save only the information an adult needs and use the school help route. Immediate danger means emergency help now.", whatWorks: ["Checks evidence and purpose", "Protects privacy and immediate safety", "Includes backup and urgent routes"], nextImprovement: "Compare this response with a source that is credible but still incomplete.", teacherUseNote: "This meets the target as an oral or card-based response." },
      { level: "Extending", growthLabel: "The decision adapts without overclaiming", sample: "A professional-looking source can still be incomplete, and a personal story can be sincere without proving a treatment works. I would check author, evidence, date, purpose, and fit for the decision, then choose the smallest safe action while seeking qualified help. If advice conflicts, I would not run my own risky test.", whatWorks: ["Separates sincerity from evidence", "Adapts the check to the decision", "Keeps authority and safety boundaries clear"], nextImprovement: "Explain how accessibility, language, or trust can affect whether a help route is actually usable.", teacherUseNote: "Extending is thoughtful transfer, never disclosure or independent diagnosis." },
    ],
  },
] as const satisfies readonly ProficiencyModelSet[];
