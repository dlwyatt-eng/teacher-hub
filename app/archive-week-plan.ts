import {saveDayPlan,listDayPlans} from './day-plan-store';
import type {WeeklyPlanData} from './weekly-plan';
// Called on saved weekly plans as well as explicit single-day plans. No history is pruned.
export function archiveWeekPlan(plan:WeeklyPlanData){
 ['monday','tuesday','wednesday','thursday','friday'].forEach((day,index)=>{
  const blocks=plan.blocks.filter(b=>b.day===day);if(!blocks.length)return;
  const d=new Date(`${plan.weekOf}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+index);const date=d.toISOString().slice(0,10);
  saveDayPlan({id:`week-day-${date}`,date,title:`${plan.title} · ${day}`,greeting:'Good morning, Grade 6!',arrival:'Get settled and look at the shape of our day.',note:plan.weekNote,reflection:listDayPlans().find(p=>p.id===`week-day-${date}`)?.reflection??'',blocks:blocks.map(b=>({time:b.startTime||b.timing||'Next',title:b.title,notes:[...b.runSteps,b.notes].filter(Boolean).join('\n'),href:''})),backups:['Choose a conversation card from Games & Activities.','Read, discuss a question with a partner, or continue a worthwhile unfinished activity.']});
 });
}
