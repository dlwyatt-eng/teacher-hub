import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(process.cwd());
const plan=JSON.parse(readFileSync(new URL('../content/day-plans/day-2026-10-21.json',import.meta.url),'utf8'));
const source=JSON.parse(readFileSync(new URL('../content/current-learning-window-v2.json',import.meta.url),'utf8'));
const manifest=JSON.parse(readFileSync(new URL('../public/generated/public-window-v2.json',import.meta.url),'utf8'));
const {default:DayPlanMorning,DayBlockDetails}=load('app/day-plan-morning.tsx');
const {default:DayPlanPrint}=load('app/day-plan-print.tsx');

test('October 21 is the approved saved plan with the agreed Wednesday sequence',()=>{
 const store=load('app/day-plan-store.ts');
 assert.equal(plan.id,'day-2026-10-21'); assert.equal(plan.date,'2026-10-21');
 assert.equal(plan.status,undefined);
 const nav=load('app/classroom-navigation-state.ts');
 assert.equal(nav.chooseDisplayPlan(store.publishedDayPlans,'2026-10-20').id,'day-2026-10-20');
 assert.equal(nav.chooseDisplayPlan(store.publishedDayPlans,'2026-10-21').id,plan.id);
 assert.deepEqual(store.dayPlanForDate(plan.date),plan);
 assert.deepEqual(plan.blocks.map(b=>b.time),['8:35–9:00 am','9:00–10:20 am','10:20–10:35 am','10:35–10:50 am','10:50–11:50 am','11:50 am–12:35 pm','12:35–1:05 pm','1:05–1:30 pm','1:30–1:35 pm','1:35–2:10 pm','2:10–2:20 pm','2:20–2:30 pm','2:30–2:35 pm']);
 assert.match(plan.blocks[1].notes,/retakes.*when called/);
 assert.match(plan.blocks[4].title,/first prime-factorization/);
 assert.match(plan.blocks[4].notes,/Tuesday maths was not taught/);
 assert.match(plan.blocks[4].notes,/Math Antics/);
 assert.match(plan.blocks[4].firstAction,/12 counters/);
 assert.match(plan.blocks[6].title,/Nevermoor/);
 assert.doesNotMatch(JSON.stringify(plan),/Chapter\s+\d/i);
 assert.match(plan.blocks[9].notes,/Start only if materials are ready; otherwise continue Nevermoor/);
 assert.match(plan.note,/Thursday.*next week/);
 assert.match(plan.note,/Friday October 23 is a non-instructional day/);
 assert.doesNotMatch(plan.blocks.map(b=>b.title).join(' '),/candidates|French|leadership/i);
});

test('Wednesday projector, detail and print renderers contain the actual approved content',()=>{
 const board=renderToStaticMarkup(React.createElement(DayPlanMorning,{plan}));
 const print=renderToStaticMarkup(React.createElement(DayPlanPrint,{plan}));
 for(const b of plan.blocks){
  const details=renderToStaticMarkup(React.createElement(DayBlockDetails,{block:b,planId:plan.id}));
  assert.ok(b.firstAction?.trim());
  assert.ok(board.includes(b.title.replaceAll('&','&amp;')),b.title);
  assert.ok(print.includes(b.title.replaceAll('&','&amp;')),b.title);
  assert.ok(details.includes(b.firstAction.replaceAll('&','&amp;')),b.firstAction);
  assert.equal(b.teacherReference,undefined);
  if(b.activity)assert.equal(b.activity.studentSafe,true);
 }
 assert.doesNotMatch(board,/Teacher plan notes|Tuesday maths was not taught|individual support arrangements/);
 assert.match(print,/This is the first lesson, not consolidation/);
 assert.match(print,/otherwise continue Nevermoor/);
});

test('current public summary removes the cancelled Wednesday candidate lesson and stays family-focused',()=>{
 const text=JSON.stringify(source);
 assert.doesNotMatch(text,/Wednesday: use the district|25 min Wednesday|local-candidate table/);
 // Wednesday's archived plan remains fixed; the current family summary can advance.
 assert.match(plan.blocks[4].title,/first prime-factorization lesson/);
 assert.match(plan.note,/Halloween.*Thursday/);
 assert.doesNotMatch(source.classroomWelcome.next,/laptops|devices|\d:\d|staffing|support room/i);
 assert.deepEqual(manifest.classroomWelcome,source.classroomWelcome);
 assert.doesNotMatch(JSON.stringify(plan),/\bIEP\b|pull-out|support room|parking lot|meeting coverage/i);
});
