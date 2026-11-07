# Country inquiry SchoolAI integration · 2026-11-07

## Changes
Added `schoolai-country-inquiry-challenge-adviser` to the existing AI Activity Studio catalog. The country inquiry overview renders the same full creation pack directly, so no second divergent prompt is maintained. Existing six activities remain unchanged. The rights-to-evidence bridge from commit `5bdb257` remains linked and unchanged.

The coach follows the learner's stage: first improve a question or check a source; later compare evidence from both countries and test a recommendation. It distinguishes law from access, evidence from inference, within-country differences, authentic perspectives, and AI suggestions from sources. It never supplies a finished project, invents sources, solicits personal information, or issues grades. There is a non-AI partner route and student-owned reflection, not a required transcript or additional post.

## Readiness boundaries
Prompt-ready only. No SchoolAI account/Space created, student link configured, or SpacesEDU post made. Teacher preview and district-approved use remain necessary. The overview tells the teacher to test no-source, unsupported country ranking, fabricated-statistic and answer-seeking responses. No model conversation has been run, so behavioral compliance is an instruction, not an observed guarantee. Curriculum alignment is limited to demonstrated Social Studies evidence/perspectives and ADST digital-literacy source evaluation, not blanket competency coverage.

## Verification
- Read full facilitator prompt, opening, before/after tasks, assessment boundaries and rendered overview; the overview uses the catalog's creation-pack function.
- Two new tests verify unique activity identity, honest status, core evidence/privacy/ownership boundaries and actual rendered complete overview/alternative.
- Full `npm test`: **289 passed, 0 failed**, including TypeScript, public projection, fresh Pages build and emitted asset verification. `git diff --check` passed.
- Browser/mobile visual testing remains blocked. Vite on explicit loopback started, but local Chromium failed before opening a page with `socket() failed: Operation not permitted`; one approved outside-sandbox retry had the same failure. No browser screenshot or interaction pass is claimed. Existing rights bridge DOM-stub interaction tests pass; previous PDF visual inspection is recorded separately in its review.
- This commit is prepared for consolidation with the separate weekly-plan worker. Publication and remote CI must be verified on that combined commit, not inferred from these local checks.
