"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export const fourArtsExperienceId = "four-arts-languages";

const sceneClues = [
  { id: "wheel", label: "The wheel is still turning", place: "left" },
  { id: "ribbons", label: "The ribbons pull in different directions", place: "top" },
  { id: "puddles", label: "The puddles repeat the sky", place: "bottom" },
  { id: "boot", label: "One boot was left behind", place: "right" },
  { id: "watering-can", label: "The watering can tipped over", place: "lower-left" },
] as const;

const sounds = [
  { id: "rain", label: "Rain tap", voice: "tap-tap", frequency: 520, shape: "sine" as OscillatorType },
  { id: "wheel", label: "Wheel hum", voice: "mmmm", frequency: 155, shape: "sine" as OscillatorType },
  { id: "wind", label: "Ribbon rush", voice: "shhhh", frequency: 280, shape: "triangle" as OscillatorType },
  { id: "boot", label: "Boot thump", voice: "boom", frequency: 105, shape: "square" as OscillatorType },
] as const;

const freezeFrames = [
  { id: "storm", title: "The storm just left", direction: "Low shapes. Bodies lean away from the wind. One person notices the boot." },
  { id: "discovery", title: "Someone finds a clue", direction: "One clear focus. Everyone else points, looks, or turns toward it." },
  { id: "garden", title: "The garden wakes up", direction: "Use different levels. Make the plants, puddles, wheel, and ribbons feel alive." },
] as const;

const movementCards = [
  { id: "drift", title: "Drift", cue: "Travel slowly for 2 counts" },
  { id: "spin", title: "Spin", cue: "Turn or circle a hand for 2 counts" },
  { id: "splash", title: "Splash", cue: "Burst out, then freeze for 2 counts" },
  { id: "bend", title: "Bend", cue: "Fold low and rise for 2 counts" },
  { id: "flicker", title: "Flicker", cue: "Make two quick tiny moves" },
] as const;

const artForms = ["Image", "Soundtrack", "Freeze-frame", "Movement loop"] as const;

function playSoundtrack(ids: string[], onDone: () => void) {
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass || !ids.length) return;
  const context = new AudioContextClass();
  const start = context.currentTime + .05;
  ids.forEach((id, index) => {
    const sound = sounds.find((item) => item.id === id);
    if (!sound) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = sound.shape;
    oscillator.frequency.setValueAtTime(sound.frequency, start + index * .55);
    gain.gain.setValueAtTime(0, start + index * .55);
    gain.gain.linearRampToValueAtTime(.11, start + index * .55 + .04);
    gain.gain.linearRampToValueAtTime(0, start + index * .55 + .38);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(start + index * .55);
    oscillator.stop(start + index * .55 + .42);
  });
  window.setTimeout(() => { void context.close(); onDone(); }, ids.length * 550 + 200);
}

export function FourArtsLab({ audience = "student" }: { audience?: "student" | "teacher" }) {
  const [step, setStep] = useState(0);
  const [clues, setClues] = useState<string[]>([]);
  const [soundtrack, setSoundtrack] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const [freezeFrame, setFreezeFrame] = useState("");
  const [moves, setMoves] = useState<string[]>([]);
  const [mix, setMix] = useState<string[]>([]);
  const [focus, setFocus] = useState("");
  const stageRef = useRef<HTMLElement>(null);

  const complete = [clues.length >= 2, soundtrack.length === 3, Boolean(freezeFrame), moves.length === 4, mix.length === 2 && Boolean(focus)];
  const verified = complete.filter(Boolean).length;
  const freeze = freezeFrames.find((item) => item.id === freezeFrame);
  const selectedMoves = moves.map((id) => movementCards.find((item) => item.id === id)).filter(Boolean);
  const focusLabel = sceneClues.find((item) => item.id === focus)?.label ?? "";
  const canContinue = complete[step];
  const title = ["Look like a detective", "Build the soundtrack", "Direct a freeze-frame", "Make an 8-count loop", "Create the remix"][step];

  const goTo = (next: number) => {
    setStep(next);
    window.requestAnimationFrame(() => stageRef.current?.focus({ preventScroll: true }));
  };

  const toggleClue = (id: string) => setClues((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id].slice(-3));
  const addSound = (id: string) => setSoundtrack((current) => current.length >= 3 || current.includes(id) ? current : [...current, id]);
  const addMove = (id: string) => setMoves((current) => current.length >= 4 ? current : [...current, id]);
  const toggleMix = (name: string) => setMix((current) => current.includes(name) ? current.filter((item) => item !== name) : current.length < 2 ? [...current, name] : current);

  const reset = () => {
    setStep(0); setClues([]); setSoundtrack([]); setFreezeFrame(""); setMoves([]); setMix([]); setFocus("");
  };

  return (
    <section className="four-arts-lab" aria-labelledby="four-arts-title">
      <header className="four-arts-lab__hero">
        <div><small>THE AFTER-RAIN REMIX · ONE PROJECTOR, ONE CLASS</small><h2 id="four-arts-title">One scene. Four ways to make it feel different.</h2><p>We will turn the same strange courtyard into an image story, a soundtrack, a freeze-frame, and a movement loop. Then the class chooses the best remix.</p></div>
        <aside><strong>{verified} / 5</strong><span>creative moves built</span></aside>
      </header>

      <div className="four-arts-lab__progress" role="progressbar" aria-label="Studio progress" aria-valuemin={0} aria-valuemax={5} aria-valuenow={verified}><i style={{ width: `${verified * 20}%` }} /></div>

      <div className="four-arts-lab__layout">
        <figure className="four-arts-scene" data-step={step}>
          <Image unoptimized src="/images/four-arts-rain-courtyard-v1.webp" alt="An illustrated rooftop garden after rain, with puddles, windblown ribbons, a turning wheel sculpture, one boot, and a tipped watering can" width={1672} height={941} sizes="(max-width: 900px) 100vw, 58vw" priority />
          <span className="four-arts-scene__wheel" aria-hidden="true" />
          <span className="four-arts-scene__wind wind-one" aria-hidden="true" />
          <span className="four-arts-scene__wind wind-two" aria-hidden="true" />
          <span className="four-arts-scene__ripple ripple-one" aria-hidden="true" />
          <span className="four-arts-scene__ripple ripple-two" aria-hidden="true" />
          {step === 0 && sceneClues.map((clue, index) => <button type="button" className={`four-arts-hotspot hotspot-${clue.place} ${clues.includes(clue.id) ? "found" : ""}`} key={clue.id} onClick={() => toggleClue(clue.id)} aria-pressed={clues.includes(clue.id)}><span>{clues.includes(clue.id) ? "✓" : index + 1}</span><b>{clue.label}</b></button>)}
          {step > 0 && <figcaption>{step === 1 ? "What could this place sound like?" : step === 2 ? "Where should the audience look first?" : step === 3 ? "Which paths and rhythms are hiding here?" : "What feeling will your remix leave behind?"}</figcaption>}
        </figure>

        <section ref={stageRef} className="four-arts-lab__stage" tabIndex={-1} aria-labelledby="four-arts-step-title">
          <header><span>STUDIO MOVE {step + 1} OF 5</span><h3 id="four-arts-step-title">{title}</h3></header>

          {step === 0 && <div className="four-arts-task">
            <p className="four-arts-callout"><b>Class job:</b> Look quietly for 20 seconds. Then choose two details that could start different stories.</p>
            <div className="four-arts-clue-list">{sceneClues.map((clue) => <button type="button" key={clue.id} onClick={() => toggleClue(clue.id)} aria-pressed={clues.includes(clue.id)}><span>{clues.includes(clue.id) ? "✓" : "+"}</span>{clue.label}</button>)}</div>
            <p className="four-arts-coach">No guessing about the “real” story yet. First, point to what is actually visible.</p>
          </div>}

          {step === 1 && <div className="four-arts-task">
            <p className="four-arts-callout"><b>Class job:</b> Choose three sound layers. Put them in an order that changes the mood.</p>
            <div className="four-arts-choice-grid">{sounds.map((sound) => <button type="button" key={sound.id} disabled={soundtrack.length >= 3 || soundtrack.includes(sound.id)} onClick={() => addSound(sound.id)}><span>{sound.voice}</span><strong>{sound.label}</strong></button>)}</div>
            <div className="four-arts-sequence"><small>YOUR 3-SOUND TRACK</small>{[0,1,2].map((slot) => { const sound = sounds.find((item) => item.id === soundtrack[slot]); return <button type="button" key={slot} disabled={!sound} onClick={() => setSoundtrack((current) => current.filter((_, index) => index !== slot))}><span>{slot + 1}</span>{sound ? <strong>{sound.label} ×</strong> : <em>Choose a sound</em>}</button>; })}</div>
            <button className="four-arts-play" type="button" disabled={!soundtrack.length || playing} onClick={() => { setPlaying(true); playSoundtrack(soundtrack, () => setPlaying(false)); }}>{playing ? "Playing…" : "▶ Test our soundtrack"}</button>
            <p className="four-arts-coach">The computer gives a tiny cue. The class can make the real version with voices, body percussion, or safe classroom objects.</p>
          </div>}

          {step === 2 && <div className="four-arts-task">
            <p className="four-arts-callout"><b>Tableau means a freeze-frame made with bodies.</b> Pick one direction. You have 30 seconds to build it.</p>
            <div className="four-arts-frame-options">{freezeFrames.map((option) => <button type="button" key={option.id} onClick={() => setFreezeFrame(option.id)} aria-pressed={freezeFrame === option.id}><span>{freezeFrame === option.id ? "DIRECTOR’S PICK" : "TRY THIS"}</span><strong>{option.title}</strong><p>{option.direction}</p></button>)}</div>
            {freeze && <p className="four-arts-action"><b>Freeze for five seconds.</b> Audience: point to the part your eyes noticed first. Director: was that the plan?</p>}
          </div>}

          {step === 3 && <div className="four-arts-task">
            <p className="four-arts-callout"><b>Class job:</b> Build four 2-count moves. Standing, seated, or hand-only versions all count.</p>
            <div className="four-arts-move-bank">{movementCards.map((move) => <button type="button" key={move.id} disabled={moves.length >= 4} onClick={() => addMove(move.id)}><strong>{move.title}</strong><span>{move.cue}</span></button>)}</div>
            <ol className="four-arts-move-line">{[0,1,2,3].map((slot) => { const move = selectedMoves[slot]; return <li key={slot}><span>{slot * 2 + 1}–{slot * 2 + 2}</span>{move ? <button type="button" onClick={() => setMoves((current) => current.filter((_, index) => index !== slot))}>{move.title} ×</button> : <em>open</em>}</li>; })}</ol>
            {moves.length === 4 && <p className="four-arts-action"><b>Run the loop twice.</b> Second time: make one contrast bigger—level, speed, direction, or size.</p>}
          </div>}

          {step === 4 && <div className="four-arts-task">
            <p className="four-arts-callout"><b>Final build:</b> Combine two forms and make one courtyard detail impossible to miss.</p>
            <div className="four-arts-remix-forms">{artForms.map((form) => <button type="button" key={form} onClick={() => toggleMix(form)} aria-pressed={mix.includes(form)}><span>{mix.includes(form) ? "✓" : "+"}</span>{form}</button>)}</div>
            <label className="four-arts-focus"><span>WHAT SHOULD THE AUDIENCE NOTICE?</span><select value={focus} onChange={(event) => setFocus(event.target.value)}><option value="">Choose one scene detail…</option>{sceneClues.map((clue) => <option key={clue.id} value={clue.id}>{clue.label}</option>)}</select></label>
            {complete[4] && <article className="four-arts-remix-card"><small>OUR AFTER-RAIN REMIX</small><h4>{mix.join(" + ")}</h4><p>We will make <b>{focusLabel.toLowerCase()}</b> stand out.</p><ol><li>Rehearse for 45 seconds.</li><li>Share it once.</li><li>Audience says: “I noticed…”</li><li>Change one choice and try again.</li></ol></article>}
          </div>}

          <footer>
            <button type="button" className="secondary" onClick={() => step ? goTo(step - 1) : reset()}>{step ? "← Back" : "Reset studio"}</button>
            {step < 4 ? <button type="button" disabled={!canContinue} onClick={() => goTo(step + 1)}>Open the next studio move →</button> : <button type="button" disabled={!canContinue} onClick={() => stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}>Remix plan ready ✓</button>}
          </footer>
        </section>
      </div>

      {audience === "teacher" && <aside className="four-arts-teacher-note"><strong>Teacher handoff</strong><p>Run one form at a time and let students direct the choices aloud. Use groups of 4–6 for the freeze-frame and movement loop. Students may choose director, sound-maker, mover, visual planner, or audience detective. In a 55-minute block, complete Moves 1–3 and save the movement/remix for next class.</p></aside>}
    </section>
  );
}

export default FourArtsLab;
