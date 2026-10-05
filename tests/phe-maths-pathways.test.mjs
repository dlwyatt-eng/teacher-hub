import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { moduleLoader } from "./helpers/load-rendered-module.mjs";

const root = path.resolve(import.meta.dirname, "..");
const { PheSequence, MathsReadiness, pheStages, mathsStages } = moduleLoader(root)("app/teaching-pathways.tsx");
const phe = JSON.parse(readFileSync(path.join(root, "content/phe-six-week-sequence.json"), "utf8"));
const maths = JSON.parse(readFileSync(path.join(root, "content/maths-readiness-pathways.json"), "utf8"));
const html = node => renderToStaticMarkup(node);
const textHtml = text => html(React.createElement(React.Fragment, null, text));
const stageHtml = stages => stages.map(stage => html(stage.content)).join("\n");

test("all eighteen PHE projections supply the actual task and a student-facing check", () => {
  for (const week of phe.weeks) for (const block of ["health", "pe1", "pe2"]) {
    const lesson = week[block];
    const stages = pheStages(week.id, block);
    assert.equal(stages.length, 4);
    assert.ok(html(stages[0].content).includes(textHtml(block === "health" ? week.studentPage.scenario : lesson.setup)));
    const prompts = block === "health" ? week.studentPage.prompts : lesson.studentPrompts;
    for (const prompt of prompts) assert.ok(html(stages[2].content).includes(textHtml(prompt)), `${lesson.id}: missing student task`);
    assert.ok(html(stages[3].content).includes(textHtml(lesson.studentCheck)));
    assert.ok(!html(stages[3].content).includes(textHtml(lesson.check)), `${lesson.id}: teacher observation in student check`);
  }
});

test("independent maths questions and fresh checks do not render their answer records", () => {
  const readiness = mathsStages("check");
  for (const [i, item] of maths.readiness.items.entries()) {
    assert.ok(html(readiness[i + 1].content).includes(textHtml(item.prompt)));
    assert.ok(!stageHtml(readiness).includes(textHtml(item.answer)));
  }
  for (const route of maths.routes) {
    const stages = mathsStages(route.id);
    assert.ok(html(stages[1].content).includes(textHtml(route.example.answer)), "teaching model is complete");
    for (const [i, item] of [...route.practice, ...route.recheck].entries()) {
      const rendered = html(stages[i + 2].content);
      assert.ok(rendered.includes(textHtml(item.prompt)));
      assert.ok(!rendered.includes(textHtml(item.answer)));
    }
  }
});

test("multiplication readiness ends at a teacher pause before the model is opened", () => {
  const gate = mathsStages("bridge-check");
  assert.equal(gate.at(-1).title, "Check with your teacher");
  const rendered = stageHtml(gate);
  for (const item of maths.bridge.items) {
    assert.ok(rendered.includes(textHtml(item.prompt)));
    assert.ok(!rendered.includes(textHtml(item.answer)));
  }
  assert.ok(!rendered.includes(textHtml(maths.bridge.model.prompt)));
  assert.ok(!rendered.includes("230 + 92 = 322"));
  assert.ok(stageHtml(mathsStages("bridge")).includes(textHtml(maths.bridge.model.answer)));
});

test("student page DOM excludes teacher plans, keys, and teacher downloads", () => {
  for (const Component of [PheSequence, MathsReadiness]) {
    const student = html(React.createElement(Component, { audience: "student" }));
    const teacher = html(React.createElement(Component, { audience: "teacher" }));
    assert.ok(!student.includes('class="teaching-pathway__teacher"'));
    assert.ok(!student.includes("Teacher answer key"));
    assert.ok(!student.includes("Teacher_Guide.pdf"));
    assert.ok(teacher.includes('class="teaching-pathway__teacher"'));
    assert.ok(teacher.includes("Teacher_Guide.pdf"));
  }
});
