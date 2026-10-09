import test from 'node:test';
import assert from 'node:assert/strict';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(process.cwd());
const store=load('app/day-plan-store.ts');
const nav=load('app/classroom-navigation-state.ts');
const dates=['2026-10-05','2026-10-06','2026-10-07','2026-10-08','2026-10-09','2026-10-13','2026-10-14','2026-10-15','2026-10-16'];
const drafts=store.publishedDayPlans.filter(plan=>dates.includes(plan.date));

test('two upcoming school weeks keep nine dated plans with confirmed Tuesday, Wednesday and Thursday, no holiday lesson, and all bilingual pairs',()=>{
 assert.equal(drafts.length,9);
 assert.equal(new Set(drafts.map(plan=>plan.id)).size,9);
 for(const plan of drafts){
  assert.equal(plan.status,['2026-10-06','2026-10-07','2026-10-08'].includes(plan.date)?undefined:'tentative');
  assert.equal(plan.reflection,'');
  assert.ok(!plan.blocks.some(block=>block.title.startsWith('Science')), 'first-half plans focus on Social Studies');
  assert.deepEqual(store.parseDayPlan(plan),plan);
  assert.match(nav.dayPlanStatus(plan,plan.date),['2026-10-06','2026-10-07','2026-10-08'].includes(plan.date)?/Active classroom plan/:/Tentative.*review before teaching/);
  for(const block of plan.blocks){
   assert.ok(block.titleKo?.trim(),`${plan.date}: ${block.title} Korean title`);
   assert.ok(block.firstAction?.trim(),`${plan.date}: ${block.title} first action`);
   assert.ok(block.firstActionKo?.trim(),`${plan.date}: ${block.title} Korean action`);
   assert.equal(block.teacherReference,undefined);
   if(block.activity)assert.equal(store.studentDayMaterial(block.activity)?.href,block.activity.href);
  }
 }
 assert.equal(store.publishedDayPlans.find(plan=>plan.date==='2026-10-12'),undefined);
});

test('tentative drafts never automatically replace a current ready plan or explicit selected day',()=>{
 const ready=store.publishedDayPlans.find(plan=>plan.id==='day-2026-10-01');
 const draft=drafts[0];
 assert.equal(nav.chooseDisplayPlan([draft,ready],ready.date).id,ready.id);
 assert.notEqual(nav.chooseDisplayPlan([draft,ready],draft.date).id,draft.id);
 assert.equal(nav.chooseDisplayPlan([draft,ready],draft.date,draft.id).id,draft.id,'teacher can explicitly review a tentative day');
 assert.equal(nav.chooseDisplayPlan([draft,ready],draft.date,ready.id).id,ready.id,'explicit current plan wins');
 assert.equal(nav.chooseDisplayPlan([{...draft,status:undefined},ready],draft.date).id,draft.id,'reviewed day becomes eligible');
});

test('specialist times, early dismissal, Friday snack and the Terry Fox block remain explicit',()=>{
 for(const plan of drafts){
  const weekday=new Date(`${plan.date}T12:00:00Z`).getUTCDay();
  const french=plan.blocks.find(block=>/French/.test(block.title));
  if(weekday===2){
   if(plan.date==='2026-10-06'){
    assert.equal(french.time,'12:35 pm');
    assert.equal(plan.blocks[plan.blocks.indexOf(french)+1].time,'1:35 pm');
    assert.equal(nav.chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
   }else assert.equal(french.time,'12:35–1:35 pm');
  }
  if(weekday===5){assert.equal(french.time,'9:35–10:35 am');assert.match(plan.blocks.find(block=>/Snack/.test(block.title)).time,/10:50/);}
  else assert.match(plan.blocks.find(block=>/snack/i.test(block.title)).time,/10:20/);
  if(weekday===4){assert.equal(plan.blocks.find(block=>/^Library/.test(block.title)).time,'9:20–9:35 am');}
  if(weekday===4||weekday===5)assert.equal(plan.blocks.find(block=>/^Physical and Health Education.*gym/.test(block.title)).time,'11:10–11:50 am');
 }
 assert.match(drafts.find(plan=>plan.date==='2026-10-08').blocks.at(-1).time,/1:35 pm$/);
 assert.equal(drafts.find(plan=>plan.date==='2026-10-09').blocks.find(block=>/Education · Terry Fox Run/.test(block.title)).time,'1:00–2:00 pm');
});
