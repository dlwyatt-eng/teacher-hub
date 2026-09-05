# Student language release — September 5, 2026

Status at checkpoint: implemented and locally verified; publication verification is recorded below after deployment.

## Why another pass was needed

Earlier checks proved that lessons had goals, steps, products and finish criteria. They did not prove that the text actually rendered for students was understandable. Some screens borrowed teacher-planning fields, some product strips showed only a count of checks, and Learn stored helpful choices without rendering them.

This pass separates student directions from teacher preparation and tests the production renderers. It preserves the current architecture, visuals, lesson IDs, detailed assessment criteria, source material and offline routes.

## Changes

- Five Discovery sessions now have an authored learning goal, reason, first action, example, numbered steps, finish check, privacy explanation and help. The canonical lesson records use the same student fields.
- Teacher plans retain detailed preparation and include the exact directions to say to the class. All 15 combinations of five sessions and 45/60/75 minutes retain eight saved TTOC phases under the 320-character serializer limit.
- Discovery and the following five-day class week have rewritten shared, student and family windows. Learn renders the choices and saving guidance as well as the first action.
- All 57 reviewed lesson contracts have a short, concrete product summary. Detailed Done checklists remain intact. Focused edits cover Mathematics, ELA, Arts, ADST, Career, PHE and Social Studies.
- Each One, Teach One retains eight full phases and four projector groups, two approved sources, the complete paper path including a way back, a new-user test, two kinds of revision, and the four-part understanding check.
- Seven calendar inquiries have separate student instructions in both hubs. Teacher's 42 stages and Equity's 21 screens use those fields. Equity keeps source credit visible and supplies the vocabulary the map activity asks students to use.
- The fictional listening rehearsal uses plain student instructions while preserving its exact source cards, attribution and explicit limits. Teacher preparation remains separate.
- Originals always stay private. Permitted sharing uses a separate student-chosen safe excerpt after renewed permission; anonymity cannot replace permission. How I Learn Best is never copied for display. The separate learning-user-manual lesson permits made-up school examples and optional sharing.
- New text blocks support existing large-text modes. Existing images, printables and curriculum paths remain in place.

## Independent review

Astra agents supplied proposed copy outside the checkouts. The lead integrator reviewed and applied it. A separate Astra reviewer examined the actual wiring and identified additional defects: consent loopholes, mandatory sharing in a private learning guide, an incomplete projected understanding check, and Learn guidance that existed only in data. Those findings were corrected. The reviewer cleared the final changes.

## Verification

- Teacher: complete npm test gate — public projection check, TypeScript, 110 tests, fresh production build, 62-file artifact check.
- Learn: complete npm test gate — TypeScript, fresh production build, artifact validation and 13 tests.
- Equity: complete npm test gate — TypeScript, fresh production build, artifact validation and 22 tests.
- git diff --check passed in all three repositories.
- Actual static rendering covers all five first-week sessions, 42 Teacher calendar stages, 21 Equity calendar screens, both student fictional-rehearsal views, Equity map vocabulary and both opening windows on Learn's home/student/family routes.
- Sentinel tests deliberately replace teacher fields with forbidden text and verify that student rendering does not expose it.
- Reviewed summary coverage is exactly 57/57. Full lesson finish criteria remain required.
- Teacher/Learn public projection SHA-256: 04723de24cf7aefe12772f959d5d716cf263b5fb2fba708422a5fd9219dd0631.
- Teacher/Equity inquiry pack SHA-256: f5c7a96437ba477ad9b1c9821ca3c827c64a29a9c1f9e220b2cdf548fcd5366b.
- Removing the newly added student overlays leaves the inquiry pack deeply equal to its prior version, including sources, quotations and teacher plans.

No fresh browser, keyboard, screen-reader, projector-distance or physical print review was performed in this pass. These checks are not a Grade 6 comprehension study or certification of every page in the sites.

## Publication protocol

Start from these live bases, whose trees matched the local baseline before editing:

| Repository | Live parent | Baseline tree |
|---|---|---|
| teacher-hub | 14e12abf1ad91476b8cc0f4e4b2932d508c6c3f4 | caf92c33a334ed85e0d454ee0735abbdb45634a0 |
| learn | 1897b65de0992536b41f819446e8b39736e88f38 | 5abee6e4f88c80f942fd517cd4c9a1465db20967 |
| equity-hub | 61cb82494a6338d41001a683911e9603aedac040 | 5f6096797e918602bd7e09897ec204b989e6a575 |

Before publication, recheck each live head. Publish the exact tested local tree with that head as parent and a non-forced update. If the remote moved, integrate it rather than replacing it. Then verify GitHub Actions, remote tree equality, live asset fingerprints and release-specific text.

Future changes must keep this sequence: inspect current remote and local work; edit the current source; regenerate public projections; test rendered student text and preserved task requirements; commit; publish; verify the live release; record what is local versus live. Never report a local checkpoint as published.
