'use client';
import {useRef,useState} from 'react';
import {captainRoutes,captainYearProgression,type CaptainRoute} from './captain-leadership';
import {printClosest} from './print-support';
import './captain-leadership.css';
import {ClassroomResponsibilitiesPanel} from './classroom-responsibilities-panel';

export function CaptainRouteContent({route,step}:{route:CaptainRoute;step?:number}) {
  const steps=step===undefined?route.steps:[route.steps[step]];
  return <section className="captain-route"><h2>{route.title}</h2><p>{route.purpose}</p><p><strong>Have ready:</strong> {route.materials}</p>
    {steps.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.action}</p><p><strong>Check:</strong> {item.check}</p></article>)}
    <p><strong>Finish with:</strong> {route.finish}</p>
  </section>;
}
export function CaptainLeadershipPanel({initialRoute='chores'}:{initialRoute?:string}) {
  const [routeId,setRouteId]=useState(initialRoute);const [step,setStep]=useState(0);const dialog=useRef<HTMLDialogElement>(null);
  const route=captainRoutes.find(r=>r.id===routeId)??captainRoutes[0];
  return <section className="captain-panel">
    <header><h2>Team captains throughout the year</h2><p>Weekly chores, PE leadership, Werewolf storytelling and subject teamwork provide real opportunities to plan, communicate, help others and reflect.</p></header>
    <details className="captain-teacher"><summary>Weekly rhythm, teaching and assessment</summary>
      <p><strong>Start the week:</strong> give captains and teams 5 minutes to check assigned jobs and upcoming responsibilities. Use brief daily chore checks and a handover at the end of the week.</p>
      <p><strong>PE:</strong> reserve the captain-led block already included in the seasonal PE plan, with preparation during the preceding PE block.</p>
      <p><strong>Language Arts:</strong> <a href="?subject=English+Language+Arts&experience=werewolf-learn">Open the dedicated Werewolf lessons</a> to learn the game and practise oral storytelling. Once the class is ready, captains can coordinate materials and hosting. All students practise telling, listening and revising.</p>
      <p><strong>Career:</strong> allow 3–5 minutes at the end of the week for one action–effect–next-step reflection, revisiting the goal at the next responsibility. Select an occasional example for an existing SpacesEDU reflection; most notes stay in class.</p>
      <p><strong>Assess the learning:</strong> ELA evidence is story sequence, expression, listening and revision. Career evidence is planning, collaboration, an observed effect and an achievable next step. Chore completion alone is not an achievement judgment. Captains coordinate learning across subjects; individual subject understanding still needs its own evidence.</p>
      <p>Share useful roles within each team. In shorter or reporting weeks, use familiar routines and a short reflection. Keep the attributed Semiahmoo oral-story lesson as its own source-based learning; Werewolf uses original fictional material.</p>
      <table><caption>Revisit and deepen the focus through the year</caption><tbody>{captainYearProgression.map(([time,focus])=><tr key={time}><th scope="row">{time}</th><td>{focus}</td></tr>)}</tbody></table>
    </details>
    <ClassroomResponsibilitiesPanel />
    <nav aria-label="Captain activity">{captainRoutes.map(r=><button key={r.id} aria-pressed={route.id===r.id} onClick={()=>{setRouteId(r.id);setStep(0);}}>{r.title}</button>)}</nav>
    <div className="captain-controls"><button onClick={()=>{setStep(0);dialog.current?.showModal();}}>Project captain activity</button></div>
    <div className="captain-print"><button onClick={e=>printClosest(e.currentTarget,'.captain-print')}>Print this activity</button><CaptainRouteContent route={route}/></div>
    <dialog ref={dialog} className="captain-dialog" aria-label={route.title} onClose={()=>setStep(0)}>
      <button onClick={()=>dialog.current?.close()}>Return to planning</button>
      <nav aria-label="Captain activity steps">{route.steps.map((s,i)=><button key={s.title} aria-pressed={i===step} onClick={()=>setStep(i)}>{i+1}. {s.title}</button>)}</nav>
      <CaptainRouteContent route={route} step={step}/>
    </dialog>
  </section>;
}
