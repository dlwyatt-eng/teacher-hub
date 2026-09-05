import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const {formatCompact,zoneFor,MathNumberScaleLab}=load('app/math-number-scale-lab.tsx');
const {MathStudentWorkshops}=load('app/math-program.tsx');
const {mathSupportPacks}=load('app/math-program-supports.ts');
const {mathExperienceModePlans}=load('app/math-delivery-modes.ts');
const {resolveStudentLessonContract}=load('app/student-lesson-contract.ts');

test('number-line feedback accepts a point on the ending mark of its section',()=>{
 for(const [value,max,section] of [[0,1,0],[.1,1,0],[.10001,1,1],[.8,1,7],[.08,.1,7],[.008,.01,7],[1,1,9],[1.01,1,'off']]){
  assert.equal(zoneFor(value,max),section,`${value} on 0–${max}`);
 }
});
test('whole-number tick labels preserve meaningful final zeroes',()=>{
 for(const value of [10,100,1000,10000,500000])assert.equal(formatCompact(value,1000000),String(value));
 assert.equal(formatCompact(.005,.01),'.005'.replace(/^\./,'0.'));
 assert.equal(formatCompact(1,1),'1');
});
test('the initial lab and the actual student first action agree on a thousandths-sized jump',()=>{
 const html=renderToStaticMarkup(React.createElement(MathNumberScaleLab));
 assert.match(html,/START HERE · 0\.008 ON 0 → 0\.01/);
 assert.match(html,/Each jump is 0\.001/);
 assert.match(resolveStudentLessonContract('magnitude-gallery').firstAction,/0-to-0\.01/);
 assert.doesNotMatch(html,/off-scale challenge|deliberate/);
});
test('every math student workshop retains all printable prompts and excludes teacher answers',()=>{
 const saved=mathSupportPacks.map(p=>({p,partner:p.partnerCards.map(c=>c.answer),checks:p.check.map(c=>c.answer)}));
 try{
  for(const {p}of saved){p.partnerCards.forEach(c=>c.answer='TEACHER_ANSWER_SENTINEL');p.check.forEach(c=>c.answer='TEACHER_ANSWER_SENTINEL');}
  for(const plan of mathExperienceModePlans){
   const html=renderToStaticMarkup(React.createElement(MathStudentWorkshops,{experienceId:plan.experienceId}));
   assert.doesNotMatch(html,/TEACHER_ANSWER_SENTINEL/);
   assert.match(html,/1 · See an example/);
   assert.match(html,/2 · Try together/);
   assert.match(html,/3 · Try on your own/);
   for(const id of plan.conceptPackIds){
    const p=mathSupportPacks.find(p=>p.id===id);
    for(const item of p.check)assert.ok(html.includes(renderToStaticMarkup(React.createElement('p',null,item.prompt))),`${id}: a printable question disappeared`);
   }
  }
 }finally{for(const {p,partner,checks}of saved){p.partnerCards.forEach((c,i)=>c.answer=partner[i]);p.check.forEach((c,i)=>c.answer=checks[i]);}}
});
test('fraction print content retains all representations even when the first example is selected',()=>{
 const html=renderToStaticMarkup(React.createElement(MathStudentWorkshops,{experienceId:'fraction-ratio-remix'}));
 for(const cls of ['math-quarter-model','math-fraction-compare','math-ratio-model','math-model-percent'])assert.ok(html.includes(cls),cls);
});
test('transformation task and individual check both require a combination in the first quadrant',()=>{
 const contract=resolveStudentLessonContract('transformation-cipher');
 assert.match(contract.finishEvidence.join(' '),/Two correct transformations/);
 const pack=mathSupportPacks.find(p=>p.id==='first-quadrant-transformations-pack');
 const check=pack.check.find(c=>c.prompt.includes('A(1,1)'));
 assert.ok(check);
 assert.match(check.answer,/A′\(3,2\).*A″\(5,2\)/);
 assert.match(check.answer,/B′\(5,2\).*B″\(3,2\)/);
});
