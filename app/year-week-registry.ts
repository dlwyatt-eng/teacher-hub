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

/**
 * Pacing only: every id resolves to the existing lesson source of truth.
 * Nothing here repeats lesson instructions, resources, assessment, or student copy.
 */
const monthLessonSlots: Record<string, readonly (readonly string[])[]> = {
  September: [
    ["compare-government-systems", "maps-make-arguments", "power-in-the-room"],
    ["perspective-without-guessing", "trace-the-claim", "three-voices"],
  ],
  October: [
    ["rights-in-tension", "search-under-hood", "map-what-maps-miss"],
    ["edit-room", "civic-decision-brief", "same-facts-frame"],
    ["surrey-election-results-and-next-2026", "strategy-league", "scoreboard-rules"],
    ["search-under-hood", "pack-and-sync", "digital-identity-forensics"],
  ],
  November: [
    ["fleetwood-case-file", "decimal-dispatch", "fraction-ratio-remix"],
    ["rights-in-tension", "rights-in-thirty", "sale-lab"],
    ["power-in-the-room", "leadership-relay", "access-by-design"],
    ["city-moves", "data-skyline", "turning-point-remix"],
  ],
  December: [
    ["data-skyline", "same-facts-frame", "decimal-dispatch"],
    ["supply-chain-shockwave", "rights-in-thirty", "character-council"],
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
    ["expert-exchange", "audience-remix", "probability-game-audit"],
    ["expert-exchange", "leadership-relay", "cold-test-prototype"],
    ["science-launch", "source-mosaic", "four-arts-languages"],
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
    ["cosmic-zoom", "cosmic-scale-gallery", "space-under-constraints"],
    ["space-motion-lab", "impossible-scene-repair", "cosmic-mission-control"],
    ["cosmic-exhibit-studio", "live-anthology", "career-constellation"],
    ["cosmic-exhibit-studio", "audience-remix", "live-anthology"],
  ],
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
      const lessons = sourceIds.map((sourceId, index) => ({ ...lessonFromSourceId(sourceId), day: lessonDays[index] }));
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
