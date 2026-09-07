# Earth integration validation evidence

The first complete feature revision d7bd8c264a417820c3c1a417e1070e885853bd33 passed Teacher Hub's full existing npm test/build suite and 20 browser grade/activity combinations in Actions run 34090843531. Equity feature e54238faf7e6b13f377f618cfe60b56c7a0c54f0 passed run 34091043674; Learn feature 9f42a060d03f110760a9ebc675fef4eca3508b8c passed run 34091195426. These are review runs, not publication evidence.

The downloaded Teacher artifact was examined. All 20 route checks and zero JavaScript exceptions were confirmed in checks.json. The automated PDF sample initially used screen media because the test had explicitly enabled screen emulation earlier. This affected the review artifact, not the lesson's print stylesheet. The reviewer now explicitly selects print media before generating its sample and restores screen afterwards.

The exact built HTML was independently printed with print media enabled. The selected Grade 6 change lesson produced three letter-size pages: two pages of evidence/source cards and one response page. Every page was rendered and visually inspected. Teacher notes and answer guidance were absent, and no clipping or overlap was observed. This does not claim every printer or every activity has identical pagination.

The updated reviewer also checks the four Equity entry links and the Learn family entry while confirming that the opening Now view has no added card. Curriculum/data/build-generator source blobs remain unchanged. A final review run and Pages deployment are still checked separately.

No classroom trial or exact streaming-video/caption verification is claimed. Teachers can run the supplied no-video activities without student devices, outside accounts, purchases, donations or additional uploads.
