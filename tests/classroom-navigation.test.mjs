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

test('normal entry uses the active plan, excludes tentative drafts and advances only to a reviewed teaching date', () => {
  const active = store.publishedDayPlans.find(p => p.id === store.DEFAULT_DAY_PLAN_ID);
  const latest = [...store.publishedDayPlans].filter(p => p.status !== 'tentative' && p.date).sort((a,b) => b.date.localeCompare(a.date))[0];
  const future = {...active, id:'future', date:'2030-09-19'};
  const draft = {...active, id:'draft', date, status:'tentative'};
  assert.equal(nav.chooseDisplayPlan([...store.publishedDayPlans, future, draft], date).id, latest.id);
  assert.equal(nav.chooseDisplayPlan([...store.publishedDayPlans, future], '2030-09-19').id, future.id);
  assert.equal(nav.chooseDisplayPlan(store.publishedDayPlans, '2026-10-05').id, active.id);
  assert.equal(nav.chooseDisplayPlan(store.publishedDayPlans, '2026-10-07').id, 'day-2026-10-07');
  assert.equal(nav.chooseDisplayPlan(store.publishedDayPlans, '2026-10-16').id, latest.id);
  assert.equal(nav.chooseDisplayPlan(store.publishedDayPlans, date, 'missing').id, latest.id);
  assert.equal(nav.chooseDisplayPlan([...store.publishedDayPlans, draft], date, 'draft').id, 'draft');
});

test('explicit archive survives Home, activity, projector and editor routes; stale storage never overrides normal entry', () => {
  const local = new Map(), session = new Map();
  globalThis.window = {location:{search:'?view=Morning+Screen&mode=student&dayPlan=archive'},
    localStorage:{getItem:k=>local.get(k)??null,setItem:(k,v)=>local.set(k,v)},
    sessionStorage:{getItem:k=>session.get(k)??null,setItem:(k,v)=>session.set(k,v)},dispatchEvent:()=>{}};
  store.saveDayPlan({...template,id:'archive',date:'2026-09-18'});
  const before = JSON.stringify(store.readDayRevisions());
  nav.rememberDisplayedDay('archive');
  const first = window.location.search;
  assert.equal(nav.recordNavigation(),'?view=Home');
  for (const route of ['?view=Home','?view=Games+%26+Activities','?view=Morning+Screen']) {
    window.location.search=nav.dayPlanHref(route,'archive');
    assert.equal(nav.displayedDayPlan().id,'archive');
    window.location.search=nav.classroomRouteForMode(window.location.search,true);
    assert.equal(nav.displayedDayPlan().id,'archive');
    assert.equal(nav.shapeOfDayHref(),first);
  }
  window.location.search=nav.editDayHref();
  assert.equal(nav.displayedDayPlan().id,'archive');
  window.location.search='';
  assert.equal(nav.displayedDayPlan().id,store.DEFAULT_DAY_PLAN_ID);
  window.location.search='?view=Home';
  assert.equal(nav.displayedDayPlan().id,store.DEFAULT_DAY_PLAN_ID);
  assert.equal(JSON.stringify(store.readDayRevisions()),before);
  delete globalThis.window;
});

test('Back never uses an external destination or cycles through a stale forward trail', () => {
  assert.deepEqual(nav.visitRoute(['https://example.com','//example.com','?view=Home','?view=Responsibilities'],'?view=Home'),['?view=Home']);
  assert.deepEqual(nav.visitRoute(['?view=Home'],'?view=Home'),['?view=Home']);
});

test('navigation reads published plans when local data is unavailable without overwriting damaged data', () => {
  const damaged = '{unreadable';
  let writes = 0;
  globalThis.window = {localStorage:{getItem:()=>damaged,setItem:()=>writes++}};
  assert.equal(store.listDayPlans().length,store.publishedDayPlans.length);
  assert.throws(()=>store.saveDayPlan(store.publishedDayPlans[0]));
  assert.equal(writes,0);
  window.localStorage.getItem=()=>{throw new Error('Storage blocked');};
  assert.equal(store.listDayPlans().length,store.publishedDayPlans.length);
  delete globalThis.window;
});

test('archive status distinguishes past, current, future and undated plans', () => {
  assert.equal(nav.dayPlanStatus({date:'2026-09-24'},'2026-09-25'),'Archived plan');
  assert.equal(nav.dayPlanStatus({date:'2026-09-25'},'2026-09-25'),"Today's plan");
  assert.equal(nav.dayPlanStatus({date:'2026-09-28'},'2026-09-25'),'Upcoming plan');
  assert.equal(nav.dayPlanStatus({date:''},'2026-09-25'),'Reusable template');
});

test('projector Home and Back preserve the student display mode', () => {
  assert.equal(nav.classroomRouteForMode('?view=Home',true),'?view=Home&mode=student');
  assert.equal(nav.classroomRouteForMode('?view=Day+Plans&mode=teacher',true),'?view=Day+Plans&mode=student');
  assert.equal(nav.classroomRouteForMode('?view=Home',false),'?view=Home');
});
