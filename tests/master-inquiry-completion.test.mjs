import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("Equal Earth inquiry is evidence-led, complete, and safe to teach offline", async () => {
  const [raw, socialData, socialUi, mercatorMap, equalEarthMap] = await Promise.all([
    read("content/master-inquiry-pack-v1.json"),
    read("app/social-program.ts"),
    read("app/social-studies-program.tsx"),
    read("public/images/map-inquiry/mercator-world.svg"),
    read("public/images/map-inquiry/equal-earth-world.svg"),
  ]);
  const pack = JSON.parse(raw);
  const inquiry = pack.mapInquiry;

  assert.equal(inquiry.projectionCards.length, 2);
  assert.deepEqual(inquiry.steps.map(({ label }) => label), ["NOTICE", "WONDER", "LEARN", "INVESTIGATE", "DISCUSS", "REIMAGINE"]);
  assert.ok(inquiry.comparisons.length >= 4);
  assert.match(inquiry.routes.offline, /local map images/i);
  assert.match(inquiry.timeSensitiveNote, /official resolution or meeting record/i);
  assert.ok(inquiry.placeExtension.sources.some(({ label }) => /Katzie/i.test(label)));
  assert.ok(inquiry.placeExtension.sources.some(({ label }) => /Kwantlen/i.test(label)));
  assert.ok(inquiry.placeExtension.sources.some(({ label }) => /Semiahmoo/i.test(label)));
  assert.match(socialData, /id: "who-drew-the-world"/);
  assert.match(socialUi, /function EqualEarthLab/);
  assert.match(socialUi, /evidence is not the same as interpretation or policy/i);
  assert.match(socialUi, /There is no single Indigenous map or worldview/i);
  assert.match(mercatorMap, /<title id="title">Mercator world map projection<\/title>/);
  assert.match(equalEarthMap, /<title id="title">Equal Earth world map projection<\/title>/);
  assert.doesNotMatch(`${mercatorMap}${equalEarthMap}`, /NaN|undefined/);
});

test("Claim, evidence, and care keeps uncertainty distinct from denialism", async () => {
  const [raw, socialUi] = await Promise.all([
    read("content/master-inquiry-pack-v1.json"),
    read("app/social-studies-program.tsx"),
  ]);
  const protocol = JSON.parse(raw).evidenceProtocol;
  assert.deepEqual(protocol.steps.map(({ label }) => label), ["NAME", "SORT", "CHECK", "WEIGH", "NOTICE", "RESPOND"]);
  assert.deepEqual(protocol.uncertaintyLadder.map(({ kind }) => kind), [
    "Honest question",
    "Incomplete evidence",
    "Competing interpretation",
    "Outdated information or mistake",
    "Strategic doubt",
    "Misinformation",
    "Denialism",
  ]);
  assert.match(protocol.uncertaintyLadder.at(-1).teacherMove, /Use this word only when the pattern is well supported/i);
  assert.match(socialUi, /function EvidenceCareProtocol/);
  assert.match(socialUi, /Documented harms, people&apos;s identities, and basic rights are not classroom debate topics/);
});

test("all seven master provocations carry the runnable lesson fields", async () => {
  const pack = JSON.parse(await read("content/master-inquiry-pack-v1.json"));
  assert.deepEqual(pack.calendarProvocations.map(({ id }) => id), [
    "terry-fox-access-and-action",
    "harvest-reciprocity",
    "remembrance-public-memory",
    "truth-records-responsibility",
    "black-futures-bc",
    "earth-day-systems",
    "pink-shirt-bystander-power",
  ]);
  for (const provocation of pack.calendarProvocations) {
    for (const field of ["timing", "learning", "hook", "before", "noticeWonder", "questions", "discussion", "product", "curriculum", "differentiation", "fallback", "antiTokenism", "source"]) {
      assert.ok(provocation[field], `${provocation.id} must include ${field}`);
    }
    assert.match(provocation.source.href, /^https:\/\//);
  }
});
