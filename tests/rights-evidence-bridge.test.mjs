import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { moduleLoader } from './helpers/load-rendered-module.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read=file=>readFileSync(path.join(root,file),'utf8');
const activity=read('public/activities/rights-evidence-bridge.html');
const load=moduleLoader(root);

test('rights bridge supplies six bounded fictional records and a complete accessible learning sequence',()=>{
  assert.deepEqual([...activity.matchAll(/data-card="([AB][123])"/g)].map(m=>m[1]),['A1','A2','A3','B1','B2','B3']);
  for (const phrase of ['Fictional practice','not real countries','one route at one school','Article 28','Article 2','Article 12','not a legal verdict','same question','publication date','event/data date','independent source','Every learner investigates both countries','not a deadline','No extra required portfolio post','No student device','do not earn rights']) assert.ok(activity.includes(phrase),phrase);
  assert.match(activity,/class="model"><summary>Reveal one possible model/);
  assert.match(activity,/id="teacher-guide" class="teacher panel" hidden/);
  assert.match(activity, /@media print\{\.teacher\.panel\{display:none!important\}/);
  assert.doesNotMatch(activity,/localStorage|sessionStorage|fetch\(|XMLHttpRequest|<input|<textarea/);
  assert.equal([...activity.matchAll(/<section class="panel" data-step="\d"/g)].length,5);
});

test('overview and existing Juniper Park lesson link the bridge without changing their stable IDs',()=>{
  const { RightsPlanning }=load('app/rights-planning.tsx');
  const html=renderToStaticMarkup(React.createElement(RightsPlanning));
  assert.match(html,/href="activities\/rights-evidence-bridge.html"/);
  assert.match(html,/href="printables\/rights-evidence-bridge-student.pdf"/);
  assert.match(read('app/social-unit2-experiences.tsx'),/scene === 3 && <aside[^]*rights-evidence-bridge.html/);
  for (const name of ['rights-evidence-bridge-student.pdf','two-countries-shared-questions-student.pdf']) assert.equal(readFileSync(path.join(root,'public/printables',name)).subarray(0,5).toString(),'%PDF-');
});

test('all local activity links resolve and public references point to the checked official sources',()=>{
  for (const [,href] of activity.matchAll(/href="([^"]+)"/g)) {
    if(href.startsWith('../?')) continue;
    if(href.startsWith('https://')) assert.ok(href.startsWith('https://www.unicef.org/') || href.startsWith('https://curriculum.gov.bc.ca/'));
    else assert.ok(existsSync(path.resolve(root,'public/activities',href)),href);
  }
});

function harness(hash='') {
  class Element {
    constructor(){this.hidden=false;this.attrs={};this.handlers={};this.children=[];this.focused=false;}
    setAttribute(k,v){this.attrs[k]=v;} addEventListener(k,fn){this.handlers[k]=fn;}
    append(el){this.children.push(el);} querySelector(){return this.heading ??=new Element();}
    focus(){this.focused=true;} click(){if(!this.disabled)this.handlers.click?.();}
  }
  const panels=Array.from({length:5},()=>new Element());
  const ids=Object.fromEntries(['step-nav','previous','next','show-all','teacher-toggle','teacher-guide','step-status','controls'].map(id=>['#'+id,new Element()]));
  ids['#teacher-guide'].hidden=true;
  const events={}; const location={hash};
  const document={querySelector:s=>ids[s], querySelectorAll:()=>panels,createElement:()=>new Element()};
  vm.runInNewContext(activity.match(/<script>([^]*?)<\/script>/)[1],{document,location,window:{addEventListener:(k,fn)=>events[k]=fn}});
  return {panels,ids,location,events};
}
test('navigation, repeat clicks, teacher disclosure and all-parts mode stay bounded',()=>{
 const {panels,ids,location}=harness();
 assert.deepEqual(panels.map(p=>p.hidden),[false,true,true,true,true]);
 assert.equal(ids['#previous'].disabled,true); assert.equal(ids['#teacher-guide'].hidden,true);
 ids['#teacher-toggle'].click(); assert.equal(ids['#teacher-guide'].hidden,false);
 ids['#teacher-toggle'].click(); assert.equal(ids['#teacher-guide'].hidden,true);
 for(let i=0;i<8;i++)ids['#next'].click();
 assert.equal(location.hash,'part-5'); assert.equal(ids['#next'].disabled,true); assert.equal(panels[4].heading.focused,true);
 ids['#show-all'].click(); assert.equal(panels.every(p=>!p.hidden),true); assert.equal(ids['#previous'].disabled,true);
 ids['#step-nav'].children[1].click(); assert.deepEqual(panels.map(p=>p.hidden),[true,false,true,true,true]);
 ids['#show-all'].click();ids['#show-all'].click();assert.equal(panels[1].hidden,false);
});
test('deep links and Back/Forward hash changes restore the correct part',()=>{
 const {panels,location,events}=harness('#part-4');
 assert.equal(panels[3].hidden,false);
 location.hash='#part-2';events.hashchange();assert.equal(panels[1].hidden,false);assert.equal(panels[3].hidden,true);
 location.hash='#part-5';events.hashchange();assert.equal(panels[4].hidden,false);
 location.hash='#invalid';events.hashchange();assert.equal(panels[0].hidden,false);
});
