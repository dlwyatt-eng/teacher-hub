# Mathematics teaching repair — September 5, 2026

This review supersedes any broad claim that automated checks established the Mathematics lessons as classroom-ready. It does not undo or replace the earlier release: it repairs the current source and preserves the other subjects, artwork, navigation, public/private choices and existing resources.

## What failed in the previous review

The reported sentence — “Decide when factors build equal kits and when multiples predict repeating events meeting again” — remained in `projector-lesson-supports.ts`. Earlier editing improved student contracts and summaries without following all their separate projector sources. Student Mathematics also rendered an introductory explanation and a full concept workshop together. The first lesson switched between 0.8 and 0.008 and used percentages before establishing thousandths. Some checks primarily tested the presence of fields, particular phrases or resource counts.

These are lesson quality and integration failures. A passing build, curriculum tag, source-string assertion or deployment check is not evidence that a child understands a lesson or that its projected layout works.

## Repairs in this change

- Update all sixteen existing Mathematics support packs with clearer goals and concrete examples where needed. Keep their stable IDs, associated practice, teacher routes and optional Math Antics connections.
- Show one worked step, partner question or independent question at a time. Keep every question and all four fraction representations in the printable student workshop. Keep teacher answers out of the student markup.
- Remove the duplicate Mathematics projector introduction; the linked concept workshop now provides the worked explanation.
- Begin the number-line activity with 0.008 on 0–0.01, where eight jumps of 0.001 show its location directly. Synchronize the teacher, student, projector and kit directions. Compare wider scales afterwards.
- Correct boundary feedback: 0.008 ends section 8 on that line. Preserve meaningful trailing zeroes in whole-number labels.
- Move number-line explanations out of positioned marker labels. Keep scale controls, labels and their text in normal document flow. Retain the previous-scale comparison below the line instead of overlaying two sets of captions on one axis.
- Correct factors/multiples explanations, number-of-kits labels, ratio quantities versus proportions, decimal estimates, operation order and missing factor/divisibility answers.
- Add mixed/improper fraction conversion and ordering to the independent check, plus a simple fictional savings problem.
- Require a combination of two transformations in the first quadrant in the main teacher and student route, and add an individual two-move check. Retain the optional four-quadrant extension separately.
- Supply a dimensioned 10 × 8 L-shape with a 4 × 3 corner removed: perimeter 36 cm; area 68 cm². Match the worked explanation and independent check to it.
- Replace unclear area overlays with mathematically matched triangle/trapezoid pairs and a cut-and-slide diagram. Match the angle picture to the 120° example.
- Correct material lists to describe actual on-page examples and questions. Do not claim a separate supplied worksheet or card deck merely because directions mention one.

## Curriculum comparison

Reviewed against the current [BC Mathematics 6 curriculum and elaborations](https://curriculum.gov.bc.ca/curriculum/mathematics/6/core). Broad strand coverage is present. The material includes thousandths to billions, facts, whole-number operation order, factors/multiples, fractions, ratios/percents, decimal operations, patterns/equations, complex perimeter, areas, angles/triangles, volume/capacity, transformations, line graphs, probability and consumer mathematics.

The actionable gaps in this review were depth and consistency: mixed/improper fraction assessment, complex-perimeter material, and the main route's transformation combination requirement. Prime/composite numbers, divisibility, factor trees, reflex angles, polygon angles, missing percent/whole questions and line graphs were already present in associated kits; they were not missing strands.

The [Coast Metro Elementary Math Project](https://coastmetro.ca/elementary-math-project/) provides a BC educator-authored comparison, especially its [Grade 6 number concepts](https://coastmetro.ca/elementary-math-project/grade-6/grade-6-nccf/) and [instructional routines](https://coastmetro.ca/elementary-math-project/instructional-routines/). These support sustained modelling, student practice, discussion and formative checks. They do not establish what every or most teachers teach, nor a mandatory common teaching order.

First Peoples mathematical connections need an explicit attributed lesson encounter beyond a general resource link. That remains planning work; this release does not claim that a link alone completes the curricular competency. Do not fabricate cultural context or turn community-specific art into generic decoration to fill this gap.

## Verification and limits

An independent read-only Astra review checked revised GCF/LCM, divisibility, decimal arithmetic, fraction ordering/conversion, savings, volume, transformation coordinates and geometry constructions. It found no arithmetic error in those revised examples. It also caught a print regression and stale directions, which were repaired.

Focused checks cover the real number-line functions and actual static rendering of every Mathematics student workshop, including answer-key separation and preservation of all print prompts/representations. The full repository gate passed: TypeScript, 116 tests, the production build and verification of 62 emitted files plus every copied public asset. The focused Mathematics checks passed 23 tests.

**Browser visual verification remains blocked.** The supervised preview starts, but the supported cloud browser rejects the connection with `ERR_BLOCKED_BY_CLIENT`. One supported retry also failed. No browser screenshots, responsive visual acceptance, physical printing, school-projector trial or student comprehension trial is claimed. Source-level CSS changes address the identified collision mechanism but do not prove all layouts are clear.

Before recommending the Mathematics program to colleagues as a finished teaching sequence, inspect representative actual lessons in standard, large-print and projector modes, test their controls, print the matching pages, and teach a small sample. Report each of curriculum coverage, mathematical accuracy, student-task clarity, visual checks and live publication separately.

## Publication

Baseline: GitHub `main` commit `8b6bfbae0393c9f0969c8017caf1481a01adf44e`, tree `6ba76206c74a3861dfdba0534310d1c6e0ef9fa1`, matching the retained local source. Do not reset to the older tracking branch or force a remote update.

Publication status will be recorded after the exact tested tree is published and the GitHub Pages workflow and live asset checks complete. Teacher Hub contains the full Mathematics and projector experience; this repair does not require unrelated Learn or Equity edits.
