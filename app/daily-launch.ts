/**
 * Device-local "today" state for the classroom home screen.
 *
 * This is intentionally a tiny external store. A cached snapshot is replaced
 * only when the stored value changes, so React's useSyncExternalStore receives
 * the same object between writes instead of entering a render loop.
 */

export type DailyLaunchKind = "generic" | "social" | "science";

type DailyLaunchCopy = {
  readonly worldId: string;
  readonly subject: string;
  readonly unit: string;
  readonly title: string;
  readonly question: string;
  readonly firstAction: string;
  readonly finish: string;
};

export type GenericDailyLaunch = DailyLaunchCopy & {
  readonly kind: "generic";
  readonly genericId: string;
};

export type SocialDailyLaunch = DailyLaunchCopy & {
  readonly kind: "social";
  readonly socialId: string;
};

export type ScienceDailyLaunch = DailyLaunchCopy & {
  readonly kind: "science";
  readonly scienceId: string;
};

export type DailyLaunch = GenericDailyLaunch | SocialDailyLaunch | ScienceDailyLaunch;

export const DAILY_LAUNCH_STORAGE_KEY = "wyatt-classroom-daily-launch-v1";
export const DAILY_LAUNCH_CHANGE_EVENT = "wyatt:daily-launch-change";

const safeIdPattern = /^[a-z0-9][a-z0-9-]{0,95}$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const adminLanguagePattern = /\b(?:first[- ]pass|readiness route|registered portfolio|mastery record|session access|teacher[- ]ready|audit complete|curriculum imported|quality[- ]gated)\b/i;

let snapshotReady = false;
let serializedSnapshot: string | null = null;
let snapshot: DailyLaunch | null = null;
let snapshotDate: string | null = null;
const listeners = new Set<() => void>();
let listeningToBrowser = false;
let dateCheckTimer: number | null = null;

/** Calendar date at the classroom in Surrey, independent of server/device timezone. */
export function vancouverDateKey(value = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  if (!year || !month || !day) throw new RangeError("Unable to resolve the Vancouver calendar date.");
  return `${year}-${month}-${day}`;
}

function readText(record: Record<string, unknown>, field: keyof DailyLaunchCopy, maxLength: number) {
  const value = record[field];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength || adminLanguagePattern.test(trimmed)) return null;
  return trimmed;
}

function readId(record: Record<string, unknown>, field: "worldId" | "genericId" | "socialId" | "scienceId") {
  const value = record[field];
  return typeof value === "string" && safeIdPattern.test(value) ? value : null;
}

/**
 * Runtime guard for data read from localStorage. React escapes the text when it
 * renders; this guard also rejects empty, oversized, or administrative copy.
 */
export function parseDailyLaunch(value: unknown): DailyLaunch | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const kind = record.kind;
  if (kind !== "generic" && kind !== "social" && kind !== "science") return null;

  const worldId = readId(record, "worldId");
  const subject = readText(record, "subject", 64);
  const unit = readText(record, "unit", 120);
  const title = readText(record, "title", 160);
  const question = readText(record, "question", 260);
  const firstAction = readText(record, "firstAction", 260);
  const finish = readText(record, "finish", 260);
  if (!worldId || !subject || !unit || !title || !question || !firstAction || !finish) return null;

  const copy = { worldId, subject, unit, title, question, firstAction, finish };
  if (kind === "generic") {
    const genericId = readId(record, "genericId");
    return genericId ? Object.freeze({ ...copy, kind, genericId }) : null;
  }
  if (kind === "social") {
    const socialId = readId(record, "socialId");
    return socialId ? Object.freeze({ ...copy, kind, socialId }) : null;
  }
  const scienceId = readId(record, "scienceId");
  return scienceId ? Object.freeze({ ...copy, kind, scienceId }) : null;
}

export function dailyLaunchContentId(launch: DailyLaunch) {
  if (launch.kind === "generic") return launch.genericId;
  if (launch.kind === "social") return launch.socialId;
  return launch.scienceId;
}

function readStoredValue() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(DAILY_LAUNCH_STORAGE_KEY);
  } catch {
    return null;
  }
}

function parseStoredValue(serialized: string | null, today = vancouverDateKey()) {
  if (!serialized) return null;
  try {
    const value = JSON.parse(serialized);
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const record = value as Record<string, unknown>;
    if (record.version !== 2 || typeof record.activeDate !== "string" || !isoDatePattern.test(record.activeDate)) return null;
    if (record.activeDate !== today) return null;
    return parseDailyLaunch(record.launch);
  } catch {
    return null;
  }
}

function updateSnapshot(serialized: string | null, knownLaunch?: DailyLaunch | null, knownActiveDate?: string) {
  const today = vancouverDateKey();
  if (snapshotReady && serialized === serializedSnapshot && snapshotDate === today) return false;
  serializedSnapshot = serialized;
  snapshot = knownLaunch === undefined
    ? parseStoredValue(serialized, today)
    : knownActiveDate === today
      ? knownLaunch
      : null;
  snapshotDate = today;
  snapshotReady = true;
  return true;
}

function ensureSnapshot() {
  if (!snapshotReady || snapshotDate !== vancouverDateKey()) updateSnapshot(readStoredValue());
  return snapshot;
}

function announceChange() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(DAILY_LAUNCH_CHANGE_EVENT));
}

function notifyListeners() {
  for (const listener of listeners) listener();
}

function handleSameTabChange() {
  // setDailyLaunch and clearDailyLaunch update the cache before dispatching.
  notifyListeners();
}

function handleStorageChange(event: StorageEvent) {
  if (event.key !== DAILY_LAUNCH_STORAGE_KEY && event.key !== null) return;
  updateSnapshot(event.key === DAILY_LAUNCH_STORAGE_KEY ? event.newValue : readStoredValue());
  notifyListeners();
}

function scheduleDateCheck() {
  if (typeof window === "undefined" || typeof window.setTimeout !== "function" || dateCheckTimer !== null) return;
  dateCheckTimer = window.setTimeout(() => {
    dateCheckTimer = null;
    if (updateSnapshot(readStoredValue())) notifyListeners();
    if (listeners.size) scheduleDateCheck();
  }, 30_000);
}

function startBrowserListeners() {
  if (listeningToBrowser || typeof window === "undefined") return;
  window.addEventListener(DAILY_LAUNCH_CHANGE_EVENT, handleSameTabChange);
  window.addEventListener("storage", handleStorageChange);
  listeningToBrowser = true;
  scheduleDateCheck();
}

function stopBrowserListeners() {
  if (!listeningToBrowser || typeof window === "undefined") return;
  window.removeEventListener(DAILY_LAUNCH_CHANGE_EVENT, handleSameTabChange);
  window.removeEventListener("storage", handleStorageChange);
  if (dateCheckTimer !== null && typeof window.clearTimeout === "function") window.clearTimeout(dateCheckTimer);
  dateCheckTimer = null;
  listeningToBrowser = false;
}

/** useSyncExternalStore subscription. */
export function subscribeDailyLaunch(listener: () => void) {
  ensureSnapshot();
  listeners.add(listener);
  startBrowserListeners();
  return () => {
    listeners.delete(listener);
    if (!listeners.size) stopBrowserListeners();
  };
}

/** Stable client snapshot for useSyncExternalStore. */
export function getDailyLaunchSnapshot() {
  return ensureSnapshot();
}

/** Stable server snapshot; the featured mission is used during SSR. */
export function getDailyLaunchServerSnapshot(): DailyLaunch | null {
  return null;
}

/**
 * Pins a mission on this classroom device. Returns false only when the browser
 * blocks localStorage; the current tab still updates for the active session.
 */
export function setDailyLaunch(nextLaunch: DailyLaunch) {
  const launch = parseDailyLaunch(nextLaunch);
  if (!launch) throw new TypeError("Daily launch copy or identifiers are invalid.");
  const activeDate = vancouverDateKey();
  const serialized = JSON.stringify({ version: 2, activeDate, launch });
  let stored = false;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(DAILY_LAUNCH_STORAGE_KEY, serialized);
      stored = true;
    } catch {
      // The in-memory snapshot still gives the current class session a launch.
    }
  }
  updateSnapshot(serialized, launch, activeDate);
  announceChange();
  return stored;
}

/** Clears the pinned mission and reveals the featured fallback. */
export function clearDailyLaunch() {
  let cleared = false;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(DAILY_LAUNCH_STORAGE_KEY);
      cleared = true;
    } catch {
      // Clearing the in-memory snapshot still updates the current tab.
    }
  }
  updateSnapshot(null, null);
  announceChange();
  return cleared;
}
