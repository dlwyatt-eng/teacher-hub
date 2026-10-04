#!/usr/bin/env python3
"""Build the Nature Today teacher, student and attributed photo-bank PDFs.

Usage: python scripts/build-nature-today-pack.py [--data content/nature-today.json]
Requires ReportLab and Pillow. Run from any working directory. The input JSON is
canonical; the script never downloads images or changes content or site files.
"""
from __future__ import annotations

import argparse
import io
import json
import re
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image, ImageOps
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


REPO = Path(__file__).resolve().parents[1]
DEFAULT_OUT = REPO.parent / "output" / "pdf"
GREEN = colors.HexColor("#214b3d")
INK = colors.HexColor("#20312b")
MUTED = colors.HexColor("#52655c")
PALE = colors.HexColor("#edf3ee")
RULE = colors.HexColor("#c3cec6")
LETTER = (612, 792)
LANDSCAPE = (792, 612)
M = 46


def plain(value):
    if value is None:
        return "Not recorded"
    text = str(value)
    text = re.sub(r"<[^>]+>", "", text)
    return text.replace("\u2011", "-").replace("\u2013", "-").replace("\u2014", " - ")


def esc(value):
    return escape(plain(value))


def setup_fonts():
    base = Path("/usr/share/fonts/truetype/dejavu")
    for label, filename in [("Nature", "DejaVuSans.ttf"),
                            ("Nature-Bold", "DejaVuSans-Bold.ttf"),
                            ("Nature-Italic", "DejaVuSans.ttf")]:
        pdfmetrics.registerFont(TTFont(label, str(base / filename)))
    pdfmetrics.registerFontFamily("Nature", normal="Nature", bold="Nature-Bold", italic="Nature-Italic")


class Book:
    def __init__(self, path, title, total, size=LETTER, student=False):
        self.c = canvas.Canvas(str(path), pagesize=size, pageCompression=1)
        self.c.setTitle(title)
        self.c.setAuthor("Nature Today | Grade 6 classroom resource")
        self.c.setSubject("Observation, evidence, place and inclusive participation")
        self.w, self.h = size
        self.title, self.total, self.student = title, total, student
        self.page = 0

    def start(self, kicker, title, subtitle=""):
        self.page += 1
        c = self.c
        c.setFillColor(colors.black if self.student else GREEN)
        c.setFont("Nature-Bold", 8.5)
        c.drawString(M, self.h - 37, kicker.upper())
        y = self.h - 64
        y = self.p(title, y, size=24, leading=29, bold=True, color=colors.black if self.student else GREEN)
        if subtitle:
            y = self.p(subtitle, y - 6, size=10.5, leading=15, color=MUTED)
        return y - 20

    def p(self, text, y, x=M, width=None, size=10.5, leading=15, bold=False,
          color=INK, space=0, raw=False):
        width = self.w - 2*M if width is None else width
        style = ParagraphStyle("p", fontName="Nature-Bold" if bold else "Nature",
                               fontSize=size, leading=leading, textColor=color,
                               alignment=TA_LEFT, splitLongWords=True, allowWidows=0,
                               allowOrphans=0)
        p = Paragraph(text if raw else esc(text), style)
        _, height = p.wrap(width, 1000)
        if y - height < 48:
            raise ValueError(f"Text overflow on {self.title}, page {self.page}: {plain(text)[:85]}")
        p.drawOn(self.c, x, y-height)
        return y-height-space

    def h2(self, text, y):
        return self.p(text, y, size=13, leading=17, bold=True,
                      color=colors.black if self.student else GREEN, space=7)

    def bullet(self, text, y, size=10.5):
        self.c.setFillColor(colors.black if self.student else GREEN)
        self.c.circle(M+2, y-5, 1.8, fill=1, stroke=0)
        return self.p(text, y, x=M+12, width=self.w-2*M-12,
                      size=size, leading=size+4.5, space=6)

    def panel(self, title, text, y, height=95):
        c = self.c
        c.setFillColor(PALE)
        c.roundRect(M, y-height, self.w-2*M, height, 7, fill=1, stroke=0)
        yy = self.p(title, y-13, x=M+14, width=self.w-2*M-28,
                    size=11, leading=15, bold=True, color=GREEN)
        self.p(text, yy-6, x=M+14, width=self.w-2*M-28, size=10.5, leading=15)
        return y-height-18

    def link(self, label, url, y, note="", size=10, x=M, width=None):
        body = f'<link href="{escape(str(url), {chr(34): "&quot;"})}" color="#214b3d"><u>{esc(label)}</u></link>'
        if note:
            body += "<br/>" + esc(note)
        return self.p(body, y, size=size, leading=size+3.5, raw=True, space=8, x=x, width=width)

    def lines(self, y, n=3, spacing=27, x=M, width=None):
        width = self.w-2*M if width is None else width
        self.c.setStrokeColor(colors.HexColor("#b7b7b7"))
        self.c.setLineWidth(.6)
        for i in range(n):
            yy = y - (i+1)*spacing
            self.c.line(x, yy, x+width, yy)
        return y - n*spacing - 14

    def box(self, label, y, height=150, x=M, width=None):
        width = self.w-2*M if width is None else width
        self.c.setStrokeColor(colors.HexColor("#a9a9a9"))
        self.c.setLineWidth(.7)
        self.c.rect(x, y-height, width, height, fill=0, stroke=1)
        self.p(label, y-10, x=x+11, width=width-22, size=9, leading=12, color=MUTED)
        return y-height-17

    def check(self, text, y, size=10):
        self.c.setStrokeColor(colors.black if self.student else GREEN)
        self.c.setLineWidth(.8)
        self.c.rect(M, y-9, 8, 8, fill=0, stroke=1)
        return self.p(text, y, x=M+16, width=self.w-2*M-16,
                      size=size, leading=size+4, space=7)

    def end(self):
        c = self.c
        c.setStrokeColor(colors.HexColor("#bababa") if self.student else RULE)
        c.setLineWidth(.6)
        c.line(M, 37, self.w-M, 37)
        c.setFont("Nature", 8)
        c.setFillColor(MUTED)
        c.drawString(M, 24, "Nature Today | " + ("Student journal" if self.student else self.title.replace("Nature Today | ", "")))
        c.drawRightString(self.w-M, 24, f"{self.page} / {self.total}")
        c.showPage()

    def save(self):
        if self.page != self.total:
            raise ValueError(f"Expected {self.total} pages; made {self.page}")
        self.c.save()


CURRICULUM = [
    ("Science 6", "science", "Primary connection: observation, inquiry questions, predictions, suitable records, patterns and explanations supported by evidence. Interpret the local environment and communicate in varied forms. This routine is an inquiry context; do not label biodiversity or ecosystems as the Grade 6 content unit."),
    ("English Language Arts 6", "english-language-arts", "Primary connection: interpret photographs as visual texts, make meaningful connections, exchange viewpoints and refine a concise explanation. Invite a response through speech, writing, drawing, dictation, a home language or AAC."),
    ("Physical and Health Education 6", "physical-health-education", "Optional walk connection: safe movement, leadership, healthy relationships and reflection on well-being. Seated or photo observation keeps the Science/ELA goal; it does not automatically meet the physical-activity competency. Plan appropriate movement separately."),
    ("Career Education 6", "career-education", "Optional connection: explicitly practise inclusive collaboration, leadership and safety, set a learning goal or plan a small stewardship project. A photograph alone is not career exploration."),
    ("Social Studies 6", "social-studies", "Optional extension: investigate an actual green-space access or habitat-management issue; compare reliable sources and perspectives and propose an informed action. A walk alone is not a Social Studies inquiry."),
]


def teacher_pack(path, data):
    b = Book(path, "Nature Today | Teacher pack", 8)
    cards = data["cards"]
    y = b.start("A small daily practice", "Nature Today", "Grade 6 | 2-5 minutes | Notice - Explain - Revisit")
    y = b.panel("Learning goal", "I can describe evidence, ask a question, and explain or revise one idea about a place.", y, 81)
    y = b.h2("Before students arrive", y)
    for text in [
        "Choose one supplied image, a window view or a safe observation point. Read the caption, date, location and teacher note before making claims about the subject.",
        "Have the image bank and optional student journal ready. Provide a large image, a concise spoken/text description and response choices. School-supplied paper and pencils are enough.",
        "Say whether the image is local, from another place, or archival. Do not call an older photograph today's Surrey conditions.",
    ]:
        y = b.bullet(text, y)
    y = b.h2("Run the routine", y-3)
    for title, text in [
        ("1  Notice | 30-60 seconds", "Look closely or use the description. Name two details that the source supports. What do you wonder?"),
        ("2  Explain | 45-90 seconds", "Try one explanation using a specific detail. Separate what is observed from what is inferred. What could another explanation be?"),
        ("3  Revisit | 30-60 seconds", "Use the Revisit prompt to plan a next observation or compare with an earlier dated view. What evidence would help?"),
    ]:
        y = b.p(title, y, bold=True, size=10.5, leading=15, space=3)
        y = b.p(text, y, size=10, leading=14, space=8)
    y = b.p("Finish with a brief share: say, draw, write, dictate or use AAC. Two-minute version: one detail, one tentative explanation, one next question. Five-minute version: add a buddy exchange or comparison and an evidence-based revision.", y, size=9.5, leading=13, space=10)
    y = b.p("Model: 'I see three droplets on the leaf edge. I think the leaf is wet. I cannot tell from this photo whether the water is rain or dew.'", y, size=10, leading=14)
    b.end()

    for page_no, subset in enumerate([cards[:8], cards[8:]], start=1):
        y = b.start("Choose a starting point", "The image menu" + (" / continued" if page_no == 2 else ""), "Use these as invitations to notice. The image bank supplies all three prompts and complete credits.")
        for card in subset:
            idx = cards.index(card)+1
            y = b.p(f"{idx:02d}  {card['title']}", y, bold=True, size=11, leading=15, color=GREEN, space=3)
            y = b.p(card["notice"], y, size=10, leading=14, space=3)
            y = b.p("Teacher note: " + card["teacherNote"], y, size=9.2, leading=12.5, color=MUTED, space=10)
        if page_no == 2:
            y = b.h2("Return to the same place", y-3)
            y = b.p("Revisit one tree, view or image pair. Keep the date, approximate viewpoint and observation length consistent when possible. Record differences in weather or framing that could affect a comparison.", y, size=10, leading=14, space=10)
            y = b.p("Ask: What stayed similar? What changed? What evidence supports that claim? What else would we need to observe? A different, supported interpretation can remain different.", y, size=10, leading=14)
        b.end()

    y = b.start("Curriculum with a clear purpose", "Grade 6 connections", "Official British Columbia curriculum links. The strongest daily links are Science inquiry and ELA.")
    for title, slug, text in CURRICULUM:
        y = b.link(title, f"https://curriculum.gov.bc.ca/curriculum/{slug}/6/core", y, size=11)
        y = b.p(text, y, size=10, leading=14.5, space=16)
    y = b.p("Assess the thinking students demonstrate. Frequency, a curriculum label, completion of every box or an outdoor location does not establish learning by itself.", y, size=10, leading=14)
    b.end()

    y = b.start("Everyone works toward the same goal", "A buddy neighbourhood observation", "A short route, a seated stop, a window view and a dated photograph can all support observation and evidence.")
    y = b.h2("Plan the participation before the walk", y)
    for text in [
        "Privately invite support preferences. Preview the specific route's surface, slope, distance, crossings, rest places, washrooms, shelter and sounds. Check actual conditions and school procedures; no park label guarantees every route fits every learner.",
        "Offer equally valued ways to join: firm-surface route; sheltered seated stop; window observation; or teacher-supplied image/description. Keep peers connected across options. No family purchase, device, transport or home nature access is required.",
        "Bring school materials. Offer large print/zoom, high-contrast text, image descriptions, spoken and written directions, vocabulary supports, home languages, AAC, dictation and quiet response choices.",
    ]:
        y = b.bullet(text, y, size=10)
    y = b.h2("Use roles that rotate", y-2)
    y = b.p("Observer chooses a detail; questioner asks what the evidence supports; recorder captures the idea in a chosen form. In a pair, combine questioner and recorder, then swap at the next stop. No student is permanently assigned as a helper. Offer independent or adult-supported participation.", y, size=10, leading=14.5, space=13)
    y = b.h2("An 8-12 minute option", y)
    for text in [
        "Before leaving: name one observation goal, the agreed boundary, stop/return signal and participation choices.",
        "At one or two stops: notice two details, ask one question and record one idea; switch roles. Adults manage road, water and group safety.",
        "On return: each pair offers one detail and one question. Revisit a shared photo next time so every mode feeds the same class conversation.",
    ]:
        y = b.bullet(text, y, size=10)
    y = b.p("Care for the place: observe without tasting, collecting unknown organisms, moving logs, entering streams or approaching nests. Follow current site notices and school procedures.", y, size=10, leading=14, space=10)
    b.link("Surrey Nature Centre: specific access information", "https://www.surrey.ca/parks-recreation/parks/surrey-nature-centre/about-us", y, "The site lists multiple surface types and slopes, seating, and a junior-size all-terrain chair loan. Check suitability and availability; this is not a verified class route.", size=9)
    b.end()

    y = b.start("An optional extension", "Salmon, streams and evidence", "Use the supplied photo even when a trip or a live salmon sighting is not possible.")
    y = b.panel("Start with what is supplied", "Show the salmon or stream image. Students record two visible details, one possible explanation and one question that the photograph cannot answer. Use journal page 5.", y, 97)
    y = b.h2("A possible local connection", y)
    y = b.p("The City of Surrey describes October-November opportunities to see returning salmon; its Tynehead page lists October-December viewing. Species, site, year and water conditions affect what is visible. These are seasonal possibilities, not a forecast or a guarantee.", y, size=10.5, leading=15, space=13)
    y = b.p("Choose a visit only after current site and school checks. Select an appropriate established viewing area and an equivalent photo/window/seated participation route. This pack does not verify trail conditions, transport, permissions, water levels or individual access.", y, size=10.5, leading=15, space=15)
    y = b.h2("Keep explanations proportional to the evidence", y)
    for text in [
        "A still image can show fish shape, number within the frame, water and nearby habitat. It cannot establish the whole population, exact movement, water quality or a successful migration.",
        "Students may hypothesize a connection between rain, stream conditions and returning fish. Ask what dated observations or a reliable source would help evaluate it.",
        "No fish is a useful result too: record when and where you looked and what you could see. Do not conclude that a stream contains no fish.",
    ]:
        y = b.bullet(text, y, size=10)
    y = b.h2("Try a care question", y)
    y = b.p("How could we help keep pollutants out of rainwater routes? Surrey's storm-drain information connects drains with local waterways. Use a safe photograph of a drain marker; do not send children into a road or toward a drain to investigate.", y, size=10, leading=14.5, space=14)
    y = b.link("City of Surrey: fish and seasonal viewing", "https://www.surrey.ca/about-surrey/environment/wildlife-habitats/fish", y, size=9)
    y = b.link("City of Surrey: Tynehead Regional Park", "https://www.surrey.ca/parks-recreation/parks/tynehead-regional-park", y, size=9)
    b.link("City of Surrey: water pollution and storm drains", "https://www.surrey.ca/about-surrey/environment/water-pollution", y, size=9)
    b.end()

    y = b.start("Listen for evidence, not performance", "A usable observation check", "Use one or two criteria at a time. Capture a short example, then choose a next teaching move.")
    for text in [
        "Describes a specific detail available in the image, description or observation.",
        "Separates an observation from an inference or uncertainty.",
        "Asks a question that could guide further observation or source-checking.",
        "Supports an explanation with a relevant detail; considers another supported explanation.",
        "Compares dated views carefully and notices changes in viewpoint or conditions.",
        "Contributes through a chosen communication mode and respects others' access, boundaries and ideas.",
    ]:
        y = b.check(text, y, size=10.5)
    y = b.h2("Record one piece of evidence", y-5)
    y = b.p("Date / image or observation point: __________________________________", y, size=10, leading=15, space=5)
    y = b.lines(y, 3, spacing=24)
    y = b.h2("Use the response to decide what comes next", y)
    for text in [
        "If a claim is too broad: ask 'Which detail supports that?' and model a narrower claim.",
        "If observation and explanation blur: sort two examples into 'I notice' and 'I think because'.",
        "If ideas differ: compare evidence before asking anyone to revise. Do not require agreement.",
        "If access blocks the response: adjust the input or communication mode; keep the learning goal.",
    ]:
        y = b.bullet(text, y, size=10)
    y = b.p("Do not grade walking distance, species-name recall, handwriting, eye contact or willingness to share personal feelings. A learner can pass on public sharing and still provide evidence privately.", y, size=10, leading=14.5, space=10)
    b.p("A simple weekly rhythm: notice a new view; explain with evidence; revisit a place; compare; reflect on one idea or feasible care action. Use as much or as little of the journal as the learning calls for.", y, size=10, leading=14.5)
    b.end()

    y = b.start("Read the source as well as the scene", "Source notes and links", "Image credits stay with every photograph in the image bank. Linked titles below open the source.")
    y = b.p("Ask who made the image, where and when it was made, and what lies outside the frame. An archival image is a comparison resource, not evidence of today's local conditions. The bank records date/location limits; student observations should also record their own dates.", y, size=10, leading=14, space=10)
    y = b.p("Use local Nation-authored or explicitly shared Indigenous resources with accurate attribution and the relevant permission/protocol. Do not invent an Indigenous story or voice, treat all Nations as one, or ask a student to speak for a Nation. A generic nature observation does not deliver the First Peoples knowledge strand by itself.", y, size=10, leading=14, space=10)
    y = b.p("Photo permissions: original credits, source links and license labels remain with each image. Images are fitted proportionally and may have been resized or converted for the site/PDF; no subject-content edits are made by this generator. Original licenses remain in force. Check each license before adapting or redistributing an image.", y, size=9.5, leading=13.5, space=14)
    sources = data.get("sources", [])
    # Source records are compact links; complete photo attribution is on each bank page.
    source_top = y
    source_width = (b.w-2*M-24)/2
    midpoint = (len(sources)+1)//2
    for i, source in enumerate(sources):
        if i == midpoint:
            y = source_top
        x = M if i < midpoint else M+source_width+24
        y = b.link(source["title"], source["url"], y, source.get("note", ""),
                   size=8.4, x=x, width=source_width)
    if not sources:
        raise ValueError("Expected the curated source list in data['sources']")
    b.end()
    b.save()


def student_pack(path):
    b = Book(path, "Nature Today | Student journal", 6, student=True)
    y = b.start("1 / Look closely", "Notice and wonder", "Name: ________________________   Date: ________________________")
    y = b.p("Choose one supplied photo, window view or agreed observation spot. Look closely or use its description. You can write, draw, dictate or use your communication tools.", y, size=11, leading=16, space=12)
    y = b.p("Example: 'I notice three round droplets along a leaf edge. I wonder how they got there.' The droplets are evidence; their origin is a question.", y, size=10.5, leading=15, space=13)
    y = b.p("My image number or observation place: ______________________________", y, size=10, leading=15, space=13)
    y = b.box("Draw, label or describe a detail you noticed.", y, height=178)
    y = b.h2("Two details I notice", y)
    y = b.lines(y, 2, spacing=27)
    y = b.h2("One question I wonder about", y)
    y = b.lines(y, 2, spacing=27)
    y = b.h2("What would help me explore my question?", y)
    b.lines(y, 1, spacing=27)
    b.end()

    y = b.start("2 / Return to a place", "What changed? What stayed?", "Name: ________________________   Place or image pair: __________________")
    y = b.p("Start View A with an observation today. Return to the same place on another day for View B. Or use a same-place dated photo pair your teacher selects. The image bank is not a before-and-after set. Compare viewpoint and weather too.", y, size=11, leading=16, space=13)
    width = (b.w-2*M-16)/2
    top = y
    b.box("View A | date: __________________\nDraw or describe.", top, height=178, width=width)
    b.box("View B | date: __________________\nDraw or describe.", top, height=178, x=M+width+16, width=width)
    y = top-195
    y = b.h2("One thing that stayed similar", y)
    y = b.lines(y, 2, spacing=24)
    y = b.h2("One change, and the detail that supports it", y)
    y = b.lines(y, 2, spacing=24)
    y = b.h2("Could weather, framing or viewpoint affect my comparison?", y)
    y = b.lines(y, 2, spacing=24)
    y = b.p("My next observation or question: ____________________________________", y, size=10.5, leading=15)
    b.end()

    y = b.start("3 / Observe together", "Our shared observation map", "Names: ________________________   Date: ________________________")
    y = b.p("Choose your agreed route, seated stop, window view or supplied photo. Mark one or two observation points below. A map can be a drawing, a sequence of boxes or a description.", y, size=11, leading=16, space=12)
    y = b.p("Start with roles: observer chooses a detail; questioner asks about evidence; recorder captures the idea. In a pair, combine two roles. Swap at the next stop or image.", y, size=10.5, leading=15, space=12)
    y = b.p("First roles: ___________________   After the swap: ___________________", y, size=10, leading=15, space=12)
    y = b.box("Show the observation point(s), a pause/rest place and the agreed return point. For a photo, mark areas to study.", y, height=211)
    y = b.h2("What would help everyone join this observation?", y)
    y = b.p("Think about space, surfaces, rest, noise, image size, a description or a way to respond.", y, size=10, leading=14)
    y = b.lines(y, 2, spacing=25)
    y = b.h2("Our shared detail and question", y)
    b.lines(y, 2, spacing=25)
    b.end()

    y = b.start("4 / Follow the evidence", "Where might rainwater go?", "Name: ________________________   Date / image: ________________________")
    y = b.p("Start with a safe, agreed view of a leaf, puddle, ground surface or supplied photo. Stay within the agreed observation area. Describe what is there before suggesting where water might go.", y, size=11, leading=16, space=12)
    width = (b.w-2*M-16)/2
    top = y
    b.box("I observe...\nExample: water beside a curb.", top, height=114, width=width)
    b.box("I think / wonder...\nExample: it might flow downhill.", top, height=114, x=M+width+16, width=width)
    y = top-132
    y = b.box("Draw a possible water route. Use a solid line for movement you observed and a dotted line for a guess. Or describe the difference in words.", y, height=181)
    y = b.h2("Which detail supports my idea?", y)
    y = b.lines(y, 2, spacing=25)
    y = b.h2("What would I need to observe or check next?", y)
    b.lines(y, 2, spacing=25)
    b.end()

    y = b.start("5 / Ask what a photo can tell us", "Salmon and stream clues", "Name: ________________________   Image number: ________________________")
    y = b.p("Use the supplied salmon or stream photo. You do not need to visit a stream or see a live fish. Read or listen to the caption and image description before you begin.", y, size=11, leading=16, space=12)
    y = b.p("Photo location: __________________   Photo date: __________________\nIf the caption does not tell you, write 'not recorded'.", y, size=10.5, leading=15, space=13)
    y = b.h2("Two details the photo shows", y)
    y = b.lines(y, 2, spacing=25)
    y = b.h2("One possible explanation, with a detail that supports it", y)
    y = b.lines(y, 2, spacing=25)
    y = b.h2("What can this still image NOT tell me?", y)
    y = b.p("Consider what happened before or after, what is outside the frame, or conditions today.", y, size=10, leading=14)
    y = b.lines(y, 2, spacing=25)
    y = b.h2("Check the source", y)
    y = b.p("Photographer / source: _____________________________________________\nOne question I would check in a reliable source:", y, size=10.5, leading=16)
    y = b.lines(y, 2, spacing=25)
    y = b.p("Does this image show our place today?  Yes / No / Not enough information\nMy evidence for that answer:", y, size=10.5, leading=16)
    b.lines(y, 1, spacing=25)
    b.end()

    y = b.start("6 / Reflect and care", "One idea, one next step", "Name: ________________________   Date: ________________________")
    y = b.p("Choose one observation from this journal. Re-read your idea or ask someone to read it with you. Your idea may stay the same, become more precise or change when you consider evidence.", y, size=11, leading=16, space=14)
    y = b.h2("I used to think / I first wondered...", y)
    y = b.lines(y, 2, spacing=25)
    y = b.h2("Now I think... because my evidence is...", y)
    y = b.lines(y, 3, spacing=25)
    y = b.h2("A small care action I can actually try", y)
    y = b.p("Choose your own, or begin with: leave plants where they grow; remind our group to observe from the path; share a careful observation; ask about a barrier to joining in. No purchase is needed.", y, size=10.5, leading=15, space=7)
    y = b.lines(y, 2, spacing=25)
    y = b.p("When / where I can try it: __________________________________________\nSupport I might need: ______________________________________________", y, size=10.5, leading=23, space=13)
    y = b.h2("After I try it: what happened? What might I adjust?", y)
    b.lines(y, 2, spacing=25)
    b.end()
    b.save()


def image_bank(path, data, image_dir):
    b = Book(path, "Nature Today | Image bank", len(data["cards"]), size=LANDSCAPE)
    for idx, card in enumerate(data["cards"], 1):
        y = b.start(f"Photo {idx:02d} / {len(data['cards'])} | Notice - Explain - Revisit", card["title"])
        image_path = image_dir / card["filename"]
        if not image_path.is_file():
            raise FileNotFoundError(image_path)
        im = ImageOps.exif_transpose(Image.open(image_path)).convert("RGB")
        im.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        encoded = io.BytesIO()
        im.save(encoded, format="JPEG", quality=89, optimize=True)
        encoded.seek(0)
        # Fit the entire frame: never crop a scientific observation resource.
        frame_top, frame_bottom = y+5, 165
        frame_h, frame_w = frame_top-frame_bottom, 443
        scale = min(frame_w/im.width, frame_h/im.height)
        iw, ih = im.width*scale, im.height*scale
        b.c.setFillColor(colors.HexColor("#f4f5f2"))
        b.c.rect(M, frame_bottom, frame_w, frame_h, fill=1, stroke=0)
        b.c.drawImage(ImageReader(encoded), M+(frame_w-iw)/2, frame_bottom+(frame_h-ih)/2,
                      width=iw, height=ih, preserveAspectRatio=True)
        prompt_x, prompt_w = M+frame_w+23, b.w-2*M-frame_w-23
        yy = frame_top
        for label, key in [("NOTICE", "notice"), ("EXPLAIN", "explain"), ("REVISIT", "returnPrompt")]:
            yy = b.p(label, yy, x=prompt_x, width=prompt_w, size=9, leading=12, bold=True, color=GREEN)
            yy = b.p(card[key], yy-5, x=prompt_x, width=prompt_w, size=10.1, leading=14)
            yy -= 17
        yy = b.p("Image description: " + plain(card["alt"]), yy, x=prompt_x,
                 width=prompt_w, size=8.4, leading=11.4, color=MUTED)
        if yy < 166:
            raise ValueError(f"Prompt block too long for photo {idx}: {card['title']}")
        y = 147
        title = card.get("sourceTitle") or card.get("photoTitle") or card["title"]
        y = b.p(f"Original photograph: {plain(title)} | Creator: {plain(card['creator'])}", y, size=7.7, leading=9.5)
        y = b.p(f"Location: {plain(card['location'])} | Date: {plain(card['date'])}", y-2, size=7.7, leading=9.5)
        uncertainty = " ".join(filter(None, [card.get("context", ""), card.get("notes", "")]))
        if uncertainty:
            y = b.p(uncertainty, y-2, size=7.7, leading=9.5, color=MUTED)
        license_url = card.get("licenseUrl") or card["sourceUrl"]
        attribution = (f'License: <link href="{escape(str(license_url), {chr(34): "&quot;"})}" color="#214b3d"><u>{esc(card["license"])}</u></link>'
                       + " | " + esc(card.get("changes", "Full frame fitted proportionally."))
                       + " PDF: resized, JPEG-encoded, full frame retained. Original license retained.")
        y = b.p(attribution, y-3, size=7.4, leading=9.5, raw=True)
        source = f'<link href="{escape(str(card["sourceUrl"]), {chr(34): "&quot;"})}" color="#214b3d"><u>Source: {esc(card["sourceUrl"])}</u></link>'
        b.p(source, y-3, size=7.1, leading=9.1, raw=True)
        b.end()
    b.save()


def validate(data, image_dir, need_images=True):
    cards = data.get("cards", [])
    if len(cards) != 15:
        raise ValueError(f"Expected 15 image cards; got {len(cards)}")
    required = ["id", "title", "filename", "alt", "creator", "license", "licenseUrl", "sourceUrl", "location", "date", "notice", "explain", "returnPrompt", "teacherNote"]
    for card in cards:
        missing = [k for k in required if k not in card]
        if missing:
            raise ValueError(f"Missing fields in {card.get('id')}: {missing}")
        if need_images and not (image_dir/card["filename"]).is_file():
            raise FileNotFoundError(image_dir/card["filename"])
        for key in ["sourceUrl", "licenseUrl"]:
            if card.get(key) and not str(card[key]).startswith("https://"):
                raise ValueError(f"Expected HTTPS {key} for {card['id']}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data", type=Path, default=REPO/"content"/"nature-today.json")
    parser.add_argument("--images", type=Path, default=REPO/"public"/"images"/"nature-today")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
    parser.add_argument("--only", choices=["all", "print", "images"], default="all")
    args = parser.parse_args()
    data = json.loads(args.data.read_text(encoding="utf-8"))
    validate(data, args.images, args.only != "print")
    setup_fonts()
    args.out.mkdir(parents=True, exist_ok=True)
    outputs = [
        ("Nature_Today_Teacher_Pack.pdf", lambda p: teacher_pack(p, data)),
        ("Nature_Today_Student_Journal.pdf", student_pack),
        ("Nature_Today_Image_Bank.pdf", lambda p: image_bank(p, data, args.images)),
    ]
    for filename, build in outputs:
        if args.only == "print" and filename.endswith("Image_Bank.pdf"):
            continue
        if args.only == "images" and not filename.endswith("Image_Bank.pdf"):
            continue
        path = args.out/filename
        build(path)
        print(path)


if __name__ == "__main__":
    main()
