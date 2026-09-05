import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  PUBLIC_WINDOW_KEYS,
  PUBLIC_WINDOW_SCHEMA,
  manifestChecksum,
  projectPublicWindow,
} from "./public-window-projection.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = JSON.parse(await readFile(path.join(root, "content", "current-learning-window-v2.json"), "utf8"));
const published = JSON.parse(await readFile(path.join(root, "public", "generated", "public-window-v2.json"), "utf8"));

assert.equal(published.schemaVersion, PUBLIC_WINDOW_SCHEMA, "Public-window schema version is stale.");
assert.equal(published.contentVersion, source.contentVersion, "Public-window content version is stale.");
assert.equal(published.sourceUpdatedAt, source.sourceUpdatedAt, "Public-window source date is stale.");
assert.deepEqual(published.window, projectPublicWindow(source.window), "Public-window primary window differs from the safe canonical projection.");
assert.deepEqual(published.windows, [source.window, ...source.phaseOverrides].map(projectPublicWindow), "Public-window phase list differs from the safe canonical projection.");

for (const [index, window] of published.windows.entries()) {
  assert.deepEqual(Object.keys(window), [...PUBLIC_WINDOW_KEYS], `Public window ${index + 1} contains a private or unexpected field.`);
  assert.equal(Object.hasOwn(window, "teacher"), false, `Public window ${index + 1} exposes teacher planning.`);
  assert.equal(Object.hasOwn(window, "source"), false, `Public window ${index + 1} exposes its private source pipeline.`);
  assert.equal(Object.hasOwn(window, "deliveryRoutes"), false, `Public window ${index + 1} exposes delivery operations.`);
  assert.equal(Object.hasOwn(window, "toolActivityIds"), false, `Public window ${index + 1} exposes teacher tool routing.`);
}

const expectedChecksum = published.checksum;
const actualChecksum = manifestChecksum(published);
assert.equal(expectedChecksum, actualChecksum, "Public-window checksum is invalid.");

console.log(`Verified ${source.contentVersion} and its public checksum.`);
