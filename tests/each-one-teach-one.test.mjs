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

async function importIntegratedPrograms() {
  const [{ default: ts }, crossCurricular, integrated] = await Promise.all([
    import("typescript"),
    read("app/cross-curricular-program.ts"),
    read("app/integrated-programs.ts"),
  ]);
  const compilerOptions = { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 };
  const crossCompiled = ts.transpileModule(crossCurricular, {
    compilerOptions,
    fileName: "cross-curricular-program.ts",
  }).outputText;
  const crossUrl = `data:text/javascript;base64,${Buffer.from(crossCompiled).toString("base64")}`;
  const linkedSource = integrated.replace(
    'from "./cross-curricular-program";',
    `from "${crossUrl}";`,
  );
  const compiled = ts.transpileModule(linkedSource, {
    compilerOptions,
    fileName: "integrated-programs.ts",
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}

test("Each One, Teach One stays a complete, equivalent-choice ADST pathway", async () => {
  const [{ adstProgram }, contracts] = await Promise.all([
    importIntegratedPrograms(),
    importIsolatedTs("app/student-lesson-contract.ts"),
  ]);
  const arc = adstProgram.arcs.find((item) => item.id === "adst-code");
  const experience = adstProgram.experiences.find((item) => item.id === "each-one-teach-one");
  const contract = contracts.resolveStudentLessonContract("each-one-teach-one");

  assert.ok(arc?.experienceIds.includes("each-one-teach-one"), "The May–June ADST arc lost the pathway.");
  assert.ok(experience, "The Each One, Teach One experience is missing.");
  assert.equal(experience.steps.length, 8, "The research-to-reflection sequence must keep all eight phases.");
  assert.equal(contract.reviewState, "reviewed");
  assert.deepEqual(contracts.validateStudentLessonContract(contract), { valid: true, issues: [] });
  assert.equal(contract.steps.length, 8, "The student route must keep all eight teachable phases.");
  assert.ok(contract.steps.every((step) => step.minutes), "Every student phase needs a realistic timing cue.");

  const routeLabels = contract.choices[0].options.map((option) => option.label);
  assert.deepEqual(routeLabels, ["Physical / no tech", "Paper branching", "Bloxels", "Minecraft", "Private app / site prototype"]);
  assert.deepEqual(contract.choices[1].options.map((option) => option.label), ["No AI", "Teacher model", "Approved support"]);

  const text = contracts.studentContractText(contract);
  assert.match(text, /at least two teacher-approved sources/i);
  assert.match(text, /Draw the whole path on paper[\s\S]*go back if they get stuck/i);
  assert.match(text, /Wi-Fi, devices, accounts, or AI are unavailable/i);
  assert.match(text, /Never record their name, account, image, or a personal comment/i);
  assert.match(text, /One change to what you teach, plus one change that helps people take part, find their way, or use feedback/i);
  assert.match(text, /add-to-existing-post|existing SpacesEDU post/i);
  assert.match(text, /no raw AI output|raw AI output/i);
  assert.doesNotMatch(text, /public publishing[^.]*required/i);
});

test("the projector opening remains concise, valid, and instructionally complete", async () => {
  const supports = await importIsolatedTs("app/projector-lesson-supports.ts");
  const support = supports.projectorLessonSupports["each-one-teach-one"];

  assert.ok(support, "The custom projector support is missing.");
  assert.deepEqual(supports.validateProjectorLessonSupport(support), []);
  assert.equal(support.screenOnly, true);
  assert.equal(support.background.length, 4);
  assert.equal(support.terms.length, 5);
  assert.equal(support.example.steps.length, 5);
  assert.equal(support.checks.length, 2);
  assert.match(supports.projectorSupportText(support), /physical station.*paper branch.*Bloxels.*Minecraft.*private app\/site/i);
  assert.match(supports.projectorSupportText(support), /new learner|learner test/i);
  assert.match(supports.projectorSupportText(support), /revision|revise/i);
});

test("every ADST pathway resolves to a relevant worked-example set", async () => {
  const models = await importIsolatedTs("app/proficiency-models.ts");
  const expected = {
    "packet-rescue": "inquiry-system-explanation",
    "search-under-hood": "evidence-and-claim",
    "access-by-design": "creative-making-reflection",
    "bloxels-game-studio": "creative-making-reflection",
    "cold-test-prototype": "creative-making-reflection",
    "science-design-series": "creative-making-reflection",
    "each-one-teach-one": "creative-making-reflection",
    "cosmic-mission-control": "creative-making-reflection",
  };

  for (const [activityId, setId] of Object.entries(expected)) {
    assert.ok(
      models.proficiencyModelSetsForActivity(activityId).some((set) => set.id === setId),
      `${activityId} does not resolve to ${setId}.`,
    );
  }
});

test("the teacher quick-check exporter stores no responses and stays out of student views", async () => {
  const [builder, learningProgram, models] = await Promise.all([
    read("app/teacher-quick-check-builder.tsx"),
    read("app/learning-program.tsx"),
    read("app/proficiency-models.ts"),
  ]);
  const prototypeStart = builder.indexOf("const prototypeFeedbackText");
  const prototypeEnd = builder.indexOf("function questionLines", prototypeStart);
  const prototype = builder.slice(prototypeStart, prototypeEnd);

  assert.doesNotMatch(builder, /\bfetch\s*\(|\blocalStorage\b|\bsessionStorage\b|\bindexedDB\b|<form\b|onSubmit\s*=/i);
  for (const mode of ["Kahoot / whole class", "Forms / Copilot prompt", "Paper check", "Prototype feedback"]) {
    assert.match(builder, new RegExp(mode.replace("/", "\\/"), "i"), `Missing quick-check mode: ${mode}`);
  }
  assert.equal((prototype.match(/^\d+\./gm) ?? []).length, 6, "Prototype feedback must keep six closed-choice prompts.");
  assert.ok((prototype.match(/□/g) ?? []).length >= 25, "Prototype feedback choices are unexpectedly incomplete.");
  assert.doesNotMatch(prototype, /_{3,}|free[- ]?text|open[- ]?response/i);
  assert.match(prototype, /Do not write your name, email, class, teacher, account/i);
  assert.match(builder, /JOTFORM · OPTIONAL NO-NAME CHECK/i);
  assert.match(builder, /low-risk closed choices/i);
  assert.match(builder, /equivalent paper check/i);
  assert.match(builder, /submission IP may (?:still )?be retained/i);
  assert.match(builder, /jotform\.com\/help\/31-how-to-find-the-ip-addresses/i);
  const paperStart = builder.indexOf('if (mode === "paper")');
  const paperEnd = builder.indexOf('return `KAHOOT', paperStart);
  assert.doesNotMatch(builder.slice(paperStart, paperEnd), /TEACHER KEY/i, "The student paper output must not contain its answer key.");
  assert.match(builder, /activeMode\.id === "paper"[\s\S]*teacher-quick-check-builder__answer-key/);

  const teacherStart = learningProgram.indexOf("function TeacherExperienceDetail");
  const teacherEnd = learningProgram.indexOf("export function LearningProgramTab", teacherStart);
  const studentStart = learningProgram.indexOf("export function StudentLearningProgram");
  assert.match(learningProgram.slice(teacherStart, teacherEnd), /<TeacherQuickCheckBuilder/);
  assert.doesNotMatch(learningProgram.slice(studentStart), /<TeacherQuickCheckBuilder/);
  assert.match(learningProgram.slice(teacherStart, teacherEnd), /includePrototypeFeedback=\{experience\.id === "each-one-teach-one"\}/);
  assert.match(learningProgram.slice(teacherStart, teacherEnd), /proficiencyModelSetsForActivity\(experience\.id\)/);
  assert.match(learningProgram.slice(teacherStart, teacherEnd), /activityModelSets\.map[\s\S]*<ProficiencyModelsPanel setId=\{modelSet\.id\} audience="teacher"/);
  assert.match(learningProgram.slice(teacherStart, teacherEnd), /SpacesEDU safety check[\s\S]*names or usernames[\s\S]*raw AI output/i);
  assert.doesNotMatch(learningProgram.slice(studentStart), /<ProficiencyModelsPanel/);
  assert.match(models, /spacesEvidenceIds: \[[^\]]*"spaces-june-minecraft"[^\]]*\]/);
});

test("quick-check controls wrap for small screens and remain printable and keyboard-visible", async () => {
  const css = await read("app/teacher-quick-check-builder.css");

  assert.match(css, /\.teacher-quick-check-builder \*\{[^}]*min-width:0/);
  assert.match(css, /\.teacher-quick-check-builder__workspace>footer\{[^}]*flex-wrap:wrap/);
  assert.match(css, /\.teacher-quick-check-builder__workspace>footer button\{[^}]*min-height:44px/);
  assert.match(css, /:focus-visible\{[^}]*outline:/);
  assert.match(css, /@media\(max-width:980px\)[\s\S]*?grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:620px\)[\s\S]*?\.teacher-quick-check-builder>nav\{grid-template-columns:1fr/);
  assert.match(css, /@media print\{/);
  assert.match(css, /@media print\{[\s\S]*?teacher-quick-check-builder__answer-key[^}]*display:none!important/);
  assert.match(css, /@media\(forced-colors:active\)\{/);
  assert.doesNotMatch(css, /(?:width|inline-size|min-width):100vw/);
});
