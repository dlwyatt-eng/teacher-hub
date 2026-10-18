import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(path.resolve(import.meta.dirname,'..'));
const {counterDistribution,MathCounterModel}=load('app/math-counter-model.tsx');

test('sharing preserves every item, including unsuccessful pack counts',()=>{
 const exact=[];
 for(let packs=1;packs<=36;packs++){
  const r=counterDistribution(24,36,packs);
  assert.equal(r.blue*packs+r.blueLeft,24);
  assert.equal(r.gold*packs+r.goldLeft,36);
  assert.ok(r.blueLeft>=0&&r.blueLeft<packs);
  assert.ok(r.goldLeft>=0&&r.goldLeft<packs);
  if(!r.blueLeft&&!r.goldLeft)exact.push(packs);
 }
 assert.deepEqual(exact,[1,2,3,4,6,12]);
 assert.deepEqual(counterDistribution(24,36,5),{blue:4,gold:7,blueLeft:4,goldLeft:1});
 assert.deepEqual(counterDistribution(24,36,8),{blue:3,gold:4,blueLeft:0,goldLeft:4});
});
test('counter model starts with a prediction and has an offline task without revealing the distribution',()=>{
 const html=renderToStaticMarkup(React.createElement(MathCounterModel));
 assert.match(html,/Share the counters/);
 assert.match(html,/Paper route/);
 assert.doesNotMatch(html,/Left over:|Pack 1|12 blue · 18 gold/);
});
