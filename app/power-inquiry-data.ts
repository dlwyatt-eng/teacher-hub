export type PowerLensId = "political" | "economic" | "information" | "relational";

export const powerInquiry = {
  recurringQuestion: "How much power do ordinary people have over the decisions that shape their lives?",
  culminatingQuestion: "What does it mean for people to truly govern themselves?",
  keyUnderstanding: "Information does not have to be false to shape how we understand reality.",
} as const;

export const powerLenses = [
  {
    id: "political",
    number: "01",
    label: "Political power",
    studentLabel: "Decisions",
    question: "Who can make or change the rule?",
    clues: ["choosing leaders", "making rules", "challenging a decision", "protecting missing voices"],
  },
  {
    id: "economic",
    number: "02",
    label: "Economic power",
    studentLabel: "Money + resources",
    question: "Who controls money, jobs, land, or resources?",
    clues: ["ownership", "donations or lobbying", "work and unions", "access to leaders"],
  },
  {
    id: "information",
    number: "03",
    label: "Information power",
    studentLabel: "The story",
    question: "Who decides what people see or hear?",
    clues: ["ownership and funding", "facts shown or skipped", "images and emotion", "algorithms and repetition"],
  },
  {
    id: "relational",
    number: "04",
    label: "Relationships & responsibilities",
    studentLabel: "Care + responsibility",
    question: "Who or what must we care for?",
    clues: ["people and communities", "land and water", "other living beings", "future generations"],
  },
] as const satisfies readonly {
  id: PowerLensId;
  number: string;
  label: string;
  studentLabel: string;
  question: string;
  clues: readonly string[];
}[];

export const powerCheckQuestions = [
  "Who has power?",
  "Who gets heard?",
  "Who gains?",
  "Who gives something up?",
  "Who or what is missing?",
  "Who controls the story?",
  "What could make it fairer?",
] as const;

export const unitPowerFocus: Record<string, readonly PowerLensId[]> = {
  "place-evidence-perspective": ["information", "relational"],
  "power-rights-government": ["political", "economic", "relational"],
  "global-systems": ["economic", "information", "relational"],
  "solutionary-inquiry": ["political", "economic", "information", "relational"],
};

export const powerTerms = [
  { term: "Lease", meaning: "An agreement that lets someone use land or property for a set time without owning it." },
  { term: "Forecast", meaning: "A best estimate about what may happen later—not a result that has already happened." },
  { term: "Median", meaning: "The middle value when amounts are placed in order." },
  { term: "Rights-holder", meaning: "A person, group, or Nation whose rights must be respected in a decision." },
  { term: "Framing", meaning: "Choices about what to include, leave out, picture, and put first." },
  { term: "Bias", meaning: "A tendency that makes some ideas, evidence, or people easier to notice. Bias does not make every fact false." },
  { term: "Persuasion", meaning: "An attempt to influence what people think, feel, or do." },
  { term: "Advertising", meaning: "A paid or placed message meant to promote a product, service, person, event, or idea." },
  { term: "Propaganda", meaning: "Organized messages that push a group toward a belief or action, often using emotion, repetition, symbols, and selected information." },
  { term: "Misinformation", meaning: "False or misleading information shared by someone who believes it or has not checked it." },
  { term: "Disinformation", meaning: "False or misleading information deliberately created or shared to deceive." },
  { term: "Algorithm", meaning: "Rules a digital service uses to sort or recommend content." },
  { term: "Oligarchy", meaning: "A system or situation in which a small group holds much more power than most people." },
] as const;

export const heronCommonsFacts = [
  "Baytree Council voted 6–3 for a 30-year lease with TrailSpark Developments.",
  "Baytree keeps ownership of the four-hectare former works yard beside Willow River.",
  "The proposal includes 240 rental homes; 60 would be 20% below the city median for 15 years.",
  "It includes a public river path and a small market and maker hall.",
  "Twenty-four mature cottonwoods would be removed and 120 native trees planted.",
  "An independent ecology report says replacement habitat will take years and a nesting-bird survey is still required.",
  "The developer estimates 160 construction jobs, but the agreement does not guarantee local hiring, union labour, wages, or permanent jobs.",
  "City staff project $16 million in lease payments over 30 years. This is a forecast, not money already received.",
  "Council received 438 written submissions: 221 support, 187 oppose, and 30 are neutral. This is not a poll of all residents.",
  "Building and environmental permits are still required, and an annual public progress report must be published.",
] as const;

export type HeronSource = {
  id: string;
  role: string;
  publisher: string;
  funding: string;
  headline: string;
  account: string;
  centres: string;
  skips: string;
  imageChoice: string;
  wants: string;
};

export const heronSources: readonly HeronSource[] = [
  {
    id: "public-broadcaster",
    role: "Public broadcaster",
    publisher: "Baytree Public Radio",
    funding: "Public grant and listener donations; independent board",
    headline: "Baytree council approves Heron Commons lease in 6–3 vote",
    account: "Council approved a 30-year lease for 240 rental homes and a public riverside path. Baytree keeps ownership. TrailSpark still needs building and environmental permits.",
    centres: "The formal decision and what happens next",
    skips: "Affordability ending, trees, jobs, public submissions, and projected money",
    imageChoice: "A wide crop showing the public yard, river, and plan board",
    wants: "Help listeners understand what council decided",
  },
  {
    id: "owner-newspaper",
    role: "Wealthy-owner newspaper",
    publisher: "The Baytree Beacon",
    funding: "Subscriptions and ads; owned by Raven Media and a wealthy investor with other property holdings",
    headline: "From fenced yard to 240 homes: Baytree moves at last",
    account: "The fenced Heron Yard may become homes, shops, and a river walk. TrailSpark estimates 160 construction jobs, while city staff project $16 million in lease payments.",
    centres: "Growth, speed, jobs, and revenue",
    skips: "Job guarantees, affordability ending, tree loss, opposition, and permits",
    imageChoice: "A bright crop of the model, cranes, and a family",
    wants: "Build support for moving ahead quickly",
  },
  {
    id: "worker-coop",
    role: "Worker and community co-op",
    publisher: "Work & Neighbourhood",
    funding: "Worker and community member dues",
    headline: "Big job number, small guarantee at Heron Commons",
    account: "TrailSpark predicts 160 construction jobs, but the lease does not require local hiring, union labour, or set wages. Sixty below-median rentals are planned, but that price rule ends after 15 years.",
    centres: "Who receives jobs and lasting affordability",
    skips: "The river path, replacement trees, projected city revenue, and selection process",
    imageChoice: "Workers and hard hats beside the locked gate",
    wants: "Win enforceable worker and community benefits",
  },
  {
    id: "government",
    role: "Government communication",
    publisher: "City of Baytree Communications",
    funding: "Taxpayers",
    headline: "Council approves next step for Heron Commons",
    account: "Council approved a lease that keeps the land public while advancing 240 planned rental homes, a public path, a maker hall, and 120 new native trees. A yearly public report will track progress.",
    centres: "Council action and intended public benefits",
    skips: "The split vote, opposition, removed trees, habitat delay, and job limits",
    imageChoice: "The concept model and benefit areas",
    wants: "Explain and build confidence in council's decision",
  },
  {
    id: "corporate-pr",
    role: "Company public relations",
    publisher: "TrailSpark Developments",
    funding: "The developer",
    headline: "TrailSpark chosen to bring the Heron Commons vision forward",
    account: "Our plan would create 240 rental homes, open a river path, plant 120 native trees, and support an estimated 160 construction jobs. We look forward to completing permit reviews.",
    centres: "Company promises and positive future images",
    skips: "Removed trees, affordability ending, no job guarantee, opposition, and 30-year commercial control",
    imageChoice: "Homes, the path, young trees, and smiling visitors",
    wants: "Build trust in the company and its proposal",
  },
  {
    id: "activist",
    role: "Activist organization",
    publisher: "Keep Willow Wild",
    funding: "Supporter donations",
    headline: "Public land, private control: 30-year lease puts mature trees at risk",
    account: "The lease would give a private developer control of construction and shops for 30 years. Twenty-four mature cottonwoods could be removed, and the ecology report says replacement habitat will take years.",
    centres: "Public control, habitat, and opponents",
    skips: "Homes, the public path, replacement trees, supporters, revenue, and unfinished permits",
    imageChoice: "The cottonwood canopy and the heron",
    wants: "Build pressure for stronger environmental conditions",
  },
  {
    id: "independent",
    role: "Independent journalist",
    publisher: "Maya Chen's Local Brief",
    funding: "Reader subscriptions and a journalism grant",
    headline: "What the Heron Yard vote settles—and what it does not",
    account: "The vote authorizes a lease, not a building permit. Baytree keeps the land; TrailSpark gains conditional development and commercial rights. Homes and a path come with tree removal, time-limited affordability, and job estimates.",
    centres: "Conditions, distinctions, and uncertainty",
    skips: "Submission totals, selection process, quotations, and lived experience",
    imageChoice: "The permit folder, site, and decision path",
    wants: "Clarify what is decided and what remains open",
  },
  {
    id: "social-creator",
    role: "Social-media creator",
    publisher: "@KaiExplainsLocal",
    funding: "Platform views and advertising; no sponsor disclosed",
    headline: "30 YEARS?! Baytree still owns the land—so what did council hand over?",
    account: "The city did not sell Heron Yard. It approved a 30-year lease. TrailSpark plans 240 homes, and 24 mature trees could be removed if later permits are approved. The next decision has not happened yet.",
    centres: "Lease length and a surprising clarification",
    skips: "Affordability details, the path, jobs, replacement trees, and public input",
    imageChoice: "A tight crop of the lease folder, model, and tree ribbons",
    wants: "Explain, attract attention, and generate comments",
  },
] as const;

export const fairSocietyDecisions = [
  "Who owns important resources?",
  "Who makes decisions—and how can leaders be removed or challenged?",
  "How is wealth shared, and what cannot be bought or sold?",
  "Who controls major information sources?",
  "How are minority voices and rights protected?",
  "What responsibilities exist toward land, water, living beings, and future generations?",
  "How will the society resist both government tyranny and domination by wealthy private interests?",
] as const;

export const fairSocietyPressureTests = [
  "A fast emergency decision is needed.",
  "A wealthy company offers to fund a popular project if it controls the information campaign.",
  "A majority supports a rule that seriously harms a smaller group.",
  "A decision helps people now but creates a long-term cost for the river and future residents.",
] as const;
