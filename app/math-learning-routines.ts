import type { MathPacingLesson } from './math-week-pacing';

export type MathStorySource = { title: string; url: string; credit: string; summary: string; prompt: string; teacherNote: string };
export const skateboardMathSource: MathStorySource = {
  title: 'Small Number and the Skateboard Park · SFU Math Catcher',
  url: 'https://www.sfu.ca/mathcatcher/StoriesMovies/TheSkateboardPark.html',
  credit: 'Written by Veselin Jungic and Mark MacLean; illustrated by Simon Roy. English voice: Dexter Anakson, Piapot First Nation.',
  summary: 'Brief paraphrase: a cousin recognises the geometry in their grandmother’s weaving, helps Small Number through questions, and connects geometry with skateboarding.',
  prompt: 'Read or watch the story on SFU’s page. What mathematical knowledge does the cousin recognise in his grandmother’s work? Name one story moment. How does learning with another person help Small Number?',
  teacherNote: 'Preview the story and its credits. This is a contemporary authored Math Catcher story, not a traditional story attributed to local Nations. Discuss family knowledge and learning through relationships without treating one story as representing all First Peoples. Use original plain-paper diagrams, not copied rug designs or invented cultural meanings. The ramp question can remain an inquiry; no unsupported ramp-physics answer is required. If offline, use the credited brief paraphrase for a preliminary discussion, then return to the original story when available. This is one specific connection; further local connections need appropriate community sources and guidance.'
};

const factRoutines = [
  {title:'Use a known fact',model:'6 × 7 can be 5 × 7 + 7 = 35 + 7 = 42. The same fact tells us 42 ÷ 7 = 6.',task:'Work out 6 × 8 using a known fact. Draw equal groups or an array if helpful. Explain, then give two related division facts.',check:'Find 7 × 6 and 42 ÷ 6. Explain the connection.',answer:'42 and 7. Practice: 48; 48 ÷ 6 = 8 and 48 ÷ 8 = 6.'},
  {title:'Double a helpful fact',model:'If 4 × 7 = 28, then 8 × 7 = 56 because the number of equal groups doubles.',task:'Use 4 × 6 to find 8 × 6. Explain with an array, then solve 48 ÷ 8.',check:'Use doubling to find 8 × 9, then solve 72 ÷ 9.',answer:'72 and 8. Practice: 24 doubles to 48; 48 ÷ 8 = 6.'},
  {title:'Use ten groups, then adjust',model:'9 × 6 = 10 × 6 − 6 = 60 − 6 = 54. We remove one whole group of six.',task:'Find 9 × 7 from ten groups. Explain why subtracting just one would not work. Check with division.',check:'Find 9 × 8 and 72 ÷ 8.',answer:'72 and 9. Practice: 70 − 7 = 63; 63 ÷ 7 = 9.'},
  {title:'Link multiplication and division',model:'7 × 8 = 56 gives 56 ÷ 7 = 8 and 56 ÷ 8 = 7. Multiplication joins equal groups; division can find their size or number.',task:'Draw or explain the fact family for 6, 9 and 54. Ask a partner which number is missing in 54 ÷ __ = 6.',check:'Find the missing number: 8 × __ = 64. Give a matching division fact.',answer:'8; 64 ÷ 8 = 8. Practice: 6 × 9 = 54, 9 × 6 = 54, 54 ÷ 6 = 9, 54 ÷ 9 = 6; missing number 9.'}
];
export function mathFactRoutineFor(weekOf:string): MathPacingLesson {
  const elapsed=Math.round((Date.parse(`${weekOf}T00:00:00Z`)-Date.parse('2026-09-21T00:00:00Z'))/604800000);
  const routine=factRoutines[((elapsed%factRoutines.length)+factRoutines.length)%factRoutines.length];
  return {id:`fluency-${weekOf}`,unit:'operations',packId:'operations-fluency-pack',experienceId:'strategy-league',...routine};
}
export const mathFluencyTeachingNote='Use a 3–5 minute strategy routine two or three times in a typical week; in a lighter week keep one brief opportunity when practical. Revisit until students can explain and use the fact. Allow arrays or a chart, then invite recall. No speed ranking, compulsory upload or catch-up debt.';
