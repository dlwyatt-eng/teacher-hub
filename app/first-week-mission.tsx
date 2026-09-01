"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import { AddToDayPlanButton, type TtocDayPlanLesson } from "./ttoc-day-plan";
import { ClassroomCompanion, CompanionMark } from "./classroom-companions";
import "./first-week-mission.css";
import {
  DISCOVERY_BOOKLET_PDF,
  ROTATION_DURATIONS,
  WHOLE_ORGANIZER_ACCOMMODATION,
  WHOLE_ORGANIZER_DECORATION,
  WHOLE_ORGANIZER_PRIVACY,
  WHOLE_ORGANIZER_PROMISE,
  findRotationSession,
  rotationSessions,
  rotationTtocRunSteps,
  rotationTimeline,
  type RotationDuration,
  type RotationSession,
} from "./first-week-rotation-data";

/** Kept stable so saved plans and existing deep links remain valid. */
export const FIRST_WEEK_MISSION_ID = "welcome-signal-studio";
export const FIRST_WEEK_MISSION_TITLE = "Grade 6 Discovery Rotations";
export const FIRST_WEEK_AGREEMENT_TITLE = "My Grade 6 Learning, Technology & AI Agreement";
export const FIRST_WEEK_AGREEMENT_PDF = "/printables/grade-6-learning-technology-ai-agreement.pdf";

export type FirstWeekMissionAudience = "student" | "teacher";

export const FIRST_WEEK_ROTATION_LESSON = {
  sourceId: FIRST_WEEK_MISSION_ID,
  subject: "Welcome Week · Cross-curricular",
  title: FIRST_WEEK_MISSION_TITLE,
  timing: "Choose 45, 60, or 75 min",
  runSteps: [
    "Choose one standalone organizer for this group; no session depends on an earlier visit.",
    "State the privacy boundary and model a concise response, fictional alternative, blank/skip, or privacy marker in every part of the organizer—not a polished exemplar.",
    "Students first-pass every labelled section, then deepen safe choices and decorate the whole page through accessible visual meaning-making.",
    "Use a whole-page check, improve one safe response and one visual cue when useful, then make a separate display decision.",
    "Label named originals and collect them face-down in the rotation folder for private transfer.",
  ],
  notes: "Schedule is intentionally open. Select the organizer and duration after the group and block are known. Every route is paper-first, device-optional, and completes one whole, decorated organizer. Blank/skip completes a region without explanation, and accommodation may reduce substantive output without creating catch-up work. Decoration means accessible visual meaning-making; artistry is never graded. Do not display named originals or use the work for grading or placement.",
} as const satisfies TtocDayPlanLesson;

export type FirstWeekMissionProps = {
  audience?: FirstWeekMissionAudience;
  initialSessionId?: string;
  initialDuration?: RotationDuration;
};

function lessonFor(session: RotationSession, duration: RotationDuration): TtocDayPlanLesson {
  return {
    sourceId: session.id,
    subject: "Welcome Week · Cross-curricular",
    title: session.title,
    timing: `${duration} min · standalone rotation`,
    runSteps: rotationTtocRunSteps(session, duration),
    notes: [
      `Privacy: ${session.privacy.teacher}`,
      `Shortened block: ${session.shortened}`,
      `TTOC boundary: ${session.ttoc}`,
      "No devices, Wi-Fi, AI, or SpacesEDU post are required.",
    ].join(" "),
  };
}

function PrivacyBadge({ session }: { session: RotationSession }) {
  return <span className="rotation-card__privacy" data-level={session.privacy.level}>{session.privacy.label}</span>;
}

function projectorPrivacy(session: RotationSession) {
  if (session.privacy.level === "private") return "Keep the named original private. This page is not for display.";
  if (session.privacy.level === "display-candidate") return "The original stays private. A separate copy may be displayed only after you opt in again.";
  return "The original transfers privately. Only a safe copied excerpt may be considered later.";
}

function SessionChooser({ selectedId, choose }: { selectedId: string; choose: (id: string) => void }) {
  return (
    <section className="rotation-chooser" aria-labelledby="rotation-chooser-title">
      <header>
        <div><small>SESSION CHOOSER</small><h2 id="rotation-chooser-title">Choose for the group in front of you</h2></div>
        <p>Each session starts fresh. Choose by purpose, available time, and what the group has already done.</p>
      </header>
      <div className="rotation-chooser__grid">
        {rotationSessions.map((session) => (
          <button
            type="button"
            className="rotation-card"
            aria-pressed={selectedId === session.id}
            key={session.id}
            onClick={() => choose(session.id)}
          >
            <Image src={session.preview} alt={`Preview of Discovery Booklet page ${session.page}: ${session.bookletTitle}`} width={680} height={880} />
            <span className="rotation-card__copy">
              <small>PAGE {session.page} · STANDALONE</small>
              <strong>{session.title}</strong>
              <span>{session.bestFor}</span>
              <PrivacyBadge session={session} />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function DurationChooser({ duration, choose }: { duration: RotationDuration; choose: (duration: RotationDuration) => void }) {
  return (
    <fieldset className="rotation-duration">
      <legend>Available block</legend>
      {ROTATION_DURATIONS.map((option) => (
        <button type="button" key={option} aria-pressed={duration === option} onClick={() => choose(option)}>
          <strong>{option}</strong><span>minutes</span>
        </button>
      ))}
      <p><b>Unexpectedly shortened?</b> Use the quick-pass whole-page route below; visit each region with a concise response or no-explanation blank/skip. When accommodation is needed, use the reduced-output route below. Always protect privacy, labelling, and collection time.</p>
    </fieldset>
  );
}

function ProjectorSession({ session, choose }: { session: RotationSession; choose: (id: string) => void }) {
  return (
    <section className="rotation-projector" aria-labelledby="rotation-projector-title">
      <nav className="rotation-projector__picker" aria-label="Choose a rotation organizer">
        {rotationSessions.map((option) => <button type="button" key={option.id} aria-pressed={option.id === session.id} onClick={() => choose(option.id)}>{option.title}</button>)}
      </nav>
      <header>
        <div>
          <small>GRADE 6 DISCOVERY · PAGE {session.page}</small>
          <h1 id="rotation-projector-title">{session.title}</h1>
          <p>{session.question}</p>
        </div>
        <Image src={session.preview} alt={`Preview of ${session.bookletTitle}`} width={680} height={880} priority />
      </header>
      <div className="rotation-projector__intention"><small>TODAY I CAN</small><strong>{session.learningIntention.replace(/^I can /, "")}</strong></div>
      <section className="rotation-projector__whole-page" aria-label="Whole-page completion target">
        <CompanionMark role="build" size="large" motion="once" />
        <div><small>WHOLE-PAGE TARGET</small><strong>Visit all {session.pageRegions.length} labelled areas. Blank/skip counts—no explanation.</strong></div>
        <p>{WHOLE_ORGANIZER_DECORATION}</p>
      </section>
      <ol className="rotation-projector__steps">
        {session.makeSteps.map((step, index) => <li key={step}><b>{index + 1}</b><span>{step}</span></li>)}
      </ol>
      <footer>
        <section><small>FINISH WHEN</small><strong>{session.success[0]}</strong></section>
        <section><small>YOUR CHOICE</small><strong>{projectorPrivacy(session)}</strong></section>
        <span>Whole page · paper first</span>
      </footer>
    </section>
  );
}

function TeacherSession({ session, duration }: { session: RotationSession; duration: RotationDuration }) {
  const timeline = useMemo(() => rotationTimeline(session, duration), [session, duration]);
  const lesson = useMemo(() => lessonFor(session, duration), [session, duration]);

  return (
    <article className="rotation-session" aria-labelledby="rotation-session-title">
      <header className="rotation-session__header">
        <Image src={session.preview} alt={`Discovery Booklet page ${session.page}: ${session.bookletTitle}`} width={680} height={880} />
        <div>
          <small>SELECTED · PAGE {session.page} · {duration} MINUTES</small>
          <h2 id="rotation-session-title">{session.title}</h2>
          <p className="rotation-session__question">{session.question}</p>
          <div className="rotation-session__intention"><b>LEARNING INTENTION</b><span>{session.learningIntention}</span></div>
          <PrivacyBadge session={session} />
          <p className="rotation-session__privacy">{session.privacy.student}</p>
          <div className="rotation-session__actions">
            <AddToDayPlanButton lesson={lesson} label={`Add ${duration}-min route`} />
            <a href={DISCOVERY_BOOKLET_PDF} download>Download booklet PDF</a>
          </div>
        </div>
      </header>

      <section className="rotation-at-a-glance" aria-label="Preparation and materials">
        <div><small>PREPARE</small><ul>{session.prepare.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div><small>MATERIALS</small><ul>{session.materials.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div><small>PRODUCT</small><p>{session.product}</p><small>DEVICE ROUTE</small><p>No device is needed. If one shared device helps with approved speech-to-text or display, the paper thinking remains primary.</p></div>
      </section>

      <section className="rotation-launch">
        <div><small>OPENING PROVOCATION</small><strong>{session.provocation.display}</strong><p>Ask: “{session.provocation.ask}”</p></div>
        <aside><small>TEACHER MOVE</small><p>{session.provocation.move}</p></aside>
      </section>

      <section className="rotation-completion-map" aria-labelledby="rotation-completion-map-title">
        <header>
          <div><small>WHOLE-PAGE PRODUCT</small><h3 id="rotation-completion-map-title">Visit every region. Deepen safe choices. Decorate for meaning.</h3></div>
          <p>{WHOLE_ORGANIZER_PROMISE} {WHOLE_ORGANIZER_PRIVACY}</p>
        </header>
        <div className="rotation-completion-map__grid">
          <section><small>VISIT EVERY REGION</small><ul>{session.pageRegions.map((region) => <li key={region}>{region}</li>)}</ul></section>
          <section><small>MAKE THE WHOLE PAGE YOURS</small><ul>{session.decorationChoices.map((choice) => <li key={choice}>{choice}</li>)}</ul></section>
        </div>
        <p className="rotation-completion-map__note"><b>Completion is not disclosure or artistic polish.</b> A brief safe answer, fictional alternative, blank/skip, or privacy symbol completes a region, and no explanation is required. One accessible visual cue can travel across the page; colour, quantity, neatness, and artistry are never graded.</p>
      </section>

      <ClassroomCompanion
        role="build"
        density="compact"
        motion="once"
        title="Build the whole page, then improve one useful detail."
        prompt="The beaver cue means make, check, and revise. Short responses, fictional alternatives, blank/skip, and privacy symbols all complete a region without explanation."
        className="rotation-learning-companion"
      />

      <section className="rotation-timeline" aria-labelledby="rotation-timeline-title">
        <header><div><small>RUN SHEET</small><h3 id="rotation-timeline-title">{duration}-minute complete route</h3></div><p>Stop after any route; no next organizer is assumed.</p></header>
        <ol>{timeline.map((step, index) => <li key={`${step.timing}-${step.label}`}><b>{index + 1}</b><time>{step.timing} min</time><div><strong>{step.label}</strong><p>{step.action}</p></div></li>)}</ol>
      </section>

      <section className="rotation-teacher-grid">
        <div>
          <small>DISCUSS</small>
          <ul>{session.discuss.map((item) => <li key={item}>{item}</li>)}</ul>
          <small>MOVE THE THINKING</small>
          <ul>{session.teacherMoves.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="rotation-misconception">
          <small>IF YOU HEAR / SEE</small><p>{session.misconception.idea}</p>
          <small>RESPOND</small><p>{session.misconception.respond}</p>
        </div>
        <div>
          <small>LOOK FOR · FORMATIVE ONLY</small>
          <ul>{session.success.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="rotation-assessment-note">Do not grade, rank, diagnose, or use this work for class placement. Notice agency, representation, reasoning, and a usable next step.</p>
        </div>
      </section>

      <section className="rotation-supports" aria-labelledby="rotation-supports-title">
        <header><small>ACCESS + FLEX</small><h3 id="rotation-supports-title">Equivalent ways to participate</h3></header>
        <div>
          <section><small>ACCESSIBILITY + DIFFERENTIATION</small><ul>{session.accessibility.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><small>25–35 MIN WHOLE-PAGE RESCUE</small><p>{session.shortened}</p><small>ACCOMMODATION · REDUCE OUTPUT WHEN NEEDED</small><p>{WHOLE_ORGANIZER_ACCOMMODATION}</p><small>EARLY FINISHER · REFINE, DON’T START OVER</small><p>{session.earlyFinisher}</p></section>
          <section><small>75-MIN DEEPENING</small><p>{session.extension75}</p><small>OFFLINE / SHARED DEVICE</small><p>The core is the paper organizer plus conversation. Project a static prompt or read it aloud; one shared teacher device is enough, and zero devices changes no learning goal.</p></section>
        </div>
      </section>

      <section className="rotation-handoff" aria-labelledby="rotation-handoff-title">
        <header><small>PRIVATE TRANSFER</small><h3 id="rotation-handoff-title">Label once. Collect face-down. Sort once.</h3></header>
        <ol>
          <li><b>Student labels the back:</b> name, organizer title, room/date or rotation block, WHOLE PAGE COMPLETE (including blank/skip or accommodation) or PAUSED—ASK BEFORE OFFERING MORE TIME, plus one privacy choice: PRIVATE, ASK ME LATER ABOUT COPYING ONE SAFE PART, or DISPLAY-CANDIDATE when that page permits it.</li>
          <li><b>Teacher collects:</b> students place named originals face-down into an opaque folder or envelope labelled by room/date/block.</li>
          <li><b>Team transfers:</b> once classes are confirmed, staff sort by final roster and hand originals privately to the receiving teacher. Do not use them for grading or placement.</li>
          <li><b>Receiving teacher follows up:</b> acknowledge useful learner information, do not question blank/skip regions, offer more time for a PAUSED page only after asking the student, and ask again before copying any excerpt or displaying any candidate.</li>
        </ol>
        <div className="rotation-display-boundary">
          <section><small>ORIGINAL</small><strong>{session.privacy.teacher}</strong></section>
          <section><small>COMMUNITY DISPLAY</small><strong>{session.privacy.display}</strong><p>{session.displayIdea}</p></section>
        </div>
      </section>

      <details className="rotation-ttoc">
        <summary>TTOC-ready guidance and boundaries</summary>
        <div><p><b>Say:</b> “We will visit every part of this organizer and decorate across the whole page. A safe response, fictional alternative, blank/skip, or privacy symbol completes a section. You never have to explain a skip.”</p><p><b>Boundary:</b> {session.ttoc}</p><p><b>Finish:</b> Check every labelled region, one accessible visual cue, consent, the back label, and face-down collection. Artistry is not graded. Leave sensitive follow-up for the classroom teacher through the school’s normal route.</p></div>
      </details>
    </article>
  );
}

export default function FirstWeekMission({ audience = "teacher", initialSessionId = rotationSessions[0].id, initialDuration = 60 }: FirstWeekMissionProps) {
  const headingId = useId();
  const [selectedId, setSelectedId] = useState(() => findRotationSession(initialSessionId).id);
  const [duration, setDuration] = useState<RotationDuration>(initialDuration);
  const session = findRotationSession(selectedId);

  if (audience === "student") return <ProjectorSession session={session} choose={setSelectedId} />;

  return (
    <main className="rotation-studio" aria-labelledby={headingId}>
      <header className="rotation-studio__hero">
        <div>
          <small>OPENING WEEK · SCHEDULE-FLEXIBLE · PAPER-FIRST</small>
          <h1 id={headingId}>{FIRST_WEEK_MISSION_TITLE}</h1>
          <p>Five complete, standalone organizer sessions for groups that may arrive in any order, more than once, or not at all. Each route completes and decorates one whole page; choose the session and block length when the schedule becomes clear.</p>
          <div className="rotation-studio__facts"><span>Whole-page product</span><span>No sequence required</span><span>45 / 60 / 75 min</span><span>No AI or Wi-Fi required</span><span>No SpacesEDU post</span></div>
        </div>
        <aside>
          <small>BOOKLET</small>
          <strong>5 complete, decorated organizers</strong>
          <p>Digital guidance is ready. Print class sets only after groups and schedule are known.</p>
          <a href={DISCOVERY_BOOKLET_PDF} download>Download the verified booklet</a>
        </aside>
      </header>

      <section className="rotation-studio__decision" aria-label="How to choose a session">
        <small>QUICK CHOICE</small>
        <p><b>New group?</b> Choose the purpose they need. <b>Returning group?</b> Pick any organizer they have not completed. <b>Time changed?</b> Keep the same organizer and switch the duration; each route still visits, develops, and decorates the whole page.</p>
      </section>

      <SessionChooser selectedId={selectedId} choose={setSelectedId} />
      <DurationChooser duration={duration} choose={setDuration} />
      <TeacherSession session={session} duration={duration} />

      <aside className="rotation-studio__later-ai">
        <div><small>OPTIONAL LATER ADST / CAREER EXTENSION</small><strong>Technology and AI decision-making remains available—after community foundations are underway.</strong><p>Use AI Tensions Lab for evidence, bias, privacy, authorship, power, environmental costs, and human accountability. The core organizer sessions above do not depend on AI.</p></div>
        <a href="?view=AI+Tensions+Lab">Open AI Tensions Lab</a>
        <a href={FIRST_WEEK_AGREEMENT_PDF} download>Technology agreement PDF</a>
      </aside>
    </main>
  );
}
