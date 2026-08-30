export type CoverageRow = {
  subject: string;
  bigIdeas: string;
  competencies: string;
  content: string;
  signal: "strong" | "build" | "selected";
  next: string;
};

export const teachingOsCoverage: CoverageRow[] = [
  { subject: "English Language Arts", bigIdeas: "5 / 5", competencies: "15 / 19", content: "13 / 15", signal: "build", next: "Complete explicit mappings and supply packs." },
  { subject: "Mathematics", bigIdeas: "5 / 5", competencies: "13 / 18", content: "19 / 19", signal: "strong", next: "Keep Math Antics as the visual explanation lead; use MathUP to check coverage and select games or practice." },
  { subject: "Science", bigIdeas: "4 / 4", competencies: "13 / 27", content: "8 / 8", signal: "build", next: "Resolve blocks, vocabulary, visuals, and materials." },
  { subject: "Social Studies", bigIdeas: "4 / 4", competencies: "7 / 8", content: "9 / 9", signal: "strong", next: "Finish reusable source packs, keys, and models." },
  { subject: "Arts Education", bigIdeas: "4 / 4", competencies: "12 / 16", content: "5 / 10", signal: "build", next: "Clarify teachable mini-lessons and evidence routes." },
  { subject: "ADST", bigIdeas: "3 / 3", competencies: "22 / 29", content: "15 / 50", signal: "selected", next: "Keep selected-module scope explicit." },
  { subject: "Physical & Health", bigIdeas: "5 / 5", competencies: "12 / 19", content: "9 / 14", signal: "build", next: "Strengthen exact lesson supply and privacy routes." },
  { subject: "Career Education", bigIdeas: "6 / 6", competencies: "12 / 13", content: "11 / 12", signal: "strong", next: "Attach clearer individual evidence routes." },
];

export const operatingLayers = [
  { number: "01", title: "Curriculum registry", purpose: "Official standards, source links, local context, mappings, and honest coverage counts live once." },
  { number: "02", title: "Year + block ledger", purpose: "Months, shared projects, setup, flex time, portfolio anchors, and culmination load are counted once." },
  { number: "03", title: "Lesson Contract", purpose: "Readiness, exact logistics, teaching moves, access, assessment, sources, and carry-forward artifacts form one runnable record." },
  { number: "04", title: "Shared experience + agency layer", purpose: "Teacher and Student views use the same source; Newsroom and My Inquiry carry worthwhile questions across subjects without storing personal work in a shared browser." },
  { number: "05", title: "Evidence registry", purpose: "SpacesEDU decisions derive from one master rhythm: required, optional, in-class, or private support." },
  { number: "06", title: "Quality gates", purpose: "Automated and browser checks protect timing, materials, sources, accessibility, state, print, and public/private boundaries." },
];

export const maturityStates = [
  { code: "F", title: "Frame", detail: "Worthwhile question and sequence; not yet runnable." },
  { code: "D", title: "Developing", detail: "Teacher and Student paths agree; missing supply remains visible." },
  { code: "P", title: "Pilot-ready", detail: "Exact flow, assets, supports, key, sources, and evidence decision pass." },
  { code: "T", title: "Classroom-tested", detail: "Timing, misconceptions, access, and evidence were revised after use." },
  { code: "S", title: "Stable", detail: "Repeatable with routine source and context maintenance." },
];

export const readinessLevels = [
  ["R0", "Undeclared", "No prerequisite decision; generic mission questions do not count."],
  ["R1", "Oriented", "Concept, procedure, or no-readiness need is named."],
  ["R2", "Concept-ready", "Specific diagnostic, expected response, likely error, model, and reteach action."],
  ["R3", "Responsive", "Full, quick, review, and equivalent oral/observational routes."],
  ["R4", "Validated", "Revised from classroom evidence."],
] as const;

export const blockPressures = [
  { window: "Science spine", promise: "Dated half-year", source: "45–51 blocks", decision: "Interface and source now agree on roughly 3–4 blocks per instructional week.", level: "good" },
  { window: "Delivery Pod", promise: "3 × 60 min", source: "About 130–155 min", decision: "Duration now includes build, two tests, revision, cleanup, and individual explanation.", level: "good" },
  { window: "June", promise: "Culminate + reflect", source: "Space, showcase, Math design, ELA/Arts curation", decision: "Move, merge, shorten, or make evidence optional.", level: "critical" },
  { window: "SpacesEDU", promise: "12 canonical anchors", source: "≤ 2 required / month", decision: "Keep subject badges derived from the registry.", level: "good" },
] as const;

export const projectThreads = [
  { title: "Source Lab & Newsroom", path: "Named source → Quick Look or Deep Dive → careful claim → discuss, save a seed, or teacher-selected follow-up" },
  { title: "Learning Story", path: "September profile → goal check → competency reflections → June growth story" },
  { title: "Social Solutionary Inquiry", path: "Inquiry seeds → power and rights → source/system map → prototype → expert exchange" },
  { title: "Bloxels Story-Game", path: "Story blueprint → paper route → minimum build → silent test → two revisions → one post" },
  { title: "Science Expert Inquiry", path: "Inquiry passport → unit evidence/model/limit → focused question → expert teaching → reflection" },
  { title: "Math Design", path: "Concept workshops → exact model/calculations → peer audit → revision → selected evidence" },
];

export const contractChecks = [
  "Prerequisite concepts are taught or checked—not replaced by a procedure quiz.",
  "Every named card, diagram, source, organizer, rubric, and exemplar resolves.",
  "Exact quantities, setup, transitions, safety, cleanup, offline, and lower-prep routes fit the declared blocks.",
  "Teacher and Student scenes, products, materials, and assessment expectations agree.",
  "Portfolio work has individual evidence, criteria, an exemplar, a privacy decision, and a master registry ID.",
  "Local and Indigenous sources retain attribution, Nation/place context, use guidance, and a non-generalization boundary.",
];

export const preservationRules = [
  "Private Teacher Hub; broad public family window",
  "Math Antics-first teaching route, MathUP topic check, and current Math content coverage",
  "Forces readiness, Newton sequence, and Crash Lab",
  "Bloxels shared artifact with separate ELA/ADST lenses",
  "Social Studies inquiry spine and Fleetwood case work",
  "Checked current and historical source capsules feeding Source Lab & Newsroom and My Inquiry",
  "Surrey Schools-first and Nation-authored source safeguards",
  "Lean SpacesEDU rhythm and one-artifact/many-lenses rule",
  "Honest audit labels and existing quality gates",
];

export const activeQueue = [
  { state: "ALIGNED", title: "Student Agency pathways", detail: "Source Lab & Newsroom and My Inquiry now reuse checked source capsules, the existing Solutionary Inquiry, and the canonical SpacesEDU evidence rhythm." },
  { state: "REPAIRED", title: "Scoped print system", detail: "Each print action now targets its own teacher artifact without blanking unrelated pages." },
  { state: "ACTIVE", title: "Teaching OS control plane", detail: "Master architecture, maturity model, coverage snapshot, and timing pressures are now visible together." },
  { state: "ALIGNED", title: "Canonical evidence registry", detail: "Twelve anchors now name one primary activity; integrated contributors reuse the same post." },
  { state: "ALIGNED", title: "Science block ledger", detail: "The dated 45–51-block plan, three-block Delivery Pod, and shorter final showcase now agree." },
  { state: "WATCH", title: "Sensitive and authentic visuals", detail: "Use approved anatomy/reproduction diagrams and authentic, attributed local or Nation-led sources." },
];
