"""Rebuild the student response sheets and flexible opening-block guide."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
OUT=Path(__file__).resolve().parents[1]/'public/printables'
OUT.mkdir(exist_ok=True)
W,H=letter; M=44; CW=W-2*M
style=ParagraphStyle('body',fontName='Helvetica',fontSize=11,leading=15,textColor=HexColor('#111111'))
small=ParagraphStyle('small',parent=style,fontSize=10,leading=13)
def para(c,text,y,width=CW,x=M,sty=style):
 p=Paragraph(text,sty);_,h=p.wrap(width,1000);p.drawOn(c,x,y-h);return y-h-10
def start(c,title,n,label='GRADE 6  |  STUDENT RESPONSE SHEETS'):
 c.setFillColor(HexColor('#111111'));c.setFont('Helvetica-Bold',9);c.drawString(M,H-35,label)
 c.setFont('Helvetica-Bold',22);c.drawString(M,H-67,title)
 c.setLineWidth(.7);c.line(M,H-80,W-M,H-80)
 c.setFont('Helvetica',9);c.drawString(M,27,'Classroom OS  |  Print only the page you need');c.drawRightString(W-M,27,str(n))
 return H-97
def name(c,y):return para(c,'Name __________________________  Date ______________',y,sty=small)
def lines(c,y,count,spacing=24):
 c.setStrokeColor(HexColor('#999999'));c.setLineWidth(.4)
 for _ in range(count):c.line(M,y,W-M,y);y-=spacing
 c.setStrokeColor(HexColor('#111111'));return y-8
def heading(c,t,y):return para(c,'<b>'+t+'</b>',y)
def box(c,label,y,height=105):
 c.setLineWidth(.6);c.rect(M,y-height,CW,height);para(c,label,y-10,CW-20,M+10,small);return y-height-14
c=canvas.Canvas(str(OUT/'opening-response-sheets.pdf'),pagesize=letter)
c.setTitle('Grade 6 opening response sheets')
y=name(c,start(c,'An object with a story',1))
y=para(c,'Choose a classroom object or one of the projected pictures. Invent a story; you never need to share a private memory.',y)
y=heading(c,'1  Notice five things you can actually see',y)
y=para(c,'Example: a key has a round hole and two long scratches. A guess such as "it is lost" is not a visible detail.',y,sty=small)
y=lines(c,y-6,3)
y=heading(c,'2  Plan three story beats',y)
for t in ['Beginning - Who is here? Where? What do they want?','Turning point - What changes? What choice do they make?','Ending - What happens because of that choice?']:
 y=para(c,t,y,sty=small);y=lines(c,y,1)
y=heading(c,'3  Tell, listen, improve',y)
y=para(c,'Tell for 60-90 seconds. Your partner names the beginning, turning point and ending, then asks one clear question. Switch roles.',y)
y=para(c,'My listener asked: _________________________________________________',y)
y=para(c,'I made this clearer: _________________________________________________',y)
y=para(c,'Finish: Write six sentences on the back or in your notebook. Check the sequence, two exact details and one improvement.',y)
c.showPage()
y=name(c,start(c,'Listen and keep the source',2))
y=para(c,'Record the source before listening. Listen once without notes. Afterward, add one supported idea and one question. Follow the source\'s sharing guidance.',y)
y=para(c,'Source title ______________________________________________________<br/>Speaker or author _________________________________________________<br/>Community/context exactly as named __________________________________<br/>Host or source route ________________________________________________<br/>Format _____________________  Date accessed ________________________',y)
y=para(c,'If information is missing, write "not stated". Do not guess.',y,sty=small)
y=box(c,'<b>HEARD</b> - One idea the source supports, if recording it is permitted.',y,100)
y=box(c,'<b>INTERPRETED</b> - My thinking about it. Label this as my interpretation.',y,90)
y=box(c,'<b>WONDERED</b> - One question I still have.',y,80)
y=para(c,'One sharing boundary: ______________________________________________<br/>________________________________________________________________',y)
y=para(c,'Partner check: Is the source named accurately? Are hearing and interpretation separate? Keep this card in class. Do not copy or repost story content.',y,sty=small)
c.showPage()
y=name(c,start(c,'Listen closely to a place',3))
y=para(c,'Stay at the spot your teacher chooses. Listen for 20 seconds with eyes open or closed. You can stay indoors or observe from a seat.',y)
y=para(c,'Model: NEAR - pencil, tik-tik, two taps. MIDDLE - cart, rrr-stop, moving left. FAR - rain, shhhh, steady behind a window.',y,sty=small)
for t in ['NEAR - What do you hear close by?','MIDDLE - What do you hear farther away?','FAR - What do you hear in the distance?']:
 y=para(c,'<b>'+t+'</b>',y);y=lines(c,y,2,22)
y=para(c,'Observation: "A wheel rumbled and stopped." Guess: "Someone was in a hurry." Mark guesses with a question mark.',y,sty=small)
y=para(c,'One observation: __________________________________________________<br/>One guess or question: ______________________________________________',y)
y=heading(c,'Make a place postcard',y)
y=para(c,'On the back, write about 100 words or plan a 45-second soundscape. Include three exact details. Ask a partner which detail helped them picture or hear the place.',y)
y=para(c,'My revised sentence: _______________________________________________<br/>________________________________________________________________',y)
c.showPage()
y=name(c,start(c,'Show your thinking',4))
y=para(c,'Use this page after a reading, a maths task or an investigation. Point, draw, label or write. Your teacher chooses the task.',y)
y=para(c,'Today\'s text or problem: _____________________________________________<br/>________________________________________________________________',y)
y=box(c,'<b>My idea or answer</b>',y,100)
y=box(c,'<b>Evidence or working</b> - Show an exact detail, calculation or labelled diagram.',y,190)
y=box(c,'<b>Why it fits</b> - Explain how the evidence or working supports your idea.',y,95)
y=para(c,'One question or next step: ___________________________________________<br/>________________________________________________________________',y)
y=para(c,'Example (fictional text): Mina leaves an envelope unopened. I think she respects privacy because she takes it to the office without reading what is inside.',y,sty=small)
c.save()

c=canvas.Canvas(str(OUT/'opening-blocks-teacher-guide.pdf'),pagesize=letter);c.setTitle('Grade 6 opening blocks teacher guide')
y=start(c,'Prepare the opening blocks',1,'GRADE 6  |  TEACHER PREPARATION')
y=para(c,'Ten flexible teaching blocks to place across the opening fortnight once classes settle. This is a sequence of selected lessons, not a full timetable. Keep school routines, specialists, movement, independent reading and breaks around it.',y)
blocks=[
('1  ELA: An ordinary object','45 min. Show a real key, spoon or projected object. Model three story beats. Partners notice five details and practise telling. Response sheet 1; no personal disclosure.'),
('2  ELA: Retell and write','45 min. Revisit the listener question, retell, then write a six-sentence seed. Collect one clear revision; keep the work in class.'),
('3  Maths: How big is this number?','45-55 min. Use the existing 0.008 lesson and model endpoints and equal intervals. Print the existing two-page number-line and period-chart sheet only as needed.'),
('4  Maths: Change the scale','45-55 min. Revisit 0.008 on the three scales. Use the lesson\'s partner and independent checks. Ask for a reason, not only a plotted point.'),
('5  ELA: Listen first','60-75 min; check source length. Preview the district source and protocol first. Use response sheet 2. If access or guidance is unclear, use the fictional rehearsal on page 2 of this guide and reschedule the source.'),
('6  ELA: School-place soundwalk','55-65 min. Choose safe boundaries or a seated indoor spot. Use response sheet 3. Finish with a place postcard or a short soundscape and revise one detail.'),
('7-8  Social Studies: Three maps of Fleetwood','Two flexible 45-55 min blocks. Use the supplied maps: first notice each map\'s visible details and job; then combine evidence and explain a mapmaker\'s choice. Pause between parts as needed.'),
('9-10  Consolidate and respond','Two 45-55 min blocks. Use the evidence collected to revisit a maths misconception and improve a reading/writing response. Response sheet 4 supports either. Use the Time Capsule short route if an unexpected absence replaces these blocks.'),
]
for title,body in blocks:
 y=para(c,'<b>'+title+'</b><br/>'+body,y,sty=small)
assert y>45,y
c.showPage();y=start(c,'Have the paper route ready',2,'GRADE 6  |  TEACHER PREPARATION')
y=heading(c,'Print and prepare',y)
y=para(c,'Opening response sheets: p. 1 object story; p. 2 attributed listening; p. 3 soundwalk; p. 4 reusable evidence or maths response. Print selected pages rather than a booklet for every child. The existing maths sheet is separate.',y)
y=para(c,'Time Capsule emergency day: one 12-page student booklet each (six sheets double-sided), one 3-page TOC guide and one separate private 2-page answer key. For a 90-minute version print pp. 2-6, 10 and 11; read aloud and collect the final explanation.',y)
y=heading(c,'Fictional listening rehearsal if the source is unavailable',y)
y=para(c,'Read this twice, introducing it as an original fictional Classroom OS practice text. It practises listening and attribution; it does not replace the Semiahmoo source or count as learning from that oral tradition.',y)
y=para(c,'"After lunch, Mina notices a paper envelope beneath the covered bench. The front says Room 12, but no name. She brings it unopened to the office. The secretary calls Room 12, and a student retrieves a set of handmade game cards before dismissal."',y)
y=para(c,'Model: HEARD - Mina brought it unopened to the office. INTERPRETED - She may have wanted to protect someone\'s privacy. WONDERED - Who left it there? Attribute as a teacher-read fictional Classroom OS practice text. Do not use this model as evidence about Chief Chappell\'s story.',y,sty=small)
y=heading(c,'Before using the live lessons',y)
y=para(c,'Open the exact lesson in Teach / Project on the school computer. Try Large Text, scroll to the last instruction, change lesson parts and open the needed PDF. For source lessons, preview media and current sharing directions. Keep printed inputs available if Wi-Fi fails.',y)
y=heading(c,'What to keep and what to do next',y)
y=para(c,'Look for one useful observation, one explanation and one revision. Record a strength, the evidence for it and one next step. Keep ordinary practice in class; do not create an extra SpacesEDU upload for every activity.',y)
y=para(c,'Leave a TTOC the real bell times, attendance and dismissal routines, supervision, room changes and approved private support information. Add these in the existing day-plan builder or school system once confirmed; never put student details on the public site.',y)
y=para(c,'Prepared September 2026. Sequence and response sheets checked against current opening lesson content. School-device playback, physical printing and classroom pacing still need a real classroom trial.',y,sty=small)
assert y>45,y
c.save()
