import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

async function optionalRead(relativePath) {
  try {
    return await read(relativePath);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") return null;
    throw error;
  }
}

async function cssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return cssFiles(target);
    return entry.name.endsWith(".css") ? [target] : [];
  }));
  return nested.flat();
}

function mediaSection(source, query) {
  const start = source.search(query);
  assert.ok(start >= 0, `Missing media query: ${query}`);
  const next = source.indexOf("@media", start + 6);
  return source.slice(start, next < 0 ? source.length : next);
}

test("Civic Decision Brief keeps controls and copy inside responsive projector layouts", async () => {
  const css = await read("app/civic-decision-brief-lab.css");
  const program = await read("app/social-studies-program.tsx");

  assert.match(css, /\.cdb-lab[^{}]*\{[^{}]*\bmin-width\s*:\s*0\s*;/s, "The Civic lab root needs min-width: 0 so it can shrink inside its parent grid.");
  assert.match(css, /\.cdb-lab[\s\S]*?\boverflow-wrap\s*:\s*anywhere\s*;/, "Long Civic labels and prompts need an explicit wrapping escape hatch.");
  assert.match(css, /\.cdb-timer-controls\s*\{[^{}]*\bflex-wrap\s*:\s*wrap\s*;/s, "Timer controls must wrap instead of colliding.");
  assert.doesNotMatch(css, /white-space\s*:\s*nowrap\s*;/, "Civic controls must not force one-line labels at narrow projector or mobile widths.");
  assert.doesNotMatch(css, /(?:^|[;{])\s*min-width\s*:\s*(?:[3-9]\d{2}|\d{4,})px\s*[;}]/m, "A fixed large min-width can force horizontal Civic page overflow.");
  assert.doesNotMatch(css, /(?:^|[;{])\s*(?:width|inline-size)\s*:\s*100vw\s*[;}]/m, "100vw inside the page shell can overflow when a scrollbar is present.");

  for (const breakpoint of [1100, 800, 520]) {
    assert.match(css, new RegExp(`@media\\s*\\(max-width:\\s*${breakpoint}px\\)`), `Missing Civic responsive breakpoint at ${breakpoint}px.`);
  }

  const tablet = mediaSection(css, /@media\s*\(max-width:\s*800px\)/);
  const phone = mediaSection(css, /@media\s*\(max-width:\s*520px\)/);
  assert.match(tablet, /grid-template-columns\s*:\s*1fr\s*;/, "Civic multi-column layouts must collapse on tablets.");
  assert.match(phone, /grid-template-columns\s*:\s*1fr\s*;/, "Civic control groups must collapse on small phones.");

  assert.match(program, /lesson\.id === "civic-decision-brief" \? "cdb-scene-navigation"/, "The five-part Civic route must opt into its non-overlapping navigation layout.");
  assert.match(css, /\.projector-shell\s+\.social-scene-layout\.cdb-scene-navigation\s*>\s*nav\s*\{[^{}]*position\s*:\s*static\s*;[^{}]*grid-template-columns\s*:\s*repeat\(5,\s*minmax\(0,\s*1fr\)\)\s*;/s, "Projector navigation must stay in normal flow with all five parts on the base grid.");
  assert.match(tablet, /\.projector-shell\s+\.social-scene-layout\.cdb-scene-navigation\s*>\s*nav\s*\{[^{}]*grid-template-columns\s*:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)\s*;/s, "Civic projector tabs must collapse to two columns before they collide.");
  assert.match(phone, /\.projector-shell\s+\.social-scene-layout\.cdb-scene-navigation\s*>\s*nav\s*\{[^{}]*grid-template-columns\s*:\s*1fr\s*;/s, "Civic projector tabs must become one column on narrow screens.");
});

test("shared projector shells stay below the global bar and keep lesson controls in normal flow", async () => {
  const social = await read("app/social-studies.css");
  const learning = await read("app/learning-program.css");
  const globals = await read("app/globals.css");
  const arts = await read("app/four-arts-lab.css");

  assert.match(social, /\.social-projector-header\s*\{[^{}]*position\s*:\s*sticky\s*;[^{}]*top\s*:\s*78px\s*;/s, "The Social projector header must clear the 78px desktop topbar.");
  assert.match(social, /@media\s*\(max-width:\s*780px\)[\s\S]*?\.social-projector-header\s*\{[^{}]*top\s*:\s*61px\s*;?\s*\}/, "The Social projector header must clear the 61px mobile topbar.");
  assert.match(social, /\.social-scene-layout--lean\s*>\s*nav\s*\{[^{}]*position\s*:\s*static\s*;/s, "Shared Social scene tabs must remain in document flow instead of covering the action card.");

  assert.match(learning, /\.projector-shell\s+\.projector-lesson-player__bar\s*\{[^{}]*top\s*:\s*78px\s*;?\s*\}/s, "Generic lesson controls must clear the desktop topbar.");
  assert.match(learning, /@media\s*\(max-width:\s*780px\)[\s\S]*?\.projector-shell\s+\.projector-lesson-player__bar\s*\{[^{}]*top\s*:\s*61px\s*;?\s*\}/, "Generic lesson controls must clear the mobile topbar.");

  assert.match(globals, /\.context-curriculum-link\s*\{[^{}]*min-height\s*:\s*44px\s*;/s, "The curriculum control needs a 44px touch target.");
  assert.match(globals, /\.mode-switch button\s*\{[^{}]*(?:height|min-height)\s*:\s*44px\s*;/s, "Mode controls need a 44px touch target.");
  assert.match(arts, /\.hotspot-bottom\s*\{left\s*:\s*40%\s*;/, "The lower Arts hotspot must keep its audited desktop separation.");
});

test("page styles avoid viewport-width declarations that create document-level horizontal overflow", async () => {
  const files = await cssFiles(path.join(root, "app"));
  const unsafe = [];

  for (const file of files) {
    const source = await readFile(file, "utf8");
    if (/(?:^|[;{])\s*(?:width|inline-size|min-width)\s*:\s*100vw\s*[;}]/m.test(source)) {
      unsafe.push(path.relative(root, file));
    }
    if (/(?:^|[;{])\s*(?:width|inline-size)\s*:\s*calc\(\s*100%\s*\+/m.test(source)) {
      unsafe.push(`${path.relative(root, file)} (width greater than 100%)`);
    }
  }

  assert.deepEqual(unsafe, [], `Potential document-level horizontal overflow:\n${unsafe.join("\n")}`);
});

test("nature companions honour reduced-motion settings whenever the creature system is present", async (t) => {
  const component = await optionalRead("app/classroom-companions.tsx");
  const css = await optionalRead("app/classroom-companions.css");

  if (component === null && css === null) {
    t.skip("The optional nature-companion system is not present.");
    return;
  }

  assert.ok(component, "The creature stylesheet exists without its component.");
  assert.ok(css, "The creature component exists without its accessibility stylesheet.");
  for (const selector of ["classroom-companion", "companion-mark", "companion-trail", "companion-motion-once", "companion-motion-idle", "companion-motion-none"]) {
    assert.match(`${component}\n${css}`, new RegExp(`\\b${selector}\\b`), `Missing companion contract: ${selector}`);
  }
  assert.match(component, /data-companion-role=\{role\}/, "Companion markup must expose its semantic learning role to styles and tests.");
  for (const role of ["notice", "question", "build", "connect", "reflect"]) {
    assert.match(component, new RegExp(`\\b${role}:\\s*\\{`), `Missing companion learning role: ${role}`);
  }

  const reducedMotion = mediaSection(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(reducedMotion, /\.classroom-companion/);
  assert.match(reducedMotion, /\.companion-trail/);
  assert.match(reducedMotion, /animation\s*:\s*none\s*!important\s*;/);
  assert.match(reducedMotion, /transition-duration\s*:\s*(?:0?\.0?1)ms\s*!important\s*;/);
});

test("proficiency models show four distinct levels and a visible next improvement", async () => {
  const models = await read("app/proficiency-models.ts");
  const panel = await read("app/proficiency-models-panel.tsx");
  const civic = await read("app/civic-decision-brief-lab.tsx");

  for (const level of ["Emerging", "Developing", "Proficient", "Extending"]) {
    assert.match(models, new RegExp(`\\blevel:\\s*"${level}"`), `Missing ${level} student model.`);
  }

  for (const field of ["whatWorks", "nextImprovement", "teacherUseNote"]) {
    const examples = models.match(new RegExp(`\\b${field}:`, "g")) ?? [];
    assert.ok(examples.length >= 4, `Every proficiency level needs ${field}; found ${examples.length}.`);
    assert.match(panel, new RegExp(`model\\.${field}`), `${field} is stored but not visible in the model panel.`);
  }

  assert.match(models, /\bteacherUse\s*:/);
  assert.match(models, /\bcopyGuard\s*:/);
  assert.match(panel, /What is already working/i);
  assert.match(panel, /Try next/i);
  assert.match(panel, /Models are possibilities[—-]not answers to copy\./i);
  assert.doesNotMatch(models, /first-week-organizer-reflection|spaces-sept-learning-story/, "Low-stakes first-week organizers must not use Provincial Scale labels or map to the required September SpacesEDU post.");
  assert.match(civic, /originalAttemptConfirmed/);
  assert.match(civic, /REVEAL AFTER AN ORIGINAL ATTEMPT/i);
  assert.match(civic, /originalAttemptConfirmed\s*&&[\s\S]*ProficiencyModelsPanel/, "The Civic worked model must remain gated until students confirm an original attempt.");
});

test("every first-week session keeps the whole decorated organizer while protecting privacy and accommodation", async () => {
  const data = await read("app/first-week-rotation-data.ts");
  const mission = await read("app/first-week-mission.tsx");
  const canonical = await read("app/classroom-os-v2.ts");
  const ids = [
    "rotation-identity-constellation",
    "rotation-how-i-learn",
    "rotation-ideal-learning-space",
    "rotation-build-better-grade-6",
    "rotation-grade-6-quest-map",
  ];

  for (const [index, id] of ids.entries()) {
    const start = data.indexOf(`id: "${id}"`);
    const end = index + 1 < ids.length ? data.indexOf(`id: "${ids[index + 1]}"`) : data.indexOf("] as const;", start);
    assert.ok(start >= 0 && end > start, `Could not isolate first-week session ${id}.`);
    const session = data.slice(start, end);
    assert.match(session, /\bpageRegions\s*:\s*\[/, `${id} does not name every organizer region students should address.`);
    assert.match(session, /\bdecorationChoices\s*:\s*\[/, `${id} does not offer meaningful decoration choices.`);
  }

  assert.match(data, /Complete the whole organizer[—-]not only one favourite section\./i);
  assert.match(data, /Visit every labelled section\.[^"\n]*response, fictional alternative, blank\/skip, or privacy symbol completes a region/i);
  assert.match(data, /colour, drawing, symbols, borders, (?:spacing, )?or repeating patterns/i);
  assert.match(data, /no explanation is required/i);
  assert.match(data, /artistry is never graded/i);
  assert.match(data, /WHOLE_ORGANIZER_ACCOMMODATION/);
  assert.match(data, /reduce the number or length of substantive responses/i);
  assert.match(data, /do not create catch-up work/i);
  for (const phase of [/first pass/i, /every section/i, /deepen/i, /decorate/i, /whole-page check/i, /privacy/i, /label \+ collect|handoff/i]) {
    assert.match(data, phase, `The flexible timelines are missing the ${phase} phase.`);
  }

  assert.match(mission, /session\.pageRegions/);
  assert.match(mission, /session\.decorationChoices/);
  assert.match(mission, /WHOLE_ORGANIZER_ACCOMMODATION/);
  assert.match(mission, /Blank\/skip counts[—-]no explanation/i);
  assert.match(mission, /WHOLE_ORGANIZER_PROMISE|Complete the whole organizer[—-]not only one favourite section\./i);
  assert.match(canonical, /complete, decorated/i);
  assert.match(canonical, /blank\/skip/i);
  assert.match(canonical, /accommodation may reduce substantive output/i);
  assert.match(canonical, /decorat/i);

  for (const retired of [
    "Choose three or more sections",
    "Choose at least four prompts",
    "Complete any three safe stars",
    "The path artwork is optional",
  ]) {
    assert.doesNotMatch(data, new RegExp(retired, "i"), `Partial-organizer guidance returned: ${retired}`);
  }
});

test("every generated first-week TTOC route keeps all core phases within the run-step limit", async () => {
  const dataUrl = pathToFileURL(path.join(root, "app/first-week-rotation-data.ts")).href;
  const { ROTATION_DURATIONS, rotationSessions, rotationTtocRunSteps } = await import(dataUrl);
  const mission = await read("app/first-week-mission.tsx");
  const ttocRunStepLimit = 320;
  const requiredPhases = [
    /Welcome \+ privacy:/,
    /Provoke:/,
    /Model the whole page:/,
    /First pass · every section:/,
    /Deepen \+ decorate:/,
    /Whole-page check:/,
    /(?:Improve \+ consent|Revise \+ decide):/,
    /Label \+ collect:/,
  ];

  assert.match(mission, /runSteps:\s*rotationTtocRunSteps\(session, duration\)/, "First Week must save the concise TTOC route, not its rich display timeline.");

  for (const session of rotationSessions) {
    for (const duration of ROTATION_DURATIONS) {
      const runSteps = rotationTtocRunSteps(session, duration);
      const acceptedSteps = runSteps.filter((step) => {
        const clean = step.trim().replace(/\s+/g, " ");
        return clean.length > 0 && clean.length <= ttocRunStepLimit;
      });
      const route = `${session.id} (${duration} min)`;

      assert.equal(runSteps.length, requiredPhases.length, `${route} must generate every core phase.`);
      assert.equal(acceptedSteps.length, runSteps.length, `${route} contains a run step that the TTOC serializer would drop.`);
      for (const [index, phase] of requiredPhases.entries()) {
        assert.match(runSteps[index], phase, `${route} is missing its phase at step ${index + 1}.`);
      }
    }
  }
});
