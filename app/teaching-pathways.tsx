"use client";

import { useEffect, useId, useState, type KeyboardEvent, type ReactNode } from "react";
import phe from "../content/phe-six-week-sequence.json";
import maths from "../content/maths-readiness-pathways.json";
import { AccessCompanionLinks } from "./access-companion-links";
import "./teaching-pathways.css";

type Audience = "teacher" | "student";
type Stage = { label: string; title: string; content: ReactNode };
type Block = "health" | "pe1" | "pe2";
const blockNames: Record<Block, string> = { health: "Classroom health", pe1: "PE · learn the skill", pe2: "PE · captain practice" };
const download = (file: string) => `downloads/phe-maths/${file}`;

function routeHref(view: string, audience: Audience, params: Record<string, string> = {}) {
  const query = new URLSearchParams({ view, ...params });
  if (audience === "student") query.set("mode", "student");
  return `?${query}`;
}

function queryValue(key: string, allowed: string[], fallback: string) {
  if (typeof window === "undefined") return fallback;
  const value = new URL(window.location.href).searchParams.get(key);
  return value && allowed.includes(value) ? value : fallback;
}

function updateQuery(values: Record<string, string>) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(values)) url.searchParams.set(key, value);
  window.history.pushState(window.history.state, "", url);
}

function Lines({ items }: { items: readonly string[] }) {
  return <ul className="teaching-pathway__lines">{items.map((item, index) => <li key={index}>{item}</li>)}</ul>;
}

function StageDeck({ stages, label }: { stages: Stage[]; label: string }) {
  const [index, setIndex] = useState(0);
  const uid = useId();
  const stage = stages[index] ?? stages[0];
  function keyStep(event: KeyboardEvent<HTMLButtonElement>, position: number) {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (position + 1) % stages.length;
    if (event.key === "ArrowLeft") next = (position + stages.length - 1) % stages.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = stages.length - 1;
    if (next === null) return;
    event.preventDefault();
    setIndex(next);
    document.getElementById(`${uid}-step-${next}`)?.focus();
  }
  return <section className="teaching-pathway__deck" aria-label={label}>
    <div className="teaching-pathway__steps" role="tablist" aria-label="Lesson steps">
      {stages.map((item, position) => <button key={position} type="button" role="tab"
        id={`${uid}-step-${position}`} aria-selected={index === position} aria-controls={`${uid}-panel`}
        tabIndex={index === position ? 0 : -1} onClick={() => setIndex(position)} onKeyDown={event => keyStep(event, position)}>
        <span>{String(position + 1).padStart(2, "0")}</span>{item.label}
      </button>)}
    </div>
    <div className="teaching-pathway__stage" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-step-${index}`} tabIndex={0}>
      <p className="teaching-pathway__eyebrow">{label} · {index + 1} of {stages.length}</p>
      <h2>{stage.title}</h2>
      {stage.content}
    </div>
    <nav className="teaching-pathway__next" aria-label="Move through lesson">
      <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>← Previous step</button>
      <button type="button" disabled={index === stages.length - 1} onClick={() => setIndex(index + 1)}>Next step →</button>
    </nav>
  </section>;
}

function Sources({ sources }: { sources: { title: string; url: string; note: string }[] }) {
  return <details className="teaching-pathway__details"><summary>Sources & curriculum scope</summary>
    <ul>{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a><p>{source.note}</p></li>)}</ul>
  </details>;
}

function Downloads({ subject }: { subject: "phe" | "maths" }) {
  const files = subject === "phe" ? [
    { file: "PHE_Six_Week_Teacher_Guide.pdf", label: "Teacher guide", note: "Six weeks · health, skill teaching and captain practice" },
    { file: "PHE_Student_Activity_Pages.pdf", label: "Student activity pages", note: "Six health activities · print only the page you need" },
  ] : [
    { file: "Maths_Readiness_Teacher_Guide.pdf", label: "Teacher guide & keys", note: "Read the evidence, choose a route, then check again" },
    { file: "Maths_Readiness_Student_Pages.pdf", label: "Student activity pages", note: "Entry check, practice routes, fresh checks and a bridge" },
  ];
  return <div className="teaching-pathway__downloads" aria-label="Printable resources">{files.map(file =>
    <a key={file.file} href={download(file.file)} target="_blank" rel="noreferrer"><strong>{file.label} ↗</strong><span>{file.note}</span></a>
  )}</div>;
}

export function pheStages(weekId: string, block: Block): Stage[] {
  const week = phe.weeks.find(item => item.id === weekId) ?? phe.weeks[0];
  const lesson = week[block];
  return [
    { label: "Begin", title: lesson.title, content: <><p className="teaching-pathway__goal">{lesson.goal}</p><div className="teaching-pathway__input"><span>{block === "health" ? "Fictional situation" : "Our activity"}</span><p>{block === "health" ? week.studentPage.scenario : lesson.setup}</p></div></> },
    { label: "Model", title: "See one example", content: <div className="teaching-pathway__model"><p>{lesson.model}</p></div> },
    { label: "Try", title: "Your turn", content: <><Lines items={block === "health" ? week.studentPage.prompts : lesson.studentPrompts} /><p className="teaching-pathway__response">{block === "health" ? "Speak, point, draw or write. Use the fictional situation; personal experiences are not required." : "Choose a safe movement route. Practise at a pace that fits today, and ask for an adjustment when needed."}</p></> },
    { label: "Check", title: "What can we show?", content: <><p>{lesson.studentCheck}</p><p className="teaching-pathway__response">Name one useful next step. You can explain privately.</p></> },
  ];
}

export function PheSequence({ audience = "teacher" }: { audience?: Audience }) {
  const [weekId, setWeekId] = useState(() => queryValue("pheWeek", phe.weeks.map(week => week.id), phe.weeks[0].id));
  const [block, setBlock] = useState<Block>(() => queryValue("pheBlock", Object.keys(blockNames), "health") as Block);
  const week = phe.weeks.find(item => item.id === weekId) ?? phe.weeks[0];
  const lesson = week[block];
  useEffect(() => {
    const restore = () => {
      setWeekId(queryValue("pheWeek", phe.weeks.map(item => item.id), phe.weeks[0].id));
      setBlock(queryValue("pheBlock", Object.keys(blockNames), "health") as Block);
    };
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  function choose(nextWeek: string, nextBlock: Block) {
    setWeekId(nextWeek); setBlock(nextBlock);
    updateQuery({ pheWeek: nextWeek, pheBlock: nextBlock });
  }
  return <div className={`teaching-pathway teaching-pathway--phe ${audience === "student" ? "teaching-pathway--projector" : ""}`}>
    <header className="teaching-pathway__header"><div><p className="teaching-pathway__eyebrow">PHE · SIX FLEXIBLE WEEKS</p><h1>{audience === "teacher" ? phe.title : "Health & movement"}</h1><p>{audience === "teacher" ? phe.subtitle : "Practise a skill. Make room for choice. Try one useful change."}</p></div>
      <a className="teaching-pathway__mode" href={routeHref("PHE Sequence", audience === "teacher" ? "student" : "teacher", { pheWeek: week.id, pheBlock: block })}>{audience === "teacher" ? "Project this lesson ↗" : "Teacher planning ↗"}</a>
    </header>
    <nav className="teaching-pathway__weeks" aria-label="Choose a PHE week">{phe.weeks.map((item, index) =>
      <button key={item.id} type="button" aria-pressed={week.id === item.id} onClick={() => choose(item.id, block)}><span>Week {index + 1}</span><strong>{item.title}</strong></button>
    )}</nav>
    <div className="teaching-pathway__selection"><label>Choose the session<select value={block} onChange={event => choose(week.id, event.target.value as Block)}>{Object.entries(blockNames).map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select></label><p>{lesson.minutes} minutes · carry unfinished learning forward</p></div>
    <StageDeck key={`${week.id}-${block}`} stages={pheStages(week.id, block)} label={blockNames[block]} />
    {audience === "teacher" && <div className="teaching-pathway__teacher">
      <section className="teaching-pathway__planning"><h2>Teach {lesson.title}</h2><p>{week.focus}</p><p><strong>Prepare:</strong> {lesson.materials.join("; ")}</p><p><strong>Set up:</strong> {lesson.setup}</p><ol className="teaching-pathway__run">{lesson.steps.map(step => <li key={step.title}><div><strong>{step.title}</strong><span>{step.minutes} min</span></div><p>{step.action}</p></li>)}</ol>
        <h3>What to notice</h3><p>{lesson.check}</p><h3>Access & participation</h3><Lines items={lesson.access} /><h3>Teaching notes</h3><Lines items={lesson.teacherNotes} />
        <a className="teaching-pathway__lesson-link" href={`?subject=Physical+%26+Health+Education&experience=${lesson.existingExperienceId}`}>Open the related full PHE experience →</a>
      </section>
      <Downloads subject="phe" />
      <AccessCompanionLinks subject="phe" />
      <details className="teaching-pathway__details"><summary>How to use the six-week sequence</summary><p>{phe.intro}</p><Lines items={phe.teacherOverview} /><h3>This week's curriculum connections</h3><Lines items={week.curriculum} /></details>
      <Sources sources={phe.sources} />
    </div>}
  </div>;
}

export function mathsStages(selected: string): Stage[] {
  if (selected === "check") return [
    { label: "Start", title: maths.readiness.title, content: <><p>{maths.readiness.firstAction}</p><p className="teaching-pathway__response">About {maths.readiness.minutes} minutes. Explain with words, numbers, a drawing or materials. This helps us choose what to practise.</p></> },
    ...maths.readiness.items.map((item, index) => ({ label: `Question ${index + 1}`, title: "Show your thinking", content: <p className="teaching-pathway__math-prompt">{item.prompt}</p> })),
  ];
  if (selected === "bridge-check") return [
    { label: "Start", title: maths.bridge.title, content: <><p>{maths.bridge.firstAction}</p><p className="teaching-pathway__response">Begin here only when your teacher chooses this next step. Comparison practice and multiplication need different checks.</p></> },
    ...maths.bridge.items.map((item, index) => ({ label: `Check ${index + 1}`, title: "Before a new multiplication strategy", content: <p className="teaching-pathway__math-prompt">{item.prompt}</p> })),
    { label: "Pause", title: "Check with your teacher", content: <p>Explain how you found the products. Your teacher will choose more equal-group practice or the partial-products model next.</p> },
  ];
  if (selected === "bridge") return [
    { label: "Model", title: "Split a factor, then combine", content: <><p className="teaching-pathway__math-prompt">{maths.bridge.model.prompt}</p><ol className="teaching-pathway__model">{maths.bridge.model.steps.map(step => <li key={step}>{step}</li>)}</ol><p>{maths.bridge.model.answer}</p></> },
    ...maths.bridge.practice.map((item, index) => ({ label: `Try ${index + 1}`, title: "Try the strategy", content: <p className="teaching-pathway__math-prompt">{item.prompt}</p> })),
  ];
  const route = maths.routes.find(item => item.id === selected) ?? maths.routes[0];
  return [
    { label: "Start", title: route.title, content: <><p className="teaching-pathway__goal">{route.goal}</p><Lines items={route.studentPrompts} /></> },
    { label: "Model", title: "One example, explained", content: <><p className="teaching-pathway__math-prompt">{route.example.prompt}</p><ol className="teaching-pathway__model">{route.example.steps.map(step => <li key={step}>{step}</li>)}</ol><p>{route.example.answer}</p></> },
    ...route.practice.map((item, index) => ({ label: `Try ${index + 1}`, title: "Practise and explain", content: <p className="teaching-pathway__math-prompt">{item.prompt}</p> })),
    ...route.recheck.map((item, index) => ({ label: `Check ${index + 1}`, title: "A fresh try, on your own", content: <p className="teaching-pathway__math-prompt">{item.prompt}</p> })),
  ];
}

export function MathsReadiness({ audience = "teacher" }: { audience?: Audience }) {
  const allowed = ["check", ...maths.routes.map(route => route.id), "bridge-check", "bridge"];
  const [selected, setSelected] = useState(() => queryValue("mathRoute", allowed, "check"));
  const route = maths.routes.find(item => item.id === selected);
  useEffect(() => {
    const restore = () => setSelected(queryValue("mathRoute", ["check", ...maths.routes.map(item => item.id), "bridge-check", "bridge"], "check"));
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  function choose(id: string) { setSelected(id); updateQuery({ mathRoute: id }); }
  const answerItems = selected === "check" ? maths.readiness.items : selected === "bridge-check" ? maths.bridge.items : selected === "bridge" ? maths.bridge.practice : route ? [...route.practice, ...route.recheck] : [];
  return <div className={`teaching-pathway teaching-pathway--maths ${audience === "student" ? "teaching-pathway--projector" : ""}`}>
    <header className="teaching-pathway__header"><div><p className="teaching-pathway__eyebrow">NUMBER SENSE · NEXT STEPS</p><h1>{maths.title}</h1><p>{audience === "teacher" ? maths.subtitle : "Show what a number means. Compare. Explain your choice."}</p></div><a className="teaching-pathway__mode" href={routeHref("Maths Readiness", audience === "teacher" ? "student" : "teacher", { mathRoute: selected })}>{audience === "teacher" ? "Project this route ↗" : "Teacher planning ↗"}</a></header>
    <div className="teaching-pathway__selection"><label>Choose the learning route<select value={selected} onChange={event => choose(event.target.value)}><option value="check">Start · short readiness check</option>{maths.routes.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}<option value="bridge-check">Optional · multiplication readiness</option><option value="bridge">Teacher selected · partial-products model</option></select></label><p>{route ? `${route.minutes} minutes · then a fresh independent check` : selected === "check" ? "Use the evidence to choose the next activity" : selected === "bridge-check" ? "Check independently before opening the model" : "Use after reviewing the multiplication readiness check"}</p></div>
    <StageDeck key={selected} stages={mathsStages(selected)} label={selected === "check" ? "Readiness check" : selected === "bridge-check" ? "Multiplication readiness" : selected === "bridge" ? "Multiplication bridge" : route?.title ?? "Number sense"} />
    {audience === "teacher" && <div className="teaching-pathway__teacher">
      {selected === "check" && <section className="teaching-pathway__planning"><h2>Choose from the evidence</h2><p>{maths.intro}</p><div className="teaching-pathway__routes">{maths.readiness.routing.map(item => <article key={item.routeId}><h3>{maths.routes.find(r => r.id === item.routeId)?.title ?? item.routeId}</h3><p><strong>Notice:</strong> {item.when}</p><p>{item.teacherMove}</p><button type="button" onClick={() => choose(item.routeId)}>Open this practice route →</button></article>)}</div></section>}
      {route && <section className="teaching-pathway__planning"><h2>Teach this route</h2><p><strong>Choose it when:</strong> {route.when}</p><p><strong>Prepare:</strong> {route.materials.join("; ")}</p><Lines items={route.teacherNotes} /><h3>Ways to participate</h3><Lines items={route.access} /><a className="teaching-pathway__lesson-link" href={`?subject=Mathematics&experience=${route.existingExperienceId}`}>Open the related full maths lesson + optional resources →</a></section>}
      {(selected === "bridge" || selected === "bridge-check") && <section className="teaching-pathway__planning"><h2>Decide before teaching the bridge</h2><h3>Ready to try when</h3><Lines items={maths.bridge.readyWhen} /><h3>If the evidence says to pause</h3><Lines items={maths.bridge.ifNotYet} /><button className="teaching-pathway__choose" type="button" onClick={() => choose(selected === "bridge-check" ? "bridge" : "bridge-check")}>{selected === "bridge-check" ? "Choose the partial-products model after review →" : "Return to the independent multiplication check →"}</button><a className="teaching-pathway__lesson-link" href={`?subject=Mathematics&experience=${maths.bridge.existingExperienceId}`}>Open the full whole-number operations lesson →</a></section>}
      <details className="teaching-pathway__details"><summary>Teacher answer key · current route</summary><ol>{answerItems.map(item => <li key={item.id}><p><strong>{item.prompt}</strong></p><p>{item.answer}</p>{"lookFor" in item && <p><em>Look for:</em> {String(item.lookFor)}</p>}</li>)}</ol></details>
      <Downloads subject="maths" />
      <AccessCompanionLinks subject="maths" />
      <details className="teaching-pathway__details"><summary>Using the checks without fixed groups</summary><Lines items={maths.teacherOverview} /></details>
      <Sources sources={maths.sources} />
    </div>}
  </div>;
}
