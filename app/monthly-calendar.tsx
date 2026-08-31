"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./monthly-calendar.css";
import { yearMonths } from "./classroom-program";
import { printClosest } from "./print-support";
import {
  WEEKDAYS,
  WEEKLY_PLAN_CHANGE_EVENT,
  WEEKLY_PLAN_STORAGE_KEYS,
  dateForWeekday,
  readWeeklyPlan,
} from "./weekly-plan";
import {
  MAX_MONTHLY_CALENDAR_ITEMS,
  MONTHLY_CALENDAR_STORAGE_PREFIX,
  calendarCells,
  createMonthlyCalendarItem,
  defaultSchoolMonth,
  emptyMonthlyCalendar,
  monthlyCalendarStorageKey,
  parseMonthlyCalendar,
  shiftMonth,
  type MonthlyCalendarRecord,
} from "./monthly-calendar-state";

type MonthlyCalendarProps = {
  onOpenWeek: () => void;
};

type WeekEntry = {
  date: string;
  label: string;
};

function readSavedMonth(month: string) {
  try {
    const saved = window.localStorage.getItem(monthlyCalendarStorageKey(month));
    return saved ? parseMonthlyCalendar(JSON.parse(saved)) : null;
  } catch {
    return null;
  }
}

function monthLabel(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", { month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, monthNumber - 1, 1)));
}

function dateLabel(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-CA", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(year, month - 1, day)));
}

function lastDateOfMonth(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);
  return new Date(Date.UTC(year, monthNumber, 0)).toISOString().slice(0, 10);
}

function savedWeekEntries(month: string): WeekEntry[] {
  const entries = new Map<string, WeekEntry>();
  for (const storageKey of WEEKLY_PLAN_STORAGE_KEYS) {
    const plan = readWeeklyPlan(storageKey);
    if (!plan) continue;
    for (const block of plan.blocks) {
      if (block.kind !== "lesson") continue;
      const date = dateForWeekday(plan.weekOf, block.day);
      if (!date.startsWith(`${month}-`)) continue;
      const key = `${date}:${block.sourceId ?? block.title}`;
      entries.set(key, { date, label: `${block.subject} · ${block.title}` });
    }
  }
  return [...entries.values()].sort((a, b) => a.date.localeCompare(b.date) || a.label.localeCompare(b.label));
}

export default function MonthlyCalendar({ onOpenWeek }: MonthlyCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(defaultSchoolMonth);
  const [record, setRecord] = useState<MonthlyCalendarRecord>(() => emptyMonthlyCalendar(defaultSchoolMonth()));
  const [status, setStatus] = useState("Opening calendar…");
  const [draftDate, setDraftDate] = useState(`${defaultSchoolMonth()}-01`);
  const [draftText, setDraftText] = useState("");
  const [weekRevision, setWeekRevision] = useState(0);
  const headingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setRecord(readSavedMonth(visibleMonth) ?? emptyMonthlyCalendar(visibleMonth));
      setDraftDate(`${visibleMonth}-01`);
      setDraftText("");
      setStatus("Saved on this computer.");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [visibleMonth]);

  useEffect(() => {
    if (record.month !== visibleMonth) return;
    try {
      window.localStorage.setItem(monthlyCalendarStorageKey(visibleMonth), JSON.stringify(record));
    } catch {
      window.setTimeout(() => setStatus("This browser blocked saving. Print the month before closing it."), 0);
    }
  }, [record, visibleMonth]);

  useEffect(() => {
    const refreshWeek = () => setWeekRevision((value) => value + 1);
    const refreshMonth = (event: StorageEvent) => {
      if (event.key === null || event.key === monthlyCalendarStorageKey(visibleMonth)) {
        setRecord(readSavedMonth(visibleMonth) ?? emptyMonthlyCalendar(visibleMonth));
      }
      if (event.key === null || WEEKLY_PLAN_STORAGE_KEYS.includes(event.key as (typeof WEEKLY_PLAN_STORAGE_KEYS)[number])) refreshWeek();
    };
    window.addEventListener(WEEKLY_PLAN_CHANGE_EVENT, refreshWeek);
    window.addEventListener("storage", refreshMonth);
    return () => {
      window.removeEventListener(WEEKLY_PLAN_CHANGE_EVENT, refreshWeek);
      window.removeEventListener("storage", refreshMonth);
    };
  }, [visibleMonth]);

  const cells = useMemo(() => calendarCells(visibleMonth), [visibleMonth]);
  const weekEntries = useMemo(() => {
    void weekRevision;
    return savedWeekEntries(visibleMonth);
  }, [visibleMonth, weekRevision]);
  const currentMonthName = monthLabel(visibleMonth).split(" ")[0];
  const focus = yearMonths.find((item) => item.month === currentMonthName);

  const eventsByDate = useMemo(() => {
    const result = new Map<string, { type: "plan" | "event"; id: string; label: string }[]>();
    for (const item of weekEntries) {
      const entries = result.get(item.date) ?? [];
      entries.push({ type: "plan", id: `plan-${item.date}-${item.label}`, label: item.label });
      result.set(item.date, entries);
    }
    for (const item of record.items) {
      const entries = result.get(item.date) ?? [];
      entries.push({ type: "event", id: item.id, label: item.text });
      result.set(item.date, entries);
    }
    return result;
  }, [record.items, weekEntries]);

  const changeMonth = (amount: number) => setVisibleMonth((month) => shiftMonth(month, amount));

  const addEvent = () => {
    const item = createMonthlyCalendarItem(draftDate, draftText);
    if (!item || !draftDate.startsWith(`${visibleMonth}-`)) {
      setStatus("Choose a date in this month and add a short class-wide event.");
      return;
    }
    if (record.items.length >= MAX_MONTHLY_CALENDAR_ITEMS) {
      setStatus("This month already has the maximum number of saved events.");
      return;
    }
    setRecord((current) => ({ ...current, items: [...current.items, item] }));
    setDraftText("");
    setStatus("Event added.");
  };

  const removeEvent = (id: string) => {
    setRecord((current) => ({ ...current, items: current.items.filter((item) => item.id !== id) }));
    setStatus("Event removed.");
  };

  return (
    <section ref={headingRef} className="monthly-calendar" aria-labelledby="monthly-calendar-title" data-ready={record.month === visibleMonth || undefined}>
      <header className="monthly-calendar__header">
        <div><small>MONTHLY CALENDAR</small><h1 id="monthly-calendar-title">{monthLabel(visibleMonth)}</h1></div>
        <nav aria-label="Change or print month">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">←</button>
          <button type="button" onClick={() => setVisibleMonth(defaultSchoolMonth())}>School month</button>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">→</button>
          <button type="button" className="monthly-calendar__print" onClick={(event) => printClosest(event.currentTarget, ".monthly-calendar")}>Print month</button>
        </nav>
      </header>

      {focus && <section className="monthly-calendar__focus"><span>{focus.status}</span><strong>{focus.phase}</strong><p>{focus.focus}</p></section>}

      <div className="monthly-calendar__weekdays" aria-hidden="true">
        {WEEKDAYS.map((day) => <span key={day}>{day.slice(0, 3)}</span>)}<span>sat</span><span>sun</span>
      </div>

      <div className="monthly-calendar__grid" role="grid" aria-label={monthLabel(visibleMonth)}>
        {cells.map((cell) => {
          const entries = eventsByDate.get(cell.date) ?? [];
          return <article key={cell.date} className="monthly-calendar__day" data-in-month={cell.inMonth || undefined} role="gridcell" aria-label={dateLabel(cell.date)}>
            <time dateTime={cell.date}>{cell.day}</time>
            <div>{entries.slice(0, 3).map((entry) => <span key={entry.id} data-type={entry.type}>{entry.label}{entry.type === "event" && <button type="button" onClick={() => removeEvent(entry.id)} aria-label={`Remove ${entry.label}`}>×</button>}</span>)}</div>
            {entries.length > 3 && <small>+{entries.length - 3} more</small>}
          </article>;
        })}
      </div>

      <section className="monthly-calendar__add" aria-label="Add a class event">
        <div><small>ADD A CLASS EVENT</small><strong>Class-wide dates only</strong></div>
        <label><span>Date</span><input type="date" min={`${visibleMonth}-01`} max={lastDateOfMonth(visibleMonth)} value={draftDate} onChange={(event) => setDraftDate(event.target.value)} /></label>
        <label><span>Event</span><input type="text" maxLength={90} value={draftText} placeholder="Field trip, assembly, materials…" onChange={(event) => setDraftText(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") addEvent(); }} /></label>
        <button type="button" onClick={addEvent}>Add</button>
      </section>

      <footer><p role="status" aria-live="polite">{status}</p><button type="button" onClick={onOpenWeek}>Open week plan</button></footer>
    </section>
  );
}

export { MONTHLY_CALENDAR_STORAGE_PREFIX };
