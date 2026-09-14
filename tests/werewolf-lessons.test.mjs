import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import fs from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');const load=moduleLoader(root);
const {werewolfLessons,werewolfRules,narratorScript}=load('app/werewolf-lessons.ts');
const {WerewolfLessonStudio,WerewolfPrintPack}=load('app/werewolf-studio.tsx');
const {languageArtsProgram}=load('app/core-programs.ts');
const {resolveStudentLessonContractForExperience}=load('app/student-lesson-contract.ts');
const render=(C,props)=>renderToStaticMarkup(React.createElement(C,props));
test('six Werewolf lessons resolve through the ELA catalogue and student contracts',()=>{
 assert.equal(werewolfLessons.length,6);
 for(const l of werewolfLessons){const e=languageArtsProgram.experiences.find(e=>e.id===l.id);assert.ok(e);const c=resolveStudentLessonContractForExperience(e);assert.equal(c.reviewState,'reviewed');assert.equal(c.steps.length,l.steps.length);assert.match(c.steps[0].action,new RegExp(l.steps[0].action.slice(0,20).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));}
});
test('student first screens supply models and resource links without teacher answers',()=>{
 for(const lesson of werewolfLessons){const html=render(WerewolfLessonStudio,{lesson,projector:true});assert.ok(!html.includes(lesson.answer));assert.ok(!html.includes(lesson.prep));assert.match(html,/Narrator script/);assert.match(html,/werewolf\/print.html/);assert.ok(html.includes(lesson.steps[0].title));assert.ok(!html.includes(lesson.steps.at(-1).action));}
});
test('print pack preserves every lesson model and all rules without exit-answer keys',()=>{
 const html=render(WerewolfPrintPack,{});for(const lesson of werewolfLessons){assert.ok(!html.includes(lesson.answer));for(const s of lesson.steps){assert.ok(html.includes(render('p',{children:s.action})));if(s.model)assert.ok(html.includes(render('blockquote',{children:s.model})));}}
 for(const r of [...werewolfRules,...narratorScript])assert.ok(html.includes(render('p',{children:r.text})));
 assert.equal((html.match(/<h3>WEREWOLF<\/h3>/g)||[]).length,2);assert.equal((html.match(/<h3>SEER<\/h3>/g)||[]).length,1);assert.equal((html.match(/<h3>VILLAGER<\/h3>/g)||[]).length,9);
 for(const file of ['role-cards.png','rules-poster.png','print.html'])assert.ok(fs.statSync(path.join(root,'public/werewolf',file)).size>100);
});
