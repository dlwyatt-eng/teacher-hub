"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

export const sourceMosaicExperienceId = "source-mosaic";

type Audience = "student" | "teacher";
type SourceId = "data" | "map" | "voices" | "guide";
type FeedbackKind = "success" | "rethink" | "note";
type Feedback = { kind: FeedbackKind; title: string; message: string } | null;

export type SourceMosaicLabProps = {
  audience?: Audience;
};

type Source = {
  id: SourceId;
  number: string;
  type: string;
  plainName: string;
  question: string;
  job: string;
  cluePrompt: string;
  clueChoices: Array<{ id: string; label: string; correct: boolean; feedback: string }>;
};

type Evidence = {
  id: string;
  sourceId: SourceId;
  short: string;
  detail: string;
  strong: boolean;
  response: string;
};

const sources: Source[] = [
  {
    id: "data",
    number: "SOURCE 1",
    type: "TEMPERATURE DATA",
    plainName: "Numbers from a small test",
    question: "How hot are different surfaces and shade spots at the same time?",
    job: "Shows how much hotter or cooler the tested places were. It helps us compare size, not just say “hot.”",
    cluePrompt: "Which statement is supported by this three-day test?",
    clueChoices: [
      { id: "data-correct", label: "The sunny dark pavement averaged about 19°C hotter than the test shade.", correct: true, feedback: "Yes. The dark pavement averaged about 50°C and the test shade averaged 31°C. This shows a meaningful difference in this small test." },
      { id: "data-guarantee", label: "A shade canopy will always cool every schoolyard by exactly 19°C.", correct: false, feedback: "The table shows one fictional three-day test. It can support a promising idea, but it cannot guarantee the same result everywhere." },
      { id: "data-air", label: "The air temperature and every surface temperature were the same.", correct: false, feedback: "Look across one row. The air, dark pavement, pale paving, tree shade, and test shade have different temperatures." },
    ],
  },
  {
    id: "map",
    number: "SOURCE 2",
    type: "LABELLED SITE MAP",
    plainName: "A bird’s-eye view of the place",
    question: "Where could a change fit without blocking play, drainage, doors, or the accessible route?",
    job: "Shows where things are and what is nearby. It helps us place an idea responsibly.",
    cluePrompt: "Which location is shown as a possible small test zone?",
    clueChoices: [
      { id: "map-correct", label: "The west edge beside Door B, outside the basketball court and drain space.", correct: true, feedback: "Yes. The map identifies a possible test zone and also shows the nearby limits that a real plan must respect." },
      { id: "map-court", label: "Directly across the middle of the basketball court.", correct: false, feedback: "That would remove active play space. The dashed test zone is outside the court." },
      { id: "map-drain", label: "On top of the storm drain and across the accessible route.", correct: false, feedback: "Those are constraints, not building spots. A responsible plan keeps drainage and the route open." },
    ],
  },
  {
    id: "voices",
    number: "SOURCE 3",
    type: "STUDENT VOICE EXCERPTS",
    plainName: "People describing their experience",
    question: "What do students need the space to feel like and let them do?",
    job: "Shows experiences and priorities that a thermometer cannot. It helps us design with people, not only for a surface.",
    cluePrompt: "What shared need appears across these fictional comments?",
    clueChoices: [
      { id: "voices-correct", label: "A cooler place to sit or talk that stays accessible and does not erase active play.", correct: true, feedback: "Yes. The comments add comfort, belonging, access, calm conversation, and play-space needs to the heat problem." },
      { id: "voices-colour", label: "Everyone agrees that the whole yard should be painted one favourite colour.", correct: false, feedback: "No comment asks for that. A source should not be stretched beyond what people actually said." },
      { id: "voices-proof", label: "Four comments prove that every student wants exactly the same design.", correct: false, feedback: "A few excerpts reveal useful experiences, but they do not represent every student. More voices would still be needed." },
    ],
  },
  {
    id: "guide",
    number: "SOURCE 4",
    type: "PUBLIC / EXPERT EXPLANATION",
    plainName: "An informed explanation of how options work",
    question: "Why might shade, trees, or lighter surfaces help—and what must be checked?",
    job: "Explains possible cause and effect, trade-offs, and safety checks. It helps us avoid a quick idea that creates a new problem.",
    cluePrompt: "Which response best follows the guide?",
    clueChoices: [
      { id: "guide-correct", label: "Test temporary shade now, measure again, and investigate trees as a longer-term option.", correct: true, feedback: "Yes. This combines a reversible first test with measurement and a longer-term plan that still needs soil, water, access, and maintenance checks." },
      { id: "guide-instant", label: "Plant large trees tomorrow; they will create full shade immediately and need no care.", correct: false, feedback: "The guide says trees need time, soil, water, and maintenance. A strong response does not hide those limits." },
      { id: "guide-paint", label: "Use the brightest possible surface everywhere without checking glare or slipperiness.", correct: false, feedback: "The guide specifically warns that colour, glare, grip, drainage, and maintenance must be tested before a large change." },
    ],
  },
];

const sourceJobs = [
  { id: "measure", sourceId: "data" as const, label: "Compare how large the heat differences were in a small test." },
  { id: "locate", sourceId: "map" as const, label: "Find where an idea could fit and which physical limits matter." },
  { id: "experience", sourceId: "voices" as const, label: "Understand what people experience, value, and need from the place." },
  { id: "explain", sourceId: "guide" as const, label: "Explain why options may work and which trade-offs need checking." },
];

const evidenceChoices: Evidence[] = [
  { id: "data-gap", sourceId: "data", short: "50°C compared with 31°C", detail: "Across three fictional test days, sunny dark pavement averaged about 50°C; the temporary test shade averaged 31°C.", strong: true, response: "Strong temperature evidence. It shows a large difference in this small test without claiming every future day will match." },
  { id: "data-air", sourceId: "data", short: "Air warmed across the three days", detail: "The air temperature was 25°C, 27°C, then 29°C on the three test days.", strong: false, response: "This is accurate context, but it does not compare a cooling response. Pairing it with the surface results would make it more useful." },
  { id: "map-zone", sourceId: "map", short: "A possible west-edge test zone", detail: "The map places a possible small test beside Door B and outside the court, drain space, and main accessible route.", strong: true, response: "Strong place evidence. It connects the idea to a possible location while naming constraints." },
  { id: "map-court", sourceId: "map", short: "Keep the play court open", detail: "The labelled basketball court fills the sunny centre; the suggested pilot zone does not cross it.", strong: true, response: "Useful place evidence. It helps a cooling plan add a calmer space without erasing active play." },
  { id: "voice-needs", sourceId: "voices", short: "Shade, seating, calm, and access", detail: "The fictional excerpts ask for a cooler place to sit or talk, an accessible route, and continued open play space.", strong: true, response: "Strong human evidence. It helps define what “more welcoming” needs to mean, not only what is cooler." },
  { id: "voice-count", sourceId: "voices", short: "Four people commented", detail: "The source contains four fictional excerpts from different students.", strong: false, response: "True, but the number of excerpts alone does not show what the school should do. The needs inside the comments are the useful evidence." },
  { id: "guide-pilot", sourceId: "guide", short: "Test now; plan long-term", detail: "Temporary shade can be tested quickly; trees can add lasting benefits but need time, soil, water, and care.", strong: true, response: "Strong option evidence. It supports a reversible first step and prevents trees from being presented as an instant fix." },
  { id: "guide-surface", sourceId: "guide", short: "Cooler surfaces still need checks", detail: "A lighter surface may absorb less heat, but glare, grip, drainage, durability, and maintenance must be tested.", strong: true, response: "Strong trade-off evidence. It makes the response more responsible by naming what could go wrong." },
];

const claims = [
  {
    id: "pilot",
    label: "Test a shaded hangout route",
    text: "The school should test a small shade canopy with movable seating along the west edge, keep the court and accessible route open, measure before and after, and investigate trees for longer-term shade.",
    correct: true,
    feedback: "This is a careful solutionary claim: it responds to heat and belonging, starts with a reversible test, protects existing uses, and leaves room to learn before building permanently.",
  },
  {
    id: "paint",
    label: "Paint the whole yard green",
    text: "The school should paint every paved area green because green looks natural and will definitely make the entire yard cool.",
    correct: false,
    feedback: "The sources do not test green paint or guarantee that colour alone will solve heat. The guide also says surface changes need glare, grip, drainage, and maintenance checks.",
  },
  {
    id: "trees-now",
    label: "Plant 30 full-size trees tomorrow",
    text: "The school should immediately plant 30 large trees across the yard because trees are always the best solution.",
    correct: false,
    feedback: "Trees may be part of a strong long-term response, but the sources do not support this number, timeline, or location. Soil, water, cost, access, play space, and maintenance remain unknown.",
  },
];

const limits = [
  { id: "site-check", label: "Check the site and test the pilot", correct: true, text: "Ask facilities staff about underground services, drainage, accessibility, cost, wind, and maintenance. Then remeasure surface temperatures and invite more student feedback during the pilot.", feedback: "Exactly. This names missing information, the people who may know it, and evidence that could be collected before a permanent decision." },
  { id: "more-cute", label: "Ask whether the idea looks cute", correct: false, text: "Ask one more student whether the canopy colour looks cute, then begin construction.", feedback: "Visual appeal can matter, but one opinion does not answer the major safety, site, cost, access, maintenance, or effectiveness questions." },
  { id: "declare", label: "Declare the problem solved", correct: false, text: "Use the three-day table as proof that the plan will work forever and no more information is needed.", feedback: "A small test supports investigation, not certainty. Conditions change, and the proposed pilot itself has not been tested yet." },
];

const stepLabels = ["Meet the sources", "Match their jobs", "Choose evidence", "Build a claim", "Name the limit", "Share the brief"] as const;

function SourceBadge({ sourceId }: { sourceId: SourceId }) {
  const source = sources.find((item) => item.id === sourceId)!;
  return <span className="mosaic-source-badge" data-source={sourceId}>{source.type}</span>;
}

function DataSource() {
  return (
    <section className="mosaic-data-source" aria-label="Fictional temperature comparison data">
      <header><div><small>FICTIONAL LEARNING DATA</small><h4>Courtyard surface check</h4></div><p>Surface readings at 12:30 p.m. · °C</p></header>
      <div className="mosaic-table-wrap">
        <table>
          <caption>Three-day fictional surface-temperature comparison</caption>
          <thead><tr><th scope="col">Test day</th><th scope="col">Air</th><th scope="col">Dark pavement<br />in sun</th><th scope="col">Pale paving<br />in sun</th><th scope="col">Under tree<br />shade</th><th scope="col">Under test<br />shade cloth</th></tr></thead>
          <tbody>
            <tr><th scope="row">Day 1</th><td>25°</td><td className="mosaic-hot">46°</td><td>34°</td><td className="mosaic-cool">27°</td><td className="mosaic-cool">29°</td></tr>
            <tr><th scope="row">Day 2</th><td>27°</td><td className="mosaic-hot">50°</td><td>36°</td><td className="mosaic-cool">28°</td><td className="mosaic-cool">31°</td></tr>
            <tr><th scope="row">Day 3</th><td>29°</td><td className="mosaic-hot">53°</td><td>39°</td><td className="mosaic-cool">30°</td><td className="mosaic-cool">33°</td></tr>
            <tr className="mosaic-average"><th scope="row">Average</th><td>27°</td><td>about 50°</td><td>about 36°</td><td>about 28°</td><td>31°</td></tr>
          </tbody>
        </table>
      </div>
      <footer><strong>READ IT HONESTLY</strong><span>This is a small three-day comparison created for this lesson—not proof of what every schoolyard will do.</span></footer>
    </section>
  );
}

function MapSource() {
  return (
    <figure className="mosaic-map-source">
      <svg viewBox="0 0 900 480" role="img" aria-labelledby="mosaic-map-title mosaic-map-desc">
        <title id="mosaic-map-title">Labelled fictional school courtyard map</title>
        <desc id="mosaic-map-desc">A school building across the north, Door B opening to an accessible route, a sunny basketball court in the middle, an existing tree and bench in the southwest, a storm drain in the southeast, and a dashed possible test zone along the west edge.</desc>
        <defs>
          <pattern id="mosaic-paving" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 12H24M12 0V24" /></pattern>
          <pattern id="mosaic-route" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M0 18L18 0" /></pattern>
        </defs>
        <rect className="map-yard" x="18" y="18" width="864" height="444" rx="24" />
        <rect className="map-building" x="120" y="38" width="650" height="94" rx="8" />
        <text className="map-label-light" x="445" y="83" textAnchor="middle">SCHOOL BUILDING · NORTH</text>
        <rect className="map-door" x="210" y="104" width="84" height="29" />
        <text className="map-small" x="252" y="98" textAnchor="middle">DOOR B</text>
        <path className="map-access" d="M252 133V410H807" />
        <text className="map-small" x="316" y="391">ACCESSIBLE THROUGH-ROUTE</text>
        <rect className="map-court" x="395" y="165" width="330" height="208" rx="9" />
        <line className="map-court-line" x1="560" y1="165" x2="560" y2="373" />
        <circle className="map-court-line" cx="560" cy="269" r="43" />
        <text className="map-label" x="560" y="258" textAnchor="middle">SUNNY</text>
        <text className="map-label" x="560" y="284" textAnchor="middle">BASKETBALL COURT</text>
        <circle className="map-tree" cx="120" cy="320" r="61" />
        <circle className="map-tree-dot" cx="120" cy="320" r="17" />
        <text className="map-small" x="56" y="405">EXISTING TREE + BENCH</text>
        <rect className="map-test" x="175" y="175" width="151" height="146" rx="17" />
        <text className="map-label" x="250" y="232" textAnchor="middle">POSSIBLE</text>
        <text className="map-label" x="250" y="258" textAnchor="middle">SMALL</text>
        <text className="map-label" x="250" y="284" textAnchor="middle">TEST ZONE</text>
        <circle className="map-drain" cx="775" cy="338" r="25" />
        <path className="map-drain-line" d="M760 323L790 353M790 323L760 353" />
        <text className="map-small" x="738" y="306">STORM DRAIN</text>
        <path className="map-sun" d="M807 174L751 211" />
        <circle className="map-sun-dot" cx="824" cy="162" r="20" />
        <text className="map-small" x="746" y="227">AFTERNOON SUN</text>
        <path className="map-north" d="M70 121V61M70 61L54 83M70 61L86 83" />
        <text className="map-label" x="70" y="47" textAnchor="middle">N</text>
        <text className="map-west" x="38" y="250" transform="rotate(-90 38 250)" textAnchor="middle">WEST EDGE</text>
      </svg>
      <figcaption><strong>Fictional site sketch—not a construction plan.</strong><span>The labels help a class notice possibilities and constraints before asking facilities staff what is actually safe and possible.</span></figcaption>
    </figure>
  );
}

function VoiceSource() {
  return (
    <section className="mosaic-voice-source" aria-label="Four fictional student voice excerpts">
      <header><small>FICTIONAL COMPOSITE COMMENTS</small><h4>What students say the space feels like</h4><p>These are invented for discussion. They do not represent actual students or a complete survey.</p></header>
      <div>
        <blockquote><span aria-hidden="true">“</span><p>At lunch, the metal bench and pavement feel too hot. I usually stand beside the building instead.</p><footer>— Student A</footer></blockquote>
        <blockquote><span aria-hidden="true">“</span><p>I want somewhere to talk that is not right beside the basketball game—but keep the court because people use it.</p><footer>— Student B</footer></blockquote>
        <blockquote><span aria-hidden="true">“</span><p>A shaded route from Door B would help when I use wheels or carry equipment. Please do not make a narrow maze.</p><footer>— Student C</footer></blockquote>
        <blockquote><span aria-hidden="true">“</span><p>Plants and movable seats could make it feel like a place to hang out, not just leftover pavement.</p><footer>— Student D</footer></blockquote>
      </div>
    </section>
  );
}

function GuideSource() {
  return (
    <section className="mosaic-guide-source" aria-label="Fictional public expert explanation">
      <header><small>FICTIONAL PUBLIC GUIDE EXCERPT</small><h4>Cooling a paved gathering space</h4><p>A learning source based on common design principles—not a real local approval or engineering report.</p></header>
      <div>
        <article><b aria-hidden="true">☂</b><div><h5>Block direct sun</h5><p>Temporary shade can be tested quickly. Secure structures must be checked for wind, fire access, and safe movement.</p></div></article>
        <article><b aria-hidden="true">♣</b><div><h5>Grow long-term shade</h5><p>Trees can cool and improve habitat, but they need suitable soil, water, root space, time, and ongoing care.</p></div></article>
        <article><b aria-hidden="true">◩</b><div><h5>Test surface choices</h5><p>Lighter surfaces may absorb less heat. Colour, glare, grip, drainage, durability, and maintenance all matter.</p></div></article>
        <article><b aria-hidden="true">↻</b><div><h5>Pilot, listen, revise</h5><p>Measure before and after. Observe how the space is used. Invite feedback from varied users before a permanent change.</p></div></article>
      </div>
    </section>
  );
}

function SourceDisplay({ sourceId }: { sourceId: SourceId }) {
  if (sourceId === "data") return <DataSource />;
  if (sourceId === "map") return <MapSource />;
  if (sourceId === "voices") return <VoiceSource />;
  return <GuideSource />;
}

function FeedbackPanel({ feedback }: { feedback: Feedback }) {
  if (!feedback) return null;
  return <aside className="mosaic-feedback" data-kind={feedback.kind} role="status" aria-live="polite" aria-atomic="true"><strong>{feedback.title}</strong><span>{feedback.message}</span></aside>;
}

export function SourceMosaicLab({ audience = "student" }: SourceMosaicLabProps) {
  const titleId = useId();
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const [step, setStep] = useState(0);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [noticed, setNoticed] = useState<SourceId[]>([]);
  const [tourFeedback, setTourFeedback] = useState<Feedback>(null);
  const [matchIndex, setMatchIndex] = useState(0);
  const [matched, setMatched] = useState<SourceId[]>([]);
  const [matchFeedback, setMatchFeedback] = useState<Feedback>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);
  const [evidenceFeedback, setEvidenceFeedback] = useState<Feedback>(null);
  const [claimId, setClaimId] = useState<string | null>(null);
  const [claimVerified, setClaimVerified] = useState(false);
  const [claimFeedback, setClaimFeedback] = useState<Feedback>(null);
  const [limitId, setLimitId] = useState<string | null>(null);
  const [limitVerified, setLimitVerified] = useState(false);
  const [limitFeedback, setLimitFeedback] = useState<Feedback>(null);

  const currentSource = sources[sourceIndex];
  const currentMatchSource = sources[matchIndex];
  const chosenEvidence = evidenceChoices.filter((item) => selectedEvidence.includes(item.id));
  const strongEvidence = chosenEvidence.filter((item) => item.strong);
  const strongSourceTypes = new Set(strongEvidence.map((item) => item.sourceId));
  const evidenceReady = strongEvidence.length >= 2 && strongSourceTypes.size >= 2 && strongSourceTypes.has("data");
  const selectedClaim = claims.find((item) => item.id === claimId) ?? null;
  const selectedLimit = limits.find((item) => item.id === limitId) ?? null;

  const completed = useMemo(() => [noticed.length === 4, matched.length === 4, evidenceReady, claimVerified, limitVerified, limitVerified], [noticed.length, matched.length, evidenceReady, claimVerified, limitVerified]);
  const maxUnlocked = useMemo(() => {
    let unlocked = 0;
    for (let index = 0; index < completed.length - 1; index += 1) {
      if (!completed[index]) break;
      unlocked = index + 1;
    }
    return unlocked;
  }, [completed]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  const chooseTourClue = (choice: Source["clueChoices"][number]) => {
    if (choice.correct) {
      setNoticed((current) => current.includes(currentSource.id) ? current : [...current, currentSource.id]);
    }
    setTourFeedback({ kind: choice.correct ? "success" : "rethink", title: choice.correct ? `${currentSource.type}: clue found` : "Check what this source actually shows", message: choice.feedback });
  };

  const moveTour = (direction: -1 | 1) => {
    setSourceIndex((current) => Math.max(0, Math.min(sources.length - 1, current + direction)));
    setTourFeedback(null);
  };

  const chooseJob = (jobSourceId: SourceId) => {
    const correct = jobSourceId === currentMatchSource.id;
    if (correct) setMatched((current) => current.includes(currentMatchSource.id) ? current : [...current, currentMatchSource.id]);
    const selectedJob = sourceJobs.find((item) => item.sourceId === jobSourceId)!;
    setMatchFeedback({
      kind: correct ? "success" : "rethink",
      title: correct ? "Useful job matched" : "That is another source’s job",
      message: correct ? `${currentMatchSource.type} helps us ${selectedJob.label.charAt(0).toLowerCase()}${selectedJob.label.slice(1)} ${currentMatchSource.job}` : `${selectedJob.label} Which source on the board can actually do that?`,
    });
  };

  const moveMatch = (direction: -1 | 1) => {
    setMatchIndex((current) => Math.max(0, Math.min(sources.length - 1, current + direction)));
    setMatchFeedback(null);
  };

  const toggleEvidence = (item: Evidence) => {
    const isSelected = selectedEvidence.includes(item.id);
    if (isSelected) {
      setSelectedEvidence((current) => current.filter((id) => id !== item.id));
      setEvidenceFeedback({ kind: "note", title: "Evidence removed", message: `${item.short} is no longer on the claim board.` });
      setClaimVerified(false);
      return;
    }
    if (selectedEvidence.length >= 4) {
      setEvidenceFeedback({ kind: "rethink", title: "Keep the board focused", message: "Choose no more than four pieces. Remove one before adding another." });
      return;
    }
    setSelectedEvidence((current) => [...current, item.id]);
    setEvidenceFeedback({ kind: item.strong ? "success" : "note", title: item.strong ? "Useful evidence added" : "Accurate—but is it useful?", message: item.response });
    setClaimVerified(false);
  };

  const chooseClaim = (id: string) => {
    const claim = claims.find((item) => item.id === id)!;
    setClaimId(id);
    const verified = claim.correct && evidenceReady;
    setClaimVerified(verified);
    setClaimFeedback({
      kind: verified ? "success" : "rethink",
      title: verified ? "Claim supported by more than one kind of source" : claim.correct ? "The claim works; the evidence board needs one change" : "The sources do not carry this claim",
      message: claim.correct && !evidenceReady ? "Choose at least two strong pieces from two different source types, including temperature data. Then return to this claim." : claim.feedback,
    });
  };

  const chooseLimit = (id: string) => {
    const limit = limits.find((item) => item.id === id)!;
    setLimitId(id);
    setLimitVerified(limit.correct);
    setLimitFeedback({ kind: limit.correct ? "success" : "rethink", title: limit.correct ? "A responsible next step" : "This leaves important uncertainty hidden", message: limit.feedback });
  };

  const resetLab = () => {
    setStep(0);
    setSourceIndex(0);
    setNoticed([]);
    setTourFeedback(null);
    setMatchIndex(0);
    setMatched([]);
    setMatchFeedback(null);
    setSelectedEvidence([]);
    setEvidenceFeedback(null);
    setClaimId(null);
    setClaimVerified(false);
    setClaimFeedback(null);
    setLimitId(null);
    setLimitVerified(false);
    setLimitFeedback(null);
  };

  return (
    <section className="source-mosaic-lab" data-audience={audience} data-experience-id={sourceMosaicExperienceId} aria-labelledby={titleId}>
      <header className="mosaic-hero">
        <div>
          <small>LANGUAGE ARTS · THE EVIDENCE MOSAIC</small>
          <h2 id={titleId}>Can we cool the courtyard?</h2>
          <p>Four source types hold different clues. Put them together to recommend a cooler, more welcoming outdoor space.</p>
          <div className="mosaic-hero-question"><strong>OUR SOLUTIONARY QUESTION</strong><span>How could a school make a hot paved outdoor area cooler and more welcoming?</span></div>
        </div>
        <div className="mosaic-hero-visual">
          <figure className="mosaic-courtyard-scene">
            <span className="sr-only">Illustrated fictional school courtyard with a large dark paved area in full sun, one small tree casting limited shade, lighter paving, benches, planted edges, and deep shade beside the building.</span>
            <figcaption><b>NOTICE THE PLACE</b><span>Where does heat build up? Where could people sit? What would a picture alone still not tell us?</span></figcaption>
          </figure>
          <div className="mosaic-hero-art" aria-label="Four source tiles joining into one evidence mosaic">
            <span data-source="data"><b>01</b><i aria-hidden="true">▥</i><strong>NUMBERS</strong></span>
            <span data-source="map"><b>02</b><i aria-hidden="true">⌖</i><strong>PLACE</strong></span>
            <span data-source="voices"><b>03</b><i aria-hidden="true">“ ”</i><strong>PEOPLE</strong></span>
            <span data-source="guide"><b>04</b><i aria-hidden="true">◎</i><strong>WHY</strong></span>
          </div>
        </div>
      </header>

      {audience === "teacher" && (
        <aside className="mosaic-teacher-note">
          <strong>PROJECTOR PLAN · 35–45 MIN</strong>
          <p>Run every decision by class vote, then ask one student to justify the choice before clicking. No handouts or advance preparation are required. The sources are intentionally fictional so students can practise source reasoning without mistaking them for local evidence.</p>
        </aside>
      )}

      <section className="mosaic-purpose-strip" aria-label="What source means in this lesson">
        <strong>WHAT IS A SOURCE?</strong>
        <p>A source is something we examine for information. Different source <em>types</em> answer different questions. No single source gives the whole picture.</p>
      </section>

      <nav className="mosaic-progress" aria-label="Evidence mosaic lesson steps">
        {stepLabels.map((label, index) => (
          <button type="button" key={label} disabled={index > maxUnlocked} aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}>
            <b>{index < 5 && completed[index] ? "✓" : index + 1}</b><span>{label}</span>
          </button>
        ))}
      </nav>

      <section className="mosaic-workspace" aria-label="Evidence mosaic workspace">
        <h3 ref={stepHeadingRef} tabIndex={-1}>{stepLabels[step]}</h3>

        {step === 0 && (
          <section className="mosaic-step">
            <header><span>{sourceIndex + 1}</span><div><small>DO THIS NOW</small><h4>Read one source. Find the clue it can actually support.</h4><p>Do not guess beyond the source. Each correct clue adds one tile to your evidence board.</p></div></header>
            <div className="mosaic-source-heading"><div><small>{currentSource.number}</small><h4>{currentSource.type}</h4><p>{currentSource.plainName}</p></div><aside><strong>THIS SOURCE CAN HELP US ASK</strong><span>{currentSource.question}</span></aside></div>
            <SourceDisplay sourceId={currentSource.id} />
            <fieldset className="mosaic-choice-panel">
              <legend>{currentSource.cluePrompt}</legend>
              <div>{currentSource.clueChoices.map((choice) => <button type="button" key={choice.id} onClick={() => chooseTourClue(choice)}>{choice.label}</button>)}</div>
            </fieldset>
            <FeedbackPanel feedback={tourFeedback} />
            <div className="mosaic-within-step-nav">
              <button type="button" disabled={sourceIndex === 0} onClick={() => moveTour(-1)}>← Previous source</button>
              <span>{noticed.length} of 4 source clues found</span>
              <button type="button" disabled={!noticed.includes(currentSource.id) || sourceIndex === 3} onClick={() => moveTour(1)}>{sourceIndex === 3 ? "All sources opened" : "Next source →"}</button>
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="mosaic-step">
            <header><span>{matchIndex + 1}</span><div><small>DO THIS NOW</small><h4>Match this source type to the job it does best.</h4><p>The same topic can need numbers, a map, people’s experiences, and an explanation—but each helps in a different way.</p></div></header>
            <article className="mosaic-match-card"><SourceBadge sourceId={currentMatchSource.id} /><h4>{currentMatchSource.plainName}</h4><p>{currentMatchSource.question}</p></article>
            <fieldset className="mosaic-job-choices"><legend>What is this source type especially useful for?</legend><div>{sourceJobs.map((job) => <button type="button" key={job.id} onClick={() => chooseJob(job.sourceId)}>{job.label}</button>)}</div></fieldset>
            <FeedbackPanel feedback={matchFeedback} />
            <div className="mosaic-within-step-nav">
              <button type="button" disabled={matchIndex === 0} onClick={() => moveMatch(-1)}>← Previous type</button>
              <span>{matched.length} of 4 jobs matched</span>
              <button type="button" disabled={!matched.includes(currentMatchSource.id) || matchIndex === 3} onClick={() => moveMatch(1)}>{matchIndex === 3 ? "All jobs matched" : "Next type →"}</button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="mosaic-step">
            <header><span>3</span><div><small>DO THIS NOW</small><h4>Choose two to four pieces for the claim board.</h4><p>Use at least two source types, including temperature data. Choose evidence because it helps—not because it sounds official.</p></div></header>
            <div className="mosaic-evidence-board" aria-label={`${selectedEvidence.length} evidence pieces selected`}>
              {evidenceChoices.map((item) => {
                const selected = selectedEvidence.includes(item.id);
                return <button type="button" key={item.id} aria-pressed={selected} data-source={item.sourceId} onClick={() => toggleEvidence(item)}><SourceBadge sourceId={item.sourceId} /><strong>{item.short}</strong><span>{item.detail}</span><b>{selected ? "✓ ON CLAIM BOARD" : "+ ADD EVIDENCE"}</b></button>;
              })}
            </div>
            <FeedbackPanel feedback={evidenceFeedback} />
            <aside className="mosaic-board-check" data-ready={evidenceReady ? "true" : "false"} aria-live="polite"><strong>{evidenceReady ? "Evidence board ready" : "Evidence board still needs…"}</strong><span>{evidenceReady ? `${strongEvidence.length} useful pieces from ${strongSourceTypes.size} source types, including temperature data.` : `${Math.max(0, 2 - strongEvidence.length)} more useful piece${2 - strongEvidence.length === 1 ? "" : "s"}; useful evidence from at least two types; and temperature data.`}</span></aside>
          </section>
        )}

        {step === 3 && (
          <section className="mosaic-step">
            <header><span>4</span><div><small>DO THIS NOW</small><h4>Choose the claim the sources can carry.</h4><p>A strong solutionary claim is specific, realistic, open to testing, and honest about what is not known yet.</p></div></header>
            <section className="mosaic-selected-evidence" aria-label="Evidence available for the claim"><h4>Your evidence board</h4><div>{chosenEvidence.map((item) => <span key={item.id}><SourceBadge sourceId={item.sourceId} />{item.short}</span>)}</div></section>
            <div className="mosaic-claim-choices">{claims.map((claim) => <button type="button" key={claim.id} aria-pressed={claimId === claim.id} onClick={() => chooseClaim(claim.id)}><small>{claim.label}</small><strong>{claim.text}</strong></button>)}</div>
            <FeedbackPanel feedback={claimFeedback} />
          </section>
        )}

        {step === 4 && (
          <section className="mosaic-step">
            <header><span>5</span><div><small>DO THIS NOW</small><h4>Name what we still need to learn.</h4><p>Responsible communicators do not hide a source’s limits. Choose the next information that would make this recommendation safer and stronger.</p></div></header>
            {selectedClaim && <article className="mosaic-working-claim"><small>WORKING CLAIM</small><p>{selectedClaim.text}</p></article>}
            <div className="mosaic-limit-choices">{limits.map((limit) => <button type="button" key={limit.id} aria-pressed={limitId === limit.id} onClick={() => chooseLimit(limit.id)}><strong>{limit.label}</strong><span>{limit.text}</span></button>)}</div>
            <FeedbackPanel feedback={limitFeedback} />
          </section>
        )}

        {step === 5 && selectedClaim && selectedLimit && (
          <section className="mosaic-step mosaic-final-step">
            <header><span>✓</span><div><small>30-SECOND CLASS BRIEF</small><h4>One claim. Multiple source types. One honest limit.</h4><p>Read the brief aloud. Ask the class which sentence comes from which source.</p></div></header>
            <article className="mosaic-final-brief">
              <header><div><small>THE COOLER COURTYARD CASE</small><h4>Recommendation ready for discussion</h4></div><span>{strongSourceTypes.size} SOURCE TYPES</span></header>
              <section><small>OUR CLAIM</small><p>{selectedClaim.text}</p></section>
              <section><small>OUR EVIDENCE</small><ul>{strongEvidence.map((item) => <li key={item.id}><SourceBadge sourceId={item.sourceId} /><span>{item.detail}</span></li>)}</ul></section>
              <section><small>WHAT WE DO NOT KNOW YET</small><p>{selectedLimit.text}</p></section>
              <footer><strong>WHY THE SOURCES WORK TOGETHER</strong><p>The data measures the heat pattern. Other source types add place, people’s experiences, or informed explanation. Together they support a testable response—not a guarantee.</p></footer>
            </article>
            <aside className="mosaic-extension"><strong>OPTIONAL LATER · PAPER OR PARTNER WORK</strong><span>Sketch a second possible courtyard response. Label which source supports each design choice and circle one new question you would investigate.</span></aside>
          </section>
        )}

        <div className="mosaic-step-actions">
          <button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>← Previous step</button>
          {step < 5 && <button type="button" className="mosaic-next-button" disabled={!completed[step]} onClick={() => setStep((current) => Math.min(5, current + 1))}>{completed[step] ? "Next step →" : "Finish this decision first"}</button>}
        </div>
      </section>

      <footer className="mosaic-footer"><div><strong>ONE SOURCE IS ONE PIECE</strong><span>Useful claims become stronger when different source types answer different parts of the question.</span></div><button type="button" onClick={resetLab}>Reset the whole lesson</button></footer>
    </section>
  );
}

export default SourceMosaicLab;
