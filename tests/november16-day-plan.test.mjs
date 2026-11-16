import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const plan=JSON.parse(readFileSync(new URL('../content/day-plans/day-2026-11-16.json',import.meta.url),'utf8'));
test('Monday includes requested subjects and work time without booking details',()=>{
 assert.equal(plan.date,'2026-11-16');
 for(const subject of ['Mathematics','Language Arts','Social Studies','ADST','SpacesEDU']) assert.ok(plan.blocks.some(b=>b.title.includes(subject)));
 assert.doesNotMatch(JSON.stringify(plan),/laptop|booked|cart|Sunniva|Nolan|Sarang/i);
 for(const [title,time] of [['Snack','10:20–10:35 am'],['Recess','10:35–10:50 am'],['Lunch','11:50 am–12:35 pm'],['Pack up and dismissal','2:30–2:35 pm']]) assert.equal(plan.blocks.find(b=>b.title===title)?.time,time);
 assert.match(plan.note,/first-term/);
 assert.match(plan.note,/second-term/);
 const store=readFileSync(new URL('../app/day-plan-store.ts',import.meta.url),'utf8');
 assert.match(store,/november13,november16/);
});
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
import path from 'node:path';
test('Monday resolves on its date and renders requested subject titles',()=>{
 const load=moduleLoader(path.resolve(import.meta.dirname,'..'));
 const store=load('app/day-plan-store.ts');
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
 const {default:DayPlanMorning}=load('app/day-plan-morning.tsx');
 const html=renderToStaticMarkup(React.createElement(DayPlanMorning,{plan}));assert.match(html,/SpacesEDU/);assert.doesNotMatch(html,/booked|laptop/i);
});
