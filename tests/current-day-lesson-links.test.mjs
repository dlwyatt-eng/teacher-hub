import test from 'node:test';
import {existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import { moduleLoader } from './helpers/load-rendered-module.mjs';

const load = moduleLoader(process.cwd());
const { publishedDayPlans, isSafeDayHref } = load('app/day-plan-store.ts');
const { classroomLaunchFor } = load('app/lesson-classroom-launches.ts');
const { mathematicsProgram, languageArtsProgram } = load('app/core-programs.ts');
const { careerProgram } = load('app/integrated-programs.ts');
const day = date => publishedDayPlans.find(plan => plan.date === date);

test('current dated lesson references select the exact matching focused experience, never a remembered subject default', () => {
  const expected = [
    ['2026-10-01', 'Mathematics · compare whole numbers and decimals', 'magnitude-gallery', mathematicsProgram],
    ['2026-10-01', 'English Language Arts · Nevermoor', 'character-council', languageArtsProgram],
    ['2026-10-01', 'Career Education and ADST · Action Pack inquiry', 'career-constellation', careerProgram],
    ['2026-10-02', 'Mathematics · decimal check and next steps', 'magnitude-gallery', mathematicsProgram],
  ];
  for (const [date, title, id, program] of expected) {
    const block = day(date).blocks.find(item => item.title === title);
    assert.ok(block, `${date}: ${title}`);
    assert.ok(isSafeDayHref(block.href));
    const params = new URL(block.href, 'https://dlwyatt-eng.github.io/teacher-hub/').searchParams;
    assert.equal(params.get('experience'), id);
    assert.equal(params.get('subject'), program.subject);
    assert.equal(params.get('mode'), 'student');
    assert.ok(program.experiences.some(experience => experience.id === id), `${id} is a real subject lesson`);
    assert.equal(classroomLaunchFor(id).subject, program.subject);
  }
});

test('exact references preserve next-day teacher choice and do not invent worksheet attachments or lessons', () => {
  const friday = day('2026-10-02');
  assert.equal(friday.blocks.find(block => block.title.startsWith('Mathematics')).notes,
    'Use the prior lesson evidence to choose practice or reteaching.');
  assert.equal(friday.blocks.find(block => block.title.startsWith('Arts Education')).href,
    './activities/autumn-forest.html');
  assert.ok(!friday.blocks.some(block => /English Language Arts|Career Education/.test(block.title)));
  for (const date of ['2026-10-01', '2026-10-02']) {
    assert.equal(day(date).blocks.length, 11);
    for (const block of day(date).blocks) {
      if(block.worksheet) {
        assert.equal(block.worksheet.studentSafe, true);
        assert.ok(existsSync('public/' + new URL(block.worksheet.href, 'https://dlwyatt-eng.github.io/teacher-hub/').pathname.replace(/^\/teacher-hub\//, '')), 'supplied material exists');
      }
    }
  }
});
