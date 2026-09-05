export type RotationDuration = 45 | 60 | 75;

export type RotationPrivacyLevel = "private" | "selected-excerpt" | "display-candidate";

/** Authored for students; staff preparation must never become projector copy. */
export type RotationStudentDirections = {
  learningGoal: string;
  why: string;
  firstAction: string;
  example: string;
  steps: readonly string[];
  finish: string;
  privacy: string;
  help: string;
};

export type RotationSession = {
  id: string;
  title: string;
  bookletTitle: string;
  page: number;
  preview: string;
  question: string;
  learningIntention: string;
  student: RotationStudentDirections;
  bestFor: string;
  product: string;
  pageRegions: readonly string[];
  decorationChoices: readonly string[];
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

export const WHOLE_ORGANIZER_PROMISE = "Complete the whole organizer—not only one favourite section.";
export const WHOLE_ORGANIZER_PRIVACY = "Visit every labelled section. A brief response, fictional alternative, blank/skip, or privacy symbol completes a region; no explanation is required.";
export const WHOLE_ORGANIZER_DECORATION = "Decorate across the page with accessible visual meaning-making—colour, drawing, symbols, borders, spacing, or repeating patterns. One simple repeated cue is enough; artistry is never graded.";
export const WHOLE_ORGANIZER_ACCOMMODATION = "When an accommodation is needed, reduce the number or length of substantive responses to the smallest useful evidence of the learning intention. Keep the whole organizer available, let blank/skip complete any other region without explanation, and do not create catch-up work.";

export const ROTATION_STUDENT_CHOICES = "Look at every part of the page. You may leave any part blank or write SKIP. You never have to explain why. You can use made-up examples instead of personal ones.";
export const ROTATION_STUDENT_DECORATION = "Make the page yours with drawings, symbols, borders, or patterns. One simple pattern across the page is enough. Colour is optional. Your art skills are not graded.";
export const ROTATION_STUDENT_HAND_IN = "Leave the front name line blank. Write your name, date and group on the back. Add PAUSED if you want a check-in. Put your page face-down in your group’s folder.";

export const rotationTimings: Record<RotationDuration, readonly Omit<RotationTimelineStep, "action">[]> = {
  45: [
    { timing: "0–4", label: "Welcome + privacy" },
    { timing: "4–8", label: "Provoke" },
    { timing: "8–12", label: "Model the whole page" },
    { timing: "12–22", label: "First pass · every section" },
    { timing: "22–31", label: "Deepen + decorate" },
    { timing: "31–37", label: "Whole-page check" },
    { timing: "37–43", label: "Improve + consent" },
    { timing: "43–45", label: "Label + collect" },
  ],
  60: [
    { timing: "0–5", label: "Welcome + privacy" },
    { timing: "5–11", label: "Provoke" },
    { timing: "11–16", label: "Model the whole page" },
    { timing: "16–29", label: "First pass · every section" },
    { timing: "29–42", label: "Deepen + decorate" },
    { timing: "42–50", label: "Whole-page check" },
    { timing: "50–56", label: "Revise + decide" },
    { timing: "56–60", label: "Label + collect" },
  ],
  75: [
    { timing: "0–6", label: "Welcome + privacy" },
    { timing: "6–13", label: "Provoke" },
    { timing: "13–19", label: "Model the whole page" },
    { timing: "19–35", label: "First pass · every section" },
    { timing: "35–52", label: "Deepen + decorate" },
    { timing: "52–62", label: "Whole-page check" },
    { timing: "62–70", label: "Revise + decide" },
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
    student: {
      learningGoal: "I can use words and pictures to show some things that make me who I am.",
      why: "We can get to know each other while choosing what to keep private.",
      firstAction: "Look at the six circles. Choose one to start with and add a word or picture.",
      example: "If you enjoy soccer, you could draw a ball in Interests. Your ideas can be different.",
      steps: [
        "Look at each circle. Add words or pictures, or choose to leave it blank.",
        "Add a few details to the ideas you choose to use.",
        "Draw lines between three ideas that connect. Include a strength you would like to grow.",
        "Add stars, lines, or patterns across the page. Check that your page includes only ideas you want your teacher to read.",
      ],
      finish: "I looked at all six circles, connected my ideas, and added a design across the page. Parts I chose to skip count as finished.",
      privacy: "Your original page stays private. Later, your teacher may ask you again before copying a safe part you choose onto a separate page for display. You can say no.",
      help: "Ask for an example or someone to help you write or draw. You and your teacher can agree on fewer ideas. Skipped parts and agreed shorter work do not become catch-up work.",
    },
    bestFor: "belonging, low-risk connection, and student voice",
    product: "A complete, decorated constellation with every identity circle visited through a safe response, fictional alternative, blank/skip, or privacy marker.",
    pageRegions: ["People", "Places", "Interests", "Languages & cultures", "Strengths", "Experiences"],
    decorationChoices: [
      "Colour-code ideas that connect across two or more circles.",
      "Turn connection lines into a star trail, orbit, or repeating pattern.",
      "Add safe symbols or small drawings around the page; one repeated cue is enough and colour is optional.",
    ],
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
      "Make a quick first pass through all six circles. Use one safe word, picture, symbol, fictional alternative, blank/SKIP, or PRIVATE marker; no reason is needed for a privacy choice.",
      "Return only to the circles you chose to develop and add enough detail that you could explain one safe idea without sharing more than you want.",
      "Connect at least three ideas across the page and include one strength you want to grow.",
      "Decorate the whole constellation with colour, drawing, stars, borders, or repeating patterns; then run a privacy check.",
    ],
    discuss: ["Which part was easiest to represent without a sentence?", "How can classmates show curiosity without asking for private details?", "What helps a class make room for many identities without putting anyone on display?"],
    teacherMoves: ["Notice representation choices, not the amount disclosed.", "Use invitations such as ‘You may…’ and ‘A fictional example is fine.’", "Redirect personal follow-up questions to patterns: ‘What do we learn about belonging in general?’"],
    misconception: {
      idea: "A fuller page means a student is more engaged or more knowable.",
      respond: "Name privacy as agency. Assess thoughtful representation and choice, never depth of personal disclosure.",
    },
    success: ["All six circles have been visited; a safe response, fictional alternative, blank/skip, or privacy marker completes a circle without explanation.", "At least three safe ideas are connected, unless an accommodation sets a smaller substantive-output goal.", "Accessible visual cues bring the page together; one repeated line, shape, spacing choice, or pattern is enough, and artistry is not assessed.", "The student made and communicated a private-versus-display choice."],
    accessibility: ["Draw, write, dictate, collage from teacher-provided neutral shapes, use symbols, or leave a region blank/marked SKIP without explanation.", "Offer a fictional-character route or safe categories such as favourite activity, place, sound, object, and strength.", "Colour is optional: line styles, textures, stickers, stamps, spacing, or an adult scribe can provide an equivalent whole-page route.", "Reduce the number of substantive identity responses when accommodation is needed; the remaining regions still count as complete through blank/skip.", "Do not require eye contact, public sharing, fine-motor detail, or English-only responses."],
    earlyFinisher: "Refine the whole page only if useful: add a legend for two symbols, make connections easier to follow, or extend one repeated cue without revealing anything new.",
    extension75: "After the whole page is complete, pairs compare one voluntarily shared design choice, deepen one safe connection, and create a class list of respectful ways to ask about identity without demanding disclosure.",
    shortened: "Quick-pass the whole page: use one safe word, picture, symbol, fictional alternative, blank/SKIP, or PRIVATE marker in each circle, connect two safe ideas when available, and add one repeated visual cue across the page. Protect the final four minutes for the privacy check, label, and face-down collection.",
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
    student: {
      learningGoal: "I can name something that helps me learn and choose one idea to try.",
      why: "This helps your teacher understand what supports you at school.",
      firstAction: "Find ‘I learn best when’. Write or draw one thing that helps you, or skip this box.",
      example: "‘Seeing one example helps me start.’ What helps you might change with the activity.",
      steps: [
        "Read each of the six boxes. Write or draw an idea, or choose to skip it.",
        "Add details about what helps you start, focus, feel comfortable, or get unstuck.",
        "Circle one idea you would like to try. A made-up learner's idea is fine too.",
        "Use symbols or patterns across the page. Keep your words easy to read.",
      ],
      finish: "I looked at all six boxes, chose one idea to try, and added a design across the page. Parts I chose to skip count as finished.",
      privacy: "This page stays with your teacher. It will not go on display. You do not need to explain private things about yourself or your family.",
      help: "Ask for a list of ideas or someone to write your words. You and your teacher can agree on fewer answers. Skipped parts and agreed shorter work do not become catch-up work.",
    },
    bestFor: "learner agency, routines, and teacher planning",
    product: "A complete, decorated learner user manual with every prompt box visited through a safe response, fictional alternative, blank/skip, or privacy marker.",
    pageRegions: ["I learn best when", "I focus better when", "I feel comfortable when", "When I get stuck, it helps if", "Something I’m proud of", "One thing teachers should know"],
    decorationChoices: [
      "Give each strategy a small icon, sketch, or visual cue.",
      "Use colour, shading, or different line patterns to group related supports.",
      "Add a border, spacing cue, or repeating symbol that makes the manual feel like yours; one simple cue is enough and responses stay readable.",
    ],
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
      "Make a quick first pass through all six boxes. Use one useful phrase, icon, sketch, fictional alternative, blank/SKIP, or PRIVATE marker; no explanation is needed for a privacy choice.",
      "Return only to the boxes you chose to develop and name a condition or action—not a fixed learning-style label.",
      "Circle one support you are willing to try and add a tiny visual cue beside each strategy.",
      "Decorate the whole manual with colour, shading, symbols, borders, or patterns while keeping the words easy to read.",
    ],
    discuss: ["How is a useful strategy different from an excuse or a fixed label?", "Why might the best support change with the task?", "How can a teacher offer choices without lowering the learning goal?"],
    teacherMoves: ["Reframe absolutes: ‘never’ becomes ‘often’ or ‘in this kind of task.’", "Ask for observable conditions and actions rather than inferred learning styles.", "Privately follow school procedures for safety disclosures; do not process them in the group."],
    misconception: {
      idea: "Every learner has one permanent learning style, so teaching should always match it.",
      respond: "Validate preferences while emphasizing flexible strategies, task demands, access needs, and evidence from trying different routes.",
    },
    success: ["All six boxes have been visited; a safe response, fictional alternative, blank/skip, or privacy marker completes a box without explanation.", "The substantive responses name useful school conditions or actions, including recovery, strength, or support evidence appropriate to the agreed route.", "One strategy is framed as something to try and review, not a permanent label.", "Accessible visual cues make the page easier to follow; one repeated cue is enough, and artistry is not assessed."],
    accessibility: ["Offer sentence stems, a strategy word bank, adult scribing, speech-to-text on an approved shared device, or labelled icons.", "Students may leave any prompt blank, mark SKIP, write ‘Please ask me privately later,’ or use a privacy symbol without explaining why.", "Colour is optional: use hatching, line styles, stickers, stamps, spacing, or high-contrast labels.", "Reduce the number of substantive strategy responses when accommodation is needed; blank/skip completes the other boxes without catch-up work.", "Allow a quiet finish without partner sharing; never require reading the page aloud."],
    earlyFinisher: "Improve the whole manual only if useful: turn one preference into a testable plan or strengthen one visual grouping without filling privacy-safe blanks.",
    extension75: "After all six boxes and the page design are complete, students privately rank three strategies to test, refine one response with evidence, and help create an anonymous class menu of flexible learning supports.",
    shortened: "Quick-pass all six boxes with one phrase, icon, sketch, fictional alternative, blank/SKIP, or privacy marker. Circle one safe strategy to try when available, then add one simple visual cue across the page before private collection.",
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
    student: {
      learningGoal: "I can design a room and explain how it helps different people learn.",
      why: "A helpful classroom gives people space to move, work together, focus, and take a quiet break.",
      firstAction: "Sketch the shape of your room. Draw a clear path people can use to move around.",
      example: "A wide path lets people reach the shelves without squeezing past chairs.",
      steps: [
        "Sketch places to work quietly, work together, store supplies, and take a break.",
        "Label four things in your room. Say who each one helps.",
        "Read the three boxes below your drawing. Add ideas or skip a box. Check your teacher's room limits.",
        "Find one thing that could make the room hard to use and improve it. Add arrows, symbols, or patterns.",
      ],
      finish: "My page shows a room plan and why its features help people. I looked at all three boxes. Parts I chose to skip count as finished.",
      privacy: "Your original page stays private. Later, your teacher may ask you again before copying a safe part you choose onto a separate page for display. You can say no.",
      help: "Ask for a room outline, picture labels, or someone to draw your ideas. You and your teacher can agree on fewer labels. Skipped parts and agreed shorter work do not become catch-up work.",
    },
    bestFor: "inclusive design, spatial reasoning, and classroom routines",
    product: "A complete, decorated learning-space plan with the room design and all three explanation boxes visited through a response, blank/skip, or accommodation route.",
    pageRegions: ["Room plan and clear movement path", "Must-have features", "How people work together", "A place to reset"],
    decorationChoices: [
      "Use a colour or pattern key for focus, collaboration, access, and reset areas.",
      "Add people, plants, materials, signs, textures, or nature-inspired details that have a learning purpose.",
      "Use arrows, borders, spacing, shading, or line styles to make routes and zones easy to follow; one simple key is enough.",
    ],
    privacy: {
      level: "display-candidate",
      label: "DISPLAY-CANDIDATE IDEA · STUDENT OPT-IN",
      student: "Your original stays private. After you review it, you may choose whether a separate copy of the design can be shared; personal reasons stay private.",
      teacher: "Transfer the original privately. Display only a separate copy after the student opts in again; remove personal annotations and do not present the design as a guaranteed classroom change.",
      display: "Only a separate student-approved copy may join a design gallery, with names optional. Reconfirm before posting.",
    },
    materials: ["Discovery Booklet page 3 or blank paper", "Pencils", "Optional ruler and colour supplies", "Sticky notes for feedback"],
    prepare: ["Photograph or sketch the actual room from one neutral angle if appropriate.", "Choose two constraints: existing room footprint, safe movement path, realistic materials, or shared space.", "Post four needs: focus, collaborate, access, reset."],
    provocation: {
      display: "One room has perfect furniture but one narrow path. Another is plain but easy to move through. Which is more inclusive?",
      ask: "Who is helped by this design—and who might still be left out?",
      move: "Model one feature and its purpose: ‘A clear, wide route supports safe movement; it is not just empty space.’",
    },
    makeSteps: [
      "First-pass the whole page: sketch the room and visit each of the three boxes with a brief response, blank/SKIP, or teacher-agreed accommodation choice; no explanation is required for a skip.",
      "Develop the room with a clear path plus places for focus, collaboration, materials, and reset; label who at least four features help.",
      "Complete each lower box with a feature, a way people work together, and a reset idea; check one real constraint and revise an exclusion.",
      "Decorate the whole design with a colour or pattern key, arrows, plants, signs, textures, or purposeful drawings that clarify the plan.",
    ],
    discuss: ["Can one space meet every need at the same time?", "Which choices change the room, and which change routines?", "How do we distinguish an access need from a decorative preference?"],
    teacherMoves: ["Ask ‘who benefits, under what conditions, and what trade-off appears?’", "Keep budget and physical constraints real without shutting down imagination.", "Separate feasible next steps from longer-term ideas that require school approval."],
    misconception: {
      idea: "An ideal space is expensive, silent, or visually perfect for everyone.",
      respond: "Redirect to multiple routes, adaptable routines, clear access, and trade-offs. Inclusive design is evidence-based, not a single aesthetic.",
    },
    success: ["The room plan and all three lower boxes have been visited; blank/skip completes a region without explanation.", "The substantive route shows a clear path and purposeful features appropriate to the agreed output goal, including collaboration or reset evidence.", "The student identifies or revises one access problem or trade-off when that evidence is part of the agreed route.", "Accessible visual cues make the plan easier to navigate; one key, arrow system, spacing choice, or repeated pattern is enough, and artistry is not assessed."],
    accessibility: ["Use a top-down plan, labelled list in the same four regions, movable sticky-note plan, oral description to a scribe, or block model with a photo placed on the page.", "Provide a simple room outline and feature icons; precise scale drawing is optional.", "Colour is optional: arrows, textures, line styles, tactile markers, spacing, or high-contrast labels can distinguish zones.", "Reduce labels, features, or substantive explanation boxes when accommodation is needed; blank/skip regions count as complete without catch-up work.", "Do not ask students to disclose why they personally need a feature."],
    earlyFinisher: "Refine the whole design only if useful: add a two-mode overlay, strengthen the key and labels, or improve how one visual cue guides a viewer through the room.",
    extension75: "After the entire organizer is complete, partners run an access walk-through for a fictional learner, revise one route or routine, and add a before/after note without erasing the original thinking.",
    shortened: "Quick-pass the entire page: draw one movement path and four labelled zones in the room, then visit each lower box with one phrase, icon, or blank/SKIP. Finish with one arrow key, spacing cue, or repeated pattern that ties the plan together.",
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
    student: {
      learningGoal: "I can suggest a small change to Grade 6 and explain who it would help.",
      why: "We can improve school by listening to people and checking how an idea might affect them.",
      firstAction: "Think of one small change that could help at school. Write it on the ‘My idea’ line.",
      example: "Picture labels on supply bins could help people find and return what they need.",
      steps: [
        "Draw your idea and add labels. Describe the problem without naming or blaming anyone.",
        "Read each lower box. Add what might happen, who it helps, and why it is worth trying. Skipping is allowed.",
        "Name one possible problem, or someone we should ask before trying the idea.",
        "Plan one small, safe test with your teacher. Add arrows, drawings, or patterns to explain your idea.",
      ],
      finish: "I looked at the idea line, drawing space, and three boxes. My page explains a change and who it helps. Parts I chose to skip count as finished.",
      privacy: "Your original page stays private. Later, your teacher may ask you again before copying a safe part you choose onto a separate page for display. You can say no. A display does not promise the change will happen.",
      help: "You can invent a school problem instead of sharing a real one. Ask for help with words or drawing. You and your teacher can agree on less writing, with no catch-up work.",
    },
    bestFor: "student agency, democratic decision-making, and design thinking",
    product: "A complete, decorated improvement proposal with the idea line, central design, and all three reasoning boxes visited through a response, blank/skip, or accommodation route.",
    pageRegions: ["My idea", "Draw and label your idea", "What would happen?", "Who would it help?", "Why should we try it?"],
    decorationChoices: [
      "Use arrows, captions, colour, or patterns to show how the change would work.",
      "Add people, nature, materials, or before-and-after details that clarify who benefits.",
      "Create a border, spacing system, or visual path that connects the idea to the reasoning boxes; one simple cue is enough.",
    ],
    privacy: {
      level: "display-candidate",
      label: "DISPLAY-CANDIDATE IDEA · STUDENT OPT-IN",
      student: "Your original stays private. After you review it, you may approve a separate copy for sharing. Do not name or blame a real person or reveal a private incident.",
      teacher: "Transfer the original privately. Screen any display copy for identifiable complaints, confidential circumstances, and promises the school cannot make. Feedback addresses the proposal, not the student.",
      display: "Only a separate copy of a safe part the student chooses and approves again may enter the community idea board. Names are optional. Display does not mean the idea will be adopted.",
    },
    materials: ["Discovery Booklet page 4 or blank paper", "Pencils", "Optional sticky notes", "Opaque collection folder"],
    prepare: ["Post four lenses: belonging, learning, fairness, sustainability.", "Choose a harmless teacher model such as a better material-return routine.", "Prepare a ‘possible now / investigate / needs approval’ sorting space."],
    provocation: {
      display: "A popular idea helps many students but makes access harder for two. Is it still a better idea?",
      ask: "What should count as evidence that a change is actually better?",
      move: "Model moving from complaint to design: ‘The problem is… The small change is… We could test it by…’",
    },
    makeSteps: [
      "First-pass the whole page: name a school-safe idea, sketch it, and visit each lower box with a brief response, blank/SKIP, or teacher-agreed accommodation choice; no explanation is required for a skip.",
      "Develop and label the central design so a viewer can see the problem and the small, realistic change without naming or blaming anyone.",
      "Complete all three reasoning boxes: what could happen, who could be helped or affected, and why a safe first test is worthwhile; add a risk or missing voice.",
      "Decorate the whole proposal with arrows, captions, colour, drawings, borders, or patterns that help the reader follow the idea.",
    ],
    discuss: ["Who has decision-making power for this idea?", "Whose perspective is missing?", "How could we test the idea fairly and revise it?"],
    teacherMoves: ["Separate voice from authority: students can influence decisions without pretending every decision is theirs alone.", "Ask for affected people, evidence, cost, access, and environmental impact.", "Move sensitive concerns to a private follow-up and follow school procedures."],
    misconception: {
      idea: "The fairest idea is whatever most people vote for, or every proposal should be implemented.",
      respond: "Explain that democratic decisions also consider rights, access, evidence, affected voices, feasibility, and accountable authority.",
    },
    success: ["The idea line, central design, and all three reasoning boxes have been visited; blank/skip completes a region without explanation.", "The substantive route describes a need and specific change, including affected people appropriate to the agreed output goal.", "It includes a trade-off, risk, missing voice, consultation, or safe first test when that evidence is part of the agreed route.", "Accessible visual details help explain the proposal; one arrow, spacing, border, or symbol system is enough, and artistry is not assessed."],
    accessibility: ["Write, draw, dictate, use concise labels, or photograph a quick paper model and attach it to the page.", "Offer fictional school scenarios for students who do not want to identify a real concern.", "Colour is optional: arrows, numbered labels, textures, stamps, spacing, or patterned borders can carry the same meaning.", "Reduce the number of substantive reasoning responses when accommodation is needed; blank/skip completes the other regions without catch-up work.", "Allow private submission when public critique would reduce safety or participation."],
    earlyFinisher: "Refine the full proposal only if useful: add a second perspective, strengthen one label or risk, or improve one visual trail without filling privacy-safe blanks.",
    extension75: "After the whole organizer is finished, run a small design council: peers give one access question and one feasibility question; the creator visibly revises before choosing display status.",
    shortened: "Quick-pass all five regions: name the idea, draw and label the change, and visit each lower box with one phrase, icon, or blank/SKIP. Include one safe first test when available, then connect the page with one arrow, spacing, border, or repeating cue.",
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
    student: {
      learningGoal: "I can choose a goal and plan one small step toward it.",
      why: "A small first step and someone to help can make a goal easier to start.",
      firstAction: "Find the My Hopes scroll. Write or draw something you would like to try or improve. Draw an arrow toward the goal flag.",
      example: "Goal: learn a new game. First step: ask someone to show me how to start.",
      steps: [
        "Use My Hopes for your goal. The flag is a signpost, not a writing space. Look at each scroll; add ideas or leave a part blank.",
        "Add something that could be hard and two strengths, tools, or ideas that could help.",
        "Name someone who could help. Choose one small step you could start next school week.",
        "Connect the map with a path, patterns, or pictures. Show how you might get around a challenge.",
      ],
      finish: "I looked at all five scrolls. My map connects a goal to help and a small first step. Parts I chose to skip count as finished.",
      privacy: "Your original page stays private. Later, your teacher may ask you again before copying a safe part you choose onto a separate page for display. You can say no.",
      help: "You can make a goal for an invented character. Ask for picture ideas or help writing. You and your teacher can agree on fewer answers. Skipped parts and agreed shorter work do not become catch-up work.",
    },
    bestFor: "goal setting, hope, help-seeking, and transition",
    product: "A complete, decorated quest map with every planning region visited through a safe response, fictional alternative, blank/skip, or privacy marker.",
    pageRegions: ["My hopes (write the goal here)", "Possible challenges", "Tools & strengths", "People who can help", "My next step"],
    decorationChoices: [
      "Colour, shade, or pattern the route so the eye can follow it from start to goal.",
      "Add trail symbols, creatures, plants, weather, landmarks, or signs that represent supports and detours.",
      "Use a legend, spacing cue, repeated icon, border, or line style to connect the planning regions; one simple cue is enough.",
    ],
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
      "First-pass the whole map: use one safe phrase, picture, symbol, fictional alternative, blank/SKIP, or PRIVATE marker in each of the five scrolls; the goal belongs in My Hopes, with an arrow toward the labelled flag; no reason is needed for a privacy choice.",
      "Develop one hope into a goal you can influence; add a likely challenge plus at least two strengths, tools, or strategies.",
      "Name one person or role that could help and a first step small enough to begin next school week; confidential details are not needed.",
      "Decorate the whole route with colour, shading, symbols, creatures, plants, landmarks, borders, or patterns that show supports and detours.",
    ],
    discuss: ["Which parts of a goal can we control or influence?", "How can asking for help show agency?", "When should a goal change instead of the person just trying harder?"],
    teacherMoves: ["Shift outcome-only goals toward an action the student can influence.", "Normalize revision, rest, access supports, and changing direction with new evidence.", "Do not compare goals publicly or turn hopes into promises."],
    misconception: {
      idea: "A good goal must be large, private struggle means weakness, or success depends only on effort.",
      respond: "Emphasize realistic control, systems and supports, multiple paths, help-seeking, feedback, and revision.",
    },
    success: ["All five scrolls have been visited; a safe response, fictional alternative, blank/skip, or privacy marker completes a region without explanation.", "The substantive route links a safe goal or fictional goal to a realistic first step appropriate to the agreed output goal.", "It includes challenge, strength, strategy, or help-source evidence appropriate to the agreed route.", "Accessible visual cues connect the page; one repeated line, spacing choice, symbol, or pattern is enough, and artistry is not assessed."],
    accessibility: ["Use words, symbols, movable cards, adult scribing, an audio rehearsal followed by brief labels, or blank/SKIP without explanation.", "Offer a fictional-character route or a shared class goal for students not ready to name an individual goal.", "Colour is optional: textures, line styles, stamps, stickers, spacing, or high-contrast symbols can decorate and connect the route.", "Reduce the number of substantive planning responses when accommodation is needed; blank/skip completes the other regions without catch-up work.", "Accept goals about contribution, belonging, healthful routines, making, or curiosity—not academics only."],
    earlyFinisher: "Refine the entire map only if useful: add a checkpoint, clarify a help source, or strengthen one visual route cue without filling privacy-safe blanks.",
    extension75: "After the entire map is complete, students may conference with a partner using ‘notice, wonder, possible next step,’ add one checkpoint, and revise without sharing the private goal aloud.",
    shortened: "Quick-pass all five scrolls with one safe phrase, picture, symbol, fictional alternative, blank/SKIP, or PRIVATE marker. Make one safe next step specific when available, then trace or pattern the route with one repeated visual cue.",
    ttoc: "Keep goals private and low stakes. Do not rank them, require public sharing, or interpret a missing section as lack of motivation.",
    displayIdea: "Create an opt-in ‘Many Paths Through Grade 6’ trail from copied hopes, strengths, or next-step verbs—never whole named maps.",
  },
] as const;

export function rotationTimeline(session: RotationSession, duration: RotationDuration): RotationTimelineStep[] {
  const actions = [
    `Name the learning intention and the whole-page promise: ${WHOLE_ORGANIZER_PROMISE} Read the privacy choice aloud: ${session.privacy.student}`,
    `${session.provocation.display} Ask: ${session.provocation.ask}`,
    `${session.provocation.move} Model a concise choice in every page region—not a polished final product. Show writing, drawing, symbols, a fictional alternative, blank/SKIP, and a privacy marker before students begin; never ask why a student skips.`,
    `Visit every labelled region once: ${session.pageRegions.join(" · ")}. ${WHOLE_ORGANIZER_PRIVACY}`,
    `Deepen the first pass with the organizer-specific moves: ${session.makeSteps.slice(1).join(" ")} ${WHOLE_ORGANIZER_DECORATION}`,
    duration === 75
      ? `Use the success indicators plus a quiet gallery, partner conference, or teacher check. Ask: ${session.discuss[0]} ${session.discuss[1]} Then use the 75-minute deepening only after the whole page is complete: ${session.extension75}`
      : `Use the success indicators for a whole-page check. Ask: ${session.discuss[0]} Confirm that every region has a response choice—including blank/skip—and that one accessible visual cue travels across the page.`,
    `Students improve one safe response and one accessible visual cue when useful. Do not fill or question blank/skip regions. The named original always stays private. For pages that allow sharing, the receiving teacher asks again before copying only a safe part the student chooses onto a separate display page.`,
    `${ROTATION_STUDENT_HAND_IN} Teacher records organizer and status on the folder list; do not ask children to copy long labels.`,
  ];

  return rotationTimings[duration].map((step, index) => ({ ...step, action: actions[index] }));
}

export function rotationTtocRunSteps(session: RotationSession, duration: RotationDuration): string[] {
  const actions = [
    "State the learning intention, whole-page promise, and privacy boundary. Blank/SKIP, a fictional alternative, or a privacy marker completes a region without explanation; accommodation may reduce substantive output.",
    `Display: ${session.provocation.display} Ask: ${session.provocation.ask}`,
    "Model one concise response choice in every page region using words, drawings, or symbols. Include a fictional alternative, blank/SKIP, and privacy marker; do not model a polished final.",
    `Students visit all ${session.pageRegions.length} labelled regions once with a safe response, fictional alternative, blank/SKIP, or privacy marker. Use reduced substantive output only when accommodation is needed; never question a skip.`,
    `Students deepen safe responses with the ${session.bookletTitle} directions, then carry one accessible visual cue across the whole page; artistry is not assessed.`,
    duration === 75
      ? "Use the success indicators for a whole-page check, then offer a quiet gallery, partner conference, or teacher check. Use the 75-minute extension only after every region is complete."
      : "Use the success indicators for a whole-page check. Confirm that every region has a response choice and one accessible visual cue travels across the page.",
    "Improve a safe idea and visual cue if useful. Originals always stay private. On pages that allow sharing, ask again before copying a safe part the student chooses to a separate display page. Never fill or question skips.",
    `${ROTATION_STUDENT_HAND_IN} Teacher records organizer and status.`,
  ];

  return rotationTimings[duration].map((step, index) => `${step.timing} min · ${step.label}: ${actions[index]}`);
}

export function findRotationSession(id: string) {
  return rotationSessions.find((session) => session.id === id) ?? rotationSessions[0];
}
