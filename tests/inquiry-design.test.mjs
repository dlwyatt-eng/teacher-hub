import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
import test from 'node:test';
test('inquiry enhancements preserve keyboard navigation and literal local export', async () => {
class Element{constructor(text=''){this.textContent=text;this.events={};this.attrs={};this.children=[];this.dataset={};this.classList={add(){}};}setAttribute(k,v){this.attrs[k]=v;}addEventListener(k,v){this.events[k]=v;}append(e){this.children.push(e);}focus(){this.focused=true;}click(){this.clicked=true;this.events.click?.();}remove(){this.removed=true;}}
const topics=new Element(),moves=new Element();
const panels=Array.from({length:5},(_,i)=>Object.assign(new Element(),{dataset:{tabLabel:`Topic ${i}`},parentElement:new Element()}));
const movePanels=Array.from({length:6},()=>Object.assign(new Element(),{parentElement:new Element()}));
const large=new Element(),download=new Element(),status=new Element(),body=new Element();
const fields=Array.from({length:10},(_,i)=>Object.assign(new Element(),{id:`field-${i}`,value:i?'':'<script>literal private notes</script>',closest:()=>({querySelector:()=>new Element('Section')})}));
const check=Object.assign(new Element(),{checked:true,parentElement:new Element('Evidence checked')});
const selectors={'.topic-controls':topics,'.move-controls':moves,'.topic-panel':panels,'.moves .card':movePanels,'.notes-form textarea, .notes-form input[type="text"]':fields,'.finish input':[check],'.inquiry-topbar nav a':[]};
let blob,revoked;const events={},created=[];
vm.runInNewContext(fs.readFileSync('public/activities/inquiry-design.js','utf8'),{document:{getElementById:id=>({'large-text':large,'download-notes':download,'export-status':status}[id]),querySelector:s=>s.startsWith('label[')?new Element('Field label'):selectors[s],querySelectorAll:s=>selectors[s]||[],createElement:()=>{let e=new Element();created.push(e);return e;},documentElement:{classList:{toggle:()=>true}},body},location:{pathname:'/activities/better-world-journey.html'},window:{addEventListener:(k,v)=>events[k]=v},Blob,URL:{createObjectURL:b=>{blob=b;return 'blob:local';},revokeObjectURL:u=>revoked=u},setTimeout:fn=>fn()});
assert.equal(topics.children.length,5);assert.equal(moves.children.length,6);assert.equal(panels[0].hidden,false);assert.equal(panels[1].hidden,true);
topics.events.keydown({target:topics.children[0],key:'End',preventDefault(){}});assert.equal(panels[4].hidden,false);assert.equal(topics.children[4].focused,true);assert.equal(topics.children[4].attrs['aria-selected'],'true');
topics.events.keydown({target:topics.children[4],key:'ArrowRight',preventDefault(){}});assert.equal(panels[0].hidden,false);
moves.children[3].click();assert.equal(movePanels[3].hidden,false);assert.equal(movePanels[0].hidden,true);
large.click();assert.equal(large.attrs['aria-pressed'],'true');fields[0].events.input();let prevented=false;events.beforeunload({preventDefault(){prevented=true;}});assert.ok(prevented);
download.click();const text=await blob.text();assert.ok(text.includes('<script>literal private notes</script>'));assert.equal((text.match(/Field label/g)||[]).length,10);assert.ok(text.includes('[x] Evidence checked'));assert.equal(revoked,'blob:local');assert.ok(status.textContent.includes('Check your downloads'));assert.equal(body.children[0].download,'inquiry-fieldnotes.txt');assert.ok(body.children[0].removed);


});
test('standalone inquiry keeps canonical routes, progressive content and print safeguards', () => {
  const journey = fs.readFileSync('public/activities/better-world-journey.html', 'utf8');
  const notes = fs.readFileSync('public/activities/inquiry-fieldnotes.html', 'utf8');
  const css = fs.readFileSync('public/activities/inquiry-design.css', 'utf8');
  const js = fs.readFileSync('public/activities/inquiry-design.js', 'utf8');
  for (const html of [journey, notes]) {
    assert.match(html, /inquiry-design\.css/);
    assert.match(html, /inquiry-design\.js/);
    assert.match(html, /Skip to content/);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, 'IDs must be unique');
  }
  for (const name of ['Power & decisions', 'People & places', 'Resources & connections', 'Cooperation & conflict', 'Rights & fairness']) assert.ok(journey.includes(name));
  assert.equal((journey.match(/class="topic-panel"/g) || []).length, 5);
  assert.match(journey, /class="grid moves"/);
  assert.match(journey, /not access-controlled/);
  assert.match(journey, /No licence or screening is arranged/);
  assert.match(notes, /id="download-notes"/);
  assert.match(notes, /Your entries stay here only while this page is open/);
  assert.match(css, /\.topic-panel\[hidden\]\{display:block!important/);
  assert.match(css, /\.moves \.card\[hidden\]/);
  assert.match(css, /\.inquiry-design \.teacher/);
  assert.doesNotMatch(js, /localStorage|sessionStorage|fetch\(|XMLHttpRequest|sendBeacon/);
});
