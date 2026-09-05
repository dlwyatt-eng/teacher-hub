import assert from 'node:assert/strict';
import test from 'node:test';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { moduleLoader } from './helpers/load-rendered-module.mjs';
const load = moduleLoader(path.resolve(import.meta.dirname, '..'));
const { MagnitudeWorkedModel, MagnitudePaperSheets } = load('app/math-magnitude-models.tsx');
const { MathStudentWorkshops } = load('app/math-program.tsx');

test('every decimal explanation displays its own scale and mathematically placed point', () => {
  for (const [step, max] of [[0, .01], [1, .01], [2, .01], [3, .1], [4, 1]]) {
    const children = MagnitudeWorkedModel({ step }).props.children.flat();
    const active = children.filter(child => child.props['data-current']);
    assert.equal(active.length, 1);
    const html = renderToStaticMarkup(active[0]);
    assert.ok(html.includes(`Number line from 0 to ${max}`));
    const cx = Number(html.match(/<circle cx="([\d.]+)"/)[1]);
    assert.ok(Math.abs((cx - 35) / 570 - .008 / max) < 1e-10);
  }
});

test('billions model follows the decimals and print retains all four models', () => {
  for (const step of [5, 6, 7]) {
    const children = MagnitudeWorkedModel({ step }).props.children.flat();
    const active = children.filter(child => child.props['data-current']);
    assert.equal(active.length, 1);
    assert.match(renderToStaticMarkup(active[0]), /Worked large-number comparison/);
  }
  const html = renderToStaticMarkup(React.createElement(MagnitudeWorkedModel, { step: 0 }));
  for (const max of [.01, .1, 1]) assert.ok(html.includes(`Number line from 0 to ${max}`));
  assert.match(html, /2,360,000,000 is greater/);
});

test('actual student workshop includes blank equal-interval scales and a reusable period chart', () => {
  const paper = renderToStaticMarkup(React.createElement(MagnitudePaperSheets));
  const svgs = [...paper.matchAll(/<svg[^>]*>(.*?)<\/svg>/g)].map(match => match[1]);
  assert.equal(svgs.length, 3);
  for (const svg of svgs) {
    assert.match(svg, /M35 55H605/);
    const ticks = [...svg.matchAll(/d="M([\d.]+) 45V65"/g)].map(match => Number(match[1]));
    assert.deepEqual(ticks, Array.from({length: 11}, (_, i) => 35 + i * 57));
    assert.doesNotMatch(svg, /<circle/);
  }
  assert.match(paper, /Blank large-number period chart/);
  const workshop = renderToStaticMarkup(React.createElement(MathStudentWorkshops, {experienceId: 'magnitude-gallery'}));
  assert.ok(workshop.includes(paper));
});
