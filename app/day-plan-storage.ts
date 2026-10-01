import {isIsoDateKey} from './morning-screen-state';
export type DayMaterial = {label:string; href:string; studentSafe:boolean};
// Teacher references are browser-only planning data, never published day-plan content.
// A teacher-only renderer is not access control: never store confidential records or secrets.
export type DayBlock = {
 time:string; title:string; notes:string; href:string; studentSteps?:string[];
 titleKo?:string; firstAction?:string; firstActionKo?:string;
 activity?:DayMaterial; worksheet?:DayMaterial;
 teacherReference?:{href:string; notes:string};
};
export type DayPlan = {status?:'tentative'; id:string; date:string; title:string; greeting:string; arrival:string; note:string; reflection:string; blocks:DayBlock[]; backups:string[]};
export type DayRevision = {revisionId:string; savedAt:string; plan:DayPlan};
export const DAY_ARCHIVE_KEY='wyatt-day-plan-archive-v1';
export const DAY_ARCHIVE_EVENT='wyatt:day-plan-archive';
const str=(v:unknown,max:number)=>typeof v==='string' && v.length<=max;
/** Links are never fetched or uploaded here. Review the destination before sharing it. */
export function isSafeDayHref(href:string):boolean {
 if(typeof href!=='string'||href.length>2000||href!==href.trim()||/[\s\\\u0000-\u001f\u007f]/.test(href))return false;
 let decoded:string;
 try{decoded=decodeURIComponent(href);}catch{return false;}
 if(/[\\\u0000-\u001f\u007f]/.test(decoded))return false;
 // Reject reusable bearer links, credentials and temporary/private download URLs.
 const sensitive=/(?:^|[?&#])(?:(?:access|auth|refresh|id)[_-]?token|token|auth|authorization|api[_-]?key|key|password|(?:client[_-]?)?secret|sig|signature|x-amz-[^=&#]*|x-goog-[^=&#]*|se|sp|sv)=/i;
 if(sensitive.test(decoded))return false;
 if(href.startsWith('?view=')||href.startsWith('?subject='))return true;
 if(href.startsWith('./')){
  const path=decoded.split(/[?#]/)[0];
  return /^\.\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]+\.(?:pdf|html)$/.test(path)&&!path.split('/').includes('..');
 }
 try{
  const url=new URL(href);
  if(url.protocol!=='https:'||url.username||url.password)return false;
  if(/(?:^|\.)oaiusercontent\.com$/i.test(url.hostname)||/(?:\/backend-api\/|\/api\/library(?:\/|$))/i.test(decodeURIComponent(url.pathname)))return false;
  return true;
 }catch{return false;}
}
function validMaterial(value:unknown):value is DayMaterial {
 if(!value||typeof value!=='object')return false;
 const m=value as DayMaterial;
 return str(m.label,180)&&!!m.label.trim()&&isSafeDayHref(m.href)&&typeof m.studentSafe==='boolean';
}
export function studentDayMaterial(material?:DayMaterial):DayMaterial|undefined {
 return validMaterial(material)&&material.studentSafe?material:undefined;
}
export function parseDayPlan(value:unknown):DayPlan|null {
 if(!value || typeof value!=='object')return null;
 const p=value as DayPlan;
 if((p.status!==undefined&&p.status!=='tentative')||!str(p.id,160)||!p.id||!str(p.date,10)||(p.date!==''&&!isIsoDateKey(p.date))||!str(p.title,160)||!p.title.trim()||!str(p.greeting,160)||!str(p.arrival,800)||!str(p.note,6000)||!str(p.reflection,6000))return null;
 if(!Array.isArray(p.blocks)||p.blocks.length<1||p.blocks.length>30||!p.blocks.every(b=>
  b&&str(b.time,60)&&str(b.title,180)&&b.title.trim()&&str(b.notes,6000)&&str(b.href,2000)&&(b.href===''||isSafeDayHref(b.href))&&
  (b.studentSteps===undefined||(Array.isArray(b.studentSteps)&&b.studentSteps.length<=8&&b.studentSteps.every(step=>str(step,500))))&&
  (b.titleKo===undefined||str(b.titleKo,180))&&(b.firstAction===undefined||str(b.firstAction,500))&&(b.firstActionKo===undefined||str(b.firstActionKo,500))&&
  (b.activity===undefined||validMaterial(b.activity))&&(b.worksheet===undefined||validMaterial(b.worksheet))&&
  (b.teacherReference===undefined||(b.teacherReference&&str(b.teacherReference.href,2000)&&(b.teacherReference.href===''||isSafeDayHref(b.teacherReference.href))&&str(b.teacherReference.notes,2000)))
 ))return null;
 if(!Array.isArray(p.backups)||p.backups.length>30||!p.backups.every(b=>str(b,1000)))return null;
 return {...(p.status?{status:p.status}:{}),id:p.id,date:p.date,title:p.title,greeting:p.greeting,arrival:p.arrival,note:p.note,reflection:p.reflection,blocks:p.blocks.map(b=>({
  time:b.time,title:b.title,notes:b.notes,href:b.href,
  ...(b.studentSteps?{studentSteps:[...b.studentSteps]}:{}),
  ...(b.titleKo!==undefined?{titleKo:b.titleKo}:{}),...(b.firstAction!==undefined?{firstAction:b.firstAction}:{}),...(b.firstActionKo!==undefined?{firstActionKo:b.firstActionKo}:{}),
  ...(b.activity?{activity:{label:b.activity.label,href:b.activity.href,studentSafe:b.activity.studentSafe}}:{}),
  ...(b.worksheet?{worksheet:{label:b.worksheet.label,href:b.worksheet.href,studentSafe:b.worksheet.studentSafe}}:{}),
  ...(b.teacherReference?{teacherReference:{href:b.teacherReference.href,notes:b.teacherReference.notes}}:{})
 })),backups:[...p.backups]};
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
export function saveDayPlan(plan:DayPlan):DayRevision[]{
 const clean=parseDayPlan(plan);if(!clean)throw new Error('Check the title, date and activity fields. Material links need a label and a safe HTTPS or site PDF/HTML link; signed or secret links are not accepted.');
 const records=readDayRevisions();
 const last=[...records].reverse().find(r=>r.plan.id===plan.id);
 if(last&&JSON.stringify(last.plan)===JSON.stringify(clean))return records;
 const next=[...records,{revisionId:crypto.randomUUID(),savedAt:new Date().toISOString(),plan:clean}];
 window.localStorage.setItem(DAY_ARCHIVE_KEY,JSON.stringify(next));
 window.dispatchEvent(new Event(DAY_ARCHIVE_EVENT));return next;
}
export function importDayArchive(value:unknown){
 const incoming=parseDayArchive(value), current=readDayRevisions(), byId=new Map(current.map(r=>[r.revisionId,r]));
 // Check both existing and incoming revisions before making a single storage write.
 for(const r of incoming){const match=byId.get(r.revisionId);if(match&&JSON.stringify(match)!==JSON.stringify(r))throw new Error('Conflicting revision in backup; existing plans were kept.');byId.set(r.revisionId,r);}
 const next=[...byId.values()].sort((a,b)=>a.savedAt.localeCompare(b.savedAt));
 window.localStorage.setItem(DAY_ARCHIVE_KEY,JSON.stringify(next));window.dispatchEvent(new Event(DAY_ARCHIVE_EVENT));return next;
}
export function schoolYear(date:string){if(!date)return 'Templates';const y=Number(date.slice(0,4))-(Number(date.slice(5,7))<9?1:0);return `${y}–${y+1}`;}
