import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const {weeklyTimetableRows, WeeklyTimetable, parseWeeklyPlan, weeklyPlanFromSeed} = moduleLoader(process.cwd())('app/weekly-plan.tsx');
const block=(id,day,startTime)=>({id,day,startTime,kind:'lesson',subject:'Math',title:id,timing:'30 min',runSteps:['Teacher steps'],notes:'Detail only'});
const plan={version:1,weekOf:'2026-11-02',title:'A teaching week',weekNote:'Teacher notes',blocks:[block('later','monday','13:00'),block('early','tuesday','09:00'),block('same','monday','09:00'),block('flex','friday',''),block('flex2','friday','')]};
test('timetable aligns actual start times, retains coincident and untimed blocks without mutating saved data',()=>{
 const before=JSON.stringify(plan); const rows=weeklyTimetableRows(plan.blocks);
 assert.deepEqual(rows.map(r=>r.time),['09:00','13:00','']);
 assert.equal(rows[0].days[0][0].id,'same');assert.equal(rows[0].days[1][0].id,'early');
 assert.deepEqual(rows[2].days[4].map(b=>b.id),['flex','flex2']);assert.equal(JSON.stringify(plan),before);
 assert.deepEqual(weeklyTimetableRows([]),[]);
});
test('compact grid preserves each activity, uses weekday dates and omits teacher detail without inventing free time',()=>{
 const html=renderToStaticMarkup(React.createElement(WeeklyTimetable,{plan}));
 for(const b of plan.blocks) assert.ok(html.includes(`<strong>${b.title}</strong>`));
 assert.match(html,/scope="row"/);assert.match(html,/Nov 2/);assert.match(html,/Nov 6/);assert.match(html,/1:00 pm/);
 assert.match(html,/Time to choose/);assert.match(html,/not necessarily free time/);
 assert.doesNotMatch(html,/Teacher steps|Detail only|Teacher notes/);
});
