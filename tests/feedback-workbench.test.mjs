import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const html=fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../public/activities/feedback-workbench.html'),'utf8');
const source=html.match(/<script>([\s\S]*?)<\/script>/)[1];
function setup(clipboard){const elements={};function element(){return {value:'math',children:[],handlers:{},textContent:'',addEventListener(k,f){this.handlers[k]=f},append(...v){this.children.push(...v)},replaceChildren(){this.children=[]},focus(){this.focused=true}};}let printed=false;const document={getElementById(id){return elements[id]??=element()},createElement:element};vm.runInNewContext(source,{document,navigator:{clipboard},window:{print(){printed=true}}});return {elements,printed:()=>printed};}
test('five fictional scenarios each include evidence, comment and next check',()=>{const {elements}=setup();for(const value of ['math','inquiry','writing','limited','extension']){elements.scenario.value=value;elements.scenario.handlers.change();assert.equal(elements.example.children.length,6);assert.ok(elements.example.children[1].textContent.length>50);assert.ok(elements.example.children[3].textContent.length>50);assert.ok(elements.example.children[5].textContent.length>50);}});
test('copy succeeds and repeated copy remains safe',async()=>{let copied='';const {elements}=setup({writeText:async t=>{copied=t}});await elements.copy.handlers.click();await elements.copy.handlers.click();assert.match(copied,/Do not assign a final proficiency/);assert.match(elements.status.textContent,/Prompt copied/)});
test('copy failure exposes manual fallback',async()=>{const {elements}=setup();await elements.copy.handlers.click();assert.equal(elements['prompt-details'].open,true);assert.equal(elements.prompt.focused,true);assert.match(elements.status.textContent,/Clipboard unavailable/)});
test('print and home link work',()=>{const x=setup();x.elements.print.handlers.click();assert.equal(x.printed(),true);assert.equal(x.elements.home.href,'../')});
test('public guide has no student entry, remote script, networking or persistence',()=>{assert.doesNotMatch(html,/<(?:input|textarea|iframe)\b|<script[^>]+src=|localStorage|sessionStorage|fetch\(|XMLHttpRequest/);assert.match(html,/This Hub is public/);assert.match(html,/Fictional examples only/);assert.match(html,/teacher judgment/)});
