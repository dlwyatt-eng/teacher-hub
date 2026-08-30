import { MORNING_SCREEN_TIME_ZONE } from "./morning-screen-state";

export const MONTHLY_CALENDAR_STORAGE_PREFIX = "mr-wyatt-monthly-calendar-v1";
export const MONTHLY_CALENDAR_CHANGE_EVENT = "mr-wyatt:monthly-calendar-change";
export const MAX_MONTHLY_CALENDAR_ITEMS = 64;

export type MonthlyCalendarItem = {
  id: string;
  date: string;
  text: string;
};

export type MonthlyCalendarRecord = {
  version: 1;
  month: string;
  items: MonthlyCalendarItem[];
};

export type CalendarCell = {
  date: string;
  day: number;
  inMonth: boolean;
};

const monthPattern = /^\d{4}-(?:0[1-9]|1[0-2])$/;
const datePattern = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
const safeId = /^[a-z0-9][a-z0-9:_-]{0,79}$/i;

function validDate(value: string) {
  if (!datePattern.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function cleanText(value: unknown, maximum: number) {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
  return cleaned && cleaned.length <= maximum ? cleaned : null;
}

export function isMonthKey(value: unknown): value is string {
  return typeof value === "string" && monthPattern.test(value);
}

export function monthlyCalendarStorageKey(month: string) {
  if (!isMonthKey(month)) throw new TypeError("A valid calendar month is required.");
  return `${MONTHLY_CALENDAR_STORAGE_PREFIX}:${month}`;
}

export function emptyMonthlyCalendar(month: string): MonthlyCalendarRecord {
  if (!isMonthKey(month)) throw new TypeError("A valid calendar month is required.");
  return { version: 1, month, items: [] };
}

export function parseMonthlyCalendar(value: unknown): MonthlyCalendarRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (record.version !== 1 || !isMonthKey(record.month) || !Array.isArray(record.items) || record.items.length > MAX_MONTHLY_CALENDAR_ITEMS) return null;
  const items = record.items.map((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const item = value as Record<string, unknown>;
    const id = cleanText(item.id, 80);
    const date = cleanText(item.date, 10);
    const text = cleanText(item.text, 90);
    if (!id || !safeId.test(id) || !date || !validDate(date) || !date.startsWith(`${record.month}-`) || !text) return null;
    return { id, date, text } satisfies MonthlyCalendarItem;
  });
  if (items.some((item) => item === null)) return null;
  const validItems = items as MonthlyCalendarItem[];
  if (new Set(validItems.map((item) => item.id)).size !== validItems.length) return null;
  return { version: 1, month: record.month, items: validItems };
}

export function defaultSchoolMonth(at: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: MORNING_SCREEN_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(at);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  if (!year || !month) throw new RangeError("Unable to resolve the classroom month.");
  return `${year}-${String(month === 7 || month === 8 ? 9 : month).padStart(2, "0")}`;
}

export function shiftMonth(month: string, amount: number) {
  if (!isMonthKey(month) || !Number.isInteger(amount)) return month;
  const [year, monthNumber] = month.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, monthNumber - 1 + amount, 1));
  return `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** A stable six-week grid keeps the calendar from jumping as months change. */
export function calendarCells(month: string): CalendarCell[] {
  if (!isMonthKey(month)) return [];
  const [year, monthNumber] = month.split("-").map(Number);
  const first = new Date(Date.UTC(year, monthNumber - 1, 1));
  const mondayOffset = (first.getUTCDay() + 6) % 7;
  const start = new Date(Date.UTC(year, monthNumber - 1, 1 - mondayOffset));
  return Array.from({ length: 42 }, (_unused, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    return {
      date: date.toISOString().slice(0, 10),
      day: date.getUTCDate(),
      inMonth: date.getUTCMonth() === monthNumber - 1,
    };
  });
}

export function createMonthlyCalendarItem(date: string, value: string): MonthlyCalendarItem | null {
  const text = cleanText(value, 90);
  if (!validDate(date) || !text) return null;
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().slice(0, 12)
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return { id: `event-${random}`, date, text };
}
