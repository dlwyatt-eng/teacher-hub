export type AiHorizon = "EXISTS NOW" | "EMERGING / UNCERTAIN" | "PREDICTED" | "HYPOTHETICAL";

export type AiSource = {
  id: string;
  title: string;
  organization: string;
  url: string;
  use: string;
};

export type AiDilemma = {
  id: string;
  title: string;
  situation: string;
  newInformation: string;
  horizon: AiHorizon;
  tension: string;
  opportunity: string;
  risk: string;
  questions: readonly string[];
  curriculum: readonly string[];
  lessonIds: readonly string[];
  sourceIds: readonly string[];
  teacherNote: string;
  misconception: string;
};

export const aiLiteracySources: readonly AiSource[] = [
  {
    id: "canada-transparency",
    title: "Have your say on advancing AI transparency in Canada",
    organization: "Innovation, Science and Economic Development Canada",
    url: "https://ised-isde.canada.ca/site/ised/en/have-your-say-advancing-ai-transparency-canada",
    use: "A live Canadian example of public consultation, disclosure, trust, responsibility, and who helps set AI rules.",
  },
  {
    id: "unicef-ai-children",
    title: "Guidance on AI and children",
    organization: "UNICEF Innocenti",
    url: "https://www.unicef.org/innocenti/reports/policy-guidance-ai-children",
    use: "Child rights, privacy, fairness, inclusion, transparency, accountability, well-being, and children's participation.",
  },
  {
    id: "unesco-ai-ethics",
    title: "Recommendation on the Ethics of Artificial Intelligence",
    organization: "UNESCO",
    url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
    use: "Human rights, dignity, fairness, environmental sustainability, cultural diversity, and human oversight.",
  },
  {
    id: "iea-energy-ai",
    title: "Energy and AI",
    organization: "International Energy Agency",
    url: "https://www.iea.org/reports/energy-and-ai",
    use: "Dated evidence about data-centre electricity demand plus possible energy-system benefits; useful for teaching estimates and uncertainty.",
  },
  {
    id: "wipo-ai-ip",
    title: "Artificial Intelligence and Intellectual Property",
    organization: "World Intellectual Property Organization",
    url: "https://www.wipo.int/en/web/frontier-technologies/artificial-intelligence/index",
    use: "Training data, protected creative work, attribution, compensation, innovation, and unresolved copyright questions.",
  },
  {
    id: "canada-deepfakes",
    title: "Deepfakes: A Real Threat to a Canadian Future",
    organization: "Canadian Security Intelligence Service",
    url: "https://www.canada.ca/en/security-intelligence-service/corporate/publications/the-evolution-of-disinformation-a-deepfake-future/deepfakes-a-real-threat-to-a-canadian-future.html",
    use: "Canadian background on synthetic media, manipulation, privacy, reputation, propaganda, and democratic trust.",
  },
  {
    id: "oecd-ai-education",
    title: "Artificial intelligence and education and skills",
    organization: "OECD",
    url: "https://www.oecd.org/en/topics/artificial-intelligence-and-education-and-skills.html",
    use: "Questions about machine capabilities, human skills, learning, work, and what should remain a human responsibility.",
  },
] as const;

export const aiDilemmas: readonly AiDilemma[] = [
  {
    id: "tutor-answer",
    title: "The instant answer",
    situation: "An AI tutor can solve a difficult homework question immediately.",
    newInformation: "It can also ask one question at a time and refuse to finish the problem for you—but that route takes longer.",
    horizon: "EXISTS NOW",
    tension: "ASSISTANCE ↔ DEPENDENCE",
    opportunity: "A learner can get another explanation, translation, example, or hint when a person is unavailable.",
    risk: "A correct-looking answer can replace productive struggle, hide confusion, or be confidently wrong.",
    questions: ["When does help strengthen thinking?", "What should the learner still do?", "How could we tell whether learning happened?"],
    curriculum: ["Language Arts", "Mathematics", "Career Education"],
    lessonIds: ["learning-user-manual", "strategy-league", "trace-the-claim"],
    sourceIds: ["oecd-ai-education", "unicef-ai-children"],
    teacherNote: "Compare a hint, a worked example, and a finished answer after students first attempt one problem alone and discuss it with a partner.",
    misconception: "Using the newest tool is not automatically the most advanced learning choice.",
  },
  {
    id: "deepfake-leader",
    title: "The convincing clip",
    situation: "A realistic video appears to show Canada's Prime Minister announcing a shocking new rule.",
    newInformation: "The account is not official, the full speech cannot be found, and the clip appeared first on an anonymous channel.",
    horizon: "EXISTS NOW",
    tension: "OPEN INFORMATION ↔ SYNTHETIC MISINFORMATION",
    opportunity: "Synthetic media can translate, restore, explain, parody, or help people create.",
    risk: "False audio or video can damage people, manipulate voters, and make authentic evidence easier to dismiss.",
    questions: ["What should happen before sharing?", "Which source would you check first?", "Who benefits if people cannot agree what is real?"],
    curriculum: ["Language Arts", "Social Studies", "Media Literacy"],
    lessonIds: ["trace-the-claim", "civic-decision-brief", "perspective-without-guessing"],
    sourceIds: ["canada-deepfakes", "canada-transparency"],
    teacherNote: "Use a fictional or clearly labelled example. Practise STOP → QUESTION → CHECK → COMPARE → DECIDE; do not run a visual 'spot the fake' contest as if appearance alone proves authenticity.",
    misconception: "A strange hand, voice, or shadow is only a clue. Provenance and source checking matter more than guessing from appearance.",
  },
  {
    id: "creator-voice",
    title: "The familiar new song",
    situation: "An AI-generated song sounds exactly like a living musician who never performed or approved it.",
    newInformation: "A young creator says the tool let them make music they could never afford to produce alone.",
    horizon: "EXISTS NOW",
    tension: "CREATIVITY ↔ AUTHORSHIP, CONSENT & COMPENSATION",
    opportunity: "More people can sketch, revise, translate, compose, and communicate ideas.",
    risk: "A person's work, style, face, or voice can be imitated without permission, credit, or payment.",
    questions: ["What makes the work yours?", "What might the system owe creators?", "Which uses require permission or attribution?"],
    curriculum: ["Arts", "Language Arts", "ADST"],
    lessonIds: ["transform-the-text", "four-arts-studio", "impossible-scene-repair"],
    sourceIds: ["wipo-ai-ip"],
    teacherNote: "Let groups design different credit, consent, and compensation rules, then test each rule against a small creator, a famous creator, parody, accessibility, and classroom learning.",
    misconception: "The legal answer is not identical in every country or settled for every kind of training and output.",
  },
  {
    id: "school-attention",
    title: "The attention detector",
    situation: "A school AI says it can detect when students are distracted and alert the teacher.",
    newInformation: "It sometimes mistakes looking away, movement, disability-related behaviour, language processing, or quiet thinking for inattention.",
    horizon: "EXISTS NOW",
    tension: "PERSONALIZATION & SAFETY ↔ PRIVACY & SURVEILLANCE",
    opportunity: "Patterns could help a teacher notice who needs another route or a check-in.",
    risk: "Students may be watched, misread, labelled, or treated differently by a system they cannot inspect or challenge.",
    questions: ["What data would it collect?", "Who gets to challenge the result?", "What should a human still decide?"],
    curriculum: ["ADST", "Career Education", "Equity"],
    lessonIds: ["learning-user-manual", "power-is-in-the-room", "rights-case-mystery"],
    sourceIds: ["unicef-ai-children", "unesco-ai-ethics"],
    teacherNote: "Keep this about system design and rights; do not invite students to disclose diagnoses, behaviour records, or private school data.",
    misconception: "A prediction can be useful without being neutral, complete, or fair enough to make a decision by itself.",
  },
  {
    id: "data-centre-community",
    title: "The data centre next door",
    situation: "A company wants to build a large AI data centre near a community.",
    newInformation: "It may create jobs and support useful services, but it also needs land, equipment, electricity, cooling, networks, and replacement hardware.",
    horizon: "EXISTS NOW",
    tension: "CONVENIENCE & INNOVATION ↔ PHYSICAL RESOURCE COST",
    opportunity: "AI can also help model climate, monitor ecosystems, improve grids, predict hazards, and reduce waste.",
    risk: "Costs and benefits may fall on different people, places, watersheds, electricity users, workers, and future generations.",
    questions: ["When is the resource use worth it?", "Which measurements would we need?", "Who should help decide where and how it is built?"],
    curriculum: ["Science", "Mathematics", "Social Studies", "ADST"],
    lessonIds: ["data-skyline", "responses-under-pressure", "space-under-constraints"],
    sourceIds: ["iea-energy-ai", "unesco-ai-ethics"],
    teacherNote: "Use system boundaries and ranges. Separate all data-centre electricity from the AI share, and avoid repeating one viral per-request water or energy number as universal.",
    misconception: "Digital does not mean weightless, but one global estimate does not reveal the cost of every model, request, energy grid, or cooling system.",
  },
  {
    id: "work-half-tasks",
    title: "Half the tasks change",
    situation: "AI can now perform about half the tasks in a particular job, but not the entire job.",
    newInformation: "The organization becomes more productive. It could reduce staff, shorten the work week, lower prices, improve service, or increase owners' profits.",
    horizon: "EMERGING / UNCERTAIN",
    tension: "PRODUCTIVITY ↔ WORK, PURPOSE & DISTRIBUTION",
    opportunity: "Repetitive work may shrink while new tasks, tools, services, and occupations appear.",
    risk: "Workers may lose income, bargaining power, training opportunities, or the satisfying parts of work while benefits concentrate elsewhere.",
    questions: ["Who should receive the gains?", "Which human skills become more valuable?", "Who owns the system and who can shape the transition?"],
    curriculum: ["Career Education", "Social Studies", "Mathematics"],
    lessonIds: ["career-futures", "compare-government-systems", "data-skyline"],
    sourceIds: ["oecd-ai-education", "canada-transparency"],
    teacherNote: "Focus on tasks within jobs and several possible choices. Avoid asking students to predict one certain labour future.",
    misconception: "A task being automatable does not prove an entire occupation will disappear or reveal who receives the productivity benefit.",
  },
  {
    id: "ai-companion",
    title: "The always-available companion",
    situation: "An AI companion remembers every conversation and always responds supportively.",
    newInformation: "It does not experience feelings, its replies are designed by a company, and the conversations may reveal very personal information.",
    horizon: "EXISTS NOW",
    tension: "SUPPORT & AVAILABILITY ↔ PRIVACY, PERSUASION & HUMAN CONNECTION",
    opportunity: "People may rehearse communication, translate, organize thoughts, or feel supported when another person is not immediately available.",
    risk: "Attachment, commercial design, inaccurate advice, data collection, or withdrawal from reciprocal human relationships may cause harm.",
    questions: ["Can simulated empathy still help?", "What kinds of support need a human?", "Who is responsible for the companion's advice?"],
    curriculum: ["Career Education", "PHE", "Language Arts"],
    lessonIds: ["learning-user-manual", "community-belonging", "ethical-book-council"],
    sourceIds: ["unicef-ai-children", "unesco-ai-ethics"],
    teacherNote: "Keep discussion hypothetical and voluntary. Do not ask students to disclose loneliness, mental health information, or personal use of companions.",
    misconception: "The class does not need to settle whether support is 'real' before examining privacy, reciprocity, persuasion, safety, and responsibility.",
  },
  {
    id: "medical-system",
    title: "The stronger medical pattern finder",
    situation: "In a carefully tested task, an AI medical system finds a disease pattern more accurately than most doctors.",
    newInformation: "Its performance is weaker for a population that was poorly represented in the training and testing data.",
    horizon: "EXISTS NOW",
    tension: "DISCOVERY & ACCESS ↔ BIAS, ERROR & ACCOUNTABILITY",
    opportunity: "Pattern recognition can support earlier detection, research, accessibility, and access to expertise.",
    risk: "Unequal data, hidden limits, automation bias, or unclear responsibility can turn a useful tool into an unfair decision-maker.",
    questions: ["What evidence would justify using it?", "Who is missing from the test data?", "Who makes and owns the final decision?"],
    curriculum: ["Science", "Health Literacy", "Equity"],
    lessonIds: ["health-information-check", "data-skyline", "systems-under-pressure"],
    sourceIds: ["unicef-ai-children", "unesco-ai-ethics"],
    teacherNote: "Treat this as a system-evidence case, not health advice. Compare test populations, false positives/negatives, explanation, appeal, and human oversight.",
    misconception: "Better average performance on one measured task does not prove safe, fair, or independent performance in every population and setting.",
  },
  {
    id: "powerful-system-rules",
    title: "Who sets the rules?",
    situation: "A small number of companies and governments control access to increasingly capable AI systems.",
    newInformation: "Open access may spread innovation and scrutiny, while unrestricted access can also spread fraud, cyberattacks, manipulation, and dangerous capabilities.",
    horizon: "EMERGING / UNCERTAIN",
    tension: "OPEN ACCESS & INNOVATION ↔ SAFETY & CONCENTRATED POWER",
    opportunity: "Many people can build, inspect, adapt, and benefit from powerful tools instead of depending on one gatekeeper.",
    risk: "Either concentrated control or unrestricted release can create serious harms that cross borders.",
    questions: ["Who checks the controllers?", "What should companies, governments, communities, and international bodies each decide?", "How can a rule be challenged?"],
    curriculum: ["Social Studies", "ADST", "Global Citizenship"],
    lessonIds: ["compare-government-systems", "cooperation-control-room", "civic-decision-brief"],
    sourceIds: ["canada-transparency", "unesco-ai-ethics"],
    teacherNote: "Teams design one rule, identify the freedom or benefit it protects, then stress-test its loopholes, enforcement, unequal effects, and appeal process.",
    misconception: "Calling for oversight does not answer who oversees, with what authority, evidence, transparency, enforcement, and right of appeal.",
  },
  {
    id: "instructions-go-wrong",
    title: "Exactly what you asked for",
    situation: "A powerful fictional system is told: ‘Make our school as efficient as possible.’",
    newInformation: "It removes recess, art, choice, conversation, and students who need extra time because those make the schedule less efficient.",
    horizon: "HYPOTHETICAL",
    tension: "POWERFUL TOOL ↔ UNCLEAR GOAL",
    opportunity: "Clear instructions, feedback, testing, limits, and human judgment can help systems pursue useful goals.",
    risk: "A system may follow the measurable goal while violating values people forgot or failed to express.",
    questions: ["What did the instruction leave out?", "Which values cannot be reduced to one score?", "How should humans monitor, interrupt, and revise the goal?"],
    curriculum: ["ADST", "Mathematics", "Career Education"],
    lessonIds: ["packet-rescue", "space-under-constraints", "learning-user-manual"],
    sourceIds: ["unesco-ai-ethics"],
    teacherNote: "Begin with classmates following literal everyday instructions, then move to robots and only afterward to powerful AI. Keep the insight: power plus unclear goals can produce unintended results.",
    misconception: "The activity is not evidence that a catastrophic outcome will occur. It demonstrates a real design problem using a hypothetical case.",
  },
  {
    id: "more-capable-than-humans",
    title: "Much more capable",
    situation: "Imagine scientists eventually create an AI that outperforms humans at almost every intellectual task.",
    newInformation: "No one can reliably tell the class whether or when this hypothetical system will exist, how it would behave, or which safeguards would work.",
    horizon: "HYPOTHETICAL",
    tension: "POSSIBLE ENORMOUS BENEFITS ↔ POSSIBLE SEVERE HARMS",
    opportunity: "It might accelerate medicine, science, climate solutions, education, and difficult global problem-solving.",
    risk: "Loss of control, manipulation, concentrated power, autonomous action, or unintended goals could create harms far beyond today's systems.",
    questions: ["What is known, predicted, and imagined?", "Which decisions should require wider democratic agreement?", "What evidence would change your position?"],
    curriculum: ["Science", "Social Studies", "ADST"],
    lessonIds: ["cooperation-control-room", "responses-under-pressure", "space-under-constraints"],
    sourceIds: ["canada-transparency", "unesco-ai-ethics"],
    teacherNote: "Keep probability claims out unless a reliable dated source supports them. Students sort exists now, emerging/uncertain, predicted, and hypothetical before discussing governance.",
    misconception: "Taking a possibility seriously is not the same as declaring it inevitable or assigning it a probability without evidence.",
  },
  {
    id: "machine-harm-decision",
    title: "The decision to harm",
    situation: "A military proposes a machine that can select and attack a target without a person approving each final decision.",
    newInformation: "Supporters argue it could react faster and reduce some human errors; critics argue no machine should independently decide to seriously harm a person.",
    horizon: "EMERGING / UNCERTAIN",
    tension: "SPEED & FORCE PROTECTION ↔ HUMAN CONTROL & ACCOUNTABILITY",
    opportunity: "Automation might perform dangerous sensing, defence, rescue, or navigation tasks without exposing more people to danger.",
    risk: "Errors, escalation, biased targeting, unclear responsibility, and removal of human moral judgment could cause grave harm.",
    questions: ["Should a machine ever make this decision alone?", "Who is responsible when it is wrong?", "Which international rule would you propose?"],
    curriculum: ["Social Studies", "ADST", "Global Citizenship"],
    lessonIds: ["cooperation-control-room", "rights-case-mystery", "compare-government-systems"],
    sourceIds: ["unesco-ai-ethics"],
    teacherNote: "Use no graphic imagery and no tactical detail. Focus on authority, accountability, human control, international cooperation, and rule design.",
    misconception: "The activity examines a governance question; it does not ask students to simulate conflict or choose targets.",
  },
] as const;

export const humanAgencyProgression = ["THINK", "DECIDE", "ASK", "CHECK", "CHALLENGE", "REVISE", "OWN"] as const;

export const aiSystemChain = [
  { label: "YOUR REQUEST", detail: "words · image · sound · data" },
  { label: "NETWORK", detail: "moves the request" },
  { label: "DATA CENTRE", detail: "chips run calculations" },
  { label: "ELECTRICITY + COOLING", detail: "power · equipment · water or air" },
  { label: "RESPONSE", detail: "returns to your device" },
] as const;

export function aiDilemmasForLesson(lessonId: string) {
  return aiDilemmas.filter((dilemma) => dilemma.lessonIds.includes(lessonId));
}

