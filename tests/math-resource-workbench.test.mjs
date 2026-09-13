import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(path.resolve(import.meta.dirname,'..'));
const {MathResourceWorkbench,MathWorksheetDiscussion,MathCompanionSelector}=load('app/math-resource-workbench.tsx');
const {worksheetCompanions}=load('app/math-worksheet-companions.ts');
const {mathExperienceModePlans}=load('app/math-delivery-modes.ts');
const {savedResourceIndex}=load('app/saved-resource-index.ts');
const render=(component,props)=>renderToStaticMarkup(React.createElement(component,props));

test('all 15 lesson launches expose direct practice and teacher keys without opening preparation',()=>{
 for(const plan of mathExperienceModePlans){
  const html=render(MathResourceWorkbench,{experienceId:plan.experienceId});
  assert.match(html,/Worksheet PDF/);assert.match(html,/Teacher answer key/);
  assert.match(html,/Games &amp; tools/);assert.match(html,/Saved teaching resources/);
 }
});
test('operation order and sale lessons use their actual lesson focus',()=>{
 const order=render(MathResourceWorkbench,{experienceId:'scoreboard-rules'});
 assert.match(order,/Worksheets_OrderOfOperations.pdf/);assert.doesNotMatch(order,/Worksheets_MultiDigitMultiplication/);
 assert.match(order,/Brackets and operation order/);
 const sale=render(MathResourceWorkbench,{experienceId:'sale-lab'});
 assert.match(sale,/Discount or final price/);assert.doesNotMatch(sale,/Worksheets_ComparingFractions.pdf/);
 for(const id of ['scoreboard-rules','sale-lab'])assert.match(render(MathCompanionSelector,{experienceId:id,packIds:['operations-fluency-pack']}),new RegExp(worksheetCompanions[id].title.replace('?','\\?')));
});
test('student launch omits teacher-file links and saved-resource access',()=>{
 for(const plan of mathExperienceModePlans){const html=render(MathResourceWorkbench,{experienceId:plan.experienceId,projector:true});assert.doesNotMatch(html,/Teacher answer key|_Answers.pdf|Saved teaching resources|drive.google.com/);assert.match(html,/Games &amp; tools/);}
});
test('every discussion keeps its printable problem and exit question while excluding unrevealed solutions',()=>{
 for(const [id,task] of Object.entries(worksheetCompanions)){
  const previous=[task.answer,task.checkAnswer];task.answer='PRIVATE_SOLUTION_SENTINEL';task.checkAnswer='PRIVATE_SOLUTION_SENTINEL';
  try{const html=render(MathWorksheetDiscussion,{packId:id});assert.doesNotMatch(html,/PRIVATE_SOLUTION_SENTINEL/);for(const prompt of [task.prompt,task.check])assert.ok(html.includes(render('h3',{children:prompt})),id);}
  finally{[task.answer,task.checkAnswer]=previous;}
 }
});
test('the resource index preserves 59 distinct source files and identifies unreadable originals',()=>{
 assert.equal(savedResourceIndex.length,59);assert.equal(new Set(savedResourceIndex.map(r=>r.id)).size,59);
 for(const r of savedResourceIndex){assert.match(r.url,/^https:\/\/(drive|docs).google.com\//);assert.ok(r.note&&r.use&&r.review);}
 assert.equal(savedResourceIndex.find(r=>r.title==='Pop-art pet colouring').fit,'Preview needed');
 assert.match(savedResourceIndex.find(r=>r.title==='World-language substitute choice board').note,/not a ready Grade 6/);
});
