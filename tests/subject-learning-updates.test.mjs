import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {projectLearningUpdates} from '../pages/public-window-projection.mjs';
const read=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const source=read('../content/current-learning-window-v2.json');
const manifest=read('../public/generated/public-window-v2.json');
test('dated subject updates cover the full class without turning plans into completed work',()=>{
 const updates=source.learningUpdates;
 assert.deepEqual(manifest.learningUpdates,updates);
 assert.equal(updates.updatedOn,'November 2, 2026');
 assert.deepEqual(updates.subjects.map(x=>x.subject),['Mathematics','Language Arts','Career Education','Physical Education','Health','Social Studies','Arts Education','ADST','Science','French']);
 assert.equal(new Set(updates.subjects.map(x=>x.focus)).size,10);
 const by=Object.fromEntries(updates.subjects.map(x=>[x.subject,x]));
 for(const key of ['Physical Education','Health','Arts Education'])assert.equal(by[key].status,'Planned');
 for(const key of ['Science','French'])assert.equal(by[key].status,'Update pending');
 assert.match(by['Physical Education'].detail,/unfinished last week/);
 assert.match(by['Arts Education'].detail,/assembly date and time are not confirmed/);
 assert.match(by['Language Arts'].detail,/no chapter is assumed/);
 assert.match(by['Social Studies'].detail,/voting preferences remain private/);
 assert.doesNotMatch(JSON.stringify(updates),/laptop|booking|mastered|completed the lesson|support schedule/i);
});
test('subject update projection exports only the public fields',()=>{
 const updates=structuredClone(source.learningUpdates);updates.teacher='private';updates.subjects[0].teacher='private';
 assert.deepEqual(projectLearningUpdates(updates),source.learningUpdates);
});
