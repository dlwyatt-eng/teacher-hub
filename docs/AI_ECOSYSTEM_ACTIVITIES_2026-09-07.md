# Selective AI support and ready-made activities — 7 September 2026

## Scope and preservation

Implemented from the user-supplied `Classroom_OS_AI_Ecosystem_Source_Pack.docx` and the accepted implementation prompt. Baseline is published Teacher Hub commit `981f50bdfe928c779905abfdaef955a052618eb5`, including Hope in Action. Work used a new worktree from origin/main; the older retained local Teacher Hub checkout was not reset or used as the publication parent.

Learn baseline `a9b3b6f66facda050092b5b44560b574dac396a8` and Equity baseline `4bb1622ba51d26074dd2ff5da9b80f443d36cbe2` have the same source trees as their retained local checkouts. Their existing student-safe and standalone routes were inspected. No new student join link is available, and the new resources are teacher-operated, so neither repository requires a copy of these teacher tools. Public hosting and the three established addresses remain intact.

## Implemented

- One data registry and shared visible activity panel, used by the existing TeacherRunSheet. Its top shortcut jumps to the appropriate activity. External questions stay with the publisher. Access notes and offline routes are available; no student responses are stored.
- Three ready-made Math by Kahoot sets across four math lessons, plus one PhET simulation in the Newton's laws lesson.
- The optional question builder is labelled as custom preparation; it is no longer presented as ready-made Kahoot access.
- Seven lesson-specific coaching plans extend the existing SchoolAI panel: magnitude, factors/multiples, equivalent fractions, ordinary-object story revision, Character Council, Trace the Claim, and force investigations. Each names the point of use, first human attempt, evidence, coaching move, finished human work and no-AI route. Existing Studio packs remain available.
- All generated coaching instructions use the strength/evidence/one-next-step/one-question feedback pattern. The teacher controls grouping; the default remains teacher projection.
- AI Activity Studio includes an optional district Copilot evidence pilot with a selectable/copyable prompt, file-readability checks, evidence-grounded feedback, human review and selective SpacesEDU handoff. It does not connect accounts, transfer evidence, create a database or require bulk portfolio exports.
- Preview compatibility: preserve existing Vite setup while explicitly allowing the supported preview host. No dependency changes.

## Resource review

| Resource | Lesson | Checked and limitations |
| --- | --- | --- |
| [Decimal place value](https://create.kahoot.it/details/1-1-decimal-place-value-to-thousandths/f400b2b7-2675-4940-b234-49c7fc73815b) | magnitude-gallery; decimal-dispatch | All six item records and answer text inspected, including the pin-answer target and reflection item. Decimal place values recalculated. Public detail and flashcard launch/reveal opened without sign-in/payment. Pictures can reveal answers; labelled as supported practice. |
| [Factors and multiples](https://create.kahoot.it/details/3-1-factors-multiples-prime-composite-numbers/09d64bc5-a34f-48ac-88d4-34b77898bd94) | pack-and-sync | All twelve item records inspected; arithmetic, definitions and factor tree checked. Public detail, Flashcards and answer flip verified without sign-in/payment. Flashcards showed 11 cards, omitting the confidence scale; no claim that all modes contain the same items. |
| [Equivalent fractions](https://create.kahoot.it/details/5-1-understanding-equivalent-fractions/0297d235-cb87-49b4-8fdf-c93ed61365dd) | fraction-ratio-remix | All ten item records/answers inspected; equivalence and cup calculation checked. Public detail, flashcards, reveal and advance verified. Fraction notation and circle models visually inspected. Teacher note specifies nonzero scaling and the same whole. |
| [PhET Forces and Motion: Basics](https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html) | force-patterns-lab | Public publisher description and simulation opened. Net Force drag/drop, start, force values and net-force display tested. One small puller each: 50 N each, net 0. Adding one blue: 100 N left / 50 N right, net 50 N left. Other screens not fully rehearsed. |

Kahoot flashcards are used as teacher-led discussion, not an individual assessment report. No paid live-hosting feature, shared-team limit, complete game session or school-device compatibility is certified. Confidence scales are not a new online survey workflow; students can reflect orally or privately on paper. [Kahoot's self-study guidance](https://support.kahoot.com/hc/en-us/articles/31566898896029-How-to-learn-and-practice-with-Kahoot-self-study-modes) explains the modes and absence of study reports.

### Candidates not added

- `307ad506-ee0c-4e2a-9aaf-e5ffa8f8b028`: premium factors/multiples set with ambiguous grouping wording. Stronger alternative selected.
- `bc14619e-d2a5-408c-9d8a-2858a29b5b87`: premium equivalent-fractions set; accessible alternative selected.
- `98216f56-2ecc-4461-be8d-98b44e0b245d`: Finding Nemo fact/opinion set blurs testable assertions and opinions and depends on film interpretation. Not used for evidence literacy.
- [Parliament Levels of Government game](https://learn.parl.ca/en/games/game4/index.html): official search result found, but browser security verification persisted after one reload. Not promoted as reviewed or ready to play. The site was not bypassed.

## Account and approval boundaries

SchoolAI instructions are prepared, not active Spaces. No teacher account creation/Space authoring/AI response test occurred. Creation, preview against good/incorrect/answer-seeking responses, and a genuine student join URL remain teacher-only steps. Student routes do not expose the setup panels. A source-pack screenshot or catalogue name does not prove a Space URL or current availability.

The Copilot workflow is a pilot. [Microsoft's access guidance](https://learn.microsoft.com/en-us/microsoft-365/copilot/get-ready-copilot-sharepoint-advanced-management) supports checking file permissions, not assuming that a tenant or district permits every data use. Public Surrey AI event pages do not establish current approval for identifiable assessment evidence. Confirm that locally before using such records; begin with fictional/de-identified samples. No student evidence was processed in this work.

## Verification

- Existing full gate passed 147 tests, TypeScript, public-window checksum, production build and emitted-asset checks before the final science/data and wording additions. The final full test run passed 146/147; its sole failure expected the deliberately renamed "Kahoot / whole class" label. Updated that expectation to "Custom quiz text" while preserving all privacy/student-view assertions; the five affected tests then passed. Rebuilt the final source and checked its artifact. The deployment workflow runs the full gate again; its result is reported in the handoff.
- Browser preview now works. Reviewed the magnitude activity shelf in standard and large text at native 1363 × 936, fixed sticky-header jump offset, and checked lesson switching to the correct factors resource and prompt.
- Reviewed the factors projector at large text: lesson selector, goal, task, stages and workshop fit without overlap. Zero teacher setup textboxes were present. This is representative browser evidence, not an all-lesson projector certification.
- Trace the Claim's actual Social Studies teacher renderer displayed the targeted evidence-checking coaching plan, confirming integration through the separate Social Studies route.
- Opened the Copilot workflow and invoked Copy. The HTTP preview blocked clipboard access and showed the intended selectable-text fallback; HTTPS copy remains a deployment check.
- No physical school-projector trial, mobile viewport resize, printer trial, student-comprehension trial, SchoolAI dialogue test or district Copilot test is claimed.

Continue to treat curricular fit, content accuracy, browser behavior, deployment and classroom use as separate evidence.
