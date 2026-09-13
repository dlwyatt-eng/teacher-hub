"use client";
import { useEffect, useRef, useState } from 'react';
import { mathPacingLessons, mathPacingTotals, mathPacingUnits, mathPacingWeeks, type MathPacingLesson } from './math-week-pacing';
import { mathSupportPacks } from './math-program-supports';
import { MathAnticsYearPlan } from './math-antics-year';
import { games } from './math-games';
import { printClosest } from './print-support';
import { vancouverDateKey } from './morning-screen-state';

export function MathPacedLesson({ lesson, student = false }: { lesson: MathPacingLesson; student?: boolean }) {
  const [step, setStep] = useState(0);
  const stages = [{ title: 'See an example', text: lesson.model }, { title: 'Try and explain', text: lesson.task }, { title: 'Try on your own', text: lesson.check }];
  return <section className={`math-paced-lesson ${student ? 'math-paced-lesson--student' : ''}`}>
    <header><h3>{lesson.title}</h3><p>Use paper, a pencil and a drawing when it helps. Keep your working.</p><button type="button" onClick={e => printClosest(e.currentTarget, '.math-paced-lesson')}>Print student task</button></header>
    {student && <nav aria-label="Focused math lesson stages">{stages.map((s,i)=><button type="button" key={s.title} aria-pressed={step===i} onClick={()=>setStep(i)}>{i+1}. {s.title}</button>)}</nav>}
    {stages.map((s,i)=><article key={s.title} data-current={!student || step===i}><h4>{s.title}</h4><p>{s.text}</p></article>)}
    {!student && <details className="math-pacing-teacher-only"><summary>Teacher check and teaching moves</summary><p><strong>Check:</strong> {lesson.answer}</p><p>Model aloud, pause for a prediction, and compare two methods during the partner task. Check each learner's independent response before choosing the next lesson. Use a smaller-number example or the linked concept workshop if the model is not yet clear.</p></details>}
  </section>;
}
function ProjectedMathLesson({lesson,onClose}:{lesson:MathPacingLesson;onClose:()=>void}) {
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const el=dialog.current;el?.showModal();return()=>{el?.close();};},[]);
  return <dialog className="math-pacing-projector" ref={dialog} onCancel={onClose}><button type="button" autoFocus onClick={onClose}>Return to planning</button><MathPacedLesson lesson={lesson} student /></dialog>;
}

export function MathPacingPanel({ weekOf }: { weekOf?: string }) {
  const [selected,setSelected]=useState(()=>weekOf ?? mathPacingWeeks.find(w=>w.weekOf>=vancouverDateKey())?.weekOf ?? mathPacingWeeks.at(-1)!.weekOf);
  const [projected,setProjected]=useState<string|null>(null);
  const [lighter,setLighter]=useState(false);
  const week=mathPacingWeeks.find(w=>w.weekOf===(weekOf ?? selected));
  if(!week)return null;
  const unit=mathPacingUnits.find(u=>u.id===week.unit)!;
  const lessons=week.lessonIds.map(id=>mathPacingLessons[id]);
  const gameChoices=games.filter(g=>g.units.some(id=>[unit.packId,unit.experienceId].includes(id))).slice(0,2);
  const pack=mathSupportPacks.find(p=>p.id===unit.packId);
  return <section className="math-pacing-panel" aria-label="Flexible weekly mathematics plan">
    <header><div><p className="eyebrow">MATH AT A MANAGEABLE PACE</p><h2>One or two new ideas. Time to practise and go deeper.</h2><p>{mathPacingTotals.lessons} focused lessons across {mathPacingTotals.teachingWeeks} teaching weeks, plus {mathPacingTotals.flexWeeks} weeks reserved for review, projects or catch-up. Opening routines and school breaks are separate.</p></div></header>
    {!weekOf && <label>Week beginning <select value={selected} onChange={e=>{setSelected(e.target.value);setLighter(false);}}>{mathPacingWeeks.map(w=><option key={w.weekOf} value={w.weekOf}>{w.weekOf} · {mathPacingUnits.find(u=>u.id===w.unit)?.title} · {w.lessonIds.length} new {w.lessonIds.length===1?'lesson':'lessons'}</option>)}</select></label>}
    <div className="math-pacing-week"><h3>{unit.title}</h3><strong>{week.weekOf} · {week.kind==='flex'?'Protected flex week · no new lesson scheduled':`${lessons.length} new ${lessons.length===1?'lesson':'lessons'} · about 25–40 minutes each, adjust as needed`}</strong><p>{week.note}</p>
    <p>These dates are suggestions. Report-writing buffers are not confirmed deadlines. Move a core lesson forward when time is short; use a later flex week before adding another project.</p>
    {week.kind==='teach' && <label className="math-pacing-toggle"><input type="checkbox" checked={lighter} onChange={e=>setLighter(e.target.checked)} />Less math time this week? Show the lighter option.</label>}
    {lighter && <p role="status"><strong>Lighter option:</strong> teach only the first lesson if students are ready, or do no new teaching and use the familiar practice below. Carry unfinished core learning forward in your weekly planner. This preview does not change a saved timetable.</p>}
    </div>
    <div className="math-pacing-lessons">{(lighter?lessons.slice(0,1):lessons).map(lesson=><article key={lesson.id}><div className="math-pacing-actions"><button type="button" onClick={()=>setProjected(lesson.id)}>Project: {lesson.title}</button><a href={`?subject=Mathematics&experience=${lesson.experienceId}`}>Full workshop, worksheets &amp; games ↗</a></div><MathPacedLesson lesson={lesson} /><MathAnticsYearPlan lessonIds={[lesson.packId,lesson.experienceId]} /></article>)}</div>
    <section className="math-pacing-practice"><h3>{week.kind==='flex'?'Familiar choices for a lighter week':'Use the remaining math time'}</h3><p>Use one or two of these as time allows. Practise a taught idea; continue an existing project; meet a small group; or check a misconception. Three short fluency openers are an option for a typical week, not an extra workload to catch up.</p>
      {pack && <details><summary>Paper partner challenge · no devices needed</summary><p>Use this only after teaching the idea. Solve together, explain your method, then change a number or condition for your partner.</p><p>{pack.partnerCards[0]?.body}</p><a href={`?subject=Mathematics&experience=${unit.experienceId}`}>Open the workshop for models and checks ↗</a></details>}
      {gameChoices.map(g=><article key={g.id}><h4><a href={g.url} target="_blank" rel="noreferrer">{g.title} ↗</a></h4><p>{g.start}</p><p><strong>Paper option:</strong> {g.fallback}</p><p><strong>One thing to explain:</strong> {g.check}</p></article>)}
      <p><strong>SpacesEDU:</strong> occasionally choose an existing piece that shows a changed strategy. Add “I used to… Now I… My example shows…” as a short caption or voice note. No weekly posting requirement and no separate task just to make a post.</p>
      <p><strong>For report-writing weeks:</strong> introduce the chosen activity before independent work, keep familiar directions visible and use brief check-ins. Use existing work for evidence; do not launch a new assessment package.</p>
    </section>
    <details><summary>What stays, what gets more time, and what is optional</summary><p>Keep all 15 investigations as available applications. The 41 focused lessons unpack their underlying concepts; they are not 41 extra projects. Give number representations, fraction comparisons, decimal reasoning, patterns and area explanations more than one encounter.</p><p>Choose one substantial measurement/design project. Space Under Constraints can replace Zoo Design or contribute to a shared showcase. Four-quadrant coordinates, exponent challenges and advanced publisher topics remain optional. Do not drop a core topic to finish an optional project.</p><p>After each check, decide whether to continue, practise or reteach. If several weeks are lost, use the protected catch-up weeks and reduce optional project products. Check all required topics before the year ends.</p><a href="https://curriculum.gov.bc.ca/curriculum/mathematics/6/core" target="_blank" rel="noreferrer">BC Grade 6 mathematics expectations ↗</a></details>
    {projected && <ProjectedMathLesson key={projected} lesson={mathPacingLessons[projected]} onClose={()=>setProjected(null)} />}
  </section>;
}
