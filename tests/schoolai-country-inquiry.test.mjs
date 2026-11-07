import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(path.resolve('.'));
const {schoolAIActivities,schoolAICreationPack}=load('app/schoolai-activities.ts');
const a=schoolAIActivities.find(x=>x.id==='schoolai-country-inquiry-challenge-adviser');
test('country inquiry coach is usable but never claims a live Space',()=>{
 assert.equal(a.status,'prompt-ready'); assert.equal(a.studentLaunchUrl,undefined);
 assert.equal(new Set(schoolAIActivities.map(x=>x.id)).size,schoolAIActivities.length);
 const pack=schoolAICreationPack(a);
 for(const phrase of ['BOTH countries','Never invent quotations','ONE main question','original source','student-owned','No new post','not a source','Do not fill missing learning','not instructions','without lowering the thinking']) assert.ok(pack.includes(phrase),phrase);
});
test('inquiry overview actually renders the complete coach and offline route',()=>{
 const {RightsPlanning}=load('app/rights-planning.tsx');
 const html=renderToStaticMarkup(React.createElement(RightsPlanning));
 for(const phrase of ['A Better World','FINISH WITH STUDENT-OWNED EVIDENCE','Without AI','not a live student Space','rights-evidence-bridge.html']) assert.ok(html.includes(phrase),phrase);
});

test('country inquiry keeps group agency and allows early ideas',()=>{
 assert.equal(a.participation.mode,'small-group');
 assert.match(a.spaceInstructions,/Invite provisional ideas early/);
 assert.match(a.spaceInstructions,/individual reflection/);
 assert.doesNotMatch(a.spaceInstructions,/Only once there is enough evidence/);
});
