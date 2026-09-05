# Final classroom release gate — 5 September 2026

## Release decision

The implementation candidate passes its automated gate, but **the full classroom release gate remains open**. A successful build is not a projector, school-network or physical-print certificate. Do not start the separate TOC library expansion until the remaining classroom checks below are completed.

## Source protection and teaching URLs

All three newest GitHub main trees were reconciled before editing. Local histories differ from connector-published histories, but their initial trees matched exactly. An annotated `gate-checkpoint-2026-09-05` tag preserves each local starting point. No reset, older-build restore, force push, or access change was used.

| Site | Canonical teaching URL | Starting GitHub main |
| --- | --- | --- |
| Teacher | https://dlwyatt-eng.github.io/teacher-hub/ | be93cdb0f268f395bb0e64fe214c3f2b0a58a393 |
| Student / Family | https://dlwyatt-eng.github.io/learn/ | 26c1048127aa64f3726ce85e759ef37e7a68a3d7 |
| Equity | https://dlwyatt-eng.github.io/equity-hub/ | 4bb1622ba51d26074dd2ff5da9b80f443d36cbe2 |

Older ChatGPT publications remain at Teacher v109, Student/Family v24 and Equity v34, saved August 31. Their display titles now begin `ARCHIVED Aug 31` and direct users to GitHub Pages. Their contents, URLs and existing custom/public/custom access settings were preserved. This is an archive label, not a redirect or claim that those older publications match this release. No active preview URL was reported.

## Targeted repairs

- Added a first-position Home cockpit with a simple projector welcome, Discovery launch and actual five-page PDF, first maths teacher/projector launch and two-page PDF, private hand-in directions, available colouring option, plain-paper backup, four maths blocks, public Hub links and technology-failure route. Existing daily tools remain available in an expandable section.
- Aligned the dated opening maths seed with 0.008 and the current three-scale/billions models. Existing saved plans are not silently overwritten. Moved the population Source Lab after the opening maths steps and marked the percent calculation as a later extension.
- Clarified four authored core maths blocks plus assessment-led practice/reteaching. Operations follow; factors/multiples are later, not a false opening-fortnight requirement.
- Changed the first operations teacher route from review-only to full teaching. Preserved 23 × 16 and supplied a distinct complete 936 ÷ 24 partial-quotient model, while retaining 864 ÷ 24 guided practice and a different independent check.
- Corrected Pack and Sync's material claims: real task cards and teacher-drawn grouping circles/timelines, not nonexistent supplied organizers.
- Corrected Scale City's post-reveal direction and added a material Large Text increase for maths explanations, questions and model labels. The previous explanation stayed 23.171 px after toggling at the observed laptop viewport.
- Supplied the missing fictional profile, action-note example and two team challenge cards in Career's actual initial Look screens and print kits.
- Aligned PHE's Gate Pass source, diagram, example, infographic and kit: four gates, two teams of four shown, three-count/no-contact/no-elimination rules and a one-rule comparison.
- Removed the six-question Forces key from the actual student print target and kept it in teacher preparation. Regression tests exercise the rendered student output, not only metadata.
- Added shared preparation for all 12 first-term Math Antics destinations and eight NAC/district resources: before-question, pause/response, activity bridge, timing/selection guidance, fallback, access gate and exact verification limitation. Added City Hall's prequestion and synchronized the safe Student/Family projection.

## Verification evidence and limits

- Teacher: full `npm test` (public-window checksum, TypeScript, all unit/rendered-content tests, production build and emitted-asset validation). Learn and Equity: full `npm test` including TypeScript, production builds, artifact/link checks and their boundary/accessibility tests. Cross-site virtual-exploration sync checked. `git diff --check` clean.
- Maths: independently recalculated sampled operations, factorization, GCF/LCM, divisibility and comparison items; no arithmetic error found. Rendered tests retain complete questions, models, support and extensions while excluding teacher answer fields from student print targets.
- Browser: fresh cloud session opened all three public GitHub Pages sites. Native viewport was **1363 × 936**. Observed baseline maths controls, exact 0.008 reveal and scale reset, Learn's private-paper route, Equity's independent 6–8 guidance, and live Discovery/maths PDF viewers. No app-origin errors appeared in the sampled logs; browser-extension metadata errors were separate.
- PDF: actual two-page maths PDF rendered and visually inspected at page scale; both pages are complete and readable. Live browser opened it and the five-page Discovery PDF. These PDFs are untagged; Discovery is image-based. Spoken directions, adult scribing, fictional examples and shorter-work routes remain essential alternatives.
- Media: exact official destinations were checked, but several Math Antics pages reached a cookie/JavaScript notice and NAC retrieval returned 503. These are not proof of broken resources. The direct Decimal Place Value YouTube player loaded with the correct verified channel/title and 11:50 runtime; full playback was not certified. City Hall retains Daryl's confirmed direct-video access. SD36 clean-film password and NAC teacher registration were not accessed or completed. No student account is required by the core lessons or their fallbacks.
- Representative student-language/route review covered Mathematics, ADST, Social Studies, ELA, Science, Career, PHE, Arts, opening directions and explorations. Repaired missing products and contradictory directions; retained rich concepts, attribution, key-word support, modelling and discussion.
- Privacy: no actual private student record was found in the bounded review. Teacher Hub is publicly reachable, so “teacher-only” presentation is **not authentication**. Do not store private planning, student information or future confidential answer-key files in its public repository. Learn needs no Teacher Hub access; Equity remains standalone; SpacesEDU remains the secure selected-evidence layer.

Live post-deployment checks and final commit links are reported in the release handoff. Do not infer deployment success solely from this committed candidate report.

## Exact remaining human rehearsal

1. Open the Teacher canonical URL in a clean school-laptop browser at 1366 × 768, then at 1920 × 1080 with the projector. Home → Project simple welcome → back → Project Discovery directions. Confirm text from the back row, audible instructions, focus visibility and no hidden/colliding controls. Open the hand-in and technology-failure sections.
2. Home → Project first maths lesson. Run all worked steps, Try together and Try on your own. Turn Large Text on/off. Explore → Tiny decimals → section 8 → Reveal → 0–0.1 → confirm the point is covered → section 1 → Reveal. Confirm controls and feedback fit and remain readable; use the paper response.
3. Open the operations and factors/multiples options. Rehearse multiplication, the new division table and one packing/repeating-event example. Judge pacing and prerequisite support for this class.
4. Use the actual Print student workshop button from its Learn stage. Inspect native print preview through its final independent-check page; no teacher answers, clipped lines or blank pages. Print a black-and-white copy of the maths PDF and one Discovery page at actual size. Verify pencil space and copier legibility. Browser automation could activate the button but did not expose a usable native print preview.
5. Open Learn → Students and Families on a real tablet/phone. Check wrapping, headings, hand-in instructions, focus and downloads. The supported cloud browser has no viewport-resize control, so the requested mobile/tablet and exact projector dimensions have **not** been visually passed.
6. Preview the chosen opening/first-term media on school Wi-Fi with speakers. Select and note exact excerpt start/stop; check sound, captions, ads and appropriateness. Use a fallback when registration, permission, password, playback or context is unresolved. Do not treat original classroom practice as equivalent evidence of an Indigenous or artist-led encounter.

## TOC hold

Not started. After the core gate passes, the separate expansion may cover Booklets 2/3, mixed-subject offline TOC work, the Grades 6–8 colouring/early-finisher pack, student PDFs, editable masters, teacher guides and genuinely staff-controlled answer keys, followed by B&W photocopy and offline tests. The current illustrated Discovery booklet is available; the separate colouring pack is not falsely advertised as finished.
