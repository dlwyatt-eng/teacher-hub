import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => readFile(path.join(root, file), "utf8");
const mathIds = [
  "magnitude-gallery", "strategy-league", "pack-and-sync", "scoreboard-rules", "fraction-ratio-remix",
  "decimal-dispatch", "sale-lab", "pattern-forecast", "equation-balance", "graph-story-lab",
  "probability-game-audit", "geometry-field-lab", "zoo-design-studio", "transformation-cipher", "space-under-constraints",
];

test("all fifteen Mathematics experiences have paper-first kits and teacher keys", async () => {
  const support = await read("app/program-supports.ts");
  const mathKits = await read("app/math-experience-kits.ts");
  const combined = `${support}\n${mathKits}`;
  for (const id of mathIds) assert.match(combined, new RegExp(`"${id}"\\s*:`), `Missing Mathematics kit for ${id}.`);
  const keys = combined.match(/(?:ANSWER KEY|CORE ANSWERS)/g) ?? [];
  assert.ok(keys.length >= mathIds.length, `Expected at least ${mathIds.length} separately labelled Mathematics keys; found ${keys.length}.`);
});

test("all fifteen Mathematics experiences have activity-specific proficiency models", async () => {
  const base = await read("app/proficiency-models-math.ts");
  const expanded = await read("app/proficiency-models-math-expanded.ts");
  const combined = `${base}\n${expanded}`;
  for (const id of mathIds) assert.match(combined, new RegExp(`activityId(?:s)?:\\s*\\[?"${id}"`), `Missing proficiency models for ${id}.`);
  assert.match(expanded, /levels\.map/);
});

test("student printing cannot include Mathematics answer cards", async () => {
  const lesson = await read("app/learning-program.tsx");
  assert.match(lesson, /studentCards = kit\.cards\.filter/);
  assert.match(lesson, /answerCards = kit\.cards\.filter/);
  assert.match(lesson, /Print student kit/);
  assert.match(lesson, /Print answer key/);
  assert.match(lesson, /TEACHER-ONLY ANSWER KEY/);
});

test("the first scale lesson begins with the visible 0.008 comparison", async () => {
  const lab = await read("app/math-number-scale-lab.tsx");
  const program = await read("app/core-programs.ts");
  assert.match(lab, /useState<string \| null>\("decimal-008"\)/);
  assert.match(lab, /START HERE · 0\.008 ON 0 → 0\.01/);
  assert.match(program, /Start with 0\.008 on the 0-to-0\.01 line/);
  assert.match(program, /0\.8 on the 0-to-0\.1 line as an off-scale challenge/);
});

test("known mathematical wording and convention errors stay repaired", async () => {
  const scoreboard = await read("app/math-scoreboard-lab.tsx");
  const packs = await read("app/math-program-supports.ts");
  assert.match(scoreboard, /each player earns a 4-point rescue bonus/);
  assert.doesNotMatch(scoreboard, /whole team earns one 4-point rescue bonus/);
  assert.match(packs, /A rectangle is also a square: always, sometimes, or never/);
  assert.match(packs, /at least one pair of parallel sides/);
  assert.match(packs, /equilateral triangle also fits the isosceles family/);
  assert.match(packs, /from noon to 1:00/);
});

test("Math projector routes never expose empty Look tabs or replace the core mission with an extension", async () => {
  const source = await read("app/learning-program.tsx");
  for (const id of ["strategy-league", "pack-and-sync", "sale-lab", "transformation-cipher", "space-under-constraints"]) {
    assert.match(source, new RegExp(`knownEmptyLookExperienceIds[\\s\\S]*?"${id}"`), `${id} must suppress its empty Look shell until it has real media.`);
  }
  assert.match(source, /<StudentStepPath key=\{selected\.id\}/, "Every non-interactive Math lesson keeps its core student mission in Do.");
  assert.doesNotMatch(source, /!phasedCoordinateBridge && <StudentStepPath/, "The coordinate extension cannot replace the core transformation mission.");
  assert.match(source, /interactiveInfographic[\s\S]*?<ExperienceInfographic experienceId=\{selected\.id\}/, "Pattern and equation infographics must be reachable before their interactive labs.");
  assert.match(source, /const studentMathWorkshop = program\.subject === "Mathematics"[\s\S]*?<MathStudentWorkshops experienceId=\{selected\.id\}/, "Every Math route must build its student-safe core workshop.");
  assert.equal((source.match(/if \(learnStage\) parts\.push\(\{ label: "Learn"/g) ?? []).length, 2, "Interactive and non-interactive routes must both place core workshops in Learn.");
  assert.doesNotMatch(source, /!phasedCoordinateBridge && <MathStudentWorkshops/, "Default workshops must not be delayed until the Do part.");
  assert.match(source, /phasedCoordinateBridge[\s\S]*?<MathStudentWorkshops experienceId=\{selected\.id\} placement="extension"/, "The optional coordinate bridge must stay after the core mission.");
});

test("the transformation model uses panel-aligned grid origins", async () => {
  const program = await read("app/math-program.tsx");
  const css = await read("app/math-program.css");
  assert.match(program, /id=\{`transformation-grid-\$\{index\}`\} x=\{x\} y="74" width="18" height="18"/);
  for (const index of [0, 1, 2]) assert.match(css, new RegExp(`transformation-grid-panel-${index}\\{fill:url\\(#transformation-grid-${index}\\)\\}`));
});

test("thin Grade 6 content requirements are represented in core kits", async () => {
  const kits = await read("app/math-experience-kits.ts");
  for (const pattern of [/DECREASING/, /Horizontal axis = stage number/, /PART TO PART \/ PART TO WHOLE/, /MISSING WHOLE/, /MISSING PERCENT/, /reflex/i, /POLYGON TURN/, /two transformations in sequence/i, /Exact 8 m × 6 m site brief/]) {
    assert.match(kits, pattern);
  }
  const core = await read("app/core-programs.ts");
  const requiredScoreboard = core.match(/id: "scoreboard-rules"[\s\S]*?spacesPrompt:/)?.[0] ?? "";
  const requiredSteps = requiredScoreboard.match(/steps:\s*\[([\s\S]*?)\],\s*product:/)?.[1] ?? "";
  assert.doesNotMatch(requiredSteps, /[Ee]xponents/);
  assert.match(requiredScoreboard, /Use exponents only as an optional extension/);
});
