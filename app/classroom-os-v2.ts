/**
 * Classroom OS v2 architecture primitives.
 *
 * These types do not replace the current subject registries. They are the
 * compatibility contract used to migrate those registries one strong lesson
 * at a time while keeping one curriculum and distinct audience projections.
 */

export const thinkingToolkit = [
  { id: "ask-better-questions", label: "Ask better questions", prompt: "What question would open this up?" },
  { id: "investigate", label: "Investigate", prompt: "What could we observe, test, read, or ask?" },
  { id: "verify", label: "Verify", prompt: "How do we know, and what should we check?" },
  { id: "challenge-assumptions", label: "Challenge assumptions", prompt: "What might we be taking for granted?" },
  { id: "shift-perspective", label: "Shift perspective", prompt: "How might this look from another position?" },
  { id: "generate-possibilities", label: "Generate possibilities", prompt: "What else could be possible?" },
  { id: "weigh-trade-offs", label: "Weigh trade-offs", prompt: "What could improve, and what might it cost?" },
  { id: "improve", label: "Improve", prompt: "What change would make this stronger?" },
  { id: "reflect", label: "Reflect", prompt: "What changed in our thinking, and why?" },
] as const;

export type ThinkingMoveId = (typeof thinkingToolkit)[number]["id"];
export type DeliveryMode = "full-tech" | "shared-tech" | "offline";
export type AiParticipation = "whole-class" | "pair" | "small-group" | "individual";
export type LessonMaturity = "concept" | "structured" | "teacher-ready" | "classroom-tested" | "classroom-verified";

export type DeliveryRoute = {
  mode: DeliveryMode;
  route: string;
  equivalentLearning: string;
};

export type ApprovedToolDoor = {
  provider: "SchoolAI" | "Microsoft Copilot" | "Other approved district tool";
  status: "not-used" | "review-needed" | "teacher-approved";
  purpose: string;
  prerequisiteExperience: string;
  participation: AiParticipation;
  participationRationale: string;
  verificationMove: string;
  privacyNote: string;
  offlineAlternative: string;
  reviewDate?: string;
};

export type StudentLessonProjectionV2 = {
  launch: string;
  grouping: string;
  duration: string;
  firstMove: string;
  choices: string;
  product: string;
  doneWhen: string;
  destination: string;
  catchUp: string;
};

export type FamilyLessonProjectionV2 = {
  summary: string;
  whyItMatters: string;
  product: string;
  assessment: string;
  supportAtHome: string;
};

export type LessonEvidencePlanV2 = {
  level: "practice" | "checkpoint" | "portfolio-highlight";
  groupEvidence: string;
  individualEvidence: string;
  spacesDestination: string;
};

export type LessonRecordV2 = {
  id: string;
  unitId: string;
  sourcePipeline: "program" | "science" | "social";
  title: string;
  bigQuestion: string;
  thinkingMoves: ThinkingMoveId[];
  maturity: LessonMaturity;
  audience: {
    sharedLearning: string;
    teacher: { planningSource: string };
    student: StudentLessonProjectionV2;
    family: FamilyLessonProjectionV2;
  };
  evidence: LessonEvidencePlanV2;
  deliveryRoutes: DeliveryRoute[];
  toolDoors: ApprovedToolDoor[];
};

// Kept as an alias while existing tests and adapters move to the clearer name.
export type LessonContractV2 = LessonRecordV2;

export type UnitRecordV2 = {
  id: string;
  title: string;
  subject: string;
  bigIdea: string;
  inquiryQuestion: string;
  lessonIds: string[];
  familyOverview: string;
  publicStatus: "private" | "current" | "upcoming" | "archived";
};

export type CurrentLearningWindowV2 = {
  schemaVersion: "classroom-os-current-window/v2";
  contentVersion: string;
  sourceUpdatedAt: string;
  window: {
    id: string;
    effectiveFrom: string;
    effectiveTo: string;
    state: "up-next" | "active" | "complete";
    source: { lessonId: string; sourcePipeline: LessonRecordV2["sourcePipeline"]; planningSource: string; spacesEvidenceId?: string };
    shared: {
      eyebrow: string;
      title: string;
      bigQuestion: string;
      summary: string;
      learningArc: { timing: string; label: string; studentAction: string; outcome: string }[];
      visual: { src: string; alt: string; caption: string };
      primaryResource: { label: string; href: string; format: string; description: string };
      thinkingMoves: { id: ThinkingMoveId; label: string; prompt: string }[];
      subjectSnapshot: { subject: string; now: string; why: string }[];
    };
    teacher: {
      primaryView: string;
      secondaryView: string;
      projectorView: string;
      timing: string;
      duration: string;
      grouping: string;
      launch: string;
      prepare: string[];
      runOfShow: { timing: string; move: string; teacherAction: string }[];
      scenarios: { title: string; situation: string; call: "HELPS LEARNING" | "CHECK IT" | "STOP + ASK"; reason: string }[];
      lookFors: string[];
      evidenceHandoff: string;
    };
    student: {
      label: string;
      title: string;
      why: string;
      summary: string;
      duration: string;
      grouping: string;
      routeTitle: string;
      firstMove: string;
      firstMoveNote: string;
      bring: string[];
      steps: string[];
      choices: string[];
      product: string;
      finish: string;
      handInOrSave: string;
      ifAbsentOrStuck: string;
      spacesNote: string;
    };
    family: {
      label: string;
      title: string;
      summary: string;
      whyThisMatters: string;
      whatStudentsDo: string;
      product: string;
      assessment: string;
      agreementNote: string;
      groupAndIndividualEvidence: string;
      milestones: { date: string; label: string }[];
      homework: string;
      supportAtHome: string[];
      conversationPrompts: string[];
      spacesNote: string;
    };
    deliveryRoutes: DeliveryRoute[];
    toolActivityIds: string[];
  };
};

export const aiParticipationPrinciple = {
  default: "collaborative-when-it-improves-thinking",
  collaborative:
    "Prefer pairs or small groups when dialogue, comparison, verification, perspective-taking, or co-creation improves the thinking.",
  individual:
    "Use individual AI when personalization itself is the instructional reason, such as a tailored scaffold, language support, targeted practice, private rehearsal, or responsive feedback.",
  neverDefault: "Do not default to one student, one device, and one AI conversation.",
} as const;

export const unitRecordsV2: UnitRecordV2[] = [
  {
    id: "opening-learning-community",
    title: "Opening Our Learning Community",
    subject: "Cross-curricular",
    bigIdea: "Agency, responsible decision-making, and thoughtful collaboration make ambitious learning possible.",
    inquiryQuestion: "When does technology strengthen our learning—and what choices keep the thinking, safety, and responsibility with us?",
    lessonIds: ["welcome-signal-studio"],
    familyOverview: "Students investigate realistic search, device, and AI choices, build a specific class commitment, and write an individual learning and technology agreement for their receiving teacher.",
    publicStatus: "current",
  },
  {
    id: "number-relationships",
    title: "Number Relationships",
    subject: "Mathematics",
    bigIdea: "Numbers describe relationships that can be represented, explained, and used to solve problems.",
    inquiryQuestion: "How can patterns in factors and multiples help us reason efficiently?",
    lessonIds: ["pack-and-sync"],
    familyOverview: "Students explain factor and multiple relationships, investigate believable errors, and improve mathematical reasoning with a partner.",
    publicStatus: "upcoming",
  },
  {
    id: "place-evidence-perspective",
    title: "Place, Evidence & Perspective",
    subject: "Social Studies",
    bigIdea: "Evidence and perspective shape the stories people tell about places and the decisions communities make.",
    inquiryQuestion: "How do maps and local evidence shape what people notice, value, and decide about Fleetwood?",
    lessonIds: ["maps-make-arguments"],
    familyOverview: "Students compare authentic Fleetwood maps and sources before building and revising evidence-based claims about community change.",
    publicStatus: "upcoming",
  },
  {
    id: "forces-motion-design",
    title: "Forces, Motion & Design",
    subject: "Science",
    bigIdea: "Forces affect motion, and repeated evidence can improve explanations and designs.",
    inquiryQuestion: "How can evidence about force and motion help us explain, test, and improve a design?",
    lessonIds: ["force-patterns-lab"],
    familyOverview: "Students gather repeated evidence, critique models, and use fair testing to improve a protective design.",
    publicStatus: "upcoming",
  },
];

/**
 * Phase 0 migration anchors. The detailed lesson content remains in its
 * existing registry; these records prove that all three pipelines can adopt
 * the same contract without flattening their distinctive experiences.
 */
export const lessonContractV2Exemplars: LessonRecordV2[] = [
  {
    id: "welcome-signal-studio",
    unitId: "opening-learning-community",
    sourcePipeline: "program",
    title: "Make the Call: Technology & AI in Grade 6",
    bigQuestion: "When does technology strengthen our learning—and what choices keep the thinking, safety, and responsibility with us?",
    thinkingMoves: ["ask-better-questions", "verify", "challenge-assumptions", "weigh-trade-offs", "improve", "reflect"],
    maturity: "classroom-verified",
    audience: {
      sharedLearning: "Students investigate realistic technology and AI decisions, repair weak uses, build a testable class commitment, and write an individual agreement.",
      teacher: { planningSource: "first-week-mission.tsx" },
      student: {
        launch: "Make the call: does this situation help learning, need checking, or require us to stop and ask? Defend the decision with evidence.",
        grouping: "Pairs and tables of 3–4 for the investigations; individual only for the personalized agreement",
        duration: "About 60 minutes in each rotation classroom",
        firstMove: "Name one learning job technology has helped you do, then predict one choice that could make the result less trustworthy.",
        choices: "Show reasoning by speaking, writing, pointing, using table cards, dictating to an adult, or making labelled drawings.",
        product: "One table commitment and your own signed Grade 6 Learning, Technology & AI Agreement",
        doneWhen: "You can explain one decision, show one repair, and name a personal commitment, stop-and-ask moment, useful support, and teacher question.",
        destination: "The table commitment helps shape class discussion; the named agreement travels privately to the receiving teacher and is not graded.",
        catchUp: "Complete one scenario decision, one prompt or response repair, and the individual agreement with teacher guidance.",
      },
      family: {
        summary: "Students examine realistic choices about privacy, source checking, ownership, attribution, help-seeking, and responsible technology or AI support.",
        whyItMatters: "Students practise what to do in a real classroom situation and explain why, rather than memorizing a broad slogan.",
        product: "A table commitment plus an individual learning, technology, and AI agreement for the receiving teacher",
        assessment: "Low-stakes formative evidence of reasoning and responsible decision-making; the agreement is not graded and does not affect placement.",
        supportAtHome: "Ask which scenario was hardest to decide and what evidence changed the student's mind. No special supplies or at-home completion are expected.",
      },
    },
    evidence: {
      level: "practice",
      groupEvidence: "Evidence calls, prompt and response repairs, and one stress-tested table commitment",
      individualEvidence: "My Grade 6 Learning, Technology & AI Agreement",
      spacesDestination: "The named agreement remains private with the teacher; a later September Learning Story may become selected portfolio evidence.",
    },
    deliveryRoutes: [
      { mode: "full-tech", route: "Project the interactive evidence game and, if a reviewed teacher session is ready, test the repaired prompt once.", equivalentLearning: "Make, defend, verify, repair, and reflect on authentic technology decisions." },
      { mode: "shared-tech", route: "Use one teacher-controlled screen, paper lane cards, table talk, and the prepared response audit.", equivalentLearning: "Make, defend, verify, repair, and reflect on authentic technology decisions." },
      { mode: "offline", route: "Use printed samples, scenarios, prompt choices, response strips, and the agreement page.", equivalentLearning: "Make, defend, verify, repair, and reflect on authentic technology decisions." },
    ],
    toolDoors: [],
  },
  {
    id: "force-patterns-lab",
    unitId: "forces-motion-design",
    sourcePipeline: "science",
    title: "Newton's laws in motion",
    bigQuestion: "What patterns appear when force, mass, friction, and interactions change?",
    thinkingMoves: ["investigate", "verify", "challenge-assumptions", "reflect"],
    maturity: "teacher-ready",
    audience: {
      sharedLearning: "Students build force-and-motion patterns from observation, repeated evidence, and model critique.",
      teacher: { planningSource: "science-program.ts" },
      student: {
        launch: "Compare motion cases, gather repeated evidence, and defend the pattern that best explains a new case.",
        grouping: "Investigation teams with an individual explanation",
        duration: "Two to three class periods",
        firstMove: "Predict which evidence would distinguish force, mass, and friction effects.",
        choices: "Choose how to represent the pattern: annotated sequence, graph, model, or concise explanation.",
        product: "A tested force-and-motion claim supported by repeated evidence",
        doneWhen: "Your model explains a new case and names one limit or uncertainty.",
        destination: "Teacher-selected checkpoint or portfolio highlight in SpacesEDU",
        catchUp: "Use the supplied case evidence and complete the individual model explanation.",
      },
      family: {
        summary: "Students use evidence from hands-on and shared-screen investigations to explain how forces change motion.",
        whyItMatters: "Students learn that scientific explanations must fit repeated evidence and remain open to revision.",
        product: "A force-and-motion model or explanation supported by test evidence",
        assessment: "The teacher considers investigation decisions, evidence quality, explanation, and revision.",
        supportAtHome: "Ask which piece of evidence changed the student’s model and why.",
      },
    },
    evidence: {
      level: "checkpoint",
      groupEvidence: "Investigation record and shared test evidence",
      individualEvidence: "A model or explanation that applies the pattern to a new case",
      spacesDestination: "Teacher selects one substantial investigation or design revision for SpacesEDU.",
    },
    deliveryRoutes: [
      { mode: "full-tech", route: "Hands-on stations plus a teacher-curated shared simulation.", equivalentLearning: "Use repeated evidence to explain and critique a force pattern." },
      { mode: "shared-tech", route: "Hands-on stations with one projected simulation directed by students.", equivalentLearning: "Use repeated evidence to explain and critique a force pattern." },
      { mode: "offline", route: "Hands-on stations and supplied case evidence replace the simulation.", equivalentLearning: "Use repeated evidence to explain and critique a force pattern." },
    ],
    toolDoors: [],
  },
  {
    id: "maps-make-arguments",
    unitId: "place-evidence-perspective",
    sourcePipeline: "social",
    title: "Three maps of Fleetwood",
    bigQuestion: "How can maps shape what people notice, value, and decide about a place?",
    thinkingMoves: ["ask-better-questions", "verify", "shift-perspective", "challenge-assumptions", "weigh-trade-offs"],
    maturity: "teacher-ready",
    audience: {
      sharedLearning: "Students compare authentic maps and evidence to identify what each representation reveals and leaves out.",
      teacher: { planningSource: "social-program.ts" },
      student: {
        launch: "Compare three maps of Fleetwood and build a claim about the story each map tells.",
        grouping: "Pairs or teams of 3 with an individual revised claim",
        duration: "One to two class periods",
        firstMove: "Choose one map detail that seems important and one feature that may be missing.",
        choices: "Follow transit, housing, green space, services, movement, or another evidence-based local thread.",
        product: "A comparison map and a revised claim about how representation shapes a community story",
        doneWhen: "Your claim uses specific map evidence, acknowledges an omission, and names a perspective still needed.",
        destination: "Fleetwood Evidence Case File; selected evidence may become a SpacesEDU checkpoint.",
        catchUp: "Use the dated printed source set and complete one comparison plus one evidence-based claim.",
      },
      family: {
        summary: "Students examine how maps and local evidence can influence what communities notice and prioritize.",
        whyItMatters: "Fleetwood is changing. Students learn to examine whose evidence is visible before judging a community decision.",
        product: "A map comparison and evidence-based claim for the Fleetwood Evidence Case File",
        assessment: "The teacher looks for source use, careful inference, perspective, and willingness to revise—not one preferred opinion.",
        supportAtHome: "Ask what one map reveals, what it leaves out, and whose experience would add to the picture.",
      },
    },
    evidence: {
      level: "checkpoint",
      groupEvidence: "Shared comparison map and source notes",
      individualEvidence: "Revised claim with evidence, an omission, and a needed perspective",
      spacesDestination: "A selected Fleetwood case-file artifact may be posted when the teacher identifies it as a checkpoint.",
    },
    deliveryRoutes: [
      { mode: "full-tech", route: "Teams inspect curated map sources on shared devices and the projector.", equivalentLearning: "Compare evidence, perspective, and omission across maps." },
      { mode: "shared-tech", route: "Use one projector, rotating source stations, and paper evidence cards.", equivalentLearning: "Compare evidence, perspective, and omission across maps." },
      { mode: "offline", route: "Use dated printed map excerpts with attribution and source notes.", equivalentLearning: "Compare evidence, perspective, and omission across maps." },
    ],
    toolDoors: [],
  },
];
