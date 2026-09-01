import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath, encoding = "utf8") => readFile(path.join(root, relativePath), encoding);

test("Civic Evidence Room preserves the canonical four-lesson progression", async () => {
  const program = await read("app/social-program.ts");
  const ids = ["power-in-the-room", "compare-government-systems", "rights-in-tension", "civic-decision-brief"];
  let previous = -1;
  for (const id of ids) {
    const index = program.indexOf(`id: "${id}"`);
    assert.ok(index > previous, `${id} is missing or out of order.`);
    previous = index;
  }
  assert.match(program, /id: "civic-decision-brief"[\s\S]*?duration: "4 × 55–65 min \+ optional ELA\/Arts studio"/);
  assert.match(program, /id: "power-in-the-room"[\s\S]*?evidenceLevel: "Practice"[\s\S]*?spacesUse: "none"/);
  assert.match(program, /id: "compare-government-systems"[\s\S]*?evidenceLevel: "Practice"[\s\S]*?spacesUse: "none"/);
  assert.match(program, /id: "rights-in-tension"[\s\S]*?evidenceLevel: "Checkpoint"[\s\S]*?spacesUse: "none"/);
  assert.match(program, /id: "civic-decision-brief"[\s\S]*?evidenceLevel: "Portfolio Highlight"[\s\S]*?spacesUse: "required"/);
});

test("the six-session pathway includes flexible delivery, assessment, and continuity", async () => {
  const pathway = await read("app/civic-evidence-pathway.tsx");
  for (const title of ["Find the power", "Make power answerable", "Open the Juniper Park file", "Deliberate without a perfect answer", "Build the civic case file", "Hear, challenge, revise"]) {
    assert.match(pathway, new RegExp(title), `Missing session: ${title}`);
  }
  for (const phrase of ["FOUR-SESSION EMERGENCY ROUTE", "STANDALONE / TTOC", "Authority and power", "Evidence and affected perspectives", "Accountable decision-making", "Individual reasoning and participation", "political agreement", "production polish", "browser state is never the record of learning"]) {
    assert.match(pathway, new RegExp(phrase, "i"), `Missing pathway safeguard: ${phrase}`);
  }
  assert.match(pathway, /projector:/);
  assert.match(pathway, /sharedDevice:/);
  assert.match(pathway, /offline:/);
  assert.match(pathway, /safetyPrivacyCleanup:/);
  assert.match(pathway, /accessibility:/);
  assert.match(pathway, /extension:/);
  assert.match(pathway, /continuity:/);
});

test("the synchronized civic offline pack contains every required evidence layer", async () => {
  const pathway = await read("app/civic-evidence-pathway.tsx");
  const workbench = await read("app/social-unit2-experiences.tsx");
  const data = await read("app/civic-evidence-data.ts");
  for (const exportName of ["affectedPeople", "communityVoices", "evidenceTrays", "evidenceCards", "plans", "improvements", "recommendationEvidence", "reviewPlans"]) {
    assert.match(workbench, new RegExp(`export const ${exportName}`), `Offline pack data is not exported: ${exportName}`);
    assert.match(pathway, new RegExp(`\\b${exportName}\\b`), `Offline pack does not use: ${exportName}`);
  }
  for (const phrase of ["FICTIONAL PRACTICE CASE", "Power in the Room role cards", "Water emergency decision models", "Evidence wall cards", "Civic case file", "Challenge, revise, reflect", "Print / Save PDF", "private ballots", "raw AI output"]) {
    assert.match(pathway, new RegExp(phrase, "i"), `Offline pack is missing: ${phrase}`);
  }
  assert.match(data, /powerRoles:/);
  assert.match(data, /powerObserver:/);
  assert.match(data, /systems:/);
  assert.match(data, /rightsCases:/);
  assert.doesNotMatch(await read("app/social-studies-program.tsx"), /const unit2ScenarioCards =/);
});

test("the civic culmination is an interactive five-part hearing and revision lab", async () => {
  const lab = await read("app/civic-decision-brief-lab.tsx");
  const social = await read("app/social-studies-program.tsx");
  for (const part of ["Name the decision", "Build the evidence wall", "Pressure-test the options", "Hold the civic hearing", "Revise and reflect"]) {
    assert.match(lab, new RegExp(part), `Civic Decision Brief part is missing: ${part}`);
  }
  assert.match(lab, /setInterval\(\(\) => setSecondsLeft/);
  assert.match(lab, /Start 90 seconds/);
  assert.match(lab, /sourceAssignments/);
  assert.match(lab, /selectedPlan && selectedSafeguard && selectedReview/);
  assert.match(lab, /revisionChecks\.length === 5/);
  assert.match(lab, /Civic \/ Community Needs Brief/);
  assert.match(lab, /plans as civicPlans/);
  assert.match(lab, /improvements as civicImprovements/);
  assert.match(lab, /reviewPlans as civicReviewPlans/);
  assert.match(lab, /print-civic-decision-brief/);
  assert.match(social, /<CivicDecisionBriefLab scene=\{scene\} audience=\{audience\} \/>/);
  assert.doesNotMatch(social, /function CivicHearingLab/);
});

test("Civic teacher and student views expose the pathway without leaking it into the entry bundle", async () => {
  const social = await read("app/social-studies-program.tsx");
  const page = await read("app/page.tsx");
  const subjectHub = await read("app/subject-hub.tsx");
  assert.match(social, /<CivicEvidencePathway currentLessonId=\{selected\.id\} onLesson=\{onLesson\}/);
  assert.match(social, /<CivicReasoningRoute compact \/>/);
  assert.match(social, /safetyPrivacyCleanup=\{civicDelivery\?\.safetyPrivacyCleanup\}/);
  assert.match(social, /extension=\{civicDelivery\?\.extension\}/);
  assert.match(social, /<SocialStudentLab lessonId=\{selected\.id\} scene=\{scene\} audience="teacher" \/>/);
  assert.match(social, /unit2SocialLessons\.find\(\(\{ id \}\) => id === "civic-decision-brief"\)/);
  assert.doesNotMatch(page, /civic-evidence-pathway|social-studies-program/);
  assert.match(subjectHub, /lazy\(\(\) => import\("\.\/social-studies-program"\)/);
});

test("Civic sources are current and Pages rewriting cannot corrupt external paths", async () => {
  const program = await read("app/social-program.ts");
  const pathway = await read("app/civic-evidence-pathway.tsx");
  const search = await read("app/site-search-dialog.tsx");
  const postbuild = await read("pages/postbuild.mjs");
  for (const retired of ["https://education.elections.ca/", "/city-government/city-council", "/canada-system-of-government/levels-of-government/"]) {
    assert.doesNotMatch(program, new RegExp(retired.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `Retired source returned: ${retired}`);
  }
  for (const current of ["https://electionsanddemocracy.ca/your-classroom/resources", "https://www.surrey.ca/city-government/mayor-council", "https://learn.parl.ca/en/games/game4/index.html", "https://www.bcafn.ca/about-bcafn/vision-mission"]) {
    assert.ok(program.includes(current) || pathway.includes(current), `Current source is missing: ${current}`);
  }
  assert.match(search, /The Civic Evidence Room/);
  assert.match(postbuild, /\(\?<!\[A-Za-z0-9\]\)/);
  assert.doesNotMatch(postbuild, /replaceAll\(`\/\$\{folder\}\//);
});

test("the water-emergency visual is an optimized WebP", async () => {
  const social = await read("app/social-studies-program.tsx");
  const imagePath = path.join(root, "public/images/unit2-water-emergency-v1.webp");
  const image = await readFile(imagePath);
  const imageStat = await stat(imagePath);
  assert.equal(image.subarray(0, 4).toString("ascii"), "RIFF");
  assert.equal(image.subarray(8, 12).toString("ascii"), "WEBP");
  assert.ok(imageStat.size < 400_000, `Projector image is too large: ${imageStat.size} bytes.`);
  assert.match(social, /unit2-water-emergency-v1\.webp/);
  await assert.rejects(access(path.join(root, "public/images/unit2-water-emergency-v1.png")));
});
