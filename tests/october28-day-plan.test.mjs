import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const plan=JSON.parse(readFileSync(path.join(root,'content/day-plans/day-2026-10-28.json'),'utf8'));
const prior=JSON.parse(readFileSync(path.join(root,'content/day-plans/day-2026-10-21.json'),'utf8'));
test('October 28 is approved and preserves the Wednesday timetable without stale notices',()=>{
 const store=load('app/day-plan-store.ts');
 assert.deepEqual(store.parseDayPlan(plan),plan);
 assert.deepEqual(store.dayPlanForDate(plan.date),plan);
 assert.equal(plan.status,undefined);
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
 assert.deepEqual(plan.blocks.map(b=>b.time),prior.blocks.map(b=>b.time));
 assert.match(plan.blocks[1].title,/Werewolf/);
 assert.match(plan.blocks[4].title,/order of operations/);
 assert.match(plan.blocks[6].notes,/actual class bookmark/);
 assert.doesNotMatch(JSON.stringify(plan),/photo retake|October 23|non-instructional|first prime-factorization|\bIEP\b|pull-out|support room|booked laptops/i);
 assert.ok(!plan.blocks.some(b=>/Health|SpacesEDU/.test(b.title)));
 assert.match(plan.note,/Health has no fixed slot/);
 assert.match(plan.blocks[4].notes,/Do not assume Tuesday’s planned lesson happened/);
});
test('October 28 retains concrete optional maths support and no invented deadline',()=>{
 const b=plan.blocks[4];
 assert.equal(b.activity.href,'https://mathantics.com/lesson/order-of-operations');
 assert.match(b.notes,/complete non-video route/);
 assert.match(b.notes,/multiplication and division from left to right/);
 assert.match(b.notes,/6 \+ 4 × 3 = 6 \+ 12 = 18/);
 assert.match(b.notes,/18 ÷ 3 × 2 = 12/);
 assert.match(b.notes,/24 ÷ 6 × 3 = 4 × 3 = 12/);
 assert.doesNotMatch(JSON.stringify(plan),/due (?:Monday|Tuesday|Wednesday|Thursday|Friday|November)|Chapter\s+\d/i);
});
test('October 28 board, details and print preserve bilingual actions without projecting teacher answers',()=>{
 const {default:Morning,DayBlockDetails}=load('app/day-plan-morning.tsx');
 const {default:Print}=load('app/day-plan-print.tsx');
 const board=renderToStaticMarkup(React.createElement(Morning,{plan}));
 const print=renderToStaticMarkup(React.createElement(Print,{plan}));
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 for(const block of plan.blocks){
  const details=renderToStaticMarkup(React.createElement(DayBlockDetails,{block,planId:plan.id}));
  assert.ok(block.titleKo?.trim());assert.ok(block.firstActionKo?.trim());
  for(const html of [board,print])assert.ok(html.includes(escape(block.title)),block.title);
  assert.ok(details.includes(escape(block.firstAction)));
  for(const step of block.studentSteps??[])assert.ok(details.includes(escape(step)));
  assert.equal(block.teacherReference,undefined);
  assert.doesNotMatch(details,/Teacher plan notes|= 18|= 30|= 50|= 12|booking|deadline/i);
 }
 assert.doesNotMatch(board,/Teacher plan notes|= 18|= 30|= 50|= 12|booking|deadline/i);
 assert.match(print,/complete non-video route/);
});
