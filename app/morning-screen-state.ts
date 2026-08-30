/**
 * Device-local, student-safe state for the classroom Morning Screen.
 *
 * A separate storage key is used for each Vancouver calendar date. Drafts are
 * deliberately not stored here: only a teacher's explicit publish action may
 * write a record that the projector view can read.
 */

export const MORNING_SCREEN_STORAGE_PREFIX = "wyatt-morning-screen-v1";
export const MORNING_SCREEN_CHANGE_EVENT = "wyatt:morning-screen-change";
export const MORNING_SCREEN_TIME_ZONE = "America/Vancouver";
export const MAX_MORNING_ITEMS = 3;

export type MorningActivityId =
  | "riddle-room"
  | "image-clues"
  | "mistake-catch"
  | "number-puzzle"
  | "nature-clues"
  | "news-lens";

export type MorningActivity = {
  id: MorningActivityId;
  label: string;
  title: string;
  prompt: string;
  move: string;
  imageSrc: string;
  imageAlt: string;
  sourceCard?: {
    label: string;
    text: string;
    credit: string;
    url: string;
    checkedOn: string;
  };
};

export const MORNING_ACTIVITY_BANK: readonly MorningActivity[] = Object.freeze([
  Object.freeze({
    id: "riddle-room" as const,
    label: "RIDDLE ROOM",
    title: "How many sensible groups can you make?",
    prompt: "Study the mystery table. Make one group of three objects and name the rule. Now make a different group using at least one of the same objects.",
    move: "Compare rules with a partner. Choose the grouping that uses the strongest visible evidence, then invent one odd-one-out riddle.",
    imageSrc: "/images/visual-review/morning-mystery-table-v1.webp",
    imageAlt: "Overhead mystery table filled with varied ordinary objects for grouping and riddles",
  }),
  Object.freeze({
    id: "image-clues" as const,
    label: "IMAGE CLUES",
    title: "What changed after the rain?",
    prompt: "Record three details you can actually see. Then make one inference about what happened before this moment and name the clue that supports it.",
    move: "Share with a partner. Your partner points to the strongest clue and offers one different possible explanation.",
    imageSrc: "/images/visual-review/morning-arrival-after-rain-v1.webp",
    imageAlt: "Illustrated school arrival scene after rain with puddles, wet surfaces, footprints, and changing clouds",
  }),
  Object.freeze({
    id: "mistake-catch" as const,
    label: "CROP DETECTIVE",
    title: "What might be outside the frame?",
    prompt: "Study the courtyard image. List three details the frame proves, then name one tempting conclusion the frame cannot prove by itself.",
    move: "Compare with a partner. Agree on one wider view or source you would need before making the conclusion.",
    imageSrc: "/images/source-mosaic-courtyard-heat-investigation.webp",
    imageAlt: "A cropped school courtyard scene used for a source investigation",
  }),
  Object.freeze({
    id: "number-puzzle" as const,
    label: "NUMBER PUZZLE",
    title: "Build exactly one full turn",
    prompt: "A full turn is 360°. Find three different combinations of 45°, 90°, and 180° turns that total exactly 360°.",
    move: "Sketch one solution, then trade with a partner and check every angle before finding a different solution.",
    imageSrc: "/images/angle-expedition-printable-line-art.png",
    imageAlt: "Black-and-white angle expedition line art showing turns and pathways",
  }),
  Object.freeze({
    id: "nature-clues" as const,
    label: "NATURE CLUES",
    title: "What can this tiny scene tell us?",
    prompt: "Find four details in the close-up nature scene. Sort each one as living, non-living, evidence of change, or still uncertain.",
    move: "Build one careful claim with a partner: We think ___ because we can see ___. Add one question the image cannot answer.",
    imageSrc: "/images/visual-review/morning-nature-clues-v1.webp",
    imageAlt: "Close-up illustrated nature scene with leaf, moss, water droplets, small tracks, and weather clues",
  }),
  Object.freeze({
    id: "news-lens" as const,
    label: "NEWS LENS",
    title: "Now, next, or not proven?",
    prompt: "Read the dated excerpt. Underline the words that describe what was happening then. Circle one detail you would verify on the full source before making a larger claim.",
    move: "Compare with a partner. Repair this sentence: ‘The extension is open now.’ Keep the evidence date and the future plan separate.",
    imageSrc: "/images/visual-review/newsroom-source-desk-v1.webp",
    imageAlt: "Illustrated source desk with a news page, map, photograph, date card, and evidence notes",
    sourceCard: {
      label: "BC GOVERNMENT NEWS RELEASE · MAY 8, 2026",
      text: "All eight stations along the 16-kilometre extension are now under construction.",
      credit: "Province of British Columbia · Ministry of Transportation and Transit",
      url: "https://archive.news.gov.bc.ca/releases/news_releases_2024-2028/2026TT0022-000515.htm",
      checkedOn: "2026-08-20",
    },
  }),
]);

const activityIds = new Set<MorningActivityId>(MORNING_ACTIVITY_BANK.map((activity) => activity.id));
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const officialSchoolUrl = "https://www.surreyschools.ca/walnutroad";
const openMeteoUrl = "https://open-meteo.com/";

export type MorningSource = {
  kind: "school" | "weather";
  label: string;
  url: string;
  fetchedAt: string;
};

export type MorningScreenItem = {
  text: string;
  source?: MorningSource;
};

export type MorningWeather = {
  summary: string;
  highC: number | null;
  lowC: number | null;
  rainChance: number | null;
  source: MorningSource;
};

export type MorningScreenDraft = {
  version: 1;
  date: string;
  greeting: string;
  announcements: MorningScreenItem[];
  reminders: MorningScreenItem[];
  activityId: MorningActivityId;
  activityPrompt: string;
  weather: MorningWeather | null;
};

export type MorningScreenRecord = MorningScreenDraft & {
  publishedAt: string;
};

type CacheEntry = {
  serialized: string | null;
  record: MorningScreenRecord | null;
};

const cache = new Map<string, CacheEntry>();
const listeners = new Map<string, Set<() => void>>();
let browserListenersStarted = false;

function text(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
  return cleaned && cleaned.length <= maxLength ? cleaned : null;
}

function finiteNumber(value: unknown, minimum: number, maximum: number) {
  if (value === null) return null;
  return typeof value === "number" && Number.isFinite(value) && value >= minimum && value <= maximum
    ? Math.round(value)
    : null;
}

export function isIsoDateKey(value: unknown): value is string {
  if (typeof value !== "string" || !isoDatePattern.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function vancouverDateKey(at: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: MORNING_SCREEN_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(at);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function morningScreenStorageKey(date: string) {
  if (!isIsoDateKey(date)) throw new TypeError("A valid ISO date is required for the Morning Screen.");
  return `${MORNING_SCREEN_STORAGE_PREFIX}:${date}`;
}

export function suggestedMorningActivityId(date: string): MorningActivityId {
  if (!isIsoDateKey(date)) return "riddle-room";
  const dayIndex = Math.floor(Date.parse(`${date}T12:00:00Z`) / 86_400_000);
  return MORNING_ACTIVITY_BANK[Math.abs(dayIndex) % MORNING_ACTIVITY_BANK.length].id;
}

export function getMorningActivity(id: MorningActivityId) {
  return MORNING_ACTIVITY_BANK.find((activity) => activity.id === id) ?? MORNING_ACTIVITY_BANK[0];
}

function parseSource(value: unknown, expectedKind?: MorningSource["kind"]): MorningSource | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const kind = record.kind;
  if (kind !== "school" && kind !== "weather") return null;
  if (expectedKind && kind !== expectedKind) return null;
  const label = text(record.label, 80);
  const fetchedAt = typeof record.fetchedAt === "string" && Number.isFinite(Date.parse(record.fetchedAt))
    ? new Date(record.fetchedAt).toISOString()
    : null;
  const allowedUrl = kind === "school" ? officialSchoolUrl : openMeteoUrl;
  if (!label || !fetchedAt || record.url !== allowedUrl) return null;
  return { kind, label, url: allowedUrl, fetchedAt };
}

function parseItem(value: unknown): MorningScreenItem | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const itemText = text(record.text, 160);
  if (!itemText) return null;
  const source = parseSource(record.source, "school");
  return source ? { text: itemText, source } : { text: itemText };
}

function parseItems(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, MAX_MORNING_ITEMS).map(parseItem).filter((item): item is MorningScreenItem => Boolean(item));
}

function parseWeather(value: unknown): MorningWeather | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const summary = text(record.summary, 80);
  const source = parseSource(record.source, "weather");
  if (!summary || !source) return null;
  return {
    summary,
    highC: finiteNumber(record.highC, -60, 60),
    lowC: finiteNumber(record.lowC, -60, 60),
    rainChance: finiteNumber(record.rainChance, 0, 100),
    source,
  };
}

function parseDraftFields(value: unknown): MorningScreenDraft | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (record.version !== 1 || !isIsoDateKey(record.date)) return null;
  const greeting = text(record.greeting, 90);
  const activityId = record.activityId;
  const activityPrompt = text(record.activityPrompt, 360);
  if (!greeting || typeof activityId !== "string" || !activityIds.has(activityId as MorningActivityId) || !activityPrompt) return null;
  return {
    version: 1,
    date: record.date,
    greeting,
    announcements: parseItems(record.announcements),
    reminders: parseItems(record.reminders),
    activityId: activityId as MorningActivityId,
    activityPrompt,
    weather: parseWeather(record.weather),
  };
}

export function parseMorningScreenDraft(value: unknown): MorningScreenDraft | null {
  return parseDraftFields(value);
}

export function parseMorningScreenRecord(value: unknown): MorningScreenRecord | null {
  const draft = parseDraftFields(value);
  if (!draft || !value || typeof value !== "object" || Array.isArray(value)) return null;
  const publishedAt = (value as Record<string, unknown>).publishedAt;
  if (typeof publishedAt !== "string" || !Number.isFinite(Date.parse(publishedAt))) return null;
  return Object.freeze({ ...draft, publishedAt: new Date(publishedAt).toISOString() });
}

export function createMorningScreenDraft(date = vancouverDateKey()): MorningScreenDraft {
  const safeDate = isIsoDateKey(date) ? date : vancouverDateKey();
  const activityId = suggestedMorningActivityId(safeDate);
  return {
    version: 1,
    date: safeDate,
    greeting: "Good morning, Grade 6!",
    announcements: [],
    reminders: [],
    activityId,
    activityPrompt: getMorningActivity(activityId).prompt,
    weather: null,
  };
}

export function draftFromMorningScreen(record: MorningScreenRecord): MorningScreenDraft {
  const parsed = parseMorningScreenRecord(record);
  if (!parsed) return createMorningScreenDraft(record.date);
  const { publishedAt: _publishedAt, ...draft } = parsed;
  return {
    ...draft,
    announcements: draft.announcements.map((item) => ({ ...item, source: item.source ? { ...item.source } : undefined })),
    reminders: draft.reminders.map((item) => ({ ...item, source: item.source ? { ...item.source } : undefined })),
    weather: draft.weather ? { ...draft.weather, source: { ...draft.weather.source } } : null,
  };
}

function readSerialized(date: string) {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(morningScreenStorageKey(date));
  } catch {
    return null;
  }
}

function parseSerialized(serialized: string | null) {
  if (!serialized) return null;
  try {
    return parseMorningScreenRecord(JSON.parse(serialized));
  } catch {
    return null;
  }
}

function updateCache(date: string, serialized: string | null, known?: MorningScreenRecord | null) {
  const current = cache.get(date);
  if (current?.serialized === serialized) return false;
  cache.set(date, { serialized, record: known === undefined ? parseSerialized(serialized) : known });
  return true;
}

function ensureCache(date: string) {
  if (!cache.has(date)) updateCache(date, readSerialized(date));
  return cache.get(date)?.record ?? null;
}

function notify(date: string) {
  for (const listener of listeners.get(date) ?? []) listener();
}

function handleMorningChange(event: Event) {
  const date = event instanceof CustomEvent && isIsoDateKey(event.detail) ? event.detail : null;
  if (date) notify(date);
}

function handleStorage(event: StorageEvent) {
  if (!event.key?.startsWith(`${MORNING_SCREEN_STORAGE_PREFIX}:`)) return;
  const date = event.key.slice(MORNING_SCREEN_STORAGE_PREFIX.length + 1);
  if (!isIsoDateKey(date)) return;
  updateCache(date, event.newValue);
  notify(date);
}

function startBrowserListeners() {
  if (browserListenersStarted || typeof window === "undefined") return;
  window.addEventListener(MORNING_SCREEN_CHANGE_EVENT, handleMorningChange);
  window.addEventListener("storage", handleStorage);
  browserListenersStarted = true;
}

function stopBrowserListeners() {
  if (!browserListenersStarted || typeof window === "undefined") return;
  window.removeEventListener(MORNING_SCREEN_CHANGE_EVENT, handleMorningChange);
  window.removeEventListener("storage", handleStorage);
  browserListenersStarted = false;
}

export function subscribeMorningScreen(date: string, listener: () => void) {
  if (!isIsoDateKey(date)) return () => {};
  ensureCache(date);
  const dateListeners = listeners.get(date) ?? new Set<() => void>();
  dateListeners.add(listener);
  listeners.set(date, dateListeners);
  startBrowserListeners();
  return () => {
    dateListeners.delete(listener);
    if (!dateListeners.size) listeners.delete(date);
    if (!listeners.size) stopBrowserListeners();
  };
}

export function getMorningScreenSnapshot(date: string) {
  return isIsoDateKey(date) ? ensureCache(date) : null;
}

export function getMorningScreenServerSnapshot(): MorningScreenRecord | null {
  return null;
}

export function publishMorningScreen(value: MorningScreenDraft, at: Date = new Date()) {
  const draft = parseMorningScreenDraft(value);
  if (!draft) throw new TypeError("Morning Screen draft contains invalid or unsafe fields.");
  const record = parseMorningScreenRecord({ ...draft, publishedAt: at.toISOString() });
  if (!record) throw new TypeError("Morning Screen record could not be published.");
  const serialized = JSON.stringify(record);
  let stored = false;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(morningScreenStorageKey(record.date), serialized);
      stored = true;
    } catch {
      // The in-memory cache still supports this open classroom session.
    }
  }
  updateCache(record.date, serialized, record);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(MORNING_SCREEN_CHANGE_EVENT, { detail: record.date }));
  }
  return { record, stored };
}
