import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const read=p=>JSON.parse(readFileSync(path.join(root,p),'utf8'));
const plan=read('content/day-plans/day-2026-11-10.json');
const find=term=>plan.blocks.find(b=>b.title.includes(term));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll("'",'&#x27;').replaceAll('"','&quot;');
test('November 10 keeps assembly timing flexible and preserves Tuesday routines',()=>{
 const store=load('app/day-plan-store.ts');
 assert.deepEqual(store.parseDayPlan(plan),plan);
 assert.deepEqual(store.dayPlanForDate(plan.date),plan);
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
 assert.equal(find('Remembrance').time,'9:00 am · end time to be confirmed');
 assert.equal(find('Nevermoor').time,'After assembly · if time before snack/recess');
 assert.match(find('Nevermoor').title,/and\/or Health · if time/);
 assert.match(find('Nevermoor').notes,/actual class bookmark/);
 assert.equal(find('SpacesEDU').time,'10:50–11:50 am');
 assert.match(find('SpacesEDU').title,/if laptops are available/);
 assert.match(find('SpacesEDU').notes,/not booked or confirmed/);
 assert.equal(find('Snack').time,'10:20–10:35 am');
 assert.equal(find('Recess').time,'10:35–10:50 am');
 assert.equal(find('Lunch').time,'11:50 am–12:35 pm');
 assert.equal(find('French').time,'12:35–1:35 pm');
 assert.equal(find('Fractions').time,'1:35–2:00 pm');
 assert.match(find('Fractions').title,/introduction · if ready/);
 assert.match(find('Fractions').notes,/not a follow-up to an assumed Monday lesson/);
 assert.equal(find('Save, tidy').time,'2:00–2:30 pm');
 assert.equal(find('Pack up').time,'2:30–2:35 pm');
 assert.equal(5/4,1+1/4);assert.equal(6/4,1+2/4);
 assert.doesNotMatch(JSON.stringify(plan),/Sarang|Nolan|Sunniva|IEP|password|class code|chapter \d/i);
});
test('November 10 student board/details and teacher print agree without exposing notes on projector',()=>{
 const {default:Morning,DayBlockDetails}=load('app/day-plan-morning.tsx');
 const board=renderToStaticMarkup(React.createElement(Morning,{plan}));
 const {default:Print}=load('app/day-plan-print.tsx');
 const teacher=renderToStaticMarkup(React.createElement(Print,{plan}));
 for(const block of plan.blocks){
  assert.ok(board.includes(escape(block.title)));assert.ok(board.includes(escape(block.time)));
  const details=renderToStaticMarkup(React.createElement(DayBlockDetails,{block,planId:plan.id}));
  assert.ok(details.includes(escape(block.firstAction)));
  for(const step of block.studentSteps??[])assert.ok(details.includes(escape(step)));
  if(block.notes){assert.ok(!details.includes(escape(block.notes)));assert.ok(teacher.includes(escape(block.notes)));}
 }
 assert.ok(existsSync(path.join(root,'public',find('Nevermoor').worksheet.href)));
});
test('Tuesday public schedule mirrors the approved day without rewriting other family sections',()=>{
 const source=read('content/current-learning-window-v2.json');
 const published=read('public/generated/public-window-v2.json');
 for(const data of [source,published]){
  const day=data.classSchedule.days.find(d=>d.date===plan.date);
  assert.match(day.morning,/assembly at 9:00 am/);
  assert.match(day.morning,/if laptops are available/);
  assert.match(day.later,/French 12:35–1:35.*optional first introduction/);
  assert.match(day.reminder,/end time.*not confirmed/);
 }
});
