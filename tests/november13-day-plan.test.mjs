import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = p => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'));
const plan = read('../content/day-plans/day-2026-11-13.json');
const source = read('../content/current-learning-window-v2.json');
const published = read('../public/generated/public-window-v2.json');

test('Friday puts Health and existing SpacesEDU work first without moving fixed commitments', () => {
  assert.equal(plan.id, 'day-2026-11-13');
  assert.equal(plan.blocks[1].time, '8:45–9:35 am');
  assert.match(plan.blocks[1].title, /Health/);
  assert.match(plan.blocks[1].notes, /If the Health work leaves time.*Nevermoor/);
  for (const [title, time] of [['French','9:35–10:35 am'],['Recess','10:35–10:50 am'],['Snack','10:50–11:10 am'],['PE','11:10–11:50 am'],['Lunch','11:50 am–12:35 pm'],['Quiet reset','12:35–12:50 pm'],['Pack up and dismissal','2:30–2:35 pm']]) {
    assert.equal(plan.blocks.find(b => b.title === title)?.time, time);
  }
  assert.match(plan.blocks[8].title, /SpacesEDU/);
  assert.match(plan.blocks[8].notes, /laptops are confirmed booked/);
  assert.match(plan.blocks[9].notes, /Only if enough students are ready/);
  assert.doesNotMatch(plan.blocks.map(b => b.title).join(' '), /Maths|Art ·/);
  assert.match(plan.note, /Leadership.*2:45–3:30/);
  assert.match(plan.backups.join(' '), /No new homework or posting deadline/);
});

test('Friday public summaries match priorities without family-facing device logistics', () => {
  const day = source.classSchedule.days.find(d => d.date === plan.date);
  assert.match(day.morning, /Health/);
  assert.match(day.later, /finish first-term work and SpacesEDU postings/);
  assert.match(day.later, /only if|optional if/);
  assert.deepEqual(published.classSchedule, source.classSchedule);
  assert.deepEqual(published.classroomWelcome, source.classroomWelcome);
  assert.match(source.classroomWelcome.later, /if students are ready/);
  assert.doesNotMatch(source.classroomWelcome.next + source.classroomWelcome.later, /laptops|booked|12:50|prep block/i);
  assert.equal(source.classroomWelcome.spaces.status, 'invited');
  assert.equal(published.contentVersion, source.contentVersion);
});
