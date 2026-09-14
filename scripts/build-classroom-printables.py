"""Regenerate the Werewolf pack and responsibility posters with ReportLab.

Run with a Python environment containing reportlab, from any working directory.
Content is read from the same TypeScript data used by the lesson screens.
"""
import json
from pathlib import Path
import subprocess
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.enums import TA_CENTER

ROOT = Path(__file__).resolve().parent.parent
data = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', """
import {moduleLoader} from './tests/helpers/load-rendered-module.mjs';
const load = moduleLoader(process.cwd());
const {werewolfLessons,werewolfRules,narratorScript} = load('app/werewolf-lessons.ts');
const {responsibilityPosters} = load('app/classroom-responsibilities.ts');
process.stdout.write(JSON.stringify({werewolfLessons,werewolfRules,narratorScript,responsibilityPosters}));
"""], cwd=ROOT))
OUT = ROOT / 'public' / 'printables'
OUT.mkdir(exist_ok=True)
for name, file in [('ClassroomSans','DejaVuSans.ttf'), ('ClassroomSans-Bold','DejaVuSans-Bold.ttf')]:
    pdfmetrics.registerFont(TTFont(name, '/usr/share/fonts/truetype/dejavu/'+file))
pdfmetrics.registerFontFamily('ClassroomSans', normal='ClassroomSans', bold='ClassroomSans-Bold', italic='ClassroomSans', boldItalic='ClassroomSans-Bold')
styles = getSampleStyleSheet()
for name in styles.byName:
    styles[name].fontName = 'ClassroomSans-Bold' if name.startswith('Heading') else 'ClassroomSans'
styles.add(ParagraphStyle(name='BodyCustom', fontName='ClassroomSans', fontSize=11, leading=15, spaceAfter=7))
styles.add(ParagraphStyle(name='ModelCustom', parent=styles['BodyCustom'], leftIndent=12, borderPadding=7, backColor=colors.HexColor('#f2f2f2'), spaceBefore=5, spaceAfter=10))
styles.add(ParagraphStyle(name='CardCustom', fontName='ClassroomSans', fontSize=10, leading=14, alignment=TA_CENTER))
def p(text, style='BodyCustom'):
    return Paragraph(escape(text).replace('\n', '<br/>'), styles[style])
def heading(text):
    return p(text, 'Heading1')
def linebox(label, height=50):
    return [p(label, 'Heading3'), Spacer(1, height)]
def footer(c, doc):
    c.setFont('ClassroomSans', 8)
    c.drawString(42, 26, 'Werewolf | Oral storytelling | Grade 6')
    c.drawRightString(570, 26, str(doc.page))

# Predictable pages: rules (2), script, private record, cues, feedback, cards,
# then one page per lesson. Teacher answers remain on the lesson screen.
story=[]
for half in range(2):
    story += [heading('Werewolf: classroom starter rules' if half == 0 else 'Werewolf: discussion and endings')]
    if half == 0:
        story += [p('Nine players plus a neutral narrator. Use six Villagers, two Werewolves and one Seer. This is our classroom starter variant.'), p('Read both rules pages and the narrator script before playing.')]
    for rule in data['werewolfRules'][half*3:half*3+3]:
        story += [p(rule['title'], 'Heading2'), p(rule['text'])]
    story += [PageBreak()]
story += [heading('Narrator script'), p('Use clear everyday speech for directions. Add brief atmosphere between actions; never invent evidence about a player.')]
for step in data['narratorScript']:
    story += [p(step['title'], 'Heading2'), p(step['text'])]
story += [PageBreak(), heading('Private narrator record'), p('Keep this page off the projector and hidden from players. Check each card privately before starting. Mark removals and check the win conditions after each one.')]
table = Table([['Player number', 'Secret role', 'Active / story tracker']] + [[str(i), '', ''] for i in range(1,13)], colWidths=[95,210,200], rowHeights=[30]+[35]*12)
table.setStyle(TableStyle([('GRID',(0,0),(-1,-1),.6,colors.grey),('BACKGROUND',(0,0),(-1,0),colors.HexColor('#eeeeee')),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('FONTNAME',(0,0),(-1,0),'ClassroomSans-Bold')]))
story += [table, Spacer(1,18), p('Village wins: no wolves remain. Wolves win: active wolves equal or outnumber all other active players combined. At the agreed limit, finish the action, check for a winner and otherwise end without a winner.'), PageBreak()]
story += [heading('Storyteller cue planner'), p('Name: __________________________  Date: __________________'), p('Choose a forest, mountain or island village. Plan an original story opening. Use cue words to remember your ideas.')]
for label in ['Setting: where are we? Add one sound or movement.', 'Change: what interrupts the ordinary moment?', 'Question: what will the listener want to know?', 'Three to five cue words to guide your telling.', 'Voice: mark a pause, a pace change or a word to emphasize.']:
    story += linebox(label, 35)
story += [p('Narrator rehearsal: add cues for night, morning and two endings (a team wins / time runs out). Keep the exact narrator script beside you.'), Spacer(1,35), PageBreak()]
story += [heading('Listen, retell and revise'), p('Name: __________________________  Date: __________________'), p('Tell your partner a short scene or retell public game events. Listen to their feedback, change one part and tell it again.')]
for label in ['My speaking goal:', 'Story order: first ... then ... finally ...', 'One clear moment I heard:', 'One question I asked my partner:', 'Feedback I received:', 'The part I changed and how it helped:']:
    story += linebox(label, 38)
story += [PageBreak(), heading('Plain role cards'), p('Cut equal rectangles. Use opaque paper or identical sleeves. For 8-12 players, use two Werewolves, one Seer and enough Villagers for the remaining players, plus a narrator. Remove unused cards before shuffling.')]
cards=[]
for role in ['Werewolf','Werewolf','Seer']+['Villager']*9:
    text = {'Werewolf':'At night, choose one active non-wolf player with your pack.', 'Seer':'At night, ask about one other active player. You are on the village team.', 'Villager':'Listen. Discuss. Vote. Find the werewolves.'}[role]
    cards.append([p(role.upper(), 'Heading3'), p(text,'CardCustom')])
table=Table([cards[i:i+3] for i in range(0,12,3)], colWidths=[168]*3, rowHeights=[125]*4)
table.setStyle(TableStyle([('GRID',(0,0),(-1,-1),.7,colors.grey),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('LEFTPADDING',(0,0),(-1,-1),12),('RIGHTPADDING',(0,0),(-1,-1),12)]))
story += [table]
for lesson in data['werewolfLessons']:
    story += [PageBreak(), heading(lesson['title']), p(lesson['focus']), p('Finish with: '+lesson['product'])]
    for step in lesson['steps']:
        story += [p(step['title']+' | '+step['minutes'], 'Heading2'), p(step['action'])]
        if step.get('model'): story += [p('Model: '+step['model'], 'ModelCustom')]
        story += [p('Check: '+step['check'])]
    story += [p('Think and explain', 'Heading2'), p(lesson['question'])]
SimpleDocTemplate(str(ROOT/'public/werewolf/classroom-pack.pdf'), pagesize=(612,792), rightMargin=42, leftMargin=42, topMargin=36, bottomMargin=42, title='Werewolf classroom pack', author='Mr. Wyatt’s Classroom').build(story, onFirstPage=footer, onLaterPages=footer)

# Letter-sized posters: high contrast type, generous row spacing, ink-light.
for poster in data['responsibilityPosters']:
    dest=OUT/(poster['id']+'-responsibilities.pdf')
    c=canvas.Canvas(str(dest), pagesize=(612,792))
    c.setTitle(poster['title'])
    dark=colors.HexColor('#183c31') if poster['id']=='team-captains' else colors.HexColor('#163d58')
    c.setStrokeColor(dark); c.setLineWidth(2); c.roundRect(24,24,564,744,14)
    c.setFillColor(dark); c.roundRect(24,648,564,120,14,fill=1,stroke=0)
    title=Paragraph(poster['title'],ParagraphStyle(name='PosterTitle',fontName='ClassroomSans-Bold',fontSize=28,leading=32,textColor=colors.white))
    _,h=title.wrap(508,100); title.drawOn(c,52,740-h)
    sub=Paragraph(poster['subtitle'],ParagraphStyle(name='PosterSubtitle',fontName='ClassroomSans',fontSize=12,leading=16,textColor=colors.white))
    _,h=sub.wrap(505,40); sub.drawOn(c,52,674-h)
    rowh=90 if len(poster['items'])==6 else 133
    y=630
    for i,(label,text) in enumerate(poster['items']):
        c.setFillColor(dark); c.circle(53,y-17,12,fill=1,stroke=0)
        c.setFillColor(colors.white); c.setFont('ClassroomSans-Bold',12);c.drawCentredString(53,y-21,str(i+1))
        st=ParagraphStyle(name='PosterItem',fontName='ClassroomSans-Bold',fontSize=16,leading=19,textColor=dark)
        title=Paragraph(escape(label),st)
        _,h=title.wrap(470,60);title.drawOn(c,77,y-6-h)
        body=Paragraph(escape(text),ParagraphStyle(name='PosterBody',fontName='ClassroomSans',fontSize=12.5 if rowh==90 else 16,leading=16 if rowh==90 else 21,textColor=colors.HexColor('#202b28')))
        _,bh=body.wrap(470,100);body.drawOn(c,77,y-11-h-bh)
        assert h+bh+11<rowh, (label,h,bh,rowh)
        y-=rowh
    c.setFillColor(dark);c.setFont('ClassroomSans-Bold',10)
    c.drawCentredString(306,51,poster['footer'])
    c.save()
print('Generated classroom pack and two responsibility posters.')
