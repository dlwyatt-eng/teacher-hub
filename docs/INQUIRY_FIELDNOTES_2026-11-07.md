# Inquiry Fieldnotes · November 7, 2026

## Scope and purpose
Optional student-safe country inquiry workspace at `activities/inquiry-fieldnotes.html`, linked from the country inquiry overview (including compact view). Warm paper/forest visual treatment, responsive two-column evidence comparison, meaningful headings and high-contrast focus controls. It is a working aid, not another required task or portfolio post. No changes to dates, week plans, SchoolAI prompts, rights lesson or assessment standards.

Students bring a teacher-checked source or printed excerpt, choose their question/two countries, and use four steps: starting idea → evidence from both places → missing perspectives → supported revised or retained idea. Evidence notes ask for author, title, date, place, population and traceable location. A fictional bus-route example explicitly cannot be used as country research. Talk/draw/write routes preserve the same evidence expectation; no recording is required. The final checklist checks explanations, not decoration or box completion.

## Privacy and saving
No accounts, analytics, storage, network calls or uploads. Fields remain in the open document only; the page explicitly warns that it does not save. Print/save PDF copies field values as literal text, preventing typed HTML execution; repeated printing replaces stale copies. Printed source prompts remain visible even on blank copies. Do not enter private information. This page does not post to SpacesEDU.

## Verification
- TypeScript check passed.
- Two new automated tests passed, including print-button behaviour, literal-text handling and repeat-print replacement. Five existing rights-bridge tests passed, including overview renderer/link coverage.
- Production build and Pages artifact check passed (all copied public assets checked).
- Source rehearsal: starting instructions, field labels, model, support drawers, final product/check, blank-paper and completed-field print routes reviewed. Mobile CSS uses one column; print hides navigation/help and preserves student work without clipping textarea heights.
- Actual browser/visual QA is **not complete**. Chromium could not start: `socket() failed: Operation not permitted`. No claim of visual or classroom-use verification is made. Review desktop, phone and print appearance when a browser-capable environment is available.
- Publication is coordinated separately by the root/release worker, not performed by this feature worker.
