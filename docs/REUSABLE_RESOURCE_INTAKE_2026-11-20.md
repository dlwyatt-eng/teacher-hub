# Reusable resource intake: first review batch

## Scope
Unpublished local review based on remote main 02ea3afde10ffab5367a42c6b5e73a825035305a, fetched November 20. Adds two undated student downloads to the existing TOC & Emergency Plans resource route, not a new site or collection of chat transcripts.

- Night Market Rescue: eight-page low-ink logic, evidence, writing and design booklet.
- Midnight Museum: nine-page low-ink independent-mission booklet; white headers replace dark banners.

The dated Friday Field Files edition is intentionally omitted because it duplicates the Museum activities and is less reusable. Existing rights-and-evidence activity, Missing Time Capsule resources, and broader lessons are not duplicated. No other local review branch is included.

## Privacy and staff materials
The repository and downloads are public-facing; teacher-oriented navigation is NOT authentication. Only original, generic student activities are staged. No student records, family information, private file links, conversation links or staff schedules are included. Empty name/date blanks are not completed student data. PDF metadata was cleared; rendered pixels and text remain identical to the reviewed student copies.

Separate matching teacher guides/answer keys exist for both resources and remain outside this public repository. The page explicitly tells the teacher to keep them in private staff storage. No private storage URL is embedded. This batch does not claim the public downloads include those keys.

## Checks
- Both source PDFs previously visually reviewed; all nine Museum pages reviewed after low-ink changes. Night Market puzzles and key independently solved during original review.
- Staged PDFs: page counts, no embedded links, generic-text screen, metadata removal, exact text and rendered-pixel equivalence against reviewed originals passed.
- Focused integration tests check downloadable files, route links, undated reuse and explicit public/private boundary.
- Full aggregate: 357 tests passed, typecheck/build/artifact passed. After explicit BASE_URL links: typecheck, two focused tests, build and artifact checks passed again. Both production /teacher-hub/printables/ links and emitted PDF files verified; no doubled prefix.
- No new interactive browser/mobile review of the TOC route performed. Existing card classes are reused. Automated rendering/build success is not classroom-use validation.

No push, PR, deployment, Windows access or SpacesEDU change.
