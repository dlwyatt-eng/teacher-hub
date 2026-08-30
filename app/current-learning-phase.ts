import currentLearningSource from "../content/current-learning-window-v2.json";
import { datedEntryState, selectDatedEntry } from "./current-learning-date.mjs";

type BaseWindow = typeof currentLearningSource.window;
type BaseResource = BaseWindow["shared"]["primaryResource"];

export type ResolvedCurrentLearningWindow = Omit<BaseWindow, "shared"> & {
  shared: Omit<BaseWindow["shared"], "primaryResource"> & {
    primaryResource: BaseResource | null;
  };
};

type PhaseOverride = (typeof currentLearningSource.phaseOverrides)[number];

function mergePhase(base: BaseWindow, override: PhaseOverride): ResolvedCurrentLearningWindow {
  return {
    ...base,
    id: override.id,
    effectiveFrom: override.effectiveFrom,
    effectiveTo: override.effectiveTo,
    shared: {
      ...base.shared,
      ...override.shared,
      primaryResource: override.shared.primaryResource,
    },
    teacher: { ...base.teacher, ...override.teacher },
    student: {
      ...base.student,
      ...override.student,
      quickReference: { ...base.student.quickReference, ...override.student.quickReference },
    },
    family: {
      ...base.family,
      ...override.family,
      quickReference: { ...base.family.quickReference, ...override.family.quickReference },
    },
  } as ResolvedCurrentLearningWindow;
}

/**
 * Resolves the dated September phase from the one canonical current-learning
 * record. Gaps such as a weekend point to the next phase instead of falling
 * back to an already-finished lesson.
 */
export function currentLearningWindowForDate(date: string): ResolvedCurrentLearningWindow {
  const base = currentLearningSource.window as BaseWindow;
  const phases = currentLearningSource.phaseOverrides as readonly PhaseOverride[];
  const selected = selectDatedEntry([base, ...phases] as readonly (BaseWindow | PhaseOverride)[], date);
  const phase = selected ? phases.find(candidate => candidate.id === selected.id) : null;
  return phase ? mergePhase(base, phase) : base as ResolvedCurrentLearningWindow;
}

export function currentLearningWindow(date = vancouverDateKey()) {
  return currentLearningWindowForDate(date);
}

export function vancouverDateKey(at = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(at);
  const part = (type: "year" | "month" | "day") => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function currentLearningState(window: ResolvedCurrentLearningWindow, date = vancouverDateKey()) {
  return datedEntryState(window, date);
}
