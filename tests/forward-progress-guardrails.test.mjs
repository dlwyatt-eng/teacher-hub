import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => readFile(path.join(root, file), "utf8");

test("approved Visual Review Studio assets are connected to production experiences", async () => {
  const worlds = await read("app/unit-worlds.ts");
  const supports = await read("app/program-supports.ts");
  const ai = await read("app/ai-tensions-lab.tsx");
  for (const asset of ["unit-world-storywood-crossroads-v1.webp", "unit-world-listening-grove-v1.webp", "unit-world-house-many-windows-v1.webp"]) assert.match(worlds, new RegExp(asset));
  assert.match(supports, /mixtures-separation-station-v1\.webp/);
  for (const asset of ["technology-choices-mural-v1.webp", "technology-scenario-table-v1.webp", "technology-check-the-answer-v1.webp"]) assert.match(ai, new RegExp(asset));
  for (const role of ["THINKER", "PROMPTER", "CHECKER", "CONNECTOR \/ RECORDER"]) assert.match(ai, new RegExp(role));
});

test("large-text mode is persisted and materially changes reading text", async () => {
  const page = await read("app/page.tsx");
  const css = await read("app/readability.css");
  assert.match(page, /wyatt-large-text-v1/);
  assert.match(page, /aria-pressed=\{largeText\}/);
  assert.match(page, /large-text-mode/);
  assert.match(css, /\.large-text-mode \.page/);
  assert.match(css, /18px/);
});

test("the public export has an explicit privacy projection", async () => {
  const sync = await read("pages/sync-public-window.mjs");
  const check = await read("pages/check-public-window.mjs");
  const projection = await read("pages/public-window-projection.mjs");
  assert.match(sync, /buildPublicManifest/);
  assert.match(check, /contains a private or unexpected field/);
  assert.match(projection, /PUBLIC_WINDOW_KEYS/);
  assert.match(projection, /shared/);
  assert.match(projection, /student/);
  assert.match(projection, /family/);
});
