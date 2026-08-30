"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

export type Unit3ExperienceProps = {
  sceneIndex: number;
  audience: "student" | "teacher";
};

type ExperienceFrameProps = Unit3ExperienceProps & {
  theme: "city" | "data" | "chain" | "cooperation";
  eyebrow: string;
  title: string;
  prompt: string;
  teacherNote: string;
  footer: string;
  children: ReactNode;
};

function safeScene(sceneIndex: number) {
  return Math.max(0, Math.min(3, sceneIndex));
}

function ExperienceFrame({
  sceneIndex,
  audience,
  theme,
  eyebrow,
  title,
  prompt,
  teacherNote,
  footer,
  children,
}: ExperienceFrameProps) {
  return (
    <section className="unit3-experience" data-theme={theme}>
      <header className="unit3-experience__header">
        <div>
          <small>{eyebrow}</small>
          <h3>{title}</h3>
          <p>{prompt}</p>
        </div>
        <b>PART {safeScene(sceneIndex) + 1} OF 4</b>
      </header>
      {audience === "teacher" && (
        <aside className="unit3-teacher-note">
          <strong>TEACHER MOVE</strong>
          <span>{teacherNote}</span>
        </aside>
      )}
      <div className="unit3-experience__body">{children}</div>
      <footer className="unit3-experience__footer">
        <strong>TAKE THIS WITH YOU</strong>
        <span>{footer}</span>
      </footer>
    </section>
  );
}

function ChoiceFeedback({ correct, children }: { correct: boolean; children: ReactNode }) {
  return (
    <div className="unit3-feedback" data-state={correct ? "supported" : "rethink"} aria-live="polite">
      <strong>{correct ? "SUPPORTED BY THE CARD" : "CHECK THE EXACT WORDS"}</strong>
      <span>{children}</span>
    </div>
  );
}

const movementStories = [
  {
    title: "A move to the city",
    text: "A family moves from a smaller town to a city in the same country after a parent finds work and an older child needs a nearby secondary school.",
    movement: "Within one country",
    reasons: ["Work", "School"],
    limit: "The card does not tell us whether the move was easy, permanent, or the family’s first choice.",
  },
  {
    title: "A move across a border",
    text: "A nurse accepts a job in another country. Their partner and child move with them and plan to stay close to relatives already living there.",
    movement: "Across a country border",
    reasons: ["Work", "Family connections"],
    limit: "The card names reasons for moving, but it does not tell us how every family member feels.",
  },
  {
    title: "A move after repeated flooding",
    text: "After repeated floods damage homes, several families move to a safer inland city without leaving their country.",
    movement: "Within one country",
    reasons: ["Safety", "Environment"],
    limit: "Movement within a country is still migration. This short card cannot show everything families lost, kept, or rebuilt.",
  },
  {
    title: "Not enough information yet",
    text: "A photo caption says, ‘New neighbours arrived this month.’ It gives no starting place, destination, reason, or source link.",
    movement: "Not enough information",
    reasons: [],
    limit: "Do not invent a reason. Find the original source or ask a careful question.",
  },
] as const;

const movementChoices = ["Within one country", "Across a country border", "Not enough information"];
const cityNeeds = ["Homes", "School spaces", "Transit", "Health services", "Public space"];
const cityConditions = [
  "Many newcomers rely on transit during their first months.",
  "The closest school is already using every classroom.",
  "New housing is far from clinics and community spaces.",
] as const;

export function CityMovesLab({ sceneIndex, audience }: Unit3ExperienceProps) {
  const scene = safeScene(sceneIndex);
  const [storyIndex, setStoryIndex] = useState(0);
  const [movementChoice, setMovementChoice] = useState("");
  const [reasonChoices, setReasonChoices] = useState<string[]>([]);
  const [cityPriorities, setCityPriorities] = useState<string[]>([]);
  const [conditionIndex, setConditionIndex] = useState(0);
  const [cityResponse, setCityResponse] = useState("Build near frequent transit");
  const story = movementStories[storyIndex];

  const chooseStory = (index: number) => {
    setStoryIndex(index);
    setMovementChoice("");
    setReasonChoices([]);
  };

  const toggleReason = (reason: string) => {
    setReasonChoices((current) =>
      current.includes(reason) ? current.filter((item) => item !== reason) : [...current, reason],
    );
  };

  const togglePriority = (priority: string) => {
    setCityPriorities((current) => {
      if (current.includes(priority)) return current.filter((item) => item !== priority);
      if (current.length >= 2) return current;
      return [...current, priority];
    });
  };

  if (scene === 0) {
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="city"
        eyebrow="CITY MOVES · STORY MAP"
        title="Movement is more than crossing a border."
        prompt="Read one short card. Decide what kind of movement the evidence shows. Do not guess a reason that is not stated."
        teacherNote="Keep every card in the third person. Do not ask students to reveal family migration, refugee, housing, or displacement experiences. Clarify that migration can be voluntary, forced, temporary, permanent, internal, or international."
        footer="A careful description names the movement the source shows and keeps the rest uncertain."
      >
        <nav className="unit3-tab-row" aria-label="Choose a movement story">
          {movementStories.map((item, index) => (
            <button
              type="button"
              key={item.title}
              aria-pressed={storyIndex === index}
              className={storyIndex === index ? "selected" : ""}
              onClick={() => chooseStory(index)}
            >
              <small>CARD {index + 1}</small>
              <strong>{item.title}</strong>
            </button>
          ))}
        </nav>
        <article className="unit3-source-card">
          <small>FICTIONAL COMPOSITE · NOT A COMPLETE LIFE STORY</small>
          <h4>{story.title}</h4>
          <p>{story.text}</p>
        </article>
        <div className="unit3-choice-grid" role="group" aria-label="Choose the kind of movement">
          {movementChoices.map((choice) => (
            <button
              type="button"
              key={choice}
              aria-pressed={movementChoice === choice}
              className={movementChoice === choice ? "selected" : ""}
              onClick={() => setMovementChoice(choice)}
            >
              {choice}
            </button>
          ))}
        </div>
        {movementChoice && (
          <ChoiceFeedback correct={movementChoice === story.movement}>
            {movementChoice === story.movement
              ? `${story.movement}. ${story.limit}`
              : `The card supports “${story.movement}.” Point to the place words that prove it.`}
          </ChoiceFeedback>
        )}
      </ExperienceFrame>
    );
  }

  if (scene === 1) {
    const possibleReasons = ["Work", "School", "Family connections", "Safety", "Environment", "Housing"];
    const unsupported = reasonChoices.filter((reason) => !story.reasons.includes(reason as never));
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="city"
        eyebrow="REASON CONSTELLATION"
        title="People often move for more than one reason."
        prompt="Choose every reason this card actually names. Then connect the reasons without deciding which one mattered most."
        teacherNote="Avoid simple push–pull formulas that turn complex lives into a checklist. Ask what the card supports, what remains unknown, and what larger systems may shape the available choices."
        footer="Evidence can show several connected reasons without telling us a person’s private feelings or full story."
      >
        <article className="unit3-source-card compact">
          <small>CURRENT CARD</small>
          <p>{story.text}</p>
        </article>
        <div className="unit3-reason-web" role="group" aria-label="Choose supported reasons">
          <div className="unit3-reason-web__centre">MOVE</div>
          {possibleReasons.map((reason) => (
            <button
              type="button"
              key={reason}
              aria-pressed={reasonChoices.includes(reason)}
              className={reasonChoices.includes(reason) ? "selected" : ""}
              onClick={() => toggleReason(reason)}
            >
              {reason}
            </button>
          ))}
        </div>
        <div className="unit3-proof-strip" aria-live="polite">
          <strong>{reasonChoices.length === 0 ? "Choose only what the card names." : `${reasonChoices.length} reason${reasonChoices.length === 1 ? "" : "s"} selected`}</strong>
          <span>
            {unsupported.length > 0
              ? `Check again: the card does not name ${unsupported.join(" or ")}.`
              : story.reasons.length === 0
                ? "This card gives no reason. Careful uncertainty is the strongest answer."
                : `Supported by the card: ${story.reasons.join(" and ")}.`}
          </span>
        </div>
      </ExperienceFrame>
    );
  }

  if (scene === 2) {
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="city"
        eyebrow="CITY RIPPLE CHALLENGE"
        title="When a city changes, connected systems change too."
        prompt="Your planning team can investigate two priorities first. Choose them, reveal a new condition, and explain what your first plan may have missed."
        teacherNote="Frame newcomers as residents with knowledge, relationships, work, culture, and rights—not as a burden on services. The planning problem is how systems prepare fairly for change."
        footer="Urban change can create pressure and possibility at the same time. A strong plan watches how systems connect."
      >
        <div className="unit3-city-board">
          <header>
            <small>FICTIONAL CITY PLANNING BRIEF</small>
            <h4>One district expects 100 new households over the next year.</h4>
            <p>Choose two systems to study first. You are choosing an investigation priority, not deciding which needs matter.</p>
          </header>
          <div role="group" aria-label="Choose two city systems">
            {cityNeeds.map((need) => (
              <button
                type="button"
                key={need}
                aria-pressed={cityPriorities.includes(need)}
                className={cityPriorities.includes(need) ? "selected" : ""}
                onClick={() => togglePriority(need)}
              >
                <b>{cityPriorities.includes(need) ? "SELECTED" : "SYSTEM"}</b>
                <span>{need}</span>
              </button>
            ))}
          </div>
        </div>
        <section className="unit3-condition-card">
          <small>NEW CONDITION {conditionIndex + 1}</small>
          <strong>{cityConditions[conditionIndex]}</strong>
          <button type="button" onClick={() => setConditionIndex((conditionIndex + 1) % cityConditions.length)}>
            Reveal another condition
          </button>
        </section>
        <div className="unit3-proof-strip" aria-live="polite">
          <strong>{cityPriorities.length}/2 investigation priorities chosen</strong>
          <span>{cityPriorities.length === 2 ? `Test how ${cityPriorities[0]} and ${cityPriorities[1]} affect one another.` : "Choose two connected systems before revising the plan."}</span>
        </div>
      </ExperienceFrame>
    );
  }

  const responses = ["Build near frequent transit", "Add school and community space together", "Create a temporary service hub", "Gather resident evidence first"];
  return (
    <ExperienceFrame
      sceneIndex={scene}
      audience={audience}
      theme="city"
      eyebrow="SYSTEMS MAP"
      title="Build a chain, then test a response."
      prompt="Connect a reason for movement, a city change, two linked systems, and one possible response. Name one limit before calling the response strong."
      teacherNote="This is the bridge into the year-long inquiry. Assess the accuracy of the connection and the stated limit, not whether a group chose your preferred response."
      footer="A systems map explains connections. It does not blame people for pressures created by policies, resources, or planning choices."
    >
      <div className="unit3-system-chain">
        <article><small>REASON</small><strong>Evidence from a movement card</strong></article>
        <i aria-hidden="true">→</i>
        <article><small>CHANGE</small><strong>More people live in one part of the city</strong></article>
        <i aria-hidden="true">→</i>
        <article><small>SYSTEMS</small><strong>{cityPriorities.length > 0 ? cityPriorities.join(" + ") : "Choose two connected systems"}</strong></article>
        <i aria-hidden="true">→</i>
        <article><small>RESPONSE</small><strong>{cityResponse}</strong></article>
      </div>
      <div className="unit3-response-grid" role="group" aria-label="Choose a city response to test">
        {responses.map((response) => (
          <button
            type="button"
            key={response}
            aria-pressed={cityResponse === response}
            className={cityResponse === response ? "selected" : ""}
            onClick={() => setCityResponse(response)}
          >
            {response}
          </button>
        ))}
      </div>
      <section className="unit3-make-card">
        <small>TEAM EVIDENCE PRODUCT</small>
        <h4>One systems map + one honest limit</h4>
        <p>“This response may help because… It may not help when… We still need evidence about…”</p>
      </section>
    </ExperienceFrame>
  );
}

const skylineData = [
  {
    title: "Home internet · practice data",
    overall: 78,
    groups: [
      ["Urban area", 91],
      ["Rural area", 55],
    ] as const,
  },
  {
    title: "School participation · practice data",
    overall: 83,
    groups: [
      ["Higher-income households", 94],
      ["Lower-income households", 62],
    ] as const,
  },
  {
    title: "Safe water access · practice data",
    overall: 84,
    groups: [
      ["District A", 95],
      ["District B", 58],
    ] as const,
  },
] as const;

function DataBar({ label, value, tone = "main" }: { label: string; value: number; tone?: "main" | "compare" }) {
  return (
    <article className="unit3-data-bar" data-tone={tone}>
      <header><strong>{label}</strong><b>{value}%</b></header>
      <div><span style={{ width: `${value}%` }} /></div>
    </article>
  );
}

export function DataSkylineLab({ sceneIndex, audience }: Unit3ExperienceProps) {
  const scene = safeScene(sceneIndex);
  const [distributionChoice, setDistributionChoice] = useState("");
  const [dataIndex, setDataIndex] = useState(0);
  const [claimChoice, setClaimChoice] = useState("");
  const [missingEvidence, setMissingEvidence] = useState("change over time");
  const dataset = skylineData[dataIndex];
  const gap = dataset.groups[0][1] - dataset.groups[1][1];

  if (scene === 0) {
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="data"
        eyebrow="DATA SKYLINE · WARM-UP"
        title="The same average can hide a different story."
        prompt="Both fictional groups average 50 points. Study the full set before deciding which group has the larger gap."
        teacherNote="Use neutral practice numbers before real global data. Do not turn countries into winners and losers. The goal is to notice distribution, missing groups, and limits—not to rank people."
        footer="An average is one view. Always ask how the values are spread and whose experience may be hidden."
      >
        <div className="unit3-distribution-grid">
          <article>
            <small>GROUP A · AVERAGE 50</small>
            <div>{[46, 48, 50, 52, 54].map((value) => <span key={value} style={{ height: `${value * 2}px` }}><b>{value}</b></span>)}</div>
          </article>
          <article>
            <small>GROUP B · AVERAGE 50</small>
            <div>{[10, 30, 50, 70, 90].map((value) => <span key={value} style={{ height: `${value * 2}px` }}><b>{value}</b></span>)}</div>
          </article>
        </div>
        <div className="unit3-choice-grid two" role="group" aria-label="Choose the group with the larger gap">
          {["Group A", "Group B"].map((choice) => (
            <button type="button" key={choice} aria-pressed={distributionChoice === choice} className={distributionChoice === choice ? "selected" : ""} onClick={() => setDistributionChoice(choice)}>{choice} has the larger gap</button>
          ))}
        </div>
        {distributionChoice && (
          <ChoiceFeedback correct={distributionChoice === "Group B"}>
            {distributionChoice === "Group B" ? "Both averages are 50, but Group B stretches from 10 to 90." : "Check the distance between the lowest and highest values, not only the average."}
          </ChoiceFeedback>
        )}
      </ExperienceFrame>
    );
  }

  if (scene === 1) {
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="data"
        eyebrow="BUILD THE SKYLINE"
        title="Open the overall number."
        prompt="Choose a fictional practice dataset. Compare the overall bar with two groups inside it. Then name the gap without inventing its cause."
        teacherNote="After this model, replace the practice data with a small, dated excerpt from the World Bank, UNICEF, UNDP, or another verified source. Include gender, class, location, or disability only when the source defines the groups clearly."
        footer="A subgroup gap is evidence that experiences differ. It is not proof of why the gap exists."
      >
        <nav className="unit3-tab-row three" aria-label="Choose a practice dataset">
          {skylineData.map((item, index) => (
            <button type="button" key={item.title} aria-pressed={dataIndex === index} className={dataIndex === index ? "selected" : ""} onClick={() => { setDataIndex(index); setClaimChoice(""); }}>
              <small>SET {index + 1}</small><strong>{item.title.replace(" · practice data", "")}</strong>
            </button>
          ))}
        </nav>
        <section className="unit3-skyline">
          <header><small>FICTIONAL PRACTICE DATA · NOT A COUNTRY PROFILE</small><h4>{dataset.title}</h4></header>
          <DataBar label="Overall" value={dataset.overall} />
          {dataset.groups.map(([label, value]) => <DataBar key={label} label={label} value={value} tone="compare" />)}
          <footer><strong>{gap}-point gap</strong><span>between the two displayed groups</span></footer>
        </section>
      </ExperienceFrame>
    );
  }

  if (scene === 2) {
    const claims = [
      { id: "A", text: `The overall rate is ${dataset.overall}%, so access is almost the same for everyone.` },
      { id: "B", text: `The overall rate hides a ${gap}-point gap between the two displayed groups.` },
      { id: "C", text: `${dataset.groups[1][0]} have a lower rate because they do not value this service.` },
    ];
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="data"
        eyebrow="MYSTERY MATCH"
        title="Which claim can this chart actually support?"
        prompt="Choose one claim. Be ready to point to the exact bars or numbers that make it defensible."
        teacherNote="Interrupt deficit explanations immediately. A chart can show a pattern, not a group’s values, effort, intelligence, or reason for an outcome. Require another source before discussing causes."
        footer="Describe the pattern first. Investigate causes with more evidence and affected perspectives."
      >
        <section className="unit3-mini-chart">
          <DataBar label={dataset.groups[0][0]} value={dataset.groups[0][1]} tone="compare" />
          <DataBar label={dataset.groups[1][0]} value={dataset.groups[1][1]} tone="compare" />
        </section>
        <div className="unit3-claim-grid" role="group" aria-label="Choose the supported data claim">
          {claims.map((claim) => (
            <button type="button" key={claim.id} aria-pressed={claimChoice === claim.id} className={claimChoice === claim.id ? "selected" : ""} onClick={() => setClaimChoice(claim.id)}>
              <b>{claim.id}</b><span>{claim.text}</span>
            </button>
          ))}
        </div>
        {claimChoice && (
          <ChoiceFeedback correct={claimChoice === "B"}>
            {claimChoice === "B" ? "The two bars support the size of the displayed gap. They do not explain its cause." : claimChoice === "A" ? "An overall number can hide very different subgroup results." : "The chart gives no evidence about what a group values. That is a stereotype, not a conclusion."}
          </ChoiceFeedback>
        )}
      </ExperienceFrame>
    );
  }

  const missingOptions = ["change over time", "differences within each group", "reasons for the gap", "people’s experiences"];
  return (
    <ExperienceFrame
      sceneIndex={scene}
      audience={audience}
      theme="data"
      eyebrow="DATA STORY STUDIO"
      title="Write a caption that keeps the gap visible."
      prompt="Build a four-part data story: overall pattern, hidden gap, honest limit, and the next evidence you need."
      teacherNote="Use this as one section of the Unit 3 systems map. A short audio explanation can be kept as formative evidence, but it does not need its own SpacesEDU post."
      footer="Strong data stories are precise, humane, and honest about what a number cannot show."
    >
      <section className="unit3-caption-builder">
        <article><b>1</b><div><small>OVERALL</small><p>The overall data shows {dataset.overall}%.</p></div></article>
        <article><b>2</b><div><small>HIDDEN GAP</small><p>The displayed groups differ by {gap} percentage points.</p></div></article>
        <article><b>3</b><div><small>LIMIT</small><p>This chart does not tell us why the gap exists.</p></div></article>
        <article><b>4</b><div><small>NEXT EVIDENCE</small><p>Next, investigate {missingEvidence}.</p></div></article>
      </section>
      <div className="unit3-response-grid" role="group" aria-label="Choose the next evidence needed">
        {missingOptions.map((option) => (
          <button type="button" key={option} aria-pressed={missingEvidence === option} className={missingEvidence === option ? "selected" : ""} onClick={() => setMissingEvidence(option)}>{option}</button>
        ))}
      </div>
      <section className="unit3-make-card">
        <small>TEAM EVIDENCE PRODUCT</small>
        <h4>One data panel for the systems map</h4>
        <p>Add the real source, year, group definitions, supported pattern, and limitation before using it in an inquiry.</p>
      </section>
    </ExperienceFrame>
  );
}

const supplyProducts = [
  { name: "T-shirt", chain: ["Fibre", "Yarn and fabric", "Cut and sew", "Transport", "Use and repair"] },
  { name: "Backpack", chain: ["Fibres and materials", "Fabric and parts", "Assembly", "Transport", "Use and repair"] },
  { name: "Tablet", chain: ["Minerals and glass", "Components", "Assembly", "Transport", "Use and recycle"] },
] as const;

const supplyShocks = [
  { title: "A severe storm closes a port", effect: "Materials wait, shipping routes change, delivery slows, and transport costs may rise." },
  { title: "A safety inspection pauses one site", effect: "Production slows while hazards are repaired. Delay can protect workers and prevent greater harm." },
  { title: "A drought reduces a raw material", effect: "Supply falls, producers seek substitutes, prices may change, and environmental pressure can move elsewhere." },
] as const;

const labourEvidenceCards = [
  { text: "An independent inspection records blocked fire exits and missing protective equipment.", answer: "Concern supported", reason: "The documented hazards are direct evidence of unsafe conditions." },
  { text: "The label says the product was made in another country.", answer: "Question remains", reason: "A country label alone proves neither harm nor fair conditions." },
  { text: "Workers can choose representatives, report safety problems without punishment, and see the follow-up results.", answer: "Protection supported", reason: "These are specific protections, though they still need trustworthy verification." },
] as const;

const supplyPatches = [
  { title: "Worker-led safety checks", tags: ["FAIRNESS", "VOICE"], tradeoff: "Needs time, independent access, and real power to correct hazards." },
  { title: "Longer, steadier contracts", tags: ["FAIRNESS", "RESILIENCE"], tradeoff: "May reduce last-minute flexibility or increase the sale price." },
  { title: "More than one verified source", tags: ["RESILIENCE", "TRACEABILITY"], tradeoff: "More suppliers can also make oversight harder." },
  { title: "Repair, reuse, and longer product life", tags: ["WASTE", "RESILIENCE"], tradeoff: "Requires repair access, parts, and designs that can be opened safely." },
] as const;

export function SupplyChainLab({ sceneIndex, audience }: Unit3ExperienceProps) {
  const scene = safeScene(sceneIndex);
  const [productIndex, setProductIndex] = useState(0);
  const [shockIndex, setShockIndex] = useState(0);
  const [labourCardIndex, setLabourCardIndex] = useState(0);
  const [labourChoice, setLabourChoice] = useState("");
  const [patches, setPatches] = useState<string[]>([]);
  const product = supplyProducts[productIndex];
  const shock = supplyShocks[shockIndex];
  const labourCard = labourEvidenceCards[labourCardIndex];

  const chooseLabourCard = (index: number) => {
    setLabourCardIndex(index);
    setLabourChoice("");
  };

  const togglePatch = (patch: string) => {
    setPatches((current) => {
      if (current.includes(patch)) return current.filter((item) => item !== patch);
      if (current.length >= 2) return current;
      return [...current, patch];
    });
  };

  if (scene === 0) {
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="chain"
        eyebrow="OBJECT DETECTIVE"
        title="One object can connect many places and decisions."
        prompt="Choose a familiar object. Build its possible journey, then mark where a real label, company record, or trade source is needed."
        teacherNote="The displayed chain is a model, not the verified history of a student’s item. Use a real product label and one trustworthy source before naming countries or companies."
        footer="A supply chain model shows connections. Evidence is still needed to trace a real product."
      >
        <nav className="unit3-product-tabs" aria-label="Choose a product">
          {supplyProducts.map((item, index) => (
            <button type="button" key={item.name} aria-pressed={productIndex === index} className={productIndex === index ? "selected" : ""} onClick={() => setProductIndex(index)}>
              <small>TRACE</small><strong>{item.name}</strong>
            </button>
          ))}
        </nav>
        <div className="unit3-supply-line">
          {product.chain.map((step, index) => (
            <article key={step}>
              <b>{index + 1}</b><strong>{step}</strong><small>{index === product.chain.length - 1 ? "The chain continues after purchase." : "Needs a source for a real object."}</small>
            </article>
          ))}
        </div>
        <section className="unit3-proof-strip">
          <strong>LABEL CHECK</strong>
          <span>What does the object state? What can you trace? What remains unknown?</span>
        </section>
      </ExperienceFrame>
    );
  }

  if (scene === 1) {
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="chain"
        eyebrow="SUPPLY-CHAIN SHOCKWAVE"
        title="A change at one link can travel through the web."
        prompt="Reveal one disruption. Trace at least three effects before choosing a response. Watch for effects that protect people as well as effects that create delay."
        teacherNote="Students represent supply-chain stages, not exploited workers or disaster victims. Do not reward the fastest or cheapest response automatically; include safety, rights, waste, and resilience."
        footer="Interdependence spreads benefits, delays, costs, choices, and responsibilities across the chain."
      >
        <div className="unit3-supply-line active">
          {product.chain.map((step, index) => <article key={step}><b>{index + 1}</b><strong>{step}</strong><small>{index === 0 ? "START THE RIPPLE" : "What changes here?"}</small></article>)}
        </div>
        <nav className="unit3-shock-tabs" aria-label="Choose a supply-chain disruption">
          {supplyShocks.map((item, index) => (
            <button type="button" key={item.title} aria-pressed={shockIndex === index} className={shockIndex === index ? "selected" : ""} onClick={() => setShockIndex(index)}>
              <small>SHOCK {index + 1}</small><strong>{item.title}</strong>
            </button>
          ))}
        </nav>
        <article className="unit3-condition-card chain">
          <small>RIPPLE TO TRACE</small><strong>{shock.effect}</strong>
          <p>At each link ask: What changes? Who decides? Who carries a cost? What evidence would confirm this?</p>
        </article>
      </ExperienceFrame>
    );
  }

  if (scene === 2) {
    const labourChoices = ["Concern supported", "Question remains", "Protection supported"];
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="chain"
        eyebrow="LABOUR EVIDENCE CHECK"
        title="A label is not a verdict. Check the evidence."
        prompt="Read one card. Decide whether it supports a labour concern, supports a protection, or leaves a question."
        teacherNote="Do not imply that all work in a country or industry is abusive. Do not simulate forced or child labour. Use ILO language and records to examine conditions, protections, worker voice, and uncertainty."
        footer="Judge documented conditions and protections—not workers, cultures, or countries."
      >
        <nav className="unit3-tab-row three" aria-label="Choose a labour evidence card">
          {labourEvidenceCards.map((_, index) => (
            <button type="button" key={index} aria-pressed={labourCardIndex === index} className={labourCardIndex === index ? "selected" : ""} onClick={() => chooseLabourCard(index)}>
              <small>EVIDENCE</small><strong>Card {index + 1}</strong>
            </button>
          ))}
        </nav>
        <article className="unit3-source-card chain"><small>SOURCE EXCERPT FOR PRACTICE</small><p>{labourCard.text}</p></article>
        <div className="unit3-choice-grid" role="group" aria-label="Classify the labour evidence">
          {labourChoices.map((choice) => (
            <button type="button" key={choice} aria-pressed={labourChoice === choice} className={labourChoice === choice ? "selected" : ""} onClick={() => setLabourChoice(choice)}>{choice}</button>
          ))}
        </div>
        {labourChoice && <ChoiceFeedback correct={labourChoice === labourCard.answer}>{labourChoice === labourCard.answer ? labourCard.reason : `This card belongs under “${labourCard.answer}.” Explain using only the stated evidence.`}</ChoiceFeedback>}
      </ExperienceFrame>
    );
  }

  return (
    <ExperienceFrame
      sceneIndex={scene}
      audience={audience}
      theme="chain"
      eyebrow="CHAIN PATCH STUDIO"
      title="Redesign one link for fairness and resilience."
      prompt="Choose two changes that can work together. Name the benefit, the trade-off, and who must have a voice before calling the redesign better."
      teacherNote="Accept different combinations when students explain them well. Consumer choice is only one possible lever; keep company policy, law, worker organization, design, repair systems, and public purchasing visible."
      footer="A responsible redesign changes a system and names its trade-offs. It does not promise a perfect product."
    >
      <div className="unit3-patch-grid" role="group" aria-label="Choose two supply-chain patches">
        {supplyPatches.map((patch) => (
          <button type="button" key={patch.title} aria-pressed={patches.includes(patch.title)} className={patches.includes(patch.title) ? "selected" : ""} onClick={() => togglePatch(patch.title)}>
            <small>{patch.tags.join(" · ")}</small><strong>{patch.title}</strong><span>{patch.tradeoff}</span>
          </button>
        ))}
      </div>
      <div className="unit3-proof-strip" aria-live="polite">
        <strong>{patches.length}/2 patches selected</strong>
        <span>{patches.length === 2 ? `${patches[0]} + ${patches[1]}. Now name who must help design and verify them.` : "Choose two changes that strengthen different parts of the chain."}</span>
      </div>
      <section className="unit3-make-card">
        <small>TEAM EVIDENCE PRODUCT</small><h4>Supply-chain patch card</h4><p>Connection → documented concern → two changes → worker or affected voice → trade-off → evidence needed</p>
      </section>
    </ExperienceFrame>
  );
}

const cooperationRoles = [
  { title: "Community watershed group", capacity: "Local observations, community priorities, and relationships with the waterway." },
  { title: "Indigenous-led organization", capacity: "Nation-specific knowledge, rights, priorities, and leadership when invited and properly sourced." },
  { title: "Local or regional government", capacity: "Waste services, local rules, public crews, and community communication." },
  { title: "National regulator", capacity: "Product rules, cross-region coordination, enforcement, and larger funding." },
  { title: "Science and NGO network", capacity: "Independent sampling, research support, public reporting, and international connections." },
] as const;

const cooperationEvidence = [
  { title: "Water samples", holder: "Science network", contribution: "Shows where pellet levels rise and how results change after rain." },
  { title: "Shoreline observations", holder: "Community group", contribution: "Shows where plastic gathers and which places matter for daily use." },
  { title: "Facility records", holder: "Regulator", contribution: "Shows when and where material moved through storage and transport sites." },
  { title: "Rights and place evidence", holder: "Indigenous-led organization", contribution: "Shows responsibilities, rights, priorities, and knowledge that the other records cannot replace." },
] as const;

const cooperationActions = [
  { title: "Prevent spills at the source", leads: "Regulator + facilities", criterion: "PREVENT" },
  { title: "Community-led monitoring", leads: "Community + Indigenous-led groups + scientists", criterion: "LISTEN" },
  { title: "Share one public evidence board", leads: "All partners", criterion: "COORDINATE" },
  { title: "Rapid cleanup after heavy rain", leads: "Regional team + community partners", criterion: "RESPOND" },
  { title: "Review the plan after six months", leads: "All partners", criterion: "ADAPT" },
] as const;

const stressTests = [
  "Heavy rain moves more pellets into the shared bay.",
  "One funding source ends halfway through the plan.",
  "New evidence shows the largest source is farther upstream.",
  "An affected community rejects a cleanup method that could damage habitat.",
] as const;

export function CooperationControlRoomLab({ sceneIndex, audience }: Unit3ExperienceProps) {
  const scene = safeScene(sceneIndex);
  const [roleIndex, setRoleIndex] = useState(0);
  const [sharedEvidence, setSharedEvidence] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [stressIndex, setStressIndex] = useState(0);
  const [agreement, setAgreement] = useState<string[]>([]);
  const role = cooperationRoles[roleIndex];

  const toggleEvidence = (title: string) => {
    setSharedEvidence((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
  };

  const toggleAction = (title: string) => {
    setActions((current) => {
      if (current.includes(title)) return current.filter((item) => item !== title);
      if (current.length >= 3) return current;
      return [...current, title];
    });
  };

  const toggleAgreement = (part: string) => {
    setAgreement((current) => current.includes(part) ? current.filter((item) => item !== part) : [...current, part]);
  };

  if (scene === 0) {
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="cooperation"
        eyebrow="COOPERATION CONTROL ROOM"
        title="No single group holds every tool."
        prompt="A river carries plastic pellets through two fictional regions and into a shared bay. Inspect what each partner can contribute before proposing a plan."
        teacherNote="Students represent institutions and capacities—not disaster victims. Real Indigenous organizations are governments or rights-bearing organizations, not just another stakeholder. Use specific Nations and invited sources only in a real case."
        footer="Cooperation begins by recognizing different authority, knowledge, capacity, and responsibility."
      >
        <figure className="unit3-basin-visual">
          <Image unoptimized src="/images/unit3-cooperation-basin-v1.png" alt="A clearly fictional illustrated river basin showing an upstream town, farms, wetland, industry, and a downstream town connected by one river." width={1672} height={941} sizes="(max-width: 900px) 100vw, 1100px" priority={false} />
          <figcaption><strong>FICTIONAL PRACTICE LANDSCAPE</strong><span>Use it to notice connections and ask questions. It is not evidence about a real place.</span></figcaption>
        </figure>
        <article className="unit3-source-card cooperation">
          <small>FICTIONAL SHARED-WATER CHALLENGE</small>
          <h4>Plastic pellets are appearing along a river and bay used by several communities.</h4>
          <p>The source is not yet confirmed. The water crosses boundaries, and no single partner can investigate, prevent, clean, fund, and review the response alone.</p>
        </article>
        <div className="unit3-role-grid" role="group" aria-label="Inspect a cooperation partner">
          {cooperationRoles.map((item, index) => (
            <button type="button" key={item.title} aria-pressed={roleIndex === index} className={roleIndex === index ? "selected" : ""} onClick={() => setRoleIndex(index)}>
              <small>PARTNER {index + 1}</small><strong>{item.title}</strong>
            </button>
          ))}
        </div>
        <section className="unit3-role-focus" aria-live="polite"><small>CURRENT CAPACITY</small><h4>{role.title}</h4><p>{role.capacity}</p></section>
      </ExperienceFrame>
    );
  }

  if (scene === 1) {
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="cooperation"
        eyebrow="EVIDENCE EXCHANGE"
        title="Build a shared picture before choosing an action."
        prompt="Each partner holds evidence the others do not. Add records to the shared board and explain what each one contributes and cannot prove alone."
        teacherNote="Do not treat community or Indigenous knowledge as colour added after scientific data. Ask what each evidence system can establish, who controls it, and what consent or attribution is required before sharing."
        footer="Cooperation improves the evidence when partners share carefully without erasing ownership or limits."
      >
        <div className="unit3-evidence-exchange" role="group" aria-label="Add evidence to the shared board">
          {cooperationEvidence.map((item) => (
            <button type="button" key={item.title} aria-pressed={sharedEvidence.includes(item.title)} className={sharedEvidence.includes(item.title) ? "selected" : ""} onClick={() => toggleEvidence(item.title)}>
              <small>{item.holder}</small><strong>{item.title}</strong><span>{item.contribution}</span>
            </button>
          ))}
        </div>
        <div className="unit3-proof-strip" aria-live="polite">
          <strong>{sharedEvidence.length}/4 records on the shared board</strong>
          <span>{sharedEvidence.length >= 3 ? "You can now compare a pattern across different evidence. Name the record still missing." : "One record cannot explain the whole system. Add evidence that does a different job."}</span>
        </div>
      </ExperienceFrame>
    );
  }

  if (scene === 2) {
    return (
      <ExperienceFrame
        sceneIndex={scene}
        audience={audience}
        theme="cooperation"
        eyebrow="JOINT PLAN BUILDER"
        title="Choose three moves that work together."
        prompt="Build a plan that can prevent, listen, coordinate, respond, or adapt. Three moves are available, so your team must explain what remains uncovered."
        teacherNote="Do not teach that international cooperation is automatically fair or successful. Require leadership from affected communities, clear responsibility, funding, evidence sharing, review, and a way to challenge the plan."
        footer="A joint plan is stronger when roles are clear, affected people help lead, and results can change the next decision."
      >
        <div className="unit3-action-grid" role="group" aria-label="Choose three cooperation actions">
          {cooperationActions.map((action) => (
            <button type="button" key={action.title} aria-pressed={actions.includes(action.title)} className={actions.includes(action.title) ? "selected" : ""} onClick={() => toggleAction(action.title)}>
              <small>{action.criterion}</small><strong>{action.title}</strong><span>{action.leads}</span>
            </button>
          ))}
        </div>
        <section className="unit3-plan-meter">
          <header><strong>{actions.length}/3 moves chosen</strong><span>{actions.length === 3 ? "Plan ready to stress-test" : "Choose connected moves"}</span></header>
          <div>{[0, 1, 2].map((index) => <i key={index} className={actions.length > index ? "filled" : ""} />)}</div>
          <p>{actions.length === 3 ? "Name the uncovered need and the partner who should help revise it." : "A plan needs prevention, response, evidence, leadership, and review—but three moves cannot cover everything."}</p>
        </section>
      </ExperienceFrame>
    );
  }

  const agreementParts = ["Named lead and responsibilities", "Affected-community decision role", "Evidence-sharing rules", "Funding or resources", "Review date and change process"];
  return (
    <ExperienceFrame
      sceneIndex={scene}
      audience={audience}
      theme="cooperation"
      eyebrow="STRESS TEST + AGREEMENT"
      title="A plan is not finished when conditions change."
      prompt="Reveal one change. Revise the joint plan, then build an agreement that says who leads, shares evidence, listens, funds, and reviews."
      teacherNote="The final product should feed the Unit 3 systems/root-cause map or Unit 4 inquiry. Keep it formative unless it becomes the selected inquiry evidence; avoid another required SpacesEDU post."
      footer="Good cooperation includes a way to learn, disagree, repair harm, and change course."
    >
      <nav className="unit3-stress-tabs" aria-label="Choose a stress test">
        {stressTests.map((item, index) => (
          <button type="button" key={item} aria-pressed={stressIndex === index} className={stressIndex === index ? "selected" : ""} onClick={() => setStressIndex(index)}>
            <small>TEST {index + 1}</small><strong>{item}</strong>
          </button>
        ))}
      </nav>
      <section className="unit3-current-plan"><small>CURRENT THREE MOVES</small>{actions.length > 0 ? actions.map((action) => <p key={action}>{action}</p>) : <p>Return to Part 3 and choose three moves, or build three with your table.</p>}</section>
      <div className="unit3-agreement-grid" role="group" aria-label="Build the cooperation agreement">
        {agreementParts.map((part) => (
          <button type="button" key={part} aria-pressed={agreement.includes(part)} className={agreement.includes(part) ? "selected" : ""} onClick={() => toggleAgreement(part)}>
            <b>{agreement.includes(part) ? "ADDED" : "NEEDED"}</b><span>{part}</span>
          </button>
        ))}
      </div>
      <div className="unit3-proof-strip" aria-live="polite">
        <strong>{agreement.length}/5 agreement parts visible</strong>
        <span>{agreement.length >= 4 ? "Explain how the agreement changes after the stress test." : "Add enough structure that partners can act, challenge, and revise the plan."}</span>
      </div>
      <section className="unit3-make-card">
        <small>TEAM EVIDENCE PRODUCT</small><h4>Cooperation patch for the systems map</h4><p>Shared problem → different capacities → joint moves → affected leadership → stress-test revision → remaining limit</p>
      </section>
    </ExperienceFrame>
  );
}
