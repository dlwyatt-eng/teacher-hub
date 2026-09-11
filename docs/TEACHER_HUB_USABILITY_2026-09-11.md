# Teacher Hub usability comparison — 11 September 2026

## Baseline

Compared current public Equity and Teacher Hubs in the cloud browser. Equity main: `40cc9c78371be215428e5dc623110ad20e149921`. Teacher main: `3072663ad9b01028b54b87300dea79e46653491c`, tree `5d18acd102152c60f9b806ceaf04383aad804925`, identical to local retained `af96aab`. Worked in an isolated checkout; preserved the September 10 projector-language changes, scrolling fixes, TOC resources, curriculum, and public addresses. Read the attached Classroom OS AI Ecosystem Source Pack.

## Flow comparison and changes

1. **Home / choose a task — improved.** Equity offers a short menu and a clear teaching task. Teacher Home led with a large opening-week sequence and a 26-destination sidebar. Put all eight subjects and Morning Screen / Week plan / TOC actions first. Keep opening materials, daily preparation, pinned lesson and welcome instructions in named expandable sections. Group planning, inquiry and assessment tools; keep core navigation visible. Show plain subject descriptions instead of development status/count jargon. Preserve Daryl's identity and links; add a concise first-visit guide for other Grade 6 teachers.
2. **Choose and prepare a lesson — improved.** Subjects default to Lessons on a fresh visit; remembered subject locations still work. Teaching tabs precede official standards. Curriculum records remain available. Shared lesson catalogue and unit theme move into expandable sections; Social Studies unit context and source preparation use the same approach. Show the finished-work criteria in run sheets and a direct Open student screens link, with the correct Mathematics/shared, Social Studies or Science route. Remove redundant audit badges/introduction copy from the teaching entry.
3. **Project / discuss / reveal — improved, still scrollable.** Common-subject projector keeps change-lesson controls collapsed. Consolidate the goal, first action, finished product and learning companion under Get ready in existing Lesson help. Remove repeated Mathematics workshop headings on screen while preserving print content. Keep one active lesson part, step controls and paper routes. This reduces material before the activity; it does not promise every lesson fits into a single viewport.
4. **Phone and enlarged text — checked in representative routes.** Mobile menu closes after selecting Weekly Plan. Existing focus behaviour retained. Visible controls and text inspected in standard and large-text mode. No horizontal page overflow in the 390px phone frame or 1366px projector frame (375px and 1351px document content widths respectively), or native desktop Science view.

## Verification

- TypeScript passed after final source changes.
- All 157 existing tests passed after final changes. Two status-label assertions were updated because the deliberately removed hero badges should not substitute for teaching previews; underlying catalog checks remain.
- Production Vite build, Pages postbuild and artifact gate passed: 68 emitted files, all copied public assets reachable; initial 141.7 KB JS and 85.5 KB CSS gzip.
- Browser: Teacher Home, Mathematics lesson preparation and direct projector link, Lesson help setup and Ask & check (answers concealed), Scale City section-eight prediction/reveal, return to planning; Social Studies Three maps of Fleetwood direct projector link and preserved instructions; Science lesson selection, The mystery mixture direct projector link and large text. Mobile Home/menu/Weekly Plan action and representative viewport widths checked using fixed-size frames.
- Reviewed current-run screenshots of Equity start/preview/student screens and Teacher before/after Home, subject reference, Mathematics projector, final lesson preparation and Science. The user-facing visual comparison includes selected accepted captures.

## Limits

No full new curriculum/content audit, school-projector trial, student comprehension trial, screen-reader audit, true 200% browser zoom, or fresh printed-PDF pagination review is claimed. Source changes preserve student-print content and answer-key separation; system printing was not tested. Science and Social Studies retain their subject-specific projector layouts. Other common subjects receive the shared changes but were not each rehearsed end to end.

No AI dependency, new evidence storage or portfolio duplication was added. Core learning and existing paper routes are preserved.
