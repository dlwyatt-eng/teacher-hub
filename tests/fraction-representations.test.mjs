import test from 'node:test';
import assert from 'node:assert/strict';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { moduleLoader } from './helpers/load-rendered-module.mjs';
import { readFileSync } from 'node:fs';
import { FRACTION_MAX_WHOLES } from '../app/fraction-explorer-model.mjs';

const load = moduleLoader(process.cwd());
const NumberLine = load('app/fraction-number-line.tsx').default;

// Mathematical review against actual rendered SVG, not duplicated view logic.
test('every supported number line conserves the amount on an unchanged 0–4 scale', () => {
  for (const d of [2, 3, 4, 5, 6, 8]) for (let n = 0; n <= d * FRACTION_MAX_WHOLES; n++) {
    const html = renderToStaticMarkup(React.createElement(NumberLine, { numerator: n, denominator: d }));
    const marker = html.match(/<circle cx="([^"]+)" cy="56"/);
    assert.ok(marker, `${n}/${d} marker rendered`);
    assert.ok(Math.abs((Number(marker[1]) - 32) * d - n * 144) < 1e-9, `${n}/${d} has the exact proportional position`);
    assert.match(html, /x1="32" y1="56" x2="608" y2="56" class="fraction-line__axis"/);
    assert.equal((html.match(/fraction-line__tick--whole/g) || []).length, 5);
    assert.equal((html.match(/class="fraction-line__tick(?: fraction-line__tick--whole)?"/g) || []).length, 4 * d + 1);
    assert.match(html, new RegExp(`Each whole has ${d} equal intervals`));
    assert.match(html, new RegExp(`<title[^>]*>${n}/${d} on a number line from 0 to 4</title>`));
  }
});

test('equivalent fractions land at the same point; boundary examples stay inside the scale', () => {
  const position = (n, d) => Number(renderToStaticMarkup(React.createElement(NumberLine, { numerator: n, denominator: d })).match(/<circle cx="([^"]+)"/)[1]);
  assert.equal(position(3, 2), position(6, 4));
  assert.equal(position(6, 4), position(12, 8));
  assert.equal(position(11, 3), 560);
  assert.equal(position(17, 5), 521.6);
  assert.equal(position(0, 8), 32);
  assert.equal(position(32, 8), 608);
  assert.throws(() => renderToStaticMarkup(React.createElement(NumberLine, { numerator: 33, denominator: 8 })), RangeError);
});

// Exercise production handlers with a deterministic hook runner. This is component
// state coverage; it does not claim DOM, browser layout, focus or pointer testing.
function harness(props = {}) {
  const states = [];
  let cursor = 0;
  const hooks = { ...React, useId: () => 'fraction-test', useState(initial) {
    const index = cursor++;
    if (!(index in states)) states[index] = initial;
    return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }];
  } };
  const Explorer = moduleLoader(process.cwd(), { react: hooks })('app/fraction-explorer.tsx').default;
  const render = () => { cursor = 0; return Explorer(props); };
  const nodes = node => !node || typeof node !== 'object' ? [] : [node, ...React.Children.toArray(node.props?.children).flatMap(nodes)];
  const text = node => node == null || typeof node === 'boolean' ? '' : typeof node !== 'object' ? String(node) : React.Children.toArray(node.props?.children).map(text).join('');
  const find = predicate => { const node = nodes(render()).find(predicate); assert.ok(node, 'Expected control or component'); return node; };
  const button = label => find(node => node.type === 'button' && text(node) === label);
  const amount = () => find(node => node.type === 'input' && node.props.type === 'range');
  const line = () => find(node => typeof node.type === 'function' && node.type.name === 'FractionNumberLine');
  return { render, nodes, text, find, button, amount, line };
}

test('switching and regrouping preserve the amount; changing parts clears reveal and check', () => {
  const h = harness();
  assert.equal(h.amount().props.value, 7);
  assert.equal(h.amount().props.max, 16);
  h.button('Compare both').props.onClick();
  assert.deepEqual([h.line().props.numerator, h.line().props.denominator], [7, 4]);
  h.button('Regroup into wholes').props.onClick();
  assert.equal(h.line().props.numerator, 7);
  assert.equal(h.line().props.regrouped, true);
  h.button('Compare the number names').props.onClick();
  assert.match(h.text(h.render()), /7\/4 = 1 3\/4/);
  h.button('Number line').props.onClick();
  assert.equal(h.line().props.numerator, 7);
  assert.equal(h.nodes(h.render()).filter(n => n.props?.className === 'fraction-explorer__strip-row').length, 0);
  h.amount().props.onChange({ target: { value: '16' } });
  assert.equal(h.line().props.numerator, 16);
  assert.equal(h.button('Compare the number names').props['aria-expanded'], false);
  assert.equal(h.find(n => n.props?.['aria-label'] === 'Add one part of size 1/4').props.disabled, true);
  h.find(n => n.type === 'select').props.onChange({ target: { value: '5' } });
  assert.equal(h.amount().props.value, 0);
  assert.equal(h.amount().props.max, 20);
  assert.deepEqual([h.line().props.numerator, h.line().props.denominator], [0, 5]);
});

test('reverse question, repeated representation switches and reset use the actual state', () => {
  const h = harness();
  h.button('Work backwards').props.onClick();
  h.amount().props.onChange({ target: { value: '7' } });
  h.button('Number line').props.onClick();
  assert.deepEqual([h.line().props.numerator, h.line().props.denominator], [7, 3]);
  for (let i = 0; i < 3; i++) { h.button('Compare both').props.onClick(); h.button('Strip model').props.onClick(); }
  assert.equal(h.amount().props.value, 7);
  h.button('Reset to 7/4').props.onClick();
  assert.equal(h.amount().props.value, 7);
  assert.equal(h.amount().props.max, 16);
  assert.equal(h.button('Strip model').props['aria-pressed'], true);
  assert.equal(h.button('Compare the number names').props['aria-expanded'], false);
  assert.equal(h.nodes(h.render()).filter(n => n.props?.className === 'fraction-explorer__strip-row').length, 4);
});


test('paper route retains all questions and provides the matching blank quarter line', () => {
  const html = readFileSync('public/printables/fraction-explorer-paper.html', 'utf8');
  assert.match(html, /Blank number line from zero to four, divided into quarters/);
  assert.match(html, /7\/4 = ______ whole\(s\)/);
  assert.match(html, /2⅓ = ______ thirds/);
  assert.match(html, /11\/4 and 8\/4/);
  assert.doesNotMatch(html, /<circle|7\/4 = 1 3\/4/);
  assert.equal((html.match(/text-anchor="middle"/g) || []).length, 5);
});


test('regrouping on the number line outlines full wholes without moving the point', () => {
  const html = renderToStaticMarkup(React.createElement(NumberLine, { numerator: 11, denominator: 3, regrouped: true }));
  assert.equal((html.match(/ is-grouped/g) || []).length, 3);
  assert.match(html, /<circle cx="560"/);
  assert.match(html, /Outlined intervals show complete wholes/);
  assert.match(html, /aria-live="polite"/);
  const small = renderToStaticMarkup(React.createElement(NumberLine, { numerator: 1, denominator: 3, regrouped: true }));
  assert.match(small, /There is no complete whole yet/);
  assert.doesNotMatch(small, / is-grouped/);
});


test('presentation is the student entry; exiting and reopening retains the live model', () => {
  const h = harness({startPresented: true});
  const presentation = () => h.find(n => typeof n.type === 'function' && n.type.name === 'FractionPresentation');
  assert.match(h.text(h.render()), /Build seven quarters/);
  assert.equal(h.nodes(h.render()).filter(n => n.props?.className === 'fraction-explorer__strip-row').length, 4);
  h.find(n => n.type === 'select').props.onChange({target:{value:'3'}});
  h.amount().props.onChange({target:{value:'11'}});
  h.button('Compare both').props.onClick();
  h.button('Regroup into wholes').props.onClick();
  h.button('Compare the number names').props.onClick();
  assert.match(h.text(h.render()), /11\/3 = 3 2\/3/);
  for (let i=0; i<3; i++) {
    presentation().props.onExit();
    assert.equal(h.amount().props.value,11);
    h.button('Present model ↗').props.onClick();
    assert.deepEqual([h.line().props.numerator,h.line().props.denominator,h.line().props.regrouped],[11,3,true]);
    assert.match(h.text(h.render()),/11\/3 = 3 2\/3/);
  }
  assert.equal(h.find(n=>n.type==='details' && n.props.className==='fraction-explorer__check').props.open,undefined);
});

test('presentation uses native modal focus and Escape, with a re-entry focus target', () => {
  const source=readFileSync('app/fraction-presentation.tsx','utf8');
  assert.match(source,/current.showModal\(\)/);
  assert.match(source,/onCancel=.*event.preventDefault\(\); exit\(\)/);
  assert.match(source,/autoFocus onClick=\{exit\}/);
  assert.match(source,/document.getElementById\(returnFocusId\)\?\.focus\(\)/);
  const css=readFileSync('app/fraction-explorer.css','utf8');
  assert.match(css,/height:100dvh/);
  assert.match(css,/\[data-representation=both\]/);
  assert.match(css,/@media\(max-width:620px\)/);
});
