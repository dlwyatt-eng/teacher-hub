export type ProjectPhase = {
  title: string;
  studentMove: string;
  evidence: string;
};

export type ProjectPrintable = {
  title: string;
  purpose: string;
  prompts: string[];
};

export type CrossCurricularProject = {
  id: string;
  title: string;
  timing: string;
  duration: string;
  drivingQuestion: string;
  summary: string;
  primarySubjects: string[];
  supportingSubjects: string[];
  phases: ProjectPhase[];
  elaMoves: string[];
  adstMoves: string[];
  products: string[];
  provided: string[];
  gather: string[];
  shortRoute: string;
  accessRoute: string;
  words: { term: string; meaning: string; example: string }[];
  printables: ProjectPrintable[];
  curriculumLenses: { subject: string; lookFors: string[] }[];
  spaces: {
    use: "required" | "optional";
    artifactChoices: string[];
    individualPrompt: string;
    noDuplicateRule: string;
    curriculumTags: string[];
  };
};

export const bloxelsStoryGame: CrossCurricularProject = {
  id: "bloxels-story-game",
  title: "Bloxels Story-Game Studio",
  timing: "January · story work begins in November–December",
  duration: "8–10 × 55-minute blocks",
  drivingQuestion: "How can a player experience the story through the game—not only read it before playing?",
  summary: "Students write an original story, map it as a playable route, build the smallest complete Bloxels game, watch a new player try it, and revise both the writing and the design from evidence.",
  primarySubjects: ["English Language Arts", "ADST"],
  supportingSubjects: ["Arts Education when artistic choices are explicitly taught"],
  phases: [
    { title: "Notice", studentMove: "Play or watch a short teacher example. Name one game action and one story moment that work together.", evidence: "Game/story T-chart or 20-second oral observation" },
    { title: "Write", studentMove: "Plan the player character, goal, setting, problem, turning point, and ending before opening the builder.", evidence: "Complete story blueprint" },
    { title: "Map", studentMove: "Place at least three story moments on a paper level map: beginning, change or turn, and ending.", evidence: "Paper route map with story blocks and player actions" },
    { title: "Practise", studentMove: "Complete a tiny Bloxels practice build so tools do not interrupt the story plan.", evidence: "Small tool test or equivalent paper-game practice" },
    { title: "Build", studentMove: "Build the smallest version that a player can begin, understand, and finish. Add detail only after the route works.", evidence: "Minimum playable game" },
    { title: "Test", studentMove: "Watch a classmate play without coaching. Record where the player pauses, gets stuck, or misunderstands the story.", evidence: "Silent playtest observer sheet" },
    { title: "Revise", studentMove: "Fix one story problem and one gameplay or access problem. Test the changed version again.", evidence: "Before-and-after revision record" },
    { title: "Share", studentMove: "Share through the teacher-approved class route and explain which evidence caused the most important change.", evidence: "Private class showcase + individual reflection" },
  ],
  elaMoves: [
    "Study one short game story. Name the player character, goal, setting, problem, turning point, and ending.",
    "Plan an original story that can be followed while someone plays. Keep the goal and sequence clear.",
    "Write short story blocks or dialogue for the beginning, change or turn, and ending.",
    "Place every story moment on a paper level map beside the action the player will take.",
    "Ask a partner to follow the map. Revise unclear sequence, word choice, sentence conventions, or story information.",
  ],
  adstMoves: [
    "Turn the story plan into success rules and limits for a small, complete game.",
    "Make a paper level map and a tiny practice build before making the full game.",
    "Build the smallest version that works from the beginning to the ending.",
    "Watch a new player try it without giving hints. Record where the player pauses, gets stuck, or misses the story.",
    "Change one story feature and one gameplay or access feature. Then test again.",
    "Share through the teacher-approved private route and explain what the test evidence made you change.",
  ],
  products: [
    "Original story blueprint and paper level map",
    "One short, complete Bloxels game",
    "Silent playtest record",
    "One visible ELA revision and one visible ADST revision",
    "Individual creator explanation",
  ],
  provided: [
    "One-page project brief",
    "Story and character planner",
    "Paper level-map template",
    "Minimum playable game checklist",
    "Privacy, safety, and creative-credit check",
    "Silent playtest observer sheet",
    "Before-and-after revision log",
    "Separate ELA and ADST look-for cards",
    "Individual contribution and reflection slip",
    "Paper interactive-story fallback",
  ],
  gather: ["School-managed Bloxels access", "Devices", "Headphones if available", "Pencils and plain or grid paper"],
  shortRoute: "Use one beginning, one turning point, and one ending in a single short level. Run one silent playtest and require one story change plus one game change.",
  accessRoute: "Students may create an equivalent paper pixel-grid or card-based playable story using the same planning, route, challenge, feedback, testing, and revision. Premade assets, partner roles, speech-to-text, and low-colour or low-fine-motor routes are valid supports.",
  words: [
    { term: "player character", meaning: "the character a player controls", example: "The player character must reach the observatory before the last signal fades." },
    { term: "setting", meaning: "where and when a story happens", example: "The game begins in a flooded forest at dawn." },
    { term: "conflict or problem", meaning: "the challenge that drives the story", example: "A bridge is broken, so the character must find another route." },
    { term: "turning point", meaning: "a moment when the problem, plan, or understanding changes", example: "The map is wrong, and the player must follow the river instead." },
    { term: "dialogue", meaning: "words spoken by a character", example: "A guide says, ‘The glowing stones mark the safe path.’" },
    { term: "story block", meaning: "a short piece of story information placed where the player needs it", example: "The warning appears before the player chooses a tunnel." },
    { term: "game mechanic", meaning: "an action or rule that shapes how a game works", example: "Collecting three keys is the mechanic that opens the final door." },
    { term: "playtest", meaning: "watching someone try a game so the designer can learn what to improve", example: "The playtest showed that players missed the first clue." },
    { term: "accessibility", meaning: "design choices that help more people understand and use something", example: "Clear contrast and a second route make the instructions easier to follow." },
    { term: "creative credit", meaning: "naming the creator or source of ideas, art, sound, or other media you use", example: "Original work and approved assets are labelled in the creator note." },
  ],
  printables: [
    { title: "Story blueprint", purpose: "Write the story before building the world.", prompts: ["Player character: Who does the player control?", "Goal: What is the player trying to do?", "Setting and world rule: Where are we, and what rule matters?", "Problem: What makes the goal difficult?", "Turning point: What changes the plan?", "Ending: How does the player know the story is complete?"] },
    { title: "Paper level map", purpose: "Connect story information to player action.", prompts: ["START · What does the player know and do first?", "STORY MOMENT 1 · beginning", "CHALLENGE · action or decision", "STORY MOMENT 2 · change or turning point", "FEEDBACK · how the game responds", "STORY MOMENT 3 · ending and completion"] },
    { title: "Minimum playable game", purpose: "Finish the learning before adding decoration.", prompts: ["The player knows who they are.", "The player knows what they are trying to do.", "The route works from beginning to ending.", "At least three story moments appear where they are needed.", "The game gives useful feedback.", "No full names, private information, real student images, or uncredited copied characters are used."] },
    { title: "Silent playtest", purpose: "Collect evidence instead of praise.", prompts: ["Tester: play without asking the designer for help.", "Designer: watch without coaching.", "Where did the player pause?", "Where did the player get stuck?", "Which story information did the player miss or misunderstand?", "What worked without explanation?"] },
    { title: "Revision record", purpose: "Show one change in each subject.", prompts: ["Story change: __________", "Game or access change: __________", "We changed these because the tester __________", "After the change, the player __________", "One problem still to solve: __________"] },
    { title: "Individual reflection", purpose: "Make each student’s learning visible.", prompts: ["My contribution was __________", "One writing choice I can explain is __________", "One design choice I can explain is __________", "The strongest test evidence was __________", "If I had one more block, I would __________ because __________"] },
  ],
  curriculumLenses: [
    { subject: "English Language Arts", lookFors: ["Purposeful plot and story structure", "Clear, readable story blocks or dialogue", "Writing and design choices fit the player audience", "Meaningful revision improves clarity, effect, or impact", "Conventions support meaning"] },
    { subject: "Applied Design, Skills & Technologies", lookFors: ["Success rules and limits guide the build", "Plan identifies stages, resources, and safe/private use", "A workable first version is tested by a new player", "Troubleshooting and feedback lead to a meaningful change", "Student demonstrates the product and explains modifications"] },
  ],
  spaces: {
    use: "required",
    artifactChoices: ["Teacher opens the finished game for a short class showcase", "One photo or short clip taken by the teacher during the showcase", "Photo of the equivalent paper game"],
    individualPrompt: "I changed ___ after a player ___ because ___. My story contribution was ___. My design contribution was ___. My next improvement would be ___ because ___.",
    noDuplicateRule: "Make one combined Bloxels post. Tag the ELA and ADST learning that is genuinely visible; do not create separate uploads for the same project.",
    curriculumTags: [
      "ELA · use writing and design processes to create meaningful literary texts",
      "ELA · assess and refine clarity, effectiveness, and impact",
      "ADST · identify success criteria and constraints",
      "ADST · make changes, troubleshoot, and test again",
      "ADST · demonstrate the product and explain the process and modifications",
    ],
  },
};

export type PriorPracticeOriginal = {
  title: string;
  curriculumTags?: number;
};

export type PriorPracticeItem = {
  id: string;
  family: string;
  timing: string;
  subjects: string[];
  kind: "anchor project" | "lesson or activity" | "assignment or reflection" | "support record";
  nextUse: "return" | "adapt" | "archive or reference";
  evidenceRole: "practice" | "checkpoint" | "portfolio option" | "not student evidence";
  originals: PriorPracticeOriginal[];
  note: string;
};

export const priorPracticeBank: PriorPracticeItem[] = [
  { id: "past-bloxels", family: "Bloxels story-game design", timing: "January", subjects: ["ELA", "ADST"], kind: "anchor project", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "🎮 Bloxels Game Design Cross-Curricular Project", curriculumTags: 5 }], note: "Returns as the main January ELA/ADST project with one combined post and separate subject look-fors." },
  { id: "past-minecraft", family: "Minecraft Knowledge World", timing: "March–June", subjects: ["Science", "ADST"], kind: "anchor project", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "Science/ADST - Minecraft Knowledge World Part 1", curriculumTags: 2 }, { title: "Science/ADST - Minecraft Knowledge World – Part 2", curriculumTags: 2 }], note: "Keep Part 1 as a working checkpoint and Part 2 as the Science/ADST culmination—not two unrelated projects." },
  { id: "past-trc", family: "Truth, reconciliation, and responsible learning", timing: "October", subjects: ["ELA", "Social Studies", "Arts"], kind: "anchor project", nextUse: "adapt", evidenceRole: "portfolio option", originals: [{ title: "Cross-Curricular - The Secret Path", curriculumTags: 2 }, { title: "Cross-curricular - Residential Schools Reading", curriculumTags: 1 }, { title: "Art - Truth and Reconciliation Feather, Drum, and Weaving", curriculumTags: 3 }], note: "Retain the connected learning, but use attributed sources and locally appropriate context; do not reduce truth and reconciliation to a generic craft." },
  { id: "past-place-decimals", family: "Place value and decimal sequence", timing: "October", subjects: ["Math"], kind: "lesson or activity", nextUse: "return", evidenceRole: "checkpoint", originals: [{ title: "Mathematics - Place Value", curriculumTags: 2 }, { title: "Mathematics - Decimal Place Value", curriculumTags: 2 }, { title: "Mathematics- Decimal Arithmetic", curriculumTags: 2 }], note: "Use as one coherent number sequence; select one strongest checkpoint instead of three near-duplicate posts." },
  { id: "past-order-operations", family: "Order of operations", timing: "October", subjects: ["Math"], kind: "lesson or activity", nextUse: "return", evidenceRole: "checkpoint", originals: [{ title: "Mathematics - Order of Operations", curriculumTags: 2 }], note: "Keep as focused practice and save only when individual reasoning is needed." },
  { id: "past-roll-story", family: "Roll-a-Story", timing: "October", subjects: ["ELA"], kind: "lesson or activity", nextUse: "return", evidenceRole: "practice", originals: [{ title: "Language Arts - Roll-a-Story", curriculumTags: 2 }], note: "A strong low-stakes oral and written story launch; usually keep it in class." },
  { id: "past-2040", family: "2040 reflection and analysis", timing: "October", subjects: ["Social Studies", "ELA"], kind: "assignment or reflection", nextUse: "adapt", evidenceRole: "portfolio option", originals: [{ title: "Social Studies - 2040 Reflection and Analysis", curriculumTags: 2 }], note: "Use a current teacher-approved media text and connect claims to evidence and systems." },
  { id: "past-career-community", family: "Careers and community needs", timing: "November", subjects: ["Career", "Social Studies"], kind: "assignment or reflection", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "Career: Exploring Careers and Community Needs", curriculumTags: 5 }], note: "Can combine with the civic/community-needs brief so one artifact serves two distinct assessment lenses." },
  { id: "past-core-reflections", family: "Core Competency reflection cycle", timing: "November–June", subjects: ["Core Competencies"], kind: "assignment or reflection", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "Core Competencies Term 1: Checklist" }, { title: "Core Competencies Term 2: Student Competency Tracking Sheet and Teacher Reflection" }, { title: "Core Competencies - Final Reflection" }], note: "Use one student reflection at each reporting point; teacher tracking remains separate from the student post." },
  { id: "past-phe-self", family: "PHE self-assessment", timing: "November", subjects: ["PHE"], kind: "assignment or reflection", nextUse: "adapt", evidenceRole: "not student evidence", originals: [{ title: "PHE - Self-Assessment Term 1", curriculumTags: 1 }], note: "Keep personal health and body information private; use a conference or teacher observation unless a student chooses non-sensitive evidence." },
  { id: "past-ell", family: "ELL/LST support records", timing: "Terms 1–3", subjects: ["ELL", "LST"], kind: "support record", nextUse: "archive or reference", evidenceRole: "not student evidence", originals: [{ title: "ELL/LST Support Term 1" }, { title: "ELL/LST Support Term 2" }, { title: "ELL/LST Support Term 3" }], note: "Keep in the appropriate private support workflow, not among whole-class portfolio highlights." },
  { id: "past-compare", family: "Compare-and-contrast reading", timing: "December", subjects: ["ELA"], kind: "assignment or reflection", nextUse: "return", evidenceRole: "checkpoint", originals: [{ title: "Language Arts - Compare and Contrast Elephants Reading Comprehension", curriculumTags: 2 }], note: "Retain the comprehension move while allowing audio, visual, and written response routes." },
  { id: "past-new-year-goals", family: "New Year goal check", timing: "January", subjects: ["Career", "Core Competencies"], kind: "assignment or reflection", nextUse: "adapt", evidenceRole: "practice", originals: [{ title: "Cross-Curricular - New Year's Goals", curriculumTags: 2 }], note: "Update the existing September goal rather than creating another unrelated post." },
  { id: "past-fractions-percent", family: "Fractions, mixed numbers, and percents", timing: "January", subjects: ["Math"], kind: "lesson or activity", nextUse: "return", evidenceRole: "checkpoint", originals: [{ title: "Mathematics - Mixed Numbers and Improper Fractions", curriculumTags: 1 }, { title: "Mathematics - Percents", curriculumTags: 2 }], note: "Choose one representation-rich checkpoint when more Math evidence is needed." },
  { id: "past-patterns", family: "Patterns", timing: "January", subjects: ["Math"], kind: "lesson or activity", nextUse: "return", evidenceRole: "checkpoint", originals: [{ title: "Mathematics - Patterns", curriculumTags: 1 }], note: "Retain alongside tables, expressions, graphs, and prediction—not pattern decoration alone." },
  { id: "past-listening-debate", family: "Listening response and table debate", timing: "February", subjects: ["ELA"], kind: "lesson or activity", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "Language Arts - The Hobbit Listening Response", curriculumTags: 4 }, { title: "Language Arts - Table Debates", curriculumTags: 3 }], note: "Offer as ELA evidence choices when listening, text evidence, or oral communication is not already visible." },
  { id: "past-equations", family: "One-step equations", timing: "February", subjects: ["Math", "Career"], kind: "assignment or reflection", nextUse: "adapt", evidenceRole: "checkpoint", originals: [{ title: "Mathematics/Career - One-Step Equations", curriculumTags: 4 }], note: "Keep the Mathematics authentic; add a Career tag only when a genuine career-learning connection is taught and visible." },
  { id: "past-social-inquiry", family: "Social Studies inquiry project", timing: "February", subjects: ["Social Studies", "ELA", "ADST"], kind: "anchor project", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "Social Studies Inquiry Project", curriculumTags: 4 }], note: "Use one shared teaching artifact plus an individual evidence-based reflection." },
  { id: "past-food-influence", family: "Influences on eating habits", timing: "February", subjects: ["PHE", "ELA"], kind: "assignment or reflection", nextUse: "adapt", evidenceRole: "checkpoint", originals: [{ title: "Influences on Eating Habits Paragraph", curriculumTags: 2 }], note: "Use trusted health information and avoid asking students to disclose family finances, culture, diet, or body information." },
  { id: "past-fitness-plan", family: "Personal fitness planning", timing: "February", subjects: ["PHE"], kind: "assignment or reflection", nextUse: "adapt", evidenceRole: "not student evidence", originals: [{ title: "PHE - Personal Fitness Plan", curriculumTags: 1 }], note: "Keep goals private and choice-based; never post body data, public rankings, or comparisons." },
  { id: "past-zoo-geometry", family: "Zoo design and geometry sequence", timing: "March–April", subjects: ["Math", "ADST"], kind: "anchor project", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "Mathematics - Zoo Design Project using Area and Perimeter", curriculumTags: 4 }, { title: "Mathematics - Quadrilaterals", curriculumTags: 1 }, { title: "Mathematics - Classifying and Measuring Triangles", curriculumTags: 2 }, { title: "Mathematics - Volume and Capacity Take-Home Assignment", curriculumTags: 2 }], note: "Teach the component skills, then combine area, perimeter, shapes, volume, and capacity in one substantial design project." },
  { id: "past-dance", family: "Dance", timing: "March", subjects: ["Arts", "PHE"], kind: "lesson or activity", nextUse: "return", evidenceRole: "practice", originals: [{ title: "Art - Dance", curriculumTags: 1 }], note: "Keep dedicated dance learning visible with movement elements, choreographic choices, rehearsal, and reflection." },
  { id: "past-social-justice-book", family: "Social justice book report", timing: "April", subjects: ["ELA", "Social Studies"], kind: "assignment or reflection", nextUse: "adapt", evidenceRole: "portfolio option", originals: [{ title: "Language Arts - Social Justice Book Reports", curriculumTags: 5 }], note: "Retain as one possible literacy showcase with student text choice and source/context care." },
  { id: "past-robot-art", family: "Robot art and writing", timing: "April", subjects: ["Arts", "ELA", "ADST"], kind: "anchor project", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "Cross-curricular: Robot Art and Writing", curriculumTags: 4 }], note: "Useful cross-curricular option when artistic decisions, story choices, and design iteration are all taught." },
  { id: "past-vase", family: "Chinese vase design", timing: "April", subjects: ["Arts"], kind: "lesson or activity", nextUse: "adapt", evidenceRole: "checkpoint", originals: [{ title: "Art - Chinese Vase Design", curriculumTags: 3 }], note: "Study named works, artists, materials, periods, and contexts; avoid copying a generic cultural style." },
  { id: "past-literacy-showcase", family: "Poetry or Werewolf storytelling showcase", timing: "May", subjects: ["ELA"], kind: "assignment or reflection", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "Language Arts - Werewolf Storytelling", curriculumTags: 3 }, { title: "Language Arts - Poetry Booklets", curriculumTags: 3 }], note: "Let students choose one literacy showcase by default instead of requiring both uploads." },
  { id: "past-graph-transform", family: "Environmental graphing and transformations", timing: "May", subjects: ["Math"], kind: "assignment or reflection", nextUse: "return", evidenceRole: "checkpoint", originals: [{ title: "Mathematics - Data and Environmental Graphing", curriculumTags: 3 }, { title: "Mathematics - Coordinate Graphing and Transformations", curriculumTags: 1 }], note: "Keep the two mathematical purposes distinct, then select the stronger evidence sample." },
  { id: "past-food-budget", family: "Healthy Food Budget Challenge", timing: "May", subjects: ["PHE", "Math", "Career"], kind: "anchor project", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "PHE Assignment: Healthy Food Budget Challenge", curriculumTags: 3 }], note: "Use fictional households, current local prices, dietary-choice options, and no judgment of real family food decisions." },
  { id: "past-leadership", family: "Leadership journey", timing: "May–June", subjects: ["Career", "Core Competencies"], kind: "assignment or reflection", nextUse: "return", evidenceRole: "portfolio option", originals: [{ title: "Career Education: My Leadership Journey", curriculumTags: 4 }], note: "Combine with the final Core Competency reflection so leadership evidence becomes specific without adding another post." },
];

export const priorPracticeSummary = {
  familyCount: priorPracticeBank.length,
  originalRecordCount: priorPracticeBank.reduce((total, item) => total + item.originals.length, 0),
} as const;

export const returningPracticeIds = ["past-bloxels", "past-minecraft", "past-trc", "past-social-inquiry", "past-zoo-geometry", "past-food-budget", "past-robot-art", "past-literacy-showcase"];
