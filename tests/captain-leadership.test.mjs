import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(path.resolve(import.meta.dirname,'..'));
const {captainRoutes}=load('app/captain-leadership.ts');
const {CaptainRouteContent}=load('app/captain-leadership-panel.tsx');
const render=props=>renderToStaticMarkup(React.createElement(CaptainRouteContent,props));
test('captain print content preserves every activity input, action and check',()=>{
 for(const route of captainRoutes){const html=render({route});for(const step of route.steps){assert.ok(html.includes(renderToStaticMarkup(React.createElement('p',null,step.action))));assert.ok(html.includes(step.title));}assert.ok(html.includes(route.finish));assert.match(html,/Have ready:/);}
});
test('captain projection shows one step while the complete print retains the story model',()=>{
 const route=captainRoutes.find(r=>r.id==='werewolf');const html=render({route,step:1});assert.match(html,/At dusk/);assert.doesNotMatch(html,/After the round, partners/);assert.match(render({route}),/After the round, partners/);
});
test('every weekly captain reminder survives planner normalization',()=>{
 const {yearWeekLaunches}=load('app/year-week-registry.ts');const {weeklyPlanFromSeed}=load('app/weekly-plan.tsx');for(const w of yearWeekLaunches){assert.ok(w.seed.weekNote.length<=1800);const plan=weeklyPlanFromSeed(w.seed);assert.match(plan.weekNote,/Captain routine:/);}
});
