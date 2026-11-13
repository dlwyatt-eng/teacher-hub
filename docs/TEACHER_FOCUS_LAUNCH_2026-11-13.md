# Optional teaching focus view — 13 November 2026

Base: `eec5f28d181612b833970c094295b9e1336ee3d4`.

## What changed

The existing teacher run sheet now has an explicit All moves / Focus · one move switch. All moves remains the initial view. Focus presents one existing teaching move with its timing, action and understanding check, bounded Previous / Next controls, and a textual position indicator. Preparation and launch media remain available above the move; existing no-tech directions appear directly below it. Student-screen access, when provided by the lesson, stays in the header alongside the full run-sheet print action. No student worksheet link is invented.

Focus and All moves share the normalized existing route. Returning to All moves and back keeps the current position. Changing the lesson identity, question or route remounts the transient view and resets the position. Nothing is stored. Add to day/week, lesson navigation, SchoolAI and ready-made activity controls are retained. SchoolAI scrolling now respects reduced motion.

Print keeps the pre-existing full route mounted and explicitly displays it even when Focus is selected. Focus controls and duplicate focus text do not print. Existing print omissions, including the optional background/support disclosure, remain unchanged; the label therefore promises all teaching moves, not every optional support section. No curriculum, assignments, dates, answer boundaries, public manifest or family content changed.

## Verification

- Full `npm test`: public-window consistency, TypeScript, 332 Node tests, Pages build and 114-file artifact check passed.
- Six focused tests exercise production component trees and real event callbacks with a small hook-state harness: repeated mode switching, bounded rapid navigation, empty and one-move routes, keyed lesson reset, complete printable route retention, repeated SchoolAI focus/scroll actions, and missing student-link guidance.
- Independent read-only code review covered state transitions, print preservation, optional-support targets and accessibility. Its two wording/optional-link findings were fixed.
- `git diff --check` passed. Build retained the existing non-fatal large-chunk warning.

## Limits

The hook harness, server-rendered markup and CSS/source assertions are not browser QA. Browser visual review was unavailable because of the previously established Chromium socket permission restriction; it was not retried or bypassed. Actual keyboard/assistive-technology behavior, narrow-screen and enlarged-text reflow, forced-colour rendering, print preview and printed pagination remain unverified. CSS adds wrapping, native button focus/pressed/disabled semantics, a polite position announcement, forced-colour rules and explicit print separation, but these do not establish visual or classroom readiness. No classroom-use or new curriculum review is claimed.

Publication and remote CI must be recorded separately after reconciliation with the then-current main branch.
