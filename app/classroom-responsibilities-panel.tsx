'use client';
import {useRef, useState} from 'react';
import {responsibilityPosters} from './classroom-responsibilities';
export function ClassroomResponsibilitiesPanel() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const poster = responsibilityPosters[selected];
  return <section className="responsibility-panel">
    <h3>Classroom responsibilities posters</h3>
    {responsibilityPosters.map((p, i) => <div key={p.id} className="captain-controls">
      <button onClick={() => {setSelected(i); dialog.current?.showModal();}}>Project {p.title}</button>
      <a href={`./printables/${p.id}-responsibilities.pdf`} target="_blank" rel="noreferrer">Print {p.title}</a>
    </div>)}
    <dialog ref={dialog} className="captain-dialog responsibility-dialog" aria-label={poster.title}>
      <button onClick={() => dialog.current?.close()}>Return to planning</button>
      <h2>{poster.title}</h2><p>{poster.subtitle}</p>
      <div className="responsibility-grid">{poster.items.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      <p>{poster.footer}</p>
    </dialog>
  </section>;
}
