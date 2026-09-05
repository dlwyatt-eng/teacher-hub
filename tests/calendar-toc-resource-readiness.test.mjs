import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => readFile(path.join(root, file), "utf8");

const requiredProvocationIds = [
  "terry-fox-access-and-action",
  "harvest-reciprocity",
  "remembrance-public-memory",
  "truth-records-responsibility",
  "black-futures-bc",
  "earth-day-systems",
  "pink-shirt-bystander-power",
];

test("the master pack supplies seven complete Calendar Provocations", async () => {
  const pack = JSON.parse(await read("content/master-inquiry-pack-v1.json"));
  const provocations = pack.calendarProvocations;

  assert.deepEqual(provocations.map((item) => item.id), requiredProvocationIds);
  for (const item of provocations) {
    for (const field of ["title", "lens", "timing", "learning", "hook", "before", "discussion", "product", "differentiation", "fallback", "antiTokenism"]) {
      assert.equal(typeof item[field], "string", `${item.id} is missing ${field}.`);
      assert.ok(item[field].trim(), `${item.id} has empty ${field}.`);
    }
    assert.equal(item.noticeWonder.length, 2, `${item.id} needs Notice and Wonder prompts.`);
    assert.ok(item.questions.length >= 3, `${item.id} needs accessible inquiry questions.`);
    assert.ok(item.curriculum.length >= 3, `${item.id} needs cross-curricular connections.`);
    assert.match(item.source.href, /^https:\/\//, `${item.id} needs an active source route.`);
  }
});

test("Calendar Provocations expose teacher preparation and a complete projector route", async () => {
  const [source, css] = await Promise.all([
    read("app/calendar-provocations-page.tsx"),
    read("app/calendar-provocations-page.css"),
  ]);

  assert.match(source, /masterInquiryPack\.calendarProvocations/);
  assert.match(source, /masterInquiryPack\.evidenceProtocol/);
  assert.match(source, /export function CalendarProvocationsPage/);
  assert.match(source, /audience = "teacher"/);
  assert.match(source, /onProvocationChange\?\.\(id\)/);
  for (const label of ["Look", "Notice", "Wonder", "Discuss", "Create", "Check"]) {
    assert.match(source, new RegExp(`label: "${label}"`), `Projector route is missing ${label}.`);
  }
  for (const field of ["provocation.hook", "provocation.before", "provocation.noticeWonder", "provocation.questions", "provocation.product", "provocation.curriculum", "provocation.differentiation", "provocation.fallback", "provocation.antiTokenism", "provocation.source.href"]) {
    assert.match(source, new RegExp(field.replaceAll(".", "\\.")), `Teacher plan does not render ${field}.`);
  }
  assert.match(source, /calendar-provocations__clarity-strip/);
  assert.match(source, /aria-live="polite"/);
  assert.match(css, /calendar-provocations__projector-stage/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css, /@media\(forced-colors:active\)/);
  assert.match(css, /@media print/);
});

test("the TOC library links to the live builder and leaves no false Time Capsule downloads", async () => {
  const [source, css] = await Promise.all([
    read("app/toc-resource-library.tsx"),
    read("app/toc-resource-library.css"),
  ]);

  assert.match(source, /export type TocResourceLibraryProps/);
  assert.match(source, /onHome: \(\) => void/);
  assert.match(source, /onOpenTtocPlan: \(\) => void/);
  assert.match(source, /TOC &amp; Emergency Plans/);
  assert.match(source, /School and district procedures always take priority/);
  assert.match(source, /stores no student information/);
  assert.match(source, /The Mystery of the Missing Time Capsule/);
  assert.match(source, /Grade 6 Discovery Booklet/);
  assert.match(source, /RESERVED · NOT YET PUBLISHED/);
  assert.match(source, /Student booklet/);
  assert.match(source, /Teacher directions/);
  assert.match(source, /Teacher-only answer key/);
  assert.doesNotMatch(source, /href=|download=/, "Reserved resources must not expose dead links.");
  assert.ok((source.match(/onClick=\{onOpenTtocPlan\}/g) ?? []).length >= 2, "Both live-builder actions must use the integration callback.");
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /@media print/);
});

test("Calendar and TOC destinations are reachable from Teacher Hub navigation without a placeholder fallback", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /const CalendarProvocationsPage = lazy/);
  assert.match(page, /const TocResourceLibrary = lazy/);
  assert.match(page, /active === "Calendar Provocations"/);
  assert.match(page, /active === "TOC & Emergency Plans"/);
  assert.match(page, /onOpenTtocPlan=\{\(\) => navigateToPage\("TTOC Day Plan"\)\}/);
  assert.doesNotMatch(page, /function PlaceholderPage/);
  assert.doesNotMatch(page, /Tools and content will appear here/);
});
