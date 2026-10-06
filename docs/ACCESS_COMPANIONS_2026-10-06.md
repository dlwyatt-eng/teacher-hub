# Maths and PHE access companions

## Purpose and scope

Adds printable and on-screen companions to the existing maths readiness and six-week PHE resources. The dated October 6 plan and other published work are preserved. These are optional page choices, not a new daily assignment, grouping system or assessment record.

The current September language worksheets already cover basic place value, rounding and comparisons. The October foundational booklet starts with quantity work and operations within 10. Those existing resources informed the gaps addressed here; no individualized files or student records are republished.

The new maths visuals preserve the decimal-comparison goal on the first three logical pages. Later pages address distinct foundational quantity, tens-and-ones or joining/removing goals when the teacher chooses them from current work. English proficiency and numeral recognition do not establish an arithmetic level. The Korean-English pages retain mathematical reasoning and offer speaking, pointing or optional writing.

PHE companions retain the six fictional health situations and provide reusable partner and captain cues. Teacher oral reading makes word-choice cards usable without requiring independent decoding. These are not pictorial communication systems or disability simulations. Actual movement and strategy explanations remain separate evidence.

## Canonical content and outputs

- `content/maths-access-companions.json`: seven logical activities, 19 tasks.
- `content/phe-access-companions.json`: eight logical activities, 24 tasks.
- `content/korean-access-companions.json`: seven bilingual activities, 14 tasks.
- `scripts/build-access-companions.py`: builds three student PDFs, their three on-screen HTML equivalents, and a separate teacher guide with keys.
- `assets/fonts/nanum-gothic/`: unchanged original Nanum Gothic Regular, its SIL OFL licence and source/checksum record. PDFs embed the glyphs they use. HTML uses locally available system fonts.
- `app/access-companion-links.tsx`: teacher-side links from both existing pathways. Student projection excludes this teacher section.

Student outputs use only the goal, supplied input, model, task, choices and response frames. Task answers and teacher guidance belong in the separate guide. Numerical diagrams must retain equal unit sizes, correct counts and starting quantities; do not print practice totals as labels for counting tasks.

## Regeneration and review

Run `python scripts/build-access-companions.py --out ../output/access`, then render and inspect all PDF pages, including Korean glyphs, diagrams and page breaks. Check the HTML against the same content. Copy the four PDFs and three HTML files to `public/downloads/access-companions/`.

Review the actual student tasks and teacher keys, not only schema checks. Use independent numerical and Korean-language review when changing those fields. Keep models distinct from fresh checks. Retain the documented limits of supported evidence and allow access assistance without selecting an answer for the learner.

Prepared on current remote main `0c81a87`, including the confirmed October 6 Shape of the Day. This supplements teacher resources and does not change the public learning window or claim that any lesson was taught. Publication must preserve newer remote work through a normal fast-forward update.

## Verification

Content review checked all maths quantities, comparisons, place-value charts and keys, plus the mathematical examples in the bilingual pages. PHE review checked case completeness, decision-making, help routes, physical participation and the distinction between strategy and physical evidence. Korean review included a separate language pass and corrections to consent, privacy and mathematical wording.

Rendered PDFs contain 12 maths pages, nine PHE pages, seven bilingual pages and a 16-page teacher guide. Every student page was visually inspected. Final corrections made decimal-grid labels visible, gave tens rods and loose ones identical square units, and removed nearly empty teacher-guide spill pages. The guide includes the actual PDF print-page map.

All 57 task prompts were checked in the HTML companions, with no full task keys included. The fresh checks retain their supplied inputs; models are distinguished from practice. The print and HTML diagrams were checked against the numerical content, including counts, shading, place-value alignment and model-only join/remove markings.

Automated verification passed: current learning-window checksum, TypeScript, all 237 tests, the production build and artifact integrity (107 emitted files plus every copied public asset). `git diff --check` passed. Live-browser and publication evidence are recorded separately at release. No learner trial, physical print trial or certified translation review is claimed.

## Published release evidence

Local content commit `57d35b1a19d780c2711b9bb40380fae6debf8b7b` and published GitHub commit `85d78525530422f498b0925baf4d7e8bf360e0e3` have identical source tree `b92ac7e7aa566432df930dbb9555899f82800f47`. GitHub Actions run `37407087418` completed successfully. The ref update used the current parent as a lease and preserved the confirmed October 6 plan.

Live browser review opened the companion disclosure in both teacher pathways, verified all five links in each, and confirmed the new teacher section was absent from the maths projector DOM. The three on-screen companions were opened. Representative decimal grids, Korean text and PHE sequence cards were visually checked; activity-anchor navigation was exercised. All seven published files returned HTTP 200 with the expected content type and SHA-256 equal to the checked local files. A screenshot records the published maths companion disclosure.

This release record is a documentation-only follow-up to the verified content publication. It does not alter the delivered resources or claim additional classroom or mobile-device testing.
