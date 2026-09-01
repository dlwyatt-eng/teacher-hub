"use client";

import { useState } from "react";
import { printClosest } from "./print-support";
import { unit2ScenarioCards } from "./civic-evidence-data";
import {
  affectedPeople,
  communityVoices,
  evidenceCards,
  evidenceTrays,
  improvements,
  plans,
  recommendationEvidence,
  reviewPlans,
} from "./social-unit2-experiences";
import "./civic-evidence-pathway.css";

const civicLessonIds = ["power-in-the-room", "compare-government-systems", "rights-in-tension", "civic-decision-brief"] as const;
export type CivicLessonId = (typeof civicLessonIds)[number];

const sessions: ReadonlyArray<{
  number: number;
  title: string;
  lessonId: CivicLessonId;
  parts: string;
  time: string;
  launch: string;
  evidence: string;
  carry: string;
}> = [
  { number: 1, title: "Find the power", lessonId: "power-in-the-room", parts: "Parts 1–2", time: "60 min", launch: "Who can speak, decide, hold resources, or live with the result?", evidence: "Annotated power map", carry: "Mechanism + moment + effect" },
  { number: 2, title: "Make power answerable", lessonId: "compare-government-systems", parts: "Power 3–4 + Government bridge", time: "60–75 min", launch: "A vote can matter. Why is a vote not enough?", evidence: "Fair-process check + decision path", carry: "Voice · information · reasons · rights · correction" },
  { number: 3, title: "Open the Juniper Park file", lessonId: "rights-in-tension", parts: "Parts 1–2", time: "55–65 min", launch: "One city rule changes one shared place. Who lives with the result?", evidence: "Evidence wall + individual ledger", carry: "Know · need to ask · need to hear" },
  { number: 4, title: "Deliberate without a perfect answer", lessonId: "rights-in-tension", parts: "Parts 3–4", time: "55–65 min", launch: "The vote is tied. What should council do now?", evidence: "Options matrix + provisional recommendation", carry: "Plan · harm · safeguard · check-back" },
  { number: 5, title: "Build the civic case file", lessonId: "civic-decision-brief", parts: "Parts 1–3", time: "60–70 min", launch: "Which public body can make this exact decision—and what limits its power?", evidence: "One-page team case file", carry: "Source job + limit · two options · recommendation" },
  { number: 6, title: "Hear, challenge, revise", lessonId: "civic-decision-brief", parts: "Parts 4–5", time: "60–70 min", launch: "What question would make this public recommendation more accountable?", evidence: "Revised brief + individual reflection", carry: "One substantive revision + honest uncertainty" },
];

const lessonCards: ReadonlyArray<{ id: CivicLessonId; label: string; purpose: string; retained: string; post: string }> = [
  { id: "power-in-the-room", label: "Power is already in the room", purpose: "Experience how rules distribute authority, resources, information, voice, and consequences.", retained: "Before/after plan and power claim", post: "Practice · no post" },
  { id: "compare-government-systems", label: "Same crisis, different systems", purpose: "Compare decision paths with the same fairness and accountability criteria.", retained: "Decision path and defended trade-off", post: "Practice · no post" },
  { id: "rights-in-tension", label: "Who gets the park after dark?", purpose: "Use evidence and affected voices to improve a public rule without inventing a perfect answer.", retained: "Evidence wall and revised recommendation", post: "Checkpoint · no post" },
  { id: "civic-decision-brief", label: "Civic decision brief", purpose: "Transfer the full reasoning route into a public recommendation, hearing, revision, and reflection.", retained: "Team brief + individual reasoning", post: "One required SpacesEDU entry" },
];

export const civicDeliveryByLesson: Record<CivicLessonId, {
  projector: string;
  sharedDevice: string;
  offline: string;
  safetyPrivacyCleanup: readonly string[];
  accessibility: readonly string[];
  extension: string;
  continuity: string;
}> = {
  "power-in-the-room": {
    projector: "Project only the directions and timer. Give private printed roles, counters, and one paper plan to each group; the screen never replaces the physical simulation.",
    sharedDevice: "No student device is needed. One teacher-controlled screen runs the timer while groups build and map power on paper.",
    offline: "Use the printable role cards, ten counters, and a paper plan. If role-play is unsuitable, read one fictional decision aloud and map authority, resources, information, voice, and consequences together.",
    safetyPrivacyCleanup: ["Never assign a disadvantaged role because of a student’s identity or ask students to disclose real exclusion.", "Offer observer, partner, private-writing, and pass routes.", "Collect private role cards before debriefing the rules rather than judging classmates."],
    accessibility: ["Read cards quietly to a student or partner without revealing the card to the group.", "Use counters, pointing, sketching, scribing, or an approved communication aid as equivalent participation.", "Give a non-speaking observer route with a simple tally of turns, moved counters, and changed ideas."],
    extension: "Connect the class power map to one official procedural-fairness example: participation, relevant evidence, reasons, impartiality, or review.",
    continuity: "Keep both paper room plans. Mark the rule chosen for Round 2 so another teacher can resume without replaying Round 1.",
  },
  "compare-government-systems": {
    projector: "Project the fictional water emergency and one simplified decision model at a time. Build arrows and the comparison wall physically before opening the official Canada system source.",
    sharedDevice: "Give each team one device already opened to one assigned official source or model; teams cross-teach instead of browsing countries on the open web.",
    offline: "Use the printed water brief, three decision-path cards, arrow strips, and comparison matrix. Finish with the printed Canada stack and a corrected oversimplification.",
    safetyPrivacyCleanup: ["Compare structures and mechanisms—not stereotypes about countries or people.", "Do not assign students to defend real authoritarian harm.", "Keep the emergency fictional and return all model cards to the unit envelope."],
    accessibility: ["Use icon-labelled arrows and read each route aloud.", "Allow students to sequence cards, point, dictate, or draw a system path.", "Preteach level, branch, system, representation, rights, and review with a visible word bank."],
    extension: "Compare one Nation-specific public governance source with Canada’s federal system without treating Indigenous government as a lower municipal level.",
    continuity: "Photograph or store the class comparison wall. Next block begins by correcting one claim that confuses a government level, branch, and system.",
  },
  "rights-in-tension": {
    projector: "Use the Juniper Park workbench with one teacher or student operator. Reveal one affected group, voice, clue, or plan at a time; students record on paper.",
    sharedDevice: "Devices are optional. Tables use A/B/C plan cards and Know / Ask / Hear paper headings while one shared screen carries the common case.",
    offline: "Use the printable fictional case, affected-people cards, voices, six evidence clues, three plans, improvement cards, evidence facts, and check-back cards.",
    safetyPrivacyCleanup: ["Keep Juniper Park fictional; never request personal conflict, discrimination, disability, or policing stories.", "Do not make one student represent a social group.", "Collect team plan cards; students keep private first choices private."],
    accessibility: ["Offer read-aloud, enlarged/high-contrast cards, private rehearsal, and oral, written, drawn, pointed, or scribed responses.", "A fair paraphrase can be spoken, selected from two options, or built with a partner.", "Keep rights language concrete: affected access, a possible limit, a safeguard, and evidence still needed."],
    extension: "Ask whether the preferred plan uses the least harmful effective limit and what evidence would trigger revision; do not ask students to declare a legal violation.",
    continuity: "The shared paper evidence wall is the source of truth across blocks. Circle the chosen plan, improvement, evidence fact, and review card before packing up.",
  },
  "civic-decision-brief": {
    projector: "Project one gate at a time: jurisdiction, source jobs, power/rights map, options, safeguard/review, hearing, revision. Teams build the case file on paper.",
    sharedDevice: "Use one device per team with one assigned curated source. No logins or open-web search are required; one student records the source job and limitation while others work on paper.",
    offline: "Use Juniper Park as the common case with the complete printable Civic Evidence Room pack. Teams finish a one-page case file, 90-second hearing, revision, and individual reflection.",
    safetyPrivacyCleanup: ["Use only public or fictional evidence; never collect political preference, citizenship, eligibility, confidential information, or unapproved peer recordings.", "Post the shared artifact once and keep private ballots, practice roles, and raw AI chats out of SpacesEDU.", "A TTOC uses the prepared fictional case and does not publish to SpacesEDU."],
    accessibility: ["Offer speaker, evidence finder, question responder, revision recorder, observer, and non-speaking presentation roles.", "Accept audio, text, diagram, pointing, scribing, or approved communication supports as evidence of the same reasoning.", "Assess the decision reasoning—not speaking speed, confidence, production polish, or political agreement."],
    extension: "After the human evidence wall is complete, teacher-model a claim audit: label each AI claim Supported, Unsupported, or Unclear and verify it against the original source. No personal data; AI text is not a source and is never copied uncritically to SpacesEDU.",
    continuity: "Each team folder shows the current gate, the required artifact, and the next move. Keep one master case-file sheet; browser state is never the record of learning.",
  },
};

export function isCivicLessonId(id: string): id is CivicLessonId {
  return civicLessonIds.includes(id as CivicLessonId);
}

export function CivicReasoningRoute({ compact = false }: { compact?: boolean }) {
  const steps = [
    ["1", "EVIDENCE", "What can the sources support?"],
    ["2", "POWER", "Who decides or influences?"],
    ["3", "AFFECTED PEOPLE", "Who lives with the result?"],
    ["4", "OPTIONS", "What could happen next?"],
    ["5", "SAFEGUARD + REVIEW", "How can harm be reduced and mistakes corrected?"],
    ["6", "RECOMMEND", "What should happen—and what remains uncertain?"],
  ];
  return <section className={`civic-reasoning-route ${compact ? "compact" : ""}`} aria-label="Civic evidence reasoning route"><header><small>USE THIS ROUTE IN EVERY CIVIC CASE</small><strong>Evidence becomes an accountable public recommendation.</strong></header><ol>{steps.map(([number, label, prompt]) => <li key={label}><b>{number}</b><span><strong>{label}</strong><small>{prompt}</small></span></li>)}</ol></section>;
}

function CivicOfflinePack() {
  const hearings = ["Who has authority for this exact decision?", "Which source most strongly supports the plan—and what can it not prove?", "Who could be helped or harmed?", "What safeguard is missing?", "What evidence would trigger a review or change?"];
  return <section className="civic-offline-pack" aria-label="Printable Civic Evidence Room offline pack">
    <header className="civic-pack-cover"><div><small>GRADE 6 SOCIAL STUDIES · UNIT 2</small><h2>The Civic Evidence Room</h2><p>Complete offline and shared-device pack · Keep every Juniper Park item labelled as fictional practice evidence.</p></div><button type="button" onClick={(event) => printClosest(event.currentTarget, ".civic-offline-pack")}>Print / Save PDF</button></header>
    <article className="civic-pack-page civic-pack-overview"><h3>Teacher route and handoff</h3><CivicReasoningRoute compact /><div className="civic-pack-callout"><b>ONE SOURCE OF TRUTH</b><p>Use a labelled paper folder per team. Write the current gate, finished evidence, and next move on the front. A TTOC uses the prepared fictional case only and leaves publishing to the classroom teacher.</p></div><div className="civic-pack-two"><section><h4>Private—not for display</h4><p>First choices, ballots, personal disclosures, role cards, raw AI chats, confidential details, and any recording without approval.</p></section><section><h4>Display only with approval</h4><p>De-identified evidence walls, revised team recommendations, source trails, system diagrams, safeguards, and check-back plans.</p></section></div></article>
    <article className="civic-pack-page"><header><small>SESSION 1 · CUT APART · ONE SET PER GROUP</small><h3>Power in the Room role cards</h3></header><div className="civic-pack-role-grid">{unit2ScenarioCards.powerRoles.map((card) => <section key={card.role}><small>PRIVATE ROLE · {card.tokens} {card.tokens === 1 ? "COUNTER" : "COUNTERS"}</small><h4>{card.role}</h4><p>{card.power}</p><p><b>Your rule:</b> {card.limit}</p><footer>{card.privateMove}</footer></section>)}<section><small>OPTIONAL FIFTH STUDENT</small><h4>{unit2ScenarioCards.powerObserver.role}</h4><p>{unit2ScenarioCards.powerObserver.power}</p><p><b>Your rule:</b> {unit2ScenarioCards.powerObserver.limit}</p></section></div><aside><b>GROUP CHALLENGE:</b> Use all ten counters to plan a community room with learning, movement, quiet, gathering, and at least one access feature. Freeze after six minutes.</aside></article>
    <article className="civic-pack-page"><header><small>SESSION 2 · CUT APART</small><h3>Water emergency decision models</h3></header><div className="civic-pack-system-grid">{unit2ScenarioCards.systems.map((system) => <section key={system.name}><h4>{system.name}</h4><ol>{system.route.map((step) => <li key={step}>{step}</li>)}</ol><footer>{system.tradeoff}</footer></section>)}</div><div className="civic-pack-matrix"><h4>Compare every model with the same criteria</h4>{["Speed", "Public voice", "Clear reasons", "Rights check", "Way to correct"].map((criterion) => <p key={criterion}><b>{criterion}</b><span>Low ○ ○ ○ ○ ○ High</span><span>Evidence from the model: __________________________</span></p>)}</div></article>
    <article className="civic-pack-page civic-pack-fictional"><header><small>FICTIONAL PRACTICE CASE · SESSION 3</small><h3>Juniper Park: people and voices</h3><p>The city is considering new hours for a lit public basketball court after noise reports. The current file is incomplete; students must not invent missing voices.</p></header><div className="civic-pack-people">{affectedPeople.map((person) => <section key={person.id}><h4>{person.label}</h4><b>{person.short}</b><p>{person.impact}</p></section>)}</div><div className="civic-pack-voices">{communityVoices.map((voice) => <blockquote key={voice.name}><strong>{voice.name}</strong><p>“{voice.quote}”</p><footer>Notice: {voice.notice}</footer></blockquote>)}</div></article>
    <article className="civic-pack-page civic-pack-fictional"><header><small>FICTIONAL PRACTICE CASE · CUT APART</small><h3>Evidence wall cards</h3></header><div className="civic-pack-trays">{evidenceTrays.map((tray) => <section key={tray.id}><h4>{tray.label}</h4><p>{tray.description}</p></section>)}</div><div className="civic-pack-clues">{evidenceCards.map((card, index) => <section key={card.id}><small>CLUE {index + 1}</small><p>{card.text}</p><footer className="civic-teacher-key"><b>Teacher key: {evidenceTrays.find((tray) => tray.id === card.answer)?.label}</b> · {card.why}</footer></section>)}</div></article>
    <article className="civic-pack-page civic-pack-fictional"><header><small>FICTIONAL PRACTICE CASE · SESSION 4</small><h3>Plans, safeguards, evidence, and review</h3></header><div className="civic-pack-plans">{plans.map((plan) => <section key={plan.id}><h4>{plan.title}</h4><p>{plan.action}</p><b>Helps:</b><p>{plan.helps}</p><b>Watch:</b><p>{plan.watch}</p></section>)}</div><h4>Fairness improvements</h4><div className="civic-pack-card-grid">{improvements.map((item) => <section key={item.id}><b>{item.label}</b><p>{item.detail}</p></section>)}</div><h4>Supporting facts</h4><div className="civic-pack-card-grid">{recommendationEvidence.map((item) => <section key={item.id}><p>{item.label}</p></section>)}</div><h4>Check-back plans</h4><div className="civic-pack-card-grid">{reviewPlans.map((item) => <section key={item.id}><b>{item.label}</b><p>{item.detail}</p></section>)}</div></article>
    <article className="civic-pack-page civic-case-file-sheet"><header><small>SESSIONS 5–6 · ONE PER TEAM</small><h3>Civic case file</h3><p>Use Juniper Park as the common offline case, or use another teacher-approved public issue with curated sources.</p></header><div className="civic-case-file-fields"><section><b>1 · Exact decision + jurisdiction</b><p>Who can decide? What can they not decide?</p></section><section><b>2 · Source trail</b><p>For each source: creator · date · job · useful detail · limitation</p></section><section><b>3 · Power + affected people</b><p>Authority · influence · affected people/rightsholder · missing documented voice</p></section><section><b>4 · Two real options</b><p>Effectiveness · rights/access · intended/unintended consequences</p></section><section><b>5 · Recommendation</b><p>Action · strongest evidence · serious limitation</p></section><section><b>6 · Accountability</b><p>Safeguard · public reason · check-back date/evidence · route to challenge or revise</p></section></div><footer><b>Team recommendation:</b><span>We recommend __________________________________ because __________________________________. To reduce harm, ____________________. The decision should be checked when/by ____________________. We are still uncertain about ____________________.</span></footer></article>
    <article className="civic-pack-page"><header><small>HEARING + INDIVIDUAL EVIDENCE</small><h3>Challenge, revise, reflect</h3></header><div className="civic-pack-hearings">{hearings.map((question) => <section key={question}>{question}</section>)}</div><div className="civic-pack-accountability"><b>FACT</b><span>→</span><b>PLAN</b><span>→</span><b>SAFEGUARD</b><span>→</span><b>CHECK-BACK</b><span>→</span><b>REVISE</b></div><section className="civic-pack-reflection"><h4>Individual reflection · audio, text, diagram, or scribed response</h4><ol><li>What evidence or counterargument changed or complicated my thinking?</li><li>What did I contribute to the team’s reasoning?</li><li>What remains uncertain?</li><li>How could someone participate responsibly next?</li></ol><p><b>SpacesEDU:</b> Add the team artifact once. Each student adds a 30–60 second audio or 3–5 sentences in the same entry. Do not add private ballots, preferences, role cards, confidential details, raw AI output, or unapproved recordings.</p></section></article>
  </section>;
}

export function CivicEvidencePathway({ currentLessonId, onLesson }: { currentLessonId: string; onLesson: (id: string) => void }) {
  const [packOpen, setPackOpen] = useState(false);
  return <section className="civic-evidence-pathway" aria-labelledby="civic-pathway-title">
    <header className="civic-pathway-hero"><div><small>UNIT 2 · THE CIVIC EVIDENCE ROOM</small><h2 id="civic-pathway-title">Six launchable sessions. One accountable decision.</h2><p><b>Essential question:</b> How can people use power fairly when evidence and community needs do not all point in the same direction?</p></div><span>SEPT.–OCT. REHEARSAL<br />NOV.–DEC. FULL TRANSFER</span></header>
    <CivicReasoningRoute />
    <section className="civic-session-chooser"><header><div><small>CORE ROUTE</small><h3>Choose the next session—not the next page.</h3></div><p>Each session closes with portable paper evidence. Groups can miss, repeat, or resume a block without depending on browser state.</p></header><ol>{sessions.map((session) => <li key={session.number} className={currentLessonId === session.lessonId ? "current" : ""}><b>{session.number}</b><div><small>{session.time} · {session.parts}</small><h4>{session.title}</h4><p>{session.launch}</p><span><strong>Keep:</strong> {session.evidence}</span><span><strong>Carry forward:</strong> {session.carry}</span></div><button type="button" onClick={() => onLesson(session.lessonId)}>{currentLessonId === session.lessonId ? "Open current lesson" : "Open lesson"}</button></li>)}</ol></section>
    <section className="civic-pathway-routes" aria-label="Flexible sequence routes"><article><small>FULL ROUTE · RECOMMENDED</small><strong>6 sessions</strong><p>Teach the sequence above, then use optional ELA/Arts studio time only for communication—not to replace Social Studies reasoning.</p></article><article><small>FOUR-SESSION EMERGENCY ROUTE</small><strong>Combine 1+2 and 5+6</strong><p>Keep both Juniper Park sessions. Reduce models, source cards, and presentation time; never remove review or individual reflection.</p></article><article><small>STANDALONE / TTOC</small><strong>Use Session 3 or 4</strong><p>Juniper Park is the safest self-contained route. Use written challenge cards instead of live hearings and leave SpacesEDU publishing to the classroom teacher.</p></article></section>
    <section className="civic-lesson-continuity"><header><small>FOUR EXISTING EXPERIENCES · NO DUPLICATE UNIT</small><h3>What each lesson contributes</h3></header>{lessonCards.map((lesson, index) => <article key={lesson.id}><b>{index + 1}</b><div><h4>{lesson.label}</h4><p>{lesson.purpose}</p><span><strong>Retain:</strong> {lesson.retained}</span><small>{lesson.post}</small></div><button type="button" onClick={() => onLesson(lesson.id)}>Open →</button></article>)}</section>
    <details className="civic-pathway-details"><summary><span><small>ASSESSMENT + PORTFOLIO</small><strong>Four lenses; one required post</strong></span><b>Open ▾</b></summary><div><section><h4>1 · Authority and power</h4><p>Identifies who can decide, who can influence, who is affected, and where limits or accountability sit.</p></section><section><h4>2 · Evidence and affected perspectives</h4><p>Uses sources for different jobs, names limitations, and represents documented voices without guessing.</p></section><section><h4>3 · Accountable decision-making</h4><p>Tests options, consequences, rights/access, safeguards, reasons, and a genuine review pathway.</p></section><section><h4>4 · Individual reasoning and participation</h4><p>Shows a contribution, substantive revision, remaining uncertainty, and a responsible next participation route.</p></section><aside><b>Do not assess:</b> political agreement, speaking confidence or speed, or production polish. Post the shared civic brief once; add one individual response per student in the same SpacesEDU entry.</aside></div></details>
    <details className="civic-pathway-details"><summary><span><small>ACCESS + PRIVACY + AI</small><strong>Same thinking target through different participation routes</strong></span><b>Open ▾</b></summary><div><section><h4>Equivalent evidence</h4><p>Read-aloud, high-contrast cards, oral or written response, diagram, pointing, scribing, private rehearsal, observer/non-speaking roles, or an approved communication aid.</p></section><section><h4>Privacy boundary</h4><p>Never collect political preference, citizenship/eligibility, personal discrimination stories, confidential information, private ballots, raw AI chats, or unapproved peer recordings.</p></section><section><h4>Optional AI claim audit</h4><p>Only after students build the human evidence wall: label AI claims Supported, Unsupported, or Unclear and verify each against the originals. AI text is not a source and is not copied to SpacesEDU.</p></section><section><h4>Indigenous governance</h4><p>Name a specific Nation and use its own public source. A Nation is a rights-holder and government—not merely another stakeholder or a lower municipal level. Do not role-play Indigenous governance.</p></section></div></details>
    <details className="civic-pathway-details"><summary><span><small>BC CURRICULUM + SOURCE SPINE</small><strong>Local entry; global governance transfer</strong></span><b>Open ▾</b></summary><div className="civic-source-spine"><p>The local case is an entry lens. Carry the criteria into later international systems and global-issue work so local civics is not mistaken for the whole Grade 6 standard.</p><a href="https://curriculum.gov.bc.ca/curriculum/social-studies/6/core" target="_blank" rel="noreferrer"><b>BC Grade 6 Social Studies</b><span>Inquiry, evidence, causes/consequences, perspectives, ethical judgment, and action</span></a><a href="https://bcombudsperson.ca/wp-content/uploads/2025/07/OMB_ProceduralFairness.pdf" target="_blank" rel="noreferrer"><b>BC Ombudsperson · Procedural Fairness</b><span>Participation, relevant evidence, impartiality, reasons, and review</span></a><a href="https://learn.parl.ca/understanding-comprendre/en/canada-system-of-government/" target="_blank" rel="noreferrer"><b>Parliament of Canada · Canada’s system</b><span>Representation, constitutional monarchy, federalism, and responsible government</span></a><a href="https://www.bcafn.ca/about-bcafn/vision-mission" target="_blank" rel="noreferrer"><b>BC Assembly of First Nations</b><span>A representative organization advocating for First Nations title, rights, jurisdiction, and governments; not a substitute for a specific Nation’s source</span></a><a href="https://electionsanddemocracy.ca/your-classroom/resources" target="_blank" rel="noreferrer"><b>Elections Canada · Classroom resources</b><span>Non-partisan participation and democratic decision-making</span></a></div></details>
    <section className="civic-pack-launch"><div><small>NO WI-FI · NO 1:1 DEVICES · TTOC READY</small><h3>Open the complete synchronized offline pack.</h3><p>Roles, system models, Juniper Park voices and clues, plans, safeguards, source-role prompts, team case file, hearing questions, and individual reflection.</p></div><button type="button" aria-expanded={packOpen} onClick={() => setPackOpen((value) => !value)}>{packOpen ? "Close offline pack" : "Open offline / print pack"}</button></section>
    {packOpen && <CivicOfflinePack />}
  </section>;
}
