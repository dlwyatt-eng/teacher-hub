import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const plan=JSON.parse(readFileSync(path.join(root,'content/day-plans/day-2026-11-02.json'),'utf8'));

test('November 2 selects by date and preserves the agreed sequence and fixed breaks',()=>{
 const store=load('app/day-plan-store.ts');
 assert.deepEqual(store.parseDayPlan(plan),plan);
 assert.deepEqual(store.dayPlanForDate(plan.date),plan);
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
 assert.equal(store.DEFAULT_DAY_PLAN_ID,'day-2026-10-19');
 assert.deepEqual(plan.blocks.map(b=>b.time),['8:35–8:45 am','8:45–9:30 am','9:30–10:20 am','10:20–10:35 am','10:35–10:50 am','10:50–11:50 am','11:50 am–12:35 pm','12:35–12:50 pm','12:50–2:00 pm','2:00–2:15 pm','2:15–2:30 pm','2:30–2:35 pm']);
 assert.match(plan.blocks[1].studentSteps[0],/existing PE self-assessment first/);
 assert.match(plan.blocks[1].studentSteps[1],/Then continue the maths/);
 assert.match(plan.blocks[2].title,/Nevermoor/);
 assert.match(plan.blocks[8].title,/SpacesEDU.*Career and maths/);
 assert.match(plan.blocks[1].notes,/not a separate mandatory whole-class block/);
 assert.match(plan.blocks[8].notes,/does not assign a new maths post/);
 assert.match(plan.note,/No new homework or posting deadline/);
 assert.equal(6+4*3,18);assert.equal((6+4)*3,30);
 assert.doesNotMatch(JSON.stringify(plan),/laptop|booking|support schedule|IEP|medical|contact number|chapter \d/i);
});

test('Monday student actions and Korean support render without teacher notes',()=>{
 const {default:Morning,DayBlockDetails}=load('app/day-plan-morning.tsx');
 const {default:Print}=load('app/day-plan-print.tsx');
 const board=renderToStaticMarkup(React.createElement(Morning,{plan,initialKoreanSupport:true}));
 const print=renderToStaticMarkup(React.createElement(Print,{plan}));
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll("'",'&#x27;').replaceAll('"','&quot;');
 for(const block of plan.blocks){
  assert.match(block.titleKo,/[가-힣]/);assert.match(block.firstActionKo,/[가-힣]/);
  for(const html of [board,print]){assert.ok(html.includes(escape(block.title)),block.title);assert.ok(html.includes(block.titleKo));}
  const details=renderToStaticMarkup(React.createElement(DayBlockDetails,{block,planId:plan.id,koreanSupport:true}));
  assert.ok(details.includes(escape(block.firstAction)));assert.ok(details.includes(block.firstActionKo));
  for(const step of block.studentSteps??[])assert.ok(details.includes(escape(step)));
  if(block.notes)assert.ok(!details.includes(escape(block.notes)));
  assert.doesNotMatch(details,/Teacher plan notes/);
 }
 assert.match(print,/actual book or audio bookmark/);
 assert.match(print,/A request is not a demand/);
 assert.match(print,/6 \+ 4 × 3/);
});

test('Monday Health and responsibility links are student-safe and preserve the selected day',()=>{
 const store=load('app/day-plan-store.ts');
 const {DayBlockDetails}=load('app/day-plan-morning.tsx');
 const health=plan.blocks[5];
 assert.equal(health.worksheet.studentSafe,true);
 assert.ok(store.studentDayMaterial(health.worksheet));
 assert.ok(existsSync(path.join(root,'public',health.worksheet.href)));
 const html=renderToStaticMarkup(React.createElement(DayBlockDetails,{block:health,planId:plan.id}));
 assert.match(html,/href="\.\/printables\/communication-feelings-needs-boundaries.pdf"/);
 const chores=renderToStaticMarkup(React.createElement(DayBlockDetails,{block:plan.blocks[9],planId:plan.id}));
 assert.match(chores,/dayPlan=day-2026-11-02/);
 assert.match(chores,/mode=student/);
 assert.doesNotMatch(chores,/amp;amp/);
});
