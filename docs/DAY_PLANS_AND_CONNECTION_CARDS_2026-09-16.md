# Day Plans and classroom connection cards

Scope: first-full-day template, persistent source plan convention, browser day-plan revision archive, weekly-to-daily snapshots, 32 conversation cards, and links to existing responsibilities and Werewolf lessons.

## Storage and reuse

- `content/day-plans/first-full-day.json` is the canonical undated template. Its teaching date has not been asserted.
- Register future source plans in `publishedDayPlans` in `app/day-plan-store.ts`. Keep dated plans in source control; adapt a copy next year. AGENTS.md records this continuing requirement.
- Teacher edits save automatically on the device after a short pause; Save revision flushes immediately. Date copies preserve the original. School-year filters follow September–August.
- Weekly-plan saves append changed day snapshots. Explicit day plans take precedence over weekly snapshots on the Morning Screen.
- JSON export includes published source templates plus all locally saved revisions. Import validates before writing, retains history and rejects conflicting revision IDs. It does not upload browser notes to a public repository.
- GitHub Pages has no authenticated cross-device write service. Browser plans are NOT cloud backups; download and retain JSON to transfer/recover them. Classroom reflections must avoid student-identifying information.
- An explicit projected day uses the simplified Shape of Our Day. Ordinary Morning Screen retains published arrival/hope content with the dated plan's timeline.

## Routes

- `?view=Day+Plans`
- `?view=Morning+Screen&mode=student&dayPlan=first-full-day`
- `?view=Games+%26+Activities&mode=student`
- `?view=Responsibilities&mode=student`
- Existing Werewolf: `?subject=English+Language+Arts&experience=werewolf-learn&mode=student`

## Content review

All 8 Similar, 8 Different and 16 Would You Rather prompts have follow-ups. Learning-activity preferences are contextual rather than fixed learning-style labels. Teacher directions include a seated route, passing, inclusion and changing partners. The flexible day supplies expectations, booklet completion, reading, existing mixed-role Werewolf lessons, cleanup and optional Capture the Flag procedures. Existing PDF responsibility posters and Werewolf print pack are reused.

Nine original SVG illustration themes are local code assets, not remote image dependencies. Responsibilities support an overview and one responsibility at a time.

## Verification

- TypeScript: passed during implementation; final check recorded with release.
- Repository test suite: 179 tests passed, including five new behavioral archive/renderer tests.
- Focused tests cover revision retention, date copy isolation, school-year boundaries, backup round trip, conflicting/invalid import rejection, explicit-plan precedence, storage failure and projector exclusion of teacher notes.
- Pages production build and artifact validation passed during implementation; final build recorded with release.
- Local interactive browser access was blocked by this environment. Live browser review follows deployment; do not infer projector or mobile visual quality from automated checks alone.
- Classroom use has not been observed; actual timings and reflections remain for the teacher to record.

## Live review follow-up

Initial release deployed successfully (workflow 35061030301). Live browser review verified navigation to Games & Activities, three deck selections, Previous/Next wrap, follow-up reveal, random-card change, day-plan Save/reload, and the projected first-day sequence. Desktop screenshots showed readable cards and a crowded day outline; the follow-up tightens the day layout and shorter projector windows, adds the welcome illustration, and routes essential expectations to a student-readable screen. Source-copy logic now permits an explicit daily plan alongside an automatic weekly snapshot of the same date. Mobile reflow remains source-reviewed; no mobile viewport was available in the browser API.

Live review also caught a doubled relative base in the poster PDF link. Both the existing poster panel and the new responsibilities page now use root public-asset paths so Pages rewriting yields `/teacher-hub/printables/...`. Focused responsibility navigation was checked on the live site. No curriculum in Learn or Equity was changed.
