import test from 'node:test';
import assert from 'node:assert/strict';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load=moduleLoader(process.cwd());
const weather=load('app/classroom-weather.ts');
const store=load('app/day-plan-store.ts');
const now=Date.parse('2026-09-16T16:00:00Z');
const payload={current:{temperature_2m:0,weather_code:66,is_day:1,time:now/1000},current_units:{temperature_2m:'°C'}};

test('clock uses Vancouver time across summer, winter and the UTC date boundary',()=>{
  assert.match(weather.classroomTime(new Date('2026-09-16T16:00:00Z')),/9:00/);
  assert.match(weather.classroomTime(new Date('2026-01-16T16:00:00Z')),/8:00/);
  assert.match(weather.classroomDate(new Date('2026-09-16T02:00:00Z')),/September 15/);
});
test('live weather accepts zero Celsius, distinguishes freezing rain and rejects missing or stale readings',()=>{
  const reading=weather.parseCurrentWeather(payload,now);
  assert.equal(reading.temperatureC,0);
  assert.equal(weather.weatherDescription(reading.code).label,'Freezing rain');
  assert.equal(weather.usableWeather(reading,now),true);
  assert.equal(weather.usableWeather(reading,now+weather.WEATHER_MAX_AGE_MS+1),false);
  assert.equal(weather.parseCurrentWeather({...payload,current:{...payload.current,temperature_2m:null}},now),null);
  assert.equal(weather.parseCurrentWeather({...payload,current_units:{temperature_2m:'°F'}},now),null);
  assert.equal(weather.parseCurrentWeather({...payload,current:{...payload.current,time:(now-4*3600000)/1000}},now),null);
  assert.equal(weather.parseCurrentWeather({...payload,current:{...payload.current,time:(now+3600000)/1000}},now),null);
  assert.equal(weather.weatherDescription(0,false).label,'Clear night');
});
test('updated plan keeps the original and student-facing instructions survive archive round trips',()=>{
  const old=store.publishedDayPlans.find(p=>p.id==='first-full-day');
  const next=store.publishedDayPlans.find(p=>p.id===store.DEFAULT_DAY_PLAN_ID);
  assert.notEqual(next.id,old.id);
  assert.equal(old.blocks.some(b=>b.title==='Werewolf: learn, practise, play'),true);
  const parsed=store.parseDayPlan(next);
  assert.deepEqual(parsed,next);
  assert.match(parsed.blocks.map(b=>b.title).join(' '),/supplies.*chess.*DPA/s);
  assert.match(parsed.blocks.at(-1).studentSteps.join(' '),/vote once/);
  const restored=store.parseDayArchive([{revisionId:'test',savedAt:new Date(now).toISOString(),plan:parsed}]);
  assert.deepEqual(restored[0].plan.blocks,parsed.blocks);
  const invalid=structuredClone(next);invalid.blocks[0].studentSteps=[{private:'not text'}];
  assert.equal(store.parseDayPlan(invalid),null);
});
