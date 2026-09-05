# Opening lesson rehearsal — September 5, 2026

This focused rehearsal follows the Mathematics and student-language releases. It replaces the earlier blanket browser-blocked status for the specific public routes checked below. It is not a claim that the whole year's program has been taught or visually accepted.

## Repairs published

- Magnitude Gallery's worked explanation now displays the matching 0–0.01, 0–0.1 or 0–1 line. Each point is mathematically positioned at 0.008. All three models remain in the printable workshop.
- Added a distinct worked comparison, 2,306,000,000 versus 2,360,000,000, before the existing partner and independent large-number questions.
- Added actual blank equal-interval scales and a period chart to both the student workshop and teacher's student print target. The two-page PDF is `public/printables/magnitude-number-lines-and-periods.pdf`; its generator is `scripts/build-magnitude-companion.py`. Practice answers remain separate.
- Changing the interactive scale now covers the answer and clears the prediction and feedback. Students can predict again before revealing.
- Removed the stale teacher instruction that contradicted the fixed 0.008 opening.
- Repaired a live CSS specificity conflict that kept worked explanations at 13px. At the checked 1363px viewport the repaired text is approximately 23px. The step badge now uses the actual step number instead of restarting at 1.
- Discovery Quest Map now puts the goal in the My Hopes scroll. The five scrolls are response spaces; the filled goal flag is a signpost.
- Teacher, projector and Learn now share short hand-in directions: leave the front name line blank; name/date/group on back; optional PAUSED for a check-in; face-down collection. Teachers record organizer/status. Hand-in is visible outside collapsed help. Original privacy and later separate consent remain intact.

## Evidence

- Inspected every page of the existing five-page Discovery PDF. It matches Learn's copy, is legible in black and white, and has no observed clipping. The flag-writing mismatch was corrected in directions without replacing successful artwork.
- Created and visually inspected both pages of the new maths PDF. All three axes have the same physical length and ten equal intervals. Embedded fonts and response spaces are present. The public PDF opened in Chrome's viewer as two pages.
- Reproduced the old scale-reveal failure on the public site. After deployment, revealed 0.008 on 0–0.01, changed to 0–0.1, and confirmed the marker stayed covered, section buttons were enabled, and Reveal was disabled until another prediction.
- Checked actual step-to-scale rendering, the widest-scale label spacing, the large-number table in large-text mode, the final explanation size and step-4 badge. Standard and large-text routes were inspected at desktop size.
- Confirmed the teacher's actual student print target contains the sheets and PDF link, with a separate teacher answer target.
- Confirmed the live Quest Map finish/hand-in route and Learn's student hand-in wording.
- Checked the existing Equity turtle tour's Without video route. It provides an observation task and distinguishes a carried camera from an animal's vision or thoughts. No new tour collection was added.
- Teacher: TypeScript, 123 tests, production build and copied-asset checks passed. Learn: build/artifact checks and 13 tests passed. Tests include exact dot positioning, step selection, equal blank intervals, retained print content and answer separation.

## Publication and limits

Application commits: Teacher `79866a1282d13147cb8ee0e5301888a10e8f12bd`, then projector style correction `9ab9d87b125bceff68f845333cb30a2990d475ab`; Learn `26c1048127aa64f3726ce85e759ef37e7a68a3d7`. Teacher Pages runs 33958209425 and 33958354498 and Learn run 33958210457 succeeded. Final live Teacher entry asset was `index-DPHo0ABu.js`. Local and remote source trees were compared before each non-forced publication.

School-network playback, physical projector readability, physical printing, mobile layout and student comprehension were not tested. The browser's HTML Print dialog was not exercised; the PDF pages were rendered and checked, and HTML print-target inclusion was inspected. Discovery remains raster-only and untagged. Local preview access remains blocked; the supported browser could inspect public GitHub Pages. The documented need for an attributed First Peoples mathematical lesson encounter remains separate planning work.
