import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const plan=JSON.parse(readFileSync(path.join(root,'content/day-plans/day-2026-10-26.json'),'utf8'));
const archive=JSON.parse(readFileSync(path.join(root,'content/day-plans/archive/day-2026-10-26-before-sequence-update.json'),'utf8'));
test('Monday uses the confirmed sequence and preserves fixed routines and original plan',()=>{
 assert.deepEqual(load('app/day-plan-store.ts').dayPlanForDate(plan.date),plan);
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(load('app/day-plan-store.ts').publishedDayPlans,'2026-10-26').id,plan.id);
 assert.equal(plan.blocks[1].time,'8:45–10:20 am'); assert.match(plan.blocks[1].title,/Boo Bash/);
 assert.equal(plan.blocks[4].time,'10:50–11:50 am'); assert.match(plan.blocks[4].title,/assigned work/);
 assert.equal(plan.blocks[7].time,'12:50–2:00 pm'); assert.match(plan.blocks[7].title,/SpacesEDU/);
 for(const title of ['Snack','Recess','Lunch','Quiet individual time','Planners, jobs and cleanup','Pack up and dismissal']) {
  assert.equal(plan.blocks.find(b=>b.title===title).time,archive.blocks.find(b=>b.title===title).time,title);
 }
 assert.match(archive.blocks[1].title,/prime factorization/);
 assert.match(plan.blocks[4].notes,/not a new list/);assert.match(plan.blocks[7].notes,/prepare the same post on paper/);
 assert.doesNotMatch(JSON.stringify(plan),/Chapter\s+\d|\bIEP\b|pull-out|support room/i);
});
test('Monday projector, activity details and teacher print use the canonical revision',()=>{
 const {default:Morning,DayBlockDetails}=load('app/day-plan-morning.tsx');
 const {default:Print}=load('app/day-plan-print.tsx');
 const board=renderToStaticMarkup(React.createElement(Morning,{plan}));
 const print=renderToStaticMarkup(React.createElement(Print,{plan}));
 for(const block of plan.blocks){
  const details=renderToStaticMarkup(React.createElement(DayBlockDetails,{block,planId:plan.id}));
  assert.ok(block.firstAction?.trim());assert.ok(block.titleKo?.trim());assert.ok(block.firstActionKo?.trim());
  for(const html of [board,print])assert.ok(html.includes(block.title.replaceAll('&','&amp;')),block.title);
  assert.ok(details.includes(block.firstAction.replaceAll('&','&amp;').replaceAll('’','’')),block.firstAction);
  assert.doesNotMatch(details,/cart number|individual versions|private PDFs|posting scaffolds or booklets/);
 }
 assert.doesNotMatch(board,/Teacher plan notes|cart number|private PDFs|posting scaffolds or booklets/);
 assert.match(print,/Use available posting scaffolds or booklets/);
});
