import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
import path from 'node:path';
const plan=JSON.parse(readFileSync(new URL('../content/day-plans/day-2026-11-17.json',import.meta.url),'utf8'));
test('Tuesday preserves requested sequence and established breaks',()=>{
 const titles=plan.blocks.map(b=>b.title).join('|');
 assert.match(titles,/SpacesEDU.*Snack.*Recess.*fractions with Math Antics.*Lunch.*French.*Nevermoor.*Prepare for tomorrow.*Community activity/);
 for(const [title,time] of [['Snack','10:20–10:35 am'],['Recess','10:35–10:50 am'],['Lunch','11:50 am–12:35 pm'],['Pack up and dismissal','2:30–2:35 pm']]) assert.equal(plan.blocks.find(b=>b.title===title)?.time,time);
 assert.equal(plan.blocks.find(b=>b.title==='French').time,'After lunch');
});
test('Tuesday is registered and renders the requested learning sequence',()=>{
 const load=moduleLoader(path.resolve(import.meta.dirname,'..'));
 const store=load('app/day-plan-store.ts');
 assert.equal(load('app/classroom-navigation-state.ts').chooseDisplayPlan(store.publishedDayPlans,plan.date).id,plan.id);
 const {default:DayPlanMorning}=load('app/day-plan-morning.tsx');
 const html=renderToStaticMarkup(React.createElement(DayPlanMorning,{plan}));
 for(const title of ['SpacesEDU','Math Antics','French','Nevermoor','Community activity']) assert.ok(html.includes(title));
});
