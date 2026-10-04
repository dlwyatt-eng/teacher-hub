# Nature Today - October 2026

## Scope and canonical content

A daily 2-5 minute observation routine with 15 dated, attributed photographs, three question stages, an image bank and optional buddy observation. Teacher Hub `content/nature-today.json` is canonical. The component, data and assets are mirrored into Equity Hub. This adds a resource; it does not assert that any planned lesson was taught, change a day plan or create a family notice.

Teacher route: `?view=Nature+Today` (append `&mode=student` for student-facing mode).
Equity route: `#nature-today`; discoverable from Start and Outdoor learning. PDFs are also listed in Printables.

## Behaviour

Vancouver-local weekday selection rotates through the 15-image bank during October and November; weekends use Friday's slot. This is a deterministic reference rotation, not a live photo feed or fresh sighting claim. Other months show an explicitly manual autumn example. Choosing a photo puts its id in the `nature` query parameter. The bank remains selectable; no student data or accounts are collected. The focus dialog uses full-frame photos and excludes teacher notes.

## Maintaining the pack

1. Edit canonical `content/nature-today.json`, retaining source title, creator, source and licence links, date/place uncertainty and preparation notes. Add or replace only images with usable permission.
2. Place full-frame WebP copies in `public/images/nature-today/`. The complete current bank has 15 photographs.
3. Run `python scripts/build-nature-today-pack.py --out ../output/pdf` with ReportLab, Pillow and DejaVu Sans installed. Render and inspect the PDFs after content or layout changes.
4. Copy the three PDFs to `public/downloads/nature-today/`; refresh the complete ZIP (PDFs, JSON, credits and the 15 photos).
5. Mirror `app/nature-today.tsx`, `app/nature-today.css`, the JSON, photo credits and only Nature Today assets into the current Equity checkout. Preserve other changes.
6. Run both repositories' existing `npm test` and `git diff --check` release gates. Check the actual image selection, projector view and downloads. Recompare remote heads before publishing.

## Content evidence and limits

BC Science 6 links are primarily inquiry competencies, alongside ELA visual-text interpretation. PHE, Career and Social Studies links require the optional activities described in the guide. Seasonal images span several dates and places; source uncertainty is explicit. The bank does not supply a matched before/after pair, verify a class walking route or guarantee salmon sightings. Use authentic, attributed local Nation sources for Indigenous learning; this routine does not manufacture that knowledge.

The student journal contains student activities only. Teacher guidance and assessment suggestions are in the separate eight-page teacher pack. Image licences are retained in the image bank and `NATURE_TODAY_PHOTO_CREDITS.md`.

## Release verification

Prepared on the current remote baselines: Teacher Hub `b2ec122`; Equity Hub `65e3a80`. No reset or force push is part of this release. Exact post-push commit and source-tree matches are checked against the remote refs at publication. Automated, visual, classroom-use and publication evidence are reported separately; no classroom trial is claimed.

Prepublication evidence: both complete `npm test` gates passed (Teacher Hub 233 tests; Equity Hub 27 tests), including TypeScript, production builds and copied-asset validation. `git diff --check` passed. All 29 PDF pages were rendered and visually reviewed; credits, source links and all 15 full-frame photos were checked. The ZIP integrity check passed. The component, JSON, credits and 19 public files match across hubs. The cloud browser cannot open the local preview address, so interactive browser checks remain a postdeployment gate. No classroom-use or mobile-device trial is claimed.
