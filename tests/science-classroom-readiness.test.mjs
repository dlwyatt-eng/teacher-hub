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

const expectedLessonIds = [
  "science-launch",
  "signal-case",
  "balance-case",
  "systems-jigsaw",
  "life-systems-studio",
  "body-case-conference",
  "mixture-mystery",
  "mixture-toolkit",
  "separation-rescue",
  "water-treatment-case",
  "place-mixtures-studio",
  "force-sprint",
  "force-patterns-lab",
  "crash-lab",
  "movement-forces",
  "safer-impact-studio",
  "cosmic-zoom",
  "space-motion-lab",
  "cosmic-exhibit-studio",
];

const expectedOfflinePackIds = [
  "science-launch",
  "signal-case",
  "balance-case",
  "systems-jigsaw",
  "life-systems-studio",
  "body-case-conference",
  "mixture-mystery",
  "mixture-toolkit",
  "separation-rescue",
  "water-treatment-case",
  "place-mixtures-studio",
  "cosmic-zoom",
  "space-motion-lab",
  "cosmic-exhibit-studio",
];

const expectedForcePrintIds = [
  "force-sprint",
  "force-patterns-lab",
  "crash-lab",
  "movement-forces",
  "safer-impact-studio",
];

function resourcesFor(lessons) {
  return lessons.flatMap((lesson) => (lesson.lessonResources ?? []).map((resource) => ({ lessonId: lesson.id, ...resource })));
}

function resourceAt(resources, url) {
  const resource = resources.find((item) => item.url === url);
  assert.ok(resource, `Missing canonical Science resource: ${url}`);
  return resource;
}

function minuteRange(value) {
  const match = /^(\d+)(?:–(\d+))? min$/.exec(value);
  assert.ok(match, `Unrecognized scene timing: ${value}`);
  return [Number(match[1]), Number(match[2] ?? match[1])];
}

function lessonMinuteRange(value) {
  const match = /^(?:(\d+)(?:–(\d+))? × )?(\d+)(?:–(\d+))? min$/.exec(value);
  assert.ok(match, `Unrecognized lesson duration: ${value}`);
  const blockMin = Number(match[1] ?? 1);
  const blockMax = Number(match[2] ?? match[1] ?? 1);
  const minutesMin = Number(match[3]);
  const minutesMax = Number(match[4] ?? match[3]);
  return [blockMin * minutesMin, blockMax * minutesMax];
}

test("all 19 Science lessons carry classroom-ready curriculum, evidence, and offline contracts", async () => {
  const [{ scienceLessons, scienceUnits }, { curriculum }] = await Promise.all([
    importIsolatedTs("app/science-program.ts"),
    importIsolatedTs("app/curriculum.ts"),
  ]);
  const officialCompetencies = new Set(curriculum.Science.competencies.flatMap((group) => group.items));

  assert.equal(scienceUnits.length, 4, "Science must retain its four established units.");
  assert.deepEqual(scienceLessons.map((lesson) => lesson.id), expectedLessonIds);

  for (const lesson of scienceLessons) {
    assert.equal(lesson.auditStatus, "classroom-ready", `${lesson.id} is not explicitly classroom-ready.`);
    assert.ok(["Practice", "Checkpoint", "Portfolio Highlight"].includes(lesson.evidenceLevel), `${lesson.id} has no valid evidence level.`);
    assert.ok(lesson.evidence?.trim().length >= 35, `${lesson.id} needs a concrete evidence product.`);

    assert.ok(lesson.curriculumFocus, `${lesson.id} has no explicit curriculum focus.`);
    assert.ok(lesson.curriculumFocus.whyThisFits.trim().length >= 70, `${lesson.id} needs a useful curriculum-fit explanation.`);
    assert.ok(lesson.curriculumFocus.competencies.length >= 3, `${lesson.id} needs several purposeful curricular competencies.`);
    for (const competency of lesson.curriculumFocus.competencies) {
      assert.ok(officialCompetencies.has(competency), `${lesson.id} paraphrases or invents a B.C. competency: ${competency}`);
    }

    assert.ok(lesson.teacherPrep, `${lesson.id} has no teacher preparation contract.`);
    assert.ok(lesson.teacherPrep.beforeClass.length > 0, `${lesson.id} has no before-class preparation.`);
    assert.ok(lesson.teacherPrep.answerKey?.length > 0, `${lesson.id} has no teacher key.`);
    assert.ok(lesson.teacherPrep.offlineRoute?.trim().length >= 80, `${lesson.id} has no complete no-internet/device route.`);
    assert.ok(lesson.materials.length > 0, `${lesson.id} has no materials list.`);
    assert.ok(lesson.scenes.length >= 3 && lesson.scenes.length <= 5, `${lesson.id} has an implausible number of lesson parts.`);
    assert.ok(lesson.scenes.every((scene) => scene.teacherCue && scene.studentTask && scene.time), `${lesson.id} has a scene without timing, teacher move, or finish evidence.`);
  }
});

test("14 complete offline packs and five force print routes cover every Science lesson exactly once", async () => {
  const [{ scienceLessons }, { scienceOfflinePacks }, inquiry] = await Promise.all([
    importIsolatedTs("app/science-program.ts"),
    importIsolatedTs("app/science-offline-packs.ts"),
    read("app/inquiry-experience.tsx"),
  ]);

  assert.deepEqual(Object.keys(scienceOfflinePacks), expectedOfflinePackIds);
  for (const [id, pack] of Object.entries(scienceOfflinePacks)) {
    assert.ok(pack.title.trim().length >= 20, `${id} offline pack has no useful title.`);
    assert.ok(pack.directions.trim().length >= 80, `${id} offline pack directions are too thin.`);
    assert.ok(pack.sections.length >= 3, `${id} offline pack needs at least three complete sections.`);
    for (const section of pack.sections) {
      assert.match(section.heading, /^\d+\s*·/, `${id} has an unsequenced offline section: ${section.heading}`);
      assert.ok(section.prompts.length >= 3, `${id} / ${section.heading} needs at least three usable prompts or evidence items.`);
      assert.ok(section.prompts.every((prompt) => prompt.trim().length >= 35), `${id} / ${section.heading} contains placeholder-like copy.`);
    }
  }

  const printStart = inquiry.indexOf("const sciencePrintContent:");
  const printEnd = inquiry.indexOf("\n};\n\nfunction sciencePromptClassName", printStart);
  assert.ok(printStart >= 0 && printEnd > printStart, "Could not isolate the five purpose-built force print routes.");
  const printBlock = inquiry.slice(printStart, printEnd);
  const forcePrintIds = [...printBlock.matchAll(/^  "([a-z0-9-]+)":\s*\{/gm)].map((match) => match[1]);
  assert.deepEqual(forcePrintIds, expectedForcePrintIds);
  assert.match(inquiry, /sciencePrintContent\[lesson\.id\]\s*\?\?\s*scienceOfflinePacks\[lesson\.id\]/, "Science print routing no longer prefers the five force packs and then the 14 complete offline packs.");

  const covered = [...Object.keys(scienceOfflinePacks), ...forcePrintIds].sort();
  assert.deepEqual(covered, scienceLessons.map((lesson) => lesson.id).sort(), "Offline/print packs must cover all 19 lessons with no missing or duplicate route.");
});

test("Science resources retain canonical URLs and teacher-only safety boundaries", async () => {
  const [{ scienceLessons }, program, inquiry] = await Promise.all([
    importIsolatedTs("app/science-program.ts"),
    read("app/science-program.ts"),
    read("app/inquiry-experience.tsx"),
  ]);
  const resources = resourcesFor(scienceLessons);

  const exactUrls = [
    "https://www.youtube.com/watch?v=jA0PzblYPUM",
    "https://phet.colorado.edu/en/simulations/sugar-and-salt-solutions",
    "https://www.surrey.ca/services-payments/water-drainage-sewer/water/water-quality",
    "https://moa.ubc.ca/2020/07/knowledge-keepers-a-moa-original-video-series/",
    "https://science.nasa.gov/universe/overview/",
    "https://www.fnesc.ca/wp/wp-content/uploads/2020/11/4-1-BLM-Science-5-9.pdf",
    "https://www.fnesc.ca/wp/wp-content/uploads/2020/11/4-2-BLM-Science-5-9.pdf",
    "https://www.fnesc.ca/wp/wp-content/uploads/2020/11/4-3-BLM-Science-5-9.pdf",
  ];
  for (const url of exactUrls) resourceAt(resources, url);

  assert.doesNotMatch(program, /https:\/\/youtu\.be\//, "The unstable YouTube short link returned.");
  assert.doesNotMatch(program, /phet\.colorado\.edu\/en\/simulation\/sugar-and-salt-solutions/, "The redirecting singular PhET route returned.");
  assert.doesNotMatch(program, /spaceplace\.nasa\.gov\/big-bang/, "The oversimplified Big Bang student reading returned.");

  for (const url of [
    "https://www.scienceworld.ca/resource/reaction-time-ruler/",
    "https://www.healthlinkbc.ca/healthwise/physical-development-ages-11-14-years",
    "https://kidshealth.org/en/kids/endocrine.html",
    "https://science.nasa.gov/universe/overview/",
    "https://moa.ubc.ca/2020/07/knowledge-keepers-a-moa-original-video-series/",
    ...exactUrls.filter((url) => url.includes("fnesc.ca/wp/wp-content")),
  ]) {
    assert.equal(resourceAt(resources, url).gradeFit, "Teacher preview", `Sensitive or context-dependent source must not open directly for students: ${url}`);
  }

  const reactionResource = resourceAt(resources, "https://www.scienceworld.ca/resource/reaction-time-ruler/");
  assert.match(reactionResource.support, /procedure and conversion table/i);
  assert.match(reactionResource.support, /do not use.*ranking\/candy|ranking\/candy extension/i);
  assert.match(inquiry, /currentResources\.filter\(\(resource\) => resource\.gradeFit !== "Teacher preview"\)/, "Student resource cards must continue excluding teacher-preview sources.");
});

test("lesson and scene timing stays realistic and planet data uses precise rotation terminology", async () => {
  const [{ scienceLessons }, program, inquiry, packs] = await Promise.all([
    importIsolatedTs("app/science-program.ts"),
    read("app/science-program.ts"),
    read("app/inquiry-experience.tsx"),
    read("app/science-offline-packs.ts"),
  ]);

  for (const lesson of scienceLessons) {
    const [lessonMin, lessonMax] = lessonMinuteRange(lesson.duration);
    const sceneRanges = lesson.scenes.map((scene) => minuteRange(scene.time));
    const sceneMin = sceneRanges.reduce((total, range) => total + range[0], 0);
    const sceneMaxWithTransitions = sceneRanges.reduce((total, range) => total + range[1], 0) + lesson.scenes.length * 5;
    assert.ok(lessonMax >= sceneMin, `${lesson.id} promises too little time for its required parts.`);
    assert.ok(lessonMin <= sceneMaxWithTransitions, `${lesson.id} duration is padded far beyond its described flow.`);
    assert.ok(sceneRanges.every(([, maximum]) => maximum <= 90), `${lesson.id} has an unrealistic single lesson part longer than 90 minutes.`);
  }

  const auditedDurations = new Map([
    ["life-systems-studio", "3 × 50–55 min"],
    ["force-patterns-lab", "3 × 50–55 min"],
    ["crash-lab", "3 × 45–50 min"],
    ["safer-impact-studio", "3 × 60 min"],
    ["cosmic-zoom", "3 × 55–65 min"],
    ["space-motion-lab", "4 × 50–65 min"],
    ["cosmic-exhibit-studio", "4–5 × 55 min"],
  ]);
  for (const [id, duration] of auditedDurations) {
    assert.equal(scienceLessons.find((lesson) => lesson.id === id)?.duration, duration, `${id} regressed to an unteachable one-block estimate.`);
  }

  const motionLesson = scienceLessons.find((lesson) => lesson.id === "space-motion-lab");
  assert.ok(motionLesson);
  assert.match(motionLesson.curriculumFocus.whyThisFits, /rotation-period and revolution-period data/);
  assert.match(motionLesson.teacherPrep.beforeClass.join(" "), /rounded rotation periods, not solar-day lengths/);
  assert.match(motionLesson.teacherPrep.offlineRoute, /planet rotation\/revolution cards/);
  assert.match(inquiry, /ROTATION-PERIOD DATA \+ REVOLUTION DATA/);
  assert.match(inquiry, /Rotation period is not the same as sunrise-to-sunrise solar day/);
  assert.doesNotMatch(inquiry, /<span>day ·|<span>year ·|day-length scale|year-length scale/);
  assert.doesNotMatch(program, /planet day\/year|planetary day and year data/i);
  assert.match(packs, /suspension:[\s\S]*colloid\/emulsion:/i, "The B.C. mixture-family terminology disappeared from the offline core.");
});

test("Science public status reflects the completed classroom-readiness audit", async () => {
  const [catalog, subjectHub] = await Promise.all([
    read("app/subject-catalog.ts"),
    read("app/subject-hub.tsx"),
  ]);
  assert.match(catalog, /name: "Science"[\s\S]*?status: "4 units · 19 classroom-ready lessons"[\s\S]*?updated: "Updated Sept\. 1"/);
  assert.match(subjectHub, /subject\.name === "Science" \? "CLASSROOM-READY · 19 complete lesson pathways"/);
  assert.doesNotMatch(subjectHub, /AUDIT · Units mapped; readiness varies/);
});
