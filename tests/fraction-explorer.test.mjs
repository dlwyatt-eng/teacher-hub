import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fractionModel, countParts, FRACTION_MAX_WHOLES } from '../app/fraction-explorer-model.mjs';
test('fraction models conserve equal parts across every supported model', () => {
 for (const d of [2,3,4,5,6,8]) for(let n=0;n<=FRACTION_MAX_WHOLES*d;n++) { const m=fractionModel(n,d); assert.equal(countParts(m.whole,m.remainder,d),n); assert.ok(m.remainder>=0&&m.remainder<d); }
});
test('anchor, reverse, zero and whole-number cases', () => {
 assert.equal(fractionModel(7,4).mixed,'1 3/4'); assert.equal(countParts(2,1,3),7); assert.equal(fractionModel(11,4).mixed,'2 3/4'); assert.equal(fractionModel(8,4).mixed,'2'); assert.equal(fractionModel(0,4).mixed,'0'); assert.equal(fractionModel(3,4).mixed,'3/4');
 for(const [n,d] of [[-1,4],[17,4],[2,0],[2.5,4]]) assert.throws(()=>fractionModel(n,d),RangeError);
});
test('teacher and projector route include explorer; printable has actual equal strips',()=>{
 const source=readFileSync('app/learning-program.tsx','utf8'); assert.match(source,/<FractionExplorer teacher/); assert.match(source,/<FractionExplorer startPresented \/>/);
 const paper=readFileSync('public/printables/fraction-explorer-paper.html','utf8'); assert.match(paper,/seven quarters/); assert.match(paper,/Work backwards/); assert.match(paper,/11\/4 and 8\/4/); assert.equal((paper.match(/<div class="strip/g)||[]).length,7);
});

test('actual rendered explorer starts with a question and hides equation reveal', async()=>{
 const { moduleLoader } = await import('./helpers/load-rendered-module.mjs');
 const React = await import('react'); const {renderToStaticMarkup}=await import('react-dom/server');
 const load=moduleLoader(process.cwd()); const Explorer=load('app/fraction-explorer.tsx').default;
 const html=renderToStaticMarkup(React.createElement(Explorer));
 assert.equal((html.match(/class="fraction-explorer__strip-row"/g)||[]).length, 4); assert.match(html,/Pieces/); assert.match(html,/Build seven quarters/); assert.match(html,/aria-expanded="false"/); assert.doesNotMatch(html,/7\/4 = 1 3\/4/); assert.match(html,/printables\/fraction-explorer-paper.html/);
});

test('fraction student route opens the discovery explorer before explanatory workshop', async()=>{
 const { moduleLoader }=await import('./helpers/load-rendered-module.mjs'); const React=await import('react'); const {renderToStaticMarkup}=await import('react-dom/server');
 const blank=()=>null; const load=moduleLoader(process.cwd(),{'next/image':blank,'./classroom-companions':{ClassroomCompanion:blank,CompanionMark:blank},'./ttoc-day-plan':{AddToDayPlanButton:blank}});
 const {mathematicsProgram}=load('app/core-programs.ts'); const {curriculum}=load('app/curriculum.ts'); const {StudentLearningProgram}=load('app/learning-program.tsx');
 const html=renderToStaticMarkup(React.createElement(StudentLearningProgram,{program:mathematicsProgram,record:curriculum.Mathematics,selectedExperienceId:'fraction-ratio-remix',onExperience(){}}));
 assert.match(html,/fraction-explorer__hero/); assert.match(html,/Build seven quarters/); assert.match(html,/Regroup into wholes/);
});

// Monday's practice includes quantities between three and four wholes.
test('Monday practice examples and four-whole boundary are buildable', () => {
 assert.equal(fractionModel(11,3).mixed, '3 2/3');
 assert.equal(countParts(3,2,5),17);
 assert.equal(fractionModel(17,5).mixed, '3 2/5');
 for(const d of [2,3,4,5,6,8]) { assert.equal(fractionModel(4*d,d).mixed,'4'); assert.throws(()=>fractionModel(4*d+1,d),RangeError); }
 const source=readFileSync('app/fraction-explorer.tsx','utf8');
 assert.match(source,/length: FRACTION_MAX_WHOLES/);
 assert.match(source,/numerator === denominator \* FRACTION_MAX_WHOLES/);
 assert.match(source,/FOUR EQUAL WHOLES/);
 assert.match(source,/across four equal whole strips/);
});
