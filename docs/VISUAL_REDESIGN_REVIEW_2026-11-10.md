# Teacher Hub visual redesign: first integration stage

## Review status

Local review work only. No push, PR, deployment or public URL change.

Base: `cabf71aa2be93dfd3b2ab87dcf3498a92f230ad6`, verified as current remote main on 10 November 2026. Worktree branch: `design/sitewide-review`.

This is an initial layer over the current Hub, not a replacement application. The separate concept prototype informed the palette, typography, original landscape illustrations and comparison surfaces. The current app continues to own classroom routing, selected days, lesson state, archives, search, projector mode and saved data.

## Implemented

- Shared shell palette: warm paper, forest, light surfaces and clearer navigation selection.
- A new illustrated home welcome, followed by the original Run the Day component and subject controls in their existing order.
- An optional inquiry invitation after the subject area. It opens the existing `activities/better-world-journey.html` address.
- Redesigned standalone inquiry and Fieldnotes at their existing addresses, sharing one scoped stylesheet and progressive-enhancement script.
- Five curriculum-led starting points and six revisitable inquiry moves. The guiding question is: “How do choices in different places shape people’s lives and our shared world?” Rights and fairness are one entry, alongside governance, migration, resources, cooperation and conflict.
- Original teacher guidance and all original resource links retained. The curriculum paragraph is additive.
- All ten Fieldnotes fields, examples, help and print behavior retained. New text export and leave-page warning supplement the explicit no-autosave model.
- Meaningful alt text identifies the illustrations as imagined places. No generated picture is presented as source evidence about a real country.
- Larger text and print-specific rules for the new surfaces, plus focus, reduced-motion and forced-colour support in the app layer.

## What has not been replaced

The existing projector Home, lesson players, unit worlds, subject content, dense teacher planning views, yearly archives and public learning projection remain in place. This stage changes their surrounding shell, not their internal workflows. Later stages should use the same visual language while testing each reusable component, rather than applying a universal layout override.

No new student account, public posting, required assignment or AI Space is introduced. No persistence or data-transmission code is added. Standalone Fieldnotes values remain in memory while that page is open; moving away may discard them, so the warning and explicit exports remain important.

## Preservation checks

A diff against the base confirms no changes under `content/` or to day-plan store/storage, classroom navigation state, weekly plan state, morning screen state, student lesson contracts or the subject catalogue. The generated public window remains unchanged after synchronization. Existing local storage keys, dated plan history, JSON import/export and URL behavior are not modified.

The home still delegates all day-specific actions to the unchanged ClassroomLaunch component. The new welcome does not compute a date or create a parallel selected-day state.

## Verification

Full `npm test` passed on the final code:

- Public-window source and checksum check.
- TypeScript check.
- **318 tests passed**, zero failures or skips, including the original activity tests unchanged and six new regression tests.
- Production Pages build.
- Artifact check: **114 emitted files**, copied public assets present, initial gzip approximately **143.3 KB JavaScript + 89.4 KB CSS**.

The dependency lockfile matches the verified installed dependency tree used for checks. JavaScript syntax checks and `git diff --check` also passed.

Read-only code review found and fixed new Large text kicker/caption sizing and print typography/colour inconsistencies. A rendered 320px review also found and fixed toolbar crowding; the repair was verified in standard and Large text modes. These fixes were included before the final build. A pre-existing large-chunk build warning remains; the build does not fail on it.

**Browser checks completed:** Home at desktop, 390px and 320px, standard/Large text, current and selected-day navigation, projector and attendance dialog, Plan mode, Science, search to a real lesson, inquiry topic/move controls and keyboard switching, and Fieldnotes editing. The 320px toolbar repair has zero measured horizontal overflow. Inquiry also has zero measured overflow at 390px in both text sizes. The approved Wonder Atlas reference and rendered inquiry were compared at matching dimensions.

**Still unverified:** actual print/PDF output and downloaded text-file delivery. The export control reported that a download was requested, but the download completion wait timed out. Print did not expose a preview in this review environment. A complete keyboard/Back-Forward pass, 200% zoom, forced colours, reduced-motion rendering and narrow-phone Fieldnotes interaction also remain release checks. These are verification limits, not established app defects.

See `design-qa.md` for evidence and the remaining gates. The current integration is ready for design review, not publication.
## Next gate

1. Review the integrated look and first-stage scope.
2. Finish print/PDF, text download and the remaining accessibility/navigation checks listed in `design-qa.md`.
3. Resolve any meaningful findings and request explicit publication approval.
4. Reconcile with the latest remote head and rerun checks before any eventual release. This review is not permission to publish.
