# Social Studies completion pass — 7 September 2026

## Scope and release evidence

Targeted finishing pass, not a curriculum rebuild. This report distinguishes content review, automated checks, rendered samples and deployment. It does not claim a full physical-classroom trial or the complete requested viewport matrix. The release commit containing this report and the corresponding remote commit have identical source trees when pushed without alteration; final SHA and Pages result are recorded in the delivery message.

## Inspected before editing

- Fetched Teacher Hub main at `5921c790918a9bc6169ed39bb369dca13aed41e8`, including the commits following Earth inquiry commit `d7bd8c264a417820c3c1a417e1070e885853bd33`. Reviewed the intervening print/review, K–7 limits, dependency and route changes.
- Inspected remote branches, including Earth and optional-resource branches. Neither contained work ahead of main. Compared `social-studies-final-completion-2026-09-06` (`2c9d165`) against current main. Its stale-label correction and preliminary plan informed this pass; the branch was not merged.
- Read Teacher Hub AGENTS.md and the supplied Classroom_OS_AI_Ecosystem_Source_Pack.docx in full. Inspected lesson definitions, separate student/projector renderers, Earth builder/resources, print routes, tests and Pages workflow.
- Fetched related repositories: Learn `9aa4c4e696929bacce9cb774b9f4d8b159067d42`; Equity Hub `8d599aaa0811f4bf478727f99cae9e306cbfa846`. Their standalone Earth experiences already carry the shared K–7 material. No new full-curriculum copy is needed there.
- Rechecked remote main before preparing the release; no newer commits were present. No reset, blind merge or force-push.

## What the Earth work already solved

Preserved the grade-banded Earth, Stuff & Fairness experience, simplified T-shirt chain and $20 model, global wealth display, imperfect North/South and East/West labels, dated policy/cooperation cases, local Surrey and Katzie connections, and bounded action planner. Existing film companions distinguish advocacy, claims, evidence and missing context, with purposeful pauses and no-video alternatives. Existing action cards connect individual, community, business, policy and international action. These were reused through links rather than rewritten or copied into another curriculum.

## Gaps and repairs

| Experience | Remaining gap | Targeted repair |
|---|---|---|
| City Moves | Teacher still told to assemble movement cards; final screen lacked the promised timeline | Supplied four explicitly fictional cards, city conditions, route-sketch directions and response sheet; final screen now requires a short evidence/unknown timeline as well as a system connection |
| Data Skyline | Interactive practice numbers did not supply the promised real dataset | Four Statistics Canada Internet-use tiles, 2020/2022; actual projector bars and claim choices match. Overlapping age groups, percentage-point gaps and limits are explicit. Kept the fictional equal-average opener. Connects to existing global wealth display and a brief sourced gender/care-work discussion |
| Supply-Chain Shockwave | No bounded Canadian resource-decision pair in the actual third scene | Retained product-web/shock/redesign; added Cedar LNG March 2023 joint Haisla-majority-owned partnership announcement and BC decision. Historical approval and claimed benefits are not measured outcomes. Preserved labour evidence sort as an optional collapsed extension |
| Cooperation Control Room | Teacher had to find a source pair and response examples | Reuses Cedar pair for a ten-minute source-purpose comparison; supplies two fictional practice plans, constraints and agreement prompts. Existing Earth microbeads/fund/China cards support a bounded stage comparison as replacement/follow-up, not extra work silently added to two blocks |
| Pull the System Thread | Team inquiry could expand without a starting boundary | Reuses supplied fictional borrowing-station evidence: 20 borrowed, 14 returned, six unknown. One question, 4–6 boxes, evidence/possible links distinguished, three possible consequences |
| Responses Under Pressure | Teacher-created stations and unconstrained research | Uses three existing Earth cards: Canadian microbeads, Surrey green infrastructure and loss-and-damage funding. Compare mechanisms and evidence stages across different problems, not relative effectiveness. Carry only two responses into final product |
| Make It Teachable | Production choices encouraged unnecessary scale | Shared minimum product, paper-first prototype and stop rule. Paper exhibit, model, live workshop, simple slides and audio receive equal status. Two or three different sources, three sourced ideas, small map, two responses, 5–8 minute audience task and one honest limit |
| Audience Test Lab + Expert Exchange | 3–4-block label underestimated scene totals | Five 60-minute blocks, with supplied block-by-block testing, revision, exchange, reflection and transition plan. One team artifact and individual reflection, not repeated uploads |

Unit 3 lessons now each specify two 60-minute blocks (100 minutes of activity plus 20 setup/reset). Unit 4 system/response lessons each allow three 55-minute blocks; prototype and exchange each allow five 60-minute blocks. These are planning allowances, not a claim that all classrooms complete every discussion at the same speed.

## Files and user-facing routes

- `app/social-program.ts`: teacher directions, materials, success criteria and pacing.
- `app/social-unit3-experiences.tsx`, `app/social-unit4-experiences.tsx`: actual interactive learning tasks.
- `app/social-studies-program.tsx`, `app/subject-hub.tsx`, `app/social-studies-starters.css`: task-first projector ordering, reduced duplicate headings, optional extras below core learning, readable large-text task/source cards.
- `app/social-studies-source-cards.tsx`: shared source pair and minimum product.
- `app/social-studies-starters.tsx`: eight supplied material sets, lazy-loaded to preserve bundle budget, with print and PDF links in teacher and projector modes.
- `app/earth-stuff-resources.tsx`: two optional links for response/prototype lessons into the existing Earth pack.
- `app/subject-catalog.ts`: stale Social Studies update label corrected to September 7.
- `public/printables/social-studies/`: eight standard and eight large-text student PDFs, generated from the same React material sheets. Two to four pages each; choose the relevant lesson rather than printing the whole collection.
- `scripts/build-social-starter-pdfs.mjs`, `scripts/render-social-starter-pdfs.py`: reproducible PDF generation; the Python step requires WeasyPrint and lxml. These are authoring dependencies, not new site/runtime dependencies.

Open Social Studies → Lessons → the named lesson → Supplied materials. Student-facing materials also appear in Teach / Project. Essential summaries and paper work remain available without opening external sites, AI accounts or student devices. New PDF files can be downloaded in advance.

## Curriculum and design preserved

The four-unit architecture is unchanged. Units 1–2 lesson content, Fleetwood map inquiry, Equal Earth/Mercator work, source tracing, misinformation/propaganda, government comparisons, rights and civic decision brief remain intact. No ideology is an assessed conclusion. Political, economic, media and Indigenous governance lenses remain visible; recurring power questions were moved into a disclosure, not removed.

Compared coverage with [BC Grade 6 Social Studies](https://curriculum.gov.bc.ca/curriculum/social-studies/6/core): government/rights in Unit 2; migration/urbanization in City Moves; inequality including class and gender through Data Skyline and Earth; economic interdependence/resource decisions including Indigenous rights in Supply-Chain; cooperation and conflict in Control Room; media interpretation through Units 1–3. Inquiry, evidence, perspective, cause/consequence, continuity/change, significance and ethical judgment remain the assessment focus.

No new SchoolAI integration was needed: the supplied physical discussion, source comparison and revision routines already do the work. Existing optional AI remains optional and follows student thinking. Classroom OS orchestrates; SpacesEDU remains selective evidence/reflection. No extra routine posts or dependence on Copilot, SchoolAI, paid accounts or one-to-one devices was introduced. Students inspect institutional authority without impersonating an Indigenous Nation.

## Source/link review — 7 September 2026

| Source | Verification and retained limits |
|---|---|
| [Statistics Canada Internet-use summary](https://www.statcan.gc.ca/o1/en/plus/4288-canadian-seniors-more-connected-ever) | Read successfully. 2022 overall 95% and age 75+ 72%; reported increases of 3 and 10 percentage points supply 2020 values 92% and 62%. Summary dated 14 August 2023. Historical survey figures, not 2026 estimates or a poverty indicator |
| [Cedar joint announcement](https://www.cedarlng.com/2023/03/14/cedar-lng-receives-b-c-environmental-approval-and-signs-memorandum-of-understanding-with-arc-resources-ltd/) and [BC public decision](https://news.gov.bc.ca/releases/2023ENV0018-000321) | Both read successfully. Specific Haisla leadership attribution and 16 provincial conditions checked. Joint project source has a financial interest; neither source proves later outcomes or unanimous consent. Direct Haisla website request timed out; the classroom source is explicitly the joint announcement, not mislabelled as independent Nation testimony |
| Story of Stuff films | Original, electronics, bottled water, plastic short, solutions, change and microbeads pages opened successfully. Playback/captions were not independently tested. Existing advocacy framing and no-video routes preserved |
| World Bank China and Brazil | Official historical China poverty-reduction report and Brazil Bolsa Família reporting read. Preserve historical poverty-line/date context; reach is not a causal impact estimate and progress does not settle every governance question |
| World Inequality Report 2026 | Executive summary read: existing global wealth display remains; added qualitative gender/care-work discussion. Report edition is not a single observation year. Global averages do not describe every household |
| ITU e-waste | Global E-waste Monitor 2024 source accessible; its 62 billion kg and 22.3% figures describe 2022, not current annual totals |
| Canada microbeads | Official regulation timeline accessible; implementation dates do not prove a measured environmental recovery |
| Surrey / Katzie | Surrey green-infrastructure source and Katzie referrals/territorial-responsibility material accessible. Policy goal is not an achieved outcome; Katzie-specific authority is not generalized to all Nations |
| UN tax cooperation | Official negotiation material accessible; process and agreement stages remain separate from implementation/results |
| UNCTAD borrowers platform | Direct article fetch returned 403; official indexed source corroborated the developing-country initiative. Access restriction is not evidence the link is dead; retained dated built-in summary |
| ILO platform work | Direct article fetch returned 403; official indexed Convention No. 193/adoption material corroborated June 2026 development. Adoption is not universal ratification or enforcement |
| Loss-and-damage funding | Direct node fetch failed; official indexed material and related primary material corroborated the initial $250 million implementation allocation. Allocation is not demonstrated impact |

Source refresh is optional teacher work for a current-events extension. The dated historical tasks still function if a source is blocked. No unrestricted student browsing assignment was added. This is a targeted critical-source review, not a claim that every optional outbound link in all three repositories was tested.

## Rendered and automated quality checks

- Actual supported cloud-browser review at native approximately 1363 × 936: Social Studies overview/teacher route, Unit 1 map lesson, City Moves, Data Skyline (including year selection), Supply-Chain source scene, Make It Teachable and Expert Exchange. Opened supplied materials and large-text mode; inspected screenshots, task text and controls. No overlap observed in these samples. Large text visibly enlarges lesson tasks and supplied material cards; it is not just a label toggle.
- Removed redundant Social Studies header and moved repeated power/source controls after core learning. Learning/action/finished-product panel remains ahead of the activity.
- Browser log sample contained extension metadata errors, not an observed app exception. This is a sample, not exhaustive console monitoring.
- Exact 1366 × 768 and 1920 × 1080, tablet, mobile, and true 200% browser zoom were **not verified**: the supported session exposed no viewport/emulation controls and the attempted zoom shortcut did not change viewport/DPR. Native and built-in large text are not represented as substitutes. Existing standalone Playwright review script was not run through an unsupported second browser driver.
- Rendered actual PDFs through Poppler and visually inspected representative standard Data Skyline and Supply-Chain pages plus large-text Make It Teachable. Reworked large-text page flow after a mostly empty page was found. B&W, 12pt/16pt body, thin borders, writing space, page numbers and no teacher-only answer key. Final Data Skyline adds a third page to retain readable source cards and writing space. Browser print-dialog pagination and a physical printer were not tested; downloadable PDFs provide the inspected route.
- Full `npm test`: TypeScript no-emit gate, 155 tests passing, production build and Pages artifact validation. The initial added bundle exceeded its 90KB gzip budget; lazy loading the starter component corrected this, and the final Social Studies chunk remains below budget. No dependency/lockfile changes.
- `git diff --check` clean. Repository history and changed files inspected before normal non-force release.

## Repositories and unresolved work

Teacher Hub is the only changed repository. Learn and Equity Hub keep their existing standalone K–7 Earth content; no duplicated full curriculum and no unnecessary older-grade public routes were introduced. Their source pins do not change because this pass does not modify the shared Earth generator/data.

No instructional or policy decision is deferred to Daryl. The outstanding issue is verification coverage: the exact viewport/zoom matrix, every lesson scene, physical classroom use and physical printing have not been certified. These limitations do not justify rebuilding the strong existing program or hiding the targeted fixes.
