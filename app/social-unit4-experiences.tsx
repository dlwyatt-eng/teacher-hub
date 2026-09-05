"use client";

import { useState, type ReactNode } from "react";

export type Unit4ExperienceProps = {
  sceneIndex: number;
  audience: "student" | "teacher";
};

type FrameProps = Unit4ExperienceProps & {
  eyebrow: string;
  title: string;
  prompt: string;
  children: ReactNode;
  teacherNote?: string;
  footer?: string;
  tone: "thread" | "response" | "make" | "exchange";
};

function clampScene(sceneIndex: number) {
  return Math.max(0, Math.min(3, sceneIndex));
}

function ExperienceFrame({ audience, eyebrow, title, prompt, children, teacherNote, footer, tone }: FrameProps) {
  return (
    <section className={`u4-experience u4-${tone}`}>
      <header className="u4-experience-heading">
        <div>
          <small>{eyebrow}</small>
          <h3>{title}</h3>
          <p>{prompt}</p>
        </div>
        <span className="u4-experience-mark" aria-hidden="true"><i></i><i></i><i></i></span>
      </header>
      {children}
      {footer && <footer className="u4-experience-footer"><b>BE READY TO EXPLAIN</b><span>{footer}</span></footer>}
      {audience === "teacher" && teacherNote && (
        <aside className="u4-teacher-note">
          <b>TEACHER NOTE</b>
          <p>{teacherNote}</p>
        </aside>
      )}
    </section>
  );
}

function ProgressLine({ ready, total, readyText, waitingText }: { ready: number; total: number; readyText: string; waitingText: string }) {
  const complete = ready === total;
  return (
    <div className={`u4-progress-line ${complete ? "complete" : ""}`} role="status" aria-live="polite">
      <span>{ready} of {total}</span>
      <div aria-hidden="true"><i style={{ width: `${(ready / total) * 100}%` }}></i></div>
      <strong>{complete ? readyText : waitingText}</strong>
    </div>
  );
}

export function SystemThreadLab({ sceneIndex, audience }: Unit4ExperienceProps) {
  const scene = clampScene(sceneIndex);
  const [seedChecks, setSeedChecks] = useState<boolean[]>([false, false, false]);
  const [webChecks, setWebChecks] = useState<boolean[]>([false, false, false, false]);
  const [condition, setCondition] = useState(0);
  const [focus, setFocus] = useState(0);

  if (scene === 0) {
    const checks = [
      ["The issue", "We can name the real situation without turning it into a giant topic."],
      ["The people and place", "We can name who may be affected and where the issue happens."],
      ["The decision", "We can name a person, group, government, or organization that can change something."],
    ];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="thread" eyebrow="PULL THE SYSTEM THREAD · PART 1" title="Bring back an inquiry seed worth following." prompt="Open the question your team saved earlier. Make sure it is focused enough to investigate before you build anything new." teacherNote="Teams should reopen an approved seed from Units 1–3. Conference quickly with any team that has only a huge topic, a yes/no question, or a solution in disguise." footer="Our focused question is… This matters because…">
        <div className="u4-seed-table">
          <article className="u4-seed-card">
            <small>YOUR TEAM&apos;S SAVED SEED</small>
            <h4>Write it on paper or your project board.</h4>
            <p>Do not type private information into this screen. The project record belongs in your class workspace.</p>
          </article>
          <div className="u4-check-stack" aria-label="Inquiry seed check">
            {checks.map(([title, detail], index) => (
              <button key={title} aria-pressed={seedChecks[index]} className={seedChecks[index] ? "selected" : ""} onClick={() => setSeedChecks((current) => current.map((value, i) => i === index ? !value : value))}>
                <b>{seedChecks[index] ? "✓" : index + 1}</b>
                <span><strong>{title}</strong><small>{detail}</small></span>
              </button>
            ))}
          </div>
        </div>
        <ProgressLine ready={seedChecks.filter(Boolean).length} total={checks.length} readyText="Your seed is ready for the system web." waitingText="Talk through every check before moving on." />
      </ExperienceFrame>
    );
  }

  if (scene === 1) {
    const levels = [
      ["WHAT WE NOTICE", "What is happening now? Use a fact or pattern, not a guess."],
      ["WHAT KEEPS HAPPENING", "What repeats over time? Who is affected again and again?"],
      ["WHAT SHAPES THE PATTERN", "Which rules, resources, beliefs, histories, or decisions help keep it going?"],
      ["WHO CAN CHANGE WHAT", "Where is power held? Who already works on this issue?"],
    ];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="thread" eyebrow="PULL THE SYSTEM THREAD · PART 2" title="Build the system—not a blame list." prompt="Make a floor or wall web with cards and string. Every arrow must mean something your team can explain." teacherNote="Give teams cards, sticky notes, and string. Ask for sources beside important claims. Redirect personal blame toward conditions, decisions, incentives, histories, and power without removing individual responsibility." footer="This part connects to that part because… Our evidence is…">
        <div className="u4-system-web">
          {levels.map(([title, detail], index) => (
            <button key={title} aria-pressed={webChecks[index]} className={webChecks[index] ? "ready" : ""} onClick={() => setWebChecks((current) => current.map((value, i) => i === index ? !value : value))}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{title}</strong><p>{detail}</p></div>
              <b>{webChecks[index] ? "EVIDENCE READY" : "ADD TO WEB"}</b>
            </button>
          ))}
        </div>
        <div className="u4-room-move"><b>LEAVE THE SCREEN</b><span>Lay out the cards. Connect them. Then ask another team to follow one path through your web.</span></div>
      </ExperienceFrame>
    );
  }

  if (scene === 2) {
    const conditions = [
      ["A rule changes", "Which people, choices, or results change first—and what may change later?"],
      ["Funding is cut in half", "What stops, shrinks, or shifts onto someone else?"],
      ["A trusted partner joins", "What becomes possible? What still cannot be assumed?"],
      ["Public attention grows", "Who gains influence? Could attention create pressure or a new problem?"],
    ];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="thread" eyebrow="PULL THE SYSTEM THREAD · PART 3" title="Tug one thread. Trace what moves." prompt="Choose a change card. Predict three effects across your web, including one effect nobody intended." teacherNote="Give teams a physical surprise card after they have built a defensible web. The aim is causal reasoning, not predicting the future with certainty. Require might/could language and one evidence-based reason." footer="If this changed, then… might… because… A result nobody intended could be…">
        <div className="u4-condition-picker" role="group" aria-label="Choose a system change">
          {conditions.map(([title, detail], index) => (
            <button key={title} aria-pressed={condition === index} className={condition === index ? "selected" : ""} onClick={() => setCondition(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><small>{detail}</small>
            </button>
          ))}
        </div>
        <article className="u4-effect-chain">
          <small>TRACE THE SELECTED CHANGE</small>
          <h4>{conditions[condition][0]}</h4>
          <div><span>FIRST EFFECT</span><i>→</i><span>LATER EFFECT</span><i>→</i><span>UNINTENDED EFFECT</span></div>
          <p>{conditions[condition][1]}</p>
        </article>
      </ExperienceFrame>
    );
  }

  const focusMoves = [
    ["Change a condition", "What rule, resource, relationship, or repeated pattern may be changeable?"],
    ["Shift a decision", "Who has the authority or influence to make a responsible next move?"],
    ["Strengthen a response", "What existing effort could be supported, adapted, or studied more carefully?"],
  ];
  return (
    <ExperienceFrame audience={audience} sceneIndex={scene} tone="thread" eyebrow="PULL THE SYSTEM THREAD · PART 4" title="Choose a leverage question—not a magic fix." prompt="Pick one place where change may be possible. Turn it into a question your team can investigate next." teacherNote="Approve questions that are connected to evidence and within the available source set. A team does not need to solve the whole issue. Photograph or save the revised web for the team research record; no separate portfolio post is needed." footer="We think this is worth studying because… We still cannot know…">
      <div className="u4-focus-grid" role="group" aria-label="Choose a leverage focus">
        {focusMoves.map(([title, detail], index) => (
          <button key={title} aria-pressed={focus === index} className={focus === index ? "selected" : ""} onClick={() => setFocus(index)}>
            <b>{index + 1}</b><span><strong>{title}</strong><small>{detail}</small></span>
          </button>
        ))}
      </div>
      <div className="u4-question-builder">
        <small>BUILD YOUR LEVERAGE QUESTION</small>
        <p><b>How might</b> [a person, group, or institution] <b>{focus === 0 ? "change a condition that keeps the pattern going" : focus === 1 ? "make or influence this decision more responsibly" : "strengthen or adapt an existing response"}</b> while considering [affected people, possible costs, and limits]?</p>
      </div>
    </ExperienceFrame>
  );
}

export function ResponsesUnderPressureLab({ sceneIndex, audience }: Unit4ExperienceProps) {
  const scene = clampScene(sceneIndex);
  const [sourceReady, setSourceReady] = useState<boolean[]>([false, false, false]);
  const [jobs, setJobs] = useState<boolean[]>([false, false, false]);
  const [pressure, setPressure] = useState(0);
  const [move, setMove] = useState<"keep" | "adapt" | "question">("adapt");

  if (scene === 0) {
    const stations = [
      ["COMMUNITY OR AFFECTED-PEOPLE RESPONSE", "What are people closest to the issue already doing or asking for?"],
      ["GOVERNMENT OR PUBLIC-SERVICE RESPONSE", "What rule, funding choice, program, or public action exists?"],
      ["ORGANIZATION OR COOPERATION RESPONSE", "How are groups, NGOs, Nations, or countries working together?"],
    ];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="response" eyebrow="RESPONSES UNDER PRESSURE · PART 1" title="Find what people are already trying." prompt="Study three real responses connected to your issue. Begin with the people and organizations already doing the work." teacherNote="Curate or approve three credible, meaningfully different responses before class. When Indigenous-led work is relevant, use the specific Nation or organization’s own public source and do not treat it as one generic perspective." footer="This response tries to… The source shows… It does not yet tell us…">
        <div className="u4-response-stations">
          {stations.map(([title, detail], index) => (
            <button key={title} aria-pressed={sourceReady[index]} className={sourceReady[index] ? "ready" : ""} onClick={() => setSourceReady((current) => current.map((value, i) => i === index ? !value : value))}>
              <span>{index + 1}</span><small>SOURCE STATION</small><strong>{title}</strong><p>{detail}</p><b>{sourceReady[index] ? "SOURCE NOTED ✓" : "MARK AFTER READING"}</b>
            </button>
          ))}
        </div>
        <ProgressLine ready={sourceReady.filter(Boolean).length} total={stations.length} readyText="Three response sources are ready to compare." waitingText="Read the real source before marking a station." />
      </ExperienceFrame>
    );
  }

  if (scene === 1) {
    const responseJobs = [
      ["Respond now", "Meets an urgent need or reduces harm that is already happening."],
      ["Prevent next time", "Changes a practice or protection so the problem is less likely to repeat."],
      ["Change the conditions", "Works on a rule, resource, relationship, or power structure that keeps the issue going."],
    ];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="response" eyebrow="RESPONSES UNDER PRESSURE · PART 2" title="What job does each response do?" prompt="Place each real response where it fits. A response may do more than one job—but your evidence must explain why." teacherNote="Use three large floor labels and response cards. Do not rank emergency relief as inferior to systems change; responsible work may need several response types at the same time." footer="We placed this response here because the source says… It may also…">
        <div className="u4-response-jobs">
          {responseJobs.map(([title, detail], index) => (
            <button key={title} aria-pressed={jobs[index]} className={jobs[index] ? "selected" : ""} onClick={() => setJobs((current) => current.map((value, i) => i === index ? !value : value))}>
              <span>{String.fromCharCode(65 + index)}</span><strong>{title}</strong><p>{detail}</p><b>{jobs[index] ? "OUR RESPONSE MAY DO THIS" : "TEST THIS JOB"}</b>
            </button>
          ))}
        </div>
        <div className="u4-room-move"><b>MOVE THE EVIDENCE</b><span>Place each response card. Another team may challenge the placement by asking for proof.</span></div>
      </ExperienceFrame>
    );
  }

  if (scene === 2) {
    const tests = [
      ["Reach", "Who can access or benefit? Who may be left out?"],
      ["Evidence", "What result is supported? How strong and current is the evidence?"],
      ["Power", "Who decides, participates, and answers for the effects?"],
      ["Staying power", "What happens when attention, leadership, or funding changes?"],
      ["Unintended results", "What new cost, barrier, or harm might appear?"],
    ];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="response" eyebrow="RESPONSES UNDER PRESSURE · PART 3" title="Pressure-test one response." prompt="Choose the question that your group thinks the response most needs to answer. Then defend that choice with evidence." teacherNote="Assign or let teams draw one pressure test. This is an evaluation of a response, not an attack on the people doing the work. Insist on proportional, source-based claims and visible uncertainty." footer="This response is promising because… Under pressure, we need to ask…">
        <div className="u4-pressure-wheel" role="group" aria-label="Choose a pressure test">
          <nav>{tests.map(([title], index) => <button key={title} aria-pressed={pressure === index} onClick={() => setPressure(index)}>{index + 1}<span>{title}</span></button>)}</nav>
          <article>
            <small>SELECTED PRESSURE TEST</small>
            <h4>{tests[pressure][0]}</h4>
            <p>{tests[pressure][1]}</p>
            <div><b>EVIDENCE FOR</b><b>EVIDENCE AGAINST</b><b>STILL UNKNOWN</b></div>
          </article>
        </div>
      </ExperienceFrame>
    );
  }

  const moves = {
    keep: ["KEEP", "This feature already fits the evidence and the people or place involved."],
    adapt: ["ADAPT", "This feature is useful, but it needs a specific change for this context."],
    question: ["QUESTION", "The evidence is too weak, a voice is missing, or the possible harm needs more study."],
  } as const;
  return (
    <ExperienceFrame audience={audience} sceneIndex={scene} tone="response" eyebrow="RESPONSES UNDER PRESSURE · PART 4" title="Borrow carefully. Do not invent a perfect solution." prompt="Choose one feature from an existing response. Decide whether your team should keep it, adapt it, or question it." teacherNote="This is the bridge into product design, not a final action plan. Save the team’s response comparison in its project folder or notebook. No separate SpacesEDU post is required." footer="We would keep/adapt/question… because… A limit we still need to respect is…">
      <div className="u4-kAQ" role="group" aria-label="Choose how to use a response feature">
        {(Object.keys(moves) as Array<keyof typeof moves>).map((key) => (
          <button key={key} aria-pressed={move === key} className={move === key ? "selected" : ""} onClick={() => setMove(key)}>
            <strong>{moves[key][0]}</strong><span>{moves[key][1]}</span>
          </button>
        ))}
      </div>
      <article className="u4-design-principle">
        <small>ONE PROJECT RULE SUPPORTED BY EVIDENCE</small>
        <p>We would <b>{moves[move][0].toLowerCase()}</b> [specific feature] because [evidence]. This may help [people or purpose], but [important limit or possible consequence].</p>
      </article>
    </ExperienceFrame>
  );
}

export function MakeItTeachableLab({ sceneIndex, audience }: Unit4ExperienceProps) {
  const scene = clampScene(sceneIndex);
  const [format, setFormat] = useState(0);
  const [prototype, setPrototype] = useState<boolean[]>([false, false, false, false]);
  const [accuracy, setAccuracy] = useState<boolean[]>([false, false, false, false, false]);
  const [minimum, setMinimum] = useState<boolean[]>([false, false, false, false]);

  if (scene === 0) {
    const formats = [
      ["MINECRAFT QUEST", "Best when space, systems, change, or choices can be explored—not just decorated."],
      ["PODCAST OR MINI-DOCUMENTARY", "Best when evidence, stories, expert voices, or careful explanation need to be heard."],
      ["EXHIBIT OR MODEL", "Best when classmates need to compare, handle, notice, or move through evidence."],
      ["SIMULATION OR LIVE LESSON", "Best when classmates need to make a decision, experience a rule, or test a trade-off."],
    ];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="make" eyebrow="MAKE IT TEACHABLE · PART 1" title="Choose the form that helps the learning." prompt="Do not choose a format only because it looks impressive. Choose the one that helps classmates understand and do something meaningful." teacherNote="Approve the learning purpose before the tool. Offer a low-tech route for every format. A slide deck may support any experience, but it should not become the experience by itself." footer="This format fits because our classmates need to…">
        <div className="u4-format-deck" role="group" aria-label="Choose a teaching format">
          {formats.map(([title, detail], index) => (
            <button key={title} aria-pressed={format === index} className={format === index ? "selected" : ""} onClick={() => setFormat(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><p>{detail}</p><b>{format === index ? "CURRENT CHOICE" : "COMPARE"}</b>
            </button>
          ))}
        </div>
        <div className="u4-format-fit"><small>FORMAT FIT TEST</small><strong>{formats[format][0]}</strong><p>What will classmates <b>think, decide, create, test, or explain</b> that they could not do by simply reading a report?</p></div>
      </ExperienceFrame>
    );
  }

  if (scene === 1) {
    const zones = [
      ["HOOK", "A strong question, object, clue, sound, image, or short problem."],
      ["LEARN", "Three essential ideas supported by visible sources and evidence."],
      ["DO", "A meaningful choice, test, creation, discussion, or challenge for the audience."],
      ["LEAVE WITH", "One idea classmates should remember—and one uncertainty they should notice."],
    ];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="make" eyebrow="MAKE IT TEACHABLE · PART 2" title="Make the paper version first." prompt="Build a quick, rough prototype before opening a digital tool, recording audio, or making polished visuals." teacherNote="Time-box the paper prototype to 25–35 minutes. Test the learning sequence before students invest in production. Paper can remain the final format when it teaches effectively." footer="A classmate will enter here… think or do this… and leave understanding…">
        <div className="u4-paper-prototype">
          {zones.map(([title, detail], index) => (
            <button key={title} aria-pressed={prototype[index]} className={prototype[index] ? "ready" : ""} onClick={() => setPrototype((current) => current.map((value, i) => i === index ? !value : value))}>
              <span>{index + 1}</span><strong>{title}</strong><p>{detail}</p><b>{prototype[index] ? "SKETCHED ✓" : "SKETCH THIS"}</b>
            </button>
          ))}
        </div>
        <ProgressLine ready={prototype.filter(Boolean).length} total={zones.length} readyText="Your rough learning path is ready to test." waitingText="Keep it rough. Make the whole path before polishing." />
      </ExperienceFrame>
    );
  }

  if (scene === 2) {
    const gate = [
      ["Focused question", "The experience answers one complex question—not an entire huge topic."],
      ["Accurate system", "Causes, power, perspectives, and consequences connect clearly."],
      ["Strong evidence", "Several different sources are cited beside the ideas they support."],
      ["Existing responses", "At least two responses are compared honestly, including limits."],
      ["Respect and uncertainty", "Affected people are not stereotyped, and unknowns remain visible."],
    ];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="make" eyebrow="MAKE IT TEACHABLE · PART 3" title="Check your ideas and evidence before finishing." prompt="A beautiful product with weak evidence is not ready. Point to the proof for every check." teacherNote="Run a short accuracy conference. Ask one student at random to explain each check so one expert cannot carry the whole team. Give a specific next step rather than a score at this stage." footer="Our strongest evidence is… A claim we still need to fix or qualify is…">
        <div className="u4-accuracy-gate">
          <div className={`u4-gate-arch ${accuracy.every(Boolean) ? "open" : ""}`} aria-hidden="true"><span>ACCURACY</span><i></i></div>
          <div className="u4-gate-checks">
            {gate.map(([title, detail], index) => (
              <button key={title} aria-pressed={accuracy[index]} className={accuracy[index] ? "ready" : ""} onClick={() => setAccuracy((current) => current.map((value, i) => i === index ? !value : value))}>
                <b>{accuracy[index] ? "✓" : index + 1}</b><span><strong>{title}</strong><small>{detail}</small></span>
              </button>
            ))}
          </div>
        </div>
        <ProgressLine ready={accuracy.filter(Boolean).length} total={gate.length} readyText="All five checks marked. Be ready to show the evidence for each one." waitingText="Check the evidence before adding finishing details." />
      </ExperienceFrame>
    );
  }

  const spine = [
    ["UNDERSTAND", "Teach three key ideas instead of listing twenty facts"],
    ["EVIDENCE", "Place each source beside the idea it supports"],
    ["PARTICIPATE", "Give the audience a choice to make, a task to try, or a question to answer"],
    ["QUESTION", "Show one limit, disagreement, or question that remains"],
  ];
  return (
    <ExperienceFrame audience={audience} sceneIndex={scene} tone="make" eyebrow="MAKE IT TEACHABLE · PART 4" title="Build the minimum experience that truly teaches." prompt="First connect the three key ideas, their evidence, an audience task, and a question that remains. Add finishing details only if they help classmates understand, take part, or stay interested." teacherNote="Protect studio time, but set a firm minimum viable product. Evaluate content accuracy and learning design before technical sophistication. Production polish is not a Social Studies criterion." footer="We cut… because it did not help learning. We kept… because it helps the audience…">
      <div className="u4-learning-spine">
        {spine.map(([title, detail], index) => (
          <button key={title} aria-pressed={minimum[index]} className={minimum[index] ? "ready" : ""} onClick={() => setMinimum((current) => current.map((value, i) => i === index ? !value : value))}>
            <span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{detail}</p></div><b>{minimum[index] ? "BUILT" : "BUILD"}</b>
          </button>
        ))}
      </div>
      <aside className="u4-polish-rule"><strong>THE POLISH RULE</strong><p>Digital details, sound editing, art, animation, and effects can make learning powerful. They do not replace accurate understanding, evidence, or audience thinking.</p></aside>
    </ExperienceFrame>
  );
}

export function ExpertExchangeLab({ sceneIndex, audience }: Unit4ExperienceProps) {
  const scene = clampScene(sceneIndex);
  const [coldTest, setColdTest] = useState<boolean[]>([false, false, false]);
  const [teachBack, setTeachBack] = useState<"clear" | "partial" | "stuck">("partial");
  const [contentFix, setContentFix] = useState(0);
  const [experienceFix, setExperienceFix] = useState(0);
  const [showcase, setShowcase] = useState<boolean[]>([false, false, false, false]);

  if (scene === 0) {
    const testerMoves = [
      ["TRY WITHOUT HINTS", "Try the experience without the creators explaining what to do."],
      ["THINK ALOUD", "Say where you feel curious, confident, confused, or overloaded."],
      ["LEAVE SIGNALS", "Finish: I learned… I got stuck… I need proof for…"],
    ];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="exchange" eyebrow="EXPERT EXCHANGE · PART 1" title="Let another team try it without hints." prompt="Creators stay quiet at first. Testers use the experience exactly as it is and show where the design teaches—or gets in the way." teacherNote="Pair teams with different topics. Give testers 10–12 minutes and creators an observation sheet. Testers critique the experience, never the people who made it." footer="Testers understood… They became unsure when… The experience itself showed…">
        <div className="u4-cold-test">
          {testerMoves.map(([title, detail], index) => (
            <button key={title} aria-pressed={coldTest[index]} className={coldTest[index] ? "done" : ""} onClick={() => setColdTest((current) => current.map((value, i) => i === index ? !value : value))}>
              <span>{index + 1}</span><strong>{title}</strong><p>{detail}</p><b>{coldTest[index] ? "DONE ✓" : "TEST"}</b>
            </button>
          ))}
        </div>
        <div className="u4-feedback-signals"><span><b>I LEARNED…</b> Name the idea.</span><span><b>I GOT STUCK…</b> Name the exact place.</span><span><b>I NEED PROOF FOR…</b> Name the claim.</span></div>
      </ExperienceFrame>
    );
  }

  if (scene === 1) {
    const results = {
      clear: ["CLEAR", "The tester can explain the key idea and point to supporting evidence."],
      partial: ["PARTLY CLEAR", "The tester has the main idea but a connection, cause, or limit is missing."],
      stuck: ["NOT CLEAR YET", "The tester remembers details or effects but cannot explain the important idea."],
    } as const;
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="exchange" eyebrow="EXPERT EXCHANGE · PART 2" title="Can the audience teach it back?" prompt="A tester explains the main idea in their own words. The creators listen for accuracy instead of helping." teacherNote="Choose the teach-back student, not the presenting team. This is a quick measure of what the experience communicated—not a grade for the visitor. Ask creators what the result tells them to revise." footer="I think the main idea is… The evidence that helped me understand was…">
        <div className="u4-teachback-stage">
          <article><small>60-SECOND TEACH-BACK</small><h4>Explain without notes or hints.</h4><p>Explain the issue, one important cause or system connection, and what the evidence says about a response.</p></article>
          <div role="group" aria-label="Choose the teach-back result">
            {(Object.keys(results) as Array<keyof typeof results>).map((key) => (
              <button key={key} aria-pressed={teachBack === key} className={teachBack === key ? "selected" : ""} onClick={() => setTeachBack(key)}>
                <strong>{results[key][0]}</strong><span>{results[key][1]}</span>
              </button>
            ))}
          </div>
          <footer><b>CURRENT SIGNAL</b><span>{results[teachBack][0]} — use this evidence to choose the next revision.</span></footer>
        </div>
      </ExperienceFrame>
    );
  }

  if (scene === 2) {
    const contentFixes = ["Clarify one cause or system link", "Add proof beside one claim", "Represent a missing perspective carefully", "Make clear what a response can do and where its limits are"];
    const experienceFixes = ["Make the path easier to follow", "Shorten a section that gives too much information at once", "Strengthen the audience task", "Add another way for classmates to take part"];
    return (
      <ExperienceFrame audience={audience} sceneIndex={scene} tone="exchange" eyebrow="EXPERT EXCHANGE · PART 3" title="Revise one idea and one experience feature." prompt="Use the test evidence. Fix what matters most instead of rebuilding everything or adding decoration." teacherNote="Require one content revision and one audience-experience revision. Ask teams to keep before/after evidence. A smaller evidence-led revision is stronger than a rushed total redesign." footer="We changed… because testers showed… Now the audience can…">
        <div className="u4-revision-board">
          <section><small>CONTENT REVISION</small><h4>Make the understanding stronger.</h4>{contentFixes.map((item, index) => <button key={item} aria-pressed={contentFix === index} className={contentFix === index ? "selected" : ""} onClick={() => setContentFix(index)}><b>{index + 1}</b><span>{item}</span></button>)}</section>
          <section><small>EXPERIENCE REVISION</small><h4>Make the learning work better.</h4>{experienceFixes.map((item, index) => <button key={item} aria-pressed={experienceFix === index} className={experienceFix === index ? "selected" : ""} onClick={() => setExperienceFix(index)}><b>{index + 1}</b><span>{item}</span></button>)}</section>
        </div>
        <article className="u4-revision-ticket"><small>OUR TWO REVISION PROMISES</small><p><b>Idea:</b> {contentFixes[contentFix]}.</p><p><b>Experience:</b> {experienceFixes[experienceFix]}.</p></article>
      </ExperienceFrame>
    );
  }

  const finalMoves = [
    ["TEACH", "Run the experience. Make classmates think, decide, create, test, or explain."],
    ["RESPOND", "Answer one audience question with evidence or name what remains uncertain."],
    ["SHARE ONCE", "Post one final artifact or link for the whole team."],
    ["REFLECT ALONE", "Each person records their own short reflection in SpacesEDU."],
  ];
  return (
    <ExperienceFrame audience={audience} sceneIndex={scene} tone="exchange" eyebrow="EXPERT EXCHANGE · PART 4" title="Teach, respond, and show the thinking that belongs to you." prompt="Run your final experience for classmates. The team shares one product; each person reflects on their own learning and contribution." teacherNote="Use rotating 10–15 minute sessions. Assess Social Studies understanding separately from ELA, Arts, or ADST. Do not score production polish as understanding. The shared artifact is posted once; every student adds an individual SpacesEDU reflection." footer="The most important idea for our audience is… The evidence that matters is…">
      <div className="u4-showcase-route">
        {finalMoves.map(([title, detail], index) => (
          <button key={title} aria-pressed={showcase[index]} className={showcase[index] ? "done" : ""} onClick={() => setShowcase((current) => current.map((value, i) => i === index ? !value : value))}>
            <span>{index + 1}</span><strong>{title}</strong><p>{detail}</p><b>{showcase[index] ? "READY ✓" : "GET READY"}</b>
          </button>
        ))}
      </div>
      <section className="u4-spaces-reflection">
        <header><small>INDIVIDUAL PORTFOLIO REFLECTION</small><h4>Your voice. Your evidence. Your next step.</h4><span>SPACES EDU</span></header>
        <div>
          <p><b>1</b> What do you understand now that you did not understand at the start?</p>
          <p><b>2</b> Which evidence, response, perspective, or audience question changed your thinking?</p>
          <p><b>3</b> What did you contribute, and what revision did you help make?</p>
          <p><b>4</b> What remains uncertain? What is one responsible path toward change—and one limit?</p>
        </div>
        <footer>Choose short text, audio, or video. Be specific. A polished team product cannot replace your own explanation.</footer>
      </section>
    </ExperienceFrame>
  );
}
