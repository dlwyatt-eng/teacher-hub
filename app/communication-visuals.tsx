'use client';
import {useState} from 'react';
import visualData from '../content/communication-visuals.json';

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
  {!projector&&<details className="practice-teacher"><summary>Teach boundaries before a Health reflection</summary>
   <p>Use when ready; no teaching date, upload or deadline is assigned by this resource. Begin with a fictional situation: Sam asks a classmate to stop using a nickname, but it continues.</p>
   <ol><li>Identify the boundary: Sam wants their name respected. Model “Stop. Please use my name.” A longer feelings-and-needs sentence is optional.</li><li>Compare two responses. Respecting the boundary means stopping, not demanding that Sam explain or prove hurt.</li><li>Practise a low-stakes fictional example with words, drawing, AAC or a scribe. Passing is welcome; do not reenact a real conflict.</li><li>After teaching, a possible reflection is to identify a boundary, explain a respectful response, and say when adult help is needed. Do not require a personal disclosure or create a post until the teacher chooses.</li></ol>
   <p>Ordinary requests can be discussed; safety, consent and protection from harassment are not a class vote. “Don’t take it personally” does not mean ignore harm. Question assumptions, not a child's disclosure. Adults retain responsibility for safety, necessary care and responding to harm.</p>
   <p>These are attributed classroom adaptations, not an official BC assessment tool or beliefs students must adopt.</p>
  </details>}
  <details className="practice-resources"><summary>Visual sources and attribution</summary><ul>{visualData.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul><p>Original classroom illustrations. Agreement adaptations draw on don Miguel Ruiz and don Jose Ruiz; communication tools draw on Marshall Rosenberg’s NVC. Existing author posters are not reproduced in this set.</p></details>
 </section>;
}
