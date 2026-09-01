export type YearMonth = {
  month: string;
  dates: string;
  phase: string;
  focus: string;
  learning: string;
  subjects: string[];
  spaces: string;
  teachingTime: string;
  sequence: string[];
  preparation: string;
  assessment: string;
  display: string;
  status: "Launch" | "Build" | "Bridge" | "Deepen" | "Share";
};

export type EquityCalendarItem = {
  id: string;
  scope: "Anchor project" | "Connected lesson" | "Community spotlight";
  observance: string;
  observanceDate: string;
  recommendedStart: string;
  learning: string;
  product: string;
  shareDate: string;
  followUp: string;
  curricularHome: string;
};

export type AssessmentHighlight = {
  id: string;
  timing: string;
  title: string;
  question: string;
  subjects: string[];
  evidence: string[];
  assess: string[];
  reflection: string;
  proficiency: string;
  format: string;
};

export type SpacesEvidenceKind = "Required portfolio" | "Optional evidence" | "In-class / no separate upload" | "Support / admin";

export type SpacesEvidenceMoment = {
  id: string;
  month: string;
  kind: SpacesEvidenceKind;
  title: string;
  subjects: string[];
  purpose: string;
  evidence: string;
  sourceActivities: string[];
  primaryActivityId?: string;
  reflectionAnchorId?: string;
  contributorActivityIds?: string[];
};

export type ActivitySpacesPolicy = {
  decision: "required" | "reuse";
  evidenceId: string;
  title: string;
  teacherPrompt: string;
  studentPrompt: string;
};

export type SpacesReportingWindowId = "october-midterm" | "december-term-1" | "march-report" | "june-final";

export type SpacesReportingWindow = {
  id: SpacesReportingWindowId;
  label: string;
  months: string;
  purpose: string;
  requiredEvidenceIds: string[];
  optionalEvidenceIds: string[];
  teacherComment: {
    title: string;
    review: string;
    focus: string;
  };
};

export const yearMonths: YearMonth[] = [
  {
    month: "September",
    dates: "Sept. 8–30 · about 15 instructional days",
    phase: "Build the learning community",
    focus: "Belonging, routines, learning profiles, local place, democratic participation, and how inquiry begins",
    learning: "Students practise noticing, wondering, listening, discussion, source care, responsible technology use, and local public-decision questions while the class develops shared agreements.",
    subjects: ["ELA", "Social Studies", "Career", "PHE", "Arts"],
    spaces: "Learning profile + first Core Competency goal",
    teachingTime: "Daily literacy/numeracy routines + 5–6 inquiry/community blocks",
    sequence: ["Weeks 1–2 · flexible Discovery rotations, belonging, learning profiles, discussion, and source-care routines", "Sept. 14–24 · truth-and-reconciliation learning, attributed local-place work, and the live Surrey election roles/evidence bridge", "Sept. 28–29 · revise and share the class learning display"],
    preparation: "Confirm student names/pronunciation, accessibility needs, local Nation names and approved sources; prepare flexible display materials.",
    assessment: "Conference notes, learning profile, discussion evidence, first Core Competency goal; keep most launch work formative.",
    display: "Sept. 29 · learning-with-place display; leave a question or responsibility visible for later return.",
    status: "Launch",
  },
  {
    month: "October",
    dates: "Oct. 1–30 · about 20 instructional days",
    phase: "Learn from place and perspective",
    focus: "Identity, place, evidence, maps, and whose perspectives are represented",
    learning: "Short, supported inquiries teach students how to read closely, distinguish observation from inference, and attribute ideas to specific sources and knowledge holders.",
    subjects: ["Social Studies", "ELA", "Arts", "Math"],
    spaces: "Source-and-perspective case file",
    teachingTime: "Social Studies Unit 1 · 3 blocks/week, plus ELA/Arts creation time",
    sequence: ["Weeks 1–2 · Maps Make Arguments using the three authentic map sources", "Weeks 2–3 · Trace the Claim: Two Lies and a Truth + source verification", "Weeks 3–4 · perspective listening simulation and Fleetwood case file"],
    preparation: "Open and test live maps; test the whole-class projector claim routine; select current, age-appropriate local sources and a lower-tech route.",
    assessment: "One evidence-and-perspective case file after practice, feedback, and revision.",
    display: "Late October · Fleetwood evidence-board gallery walk; archive selected boards for the inquiry-topic bank.",
    status: "Build",
  },
  {
    month: "November",
    dates: "Nov. 2–30 · about 19 instructional days",
    phase: "Investigate power and rights",
    focus: "Government, human rights, media, systems, and respectful disagreement",
    learning: "Students compare accounts, examine causes and consequences, participate in structured dialogue, and support claims with relevant evidence.",
    subjects: ["Social Studies", "ELA", "Career", "Arts"],
    spaces: "Civic decision brief + short individual reflection",
    teachingTime: "Social Studies Unit 2 · 3 blocks/week + one ELA research/communication block",
    sequence: ["Weeks 1–2 · power-in-the-room simulation and levels of government", "Weeks 2–3 · compare government systems and trace how a decision moves", "Weeks 3–4 · Juniper Park public-decision lab; inquiry teams form and choose topics"],
    preparation: "Prepare role cards and accessible case summaries; verify jurisdiction and Charter/human-rights sources; pre-screen inquiry-topic choices.",
    assessment: "Power–rights–perspective map, source conference, and short individual explanation; civic brief begins as a checkpoint.",
    display: "Nov. 27 · team inquiry-question clinic and power-map feedback wall.",
    status: "Build",
  },
  {
    month: "December",
    dates: "Dec. 1–18 · about 14 instructional days",
    phase: "Think like a solutionary",
    focus: "Root causes, affected perspectives, existing responses, and possible leverage points",
    learning: "Teams investigate a manageable issue without rushing to a solution. They learn to ask who is affected, what evidence is missing, and what responsible action might look like.",
    subjects: ["Social Studies", "ELA", "ADST", "Math"],
    spaces: "Term 1 Core Competency reflection · inquiry drafts stay local",
    teachingTime: "Social Studies Unit 3 bridge · 7–8 focused blocks before winter break",
    sequence: ["Dec. 1–4 · human-rights cases and Universal Declaration source work", "Dec. 7–10 · Human Rights Day teaching gallery", "Dec. 11–18 · root causes, global connections, existing responses, and mid-year reflection"],
    preparation: "Choose a manageable source set before the short month; schedule creation and feedback before Dec. 10; avoid launching a major new product in the final week.",
    assessment: "Civic decision brief or human-rights teach-back; inquiry teams submit annotated sources and a first root-cause map.",
    display: "Dec. 10 · Human Rights Day gallery; Dec. 17 · quiet reflection and inquiry-progress share.",
    status: "Deepen",
  },
  {
    month: "January",
    dates: "Jan. 4–29 · about 20 instructional days",
    phase: "Move toward independent inquiry",
    focus: "Focused inquiry plus an original story students turn into a tested game",
    learning: "Social inquiry continues three blocks each week while an ELA/ADST studio turns an original story blueprint into a short Bloxels game. Students build small, watch a new player, and revise both writing and design.",
    subjects: ["Social Studies", "ELA", "ADST", "Arts"],
    spaces: "Bloxels Story-Game · one combined ELA/ADST post",
    teachingTime: "Social Studies inquiry · 3 blocks/week + Bloxels ELA/ADST studio · 2 blocks/week",
    sequence: ["Week 1 · reset Social inquiry roles and write the Bloxels story blueprint", "Week 2 · paper level map, Bloxels tool practice, and minimum playable build", "Week 3 · continue inquiry research while game teams complete the smallest working version", "Week 4 · silent playtest, one story revision, one game/access revision, and private class arcade"],
    preparation: "Approve focused Social inquiry sources; confirm Bloxels licence, school-managed logins, privacy settings, devices, and the paper fallback before January begins.",
    assessment: "Social research trail and conference stay local; Bloxels uses separate ELA and ADST look-fors inside one shared artifact and individual reflection.",
    display: "Late January · private class arcade and inquiry works-in-progress studio; feedback stays focused on story, usability, evidence, and revision.",
    status: "Bridge",
  },
  {
    month: "February",
    dates: "Feb. 1–26 · about 18 instructional days",
    phase: "Share and bridge into Science",
    focus: "Social Studies teaching experiences, reflection, and scientific ways of knowing",
    learning: "Teams teach the class, answer questions, and reflect on individual growth. Science begins with evidence, fair testing, models, and the limits of explanations.",
    subjects: ["Social Studies", "ELA", "Science", "Career"],
    spaces: "Team presentation + individual reflection",
    teachingTime: "Social Studies inquiry culmination · 8–10 blocks; Science launch · 2 blocks",
    sequence: ["Feb. 1–11 · Black History Month learning woven into source, power, and resistance analysis", "Feb. 16–24 · inquiry teaching experiences, audience questions, Pink Shirt connection, and revision", "Feb. 25–26 · individual SpacesEDU reflection and Science inquiry launch"],
    preparation: "Build a presentation rotation; test media; protect rehearsal and revision time; ensure Black histories are taught as year-round Canadian and global history, not a detached celebration.",
    assessment: "Shared teaching product + individual contribution evidence, response to questions, revision, and SpacesEDU reflection.",
    display: "Feb. 18–24 · rotating expert-teaching showcase; keep selected learning visible into March.",
    status: "Bridge",
  },
  {
    month: "March",
    dates: "Mar. 1–12 and 30–31 · spring break Mar. 15–29",
    phase: "Study interacting life systems",
    focus: "Body systems, homeostasis, variation, data, and ethical health communication",
    learning: "Students investigate reaction-time variation, learn through expert groups, reason through multi-system cases, and communicate body knowledge accurately and respectfully.",
    subjects: ["Science", "Math", "PHE", "ELA"],
    spaces: "Body-systems evidence story",
    teachingTime: "Science Unit 1 · about 9 blocks split around the break",
    sequence: ["Mar. 1–5 · fair-test launch, reaction-time investigation, and anonymous data", "Mar. 8–11 · systems experts + anti-racism evidence mini-inquiry before the long break", "Mar. 30–31 · retrieval, model repair, and return to body-system cases"],
    preparation: "Plan the interruption deliberately: complete one coherent evidence cycle before Mar. 12 and prepare a short retrieval task for Mar. 30.",
    assessment: "Reaction-time investigation story or system explanation; avoid a major due date immediately after the break.",
    display: "Mar. 11 · evidence-against-racism mini-gallery; scientific work returns as a fresh evidence wall after the break.",
    status: "Deepen",
  },
  {
    month: "April",
    dates: "Apr. 1–30 · about 21 instructional days",
    phase: "Separate, test, and care for materials",
    focus: "Mixtures, properties, separation, water systems, and place-based knowledge",
    learning: "Students move between hands-on stations, media, reading, data, and a practical separation challenge. Earth Day connections invite—not force—possible solutionary questions.",
    subjects: ["Science", "Math", "ADST", "ELA"],
    spaces: "Mixture-rescue investigation + explanation",
    teachingTime: "Finish Science Unit 1, then Unit 2 · about 10–12 blocks total",
    sequence: ["Apr. 1–7 · multi-system cases, reproduction/development learning, and Unit 1 synthesis", "Apr. 8–16 · mystery mixtures, property tests, and separation experts", "Apr. 19–22 · water systems and Earth Day solutionary connection", "Apr. 23–30 · mixture-rescue design, explanation, and revision"],
    preparation: "Gather consumable materials two weeks ahead; test separation stations; choose one specific local water/place source and an accessible cleanup plan.",
    assessment: "Body-systems synthesis + mixture-rescue evidence story; assess scientific reasoning separately from construction polish.",
    display: "Apr. 22 · water-and-materials learning display; Apr. 29 · mixture-rescue demonstration share.",
    status: "Deepen",
  },
  {
    month: "May",
    dates: "May 3–31 · about 18 instructional days",
    phase: "Design with force and evidence",
    focus: "Newton’s laws, motion, impact safety, fair testing, and iterative design",
    learning: "Students gather repeated evidence, critique models, build and revise a protective design, and explain why evidence—not appearance—supports a design decision.",
    subjects: ["Science", "Math", "ADST", "ELA"],
    spaces: "Design evidence + before/after revision",
    teachingTime: "Science Unit 3 · 9–10 blocks + inquiry-topic collection",
    sequence: ["May 3–7 · motion and reference-point phenomena", "May 10–14 · Newton’s laws stations and human-movement evidence", "May 17–20 · impact safety and Delivery Pod planning", "May 25–31 · repeated tests, revision, explanation, and possible expert topics"],
    preparation: "Collect low-cost build materials; establish identical test conditions; plan for May 7, 21, and 24 closures before setting deadlines.",
    assessment: "Delivery Pod design evidence: fair comparison, before/after revision, force explanation, limitation, and next improvement.",
    display: "May 28–31 · design museum with test evidence beside every prototype; Asian Heritage learning appears through purposeful texts and contributions across subjects.",
    status: "Deepen",
  },
  {
    month: "June",
    dates: "June 1–24 · about 18 instructional days",
    phase: "Place ourselves in the universe",
    focus: "Scale, motion, models, Earth and space, expert teaching, and year-end reflection",
    learning: "Students use physical and digital models, then choose evidence from across the year to teach, create, and reflect. Final forms can include Minecraft without making it the only pathway.",
    subjects: ["Science", "Math", "ELA", "Arts", "ADST"],
    spaces: "Expert showcase + Core Competency self-assessment",
    teachingTime: "One shared culmination · 6–7 Earth/space blocks + 6–8 expert-teaching blocks; reserve 2–3 final blocks for reflection, portfolio curation, and closure",
    sequence: ["June 1–8 · cosmic address, scale, motion, viewpoints, and evidence limits", "June 9–15 · choose expert topics, build and peer-test teaching experiences", "June 16–21 · expert showcase and National Indigenous Peoples Day learning", "June 22–24 · portfolio curation, Core Competency reflection, and next-year goal"],
    preparation: "Set a firm minimum viable product; assess ELA, Arts, ADST, and selected Math evidence inside the same showcase; schedule groups early; protect 2–3 closure blocks; keep June 24 free of last-minute production.",
    assessment: "Science expert teaching product, response to questions, individual evidence explanation, and two-artifact growth reflection.",
    display: "June 17–21 · expert showcase; June 24 · compact year-of-learning gallery and portfolio celebration.",
    status: "Share",
  },
];

export const equityCalendar: EquityCalendarItem[] = [
  { id: "truth-reconciliation", scope: "Anchor project", observance: "National Day for Truth and Reconciliation", observanceDate: "Wednesday, Sept. 30, 2026 · school closed", recommendedStart: "Monday, Sept. 14", learning: "Local place, residential-school truth, survivance, relationship, and responsibility using specific, attributed sources.", product: "Class learning-with-place display with sourced student questions and commitments", shareDate: "Tuesday, Sept. 29", followUp: "Return to the commitments during Unit 1 map work and again in the Social Studies inquiry.", curricularHome: "ELA · Social Studies · Arts · Career" },
  { id: "human-rights", scope: "Anchor project", observance: "Human Rights Day", observanceDate: "Thursday, Dec. 10, 2026", recommendedStart: "Monday, Nov. 23", learning: "Rights, responsibilities, power, evidence, safeguards, and the difference between a right and a preference.", product: "Human-rights case gallery or interactive teach-back", shareDate: "Thursday, Dec. 10", followUp: "Teams carry one rights lens and one unresolved question into their root-cause inquiry map.", curricularHome: "Social Studies Unit 2 · ELA · Arts" },
  { id: "black-history", scope: "Connected lesson", observance: "Black History Month", observanceDate: "February 2027", recommendedStart: "Monday, Jan. 18", learning: "Black histories, resistance, achievement, community knowledge, and the systems that shaped Canadian and global experiences.", product: "Sourced story, counter-narrative panel, or contribution to an inquiry teaching product", shareDate: "Rotating display Feb. 1–26", followUp: "Keep texts and examples in later ELA, government, rights, science, and arts learning rather than ending the topic in February.", curricularHome: "Social Studies Units 3–4 · ELA · Arts" },
  { id: "pink-shirt", scope: "Community spotlight", observance: "Pink Shirt Day", observanceDate: "Wednesday, Feb. 24, 2027", recommendedStart: "Monday, Feb. 8", learning: "Move beyond slogans by examining belonging, bystander choices, power, harm, repair, and accessible ways to seek help.", product: "Student-designed scenario, safeguard, or belonging action", shareDate: "Wednesday, Feb. 24", followUp: "Revisit the chosen safeguard in class meetings and evaluate whether it actually changed participation or safety.", curricularHome: "Career · PHE · ELA · Social Studies" },
  { id: "racial-discrimination", scope: "Connected lesson", observance: "International Day for the Elimination of Racial Discrimination", observanceDate: "Sunday, Mar. 21, 2027 · during spring break", recommendedStart: "Monday, Mar. 1", learning: "Use claims and evidence to recognize racism as both interpersonal and systemic, without asking students to disclose personal harm.", product: "Evidence-against-racism mini-gallery or myth-repair card", shareDate: "Thursday, Mar. 11", followUp: "Return after break to one question about evidence, systems, or responsible action.", curricularHome: "ELA · Social Studies bridge · Career" },
  { id: "earth-day", scope: "Anchor project", observance: "Earth Day", observanceDate: "Thursday, Apr. 22, 2027", recommendedStart: "Monday, Apr. 5", learning: "Water and material systems, evidence, environmental justice, affected perspectives, and responsible local action.", product: "Water/materials evidence display linked to the Mixtures unit", shareDate: "Thursday, Apr. 22", followUp: "Test whether one proposed action is feasible, evidence-based, and accountable rather than symbolic.", curricularHome: "Science Unit 2 · Social Studies · ADST · ELA" },
  { id: "red-dress", scope: "Connected lesson", observance: "Red Dress Day", observanceDate: "Wednesday, May 5, 2027", recommendedStart: "Monday, Apr. 19", learning: "Age-appropriate learning about remembrance, safety, Indigenous women, girls and 2SLGBTQI+ people, and the responsibility to use trusted sources with care.", product: "Quiet sourced reflection or school-approved awareness contribution", shareDate: "Wednesday, May 5", followUp: "Connect to continuing inquiry about systems, rights, safety, and whose voices institutions hear.", curricularHome: "Social Studies · ELA · Arts · Career" },
  { id: "indigenous-peoples", scope: "Anchor project", observance: "National Indigenous Peoples Day", observanceDate: "Monday, June 21, 2027", recommendedStart: "Tuesday, June 1", learning: "Living cultures, languages, knowledge, leadership, resurgence, and local relationships—not a one-day historical overview.", product: "Attributed learning station, creative response, or contribution guided by an appropriate source", shareDate: "Monday, June 21", followUp: "Students name how their responsibility to place and relationship can continue beyond the school year.", curricularHome: "Social Studies · Science · ELA · Arts" },
  { id: "pride", scope: "Community spotlight", observance: "Pride Season", observanceDate: "June 2027", recommendedStart: "Monday, May 31", learning: "Belonging, human rights, diverse families and identities, allyship, and safe participation without requiring personal disclosure.", product: "Inclusive-book response, rights connection, or belonging message", shareDate: "June 10–24", followUp: "Carry inclusive language, texts, examples, and classroom safeguards into the next year.", curricularHome: "ELA · Career · Arts · Social Studies" },
];

export const assessmentHighlights: AssessmentHighlight[] = [
  {
    id: "learning-story",
    timing: "September",
    title: "My learning story",
    question: "Who am I as a learner, what helps me contribute, and what is one meaningful goal?",
    subjects: ["ELA", "Career Education", "Core Competencies"],
    evidence: ["Short written, audio, or video learning profile", "Specific example of a strength", "One goal and a realistic strategy"],
    assess: ["Communicates clearly for an audience", "Reflects with specific evidence", "Sets and monitors a meaningful goal"],
    reflection: "What should my teacher know so I can learn well—and what responsibility can I take?",
    proficiency: "Checkpoint: communication + reflection",
    format: "Individual · 1 SpacesEDU post",
  },
  {
    id: "perspective-case",
    timing: "October–November",
    title: "Evidence and perspective case file",
    question: "How does the evidence—and the perspective of the source—change what we understand?",
    subjects: ["Social Studies", "ELA", "Arts Education"],
    evidence: ["Two or more meaningfully different sources", "Annotated evidence and source notes", "Perspective map or visual response", "Supported conclusion with a stated limit"],
    assess: ["Uses evidence from sources", "Recognizes perspective and context", "Makes and communicates a defensible interpretation"],
    reflection: "Which source changed or complicated my thinking, and why?",
    proficiency: "Assessment highlight: Social Studies + ELA",
    format: "Individual or partners · case-file post",
  },
  {
    id: "civic-rights-showcase",
    timing: "November–December",
    title: "Civic decision and human-rights showcase",
    question: "How should a public institution respond while sharing power, protecting rights, and remaining accountable?",
    subjects: ["Social Studies", "ELA", "Career Education"],
    evidence: ["Focused public question and correct jurisdiction", "Power, rights, and affected-perspective evidence", "Compared options with consequences and safeguards", "Cited recommendation with review and one serious limit"],
    assess: ["Uses credible evidence", "Analyzes power, rights, and consequences", "Makes an accountable recommendation", "Explains individual thinking and participation"],
    reflection: "Which evidence or counterargument changed my thinking, and how could someone participate responsibly?",
    proficiency: "Assessment highlight: civic reasoning",
    format: "One team artifact · one short individual SpacesEDU reflection",
  },
  {
    id: "bloxels-story-game",
    timing: "January",
    title: "Bloxels story-game project",
    question: "How can a player experience the story through the game—not only read it before playing?",
    subjects: ["ELA", "ADST"],
    evidence: ["Original story blueprint and paper level map", "Short complete Bloxels game or equivalent paper route", "Silent playtest record", "One visible story revision and one gameplay/access revision", "Individual contribution and creator explanation"],
    assess: ["Creates a purposeful, clear narrative for a player audience", "Uses writing and design processes to revise meaning", "Plans and builds a workable first version", "Tests, troubleshoots, and improves from evidence", "Explains individual choices and modifications"],
    reflection: "What did a player do that caused you to change the story or game—and why was that change useful?",
    proficiency: "Major highlight: ELA + ADST assessed separately",
    format: "Individual or pair project · one combined SpacesEDU post",
  },
  {
    id: "expert-teach-back",
    timing: "January–February",
    title: "Expert-team teaching experience",
    question: "How can we help classmates understand something complex without oversimplifying it?",
    subjects: ["Social Studies", "ELA", "ADST", "Arts Education"],
    evidence: ["Reliable research trail and source notes", "Interactive exhibit, podcast, video, simulation, model, or live lesson", "New-audience test and teach-back", "One content revision, one design revision, and individual reflection"],
    assess: ["Builds accurate knowledge of systems, significance, change, and perspectives", "Evaluates evidence and existing responses", "Designs for audience thinking", "Contributes and revises from evidence"],
    reflection: "What did I contribute, what did our audience understand, and what evidence caused us to revise?",
    proficiency: "Major highlight: content + communication",
    format: "Team product · individual post and reflection",
  },
  {
    id: "science-story",
    timing: "March–April",
    title: "Science investigation story",
    question: "What pattern does our evidence support, and how certain should we be?",
    subjects: ["Science", "Math", "ELA"],
    evidence: ["Question and prediction with a reason", "Photos or video of the process", "Measurements, graph, or organized observations", "Claim supported by evidence", "Limitation and next test"],
    assess: ["Plans and conducts safely", "Represents and interprets data", "Uses evidence to explain", "Evaluates methods and uncertainty"],
    reflection: "What did the evidence make us revise?",
    proficiency: "Assessment highlight: investigation competencies",
    format: "Team investigation · individual explanation",
  },
  {
    id: "design-evidence",
    timing: "May",
    title: "Design evidence: safer by revision",
    question: "Which design decision is supported by testing—not just by appearance?",
    subjects: ["Science", "ADST", "Math", "ELA"],
    evidence: ["Initial plan and scientific reason", "Comparable test results", "Visible before/after revision", "Explanation connecting force, motion, and design", "Next improvement"],
    assess: ["Applies scientific ideas", "Uses a fair comparison", "Iterates from evidence", "Explains trade-offs"],
    reflection: "Which failure or surprise taught our team the most?",
    proficiency: "Major highlight: application + design",
    format: "Team prototype · individual evidence post",
  },
  {
    id: "year-showcase",
    timing: "June",
    title: "Year-end expert showcase",
    question: "What can we now understand, create, or contribute that we could not at the start of the year?",
    subjects: ["Topic-dependent", "ELA", "Core Competencies"],
    evidence: ["Selected final teaching product", "Sources or evidence trail", "Response to audience questions", "Individual reflection using two earlier artifacts", "A next-year goal"],
    assess: ["Subject standards actually visible in the work", "Communication for a real audience", "Critical and creative thinking", "Personal and social growth through self-assessment"],
    reflection: "Which two artifacts best show my growth, and what changed between them?",
    proficiency: "Culminating body of evidence—not one all-purpose grade",
    format: "Choice product · individual portfolio curation",
  },
];

export const philosophyCommitments = [
  ["Belonging changes the system", "Students should not have to become smaller, quieter, or less themselves to belong. We remove barriers, repair harm, and make room for many ways of participating."],
  ["Inquiry before easy answers", "Students learn how to notice, question, research, test, revise, and live with complexity—not simply collect teacher-approved answers."],
  ["Knowledge is relational", "Learning is connected to people, place, history, responsibility, and the source of the knowledge. We attribute carefully and avoid treating one perspective as universal."],
  ["High challenge with real support", "Rigour means worthwhile thinking with accessible entry points, useful scaffolds, feedback, and different ways to show understanding—not unnecessary workload or hidden rules."],
  ["Learning can contribute", "Solutionary learning asks students to understand systems deeply, listen to affected people, and imagine responsible responses without rushing into saviourism."],
  ["Technology must earn its place", "Minecraft, media, AI, websites, and digital portfolios are used when they strengthen modelling, creativity, access, feedback, or authentic communication. Hands-on and human learning remain central."],
] as const;

export const expectationGroups = [
  {
    audience: "Students",
    promise: "You belong here, and your choices help shape the room.",
    expectations: ["Arrive ready to notice, wonder, and participate in a way that works for you.", "Care for people, place, shared materials, and digital spaces.", "Ask for help, movement, quiet, clarification, or another way to show learning when needed.", "Use evidence, name sources, listen across difference, and be willing to revise.", "Share group work fairly and keep an honest record of your own contribution.", "Repair harm: tell the truth, listen to impact, make amends, and try a better action."],
  },
  {
    audience: "Teacher",
    promise: "I will make the learning clear, worthwhile, and reachable.",
    expectations: ["Explain the purpose, learning standards, and what quality looks like.", "Provide different entry points and ways to learn, practise, communicate, and regulate.", "Give feedback early enough to use and avoid grading every piece of practice.", "Choose resources carefully, protect privacy, and acknowledge the source and limits of knowledge.", "Communicate patterns of success or concern without waiting for a report card.", "Keep learning from students, families, colleagues, communities, and evidence."],
  },
  {
    audience: "Families",
    promise: "You are partners who know your child in ways school cannot.",
    expectations: ["Share context that may affect learning, belonging, health, or safety.", "Review selected SpacesEDU posts and ask what the student noticed, changed, or wants to try next.", "Support routines and independence without completing, correcting, or redesigning the work.", "Protect sleep, play, movement, culture, family time, and reading for pleasure.", "Contact the teacher when something is unclear or a pattern is becoming concerning.", "Celebrate growth, effort, curiosity, kindness, and revision—not only polished products."],
  },
];

export const thingsToKnow = [
  ["SpacesEDU", "This is the main learning portfolio. Students post selected evidence—not every worksheet—and explain what the evidence shows."],
  ["Assessment", "Grade 6 uses B.C.’s Provincial Proficiency Scale. A level comes from a body of recent, varied evidence connected to taught standards, not a points average."],
  ["Practice", "Most practice is formative. It may receive feedback, a conference, a self-check, or a next step without becoming a reported assessment."],
  ["Group work", "Teams may create together, but each student needs a visible contribution and individual reflection when the work becomes assessment evidence."],
  ["Absences", "Students should recover the essential learning, not recreate every missed minute. The teacher will identify the smallest useful catch-up pathway."],
  ["Technology", "School-approved tools are used for learning. Students protect private information, cite media and ideas, and ask before recording or sharing other people."],
  ["Communication", "Questions and concerns are welcome. School-approved contact channels and response-time expectations should be added here before this guide is shared with families."],
  ["School details", "Bell times, PHE days, library times, dismissal procedures, supplies, allergies, and field-trip information belong in a short class-specific update once confirmed."],
] as const;

export const homeworkPolicy = {
  headline: "Homework should protect learning—not compete with childhood.",
  regular: ["Read, listen to, or share texts regularly in a language that supports the learner.", "Finish a small essential piece only when class time and appropriate support were available.", "Occasionally gather a family story, observation, object, photo, or question that enriches an inquiry."],
  notRegular: ["Daily worksheets for the sake of compliance", "New curriculum that requires families to teach it", "Group-project coordination that assumes everyone is available after school", "Punitive catch-up piles after illness or absence"],
  familyMove: "If homework is regularly causing distress, conflict, sleep loss, or taking far longer than expected, stop and contact the teacher. That is useful information—not a failure.",
};

export const spacesPostRecipe = [
  ["Capture", "Keep the original work where it lives. Add a photo of paper or a model, a useful link, or a brief audio/video explanation only when it helps someone understand the learning."],
  ["Name", "Use a searchable title: task + learning area + date or stage."],
  ["Explain", "Complete: “I was learning… This evidence shows… because…”"],
  ["Reflect", "Name one revision, challenge, contribution, connection, or next step."],
  ["Tag", "Add only the learning areas and competencies genuinely visible in the evidence."],
] as const;

export const spacesEvidenceRhythm: SpacesEvidenceMoment[] = [
  { id: "spaces-sept-learning-story", month: "September", kind: "Required portfolio", title: "My Learning Story + first goal", subjects: ["ELA", "Career", "Core Competencies"], purpose: "Begin the year with student voice, a specific strength example, useful learning conditions, and one realistic goal.", evidence: "Choose written, audio, video, or visual evidence plus a first step and check date.", sourceActivities: ["September learning profile", "First Core Competency goal"], primaryActivityId: "learning-user-manual", contributorActivityIds: ["ordinary-object-story", "strengths-action-quest"] },
  { id: "spaces-sept-place", month: "September", kind: "Optional evidence", title: "Truth and Reconciliation / place response", subjects: ["ELA", "Social Studies", "Arts"], purpose: "Save only when the response adds specific, attributed learning not already visible in the class display.", evidence: "One sourced question, connection, or responsibility in audio, image, or text.", sourceActivities: ["The Secret Path", "Residential Schools Reading", "Attributed local-place learning"] },

  { id: "spaces-oct-case", month: "October", kind: "Required portfolio", title: "Evidence and Perspective Case File", subjects: ["Social Studies", "ELA", "Arts"], purpose: "Show how evidence and source perspective change an interpretation.", evidence: "Keep the case file on site; add the file, a photo of the paper work, or a brief audio/video explanation showing two sources, a supported conclusion, source notes, and one important limit.", sourceActivities: ["Fleetwood case file", "2040 Reflection and Analysis"], primaryActivityId: "fleetwood-case-file", contributorActivityIds: ["maps-make-arguments", "trace-the-claim", "perspective-without-guessing", "three-voices", "edit-room", "map-what-maps-miss", "search-under-hood"] },
  { id: "spaces-oct-math", month: "October", kind: "Optional evidence", title: "Number Sense Snapshot", subjects: ["Mathematics"], purpose: "Choose one sample only when more individual Math evidence is useful.", evidence: "One place-value, decimal, or order-of-operations explanation with reasoning.", sourceActivities: ["Place Value", "Decimal Place Value", "Decimal Arithmetic", "Order of Operations"] },
  { id: "spaces-oct-practice", month: "October", kind: "In-class / no separate upload", title: "Story and number practice", subjects: ["ELA", "Mathematics"], purpose: "Keep playful launch work and repeated practice available for feedback without turning it into a portfolio requirement.", evidence: "Teacher observation, notebook work, conference, or self-check.", sourceActivities: ["Roll-a-Story", "Remaining number practice"] },

  { id: "spaces-nov-civic", month: "November", kind: "Required portfolio", title: "Civic / Community Needs Brief", subjects: ["Social Studies", "Career", "ELA"], purpose: "Connect public decisions, rights, community needs, and responsible participation.", evidence: "Use the on-site brief, a photo of the paper brief, or an audio/video explanation to show a cited recommendation, affected perspectives, a safeguard, and individual reasoning.", sourceActivities: ["Civic decision brief", "Exploring Careers and Community Needs"], primaryActivityId: "civic-decision-brief", contributorActivityIds: ["power-in-the-room", "compare-government-systems", "rights-in-tension", "rights-in-thirty", "access-by-design"] },
  { id: "spaces-nov-private-phe", month: "November", kind: "In-class / no separate upload", title: "PHE participation and self-assessment", subjects: ["PHE"], purpose: "Use safe observation and private conversation; do not post body data or public comparisons.", evidence: "Teacher observation or private conference note.", sourceActivities: ["PHE Self-Assessment Term 1"] },

  { id: "spaces-dec-core", month: "December", kind: "Required portfolio", title: "Term 1 Core Competency Reflection", subjects: ["Core Competencies"], purpose: "Use one selected artifact to explain a strength, challenge, contribution, and next step.", evidence: "Short reflection linked to one piece of evidence; teacher tracking stays separate.", sourceActivities: ["Core Competencies Term 1 Checklist"], reflectionAnchorId: "core-reflection-term-1" },
  { id: "spaces-dec-reading", month: "December", kind: "In-class / no separate upload", title: "Reading and Human Rights learning", subjects: ["ELA", "Social Studies"], purpose: "Keep comparison reading and gallery learning in class unless it fills a real evidence gap.", evidence: "Discussion, comparison organizer, gallery response, or conference.", sourceActivities: ["Compare and Contrast Elephants", "Human Rights gallery"] },

  { id: "spaces-jan-bloxels", month: "January", kind: "Required portfolio", title: "Bloxels Story-Game Project", subjects: ["ELA", "ADST"], purpose: "Show how an original story and a tested game design improve together.", evidence: "Keep the game in Bloxels. Add one short gameplay recording or live-game link, a photo of the paper blueprint when useful, one ELA revision, one ADST revision, playtest evidence, and an individual contribution reflection.", sourceActivities: ["Bloxels Game Design Cross-Curricular Project"], primaryActivityId: "bloxels-game-studio", contributorActivityIds: ["bloxels-story-blueprint"] },
  { id: "spaces-jan-math", month: "January", kind: "Optional evidence", title: "Fractions, Percents, or Patterns Selection", subjects: ["Mathematics"], purpose: "Choose one sample only when the body of Math evidence needs it.", evidence: "A visual model, strategy explanation, or pattern rule with a check.", sourceActivities: ["Mixed Numbers and Improper Fractions", "Percents", "Patterns"] },
  { id: "spaces-jan-goal", month: "January", kind: "In-class / no separate upload", title: "New Year goal check", subjects: ["Career", "Core Competencies"], purpose: "Update the September goal instead of creating an unrelated new post.", evidence: "Brief conference, annotation, or comment on the existing goal.", sourceActivities: ["New Year's Goals"] },

  { id: "spaces-feb-inquiry", month: "February", kind: "Required portfolio", title: "Social Studies Inquiry / Expert Teach-Back", subjects: ["Social Studies", "ELA", "ADST", "Arts"], purpose: "Share one team teaching artifact while preserving individual thinking and contribution.", evidence: "Link the shared product once, or use one clear photo/video of the live teaching or model. Each student adds an evidence-based reflection naming their contribution and one revision.", sourceActivities: ["Social Studies Inquiry Project", "Expert-team teaching experience"], primaryActivityId: "expert-exchange", contributorActivityIds: ["source-mosaic", "pull-the-system-thread", "responses-under-pressure", "make-it-teachable", "hook-cold-audience", "audience-remix", "cold-test-prototype", "project-rescue-studio", "leadership-relay"] },
  { id: "spaces-feb-core", month: "February", kind: "Required portfolio", title: "Term 2 Core Competency Reflection", subjects: ["Core Competencies"], purpose: "Use current evidence to describe growth and update one goal.", evidence: "Short student reflection; teacher tracking is not part of the student post.", sourceActivities: ["Core Competencies Term 2 Tracking Sheet and Teacher Reflection"], reflectionAnchorId: "core-reflection-term-2" },
  { id: "spaces-feb-ela", month: "February", kind: "Optional evidence", title: "Listening Response or Debate Evidence", subjects: ["ELA"], purpose: "Choose only when listening, textual evidence, or oral communication is not already visible.", evidence: "Hobbit listening response or one table-debate clip, note, or reflection.", sourceActivities: ["The Hobbit Listening Response", "Table Debates"] },
  { id: "spaces-feb-private-health", month: "February", kind: "In-class / no separate upload", title: "Equations, fitness planning, and health talk", subjects: ["Mathematics", "PHE"], purpose: "Keep ordinary practice and sensitive health information out of the default portfolio stream.", evidence: "Classwork, teacher observation, or private conference.", sourceActivities: ["One-Step Equations", "Personal Fitness Plan", "Influences on Eating Habits Paragraph"] },

  { id: "spaces-mar-science", month: "March", kind: "Required portfolio", title: "Science Investigation Story", subjects: ["Science", "Mathematics", "ELA"], purpose: "Show what a fair investigation can and cannot support.", evidence: "Use a photo of the paper data/model or a brief process clip, then explain the question, organized evidence, supported claim, limitation, and useful next test.", sourceActivities: ["Reaction-time investigation", "Body-systems evidence story"], primaryActivityId: "signal-case", contributorActivityIds: ["graph-story-lab"] },
  { id: "spaces-mar-minecraft", month: "March", kind: "Optional evidence", title: "Minecraft Knowledge World · Part 1 Checkpoint", subjects: ["Science", "ADST"], purpose: "Link a working plan or model only when feedback at the midpoint will be useful; this is not a second full project post.", evidence: "Topic, scientific question, source trail, first model, and one feedback need.", sourceActivities: ["Minecraft Knowledge World Part 1"] },
  { id: "spaces-mar-dance", month: "March", kind: "In-class / no separate upload", title: "Dance and studio practice", subjects: ["Arts", "PHE"], purpose: "Use rehearsal, observation, and reflection unless a student needs a selected Arts sample.", evidence: "Teacher observation, process note, or student choice clip.", sourceActivities: ["Art - Dance"] },

  { id: "spaces-apr-zoo", month: "April", kind: "Required portfolio", title: "Zoo Design Mathematics Project", subjects: ["Mathematics", "ADST"], purpose: "Combine polygons, perimeter, area, checking, and revision in one substantial design rather than separate repetitive uploads.", evidence: "Photograph the paper plan or physical model in one or two clear views. Point to the calculations, labelled decisions, peer check, and meaningful revision in writing or a brief audio/video explanation.", sourceActivities: ["Zoo Design using Area and Perimeter", "Quadrilaterals", "Triangles"], primaryActivityId: "zoo-design-studio", contributorActivityIds: ["angle-triangle-pack", "polygon-classification-pack", "formula-perimeter-pack", "area-recompose-pack"] },
  { id: "spaces-apr-choice", month: "April", kind: "Optional evidence", title: "ELA / Arts Choice", subjects: ["ELA", "Arts", "ADST"], purpose: "Choose at most one when it adds evidence not already visible elsewhere.", evidence: "Social justice book response, robot art/writing process, or a contextualized art study.", sourceActivities: ["Social Justice Book Reports", "Robot Art and Writing", "Chinese Vase Design"] },
  { id: "spaces-apr-science-practice", month: "April", kind: "In-class / no separate upload", title: "Mixture Rescue and Earth Day learning", subjects: ["Science", "ADST", "ELA"], purpose: "Use investigations, explanation, and display as classroom evidence unless another Science sample is needed.", evidence: "Teacher observation, test table, explanation, or optional selected evidence.", sourceActivities: ["Mixture Rescue", "Water and materials display"] },

  { id: "spaces-may-food-budget", month: "May", kind: "Optional evidence", title: "Healthy Food Budget Challenge · pending complete lesson", subjects: ["PHE", "Mathematics", "Career"], purpose: "Use only after a complete, current, classroom-ready lesson exists; never judge real family food choices or finances.", evidence: "Fictional budget, calculations, decision explanation, trade-off, and reflection.", sourceActivities: ["Healthy Food Budget Challenge"] },
  { id: "spaces-may-design", month: "May", kind: "Required portfolio", title: "Force / Motion Design Evidence", subjects: ["Science", "ADST", "Mathematics", "ELA"], purpose: "Show which design decision is supported by comparable testing.", evidence: "Use photos or a short video of the prototype and test, the on-site results, a visible before/after revision, a force explanation, and one next improvement.", sourceActivities: ["Delivery Pod design evidence"], primaryActivityId: "safer-impact-studio", contributorActivityIds: ["force-patterns-lab", "crash-lab", "science-design-series"] },
  { id: "spaces-may-literacy", month: "May", kind: "Optional evidence", title: "One Literacy Showcase", subjects: ["ELA"], purpose: "Choose Werewolf storytelling or a poetry booklet by default—not both required uploads.", evidence: "Selected story or poem with one documented revision and a brief creator explanation.", sourceActivities: ["Werewolf Storytelling", "Poetry Booklets"] },
  { id: "spaces-may-math-practice", month: "May", kind: "In-class / no separate upload", title: "Graphing and transformation practice", subjects: ["Mathematics"], purpose: "Keep both mathematical purposes visible while selecting only one extra sample if needed.", evidence: "Classwork, conference, or optional checkpoint.", sourceActivities: ["Data and Environmental Graphing", "Coordinate Graphing and Transformations"] },

  { id: "spaces-june-minecraft", month: "June", kind: "Required portfolio", title: "Science Expert Showcase · Minecraft optional", subjects: ["Science", "ADST", "ELA"], purpose: "Culminate the Science inquiry with accurate content, a purposeful teaching format, an audience test, and individual explanation. Minecraft is one option, not the required product.", evidence: "Link the shared digital teaching artifact, or add a clear photo/video of the live model, demonstration, display, or optional Minecraft world. Include sources, a model limit, response to questions, revision, and individual reflection.", sourceActivities: ["Science expert showcase", "Minecraft Knowledge World Part 2 · optional format", "Each One, Teach One · optional teaching format"], primaryActivityId: "science-expert-showcase", contributorActivityIds: ["cosmic-exhibit-studio", "cosmic-scale-gallery", "cosmic-mission-control", "each-one-teach-one", "impossible-scene-repair"] },
  { id: "spaces-june-final", month: "June", kind: "Required portfolio", title: "Final Core Competency + Leadership Journey", subjects: ["Core Competencies", "Career"], purpose: "Use two earlier artifacts to show growth, contribution, leadership action, and a next-year goal.", evidence: "One combined written, audio, visual, or video reflection.", sourceActivities: ["Core Competencies Final Reflection", "My Leadership Journey"], reflectionAnchorId: "core-career-final-reflection" },
  { id: "spaces-admin-ell", month: "Any time", kind: "Support / admin", title: "ELL/LST Support Records", subjects: ["ELL", "LST"], purpose: "Keep in the appropriate private support workflow.", evidence: "Teacher/support-team record; not a whole-class portfolio highlight.", sourceActivities: ["ELL/LST Support Terms 1–3"] },
  { id: "spaces-admin-tracking", month: "Any time", kind: "Support / admin", title: "Teacher Tracking and Reviewed Status", subjects: ["Teacher workflow"], purpose: "Separate teacher tracking and workflow status from student reflection.", evidence: "Private teacher record.", sourceActivities: ["Competency tracking sheets", "Reviewed status"] },
  { id: "spaces-admin-sensitive", month: "Any time", kind: "Support / admin", title: "Sensitive PHE / Student Support Information", subjects: ["PHE", "Student support"], purpose: "Protect private health, body, accommodation, and intervention information.", evidence: "Secure teacher or support-team record; never a public class post.", sourceActivities: ["Private fitness or health information", "Accommodation and intervention records"] },
];

/**
 * The registry names the major anchors that must not be lost across the year.
 * It is not the whole SpacesEDU calendar and it is not a cap. Last year's
 * roughly 50 posts were a useful minimum body of evidence across the program;
 * additional shorter subject posts remain available when they show important
 * learning without stealing the time a substantial project needs to be done well.
 */
export const spacesPortfolioBudget = {
  referenceYearStudentPosts: 50,
  majorAnchorCount: 12,
  scheduledTeacherComments: 4,
  rule: "The 12 named anchors organize major evidence; they are not an annual cap. Add shorter subject evidence whenever it is needed for curriculum coverage, feedback, growth, or reporting.",
  selectionRule: "Protect enough class time for major work to be completed well. Use shorter posts when they capture useful learning efficiently, and do not force every practice page, craft, or display piece into the portfolio.",
  captureRule: "Keep work on the Classroom OS, paper, or the original creation platform. Use a photo of paper or a model, an original link, or a brief audio/video explanation; never print work or make a screen capture only to prove completion.",
} as const;

export const spacesReportingWindows: SpacesReportingWindow[] = [
  {
    id: "october-midterm",
    label: "October midterm",
    months: "September–October",
    purpose: "Establish who the student is as a learner and comment on one early pattern in communication, inquiry, or number sense.",
    requiredEvidenceIds: ["spaces-sept-learning-story", "spaces-oct-case"],
    optionalEvidenceIds: ["spaces-sept-place", "spaces-oct-math"],
    teacherComment: {
      title: "October midterm progress comment",
      review: "Review the Learning Story and the strongest early case-file, place, or Mathematics evidence already present.",
      focus: "Name one demonstrated strength, one useful next step, and how the student's first goal is beginning. Add a teacher comment; do not create a placeholder student post.",
    },
  },
  {
    id: "december-term-1",
    label: "December Term 1",
    months: "November–December",
    purpose: "Close the first term with substantial civic evidence, student self-assessment, and descriptive feedback grounded in the term's body of evidence.",
    requiredEvidenceIds: ["spaces-nov-civic", "spaces-dec-core"],
    optionalEvidenceIds: [],
    teacherComment: {
      title: "Term 1 descriptive feedback",
      review: "Review the October evidence, Civic / Community Needs Brief, Core Competency reflection, and any selected subject evidence that adds something new.",
      focus: "Comment on a current strength and next step connected to visible evidence. Do not summarize every activity or request another upload for the report.",
    },
  },
  {
    id: "march-report",
    label: "March progress report",
    months: "January–March",
    purpose: "Show progress through one major creative project, inquiry teaching, Core Competency reflection, and a scientific investigation before spring break.",
    requiredEvidenceIds: ["spaces-jan-bloxels", "spaces-feb-inquiry", "spaces-feb-core", "spaces-mar-science"],
    optionalEvidenceIds: ["spaces-jan-math", "spaces-feb-ela", "spaces-mar-minecraft"],
    teacherComment: {
      title: "March progress-report comment",
      review: "Compare current evidence with the December feedback, including the Bloxels project, inquiry teach-back, Science investigation, and any selected progress sample.",
      focus: "Describe growth since Term 1, a current strength, and the most useful next step. Comment on existing evidence instead of assigning a report-only post.",
    },
  },
  {
    id: "june-final",
    label: "June final",
    months: "April–June",
    purpose: "Use substantial design, Mathematics, Science, literacy, and Core Competency evidence to show year-end learning without posting every component task.",
    requiredEvidenceIds: ["spaces-apr-zoo", "spaces-may-design", "spaces-june-minecraft", "spaces-june-final"],
    optionalEvidenceIds: ["spaces-apr-choice", "spaces-may-food-budget", "spaces-may-literacy"],
    teacherComment: {
      title: "Final descriptive feedback",
      review: "Review the major spring designs, expert showcase, final Core Competency reflection, and earlier evidence the student selected to show change over time.",
      focus: "Name demonstrated growth, a next-year direction, and a specific contribution or learning habit. Use one final teacher comment rather than an extra summary assignment.",
    },
  },
];

export function spacesAnnualEvidenceSummary() {
  const majorAnchorPosts = spacesEvidenceRhythm.filter((moment) => moment.kind === "Required portfolio").length;
  const namedOptionalExamples = spacesEvidenceRhythm.filter((moment) => moment.kind === "Optional evidence").length;
  const teacherComments = spacesReportingWindows.length;
  return {
    majorAnchorPosts,
    namedOptionalExamples,
    teacherComments,
    referenceYearStudentPosts: spacesPortfolioBudget.referenceYearStudentPosts,
    additionalEvidenceFlexible: true,
  };
}

export function spacesEvidenceForReportingWindow(windowId: SpacesReportingWindowId) {
  const window = spacesReportingWindows.find((item) => item.id === windowId);
  if (!window) return null;
  const evidenceIds = new Set([...window.requiredEvidenceIds, ...window.optionalEvidenceIds]);
  return {
    ...window,
    evidence: spacesEvidenceRhythm.filter((moment) => evidenceIds.has(moment.id)),
  };
}

export function spacesEvidenceForMonth(month: string) {
  return spacesEvidenceRhythm.filter(item => item.month === month);
}

function activitySpacesPolicy(decision: ActivitySpacesPolicy["decision"], moment: SpacesEvidenceMoment): ActivitySpacesPolicy {
  return {
    decision,
    evidenceId: moment.id,
    title: moment.title,
    teacherPrompt: decision === "required"
      ? `Save to “${moment.title}.” Required evidence: ${moment.evidence}`
      : `Carry this learning into “${moment.title}.” Do not create a separate post.`,
    studentPrompt: decision === "required"
      ? `Your teacher will tell you what to add to “${moment.title}.”`
      : `Keep this work for “${moment.title}.” Do not make a new post now.`,
  };
}

export function spacesPolicyForActivity(activityId: string): ActivitySpacesPolicy | null {
  for (const moment of spacesEvidenceRhythm) {
    if (moment.primaryActivityId === activityId) return activitySpacesPolicy("required", moment);
    if (moment.contributorActivityIds?.includes(activityId)) return activitySpacesPolicy("reuse", moment);
  }
  return null;
}

export const assessmentPrinciples = [
  ["One artifact, several lenses", "A strong post may provide evidence in Science, ELA, Math, or ADST. Each learning area is assessed separately against the standards actually taught and visible."],
  ["Recent and varied evidence", "No single task decides a term result. Conferences, observations, products, investigations, explanations, and reflections build the picture together."],
  ["Individual evidence inside team learning", "The shared product matters, but an individual explanation, conference, contribution record, or reflection is needed before assigning individual proficiency."],
  ["Feedback before judgment", "Students need chances to understand quality, practise, receive feedback, and revise before a major assessment highlight."],
  ["Self-assessment is real evidence", "Students select artifacts, describe growth in Core Competencies, and set goals. They do not assign themselves a subject grade."],
] as const;
