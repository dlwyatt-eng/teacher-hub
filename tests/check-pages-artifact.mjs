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
assert.ok(initialScriptGzip < 350_000, `Initial JavaScript exceeded the 350 KB gzip budget: ${initialScriptGzip} bytes.`);
assert.ok(initialStyleGzip < 110_000, `Initial CSS exceeded the 110 KB gzip budget: ${initialStyleGzip} bytes.`);
assert.ok(initialScriptGzip + initialStyleGzip < 450_000, `Initial code exceeded the 450 KB combined gzip budget: ${initialScriptGzip + initialStyleGzip} bytes.`);

const deferredScripts = emittedFiles.filter((file) => file.endsWith(".js") && !file.endsWith(path.basename(initialScriptRef)));
const deferredStyles = emittedFiles.filter((file) => file.endsWith(".css") && !file.endsWith(path.basename(initialStyleRef)));
assert.ok(deferredScripts.length >= 10, "Expected major Teacher Hub views to remain code-split.");
assert.ok(deferredStyles.length >= 8, "Expected major Teacher Hub styles to remain route-split.");

console.log(`Verified ${emittedFiles.length} emitted files, every copied public asset, and ${(initialScriptGzip / 1024).toFixed(1)} KB JS + ${(initialStyleGzip / 1024).toFixed(1)} KB CSS initial gzip.`);
