import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { moduleLoader } from "./helpers/load-rendered-module.mjs";

const root = path.resolve(import.meta.dirname, "..");
const blank = () => null;
const load = moduleLoader(root, {
  "next/image": ({ priority, unoptimized, fill, ...props }) => React.createElement("img", props),
  "./classroom-companions": { ClassroomCompanion: blank, CompanionMark: blank },
  "./ttoc-day-plan": { AddToDayPlanButton: blank },
});
const programs = load("app/integrated-programs.ts");
const { curriculum } = load("app/curriculum.ts");
const { StudentLearningProgram } = load("app/learning-program.tsx");
const { experienceKits } = load("app/program-supports.ts");
const supports = load("app/projector-lesson-supports.ts");
const { SciencePrintPack } = load("app/inquiry-experience.tsx");
const { scienceLessons } = load("app/science-program.ts");
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));

for (const id of ["digital-identity-forensics", "strengths-action-quest"]) {
  test(id + " opens on supplied student case cards, not a missing resource", () => {
    const program = programs.careerProgram;
    const html = render(StudentLearningProgram, { program, record: curriculum[program.subject], selectedExperienceId: id, onExperience() {} });
    assert.match(html, /READ THE SUPPLIED CASE/);
    if (id === "digital-identity-forensics") {
      assert.match(html, /Audience setting: Public/);
      assert.match(html, /fictional Oak Park/);
      assert.match(html, /No artist, source, or reuse permission/);
    } else {
      assert.match(html, /SAMPLE ACTION NOTE/);
      assert.match(html, /Place two books 10 cm apart/);
      assert.match(html, /These jobs are mixed up/);
    }
    assert.doesNotMatch(html, /TEACHER-ONLY ANSWER KEY/);
    assert.ok(experienceKits[id].cards.length >= 5);
    assert.equal(supports.resolveProjectorLessonSupport({ id }).isCustom, true);
    assert.deepEqual(supports.validateProjectorLessonSupport(supports.projectorLessonSupports[id]), []);
  });
}

test("Gate Pass uses four gates, eight example players, and one-rule comparison", () => {
  const program = programs.pheProgram;
  const html = render(StudentLearningProgram, { program, record: curriculum[program.subject], selectedExperienceId: "everyone-in-game", onExperience() {} });
  assert.equal((html.match(/data-cone-gate=/g) ?? []).length, 4);
  assert.equal((html.match(/data-gate-player=/g) ?? []).length, 8);
  assert.match(html, /Three of eight players received a pass; five mostly waited/);
  assert.match(html, /Six of eight players received a pass; two mostly waited/);
  const content = html + JSON.stringify(experienceKits["everyone-in-game"]) + supports.projectorSupportText(supports.projectorLessonSupports["everyone-in-game"]);
  assert.doesNotMatch(content, /five passes to five|five different teammates|sitting out until|Three tested rule remixes/i);
  assert.match(content, /three counts/);
  assert.match(content, /no elimination|Nobody is eliminated/);
  assert.deepEqual(supports.validateProjectorLessonSupport(supports.projectorLessonSupports["everyone-in-game"]), []);
});

test("Forces student print target keeps all questions and no answer key", () => {
  const lesson = scienceLessons.find(item => item.id === "force-sprint");
  const html = render(SciencePrintPack, { lesson });
  for (let number = 1; number <= 6; number++) assert.match(html, new RegExp(number + "\\. "));
  assert.match(html, /First answers/);
  assert.match(html, /Revised answers/);
  assert.match(html, /Exit model/);
  assert.doesNotMatch(html, /Answer key|1 B · 2 B|3 C · 4 C/i);
  assert.match(lesson.teacherPrep.answerKey.join(" "), /1 B · 2 B · 3 C · 4 C · 5 C · 6 A/);
});
