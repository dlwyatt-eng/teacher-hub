import {DEFAULT_DAY_PLAN_ID, listDayPlans, publishedDayPlans, type DayPlan} from './day-plan-store';
import {vancouverDateKey} from './morning-screen-state';

export const DISPLAYED_DAY_EVENT = 'wyatt:displayed-day';
const DAY_KEY = 'wyatt-displayed-day-v1';
const TRAIL_KEY = 'wyatt-navigation-trail-v1';
export const HOME_HREF = '?view=Home';

export function chooseDisplayPlan(plans: DayPlan[], date: string, explicit?: string | null, remembered?: {id: string; date: string} | null): DayPlan {
  return plans.find(p => p.id === explicit)
    ?? plans.find(p => remembered?.date === date && p.id === remembered.id)
    ?? plans.find(p => p.date === date && p.status !== 'tentative' && !p.id.startsWith('week-day-'))
    ?? plans.find(p => p.date === date && p.status !== 'tentative')
    ?? plans.find(p => p.id === DEFAULT_DAY_PLAN_ID)
    ?? publishedDayPlans[0];
}

export function displayedDayPlan(): DayPlan {
  let plans = publishedDayPlans;
  try { plans = listDayPlans(); } catch { /* Published plans remain usable. */ }
  let remembered = null;
  try { remembered = JSON.parse(window.sessionStorage.getItem(DAY_KEY) || 'null'); } catch { /* Storage is optional. */ }
  const params = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search);
  const explicit = params?.get('dayPlan') ?? (params?.get('view') === 'Day Plans' ? params.get('plan') : null);
  return chooseDisplayPlan(plans, vancouverDateKey(), explicit, remembered);
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

export function dayPlanStatus(plan: Pick<DayPlan, 'date'|'status'>, today = vancouverDateKey()) {
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
