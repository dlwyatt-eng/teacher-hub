import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ids = ['question','countries','claim','source-a','evidence-a','source-b','evidence-b','missing','revision','next'];
const checks = ['sources-check','meaning-check','limit-check'];
const source = fs.readFileSync('public/activities/inquiry-notes-file.js','utf8');
class Element {
 constructor(){this.value='';this.checked=false;this.hidden=true;this.events={};this.textContent='';}
 addEventListener(type, fn){(this.events[type] ||= []).push(fn);}
 async fire(type){for(const fn of this.events[type] || []) await fn({type});}
 dispatchEvent(event){for(const fn of this.events[event.type] || []) fn(event);}
 click(){this.clicked=true;return this.fire('click');}
 focus(){this.focused=true;}
 remove(){this.removed=true;}
}
function setup(){
 const names=[...ids,...checks,'notes-file','open-status','notes-review','notes-summary','confirm-open','cancel-open','open-notes','download-editable'];
 const els=Object.fromEntries(names.map(id=>[id,new Element()]));
 const links=[],blobs=[],revoked=[],events={};
 const document={getElementById:id=>els[id],createElement:()=>new Element(),body:{append:el=>links.push(el)},querySelectorAll:selector=>selector.startsWith('.notes-form')?ids.map(id=>els[id]):selector==='.finish input'?checks.map(id=>els[id]):[],querySelector:()=>null};
 const context={document,Blob,Event,URL:{createObjectURL:b=>{blobs.push(b);return 'blob:local';},revokeObjectURL:u=>revoked.push(u)},setTimeout:fn=>fn(),location:{pathname:'/activities/inquiry-fieldnotes.html'},window:{addEventListener:(type,fn)=>events[type]=fn}};
 vm.runInNewContext(fs.readFileSync('public/activities/inquiry-design.js','utf8'),context);
 vm.runInNewContext(source,context);
 const state=()=>[ids.map(id=>els[id].value),checks.map(id=>els[id].checked)];
 const choose=async(data,size)=>{const text=typeof data==='string'?data:JSON.stringify(data);els['notes-file'].files=[{size:size??Buffer.byteLength(text),text:async()=>text}];await els['notes-file'].fire('change');};
 const data=()=>['inquiry-fieldnotes',1,ids.map((id,i)=>[id,`Note ${i}`]),checks.map((id,i)=>[id,i===1])];
 return {els,links,blobs,revoked,state,choose,data,events};
}
test('editable production export/import roundtrips every field and check literally with explicit confirmation',async()=>{
 const a=setup(); const original=a.data();original[2][2][1]='  A\nREADY TO EXPLAIN\n<script>alert(1)</script>\nhttps://example.invalid/?private\n🦋\tend  ';
 ids.forEach((id,i)=>a.els[id].value=original[2][i][1]);checks.forEach((id,i)=>a.els[id].checked=original[3][i][1]);
 await a.els.question.fire('input');await a.els['download-editable'].click();
 assert.equal(a.links[0].download,'inquiry-fieldnotes-editable.json');assert.equal(a.links[0].removed,true);assert.equal(a.revoked.length,1);
 const text=await a.blobs[0].text();assert.deepEqual(JSON.parse(text),original);
 let prevented=false;a.events.beforeunload({preventDefault(){prevented=true;}});assert.equal(prevented,true,'download does not clear warning');
 const b=setup();b.els.claim.value='current';const before=b.state();await b.choose(text);assert.deepEqual(b.state(),before);assert.equal(b.els['notes-review'].hidden,false);assert.equal(b.els['confirm-open'].focused,true);
 await b.els['confirm-open'].click();assert.deepEqual(b.state(),a.state());assert.equal(b.els.question.focused,true);assert.equal(b.els['notes-review'].hidden,true);
 prevented=false;b.events.beforeunload({preventDefault(){prevented=true;}});assert.equal(prevented,true);
 await b.els['confirm-open'].click();assert.deepEqual(b.state(),a.state());
});
test('rejects malformed, legacy, partial, unknown versions, unsafe types, extra fields, over-limit and normalization-loss input',async()=>{
 const a=setup();a.els.claim.value='keep';a.els[checks[0]].checked=true;const before=a.state();
 const bad=['','INQUIRY FIELDNOTES\nREADY TO EXPLAIN','{','{}',JSON.stringify({__proto__:{evil:true}})];
 for(const mutate of [d=>d.push('extra'),d=>d[1]=2,d=>d[0]='other',d=>d[2].pop(),d=>d[2].push(['extra','x']),d=>d[2][0][0]='__proto__',d=>d[2][1][0]='question',d=>d[2][0][1]={html:'x'},d=>d[2][0][1]=null,d=>d[2][0][1]=12,d=>d[2][0][1]='x'.repeat(12001),d=>d[2][0][1]='a\nb',d=>d[2][2][1]='a\rb',d=>d[2][2][1]='\0',d=>d[2][2].push('extra'),d=>d[3][0][1]='true',d=>d[3][0][0]='bad',d=>d[3].pop()]){const d=a.data();mutate(d);bad.push(d);}
 for(const d of bad){await a.choose(d);assert.deepEqual(a.state(),before);assert.equal(a.els['notes-review'].hidden,true);assert.match(a.els['open-status'].textContent,/Could not open/);await a.els['confirm-open'].click();assert.deepEqual(a.state(),before);}
 for(const size of [0,524289,NaN,Infinity]){await a.choose(a.data(),size);assert.deepEqual(a.state(),before);assert.match(a.els['open-status'].textContent,/Could not open/);}
 await a.choose(' '.repeat(524289),1);assert.match(a.els['open-status'].textContent,/Could not open/);
});
test('cancel preview, chooser cancel, editing preview and programmatic changes preserve current work',async()=>{
 for(const action of ['cancel-open','chooser-cancel','edit','check','silent']){
  const a=setup();a.els.claim.value='keep';await a.choose(a.data());
  if(action==='cancel-open')await a.els[action].click();
  if(action==='chooser-cancel')await a.els['notes-file'].fire('cancel');
  if(action==='edit'){a.els.claim.value='newer';await a.els.claim.fire('input');}
  if(action==='check'){a.els[checks[0]].checked=true;await a.els[checks[0]].fire('change');}
  if(action==='silent')a.els.claim.value='silent newer';
  const before=a.state();await a.els['confirm-open'].click();assert.deepEqual(a.state(),before);assert.equal(a.els['notes-review'].hidden,true);
 }
});
test('stale file reads and failures cannot replace a newer selection or restore a cancelled preview',async()=>{
 for(const action of ['newer','cancel','open','edit','check','reject']){
  const a=setup();let resolve,reject;const promise=new Promise((r,j)=>{resolve=r;reject=j;});
  a.els['notes-file'].files=[{size:123,text:()=>promise}];const reading=a.els['notes-file'].fire('change');
  if(action==='newer')await a.choose(a.data());
  else if(action==='open')await a.els['open-notes'].click();
  else if(action==='edit'){a.els.claim.value='new';await a.els.claim.fire('input');}
  else if(action==='check'){a.els[checks[0]].checked=true;await a.els[checks[0]].fire('change');}
  else await a.els['cancel-open'].click();
  const status=a.els['open-status'].textContent;const before=a.state();
  if(action==='reject')reject(new Error('read failure'));else {const stale=a.data();stale[2][0][1]='stale';resolve(JSON.stringify(stale));}
  await reading;assert.equal(a.els['open-status'].textContent,status);assert.deepEqual(a.state(),before);
  await a.els['confirm-open'].click();if(action==='newer')assert.equal(a.els.question.value,'Note 0');else assert.deepEqual(a.state(),before);
 }
});
test('unreadable file and no selection preserve work; fresh selection recovers',async()=>{
 const a=setup();a.els.claim.value='keep';a.els['notes-file'].files=[{size:10,text:()=>Promise.reject(new Error('unreadable'))}];await a.els['notes-file'].fire('change');assert.match(a.els['open-status'].textContent,/Could not open/);assert.equal(a.els.claim.value,'keep');
 a.els['notes-file'].files=[];await a.els['notes-file'].fire('change');assert.match(a.els['open-status'].textContent,/No file/);await a.choose(a.data());assert.equal(a.els['notes-review'].hidden,false);
});
test('empty values, maximum-length fields and all checks are valid; failed export leaves values intact',async()=>{
 const a=setup();const d=a.data();d[2].forEach(row=>row[1]='');d[2][2][1]='x'.repeat(12000);d[3].forEach(row=>row[1]=true);await a.choose(d);await a.els['confirm-open'].click();assert.equal(a.els.claim.value.length,12000);assert.equal(a.els.question.value,'');assert.ok(checks.every(id=>a.els[id].checked));
 a.els.claim.value+='x';const before=a.state();await a.els['download-editable'].click();assert.equal(a.blobs.length,0);assert.deepEqual(a.state(),before);assert.match(a.els['open-status'].textContent,/Could not request/);
});
test('UI clearly separates editable copies from reading copies and excludes file controls from print',()=>{
 const html=fs.readFileSync('public/activities/inquiry-fieldnotes.html','utf8');assert.match(html,/Text copies and PDFs cannot reopen|text copies are for reading only/);assert.match(html,/notes-files no-print/);assert.match(html,/id="notes-file"[^>]*hidden/);assert.match(html,/aria-live="polite"/);
 assert.doesNotMatch(source,/innerHTML|eval\(|fetch\(|XMLHttpRequest|localStorage|sessionStorage|location\s*=/);
});
test('encoded export size is bounded too, and silent edits during reading invalidate the preview',async()=>{
 const a=setup();ids.forEach(id=>a.els[id].value='\ud800'.repeat(12000));await a.els['download-editable'].click();assert.equal(a.blobs.length,0);assert.match(a.els['open-status'].textContent,/Could not request/);
 let resolve;a.els['notes-file'].files=[{size:100,text:()=>new Promise(r=>resolve=r)}];const reading=a.els['notes-file'].fire('change');a.els.claim.value='newer';resolve(JSON.stringify(a.data()));await reading;assert.equal(a.els['notes-review'].hidden,true);assert.equal(a.els.claim.value,'newer');
});
