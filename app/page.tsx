"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { curriculum, type CurriculumGroup, type CurriculumRecord } from "./curriculum";
import { scienceInquiryProject, scienceLessons, sciencePacing, scienceUnits, type ScienceLesson } from "./science-program";
import { assessmentHighlights, assessmentPrinciples, equityCalendar, expectationGroups, homeworkPolicy, philosophyCommitments, spacesAnnualEvidenceSummary, spacesEvidenceForMonth, spacesEvidenceRhythm, spacesPortfolioBudget, spacesPostRecipe, spacesReportingWindows, thingsToKnow, yearMonths } from "./classroom-program";
import InquiryExperiencePlayer from "./inquiry-experience";
import { SocialStudiesProgramTab, SocialStudiesStudentLaunch } from "./social-studies-program";
import { LearningProgramTab, StudentLearningProgram } from "./learning-program";
import { coreLearningPrograms } from "./core-programs";
import { integratedLearningPrograms } from "./integrated-programs";
import { socialLessons, socialUnits } from "./social-program";
import { alignmentByArc, resolveAlignment, subjectCoverageNotes } from "./curriculum-alignment";
import CrossCurricularProjects from "./cross-curricular-projects";
import { priorPracticeSummary } from "./cross-curricular-program";
import { printClosest } from "./print-support";
import TeachingOsMap from "./teaching-os-map";
import { WorldAtlasIntroduction, WorldPortal, WorldJourney } from "./unit-world-components";
import { worldFor, worldStyle } from "./unit-worlds";
import { StudentWorldEntry } from "./student-mission";
import { dailyLaunchContentId, type DailyLaunch } from "./daily-launch";
import { StudentHomePortal, StudentWorldAtlas, TeacherDailyLaunchManager } from "./student-home-portal";
import { TtocDayPlan, type TtocWeekImportOption } from "./ttoc-day-plan";
import {
  SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY,
  SEPTEMBER_ROTATION_WEEK_STORAGE_KEY,
  WEEKDAYS,
  WEEKLY_PLAN_CHANGE_EVENT,
  WEEKLY_PLAN_STORAGE_KEYS,
  WEEKLY_PLAN_STORAGE_KEY,
  WeeklyPlan,
  WeeklyPlanPresetSelector,
  mondayOfWeek,
  readWeeklyPlan,
  weeklyPlanFromSeed,
  type WeeklyPlanPresetOption,
  type WeekPlanSeed,
  type WeekPlanSeedLesson,
  type Weekday,
} from "./weekly-plan";
import { SiteSearch, type SiteSearchTarget } from "./site-search";
import FirstWeekMission, { FIRST_WEEK_MISSION_ID, FIRST_WEEK_ROTATION_LESSON } from "./first-week-mission";
import { studentStepsFor } from "./program-supports";
import AiActivityStudio from "./ai-activity-studio";
import AiTensionsLab from "./ai-tensions-lab";
import { schoolAIActivities } from "./schoolai-activities";
import MorningScreen, { type MorningTimelineItem } from "./morning-screen";
import { MyInquiryHub, NewsroomHub, StudentAgencyDock } from "./student-agency-hub";
import { vancouverDateKey as morningDateKey } from "./morning-screen-state";
import TeacherHomeOperations from "./teacher-home-operations";
import MonthlyCalendar from "./monthly-calendar";
import VisualReviewStudio from "./visual-review-studio";
import { currentLearningWindow } from "./current-learning-phase";
import { firstYearWeekLaunchForMonth, suggestedYearWeekLaunch, yearWeekLaunchForWeek, yearWeekLaunches } from "./year-week-registry";
import currentLearningSource from "../content/current-learning-window-v2.json";

const learningPrograms = { ...coreLearningPrograms, ...integratedLearningPrograms };
const teachingMonths = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June"];
const STUDENT_FAMILY_SITE_URL = "https://dlwyatt-eng.github.io/learn/";

function rotationWeekSession(day: Weekday) {
  return {
    ...FIRST_WEEK_ROTATION_LESSON,
    sourceId: `${FIRST_WEEK_MISSION_ID}-${day}`,
    title: "Make the Call: Technology & AI in Grade 6 · repeat with each rotation group",
    timing: "About 60 min per group",
    day,
    notes: "Repeat the same decision lab with each rotating group. Add exact bell times, group order, supervision, and transition details. Print one Learning, Technology & AI Agreement per student. Students work in table teams for the four projector challenges, then write their own agreement so the handoff keeps each learner's voice.",
  };
}

function septemberProgramSession(experienceId: string, subject: string, day: Weekday): WeekPlanSeedLesson {
  const experience = learningPrograms[subject]?.experiences.find((item) => item.id === experienceId);
  if (!experience) throw new Error(`Missing September launch experience: ${experienceId}`);
  const runSteps = studentStepsFor(experience).map((step) => `${step.title}: ${step.action}`);
  return {
    sourceId: experience.id,
    subject,
    title: experience.title,
    timing: experience.duration,
    day,
    runSteps,
    notes: [
      `Learning question: ${experience.question}`,
      `Finish with: ${experience.product}.`,
      experience.spacesPrompt,
    ].join("\n"),
  };
}

const septemberLaunchWeekSeed: WeekPlanSeed = {
  weekOf: "2026-09-07",
  title: "Grade 6 rotation week · September 8–11",
  weekNote: "Classes are not formed yet. Repeat Make the Call: Technology & AI in Grade 6 with each roughly one-hour rotation. Collect one named Learning, Technology & AI Agreement per student for the receiving teacher. Monday is not an instructional day. Add exact bells, group order, supervision, support, and school events.",
  lessons: [
    rotationWeekSession("tuesday"),
    rotationWeekSession("wednesday"),
    rotationWeekSession("thursday"),
    rotationWeekSession("friday"),
  ],
};

const firstFormedClassWeekSeed: WeekPlanSeed = {
  weekOf: "2026-09-14",
  title: "First Formed Class Week · September 14–18",
  weekNote: "Begin with low-risk story and shared noticing, establish an accurate Mathematics starting point, name current learning conditions without fixed labels, then gather evidence from place. Friday brings the week together in one September Learning Story rather than creating separate uploads.",
  lessons: [
    septemberProgramSession("ordinary-object-story", "English Language Arts", "monday"),
    septemberProgramSession("magnitude-gallery", "Mathematics", "tuesday"),
    septemberProgramSession("learning-user-manual", "Career Education", "wednesday"),
    septemberProgramSession("place-soundwalk", "English Language Arts", "thursday"),
    {
      sourceId: "september-learning-story-synthesis",
      subject: "English Language Arts · Career Education",
      title: "Friday synthesis · My Learning Story",
      timing: "55–65 min",
      day: "friday",
      runSteps: [
        "Revisit this week's story, number thinking, learning-condition notes, and place observations.",
        "Choose one specific example that shows a current strength or way you contributed; private details are never required.",
        "Create a short written, audio, video, or visual Learning Story that names what helps you learn and one meaningful goal.",
        "Add a realistic first step, help source, and check date; revise once for a family or teacher audience.",
      ],
      notes: "Use this as the single required September Learning Story in SpacesEDU. Include student voice, a specific strength example, useful learning conditions, one realistic goal, a first step, and a check date. Do not create a second Career post.",
    },
  ],
};

type WeeklyPlanLaunchOption = WeeklyPlanPresetOption & {
  storageKey: string;
  seed: WeekPlanSeed;
  defaultWeekday: Weekday;
  legacyStorageKey?: string;
};

const specialSeptemberWeekLaunches = [
  {
    id: "rotation-week",
    label: "Rotation Week",
    dateRange: "Sep 8–11, 2026",
    description: "Repeat the Technology & AI decision lab with each rotation group; Monday is not an instructional day.",
    storageKey: SEPTEMBER_ROTATION_WEEK_STORAGE_KEY,
    seed: septemberLaunchWeekSeed,
    defaultWeekday: "tuesday",
    legacyStorageKey: WEEKLY_PLAN_STORAGE_KEY,
  },
  {
    id: "first-formed-class-week",
    label: "First Formed Class Week",
    dateRange: "Sep 14–18, 2026",
    description: "Move from ordinary-object storytelling through number sense, learning conditions, and place noticing to Friday's Learning Story synthesis.",
    storageKey: SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY,
    seed: firstFormedClassWeekSeed,
    defaultWeekday: "monday",
    legacyStorageKey: WEEKLY_PLAN_STORAGE_KEY,
  },
] as const satisfies readonly WeeklyPlanLaunchOption[];

const weeklyPlanLaunchOptions: readonly WeeklyPlanLaunchOption[] = [
  ...specialSeptemberWeekLaunches,
  ...yearWeekLaunches.map((launch) => ({ ...launch, defaultWeekday: "monday" as const })),
];

const schoolYearTtocWeekImportOptions = weeklyPlanLaunchOptions.map(({ id, label, dateRange, storageKey, seed, defaultWeekday }) => ({
  id,
  label: `${label} · ${dateRange}`,
  storageKey,
  seed,
  defaultWeekday,
})) satisfies readonly TtocWeekImportOption[];

function suggestedWeeklyPlanLaunchId(date = morningDateKey()) {
  if (date <= "2026-09-13") return "rotation-week";
  if (date <= "2026-09-20") return "first-formed-class-week";
  return suggestedYearWeekLaunch(date)?.id ?? "first-formed-class-week";
}

function morningTimelineForToday(): MorningTimelineItem[] {
  const date = morningDateKey();
  const weekOf = mondayOfWeek(date);
  const [year, month, day] = date.split("-").map(Number);
  const weekdayIndex = new Date(Date.UTC(year, month - 1, day)).getUTCDay() - 1;
  const weekday = WEEKDAYS[weekdayIndex];
  if (!weekday) return [];

  const saved = WEEKLY_PLAN_STORAGE_KEYS
    .map((storageKey) => readWeeklyPlan(storageKey))
    .find((plan) => plan?.weekOf === weekOf);
  const planned = saved
    ?? (weekOf === septemberLaunchWeekSeed.weekOf ? weeklyPlanFromSeed(septemberLaunchWeekSeed) : null)
    ?? (weekOf === firstFormedClassWeekSeed.weekOf ? weeklyPlanFromSeed(firstFormedClassWeekSeed) : null)
    ?? (() => {
      const launch = yearWeekLaunchForWeek(weekOf);
      return launch ? weeklyPlanFromSeed(launch.seed) : null;
    })();
  if (!planned) return [];

  return planned.blocks
    .filter((block) => block.day === weekday)
    .slice(0, 8)
    .map((block) => ({
      time: block.startTime || block.timing || "Today",
      label: block.kind === "lesson" ? `${block.subject} · ${block.title}` : block.title,
    }));
}

function useMorningTimeline() {
  const [timeline, setTimeline] = useState<MorningTimelineItem[]>(morningTimelineForToday);
  useEffect(() => {
    const refresh = () => setTimeline(morningTimelineForToday());
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || WEEKLY_PLAN_STORAGE_KEYS.includes(event.key as (typeof WEEKLY_PLAN_STORAGE_KEYS)[number])) refresh();
    };
    window.addEventListener(WEEKLY_PLAN_CHANGE_EVENT, refresh);
    window.addEventListener("storage", handleStorage);
    const dateRefresh = window.setInterval(refresh, 60_000);
    return () => {
      window.removeEventListener(WEEKLY_PLAN_CHANGE_EVENT, refresh);
      window.removeEventListener("storage", handleStorage);
      window.clearInterval(dateRefresh);
    };
  }, []);
  return timeline;
}

function SchoolYearWeeklyPlan({ initialLaunchId }: { initialLaunchId?: string }) {
  const [selectedPreset, setSelectedPreset] = useState(() => weeklyPlanLaunchOptions.some((option) => option.id === initialLaunchId)
    ? initialLaunchId as string
    : suggestedWeeklyPlanLaunchId());
  const selectPreset = (presetId: string) => {
    if (weeklyPlanLaunchOptions.some((preset) => preset.id === presetId)) setSelectedPreset(presetId);
  };
  const selected = weeklyPlanLaunchOptions.find((option) => option.id === selectedPreset) ?? weeklyPlanLaunchOptions[0];

  return (
    <>
      <WeeklyPlanPresetSelector presets={weeklyPlanLaunchOptions} value={selected.id} onChange={selectPreset} />
      <WeeklyPlan
        heading={`${selected.label} · ${selected.dateRange}`}
        seed={selected.seed}
        storageKey={selected.storageKey}
        legacyStorageKey={selected.legacyStorageKey}
        key={selected.storageKey}
      />
    </>
  );
}

type ClassroomLocation = {
  mode?: "teacher" | "projector";
  active?: string;
  subject?: string;
  scienceLesson?: string;
};

const locationKey = "wyatt-classroom-location-v2";
const subscribeToHydration = () => () => {};
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

function readClassroomLocation(includeSessionFallback = true): ClassroomLocation {
  if (typeof window === "undefined") return {};
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const legacyParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const routeKeys = ["mode", "view", "subject", "lesson"];
    const hasSearchRoute = routeKeys.some((key) => searchParams.has(key));
    const hasLegacyRoute = routeKeys.some((key) => legacyParams.has(key));
    const params = hasSearchRoute ? searchParams : legacyParams;
    const hasExplicitRoute = hasSearchRoute || hasLegacyRoute;
    const parsed = includeSessionFallback && !hasExplicitRoute ? JSON.parse(window.sessionStorage.getItem(locationKey) ?? "{}") : {};
    const saved = parsed && typeof parsed === "object" ? parsed as ClassroomLocation : {};
    const mode = params.get("mode");
    const subject = params.get("subject");
    const scienceLesson = params.get("lesson");
    const active = params.get("view");
    return {
      ...saved,
      mode: mode === "student" ? "projector" : mode === "teacher" ? "teacher" : hasExplicitRoute ? "teacher" : saved.mode,
      active: active ?? (hasExplicitRoute ? undefined : saved.active),
      subject: subject ?? (hasExplicitRoute ? undefined : saved.subject),
      scienceLesson: scienceLesson ?? (hasExplicitRoute ? undefined : saved.scienceLesson),
    };
  } catch {
    return {};
  }
}

function writeClassroomLocation(location: ClassroomLocation, action: "push" | "replace") {
  const url = new URL(window.location.href);
  for (const key of ["mode", "view", "subject", "lesson"]) url.searchParams.delete(key);
  if (location.mode === "projector") url.searchParams.set("mode", "student");
  if (location.subject) url.searchParams.set("subject", location.subject);
  else if (location.scienceLesson) url.searchParams.set("lesson", location.scienceLesson);
  else if (location.active && location.active !== "Home") url.searchParams.set("view", location.active);
  const legacyHash = new URLSearchParams(url.hash.replace(/^#/, ""));
  if (["mode", "view", "subject", "lesson"].some((key) => legacyHash.has(key))) url.hash = "";
  const target = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (action === "push" && target === current) return;
  window.history[action === "push" ? "pushState" : "replaceState"](window.history.state, "", target);
}

function subjectFromLocation(location: ClassroomLocation) {
  return subjects.find((subject) => subject.name === location.subject || subject.short === location.subject) ?? null;
}

function scienceLessonFromLocation(location: ClassroomLocation) {
  return scienceLessons.find((lesson) => lesson.id === location.scienceLesson) ?? null;
}

function normalizeLegacyView(active?: string) {
  return active === "Model Lesson" || active === "Lesson Template" ? "Home" : active;
}

const projectorSafePages = new Set(["Home", "First Week Mission", "Morning Screen", "Newsroom", "My Inquiry"]);

function isProjectorSafePage(active: string) {
  return projectorSafePages.has(active);
}

function programArcsForMonth(month: string) {
  const monthIndex = teachingMonths.indexOf(month);
  return Object.values(learningPrograms).flatMap(program => program.arcs.filter(arc => {
    const namedMonths = teachingMonths.filter(name => arc.timing.toLowerCase().includes(name.toLowerCase()));
    if (!namedMonths.length) return false;
    const start = teachingMonths.indexOf(namedMonths[0]);
    const end = teachingMonths.indexOf(namedMonths[namedMonths.length - 1]);
    return monthIndex >= start && monthIndex <= end;
  }).map(arc => ({ subject: program.subject, title: arc.title, question: arc.question })));
}

type Subject = {
  name: string;
  short: string;
  icon: string;
  color: string;
  soft: string;
  units: number;
  status: string;
  updated?: string;
};

const subjects: Subject[] = [
  { name: "English Language Arts", short: "Language Arts", icon: "Aa", color: "#7459a6", soft: "#eee9f7", units: 6, status: "6 arcs · 13 signature experiences", updated: "Updated Aug. 13" },
  { name: "Mathematics", short: "Mathematics", icon: "÷", color: "#98421f", soft: "#fae9df", units: 6, status: "6 units · 15 signature experiences", updated: "Updated Aug. 13" },
  { name: "Science", short: "Science", icon: "⌬", color: "#347d72", soft: "#deeeea", units: 4, status: "4 units · classroom audit underway", updated: "Updated Aug. 13" },
  { name: "Social Studies", short: "Social Studies", icon: "◎", color: "#4f75a6", soft: "#e2eaf4", units: 4, status: "4-unit experience pathway", updated: "Updated Aug. 13" },
  { name: "Arts Education", short: "Arts Education", icon: "✦", color: "#8f3e5d", soft: "#f7e3e9", units: 4, status: "4 arcs · 6 creative studios", updated: "Updated Aug. 13" },
  { name: "Applied Design, Skills & Technologies", short: "ADST", icon: "⌘", color: "#4c677c", soft: "#e4eaee", units: 5, status: "5 arcs · 7 design missions", updated: "Updated Aug. 13" },
  { name: "Physical & Health Education", short: "Physical & Health", icon: "↗", color: "#2f6b3d", soft: "#e3f0e6", units: 4, status: "4 year-round arcs · 6 experiences", updated: "Updated Aug. 13" },
  { name: "Career Education", short: "Career Education", icon: "◇", color: "#765224", soft: "#f6ead7", units: 4, status: "4 arcs · 6 real-life studios", updated: "Updated Aug. 13" },
];

const featuredStudentLaunch = {
  kind: "generic",
  genericId: "ordinary-object-story",
  worldId: "ela-belonging",
  subject: "English Language Arts",
  unit: "Stories, Voice & Belonging",
  title: "The story inside an ordinary object",
  question: "How can an ordinary object carry a story?",
  firstAction: "Choose one object and notice five details you can truly see before you invent anything.",
  finish: "A 90-second oral story and a six-sentence written seed, made clearer after a listener's question.",
} satisfies DailyLaunch;

const studentWorldAtlasLaunches = [
  {
    kind: "generic", genericId: "magnitude-gallery", worldId: "math-number", subject: "Mathematics", unit: "Number Sense & Operations",
    title: "How big is this number?", question: "Where does this number belong—and how do you know?",
    firstAction: "Place one number near a benchmark before you calculate.", finish: "A number-line placement and one exact visual comparison.",
  },
  {
    kind: "generic", genericId: "source-mosaic", worldId: "ela-research", subject: "English Language Arts", unit: "Research, Synthesis & Teaching",
    title: "Can we cool the courtyard?", question: "How could a school make a hot paved outdoor area cooler and more welcoming?",
    firstAction: "Open Source 1. Read the temperature table and choose what it actually proves.", finish: "A recommendation backed by two source types and one honest limit.",
  },
  {
    kind: "generic", genericId: "geometry-field-lab", worldId: "math-geometry", subject: "Mathematics", unit: "Geometry & Measurement",
    title: "Angle Expedition", question: "Can your eyes tell an angle exactly—or do you need measurement evidence?",
    firstAction: "Find the vertex and two rays, then compare the opening with 45°, 90°, and 180°.", finish: "A verified angle scan and a triangle built from clear rules.",
  },
  {
    kind: "science", scienceId: "mixture-mystery", worldId: "mixtures", subject: "Science", unit: "Everyday Mixtures",
    title: "Open the mystery jar", question: "How can we identify what is mixed together without guessing?",
    firstAction: "Record six things you can see before you name any material.", finish: "A revised claim supported by one property test.",
  },
  {
    kind: "science", scienceId: "space-motion-lab", worldId: "earth-space", subject: "Science", unit: "Earth & Space",
    title: "Power the mission evidence log", question: "Why does the Sun seem to cross our sky even though Earth is moving?",
    firstAction: "Study the sky sequence. Record only what changed.", finish: "A claim, exact evidence, and one honest model limit.",
  },
  {
    kind: "social", socialId: "rights-in-tension", worldId: "power-rights-government", subject: "Social Studies", unit: "Power, Rights & Government",
    title: "Who gets the park after dark?", question: "How can a city make a fair decision when one shared place affects people in different ways?",
    firstAction: "Meet Juniper Park. Predict who could be affected before the city chooses a rule.", finish: "A class council recommendation with evidence and a real check-back.",
  },
] as const satisfies readonly DailyLaunch[];

const siteReadiness = [
  { label: "Language Arts & Mathematics", detail: "Both year-long cores now have six connected arcs, varied signature experiences, Teacher preparation, lean assessment routes, and linked Student projection views", color: "#eee4f4", state: "BROAD FIRST PASS · ADJUST IN USE" },
  { label: "Arts · ADST · PHE · Career", detail: "ADST now restores the recurring Bloxels ELA story-game project as a fifth arc; Arts, PHE, and Career retain their distinct four-arc pathways and honest subject-specific evidence", color: "#e4eee7", state: "BROAD FIRST PASS · ADJUST IN USE" },
  { label: "Claims lesson", detail: "The lesson now uses a simple whole-class Two Lies and a Truth game: students vote, defend the truth with source evidence, and then trace a rumour to its first source", color: "#dce7f4", state: "REBUILT · VERIFY IN CLASS" },
  { label: "Science", detail: "All 19 lessons were checked for sequence, preparation, evidence, and projection; only audited lessons keep a ready label while corrections continue", color: "#d9e9df", state: "AUDIT IN PROGRESS" },
  { label: "Social Studies", detail: "All four units now have first-pass experiences: games, movement, physical data, system webs, authentic source comparisons, prototype studios, and expert teaching", color: "#f4e6c9", state: "4-UNIT BASELINE · ADJUST IN USE" },
  { label: "Build direction", detail: "Build broad, enjoyable curriculum coverage now; refine individual lessons when the real class schedule, student needs, and current events make the next decision meaningful", color: "#e8def4", state: "BUILD · TEACH · ADJUST" },
];

const recentUpdates = [
  {
    id: "technology-agreement-morning-screen",
    title: "Technology decision lab, agreement & Morning Screen",
    date: "Aug. 16, 2026",
    detail: "Rebuilt the rotation as a specific projector-led decision lab: detect weak evidence, sort real situations, repair a prompt, challenge a confident AI answer, and create a signed student-teacher agreement. Added an editable Morning Screen for the shape of the day, reminders, sourced daily information, and a reviewed arrival challenge.",
    destination: "First Week Mission",
  },
  {
    id: "social-clarity-arts-remix",
    title: "Clearer Social Studies & the After-Rain Arts Remix",
    date: "Aug. 14, 2026",
    detail: "Simplified Perspective Part 4, added direct Social unit switching, Fleetwood SkyTrain now-versus-later evidence, a runnable Power simulation with printable roles, and a five-part projected Arts studio using a new courtyard scene.",
    destination: "Social Studies",
  },
  {
    id: "local-sources-infographics",
    title: "Local Indigenous sources & infographic system",
    date: "Aug. 13, 2026",
    detail: "Added a Surrey Schools-first source shelf, lesson-specific Nation and First Nations-led routes, local restoration and responsible-data graphics, and seven large visual explainers for text-heavy ELA, Math, Arts, ADST, PHE, and Career lessons.",
    destination: "Social Studies",
  },
  {
    id: "global-readiness-mathup",
    title: "Global pre-teaching, Packet Rescue & Math resource route",
    date: "Aug. 13, 2026",
    detail: "Every lesson pathway now starts with background, defined words, a worked example, and a readiness check. Packet Rescue adds a six-piece tabletop model before the human-network drama. Mathematics now uses Math Antics for the visual explanation, the Classroom OS for investigation, and MathUP for coverage checks, games, and extra practice.",
    destination: "Applied Design, Skills & Technologies",
  },
  {
    id: "lesson-handoff-supports",
    title: "Lesson handoff, clearer language & curriculum supports",
    date: "Aug. 12, 2026",
    detail: "Student-selected activities now open the same Teacher lesson automatically. Added plain Student directions, literal Teacher run sheets, defined word help, curriculum alignment views, unit entry/exit SpacesEDU choices, and eight supplied visual, audio, source, or activity-kit anchors.",
    destination: "Language Arts",
  },
  {
    id: "integrated-programs",
    title: "Arts, PHE & Career · first-pass pathways",
    date: "Aug. 12, 2026",
    detail: "Added four arcs and six signature experiences for Arts, PHE, and Career, with dedicated mini-studios, authentic links to Social Studies and Science, access and safety guidance, and no extra upload stream.",
    destination: "Arts Education",
  },
  {
    id: "ela-math-programs",
    title: "Language Arts & Mathematics · year-long programs",
    date: "Aug. 12, 2026",
    detail: "Added six connected arcs for each core subject, now 13 Language Arts and 14 Mathematics signature experiences, Teacher preparation, student projection missions, curated resource routes, and only selected SpacesEDU evidence.",
    destination: "Language Arts",
  },
  {
    id: "units-three-four-pathway",
    title: "Social Studies Units 3–4 · eight new experiences",
    date: "Aug. 12, 2026",
    detail: "Added migration story maps, a physical data skyline, supply-chain shockwave, cooperation control room, systems web, response lab, prototype studio, and audience-tested expert exchange. Only the final expert artifact and individual reflection are a required new SpacesEDU post.",
    destination: "Social Studies",
  },
  {
    id: "unit-two-experiences",
    title: "Social Studies Unit 2 · four classroom experiences",
    date: "Aug. 12, 2026",
    detail: "Built the unequal-power room challenge, water-emergency government relay, rights case mystery and movement line, Human Rights Day remedy gallery, jurisdiction dash, and 90-second civic hearing.",
    destination: "Social Studies",
  },
  {
    id: "whole-site-classroom-audit",
    title: "Whole-site classroom-use audit",
    date: "Aug. 12, 2026",
    detail: "Every existing Science and Social Studies lesson was checked for reading load, projection, teacher/student alignment, materials, and honest readiness. Repairs now guide the continuing build.",
    destination: "Science",
  },
  {
    id: "claims-reset",
    title: "Trace the Claim · Two Lies and a Truth",
    date: "Aug. 12, 2026",
    detail: "Simplified the lesson to a handout-free whole-class game. Students find the one truth, explain what makes it believable, and then trace a short rumour to its first source.",
    destination: "Social Studies",
  },
  {
    id: "perspective-visual",
    title: "Perspective Without Guessing · observation scene",
    date: "Aug. 12, 2026",
    detail: "Added one clearly labelled generated school-street scene for noticing access, movement, traffic, transit, deliveries, and green space before students make or test a claim about stakeholder needs.",
    destination: "Social Studies",
  },
  {
    id: "unit-one-alignment",
    title: "Social Studies · Unit 1 alignment",
    date: "Aug. 12, 2026",
    detail: "The student shell is quieter. Claims, perspective, and the five-part Fleetwood case file now follow the recorded teacher sequence more faithfully.",
    destination: "Social Studies",
  },
  {
    id: "bloxels-spaces-bank",
    title: "Bloxels, returning activity bank & SpacesEDU rhythm",
    date: "Aug. 13, 2026",
    detail: `Restored the January Bloxels story-game as a supplied ELA/ADST project. Organized all ${priorPracticeSummary.originalRecordCount} prior SpacesEDU records into ${priorPracticeSummary.familyCount} useful families and separated portfolio highlights, optional evidence, in-class work, and private support records.`,
    destination: "Cross-Curricular Projects",
  },
  {
    id: "year-plan",
    title: "2026–27 Year Plan",
    date: "Aug. 11, 2026",
    detail: "September–June pacing, SpacesEDU evidence, inquiry checkpoints, equity-project starts, and display windows.",
    destination: "Year Plan",
  },
];

export default function Home() {
  const hydrated = useSyncExternalStore(subscribeToHydration, getClientHydrationSnapshot, getServerHydrationSnapshot);
  if (!hydrated) return <div className="classroom-loading" aria-busy="true"><span>W</span><p>Opening the Classroom OS…</p></div>;
  return <ClassroomHome />;
}

function ClassroomHome() {
  const [initialLocation] = useState<ClassroomLocation>(readClassroomLocation);
  const initialSubject = subjectFromLocation(initialLocation);
  const initialScienceLesson = scienceLessonFromLocation(initialLocation);
  const initialActive = normalizeLegacyView(initialLocation.active) ?? initialSubject?.short ?? (initialScienceLesson ? "Science Lesson" : "Home");
  const teacherOnlyInitialDestination = !initialSubject && !initialScienceLesson && !isProjectorSafePage(initialActive);
  const initialMode = initialLocation.mode ?? "teacher";
  const [mode, setMode] = useState<"teacher" | "projector">(initialMode);
  const [active, setActive] = useState(initialMode === "projector" && teacherOnlyInitialDestination ? "Home" : initialActive);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(initialSubject);
  const [selectedScienceLesson, setSelectedScienceLesson] = useState<ScienceLesson | null>(initialScienceLesson);
  const [subjectNavigationRevision, setSubjectNavigationRevision] = useState(0);
  const [weeklyPlanLaunchId, setWeeklyPlanLaunchId] = useState(suggestedWeeklyPlanLaunchId);
  const morningTimeline = useMorningTimeline();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);
  const navigationFocusReadyRef = useRef(false);
  const locationCanonicalizedRef = useRef(false);
  const announcement = `${selectedScienceLesson?.title ?? selectedSubject?.short ?? active} opened in ${mode === "projector" ? "Projector" : "Plan"} view.`;
  const closeDrawerTo = (destination: "menu" | "main") => {
    setSidebarOpen(false);
    window.requestAnimationFrame(() => (destination === "menu" ? menuButtonRef.current : mainContentRef.current)?.focus({ preventScroll: true }));
  };

  useEffect(() => {
    if (!sidebarOpen) return;
    const narrowLayout = window.matchMedia("(max-width: 780px)");
    const focusFrame = window.requestAnimationFrame(() => {
      if (narrowLayout.matches) sidebarRef.current?.querySelector<HTMLElement>("button, a")?.focus();
    });
    const closeOnWideLayout = (event: MediaQueryListEvent) => { if (!event.matches) closeDrawerTo("main"); };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeDrawerTo("menu");
    };
    narrowLayout.addEventListener("change", closeOnWideLayout);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      narrowLayout.removeEventListener("change", closeOnWideLayout);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const location: ClassroomLocation = {
      mode,
      active,
      subject: selectedSubject?.name,
      scienceLesson: selectedScienceLesson?.id,
    };
    try { window.sessionStorage.setItem(locationKey, JSON.stringify(location)); } catch {}
    if (!locationCanonicalizedRef.current) {
      writeClassroomLocation(location, "replace");
      locationCanonicalizedRef.current = true;
    }
  }, [mode, active, selectedSubject, selectedScienceLesson]);

  useEffect(() => {
    const restoreHistoryLocation = () => {
      const location = readClassroomLocation(false);
      const restoredSubject = subjectFromLocation(location);
      const restoredLesson = scienceLessonFromLocation(location);
      const restoredMode = location.mode ?? "teacher";
      const restoredActive = normalizeLegacyView(location.active) ?? restoredSubject?.short ?? (restoredLesson ? "Science Lesson" : "Home");
      const teacherOnlyDestination = !restoredSubject && !restoredLesson && !isProjectorSafePage(restoredActive);
      const safeActive = restoredMode === "projector" && teacherOnlyDestination ? "Home" : restoredActive;
      if (safeActive !== restoredActive) writeClassroomLocation({ mode: restoredMode, active: safeActive }, "replace");
      setMode(restoredMode);
      setSelectedSubject(restoredSubject);
      setSelectedScienceLesson(restoredLesson);
      setActive(safeActive);
      setSidebarOpen(false);
    };
    window.addEventListener("popstate", restoreHistoryLocation);
    return () => window.removeEventListener("popstate", restoreHistoryLocation);
  }, []);

  useEffect(() => {
    if (!navigationFocusReadyRef.current) {
      navigationFocusReadyRef.current = true;
      if (active === "Home" && !selectedSubject && !selectedScienceLesson && mode === "teacher") return;
    }
    window.requestAnimationFrame(() => mainContentRef.current?.focus({ preventScroll: true }));
  }, [mode, active, selectedSubject, selectedScienceLesson]);

  const closeSidebar = () => {
    closeDrawerTo("menu");
  };

  const commitClassroomLocation = (
    nextMode: "teacher" | "projector",
    nextActive: string,
    nextSubject: Subject | null,
    nextScienceLesson: ScienceLesson | null,
  ) => {
    writeClassroomLocation({
      mode: nextMode,
      active: nextActive,
      subject: nextSubject?.name,
      scienceLesson: nextScienceLesson?.id,
    }, "push");
    setMode(nextMode);
    setActive(nextActive);
    setSelectedSubject(nextSubject);
    setSelectedScienceLesson(nextScienceLesson);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })));
  };

  const navigateToPage = (page: string) => commitClassroomLocation(mode, page, null, null);

  const openMonthWeekPlan = (month: string) => {
    const launch = month === "September"
      ? specialSeptemberWeekLaunches[0]
      : firstYearWeekLaunchForMonth(month);
    if (launch) setWeeklyPlanLaunchId(launch.id);
    navigateToPage("Weekly Plan");
  };

  const goHome = () => {
    commitClassroomLocation(mode, "Home", null, null);
    if (sidebarOpen) closeDrawerTo("main");
  };

  const chooseSubject = (subject: Subject) => {
    commitClassroomLocation(mode, subject.short, subject, null);
    if (sidebarOpen) closeDrawerTo("main");
  };

  const openScienceLesson = (lesson: ScienceLesson) => {
    commitClassroomLocation(mode, "Science Lesson", null, lesson);
    if (sidebarOpen) closeDrawerTo("main");
  };

  const openSearchTarget = (target: SiteSearchTarget) => {
    if (target.kind === "page") {
      navigateToPage(target.page);
      return;
    }
    if (target.kind === "science") {
      const lesson = scienceLessons.find((item) => item.id === target.id);
      if (lesson) openScienceLesson(lesson);
      return;
    }
    const subjectName = target.kind === "social" ? "Social Studies" : target.subject;
    const subject = subjects.find((item) => item.name === subjectName || item.short === subjectName);
    if (!subject) return;
    if (target.kind === "social") {
      try { window.sessionStorage.setItem(`wyatt-subject-location:${subject.name}`, JSON.stringify({ tab: "Lessons", socialLessonId: target.id, socialScene: 0 } satisfies SubjectHubLocation)); } catch {}
    } else if (target.kind === "generic") {
      try { window.sessionStorage.setItem(`wyatt-subject-location:${subject.name}`, JSON.stringify({ tab: "Lessons", programExperienceId: target.id } satisfies SubjectHubLocation)); } catch {}
    }
    // A same-subject search result must reopen SubjectHub so its saved target is
    // read again; otherwise React correctly keeps the already-mounted lesson.
    setSubjectNavigationRevision((revision) => revision + 1);
    chooseSubject(subject);
  };

  const returnToScienceUnit = () => {
    commitClassroomLocation(mode, "Science", subjects[2], null);
    if (sidebarOpen) closeDrawerTo("main");
  };

  const changeMode = (nextMode: "teacher" | "projector") => {
    const teacherOnlyPage = !selectedSubject && !selectedScienceLesson && !isProjectorSafePage(active);
    if (nextMode === "projector" && teacherOnlyPage) commitClassroomLocation(nextMode, "Home", null, null);
    else commitClassroomLocation(nextMode, active, selectedSubject, selectedScienceLesson);
    if (nextMode === "projector") setSidebarOpen(false);
  };

  const projectMorning = () => {
    commitClassroomLocation("projector", "Morning Screen", null, null);
    setSidebarOpen(false);
  };

  const contextCurriculum = selectedSubject
    ? curriculum[selectedSubject.name]
    : selectedScienceLesson || active === "Science Lesson"
      ? curriculum.Science
      : null;
  const contextCurriculumLabel = selectedSubject?.short ?? (contextCurriculum ? "Science" : "Grade 6");

  return (
    <div className={`app-shell ${mode === "projector" ? "projector-shell" : ""}`}>
      <a className="skip-link" href="#main-content" tabIndex={sidebarOpen ? -1 : undefined}>Skip to main content</a>
      <aside ref={sidebarRef} id="primary-sidebar" className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand" aria-label="Mr. Wyatt's Teacher Hub">
          <span className="brand-mark"><span>W</span></span>
          <span><strong>Mr. Wyatt&apos;s</strong><small>TEACHER HUB · PRIVATE</small></span>
        </div>

        <nav aria-label="Main navigation">
          <p className="nav-label">TEACH</p>
          <button className={`nav-item ${active === "Home" ? "active" : ""}`} onClick={goHome}>
            <span className="nav-icon">⌂</span> Home
          </button>
          <button className={`nav-item ${active === "Morning Screen" ? "active" : ""}`} onClick={() => { navigateToPage("Morning Screen"); if (sidebarOpen) closeDrawerTo("main"); }}>
            <span className="nav-icon">☀</span> Morning Screen
          </button>
          <p className="nav-label second">STUDENT AGENCY</p>
          <button className={`nav-item ${active === "Newsroom" ? "active" : ""}`} onClick={() => { navigateToPage("Newsroom"); if (sidebarOpen) closeDrawerTo("main"); }}>
            <span className="nav-icon">S</span> Source Lab &amp; Newsroom
          </button>
          <button className={`nav-item ${active === "My Inquiry" ? "active" : ""}`} onClick={() => { navigateToPage("My Inquiry"); if (sidebarOpen) closeDrawerTo("main"); }}>
            <span className="nav-icon">?</span> My Inquiry
          </button>
          <button className={`nav-item ${active === "AI Tensions Lab" ? "active" : ""}`} onClick={() => { navigateToPage("AI Tensions Lab"); if (sidebarOpen) closeDrawerTo("main"); }}>
            <span className="nav-icon">↔</span> AI Tensions Lab
          </button>
          <p className="nav-label second">SUBJECTS</p>
          {subjects.map((subject) => (
            <button key={subject.name} className={`nav-item ${active === subject.short ? "active" : ""}`} onClick={() => chooseSubject(subject)}>
              <span className="nav-icon mini" style={{ background: subject.soft, color: subject.color }}>{subject.icon}</span>
              {subject.short}
            </button>
          ))}

          <p className="nav-label second">PLAN &amp; ASSESS</p>
          {[
            { label: "First Week Mission", icon: "✦" },
            { label: "Weekly Plan", icon: "▤" },
            { label: "Monthly Calendar", icon: "▦" },
            { label: "TTOC Day Plan", icon: "☷" },
            { label: "Teaching OS Map", icon: "⧉" },
            { label: "Year Plan", icon: "▥" },
            { label: "Cross-Curricular Projects", icon: "✣" },
            { label: "SpacesEDU Evidence", icon: "▣" },
            { label: "AI Activity Studio", icon: "AI" },
            { label: "Visual Review Studio", icon: "◫" },
            { label: "Assessment Studio", icon: "✓" },
            { label: "Classroom Guide", icon: "⌑" },
          ].map((item) => (
            <button key={item.label} className={`nav-item ${active === item.label ? "active" : ""}`} onClick={() => { navigateToPage(item.label); if (sidebarOpen) closeDrawerTo("main"); }}>
              <span className="nav-icon">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a className="teacher-contact-link" href="mailto:wyatt_daryl@surreyschools.ca?subject=Grade%206%20family%20communication">
            <span>@</span><span><strong>School email</strong><small>Questions &amp; meeting requests</small></span>
          </a>
          <a className="official-curriculum-link" href="https://curriculum.gov.bc.ca/curriculum" target="_blank" rel="noreferrer">
            <span>BC</span><span><strong>Official BC Curriculum</strong><small>Grade 6 learning standards ↗</small></span>
          </a>
          <div className="phase-pill"><span></span> Whole site · quality audit</div>
          <div className="profile"><span>MW</span><span><strong>Mr. Wyatt</strong><small>Grade 6</small></span></div>
        </div>
      </aside>

      {sidebarOpen && <button className="scrim" aria-label="Close menu" onClick={closeSidebar} />}

      <main ref={mainContentRef} id="main-content" className="main-area" tabIndex={-1} inert={sidebarOpen ? true : undefined}>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
        <header className="topbar">
          {mode === "teacher" && <button ref={menuButtonRef} className="menu-button" onClick={() => setSidebarOpen(open => !open)} aria-label={sidebarOpen ? "Close menu" : "Open menu"} aria-expanded={sidebarOpen} aria-controls="primary-sidebar">☰</button>}
          <div className="breadcrumbs"><span>{mode === "teacher" ? "Plan / TTOC" : "Teach / Project"}</span><b>/</b><strong>{active}</strong></div>
          <div className="top-actions">
            <SiteSearch audience={mode === "teacher" ? "teacher" : "student"} onNavigate={openSearchTarget} />
            <a className="context-curriculum-link" href={contextCurriculum?.sourceUrl ?? "https://curriculum.gov.bc.ca/curriculum"} target="_blank" rel="noreferrer">
              <span>BC</span><strong>{contextCurriculumLabel} curriculum</strong><b>↗</b>
            </a>
            <div className="mode-switch" role="group" aria-label="Display mode">
              <button aria-pressed={mode === "teacher"} className={mode === "teacher" ? "selected" : ""} onClick={() => changeMode("teacher")}><span>◉</span> Plan / TTOC</button>
              <button aria-pressed={mode === "projector"} className={mode === "projector" ? "selected" : ""} onClick={() => changeMode("projector")}><span>▰</span> Teach / Project</button>
            </div>
          </div>
        </header>

        {selectedSubject ? (
          <SubjectHub key={`${selectedSubject.name}:${subjectNavigationRevision}`} subject={selectedSubject} mode={mode} onBack={goHome} onOpenLesson={openScienceLesson} />
        ) : active === "Home" ? (
          <Dashboard onSubject={chooseSubject} onNavigate={navigateToPage} onOpenScienceLesson={openScienceLesson} onProjectMorning={projectMorning} morningTimeline={morningTimeline} mode={mode} />
        ) : active === "Morning Screen" ? (
          <MorningScreen audience={mode === "projector" ? "student" : "teacher"} onOpenHome={goHome} timeline={morningTimeline} />
        ) : active === "Newsroom" ? (
          <NewsroomHub audience={mode === "projector" ? "student" : "teacher"} onHome={goHome} onInquiry={() => navigateToPage("My Inquiry")} onAiStudio={() => navigateToPage("AI Activity Studio")} />
        ) : active === "My Inquiry" ? (
          <MyInquiryHub audience={mode === "projector" ? "student" : "teacher"} onHome={goHome} onNewsroom={() => navigateToPage("Newsroom")} onAiStudio={() => navigateToPage("AI Activity Studio")} />
        ) : active === "AI Tensions Lab" ? (
          <AiTensionsLab audience={mode === "projector" ? "student" : "teacher"} onHome={goHome} />
        ) : active === "Science Lesson" && selectedScienceLesson ? (
          <InquiryExperiencePlayer key={selectedScienceLesson.id} lesson={selectedScienceLesson} mode={mode} onHome={goHome} onUnitStart={returnToScienceUnit} onOpenLesson={openScienceLesson} />
        ) : active === "Weekly Plan" ? (
          <div className="page"><SchoolYearWeeklyPlan initialLaunchId={weeklyPlanLaunchId} /></div>
        ) : active === "Monthly Calendar" ? (
          <div className="page"><MonthlyCalendar onOpenWeek={() => navigateToPage("Weekly Plan")} /></div>
        ) : active === "First Week Mission" ? (
          <div className="page"><FirstWeekMission audience={mode === "projector" ? "student" : "teacher"} /></div>
        ) : active === "TTOC Day Plan" ? (
          <div className="page"><TtocDayPlan heading="TTOC plan" showCurrentLesson={false} weekImportOptions={schoolYearTtocWeekImportOptions} /></div>
        ) : active === "Cross-Curricular Projects" || active === "Project Template" ? (
          <CrossCurricularProjects />
        ) : active === "Teaching OS Map" ? (
          <TeachingOsMap onHome={goHome} onYearPlan={() => navigateToPage("Year Plan")} onSpaces={() => navigateToPage("SpacesEDU Evidence")} onAiStudio={() => navigateToPage("AI Activity Studio")} onScience={() => chooseSubject(subjects[2])} />
        ) : active === "Year Plan" ? (
          <YearPlanPage mode={mode} onHome={goHome} onAssessment={() => navigateToPage("Assessment Studio")} onWeeklyPlan={openMonthWeekPlan} />
        ) : active === "SpacesEDU Evidence" ? (
          <SpacesEvidencePage mode={mode} onHome={goHome} onAssessment={() => navigateToPage("Assessment Studio")} onProjects={() => navigateToPage("Cross-Curricular Projects")} />
        ) : active === "AI Activity Studio" ? (
          <AiActivityStudio onHome={goHome} />
        ) : active === "Visual Review Studio" ? (
          <VisualReviewStudio onHome={goHome} />
        ) : active === "Assessment Studio" ? (
          <AssessmentStudioPage mode={mode} onHome={goHome} />
        ) : active === "Classroom Guide" ? (
          <ClassroomGuidePage mode={mode} onHome={goHome} />
        ) : (
          <PlaceholderPage title={active} onHome={goHome} />
        )}
      </main>
    </div>
  );
}

function Dashboard({ onSubject, onNavigate, onOpenScienceLesson, onProjectMorning, morningTimeline, mode }: { onSubject: (subject: Subject) => void; onNavigate: (page: string) => void; onOpenScienceLesson: (lesson: ScienceLesson) => void; onProjectMorning: () => void; morningTimeline: readonly MorningTimelineItem[]; mode: "teacher" | "projector" }) {
  const currentWindow = currentLearningWindow();
  const [checkedUpdates, setCheckedUpdates] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = window.localStorage.getItem("wyatt-checked-updates");
      return saved ? JSON.parse(saved) : [];
    } catch {
      // Review markers are a convenience; the site remains fully usable without browser storage.
      return [];
    }
  });

  const toggleChecked = (id: string) => {
    setCheckedUpdates((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      try { window.localStorage.setItem("wyatt-checked-updates", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const openUpdate = (destination: string) => {
    if (destination === "Social Studies") onSubject(subjects[3]);
    else if (destination === "Language Arts") onSubject(subjects[0]);
    else if (destination === "Arts Education") onSubject(subjects[4]);
    else onNavigate(destination);
  };

  if (mode === "projector") {
    return <StudentHome onSubject={onSubject} onOpenScienceLesson={onOpenScienceLesson} onNavigate={onNavigate} />;
  }

  return (
    <div className="page dashboard">
      <TeacherHomeOperations timeline={morningTimeline} onNavigate={onNavigate} onProjectMorning={onProjectMorning} publicSiteHref={STUDENT_FAMILY_SITE_URL} />
      <TeacherDailyLaunchManager />

      <section className="subjects-section">
        <div className="section-heading">
          <div><span className="section-kicker">SUBJECTS</span><h2>Choose a learning area.</h2></div>
        </div>
        <div className="subject-grid">
          {subjects.map((subject) => (
            <button className="subject-card" key={subject.name} onClick={() => onSubject(subject)} style={{ "--subject": subject.color, "--soft": subject.soft } as React.CSSProperties}>
              <span className="subject-icon">{subject.icon}</span>
              <span className="subject-copy"><strong>{subject.short}</strong><small>{subject.status}</small>{subject.updated && <em className="subject-updated">{subject.updated}</em>}</span>
              <span className="arrow">↗</span>
            </button>
          ))}
        </div>
      </section>

      <details className="os-development">
        <summary><span><small>CLASSROOM OS DEVELOPMENT</small><strong>Build audit and recent changes</strong></span><b>Open only when reviewing the system ↓</b></summary>
        <div className="os-development-content">
      <section className="day-grid">
        <article className="today-card readiness-card">
          <div className="section-heading">
            <div><span className="section-kicker">STOP / GO REVIEW</span><h2>Classroom-use audit</h2></div>
          </div>
          <div className="timeline">
            {siteReadiness.map((item, index) => (
              <div className="schedule-row readiness-row" key={item.label}>
                <time>{String(index + 1).padStart(2, "0")}</time>
                <span className="line"><i style={{ background: item.color }}></i>{index !== siteReadiness.length - 1 && <b></b>}</span>
                <div><strong>{item.label}</strong>{item.detail && <small>{item.detail}</small>}</div>
                <em>{item.state}</em>
              </div>
            ))}
          </div>
        </article>

        <article className="continue-card">
          <span className="section-kicker">CURRENT PRIORITY</span>
          <div className="science-art" aria-hidden="true">
            <span className="orbit one"></span><span className="orbit two"></span><span className="nucleus">⌬</span>
            <i className="dot d1"></i><i className="dot d2"></i><i className="dot d3"></i>
          </div>
          <div className="continue-content">
            <span className="subject-tag">QUALITY-GATED BUILD · IN PROGRESS</span>
            <h2>Build quality into every lesson</h2>
            <p>Repair existing scenes and continue the sequence with purposeful variety, complete student materials, reliable sources, and strong Teacher–Student alignment.</p>
            <button onClick={() => onNavigate("Teaching OS Map")}>Open Teaching OS map <span>→</span></button>
          </div>
        </article>
      </section>

      <section className="recent-updates" aria-labelledby="recent-updates-title">
        <div className="section-heading">
          <div><span className="section-kicker">YOUR REVIEW QUEUE</span><h2 id="recent-updates-title">Recently updated</h2></div>
          <small>{recentUpdates.filter((item) => !checkedUpdates.includes(item.id)).length} still to check</small>
        </div>
        <div className="recent-update-list">
          {recentUpdates.map((item) => {
            const checked = checkedUpdates.includes(item.id);
            return (
              <article className={checked ? "checked" : ""} key={item.id}>
                <button className="recent-update-open" onClick={() => openUpdate(item.destination)}>
                  <span className="recent-update-badge">{checked ? "CHECKED" : "RECENTLY UPDATED"}</span>
                  <span className="recent-update-copy"><strong>{item.title}</strong><small>{item.date}</small><p>{item.detail}</p></span>
                  <b aria-hidden="true">Open →</b>
                </button>
                <button className="recent-update-check" aria-pressed={checked} onClick={() => toggleChecked(item.id)}><span>{checked ? "✓" : ""}</span>{checked ? "Checked" : "Mark checked"}</button>
              </article>
            );
          })}
        </div>
        <p className="recent-updates-note">Check marks are saved on this device. Tell me when a section is fully approved and I can remove its update badge in the next site revision.</p>
      </section>
        </div>
      </details>

      <details className="teacher-home-resources">
        <summary><span><small>MORE TEACHER RESOURCES</small><strong>Sources, year tools &amp; public links</strong></span><b>Open ↓</b></summary>
        <div>
      <section className="local-source-home">
        <header><span>LOCAL INDIGENOUS LEARNING</span><div><h2>Start with district-curated and Nation-authored sources.</h2><p>Surrey Schools Indigenous Helping Teachers describe this collection as a preferred starting point. Keep every speaker, Nation, place, date, and sharing protocol attached to the learning.</p></div></header>
        <div className="local-source-home-links">
          <a href="https://surreyschoolsone.ca/indigenous/" target="_blank" rel="noreferrer"><b>SURREY SCHOOLS</b><strong>Indigenous Peoples Learning hub</strong><span>Preferred district starting point ↗</span></a>
          <a href="https://surreyschoolsone.ca/indigenous/resources/local-nations/" target="_blank" rel="noreferrer"><b>LOCAL NATIONS</b><strong>Katzie · Kwantlen · Semiahmoo</strong><span>District-curated Nation links ↗</span></a>
          <a href="https://surreyschoolsone.ca/indigenous/resource-post/?permalink=maps-that-show-local-language-groups-and-territories" target="_blank" rel="noreferrer"><b>MAPS</b><strong>Local territories and language groups</strong><span>Intermediate source set ↗</span></a>
          <a href="https://surreyschoolsone.ca/indigenous/resource-post/?permalink=hnqminm-language-and-katzie-history-with-paula-james-part-2" target="_blank" rel="noreferrer"><b>LANGUAGE &amp; HISTORY</b><strong>Learn with Katzie member Paula James</strong><span>District teacher resource ↗</span></a>
          <a href="https://www.fnesc.ca/learningfirstpeoples/" target="_blank" rel="noreferrer"><b>PROVINCIAL</b><strong>FNESC Learning First Peoples</strong><span>Authentic curriculum resources ↗</span></a>
          <a href="https://www.surreyschools.ca/indigenouslearning/authentic-resources-collection" target="_blank" rel="noreferrer"><b>BORROW</b><strong>Indigenous Authentic Resource Collection</strong><span>Books and kits through Surrey Schools ↗</span></a>
        </div>
        <footer><p><b>LINK / STREAM:</b> public official sources and student-created observations</p><p><b>REVIEW FIRST:</b> a new graphic using Nation knowledge, language, maps, stories, plants, or history</p><p><b>DO NOT REMIX:</b> ceremonies, cultural designs, community audio, stories, artwork, logos, or maps without permission</p></footer>
      </section>

      <section className="year-framework-strip">
        <div><p className="section-kicker">WHOLE-YEAR FRAMEWORK</p><h2>Plan the year. Notice the evidence. Keep families oriented.</h2><p>The schedule, SpacesEDU assessment highlights, and classroom commitments now live together.</p></div>
        <div>
          <button onClick={() => onNavigate("Morning Screen")}><span>☀</span><strong>Morning Screen</strong><small>Shape of day + reviewed arrival challenge</small></button>
          <button onClick={() => onNavigate("First Week Mission")}><span>✦</span><strong>First-week mission</strong><small>60-minute decision lab + signed agreement</small></button>
          <button onClick={() => onNavigate("Weekly Plan")}><span>▤</span><strong>Weekly plan</strong><small>Auto-filled launch week</small></button>
          <button onClick={() => onNavigate("TTOC Day Plan")}><span>☷</span><strong>TTOC day plan</strong><small>Build and print one day</small></button>
          <button onClick={() => onNavigate("Year Plan")}><span>▦</span><strong>Year plan</strong><small>September–June</small></button>
          <button onClick={() => onNavigate("AI Activity Studio")}><span>AI</span><strong>AI activity studio</strong><small>{schoolAIActivities.filter((activity) => activity.status === "prompt-ready").length} prompt-ready SchoolAI packs</small></button>
          <button onClick={() => onNavigate("AI Tensions Lab")}><span>↔</span><strong>AI tensions lab</strong><small>12 reusable human / AI / both dilemmas</small></button>
          <button onClick={() => onNavigate("Assessment Studio")}><span>✓</span><strong>Assessment</strong><small>8 cross-curricular highlights</small></button>
          <button onClick={() => onNavigate("Classroom Guide")}><span>⌑</span><strong>Classroom guide</strong><small>Students · families · teacher</small></button>
        </div>
      </section>
      <section className="public-window-bridge">
        <div><p className="section-kicker">PUBLIC CLASSROOM · {currentLearningSource.contentVersion}</p><h2>{currentWindow.shared.bigQuestion}</h2><p>Preview what students and families see for this learning phase.</p></div>
        <div><a href={STUDENT_FAMILY_SITE_URL} target="_blank" rel="noreferrer">Open public site <span>↗</span></a><a className="secondary" href="https://ca.spacesedu.com/" target="_blank" rel="noreferrer">Open SpacesEDU <span>↗</span></a></div>
      </section>
        </div>
      </details>
    </div>
  );
}

function StudentHome({ onSubject, onOpenScienceLesson, onNavigate }: { onSubject: (subject: Subject) => void; onOpenScienceLesson: (lesson: ScienceLesson) => void; onNavigate: (page: string) => void }) {
  const openMission = (launch: DailyLaunch) => {
    const contentId = dailyLaunchContentId(launch);
    if (launch.kind === "science") {
      const lesson = scienceLessons.find((item) => item.id === contentId);
      if (lesson) {
        try { window.sessionStorage.setItem(`wyatt-science-progress-v2:${lesson.id}`, JSON.stringify({ scene: 0 })); } catch {}
        onOpenScienceLesson(lesson);
      }
      return;
    }

    const subject = subjects.find((item) => item.name === launch.subject || item.short === launch.subject);
    if (!subject) return;
    const location: SubjectHubLocation = launch.kind === "social"
      ? { tab: "Lessons", socialLessonId: contentId, socialScene: 0 }
      : { tab: "Lessons", programExperienceId: contentId };
    try { window.sessionStorage.setItem(`wyatt-subject-location:${subject.name}`, JSON.stringify(location)); } catch {}
    onSubject(subject);
  };

  return (
    <div className="page student-home">
      <StudentHomePortal featured={featuredStudentLaunch} onOpenMission={openMission} />

      <StudentAgencyDock onNewsroom={() => onNavigate("Newsroom")} onInquiry={() => onNavigate("My Inquiry")} />

      <StudentWorldAtlas launches={studentWorldAtlasLaunches} onOpenMission={openMission} />

      <section className="student-subjects">
        <div className="student-section-heading"><div><p className="section-kicker">SUBJECTS</p><h2>Choose a learning area.</h2></div></div>
        <div className="student-subject-grid">
          {subjects.map((subject) => (
            <button key={subject.name} onClick={() => onSubject(subject)} style={{ "--subject": subject.color, "--soft": subject.soft } as React.CSSProperties}>
              <span className="student-subject-icon">{subject.icon}</span>
              <span className="student-subject-copy"><strong>{subject.short}</strong><small>{subject.name === "Science" ? "Classroom lessons" : subject.name === "Social Studies" ? "4-unit inquiry pathway" : subject.name === "English Language Arts" ? "Story, media & language studio" : subject.name === "Mathematics" ? "Games, investigations & design" : subject.name === "Arts Education" ? "Image, sound, movement & drama" : subject.name === "Applied Design, Skills & Technologies" ? "Systems, access, prototypes & code" : subject.name === "Physical & Health Education" ? "Movement, health & belonging" : "Strengths, teams & possibilities"}</small></span>
              <span className="student-subject-arrow">→</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

type SubjectHubLocation = {
  tab?: string;
  socialLessonId?: string;
  socialScene?: number;
  scienceUnitId?: string;
  scienceUnitFilter?: string;
  programExperienceId?: string;
};

function readSubjectHubLocation(subjectName: string): SubjectHubLocation {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(`wyatt-subject-location:${subjectName}`) ?? "{}");
    return parsed && typeof parsed === "object" ? parsed as SubjectHubLocation : {};
  } catch {
    return {};
  }
}

function SubjectHub({ subject, mode, onBack, onOpenLesson }: { subject: Subject; mode: "teacher" | "projector"; onBack: () => void; onOpenLesson: (lesson: ScienceLesson) => void }) {
  const program = learningPrograms[subject.name];
  const tabs = subject.name === "Science"
    ? ["Overview", "Big Ideas", "Competencies", "Content", "Units", "Lessons", "Alignment", "Final Inquiry", "Pacing", "Resources"]
    : subject.name === "Social Studies"
      ? ["Overview", "Big Ideas", "Competencies", "Content", "Units", "Lessons", "Alignment", "Assessments", "Pacing", "Resources"]
      : ["Overview", "Big Ideas", "Competencies", "Content", "Units", "Lessons", "Alignment", "Assessments", "Resources"];
  const [initialLocation] = useState(() => readSubjectHubLocation(subject.name));
  const initialSocialLesson = socialLessons.find((lesson) => lesson.id === initialLocation.socialLessonId) ?? socialLessons[0];
  const initialScienceUnit = scienceUnits.find((unit) => unit.id === initialLocation.scienceUnitId) ?? scienceUnits[0];
  const initialProgramExperience = program?.experiences.find((experience) => experience.id === initialLocation.programExperienceId) ?? program?.experiences[0];
  const [tab, setTab] = useState(() => tabs.includes(initialLocation.tab ?? "") ? initialLocation.tab! : "Overview");
  const [socialLessonId, setSocialLessonId] = useState(initialSocialLesson.id);
  const [socialScene, setSocialScene] = useState(() => initialSocialLesson.id === "rights-in-tension" ? 0 : Number.isInteger(initialLocation.socialScene) ? Math.min(Math.max(initialLocation.socialScene as number, 0), initialSocialLesson.scenes.length - 1) : 0);
  const [scienceUnitId, setScienceUnitId] = useState(initialScienceUnit.id);
  const [scienceUnitFilter, setScienceUnitFilter] = useState(() => initialLocation.scienceUnitFilter === "all" || scienceUnits.some((unit) => unit.id === initialLocation.scienceUnitFilter) ? initialLocation.scienceUnitFilter! : "all");
  const [programExperienceId, setProgramExperienceId] = useState(initialProgramExperience?.id ?? "");
  const previousModeRef = useRef(mode);
  const tabIdBase = `subject-${subject.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

  useEffect(() => {
    if (previousModeRef.current === "projector" && mode === "teacher") setTab("Lessons");
    previousModeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const location: SubjectHubLocation = { tab, socialLessonId, socialScene: socialLessonId === "rights-in-tension" ? 0 : socialScene, scienceUnitId, scienceUnitFilter, programExperienceId };
    try { window.sessionStorage.setItem(`wyatt-subject-location:${subject.name}`, JSON.stringify(location)); } catch {}
  }, [subject.name, tab, socialLessonId, socialScene, scienceUnitId, scienceUnitFilter, programExperienceId]);

  const resetLessonViewport = () => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })));
  };

  const chooseProgramExperience = (id: string) => {
    setProgramExperienceId(id);
    setTab("Lessons");
    resetLessonViewport();
  };
  const chooseSocialLesson = (id: string) => {
    if (id !== socialLessonId) setSocialScene(0);
    setSocialLessonId(id);
    setTab("Lessons");
    resetLessonViewport();
  };
  const chooseSocialScene = (scene: number) => {
    setSocialScene(scene);
    setTab("Lessons");
  };
  const chooseScienceUnit = (id: string) => {
    setScienceUnitFilter(id);
    if (id !== "all") setScienceUnitId(id);
    setTab("Lessons");
  };
  const record = curriculum[subject.name];
  const standardCount = record.bigIdeas.length + record.competencies.reduce((sum, group) => sum + group.items.length, 0) + record.content.reduce((sum, group) => sum + group.items.length, 0);
  const moveTabFocus = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    setTab(tabs[nextIndex]);
    window.requestAnimationFrame(() => document.getElementById(`${tabIdBase}-tab-${nextIndex}`)?.focus());
  };

  if (mode === "projector") {
    return <StudentCurriculumView subject={subject} onBack={onBack} onOpenLesson={onOpenLesson} socialLessonId={socialLessonId} onSocialLesson={chooseSocialLesson} socialScene={socialScene} onSocialScene={chooseSocialScene} scienceUnitId={scienceUnitId} onScienceUnit={chooseScienceUnit} program={program} programExperienceId={programExperienceId} onProgramExperience={chooseProgramExperience} />;
  }

  return (
    <div className="page subject-page" style={{ "--subject": subject.color, "--soft": subject.soft } as React.CSSProperties}>
      <button className="back-link" onClick={onBack}>← Classroom home</button>
      <section className="subject-hero">
        <span className="subject-hero-icon">{subject.icon}</span>
        <div><p className="eyebrow">GRADE 6 · OFFICIAL BC CURRICULUM</p><h1>{subject.name}</h1><p>{record.summary}</p></div>
        <div className="subject-hero-badges"><span className="framework-badge curriculum-ready">{subject.name === "Science" ? "AUDIT · Units mapped; readiness varies" : subject.name === "Social Studies" ? "FIRST-PASS · 4-unit experience pathway" : program ? "FIRST-PASS · Build, teach, adjust" : "✓ Curriculum imported"}</span>{subject.updated && <span className="recent-section-badge">● {subject.updated}</span>}</div>
      </section>
      <div className="tab-bar" role="tablist">
        {tabs.map((item, index) => <button id={`${tabIdBase}-tab-${index}`} role="tab" aria-controls={`${tabIdBase}-panel`} aria-selected={tab === item} tabIndex={tab === item ? 0 : -1} className={tab === item ? "selected" : ""} key={item} onClick={() => setTab(item)} onKeyDown={(event) => moveTabFocus(event, index)}>{item}</button>)}
      </div>
      <section id={`${tabIdBase}-panel`} role="tabpanel" aria-labelledby={`${tabIdBase}-tab-${tabs.indexOf(tab)}`} className={`subject-body ${["Units", "Journey", "Lessons", "Alignment", "Assessments", "Final Inquiry", "Pacing", "Resources"].includes(tab) ? "subject-body-workspace" : ""}`}>
        <div className="curriculum-main">
          {tab === "Overview" && <CurriculumOverview record={record} standardCount={standardCount} onTab={setTab} />}
          {tab === "Big Ideas" && <StandardsList eyebrow="OFFICIAL WORDING · PUBLISHED ORDER" title="Big Ideas" items={record.bigIdeas} />}
          {tab === "Competencies" && <GroupedStandards eyebrow="OFFICIAL WORDING · PUBLISHED ORDER" title="Curricular Competencies" groups={record.competencies} />}
          {tab === "Content" && <GroupedStandards eyebrow="OFFICIAL WORDING · PUBLISHED ORDER" title="Content Standards" groups={record.content} />}
          {["Units", "Journey", "Lessons", "Alignment", "Assessments", "Final Inquiry", "Pacing", "Resources"].includes(tab) && (tab === "Alignment" && (subject.name === "Science" || subject.name === "Social Studies") ? <SubjectAlignmentPage subject={subject.name} record={record} /> : subject.name === "Science" ? <ScienceProgramTab tab={tab} onOpenLesson={onOpenLesson} unitFilter={scienceUnitFilter} onUnitFilter={chooseScienceUnit} /> : subject.name === "Social Studies" ? <SocialStudiesProgramTab tab={tab} mode={mode} lessonId={socialLessonId} onLesson={chooseSocialLesson} scene={socialScene} onScene={chooseSocialScene} /> : program ? <LearningProgramTab program={program} record={record} tab={tab} selectedExperienceId={programExperienceId} onExperience={chooseProgramExperience} /> : <PhasePlaceholder tab={tab} subject={subject.short} />)}
        </div>
        <aside className="subject-sidebar-card">
          <p className="section-kicker">CURRICULUM MAP</p>
          <div><span>01</span><strong>Big Ideas</strong><b>{record.bigIdeas.length}</b></div>
          <div><span>02</span><strong>Competencies</strong><b>{record.competencies.reduce((sum, group) => sum + group.items.length, 0)}</b></div>
          <div><span>03</span><strong>Content</strong><b>{record.content.reduce((sum, group) => sum + group.items.length, 0)}</b></div>
          <a className="official-source" href={record.sourceUrl} target="_blank" rel="noreferrer"><span>↗</span><strong>Official BC source</strong><b>OPEN</b></a>
        </aside>
      </section>
    </div>
  );
}

function CurriculumOverview({ record, standardCount, onTab }: { record: CurriculumRecord; standardCount: number; onTab: (tab: string) => void }) {
  const counts = [
    [record.bigIdeas.length, "Big Ideas", "Big Ideas"],
    [record.competencies.reduce((sum, group) => sum + group.items.length, 0), "Competencies", "Competencies"],
    [record.content.reduce((sum, group) => sum + group.items.length, 0), "Content standards", "Content"],
  ];
  return (
    <div className="curriculum-overview">
      <div className="curriculum-intro"><p className="section-kicker">TEACHER REFERENCE</p><h2>{record.officialTitle}</h2><p>{record.summary}</p></div>
      <div className="alignment-note"><span>✓</span><div><strong>Official standards stored; teaching map audited</strong><p>{standardCount} standards are preserved in the official sequence. Open Alignment to see exact theme links and the coverage gaps that still need work.</p></div></div>
      <div className="curriculum-counts">{counts.map(([count, label, target]) => <button key={String(label)} onClick={() => onTab(String(target))}><strong>{count}</strong><span>{label}</span><b>Explore →</b></button>)}</div>
      <section className="student-translation-card"><p className="section-kicker">STUDENT-FRIENDLY LENS</p><h3>{record.student.learning}</h3><div>{record.student.canDo.map(item => <p key={item}><span>✓</span>{item}</p>)}</div><small>This concise language appears in Teach View. Official wording remains in Plan / TTOC.</small></section>
    </div>
  );
}

function StandardsList({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
  return (
    <div className="standards-page"><div className="standards-heading"><div><p className="section-kicker">{eyebrow}</p><h2>{title}</h2></div><span>{items.length} standards</span></div><div className="standards-list">{items.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><b>BC</b></article>)}</div></div>
  );
}

function GroupedStandards({ eyebrow, title, groups }: { eyebrow: string; title: string; groups: CurriculumGroup[] }) {
  return (
    <div className="standards-page"><div className="standards-heading"><div><p className="section-kicker">{eyebrow}</p><h2>{title}</h2></div><span>{groups.reduce((sum, group) => sum + group.items.length, 0)} standards</span></div>{groups.map((group, groupIndex) => { const offset = groups.slice(0, groupIndex).reduce((sum, previous) => sum + previous.items.length, 0); return <section className="standard-group" key={group.title}><h3>{group.title}</h3><div className="standards-list">{group.items.map((item, itemIndex) => <article key={item}><span>{String(offset + itemIndex + 1).padStart(2, "0")}</span><p>{item}</p><b>BC</b></article>)}</div></section>; })}</div>
  );
}

function SubjectAlignmentPage({ subject, record }: { subject: "Science" | "Social Studies"; record: CurriculumRecord }) {
  const coverage = subjectCoverageNotes[subject];
  const socialAlignmentIds: Record<string, string> = {
    "place-evidence-perspective": "social-place-evidence",
    "power-rights-government": "social-power-rights",
    "global-systems": "social-global-systems",
    "solutionary-inquiry": "social-solutionary-inquiry",
  };
  const units = subject === "Science"
    ? scienceUnits.map(unit => ({ id: `science-${unit.id}`, number: unit.number, title: unit.title, question: unit.question }))
    : socialUnits.map(unit => ({ id: socialAlignmentIds[unit.id], number: unit.number, title: unit.title, question: unit.question }));

  return (
    <div className="learning-program program-alignment">
      <section className="program-heading"><div><p className="section-kicker">TRACEABLE CURRICULUM MAP</p><h2>How the units build the official Grade 6 standards.</h2><p>Each row names the Big Ideas, competencies, and content that the unit can honestly introduce, practise, or demonstrate. The next-work list keeps gaps visible.</p></div><a href={record.sourceUrl} target="_blank" rel="noreferrer">Official curriculum ↗</a></section>
      <section className="coverage-honesty"><header><span>{coverage.scope}</span><h3>{coverage.strength}</h3></header><div><p className="section-kicker">NEXT COVERAGE WORK</p>{coverage.next.map(item => <p key={item}><span>→</span>{item}</p>)}</div></section>
      <div className="alignment-arc-list">{units.map(unit => {
        const alignment = alignmentByArc[unit.id];
        const resolved = alignment ? resolveAlignment(record, alignment) : null;
        return <article key={unit.id}><header><span>{unit.number}</span><div><small>{alignment?.stage ?? "MAP NEEDED"}</small><h3>{unit.title}</h3><p>{alignment?.note ?? unit.question}</p></div></header>{resolved && <div><section><b>BIG IDEAS</b>{resolved.bigIdeas.map(text => <p key={text}>{text}</p>)}</section><section><b>CURRICULAR COMPETENCIES</b>{resolved.competencies.map(text => <p key={text}>{text}</p>)}</section><section><b>CONTENT</b>{resolved.content.map(text => <p key={text}>{text}</p>)}</section></div>}</article>;
      })}</div>
    </div>
  );
}

function PhasePlaceholder({ tab, subject }: { tab: string; subject: string }) {
  const copy: Record<string, string> = {
    Units: "The official curriculum is available, but a complete classroom sequence has not been built for this subject yet.",
    Lessons: "There are no classroom-ready lessons here yet. Nothing on this page is being presented as ready to teach.",
    Assessments: "Assessment tasks will be added only after the teaching sequence has been classroom-tested.",
    Resources: "Resources will be added with the activities they support, not as an untested list of links.",
  };
  return <div className="empty-state phase-placeholder"><span className="empty-symbol">{tab === "Units" ? "▦" : tab === "Lessons" ? "▤" : tab === "Assessments" ? "✓" : "⌑"}</span><p className="section-kicker">CURRICULUM REFERENCE ONLY</p><h2>{subject} {tab}</h2><p>{copy[tab]}</p><span className="sequence-pill">Teaching program not yet developed</span></div>;
}

function ScienceProgramTab({ tab, onOpenLesson, unitFilter, onUnitFilter }: { tab: string; onOpenLesson: (lesson: ScienceLesson) => void; unitFilter: string; onUnitFilter: (id: string) => void }) {
  const visibleLessons = unitFilter === "all" ? scienceLessons : scienceLessons.filter(item => item.unitId === unitFilter);
  const classroomReadyCount = scienceLessons.filter(item => item.auditStatus === "classroom-ready").length;
  const experienceCounts = ["Launch", "Case file", "Field lab", "Readiness check", "Digital investigation", "Design studio", "Inquiry studio"].map(type => ({ type, count: scienceLessons.filter(item => item.journeyType === type).length })).filter(item => item.count > 0);
  const experiencePlural: Record<string, string> = { "Launch": "Launches", "Case file": "Case files", "Field lab": "Field labs", "Readiness check": "Readiness checks", "Digital investigation": "Digital investigations", "Design studio": "Design studios", "Inquiry studio": "Inquiry studios" };

  if (tab === "Units" || tab === "Journey") return (
    <div className="science-program">
      <div className="science-program-heading"><div><p className="section-kicker">HALF-YEAR SCIENCE PLAN</p><h2>Four connected units. Many ways to learn.</h2><p>The full course is mapped. A lesson is marked teacher-ready draft only after a full depth, preparation, resource, projection, and Student/Teacher alignment audit. Classroom use will provide the final proof.</p></div><span>18–19 WEEKS</span></div>
      <section className="inquiry-north-star">
        <div><span>FINAL DESTINATION</span><h3>{scienceInquiryProject.title}</h3><p>{scienceInquiryProject.promise}</p></div>
        <ol>{scienceInquiryProject.stages.map((stage,index)=><li key={stage.name}><span>{index+1}</span><div><strong>{stage.name}</strong><small>{stage.detail}</small></div></li>)}</ol>
      </section>
      <WorldAtlasIntroduction />
      <div className="science-unit-map">
        {scienceUnits.map((unit, unitIndex) => { const theme = worldFor(unit.id); return <article key={unit.id} className="world-themed-card" data-world={theme.id} style={worldStyle(theme)}>
          <header><span>{unit.number}</span><i>{unit.icon}</i></header>
          <WorldPortal theme={theme} compact />
          <p>{unit.subtitle}</p><h3>{unit.title}</h3><blockquote>{unit.question}</blockquote>
          <div className="unit-content-tags">{unit.content.map(item => <span key={item}>{item}</span>)}</div>
          <div className="unit-inquiry-seed"><b>INQUIRY SEED {unitIndex+1}</b><span>What did you notice? What do you still wonder? What could you test, model, design, or explain?</span></div>
          <details className="arc-spaces-bookends"><summary>SpacesEDU possibilities ▾</summary><section><strong>Optional entry snapshot</strong><p>Before the unit, answer the unit question with what you think now and one wonder.</p><div><span>20-second audio</span><span>Quick model photo</span><span>Diagram + wonder</span></div></section><section><strong>Possible end evidence</strong><p>Choose one investigation, model, or explanation that shows how your thinking changed. Do not post every activity.</p><div><span>Photo + explanation</span><span>Short demonstration video</span><span>Audio reflection</span></div></section></details>
          <footer><b>{unit.lessons.length} lessons</b><button onClick={() => onOpenLesson(scienceLessons.find(item => item.id === unit.lessons[0].id) ?? unit.lessons[0])}>Start unit →</button></footer>
        </article>})}
      </div>
      <section className="science-scope"><p className="section-kicker">WHAT STUDENTS BUILD ACROSS THE COURSE</p><div>{["Questions worth pursuing", "Fair and safe plans", "Useful evidence", "Models with limits", "Clear explanations"].map((item,index)=><span key={item}><i>{index+1}</i><b>{item}</b></span>)}</div></section>
    </div>
  );

  if (tab === "Lessons") return (
    <div className="science-program" id="science-lessons">
      <div className="science-program-heading"><div><p className="section-kicker">CLASSROOM LESSONS · AUDITED AUG. 12</p><h2>{classroomReadyCount} teacher-ready drafts. {scienceLessons.length - classroomReadyCount} have named corrections.</h2><p>Every lesson was checked. A ready draft sustains real learning, includes a practical run sheet, uses worthwhile sources or materials, and has matching Teacher and Student scenes. Lessons that miss any gate stay open for teacher review but are labelled honestly.</p></div><span>{visibleLessons.length} LESSONS</span></div>
      <div className="experience-legend">{experienceCounts.map(item=><div key={item.type}><span className={`experience-dot ${item.type.toLowerCase().replaceAll(" ","-")}`}></span><strong>{item.count} {item.count === 1 ? item.type : experiencePlural[item.type]}</strong></div>)}</div>
      <div className="science-filter" role="group" aria-label="Filter Science lessons"><button className={unitFilter === "all" ? "selected" : ""} onClick={() => onUnitFilter("all")}>All {scienceLessons.length}</button>{scienceUnits.map(unit => <button key={unit.id} className={unitFilter === unit.id ? "selected" : ""} onClick={() => onUnitFilter(unit.id)}>{unit.title}</button>)}</div>
      <div className="science-lesson-list">{visibleLessons.map((item,index)=>{const isReady=item.auditStatus === "classroom-ready";return <button key={item.id} className={isReady?"is-ready":"needs-audit"} onClick={() => onOpenLesson(item)} style={{ "--unit": item.unitColor, "--unit-soft": item.unitSoft } as React.CSSProperties}><span className="lesson-order">{String(index+1).padStart(2,"0")}</span><span className="lesson-kind">{item.journeyType}</span><span className="lesson-list-copy"><strong>{item.title}</strong><i className="lesson-audit-status">{isReady?"✓ Teacher-ready draft":"Audit complete · corrections required"}</i>{item.evidenceLevel && <i className={`lesson-evidence-level level-${item.evidenceLevel.toLowerCase().replaceAll(" ","-")}`}>{item.evidenceLevel}</i>}<small>{item.question}</small><em>Helps with the final inquiry: {item.projectContribution}</em></span><span className="lesson-duration">{item.duration}</span><b>OPEN →</b></button>})}</div>
    </div>
  );

  if (tab === "Assessments" || tab === "Final Inquiry") return (
    <div className="science-program final-inquiry-page">
      <div className="science-program-heading"><div><p className="section-kicker">CULMINATING INQUIRY PRESENTATION</p><h2>{scienceInquiryProject.title}</h2><p>{scienceInquiryProject.promise}</p></div><span>EXPERT-TEAM PROJECT</span></div>
      <div className="inquiry-stage-grid">{scienceInquiryProject.stages.map((stage,index)=><article key={stage.name}><span>{String(index+1).padStart(2,"0")}</span><h3>{stage.name}</h3><p>{stage.detail}</p></article>)}</div>
      <section className="inquiry-choice-panel"><div><p className="section-kicker">TEAM TEACHING CHOICES</p><h3>Different forms. Same scientific expectations.</h3><p>Every option must answer a focused question, communicate accurate science, use evidence, and help classmates learn.</p></div><div>{scienceInquiryProject.productChoices.map(choice=><span key={choice}>{choice}</span>)}</div></section>
      <section className="spaces-journey-plan"><div><p className="section-kicker">SCIENCE TOPIC BANK · ONE LIVING LOCAL RECORD</p><h3>Collect possibilities without creating four automatic posts.</h3><p>Students keep useful evidence, questions, models, and limits in one notebook or teacher-selected living record. They are not expected to explain or commit to a final topic before they have learned enough.</p></div><ol><li><b>1</b><span><strong>Body Systems</strong>Required March investigation story + possible topic</span></li><li><b>2</b><span><strong>Mixtures</strong>Class evidence + wonder; no default upload</span></li><li><b>3</b><span><strong>Forces</strong>Required May design evidence + possible topic</span></li><li><b>4</b><span><strong>Space</strong>Class evidence feeds the final showcase</span></li></ol><footer><strong>Then form expert teams.</strong><span>Each team investigates a different topic and teaches classmates. June uses one shared teaching artifact plus each student&apos;s individual explanation—Minecraft is optional.</span></footer></section>
      <div className="science-assessment-grid">{scienceUnits.map((unit,index) => <article key={unit.id} style={{ "--unit": unit.color, "--unit-soft": unit.soft } as React.CSSProperties}><span>{unit.icon}</span><p>TOPIC POSSIBILITY {index+1}</p><h3>{unit.title}</h3><strong>Save a notice, a wonder, a possible question, and one way evidence could be gathered.</strong><div><b>KNOW</b><small>{unit.content.join(" · ")}</small><b>TRY</b><small>{unit.assessment}</small><b>SAVE</b><small>One possible topic for the expert-team planning conference</small></div></article>)}</div>
    </div>
  );

  if (tab === "Pacing") return (
    <div className="science-program pacing-page">
      <div className="science-program-heading"><div><p className="section-kicker">FEB. 25–JUNE 24 · DATED HALF-YEAR PLAN</p><h2>Plan 45–51 Science blocks across the second half.</h2><p>The real sequence averages roughly 3–4 Science blocks per instructional week. Integrated ADST, Math, and ELA evidence is counted inside these projects—not added again.</p></div><span>≈ 3–4 BLOCKS / WEEK</span></div>
      <div className="pacing-list">{sciencePacing.map((period,index)=><article key={period.weeks}><span>{period.weeks}</span><div><small>WEEKS</small><h3>{period.focus}</h3><p>{period.purpose}</p></div><b>{period.blocks}<small>BLOCKS</small></b><em>{period.inquiryMove}</em>{index<sciencePacing.length-1&&<i>↓</i>}</article>)}</div>
      <section className="pacing-flex-note"><strong>Flexibility rule</strong><p>Use the published lower-prep and shortened routes when the calendar loses time. Protect concept teaching, the March investigation, the May design cycle, and the June individual explanation before adding optional production polish.</p></section>
    </div>
  );

  return (
    <div className="science-program"><div className="science-program-heading"><div><p className="section-kicker">REUSABLE CLASSROOM TOOLS</p><h2>Science resources</h2><p>Resources stay attached to the learning they support, with clear teacher preparation and student use.</p></div><span>{scienceUnits.reduce((sum,unit)=>sum+unit.resources.length,0)} RESOURCES</span></div><div className="science-resource-list">{scienceUnits.map(unit => <section key={unit.id} style={{ "--unit": unit.color, "--unit-soft": unit.soft } as React.CSSProperties}><header><span>{unit.icon}</span><div><p>UNIT {unit.number}</p><h3>{unit.title}</h3></div></header>{unit.resources.map((resource,index)=><article key={resource}><span>▤</span><strong>{resource}</strong><small>{index === unit.resources.length-1 ? "Assessment-ready" : "Reusable lesson tool"}</small></article>)}</section>)}</div></div>
  );
}

function StudentScienceProgram({ onOpenLesson, unitId, onUnit }: { onOpenLesson: (lesson: ScienceLesson) => void; unitId: string; onUnit: (id: string) => void }) {
  const unitIndex = Math.max(0, scienceUnits.findIndex((item) => item.id === unitId));
  const unit = scienceUnits[unitIndex];
  const unitLessons = scienceLessons.filter(item => item.unitId === unit.id);
  const theme = worldFor(unit.id);
  const studentBigIdeas: Record<string, string> = {
    "body-systems": "Your body has connected systems that help you respond, stay balanced, grow, and reproduce.",
    mixtures: "Materials can be mixed and separated by using their different properties.",
    "forces-motion": "Forces can change how objects move, and evidence helps us explain those changes.",
    "earth-space": "Models and evidence help us understand Earth, space, motion, and enormous distances.",
  };
  const scrollToUnitMap = () => document.getElementById("science-unit-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <section className="student-science-program world-surface" data-world={theme.id} style={worldStyle(theme)}>
      <StudentWorldEntry theme={theme} subject="Science" unit={`Unit ${unit.number}`} title={theme.name} question={unit.question} firstMove="Choose the lesson your teacher names. Read its question before you open it." finish="A model, test result, design, or explanation that shows what you discovered." duration={`${unitLessons.length} missions`} materials={["Science notebook", "Pencil", "Lesson materials"]} onMap={scrollToUnitMap} startHref="#science-lessons" startLabel="Choose today’s mission" helpHref={null} />
      <div className="student-unit-focus">
        <div className="student-unit-question"><p>THE BIG IDEA</p><h3>{studentBigIdeas[unit.id] ?? "We will use questions, evidence, models, and discussion to build understanding."}</h3><blockquote>Keep asking: “What did we observe? What does our model explain? What is still uncertain?”</blockquote></div>
        <div className="student-unit-lessons" id="science-lessons">{unitLessons.map((item,index)=>{const ready=item.auditStatus === "classroom-ready";return <button key={item.id} className={ready?"student-lesson-ready":"student-lesson-planned"} onClick={()=>onOpenLesson(item)}><span>{index+1}</span><div><small>MISSION {index + 1} · {item.journeyType}</small><strong>{item.title}</strong><em>{item.question}</em></div><b>OPEN →</b></button>})}</div>
      </div>
      <details className="student-program-picker student-science-map" id="science-unit-map"><summary><span><small>WHOLE SCIENCE MAP</small><strong>Change unit or look ahead</strong></span><b>Open map ▾</b></summary><div className="student-unit-choices" role="tablist">{scienceUnits.map((item,index)=><button key={item.id} role="tab" aria-selected={unitIndex===index} className={unitIndex===index?"selected":""} onClick={()=>onUnit(item.id)}><span style={{background:item.soft,color:item.color}}>{item.icon}</span><strong>{item.title}</strong><small>Unit {index+1}</small></button>)}</div><WorldJourney theme={theme} stops={unitLessons.map((lesson) => ({ id: lesson.id, title: lesson.title, label: lesson.journeyType }))} onSelect={(id) => { const lesson = unitLessons.find((item) => item.id === id); if (lesson) onOpenLesson(lesson); }} /></details>
      <section className="student-science-showcase"><span>YOUR JUNE DESTINATION</span><h2>Become the expert on one Science idea you care about.</h2><p>For now, explore each unit. Save a question, photo, model, or result when it helps you remember. Mr. Wyatt will tell you exactly when something belongs in SpacesEDU.</p></section>
    </section>
  );
}

function StudentCurriculumView({ subject, onBack, onOpenLesson, socialLessonId, onSocialLesson, socialScene, onSocialScene, scienceUnitId, onScienceUnit, program, programExperienceId, onProgramExperience }: { subject: Subject; onBack: () => void; onOpenLesson: (lesson: ScienceLesson) => void; socialLessonId: string; onSocialLesson: (id: string) => void; socialScene: number; onSocialScene: (scene: number) => void; scienceUnitId: string; onScienceUnit: (id: string) => void; program?: import("./program-types").LearningProgram; programExperienceId: string; onProgramExperience: (id: string) => void }) {
  if (subject.name === "Social Studies") {
    return (
      <div className="page student-curriculum" style={{ "--subject": subject.color, "--soft": subject.soft } as React.CSSProperties}>
        <button className="back-link" onClick={onBack}>← All subjects</button>
        <header className="student-space-header">
          <span className="student-space-icon" style={{ background: subject.soft, color: subject.color }}>{subject.icon}</span>
          <div><p>GRADE 6 · SOCIAL STUDIES</p><strong>Your inquiry studio</strong></div>
          <span className="student-mode-badge">TEACH VIEW · CLEAN BY DEFAULT</span>
        </header>
        <SocialStudiesStudentLaunch lessonId={socialLessonId} onLesson={onSocialLesson} scene={socialScene} onScene={onSocialScene} />
      </div>
    );
  }
  if (program) {
    return (
      <div className="page student-curriculum" style={{ "--subject": subject.color, "--soft": subject.soft } as React.CSSProperties}>
        <button className="back-link" onClick={onBack}>← All subjects</button>
        <header className="student-space-header">
          <span className="student-space-icon" style={{ background: subject.soft, color: subject.color }}>{subject.icon}</span>
          <div><p>GRADE 6 · {subject.short.toUpperCase()}</p><strong>{program.studioName}</strong></div>
          <span className="student-mode-badge">TEACH VIEW · CLEAN BY DEFAULT</span>
        </header>
        <StudentLearningProgram program={program} record={curriculum[subject.name]} selectedExperienceId={programExperienceId} key={programExperienceId} onExperience={onProgramExperience} />
      </div>
    );
  }
  if (subject.name !== "Science") {
    return (
      <div className="page student-curriculum" style={{ "--subject": subject.color, "--soft": subject.soft } as React.CSSProperties}>
        <button className="back-link" onClick={onBack}>← All subjects</button>
        <header className="student-space-header">
          <span className="student-space-icon" style={{ background: subject.soft, color: subject.color }}>{subject.icon}</span>
          <div><p>GRADE 6 · {subject.short.toUpperCase()}</p><strong>{subject.short}</strong></div>
          <span className="student-mode-badge">CURRICULUM PREVIEW</span>
        </header>
        <section className="student-not-ready">
          <span>{subject.icon}</span>
          <p className="section-kicker">STUDENT ACTIVITIES ARE NOT BUILT YET</p>
          <h1>This space is still being developed.</h1>
          <p>The official Grade 6 curriculum is available in Plan / TTOC, but there is not a classroom-ready Teach View activity here yet.</p>
          <button onClick={onBack}>Return to subjects</button>
        </section>
      </div>
    );
  }
  return (
    <div className="page student-curriculum" style={{ "--subject": subject.color, "--soft": subject.soft } as React.CSSProperties}>
      <button className="back-link" onClick={onBack}>← All subjects</button>
      <header className="student-space-header">
        <span className="student-space-icon" style={{ background: subject.soft, color: subject.color }}>{subject.icon}</span>
        <div><p>GRADE 6 · {subject.short.toUpperCase()}</p><strong>Your learning space</strong></div>
        <span className="student-mode-badge">TEACH VIEW · CLEAN BY DEFAULT</span>
      </header>

      <StudentScienceProgram onOpenLesson={onOpenLesson} unitId={scienceUnitId} onUnit={onScienceUnit} />
    </div>
  );
}

function YearPlanPage({ mode, onHome, onAssessment, onWeeklyPlan }: { mode: "teacher" | "projector"; onHome: () => void; onAssessment: () => void; onWeeklyPlan: (month: string) => void }) {
  const [phase, setPhase] = useState("All year");
  const [calendarScope, setCalendarScope] = useState("All");
  const phases = ["All year", "Social Studies first", "Inquiry bridge", "Science second"];
  const visibleMonths = phase === "Social Studies first"
    ? yearMonths.slice(0, 5)
    : phase === "Inquiry bridge"
      ? yearMonths.slice(4, 6)
      : phase === "Science second"
        ? yearMonths.slice(5)
        : yearMonths;
  const visibleEquityCalendar = calendarScope === "All" ? equityCalendar : equityCalendar.filter((item) => item.scope === calendarScope);

  return (
    <div className={`page year-plan-page ${mode === "projector" ? "year-plan-projector" : ""}`}>
      <button className="back-link" onClick={onHome}>← Classroom home</button>
      <section className="framework-hero year-plan-hero">
        <div>{mode === "teacher" && <span className="recent-section-badge">● RECENTLY UPDATED · AUG. 11</span>}<p className="eyebrow">COMPLETE 2026–27 TEACHING SEQUENCE</p><h1>Teach inquiry before asking for independence.</h1><p>Built around Surrey&apos;s Sept. 8–June 24 school year: Social Studies develops source, rights, systems, and inquiry work first; Science deepens testing, modelling, and design after the February bridge.</p><div className="year-source-links"><a href="https://www.surreyschools.ca/school-year-calendars" target="_blank" rel="noreferrer">Surrey 2026–27 calendar ↗</a><a href="https://curriculum.gov.bc.ca/curriculum" target="_blank" rel="noreferrer">Official B.C. Curriculum ↗</a><a href="https://ca.spacesedu.com/" target="_blank" rel="noreferrer">SpacesEDU Canada ↗</a></div></div>
        <div className="year-arc" aria-label="Year learning arc"><span>SUPPORTED INQUIRY</span><i>→</i><span>EXPERT TEAMS</span><i>→</i><span>SOLUTIONARY INQUIRY</span></div>
      </section>

      <section className="calendar-reality" aria-label="School year timing notes">
        <article><small>SCHOOL OPENS</small><strong>Tuesday, Sept. 8</strong><p>Use the first two weeks for belonging, routines, learning profiles, and inquiry habits.</p></article>
        <article><small>WINTER BREAK</small><strong>Dec. 21–Jan. 1</strong><p>Finish a coherent Human Rights Day product before the break; restart inquiry roles Jan. 4.</p></article>
        <article><small>SPRING INTERRUPTION</small><strong>Mar. 15–29</strong><p>Complete one Science evidence cycle before the break and use retrieval on return.</p></article>
        <article><small>LAST STUDENT DAY</small><strong>Thursday, June 24</strong><p>Finish showcases early enough to protect portfolio reflection and closure.</p></article>
      </section>

      <section className="phase-filter" role="group" aria-label="Filter year plan">
        {phases.map(item => <button key={item} className={phase === item ? "selected" : ""} onClick={() => setPhase(item)}>{item}</button>)}
      </section>

      <section className="month-roadmap">
        {visibleMonths.map((item) => {
          const monthEvidence = spacesEvidenceForMonth(item.month).filter(moment => moment.kind === "Required portfolio" || moment.kind === "Optional evidence");
          return (
          <article key={item.month} className={`month-card status-${item.status.toLowerCase()}`}>
            <header><div><small>{item.status.toUpperCase()}</small><h2>{item.month}</h2></div><span>{String(yearMonths.indexOf(item) + 1).padStart(2, "0")}</span></header>
            <p className="month-dates">{item.dates}</p>
            <h3>{item.phase}</h3>
            <strong>{item.focus}</strong>
            <p>{item.learning}</p>
            <div className="month-subjects">{item.subjects.map(subject => <span key={subject}>{subject}</span>)}</div>
            <details className="month-running-arcs"><summary>Also running across subjects ▾</summary><div>{programArcsForMonth(item.month).map(arc => <article key={`${arc.subject}-${arc.title}`}><small>{arc.subject}</small><strong>{arc.title}</strong><p>{arc.question}</p></article>)}</div></details>
            <section className="month-sequence"><small>TEACHING SEQUENCE · {item.teachingTime}</small>{item.sequence.map((step) => <p key={step}>{step}</p>)}</section>
            <section className="month-planning-grid"><div><small>PREPARE</small><p>{item.preparation}</p></div><div><small>ASSESSMENT</small><p>{item.assessment}</p></div><div><small>DISPLAY / SHARE</small><p>{item.display}</p></div></section>
            <footer className="month-evidence-plan"><b>SPACES EDU EVIDENCE</b><div>{monthEvidence.map(moment => <span key={moment.id} className={`evidence-kind-${moment.kind.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-")}`}><small>{moment.kind}</small><strong>{moment.title}</strong></span>)}</div><button type="button" onClick={() => onWeeklyPlan(item.month)}>Open a seeded week →</button></footer>
          </article>
          );
        })}
      </section>

      <section className="equity-calendar-section">
        <header><div><p className="section-kicker">EQUITY &amp; SOCIAL-JUSTICE TIMING</p><h2>Begin before the date—then keep the learning alive.</h2><p>Anchor projects receive enough time to learn, create, revise, and prepare a real display. Connected lessons strengthen the current curriculum. Community spotlights stay purposeful and do not displace the main sequence.</p></div><span>2026–27</span></header>
        <nav aria-label="Filter equity calendar">{["All", "Anchor project", "Connected lesson", "Community spotlight"].map((item) => <button key={item} className={calendarScope === item ? "selected" : ""} onClick={() => setCalendarScope(item)}>{item}</button>)}</nav>
        <div className="equity-calendar-grid">{visibleEquityCalendar.map((item) => <article key={item.id} className={`scope-${item.scope.toLowerCase().replaceAll(" ", "-")}`}><header><small>{item.scope.toUpperCase()}</small><h3>{item.observance}</h3><strong>{item.observanceDate}</strong></header><div className="date-route"><span><small>START</small><b>{item.recommendedStart}</b></span><i>→</i><span><small>SHARE / DISPLAY</small><b>{item.shareDate}</b></span></div><p>{item.learning}</p><dl><div><dt>Student product</dt><dd>{item.product}</dd></div><div><dt>Curricular home</dt><dd>{item.curricularHome}</dd></div><div><dt>Follow-up</dt><dd>{item.followUp}</dd></div></dl></article>)}</div>
        <footer><strong>Planning rule</strong><span>Begin most creation 1–2 weeks before the observance. Begin 2–3 weeks ahead when research, community knowledge, revision, or a public display is involved. Dates guide meaningful learning; they do not turn cultures or identities into one-day themes.</span></footer>
      </section>

      <section className="year-flex-panel">
        <div><p className="section-kicker">USE THIS AS A COMPASS, NOT A CALENDAR CONTRACT</p><h2>Three kinds of time stay protected.</h2></div>
        <div><article><span>01</span><strong>Teach the process</strong><p>Model questioning, sources, evidence, collaboration, and revision before expecting independence.</p></article><article><span>02</span><strong>Follow worthwhile learning</strong><p>Allow strong discussions, investigations, community opportunities, and student questions to change the pace.</p></article><article><span>03</span><strong>Keep flex weeks</strong><p>Protect time for reteaching, interruptions, conferences, presentations, and learning that needs another attempt.</p></article></div>
        <button onClick={onAssessment}>Open the assessment highlights →</button>
      </section>
    </div>
  );
}

function AssessmentStudioPage({ mode, onHome }: { mode: "teacher" | "projector"; onHome: () => void }) {
  const [selectedId, setSelectedId] = useState(assessmentHighlights[0].id);
  const selected = assessmentHighlights.find(item => item.id === selectedId) ?? assessmentHighlights[0];

  return (
    <div className={`page assessment-studio-page ${mode === "projector" ? "assessment-projector" : ""}`}>
      <button className="back-link" onClick={onHome}>← Classroom home</button>
      <section className="framework-hero assessment-hero">
        <div><p className="eyebrow">CROSS-CURRICULAR ASSESSMENT HIGHLIGHTS</p><h1>Fewer gradeable moments. Better evidence.</h1><p>Eight substantial tasks create a varied body of evidence across the year, including the recurring Bloxels story-game. Students post selected work and individual reflections to SpacesEDU; practice remains practice.</p></div>
        <aside><span>BC GRADE 6</span><strong>Emerging · Developing · Proficient · Extending</strong><p>Use the Provincial Proficiency Scale for each learning area—not a single blended score for the whole project.</p></aside>
      </section>

      <section className="assessment-principles">
        {assessmentPrinciples.map(([title, description], index) => <article key={title}><span>{index + 1}</span><div><strong>{title}</strong><p>{description}</p></div></article>)}
      </section>

      <section className="assessment-workbench">
        <nav aria-label="Assessment highlights">
          <p className="section-kicker">YEAR-LONG EVIDENCE MAP</p>
          {assessmentHighlights.map((item, index) => <button key={item.id} className={selectedId === item.id ? "selected" : ""} onClick={() => setSelectedId(item.id)}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{item.timing}</small><strong>{item.title}</strong></div></button>)}
        </nav>
        <article className="assessment-detail">
          <header><div><small>{selected.timing.toUpperCase()}</small><h2>{selected.title}</h2><p>{selected.question}</p></div><span>{selected.format}</span></header>
          <div className="assessment-subject-tags">{selected.subjects.map(subject => <span key={subject}>{subject}</span>)}</div>
          <div className="assessment-detail-grid">
            <section><p className="section-kicker">POST OR LINK IN SPACES EDU</p><ul>{selected.evidence.map(item => <li key={item}>{item}</li>)}</ul></section>
            <section><p className="section-kicker">ASSESS ONLY WHAT IS VISIBLE</p><ul>{selected.assess.map(item => <li key={item}>{item}</li>)}</ul></section>
          </div>
          <blockquote><small>INDIVIDUAL REFLECTION</small><strong>{selected.reflection}</strong></blockquote>
          <footer><span>✓</span><div><strong>{selected.proficiency}</strong><p>Teacher records subject-specific observations and next steps; the SpacesEDU post keeps the evidence and student voice together.</p></div></footer>
        </article>
      </section>

      <section className="assessment-source-note">
        <div><p className="section-kicker">WHY THIS MODEL FITS B.C.</p><h2>Assessment is an ongoing body of evidence.</h2><p>B.C. reporting for Grades K–9 combines the Provincial Proficiency Scale, descriptive feedback, student Core Competency self-assessment, and goal setting. These highlights organize evidence without turning every engaging task into a mark.</p></div>
        <div><a href="https://www2.gov.bc.ca/gov/content/education-training/k-12/administration/legislation-policy/public-schools/student-reporting" target="_blank" rel="noreferrer">B.C. Student Reporting Policy ↗</a><a href="https://curriculum.gov.bc.ca/classroom-assessment" target="_blank" rel="noreferrer">B.C. Classroom Assessment ↗</a><a href="https://curriculum.gov.bc.ca/learning-pathways/k-12-learning-progressions" target="_blank" rel="noreferrer">Cross-Curricular Learning Progressions ↗</a></div>
      </section>
    </div>
  );
}

function SpacesEvidencePage({ mode, onHome, onAssessment, onProjects }: { mode: "teacher" | "projector"; onHome: () => void; onAssessment: () => void; onProjects: () => void }) {
  const rhythmKinds = ["Required portfolio", "Optional evidence", "In-class / no separate upload", "Support / admin"];
  const [rhythmFilter, setRhythmFilter] = useState("Required portfolio");
  const visibleRhythm = spacesEvidenceRhythm.filter(item => item.kind === rhythmFilter);
  const requiredCount = spacesEvidenceRhythm.filter(item => item.kind === "Required portfolio").length;
  const evidenceById = new Map(spacesEvidenceRhythm.map((item) => [item.id, item]));
  const evidenceSummary = spacesAnnualEvidenceSummary();
  return (
    <div className={`page spaces-evidence-page ${mode === "projector" ? "spaces-projector" : ""}`}>
      <button className="back-link" onClick={onHome}>← Classroom home</button>
      <section className="framework-hero spaces-hero">
        <div><p className="eyebrow">SPACES EDU PORTFOLIO SYSTEM</p><h1>Post with purpose. Make time to finish well.</h1><p>SpacesEDU is the main digital record of assessment evidence. Twelve major anchors organize the year, while additional subject posts can capture shorter learning, progress, and curriculum coverage. Crafts, displays, practice, and playful making still belong in classroom life even when they are not posted.</p></div>
        <div className="spaces-count"><strong>4</strong><span>reporting checkpoints</span></div>
      </section>

      <a className="teacher-spaces-link" href="https://ca.spacesedu.com/" target="_blank" rel="noreferrer"><span>↗</span><div><small>OFFICIAL CANADIAN SITE</small><strong>Open SpacesEDU Canada</strong><p>Use the Canadian regional site for school, student, and family accounts.</p></div></a>

      <section className="spaces-reporting-board" aria-labelledby="spaces-reporting-title">
        <header>
          <div><p className="section-kicker">EVIDENCE RHYTHM · NOT A QUOTA</p><h2 id="spaces-reporting-title">Twelve major anchors keep the year&apos;s evidence visible.</h2><p>{spacesPortfolioBudget.rule} {spacesPortfolioBudget.selectionRule}</p></div>
          <div className="spaces-budget-meter" aria-label={`${evidenceSummary.majorAnchorPosts} major anchors with additional evidence added as needed`}>
            <span><b>{evidenceSummary.majorAnchorPosts}</b>major anchors</span>
            <span><b>≈{evidenceSummary.referenceYearStudentPosts}</b>last-year reference, not a limit</span>
          </div>
        </header>
        <div className="spaces-reporting-windows">
          {spacesReportingWindows.map((window, index) => (
            <article key={window.id}>
              <header><span>{String(index + 1).padStart(2, "0")}</span><div><small>{window.months}</small><h3>{window.label}</h3></div></header>
              <p>{window.purpose}</p>
              <section><b>PLANNED ANCHORS</b>{window.requiredEvidenceIds.map((id) => <span key={id}>★ {evidenceById.get(id)?.title}</span>)}</section>
              {window.optionalEvidenceIds.length > 0 && <details><summary>Examples of additional evidence</summary><div>{window.optionalEvidenceIds.map((id) => <span key={id}>◇ {evidenceById.get(id)?.title}</span>)}</div></details>}
              <footer><b>{window.teacherComment.title}</b><p>{window.teacherComment.focus}</p></footer>
            </article>
          ))}
        </div>
        <p className="spaces-capture-rule"><b>NO DEVICE BUSYWORK:</b> {spacesPortfolioBudget.captureRule}</p>
      </section>

      <section className="spaces-rhythm-board">
        <header><div><p className="section-kicker">2026–27 SINGLE SOURCE OF TRUTH</p><h2>{requiredCount} major anchors, plus evidence when learning needs it.</h2><p>No month has more than two major anchors. Shorter subject posts, student-selected work, and progress evidence can be added throughout the year; the anchor registry protects the major projects without setting an annual maximum.</p></div><span><strong>{requiredCount}</strong>major anchors</span></header>
        <nav aria-label="Filter SpacesEDU evidence rhythm">{rhythmKinds.map(kind => <button key={kind} className={rhythmFilter === kind ? "selected" : ""} onClick={() => setRhythmFilter(kind)}>{kind}<span>{spacesEvidenceRhythm.filter(item => item.kind === kind).length}</span></button>)}</nav>
        <div>{visibleRhythm.map(item => <article key={item.id} className={`rhythm-${item.kind.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-")}`}><header><span>{item.month}</span><small>{item.kind}</small></header><h3>{item.title}</h3><p>{item.purpose}</p><blockquote><b>WHAT TO SAVE</b>{item.evidence}</blockquote><div>{item.subjects.map(subject => <span key={subject}>{subject}</span>)}</div><details><summary>Familiar activity sources ▾</summary><p>{item.sourceActivities.join(" · ")}</p></details></article>)}</div>
        <footer><div><strong>Looking for last year&apos;s exact list?</strong><span>All {priorPracticeSummary.originalRecordCount} original titles and tag counts are organized into {priorPracticeSummary.familyCount} reusable activity families.</span></div><button onClick={onProjects}>Open the 2025–26 activity bank →</button></footer>
      </section>

      <section className="post-recipe">
        {spacesPostRecipe.map(([title, detail], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{detail}</p></div>{index < spacesPostRecipe.length - 1 && <i>→</i>}</article>)}
      </section>

      <section className="spaces-template-panel">
        <div className="spaces-post-example">
          <header><span>STUDENT POST TEMPLATE</span><b>SCIENCE · MATH · ELA</b></header>
          <h2>[Specific title: what the work is and what stage it shows]</h2>
          <div className="post-media-placeholder"><span>＋</span><strong>Use the real work when posting time is scheduled</strong><small>On-site result · paper/model photo · original link · short audio/video explanation</small></div>
          <p><b>I was learning…</b> Name the idea or competency—not just the activity.</p>
          <p><b>This evidence shows…</b> Point to a specific feature, decision, result, quotation, or revision.</p>
          <p><b>My thinking changed when…</b> Explain feedback, evidence, challenge, or a new connection.</p>
          <p><b>My next step is…</b> Choose one useful and realistic improvement.</p>
        </div>
        <aside>
          <p className="section-kicker">TEACHER HIGHLIGHT DECISION</p>
          <article><span>↺</span><div><strong>Practice</strong><p>Feedback or self-check. Keep it formative.</p></div></article>
          <article><span>◇</span><div><strong>Checkpoint</strong><p>Useful evidence of one or two taught competencies.</p></div></article>
          <article><span>★</span><div><strong>Assessment highlight</strong><p>A substantial, revised artifact that strengthens the body of evidence.</p></div></article>
          <article><span>◎</span><div><strong>Core Competency reflection</strong><p>Student-selected evidence, growth story, and goal.</p></div></article>
          <button onClick={onAssessment}>See the eight highlights →</button>
        </aside>
      </section>

      <section className="portfolio-rhythm">
        <div><p className="section-kicker">A MANAGEABLE RHYTHM</p><h2>The report windows drive the posts—not the calendar.</h2><p>Twelve major anchors carry the year. Up to ten progress samples are used only when they add missing evidence. Four teacher comments connect the portfolio to October, December, March, and June reporting.</p></div>
        <div><article><strong>During learning</strong><p>Keep practice on the website, board, paper, in notebooks, or in the original creation tool. Give feedback without creating a post.</p></article><article><strong>At a checkpoint</strong><p>Schedule one posting block. Students use the strongest real artifact instead of manufacturing a screenshot or duplicate file.</p></article><article><strong>At reporting time</strong><p>Review what is already there, notice growth and gaps, then add a teacher comment. Request another post only when the evidence genuinely needs it.</p></article></div>
      </section>
    </div>
  );
}

function ClassroomGuidePage({ mode, onHome }: { mode: "teacher" | "projector"; onHome: () => void }) {
  const [section, setSection] = useState(mode === "projector" ? "Expectations" : "Philosophy");
  const sections = ["Philosophy", "Expectations", "Homework", "Things to know"];

  return (
    <div className={`page classroom-guide-page ${mode === "projector" ? "guide-projector" : ""}`}>
      <button className="back-link" onClick={onHome}>← Classroom home</button>
      <section className="framework-hero guide-hero">
        <div><p className="eyebrow">CLASSROOM GUIDE · LIVING DRAFT</p><h1>A classroom built for belonging, inquiry, and contribution.</h1><p>This guide makes the promises and responsibilities of the classroom visible to students, families, and the teacher. School-specific details can be added once confirmed.</p></div>
        <button onClick={(event) => printClosest(event.currentTarget, ".classroom-guide-page")}>Print this guide</button>
      </section>

      <div className="guide-tabs" role="tablist">{sections.map(item => <button key={item} role="tab" aria-selected={section === item} className={section === item ? "selected" : ""} onClick={() => setSection(item)}>{item}</button>)}</div>

      {section === "Philosophy" && <section className="philosophy-grid">{philosophyCommitments.map(([title, detail], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{detail}</p></article>)}</section>}

      {section === "Expectations" && <section className="expectations-grid">{expectationGroups.map((group, index) => <article key={group.audience}><header><span>{["YOU", "I", "WE"][index]}</span><div><small>{group.audience.toUpperCase()}</small><h2>{group.promise}</h2></div></header><ul>{group.expectations.map(item => <li key={item}>{item}</li>)}</ul></article>)}</section>}

      {section === "Homework" && <section className="homework-policy"><header><span>⌂</span><div><p className="section-kicker">HOMEWORK POLICY</p><h2>{homeworkPolicy.headline}</h2></div></header><div className="homework-columns"><article><small>WHAT MAY COME HOME</small><ul>{homeworkPolicy.regular.map(item => <li key={item}>{item}</li>)}</ul></article><article><small>WHAT WILL NOT BE ROUTINE</small><ul>{homeworkPolicy.notRegular.map(item => <li key={item}>{item}</li>)}</ul></article></div><footer><strong>Family stop rule</strong><p>{homeworkPolicy.familyMove}</p></footer></section>}

      {section === "Things to know" && <section className="things-grid">{thingsToKnow.map(([title, detail], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{detail}</p></div></article>)}</section>}

      <section className="guide-footer-note"><span>@</span><div><strong>Primary family communication</strong><p>Use <a href="mailto:wyatt_daryl@surreyschools.ca?subject=Grade%206%20family%20communication">wyatt_daryl@surreyschools.ca</a> for questions and to arrange meetings. Add a response-time expectation, daily schedule, PHE/library days, dismissal routines, supplies, and current school policies once confirmed.</p></div></section>
    </div>
  );
}

function PlaceholderPage({ title, onHome }: { title: string; onHome: () => void }) {
  return (
    <div className="page placeholder-page">
      <button className="back-link" onClick={onHome}>← Classroom home</button>
      <p className="eyebrow">CLASSROOM WORKSPACE</p>
      <h1>{title}</h1>
      <p>This workspace is structured and ready for the next phase.</p>
      <div className="large-placeholder"><span>✦</span><h2>A focused space for {title.toLowerCase()}</h2><p>Tools and content will appear here as the classroom platform grows.</p></div>
    </div>
  );
}

type LessonStep = {
  number: string;
  label: string;
  subtitle: string;
  duration: string;
  teacherMove: string;
  lookFor: string;
  evidence: string;
};

const lessonSteps: LessonStep[] = [
  { number: "01", label: "Launch / Hook", subtitle: "Predict a surprising motion", duration: "5 min", teacherMove: "Do not explain the science yet. Invite a silent vote, then ask students to justify different predictions.", lookFor: "Students connect the bus stopping to their own experiences and use direction words precisely.", evidence: "Initial prediction and oral reasoning" },
  { number: "02", label: "Learning Intention", subtitle: "Choose a learning target", duration: "4 min", teacherMove: "Read the intention together. Ask students to choose the success criterion that will stretch them most.", lookFor: "Students can restate the learning in their own words.", evidence: "Chosen personal success target" },
  { number: "03", label: "Interactive Teaching", subtitle: "Change the force", duration: "8 min", teacherMove: "Invite students to choose each push. Pause after every trial so they can name the pattern before introducing vocabulary.", lookFor: "A stronger push produces a greater change in motion; students distinguish force from speed.", evidence: "Predictions, observations, vocabulary" },
  { number: "04", label: "Discussion", subtitle: "Build a claim together", duration: "7 min", teacherMove: "Give quiet think time first. Invite evidence, counterexamples, and respectful changes of mind.", lookFor: "Claims supported by an observation or everyday example.", evidence: "Claim–evidence–reasoning talk" },
  { number: "05", label: "Guided Practice", subtitle: "Reason through three cases", duration: "8 min", teacherMove: "Reveal one case at a time. Have partners predict before showing the scientific explanation.", lookFor: "Students identify the object, force, direction, and resulting change in motion.", evidence: "Partner explanations" },
  { number: "06", label: "Independent Practice", subtitle: "Apply Newton’s laws", duration: "8 min", teacherMove: "Students answer before checking. Ask early finishers to explain why another option is less accurate.", lookFor: "Students match phenomena to laws using cause-and-effect reasoning.", evidence: "Three self-check responses" },
  { number: "07", label: "Inquiry Activity", subtitle: "Plan and run a fair test", duration: "20 min", teacherMove: "Approve each group’s changed and measured variables before testing. Emphasize safe, consistent releases.", lookFor: "One changed variable, repeated trials, useful measurements, and an evidence-based conclusion.", evidence: "Fair-test plan, data table, conclusion" },
  { number: "08", label: "Reflection", subtitle: "Notice how thinking changed", duration: "5 min", teacherMove: "Return to the opening prediction. Normalize revisions as evidence of learning, not mistakes.", lookFor: "Students name what changed their thinking.", evidence: "Before-and-after explanation" },
  { number: "09", label: "Exit Ticket", subtitle: "Show today’s understanding", duration: "4 min", teacherMove: "Students answer independently. Use results to decide whether to revisit inertia or force pairs next lesson.", lookFor: "Correct answer plus reasoning, not guessing alone.", evidence: "Three-question exit check" },
  { number: "10", label: "Extension", subtitle: "Choose where motion matters", duration: "Optional", teacherMove: "Offer the choices as invitations. Products can be oral, visual, physical, or digital.", lookFor: "Transfer of force-and-motion ideas to a new context.", evidence: "Student-designed explanation or solution" },
];

const guidedCases = [
  { title: "A scooter speeds up", prompt: "A rider pushes harder against the ground. What changes?", answer: "The stronger push creates a greater change in the scooter’s motion. This is Newton’s second law." },
  { title: "A ball keeps rolling", prompt: "No one touches the ball after the kick. Why does it keep moving?", answer: "An object in motion keeps moving until another force—such as friction—changes it. This is inertia." },
  { title: "A runner moves forward", prompt: "The runner’s foot pushes backward on the ground. Where is the force pair?", answer: "The foot pushes the ground backward, and the ground pushes the runner forward with an equal, opposite force." },
];

const practiceQuestions = [
  { question: "A passenger lurches forward when a bus stops.", choices: ["First law: inertia", "Second law: acceleration", "Third law: force pairs"], answer: 0 },
  { question: "The same cart accelerates more when you push it harder.", choices: ["First law: inertia", "Second law: force changes motion", "Third law: force pairs"], answer: 1 },
  { question: "A swimmer pushes water backward and moves forward.", choices: ["First law: inertia", "Second law: acceleration", "Third law: action–reaction"], answer: 2 },
];

const extensionChoices = [
  ["SPORT MOTION ANALYST", "Record or sketch one movement. Label the forces and explain which law is most visible."],
  ["SAFETY DESIGNER", "Redesign a bike helmet, seat belt, or playground surface using what you know about changing motion."],
  ["SPACE ENGINEER", "Explain how a spacecraft can move when there is no ground or air to push against."],
];

const programStepLabels = [
  ["Launch / Hook", "Notice, predict, and wonder"],
  ["Learning Intention", "Choose a success focus"],
  ["Interactive Teaching", "Build the key concept"],
  ["Discussion", "Develop a claim together"],
  ["Guided Practice", "Reason with support"],
  ["Independent Practice", "Apply the idea"],
  ["Inquiry Activity", "Gather useful evidence"],
  ["Reflection", "Revise your thinking"],
  ["Exit Ticket", "Show what you understand"],
  ["Extension", "Transfer the learning"],
];

const scienceGlossary: Record<string, { meaning: string; example: string }> = {
  observation: { meaning: "information noticed with senses or measuring tools", example: "The cart stopped sooner on the rough path." },
  hypothesis: { meaning: "an educated, testable prediction with a reason", example: "If the path is rougher, the cart will travel less far because friction is greater." },
  system: { meaning: "parts that work together", example: "The nervous system connects sensing, signals, and responses." },
  organ: { meaning: "a body structure with a particular job", example: "A kidney filters materials from blood." },
  signal: { meaning: "information sent from one place to another", example: "Nerves carry signals from your skin." },
  homeostasis: { meaning: "keeping internal conditions in a useful range", example: "Sweating helps keep body temperature in range." },
  stimulus: { meaning: "a change that can be detected", example: "Bright light is a stimulus for the eye." },
  neuron: { meaning: "a cell that carries nervous-system signals", example: "Neurons carry information from a fingertip." },
  response: { meaning: "what an organism does after a stimulus", example: "Pulling a hand away is a response." },
  reflex: { meaning: "a fast automatic response", example: "Blinking protects the eye without a deliberate choice." },
  hormone: { meaning: "a chemical message carried through the body", example: "Hormones help coordinate growth and sleep." },
  gland: { meaning: "an organ that releases a substance", example: "An endocrine gland releases hormones." },
  target: { meaning: "the cells or organ a message affects", example: "Only target cells respond to a particular hormone." },
  endocrine: { meaning: "relating to glands and hormones", example: "The endocrine system sends slower chemical messages." },
  excretion: { meaning: "removing wastes made by the body", example: "Kidneys excrete wastes in urine." },
  kidney: { meaning: "an organ that filters blood and balances water and salts", example: "Kidneys help the body keep the right water balance." },
  filtration: { meaning: "separating materials by letting some pass through", example: "A filter can trap solid particles in a mixture." },
  waste: { meaning: "material the body or process no longer needs", example: "Urea is a waste removed from blood." },
  reproduction: { meaning: "the biological process that produces offspring", example: "Reproductive cells join during fertilization." },
  ovary: { meaning: "an organ that produces eggs and hormones", example: "An ovary can release an egg cell." },
  testis: { meaning: "an organ that produces sperm and hormones", example: "A testis produces sperm cells." },
  gamete: { meaning: "a reproductive cell such as an egg or sperm", example: "Each gamete carries genetic information." },
  feedback: { meaning: "information that changes or regulates a process", example: "Temperature feedback can trigger sweating." },
  variable: { meaning: "something that can change in an investigation", example: "Cart mass can be the changed variable." },
  regulation: { meaning: "controlling a condition or process", example: "The body regulates temperature." },
  model: { meaning: "a representation used to explain or predict", example: "A diagram can model how systems interact." },
  interaction: { meaning: "when two things affect one another", example: "A hand and ball interact during a throw." },
  evidence: { meaning: "observations or data used to support an idea", example: "Repeated measurements are evidence for a pattern." },
  limitation: { meaning: "something a model or test cannot show well", example: "A filter model cannot copy every kidney function." },
  mixture: { meaning: "two or more substances together without becoming a new substance", example: "Trail mix contains several components." },
  component: { meaning: "one part of a mixture or system", example: "Sand is one component of muddy water." },
  property: { meaning: "a feature that can be observed or measured", example: "Magnetism is a useful material property." },
  substance: { meaning: "a kind of material with its own properties", example: "Salt and water are different substances." },
  heterogeneous: { meaning: "not evenly mixed; different parts can be detected", example: "Soil is a heterogeneous mixture." },
  distribution: { meaning: "how something is spread through an area", example: "Seeds may have an uneven distribution in a mix." },
  particle: { meaning: "a very small piece of matter", example: "Large particles can be trapped by a sieve." },
  scale: { meaning: "size or level of detail used to observe something", example: "A hand lens changes the observation scale." },
  magnetism: { meaning: "a property that creates magnetic attraction or repulsion", example: "A magnet can remove iron from sand." },
  solubility: { meaning: "how well a substance dissolves", example: "Salt has high solubility in water." },
  density: { meaning: "mass packed into a certain volume", example: "Density helps explain floating and sinking." },
  "particle size": { meaning: "how large or small the pieces are", example: "A sieve separates components by particle size." },
  sieving: { meaning: "separating particles with holes of a chosen size", example: "A sieve can separate gravel from sand." },
  settling: { meaning: "letting denser particles sink over time", example: "Mud settles at the bottom of still water." },
  evaporation: { meaning: "liquid changing into gas", example: "Evaporation can leave dissolved salt behind." },
  "place-based": { meaning: "connected to a specific land, water, community, and relationship", example: "Knowledge of materials develops through long experience with a place." },
  extraction: { meaning: "removing a useful material from a mixture or source", example: "A process may extract pigment from a plant." },
  protocol: { meaning: "an agreed way to act respectfully and safely", example: "A knowledge holder may set a protocol for sharing knowledge." },
  "knowledge holder": { meaning: "a person recognized as carrying particular community knowledge", example: "The specific knowledge holder and Nation should be named." },
  constraint: { meaning: "a limit or requirement a design must meet", example: "A design may have a size or material constraint." },
  sequence: { meaning: "the order in which steps happen", example: "A separation sequence may use a magnet before water." },
  efficiency: { meaning: "using time and resources with little waste", example: "An efficient method recovers material without many steps." },
  recovery: { meaning: "how much useful material is collected again", example: "We measured the recovery of each component." },
  motion: { meaning: "when an object changes place compared with something else", example: "The cart moves away from the start line." },
  position: { meaning: "where an object is compared with a chosen place or object", example: "The ball is two metres from the wall." },
  "reference point": { meaning: "the place or object you choose to compare with", example: "We use the start line to tell whether the cart moved." },
  speed: { meaning: "how fast or slowly an object changes place", example: "The faster cart reaches the end of the track first." },
  force: { meaning: "a push or pull caused by an interaction", example: "A hand pushes on a cart." },
  push: { meaning: "a force directed away from the source", example: "A foot pushes a ball forward." },
  pull: { meaning: "a force directed toward the source", example: "A rope pulls a sled." },
  "contact force": { meaning: "a force that acts while objects touch", example: "A hand pushing a box is a contact force." },
  "force arrow": { meaning: "an arrow that models a force on an object", example: "A longer right arrow can show a larger force to the right." },
  direction: { meaning: "the way a force or motion points", example: "The arrow points right, so the force is rightward." },
  "relative size": { meaning: "larger or smaller compared with another amount", example: "A longer arrow shows a relatively larger force." },
  label: { meaning: "words that identify what a diagram part represents", example: "Label the arrow ‘push from hand’." },
  balanced: { meaning: "forces combine to a net force of zero", example: "Equal opposite pulls are balanced." },
  unbalanced: { meaning: "forces combine to a non-zero net force", example: "A larger rightward push makes forces unbalanced." },
  "net force": { meaning: "the overall force after all forces are combined", example: "10 N right and 6 N left give a net force right." },
  "motion change": { meaning: "starting, stopping, speeding up, slowing down, or turning", example: "A net force can make a cart speed up." },
  inertia: { meaning: "the tendency to resist a change in motion", example: "A passenger continues forward when a bus brakes." },
  "newton’s first law": { meaning: "motion stays the same unless a net force changes it", example: "A puck keeps sliding until friction or another force changes it." },
  friction: { meaning: "a contact force that opposes sliding between surfaces", example: "Carpet creates more friction on a cart than tile." },
  "newton’s second law": { meaning: "acceleration depends on net force and mass", example: "The same cart accelerates more with a stronger push." },
  mass: { meaning: "the amount of matter in an object", example: "A loaded cart has more mass." },
  acceleration: { meaning: "a change in speed or direction", example: "Speeding up, slowing down, and turning are acceleration." },
  "newton’s third law": { meaning: "interacting objects exert equal opposite forces on each other", example: "A swimmer pushes water back; water pushes the swimmer forward." },
  "force pair": { meaning: "two equal opposite forces on two different objects", example: "Foot on ground and ground on foot form a force pair." },
  opposite: { meaning: "pointing in completely different directions", example: "Left and right are opposite directions." },
  gravity: { meaning: "an attractive force between masses", example: "Earth pulls an unsupported object downward." },
  "air resistance": { meaning: "a force from air that opposes motion through it", example: "Flat paper has more air resistance than crumpled paper." },
  "surface force": { meaning: "a support force from a surface touching an object", example: "A table pushes upward on a resting book." },
  impact: { meaning: "a collision in which motion changes quickly", example: "A helmet changes how an impact affects the head." },
  prototype: { meaning: "an early design made for testing", example: "A model helmet is a prototype." },
  iteration: { meaning: "one cycle of testing and improving", example: "The second iteration used a thicker padding layer." },
  planet: { meaning: "a large body that orbits a star", example: "Earth is a planet orbiting the Sun." },
  "solar system": { meaning: "a star and the objects that orbit it", example: "Our solar system includes the Sun and eight planets." },
  galaxy: { meaning: "a vast group of stars, gas, dust, and dark matter", example: "The Milky Way is our galaxy." },
  universe: { meaning: "all space, time, matter, and energy", example: "Galaxies are structures within the universe." },
  timeline: { meaning: "events arranged in time order", example: "A timeline models major events in cosmic history." },
  "light-year": { meaning: "the distance light travels in one year", example: "A light-year measures distance, not time." },
  "big bang": { meaning: "the early expansion from a hot, dense state", example: "Evidence shows the universe has expanded and changed." },
  orbit: { meaning: "a curved path caused by motion and gravity", example: "Earth follows an orbit around the Sun." },
  terrestrial: { meaning: "rocky and Earth-like", example: "Mercury is a terrestrial planet." },
  "gas giant": { meaning: "a very large planet made mostly of gases", example: "Jupiter is a gas giant." },
  "dwarf planet": { meaning: "a round body orbiting the Sun that has not cleared its orbit", example: "Pluto is a dwarf planet." },
  rotation: { meaning: "spinning around an axis", example: "Earth’s rotation causes day and night." },
  revolution: { meaning: "one complete orbit around another body", example: "Earth’s revolution around the Sun takes about a year." },
  axis: { meaning: "an imaginary line around which something rotates", example: "Earth rotates around its tilted axis." },
  "milky way": { meaning: "the spiral galaxy containing our solar system", example: "The Sun is one star in the Milky Way." },
  "spiral galaxy": { meaning: "a galaxy with a central region and spiral arms", example: "The Milky Way is a barred spiral galaxy." },
  star: { meaning: "a hot glowing sphere of plasma powered by fusion", example: "The Sun is our nearest star." },
  "indirect evidence": { meaning: "evidence inferred from effects rather than seen directly", example: "Light and motion can reveal distant objects." },
  structure: { meaning: "how parts are arranged and related", example: "The solar system is nested within a galaxy." },
  "model limitation": { meaning: "a known way a model differs from reality", example: "A classroom orbit model cannot show true distances and sizes together." },
};

type TeachingPack = {
  explanation: { title: string; text: string }[];
  examples: { title: string; situation: string; answer: string }[];
  challenge?: { prompt: string; choices: string[]; answer: number; explanation: string };
};

const teachingPacks: Record<string, TeachingPack> = {
  "inquiry-toolkit": {
    explanation: [
      { title: "1 · Observe before explaining", text: "Describe what happened without guessing why: ‘The cart travelled 62 cm on the smooth path.’" },
      { title: "2 · Ask and hypothesize", text: "A testable question compares something. A hypothesis predicts the result and gives a scientific reason. It can be supported or challenged—not proven forever." },
      { title: "3 · Plan a fair comparison", text: "Change one variable, measure one outcome, keep important conditions the same, repeat trials, and use the pattern as evidence." },
      { title: "4 · Conclude honestly", text: "State what the evidence shows, compare it with the hypothesis, and name uncertainty or a useful next test." },
    ],
    examples: [
      { title: "Surface test", situation: "Does surface type affect cart distance?", answer: "Change the surface; measure distance; keep the cart, start line, and push the same." },
      { title: "Plant test", situation: "Does light time affect plant growth?", answer: "Change hours of light; measure growth; keep plant type, water, soil, pot, and test time the same." },
      { title: "Paper test", situation: "Does paper shape affect falling time?", answer: "Change paper shape; measure fall time; keep paper type, mass, drop height, and release method the same." },
    ],
    challenge: { prompt: "Which statement is a useful hypothesis?", choices: ["Rough paths are bad.", "I think the cart might stop.", "If the path is rougher, the cart will travel a shorter distance because greater friction opposes its motion."], answer: 2, explanation: "It predicts a measurable result and gives a reason that can be tested." },
  },
  "motion-basics": {
    explanation: [
      { title: "First: choose what you are watching", text: "Say the object clearly: the passenger, the bus, the skateboarder, or the ball. This keeps the description from becoming confusing." },
      { title: "Next: choose a comparison place", text: "Ask, ‘Compared with what?’ A seat, start line, tree, wall, or school can be the place you compare with. Scientists call it a reference point." },
      { title: "Then: describe the change", text: "Say where the object began, where it ended, and which way it went. If its place changed compared with your chosen point, it was moving." },
      { title: "Finally: describe how it moved", text: "Was the motion steady? Did it speed up, slow down, stop, or turn? These everyday words are more useful than jumping straight to a formula." },
    ],
    examples: [
      { title: "Maya on the bus", situation: "Maya stays in the same seat while the bus passes the school.", answer: "Compared with her seat, Maya is not moving. Compared with the school, she is moving. Both descriptions can be correct." },
      { title: "Skateboard replay", situation: "A skateboarder covers about the same distance in each second.", answer: "The skateboarder is moving at a steady speed. The gaps between the one-second snapshots are about equal." },
      { title: "Soccer turn", situation: "A ball curves around a cone without clearly getting faster or slower.", answer: "Its direction changed, so its motion changed. We can describe the curve before using a new science term for it." },
    ],
    challenge: { prompt: "Maya is sitting still in her seat while the bus passes the school. Which answer is best?", choices: ["Maya is not moving at all.", "Maya is moving no matter what we compare with.", "Maya is still compared with the seat but moving compared with the school.", "There is no way to describe her motion."], answer: 2, explanation: "Motion depends on the comparison place. Scientists call that place a reference point." },
  },
  "forces-intro": {
    explanation: [
      { title: "A force is an interaction", text: "A force is a push or pull from one object on another object. Name both objects: ‘The foot pushes on the ball.’" },
      { title: "Forces can change motion", text: "A force can start, stop, speed up, slow down, or turn an object. It can also change an object’s shape." },
      { title: "Contact or at a distance", text: "A hand push, friction, and surface support need contact. Gravity can act without objects touching." },
    ],
    examples: [
      { title: "Kicked ball", situation: "A foot touches a ball and the ball speeds up to the right.", answer: "Contact push: the foot pushes the ball to the right." },
      { title: "Pulled wagon", situation: "A person uses a handle to bring a wagon closer.", answer: "Contact pull: the handle pulls the wagon toward the person." },
      { title: "Falling apple", situation: "An unsupported apple speeds up downward.", answer: "Gravity: Earth pulls the apple downward." },
    ],
    challenge: { prompt: "A book rests on a table. Which forces act on the book?", choices: ["No forces", "Gravity only", "Gravity downward and support from the table upward", "A push to the right"], answer: 2, explanation: "An object can have forces acting on it even when it does not move. These two forces are balanced." },
  },
  "force-arrows": {
    explanation: [
      { title: "Start on the receiving object", text: "First choose the object you are explaining. Every arrow begins on that object because the arrow represents a force acting on it." },
      { title: "Direction is the arrowhead", text: "Point the arrow the way the force acts. This is not automatically the same direction the object is already moving." },
      { title: "Length compares size", text: "A longer arrow means a relatively larger force. Only compare arrow lengths within the same diagram." },
      { title: "Labels name the interaction", text: "Write both the force and its source: ‘push from hand,’ ‘gravity from Earth,’ ‘friction from floor,’ or ‘support from table.’" },
    ],
    examples: [
      { title: "Hand pushes box", situation: "We are explaining the box while a hand pushes it right.", answer: "Begin on the box, point right, and label ‘push from hand.’" },
      { title: "Book on table", situation: "We are explaining a motionless book.", answer: "Draw equal arrows: gravity from Earth downward and support from table upward." },
      { title: "Sliding puck", situation: "The puck moves right but slows on the floor.", answer: "Friction from the floor points left—even though the puck is moving right." },
    ],
    challenge: { prompt: "A ball is moving right but friction is slowing it. Which force arrow is correct?", choices: ["A right arrow labelled friction", "A left arrow labelled friction from the floor", "No arrow because the ball is moving", "A down arrow labelled motion"], answer: 1, explanation: "A force arrow shows the direction of the force, not necessarily the direction of motion. Friction opposes sliding." },
  },
  "balanced-unbalanced": {
    explanation: [
      { title: "Combine forces on one object", text: "Net force means the overall force after all forces acting on the same object are combined." },
      { title: "Balanced does not mean force-free", text: "Equal forces in opposite directions give a net force of zero. Motion does not change: an object stays still or keeps the same velocity." },
      { title: "Unbalanced changes motion", text: "If one direction is stronger, the net force points that way and the object accelerates that way." },
    ],
    examples: [
      { title: "Resting book", situation: "Gravity is 5 units down and table support is 5 units up.", answer: "Balanced; net force is zero; the book remains still." },
      { title: "Even tug", situation: "Two teams pull with 3 force units in opposite directions.", answer: "Balanced; net force is zero; motion does not change." },
      { title: "Uneven tug", situation: "The right team pulls with 5 units and the left team with 2.", answer: "Unbalanced; net force is 3 units right; motion changes rightward." },
    ],
    challenge: { prompt: "A cart moves right at constant speed. What must be true about its net force?", choices: ["It must point right.", "It is zero.", "There are no forces at all.", "It must point left."], answer: 1, explanation: "Constant velocity means no acceleration, so the forces are balanced and net force is zero." },
  },
  inertia: {
    explanation: [
      { title: "Objects resist motion changes", text: "Inertia is the tendency of an object to keep its current motion: staying still or moving with the same speed and direction." },
      { title: "A net force causes the change", text: "A moving object does not need a forward force to keep moving. A net force is needed to speed it up, slow it down, or turn it." },
      { title: "Mass increases inertia", text: "Objects with more mass are harder to start, stop, or turn because they have more inertia." },
    ],
    examples: [
      { title: "Braking bus", situation: "The bus stops, but the passenger’s body continues forward.", answer: "The body keeps its forward motion until the seat belt exerts a force to slow it safely." },
      { title: "Tablecloth", situation: "A cloth is pulled quickly from under dishes.", answer: "The dishes tend to remain at rest because of inertia." },
      { title: "Rolling ball", situation: "A ball slows after the kick.", answer: "Friction and air resistance create a net force that changes its motion." },
    ],
    challenge: { prompt: "Why does a seat belt help during a sudden stop?", choices: ["It removes inertia.", "It provides a force that changes the passenger’s forward motion.", "It pushes the bus forward.", "It makes the passenger massless."], answer: 1, explanation: "The passenger continues forward due to inertia; the belt supplies the force needed to slow the passenger with the vehicle." },
  },
  "force-mass-acceleration": {
    explanation: [
      { title: "More net force → more acceleration", text: "For the same object, a stronger net force creates a larger change in speed or direction." },
      { title: "More mass → less acceleration", text: "With the same net force, an object with more mass changes motion less." },
      { title: "Compare one change at a time", text: "To learn which factor mattered, change force while keeping mass the same—or change mass while keeping force the same." },
    ],
    examples: [
      { title: "Same cart, stronger push", situation: "Force increases while mass stays the same.", answer: "Acceleration increases." },
      { title: "Same push, loaded cart", situation: "Mass increases while force stays the same.", answer: "Acceleration decreases." },
      { title: "Both change", situation: "Force and mass both increase.", answer: "We need actual values or evidence; changing both prevents a simple conclusion." },
    ],
    challenge: { prompt: "Which is a fair test of how force affects acceleration?", choices: ["Push a light cart gently and a heavy cart strongly.", "Push the same cart with three measured force levels.", "Use different carts, surfaces, and pushes.", "Run one trial only."], answer: 1, explanation: "The cart and conditions stay the same while only force changes." },
  },
  "action-reaction": {
    explanation: [
      { title: "Forces come in pairs", text: "Whenever object A pushes or pulls object B, object B pushes or pulls object A with an equal force in the opposite direction." },
      { title: "The pair acts on different objects", text: "The two forces do not cancel because one acts on object A and the other acts on object B." },
      { title: "The pair happens together", text: "Neither force comes first. The interaction creates both forces at the same time." },
    ],
    examples: [
      { title: "Walking", situation: "A foot pushes the ground backward.", answer: "The ground pushes the foot—and the walker—forward." },
      { title: "Swimming", situation: "A swimmer pushes water backward.", answer: "The water pushes the swimmer forward." },
      { title: "Rocket", situation: "The rocket pushes exhaust gas backward.", answer: "The exhaust gas pushes the rocket forward; no air or ground is required." },
    ],
    challenge: { prompt: "Why do a force pair’s equal forces not cancel?", choices: ["One force is secretly larger.", "They act at different times.", "They act on different objects.", "They point the same way."], answer: 2, explanation: "Forces can cancel only when they act on the same object. A third-law pair acts on two different objects." },
  },
  "gravity-friction": {
    explanation: [
      { title: "Gravity pulls masses together", text: "Near Earth, gravity from Earth pulls objects downward whether they are moving or still." },
      { title: "Surfaces push and resist", text: "A surface can support an object upward. Friction acts along touching surfaces and opposes sliding or attempted sliding." },
      { title: "Air resistance opposes motion through air", text: "Shape and speed can change air resistance. A flat sheet usually experiences more air resistance than the same sheet crumpled." },
    ],
    examples: [
      { title: "Book at rest", situation: "A book sits motionless on a table.", answer: "Gravity acts down and table support acts up. They are balanced." },
      { title: "Sliding block", situation: "A block slides right and slows.", answer: "Friction from the surface acts left, opposite the sliding motion." },
      { title: "Two paper shapes", situation: "A flat and crumpled sheet have the same mass.", answer: "Different air resistance can make the flat sheet fall more slowly." },
    ],
    challenge: { prompt: "Which forces act on a falling sheet before it reaches the floor?", choices: ["Gravity only", "Air resistance only", "Gravity downward and air resistance upward", "Surface support upward"], answer: 2, explanation: "Earth pulls downward while air resistance opposes the sheet’s downward motion." },
  },
  "motion-change": {
    explanation: [
      { title: "Choose one object first", text: "Complex events become clearer when you name the object you are explaining before drawing forces or choosing a law." },
      { title: "Use arrows to find the motion change", text: "Draw forces on that object, combine them into a net force, and predict the direction of acceleration." },
      { title: "Use the law that answers the question", text: "First law explains unchanged motion and inertia; second connects force, mass, and acceleration; third explains force pairs between objects." },
    ],
    examples: [
      { title: "Bus passenger", situation: "The bus brakes but the passenger continues forward.", answer: "First law: inertia keeps the body moving until the belt provides a backward force." },
      { title: "Loaded cart", situation: "The same push acts on a cart after mass is added.", answer: "Second law: greater mass produces less acceleration for the same force." },
      { title: "Runner", situation: "A foot pushes backward on the ground.", answer: "Third law: the ground pushes forward on the foot with an equal opposite force." },
    ],
    challenge: { prompt: "A swimmer pushes water backward and moves forward. Which explanation is most useful?", choices: ["First law only", "Second law only", "Third law: water pushes the swimmer forward", "Gravity pulls the swimmer forward"], answer: 2, explanation: "The swimmer and water exert an equal, opposite force pair on different objects." },
  },
  "motion-design": {
    explanation: [
      { title: "Design begins with a motion problem", text: "Name what is moving, what must change, and what harm or performance issue the design should address." },
      { title: "Connect features to forces", text: "A feature is not evidence by itself. Explain how it changes force, stopping time, friction, direction, or energy transfer." },
      { title: "Test, compare, improve", text: "Use the same test for the original and revised prototype, record evidence, and improve one feature at a time." },
    ],
    examples: [
      { title: "Helmet padding", situation: "Thicker compressible padding increases stopping time during impact.", answer: "The head slows over more time, reducing the size of the force." },
      { title: "Shoe tread", situation: "A tread pattern increases grip on a wet surface.", answer: "Greater useful friction helps prevent slipping." },
      { title: "Seat belt", situation: "A belt stretches slightly and spreads force across the body.", answer: "It changes motion more safely by increasing stopping time and distributing force." },
    ],
    challenge: { prompt: "Which evidence best supports a safer package design?", choices: ["It looks stronger.", "The egg survived once.", "Across repeated equal drops, the revised design reduced measured impact and damage.", "The group likes it."], answer: 2, explanation: "Repeated, comparable measurements support the claim more strongly than appearance or one successful trial." },
  },
};

function vocabularyHelp(lesson: ScienceLesson, word: string) {
  return lesson.vocabularySupport?.[word] ?? scienceGlossary[word.toLowerCase()] ?? {
    meaning: `a key word used to explain ${lesson.title.toLowerCase()}`,
    example: `Use “${word}” in a sentence that answers today’s question.`,
  };
}

const forceBank = [
  ["PUSH", "from a touching object"],
  ["PULL", "toward a touching object"],
  ["GRAVITY", "from Earth; usually downward"],
  ["FRICTION", "opposes sliding at a surface"],
  ["AIR RESISTANCE", "opposes motion through air"],
  ["SUPPORT", "from a surface holding an object up"],
];

function ExplanationLadder({ lesson }: { lesson: ScienceLesson }) {
  const pack = teachingPacks[lesson.id];
  if (!pack) return null;
  return <section className="explanation-ladder" aria-label="Step-by-step explanation">
    <div className="explanation-heading"><span>EXPLAINED STEP BY STEP</span><p>Read each idea, then point to where you see it in the demonstration.</p></div>
    <div>{pack.explanation.map((item,index)=><article key={item.title}><b>{index+1}</b><div><strong>{item.title}</strong><p>{item.text}</p></div></article>)}</div>
  </section>;
}

function WorkedExamples({ lesson }: { lesson: ScienceLesson }) {
  const [open, setOpen] = useState<number[]>([0]);
  const pack = teachingPacks[lesson.id];
  if (!pack) return null;
  const toggle = (index:number) => setOpen(items=>items.includes(index)?items.filter(item=>item!==index):[...items,index]);
  return <section className="worked-examples"><header><span>WORKED EXAMPLES</span><p>Predict first. Then reveal the explanation and compare it with your thinking.</p></header><div>{pack.examples.map((item,index)=><article key={item.title} className={open.includes(index)?"open":""}><button onClick={()=>toggle(index)}><span>EXAMPLE {index+1}</span><strong>{item.title}</strong><p>{item.situation}</p><b>{open.includes(index)?"Hide explanation ↑":"Reveal explanation ↓"}</b></button>{open.includes(index)&&<div><small>SCIENTIFIC EXPLANATION</small><p>{item.answer}</p></div>}</article>)}</div></section>;
}

function ChoiceChallenge({ lesson }: { lesson: ScienceLesson }) {
  const [answer,setAnswer]=useState<number|null>(null);
  const challenge=teachingPacks[lesson.id]?.challenge;
  if(!challenge) return null;
  return <section className="choice-challenge"><header><span>CHECK YOUR UNDERSTANDING</span><h2>{challenge.prompt}</h2><p>Choose before revealing. The explanation matters more than the letter.</p></header><div>{challenge.choices.map((choice,index)=><button key={choice} onClick={()=>setAnswer(index)} className={answer===index?(index===challenge.answer?"correct":"incorrect"):""}><b>{String.fromCharCode(65+index)}</b><span>{choice}</span></button>)}</div>{answer!==null&&<aside className={answer===challenge.answer?"correct":"incorrect"}><b>{answer===challenge.answer?"✓ That fits the evidence":"Not yet—compare the force, object, and motion again"}</b><p>{challenge.explanation}</p></aside>}</section>;
}

function InquiryToolkitLab() {
  const [surface,setSurface]=useState<"smooth"|"rough">("smooth");
  const [runs,setRuns]=useState<Record<string,number[]>>({smooth:[],rough:[]});
  const [hypothesis,setHypothesis]=useState<number|null>(null);
  const distances=surface==="smooth"?[78,74,76]:[39,42,40];
  const runTrial=()=>setRuns(current=>{const next=current[surface].length;return next>=3?current:{...current,[surface]:[...current[surface],distances[next]]}});
  const complete=runs.smooth.length===3&&runs.rough.length===3;
  return <section className="digital-lab method-lab"><header><div><span>NO-MATERIALS DIGITAL INVESTIGATION</span><strong>Smooth path or rough path?</strong></div><button onClick={()=>{setRuns({smooth:[],rough:[]});setHypothesis(null)}}>↻ Reset</button></header><div className="hypothesis-panel"><b>1 · MAKE AN EDUCATED HYPOTHESIS</b><p>Which path will let the same cart travel farther?</p><div>{["Smooth, because it has less friction","Rough, because it has more texture","They will travel exactly the same"].map((item,index)=><button key={item} className={hypothesis===index?"selected":""} onClick={()=>setHypothesis(index)}>{item}</button>)}</div></div><div className="method-scene"><div className={`method-track ${surface}`}><span className="method-cart" key={`${surface}-${runs[surface].length}`} style={{"--travel":`${distances[Math.max(0,runs[surface].length-1)]}%`} as React.CSSProperties}>▣</span></div><div className="method-controls"><span>2 · CHANGE ONE VARIABLE</span><button className={surface==="smooth"?"selected":""} onClick={()=>setSurface("smooth")}>Smooth surface</button><button className={surface==="rough"?"selected":""} onClick={()=>setSurface("rough")}>Rough surface</button><button className="run" disabled={hypothesis===null||runs[surface].length>=3} onClick={runTrial}>Run {surface} trial {Math.min(3,runs[surface].length+1)}</button></div></div><div className="method-data"><div><b>SMOOTH DISTANCE</b><p>{runs.smooth.length?runs.smooth.map(value=>`${value} cm`).join(" · "):"Run 3 trials"}</p></div><div><b>ROUGH DISTANCE</b><p>{runs.rough.length?runs.rough.map(value=>`${value} cm`).join(" · "):"Run 3 trials"}</p></div><aside><b>KEEP THE SAME</b><p>cart · starting line · push strength · measuring method</p></aside></div>{complete&&<div className="lab-conclusion"><b>3 · USE THE PATTERN AS EVIDENCE</b><p>The cart travelled farther in every smooth-surface trial. The evidence supports the hypothesis that less friction allows the cart to travel farther.</p></div>}</section>;
}

function MotionMystery() {
  const [choice,setChoice]=useState<number|null>(null);
  const [run,setRun]=useState(0);
  const choices=["Maya is not moving","Maya is moving","Both can be true"];
  return <section className="motion-mystery">
    <header><div><span>MOTION MYSTERY</span><strong>Is Maya moving—or not?</strong></div><button onClick={()=>{setChoice(null);setRun(value=>value+1)}}>↻ Replay</button></header>
    <div className="mystery-scene" key={run}><span className="mystery-school">SCHOOL</span><span className="mystery-tree">♣</span><div className="mystery-bus"><i>●</i><b>MAYA</b></div><span className="mystery-road"></span></div>
    <div className="mystery-question"><p>Maya stays in the same seat while the bus passes the school. Choose your first answer.</p><div>{choices.map((item,index)=><button key={item} className={choice===index?"selected":""} onClick={()=>setChoice(index)}>{item}</button>)}</div></div>
    {choice!==null&&<div className={`mystery-reveal ${choice===2?"correct":""}`}><b>{choice===2?"✓ THE MOST COMPLETE ANSWER":"LOOK AGAIN FROM TWO PLACES"}</b><p>Compared with the <strong>seat</strong>, Maya stays in the same place. Compared with the <strong>school</strong>, Maya changes place. She is both still and moving—depending on what we compare her with.</p></div>}
  </section>;
}

function MotionReplayLab() {
  const scenes=[
    {name:"Bus mystery",question:"Which comparison gives the clearest complete answer?",choices:["Only the seat","Only the school","Use both the seat and the school"],answer:2,explanation:"Maya is still compared with her seat and moving compared with the school. Saying the comparison place removes the confusion."},
    {name:"Skateboard replay",question:"What do the growing gaps between snapshots show?",choices:["The rider is slowing down","The rider is speeding up","The rider is not moving"],answer:1,explanation:"Each snapshot is one second apart. Bigger gaps mean the rider covered more distance in the same time, so the rider sped up."},
    {name:"Soccer curve",question:"What changed as the ball curved around the cone?",choices:["Only its colour","Its direction","Nothing about its motion"],answer:1,explanation:"The ball changed direction. Turning counts as a change in motion, even when the speed looks about the same."},
  ];
  const [scene,setScene]=useState(0);
  const [answer,setAnswer]=useState<number|null>(null);
  const [run,setRun]=useState(0);
  const item=scenes[scene];
  return <section className="digital-lab motion-replay-lab">
    <header><div><span>WATCH · CHOOSE · REPLAY · EXPLAIN</span><strong>Motion Replay Lab</strong></div><button onClick={()=>{setRun(value=>value+1);setAnswer(null)}}>↻ Replay scene</button></header>
    <div className="scenario-tabs">{scenes.map((option,index)=><button key={option.name} className={scene===index?"selected":""} onClick={()=>{setScene(index);setAnswer(null);setRun(value=>value+1)}}>{option.name}</button>)}</div>
    <div className={`motion-story-scene motion-story-${scene}`} key={`${scene}-${run}`}>
      {scene===0&&<><span className="story-school">SCHOOL</span><span className="story-tree">♣</span><span className="story-seat">same seat</span><div className="story-bus"><i>●</i><b>MAYA</b></div><span className="story-road"></span></>}
      {scene===1&&<><span className="story-start">START</span><span className="story-tick tick-one">1 s</span><span className="story-tick tick-two">2 s</span><span className="story-tick tick-three">3 s</span><span className="story-skater">●<b>▰</b></span><span className="story-track"></span></>}
      {scene===2&&<><span className="story-goal">GOAL</span><span className="story-cone">▲</span><span className="story-ball">●</span><span className="story-curve"></span></>}
    </div>
    <div className="motion-replay-question"><b>MAKE AN EDUCATED GUESS</b><p>{item.question}</p><div>{item.choices.map((option,index)=><button key={option} className={answer===index?(index===item.answer?"correct":"incorrect"):""} onClick={()=>setAnswer(index)}>{option}</button>)}</div></div>
    {answer!==null&&<div className={`lab-conclusion ${answer===item.answer?"correct":"incorrect"}`}><b>{answer===item.answer?"✓ THAT MATCHES THE REPLAY":"REPLAY AND COMPARE"}</b><p>{item.explanation}</p></div>}
  </section>;
}

function MotionVideoSpotlight() {
  return <section className="motion-video-card">
    <div className="motion-video-copy"><span>OPTIONAL VIDEO EXPLAINER</span><h2>What does “compared with” mean in science?</h2><p>Watch for the moment the speaker changes the comparison place. Pause and ask: <strong>What are we comparing the object with now?</strong></p><a href="https://www.youtube.com/watch?v=Hz9MqliHG5U" target="_blank" rel="noreferrer">Open this video on YouTube ↗</a></div>
    <div className="motion-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/Hz9MqliHG5U" title="Reference point: position and motion" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe><small>If video playback is blocked at school, the Motion Replay Lab above teaches the same idea without leaving this page.</small></div>
  </section>;
}

function ForceArrowLessonLab() {
  const scenarios=[
    {title:"Hand pushes box",label:"push from hand",direction:"right",size:3,detail:"The arrow begins on the box and points right—the direction of the push."},
    {title:"Earth pulls ball",label:"gravity from Earth",direction:"down",size:2,detail:"Gravity points downward toward Earth, even if the ball is moving sideways."},
    {title:"Floor slows puck",label:"friction from floor",direction:"left",size:2,detail:"The puck moves right, but friction points left because it opposes sliding."},
    {title:"Table holds book",label:"support from table",direction:"up",size:2,detail:"The table pushes upward on the book while they touch."},
  ];
  const [scenario,setScenario]=useState(0);const [revealed,setRevealed]=useState(false);const item=scenarios[scenario];
  return <section className="digital-lab arrow-teaching-lab"><header><div><span>BUILD ONE ARROW AT A TIME</span><strong>{item.title}</strong></div><button onClick={()=>setRevealed(false)}>Hide answer</button></header><div className="force-bank"><b>POSSIBLE FORCES</b>{forceBank.map(item=><span key={item[0]}><strong>{item[0]}</strong><small>{item[1]}</small></span>)}</div><div className="scenario-tabs">{scenarios.map((choice,index)=><button key={choice.title} className={scenario===index?"selected":""} onClick={()=>{setScenario(index);setRevealed(false)}}>{choice.title}</button>)}</div><div className="single-arrow-stage"><span className="lab-object">OBJECT</span>{revealed?<span className={`single-force-arrow ${item.direction} size-${item.size}`}><i></i><b>{item.label}</b></span>:<div className="arrow-question"><b>Predict before revealing</b><p>Which force acts on the object? Where should the arrow begin, point, and end?</p><button onClick={()=>setRevealed(true)}>Reveal and explain</button></div>}</div>{revealed&&<div className="lab-conclusion"><b>WHY THIS MODEL FITS</b><p>{item.detail} The label names both the force and its source.</p></div>}</section>;
}

function ForceChoiceLab({lesson}:{lesson:ScienceLesson}) {
  const multipleForces=lesson.id==="gravity-friction";
  const scenarios=multipleForces?[
    {title:"Falling paper",story:"A sheet is falling downward through the air.",answer:["GRAVITY","AIR RESISTANCE"],why:"Gravity from Earth acts downward; air resistance acts upward, opposite the fall."},
    {title:"Sliding box",story:"A box slides right across carpet and slows.",answer:["GRAVITY","SUPPORT","FRICTION"],why:"Gravity and support balance vertically. Friction points left and changes the horizontal motion."},
    {title:"Resting book",story:"A book remains still on a table.",answer:["GRAVITY","SUPPORT"],why:"Gravity downward and support upward are equal and balanced."},
  ]:[
    {title:"Kick a ball",story:"A foot touches a ball and it speeds up to the right. Name the force causing that rightward change.",answer:["PUSH"],why:"The foot pushes on the ball. This is the horizontal force highlighted by the model; gravity may also act downward."},
    {title:"Pull a wagon",story:"A child uses a handle to bring a wagon closer. Name the force causing that motion toward the child.",answer:["PULL"],why:"The handle pulls the wagon toward the child. Other vertical forces exist, but the pull causes the horizontal motion change shown."},
    {title:"Drop an apple",story:"An unsupported apple speeds up downward. Name the main force causing that downward change.",answer:["GRAVITY"],why:"Earth pulls the apple downward through gravity. A later model can add air resistance when it matters."},
  ];
  const [scene,setScene]=useState(0);const [chosen,setChosen]=useState<string[]>([]);const [checked,setChecked]=useState(false);const item=scenarios[scene];
  const choose=(force:string)=>{setChecked(false);setChosen(items=>items.includes(force)?items.filter(x=>x!==force):[...items,force])};
  const correct=checked&&chosen.length===item.answer.length&&chosen.every(x=>item.answer.includes(x));
  return <section className="digital-lab force-choice-lab"><header><div><span>IDENTIFY THE FORCE · ALL OPTIONS PROVIDED</span><strong>{item.title}</strong></div><button onClick={()=>{setChosen([]);setChecked(false)}}>Clear</button></header><div className="scenario-tabs">{scenarios.map((choice,index)=><button key={choice.title} className={scene===index?"selected":""} onClick={()=>{setScene(index);setChosen([]);setChecked(false)}}>{choice.title}</button>)}</div><div className="force-scene"><div><span>WHAT HAPPENS</span><p>{item.story}</p><b>{multipleForces?"Choose every important force acting on the named object.":"Choose the force responsible for the motion change named in the scenario."}</b></div><i className={`scene-object scene-${scene}`} key={`${scene}-${checked}`}>●</i></div><div className="force-bank selectable">{forceBank.map(force=><button key={force[0]} className={chosen.includes(force[0])?"selected":""} onClick={()=>choose(force[0])}><strong>{force[0]}</strong><small>{force[1]}</small></button>)}</div><button className="check-lab" disabled={!chosen.length} onClick={()=>setChecked(true)}>Check choices and explain</button>{checked&&<div className={`lab-conclusion ${correct?"correct":"incorrect"}`}><b>{correct?"✓ THE FORCE MODEL FITS":"RECONSIDER THE CHOICES"}</b><p>{item.why}</p><small>Correct force{item.answer.length>1?"s":""}: {item.answer.join(" + ")}</small></div>}</section>;
}

function MotionMechanismLab({lesson}:{lesson:ScienceLesson}) {
  const [run,setRun]=useState(0);const [level,setLevel]=useState(2);const [mass,setMass]=useState(1);const [revealed,setRevealed]=useState(false);const [choice,setChoice]=useState<number|null>(null);
  if(lesson.id==="motion-basics") return <MotionReplayLab/>;
  if(lesson.id==="force-mass-acceleration"){
    const acceleration=level/mass;const distance=Math.round(24+acceleration*28);
    return <section className="digital-lab variable-lab"><header><div><span>CHANGE ONE VARIABLE · RUN AGAIN</span><strong>Force, mass, and acceleration</strong></div><button onClick={()=>{setLevel(2);setMass(1);setRun(0)}}>↻ Reset</button></header><div className="variable-controls"><label><b>NET FORCE</b><span>{[1,2,3].map(value=><button key={value} className={level===value?"selected":""} onClick={()=>{setLevel(value);setRevealed(false)}}>{["gentle","medium","strong"][value-1]}</button>)}</span></label><label><b>CART MASS</b><span>{[1,2,3].map(value=><button key={value} className={mass===value?"selected":""} onClick={()=>{setMass(value);setRevealed(false)}}>{value} block{value>1?"s":""}</button>)}</span></label></div><div className="variable-scene"><span className="start-line">START</span><i className="variable-cart" key={run} style={{"--travel":`${distance}%`,"--duration":`${Math.max(.7,1.9-acceleration/2)}s`} as React.CSSProperties}>▣<b>{mass}</b></i></div><div className="prediction-row"><p><b>Predict:</b> With this force and mass, will acceleration be small, medium, or large?</p><button onClick={()=>{setRun(value=>value+1);setRevealed(true)}}>Run trial</button></div>{revealed&&<div className="lab-conclusion"><b>OBSERVATION</b><p>Acceleration is {acceleration>=2?"large":acceleration>=1?"medium":"small"}. {level===3?"The stronger force increases acceleration.":"Keep mass the same and increase force to compare."} {mass>1?"The added mass reduces the acceleration made by the same force.":"Add mass while keeping force fixed to test mass fairly."}</p></div>}</section>;
  }
  if(lesson.id==="inertia"||lesson.id==="motion-change"){
    return <section className="digital-lab inertia-lab"><header><div><span>PREDICT · PLAY · EXPLAIN</span><strong>What happens when the bus brakes?</strong></div><button onClick={()=>{setRun(value=>value+1);setRevealed(false);setChoice(null)}}>↻ Replay</button></header><div className="prediction-options"><b>Before playing, choose a prediction</b>{["Passenger moves backward","Passenger continues forward","Passenger instantly stops with the bus"].map((item,index)=><button key={item} className={choice===index?"selected":""} onClick={()=>{setChoice(index);setRevealed(false)}}>{item}</button>)}<button className="play" disabled={choice===null} onClick={()=>{setRun(value=>value+1);setRevealed(true)}}>▶ Play braking sequence</button></div><div className="inertia-scene" key={run}><span className="road"></span><div className="demo-bus"><i className="passenger">●</i><b>BUS</b></div><span className="brake-mark">BRAKE!</span></div>{revealed&&<div className={`lab-conclusion ${choice===1?"correct":"incorrect"}`}><b>{choice===1?"✓ PREDICTION MATCHED":"COMPARE YOUR PREDICTION"}</b><p>The bus slows because the road and brakes exert a net backward force on it. The passenger’s body continues forward due to inertia until the seat belt or seat provides a force that changes the passenger’s motion.</p></div>}</section>;
  }
  if(lesson.id==="action-reaction"){
    return <section className="digital-lab rocket-lab"><header><div><span>TWO OBJECTS · TWO FORCES</span><strong>Rocket and exhaust gas</strong></div><button onClick={()=>{setRun(value=>value+1);setRevealed(false);setChoice(null)}}>↻ Replay</button></header><div className="prediction-options"><b>What does the rocket push?</b>{["The empty space ahead","The exhaust gas backward","Gravity upward"].map((item,index)=><button key={item} className={choice===index?"selected":""} onClick={()=>{setChoice(index);setRevealed(false)}}>{item}</button>)}<button className="play" disabled={choice===null} onClick={()=>{setRun(value=>value+1);setRevealed(true)}}>▶ Launch and reveal pair</button></div><div className="rocket-scene" key={run}><span className="exhaust">••••</span><i>▲</i><span className="rocket-arrow gas">← rocket pushes gas</span><span className="rocket-arrow craft">gas pushes rocket →</span></div>{revealed&&<div className={`lab-conclusion ${choice===1?"correct":"incorrect"}`}><b>{choice===1?"✓ PREDICTION MATCHED":"COMPARE YOUR PREDICTION"}</b><p>The rocket pushes exhaust gas backward. At the same time, the gas pushes the rocket forward with an equal force. The forces act on different objects, so they do not cancel.</p></div>}</section>;
  }
  if(lesson.id==="motion-design"){
    const impact=[92,58,31][level-1];
    return <section className="digital-lab impact-lab"><header><div><span>DESIGN · TEST · IMPROVE</span><strong>How does padding change impact?</strong></div><button onClick={()=>setRun(value=>value+1)}>↻ Run again</button></header><div className="variable-controls"><label><b>PADDING</b><span>{[1,2,3].map(value=><button key={value} className={level===value?"selected":""} onClick={()=>{setLevel(value);setRevealed(false)}}>{["thin","medium","thick"][value-1]}</button>)}</span></label></div><div className="impact-scene" key={`${run}-${level}`}><i className="drop-object">●</i><span className={`padding level-${level}`}></span><div><b>IMPACT METER</b><i style={{width:`${impact}%`}}></i></div></div><div className="prediction-row"><p><b>Hypothesis:</b> If padding is thicker, impact will be smaller because the object stops over more time.</p><button onClick={()=>{setRun(value=>value+1);setRevealed(true)}}>Test design</button></div>{revealed&&<div className="lab-conclusion"><b>RESULT · IMPACT {impact}/100</b><p>Thicker compressible padding increases stopping time and reduces the size of the force. Repeat equal drops before claiming the design is safer.</p></div>}</section>;
  }
  const modes=[{name:"constant speed",result:"Position changes by equal amounts each second. Speed and direction stay the same, so acceleration is zero."},{name:"speeding up",result:"Position changes by larger amounts each second. Speed changes, so the object accelerates."},{name:"turning",result:"Direction changes. Even if speed is constant, the object accelerates."}];
  return <section className="digital-lab motion-lab"><header><div><span>REFERENCE POINT · SPEED · DIRECTION</span><strong>Describe motion precisely</strong></div><button onClick={()=>{setRun(value=>value+1);setRevealed(false)}}>↻ Replay</button></header><div className="scenario-tabs">{modes.map((item,index)=><button key={item.name} className={level===index?"selected":""} onClick={()=>{setLevel(index);setRevealed(false)}}>{item.name}</button>)}</div><div className={`motion-scene mode-${level}`} key={`${run}-${level}`}><span className="reference-marker">REFERENCE POINT</span><i>●</i><span className="motion-path"></span></div><div className="prediction-row"><p>Describe what changes compared with the reference point. Is there acceleration?</p><button onClick={()=>setRevealed(true)}>Reveal explanation</button></div>{revealed&&<div className="lab-conclusion"><b>PRECISE DESCRIPTION</b><p>{modes[level].result}</p></div>}</section>;
}

function LessonConceptDemo({ lesson, unit }: { lesson: ScienceLesson; unit: (typeof scienceUnits)[number] }) {
  const [run, setRun] = useState(0);
  const [leftForce, setLeftForce] = useState(1);
  const [rightForce, setRightForce] = useState(2);
  const arrowLesson = lesson.id === "balanced-unbalanced";
  const net = rightForce - leftForce;

  if(lesson.id==="inquiry-toolkit") return <InquiryToolkitLab/>;
  if(lesson.id==="force-arrows") return <ForceArrowLessonLab/>;
  if(lesson.id==="forces-intro"||lesson.id==="gravity-friction") return <ForceChoiceLab lesson={lesson}/>;
  if(unit.id==="forces-motion"&&lesson.id!=="balanced-unbalanced") return <MotionMechanismLab lesson={lesson}/>;

  if (arrowLesson) return <div className="arrow-lab">
    <div className="concept-demo-toolbar"><span>INTERACTIVE FORCE-ARROW BUILDER</span><button onClick={() => { setLeftForce(1); setRightForce(2); }}>↻ Reset</button></div>
    <div className="arrow-stage" aria-live="polite">
      <div className="force-arrow left" style={{ "--arrow-size": `${48 + leftForce * 42}px` } as React.CSSProperties}><b>←</b><span>{leftForce} force units left · pull from left rope</span></div>
      <div className={`arrow-object ${net < 0 ? "move-left" : net > 0 ? "move-right" : "stay"}`} key={`${leftForce}-${rightForce}`}>BOX</div>
      <div className="force-arrow right" style={{ "--arrow-size": `${48 + rightForce * 42}px` } as React.CSSProperties}><b>→</b><span>{rightForce} force units right · pull from right rope</span></div>
    </div>
    <div className="arrow-controls"><label>LEFT FORCE <span><button onClick={() => setLeftForce(Math.max(0, leftForce - 1))}>−</button><b>{leftForce}</b><button onClick={() => setLeftForce(Math.min(3, leftForce + 1))}>＋</button></span></label><label>RIGHT FORCE <span><button onClick={() => setRightForce(Math.max(0, rightForce - 1))}>−</button><b>{rightForce}</b><button onClick={() => setRightForce(Math.min(3, rightForce + 1))}>＋</button></span></label></div>
    <div className="arrow-result"><b>{net === 0 ? "BALANCED" : "UNBALANCED"}</b><span>{net === 0 ? "Equal opposite forces give net force = 0. The box stays still or keeps the same velocity." : `Subtract the smaller opposite force: net force = ${Math.abs(net)} unit${Math.abs(net)===1?"":"s"} ${net > 0 ? "right" : "left"}. The box accelerates that way.`}</span></div>
    <div className="arrow-rules"><span><b>1</b> Start on the object</span><span><b>2</b> Point in the force direction</span><span><b>3</b> Longer means relatively larger</span><span><b>4</b> Label the force</span></div>
  </div>;

  const demoCopy: Record<string, string> = {
    "body-systems": "Follow the signal as connected parts pass information and create a response.",
    mixtures: "Watch components move differently when a property is used to separate them.",
    "forces-motion": "Replay the motion, then name the force and the change it causes.",
    "earth-space": "Follow the moving body and notice how viewpoint changes the pattern.",
  };
  return <div className={`concept-demo demo-${unit.id}`}>
    <div className="concept-demo-toolbar"><span>LIVE CONCEPT MODEL</span><button onClick={() => setRun(value => value + 1)}>↻ Replay</button></div>
    <div className="concept-demo-scene" key={run}><span className="demo-path"></span><i className="demo-centre">{unit.icon}</i><i className="demo-mover">●</i><i className="demo-pulse one"></i><i className="demo-pulse two"></i></div>
    <div className="concept-demo-caption"><b>WATCH FOR</b><span>{demoCopy[unit.id]}</span></div>
  </div>;
}

// Retained temporarily so the earlier prototype can be compared during the migration.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ScienceLessonPlayer({ lesson, mode, onMode, onHome, onUnitStart, onOpenLesson }: { lesson: ScienceLesson; mode: "teacher" | "projector"; onMode: (mode: "teacher" | "projector") => void; onHome: () => void; onUnitStart: () => void; onOpenLesson: (lesson: ScienceLesson) => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [checks, setChecks] = useState<number[]>([]);
  const [briefOpen, setBriefOpen] = useState(false);
  const unit = scienceUnits.find(item => item.lessons.some(candidate => candidate.id === lesson.id)) ?? scienceUnits[0];
  const lessonIndex = unit.lessons.findIndex(candidate => candidate.id === lesson.id);
  const previousLesson = lessonIndex > 0 ? unit.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < unit.lessons.length - 1 ? unit.lessons[lessonIndex + 1] : null;
  const current = programStepLabels[step];
  const hasRichTeaching = Boolean(teachingPacks[lesson.id]);
  const hasDigitalInquiry = unit.id === "forces-motion" || lesson.id === "inquiry-toolkit";
  const motionBasics = lesson.id === "motion-basics";
  const toggleCheck = (index: number) => setChecks(value => value.includes(index) ? value.filter(item => item !== index) : [...value, index]);

  useEffect(() => {
    const keys = (event: KeyboardEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("input, textarea, select, button, a, summary, [contenteditable='true'], [role='slider']")) return;
      if (event.key === "ArrowRight") setStep(value => Math.min(value + 1, 9));
      if (event.key === "ArrowLeft") setStep(value => Math.max(value - 1, 0));
    };
    window.addEventListener("keydown", keys); return () => window.removeEventListener("keydown", keys);
  }, []);

  useEffect(() => {
    document.querySelector(".lesson-stage")?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const renderStep = () => {
    if (step === 0) return <><p className="stage-kicker">WATCH · CHOOSE · EXPLAIN</p><h1>{lesson.question}</h1>{motionBasics?<MotionMystery/>:<><div className="program-hook"><span>{unit.icon}</span><div><small>BEGIN WITH THE PHENOMENON</small><strong>{lesson.hook}</strong></div></div><div className="program-choice-row">{["I notice…", "I predict… because…", "I wonder…"].map((item,index)=><button key={item} className={selected===index?"selected":""} onClick={()=>setSelected(index)}><span>{index+1}</span><strong>{item}</strong></button>)}</div></>}<div className="student-talk-prompt"><span>PAIR TALK</span><p>{motionBasics?"Give both answers. What did you compare Maya with each time?":"Share your first thinking. You are allowed to change your mind."}</p></div></>;
    if (step === 1) return <><p className="stage-kicker">OUR LEARNING</p><h1>{lesson.learning}</h1>{lesson.priorKnowledge&&<div className="prior-knowledge"><b>FIRST, MAKE SURE WE REMEMBER</b>{lesson.priorKnowledge.map(item=><span key={item}>✓ {item}</span>)}</div>}<p className="stage-prompt">Choose the success criterion that will stretch your thinking today.</p><div className="success-targets">{lesson.success.map((item,index)=><button key={item} className={selected===index?"selected":""} onClick={()=>setSelected(index)}><span>{selected===index?"✓":index+1}</span><strong>{item}</strong><small>{selected===index?"MY FOCUS":"CHOOSE"}</small></button>)}</div></>;
    if (step === 2) return <><p className="stage-kicker">TEACH · WATCH · TRY · EXPLAIN</p><h1>{motionBasics?"Solve three motion mysteries, one idea at a time.":"Build the idea one piece at a time."}</h1><ExplanationLadder lesson={lesson}/><LessonConceptDemo lesson={lesson} unit={unit}/>{motionBasics&&<MotionVideoSpotlight/>}<div className="vocab-intro"><span>WORDS WE NEED</span><p>{motionBasics?"The everyday idea comes first. Select a word only after you can point to it in a replay.":"Select each word to see a plain-language example. Use the words only after the idea makes sense."}</p></div><div className="vocab-teaching-grid">{lesson.vocabulary.map((word,index)=>{const help=vocabularyHelp(lesson,word);return <button key={word} className={selected===index?"selected":""} onClick={()=>setSelected(index)}><span>WORD {index+1}</span><strong>{word}</strong><p>{help.meaning}</p><small>{selected===index?`EXAMPLE · ${help.example}`:"SELECT FOR AN EXAMPLE"}</small></button>})}</div><WorkedExamples lesson={lesson}/><div className="program-teach-prompt"><span>SAY IT SIMPLY</span><p>{motionBasics?"The ___ moved from ___ to ___. I compared it with ___. It moved ___.":<>Use an example to explain how <b>{lesson.vocabulary[selected] ?? lesson.vocabulary[0]}</b> helps answer today&apos;s question.</>}</p></div></>;
    if (step === 3) return motionBasics?<><p className="stage-kicker">TALK LIKE A MOTION DETECTIVE</p><h1>Can two different motion descriptions both be correct?</h1><div className="motion-talk-cards">{[["1","NAME IT","What object are we describing?"],["2","COMPARE IT","What place are we comparing it with?"],["3","TRACE IT","Where did it start and end?"],["4","DESCRIBE IT","Steady, faster, slower, stopped, or turned?"]].map((item,index)=><button key={item[1]} className={selected===index?"selected":""} onClick={()=>setSelected(index)}><span>{item[0]}</span><small>{item[1]}</small><strong>{item[2]}</strong></button>)}</div><div className="motion-debate"><span>MINI DEBATE</span><p>“A student riding an escalator is standing still.” Agree, disagree, or say <b>it depends</b>. Name the comparison place that makes your answer true.</p></div></>:<><p className="stage-kicker">DISCUSS · CHALLENGE · REVISE</p><h1>What claim can your group support right now?</h1><div className="program-discussion"><blockquote>“{lesson.question}”</blockquote><div>{[["CLAIM","Say what you think"],["EVIDENCE","Point to an observation"],["REASONING","Connect the evidence"],["REVISION","Improve the claim"]].map((item,index)=><button key={item[0]} className={selected===index?"selected":""} onClick={()=>setSelected(index)}><span>{index+1}</span><strong>{item[0]}</strong><small>{item[1]}</small></button>)}</div></div><div className="cer-strip"><span>LISTEN FOR</span><p>“My evidence is…” · “I see it differently because…” · “I want to revise…”</p></div></>;
    if (step === 4) return <><p className="stage-kicker">WE DO · WORKED EXAMPLES</p><h1>Reason through cases with support.</h1><div className="program-guided"><span>{unit.icon}</span><div><small>TEACHER MODELS THE THINKING</small><strong>{lesson.guided}</strong>{revealed?<p><b>THINKING PATH</b> 1. Name the object or question. 2. Describe only the evidence. 3. Choose the scientific idea. 4. Explain exactly how the evidence connects. 5. Check whether another explanation fits better.</p>:<button onClick={()=>setRevealed(true)}>Reveal the five reasoning steps</button>}</div></div>{hasRichTeaching&&<WorkedExamples lesson={lesson}/>}<div className="program-stems">{["The object or question is…","I observe…","The idea that fits is…","It fits because…"].map(item=><span key={item}>{item}</span>)}</div></>;
    if (step === 5) return <><p className="stage-kicker">YOU TRY · FEEDBACK INCLUDED</p><h1>Apply the idea independently, then read why.</h1>{hasRichTeaching?<ChoiceChallenge lesson={lesson}/>:<><div className="program-independent">{[["01","OBSERVE","Record only what the evidence shows."],["02","EXPLAIN",`Use ${lesson.vocabulary.slice(0,2).join(" and ")} accurately.`],["03","CHALLENGE","Name a limit, alternative, or next test."]].map((item,index)=><button key={item[1]} className={selected===index?"selected":""} onClick={()=>setSelected(index)}><span>{item[0]}</span><small>{item[1]}</small><strong>{item[2]}</strong><b>{selected===index?"WORK HERE ✓":"CHOOSE →"}</b></button>)}</div><div className="program-paper-prompt"><span>YOUR RESPONSE</span><p>Answer today&apos;s question with one claim and at least one piece of evidence.</p></div></>}</>;
    if (step === 6) return <><p className="stage-kicker">{motionBasics?"REPLAY · DESCRIBE · CHECK":"INQUIRY · HYPOTHESIS · EVIDENCE"}</p><h1>{lesson.inquiry}</h1>{hasDigitalInquiry&&<><div className="no-materials-banner"><span>ON-SCREEN INVESTIGATION</span><strong>No materials are required for the core investigation.</strong><p>{motionBasics?"Students choose before each replay, watch again, then improve a motion description using what they can actually see.":"Students make an educated hypothesis, change one variable, run or compare trials, and explain the evidence. Physical testing is an optional extension."}</p></div><LessonConceptDemo lesson={lesson} unit={unit}/></>}{motionBasics?<div className="motion-description-builder"><p>BUILD ONE COMPLETE DESCRIPTION</p>{["Name the object","Choose a comparison place","Say where it started and ended","Describe the direction","Say steady, faster, slower, stopped, or turned","Point to visual evidence"].map((item,index)=><button key={item} className={checks.includes(index)?"checked":""} onClick={()=>toggleCheck(index)}><span>{checks.includes(index)?"✓":index+1}</span><strong>{item}</strong></button>)}</div>:<div className="program-inquiry"><div><p>SCIENTIFIC-METHOD SCAFFOLD</p>{["Question compares something testable","Hypothesis predicts and gives a because reason","Changed and measured variables are named","Important conditions stay the same","At least three trials are compared","Conclusion uses evidence and revises the hypothesis if needed"].map((item,index)=><button key={item} className={checks.includes(index)?"checked":""} onClick={()=>toggleCheck(index)}><span>{checks.includes(index)?"✓":index+1}</span><strong>{item}</strong></button>)}</div><aside><span>{hasDigitalInquiry?"READY ON SCREEN":"SAFE · FAIR · CURIOUS"}</span><h2>{checks.length} of 6 ready</h2><p>{hasDigitalInquiry?"Use the embedded model first. Ask students to state what the model shows and one limitation before extending with physical materials.":"Pause before testing. Make sure everyone has a role and the materials are being used safely."}</p><div>{(hasDigitalInquiry?["Educated hypothesis","One changed variable","Repeated trials","Evidence-based conclusion"]:lesson.materials.slice(0,4)).map(item=><small key={item}>• {item}</small>)}</div></aside></div>}</>;
    if (step === 7) return <><p className="stage-kicker">REFLECT · REVISE · CONNECT</p><h1>{lesson.reflection}</h1><div className="reflection-choices">{(motionBasics?[["compare","The comparison place matters","It can change whether we describe something as moving."],["replay","The replay gave me evidence","I used position, gaps, or a path to describe motion."],["question","I have a new motion question","Now I wonder what caused the motion to change."]]:[["revised","I revised my idea","Evidence changed what I thought."],["deepened","I deepened my idea","I can now explain how or why."],["question","I have a stronger question","The inquiry opened a new path."]]).map((item,index)=><button key={item[0]} className={selected===index?"selected":""} onClick={()=>setSelected(index)}><span>{selected===index?"✓":"↗"}</span><strong>{item[1]}</strong><small>{item[2]}</small></button>)}</div><div className="reflection-stem"><span>SHARE</span><p>{motionBasics?"“At first I thought… The bus / skateboard / ball replay showed… Now I think…”":"“I used to think… Now I think… My evidence is…”"}</p></div></>;
    if (step === 8) return <><p className="stage-kicker">EXIT TICKET · INDEPENDENT EVIDENCE</p><h1>{lesson.exit}</h1><div className="program-exit-modes">{[["✎","WRITE","3–5 clear sentences"],["▦","SKETCH","Label a scientific model"],["◉","EXPLAIN","Record or tell your reasoning"]].map((item,index)=><button key={item[1]} className={selected===index?"selected":""} onClick={()=>setSelected(index)}><span>{item[0]}</span><small>{item[1]}</small><strong>{item[2]}</strong><b>{selected===index?"CHOSEN ✓":"CHOOSE"}</b></button>)}</div><div className="exit-result"><span>Include</span><p>one accurate idea · one piece of evidence · one scientific word used meaningfully</p></div></>;
    return <><p className="stage-kicker">TRANSFER · CREATE · CONTRIBUTE</p><h1>{motionBasics?"Where do you see interesting motion outside this lesson?":"Where could this learning matter beyond today&apos;s lesson?"}</h1><div className="extension-grid">{(motionBasics?[["▶","SPORTS REPLAY ANALYST","Pause a sports clip and describe one player’s motion from a clear comparison point."],["⌖","TRANSIT TRACKER","Sketch how a bus, SkyTrain, cyclist, or walker changes position along a familiar route."],["◆","GAME DESIGNER","Plan a game movement that is steady, speeds up, slows down, and turns."]]:[["◎","PLACE CONNECTOR","Find an example in the school, neighbourhood, land, or water."],["◇","SOLUTION DESIGNER","Use the science to improve a system, product, or decision."],["✦","SCIENCE COMMUNICATOR","Teach the idea through a model, story, demonstration, or media piece."]]).map((item,index)=><button key={item[1]} className={selected===index?"selected":""} onClick={()=>setSelected(index)}><span>{item[0]}</span><small>{item[1]}</small><strong>{item[2]}</strong><b>{selected===index?"CHOSEN ✓":"CHOOSE →"}</b></button>)}</div><div className="closing-line">Notice it <span>•</span> Describe it <span>•</span> Explain it <span>•</span> Share it</div></>;
  };

  const teacherMoves = [
    "Protect uncertainty. Collect predictions before introducing vocabulary or confirming an explanation.",
    "Read the intention aloud and have students paraphrase it. Invite a personal success focus.",
    "Build meaning through examples and student language before formalizing scientific terms.",
    "Give quiet think time first. Ask for evidence, counterexamples, and respectful revisions.",
    "Model one reasoning move at a time; reveal the checklist only after partner thinking.",
    "Students respond independently before comparing. Confer with learners who need an oral or visual pathway.",
    "Approve the safety and fairness plan before materials move. Keep the changed and measured variables visible.",
    "Return to the launch prediction. Treat revision as evidence of learning rather than error.",
    "Collect this independently and sort responses into ready, developing, and revisit for next-step planning.",
    "Offer authentic choice without requiring a single product format. Look for accurate transfer, not decoration.",
  ];

  return <div className={`lesson-page model-lesson generic-science-lesson ${mode === "projector" ? "lesson-projector" : "lesson-teacher"}`} style={{"--unit":unit.color,"--unit-soft":unit.soft} as React.CSSProperties}>
    <div className="lesson-toolbar"><div className="lesson-location"><button onClick={onHome}>⌂ <span>Home</span></button><button onClick={onUnitStart}>← <span>Unit start</span></button></div><div><span className="lesson-subject-dot" style={{background:unit.color}}></span><b>SCIENCE 6 · UNIT {unit.number} · LESSON {lessonIndex+1}</b><i>{lesson.title}</i></div><span className="lesson-toolbar-right">{mode === "projector"&&<strong className="student-live-badge">PROJECTOR VIEW</strong>}<b>{step+1} of 10</b>{mode==="teacher"&&<button onClick={()=>setBriefOpen(true)}>Lesson brief</button>}<button className="view-switch" onClick={()=>onMode(mode==="teacher"?"projector":"teacher")}>{mode==="teacher"?"▰ Project lesson":"◉ Return to plan view"}</button></span></div>
    <div className="lesson-layout"><aside className="lesson-rail"><p>LESSON FLOW</p>{programStepLabels.map((item,index)=><button key={item[0]} className={step===index?"active":step>index?"done":""} onClick={()=>{setStep(index);setSelected(0);setRevealed(false)}}><span>{step>index?"✓":String(index+1).padStart(2,"0")}</span><div><b>{item[0]}</b><small>{item[1]}</small></div></button>)}</aside><section className="lesson-stage" aria-label={`${lesson.title} lesson stage`}><div className="stage-count">{String(step+1).padStart(2,"0")}</div><div className="stage-inner">{mode==="projector"&&<section className="lesson-experience-ribbon" aria-label="How this lesson works"><span>1 · WONDER</span><span>2 · CHOOSE</span><span>3 · TRY</span><span>4 · EXPLAIN</span><strong>Learning should feel alive.</strong></section>}{renderStep()}<div className="stage-navigation"><button disabled={step===0} onClick={()=>{setStep(step-1);setSelected(0);setRevealed(false)}}>← Previous</button><span>{programStepLabels.map((_,index)=><i key={index} className={step===index?"active":""}></i>)}</span><button disabled={step===9} onClick={()=>{setStep(step+1);setSelected(0);setRevealed(false)}}>Next <b>→</b></button></div></div></section>{mode==="teacher"&&<aside className="teacher-panel"><div className="teacher-panel-title"><span>◉</span><div><b>Teacher view</b><small>Hidden from students</small></div></div><section><p>STEP {String(step+1).padStart(2,"0")} · {lesson.duration.toUpperCase()}</p><h3>{current[0]}</h3></section><section><p>TEACHER MOVE</p><div className="note-card">{teacherMoves[step]}</div></section><section><p>LOOK &amp; LISTEN FOR</p><div className="note-card look-card">{step===6?"A clear question, safe plan, one changed variable when appropriate, consistent evidence, and an honest evaluation.":lesson.evidence}</div></section><section><p>COMMON MISCONCEPTION</p><div className="note-card">{lesson.misconception}</div></section><section><p>ASSESSMENT EVIDENCE</p><div className="evidence-chip">✓ {lesson.evidence}</div></section><button className="full-brief-button" onClick={()=>setBriefOpen(true)}>Open full lesson brief <span>→</span></button></aside>}</div>
    <div className="lesson-sequence-nav"><button disabled={!previousLesson} onClick={()=>previousLesson&&onOpenLesson(previousLesson)}>← {previousLesson?previousLesson.title:"Start of unit"}</button><button onClick={onUnitStart}>Unit {unit.number} overview</button><button disabled={!nextLesson} onClick={()=>nextLesson&&onOpenLesson(nextLesson)}>{nextLesson?nextLesson.title:"End of unit"} →</button></div>
    {briefOpen&&<ScienceLessonBrief lesson={lesson} unit={unit} onClose={()=>setBriefOpen(false)}/>}</div>;
}

function ScienceLessonBrief({ lesson, unit, onClose }: { lesson: ScienceLesson; unit: (typeof scienceUnits)[number]; onClose: () => void }) {
  return <div className="brief-overlay" role="dialog" aria-modal="true" aria-label="Full lesson brief"><button className="brief-scrim" aria-label="Close lesson brief" onClick={onClose}></button><aside className="brief-drawer"><header><div><p className="section-kicker">TEACHER-ONLY LESSON BRIEF</p><h2>{lesson.title}</h2><span>Science 6 · Unit {unit.number} · {lesson.duration}</span></div><button onClick={onClose} aria-label="Close">×</button></header><section><p>BC CURRICULUM ALIGNMENT</p><div className="brief-callout"><b>Big Idea</b><span>{unit.bigIdea}</span></div><ul>{unit.content.map(item=><li key={item}>{item}</li>)}</ul><div className="brief-tags"><span>Question &amp; predict</span><span>Plan &amp; conduct</span><span>Analyze evidence</span><span>Evaluate</span><span>Communicate</span></div></section><section><p>LEARNING INTENTION</p><h3>{lesson.learning}</h3></section>{lesson.priorKnowledge&&<section><p>PREREQUISITE CHECK</p><ul>{lesson.priorKnowledge.map(item=><li key={item}>{item}</li>)}</ul><p className="brief-body">Revisit these ideas before advancing if students cannot explain them with a simple example.</p></section>}<section><p>SUCCESS CRITERIA</p><ul>{lesson.success.map(item=><li key={item}>{item}</li>)}</ul></section><section><p>VOCABULARY IN STUDENT-FRIENDLY LANGUAGE</p><ul>{lesson.vocabulary.map(word=>{const help=vocabularyHelp(lesson,word);return <li key={word}><b>{word}:</b> {help.meaning} <i>Example: {help.example}</i></li>})}</ul></section><section><p>MATERIALS &amp; PREPARATION</p><ul>{lesson.materials.map(item=><li key={item}>{item}</li>)}</ul><div className="brief-callout safety"><b>Prepare</b><span>Preview the inquiry for safety, accessibility, cultural context, and material cleanup. Offer oral, visual, physical, and written participation routes.</span></div></section><section><p>LESSON FLOW</p><ol>{programStepLabels.map((item,index)=><li key={item[0]}><b>{item[0]}:</b> {index===0?lesson.hook:index===4?lesson.guided:index===6?lesson.inquiry:index===7?lesson.reflection:index===8?lesson.exit:item[1]}</li>)}</ol></section><section><p>COMMON MISCONCEPTION</p><p className="brief-body">{lesson.misconception}</p></section><section><p>DIFFERENTIATION</p><ul><li>Preteach the vocabulary with the on-screen definition, picture or animation, gesture, and concrete example.</li><li>Offer sentence frames for claim–evidence–reasoning and allow oral, sketched, acted, or written responses.</li><li>Pause after each visual change and ask students to describe what changed before explaining why.</li><li>Assign flexible inquiry roles and provide a partially completed data organizer when needed.</li><li>Extend by asking students to critique model limits, sources of error, or social and environmental implications.</li></ul></section><section><p>ASSESSMENT PLAN</p><ul><li><b>Before:</b> use the prerequisite check and hook prediction to surface prior ideas.</li><li><b>During:</b> gather evidence from vocabulary use, animation observations, guided reasoning, independent application, and inquiry decisions.</li><li><b>After:</b> collect the exit response and compare it with the opening prediction.</li></ul><div className="brief-callout"><b>Evidence</b><span>{lesson.evidence}</span></div></section><section><p>ANSWER &amp; FEEDBACK GUIDANCE</p><p className="brief-body">Strong responses answer the lesson question, use the scientific vocabulary accurately, cite a relevant observation or measured pattern, and acknowledge a limitation or next question. Avoid rewarding vocabulary alone when the causal connection is missing.</p></section></aside></div>;
}

function LessonTemplate({ mode, onMode, onHome, onUnitStart, onOpenLesson }: { mode: "teacher" | "projector"; onMode: (mode: "teacher" | "projector") => void; onHome: () => void; onUnitStart: () => void; onOpenLesson: (lesson: ScienceLesson) => void }) {
  const [step, setStep] = useState(0);
  const [busRun, setBusRun] = useState(0);
  const [prediction, setPrediction] = useState("");
  const [target, setTarget] = useState(0);
  const [force, setForce] = useState(1);
  const [cartRun, setCartRun] = useState(0);
  const [claim, setClaim] = useState(0);
  const [guidedIndex, setGuidedIndex] = useState(0);
  const [guidedReveal, setGuidedReveal] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [inquiryChecks, setInquiryChecks] = useState<number[]>([]);
  const [reflection, setReflection] = useState("");
  const [exitAnswers, setExitAnswers] = useState<Record<number, number>>({});
  const [extension, setExtension] = useState(0);
  const [briefOpen, setBriefOpen] = useState(false);
  const forceUnit = scienceUnits.find(unit => unit.id === "forces-motion")!;
  const flagshipIndex = forceUnit.lessons.findIndex(lesson => lesson.id === "motion-change");
  const previousLesson = forceUnit.lessons[flagshipIndex - 1];
  const nextLesson = forceUnit.lessons[flagshipIndex + 1];
  const current = lessonSteps[step];

  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("input, textarea, select, button, a, summary, [contenteditable='true'], [role='slider']")) return;
      if (event.key === "ArrowRight") setStep(value => Math.min(value + 1, lessonSteps.length - 1));
      if (event.key === "ArrowLeft") setStep(value => Math.max(value - 1, 0));
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, []);

  const runCartTrial = (level: number) => {
    setForce(level);
    setCartRun(value => value + 1);
  };

  const renderStep = () => {
    if (step === 0) return (
      <>
        <p className="stage-kicker">NOTICE · PREDICT · EXPLAIN</p>
        <h1>When a moving bus stops suddenly, why does your body keep moving?</h1>
        <div className="motion-demo-toolbar"><span>MOTION DEMO</span><button onClick={() => setBusRun(value => value + 1)}>↻ Replay bus stop</button></div>
        <div className="bus-scene" aria-label="Animation of a bus stopping while a passenger continues moving forward">
          <span key={`road-${busRun}`} className="road-lines demo-running"></span>
          <div key={`bus-${busRun}`} className="bus demo-running"><i></i><b>BUS</b><span className="passenger">●<em>↗</em></span></div>
          <strong key={`stop-${busRun}`} className="stop-signal demo-running">STOP!</strong>
        </div>
        <div className="prediction-row" role="group" aria-label="Choose your prediction">
          {["My body moves forward", "My body stays still", "My body moves backward"].map(item => <button key={item} className={prediction === item ? "selected" : ""} onClick={() => setPrediction(item)}>{prediction === item ? "✓ " : ""}{item}</button>)}
        </div>
        <div className="student-talk-prompt"><span>PAIR TALK</span><p>What has happened to you that supports your prediction?</p></div>
      </>
    );
    if (step === 1) return (
      <>
        <p className="stage-kicker">OUR LEARNING</p>
        <h1>We are learning how forces change motion.</h1>
        <div className="prior-knowledge"><b>FIRST, MAKE SURE WE REMEMBER</b><span>✓ Force arrows and net force</span><span>✓ Newton’s first, second, and third laws</span></div>
        <p className="stage-prompt">Choose one success target to focus on today.</p>
        <div className="success-targets">
          {["I can describe how a push or pull changes motion.", "I can use evidence to explain one of Newton’s laws.", "I can plan a fair test and notice a pattern."].map((item, index) => <button key={item} className={target === index ? "selected" : ""} onClick={() => setTarget(index)}><span>{target === index ? "✓" : index + 1}</span><strong>{item}</strong><small>{target === index ? "MY TARGET" : "CHOOSE"}</small></button>)}
        </div>
      </>
    );
    if (step === 2) return (
      <>
        <p className="stage-kicker">INTERACTIVE FORCE LAB</p>
        <h1>What pattern do you notice when the push changes?</h1>
        <div className="force-lab">
          <div className="force-controls"><p>Choose a push</p>{[1,2,3].map(level => <button key={level} className={force === level ? "selected" : ""} onClick={() => runCartTrial(level)}><span>{"→".repeat(level)}</span><b>{["Gentle","Medium","Strong"][level - 1]}</b></button>)}</div>
          <div className="cart-track" style={{ "--cart-end": `${[38, 59, 78][force - 1]}%`, "--cart-duration": `${[1.65, 1.25, .95][force - 1]}s` } as React.CSSProperties}>
            <span className="start-line">START</span>
            <span className="finish-marker" aria-live="polite">RESULT · {force * 2} m</span>
            <button className="cart-replay" onClick={() => setCartRun(value => value + 1)}>↻ Run again</button>
            <div key={cartRun} className="lab-cart cart-running"><i></i><b></b></div>
          </div>
          <div className="force-finding"><span>OUR OBSERVATION</span><strong>A {force === 1 ? "gentle" : force === 2 ? "medium" : "strong"} push causes a {force === 1 ? "small" : force === 2 ? "larger" : "much larger"} change in motion.</strong></div>
        </div>
        <div className="flagship-force-diagram"><span className="diagram-object">CART</span><span className={`diagram-arrow force-${force}`}>{"→".repeat(force)}</span><div><b>FORCE ARROW</b><small>Points in the push direction. More length means a relatively larger force.</small></div><strong>Motion changes to the right</strong></div>
        <div className="vocabulary-strip">{[["FORCE","a push or pull"],["MOTION","a change in position"],["INERTIA","resisting a change in motion"],["ACCELERATION","a change in speed or direction"]].map(item=><div key={item[0]}><b>{item[0]}</b><span>{item[1]}</span></div>)}</div>
      </>
    );
    if (step === 3) return (
      <>
        <p className="stage-kicker">THINK · CHOOSE · DEFEND</p>
        <h1>Which claim can your group support with the strongest evidence?</h1>
        <div className="claim-grid">{[
          ["A", "An object’s motion changes only when a force acts on it."],
          ["B", "A stronger force creates a greater change in motion."],
          ["C", "Forces always come in equal and opposite pairs."],
        ].map((item,index)=><button key={item[0]} className={claim===index?"selected":""} onClick={()=>setClaim(index)}><span>{item[0]}</span><strong>{item[1]}</strong><small>{claim===index?"YOUR GROUP’S CLAIM ✓":"CHOOSE THIS CLAIM"}</small></button>)}</div>
        <div className="cer-strip"><span>CLAIM</span><i>→</i><span>EVIDENCE</span><i>→</i><span>REASONING</span><p>Use an observation from the cart lab or an example from your life.</p></div>
      </>
    );
    if (step === 4) return (
      <>
        <p className="stage-kicker">GUIDED PRACTICE · CASE {guidedIndex + 1} OF 3</p>
        <h1>{guidedCases[guidedIndex].title}</h1>
        <div className="guided-case"><div className={`case-visual case-${guidedIndex}`}><span>{guidedIndex === 0 ? "↗" : guidedIndex === 1 ? "→" : "⇄"}</span></div><div><p>{guidedCases[guidedIndex].prompt}</p>{guidedReveal ? <div className="revealed-answer"><span>SCIENTIFIC REASONING</span><strong>{guidedCases[guidedIndex].answer}</strong></div> : <button className="reveal-button" onClick={() => setGuidedReveal(true)}>Reveal after partner talk</button>}</div></div>
        <div className="case-navigation"><button disabled={guidedIndex===0} onClick={()=>{setGuidedIndex(guidedIndex-1);setGuidedReveal(false)}}>← Previous case</button><span>{guidedCases.map((_,i)=><i className={i===guidedIndex?"active":""} key={i}></i>)}</span><button disabled={guidedIndex===guidedCases.length-1} onClick={()=>{setGuidedIndex(guidedIndex+1);setGuidedReveal(false)}}>Next case →</button></div>
      </>
    );
    if (step === 5) return (
      <>
        <p className="stage-kicker">INDEPENDENT PRACTICE</p>
        <h1>Which law best explains each motion?</h1>
        <div className="practice-grid">{practiceQuestions.map((item,index)=><article key={item.question}><span>{index+1}</span><h2>{item.question}</h2><div>{item.choices.map((choice,choiceIndex)=><button key={choice} className={practiceAnswers[index]===choiceIndex?(choiceIndex===item.answer?"correct":"incorrect"):""} onClick={()=>setPracticeAnswers({...practiceAnswers,[index]:choiceIndex})}>{choice}</button>)}</div>{practiceAnswers[index]!==undefined&&<p className={practiceAnswers[index]===item.answer?"right":"try-again"}>{practiceAnswers[index]===item.answer?"✓ Evidence fits":"Try again—look for the force and the change."}</p>}</article>)}</div>
      </>
    );
    if (step === 6) return (
      <>
        <p className="stage-kicker">TEAM INQUIRY · CART CHALLENGE</p>
        <h1>How does one change affect how far a cart travels?</h1>
        <div className="inquiry-layout"><div className="inquiry-question"><span>CHOOSE ONE VARIABLE TO CHANGE</span><div>{["Push strength","Cart mass","Surface type"].map((item,index)=><button className={inquiryChecks[0]===index?"selected":""} key={item} onClick={()=>setInquiryChecks([index,...inquiryChecks.slice(1)])}>{item}</button>)}</div><p>Measure: <strong>distance travelled</strong> · Repeat: <strong>3 trials</strong></p></div><div className="inquiry-steps">{["Predict using because","Keep other variables the same","Measure and record 3 trials","Find a pattern in your evidence","Explain and improve the test"].map((item,index)=><button key={item} className={inquiryChecks.includes(index+10)?"checked":""} onClick={()=>setInquiryChecks(inquiryChecks.includes(index+10)?inquiryChecks.filter(x=>x!==index+10):[...inquiryChecks,index+10])}><span>{inquiryChecks.includes(index+10)?"✓":index+1}</span>{item}</button>)}</div></div>
        <div className="safety-note"><span>!</span><p><b>SAFE SCIENCE</b> Keep carts on the floor or table, push away from faces, and retrieve only after every cart stops.</p></div>
      </>
    );
    if (step === 7) return (
      <>
        <p className="stage-kicker">REFLECT · REVISE · CONNECT</p>
        <h1>What changed in your thinking about motion?</h1>
        <div className="reflection-choices">{[
          ["revised", "I revised my first idea", "New evidence changed what I thought."],
          ["deepened", "I deepened my first idea", "My prediction was close, but now I can explain why."],
          ["question", "I have a stronger question", "The investigation made me wonder something new."],
        ].map(item=><button key={item[0]} className={reflection===item[0]?"selected":""} onClick={()=>setReflection(item[0])}><span>{reflection===item[0]?"✓":"↗"}</span><strong>{item[1]}</strong><small>{item[2]}</small></button>)}</div>
        <div className="reflection-stem"><span>SHARE WITH A PARTNER</span><p>“I used to think… Now I think… because…”</p></div>
      </>
    );
    if (step === 8) {
      const exitQuestions = [
        { q: "What makes an object’s motion change?", choices: ["A force", "Its colour", "Time alone"], answer: 0 },
        { q: "For a fair test, how many variables should you change?", choices: ["As many as possible", "One", "None"], answer: 1 },
        { q: "A rocket pushes gas backward. The gas pushes the rocket…", choices: ["forward", "backward", "nowhere"], answer: 0 },
      ];
      const score = exitQuestions.reduce((sum,item,index)=>sum+(exitAnswers[index]===item.answer?1:0),0);
      return (
        <>
          <p className="stage-kicker">EXIT TICKET · ANSWER ON YOUR OWN</p>
          <h1>Show what you understand now.</h1>
          <div className="exit-grid">{exitQuestions.map((item,index)=><article key={item.q}><span>{index+1}</span><h2>{item.q}</h2><div>{item.choices.map((choice,choiceIndex)=><button key={choice} className={exitAnswers[index]===choiceIndex?(choiceIndex===item.answer?"correct":"incorrect"):""} onClick={()=>setExitAnswers({...exitAnswers,[index]:choiceIndex})}>{choice}</button>)}</div></article>)}</div>
          <div className="exit-result"><span>{Object.keys(exitAnswers).length < 3 ? `${Object.keys(exitAnswers).length} of 3 answered` : `${score} of 3 supported by evidence`}</span><p>{score===3?"You’re ready to transfer your learning.":"Use feedback as information. Revisit one idea before you leave."}</p></div>
        </>
      );
    }
    return (
      <>
        <p className="stage-kicker">CHOOSE YOUR NEXT CHALLENGE</p>
        <h1>Where could your understanding of motion make a difference?</h1>
        <div className="extension-grid">{extensionChoices.map((item,index)=><button key={item[0]} className={extension===index?"selected":""} onClick={()=>setExtension(index)}><span>{["◎","◇","✦"][index]}</span><small>{item[0]}</small><strong>{item[1]}</strong><b>{extension===index?"CHOSEN ✓":"CHOOSE →"}</b></button>)}</div>
        <div className="closing-line">Explain it <span>•</span> Draw it <span>•</span> Build it <span>•</span> Act it out</div>
      </>
    );
  };

  return (
    <div className={`lesson-page model-lesson ${mode === "projector" ? "lesson-projector" : "lesson-teacher"}`}>
      <div className="lesson-toolbar">
        <div className="lesson-location"><button onClick={onHome}>⌂ <span>Home</span></button><button onClick={onUnitStart}>← <span>Unit start</span></button></div>
        <div><span className="lesson-subject-dot"></span><b>SCIENCE 6</b><i>What makes motion change?</i></div>
        <span className="lesson-toolbar-right">{mode === "projector" && <strong className="student-live-badge">PROJECTOR VIEW</strong>}<b>{step + 1} of {lessonSteps.length}</b>{mode === "teacher" && <button onClick={() => setBriefOpen(true)}>Lesson brief</button>}<button className="view-switch" onClick={() => onMode(mode === "teacher" ? "projector" : "teacher")}>{mode === "teacher" ? "▰ Project lesson" : "◉ Return to plan view"}</button></span>
      </div>
      <div className="lesson-layout">
        <aside className="lesson-rail">
          <p>LESSON FLOW</p>
          {lessonSteps.map((item, index) => (
            <button key={item.label} onClick={() => setStep(index)} className={step === index ? "active" : step > index ? "done" : ""}>
              <span>{step > index ? "✓" : item.number}</span><div><b>{item.label}</b><small>{item.subtitle}</small></div>
            </button>
          ))}
        </aside>
        <section className="lesson-stage" aria-label="Motion lesson stage">
          <div className="stage-count">{current.number}</div>
          <div className="stage-inner">
            {renderStep()}
            <div className="stage-navigation"><button disabled={step === 0} onClick={() => setStep(step - 1)}>← Previous</button><span>{lessonSteps.map((_,i)=><i key={i} className={i===step?"active":""}></i>)}</span><button disabled={step === lessonSteps.length - 1} onClick={() => setStep(step + 1)}>Next <b>→</b></button></div>
          </div>
        </section>
        {mode === "teacher" && (
          <aside className="teacher-panel">
            <div className="teacher-panel-title"><span>◉</span><div><b>Teacher view</b><small>Hidden from students</small></div></div>
            <section><p>STEP {current.number} · {current.duration.toUpperCase()}</p><h3>{current.label}</h3></section>
            <section><p>TEACHER MOVE</p><div className="note-card">{current.teacherMove}</div></section>
            <section><p>LOOK &amp; LISTEN FOR</p><div className="note-card look-card">{current.lookFor}</div></section>
            <section><p>ASSESSMENT EVIDENCE</p><div className="evidence-chip">✓ {current.evidence}</div></section>
            <button className="full-brief-button" onClick={() => setBriefOpen(true)}>Open full lesson brief <span>→</span></button>
            <p className="keyboard-hint">Tip: use ← → to advance slides</p>
          </aside>
        )}
      </div>
      <div className="lesson-sequence-nav"><button onClick={()=>onOpenLesson(previousLesson)}>← {previousLesson.title}</button><button onClick={onUnitStart}>Unit 03 overview</button><button onClick={()=>onOpenLesson(nextLesson)}>{nextLesson.title} →</button></div>
      {briefOpen && <TeacherBrief onClose={() => setBriefOpen(false)} />}
    </div>
  );
}

function TeacherBrief({ onClose }: { onClose: () => void }) {
  return (
    <div className="brief-overlay" role="dialog" aria-modal="true" aria-label="Full lesson brief">
      <button className="brief-scrim" aria-label="Close lesson brief" onClick={onClose}></button>
      <aside className="brief-drawer">
        <header><div><p className="section-kicker">TEACHER-ONLY LESSON BRIEF</p><h2>What makes motion change?</h2><span>Science 6 · 55–70 minutes</span></div><button onClick={onClose} aria-label="Close">×</button></header>
        <section><p>BC CURRICULUM ALIGNMENT</p><div className="brief-callout"><b>Big Idea</b><span>Newton’s three laws of motion describe the relationship between force and motion.</span></div><ul><li>Newton’s three laws of motion</li><li>effects of balanced and unbalanced forces in daily physical activities</li><li>force of gravity</li></ul><div className="brief-tags"><span>Question &amp; predict</span><span>Plan &amp; conduct</span><span>Analyze data</span><span>Evaluate</span><span>Communicate</span></div></section>
        <section><p>LEARNING INTENTION</p><h3>We are learning how forces change motion.</h3><p className="brief-body">Students will use observations and evidence to explain Newton’s laws and plan a fair investigation.</p></section>
        <section><p>SUCCESS CRITERIA</p><ul><li>I can describe how a push or pull changes motion.</li><li>I can use evidence to explain one of Newton’s laws.</li><li>I can change one variable, measure results, and identify a pattern.</li></ul></section>
        <section><p>MATERIALS &amp; PREPARATION</p><ul><li>One toy cart or wheeled object per group</li><li>Metre stick or measuring tape; masking tape for start lines</li><li>Masses or classroom objects to add safely to carts</li><li>Two contrasting surfaces, such as smooth floor and carpet</li><li>Paper or digital data table; pencils</li></ul><div className="brief-callout safety"><b>Safety</b><span>Use floor-level trials where possible. Keep carts away from faces, stairs, doors, and walking paths.</span></div></section>
        <section><p>COMMON MISCONCEPTIONS</p><ul><li>A force is needed to keep an object moving at constant speed. <b>Reframe:</b> forces change motion; friction often hides inertia.</li><li>Action–reaction forces cancel. <b>Reframe:</b> the pair acts on different objects.</li><li>Heavier objects always fall faster. <b>Reframe:</b> separate gravitational acceleration from air resistance.</li></ul></section>
        <section><p>DIFFERENTIATION</p><ul><li>Provide picture vocabulary, gestures, and sentence frames: “When ___ changed, ___ happened because ___.”</li><li>Offer roles: launcher, measurer, recorder, safety lead, and evidence reporter.</li><li>Allow oral, sketched, acted, or written explanations.</li><li>Use a pre-marked distance strip or fewer trials when measurement creates a barrier.</li><li>Extend by graphing force or mass against average distance and critiquing test fairness.</li></ul></section>
        <section><p>ASSESSMENT PLAN</p><ul><li><b>Before:</b> opening prediction reveals prior ideas about inertia.</li><li><b>During:</b> listen for claim–evidence reasoning and check fair-test plans.</li><li><b>After:</b> use practice responses, group conclusions, reflection, and exit ticket.</li></ul><div className="brief-callout"><b>Evidence of proficiency</b><span>Student identifies a force, explains the resulting change in motion, and supports the explanation with an observation or measured pattern.</span></div></section>
        <section><p>ANSWER KEY</p><ol><li>Bus stop: the body continues forward due to inertia (first law).</li><li>Harder push on the same cart: greater acceleration (second law).</li><li>Swimmer or rocket: equal and opposite forces act on different objects (third law).</li><li>Fair test: change one variable, measure one outcome, keep other conditions consistent, and repeat trials.</li><li>Exit ticket: Force · One variable · Forward.</li></ol></section>
        <section><p>EXTENSION &amp; NEXT STEP</p><p className="brief-body">Use student choice: sport motion analysis, safety design, or spacecraft motion. Next, students apply the complete unit sequence in the Motion Safety Design Studio.</p></section>
      </aside>
    </div>
  );
}
