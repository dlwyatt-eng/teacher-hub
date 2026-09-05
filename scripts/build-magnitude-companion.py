#!/usr/bin/env python3
"""Create the two-page, black-and-white Grade 6 Magnitude Gallery companion.

Usage: python build_magnitude_gallery_companion.py [output.pdf]
The pages are student copies. Only the distinct worked model contains answers.
"""
from pathlib import Path
import sys
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

FONT_ROOT = Path('/usr/share/fonts/truetype/dejavu')
for name, filename in [('CompanionSans', 'DejaVuSans.ttf'), ('CompanionBold', 'DejaVuSans-Bold.ttf'), ('CompanionSerif', 'DejaVuSerif-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONT_ROOT / filename)))
FONT_ALIASES = {'Helvetica': 'CompanionSans', 'Helvetica-Bold': 'CompanionBold', 'Times-Bold': 'CompanionSerif'}

OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('magnitude-gallery-student-companion.pdf')
OUT.parent.mkdir(parents=True, exist_ok=True)
C = canvas.Canvas(str(OUT), pagesize=letter, pageCompression=1)
C.setTitle('Magnitude Gallery - Student Companion')
C.setAuthor('Classroom OS')
C.setSubject('Grade 6: same number on different scales; comparing large numbers')
W, H = letter
LEFT, RIGHT = 42, 570
BLACK = colors.HexColor('#151515')
GRAY = colors.HexColor('#545454')
RULE = colors.HexColor('#8a8a8a')
PALE = colors.HexColor('#f3f3f3')

def text(x, y, s, size=11, font='Helvetica', color=BLACK):
    C.setFillColor(color)
    C.setFont(FONT_ALIASES[font], size)
    C.drawString(x, y, s)

def line(x1, y1, x2, y2, width=.65, color=RULE):
    C.setStrokeColor(color)
    C.setLineWidth(width)
    C.line(x1, y1, x2, y2)

def panel(x, y, width, height, fill=False):
    C.setLineWidth(.8)
    C.setStrokeColor(RULE)
    C.setFillColor(PALE if fill else colors.white)
    C.roundRect(x, y, width, height, 7, stroke=1, fill=1)

def header(title, page):
    text(LEFT, 757, 'MATHEMATICS 6 / MAGNITUDE GALLERY', 9, 'Helvetica-Bold', GRAY)
    text(LEFT, 728, title, 25, 'Times-Bold')
    text(LEFT, 702, 'Name:', 10)
    line(76, 699, 372, 699)
    text(401, 702, 'Date:', 10)
    line(430, 699, RIGHT, 699)
    line(LEFT, 40, RIGHT, 40, .7)
    text(LEFT, 25, 'Use paper, a pencil and your thinking. No device needed.', 8, color=GRAY)
    C.setFont('CompanionSans', 8)
    C.drawRightString(RIGHT, 25, f'{page} / 2')

def response_lines(y, count=2, step=23, x=57, right=555):
    for i in range(count):
        line(x, y-i*step, right, y-i*step, .5)

def scale_box(number, endpoint, bottom, prompt):
    # All three axes have exactly the same physical length and ten intervals.
    height = 126
    panel(LEFT, bottom, RIGHT-LEFT, height)
    text(57, bottom+103, f'{number}  From 0 to {endpoint}', 13, 'Helvetica-Bold')
    text(360, bottom+103, 'One jump =', 11)
    line(428, bottom+100, 554, bottom+100)
    x0, x1, axis_y = 68, 544, bottom+68
    line(x0, axis_y, x1, axis_y, 1.05, BLACK)
    for i in range(11):
        x = x0 + (x1-x0)*i/10
        line(x, axis_y-6, x, axis_y+6, 1, BLACK)
    text(x0-3, axis_y-24, '0', 11)
    C.setFillColor(BLACK)
    C.setFont('CompanionSans', 11)
    C.drawRightString(x1+4, axis_y-24, endpoint)
    text(57, bottom+17, prompt, 10)

def period_chart(x, top, width, rows, blank=False):
    headings = ['Billions', 'Millions', 'Thousands', 'Ones']
    cw, rh, hh = width/4, 26, 23
    h = hh + len(rows)*rh
    C.setFillColor(PALE)
    C.rect(x, top-hh, width, hh, stroke=0, fill=1)
    C.setStrokeColor(RULE)
    C.setLineWidth(.65)
    C.rect(x, top-h, width, h, stroke=1, fill=0)
    for col in range(1,4):
        line(x+cw*col, top, x+cw*col, top-h)
    line(x, top-hh, x+width, top-hh)
    for row in range(1,len(rows)):
        line(x, top-hh-row*rh, x+width, top-hh-row*rh)
    C.setFillColor(BLACK)
    for col, heading in enumerate(headings):
        C.setFont('CompanionBold', 10)
        C.drawCentredString(x+cw*(col+.5), top-15, heading)
    for row, values in enumerate(rows):
        for col, value in enumerate(values):
            C.setFont('CompanionBold' if col==1 and not blank else 'CompanionSans', 13)
            C.drawCentredString(x+cw*(col+.5), top-hh-row*rh-18, value)

# PAGE 1 - all three lines stay blank so this page can be reused.
header('Same number. New scale.', 1)
text(LEFT, 675, 'Keep the number 0.008. Predict its position on each line.', 12, 'Helvetica-Bold')
text(LEFT, 656, 'Each line has 10 equal spaces. Label one jump before placing the point.', 11)
scale_box(1, '0.01', 512, 'Mark 0.008 exactly. How many jumps from 0? ________________________')
scale_box(2, '0.1', 375, 'About where is 0.008? It lies between the marks ________ and ________.')
scale_box(3, '1', 238, 'About where is 0.008? It lies between the marks ________ and ________.')
panel(LEFT, 66, RIGHT-LEFT, 158)
text(57, 201, 'Explain what changed', 14, 'Helvetica-Bold')
text(57, 180, 'The number stayed 0.008. Why did its position change?', 11)
text(57, 162, 'Use an endpoint or the value of one jump in your explanation.', 10)
response_lines(139, count=3, step=25)
text(57, 75, 'Partner check: Are the spaces equal? Can you read each scale?', 9, color=GRAY)
C.showPage()

# PAGE 2 - worked example is distinct from both practice questions.
header('Read big numbers by place.', 2)
panel(LEFT, 471, RIGHT-LEFT, 215, fill=True)
text(57, 665, 'SEE AN EXAMPLE', 9, 'Helvetica-Bold', GRAY)
text(57, 646, 'Which is greater: 2,306,000,000 or 2,360,000,000?', 12, 'Helvetica-Bold')
text(57, 627, 'Read each group of three digits with its period name.', 10)
period_chart(57, 615, 498, [['2','306','000','000'], ['2','360','000','000']])
text(57, 521, 'Both have 2 billions and 3 hundred-millions.', 11)
text(57, 504, 'Compare the next place: 0 ten-millions is less than 6 ten-millions.', 11)
text(57, 486, 'So 2,360,000,000 > 2,306,000,000.', 12, 'Helvetica-Bold')

text(LEFT, 448, 'TRY TOGETHER', 9, 'Helvetica-Bold', GRAY)
text(LEFT, 428, 'Compare 3,405,000,000 and 3,450,000,000.', 12, 'Helvetica-Bold')
text(LEFT, 410, 'Write each number in the chart. Read it aloud to your partner.', 11)
period_chart(LEFT, 396, RIGHT-LEFT, [['','','',''], ['','','','']], blank=True)
text(LEFT, 299, 'Which is greater? Name the first place with different digits.', 11)
response_lines(278, count=2, step=23, x=LEFT, right=RIGHT)

text(LEFT, 227, 'TRY ON YOUR OWN', 9, 'Helvetica-Bold', GRAY)
text(LEFT, 207, 'Compare 807,090,000 and 870,009,000.', 12, 'Helvetica-Bold')
text(LEFT, 189, 'Which is greater? Explain using the first place that decides.', 11)
response_lines(166, count=4, step=25, x=LEFT, right=RIGHT)
text(LEFT, 63, 'Check your reasoning: Compare from the greatest place first.', 9, color=GRAY)
C.showPage()
C.save()
print(OUT.resolve())
