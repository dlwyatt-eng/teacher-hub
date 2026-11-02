import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const render=(Component,props={})=>renderToStaticMarkup(React.createElement(Component,props));
test('Health reflection offers a model, fictional practice and equivalent response options',()=>{
 const Component=load('app/communication-visuals.tsx').default;
 for(const projector of [false,true]){
  const html=render(Component,{projector});
  assert.match(html,/Alex wants quiet time/);
  assert.match(html,/Robin asks a friend not to share a drawing/);
  assert.match(html,/Talk, write, draw and label, point to choices, use AAC/);
  assert.match(html,/You can pass/);
  assert.match(html,/No new post or homework is required/);
  assert.match(html,/We cannot know their feelings without asking/);
  assert.match(html,/Print this reflection/);
  assert.equal((html.match(/class="health-answer-space"/g)||[]).length,3);
  assert.equal((html.match(/<option /g)||[]).length,5);
 }
 assert.doesNotMatch(render(Component,{projector:true}),/Teacher check—not a new rubric/);
 assert.match(render(Component),/Do not score personal disclosure/);
 const css=readFileSync(path.join(root,'app/community-practice.css'),'utf8');
 assert.match(css,/\.health-reflection button,\.health-reflection-teacher\{display:none!important/);
});
test('Scoreboard optional budget bridge is visible without solving the game and keeps practice answers teacher-only',()=>{
 const Component=load('app/math-scoreboard-lab.tsx').default;
 const student=render(Component,{audience:'student'});
 const teacher=render(Component,{audience:'teacher'});
 for(const html of [student,teacher]){
  assert.match(html,/OPTIONAL CONNECTION/);
  assert.match(html,/Our class has \$60/);
  assert.match(html,/4 packs of game cards at \$6 each and 3 packs of pencils at \$4 each/);
  assert.match(html,/\[60 − \(4 × 6 \+ 3 × 4\)\] ÷ 2/);
  assert.match(html,/each station receives <strong>\$12/);
  assert.match(html,/A class has \$50/);
  assert.match(html,/It is not a new assignment or posting requirement/);
  assert.match(html,/Print model \+ practice/);
  assert.match(html,/Moon-crystal run/);
 }
 assert.doesNotMatch(student,/\$8 per station/);
 assert.match(teacher,/\$8 per station/);
 const workbench=readFileSync(path.join(root,'app/math-resource-workbench.tsx'),'utf8');
 assert.match(workbench,/ScoreboardRuleLab audience=\{projector \? 'student' : 'teacher'\}/);
 assert.equal((60-(4*6+3*4))/2,12);
 assert.equal((50-(3*6+2*4))/3,8);
 const css=readFileSync(path.join(root,'app/math-scoreboard-lab.css'),'utf8');
 assert.match(css,/\.game-budget-bridge header button,\.game-budget-teacher\{display:none!important/);
});
