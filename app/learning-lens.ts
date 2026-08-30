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
