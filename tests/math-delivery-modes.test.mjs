import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { importIsolatedTsFile } from "./helpers/import-isolated-ts.mjs";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => readFile(path.join(root, file), "utf8");

const expectedExperienceIds = [
  "magnitude-gallery", "strategy-league", "pack-and-sync", "scoreboard-rules", "fraction-ratio-remix",
  "decimal-dispatch", "sale-lab", "pattern-forecast", "equation-balance", "graph-story-lab",
  "probability-game-audit", "geometry-field-lab", "zoo-design-studio", "transformation-cipher", "space-under-constraints",
];
const expectedModeIds = ["math-antics-supported", "hybrid", "teacher-led-replacement"];

function assertText(value, message) {
  assert.equal(typeof value, "string", message);
  assert.ok(value.trim().length > 0, message);
}

test("all fifteen major Mathematics experiences have complete three-mode plans", async () => {
  const { grade6MathExperienceIds, mathExperienceModePlans } = await importIsolatedTsFile(root, "app/math-delivery-modes.ts");
  assert.deepEqual([...grade6MathExperienceIds], expectedExperienceIds);
  assert.equal(mathExperienceModePlans.length, expectedExperienceIds.length);
  assert.deepEqual(mathExperienceModePlans.map((plan) => plan.experienceId), expectedExperienceIds);

  for (const plan of mathExperienceModePlans) {
    assert.ok(plan.curriculum.length > 0, `${plan.experienceId}: curriculum coverage is required.`);
    assert.ok(plan.conceptPackIds.length > 0, `${plan.experienceId}: at least one concept pack is required.`);
    for (const field of ["clipFocus", "explanation", "visualModel", "workedExample", "guidedPractice", "teacherAnswers", "collaborativeTask", "authenticApplication", "independentCheck", "printableSupport", "offlineFallback", "spacesEvidence"]) {
      assertText(plan[field], `${plan.experienceId}: ${field} must be explicit.`);
    }
    assert.ok(plan.misconceptionMoves.length >= 2, `${plan.experienceId}: include at least two misconception/corrective moves.`);
    for (const item of plan.misconceptionMoves) {
      assertText(item.misconception, `${plan.experienceId}: misconception text is required.`);
      assertText(item.correctiveMove, `${plan.experienceId}: corrective move is required.`);
    }
    for (const level of ["support", "core", "extension"]) assertText(plan.differentiation[level], `${plan.experienceId}: ${level} differentiation is required.`);
    assert.deepEqual(Object.keys(plan.modes), expectedModeIds, `${plan.experienceId}: all three delivery modes must be present in order.`);
    for (const modeId of expectedModeIds) {
      const mode = plan.modes[modeId];
      assert.equal(mode.id, modeId);
      assertText(mode.label, `${plan.experienceId}/${modeId}: label is required.`);
      assertText(mode.bestWhen, `${plan.experienceId}/${modeId}: decision guidance is required.`);
      assert.equal(mode.steps.length, 4, `${plan.experienceId}/${modeId}: the route must have four explicit steps.`);
      mode.steps.forEach((step, index) => assertText(step, `${plan.experienceId}/${modeId}: step ${index + 1} is required.`));
    }
    assert.match(plan.mathUpUse, /Optional after formative evidence/);
    assert.match(plan.mathUpUse, /MathUP is not the lesson spine/);
  }
});

test("every delivery plan points to real, correctly anchored concept teaching", async () => {
  const { mathExperienceModePlans } = await importIsolatedTsFile(root, "app/math-delivery-modes.ts");
  const { mathSupportPacks } = await importIsolatedTsFile(root, "app/math-program-supports.ts");
  const packById = new Map(mathSupportPacks.map((pack) => [pack.id, pack]));

  for (const plan of mathExperienceModePlans) {
    for (const packId of plan.conceptPackIds) {
      const pack = packById.get(packId);
      assert.ok(pack, `${plan.experienceId}: missing concept pack ${packId}.`);
      assert.ok(pack.anchorIds.includes(plan.experienceId), `${packId} must be anchored to ${plan.experienceId}.`);
    }
  }
});

test("the five depth packs meet the full teach-model-practise-check contract", async () => {
  const { mathCoreDepthPacks } = await importIsolatedTsFile(root, "app/math-core-depth-packs.ts");
  const expectedPackIds = [
    "magnitude-place-value-pack",
    "factors-multiples-pack",
    "pattern-relations-pack",
    "one-step-equations-pack",
    "first-quadrant-transformations-pack",
  ];
  assert.deepEqual(mathCoreDepthPacks.map((pack) => pack.id), expectedPackIds);

  for (const pack of mathCoreDepthPacks) {
    assert.equal(pack.role, "BC CORE", `${pack.id}: these are core lessons, not optional extensions.`);
    for (const field of ["prerequisite", "learningGoal", "whyBefore", "supportRoute", "extensionRoute", "spaces"]) assertText(pack[field], `${pack.id}: ${field} is required.`);
    for (const field of ["background", "teacherMoves", "studentMoves", "supplied", "gather", "vocabulary", "likelyMisconceptions"]) assert.ok(pack[field].length > 0, `${pack.id}: ${field} must be populated.`);
    assertText(pack.model.label, `${pack.id}: model label is required.`);
    assertText(pack.model.prompt, `${pack.id}: model prompt is required.`);
    assertText(pack.model.conclusion, `${pack.id}: model conclusion is required.`);
    assert.ok(pack.model.steps.length >= 4, `${pack.id}: model needs at least four explicit steps.`);
    assert.ok(pack.partnerCards.length >= 4, `${pack.id}: guided practice needs at least four cards.`);
    for (const card of pack.partnerCards) assertText(card.answer, `${pack.id}/${card.title}: teacher answer is required.`);
    assert.ok(pack.check.length >= 3, `${pack.id}: independent check needs at least three items.`);
    for (const item of pack.check) assertText(item.answer, `${pack.id}/${item.prompt}: check answer is required.`);
  }
});

test("patterns include increasing and decreasing relations across representations", async () => {
  const source = await read("app/math-core-depth-packs.ts");
  const patternPack = source.match(/id: "pattern-relations-pack"[\s\S]*?\n  \},\n  \{\n    id: "one-step-equations-pack"/)?.[0] ?? "";
  assert.match(patternPack, /increasing/i);
  assert.match(patternPack, /decreasing/i);
  assert.match(patternPack, /4n\+3/);
  assert.match(patternPack, /42−5\(n−1\)/);
  for (const representation of ["model", "table", "graph", "expression", "context"]) assert.match(patternPack, new RegExp(representation, "i"));
});

test("first-quadrant core comes before the separately labelled optional bridge", async () => {
  const { mathPacksFor } = await importIsolatedTsFile(root, "app/math-program-supports.ts");
  const packs = mathPacksFor("transformation-cipher");
  assert.equal(packs[0].id, "first-quadrant-transformations-pack");
  assert.equal(packs[0].role, "BC CORE");
  assert.match(`${packs[0].learningGoal} ${packs[0].whyBefore}`, /first quadrant/i);
  assert.equal(packs.at(-1).id, "integer-number-line-pack");
  assert.equal(packs.at(-1).role, "MATHUP / WNCP BRIDGE");
  assert.match(`${packs.at(-1).whyBefore} ${packs.at(-1).extensionRoute}`, /optional|bridge/i);
});

test("the teacher UI exposes mode choice and the five depth packs have specific visuals", async () => {
  const program = await read("app/math-program.tsx");
  const panel = await read("app/math-delivery-mode-panel.tsx");
  assert.match(program, /<MathDeliveryModePanel experienceId=\{experienceId\}/);
  assert.match(program, /pack\.role === "MATHUP \/ WNCP BRIDGE"/);
  assert.match(program, /teach directly from this Hub model/);
  assert.match(panel, /Object\.values\(plan\.modes\)/);
  assert.match(panel, /aria-pressed=\{selectedMode === item\.id\}/);
  assert.match(panel, /setSelectedMode\(item\.id\)/);
  for (const packId of ["magnitude-place-value-pack", "factors-multiples-pack", "pattern-relations-pack", "one-step-equations-pack", "first-quadrant-transformations-pack"]) {
    assert.match(program, new RegExp(`pack\\.id === "${packId}"`), `${packId} needs a specific, non-generic visual.`);
  }
});
