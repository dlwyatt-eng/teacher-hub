import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

test("Social Studies lesson and scene selections have durable URL routing", async () => {
  const page = await read("app/page.tsx");
  const subjectHub = await read("app/subject-hub.tsx");

  assert.match(page, /const routeKeys = \[[^\]]*"socialLesson"[^\]]*"socialScene"[^\]]*\]/);
  assert.match(page, /url\.searchParams\.set\("socialLesson", location\.socialLesson\)/);
  assert.match(page, /url\.searchParams\.set\("socialScene", String\(/);
  assert.match(page, /socialSceneValue !== null && \/\^\\d\+\$\//);
  assert.match(page, /subjectHubLocationFromClassroom\(location, restoredSubject\)/);
  assert.match(page, /setSubjectNavigationRevision\(\(revision\) => revision \+ 1\)/);
  assert.match(page, /window\.addEventListener\("popstate", restoreHistoryLocation\)/);
  assert.match(page, /initialLocation=\{subjectHubLocation\}/);
  assert.match(page, /onLocationChange=\{updateSubjectHubLocation\}/);

  assert.match(subjectHub, /const savedLocation = readSubjectHubLocation\(subject\.name\)/);
  assert.match(subjectHub, /if \(!routedLocation\?\.socialLessonId\) return \{ \.\.\.savedLocation, \.\.\.routedLocation \}/);
  assert.match(subjectHub, /socialLessons\.find\(\(lesson\) => lesson\.id === initialLocation\.socialLessonId\) \?\? socialLessons\[0\]/);
  assert.match(subjectHub, /Math\.min\(Math\.max\(initialLocation\.socialScene as number, 0\), initialSocialLesson\.scenes\.length - 1\)/);
  assert.doesNotMatch(subjectHub, /socialLessonId === "rights-in-tension" \? 0 : socialScene/);
  assert.match(subjectHub, /onLocationChange\?\.\(location, locationEffectReadyRef\.current \? "push" : "replace"\)/);
  assert.match(subjectHub, /sessionStorage\.setItem\(`wyatt-subject-location:\$\{subject\.name\}`/);
});
