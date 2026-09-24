# Visual teaching rollout — September 24, 2026

This follows the Decimal dispatch and One moment, three voices pilot. It changes shared lesson presentation where the same problem recurs, while retaining the existing lesson data, teacher plans, student activities, print routes, archives, and resource links.

## Representative inspection

| Surface | Finding | Decision |
| --- | --- | --- |
| Math teacher lessons | The full materials chooser precedes the lesson plan on most lessons. | Keep the student-screen launch visible; put optional worksheets, video, games, and practice in a labelled disclosure for every Math lesson. |
| Math projector, *How big is this number?* | The first screen is a 0.62 versus 0.605 worksheet discussion; the stated number-scale mission and manipulable number line come later. A large resource toolbar sits above the active stage. | Lead with the existing worked scale and interactive lab. Keep the worksheet as a separate later part and the optional toolbar below the stage. The worksheet, including its answer reveal and printable, remains available. |
| Math projector, *Decimal dispatch* | The pilot already begins with the invoice and model. | Preserve that order and use the same worksheet/resource placement as other Math lessons. |
| Social Studies projector, *Three maps of Fleetwood* | The map source begins below a three-card goal/action/finish panel, explanatory paragraph, help control, and companion. | Keep the part navigation and current action visible; move goal, finish check, explanation, and companion after the source activity. The source appears earlier. Apply the same order to Social Studies scenes. |
| Science projector | Mission navigation and investigations already reveal one task at a time, including observation and model work. | Preserve rather than layer on a generic card pattern. |
| Student Shape of the Day and archives | Named blocks and separate dated plans are present. | No day-plan or archive rewrite in this pass. |
| Learn Hub home | Family learning, actions, calendar groups, election context, cross-hub footer, and date-dependent update warning already exist. | No duplicate summary or new promotional component. Content sync is unnecessary because lesson presentation did not change the day plan. |
| Equity Hub home | The election comparison, dated source links, post-vote activity, grade-range selector, and printable routes already offer a clear path. | Preserve. Revisit the election hero after October 24 with the confirmed outcome and a source check. |

## Reusable system and limits

`VisualTeachingMoment` remains a compact composition for a big question, explanatory model, notice prompt, and response mode. Existing number-line, map, source, and science labs serve the same purpose through their own components. The shared Math lesson player now has a consistent **model or investigate → make/solve → worksheet discussion → check** order; the optional teaching-resource drawer is available without dominating the first screen. Social Studies shows **current action → source/inquiry → goal and finish check**. These patterns reuse the existing projector player, native disclosure, and print infrastructure. A single mandatory card template across subjects would erase useful differences in how the investigations work.

## Verification and follow-up

`npm test` passed, including TypeScript, source/content checks, Pages build, and emitted-asset verification. The live Math and Social Studies pages were inspected before editing; local preview could not be opened in the connected browser, so the changed renderers still require a post-deployment visual check. A physical back-of-room projector trial and student comprehension check have not occurred. Verify Math first-part labels, worksheet access, Social Studies scene switching, mobile wrapping, and print on the published build. Do not infer that planned classroom work happened from these UI changes.
