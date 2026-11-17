import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
import path from 'node:path';
const plan=JSON.parse(readFileSync(new URL('../content/day-plans/day-2026-11-18.json',import.meta.url),'utf8'));
test('Wednesday preserves requested workshop, conditional fractions and flexible afternoon',()=>{
 const titles=plan.blocks.map(b=>b.title).join('|');
 assert.match(titles,/Nevermoor.*Racial-equity.*Snack.*Recess.*fractions, if time allows.*Lunch.*Learning choices/);
 assert.equal(plan.blocks.find(b=>b.title==='Racial-equity workshop').time,'9:15–10:15 am');
 for(const [title,time] of [['Snack','10:20–10:35 am'],['Recess','10:35–10:50 am'],['Lunch','11:50 am–12:35 pm'],['Pack up and dismissal','2:30–2:35 pm']]) assert.equal(plan.blocks.find(b=>b.title===title)?.time,time);
 assert.match(plan.note,/1:05–1:30.*1:35–2:10/);
 assert.ok(!plan.blocks.some(b=>b.title==='French'));
});
test('Wednesday is registered and renders requested student-safe sequence',()=>{
 const load=moduleLoader(path.resolve(import.meta.dirname,'..'));
 const store=load('app/day-plan-store.ts');
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
 const {default:DayPlanMorning}=load('app/day-plan-morning.tsx');
 const html=renderToStaticMarkup(React.createElement(DayPlanMorning,{plan}));
 for(const title of ['Nevermoor','Racial-equity','fractions','Learning choices']) assert.ok(html.includes(title));
});
