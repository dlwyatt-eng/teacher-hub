import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const plan=JSON.parse(readFileSync(path.join(root,'content/day-plans/day-2026-10-30.json'),'utf8'));
test('October 30 preserves confirmed Thursday order and fixed times',()=>{
 const store=load('app/day-plan-store.ts');
 assert.deepEqual(store.parseDayPlan(plan),plan);
 assert.deepEqual(store.dayPlanForDate(plan.date),plan);
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
 assert.match(plan.blocks[1].title,/Spooky writing/);
 assert.equal(plan.blocks[3].time,'9:20–9:35 am');
 assert.match(plan.blocks[3].title,/Pumpkin/);
 assert.equal(plan.blocks[4].time,'9:35–10:35 am');
 assert.match(plan.blocks[4].title,/French/);
 assert.equal(plan.blocks[6].time,'10:50–11:10 am');
 assert.match(plan.blocks[7].title,/Four Corners or Werewolf/);
 assert.equal(plan.blocks[12].time,'1:30 pm · return time flexible');
 assert.match(plan.blocks[12].notes,/Return time is unknown/);
 assert.match(plan.blocks[10].notes,/Students may pass/);
 assert.match(plan.blocks[13].notes,/separate short DPA/);
 assert.equal(plan.blocks[14].time,'2:35 pm');
 assert.doesNotMatch(JSON.stringify(plan),/Nevermoor|Student Vote|Career|non-instructional|IEP|medical|absence|contact number/i);
});
test('October 30 student board, detail and teacher print render each public action',()=>{
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
