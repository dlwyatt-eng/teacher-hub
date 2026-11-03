import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { moduleLoader } from './helpers/load-rendered-module.mjs';
const root = path.resolve(import.meta.dirname, '..');
const load = moduleLoader(root);
const { classroomLaunches, classroomLaunchFor, comparisonPractice, comparisonSort, comparisonExit, libraryVoteCase, libraryVoteChangeModel } = load('app/lesson-classroom-launches.ts');
const { ClassroomLaunchStage, ClassroomResponseSheet, TeacherClassroomLaunch } = load('app/lesson-classroom-launch.tsx');
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));

test('only three existing lessons get a focused paper-first adaptation', () => {
  assert.deepEqual(classroomLaunches.map(item => item.id), ['magnitude-gallery', 'character-council', 'career-constellation']);
  assert.equal(classroomLaunchFor('unrelated-lesson'), undefined);
  for (const launch of classroomLaunches) {
    assert.deepEqual(launch.stages.map(stage => stage.label), ['Notice', 'Model', 'Try', 'Check']);
    const teacher = render(TeacherClassroomLaunch, { launch });
    assert.match(teacher, new RegExp(`experience=${launch.id}`));
    assert.match(teacher, /mode=student/);
    assert.match(teacher, /original full sequence/);
    assert.ok(teacher.includes(launch.materials));
  }
});

test('decimal comparisons, equivalence and sorting are mathematically correct', () => {
  const number = value => Number(value.replaceAll(',', ''));
  for (const pair of [...comparisonPractice, comparisonExit]) {
    const left = number(pair.left), right = number(pair.right);
    const expected = left === right ? '=' : left < right ? '<' : '>';
    assert.equal(pair.relation, expected, `${pair.left} ${pair.relation} ${pair.right}`);
  }
  assert.equal(Number('0.50'), Number('0.500'));
  assert.ok(Number('0.50') > Number('0.405'));
  assert.deepEqual([...comparisonSort].sort((a, b) => number(a) - number(b)), ['0.405', '0.45', '0.5', '0.50']);
  const model = render(ClassroomLaunchStage, {launch: classroomLaunchFor('magnitude-gallery'), stageIndex: 1});
  assert.match(model, /scope="col">Tenths/);
  assert.match(model, /data-deciding="true">5/);
  assert.match(model, /data-deciding="true">4/);
  assert.match(model, /0\.50 &gt; 0\.45/);
  assert.match(model, /Zeros added at the end of a decimal/);
});

test('all four actual stages render their complete tasks and no teacher answers', () => {
  for (const launch of classroomLaunches) for (let stageIndex = 0; stageIndex < 4; stageIndex++) {
    const html = render(ClassroomLaunchStage, { launch, stageIndex });
    const stage = launch.stages[stageIndex];
    assert.ok(html.includes(stage.title));
    for (const answer of launch.teacherCheck) assert.ok(!html.includes(answer));
    assert.match(html, /aria-labelledby=/);
  }
  const practice = render(ClassroomLaunchStage, {launch: classroomLaunchFor('magnitude-gallery'), stageIndex: 2});
  for (const pair of comparisonPractice) {
    assert.ok(practice.includes(`<b>${pair.left}</b><span>___</span><b>${pair.right}</b>`));
  }
});

test('every real student sheet retains every prompt and its offline starting input', () => {
  for (const launch of classroomLaunches) {
    const sheet = render(ClassroomResponseSheet, { launch });
    assert.equal((sheet.match(/class="classroom-writing-space"/g) ?? []).length, 4);
    for (const item of launch.paperPrompts) assert.ok(sheet.includes(item.title));
    for (const answer of launch.teacherCheck) assert.ok(!sheet.includes(answer));
    assert.match(sheet, /Print response sheet/);
    assert.match(sheet, /no upload required/);
  }
  const reading = render(ClassroomResponseSheet, {launch: classroomLaunchFor('character-council')});
  assert.ok(reading.includes(libraryVoteCase));
  assert.match(reading, /original fiction/);
  assert.match(reading, /page, audio point or moment/);
  const career = render(ClassroomResponseSheet, {launch: classroomLaunchFor('career-constellation')});
  assert.match(career, /A refill-station queue blocks a school doorway/);
  assert.match(career, /planned \/ tried/);
  assert.match(career, /Teacher approval if needed/);
});

test('novel comparison works with any book and keeps interpretations open', () => {
  const launch = classroomLaunchFor('character-council');
  assert.equal(launch.duration, '30–40 min');
  assert.match(launch.materials, /Any class novel or approved audio/);
  assert.match(launch.preparation.join(' '), /actual class bookmark/);
  assert.match(launch.preparation.join(' '), /earlier moment already read/);
  assert.match(launch.preparation.join(' '), /Nevermoor is an optional example/);
  assert.match(launch.preparation.join(' '), /Death and rebirth.*never a required interpretation/);
  const core = JSON.stringify([launch.title, launch.question, launch.goal, launch.materials, launch.stages, launch.paperPrompts]);
  assert.doesNotMatch(core, /Nevermoor|death and rebirth/i);
  assert.match(core, /changed \/ unchanged \/ unclear/);
  assert.match(core, /not enough information yet/);
  assert.match(core, /predictions, not events that happened/);
  assert.match(core, /No homework or upload needed/);
  assert.match(launch.teacherCheck.join(' '), /do not force a transformation/);
});

test('novel model and printable organizer share evidence, uncertainty and theme thinking', () => {
  const launch = classroomLaunchFor('character-council');
  const model = render(ClassroomLaunchStage, { launch, stageIndex: 1 });
  const sheet = render(ClassroomResponseSheet, { launch });
  assert.deepEqual(launch.stages[1].moves, [...libraryVoteChangeModel]);
  assert.deepEqual(launch.paperPrompts.map(item => item.title), [
    '1 · Before', '2 · Turning point', '3 · After / so far', '4 · Theme + check',
  ]);
  for (const html of [model, sheet]) {
    assert.ok(html.includes(libraryVoteCase));
    for (const line of libraryVoteChangeModel) assert.ok(html.includes(line));
    assert.match(html, /no decision is shown/);
    assert.match(html, /predictions, not facts/);
    assert.match(html, /Possible theme:/);
    for (const note of launch.teacherCheck) assert.ok(!html.includes(note));
  }
  assert.match(sheet, /Earlier text detail \+ page, audio point or moment/);
  assert.match(sheet, /Another reading or complicating detail/);
  assert.match(sheet, /not just a topic/);
  assert.match(sheet, /changed or kept my idea/);
  const teacher = render(TeacherClassroomLaunch, { launch });
  for (const heading of launch.paperPrompts.map(item => item.title)) assert.ok(teacher.includes(heading));
  assert.match(teacher, /Nevermoor is an optional example/);
  assert.match(teacher, /No homework or upload needed|not new homework or a SpacesEDU post/);
});

test('focused lessons reuse outer navigation and keep original sequence recoverable', async () => {
  const source = await readFile(path.join(root, 'app/learning-program.tsx'), 'utf8');
  assert.match(source, /if \(focusedLaunch\) parts\.splice\(0, parts\.length/);
  assert.match(source, /setFullSequenceFor\(selected\.id\); setProjectorPart\(0\)/);
  assert.match(source, /setFullSequenceFor\(null\); setProjectorPart\(0\)/);
  assert.match(source, /\{focusedLaunch && <ClassroomLaunchResources/);
  assert.match(source, /!focusedLaunch && <ProjectorLessonHelp/);
  const component = await readFile(path.join(root, 'app/lesson-classroom-launch.tsx'), 'utf8');
  assert.doesNotMatch(component, /<nav|localStorage|sessionStorage/);
  const css = await readFile(path.join(root, 'app/lesson-classroom-launch.css'), 'utf8');
  assert.match(css, /teacher-classroom-launch:has\(\.classroom-response-sheet\.print-target\)\{display:block!important\}/);
  assert.match(css, /classroom-response-sheet\.print-target>div\{display:grid!important\}/);
});

test('actual student lesson routes open on the focused hook with four outer stages', () => {
  const blank = () => null;
  const appLoad = moduleLoader(root, {
    'next/image': ({priority, unoptimized, fill, ...props}) => React.createElement('img', props),
    './classroom-companions': { ClassroomCompanion: blank, CompanionMark: blank },
    './ttoc-day-plan': { AddToDayPlanButton: blank },
  });
  const { mathematicsProgram, languageArtsProgram } = appLoad('app/core-programs.ts');
  const { careerProgram } = appLoad('app/integrated-programs.ts');
  const { curriculum } = appLoad('app/curriculum.ts');
  const { StudentLearningProgram } = appLoad('app/learning-program.tsx');
  for (const [id, program] of [['magnitude-gallery', mathematicsProgram], ['character-council', languageArtsProgram], ['career-constellation', careerProgram]]) {
    const html = render(StudentLearningProgram, {program, record: curriculum[program.subject], selectedExperienceId: id, onExperience() {}});
    const launch = classroomLaunchFor(id);
    assert.match(html, /aria-label="Choose lesson length"/);
    assert.match(html, /aria-pressed="true">Focused lesson/);
    assert.match(html, /PART 1 OF 4/);
    assert.ok(html.includes(launch.stages[0].title));
    assert.match(html, /Response sheet · print or use plain paper/);
    assert.doesNotMatch(html, /class="projector-quick-start"/);
    for (const note of launch.teacherCheck) assert.ok(!html.includes(note));
  }
});
