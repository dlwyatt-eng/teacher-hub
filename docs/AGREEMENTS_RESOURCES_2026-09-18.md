# Agreements resources — September 18, 2026

Enhanced the existing Five Agreements activity reached from the 1:00 pm block
in the dated Day 3 plan. Preserved its schedule, partner practice, examples,
optional NVC continuation, earlier plans and physical-card workflow.

Added an introductory card, five short agreement headings, five expandable
classroom discussion questions, and annotated author resources accessible from
both teacher and projector views. Resource pages were read on September 18.
The introduction video URL comes from the author’s Four Agreements page;
full video audio, imagery and ads were not reviewed. The optional video is
explicitly labelled for teacher preview. Core teaching requires no video.

The author pages are philosophical background. Our classroom examples concern
communication, checking claims, manageable effort and responding to harm.
Students may question the ideas, use fictional examples, draw or pass.
Teacher guidance preserves support for bullying concerns and avoids equating
best effort with perfection. No private student details or card-deck scans added.

This refines resources for an already published planned activity; the family
learning summary already includes community agreements. No schedule or public
learning-window change was needed.

Validation: 185 repository tests passed, including typecheck, production build,
public-window checks and Pages artifact checks. Fixed an existing navigation
test fixture whose use of the current date collided with the dated Day 3 plan;
production navigation logic is unchanged. Source review covered both renderer
branches and all new text. Browser visual review could not be completed because
the cloud browser connection timed out and its retry was superseded by recovery.
No claim of classroom-use validation is made.

## Visual-resource follow-up

Added Butterfly Dreamz's illustrated Four Agreements poster as the first visual
option, with direct full-size and source links and a link to its free TPT workshop
(sign-in required). Inspected the poster image itself; it has four headings and
short explanations. The image remains hosted by its publisher; no copy of the
third-party artwork is committed. A note clarifies that hurt feelings are valid
and students can seek help. The existing fifth-agreement card follows the poster.
The TPT download itself was not inspected. An alternative five-agreement sketch
was omitted because its image could not be fetched reliably.

Follow-up validation: typecheck and production build passed. Server-rendered
teacher and projector markup includes the poster and links; teacher facilitation
notes remain excluded from projector mode. This is not visual browser validation.
The update remains on the draft review branch pending publication approval.

## Visibility repair

The primary visual was inside a closed details element and depended on an
external CDN. Added an original, site-hosted SVG infographic with all five
headings, short classroom explanations and simple icons. It displays immediately
in both teacher and projector views; the external poster remains an optional
alternative. A direct full-size link works without opening the activity.
Updated teaching notes to match the visible infographic.

Validation: all 185 tests, typecheck, production build and Pages artifact checks
passed. Server rendering confirms the local image appears outside every details
element in both modes. Rendered the SVG to PNG and visually checked the complete
image: headings, explanations, icons and credits fit without clipping. Live
browser interaction remains unavailable because the browser connection timed out.
This minor visibility repair does not change the schedule or family summary.
