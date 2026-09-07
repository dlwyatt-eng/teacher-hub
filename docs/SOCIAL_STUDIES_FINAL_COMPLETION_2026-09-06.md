# Social Studies final completion pass — 6 September 2026

## Why this pass exists

The current Social Studies program is a credible Grade 6 year pathway and should not be rebuilt. This pass exists to finish the parts that still create avoidable teacher preparation or pacing risk, especially in Units 3–4.

This work follows the Classroom OS architecture: preserve the curriculum, inquiry structure, local/authentic context and strongest activities; improve only the pieces that make teaching harder than it needs to be. SchoolAI or other AI may be offered selectively as a thinking partner, never as a dependency, source substitute, or replacement for the core learning.

## Parallel-work safety

This pass is isolated on branch `social-studies-final-completion-2026-09-06`, created from Teacher Hub main commit `1b7d50316b6449822d9eb7adfad36fe088b6f886` after checking the newest published work. Recent main changes focused on optional teaching resources, diagrams, ready-made activities and AI coaching infrastructure rather than changing the Social Studies program itself. Do not merge this branch until main is fetched again and the delta is reviewed.

## What was checked before editing

- `app/social-program.ts`
- `app/social-unit3-experiences.tsx`
- `app/social-unit4-experiences.tsx`
- `app/subject-catalog.ts`
- current completion/release ledger and final release gate
- the Grade 6 Classroom OS AI Ecosystem Source Pack

The existing four-unit sequence remains the right spine:

1. Place, Evidence & Perspective
2. Power, Rights & Government
3. Global Systems & Inequality
4. Solutionary Inquiry

## Findings to preserve

- Units 1–2 already contain concrete, Grade 6-appropriate inquiry experiences rather than generic discussion prompts.
- Unit 3 has strong learning architecture: migration/urbanization, inequality, supply chains/resource decisions, and cooperation.
- Unit 4 has a sound systems-to-response-to-teaching progression and separates subject understanding from production polish.
- The program already uses meaningful teacher moves, misconceptions, evidence levels, lower-prep routes and SpacesEDU restraint.
- Indigenous learning is generally source-bounded and avoids using AI to manufacture Indigenous voices.

## Completion work required

### Priority A — reduce teacher preparation in Unit 3

Provide bounded, ready-to-use starter materials or explicit fallback cards for the places where the current lesson still says the teacher must prepare the essential input:

- **Data Skyline:** a tiny dated sample dataset/card set with units, year, source and a within-place comparison. Keep it as a model/fallback, not an eternal dataset.
- **Supply-Chain Shockwave:** one complete sample product chain and one clearly labelled practice resource-decision case. Authentic Indigenous/Nation-specific case work must still use the current named source and teacher verification.
- **Cooperation Control Room:** one common Grade 6 practice case with actor-role cards and a simple cooperation matrix before students use a current issue.

Any time-sensitive dataset or current issue must retain a visible date/source and a teacher refresh note.

### Priority B — make Unit 4 workload explicit

- Set a minimum viable inquiry product so teams do not overbuild.
- Keep the evidence passport and accuracy gate more important than visual polish.
- Reconcile the timing of **Audience Test Lab + Expert Exchange**. Its listed scene minutes exceed a comfortable 3–4 block label. Use a realistic 4–5 block route or a clearly marked compressed route.
- Keep one shared team artifact plus individual understanding/reflection. Do not create duplicate SpacesEDU posts.

### Priority C — projector and Grade 6 clarity

For representative Unit 3–4 scenes, confirm that the first screen answers three questions immediately:

1. What are we learning?
2. What do we do first?
3. What will we make/show?

Prefer a diagram, physical model, source card, map, data display, role card or movement before another paragraph where that makes the idea easier to understand.

### Priority D — selective AI only where it deepens thinking

The core route must remain complete without AI, Wi-Fi or 1:1 devices. Where SchoolAI adds real value, prefer pair/small-group thinking after students have first read, observed, mapped, discussed or attempted the task. Strong candidates include:

- evidence challenge or claim-check coaching after `trace-the-claim`
- debate/counterargument coaching after students have built a first civic position
- inquiry coaching after a team has a real question and evidence trail
- revision coaching after a team has created a first explanation or teaching prototype

Do not add AI simply as another button, and do not end with students copying AI text into SpacesEDU.

## Not part of this pass

- no wholesale Social Studies rewrite
- no migration into SchoolAI/Copilot/SpacesEDU
- no replacement of authentic Indigenous-created or Nation-specific sources with AI simulations
- no new student account dependency
- no change to the overall first-half Social Studies / later Science year architecture

## First change completed

The stale Social Studies catalogue label was corrected from `Updated Aug. 13` to `Updated Sep. 6` and now honestly describes the program as being in final classroom completion rather than implying that the subject has not been touched since August.

## Release gate for this branch

Before merging:

1. fetch current main and confirm no overlapping newer curriculum edits;
2. compare the branch against current main file by file;
3. run the Teacher Hub test/build gate;
4. inspect representative Unit 3 and Unit 4 projector routes;
5. verify no teacher-only answer material leaks into student projection/print;
6. check any newly added external/current source immediately before release;
7. merge/push only after a non-forced forward integration.
