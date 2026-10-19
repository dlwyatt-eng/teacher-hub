import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const plan=JSON.parse(readFileSync(new URL('../content/day-plans/day-2026-10-20.json',import.meta.url),'utf8'));
const registry=readFileSync(new URL('../app/day-plan-store.ts',import.meta.url),'utf8');
test('October 20 keeps the approved Tuesday timetable and confirmed morning laptops',()=>{
 assert.equal(plan.id,'day-2026-10-20'); assert.equal(plan.date,'2026-10-20');
 assert.equal(plan.status,undefined);
 assert.deepEqual(plan.blocks.map(b=>b.time),['8:35–8:45 am','8:45–10:20 am','10:20–10:35 am','10:35–10:50 am','10:50–11:50 am','11:50 am–12:35 pm','12:35–1:35 pm','1:35–1:45 pm','1:45–2:10 pm','2:10–2:20 pm','2:20–2:30 pm','2:30–2:35 pm']);
 assert.match(plan.blocks[1].title,/Laptops/);
 assert.match(plan.blocks[1].notes,/Laptops confirmed/);
 assert.match(plan.blocks[1].notes,/30 minutes/);
 assert.match(plan.blocks[4].title,/Maths/);
 assert.equal(plan.blocks[6].title,'Core French · Mr. Eckert');
 assert.match(plan.blocks[8].notes,/printed Chapter 6/);
});
test('October 20 has concrete student directions without private meeting or support details',()=>{
 for(const block of plan.blocks){
  assert.ok(block.firstAction?.trim());
  assert.ok(block.title.length<=180 && block.time.length<=60 && block.notes.length<=6000);
  assert.ok(!block.studentSteps || (block.studentSteps.length<=8 && block.studentSteps.every(s=>s.length<=500)));
  assert.equal(block.teacherReference,undefined);
  if(block.activity)assert.equal(block.activity.studentSafe,true);
 }
 assert.doesNotMatch(JSON.stringify(plan),/\bIEP\b|pull-out|support room|meeting coverage/i);
 assert.match(plan.note,/No inequalities upload is required/);
});
test('October 20 is registered alongside the preserved Monday plan',()=>{
 assert.match(registry,/import october20 from '..\/content\/day-plans\/day-2026-10-20.json'/);
 assert.match(registry,/import october19 from '..\/content\/day-plans\/day-2026-10-19.json'/);
 assert.match(registry,/october19,october20\]/);
});
