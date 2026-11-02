import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const plan=JSON.parse(readFileSync(path.join(root,'content/day-plans/day-2026-11-03.json'),'utf8'));
test('November 3 selects by date and preserves Tuesday blocks',()=>{
 const store=load('app/day-plan-store.ts');
 assert.deepEqual(store.parseDayPlan(plan),plan);
 assert.deepEqual(store.dayPlanForDate(plan.date),plan);
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
 assert.deepEqual(plan.blocks.map(b=>b.time),['8:35–8:45 am','8:45–9:35 am','9:35–10:20 am','10:20–10:35 am','10:35–10:50 am','10:50–11:50 am','11:50 am–12:35 pm','12:35–1:35 pm','1:35–1:45 pm','1:45–2:10 pm','2:10–2:30 pm','2:30–2:35 pm']);
 assert.match(plan.blocks[7].title,/French/);assert.match(plan.blocks[9].title,/Nevermoor/);
 assert.match(plan.blocks[9].notes,/actual class bookmark/);
 assert.match(plan.blocks[2].notes,/completion is not assumed/);
 assert.match(plan.note,/no new homework or posting deadline/);
 assert.equal((60-(4*6+3*4))/2,12);
 assert.doesNotMatch(JSON.stringify(plan),/Sarang|Nolan|Sunniva|LST|IEP|laptop|booking|chapter \d/i);
});
test('Tuesday student actions render without teacher answers or private notes',()=>{
 const {default:Morning,DayBlockDetails}=load('app/day-plan-morning.tsx');
 const board=renderToStaticMarkup(React.createElement(Morning,{plan,initialKoreanSupport:true}));
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll("'",'&#x27;').replaceAll('"','&quot;');
 for(const block of plan.blocks){
  assert.match(block.titleKo,/[가-힣]/);assert.match(block.firstActionKo,/[가-힣]/);
  assert.ok(board.includes(escape(block.title)));
  const details=renderToStaticMarkup(React.createElement(DayBlockDetails,{block,planId:plan.id,koreanSupport:true}));
  assert.ok(details.includes(escape(block.firstAction)));
  for(const step of block.studentSteps??[])assert.ok(details.includes(escape(step)));
  if(block.notes)assert.ok(!details.includes(escape(block.notes)));
  assert.doesNotMatch(details,/each station receives \$12/);
 }
 const health=plan.blocks[5];assert.ok(existsSync(path.join(root,'public',health.worksheet.href)));
});
