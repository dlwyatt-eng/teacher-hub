import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const componentUrl = new URL("../app/calendar-provocations-page.tsx", import.meta.url);
const componentSource = await readFile(componentUrl, "utf8");
const pack = JSON.parse(await readFile(new URL("../content/master-inquiry-pack-v1.json", import.meta.url), "utf8"));
const target = pack.calendarProvocations.find((item) => item.id === "truth-records-responsibility");
const rehearsal = target.listeningRehearsal;

// Exercise the actual TSX renderer without writing a test bundle or requiring a browser.
const requireFromComponent = createRequire(componentUrl);
const compiled = ts.transpileModule(componentSource, {
  fileName: "calendar-provocations-page.tsx",
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
const componentModule = { exports: {} };
const printModule = { exports: {} };
const printSource = await readFile(new URL("../app/print-support.ts", import.meta.url), "utf8");
const printCompiled = ts.transpileModule(printSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
new Function("module", "exports", printCompiled)(printModule, printModule.exports);
new Function("require", "module", "exports", compiled)(
  (specifier) => specifier === "./print-support" ? printModule.exports : specifier.endsWith(".css") ? {} : requireFromComponent(specifier),
  componentModule,
  componentModule.exports,
);
const { CalendarListeningRehearsal, CalendarProvocationsPage } = componentModule.exports;
const escapedText = (value) => renderToStaticMarkup(createElement("span", null, value)).slice(6, -7);

test("only the reconciliation scaffold supplies the complete, explicitly fictional listening rehearsal", () => {
  assert.deepEqual(pack.calendarProvocations.filter((item) => item.listeningRehearsal).map((item) => item.id), [target.id]);
  for (const field of ["id", "title", "goal", "attribution", "boundary", "teacherNote", "returnToAuthentic"]) assert.ok(rehearsal[field]?.trim(), `${field} must be supplied.`);
  assert.equal(rehearsal.sourceCards.length, 2);
  for (const card of rehearsal.sourceCards) {
    for (const field of ["id", "title", "context", "text"]) assert.ok(card[field]?.trim(), `Source card ${card.id} needs ${field}.`);
    assert.match(card.title, /fictional/i);
    assert.match(card.context, /fictional|invented/i);
    assert.match(card.context, /Tuesday/);
  }
  assert.equal(rehearsal.prompts.length, 3);
  assert.equal(rehearsal.finishFrame.length, 4);
  assert.match(rehearsal.attribution, /^Classroom OS/);
  assert.match(rehearsal.boundary, /not survivor testimony, Indigenous knowledge, historical evidence, or an analogy for residential schools/);
  assert.match(rehearsal.teacherNote, /does not prove the meeting happened or everyone received the message/);
  assert.match(rehearsal.teacherNote, /no role-play is required/);
  assert.match(rehearsal.returnToAuthentic, /only after previewing its exact NCTR or Nation-authored source/);
  assert.equal(target.source.href, "https://nctr.ca/education/");
  assert.match(target.fallback, /Open fictional listening rehearsal/);
  assert.doesNotMatch(target.fallback, /supplied fictional source/);
});

test("the actual standalone rehearsal renderer exposes all source text, attribution, prompts, and finish frames", () => {
  const html = renderToStaticMarkup(createElement(CalendarListeningRehearsal, { rehearsal, onReturn() {} }));
  const requiredText = [
    rehearsal.title, rehearsal.goal, rehearsal.attribution, rehearsal.boundary,
    ...rehearsal.sourceCards.flatMap((card) => [card.title, card.context, card.text]),
    ...rehearsal.prompts, ...rehearsal.finishFrame, rehearsal.teacherNote, rehearsal.returnToAuthentic,
  ];
  for (const text of requiredText) assert.ok(html.includes(escapedText(text)), `The rendered rehearsal must include ${text}.`);
  for (const authenticText of [target.title, target.learning, target.hook, target.discussion, target.product, target.source.label]) {
    assert.equal(html.includes(escapedText(authenticText)), false, `The rehearsal must not inherit authentic lesson content: ${authenticText}`);
  }
  assert.match(html, /aria-labelledby="calendar-rehearsal-title"/);
  assert.match(html, /id="calendar-rehearsal-title" tabindex="-1"/);
  assert.match(html, /Print fictional rehearsal/);
  assert.match(html, /Back to authentic-source lesson/);
  assert.doesNotMatch(html, /<iframe|<img|href="https:/);
});

test("the authentic teacher and student routes preserve NCTR attribution until rehearsal is explicitly selected", () => {
  for (const audience of ["teacher", "student"]) {
    const html = renderToStaticMarkup(createElement(CalendarProvocationsPage, { initialProvocationId: target.id, audience }));
    assert.ok(html.includes(escapedText(target.source.label)));
    assert.ok(html.includes(escapedText(target.title)));
    assert.match(html, /Open fictional listening rehearsal/);
    assert.equal(html.includes(escapedText(rehearsal.sourceCards[0].text)), false, "Do not silently substitute the fictional source into the authentic lesson.");
  }
});

test("the student rehearsal omits teacher facilitation notes while preserving its boundary and return guidance", () => {
  const html = renderToStaticMarkup(createElement(CalendarListeningRehearsal, { rehearsal, audience: "student", onReturn() {} }));
  assert.equal(html.includes(escapedText(rehearsal.teacherNote)), false);
  for (const text of [rehearsal.student.boundary, rehearsal.student.returnToAuthentic, rehearsal.student.care, ...rehearsal.sourceCards.map((card) => card.text)]) assert.ok(html.includes(escapedText(text)));
});

test("other lessons do not expose the reconciliation-only rehearsal action", () => {
  for (const provocation of pack.calendarProvocations.filter((item) => item.id !== target.id)) {
    const html = renderToStaticMarkup(createElement(CalendarProvocationsPage, { initialProvocationId: provocation.id }));
    assert.doesNotMatch(html, /Open fictional listening rehearsal/);
  }
});

test("lesson and audience changes remount isolated rehearsal state, while print preserves the complete card", async () => {
  assert.match(componentSource, /CalendarProvocationRoute key=\{`\$\{selected\.id\}:\$\{audience\}`\}/);
  assert.match(componentSource, /const \[rehearsalOpen, setRehearsalOpen\] = useState\(false\)/);
  assert.match(componentSource, /if \(rehearsalOpen && rehearsal\) \{\s*return <CalendarListeningRehearsal/);
  assert.match(componentSource, /<CalendarListeningRehearsal rehearsal=\{rehearsal\} audience=\{audience\}/);
  assert.match(componentSource, /onReturn=\{\(\) => setRehearsalOpen\(false\)\}/);
  assert.match(componentSource, /headingRef\.current\?\.focus\(\)/);
  assert.match(componentSource, /openButtonRef\.current\?\.focus\(\)/);
  assert.match(componentSource, /printClosest\(event\.currentTarget, "\.calendar-rehearsal"\)/);
  const css = await readFile(new URL("../app/calendar-provocations-page.css", import.meta.url), "utf8");
  assert.match(css, /@media print\{\.calendar-rehearsal-launch,\.calendar-rehearsal__actions\{display:none!important\}/);
  assert.match(css, /\.calendar-rehearsal__sources\{display:block\}/);
  assert.match(css, /\.calendar-rehearsal__sources article\{[^}]*break-inside:avoid/);
  assert.match(css, /body:has\(\.calendar-rehearsal\) \*:not\(:has\(\.calendar-rehearsal\)\):not\(\.calendar-rehearsal\):not\(\.calendar-rehearsal \*\)\{display:none!important\}/);
});
