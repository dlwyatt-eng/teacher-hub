# Inquiry Fieldnotes editable copies — 13 November 2026

Prepared from remote main `4b6e2155860df32be14d43a5c249ddf2adf7a195`. Release notes for the explicit local-file workflow. No changed assignment, date, inquiry example, teacher sequence, family summary or personal information.

## Student flow

Download editable copy produces `inquiry-fieldnotes-editable.json`. Next class, Open saved notes reads only the explicitly selected local file, previews the nonblank-field/check counts and short question/country excerpts, and requires Replace current notes with this copy. The preview explains that all ten fields and three checks are replaced, with no undo, and directs students to cancel and keep their existing copy first. Editing during reading or preview cancels the pending replacement. Cancel and invalid files preserve current notes. A later download request never claims a verified save or clears the existing leaving warning.

Text download and print/PDF remain available for reading and printing. They cannot reopen here, including old text copies: heading delimiters and the old `(not recorded)` marker are ambiguous. The UI states this explicitly.

## Format and trust boundary

Version 1 is a JSON array: format marker, numeric version, ten ordered `[field-id, string]` pairs, and three ordered `[check-id, boolean]` pairs. Exact array lengths, IDs, order and primitive types prevent missing, extra, duplicate or misassigned fields. This intentionally avoids JSON object keys and prototype merges. File reads are capped at 512 KiB; each field is capped at 12,000 UTF-16 code units. Control characters and browser-normalized line breaks are rejected to avoid silent loss. Export also checks encoded Blob size, so it cannot request a file exceeding its own import limit.

No imported markup, scripts or URLs are interpreted. Values use `.value` and preview uses `.textContent`. No storage, accounts, uploads, requests, tracking or imported navigation. Generation tokens ignore stale async completions; snapshots guard against changes without input events. Confirmation and cancellation restore purposeful focus. The confirmation button describes its preview and overwrite warning to assistive technology.

## Verification and limits

Production-script VM tests cover all fields/checks, literal markup and heading text, empty and maximum-length notes, exact round-trip, malformed/partial/legacy/oversized/wrong-type/wrong-version inputs, duplicate IDs, encoding-size limits, read failures, overwrite confirmation, repeated confirmation, cancellation, edits during reading/preview, later file selection, stale successes/failures and unchanged leaving warning after download. Existing tests exercise topic/move keyboard handlers and print literal-text copying. Independent read-only review found no blocking security or correctness issue; its accessibility suggestion was incorporated.

Source inspection preserved original purpose, two-country question, teacher-checked source starting input, invented bounded example, four inquiry cards, understanding checks and finished product. The student-print source still copies literal notes and hides file controls. No lesson content was replaced.

Full `npm test` passed: public-window check, TypeScript, 340/340 unit/regression tests, production build and artifact verification. Fresh browser visual and native file-picker QA was not available in this environment. Actual native file-picker behavior, browser download delivery, visual desktop/mobile layout, real keyboard/screen-reader operation and printed/PDF pagination have not been freshly tested. Automated evidence is not classroom-use validation.
