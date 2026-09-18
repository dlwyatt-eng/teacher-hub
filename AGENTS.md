# Classroom OS continuation rules

Preserve the current source and the existing GitHub Pages addresses. Compare local work with the current remote tree before editing or publishing; do not reset to an older tracking branch or force-push over newer work. Release notes describe which local and GitHub commits have identical source trees.

## Lesson quality

- Do not equate build/test success, filled fields, curriculum tags or a resource count with classroom readiness.
- Follow the text through the actual teacher, student, projector and printable renderers. A corrected summary does not repair separate projector content.
- Keep Grade 6 instructions concrete: what to do first, a model with real numbers/materials, practice, a specific product and an understanding check. Explain disciplinary terms; do not replace them with vague metaphors.
- Match every claimed supplied resource, diagram, answer and example to something actually rendered or downloadable. A direction to draw a worksheet is not a supplied worksheet.
- In Mathematics, verify numerical examples and units independently; keep model, practice and assessment aligned. Retain Math Antics as optional explanation support with a complete non-video route.
- Show manageable amounts of student text. Verify controls and graphics with the actual supported visual-review tools when requested and available. Preserve all printable questions and exclude teacher-only answers.
- Compare curriculum coverage with current official BC standards. Distinguish optional extensions from required Grade 6 learning. Teacher-authored resources are useful comparators, not evidence of universal classroom practice.

## Honest release reports

Report mathematical/content review, automated checks, visual checks, classroom use and publication as separate evidence. If browser access or another check is unavailable, say so explicitly. Repairs may be published with a stated testing limitation; do not call the entire sequence classroom-ready on that basis.

Consult `docs/MATH_TEACHING_REPAIR_2026-09-05.md` and the latest release record before continuing the unfinished review. Preserve existing strong work and address the concrete remaining problem.

## Standalone activity review

For each changed worksheet, organizer or activity, read the actual teacher, projector and student-print output as a teacher seeing it for the first time. Check that it identifies the purpose, exact starting input (numbers, source, materials or a concrete teacher selection step), a usable example where needed, student actions and finished product. Compare linked PDFs with on-page companions: a complete PDF does not establish that the on-page version is complete. A title, blank response area or passing structure test is insufficient evidence. Record exactly which routes were rehearsed and which were only inspected in source.


## Daily plan preservation

- Preserve every day plan prepared for Daryl throughout the school year. Commit student-safe plans under `content/day-plans/`, register them in `app/day-plan-store.ts`, and retain a dated copy rather than overwriting an earlier day. Keep the original when adapting a plan for another date or year.
- Do not invent the teaching date. Use an undated template until the date is known.
- Retain sequence, teaching steps, linked materials, optional continuations, and teacher-provided reflection/actual timing. Never publish student-specific private notes.
- Browser-created plans and automatic weekly-plan snapshots are device-local; preserve revision history and maintain the JSON export/import route. Never describe these as cloud-synced. Import a supplied backup before working with its plans; do not silently discard conflicting revisions.

## Keep Learn Hub aligned with published teaching

After a major day-plan change, schedule change, or addition that families/students need, update the public summary and confirmed school dates in teacher-hub/content/current-learning-window-v2.json. Distinguish planned activities from confirmed classroom experience. Run teacher-hub npm run sync:public-window and copy the resulting public/generated/public-window-v2.json to learn/app/generated/public-window-v2.json. Update relevant public resource links when new materials should be discoverable. Review both renderers, run appropriate checks, commit and publish both without overwriting newer work. Minor code/layout changes do not require a family announcement.

Teacher Hub is canonical. Preserve earlier day plans and git history. Never copy teacher fields, private notes, student names/work, or licensed uploads into Learn. Device-local calendar/day-plan edits are not automatically available remotely. Keep unknown dates approximate. Do not infer that planned lessons happened, that SpacesEDU setup is complete, or that forms were distributed. Do not send parent email as part of synchronization. An hourly ChatGPT task checks published changes and quietly skips when there is nothing meaningful to sync.
