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

test("the AI physical-system map is projector-ready and accessibility-bounded", async () => {
  const source = await read("app/ai-tensions-lab.tsx");
  const catalog = await read("app/visual-review-catalog.ts");
  const asset = await read("public/images/visual-review/ai-physical-system-route-v1.svg");
  assert.match(asset, /width="1920" height="1080"/);
  assert.match(asset, /No single water or energy number applies to every prompt/);
  assert.match(source, /dilemma\.id === "data-centre-community"/);
  assert.match(source, /ai-physical-system-route-v1\.svg/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /systemMapDialogRef/);
  assert.match(source, /event\.key === "Escape"/);
  assert.match(source, /event\.key !== "Tab"/);
  assert.match(source, /dialog\.contains\(document\.activeElement\)/);
  assert.match(source, /event\.shiftKey && document\.activeElement === first/);
  assert.match(source, /!event\.shiftKey && document\.activeElement === last/);
  assert.match(source, /className="ai-system-map-scrim" type="button" tabIndex=\{-1\} aria-hidden="true"/);
  assert.match(source, /Whole data-centre use is not the same as the AI share/);
  assert.match(catalog, /id: "T04"/);
  assert.match(catalog, /avoids universal per-prompt water or energy claims/);
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
  const weeklySource = await read("app/weekly-plan.tsx");
  const privacySource = await read("app/planning-privacy.tsx");
  assert.match(source, /planForDeviceStorage/);
  assert.match(source, /essentials:\s*\{\s*\.\.\.emptyTtocEssentials\(\),\s*noTechRoute:/);
  assert.match(source, /PlanningPrivacyNote/);
  assert.match(weeklySource, /PlanningPrivacyNote/);
  assert.match(weeklySource, /no student-specific or confidential information/i);
  assert.match(privacySource, /Do not enter student names, contacts, access codes, medical details, confidential safety information, or student-specific supports/);
});

test("multi-class TTOC plans keep the full timing and complete critical notes", async () => {
  const runSheet = await read("app/teacher-run-sheet.tsx");
  const ttoc = await read("app/ttoc-day-plan.tsx");
  const weekly = await read("app/weekly-plan.tsx");
  assert.doesNotMatch(runSheet, /one class block/i);
  assert.match(runSheet, /multi-class sequence/i);
  assert.match(runSheet, /SAFETY \/ PRIVACY \/ CLEANUP/);
  assert.match(runSheet, /FINISH:/);
  assert.doesNotMatch(runSheet, /\.slice\(0,\s*(?:880|900)\)/);
  assert.match(ttoc, /PLAN_BLOCK_NOTE_MAX/);
  assert.doesNotMatch(ttoc, /block\.notes\.slice/);
  assert.match(weekly, /PLAN_BLOCK_NOTE_MAX/);
});

test("Source Mosaic and Science expose their offline and full-prep routes", async () => {
  const mosaic = await read("app/ela-source-mosaic-lab.tsx");
  const learningProgram = await read("app/learning-program.tsx");
  const science = await read("app/inquiry-experience.tsx");
  assert.match(mosaic, /export function SourceMosaicStaticPack/);
  assert.match(mosaic, /FICTIONAL PRACTICE SOURCES/);
  assert.match(mosaic, /TEACHER KEY/);
  assert.match(learningProgram, /SourceMosaicStaticPack/);
  assert.match(learningProgram, /printed Static Source Pack/);
  assert.match(science, /Full prep \/ print/);
  assert.match(science, /<MiniBrief lesson=\{lesson\} unit=\{unit\} onClose=\{closeBrief\}/);
});

test("major views remain lazy, recoverable, and free of the fixed-position state collision", async () => {
  const page = await read("app/page.tsx");
  const entry = await read("pages/main.tsx");
  const science = await read("app/inquiry-experience.tsx");
  const globalCss = await read("app/globals.css");
  const auditCss = await read("app/classroom-audit.css");
  for (const view of ["inquiry-experience", "social-studies-program", "learning-program", "first-week-mission", "ai-tensions-lab", "visual-review-studio"]) {
    assert.match(page, new RegExp(`lazy\\(\\(\\) => import\\(\"\\./${view}\"\\)`), `Missing lazy boundary for ${view}.`);
  }
  assert.match(page, /<Suspense fallback=\{<RouteLoading/);
  assert.match(page, /<RouteErrorBoundary routeKey=/);
  assert.match(page, /Refresh this view/);
  assert.doesNotMatch(entry, /learning-program\.css|social-studies\.css|first-week-mission\.css|ai-tensions-lab\.css/);
  assert.doesNotMatch(science, /className=\{fair(?:Launch|Start|Repeat) \? "fixed"/);
  assert.match(science, /className=\{fairLaunch \? "is-fixed"/);
  assert.doesNotMatch(globalCss, /unfair-flight>footer span\.fixed/);
  assert.match(globalCss, /unfair-flight>footer span\.is-fixed/);
  assert.match(auditCss, /\.projector-shell \.social-student-launch \{[^}]*color: var\(--classroom-ink\);/s);
  const moveTabFocusStart = page.indexOf("const moveTabFocus");
  const moveTabFocus = page.slice(moveTabFocusStart, page.indexOf("if (mode === \"projector\")", moveTabFocusStart));
  assert.ok(moveTabFocus.indexOf("?.focus()") < moveTabFocus.indexOf("setTab(tabs[nextIndex])"), "Subject tabs must move DOM focus before activating the next tab.");
});
