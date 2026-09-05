import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(path.resolve(import.meta.dirname,'..'));
const {explorationRegister:register,explorationsForLesson,explorationLessonUrl,LessonExplorations}=load('app/virtual-explorations.tsx');
const {ExplorationPlayer}=load('app/exploration-player.tsx');
const {scienceLessons}=load('app/science-program.ts');
const {socialLessons}=load('app/social-program.ts');
const {coreLearningPrograms}=load('app/core-programs.ts');
const {integratedLearningPrograms}=load('app/integrated-programs.ts');
const programs={...coreLearningPrograms,...integratedLearningPrograms};

test('every exploration points at a real lesson and existing scene',()=>{
 for(const p of register.placements){
  const list=p.kind==='science'?scienceLessons:p.kind==='social'?socialLessons:programs[p.subject]?.experiences;
  assert.ok(list,`Missing subject ${p.subject}`);
  const lesson=list.find(l=>l.id===p.lessonId); assert.ok(lesson,p.lessonId);
  if(p.scene!==undefined)assert.ok(lesson.scenes[p.scene],`${p.lessonId} scene ${p.scene}`);
  assert.ok(explorationsForLesson(p.lessonId,p.scene).some(t=>t.id===p.tourId));
  const params=new URL(explorationLessonUrl(p,true),'https://example.org/teacher-hub/').searchParams;
  assert.equal(params.get('mode'),'student');
  assert.equal(params.get(p.kind==='science'?'lesson':p.kind==='social'?'socialLesson':'experience'),p.lessonId);
 }
 assert.equal(explorationsForLesson('balance-case',0).length,0,'Kidney visit must not displace the initial case');
 assert.equal(explorationsForLesson('magnitude-gallery').length,0,'Do not alter the repaired math route');
});
test('student and family views exclude teacher responses; backups survive closed views',()=>{
 for(const tour of register.trips){
  const sentinel={...tour,teacher:{...tour.teacher,model:'PRIVATE_TEACHER_RESPONSE_SENTINEL'}};
  for(const audience of ['student','family']){
   const html=renderToStaticMarkup(React.createElement(ExplorationPlayer,{tour:sentinel,audience,initiallyOpen:true}));
   assert.doesNotMatch(html,/PRIVATE_TEACHER_RESPONSE_SENTINEL|<iframe|<video/);
   assert.match(html,/Without video/);
  }
  const teacher=renderToStaticMarkup(React.createElement(ExplorationPlayer,{tour:sentinel,audience:'teacher',initiallyOpen:true}));
  assert.match(teacher,/PRIVATE_TEACHER_RESPONSE_SENTINEL/);
  const closed=renderToStaticMarkup(React.createElement(ExplorationPlayer,{tour}));
  assert.match(closed,/<\/details><section class="exploration__print"/,'Printable backup must be outside closed details');
  for(const fact of tour.fallback.facts)assert.ok(closed.includes(renderToStaticMarkup(React.createElement('li',null,fact))));
 }
});
test('space alternatives mount only one exploration and never eager-load media',()=>{
 const html=renderToStaticMarkup(React.createElement(LessonExplorations,{lessonId:'cosmic-exhibit-studio',scene:1,initiallyOpen:true}));
 assert.match(html,/Choose one destination/);
 assert.equal((html.match(/class="exploration-frame"/g)||[]).length,1);
 assert.doesNotMatch(html,/<iframe|<video/);
});
test('media references retain direct originals and source-grounded fallbacks',()=>{
 for(const t of register.trips){
  assert.equal(new URL(t.sourceUrl).protocol,'https:');
  if(t.youtubeId)assert.equal(new URL(t.launchUrl).searchParams.get('v'),t.youtubeId);
  assert.ok(t.teacher.verification.includes('2026-09-05')||t.teacher.verification.includes('Source reviewed'));
  assert.ok(t.fallback.facts.length && t.fallback.action && t.teacher.curriculum);
 }
 const amazon=register.trips.find(t=>t.id==='amazon-researchers');
 assert.ok(amazon.supportingSources.some(s=>s.url.includes('explorer-margaret-awuor-owuor')));
 assert.match(amazon.teacher.sourceNotes,/separate.*2022/);
 assert.match(register.trips.find(t=>t.id==='turtle-camera').teacher.misconception,/camera|eyes/i);
});
