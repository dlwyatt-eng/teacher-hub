import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { moduleLoader } from './helpers/load-rendered-module.mjs';
const load = moduleLoader(path.resolve(import.meta.dirname, '..'));
const {ProjectorLessonHelp, RevealForDiscussion} = load('app/projector-lesson-help.tsx');
const {socialExplanations} = load('app/social-teaching-explanations.ts');
const {socialLessons} = load('app/social-program.ts');

test('closed projector help does not render teaching content or answers', () => {
  const failIfMounted = () => { throw new Error('Closed support mounted'); };
  const html = renderToStaticMarkup(React.createElement(ProjectorLessonHelp, {panels: [{label: 'Ask & check', content: React.createElement(failIfMounted)}]}));
  assert.match(html, /Lesson help/);
  assert.doesNotMatch(html, /projector-help-panel/);
  const answer = renderToStaticMarkup(React.createElement(RevealForDiscussion, null, React.createElement(failIfMounted)));
  assert.match(answer, /aria-expanded="false"/);
});

test('every Social Studies lesson has a short explanation, worked example and specific discussion check', () => {
  assert.equal(socialLessons.length, 17);
  assert.deepEqual(Object.keys(socialExplanations).sort(), socialLessons.map(l => l.id).sort());
  for (const lesson of socialLessons) {
    const support = socialExplanations[lesson.id];
    assert.ok(support.idea.length > 60 && support.idea.length < 420, lesson.id);
    assert.equal(support.example.length, 3, lesson.id);
    assert.ok(support.example.every(step => step.length > 30), lesson.id);
    assert.ok(support.ask.endsWith('?') && support.answer.length > 40, lesson.id);
  }
});
