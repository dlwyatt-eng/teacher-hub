import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(process.cwd());
const plan=load('content/day-plans/day-2026-10-05.json');
test('Monday print renderer supplies usable material links and preserves tentative pacing',()=>{
 const html=renderToStaticMarkup(React.createElement(load('app/day-plan-print.tsx').default,{plan}));
 for(const part of ['8:45–9:35 am','9:35–10:20 am','12:55–1:40 pm','1:40–2:00 pm','community-fairness-reflection.pdf','Bloxels_Story_and_Game_Planner.pdf','Monday_Learning_English_Korean.pdf','monday-october-5.html'])assert.ok(html.includes(part),part);
 assert.match(html,/completing every page Monday is not expected/);
 for(const block of plan.blocks)for(const material of [block.activity,block.worksheet])if(material?.href.startsWith('./'))assert.ok(existsSync('public/'+material.href.slice(2)),material.href);
 const chooser=readFileSync('public/activities/monday-october-5.html','utf8');
 for(const match of chooser.matchAll(/href="\.\.\/printables\/([^"]+)"/g))assert.ok(readFileSync('public/printables/'+match[1]).subarray(0,5).equals(Buffer.from('%PDF-')),match[1]);
});
