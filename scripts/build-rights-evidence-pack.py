#!/usr/bin/env python3
"""Rebuild the optional student PDF from the activity's actual source cards.
Requires reportlab. Runtime site/build does not need Python or this script.
"""
from pathlib import Path
from html.parser import HTMLParser
from html import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFontFamily("DejaVu", normal="DejaVu", bold="DejaVu-Bold", italic="DejaVu", boldItalic="DejaVu-Bold")
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.enums import TA_LEFT

ROOT = Path(__file__).resolve().parents[1]
class Cards(HTMLParser):
    def __init__(self):
        super().__init__(); self.cards={}; self.card=None; self.field=None
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag == 'article' and attrs.get('data-card'):
            self.card=attrs['data-card']; self.cards[self.card]={}
        if self.card and tag in ['span','h3','small','p']:
            self.field={'span':'tag','h3':'title','small':'source','p':'text'}[tag]
            self.cards[self.card][self.field]=''
    def handle_data(self, data):
        if self.card and self.field: self.cards[self.card][self.field] += data
    def handle_endtag(self, tag):
        if tag == 'article': self.card=None; self.field=None
        elif tag in ['span','h3','small','p']: self.field=None
parser=Cards(); parser.feed((ROOT/'public/activities/rights-evidence-bridge.html').read_text())
assert set(parser.cards)=={'A1','A2','A3','B1','B2','B3'}
out=ROOT/'public/printables/rights-evidence-bridge-student.pdf'
c=canvas.Canvas(str(out), pagesize=(612,792)); c.setTitle('Rights to evidence - student source cards and response sheet'); c.setAuthor('Teacher Hub')
ink=colors.HexColor('#193e3c'); muted=colors.HexColor('#48625c'); border=colors.HexColor('#9bb3aa')
styles={
 'body':ParagraphStyle('body',fontName='DejaVu',fontSize=9.8,leading=12.5,textColor=ink),
 'small':ParagraphStyle('small',fontName='DejaVu',fontSize=7.8,leading=10,textColor=muted),
 'head':ParagraphStyle('head',fontName='DejaVu-Bold',fontSize=11.5,leading=14,textColor=ink),
}
def p(text,x,y,w,style='body'):
    para=Paragraph(text,styles[style]); _,h=para.wrap(w,760); para.drawOn(c,x,y-h); return y-h

def footer(n):
    c.setStrokeColor(border); c.line(36,35,576,35)
    p('Teacher-created fictional practice | No real country claims | Optional inquiry support',36,27,510,'small')
    c.setFillColor(ink); c.setFont('DejaVu',8); c.drawRightString(576,19,str(n))

def heading(kicker,title):
    c.setFillColor(muted); c.setFont('DejaVu-Bold',9); c.drawString(36,757,kicker)
    c.setFillColor(ink); c.setFont('DejaVu-Bold',20); c.drawString(36,728,title)

heading('SOCIAL STUDIES 6 / SOURCE CARDS','A right on paper. A chance in real life.')
y=p('<b>Question:</b> How do transport decisions help children get to school?',36,709,540)
y=p('Alder and Bay are invented districts. All six records and October dates below are fictional. Use them to practise thinking, not as sources about real countries.',36,y-6,540)
y=p('<b>Rights reference:</b> Article 28: education, with free primary schooling. Article 2: rights without discrimination. Article 12: children\'s views should be taken seriously. Rights are not rewards for good behaviour. A bus is a possible support, not the right itself.',36,y-8,540)
y=p('Teaching paraphrases. UNICEF children\'s version: <link href="https://www.unicef.org/child-rights-convention/convention-text-childrens-version" color="#195d74">unicef.org/child-rights-convention/convention-text-childrens-version</link>',36,y-5,540,'small')
y-=13
card_h=151; gap=10; w=265
for row in range(3):
    for col, district in enumerate(['A','B']):
        card=parser.cards[f'{district}{row+1}']; x=36+col*(w+10); top=y-row*(card_h+gap)
        c.setStrokeColor(border); c.setFillColor(colors.HexColor('#f5f8f6')); c.roundRect(x,top-card_h,w,card_h,7,stroke=1,fill=1)
        yy=p(escape(card['tag']).replace('·','/'),x+10,top-9,w-20,'small')
        yy=p(escape(card['title']),x+10,yy-4,w-20,'head')
        yy=p(escape(card['source']).replace('·','/'),x+10,yy-4,w-20,'small')
        yy=p(escape(card['text']),x+10,yy-6,w-20)
        assert yy >= top-card_h+7, (card['title'],yy,top-card_h)
assert y-3*card_h-2*gap > 46
footer(1); c.showPage()
heading('SOCIAL STUDIES 6 / MY REASONING','What can I say? What is still uncertain?')
y=p('Use the cards on page 1. Talk, sketch with labels, dictate or write. Keep your own reasoning. This is practice for the existing country inquiry, not a new required upload.',36,707,540)
def prompt(title, text, lines=2):
    global y
    y=p(title,36,y-17,540,'head'); y=p(text,36,y-4,540)
    c.setStrokeColor(border)
    for _ in range(lines):
        y-=24; c.line(36,y,576,y)
prompt('1. Build a careful claim about Bay.', 'Name a right. Use a card code and detail. Explain why the detail matters. “B__ shows ___. This connects to ___ because ___.”',2)
prompt('2. Compare and limit the claim.', 'Compare one Alder and one Bay record using the same question. Who, where and when do they cover? What do they leave uncertain?',2)
prompt('3. Repair an overclaim on your own.', '“Bay protects every child\'s right to education because its bus was on time.” Keep what is supported. Replace what goes too far. Include a card code and a useful next question.',3)
prompt('4. Begin your real inquiry, provisionally.', 'My two countries and shared question: ___. A rights connection: ___. My first search terms or source to look for: ___. You may change your question after searching.',2)
y=p('<b>When searching:</b> record author, title/link, publication date, event/data date, people/place, evidence and purpose. Find an independent source. Compare the same issue, similar periods and definitions. Notice differences within each country.',36,y-12,540,'small')
assert y>45,y
footer(2); c.save(); print(out)
