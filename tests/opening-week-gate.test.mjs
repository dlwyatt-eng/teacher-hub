import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { readFile, access } from "node:fs/promises";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { moduleLoader } from "./helpers/load-rendered-module.mjs";

const root = path.resolve(import.meta.dirname, "..");
const load = moduleLoader(root);
const { OpeningWeekCockpit, OpeningWelcome } = load("app/opening-week.tsx");

test("Home cockpit exposes the opening sequence, actual downloads and canonical public routes", async () => {
  const html = renderToStaticMarkup(React.createElement(OpeningWeekCockpit, { onNavigate() {} }));
  for (const text of ["START HERE", "Project simple welcome", "Project Discovery directions", "Project first maths lesson", "If technology fails", "Hand-in, extra time and colouring", "not yet released", "face-down", "no post"]) assert.ok(html.includes(text), text);
  for (const file of ["Grade_6_Discovery_Booklet.pdf", "magnitude-number-lines-and-periods.pdf"]) {
    assert.ok(html.includes(file));
    await access(path.join(root, "public/printables", file));
  }
  assert.ok(html.includes("https://dlwyatt-eng.github.io/learn/"));
  assert.ok(html.includes("https://dlwyatt-eng.github.io/equity-hub/"));
  assert.ok(html.includes("Older ChatGPT Site copies are not this release"));
});

test("Simple welcome is a student-only projection without planning or answer keys", async () => {
  const html = renderToStaticMarkup(React.createElement(OpeningWelcome));
  assert.match(html, /Choose an available seat/);
  assert.match(html, /speak, point or pass/);
  assert.doesNotMatch(html, /teacher-only|answer key|publishing|deployment|localStorage/i);
  const source = await readFile(path.join(root, "app/page.tsx"), "utf8");
  assert.match(source, /active === "Opening Welcome" \? \(\s*<OpeningWelcome/);
  assert.match(source, /<OpeningWeekCockpit onNavigate=\{onNavigate\}/);
});

test("Opening magnitude teacher route starts with maths and saves source work for later", async () => {
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");
  const start = page.indexOf("const firstFormedClassWeekSeed");
  const section = page.slice(start, start + 12000);
  assert.match(section, /0\.008/);
  assert.doesNotMatch(section, /four number lines|Place 0\.8|place 0\.8/);
  const program = await readFile(path.join(root, "app/learning-program.tsx"), "utf8");
  assert.match(program, /experience.id === "magnitude-gallery" \? \[\.\.\.studentContract.steps, sourceStep\]/);
});

test("Large Text enlarges maths explanations beyond their normal projector size", async () => {
  const css = await readFile(path.join(root, "app/math-program.css"), "utf8");
  assert.match(css, /\.large-text-mode \.student-math-workshops :is\(\.math-model-steps li,[^\n]+font-size:clamp\(1\.6rem,2\.1vw,2rem\)/);
  assert.match(css, /\.math-division-worked th,\.math-division-worked td[^\n]+font-size:1\.45rem/);
});
