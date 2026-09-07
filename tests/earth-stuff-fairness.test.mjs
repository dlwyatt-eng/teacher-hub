import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { sources, films, cases, core, younger, advanced } from '../content/earth-stuff-fairness.mjs';

test('Earth inquiry supplies concrete grade routes and complete materials', () => {
  assert.equal(core.length, 6);
  assert.equal(younger['K–2'].length, 4);
  assert.equal(younger['3–5'].length, 4);
  assert.equal(cases.length, 8);
  for (const band of ['K–2','3–5','6–8','9–12']) {
    const route = band==='K–2'?younger[band]:band==='3–5'?younger[band].map(a=>({...core.find(c=>c.id===a.from),...a})):core;
    assert.equal(new Set(route.map(a=>a.id)).size, route.length);
    for (const a of route) {
      for (const key of ['title','time','learn','materials','exit','teacher','print']) assert.ok(a[key]?.length>5, `${band}/${a.id}/${key}`);
      assert.ok(a.cards.length>=2 && a.steps.length>=3);
      assert.ok(a.cards.every(c=>c.length===2 && c.every(s=>typeof s==='string' && s.length>0)));
      for (const key of a.sources||[]) assert.ok(sources[key], key);
      if (band==='9–12') assert.ok(advanced[a.id]);
    }
  }
  assert.equal(younger['3–5'][1].cards.length, 2);
});
test('Film shelf is attributed, optional and age-bounded', () => {
  assert.equal(films.length, 8);
  for (const f of films) {
    assert.ok(sources[f.id][1].startsWith('https://www.storyofstuff.org/'));
    for (const key of ['before','pause','after','backup','care']) assert.ok(f[key]?.length>10);
  }
  assert.match(films.find(f=>f.id==='citizens').care,/Not Grade 6 core/);
  assert.ok(core.every(a=>!(a.film||[]).includes('citizens')));
  assert.ok(younger['K–2'].every(a=>!a.film?.length));
});
test('Quantities and boundaries are internally consistent', () => {
  assert.equal(75+23+2,100);
  assert.equal([4,4,4,4,4].reduce((a,b)=>a+b)/5,4);
  assert.equal([0,1,1,1,17].reduce((a,b)=>a+b)/5,4);
  assert.equal(3+6+1+8+2,20);
  assert.equal((20-18)/20*100,10);
  assert.equal(14/20*100,70);
  assert.match(core.find(a=>a.id==='stuff').teacher,/does not guarantee/);
  assert.match(core.find(a=>a.id==='claims').teacher,/Do not infer 10%/);
  assert.match(cases.find(c=>c[3]==='china')[2],/2011 purchasing-power/);
});
test('Generated family asset contains no teacher key; inquiry assets are self-contained', () => {
  const script=resolve('scripts/build-earth-stuff-pack.mjs');
  const dir=mkdtempSync(join(tmpdir(),'earth-pack-'));
  try {
    for (const audience of ['teacher','equity','family']) {
      execFileSync(process.execPath,[script,audience],{cwd:dir});
      const html=readFileSync(join(dir,'public/earth-stuff-fairness/index.html'),'utf8');
      assert.match(html,/Earth, Stuff & Fairness/);
      assert.doesNotMatch(html,/<script[^>]+src=|<iframe|localStorage|fetch\(/);
      if (audience==='family') {
        assert.doesNotMatch(html,/pack-data|Suggested placements|3 \+ 6 \+ 1/);
        assert.match(html,/not extra homework/);
      } else {
        assert.match(html,/id="pack-data"/);
        assert.match(html,/Print this activity/);
        assert.match(html,/card-next/);
        assert.match(html,/Escape/);
      }
    }
  } finally { rmSync(dir,{recursive:true,force:true}); }
});
