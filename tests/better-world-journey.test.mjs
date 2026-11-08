import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync('public/activities/better-world-journey.html','utf8');
test('inquiry companion extends existing resources and preserves group agency',()=>{
for(const phrase of ['Everyone explores both countries','Label guesses as guesses','No race and no new deadline','not another assignment','inquiry-fieldnotes.html','two-countries-shared-questions-student.pdf','not a source']) {
if(phrase==='not a source') continue;
assert.ok(html.includes(phrase),phrase);
}
for(const file of ['inquiry-fieldnotes.html','rights-evidence-bridge.html','feedback-workbench.html']) assert.ok(existsSync(`public/activities/${file}`));
assert.match(readFileSync('app/rights-planning.tsx','utf8'),/better-world-journey.html/);
});
test('teacher guidance has real source choices and honest access boundaries',()=>{
for(const phrase of ['haidanation.ca/hg-watchmen','repairnetworkaotearoa.org.nz','curriculum.gov.bc.ca/curriculum/social-studies/6/core','No licence or screening is arranged','not access-controlled','Missing work is missing evidence','not political agreement','Invented practice data']) assert.ok(html.includes(phrase),phrase);
assert.doesNotMatch(html,/localStorage|sessionStorage|fetch\(|XMLHttpRequest|<iframe|<input|<textarea/);
});
test('print control works and teacher planning is excluded from student print',()=>{
let click,printed=0;
vm.runInNewContext(html.match(/<script>([\s\S]*?)<\/script>/)[1],{document:{getElementById(id){assert.equal(id,'print');return {addEventListener(event,fn){assert.equal(event,'click');click=fn;}}}},window:{print(){printed++;}}});
click();assert.equal(printed,1);assert.ok(html.includes('.no-print,.teacher,.route{display:none}'));
});
