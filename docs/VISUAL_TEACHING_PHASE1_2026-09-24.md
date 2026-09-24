# Visual teaching audit and Phase 1 pilot — September 24, 2026

## What is working

- Teacher Hub remains the canonical lesson source. Teacher preparation, answers, student contracts, resources, and dated plans have separate routes.
- Projector lessons already use a one-part-at-a-time player, with Back/Next controls, a lesson picker, print routes, help drawers, and several meaningful interactive models.
- The student Shape of the Day carries named activities from the day plan. Archived plans remain distinct from the current window.
- Some lessons already begin with strong visual evidence: *One moment, three voices* uses a shared fictional image; the Math number-line and geometry labs use manipulable models.
- Family Learn Hub is organized around public learning, dates, and actions. The earlier communication pass corrected its Sep 23 emphasis, added freshness context and an Equity Hub path, and preserved classroom-specific activity names in student and teacher views.

## Main friction seen in representative views

The Mathematics teacher lesson showed a large resource chooser before the lesson question and first move. In the live projector view, *Decimal dispatch* asked about a $141 notebook invoice but began on an unrelated ribbon worksheet. This is a sequence problem: the student must reconcile two scenarios before the main provocation begins. The projected resource toolbar also competed with the task area.

The ELA image for *One moment, three voices* is useful evidence, but a visible model of **evidence → possible inference → unknown** can help students name the reasoning move before they write from a viewpoint. A short example can do this while leaving multiple defensible readings open.

Across the system, teacher preparation and optional links can accumulate as cards before the student task. More of the lesson should be shown at the moment it is needed. The existing player and `<details>` controls already support that without an architectural rewrite.

## Existing capabilities to reuse

| Capability | Better use |
| --- | --- |
| One-part projector player | Begin with a provocation; move to model, try, make, and check. |
| Native disclosure and reveal | Keep optional links, vocabulary, answers, and teacher preparation out of the first projected view. |
| Print support | Preserve a paper route for every interactive moment. |
| Existing illustration and model assets | Ask students to point to evidence or annotate a decision, instead of using images as decoration. |
| Student contracts and teacher run sheets | Keep a single question, first action, and finish criterion consistent across views. |

## Phase 1 changes in this pilot

1. **Decimal dispatch, teacher view:** lead with the same notebook invoice students investigate. Put optional resources in a labelled disclosure, retaining every link and worksheet.
2. **Decimal dispatch, projector view:** show the invoice and an estimate prompt first. Follow it with a worked notebook calculation, then the existing broader decimal workshop. The ribbon worksheet becomes later practice. Put the optional resource toolbar after the active stage in a disclosure.
3. **One moment, three voices, projector view:** keep the shared image first. Add a separate, projectable reasoning example that separates what is visible from a possible inference and an unknown. Students still need to make their own claim from the image.
4. **Reusable pattern:** `VisualTeachingMoment` accepts a big question, a semantic model, one notice prompt, and a flexible response mode. The two first examples use arithmetic comparison and evidence/inference. It is a small composition pattern, not a card library for every paragraph.

## Next representative candidates

| Page / lesson | Proposed visual teaching move | Scope |
| --- | --- | --- |
| Mathematics: *How big is this number?* | Show one scale and one comparison at a time; test labels at projector distance. | Medium |
| Mathematics: *Decimal dispatch* | Pilot here; compare with classroom use before extending. | Done in Phase 1 |
| ELA: *One moment, three voices* | Pilot evidence/inference/unknown model. | Done in Phase 1 |
| Social Studies: current election lessons | Side-by-side evidence and claim, with dated context and source limit. | Medium |
| Science: mixture investigation | Stage the real jar observation, test evidence, and revision. Existing interaction is strong; reduce duplicate introduction. | Medium |
| Student Shape of the Day | Test legibility at the back of the room and on a phone; retain named blocks. | Low |
| Family Learn Hub home | Keep a concise learning summary and clearly separated family actions; verify freshness text on a missed-update day. | Low |
| Archived Shape of the Day | Check mobile and print; do not replace or edit the archived content. | Read-only audit |

## Risk and later work

Low-risk, high-impact moves are sequence changes within one lesson, short worked examples, hiding optional teacher resources, and checking projector type size. A site-wide content schema, cross-hub shared navigation package, media hosting pipeline, persistent interactive answers, or automatic migration of every lesson into a new component system would require substantial architectural work and separate review.

The pilot does not assert classroom comprehension or physical projector readability. It needs a live browser and a classroom trial before the pattern is repeated widely. No new AI launch or SpacesEDU posting requirement was added.
