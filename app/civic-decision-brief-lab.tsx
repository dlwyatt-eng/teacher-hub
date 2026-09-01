"use client";

import { useEffect, useId, useState } from "react";
import {
  communityVoices,
  improvements as civicImprovements,
  plans as civicPlans,
  recommendationEvidence,
  reviewPlans as civicReviewPlans,
  type ImprovementId,
  type PlanId,
  type ReviewId,
} from "./social-unit2-experiences";
import "./civic-decision-brief-lab.css";

export type CivicDecisionBriefLabProps = {
  scene: number;
  audience: "teacher" | "student";
};

type SourceJob = "authority" | "pattern" | "perspective" | "constraint";
type SourceId = "parks" | "log" | "listening" | "access";
type SafeguardId = ImprovementId;

const sourceJobs: { id: SourceJob; label: string; question: string }[] = [
  { id: "authority", label: "Authority", question: "Who can make this exact decision?" },
  { id: "pattern", label: "Pattern", question: "What has happened repeatedly, and when?" },
  { id: "perspective", label: "Perspective", question: "What do affected people directly report?" },
  { id: "constraint", label: "Constraint", question: "What must a workable plan protect or allow?" },
];

const sources: {
  id: SourceId;
  label: string;
  title: string;
  excerpt: string;
  limit: string;
  job: SourceJob;
  contribution: string;
}[] = [
  {
    id: "parks",
    label: "SOURCE A · CITY PARKS BRIEF",
    title: "The decision in front of council",
    excerpt: "Council asked Parks staff for a six-week response. The city controls court hours, park signs, and the court-light timer. Council has not voted.",
    limit: "It tells us who can act, but not which option is fairest.",
    job: "authority",
    contribution: "This source identifies the decision-maker and the exact powers available for this pilot.",
  },
  {
    id: "log",
    label: "SOURCE B · OPERATIONS LOG",
    title: "Reports and observed use",
    excerpt: `${recommendationEvidence[0].label} ${recommendationEvidence[2].label}`,
    limit: "Reports and four observation nights show a pattern, not the cause of every sound or what happens every night.",
    job: "pattern",
    contribution: "This source shows a time pattern and the scale of evening use, while leaving important questions open.",
  },
  {
    id: "listening",
    label: "SOURCE C · LISTENING NOTES",
    title: "Experiences from the park",
    excerpt: `${communityVoices[0].name}: “${communityVoices[0].quote}” ${communityVoices[1].name}: “${communityVoices[1].quote}”`,
    limit: "Two documented voices do not represent every court user or resident.",
    job: "perspective",
    contribution: "This source adds direct experiences from people affected in different ways.",
  },
  {
    id: "access",
    label: "SOURCE D · ACCESS AND FACILITIES NOTE",
    title: "What a workable plan must preserve",
    excerpt: `${recommendationEvidence[3].label} Court lights and walking-path lights have separate controls, so the walking route can remain lit during a temporary court-hours pilot.`,
    limit: "The note explains feasibility and access, not how people rank the options.",
    job: "constraint",
    contribution: "This source shows that the plan can change court lighting without darkening the walking route.",
  },
];

const plans = civicPlans.map((plan) => ({ ...plan, sentence: plan.recommendation }));
const safeguards = civicImprovements;
const reviewPlans = civicReviewPlans;

const panelQuestions = [
  "Which public body has authority for this exact action?",
  "Which source most strongly supports your recommendation—and what can it not prove?",
  "Who could be helped or harmed by your plan?",
  "What safeguard keeps this power from being misused?",
  "What evidence would make you change your recommendation?",
] as const;

const revisionMoves = [
  { label: "Authority", prompt: "Name who acts and remove any action that body cannot take." },
  { label: "Evidence", prompt: "Link one specific source detail to the claim it supports." },
  { label: "Affected voices", prompt: "Represent a documented experience without inventing what a group thinks." },
  { label: "Safeguard", prompt: "Add a protection that reduces harm or limits misuse of power." },
  { label: "Review + uncertainty", prompt: "State what remains unknown and when the decision must be checked." },
] as const;

const teacherMoves = [
  {
    time: "12–18 min",
    say: "This is a fictional practice file. We are deciding who can act before deciding what we prefer.",
    watch: "Students may name a broad topic instead of the exact decision. Ask: Who controls the court-light timer and park hours?",
  },
  {
    time: "25–35 min",
    say: "A trustworthy-looking source is not automatically useful. Name the job each source does and its limit.",
    watch: "Do not let four sources become four votes. Evidence contributes different kinds of information.",
  },
  {
    time: "25–35 min",
    say: "A responsible option includes a safeguard and a real check-back. It is not a forever answer.",
    watch: "Require one consequence for a group other than the team’s preferred group.",
  },
  {
    time: "20–30 min",
    say: "The panel audits the reasoning; it does not reward the opinion or the most confident speaker.",
    watch: "Offer a reader, pointer, timekeeper, or non-speaking evidence role. Ask only one panel question per team.",
  },
  {
    time: "15–25 min",
    say: "Revision is evidence of learning. Protect the individual reflection even when the team artifact is shared.",
    watch: "Approve the final post. Do not upload private choices, role cards, raw AI chat, or unapproved peer recordings.",
  },
] as const;

function clampScene(scene: number) {
  if (!Number.isFinite(scene)) return 0;
  return Math.max(0, Math.min(4, Math.trunc(scene)));
}

export function CivicDecisionBriefLab({ scene, audience }: CivicDecisionBriefLabProps) {
  const activeScene = clampScene(scene);
  const headingId = useId();
  const [jurisdiction, setJurisdiction] = useState<"federal" | "provincial" | "city" | "school" | "">("");
  const [sourceAssignments, setSourceAssignments] = useState<Partial<Record<SourceId, SourceJob>>>({});
  const [planId, setPlanId] = useState<PlanId | "">("");
  const [safeguardId, setSafeguardId] = useState<SafeguardId | "">("");
  const [reviewId, setReviewId] = useState<ReviewId | "">("");
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [revisionMove, setRevisionMove] = useState(0);
  const [revisionChecks, setRevisionChecks] = useState<string[]>([]);
  const [reflectionFormat, setReflectionFormat] = useState<"audio" | "writing" | "conference">("writing");

  const selectedPlan = plans.find((item) => item.id === planId);
  const selectedSafeguard = safeguards.find((item) => item.id === safeguardId);
  const selectedReview = reviewPlans.find((item) => item.id === reviewId);
  const assignedCorrectly = sources.filter((item) => sourceAssignments[item.id] === item.job).length;
  const recommendationReady = Boolean(selectedPlan && selectedSafeguard && selectedReview);

  useEffect(() => {
    if (!timerRunning || activeScene !== 3 || secondsLeft <= 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [activeScene, secondsLeft, timerRunning]);

  useEffect(() => {
    if (secondsLeft === 0) setTimerRunning(false);
  }, [secondsLeft]);

  useEffect(() => {
    if (activeScene !== 3) setTimerRunning(false);
  }, [activeScene]);

  const toggleTimer = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(90);
      setTimerRunning(true);
      return;
    }
    setTimerRunning((current) => !current);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(90);
  };

  const printCurrentPart = () => {
    document.body.classList.add("print-civic-decision-brief");
    const cleanUp = () => document.body.classList.remove("print-civic-decision-brief");
    window.addEventListener("afterprint", cleanUp, { once: true });
    window.print();
  };

  const toggleRevisionCheck = (label: string) => {
    setRevisionChecks((current) => current.includes(label) ? current.filter((item) => item !== label) : [...current, label]);
  };

  const clock = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;
  const sceneTitles = ["Name the decision", "Build the evidence wall", "Pressure-test the options", "Hold the civic hearing", "Revise and reflect"] as const;

  return (
    <section className="cdb-lab" data-audience={audience} data-scene={activeScene + 1} aria-labelledby={headingId}>
      <header className="cdb-header">
        <div>
          <small>CIVIC EVIDENCE ROOM · PART {activeScene + 1} OF 5</small>
          <h2 id={headingId}>{sceneTitles[activeScene]}</h2>
          <p>Use evidence to make power answerable—not to make one opinion look certain.</p>
        </div>
        <aside>
          <b>FICTIONAL PRACTICE CASE</b>
          <span>Juniper City and every source below are invented for learning. Do not treat them as news or a real city decision.</span>
        </aside>
      </header>

      {audience === "teacher" && (
        <aside className="cdb-teacher-cue" aria-label={`Teacher cue for part ${activeScene + 1}`}>
          <header><b>TEACHER MOVE</b><span>{teacherMoves[activeScene].time}</span></header>
          <div><p><b>SAY</b>{teacherMoves[activeScene].say}</p><p><b>WATCH FOR</b>{teacherMoves[activeScene].watch}</p></div>
        </aside>
      )}

      {activeScene === 0 && (
        <div className="cdb-scene-body cdb-case-intro">
          <article className="cdb-city-file">
            <header><small>JUNIPER CITY FILE 06-27 · NOT REAL</small><strong>Night court: what should the city try first?</strong></header>
            <div>
              <p>Juniper Park’s basketball court is free, paved, and lit until <b>10:30 p.m.</b> After <b>18 noise reports in six weeks</b>, staff suggest turning court lights off at 8:30 p.m. and storing the rims for the rest of fall.</p>
              <p>The walking path uses separate lights. <b>Council has not voted.</b> It wants a response that uses evidence, considers affected people, and can be reviewed.</p>
            </div>
          </article>

          <section className="cdb-decision-frame" aria-labelledby={`${headingId}-question`}>
            <small>THE EXACT PUBLIC QUESTION</small>
            <h4 id={`${headingId}-question`}>What six-week response should Juniper City try at the park, what must it protect, and when should council check the result?</h4>
            <div><b>DECISION</b><span>court-light hours, court access, park signs, and a temporary review plan</span></div>
            <div><b>NOT THE DECISION</b><span>whether young people or nearby residents are “the problem”</span></div>
          </section>

          <fieldset className="cdb-jurisdiction-check">
            <legend>Who can make this exact pilot decision?</legend>
            <p>Choose first. Then use the case details—not a guess—to defend the match.</p>
            <div>
              {([
                ["federal", "Federal government"],
                ["provincial", "Province of BC"],
                ["city", "Juniper City council"],
                ["school", "Local school board"],
              ] as const).map(([id, label]) => <button type="button" key={id} aria-pressed={jurisdiction === id} data-selected={jurisdiction === id ? "true" : "false"} onClick={() => setJurisdiction(id)}>{label}</button>)}
            </div>
            {jurisdiction && <aside className={jurisdiction === "city" ? "is-ready" : "needs-rethink"} role="status"><b>{jurisdiction === "city" ? "YES · CITY AUTHORITY" : "RECHECK THE EXACT ACTION"}</b><span>{jurisdiction === "city" ? "The file says Juniper City controls its park hours, signs, and court-light timer. Other governments may shape wider laws, but this temporary park pilot belongs to the city." : "Look for the body that controls this park’s hours, signs, and court-light timer."}</span></aside>}
          </fieldset>

          <section className="cdb-evidence-start">
            <article><small>WE HAVE</small><strong>A proposal, a report count, several direct experiences, and a technical note</strong></article>
            <article><small>WE STILL NEED</small><strong>Verified causes, more affected voices, results from any pilot, and a reason to change course</strong></article>
            <article><small>OUR RULE</small><strong>Say what a source adds, what it cannot prove, and who is still missing</strong></article>
          </section>
        </div>
      )}

      {activeScene === 1 && (
        <div className="cdb-scene-body">
          <section className="cdb-routine-banner"><b>READ → NAME THE JOB → MARK THE LIMIT → CONNECT THE CLUE</b><span>For paper stations, write A, P, V, or C beside each source. One operator can make the class choices on screen.</span></section>
          <div className="cdb-source-grid">
            {sources.map((source) => {
              const assigned = sourceAssignments[source.id];
              const correct = assigned === source.job;
              return <article className="cdb-source-card" key={source.id} data-state={!assigned ? "open" : correct ? "ready" : "rethink"}>
                <header><small>{source.label}</small><h4>{source.title}</h4></header>
                <blockquote>“{source.excerpt}”</blockquote>
                <p><b>LIMIT:</b> {source.limit}</p>
                <fieldset>
                  <legend>What is this source’s main job?</legend>
                  <div>{sourceJobs.map((job) => <button type="button" key={job.id} aria-pressed={assigned === job.id} onClick={() => setSourceAssignments((current) => ({ ...current, [source.id]: job.id }))}>{job.label}</button>)}</div>
                </fieldset>
                {assigned && <aside role="status"><b>{correct ? "✓ JOB MATCHED" : "TRY A DIFFERENT JOB"}</b><span>{correct ? source.contribution : `Ask: ${sourceJobs.find((job) => job.id === source.job)?.question}`}</span></aside>}
              </article>;
            })}
          </div>

          <aside className="cdb-wall-status" data-ready={assignedCorrectly === sources.length ? "true" : "false"} aria-live="polite">
            <strong>{assignedCorrectly === sources.length ? "The evidence file has four different jobs." : `${assignedCorrectly} of ${sources.length} source jobs matched`}</strong>
            <span>{assignedCorrectly === sources.length ? "Now connect the clues. Several sources can support one decision without saying the same thing." : "A source can be trustworthy and still be the wrong source for a particular claim."}</span>
          </aside>

          {audience === "teacher" && <aside className="cdb-teacher-key"><b>TEACHER SORT KEY · REVEAL AFTER TEAMS COMMIT</b><span>A—Authority · B—Pattern · C—Perspective · D—Constraint. Ask for the source’s limit before confirming the job.</span></aside>}

          <section className="cdb-case-wall" aria-label="Civic case wall">
            <header><small>CASE WALL · BUILD ON PAPER OR SCREEN</small><h4>What can the file support?</h4></header>
            <div>
              <article><b>AUTHORITY</b><p>Juniper City can change park hours, court-light timing, signs, and the terms of a temporary pilot.</p></article>
              <article><b>INFLUENCE</b><p>Staff proposals, noise reports, delegations, and organized community voices can shape council’s choice.</p></article>
              <article><b>AFFECTED PEOPLE</b><p>Court users, nearby residents, path users, park staff, and people who depend on free or accessible space.</p></article>
              <article><b>RIGHTS + ACCESS QUESTION</b><p>Would the response protect safety and fair access while using no more restriction than the evidence supports?</p></article>
              <article><b>MISSING VOICE</b><p>People with access needs and other park users are named, but the file does not include their direct words. Do not invent them.</p></article>
              <article><b>HONEST LIMIT</b><p>The file shows reports and experiences, but it does not prove what caused every sound or which plan will work.</p></article>
            </div>
          </section>
        </div>
      )}

      {activeScene === 2 && (
        <div className="cdb-scene-body">
          <section className="cdb-routine-banner"><b>CHOOSE A START → NAME A TRADE-OFF → ADD A SAFEGUARD → SCHEDULE REVIEW</b><span>No plan becomes responsible only because it is popular. Every option must stay open to evidence and revision.</span></section>

          <fieldset className="cdb-choice-set cdb-plan-set">
            <legend>1. Which response should the city test first?</legend>
            <p>All three can be questioned. Choose the plan your team can defend honestly.</p>
            <div>{plans.map((plan, index) => <button type="button" key={plan.id} aria-pressed={planId === plan.id} data-selected={planId === plan.id ? "true" : "false"} onClick={() => setPlanId(plan.id)}><small>OPTION {String.fromCharCode(65 + index)}</small><strong>{plan.title}</strong><span>{plan.action}</span><dl><div><dt>COULD HELP</dt><dd>{plan.helps}</dd></div><div><dt>WATCH FOR</dt><dd>{plan.watch}</dd></div></dl></button>)}</div>
          </fieldset>

          <fieldset className="cdb-choice-set cdb-small-choice-set">
            <legend>2. Which safeguard must travel with the plan?</legend>
            <p>A safeguard protects people or limits how power is used.</p>
            <div>{safeguards.map((item) => <button type="button" key={item.id} aria-pressed={safeguardId === item.id} data-selected={safeguardId === item.id ? "true" : "false"} onClick={() => setSafeguardId(item.id)}><strong>{item.label}</strong><span>{item.detail}</span></button>)}</div>
          </fieldset>

          <fieldset className="cdb-choice-set cdb-small-choice-set">
            <legend>3. How will council check and change the decision?</legend>
            <p>“We will see if it works” is not a review plan. Name when, what evidence, and who is heard.</p>
            <div>{reviewPlans.map((item) => <button type="button" key={item.id} aria-pressed={reviewId === item.id} data-selected={reviewId === item.id ? "true" : "false"} onClick={() => setReviewId(item.id)}><strong>{item.label}</strong><span>{item.detail}</span></button>)}</div>
          </fieldset>

          <article className="cdb-built-brief" data-ready={recommendationReady ? "true" : "false"} aria-live="polite">
            <header><small>TEAM BRIEF · {recommendationReady ? "READY TO CHALLENGE" : "BUILDING"}</small><h4>{recommendationReady ? "A recommendation that can be audited" : "Choose one option, safeguard, and review plan"}</h4></header>
            {selectedPlan && selectedSafeguard && selectedReview ? <blockquote>We recommend that Juniper City <b>{selectedPlan.sentence}</b>. The file gives us reasons to try this, but it cannot predict the result. The city should <b>{selectedSafeguard.sentence}</b> and <b>{selectedReview.sentence}</b>. We will change our recommendation if the review shows greater harm, reduced access, or no improvement.</blockquote> : <p>Use paper if your team has no device. Record the same three choices and one source detail that supports the connection.</p>}
          </article>
        </div>
      )}

      {activeScene === 3 && (
        <div className="cdb-scene-body cdb-hearing-scene">
          <section className="cdb-hearing-order" aria-label="Ninety second hearing order">
            <header><small>HEARING ORDER · ANY APPROVED FORMAT</small><h4>Five moves. Ninety seconds.</h4></header>
            <ol><li><b>1</b><span>Name the exact decision.</span></li><li><b>2</b><span>Name who can act.</span></li><li><b>3</b><span>Connect one source detail to your reason.</span></li><li><b>4</b><span>Give the option, trade-off, and safeguard.</span></li><li><b>5</b><span>State the honest limit and review plan.</span></li></ol>
          </section>

          <section className={`cdb-hearing-timer ${secondsLeft === 0 ? "is-finished" : ""}`} aria-label="Ninety second hearing timer">
            <small>{secondsLeft === 0 ? "TIME · FINISH THE SENTENCE, THEN STOP" : timerRunning ? "HEARING IN PROGRESS" : "READY FOR THE TEAM"}</small>
            <strong role="timer" aria-label={`${secondsLeft} seconds remaining`}>{clock}</strong>
            <div className="cdb-timer-controls">
              <button type="button" onClick={toggleTimer}>{secondsLeft === 0 ? "Start another hearing" : timerRunning ? "Pause" : secondsLeft < 90 ? "Continue" : "Start 90 seconds"}</button>
              <button type="button" onClick={resetTimer}>Reset</button>
            </div>
            <p>Speaker, co-speaker, reader, pointer, or non-speaking evidence role are all valid contributions.</p>
          </section>

          <fieldset className="cdb-panel-questions">
            <legend>Panel: choose one real question</legend>
            <p>The panel challenges the reasoning, not the people. Give the team quiet think time before it responds.</p>
            <div>{panelQuestions.map((question, index) => <button type="button" key={question} aria-pressed={activeQuestion === index} data-selected={activeQuestion === index ? "true" : "false"} onClick={() => setActiveQuestion(index)}><b>{index + 1}</b><span>{question}</span></button>)}</div>
          </fieldset>

          <article className="cdb-active-question" aria-live="polite"><small>PANEL QUESTION</small><strong>{panelQuestions[activeQuestion]}</strong><span>Team response: answer with one source detail, one limit, or one revision—not a longer speech.</span></article>

          <aside className="cdb-hearing-rule"><b>ASSESS THE CASE, NOT THE PERFORMANCE</b><span>Listen for authority, evidence, affected perspectives, a safeguard, review, and honest uncertainty. Do not grade agreement, speaking speed, accent, confidence, or production polish.</span></aside>
        </div>
      )}

      {activeScene === 4 && (
        <div className="cdb-scene-body">
          <section className="cdb-carry-forward">
            <header><small>BRING THE PANEL QUESTION FORWARD</small><h4>Revision is the final civic move.</h4></header>
            <div><b>QUESTION WE FACED</b><span>{panelQuestions[activeQuestion]}</span></div>
            {selectedPlan && selectedSafeguard && selectedReview ? <blockquote>Current brief: Juniper City should <b>{selectedPlan.sentence}</b>, <b>{selectedSafeguard.sentence}</b>, and <b>{selectedReview.sentence}</b>.</blockquote> : <p>Your paper brief is enough. You do not need to rebuild it on this screen.</p>}
          </section>

          <fieldset className="cdb-revision-moves">
            <legend>1. Choose the revision the evidence requires</legend>
            <p>A strong team changes one meaningful feature—not just a font or a word.</p>
            <div>{revisionMoves.map((move, index) => <button type="button" key={move.label} aria-pressed={revisionMove === index} data-selected={revisionMove === index ? "true" : "false"} onClick={() => setRevisionMove(index)}><strong>{move.label}</strong><span>{move.prompt}</span></button>)}</div>
          </fieldset>
          <article className="cdb-revision-sentence"><small>REVISION STEM</small><strong>“Because the panel asked about {revisionMoves[revisionMove].label.toLowerCase()}, we changed ___ to ___. This makes the brief stronger because ___.”</strong></article>

          <fieldset className="cdb-revision-checklist">
            <legend>2. Audit the final team artifact</legend>
            <div>{["Authority is exact", "A source detail supports the claim", "Affected people are represented carefully", "A safeguard limits harm", "Review and uncertainty are visible"].map((label) => <button type="button" key={label} aria-pressed={revisionChecks.includes(label)} data-checked={revisionChecks.includes(label) ? "true" : "false"} onClick={() => toggleRevisionCheck(label)}><b aria-hidden="true">{revisionChecks.includes(label) ? "✓" : "○"}</b><span>{label}</span></button>)}</div>
            <aside data-ready={revisionChecks.length === 5 ? "true" : "false"}><b>{revisionChecks.length === 5 ? "READY FOR TEACHER APPROVAL" : `${revisionChecks.length} OF 5 CHECKS COMPLETE`}</b><span>One team artifact is enough. Each student still gives their own reflection.</span></aside>
          </fieldset>

          <section className="cdb-spaces-plan" aria-labelledby={`${headingId}-spaces`}>
            <header><small>SPACESEDU · ONE REQUIRED DESTINATION</small><h4 id={`${headingId}-spaces`}>Civic / Community Needs Brief</h4><p>Post only after teacher approval. The team shares its artifact once; each student adds individual evidence of thinking in the same entry.</p></header>
            <fieldset>
              <legend>Choose an approved reflection route</legend>
              <div>{([
                ["writing", "Write 3–5 sentences"],
                ["audio", "Record 30–60 seconds"],
                ["conference", "Use a teacher-approved conference or communication aid"],
              ] as const).map(([id, label]) => <button type="button" key={id} aria-pressed={reflectionFormat === id} data-selected={reflectionFormat === id ? "true" : "false"} onClick={() => setReflectionFormat(id)}>{label}</button>)}</div>
            </fieldset>
            <div className="cdb-reflection-prompts">
              <article><b>CHANGED OR COMPLICATED</b><p>Which evidence changed or complicated your thinking?</p></article>
              <article><b>MY CONTRIBUTION</b><p>What did you add, question, connect, or revise?</p></article>
              <article><b>UNCERTAINTY + NEXT STEP</b><p>What remains uncertain, and what is one responsible way people could participate?</p></article>
            </div>
            <aside><b>KEEP PRIVATE · DO NOT POST</b><span>Private ballots or first choices · role cards · confidential or identifying information · raw AI chat or unchecked AI wording · an unapproved recording of classmates</span></aside>
          </section>
        </div>
      )}

      <footer className="cdb-delivery-strip">
        <div><b>PROJECTOR</b><span>Talk, point, or hold up paper letters. One person operates the screen.</span></div>
        <div><b>SHARED DEVICE</b><span>One device per team is enough. Keep the case wall and final brief on paper.</span></div>
        <div><b>OFFLINE</b><span>Print this part, read the fictional sources aloud, and use a visible clock or teacher time call.</span></div>
        <button type="button" className="cdb-print-button" onClick={printCurrentPart}>Print this part</button>
      </footer>
    </section>
  );
}

export default CivicDecisionBriefLab;
