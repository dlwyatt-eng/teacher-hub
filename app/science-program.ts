export type JourneyType = "Launch" | "Field lab" | "Case file" | "Design studio" | "Inquiry studio" | "Readiness check" | "Digital investigation";

export type ExperienceScene = {
  label: string;
  title: string;
  prompt: string;
  teacherCue: string;
  time?: string;
  learningMode?: string;
  studentTask?: string;
};

export type LessonResource = {
  scene: number;
  type: "Video" | "Article" | "Website" | "Interactive" | "PDF" | "Teacher-selected source";
  label: string;
  url?: string;
  source: string;
  task: string;
  gradeFit?: "Core Grade 6" | "Supported stretch" | "Teacher preview";
  support?: string;
  studentBoundary?: string;
};

export type ScienceLesson = {
  id: string;
  title: string;
  question: string;
  duration: string;
  kind: "Explore" | "Investigate" | "Explain" | "Apply" | "Design" | "Assess";
  journeyType: JourneyType;
  hook: string;
  learning: string;
  success: string[];
  vocabulary: string[];
  guided: string;
  inquiry: string;
  reflection: string;
  exit: string;
  materials: string[];
  teacherPrep?: {
    beforeClass: string[];
    perGroup?: string[];
    displayOrPrint?: string[];
    answerKey?: string[];
    cleanup?: string[];
    lowPrepAlternative?: string;
    offlineRoute?: string;
  };
  misconception: string;
  evidence: string;
  projectContribution: string;
  evidenceLevel?: "Practice" | "Checkpoint" | "Portfolio Highlight";
  evidenceSubjects?: string[];
  spacesPrompt?: string;
  scenes: ExperienceScene[];
  resource?: { label: string; url: string; note: string };
  lessonResources?: LessonResource[];
  learningModes?: string[];
  priorKnowledge?: string[];
  vocabularySupport?: Record<string, { meaning: string; example: string }>;
  unitId?: string;
  unitTitle?: string;
  unitColor?: string;
  unitSoft?: string;
  flagship?: boolean;
  auditStatus?: "classroom-ready" | "needs-audit";
  curriculumFocus?: {
    competencies: string[];
    content?: string[];
    whyThisFits: string;
  };
};

export type ScienceUnit = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  soft: string;
  question: string;
  bigIdea: string;
  content: string[];
  assessment: string;
  resources: string[];
  lessons: ScienceLesson[];
};

export type SciencePacingBlock = {
  weeks: string;
  focus: string;
  blocks: string;
  purpose: string;
  inquiryMove: string;
};

export const sciencePacing: SciencePacingBlock[] = [
  { weeks: "Feb. 25–26", focus: "Launch the big mission", blocks: "2", purpose: "See a strong inquiry, practise an educated hypothesis, and open one living local Science Topic Bank.", inquiryMove: "Collect possibilities locally; no launch post and no early topic commitment." },
  { weeks: "March", focus: "Body Systems", blocks: "9", purpose: "Investigate reaction time and body balance, become system experts, study reproduction and development, and solve a multi-system case.", inquiryMove: "Use the reaction-time investigation as the March portfolio story; other Body Systems work contributes or stays in class." },
  { weeks: "April", focus: "Mixtures", blocks: "10–12", purpose: "Investigate a mystery mixture, become separation-method experts, complete a rescue challenge, study the local water system, and learn from one specific place-based source.", inquiryMove: "Keep the rescue and Earth Day learning in class unless it fills a genuine evidence gap." },
  { weeks: "May", focus: "Forces & Motion", blocks: "9–10", purpose: "Build Newton's laws through motion stations, impact evidence, human movement, and a three-block crash-safety design challenge.", inquiryMove: "Post the Delivery Pod explanation as a portfolio highlight; other Forces work is practice or an optional checkpoint." },
  { weeks: "June", focus: "Earth & Space + one shared expert culmination", blocks: "12–15", purpose: "Use 6–7 blocks for the core cosmic tour, then 6–8 blocks for one expert teaching experience that also carries ELA, Arts, ADST, and selected Math evidence.", inquiryMove: "Post one final team teaching artifact plus each student’s individual explanation; Minecraft and the separate Math pavilion are optional replacement formats, never additional requirements. Reserve 2–3 final blocks for reflection, portfolio curation, and closure." },
];

export const scienceInquiryProject = {
  id: "science-expert-showcase",
  title: "Become the Expert",
  promise: "Students collect possible topics across Science, then form expert teams. Each team learns a different topic deeply and teaches it to the class.",
  productChoices: ["Live demonstration", "Tested design", "Explainer video", "Interactive model", "Minecraft world", "Mini documentary", "Illustrated investigation"],
  stages: [
    { name: "Collect", detail: "Keep useful evidence and possible expert topics in one local topic bank or teacher-selected living record." },
    { name: "Form teams", detail: "Build groups around different topics so the class learns from every team." },
    { name: "Focus", detail: "Turn the topic into a clear question and decide what the team must learn." },
    { name: "Become experts", detail: "Research, test, observe, or model—and check every important claim." },
    { name: "Build the teaching", detail: "Choose a format that helps classmates understand, not just watch." },
    { name: "Teach & reflect", detail: "Teach the class, answer questions, then post the team work and an individual reflection to SpacesEDU." },
  ],
};

const experience = (
  id: string,
  title: string,
  question: string,
  duration: string,
  journeyType: JourneyType,
  details: Omit<ScienceLesson, "id" | "title" | "question" | "duration" | "journeyType">,
): ScienceLesson => ({ id, title, question, duration, journeyType, ...details });

export const scienceUnits: ScienceUnit[] = [
  {
    id: "body-systems",
    number: "01",
    title: "Body Systems",
    subtitle: "Signals, balance, reproduction, and systems working together",
    icon: "◉",
    color: "#a64f69",
    soft: "#f7e4e9",
    question: "How does your body notice change, send messages, and keep itself in balance?",
    bigIdea: "Multicellular organisms rely on internal systems to survive, reproduce, and interact with their environment.",
    content: ["Nervous system", "Hormonal system", "Excretory system", "Reproductive system", "First People’s understandings of body systems in humans and animals"],
    assessment: "Solve a new body case by tracing evidence through two or more systems, then teach the explanation with a labelled model.",
    resources: ["Reaction-time investigation", "Body-balance case data", "Four-system expert jigsaw", "Reproduction and development evidence cases", "Body case conference"],
    lessons: [
      experience("science-launch", "The evidence challenge", "Can one amazing flight prove a design is best?", "2 × 45–55 min", "Launch", {
        kind: "Explore",
        auditStatus: "classroom-ready",
        curriculumFocus: {
          competencies: [
            "Make predictions about the findings of their inquiry",
            "Decide which variable should be changed and measured for a fair test",
            "Observe, measure, and record data, using appropriate tools, including digital technologies",
            "Identify patterns and connections in data",
            "Evaluate whether their investigations were fair tests",
          ],
          whyThisFits: "This is the inquiry launch for the course. It deliberately develops fair-test, repeated-measurement, pattern, and evidence competencies before students apply them to Body Systems content.",
        },
        hook: "A paper dart makes one spectacular flight. Students decide whether that is enough evidence to call it the best design.",
        learning: "We are learning how a fair comparison and repeated results turn an educated guess into a scientific conclusion.",
        success: ["I can make an educated hypothesis with a reason.", "I can spot what makes a comparison unfair.", "I can use a pattern across repeated trials to revise a claim."],
        vocabulary: ["hypothesis", "evidence", "variable"],
        guided: "Keep the opening vote fast. Let the first dramatic flight tempt the class into a premature claim, then ask what evidence is still missing.",
        inquiry: "Compare three paper-airplane designs in a fair class flight test. Use the shared screen for the setup check, run three rounds, compare the averages and consistency, and decide which claim the evidence supports.",
        reflection: "What makes an educated guess different from a random guess?",
        exit: "Write one focused comparison question and identify what you would change, measure, and keep the same.",
        learningModes: ["Projected evidence mystery", "Physical paper-airplane comparison", "Class data table", "Partner critique", "Focused-question workshop"],
        materials: ["Three contrasting paper-airplane designs", "Tape measure", "Masking-tape start line", "Class data chart", "Optional mini whiteboards"],
        teacherPrep: {
          beforeClass: ["Fold or collect three visibly different paper-airplane designs and label them A, B, and C.", "Mark one launch line and one landing-distance line; choose one launcher or use a simple card launcher.", "Prepare a class table with three trials and an average for each design."],
          perGroup: ["One copy of each design or one shared class set", "Tape measure", "Pencil and one half-page data table"],
          displayOrPrint: ["Project the unfair-test repair scene before students touch the planes.", "Display the class data table so one spectacular result remains visible beside the overall pattern."],
          answerKey: ["A fair comparison uses the same launcher, start line, release method, space, and number of trials.", "A conclusion should use the repeated pattern, average, and consistency—not only the longest single flight.", "A focused question names what changes, what is measured, and important conditions held the same."],
          cleanup: ["Use one flight lane at a time and retrieve planes only after the lane is clear."],
          lowPrepAlternative: "Run the embedded flights as a class, then give teams the supplied result table to analyze and critique. Keep the physical launch as an optional follow-up.",
          offlineRoute: "No internet is needed. Fold or reuse three labelled planes, draw the three-trial table on the board, and use the teacher-key data if the hallway test cannot run.",
        },
        misconception: "The design with the single best result must be the best. Repeated, fair results reveal whether a result is typical or unusual.",
        evidence: "A reasoned prediction, three fair-test corrections, an evidence-based conclusion, and a focused comparison question",
        projectContribution: "The fair-test and evidence pattern students will reuse when planning their final inquiry.",
        scenes: [
          { label: "Predict", title: "Which plane will really fly farthest?", prompt: "Choose a design and give a reason based on what you notice—not on a random guess.", teacherCue: "Take a silent class vote. Ask for two different reasons, but do not name a winner.", time: "15 min", learningMode: "Whole class · silent vote · partner reason", studentTask: "A prediction with one design feature used as a reason" },
          { label: "Make it fair", title: "Can we compare these flights fairly?", prompt: "Study the setup on the class screen. Spot each unfair choice, then help write the rules for the real flight test.", teacherCue: "Let students answer each setup question aloud, on the board, or on paper before revealing the explanation. Transfer each fix to the real launch lane.", time: "20 min", learningMode: "Whole class · projected diagnosis · physical setup", studentTask: "Five fair-test rules built as a class" },
          { label: "Gather evidence", title: "One spectacular flight is not the whole story", prompt: "Run the real test and the three class-screen rounds. Compare the longest flight, the average, and how consistent the flights were.", teacherCue: "Control the projected rounds from one device. After round one, pause on purpose and ask whether the class has enough evidence to decide.", time: "35–45 min", learningMode: "Teams · hands-on test · class data", studentTask: "Nine measurements, averages, and one noticed pattern" },
          { label: "Conclude", title: "Make the evidence do the talking", prompt: "Choose the supported claim, critique one limitation, then focus a comparison question of your own.", teacherCue: "Require students to cite the average and consistency and name one limitation. End with change, measure, and keep-the-same language.", time: "25 min", learningMode: "Partners → individual · evidence analysis", studentTask: "A claim–evidence–limitation conclusion and one focused question" },
        ],
      }),
      experience("signal-case", "Reaction-time investigation", "How does your body turn a change into an action so quickly?", "2 × 55–65 min", "Field lab", {
        kind: "Investigate", evidenceLevel: "Portfolio Highlight", evidenceSubjects: ["Science", "Mathematics", "English Language Arts"],
        spacesPrompt: "March portfolio story: show the question, repeated reaction-time evidence, signal pathway, supported claim, limitation, and one useful next test.",
        auditStatus: "classroom-ready",
        curriculumFocus: {
          competencies: [
            "With support, plan appropriate investigations to answer their questions or solve problems they have identified",
            "Choose appropriate data to collect to answer their questions",
            "Construct and use a variety of methods, including tables, graphs, and digital technologies, as appropriate, to represent patterns or relationships in data",
            "Compare data with predictions and develop explanations for results",
            "Identify possible sources of error",
          ],
          content: ["the basic structures and functions of body systems: excretory, reproductive, hormonal, and nervous"],
          whyThisFits: "Students investigate a measurable response, trace a nervous-system pathway, and limit their claim to what repeated ruler-drop evidence can support.",
        },
        hook: "Students test how quickly they can respond to an unpredictable signal, then trace the body pathway that made the response possible.",
        learning: "We are using reaction-time evidence to explain how receptors, nerves, the brain, and muscles work together.",
        success: ["I can collect and compare reaction-time results.", "I can trace stimulus → receptor → message → response.", "I can explain why reaction time changes from trial to trial."],
        vocabulary: ["stimulus", "receptor", "nervous system", "response", "variable"],
        learningModes: ["Digital reaction test", "Hands-on ruler-drop investigation", "Human pathway model", "Short source reading", "Data comparison"],
        guided: "Use the embedded timer only as the hook. Most learning comes from a partner ruler-drop investigation, a human signal-pathway model, and analysis of variation. Never rank students by speed.",
        inquiry: "Collect repeated ruler-drop evidence, compare one safe condition, identify limitations, and build a physical pathway from stimulus to response.",
        reflection: "Why were your three reaction times not exactly the same?",
        exit: "Explain one reaction using stimulus → receptor → nerve message → brain/spinal cord → motor message → muscle response.",
        materials: ["One shared projector", "One 30 cm ruler per pair", "Embedded reaction timer", "Reaction-time data table", "Six pathway cards per group", "Chart paper or notebook"],
        teacherPrep: {
          beforeClass: ["Practise the ruler-drop method and decide whether pairs will compare dominant/non-dominant hand, quiet/talking, or first/last trials.", "Write six reusable pathway cards: stimulus, receptor, sensory message, processing, motor message, muscle response.", "Open the Science World ruler-drop page and preview the explanation."],
          perGroup: ["One 30 cm ruler", "One data table for at least five trials per condition", "One set of pathway cards"],
          displayOrPrint: ["Project the digital timer for the hook only.", "Display one anonymous class data set for discussion of variation and limitations."],
          answerKey: ["A visual response follows: light change → eye receptors → sensory nerves → brain processing → motor nerves → finger muscles.", "Reaction time is response time, not a simple reflex in this activity.", "Repeated results vary because attention, anticipation, practice, measurement method, and ordinary human variation all matter."],
          cleanup: ["Collect rulers and card sets by table; no ruler swinging or striking."],
          lowPrepAlternative: "Run five projected trials with different volunteers, analyze the anonymous class results, then have groups physically arrange the pathway cards.",
          offlineRoute: "Skip the web timer and video. Use one ruler per pair, put the six pathway labels on the board or scrap paper, and analyze the class measurements with the teacher key.",
        },
        misconception: "The brain simply tells the body to move. A response depends on receptors, sensory messages, processing, motor messages, and muscles working as a system.",
        evidence: "Three reaction-time results, an accurate signal pathway, and one evidence-based explanation",
        projectContribution: "The March portfolio investigation and a complete model of measuring variation, explaining a body-system pathway, and naming a limitation.",
        lessonResources: [
          { scene: 1, type: "Website", label: "Reaction Time Ruler", url: "https://www.scienceworld.ca/resource/reaction-time-ruler/", source: "Science World", gradeFit: "Core Grade 6", support: "Use the procedure and explanation after students predict. Clarify that the activity measures a response, not a simple reflex.", task: "Identify the signal pathway and one design choice that makes partner trials more consistent." },
          { scene: 2, type: "Video", label: "How the Brain and Nervous System Work", url: "https://kidshealth.org/en/kids/nsmovie.html", source: "Nemours KidsHealth · medically reviewed", gradeFit: "Core Grade 6", support: "Pause after the sensory-message and movement sections. Students need the pathway, not a list of brain anatomy.", task: "Add one missing detail to the class pathway and explain what the model still simplifies." },
        ],
        scenes: [
          { label: "Hook", title: "How fast can your body respond?", prompt: "Watch three volunteer trials on the class screen. What changes from trial to trial, and what might explain it?", teacherCue: "Run three projected volunteer trials and conceal names in the class record. Ask what the timer can and cannot tell us.", time: "12–15 min", learningMode: "Whole class · projected notice/wonder", studentTask: "Share or write two possible reasons the results changed" },
          { label: "Investigate", title: "Design a fair ruler-drop comparison", prompt: "Collect at least five trials in each condition. Change one safe factor, keep the method consistent, and look for a pattern.", teacherCue: "Model finger position, ruler release, reading distance, and role rotation. Approve only safe comparisons.", time: "35–40 min", learningMode: "Partners · fair investigation · measurement", studentTask: "A fair plan, repeated data, average or median, and one limitation" },
          { label: "Model", title: "Build the full signal pathway", prompt: "Use six physical cards and the source to trace what happens from the falling ruler to the fingers closing.", teacherCue: "Have groups stand in a line and pass a message token. Challenge missing receptors, sensory messages, processing, or motor messages.", time: "30–35 min", learningMode: "Small groups · human model · short video", studentTask: "A six-part causal pathway with arrows and a model limitation" },
          { label: "Explain", title: "What does the evidence actually support?", prompt: "Compare conditions, explain variation, and connect one measured response to the nervous-system pathway.", teacherCue: "Conference around claim, repeated evidence, pathway, and limitation. A difference between conditions is not automatically caused by the variable.", time: "20–25 min", learningMode: "Individual or partners · CER conference", studentTask: "A claim–evidence–reasoning paragraph or recorded explanation" },
        ],
      }),
      experience("balance-case", "Case file: too hot, too thirsty", "How does your body keep the inside steady when the outside changes?", "2 × 55–65 min", "Case file", {
        kind: "Investigate",
        auditStatus: "classroom-ready",
        curriculumFocus: {
          competencies: [
            "Construct and use a variety of methods, including tables, graphs, and digital technologies, as appropriate, to represent patterns or relationships in data",
            "Identify patterns and connections in data",
            "Compare data with predictions and develop explanations for results",
            "Transfer and apply learning to new situations",
            "Communicate ideas, explanations, and processes in a variety of ways",
          ],
          content: ["the basic structures and functions of body systems: excretory, reproductive, hormonal, and nervous"],
          whyThisFits: "Students interpret a fictional hot-practice data set, distinguish evidence from modelled prediction, and trace how nervous, hormonal, and excretory responses work together.",
        },
        hook: "Follow a student through a hot soccer practice and watch body temperature, thirst, sweat, and urine concentration change.",
        learning: "We are learning how nervous, hormonal, and excretory systems work together to maintain balance.",
        success: ["I can explain homeostasis as active adjustment.", "I can describe what kidneys regulate.", "I can interpret a simple changing-data graph."],
        vocabulary: ["homeostasis", "kidney", "excretion", "feedback"],
        learningModes: ["Narrative case file", "Changing-data graph", "Interactive model", "Kidney source reading", "Feedback-loop model"],
        guided: "Keep the strong hot-practice case, but make students interpret evidence before changing the model. Treat sweat, thirst, blood water level, and urine concentration as connected responses—not separate facts.",
        inquiry: "Interpret a fictional hot-practice data set, test model predictions, trace what kidneys keep or remove, and build a feedback loop.",
        reflection: "Why does keeping balance require conditions to change?",
        exit: "Use four arrows to explain one hot-day response.",
        materials: ["One shared projector", "Embedded body-balance model", "Projected case graph", "Feedback-loop arrow cards", "Notebook or chart paper", "Optional cups and coloured water for a teacher filtration analogy"],
        teacherPrep: {
          beforeClass: ["Open the hot-practice timeline and graph on the class screen.", "Prepare arrow cards: change, receptor/signal, response, effect, movement toward range.", "Preview only the grade-appropriate overview sections of the kidney source; skip nephron-level detail."],
          perGroup: ["One case-data page", "One feedback-loop card set", "One marker and chart page"],
          displayOrPrint: ["Keep the safety statement visible: students do not test dehydration.", "Display the kidney decision table after students make initial predictions."],
          answerKey: ["Heat and water loss can increase sweating and thirst; kidneys can conserve more water, producing a smaller amount of more concentrated urine.", "Kidneys filter blood, return needed water and dissolved materials, and remove wastes and excess water to urine.", "Homeostasis is active adjustment toward a useful range, not a body value that never changes."],
          cleanup: ["No student restriction of water, heat exposure, urine comparison, or bodily-fluid collection."],
          lowPrepAlternative: "Use the projected case graph and interactive model as a whole class. Groups arrange paper feedback-loop arrows and defend one pathway orally.",
          offlineRoute: "Use the four-point case timeline, kidney decision key, and five feedback-loop labels on the board or paper. Omit the web sources; do not omit the safety statement or the distinction between case evidence and modelled prediction.",
        },
        misconception: "Homeostasis means nothing changes. It means the body continually responds to keep conditions within useful ranges.",
        evidence: "A data interpretation and feedback-loop explanation",
        projectContribution: "A reusable systems explanation showing change → signal → coordinated responses → movement toward balance.",
        lessonResources: [
          { scene: 2, type: "Article", label: "Your Kidneys and How They Work", url: "https://www.niddk.nih.gov/health-information/kidney-disease/kidneys-how-they-work", source: "U.S. National Institute of Diabetes and Digestive and Kidney Diseases", gradeFit: "Supported stretch", support: "Read only the opening diagram and the sections on why kidneys matter and how urine is made. Supply the four key verbs: filter, return, balance, remove.", task: "Find evidence for two things kidneys return to the body and two things they help remove or regulate." },
          { scene: 2, type: "Video", label: "How the Urinary System Works", url: "https://kidshealth.org/en/kids/usmovie.html", source: "Nemours KidsHealth · medically reviewed", gradeFit: "Core Grade 6", support: "Pause to add kidneys, ureters, bladder, and urethra to the route. Keep the explanation at system level.", task: "Sketch the route and label which part filters, carries, stores, and releases." },
        ],
        scenes: [
          { label: "Case", title: "A hot practice", prompt: "Read the timeline and graph before revealing the explanation. Which body response changes first, and what evidence supports your claim?", teacherCue: "Collect predictions, then reveal case evidence in stages. Separate what the case shows from what students infer or model.", time: "25–30 min", learningMode: "Whole class · story case · graph reading", studentTask: "Three evidence notes and one supported claim about the first response" },
          { label: "Model", title: "Change one condition", prompt: "Change heat or water—not both. Predict which responses will change, test the model, and record where it surprises you.", teacherCue: "Require a prediction before every model change and remind students that the model represents patterns, not an individual diagnosis.", time: "20–25 min", learningMode: "Partners · interactive model · comparison table", studentTask: "A three-condition comparison table and one model limitation" },
          { label: "Kidneys", title: "Keep, return, or remove?", prompt: "Use the source and decision cases to explain how kidneys help regulate blood water and remove wastes.", teacherCue: "Stay at system level. Do not teach nephron anatomy as required Grade 6 content.", time: "30–35 min", learningMode: "Pairs or teams · source · decision cases", studentTask: "A labelled urinary route and three kidney decisions justified with evidence" },
          { label: "Explain", title: "Build the feedback loop", prompt: "Arrange change → signal → response → effect → movement toward range, then apply the pattern to a new safe case.", teacherCue: "Listen for the misconception that one organ controls everything. Require at least nervous, hormonal, and excretory roles.", time: "20–25 min", learningMode: "Groups → individual · model and explanation", studentTask: "A five-arrow feedback loop and a short explanation of systems working together" },
        ],
      }),
      experience("systems-jigsaw", "Four systems, one body", "How can different body systems do different jobs and still act as one connected system?", "2 × 55–65 min", "Inquiry studio", {
        kind: "Explain",
        auditStatus: "classroom-ready",
        curriculumFocus: {
          competencies: [
            "Make observations in familiar or unfamiliar contexts",
            "Identify patterns and connections in data",
            "Demonstrate an openness to new ideas and consideration of alternatives",
            "Transfer and apply learning to new situations",
            "Communicate ideas, explanations, and processes in a variety of ways",
          ],
          content: ["the basic structures and functions of body systems: excretory, reproductive, hormonal, and nervous", "First People’s understandings of body systems in humans and animals"],
          whyThisFits: "Each expert teaches the structure, function, route, and one evidence-supported connection for an assigned Grade 6 body system; mixed groups then use the named FNESC/FNSA Bears and Body Systems source for an evidence-bounded bear–human comparison.",
        },
        hook: "Four expert teams receive the same everyday case but a different system lens: nervous, hormonal, excretory, or reproductive.",
        learning: "We are becoming expert in one body system, then using peer teaching to explain how systems exchange matter or information.",
        success: ["I can name the main job and important structures of one system.", "I can trace what moves through the system.", "I can explain one connection to another system and one limit of a model."],
        vocabulary: ["system", "structure", "function", "signal", "regulation"],
        learningModes: ["Expert-group jigsaw", "Short medical-reviewed video or article", "Physical route model", "Peer teaching", "Connection-case challenge"],
        guided: "Assign systems rather than letting every group choose the easiest one. Teams must teach a job, route, connection, and model limitation—not list body parts.",
        inquiry: "Extract evidence from an approved source, build a route model, teach mixed groups, and solve cross-system cases.",
        reflection: "What became clearer when another expert connected their system to yours?",
        exit: "Explain one connection using: when ___ changes, the ___ system sends/moves ___, so the ___ system can ___.",
        materials: ["Four expert briefs", "Approved system diagrams", "Chart paper or floor arrows", "Message/matter tokens", "Mixed-group note catcher"],
        teacherPrep: {
          beforeClass: ["Assign one of four systems to each expert group: nervous, hormonal, excretory, or reproductive.", "Bookmark the specific KidsHealth body movie/article each team will use and prepare one district-approved reproductive-system diagram.", "Preview FNESC’s Science First Peoples guide and its Bears and Body Systems blackline masters before using the transfer scene; teach only what the named source supports.", "Project the five-part expert brief and have students draw a simple four-box note grid in a notebook or on plain paper."],
          perGroup: ["One approved source", "One route-model kit", "One chart page", "Three-minute teaching timer"],
          displayOrPrint: ["Display the four required teaching elements: job, important structures, what moves, one connection/limit.", "For transfer, display or print only the FNESC Inside a Bear, Inside a Human, and comparison materials needed for the selected structure–function relationship."],
          answerKey: ["Nervous: receptors and nerve cells carry fast signals to and from the brain/spinal cord.", "Hormonal: glands release chemical messages into blood; effects are often slower and longer-lasting.", "Excretory: kidneys filter blood, regulate water/salts, and remove wastes through urine.", "Reproductive: structures produce reproductive cells and hormones and may support fertilization and development.", "The bear–human comparison comes from a named FNESC/FNSA teacher resource. It does not support a generic claim about every First Nation or replace community-held knowledge with an anatomy fact."],
          cleanup: ["Collect diagram sets and reusable route tokens by system colour."],
          lowPrepAlternative: "Use the three direct KidsHealth system videos plus one district-approved reproductive-system diagram as a whole-class carousel. Pairs complete one system brief, then form mixed fours for peer teaching.",
          offlineRoute: "Use the embedded four-system expert board or copy its job, route, what-moves, and connection fields onto four chart pages. Teams teach from those checked briefs; no open web search is required.",
        },
        misconception: "Body systems are separate machines. In living bodies, systems continually exchange information and materials and depend on one another.",
        evidence: "An expert route model, a three-minute peer lesson, a four-system comparison, and one cross-system explanation",
        projectContribution: "A direct rehearsal of the later expert-team structure: learn deeply, teach clearly, answer questions, and revise after feedback.",
        lessonResources: [
          { scene: 0, type: "Video", label: "Nervous-system expert source", url: "https://kidshealth.org/en/kids/nsmovie.html", source: "Nemours KidsHealth · medically reviewed", gradeFit: "Core Grade 6", support: "Assign to nervous-system experts. Stop after students can trace receptor → sensory message → processing → motor message → response.", task: "Collect the system job, key structures, what moves, one connection, and one model limit." },
          { scene: 0, type: "Video", label: "Hormonal-system expert source", url: "https://kidshealth.org/en/kids/esmovie.html", source: "Nemours KidsHealth · medically reviewed", gradeFit: "Core Grade 6", support: "Assign to hormonal-system experts. Focus on glands releasing chemical messages into blood; do not require a list of every gland.", task: "Trace gland → hormone in blood → target cells → response and name one nervous-system connection." },
          { scene: 0, type: "Video", label: "Excretory-system expert source", url: "https://kidshealth.org/en/kids/usmovie.html", source: "Nemours KidsHealth · medically reviewed", gradeFit: "Core Grade 6", support: "Assign to excretory-system experts. Focus on filtering blood, returning needed materials, and the urine route.", task: "Trace blood → kidneys → ureters → bladder → urethra and explain what is regulated or removed." },
          { scene: 0, type: "Teacher-selected source", label: "Reproductive-system expert source", source: "Surrey Schools or teacher-approved health resource", gradeFit: "Core Grade 6", support: "Use one district-approved diagram or source. Do not direct students to open-web anatomy searches.", task: "Identify the biological job, approved structures, what moves or changes, one hormonal connection, and one model limit." },
          { scene: 3, type: "Website", label: "Bears and Body Systems", url: "https://www.fnesc.ca/science-first-peoples/", source: "FNESC/FNSA · Science First Peoples Teacher Resource Guide (Grades 5–9)", gradeFit: "Teacher preview", support: "Preview the guide and use its named Inside a Bear, Inside a Human, and comparison materials. Preserve the guide’s context: First Peoples’ knowledge is rich, specific, and often community-held; this resource does not authorize generic cultural claims.", studentBoundary: "Learn from and credit the FNESC/FNSA source. Compare only what the selected materials support; do not turn the activity into a claim about all First Peoples or all bears.", task: "Name the source, compare one supported bear–human structure–function relationship, and state one thing the source does not establish." },
        ],
        scenes: [
          { label: "Become expert", title: "Build one system route", prompt: "Use your assigned source to find the job, structures, what moves, one connection, and one model limit.", teacherCue: "Approve each team's five evidence notes before construction. Redirect part-lists into a route or causal model.", time: "35–40 min", learningMode: "Expert teams · source · route model", studentTask: "Five sourced notes and one route model" },
          { label: "Prepare teaching", title: "Make classmates do the thinking", prompt: "Plan a three-minute lesson with one prediction, one visual route, and one check question.", teacherCue: "Conference on scientific accuracy and audience action. A speech with copied facts is not ready.", time: "20–25 min", learningMode: "Expert teams · lesson design · rehearsal", studentTask: "A three-minute interactive expert lesson" },
          { label: "Teach", title: "Mixed groups build the whole picture", prompt: "Teach your system, learn the other three, and record one connection after every mini-lesson.", teacherCue: "Form mixed groups with one expert per system. Use a visible timer and rotate the teacher role.", time: "30–35 min", learningMode: "Mixed groups · peer teaching · listening notes", studentTask: "A four-system comparison with three cross-system connections" },
          { label: "Transfer", title: "What can a bear–human comparison teach?", prompt: "Use the named FNESC/FNSA source to compare one bear and human structure–function relationship. Separate what the source supports from what it does not establish.", teacherCue: "Name FNESC/FNSA and Bears and Body Systems before comparison. Keep the task evidence-bounded: one relationship, exact source notes, no generic claim about all First Peoples, and no inference beyond the supplied material.", time: "20–25 min", learningMode: "Named source · paired comparison · limits statement", studentTask: "One attributed comparison, one structure–function explanation, and one limit on the claim" },
        ],
      }),
      experience("life-systems-studio", "Reproduction and development studio", "What evidence do we need to explain reproduction, puberty, and development accurately and respectfully?", "2 × 55–65 min", "Inquiry studio", {
        kind: "Apply",
        auditStatus: "needs-audit",
        hook: "Students audit claims, interpret unfamiliar evidence cases, and build a process model without being asked to explain content before it has been taught.",
        learning: "We are using accurate biological language and evidence to explain the roles of reproductive structures, cells, hormones, fertilization, and development while recognizing human variation.",
        success: ["I can use evidence to identify a structure, cell, or process rather than relying on position or stereotypes.", "I can place major events in a simplified sequence and identify what the model leaves out.", "I can explain biological function without making assumptions about identity, family role, or every person's development."],
        vocabulary: ["reproduction", "gamete", "ovary", "testis", "fertilization", "embryo", "puberty"],
        learningModes: ["Anonymous question box", "Teacher-guided diagram lesson", "Evidence-case investigation", "Puberty source comparison", "Sequence model", "Private or public exit choices"],
        guided: "Teach the core structures and sequence before expecting explanations. Use district-approved diagrams, medically reviewed sources, correct terms, and opt-in participation routes that never require personal disclosure.",
        inquiry: "Interpret six shuffled evidence cases, build a simplified reproduction-and-development sequence, evaluate puberty claims, and identify model limits.",
        reflection: "Which statement became more accurate when we changed its wording or added a model limit?",
        exit: "Use one source-supported fact to explain a structure, cell, process, or variation accurately; students may submit privately.",
        materials: ["District-approved reproductive-system diagrams", "Embedded evidence cases", "Event-sequence card set", "Anonymous question box", "Private exit slips or digital form"],
        teacherPrep: {
          beforeClass: ["Confirm district expectations and choose approved diagrams that show internal and external structures at an appropriate level.", "Set up an anonymous question box and a private response option.", "Preview the HealthLinkBC puberty pages; select only the sections needed for normal variation and body changes."],
          perGroup: ["One shuffled evidence-case set", "One event-sequence card set", "One model-limit card"],
          displayOrPrint: ["Display agreements: scientific language, no personal questions, no assumptions, pass is allowed, questions may be private.", "Keep the terms testis (one) and testes (more than one) visible."],
          answerKey: ["Ovaries can produce egg cells and hormones; testes can produce sperm cells and hormones.", "Fertilization can occur when an egg cell and sperm cell join; a fertilized cell divides and may develop into an embryo and later a fetus in the uterus.", "Puberty timing and sequence vary; a body-system explanation does not determine identity, personality, or family role.", "Every diagram and timeline is a simplified model that omits variation, scale, time, and many intermediate events."],
          cleanup: ["Collect anonymous questions without reading identifying information aloud. Follow school procedures for health, safety, or disclosure concerns."],
          lowPrepAlternative: "Teach from one approved projected diagram, complete three evidence cases as a class, then run the sequence and model-limit discussion in pairs.",
        },
        misconception: "Reproduction is only a list of body parts. It is a coordinated process involving structures, cells, hormones, fertilization, and development—and diagrams are simplified models.",
        evidence: "Six evidence-based identifications, an accurate simplified sequence, a source-supported puberty claim, and one explicit model limit",
        projectContribution: "Accurate foundational knowledge that a later expert team may use; no student must choose this as an inquiry topic or post personal learning publicly.",
        lessonResources: [
          { scene: 0, type: "Teacher-selected source", label: "District-approved reproductive-system diagrams", source: "Surrey Schools or teacher-approved health resource", gradeFit: "Core Grade 6", support: "Teach from the approved diagrams before opening the evidence cases. Do not ask students to find anatomy diagrams through open web search.", task: "Add the structure names and biological jobs needed to solve the evidence cases." },
          { scene: 2, type: "Article", label: "Physical Development, Ages 11 to 14", url: "https://www.healthlinkbc.ca/healthwise/physical-development-ages-11-14-years", source: "HealthLink BC", gradeFit: "Core Grade 6", support: "Select short excerpts showing range and variation. Avoid presenting two fixed puberty pathways as descriptions of every student's identity or experience.", task: "Find two examples showing that puberty timing, order, or body changes vary, then rewrite one overgeneralized claim." },
          { scene: 2, type: "Article", label: "Your Endocrine System", url: "https://kidshealth.org/en/kids/endocrine.html", source: "Nemours KidsHealth · medically reviewed", gradeFit: "Supported stretch", support: "Read the opening explanation of hormones and the teacher-selected puberty section only.", task: "Explain how hormones act as messages without memorizing a list of every gland or hormone." },
        ],
        scenes: [
          { label: "Learn", title: "Build the foundation before solving", prompt: "Use approved diagrams and precise terms to learn the structures, cells, messages, and basic process. Add anonymous questions without personal disclosure.", teacherCue: "Teach first. Use the opening audit only after students have enough knowledge to judge the wording.", time: "35–45 min", learningMode: "Diagram lesson · vocabulary sketch · anonymous questions", studentTask: "A labelled reference page students may keep private" },
          { label: "Investigate", title: "Solve the evidence cases", prompt: "The cases and choices are shuffled. Identify the structure, cell, or process and justify it with the strongest clue.", teacherCue: "Model one case. Require students to cite the clue that rules out a tempting alternative.", time: "30–35 min", learningMode: "Evidence cases · partner reasoning", studentTask: "Six identifications with clue-based justifications" },
          { label: "Compare", title: "Puberty is a pattern with variation", prompt: "Use two sources to distinguish common patterns from fixed rules, then repair claims that overgeneralize.", teacherCue: "Never ask students to compare their own development. Keep examples anonymous and source based.", time: "30–40 min", learningMode: "Source comparison · claim revision", studentTask: "Two variation notes and one accurately revised claim" },
          { label: "Model", title: "Sequence the process—and name the limits", prompt: "Arrange a simplified path from reproductive cells to early development, then attach warnings about what the model leaves out.", teacherCue: "Check the sequence before groups add model limits. End with private exit choices and address anonymous questions within professional boundaries.", time: "30–35 min", learningMode: "Card sequence · model critique · private exit", studentTask: "A correct sequence, two model limits, and one private or public exit response" },
        ],
      }),
      experience("body-case-conference", "Body systems case conference", "Can we explain a new body situation without reducing it to one organ or one system?", "60–70 min", "Case file", {
        kind: "Assess",
        auditStatus: "needs-audit",
        hook: "Teams receive different fictional cases: a hot tournament, a sudden start signal, a long bus ride with little water, or changing sleep and growth during puberty.",
        learning: "We are combining evidence from nervous, hormonal, excretory, and reproductive systems to build and defend a multi-system explanation.",
        success: ["I select systems because the case evidence requires them.", "I trace what changes, moves, or is regulated with accurate arrows.", "I identify a limit or missing piece instead of pretending the model explains everything.", "Our teaching helps classmates reason, not just listen."],
        vocabulary: ["system", "evidence", "regulation", "model", "limitation"],
        learningModes: ["Fictional case file", "Team evidence board", "Model construction", "Two-minute case conference", "Peer challenge and revision"],
        guided: "Assign different cases and require each team to use at least two systems. The product can be paper, slides, video, or a quick Minecraft model, but scientific reasoning comes before decoration.",
        inquiry: "Select relevant evidence, build a causal systems model, defend it to a peer panel, and revise one weak connection.",
        reflection: "Which arrow in our model carries the most explanatory work, and how did feedback improve it?",
        exit: "Explain one case in five arrows and name one thing the model cannot conclude.",
        materials: ["Four fictional case files", "System and evidence cards", "Chart paper or approved digital/Minecraft planning tool", "Peer conference checklist", "Two-minute timer"],
        teacherPrep: {
          beforeClass: ["Assign a different fictional case to each team and prepare one backup case for early finishers.", "Decide whether teams may use paper, slides, video, or a limited Minecraft build.", "Prepare one peer-panel checklist focused on evidence, connections, vocabulary, and model limits."],
          perGroup: ["One case file", "One set of system/evidence cards", "One model surface", "One peer-feedback slip"],
          displayOrPrint: ["Display the required chain: case evidence → system part → what moves/changes → response → effect.", "Display the two-minute limit and revision sentence."],
          answerKey: ["Strong models use at least two systems and connect every arrow to case evidence.", "Hot tournament: nervous/hormonal signals coordinate sweating and thirst; kidneys adjust water conservation.", "Start signal: receptors, nerves, brain/spinal cord, motor messages, and muscles produce the response; hormonal changes may support longer-lasting readiness.", "Puberty case: hormonal messages coordinate variable changes and reproductive-system development; the case cannot determine identity or predict an exact timeline."],
          cleanup: ["Delete or collect fictional case notes; students should not substitute personal medical information."],
          lowPrepAlternative: "Run one case as a whole-class fishbowl. Small groups each propose one arrow, then the class critiques and revises the shared model.",
        },
        misconception: "A correct list of organs is an explanation. A scientific systems explanation must show causal connections, movement of matter or information, evidence, and limits.",
        evidence: "A sourced multi-system model, a two-minute defence, a peer question, and one visible revision",
        projectContribution: "A compact rehearsal for later expert-team inquiry and Minecraft teaching: research enough to explain, build a purposeful model, teach, answer questions, revise, and reflect.",
        scenes: [
          { label: "Diagnose", title: "Which evidence matters?", prompt: "Open a fictional case, separate observations from assumptions, and select the systems the evidence actually requires.", teacherCue: "Reject choices based only on familiar body words. Ask which clue requires each selected system.", time: "15 min", learningMode: "Case reading · evidence triage", studentTask: "A case claim, four evidence notes, and at least two justified systems" },
          { label: "Build", title: "Trace the causal system", prompt: "Build arrows from the changing condition through signals, structures, responses, and effects. Add one missing-information marker.", teacherCue: "Conference before teams decorate or open Minecraft. Check every arrow for a verb and a scientific reason.", time: "25–30 min", learningMode: "Systems modelling · teacher conference", studentTask: "A five-to-eight-arrow causal model with one limitation" },
          { label: "Defend", title: "Two-minute case conference", prompt: "Teach the model, answer one challenge question, and record the part classmates found unclear.", teacherCue: "Use peer panels of two teams. Listeners must ask about evidence or a connection—not presentation style.", time: "15–20 min", learningMode: "Peer teaching · scientific questioning", studentTask: "A two-minute defence and one evidence-focused question" },
          { label: "Revise", title: "Make one high-value improvement", prompt: "Repair the weakest arrow, add missing evidence, or clarify a model limit. Save only if it will genuinely help later inquiry work.", teacherCue: "Require a visible before/after change. A SpacesEDU post is optional at this stage.", time: "10 min", learningMode: "Feedback · revision · reflection", studentTask: "One visible revision and an individual reflection sentence" },
        ],
      }),
    ],
  },
  {
    id: "mixtures",
    number: "02",
    title: "Everyday Mixtures",
    subtitle: "Mystery mixture to local water systems",
    icon: "◌",
    color: "#b76d2e",
    soft: "#f8eadc",
    question: "How can a material's properties help us separate a complicated mixture?",
    bigIdea: "Everyday materials are often mixtures.",
    content: ["Heterogeneous mixtures", "Component properties", "Separation methods", "Local First Peoples knowledge"],
    assessment: "Use material properties to plan, carry out, explain, and evaluate a separation process in a hands-on challenge and a local water-treatment case.",
    resources: ["Mystery-mixture investigation", "Separation-method station cards", "Mixture Rescue Challenge", "Metro Vancouver water case", "Teacher-selected local source"],
    lessons: [
      experience("mixture-mystery", "The mystery mixture", "How can we identify what is mixed together without guessing?", "2 × 55–65 min", "Launch", {
        kind: "Explore", auditStatus: "needs-audit", hook: "A sealed jar contains visible and invisible components. Students build an evidence board before the contents are revealed, then test which properties can actually distinguish the materials.", learning: "We are distinguishing observations from inferences and using material properties as evidence.", success: ["I record precise observations before naming materials.", "I use a test result to support or reject an inference.", "I distinguish a heterogeneous mixture from a solution."], vocabulary: ["mixture", "component", "property", "heterogeneous", "solution", "solubility"], learningModes: ["Real object mystery", "Short video", "Partner concept sort", "Hands-on test stations", "Class evidence board"], guided: "Use the website only to structure the investigation. Most of the learning happens through the real jar, station tests, discussion, and notebook evidence.", inquiry: "Observe the sealed mixture, develop competing inferences, rotate through property tests, and revise the class explanation after viewing and discussing outside examples.", reflection: "Which test changed your thinking most, and why was it stronger than appearance alone?", exit: "Make one claim about a component and support it with a specific test result.", materials: ["One sealed mystery sample", "Student notebooks", "Clear cups and water", "Salt, sand, gravel, cork and steel samples", "Magnets", "Hand lenses", "Stir sticks", "Chart paper"], teacherPrep: {
          beforeClass: ["Prepare one demonstration jar with water, dissolved salt, fine sand, gravel, cork pieces, and steel washers or nuts.", "Set up four labelled test stations: magnetism, floating, particle size, and solubility.", "Keep the generated jar image ready so students at the back can inspect the same evidence."],
          perGroup: ["4 clear sample cups", "1 bagged magnet", "1 hand lens", "1 stir stick", "small comparison samples of cork, steel, gravel, sand, and salt"],
          displayOrPrint: ["Project the jar image for silent observation.", "Prepare one two-column notebook page: I observe / I infer.", "Display the teacher reveal only after students record initial evidence."],
          answerKey: ["Visible components: cork, steel, gravel, sand, and water.", "Hidden component: dissolved salt.", "A visual identification is an inference until a property test supports it."],
          cleanup: ["Collect steel and cork for reuse.", "Pour no mixed solids down the sink; strain first.", "Wipe and dry bagged magnets before storage."],
          lowPrepAlternative: "Use the generated jar image and five teacher-held comparison samples. Run each property test as a class demonstration while pairs update the evidence board.",
        }, misconception: "If a substance seems to disappear, it is gone. Dissolved particles remain in the solution even when they cannot be seen.", evidence: "A dated notebook page containing observations, two revised inferences, station evidence, and an evidence-based claim", projectContribution: "A reusable inquiry routine: notice carefully, test competing ideas, revise the explanation, and name what the evidence cannot show.", lessonResources: [
          { scene: 2, type: "Video", label: "The Great Picnic Mix Up", url: "https://youtu.be/jA0PzblYPUM", source: "Crash Course Kids · 4 min", gradeFit: "Core Grade 6", support: "Use the short, accessible explanation after students have tested the jar. Pause before examples are classified and require students to justify each decision with evidence.", task: "Before watching, classify two examples from the jar. During the video, collect one idea that improves the class definition of a mixture or solution, then test that definition against an unfamiliar example." },
        ], scenes: [
          { label: "Launch", title: "Build the evidence board", prompt: "Observe the real jar silently, then separate what the class can see from what it is only inferring.", teacherCue: "Protect 8–10 minutes of silent observation and sketching before discussion. Keep at least two competing explanations alive.", time: "20–25 min", learningMode: "Real object · notebook · class talk", studentTask: "Sketch the jar, record six observations, and add two possible inferences with question marks." },
          { label: "Test", title: "Which properties give useful evidence?", prompt: "Rotate through short tests for magnetism, floating, particle size, and solubility. Use results to revise—not merely confirm—your first ideas.", teacherCue: "Set up four stations. Require a before-and-after inference at two stations. The on-screen match is the class consolidation, not the whole task.", time: "35–40 min", learningMode: "Hands-on stations · partner reasoning", studentTask: "Complete four property tests and revise at least two inferences in your notebook." },
          { label: "Learn", title: "Mixture, solution, or something else?", prompt: "Use one short video and the station evidence to strengthen the class model, then test it against unfamiliar examples.", teacherCue: "Pause before examples are explained so students must predict and justify. Give pairs different everyday examples to classify and defend; accept uncertainty when evidence is missing.", time: "35–45 min", learningMode: "Video · partner concept sort · evidence revision", studentTask: "Annotate the class definition and defend two classifications using observable or testable properties." },
          { label: "Synthesize", title: "What do we know—and what is still hidden?", prompt: "Return to the original jar. Build a supported component list and identify what cannot be confirmed without separating it.", teacherCue: "Use the digital method preview only after teams propose tests. End with a gallery walk of notebook claims.", time: "25–30 min", learningMode: "Evidence board · gallery walk · exit claim", studentTask: "Write one claim-evidence-reasoning paragraph and one unanswered question." },
        ] }),
      experience("mixture-toolkit", "Separation toolkit lab", "Why does each separation method work—and when does it fail?", "2 × 55–65 min", "Field lab", {
        kind: "Investigate", auditStatus: "needs-audit", hook: "Teams become experts on one separation method, test it on several mixtures, and teach classmates both its useful property and its limits.", learning: "We are learning that a method works because of a difference in properties, not because it belongs in a memorized sequence.", success: ["I connect a method to the property it uses.", "I can show what passes through or remains.", "I can explain a case in which the method would fail."], vocabulary: ["sieving", "filtration", "magnetism", "decanting", "evaporation", "chromatography"], learningModes: ["Expert-group jigsaw", "Mini investigations", "PhET interactive", "Peer teaching", "Application cards"], guided: "Assign each team a method and two test mixtures. Teams create a three-minute teaching demonstration, then students rotate and collect the limits of every method.", inquiry: "Test sieving, magnetism, skimming or decanting, filtration, chromatography, and evaporation; then choose methods for new real-world cases.", reflection: "What property mattered more than the name of the material?", exit: "Choose a method for a new mixture and name one reason it might not fully work.", materials: ["Method station tubs", "Sieves or screens", "Bagged magnets", "Funnels and filters", "Clear cups", "Sand, gravel, cork, steel, salt water", "Water-soluble markers and coffee filters", "Student notebooks"], teacherPrep: {
          beforeClass: ["Set up six labelled method stations: sieving, bagged magnetism, skimming/decanting, filtration, paper chromatography, and a teacher-managed evaporation demonstration.", "Test the water-soluble marker and filter-paper combination; not every marker separates visibly.", "Prepare two suitable mixtures and one deliberate failure case for each expert group."],
          perGroup: ["One labelled method tub", "Three small test samples", "One tray and waste cup", "One comparison-chart page or notebook spread"],
          displayOrPrint: ["Property → method → result → limitation frame", "Six-method station directions", "Teacher-only property/method key", "No tasting and no student heating reminder"],
          answerKey: ["Sieving uses particle-size differences; it fails when particles are similar in size.", "Magnetism separates a magnetic component; it does not remove non-magnetic dissolved material.", "Skimming/decanting uses floating, settling, or density differences but may leave small particles behind.", "Filtration traps particles larger than the filter pores; dissolved substances pass through.", "Chromatography separates soluble colour components that travel differently with a solvent.", "Evaporation can leave a dissolved solid behind; the liquid is not collected unless a separate condensation system is used."],
          cleanup: ["Keep all work on trays and pour no solids down the sink.", "Collect reusable dry materials and bagged magnets.", "Dispose of wet filter paper and chromatography strips as directed; wipe spills immediately.", "Teacher handles and labels any evaporation dish after students leave."],
          lowPrepAlternative: "Run three teacher demonstrations—sieve, bagged magnet, and filtration—then use the embedded comparison cases for the other methods.",
          offlineRoute: "Print or copy the six station directions and application cases. The core jigsaw, peer teaching, and comparison chart require no web access; omit PhET or use the supplied dissolved-particle explanation.",
        }, misconception: "Each mixture has one correct method. Complex mixtures often require a sequence, and several workable paths may exist.", evidence: "An expert-team demonstration, a six-method comparison chart, and two justified application decisions", projectContribution: "Experience becoming expert on one idea and teaching classmates—an early rehearsal for the later expert-team inquiry.", lessonResources: [
          { scene: 1, type: "Interactive", label: "Sugar and Salt Solutions", url: "https://phet.colorado.edu/en/simulation/sugar-and-salt-solutions", source: "PhET · University of Colorado Boulder", gradeFit: "Supported stretch", support: "Stay on the Macro view first. Use evaporation and concentration; do not assess ions, conductivity, or molarity unless the class asks to extend.", task: "Use evaporation to test the claim that a dissolved substance has disappeared. Record what the model shows and one limitation of the model." },
        ], scenes: [
          { label: "Question", title: "What must be different for separation to work?", prompt: "Compare six mixture problems and predict which property difference could be useful in each.", teacherCue: "Do not teach the method list first. Let teams sort the problems by property and discover that the same method can solve different material combinations.", time: "20–25 min", learningMode: "Card sort · prediction · class model", studentTask: "Sort six mixture cases by the property difference that might make separation possible." },
          { label: "Investigate", title: "Become the expert on one method", prompt: "Test your assigned method on two suitable mixtures and one difficult case. Find its power and its limit.", teacherCue: "Give each team one method. Require a visible demonstration, a property explanation, and an honest failure case.", time: "35–45 min", learningMode: "Hands-on expert groups · PhET option", studentTask: "Gather evidence from three tests and prepare a three-minute teaching demonstration." },
          { label: "Teach", title: "Build the class separation toolkit", prompt: "Teach your method, watch the other demonstrations, and record what each method separates, leaves behind, and cannot do.", teacherCue: "Run this as a jigsaw or station carousel. Peers should ask one challenge question at every station.", time: "45–55 min", learningMode: "Peer teaching · demonstrations · note making", studentTask: "Complete a six-method comparison chart and ask two groups about a limitation." },
          { label: "Apply", title: "Choose a method for a new problem", prompt: "Solve unfamiliar cases such as muddy water, recycling fragments, salt water, and mixed dry foods. Some need more than one step.", teacherCue: "Use the digital application board after the jigsaw. Invite multiple defensible sequences and make students name trade-offs.", time: "25–35 min", learningMode: "Scenario challenge · debate · notebook explanation", studentTask: "Defend two sequences and explain why a tempting alternative would fail." },
        ] }),
      experience("separation-rescue", "Mixture Rescue Challenge", "How much of the mixture can your team recover cleanly?", "2 × 60–70 min", "Field lab", {
        kind: "Investigate", auditStatus: "needs-audit", hook: "Every team receives the same unknown mixture and limited tool station. Teams must plan before opening the sample, recover clean fractions, and improve one weak step after comparing evidence.", learning: "We are designing and evaluating a multi-step separation process from evidence.", success: ["Our sequence is justified by component properties.", "We revise the plan when evidence shows a problem.", "We evaluate purity, recovery, efficiency, safety, and limitations."], vocabulary: ["sieving", "filtration", "magnetism", "evaporation", "purity", "recovery"], learningModes: ["Team planning", "Projected rehearsal", "Hands-on challenge", "Midpoint peer critique", "Evidence-based redesign"], guided: "Keep the record lean but the thinking substantial: one visual plan, one quick sketch of the midpoint problem, one revision, and one final explanation.", inquiry: "Plan, carry out, critique, and improve a separation sequence using a shared material kit and clear success criteria.", reflection: "Which revision produced the biggest improvement, and what evidence supports that?", exit: "Explain the strongest and weakest part of the team process using property, method, result, and limitation.", materials: ["One identical mixture per team", "Trays", "Bagged magnets", "Spoons or mesh skimmers", "Sieves", "Funnels and filter paper", "Clear collection cups", "Plan card and marker", "Goggles", "Overnight evaporation dish managed by the teacher"], teacherPrep: {
          beforeClass: ["For every team, measure the same dry mixture: 10 g gravel, 10 g sand, 5 steel washers or nuts, and 4 cork pieces; provide 50 mL water and 5 g salt separately so teams add them only after the dry-separation plan is approved.", "Test the full sequence once and set identical tool limits at every station.", "Mark a teacher-only shelf for labelled overnight evaporation dishes; students do not heat samples."],
          perGroup: ["One sealed identical dry mixture", "50 mL water and 5 g salt in separate labelled containers", "One tray", "Bagged magnet", "Sieve", "Skimmer or spoon", "Funnel and filter paper", "Five labelled collection cups", "Plan card", "Goggles"],
          displayOrPrint: ["Version 1 plan frame", "Safety approval checkpoint", "Midpoint problem sketch", "Purity / recovery / efficiency / safety criteria"],
          answerKey: ["A defensible efficient sequence removes steel magnetically, then cork by skimming after water is added, then gravel by sieving, sand by filtration, and finally salt by teacher-managed evaporation.", "Other safe sequences may work; assess the property justification, recovered fractions, material loss, and revision evidence.", "Evaporation remains teacher-managed and does not recover the water in this setup."],
          cleanup: ["No recovered material is food-safe or drinkable.", "Strain all solids before sink disposal and follow school procedures for the remaining water.", "Wash hands and wipe wet floors immediately.", "Teacher stores or disposes of evaporation dishes after observation."],
          lowPrepAlternative: "Give teams photos or supplied results from each stage of one identical rescue. Students sequence, diagnose contamination, revise, and evaluate without handling materials.",
          offlineRoute: "Use the printed plan, stage-result cards, and criteria. All required reasoning can be completed hands-on or from the no-lab evidence set without devices.",
        }, misconception: "Finishing every step means the process succeeded. A useful process must also be safe, reasonably efficient, and produce fractions clean enough for the intended purpose.", evidence: "A justified sequence, safe hands-on process, midpoint revision, recovery result, and an evaluation using at least two criteria", projectContribution: "A complete cycle of planning, testing, feedback, revision, and evaluation that expert teams can reuse later.", scenes: [
          { label: "Plan", title: "Design the first separation sequence", prompt: "Inspect the tools and sealed sample. Build a sequence that names the property used at every step and predicts what remains mixed.", teacherCue: "Give teams 12 minutes to plan before opening samples. Approve for safety, not for correctness. Mark each plan as version 1 before testing.", time: "20–25 min", learningMode: "Team planning · teacher conference", studentTask: "Create a movable sequence with a because-statement and predicted result for every step." },
          { label: "Test", title: "Run the rescue—and stop halfway", prompt: "Carry out the plan carefully. Halfway through, sketch or circle one problem, compare with another team, and improve one step.", teacherCue: "Use the projected rehearsal only when a team is stuck. Pause all teams at the midpoint for a five-minute evidence exchange.", time: "45–55 min", learningMode: "Hands-on challenge · peer critique · revision", studentTask: "Collect fractions, sketch one problem, receive peer feedback, and revise one step." },
          { label: "Evaluate", title: "How successful was the process?", prompt: "Inspect the final fractions. Score recovery and purity separately, then identify where material was lost or remained mixed.", teacherCue: "Do not reduce success to a five-point total. Ask teams to compare two criteria and acknowledge trade-offs.", time: "25–30 min", learningMode: "Evidence inspection · criteria scoring · class comparison", studentTask: "Evaluate the process for purity, recovery, efficiency, and safety using specific evidence." },
          { label: "Explain", title: "Defend one decision and critique another", prompt: "Use scientific language to explain the strongest decision, the weakest decision, and what the team would change next.", teacherCue: "Run a short gallery walk or circle debrief. Assign different teams to foreground different methods and limitations.", time: "25–35 min", learningMode: "Gallery walk · oral defence · notebook reflection", studentTask: "Write one claim-evidence-reasoning paragraph and respond to a classmate's question." },
        ] }),
      experience("water-treatment-case", "Where does our water become safe?", "How do local water systems combine separation methods—and what can a classroom model not prove?", "2 × 55–65 min", "Case file", {
        kind: "Apply", auditStatus: "needs-audit", hook: "Students trace water from protected watersheds through Metro Vancouver's system, then investigate why clear-looking water is not automatically safe water.", learning: "We are applying mixture science to a real local system while distinguishing physical separation from disinfection and testing.", success: ["I can order major treatment and supply steps.", "I explain what filtration can and cannot remove.", "I identify at least two limits of a classroom filter model."], vocabulary: ["watershed", "sediment", "filtration", "disinfection", "turbidity", "potable"], learningModes: ["Local video field trip", "Map/article reading", "Treatment-train puzzle", "Filter model", "Public-information design"], guided: "Treat the classroom filter as a model of particle removal only. Never imply that filtered classroom water is safe to drink.", inquiry: "Trace the local system, extract evidence from a video and map, build a treatment train, test a particle filter, and communicate its limits.", reflection: "Why is 'looks clean' a weak conclusion about drinking water?", exit: "Name one process that removes particles, one process with a different job, and one test still needed.", materials: ["Metro Vancouver K–12 water resources", "Water-system map", "Clear bottles or cut filter columns", "Gravel, sand and filter material", "Prepared muddy water", "Collection cups", "Goggles", "Notebook or one-page case file"], teacherPrep: {
          beforeClass: ["Save or print the selected Metro Vancouver map and inquiry pages so the local case survives a connection failure.", "Prepare non-hazardous muddy water from tap water and clean soil or clay only; use no wastewater, pond water, microbes, chemicals, or unknown field samples.", "Wash and pre-cut filter bottles yourself, cover sharp edges, and test one filter column.", "Label every sample and collection cup DO NOT DRINK before students enter."],
          perGroup: ["One stable filter column", "Measured gravel, sand, and filter material", "One small cup of teacher-prepared muddy water", "Two collection cups labelled DO NOT DRINK", "One tray", "Goggles"],
          displayOrPrint: ["Large DO NOT DRINK rule", "Metro Vancouver source/map excerpt", "Treatment-train cards", "Particle removal / disinfection / testing jobs", "Model-limit checklist"],
          answerKey: ["The classroom model can show a change in visible particles or turbidity only.", "A clearer sample is not evidence that microbes or dissolved contaminants have been removed.", "A real drinking-water system also uses source protection, treatment selected for local conditions, disinfection, testing, storage, and monitored delivery.", "Students must never taste or drink either sample."],
          cleanup: ["Collect every sample as non-potable lab water and dispose of it according to school procedures.", "Pour no gravel, sand, or filter solids down the sink.", "Wash hands and disinfect shared surfaces; dry and store reusable equipment."],
          lowPrepAlternative: "Use teacher-provided before/after photographs and turbidity observations from one model. Students still trace the real system, sequence treatment jobs, and correct the unsafe claim.",
          offlineRoute: "Use the saved or printed Metro Vancouver excerpt, map, and treatment cards. Run the particle-filter model or the no-lab evidence set entirely offline.",
        }, misconception: "A classroom sand-and-gravel filter makes water safe to drink. It may reduce visible particles, but it does not establish that microbes or dissolved contaminants are removed.", evidence: "A sourced system diagram, annotated treatment train, filter-model observations, and a public explanation with an explicit safety warning", projectContribution: "A local solutionary-science example connecting physical science, infrastructure, public health, stewardship, and communication.", lessonResources: [
          { scene: 0, type: "Website", label: "Water resources and filtration-plant field trip", url: "https://metrovancouver.org/school-programs/water", source: "Metro Vancouver · produced for Grades 5–12", gradeFit: "Core Grade 6", support: "Show selected chapters rather than the whole resource at once. Pause for route predictions and process-job notes.", task: "Use the official video and map to trace source, treatment, storage, and delivery. Record four system parts, each job, and one question the source does not answer." },
          { scene: 1, type: "Article", label: "Where does my water come from?", url: "https://metrovancouver.org/school-programs/Documents/k-12-inquiry-spark-water-where.pdf", source: "Metro Vancouver · K–12 inquiry spark", gradeFit: "Core Grade 6", support: "Use the map and inquiry questions, not every extension. Model the difference between map evidence and an inference about the school's route.", task: "Infer the likely route from watershed to school, marking map evidence and uncertainty separately." },
        ], scenes: [
          { label: "Trace", title: "Follow one drop to our school", prompt: "Use a local video and system map to trace source, treatment, storage, and delivery. Record evidence rather than copying every detail.", teacherCue: "Pause the video for map predictions. Ask students to distinguish what the source shows from what they infer about their own school.", time: "35–45 min", learningMode: "Local video · map reading · partner case file", studentTask: "Build a sourced route diagram with four stages, three jobs, and one uncertainty." },
          { label: "Sequence", title: "Build a treatment train", prompt: "Order process cards so each stage solves a particular water problem. More than one treatment train may be defensible.", teacherCue: "Include particle removal, disinfection, testing, storage, and source protection. Challenge groups with a changed source-water condition.", time: "30–40 min", learningMode: "Systems puzzle · evidence discussion", studentTask: "Defend the order of a treatment train and explain why filtration alone is insufficient." },
          { label: "Model", title: "What can a classroom filter actually show?", prompt: "Build and test a particle filter. Compare appearance or turbidity before and after, then state what the test cannot establish.", teacherCue: "Use prepared non-hazardous muddy water. Display a prominent do-not-drink rule and require every explanation to include a model limitation.", time: "45–55 min", learningMode: "Hands-on model · observation · redesign", studentTask: "Test one filter design, revise one layer, and compare evidence while keeping the safety warning visible." },
          { label: "Communicate", title: "Correct the dangerous claim", prompt: "Respond to: 'It looks clear, so it is safe to drink.' Create a public explanation that is accurate, concise, and sourced.", teacherCue: "Offer a mini-poster, 60-second announcement, or four-panel Minecraft information kiosk sketch. Peer-check science before design polish.", time: "30–40 min", learningMode: "Media literacy · choice product · peer review", studentTask: "Create and peer-check a public explanation naming filtration, disinfection or testing, and two model limits." },
        ] }),
      experience("place-mixtures-studio", "Learning from place and source", "What changes when knowledge is connected to a specific people and place?", "1–2 × 60 min", "Inquiry studio", {
        kind: "Apply", auditStatus: "needs-audit", hook: "The teacher opens one of the supplied Surrey Schools Indigenous Learning sources about Katzie plant knowledge, cedar harvesting, or land and water care, then names the specific people, place, and source before making a science connection.", learning: "We are learning from a specific source in context and making a careful science connection without treating all First Peoples as one culture.", success: ["I name who the knowledge comes from and the place it belongs to.", "I record only what the source supports.", "I can make a science connection without claiming the two knowledge systems are identical."], vocabulary: ["place-based", "protocol", "knowledge holder", "responsibility"], learningModes: ["District-curated video or PDF", "Close source reading", "Discussion circle", "Two-perspective organizer", "Optional SpacesEDU note"], guided: "Preview the source, context, and permissions before class. Give the source enough time to be learned from; the digital organizer should support close attention, not replace it.", inquiry: "Read, watch, listen to, or learn directly from one supplied source, then distinguish source-supported learning from a separate science connection.", reflection: "What would be lost if this knowledge were reduced to a generic separation-method label?", exit: "Name the source, one learning it supports, and one thing we should not assume.", materials: ["One supplied Surrey Schools Indigenous Learning source", "Projected source-context organizer", "Student notebooks", "Optional school-approved local observation route"], teacherPrep: {
          beforeClass: ["Select one exact Surrey Schools Indigenous Learning source; record its named people, Nation or community, place, purpose, and current sharing guidance.", "Save the approved excerpt or transcript needed for class and prepare exact attribution on the first screen.", "If going outdoors, choose an observation-only route and complete school supervision/accessibility procedures. Do not plan harvesting, tasting, or reenactment."],
          perGroup: ["One approved source excerpt or viewing access", "One source-context organizer or notebook spread", "One two-perspective/limits organizer"],
          displayOrPrint: ["Who shared this? / Nation or community / place / purpose / protocol", "Source evidence / science connection / do-not-assume columns", "Observe only: no harvesting, tasting, or reenactment"],
          answerKey: ["A complete response uses the exact attribution supplied by the chosen source.", "Source-supported learning and the student’s science connection remain visibly separate.", "The source does not stand for all First Peoples, authorize imitation, or make Western and Indigenous knowledge systems identical."],
          cleanup: ["Collect or privately store notes if the selected source includes sharing limits.", "Confirm no student has posted copied media or community knowledge outside the approved destination."],
          lowPrepAlternative: "Project one teacher-previewed excerpt and complete the source/context map as a class; pairs then write one supported learning, one careful connection, and one limit.",
          offlineRoute: "Use the saved excerpt, exact attribution, and paper organizer. No open browsing, AI, or individual device is required.",
        }, misconception: "There is one universal First Peoples method. Knowledge is specific to Nations, places, relationships, and protocols.", evidence: "A correctly attributed source note, specific evidence, a careful science connection, and a clearly stated limit", projectContribution: "One notice and one wonder may be saved to SpacesEDU if useful; this is not a required final-topic choice.", lessonResources: [
          { scene: 0, type: "PDF", label: "Indigenous plants to locate on nature walks", url: "https://surreyschoolsone.ca/indigenous/resource-post/?permalink=indigenous-plants-to-locate-on-nature-walks", source: "Surrey Schools Indigenous Learning · knowledge shared by Katzie members Roma Leon, Kayleigh Leon, and Paula James", gradeFit: "Core Grade 6", support: "Use for observation and attribution. Do not turn the resource into unsupervised harvesting, tasting, or expanded medicinal claims.", studentBoundary: "Observe only: do not harvest, taste, or reenact plant use. Learn from and credit the named Katzie members and source rather than imitating what is shared.", task: "Record who shared the knowledge, identify one source-supported plant relationship, and separate it from your own outdoor observation." },
          { scene: 0, type: "Video", label: "Cedar harvesting", url: "https://surreyschoolsone.ca/indigenous/resource-post/?permalink=cedar-harvesting", source: "Surrey Schools Indigenous Learning · MOA identifies Jessica Silvey as Sechelt/Squamish and Robert Joe as Sechelt · filmed along a river in Sechelt on the Sunshine Coast", gradeFit: "Core Grade 6", support: "Preview the full video and name the speakers, Nations, and place exactly as its MOA context page does. MOA states that only Indigenous people may harvest cedar this way in keeping with traditional protocols and beliefs. Students learn from the documentation; they do not reenact the harvest.", studentBoundary: "Learn from and credit the source rather than imitating it. Only Indigenous people may harvest cedar this way, in keeping with the protocols and beliefs named by the source. Do not reenact the harvest.", task: "Record the speakers, affiliations, place, purpose, and protocol before collecting three source-supported details about material, method, or responsibility." },
          { scene: 0, type: "Website", label: "Local Nations source collection", url: "https://surreyschoolsone.ca/indigenous/resources/local-nations/", source: "Surrey Schools Indigenous Learning", gradeFit: "Teacher preview", support: "Use the collection to move to a specific Katzie, Kwantlen, or Semiahmoo public source when the chosen connection requires Nation-specific context.", task: "Confirm the Nation, creator or organization, place, purpose, and any sharing guidance before teaching." },
        ], scenes: [
          { label: "Prepare", title: "Start with the source—not a generic claim", prompt: "Identify who created or shared the source, the Nation or community, the place, and any guidance about sharing.", teacherCue: "Do not begin until a specific, appropriate source is selected. Spend time locating the source on a map and establishing context.", time: "15–25 min", learningMode: "Context map · source introduction", studentTask: "Record exact attribution, place, purpose, and any protocol or sharing guidance." },
          { label: "Learn", title: "Stay with the source", prompt: "Read, watch, listen, or learn directly. Collect evidence about method, purpose, relationships, and responsibility.", teacherCue: "Plan at least two encounters with the source: first for the whole meaning, second for evidence. A blank organizer box is better than a guess.", time: "35–50 min", learningMode: "Close viewing/reading/listening · paired evidence notes", studentTask: "Collect three source-supported details and mark the exact moment, phrase, image, or section that supports each." },
          { label: "Connect", title: "Place two ways of knowing beside each other", prompt: "Separate what the source teaches, a science idea that may connect, and what neither perspective should be made to claim.", teacherCue: "Use two-eyed seeing carefully: place perspectives beside one another without forcing equivalence or translating all knowledge into Western categories.", time: "25–35 min", learningMode: "Discussion circle · two-perspective organizer", studentTask: "Write one sourced learning, one science connection, and one limit or responsibility." },
          { label: "Respond", title: "Return the learning respectfully", prompt: "Choose a brief response that shows accurate listening: a source note, thank-you question, concept sketch, or optional SpacesEDU notice and wonder.", teacherCue: "Follow the source's protocols. Do not require public posting or turn community knowledge into a generic final-project topic.", time: "20–30 min", learningMode: "Choice response · reflection · optional portfolio", studentTask: "Create a concise response with exact attribution and one question that does not ask the source to represent all peoples." },
        ] }),
    ],
  },
  {
    id: "forces-motion",
    number: "03",
    title: "Forces & Motion",
    subtitle: "From everyday motion to safer impacts",
    icon: "→",
    color: "#25766c",
    soft: "#deeeea",
    question: "How can Newton's laws help us reduce harm when motion changes suddenly?",
    bigIdea: "Newton's three laws of motion describe the relationship between force and motion.",
    content: ["Newton's three laws", "Balanced and unbalanced forces", "Daily physical activity", "Gravity"],
    assessment: "Design, test, and explain a delivery pod that protects a raw egg, using Newton's laws, measured evidence, and visible revision.",
    resources: ["Force readiness check", "Newton's laws station cards", "NASA and PhET learning links", "Crash Lab data sheet", "Human-movement force analysis", "Delivery Pod design pack"],
    lessons: [
      experience("force-sprint", "Forces readiness check", "Which force ideas are ready to use—and which need a quick review?", "1 × 45 min", "Readiness check", {
        kind: "Explore", auditStatus: "classroom-ready", evidenceLevel: "Practice", evidenceSubjects: ["Science"],
        hook: "Students answer six visual questions before any explanation appears, then use only the clinics their evidence shows they need.",
        learning: "We are checking familiar force ideas so the class can spend time investigating rather than repeating secure knowledge.",
        success: ["I distinguish motion direction from force direction.", "I draw a labelled force arrow on the object receiving the force.", "I use evidence to decide whether forces are balanced."],
        vocabulary: ["force", "force arrow", "balanced", "unbalanced", "net force"],
        learningModes: ["Silent vote", "Visual diagnosis", "Mini whiteboard explanation", "Targeted small-group clinic"],
        priorKnowledge: ["Objects can speed up, slow down, stop, or change direction", "A push or pull can change motion"],
        guided: "Students first show A, B, C, or D on fingers or mini whiteboards. Record the response, then reveal the explanation. Use missed items to form short clinics instead of reteaching everything.",
        inquiry: "Complete six diagnostic scenarios, repair one explanation, and create a new force-arrow example for a classmate.",
        reflection: "Which idea changed after the evidence appeared?",
        exit: "Draw one object, one labelled force arrow, and one sentence explaining whether its motion must change.",
        materials: ["Embedded readiness check", "Mini whiteboards or half-sheets", "Three clinic cards"],
        teacherPrep: {
          beforeClass: ["Open the six-question check and test full-screen visibility.", "Prepare A–D response cards or mini whiteboards.", "Open the three on-screen clinic cards: arrows, balanced forces, same force/different mass."],
          displayOrPrint: ["One-object force-arrow example", "Balanced/unbalanced comparison", "Exit-ticket frame"],
          answerKey: ["A force arrow begins on the receiving object, points in the force direction, and names the interaction.", "Balanced forces give a net force of zero; this does not require the object to be at rest.", "With the same applied force, a smaller mass has a larger change in motion than a larger mass."],
          lowPrepAlternative: "Run the six questions as a whole-class vote and use only the on-screen clinics. Students respond on scrap paper.",
        },
        misconception: "A force arrow shows the direction an object is moving. It shows a force acting on a named object; motion and force can point in different directions.",
        evidence: "Six diagnostic responses, one repaired explanation, and one original force-arrow example",
        projectContribution: "Practice only: force diagrams students will reuse in later investigations and design explanations.",
        scenes: [
          { label: "Check", title: "What do we already know?", prompt: "Vote before the explanation appears. Keep your first idea visible so you can notice revision.", teacherCue: "Do not coach before the vote. Record patterns, not student names.", time: "15–20 min", learningMode: "Visual diagnosis · silent vote", studentTask: "Six independent first responses" },
          { label: "Review", title: "Use only the clinics we need", prompt: "Join the clinic that matches the evidence, then repair one missed explanation.", teacherCue: "Keep secure students working on original examples while you lead one short clinic at a time.", time: "15 min", learningMode: "Targeted clinic · peer explanation", studentTask: "One corrected explanation and one labelled model" },
          { label: "Decide", title: "Ready to investigate?", prompt: "Use the class evidence to choose the next move, then create one question that would reveal a force pattern.", teacherCue: "Five or six secure ideas means move on. Lower readiness means use the foundations stations with extra modelling.", time: "10 min", learningMode: "Metacognition · question design", studentTask: "An exit model and investigation question" },
        ],
      }),
      experience("force-patterns-lab", "Newton's laws in motion", "What patterns appear when force, mass, friction, and interactions change?", "2 × 60 min", "Field lab", {
        kind: "Investigate", auditStatus: "classroom-ready", evidenceLevel: "Checkpoint", evidenceSubjects: ["Science", "Mathematics"],
        spacesPrompt: "Optional checkpoint: post one station graph or photo and explain the force pattern it reveals, including one limitation.",
        hook: "A cart, balloon rocket, coin, and tug-of-war can look unrelated. Teams collect evidence to decide whether the same three motion patterns explain all four.",
        learning: "We are building Newton's laws from observed patterns before attaching names or formulas.",
        success: ["I use repeated evidence to describe a force-and-motion pattern.", "I distinguish balanced from unbalanced forces.", "I explain action–reaction forces as interactions on two different objects.", "I name what a classroom model leaves out."],
        vocabulary: ["inertia", "net force", "mass", "friction", "action–reaction pair"],
        learningModes: ["Hands-on station rotation", "Measurement and graphing", "NASA video", "PhET challenge", "Expert teaching"],
        priorKnowledge: ["Force arrows", "Balanced and unbalanced forces", "Repeated measurements"],
        guided: "Run four stations with one evidence question each. Students first describe the pattern in everyday language, then connect it to a numbered law. Keep F = ma as a relationship, not an algebra requirement.",
        inquiry: "Rotate through inertia, mass/acceleration, friction, and interaction stations; compare data; then defend which law best explains a new case.",
        reflection: "Which station made one of Newton's laws feel less like a rule to memorize and more like a pattern?",
        exit: "Choose one unfamiliar motion and explain it with a force diagram, a Newton pattern, and a model limitation.",
        materials: ["Toy carts or low-friction objects", "Washers or identical masses", "Ramps and metre sticks", "Balloons, string, straws, and tape", "Coins and index cards", "Spring scales if available", "Station evidence sheets"],
        teacherPrep: {
          beforeClass: ["Build and test one balloon-rocket line above head level or replace it with rolling-chair push pairs.", "Prepare one cart with changeable mass and a consistent ramp release point.", "Set out coin/card inertia tests and a friction surface comparison.", "Open the NASA second-law clip and PhET Net Force screen."],
          perGroup: ["One station evidence sheet or notebook page", "Pencil", "Safety glasses only if required by local practice"],
          displayOrPrint: ["Four station question cards", "Force-arrow conventions", "Newton pattern cards without law numbers for the first round"],
          answerKey: ["First-law pattern: motion stays the same unless an unbalanced interaction changes it.", "Second-law pattern: a larger net force produces a larger change in motion; with the same force, more mass changes motion less.", "Third-law pattern: interacting objects exert forces on each other in opposite directions; the forces act on different objects.", "Friction is an interaction that can oppose sliding motion and change the net force."],
          cleanup: ["Deflate balloons and collect broken pieces immediately.", "Keep rolling paths away from feet and doorways.", "Return masses before carts are stored."],
          lowPrepAlternative: "Use the embedded station evidence, NASA clip, and PhET Net Force/Motion screens as a class investigation. Pairs still graph and explain supplied results.",
        },
        misconception: "Newton's laws are three separate facts. They are connected patterns that can describe the same event from different angles.",
        evidence: "Four station records, one simple graph, one law-to-case defence, and one model limitation",
        projectContribution: "A reusable evidence pattern for explaining why a later design changes motion or impact.",
        lessonResources: [
          { scene: 0, type: "Video", label: "STEMonstrations: Newton's Second Law", url: "https://plus.nasa.gov/video/stemonstrations-newtons-2nd-law-of-motion/", source: "NASA+ · 2:28 · TV-G", gradeFit: "Core Grade 6", support: "Pause before each astronaut demonstration and have students predict which object will change motion more.", task: "Record the pattern shown when the same kind of push acts on objects with different mass." },
          { scene: 2, type: "Interactive", label: "Forces and Motion: Basics", url: "https://phet.colorado.edu/en/simulations/forces-and-motion-basics", source: "PhET · University of Colorado Boulder", gradeFit: "Core Grade 6", support: "Use only Net Force, Motion, and Friction. Work through the three assigned challenges rather than free play first.", task: "Create one balanced case, one unbalanced case, and one same-force/different-mass case. Pause after each so the class can explain it; sketch only if useful." },
        ],
        scenes: [
          { label: "Predict", title: "Four events—three hidden patterns", prompt: "Watch the quick cases. Group them by what stays the same, what changes, and which objects interact.", teacherCue: "Accept descriptive grouping before naming laws. Ask what evidence would separate competing explanations.", time: "25–30 min", learningMode: "Demonstration · prediction · NASA video", studentTask: "A before-and-after grouping with one reason" },
          { label: "Investigate", title: "Rotate through the force stations", prompt: "At each station, change one condition, repeat the test, and record a pattern—not just a result.", teacherCue: "Use a visible timer. Require a force diagram at two stations and measured evidence at two.", time: "55–65 min", learningMode: "Hands-on stations · measurement", studentTask: "Four station records and one graph" },
          { label: "Test", title: "Can a digital model reproduce the pattern?", prompt: "Direct three PhET challenges on the class screen. Before each move, predict what will happen; after it moves, say or sketch what the model gets right and leaves out.", teacherCue: "Control one projected model. Invite a student director to choose each approved slider move only after the class predicts.", time: "35–40 min", learningMode: "Whole-class PhET challenge · model comparison", studentTask: "Three spoken, board, or notebook model cases and one limitation" },
          { label: "Teach", title: "Make one law useful", prompt: "Teach a new case using an object, force arrows, evidence, and one Newton pattern. Your classmates should do some thinking.", teacherCue: "Assign different cases to teams. Require one prediction question before the explanation.", time: "25–30 min", learningMode: "Expert teaching · peer check", studentTask: "A two-minute interactive explanation" },
        ],
      }),
      experience("crash-lab", "Crash Lab", "How does padding change the force during a sudden stop?", "2 × 60 min", "Digital investigation", {
        kind: "Investigate", auditStatus: "classroom-ready", evidenceLevel: "Checkpoint", evidenceSubjects: ["Science", "Mathematics"],
        spacesPrompt: "Checkpoint option: post the comparison graph and a claim–evidence–reasoning explanation of how padding changed the stop.",
        hook: "A passenger, helmet, or package cannot stop instantly without a force. Students investigate why a longer stopping time can reduce the largest force.",
        learning: "We are using repeated evidence to explain why a longer, less sudden stop can reduce peak force without making force disappear.",
        success: ["I make a hypothesis with a scientific reason.", "I change one variable and run repeated trials.", "I graph and compare stopping-time and peak-force evidence.", "I identify a model limitation."],
        vocabulary: ["stopping time", "peak force", "variable", "average", "evidence"],
        learningModes: ["Slow-motion phenomenon", "Digital controlled investigation", "Data table and graph", "Claim–evidence–reasoning conference"],
        priorKnowledge: ["Inertia", "Net force changes motion", "Fair testing and averages"],
        guided: "Run one shared projected model. Students direct each trial, record the values on paper or the board, compare stopping time and peak force, graph class averages, and critique the model before concluding.",
        inquiry: "Compare no padding, thin foam, and thick foam while mass and speed stay fixed; use repeated results to decide which explanation is best supported.",
        reflection: "What does the model show clearly, and what real-world safety factors does it leave out?",
        exit: "Use a measured result to explain how foam changed stopping time and peak force.",
        materials: ["One shared projector", "Embedded Crash Lab with clearly labelled simulated output", "Notebook or plain-paper nine-trial table", "Graph paper", "Mini whiteboards", "Optional foam/cart demonstration"],
        teacherPrep: {
          beforeClass: ["Run all three digital conditions once and clear the stored results.", "Prepare a nine-trial table and paired stopping-time/peak-force graph axes.", "Choose one familiar safety example: helmet, playground surface, seat belt, or package."],
          perGroup: ["One notebook or plain-paper data table", "Graph paper", "Calculator optional"],
          displayOrPrint: ["Locked-variable checklist", "CER scaffold", "Model-limit prompt"],
          answerKey: ["As padding thickness increases in the model, stopping time increases and peak force decreases.", "Padding does not remove the force or the change in motion; it changes how the stop happens over time and distance.", "A strong conclusion cites the repeated pattern or average, not one trial.", "The displayed values are simulated model outputs, not measurements from a physical force sensor.", "The model omits material behaviour, angles, body shape, real sensors, and many other safety factors."],
          lowPrepAlternative: "Use the supplied nine-trial class dataset on the projector. Students graph, compare, and explain on paper without individual devices.",
        },
        misconception: "Padding removes force. Foam deforms so the stop happens over more time and distance, reducing the largest force in this model.",
        evidence: "A hypothesis, nine-trial table, comparison graph, CER conclusion, and model limitation",
        projectContribution: "A complete fair-test and data-analysis rehearsal for the Delivery Pod explanation.",
        lessonResources: [
          { scene: 0, type: "Website", label: "Newton's laws of motion", url: "https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/newtons-laws-of-motion/", source: "NASA Glenn Research Center", gradeFit: "Supported stretch", support: "Use the first-law diagram and plain-language summary only; skip equations and aerospace calculations.", task: "Connect inertia to the passenger or package continuing forward during a sudden stop." },
        ],
        resource: { label: "Explore PhET Forces and Motion after the investigation", url: "https://phet.colorado.edu/en/simulations/forces-and-motion-basics", note: "University of Colorado Boulder · optional extension after the required analysis" },
        scenes: [
          { label: "Notice", title: "A passenger does not stop by magic", prompt: "Predict belt versus no belt, replay the stop, and identify the interaction that changes the passenger's motion.", teacherCue: "Name inertia only after students describe the observed pattern.", time: "25–30 min", learningMode: "Phenomenon · source reading · force diagram", studentTask: "A prediction, observation, and labelled force diagram" },
          { label: "Investigate", title: "One changed variable, nine simulated trials", prompt: "Help direct the class model: keep mass and speed the same, change only the padding, and copy each result into your table.", teacherCue: "Run the model from one projector. Explicitly identify the values as simulated outputs, not physical sensor measurements. Do not reveal the final comparison until every condition has evidence.", time: "40–45 min", learningMode: "Projected model · repeated dataset", studentTask: "A paper nine-trial table and calculated averages" },
          { label: "Explain", title: "Graph how the stop changes", prompt: "Compare stopping time and peak force together. Explain the mechanism rather than only naming the safest bar.", teacherCue: "Build the class graph, then replay all three animations side by side.", time: "35–40 min", learningMode: "Graphing · animation analysis · partner talk", studentTask: "A two-variable comparison graph and mechanism notes" },
          { label: "Conclude", title: "Make the data do the talking", prompt: "Write or record a claim, cite repeated evidence, explain why it fits, and name one model limit.", teacherCue: "Conference on the evidence and reasoning before students polish the response.", time: "25–30 min", learningMode: "CER response · conference · optional SpacesEDU", studentTask: "A checkpoint-ready CER explanation" },
        ],
      }),
      experience("movement-forces", "Forces in human movement", "How do forces help a body start, stop, jump, land, and change direction?", "1–2 × 60 min", "Case file", {
        kind: "Apply", auditStatus: "needs-audit", evidenceLevel: "Practice", evidenceSubjects: ["Science", "Physical & Health Education", "English Language Arts"],
        hook: "Slow-motion movement clips reveal that a jump is not simply 'muscles moving the body': the ground, gravity, friction, and body position all matter.",
        learning: "We are applying force patterns to movement without grading athletic ability or asking anyone to perform beyond their comfort.",
        success: ["I identify the object and interaction for each force arrow.", "I explain how the ground can push on a person.", "I compare a stable and unstable landing using evidence.", "I communicate one movement cue accurately and respectfully."],
        vocabulary: ["gravity", "friction", "support force", "stability", "interaction"],
        learningModes: ["Slow-motion video analysis", "Optional safe movement station", "Force-frame annotation", "Coach–scientist explanation"],
        priorKnowledge: ["Newton's third-law interactions", "Force arrows", "Balanced and unbalanced forces"],
        guided: "Offer standing, seated, object-only, and video-analysis routes. Assess the quality of the explanation, never speed, strength, coordination, body shape, or athletic performance.",
        inquiry: "Analyse a jump, landing, wheelchair push, ball kick, or quick direction change frame by frame; identify interactions and revise one coaching claim.",
        reflection: "How can a movement cue be scientifically useful without pretending every body moves in exactly the same way?",
        exit: "Use two force arrows and one Newton pattern to explain one moment of movement.",
        materials: ["Teacher-selected slow-motion clips", "Movement case cards", "Floor tape", "Soft balls optional", "Tablets for slow motion optional", "Force-frame organizer"],
        teacherPrep: {
          beforeClass: ["Choose two short, inclusive movement clips with clear start/stop or landing moments.", "Prepare non-participation-equivalent video and object-analysis routes.", "Mark a safe observation zone; no maximum-effort jumping or competition is required."],
          perGroup: ["One force-frame organizer", "Two contrasting case cards", "Device optional"],
          displayOrPrint: ["Person/ground interaction pair", "Stable-landing evidence checklist", "Respectful movement-language reminder"],
          answerKey: ["During a jump, the person pushes the ground downward and the ground pushes the person upward; these forces act on different objects.", "Gravity acts downward throughout the jump.", "Friction can help prevent slipping during a start, stop, or change of direction.", "A landing explanation should use observable evidence and acknowledge body and context variation."],
          cleanup: ["Return soft equipment and remove floor tape only if it creates a trip edge."],
          lowPrepAlternative: "Use the embedded still-frame cases only. Students annotate and narrate rather than filming or performing movement.",
        },
        misconception: "Only muscles create movement. Muscles matter, but motion also depends on interactions with the ground, equipment, air, and gravity.",
        evidence: "An annotated movement sequence, two interaction pairs, and one revised science-based coaching explanation",
        projectContribution: "A cross-curricular application showing how the same force patterns operate in sport, dance, play, and mobility.",
        lessonResources: [
          { scene: 1, type: "Video", label: "Defining Gravity", url: "https://www.youtube.com/watch?v=ljRlB6TuMOU", source: "Crash Course Kids · 3:12", gradeFit: "Core Grade 6", support: "Pause before the falling examples. Ask students to draw gravity on the moving person or object rather than merely repeat the definition.", task: "Add gravity to the force frame and explain why it still acts while an object is moving upward." },
        ],
        scenes: [
          { label: "Observe", title: "Freeze the instant when motion changes", prompt: "Compare two slow-motion cases. Describe what changes before naming the force.", teacherCue: "Use neutral, observable language and offer non-participation routes from the start.", time: "20–25 min", learningMode: "Slow-motion observation · notice/wonder", studentTask: "Three frame-by-frame observations" },
          { label: "Map", title: "Which object pushes which?", prompt: "Add force arrows to the person or object, then pair every interaction with the force on the other object.", teacherCue: "Check that each arrow starts on the receiving object. Use the ground interaction to repair 'the ground does nothing.'", time: "30–35 min", learningMode: "Force-frame annotation · Crash Course Kids clip", studentTask: "Two annotated frames and two interaction pairs" },
          { label: "Test", title: "Change one movement condition safely", prompt: "Compare an object, seated, standing, or video case. Change one condition and collect evidence about stability, friction, or stopping.", teacherCue: "Approve the route and keep intensity low. Science evidence, not performance, is assessed.", time: "30–40 min", learningMode: "Choice investigation · observation", studentTask: "A safe comparison and one evidence note" },
          { label: "Communicate", title: "Turn a slogan into an explanation", prompt: "Repair a vague coaching claim so it names the interaction, evidence, and limits.", teacherCue: "Invite audio, diagram, paragraph, or demonstration-with-narration responses.", time: "20–25 min", learningMode: "Media literacy · choice response", studentTask: "A revised coaching explanation for a Grade 6 audience" },
        ],
      }),
      experience("safer-impact-studio", "Delivery Pod STEM Challenge", "How high can your pod fall and still protect its egg—and how will you prove why?", "3 × 60 min", "Design studio", {
        kind: "Assess", auditStatus: "needs-audit", evidenceLevel: "Portfolio Highlight", evidenceSubjects: ["Science", "ADST", "Mathematics", "English Language Arts"],
        spacesPrompt: "Portfolio highlight: post the team design photo or Minecraft model, results table, and an individual explanation of one design decision, evidence, revision, and next step.",
        hook: "Teams receive the same material budget and a sealed raw egg. Success requires both survival evidence and a convincing scientific explanation.",
        learning: "We are applying force and impact evidence through a fair design cycle, visible revision, and clear communication.",
        success: ["Our design follows the common constraints.", "We use Crash Lab evidence to justify a feature.", "We measure tests and make one visible revision.", "Each person can explain the science and a limitation."],
        vocabulary: ["constraint", "prototype", "criterion", "revision", "trade-off"],
        learningModes: ["Design sketch", "Team build", "Measured drop tests", "Height-ladder challenge", "Individual explanation", "Optional Minecraft model"],
        priorKnowledge: ["Inertia and impact force", "Stopping time and padding", "Fair testing", "Evidence-based revision"],
        guided: "Keep materials identical, require one short evidence-based sketch, and protect most time for building/testing. The public tournament is optional; every team receives a measured result and revision opportunity.",
        inquiry: "Design one pod, complete a controlled practice drop, inspect evidence, revise one feature, and enter the height ladder or equivalent measured test.",
        reflection: "Which result changed your team's thinking, and what would you test next?",
        exit: "Explain one feature using force, stopping time or motion evidence—and name what the test cannot prove.",
        materials: ["One identical material kit per team", "One raw egg sealed in a sandwich bag", "Metre stick or tape measure", "Marked drop zone and tray/tarp", "Digital scale optional", "Paper towel, disinfectant, and handwashing supplies", "Design/result sheet"],
        teacherPrep: {
          beforeClass: ["Choose a controlled drop location and maximum safe height.", "Create identical labelled kits and a clear material budget.", "Place each egg in a sealed sandwich bag; nothing attaches directly to the shell.", "Prepare a result board that records height, survival, design feature, and revision—not team rankings alone."],
          perGroup: ["Common kit", "Sealed egg", "One-page design/result sheet", "Pencil", "Cleanup bag"],
          displayOrPrint: ["Three criteria and four constraints", "Drop-height ladder", "Individual SpacesEDU reflection prompt", "Science explanation exemplar and non-example"],
          answerKey: ["Strong explanations connect a feature to a mechanism: longer stopping time/distance, reduced motion before impact, load spreading, or secure restraint.", "A surviving egg does not prove the design is always safe; it is evidence from a limited number of tests.", "A useful revision responds to observed damage, movement, deformation, or measured results.", "Team products require individual evidence for assessment."],
          cleanup: ["Stop testing immediately when an egg cracks or leaks.", "Keep eggs sealed, discard broken eggs according to school procedures, disinfect the tray, and wash hands.", "Retrieve dropped pods only after the drop zone is closed."],
          lowPrepAlternative: "Use reusable plastic eggs containing clay or a water-filled zip bag as the payload. Measure deformation or leakage, then keep the same explanation and revision requirements.",
        },
        misconception: "The winning pod is automatically the best scientific design. A strong design claim also needs fair conditions, repeated or comparable evidence, mechanism, and limitations.",
        evidence: "Team prototype and results, one visible revision, and an individual evidence-based explanation",
        projectContribution: "A complete portfolio highlight and a possible Forces topic for later expert-team inquiry.",
        scenes: [
          { label: "Frame", title: "A fair challenge, not a mystery craft", prompt: "Inspect the criteria, constraints, common kit, and evidence from Crash Lab. Choose the mechanism your first design will use.", teacherCue: "Show one strong explanation and one decorative non-example. Keep the launch under fifteen minutes.", time: "15 min", learningMode: "Design brief · evidence transfer", studentTask: "A labelled sketch with one mechanism claim" },
          { label: "Build", title: "Build the claim into the pod", prompt: "Construct one design. Every material must have a job connected to the sketch.", teacherCue: "Conference using: feature → expected motion change → evidence. Do not design for teams.", time: "35–40 min", learningMode: "Collaborative construction · teacher conference", studentTask: "A constraint-compliant prototype" },
          { label: "Test", title: "One practice drop, one visible revision", prompt: "Measure the practice height, observe what happened, and change one feature for a stated reason.", teacherCue: "Require before/after evidence. A surviving egg can still reveal movement, deformation, or a weak attachment.", time: "25–30 min", learningMode: "Measured test · observation · revision", studentTask: "Practice result and documented revision" },
          { label: "Challenge", title: "Climb the height ladder safely", prompt: "Enter the measured challenge or equivalent test. Record every result, including useful failures.", teacherCue: "Use a fixed starting height and increments appropriate to the location. Celebrate evidence, explanation, and revision—not only height.", time: "30–40 min", learningMode: "Height ladder · class data", studentTask: "Final measured result and class comparison" },
          { label: "Explain", title: "Prove more than survival", prompt: "Use the design, data, and revision to explain what likely helped, what remains uncertain, and what you would test next.", teacherCue: "The team may share one product, but every student completes an individual explanation or recording.", time: "25–30 min", learningMode: "Individual explanation · peer feedback · SpacesEDU", studentTask: "Portfolio-ready individual explanation" },
        ],
      }),
    ],
  },
  {
    id: "earth-space",
    number: "04",
    title: "Earth & Space",
    subtitle: "A truthful cosmic tour",
    icon: "✦",
    color: "#4f65a2",
    soft: "#e6e9f5",
    question: "How can we show our place in the universe without fooling people about scale and motion?",
    bigIdea: "The solar system is part of the Milky Way, which is one of billions of galaxies.",
    content: ["Scale and structure of the universe", "Age of the universe", "Solar-system position and motion", "First Peoples perspectives regarding celestial phenomena", "Extreme environments and Canadian exploration technologies"],
    assessment: "Create an evidence-based cosmic tour that communicates scale, structure, motion, and model limits.",
    resources: ["NASA image journey", "Cosmic scale comparator", "Orbit and rotation model", "Exhibit audit"],
    lessons: [
      experience("cosmic-zoom", "You are here", "Where exactly are we in the universe—and how can a model show it honestly?", "2 × 60 min", "Launch", {
        kind: "Explore",
        auditStatus: "needs-audit",
        hook: "Students receive five cosmic-address cards in the wrong order, then test their first model against NASA evidence and a 45-metre distance walk.",
        learning: "We are building Earth's nested cosmic address and using more than one model because no single model can show size, distance, structure, and time accurately at once.",
        success: ["I can order Earth, solar system, Milky Way, and observable universe.", "I can use a scale to place several planets at defensible distances.", "I can explain what a model shows well and what it distorts.", "I can use light-travel time to explain why looking far away also means looking into the past."],
        vocabulary: ["solar system", "galaxy", "universe", "scale", "light-year"],
        guided: "Keep the opening card sort uncorrected until students inspect a trusted source. In the scale walk, emphasize that the distances are scaled but the marker sizes are deliberately enlarged. End with a cosmic timeline so the unit addresses both scale and the age of the universe.",
        inquiry: "Build and revise three complementary models: a nested cosmic address, a distance-only solar-system walk, and a 13.8-metre timeline of the universe.",
        reflection: "Why do scientists need several different models for the same universe?",
        exit: "Write Earth's cosmic address and one precise warning for each model: what is accurate, what is enlarged, and what is left out.",
        materials: ["Five cosmic-address cards per group", "45 m tape or pre-measured hallway/field", "Planet distance markers", "13.8 m string or paper strip", "Metre sticks", "Notebook or mini whiteboard"],
        teacherPrep: {
          beforeClass: ["Choose a safe 45 m hallway, gym edge, or outdoor route.", "Mark 0 m, 0.6 m, 1.1 m, 1.5 m, 2.3 m, 7.8 m, 14.3 m, 28.7 m, and 45.0 m.", "Prepare a 13.8 m string or paper timeline; one metre represents one billion years.", "Open the NASA Space Place galaxy and light-year pages and preview only the sections named in the lesson."],
          perGroup: ["Cosmic-address cards: school/community, Earth, solar system, Milky Way, observable universe", "One recording sheet or science notebook", "One set of planet labels"],
          displayOrPrint: ["Distance scale: 1 m = 100 million km", "Cosmic timeline event cards", "Model-audit sentence frame"],
          answerKey: ["Nested order: school/community → Earth → solar system → Milky Way → observable universe.", "Distance markers from the Sun: Mercury 0.6 m; Venus 1.1 m; Earth 1.5 m; Mars 2.3 m; Jupiter 7.8 m; Saturn 14.3 m; Uranus 28.7 m; Neptune 45.0 m.", "At this distance scale the Sun would be about 1.4 cm wide and Earth about 0.13 mm wide, so classroom planet markers must be labelled as enlarged.", "Timeline: universe begins at 0 m; Milky Way forms roughly within the first few metres; Sun and Earth form near 9.2–9.3 m; modern humans occupy far less than the final millimetre."],
          cleanup: ["Collect reusable labels and string.", "Keep the travel route clear; do not block exits or active hallways."],
          lowPrepAlternative: "Use a 4.5 m tabletop strip at one tenth the distances and have students place cards rather than walking the route. Keep the same model-limit discussion.",
        },
        misconception: "A familiar poster can show planet sizes and distances accurately at the same time. At classroom scale, one of those relationships is almost always distorted.",
        evidence: "A revised cosmic address, measured distance model, cosmic timeline annotation, and two accurate model-limit statements",
        projectContribution: "Students practise turning an enormous idea into a truthful model; they may save a space question without choosing their final expert-team topic.",
        learningModes: ["Card sort", "NASA reading", "Outdoor or hallway scale walk", "Timeline model", "Partner explanation"],
        priorKnowledge: ["Earth is a planet", "The Sun is a star", "Basic metric measurement"],
        vocabularySupport: {
          "solar system": { meaning: "The Sun and all objects held in orbit around it.", example: "Earth is one planet in our solar system." },
          galaxy: { meaning: "A huge collection of stars, gas, dust, and star systems held together by gravity.", example: "Our solar system is in the Milky Way galaxy." },
          universe: { meaning: "All space, time, matter, and energy.", example: "The observable universe is the part whose light has had time to reach us." },
          scale: { meaning: "A rule connecting a model measurement to the real measurement.", example: "In our walk, 1 m represents 100 million km." },
          "light-year": { meaning: "The distance light travels in one year, not a length of time.", example: "A galaxy 2 million light-years away is seen as it was 2 million years ago." },
        },
        lessonResources: [
          { scene: 0, type: "Article", label: "What Is a Galaxy?", url: "https://spaceplace.nasa.gov/galaxy/", source: "NASA Space Place", gradeFit: "Core Grade 6", task: "Find two sentences that prove a solar system is smaller than a galaxy, then revise the group card sort.", support: "Read the short answer and the diagram captions; the full page is optional." },
          { scene: 1, type: "Website", label: "Solar System Facts", url: "https://science.nasa.gov/solar-system/solar-system-facts/", source: "NASA Science", gradeFit: "Supported stretch", task: "Confirm where our solar system sits in the Milky Way and record one fact that changes your mental picture.", support: "Use the introduction and Our Place in the Milky Way section; do not assign the entire page." },
          { scene: 2, type: "Interactive", label: "Eyes on the Solar System", url: "https://eyes.nasa.gov/apps/solar-system/", source: "NASA/JPL", gradeFit: "Supported stretch", task: "Compare the compressed screen view with the 45 m walk. Identify one distance or size the screen must distort.", support: "Demonstrate navigation first and work in pairs; the goal is model critique, not visiting every object." },
          { scene: 3, type: "Article", label: "What Is a Light-Year?", url: "https://spaceplace.nasa.gov/light-year/", source: "NASA Space Place", gradeFit: "Core Grade 6", task: "Explain why a telescope can show both far-away space and the past.", support: "Read through the Looking Back in Time section and stop before the more advanced examples if needed." },
          { scene: 3, type: "Article", label: "What Is the Big Bang?", url: "https://spaceplace.nasa.gov/big-bang/", source: "NASA Space Place", gradeFit: "Core Grade 6", task: "Place the age of the universe on the timeline and identify one piece of evidence described in the article.", support: "Use it as a supported partner reading; distinguish expansion from an explosion at one location." },
        ],
        resource: { label: "Explore NASA's Solar System", url: "https://science.nasa.gov/solar-system/", note: "NASA Science · optional image and fact collection after the core investigation" },
        scenes: [
          { label: "Address", title: "Put our cosmic address in order", prompt: "Arrange the five places from smallest to largest. Keep your first answer visible so NASA evidence can make you revise it.", teacherCue: "Give groups 3–4 minutes before opening the source. Ask what contains what; do not reveal the order first.", time: "25–30 min", learningMode: "Card sort · supported reading · revision", studentTask: "A before-and-after cosmic address with one quoted or paraphrased piece of NASA evidence" },
          { label: "Locate", title: "Our solar system is not at the centre", prompt: "Use a trusted map and description to locate the solar system in the Milky Way, then explain why most galaxy diagrams cannot be photographs from outside our galaxy.", teacherCue: "Locate the Orion Spur away from the centre. Ask how scientists build a model of a galaxy they are inside.", time: "25–30 min", learningMode: "Source reading · image reasoning · discussion", studentTask: "A labelled Milky Way sketch and one inference about how the model was constructed" },
          { label: "Measure", title: "Walk a distance-only solar system", prompt: "Place each planet at a measured distance from the Sun. Then catch the trick: are the planet markers also the correct size?", teacherCue: "Use the prepared marks to reduce setup. At Earth, reveal that the real scaled Earth would be about 0.13 mm across.", time: "55–65 min", learningMode: "Measurement · movement · model audit", studentTask: "Planet placements, one checked distance calculation, and a visible model-limit warning" },
          { label: "Time", title: "Turn 13.8 billion years into 13.8 metres", prompt: "Place cosmic events on a timeline. Then use light-travel time to explain why distant space is also ancient evidence.", teacherCue: "Keep dates approximate at this level. The important pattern is the immense time before the solar system and the tiny fraction occupied by humans.", time: "50–60 min", learningMode: "Timeline model · partner reading · explanation", studentTask: "A timeline annotation and a two-sentence explanation linking distance, light, and the past" },
        ] }),
      experience("space-motion-lab", "Patterns in motion", "How can the same motion look different from Earth and from space?", "3 × 60 min", "Field lab", {
        kind: "Investigate",
        auditStatus: "needs-audit",
        hook: "Students separate what a sky time-lapse shows from what it proves, then use bodies, light, data, and a digital model to test competing explanations.",
        learning: "We are using rotation, revolution, orbit, gravity, and viewpoint to explain repeating patterns without confusing observation with explanation.",
        success: ["I can distinguish an observation from an explanation.", "I can model how rotation causes day and night.", "I can compare planetary day and year data and identify an anomaly.", "I can explain how viewpoint changes apparent motion and name a model limit."],
        vocabulary: ["rotation", "revolution", "orbit", "viewpoint", "apparent motion"],
        guided: "Begin with evidence rather than vocabulary. Use the human model before the digital model, graph planetary motion data, and ask students to change viewpoint before choosing an explanation.",
        inquiry: "Collect or examine sky-pattern evidence, build a physical Sun–Earth model, compare planetary data, and use a digital model to test which explanation fits all observations.",
        reflection: "Which idea became clearer only after you changed viewpoint or changed models?",
        exit: "Explain day and night, distinguish a day from a year, and name one thing the model exaggerates or leaves out.",
        materials: ["Lamp or strong flashlight", "Globe or foam ball with a Surrey marker", "Planet day/year data cards", "Graph paper or spreadsheet", "Optional metre stick and chalk for shadow observations", "Notebook"],
        teacherPrep: {
          beforeClass: ["Darken one part of the room enough for the lamp model.", "Place a removable Surrey marker on the globe or ball.", "Print or display the planet day/year data table.", "Preview the CSA movement instructions and choose only the Earth–Sun steps needed for this lesson.", "If doing shadow observations, choose a safe fixed location and never direct students to look at the Sun."],
          perGroup: ["One ball or globe", "One light source shared between groups as available", "Planet data cards", "Graph paper or device"],
          displayOrPrint: ["Observation / explanation two-column organizer", "Rotation / revolution comparison", "Planet motion data table", "Model-limit checklist"],
          answerKey: ["Day and night: Earth rotates once in about 24 hours, carrying Surrey into and out of sunlight.", "A year: Earth revolves around the Sun once in about 365.25 days.", "Orbit is the curved path; revolution is one trip around another object.", "Planet-data patterns: Jupiter has a short day but a long year; Venus and Mercury are major outliers; distance from the Sun relates more clearly to year length than to day length.", "The apparent daily path of the Sun is mainly explained by Earth's rotation, not a daily orbit of the Sun around Earth."],
          cleanup: ["Turn off and cool lamps before storage.", "Return balls, markers, and cards to labelled bins.", "For outdoor shadow work, establish boundaries and remind students never to look directly at the Sun."],
          lowPrepAlternative: "Run one whole-class lamp-and-globe model and use the embedded data explorer rather than printing cards or going outdoors.",
        },
        misconception: "Day and night are caused by Earth's revolution around the Sun. They result from Earth's rotation; revolution explains the length of a year.",
        evidence: "An observation/explanation sort, physical-model diagram, planetary-data comparison, and viewpoint-based explanation",
        projectContribution: "Students practise using several forms of evidence and may save a motion question without committing to a final inquiry topic.",
        learningModes: ["Time-lapse observation", "Human model", "Lamp-and-globe investigation", "Data graphing", "NASA interactive", "Scientific explanation"],
        priorKnowledge: ["Light travels in straight lines", "Earth is roughly spherical", "Reading a simple graph"],
        vocabularySupport: {
          rotation: { meaning: "Spinning around an axis.", example: "Earth's rotation creates the daily light-and-dark cycle." },
          revolution: { meaning: "Travelling once around another object.", example: "One Earth revolution around the Sun takes about a year." },
          orbit: { meaning: "A curved path around another object caused by motion and gravity.", example: "Earth's orbit is the path it follows around the Sun." },
          viewpoint: { meaning: "The place from which an observation is made.", example: "From Earth, the Sun appears to cross the sky." },
          "apparent motion": { meaning: "Movement an object seems to have from a particular viewpoint.", example: "The Sun's daily apparent motion is mainly caused by Earth's rotation." },
        },
        lessonResources: [
          { scene: 0, type: "Teacher-selected source", label: "Local sky time-lapse or a sequence of shadow photographs", source: "Teacher-provided local evidence", gradeFit: "Core Grade 6", task: "Record only what changes position, direction, or shadow length; keep explanations in a separate column.", support: "Use 3–5 still frames if video access is unreliable. Never require direct Sun viewing." },
          { scene: 1, type: "Website", label: "Move like the Earth and the Moon", url: "https://www.asc-csa.gc.ca/eng/youth-educators/activities/move-like-the-earth-and-the-moon.asp", source: "Canadian Space Agency", gradeFit: "Core Grade 6", task: "Use the Earth–Sun movement steps to check your group's physical model, then identify one way your model is not to scale.", support: "Use the rotation and Earth-revolution sections; Moon phases and eclipses are optional extensions, not core tasks." },
          { scene: 2, type: "Article", label: "How Long Is One Day on Other Planets?", url: "https://spaceplace.nasa.gov/days/", source: "NASA Space Place", gradeFit: "Core Grade 6", task: "Graph the six comparable planets, then explain why Mercury and Venus need a different graph scale.", support: "The page models moving from paragraph to table to graph, making it suitable for a Science–Math connection." },
          { scene: 3, type: "Interactive", label: "Eyes on the Solar System", url: "https://eyes.nasa.gov/apps/solar-system/", source: "NASA/JPL", gradeFit: "Supported stretch", task: "Change viewpoint and compare what appears to move. Capture one observation and one explanation without treating the animation as perfectly to scale.", support: "Demonstrate controls first; pairs investigate one assigned viewpoint rather than exploring without a purpose." },
        ],
        scenes: [
          { label: "Observe", title: "The sky seems to turn—but what does that prove?", prompt: "Study a time-lapse or shadow sequence. Record only visible changes first, then list at least two possible explanations.", teacherCue: "Protect the distinction between observation and interpretation. Accept competing explanations until the physical model provides more evidence.", time: "35–45 min", learningMode: "Visual evidence · classification · discussion", studentTask: "Two-column observation/explanation notes and one question the evidence cannot answer alone" },
          { label: "Model", title: "Carry Surrey from day into night", prompt: "Use a fixed light and rotating Earth. Track Surrey through sunrise, noon, sunset, and midnight, then draw the view from space and the view from the ground.", teacherCue: "Keep the Sun fixed for this short model. Make students rotate the correct direction and narrate when Surrey enters and leaves light.", time: "55–65 min", learningMode: "Human model · lamp investigation · dual-view diagram", studentTask: "A four-position day/night diagram and a cause-and-effect explanation" },
          { label: "Compare", title: "Every planet has a day and a year—but not like ours", prompt: "Graph planetary rotation and revolution data. Find a pattern, an outlier, and one question the data raises.", teacherCue: "Use separate graphs for day length and year length. Invite students to decide how to handle extreme values rather than hiding them.", time: "55–65 min", learningMode: "Data jigsaw · graphing · anomaly hunt", studentTask: "Two graphs or tables, one supported pattern, one anomaly, and one new question" },
          { label: "Viewpoint", title: "Change where you stand; change what appears to move", prompt: "Compare the same system from Earth and from space. Choose the explanation that fits both views and identify a limit of every model used.", teacherCue: "Return to the opening time-lapse and ask which explanation now fits more evidence. Do not use revolution as the cause of seasons here.", time: "45–55 min", learningMode: "Digital model · claim-evidence-reasoning · reflection", studentTask: "A corrected explanation of apparent motion using rotation, viewpoint, and one named model limit" },
        ] }),
      experience("cosmic-exhibit-studio", "Cosmic exhibit studio", "Can you teach one cosmic idea clearly without making the model lie?", "3 × 60 min", "Inquiry studio", {
        kind: "Assess",
        auditStatus: "needs-audit",
        hook: "Teams audit an impressive-looking space display that contains five hidden errors, then build one small museum stop that is more truthful and more useful.",
        learning: "We are communicating one cosmic idea with accurate structure, evidence, citations, and an honest statement of model limits.",
        success: ["Our exhibit teaches one focused idea.", "Every important claim is supported by a trusted source.", "Our visual accurately shows structure or motion and labels deliberate distortions.", "Peer feedback leads to a visible revision."],
        vocabulary: ["model", "indirect evidence", "limitation", "citation"],
        guided: "Use the audit to co-create success criteria. Approve each team's one-sentence learning goal before research begins. Require an evidence note and model warning before decoration or animation.",
        inquiry: "Choose one bounded cosmic story, research it with two trusted sources, build a physical, digital, or Minecraft museum stop, peer-audit it, revise, and teach it in two minutes.",
        reflection: "Which revision most improved truthfulness or understanding—and what evidence caused that revision?",
        exit: "Point to one deliberate distortion, explain why it was necessary, and name the source that keeps the exhibit accurate.",
        materials: ["Source shortlist", "Planning page or notebook", "Physical, slide, video, or Minecraft creation tools", "Peer-audit checklist", "Citation/model-warning cards"],
        teacherPrep: {
          beforeClass: ["Choose whether teams may build physically, digitally, in Minecraft, or from a limited menu.", "Open the NASA and CSA source collections and bookmark the approved starting pages.", "If using a CSA Indigenous resource, preserve its named Knowledge Keeper, Nation or community, purpose, and sharing context; do not create a generic Indigenous sky-story category.", "Prepare one planning page and one peer-audit checklist per team.", "Set a visible 2-minute presentation limit and a revision deadline."],
          perGroup: ["One exhibit plan", "Access to at least two approved sources", "One model-warning card", "One peer-audit form"],
          displayOrPrint: ["Five-error poster audit", "Focused topic examples and over-broad non-examples", "Exhibit requirements", "Peer-audit checklist", "Two-minute teaching structure"],
          answerKey: ["Poster errors: solar-system location near galaxy centre; compressed planet distances without warning; daily Sun-around-Earth claim; certainty about the whole universe's shape/edge; missing sources and limitations.", "A focused learning goal names one relationship: for example, why distant light is old, how rotation changes our sky view, or why one solar-system model cannot preserve size and distance.", "Minimum source standard: two approved sources, source names visible, important numbers checked across sources when possible.", "Minimum model warning: specifically name what is enlarged, compressed, sped up, slowed down, simplified, or unknown."],
          cleanup: ["Store physical builds by team or photograph them before recycling.", "Confirm digital sharing permissions before students publish anything outside the class.", "Keep all final inquiry decisions flexible; this exhibit is a unit rehearsal, not the final expert-team assignment."],
          lowPrepAlternative: "Teams revise one provided flawed poster on paper, add sources and model warnings, and deliver a two-minute gallery talk instead of creating a new exhibit.",
        },
        misconception: "A realistic-looking model is automatically accurate. A strong model serves a clear purpose, cites evidence, and states exactly what it distorts.",
        evidence: "Focused question, source notes, draft exhibit, peer audit, visible revision, two-minute teaching, and individual reflection",
        projectContribution: "A rehearsal for expert-team teaching and one optional Earth & Space topic to keep in the SpacesEDU Topic Bank; it does not lock students into a final topic.",
        learningModes: ["Error hunt", "Source evaluation", "Team planning", "Physical/digital/Minecraft creation", "Peer critique", "Museum teaching"],
        priorKnowledge: ["Nested cosmic address", "Scale and model limitations", "Rotation and revolution", "Basic source attribution"],
        vocabularySupport: {
          model: { meaning: "A simplified representation used to explain or test an idea.", example: "A scale walk models distance but enlarges the planet markers." },
          "indirect evidence": { meaning: "Evidence gathered from effects, signals, or measurements rather than direct contact.", example: "Light from distant galaxies is indirect evidence about their past." },
          limitation: { meaning: "Something a model or source cannot show or explain accurately.", example: "The animation speeds up a year so we can see it in seconds." },
          citation: { meaning: "A clear note showing where information, data, or an image came from.", example: "Image: NASA/JPL; planet data: NASA Space Place." },
        },
        lessonResources: [
          { scene: 0, type: "Website", label: "Solar System Facts", url: "https://science.nasa.gov/solar-system/solar-system-facts/", source: "NASA Science", gradeFit: "Supported stretch", task: "Use the page to verify or reject two claims in the flawed exhibit. Record the heading where the evidence appears.", support: "Assign different claims to different teams; students do not need to read the whole page." },
          { scene: 1, type: "Website", label: "Universe", url: "https://spaceplace.nasa.gov/menu/space/", source: "NASA Space Place", gradeFit: "Core Grade 6", task: "Choose one article that can support a focused exhibit question, then write the exact idea it will help you teach.", support: "Use the menu as a curated starting point, not as permission to browse randomly." },
          { scene: 1, type: "Website", label: "Educational videos", url: "https://www.asc-csa.gc.ca/eng/youth-educators/educational-videos.asp", source: "Canadian Space Agency", gradeFit: "Core Grade 6", task: "Filter for Grades 4–6 and select one short clip only if it adds evidence or a useful visual your other source lacks.", support: "Teacher previews the chosen clip; students must name its purpose before watching." },
          { scene: 1, type: "Website", label: "Indigenous ways of knowing", url: "https://www.asc-csa.gc.ca/eng/youth-educators/indigenous-ways-of-knowing.asp", source: "Canadian Space Agency · named First Nations, Inuit and Métis contributors", gradeFit: "Teacher preview", task: "Choose one bounded, named resource only when it serves the exhibit question. Record its creator or Knowledge Keeper, Nation or community, purpose, and what the source supports.", support: "Preview the exact linked item and retain its attribution and sharing context. This doorway is not a generic collection of interchangeable ‘Indigenous sky stories.’", studentBoundary: "Credit the named contributor and community. Do not imitate, combine, or retell knowledge beyond the permission and context supplied by that exact resource." },
          { scene: 1, type: "Website", label: "Canadian space milestones", url: "https://www.asc-csa.gc.ca/eng/about/milestones.asp", source: "Canadian Space Agency", gradeFit: "Supported stretch", task: "Select one Canadian technology or exploration milestone, explain the problem it addressed, and compare what changed before and after it.", support: "Assign a bounded date or technology rather than the whole timeline. Students verify the milestone with the CSA entry and name one effect or limitation." },
          { scene: 2, type: "Website", label: "NASA Image and Video Library", url: "https://images.nasa.gov/", source: "NASA", gradeFit: "Supported stretch", task: "Choose one accurately captioned image and record its title, credit, and what it can—and cannot—prove.", support: "Search using the approved topic phrase; require the original caption and credit rather than copying an unlabelled image." },
        ],
        scenes: [
          { label: "Audit", title: "Find the five beautiful mistakes", prompt: "Inspect the display before opening the answers. Classify each problem as structure, scale, motion, evidence, or a missing warning.", teacherCue: "Teams mark the poster independently, then defend one choice. Reveal explanations only after every category has been discussed.", time: "45–55 min", learningMode: "Visual audit · evidence check · discussion", studentTask: "A five-part audit with corrections and the source needed to verify each one" },
          { label: "Focus", title: "Choose one story worth teaching", prompt: "Turn a broad space topic into one learning goal your audience can understand in two minutes, then locate two approved sources that serve different purposes.", teacherCue: "Conference with each team before creation. Reject topics such as 'the universe' until they become one relationship or evidence question.", time: "50–60 min", learningMode: "Question narrowing · source jigsaw · conference", studentTask: "One-sentence learning goal, two source notes, and a plan naming the visual evidence" },
          { label: "Build", title: "Build the explanation before the decoration", prompt: "Create the core model, citation, and 'This model distorts…' warning. Ask another team to test whether the explanation works before polishing it.", teacherCue: "Require the evidence and warning checkpoint midway. Physical, slides, video, or Minecraft are all acceptable when the format helps teach the idea.", time: "70–90 min", learningMode: "Team creation · mid-build check · peer test", studentTask: "A teachable draft containing one accurate model, two citations, and one specific model warning" },
          { label: "Teach", title: "Peer-audit, revise, and open the museum", prompt: "Use the checklist on another exhibit, make one visible revision, and teach your museum stop in two minutes. Save a possible topic only if it still interests you.", teacherCue: "Collect the before/after revision and one individual reflection. Do not use this activity to lock final expert teams or topics yet.", time: "60–70 min", learningMode: "Peer critique · revision · museum walk · reflection", studentTask: "Completed peer audit, revised exhibit, two-minute teaching, and optional Space topic-bank entry" },
        ] }),
    ],
  },
];

export const scienceLessons = scienceUnits.flatMap((unit) =>
  unit.lessons.map((item) => ({
    ...item,
    unitId: unit.id,
    unitTitle: unit.title,
    unitColor: unit.color,
    unitSoft: unit.soft,
  })),
);
