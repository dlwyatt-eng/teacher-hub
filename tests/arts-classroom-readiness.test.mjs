import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { importIsolatedTsFile } from "./helpers/import-isolated-ts.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

const artsIds = [
  "four-arts-languages",
  "map-what-maps-miss",
  "same-facts-frame",
  "rights-in-thirty",
  "audience-remix",
  "cosmic-scale-gallery",
];

async function importIsolatedTs(relativePath) {
  return importIsolatedTsFile(root, relativePath);
}

async function importWithCrossCurricular(relativePath) {
  const [{ default: ts }, crossCurricular, source] = await Promise.all([
    import("typescript"),
    read("app/cross-curricular-program.ts"),
    read(relativePath),
  ]);
  const compilerOptions = { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 };
  const crossCompiled = ts.transpileModule(crossCurricular, {
    compilerOptions,
    fileName: "cross-curricular-program.ts",
  }).outputText;
  const crossUrl = `data:text/javascript;base64,${Buffer.from(crossCompiled).toString("base64")}`;
  let linkedSource = source.replace(
    'from "./cross-curricular-program";',
    `from "${crossUrl}";`,
  );
  assert.notEqual(linkedSource, source, `${relativePath} no longer uses the expected cross-curricular import seam.`);
  linkedSource = linkedSource.replace(
    'import { spacesPolicyForActivity } from "./classroom-program";',
    "const spacesPolicyForActivity = () => null;",
  );
  const compiled = ts.transpileModule(linkedSource, {
    compilerOptions,
    fileName: relativePath,
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
}

test("Arts exposes the rebuilt four-arc, six-studio year pathway", async () => {
  const { artsProgram } = await importWithCrossCurricular("app/integrated-programs.ts");

  assert.equal(artsProgram.title, "See closely. Build technique. Make meaning. Revise with purpose.");
  assert.deepEqual(artsProgram.arcs.map(({ id, title, timing, experienceIds }) => ({ id, title, timing, experienceIds })), [
    { id: "arts-place", title: "Studio Foundations", timing: "September–October", experienceIds: ["four-arts-languages"] },
    { id: "arts-power", title: "Artists, Place & Context", timing: "November–January", experienceIds: ["map-what-maps-miss", "same-facts-frame"] },
    { id: "arts-audience", title: "Drama, Dance & Audience", timing: "February–March", experienceIds: ["rights-in-thirty", "audience-remix"] },
    { id: "arts-systems", title: "Create, Curate & Perform", timing: "April–June", experienceIds: ["cosmic-scale-gallery"] },
  ]);
  assert.deepEqual(artsProgram.experiences.map((experience) => experience.id), artsIds);
  assert.deepEqual(Object.fromEntries(artsProgram.experiences.map(({ id, title }) => [id, title])), {
    "four-arts-languages": "Four Arts Foundations",
    "map-what-maps-miss": "Place, Pattern & Public Art",
    "same-facts-frame": "Sound, Silence & Graphic Scores",
    "rights-in-thirty": "Drama & Movement: Power in the Picture",
    "audience-remix": "Audience, Critique & Curation",
    "cosmic-scale-gallery": "Pattern, Motion, Light & Environment",
  });

  const publicProgramText = JSON.stringify(artsProgram);
  for (const retired of [
    "One scene, four arts languages",
    "Four Languages, Many Meanings",
    "Voice, Power & Empathy",
    "Same facts, different feeling",
    "Rights in 30 seconds",
    "A gallery too large for the room",
    "ELA storytelling",
    "shared fact set",
  ]) {
    assert.doesNotMatch(publicProgramText, new RegExp(retired, "i"), `Retired Arts framing returned: ${retired}`);
  }

  const foundation = artsProgram.experiences.find((experience) => experience.id === "four-arts-languages");
  assert.match(foundation.duration, /5 × 50–60 min/);
  assert.match(foundation.product, /complete.*four-part Arts folio/i);
  assert.match(foundation.studentMission, /visual study.*graphic sound score.*tableau storyboard.*movement score/i);
});

test("every Arts studio has a complete ready-to-use kit and exact media route", async () => {
  const supports = await importWithCrossCurricular("app/program-supports.ts");
  const lessonsWithVideo = [];

  for (const id of artsIds) {
    const kit = supports.experienceKits[id];
    assert.ok(kit, `${id} is missing its classroom kit.`);
    assert.ok(Number.isFinite(kit.setupMinutes) && kit.setupMinutes >= 0 && kit.setupMinutes <= 15, `${id} needs a realistic setup time.`);
    assert.ok(kit.provided.length >= 4, `${id} needs at least four supplied teacher-ready pieces.`);
    assert.ok(kit.gather.length >= 2, `${id} needs a concrete gather list.`);
    assert.ok(kit.shortRoute.trim().length >= 80, `${id} needs a usable offline/short route.`);
    assert.ok(kit.cards.length >= 5, `${id} needs a complete projectable/printable card sequence.`);
    assert.ok(kit.cards.every((card) => card.title.trim() && card.body.trim()), `${id} contains an empty kit card.`);

    const media = supports.mediaFor(id);
    assert.ok(media.length > 0, `${id} is missing its lesson-specific media.`);
    assert.ok(media.some((item) => item.url), `${id} needs at least one outside source with an exact lesson job.`);
    for (const item of media) {
      for (const field of ["label", "source", "purpose", "studentTask", "fallback"]) {
        assert.ok(item[field]?.trim(), `${id} media item “${item.label || "untitled"}” is missing ${field}.`);
      }
      if (item.url) assert.match(item.url, /^https:\/\//, `${id} external media must use HTTPS.`);
      if (item.type === "video") {
        lessonsWithVideo.push(id);
        assert.ok(item.duration?.trim(), `${id} video “${item.label}” needs a teacher-selected duration or segment.`);
      }
    }
  }

  assert.ok(new Set(lessonsWithVideo).size >= 4, "At least four Arts studios should retain a purposeful video encounter alongside offline routes.");
});

test("Arts core media uses the exact official mentor routes and retires Transforming Image", async () => {
  const supports = await importWithCrossCurricular("app/program-supports.ts");
  const artsMedia = artsIds.flatMap((id) => supports.mediaFor(id));
  const artsMediaText = JSON.stringify(artsMedia);
  const mediaByUrl = new Map(artsMedia.filter((item) => item.url).map((item) => [item.url, item]));

  assert.doesNotMatch(artsMediaText, /Transforming Image/i, "Transforming Image must not return as a core Arts source.");
  for (const url of [
    "https://nac-cna.ca/en/video/map-foundational-elements-of-dance-2-space",
    "https://nac-cna.ca/en/artsalive/resource/all-my-relations-rhythmic-fun-with-music-alive/module/36164",
    "https://nac-cna.ca/en/artsalive/resource/autorickshaw/module/39055",
    "https://nac-cna.ca/en/video/map-foundational-elements-of-dance-4-motion",
    "https://nac-cna.ca/en/video/map-foundational-elements-of-dance-3-time",
  ]) {
    assert.ok(mediaByUrl.has(url), `The exact National Arts Centre route is missing: ${url}`);
  }

  const machineContext = mediaByUrl.get("https://www.surrey.ca/arts-culture/surrey-art-gallery/exhibitions/ian-johnston-machine-singing");
  assert.ok(machineContext, "Machine for Singing needs its official Surrey Art Gallery context page.");
  assert.match(`${machineContext.label} ${machineContext.source}`, /Machine for Singing.*Ian Johnston.*2007–09.*2010/i);
  assert.match(machineContext.purpose, /material.*visitor activation.*environmental\/consumption context/i);
});

test("all six Arts projector openings are custom, valid, and free of the old data-poster lesson", async () => {
  const projector = await importIsolatedTs("app/projector-lesson-supports.ts");

  for (const id of artsIds) {
    const support = projector.projectorLessonSupports[id];
    assert.ok(support, `${id} is falling back to the generic projector lesson.`);
    assert.deepEqual(projector.validateProjectorLessonSupport(support), [], `${id} has invalid projector support.`);
    assert.equal(projector.resolveProjectorLessonSupport({ id }).isCustom, true, `${id} must resolve to its custom projector opening.`);
    assert.equal(support.screenOnly, true);
    assert.ok(support.checks.length >= 2, `${id} needs at least two whole-class understanding checks.`);
  }

  const musicText = projector.projectorSupportText(projector.projectorLessonSupports["same-facts-frame"]);
  assert.match(musicText, /beat|rhythm/i);
  assert.match(musicText, /silence/);
  assert.match(musicText, /graphic score|notation/i);
  assert.doesNotMatch(musicText, /fictional library|42 people|same facts|data poster|shared fact set/i);

  const foundationText = projector.projectorSupportText(projector.projectorLessonSupports["four-arts-languages"]);
  assert.match(foundationText, /visual art/i);
  assert.match(foundationText, /music/i);
  assert.match(foundationText, /drama/i);
  assert.match(foundationText, /dance|movement/i);
  assert.doesNotMatch(foundationText, /ELA storytelling|image story/i);
});

test("all six Arts student contracts are reviewed and classroom-valid", async () => {
  const [{ artsProgram }, contracts] = await Promise.all([
    importWithCrossCurricular("app/integrated-programs.ts"),
    importIsolatedTs("app/student-lesson-contract.ts"),
  ]);

  for (const experience of artsProgram.experiences) {
    const contract = contracts.resolveStudentLessonContractForExperience(experience);
    assert.equal(contract.reviewState, "reviewed", `${experience.id} is still using an unreviewed student-language fallback.`);
    assert.deepEqual(contracts.validateStudentLessonContract(contract), { valid: true, issues: [] }, `${experience.id} has an invalid student contract.`);
    assert.ok(contract.steps.length >= 4, `${experience.id} needs a complete student sequence.`);
    assert.ok(contract.finishEvidence.length >= 3, `${experience.id} needs visible finish evidence.`);
  }
});

test("all six Arts contracts preserve every authored student step atomically", async () => {
  const [{ artsProgram }, supports, contracts] = await Promise.all([
    importWithCrossCurricular("app/integrated-programs.ts"),
    importWithCrossCurricular("app/program-supports.ts"),
    importIsolatedTs("app/student-lesson-contract.ts"),
  ]);

  const contractTextById = new Map();
  for (const experience of artsProgram.experiences) {
    const authoredSteps = supports.studentStepsFor(experience).map((step) => step.action);
    const contract = contracts.resolveStudentLessonContractForExperience({
      ...experience,
      steps: authoredSteps,
    });
    contractTextById.set(experience.id, contracts.studentContractText(contract));

    assert.equal(authoredSteps.length, experience.steps.length, `${experience.id} changed the authored five-part studio route.`);
    assert.equal(contract.steps.length, authoredSteps.length, `${experience.id} split or dropped an authored step.`);
    assert.deepEqual(contract.steps.map((step) => step.action), authoredSteps, `${experience.id} must keep each complete authored direction as one contract step.`);
    assert.equal(contract.firstAction, authoredSteps[0], `${experience.id} changed or fragmented its first authored direction.`);
    assert.equal(new Set(contract.steps.map((step) => step.action)).size, authoredSteps.length, `${experience.id} duplicated an authored step.`);
  }

  assert.match(contractTextById.get("map-what-maps-miss"), /original symbol/i, "The place-art contract lost original symbolism.");
  assert.match(contractTextById.get("map-what-maps-miss"), /visual metaphor/i, "The place-art contract lost visual metaphor.");
  assert.match(contractTextById.get("rights-in-thirty"), /tableau sequence/i, "The drama contract lost tableau as a dramatic form.");
  assert.match(contractTextById.get("rights-in-thirty"), /narrated scene/i, "The drama contract lost narrated scene as a dramatic form.");
  assert.match(contractTextById.get("rights-in-thirty"), /readers' theatre/i, "The drama contract lost readers' theatre as a dramatic form.");
  assert.match(contractTextById.get("cosmic-scale-gallery"), /manageable creative risk/i, "The culminating Arts contract lost its safe creative-risk requirement.");
});

test("LearningProgram ships a dedicated complete printable Arts folio route", async () => {
  const learningProgram = await read("app/learning-program.tsx");

  assert.match(learningProgram, /function ArtsStudioFolio\(\{ experience, kit \}/, "The dedicated Arts folio renderer is missing.");
  assert.match(learningProgram, /program\.subject === "Arts Education"\s*\?\s*<ArtsStudioFolio experience=\{experience\} kit=\{kit\} \/>\s*:\s*<KitCards/, "Arts lessons no longer route to the dedicated folio instead of the generic card printout.");
  assert.match(learningProgram, /Print complete folio/, "The complete Arts folio needs one explicit print action.");
  assert.match(learningProgram, /kit\.cards\.map\(\(card, index\)[\s\S]*?<ArtsFolioWorkspace title=\{card\.title\} \/>/, "The printable folio must include a response workspace for every supplied card.");
  assert.match(learningProgram, /Two large storyboard frames/);
  assert.match(learningProgram, /Four-part legend organizer/);
  assert.match(learningProgram, /Eight-part score organizer/);
  assert.match(learningProgram, /Large visual planning area/);
  assert.match(learningProgram, /Writing and reflection space/);

  assert.match(learningProgram, /Complete the whole folio\./, "Students need an explicit whole-folio expectation.");
  assert.match(learningProgram, /Every response section receives evidence, a purposeful attempt, or an agreed accessibility route\./, "The whole-folio promise must preserve an equivalent accessibility route.");
  assert.match(learningProgram, /Add colour, symbols, borders, spacing, pattern, or drawing where they strengthen meaning; decoration is never graded\./, "Decoration should be invited purposefully without becoming an assessment criterion.");
  assert.match(learningProgram, /WHOLE-FOLIO CHECK/);
  assert.match(learningProgram, /An accommodation may reduce response length or use oral\/scribed evidence without deleting the learning section\./, "Accessibility may change response mode or length without silently deleting the learning.");

  const projectorAssemblyStart = learningProgram.indexOf("const parts: Array<{ label: string; verb: string; content: ReactNode }> = [];");
  const projectorAssemblyEnd = learningProgram.indexOf("if (currentConnection)", projectorAssemblyStart);
  assert.ok(projectorAssemblyStart >= 0 && projectorAssemblyEnd > projectorAssemblyStart, "Could not isolate the Student LearningProgram projector assembly.");
  const projectorAssembly = learningProgram.slice(projectorAssemblyStart, projectorAssemblyEnd);
  const lookPart = projectorAssembly.indexOf('parts.push({ label: "Look", verb: "Notice"');
  const mentorMedia = projectorAssembly.indexOf('program.subject === "Arts Education" && <MediaStrip items={media} student />', lookPart);
  assert.ok(lookPart >= 0, "Arts lessons lost the visual Look projector part.");
  assert.ok(mentorMedia > lookPart, "Arts mentor media must appear inside the visual Look projector part.");
  assert.doesNotMatch(projectorAssembly, /parts\.push\(\{ label: "Mentor"/, "Arts should not add a duplicate Mentor projector tab.");
});

test("Arts proficiency models cover every studio and always leave a next move", async () => {
  const models = await importIsolatedTs("app/proficiency-models.ts");
  const artsSet = models.proficiencyModelSets.find((set) => set.id === "arts-intention-technique-revision");

  assert.ok(artsSet, "The Arts-specific proficiency model set is missing.");
  assert.deepEqual(artsSet.activityIds, artsIds);
  assert.deepEqual(artsSet.models.map((model) => model.level), ["Emerging", "Developing", "Proficient", "Extending"]);
  assert.ok(artsSet.models.every((model) => model.whatWorks.length && model.nextImprovement.trim() && model.teacherUseNote.trim()), "Every Arts proficiency level needs evidence, a next improvement, and teacher guidance.");
  assert.match(artsSet.copyGuard, /not proficiency criteria|not.*criteria/i);

  for (const id of artsIds) {
    assert.ok(models.proficiencyModelSetsForActivity(id).some((set) => set.id === artsSet.id), `${id} does not resolve to the Arts proficiency models.`);
  }
});

test("Arts coverage counts equal the four-arc alignment union", async () => {
  const [{ teachingOsCoverage }, { alignmentByArc }] = await Promise.all([
    importIsolatedTs("app/teaching-os-data.ts"),
    importIsolatedTs("app/curriculum-alignment.ts"),
  ]);
  const coverage = teachingOsCoverage.find((row) => row.subject === "Arts Education");
  assert.ok(coverage, "Teaching OS lost the Arts Education coverage row.");
  assert.deepEqual(
    { bigIdeas: coverage.bigIdeas, competencies: coverage.competencies, content: coverage.content },
    { bigIdeas: "4 / 4", competencies: "16 / 16", content: "8 / 10" },
  );

  const alignments = ["arts-place", "arts-power", "arts-audience", "arts-systems"].map((id) => alignmentByArc[id]);
  assert.ok(alignments.every(Boolean), "One or more Arts arc alignments are missing.");
  const bigIdeas = new Set(alignments.flatMap((alignment) => alignment.bigIdeas));
  const competencies = new Set(alignments.flatMap((alignment) => alignment.competencies.map((pair) => pair.join(":"))));
  const content = new Set(alignments.flatMap((alignment) => alignment.content.map((pair) => pair.join(":"))));
  assert.deepEqual([bigIdeas.size, competencies.size, content.size], [4, 16, 8], "The Arts coverage row no longer equals the union of its four taught arcs.");
});

test("Arts public status reflects the rebuilt pathway instead of the retired first-pass label", async () => {
  const [catalog, subjectHub] = await Promise.all([
    read("app/subject-catalog.ts"),
    read("app/subject-hub.tsx"),
  ]);
  assert.match(catalog, /name: "Arts Education"[\s\S]*?status: "4 arcs · 6 complete studio pathways"[\s\S]*?updated: "Updated Sept\. 1"/);
  assert.match(subjectHub, /subject\.name === "Arts Education" \? "STUDIO-READY · 6 sequenced pathways"/);
});

test("the year registry seeds all 25 Arts sessions once, in-window, on Tuesday", async () => {
  const [registry, weeklyPlan, { artsProgram }] = await Promise.all([
    read("app/year-week-registry.ts"),
    read("app/weekly-plan.tsx"),
    importWithCrossCurricular("app/integrated-programs.ts"),
  ]);
  const slotsStart = registry.indexOf("const artsStudioSlots:");
  const slotsEnd = registry.indexOf("const programs =", slotsStart);
  assert.ok(slotsStart >= 0 && slotsEnd > slotsStart, "Could not isolate the explicit Arts studio slots.");
  const slotsSource = registry.slice(slotsStart, slotsEnd);
  const entries = [];
  const monthPattern = /^  ([A-Z][a-z]+): \[([\s\S]*?)^  \],/gm;
  for (const monthMatch of slotsSource.matchAll(monthPattern)) {
    const [, month, body] = monthMatch;
    const sessionPattern = /artsSession\("([^"]+)",\s*(\d+),\s*(\d+),\s*"([^"]+)",\s*\[([\d,\s]*)\]\)/g;
    for (const sessionMatch of body.matchAll(sessionPattern)) {
      entries.push({
        month,
        sourceId: sessionMatch[1],
        session: Number(sessionMatch[2]),
        total: Number(sessionMatch[3]),
        label: sessionMatch[4],
        stepIndexes: sessionMatch[5].split(",").map((value) => value.trim()).filter(Boolean).map(Number),
      });
    }
  }

  assert.equal((slotsSource.match(/artsSession\("/g) ?? []).length, 25, "The registry must define 25 explicit ArtsStudioSession seeds.");
  assert.equal(entries.length, 25, "Every explicit Arts session must be parseable and labelled.");
  const expected = {
    "four-arts-languages": { total: 5, months: ["September", "October"] },
    "map-what-maps-miss": { total: 4, months: ["November", "December", "January"] },
    "same-facts-frame": { total: 4, months: ["November", "December", "January"] },
    "rights-in-thirty": { total: 4, months: ["February", "March"] },
    "audience-remix": { total: 3, months: ["February", "March"] },
    "cosmic-scale-gallery": { total: 5, months: ["April", "May", "June"] },
  };

  for (const [sourceId, expectation] of Object.entries(expected)) {
    const sessions = entries.filter((entry) => entry.sourceId === sourceId);
    assert.deepEqual(sessions.map((entry) => entry.session).sort((a, b) => a - b), Array.from({ length: expectation.total }, (_, index) => index + 1), `${sourceId} must seed session 1 through ${expectation.total} exactly once.`);
    assert.ok(sessions.every((entry) => entry.total === expectation.total), `${sourceId} has an inconsistent total-session label.`);
    assert.ok(sessions.every((entry) => expectation.months.includes(entry.month)), `${sourceId} has a session outside its curriculum arc window.`);
    const experience = artsProgram.experiences.find((item) => item.id === sourceId);
    assert.ok(experience, `${sourceId} does not resolve to the rebuilt Arts program.`);
    const scheduledIndexes = sessions.flatMap((entry) => entry.stepIndexes).sort((a, b) => a - b);
    assert.deepEqual(scheduledIndexes, experience.steps.map((_, index) => index), `${sourceId} must seed each authored stepIndex once and only once.`);
  }

  assert.match(weeklyPlan, /export const WEEKDAYS = \["monday", "tuesday", "wednesday", "thursday", "friday"\] as const;/);
  assert.match(registry, /const artsStudioDay = WEEKDAYS\[1\];/, "The Arts studio block must remain Tuesday.");
  const builderStart = registry.indexOf("function artsStudioLessonFromSession");
  const builderEnd = registry.indexOf("function addDays", builderStart);
  const builder = registry.slice(builderStart, builderEnd);
  assert.match(builder, /const selectedSteps = session\.stepIndexes\.map\(\(index\) => authoredSteps\[index\]\)\.filter\(Boolean\);/, "The seed must select only this session's authored stepIndexes.");
  assert.match(builder, /day: artsStudioDay,/);
  assert.match(builder, /runSteps: selectedSteps\.map\(/);
  assert.doesNotMatch(builder, /runSteps:\s*authoredSteps\.map\(/, "A dated Arts block must not seed every unit step at once.");
  assert.match(registry, /const lessons = artsStudio \? \[\.\.\.anchorLessons, artsStudioLessonFromSession\(artsStudio\)\] : anchorLessons;/, "Each dated seed should append only its selected Arts studio block.");
});
