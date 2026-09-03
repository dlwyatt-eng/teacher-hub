import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { importIsolatedTsFile } from "./helpers/import-isolated-ts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

test("Math, ELA, Career, and PHE all resolve to reviewed classroom-valid contracts", async () => {
  const [core, integrated, contracts] = await Promise.all([
    importIsolatedTsFile(root, "app/core-programs.ts"),
    importIsolatedTsFile(root, "app/integrated-programs.ts"),
    importIsolatedTsFile(root, "app/student-lesson-contract.ts"),
  ]);
  const programs = [core.mathematicsProgram, core.languageArtsProgram, integrated.careerProgram, integrated.pheProgram];
  assert.deepEqual(programs.map((program) => [program.subject, program.experiences.length]), [
    ["Mathematics", 15],
    ["English Language Arts", 14],
    ["Career Education", 6],
    ["Physical & Health Education", 6],
  ]);

  for (const program of programs) {
    for (const experience of program.experiences) {
      const contract = contracts.resolveStudentLessonContractForExperience(experience);
      assert.equal(contract.reviewState, "reviewed", `${experience.id} still uses generic student directions.`);
      assert.deepEqual(contracts.validateStudentLessonContract(contract), { valid: true, issues: [] }, `${experience.id} has invalid student copy.`);
      assert.ok(contract.steps.length >= 4, `${experience.id} needs at least four usable teaching steps.`);
      assert.ok(contract.finishEvidence.length >= 3, `${experience.id} needs visible finish evidence.`);
    }
  }
});

test("activity-specific examples cover the priority tasks and preserve a next improvement", async () => {
  const models = await importIsolatedTsFile(root, "app/proficiency-models.ts");
  const requiredActivityIds = [
    "magnitude-gallery", "graph-story-lab", "zoo-design-studio",
    "semiahmoo-story-source-lab", "character-council", "bloxels-story-blueprint",
    "learning-user-manual", "digital-identity-forensics", "project-rescue-studio", "career-constellation",
    "everyone-in-game", "strategy-remix-league", "rhythm-movement-lab", "trusted-health-studio", "safety-help-circuit", "effort-meter-trail",
  ];
  for (const id of requiredActivityIds) {
    const sets = models.proficiencyModelSetsForActivity(id);
    assert.ok(sets.length > 0, `${id} needs an activity-specific example set.`);
    assert.ok(sets.some((set) => set.models.every((model) => model.nextImprovement.trim())), `${id} examples need visible next improvements.`);
  }
});

test("the first Math lesson teaches the idea before the lab and starts on the widest decimal line", async () => {
  const [program, lab] = await Promise.all([
    read("app/learning-program.tsx"),
    read("app/math-number-scale-lab.tsx"),
  ]);
  const interactiveStart = program.indexOf("if (usesInteractiveLab)");
  const learnPart = program.indexOf('parts.push({ label: "Learn"', interactiveStart);
  const explorePart = program.indexOf('parts.push({ label: "Explore"', interactiveStart);
  assert.ok(interactiveStart >= 0 && learnPart > interactiveStart && explorePart > learnPart, "Magnitude Gallery must show Learn before Explore.");
  assert.match(lab, /views: \[\s*\{ id: "decimal-1", max: 1, label: "0 → 1"/);
  assert.match(lab, /useState<string \| null>\("decimal-8"\)/);
  assert.doesNotMatch(lab, /type="range"/);
});

test("projector layout reserves separate rows for route, content, and controls", async () => {
  const css = await read("app/learning-program.css");
  assert.match(css, /grid-template-rows:auto minmax\(0,1fr\) auto/);
  assert.match(css, /projector-shell \.projector-lesson-player__stage\{min-height:0;overflow-y:auto/);
  assert.match(css, /projector-clarity-strip article:not\(\[data-current="true"\]\)\{display:none\}/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
