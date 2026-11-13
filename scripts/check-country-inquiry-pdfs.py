"""Validate generated PDFs after building; requires pypdf and PyMuPDF."""
from pathlib import Path
from pypdf import PdfReader
import fitz
ROOT=Path(__file__).resolve().parents[1]
for kind,count in [('student',15),('teacher',5)]:
    original=PdfReader(ROOT/f'assets/inquiry-booklet-source/{kind}-original.pdf')
    output=PdfReader(ROOT/f'public/printables/two-countries-shared-questions-{kind}.pdf')
    assert len(output.pages)==count
    for i in range(1,count):
        if kind=='student' and i==13:
            continue
        assert original.pages[i].extract_text()==output.pages[i].extract_text(),(kind,i+1)
    assert 'choices in different places' in output.pages[0].extract_text()
original=fitz.open(ROOT/'assets/inquiry-booklet-source/student-original.pdf')
output=fitz.open(ROOT/'public/printables/two-countries-shared-questions-student.pdf')
a=original[13].get_text();b=output[13].get_text()
old='□ Use a news example and more than one perspective; explain a connection to rights.'
new='□ Use a news example and more than one perspective; connect to your inquiry lens.'
assert old not in b and new in b
# Redaction reinserts at the original visible baseline, after other stream text.
assert sorted(a.replace(old,'').split())==sorted(b.replace(new,'').split())
assert len(PdfReader(ROOT/'public/printables/country-inquiry-starter.pdf').pages)==1
print('Verified 15/5/1 pages, broad openings, page 14 replacement and all untouched text.')
