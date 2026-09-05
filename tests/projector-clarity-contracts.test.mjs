import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { importIsolatedTsFile } from "./helpers/import-isolated-ts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

async function importIsolatedTs(relativePath) {
  return importIsolatedTsFile(root, relativePath);
}

test("every projector route keeps a visible learning, first-step, and complete finish strip", async () => {
  const source = (await read("app/learning-program.tsx")).replaceAll("&apos;", "'");
  const stripStart = source.indexOf('<section className="projector-clarity-strip"');
  const activeContent = source.indexOf("{activePart.content}", stripStart);

  assert.ok(stripStart >= 0, "The projector clarity strip is missing.");
  assert.ok(activeContent > stripStart, "The clarity strip must appear before the active lesson content.");
  assert.match(source, /aria-label="Learning goal, first action, and finish"/);
  assert.match(source, /data-learning-phase="learn"[^>]*><small>WE ARE LEARNING<\/small><strong>\{learningLine\}<\/strong>/);
  assert.match(source, /data-learning-phase="do"[^>]*><small>FIRST STEP<\/small><strong>\{studentContract\.firstAction\}<\/strong>/);
  assert.match(source, /data-learning-phase="done"[^>]*><small>WE WILL MAKE \/ SHOW<\/small><strong>\{studentFinishSummary\(selected\.id, plainForStudents\(selected\.product\)\)\}<\/strong>/);
  assert.match(source, /data-current=\{clarityPhase === "learn"\}/);
  assert.match(source, /product=\{studentFinishSummary\(selected\.id, plainForStudents\(selected\.product\)\)\}/);
});

test("every projector lesson ends with a real Done part backed by its contract", async () => {
  const source = (await read("app/learning-program.tsx")).replaceAll("&apos;", "'");
  const doneStart = source.indexOf('parts.push({ label: "Done", verb: "Check"');
  const activePart = source.indexOf("const activePart", doneStart);
  const done = source.slice(doneStart, activePart);

  assert.ok(doneStart >= 0 && activePart > doneStart, "Could not isolate the projector Done part.");
  assert.match(done, /className="projector-active-object projector-done-screen"/);
  assert.match(done, /YOU'RE DONE WHEN/);
  assert.match(done, /studentContract\.finishEvidence\.map/);
  assert.match(done, /studentContract\.saveAction\.message/);
  assert.match(done, /Show what you learned[—-]not just what you made\./);
  assert.match(done, /Never add private information or raw AI output to SpacesEDU\./);
});

test("known empty Look routes are suppressed unless real media or an authored exploration is available", async () => {
  const source = await read("app/learning-program.tsx");
  const declaration = source.match(/const knownEmptyLookExperienceIds = new Set\(\[([\s\S]*?)\]\);/);
  assert.ok(declaration, "The known-empty Look guard is missing.");
  const ids = [...declaration[1].matchAll(/"([a-z0-9-]+)"/g)].map((match) => match[1]);

  assert.deepEqual(ids, [
    "same-facts-frame",
    "rights-in-thirty",
    "cosmic-scale-gallery",
    "cold-test-prototype",
    "science-design-series",
    "cosmic-mission-control",
    "strengths-action-quest",
    "digital-identity-forensics",
    "leadership-relay",
    "strategy-remix-league",
    "strategy-league",
    "pack-and-sync",
    "sale-lab",
    "transformation-cipher",
    "space-under-constraints",
    "safety-help-circuit",
  ]);
  assert.match(source, /const hasVisibleLookMedia = program\.subject === "Arts Education"[\s\S]*?media\.some\(\(item\) => item\.type === "image"\);/);
  assert.match(source, /const showLook = hasExploration \|\| !knownEmptyLookExperienceIds\.has\(selected\.id\) \|\| hasVisibleLookMedia;/);
  assert.match(source, /if \(showLook\) parts\.push\(\{ label: "Look"/);
});

test("all ADST routes have explicit reviewed student contracts", async () => {
  const contracts = await importIsolatedTs("app/student-lesson-contract.ts");
  const ids = [
    "packet-rescue",
    "search-under-hood",
    "access-by-design",
    "bloxels-game-studio",
    "cold-test-prototype",
    "science-design-series",
    "each-one-teach-one",
    "cosmic-mission-control",
  ];

  for (const id of ids) {
    assert.ok(contracts.reviewedStudentLessonIds.includes(id), `${id} is not an explicit reviewed contract.`);
    const contract = contracts.resolveStudentLessonContract(id);
    assert.equal(contract.id, id);
    assert.equal(contract.reviewState, "reviewed");
    assert.deepEqual(contracts.validateStudentLessonContract(contract), { valid: true, issues: [] }, `${id} has incomplete or unsafe student copy.`);
    assert.ok(contract.why.trim(), `${id} needs a visible learning purpose.`);
    assert.ok(contract.firstAction.trim(), `${id} needs a clear first action.`);
    assert.ok(contract.steps.length >= 4, `${id} needs a coherent teaching sequence.`);
    assert.ok(contract.finishEvidence.length >= 4, `${id} needs concrete finish evidence.`);
  }
});

test("Each One, Teach One keeps eight authored phases but uses four purpose-written projector chunks", async () => {
  const [source, contracts] = await Promise.all([
    read("app/learning-program.tsx"),
    importIsolatedTs("app/student-lesson-contract.ts"),
  ]);
  const contract = contracts.resolveStudentLessonContract("each-one-teach-one");
  const functionStart = source.indexOf("function adstProjectorMissionSteps");
  const functionEnd = source.indexOf("function projectorCardsFor", functionStart);
  const helper = source.slice(functionStart, functionEnd);

  assert.equal(contract.steps.length, 8, "The complete student contract must preserve all eight research, design, test, and teach phases.");
  assert.ok(functionStart >= 0 && functionEnd > functionStart, "Could not isolate the ADST projector grouping helper.");
  assert.match(helper, /id !== "each-one-teach-one" \|\| steps\.length !== 8/);
  const chunks = [...helper.matchAll(/\{\s*title: "([^"]+)",\s*action: "([^"]+)",\s*show: "([^"]+)",\s*\}/g)]
    .map((match) => ({ title: match[1], action: match[2], show: match[3] }));

  assert.deepEqual(chunks.map(({ title }) => title), [
    "Choose + check facts",
    "Plan the lesson",
    "Make + test",
    "Improve + teach",
  ]);
  assert.match(chunks[0].action, /one small question[\s\S]*two sources your teacher approves/i);
  assert.match(chunks[0].action, /where each fact came from[\s\S]*cannot tell you/i);
  assert.match(chunks[0].show, /who you will teach[\s\S]*two sources/i);
  assert.match(chunks[1].action, /learn[\s\S]*three ways to check[\s\S]*every part/i);
  for (const phase of ["start", "facts", "choice", "feedback", "check learning", "ending"]) assert.ok(chunks[1].action.includes(phase));
  assert.match(chunks[1].show, /partner[\s\S]*paper plan from start to finish/i);
  assert.match(chunks[2].action, /small version of the whole lesson[\s\S]*without your help[\s\S]*Do not record names/i);
  assert.match(chunks[2].show, /one problem with what[\s\S]*one problem with using[\s\S]*feedback/i);
  assert.match(chunks[3].action, /Fix both problems[\s\S]*test[\s\S]*Teach[\s\S]*main idea, explain it, try it in a new example, and name a source or limit/i);
  assert.match(chunks[3].show, /whether your changes helped[\s\S]*sources and tools[\s\S]*improve next/i);
  assert.doesNotMatch(helper, /indexes\.map|\.join\(" Then: "\)/, "Projector chunks must be authored for the screen, not concatenated from two long contract steps.");
  assert.match(source, /program\.subject === "Applied Design, Skills & Technologies"[\s\S]*?adstProjectorMissionSteps\(selected\.id, missionSteps\)/);
});

test("ADST projector routes show materials, choices, and equal offline learning before students begin", async () => {
  const source = await read("app/learning-program.tsx");
  const readyStart = source.indexOf("function ProjectorRouteReady");
  const readyEnd = source.indexOf("export function StudentLearningProgram", readyStart);
  const ready = source.slice(readyStart, readyEnd);

  assert.ok(readyStart >= 0 && readyEnd > readyStart, "Could not isolate the ADST Ready route.");
  assert.match(ready, /<small>GET READY<\/small>/);
  assert.match(ready, /contract\.materials\.map\(\(item\) => <li key=\{item\}>\{item\}<\/li>\)/);
  assert.match(ready, /contract\.choices\.map\(\(choice\) => <article key=\{choice\.prompt\}>/);
  assert.match(ready, /choice\.options\.map\(\(option\) => <p key=\{option\.label\}>/);
  assert.match(ready, /spoken, drawn, seated, paper, shared-device, or offline route/i);
  assert.match(ready, /Digital tools are optional[\s\S]*planning, testing, evidence, and revision stay the same offline\./i);
  assert.match(source, /program\.subject === "Applied Design, Skills & Technologies"\) parts\.push\(\{ label: "Ready", verb: "Choose", content: <ProjectorRouteReady contract=\{studentContract\} \/> \}\);/);
});

test("the shared field-guide artwork enriches projector directions without becoming required content", async () => {
  const [learningCss, socialCss, artwork] = await Promise.all([
    read("app/learning-program.css"),
    read("app/social-studies.css"),
    readFile(path.join(root, "public/images/classroom-field-guide-trail-v1.png")),
  ]);

  assert.match(learningCss, /\.projector-clarity-strip[\s\S]*?url\("\/images\/classroom-field-guide-trail-v1\.png"\)/);
  assert.match(socialCss, /\.social-learn-do-done[\s\S]*?url\("\/images\/classroom-field-guide-trail-v1\.png"\)/);
  assert.match(learningCss, /@media\(forced-colors:active\)[\s\S]*?\.projector-clarity-strip\{background-image:none\}/);
  assert.match(socialCss, /@media print[\s\S]*?\.social-learn-do-done\{background:#fff;background-image:none/);
  assert.deepEqual([...artwork.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], "The field-guide asset must remain a valid PNG.");
  assert.equal(artwork[25], 6, "The field-guide asset must keep a true alpha channel rather than a fake background.");
});

test("lesson-part tabs stay readable instead of overflowing behind the projector title", async () => {
  const css = await read("app/learning-program.css");

  assert.match(
    css,
    /@media\(min-width:1101px\)\{\.projector-lesson-player__bar\{grid-template-columns:minmax\(250px,\.8fr\) minmax\(430px,1\.2fr\)\}\.projector-lesson-player__bar nav\{justify-content:flex-start\}\}/,
  );
});
