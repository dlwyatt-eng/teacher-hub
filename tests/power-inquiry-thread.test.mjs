import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

async function importIsolatedTs(relativePath) {
  const [{ default: ts }, source] = await Promise.all([import("typescript"), read(relativePath)]);
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
    fileName: relativePath,
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}

test("the reusable Power Check keeps all seven Grade 6 questions in their intended order", async () => {
  const data = await importIsolatedTs("app/power-inquiry-data.ts");

  assert.deepEqual([...data.powerCheckQuestions], [
    "Who has power?",
    "Who gets heard?",
    "Who gains?",
    "Who gives something up?",
    "Who or what is missing?",
    "Who controls the story?",
    "What could make it fairer?",
  ]);
  assert.equal(new Set(data.powerCheckQuestions).size, 7, "Power Check prompts must not repeat.");
});

test("the recurring inquiry uses four distinct lenses and keeps both anchor questions", async () => {
  const data = await importIsolatedTs("app/power-inquiry-data.ts");

  assert.equal(
    data.powerInquiry.recurringQuestion,
    "How much power do ordinary people have over the decisions that shape their lives?",
  );
  assert.equal(
    data.powerInquiry.culminatingQuestion,
    "What does it mean for people to truly govern themselves?",
  );
  assert.equal(
    data.powerInquiry.keyUnderstanding,
    "Information does not have to be false to shape how we understand reality.",
  );
  assert.deepEqual(
    data.powerLenses.map(({ id, label }) => ({ id, label })),
    [
      { id: "political", label: "Political power" },
      { id: "economic", label: "Economic power" },
      { id: "information", label: "Information power" },
      { id: "relational", label: "Relationships & responsibilities" },
    ],
  );
  assert.ok(data.powerLenses.every((lens) => lens.question && lens.clues.length === 4), "Every lens needs one launch question and four visible clues.");
});

test("the same-event investigation keeps eight non-ranked source roles", async () => {
  const [data, component] = await Promise.all([
    importIsolatedTs("app/power-inquiry-data.ts"),
    read("app/power-inquiry.tsx"),
  ]);

  assert.deepEqual(data.heronSources.map((source) => source.role), [
    "Public broadcaster",
    "Wealthy-owner newspaper",
    "Worker and community co-op",
    "Government communication",
    "Company public relations",
    "Activist organization",
    "Independent journalist",
    "Social-media creator",
  ]);
  assert.equal(new Set(data.heronSources.map((source) => source.id)).size, 8, "Every source frame needs a unique route.");
  for (const source of data.heronSources) {
    for (const field of ["funding", "headline", "account", "centres", "skips", "imageChoice", "wants"]) {
      assert.ok(source[field]?.trim(), `${source.id} is missing ${field}.`);
    }
  }
  assert.match(component, /Do not rank source types from “good” to “bad\.”/);
  assert.match(component, /what each source is useful for, what it cannot prove alone, and what another source must check/i);
});

test("oligarchy stays a cross-system concentrated-power overlay instead of a country label", async () => {
  const [data, component, social] = await Promise.all([
    importIsolatedTs("app/power-inquiry-data.ts"),
    read("app/power-inquiry.tsx"),
    read("app/social-studies-program.tsx"),
  ]);

  const oligarchy = data.powerTerms.find(({ term }) => term === "Oligarchy");
  assert.equal(oligarchy?.meaning, "A system or situation in which a small group holds much more power than most people.");
  assert.match(component, /It is not a fourth classroom model or a verdict about a whole country\./);
  assert.match(component, /Place this question over any system:/);
  assert.match(component, /money or resource ownership/);
  assert.match(component, /media or information control/);
  assert.match(component, /access to leaders/);
  assert.match(component, /control of institutions/);
  assert.ok((social.match(/<ConcentratedPowerOverlay\s*\/>/g) ?? []).length >= 1, "The Social Studies pathway must actually use the overlay.");
});

test("Design a Fair Society requires ownership, voice, ecology, safeguards, and trade-offs", async () => {
  const [data, component, social] = await Promise.all([
    importIsolatedTs("app/power-inquiry-data.ts"),
    read("app/power-inquiry.tsx"),
    read("app/social-studies-program.tsx"),
  ]);
  const decisions = data.fairSocietyDecisions.join(" ");

  assert.equal(data.fairSocietyDecisions.length, 7);
  for (const requirement of [
    /owns important resources/i,
    /makes decisions/i,
    /leaders be removed or challenged/i,
    /wealth shared/i,
    /cannot be bought or sold/i,
    /controls major information sources/i,
    /minority voices and rights protected/i,
    /land, water, living beings, and future generations/i,
    /government tyranny/i,
    /domination by wealthy private interests/i,
  ]) {
    assert.match(decisions, requirement, `Missing Fair Society requirement: ${requirement}`);
  }

  assert.equal(data.fairSocietyPressureTests.length, 4, "The design needs several competing tensions, not a single ideal answer.");
  assert.match(component, /Do not design a perfect world\./);
  assert.match(component, /TRADE-OFFS ARE THE WORK/);
  assert.match(component, /Revise one rule and name the trade-off\./);
  assert.match(component, /How much power would an ordinary person have in the society you created\?/);
  assert.match(component, /powerInquiry\.culminatingQuestion/);
  assert.ok((social.match(/<FairSocietyStudio/g) ?? []).length >= 1, "The culminating Social Studies pathway must render the Fair Society studio.");
});
