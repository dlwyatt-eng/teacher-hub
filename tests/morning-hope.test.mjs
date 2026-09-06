import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { moduleLoader } from "./helpers/load-rendered-module.mjs";
const load = moduleLoader(path.resolve(import.meta.dirname, ".."));
const { emptyHopeStory, parseHopeStory, importHopeStory } = load("app/morning-hope-state.ts");
const { createMorningScreenDraft, parseMorningScreenDraft, publishMorningScreen, parseMorningScreenRecord } = load("app/morning-screen-state.ts");
// Synthetic fixture only, never supplied as news to the classroom.
const story = { ...Object.fromEntries(Object.keys(emptyHopeStory()).map(key => [key, "Fixture text"])), date: "2026-09-06", sourceUrl: "https://example.org/article" };

test("daily story block survives publication and reload without changing arrival activity", () => {
  const draft = createMorningScreenDraft("2026-09-07");
  const imported = importHopeStory('```json\n' + JSON.stringify(story) + '\n```');
  assert.deepEqual(imported, story);
  const { record } = publishMorningScreen({ ...draft, hopeStory: imported });
  const restored = parseMorningScreenRecord(JSON.parse(JSON.stringify(record)));
  assert.deepEqual(restored.hopeStory, story);
  assert.equal(restored.activityId, draft.activityId);
  assert.equal(restored.date, "2026-09-07");
  assert.equal(createMorningScreenDraft("2026-09-08").hopeStory ?? null, null);
  assert.ok(parseMorningScreenDraft(draft), "old records remain compatible");
});

test("incomplete, invalid-date, future-date and unsafe-link stories cannot publish", () => {
  for (const sourceUrl of ["javascript:alert(1)", "http://example.org", "https://user:secret@example.org"]) assert.equal(parseHopeStory({ ...story, sourceUrl }), null);
  assert.equal(parseHopeStory({ ...story, date: "2026-02-30" }), null);
  assert.equal(importHopeStory("not a story block"), null);
  assert.equal(parseMorningScreenDraft({ ...createMorningScreenDraft("2026-09-07"), hopeStory: { ...story, action: "" } }), null);
  assert.equal(parseMorningScreenDraft({ ...createMorningScreenDraft("2026-09-07"), hopeStory: { ...story, date: "2026-09-08" } }), null);
});
