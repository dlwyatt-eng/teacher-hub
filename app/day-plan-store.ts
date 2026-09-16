import firstDay from '../content/day-plans/first-full-day.json';
import {isIsoDateKey} from './morning-screen-state';
export type DayBlock = {time:string; title:string; notes:string; href:string};
export type DayPlan = {id:string; date:string; title:string; greeting:string; arrival:string; note:string; reflection:string; blocks:DayBlock[]; backups:string[]};
export type DayRevision = {revisionId:string; savedAt:string; plan:DayPlan};
export const DAY_ARCHIVE_KEY='wyatt-day-plan-archive-v1';
export const DAY_ARCHIVE_EVENT='wyatt:day-plan-archive';
export const publishedDayPlans:DayPlan[]=[firstDay];
const str=(v:unknown,max:number)=>typeof v==='string' && v.length<=max;
export function parseDayPlan(value:unknown):DayPlan|null {
 if(!value || typeof value!=='object')return null;
 const p=value as DayPlan;
 if(!str(p.id,160)||!p.id||!str(p.date,10)||(p.date!==''&&!isIsoDateKey(p.date))||!str(p.title,160)||!p.title.trim()||!str(p.greeting,160)||!str(p.arrival,800)||!str(p.note,6000)||!str(p.reflection,6000))return null;
 if(!Array.isArray(p.blocks)||p.blocks.length<1||p.blocks.length>30||!p.blocks.every(b=>b&&str(b.time,60)&&str(b.title,180)&&b.title.trim()&&str(b.notes,6000)&&str(b.href,500)&&(b.href===''||b.href.startsWith('?view=')||b.href.startsWith('?subject='))))return null;
 if(!Array.isArray(p.backups)||p.backups.length>30||!p.backups.every(b=>str(b,1000)))return null;
 return {id:p.id,date:p.date,title:p.title,greeting:p.greeting,arrival:p.arrival,note:p.note,reflection:p.reflection,blocks:p.blocks.map(b=>({time:b.time,title:b.title,notes:b.notes,href:b.href})),backups:[...p.backups]};
}
export function parseDayArchive(raw:unknown):DayRevision[] {
 if(!Array.isArray(raw))throw new Error('Choose a Day Plans JSON backup.');
 return raw.map(r=>{
  const plan=parseDayPlan(r?.plan);
  if(!plan||!str(r.revisionId,200)||typeof r.savedAt!=='string'||!Number.isFinite(Date.parse(r.savedAt)))throw new Error('The backup contains an invalid plan; nothing was imported.');
  return {revisionId:r.revisionId,savedAt:r.savedAt,plan};
 });
}
export function readDayRevisions():DayRevision[]{
 if(typeof window==='undefined')return [];
 const raw=window.localStorage.getItem(DAY_ARCHIVE_KEY);
 return raw?parseDayArchive(JSON.parse(raw)):[];
}
export function listDayPlans():DayPlan[]{
 const plans=new Map(publishedDayPlans.map(p=>[p.id,p]));
 for(const r of readDayRevisions())plans.set(r.plan.id,r.plan);
 return [...plans.values()].sort((a,b)=>b.date.localeCompare(a.date));
}
export function dayPlanForDate(date:string):DayPlan|undefined{const matches=listDayPlans().filter(p=>p.date===date);return matches.find(p=>!p.id.startsWith("week-day-"))??matches[0];}
export function saveDayPlan(plan:DayPlan):DayRevision[]{
 const clean=parseDayPlan(plan);if(!clean)throw new Error('Complete the title, date and activity fields before saving.');
 const records=readDayRevisions();
 const last=[...records].reverse().find(r=>r.plan.id===plan.id);
 if(last&&JSON.stringify(last.plan)===JSON.stringify(clean))return records;
 const next=[...records,{revisionId:crypto.randomUUID(),savedAt:new Date().toISOString(),plan:clean}];
 window.localStorage.setItem(DAY_ARCHIVE_KEY,JSON.stringify(next));
 window.dispatchEvent(new Event(DAY_ARCHIVE_EVENT));return next;
}
export function importDayArchive(value:unknown){
 const incoming=parseDayArchive(value), current=readDayRevisions(), ids=new Set(current.map(r=>r.revisionId));
 // Reusing an id with changed bytes is not silently accepted.
 for(const r of incoming){const match=current.find(c=>c.revisionId===r.revisionId);if(match&&JSON.stringify(match)!==JSON.stringify(r))throw new Error('Conflicting revision in backup; existing plans were kept.');}
 const next=[...current,...incoming.filter(r=>!ids.has(r.revisionId))].sort((a,b)=>a.savedAt.localeCompare(b.savedAt));
 window.localStorage.setItem(DAY_ARCHIVE_KEY,JSON.stringify(next));window.dispatchEvent(new Event(DAY_ARCHIVE_EVENT));return next;
}
export function schoolYear(date:string){if(!date)return 'Templates';const y=Number(date.slice(0,4))-(Number(date.slice(5,7))<9?1:0);return `${y}–${y+1}`;}
