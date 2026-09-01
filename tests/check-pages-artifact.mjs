import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "pages-dist");
const publicDir = path.join(root, "public");

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? files(target) : [target];
  }))).flat();
}

const indexPath = path.join(dist, "index.html");
const index = await readFile(indexPath, "utf8");
assert.match(index, /\/teacher-hub\/assets\//, "Pages HTML is missing the repository base path.");
assert.doesNotMatch(index, /\/teacher-hub\/teacher-hub\//, "Pages base path is duplicated.");

for (const publicFile of await files(publicDir)) {
  const relative = path.relative(publicDir, publicFile);
  const builtFile = path.join(dist, relative);
  const [sourceStat, builtStat] = await Promise.all([stat(publicFile), stat(builtFile)]);
  assert.equal(builtStat.size, sourceStat.size, `Copied public file differs: ${relative}`);
}

const emittedFiles = (await files(dist)).filter((file) => /\.(?:html|css|js)$/.test(file));
const emittedEntries = await Promise.all(emittedFiles.map(async (file) => [
  path.relative(dist, file).split(path.sep).join("/"),
  await readFile(file, "utf8"),
]));
const emittedByPath = new Map(emittedEntries);
const emitted = emittedEntries.map(([, content]) => content).join("\n");
for (const phrase of ["Grade 6 Discovery Rotations", "Identity Constellation", "MANUAL MODE"]) {
  assert.ok(emitted.includes(phrase), `Fresh artifact is missing expected content: ${phrase}`);
}
for (const phrase of ["The Civic Evidence Room", "Open offline / print pack", "FICTIONAL PRACTICE CASE", "socialLesson", "socialScene"]) {
  assert.ok(emitted.includes(phrase), `Fresh artifact is missing Civic Evidence Room content: ${phrase}`);
}
for (const sourceUrl of [
  "https://electionsanddemocracy.ca/your-classroom/resources",
  "https://learn.parl.ca/en/games/game4/index.html",
  "https://www.surrey.ca/city-government/mayor-council",
  "https://www.bcafn.ca/about-bcafn/vision-mission",
]) {
  assert.ok(emitted.includes(sourceUrl), `Pages postbuild changed or dropped the Civic source: ${sourceUrl}`);
}
assert.doesNotMatch(emitted, /\/api\/morning-draft/, "Static artifact still contains the dead same-origin Morning API route.");
assert.doesNotMatch(emitted, /\/teacher-hub\/teacher-hub\//, "Built asset references contain a duplicated base path.");
assert.doesNotMatch(emitted, /["'(]\/assets\//, "Built code contains a root asset reference without the repository base path.");

const builtPaths = new Set(emittedByPath.keys());
const graph = new Map([...builtPaths].map((file) => [file, new Set()]));
function normalizeReference(reference, from) {
  if (reference.startsWith("/teacher-hub/")) return reference.slice("/teacher-hub/".length);
  if (reference.startsWith("assets/")) return reference;
  if (reference.startsWith("./")) return path.posix.normalize(path.posix.join(path.posix.dirname(from), reference));
  return null;
}

for (const [from, content] of emittedByPath) {
  const references = [
    ...content.matchAll(/\/teacher-hub\/(assets\/[A-Za-z0-9_.-]+\.(?:js|css))/g),
    ...content.matchAll(/(?<![A-Za-z0-9_/])(assets\/[A-Za-z0-9_.-]+\.(?:js|css))/g),
    ...content.matchAll(/(\.\/[A-Za-z0-9_.-]+\.(?:js|css))/g),
  ].map((match) => match[0].startsWith("/teacher-hub/") ? match[0] : match[1]);
  for (const reference of references) {
    const target = normalizeReference(reference, from);
    if (!target) continue;
    assert.ok(builtPaths.has(target), `Built reference is missing: ${from} -> ${target}`);
    graph.get(from)?.add(target);
  }
}

const reachable = new Set(["index.html"]);
const queue = ["index.html"];
while (queue.length) {
  const current = queue.shift();
  for (const target of graph.get(current) ?? []) {
    if (reachable.has(target)) continue;
    reachable.add(target);
    queue.push(target);
  }
}
for (const builtPath of builtPaths) {
  if (/^assets\/.*\.(?:js|css)$/.test(builtPath)) assert.ok(reachable.has(builtPath), `Emitted asset is unreachable from index.html: ${builtPath}`);
}

const htmlRefs = [...index.matchAll(/(?:src|href)="(\/teacher-hub\/[^"?#]+)["?#]/g)].map((match) => match[1]);
for (const ref of htmlRefs) {
  const relative = ref.replace(/^\/teacher-hub\//, "");
  await stat(path.join(dist, relative));
}

const initialScriptRef = index.match(/<script[^>]+src="(\/teacher-hub\/assets\/[^"?]+\.js)"/)?.[1];
const initialStyleRef = index.match(/<link[^>]+rel="stylesheet"[^>]+href="(\/teacher-hub\/assets\/[^"?]+\.css)"/)?.[1];
assert.ok(initialScriptRef, "Pages HTML is missing its initial JavaScript asset.");
assert.ok(initialStyleRef, "Pages HTML is missing its initial stylesheet.");
const [initialScript, initialStyle] = await Promise.all([
  readFile(path.join(dist, initialScriptRef.replace(/^\/teacher-hub\//, ""))),
  readFile(path.join(dist, initialStyleRef.replace(/^\/teacher-hub\//, ""))),
]);
const initialScriptGzip = gzipSync(initialScript, { level: 9 }).byteLength;
const initialStyleGzip = gzipSync(initialStyle, { level: 9 }).byteLength;
assert.ok(initialScript.toString("utf8").includes("/teacher-hub/"), "Initial JavaScript is missing the Pages base path loader.");
assert.ok(!initialScript.toString("utf8").includes("Try ‘Fleetwood’, ‘angles’, ‘forces’, or ‘weekly plan’"), "Deferred Search copy leaked into the initial JavaScript.");
assert.ok(emittedEntries.some(([file, content]) => file.endsWith(".js") && file !== initialScriptRef.replace(/^\/teacher-hub\//, "") && content.includes("Try ‘Fleetwood’, ‘angles’, ‘forces’, or ‘weekly plan’")), "Deferred Search index was not emitted.");
assert.ok(initialScriptGzip < 160_000, `Initial JavaScript exceeded the 160 KB gzip budget: ${initialScriptGzip} bytes.`);
assert.ok(initialStyleGzip < 110_000, `Initial CSS exceeded the 110 KB gzip budget: ${initialStyleGzip} bytes.`);
assert.ok(initialScriptGzip + initialStyleGzip < 270_000, `Initial code exceeded the 270 KB combined gzip budget: ${initialScriptGzip + initialStyleGzip} bytes.`);

const deferredScripts = emittedFiles.filter((file) => file.endsWith(".js") && !file.endsWith(path.basename(initialScriptRef)));
const deferredStyles = emittedFiles.filter((file) => file.endsWith(".css") && !file.endsWith(path.basename(initialStyleRef)));
assert.ok(deferredScripts.length >= 10, "Expected major Teacher Hub views to remain code-split.");
assert.ok(deferredStyles.length >= 8, "Expected major Teacher Hub styles to remain route-split.");
for (const prefix of ["site-search-dialog-", "subject-hub-", "inquiry-experience-", "school-year-planning-", "year-plan-page-"]) {
  assert.ok(deferredScripts.some((file) => path.basename(file).startsWith(prefix)), `Expected deferred chunk: ${prefix}`);
}

function emittedChunk(prefix, extension) {
  const entry = emittedEntries.find(([file]) => path.basename(file).startsWith(prefix) && file.endsWith(extension));
  assert.ok(entry, `Expected emitted ${extension} chunk: ${prefix}`);
  return entry;
}

const [, socialProgramJs] = emittedChunk("social-program-", ".js");
const [, socialStudiesJs] = emittedChunk("social-studies-program-", ".js");
const [, socialStudiesCss] = emittedChunk("social-studies-program-", ".css");
assert.ok(gzipSync(socialProgramJs, { level: 9 }).byteLength < 32_000, "Shared Social Studies data exceeded the 32 KB gzip budget.");
assert.ok(gzipSync(socialStudiesJs, { level: 9 }).byteLength < 85_000, "Social Studies experience code exceeded the 85 KB gzip budget.");
assert.ok(gzipSync(socialStudiesCss, { level: 9 }).byteLength < 40_000, "Social Studies experience styles exceeded the 40 KB gzip budget.");
assert.ok(!initialScript.toString("utf8").includes("FICTIONAL JUNIPER PARK"), "Civic case copy leaked into the initial JavaScript.");
assert.ok(socialStudiesJs.includes("FICTIONAL JUNIPER PARK"), "Deferred Social Studies chunk is missing the Juniper Park case.");

console.log(`Verified ${emittedFiles.length} emitted files, every copied public asset, and ${(initialScriptGzip / 1024).toFixed(1)} KB JS + ${(initialStyleGzip / 1024).toFixed(1)} KB CSS initial gzip.`);
