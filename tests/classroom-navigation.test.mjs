import test from 'node:test';
import assert from 'node:assert/strict';
import {moduleLoader} from './helpers/load-rendered-module.mjs';
const load = moduleLoader(process.cwd());
const nav = load('app/classroom-navigation-state.ts');
const store = load('app/day-plan-store.ts');
// Keep the fallback template undated so a published plan cannot collide with
// the synthetic "today" fixture when this test runs on its teaching date.
const date = '2030-09-18';
const template = {...store.publishedDayPlans[0], date:''};

test('display selection prefers the requested plan, remembers a projected day, and expires yesterday’s selection', () => {
  const today = {...template, id:'today', date};
  const next = {...template, id:'next-year', date:'2027-09-08'};
  const plans = [template, today, next];
  assert.equal(nav.chooseDisplayPlan(plans,date,'next-year').id,'next-year');
  assert.equal(nav.chooseDisplayPlan(plans,date,null,{id:'next-year',date}).id,'next-year');
  assert.equal(nav.chooseDisplayPlan(plans,date,null,{id:'next-year',date:'2000-01-01'}).id,'today');
  assert.equal(nav.chooseDisplayPlan(plans,date,'missing').id,'today');
});

test('projected plan survives activity round trip without changing archived revisions', () => {
  const local = new Map(), session = new Map();
  globalThis.window = {location:{search:'?view=Morning+Screen&mode=student&dayPlan=next-year'},
    localStorage:{getItem:k=>local.get(k)??null,setItem:(k,v)=>local.set(k,v)},
    sessionStorage:{getItem:k=>session.get(k)??null,setItem:(k,v)=>session.set(k,v)},dispatchEvent:()=>{}};
  store.saveDayPlan({...template,id:'next-year',date:'2027-09-08'});
  const before = JSON.stringify(store.readDayRevisions());
  nav.rememberDisplayedDay(nav.displayedDayPlan().id);
  const first = window.location.search;
  assert.equal(nav.recordNavigation(),'?view=Home');
  window.location.search='?view=Games+%26+Activities&mode=student';
  assert.equal(nav.recordNavigation(),first);
  assert.equal(nav.shapeOfDayHref(),first);
  assert.equal(nav.editDayHref(),'?view=Day+Plans&plan=next-year');
  window.location.search=first;
  assert.equal(nav.recordNavigation(),'?view=Home');
  assert.equal(JSON.stringify(store.readDayRevisions()),before);
  delete globalThis.window;
});

test('Back never uses an external destination or cycles through a stale forward trail', () => {
  assert.deepEqual(nav.visitRoute(['https://example.com','//example.com','?view=Home','?view=Responsibilities'],'?view=Home'),['?view=Home']);
  assert.deepEqual(nav.visitRoute(['?view=Home'],'?view=Home'),['?view=Home']);
});
