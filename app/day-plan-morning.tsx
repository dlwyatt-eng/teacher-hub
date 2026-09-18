'use client';
import {useRef,useState} from 'react';
import {type DayPlan} from './day-plan-store';
import {shapeOfDayHref} from './classroom-navigation-state';
import ClassroomLiveStatus from './classroom-live-status';
import './day-plan-morning.css';

function blockIcon(title:string){
  if(/supplies/i.test(title))return '✎';
  if(/reading|booklet/i.test(title))return '▤';
  if(/chess|games|werewolf/i.test(title))return '♞';
  if(/DPA|outside/i.test(title))return '☀';
  if(/care|responsib|community/i.test(title))return '❧';
  if(/connect/i.test(title))return '✦';
  return '✧';
}

function GameVideoLinks(){
  return <><a href="https://www.youtube.com/watch?v=YdnvlntAQH8" target="_blank" rel="noopener noreferrer">Learn chess · ChessKid video ↗</a><a href="https://gathertogethergames.com/cribbage" target="_blank" rel="noopener noreferrer">Learn cribbage · video &amp; rules ↗</a></>;
}

export default function DayPlanMorning({plan}:{plan:DayPlan}){
  const [focused,setFocused]=useState<number|null>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  const block=focused===null?null:plan.blocks[focused];
  const showSteps=(index:number)=>{setFocused(index);dialog.current?.showModal();};
  return <section className="day-board" aria-labelledby="day-board-title">
    <header className="day-board-welcome">
      <div className="day-board-greeting"><p>WALNUT ROAD · GRADE 6</p><h1 id="day-board-title">{plan.greeting}</h1><p>{plan.arrival}</p>
        <svg className="day-board-landscape" viewBox="0 0 500 150" aria-hidden="true"><circle cx="390" cy="45" r="28" fill="#edc774"/><path d="M0 150 110 44 184 120 265 20 375 137 450 60 500 130V150Z" fill="#628879"/><path d="m215 77 50-57 47 50-33-13-13 14-19-26Z" fill="#e8eee0"/><path d="M0 150 85 85 180 150 335 92 425 150Z" fill="#315e50"/><g fill="#183e34"><path d="m38 145 22-45 22 45Zm20 0h5v5h-5Z"/><path d="m405 145 25-61 25 61Zm22 0h6v5h-6Z"/><path d="m450 145 19-45 19 45Zm17 0h4v5h-4Z"/></g></svg>
      </div>
      <ClassroomLiveStatus/>
    </header>
    {plan.id==='first-full-day'&&<a className="day-plan-update" href={shapeOfDayHref('first-full-day-flexible')}>Open our updated plan: supplies, games &amp; class choices →</a>}
    <div className="day-board-heading"><h2>Shape of our day</h2><p>{plan.date?`Plan for ${plan.date}`:'Our plan · room to adjust'}</p></div>
    <ol className="day-board-sequence">{plan.blocks.map((b,i)=><li key={i}>
      <span className="day-block-icon" aria-hidden="true">{blockIcon(b.title)}</span>
      <div><span className="day-block-time">{b.time}</span>{b.studentSteps?.length?<button className="day-block-title" onClick={()=>showSteps(i)}>{b.title}<span aria-hidden="true"> ↗</span></button>:b.href?<a className="day-block-title" href={b.href}>{b.title}<span aria-hidden="true"> →</span></a>:<strong className="day-block-title">{b.title}</strong>}</div>
    </li>)}</ol>
    <nav className="day-board-links" aria-label="Day activity shortcuts"><GameVideoLinks/><a href="?view=Games+%26+Activities&mode=student">Conversation cards</a><a href="?view=Responsibilities&mode=student">Our responsibilities</a><a href="?subject=English+Language+Arts&experience=werewolf-learn&mode=student">Werewolf · if we choose</a></nav>
    <dialog ref={dialog} className="day-step-dialog" aria-labelledby="day-step-title" onClick={e=>{if(e.target===dialog.current)dialog.current?.close();}}>
      <button className="day-step-close" onClick={()=>dialog.current?.close()} autoFocus>← Back to our day</button>
      {block&&<><p>{block.time}</p><h2 id="day-step-title">{block.title}</h2><ol>{block.studentSteps?.filter(s=>s.trim()).map((step,i)=><li key={i}>{step}</li>)}</ol>{/chess|cribbage|games together/i.test(block.title)&&<><nav className="day-board-links" aria-label="Learn our games"><GameVideoLinks/></nav><p>Pause to try each idea with your board or cards. For cribbage, start with the two-player tutorial.</p></>}{block.href&&<a href={block.href}>Open activity →</a>}</>}
    </dialog>
  </section>;
}
