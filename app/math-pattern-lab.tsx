"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Audience = "student" | "teacher";
type TrailId = "fern-lights" | "firefly-clearing" | "stream-stones";
type DecisionKey = "stage" | "change" | "rule" | "forecast";
type Feedback = { kind: "success" | "retry"; message: string } | null;

type Trail = {
  id: TrailId;
  name: string;
  place: string;
  symbol: string;
  description: string;
  itemPlural: string;
  fixedLabel: string;
  growthLabel: string;
  destination: string;
  change: number;
  fixed: number;
  changeChoices: number[];
  ruleChoices: Array<{ id: string; label: string; correct: boolean }>;
};

const trails: Trail[] = [
  {
    id: "fern-lights",
    name: "Moon Crystal Trail",
    place: "Crystal grove",
    symbol: "◇",
    description: "Power up 3 new crystals at each stage. Two guide crystals stay lit.",
    itemPlural: "crystals",
    fixedLabel: "guide crystals",
    growthLabel: "new crystals",
    destination: "Moon Gate",
    change: 3,
    fixed: 2,
    changeChoices: [2, 4, 3],
    ruleChoices: [
      { id: "swap", label: "2 × stage + 3", correct: false },
      { id: "grow", label: "3 × stage + 2", correct: true },
      { id: "add", label: "3 + stage + 2", correct: false },
    ],
  },
  {
    id: "firefly-clearing",
    name: "Firefly Signal Clearing",
    place: "Firefly meadow",
    symbol: "●",
    description: "Four more fireflies join each stage. One moon beacon stays on.",
    itemPlural: "glow lights",
    fixedLabel: "moon beacon",
    growthLabel: "fireflies",
    destination: "Starflower Clearing",
    change: 4,
    fixed: 1,
    changeChoices: [5, 4, 3],
    ruleChoices: [
      { id: "add", label: "4 + stage + 1", correct: false },
      { id: "swap", label: "1 × stage + 4", correct: false },
      { id: "grow", label: "4 × stage + 1", correct: true },
    ],
  },
  {
    id: "stream-stones",
    name: "River Stone Crossing",
    place: "Forest stream",
    symbol: "◆",
    description: "Add 2 stepping stones each stage. Five shore stones stay in place.",
    itemPlural: "stones",
    fixedLabel: "shore stones",
    growthLabel: "stepping stones",
    destination: "Waterfall Lookout",
    change: 2,
    fixed: 5,
    changeChoices: [2, 3, 1],
    ruleChoices: [
      { id: "grow", label: "2 × stage + 5", correct: true },
      { id: "swap", label: "5 × stage + 2", correct: false },
      { id: "add", label: "2 + stage + 5", correct: false },
    ],
  },
];

const decisionLabels: Record<DecisionKey, string> = {
  stage: "Stage 4 built",
  change: "Change found",
  rule: "Rule tested",
  forecast: "Stage 10 predicted",
};

function valueAt(trail: Trail, stage: number) {
  return trail.change * stage + trail.fixed;
}

function correctRule(trail: Trail) {
  return trail.ruleChoices.find((choice) => choice.correct)?.label ?? "";
}

function PatternStage({ trail, stage, compact = false }: { trail: Trail; stage: number; compact?: boolean }) {
  const total = valueAt(trail, stage);
  return (
    <article className={`pattern-trail-stage ${compact ? "pattern-trail-stage--compact" : ""}`} data-trail={trail.id} aria-label={`Stage ${stage} has ${total} ${trail.itemPlural}: ${stage} growing groups of ${trail.change} ${trail.growthLabel}, plus ${trail.fixed} ${trail.fixedLabel} that stay fixed.`}>
      <header><span>Stage {stage}</span><b>{total}</b></header>
      <div className="pattern-trail-stage__model" aria-hidden="true">
        <span className="pattern-trail-stage__fixed">
          {Array.from({ length: trail.fixed }, (_, index) => <i key={`fixed-${index}`}></i>)}
        </span>
        {Array.from({ length: stage }, (_, group) => (
          <span className="pattern-trail-stage__growth" key={`group-${group}`}>
            {Array.from({ length: trail.change }, (_, index) => <i key={`growth-${index}`}></i>)}
          </span>
        ))}
      </div>
      {!compact && <footer><span className="pattern-key-shape pattern-key-shape--fixed"></span>{trail.fixed} {trail.fixedLabel} stay <span className="pattern-key-shape pattern-key-shape--growth"></span>{trail.change} {trail.growthLabel} added</footer>}
    </article>
  );
}

function StepFeedback({ feedback, trailId }: { feedback: Feedback; trailId: TrailId }) {
  if (!feedback) return null;
  return (
    <div className={`pattern-trail-feedback pattern-trail-feedback--${feedback.kind}`} data-trail={trailId} role="status" aria-live="polite">
      <b>{feedback.kind === "success" ? "Clue unlocked" : "Try another idea"}</b>
      <span>{feedback.message}</span>
      {feedback.kind === "success" && <i className="pattern-trail-feedback__reaction" aria-hidden="true"><i></i><i></i><i></i></i>}
    </div>
  );
}

export function PatternTrailLab({ audience = "student" }: { audience?: Audience }) {
  const [trailId, setTrailId] = useState<TrailId | null>(null);
  const [step, setStep] = useState(0);
  const [stageAnswer, setStageAnswer] = useState("");
  const [changeAnswer, setChangeAnswer] = useState<number | null>(null);
  const [ruleAnswer, setRuleAnswer] = useState<string | null>(null);
  const [forecastAnswer, setForecastAnswer] = useState("");
  const [verified, setVerified] = useState<Record<DecisionKey, boolean>>({ stage: false, change: false, rule: false, forecast: false });
  const [feedback, setFeedback] = useState<Record<DecisionKey, Feedback>>({ stage: null, change: null, rule: null, forecast: null });
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasStartedRef = useRef(false);
  const trail = trails.find((item) => item.id === trailId) ?? null;
  const verifiedCount = Object.values(verified).filter(Boolean).length;

  const stageValues = useMemo(() => trail ? [1, 2, 3, 4].map((stageNumber) => valueAt(trail, stageNumber)) : [], [trail]);

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step, trailId]);

  const clearWork = (nextTrailId: TrailId | null = trailId) => {
    setTrailId(nextTrailId);
    setStep(nextTrailId ? 1 : 0);
    setStageAnswer("");
    setChangeAnswer(null);
    setRuleAnswer(null);
    setForecastAnswer("");
    setVerified({ stage: false, change: false, rule: false, forecast: false });
    setFeedback({ stage: null, change: null, rule: null, forecast: null });
  };

  const chooseTrail = (id: TrailId) => clearWork(id);

  const checkStage = () => {
    if (!trail) return;
    const answer = Number(stageAnswer);
    const expected = valueAt(trail, 4);
    if (answer === expected) {
      setVerified((current) => ({ ...current, stage: true }));
      setFeedback((current) => ({ ...current, stage: { kind: "success", message: `Stage 4 has ${expected} ${trail.itemPlural}. The design grew by ${trail.change} again.` } }));
      return;
    }
    const direction = Number.isFinite(answer) && answer > expected ? "too many" : "too few";
    setFeedback((current) => ({ ...current, stage: { kind: "retry", message: `${answer || "That answer"} gives ${direction}. Compare the jumps from ${stageValues[0]} to ${stageValues[1]} to ${stageValues[2]}.` } }));
  };

  const checkChange = () => {
    if (!trail || changeAnswer === null) return;
    if (changeAnswer === trail.change) {
      setVerified((current) => ({ ...current, change: true }));
      setFeedback((current) => ({ ...current, change: { kind: "success", message: `${trail.change} is added every time the stage number goes up by 1.` } }));
      return;
    }
    setFeedback((current) => ({ ...current, change: { kind: "retry", message: `Check one jump: ${stageValues[1]} − ${stageValues[0]}. Then check ${stageValues[2]} − ${stageValues[1]}.` } }));
  };

  const checkRule = () => {
    if (!trail || !ruleAnswer) return;
    const choice = trail.ruleChoices.find((item) => item.id === ruleAnswer);
    if (choice?.correct) {
      const stageThree = valueAt(trail, 3);
      setVerified((current) => ({ ...current, rule: true }));
      setFeedback((current) => ({ ...current, rule: { kind: "success", message: `Test Stage 3: ${trail.change} × 3 + ${trail.fixed} = ${stageThree}. It matches the model.` } }));
      return;
    }
    setFeedback((current) => ({ ...current, rule: { kind: "retry", message: `Test your rule with Stage 2. It must make ${stageValues[1]}, not only look similar.` } }));
  };

  const checkForecast = () => {
    if (!trail) return;
    const answer = Number(forecastAnswer);
    const expected = valueAt(trail, 10);
    if (answer === expected) {
      setVerified((current) => ({ ...current, forecast: true }));
      setFeedback((current) => ({ ...current, forecast: { kind: "success", message: `Stage 10 has ${expected} ${trail.itemPlural}. You used the rule instead of building all ten stages.` } }));
      return;
    }
    setFeedback((current) => ({ ...current, forecast: { kind: "retry", message: `Put 10 into the rule: ${trail.change} × 10 + ${trail.fixed}.` } }));
  };

  const canOpenStep = (target: number) => {
    if (target <= 1) return Boolean(trail);
    if (target === 2) return verified.stage;
    if (target === 3) return verified.change;
    if (target === 4) return verified.rule;
    return verified.forecast;
  };

  const goNext = () => setStep((current) => Math.min(5, current + 1));

  const stepTitle = step === 0 ? "Choose a route to power up." : step === 1 ? "Complete the next build." : step === 2 ? "Spot the upgrade." : step === 3 ? "Crack the pattern code." : step === 4 ? `Fast-forward: how many ${trail?.itemPlural ?? "items"} at Stage 10?` : "Route unlocked: show the proof.";

  return (
    <section className="pattern-trail-lab" data-trail={trailId ?? "entrance"} data-progress={verifiedCount} aria-labelledby="pattern-trail-title">
      <header className="pattern-trail-hero">
        <div className="pattern-trail-hero__copy">
          <small>Patterns &amp; Equations · Mosslight Forest</small>
          <h2 id="pattern-trail-title">Find the rule. Reveal the path.</h2>
          <p>{trail ? `${trail.name}: ${trail.description} Every correct clue changes the scene.` : "Pick a route, find what changes, and use the rule to predict what comes next. Every correct clue changes the scene."}</p>
        </div>
        <div className="pattern-trail-hero__scene" data-trail={trailId ?? "entrance"} data-progress={verifiedCount} aria-hidden="true">
          <span className="pattern-trail-moon"></span>
          <span className="pattern-trail-tree pattern-trail-tree--one"></span>
          <span className="pattern-trail-tree pattern-trail-tree--two"></span>
          <span className="pattern-trail-path"></span>
          <span className="pattern-trail-scene__gate"><i></i><i></i><i></i></span>
          <span className="pattern-trail-scene__runner"></span>
          <span className="pattern-trail-scene__stream"><i></i><i></i><i></i></span>
          <span className="pattern-trail-scene__boat"></span>
          <span className="pattern-trail-scene__crystals">{Array.from({ length: 7 }, (_, index) => <i key={index}></i>)}</span>
          <span className="pattern-trail-scene__fireflies">{Array.from({ length: 9 }, (_, index) => <i key={index}></i>)}</span>
          <span className="pattern-trail-scene__checkpoints">
            {[1, 2, 3, 4].map((clue) => <i key={clue} data-active={verifiedCount >= clue}></i>)}
          </span>
        </div>
      </header>

      {trail && (
        <section className="pattern-trail-progress" aria-label="Verified trail evidence">
          <div className="pattern-trail-progress__label">
            <span>Route power</span>
            <strong aria-live="polite">{verifiedCount} of 4 clues unlocked</strong>
          </div>
          <div className="pattern-trail-progress__bar" role="progressbar" aria-label={`${verifiedCount} of 4 mathematical decisions verified`} aria-valuemin={0} aria-valuemax={4} aria-valuenow={verifiedCount}>
            <i style={{ width: `${verifiedCount * 25}%` }}></i>
          </div>
          <div className="pattern-trail-progress__clues">
            {(Object.keys(decisionLabels) as DecisionKey[]).map((key, index) => <span key={key} data-verified={verified[key]}><b>{verified[key] ? "✓" : index + 1}</b>{decisionLabels[key]}</span>)}
          </div>
        </section>
      )}

      {trail && (
        <nav className="pattern-trail-steps" aria-label="Pattern trail steps">
          {["Next build", "Upgrade", "Rule code", "Fast-forward", "Proof"].map((label, index) => {
            const target = index + 1;
            const unlocked = canOpenStep(target);
            return <button type="button" key={label} disabled={!unlocked} aria-current={step === target ? "step" : undefined} onClick={() => setStep(target)}><span>{target}</span>{label}<small>{unlocked ? step === target ? "Here now" : "Open" : "Locked"}</small></button>;
          })}
        </nav>
      )}

      <div className="pattern-trail-workspace">
        <h3 ref={stepHeadingRef} tabIndex={-1}>{stepTitle}</h3>

        {step === 0 && (
          <>
            <aside className="pattern-trail-launch-note"><b>Your mission</b><span>Compare four versions of a growing design, find its rule, then jump to Stage 10 without drawing every stage.</span></aside>
            <div className="pattern-trail-picker" role="group" aria-label="Choose one pattern route">
              {trails.map((item) => (
                <button type="button" key={item.id} data-trail={item.id} onClick={() => chooseTrail(item.id)}>
                  <span className="pattern-trail-picker__preview" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <i key={index}></i>)}</span>
                  <span className="pattern-trail-picker__symbol" aria-hidden="true">{item.symbol}</span>
                  <small>{item.place}</small>
                  <strong>{item.name}</strong>
                  <p>{item.description}</p>
                  <b>Enter this route →</b>
                </button>
              ))}
            </div>
          </>
        )}

        {trail && step === 1 && (
          <section className="pattern-trail-task" aria-labelledby="pattern-stage-task">
            <header><span>Clue 1</span><div><h4 id="pattern-stage-task">Read the first three builds.</h4><p>A stage is one numbered version of the design. Work out what Stage 4 should look like.</p></div></header>
            <aside className="pattern-trail-quick-start"><b>Quick start</b><span>Count the total in Stage 1, then notice what was added in Stage 2 and Stage 3. Continue that same change once.</span></aside>
            <div className="pattern-trail-stage-row">
              {[1, 2, 3].map((stageNumber) => <PatternStage key={stageNumber} trail={trail} stage={stageNumber} compact />)}
              {verified.stage ? <PatternStage trail={trail} stage={4} compact /> : (
                <article className="pattern-trail-stage pattern-trail-stage--mystery" data-trail={trail.id} aria-label={stageAnswer ? `Your Stage 4 build currently has ${stageAnswer} ${trail.itemPlural}` : "Stage 4 count is missing"}>
                  <header><span>Stage 4</span><b>{stageAnswer || "?"}</b></header>
                  <div className="pattern-trail-stage__prediction" aria-hidden="true">
                    {stageAnswer ? Array.from({ length: Math.min(Number(stageAnswer), 30) }, (_, index) => <i key={index}></i>) : <strong>?</strong>}
                    {Number(stageAnswer) > 30 && <em>+{Number(stageAnswer) - 30}</em>}
                  </div>
                  <footer>{stageAnswer ? `${stageAnswer} placed` : "Build your prediction"}</footer>
                </article>
              )}
            </div>
            <form className="pattern-trail-number-check" onSubmit={(event) => { event.preventDefault(); checkStage(); }}>
              <label htmlFor="pattern-stage-answer">How many {trail.itemPlural} belong in Stage 4?</label>
              <div>
                <button type="button" aria-label="Subtract one from the Stage 4 prediction" disabled={verified.stage || !stageAnswer || Number(stageAnswer) <= 0} onClick={() => setStageAnswer((current) => String(Math.max(0, Number(current || 0) - 1)))}>−</button>
                <input id="pattern-stage-answer" type="number" inputMode="numeric" min="0" max="99" value={stageAnswer} disabled={verified.stage} onChange={(event) => setStageAnswer(event.target.value)} />
                <button type="button" aria-label="Add one to the Stage 4 prediction" disabled={verified.stage} onClick={() => setStageAnswer((current) => String(Math.min(99, Number(current || 0) + 1)))}>＋</button>
              </div>
              <button className="pattern-trail-check" type="submit" disabled={verified.stage || stageAnswer === ""}>Check Stage 4</button>
            </form>
            <StepFeedback feedback={feedback.stage} trailId={trail.id} />
          </section>
        )}

        {trail && step === 2 && (
          <section className="pattern-trail-task" aria-labelledby="pattern-change-task">
            <header><span>Clue 2</span><div><h4 id="pattern-change-task">Find the repeating upgrade.</h4><p>Compare neighbouring stages. What amount gets added every single time?</p></div></header>
            <div className="pattern-trail-jumps" aria-label={`Stage counts are ${stageValues.join(", ")}`}>
              {stageValues.map((value, index) => <span key={value}><small>Stage {index + 1}</small><b>{value}</b>{index < stageValues.length - 1 && <i aria-hidden="true">→</i>}</span>)}
            </div>
            <div className="pattern-trail-choice-grid" role="group" aria-label="Choose the constant change">
              {trail.changeChoices.map((choice) => <button type="button" key={choice} aria-pressed={changeAnswer === choice} disabled={verified.change} className={changeAnswer === choice ? "selected" : ""} onClick={() => setChangeAnswer(choice)}>Add {choice}</button>)}
            </div>
            <button className="pattern-trail-check" type="button" disabled={verified.change || changeAnswer === null} onClick={checkChange}>Check the change</button>
            <StepFeedback feedback={feedback.change} trailId={trail.id} />
          </section>
        )}

        {trail && step === 3 && (
          <section className="pattern-trail-task" aria-labelledby="pattern-rule-task">
            <header><span>Clue 3</span><div><h4 id="pattern-rule-task">Choose the code that builds every stage.</h4><p>In each choice, “stage” means the stage number. The right rule must work for all four rows.</p></div></header>
            <aside className="pattern-trail-quick-start pattern-trail-quick-start--rule"><b>Decode it</b><span>First multiply the stage number by the amount that repeats. Then add the {trail.fixed} {trail.fixedLabel} that never change.</span></aside>
            <div className="pattern-trail-rule-layout">
              <section className="pattern-trail-rule-table" aria-label="Pattern value table">
                <header><span>Stage</span><span>{trail.itemPlural}</span></header>
                {stageValues.map((value, index) => <p key={value}><b>{index + 1}</b><strong>{value}</strong></p>)}
              </section>
              <div className="pattern-trail-rule-choices" role="group" aria-label="Choose a pattern rule">
                {trail.ruleChoices.map((choice) => <button type="button" key={choice.id} aria-pressed={ruleAnswer === choice.id} disabled={verified.rule} className={ruleAnswer === choice.id ? "selected" : ""} onClick={() => setRuleAnswer(choice.id)}>{choice.label}</button>)}
              </div>
            </div>
            <button className="pattern-trail-check" type="button" disabled={verified.rule || !ruleAnswer} onClick={checkRule}>Test with Stage 3</button>
            <StepFeedback feedback={feedback.rule} trailId={trail.id} />
          </section>
        )}

        {trail && step === 4 && (
          <section className="pattern-trail-task" aria-labelledby="pattern-forecast-task">
            <header><span>Clue 4</span><div><h4 id="pattern-forecast-task">Fast-forward to Stage 10.</h4><p>Drop 10 into your rule. Skip the grind of drawing Stages 5–9.</p></div></header>
            <div className="pattern-trail-forecast">
              <article><small>Your verified rule</small><strong>{correctRule(trail)}</strong><p>Replace “stage” with 10.</p></article>
              <span aria-hidden="true">→</span>
              <article className="pattern-trail-forecast__answer">
                <label htmlFor="pattern-forecast-answer">Stage 10 has</label>
                <input id="pattern-forecast-answer" type="number" inputMode="numeric" min="0" max="999" value={forecastAnswer} disabled={verified.forecast} onChange={(event) => setForecastAnswer(event.target.value)} />
                <b>{trail.itemPlural}</b>
              </article>
            </div>
            <button className="pattern-trail-check" type="button" disabled={verified.forecast || forecastAnswer === ""} onClick={checkForecast}>Check Stage 10</button>
            <StepFeedback feedback={feedback.forecast} trailId={trail.id} />
          </section>
        )}

        {trail && step === 5 && verifiedCount === 4 && (
          <section className="pattern-trail-evidence" aria-labelledby="pattern-evidence-title">
            <header><span aria-hidden="true">{trail.symbol}</span><div><small>All four clues verified</small><h4 id="pattern-evidence-title">You reached the {trail.destination}.</h4><p>Your model, table, rule, and prediction all agree.</p></div></header>
            <div className="pattern-trail-evidence__models">{[1, 2, 3, 4].map((stageNumber) => <PatternStage key={stageNumber} trail={trail} stage={stageNumber} compact />)}</div>
            <div className="pattern-trail-evidence__grid">
              <article><small>Table</small><strong>{[1, 2, 3, 4].map((stageNumber) => `${stageNumber} → ${valueAt(trail, stageNumber)}`).join(" · ")}</strong></article>
              <article><small>Rule</small><strong>{correctRule(trail)}</strong></article>
              <article><small>Forecast</small><strong>Stage 10 → {valueAt(trail, 10)}</strong></article>
            </div>
            <blockquote>“Each stage adds {trail.change}. The rule is {correctRule(trail)}. For Stage 10, {trail.change} × 10 + {trail.fixed} = {valueAt(trail, 10)}.”</blockquote>
            <footer><b>Run it on the projector</b><span>Invite someone to point to one model, its table value, and the matching part of the rule. Then have a partner explain why Stage 10 works.</span></footer>
          </section>
        )}

        {trail && step > 0 && step < 5 && (
          <footer className="pattern-trail-actions">
            <button type="button" onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1}>← Previous clue</button>
            <button type="button" className="pattern-trail-next" onClick={goNext} disabled={!canOpenStep(step + 1)}>Next clue →</button>
          </footer>
        )}

        {trail && (
          <div className="pattern-trail-reset">
            <span><b>{trail.name}</b> · Fictional pattern design, not nature data.</span>
            <div><button type="button" onClick={() => clearWork(trail.id)}>Reset this trail</button><button type="button" onClick={() => clearWork(null)}>Choose another trail</button></div>
          </div>
        )}

        {audience === "teacher" && (
          <aside className="pattern-trail-teacher-note">
            <b>Teacher move</b>
            <p>Pause before each check. Ask students to show the jump or substitute the stage number before the class chooses an answer. The four clues are verified mathematics—not a completion score.</p>
          </aside>
        )}
      </div>
    </section>
  );
}

export default PatternTrailLab;
