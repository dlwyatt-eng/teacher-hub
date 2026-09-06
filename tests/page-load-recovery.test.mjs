import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, access } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { retainRecentAssets } from '../pages/retain-recent-assets.mjs';
import { moduleLoader } from './helpers/load-rendered-module.mjs';
const {isPageFileError,freshViewUrl} = moduleLoader(process.cwd())('app/route-load-recovery.ts');
test('module download failures are distinguished from ordinary page bugs',()=>{
  for(const msg of ['Failed to fetch dynamically imported module: /assets/page-old.js','Importing a module script failed.','Unable to preload CSS for /assets/style.css']) assert.equal(isPageFileError(new Error(msg)),true);
  assert.equal(isPageFileError(new Error('Cannot read properties of undefined')),false);
  const url=new URL(freshViewUrl('https://example.com/teacher-hub/?subject=Mathematics&mode=student#check',123));
  assert.equal(url.searchParams.get('subject'),'Mathematics'); assert.equal(url.hash,'#check'); assert.equal(url.searchParams.get('hubRefresh'),'123');
});
test('two previous asset generations remain available without rolling back current content',async()=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'hub-assets-')); const dist=path.join(root,'dist'),hist=path.join(root,'history');
  try {
    for(let i=1;i<=4;i++){
      await rm(dist,{recursive:true,force:true});await mkdir(path.join(dist,'assets'),{recursive:true});
      await writeFile(path.join(dist,'index.html'),'latest '+i); await writeFile(path.join(dist,'assets',`page-0000000${i}.js`),'build '+i);
      await retainRecentAssets(dist,hist);
      assert.equal(await readFile(path.join(dist,'index.html'),'utf8'),'latest '+i);
      await access(path.join(dist,'assets',`page-0000000${i}.js`));
    }
    for(const i of [2,3,4]) await access(path.join(dist,'assets',`page-0000000${i}.js`));
    await assert.rejects(access(path.join(dist,'assets','page-00000001.js')));
  }finally{await rm(root,{recursive:true,force:true});}
});
