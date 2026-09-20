"""Rebuild the five-page student companion from canonical scenario data."""
import json
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.colors import black, HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont("DejaVu", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DejaVu-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFontFamily("DejaVu",normal="DejaVu",bold="DejaVu-Bold")
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'content/belonging-sequence.json').read_text())
out=ROOT/'public/printables/belonging-barrier-redesign.pdf'
c=canvas.Canvas(str(out),pagesize=(612,792));c.setTitle('Belonging Barrier Redesign - Grade 6')
W=516

def txt(text,x,y,width=W,size=14,bold=False):
 st=ParagraphStyle('p',fontName='DejaVu-Bold' if bold else 'DejaVu',fontSize=size,leading=size*1.32,textColor=black)
 p=Paragraph(text,st); w,h=p.wrap(width,700);p.drawOn(c,x,y-h);return y-h

def header(num,title,sub):
 c.setFillColor(black);txt('GRADE 6  /  BELONGING & COMMUNITY',48,752,size=10,bold=True)
 y=txt(title,48,726,size=25,bold=True);txt(sub,48,y-12,size=13)
 c.setLineWidth(.7);c.line(48,45,564,45);txt('Speak · point · draw · write · dictate. Use fictional examples.',48,35,size=9)
 c.setFont('DejaVu',9);c.drawRightString(564,25,str(num)+' / 5')

def box(x,y,w,h):
 c.setStrokeColor(black);c.setLineWidth(.8);c.roundRect(x,y-h,w,h,8,stroke=1,fill=0)

def page():c.showPage()
header(1,'Who gets to belong?','Being invited is a start. Belonging means we can take part, contribute and feel part of the group.')
y=617
for n,title,body in [('1','PERSON','What does the person want to do? Ask what works for them. Do not guess their abilities.'),('2','BARRIER','What gets in the way? Look at the rules, space, information, equipment, pace or choices.'),('3','REDESIGN','What could change so the person can contribute to the shared goal? Try it, ask and improve it.')]:
 box(48,y,W,117);txt(n,65,y-17,35,size=28,bold=True);txt(title,113,y-16,429,size=20,bold=True);txt(body,113,y-49,429,size=16);y-=131
box(48,211,W,129);txt('A model to try',65,196,480,size=15,bold=True);txt('A player wants to understand the game. The rules are spoken quickly over music. Pause the music, show the steps and model a practice round. Ask what is clearer and what still needs changing.',65,171,480,size=15)
page()
for number,items in [(2,data['barriers'][:3]),(3,data['barriers'][3:])]:
 header(number,'Barrier scenario cards','Choose one. Name the person’s goal, the barrier and a change. Explain how your change helps real participation.')
 for i,item in enumerate(items):
  y=625-i*181;box(48,y,W,166)
  y2=txt(item['title'],64,y-13,484,size=18,bold=True)
  y2=txt(item['text'],64,y2-8,484,size=14)
  txt('<b>Shared goal:</b> '+item['goal'],64,y2-9,484,size=13)
  txt('Person wants to…   /   Barrier…   /   We could change…',64,y-140,484,size=11,bold=True)
 page()
header(4,'Does fair mean the same?','Later lesson: compare the plans. Equality gives the same; equity responds to barriers; accessibility builds in ways to take part. These can overlap.')
# concise print text preserves exact ideas, leaving comfortable type size
short=[
 ('Show an explanation','Same: everyone writes by hand. Support: a scribe when needed. Design: spoken, written, drawn and supported responses from the start.','How can everyone explain the same idea?'),
 ('Reach the shared goal','Same: one distance and a heavy ball. Support: a suitable ball or distance. Design: reachable targets, equipment and ways to send the ball, with individual support.','How can the shared challenge stay meaningful?'),
 ('Have a say','Same: ten seconds each to speak. Support: more thinking time or a communication tool. Design: think first; speak, draw, point or write, with support available.','Is equal speaking time enough to contribute?'),
 ('Understand a field trip','Same: one small-print sheet. Support: a translated version. Design: clear print, a visual schedule and an accessible digital version, plus requested support.','How will we check that families can use it?')]
for i,(title,body,q) in enumerate(short):
 y=608-i*135;box(48,y,W,124);y2=txt(title,62,y-10,488,size=16,bold=True);y2=txt(body,62,y2-5,488,size=12.5);txt('<b>Ask:</b> '+q,62,y2-6,488,size=12.5)
page()
header(5,'Our belonging commitments','Choose two actions we can actually try. Adults make sure access and safety are protected; inclusion is not a vote.')
txt('Before our next shared activity, we will…',48,624,size=19,bold=True)
for i in range(2):
 y=581-i*160;box(48,y,W,143);txt('ACTION '+str(i+1),64,y-12,size=12,bold=True);txt('We will change:',64,y-38,size=13);txt('So people can:',64,y-91,size=13)
box(48,250,W,177);txt('Check, listen and change again',64,235,480,size=18,bold=True)
txt('We will try this during: _________________________________',64,201,480,size=13)
txt('We will check back: ___________________________________',64,170,480,size=13)
txt('What helped? What still needs changing?',64,139,480,size=14,bold=True)
txt('Share aloud, point, leave a note or speak privately with an adult.',64,109,480,size=12)
page();c.save();print(out)
