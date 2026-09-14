"use client";

import { useRef, useState } from "react";
import learning from "../content/truth-learning-2026.json";
import "./truth-source-sequence.css";

const stops = ["Begin", "Phyllis", "History", "Living Nations", "Connect", "Model", "Create", "Check"];
const minutes = [3, 5, 5, 5, 5, 4, 10, 3];

export function TruthTeacherPreparation() {
  return <section className="truth-sequence truth-preparation">
    <h2>Prepared source lesson · 40 minutes</h2>
    <p><b>Have ready:</b> this screen, paper and pencils. Students can work alone or with a partner; no student device or video is needed. The class-facing sequence includes three short quotations, clearly labelled summaries, questions, a model and a finish check.</p>
    <p><b>Before class:</b> read the three supplied cards and check what support your class may need. Tell students they may listen quietly, draw, dictate, or pause with an agreed adult. Preview the exact linked passages if opening the full sources; the full pages include material beyond these selections. Do not scroll through unpreviewed testimony with students.</p>
    <p><b>Teach:</b> Begin 3 min → Phyllis 5 → History 5 → Living Nations 5 → Connect 5 → Model 4 → Create 10 → Check 3. Choose the class-facing view to teach these stops one at a time.</p>
    <p><b>If Wi-Fi fails:</b> once this lesson is loaded, the quotations and summaries remain on screen. Read them aloud. They are enough for this short source study; no new source selection is required. Revisit the original pages when access returns.</p>
    <details><summary>Source preparation, answer guidance and care</summary>
      {learning.sources.map(source => <article key={source.id}><h3>{source.title}</h3><p>{source.creator} · {source.kind}</p><p><b>Exact passage:</b> {source.location} {source.date}</p><p>{source.limit}</p><a href={source.href} target="_blank" rel="noreferrer">Preview original source ↗</a></article>)}
      <p><b>Listen for:</b> Phyllis’s shirt was taken and not returned; her belongings and dignity were disregarded. NCTR explains that separation was intentional policy. Katzie describes living place names and work to continue them. These sources answer different questions; a government document is not required to validate a Survivor’s experience.</p>
      <p><b>Understanding check:</b> students should connect an accurate detail to its named source, distinguish personal testimony from a historical explanation, and describe a present-day Nation in the present tense. Correct factual errors kindly. Assess source use and reasoning, not a student’s sadness, identity, family history or willingness to speak.</p>
      <p><b>Care:</b> no personal disclosure, trauma role-play, imagined Survivor diaries, ceremony simulation or expectation that Indigenous students explain a Nation. A quiet source-label or place-learning task is an alternative participation route. If distress or targeted comments arise, stop the discussion, support affected learners and consult the school’s Indigenous Helping Teacher or Indigenous Education team.</p>
      <p><b>Grade 6 connection:</b> evidence, source origins, human rights, continuity and change, and ethical responsibility. This is one local study supporting the wider Global Issues and Governance curriculum.</p>
      <a href="https://curriculum.gov.bc.ca/curriculum/social-studies/6/core" target="_blank" rel="noreferrer">BC Social Studies 6 ↗</a>
      <p><a href="https://dlwyatt-eng.github.io/equity-hub/#lesson/truth-place-responsibility">Adult response guide in the Equity Hub ↗</a> · <a href="https://dlwyatt-eng.github.io/learn/#/truth-and-reconciliation">Student &amp; Family learning page ↗</a></p>
    </details>
    <p>Planned learning: {learning.dates.learning} · learning display: {learning.dates.display} · Orange Shirt Day / National Day for Truth and Reconciliation: {learning.dates.national}. Follow up on {learning.dates.checkBack}.</p>
  </section>;
}

export function TruthSourceSequence() {
  const [index, setIndex] = useState(0);
  const stageRef = useRef<HTMLElement>(null);
  const source = index >= 1 && index <= 3 ? learning.sources[index - 1] : null;
  function show(next: number) { setIndex(next); requestAnimationFrame(() => { stageRef.current?.focus({ preventScroll: true }); stageRef.current?.scrollIntoView({ block: "start" }); }); }
  return <section className="truth-sequence" aria-label="Truth and Reconciliation source lesson">
    <header><p>TRUTH &amp; RECONCILIATION · 40 MINUTES</p><h1>How do we know? What do we owe?</h1><p>Learn from three sources. Make a source-care card and choose a responsibility.</p></header>
    <nav aria-label="Choose a source lesson stop">{stops.map((stop, i) => <button type="button" key={stop} aria-current={i === index ? "step" : undefined} onClick={() => show(i)}>{i + 1}. {stop}</button>)}</nav>
    <article className="truth-stage" ref={stageRef} tabIndex={-1} aria-label={`Stop ${index + 1}: ${stops[index]}`}>
      <p className="truth-kicker">{index + 1} / {stops.length} · {minutes[index]} MIN</p>
      {index === 0 && <><h2>Learn the truth with care</h2><p>Residential schools separated Indigenous children from families and harmed children, languages and communities. Indigenous peoples have living cultures, governments and rights today.</p><p>We will read Phyllis Webstad’s words, a historical explanation from the National Centre for Truth and Reconciliation (NCTR), and Katzie First Nation’s account of its place names. <b>Testimony</b> means a person’s account of what they experienced.</p><p>Listen, write, draw or talk with a partner. You may pass on speaking or ask your teacher for a quiet pause. Nobody needs to share a personal or family story.</p><p><b>Start:</b> on your paper, write “Source / What it teaches us / Question”. Leave room for three sources.</p></>}
      {source && <><h2>{source.title}</h2><p className="truth-credit">{source.creator}<br />{source.kind}</p><p><b>Context · classroom summary:</b> {source.context}</p><blockquote>{source.quote}</blockquote><p className="truth-credit">Short quotation from <a href={source.href} target="_blank" rel="noreferrer">the original source ↗</a> · Checked September 13, 2026</p><p className="truth-task"><b>Talk, draw or write:</b> {source.question}</p><details><summary>What this source can tell us</summary><p>{source.limit}</p><p>{source.date}</p></details></>}
      {index === 4 && <><h2>Put the learning together</h2><ol><li>Phyllis describes something that happened to her. NCTR explains a wider policy. How does each source help us understand something different?</li><li>Katzie describes work happening today. What would we miss if we talked about Indigenous peoples only in the past?</li><li>Name one question these cards leave open. Which source could help us learn more?</li></ol><p><b>Remember:</b> an unanswered question does not undo the harm already established by evidence. We can ask questions with care while respecting people’s rights and dignity.</p></>}
      {index === 5 && <><h2>A source-care card: one example</h2><dl>{Object.entries(learning.model).map(([key, value]) => <div key={key}><dt>{({source:"Source",detail:"Detail",meaning:"My explanation",question:"Next question",care:"Care",action:"Responsibility"} as Record<string,string>)[key]}</dt><dd>{value}</dd></div>)}</dl><p><b>Your turn next:</b> choose a different detail from any of the three cards.</p></>}
      {index === 6 && <><h2>Make your own source-care card</h2><p>Use paper, a labelled drawing, dictation or a partner conversation. Keep the source cards open using the numbered buttons above.</p><ol><li>Name the source and its creator. Record one accurate detail.</li><li>Explain what the detail teaches us. Add one question it does not answer.</li><li>Say how you will credit and use the source with care.</li><li>Choose a class responsibility: check our display’s source credits, or revisit a Nation-authored source. Name who will help and check progress on October 8.</li></ol><details><summary>Source-care reminder</summary><ul>{learning.care.map(item => <li key={item}>{item}</li>)}</ul></details></>}
      {index === 7 && <><h2>Check your learning</h2><ol><li>Point to your detail in its source. Is your explanation supported by what it says?</li><li>Explain the difference between Phyllis’s account and NCTR’s historical explanation.</li><li>Name something Katzie is continuing today.</li><li>Check that your card credits its creator and names a responsibility, helper and follow-up date.</li></ol><p>Share your learning in a way that works for you. Personal and family experiences stay private.</p><p><b>Our next step:</b> choose what belongs in the September 29 learning display. Return to the responsibility on October 8; learning continues beyond September 30.</p></>}
    </article>
    <footer><button type="button" disabled={index === 0} onClick={() => show(index - 1)}>← Previous</button><span>{stops[index]}</span><button type="button" disabled={index === stops.length - 1} onClick={() => show(index + 1)}>Next →</button></footer>
  </section>;
}
