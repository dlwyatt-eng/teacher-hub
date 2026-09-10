# Projector explanation and access pass — 10 September 2026

## Baseline and scope

Fetched Teacher Hub main before editing and again before publication. Started from `26fe2f2d61d035b02b7f292da7e687cf0e83dff6`; preserved the newer projector scrolling repair (`234f67d`) and complete opening/Time Capsule resources (`26fe2f2`). The earlier Social Studies completion and Earth work remains in ancestry. No preliminary branch was merged. Read AGENTS.md, the prior Math repair record, and the supplied Classroom OS AI Ecosystem Source Pack.

This pass addresses the follow-up request for understandable Grade 6 explanations and enough teaching support inside projector mode. It does not rebuild the four Social Studies units or repeat the preceding supplied-materials release.

## Gaps and repairs

- All 17 Social Studies experiences now have an authored plain-language idea, a concrete three-step worked example, and a specific discussion question with an answer that is revealed deliberately. The examples also replace generic readiness examples in Plan view.
- Simplified Unit 3–4 directions and finish descriptions: what a partner can do; who has the right to decide; results to check later; where a change could help; what to record at response stations; and a rough paper version that another team can try. Revised corresponding Unit 4 activity headings and prompts, not only summaries. Explained several academic vocabulary definitions more plainly.
- Added one collapsed **Lesson help** control to the Social Studies, Science, and shared subject projector renderers. Its four choices are **Get ready**, **Explain & model**, **Ask & check**, and **Sources & print**. Only one panel appears at a time. Setup, materials, models, checks, teacher-selected resources and print tools no longer require changing to Plan mode. Teacher-only discussion guidance remains behind explicit reveal controls.
- Consolidated the optional-resource chooser into this support area rather than displaying a second copy of it. Existing primary activities and supplied Social Studies materials remain in place.
- Student kits can be printed from the shared projector renderer. Existing answer-card filtering is preserved. The new help panel is excluded from ordinary printing, with an exception for an explicitly selected student print target inside it.
- Help text increases from 18px to 24px in large-text mode. Restored visible numbering and bullets in help. Added accessible names to the large-text and display-mode buttons. Fixed narrow-screen mode-label overflow and let the Social Studies title scroll away on small screens.

## Preserved content and sources

Kept the four-unit architecture, existing strong Unit 1–2 activities, Unit 3 starter packs, Unit 4 minimum product and corrected pacing, dated evidence, Nation-specific sources, and Story of Stuff advocacy/source-checking approach. No additional SchoolAI activity or SpacesEDU upload was added. Paper routes and selective evidence remain intact.

No external source URL or current-events claim was changed. This is not a new live-link or legal/current-events verification pass. New practice examples are explicitly fictional, or use already supplied lesson inputs. Checked the data example against the supplied 2022 figures (95 − 72 = 23 percentage points; overlapping age groups), the fictional borrowing count (20 − 14 = 6), and the supplied migration story. The preceding release’s source-verification record remains applicable with its stated dates and limits.

## Validation and limits

- 157 repository tests pass, including TypeScript, curriculum/content gates, answer-hidden initial rendering and complete explanation coverage for all 17 Social Studies lessons.
- Browser rehearsals: Three maps of Fleetwood, City Moves, Data Skyline, Pull the System Thread; Mathematics “How big is this number?”, Language Arts “The story inside an ordinary object”, and Science “The mystery mixture”. Opened support panels, checked specific examples, tested answer reveal, and inspected supplied materials/print controls without switching mode.
- Actual browser screenshots reviewed at the native desktop size and in fixed-size lesson frames at 1366×768, 1920×1080, 768×1024 and 390×844. Standard and large text were checked. The mobile help panel measured 329px content and scroll width at 24px text, with no horizontal overflow. Small-screen fixes were rechecked visually.
- Browser zoom shortcuts did not change the controlled browser viewport; true 200% browser zoom is not claimed. Large-text mode was verified separately.
- Existing printable contents and answer filtering were inspected in source; print links/tools were checked in the browser. A fresh system print/PDF export was not available in this browser session. No existing PDF was modified. This is not a claim of a new end-to-end PDF pagination review.
- A repeated build while the supervised preview was active left stale emitted assets and correctly failed the artifact reachability gate. The preview was stopped; the final clean production build and artifact check passed (68 emitted files; initial JS 141.0 KB and CSS 84.1 KB gzip). The temporary responsive review page is excluded from the commit and deployment.

The shared access improvement covers all eight subject areas. It does not establish that every explanation in every other subject has received a new sentence-by-sentence readability audit. No new curriculum source or owner decision is needed for this targeted repair.
