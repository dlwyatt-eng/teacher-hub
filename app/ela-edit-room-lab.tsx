"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const editRoomExperienceId = "edit-room";

type Audience = "student" | "teacher";
type CropChoice = "showcase" | "spill" | "whole";

const imagePath = "/images/edit-room-courtyard-context-v2.webp";
const steps = ["See the whole event", "Test two crops", "Check the caption", "Build a fair edit", "Show what you learned"];

const visibleDetails = [
  { id: "model", label: "Left side", fact: "A group is showing a tabletop model." },
  { id: "helpers", label: "Centre", fact: "Two students are picking up art materials." },
  { id: "ball", label: "Behind them", fact: "A ball is rolling across the courtyard." },
  { id: "adult", label: "Right side", fact: "An adult is watching calmly." },
] as const;

const cropAnswers: Record<"left" | "centre", CropChoice> = { left: "showcase", centre: "spill" };

const frameCards = [
  { id: "full", label: "Wide view", detail: "The whole courtyard and several things happening at once." },
  { id: "model", label: "Model crop", detail: "The group presenting the model." },
  { id: "helpers", label: "Helping crop", detail: "Two students collecting the spilled materials." },
  { id: "ball", label: "Ball crop", detail: "The rolling ball and students nearby." },
] as const;

export function EditRoomLab({ audience = "student" }: { audience?: Audience }) {
  const [step, setStep] = useState(0);
  const [seen, setSeen] = useState<string[]>([]);
  const [cropChoices, setCropChoices] = useState<Partial<Record<"left" | "centre", CropChoice>>>({});
  const [caption, setCaption] = useState<number | null>(null);
  const [sequence, setSequence] = useState<string[]>([]);
  const [context, setContext] = useState<string | null>(null);
  const [message, setMessage] = useState("Begin with the wide view. Only name details the class can point to.");
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    stageRef.current?.focus({ preventScroll: true });
  }, [step]);

  const cropsCorrect = cropChoices.left === cropAnswers.left && cropChoices.centre === cropAnswers.centre;
  const captionCorrect = caption === 0;
  const sequenceReady = sequence.length === 3 && sequence.includes("full");
  const checks = [seen.length === visibleDetails.length, cropsCorrect, captionCorrect, sequenceReady, Boolean(context)];
  const verified = checks.filter(Boolean).length;

  const go = (next: number) => {
    const safeNext = Math.max(0, Math.min(steps.length - 1, next));
    setStep(safeNext);
    setMessage(`Part ${safeNext + 1}: ${steps[safeNext]}.`);
  };

  const notice = (id: string, fact: string) => {
    setSeen((current) => current.includes(id) ? current : [...current, id]);
    setMessage(fact);
  };

  const chooseCrop = (crop: "left" | "centre", choice: CropChoice) => {
    const next = { ...cropChoices, [crop]: choice };
    setCropChoices(next);
    if (next.left === cropAnswers.left && next.centre === cropAnswers.centre) {
      setMessage("Both crops are honest pieces of the image, but neither shows the whole event.");
    } else {
      setMessage("Look again: what takes up most of this crop, and what disappeared outside its edges?");
    }
  };

  const chooseCaption = (index: number) => {
    setCaption(index);
    setMessage(index === 0
      ? "That caption stays close to visible evidence and keeps two parts of the event."
      : index === 1
        ? "‘Chaos’ pushes a feeling the full image does not prove. Try a caption that names what is visible."
        : "The image cannot prove anyone's motive. Keep thoughts and intentions out unless a source tells us.");
  };

  const addFrame = (id: string) => {
    setSequence((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length === 3) return current;
      return [...current, id];
    });
    setMessage("Choose three frames in the order an audience would see them. Keep the wide view somewhere in the edit.");
  };

  const reset = () => {
    setStep(0);
    setSeen([]);
    setCropChoices({});
    setCaption(null);
    setSequence([]);
    setContext(null);
    setMessage("The Edit Room has reset. Begin with the wide view.");
  };

  return (
    <section className="edit-room-lab" aria-labelledby="edit-room-title">
      <header className="edit-room-header">
        <div><small>ELA · MEDIA LAB · ONE SHARED SCREEN</small><h2 id="edit-room-title">The Edit Room</h2><p>One real-looking image can support several stories. Your job is to keep the story as honest as the evidence.</p></div>
        <aside><span>{verified} / 5 checks</span><div role="progressbar" aria-label="Edit Room evidence checks" aria-valuemin={0} aria-valuemax={5} aria-valuenow={verified}><i style={{ width: `${verified * 20}%` }} /></div><small>No score. Each check protects the context.</small></aside>
      </header>

      <nav className="edit-room-route" aria-label="Edit Room parts">
        {steps.map((label, index) => <button type="button" key={label} className={index === step ? "active" : checks[index] ? "done" : ""} aria-current={index === step ? "step" : undefined} disabled={index > 0 && !checks.slice(0, index).every(Boolean)} onClick={() => go(index)}><b>{checks[index] ? "✓" : index + 1}</b><span>{label}</span></button>)}
      </nav>

      <section ref={stageRef} className="edit-room-stage" tabIndex={-1} aria-label={`Part ${step + 1}: ${steps[step]}`}>
        {step === 0 && <>
          <header><small>PART 1 · SEE BEFORE YOU EXPLAIN</small><h3>What can everyone actually point to?</h3><p>Study the wide image. Tap each location. Say what is visible—without guessing what anyone thinks or why they acted.</p></header>
          <figure className="edit-room-source-image">
            <Image unoptimized src={imagePath} alt="Illustrated school courtyard with a model presentation, students collecting art materials, a rolling ball, other student activity, and a calm adult observer" width={1672} height={941} sizes="(max-width: 900px) 100vw, 1200px" priority />
            <figcaption>FICTIONAL EVENT · GENERATED FOR THIS LESSON · NOT A PHOTO OR NEWS SOURCE</figcaption>
          </figure>
          <div className="edit-room-notice-grid">{visibleDetails.map((detail) => <button type="button" key={detail.id} aria-pressed={seen.includes(detail.id)} onClick={() => notice(detail.id, detail.fact)}><b>{seen.includes(detail.id) ? "✓" : detail.label}</b><span>{seen.includes(detail.id) ? detail.fact : "Tap, look, then describe."}</span></button>)}</div>
          <div className="edit-room-rule"><b>SEEING:</b> “Two students are picking up art supplies.” <i>NOT YET:</i> “They caused a huge mess.”</div>
        </>}

        {step === 1 && <>
          <header><small>PART 2 · CROP = THE PART KEPT INSIDE THE FRAME</small><h3>Same image. Different first impression.</h3><p>A crop can be truthful and still leave out important context. What does each crop make easiest to believe?</p></header>
          <div className="edit-room-crop-grid">
            {(["left", "centre"] as const).map((crop) => <article key={crop}>
              <div className={`edit-room-crop crop-${crop}`} role="img" aria-label={crop === "left" ? "Crop focused on students presenting a model" : "Crop focused on students collecting art materials and a rolling ball"} />
              <small>{crop === "left" ? "CROP A · LEFT SIDE" : "CROP B · CENTRE"}</small>
              <strong>What story moves to the front?</strong>
              <div>{([[
                "showcase", "A model showcase is happening"
              ], ["spill", "A spill and cleanup are happening"], ["whole", "This shows the whole event"]] as [CropChoice, string][]).map(([value, label]) => <button type="button" key={value} aria-pressed={cropChoices[crop] === value} onClick={() => chooseCrop(crop, value)}>{label}</button>)}</div>
            </article>)}
          </div>
          <figure className="edit-room-context-strip"><Image unoptimized src={imagePath} alt="The full courtyard image for comparing both crops with their missing context" width={1672} height={941} sizes="(max-width: 900px) 100vw, 1200px" /><figcaption>Return to the wide view whenever a crop feels like the whole story.</figcaption></figure>
        </>}

        {step === 2 && <>
          <header><small>PART 3 · CAPTION = WORDS PLACED BESIDE AN IMAGE</small><h3>Which caption says only what the image supports?</h3><p>Read the words, then check the full image. A confident sentence is not automatically an honest one.</p></header>
          <div className="edit-room-caption-scene"><div className="edit-room-crop crop-wide" role="img" aria-label="Wide view of the fictional school courtyard" />{caption !== null && <p>{[
            "Students present a model while classmates help collect spilled art supplies.",
            "Chaos erupts as a wild ball sends the courtyard into panic!",
            "Jealous students ruin the project on purpose.",
          ][caption]}</p>}</div>
          <div className="edit-room-caption-options">{[
            "Students present a model while classmates help collect spilled art supplies.",
            "Chaos erupts as a wild ball sends the courtyard into panic!",
            "Jealous students ruin the project on purpose.",
          ].map((text, index) => <button type="button" key={text} aria-pressed={caption === index} className={caption === index ? index === 0 ? "supported" : "pushy" : ""} onClick={() => chooseCaption(index)}><b>{String.fromCharCode(65 + index)}</b><span>{text}</span></button>)}</div>
          <div className="edit-room-word-check"><span><b>VISIBLE?</b> Can we point to it?</span><span><b>PROVEN?</b> Does the image show it—or did the caption invent it?</span><span><b>MISSING?</b> What changes when we return to the wide view?</span></div>
        </>}

        {step === 3 && <>
          <header><small>PART 4 · BUILD THE CLASS EDIT</small><h3>Choose three frames. Keep enough context.</h3><p>Tap frames in the order your audience will see them. There is more than one fair order—but the wide view must stay.</p></header>
          <div className="edit-room-frame-bank">{frameCards.map((frame) => { const position = sequence.indexOf(frame.id); return <button type="button" key={frame.id} aria-pressed={position >= 0} onClick={() => addFrame(frame.id)}><b>{position >= 0 ? position + 1 : "+"}</b><span><strong>{frame.label}</strong><small>{frame.detail}</small></span></button>; })}</div>
          <section className="edit-room-timeline" aria-label="Selected edit order"><header><b>YOUR THREE-FRAME EDIT</b><button type="button" onClick={() => setSequence([])}>Clear order</button></header><div>{sequence.length ? sequence.map((id, index) => { const frame = frameCards.find((item) => item.id === id)!; return <article key={id}><span>{index + 1}</span><strong>{frame.label}</strong><small>{frame.detail}</small></article>; }) : <p>Choose the first frame above.</p>}</div><footer>{sequenceReady ? "Context check passed: the audience can return to the wide view. ✓" : sequence.length === 3 ? "One crop is pretending to be the whole story. Replace a frame with the wide view." : `${3 - sequence.length} frame${3 - sequence.length === 1 ? "" : "s"} still to choose.`}</footer></section>
        </>}

        {step === 4 && <>
          <header><small>PART 5 · CONTEXT = INFORMATION THAT HELPS THE PART MAKE SENSE</small><h3>What must your edit refuse to hide?</h3><p>Choose one context detail your class will protect. Then read the final editor’s note aloud.</p></header>
          <div className="edit-room-context-options">{[
            ["many", "Several ordinary activities are happening at the same time."],
            ["calm", "The adult and nearby students appear calm, not panicked."],
            ["both", "The presentation and the cleanup are both part of the event."],
          ].map(([id, text]) => <button type="button" key={id} aria-pressed={context === id} onClick={() => { setContext(id); setMessage(`Context protected: ${text}`); }}><b>{context === id ? "✓" : "+"}</b><span>{text}</span></button>)}</div>
          <article className={`edit-room-final-note ${context ? "ready" : ""}`}>
            <small>CLASS EDITOR’S NOTE</small>
            <h4>Our version shows a model presentation and students helping with spilled supplies.</h4>
            <p>We used a wide view because a tight crop could make one part seem like the entire event. Our caption names visible actions and does not invent panic, blame, or motives.</p>
            <strong>{context ? `We kept this context: ${[
              ["many", "Several ordinary activities are happening at the same time."],
              ["calm", "The adult and nearby students appear calm, not panicked."],
              ["both", "The presentation and the cleanup are both part of the event."],
            ].find(([id]) => id === context)?.[1]}` : "Choose one context detail above to complete the note."}</strong>
          </article>
          <div className="edit-room-offscreen"><b>TRY IT WITHOUT DEVICES</b><span>Fold a paper frame, cover parts of any classroom picture, or sketch three panels. Ask what the frame made loud—and what it made disappear.</span></div>
        </>}
      </section>

      <footer className="edit-room-controls">
        <button type="button" onClick={() => go(step - 1)} disabled={step === 0}>← Back</button>
        <div><strong>{message}</strong><span aria-live="polite" className="sr-only">{message}</span></div>
        {step < steps.length - 1 ? <button type="button" onClick={() => go(step + 1)} disabled={!checks[step]}>Next part →</button> : <button type="button" onClick={reset}>Reset Edit Room ↻</button>}
      </footer>

      {audience === "teacher" && <aside className="edit-room-teacher-note"><b>TEACHER MOVE</b><span>Invite the class to disagree with the edit, but require every challenge to point to visible evidence or missing context. The goal is not one perfect caption; it is disciplined attention.</span></aside>}
    </section>
  );
}

export default EditRoomLab;
