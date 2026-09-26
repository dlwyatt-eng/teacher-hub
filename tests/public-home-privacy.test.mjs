import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

test('public bundle excludes the internal build-review panel and student day blocks keep titles', async()=>{
  const page=await readFile(new URL('../app/page.tsx',import.meta.url),'utf8');
  const projection=await readFile(new URL('../app/day-plan-morning.tsx',import.meta.url),'utf8');
  const plan=JSON.parse(await readFile(new URL('../content/day-plans/day-2026-09-23.json',import.meta.url),'utf8'));
  assert.doesNotMatch(page, /import\("\.\/visual-review-studio"\)/);
  assert.doesNotMatch(page,/CLASSROOM OS DEVELOPMENT|STOP \/ GO REVIEW|YOUR REVIEW QUEUE|Tell me when a section is fully approved/);
  assert.match(projection,/day-block-title/);
  assert.ok(plan.blocks.length>10);
  assert.ok(plan.blocks.every(block=>block.time && block.title));
});
