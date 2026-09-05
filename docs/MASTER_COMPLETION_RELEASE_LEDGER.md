# Classroom OS master completion and release ledger

> **Status: PUBLISHED RELEASE RECORD — automated gates verified; human review limits remain**
> Evidence captured: **2026-09-05 UTC**
> Governing brief: **Teacher Hub Master Completion Sprint**
> Public sites: [Teacher Hub](https://dlwyatt-eng.github.io/teacher-hub/) · [Learn Hub](https://dlwyatt-eng.github.io/learn/) · [Equity Hub](https://dlwyatt-eng.github.io/equity-hub/)

This ledger records what the published repositories actually prove, which limits remain, and what still requires human or browser verification. It is deliberately stricter than a feature list. A source reference, a passing unit test, and a successful classroom or assistive-technology check are different kinds of evidence.

## Status language

| Label | Meaning |
|---|---|
| **Verified** | The stated check was run against the named commit or snapshot and passed. |
| **Implemented, unverified** | Code or content exists in a working tree but the complete release gate has not passed. |
| **Partial** | Useful coverage exists, but a requirement or evidence layer is missing. |
| **Not done** | No usable implementation or verification evidence was found. |
| **Deferred** | Deliberately outside this release; it must not be described as available. |
| **Decision required** | The code cannot settle an audience, privacy, or policy choice. |

## Executive release verdict

The forward-only release is published and its automated release evidence is green:

- Teacher's exact Astra-reviewed candidate passed the complete `npm test` gate: TypeScript, **103/103** source tests, a fresh Pages build, and artifact validation. The artifact validator counted **62 emitted files**; the initial JavaScript and CSS payloads were approximately **136.7 KB** and **83.5 KB** gzip. `git diff --check` also passed. Its exact tree was published in `e08b572cd51ef8cac2270633da43c1fca9cd93b7`.
- Learn's exact candidate passed TypeScript, production build, artifact validation, and **10/10** tests; `git diff --check` passed. Its exact tree was published in `1897b65de0992536b41f819446e8b39736e88f38`.
- Equity's exact candidate passed TypeScript, production build, artifact validation, and **19/19** tests; `git diff --check` passed. Its exact tree was published in `61cb82494a6338d41001a683911e9603aedac040`.
- The Teacher and Learn public projections match, and the Teacher/Equity inquiry data and map assets match by SHA-256. This is strong local synchronization evidence, not a cross-repository CI guarantee.
- All three updates were created from the current remote parent and applied with non-forced ref updates. GitHub Pages workflows succeeded, the remote commit trees exactly match the tested local trees, and production HTTP checks found the expected release markers and required assets. The browser preview/review path failed, so exact viewport, keyboard, screen-reader, zoom, and rendered-print checks were not completed.

This release followed the forward-only protocol: each exact tested local tree was compared with its published base tree, each new GitHub commit used the freshly fetched live head as its parent, every ref update was non-forced, and the resulting remote tree was checked against the intended local tree before the Pages workflow and live markers were verified. Green gates still must not be described as browser, assistive-technology, complete external-link, privacy, PDF, or classroom certification.

## Evidence baseline and repository state

The published bases and release commits below were checked against the live GitHub refs during this release. Future integration must fetch again immediately before any new publication.

| Repository | Local reviewed checkpoint | Published base before this release | Published state | Last complete verified gate |
|---|---|---|---|---|
| Teacher | Local reviewed checkpoint `57d5a3fb56cb2ac0caa309d91059d1d763489d7b`; published tree commit `e08b572cd51ef8cac2270633da43c1fca9cd93b7` | Published base `01e5b7e4b9ac2a7fbe7ce6d5aa8deab412cd948f` | Published by verified non-forced fast-forward | Exact-candidate `npm test`: TypeScript, 103/103, fresh Pages build, 62-file artifact validation; diff check passed |
| Learn | Local reviewed checkpoint `1683a31bdaf6b8adb5cb2028ac22b76452c09de1`; published tree commit `1897b65de0992536b41f819446e8b39736e88f38` | Published base `924bfc3dabf08ca369e309066dd2c16390bfffe7` | Published by verified non-forced fast-forward | Exact-candidate `npm test`: TypeScript, build/artifact validation and 10/10; diff check passed |
| Equity | Local reviewed checkpoint `d403eedd89b76ed5ddcfec59e117c59a0a32cd3f`; published tree commit `61cb82494a6338d41001a683911e9603aedac040` | Published base `005c782bd007845339f36513c652c3eeb39ba0a9` | Published by verified non-forced fast-forward | Exact-candidate `npm test`: TypeScript, build/artifact validation and 19/19; diff check passed |

The safe floor is now the published release commit in each repository: Teacher `e08b572cd51ef8cac2270633da43c1fca9cd93b7`, Learn `1897b65de0992536b41f819446e8b39736e88f38`, and Equity `61cb82494a6338d41001a683911e9603aedac040`. Any later work must begin from those commits or their descendants. The floor must move forward by commit; it must never be recreated with a reset, force-push, or replacement checkout.

## Mathematics coverage matrix

The intended Mathematics sequence is:

1. a teacher-selected explanation route: direct Hub modelling, optional Math Antics support, or a hybrid;
2. a Classroom OS model, investigation, game, discussion, or design task;
3. paper/manipulative and shared-device routes;
4. visible finish evidence and task-specific proficiency examples; and
5. MathUP only as a curriculum cross-check or optional practice shelf.

Math Antics was never intended to be the complete program. The published Teacher release contains **15 core Math experiences**, **15 paper-first experience kits with separate teacher keys**, task-specific four-level models for all 15, and **16 support packs**: 11 prior packs plus five B.C.-core depth packs for magnitude/place value, factors and multiples, increasing/decreasing relations, one-step equations, and first-quadrant transformations. All 15 experiences provide Math Antics-supported, hybrid, and teacher-led-replacement modes. The Astra follow-up found that four new packs were teacher-visible but skipped by the student/projector sequence; the repaired release now places every plan's core pack in the student-safe **Learn** stage before its investigation. Student workshops include prompt-only independent checks and a separate print action without teacher answers. Transformation's first-quadrant core remains before its optional across-zero bridge; its plotted points and panel grids now align. The 103-test suite and independent server-render checks cover the repaired routes, answer boundary, three explanation modes, pack anchors, increasing/decreasing representations, and targeted-print overflow resets. Browser, physical print, projector-distance, and classroom use remain unverified.

| B.C. Grade 6 content | Primary Classroom OS route | Current evidence | Status / remaining release note |
|---|---|---|---|
| Whole numbers to billions; decimals to thousandths | `magnitude-gallery` | Interactive scale lab opens with 0.008; paper kit, proficiency model, and student-reachable `magnitude-place-value-pack` | **Published and build-verified; browser/classroom unverified.** |
| Multiplication and division strategies | `strategy-league`; `operations-fluency-pack` | Multiple methods, no speed ranking, paper route | **Strong.** Empty Look suppression is source/build verified; browser-unverified. |
| Order of operations | `scoreboard-rules` | Concrete tiles, brackets, shared convention, peer decoding | **Strong.** |
| Factors, multiples, common factors and common multiples | `pack-and-sync` | Counter packing, repeating signals, kit, contract, models, and `factors-multiples-pack` | **Published; empty-Look repair is source/build verified, browser-unverified.** |
| Improper fractions, mixed numbers, ratios | `fraction-ratio-remix`; fraction/ratio support pack | Concrete strips/tiles, ratio batches, paper and proficiency routes | **Strong.** |
| Percents, discount and consumer decisions | `sale-lab`; fraction/ratio/percent packs | Hundred grids, fictional offers, budget constraint and revision | **Strong.** Empty Look suppression is source/build verified; browser-unverified. |
| Decimal multiplication and division | `decimal-dispatch`; decimal operations pack | Estimate-before-calculating invoice audit and exact repair | **Strong.** |
| Increasing and decreasing patterns | `pattern-forecast` | Interactive increasing-pattern lab; decreasing cases in paper kit/models; `pattern-relations-pack` connects model, table, graph, words and expressions in both directions | **Published.** Pack and infographic reachability are source/build verified; browser-unverified. |
| One-step equations | `equation-balance` | Concrete balance, inverse operations, substitution check, interactive lab, and `one-step-equations-pack` | **Published.** Pack and infographic reachability are source/build verified; browser-unverified. |
| Perimeter, polygons and area of rectangles, triangles, parallelograms and trapezoids | `zoo-design-studio`; `space-under-constraints`; geometry packs | Cut/move, grids, formulas attached to models, design audit | **Strong.** Space empty-Look suppression is source/build verified; browser-unverified. |
| Angles and triangles | `geometry-field-lab`; angle/triangle pack | Reference angles, protractor alignment, classification and construction | **Strong.** |
| Volume and capacity | `space-under-constraints`; volume/capacity pack | Nets/cubes, floor-plan constraints, physical model and revision | **Covered.** Empty Look suppression is source/build verified; browser-unverified. |
| Single transformations on the first-quadrant Cartesian plane; combinations as added depth | `transformation-cipher` | Core pack explicitly teaches translation, reflection, rotation, sequencing and coordinate checks before the optional four-quadrant bridge | **Published.** The core mission, student-safe first-quadrant workshop, separate extension, and aligned SVG grid are source/build verified; confirm them visually before classroom use. |
| Line graphs, scale and claims | `graph-story-lab`; data pack | Human graph, misleading-scale comparison, graph plus supported claim/limit | **Strong.** |
| Theoretical and experimental probability | `probability-game-audit`; probability pack | Physical trials, class totals, redesign and comparison | **Strong.** |
| Financial literacy and budgeting | `sale-lab`; `space-under-constraints` | Fictional prices, constraints, totals, trade-offs and redesign | **Strong.** |
| Place-connected and First Peoples-informed Mathematics | Data lesson panels and cross-curricular source routes | Local restoration and OCAP®-related source panels | **Partial / pilot.** Any new synthesis of Nation knowledge still requires exact attribution and appropriate local review. |

### Mathematics media and hook limits

The three delivery plans for every experience now cover instructional purpose/focus, a before-viewing move, a bridge into Hub modelling and investigation, and an explicit no-video teacher-led replacement. The separate Math Antics route records supply a title, URL, pause prompt, and sometimes a secondary video. Exact clip duration, timestamps, or start/stop points are still absent, and the URLs, availability, advertising context, and classroom appropriateness were not live checked. The clips therefore remain optional supports, not a dependency or proof of a verified lesson opening.

## Calendar Provocations inventory

The shared inquiry data authors seven provocations with a learning goal, hook, notice/wonder prompts, inquiry questions, discussion, a product/response, differentiation, fallback, anti-tokenism guidance, and a named source. Teacher and Equity now also share a complete, explicitly selected fictional listening rehearsal for the reconciliation lesson's offline skills practice. It has two clearly fictional source cards, a Classroom OS attribution, a boundary that rejects analogy or substitution, prompt/finish frames, print support, and a separate return to the authentic NCTR or Nation-authored route. The rehearsal never inherits NCTR credit, and Teacher student mode omits its facilitation note. Teacher's 103-test gate and Equity's 19-test gate render and verify these boundaries; their canonical inquiry files are byte-identical at SHA-256 `4ec013e1f364ea1bdf9907ec604918c9d5dc699c5440ef0400c432003f18c505`. These checks establish structure and build integrity—not source currency, HTTP availability, licensing, cultural care, or classroom readability. Several other hooks still require teacher-prepared materials that are not bundled. Both updated route bundles are deployed and served; rendered browser and classroom use remain unverified.

| Provocation | Time | Primary lens | Starting source | Current status |
|---|---:|---|---|---|
| Terry Fox: Access, Action & the Stories We Tell | 35–50 min | Disability justice, health-care access, ethical fundraising | Terry Fox Foundation | **Published; structure/build verified; source/link/browser/classroom review incomplete** |
| Harvest: Who Helps Food Reach Us? | 40–60 min | Food sovereignty, labour, waste, reciprocity | Working Group on Indigenous Food Sovereignty | **Published; structure/build verified; source/link/browser/classroom review incomplete** |
| Remembrance: Who and What Do We Remember? | 35–55 min | Civilians, peace-building, propaganda, excluded service, public memory | Canadian War Museum | **Published; structure/build verified; source/link/browser/classroom review incomplete** |
| Truth & Reconciliation: How Do We Know? What Do We Owe? | 30–50 min | Testimony, records, language revitalization, children's rights, responsibility | National Centre for Truth and Reconciliation | **Published; structure/build verified; source/link/browser/classroom review incomplete** |
| Black Futures in B.C.: Beyond a Single Story | 35–55 min | Contemporary community, joy, creativity, representation, local histories | B.C. Black History Awareness Society | **Published; structure/build verified; source/link/browser/classroom review incomplete** |
| Earth Day: Which Change Can We Actually Track? | 35–60 min | Corporate responsibility, greenwashing, Surrey adaptation, biodiversity | City of Surrey Climate Action Tracker | **Published; structure/build verified; source/link/browser/classroom review incomplete** |
| Pink Shirt Day: What Can Bystanders Change? | 30–45 min | Group dynamics, online amplification, institutional responsibility, repair | B.C. erase | **Published; structure/build verified; source/link/browser/classroom review incomplete** |

Release checks still needed for every provocation:

- preview the exact linked source and confirm current wording, suitability, date, and licensing;
- verify the local/no-Wi-Fi route without opening the link;
- confirm the projected screens fit at 1366×768 and 1920×1080;
- keyboard-test the chooser and step controls;
- render and inspect the print view; and
- complete a cultural-care review where a Nation, community, testimony, or identity is involved.

`TOC & Emergency Plans` provides a generic preparation checklist and access to the existing TTOC builder. It does **not** bundle or replace the school's official emergency procedures. The separate *Mystery of the Missing Time Capsule* destination remains reserved and unavailable.

## Cross-site content and release synchronization

| Relationship | Evidence at audit snapshot | Guardrail gap |
|---|---|---|
| Teacher canonical public window → Learn public window | The published Teacher and Learn trees contain byte-identical projections: SHA-256 `899586433a403188f1e5914445c5139b19379223e7a263ab8b1cda12cdeaa69b`. Both include the corrected visual descriptions. | No CI job compares the two repositories after a change. |
| Discovery booklet → Learn | Teacher and Learn copies were byte-identical: SHA-256 `8e1255be485efa68c7cb8493e543a30939932f91f73d36a9c039dc526c78dfa2`. | The PDF is untagged and raster-only; equality does not make it accessible. |
| Current public opening image | The mirrored `identity-constellation.webp` copies were byte-identical: SHA-256 `fbd814a9cb8f673d1ed03edf0ed99cc1cef4c4a4fac1ffc1d0be0296f18ba78c`. | Teacher holds additional first-week images that Learn does not mirror; this is acceptable only when the public manifest does not require them. |
| Shared inquiry pack → Equity | The published Teacher and Equity trees match: SHA-256 `4ec013e1f364ea1bdf9907ec604918c9d5dc699c5440ef0400c432003f18c505`. The shared record includes the isolated fictional listening rehearsal. | No automated cross-repository version/checksum assertion exists. |
| Mercator and Equal Earth local maps | Published Teacher and Equity SVGs match: Equal Earth `c54388dedcc98edef7047b5df0a044df92b58458533b23b8d739cfacc7145aab`; Mercator `92c11ce13388893e1024b2845caa42e7ed00ef784cb2ace0bbdc83cfb194b076`. | Both live paths returned HTTP 200 with the expected byte sizes; rendered browser review remains. |
| Equity standalone promise | Published commit `61cb82494a6338d41001a683911e9603aedac040` integrates the map inquiry, all seven provocations, K–12 adaptations, preparation, projector flows, print support, offline routes, sources, anti-tokenism guidance, and the isolated fictional rehearsal without a companion-hub dependency. | Full local and GitHub gates passed; standalone browser, assistive-technology, and PDF reviews remain. |

The public-window projection is explicit but shallow: `shared`, `student`, and `family` are copied as complete nested objects, and six existing public manifest sections are copied wholesale. Learn's hardened test now recursively rejects four exact private keys (`teacher`, `source`, `deliveryRoutes`, and `toolActivityIds`) throughout the manifest. It does not detect arbitrary teacher-only prose or answer-key variants, and there is still no cross-repository checksum/version gate. Expand the forbidden-content contract and add a cross-repository assertion before treating synchronization as self-enforcing.

### Deployment workflow evidence and remaining gap

Teacher, Learn, and Equity GitHub Pages workflows run `npm test`; all three exact release candidates and all three corresponding GitHub workflows passed. Remote commit trees were compared with the tested local tree SHAs, and production HTTP smoke checks verified the new bundle fingerprints plus Math workshop, Calendar rehearsal, Visual Review summary, Learn mosaic, and Equity rehearsal markers.

No site currently embeds a release Git SHA in the artifact or performs this post-deploy tree-and-marker comparison automatically. The release is reconciled manually, but future synchronization is not yet self-enforcing.

## Readability and teacher-usability review

### What automated evidence supports

| Area | Evidence | Honest limit |
|---|---|---|
| Student task structure | The committed Teacher suite verified reviewed, valid contracts for 15 Math, 14 ELA, 6 Career, and 6 PHE experiences. Contracts have at least four actions and three finish-evidence items. | Structural completeness is not a Grade 6 comprehension study. |
| Math opening | Tests verify that Magnitude Gallery teaches before the interactive lab and begins with 0.008 on the widest decimal line. | Exact rendered size and across-room comprehension were not tested. |
| Arts | Six sequenced Arts studios have kit, media-route, contract, folio, model, and scheduling guardrails. | No student or teacher usability session was recorded in this audit. |
| Science | Nineteen lessons have readiness/offline tests and artifact/source guardrails. | Several underlying source records retain `needs-audit` labels even though the public status test says the classroom-readiness audit is complete; the status language should be reconciled. |
| Social Studies | Durable lesson/scene routing and substantial power, evidence, and perspective work exist; the published release adds map representation and denialism/evidence-care content. | No complete human Grade 6 readability pass or current-source review was recorded. |
| Projector clarity | Source tests check learning/first-step/finish strips, CSS flow, breakpoints, and no obvious viewport-width overflow patterns. | Source-pattern tests do not detect actual clipping, focus loss, zoom failure, or illegibility at classroom distance. |
| TTOC operations | The committed day-plan builder preserves timing and critical notes and strips sensitive `essentials` fields before device storage. | No substitute-teacher walkthrough has been recorded; other planner text remains device-local and must not contain protected information. |

### Readability and usability work still required

- A Grade 6 reader has not completed a recorded think-aloud on representative Math, ADST, Social Studies, Arts, PHE, Career, Learn, and Equity pages.
- A teacher unfamiliar with the build has not completed a recorded “prepare, project, print, teach, hand off” walkthrough.
- The source still contains broad public labels such as `FIRST-PASS` for Social Studies and generic program views, plus some `needs-audit` Science records. These may be technically stale and weaken trust even when the lessons are stronger.
- Current Teacher code removes the generic placeholder and normalizes unknown `?view=` values to Home. This passed source/build checks but remains browser-unverified.
- The Visual Review Studio saves decisions in browser `localStorage`. That state is not version-controlled and cannot serve as the durable record of what was approved.

## Visual and media coverage

A static reference audit and the new visual-integrity tests found source-level production consumers for all **21 image/SVG candidates** listed in `visual-review-catalog.ts` across the Teacher and Learn codebases. This answers only “is the asset consumed in production code?” It does not prove that its intended placement rendered or worked at every breakpoint. Only **seven** candidates have recoverable repository-backed approval evidence; the rest cannot inherit approval from browser-local Studio state.

The named forward-progress test explicitly locks seven selected asset references (three Technology/AI images, three ELA unit worlds, and the mixtures image) plus the AI team roles. The integrity test verifies the 21-item inventory and selected semantic corrections; it is not a complete approval-and-placement manifest. Other candidates are protected only by source consumers or subject tests. The Technology Decision Compass (`D02`) is dormant in the current public opening, and AI Team Roles (`D03`) is only partially deployed. Of the four authentic-source requirements, live local weather/environment data remains partial. Add a version-controlled approval/placement manifest before treating all Studio choices as durable.

The published Visual Review Studio now reports its inventory from the real catalog, applies “show only undecided” to both images and code concepts, enlarges previously tiny diagram labels in large-text mode, and prints a filter-independent monochrome record of all 29 image/concept decisions with textual labels, notes, and reuse permissions. This prevents a printed review from reducing decisions to colour or silently dropping the teacher's notes. Browser print pagination remains unverified.

The activity-claiming `PU02` and `N01` descriptions were corrected in the published Teacher projection and Learn commit `1897b65de0992536b41f819446e8b39736e88f38`. `N01` is now explicitly described as fictional Newsroom orientation artwork—not Surrey evidence or a results source—and the Teacher projector uses an authentic source card. Its wider reuse still needs explicit approval or a documented catalog-rule change. The corrections passed source/build tests but remain browser-unverified.

The eight code-built Studio concepts are also not a complete cross-site implementation matrix. Learn has a faithful source stage, student action path, family quick-answer pattern, and a card-based year path; its Technology Decision Compass remains tied to a legacy window and is not reachable in the current Discovery opening. Equity has adapted action/projector and year-runway equivalents, but not every named concept. Treat these as design directions, not eight universally deployed components.

At the snapshot, a regex inventory found approximately **207** unique HTTPS strings in Teacher sources/assets, **50** in Learn, and **65** in Equity. This is an inventory, not a link check. No complete live external-link, redirect, embed-permission, licensing, or blocked-school-network check was performed. Every critical external media hook needs a visible source, date where relevant, and a prepared local/text fallback.

## Accessibility, print, projector, and browser limits

| Area | Teacher | Learn | Equity | Release conclusion |
|---|---|---|---|---|
| Keyboard/focus | Source tests cover many focus-visible and control contracts. | Published code adds a functional skip handler, route focus transfer, title updates, and a live announcement; the 10-test release suite passes. | Published skip link, focus target and route announcement guardrails pass the 19-test release suite. | **Partial.** Perform a full keyboard-only route and modal/overlay walkthrough on the exact release builds. |
| Large text | Persistent screen mode materially increases reading text. | Committed persistent screen mode; source test and build pass. | Persistent large-text layouts exist. | **Implemented, not fully verified.** Test 200% zoom, reflow, and every representative view. |
| Large print | Print CSS explicitly resets Teacher large-text typography. | Committed print CSS also resets large-text typography. | Source tests assert that print removes interactive chrome and normalizes large-text styling. | **Not done as a distinct large-print output.** Standard and large-print modes are not both proven by rendered review. |
| Reduced motion | Teacher tests and CSS contain reduced-motion guardrails. | Global reduced-motion CSS exists. | Reduced-motion CSS exists. | **Source-level coverage only.** OS-setting browser checks remain. |
| Projector mode | Strong source/build contracts; Math repairs address blank Look tabs, the missing core transformation mission, and previously unreachable infographics. | No equivalent full-class lesson player is the main purpose of this site. | Large projector typography exists. Published commit `61cb82494a6338d41001a683911e9603aedac040` separates enter/exit handling so CSS projection can exit even when Fullscreen API access fails. | **Partial.** Source/build guards pass, but exact 1366×768 and 1920×1080 inspection did not occur because browser preview/review failed. |
| Print rendering | Multiple subject print styles and printable builders exist. The release adds a student-only Math workshop print route, source guards against teacher answers, targeted overflow resets, and a complete monochrome Visual Review summary. | Published print stylesheet exists. | B&W and colour PDFs plus page print rules exist. | **Source/build verified; rendered output unverified.** No browser-rendered print/PDF inspection, page-break audit, toner test, or physical answer-key separation audit was recorded for the current build. |
| Automated accessibility | Static assertions check selected markup/CSS patterns. | No axe/browser suite. | Four source-level accessibility tests at committed checkpoint; no axe/browser suite. | **Not sufficient for conformance.** No screen-reader, axe, contrast-computation, or browser accessibility-tree evidence was recorded. |
| Browser/device matrix | No declared or automated ChromeOS/Chrome, Edge, Firefox, or Safari matrix. | Same. | Same. | **Not done.** Test at least current school-managed Chrome plus one WebKit and one Gecko browser if they are supported. |
| Offline resilience | Core lessons usually author paper/no-device alternatives. | Static public resources can be downloaded while online. | Lessons include print/offline routes. | **Pedagogical fallback exists; website offline availability does not.** No service worker or cold-offline load test was found. |

### PDF accessibility audit

The following inventory was measured with `pdfinfo` and `pdftotext` against the repository files. `Tagged: no` is metadata evidence, not a complete PDF/UA assessment:

| Repository | PDF count | Tagged PDFs | Important finding |
|---|---:|---:|---|
| Teacher | 4 | 0 | The five-page Discovery Booklet has zero extractable text. |
| Learn | 2 | 0 | Its Discovery Booklet is the same raster-only file. |
| Equity | 29 | 0 | The six-page `belonging-learner-voice-toolkit.pdf` has zero extractable text. |

No distinct large-print PDF variants were found. Equity's black-and-white editions are toner alternatives, not large-print or tagged-accessible editions. A complete PDF-to-equivalent mapping has not established whether every required download has genuinely equivalent accessible HTML or an editable route. Until that is proved or the PDFs are remediated, each required printable needs an identified equivalent accessible HTML, editable document, or properly tagged alternative. PDF tagging, reading order, form fields, table semantics, alt text, language metadata, and screen-reader output require document-level inspection; they cannot be inferred from the web page around the download.

## Teacher Hub public-access boundary

This is the most important unresolved release decision.

- GitHub Pages is a static public host unless repository/organization Pages access controls have been explicitly enabled and verified.
- `"private": true` in `package.json` prevents accidental npm publication; it does not make a website private.
- `app/chatgpt-auth.ts` is not imported by the GitHub Pages entry, so it provides no Pages authentication.
- The built static JavaScript includes teacher guidance, teacher-only answer keys, and planning routes. Hiding a control in the interface does not prevent a visitor from downloading or inspecting the bundle.
- The published release includes HTML `noindex` metadata and `public/robots.txt`. These are crawler requests only; they do not authenticate users, restrict direct access, or protect bundled answer keys.
- Teacher planners, Morning Screen drafts, Visual Review decisions, and other state use browser storage. The application adds no authentication or encryption layer to `localStorage`; confidentiality depends on the browser/device profile, so shared-device residue remains a risk. The TTOC builder strips its sensitive `essentials` fields before storage, but teachers must still avoid names, medical/support details, family contacts, passwords, door codes, or confidential records anywhere in the static app.

A targeted source scan did not find an obvious credential or substantive student PII in the committed public manifests. That was not a formal secret-scanner or privacy impact assessment.

**Release decision:**

- If answer-key and teacher-planning confidentiality is required, do not publish Teacher Hub to unrestricted GitHub Pages. Use authenticated hosting or create a separately projected public artifact that omits all teacher-only content.
- If the owner knowingly accepts a public teacher-facing resource, describe it as **teacher-facing**, not private; keep PII out; accept that answer keys are discoverable; and verify the actual Pages visibility setting after deployment.

## Forward-only release protocol

This protocol exists to prevent the exact failure mode the project owner identified: publishing an older state over newer work.

1. **Freeze integration.** Wait until all agents/editors have stopped. Record every dirty and untracked path in all three repositories.
2. **Capture the floor.** Record `HEAD`, stored `origin/main`, `git status --short`, and `git diff --stat`. Save accepted working changes before any branch manipulation.
3. **Fetch the real remote.** Run `git fetch --prune origin` in each repository. Treat a fetch failure as a stop condition, not permission to assume the local tracking ref is current.
4. **Prove ancestry.** Before a push, `git merge-base --is-ancestor origin/main HEAD` must succeed. If it does not, stop and integrate the remote commit deliberately. Never use `reset --hard`, force-push, or checkout-overwrite to make the graph look clean.
5. **Review every delta.** Compare both the committed range and working tree. Confirm there is no removed lesson, asset, route, public-window field, accessibility feature, or newer content unless removal is explicit and reviewed.
6. **Stage explicit paths.** Do not use a blind `git add -A` in a shared worktree. Stage the reviewed files by name, inspect `git diff --cached`, and keep unrelated changes out.
7. **Run the exact release gates.** On clean candidate commits, run `npm ci` when lockfile reproducibility matters, `git diff --check`, and `npm test` in Teacher, Learn, and Equity. The Pages workflows must call the same complete gate.
8. **Run human/browser checks.** Test representative desktop, tablet, mobile, projector, large-text, standard print, and large-print routes; keyboard navigation; screen-reader announcements; reduced motion; critical external links; downloads; and offline fallbacks.
9. **Commit descriptively.** Make repository-specific commits that name the content and safety work. Record the three candidate SHAs in the final release entry below.
10. **Re-fetch before push.** Push normally. If Git rejects a non-fast-forward update, stop and reconcile; never force.
11. **Verify deployment.** Require successful Pages workflows, then open each live site in a fresh/private browser session. Verify home, representative deep routes, downloads, asset base paths, and a version marker or known release fingerprint.
12. **Record the evidence.** Add workflow URLs, live verification time, exact SHAs, tests, human checks, known limitations, and decisions to this ledger. A rollback must be a reviewed `git revert`, not history destruction.

Suggested read-only ancestry evidence before release:

```bash
git fetch --prune origin
git status --short --branch
git log --oneline --decorate --graph --left-right origin/main...HEAD
git merge-base --is-ancestor origin/main HEAD
git diff --check
```

## Definition of done

The sprint is complete only when every required row is **Verified**, or a named owner has explicitly accepted a documented limitation that does not misrepresent privacy, safety, curriculum, or accessibility.

| Requirement | Current status | Evidence needed to close |
|---|---|---|
| Newest work protected; no regression to older state | **Verified for this release** | Each exact tested tree was built from the freshly checked published parent, committed by a non-forced ref update, compared back to the intended local tree, and followed by a successful Pages workflow. |
| All requested work integrated and reachable | **Source/build/live-marker verified; browser partial** | Tests, production builds, and live bundle markers cover Calendar, TOC, Equal Earth, evidence-care, Learn improvements, Equity panels, and the repaired Math routes. A complete live-browser navigation review remains. |
| All release tests pass on exact candidates | **Verified** | Teacher passed TypeScript, 103/103, a fresh Pages build, and 62-file artifact validation; Learn passed TypeScript, build/artifact validation, and 10/10; Equity passed TypeScript, build/artifact validation, and 19/19. All three diff checks passed. |
| GitHub Pages enforces full gates | **Verified for this release** | All three workflows called `npm test` and succeeded on the exact published release commits. |
| Math is a complete teacher-led pathway, not a link shelf | **Published/build verified; classroom unverified** | All 15 experiences have three modes; five new core depth packs close the identified pack gaps and are now student/projector-reachable before application tasks. Add exact clip timing metadata, live-check optional Math Antics links, and perform classroom/projector and printed-page walkthroughs. |
| B.C. Math coverage documented | **Verified as an audit matrix** | Keep this matrix current when lessons change; local/First Peoples panels still require appropriate review. |
| Calendar Provocations are runnable in Teacher and Equity | **Published/build verified; classroom unverified** | Both sites bundle the isolated, printable fictional listening rehearsal; complete source/date/licence/cultural-care review, prepared-material audit, projector/print/mobile/browser checks, and authentic-source classroom review. |
| Equal Earth/map representation inquiry is responsible and runnable | **Published/build verified; browser unverified** | Complete source/date/licence review, local fallback browser check, accessibility review, and rendered live verification. |
| Denialism/evidence-care is taught without false balance | **Structure/build verified locally; human review pending** | Complete the student-language/cultural-care review and confirm it never turns documented harms, identities, or rights into debate topics. |
| Equity Hub stands alone for K–12 users | **Published/build verified; browser unverified** | Commit `61cb82494a6338d41001a683911e9603aedac040` passes 19/19 and artifact validation; complete a fresh standalone browser review without any Teacher/Learn dependency. |
| Approved visual direction is durable | **Partial** | All 21 candidates have consumers, but only seven have repository-backed approval evidence; add a version-controlled approval/placement manifest and do not rely on Studio `localStorage`. |
| Student and family public content is safe and synchronized | **Partial** | Teacher/Learn projections match and Learn recursively rejects four private keys; add answer-key/teacher-prose coverage, cross-repo checksum/version CI, and live comparison. |
| Grade 6 readability is independently reviewed | **Not done** | Recorded student-facing readability review and revision log across representative subjects. |
| Teacher usability is independently reviewed | **Not done** | Recorded unfamiliar-teacher and TTOC walkthroughs from prepare through handoff. |
| Keyboard, focus, screen reader, contrast, reflow and reduced motion pass | **Partial** | Browser/assistive-technology evidence, not only source-pattern tests. |
| Standard print and large print both pass | **Not done** | Distinct large-print output and rendered page-by-page checks. |
| PDFs have accessible equivalents | **Not verified / incomplete inventory** | All repository PDFs report `Tagged: no`; complete a PDF-to-equivalent map and provide tagged/remediated PDFs or clearly linked equivalent accessible formats for every required download. |
| Teacher-only/private boundary is truthful | **Decision required** | Verify restricted hosting or explicitly accept public teacher-facing distribution and discoverable answer keys. |
| External media and links work with fallbacks | **Not done as a complete check** | Automated link inventory/check plus school-network and fallback review for critical routes. |
| Exact projector and responsive views pass | **Not done as a complete check** | Screenshot/overflow/focus review at 1366×768, 1920×1080, tablet, and mobile widths. |
| All three deployments match intended commits | **Verified for current trees; browser partial** | Remote trees match the exact tested candidates, all workflows succeeded, and production HTTP checks found the expected hashed bundles and release markers. The sites do not yet expose an embedded commit SHA, and fresh-session visual/browser review remains. |
| Mystery of the Missing Time Capsule | **Deferred** | Keep its reserved TOC library destination clearly labelled unavailable until student booklet, teacher directions, and protected key are all finished. Do not confuse it with the five-page Discovery Booklet. |

## Published release entry — 2026-09-05 UTC

| Field | Teacher | Learn | Equity |
|---|---|---|---|
| Reviewed local commit | `57d5a3fb56cb2ac0caa309d91059d1d763489d7b` | `1683a31bdaf6b8adb5cb2028ac22b76452c09de1` | `d403eedd89b76ed5ddcfec59e117c59a0a32cd3f` |
| Published content commit | `e08b572cd51ef8cac2270633da43c1fca9cd93b7` | `1897b65de0992536b41f819446e8b39736e88f38` | `61cb82494a6338d41001a683911e9603aedac040` |
| Exact published tree | `18c9d8c0f2b2ee01ba48ff9d22e22b154d42cf3a` | `5abee6e4f88c80f942fd517cd4c9a1465db20967` | `5f6096797e918602bd7e09897ec204b989e6a575` |
| `npm test` result | **PASS** · TypeScript, 103/103, Pages build, 62-file artifact validation | **PASS** · TypeScript, build/artifact validation, 10/10 | **PASS** · TypeScript, build/artifact validation, 19/19 |
| `git diff --check` | **PASS** | **PASS** | **PASS** |
| Pages workflow URL/result | [Run 33935485565](https://github.com/dlwyatt-eng/teacher-hub/actions/runs/33935485565) · **SUCCESS** | [Run 33935485857](https://github.com/dlwyatt-eng/learn/actions/runs/33935485857) · **SUCCESS** | [Run 33935486645](https://github.com/dlwyatt-eng/equity-hub/actions/runs/33935486645) · **SUCCESS** |
| Live verification time | 2026-09-05 01:19 UTC | 2026-09-05 01:19 UTC | 2026-09-05 01:19 UTC |
| Live release fingerprint | `index-CUTs3BFP.js`; Math, Calendar, and Visual Review markers found | `index-DXYVIxFs.js`; corrected mosaic description found | `index-CSExpCPQ.js`; listening-rehearsal markers found |

Human evidence still to record:

- Grade 6 readability reviewer and representative routes:
- Teacher usability/TTOC reviewer and task script:
- Keyboard and screen-reader/browser combinations:
- Projector resolutions and lessons checked:
- Standard/large-print files and pages checked:
- Critical external links and fallback routes checked:
- Public/private hosting decision and approver:
- Accepted deferrals or limitations, owner, and follow-up date:

Do not change this document's status to “complete” merely because code was committed or a Pages workflow turned green. Completion means the exact live release satisfies the evidence and audience boundaries above.
