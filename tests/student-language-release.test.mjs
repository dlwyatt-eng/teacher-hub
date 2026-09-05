import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { moduleLoader } from "./helpers/load-rendered-module.mjs";

const root = path.resolve(import.meta.dirname, "..");
const blank = () => null;
const load = moduleLoader(root, {
  "next/image": ({ priority, ...props }) => React.createElement("img", props),
  "./classroom-companions": { ClassroomCompanion: blank, CompanionMark: blank },
  "./ttoc-day-plan": { AddToDayPlanButton: blank },
});
const { rotationSessions, rotationTtocRunSteps, ROTATION_DURATIONS, ROTATION_STUDENT_CHOICES } = load("app/first-week-rotation-data.ts");
const { default: FirstWeekMission } = load("app/first-week-mission.tsx");
const { StudentProvocationPlayer, projectorPartsFor, CalendarListeningRehearsal } = load("app/calendar-provocations-page.tsx");
const pack = load("content/master-inquiry-pack-v1.json");
const { STUDENT_FINISH_SUMMARIES } = load("app/student-finish-summaries.ts");
const contracts = load("app/student-lesson-contract.ts");
const render = (component, props) => renderToStaticMarkup(React.createElement(component, props));
const escaped = text => render("span", { children: text }).slice(6, -7);

test("all five actual first-week student screens use authored directions, examples, finishes and help", () => {
  assert.equal(rotationSessions.length, 5);
  for (const session of rotationSessions) {
    const html = render(FirstWeekMission, { audience: "student", initialSessionId: session.id });
    for (const field of ["why", "firstAction", "example", "finish", "privacy", "help"]) assert.ok(html.includes(escaped(session.student[field])), session.id + " missing " + field);
    for (const step of session.student.steps) assert.ok(html.includes(escaped(step)));
    assert.ok(html.includes(escaped(ROTATION_STUDENT_CHOICES)));
    assert.match(html, /Not graded/);
    assert.doesNotMatch(html, /substantive output|meaning-making|private transfer|receiving teacher|first-pass|formative evidence|labelled region/i);
    assert.doesNotMatch(html, /Add .*min route|Available block/);
  }
});

test("staff planning fields cannot leak into first-week student screens", () => {
  const session = rotationSessions[0];
  const original = { learningIntention: session.learningIntention, makeSteps: session.makeSteps, success: session.success, product: session.product };
  try {
    for (const field of Object.keys(original)) session[field] = Array.isArray(original[field]) ? ["STAFF_ONLY_SENTINEL"] : "STAFF_ONLY_SENTINEL";
    assert.doesNotMatch(render(FirstWeekMission, { audience: "student", initialSessionId: session.id }), /STAFF_ONLY_SENTINEL/);
  } finally { Object.assign(session, original); }
});

test("first-week quantities, no-reason skips, private originals and saved TTOC steps survive", () => {
  const expected = [/six circles[\s\S]*three/i, /six boxes/i, /four[\s\S]*three/i, /three boxes/i, /(?=[\s\S]*six parts)(?=[\s\S]*two)/i];
  for (const [i, session] of rotationSessions.entries()) {
    const text = [session.student.firstAction, ...session.student.steps, session.student.finish].join(" ");
    assert.match(text, expected[i], session.id);
    assert.match(session.student.finish, /skip/i);
    assert.match(session.student.help, /no catch-up|not.*catch-up|do not.*catch-up/i);
    if (session.page === 2) assert.match(session.student.privacy, /not go on display/);
    else {
      assert.match(session.student.privacy, /original page stays private/);
      assert.match(session.student.privacy, /again.*safe part.*choose.*separate page/);
      assert.match(session.student.privacy, /say no/);
    }
    for (const duration of ROTATION_DURATIONS) {
      const steps = rotationTtocRunSteps(session, duration);
      assert.equal(steps.length, 8);
      assert.ok(steps.every(step => step.length <= 320), session.id + " saved step overflow");
      assert.match(steps.join(" "), /Originals always stay private/);
      assert.doesNotMatch(steps.join(" "), /originals?[^.]*private unless/i);
    }
  }
});

test("all 42 calendar student screens use the student copy, keep source credit, and retain every stage", () => {
  assert.equal(pack.calendarProvocations.length, 7);
  for (const source of pack.calendarProvocations) {
    const provocation = { ...source, learning: "STAFF_ONLY_SENTINEL", hook: "STAFF_ONLY_SENTINEL", before: "STAFF_ONLY_SENTINEL", noticeWonder: ["STAFF_ONLY_SENTINEL"], questions: ["STAFF_ONLY_SENTINEL"], discussion: "STAFF_ONLY_SENTINEL", product: "STAFF_ONLY_SENTINEL", lens: "STAFF_ONLY_SENTINEL" };
    const parts = projectorPartsFor(provocation);
    assert.equal(parts.length, 6);
    for (let index = 0; index < 6; index++) {
      const html = render(StudentProvocationPlayer, { provocation, initialPartIndex: index });
      assert.ok(html.includes(escaped(source.source.label)));
      assert.ok(html.includes(escaped(source.student.productSummary)));
      assert.ok(html.includes(escaped(parts[index].body)));
      assert.ok(html.includes(escaped(parts[index].title)));
      assert.doesNotMatch(html, /STAFF_ONLY_SENTINEL/);
    }
  }
});

test("student fictional practice keeps actual source cards and explicit historical boundaries", () => {
  const rehearsal = pack.calendarProvocations.find(p => p.listeningRehearsal).listeningRehearsal;
  const html = render(CalendarListeningRehearsal, { rehearsal, audience: "student", onReturn() {} });
  for (const text of [rehearsal.student.goal, rehearsal.student.boundary, rehearsal.student.care, rehearsal.student.returnToAuthentic, ...rehearsal.student.prompts, ...rehearsal.finishFrame, ...rehearsal.sourceCards.map(c => c.text)]) assert.ok(html.includes(escaped(text)));
  assert.doesNotMatch(html, /Require observation without reenactment/);
  assert.ok(!html.includes(escaped(rehearsal.teacherNote)));
  assert.match(rehearsal.student.boundary, /not survivor testimony, Indigenous knowledge, or evidence about history/);
  assert.match(rehearsal.student.boundary, /not be used as a comparison with residential schools/);
});

test("all 57 reviewed contracts have a concrete product summary without replacing full finish criteria", () => {
  assert.equal(contracts.reviewedStudentLessonIds.length, 57);
  assert.deepEqual(Object.keys(STUDENT_FINISH_SUMMARIES).sort(), [...contracts.reviewedStudentLessonIds].sort());
  for (const id of contracts.reviewedStudentLessonIds) {
    assert.ok(STUDENT_FINISH_SUMMARIES[id].length >= 40, id);
    assert.ok(contracts.resolveStudentLessonContract(id).finishEvidence.length >= 3, id);
    assert.doesNotMatch(STUDENT_FINISH_SUMMARIES[id], /substantive|learner-flow|artifact|complete all .* checks/i);
  }
  const renderer = readFileSync(path.join(root, "app/learning-program.tsx"), "utf8");
  assert.match(renderer, /studentContract\.finishEvidence\.map/);
  assert.match(renderer, /WE WILL MAKE \/ SHOW/);
  assert.match(renderer, /product=\{studentFinishSummary/);
});

test("the private learning guide permits fictional examples and never requires a public excerpt", () => {
  const contract = contracts.resolveStudentLessonContract("learning-user-manual");
  assert.match(contract.why, /Made-up school examples are welcome/);
  assert.match(contract.firstAction, /invent a school example/);
  assert.match(contract.steps[0].action, /two real or made-up school moments/i);
  assert.match(contract.steps.at(-1).action, /or keep it all private/);
  assert.match(contract.finishEvidence.at(-1), /choice to keep the guide private/i);
  assert.match(contract.saveAction.message, /If you choose to share.*permission again.*safe part.*separate Learning Story/);
  assert.match(contract.saveAction.message, /Never upload the original/);
  assert.match(contract.finishEvidence.join(" "), /Two strengths.*Two helpful conditions/);
});
