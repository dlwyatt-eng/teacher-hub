"use client";

import { useState } from "react";
import CurrentConnectionPlayer from "./current-connection";
import { currentConnectionForNewsroomDate } from "./current-connections";
import { issueInvestigations } from "./issue-investigations";
import { newsroomProgram } from "./newsroom-program";
import { printClosest } from "./print-support";
import { socialInquiryProject } from "./social-program";
import { PowerCheckCard, SameEventSourceLab } from "./power-inquiry";
import "./student-agency-hub.css";
import "./current-connection.css";

type AgencyAudience = "student" | "teacher";

function NewsroomSourcePage() {
  return (
    <article className="newsroom-thinking-mat print-agency-artifact" aria-label="Blank Source Lab source check page">
      <header><small>SOURCE LAB & NEWSROOM · SOURCE CHECK PAGE</small><h2>What does this source show—and what would we need to check?</h2><p>Source title: ____________________ · Creator/archive: ____________________ · Source date: __________</p></header>
      {newsroomProgram.shared.routine.map((move, index) => <section key={move.id}><b>{index + 1} · {move.label}</b><p>{move.prompt}</p><i /></section>)}
      <footer><b>CHOOSE AN ENDING</b><span>□ Discuss and stop &nbsp; □ Save an inquiry seed &nbsp; □ Teacher-selected follow-up</span></footer>
    </article>
  );
}

function IssueInvestigationShelf({ audience }: { audience: AgencyAudience }) {
  const sourceSets = issueInvestigations.length;
  return (
    <section className="issue-investigation-shelf" aria-labelledby="issue-investigation-title">
      <header>
        <div><small>CANADIAN + WORLD ISSUES · {sourceSets} SOURCE SETS</small><h2 id="issue-investigation-title">Questions worth returning to this year</h2></div>
        <p>Open one issue when it strengthens the unit. Start with its real source, let teams build a careful first idea, and continue only when the question earns more time.</p>
      </header>
      <div className="issue-investigation-shelf__grid">
        {issueInvestigations.map((issue, index) => <details key={issue.id} open={index === 0}>
          <summary><span>{issue.scope}</span><strong>{issue.title}</strong><p>{issue.question}</p><b>{issue.suggestedTiming}</b></summary>
          <div className="issue-investigation-shelf__body">
            <section className="issue-investigation-shelf__start"><small>WHY THIS ONE</small><p>{issue.whyItMatters}</p><strong>Team product</strong><span>{issue.teamProduct}</span><strong>Roles</strong><span>{issue.groupRoles}</span></section>
            <nav aria-label={`${issue.title} sources`}>{issue.sources.filter((source) => audience === "teacher" || source.access === "student-ready").map((source) => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><small>{source.kind.replaceAll("-", " ")} · {source.access.replaceAll("-", " ")}</small><strong>{source.title}</strong><span>{source.organization} ↗</span><p>{source.lookFor}</p></a>)}</nav>
            <section className="issue-investigation-shelf__route"><div><small>QUICK LOOK</small><ol>{issue.quickLook.map((move) => <li key={move}>{move}</li>)}</ol></div><div><small>DEEP DIVE</small><ol>{issue.deepDive.map((move) => <li key={move}>{move}</li>)}</ol></div></section>
            {audience === "teacher" && <aside><div><small>PLAN / TTOC</small><strong>{issue.teacherNote}</strong></div><div><small>IF LINKS FAIL</small><p>{issue.offlineFallback}</p></div><div><small>SPACES EDU</small><p>{issue.spacesUse === "none" ? "Discussion and class work only; no separate post." : "Use only if this becomes selected evidence inside an existing Social Studies inquiry."}</p></div></aside>}
          </div>
        </details>)}
      </div>
    </section>
  );
}

export function NewsroomHub({ audience, onHome, onInquiry, onAiStudio }: { audience: AgencyAudience; onHome: () => void; onInquiry: () => void; onAiStudio?: () => void }) {
  const feature = currentConnectionForNewsroomDate();
  const [sourceRoute, setSourceRoute] = useState<"quick" | "deep">("quick");
  return (
    <div className="page agency-page newsroom-hub">
      <button className="back-link" type="button" onClick={onHome}>← Classroom home</button>
      <header className="agency-hero agency-hero--newsroom">
        <div><p>{newsroomProgram.shared.eyebrow}</p><h1>{newsroomProgram.shared.title}</h1><h2>{newsroomProgram.shared.bigQuestion}</h2><span>{audience === "student" ? newsroomProgram.student.summary : newsroomProgram.shared.summary}</span></div>
        <aside><small>CHOOSE THE DEPTH</small><strong>{newsroomProgram.shared.cadence}</strong><b>ONE VISIBLE SOURCE COMES BEFORE THE QUESTIONS</b></aside>
      </header>

      <section className="source-lab-start" aria-labelledby="source-lab-start-title">
        <header><div><small>1 · CHOOSE</small><h2 id="source-lab-start-title">Quick Look or Deep Dive?</h2></div></header>
        <div>{newsroomProgram.shared.routes.map((route) => {
          const routeId = route.id === "quick-look" ? "quick" : "deep";
          return <button type="button" key={route.id} aria-pressed={sourceRoute === routeId} onClick={() => setSourceRoute(routeId)}><span>{route.minutes}</span><small>{route.label}</small><strong className="source-lab-start__path">{route.path}</strong><p>{route.use}</p><b>{sourceRoute === routeId ? "Selected" : `Choose ${route.label.toLowerCase()}`}</b></button>;
        })}</div>
      </section>

      <section className="newsroom-feature-intro"><div><small>2 · OPEN THE SOURCE · {feature.publicWindow?.topic ?? "CURRENT CONNECTION"}</small><h2>{feature.title}</h2><p>{feature.publicWindow?.studentFirstMove ?? newsroomProgram.student.firstMove}</p></div><span>CHECKED {feature.checkedOn}<b>REVIEW BY {feature.reviewBy}</b></span></section>
      <CurrentConnectionPlayer key={sourceRoute} connection={feature} audience={audience} route={sourceRoute} />

      <details className="newsroom-secondary newsroom-media-framing" open={sourceRoute === "deep" ? true : undefined}>
        <summary>Deep Dive practice: one event, eight different media frames</summary>
        <SameEventSourceLab />
        <PowerCheckCard title="Power Check the information" />
      </details>

      <IssueInvestigationShelf audience={audience} />

      <details className="newsroom-secondary">
        <summary>Use the same source-check routine with another text, image, map, graph, or clip</summary>
      <section className="newsroom-routine" aria-labelledby="newsroom-routine-title">
        <header><div><small>REUSE WITH ANY SOURCE</small><h2 id="newsroom-routine-title">One sequence for images, maps, graphs, texts, and clips.</h2></div><p>Use all six moves for a Deep Dive. For a Quick Look, use Look, Notice, Claim, and Next.</p></header>
        <ol>{newsroomProgram.shared.routine.map((move, index) => <li key={move.id}><b>{index + 1}</b><div><small>{move.label}</small><strong>{move.title}</strong><p>{move.prompt}</p></div></li>)}</ol>
      </section>
      </details>

      <details className="newsroom-secondary">
        <summary>Play a visual clue game: GeoGuessr, TimeGuessr, or the local no-account challenge</summary>
      <section className="clue-game-lab" aria-labelledby="clue-game-title">
        <header><div><small>PROJECTOR CLUE GAMES</small><h3 id="clue-game-title">Where is it? When is it? What clues support the guess?</h3><p>Use one teacher-controlled screen. Teams record three clues, a confidence range, and one alternative before the teacher enters the guess.</p></div><span>PAIRS / TEAMS · ONE CLASS GUESS</span></header>
        <div>{newsroomProgram.teacher.clueGames.map((game) => <article key={game.id}><div><small>{game.minutes}</small><h4>{game.projectorTitle}</h4><p>{game.teamTask}</p></div><ul>{game.clues.map((clue) => <li key={clue}>{clue}</li>)}</ul><p><strong>Team roles:</strong> {game.roles}</p></article>)}</div>
        <aside><div><small>LOCAL NO-ACCOUNT CHALLENGE</small><h4>{newsroomProgram.teacher.localClueFallback.projectorTitle}</h4><p>{newsroomProgram.teacher.localClueFallback.teamTask}</p><ul>{newsroomProgram.teacher.localClueFallback.clues.map((clue) => <li key={clue}>{clue}</li>)}</ul><p><strong>Team roles:</strong> {newsroomProgram.teacher.localClueFallback.roles}</p></div></aside>
      </section>
      </details>

      <details className="newsroom-secondary">
        <summary>Choose what happens after today&apos;s source</summary>
      <section className="agency-route-cards">
        <header><small>WHEN THE SIX MOVES END</small><h2>Not every story becomes a project.</h2><p>Choose the route that matches the value of the question—not the amount of time already spent.</p></header>
        <div>{newsroomProgram.shared.endings.map((ending) => <article key={ending.id}><small>{ending.label}</small><h3>{ending.title}</h3><p>{ending.detail}</p></article>)}</div>
        <button type="button" onClick={onInquiry}>Open My Inquiry <span>→</span></button>
      </section>
      </details>

      {audience === "teacher" && <details className="newsroom-secondary newsroom-teacher-tools"><summary>Teacher tools: quick reference, printable, sources, and clue-game preflight</summary><section className="agency-teacher-reference">
        <header><div><small>TEACHER / TTOC · QUICK REFERENCE</small><h2>Quick Look: 8–12 minutes. Deep Dive: 25–45.</h2></div><button type="button" onClick={(event) => printClosest(event.currentTarget, ".newsroom-hub")}>Print blank source check page</button></header>
        <div className="agency-teacher-reference__grid">
          <article><b>PREP</b><p>Preview one exact source. Record its creator, date, archive or publisher, context, and the one claim students might test.</p></article>
          <article><b>QUICK LOOK</b><p>Cover the caption → 20 quiet seconds → two visible clues → one possible claim → one uncertainty → choose an ending.</p></article>
          <article><b>DEEP DIVE</b><p>Add pair or triad comparison, open the source record, compare another source or perspective, and revise the claim.</p></article>
          <article><b>STOP</b><p>End when students can name what the source supports, what remains uncertain, and whether the question deserves more time.</p></article>
        </div>
        <div className="newsroom-source-doors"><div><small>FIND ANOTHER TEACHER-PREVIEWED SOURCE</small><h3>The sequence stays stable; the source can change.</h3><p>Choose one image, map, graph, text, quotation, or clip. Project only what students need and keep the creator, date, and source record attached.</p></div><nav>{newsroomProgram.teacher.sourceDoors.map((door) => <a key={door.label} href={door.url} target="_blank" rel="noreferrer"><strong>{door.label} ↗</strong><span>{door.use}</span></a>)}</nav></div>

        <section className="clue-game-teacher-reference" aria-labelledby="clue-game-teacher-title">
          <header><div><small>TEACHER-ONLY · VISUAL CLUE GAME PREFLIGHT</small><h3 id="clue-game-teacher-title">Preview the exact round before students see the screen.</h3></div><ul>{newsroomProgram.teacher.clueGamePreflight.map((item) => <li key={item}>{item}</li>)}</ul></header>
          <div>{newsroomProgram.teacher.clueGames.map((game) => <article key={game.id}><small>{game.minutes}</small><h4>{game.title}</h4><p>{game.setup}</p><blockquote>{game.reveal}</blockquote><a href={game.url} target="_blank" rel="noreferrer">Preview teacher route ↗</a></article>)}</div>
          <aside><div><small>LOCAL FALLBACK · KEEP CAPTION COVERED</small><h4>{newsroomProgram.teacher.localClueFallback.title}</h4><p>{newsroomProgram.teacher.localClueFallback.setup}</p><p><strong>Credit for reveal:</strong> {newsroomProgram.teacher.localClueFallback.credit}</p><blockquote>{newsroomProgram.teacher.localClueFallback.reveal}</blockquote></div><a href={newsroomProgram.teacher.localClueFallback.url} target="_blank" rel="noreferrer">Preview Surrey Archives source ↗</a></aside>
        </section>

        {onAiStudio && <aside className="agency-ai-handoff"><div><small>OPTIONAL SCHOOLAI HANDOFF</small><strong>Use only after teams have their own claim and evidence.</strong><p>The AI Activity Studio includes collaborative prompt packs for putting a claim under pressure or working through a demanding source. No student link is shown until it has been created and tested.</p></div><button type="button" onClick={onAiStudio}>Open AI Activity Studio →</button></aside>}
      </section></details>}
      <NewsroomSourcePage />
    </div>
  );
}

function InquiryPassport() {
  return (
    <article className="inquiry-passport print-agency-artifact" aria-label="My Inquiry team passport">
      <header><small>MY INQUIRY · TEAM EVIDENCE PASSPORT</small><h2>A question worth following</h2><p>Team: ____________________ · Checkpoint: ____________________ · Date: __________</p></header>
      <section><b>OUR QUESTION RIGHT NOW</b><p>It cannot be answered in one step because…</p><i /><i /></section>
      <section><b>WHAT THE EVIDENCE SUPPORTS</b><p>Source + exact detail + what it helps us understand</p><i /><i /></section>
      <section><b>PERSPECTIVES & RESPONSIBILITY</b><p>Who is affected? Whose knowledge is needed? What must we not assume?</p><i /><i /></section>
      <section><b>WHAT CHANGED</b><p>We revised our question, claim, source plan, role, or design because…</p><i /><i /></section>
      <section><b>NEXT MOVE</b><p>Actor / action / evidence or source needed / date we will check again</p><i /><i /></section>
      <footer>Each source must be named. Uncertainty is part of the evidence, not a failure.</footer>
    </article>
  );
}

export function MyInquiryHub({ audience, onHome, onNewsroom, onAiStudio }: { audience: AgencyAudience; onHome: () => void; onNewsroom: () => void; onAiStudio?: () => void }) {
  const pathLabels = ["SPARK", "SHAPE", "PLAN", "INVESTIGATE", "CREATE / TEACH", "REFLECT"];
  return (
    <div className="page agency-page inquiry-hub">
      <button className="back-link" type="button" onClick={onHome}>← Classroom home</button>
      <header className="agency-hero agency-hero--inquiry">
        <div><p>MY INQUIRY · SOCIAL STUDIES SOLUTIONARY PATHWAY</p><h1>A question worth following</h1><h2>{socialInquiryProject.question}</h2><span>“My” does not mean alone. Teams of {socialInquiryProject.teamSize.replace(" students", "")} carry strong questions across the year; every student keeps their own evidence of thinking and contribution.</span></div>
        <aside><small>THE PROMISE</small><strong>{socialInquiryProject.promise}</strong><b>QUESTIONS CAN BEGIN IN NEWSROOM, SCIENCE, PLACE, OR LIVED CLASSROOM EXPERIENCE</b></aside>
      </header>

      <section className="inquiry-path" aria-labelledby="inquiry-path-title">
        <header><div><small>YOUR CARRY-FORWARD PATH</small><h2 id="inquiry-path-title">Find where your team is now.</h2></div><p>Keep one paper or class-held evidence passport. Bring it back, revise it, and leave room for what changes.</p></header>
        <ol>{socialInquiryProject.checkpoints.map((checkpoint, index) => <li key={checkpoint.when}><b>{index + 1}</b><div><small>{pathLabels[index]} · {checkpoint.when}</small><h3>{checkpoint.action}</h3><p><strong>Bring forward:</strong> {checkpoint.evidence}</p></div></li>)}</ol>
      </section>

      <section className="inquiry-topic-families">
        <header><small>PLACES TO BEGIN · NOT ASSIGNED CATEGORIES</small><h2>What kind of issue keeps pulling at your attention?</h2><p>Start broad, then shape one question that is researchable, significant to someone, and open to evidence that could change your mind.</p></header>
        <div>{socialInquiryProject.topicFamilies.map((topic) => <article key={topic.title}><h3>{topic.title}</h3><p>{topic.examples}</p></article>)}</div>
      </section>

      <section className="inquiry-quality">
        <div><small>A STRONG QUESTION</small><h2>It does more than ask for facts.</h2><ul>{socialInquiryProject.requirements.slice(0, 6).map((requirement) => <li key={requirement}>{requirement}</li>)}</ul></div>
        <div><small>WAYS TO TEACH WHAT YOU LEARN</small><h2>Your audience should have something to think about or do.</h2><ul>{socialInquiryProject.productChoices.map((choice) => <li key={choice}>{choice}</li>)}</ul></div>
      </section>

      <section className="inquiry-return-loop"><div><small>BEGIN WITH A SEED</small><h2>Bring a Source Lab question into My Inquiry.</h2><p>Write the source, the question, why it matters, and the next kind of evidence you need. Your teacher will help decide whether it joins the team inquiry, stays in the notebook, or ends as a valuable conversation.</p></div><button type="button" onClick={onNewsroom}>Open Source Lab & Newsroom →</button></section>

      {audience === "teacher" && <section className="agency-teacher-reference agency-teacher-reference--inquiry">
        <header><div><small>TEACHER / TTOC · QUICK REFERENCE</small><h2>One inquiry spine, not another project stream.</h2></div><button type="button" onClick={(event) => printClosest(event.currentTarget, ".inquiry-hub")}>Print Inquiry Passport</button></header>
        <div className="agency-teacher-reference__grid">
          <article><b>START</b><p>Invite seeds from Source Lab sources, maps, local observation, media claims, Science phenomena, or a missing perspective. Save two before choosing.</p></article>
          <article><b>TEAM</b><p>Use groups of 3–4 with rotating roles. Require a shared product and individual evidence of thinking and contribution.</p></article>
          <article><b>CONFER</b><p>Ask: Is the question genuinely open? What evidence could change it? Who is affected? Which voice must be sourced rather than imagined?</p></article>
          <article><b>EVIDENCE</b><p>Working notes stay in the passport and classroom. The final shared artifact plus individual reflection uses the existing February SpacesEDU route.</p></article>
        </div>
        {onAiStudio && <aside className="agency-ai-handoff"><div><small>OPTIONAL SCHOOLAI QUESTION CLINIC</small><strong>Teams bring a seed and evidence before the coach opens.</strong><p>The prompt pack helps narrow a question and name the next kind of source. It does not research, invent perspectives, or choose a solution for students.</p></div><button type="button" onClick={onAiStudio}>Open AI Activity Studio →</button></aside>}
      </section>}
      <InquiryPassport />
    </div>
  );
}
