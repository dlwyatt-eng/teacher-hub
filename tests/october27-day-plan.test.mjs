import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const plan=JSON.parse(readFileSync(path.join(root,'content/day-plans/day-2026-10-27.json'),'utf8'));
const previous=JSON.parse(readFileSync(path.join(root,'content/day-plans/day-2026-10-20.json'),'utf8'));

test('October 27 is the approved active Tuesday plan with the fixed routines preserved',()=>{
 const store=load('app/day-plan-store.ts');
 assert.deepEqual(store.parseDayPlan(plan),plan);
 assert.deepEqual(store.dayPlanForDate('2026-10-27'),plan);
 assert.equal(plan.status,undefined);
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,'2026-10-27').id,plan.id);
 assert.deepEqual(plan.blocks.map(b=>b.time),previous.blocks.map(b=>b.time));
 assert.match(plan.blocks[1].title,/SpacesEDU/);
 assert.match(plan.blocks[4].title,/introduce order of operations/);
 for(const i of [5,6,7,9,10,11])assert.deepEqual(plan.blocks[i],previous.blocks[i]);
 assert.equal(plan.blocks[8].time,previous.blocks[8].time);
 assert.match(plan.blocks[8].notes,/actual class bookmark/);
 assert.doesNotMatch(JSON.stringify(plan.blocks[8]),/Chapter\s+\d/i);
});

test('October 27 keeps existing posts distinct from completed teaching and supplies an optional video route',()=>{
 assert.match(plan.note,/Prime-factorization teaching is finished/);
 assert.match(plan.note,/does not mean every individual task or post is complete/);
 assert.match(plan.note,/no new SpacesEDU assignment or deadline/);
 assert.equal(plan.blocks[4].activity.href,'https://mathantics.com/lesson/order-of-operations');
 assert.match(plan.blocks[4].notes,/complete non-video route/);
 assert.match(plan.blocks[4].notes,/multiplication and division from left to right/);
 assert.match(plan.blocks[4].notes,/addition and subtraction from left to right/);
 assert.match(plan.blocks[4].notes,/6 \+ 4 × 3 = 6 \+ 12 = 18/);
 assert.match(plan.blocks[4].notes,/18 ÷ 3 × 2 = 12/);
 assert.match(plan.blocks[4].notes,/24 ÷ 6 × 3 = 4 × 3 = 12/);
 assert.doesNotMatch(JSON.stringify(plan),/\bIEP\b|pull-out|support room|cart number|booked laptops|due (?:Monday|Tuesday|Wednesday|Thursday|Friday|November)/i);
});

test('October 27 board, student details and teacher print render the new plan without teacher answers in projection',()=>{
 const {default:Morning,DayBlockDetails}=load('app/day-plan-morning.tsx');
 const {default:Print}=load('app/day-plan-print.tsx');
 const board=renderToStaticMarkup(React.createElement(Morning,{plan}));
 const print=renderToStaticMarkup(React.createElement(Print,{plan}));
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 for(const block of plan.blocks){
  const details=renderToStaticMarkup(React.createElement(DayBlockDetails,{block,planId:plan.id}));
  assert.ok(block.titleKo?.trim());assert.ok(block.firstActionKo?.trim());assert.ok(block.firstAction?.trim());
  for(const html of [board,print])assert.ok(html.includes(escape(block.title)),block.title);
  assert.ok(details.includes(escape(block.firstAction)),block.firstAction);
  for(const step of block.studentSteps??[])assert.ok(details.includes(escape(step)),step);
  assert.equal(block.teacherReference,undefined);
  assert.doesNotMatch(details,/Teacher plan notes|teaching is finished|= 18|= 30|= 50|= 12|laptop|booking|deadline/i);
 }
 assert.doesNotMatch(board,/Teacher plan notes|teaching is finished|= 18|= 30|= 50|= 12|laptop|booking|deadline/i);
 assert.match(print,/complete non-video route/);
});
