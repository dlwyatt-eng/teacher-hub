import {DEFAULT_DAY_PLAN_ID, listDayPlans, publishedDayPlans, type DayPlan} from './day-plan-store';
import {vancouverDateKey} from './morning-screen-state';

export const DISPLAYED_DAY_EVENT = 'wyatt:displayed-day';
const DAY_KEY = 'wyatt-displayed-day-v1';
const TRAIL_KEY = 'wyatt-navigation-trail-v1';
export const HOME_HREF = '?view=Home';

export function chooseDisplayPlan(plans: DayPlan[], date: string, explicit?: string | null): DayPlan {
  const active = plans.find(p => p.id === DEFAULT_DAY_PLAN_ID && p.status !== 'tentative');
  // A newer reviewed teaching day may take over on its Vancouver date. Drafts
  // and old remembered archive selections never displace the active classroom plan.
  const reviewed = plans.filter(p => p.date && p.date <= date && p.status !== 'tentative'
    && !p.id.startsWith('week-day-') && (!active || p.date > active.date))
    .sort((a, b) => b.date.localeCompare(a.date));
  return plans.find(p => p.id === explicit) ?? reviewed[0] ?? active
    ?? publishedDayPlans.find(p => p.id === DEFAULT_DAY_PLAN_ID)!;
}

export function dayPlanHref(route: string, id = displayedDayPlan().id): string {
  const params = new URLSearchParams(route);
  params.set('dayPlan', id);
  return `?${params.toString()}`;
}

export function displayedDayPlan(): DayPlan {
  let plans = publishedDayPlans;
  try { plans = listDayPlans(); } catch { /* Published plans remain usable. */ }
  const params = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search);
  const explicit = params?.get('dayPlan') ?? (params?.get('view') === 'Day Plans' ? params.get('plan') : null);
  return chooseDisplayPlan(plans, vancouverDateKey(), explicit);
}

export function rememberDisplayedDay(id: string) {
  try { window.sessionStorage.setItem(DAY_KEY, JSON.stringify({id, date: vancouverDateKey()})); } catch { /* Navigation still works without storage. */ }
  if (typeof window !== 'undefined') window.dispatchEvent?.(new Event(DISPLAYED_DAY_EVENT));
}

export const shapeOfDayHref = (id = displayedDayPlan().id) => `?view=Morning+Screen&mode=student&dayPlan=${encodeURIComponent(id)}`;
export const editDayHref = (id = displayedDayPlan().id) => `?view=Day+Plans&plan=${encodeURIComponent(id)}`;

// Keep Back within this site, including after a full-page activity link.
export function visitRoute(trail: string[], route: string): string[] {
  const safe = trail.filter(x => typeof x === 'string' && x.startsWith('?') && !/[\r\n]/.test(x));
  const previous = safe.lastIndexOf(route);
  return previous >= 0 ? safe.slice(0, previous + 1) : [...safe, route].slice(-30);
}

export function recordNavigation(): string {
  try {
    const raw = JSON.parse(window.sessionStorage.getItem(TRAIL_KEY) || '[]');
    const trail = visitRoute(Array.isArray(raw) ? raw : [], window.location.search || '?view=Home');
    window.sessionStorage.setItem(TRAIL_KEY, JSON.stringify(trail));
    return trail.at(-2) || HOME_HREF;
  } catch { return HOME_HREF; }
}

export function dayPlanStatus(plan: Pick<DayPlan, 'date'|'status'> & {id?: string}, today = vancouverDateKey()) {
  if (plan.id && plan.id === chooseDisplayPlan(listDayPlans(), today).id) return 'Active classroom plan';
  if (plan.status === 'tentative') return 'Tentative plan · review before teaching';
  if (!plan.date) return 'Reusable template';
  if (plan.date === today) return "Today's plan";
  return plan.date < today ? 'Archived plan' : 'Upcoming plan';
}

export function classroomRouteForMode(route: string, projector: boolean) {
  if (!projector) return route;
  const params = new URLSearchParams(route);
  params.set('mode', 'student');
  return `?${params.toString()}`;
}
