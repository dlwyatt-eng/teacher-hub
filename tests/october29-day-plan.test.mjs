import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const plan=JSON.parse(readFileSync(path.join(root,'content/day-plans/day-2026-10-29.json'),'utf8'));
test('October 29 preserves confirmed Thursday order and fixed times',()=>{
 const store=load('app/day-plan-store.ts');
 assert.deepEqual(store.parseDayPlan(plan),plan);
 assert.deepEqual(store.dayPlanForDate(plan.date),plan);
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
 assert.match(plan.blocks[1].title,/Nevermoor/);
 assert.equal(plan.blocks[3].time,'9:20–9:35 am');
 assert.match(plan.blocks[4].title,/Maths.*reading/);
 assert.match(plan.blocks[7].title,/Friday plans/);
 assert.equal(plan.blocks[8].time,'11:10–11:50 am');
 assert.match(plan.blocks[10].title,/Quiet/);
 assert.match(plan.blocks[11].title,/Spaces.*Bloxels/);
 assert.match(plan.note,/colouring.*optional/);
 assert.doesNotMatch(JSON.stringify(plan),/Student Vote|Career|October 23|non-instructional|spooky|\bIEP\b|pull-out/i);
});
test('October 29 student board, detail and teacher print render each public action',()=>{
 const {default:Morning,DayBlockDetails}=load('app/day-plan-morning.tsx');
 const {default:Print}=load('app/day-plan-print.tsx');
 const board=renderToStaticMarkup(React.createElement(Morning,{plan}));
 const print=renderToStaticMarkup(React.createElement(Print,{plan}));
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
 for(const block of plan.blocks){
  assert.ok(block.titleKo?.trim());assert.ok(block.firstActionKo?.trim());
  for(const html of [board,print])assert.ok(html.includes(escape(block.title)),block.title);
  const details=renderToStaticMarkup(React.createElement(DayBlockDetails,{block,planId:plan.id}));
  assert.ok(details.includes(escape(block.firstAction)));
  assert.doesNotMatch(details,/Teacher plan notes/);
 }
});
