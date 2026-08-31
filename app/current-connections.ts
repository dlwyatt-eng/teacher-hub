import { surreyElectionSources } from "./surrey-election-2026-data";

export type CurrentConnectionStageId = "watch" | "notice" | "question" | "discuss" | "investigate" | "imagine";

export type CurrentConnectionSource = {
  id: string;
  title: string;
  organization: string;
  url: string;
  sourceKind: "official-page" | "official-data" | "official-map" | "official-news-release" | "official-photo-gallery";
  publishedOn?: string;
  updatedOn?: string;
  checkedOn: string;
  reproduction: "link-only" | "short-excerpt";
  lookFor: string;
};

export type CurrentConnectionClaim = {
  statement: string;
  verdict: "SUPPORTED" | "TOO CERTAIN" | "NOT SUPPORTED";
  explanation: string;
};

export type CurrentConnection = {
  id: string;
  lessonIds: readonly string[];
  title: string;
  question: string;
  minutes: string;
  checkedOn: string;
  reviewBy: string;
  refreshTriggers: readonly string[];
  visual: {
    kind: "population-estimate" | "transit-status" | "civic-power" | "results-check";
    eyebrow: string;
    headline: string;
    detail: string;
    signals: readonly { label: string; value: string }[];
  };
  sources: readonly CurrentConnectionSource[];
  stages: readonly {
    id: CurrentConnectionStageId;
    label: string;
    title: string;
    studentPrompt: string;
    teacherMove: string;
    responseModes: readonly string[];
  }[];
  wonderChoices: readonly string[];
  claims: readonly CurrentConnectionClaim[];
  boundary: {
    supported: readonly string[];
    notSupported: readonly string[];
  };
  publicWindow?: {
    state: "draft" | "published" | "retired";
    from: string;
    until: string;
    topic: string;
    preview?: {
      kind: "short-text";
      label: string;
      text: string;
      credit: string;
      sourceUrl: string;
      checkedOn: string;
      prompt: string;
    };
    factStrip?: readonly {
      value: string;
      label: string;
      note: string;
    }[];
    statusStrip?: readonly {
      label: string;
      detail: string;
      state: "now" | "building" | "future";
    }[];
    summary: string;
    whyNow: string;
    subjectConnections: readonly string[];
    studentFirstMove: string;
    inquirySeeds: readonly string[];
    familyConversationPrompt: string;
    spacesDisposition: "discussion-only" | "possible-selected-evidence";
  };
  teacher: {
    beforeClass: readonly string[];
    offlineFallback: string;
    shortRoute: string;
  };
};

const sharedStages = (copy: {
  watch: string;
  notice: string;
  question: string;
  discuss: string;
  investigate: string;
  imagine: string;
}): CurrentConnection["stages"] => [
  { id: "watch", label: "LOOK", title: "Meet the source before anyone explains", studentPrompt: copy.watch, teacherMove: "Give 20 quiet seconds. Keep the caption or explanation covered until students have looked.", responseModes: ["look", "listen"] },
  { id: "notice", label: "NOTICE", title: "Collect clues we can point to", studentPrompt: copy.notice, teacherMove: "Collect two exact details. Ask students to point to the date, number, label, object, or status word that supports each one.", responseModes: ["point", "talk", "board"] },
  { id: "question", label: "CLAIM", title: "Make a possible claim and keep a question attached", studentPrompt: copy.question, teacherMove: "Record one careful first claim and one uncertainty before opening the source context.", responseModes: ["talk", "choose", "paper"] },
  { id: "discuss", label: "COMPARE", title: "Test the claim with other people", studentPrompt: copy.discuss, teacherMove: "Use pairs or triads. Evidence Finder points to a clue, Challenger names an assumption, and Reporter gives the team's careful sentence.", responseModes: ["pairs", "triads", "report"] },
  { id: "investigate", label: "CHECK", title: "Open the source record", studentPrompt: copy.investigate, teacherMove: "Reveal one claim at a time. Teams decide first; then open the caption, source record, date, or explanation and name what changes.", responseModes: ["decide", "check", "talk"] },
  { id: "imagine", label: "NEXT", title: "Revise, stop, save a question, or continue", studentPrompt: copy.imagine, teacherMove: "Build one shared sentence using: At first… Now… because… We still cannot say… Then choose: discuss and stop, save a seed, or teacher-selected follow-up.", responseModes: ["talk", "paper", "board"] },
];

function electionConnectionSource(id: (typeof surreyElectionSources)[number]["id"], lookFor: string): CurrentConnectionSource {
  const source = surreyElectionSources.find((item) => item.id === id);
  if (!source) throw new Error(`Missing Surrey election source: ${id}`);
  return {
    id: source.id,
    title: source.title,
    organization: source.organization,
    url: source.url,
    sourceKind: "official-page",
    checkedOn: "2026-08-23",
    reproduction: "link-only",
    lookFor,
  };
}

export const currentConnections: readonly CurrentConnection[] = [
  {
    id: "canada-population-estimate-q1-2026",
    lessonIds: ["magnitude-gallery"],
    title: "Is 41,417,056 a count—or an estimate?",
    question: "What does this huge number really tell us before we calculate with it?",
    minutes: "10–15 min",
    checkedOn: "2026-08-15",
    reviewBy: "2026-09-30",
    refreshTriggers: ["Statistics Canada publishes the next quarterly population estimate", "The lesson is taught after September 2026"],
    visual: {
      kind: "population-estimate",
      eyebrow: "STATISTICS CANADA · PRELIMINARY ESTIMATE",
      headline: "41,417,056",
      detail: "Estimated population of Canada on April 1, 2026—not a live head count today.",
      signals: [
        { label: "REFERENCE DATE", value: "APR. 1, 2026" },
        { label: "SCALE", value: "ABOUT 41.4 MILLION" },
        { label: "QUARTERLY CHANGE", value: "−0.1%" },
      ],
    },
    sources: [
      {
        id: "statcan-population-q1-2026",
        title: "Canada's population estimates, first quarter 2026",
        organization: "Statistics Canada",
        url: "https://www150.statcan.gc.ca/n1/daily-quotidien/260617/dq260617a-eng.htm",
        sourceKind: "official-data",
        publishedOn: "2026-06-17",
        checkedOn: "2026-08-15",
        reproduction: "short-excerpt",
        lookFor: "Find the words preliminary estimate, the reference date, and the reported quarterly change before discussing what the number means.",
      },
    ],
    stages: sharedStages({
      watch: "Read only what is on the number card: the number, date, and −0.1%. What do you see before anyone tells you what it means?",
      notice: "Point to the digit groups. Which part says millions? Which detail tells us this number belongs to a particular date?",
      question: "Was every person counted on April 1? Is this still the exact number today? What would Statistics Canada need in order to estimate it?",
      discuss: "Choose one statement below. In a pair, decide whether it sounds supported, too certain, or unsupported. Be ready to point to the number card and name one uncertainty.",
      investigate: "Decide which statements the official release supports. Listen for the words preliminary estimate and reference date.",
      imagine: "Say what the number tells us without pretending it is a live counter. Include the date and the word estimate. Then decide whether one question is worth saving.",
    }),
    wonderChoices: [
      "How can a country estimate people between censuses?",
      "Why could a careful estimate change later?",
      "How much is 0.1% of about 41.4 million?",
    ],
    claims: [
      { statement: "Canada had exactly 41,417,056 people when we opened this lesson.", verdict: "NOT SUPPORTED", explanation: "The release gives a preliminary estimate for April 1, 2026. It is not a live population counter." },
      { statement: "Canada's population was estimated at about 41.4 million on April 1, 2026.", verdict: "SUPPORTED", explanation: "This keeps the source's date, scale, and estimate language attached to the number." },
      { statement: "The population decrease happened for one simple reason.", verdict: "TOO CERTAIN", explanation: "The −0.1% change is reported, but one number alone does not prove a single cause." },
    ],
    boundary: {
      supported: ["The estimate is about 41.4 million.", "The reference date is April 1, 2026.", "The estimate decreased slightly during the quarter."],
      notSupported: ["An exact live population today.", "A claim about Surrey from a Canada-wide estimate.", "One cause for the change without more evidence."],
    },
    teacher: {
      beforeClass: ["Open the Statistics Canada release once and confirm that a newer quarterly estimate has not replaced it.", "Keep the number card as the no-link projector fallback."],
      offlineFallback: "Use the checked number card on this screen. Students can still read its date, scale, and estimate status without opening the live source.",
      shortRoute: "SEE for 20 seconds → collect two details → reveal the supported claim → write one dated estimate sentence.",
    },
  },
  {
    id: "fleetwood-skytrain-current-work-2026",
    lessonIds: ["maps-make-arguments"],
    title: "What is being built now—and what is still on the plan?",
    question: "How can one official project use maps and status words to show both the present and the future?",
    minutes: "12–18 min",
    checkedOn: "2026-08-20",
    reviewBy: "2026-09-25",
    refreshTriggers: ["A new construction advisory is posted", "The anticipated in-service date changes", "The lesson is taught after September 25, 2026"],
    visual: {
      kind: "transit-status",
      eyebrow: "SURREY–LANGLEY SKYTRAIN · STATUS, NOT A ROUTE MAP",
      headline: "BUILDING NOW ≠ RIDING NOW",
      detail: "Major construction is underway. Passenger service on the extension is not running yet; late 2029 is an anticipated date, not a guarantee.",
      signals: [
        { label: "PROJECT", value: "16 km" },
        { label: "PLANNED STATIONS", value: "8" },
        { label: "CURRENT STATUS", value: "CONSTRUCTION" },
      ],
    },
    sources: [
      {
        id: "slst-progress-news-2026",
        title: "New SkyTrain stations taking shape for transit riders south of Fraser River",
        organization: "Province of British Columbia · BC Gov News",
        url: "https://archive.news.gov.bc.ca/releases/news_releases_2024-2028/2026TT0022-000515.htm",
        sourceKind: "official-news-release",
        publishedOn: "2026-05-08",
        checkedOn: "2026-08-20",
        reproduction: "short-excerpt",
        lookFor: "Find one detail happening now and one forecast about the future. Remember that this is a government announcement about its own project, not independent reporting.",
      },
      {
        id: "slst-current-work",
        title: "Current Work",
        organization: "Province of British Columbia · Surrey Langley SkyTrain",
        url: "https://surreylangleyskytrain.gov.bc.ca/current-work/",
        sourceKind: "official-page",
        checkedOn: "2026-08-20",
        reproduction: "link-only",
        lookFor: "On Current Work, find a present-tense construction detail and a date. Do not treat a construction update as proof that passenger service is running.",
      },
      {
        id: "slst-maps",
        title: "Maps",
        organization: "Province of British Columbia · Surrey Langley SkyTrain",
        url: "https://surreylangleyskytrain.gov.bc.ca/maps/",
        sourceKind: "official-map",
        checkedOn: "2026-08-20",
        reproduction: "link-only",
        lookFor: "On the map, find the extension line, station symbols, and Fleetwood locations. Notice what the map represents and what experiences it cannot show.",
      },
      {
        id: "slst-project",
        title: "Surrey Langley SkyTrain",
        organization: "Province of British Columbia",
        url: "https://surreylangleyskytrain.gov.bc.ca/",
        sourceKind: "official-page",
        checkedOn: "2026-08-20",
        reproduction: "link-only",
        lookFor: "Find the project length, planned station count, current project wording, and the word anticipated beside the future in-service date.",
      },
      {
        id: "slst-photos-videos",
        title: "Photos and Videos",
        organization: "Province of British Columbia · Surrey Langley SkyTrain",
        url: "https://surreylangleyskytrain.gov.bc.ca/photos-and-videos/",
        sourceKind: "official-photo-gallery",
        checkedOn: "2026-08-20",
        reproduction: "link-only",
        lookFor: "Choose one dated progress photograph. Separate what the image shows from what its project caption claims, and notice what is outside the frame.",
      },
    ],
    stages: sharedStages({
      watch: "Look at the status card and the official map when your teacher opens it. What is shown as present? What is drawn for the future?",
      notice: "Point to one status word, date, distance, station symbol, or construction detail. Say exactly what it shows.",
      question: "Which parts can people use now? What might construction change near a school or business? Whose experience is not shown by a project map?",
      discuss: "Choose one statement below. In a pair or triad, decide whether it is supported, too certain, or unsupported. Evidence Finder points to a source detail; Challenger names what is missing; Reporter gives the team's sentence.",
      investigate: "Decide which statements are supported now. Pay attention to the difference between underway, planned, and anticipated.",
      imagine: "Repair the sentence ‘SkyTrain is in Fleetwood’ so it separates construction happening now from passenger service planned for later. Then decide whether a local question is worth carrying forward.",
    }),
    wonderChoices: [
      "What could we observe safely near the construction without guessing about its effects?",
      "Which people or places might experience the project differently?",
      "What can a project map show well—and what does it leave out?",
    ],
    claims: [
      { statement: "Passenger SkyTrain service is already running through Fleetwood.", verdict: "NOT SUPPORTED", explanation: "The official pages describe major construction. They do not say passenger service on the extension is operating." },
      { statement: "Major construction is underway on a planned 16-kilometre extension with eight stations.", verdict: "SUPPORTED", explanation: "The current-work and project pages support this careful present-plus-plan statement." },
      { statement: "The extension will definitely open in late 2029.", verdict: "TOO CERTAIN", explanation: "The project uses anticipated for late 2029. A future target is not a guarantee." },
      { statement: "The project will affect every Fleetwood household in the same way.", verdict: "NOT SUPPORTED", explanation: "A project map and construction page do not provide every household's experience or viewpoint." },
    ],
    boundary: {
      supported: ["Substantial construction is underway.", "The official plan shows a 16-kilometre extension and eight stations.", "Late 2029 is an anticipated in-service date."],
      notSupported: ["Passenger service is running now.", "Late 2029 is guaranteed.", "The map proves one effect for every nearby person, school, or business."],
    },
    publicWindow: {
      state: "published",
      from: "2026-08-20",
      until: "2026-09-25",
      topic: "Fleetwood · construction, maps, and future transit",
      preview: {
        kind: "short-text",
        label: "BC GOVERNMENT NEWS RELEASE · MAY 8, 2026",
        text: "All eight stations along the 16-kilometre extension are now under construction.",
        credit: "Province of British Columbia · Ministry of Transportation and Transit",
        sourceUrl: "https://archive.news.gov.bc.ca/releases/news_releases_2024-2028/2026TT0022-000515.htm",
        checkedOn: "2026-08-20",
        prompt: "Which words describe something happening now—and which details on the full page describe a future plan?",
      },
      factStrip: [
        { value: "16 km", label: "PLANNED EXTENSION", note: "Length named by the project" },
        { value: "8", label: "STATIONS", note: "All were under construction May 8, 2026" },
        { value: ">30%", label: "GUIDEWAY COMPLETE", note: "Reported in the May 8 news release" },
        { value: "late 2029", label: "ANTICIPATED SERVICE", note: "A forecast—not a guarantee" },
      ],
      statusStrip: [
        { label: "HAPPENING NOW", detail: "Station and guideway construction", state: "now" },
        { label: "STILL BEING BUILT", detail: "Track, stations, systems, and testing", state: "building" },
        { label: "ANTICIPATED FUTURE", detail: "Passenger service in late 2029", state: "future" },
      ],
      summary: "Major construction is underway on the planned 16-kilometre Surrey–Langley SkyTrain extension with eight stations. Passenger service is not running on the extension; late 2029 is described as an anticipated in-service date.",
      whyNow: "Students in Fleetwood can see signs of a major local change. This feature helps them separate construction happening now, a future plan, and the different experiences a project map cannot show by itself.",
      subjectConnections: ["Social Studies", "English Language Arts", "ADST"],
      studentFirstMove: "Find and point to one word or number that describes the project now, and one that describes the future plan. Do not explain the effects yet.",
      inquirySeeds: ["What can an official project map show well, and what does it leave out?", "How might construction be experienced differently by students, businesses, transit riders, and nearby residents?", "What evidence would help us describe a local change without guessing?"],
      familyConversationPrompt: "What change have you noticed along Fraser Highway, and what would we need to check before claiming who benefits or faces difficulty?",
      spacesDisposition: "discussion-only",
    },
    teacher: {
      beforeClass: ["Open Current Work and Maps in teacher tabs. Check the newest advisory and the anticipated in-service wording.", "Do not send students to construction areas or ask them to photograph people, homes, licence plates, or work sites."],
      offlineFallback: "Use the checked status card on this screen and a teacher-saved official map view. Students can still separate present status from a future plan.",
      shortRoute: "SEE the status card → collect two exact details → reveal the running-now claim → repair one sentence together.",
    },
  },
  {
    id: "surrey-election-claims-and-power-2026",
    lessonIds: ["trace-the-claim", "perspective-without-guessing", "compare-government-systems", "civic-decision-brief"],
    title: "Can the winner do that alone?",
    question: "How can we test a campaign promise against the real job, the evidence, and the people who must decide together?",
    minutes: "12–20 min",
    checkedOn: "2026-08-23",
    reviewBy: "2026-10-16",
    refreshTriggers: ["The City of Surrey changes its roles or candidate pages", "The class opens this feature before the official candidate list is posted", "A campaign claim is added to the projector comparison"],
    visual: {
      kind: "civic-power",
      eyebrow: "SURREY ELECTION · CLAIM → AUTHORITY → EVIDENCE",
      headline: "A PROMISE IS NOT A POWER",
      detail: "First identify the office. Then check what that office can decide, who must act together, and which other government or evidence may be needed.",
      signals: [
        { label: "MAYOR", value: "LEADS COUNCIL" },
        { label: "COUNCIL", value: "DECIDES TOGETHER" },
        { label: "TRUSTEES", value: "BOARD DECIDES TOGETHER" },
      ],
    },
    sources: [
      electionConnectionSource("surrey-roles", "Choose one mayor, council, or trustee responsibility. Find the wording that shows whether one person can act alone or a council or board must decide together."),
      electionConnectionSource("surrey-candidates", "Use the official list only after nominations close. Choose one candidate statement from a teacher-opened source, record its exact words and date, and do not infer a position from a name or photograph."),
      electionConnectionSource("surrey-board", "Find the board's responsibilities and the sentence explaining that trustees act as a board rather than as individuals."),
      electionConnectionSource("digital-democracy", "Use one verification move to separate the campaign claim, the supporting evidence, and a conclusion the source does not yet prove."),
    ],
    stages: sharedStages({
      watch: "Open the official roles page beside one teacher-selected, dated campaign statement. Read the claim exactly. Do not decide whether you agree yet.",
      notice: "Point to the action word in the promise and the responsibility wording on the official page. Name the office, the decision, and anyone else who may need to act.",
      question: "Is this a fact, opinion, claim, or promise? What evidence would show whether it is possible, funded, legal, and within this office's power?",
      discuss: "In a pair or triad, test one statement below. Evidence Finder points to the roles source; Power Checker names who must decide; Reporter gives a neutral sentence and one uncertainty.",
      investigate: "Check the official roles and board pages. Then decide whether the statement is supported, too certain, or not supported without ranking the candidate.",
      imagine: "Repair the promise into a careful sentence: ‘If elected, this person could ___, but ___ would also need to decide, fund, approve, or provide evidence.’ Keep one missing perspective visible.",
    }),
    wonderChoices: [
      "Which part could this office actually start or influence?",
      "Which part requires council, the school board, the province, funding, or time?",
      "Whose experience or evidence is missing from this promise?",
    ],
    claims: [
      { statement: "A Surrey mayor can carry out every campaign promise without council approval.", verdict: "NOT SUPPORTED", explanation: "The City describes the mayor as leading council, while council makes municipal decisions collectively at official meetings." },
      { statement: "Surrey councillors make decisions together through council rather than acting as nine separate city governments.", verdict: "SUPPORTED", explanation: "The official roles page says council acts as a governing body through bylaws, resolutions, meetings, and collective decisions." },
      { statement: "One elected school trustee can change district policy alone.", verdict: "NOT SUPPORTED", explanation: "Surrey Schools explains that trustees must act as a board; only the board as a whole can decide board actions." },
      { statement: "A promise about schools, roads, transit, housing, or safety always belongs to only one level of government.", verdict: "TOO CERTAIN", explanation: "Many public issues involve different responsibilities, funding partners, laws, and timelines. The exact promise must be checked." },
    ],
    boundary: {
      supported: ["Mayor, council, and school trustee are different elected roles.", "Council and the Board of Education make many decisions collectively.", "A campaign promise can be checked against official responsibilities and dated evidence."],
      notSupported: ["A candidate is better because one promise sounds confident.", "One elected person can always deliver a promise alone.", "A missing perspective can be invented instead of sourced."],
    },
    publicWindow: {
      state: "published",
      from: "2026-09-26",
      until: "2026-10-16",
      topic: "Surrey election · promises, evidence, and real power",
      factStrip: [
        { value: "1", label: "MAYOR", note: "Leads council; does not replace council" },
        { value: "8", label: "COUNCILLORS", note: "Work with the mayor as city council" },
        { value: "6", label: "SURREY TRUSTEES", note: "Elected in Surrey for the Board of Education" },
        { value: "TOGETHER", label: "HOW DECISIONS HAPPEN", note: "Council and the board act collectively" },
      ],
      statusStrip: [
        { label: "1 · NAME THE CLAIM", detail: "Keep the candidate's exact words and date", state: "now" },
        { label: "2 · CHECK THE POWER", detail: "Open the official roles source", state: "building" },
        { label: "3 · TRACE WHAT'S NEEDED", detail: "Evidence, votes, funding, partners, and time", state: "future" },
      ],
      summary: "Students test a real, teacher-selected campaign statement against official Surrey descriptions of mayor, council, and trustee responsibilities. The goal is a more accurate claim—not a candidate ranking.",
      whyNow: "The official candidate period is underway, so students can move from generic civics to dated local evidence while keeping political neutrality and jurisdiction visible.",
      subjectConnections: ["Social Studies", "English Language Arts", "Media Literacy"],
      studentFirstMove: "Open the official roles page. Beside one teacher-selected campaign statement, point to the action word, name the office, and find who must decide with that person.",
      inquirySeeds: ["What can this office actually decide?", "Which promise needs another government, a collective vote, funding, evidence, or time?", "Whose perspective is missing from the way this issue is described?"],
      familyConversationPrompt: "Choose one local promise you have heard. Which elected body could act on it, and what else would have to happen?",
      spacesDisposition: "discussion-only",
    },
    teacher: {
      beforeClass: ["Open the official Surrey candidate list, roles page, and Board of Education overview. Choose one short dated statement that makes a checkable public-action claim.", "Keep candidate coverage balanced over time; investigate authority and evidence, not personality, popularity, or family voting preference."],
      offlineFallback: "Project or print the checked roles summary and write one anonymized promise on the board. Teams can still identify the office, collective decision-maker, evidence needed, and missing perspective.",
      shortRoute: "READ one promise → CIRCLE its action word → CHECK the official role → NAME who else must decide → REWRITE the claim carefully.",
    },
  },
  {
    id: "surrey-election-results-and-next-2026",
    lessonIds: ["civic-decision-brief", "compare-government-systems", "perspective-without-guessing"],
    title: "When results are posted, what can the winners do next?",
    question: "What do the results show—and what still has to happen before an election promise becomes a public decision?",
    minutes: "15–25 min",
    checkedOn: "2026-08-23",
    reviewBy: "2026-10-23",
    refreshTriggers: ["The City of Surrey posts preliminary results", "Official results replace preliminary results", "CIVIX publishes Student Vote results", "A recount, judicial review, or result-status notice appears"],
    visual: {
      kind: "results-check",
      eyebrow: "OCTOBER 17–23 · RESULT → RESPONSIBILITY → NEXT STEP",
      headline: "RESULT POSTED? CHECK BEFORE EXPLAINING",
      detail: "After polls close, check whether an official result is available and record its status. Only then compare with available Student Vote results and trace what the elected council or board can actually do next.",
      signals: [
        { label: "OFFICIAL RESULT", value: "CHECK STATUS + DATE" },
        { label: "STUDENT VOTE", value: "COMPARE, DON'T EQUATE" },
        { label: "NEXT", value: "TRACE THE REAL DECISION" },
      ],
    },
    sources: [
      electionConnectionSource("surrey-election", "Open the election results door only after polls close. Identify whether the result is preliminary or official, the update time, and the office before recording any outcome."),
      electionConnectionSource("student-vote", "After polls close, look for the published Student Vote results. If they are not available yet, say ‘not available yet’ and continue without inventing or substituting a class tally."),
      electionConnectionSource("surrey-roles", "Return to the official role descriptions. For one winner's promise, identify what the office can begin and what requires council, the board, another government, funding, or time."),
      electionConnectionSource("surrey-board", "For trustee results, use the board overview to check why an elected trustee still acts through the board rather than changing district policy alone."),
    ],
    stages: sharedStages({
      watch: "Open the official Surrey result page after polls close. Look for the result status, update date or time, office, and elected label before reading reactions or explanations.",
      notice: "If results are posted, point to two details the official result page shows. If they are not available yet, record that status and stop. If Student Vote results are available, identify their label and remember they represent participating students, not the official electorate.",
      question: "When a verified result is available, what surprises us? Which result or issue needs more context? Does a win show what happened in the vote, or prove that every promise can now happen?",
      discuss: "When results are available, compare one official result with one class question or available Student Vote result in a pair or triad. Evidence Finder names the result; Power Checker opens the roles page; Reporter explains one next step and one limit.",
      investigate: "After a winner is verified, check that person's actual role. Sort one promise into: the office can begin; council or board must vote; another government or funding partner is needed; evidence, consultation, or time is needed.",
      imagine: "Once a result is verified, complete the reflection: ‘I was surprised by ___. The result shows ___. It does not prove ___. A realistic next step is ___. People can still influence this decision by ___.’",
    }),
    wonderChoices: [
      "What surprised us, and which exact result or source detail caused the surprise?",
      "Which promise requires council, the school board, the province, funding, consultation, or time?",
      "How can students and other residents continue to influence a decision after election day?",
    ],
    claims: [
      { statement: "Winning the mayoral election means the mayor can carry out every promise alone.", verdict: "NOT SUPPORTED", explanation: "The mayor leads council, but council acts collectively on municipal decisions and must work within laws, budgets, evidence, and timelines." },
      { statement: "Official election results show who was elected; they do not prove that every winning idea is possible or supported by everyone.", verdict: "SUPPORTED", explanation: "A result answers who received the required votes. Claims about feasibility, authority, cost, or public agreement need other evidence." },
      { statement: "One elected trustee can change a Surrey Schools policy alone.", verdict: "NOT SUPPORTED", explanation: "Trustees debate and vote as the Board of Education. Individual trustees do not decide board actions by themselves." },
      { statement: "People who cannot vote have no way to influence public decisions after election day.", verdict: "NOT SUPPORTED", explanation: "People can ask questions, provide evidence, attend public meetings, join consultations, contact elected bodies, organize, and take community action." },
    ],
    boundary: {
      supported: ["The dated official result page identifies who was elected once results are posted.", "Student Vote results, when published, show the choices of participating students and can be compared carefully.", "Winning an election begins a period of governing within real roles, collective decisions, budgets, laws, and timelines."],
      notSupported: ["A search snippet or social post is the official result.", "Student Vote results are the same as Surrey's official election results.", "Winning proves that every promise will happen or that public influence is finished."],
    },
    publicWindow: {
      state: "published",
      from: "2026-10-17",
      until: "2026-10-23",
      topic: "Surrey election · results, responsibility, and what happens next",
      statusStrip: [
        { label: "1 · OFFICIAL SURREY RESULT", detail: "Check preliminary or official status and date", state: "now" },
        { label: "2 · STUDENT VOTE", detail: "Compare only when CIVIX publishes results", state: "building" },
        { label: "3 · WHAT NEXT", detail: "Trace authority, votes, funding, evidence, and time", state: "future" },
      ],
      summary: "After polls close, students check the official Surrey results page and use Student Vote results only when available. They then use the roles sources to move from ‘who won?’ to ‘what can happen next?’ without treating a result as proof that every promise is possible.",
      whyNow: "Once official results are posted, the first days after the vote are the strongest moment to examine collective power, practical limits, continued participation, and the difference between a result and governing.",
      subjectConnections: ["Social Studies", "English Language Arts", "Media Literacy"],
      studentFirstMove: "Open the City of Surrey election page. Find the result status and update time before recording any winner. If results are not posted yet, say ‘not available yet’ and stop there.",
      inquirySeeds: ["What surprised us, and what source detail supports that response?", "Which winning promise can the office act on, and which part needs council, the board, the province, funding, evidence, consultation, or time?", "How can people—including students—continue to influence what happens next?"],
      familyConversationPrompt: "What should an elected council or school board do first after winning, and what evidence or public input should it seek?",
      spacesDisposition: "discussion-only",
    },
    teacher: {
      beforeClass: ["After polls close, open the City of Surrey election page and confirm whether results are preliminary or official. Open Student Vote only if CIVIX has published results.", "Choose one campaign promise already studied and keep the roles page ready. Do not improvise candidate names, results, margins, or student totals from memory or search snippets."],
      offlineFallback: "Use a teacher-saved or printed official results view with its status and timestamp, plus the checked roles summary. If no verified result is available, run the ‘what happens after a win?’ scenario without naming a winner.",
      shortRoute: "CHECK result status → NAME one surprise → COMPARE one available Student Vote detail → TRACE one promise through real authority → NAME one way people still influence.",
    },
  },
] as const;

export function currentConnectionForLesson(lessonId: string, today = new Date()) {
  const matches = currentConnections.filter((connection) => connection.lessonIds.includes(lessonId));
  const dateKey = currentConnectionVancouverDateKey(today);
  const activePublished = matches.find((connection) => {
    const window = connection.publicWindow;
    return Boolean(window && window.state === "published" && window.from <= dateKey && dateKey <= window.until);
  });
  if (activePublished) return activePublished;
  return matches.find((connection) => !connection.publicWindow);
}

export function currentConnectionVancouverDateKey(value = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  return year && month && day ? `${year}-${month}-${day}` : "";
}

export function currentConnectionIsFresh(connection: CurrentConnection, today = new Date()) {
  return /^\d{4}-\d{2}-\d{2}$/.test(connection.reviewBy) && currentConnectionVancouverDateKey(today) <= connection.reviewBy;
}

export function currentConnectionForNewsroomDate(today = new Date()) {
  const dateKey = currentConnectionVancouverDateKey(today);
  const features = currentConnections
    .filter((connection) => connection.publicWindow?.state === "published")
    .sort((left, right) => (left.publicWindow?.from ?? "").localeCompare(right.publicWindow?.from ?? ""));
  const active = features.find((connection) => {
    const window = connection.publicWindow;
    return Boolean(window && window.from <= dateKey && dateKey <= window.until);
  });
  if (active) return active;
  const latestPast = [...features].reverse().find((connection) => (connection.publicWindow?.from ?? "") <= dateKey);
  return latestPast ?? features[0] ?? currentConnections[0];
}
