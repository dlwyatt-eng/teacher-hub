export type SpacesUse = "none" | "optional" | "required";

export type ProgramArc = {
  id: string;
  number: string;
  title: string;
  timing: string;
  question: string;
  promise: string;
  curriculum: string[];
  experienceIds: string[];
};

export type ProgramExperience = {
  id: string;
  arcId: string;
  title: string;
  kind: string;
  duration: string;
  question: string;
  hook: string;
  studentMission: string;
  steps: string[];
  product: string;
  learningModes: string[];
  connections: string[];
  materials: string[];
  teacherPrep: string[];
  lookFors: string[];
  spacesUse: SpacesUse;
  spacesPrompt: string;
};

export type ProgramResource = {
  label: string;
  source: string;
  url: string;
  purpose: string;
  gradeFit: "Core Grade 6" | "Supported stretch" | "Teacher planning";
};

export type StudentStep = {
  title: string;
  action: string;
  show: string;
};

export type WordHelp = {
  term: string;
  meaning: string;
  example: string;
};

export type ExperienceMedia = {
  type: "image" | "audio" | "video" | "article" | "website" | "activity" | "interactive" | "map" | "data";
  label: string;
  alt?: string;
  source: string;
  purpose: string;
  studentTask: string;
  fallback: string;
  url?: string;
  localSrc?: string;
  duration?: string;
};

export type ExperienceKit = {
  setupMinutes: number;
  provided: string[];
  gather: string[];
  shortRoute: string;
  cards: { title: string; body: string }[];
};

export type ReadinessQuestion = {
  prompt: string;
  choices: string[];
  answer: number;
  feedback: string;
};

export type ReadinessLaunch = {
  background: string[];
  example: {
    title: string;
    steps: string[];
    conclusion: string;
  };
  questions: ReadinessQuestion[];
  reteach: string;
};

export type ReadinessLevel = "full" | "quick" | "review";

export type MathUpTopic = {
  strand: "N" | "PR" | "SS" | "SP";
  title: string;
  starred?: boolean;
  arcId: string;
  timing: string;
  role: "Core sequence" | "Bridge lesson" | "Optional WNCP bridge" | "Review and apply";
  experienceIds: string[];
  pairedWith?: string;
};

export type LearningProgram = {
  subject: string;
  studioName: string;
  title: string;
  subtitle: string;
  cadence: string;
  northStar: string;
  principles: string[];
  arcs: ProgramArc[];
  experiences: ProgramExperience[];
  assessment: {
    practice: string;
    checkpoints: string;
    portfolio: string;
    proficiency: string[];
  };
  resources: ProgramResource[];
};
