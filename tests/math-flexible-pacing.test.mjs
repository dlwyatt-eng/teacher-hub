import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(path.resolve(import.meta.dirname,'..'));
const {mathPacingLessons,mathPacingWeeks,mathPacingUnits,mathPacingTotals}=load('app/math-week-pacing.ts');
const {mathSupportPacks}=load('app/math-program-supports.ts');
const {mathematicsProgram}=load('app/core-programs.ts');
const {yearWeekLaunches}=load('app/year-week-registry.ts');
const {MathPacedLesson,MathPacingPanel}=load('app/math-pacing-panel.tsx');
const {weeklyPlanFromSeed,mergeWeekPlanSeed}=load('app/weekly-plan.tsx');
const render=(Component,props)=>renderToStaticMarkup(React.createElement(Component,props));

test('every post-opening teaching week has an explicit math plan without duplicating investigations',()=>{
 assert.equal(mathPacingWeeks.length,yearWeekLaunches.length);
 assert.equal(new Set(mathPacingWeeks.map(w=>w.weekOf)).size,mathPacingWeeks.length);
 const scheduled=mathPacingWeeks.flatMap(w=>w.lessonIds);
 assert.deepEqual([...scheduled].sort(),Object.keys(mathPacingLessons).sort());
 assert.equal(new Set(scheduled).size,scheduled.length);
 assert.deepEqual(mathPacingTotals,{lessons:41,teachingWeeks:28,flexWeeks:8});
 for(const week of mathPacingWeeks){
  const launch=yearWeekLaunches.find(w=>w.seed.weekOf===week.weekOf);assert.ok(launch,week.weekOf);
  const math=launch.seed.lessons.filter(l=>l.subject==='Mathematics');
  assert.equal(math.length,week.kind==='flex'?1:week.lessonIds.length,week.weekOf);
  assert.ok(week.lessonIds.length<=2);
  assert.ok(math.every(l=>/^math-(paced|flex)-/.test(l.sourceId)));
  if(week.kind==='flex')assert.equal(week.lessonIds.length,0);
 }
});
test('every focused lesson resolves to existing resources and student print contains the actual task but no teacher key',()=>{
 for(const lesson of Object.values(mathPacingLessons)){
  assert.ok(mathSupportPacks.some(p=>p.id===lesson.packId),lesson.id);
  assert.ok(mathematicsProgram.experiences.some(e=>e.id===lesson.experienceId),lesson.id);
  const copy={...lesson,answer:'TEACHER_ONLY_SENTINEL'};
  const student=render(MathPacedLesson,{lesson:copy,student:true});
  for(const text of [lesson.model,lesson.task,lesson.check])assert.ok(student.includes(render('p',{children:text})),lesson.id);
  assert.doesNotMatch(student,/TEACHER_ONLY_SENTINEL|drive.google.com|mathantics.com\/files\//);
  assert.match(render(MathPacedLesson,{lesson:copy}),/TEACHER_ONLY_SENTINEL/);
 }
});
test('core coverage stays explicit, optional extensions do not displace the main sequence',()=>{
 const coverage=new Set(mathPacingUnits.flatMap(u=>u.coverage));
 for(const topic of ['small to large numbers','multiplication and division facts','factors and multiples','order of operations','improper fractions and mixed numbers','ratios','whole-number percents','multiplication and division of decimals','percentage discounts','financial literacy','increasing and decreasing patterns','one-step equations','line graphs','single-outcome probability','angle measurement and classification','triangles','perimeter of complex shapes','area of triangles parallelograms and trapezoids','volume and capacity','combinations of transformations']) assert.ok(coverage.has(topic),topic);
 assert.ok(!Object.values(mathPacingLessons).some(l=>l.packId==='integer-number-line-pack'||l.experienceId==='space-under-constraints'));
 const flex=render(MathPacingPanel,{weekOf:'2027-03-08'});
 assert.match(flex,/no new lesson scheduled/);assert.doesNotMatch(flex,/Project:/);
});
test('adding the new weekly suggestions preserves an existing teacher-edited block and does not duplicate focused lessons',()=>{
 const seed=yearWeekLaunches.find(w=>w.seed.weekOf==='2026-10-05').seed;
 const plan=weeklyPlanFromSeed(seed);plan.blocks[0].title='Teacher-edited activity';
 const merged=mergeWeekPlanSeed(plan,seed);
 assert.equal(merged.blocks[0].title,'Teacher-edited activity');assert.equal(merged.blocks.length,plan.blocks.length);
});

test('the source-based lessons keep attribution and discussion on student screens while excluding teacher preparation',()=>{
 for(const id of ['t1','c3']){
  const lesson=mathPacingLessons[id];
  const html=render(MathPacedLesson,{lesson:{...lesson,source:{...lesson.source,teacherNote:'TEACHER_PREPARATION_SENTINEL'}},student:true});
  assert.ok(html.includes(lesson.source.url));
  assert.ok(html.includes(render('p',{children:lesson.source.summary})));
  assert.ok(html.includes(render('p',{children:lesson.source.prompt})));
  assert.match(html,/Jungic|Jungić/);assert.match(html,/MacLean/);
  assert.doesNotMatch(html,/TEACHER_PREPARATION_SENTINEL/);
 }
});
test('every weekly math seed retains its fact opportunity and complete notes after planner normalization',()=>{
 for(const launch of yearWeekLaunches){
  const plan=weeklyPlanFromSeed(launch.seed);
  for(const source of launch.seed.lessons.filter(l=>l.subject==='Mathematics')){
   const block=plan.blocks.find(b=>b.sourceId===source.sourceId);assert.ok(block);
   assert.ok(block.runSteps.some(s=>s.includes('Brief fact strategy:')),source.sourceId);
   assert.ok((source.notes?.length??0)<=1800,`${source.sourceId}: notes exceed planner limit`);
   assert.match(block.notes,/Teacher check:|Fact check:/);
   assert.ok(block.runSteps.some(s=>s.includes('Independent check:')||s.includes('No new upload')));
  }
 }
});
