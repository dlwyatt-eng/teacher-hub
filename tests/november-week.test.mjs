import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const days=['09','10','12','13'].map(d=>read(`../content/day-plans/day-2026-11-${d}.json`));
test('November week preserves actual progress, closure, fixed commitments and uncertainty',()=>{
 const [mon,tue,thu,fri]=days;
 assert.match(mon.note,/Diwali/);assert.match(mon.note,/unconfirmed/);
 assert.match(tue.note,/12:35–1:35/);assert.match(tue.note,/school is closed/);
 assert.match(thu.note,/11:30/);assert.match(thu.note,/noon–2/);assert.match(thu.note,/approximate return 2:30/);
 assert.match(fri.note,/9:35–10:35/);assert.match(fri.note,/11:10–11:50/);
 assert.match(fri.note,/Afternoon laptops are booked/);assert.match(fri.note,/finish first-term work and SpacesEDU postings first/);
 assert.match(fri.note,/only if enough students are ready/);assert.doesNotMatch(fri.blocks.map(b=>b.title).join(' '),/Maths|Art ·/);
 for(const day of days)for(const block of day.blocks)if(block.href.startsWith('./'))assert.ok(existsSync(new URL('../public/'+block.href.slice(2),import.meta.url)));
});
test('new public window is current, safe and synchronized without inventing completed learning',()=>{
 const x=read('../content/current-learning-window-v2.json'),p=read('../public/generated/public-window-v2.json');
 const w=x.phaseOverrides.find(w=>w.id==='november-peace-rights-and-inquiry');
 assert.equal(w.effectiveFrom,'2026-11-09');assert.equal(w.effectiveTo,'2026-11-13');
 assert.match(w.shared.summary,/Students will work in groups/);assert.equal(p.classSchedule.days.length,5);
 assert.ok(p.classSchedule.days.every(d=>/^2026-11-\d\d$/.test(d.date)&&d.label));
 assert.deepEqual(p.classroomWelcome,x.classroomWelcome);
 assert.match(x.classroomWelcome.next,/finish first-term work/i);
 assert.equal(x.classroomWelcome.spaces.status,'invited');
 assert.doesNotMatch(JSON.stringify(w),/Nolan|Sarang|IEP|password|support room/);
});

test('all four dated plans select and render real student routes without teacher answers',()=>{
 const load=moduleLoader(path.resolve(import.meta.dirname,'..'));
 const store=load('app/day-plan-store.ts');
 const {default:Morning,DayBlockDetails}=load('app/day-plan-morning.tsx');
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll("'",'&#x27;').replaceAll('"','&quot;');
 for(const plan of days){
  assert.deepEqual(store.parseDayPlan(plan),plan);
  assert.deepEqual(store.dayPlanForDate(plan.date),plan);
  assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
  const board=renderToStaticMarkup(React.createElement(Morning,{plan}));
  for(const block of plan.blocks){
   assert.ok(board.includes(escape(block.title)));
   const detail=renderToStaticMarkup(React.createElement(DayBlockDetails,{block,planId:plan.id}));
   assert.ok(detail.includes(escape(block.firstAction)));
   for(const step of block.studentSteps??[])assert.ok(detail.includes(escape(step)));
   if(block.notes)assert.ok(!detail.includes(escape(block.notes)));
  }
 }
});

