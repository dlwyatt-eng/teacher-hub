"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export const equationBalanceExperienceId = "equation-balance";

type Audience = "student" | "teacher";
type EquationKind = "add" | "subtract" | "multiply" | "divide";
type Feedback = { kind: "evidence" | "rethink"; title: string; message: string } | null;

export type EquationBalanceLabProps = {
  audience?: Audience;
};

type OperationChoice = {
  id: string;
  label: string;
  correct: boolean;
  feedback: string;
};

type EquationCase = {
  id: string;
  room: string;
  title: string;
  story: string;
  kind: EquationKind;
  amount: number;
  equation: string;
  rightValue: number;
  solution: number;
  operationProof: string;
  operations: OperationChoice[];
  checkChoices: number[];
};

const equationCases: EquationCase[] = [
  {
    id: "crate-plus-three",
    room: "ROOM A",
    title: "The extra three",
    story: "One sealed mystery crate and 3 loose weights balance 8 weights.",
    kind: "add",
    amount: 3,
    equation: "x + 3 = 8",
    rightValue: 8,
    solution: 5,
    operationProof: "x + 3 − 3 = 8 − 3  →  x = 5",
    operations: [
      { id: "remove-three", label: "Remove 3 from both sides", correct: true, feedback: "The 3 loose weights disappear from the left. Removing 3 from the right leaves 5, so the mystery crate is worth 5." },
      { id: "add-three", label: "Add 3 to both sides", correct: false, feedback: "Adding 3 to both sides keeps the equation equal, but the crate would now have 6 loose weights beside it. The unknown is not alone." },
      { id: "remove-one", label: "Remove 1 from both sides", correct: false, feedback: "Removing 1 from both sides keeps equality, but 2 loose weights still sit beside the crate. Look for the move that removes all 3." },
    ],
    checkChoices: [4, 5, 6],
  },
  {
    id: "crate-minus-four",
    room: "ROOM B",
    title: "The four taken away",
    story: "A mystery crate after 4 weights are taken away balances 7 weights.",
    kind: "subtract",
    amount: 4,
    equation: "x − 4 = 7",
    rightValue: 7,
    solution: 11,
    operationProof: "x − 4 + 4 = 7 + 4  →  x = 11",
    operations: [
      { id: "add-four", label: "Add 4 to both sides", correct: true, feedback: "Returning 4 weights rebuilds the full mystery crate amount. Adding 4 to the right makes 11, so x is 11." },
      { id: "remove-four", label: "Remove 4 from both sides", correct: false, feedback: "Removing 4 from both sides keeps equality, but it would leave x − 8 on the left. Use the operation that undoes taking 4 away." },
      { id: "add-seven", label: "Add 7 to both sides", correct: false, feedback: "Adding 7 to both sides keeps equality, but it does not undo exactly 4. The unknown would still not be alone." },
    ],
    checkChoices: [10, 11, 12],
  },
  {
    id: "two-crates",
    room: "ROOM C",
    title: "Two matching crates",
    story: "Two identical mystery crates balance 12 weights altogether.",
    kind: "multiply",
    amount: 2,
    equation: "2 × x = 12",
    rightValue: 12,
    solution: 6,
    operationProof: "(2 × x) ÷ 2 = 12 ÷ 2  →  x = 6",
    operations: [
      { id: "divide-two", label: "Split both sides into 2 equal groups", correct: true, feedback: "Each side splits into 2 equal groups. One crate matches 6 weights, so x is 6." },
      { id: "subtract-two", label: "Remove 2 from both sides", correct: false, feedback: "Removing 2 keeps equality, but it does not separate the two identical crates. Split the complete amount into 2 equal groups." },
      { id: "multiply-two", label: "Double both sides", correct: false, feedback: "Doubling both sides keeps equality, but it creates four crates and 24 weights. The move should isolate one crate." },
    ],
    checkChoices: [5, 6, 7],
  },
  {
    id: "one-third-crate",
    room: "ROOM D",
    title: "One of three equal groups",
    story: "One third of a mystery collection balances 4 weights.",
    kind: "divide",
    amount: 3,
    equation: "x ÷ 3 = 4",
    rightValue: 4,
    solution: 12,
    operationProof: "(x ÷ 3) × 3 = 4 × 3  →  x = 12",
    operations: [
      { id: "multiply-three", label: "Make 3 copies on both sides", correct: true, feedback: "Three copies rebuild the whole mystery collection. Three groups of 4 make 12, so x is 12." },
      { id: "divide-three", label: "Split both sides into 3 more groups", correct: false, feedback: "The left already shows one of 3 equal groups. Splitting again moves farther from the whole collection and does not isolate x." },
      { id: "add-three", label: "Add 3 to both sides", correct: false, feedback: "Adding 3 keeps equality, but x is still divided into 3 equal groups. Use the move that rebuilds all 3 groups." },
    ],
    checkChoices: [9, 12, 15],
  },
];

type MysteryFamilyId = "plus-three" | "minus-two" | "double" | "half";

type MysteryFamily = {
  id: MysteryFamilyId;
  label: string;
  description: string;
  solveMove: string;
  equationFor: (solution: number) => string;
  substitutionFor: (solution: number) => string;
};

const mysteryFamilies: MysteryFamily[] = [
  {
    id: "plus-three",
    label: "Add 3 beside the mystery",
    description: "The equation will look like x + 3 = __.",
    solveMove: "subtract-three",
    equationFor: (solution) => `x + 3 = ${solution + 3}`,
    substitutionFor: (solution) => `${solution} + 3 = ${solution + 3}`,
  },
  {
    id: "minus-two",
    label: "Take 2 from the mystery",
    description: "The equation will look like x − 2 = __.",
    solveMove: "add-two",
    equationFor: (solution) => `x − 2 = ${solution - 2}`,
    substitutionFor: (solution) => `${solution} − 2 = ${solution - 2}`,
  },
  {
    id: "double",
    label: "Use 2 matching mysteries",
    description: "The equation will look like 2 × x = __.",
    solveMove: "divide-two",
    equationFor: (solution) => `2 × x = ${2 * solution}`,
    substitutionFor: (solution) => `2 × ${solution} = ${2 * solution}`,
  },
  {
    id: "half",
    label: "Show half of the mystery",
    description: "The equation will look like x ÷ 2 = __.",
    solveMove: "multiply-two",
    equationFor: (solution) => `x ÷ 2 = ${solution / 2}`,
    substitutionFor: (solution) => `${solution} ÷ 2 = ${solution / 2}`,
  },
];

const mysteryMoves = [
  { id: "subtract-three", label: "Subtract 3 from both sides" },
  { id: "add-two", label: "Add 2 to both sides" },
  { id: "divide-two", label: "Divide both sides by 2" },
  { id: "multiply-two", label: "Multiply both sides by 2" },
] as const;

const secretChoices = [4, 6, 8, 12] as const;

const stepLabels = [
  { short: "Balance", title: "Make equality visible" },
  { short: "Case", title: "Open one equation" },
  { short: "Move", title: "Undo on both sides" },
  { short: "Check", title: "Substitute the value" },
  { short: "Mystery", title: "Build a solvable case" },
] as const;

function clampCount(value: number) {
  return Math.max(0, Math.min(10, value));
}

function leftValue(item: EquationCase, candidate: number) {
  if (item.kind === "add") return candidate + item.amount;
  if (item.kind === "subtract") return candidate - item.amount;
  if (item.kind === "multiply") return candidate * item.amount;
  return candidate / item.amount;
}

function substitutionText(item: EquationCase, candidate: number) {
  if (item.kind === "add") return `${candidate} + ${item.amount} = ${candidate + item.amount}`;
  if (item.kind === "subtract") return `${candidate} − ${item.amount} = ${candidate - item.amount}`;
  if (item.kind === "multiply") return `${item.amount} × ${candidate} = ${item.amount * candidate}`;
  return `${candidate} ÷ ${item.amount} = ${candidate / item.amount}`;
}

function CountWeights({ count, quiet = false }: { count: number; quiet?: boolean }) {
  return (
    <span className="equation-weight-set" aria-label={`${count} ${count === 1 ? "weight" : "weights"}`}>
      <span aria-hidden="true">
        {Array.from({ length: count }, (_, index) => <i key={index}></i>)}
      </span>
      {!quiet && <b>{count}</b>}
    </span>
  );
}

function MysteryCrate({ label = "x" }: { label?: string }) {
  return <span className="equation-mystery-crate" aria-label={`mystery crate ${label}`}><i aria-hidden="true">?</i><b>{label}</b></span>;
}

function CalibrationScale({ left, right }: { left: number; right: number }) {
  const state = left === right ? "equal" : left > right ? "left" : "right";
  return (
    <figure className="equation-scale equation-calibration-scale" data-balance={state} aria-label={`Balance scale: left has ${left} weights and right has ${right} weights. ${left === right ? "The sides are equal." : left > right ? `The left is heavier by ${left - right}.` : `The right is heavier by ${right - left}.`}`}>
      <div className="equation-scale__beam" aria-hidden="true"><i></i><b></b></div>
      <div className="equation-scale__pans">
        <article><small>LEFT SIDE</small><CountWeights count={left} /><strong>{left}</strong></article>
        <article><small>RIGHT SIDE</small><CountWeights count={right} /><strong>{right}</strong></article>
      </div>
      <figcaption>{left === right ? `${left} = ${right} · level` : left > right ? `${left} > ${right} · left is heavier` : `${left} < ${right} · right is heavier`}</figcaption>
    </figure>
  );
}

function EquationCaseModel({ item }: { item: EquationCase }) {
  return (
    <figure className="equation-case-model" aria-label={`${item.story} The equation is ${item.equation}.`}>
      <div className="equation-case-model__beam" aria-hidden="true"><i></i><b></b></div>
      <div className="equation-case-model__pans">
        <article>
          <small>LEFT EXPRESSION</small>
          <div className="equation-object-row">
            {item.kind === "add" && <><MysteryCrate /><span className="equation-sign">+</span><CountWeights count={item.amount} /></>}
            {item.kind === "subtract" && <><MysteryCrate /><span className="equation-removed"><b>− {item.amount}</b><i>{Array.from({ length: item.amount }, (_, index) => <em key={index}></em>)}</i></span></>}
            {item.kind === "multiply" && Array.from({ length: item.amount }, (_, index) => <MysteryCrate key={index} />)}
            {item.kind === "divide" && <span className="equation-split-crate"><b>x collection</b><i>{Array.from({ length: item.amount }, (_, index) => <em key={index}>{index === 0 ? "1 group" : ""}</em>)}</i></span>}
          </div>
          <strong>{item.kind === "divide" ? `x ÷ ${item.amount}` : item.kind === "multiply" ? `${item.amount} × x` : item.kind === "subtract" ? `x − ${item.amount}` : `x + ${item.amount}`}</strong>
        </article>
        <article>
          <small>RIGHT EXPRESSION</small>
          <CountWeights count={item.rightValue} />
          <strong>{item.rightValue}</strong>
        </article>
      </div>
      <figcaption><span>LEVEL</span><strong>{item.equation}</strong><b>Both expressions have the same value.</b></figcaption>
    </figure>
  );
}

function StepFeedback({ feedback }: { feedback: Feedback }) {
  if (!feedback) return null;
  return (
    <aside className="equation-step-feedback" data-kind={feedback.kind} role="status" aria-live="polite" aria-atomic="true">
      <strong>{feedback.title}</strong>
      <span>{feedback.message}</span>
    </aside>
  );
}

export function EquationBalanceLab({ audience = "student" }: EquationBalanceLabProps) {
  const titleId = useId();
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const [step, setStep] = useState(0);
  const [leftCount, setLeftCount] = useState(3);
  const [rightCount, setRightCount] = useState(5);
  const [balanceProof, setBalanceProof] = useState<{ before: number; after: number; change: number } | null>(null);
  const [balanceFeedback, setBalanceFeedback] = useState<Feedback>(null);
  const [caseId, setCaseId] = useState<string | null>(null);
  const [operationId, setOperationId] = useState<string | null>(null);
  const [operationFeedback, setOperationFeedback] = useState<Feedback>(null);
  const [checkValue, setCheckValue] = useState<number | null>(null);
  const [checkFeedback, setCheckFeedback] = useState<Feedback>(null);
  const [mysterySecret, setMysterySecret] = useState<number | null>(null);
  const [mysteryFamilyId, setMysteryFamilyId] = useState<MysteryFamilyId | null>(null);
  const [mysteryMoveId, setMysteryMoveId] = useState<string | null>(null);
  const [mysteryFeedback, setMysteryFeedback] = useState<Feedback>(null);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  const selectedCase = equationCases.find((item) => item.id === caseId) ?? null;
  const selectedOperation = selectedCase?.operations.find((item) => item.id === operationId) ?? null;
  const operationVerified = Boolean(selectedOperation?.correct);
  const checkVerified = Boolean(selectedCase && checkValue === selectedCase.solution);
  const mysteryFamily = mysteryFamilies.find((item) => item.id === mysteryFamilyId) ?? null;
  const mysteryReady = Boolean(mysterySecret !== null && mysteryFamily && mysteryMoveId === mysteryFamily.solveMove);

  const completed = [Boolean(balanceProof), Boolean(selectedCase), operationVerified, checkVerified, mysteryReady];
  const completedCount = completed.filter(Boolean).length;
  const maxUnlocked = !balanceProof ? 0 : !selectedCase ? 1 : !operationVerified ? 2 : !checkVerified ? 3 : 4;

  const calibrationMessage = useMemo(() => {
    if (leftCount === rightCount) return `The beam is level because ${leftCount} equals ${rightCount}.`;
    if (leftCount > rightCount) return `The left is heavier by ${leftCount - rightCount}. Change one side until the counts match.`;
    return `The right is heavier by ${rightCount - leftCount}. Change one side until the counts match.`;
  }, [leftCount, rightCount]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [step]);

  const adjustSide = (side: "left" | "right", change: number) => {
    const current = side === "left" ? leftCount : rightCount;
    const next = clampCount(current + change);
    if (next === current) {
      setBalanceFeedback({ kind: "rethink", title: "That pan is at its limit", message: change > 0 ? "Use 10 or fewer weights on a pan." : "A pan cannot hold fewer than 0 weights." });
      return;
    }
    if (side === "left") setLeftCount(next);
    else setRightCount(next);
    setBalanceProof(null);
    setBalanceFeedback(null);
  };

  const adjustBoth = (change: number) => {
    const nextLeft = leftCount + change;
    const nextRight = rightCount + change;
    if (nextLeft < 0 || nextRight < 0 || nextLeft > 10 || nextRight > 10) {
      setBalanceFeedback({ kind: "rethink", title: "That matching move does not fit", message: "Keep each pan between 0 and 10 weights, then try a smaller matching move." });
      return;
    }
    const wasEqual = leftCount === rightCount;
    const before = leftCount;
    setLeftCount(nextLeft);
    setRightCount(nextRight);
    if (wasEqual) {
      setBalanceProof({ before, after: nextLeft, change });
      setBalanceFeedback({ kind: "evidence", title: "Equality stayed true", message: `${before} = ${before}. After ${change > 0 ? `adding ${change}` : `removing ${Math.abs(change)}`} on both sides, ${nextLeft} = ${nextRight}.` });
    } else {
      setBalanceProof(null);
      setBalanceFeedback({ kind: "rethink", title: "The difference stayed the same", message: `Both sides changed by ${Math.abs(change)}, but they did not start equal. Make the beam level first.` });
    }
  };

  const chooseCase = (id: string) => {
    const item = equationCases.find((candidate) => candidate.id === id);
    setCaseId(id);
    setOperationId(null);
    setOperationFeedback(null);
    setCheckValue(null);
    setCheckFeedback(null);
    if (item) {
      setOperationFeedback({ kind: "evidence", title: `${item.room} opened`, message: `${item.equation}. The equals sign says the two complete expressions have the same value.` });
    }
  };

  const chooseOperation = (id: string) => {
    if (!selectedCase) return;
    const choice = selectedCase.operations.find((item) => item.id === id);
    if (!choice) return;
    setOperationId(id);
    setOperationFeedback({
      kind: choice.correct ? "evidence" : "rethink",
      title: choice.correct ? "The unknown is isolated" : "Equality is not enough yet",
      message: choice.feedback,
    });
    setCheckValue(null);
    setCheckFeedback(null);
  };

  const chooseCheckValue = (candidate: number) => {
    if (!selectedCase) return;
    const result = leftValue(selectedCase, candidate);
    const difference = Math.abs(result - selectedCase.rightValue);
    const works = result === selectedCase.rightValue;
    setCheckValue(candidate);
    setCheckFeedback({
      kind: works ? "evidence" : "rethink",
      title: works ? "Both sides match" : "The substitution does not balance",
      message: works
        ? `${substitutionText(selectedCase, candidate)}. The left and right are both ${selectedCase.rightValue}, so ${candidate} is a solution.`
        : `${substitutionText(selectedCase, candidate)}, but the right side is ${selectedCase.rightValue}. The left is ${difference} ${result < selectedCase.rightValue ? "too small" : "too large"}.`,
    });
  };

  const chooseMysterySecret = (value: number) => {
    setMysterySecret(value);
    setMysteryMoveId(null);
    setMysteryFeedback(null);
    setSolutionRevealed(false);
  };

  const chooseMysteryFamily = (id: MysteryFamilyId) => {
    setMysteryFamilyId(id);
    setMysteryMoveId(null);
    setMysteryFeedback(null);
    setSolutionRevealed(false);
  };

  const chooseMysteryMove = (id: string) => {
    if (!mysteryFamily || mysterySecret === null) return;
    const correct = id === mysteryFamily.solveMove;
    const chosen = mysteryMoves.find((move) => move.id === id)?.label ?? "That move";
    const supported = mysteryMoves.find((move) => move.id === mysteryFamily.solveMove)?.label ?? "the inverse move";
    setMysteryMoveId(id);
    setSolutionRevealed(false);
    setMysteryFeedback({
      kind: correct ? "evidence" : "rethink",
      title: correct ? "The mystery has a complete evidence trail" : "That move does not undo the mystery",
      message: correct
        ? `${supported} isolates x. Substitution gives ${mysteryFamily.substitutionFor(mysterySecret)}, so both sides match.`
        : `${chosen} can be applied to both sides, but it does not undo this equation structure. Look at the operation beside x.`,
    });
  };

  const resetLab = () => {
    setStep(0);
    setLeftCount(3);
    setRightCount(5);
    setBalanceProof(null);
    setBalanceFeedback(null);
    setCaseId(null);
    setOperationId(null);
    setOperationFeedback(null);
    setCheckValue(null);
    setCheckFeedback(null);
    setMysterySecret(null);
    setMysteryFamilyId(null);
    setMysteryMoveId(null);
    setMysteryFeedback(null);
    setSolutionRevealed(false);
  };

  const mysteryEquation = mysterySecret !== null && mysteryFamily ? mysteryFamily.equationFor(mysterySecret) : null;

  return (
    <section className="equation-balance-lab" data-audience={audience} data-experience-id={equationBalanceExperienceId} aria-labelledby={titleId}>
      <header className="equation-lab-hero">
        <div>
          <small>PATTERNS & EQUATIONS · THE BALANCE ROOM</small>
          <h2 id={titleId}>Keep both sides true.</h2>
          <p>Make equality visible. Then use the same operation on both sides and prove the solution in the original equation.</p>
        </div>
        <figure className="equation-lab-hero__art">
          <Image unoptimized src="/images/unit-worlds/equation-clearing-v1.webp" width={1664} height={936} alt="Illustrated forest clearing with a level wooden balance scale, two empty pans, mossy stones, ferns, and warm light between the trees" />
          <figcaption>THE EQUATION CLEARING · The level scale introduces the idea. The exact models below provide the mathematical evidence.</figcaption>
        </figure>
      </header>

      {audience === "teacher" && (
        <aside className="equation-teacher-note">
          <strong>TEACHER HANDOFF</strong>
          <p>Ask students to explain why a move keeps equality before naming an inverse-operation rule. Assess the model, matching operation, and substitution evidence—not speed.</p>
        </aside>
      )}

      <section className="equation-progress" aria-label={`${completedCount} of 5 evidence checks complete`}>
        <div><span>EVIDENCE PATH</span><strong>{completedCount} of 5 checks complete</strong></div>
        <div className="equation-progress__track" aria-hidden="true"><i style={{ width: `${(completedCount / 5) * 100}%` }}></i></div>
        <nav aria-label="Equation balance lab steps">
          {stepLabels.map((item, index) => (
            <button
              type="button"
              key={item.short}
              disabled={index > maxUnlocked}
              aria-current={step === index ? "step" : undefined}
              aria-label={`Step ${index + 1}: ${item.title}${completed[index] ? ", evidence complete" : index > maxUnlocked ? ", locked" : ""}`}
              onClick={() => setStep(index)}
            >
              <b>{completed[index] ? "✓" : index + 1}</b>
              <span><small>{item.short}</small><strong>{item.title}</strong></span>
            </button>
          ))}
        </nav>
      </section>

      <section className="equation-lab-workspace" aria-label="Equation balance workspace">
        <h3 ref={stepHeadingRef} tabIndex={-1}>{stepLabels[step].title}</h3>

        {step === 0 && (
          <section className="equation-lab-step">
            <header><span>1</span><div><small>ONE ACTION</small><h4>Make both pans show the same number.</h4><p>Use the four pan buttons. Watch the beam and the number sentence.</p></div></header>
            <CalibrationScale left={leftCount} right={rightCount} />
            <div className="equation-pan-controls">
              <section aria-label="Change the left pan">
                <strong>CHANGE LEFT</strong>
                <div><button type="button" onClick={() => adjustSide("left", -1)}>− Remove 1</button><button type="button" onClick={() => adjustSide("left", 1)}>+ Add 1</button></div>
              </section>
              <output aria-live="polite">{calibrationMessage}</output>
              <section aria-label="Change the right pan">
                <strong>CHANGE RIGHT</strong>
                <div><button type="button" onClick={() => adjustSide("right", -1)}>− Remove 1</button><button type="button" onClick={() => adjustSide("right", 1)}>+ Add 1</button></div>
              </section>
            </div>

            <section className="equation-both-sides-panel" data-ready={leftCount === rightCount ? "true" : "false"}>
              <header><small>NEXT ACTION</small><h4>Change both sides together.</h4><p>{leftCount === rightCount ? "The beam is level. Choose one matching move and see if equality stays true." : "Level the beam first. Then this panel will test a matching move."}</p></header>
              <div>
                <button type="button" disabled={leftCount !== rightCount} onClick={() => adjustBoth(-1)}>− 1 from both sides</button>
                <button type="button" disabled={leftCount !== rightCount} onClick={() => adjustBoth(1)}>+ 1 to both sides</button>
              </div>
              {balanceProof && <p className="equation-balance-proof"><strong>VISIBLE PROOF</strong><span>{balanceProof.before} = {balanceProof.before} → {balanceProof.after} = {balanceProof.after}</span></p>}
            </section>
            <StepFeedback feedback={balanceFeedback} />
          </section>
        )}

        {step === 1 && (
          <section className="equation-lab-step">
            <header><span>2</span><div><small>ONE ACTION</small><h4>Choose one mystery room.</h4><p>Every room uses positive whole numbers. Open one case and read its complete equation.</p></div></header>
            <div className="equation-case-picker">
              {equationCases.map((item) => (
                <button type="button" key={item.id} aria-pressed={caseId === item.id} onClick={() => chooseCase(item.id)}>
                  <small>{caseId === item.id ? "✓ CASE OPEN" : item.room}</small>
                  <strong>{item.title}</strong>
                  <span>{item.story}</span>
                  <b>{item.equation}</b>
                </button>
              ))}
            </div>
            {selectedCase && <EquationCaseModel item={selectedCase} />}
            <StepFeedback feedback={selectedCase ? operationFeedback : null} />
          </section>
        )}

        {step === 2 && selectedCase && (
          <section className="equation-lab-step">
            <header><span>3</span><div><small>ONE ACTION</small><h4>Choose one matching operation.</h4><p>Apply the operation to both complete sides. The useful move leaves the unknown alone.</p></div></header>
            <EquationCaseModel item={selectedCase} />
            <fieldset className="equation-operation-choices">
              <legend>Which move isolates x?</legend>
              <div>
                {selectedCase.operations.map((choice) => (
                  <button type="button" key={choice.id} aria-pressed={operationId === choice.id} onClick={() => chooseOperation(choice.id)}>
                    <b aria-hidden="true">{operationId === choice.id ? "✓" : "↔"}</b>
                    <span>{choice.label}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <StepFeedback feedback={operationFeedback} />
            {operationVerified && (
              <section className="equation-operation-proof" aria-live="polite">
                <small>SAME OPERATION · BOTH SIDES</small>
                <strong>{selectedCase.operationProof}</strong>
                <div><MysteryCrate /><span>=</span><CountWeights count={selectedCase.solution} /></div>
              </section>
            )}
          </section>
        )}

        {step === 3 && selectedCase && (
          <section className="equation-lab-step">
            <header><span>4</span><div><small>ONE ACTION</small><h4>Substitute one value for x.</h4><p>Put the value into the original equation. A solution must make the left and right match.</p></div></header>
            <article className="equation-original-card">
              <small>ORIGINAL EQUATION</small>
              <strong>{selectedCase.equation}</strong>
              <span>Do not check only the final line. Return to where the case began.</span>
            </article>
            <fieldset className="equation-check-choices">
              <legend>Which value makes the equation true?</legend>
              <div>
                {selectedCase.checkChoices.map((candidate) => (
                  <button type="button" key={candidate} aria-pressed={checkValue === candidate} onClick={() => chooseCheckValue(candidate)}>
                    <small>TRY</small><strong>x = {candidate}</strong>
                  </button>
                ))}
              </div>
            </fieldset>
            {checkValue !== null && (
              <section className="equation-substitution-readout" data-balanced={checkVerified ? "true" : "false"} aria-live="polite">
                <div><small>LEFT AFTER SUBSTITUTION</small><strong>{substitutionText(selectedCase, checkValue)}</strong></div>
                <b>{checkVerified ? "=" : "≠"}</b>
                <div><small>RIGHT SIDE</small><strong>{selectedCase.rightValue}</strong></div>
              </section>
            )}
            <StepFeedback feedback={checkFeedback} />
          </section>
        )}

        {step === 4 && (
          <section className="equation-lab-step">
            <header><span>5</span><div><small>BUILD A PARTNER CASE</small><h4>Choose the hidden value.</h4><p>The lab will keep every choice in Grade 6 whole numbers.</p></div></header>

            <fieldset className="equation-mystery-secrets">
              <legend>Pick one solution</legend>
              <div>{secretChoices.map((value) => <button type="button" key={value} aria-pressed={mysterySecret === value} onClick={() => chooseMysterySecret(value)}>x = {value}</button>)}</div>
            </fieldset>

            <fieldset className="equation-mystery-families">
              <legend>Choose one equation structure</legend>
              <div>
                {mysteryFamilies.map((family) => (
                  <button type="button" key={family.id} aria-pressed={mysteryFamilyId === family.id} onClick={() => chooseMysteryFamily(family.id)}>
                    <small>{mysteryFamilyId === family.id ? "✓ STRUCTURE CHOSEN" : "STRUCTURE"}</small>
                    <strong>{family.label}</strong>
                    <span>{family.description}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {mysteryEquation && (
              <article className="equation-mystery-draft" aria-live="polite">
                <small>YOUR PARTNER WILL SEE</small>
                <strong>{mysteryEquation}</strong>
                <span>The solution stays hidden until you finish the evidence trail.</span>
              </article>
            )}

            <fieldset className="equation-mystery-moves" disabled={!mysteryEquation}>
              <legend>Choose the move that solves your mystery</legend>
              <div>
                {mysteryMoves.map((move) => <button type="button" key={move.id} aria-pressed={mysteryMoveId === move.id} onClick={() => chooseMysteryMove(move.id)}>{move.label}</button>)}
              </div>
            </fieldset>
            <StepFeedback feedback={mysteryFeedback} />

            {mysteryReady && mysterySecret !== null && mysteryFamily && (
              <article className="equation-mystery-card">
                <header><div><small>PARTNER MYSTERY · READY TO TEST</small><h4>{mysteryEquation}</h4></div><span>NO TIMER</span></header>
                <section>
                  <div><small>SOLVE IT</small><strong>Use the same operation on both sides. Then substitute to check.</strong></div>
                  <button type="button" aria-expanded={solutionRevealed} onClick={() => setSolutionRevealed((current) => !current)}>{solutionRevealed ? "Hide the evidence key" : "Reveal the evidence key"}</button>
                </section>
                {solutionRevealed && (
                  <footer aria-live="polite">
                    <article><small>SOLUTION</small><strong>x = {mysterySecret}</strong></article>
                    <article><small>MATCHING MOVE</small><strong>{mysteryMoves.find((move) => move.id === mysteryFamily.solveMove)?.label}</strong></article>
                    <article><small>SUBSTITUTION</small><strong>{mysteryFamily.substitutionFor(mysterySecret)}</strong></article>
                  </footer>
                )}
              </article>
            )}
          </section>
        )}

        <div className="equation-step-actions">
          <button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>← Previous step</button>
          {step < 4 && <button type="button" className="equation-next-button" disabled={!completed[step]} onClick={() => setStep((current) => Math.min(4, current + 1))}>{completed[step] ? "Next step →" : "Finish this evidence check"}</button>}
        </div>
      </section>

      <footer className="equation-lab-footer">
        <div><strong>THE EQUALS SIGN IS A RELATIONSHIP</strong><span>A matching move keeps equality true. A useful inverse move also isolates the unknown.</span></div>
        <button type="button" onClick={resetLab}>Reset the whole lab</button>
      </footer>
    </section>
  );
}

export default EquationBalanceLab;
