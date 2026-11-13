# Fractions studio: connect the models

## Purpose and scope

Improve the existing Pieces → wholes investigation, not add a new assignment. Students can switch between equal strips, a fixed-scale number line, or both views. All three use the same numerator and denominator. Regrouping and revealing the number names do not move the marker. A native range control lets students choose the amount without repeated taps; the existing plus/minus buttons remain.

The number line keeps 0–4 fixed when the denominator changes. Whole-number ticks and equal fractional intervals are distinct. Descriptive SVG text exposes the same amount without relying on colour. The existing question choices, initial seven-quarters model, reveal behaviour and four-whole limit remain. Reset restores the opening strip view. No account, tracking or persistence is added.

The paper companion retains every existing question and blank response. A blank quarter-number-line offers an alternative representation of the same seven-quarters example. Teacher guidance now connects whole strips to intervals between whole numbers. This does not claim that fractions has already been taught, change dates, assign new work, or change the public homework menu.

## Checks

- Mathematical tests inspect the actual rendered SVG for every supported numerator at denominators 2, 3, 4, 5, 6 and 8. They verify the unchanged axis, proportional marker position, subdivision count and accessible description.
- Equivalent fractions 3/2, 6/4 and 12/8 share a position. The 11/3, 17/5, zero and four-whole boundary examples are covered.
- Component-handler tests cover view changes, regrouping, reveal clearing after edits, changed denominator, reverse question, repeated switching and reset. These are state tests, not browser interaction tests.
- Teacher and student route rendering, paper-question preservation, TypeScript, all repository tests, production build and Pages artifact validation are run before release. Record the actual final results in the delivery report.

## Verification limits

Fresh browser layout, keyboard focus, touch, physical print and projector checks have not been performed in this executor. Prior Chromium attempts in the shared executor were blocked by socket permissions; this work does not bypass that restriction. Responsive CSS and a semantic native range input reduce risks but do not establish visual acceptance or classroom readiness. The source, an interactive standalone review and tests are saved for continued review.

## Preservation

Started from remote main b5ae2eb in an isolated worktree. No family canonical-manifest changes or other ongoing work are included. Reconcile with the current remote before publishing and preserve all intervening commits. Main publication and deployment verification are reported separately from local completion.
