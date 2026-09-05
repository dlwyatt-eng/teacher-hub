import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => readFile(path.join(root, file), "utf8");

test("the Visual Review Studio reports its complete twenty-one-image catalog", async () => {
  const [catalog, studio] = await Promise.all([
    read("app/visual-review-catalog.ts"),
    read("app/visual-review-studio.tsx"),
  ]);
  const imageCatalog = catalog.split("export const codeVisualConcepts")[0];
  const imageIds = [...imageCatalog.matchAll(/\bid: "([A-Z]+\d+)"/g)].map((match) => match[1]);
  assert.equal(imageIds.length, 21);
  assert.equal(new Set(imageIds).size, 21);
  assert.match(studio, /Twenty-one original image candidates/);
  assert.match(catalog, /value: "21", label: "new generated candidates in this review"/);
});

test("lesson image pickers retain asset-specific alternative text", async () => {
  const [types, supports, learning] = await Promise.all([
    read("app/program-types.ts"),
    read("app/program-supports.ts"),
    read("app/learning-program.tsx"),
  ]);
  assert.match(types, /alt\?: string/);
  for (const phrase of [
    "Clean classroom science bench with magnets, sieves, skimming tools",
    "Overhead tabletop network model with a server, six picture pieces",
    "Illustrated classroom human-network drama with students at device",
    "Open wooden discovery drawer containing varied worn everyday objects",
    "Fictional school lost-and-found shelf with a mitten",
    "Warm workbench still life of repaired and worn everyday objects",
  ]) assert.match(supports, new RegExp(phrase));
  assert.match(learning, /selected\.alt \?\? `Object story choice:/);
  assert.match(learning, /selected\.image\.alt \?\? selected\.image\.label/);
  assert.match(learning, /const imageAlt = image\?\.alt \?\?/);
  assert.match(learning, /GENERATED FICTIONAL SCIENCE BENCH · PROPERTY BEFORE TOOL/);
});

test("News Lens uses the orientation art only as a teacher-home thumbnail and projects the authentic source card", async () => {
  const [state, screen, home] = await Promise.all([
    read("app/morning-screen-state.ts"),
    read("app/morning-screen.tsx"),
    read("app/teacher-home-operations.tsx"),
  ]);
  const newsLens = state.split('id: "news-lens" as const,')[1]?.split("  }),")[0] ?? "";
  assert.match(newsLens, /sourceCard:/);
  assert.match(newsLens, /imageSrc: "\/images\/visual-review\/newsroom-source-desk-v1\.webp"/);
  assert.match(newsLens, /Fictional source-analysis desk with an unlabeled map/);
  assert.match(screen, /if \(!activity\.sourceCard\) return <img/);
  assert.match(home, /src=\{activity\.imageSrc\} alt=\{activity\.imageAlt\}/);
});

test("public-window illustration copy does not claim details the images cannot prove", async () => {
  const source = JSON.parse(await read("content/current-learning-window-v2.json"));
  const byId = Object.fromEntries(source.phaseOverrides.map((phase) => [phase.id, phase.shared.visual]));

  assert.match(byId["first-formed-class-week"].alt, /Fictional Grade 6 classroom scene/);
  assert.doesNotMatch(byId["first-formed-class-week"].alt, /object story|number evidence|school grounds/i);

  assert.match(byId["surrey-place-and-election"].alt, /Fictional source-analysis desk with an unlabeled map/);
  assert.match(byId["surrey-place-and-election"].caption, /not Surrey evidence/i);
  assert.match(byId["surrey-election-results-and-next-steps"].caption, /not a results source/i);
  assert.doesNotMatch(byId["surrey-place-and-election"].alt, /Surrey map|dated article/i);
  assert.doesNotMatch(byId["surrey-election-results-and-next-steps"].alt, /dated text|results chart/i);
});
