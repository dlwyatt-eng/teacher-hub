"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  WEEKDAYS,
  dateForWeekday,
  mergeWeekPlanSeed,
  normalizePlanForStorageKey,
  readWeeklyPlan,
  weeklyPlanFromSeed,
  type Weekday,
  type WeeklyPlanBlock,
  type WeeklyPlanData,
  type WeekPlanSeed,
} from "./weekly-plan";
import { PLAN_BLOCK_NOTE_MAX } from "./planning-contract";
import { PlanningPrivacyNote } from "./planning-privacy";

export const TTOC_DAY_PLAN_STORAGE_KEY = "mr-wyatt-ttoc-day-plan-v1";
export const TTOC_DAY_PLAN_CHANGE_EVENT = "mr-wyatt:ttoc-day-plan-change";

export type TtocDayPlanLesson = {
  sourceId: string;
  subject: string;
  title: string;
  timing: string;
  runSteps: readonly string[];
  notes?: string;
};

export type TtocDayPlanBlockKind = "lesson" | "transition" | "recess" | "lunch";

export type TtocDayPlanBlock = {
  id: string;
  kind: TtocDayPlanBlockKind;
  /** Stable provenance used to make repeated week imports idempotent. */
  importKey?: string;
  sourceId?: string;
  subject: string;
  title: string;
  startTime: string;
  timing: string;
  runSteps: string[];
  notes: string;
};

export type TtocDayPlanEssentials = {
  attendance: string;
  officeEmergency: string;
  supervisionSpecialists: string;
  dismissal: string;
  noTechRoute: string;
};

export type TtocDayPlanData = {
  version: 1;
  date: string;
  essentials: TtocDayPlanEssentials;
  blocks: TtocDayPlanBlock[];
};

export type TtocWeekImportOption = {
  id: string;
  label: string;
  storageKey: string;
  seed: WeekPlanSeed;
  defaultWeekday?: Weekday;
};

export type TtocWeekImportResult = {
  plan: TtocDayPlanData;
  added: number;
  duplicates: number;
  blocked: number;
  sourceCount: number;
  status: "imported" | "empty" | "date-conflict";
};

export type TtocDayPlanProps = {
  /** The lesson currently open in this renderer. */
  currentLesson?: TtocDayPlanLesson;
  /** Override only when a separate local plan is intentionally needed. */
  storageKey?: string;
  heading?: string;
  /** Hide the second add action when TeacherRunSheet already provides it. */
  showCurrentLesson?: boolean;
  /** Saved week namespaces plus their safe seed fallback. */
  weekImportOptions?: readonly TtocWeekImportOption[];
};

export type AddToDayPlanButtonProps = {
  lesson: TtocDayPlanLesson;
  storageKey?: string;
  label?: string;
  className?: string;
};

const blockKinds = new Set<TtocDayPlanBlockKind>(["lesson", "transition", "recess", "lunch"]);
const safeId = /^[a-z0-9][a-z0-9:_-]{0,119}$/i;
const safeImportKey = /^[a-z0-9][a-z0-9:_-]{0,239}$/i;

export function emptyTtocEssentials(): TtocDayPlanEssentials {
  return {
    attendance: "",
    officeEmergency: "",
    supervisionSpecialists: "",
    dismissal: "",
    noTechRoute: "",
  };
}

function text(value: unknown, maximum: number, allowEmpty = false) {
  if (typeof value !== "string") return null;
  const clean = value.trim().replace(/\s+/g, " ");
  if ((!clean && !allowEmpty) || clean.length > maximum) return null;
  return clean;
}

function createId(kind: TtocDayPlanBlockKind) {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().slice(0, 12)
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return `${kind}-${random}`;
}

function todayForInput() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

function emptyPlan(date = ""): TtocDayPlanData {
  return { version: 1, date, essentials: emptyTtocEssentials(), blocks: [] };
}

function parseEssentials(value: unknown): TtocDayPlanEssentials | null {
  if (value === undefined) return emptyTtocEssentials();
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const attendance = text(record.attendance, 600, true);
  const officeEmergency = text(record.officeEmergency, 600, true);
  const supervisionSpecialists = text(record.supervisionSpecialists, 600, true);
  const dismissal = text(record.dismissal, 600, true);
  const noTechRoute = text(record.noTechRoute, 600, true);
  if (attendance === null || officeEmergency === null || supervisionSpecialists === null || dismissal === null || noTechRoute === null) return null;
  return { attendance, officeEmergency, supervisionSpecialists, dismissal, noTechRoute };
}

function parseBlock(value: unknown): TtocDayPlanBlock | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const kind = record.kind;
  if (typeof kind !== "string" || !blockKinds.has(kind as TtocDayPlanBlockKind)) return null;
  const id = text(record.id, 120);
  const subject = text(record.subject, 80);
  const title = text(record.title, 180);
  const startTime = text(record.startTime, 8, true);
  const timing = text(record.timing, 80, true);
  const notes = text(record.notes, PLAN_BLOCK_NOTE_MAX, true);
  const sourceId = record.sourceId === undefined ? undefined : text(record.sourceId, 120);
  const importKey = record.importKey === undefined ? undefined : text(record.importKey, 240);
  if (!id || !safeId.test(id) || !subject || !title || startTime === null || timing === null || notes === null || sourceId === null || importKey === null || (importKey && !safeImportKey.test(importKey))) return null;
  if (!Array.isArray(record.runSteps) || record.runSteps.length > 10) return null;
  const runSteps = record.runSteps.map((step) => text(step, 320)).filter((step): step is string => Boolean(step));
  if (runSteps.length !== record.runSteps.length || (kind === "lesson" && runSteps.length === 0)) return null;
  return { id, kind: kind as TtocDayPlanBlockKind, importKey, sourceId, subject, title, startTime, timing, runSteps, notes };
}

/** Guards device-local data before it reaches the rendered plan. */
export function parseTtocDayPlan(value: unknown): TtocDayPlanData | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (record.version !== 1 || !Array.isArray(record.blocks) || record.blocks.length > 24) return null;
  const date = text(record.date, 10, true);
  const essentials = parseEssentials(record.essentials);
  if (date === null || !essentials || (date && !/^\d{4}-\d{2}-\d{2}$/.test(date))) return null;
  const blocks = record.blocks.map(parseBlock);
  if (blocks.some((block) => block === null)) return null;
  const validBlocks = blocks as TtocDayPlanBlock[];
  if (new Set(validBlocks.map((block) => block.id)).size !== validBlocks.length) return null;
  return { version: 1, date, essentials, blocks: validBlocks };
}

/** Converts any Generic, Social, or Science renderer's plain lesson data. */
export function lessonBlockFrom(lesson: TtocDayPlanLesson): TtocDayPlanBlock {
  const sourceId = text(lesson.sourceId, 120) ?? "current-lesson";
  const subject = text(lesson.subject, 80) ?? "Learning block";
  const title = text(lesson.title, 180) ?? "Current lesson";
  const timing = text(lesson.timing, 80, true) ?? "";
  const runSteps = lesson.runSteps.slice(0, 10).map((step) => text(step, 320)).filter((step): step is string => Boolean(step));
  return {
    id: createId("lesson"),
    kind: "lesson",
    sourceId,
    subject,
    title,
    startTime: "",
    timing,
    runSteps: runSteps.length ? runSteps : ["Open the lesson and follow the projected class route."],
    notes: text(lesson.notes ?? "", PLAN_BLOCK_NOTE_MAX, true) ?? "",
  };
}

export function simpleBlockFrom(kind: Exclude<TtocDayPlanBlockKind, "lesson">): TtocDayPlanBlock {
  const copy = {
    transition: { subject: "DAY FLOW", title: "Transition", timing: "5 min" },
    recess: { subject: "BREAK", title: "Recess", timing: "15 min" },
    lunch: { subject: "BREAK", title: "Lunch", timing: "45 min" },
  }[kind];
  return { id: createId(kind), kind, ...copy, startTime: "", runSteps: [], notes: "" };
}

/** Converts a validated weekly block while retaining enough provenance to make re-imports safe. */
export function dayPlanBlockFromWeeklyBlock(block: WeeklyPlanBlock, weekOf: string): TtocDayPlanBlock {
  const kind = block.kind as TtocDayPlanBlockKind;
  const runSteps = block.runSteps.slice(0, 10).map((step) => text(step, 320)).filter((step): step is string => Boolean(step));
  return {
    id: createId(kind),
    kind,
    importKey: `weekly:${weekOf}:${block.day}:${block.id}`,
    sourceId: block.sourceId,
    subject: text(block.subject, 80) ?? "Learning block",
    title: text(block.title, 180) ?? "Scheduled block",
    startTime: text(block.startTime, 8, true) ?? "",
    timing: text(block.timing, 80, true) ?? "",
    runSteps: kind === "lesson" && !runSteps.length ? ["Open the matching lesson and follow its projected class route."] : runSteps,
    notes: text(block.notes, PLAN_BLOCK_NOTE_MAX, true) ?? "",
  };
}

/** Pure, capacity-safe merge used by the UI and tests. */
export function mergeWeeklyDayIntoTtocPlan(plan: TtocDayPlanData, weeklyPlan: WeeklyPlanData, day: Weekday): TtocWeekImportResult {
  const sourceBlocks = weeklyPlan.blocks.filter((block) => block.day === day);
  if (!sourceBlocks.length) {
    return { plan, added: 0, duplicates: 0, blocked: 0, sourceCount: 0, status: "empty" };
  }

  const targetDate = dateForWeekday(weeklyPlan.weekOf, day);
  if (plan.blocks.length > 0 && plan.date && plan.date !== targetDate) {
    return { plan, added: 0, duplicates: 0, blocked: 0, sourceCount: sourceBlocks.length, status: "date-conflict" };
  }

  const existingImportKeys = new Set(plan.blocks.map((block) => block.importKey).filter((key): key is string => Boolean(key)));
  const existingLessonIds = new Set(plan.blocks.filter((block) => block.kind === "lesson").map((block) => block.sourceId).filter((id): id is string => Boolean(id)));
  const candidates = sourceBlocks
    .map((block) => dayPlanBlockFromWeeklyBlock(block, weeklyPlan.weekOf))
    .filter((block) => {
      if (block.importKey && existingImportKeys.has(block.importKey)) return false;
      return !(block.kind === "lesson" && block.sourceId && existingLessonIds.has(block.sourceId));
    });
  const room = Math.max(0, 24 - plan.blocks.length);
  const additions = candidates.slice(0, room);
  const nextPlan = additions.length
    ? { ...plan, date: targetDate, blocks: [...plan.blocks, ...additions] }
    : plan.date === targetDate ? plan : { ...plan, date: targetDate };
  return {
    plan: nextPlan,
    added: additions.length,
    duplicates: sourceBlocks.length - candidates.length,
    blocked: candidates.length - additions.length,
    sourceCount: sourceBlocks.length,
    status: "imported",
  };
}

function readPlan(storageKey: string) {
  try {
    const stored = window.localStorage.getItem(storageKey);
    const parsed = stored ? parseTtocDayPlan(JSON.parse(stored)) : null;
    return parsed ? { ...parsed, essentials: { ...emptyTtocEssentials(), noTechRoute: parsed.essentials.noTechRoute } } : null;
  } catch {
    return null;
  }
}

function planForDeviceStorage(plan: TtocDayPlanData): TtocDayPlanData {
  return { ...plan, essentials: { ...emptyTtocEssentials(), noTechRoute: plan.essentials.noTechRoute } };
}

/** Adds one prepared lesson without requiring the full day-plan workspace to be open. */
export function addLessonToDevicePlan(lesson: TtocDayPlanLesson, storageKey = TTOC_DAY_PLAN_STORAGE_KEY): "added" | "exists" | "blocked" {
  const current = readPlan(storageKey) ?? emptyPlan(todayForInput());
  if (current.blocks.some((block) => block.kind === "lesson" && block.sourceId === lesson.sourceId)) return "exists";
  if (current.blocks.length >= 24) return "blocked";
  const next = { ...current, blocks: [...current.blocks, lessonBlockFrom(lesson)] } satisfies TtocDayPlanData;
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(planForDeviceStorage(next)));
    window.dispatchEvent(new Event(TTOC_DAY_PLAN_CHANGE_EVENT));
    return "added";
  } catch {
    return "blocked";
  }
}

/** Compact primary action for a TeacherRunSheet or another teacher renderer. */
export function AddToDayPlanButton({ lesson, storageKey = TTOC_DAY_PLAN_STORAGE_KEY, label = "Add to TTOC day", className = "" }: AddToDayPlanButtonProps) {
  const [result, setResult] = useState<"idle" | "added" | "exists" | "blocked">("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
  }, []);

  const add = () => {
    setResult(addLessonToDevicePlan(lesson, storageKey));
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setResult("idle"), 2200);
  };

  return (
    <button
      type="button"
      className={`add-to-ttoc-day ${className}`.trim()}
      data-result={result}
      aria-label={`${label}: ${lesson.title}`}
      onClick={add}
    >
      <span aria-hidden="true">{result === "added" || result === "exists" ? "✓" : result === "blocked" ? "!" : "+"}</span>
      <b>{result === "added" ? "Added to the day" : result === "exists" ? "Already in the day" : result === "blocked" ? "Day is full or cannot save" : label}</b>
    </button>
  );
}

export function TtocDayPlan({ currentLesson, storageKey = TTOC_DAY_PLAN_STORAGE_KEY, heading = "Build the TTOC day", showCurrentLesson = Boolean(currentLesson), weekImportOptions = [] }: TtocDayPlanProps) {
  const [plan, setPlan] = useState<TtocDayPlanData>(() => emptyPlan());
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("Loading the plan saved on this device…");
  const [selectedWeekId, setSelectedWeekId] = useState(weekImportOptions[0]?.id ?? "");
  const [selectedWeekday, setSelectedWeekday] = useState<Weekday>(weekImportOptions[0]?.defaultWeekday ?? "monday");
  const headingId = useId();
  const planRef = useRef<HTMLElement>(null);
  const selectedWeek = weekImportOptions.find((option) => option.id === selectedWeekId) ?? weekImportOptions[0];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = readPlan(storageKey);
      setPlan(stored ?? emptyPlan(todayForInput()));
      setReady(true);
      setStatus(stored ? "Saved day plan opened." : "A new day plan is ready.");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [storageKey]);

  useEffect(() => {
    const syncFromDevice = () => {
      const stored = readPlan(storageKey);
      if (stored) {
        setPlan(stored);
        setStatus("The lesson was added to this day plan.");
      }
    };
    const syncFromAnotherTab = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) syncFromDevice();
    };
    window.addEventListener(TTOC_DAY_PLAN_CHANGE_EVENT, syncFromDevice);
    window.addEventListener("storage", syncFromAnotherTab);
    return () => {
      window.removeEventListener(TTOC_DAY_PLAN_CHANGE_EVENT, syncFromDevice);
      window.removeEventListener("storage", syncFromAnotherTab);
    };
  }, [storageKey]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(planForDeviceStorage(plan)));
    } catch {
      window.setTimeout(() => setStatus("This browser blocked saving. Keep this tab open or print the plan now."), 0);
    }
  }, [plan, ready, storageKey]);

  const addLesson = () => {
    if (!currentLesson) return;
    setPlan((current) => {
      if (current.blocks.some((block) => block.kind === "lesson" && block.sourceId === currentLesson.sourceId)) {
        setStatus(`${currentLesson.title} is already in the day.`);
        return current;
      }
      if (current.blocks.length >= 24) {
        setStatus("The day already has the maximum of 24 blocks.");
        return current;
      }
      setStatus(`${currentLesson.title} added to the day.`);
      return { ...current, blocks: [...current.blocks, lessonBlockFrom(currentLesson)] };
    });
  };

  const addSimpleBlock = (kind: Exclude<TtocDayPlanBlockKind, "lesson">) => {
    const block = simpleBlockFrom(kind);
    setPlan((current) => {
      if (current.blocks.length >= 24) {
        setStatus("The day already has the maximum of 24 blocks.");
        return current;
      }
      setStatus(`${block.title} added to the day.`);
      return { ...current, blocks: [...current.blocks, block] };
    });
  };

  const importSelectedDay = () => {
    if (!selectedWeek) return;
    const stored = readWeeklyPlan(selectedWeek.storageKey);
    const normalized = stored ? normalizePlanForStorageKey(stored, selectedWeek.storageKey) : null;
    const weeklyPlan = normalized
      ? mergeWeekPlanSeed(normalized, selectedWeek.seed)
      : weeklyPlanFromSeed(selectedWeek.seed);
    const weekdayLabel = selectedWeekday[0].toUpperCase() + selectedWeekday.slice(1);
    setPlan((current) => {
      const result = mergeWeeklyDayIntoTtocPlan(current, weeklyPlan, selectedWeekday);
      if (result.status === "empty") {
        setStatus(`${selectedWeek.label} has no ${weekdayLabel} blocks to import.`);
      } else if (result.status === "date-conflict") {
        setStatus(`This plan already has blocks for ${current.date}. Clear those day blocks before importing ${dateForWeekday(weeklyPlan.weekOf, selectedWeekday)}.`);
      } else if (result.added === 0 && result.duplicates > 0) {
        setStatus(`${weekdayLabel} is already up to date in this TTOC plan.`);
      } else {
        const duplicateNote = result.duplicates ? ` ${result.duplicates} already present.` : "";
        const blockedNote = result.blocked ? ` ${result.blocked} could not fit because the day is full.` : "";
        setStatus(`Imported ${result.added} ${result.added === 1 ? "block" : "blocks"} from ${selectedWeek.label}.${duplicateNote}${blockedNote}`);
      }
      return result.plan;
    });
  };

  const updateEssentials = (field: keyof TtocDayPlanEssentials, value: string) => {
    setPlan((current) => ({ ...current, essentials: { ...current.essentials, [field]: value } }));
    setStatus("Essentials save automatically on this teacher device.");
  };

  const updateBlock = (id: string, update: Partial<Pick<TtocDayPlanBlock, "title" | "startTime" | "timing" | "notes">>) => {
    setPlan((current) => ({ ...current, blocks: current.blocks.map((block) => block.id === id ? { ...block, ...update } : block) }));
    setStatus("Changes save automatically on this teacher device.");
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    setPlan((current) => {
      const destination = index + direction;
      if (destination < 0 || destination >= current.blocks.length) return current;
      const blocks = [...current.blocks];
      [blocks[index], blocks[destination]] = [blocks[destination], blocks[index]];
      return { ...current, blocks };
    });
    setStatus("Day order updated.");
  };

  const removeBlock = (id: string) => {
    setPlan((current) => ({ ...current, blocks: current.blocks.filter((block) => block.id !== id) }));
    setStatus("Block removed from the day.");
  };

  const clearPlan = () => {
    if (!plan.blocks.length) return;
    if (!window.confirm("Clear all day blocks from this TTOC plan? Your private Essentials will be kept.")) return;
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // State still clears for this open tab when storage is unavailable.
    }
    setPlan({ ...emptyPlan(plan.date || todayForInput()), essentials: plan.essentials });
    setStatus("Day blocks cleared. Your private Essentials were kept.");
  };

  const printWholeDay = () => {
    if (!planRef.current || !plan.blocks.length) return;
    document.body.classList.add("print-target-active");
    planRef.current.classList.add("print-target");
    try {
      window.print();
      setStatus("The complete day plan is ready to print or save as a PDF.");
    } finally {
      planRef.current.classList.remove("print-target");
      document.body.classList.remove("print-target-active");
    }
  };

  return (
    <section ref={planRef} className="ttoc-day-plan" aria-labelledby={headingId} data-ready={ready || undefined}>
      <header className="ttoc-day-plan__header">
        <div>
          <small>TTOC PLAN</small>
          <h2 id={headingId}>{heading}</h2>
        </div>
        <label>
          <span>DAY</span>
          <input type="date" value={plan.date} onChange={(event) => { setPlan((current) => ({ ...current, date: event.target.value })); setStatus("Changes save automatically on this teacher device."); }} />
          <b className="ttoc-day-plan__print-value">{plan.date || "Date not set"}</b>
        </label>
      </header>
      <PlanningPrivacyNote />

      {showCurrentLesson && currentLesson && <section className="ttoc-day-plan__add-current" aria-label="Add the current lesson">
        <div><small>CURRENT LESSON</small><strong>{currentLesson.subject} · {currentLesson.title}</strong><span>{currentLesson.timing}</span></div>
        <button type="button" onClick={addLesson}>+ Add this lesson to the day</button>
      </section>}

      {weekImportOptions.length > 0 && <section className="ttoc-day-plan__week-import" aria-labelledby="ttoc-week-import-title">
        <div>
          <small>BUILD FROM THE SAVED WEEK</small>
          <strong id="ttoc-week-import-title">Import day from Week Plan</strong>
        </div>
        <label>
          <span>WEEK</span>
          <select value={selectedWeek?.id ?? ""} onChange={(event) => {
            const nextId = event.target.value;
            setSelectedWeekId(nextId);
            const nextWeek = weekImportOptions.find((option) => option.id === nextId);
            if (nextWeek?.defaultWeekday) setSelectedWeekday(nextWeek.defaultWeekday);
          }}>
            {weekImportOptions.map((option) => <option value={option.id} key={option.id}>{option.label}</option>)}
          </select>
        </label>
        <label>
          <span>DAY</span>
          <select value={selectedWeekday} onChange={(event) => setSelectedWeekday(event.target.value as Weekday)}>
            {WEEKDAYS.map((day) => <option value={day} key={day}>{day[0].toUpperCase() + day.slice(1)}</option>)}
          </select>
        </label>
        <button type="button" onClick={importSelectedDay}>Import selected day</button>
        <p>Imported block notes must contain only non-confidential directions; keep student-specific information in the district-approved private record.</p>
      </section>}

      <section className="ttoc-day-plan__essentials" aria-labelledby="ttoc-essentials-title">
        <header>
          <div><small>GENERAL PROCEDURES ONLY</small><strong id="ttoc-essentials-title">TTOC Essentials</strong></div>
          <p>Attendance, emergency, supervision, and dismissal text is available for immediate printing but is deliberately not saved by this site.</p>
        </header>
        <div>
          <label>
            <span>ATTENDANCE</span>
            <textarea value={plan.essentials.attendance} maxLength={600} rows={2} placeholder="General process only — no names, identifiers, or access codes." onChange={(event) => updateEssentials("attendance", event.target.value)} />
            <p className="ttoc-day-plan__print-value">{plan.essentials.attendance || "Not added — complete before leaving this plan."}</p>
          </label>
          <label>
            <span>OFFICE / EMERGENCY</span>
            <textarea value={plan.essentials.officeEmergency} maxLength={600} rows={2} placeholder="General office route only — keep contacts, codes, medical and safety details in the approved private plan." onChange={(event) => updateEssentials("officeEmergency", event.target.value)} />
            <p className="ttoc-day-plan__print-value">{plan.essentials.officeEmergency || "Not added — complete before leaving this plan."}</p>
          </label>
          <label>
            <span>SUPERVISION / SPECIALISTS</span>
            <textarea value={plan.essentials.supervisionSpecialists} maxLength={600} rows={2} placeholder="General duty and transition route only — no student information." onChange={(event) => updateEssentials("supervisionSpecialists", event.target.value)} />
            <p className="ttoc-day-plan__print-value">{plan.essentials.supervisionSpecialists || "Not added — complete before leaving this plan."}</p>
          </label>
          <label>
            <span>DISMISSAL</span>
            <textarea value={plan.essentials.dismissal} maxLength={600} rows={2} placeholder="General routine only — keep student-specific exceptions in the approved private plan." onChange={(event) => updateEssentials("dismissal", event.target.value)} />
            <p className="ttoc-day-plan__print-value">{plan.essentials.dismissal || "Not added — complete before leaving this plan."}</p>
          </label>
          <label className="ttoc-day-plan__essentials-wide">
            <span>NO-TECH ROUTE</span>
            <textarea value={plan.essentials.noTechRoute} maxLength={600} rows={2} placeholder="Blank — add the paper, board, book, or discussion route if links or projection fail." onChange={(event) => updateEssentials("noTechRoute", event.target.value)} />
            <p className="ttoc-day-plan__print-value">{plan.essentials.noTechRoute || "Not added — complete before leaving this plan."}</p>
          </label>
        </div>
      </section>

      <div className="ttoc-day-plan__day-parts" role="group" aria-label="Add a day part">
        <span>Add:</span>
        <button type="button" onClick={() => addSimpleBlock("transition")}>+ Transition</button>
        <button type="button" onClick={() => addSimpleBlock("recess")}>+ Recess</button>
        <button type="button" onClick={() => addSimpleBlock("lunch")}>+ Lunch</button>
      </div>

      {plan.blocks.length === 0 ? (
        <div className="ttoc-day-plan__empty">
          <b>Nothing scheduled yet.</b>
          <p>{weekImportOptions.length > 0 ? "Choose a week and weekday above, or open a lesson and choose Add to TTOC day. Then add any missing breaks or transitions." : "Open a lesson and choose Add to TTOC day. Add breaks or transitions here in the order they happen."}</p>
        </div>
      ) : (
        <ol className="ttoc-day-plan__blocks">
          {plan.blocks.map((block, index) => (
            <li key={block.id} className="ttoc-day-plan__block" data-kind={block.kind}>
              <header>
                <span className="ttoc-day-plan__number">{index + 1}</span>
                <div className="ttoc-day-plan__identity">
                  <small>{block.subject}</small>
                  <label><span>BLOCK / SESSION</span><input type="text" value={block.title} maxLength={180} aria-label={`Block or session title for ${block.title}`} onChange={(event) => updateBlock(block.id, { title: event.target.value })} /><b className="ttoc-day-plan__print-value">{block.title}</b></label>
                </div>
                <label>
                  <span>START</span>
                  <input type="time" value={block.startTime} aria-label={`Start time for ${block.title}`} onChange={(event) => updateBlock(block.id, { startTime: event.target.value })} />
                  <b className="ttoc-day-plan__print-value">{block.startTime || "—"}</b>
                </label>
                <label>
                  <span>LENGTH</span>
                  <input type="text" value={block.timing} maxLength={80} aria-label={`Length of ${block.title}`} onChange={(event) => updateBlock(block.id, { timing: event.target.value })} />
                  <b className="ttoc-day-plan__print-value">{block.timing || "Flexible"}</b>
                </label>
                <div className="ttoc-day-plan__order" role="group" aria-label={`Reorder ${block.title}`}>
                  <button type="button" disabled={index === 0} onClick={() => moveBlock(index, -1)} aria-label={`Move ${block.title} earlier`}>↑</button>
                  <button type="button" disabled={index === plan.blocks.length - 1} onClick={() => moveBlock(index, 1)} aria-label={`Move ${block.title} later`}>↓</button>
                  <button type="button" className="remove" onClick={() => removeBlock(block.id)} aria-label={`Remove ${block.title}`}>×</button>
                </div>
              </header>

              {block.runSteps.length > 0 && (
                <section>
                  <small>RUN IT</small>
                  <ol>{block.runSteps.map((step, stepIndex) => <li key={`${step}-${stepIndex}`}>{step}</li>)}</ol>
                </section>
              )}

              <label className="ttoc-day-plan__notes">
                <span>{block.kind === "lesson" ? "NOTES FOR THE TTOC" : "DETAILS / DUTY / WHERE TO GO"}</span>
                <textarea value={block.notes} maxLength={PLAN_BLOCK_NOTE_MAX} rows={2} placeholder={block.kind === "lesson" ? "Only non-confidential directions needed to run this block." : "Optional non-confidential details"} onChange={(event) => updateBlock(block.id, { notes: event.target.value })} />
                <p className="ttoc-day-plan__print-value">{block.notes || "—"}</p>
              </label>
            </li>
          ))}
        </ol>
      )}

      <footer className="ttoc-day-plan__footer">
        <p role="status" aria-live="polite">{status}</p>
        <div>
          <button type="button" className="clear" disabled={!plan.blocks.length} onClick={clearPlan}>Clear day blocks</button>
          <button type="button" className="print" disabled={!plan.blocks.length} onClick={printWholeDay}>Print TTOC plan</button>
        </div>
      </footer>
    </section>
  );
}
