const coreCompetencyMoves: Record<string, readonly string[]> = {
  "English Language Arts": [
    "Communication — listen, make meaning, and share an idea clearly",
    "Critical and Reflective Thinking — question, connect, and revise",
  ],
  Mathematics: [
    "Critical and Reflective Thinking — try, test, and explain a strategy",
    "Communication — show an idea with numbers, pictures, words, or objects",
  ],
  Science: [
    "Critical and Reflective Thinking — test an idea with evidence",
    "Communication — explain what a model, result, or observation shows",
  ],
  "Social Studies": [
    "Critical and Reflective Thinking — use evidence and revise",
    "Social Awareness and Responsibility — notice who is affected",
  ],
  "Arts Education": [
    "Creative Thinking — experiment and make deliberate choices",
    "Communication — express an idea through an art form",
  ],
  "Applied Design, Skills & Technologies": [
    "Creative Thinking — imagine, build, and test possibilities",
    "Critical and Reflective Thinking — learn from a test that fails",
  ],
  "Physical & Health Education": [
    "Personal Awareness and Responsibility — notice what helps you participate",
    "Social Awareness and Responsibility — make play safer and more welcoming",
  ],
  "Career Education": [
    "Personal Awareness and Responsibility — understand strengths and next steps",
    "Communication — contribute, listen, and learn with others",
  ],
};

export function coreCompetencyMovesFor(subject: string): readonly string[] {
  return coreCompetencyMoves[subject] ?? [
    "Critical and Reflective Thinking — notice, question, and revise",
    "Communication — explain an idea and listen to another view",
  ];
}

const universalAccessibility = [
  "Keep the evidence target; let students show the same thinking by speaking, writing, drawing, pointing, manipulatives, or an approved communication aid.",
  "Read key text aloud and reveal one direction at a time. Preteach only the words needed for the current move.",
  "Offer private think time, a partner rehearsal, and a seated or non-performance role without requiring disclosure of a disability or personal circumstance.",
] as const;

const accessibilityBySubject: Record<string, readonly string[]> = {
  Science: [
    ...universalAccessibility,
    "Use teacher-handled materials, a no-lab evidence set, or observation role when sensory, mobility, allergy, or safety needs make direct handling unsuitable.",
  ],
  "Social Studies": [
    ...universalAccessibility,
    "Provide enlarged or high-contrast sources, read source excerpts aloud, and accept oral or diagrammed evidence before extended writing.",
  ],
  Mathematics: [
    ...universalAccessibility,
    "Keep manipulatives, a calculator when calculation is not the target, and worked visual examples available without attaching them to a fixed ability group.",
  ],
  "English Language Arts": [
    ...universalAccessibility,
    "Offer audiobook, shared reading, dictation, speech-to-text, and graphic or oral composition routes while keeping the meaning-making target visible.",
  ],
};

export function runSheetAccessibilityFor(subject: string): readonly string[] {
  return accessibilityBySubject[subject] ?? universalAccessibility;
}

const discussionBySubject: Record<string, readonly string[]> = {
  Science: ["What did you observe—not infer?", "Which result supports that idea?", "What result would make us revise the model?"],
  "Social Studies": ["What does the source actually show?", "Who is affected or still missing?", "What new evidence would make us revise?"],
  Mathematics: ["What makes the strategy work?", "Where is that visible in the model?", "Can another representation verify it?"],
  "English Language Arts": ["Which exact detail shaped your interpretation?", "What did the creator choose or leave out?", "What revision would help this audience?"],
};

export function runSheetDiscussionMovesFor(subject: string): readonly string[] {
  return discussionBySubject[subject] ?? ["What makes you say that?", "Point to the evidence, model, or choice.", "What changed after the test or feedback?"];
}
