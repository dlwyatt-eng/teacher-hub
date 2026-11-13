"""Rebuild broad inquiry openings and supplied starter. Requires reportlab, pypdf, PyMuPDF.
Original PDF sources are retained because their original authoring files were not in
this repository. Pages after the opening are copied unchanged except one accurately
redacted/replaced inquiry-lens checklist line on student page 14.
Run from repo root: python3 scripts/build-country-inquiry-pack.py
"""
from pathlib import Path
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader, PdfWriter
import fitz
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
FONTDIR=Path('/usr/share/fonts/truetype/dejavu')
pdfmetrics.registerFont(TTFont('InquirySans',str(FONTDIR/'DejaVuSans.ttf')))
pdfmetrics.registerFont(TTFont('InquirySans-Bold',str(FONTDIR/'DejaVuSans-Bold.ttf')))
pdfmetrics.registerFontFamily('InquirySans',normal='InquirySans',bold='InquirySans-Bold')
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/printables'
INK=HexColor('#203f3d'); GREEN=HexColor('#346557'); PALE=HexColor('#eef3ed')
STYLE=ParagraphStyle('body',fontName='InquirySans',fontSize=11.5,leading=16,textColor=INK)
def para(c,text,y,size=11.5,bold=False,width=516,x=48):
 s=ParagraphStyle('p',parent=STYLE,fontSize=size,leading=size*1.35,fontName='InquirySans-Bold' if bold else 'InquirySans')
 p=Paragraph(text,s); _,h=p.wrap(width,700); p.drawOn(c,x,y-h); return y-h-12
def start(label,title):
 b=BytesIO(); c=canvas.Canvas(b,pagesize=(612,792)); c.setTitle(title); c.setAuthor('Teacher Hub - classroom teaching resource')
 c.setFillColor(INK); c.setFont('InquirySans-Bold',10); c.drawString(48,752,label.upper())
 c.setStrokeColor(GREEN);c.line(48,739,564,739)
 y=para(c,title,722,25,True); return b,c,y
def lines(c,y,n=3,gap=24):
 c.setStrokeColor(HexColor('#abb7b0'));c.setLineWidth(.5)
 for i in range(n): c.line(48,y-i*gap,564,y-i*gap)
 return y-n*gap

def finish(c,b,footer,page='1'):
 c.setFillColor(INK);c.setFont('InquirySans',9);c.drawString(48,29,footer);c.drawRightString(564,29,page);c.showPage();c.save();b.seek(0);return b

def replace_opening(kind,b):
 source=ROOT/f'assets/inquiry-booklet-source/{kind}-original.pdf'
 if kind == 'student':
  # Actual redaction removes the old requirement from searchable/copyable text.
  # Keep the original baseline, typeface, size and every surrounding element.
  doc=fitz.open(source)
  page=doc[13]
  old='□ Use a news example and more than one perspective; explain a connection to rights.'
  new='□ Use a news example and more than one perspective; connect to your inquiry lens.'
  spans=[span for block in page.get_text('dict')['blocks'] for line in block.get('lines',[]) for span in line['spans'] if span['text']==old]
  assert len(spans)==1, 'Expected exactly one page 14 checklist requirement'
  span=spans[0]
  page.add_redact_annot(fitz.Rect(span['bbox']),fill=(1,1,1))
  page.apply_redactions(images=0,graphics=0)
  page.insert_font(fontname='InquirySans',fontfile=str(FONTDIR/'DejaVuSans.ttf'))
  page.insert_text(span['origin'],new,fontname='InquirySans',fontsize=span['size'],color=(0,0,0))
  doc.subset_fonts()
  original=PdfReader(BytesIO(doc.tobytes(garbage=4,deflate=True)))
  doc.close()
 else:
  original=PdfReader(source)
 w=PdfWriter(); w.add_page(PdfReader(b).pages[0]);
 for p in original.pages[1:]: w.add_page(p)
 w.add_metadata({'/Title':f'Two Countries Shared Questions - {kind}','/Author':'Teacher Hub'})
 with open(OUT/f'two-countries-shared-questions-{kind}.pdf','wb') as f:w.write(f)

b,c,y=start('Student inquiry booklet','Two Countries Shared Questions')
y=para(c,'How do choices in different places shape people\'s lives and our shared world?',y,17,True)
y=para(c,'Choose an issue that matters to you. Investigate particular people and places in two countries, using maps, stories, evidence and news. Our goal is understanding, not choosing a "best country."',y)
y=para(c,'Name _________________________  Working with ______________________',y,10)
y=para(c,'Choose a way in',y,15,True)
for title,text in [('Power and decisions','Who decides, and whose voices count?'),('Migration and places','How do growing communities respond when people move?'),('Resources and trade','How do everyday products connect people and environments?'),('Cooperation and conflict','How do people respond to a problem that crosses borders?'),('Rights and fairness','Who can take part, and what barriers remain?')]:
 y=para(c,f'<b>{title}</b> - {text}',y,11)
y=para(c,'Circle a starting point, or bring your own. Across every lens: who made the source, what supports it, and whose perspective is missing?',y)
y=para(c,'One question I would like to investigate',y,13,True);y=lines(c,y-10,3)
y=para(c,'Use selected pages, not the whole packet',y-8,13,True)
y=para(c,'Start with the supplied town-map lesson and one-page starter, or choose a class challenge. Talk, sketch or write. Then choose countries, find evidence, compare fairly and explain what you found. Your question can change.',y)
y=para(c,'You do not need to share personal or family experiences. National Child Day is an optional rights connection, not a deadline or the frame for every inquiry.',y,10)
assert y>42,y
replace_opening('student',finish(c,b,'Two Countries Shared Questions | Grade 6'))

b,c,y=start('Teacher guide - Social Studies 6','Teach the inquiry, one move at a time')
y=para(c,'How do choices in different places shape people\'s lives and our shared world?',y,16,True)
y=para(c,'Start now: a 15-minute opening',y,15,True)
y=para(c,'Open <b>A Better World - Inquiry Journey</b> and choose <b>Project this lesson</b>. Give pairs the one-page <b>Country Inquiry Starter</b> or plain paper. The supplied map, survey and headlines are explicitly fictional. No film, online search or teacher-selected source is needed for this opening.',y)
for title,body in [('1. Notice (3 minutes)','Point to a map detail; distinguish observation from inference. A bridge is shown; distances, accessibility and bus frequency are not.'),('2. Compare (4 minutes)','Read the survey. 15 of 20 River Town respondents said yes, compared with 8 of 20 in Hill Town. This does not establish cause or describe everyone.'),('3. Question media (4 minutes)','Contrast the access and cost headlines. Neither is an outcome. Ask for resident perspectives and transport-service evidence.'),('4. Choose (4 minutes)','Learners propose an investigable question and one next source. Two real countries can be selected next; practice towns are not country evidence.')]:
 y=para(c,f'<b>{title}</b> - {body}',y,11)
y=para(c,'Choose pages by the question, not by page order',y,14,True)
y=para(c,'Governance: 4. Migration: 5. Resources/trade: 6-7. Cooperation/conflict: 8. Rights/fairness: 3. Use evidence and media checks (9-12) across all lenses. Pages 13-14 support explanation and reflection. Page 15 is an optional search menu, not an approved reading list.',y,11)
y=para(c,'Return to real evidence',y,14,True)
y=para(c,'Model a short source search and check author, purpose, date and evidence. Use specific communities, not stereotypes about whole countries. Every learner investigates both countries. Offer read-aloud, sketches, home-language thinking and oral explanations; do not require family disclosure.',y,11)
y=para(c,'The existing inquiry stays flexible: no new assignment or deadline, no holiday homework and no separate post per page. National Child Day is an optional connection; January sharing remains proposed. Assess reasoning, not agreement or page completion.',y,10.5)
assert y>42,y
replace_opening('teacher',finish(c,b,'Two Countries Shared Questions | Grade 6'))

b,c,y=start('One-page student starter - fictional practice','Same river. Different routes.')
y=para(c,'Name _______________________  Partner _______________________\n',y,10)
y=para(c,'Teaching sources: invented towns, map, survey and headlines. Not evidence about real countries. Talk, sketch or write; your question can change.',y,10)
# Small diagram with legible place labels, visually matching the projected map.
top=y; bottom=top-96
for x,name,crosses in [(48,'Hill Town',True),(312,'River Town',False)]:
 c.setFillColor(PALE);c.roundRect(x,bottom,252,94,6,fill=1,stroke=0)
 c.setFillColor(INK);c.setFont('InquirySans-Bold',11);c.drawString(x+10,top-17,name)
 c.setStrokeColor(HexColor('#75b3c5'));c.setLineWidth(16);c.line(x+133,bottom+8,x+133,top-24)
 c.setStrokeColor(GREEN);c.setLineWidth(2);c.line(x+40,bottom+36,x+210,bottom+36);c.line(x+40,bottom+36,x+40,top-42)
 c.setFillColor(HexColor('#f0c46b'));c.rect(x+119,bottom+30,28,12,fill=1,stroke=0)
 c.setFillColor(INK);c.setFont('InquirySans',10);c.drawString(x+10,top-37,'Homes')
 c.setFont('InquirySans',9);c.drawString(x+112,bottom+15,'bridge')
 c.setFont('InquirySans',10);c.drawString(x+174 if crosses else x+10,bottom+49 if crosses else bottom+14,'Bus stop')
 if crosses:c.line(x+192,bottom+36,x+192,bottom+45)
 else:c.line(x+40,bottom+36,x+40,bottom+24)
y=bottom-5
y=para(c,'A. Route maps, not to scale. Lines are walking routes, not distances.',y,9)
y=para(c,'1. One detail I notice, and something I wonder',y,12,True);y=lines(c,y-2,2,23)
y=para(c,'B. Same-day survey: "Can you reach a bus stop easily?" Hill Town: 8 of 20 said yes. River Town: 15 of 20 said yes. Each surveyed 20 residents.',y-1,10.5)
y=para(c,'2. One supported comparison, and one thing we cannot tell',y,12,True);y=lines(c,y-2,2,23)
y=para(c,'C. Hill Town is considering a stop near the homes. Cost, demand and route effects are not checked. Headlines: "New stop could bring buses closer to homes" / "New stop could add costs to town\'s bus route."',y,10)
y=para(c,'3. Whose evidence would help us decide? Why?',y,12,True);y=lines(c,y-2,2,23)
y=para(c,'4. My real-world question + one source I would need',y,12,True)
y=para(c,'Try: How do communities in ___ and ___ respond to ___, and who is affected?',y,9)
y=lines(c,y-2,3,23)
assert y>40,y
out=finish(c,b,'Keep this as a starting note. No new deadline. | Grade 6')
(OUT/'country-inquiry-starter.pdf').write_bytes(out.read())
print('Built two preserved-page booklets and the one-page starter.')
