import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => readFile(path.join(root, file), "utf8");
const require = createRequire(import.meta.url);

function evaluateTypescript(source, overrides = {}) {
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  });
  const module = { exports: {} };
  new Function("require", "module", "exports", outputText)(
    id => Object.hasOwn(overrides, id) ? overrides[id] : require(id), module, module.exports,
  );
  return module.exports;
}

const catalogModule = evaluateTypescript(await read("app/visual-review-catalog.ts"));
const studioModule = evaluateTypescript(await read("app/visual-review-studio.tsx"), {
  "./visual-review-catalog": catalogModule,
  "./visual-review-studio.css": {},
  "next/image": { default: () => null },
});

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
  assert.deepEqual(catalogModule.visualAuditFacts.map(fact => fact.value), ["21", "20", "1", "8", "4", "0"]);
  assert.match(studio, /aria-label="Visual review inventory"/);
  assert.doesNotMatch(catalog, /Morning visuals borrowed from lessons|active public image, repeated twice|distinct images serving 37 unit worlds/);
});

test("undecided filtering covers image candidates and code concepts", async () => {
  const reviews = { M01: { decision: "selected" }, D01: { decision: "hold" }, D02: { decision: "rejected" } };
  const images = studioModule.filterUndecided(catalogModule.visualCandidates, reviews, true);
  const concepts = studioModule.filterUndecided(catalogModule.codeVisualConcepts, reviews, true);
  assert.equal(images.length, 20);
  assert.equal(concepts.length, 6);
  assert.ok(!images.some(item => item.id === "M01"));
  assert.ok(!concepts.some(item => item.id === "D01" || item.id === "D02"));
  assert.equal(studioModule.filterUndecided(catalogModule.codeVisualConcepts, reviews, false).length, 8);
  const studio = await read("app/visual-review-studio.tsx");
  assert.match(studio, /visibleConcepts = filterUndecided\(codeVisualConcepts, reviews, onlyUndecided\)/);
  assert.match(studio, /visibleConcepts\.map\(concept/);
});

test("print summary renders all 29 records with textual decisions, notes, and reuse permissions", async () => {
  const markup = renderToStaticMarkup(React.createElement(studioModule.VisualReviewPrintSummary, {
    reviews: {
      M01: { decision: "selected", note: "Keep the full-width crop.\nPreserve the left-hand clues.", allowReuse: true },
      D01: { decision: "hold", note: "Needs a classroom check.", allowReuse: false },
      D02: { decision: "rejected" },
    },
  }));
  assert.equal((markup.match(/<article>/g) ?? []).length, 29);
  assert.match(markup, /All 29 visual review records/);
  for (const label of ["Selected", "Hold", "Rejected", "Undecided"]) {
    assert.ok(markup.includes(`<dt>Decision</dt><dd>${label}</dd>`));
  }
  assert.match(markup, /Keep the full-width crop\.\nPreserve the left-hand clues\./);
  assert.match(markup, /Needs a classroom check\./);
  assert.match(markup, /No note recorded\./);
  assert.match(markup, /<dd>Allowed<\/dd>/);
  assert.match(markup, /<dd>Not allowed<\/dd>/);
  assert.match(markup, /regardless of the screen filters/);
  const styles = await read("app/visual-review-studio.css");
  assert.match(styles, /\.visual-review-print-summary\{display:none\}/);
  assert.match(styles, /\.visual-review \.visual-review-print-summary\{display:block!important;color:#000;background:#fff/);
  assert.match(styles, /white-space:pre-wrap;overflow-wrap:anywhere/);
});

test("large-text mode enlarges every small diagram label and allows compact layouts to reflow", async () => {
  const styles = await read("app/visual-review-studio.css");
  for (const selector of [".concept-shape b", ".concept-compass span", ".concept-roles small", ".concept-story small", ".concept-source small", ".concept-source b", ".concept-source p", ".concept-student span", ".concept-family span", ".concept-year span"]) {
    assert.ok(styles.includes(selector));
  }
  assert.match(styles, /\.large-text-mode \.visual-review \.code-visual-review :where\([^\n]+\)\{font-size:max\(1em,16px\);line-height:1\.45\}/);
  assert.match(styles, /\.large-text-mode \.visual-review \.concept-shape\{grid-template-columns:1fr/);
  assert.match(styles, /\.large-text-mode \.visual-review \.concept-year\{display:grid/);
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
