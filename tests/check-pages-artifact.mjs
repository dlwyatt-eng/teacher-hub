import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
const emitted = (await Promise.all(emittedFiles.map((file) => readFile(file, "utf8")))).join("\n");
for (const phrase of ["Grade 6 Discovery Rotations", "Identity Constellation", "MANUAL MODE"]) {
  assert.ok(emitted.includes(phrase), `Fresh artifact is missing expected content: ${phrase}`);
}
assert.doesNotMatch(emitted, /\/api\/morning-draft/, "Static artifact still contains the dead same-origin Morning API route.");
assert.doesNotMatch(emitted, /\/teacher-hub\/teacher-hub\//, "Built asset references contain a duplicated base path.");

const htmlRefs = [...index.matchAll(/(?:src|href)="(\/teacher-hub\/[^"?#]+)["?#]/g)].map((match) => match[1]);
for (const ref of htmlRefs) {
  const relative = ref.replace(/^\/teacher-hub\//, "");
  await stat(path.join(dist, relative));
}

console.log(`Verified ${emittedFiles.length} emitted files and every copied public asset.`);
