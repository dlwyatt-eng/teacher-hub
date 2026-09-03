"use client";

import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { assessmentHighlights, assessmentPrinciples, expectationGroups, homeworkPolicy, philosophyCommitments, spacesAnnualEvidenceSummary, spacesEvidenceRhythm, spacesPortfolioBudget, spacesPostRecipe, spacesReportingWindows, thingsToKnow } from "./classroom-program";
import { printClosest } from "./print-support";
import { dailyLaunchContentId, type DailyLaunch } from "./daily-launch";
import { StudentHomePortal, StudentWorldAtlas, TeacherDailyLaunchManager } from "./student-home-portal";
import {
  SEPTEMBER_FORMED_CLASS_WEEK_STORAGE_KEY,
  SEPTEMBER_ROTATION_WEEK_STORAGE_KEY,
  WEEKDAYS,
  WEEKLY_PLAN_CHANGE_EVENT,
  WEEKLY_PLAN_STORAGE_KEYS,
  WEEKLY_PLAN_STORAGE_KEY,
  mondayOfWeek,
  readWeeklyPlan,
  weeklyPlanFromSeed,
  type WeeklyPlanData,
  type WeekPlanSeed,
} from "./weekly-plan";
import { SiteSearch, type SiteSearchTarget } from "./site-search";
import type { MorningTimelineItem } from "./morning-screen";
import StudentAgencyDock from "./student-agency-dock";
import { vancouverDateKey as morningDateKey } from "./morning-screen-state";
import TeacherHomeOperations from "./teacher-home-operations";
import { currentLearningWindow } from "./current-learning-phase";
import { subjects, type Subject } from "./subject-catalog";
import type { SubjectHubLocation } from "./subject-hub";
import type { SpecialWeekLaunch } from "./school-year-planning";
import currentLearningSource from "../content/current-learning-window-v2.json";

const SubjectHub = lazy(() => import("./subject-hub"));
const ScienceLessonRoute = lazy(() => import("./inquiry-experience").then((module) => ({ default: module.ScienceLessonRoute })));
const CrossCurricularProjects = lazy(() => import("./cross-curricular-projects"));
const TeachingOsMap = lazy(() => import("./teaching-os-map"));
const SchoolYearWeeklyPlan = lazy(() => import("./school-year-planning").then((module) => ({ default: module.SchoolYearWeeklyPlan })));
const SchoolYearTtocDayPlan = lazy(() => import("./school-year-planning").then((module) => ({ default: module.SchoolYearTtocDayPlan })));
const YearPlanPage = lazy(() => import("./year-plan-page"));
const FirstWeekMission = lazy(() => import("./first-week-mission"));
const AiActivityStudio = lazy(() => import("./ai-activity-studio"));
const AiTensionsLab = lazy(() => import("./ai-tensions-lab"));
const MorningScreen = lazy(() => import("./morning-screen"));
const NewsroomHub = lazy(() => import("./student-agency-hub").then((module) => ({ default: module.NewsroomHub })));
const MyInquiryHub = lazy(() => import("./student-agency-hub").then((module) => ({ default: module.MyInquiryHub })));
const MonthlyCalendar = lazy(() => import("./monthly-calendar"));
const VisualReviewStudio = lazy(() => import("./visual-review-studio"));
const ProficiencyModelsLibrary = lazy(() => import("./proficiency-models-panel").then((module) => ({ default: module.ProficiencyModelsLibrary })));

const STUDENT_FAMILY_SITE_URL = "https://dlwyatt-eng.github.io/learn/";

const septemberLaunchWeekSeed: WeekPlanSeed = {
  weekOf: "2026-09-07",
  title: "Grade 6 opening rotations · schedule pending",
  weekNote: "Classes are not formed and the visit order, group count, block length, and end date are not confirmed. A teacher may see four of five groups each day and some groups may return in the following week. Use Opening Rotations to choose one standalone Discovery organizer and a 45-, 60-, or 75-minute route only after the arriving group and available time are known. Record exact bells, group history, supervision, support, and transitions here. Collect named originals face-down for private transfer; display only a separately student-approved copy or excerpt.",
  lessons: [],
};

const firstFormedClassWeekSeed: WeekPlanSeed = {
  weekOf: "2026-09-14",
  title: "First Formed Class Week · September 14–18",
  weekNote: "Begin with low-risk story and shared noticing, establish an accurate Mathematics starting point, name current learning conditions without fixed labels, then gather evidence from place. Friday brings the week together in one September Learning Story rather than creating separate uploads.",
  lessons: [
    {
      sourceId: "ordinary-object-story",
      subject: "English Language Arts",
      title: "The story inside an ordinary object",
      timing: "1–2 × 45 min",
      day: "monday",
      runSteps: [
        "Look: Choose one object in the picture. Write or say five details you can truly see.",
        "Choose: Invent a beginning, a surprising turn, and an ending. You may keep the story completely made up.",
        "Try it: Tell your story in 60–90 seconds while your partner listens for the three parts.",
        "Show why: Use your partner's question to make one part clearer, then tell or write it again.",
      ],
      notes: "Learning question: How can an ordinary object carry a story?\nFinish with: A 90-second oral story plus a six-sentence written seed.\nNo separate post. A student may reuse this as part of the September Learning Story.",
    },
    {
      sourceId: "magnitude-gallery",
      subject: "Mathematics",
      title: "How big is this number?",
      timing: "2 × 45–55 min",
      day: "tuesday",
      runSteps: [
        "Look: Place each number near a useful benchmark before you calculate anything.",
        "Choose: Zoom between the four number lines. Say what each scale can and cannot show.",
        "Try it: Put six numbers in order and defend the two placements most likely to fool someone.",
        "Show why: Create one exact visual comparison that makes a surprising size difference clear.",
      ],
      notes: "Learning question: Is 0.8 closer to 0 or 1? Where would one billion fit?\nFinish with: A repaired on-screen number line and one clear paper or board comparison.\nKeep the class comparison in Math folders or on the board; no upload.",
    },
    {
      sourceId: "learning-user-manual",
      subject: "Career Education",
      title: "How I learn best right now",
      timing: "2 × 45–55 min",
      day: "wednesday",
      runSteps: [
        "Look: Think of one recent class moment that went well enough to study.",
        "Choose: Circle one helpful action you took in that moment.",
        "Try it: Match that action to one strength card.",
        "Show why: Choose one learning condition that helps you use that strength.",
        "Make it better: Pick one responsibility you can take when the work feels hard.",
        "Share it: Write one small goal with a first step, check date, and help source.",
      ],
      notes: "Learning question: What conditions help you learn and contribute—and what responsibility can you take?\nFinish with: A private learning user manual and goal pathway.\nUse the existing September Learning Story; do not create a second Career post.",
    },
    {
      sourceId: "place-soundwalk",
      subject: "English Language Arts",
      title: "School-place soundwalk",
      timing: "1 × 55–65 min",
      day: "thursday",
      runSteps: [
        "Look: Move to the listening spot your teacher chose.",
        "Choose: Listen quietly for twenty seconds.",
        "Try it: Write one exact sound word for each sound you notice.",
        "Show why: Mark each sound as near, middle, or far.",
        "Make it better: Sort each note as an observation or a guess.",
        "Share it: Revise one line so a reader can hear the place more clearly.",
      ],
      notes: "Learning question: What can a place tell us when we slow down enough to notice?\nFinish with: A precise place postcard or short performed soundscape.\nKeep it local or use it in the September learning-with-place display.",
    },
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

const specialSeptemberWeekLaunches = [
  {
    id: "rotation-week",
    label: "Opening Rotations",
    dateRange: "Sep 8 onward · flexible",
    description: "Choose a standalone organizer and 45-, 60-, or 75-minute route for each arriving group; order and repeat visits remain open.",
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
] as const satisfies readonly SpecialWeekLaunch[];

function savedOrSeptemberPlanForWeek(weekOf: string): WeeklyPlanData | null {
  return WEEKLY_PLAN_STORAGE_KEYS
    .map((storageKey) => readWeeklyPlan(storageKey))
    .find((plan) => plan?.weekOf === weekOf)
    ?? (weekOf === septemberLaunchWeekSeed.weekOf ? weeklyPlanFromSeed(septemberLaunchWeekSeed) : null)
    ?? (weekOf === firstFormedClassWeekSeed.weekOf ? weeklyPlanFromSeed(firstFormedClassWeekSeed) : null);
}

function morningTimelineFromPlan(date: string, planned: WeeklyPlanData | null): MorningTimelineItem[] {
  if (!planned) return [];
  const [year, month, day] = date.split("-").map(Number);
  const weekdayIndex = new Date(Date.UTC(year, month - 1, day)).getUTCDay() - 1;
  const weekday = WEEKDAYS[weekdayIndex];
  if (!weekday) return [];

  return planned.blocks
    .filter((block) => block.day === weekday)
    .slice(0, 8)
    .map((block) => ({
      time: block.startTime || block.timing || "Today",
      label: block.kind === "lesson" ? `${block.subject} · ${block.title}` : block.title,
    }));
}

function localMorningTimeline() {
  const date = morningDateKey();
  return morningTimelineFromPlan(date, savedOrSeptemberPlanForWeek(mondayOfWeek(date)));
}

function useMorningTimeline() {
  const [timeline, setTimeline] = useState<MorningTimelineItem[]>(localMorningTimeline);

  useEffect(() => {
    let disposed = false;
    let refreshRequest = 0;

    const refresh = () => {
      const requestId = ++refreshRequest;
      const date = morningDateKey();
      const weekOf = mondayOfWeek(date);
      const localPlan = savedOrSeptemberPlanForWeek(weekOf);
      if (localPlan) {
        setTimeline(morningTimelineFromPlan(date, localPlan));
        return;
      }

      setTimeline([]);
      if (weekOf < "2026-09-07" || weekOf > "2027-06-21") return;
      void import("./year-week-registry")
        .then(({ yearWeekLaunchForWeek }) => {
          if (disposed || requestId !== refreshRequest) return;
          const launch = yearWeekLaunchForWeek(weekOf);
          setTimeline(morningTimelineFromPlan(date, launch ? weeklyPlanFromSeed(launch.seed) : null));
        })
        .catch(() => {
          if (!disposed && requestId === refreshRequest) setTimeline([]);
        });
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || WEEKLY_PLAN_STORAGE_KEYS.includes(event.key as (typeof WEEKLY_PLAN_STORAGE_KEYS)[number])) refresh();
    };
    refresh();
    window.addEventListener(WEEKLY_PLAN_CHANGE_EVENT, refresh);
    window.addEventListener("storage", handleStorage);
    const dateRefresh = window.setInterval(refresh, 60_000);
    return () => {
      disposed = true;
      refreshRequest += 1;
      window.removeEventListener(WEEKLY_PLAN_CHANGE_EVENT, refresh);
      window.removeEventListener("storage", handleStorage);
      window.clearInterval(dateRefresh);
    };
  }, []);

  return timeline;
}


type ClassroomLocation = {
  mode?: "teacher" | "projector";
  active?: string;
  subject?: string;
  scienceLesson?: string;
  socialLesson?: string;
  socialScene?: number;
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
    const routeKeys = ["mode", "view", "subject", "lesson", "socialLesson", "socialScene"];
    const hasSearchRoute = routeKeys.some((key) => searchParams.has(key));
    const hasLegacyRoute = routeKeys.some((key) => legacyParams.has(key));
    const params = hasSearchRoute ? searchParams : legacyParams;
    const hasExplicitRoute = hasSearchRoute || hasLegacyRoute;
    const parsed = includeSessionFallback && !hasExplicitRoute ? JSON.parse(window.sessionStorage.getItem(locationKey) ?? "{}") : {};
    const saved = parsed && typeof parsed === "object" ? parsed as ClassroomLocation : {};
    const mode = params.get("mode");
    const subject = params.get("subject");
    const scienceLesson = params.get("lesson");
    const socialLesson = params.get("socialLesson");
    const socialSceneValue = params.get("socialScene");
    const parsedSocialScene = socialSceneValue !== null && /^\d+$/.test(socialSceneValue) ? Number(socialSceneValue) : undefined;
    const socialScene = Number.isSafeInteger(parsedSocialScene) && (parsedSocialScene as number) >= 0 ? parsedSocialScene : undefined;
    const active = params.get("view");
    return {
      ...saved,
      mode: mode === "student" ? "projector" : mode === "teacher" ? "teacher" : hasExplicitRoute ? "teacher" : saved.mode,
      active: active ?? (hasExplicitRoute ? undefined : saved.active),
      subject: subject ?? (hasExplicitRoute ? undefined : saved.subject),
      scienceLesson: scienceLesson ?? (hasExplicitRoute ? undefined : saved.scienceLesson),
      socialLesson: socialLesson ?? (hasExplicitRoute ? undefined : saved.socialLesson),
      socialScene: socialLesson ? socialScene ?? 0 : hasExplicitRoute ? undefined : saved.socialScene,
    };
  } catch {
    return {};
  }
}

function writeClassroomLocation(location: ClassroomLocation, action: "push" | "replace") {
  const url = new URL(window.location.href);
  for (const key of ["mode", "view", "subject", "lesson", "socialLesson", "socialScene"]) url.searchParams.delete(key);
  if (location.mode === "projector") url.searchParams.set("mode", "student");
  if (location.subject) {
    url.searchParams.set("subject", location.subject);
    if (location.subject === "Social Studies" && location.socialLesson) {
      url.searchParams.set("socialLesson", location.socialLesson);
      url.searchParams.set("socialScene", String(Number.isSafeInteger(location.socialScene) && (location.socialScene as number) >= 0 ? location.socialScene : 0));
    }
  }
  else if (location.scienceLesson) url.searchParams.set("lesson", location.scienceLesson);
  else if (location.active && location.active !== "Home") url.searchParams.set("view", location.active);
  const legacyHash = new URLSearchParams(url.hash.replace(/^#/, ""));
  if (["mode", "view", "subject", "lesson", "socialLesson", "socialScene"].some((key) => legacyHash.has(key))) url.hash = "";
  const target = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (action === "push" && target === current) return;
  window.history[action === "push" ? "pushState" : "replaceState"](window.history.state, "", target);
}

function subjectFromLocation(location: ClassroomLocation) {
  return subjects.find((subject) => subject.name === location.subject || subject.short === location.subject) ?? null;
}

function scienceLessonIdFromLocation(location: ClassroomLocation) {
  return location.scienceLesson?.trim() || null;
}

function subjectHubLocationFromClassroom(location: ClassroomLocation, subject: Subject | null): SubjectHubLocation {
  if (subject?.name !== "Social Studies" || !location.socialLesson?.trim()) return {};
  return {
    tab: "Lessons",
    socialLessonId: location.socialLesson.trim(),
    socialScene: Number.isSafeInteger(location.socialScene) && (location.socialScene as number) >= 0 ? location.socialScene : 0,
  };
}

function normalizeLegacyView(active?: string) {
  return active === "Model Lesson" || active === "Lesson Template" ? "Home" : active;
}

const projectorSafePages = new Set(["Home", "First Week Mission", "Morning Screen", "Newsroom", "My Inquiry", "AI Tensions Lab"]);

function isProjectorSafePage(active: string) {
  return projectorSafePages.has(active);
}


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
    firstAction: "Read both endpoints and one equal jump before you place the number.", finish: "The same number on two scales, plus one clear explanation.",
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
  { label: "Language Arts & Mathematics", detail: "All 29 signature experiences now use reviewed student directions, exact finish evidence, accessible routes, and clearer Student projection views; priority activities include levelled examples with visible next steps", color: "#eee4f4", state: "CLASSROOM-READY CORE · REFINE IN USE" },
  { label: "Arts · ADST · PHE · Career", detail: "Distinct subject pathways now share the same launch standard: clear purpose, usable sequence, access and offline routes, honest evidence, and privacy-safe save decisions", color: "#e4eee7", state: "CLASSROOM-READY CORE · REFINE IN USE" },
  { label: "Claims lesson", detail: "The lesson now uses a simple whole-class Two Lies and a Truth game: students vote, defend the truth with source evidence, and then trace a rumour to its first source", color: "#dce7f4", state: "REBUILT · VERIFY IN CLASS" },
  { label: "Science", detail: "All 19 lessons were checked for sequence, preparation, evidence, and projection; only audited lessons keep a ready label while corrections continue", color: "#d9e9df", state: "AUDIT IN PROGRESS" },
  { label: "Social Studies", detail: "All four units now have first-pass experiences: games, movement, physical data, system webs, authentic source comparisons, prototype studios, and expert teaching", color: "#f4e6c9", state: "4-UNIT BASELINE · ADJUST IN USE" },
  { label: "Build direction", detail: "Build broad, enjoyable curriculum coverage now; refine individual lessons when the real class schedule, student needs, and current events make the next decision meaningful", color: "#e8def4", state: "BUILD · TEACH · ADJUST" },
];

const recentUpdates = [
  {
    id: "discovery-rotations",
    title: "Discovery rotations & private handoff",
    date: "Aug. 31, 2026",
    detail: "Added five standalone Discovery Booklet sessions with 45-, 60-, and 75-minute routes, projector screens, access choices, formative look-fors, TTOC guidance, face-down private transfer, and a separate student-consent process for community display. The earlier technology decision work remains an optional later extension.",
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
    detail: "Added six connected arcs for each core subject, now 14 Language Arts and 15 Mathematics signature experiences, Teacher preparation, student projection missions, curated resource routes, and only selected SpacesEDU evidence.",
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
    detail: "Restored the January Bloxels story-game as a supplied ELA/ADST project. Organized prior SpacesEDU records into useful evidence families and separated portfolio highlights, optional evidence, in-class work, and private support records.",
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

function RouteLoading({ label }: { label: string }) {
  return (
    <div className="page">
      <div className="route-loading" role="status" aria-live="polite" aria-busy="true">
        <span aria-hidden="true">W</span>
        <div><strong>Opening {label}…</strong><small>Loading only the tools and materials for this view.</small></div>
      </div>
    </div>
  );
}

class RouteErrorBoundary extends Component<{ children: ReactNode; routeKey: string }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidUpdate(previous: Readonly<{ children: ReactNode; routeKey: string }>) {
    if (previous.routeKey !== this.props.routeKey && this.state.failed) this.setState({ failed: false });
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="page">
        <section className="route-error" role="alert">
          <span aria-hidden="true">↻</span>
          <div><p className="section-kicker">VIEW COULD NOT LOAD</p><h2>Refresh to reconnect this part of the Hub.</h2><p>The Home page is still available. This can happen when school Wi-Fi drops or the Hub was updated while this tab stayed open.</p></div>
          <button type="button" onClick={() => window.location.reload()}>Refresh this view</button>
        </section>
      </div>
    );
  }
}

export default function Home() {
  const hydrated = useSyncExternalStore(subscribeToHydration, getClientHydrationSnapshot, getServerHydrationSnapshot);
  if (!hydrated) return <div className="classroom-loading" aria-busy="true"><span>W</span><p>Opening the Classroom OS…</p></div>;
  return <ClassroomHome />;
}

function ClassroomHome() {
  const [initialLocation] = useState<ClassroomLocation>(readClassroomLocation);
  const initialSubject = subjectFromLocation(initialLocation);
  const initialScienceLessonId = scienceLessonIdFromLocation(initialLocation);
  const initialActive = normalizeLegacyView(initialLocation.active) ?? initialSubject?.short ?? (initialScienceLessonId ? "Science Lesson" : "Home");
  const teacherOnlyInitialDestination = !initialSubject && !initialScienceLessonId && !isProjectorSafePage(initialActive);
  const initialMode = initialLocation.mode ?? "teacher";
  const [mode, setMode] = useState<"teacher" | "projector">(initialMode);
  const [active, setActive] = useState(initialMode === "projector" && teacherOnlyInitialDestination ? "Home" : initialActive);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(initialSubject);
  const [selectedScienceLessonId, setSelectedScienceLessonId] = useState<string | null>(initialScienceLessonId);
  const [subjectHubLocation, setSubjectHubLocation] = useState<SubjectHubLocation>(() => subjectHubLocationFromClassroom(initialLocation, initialSubject));
  const [subjectNavigationRevision, setSubjectNavigationRevision] = useState(0);
  const [weeklyPlanLaunchId, setWeeklyPlanLaunchId] = useState<string>();
  const [aiStudioInitialId, setAiStudioInitialId] = useState<string>();
  const morningTimeline = useMorningTimeline();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);
  const navigationFocusReadyRef = useRef(false);
  const locationCanonicalizedRef = useRef(false);
  const announcement = `${selectedScienceLessonId ? "Science lesson" : selectedSubject?.short ?? active} opened in ${mode === "projector" ? "Projector" : "Plan"} view.`;
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
      scienceLesson: selectedScienceLessonId ?? undefined,
      socialLesson: selectedSubject?.name === "Social Studies" && (subjectHubLocation.tab === "Lessons" || mode === "projector") ? subjectHubLocation.socialLessonId : undefined,
      socialScene: selectedSubject?.name === "Social Studies" && (subjectHubLocation.tab === "Lessons" || mode === "projector") ? subjectHubLocation.socialScene : undefined,
    };
    try { window.sessionStorage.setItem(locationKey, JSON.stringify(location)); } catch {}
    if (!locationCanonicalizedRef.current) {
      writeClassroomLocation(location, "replace");
      locationCanonicalizedRef.current = true;
    }
  }, [mode, active, selectedSubject, selectedScienceLessonId, subjectHubLocation]);

  useEffect(() => {
    const restoreHistoryLocation = () => {
      const location = readClassroomLocation(false);
      const restoredSubject = subjectFromLocation(location);
      const restoredLessonId = scienceLessonIdFromLocation(location);
      const restoredSubjectHubLocation = subjectHubLocationFromClassroom(location, restoredSubject);
      const restoredMode = location.mode ?? "teacher";
      const restoredActive = normalizeLegacyView(location.active) ?? restoredSubject?.short ?? (restoredLessonId ? "Science Lesson" : "Home");
      const teacherOnlyDestination = !restoredSubject && !restoredLessonId && !isProjectorSafePage(restoredActive);
      const safeActive = restoredMode === "projector" && teacherOnlyDestination ? "Home" : restoredActive;
      if (safeActive !== restoredActive) writeClassroomLocation({ mode: restoredMode, active: safeActive }, "replace");
      setMode(restoredMode);
      setSelectedSubject(restoredSubject);
      setSelectedScienceLessonId(restoredLessonId);
      setSubjectHubLocation(restoredSubjectHubLocation);
      setSubjectNavigationRevision((revision) => revision + 1);
      setActive(safeActive);
      setSidebarOpen(false);
    };
    window.addEventListener("popstate", restoreHistoryLocation);
    return () => window.removeEventListener("popstate", restoreHistoryLocation);
  }, []);

  useEffect(() => {
    if (!navigationFocusReadyRef.current) {
      navigationFocusReadyRef.current = true;
      if (active === "Home" && !selectedSubject && !selectedScienceLessonId && mode === "teacher") return;
    }
    window.requestAnimationFrame(() => mainContentRef.current?.focus({ preventScroll: true }));
  }, [mode, active, selectedSubject, selectedScienceLessonId]);

  const closeSidebar = () => {
    closeDrawerTo("menu");
  };

  const commitClassroomLocation = (
    nextMode: "teacher" | "projector",
    nextActive: string,
    nextSubject: Subject | null,
    nextScienceLessonId: string | null,
    nextSubjectHubLocation: SubjectHubLocation = {},
  ) => {
    const routeSocialLesson = nextSubject?.name === "Social Studies" && (nextSubjectHubLocation.tab === "Lessons" || nextMode === "projector");
    writeClassroomLocation({
      mode: nextMode,
      active: nextActive,
      subject: nextSubject?.name,
      scienceLesson: nextScienceLessonId ?? undefined,
      socialLesson: routeSocialLesson ? nextSubjectHubLocation.socialLessonId : undefined,
      socialScene: routeSocialLesson ? nextSubjectHubLocation.socialScene : undefined,
    }, "push");
    setMode(nextMode);
    setActive(nextActive);
    setSelectedSubject(nextSubject);
    setSelectedScienceLessonId(nextScienceLessonId);
    setSubjectHubLocation(nextSubjectHubLocation);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })));
  };

  const navigateToPage = (page: string) => {
    const destination = mode === "projector" && !isProjectorSafePage(page) ? "Home" : page;
    commitClassroomLocation(mode, destination, null, null);
  };

  const openAiStudio = (activityId?: string) => {
    setAiStudioInitialId(activityId);
    navigateToPage("AI Activity Studio");
  };

  const openMonthWeekPlan = (month: string) => {
    setWeeklyPlanLaunchId(`month:${month}`);
    navigateToPage("Weekly Plan");
  };

  const goHome = () => {
    commitClassroomLocation(mode, "Home", null, null);
    if (sidebarOpen) closeDrawerTo("main");
  };

  const chooseSubject = (subject: Subject) => {
    const nextSubjectHubLocation = subject.name === "Social Studies" && selectedSubject?.name === "Social Studies" ? subjectHubLocation : {};
    commitClassroomLocation(mode, subject.short, subject, null, nextSubjectHubLocation);
    if (sidebarOpen) closeDrawerTo("main");
  };

  const openScienceLesson = (lessonId: string) => {
    commitClassroomLocation(mode, "Science Lesson", null, lessonId);
    if (sidebarOpen) closeDrawerTo("main");
  };

  const openSearchTarget = (target: SiteSearchTarget) => {
    if (target.kind === "page") {
      navigateToPage(target.page);
      return;
    }
    if (target.kind === "science") {
      openScienceLesson(target.id);
      return;
    }
    const subjectName = target.kind === "social" ? "Social Studies" : target.subject;
    const subject = subjects.find((item) => item.name === subjectName || item.short === subjectName);
    if (!subject) return;
    if (target.kind === "social") {
      const socialTarget = { tab: "Lessons", socialLessonId: target.id, socialScene: 0 } satisfies SubjectHubLocation;
      try { window.sessionStorage.setItem(`wyatt-subject-location:${subject.name}`, JSON.stringify(socialTarget)); } catch {}
      setSubjectNavigationRevision((revision) => revision + 1);
      commitClassroomLocation(mode, subject.short, subject, null, socialTarget);
      if (sidebarOpen) closeDrawerTo("main");
      return;
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
    const teacherOnlyPage = !selectedSubject && !selectedScienceLessonId && !isProjectorSafePage(active);
    if (nextMode === "projector" && teacherOnlyPage) commitClassroomLocation(nextMode, "Home", null, null);
    else commitClassroomLocation(nextMode, active, selectedSubject, selectedScienceLessonId, subjectHubLocation);
    if (nextMode === "projector") setSidebarOpen(false);
  };

  const updateSubjectHubLocation = useCallback((location: SubjectHubLocation, action: "push" | "replace") => {
    setSubjectHubLocation(location);
    const routeSocialLesson = selectedSubject?.name === "Social Studies" && (location.tab === "Lessons" || mode === "projector");
    writeClassroomLocation({
      mode,
      active,
      subject: selectedSubject?.name,
      scienceLesson: selectedScienceLessonId ?? undefined,
      socialLesson: routeSocialLesson ? location.socialLessonId : undefined,
      socialScene: routeSocialLesson ? location.socialScene : undefined,
    }, action);
  }, [mode, active, selectedSubject, selectedScienceLessonId]);

  const projectMorning = () => {
    commitClassroomLocation("projector", "Morning Screen", null, null);
    setSidebarOpen(false);
  };

  const contextCurriculumUrl = selectedSubject?.sourceUrl
    ?? (selectedScienceLessonId || active === "Science Lesson" ? subjects[2].sourceUrl : "https://curriculum.gov.bc.ca/curriculum");
  const contextCurriculumLabel = selectedSubject?.short ?? (selectedScienceLessonId || active === "Science Lesson" ? "Science" : "Grade 6");

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
            <a className="context-curriculum-link" href={contextCurriculumUrl} target="_blank" rel="noreferrer">
              <span>BC</span><strong>{contextCurriculumLabel} curriculum</strong><b>↗</b>
            </a>
            <div className="mode-switch" role="group" aria-label="Display mode">
              <button aria-pressed={mode === "teacher"} className={mode === "teacher" ? "selected" : ""} onClick={() => changeMode("teacher")}><span>◉</span> Plan / TTOC</button>
              <button aria-pressed={mode === "projector"} className={mode === "projector" ? "selected" : ""} onClick={() => changeMode("projector")}><span>▰</span> Teach / Project</button>
            </div>
          </div>
        </header>

        <RouteErrorBoundary routeKey={`${active}:${selectedSubject?.name ?? ""}:${selectedScienceLessonId ?? ""}`}>
        <Suspense fallback={<RouteLoading label={selectedScienceLessonId ? "Science lesson" : selectedSubject?.short ?? active} />}>
        {selectedSubject ? (
          <SubjectHub key={`${selectedSubject.name}:${subjectNavigationRevision}`} subject={selectedSubject} mode={mode} onBack={goHome} onOpenLesson={openScienceLesson} initialLocation={subjectHubLocation} onLocationChange={updateSubjectHubLocation} />
        ) : active === "Home" ? (
          <Dashboard onSubject={chooseSubject} onNavigate={navigateToPage} onOpenScienceLesson={openScienceLesson} onProjectMorning={projectMorning} morningTimeline={morningTimeline} mode={mode} />
        ) : active === "Morning Screen" ? (
          <MorningScreen audience={mode === "projector" ? "student" : "teacher"} onOpenHome={goHome} timeline={morningTimeline} />
        ) : active === "Newsroom" ? (
          <NewsroomHub audience={mode === "projector" ? "student" : "teacher"} onHome={goHome} onInquiry={() => navigateToPage("My Inquiry")} onAiStudio={() => openAiStudio("schoolai-newsroom-claim-under-pressure")} />
        ) : active === "My Inquiry" ? (
          <MyInquiryHub audience={mode === "projector" ? "student" : "teacher"} onHome={goHome} onNewsroom={() => navigateToPage("Newsroom")} onAiStudio={() => openAiStudio("schoolai-my-inquiry-question-clinic")} />
        ) : active === "AI Tensions Lab" ? (
          <AiTensionsLab audience={mode === "projector" ? "student" : "teacher"} onHome={goHome} />
        ) : active === "Science Lesson" && selectedScienceLessonId ? (
          <ScienceLessonRoute key={selectedScienceLessonId} lessonId={selectedScienceLessonId} mode={mode} onHome={goHome} onUnitStart={returnToScienceUnit} onOpenLesson={openScienceLesson} />
        ) : active === "Weekly Plan" ? (
          <div className="page"><SchoolYearWeeklyPlan key={weeklyPlanLaunchId ?? "suggested"} initialLaunchId={weeklyPlanLaunchId} specialLaunches={specialSeptemberWeekLaunches} /></div>
        ) : active === "Monthly Calendar" ? (
          <div className="page"><MonthlyCalendar onOpenWeek={() => navigateToPage("Weekly Plan")} /></div>
        ) : active === "First Week Mission" ? (
          <div className="page"><FirstWeekMission audience={mode === "projector" ? "student" : "teacher"} /></div>
        ) : active === "TTOC Day Plan" ? (
          <div className="page"><SchoolYearTtocDayPlan specialLaunches={specialSeptemberWeekLaunches} /></div>
        ) : active === "Cross-Curricular Projects" || active === "Project Template" ? (
          <CrossCurricularProjects />
        ) : active === "Teaching OS Map" ? (
          <TeachingOsMap onHome={goHome} onYearPlan={() => navigateToPage("Year Plan")} onSpaces={() => navigateToPage("SpacesEDU Evidence")} onAiStudio={() => navigateToPage("AI Activity Studio")} onScience={() => chooseSubject(subjects[2])} />
        ) : active === "Year Plan" ? (
          <YearPlanPage mode={mode} onHome={goHome} onAssessment={() => navigateToPage("Assessment Studio")} onWeeklyPlan={openMonthWeekPlan} />
        ) : active === "SpacesEDU Evidence" ? (
          <SpacesEvidencePage mode={mode} onHome={goHome} onAssessment={() => navigateToPage("Assessment Studio")} onProjects={() => navigateToPage("Cross-Curricular Projects")} />
        ) : active === "AI Activity Studio" ? (
          <AiActivityStudio key={aiStudioInitialId ?? "default"} onHome={goHome} initialActivityId={aiStudioInitialId} />
        ) : active === "Visual Review Studio" ? (
          <VisualReviewStudio onHome={goHome} />
        ) : active === "Assessment Studio" ? (
          <AssessmentStudioPage mode={mode} onHome={goHome} />
        ) : active === "Classroom Guide" ? (
          <ClassroomGuidePage mode={mode} onHome={goHome} />
        ) : (
          <PlaceholderPage title={active} onHome={goHome} />
        )}
        </Suspense>
        </RouteErrorBoundary>
      </main>
    </div>
  );
}

function Dashboard({ onSubject, onNavigate, onOpenScienceLesson, onProjectMorning, morningTimeline, mode }: { onSubject: (subject: Subject) => void; onNavigate: (page: string) => void; onOpenScienceLesson: (lessonId: string) => void; onProjectMorning: () => void; morningTimeline: readonly MorningTimelineItem[]; mode: "teacher" | "projector" }) {
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
          <button onClick={() => onNavigate("First Week Mission")}><span>✦</span><strong>Opening rotations</strong><small>5 standalone organizers · 45 / 60 / 75 min</small></button>
          <button onClick={() => onNavigate("Weekly Plan")}><span>▤</span><strong>Weekly plan</strong><small>Auto-filled launch week</small></button>
          <button onClick={() => onNavigate("TTOC Day Plan")}><span>☷</span><strong>TTOC day plan</strong><small>Build and print one day</small></button>
          <button onClick={() => onNavigate("Year Plan")}><span>▦</span><strong>Year plan</strong><small>September–June</small></button>
          <button onClick={() => onNavigate("AI Activity Studio")}><span>AI</span><strong>AI activity studio</strong><small>Curated prompt-ready SchoolAI packs</small></button>
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

function StudentHome({ onSubject, onOpenScienceLesson, onNavigate }: { onSubject: (subject: Subject) => void; onOpenScienceLesson: (lessonId: string) => void; onNavigate: (page: string) => void }) {
  const openMission = (launch: DailyLaunch) => {
    const contentId = dailyLaunchContentId(launch);
    if (launch.kind === "science") {
      try { window.sessionStorage.setItem(`wyatt-science-progress-v2:${contentId}`, JSON.stringify({ scene: 0 })); } catch {}
      onOpenScienceLesson(contentId);
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

      <Suspense fallback={<section className="route-loading-inline" aria-live="polite">Opening worked examples…</section>}>
        <ProficiencyModelsLibrary audience={mode === "projector" ? "student" : "teacher"} initialSetId="civic-decision-brief" />
      </Suspense>

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
        <footer><div><strong>Looking for last year&apos;s exact list?</strong><span>The original titles and tag counts are organized into reusable activity families.</span></div><button onClick={onProjects}>Open the 2025–26 activity bank →</button></footer>
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
          <button onClick={onAssessment}>See assessment highlights + worked models →</button>
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
