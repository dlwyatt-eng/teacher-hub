/** Short, paper-first adaptations of existing lessons. Original sequences stay available. */
export type ClassroomLaunchStage = {
  label: string;
  minutes: string;
  title: string;
  prompt: string;
  moves: string[];
};

export type ClassroomLaunch = {
  id: string;
  subject: string;
  title: string;
  duration: string;
  question: string;
  goal: string;
  materials: string;
  preparation: string[];
  stages: ClassroomLaunchStage[];
  paperPrompts: { title: string; prompt: string }[];
  teacherCheck: string[];
  source?: { label: string; url: string; note: string };
};

// Strings retain their written precision for the student sort; values are checked independently in tests.
export const comparisonPractice = [
  { left: "4,305", right: "4,350", relation: "<", place: "tens" },
  { left: "4.305", right: "4.350", relation: "<", place: "hundredths" },
  { left: "0.50", right: "0.500", relation: "=", place: "all places match" },
] as const;
export const comparisonSort = ["0.5", "0.45", "0.405", "0.50"] as const;
export const comparisonExit = { left: "6.08", right: "6.8", relation: "<", place: "tenths" } as const;

// The same original-fiction thinking is shown in the model and on the response sheet.
export const libraryVoteChangeModel = [
  "Before: Lina promised to support mystery night. The promise is a text detail.",
  "Turning point: the survey adds new information. 18 of 25 younger readers prefer comics.",
  "After / so far: no decision is shown. Asking for discussion or keeping the promise are predictions, not facts.",
  "Possible theme: new information can make a promise difficult to keep. Another reading is welcome if details support it.",
] as const;

export const classroomLaunches: ClassroomLaunch[] = [
  {
    id: "magnitude-gallery",
    subject: "Mathematics",
    title: "Which place decides?",
    duration: "30–40 min",
    question: "Does writing more digits make a number greater?",
    goal: "Compare whole numbers and decimals by the first unequal place.",
    materials: "Pencil + plain paper, mini-whiteboard or the response sheet below. No devices needed.",
    preparation: [
      "Use this comparison lesson after a quick place-value check. If rounding still needs teaching, keep it as a separate block rather than rushing both ideas.",
      "Have students commit to an answer before explaining. Read the deciding place aloud, not just the digit.",
      "The full sequence retains number-line models, original worksheets, the scale lab and optional Math Antics support.",
    ],
    stages: [
      { label: "Notice", minutes: "3 min", title: "More digits. Bigger number?", prompt: "Which is greater: 0.50 or 0.405?", moves: ["Choose silently. Explain your first idea to a partner.", "What would convince someone who chose the other number?"] },
      { label: "Model", minutes: "6–8 min", title: "Line up the places. Read from the left.", prompt: "Compare 0.50 and 0.45.", moves: ["Write 0.500 and 0.450. Zeros added at the end of a decimal do not change its value.", "The ones match. The tenths differ: 5 tenths is greater than 4 tenths.", "So 0.50 > 0.45. Say the deciding place: tenths."] },
      { label: "Try", minutes: "15–20 min", title: "Compare. Sort. Convince.", prompt: "Write <, > or = for each pair. Name the deciding place.", moves: ["Sort the four number cards from least to greatest. Put equal values together.", "Take turns explaining and checking. Use a place-value chart if you disagree.", "Return to 0.50 and 0.405. Repair your first explanation if needed."] },
      { label: "Check", minutes: "5 min", title: "One comparison. Your own reason.", prompt: "Compare 6.08 and 6.8. Name the first unequal place.", moves: ["Work alone: write the comparison and explain why it is true.", "Then give a counterexample to: ‘A decimal with more digits is always greater.’", "Keep the response in your Math folder. No upload needed."] },
    ],
    paperPrompts: [
      { title: "1 · First thought", prompt: "Compare 0.50 and 0.405. What makes you think so?" },
      { title: "2 · Compare by place", prompt: "For each pair, write <, > or = and name the deciding place: 4,305 __ 4,350; 4.305 __ 4.350; 0.50 __ 0.500." },
      { title: "3 · Sort + repair", prompt: "Order 0.5, 0.45, 0.405 and 0.50 from least to greatest. Show equal values together. Return to your first thought and improve its reason." },
      { title: "4 · On your own", prompt: "6.08 __ 6.8. Name the deciding place. Give a counterexample to ‘A decimal with more digits is always greater.’" },
    ],
    teacherCheck: [
      "Opening: 0.50 = 0.500 > 0.405; the tenths decide (5 > 4).",
      "Practice: 4,305 < 4,350 (tens); 4.305 < 4.350 (hundredths); 0.50 = 0.500.",
      "Sort: 0.405 < 0.45 < 0.5 = 0.50. Exit: 6.08 < 6.8; tenths decide (0 < 8). The exit pair is also a valid counterexample.",
      "If a learner compares digit counts, align ones, tenths and hundredths with 6.08 and 6.80. Ask them to point to the first unequal place before retrying.",
    ],
  },
  {
    id: "character-council",
    subject: "English Language Arts",
    title: "What changes at a turning point?",
    duration: "30–40 min",
    question: "Does a new situation change the character, and what might the story suggest about life?",
    goal: "Compare a character before and after a turning point, then support a possible theme with text evidence.",
    materials: "Any class novel or approved audio, current bookmark, pencil + paper or response sheet. Speaking with a scribe works too.",
    preparation: [
      "Use any novel. Check the actual class bookmark and select a 5–8 minute section with a possible turning point. Identify an earlier moment already read for the before comparison; do not assume a chapter has been taught or reveal unread events.",
      "Name the book and start/stop point aloud. Read or use approved audio, then revisit the before and after details. If no response is shown yet, record ‘not enough information yet’. If access is unavailable, use the complete original Lina case on the Model screen.",
      "A turning point changes the situation, choices or understanding. Character change means a difference in what someone believes, wants or does; a new setting alone does not prove it. A theme is an idea about life developed by a story, not just a topic such as friendship.",
      "Nevermoor is an optional example if it is the current class novel. Death and rebirth can be one possible theme to explore when the reading supports it, never a required interpretation. Students may support other themes or explain why more evidence is needed.",
      "The Lina case is original fiction, not an extract from a novel. Students paraphrase short details and note their location; do not upload or reproduce the novel or audiobook. This is an in-class response, not new homework or a SpacesEDU post.",
    ],
    stages: [
      { label: "Notice", minutes: "3 min", title: "A changed situation. A changed character?", prompt: "A turning point changes a character's situation, choices or understanding.", moves: ["Imagine a character gets surprising news. Does that prove the character has changed? Think first, then compare ideas.", "Name what you would need to know about the character before and after. Changed, unchanged and not enough information are all possible."] },
      { label: "Model", minutes: "6–8 min", title: "Separate text details from predictions.", prompt: "Original fictional case · Lina and the library vote", moves: [...libraryVoteChangeModel] },
      { label: "Try", minutes: "15–20 min", title: "Before → turning point → after / so far", prompt: "Read or listen from our actual bookmark to the teacher's stopping point. Use the four-part response sheet.", moves: ["Before: name the book, character and reading points. Revisit an earlier detail showing what the character wanted, believed or did.", "Turning point + after: locate the event and the character's response. What changed or stayed the same? Paraphrase evidence and note its page, audio point or moment. If the response is not shown, say so.", "Theme: suggest an idea about life, not just a topic. Explain how the character's change, lack of change or difficult choice supports it.", "Trade ideas. Ask: ‘Which detail supports or challenges that reading?’ Revise or defend your interpretation. Label possible next actions as predictions, not events that happened."] },
      { label: "Check", minutes: "5 min", title: "What does your comparison support?", prompt: "Write or say: ‘Before ___; after / so far ___. This suggests ___ because ___.’", moves: ["Give a possible theme in a sentence and link it to a text detail. ‘Not enough information yet’ is useful when you explain what is missing.", "Name another possible reading or a detail that complicates yours. Explain why you changed or kept your idea after the partner check.", "Keep your response in your reading journal. No homework or upload needed."] },
    ],
    paperPrompts: [
      { title: "1 · Before", prompt: "Book + start/stop point: __. Character: __. Before, they wanted / believed / did __. Earlier text detail + page, audio point or moment: __. No book today? Use the Lina case above." },
      { title: "2 · Turning point", prompt: "An event changes the situation, choices or understanding: __. Text detail + location: __. Why might this moment matter? If no turning point is clear yet, say what you still need to find." },
      { title: "3 · After / so far", prompt: "The character responds by __. Text detail + location: __. Compared with before: changed / unchanged / unclear, because __. If a response is not shown, write ‘not enough information yet’; label possible next actions as predictions." },
      { title: "4 · Theme + check", prompt: "A possible theme (an idea about life, not just a topic) is __. The comparison supports it because __. Another reading or complicating detail: __. After my partner's question, I changed or kept my idea because __." },
    ],
    teacherCheck: [
      "Look for a before/after comparison with accurately paraphrased, located details. Distinguish a change in circumstances from a change in beliefs, wants or actions. A supported ‘unchanged’ or ‘unclear’ is valid; do not force a transformation.",
      "A theme is a defensible idea about life, not a prescribed moral or a one-word topic. Ask how the comparison supports the theme and which detail complicates it. Accept different supported readings and provisional themes from an unfinished novel.",
      "In the fictional case, the promise and survey are facts; Lina's final decision and personal change are unknown. Asking for discussion or keeping the promise can both be defended as predictions if the tension is acknowledged.",
      "If evidence is thin at this bookmark, record ‘not enough information yet’ and a question. Revisit after further reading rather than inventing a clue or future event. Assess the reasoning, not whether every box is full.",
    ],
  },
  {
    id: "career-constellation",
    subject: "Career Education",
    title: "An issue needs a team",
    duration: "35–45 min",
    question: "Which question, role and skill could help us understand an issue?",
    goal: "Connect a chosen inquiry question with useful work and one safe skill to practise.",
    materials: "A teacher-opened Action Pack if available, pencil + paper or response sheet. The fictional refill-station case supplies a complete offline route.",
    preparation: [
      "Ask students which issue and inquiry question they already chose. Continue that choice; do not assign a new pack or assume an assignment has been created.",
      "If using Be the Change, open the selected pack through the existing approved access and record its title. The link is a source portal, not a supplied worksheet.",
      "Keep actions to planning, sketching or a teacher-approved classroom test. No public campaign, contacting people, personal disclosure, account setup or upload is required.",
    ],
    stages: [
      { label: "Notice", minutes: "4 min", title: "One issue. More than one useful role.", prompt: "Fictional challenge: a refill-station queue blocks a school doorway.", moves: ["Who could help the team understand the problem before it changes anything?", "Name an action, not a ‘type of person’. A role is a piece of work anyone can practise."] },
      { label: "Model", minutes: "7–9 min", title: "Turn a concern into a question and a skill.", prompt: "How could a queue leave a clear route through the doorway?", moves: ["Observer → notices where the queue forms → careful observation.", "Designer → sketches two queue layouts → planning and clear labels.", "Checker → traces routes on the paper plans → testing and explaining. A real change would need teacher approval."] },
      { label: "Try", minutes: "18–25 min", title: "Build your question-to-action sketch.", prompt: "Start with your chosen Action Pack issue, or use our fictional queue.", moves: ["Write one question. Record one source detail and the pack title, or label your work ‘fictional case’.", "Sketch three connected roles. Label what each does and one useful skill. Mark guesses as ‘to check’.", "Choose a skill to practise with a paper sketch or safe class task. Ask whose needs the plan addresses, whose view is missing, and what evidence would show it helped."] },
      { label: "Check", minutes: "6 min", title: "What is your next useful move?", prompt: "Explain: question → role → skill → safe first step.", moves: ["Before a class test, record: ‘I will try __. I will look for __.’ Get teacher approval for a real-world action.", "After trying it: ‘I did __. The evidence was __. Next I would __.’ If not tried yet, label it ‘planned’.", "Keep the sketch in class. A SpacesEDU post is only needed if the teacher later opens an activity."] },
    ],
    paperPrompts: [
      { title: "1 · My question + source", prompt: "Chosen issue: __. My inquiry question: __. Pack title + one source detail, or ‘fictional refill-station case’: __." },
      { title: "2 · Three connected roles", prompt: "Sketch or list three roles. For each, add an action and a skill. Draw a labelled link between two roles. Mark unverified ideas ‘to check’." },
      { title: "3 · Before trying", prompt: "The skill I will practise: __. My safe first step: __. I will look for this evidence: __. Teacher approval if needed: __." },
      { title: "4 · After trying / next check", prompt: "Status: planned / tried. I did __. The evidence was __. Next I would __. If still planned, what must happen before the test?" },
    ],
    teacherCheck: [
      "Look for a question that can be investigated, a source detail distinct from a guess, and three roles with observable actions. Roles must not become fixed personality labels.",
      "Accept tentative role/skill links labelled ‘to check’. Students should investigate career claims in a teacher-approved profile before treating them as fact.",
      "Before: check the goal, safe action and proposed evidence. After: look for a concrete action, what happened and a next adjustment. Planned work is not completed work.",
    ],
    source: { label: "Be the Change · Curriculum for Change", url: "https://www.bethechangeearthalliance.org/c4c", note: "Action Pack source portal; approved access may be needed. The response sheet here is an original classroom organizer, not a copy of an Action Pack." },
  },
];

export const classroomLaunchFor = (id: string) => classroomLaunches.find(launch => launch.id === id);
export const libraryVoteCase = "Lina promised a friend she would support mystery night. Before the final vote, a survey shows that 18 of 25 younger readers prefer a comics workshop. The club has one event slot.";
