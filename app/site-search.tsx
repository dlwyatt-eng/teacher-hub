"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { coreLearningPrograms } from "./core-programs";
import { integratedLearningPrograms } from "./integrated-programs";
import { scienceLessons, scienceUnits } from "./science-program";
import { socialLessons, socialUnits } from "./social-program";

export type SiteSearchTarget =
  | { kind: "page"; page: string }
  | { kind: "subject"; subject: string }
  | { kind: "generic"; subject: string; id: string }
  | { kind: "social"; id: string }
  | { kind: "science"; id: string };

export type SiteSearchEntry = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  terms: string;
  teacherOnly?: boolean;
  target: SiteSearchTarget;
};

const programs = { ...coreLearningPrograms, ...integratedLearningPrograms };

const studentAgencyPages = [
  ["Newsroom", "Source Lab & Newsroom", "Use a named current or historical source for a Quick Look or Deep Dive, then try teacher-led visual clue challenges."],
  ["My Inquiry", "My Inquiry", "Carry a strong question through source research, team planning, making, teaching, and reflection."],
  ["AI Tensions Lab", "AI Tensions Lab", "Choose human, AI, both, or not sure; reveal new information; then reconsider who should decide and what the human must still do."],
] as const;

const teacherPages = [
  ["Morning Screen", "Assemble, review, edit, and project today's schedule, announcements, reminders, weather, and arrival challenge."],
  ["Weekly Plan", "Build and print the teaching week; download the one-page Excel desk planner."],
  ["Monthly Calendar", "See the month, saved weekly lessons, and short class-wide events."],
  ["First Week Mission", "Choose and run five standalone Grade 6 Discovery organizer sessions with 45-, 60-, and 75-minute routes, privacy guidance, projector screens, and teacher handoff: Identity Constellation, How I Learn Best, Ideal Learning Space, Build a Better Grade 6, and Grade 6 Quest Map."],
  ["TTOC Day Plan", "Build one clear substitute-teacher day plan."],
  ["Teaching OS Map", "See how plans, lessons, evidence, and student views connect."],
  ["Year Plan", "Open September-to-June pacing and inquiry windows."],
  ["Cross-Curricular Projects", "Open larger projects that connect several subjects."],
  ["SpacesEDU Evidence", "Plan useful portfolio evidence without posting everything."],
  ["AI Activity Studio", "Prepare, test, and connect the teacher-created SchoolAI pilot activities."],
  ["Visual Review Studio", "Compare original image candidates, preview placements, record decisions, and export the approved visual direction."],
  ["Assessment Studio", "Review evidence and plan reporting."],
  ["Classroom Guide", "Open routines and guidance for students, families, and teachers."],
] as const;

export const siteSearchEntries: SiteSearchEntry[] = [
  ...studentAgencyPages.map(([page, title, description]) => ({
    id: `page-${page}`,
    title,
    eyebrow: "STUDENT AGENCY",
    description,
    terms: `${page} ${title} ${description} ${page === "Newsroom" ? "GeoGuessr TimeGuessr projector visual clue games" : ""} current events questions source inquiry solutionary project`,
    target: { kind: "page" as const, page },
  })),
  ...teacherPages.map(([page, description]) => ({
    id: `page-${page}`,
    title: page,
    eyebrow: "TEACHER TOOL",
    description,
    terms: `${page} ${description}`,
    teacherOnly: true,
    target: { kind: "page" as const, page },
  })),
  ...Object.values(programs).flatMap((program) => [
    {
      id: `subject-${program.subject}`,
      title: program.subject,
      eyebrow: "SUBJECT",
      description: program.subtitle,
      terms: `${program.subject} ${program.title} ${program.subtitle} ${program.northStar}`,
      target: { kind: "subject" as const, subject: program.subject },
    },
    ...program.arcs.map((arc) => ({
      id: `unit-${arc.id}`,
      title: arc.title,
      eyebrow: `${program.subject.toUpperCase()} · UNIT`,
      description: arc.question,
      terms: `${program.subject} ${arc.title} ${arc.question} ${arc.promise} ${arc.curriculum.join(" ")}`,
      target: { kind: "generic" as const, subject: program.subject, id: arc.experienceIds[0] },
    })),
    ...program.experiences.map((experience) => ({
      id: `generic-${experience.id}`,
      title: experience.title,
      eyebrow: program.subject.toUpperCase(),
      description: experience.question,
      terms: `${program.subject} ${experience.title} ${experience.question} ${experience.hook} ${experience.studentMission} ${experience.kind}`,
      target: { kind: "generic" as const, subject: program.subject, id: experience.id },
    })),
  ]),
  {
    id: "subject-Science",
    title: "Science",
    eyebrow: "SUBJECT",
    description: "Body systems, mixtures, forces and motion, Earth and space, and the expert showcase.",
    terms: "Science body systems mixtures forces motion earth space inquiry expert showcase",
    target: { kind: "subject", subject: "Science" },
  },
  ...scienceUnits.map((unit) => ({
    id: `science-unit-${unit.id}`,
    title: unit.title,
    eyebrow: "SCIENCE · UNIT",
    description: unit.question,
    terms: `Science ${unit.title} ${unit.subtitle} ${unit.question} ${unit.bigIdea} ${unit.content.join(" ")}`,
    target: { kind: "science" as const, id: unit.lessons[0].id },
  })),
  ...scienceLessons.map((lesson) => ({
    id: `science-${lesson.id}`,
    title: lesson.title,
    eyebrow: `SCIENCE · ${lesson.unitTitle ?? "LESSON"}`.toUpperCase(),
    description: lesson.question,
    terms: `Science ${lesson.unitTitle ?? ""} ${lesson.title} ${lesson.question} ${lesson.learning} ${lesson.vocabulary.join(" ")}`,
    target: { kind: "science" as const, id: lesson.id },
  })),
  {
    id: "subject-Social Studies",
    title: "Social Studies",
    eyebrow: "SUBJECT",
    description: "Place, evidence, perspective, power, rights, global systems, and solutionary inquiry.",
    terms: "Social Studies place evidence perspective Fleetwood power rights government global systems solutionary inquiry",
    target: { kind: "subject", subject: "Social Studies" },
  },
  ...socialUnits.map((unit) => ({
    id: `social-unit-${unit.id}`,
    title: unit.title,
    eyebrow: "SOCIAL STUDIES · UNIT",
    description: unit.question,
    terms: `Social Studies ${unit.title} ${unit.subtitle} ${unit.question} ${unit.content.join(" ")}`,
    target: { kind: "social" as const, id: socialLessons.find((lesson) => lesson.unitId === unit.id)?.id ?? socialLessons[0].id },
  })),
  ...socialLessons.map((lesson) => ({
    id: `social-${lesson.id}`,
    title: lesson.title,
    eyebrow: "SOCIAL STUDIES",
    description: lesson.question,
    terms: `Social Studies ${lesson.title} ${lesson.question} ${lesson.learning} ${lesson.vocabulary.join(" ")}`,
    target: { kind: "social" as const, id: lesson.id },
  })),
];

function normalize(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}

export function searchSiteEntries(query: string, audience: "teacher" | "student", limit = 10) {
  const words = normalize(query).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return siteSearchEntries.filter((entry) => audience === "teacher" || !entry.teacherOnly).slice(0, limit);
  return siteSearchEntries
    .filter((entry) => audience === "teacher" || !entry.teacherOnly)
    .map((entry) => {
      const title = normalize(entry.title);
      const haystack = normalize(`${entry.eyebrow} ${entry.terms}`);
      if (!words.every((word) => haystack.includes(word))) return null;
      const score = words.reduce((total, word) => total + (title.startsWith(word) ? 8 : title.includes(word) ? 4 : 1), 0);
      return { entry, score };
    })
    .filter((match): match is { entry: SiteSearchEntry; score: number } => Boolean(match))
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((match) => match.entry);
}

export function SiteSearch({ audience, onNavigate }: { audience: "teacher" | "student"; onNavigate: (target: SiteSearchTarget) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchSiteEntries(query, audience), [query, audience]);

  const open = () => {
    setQuery("");
    dialogRef.current?.showModal();
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.matches("input, textarea, select, [contenteditable='true']");
      if ((event.key === "/" && !isTyping) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  const choose = (target: SiteSearchTarget) => {
    close();
    onNavigate(target);
  };

  return (
    <div className="site-search">
      <button className="site-search__open" type="button" onClick={open} aria-haspopup="dialog">
        <span aria-hidden="true">⌕</span><strong>Search</strong><kbd>/</kbd>
      </button>
      <dialog ref={dialogRef} className="site-search__dialog" aria-labelledby="site-search-title" onClick={(event) => { if (event.target === dialogRef.current) close(); }}>
        <section>
          <header>
            <div><small>CLASSROOM OS</small><h2 id="site-search-title">Find a lesson, unit, or tool</h2></div>
            <button type="button" onClick={close} aria-label="Close search">×</button>
          </header>
          <label className="site-search__field">
            <span aria-hidden="true">⌕</span>
            <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘Fleetwood’, ‘angles’, ‘forces’, or ‘weekly plan’" autoComplete="off" />
          </label>
          <p className="site-search__status" role="status">{query.trim() ? `${results.length} ${results.length === 1 ? "match" : "matches"}` : "Start typing, or choose a recent starting point."}</p>
          <div className="site-search__results">
            {results.map((entry) => (
              <button key={entry.id} type="button" onClick={() => choose(entry.target)}>
                <span><small>{entry.eyebrow}</small><strong>{entry.title}</strong><p>{entry.description}</p></span>
                <b aria-hidden="true">Open →</b>
              </button>
            ))}
            {!results.length && <div className="site-search__empty"><strong>No exact match yet.</strong><p>Try a shorter word such as “claim,” “space,” “pattern,” or “art.”</p></div>}
          </div>
          <footer><span><kbd>Esc</kbd> closes</span><span>Teacher tools stay hidden in Teach / Project mode.</span></footer>
        </section>
      </dialog>
    </div>
  );
}
