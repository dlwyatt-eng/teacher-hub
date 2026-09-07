# Earth, Stuff & Fairness: bounded implementation

Status: implementation branch opened; not a publication or classroom-readiness claim.

User authorization: implement Story of Stuff connections, Grade 6 global inequality and responses, a standalone multi-grade Equity Hub Earth Month pathway, and safe Student/Family connections. Preserve current lessons, Pages URLs, first-week routines, and unrelated work.

Verified starting Teacher Hub main: 1b7d50316b6449822d9eb7adfad36fe088b6f886. The previously reported rollback target 981f50bd is NOT used. Equity Hub main: 4bb1622ba51d26074dd2ff5da9b80f443d36cbe2.

Audit findings: Global Systems & Inequality already includes Data Skyline, Supply-Chain Shockwave and Cooperation Control Room. OptionalTeachingResources is rendered in both teacher and projector routes. Equity Hub already has earth-day-systems, a 35–60-minute claim-check and measurable-action lesson in content/master-inquiry-pack-v1.json. Extend these; do not describe Earth Day as absent. An empty GitHub code search reported incomplete_results=true, so it cannot establish a repository-wide absence of Story of Stuff.

Scope:
- Source-backed, dated film shelf: Stuff, Electronics, Bottled Water, Plastic animated short, Solutions and Change. Citizens United is a teacher-preview/older-grade US-specific optional extension, not Grade 6 core.
- Concrete Grade 6 sequence with supplied fictional product cards, explicitly labelled real data, models, student actions, products, exit checks and teacher assessment examples.
- Global North/South labels distinguished from geography; East/West treated as a contested political frame, not a ranking of peoples. Compare within-country inequality as well as between-country power. Do not prescribe a political conclusion.
- Evidence of change: distinguish announcement, agreement, implementation and measured outcomes. Pair advocacy films with independent primary sources. Old film statistics are not current facts.
- Earth Month routes K–2, 3–5, 6–8 and 9–12, with object-based younger-grade routes and no required whole-film viewing, purchases, donations, petitions, private disclosure or student accounts.
- Teacher-controlled screen, readable projection, accessible controls, local non-video route and low-ink student printing. No new assessment platform or required upload.
- Student/Family view contains no teacher answer key and does not change the September opening window.

Release gates: new files on isolated branch; no force-push; inspect current main again before merging; static-content and arithmetic checks; actual desktop/mobile/projector/print checks of new materials; existing repository build/tests; Pages deployment status checked separately. Record limitations rather than asserting unperformed checks.

Implementation environment: public git clone could not resolve github.com. Connected GitHub read/write tools are working. Use connector-managed branch/commits and remote CI for repository-wide tests; local Chromium is available for new standalone materials.
