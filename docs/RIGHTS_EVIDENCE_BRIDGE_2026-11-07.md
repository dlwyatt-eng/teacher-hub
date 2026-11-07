# Rights-to-evidence bridge - November 7, 2026

## Scope
Prepared on current main `3a491941dfddcc6c5d34d785bbeede4cadf99caa` after checking the November 3 inquiry reconciliation. This is a concrete teaching bridge for the existing inquiry, not a replacement booklet or a newly scheduled project. No day plans, week plans, family summaries, home practice, existing PDF booklets, student records or submission requirements changed.

## Deliverables
- `public/activities/rights-evidence-bridge.html`: five-part, 35-minute lesson with a hidden teacher guide, fictional evidence cards, a model, partner comparison, independent claim repair and student-led country-search transfer. Plain HTML remains readable if scripting is unavailable. Controls support per-part hash links and Back/Forward, previous/next, all-parts view and teacher-guide disclosure. No responses are collected or stored.
- `public/printables/rights-evidence-bridge-student.pdf`: two-page source-card and reasoning pack, with teacher answers excluded. `scripts/build-rights-evidence-pack.py` regenerates it from the HTML's actual six cards, using ReportLab and installed DejaVu Sans fonts.
- Entry links in `app/rights-planning.tsx` and the final Juniper Park scene in `app/social-unit2-experiences.tsx`.

## Content review
The six teacher-created records are explicitly fictional districts, not country facts. Rights are distinguished from a particular service, policy promises from observed implementation, and a small group's account from population-wide evidence. The two arrival logs use the same five-day window but cannot establish national access rates or explain every child's experience. Different supported conclusions remain possible. Students are not assigned identities or asked for personal disclosures. The real inquiry remains student-chosen and uses sources discovered with support.

Checked primary references on November 7, 2026:
- UNICEF children's version of the Convention: https://www.unicef.org/child-rights-convention/convention-text-childrens-version (articles 2, 12 and 28; connected rights and government responsibilities).
- B.C. Social Studies 6: https://curriculum.gov.bc.ca/curriculum/social-studies/6/core (rights, evidence, perspectives and ethical judgment). This bridge alone does not claim full government-systems coverage.

## Verification
- Read the complete teacher guide, five student/projector parts, model and student PDF as a teaching sequence. Timing is 5 + 8 + 10 + 5 + 7 minutes, a suggested allocation rather than classroom-tested timing.
- Both student PDF pages were rendered and visually inspected. Embedded fonts, complete source text, two-page count, response room, link and exclusion of teacher answers checked. No physical print test performed.
- Five new automated tests cover card completeness, rights/sourcing boundaries, entry links, local asset resolution, UI state transitions, repeat clicks, teacher-guide hiding, all-parts mode and hash/history restoration. State tests use a DOM stub, not a real browser.
- Full repository quality gate runs TypeScript, content tests, public-projection checks, fresh build and artifact verification. Final counts are in the task's completion report.
- Live browser visual and interaction review was not completed: the remote preview browser could not connect to the container's local Vite server. This is a verification limit, not a claim that the published Hub is broken. Mobile visual review and HTML browser-print pagination are unverified. The separate two-page PDF was visually checked.
- Prepared locally only. No push, merge, deployment or publication performed.
