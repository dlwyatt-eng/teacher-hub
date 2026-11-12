# Integrated Teacher Hub design QA

final result: blocked for publication; ready for design review

## Visual target and scope

The approved blend uses the warm Wonder Atlas welcome, an immersive illustrated entrance, and a softer side-by-side evidence workspace. This is a design adaptation rather than a pixel clone: the broader Social Studies framing replaces the earlier child-rights emphasis, and the existing classroom controls remain intact.

The reviewed implementation is the current-repository worktree: shared app shell and Home, Better World journey, and Fieldnotes. The base commit is `cabf71aa2be93dfd3b2ab87dcf3498a92f230ad6`. No source changes were published.

## Rendered comparison

The Wonder Atlas reference and the rendered inquiry entrance were compared together at 1487 × 1058. Both retain warm paper, forest display type, a large illustrated landscape and a clear inquiry invitation. Intentional changes are a calmer navigation bar, the broader question, a separate curriculum entry area and original teacher guidance below the entrance. The new landscape is clearly labelled as imagined, not country evidence.

The app was inspected at 1440 × 1000, 390 × 844 and 320 × 844. The inquiry was inspected at 1487 × 1058 and 390 × 844. Fieldnotes was inspected as a full-page desktop capture with a fictional test entry.

Evidence is retained in the design project's `qa-evidence` folder: `home-1440.png`, `home-mobile.png`, `home-mobile-large.png`, `home-narrow-fixed.png`, `home-narrow-fixed-large.png`, `journey-1487.png`, `journey-mobile.png`, `journey-mobile-large.png` and `fieldnotes-filled.png`.

### Fidelity surfaces

- Typography: large Georgia headings, readable body copy and distinct small labels render cleanly. Large text visibly enlarges the new surfaces and form fields without losing the fictional entry.
- Spacing/layout: the existing Run the Day controls follow the illustrated welcome, followed by subject controls and the optional inquiry invitation. Phone layouts stack cleanly. A 320px toolbar overlap was found, fixed with a wrapping second row and rechecked in both text sizes. Measured horizontal overflow is zero at 320px Home and 390px inquiry.
- Colour/tokens: paper, forest, sage, lime and restrained coral form a consistent shared language. Selected controls are distinct in the inspected states. This is not a complete contrast or forced-colours audit.
- Imagery: the generated landscapes render sharply at the inspected sizes, retain their focal areas and include explicit imagined-scene captions.
- Copy/content: the broader inquiry question, five starting points, six revisitable moves and optional-support framing are clear. Fieldnotes preserves all ten fields and its explicit no-autosave explanation. The two evidence cards provide a quieter comparison surface.

## Interaction checks completed

- Current 10 November classroom plan displayed correctly.
- Selecting 13 November, moving to Shape of the Day, entering projector mode, and opening/closing the welcome attendance dialog preserved the chosen day.
- Plan mode and a Science route opened correctly.
- Search for Crash Lab found one result and opened its actual teacher lesson.
- Mobile menu opened and Escape returned focus to its trigger.
- Inquiry Compare move and topic changes worked. ArrowRight and Home keyboard interactions selected the expected tabs.
- Fieldnotes accepted a fictional entry. It survived toggling Larger text, and the input text enlarged to 19px.
- Inquiry larger-text mode at 390px retained zero horizontal overflow.

The observed journey console contained extension-origin metadata errors, not application-origin errors. This limited sample is not an all-routes console audit.

## Changes made during QA

1. Source review corrected Large text label/caption sizing and compact black-on-white home print rules.
2. Rendered 320px review exposed crowded toolbar controls. The toolbar now uses two wrapping rows on narrow screens. Fresh standard and Large text captures verified the repair.
3. The full test/build pipeline was rerun after the toolbar fix: 318 tests passed and the production artifact check passed.

## Remaining release gates

- Actual printed/PDF output and pagination are unverified. Clicking Print did not produce a visible preview in this review environment, and subsequent browser calls timed out. No app-specific print defect has been established.
- Text export reached its on-page requested status, but the browser download completion wait timed out. File delivery has not been verified. The literal-text export logic passes automated tests.
- A full keyboard-only traversal, browser Back/Forward sequence, 200% zoom, forced colours, reduced-motion rendering and blank/long-filled print layouts remain to be checked.
- Fieldnotes still needs a dedicated narrow-phone interaction pass beyond source responsive checks.

These limits block a publication-ready claim. The design and working integration can be reviewed now. No live release should occur without the user's approval, reconciliation with the latest remote source and the remaining release checks.
