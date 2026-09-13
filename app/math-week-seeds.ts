import { mathPacingLessons, mathPacingUnits, type MathPacingWeek } from './math-week-pacing';
import { mathSupportPacks } from './math-program-supports';
import type { WeekPlanSeedLesson } from './weekly-plan';

export function mathWeekSeedLessons(week: MathPacingWeek): WeekPlanSeedLesson[] {
  const unit=mathPacingUnits.find(u=>u.id===week.unit)!;
  if(week.kind==='flex') {
    const pack=mathSupportPacks.find(p=>p.id===unit.packId)!;
    return [{sourceId:`math-flex-${week.weekOf}`,subject:'Mathematics',title:`Familiar practice / catch-up · ${unit.title}`,timing:'15–30 min · adjust or move',day:'wednesday',runSteps:[
      'Choose this activity only if its concept has already been taught. Otherwise revisit a familiar problem from an earlier week.',
      pack.partnerCards[0].body,
      'Partners explain their methods, then change one number or condition and challenge each other. Keep the working on paper.',
      'Finish with one explanation or brief teacher check. No new upload is required.'
    ],notes:`${week.note} Open Mathematics → Weekly math pacing for games, paper alternatives and checks. These are movable buffers, not confirmed report dates. If a core lesson was carried forward, use this slot for that lesson instead.`}];
  }
  return week.lessonIds.map((id,index)=>{
    const lesson=mathPacingLessons[id];
    return {sourceId:`math-paced-${id}`,subject:'Mathematics',title:lesson.title,timing:'25–40 min · focused lesson',day:index===0?'monday':'thursday',runSteps:[`Model together: ${lesson.model}`,`Try and explain: ${lesson.task}`,`Independent check: ${lesson.check}`],notes:`Teacher check: ${lesson.answer}\nOpen Mathematics → Weekly math pacing → ${week.weekOf} for the exact projector and student-print task. Full resources: ?subject=Mathematics&experience=${lesson.experienceId}\n${week.note} Practise or reteach after checking. Carry unfinished core learning to a later slot; do not add a mandatory SpacesEDU task.`} satisfies WeekPlanSeedLesson;
  });
}
