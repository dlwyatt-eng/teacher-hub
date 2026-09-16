import test from 'node:test';
import assert from 'node:assert/strict';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
import {renderToStaticMarkup} from 'react-dom/server';
import React from 'react';
const load=moduleLoader(process.cwd());
const store=load('app/day-plan-store.ts');
const {archiveWeekPlan}=load('app/archive-week-plan.ts');
let data;
function browser(){data=new Map();globalThis.window={localStorage:{getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)},dispatchEvent:()=>{}};}
test('archive keeps the original, dated copies and every changed revision across reload',()=>{
 browser();const original=structuredClone(store.publishedDayPlans[0]);store.saveDayPlan(original);
 const copy={...structuredClone(original),id:'day-2027-09-08',date:'2027-09-08',reflection:'Try fewer movement rounds.'};store.saveDayPlan(copy);
 store.saveDayPlan({...copy,title:'Adjusted second-year plan'});
 assert.equal(store.readDayRevisions().length,3);
 assert.equal(store.listDayPlans().find(p=>p.id===original.id).title,original.title);
 assert.equal(store.dayPlanForDate(copy.date).title,'Adjusted second-year plan');
 store.saveDayPlan({...copy,title:'Adjusted second-year plan'});assert.equal(store.readDayRevisions().length,3);
 assert.equal(store.schoolYear(copy.date),'2027–2028');assert.equal(store.schoolYear('2027-06-30'),'2026–2027');
});
test('backup round trip merges without erasing local plans, rejects invalid or conflicting entries atomically',()=>{
 browser();const p=structuredClone(store.publishedDayPlans[0]);store.saveDayPlan(p);const backup=JSON.parse(JSON.stringify(store.readDayRevisions()));
 data.clear();store.importDayArchive(backup);assert.deepEqual(store.readDayRevisions(),backup);
 store.importDayArchive(backup);assert.equal(store.readDayRevisions().length,1);
 const invalid=structuredClone(backup);invalid[0].plan.blocks[0].href='javascript:alert(1)';assert.throws(()=>store.importDayArchive(invalid));
 const conflict=structuredClone(backup);conflict[0].plan.title='Conflicting version';assert.throws(()=>store.importDayArchive(conflict));assert.deepEqual(store.readDayRevisions(),backup);
});
test('weekly saves retain daily snapshots and prefer explicit daily plan for Morning Screen',()=>{
 browser();const week={weekOf:'2026-09-14',title:'Week one',weekNote:'Move quickly',blocks:[{day:'monday',title:'Read',startTime:'After lunch',timing:'',runSteps:['Choose a book'],notes:'Read quietly'}]};
 archiveWeekPlan(week);assert.equal(store.dayPlanForDate('2026-09-14').blocks[0].title,'Read');archiveWeekPlan(week);assert.equal(store.readDayRevisions().length,1);
 const daily={...structuredClone(store.publishedDayPlans[0]),id:'day-custom',date:'2026-09-14'};store.saveDayPlan(daily);archiveWeekPlan({...week,title:'Changed week'});assert.equal(store.dayPlanForDate('2026-09-14').id,'day-custom');assert.equal(store.readDayRevisions().length,3);
});
test('storage failures are surfaced instead of reporting a saved plan',()=>{browser();window.localStorage.setItem=()=>{throw new Error('Quota exceeded');};assert.throws(()=>store.saveDayPlan(store.publishedDayPlans[0]),/Quota/);assert.equal(store.readDayRevisions().length,0);});
test('projected day contains student sequence and links, not private planning/reflection',()=>{delete globalThis.window;const {DayPlanMorning}=load('app/day-plan-library.tsx');const plan={...structuredClone(store.publishedDayPlans[0]),note:'TEACHER ONLY NOTE',reflection:'PRIVATE REFLECTION'};const html=renderToStaticMarkup(React.createElement(DayPlanMorning,{plan}));assert.match(html,/Welcome to Grade 6/);assert.match(html,/Shape of our day/);assert.match(html,/Werewolf/);assert.doesNotMatch(html,/TEACHER ONLY NOTE|PRIVATE REFLECTION|supervising adult/);});
