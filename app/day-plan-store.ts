import october05 from '../content/day-plans/day-2026-10-05.json';
import october06 from '../content/day-plans/day-2026-10-06.json';
import october07 from '../content/day-plans/day-2026-10-07.json';
import october08 from '../content/day-plans/day-2026-10-08.json';
import october09 from '../content/day-plans/day-2026-10-09.json';
import october13 from '../content/day-plans/day-2026-10-13.json';
import october14 from '../content/day-plans/day-2026-10-14.json';
import october15 from '../content/day-plans/day-2026-10-15.json';
import october16 from '../content/day-plans/day-2026-10-16.json';
import octoberFriday from '../content/day-plans/day-2026-10-02.json';
import octoberThursday from '../content/day-plans/day-2026-10-01.json';
import septemberTuesday from '../content/day-plans/day-2026-09-29.json';
import septemberMonday from '../content/day-plans/day-2026-09-28.json';
import thursdayDay from '../content/day-plans/day-2026-09-24.json';
import wednesdayDay from '../content/day-plans/day-2026-09-23.json';
import tuesdayDay from '../content/day-plans/day-2026-09-22.json';
import mondayDay from '../content/day-plans/day-2026-09-21.json';
import thirdDay from '../content/day-plans/day-2026-09-18.json';
import secondDay from '../content/day-plans/second-full-day.json';
import flexibleFirstDay from '../content/day-plans/first-full-day-flexible.json';
import firstDay from '../content/day-plans/first-full-day.json';
import {parseDayPlan,readDayRevisions,type DayPlan} from './day-plan-storage';
export * from './day-plan-storage';
export const publishedDayPlans:DayPlan[]=[thursdayDay,octoberFriday,octoberThursday,septemberTuesday,septemberMonday,wednesdayDay,tuesdayDay,mondayDay,thirdDay,secondDay,flexibleFirstDay,firstDay,october05,october06,october07,october08,october09,october13,october14,october15,october16].map(plan=>{const clean=parseDayPlan(plan);if(!clean)throw new Error('Invalid published day plan');return clean;});
// Explicit teacher-approved active plan. Advance this only after approval, never to the latest tentative draft.
export const DEFAULT_DAY_PLAN_ID=october06.id;
export function listDayPlans():DayPlan[]{
 const plans=new Map(publishedDayPlans.map(p=>[p.id,p]));
 // Reading must not break the published classroom when browser storage is blocked or damaged.
 // Writes still use strict readDayRevisions and cannot overwrite an unreadable archive.
 try { for(const r of readDayRevisions())plans.set(r.plan.id,r.plan); } catch { /* Keep published plans available. */ }
 return [...plans.values()].sort((a,b)=>b.date.localeCompare(a.date));
}
export function dayPlanForDate(date:string):DayPlan|undefined{const matches=listDayPlans().filter(p=>p.date===date);return matches.find(p=>!p.id.startsWith("week-day-"))??matches[0];}
