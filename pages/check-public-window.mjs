import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = JSON.parse(await readFile(path.join(root, "content", "current-learning-window-v2.json"), "utf8"));
const published = JSON.parse(await readFile(path.join(root, "public", "generated", "public-window-v2.json"), "utf8"));

assert.equal(published.schemaVersion, source.schemaVersion, "Public-window schema version is stale.");
assert.equal(published.contentVersion, source.contentVersion, "Public-window content version is stale.");
assert.equal(published.sourceUpdatedAt, source.sourceUpdatedAt, "Public-window source date is stale.");
assert.deepEqual(published.window, source.window, "Public-window primary window differs from the canonical source.");
assert.deepEqual(published.windows, [source.window, ...source.phaseOverrides], "Public-window phase list differs from the canonical source.");

const expectedChecksum = published.checksum;
const checksumBody = { ...published };
delete checksumBody.checksum;
const serialized = `${JSON.stringify(checksumBody, null, 2)}\n`;
const actualChecksum = `sha256:${createHash("sha256").update(serialized).digest("hex")}`;
assert.equal(expectedChecksum, actualChecksum, "Public-window checksum is invalid.");

console.log(`Verified ${source.contentVersion} and its public checksum.`);
