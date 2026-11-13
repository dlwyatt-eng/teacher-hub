# Preserved authoring inputs

The original 15-page student and five-page teacher PDFs were supplied in the repository; their original editable authoring files were not present. These copies preserve that source at commit `2cd1678`.

Run `python3 scripts/build-country-inquiry-pack.py` from the repository root to rebuild the public PDFs. It replaces only each opening page and copies remaining pages unchanged except the presentation checklist line on student page 14, which is truly redacted and replaced with the selected inquiry lens, retaining all page references, original attribution and selected-page classroom use. It also creates the matching one-page starter. Requires ReportLab, pypdf, PyMuPDF and the system DejaVu Sans fonts (embedded in new pages).

Do not edit the archived PDFs in place. Subsequent substantive page revisions should be authored in the generator, with a deliberate page-replacement map and checks that original page references stay accurate.

After rebuilding, run `python3 scripts/check-country-inquiry-pdfs.py` to verify page counts, unchanged-page text (excluding student page 14), and that page 14 contains the replacement with every other word preserved. Render the changed pages for visual inspection as well.
