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
  "Arts Education": [
    ...universalAccessibility,
    "Offer standing, seated, hand-only, prop, tabletop, storyboard, composer, director, designer, narrator, technician, and documenter routes without lowering the artistic intention or technique target.",
    "Provide captions or transcripts, audio description, enlarged/high-contrast mentor images, non-colour-only notation, low-sensory and quiet routes, and fine-motor alternatives.",
    "Set sound volume, movement space, light, tool, material, cultural-source, consent, and cleanup boundaries before making begins; never require personal disclosure or public performance.",
  ],
};

export function runSheetAccessibilityFor(subject: string): readonly string[] {
  return accessibilityBySubject[subject] ?? universalAccessibility;
}

const discussionBySubject: Record<string, readonly string[]> = {
  Science: ["Which observation supports your explanation? Could another explanation fit it?", "What fair test would help us tell those explanations apart?", "What can this model or result explain, and what remains uncertain?"],
  "Social Studies": ["What does this source support, and whose account could add or challenge something?", "Who benefits, who carries a cost, and who has power to change the decision?", "Which response can you justify, and what consequence or missing evidence still concerns you?"],
  Mathematics: ["Why does your strategy work for these numbers?", "Can a different representation confirm it or expose a mistake?", "Would your claim always hold? Try another case or a counterexample."],
  "English Language Arts": ["Which detail supports your reading, and which detail complicates it?", "Could another reader make a different case from the same text? Compare the evidence.", "Which uncertainty is worth keeping, and which confusion needs a revision for this audience?"],
  "Arts Education": ["Which element or technique shaped your response? Point to a moment or detail.", "How does the artist's context inform your reading without fixing a single meaning?", "How could two viewers respond differently to this choice?", "What would a revision gain or lose? Explain what you would change or deliberately keep."],
  "Applied Design, Skills & Technologies": ["Which need is stated, and which have we assumed?", "What does each possible design improve, and what does it make harder?", "Whose use did we test? What would we need to learn before claiming it works more widely?"],
  "Physical & Health Education": ["What changed in participation, choice, or enjoyment? Where does the evidence disagree?", "What did the rule or environment make easier or harder?", "Would this strategy work in another situation? Explain what we should test next."],
  "Career Education": ["Which action helped in this task, and when might a different action help?", "Whose less visible contribution made the result possible?", "What could you try next to learn about a skill without deciding your whole future?"],
};

export function runSheetDiscussionMovesFor(subject: string): readonly string[] {
  return discussionBySubject[subject] ?? ["What makes you say that?", "Point to the evidence, model, or choice.", "What changed after the test or feedback?"];
}
