"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AddToDayPlanButton } from "./ttoc-day-plan";

export const FIRST_WEEK_MISSION_ID = "welcome-signal-studio";
export const FIRST_WEEK_MISSION_TITLE = "Make the Call: Technology & AI in Grade 6";
export const FIRST_WEEK_AGREEMENT_TITLE = "My Grade 6 Learning, Technology & AI Agreement";
export const FIRST_WEEK_AGREEMENT_PDF = "/printables/grade-6-learning-technology-ai-agreement.pdf";

export type FirstWeekMissionAudience = "student" | "teacher";

export type FirstWeekMissionPhase = {
  start: number;
  end: number;
  shortLabel: string;
  title: string;
  invitation: string;
  studentMoves: readonly string[];
  say: string;
  facilitate: string;
  lookFor: string;
};

export const FIRST_WEEK_ROTATION_RUN_SHEET: readonly FirstWeekMissionPhase[] = [
  {
    start: 0,
    end: 5,
    shortLabel: "Launch",
    title: "How can technology and AI strengthen our learning?",
    invitation: "Grade 6 students will use conversation, paper, making, a projector, devices, search, and AI. Which jobs can a tool strengthen, and how will people keep responsibility for the thinking?",
    studentMoves: [
      "Think of one time technology helped you imagine, practise, organize, check, communicate, or create.",
      "Tell a partner what the tool helped you do—not only which app you used.",
      "Predict one choice that could make the learning weaker or less trustworthy.",
    ],
    say: "We are making decisions about learning. Today you will examine evidence, challenge an AI response, and write an agreement your Grade 6 teacher can actually use.",
    facilitate: "Project the opening scene. Give 20 silent seconds, then a 45-second partner exchange. Collect two helpful uses and two possible problems without solving them yet.",
    lookFor: "Students naming a learning purpose such as feedback, access, rehearsal, creation, checking, or collaboration—not treating the device itself as the goal.",
  },
  {
    start: 5,
    end: 13,
    shortLabel: "Detect",
    title: "Human, AI, both, or not sure? Show your evidence.",
    invitation: "Three short samples appear polished, rough, or personal. Can style alone prove who—or what—made them?",
    studentMoves: [
      "For each sample, vote: HUMAN, AI, BOTH, or NOT SURE.",
      "Point to the clue your group used and name what that clue can—and cannot—prove.",
      "Reveal the answer, then name better evidence of the process.",
    ],
    say: "Polished does not automatically mean AI. Rough does not automatically mean human. We can ask a creator to explain the process, show a draft, name the help used, and demonstrate the thinking.",
    facilitate: "Run all three mystery samples from the on-screen evidence game. Let tables commit before revealing. Do not turn handwriting, vocabulary, spelling, disability supports, or language learning into evidence of authorship.",
    lookFor: "Students replacing guesses about style with questions about process, sources, drafts, decisions, and explanation.",
  },
  {
    start: 13,
    end: 23,
    shortLabel: "Sort",
    title: "Helpful, check it, or stop and ask?",
    invitation: "Each situation requires a decision. Your table must choose a lane and defend it before the screen reveals the reasoning.",
    studentMoves: [
      "Read one exact classroom situation.",
      "Choose HELPS LEARNING, CHECK IT, or STOP + ASK.",
      "Defend the choice using privacy, accuracy, ownership, or learning—not a vague feeling.",
    ],
    say: "The same tool can be useful in one situation and a poor choice in another. The purpose, information shared, source quality, and amount of student thinking all matter.",
    facilitate: "Use three corners, table cards, fingers, or a voice vote. Run at least four situations, including one privacy case and one case where AI sounds confident without a source.",
    lookFor: "Specific reasons: protects private information, keeps the learner responsible, checks an important claim, credits help, or uses an attributed source.",
  },
  {
    start: 23,
    end: 32,
    shortLabel: "Prompt",
    title: "Turn a shortcut prompt into a learning prompt.",
    invitation: "The weak prompt asks AI to do the project. Your table will repair it so the AI asks questions, waits, and strengthens thinking the students have already begun.",
    studentMoves: [
      "Underline what the students must decide for themselves.",
      "Add useful context without names, photos, schedules, passwords, or private details.",
      "Tell the AI how to help, when to pause, and what not to produce.",
    ],
    say: "A strong prompt does not merely get a longer answer. It gives the learner a better role. Our pair should make the claim, choose the evidence, and explain the final decision.",
    facilitate: "Show the three prompt versions. Tables choose the strongest and justify one exact phrase. If a teacher-approved AI session is ready, test the strong prompt once; otherwise use the prepared reply shown in the next move.",
    lookFor: "Prompts that protect privacy, keep students making decisions, request questions or feedback rather than a finished product, and set a useful stopping point.",
  },
  {
    start: 32,
    end: 42,
    shortLabel: "Repair",
    title: "Challenge a confident AI answer.",
    invitation: "This response contains one useful sentence and three claims that should not be trusted. Find what to keep, check, change, and credit.",
    studentMoves: [
      "Read one numbered sentence at a time.",
      "Mark it KEEP, CHECK, or CHANGE and explain why.",
      "Rewrite one unsafe or inaccurate idea in your table's own words.",
    ],
    say: "Clear grammar is not proof. AI can combine useful language with invented facts, missing context, or advice that gives away the learner's job. People remain responsible for the final choice.",
    facilitate: "Reveal the four-sentence response. Ask a different table to lead each sentence. Keep a board list: useful idea, evidence needed, missing voice or context, and student decision.",
    lookFor: "Students checking confident claims, separating usefulness from truth, retaining responsibility for the final response, and explaining what they changed.",
  },
  {
    start: 42,
    end: 50,
    shortLabel: "Draft",
    title: "Write one class commitment that can survive a real situation.",
    invitation: "Each table proposes one clear commitment, then stress-tests it against privacy, accuracy, ownership, and fairness.",
    studentMoves: [
      "Complete: When ___, we will ___ because ___.",
      "Test the commitment against one scenario from today.",
      "Revise words such as always or never if they make the commitment unhelpful or impossible.",
    ],
    say: "A useful agreement tells people what to do in a real moment. ‘Use AI responsibly’ is too vague. Name the moment, the action, and the reason.",
    facilitate: "Give each table one large paper. Hear every proposal. Star commitments that are clear enough to observe, then combine overlapping ideas into a short class list.",
    lookFor: "Concrete, explainable actions rather than slogans; attention to source checking, privacy, honest attribution, equitable access, and human responsibility.",
  },
  {
    start: 50,
    end: 58,
    shortLabel: "Agree",
    title: "Write your own learning and technology agreement.",
    invitation: "Your class commitments belong to the group. This page adds your own voice, one useful support, and the choices you promise to make.",
    studentMoves: [
      "Choose two class commitments and explain one in your own words.",
      "Write one personal commitment and one moment when you will stop and ask.",
      "Name one support that helps you learn and one question for your Grade 6 teacher.",
    ],
    say: "This is a classroom learning agreement, not a legal contract. Do not include passwords, account names, medical details, diagnoses, or private family information. Your teacher needs useful learning information and your real commitments.",
    facilitate: "Hand out the one-page agreement. Students may write, dictate to an adult, or use labelled drawings and short phrases. Confer with anyone whose commitment is still too broad to use.",
    lookFor: "Individual voice, a specific learning support, an observable commitment, and understanding of when to verify, credit, protect privacy, or ask an adult.",
  },
  {
    start: 58,
    end: 60,
    shortLabel: "Sign",
    title: "Sign it and send it to your Grade 6 teacher.",
    invitation: "Check that the agreement sounds like you, sign the student line, and leave one useful question for the teacher who will receive it.",
    studentMoves: [
      "Check your name and remove any private account information.",
      "Sign the student line only when the commitments make sense to you.",
      "Place the page in the labelled collection tray for your rotation group.",
    ],
    say: "Your teacher will read this as the beginning of a conversation. The agreement can be revisited when the class learns more or when a new tool creates a new situation.",
    facilitate: "Collect pages face-up and check names. Clip each rotation set with its date. When classes are formed, sort once by final roster and pass the agreements to receiving teachers for acknowledgement and follow-up—not grading.",
    lookFor: "Every student leaves one named page and understands that agreements can be discussed, clarified, and improved during the year.",
  },
] as const;

export const FIRST_WEEK_EMERGENCY_ROUTE = [
  { timing: "0–4 min", move: "Launch", action: "Name one learning job for technology and one choice that could weaken trust." },
  { timing: "4–10 min", move: "Detect", action: "Run one HUMAN / AI / BOTH / NOT SURE sample; require one clue and its limit." },
  { timing: "10–20 min", move: "Sort", action: "Run four cases, including private details and an unsourced confident local claim." },
  { timing: "20–28 min", move: "Repair", action: "Audit two AI sentences; keep, check, or change each and repair one claim." },
  { timing: "28–33 min", move: "Draft", action: "Write and stress-test one observable class commitment." },
  { timing: "33–42 min", move: "Agree + sign", action: "Each student completes, checks, signs, and submits the personal agreement." },
] as const;

export const FIRST_WEEK_ROTATION_LESSON = {
  sourceId: FIRST_WEEK_MISSION_ID,
  subject: "Welcome Week · ADST · Career Education",
  title: FIRST_WEEK_MISSION_TITLE,
  timing: "60 min",
  runSteps: FIRST_WEEK_ROTATION_RUN_SHEET.map(
    (phase) => `${phase.start}–${phase.end} min · ${phase.shortLabel}: ${phase.facilitate}`,
  ),
  notes: `Print one ${FIRST_WEEK_AGREEMENT_TITLE} per student. Use one teacher-controlled projector and table groups of 3–4. If the block is cut to 40–45 minutes, use the visible 42-minute emergency route and protect the individual agreement.`,
} as const;

const mysterySamples = [
  {
    label: "Sample A · polished",
    text: "The coastal temperate rainforest is a complex ecosystem that supports many interconnected species.",
    reveal: "NOT SURE. A person, AI, or a person using AI could write this. Ask for the source, process, and an explanation in the creator's own words.",
  },
  {
    label: "Sample B · specific",
    text: "Our group lowered the ramp after test two because the ball rolled 34 cm past the target.",
    reveal: "NOT SURE from the sentence alone. The exact result is useful evidence, but the group should be able to show its test record and explain the change.",
  },
  {
    label: "Sample C · rough",
    text: "maybe shade first → ask students where heat is worst → need temp proof",
    reveal: "NOT SURE. Rough notes can come from a person, speech-to-text, translation support, or AI. Style is not proof of authorship or understanding.",
  },
] as const;

const technologyScenarios = [
  {
    title: "Question brainstorm",
    situation: "After listing three ideas of their own, a pair asks AI for five more inquiry questions. They choose one, explain why it matters, and rewrite it.",
    decision: "HELPS LEARNING",
    reason: "The pair begins the thinking, compares possibilities, and remains responsible for the final question.",
  },
  {
    title: "Confident local fact",
    situation: "AI gives a precise Fleetwood population number but provides no source or date. The group wants to put it on a poster.",
    decision: "CHECK IT",
    reason: "A precise number can still be wrong or out of date. Trace it to a current, named source before using it.",
  },
  {
    title: "Private details",
    situation: "A chatbot asks for a student's full name, school schedule, account name, and photo so it can personalize a study plan.",
    decision: "STOP + ASK",
    reason: "Do not enter identifying or account information. Close the prompt and ask the teacher which approved route protects privacy.",
  },
  {
    title: "Finished response",
    situation: "A student asks AI to write the complete final reflection, pastes it into the assignment, and cannot explain one of its claims.",
    decision: "STOP + ASK",
    reason: "The tool replaced the learner's evidence and reflection. The student should return to their own experience and disclose any permitted help.",
  },
  {
    title: "Another fair test",
    situation: "A table asks AI to suggest one more variable to control. They decide whether it fits, run the test themselves, and record their own results.",
    decision: "HELPS LEARNING",
    reason: "AI offers a possibility; students judge it, gather the evidence, and explain the result together.",
  },
  {
    title: "Invented voice",
    situation: "AI offers to speak as a named Indigenous Elder instead of the class using an attributed Nation or First Nations-led source.",
    decision: "STOP + ASK",
    reason: "A simulation cannot replace a living person's or Nation's voice. Use an authentic, attributed source selected with the teacher.",
  },
] as const;

const promptOptions = [
  {
    label: "A · Give away the work",
    text: "Write our Grade 6 technology agreement. Make it sound like students wrote it.",
    explanation: "The AI makes the important decisions and hides the actual process.",
  },
  {
    label: "B · Strengthen our thinking",
    text: "Our pair thinks privacy and checking facts matter. Ask us one question at a time to test whether our proposed rule works in three classroom situations. Do not write the rule for us.",
    explanation: "This protects the students' decision-making, gives relevant context, and tells the AI to pause instead of producing the final work.",
  },
  {
    label: "C · Too little direction",
    text: "Make this better.",
    explanation: "The purpose, learner role, context, and kind of help are missing.",
  },
] as const;

const responseAudit = [
  { text: "1. AI is always correct when it sounds confident.", verdict: "CHANGE", why: "Confidence and polished language are not evidence. Important claims need a reliable source." },
  { text: "2. Students should copy useful answers to save time.", verdict: "CHANGE", why: "Copying can replace the learner's reasoning. Use ideas as possibilities, then decide, create, and explain." },
  { text: "3. Every AI conversation is private.", verdict: "CHECK", why: "Privacy depends on the approved tool and settings. Do not assume; follow school guidance and protect identifying information." },
  { text: "4. A useful class rule is to check important claims and explain how AI helped.", verdict: "KEEP", why: "This keeps accuracy and honest process visible, though the class should still make the rule more specific." },
] as const;

const agreementChecks = [
  "I protect names, passwords, photos, schedules, and private details.",
  "I keep the important thinking and final decisions visible as mine.",
  "I check important claims in a current, named source.",
  "I say when AI or another tool helped and what it did.",
  "I stop and ask when a tool requests private information or when I am unsure.",
] as const;

export type FirstWeekMissionProps = {
  audience?: FirstWeekMissionAudience;
  initialPhase?: number;
};

function minuteLabel(phase: FirstWeekMissionPhase) {
  return `${phase.start}–${phase.end} min`;
}

export function FirstWeekAgreementPrintable() {
  return (
    <article className="first-week-letter" aria-labelledby="first-week-letter-title">
      <header className="first-week-letter__header">
        <div>
          <small>STUDENT-TO-TEACHER HANDOFF · SEPTEMBER</small>
          <h2 id="first-week-letter-title">{FIRST_WEEK_AGREEMENT_TITLE}</h2>
          <p>This is a classroom learning agreement, not a legal contract. We can revisit it as our class learns.</p>
        </div>
        <div className="first-week-letter__identity">
          <p>Name I use <span aria-hidden="true" /></p>
          <p>Rotation room / date <span aria-hidden="true" /></p>
          <p>Receiving teacher <span aria-hidden="true" /></p>
        </div>
      </header>

      <section className="first-week-letter__purpose">
        <b>1 · TECHNOLOGY HELPS MY LEARNING WHEN…</b>
        <p>Write or draw one real purpose: imagine, practise, organize, check, communicate, create, access support, or collaborate.</p>
        <span className="writing-lines writing-lines--two" aria-hidden="true" />
      </section>

      <section className="first-week-letter__commitments">
        <b>2 · COMMITMENTS WE TESTED TODAY</b>
        <p>Circle two you will use. Put a star beside the one you most want your teacher to notice.</p>
        <ul>{agreementChecks.map((item) => <li key={item}>○ {item}</li>)}</ul>
      </section>

      <div className="first-week-letter__opening">
        <section>
          <b>3 · IN MY OWN WORDS</b>
          <p>One commitment I will make is…</p>
          <span className="writing-lines writing-lines--three" aria-hidden="true" />
        </section>
        <section>
          <b>4 · I WILL STOP + ASK WHEN…</b>
          <p>Name one situation that needs a teacher or trusted adult.</p>
          <span className="writing-lines writing-lines--three" aria-hidden="true" />
        </section>
      </div>

      <section className="first-week-letter__show-thinking">
        <b>5 · I CAN MAKE MY THINKING VISIBLE BY…</b>
        <p>For example: keep a first attempt, explain my choices, show my source, compare versions, or describe exactly how a tool helped.</p>
        <span className="writing-lines writing-lines--two" aria-hidden="true" />
      </section>

      <div className="first-week-letter__reasoning">
        <section>
          <b>6 · A SUPPORT THAT HELPS ME LEARN</b>
          <p>Keep it useful for school. Private details are not required.</p>
          <span className="writing-lines writing-lines--two" aria-hidden="true" />
        </section>
        <section>
          <b>7 · A QUESTION FOR MY GRADE 6 TEACHER</b>
          <p>What do you want to understand about our tools, routines, or expectations?</p>
          <span className="writing-lines writing-lines--two" aria-hidden="true" />
        </section>
      </div>

      <footer className="first-week-letter__footer">
        <p><b>Student signature</b><span aria-hidden="true" /></p>
        <p><b>Teacher acknowledgement after classes are formed</b><span aria-hidden="true" /></p>
        <small>Signing means we understand the commitments and will keep discussing them. It is not permission to create accounts or use unapproved tools.</small>
      </footer>
    </article>
  );
}

/** Backward-compatible export while the old field-letter language is retired from the interface. */
export const FirstWeekLetterPrintable = FirstWeekAgreementPrintable;

export default function FirstWeekMission({ audience = "teacher", initialPhase = 0 }: FirstWeekMissionProps) {
  const safeInitialPhase = Math.max(0, Math.min(FIRST_WEEK_ROTATION_RUN_SHEET.length - 1, initialPhase));
  const [phaseIndex, setPhaseIndex] = useState(safeInitialPhase);
  const [mysteryIndex, setMysteryIndex] = useState(0);
  const [mysteryRevealed, setMysteryRevealed] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioChoice, setScenarioChoice] = useState<string | null>(null);
  const [promptChoice, setPromptChoice] = useState<number | null>(null);
  const [auditChoice, setAuditChoice] = useState<number | null>(null);
  const titleId = useId();
  const phase = FIRST_WEEK_ROTATION_RUN_SHEET[phaseIndex] ?? FIRST_WEEK_ROTATION_RUN_SHEET[0];
  const mystery = mysterySamples[mysteryIndex];
  const scenario = technologyScenarios[scenarioIndex];

  if (!phase || !mystery || !scenario) return null;

  const printAgreement = () => {
    const cleanup = () => document.body.classList.remove("first-week-letter-printing");
    document.body.classList.add("first-week-letter-printing");
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
    window.setTimeout(cleanup, 2_000);
  };

  const choosePhase = (index: number) => {
    setPhaseIndex(index);
    setMysteryRevealed(false);
  };

  return (
    <section className={`first-week-mission first-week-mission--${audience}`} aria-labelledby={titleId}>
      <div className="first-week-mission__screen">
        <header className="first-week-mission__hero">
          <div className="first-week-mission__beacon" aria-hidden="true"><i /><i /><i /><b>?</b></div>
          <div>
            <small>{audience === "teacher" ? "ONE-HOUR GRADE 6 ROTATION · SHARED-SCREEN DECISION LAB" : "SHARED-SCREEN TEAM CHALLENGE"}</small>
            <h2 id={titleId}>{FIRST_WEEK_MISSION_TITLE}</h2>
            <p>{audience === "teacher" ? "Play four fast decision games, challenge a confident AI response, and write an agreement the classroom can use." : "Vote, explain your evidence, reconsider, and help write our class agreement."}</p>
          </div>
          {audience === "teacher" ? <div className="first-week-mission__tools">
            <span>QUICK REFERENCE</span>
            <b>60 min · one projector · tables of 3–4</b>
            <small>Print one student agreement. Prepare three vote cards per table: HELPS, CHECK, STOP + ASK.</small>
            <div className="first-week-mission__emergency-route">
              <b>40–45 MIN IF TIME IS CUT</b>
              <ol>{FIRST_WEEK_EMERGENCY_ROUTE.map((item) => <li key={item.timing}><strong>{item.timing} · {item.move}</strong><small>{item.action}</small></li>)}</ol>
              <small>Skip Prompt. Protect the individual agreement and signing.</small>
            </div>
            <a className="first-week-download" href={FIRST_WEEK_AGREEMENT_PDF} download>Download student agreement (PDF)</a>
            <div className="first-week-mission__plan-actions"><AddToDayPlanButton lesson={FIRST_WEEK_ROTATION_LESSON} /><a href="?view=Weekly+Plan">Open the four-day rotation plan →</a></div>
          </div> : <div className="first-week-mission__tools first-week-mission__tools--student">
            <span>TEAM SETUP</span>
            <b>Talk at tables of 3–4</b>
            <small>Vote together. Give a reason. Be ready to change your mind.</small>
          </div>}
        </header>

        <nav className="first-week-mission__route" aria-label="Technology and AI mission phases">
          {FIRST_WEEK_ROTATION_RUN_SHEET.map((item, index) => (
            <button type="button" key={item.shortLabel} aria-current={index === phaseIndex ? "step" : undefined} data-past={index < phaseIndex || undefined} onClick={() => choosePhase(index)}>
              <span>{index < phaseIndex ? "✓" : index + 1}</span><b>{item.shortLabel}</b><small>{item.start}–{item.end}</small>
            </button>
          ))}
        </nav>

        <div className="first-week-mission__stage" aria-live="polite">
          <section>
            <div className="first-week-mission__phase-heading"><span>{minuteLabel(phase)}</span><small>MOVE {phaseIndex + 1} OF {FIRST_WEEK_ROTATION_RUN_SHEET.length}</small></div>
            <h3>{phase.title}</h3>
            <p className="first-week-mission__invitation">{phase.invitation}</p>

            {phaseIndex === 0 && <figure className="first-week-mission__practice-scene">
              <div><Image unoptimized src="/images/visual-review/technology-choices-mural-v1.webp" alt="Illustrated classroom mural showing students learning through discussion, books, paper, making, movement, a shared projector, and carefully chosen technology" width={1792} height={1008} priority sizes="(max-width: 900px) 100vw, 1100px" /><span>GENERATED CLASSROOM ILLUSTRATION · MANY WAYS TO LEARN · ONE SHARED SCREEN</span></div>
              <figcaption><strong>Look closely: what is each learner doing?</strong><p>Point to reading, talking, making, moving, checking, creating, and using a shared screen. Name the learning action before naming the tool.</p></figcaption>
            </figure>}

            {phaseIndex === 1 && <section className="first-week-game first-week-mystery-game" aria-label="AI or human evidence game">
              <header><small>{mystery.label}</small><strong>Who—or what—made this?</strong></header>
              <blockquote>{mystery.text}</blockquote>
              <div className="first-week-vote-row" role="group" aria-label="Choose who made the sample"><button type="button" onClick={() => setMysteryRevealed(true)}>HUMAN 👤</button><button type="button" onClick={() => setMysteryRevealed(true)}>AI 🤖</button><button type="button" onClick={() => setMysteryRevealed(true)}>BOTH 🤝</button><button type="button" onClick={() => setMysteryRevealed(true)}>NOT SURE ❓</button></div>
              {mysteryRevealed && <p className="first-week-reveal"><b>REVEAL:</b> {mystery.reveal}</p>}
              <footer><button type="button" disabled={mysteryIndex === 0} onClick={() => { setMysteryIndex((current) => Math.max(0, current - 1)); setMysteryRevealed(false); }}>← Previous sample</button><span>{mysteryIndex + 1} / {mysterySamples.length}</span><button type="button" disabled={mysteryIndex === mysterySamples.length - 1} onClick={() => { setMysteryIndex((current) => Math.min(mysterySamples.length - 1, current + 1)); setMysteryRevealed(false); }}>Next sample →</button></footer>
            </section>}

            {phaseIndex === 2 && <section className="first-week-game first-week-scenario-game" aria-label="Technology choice scenario sort">
              <figure className="first-week-game__visual"><Image unoptimized src="/images/visual-review/technology-scenario-table-v1.webp" alt="Illustrated table with school learning scenarios and three decision cards labelled Helps Learning, Check It, and Stop and Ask" width={1792} height={1008} sizes="(max-width: 900px) 100vw, 1100px" /><figcaption>GENERATED SCENARIO TABLE · VOTE, EXPLAIN, THEN RECONSIDER</figcaption></figure>
              <header><small>SCENARIO {scenarioIndex + 1} OF {technologyScenarios.length}</small><strong>{scenario.title}</strong></header>
              <p>{scenario.situation}</p>
              <div className="first-week-vote-row" role="group" aria-label="Choose the best decision">{["HELPS LEARNING", "CHECK IT", "STOP + ASK"].map((choice) => <button type="button" key={choice} aria-pressed={scenarioChoice === choice} onClick={() => setScenarioChoice(choice)}>{choice}</button>)}</div>
              {scenarioChoice && <p className={`first-week-reveal ${scenarioChoice === scenario.decision ? "correct" : "rethink"}`}><b>{scenarioChoice === scenario.decision ? "THAT FITS." : `RECONSIDER: ${scenario.decision}.`}</b> {scenario.reason}</p>}
              <footer><button type="button" disabled={scenarioIndex === 0} onClick={() => { setScenarioIndex((current) => Math.max(0, current - 1)); setScenarioChoice(null); }}>← Previous situation</button><span>{scenarioIndex + 1} / {technologyScenarios.length}</span><button type="button" disabled={scenarioIndex === technologyScenarios.length - 1} onClick={() => { setScenarioIndex((current) => Math.min(technologyScenarios.length - 1, current + 1)); setScenarioChoice(null); }}>Next situation →</button></footer>
            </section>}

            {phaseIndex === 3 && <section className="first-week-game first-week-prompt-game" aria-label="Prompt makeover challenge">
              <header><small>WEAK START</small><strong>“Do our project about responsible technology use.”</strong></header>
              <p>Which revision gives the students the strongest learning role?</p>
              <div>{promptOptions.map((option, index) => <button type="button" key={option.label} aria-pressed={promptChoice === index} onClick={() => setPromptChoice(index)}><b>{option.label}</b><span>{option.text}</span></button>)}</div>
              {promptChoice !== null && <p className={`first-week-reveal ${promptChoice === 1 ? "correct" : "rethink"}`}><b>{promptChoice === 1 ? "STRONGEST CHOICE." : "TRY AGAIN."}</b> {promptOptions[promptChoice]?.explanation}</p>}
            </section>}

            {phaseIndex === 4 && <section className="first-week-game first-week-audit-game" aria-label="AI response repair challenge">
              <figure className="first-week-game__visual"><Image unoptimized src="/images/visual-review/technology-check-the-answer-v1.webp" alt="Illustrated students comparing an AI answer with a book, a source card, notes, and one another's questions" width={1792} height={1008} sizes="(max-width: 900px) 100vw, 1100px" /><figcaption>GENERATED CHECKING SCENE · THE FIRST ANSWER IS NOT THE FINISH</figcaption></figure>
              <header><small>PREPARED AI RESPONSE · FOUR SENTENCES</small><strong>Useful, trustworthy, and still ours?</strong></header>
              <ol>{responseAudit.map((item, index) => <li key={item.text}><button type="button" aria-pressed={auditChoice === index} onClick={() => setAuditChoice(index)}>{item.text}</button>{auditChoice === index && <p><b>{item.verdict}:</b> {item.why}</p>}</li>)}</ol>
              <aside><b>TABLE CHALLENGE</b><span>Choose one sentence to rewrite. Your version must protect the learner&apos;s role and say what evidence or adult guidance is needed.</span></aside>
            </section>}

            {phaseIndex === 5 && <section className="first-week-game first-week-rule-builder">
              <header><small>ONE RULE PER TABLE</small><strong>Write something people can actually do.</strong></header>
              <blockquote>When <i>this situation happens</i>, we will <i>take this action</i> because <i>this learning or safety reason matters</i>.</blockquote>
              <div><span>Does it protect private information?</span><span>Does it keep people responsible for the thinking?</span><span>Does it require checking when accuracy matters?</span><span>Can a student explain how the tool helped?</span></div>
            </section>}

            {phaseIndex >= 6 && <section className="first-week-agreement-callout"><div><small>ONE PAGE · INDIVIDUAL STUDENT VOICE</small><strong>{FIRST_WEEK_AGREEMENT_TITLE}</strong><p>Choose, explain, personalize, sign, and send it to the teacher who receives your class.</p></div><a href={FIRST_WEEK_AGREEMENT_PDF} download>Download the agreement PDF</a><button type="button" onClick={printAgreement}>Print from this page</button></section>}

            <ol className="first-week-mission__moves">{phase.studentMoves.map((move, index) => <li key={move}><b>{index + 1}</b><span>{move}</span></li>)}</ol>

            <div className="first-week-mission__controls"><button type="button" disabled={phaseIndex === 0} onClick={() => choosePhase(Math.max(0, phaseIndex - 1))}>← Previous move</button><a className="first-week-mission__print" href={FIRST_WEEK_AGREEMENT_PDF} download>Download agreement</a><button type="button" disabled={phaseIndex === FIRST_WEEK_ROTATION_RUN_SHEET.length - 1} onClick={() => choosePhase(Math.min(FIRST_WEEK_ROTATION_RUN_SHEET.length - 1, phaseIndex + 1))}>Next move →</button></div>
          </section>

          {audience === "teacher" && <aside className="first-week-mission__facilitator">
            <header><small>PLAN VIEW · {minuteLabel(phase)}</small><strong>{phase.title}</strong></header>
            <section><b>SAY</b><p>{phase.say}</p></section><section><b>DO</b><p>{phase.facilitate}</p></section><section><b>NOTICE</b><p>{phase.lookFor}</p></section>
            <section className="first-week-mission__boundary"><b>NON-NEGOTIABLES</b><p>No student account creation during the rotation. Do not enter student names, photos, schedules, passwords, or private stories. AI cannot stand in for an Indigenous person, Nation, or attributed source. Describe choices and evidence—not fixed “tech ability.”</p></section>
          </aside>}
        </div>

        {audience === "teacher" && <details className="first-week-mission__handoff">
          <summary><span><small>AFTER THE ROTATION</small><strong>Four steps: collect, label, transfer, revisit</strong></span><b>Open handoff steps</b></summary>
          <ol><li><b>Collect:</b> one named, signed agreement per student. <a href={FIRST_WEEK_AGREEMENT_PDF} download>Download a clean copy.</a></li><li><b>Label:</b> clip each rotation together with date and room; do not grade or use for class placement.</li><li><b>Transfer:</b> after rosters are final, pass pages privately to receiving Grade 6 teachers.</li><li><b>Revisit:</b> teachers acknowledge the page, discuss class commitments, and revise the agreement when new situations arise.</li></ol>
        </details>}
      </div>

      <FirstWeekAgreementPrintable />
    </section>
  );
}
