export type RotationDuration = 45 | 60 | 75;

export type RotationPrivacyLevel = "private" | "selected-excerpt" | "display-candidate";

export type RotationSession = {
  id: string;
  title: string;
  bookletTitle: string;
  page: number;
  preview: string;
  question: string;
  learningIntention: string;
  bestFor: string;
  product: string;
  privacy: {
    level: RotationPrivacyLevel;
    label: string;
    student: string;
    teacher: string;
    display: string;
  };
  materials: readonly string[];
  prepare: readonly string[];
  provocation: {
    display: string;
    ask: string;
    move: string;
  };
  makeSteps: readonly string[];
  discuss: readonly string[];
  teacherMoves: readonly string[];
  misconception: {
    idea: string;
    respond: string;
  };
  success: readonly string[];
  accessibility: readonly string[];
  earlyFinisher: string;
  extension75: string;
  shortened: string;
  ttoc: string;
  displayIdea: string;
};

export type RotationTimelineStep = {
  timing: string;
  label: string;
  action: string;
};

export const DISCOVERY_BOOKLET_PDF = "/printables/Grade_6_Discovery_Booklet.pdf";

export const ROTATION_DURATIONS: readonly RotationDuration[] = [45, 60, 75];

export const rotationTimings: Record<RotationDuration, readonly Omit<RotationTimelineStep, "action">[]> = {
  45: [
    { timing: "0–4", label: "Welcome + privacy" },
    { timing: "4–9", label: "Provoke" },
    { timing: "9–13", label: "Model + choose" },
    { timing: "13–31", label: "Create" },
    { timing: "31–38", label: "Check" },
    { timing: "38–43", label: "Revise + decide" },
    { timing: "43–45", label: "Label + collect" },
  ],
  60: [
    { timing: "0–5", label: "Welcome + privacy" },
    { timing: "5–12", label: "Provoke" },
    { timing: "12–17", label: "Model + choose" },
    { timing: "17–40", label: "Create" },
    { timing: "40–50", label: "Check" },
    { timing: "50–56", label: "Revise + decide" },
    { timing: "56–60", label: "Label + collect" },
  ],
  75: [
    { timing: "0–6", label: "Welcome + privacy" },
    { timing: "6–14", label: "Provoke" },
    { timing: "14–20", label: "Model + choose" },
    { timing: "20–50", label: "Create" },
    { timing: "50–63", label: "Check + deepen" },
    { timing: "63–70", label: "Revise + decide" },
    { timing: "70–75", label: "Label + collect" },
  ],
};

export const rotationSessions: readonly RotationSession[] = [
  {
    id: "rotation-identity-constellation",
    title: "Identity Constellation",
    bookletTitle: "My Identity Constellation",
    page: 1,
    preview: "/images/first-week/identity-constellation.webp",
    question: "What people, places, interests, languages, strengths, and experiences help make you you?",
    learningIntention: "I can represent parts of my identity and choose what I want others to know.",
    bestFor: "belonging, low-risk connection, and student voice",
    product: "A constellation of words, symbols, pictures, or colour chosen by the student.",
    privacy: {
      level: "selected-excerpt",
      label: "PRIVATE ORIGINAL · OPTIONAL EXCERPT",
      student: "You choose what to include, what to skip, and whether one safe part may be copied for display.",
      teacher: "Treat the named original as private learner information. Never require family, cultural, language, faith, health, or identity disclosure.",
      display: "Only a separately copied symbol, word, or shape that the student selects and approves again may enter the display.",
    },
    materials: ["Discovery Booklet page 1 or blank paper", "Pencils", "Optional colour supplies", "Opaque collection folder"],
    prepare: ["Project the sample page without completing it for students.", "Choose a fictional or teacher-safe model with at least one intentionally blank area.", "Label one opaque folder with room/date/rotation block."],
    provocation: {
      display: "Draw six stars. Connect only the stars you are comfortable explaining.",
      ask: "Can an identity be true even when some parts stay private?",
      move: "Model two ordinary details and one blank. Say aloud that a blank can be a thoughtful choice, not unfinished work.",
    },
    makeSteps: [
      "Choose three or more sections that feel safe and useful.",
      "Add words, symbols, pictures, or colour; a sentence is optional.",
      "Connect ideas that belong together and add one strength you want to grow.",
      "Review the page: keep, cover, change, or leave blank anything you do not want to share.",
    ],
    discuss: ["Which part was easiest to represent without a sentence?", "How can classmates show curiosity without asking for private details?", "What helps a class make room for many identities without putting anyone on display?"],
    teacherMoves: ["Notice representation choices, not the amount disclosed.", "Use invitations such as ‘You may…’ and ‘A fictional example is fine.’", "Redirect personal follow-up questions to patterns: ‘What do we learn about belonging in general?’"],
    misconception: {
      idea: "A fuller page means a student is more engaged or more knowable.",
      respond: "Name privacy as agency. Assess thoughtful representation and choice, never depth of personal disclosure.",
    },
    success: ["At least three chosen identity details are represented in a way the student can explain.", "The student used a visual relationship, label, or connection rather than a disconnected list only.", "The student made and communicated a privacy choice."],
    accessibility: ["Draw, write, dictate, collage from teacher-provided neutral shapes, or use symbols.", "Offer a fictional-character route or categories such as favourite activity, place, sound, object, and strength.", "Do not require eye contact, public sharing, colour vision, fine-motor detail, or English-only responses."],
    earlyFinisher: "Add a legend that explains two symbols without revealing anything new, or add a future star for a strength you hope to grow.",
    extension75: "Pairs compare one voluntarily shared design choice, then create a class list of respectful ways to ask about identity without demanding disclosure.",
    shortened: "Complete any three safe stars plus one connection. Protect the final four minutes for the privacy check, label, and face-down collection.",
    ttoc: "Do not ask students to explain a blank or disclose a category. Model with harmless details, keep sharing optional, and collect every named original face-down.",
    displayIdea: "Combine student-approved copied symbols into a ‘Many Ways We Belong’ sky. Do not post names unless students and the receiving teacher approve.",
  },
  {
    id: "rotation-how-i-learn",
    title: "How I Learn Best",
    bookletTitle: "My Brain’s User Manual",
    page: 2,
    preview: "/images/first-week/brain-user-manual.webp",
    question: "What conditions and actions help you begin, focus, recover when stuck, and show what you know?",
    learningIntention: "I can notice useful learning conditions and name one support I can try.",
    bestFor: "learner agency, routines, and teacher planning",
    product: "A practical learner user manual with student-chosen strategies and support requests.",
    privacy: {
      level: "private",
      label: "PRIVATE LEARNER INFORMATION",
      student: "Share useful school information only. Diagnoses, medical information, family details, and difficult experiences are never required.",
      teacher: "Keep the named page private and use it as the start of a conversation, not a diagnosis, fixed label, promise, or placement tool.",
      display: "Do not display this page or excerpts. Later, the class may build an anonymous list of strategies that many learners find useful.",
    },
    materials: ["Discovery Booklet page 2 or blank paper", "Pencils", "Optional word bank", "Opaque collection folder"],
    prepare: ["Post a strategy bank: quiet, movement break, example, checklist, partner rehearsal, chunking, visual, read-aloud, extra think time.", "Model changing ‘I can’t focus’ into one testable condition or action.", "Know the school help route if a student discloses a safety concern."],
    provocation: {
      display: "Same learner. Two different rooms. In which room might learning be easier—and what evidence would you need?",
      ask: "Is ‘learning best’ a permanent label, or something we can keep testing?",
      move: "Think aloud: ‘A checklist sometimes helps me start, but a partner helps me rehearse. I need to test the fit.’",
    },
    makeSteps: [
      "Choose at least four prompts that would help a teacher support you at school.",
      "Name a condition or action—not a fixed label—for each response.",
      "Add one ‘when I am stuck’ strategy and one strength or point of pride.",
      "Circle one support you are willing to try during the first month.",
    ],
    discuss: ["How is a useful strategy different from an excuse or a fixed label?", "Why might the best support change with the task?", "How can a teacher offer choices without lowering the learning goal?"],
    teacherMoves: ["Reframe absolutes: ‘never’ becomes ‘often’ or ‘in this kind of task.’", "Ask for observable conditions and actions rather than inferred learning styles.", "Privately follow school procedures for safety disclosures; do not process them in the group."],
    misconception: {
      idea: "Every learner has one permanent learning style, so teaching should always match it.",
      respond: "Validate preferences while emphasizing flexible strategies, task demands, access needs, and evidence from trying different routes.",
    },
    success: ["The page names specific, usable school conditions or actions.", "The student identifies a way to recover when stuck and a strength.", "One strategy is framed as something to try and review, not a permanent label."],
    accessibility: ["Offer sentence stems, a strategy word bank, adult scribing, speech-to-text on an approved shared device, or labelled icons.", "Students may replace any prompt with ‘Something I want my teacher to ask me later.’", "Allow a quiet finish without partner sharing; never require reading the page aloud."],
    earlyFinisher: "Turn one preference into a testable plan: ‘During ___, I will try ___; I will know it helps if ___.’",
    extension75: "Students privately rank three strategies to test, then help create an anonymous class menu of flexible learning supports.",
    shortened: "Complete ‘learn best when,’ ‘when stuck,’ ‘proud of,’ and one support to try. Protect the private collection step.",
    ttoc: "Keep this work private. Do not interpret responses, promise accommodations, or ask for diagnoses; collect questions for the classroom teacher.",
    displayIdea: "No individual display. With consent, tally strategy categories without names and create a class support menu after classes are formed.",
  },
  {
    id: "rotation-ideal-learning-space",
    title: "Ideal Learning Space",
    bookletTitle: "My Ideal Learning Space",
    page: 3,
    preview: "/images/first-week/ideal-learning-space.webp",
    question: "How could a learning space help different people focus, collaborate, reset, and belong?",
    learningIntention: "I can design a learning space and explain how features support different learners.",
    bestFor: "inclusive design, spatial reasoning, and classroom routines",
    product: "A labelled plan showing features, movement, collaboration, and a place to reset.",
    privacy: {
      level: "display-candidate",
      label: "DISPLAY-CANDIDATE IDEA · STUDENT OPT-IN",
      student: "The design may be shared after you review it. Personal reasons and learner information stay private.",
      teacher: "Display the design only after the student opts in. Remove personal annotations and do not present the design as a guaranteed classroom change.",
      display: "A copy or student-approved original may join a design gallery with names optional. Reconfirm before posting.",
    },
    materials: ["Discovery Booklet page 3 or blank paper", "Pencils", "Optional ruler and colour supplies", "Sticky notes for feedback"],
    prepare: ["Photograph or sketch the actual room from one neutral angle if appropriate.", "Choose two constraints: existing room footprint, safe movement path, realistic materials, or shared space.", "Post four needs: focus, collaborate, access, reset."],
    provocation: {
      display: "One room has perfect furniture but one narrow path. Another is plain but easy to move through. Which is more inclusive?",
      ask: "Who is helped by this design—and who might still be left out?",
      move: "Model one feature and its purpose: ‘A clear, wide route supports safe movement; it is not just empty space.’",
    },
    makeSteps: [
      "Sketch the room boundary and one clear movement path.",
      "Add places for focused work, collaboration, materials, and a reset or quiet option.",
      "Label at least four features with who they help and how.",
      "Check one constraint and revise a feature that excludes or blocks someone.",
    ],
    discuss: ["Can one space meet every need at the same time?", "Which choices change the room, and which change routines?", "How do we distinguish an access need from a decorative preference?"],
    teacherMoves: ["Ask ‘who benefits, under what conditions, and what trade-off appears?’", "Keep budget and physical constraints real without shutting down imagination.", "Separate feasible next steps from longer-term ideas that require school approval."],
    misconception: {
      idea: "An ideal space is expensive, silent, or visually perfect for everyone.",
      respond: "Redirect to multiple routes, adaptable routines, clear access, and trade-offs. Inclusive design is evidence-based, not a single aesthetic.",
    },
    success: ["The plan shows a clear path and at least four labelled purposeful features.", "Labels explain who a feature supports and how.", "The student identifies and revises one access problem or trade-off."],
    accessibility: ["Use a top-down plan, labelled list, movable sticky-note plan, oral description to a scribe, or block model with a photo.", "Provide a simple room outline and feature icons; precise scale drawing is optional.", "Do not ask students to disclose why they personally need a feature."],
    earlyFinisher: "Add a two-mode overlay showing how the same room changes for quiet work and collaborative work.",
    extension75: "Partners run an access walk-through for a fictional learner, then revise one route or routine and add a before/after note.",
    shortened: "Draw one movement path and four labelled zones. Add one sentence explaining the most inclusive design decision.",
    ttoc: "Invite practical imagination, not promises. Do not rearrange furniture during the rotation; collect feasible ideas for the receiving teacher.",
    displayIdea: "Create an opt-in ‘Spaces That Help Us Learn’ gallery organized by focus, collaboration, access, and reset ideas.",
  },
  {
    id: "rotation-build-better-grade-6",
    title: "Build a Better Grade 6",
    bookletTitle: "Build a Better Grade 6",
    page: 4,
    preview: "/images/first-week/build-better-grade-6.webp",
    question: "What small, realistic change could make Grade 6 more fair, welcoming, useful, or sustainable?",
    learningIntention: "I can propose a change, explain who it helps, and improve it after testing a trade-off.",
    bestFor: "student agency, democratic decision-making, and design thinking",
    product: "A labelled improvement proposal with a problem, change, people helped, trade-off, and first test.",
    privacy: {
      level: "display-candidate",
      label: "DISPLAY-CANDIDATE IDEA · STUDENT OPT-IN",
      student: "Your idea may be shared after you review it. Do not name or blame a real person or reveal a private incident.",
      teacher: "Screen for identifiable complaints, confidential circumstances, and promises the school cannot make. Feedback addresses the proposal, not the student.",
      display: "A student-approved proposal or anonymous copy may enter the community idea board. Display does not mean automatic adoption.",
    },
    materials: ["Discovery Booklet page 4 or blank paper", "Pencils", "Optional sticky notes", "Opaque collection folder"],
    prepare: ["Post four lenses: belonging, learning, fairness, sustainability.", "Choose a harmless teacher model such as a better material-return routine.", "Prepare a ‘possible now / investigate / needs approval’ sorting space."],
    provocation: {
      display: "A popular idea helps many students but makes access harder for two. Is it still a better idea?",
      ask: "What should count as evidence that a change is actually better?",
      move: "Model moving from complaint to design: ‘The problem is… The small change is… We could test it by…’",
    },
    makeSteps: [
      "Name one school problem without naming or blaming a person.",
      "Draw and label a small, realistic change.",
      "Explain who it could help, what could go wrong, and who should be consulted.",
      "Add one safe, measurable first test or question—not a promise to implement it.",
    ],
    discuss: ["Who has decision-making power for this idea?", "Whose perspective is missing?", "How could we test the idea fairly and revise it?"],
    teacherMoves: ["Separate voice from authority: students can influence decisions without pretending every decision is theirs alone.", "Ask for affected people, evidence, cost, access, and environmental impact.", "Move sensitive concerns to a private follow-up and follow school procedures."],
    misconception: {
      idea: "The fairest idea is whatever most people vote for, or every proposal should be implemented.",
      respond: "Explain that democratic decisions also consider rights, access, evidence, affected voices, feasibility, and accountable authority.",
    },
    success: ["The proposal describes a real need and a specific change.", "It names people helped, one trade-off or risk, and someone to consult.", "It includes a safe first test, question, or evidence source."],
    accessibility: ["Write, draw, dictate, use a problem/idea/who/why template, or build a quick paper model.", "Offer fictional school scenarios for students who do not want to identify a real concern.", "Allow private submission when public critique would reduce safety or participation."],
    earlyFinisher: "Add a second perspective: who might disagree, what could they value, and how might the proposal improve?",
    extension75: "Run a small design council: peers give one access question and one feasibility question; the creator revises before choosing display status.",
    shortened: "Complete problem, proposed change, who it helps, and one first test. Use a fictional scenario if needed.",
    ttoc: "Do not promise implementation or invite complaints about named people. Record sensitive concerns privately for the classroom teacher or office route.",
    displayIdea: "Build an opt-in ‘Ideas Worth Testing’ board with columns: possible now, investigate, and needs the right decision-maker.",
  },
  {
    id: "rotation-grade-6-quest-map",
    title: "Grade 6 Quest Map",
    bookletTitle: "My Grade 6 Quest Map",
    page: 5,
    preview: "/images/first-week/grade-6-quest-map.webp",
    question: "What meaningful goal could you begin, and what strengths, people, tools, and next step could help?",
    learningIntention: "I can map a meaningful goal into a realistic next step and a help route.",
    bestFor: "goal setting, hope, help-seeking, and transition",
    product: "A quest map linking a hope, goal, likely challenge, strengths, help sources, and first step.",
    privacy: {
      level: "selected-excerpt",
      label: "PRIVATE ORIGINAL · OPTIONAL EXCERPT",
      student: "Your full goal map is private. You may choose one safe hope, strength, or next step to copy for display later.",
      teacher: "Do not grade the ambition, require a personal goal, or treat the map as a contract. Follow up privately on safety disclosures.",
      display: "Only a separately copied, student-selected hope or strategy may enter a class path display after reconfirmation.",
    },
    materials: ["Discovery Booklet page 5 or blank paper", "Pencils", "Optional goal and strength word bank", "Opaque collection folder"],
    prepare: ["Post sample school-safe goals across learning, making, relationships, contribution, movement, and organization.", "Model one small first step and one realistic help source.", "Avoid competitive language about the ‘best’ or biggest goal."],
    provocation: {
      display: "Two maps: one says ‘be perfect’; one says ‘ask for feedback on my first paragraph by Friday.’ Which gives the learner a usable path?",
      ask: "What makes a next step small enough to start but meaningful enough to matter?",
      move: "Model a detour: a challenge does not end the quest; it changes the next move or help source.",
    },
    makeSteps: [
      "Choose a school-safe hope and turn one part into a goal you can influence.",
      "Add one likely challenge and at least two strengths, tools, or strategies.",
      "Name one person or role that could help; confidential details are not needed.",
      "Write a first step small enough to begin in the next school week.",
    ],
    discuss: ["Which parts of a goal can we control or influence?", "How can asking for help show agency?", "When should a goal change instead of the person just trying harder?"],
    teacherMoves: ["Shift outcome-only goals toward an action the student can influence.", "Normalize revision, rest, access supports, and changing direction with new evidence.", "Do not compare goals publicly or turn hopes into promises."],
    misconception: {
      idea: "A good goal must be large, private struggle means weakness, or success depends only on effort.",
      respond: "Emphasize realistic control, systems and supports, multiple paths, help-seeking, feedback, and revision.",
    },
    success: ["The map links a meaningful goal to one realistic first step.", "It includes a likely challenge plus at least two strengths, tools, strategies, or help sources.", "The student chooses what stays private and can explain the next move."],
    accessibility: ["Use words, symbols, a path drawing, movable cards, adult scribing, or an audio rehearsal followed by brief labels.", "Offer a fictional character route or a shared class goal for students not ready to name an individual goal.", "Accept goals about contribution, belonging, healthful routines, making, or curiosity—not academics only."],
    earlyFinisher: "Add a checkpoint: when will you look again, what evidence will you notice, and what might make you change the route?",
    extension75: "Students may conference with a partner using ‘notice, wonder, possible next step,’ then revise without sharing the private goal aloud.",
    shortened: "Complete hope/goal, one challenge, two help sources, and one next step. The path artwork is optional.",
    ttoc: "Keep goals private and low stakes. Do not rank them, require public sharing, or interpret a missing section as lack of motivation.",
    displayIdea: "Create an opt-in ‘Many Paths Through Grade 6’ trail from copied hopes, strengths, or next-step verbs—never whole named maps.",
  },
] as const;

export function rotationTimeline(session: RotationSession, duration: RotationDuration): RotationTimelineStep[] {
  const createAction = duration === 75
    ? `${session.makeSteps.join(" ")} Then: ${session.extension75}`
    : session.makeSteps.join(" ");

  const actions = [
    `Name the learning intention and read the privacy choice aloud: ${session.privacy.student}`,
    `${session.provocation.display} Ask: ${session.provocation.ask}`,
    `${session.provocation.move} Show several valid response modes before students begin.`,
    createAction,
    duration === 75
      ? `Use a quiet gallery, partner conference, or teacher check. Ask: ${session.discuss[0]} ${session.discuss[1]}`
      : `Use a partner or teacher check. Ask one question: ${session.discuss[0]}`,
    `Students use the success indicators, revise one part, and mark the page PRIVATE or ask about a separate display copy.`,
    "Students add name, organizer title, room/date, Complete or Continue, and privacy status; submit face-down to the labelled opaque folder.",
  ];

  return rotationTimings[duration].map((step, index) => ({ ...step, action: actions[index] }));
}

export function findRotationSession(id: string) {
  return rotationSessions.find((session) => session.id === id) ?? rotationSessions[0];
}
