import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(process.cwd());
const plan=JSON.parse(readFileSync(new URL('../content/day-plans/day-2026-10-22.json',import.meta.url),'utf8'));
const source=JSON.parse(readFileSync(new URL('../content/current-learning-window-v2.json',import.meta.url),'utf8'));
const manifest=JSON.parse(readFileSync(new URL('../public/generated/public-window-v2.json',import.meta.url),'utf8'));
const {default:DayPlanMorning,DayBlockDetails}=load('app/day-plan-morning.tsx');
const {default:DayPlanPrint}=load('app/day-plan-print.tsx');

test('October 22 preserves fixed commitments and protects the requested carryovers',()=>{
 const store=load('app/day-plan-store.ts');
 const nav=load('app/classroom-navigation-state.ts');
 assert.equal(plan.id,'day-2026-10-22');assert.equal(plan.date,'2026-10-22');assert.equal(plan.status,undefined);
 assert.deepEqual(store.dayPlanForDate(plan.date),plan);
 assert.equal(nav.chooseDisplayPlan(store.publishedDayPlans,'2026-10-21').id,'day-2026-10-21');
 assert.equal(nav.chooseDisplayPlan(store.publishedDayPlans,'2026-10-22').id,plan.id);
 assert.equal(nav.chooseDisplayPlan(store.publishedDayPlans,'2026-10-21',plan.id).id,plan.id);
 assert.deepEqual(plan.blocks.map(b=>b.time),['8:35–8:45 am','8:45–9:15 am','9:15–9:20 am','9:20–9:35 am','9:35–10:20 am','10:20–10:35 am','10:35–10:50 am','10:50–11:10 am','11:10–11:50 am','11:50 am–12:35 pm','12:35–12:45 pm','12:45–12:50 pm','12:50–1:10 pm','1:10–2:00 pm','2:00–2:15 pm','2:15–2:30 pm','2:30–2:35 pm']);
 assert.match(plan.blocks[1].title,/Nevermoor/);assert.match(plan.blocks[1].notes,/actual book or audio bookmark/);
 assert.match(plan.blocks[3].title,/Library/);
 assert.match(plan.blocks[4].title,/Halloween/);assert.match(plan.blocks[7].title,/Halloween/);
 assert.match(plan.blocks[8].title,/Physical and Health Education/);
 assert.match(plan.blocks[11].title,/Student Vote/);assert.match(plan.blocks[11].notes,/add no quiz, written reflection or assessment/);
 assert.equal(plan.blocks[12].title,'Student Vote');assert.match(plan.blocks[12].notes,/school voting start is confirmed for 12:50/);
 assert.doesNotMatch(JSON.stringify(plan),/provisional|time.*pending|time.*needs confirmation|booking is not confirmed/i);
 assert.match(plan.blocks[13].title,/Career/);assert.match(plan.blocks[13].notes,/Afternoon computers are confirmed/);
 assert.match(plan.blocks[13].notes,/task already begun/);assert.equal(plan.blocks[13].activity,undefined);
 assert.match(plan.note,/do not assume Wednesday’s prime-factorization lesson was completed/);
 assert.doesNotMatch(JSON.stringify(plan),/Chapter\s+\d|\bIEP\b|pull-out|support room|Mcfarlane|Beggs/i);
});

test('Thursday board, activity details and teacher print render the actual student-safe plan',()=>{
 const board=renderToStaticMarkup(React.createElement(DayPlanMorning,{plan}));
 const print=renderToStaticMarkup(React.createElement(DayPlanPrint,{plan}));
 for(const b of plan.blocks){
  const details=renderToStaticMarkup(React.createElement(DayBlockDetails,{block:b,planId:plan.id}));
  assert.ok(b.firstAction?.trim());assert.ok(b.titleKo?.trim());assert.ok(b.firstActionKo?.trim());
  for(const html of [board,print])assert.ok(html.includes(b.title.replaceAll('&','&amp;')),b.title);
  assert.ok(details.includes(b.firstAction.replaceAll('&','&amp;')),b.firstAction);
  assert.equal(b.teacherReference,undefined);if(b.activity)assert.equal(b.activity.studentSafe,true);
 }
 assert.doesNotMatch(board,/Teacher plan notes|Wednesday’s prime-factorization|Afternoon computers are confirmed/);
 assert.match(print,/actual book or audio bookmark/);assert.match(print,/Afternoon computers are confirmed/);
 assert.match(print,/next school day/);
});

test('current family summary stays learning-focused and preserves Thursday history',()=>{
 assert.equal(source.contentVersion,manifest.contentVersion);
 assert.match(source.classroomWelcome.next,/Monday October 26/);
 for(const term of ['Nevermoor','Boo Bash art','Bloxels','actual stopping points'])assert.ok(source.classroomWelcome.next.includes(term),term);
 assert.doesNotMatch(source.classroomWelcome.next,/laptops|computers|devices|\d:\d|staffing|support room|completed maths/i);
 assert.deepEqual(manifest.classroomWelcome,source.classroomWelcome);
 assert.deepEqual(manifest.classSchedule,source.classSchedule);
 assert.match(source.classSchedule.note,/in-class SpacesEDU work/);
 // Updating the classroom SOD does not silently cancel an unrelated school event.
 assert.ok(source.schoolEvents.some(e=>e.id==='provincial-student-vote'&&e.date==='2026-10-22'));
 assert.match(source.schoolEvents.find(e=>e.id==='provincial-student-vote').detail,/12:50 pm/);
});
