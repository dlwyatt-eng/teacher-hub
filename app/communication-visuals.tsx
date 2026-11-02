'use client';
import {useState} from 'react';
import visualData from '../content/communication-visuals.json';
import {printClosest} from './print-support';

export default function CommunicationVisuals({projector=false}:{projector?:boolean}) {
 const [selected,setSelected]=useState(0);
 const poster=visualData.posters[selected];
 return <section className="communication-visuals" id="communication-visuals" aria-labelledby="communication-visuals-title">
  <h2 id="communication-visuals-title">Feelings, needs &amp; healthy boundaries</h2>
  <p>Choose one visual to explore. Shared needs can be met in different ways; a need does not give us control over another person.</p>
  <label className="communication-picker">Teaching visual <select value={selected} onChange={event=>setSelected(Number(event.target.value))}>{visualData.posters.map((item,index)=><option key={item.id} value={index}>{index+1}. {item.title}</option>)}</select></label>
  <figure>
   <a href={poster.image} target="_blank" rel="noreferrer"><img src={poster.image} alt={poster.alt} width="1024" height="1536" loading="lazy"/></a>
   <figcaption><a href={poster.image} target="_blank" rel="noreferrer">Open {poster.title.toLowerCase()} full size →</a></figcaption>
  </figure>
  <details className="communication-transcript"><summary>Read the visual as text</summary><h3>{poster.title}</h3>{poster.text.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</details>
  <p><a href="printables/communication-feelings-needs-boundaries.pdf" target="_blank" rel="noreferrer">Download all five posters and teaching notes · PDF →</a></p>
  <p className="communication-safety">You can say “stop,” step away safely, or ask a trusted adult for help. You do not need perfect words, an explanation, or permission to seek help. Someone else crossing your boundary is not your fault.</p>
  <section className="health-reflection" aria-labelledby="health-reflection-title">
   <header><h3 id="health-reflection-title">A small check: feelings, needs and respect</h3><button type="button" onClick={event=>printClosest(event.currentTarget,'.health-reflection')}>Print this reflection</button></header>
   <p>Use this short practice when your teacher chooses. No new post or homework is required. Talk, write, draw and label, point to choices, use AAC, or ask someone to record your words. You can pass. Use made-up people—not a private experience.</p>
   <article className="health-reflection-model"><h4>Try a model together</h4><p>Alex wants quiet time. A friend wants to play. Alex says, “Not now, please.”</p><p><b>One possible answer:</b> Alex might feel tired and need rest. The friend might feel disappointed and want connection. We cannot know their feelings without asking. The friend can respect “not now” and ask about playing later.</p><p><b>Agreement in action:</b> Check your assumptions. Ask “Would you like some quiet time?” rather than deciding “You do not like me.”</p></article>
   <article><h4>Your turn: a different made-up situation</h4><p>Robin asks a friend not to share a drawing. The friend shares it anyway. Robin says, “Stop sharing it.”</p>
    <ol><li><b>What might Robin feel or need?</b> Choose or suggest a feeling (upset, worried, frustrated) and a need (privacy, respect, safety). Say “might”—we do not know for sure.<div className="health-answer-space" aria-label="Space for a feeling and a need" /></li>
    <li><b>What should the friend do now?</b> Say, draw or point to a respectful action: stop sharing; ask before sharing; or get adult help to repair the harm. Explain why it helps.<div className="health-answer-space" aria-label="Space for a respectful action and reason" /></li>
    <li><b>What could Robin say or do?</b> “Stop.” “Do not share my drawing.” Step away safely. Ask a trusted adult for help. Choose a safe response and explain when help would be useful.<div className="health-answer-space" aria-label="Space for a safe response" /></li></ol>
   </article>
   <p><b>Check your thinking:</b> Did you name what matters, respect the person's limit, and give a safe next step? A person does not need perfect words to deserve respect.</p>
   <p><b>One skill to practise:</b> I could practise asking first / checking a guess / respecting “no” / asking for help. Choose one, or suggest your own.</p>
   {!projector&&<aside className="health-reflection-teacher"><b>Teacher check—not a new rubric</b><p>Listen for a plausible feeling and need stated as a possibility, an action that respects the boundary, and an appropriate help route. Accept different supported answers and communication modes. Do not score personal disclosure, writing length, or whether a student chooses to pass. If a real concern arises, follow school procedures; adults remain responsible for safety.</p></aside>}
  </section>
  {!projector&&<details className="practice-teacher"><summary>Teach boundaries before a Health reflection</summary>
   <p>Use when ready; no teaching date, upload or deadline is assigned by this resource. Begin with a fictional situation: Sam asks a classmate to stop using a nickname, but it continues.</p>
   <ol><li>Identify the boundary: Sam wants their name respected. Model “Stop. Please use my name.” A longer feelings-and-needs sentence is optional.</li><li>Compare two responses. Respecting the boundary means stopping, not demanding that Sam explain or prove hurt.</li><li>Practise a low-stakes fictional example with words, drawing, AAC or a scribe. Passing is welcome; do not reenact a real conflict.</li><li>After teaching, a possible reflection is to identify a boundary, explain a respectful response, and say when adult help is needed. Do not require a personal disclosure or create a post until the teacher chooses.</li></ol>
   <p>Ordinary requests can be discussed; safety, consent and protection from harassment are not a class vote. “Don’t take it personally” does not mean ignore harm. Question assumptions, not a child's disclosure. Adults retain responsibility for safety, necessary care and responding to harm.</p>
   <p>These are attributed classroom adaptations, not an official BC assessment tool or beliefs students must adopt.</p>
  </details>}
  <details className="practice-resources"><summary>Visual sources and attribution</summary><ul>{visualData.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul><p>Original classroom illustrations. Agreement adaptations draw on don Miguel Ruiz and don Jose Ruiz; communication tools draw on Marshall Rosenberg’s NVC. Existing author posters are not reproduced in this set.</p></details>
 </section>;
}
