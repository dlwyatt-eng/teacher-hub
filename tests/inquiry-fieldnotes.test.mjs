import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../public/activities/inquiry-fieldnotes.html',import.meta.url),'utf8');
test('fieldnotes includes accessible inquiry sequence and bounded example',()=>{
 for(const id of ['question','countries','claim','source-a','evidence-a','source-b','evidence-b','missing','revision','next']){
  assert.ok(html.includes(`id="${id}"`)); assert.ok(html.includes(`for="${id}"`));
 }
 for(const text of ['Invented practice example','does not save your work','not an extra required SpacesEDU post','Changing your mind is not required','talk or draw','@media print','textContent=field.value'])assert.ok(html.includes(text),text);
 assert.doesNotMatch(html,/localStorage|sessionStorage|fetch\(|XMLHttpRequest|https?:\/\//);
 assert.match(readFileSync(new URL('../app/social-studies-program.tsx',import.meta.url),'utf8'),/href="activities\/inquiry-fieldnotes.html"/);
});
test('print copies literal user text, replaces stale copies, and wires both controls',()=>{
 const fields=[{value:'Evidence <script> not markup',after(el){this.output=el;}},{value:'',after(el){this.output=el;}}];
 let removed=0,printed=0;const events={},buttons={};
 const document={querySelectorAll(selector){return selector==='.print-value'?[{remove(){removed++;}}]:fields;},createElement(){return {};},getElementById(id){return {addEventListener(event,handler){buttons[id]=handler;}};}};
 vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],{document,window:{addEventListener(event,handler){events[event]=handler;},print(){printed++;}}});
 buttons.print(); assert.equal(printed,1);assert.equal(fields[0].output.textContent,fields[0].value);assert.equal(fields[1].output.textContent,' ');assert.equal(removed,1);
 events.beforeprint();assert.equal(removed,2);buttons['print-bottom']();assert.equal(printed,2);
});
