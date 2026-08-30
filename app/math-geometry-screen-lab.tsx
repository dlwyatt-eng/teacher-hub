"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export const geometryFieldLabExperienceId = "geometry-field-lab";

type Audience = "student" | "teacher";
type SceneId = "skatepark" | "gaming-stand" | "solar-shelter";
type EstimateId = "near-45" | "near-90" | "near-180";
type AlignmentId = "centered" | "shifted" | "tilted";
type AngleClass = "acute" | "right" | "obtuse";
type TriangleId = "right-isosceles" | "right-scalene" | "acute-isosceles" | "obtuse-isosceles";
type EvidenceKey = "estimate" | "align" | "measure" | "classify" | "triangle";
type Feedback = { kind: "verified" | "retry"; title: string; message: string } | null;

export type GeometryScreenLabProps = {
  audience?: Audience;
};

type Scene = {
  id: SceneId;
  eyebrow: string;
  name: string;
  prompt: string;
  angle: number;
  estimate: EstimateId;
  classification: AngleClass;
  colour: string;
  accent: string;
  measureChoices: number[];
};

const scenes: Scene[] = [
  {
    id: "skatepark",
    eyebrow: "SKATEPARK BUILD",
    name: "Launch ramp",
    prompt: "Find the opening where the ramp meets the ground.",
    angle: 45,
    estimate: "near-45",
    classification: "acute",
    colour: "#3947a8",
    accent: "#f2dd55",
    measureChoices: [35, 45, 55],
  },
  {
    id: "gaming-stand",
    eyebrow: "GAMING SETUP",
    name: "Gaming setup stand",
    prompt: "Find the square corner where the platform meets its upright support.",
    angle: 90,
    estimate: "near-90",
    classification: "right",
    colour: "#642a86",
    accent: "#66f1d1",
    measureChoices: [80, 90, 100],
  },
  {
    id: "solar-shelter",
    eyebrow: "CLIMATE-SMART DESIGN",
    name: "Solar shade roof",
    prompt: "Find the wide opening where the diagonal roof brace meets the horizontal beam.",
    angle: 150,
    estimate: "near-180",
    classification: "obtuse",
    colour: "#126f65",
    accent: "#ffca61",
    measureChoices: [140, 150, 160],
  },
];

const estimateChoices: Array<{ id: EstimateId; label: string; hint: string }> = [
  { id: "near-45", label: "Near 45°", hint: "About half a square corner" },
  { id: "near-90", label: "Near 90°", hint: "About a square corner" },
  { id: "near-180", label: "Near 180°", hint: "About a straight line" },
];

const classChoices: Array<{ id: AngleClass; label: string; meaning: string }> = [
  { id: "acute", label: "Acute", meaning: "less than 90°" },
  { id: "right", label: "Right", meaning: "exactly 90°" },
  { id: "obtuse", label: "Obtuse", meaning: "more than 90° but less than 180°" },
];

const triangles: Array<{
  id: TriangleId;
  name: string;
  angles: [number, number, number];
  equalSides: boolean;
  points: string;
  labelPoints: [[number, number], [number, number], [number, number]];
}> = [
  { id: "right-isosceles", name: "Support A", angles: [90, 45, 45], equalSides: true, points: "35,160 35,35 160,160", labelPoints: [[43, 148], [45, 54], [137, 151]] },
  { id: "right-scalene", name: "Support B", angles: [90, 60, 30], equalSides: false, points: "35,160 35,70 190.884,160", labelPoints: [[43, 148], [47, 88], [163, 151]] },
  { id: "acute-isosceles", name: "Support C", angles: [55, 70, 55], equalSides: true, points: "25,160 110,38.6 195,160", labelPoints: [[41, 151], [100, 62], [164, 151]] },
  { id: "obtuse-isosceles", name: "Support D", angles: [25, 130, 25], equalSides: true, points: "25,150 110,110.37 195,150", labelPoints: [[42, 145], [100, 105], [163, 145]] },
];

const evidenceLabels: Record<EvidenceKey, string> = {
  estimate: "Estimate explained",
  align: "Tool lined up",
  measure: "Angle measured",
  classify: "Angle named",
  triangle: "Support chosen",
};

const stepLabels = ["Learn", "Choose", "Guess", "Line up", "Measure", "Name it", "Build", "Explain"] as const;

function pointAt(cx: number, cy: number, radius: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy - radius * Math.sin(radians) };
}

function arcPath(cx: number, cy: number, radius: number, degrees: number) {
  const start = pointAt(cx, cy, radius, 0);
  const end = pointAt(cx, cy, radius, degrees);
  const largeArc = degrees > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function AngleGlyph({ angle, label, compact = false }: { angle: number; label?: string; compact?: boolean }) {
  const end = pointAt(100, 105, compact ? 62 : 75, angle);
  const arcRadius = compact ? 27 : 34;
  return (
    <svg className="geometry-angle-glyph" viewBox="0 0 200 150" role="img" aria-label={`${angle} degree angle${label ? `: ${label}` : ""}`}>
      <title>{angle}° angle</title>
      <line className="geometry-angle-glyph__ray" x1="100" y1="105" x2="180" y2="105" />
      <line className="geometry-angle-glyph__ray" x1="100" y1="105" x2={end.x} y2={end.y} />
      <path className="geometry-angle-glyph__arc" d={arcPath(100, 105, arcRadius, angle)} />
      <circle className="geometry-angle-glyph__vertex" cx="100" cy="105" r="6" />
      {label && <text x="100" y="140" textAnchor="middle">{label}</text>}
    </svg>
  );
}

function SceneArtwork({ scene, found = false }: { scene: Scene; found?: boolean }) {
  const vertex = scene.id === "skatepark" ? { x: 175, y: 190 } : { x: 175, y: 178 };
  const rayEnd = pointAt(vertex.x, vertex.y, 105, scene.angle);
  const titleId = `geometry-scene-${scene.id}-title`;
  const descriptionId = `geometry-scene-${scene.id}-description`;
  return (
    <svg className="geometry-scene-art" data-found={found} viewBox="0 0 360 230" role="img" aria-labelledby={`${titleId} ${descriptionId}`}>
      <title id={titleId}>{scene.name}</title>
      <desc id={descriptionId}>{scene.prompt} {found ? `The angle has been confirmed as ${scene.angle} degrees.` : "The highlighted opening is ready to estimate."}</desc>
      <defs>
        <linearGradient id={`sky-${scene.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={scene.colour} />
          <stop offset="1" stopColor="#15223d" />
        </linearGradient>
        <filter id={`glow-${scene.id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="360" height="230" rx="18" fill={`url(#sky-${scene.id})`} />
      <circle cx="303" cy="42" r="18" fill={scene.accent} opacity=".9" />

      {scene.id === "skatepark" && (
        <g aria-hidden="true">
          <path d="M0 190H360V230H0Z" fill="#182035" />
          <path d="M24 190H175L100.75 115.75H46Z" fill="#8290c6" stroke="#d9e0ff" strokeWidth="4" />
          <path d="M225 190h110v-30h-69l-41 30Z" fill="#8493c7" />
          <circle cx="70" cy="73" r="14" fill={scene.accent} opacity=".18" />
          <path d="M62 73h16M70 65v16" stroke={scene.accent} strokeWidth="3" />
        </g>
      )}

      {scene.id === "gaming-stand" && (
        <g aria-hidden="true">
          <rect x="62" y="43" width="188" height="103" rx="10" fill="#111a35" stroke="#a975c7" strokeWidth="5" />
          <rect x="78" y="58" width="156" height="70" rx="5" fill="#242e57" />
          <path d="M112 91h28M126 77v28M181 83l12 12M193 83l-12 12" stroke={scene.accent} strokeWidth="6" strokeLinecap="round" />
          <path d="M175 146v32h97" fill="none" stroke="#bfc9eb" strokeWidth="10" strokeLinecap="round" />
          <rect x="63" y="185" width="244" height="12" rx="6" fill="#171c34" />
        </g>
      )}

      {scene.id === "solar-shelter" && (
        <g aria-hidden="true">
          <path d="M0 185c48-28 93-19 139 0s98 20 152-4 69-6 69-6v55H0Z" fill="#244f43" />
          <path d="M84 185V126M300 185V178" stroke="#d9e7d4" strokeWidth="9" />
          <path d="M84 126L175 178H300" fill="none" stroke="#f6e4b1" strokeWidth="12" strokeLinejoin="round" />
          <path d="M67 111l108 55h126l-14-42H166Z" fill="#204d66" stroke="#86d7c6" strokeWidth="4" />
          <path d="M116 123l91 43M161 119l90 47M105 130l58-11M159 153l111-21" stroke="#9ee4d4" strokeWidth="2" opacity=".7" />
        </g>
      )}

      <g className="geometry-scene-art__scan" filter={`url(#glow-${scene.id})`}>
        <line x1={vertex.x} y1={vertex.y} x2="290" y2={vertex.y} />
        <line x1={vertex.x} y1={vertex.y} x2={rayEnd.x} y2={rayEnd.y} />
        <path d={arcPath(vertex.x, vertex.y, 34, scene.angle)} />
        <circle cx={vertex.x} cy={vertex.y} r="6" />
      </g>
      <g className="geometry-scene-art__hud" aria-hidden="true">
        <path d="M16 37V17h20M324 17h20v20M16 193v20h20M324 213h20v-20" />
        <text x="18" y="205">FIND THE ANGLE</text>
      </g>
      {found && <g className="geometry-scene-art__verified"><rect x="241" y="16" width="101" height="32" rx="16" /><text x="291.5" y="38" textAnchor="middle">VERIFIED ✓</text></g>}
    </svg>
  );
}

function AlignmentDiagram({ kind }: { kind: AlignmentId }) {
  const transform = kind === "shifted" ? "translate(-22 0)" : kind === "tilted" ? "rotate(-13 100 100)" : undefined;
  return (
    <svg className="geometry-alignment-diagram" viewBox="0 0 200 135" aria-hidden="true">
      <path d="M18 104A82 82 0 0 1 182 104H18Z" fill="#eef4fa" stroke="#56728c" strokeWidth="3" transform={transform} />
      <line x1="100" y1="104" x2="180" y2="104" stroke="#56728c" strokeWidth="3" transform={transform} />
      <circle cx="100" cy="104" r="5" fill="#fff" stroke="#56728c" strokeWidth="3" transform={transform} />
      <line x1="100" y1="104" x2="181" y2="104" stroke="#e24649" strokeWidth="5" strokeLinecap="round" />
      <line x1="100" y1="104" x2="148" y2="46" stroke="#e24649" strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="104" r="6" fill="#1c3650" />
      <path d="M93 104h14M100 97v14" stroke="#f3bc45" strokeWidth="2" />
    </svg>
  );
}

function Protractor({ angle }: { angle: number }) {
  const cx = 200;
  const cy = 190;
  const outerRadius = 166;
  const angleEnd = pointAt(cx, cy, 145, angle);
  const ticks = Array.from({ length: 37 }, (_, index) => index * 5);
  const labels = [0, 30, 60, 90, 120, 150, 180];
  return (
    <svg className="geometry-protractor" viewBox="0 0 400 230" role="img" aria-label={`A correctly aligned protractor showing an angle of ${angle} degrees`}>
      <title>Protractor measuring {angle}°</title>
      <path d="M34 190A166 166 0 0 1 366 190H34Z" fill="#edf6fa" stroke="#3b6276" strokeWidth="3" />
      <path d="M68 190A132 132 0 0 1 332 190" fill="none" stroke="#9ab9c6" strokeWidth="2" />
      {ticks.map((degrees) => {
        const outside = pointAt(cx, cy, outerRadius, degrees);
        const inside = pointAt(cx, cy, degrees % 10 === 0 ? 147 : 155, degrees);
        return <line key={degrees} x1={outside.x} y1={outside.y} x2={inside.x} y2={inside.y} stroke="#315064" strokeWidth={degrees % 10 === 0 ? 2.2 : 1} />;
      })}
      {labels.map((degrees) => {
        const point = pointAt(cx, cy, 128, degrees);
        return <text key={degrees} x={point.x} y={point.y + 5} textAnchor="middle">{degrees}</text>;
      })}
      <line x1={cx} y1={cy} x2="366" y2={cy} className="geometry-protractor__angle" />
      <line x1={cx} y1={cy} x2={angleEnd.x} y2={angleEnd.y} className="geometry-protractor__angle" />
      <path d={arcPath(cx, cy, 55, angle)} className="geometry-protractor__arc" />
      <circle cx={cx} cy={cy} r="7" className="geometry-protractor__center" />
      <path d="M187 190h26M200 177v26" className="geometry-protractor__crosshair" />
      <text x="200" y="222" textAnchor="middle">centre on vertex · zero line on starting ray</text>
    </svg>
  );
}

function TriangleDiagram({ triangle }: { triangle: (typeof triangles)[number] }) {
  return (
    <svg className="geometry-triangle-diagram" viewBox="0 0 220 190" role="img" aria-label={`${triangle.name}: angles ${triangle.angles[0]}, ${triangle.angles[1]}, and ${triangle.angles[2]} degrees. ${triangle.equalSides ? "Two sides are equal." : "All sides have different lengths."}`}>
      <title>{triangle.name}</title>
      <polygon points={triangle.points} />
      {triangle.angles.map((angle, index) => <text key={`${angle}-${index}`} x={triangle.labelPoints[index][0]} y={triangle.labelPoints[index][1]}>{angle}°</text>)}
      {triangle.id.startsWith("right") && <path className="geometry-triangle-diagram__right" d="M36 143h17v17" />}
      {triangle.equalSides && (
        <g className="geometry-triangle-diagram__ticks" aria-hidden="true">
          {triangle.id === "right-isosceles" ? <path d="M28 96h14M98 153v14" /> : <><path d="M69 101l10 8" /><path d="M147 109l10-8" /></>}
        </g>
      )}
    </svg>
  );
}

function StepFeedback({ feedback }: { feedback: Feedback }) {
  if (!feedback) return null;
  return (
    <aside className="geometry-feedback" data-kind={feedback.kind} role="status" aria-live="polite" aria-atomic="true">
      <strong>{feedback.title}</strong>
      <span>{feedback.message}</span>
    </aside>
  );
}

export function GeometryScreenLab({ audience = "student" }: GeometryScreenLabProps) {
  const titleId = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const [step, setStep] = useState(0);
  const [sceneId, setSceneId] = useState<SceneId | null>(null);
  const [estimateId, setEstimateId] = useState<EstimateId | null>(null);
  const [alignmentId, setAlignmentId] = useState<AlignmentId | null>(null);
  const [measurement, setMeasurement] = useState<number | null>(null);
  const [classification, setClassification] = useState<AngleClass | null>(null);
  const [triangleId, setTriangleId] = useState<TriangleId | null>(null);
  const [feedback, setFeedback] = useState<Record<EvidenceKey, Feedback>>({ estimate: null, align: null, measure: null, classify: null, triangle: null });
  const [verified, setVerified] = useState<Record<EvidenceKey, boolean>>({ estimate: false, align: false, measure: false, classify: false, triangle: false });

  const scene = scenes.find((item) => item.id === sceneId) ?? null;
  const triangle = triangles.find((item) => item.id === triangleId) ?? null;
  const verifiedCount = Object.values(verified).filter(Boolean).length;

  const stepTitle = useMemo(() => {
    if (step === 0) return "First: what is an angle?";
    if (step === 1) return "Choose one build to explore.";
    if (step === 2) return "Make a smart first estimate.";
    if (step === 3) return "Line up the protractor.";
    if (step === 4) return "Read the measurement.";
    if (step === 5) return "Name the angle type.";
    if (step === 6) return "Choose a triangle that fits the build challenge.";
    return "Your results: ready to explain.";
  }, [step]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const clearAfterScene = (nextSceneId: SceneId) => {
    setSceneId(nextSceneId);
    setEstimateId(null);
    setAlignmentId(null);
    setMeasurement(null);
    setClassification(null);
    setTriangleId(null);
    setVerified({ estimate: false, align: false, measure: false, classify: false, triangle: false });
    setFeedback({ estimate: null, align: null, measure: null, classify: null, triangle: null });
    setStep(2);
  };

  const reset = () => {
    setStep(0);
    setSceneId(null);
    setEstimateId(null);
    setAlignmentId(null);
    setMeasurement(null);
    setClassification(null);
    setTriangleId(null);
    setVerified({ estimate: false, align: false, measure: false, classify: false, triangle: false });
    setFeedback({ estimate: null, align: null, measure: null, classify: null, triangle: null });
  };

  const printCompanion = () => {
    const documentRoot = document.documentElement;
    const cleanup = () => documentRoot.classList.remove("printing-angle-expedition");
    documentRoot.classList.add("printing-angle-expedition");
    window.addEventListener("afterprint", cleanup, { once: true });
    window.print();
  };

  const checkEstimate = () => {
    if (!scene || !estimateId) return;
    if (estimateId === scene.estimate) {
      setVerified((current) => ({ ...current, estimate: true }));
      setFeedback((current) => ({ ...current, estimate: { kind: "verified", title: "Your estimate fits", message: `${scene.angle}° is closest to the ${scene.estimate === "near-45" ? "45° half-corner" : scene.estimate === "near-90" ? "90° square corner" : "180° straight line"} reference angle.` } }));
      return;
    }
    setFeedback((current) => ({ ...current, estimate: { kind: "retry", title: "Try a different reference angle", message: "Picture a square corner and a straight line over the opening. Which one is this angle closest to?" } }));
  };

  const checkAlignment = () => {
    if (!alignmentId) return;
    if (alignmentId === "centered") {
      setVerified((current) => ({ ...current, align: true }));
      setFeedback((current) => ({ ...current, align: { kind: "verified", title: "Ready to measure", message: "The centre mark sits on the vertex, and the zero line lies on the starting ray." } }));
      return;
    }
    setFeedback((current) => ({ ...current, align: { kind: "retry", title: "The reading would be off", message: alignmentId === "shifted" ? "Slide the protractor until its centre mark sits exactly on the vertex." : "Rotate the protractor until its zero line lies on the starting ray." } }));
  };

  const checkMeasurement = () => {
    if (!scene || measurement === null) return;
    if (measurement === scene.angle) {
      setVerified((current) => ({ ...current, measure: true }));
      setFeedback((current) => ({ ...current, measure: { kind: "verified", title: `${scene.angle}° confirmed`, message: `Start at 0° on the right. The second ray crosses the ${scene.angle}° mark.` } }));
      return;
    }
    const direction = measurement < scene.angle ? "before" : "past";
    setFeedback((current) => ({ ...current, measure: { kind: "retry", title: "Follow the second ray", message: `That number is ${direction} the ray. Begin at 0° on the starting ray and count upward to the crossing.` } }));
  };

  const checkClassification = () => {
    if (!scene || !classification) return;
    if (classification === scene.classification) {
      setVerified((current) => ({ ...current, classify: true }));
      setFeedback((current) => ({ ...current, classify: { kind: "verified", title: `${scene.classification[0].toUpperCase()}${scene.classification.slice(1)} angle`, message: scene.classification === "acute" ? `${scene.angle}° is less than 90°.` : scene.classification === "right" ? `${scene.angle}° is exactly 90°.` : `${scene.angle}° is between 90° and 180°.` } }));
      return;
    }
    setFeedback((current) => ({ ...current, classify: { kind: "retry", title: "Compare it with 90°", message: `${scene.angle}° is ${scene.angle < 90 ? "less than" : scene.angle === 90 ? "exactly" : "more than"} 90°. Match that fact to the definition.` } }));
  };

  const checkTriangle = () => {
    if (!triangle) return;
    if (triangle.id === "right-isosceles") {
      setVerified((current) => ({ ...current, triangle: true }));
      setFeedback((current) => ({ ...current, triangle: { kind: "verified", title: "Support A has both clues", message: "The square-corner mark shows a 90° angle, and the two matching side marks show equal sides." } }));
      return;
    }
    const reason = triangle.id === "right-scalene" ? "It has a 90° angle, but all three sides have different lengths." : triangle.id === "acute-isosceles" ? "Two sides match, but all three angles are less than 90°." : "Two sides match, but it has an obtuse 130° angle instead of a right angle.";
    setFeedback((current) => ({ ...current, triangle: { kind: "retry", title: "One clue is missing", message: reason } }));
  };

  const canOpenStep = (target: number) => {
    if (target <= 1) return true;
    if (target === 2) return Boolean(scene);
    if (target === 3) return verified.estimate;
    if (target === 4) return verified.align;
    if (target === 5) return verified.measure;
    if (target === 6) return verified.classify;
    return verified.triangle;
  };

  const continueButton = (next: number, label: string) => <button className="geometry-continue" type="button" onClick={() => setStep(next)}>{label} <span aria-hidden="true">→</span></button>;

  return (
    <section className="geometry-screen-lab" data-scene={sceneId ?? "briefing"} aria-labelledby={titleId}>
      <header className="geometry-screen-hero">
        <div>
          <small>Geometry · Angle Expedition</small>
          <h2 id={titleId}>Spot it. Measure it. Use it.</h2>
          <p>Pick a build, uncover its angles, and prove your thinking—together on screen.</p>
          <div className="geometry-screen-hero__chips" aria-label="What you will do"><span>Spot the opening</span><span>Line up the tool</span><span>Prove your answer</span></div>
        </div>
        <div className="geometry-screen-hero__visual" aria-hidden="true">
          <span className="geometry-screen-hero__grid"></span>
          <i className="geometry-screen-hero__ray geometry-screen-hero__ray--one"></i>
          <i className="geometry-screen-hero__ray geometry-screen-hero__ray--two"></i>
          <b></b>
          <strong>90°</strong>
          <em>RIGHT ANGLE</em>
        </div>
      </header>

      {audience === "teacher" && (
        <aside className="geometry-teacher-strip">
          <strong>PROJECTOR RUN · 25–35 MIN</strong>
          <p>Invite the class to vote, then tap the shared answer. Every required model, definition and check is on-screen. Physical protractors and a room hunt are optional after the evidence screen.</p>
        </aside>
      )}

      <section className="geometry-evidence-progress" aria-label="Verified geometry evidence">
        <div><span>Your progress</span><strong>{verifiedCount} of 5 challenges complete</strong></div>
        <div className="geometry-evidence-progress__bar" role="progressbar" aria-valuemin={0} aria-valuemax={5} aria-valuenow={verifiedCount} aria-label={`${verifiedCount} of 5 geometry checks verified`}><i style={{ width: `${verifiedCount * 20}%` }}></i></div>
        <div className="geometry-evidence-progress__markers">
          {(Object.keys(evidenceLabels) as EvidenceKey[]).map((key, index) => <span key={key} data-verified={verified[key]}><b>{verified[key] ? "✓" : index + 1}</b>{evidenceLabels[key]}</span>)}
        </div>
      </section>

      <nav className="geometry-step-nav" aria-label="Angle lab steps">
        {stepLabels.map((label, index) => {
          const unlocked = canOpenStep(index);
          return <button key={label} type="button" disabled={!unlocked} aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}><b>{index + 1}</b><span>{label}</span><small>{step === index ? "On screen" : unlocked ? "Open" : "Locked"}</small></button>;
        })}
      </nav>

      <section className="geometry-screen-workspace" aria-label="Angle lab workspace">
        <header className="geometry-step-heading">
          <div><small>SCREEN {step + 1} OF 8</small><h3 ref={headingRef} tabIndex={-1}>{stepTitle}</h3></div>
          <button className="geometry-reset" type="button" onClick={reset}>Reset lesson</button>
        </header>

        {step === 0 && (
          <section className="geometry-teach-panel" aria-labelledby="geometry-teach-title">
            <div className="geometry-teach-panel__big-idea">
              <AngleGlyph angle={58} />
              <div><small>THE BIG IDEA</small><h4 id="geometry-teach-title">An angle measures a turn or opening.</h4><p>Two <strong>rays</strong> begin at one point. That shared point is the <strong>vertex</strong>. We measure how far one ray turns away from the other.</p></div>
            </div>
            <div className="geometry-benchmark-row" aria-label="Three useful reference angles">
              <article><AngleGlyph angle={45} compact /><strong>45°</strong><span>half a square corner</span></article>
              <article><AngleGlyph angle={90} compact /><strong>90°</strong><span>a square corner</span></article>
              <article><AngleGlyph angle={180} compact /><strong>180°</strong><span>a straight line</span></article>
            </div>
            <div className="geometry-protractor-rule">
              <div className="geometry-protractor-rule__mini" aria-hidden="true"><span></span><i></i><b></b></div>
              <p><strong>Before reading a protractor:</strong> put its centre mark on the vertex, then line up 0° with the starting ray.</p>
            </div>
            {continueButton(1, "Got it — pick a build")}
          </section>
        )}

        {step === 1 && (
          <section className="geometry-scene-picker" aria-labelledby="geometry-scene-picker-title">
            <h4 id="geometry-scene-picker-title" className="geometry-visually-hidden">Choose a familiar build</h4>
            {scenes.map((item) => (
              <button key={item.id} type="button" onClick={() => clearAfterScene(item.id)}>
                <SceneArtwork scene={item} />
                <span><small>{item.eyebrow}</small><strong>{item.name}</strong><p>{item.prompt}</p><b>Choose this build <span aria-hidden="true">→</span></b></span>
              </button>
            ))}
          </section>
        )}

        {scene && step === 2 && (
          <section className="geometry-decision-panel" aria-labelledby="geometry-estimate-title">
            <div className="geometry-decision-panel__scene"><SceneArtwork scene={scene} found={verified.estimate} /><p><strong>Estimate first.</strong> Do not use the number marks yet.</p></div>
            <div className="geometry-decision-panel__task">
              <small>CHECK 1 · SMART ESTIMATE</small>
              <h4 id="geometry-estimate-title">Which reference angle is closest to the highlighted opening?</h4>
              <div className="geometry-choice-grid geometry-choice-grid--three" role="group" aria-label="Reference angle choices">
                {estimateChoices.map((choice) => <button key={choice.id} type="button" className="geometry-choice" aria-pressed={estimateId === choice.id} disabled={verified.estimate} onClick={() => setEstimateId(choice.id)}><AngleGlyph angle={choice.id === "near-45" ? 45 : choice.id === "near-90" ? 90 : 180} compact /><strong>{choice.label}</strong><span>{choice.hint}</span></button>)}
              </div>
              <button className="geometry-check" type="button" disabled={!estimateId || verified.estimate} onClick={checkEstimate}>Check our estimate</button>
              <StepFeedback feedback={feedback.estimate} />
              {verified.estimate && continueButton(3, "Next: line up the tool")}
            </div>
          </section>
        )}

        {scene && step === 3 && (
          <section className="geometry-single-task" aria-labelledby="geometry-align-title">
            <header><small>CHECK 2 · ALIGN</small><h4 id="geometry-align-title">Which protractor is lined up correctly?</h4><p>Look for two things: centre mark on the vertex; zero line on the starting ray.</p></header>
            <div className="geometry-alignment-choices" role="group" aria-label="Choose the correctly aligned protractor">
              {(["shifted", "centered", "tilted"] as AlignmentId[]).map((id) => <button key={id} type="button" aria-pressed={alignmentId === id} disabled={verified.align} onClick={() => setAlignmentId(id)}><AlignmentDiagram kind={id} /><strong>{id === "shifted" ? "Setup A" : id === "centered" ? "Setup B" : "Setup C"}</strong></button>)}
            </div>
            <button className="geometry-check" type="button" disabled={!alignmentId || verified.align} onClick={checkAlignment}>Check the setup</button>
            <StepFeedback feedback={feedback.align} />
            {verified.align && continueButton(4, "Next: read the scale")}
          </section>
        )}

        {scene && step === 4 && (
          <section className="geometry-measure-panel" aria-labelledby="geometry-measure-title">
            <div><Protractor angle={scene.angle} /></div>
            <div>
              <small>CHECK 3 · MEASURE</small>
              <h4 id="geometry-measure-title">The starting ray is at 0°. What number does the second ray cross?</h4>
              <div className="geometry-number-choices" role="group" aria-label="Angle measurement choices">
                {scene.measureChoices.map((value) => <button key={value} type="button" aria-pressed={measurement === value} disabled={verified.measure} onClick={() => setMeasurement(value)}>{value}°</button>)}
              </div>
              <button className="geometry-check" type="button" disabled={measurement === null || verified.measure} onClick={checkMeasurement}>Check the measurement</button>
              <StepFeedback feedback={feedback.measure} />
              {verified.measure && continueButton(5, "Next: name the angle")}
            </div>
          </section>
        )}

        {scene && step === 5 && (
          <section className="geometry-classify-panel" aria-labelledby="geometry-classify-title">
            <div className="geometry-classify-panel__angle"><AngleGlyph angle={scene.angle} label={`${scene.angle}°`} /><strong>Measured opening</strong></div>
            <div>
              <small>CHECK 4 · NAME THE TYPE</small>
              <h4 id="geometry-classify-title">What type of angle is {scene.angle}°?</h4>
              <div className="geometry-class-choices" role="group" aria-label="Angle type choices">
                {classChoices.map((choice) => <button key={choice.id} type="button" aria-pressed={classification === choice.id} disabled={verified.classify} onClick={() => setClassification(choice.id)}><strong>{choice.label}</strong><span>{choice.meaning}</span></button>)}
              </div>
              <button className="geometry-check" type="button" disabled={!classification || verified.classify} onClick={checkClassification}>Check the angle type</button>
              <StepFeedback feedback={feedback.classify} />
              {verified.classify && continueButton(6, "Next: solve the build challenge")}
            </div>
          </section>
        )}

        {step === 6 && (
          <section className="geometry-triangle-panel" aria-labelledby="geometry-triangle-title">
            <header><small>CHECK 5 · BUILD</small><h4 id="geometry-triangle-title">Pick a support with <em>one 90° angle</em> and <em>two equal sides</em>.</h4><p>Use the angle labels and the matching side marks. Both clues must be true.</p></header>
            <div className="geometry-triangle-choices" role="group" aria-label="Triangle support choices">
              {triangles.map((item) => <button key={item.id} type="button" aria-pressed={triangleId === item.id} disabled={verified.triangle} onClick={() => setTriangleId(item.id)}><TriangleDiagram triangle={item} /><strong>{item.name}</strong><span>{item.angles.join("° · ")}°</span></button>)}
            </div>
            <button className="geometry-check" type="button" disabled={!triangleId || verified.triangle} onClick={checkTriangle}>Test this support</button>
            <StepFeedback feedback={feedback.triangle} />
            {verified.triangle && continueButton(7, "See what we proved")}
          </section>
        )}

        {scene && step === 7 && (
          <section className="geometry-evidence-board" aria-labelledby="geometry-evidence-title">
            <div className="geometry-evidence-board__scene"><SceneArtwork scene={scene} found /><span>5 / 5 CHECKS</span></div>
            <div className="geometry-evidence-board__report">
              <small>ANGLE QUEST COMPLETE</small>
              <h4 id="geometry-evidence-title">We can show how we know—not just give an answer.</h4>
              <dl>
                <div><dt>Build</dt><dd>{scene.name}</dd></div>
                <div><dt>Estimate</dt><dd>{estimateChoices.find((item) => item.id === scene.estimate)?.label}</dd></div>
                <div><dt>Measure</dt><dd>{scene.angle}°</dd></div>
                <div><dt>Angle type</dt><dd>{scene.classification[0].toUpperCase()}{scene.classification.slice(1)}</dd></div>
                <div><dt>Triangle choice</dt><dd>Support A · 45°, 45°, 90°</dd></div>
              </dl>
              <div className="geometry-say-it"><strong>Say it together:</strong><p>“The angle is {scene.angle}°. I know because the protractor’s centre was on the vertex, the zero line was on the starting ray, and the second ray crossed {scene.angle}°.”</p></div>
            </div>
            <aside className="geometry-optional-extension">
              <span>WANT A REAL-WORLD ROUND?</span>
              <div><strong>Try this after the screen mission:</strong><p>Use a physical protractor to find and measure one angle in the room.</p></div>
            </aside>
            <section className="geometry-print-companion" aria-labelledby="geometry-print-title">
              <header><div><small>OPTIONAL PAPER CHALLENGE</small><h4 id="geometry-print-title">Make your own Angle Expedition field guide.</h4><p>Add the vertices, rays, measurements, and explanations yourself.</p></div><span>DRAW · MEASURE · EXPLAIN</span></header>
              <div>
                <figure><Image unoptimized src="/images/angle-expedition-printable-line-art.png" width={1187} height={1536} alt="Black-and-white printable line art showing a skateboard ramp, adjustable gaming or tablet stand, solar-panel brace, a semicircular protractor, and five unlabeled angle diagrams" /><figcaption>Colour if you want. Your labels, measurements, and explanations are the math.</figcaption></figure>
                <section><h5>Build your one-page angle field guide</h5><ol><li><b>Ramp:</b><span>Trace the sloping ray. Estimate, then measure its angle from the ground.</span></li><li><b>Stand:</b><span>Mark the vertex and two rays. Label the opening acute, right, or obtuse.</span></li><li><b>Solar brace:</b><span>Circle a triangle. Mark its side and angle clues.</span></li><li><b>Protractor:</b><span>Choose two rays. Measure from the correct zero line and explain how you know.</span></li><li><b>Angle set:</b><span>Estimate each opening, then compare it with 45°, 90°, or 180°.</span></li></ol><aside><b>Fast route:</b><span>Choose any two objects and two angle diagrams. Accuracy matters more than colouring every section.</span></aside></section>
              </div>
              <footer><a href="/images/angle-expedition-printable-line-art.png" download="angle-expedition-field-guide.png">Save the blank field guide</a><button type="button" onClick={printCompanion}>Print this field guide</button></footer>
            </section>
            <button className="geometry-reset geometry-reset--large" type="button" onClick={reset}>Run another build</button>
          </section>
        )}
      </section>
    </section>
  );
}

export default GeometryScreenLab;
