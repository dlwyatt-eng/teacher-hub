# Focused classroom lessons — October 1, 2026

Three existing experiences now open with a short paper-first classroom lesson. The same lesson screen's **Full sequence** control restores the original parts, investigations and material routes. No new subject, day-plan date, completed-learning claim or external assignment is created.

| Existing experience | Focused lesson | Concrete student evidence |
| --- | --- | --- |
| `magnitude-gallery` | Which place decides? | Compare whole numbers and decimals, sort equivalent values, explain 6.08 < 6.8 and give a counterexample to digit-count reasoning |
| `character-council` | A clue changes the choice | A located, paraphrased detail from the actual class bookmark, two possible actions and a revision after a partner's evidence question |
| `career-constellation` | An issue needs a team | A chosen inquiry question, source detail, three role/action/skill links and a planned-or-tried before/after check |

## Teaching and material boundaries

- Each focused lesson reuses the existing outer player controls for Notice, Model, Try and Check. It does not add a nested slideshow or replace the original sequence.
- Teacher lesson view provides concise timing, preparation, checking notes and a link to the same projector route.
- Each lesson supplies an original student response sheet with all four tasks and a concrete starting input or worked model. It is available under “Response sheet · print or use plain paper.” These are HTML response sheets designed for compact printing, not claimed downloadable PDFs or licensed worksheets.
- Mathematics keeps optional Math Antics and the original number-line workshop available through the existing full lesson and resource drawer. Rounding is a separate carry-forward decision.
- Nevermoor must start from the teacher's actual bookmark. No chapter, completed reading, novel extract or audio is assumed or reproduced. The complete Lina vote case is original fiction and provides an offline fallback.
- Career inquiry continues the student's chosen issue. The teacher checks whether an Action Pack or external activity is actually available. No pack, new account, public campaign, contact, upload or real-world action is assigned automatically. A complete fictional refill-station case supplies the offline route.
- The [official Curriculum for Change portal](https://www.bethechangeearthalliance.org/c4c) was read October 1, 2026. It offers Action Packs and career exploration; the link is identified as a source portal that may require approved access, not a worksheet. No licensed Action Pack content is copied.
- No student names, work or personal information are collected or stored by these components. Student sheets omit teacher checking notes; the public static site is not represented as private storage.

## Verification

### Content and automated rendering

- Independently checked all comparison values: 4,305 < 4,350 (tens), 4.305 < 4.350 (hundredths), 0.50 = 0.500, 0.405 < 0.45 < 0.5 = 0.50, and 6.08 < 6.8 (tenths).
- Rendered all twelve focused stages and all three response sheets with the production React components. Confirmed tasks and fictional inputs are present and teacher checking notes are absent from the student outputs.
- Rendered each actual `StudentLearningProgram` entry route. Each opens with its focused hook, four outer stages, the full-sequence switch and real response-sheet disclosure.
- Checked the source routes for full-sequence preservation, stage reset on route/switch changes, responsive rules, focus outlines and targeted-print visibility. Added explicit targeted-sheet overrides for existing global print rules.
- Final `npm test` passed: TypeScript, **195/195 tests**, public-window consistency, fresh Pages build and verification of **97 emitted files** plus copied public assets. `git diff --check` passed.

### Remaining verification limits

- The cloud browser rejected both supported local preview attempts (`127.0.0.1:4174` and `terminal.local:4174`) with `ERR_BLOCKED_BY_CLIENT`. Browser navigation, screenshots, responsive visual appearance, browser print preview and keyboard interaction were **not verified**.
- No HTML print-layout renderer was available. Response-sheet content was rendered and inspected in markup, but exact pagination, physical print quality and school-projector legibility remain unverified. Do not describe these as visually verified one-page sheets.
- No classroom trial or student comprehension claim is made. Publication and integrated regression checks belong to the combined release.
