'use client';
import {useEffect, useState} from 'react';
import {DAY_ARCHIVE_EVENT} from './day-plan-store';
import {displayedDayPlan, editDayHref, HOME_HREF, recordNavigation, rememberDisplayedDay, shapeOfDayHref} from './classroom-navigation-state';
import './classroom-navigation.css';

function useDisplayPlan(routeKey = '') {
  const [plan, setPlan] = useState(displayedDayPlan);
  useEffect(() => {
    const refresh = () => setPlan(displayedDayPlan());
    refresh();
    window.addEventListener(DAY_ARCHIVE_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => { window.removeEventListener(DAY_ARCHIVE_EVENT, refresh); window.removeEventListener('storage', refresh); };
  }, [routeKey]);
  return plan;
}

export function ClassroomNavigation({active, routeKey, projector}: {active: string; routeKey: string; projector: boolean}) {
  const plan = useDisplayPlan(routeKey);
  const [back, setBack] = useState(HOME_HREF);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('dayPlan')) rememberDisplayedDay(plan.id);
    setBack(recordNavigation());
  }, [routeKey, plan.id]);
  const mode = projector ? '&mode=student' : '';
  return <nav className="classroom-nav" aria-label="Classroom shortcuts">
    <a href={back} aria-label="Back to previous classroom screen">← Back</a>
    <a href={HOME_HREF} aria-current={active === 'Home' && !projector ? 'page' : undefined}>Home</a>
    <a href={shapeOfDayHref(plan.id)} aria-current={active === 'Morning Screen' && projector ? 'page' : undefined}>Shape of the Day</a>
    <a href={`?view=Games+%26+Activities${mode}`} aria-current={active === 'Games & Activities' ? 'page' : undefined}>Activities</a>
    <a href={`?view=Responsibilities${mode}`} aria-current={active === 'Responsibilities' ? 'page' : undefined}>Responsibilities</a>
    {!projector && <a href={editDayHref(plan.id)} aria-current={active === 'Day Plans' ? 'page' : undefined}>Saved day plans</a>}
  </nav>;
}

export function ClassroomLaunch() {
  const plan = useDisplayPlan();
  return <section className="classroom-launch" aria-labelledby="classroom-launch-title">
    <div className="classroom-launch-heading"><div><p className="section-kicker">START HERE</p><h2 id="classroom-launch-title">Run the day</h2></div><p>{plan.date || 'Reusable template'} · {plan.title}</p></div>
    <div className="classroom-launch-grid">
      <a className="classroom-launch-primary" href={shapeOfDayHref(plan.id)}><span aria-hidden="true">☀</span><strong>Shape of the Day</strong><p>Display the welcome screen and open each activity in order.</p><b>Open on projector →</b></a>
      <a href="?view=Games+%26+Activities&mode=student"><span aria-hidden="true">✦</span><strong>Activities</strong><p>Similar, Different and Would You Rather cards.</p><b>Choose a deck →</b></a>
      <a href="?view=Responsibilities&mode=student"><span aria-hidden="true">◇</span><strong>Responsibilities</strong><p>Start-here expectations, everyone’s jobs and Team Captains.</p><b>Show responsibilities →</b></a>
    </div>
    <nav className="classroom-launch-links" aria-label="Prepare and continue the day">
      <a href={editDayHref(plan.id)}>Edit day plan / archive</a>
      <a href="?view=Morning+Screen">Arrival challenge &amp; notices</a>
      <a href="?subject=English+Language+Arts&experience=werewolf-learn&mode=student">Werewolf</a>
      <a href="?view=Weekly+Plan">Week plan</a>
      <a href="?view=TOC+%26+Emergency+Plans">TOC &amp; printables</a>
    </nav>
  </section>;
}
