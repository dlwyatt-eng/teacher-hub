# PHE sequence and maths readiness

## Scope

Adds two teaching resources to the existing subject Units and Lessons views. This is a flexible resource sequence, not a change to dated plans or a record of lessons taught. Interim reports and student checkoffs remain the teacher's separate workflow. No student records, account, scores database or automatic grouping are introduced.

- PHE: `?view=PHE+Sequence`; select a week and health, skill teaching or familiar captain practice. Six weeks contain 18 complete lessons and six printable health activities. Health is 35 minutes; PE is 40 minutes with explicit 30-minute alternatives. The weekly health proposal does not silently replace the existing seasonal plan.
- Maths: `?view=Maths+Readiness`; a six-item entry check, three evidence-informed practice routes, independent fresh checks, and a separate multiplication readiness check before the optional partial-products model.
- Append `mode=student` for projection. Selections use `pheWeek`, `pheBlock` and `mathRoute`; Back/Forward restores them. Teacher plans, keys and downloads are absent from the student DOM. This is a teacher-operated projection, not an access-controlled test: its route selector can open the teaching model deliberately.

## Teaching and curriculum boundaries

PHE revisits movement, relationships, boundaries, health-information literacy, wellbeing and help seeking. The guide names whole-year content outside this six-week selection. Movement options remain meaningful physical practice; observer explanations are strategy evidence and are not claimed as physical performance. All cases are fictional; no personal health disclosure, body rating or disability simulation is requested. Teachers supply and inspect equipment, confirm actual school help routes and approve familiar captain activities.

Maths responds to the existing plan's unstarted comparison work and mostly completed rounding work. The checks revisit earlier place-value and whole-number ideas to support Grade 6 learning. Rounding repair is conditional. Decimal comparison success does not establish multiplication readiness, and no score threshold assigns groups. All core inputs are original and complete offline. Existing optional Math Antics and MathUP resources remain linked through the established lesson, without copying licensed content.

Official curriculum/source URLs and their scope notes are stored in each JSON and printed in the teacher guides.

## Maintaining the resources

1. Edit `content/phe-six-week-sequence.json` and `content/maths-readiness-pathways.json`. These files drive both the web views and print packs.
2. Preserve the distinction between PHE `check` (teacher observation) and `studentCheck` (student task). Health projection uses the complete `studentPage.prompts`.
3. Generate with `python scripts/build-phe-maths-packs.py --out ../output/pdf` (ReportLab and DejaVu Sans required). Render every PDF page and inspect its layout and supplied inputs.
4. Copy the four PDFs to `public/downloads/phe-maths/` using their existing filenames.
5. Run `npm test` and `git diff --check`. Rehearse actual selection, projector tasks, keyboard steps, teacher-only material and downloads. Recompare the remote main before a normal fast-forward publication.

## Verification record

Prepared from remote main `a53e9de516a731977431347beb36a842687a1faf`. Independent content review checked all 18 lesson timings, curriculum scope, access and safety, and existing experience links. Independent maths review verified 31 answer/model records, including boundary conditions, digit permutations, rounding and partial products.

Four rendered-component regression tests exercise actual PHE tasks, student checks, maths answer separation, independent bridge sequencing and teacher-only DOM sections. Browser rehearsal is a postdeployment gate because the cloud browser cannot open the local preview address. No classroom-use or mobile-device trial is claimed.

Prepublication: the full `npm test` release gate passed (237 tests, TypeScript, production build and copied-asset integrity). `git diff --check` passed. All 45 PDF pages were rendered and visually reviewed: PHE teacher 21/student 6; maths teacher 11/student 7. Student/teacher content separation and canonical task coverage were checked in the PDFs.
