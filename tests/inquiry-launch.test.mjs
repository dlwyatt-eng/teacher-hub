import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(p,'utf8');
const html=read('public/activities/better-world-journey.html');
test('opening supplies sources, four actions and optional models before teacher preparation',()=>{
 assert.equal((html.match(/class="launch-scene"/g)||[]).length,4);
 assert.equal((html.match(/class="launch-model"/g)||[]).length,4);
 assert.ok(html.indexOf('id="begin"')<html.indexOf('id="sparks"'));
 for(const s of ['inquiry-transport-map.svg','country-inquiry-starter.pdf','15 of 20','8 of 20','invented towns','not facts about real countries','National Child Day is an optional connection','Power &amp; decisions','Cooperation &amp; conflict']) assert.ok(html.includes(s),s);
 assert.equal((html.match(/<i class="yes">/g)||[]).length,23);
 assert.equal((html.match(/<i(?: class="yes")?><\/i>/g)||[]).length,40);
});
test('scene controls clamp, announce, focus and exit projection without storing information',()=>{
 const events={}; const classes=new Set();
 const element=()=>({hidden:false,events:{},attrs:{},addEventListener(k,f){this.events[k]=f;},setAttribute(k,v){this.attrs[k]=v;},click(){this.events.click();}});
 const headings=Array.from({length:4},()=>({focus(){this.focused=true;}}));
 const scenes=headings.map(h=>({...element(),querySelector:()=>h}));
 const nav=element(); const launch={querySelectorAll:()=>scenes,querySelector:()=>nav,scrollIntoView(){this.scrolled=true;}};
 const ids={'begin':launch,'launch-back':element(),'launch-next':element(),'launch-progress':element(),'launch-project':element()};
 vm.runInNewContext(read('public/activities/inquiry-launch.js'),{document:{getElementById:id=>ids[id],body:{classList:{toggle(c){if(classes.has(c)){classes.delete(c);return false;}classes.add(c);return true;},contains:c=>classes.has(c)}},addEventListener:(k,v)=>events[k]=v}});
 assert.equal(scenes.filter(s=>!s.hidden).length,1);assert.equal(ids['launch-back'].disabled,true);assert.equal(nav.hidden,false);
 for(let i=0;i<5;i++)ids['launch-next'].click();
 assert.equal(ids['launch-progress'].textContent,'Scene 4 of 4');assert.equal(ids['launch-next'].disabled,true);assert.equal(headings[3].focused,true);
 ids['launch-back'].click();assert.equal(scenes[2].hidden,false);
 ids['launch-project'].click();assert.equal(ids['launch-project'].attrs['aria-pressed'],'true');assert.equal(launch.scrolled,true);
 events.keydown({key:'Escape'});assert.equal(ids['launch-project'].attrs['aria-pressed'],'false');
 assert.doesNotMatch(read('public/activities/inquiry-launch.js'),/localStorage|fetch\(|sessionStorage/);
 assert.match(read('public/activities/inquiry-launch.css'),/\.launch-model\{display:none\}/);
});
test('reproducible PDF build preserves original pages and supplies all three files',()=>{
 const source=read('scripts/build-country-inquiry-pack.py');
 assert.match(source,/for p in original.pages\[1:\]: w.add_page\(p\)/);
 assert.ok(source.includes('page.apply_redactions(images=0,graphics=0)'));
 assert.ok(source.includes('connect to your inquiry lens.'));
 assert.ok(source.includes("page=doc[13]"));
 for(const file of ['two-countries-shared-questions-student.pdf','two-countries-shared-questions-teacher.pdf','country-inquiry-starter.pdf']){
  assert.equal(readFileSync(`public/printables/${file}`).subarray(0,5).toString(),'%PDF-');
 }
 for(const phrase of ['choices in different places','optional rights connection','8 of 20','15 of 20','Whose evidence','one source']) assert.ok(source.includes(phrase),phrase);
});

test('teacher entry and canonical inquiry summary use the broad question and supplied opening',()=>{
 const planning=read('app/rights-planning.tsx');const program=read('app/social-program.ts');
 for(const text of [planning,program]){
  assert.ok(text.includes('How do choices in different places shape people’s lives and our shared world?'));
  assert.doesNotMatch(text,/Begin with human and children’s rights|Start with human and children’s rights/);
 }
 assert.match(planning,/better-world-journey.html#begin/);assert.match(planning,/country-inquiry-starter.pdf/);
 assert.match(program,/connection to the selected inquiry lens/);
});
