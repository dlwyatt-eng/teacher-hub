import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const root=path.resolve(import.meta.dirname,'..');
const load=moduleLoader(root);
const data=JSON.parse(readFileSync(path.join(root,'content/communication-visuals.json'),'utf8'));
test('communication visual set provides five real images, readable text and a printable',()=>{
 assert.equal(data.posters.length,5);
 assert.equal(new Set(data.posters.map(p=>p.id)).size,5);
 for(const poster of data.posters){
  assert.ok(existsSync(path.join(root,'public',poster.image)),poster.image);
  assert.ok(poster.alt.length>30);
  assert.ok(poster.text.join(' ').length>100);
 }
 const pdf=readFileSync(path.join(root,'public/printables/communication-feelings-needs-boundaries.pdf'));
 assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
 assert.match(JSON.stringify(data),/boundar/i);
 assert.match(JSON.stringify(data),/trusted adult/i);
});
test('teacher and projector routes retain visual controls, accessible text and safety',()=>{
 const Component=load('app/communication-visuals.tsx').default;
 const teacher=renderToStaticMarkup(React.createElement(Component));
 const student=renderToStaticMarkup(React.createElement(Component,{projector:true}));
 for(const html of [teacher,student]){
  assert.match(html,/Teaching visual/);
  assert.match(html,/Read the visual as text/);
  assert.match(html,/Download all five posters/);
  assert.match(html,/not your fault/);
  assert.equal((html.match(/<option /g)||[]).length,5);
 }
 assert.match(teacher,/Teach boundaries before a Health reflection/);
 assert.match(teacher,/no teaching date, upload or deadline/);
 assert.doesNotMatch(student,/Teach boundaries before a Health reflection|Sam asks/);
 const Practice=load('app/community-practice.tsx').default;
 assert.match(renderToStaticMarkup(React.createElement(Practice,{deck:'nvc'})),/communication-visuals-title/);
 assert.doesNotMatch(renderToStaticMarkup(React.createElement(Practice,{deck:'agreements'})),/communication-visuals-title/);
});
test('PHE resources cross-link existing NVC without changing its schedule',()=>{
 const program=load('app/integrated-programs.ts').pheProgram;
 assert.ok(program.resources.some(r=>r.url==='?view=Games+%26+Activities&deck=nvc#communication-visuals'));
 const plan=JSON.parse(readFileSync(path.join(root,'content/day-plans/day-2026-10-28.json')));
 assert.ok(!plan.blocks.some(b=>/health/i.test(b.title)));
});
