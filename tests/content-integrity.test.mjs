import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath, encoding = "utf8") => readFile(path.join(root, relativePath), encoding);

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(target);
    return /\.(?:ts|tsx|css|json|html)$/.test(entry.name) ? [target] : [];
  }));
  return nested.flat();
}

test("the five flexible first-week rotations and verified booklet are present", async () => {
  const rotationSource = await read("app/first-week-rotation-data.ts");
  const expected = [
    ["rotation-identity-constellation", "identity-constellation.webp"],
    ["rotation-how-i-learn", "brain-user-manual.webp"],
    ["rotation-ideal-learning-space", "ideal-learning-space.webp"],
    ["rotation-build-better-grade-6", "build-better-grade-6.webp"],
    ["rotation-grade-6-quest-map", "grade-6-quest-map.webp"],
  ];

  for (const [id, image] of expected) {
    assert.match(rotationSource, new RegExp(id), `Missing rotation ${id}.`);
    const imageBuffer = await read(`public/images/first-week/${image}`, null);
    assert.equal(imageBuffer.subarray(0, 4).toString("ascii"), "RIFF", `${image} is not a WebP RIFF file.`);
    assert.equal(imageBuffer.subarray(8, 12).toString("ascii"), "WEBP", `${image} is not a WebP file.`);
  }

  const booklet = await read("public/printables/Grade_6_Discovery_Booklet.pdf", null);
  assert.equal(booklet.subarray(0, 5).toString("ascii"), "%PDF-", "Discovery Booklet is not a PDF.");
  assert.ok(booklet.length > 6_000_000, "Discovery Booklet is unexpectedly small.");
  assert.match(rotationSource, /45:\s*\[/);
  assert.match(rotationSource, /60:\s*\[/);
  assert.match(rotationSource, /75:\s*\[/);
});

test("canonical opening content stays schedule-neutral and privacy-bounded", async () => {
  const source = JSON.parse(await read("content/current-learning-window-v2.json"));
  assert.equal(source.window.shared.title, "Grade 6 Discovery Rotations");
  assert.match(source.window.teacher.timing, /schedule, order, and end date still flexible/i);
  assert.doesNotMatch(source.window.shared.summary, /every group visits once|Tuesday|Wednesday|Thursday|Friday/i);
  assert.match(source.window.shared.summary, /No student must complete all five/i);
  assert.match(source.window.shared.summary, /face-down/i);
  assert.match(source.window.shared.summary, /No student must.*post this work to SpacesEDU/i);
});

test("local public asset references resolve", async () => {
  const roots = [path.join(root, "app"), path.join(root, "content"), path.join(root, "pages"), path.join(root, "public", "generated")];
  const files = (await Promise.all(roots.map(sourceFiles))).flat();
  const missing = [];
  const assetPattern = /["'(`]((?:\/teacher-hub)?\/(?:images|downloads|printables|icons)\/[^"'`)\s?#}]+)/g;

  for (const file of files) {
    const body = await readFile(file, "utf8");
    for (const match of body.matchAll(assetPattern)) {
      if (match[1].includes("${")) continue;
      const publicPath = match[1].replace(/^\/teacher-hub/, "");
      try {
        await access(path.join(root, "public", publicPath));
      } catch {
        missing.push(`${path.relative(root, file)} → ${match[1]}`);
      }
    }
  }

  assert.deepEqual(missing, [], `Missing local assets:\n${missing.join("\n")}`);
});

test("repaired AI dilemma mappings do not regress to obsolete lesson IDs", async () => {
  const source = await read("app/ai-literacy.ts");
  const obsolete = ["transform-the-text", "four-arts-studio", "power-is-in-the-room", "rights-case-mystery", "career-futures", "community-belonging", "ethical-book-council", "health-information-check", "systems-under-pressure"];
  for (const id of obsolete) assert.doesNotMatch(source, new RegExp(`\\b${id}\\b`), `Obsolete AI lesson mapping returned: ${id}`);
  for (const id of ["turning-point-remix", "four-arts-languages", "power-in-the-room", "rights-in-tension", "career-constellation", "digital-identity-forensics", "trusted-health-studio", "body-case-conference", "access-by-design"]) {
    assert.match(source, new RegExp(`\\b${id}\\b`), `Expected repaired AI lesson mapping is missing: ${id}`);
  }
});

test("dated year registry launches election accountability before Fleetwood synthesis", async () => {
  const source = await read("app/year-week-registry.ts");
  const electionIndex = source.indexOf("surrey-election-results-and-next-2026");
  const fleetwoodIndex = source.indexOf('"fleetwood-case-file"');
  assert.ok(electionIndex >= 0, "Election-results connection is absent.");
  assert.ok(fleetwoodIndex > electionIndex, "Fleetwood synthesis is not sequenced after the election-results week.");
});

test("TTOC operational details are not persisted as student records", async () => {
  const source = await read("app/ttoc-day-plan.tsx");
  assert.match(source, /planForDeviceStorage/);
  assert.match(source, /essentials:\s*\{\s*\.\.\.emptyTtocEssentials\(\),\s*noTechRoute:/);
  assert.match(source, /Do not enter student names, contacts, access codes, medical details, or confidential safety information/);
});
