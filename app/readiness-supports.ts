import type { MathUpTopic, ProgramExperience, ReadinessLaunch } from "./program-types";
import type { ScienceLesson } from "./science-program";
import type { SocialLesson } from "./social-program";
import { plainForStudents, studentStepsFor, wordHelpFor } from "./program-supports";
import { mathPacksFor } from "./math-program-supports";

const genericQuestions = (experience: ProgramExperience): ReadinessLaunch["questions"] => [
  {
    prompt: `Which choice best describes the job in “${plainForStudents(experience.title)}”?`,
    choices: [
      plainForStudents(experience.studentMission),
      "Finish quickly without explaining any choices.",
      "Copy another group's final product.",
    ],
    answer: 0,
    feedback: "The mission names the thinking and action that matter in this activity.",
  },
  {
    prompt: "What should you do when a new word or idea is unclear?",
    choices: ["Guess silently and continue.", "Use the word help, example, or ask a focused question.", "Skip the important part."],
    answer: 1,
    feedback: "Readiness means knowing how to get help—not already knowing everything.",
  },
];

function genericReadiness(experience: ProgramExperience): ReadinessLaunch {
  const words = wordHelpFor(experience.arcId).slice(0, 4);
  const firstStep = studentStepsFor(experience)[0];
  return {
    background: [
      plainForStudents(experience.question),
      words.length
        ? `These words will help: ${words.map(word => `${word.term} means ${word.meaning}`).join("; ")}.`
        : "Your teacher will introduce the main idea and connect it to something you already know.",
      `The activity begins by asking you to ${firstStep.action.charAt(0).toLowerCase()}${firstStep.action.slice(1)}`,
    ],
    example: {
      title: "Watch one small example before working independently",
      steps: [
        "The teacher names the question and thinks aloud through one simple case.",
        "The class points to the evidence, rule, skill, or creative choice being used.",
        "A second case is completed together and checked against the success rules.",
      ],
      conclusion: "You are ready when you can explain the first move and where to get help.",
    },
    questions: genericQuestions(experience),
    reteach: "Pause for another concrete example, picture, model, movement, or partner explanation. Recheck only the missed idea before beginning.",
  };
}

export const readinessByExperience: Record<string, ReadinessLaunch> = {
  "transformation-cipher": {
    background: [
      "A coordinate grid helps us name an exact location with an ordered pair.",
      "Read an ordered pair x first, then y. In the first quadrant, both coordinates are positive whole numbers.",
      "A translation slides, a rotation turns, and a reflection flips a shape. The size and shape stay the same.",
      "Begin with the B.C. Grade 6 first-quadrant route. Your teacher will open the negative-coordinate bridge later only if the class is taking the optional four-quadrant challenge.",
    ],
    example: {
      title: "Translate one point in the first quadrant",
      steps: [
        "Plot (2, 3): move 2 spaces right, then 3 spaces up.",
        "Translate the point 3 spaces right and 1 space up.",
        "The new point is (5, 4). Label both points and draw an arrow showing the move.",
        "Check that the x-coordinate increased by 3 and the y-coordinate increased by 1.",
      ],
      conclusion: "First-quadrant transformations use positive whole-number ordered pairs. Precise coordinates let another person reproduce the move.",
    },
    questions: [
      { prompt: "How do you plot (3, 5)?", choices: ["Move 3 right, then 5 up", "Move 5 right, then 3 up", "Move 3 left, then 5 down"], answer: 0, feedback: "Read x first, then y. Positive coordinates move right and up in the first quadrant." },
      { prompt: "Which word means slide without turning or flipping?", choices: ["Translation", "Rotation", "Reflection"], answer: 0, feedback: "A translation slides every point the same distance and direction." },
    ],
    reteach: "Stay on a first-quadrant floor grid. Walk one positive ordered pair x first and y second, then slide the point using one arrow before recording the new pair.",
  },
  "packet-rescue": {
    background: [
      "A network is a group of connected devices that can send information to one another.",
      "A server is a computer that stores or provides information. Your device asks it for something, such as a page or image.",
      "Large information is divided into small numbered pieces called packets. Routers direct each packet toward its destination.",
      "Packets may take different routes. The receiving device puts them back in order and can request a missing piece again.",
    ],
    example: {
      title: "Send the six-piece cat picture",
      steps: [
        "A student device requests a six-piece cat picture from the server.",
        "The server labels the pieces 1 of 6 through 6 of 6. Two routers pass them along two available routes.",
        "The device receives 1, 2, 3, 5 and 6. It notices that packet 4 is missing and asks for packet 4 again.",
        "Packet 4 takes the open route. The device puts all six pieces in order and the picture is complete.",
      ],
      conclusion: "The router does not read or rebuild the whole picture. It directs packets. The receiving device checks and reassembles them.",
    },
    questions: [
      { prompt: "What is a packet?", choices: ["A whole website", "One small numbered piece of information", "A type of password"], answer: 1, feedback: "Packets are small pieces that can travel and be put back together." },
      { prompt: "What is the router's main job in our model?", choices: ["Choose where a packet goes next", "Store every website forever", "Put the final message back together"], answer: 0, feedback: "Routers direct packets; the receiving device reassembles the message." },
      { prompt: "Packets 1, 2, 3, 5 and 6 arrive. What should happen?", choices: ["Pretend the message is complete", "Request packet 4 again", "Delete every packet"], answer: 1, feedback: "The missing number is evidence that packet 4 must be sent again." },
      { prompt: "One route closes. Does the whole internet always stop?", choices: ["Yes, every packet needs one fixed road", "No, a router may direct packets along another available route", "Only the server may move"], answer: 1, feedback: "A network can have more than one possible route, though the model simplifies real networks." },
    ],
    reteach: "Return to the six-piece picture on the tabletop. Have students point to the device, routers, server, packets, open route, missing packet, and reassembled message before assigning human roles.",
  },
};

export function readinessFor(experience: ProgramExperience): ReadinessLaunch {
  const specific = readinessByExperience[experience.id];
  if (specific) return specific;
  const mathPacks = mathPacksFor(experience.id);
  if (mathPacks.length) {
    const priorityPacks = [...mathPacks].reverse();
    const model = priorityPacks[0].model;
    return {
      background: priorityPacks.flatMap(pack => pack.background.slice(0, 2)),
      example: { title: model.prompt, steps: model.steps, conclusion: model.conclusion },
      questions: priorityPacks.flatMap(pack => pack.readinessQuestions.slice(0, 1)),
      reteach: priorityPacks.map(pack => `${pack.shortTitle}: ${pack.supportRoute}`).join(" "),
    };
  }
  return genericReadiness(experience);
}

const scienceReadinessByLesson: Record<string, ReadinessLaunch> = {
  "science-launch": {
    background: [
      "A hypothesis is an educated prediction with a reason. It is not a random guess or a promise that the prediction will be correct.",
      "A fair comparison changes the design while keeping the launcher, start line, measuring method, and number of trials the same.",
      "Repeated results show a pattern. One spectacular result may be unusual, so conclusions should use all the evidence and name a limit.",
    ],
    example: {
      title: "Judge three flights without being fooled by the longest one",
      steps: [
        "The Dart flies 8.4 m, 4.2 m, and 5.1 m. The Glider flies 6.2 m, 6.5 m, and 6.3 m.",
        "The Dart has the longest single flight, but the Glider has the higher average and the steadier pattern.",
        "Conclude that the Glider has the strongest evidence in this test, then name the limit: a different paper, room, or launcher could change the result.",
      ],
      conclusion: "Use the repeated pattern—not only the most exciting result—and keep the conclusion inside the test that was actually run.",
    },
    questions: [
      { prompt: "Which change would make the plane comparison unfair?", choices: ["Use the same launch line", "Give one plane a harder throw", "Measure every landing from the same point"], answer: 1, feedback: "A harder throw changes a second variable, so plane design is no longer the only difference." },
      { prompt: "One flight travels farthest, but the other trials are much shorter. What should the class do?", choices: ["Name the winner immediately", "Ignore the short flights", "Compare all repeated results, averages, and consistency"], answer: 2, feedback: "A scientific conclusion uses the whole repeated pattern and names uncertainty or limits." },
    ],
    reteach: "Put the Dart and Glider results side by side. Circle the longest result, then compare the averages and spread. Ask: which claim uses all six measurements?",
  },
  "signal-case": {
    background: [
      "A stimulus is a change the body can detect. Receptors detect it, sensory nerves carry information, the brain or spinal cord processes it, motor nerves carry a message, and muscles respond.",
      "Catching a falling ruler measures a visual response time, not a simple reflex. Students compare repeated results without ranking people.",
      "Reaction-time results vary. Attention, anticipation, practice, and small measurement differences can all affect a trial.",
    ],
    example: {
      title: "Trace one ruler catch from stimulus to response",
      steps: [
        "The ruler begins to fall: this is the stimulus.",
        "Eye receptors detect movement; sensory nerves carry a message to the brain for processing.",
        "Motor nerves carry a message to finger muscles, and the fingers close around the ruler.",
        "Repeat the trial because one catch distance cannot show a reliable pattern by itself.",
      ],
      conclusion: "A response is a pathway through connected structures, and the investigation needs repeated measurements plus a cautious claim.",
    },
    questions: [
      { prompt: "What comes immediately after eye receptors detect the falling ruler in our model?", choices: ["Finger muscles close", "Sensory nerves carry a message", "The ruler changes mass"], answer: 1, feedback: "The sensory message must travel from the receptors toward the processing centre before a motor response is sent." },
      { prompt: "Two conditions have slightly different averages. What is the strongest conclusion?", choices: ["The changed condition definitely caused the difference", "The data suggest a difference in this test; variation and method limits still matter", "The slower person did the test incorrectly"], answer: 1, feedback: "Small classroom data can suggest a pattern, but it cannot remove ordinary variation or prove a cause by itself." },
    ],
    reteach: "Give six students one pathway card each. Physically order stimulus → receptor → sensory message → processing → motor message → muscle response, then narrate each arrow.",
  },
  "balance-case": {
    background: [
      "Homeostasis means active adjustment toward a useful range. It does not mean that body temperature, thirst, sweating, or urine never change.",
      "Kidneys filter blood, return needed water and dissolved materials, regulate water and salts, and help remove wastes and excess water in urine.",
      "The hot-practice case is fictional. Students separate details the case shows from predictions made by a model; no one tests dehydration on people.",
    ],
    example: {
      title: "Explain one coordinated hot-day response",
      steps: [
        "Heat and water loss increase during activity.",
        "Receptors and the brain detect change; nervous and hormonal signals coordinate responses.",
        "Sweating and thirst change, while kidneys can return more water to blood and make a smaller amount of more concentrated urine.",
        "These responses move conditions toward a useful range; they do not instantly reset the body or prove anything about one real person.",
      ],
      conclusion: "A homeostasis explanation traces change → signal → coordinated response → effect and keeps the claim inside the model evidence.",
    },
    questions: [
      { prompt: "What does homeostasis mean in this lesson?", choices: ["Nothing inside the body ever changes", "The body actively adjusts conditions toward useful ranges", "One organ controls every response"], answer: 1, feedback: "The responses change precisely because the body is adjusting toward a useful range." },
      { prompt: "On a hot day with little water, which kidney response fits the model?", choices: ["Return more water to blood and make less, more concentrated urine", "Release every available drop of water", "Move waste directly from the stomach to the bladder"], answer: 0, feedback: "Returning more water to blood helps conserve it; less water leaves in urine, so the urine is more concentrated." },
    ],
    reteach: "Use five paper arrows: change, detection, signal, response, effect. Build only the hot-day pathway and ask what changes or travels across each arrow.",
  },
  "systems-jigsaw": {
    background: [
      "A body system is more than a list of organs. A useful model shows its job, important structures, what matter or information moves, and where it connects to another system.",
      "Nervous signals are fast and targeted; hormones are chemical messages carried in blood; kidneys regulate blood water and remove wastes; reproductive structures produce cells or hormones and may support fertilization and development.",
      "Expert teams learn one system deeply, then mixed groups connect the four systems. The route and connection matter more than copying every fact.",
    ],
    example: {
      title: "Turn an organ list into a connected system explanation",
      steps: [
        "Weak model: kidneys, ureters, bladder, urethra.",
        "Add the job and route: kidneys filter blood; urine travels through ureters to the bladder and leaves through the urethra.",
        "Add what moves and a connection: hormonal messages can influence how much water kidneys return to blood.",
        "Name a limit: this route model leaves out microscopic structures and many intermediate processes.",
      ],
      conclusion: "A strong system model uses arrows and verbs to explain structure, function, movement, connection, and limit.",
    },
    questions: [
      { prompt: "Which expert note is a causal connection instead of a part list?", choices: ["Kidneys, ureters, bladder, urethra", "Hormonal messages help kidneys adjust how much water returns to blood", "The nervous system has many parts"], answer: 1, feedback: "The statement explains what moves between systems and how one system influences another." },
      { prompt: "What should classmates do during a three-minute expert lesson?", choices: ["Only listen to copied facts", "Predict, trace, decide, or answer a check question", "Memorize every structure in the source"], answer: 1, feedback: "The peer lesson should make classmates use the model, not only hear information." },
    ],
    reteach: "Use one route on the embedded expert board. Ask four questions in order: What is the job? What moves? Where does it go? Which other system affects or depends on this route?",
  },
};

export function scienceReadinessFor(lesson: ScienceLesson): ReadinessLaunch {
  const specific = scienceReadinessByLesson[lesson.id];
  if (specific) return specific;
  const firstScene = lesson.scenes[0];
  const prior = lesson.priorKnowledge?.slice(0, 3) ?? [];
  return {
    background: [
      ...prior,
      lesson.learning,
      `Common mistake to correct: ${lesson.misconception}`,
    ],
    example: {
      title: `Work through one small example from “${lesson.title}”`,
      steps: [
        lesson.guided,
        firstScene?.prompt ?? lesson.hook,
        "Name what was observed or measured before explaining what it might mean.",
        `Check the example against this success rule: ${lesson.success[0] ?? lesson.evidence}`,
      ],
      conclusion: "A strong Science explanation connects an observation or measurement to an idea and names what the evidence cannot prove.",
    },
    questions: [
      { prompt: "What are we learning in this lesson?", choices: [lesson.learning, lesson.misconception, "To finish a product without using evidence."], answer: 0, feedback: "Return to the learning goal and say it in your own words before beginning." },
      { prompt: "What should come before a scientific explanation?", choices: ["A polished final answer", "An observation, measurement, or source of evidence", "The answer another group chose"], answer: 1, feedback: "Science explanations begin with evidence that can be pointed to, measured, or traced." },
      { prompt: "What should you do if the first result is unexpected?", choices: ["Hide it", "Change the question after the test", "Check the method, record the result, and decide what to test next"], answer: 2, feedback: "An unexpected result can help improve the method or reveal a new question." },
    ],
    reteach: `Use the lowest-prep concrete example from the lesson and model only the first move: ${firstScene?.teacherCue ?? lesson.guided}`,
  };
}

export function socialReadinessFor(lesson: SocialLesson): ReadinessLaunch {
  const firstScene = lesson.scenes[0];
  return {
    background: [
      lesson.learning,
      `Today's question is: ${lesson.question}`,
      `A common mistake to avoid: ${lesson.misconceptions[0] ?? "one source or perspective does not tell the whole story"}.`,
      "In Social Studies, a claim becomes stronger when the source, evidence, perspective, and limits are named.",
    ],
    example: {
      title: `See one small ${lesson.kind.toLowerCase()} example`,
      steps: [
        firstScene?.prompt ?? lesson.question,
        "Point to the exact source detail or system feature being used.",
        "Separate what is directly shown from what is inferred or still unknown.",
        `Check the example against this success rule: ${lesson.success[0]}`,
      ],
      conclusion: "A careful response names the evidence, considers another perspective or effect, and does not claim more than the source can show.",
    },
    questions: [
      { prompt: "Which response is strongest in Social Studies?", choices: ["A fast opinion with no source", "A claim connected to specific evidence, perspective, and a limit", "A copied sentence with no explanation"], answer: 1, feedback: "A strong response makes the evidence and reasoning visible." },
      { prompt: "What should you do when a source does not answer the whole question?", choices: ["Say the missing information does not matter", "Invent a likely answer", "Name the gap and look for another useful source or perspective"], answer: 2, feedback: "Naming a gap is careful historical and social inquiry, not a weakness." },
      { prompt: "What is today's main learning goal?", choices: [lesson.learning, lesson.misconceptions[0] ?? "Every perspective is identical.", "Make the most polished-looking product."], answer: 0, feedback: "Return to the learning goal and connect it to the first activity move." },
    ],
    reteach: `Use the lesson's lower-prep route as a short shared example: ${lesson.lowerPrep}`,
  };
}

export const mathUpTopics: MathUpTopic[] = [
  { strand: "N", title: "Whole Number Operations", arcId: "math-number", timing: "September–October, then spiral", role: "Core sequence", experienceIds: ["operations-fluency-pack", "strategy-league", "scoreboard-rules"] },
  { strand: "N", title: "Whole Numbers Greater Than One Million", arcId: "math-number", timing: "September", role: "Core sequence", experienceIds: ["magnitude-gallery"] },
  { strand: "N", title: "WNCP_Representing and Comparing Integers", arcId: "math-geometry", timing: "May · before coordinate graphing", role: "Optional WNCP bridge", experienceIds: ["integer-number-line-pack", "transformation-cipher"] },
  { strand: "N", title: "Factors and Multiples", arcId: "math-number", timing: "October", role: "Core sequence", experienceIds: ["pack-and-sync"] },
  { strand: "N", title: "BC_Working With Factors and Multiples", arcId: "math-number", timing: "October", role: "Review and apply", pairedWith: "Factors and Multiples", experienceIds: ["pack-and-sync"] },
  { strand: "N", title: "Proportional Reasoning", starred: true, arcId: "math-fractions", timing: "October–November", role: "Core sequence", experienceIds: ["fraction-ratio-percent-pack", "fraction-ratio-remix", "sale-lab"] },
  { strand: "N", title: "Representing, Estimating, and Comparing Decimal Numbers", arcId: "math-fractions", timing: "November", role: "Core sequence", experienceIds: ["decimal-operations-pack", "magnitude-gallery", "decimal-dispatch"] },
  { strand: "N", title: "Representing, Comparing, and Ordering Fractions", arcId: "math-fractions", timing: "Late October–November", role: "Core sequence", experienceIds: ["fraction-ratio-percent-pack", "fraction-ratio-remix"] },
  { strand: "N", title: "Multiplying and Dividing With Decimal Numbers", arcId: "math-fractions", timing: "November–December", role: "Core sequence", experienceIds: ["decimal-operations-pack", "decimal-dispatch", "sale-lab"] },
  { strand: "PR", title: "Patterns", starred: true, arcId: "math-patterns", timing: "January", role: "Core sequence", experienceIds: ["pattern-forecast"] },
  { strand: "PR", title: "Algebra", arcId: "math-patterns", timing: "January–February", role: "Core sequence", experienceIds: ["pattern-forecast", "equation-balance"] },
  { strand: "SS", title: "Angles", arcId: "math-geometry", timing: "Late March", role: "Core sequence", experienceIds: ["angle-triangle-pack", "geometry-field-lab"] },
  { strand: "SS", title: "BC_Capacity and Volume", arcId: "math-geometry", timing: "Late April–May", role: "Core sequence", experienceIds: ["volume-capacity-pack", "space-under-constraints"] },
  { strand: "SS", title: "Developing Measurement Formulas", arcId: "math-geometry", timing: "April", role: "Core sequence", experienceIds: ["formula-perimeter-pack", "area-recompose-pack", "zoo-design-studio"] },
  { strand: "SS", title: "BC_Areas of Parallelograms, Triangles, and Trapezoids", arcId: "math-geometry", timing: "Mid April", role: "Core sequence", experienceIds: ["area-recompose-pack", "zoo-design-studio", "space-under-constraints"] },
  { strand: "SS", title: "Triangles", starred: true, arcId: "math-geometry", timing: "Late March", role: "Core sequence", experienceIds: ["angle-triangle-pack", "geometry-field-lab"] },
  { strand: "SS", title: "Polygons", starred: true, arcId: "math-geometry", timing: "Early April", role: "Bridge lesson", experienceIds: ["polygon-classification-pack", "zoo-design-studio"] },
  { strand: "SS", title: "Location and Movement", arcId: "math-geometry", timing: "May", role: "Core sequence", experienceIds: ["transformation-cipher"] },
  { strand: "SP", title: "Graphing Data", starred: true, arcId: "math-data", timing: "February", role: "Core sequence", experienceIds: ["collect-summarize-data-pack", "graph-story-lab"] },
  { strand: "SP", title: "WNCP_Collecting and Summarizing Data", starred: true, arcId: "math-data", timing: "February", role: "Bridge lesson", experienceIds: ["collect-summarize-data-pack", "graph-story-lab"] },
  { strand: "SP", title: "WNCP_Probability", starred: true, arcId: "math-data", timing: "Late February–March", role: "Core sequence", experienceIds: ["single-outcome-probability-pack", "probability-game-audit"] },
  { strand: "SP", title: "BC_Probability", starred: true, arcId: "math-data", timing: "March", role: "Review and apply", pairedWith: "WNCP_Probability", experienceIds: ["single-outcome-probability-pack", "probability-game-audit"] },
];

export const mathResourceRoutes = {
  mathUp: "https://surreyschoolsone.ca/resources/mathup",
  mathAntics: "https://mathantics.com/",
};
