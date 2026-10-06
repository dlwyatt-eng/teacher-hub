#!/usr/bin/env python3
"""Build three student PDF/HTML companions and a separate teacher PDF.

Offline generator. Source JSON remains canonical; student HTML never embeds it
or any teacher fields/answer keys. Requires ReportLab, fontTools and pypdf.
Usage: python scripts/build-access-companions.py --out ../output/access
"""
from __future__ import annotations

import argparse
import html
import json
import math
import re
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools.ttLib import TTFont as InspectFont
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Flowable, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

REPO = Path(__file__).resolve().parents[1]
DEFAULT_OUT = REPO.parent / 'output' / 'access'
FONT_ROOT = REPO / 'assets/fonts/nanum-gothic'
W, H, M = 612, 792, 42
WIDTH = W - 2*M
INK, GRAY, RULE = colors.HexColor('#202020'), colors.HexColor('#555555'), colors.HexColor('#a5a5a5')
HANGUL = re.compile(r'[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]')
PACKS = [
    ('maths-access-companions', 'Maths_Visual_Companions', 'Maths visual companions'),
    ('phe-access-companions', 'PHE_Visual_Companions', 'PHE visual companions'),
    ('korean-access-companions', 'English_Korean_Speaking_Companions', 'English-Korean speaking companions'),
]


def clean(value):
    return str(value).replace('\u2011','-').replace('\u2013','-').replace('\u2014',' - ').replace('\u00a0',' ')


def setup_fonts(data):
    d = Path('/usr/share/fonts/truetype/dejavu')
    pdfmetrics.registerFont(TTFont('Access', str(d/'DejaVuSans.ttf')))
    pdfmetrics.registerFont(TTFont('Access-Bold', str(d/'DejaVuSans-Bold.ttf')))
    pdfmetrics.registerFont(TTFont('Korean', str(FONT_ROOT/'NanumGothic-Regular.ttf')))
    pdfmetrics.registerFontFamily('Access', normal='Access', bold='Access-Bold', italic='Access', boldItalic='Access-Bold')
    font = InspectFont(FONT_ROOT/'NanumGothic-Regular.ttf')
    cmap = font.getBestCmap()
    text = json.dumps(data, ensure_ascii=False)
    missing = sorted({ch for ch in text if HANGUL.match(ch) and ord(ch) not in cmap})
    if missing:
        raise ValueError('Korean font lacks glyphs: '+''.join(missing))


def markup(text):
    lines = []
    for line in clean(text).split('\n'):
        value = escape(line)
        lines.append(f'<font name="Korean">{value}</font>' if HANGUL.search(line) else value)
    return '<br/>'.join(lines)


def p(text, size=12, bold=False, before=0, after=5, keep=False):
    style = ParagraphStyle('p', fontName='Access-Bold' if bold else 'Access', fontSize=size,
                           leading=size*(1.28 if HANGUL.search(str(text)) else 1.32), spaceBefore=before, spaceAfter=after,
                           textColor=INK, keepWithNext=keep, allowWidows=0, allowOrphans=0,
                           splitLongWords=True)
    return Paragraph(markup(text), style)


def h(text, size=14):
    return p(text, size=size, bold=True, before=6, after=5, keep=True)


def label(name, value, size=10.4):
    return p(f'{name} {value}', size=size, after=6)


class Lines(Flowable):
    def __init__(self, count=2, gap=24):
        super().__init__();self.count=count;self.gap=gap;self.width=WIDTH;self.height=count*gap+6
    def draw(self):
        self.canv.setLineWidth(.5);self.canv.setStrokeColor(RULE)
        for i in range(self.count):
            y=self.height-(i+1)*self.gap;self.canv.line(0,y,WIDTH,y)


class Mark(Flowable):
    def __init__(self, kind, id):
        super().__init__();self.kind=kind;self.id=id;self.width=0;self.height=0
    def draw(self):
        pass


class PackDoc(SimpleDocTemplate):
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs);self.page_map={};self.active_section=None
    def afterFlowable(self, flowable):
        if isinstance(flowable, Mark):
            self.active_section=flowable.id
            self.page_map.setdefault(flowable.id,{})['start']=self.page
        elif self.active_section and isinstance(flowable,(Paragraph,Table,Visual,Lines)):
            self.page_map[self.active_section]['end']=self.page


def draw_text(c,text,x,y,width,size=12,bold=False):
    q=p(text,size=size,bold=bold,after=0)
    _,hh=q.wrap(width,1000);q.drawOn(c,x,y-hh);return hh


class Visual(Flowable):
    def __init__(self,spec):
        super().__init__();self.spec=spec;self.width=WIDTH
        typ=spec['type']
        if typ=='place_value':self.height=(len(spec['rows'])+1)*26+10
        elif typ=='hundred_grid':self.height=184
        elif typ=='dot_compare':self.height=42+math.ceil(max(spec['left'],spec['right'])/5)*20
        elif typ=='tens_ones':self.height=142
        elif typ=='ten_frame':self.height=123 if spec.get('added') or spec.get('removed') else 104
        elif typ=='sequence':self.height=63
        else:raise ValueError('Unsupported visual type: '+typ)
    def draw(self):
        c=self.canv;s=self.spec;typ=s['type'];c.setStrokeColor(INK);c.setFillColor(INK);c.setLineWidth(.65)
        if typ=='place_value':
            rows=[s['columns']]+s['rows'];cw=WIDTH/len(s['columns']);rh=26
            for r,row in enumerate(rows):
                for col,value in enumerate(row):
                    x=col*cw;y=self.height-8-r*rh
                    c.rect(x,y-rh,cw,rh,fill=0,stroke=1)
                    c.setFont('Access-Bold' if r==0 else 'Access',12)
                    c.drawCentredString(x+cw/2,y-18,clean(value))
        elif typ=='hundred_grid':
            values=s['values'];n=len(values);gw=min(150,(WIDTH-30*(n-1))/n);cell=gw/10
            for k,value in enumerate(values):
                x=k*(WIDTH/n)+((WIDTH/n)-gw)/2;top=self.height-30
                c.setFillColor(INK);c.setFont('Access-Bold',12);c.drawCentredString(x+gw/2,self.height-15,clean(s['labels'][k]))
                for i in range(100):
                    xx=x+(i%10)*cell;yy=top-(i//10+1)*cell
                    c.setFillColor(colors.HexColor('#999999') if i<value else colors.white)
                    c.rect(xx,yy,cell,cell,fill=1,stroke=1)
            c.setFillColor(INK)
        elif typ=='dot_compare':
            for k,(name,count) in enumerate([('Left',s['left']),('Right',s['right'])]):
                x=k*WIDTH/2+WIDTH/4;c.setFont('Access-Bold',12);c.drawCentredString(x,self.height-17,name)
                for i in range(count):
                    xx=x-40+(i%5)*20;yy=self.height-43-(i//5)*20
                    c.circle(xx,yy,5,fill=1,stroke=0)
        elif typ=='tens_ones':
            values=s['values'];n=len(values)
            for k,value in enumerate(values):
                base=k*WIDTH/n+15;top=self.height-29;tens,ones=divmod(value,10)
                c.setFont('Access-Bold',11.5);c.drawString(base,self.height-14,'Tens');c.drawString(base+90,self.height-14,'Ones')
                for rod in range(tens):
                    for unit in range(10):c.rect(base+rod*18,top-(unit+1)*9,9,9,fill=0,stroke=1)
                for unit in range(ones):c.rect(base+90+(unit%3)*19,top-9-(unit//3)*19,9,9,fill=0,stroke=1)
        elif typ=='ten_frame':
            values=s['values'];n=len(values);cell=min(28,(WIDTH/n-24)/5)
            for k,value in enumerate(values):
                base=k*WIDTH/n+(WIDTH/n-cell*5)/2;top=self.height-32
                c.setFont('Access-Bold',11.5);c.drawCentredString(base+2.5*cell,self.height-15,['First','Second','Third'][k] if k<3 else 'Frame')
                for i in range(10):
                    x=base+(i%5)*cell;y=top-(i//5+1)*cell;c.rect(x,y,cell,cell,fill=0,stroke=1)
                    added=s.get('added',[0]*n)[k];removed=s.get('removed',[0]*n)[k]
                    if i<value:c.circle(x+cell/2,y+cell/2,cell*.22,fill=1,stroke=0)
                    elif i<value+added:c.circle(x+cell/2,y+cell/2,cell*.22,fill=0,stroke=1)
                    if removed and value-removed<=i<value:
                        c.setStrokeColor(colors.white);c.setLineWidth(1.3);c.line(x+cell*.35,y+cell*.35,x+cell*.65,y+cell*.65);c.line(x+cell*.35,y+cell*.65,x+cell*.65,y+cell*.35);c.setStrokeColor(INK);c.setLineWidth(.65)
            if s.get('added') or s.get('removed'):
                c.setFont('Access',9.4);c.drawString(0,8,'Solid dots: start. Outline dots: added. Crossed dots: taken away.')
        elif typ=='sequence':
            labels=s['labels'];n=len(labels);gap=20;cw=(WIDTH-gap*(n-1))/n
            for k,name in enumerate(labels):
                x=k*(cw+gap);c.rect(x,8,cw,48,fill=0,stroke=1)
                draw_text(c,name,x+9,50,cw-18,size=12,bold=True)
                if k<n-1:
                    mid=x+cw+gap/2;c.line(mid-5,36,mid+5,36);c.line(mid+1,40,mid+5,36);c.line(mid+1,32,mid+5,36)


def choices_pdf(choices):
    if not choices:return []
    longest=max(len(x) for x in choices)
    n=3 if longest<20 else 2 if longest<48 else 1
    cells=[p('□ '+choice,size=12,after=0) for choice in choices]
    rows=[cells[i:i+n]+['']*(n-len(cells[i:i+n])) for i in range(0,len(cells),n)]
    table=Table(rows,colWidths=[WIDTH/n]*n)
    table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),4),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),4)]))
    return [table,Spacer(1,3)]


def frames_pdf(items):
    if not items:return []
    frames=[h('Words you can use',size=12)]
    if any(HANGUL.search(f) for f in items):
        return frames+[p(f,size=12,after=3) for f in items]
    cues=[f for f in items if f.startswith(('Pause,','Help,','Stop:'))]
    main=[f for f in items if f not in cues]
    rows=[]
    for i in range(0,len(main),2):rows.append([p(x,size=12,after=1) for x in main[i:i+2]]+['']*(2-len(main[i:i+2])))
    if cues:rows.append([p('  |  '.join(cues),size=12,after=1),''])
    table=Table(rows,colWidths=[WIDTH/2]*2)
    styles=[('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),10)]
    if cues:styles.append(('SPAN',(0,len(rows)-1),(1,len(rows)-1)))
    table.setStyle(TableStyle(styles));frames.append(table)
    return frames


def student_story(data):
    story=[]
    for index,page in enumerate(data['pages']):
        if index:story.append(PageBreak())
        story += [Mark('start',page['id']),p(page.get('tag','Activity companion'),size=8.5,bold=True,after=6),
                  p(page['title'],size=18,bold=True,after=7),p(page['goal'],size=12,after=7),p(page['start'],size=12,after=8)]
        model=[h('Look at the example',size=13),p(page['model']['text'],size=12)]
        if page['model'].get('visual'):model.append(Visual(page['model']['visual']))
        story += [KeepTogether(model)]
        for j,task in enumerate(page['tasks'],1):
            chunk=[p(f'{j}. {task["prompt"]}',size=12,bold=True,before=7,after=4)]
            if task.get('visual'):chunk.append(Visual(task['visual']))
            chunk += choices_pdf(task.get('choices',[]))
            line_count=task.get('responseLines',2)
            if data['id'].startswith('phe') and task.get('choices'):line_count=min(line_count,1)
            if HANGUL.search(task['prompt']):line_count=min(line_count,2)
            if line_count>0:chunk.append(Lines(line_count))
            if j==len(page['tasks']):chunk+=frames_pdf(page.get('frames',[]))
            story.append(KeepTogether(chunk))
    return story


def write_pdf(path,story,title):
    def footer(c,doc):
        c.saveState();c.setTitle(title);c.setAuthor('Classroom teaching resources')
        c.setFont('Access',7.7);c.setFillColor(GRAY);c.drawString(M,23,title);c.drawRightString(W-M,23,str(doc.page))
        c.setStrokeColor(RULE);c.setLineWidth(.5);c.line(M,35,W-M,35);c.restoreState()
    doc=PackDoc(str(path),pagesize=(W,H),leftMargin=M,rightMargin=M,topMargin=39,bottomMargin=48,title=title,author='Classroom teaching resources')
    doc.build(story,onFirstPage=footer,onLaterPages=footer)
    return doc.page_map


def txt_html(value):
    lines=[]
    for line in clean(value).split('\n'):
        lines.append(f'<span lang="ko">{html.escape(line)}</span>' if HANGUL.search(line) else f'<span lang="en">{html.escape(line)}</span>')
    return '<br>'.join(lines)


def visual_html(s):
    typ=s['type']
    if typ=='place_value':
        header=''.join('<th scope="col">'+html.escape(str(v))+'</th>' for v in s['columns'])
        rows=''.join('<tr>'+''.join('<td>'+html.escape(str(v))+'</td>' for v in row)+'</tr>' for row in s['rows'])
        return f'<div class="chart"><table><thead><tr>{header}</tr></thead><tbody>{rows}</tbody></table></div>'
    if typ=='sequence':
        return '<ol class="sequence">'+''.join('<li>'+txt_html(v)+'</li>' for v in s['labels'])+'</ol>'
    parts=[];height=190;desc='Use the diagram with the written prompt. Ask for physical counters or an accessible representation if useful.'
    if typ=='hundred_grid':
        n=len(s['values']);cw=150;cell=15
        for k,value in enumerate(s['values']):
            x=k*528/n+(528/n-cw)/2
            parts.append(f'<text x="{x+75}" y="20" text-anchor="middle">{html.escape(s["labels"][k])}</text>')
            for i in range(100):parts.append(f'<rect x="{x+(i%10)*cell}" y="{30+(i//10)*cell}" width="15" height="15" fill="{"#999" if i<value else "white"}"/>')
        desc='Equal-sized ten-by-ten grids. The printed labels identify each shown decimal.'
    elif typ=='dot_compare':
        height=65+math.ceil(max(s['left'],s['right'])/5)*20
        for k,(name,count) in enumerate([('Left',s['left']),('Right',s['right'])]):
            x=k*264+132;parts.append(f'<text x="{x}" y="20" text-anchor="middle">{name}</text>')
            for i in range(count):parts.append(f'<circle cx="{x-40+(i%5)*20}" cy="{47+(i//5)*20}" r="5" fill="#222"/>')
        desc='Two groups of dots labelled Left and Right. Count each group yourself; tactile counters can show the same groups.'
    elif typ=='tens_ones':
        height=144;n=len(s['values'])
        for k,value in enumerate(s['values']):
            x=k*528/n+15;tens,ones=divmod(value,10)
            parts += [f'<text x="{x}" y="20">Tens</text>',f'<text x="{x+90}" y="20">Ones</text>']
            for rod in range(tens):
                for unit in range(10):parts.append(f'<rect x="{x+rod*18}" y="{32+unit*9}" width="9" height="9" fill="white"/>')
            for unit in range(ones):parts.append(f'<rect x="{x+90+(unit%3)*19}" y="{32+(unit//3)*19}" width="9" height="9" fill="white"/>')
        desc='Tens rods divided into ten equal units, beside individual ones. Count the represented amount yourself.'
    elif typ=='ten_frame':
        height=133 if s.get('added') or s.get('removed') else 115;n=len(s['values']);cell=28
        for k,value in enumerate(s['values']):
            x=k*528/n+(528/n-cell*5)/2
            parts.append(f'<text x="{x+70}" y="20" text-anchor="middle">{["First","Second","Third"][k] if k<3 else "Frame"}</text>')
            for i in range(10):
                xx=x+(i%5)*cell;yy=33+(i//5)*cell;parts.append(f'<rect x="{xx}" y="{yy}" width="28" height="28" fill="white"/>')
                added=s.get('added',[0]*n)[k];removed=s.get('removed',[0]*n)[k]
                if i<value:parts.append(f'<circle cx="{xx+14}" cy="{yy+14}" r="6" fill="#222"/>')
                elif i<value+added:parts.append(f'<circle cx="{xx+14}" cy="{yy+14}" r="6" fill="white"/>')
                if removed and value-removed<=i<value:parts.append(f'<path d="M{xx+10},{yy+10} L{xx+18},{yy+18} M{xx+10},{yy+18} L{xx+18},{yy+10}" stroke="white" stroke-width="1.5"/>')
        if s.get('added') or s.get('removed'):parts.append('<text x="0" y="126" font-size="12">Solid: start. Outline: added. Crossed: taken away.</text>')
        desc='Ten-frames with dots in some spaces. Each frame has two rows of five; count the dots yourself.'
    else:raise ValueError(typ)
    return f'<figure><svg viewBox="0 0 528 {height}" role="img" aria-label="{html.escape(desc,quote=True)}" xmlns="http://www.w3.org/2000/svg" style="stroke:#222;stroke-width:.7;font:15px Arial,sans-serif">'+''.join(parts)+'</svg><figcaption>'+html.escape(desc)+'</figcaption></figure>'


HTML_CSS='''body{font:18px/1.5 system-ui,-apple-system,"Noto Sans KR","Malgun Gothic","Apple SD Gothic Neo",sans-serif;color:#222;max-width:850px;margin:auto;padding:22px}h1{font-size:1.8rem}h2{font-size:1.45rem}h3{font-size:1.05rem}article{border-top:2px solid #888;margin:34px 0;padding-top:18px}p{margin:.6em 0}.tag{font-size:.8rem;color:#555}.model{border:1px solid #aaa;padding:14px;margin:18px 0}.task{margin:24px 0;break-inside:avoid}.response{border-bottom:1px solid #aaa;height:1.7em}.choices{padding-left:1.25em}.choices li{margin:6px 0}.sequence{display:flex;gap:12px;padding:0;list-style:none}.sequence li{border:1px solid #888;flex:1;padding:12px}.chart{overflow-x:auto}table{width:100%;border-collapse:collapse}th,td{border:1px solid #999;padding:9px;text-align:center}svg{display:block;width:100%;max-height:230px}figure{margin:14px 0}figcaption{font-size:.85rem;color:#555}.frames{border-left:3px solid #888;padding-left:14px}nav ul{padding-left:22px}a{color:#17472e}@media print{body{font-size:12pt;padding:0;max-width:none}nav,.screen-only{display:none}article{break-before:page;border:0;margin:0;padding:0}.response{height:1.6em}a{color:#222;text-decoration:none}figure, .model{break-inside:avoid}figcaption{font-size:10pt}}'''


def write_html(path,data):
    body=[f'<h1>{txt_html(data["title"])}</h1>',f'<p>{txt_html(data["subtitle"])}</p>',
          '<p class="screen-only">Read, point, speak, draw or write. Your teacher can choose a page and provide physical materials where useful.</p>',
          '<nav aria-label="Activities"><ul>']
    for page in data['pages']:body.append(f'<li><a href="#{html.escape(page["id"],quote=True)}">{txt_html(page["title"])}</a></li>')
    body.append('</ul></nav>')
    for page in data['pages']:
        body += [f'<article id="{html.escape(page["id"],quote=True)}"><p class="tag">{txt_html(page.get("tag",""))}</p><h2>{txt_html(page["title"])}</h2>',
                 f'<p>{txt_html(page["goal"])}</p><p>{txt_html(page["start"])}</p>',
                 f'<section class="model" aria-label="Worked example"><h3>Look at the example</h3><p>{txt_html(page["model"]["text"])}</p>']
        if page['model'].get('visual'):body.append(visual_html(page['model']['visual']))
        body.append('</section>')
        for j,task in enumerate(page['tasks'],1):
            body.append(f'<section class="task"><h3>{j}. {txt_html(task["prompt"])}</h3>')
            if task.get('visual'):body.append(visual_html(task['visual']))
            if task.get('choices'):body.append('<ul class="choices">'+''.join('<li>'+txt_html(c)+'</li>' for c in task['choices'])+'</ul>')
            body.append('<div aria-hidden="true">'+'<div class="response"></div>'*task.get('responseLines',2)+'</div></section>')
        if page.get('frames'):body.append('<section class="frames"><h3>Words you can use</h3>'+''.join('<p>'+txt_html(f)+'</p>' for f in page['frames'])+'</section>')
        body.append('</article>')
    path.write_text('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(clean(data['title']))+'</title><style>'+HTML_CSS+'</style></head><body>'+''.join(body)+'</body></html>',encoding='utf-8')


def page_range(info):
    return str(info['start']) if info['start']==info['end'] else f"{info['start']}-{info['end']}"


def teacher_story(packs,maps):
    story=[p('Teacher guide',size=9,bold=True),p('Access companions: choose the support',size=22,bold=True),
           p('Use with the existing maths readiness routes and six-week PHE sequence. Select a small number of pages for the current lesson; completion of the whole pack is not expected.',size=11),
           h('What these companions add'),
           p('These pages reuse earlier bilingual speaking supports and foundational number practice in new lesson contexts. They provide complete examples, simpler directions, visual representations and oral or pointing routes. Earlier resources remain useful; these companions do not replace them.',size=10.5),
           h('Choose language support and maths support separately'),
           p('A learner who is new to English may understand the full maths idea. Offer translated directions, unit words, pointing, drawing or an oral response before inferring a number difficulty. Choose foundational quantity/counting/tens-and-ones pages only when that is the useful mathematical goal.',size=10.5),
           p('Foundational pages have different goals from Grade 6 decimal comparison. Showing more/fewer, counting a set or representing two-digit numbers does not demonstrate equivalent Grade 6 content mastery. Keep each learner in the shared block with a meaningful, appropriate goal.',size=10.5),
           h('Keep access support distinct from giving an answer'),
           p('Read or translate the direction, clarify vocabulary, enlarge a diagram or supply tactile objects. During an independent check, avoid naming the deciding place, counting the group for the learner or supplying the comparison sign. Record the kind of help that made participation possible; these pages create no formal scores or reporting checklist.',size=10.5),
           p('The dot and ten-frame diagrams intentionally do not name the counts in their accessible labels. For a learner who cannot access the visual, provide the same arrangement using tactile counters or another suitable representation that they can inspect and count independently.',size=10.5),
           h('PHE and speaking participation'),
           p('Use fictional cases, offer a private response or a pass on public sharing, and confirm actual school help routes. The PHE cards support choices and explanations; they do not replace physical practice or supervision. Offer purposeful movement separately where a task asks for movement evidence. Practise Korean-English frames as flexible invitations, not required scripts or tests of accent.',size=10.5),
           PageBreak(),p('Print-page map',size=20,bold=True),p('Numbers below refer to the PDF printed page numbers. The HTML companions present the same student inputs as readable text. Teacher keys are kept in this guide.',size=10.5)]
    for stem,filename,label_text in PACKS:
        data=packs[stem];story.append(h(label_text))
        for page in data['pages']:
            title=page['title'].split('\n')[0]
            story.append(p(f"Pages {page_range(maps[stem][page['id']])}: {title}",size=10.4,after=5))
    for pack_index,(stem,filename,label_text) in enumerate(PACKS):
        story += [PageBreak() if pack_index==0 else Spacer(1,12),p(label_text+' | teacher guidance and keys',size=18,bold=True,keep=True)]
        for page in packs[stem]['pages']:
            title=page['title'].split('\n')[0];t=page['teacher']
            entry=[h(f"{title} | student pages {page_range(maps[stem][page['id']])}",size=12),
                   label('Use when:',t['when']),label('Learning goal / connection:',t['alignment']),label('Look for:',t['lookFor'])]
            for note in t.get('notes',[]):entry.append(p(note,size=10.3,after=5))
            entry.append(h('Task responses / possible explanations',size=10.5))
            for j,task in enumerate(page['tasks'],1):entry.append(p(f"{j}. {task['answer']}",size=10.4,after=6))
            story += entry
    story += [Spacer(1,12),p('Sources, reuse and font credit',size=20,bold=True,keep=True),
              p('The canonical new PHE and maths sequences supply the original fictional scenarios, number tasks and models. Existing bilingual speaking and foundational practice informed the support format. No student records or identifiable source documents are reproduced.',size=10.5)]
    urls={'https://curriculum.gov.bc.ca/curriculum/mathematics/6/core','https://curriculum.gov.bc.ca/curriculum/physical-health-education/6/core'}
    for data in packs.values():
        for page in data['pages']:
            for note in page['teacher'].get('notes',[]):urls.update(re.findall(r'https?://[^\s<>]+',note))
    for url in sorted(urls):story.append(p(url.rstrip('.,;)'),size=9.2,after=10))
    story += [h('Embedded Korean type'),p('Nanum Gothic Regular, copyright 2010 NHN Corporation. Licensed under the SIL Open Font License 1.1. The unchanged original TTF and license are retained with the generator; the PDF embeds the glyphs it uses. HTML uses available system fonts.',size=10.5),
              p('https://github.com/google/fonts/tree/main/ofl/nanumgothic',size=9.2)]
    return story


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--out',type=Path,default=DEFAULT_OUT);args=parser.parse_args()
    packs={stem:json.loads((REPO/'content'/f'{stem}.json').read_text()) for stem,_,_ in PACKS}
    setup_fonts(packs);args.out.mkdir(parents=True,exist_ok=True);maps={}
    for stem,filename,label_text in PACKS:
        maps[stem]=write_pdf(args.out/f'{filename}.pdf',student_story(packs[stem]),label_text)
        write_html(args.out/f'{filename}.html',packs[stem])
    write_pdf(args.out/'Access_Companions_Teacher_Guide.pdf',teacher_story(packs,maps),'Access companions | Teacher guide')
    print(json.dumps(maps,ensure_ascii=False,indent=2))
    print('Built four PDFs and three student HTML companions in',args.out)


if __name__=='__main__':main()
