# Election resource review — October 18, 2026

Base: eb780bcf7b39ccc68d7ab0557ff60360f87ab368. Changes are restricted to the Social Studies resource shelf and its Newsroom deep link, obsolete municipal ballot instructions, the canonical/public learning window, and a Windows test file-URL correction. Existing math, science and other subject content is preserved.

Provincial Student Vote is planned for Thursday October 22; exact class time is pending. Registration, school ballot district and complete candidate roster are not confirmed. No municipal Student Vote is planned. Municipal evidence comparison and civic hearing resources remain available.

The shelf distinguishes five selected BC parties from the ballot roster, explains source dates, interpretive spectrum placement and overlap, and distinguishes promises from outcomes and study from endorsement.

Validation: npm ci completed; npm test passed all 240 tests, TypeScript, the production Pages build and artifact verification. On Windows, unchanged source files were locally normalized to LF because two existing source-inspection tests assumed LF. The calendar rehearsal test now uses fileURLToPath rather than URL.pathname, avoiding a duplicated drive prefix. No math/science content was changed by this normalization. Patch whitespace was checked.

The resource-shelf deep link was verified in Edge and its rendered content inspected. Later browser screenshot/control checks were interrupted by native print-preview capture; remaining mobile/live checks must be reported separately. No classroom-use claim is made.

Incomplete deliverables: the five prepared CentreBC/spectrum files resolved in Library, but the supported transfer helper failed on Windows at os.setxattr. No verified destination bytes were installed; no download links or image-dependent claims were added. The earlier four-party set was not replaced. Adding and visually verifying the five files remains a follow-up once supported materialization succeeds.

Publish through the existing main-branch Pages workflow, checking expected remote heads. Deployment success and live-route confirmation must be reported from the actual run, not inferred from this record.
