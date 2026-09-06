import { useState } from "react";
import { HOPE_FIELDS, emptyHopeStory, importHopeStory, parseHopeStory, type HopeStory } from "./morning-hope-state";

export function HopeEditor({ value, onChange }: { value: HopeStory | null; onChange: (value: HopeStory | null) => void }) {
  const [paste, setPaste] = useState("");
  const [message, setMessage] = useState("");
  return <section className="morning-editor-panel morning-hope-editor">
    <header><small>DAILY · 4 MINUTES</small><h2>Hope in Action</h2></header>
    <p>One true story about people making life fairer. Read for one minute, explain the change for one minute, then give partners two minutes to discuss.</p>
    <p>Copy the Morning Screen block from your daily ChatGPT story below. Check the article and review the wording, then publish with today&apos;s screen. Stories do not transfer automatically; saved stories stay on this device for this date.</p>
    <label><span>Paste Morning Screen block</span><textarea rows={3} maxLength={12000} value={paste} onChange={event => setPaste(event.target.value)} /></label>
    <button type="button" onClick={() => {
      const story = importHopeStory(paste);
      if (!story) { setMessage("Could not read the block. Copy the complete Morning Screen block, or use Write a story below."); return; }
      onChange(story); setPaste(""); setMessage("Story loaded. Open the source, review the text below, then publish.");
    }}>Load story for review</button>
    <p role="status">{message}</p>
    {!value ? <button type="button" onClick={() => onChange(emptyHopeStory())}>Write a story</button> : <>
      <details open><summary>Review or edit today&apos;s story</summary>
        {HOPE_FIELDS.map(([key, label, max]) => <label key={key}><span>{label}</span>
          {max <= 100 || key === "sourceUrl" ? <input type={key === "date" ? "date" : key === "sourceUrl" ? "url" : "text"} value={value[key]} maxLength={max} onChange={event => onChange({ ...value, [key]: event.target.value })} />
            : <textarea rows={3} value={value[key]} maxLength={max} onChange={event => onChange({ ...value, [key]: event.target.value })} />}
        </label>)}
      </details>
      {parseHopeStory(value) ? <><a href={value.sourceUrl} target="_blank" rel="noreferrer">Check article: {value.sourceLabel} ↗</a><p>Check the story date and distinguish achieved changes from promises. Explain unfamiliar terms. Students can discuss the story without sharing personal experiences.</p></> : <p role="status">Complete every story field and add a valid date and HTTPS article link before publishing, or skip the story today.</p>}
      <button type="button" onClick={() => { onChange(null); setMessage("Story removed from the draft. Publish to update today's screen."); }}>Skip story today</button>
    </>}
  </section>;
}

export function HopeProjector({ story }: { story: HopeStory }) {
  const [step, setStep] = useState(0);
  const steps = ["The story", "People made a difference", "Our discussion"];
  const panels = [
    [["What happened?", story.story], ["What was unfair?", story.barrier]],
    [["What people did", story.action], ["What changed", story.change], ["Work still to do", story.limits]],
    [["An idea to carry with us", story.takeaway], ["Think, then talk with a partner", story.question]],
  ];
  return <section className="morning-hope-projector" aria-label="Hope in Action story">
    <header><small>HOPE IN ACTION · 4 MINUTES</small><h2>{story.title}</h2><p>Story date: {story.date} · <a href={story.sourceUrl} target="_blank" rel="noreferrer">{story.sourceLabel} ↗</a></p></header>
    <nav aria-label="Story steps">{steps.map((label, index) => <button key={label} type="button" aria-pressed={step === index} onClick={() => setStep(index)}>{index + 1}. {label}</button>)}</nav>
    <div aria-live="polite">{panels[step].map(([label, copy]) => <section key={label}><h3>{label}</h3><p>{copy}</p></section>)}</div>
    <footer>{step === 2 ? "Listen to your partner. Share one idea supported by the story." : "Ask: What evidence supports this story?"}</footer>
  </section>;
}
