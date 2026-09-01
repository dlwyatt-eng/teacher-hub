import { yearMonths } from "./classroom-program";
import { coreLearningPrograms } from "./core-programs";
import { integratedLearningPrograms } from "./integrated-programs";
import { scienceLessons } from "./science-program";
import { socialLessons } from "./social-program";
import { studentStepsFor } from "./program-supports";
import { currentConnections } from "./current-connections";
import {
  SCHOOL_YEAR_WEEK_MONDAYS,
  WEEKDAYS,
  mondayOfWeek,
  weeklyPlanStorageKeyForWeek,
  type WeekPlanSeed,
  type WeekPlanSeedLesson,
} from "./weekly-plan";

export type YearWeekLaunch = {
  id: string;
  month: string;
  label: string;
  dateRange: string;
  description: string;
  storageKey: string;
  seed: WeekPlanSeed;
};

const WINTER_AND_SPRING_BREAK_WEEKS = new Set([
  "2026-12-21",
  "2026-12-28",
  "2027-03-15",
  "2027-03-22",
]);

const SPECIAL_SEPTEMBER_WEEKS = new Set(["2026-09-07", "2026-09-14"]);
const lessonDays = [WEEKDAYS[0], WEEKDAYS[2], WEEKDAYS[4]] as const;
const artsStudioDay = WEEKDAYS[1];

/**
 * Pacing only: every id resolves to the existing lesson source of truth.
 * Nothing here repeats lesson instructions, resources, assessment, or student copy.
 */
const monthLessonSlots: Record<string, readonly (readonly string[])[]> = {
  September: [
    ["compare-government-systems", "maps-make-arguments"],
    ["perspective-without-guessing", "three-voices"],
  ],
  October: [
    ["rights-in-tension", "search-under-hood"],
    ["edit-room", "civic-decision-brief"],
    ["surrey-election-results-and-next-2026", "strategy-league", "scoreboard-rules"],
    ["search-under-hood", "pack-and-sync", "digital-identity-forensics"],
  ],
  November: [
    ["fleetwood-case-file", "decimal-dispatch", "fraction-ratio-remix"],
    ["rights-in-tension", "sale-lab"],
    ["power-in-the-room", "leadership-relay", "access-by-design"],
    ["city-moves", "data-skyline", "turning-point-remix"],
  ],
  December: [
    ["data-skyline", "decimal-dispatch"],
    ["supply-chain-shockwave", "character-council"],
    ["cooperation-control-room", "turning-point-remix", "leadership-relay"],
  ],
  January: [
    ["pull-the-system-thread", "source-mosaic", "pattern-forecast"],
    ["responses-under-pressure", "bloxels-story-blueprint", "equation-balance"],
    ["make-it-teachable", "bloxels-game-studio", "project-rescue-studio"],
    ["expert-exchange", "cold-test-prototype", "sale-lab"],
  ],
  February: [
    ["make-it-teachable", "hook-cold-audience", "graph-story-lab"],
    ["expert-exchange", "probability-game-audit"],
    ["expert-exchange", "leadership-relay", "cold-test-prototype"],
    ["science-launch", "source-mosaic", "career-constellation"],
  ],
  March: [
    ["signal-case", "graph-story-lab", "effort-meter-trail"],
    ["balance-case", "systems-jigsaw", "metaphor-with-limits"],
    ["life-systems-studio", "body-case-conference", "trusted-health-studio"],
  ],
  April: [
    ["body-case-conference", "geometry-field-lab", "metaphor-with-limits"],
    ["mixture-mystery", "mixture-toolkit", "precision-poetry"],
    ["water-treatment-case", "place-mixtures-studio", "science-design-series"],
    ["separation-rescue", "zoo-design-studio", "precision-poetry"],
  ],
  May: [
    ["force-sprint", "force-patterns-lab", "movement-forces"],
    ["crash-lab", "graph-story-lab", "strategy-remix-league"],
    ["safer-impact-studio", "science-design-series", "transformation-cipher"],
    ["safer-impact-studio", "impossible-scene-repair", "space-under-constraints"],
  ],
  June: [
    ["cosmic-zoom", "space-under-constraints"],
    ["space-motion-lab", "impossible-scene-repair", "cosmic-mission-control"],
    ["cosmic-exhibit-studio", "live-anthology", "career-constellation"],
    ["cosmic-exhibit-studio", "live-anthology"],
  ],
};

type ArtsStudioSession = {
  sourceId: "four-arts-languages" | "map-what-maps-miss" | "same-facts-frame" | "rights-in-thirty" | "audience-remix" | "cosmic-scale-gallery";
  session: number;
  total: number;
  label: string;
  stepIndexes: readonly number[];
};

const artsSession = (
  sourceId: ArtsStudioSession["sourceId"],
  session: number,
  total: number,
  label: string,
  stepIndexes: readonly number[],
): ArtsStudioSession => ({ sourceId, session, total, label, stepIndexes });

/**
 * One Tuesday studio most weeks. Each dated seed carries only that session's
 * authored steps, so a four- or five-session unit never masquerades as one day.
 */
const artsStudioSlots: Record<string, readonly (ArtsStudioSession | null)[]> = {
  September: [
    artsSession("four-arts-languages", 1, 5, "Visual art study", [0]),
    artsSession("four-arts-languages", 2, 5, "Music and graphic score", [1]),
  ],
  October: [
    artsSession("four-arts-languages", 3, 5, "Drama and tableau", [2]),
    artsSession("four-arts-languages", 4, 5, "Dance and movement score", [3]),
    artsSession("four-arts-languages", 5, 5, "Two-form remix, response, and revision", [4]),
    null,
  ],
  November: [
    artsSession("map-what-maps-miss", 1, 4, "Artist, context, and slow look", [0]),
    artsSession("map-what-maps-miss", 2, 4, "Technique, symbolism, and observation", [1, 2]),
    artsSession("map-what-maps-miss", 3, 4, "Layered composition and evidence legend", [3]),
    artsSession("map-what-maps-miss", 4, 4, "Gallery response, revision, and creator note", [4]),
  ],
  December: [
    artsSession("same-facts-frame", 1, 4, "Artist encounter and music mini-labs", [0, 1]),
    artsSession("same-facts-frame", 2, 4, "Complete graphic score", [2]),
    artsSession("same-facts-frame", 3, 4, "No-coaching performer test", [3]),
  ],
  January: [
    artsSession("same-facts-frame", 4, 4, "Revision, second performance, and composer statement", [4]),
    null,
    null,
    null,
  ],
  February: [
    artsSession("rights-in-thirty", 1, 4, "Mentor, case, and dramatic-form comparison", [0, 1]),
    artsSession("rights-in-thirty", 2, 4, "Choose a form and compose before/after", [2]),
    artsSession("rights-in-thirty", 3, 4, "Safe transition and complete score", [3]),
    artsSession("rights-in-thirty", 4, 4, "Audience evidence, revision, and replay", [4]),
  ],
  March: [
    artsSession("audience-remix", 1, 3, "Curator model and first arrangement", [0, 1]),
    artsSession("audience-remix", 2, 3, "No-coaching audience test", [2]),
    artsSession("audience-remix", 3, 3, "Revision, retest, and curator note", [3, 4]),
  ],
  April: [
    artsSession("cosmic-scale-gallery", 1, 5, "Mentor context and technique", [0]),
    artsSession("cosmic-scale-gallery", 2, 5, "Four complete technique trials", [1]),
    artsSession("cosmic-scale-gallery", 3, 5, "Intention, medium, risk, and full plan", [2]),
    artsSession("cosmic-scale-gallery", 4, 5, "Build, rehearse, and curate", [3]),
  ],
  May: [
    artsSession("cosmic-scale-gallery", 5, 5, "Audience test, two revisions, and reflection", [4]),
    null,
    null,
    null,
  ],
  June: [null, null, null, null],
};

const programs = Object.values({ ...coreLearningPrograms, ...integratedLearningPrograms });
const programExperienceById = new Map(programs.flatMap((program) =>
  program.experiences.map((experience) => [experience.id, { program, experience }] as const),
));
const socialLessonById = new Map(socialLessons.map((lesson) => [lesson.id, lesson]));
const scienceLessonById = new Map(scienceLessons.map((lesson) => [lesson.id, lesson]));
const currentConnectionById = new Map(currentConnections.map((connection) => [connection.id, connection]));

function lessonFromSourceId(sourceId: string): WeekPlanSeedLesson {
  const connection = currentConnectionById.get(sourceId);
  if (connection) {
    return {
      sourceId,
      subject: "Social Studies · Source Lab",
      title: connection.title,
      timing: connection.minutes,
      runSteps: connection.stages.map((stage) => `${stage.label}: ${stage.studentPrompt}`),
      notes: `Learning question: ${connection.question}\nTeacher check: ${connection.teacher.beforeClass.join(" ")}\nOffline: ${connection.teacher.offlineFallback}\nNo separate SpacesEDU post unless the teacher deliberately carries this into existing selected evidence.`,
    };
  }

  const programEntry = programExperienceById.get(sourceId);
  if (programEntry) {
    const { program, experience } = programEntry;
    return {
      sourceId,
      subject: program.subject,
      title: experience.title,
      timing: experience.duration,
      runSteps: studentStepsFor(experience).map((step) => `${step.title}: ${step.action}`),
      notes: `Learning question: ${experience.question}\nFinish/save: ${experience.product}. ${experience.spacesPrompt}`,
    };
  }

  const socialLesson = socialLessonById.get(sourceId);
  if (socialLesson) {
    return {
      sourceId,
      subject: "Social Studies",
      title: socialLesson.title,
      timing: socialLesson.duration,
      runSteps: socialLesson.scenes.map((scene) => `${scene.label}: ${scene.prompt}`),
      notes: `Learning question: ${socialLesson.question}\nFinish/save: ${socialLesson.spacesPrompt}`,
    };
  }

  const scienceLesson = scienceLessonById.get(sourceId);
  if (scienceLesson) {
    return {
      sourceId,
      subject: "Science",
      title: scienceLesson.title,
      timing: scienceLesson.duration,
      runSteps: scienceLesson.scenes.map((scene) => `${scene.label}: ${scene.prompt}`),
      notes: `Learning question: ${scienceLesson.question}\nFinish/save: ${scienceLesson.spacesPrompt ?? scienceLesson.evidence}`,
    };
  }

  throw new Error(`Year week registry refers to a missing lesson: ${sourceId}`);
}

function artsStudioLessonFromSession(session: ArtsStudioSession): WeekPlanSeedLesson {
  const entry = programExperienceById.get(session.sourceId);
  if (!entry || entry.program.subject !== "Arts Education") {
    throw new Error(`Arts studio registry refers to a missing Arts lesson: ${session.sourceId}`);
  }
  const { experience } = entry;
  const authoredSteps = studentStepsFor(experience);
  const selectedSteps = session.stepIndexes.map((index) => authoredSteps[index]).filter(Boolean);
  if (!selectedSteps.length) throw new Error(`Arts studio ${session.sourceId} session ${session.session} has no authored steps.`);
  const sessionTiming = experience.duration.replace(/^\d+\s*×\s*/, "");
  const finalSession = session.session === session.total;

  return {
    sourceId: session.sourceId,
    subject: "Arts Education",
    title: `${experience.title} · ${session.session}/${session.total} · ${session.label}`,
    timing: sessionTiming,
    day: artsStudioDay,
    runSteps: selectedSteps.map((step) => `${step.title}: ${step.action}`),
    notes: [
      `Learning question: ${experience.question}`,
      `This is session ${session.session} of ${session.total}. Use the matching complete folio pages and keep every other section scheduled; an accommodation may change response mode or length without deleting the learning.`,
      finalSession
        ? `Finish/save: ${experience.product}. ${experience.spacesPrompt}`
        : `Keep the folio in the Arts process folder and continue with session ${session.session + 1}; no separate SpacesEDU post.`,
    ].join("\n"),
  };
}

function addDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day));
  value.setUTCDate(value.getUTCDate() + days);
  return value;
}

function monthForWeek(weekOf: string) {
  return new Intl.DateTimeFormat("en-CA", { month: "long", timeZone: "UTC" }).format(addDays(weekOf, 2));
}

function weekRange(weekOf: string) {
  const start = addDays(weekOf, 0);
  const end = addDays(weekOf, 4);
  const startText = new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", timeZone: "UTC" }).format(start);
  const endText = new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(end);
  return `${startText}–${endText}`;
}

function buildYearWeekLaunches(): YearWeekLaunch[] {
  const monthIndex = new Map<string, number>();
  return SCHOOL_YEAR_WEEK_MONDAYS
    .filter((weekOf) => !SPECIAL_SEPTEMBER_WEEKS.has(weekOf) && !WINTER_AND_SPRING_BREAK_WEEKS.has(weekOf))
    .map((weekOf) => {
      const month = monthForWeek(weekOf);
      const slotIndex = monthIndex.get(month) ?? 0;
      monthIndex.set(month, slotIndex + 1);
      const sourceIds = monthLessonSlots[month]?.[slotIndex];
      const monthRecord = yearMonths.find((record) => record.month === month);
      if (!sourceIds || !monthRecord) throw new Error(`Missing ${month} week ${slotIndex + 1} in the year week registry.`);
      const dateRange = weekRange(weekOf);
      const sequenceIndex = slotIndex + (month === "September" ? 1 : 0);
      const sequence = monthRecord.sequence[Math.min(sequenceIndex, monthRecord.sequence.length - 1)];
      const anchorLessons = sourceIds.map((sourceId, index) => ({ ...lessonFromSourceId(sourceId), day: lessonDays[index] }));
      const artsStudio = artsStudioSlots[month]?.[slotIndex] ?? null;
      const lessons = artsStudio ? [...anchorLessons, artsStudioLessonFromSession(artsStudio)] : anchorLessons;
      return {
        id: `school-week-${weekOf}`,
        month,
        label: `${month} · Week ${slotIndex + 1}`,
        dateRange,
        description: sequence,
        storageKey: weeklyPlanStorageKeyForWeek(weekOf),
        seed: {
          weekOf,
          title: `${monthRecord.phase} · ${dateRange}`,
          weekNote: `${monthRecord.focus}. These are anchor launches, not the full timetable: also schedule 4–5 Mathematics blocks, three short fluency openers, daily reading or listening, PHE, Arts/ADST/Career rhythms, and current class routines. Open each listed lesson for exact sources, displays, materials, and look-fors; adjust bells and closures before printing. SpacesEDU: ${monthRecord.spaces}.`,
          lessons,
        },
      } satisfies YearWeekLaunch;
    });
}

export const yearWeekLaunches = buildYearWeekLaunches();

export function yearWeekLaunchForWeek(date: string) {
  const weekOf = mondayOfWeek(date);
  return yearWeekLaunches.find((launch) => launch.seed.weekOf === weekOf) ?? null;
}

export function suggestedYearWeekLaunch(date: string) {
  const weekOf = mondayOfWeek(date);
  return yearWeekLaunchForWeek(weekOf)
    ?? yearWeekLaunches.find((launch) => (launch.seed.weekOf ?? "") >= weekOf)
    ?? yearWeekLaunches.at(-1)
    ?? null;
}

export function firstYearWeekLaunchForMonth(month: string) {
  return yearWeekLaunches.find((launch) => launch.month === month) ?? null;
}
