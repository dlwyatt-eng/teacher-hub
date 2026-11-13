import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { moduleLoader } from "./helpers/load-rendered-module.mjs";
import { buildPublicManifest } from "../pages/public-window-projection.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = file => readFileSync(path.join(root, file), "utf8");
const json = file => JSON.parse(read(file));
const load = moduleLoader(root);
const classroom = load("app/classroom-program.ts");
const social = load("app/social-program.ts");
const source = json("content/current-learning-window-v2.json");
const manifest = json("public/generated/public-window-v2.json");
const homePractice = json("content/home-practice.json");

test("the rendered country-inquiry overview opens the actual booklet, guide and optional Juniper Park route", () => {
  const { RightsPlanning } = load("app/rights-planning.tsx");
  const html = renderToStaticMarkup(React.createElement(RightsPlanning));
  for (const file of ["two-countries-shared-questions-student.pdf", "two-countries-shared-questions-teacher.pdf"]) {
    assert.match(html, new RegExp(`href="printables/${file}"`));
    assert.equal(readFileSync(path.join(root, "public/printables", file)).subarray(0, 5).toString(), "%PDF-");
  }
  assert.match(html, /Two Countries Shared Questions/);
  assert.match(html, /Work in groups to explore an issue you care about, compare two countries/);
  assert.match(html, /starting connection, not a submission deadline/);
  assert.match(html, /January presentations are proposed/);
  assert.match(html, /Students find and compare sources with class guidance/);
  assert.match(html, /optional starting points/);
  assert.match(html, /No holiday homework or separate post for each page/);
  assert.match(html, /Every learner investigates both countries/);
  const juniper = html.match(/href="([^\"]*socialLesson=rights-in-tension[^\"]*)"/)[1].replaceAll("&amp;", "&");
  const params = new URL(juniper, "https://example.test/teacher-hub/").searchParams;
  assert.equal(params.get("subject"), "Social Studies");
  assert.equal(params.get("socialScene"), "0");
  assert.ok(social.socialLessons.some(lesson => lesson.id === params.get("socialLesson")));
});

test("current planning follows one supported two-country inquiry without inventing completion or a holiday assignment", () => {
  const months = classroom.yearMonths.filter(month => ["November", "December", "January", "February"].includes(month.month));
  const text = JSON.stringify(months);
  assert.match(text, /two countries/);
  assert.match(text, /January presentations are proposed/);
  assert.match(text, /no holiday homework|without holiday homework/i);
  assert.doesNotMatch(text, /Human Rights Day teaching gallery|Dec\. 10 · Human Rights Day gallery|Feb\. 18–24 · rotating expert/);
  assert.equal(social.socialInquiryProject.title, "Two Countries Shared Questions");
  assert.equal(social.socialInquiryProject.teamSize, "Individual, pair or group");
  assert.match(JSON.stringify(social.socialInquiryProject), /Every learner studies both countries/);
  assert.match(JSON.stringify(social.socialInquiryProject), /student-led research|student-led searching/);
  assert.doesNotMatch(JSON.stringify(social.socialPacing), /culminating in the Human Rights Day gallery/);
  assert.ok(social.socialLessons.some(lesson => lesson.id === "rights-in-tension"));
  assert.ok(social.socialLessons.some(lesson => lesson.id === "civic-decision-brief"));
  assert.doesNotMatch(read("app/social-studies-program.tsx"), /2 REQUIRED UNIT HIGHLIGHTS|two unit highlights are the required/);
  const notes = read("app/year-week-registry.ts").split("const rightsWeekNotes:")[1].split("function buildYearWeekLaunches")[0];
  assert.match(notes, /January presentations are proposed and flexible/);
  assert.match(notes, /no holiday homework/);
  assert.doesNotMatch(notes, /revise a case.*for December 10|share a tested scenario/);
});

test("the existing inquiry portfolio anchor is retained without a parallel required civic post", () => {
  const civic = classroom.spacesEvidenceRhythm.find(item => item.id === "spaces-nov-civic");
  assert.equal(civic.kind, "Optional evidence");
  assert.ok(!classroom.spacesReportingWindows.some(window => window.requiredEvidenceIds.includes(civic.id)));
  assert.ok(classroom.spacesReportingWindows.some(window => window.optionalEvidenceIds.includes(civic.id)));
  const inquiry = classroom.spacesEvidenceRhythm.find(item => item.id === "spaces-feb-inquiry");
  assert.equal(inquiry.kind, "Required portfolio");
  assert.equal(inquiry.month, "January");
  assert.match(inquiry.purpose, /when selected evidence is ready/);
  assert.match(inquiry.purpose, /proposed and flexible/);
  assert.ok(classroom.spacesReportingWindows.some(window => window.requiredEvidenceIds.includes(inquiry.id)));
  for (const id of ["civic-decision-brief", "expert-exchange"]) {
    assert.equal(social.socialLessons.find(lesson => lesson.id === id).spacesUse, "optional");
    const policy = classroom.spacesPolicyForActivity(id);
    assert.equal(policy.decision, "reuse");
    assert.match(policy.teacherPrompt, /Do not create a separate post/);
  }
  assert.equal(classroom.spacesAnnualEvidenceSummary().majorAnchorPosts, classroom.spacesPortfolioBudget.majorAnchorCount);
  assert.equal(manifest.portfolioSummary.majorAnchorCount, classroom.spacesPortfolioBudget.majorAnchorCount);
});

test("public summaries replace superseded gallery plans and remain idempotent and privacy bounded", () => {
  assert.deepEqual(buildPublicManifest(manifest, source, homePractice), manifest);
  for (const monthName of ["November", "December", "January", "February"]) {
    const month = manifest.yearMonths.find(item => item.month === monthName);
    const update = source.publicMonthUpdates[monthName];
    assert.deepEqual(month.highlights, update.highlights);
    assert.equal(month.learning, update.learning);
    assert.equal(month.anticipatedShare, update.anticipatedShare);
  }
  const childDay = manifest.schoolEvents.find(event => event.id === "national-child-day");
  assert.equal(childDay.date, "2026-11-20");
  assert.match(childDay.detail, /not a submission deadline/);
  const rightsDay = manifest.schoolEvents.find(event => event.id === "human-rights-day");
  assert.equal(rightsDay.date, "2026-12-10");
  assert.match(rightsDay.detail, /No separate rights gallery/);
  assert.match(manifest.learningUpdates.subjects.find(item => item.subject === "Social Studies").detail, /government, migration, resources, cooperation and rights/);
  const privateSource = structuredClone(source);
  privateSource.publicMonthUpdates.November.teacher = "private teacher record";
  privateSource.publicProjectUpdates["expert-teach-back"].teacher = "private teacher record";
  privateSource.publicPortfolioUpdate.teacher = "private teacher record";
  assert.deepEqual(buildPublicManifest(manifest, privateSource, homePractice), manifest);
  const legacy = structuredClone(source);
  legacy.publicMonthUpdates.November = { focus: "Legacy focus", highlight: "A supported optional connection" };
  const projected = buildPublicManifest(manifest, legacy, homePractice);
  assert.ok(projected.yearMonths.find(item => item.month === "November").highlights.includes("A supported optional connection"));
  assert.deepEqual(buildPublicManifest(projected, legacy, homePractice), projected);
});
