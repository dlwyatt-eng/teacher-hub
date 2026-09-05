import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { moduleLoader } from './helpers/load-rendered-module.mjs';

const root = path.resolve(import.meta.dirname, '..');
const load = moduleLoader(root);
const { MathTeacherWorkshops, MathStudentWorkshops, WholeNumberWorkedModel } = load('app/math-program.tsx');
const { mathSupportPacks } = load('app/math-program-supports.ts');
const operations = mathSupportPacks.find(pack => pack.id === 'operations-fluency-pack');

test('first Strategy teaching route opens both worked examples and guided practice', () => {
  assert.equal(operations.readinessLevel, 'full');
  const html = renderToStaticMarkup(React.createElement(MathTeacherWorkshops, { experienceId: 'strategy-league' }));
  assert.match(html, /class="selected" aria-pressed="true"><b>Full background lesson/);
  assert.match(html, /936 cards, with 24 cards in each pack/);
  assert.match(html, /30 × 24 = 720/);
  assert.match(html, /936 − 720 = 216/);
  assert.match(html, /216 − 216 = 0/);
  assert.match(html, /DIVIDE AND CHECK/);
});

test('division model arithmetic keeps packs and cards separate', () => {
  assert.equal(24 * 40, 960);
  assert.equal(936 - 24 * 30, 216);
  assert.equal(216 / 24, 9);
  assert.equal(30 + 9, 936 / 24);
  assert.equal(39 * 24, 936);
  assert.equal(operations.model.steps.length, 8);
  assert.match(operations.model.steps[4], /Division problem: pack 936 cards with 24 cards in each pack/);
  assert.match(operations.model.steps[6], /Add the pack counts, not the card counts/);
});

test('each operation step selects its matching diagram while retaining both for print', () => {
  for (let step = 0; step < operations.model.steps.length; step += 1) {
    const sections = WholeNumberWorkedModel({ step }).props.children;
    const active = sections.filter(section => section.props['data-current']);
    assert.equal(active.length, 1);
    assert.match(renderToStaticMarkup(active[0]), step < 4 ? /16 packs, with 23 cards in each/ : /936 cards, with 24 cards in each pack/);
    const all = renderToStaticMarkup(React.createElement(WholeNumberWorkedModel, { step }));
    assert.match(all, /16 packs, with 23 cards in each/);
    assert.match(all, /936 cards, with 24 cards in each pack/);
  }
  const css = readFileSync(path.join(root, 'app/math-program.css'), 'utf8');
  assert.match(css, /@media screen\{\.math-operation-examples>\[data-current=false\]\{display:none\}\}/);
  assert.match(css, /@media print\{\.math-operation-examples>\[data-current\]\{display:block!important\}/);
});

test('student workshop retains different practice and check problems but not teacher answers', () => {
  const partnerAnswers = operations.partnerCards.map(card => card.answer);
  const checkAnswers = operations.check.map(item => item.answer);
  try {
    operations.partnerCards.forEach(card => { card.answer = 'PRIVATE_OPERATION_ANSWER'; });
    operations.check.forEach(item => { item.answer = 'PRIVATE_OPERATION_ANSWER'; });
    const html = renderToStaticMarkup(React.createElement(MathStudentWorkshops, { experienceId: 'strategy-league' }));
    assert.match(html, /936 cards, with 24 cards in each pack/);
    assert.match(html, /Find 864 ÷ 24/);
    assert.match(html, /Solve 735 ÷ 21 and check/);
    assert.doesNotMatch(html, /PRIVATE_OPERATION_ANSWER/);
    for (const item of [...operations.partnerCards.map(card => ({ prompt: card.body })), ...operations.check]) {
      assert.ok(html.includes(renderToStaticMarkup(React.createElement('p', null, item.prompt))));
    }
  } finally {
    operations.partnerCards.forEach((card, i) => { card.answer = partnerAnswers[i]; });
    operations.check.forEach((item, i) => { item.answer = checkAnswers[i]; });
  }
});
