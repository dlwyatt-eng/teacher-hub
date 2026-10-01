import {isSafeDayHref, type DayMaterial, type DayPlan} from './day-plan-store';

// The printed route must remain useful away from the browser that created it.
export const printableDayHref=(href:string)=>isSafeDayHref(href)?new URL(href,'https://dlwyatt-eng.github.io/teacher-hub/').href:'';

function Material({name, material}:{name:string; material?:DayMaterial}) {
 if(!material||!isSafeDayHref(material.href))return null;
 return <p><strong>{name}: </strong>{material.label}{!material.studentSafe&&' (teacher preview; not shared on the board)'}<br/><a href={printableDayHref(material.href)}>{printableDayHref(material.href)}</a></p>;
}

export default function DayPlanPrint({plan}:{plan:DayPlan}) {
 return <article className="day-print" aria-label="Teacher day plan printout">
  <p className="day-print-kind">TEACHER DAY PLAN · {plan.date||'REUSABLE TEMPLATE'}{plan.status==='tentative'?' · TENTATIVE: REVIEW BEFORE TEACHING':''}</p>
  <h1>{plan.title}</h1>
  <p>This is your teaching plan. Open the chosen student worksheet separately to print student copies. A full lesson or workshop printout may contain different pages.</p>
  <h2>Welcome and arrival</h2><p>{plan.greeting}</p><p>{plan.arrival}</p>
  {plan.note&&<><h2>Teacher plan notes</h2><p>{plan.note}</p></>}
  {plan.blocks.map((block,i)=><section key={i}>
   <h2>{block.time} · {block.title}</h2>
   {block.titleKo&&<p lang="ko">{block.titleKo}</p>}
   {block.firstAction&&<><h3>First student action</h3><p>{block.firstAction}{block.firstActionKo&&<><br/><span lang="ko">{block.firstActionKo}</span></>}</p></>}
   {block.notes&&<><h3>Teaching steps</h3><p>{block.notes}</p></>}
   {!!block.studentSteps?.some(step=>step.trim())&&<><h3>Student steps</h3><ol>{block.studentSteps.filter(step=>step.trim()).map((step,j)=><li key={j}>{step}</li>)}</ol></>}
   <Material name="Chosen activity / material" material={block.activity}/>
   <Material name="Student worksheet (print separately)" material={block.worksheet}/>
   {block.href&&isSafeDayHref(block.href)&&<p><strong>Full lesson / reference (optional): </strong><a href={printableDayHref(block.href)}>{printableDayHref(block.href)}</a></p>}
   {block.teacherReference&&(block.teacherReference.notes||block.teacherReference.href)&&<div className="day-print-teacher-reference"><h3>Teacher reference / page notes</h3>{block.teacherReference.notes&&<p>{block.teacherReference.notes}</p>}{block.teacherReference.href&&isSafeDayHref(block.teacherReference.href)&&<p><a href={printableDayHref(block.teacherReference.href)}>{printableDayHref(block.teacherReference.href)}</a></p>}</div>}
  </section>)}
  {plan.backups.length>0&&<><h2>If we finish quickly</h2><ul>{plan.backups.map((backup,i)=><li key={i}>{backup}</li>)}</ul></>}
  {plan.reflection&&<><h2>Reflection for next time</h2><p>{plan.reflection}</p></>}
 </article>;
}
