"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";
import type { CurriculumRecord } from "./curriculum";
import { alignmentByArc, resolveAlignment, subjectCoverageNotes } from "./curriculum-alignment";
import { experienceKits, mediaFor, plainForStudents, spacesBookendsFor, studentStepsFor, studentTitleFor, wordHelpFor } from "./program-supports";
import { mathResourceRoutes, mathUpTopics, readinessFor } from "./readiness-supports";
import type { ExperienceKit, ExperienceMedia, LearningProgram, ProgramArc, ProgramExperience } from "./program-types";
import { mathPacksFor, mathSupportPacks, mathWordsFor } from "./math-program-supports";
import { MathStudentWorkshops, MathTeacherWorkshops, MathYearImplementation } from "./math-program";
import { ExperienceInfographic, LocalIndigenousResourceDock, LocalRestorationInfographic, ResponsibleDataInfographic } from "./infographic-library";
import { printClosest } from "./print-support";
import { spacesPolicyForActivity } from "./classroom-program";
import { WorldAtlasIntroduction, WorldContextBand, WorldJourney, WorldPortal } from "./unit-world-components";
import { worldFor, worldStyle } from "./unit-worlds";
import { StudentStepPath } from "./student-mission";
import { resolveStudentLessonContractForExperience } from "./student-lesson-contract";
import PatternTrailLab from "./math-pattern-lab";
import EquationBalanceLab from "./math-equation-lab";
import type { DailyLaunch } from "./daily-launch";
import { TeacherDailyLaunchButton } from "./student-home-portal";
import { ProjectorQuickStart } from "./projector-lesson";
import ProjectorCaseDeck from "./projector-case-deck";
import SourceMosaicLab from "./ela-source-mosaic-lab";
import GeometryScreenLab from "./math-geometry-screen-lab";
import ScoreboardRuleLab, { scoreboardRuleExperienceId } from "./math-scoreboard-lab";
import MathNumberScaleLab, { magnitudeScaleLabExperienceId } from "./math-number-scale-lab";
import EditRoomLab, { editRoomExperienceId } from "./ela-edit-room-lab";
import FourArtsLab, { fourArtsExperienceId } from "./four-arts-lab";
import { projectorReadinessFromSupport, resolveProjectorLessonSupport } from "./projector-lesson-supports";
import { TeacherRunSheet } from "./teacher-run-sheet";
import { StudentTeacherLayer } from "./student-teacher-layer";
import { coreCompetencyMovesFor } from "./learning-lens";
import { mathAnticsFor } from "./math-antics-routes";
import CurrentConnectionPlayer from "./current-connection";
import { currentConnectionForLesson } from "./current-connections";

type ProgramTabProps = {
  program: LearningProgram;
  record: CurriculumRecord;
  tab: string;
  selectedExperienceId: string;
  onExperience: (id: string) => void;
};

const spacesLabel = {
  none: "CLASSROOM PRACTICE · NO POST",
  optional: "SAVE ONLY IF USEFUL",
  required: "SELECTED SPACES EDU EVIDENCE",
  reuse: "FEEDS EXISTING POST · NO NEW POST",
} as const;

function spacesDisplayFor(experience: ProgramExperience) {
  const policy = spacesPolicyForActivity(experience.id);
  const decision = policy?.decision ?? experience.spacesUse;
  return {
    decision,
    teacherPrompt: policy?.teacherPrompt ?? experience.spacesPrompt,
    activityPrompt: policy ? experience.spacesPrompt : null,
    studentPrompt: policy?.studentPrompt ?? (experience.spacesUse === "required"
      ? "Your teacher will tell you what to save to SpacesEDU."
      : experience.spacesUse === "optional"
        ? "Save only if your teacher chooses this as useful evidence."
        : "Stay with the learning. No upload is needed."),
  };
}

function spacesActionFor(decision: keyof typeof spacesLabel) {
  if (decision === "required") return "SAVE";
  if (decision === "optional") return "CHOOSE";
  if (decision === "reuse") return "CARRY";
  return "PLAY";
}

function selectedExperience(program: LearningProgram, id: string) {
  return program.experiences.find((experience) => experience.id === id) ?? program.experiences[0];
}

function KitCards({ kit, student = false }: { kit: ExperienceKit; student?: boolean }) {
  return (
    <section className={`experience-kit ${student ? "student-experience-kit" : ""}`}>
      <header><div><p className="section-kicker">READY-TO-USE ACTIVITY KIT</p><h3>{student ? "Use these cards for the activity." : "Project these cards or print this page."}</h3></div>{!student && <button type="button" onClick={(event) => printClosest(event.currentTarget, ".experience-kit")}>Print this page</button>}</header>
      <div>{kit.cards.map(card => <article key={card.title}><span>{card.title}</span><p>{card.body}</p></article>)}</div>
    </section>
  );
}

function MediaStrip({ items, student = false }: { items: ExperienceMedia[]; student?: boolean }) {
  const routes = items.filter(item => item.type !== "image");
  if (!routes.length) return null;
  return (
    <section className={`program-media-strip ${student ? "student-media-strip" : ""}`}>
      <header><p className="section-kicker">MEDIA &amp; SOURCES WITH A JOB</p><h3>{student ? "Open only when your teacher asks." : "Every link includes a task and an offline route."}</h3></header>
      <div>{routes.map(item => {
        const content = <><span>{item.type.toUpperCase()}{item.duration ? ` · ${item.duration}` : ""}</span><strong>{item.label}</strong><small>{item.source}</small><p><b>{student ? "Your job: " : "Use it to: "}</b>{student ? item.studentTask : item.purpose}</p><em><b>If it will not open:</b> {item.fallback}</em></>;
        return item.url ? <a key={`${item.type}-${item.label}`} href={item.url} target="_blank" rel="noreferrer">{content}<i>OPEN ↗</i></a> : <article key={`${item.type}-${item.label}`}>{content}</article>;
      })}</div>
    </section>
  );
}

function experienceWords(experience: ProgramExperience, isMath = false) {
  const seen = new Set<string>();
  return [...(isMath ? mathWordsFor(experience.id) : []), ...wordHelpFor(experience.arcId)].filter(word => !seen.has(word.term) && seen.add(word.term));
}

function WordHelpPanel({ experience, isMath = false }: { experience: ProgramExperience; isMath?: boolean }) {
  const words = experienceWords(experience, isMath);
  if (!words.length) return null;
  return (
    <details className="program-word-help">
      <summary><span><small>NEW WORDS FOR THIS UNIT</small><strong>{words.map(word => word.term).join(" · ")}</strong></span><b>Open word help ▾</b></summary>
      <div>{words.map(word => <article key={word.term}><strong>{word.term}</strong><p>{word.meaning}</p><small><b>Example:</b> {word.example}</small></article>)}</div>
    </details>
  );
}

function MathUpMap({ program }: { program: LearningProgram }) {
  if (program.subject !== "Mathematics") return null;
  const strands = [
    { id: "N", label: "Number" },
    { id: "PR", label: "Patterns & Relations" },
    { id: "SS", label: "Shape & Space" },
    { id: "SP", label: "Statistics & Probability" },
  ] as const;
  return (
    <section className="mathup-map">
      <header><div><p className="section-kicker">GRADE 6 CURRICULUM CHECK</p><h2>Math Antics explains. The class investigates. MathUP checks and extends.</h2><p>The 22 MathUP topics stay mapped here so nothing important disappears, but they do not have to dictate the live lesson.</p></div><span>22 TOPICS · 4 STRANDS</span></header>
      <div>{strands.map(strand => <article key={strand.id}><header><b>{strand.id}</b><strong>{strand.label}</strong></header>{mathUpTopics.filter(topic => topic.strand === strand.id).map(topic => <section key={`${topic.strand}-${topic.title}`}><div><strong>{topic.starred && <span aria-label="starred in supplied list">★ </span>}{topic.title}</strong><small>{topic.timing} · {topic.role}{topic.pairedWith ? ` · paired with ${topic.pairedWith}` : ""}</small></div><p>{topic.experienceIds.map(id => program.experiences.find(item => item.id === id)?.title ?? mathSupportPacks.find(pack => pack.id === id)?.shortTitle ?? id).join(" · ")}</p></section>)}</article>)}</div>
      <footer><span>★ means “starred in the supplied MathUP list.”</span><strong>Use this map to check coverage and find an optional MathUP game, centre, assessment, or extra-practice route.</strong></footer>
    </section>
  );
}

function MathResourceDock({ experience }: { experience: ProgramExperience }) {
  const packTopics = new Set(mathPacksFor(experience.id).flatMap(pack => pack.mathUpTopics));
  const directTopics = mathUpTopics.filter(topic => topic.experienceIds.includes(experience.id) || packTopics.has(topic.title));
  const topics = directTopics.length ? directTopics : mathUpTopics.filter(topic => topic.arcId === experience.arcId);
  const mathAntics = mathAnticsFor(experience.id);
  if (!topics.length) return null;
  return (
    <section className="math-resource-dock">
      <header><div><p className="section-kicker">MATHEMATICS RESOURCE DOCK</p><h3>See it → try it together → practise if useful</h3></div><span>{topics.length} MATCHING MATHUP TOPIC{topics.length === 1 ? "" : "S"}</span></header>
      <div className="math-resource-sequence">
        <article><b>1 · MATH ANTICS</b><p>Show the matching explanation. Pause to predict, sketch, or answer together instead of watching passively.</p></article>
        <article><b>2 · THIS SCREEN</b><p>Use the class investigation to move, test, repair, compare, and explain the idea together.</p></article>
        <article><b>3 · MATHUP · OPTIONAL</b><p>Check alignment, then choose a game, centre, quick assessment, or extra practice only when the class needs it.</p></article>
      </div>
      <div className="math-resource-topics">{topics.map(topic => <span key={`${topic.strand}-${topic.title}`}><b>{topic.strand}</b>{topic.starred && "★ "}{topic.title}<small>{topic.timing}</small></span>)}</div>
      <footer><a href={mathAntics?.url ?? mathResourceRoutes.mathAntics} target="_blank" rel="noreferrer">Open Math Antics{mathAntics ? ` · ${mathAntics.title}` : " library"} ↗</a>{mathAntics?.secondary && <a href={mathAntics.secondary.url} target="_blank" rel="noreferrer">Also useful · {mathAntics.secondary.title} ↗</a>}{experience.id === "magnitude-gallery" && <a href="https://apps.mathlearningcenter.org/number-line/" target="_blank" rel="noreferrer">Open free number-line tool ↗</a>}<a href={mathResourceRoutes.mathUp} target="_blank" rel="noreferrer">Open school MathUP access ↗</a><p>Math Antics is the preferred explanation route. MathUP remains the curriculum cross-check and optional game/practice shelf. This site supplies the shared-screen investigation.</p></footer>
    </section>
  );
}

function PacketCatArt({ piece }: { piece?: number }) {
  const column = piece === undefined ? 0 : piece % 3;
  const row = piece === undefined ? 0 : Math.floor(piece / 3);
  const viewBox = piece === undefined ? "0 0 300 200" : `${column * 100} ${row * 100} 100 100`;
  return (
    <svg viewBox={viewBox} role="img" aria-label={piece === undefined ? "Complete simple cat picture" : `Piece ${piece + 1} of the cat picture`} preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="200" fill="#dbeef2" />
      <circle cx="40" cy="36" r="18" fill="#f4c967" />
      <path d="M0 172 Q58 145 118 171 T300 160 V200 H0Z" fill="#83b792" />
      <path d="M103 72 L116 12 L145 70Z" fill="#c87945" stroke="#704631" strokeWidth="5" />
      <path d="M158 69 L187 12 L199 78Z" fill="#c87945" stroke="#704631" strokeWidth="5" />
      <path d="M115 48 L120 26 L134 54Z M172 52 L185 28 L190 58Z" fill="#edb2a5" />
      <ellipse cx="151" cy="163" rx="64" ry="54" fill="#cf8651" stroke="#704631" strokeWidth="5" />
      <circle cx="151" cy="103" r="58" fill="#d99058" stroke="#704631" strokeWidth="5" />
      <ellipse cx="130" cy="94" rx="7" ry="10" fill="#253d43" />
      <ellipse cx="174" cy="94" rx="7" ry="10" fill="#253d43" />
      <path d="M144 113 Q151 121 158 113 Q151 105 144 113Z" fill="#754239" />
      <path d="M151 121 Q143 132 134 125 M151 121 Q159 132 168 125" fill="none" stroke="#704631" strokeWidth="3" strokeLinecap="round" />
      <path d="M123 115 L72 107 M124 123 L68 128 M179 115 L230 106 M178 123 L236 130" stroke="#704631" strokeWidth="3" strokeLinecap="round" />
      <path d="M203 156 Q258 129 274 169 Q281 188 255 192" fill="none" stroke="#704631" strokeWidth="18" strokeLinecap="round" />
      <path d="M119 178 V198 M181 178 V198" stroke="#704631" strokeWidth="16" strokeLinecap="round" />
    </svg>
  );
}

function ObjectStoryImagePicker({ images }: { images: ExperienceMedia[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex] ?? images[0];
  if (!selected?.localSrc) return null;
  return <section className="object-story-gallery" aria-labelledby="object-story-gallery-title">
    <header><div><small>OBJECT STORY IMAGE GALLERY</small><h3 id="object-story-gallery-title">Choose evidence for two different stories.</h3><p>The picture gives you clues—not a correct history. Partners name what is visible before inventing.</p></div><span>{images.length} IMAGE SETS</span></header>
    <nav aria-label="Choose an object story image">{images.map((image, index) => <button type="button" key={image.localSrc ?? image.label} aria-current={index === selectedIndex ? "true" : undefined} onClick={() => setSelectedIndex(index)}><b>{String.fromCharCode(65 + index)}</b><span>{image.label.replace(/^Set [A-Z] · /, "")}</span></button>)}</nav>
    <figure><img src={selected.localSrc} alt={`Object story choice: ${selected.label}`} /><figcaption><small>SET {String.fromCharCode(65 + selectedIndex)} · VISIBLE CLUES FIRST</small><strong>{selected.label}</strong><p>{selected.studentTask}</p></figcaption></figure>
    <section className="object-story-practice" aria-label="Pair and group storytelling practice">
      <header><small>PAIR PRACTICE · THEN A GROUP RELAY</small><strong>Everybody tells, listens, questions, and revises.</strong></header>
      <ol>
        <li><b>1</b><span><strong>Round 1</strong> Partner A tells for 60 seconds. Partner B maps beginning, turn, and ending.</span></li>
        <li><b>2</b><span><strong>Question + retell</strong> B asks one exact clarity question. A retells with one useful change.</span></li>
        <li><b>3</b><span><strong>Round 2</strong> Switch roles and choose a different object or image set.</span></li>
        <li><b>4</b><span><strong>Group of four</strong> Build a new story relay: beginning, turn, ending, continuity check.</span></li>
      </ol>
    </section>
  </section>;
}

function PacketRouteDiagram() {
  return <section className="packet-route-visual" aria-label="A simplified network showing a student device, two routers, a server, two routes, and six numbered packets">
    <header><span>SIMPLIFIED NETWORK MODEL</span><strong>Ask for it → route the packets → check and rebuild it</strong></header>
    <div className="packet-network">
      <article className="packet-device"><small>REQUEST + DESTINATION</small><b>STUDENT DEVICE</b><p>Requests the picture, checks 1–6, and reassembles it.</p></article>
      <i className="route route-a">ROUTE A</i><i className="route route-b">ROUTE B</i>
      <article className="packet-router router-a"><small>ROUTER A</small><b>CHOOSE NEXT ROUTE</b></article>
      <article className="packet-router router-b"><small>ROUTER B</small><b>CHOOSE NEXT ROUTE</b></article>
      <article className="packet-server"><small>SOURCE</small><b>SERVER</b><p>Provides the six-piece cat picture.</p></article>
    </div>
    <div className="packet-chips">{[1,2,3,4,5,6].map(number => <span key={number}><b>{number}</b><small>OF 6</small></span>)}<em>Packet 4 missing? Request 4 again.</em></div>
    <section className="packet-picture-kit">
      <header><div><span>PRINT OR PROJECT · CUT ON THE SIX CARD EDGES</span><strong>Six-piece cat-picture packet set</strong></div><figure><PacketCatArt /><figcaption>SERVER COPY · COMPLETE PICTURE</figcaption></figure></header>
      <div>{[0,1,2,3,4,5].map(piece => <article key={piece}><PacketCatArt piece={piece} /><b>PACKET {piece + 1} OF 6</b><small>DESTINATION: STUDENT DEVICE</small></article>)}</div>
    </section>
    <footer>Our role-play is a useful model, not a complete diagram of the Internet. Real networks use addresses, protocols, many devices, and much faster automated decisions.</footer>
  </section>;
}

function PacketRescueVisualPicker({ images }: { images: ExperienceMedia[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const visualSteps = [
    { label: "1 · TABLE MODEL", image: images[0], caption: "Split and number one message." },
    { label: "2 · ROUTE MAP", image: null, caption: "Name the devices, routes, and check." },
    { label: "3 · HUMAN NETWORK", image: images[1], caption: "Become the system and test a failure." },
  ];
  const selected = visualSteps[selectedIndex] ?? visualSteps[0];
  return <section className="packet-visual-sequence" aria-labelledby="packet-visual-sequence-title">
    <header><div><small>THREE VIEWS · ONE SYSTEM</small><h3 id="packet-visual-sequence-title">See it small. Map it exactly. Become the network.</h3></div><span>ONE VIEW AT A TIME</span></header>
    <nav aria-label="Choose a packet rescue visual">{visualSteps.map((step, index) => <button type="button" key={step.label} aria-current={selectedIndex === index ? "true" : undefined} onClick={() => setSelectedIndex(index)}><b>{step.label}</b><span>{step.caption}</span></button>)}</nav>
    {selected.image?.localSrc ? <figure><Image unoptimized src={selected.image.localSrc} alt={selected.image.label} width={1792} height={1008} sizes="(max-width: 900px) 100vw, 1100px" /><figcaption><small>GENERATED FICTIONAL MODEL · USE THE LABELLED MAP FOR EXACT TERMS</small><strong>{selected.image.label}</strong><p>{selected.image.studentTask}</p></figcaption></figure> : <PacketRouteDiagram />}
  </section>;
}

function ExactAnchorVisual({ experience, media }: { experience: ProgramExperience; media: ExperienceMedia[] }) {
  const image = media.find(item => item.type === "image" && item.localSrc);
  if (experience.id === "ordinary-object-story") return <ObjectStoryImagePicker images={media.filter((item) => item.type === "image" && item.localSrc)} />;
  if (experience.id === "packet-rescue") return <PacketRescueVisualPicker images={media.filter((item) => item.type === "image" && item.localSrc)} />;
  if (experience.id === "everyone-in-game") return <>
    {image && <figure className="program-learning-visual visual-everyone-in-game">
      <Image unoptimized src={image.localSrc} alt="Illustrated school field where Grade 6 students contribute through passing, signalling, observing, adjusting boundaries, resting, and rejoining" width={1672} height={941} sizes="(max-width: 900px) 100vw, 1100px" />
      <figcaption><span>FICTIONAL GAME SCENE · NOTICE BEFORE CHANGING</span><strong>{image.label}</strong><p>{image.studentTask}</p></figcaption>
    </figure>}
    <section className="game-court-visual" aria-label="Top-down court diagram for the no-elimination passing game"><header><span>BASE GAME · TOP VIEW</span><strong>Five passes to five different teammates</strong></header><div><i>START</i>{["A", "B", "C", "D", "E", "F", "G", "H"].map((label, index) => <b key={label} className={`player-${index + 1}`}>{label}</b>)}<em>SAFE EDGE</em></div><p>Spread out, keep heads up, use soft equipment, and offer a seated or walking route.</p></section>
  </>;
  const imageAlt = experience.id === "edit-room"
    ? "Wide fictional school art-room scene showing a calm, supervised cleanup after supplies spill while other activities continue"
    : experience.id === "three-voices"
      ? "Fictional shared moment in a school library courtyard: one student stands by an open doorway, one is beside a table where a box of colourful project pieces has tipped, and one carries a folder across the room"
    : experience.id.startsWith("bloxels-")
      ? "Original pixel-art story world with a young adventurer, forest path, bridge, glowing doorway, and safe destination in the distance"
      : "Six ordinary objects arranged on a worn wooden classroom table: key, ticket, spoon, red shoelace, toy wheel, and landscape photograph";
  const imageLabel = experience.id === "edit-room"
    ? "GENERATED FICTIONAL EVENT · FULL CONTEXT"
    : experience.id === "three-voices"
      ? "GENERATED FICTIONAL SHARED MOMENT · FACTS FIRST"
    : experience.id.startsWith("bloxels-")
      ? "ORIGINAL GENERATED PIXEL WORLD · NOT A GAME INTERFACE"
      : "GENERATED OBSERVATION SCENE · FICTIONAL OBJECT SET";
  if (image) return (
    <figure className={`program-learning-visual visual-${experience.id}`}>
      <img src={image.localSrc} alt={imageAlt} />
      {experience.id === "three-voices" && <div className="three-voices-viewpoints" aria-label="Three places to look from"><span><b>1</b>BY THE DOOR</span><span><b>2</b>AT THE TABLE</span><span><b>3</b>ACROSS THE ROOM</span></div>}
      <figcaption><span>{imageLabel}</span><strong>{image.label}</strong><p>{image.studentTask}</p></figcaption>
    </figure>
  );
  if (experience.id === "magnitude-gallery") return (
    <section className="magnitude-visual" aria-label="Four nested number lines from thousandths to billions">
      <header><span>EXACT VISUAL</span><strong>One digit pattern. Four very different scales.</strong></header>
      {[["0", "0.004", "0.04", "0.4", "1"], ["0", "4", "40", "400", "1,000"], ["0", "4,000", "40,000", "400,000", "1 million"], ["0", "4 million", "40 million", "400 million", "1 billion"]].map((line, index) => <div key={line.join("-")}><small>ZOOM {index + 1}</small><span>{line.map(value => <b key={value}>{value}</b>)}</span></div>)}
    </section>
  );
  if (experience.id === "graph-story-lab") return (
    <section className="same-data-graphs" aria-label="Two line graphs using the same six values with different vertical scales">
      <header><span>SAME DATA · DIFFERENT SCALE</span><strong>48, 50, 49, 52, 53, 54 litres</strong></header>
      <div><figure><svg viewBox="0 0 360 190" role="img" aria-label="Graph from zero to sixty litres showing a small rise"><path d="M42 10V155H345"/><polyline points="50,39 105,34 160,36 215,29 270,27 325,24"/><text x="4" y="18">60</text><text x="14" y="158">0</text></svg><figcaption>Scale: 0–60 L</figcaption></figure><figure><svg viewBox="0 0 360 190" role="img" aria-label="Graph from forty-seven to fifty-five litres showing the same rise as much steeper"><path d="M42 10V155H345"/><polyline points="50,137 105,101 160,119 215,65 270,47 325,29"/><text x="4" y="18">55</text><text x="4" y="158">47</text></svg><figcaption>Scale: 47–55 L</figcaption></figure></div>
      <p>Both are accurate. Which one gives the more useful first impression for the question?</p>
    </section>
  );
  if (experience.id === "zoo-design-studio") return (
    <section className="zoo-design-visual" aria-label="Fictional thirty metre by twenty-four metre zoo site with example habitat shapes and an accessible path">
      <header><span>FICTIONAL DESIGN SITE · 30 m × 24 m</span><strong>Every square represents 1 m. Your final plan must use exact dimensions.</strong></header>
      <div>
        <svg viewBox="0 0 600 480" role="img" aria-label="Grid with sample rectangle, triangle, parallelogram, trapezoid, L-shape, entry, path, and quiet area">
          <defs><pattern id="zoo-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" /></pattern></defs>
          <rect width="600" height="480" className="site"/><rect width="600" height="480" fill="url(#zoo-grid)"/>
          <path className="path" d="M0 440H340V285H540V120"/><text x="12" y="427">ENTRY · 2 m PATH</text>
          <rect className="habitat habitat-a" x="50" y="40" width="160" height="120"/><text x="78" y="104">8 × 6</text>
          <path className="habitat habitat-b" d="M250 40H410V160Z"/><text x="285" y="90">6–8–10</text>
          <path className="habitat habitat-c" d="M60 210H240L210 290H30Z"/><text x="86" y="257">b9 · h4</text>
          <path className="habitat habitat-d" d="M320 205H520L560 285H280Z"/><text x="350" y="254">b10/16 · h4</text>
          <path className="habitat habitat-f" d="M60 330H260V390H180V450H60Z"/><text x="93" y="375">L-SHAPE</text>
          <rect className="quiet" x="460" y="350" width="80" height="80"/><text x="470" y="382">QUIET</text><text x="478" y="402">4 × 4</text>
        </svg>
        <aside><b>THIS IS A STARTING MODEL, NOT THE ANSWER</b><p>Choose six habitat cards. Test at least two layouts. Keep a 2 m route to every habitat and mark every perpendicular height.</p><span>CHECK AREA</span><span>CHECK PERIMETER</span><span>CHECK ACCESS</span><span>REVISE</span></aside>
      </div>
    </section>
  );
  if (experience.id === "search-under-hood") return (
    <section className="fictional-search-results" aria-label="Fictional search results for a park shade question">
      <header><span>FICTIONAL SEARCH SCREEN · NO LIVE SEARCH NEEDED</span><strong>Which result deserves the first click—and why?</strong></header>
      <article><small>SPONSORED · CoolPlay Products · no date</small><h4>Every school needs our shade system</h4><p>“The number one answer for happier outdoor spaces.”</p><b>SELLING A PRODUCT</b></article>
      <article><small>City of Surrey · Parks planning · Updated May 2026</small><h4>Fleetwood park shade and access planning</h4><p>Draft maps, consultation notes, constraints, and next decision dates.</p><b>PUBLIC PLANNING SOURCE</b></article>
      <article><small>QuickLife channel · short video · creator not listed</small><h4>The one trick that fixes hot playgrounds</h4><p>Popular clip; no location, measurements, or linked evidence.</p><b>POPULARITY IS NOT PROOF</b></article>
    </section>
  );
  if (experience.id === "career-constellation") return (
    <section className="career-constellation-visual" aria-label="A constellation connecting one community project with many kinds of work"><header><span>SYSTEMS VIEW</span><strong>A community project is a network—not one hero job.</strong></header><div><b>COMMUNITY EVENT</b>{["Planner", "Caretaker", "Technician", "Artist", "Translator", "Safety lead", "Cook", "Volunteer"].map(role => <span key={role}>{role}</span>)}</div></section>
  );
  return null;
}

function TeacherExperienceDetail({ experience, arc, record, program }: { experience: ProgramExperience; arc: ProgramArc; record: CurriculumRecord; program: LearningProgram }) {
  const kit = experienceKits[experience.id];
  const media = mediaFor(experience.id);
  const alignment = alignmentByArc[arc.id];
  const resolved = alignment ? resolveAlignment(record, alignment) : null;
  const phasedCoordinateBridge = program.subject === "Mathematics" && experience.id === "transformation-cipher";
  const spaces = spacesDisplayFor(experience);
  const studentSteps = studentStepsFor(experience);
  const studentContract = resolveStudentLessonContractForExperience({
    ...experience,
    steps: studentSteps.map((step) => step.action),
  });
  const resolvedProjectorSupport = resolveProjectorLessonSupport(experience);
  const readinessLaunch = resolvedProjectorSupport.isCustom
    ? projectorReadinessFromSupport(resolvedProjectorSupport.support)
    : readinessFor(experience);
  const currentConnection = currentConnectionForLesson(experience.id);
  const teacherRunSteps = currentConnection
    ? [{ title: "Source Lab · Quick Look", action: "Open the named source on the projector. Move through Look, Notice, Claim, and Next as one class; students can point, talk, use the board, or use paper.", finishCheck: "The class builds one careful sentence that includes the source date or status and names what the source cannot prove." }, ...studentContract.steps]
    : studentContract.steps;
  const mathAntics = program.subject === "Mathematics" ? mathAnticsFor(experience.id) : null;
  const dailyLaunch = {
    kind: "generic",
    genericId: experience.id,
    worldId: arc.id,
    subject: program.subject,
    unit: arc.title,
    title: studentTitleFor(experience),
    question: studentContract.challenge,
    firstAction: studentContract.firstAction,
    finish: studentContract.finishEvidence.at(-1) ?? plainForStudents(experience.product),
  } satisfies DailyLaunch;
  return (
    <article className="program-experience-detail">
      <TeacherDailyLaunchButton launch={dailyLaunch} />
      <TeacherRunSheet
        title={studentTitleFor(experience)}
        duration={experience.duration}
        bigIdea={arc.question}
        coreCompetencies={coreCompetencyMovesFor(program.subject)}
        learningQuestion={studentContract.challenge}
        learningPurpose={studentContract.why}
        firstAction={studentContract.firstAction}
        steps={teacherRunSteps}
        finishEvidence={studentContract.finishEvidence}
        saveMessage={studentContract.saveAction.message}
        readiness={{ ideas: readinessLaunch.background, modelTitle: readinessLaunch.example.title, modelConclusion: readinessLaunch.example.conclusion, check: readinessLaunch.questions[0], reteach: readinessLaunch.reteach }}
        prepare={experience.teacherPrep.slice(0, 3)}
        materials={kit?.gather.length ? kit.gather : experience.materials}
        shortRoute={kit?.shortRoute}
        extension={phasedCoordinateBridge ? "Continue into negative coordinates only after students can describe and verify the first-quadrant moves." : undefined}
        dayPlanLesson={{ sourceId: experience.id, subject: program.subject, title: studentTitleFor(experience), timing: experience.duration, runSteps: teacherRunSteps.map((step) => `${step.title}: ${step.action}`) }}
        launchResource={mathAntics ?? undefined}
      />

      <details className="teacher-planning-details">
        <summary><span><small>MORE DETAIL</small><strong>Printables, sources, answers, and curriculum</strong></span><b>Open ▾</b></summary>
        <div>
          {program.subject === "Mathematics" && <MathTeacherWorkshops experienceId={experience.id} placement={phasedCoordinateBridge ? "extension" : "before"} />}
          {program.subject === "Mathematics" && <MathResourceDock experience={experience} />}
          {kit && <KitCards kit={kit} />}
          <WordHelpPanel experience={experience} isMath={program.subject === "Mathematics"} />
          <MediaStrip items={media} />
          <LocalIndigenousResourceDock experienceId={experience.id} />
          {resolved && <section className="experience-alignment-note"><header><p className="section-kicker">WHY THIS FITS THE BC CURRICULUM</p><span>{alignment.stage.toUpperCase()}</span></header><p>{alignment.note}</p><div><span><b>BIG IDEA</b>{resolved.bigIdeas[0]}</span><span><b>COMPETENCY</b>{resolved.competencies[0]}</span><span><b>CONTENT</b>{resolved.content[0] ?? "Design-cycle competency focus; no optional content module is overstated."}</span></div></section>}
          <footer className="program-spaces-note">
            <span>{spacesActionFor(spaces.decision)}</span>
            <div><strong>{spacesLabel[spaces.decision]}</strong><p>{spaces.teacherPrompt}</p>{spaces.activityPrompt && <p><b>Activity-specific evidence:</b> {spaces.activityPrompt}</p>}</div>
          </footer>
        </div>
      </details>
    </article>
  );
}

export function LearningProgramTab({ program, record, tab, selectedExperienceId, onExperience }: ProgramTabProps) {
  const selected = selectedExperience(program, selectedExperienceId);
  const selectedArc = program.arcs.find(arc => arc.id === selected.arcId) ?? program.arcs[0];
  const selectedWorld = worldFor(selectedArc.id);

  if (tab === "Units") return (
    <div className="learning-program">
      <section className="program-heading">
        <div><p className="section-kicker">FIRST-PASS YEAR-LONG PROGRAM</p><h2>{program.title}</h2><p>{program.subtitle}</p></div>
        <span>{program.cadence}</span>
      </section>
      <section className="program-north-star"><span>WHY THIS PROGRAM EXISTS</span><blockquote>{program.northStar}</blockquote><div>{program.principles.map((principle, index) => <p key={principle}><b>{String(index + 1).padStart(2, "0")}</b>{principle}</p>)}</div></section>
      <WorldAtlasIntroduction />
      <MathUpMap program={program} />
      {program.subject === "Mathematics" && <MathYearImplementation program={program} />}
      <div className="program-arc-grid">
        {program.arcs.map((arc) => {
          const theme = worldFor(arc.id);
          return (
          <article key={arc.id} className="world-themed-card" data-world={theme.id} style={worldStyle(theme)}>
            <header><span>{arc.number}</span><small>{arc.timing}</small></header>
            <WorldPortal theme={theme} compact />
            <h3>{arc.title}</h3>
            <blockquote>{arc.question}</blockquote>
            <p>{arc.promise}</p>
            <div>{arc.curriculum.map((item) => <span key={item}>{item}</span>)}</div>
            <footer><strong>{arc.experienceIds.length} activity choices</strong><button onClick={() => onExperience(arc.experienceIds[0])}>Open first activity →</button></footer>
            <details className="arc-spaces-bookends"><summary>SpacesEDU possibilities ▾</summary>{[spacesBookendsFor(arc, program.experiences).entry, spacesBookendsFor(arc, program.experiences).exit].map(item => <section key={item.title}><strong>{item.title}</strong><p>{item.prompt}</p><div>{item.choices.map(choice => <span key={choice}>{choice}</span>)}</div></section>)}</details>
          </article>
        )})}
      </div>
    </div>
  );

  if (tab === "Lessons") return (
    <div className="learning-program program-lessons world-surface" data-world={selectedWorld.id} style={worldStyle(selectedWorld)}>
      <section className="program-heading">
        <div><p className="section-kicker">PLAN / TTOC WORKSPACE</p><h2>Choose a lesson, scan the whole plan, then teach from Teach View.</h2><p>Big idea, question, Core Competencies, materials, and every teaching move stay together. Curriculum tracing and extra preparation remain folded away.</p></div>
        <span>{program.experiences.length} LESSONS</span>
      </section>
      <div className="program-lesson-layout">
        <nav aria-label={`${program.subject} signature experiences`}>
          {program.arcs.map((arc) => (
            <section key={arc.id}>
              <p>{arc.number} · {arc.title}</p>
              {arc.experienceIds.map((id) => {
                const experience = program.experiences.find((item) => item.id === id);
                if (!experience) return null;
                return <button key={id} className={selected.id === id ? "selected" : ""} onClick={() => onExperience(id)}><span>{experience.kind}</span><strong>{experience.title}</strong><small>{experience.duration}</small></button>;
              })}
            </section>
          ))}
        </nav>
        <div>
          <WorldContextBand theme={selectedWorld} teacher />
          <TeacherExperienceDetail experience={selected} arc={selectedArc} record={record} program={program} />
        </div>
      </div>
    </div>
  );

  if (tab === "Alignment") {
    const coverage = subjectCoverageNotes[program.subject];
    return (
      <div className="learning-program program-alignment">
        <section className="program-heading"><div><p className="section-kicker">TRACEABLE CURRICULUM MAP</p><h2>What each theme introduces, practises, and demonstrates.</h2><p>The map uses the exact Grade 6 Big Ideas, curricular competencies, and content stored in this site. Gaps stay visible instead of being quietly labelled covered.</p></div><a href={record.sourceUrl} target="_blank" rel="noreferrer">Official curriculum ↗</a></section>
        {coverage && <section className="coverage-honesty"><header><span>{coverage.scope}</span><h3>{coverage.strength}</h3></header><div><p className="section-kicker">NEXT COVERAGE WORK</p>{coverage.next.map(item => <p key={item}><span>→</span>{item}</p>)}</div></section>}
        <div className="alignment-arc-list">{program.arcs.map(arc => {
          const item = alignmentByArc[arc.id];
          const resolved = item ? resolveAlignment(record, item) : null;
          return <article key={arc.id}><header><span>{arc.number}</span><div><small>{item?.stage ?? "MAP NEEDED"}</small><h3>{arc.title}</h3><p>{item?.note}</p></div></header>{resolved && <div><section><b>BIG IDEAS</b>{resolved.bigIdeas.map(text => <p key={text}>{text}</p>)}</section><section><b>CURRICULAR COMPETENCIES</b>{resolved.competencies.map(text => <p key={text}>{text}</p>)}</section><section><b>CONTENT</b>{resolved.content.length ? resolved.content.map(text => <p key={text}>{text}</p>) : <p>No optional content module claimed in this arc.</p>}</section></div>}</article>;
        })}</div>
      </div>
    );
  }

  if (tab === "Assessments") return (
    <div className="learning-program program-assessment">
      <section className="program-heading"><div><p className="section-kicker">LEAN EVIDENCE PLAN</p><h2>Do more learning than uploading.</h2><p>Teacher observation, conferencing, drafts, games, rehearsals, and demonstrations remain valid evidence. SpacesEDU holds only selected learning stories.</p></div><span>BC PROFICIENCY SCALE</span></section>
      <div className="program-assessment-grid">
        <article><span>01</span><h3>Practice</h3><p>{program.assessment.practice}</p></article>
        <article><span>02</span><h3>Checkpoints</h3><p>{program.assessment.checkpoints}</p></article>
        <article><span>03</span><h3>Portfolio</h3><p>{program.assessment.portfolio}</p></article>
      </div>
      <section className="program-lookfor-panel"><div><p className="section-kicker">SUBJECT-SPECIFIC PROFICIENCY</p><h3>Assess the learning—not production polish.</h3></div><ul>{program.assessment.proficiency.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></section>
      <section className="spaces-bookend-overview"><p className="section-kicker">OPTIONAL BEGINNING + SELECTED END EVIDENCE</p><h3>Students can show growth in different forms.</h3><p>These are reflection possibilities. The live lesson policy decides whether work is saved, carried into an existing post, or kept in class.</p><div>{program.arcs.map(arc => { const bookends = spacesBookendsFor(arc, program.experiences); return <article key={arc.id}><span>{arc.number}</span><div><strong>{arc.title}</strong><p><b>BEGIN:</b> {bookends.entry.prompt}</p><p><b>END:</b> {bookends.exit.prompt}</p><small>{bookends.exit.choices.join(" · ")}</small></div></article>; })}</div></section>
      <div className="program-spaces-summary">{program.experiences.map((item) => ({ item, spaces: spacesDisplayFor(item) })).filter(({ spaces }) => spaces.decision !== "none").map(({ item, spaces }) => <article key={item.id}><span className={`spaces-${spaces.decision}`}>{spaces.decision.toUpperCase()}</span><div><strong>{item.title}</strong><p>{spaces.teacherPrompt}</p>{spaces.activityPrompt && <p><b>Activity-specific evidence:</b> {spaces.activityPrompt}</p>}</div></article>)}</div>
    </div>
  );

  return (
    <div className="learning-program program-resources">
      <section className="program-heading"><div><p className="section-kicker">PURPOSEFUL RESOURCE ROUTES</p><h2>Open a resource because it improves the learning.</h2><p>Each route has a clear classroom job. Preview current content before projecting it.</p></div><span>{program.resources.length} CURATED ROUTES</span></section>
      <MathUpMap program={program} />
      <div className="program-resource-grid">{program.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer"><header><span>{resource.source}</span><b>{resource.gradeFit}</b></header><h3>{resource.label}</h3><p>{resource.purpose}</p><footer>Open source <span>↗</span></footer></a>)}</div>
    </div>
  );
}

type StudentProgramProps = {
  program: LearningProgram;
  record: CurriculumRecord;
  selectedExperienceId: string;
  onExperience: (id: string) => void;
};

export function StudentLearningProgram({ program, record, selectedExperienceId, onExperience }: StudentProgramProps) {
  const selected = selectedExperience(program, selectedExperienceId);
  const [projectorPart, setProjectorPart] = useState(0);
  const selectedArc = program.arcs.find((arc) => arc.id === selected.arcId) ?? program.arcs[0];
  const steps = studentStepsFor(selected);
  const kit = experienceKits[selected.id];
  const media = mediaFor(selected.id);
  const phasedCoordinateBridge = program.subject === "Mathematics" && selected.id === "transformation-cipher";
  const spaces = spacesDisplayFor(selected);
  const studentContract = resolveStudentLessonContractForExperience({
    ...selected,
    steps: steps.map((step) => step.action),
  });
  const usesInteractiveLab = selected.id === "pattern-forecast" || selected.id === "equation-balance" || selected.id === "source-mosaic" || selected.id === "geometry-field-lab" || selected.id === scoreboardRuleExperienceId || selected.id === magnitudeScaleLabExperienceId || selected.id === editRoomExperienceId || selected.id === fourArtsExperienceId;
  const resolvedProjectorSupport = resolveProjectorLessonSupport(selected);
  const projectorSupport = resolvedProjectorSupport.support;
  const useMathConceptPack = program.subject === "Mathematics" && !resolvedProjectorSupport.isCustom;
  const readinessLaunch = selected.id === magnitudeScaleLabExperienceId
    ? projectorReadinessFromSupport(projectorSupport)
    : usesInteractiveLab || useMathConceptPack
      ? readinessFor(selected)
      : projectorReadinessFromSupport(projectorSupport);
  const currentConnection = currentConnectionForLesson(selected.id);
  const showProjectorQuickStart = !usesInteractiveLab || selected.id === magnitudeScaleLabExperienceId;
  const mathAntics = program.subject === "Mathematics" ? mathAnticsFor(selected.id) : null;
  const projectorWords = useMathConceptPack ? experienceWords(selected, true) : projectorSupport.terms;
  const projectorCards = kit?.cards.filter((card) => !/(answer|answer key|core answers)/i.test(card.title)) ?? [];
  const missionSteps = studentContract.steps.map((step) => ({ title: step.title, action: step.action, show: step.finishCheck }));
  const theme = worldFor(selectedArc.id);
  const alignment = alignmentByArc[selectedArc.id];
  const resolvedAlignment = alignment ? resolveAlignment(record, alignment) : null;
  const worldStops = selectedArc.experienceIds.map((id) => {
    const experience = program.experiences.find((item) => item.id === id);
    return { id, title: experience ? studentTitleFor(experience) : id, label: experience?.kind };
  });
  const interactiveLab: ReactNode = selected.id === "pattern-forecast" ? <PatternTrailLab />
    : selected.id === "equation-balance" ? <EquationBalanceLab />
      : selected.id === "source-mosaic" ? <SourceMosaicLab />
        : selected.id === "geometry-field-lab" ? <GeometryScreenLab />
          : selected.id === scoreboardRuleExperienceId ? <ScoreboardRuleLab />
            : selected.id === magnitudeScaleLabExperienceId ? <MathNumberScaleLab />
              : selected.id === editRoomExperienceId ? <EditRoomLab />
                : selected.id === fourArtsExperienceId ? <FourArtsLab />
                  : null;

  const parts: Array<{ label: string; verb: string; content: ReactNode }> = [];
  if (usesInteractiveLab) {
    parts.push({ label: "Explore", verb: "Try", content: <div id="mission-path" className="student-interactive-mission projector-active-object">{interactiveLab}</div> });
  } else {
    parts.push({ label: "Look", verb: "Notice", content: <section className="projector-active-object projector-look-stage"><ExactAnchorVisual experience={selected} media={media} /><ExperienceInfographic experienceId={selected.id} />{selected.id === "graph-story-lab" && <><LocalRestorationInfographic /><ResponsibleDataInfographic /></>}</section> });
    if (showProjectorQuickStart) parts.push({ label: "Learn", verb: "See it", content: <ProjectorQuickStart key={selected.id} launch={readinessLaunch} words={projectorWords} question={projectorSupport.purpose} firstMove={studentContract.firstAction} /> });
    if (projectorCards.length > 0) parts.push({ label: selected.id === "ordinary-object-story" ? "Tell" : "Discuss", verb: selected.id === "ordinary-object-story" ? "Tell" : "Choose", content: <ProjectorCaseDeck
      key={`${selected.id}-cards`}
      cards={projectorCards}
      title={studentTitleFor(selected)}
      mission={studentContract.challenge}
      nextMove={studentContract.firstAction}
      eyebrow={selected.id === "ordinary-object-story" ? "OBJECT STORY BUILDER" : undefined}
      cardNoun={selected.id === "ordinary-object-story" ? "STORY MOVE" : undefined}
      progressNoun={selected.id === "ordinary-object-story" ? "STORY MOVES COMPLETE" : undefined}
      navigationLabel={selected.id === "ordinary-object-story" ? "Choose a story move" : undefined}
      classMoveTitle={selected.id === "ordinary-object-story" ? "Point to a clue. Build the next story beat. Test it aloud." : undefined}
      classMovePrompt={selected.id === "ordinary-object-story" ? "Choose a starter and tell it together." : undefined}
    /> });
    parts.push({ label: "Work", verb: "Do", content: <section className="projector-active-object">
      {!phasedCoordinateBridge && <StudentStepPath key={selected.id} steps={missionSteps} product={studentContract.finishEvidence.join(" · ")} spacesPrompt={studentContract.reviewState === "reviewed" ? studentContract.saveAction.message : spaces.studentPrompt} />}
      {phasedCoordinateBridge && <section className="coordinate-extension-phase"><header><p className="section-kicker">OPTIONAL EXTENSION</p><h3>Cross zero after the first-quadrant check.</h3></header><MathStudentWorkshops experienceId={selected.id} placement="extension" /></section>}
      {program.subject === "Mathematics" && !phasedCoordinateBridge && <MathStudentWorkshops experienceId={selected.id} />}
    </section> });
  }
  if (currentConnection) parts.push({ label: "Source", verb: "Investigate", content: <CurrentConnectionPlayer connection={currentConnection} /> });
  const activePart = parts[Math.min(projectorPart, parts.length - 1)] ?? parts[0];

  return (
    <div className="student-program projector-lesson-player world-surface" data-world={theme.id} style={worldStyle(theme)}>
      <header className="projector-lesson-player__bar">
        <div><small>{program.subject.toUpperCase()} · {selectedArc.title.toUpperCase()}</small><h1>{studentTitleFor(selected)}</h1><p>{studentContract.challenge}</p></div>
        <nav aria-label="Lesson parts">{parts.map((part, index) => <button type="button" key={`${part.label}-${index}`} className={projectorPart === index ? "active" : ""} aria-current={projectorPart === index ? "step" : undefined} onClick={() => setProjectorPart(index)}><b>{index + 1}</b><span>{part.label}</span></button>)}</nav>
      </header>

      <StudentTeacherLayer
        bigIdea={selectedArc.question}
        coreCompetencies={coreCompetencyMovesFor(program.subject)}
        say={`Today we are asking: ${studentContract.challenge}`}
        ask={studentContract.challenge}
        watchFor={studentContract.finishEvidence.slice(0, 2)}
        ifStuck={readinessLaunch.reteach ?? `Do the first small action together: ${studentContract.firstAction}`}
        nextMove={studentContract.steps[0]?.finishCheck ?? studentContract.finishEvidence[0] ?? "One useful starting idea is visible."}
        contentBackground={resolvedAlignment ? [`Official Grade 6 Big Idea: ${resolvedAlignment.bigIdeas[0]}`] : undefined}
        timing={selected.duration}
        teacherResource={mathAntics ?? undefined}
      />

      <main className="projector-lesson-player__stage" aria-live="polite">
        <div className="projector-lesson-player__cue"><small>{activePart.verb.toUpperCase()}</small><strong>{activePart.label}</strong></div>
        {activePart.content}
      </main>

      <footer className="projector-lesson-player__controls">
        <button type="button" disabled={projectorPart === 0} onClick={() => setProjectorPart((value) => Math.max(0, value - 1))}>← Back</button>
        <span>PART {projectorPart + 1} OF {parts.length}</span>
        <button type="button" disabled={projectorPart === parts.length - 1} onClick={() => setProjectorPart((value) => Math.min(parts.length - 1, value + 1))}>Next →</button>
      </footer>

      <details className="student-program-picker student-unit-map-drawer" id="unit-map">
        <summary><span><small>UNIT MAP</small><strong>{selectedArc.title}</strong></span><b>Open ▾</b></summary>
        <div>{program.arcs.map((arc) => <section key={arc.id}><p>{arc.number} · {arc.title}</p>{arc.experienceIds.map((id) => {const experience = program.experiences.find((item) => item.id === id);return experience ? <button key={id} className={selected.id === id ? "selected" : ""} onClick={() => onExperience(id)}>{studentTitleFor(experience)}</button> : null;})}</section>)}</div>
        <WorldJourney theme={theme} stops={worldStops} activeId={selected.id} onSelect={onExperience} />
      </details>
    </div>
  );
}
