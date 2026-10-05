#!/usr/bin/env python3
"""Create four low-ink PHE and maths packs from their canonical JSON.

The script is offline: it reads content only and never downloads sources.
Usage: python scripts/build-phe-maths-packs.py --out ../output/pdf
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    Flowable, PageBreak, Paragraph, SimpleDocTemplate,
    Spacer, Table, TableStyle,
)

REPO = Path(__file__).resolve().parents[1]
OUT = REPO.parent / "output" / "pdf"
W, H = 612, 792
M = 43
WIDTH = W - 2 * M
INK = colors.HexColor("#202020")
GRAY = colors.HexColor("#595959")
RULE = colors.HexColor("#b8b8b8")
PALE = colors.HexColor("#f5f5f5")


def clean(value):
    return (str(value).replace("\u2011", "-").replace("\u2013", "-")
            .replace("\u2014", " - ").replace("\u00a0", " "))


def fonts():
    root = Path("/usr/share/fonts/truetype/dejavu")
    pdfmetrics.registerFont(TTFont("Pack", str(root / "DejaVuSans.ttf")))
    pdfmetrics.registerFont(TTFont("Pack-Bold", str(root / "DejaVuSans-Bold.ttf")))
    pdfmetrics.registerFontFamily("Pack", normal="Pack", bold="Pack-Bold", italic="Pack", boldItalic="Pack-Bold")


def para(text, size=10.2, leading=None, bold=False, before=0, after=6, color=INK):
    return Paragraph(escape(clean(text)).replace("\n", "<br/>"), ParagraphStyle(
        "text", fontName="Pack-Bold" if bold else "Pack", fontSize=size,
        leading=leading or size * 1.4, spaceBefore=before, spaceAfter=after,
        textColor=color, allowWidows=0, allowOrphans=0, splitLongWords=True,
    ))


def heading(text, size=13):
    p = para(text, size=size, leading=size*1.25, bold=True, before=9, after=6)
    p.style.keepWithNext = True
    return p


def labelled(label, text, size=10.2):
    style = ParagraphStyle("label", fontName="Pack", fontSize=size,
                           leading=size*1.4, spaceAfter=6, textColor=INK,
                           allowWidows=0, allowOrphans=0, splitLongWords=True)
    return Paragraph(f"<b>{escape(clean(label))}</b> {escape(clean(text))}", style)


def bullets(items, size=10.2):
    return [labelled("-", x, size=size) for x in items]


def title(kicker, name, subtitle=""):
    result = [para(kicker.upper(), size=8, bold=True, after=7, color=GRAY),
              para(name, size=21, leading=25, bold=True, after=8)]
    if subtitle:
        result.append(para(subtitle, size=10.2, after=12, color=GRAY))
    return result


class Lines(Flowable):
    def __init__(self, count=2, gap=22, box=False):
        super().__init__()
        self.count, self.gap, self.box = count, gap, box
        self.width, self.height = WIDTH, count * gap + 9

    def draw(self):
        self.canv.setStrokeColor(RULE)
        self.canv.setLineWidth(.55)
        if self.box:
            self.canv.rect(0, 4, self.width, self.height-8, fill=0, stroke=1)
        else:
            for i in range(self.count):
                y = self.height - (i+1)*self.gap
                self.canv.line(0, y, self.width, y)


def panel(label, body, student=False):
    cell = [para(label, size=9.6, bold=True, after=4), para(body, size=10, after=0)]
    t = Table([[cell]], colWidths=[WIDTH])
    t.setStyle(TableStyle([
        ("BOX", (0,0), (-1,-1), .65, RULE),
        ("BACKGROUND", (0,0), (-1,-1), colors.white if student else PALE),
        ("LEFTPADDING", (0,0), (-1,-1), 10), ("RIGHTPADDING", (0,0), (-1,-1), 10),
        ("TOPPADDING", (0,0), (-1,-1), 8), ("BOTTOMPADDING", (0,0), (-1,-1), 8),
    ]))
    return [t, Spacer(1, 10)]


def source_blocks(sources):
    story = []
    for s in sources:
        story.append(heading(s["title"], size=11))
        if s.get("note"):
            story.append(para(s["note"], size=9.5))
        story.append(para(s["url"], size=8.5, leading=12, after=10, color=GRAY))
    return story


def build(path, story, label, student=False):
    def frame(c, doc):
        c.saveState()
        c.setTitle(label)
        c.setAuthor("Division 8 | Classroom teaching resources")
        c.setSubject("Grade 6 | Teacher guide" if not student else "Grade 6 | Student activity pages")
        c.setFont("Pack", 7.3)
        c.setFillColor(GRAY)
        c.drawRightString(W-M, H-22, "DIVISION 8 | GRADE 6")
        c.setStrokeColor(RULE)
        c.setLineWidth(.5)
        c.line(M, 35, W-M, 35)
        c.setFont("Pack", 7.8)
        c.setFillColor(GRAY)
        c.drawString(M, 23, label)
        c.drawRightString(W-M, 23, str(doc.page))
        c.restoreState()
    doc = SimpleDocTemplate(str(path), pagesize=(W,H), rightMargin=M, leftMargin=M,
                            topMargin=38, bottomMargin=48, title=label,
                            author="Division 8 | Classroom teaching resources")
    doc.build(story, onFirstPage=frame, onLaterPages=frame)


def phe_teacher(data):
    story = title("Teacher guide | six flexible weeks", data["title"], data["subtitle"])
    story += [para(data["intro"]), heading("Use the sequence")]
    story += bullets(data["teacherOverview"][:6], size=10)
    story += [PageBreak()]
    story += title("Teacher guide | planning map", "Six connected weeks", "One classroom health lesson and two movement lessons each week. Repeat or adapt to actual readiness.")
    for i, week in enumerate(data["weeks"], 1):
        story += [labelled(f"{i}. {week['title']}", week["focus"], size=10)]
    story += [heading("Evidence and wider curriculum planning")]
    story += bullets(data["teacherOverview"][6:], size=10)
    for i, week in enumerate(data["weeks"], 1):
        story += [PageBreak()]
        story += title(f"Week {i} | classroom health", week["title"], week["focus"])
        story += [labelled("Curriculum connections:", " ".join(x.rstrip(".; ") + "." for x in week["curriculum"]), size=9.5)]
        story += lesson_teacher(week["health"], compact=True)
        for n in (1, 2):
            story += [PageBreak()]
            story += title(f"Week {i} | physical education {n}", week["pe1" if n == 1 else "pe2"]["title"],
                           "Teacher-led skill practice" if n == 1 else "Familiar practice with teacher-approved captain roles")
            story += lesson_teacher(week["pe1" if n == 1 else "pe2"], compact=False, show_title=False)
    story += [PageBreak()]
    story += title("Teacher reference", "Sources and teaching boundaries", "Read the current official source when planning. All fictional task inputs are printed in this pack.")
    story += source_blocks(data["sources"])
    return story


def lesson_teacher(lesson, compact=False, show_title=True):
    size = 9.6 if compact else 10
    def entry(label, text):
        p = labelled(label, text, size=size)
        p.style.leading = size * 1.33
        p.style.spaceAfter = 4.5
        return p
    story = [heading(f"{lesson['title']} | {lesson['minutes']} minutes", size=11.5)] if show_title else [para(f"{lesson['minutes']} minutes | Exact 30-minute option below", size=9.5, bold=True)]
    story += [entry("Goal:", lesson["goal"]),
              entry("Materials:", "; ".join(lesson["materials"])),
              entry("Set up:", lesson["setup"]),
              entry("Model:", re.sub(r"^Model:\s*", "", lesson["model"]))]
    for j, step in enumerate(lesson["steps"], 1):
        story += [entry(f"{j}. {step['title']} ({step['minutes']} min):", step["action"])]
    story += [entry("Look for:", lesson["check"]),
              entry("Participation options:", " ".join(lesson["access"])),
              entry("Teaching notes:", " ".join(lesson["teacherNotes"]))]
    return story


def phe_student(data):
    story = []
    for i, week in enumerate(data["weeks"], 1):
        if i > 1:
            story.append(PageBreak())
        page = week["studentPage"]
        story += title(f"PHE | week {i}", page["title"], "Say, draw, point or write. Use the fictional situation; personal sharing is optional.")
        story += panel("Start here", page["scenario"], student=True)
        story += panel("A worked example", page["model"], student=True)
        for j, prompt in enumerate(page["prompts"], 1):
            story += [para(f"{j}. {prompt}", size=10.5, bold=True, after=2),
                      Lines(count=3 if len(page["prompts"]) <= 3 else 2, gap=23)]
    return story


def model_story(example, student=False):
    result = [heading("Worked example", size=11.5), para(example["prompt"], bold=True)]
    for i, step in enumerate(example["steps"], 1):
        result += [labelled(f"{i}.", step, size=9.8 if student else 10)]
    result += [labelled("So:", example["answer"], size=10), Spacer(1, 5)]
    return result


def question_key(items, include_look=True, size=9.6):
    result = []
    for i, item in enumerate(items, 1):
        result.append(para(f"{i}. {item['prompt']}", size=size, bold=True, before=5, after=4))
        result.append(labelled("Answer / possible explanation:", item["answer"], size=size))
        if include_look and item.get("lookFor"):
            result.append(labelled("Notice:", item["lookFor"], size=size))
    return result


def maths_teacher(data):
    story = title("Teacher guide | choose from evidence", data["title"], data["subtitle"])
    story += [para(data["intro"]), heading("Use the pack")]
    story += bullets(data["teacherOverview"], size=9.8)
    story += [PageBreak()]
    story += title("Entry check | answers and interpretations", data["readiness"]["title"],
                   "Allow about 12 minutes, plus usual access supports. Use explanations rather than a score cutoff.")
    story += question_key(data["readiness"]["items"], size=9.7)
    for route in data["routes"]:
        story += [PageBreak()]
        story += title("Route | model, tasks and answers", route["title"], f"About {route['minutes']} minutes | {route['goal']}")
        story += model_story(route["example"])
        story += [heading("Practice answers", size=11.5)]
        story += question_key(route["practice"], include_look=False, size=9.6)
        story += [heading("Fresh recheck answers", size=11.5)]
        story += question_key(route["recheck"], include_look=False, size=9.6)
        story += [PageBreak()]
        story += title("Route | preparation and next steps", route["title"], route["when"])
        routing = next(x for x in data["readiness"]["routing"] if x["routeId"] == route["id"])
        story += [labelled("Choose it when:", routing["when"]),
                  labelled("Teacher move:", routing["teacherMove"]),
                  labelled("Materials:", "; ".join(route["materials"]))]
        story += [heading("Teach and respond")]
        story += bullets(route["teacherNotes"], size=9.8)
        story += [heading("Participation options")]
        story += bullets(route["access"], size=9.8)
        story += [heading("What the fresh recheck can show")]
        story += bullets([x["lookFor"] for x in route["recheck"]], size=9.8)
    bridge = data["bridge"]
    story += [PageBreak()]
    story += title("A separate check | before multiplication", "Is the bridge useful now?", "Use student page 6 on its own. Keep page 7 out of view until the four questions have been reviewed.")
    story += question_key(bridge["items"], size=9.5)
    story += [heading("Decide from the explanation")]
    story += bullets(bridge["readyWhen"], size=9.5)
    story += [PageBreak()]
    story += title("Optional whole-number bridge", "Teach the next useful idea", "Use the bridge when its prerequisite ideas are understood. No score threshold is implied.")
    story += [heading("If an earlier idea needs teaching")]
    story += bullets(bridge["ifNotYet"], size=9.6)
    story += model_story(bridge["model"])
    story += [heading("Bridge practice and fresh check")]
    story += question_key(bridge["practice"], include_look=False, size=9.6)
    story += [PageBreak()]
    story += title("Teacher reference", "Sources and optional resources", "The original examples in this pack work offline. Linked videos and subscriptions are optional.")
    story += source_blocks(data["sources"])
    return story


def maths_student(data):
    story = title("Maths | entry check", data["readiness"]["title"], "Say, draw, point or write. Keep your first thinking so you can revisit it.")
    story += [para(data["readiness"]["firstAction"], size=10.2, after=10)]
    for i, item in enumerate(data["readiness"]["items"], 1):
        story += [para(f"{i}. {item['prompt']}", size=10.3, bold=True, after=1), Lines(count=2, gap=23)]
    for route in data["routes"]:
        story += [PageBreak()]
        story += title("Maths | one useful route", route["title"], route["goal"])
        story += model_story(route["example"], student=True)
        story += [heading("Now try", size=11.5)]
        for i, item in enumerate(route["practice"], 1):
            story += [para(f"{i}. {item['prompt']}", size=10.2, bold=True, after=1), Lines(count=3, gap=23)]
        story += [para("Explain one answer to a partner. Then use your route's questions on the fresh-check page independently.", size=9.5, after=0)]
    story += [PageBreak()]
    story += title("Maths | fresh check", "Try fresh numbers", "Complete only your chosen route's two questions. Work independently with your usual supports. Explain your thinking.")
    for route in data["routes"]:
        story += [heading(route["title"], size=11.5)]
        for i, item in enumerate(route["recheck"], 1):
            story += [para(f"{i}. {item['prompt']}", size=10.2, bold=True, after=1), Lines(count=2, gap=23)]
    bridge = data["bridge"]
    story += [PageBreak()]
    story += title("Maths | multiplication mini-check", "Which idea comes next?", "Stop here: your teacher reviews this page with you before the bridge page.")
    story += [para(bridge["firstAction"], size=10.2, after=11)]
    for i, item in enumerate(bridge["items"], 1):
        story += [para(f"{i}. {item['prompt']}", size=10.5, bold=True, after=2), Lines(count=4, gap=24)]
    story += [PageBreak()]
    story += title("Maths | use after the multiplication mini-check", "Count every part", "Use this page after your teacher reviews the mini-check and chooses the bridge with you.")
    story += model_story(bridge["model"], student=True)
    story += [heading("Practise, then try a fresh example", size=11.5)]
    for i, item in enumerate(bridge["practice"], 1):
        story += [para(f"{i}. {item['prompt']}", size=10.5, bold=True, after=2), Lines(count=5, gap=24)]
    return story


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=OUT)
    args = parser.parse_args()
    fonts()
    args.out.mkdir(parents=True, exist_ok=True)
    phe = json.loads((REPO / "content/phe-six-week-sequence.json").read_text())
    maths = json.loads((REPO / "content/maths-readiness-pathways.json").read_text())
    build(args.out / "PHE_Six_Week_Teacher_Guide.pdf", phe_teacher(phe), "PHE | Six-week teacher guide")
    build(args.out / "PHE_Student_Activity_Pages.pdf", phe_student(phe), "PHE | Student activity pages", student=True)
    build(args.out / "Maths_Readiness_Teacher_Guide.pdf", maths_teacher(maths), "Maths | Readiness teacher guide")
    build(args.out / "Maths_Readiness_Student_Pages.pdf", maths_student(maths), "Maths | Readiness student pages", student=True)
    print("Built four PHE and maths packs in", args.out)


if __name__ == "__main__":
    main()
