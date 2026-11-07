# Pieces → wholes · 7 November 2026

Scope: add an interactive mixed/improper fraction entry to the existing `fraction-ratio-remix` lesson. Existing ratio work is retained. No schedule, assessment or student data was changed.

## Routes
- Teacher: `?subject=Mathematics&experience=fraction-ratio-remix&mode=teacher`
- Projector/student: `?subject=Mathematics&experience=fraction-ratio-remix&mode=student` (Explore is first, before the existing explanatory workshop)
- Paper: `printables/fraction-explorer-paper.html` (browser Print button, actual equal strips, no teacher answer key)

## Mathematical/content review
Seven quarters regroup into 1 3/4; 2 1/3 reverse to seven thirds; 11/4 regroup into 2 3/4; 8/4 is 2. Whole strip size is invariant. Changing denominator explicitly resets the model rather than suggesting the quantity is preserved. Complete-whole and zero cases do not display spurious zero fractional parts. Non-simplified mixed forms preserve the original pieces, with 6/4 → 1 2/4 → 1 1/2 as an extension.

All controls have labels and native keyboard operation; no dragging, animation, account, student data collection or upload. A large-screen type option and narrow-screen single-column layout are supplied. Discovery comes before reveal; talk, point, draw and write are valid response modes.

## Verification
Automated model tests exhaust all supported numerators and denominators; actual TSX initial render is checked, alongside integration and paper-content tests. Run `npm test` for the final release. Local Chromium screenshot execution was attempted but blocked by the environment's `socket() failed: Operation not permitted`; no visual browser QA or classroom use is claimed. Review live desktop/mobile and interaction states after deployment when the supported browser is available.

## Four-whole capacity repair
The Monday plan includes 11/3 = 3 2/3 and 3 2/5 = 17/5. The initial three-whole ceiling prevented building those examples. Model validation, Add-button bound, drawn strip count and accessible label now consistently allow four wholes, sharing a single capacity constant. Denominators, task choices, reset and the paper sequence are unchanged. Regression tests cover both plan examples, exact four-whole values, and rejection beyond four wholes.

Prior published version: Teacher commit 2fb8fc68e5644595bf73da4ebf2d3c4e0c2f6115; Pages CI 42355777581 passed. Release worker verified desktop live interaction, reset and paper route. No actual mobile viewport review was completed. This repair needs its own post-deployment verification.
