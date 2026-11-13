# Projectable country inquiry opening

## Supplied route

`activities/better-world-journey.html#begin` now offers a four-scene opening before the longer topic menu: inspect an invented route map, compare a same-question survey, examine two headlines, then propose a real-country inquiry question. Each scene has one main student action and an optional model. Next/back controls announce progress; projection mode removes surrounding material and Escape exits. No source search, film licence, account or student entry is needed to begin. Without JavaScript all scenes remain readable.

The matching `printables/country-inquiry-starter.pdf` supplies the same three practice sources, four tasks and nine full-width response lines at approximately 8 mm spacing. It is a single US Letter page with no teacher answers. Oral and sketched responses remain options. The imagined towns, survey and proposal are teaching examples, not evidence about actual countries or causal proof.

## Booklet continuity

The student booklet still has 15 pages and the teacher guide five. Their opening pages now begin with the broader inquiry question and offer governance, migration, resources/trade, cooperation/conflict and rights/fairness as lenses; media and evidence run through every lens. National Child Day is optional, not the frame or a deadline. Subsequent original pages are retained unchanged except one checklist line on student page 14: the compulsory rights connection is replaced with a connection to the selected inquiry lens. True PDF redaction removes the superseded line before inserting its replacement at the original baseline, font and size. Their original authoring sources were not in the repository, so the original PDFs are preserved in `assets/inquiry-booklet-source` as reproducible inputs, not discarded or overwritten. Build command: `python3 scripts/build-country-inquiry-pack.py`.

## Review evidence and boundaries

- Compared the starting journey with the `origin/main` version at `2cd1678`: identical. Existing routes and independent teacher/source menu retained.
- Rechecked the official BC Social Studies 6 page on 13 November 2026: https://curriculum.gov.bc.ca/curriculum/social-studies/6/core. Transport is one possible urbanization context; inquiry, evidence, perspective and media work are relevant. This opening does not claim to cover every content standard.
- Independently checked the numbers: 15 compared with 8 out of equal samples of 20. The model limits the claim to respondents; it does not infer bridge causation or national outcomes.
- Rendered all 21 PDF pages with Poppler. Inspected all pages in contact sheets and the three authored pages at larger scale; corrected a font-substitution issue by embedding DejaVu Sans. Checked clear diagram labels, writing space, no answer leakage, page references and unchanged later-page content.
- pypdf checks confirmed page counts 15/5/1 and exact extracted-text equality for every preserved page (student pages 2-13 and 15; teacher pages 2-5). Student page 14 was separately checked for removal of the original requirement, presence of the replacement, and preservation of every other line, then rendered and visually reviewed. The focused Node tests cover actual scene-control code, projection exit, progress, focus, source/model presence and PDF build inputs. These tests need no extra Python package in the Node test runner.
- Browser projection/print preview has not yet been visually exercised by this worker. Browser QA and full integration tests belong to the integrating worker. This is not a claim of classroom use or publication.
