'use client';
import {useEffect,useRef,useState} from 'react';
import {isSafeDayHref,studentDayMaterial,type DayBlock,type DayPlan} from './day-plan-store';
import {dayPlanStatus,shapeOfDayHref} from './classroom-navigation-state';
import ClassroomLiveStatus from './classroom-live-status';
import './day-plan-morning.css';

const KOREAN_SUPPORT_KEY='wyatt-day-board-korean-support-v1';

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

function FirstAction({block,koreanSupport}:{block:DayBlock;koreanSupport:boolean}){
  if(!block.firstAction?.trim())return null;
  return <div className="day-first-action"><strong>Start here</strong><p lang="en">{block.firstAction}</p>{koreanSupport&&block.firstActionKo?.trim()&&<p className="day-korean" lang="ko">{block.firstActionKo}</p>}</div>;
}

function DayMaterialLinks({block,includeReference=true}:{block:DayBlock;includeReference?:boolean}){
  const activity=studentDayMaterial(block.activity);
  const worksheet=studentDayMaterial(block.worksheet);
  const reference=includeReference&&block.href&&isSafeDayHref(block.href)?block.href:null;
  if(!activity&&!worksheet&&!reference)return null;
  return <nav className="day-material-links" aria-label={`${block.title} materials`}>
    {activity&&<a className="day-material-link" href={activity.href} target={activity.href.startsWith('https://')?'_blank':undefined} rel={activity.href.startsWith('https://')?'noopener noreferrer':undefined}><span>Open activity <span aria-hidden="true">→</span></span><strong>{activity.label}</strong></a>}
    {worksheet&&<a className="day-material-link day-material-worksheet" href={worksheet.href} target="_blank" rel="noopener noreferrer"><span>Open worksheet to print <span aria-hidden="true">↗</span></span><strong>{worksheet.label}</strong></a>}
    {reference&&<a className="day-full-lesson" href={reference} target={reference.startsWith('https://')?'_blank':undefined} rel={reference.startsWith('https://')?'noopener noreferrer':undefined}>Full lesson / reference <span aria-hidden="true">→</span></a>}
  </nav>;
}

export function DayBlockDetails({block,koreanSupport=false}:{block:DayBlock;koreanSupport?:boolean}){
  const steps=block.studentSteps?.filter(s=>s.trim())??[];
  return <><p>{block.time}</p><h2 id="day-step-title">{block.title}{koreanSupport&&block.titleKo?.trim()&&<span className="day-korean" lang="ko">{block.titleKo}</span>}</h2><FirstAction block={block} koreanSupport={koreanSupport}/><DayMaterialLinks block={block}/>{steps.length>0&&<ol>{steps.map((step,i)=><li key={i}>{step}</li>)}</ol>}{/chess|cribbage|games together/i.test(block.title)&&<><nav className="day-board-links" aria-label="Learn our games"><GameVideoLinks/></nav><p>Pause to try each idea with your board or cards. For cribbage, start with the two-player tutorial.</p></>}</>;
}

export default function DayPlanMorning({plan,initialKoreanSupport=false}:{plan:DayPlan;initialKoreanSupport?:boolean}){
  // The minute-by-minute refresh can recreate an unchanged device-local plan.
  const planKey=JSON.stringify(plan);
  const [focused,setFocused]=useState<{planKey:string;index:number}|null>(null);
  const [koreanSupport,setKoreanSupport]=useState(initialKoreanSupport);
  const dialog=useRef<HTMLDialogElement>(null);
  // Do not show an old task, even for the render before the plan-change effect.
  const block=focused?.planKey===planKey?plan.blocks[focused.index]:null;
  useEffect(()=>{
    try{
      const saved=window.localStorage.getItem(KOREAN_SUPPORT_KEY);
      if(saved==='true'||saved==='false')setKoreanSupport(saved==='true');
    }catch{/* Language support works when device storage is unavailable. */}
  },[]);
  useEffect(()=>{setFocused(null);dialog.current?.close();},[planKey]);
  useEffect(()=>{if(block&&!dialog.current?.open)dialog.current?.showModal();},[block]);
  const toggleKorean=()=>{
    const next=!koreanSupport;
    setKoreanSupport(next);
    try{window.localStorage.setItem(KOREAN_SUPPORT_KEY,String(next));}catch{/* Keep the display usable without storage. */}
  };
  return <section className="day-board" aria-labelledby="day-board-title">
    <p className="day-plan-date"><strong>{dayPlanStatus(plan)}</strong>{plan.date && <> · <time dateTime={plan.date}>{plan.date}</time></>}</p>
    <header className="day-board-welcome">
      <div className="day-board-greeting"><p>WALNUT ROAD · GRADE 6</p><h1 id="day-board-title">{plan.greeting}</h1><p>{plan.arrival}</p>
        <svg className="day-board-landscape" viewBox="0 0 500 150" aria-hidden="true"><circle cx="390" cy="45" r="28" fill="#edc774"/><path d="M0 150 110 44 184 120 265 20 375 137 450 60 500 130V150Z" fill="#628879"/><path d="m215 77 50-57 47 50-33-13-13 14-19-26Z" fill="#e8eee0"/><path d="M0 150 85 85 180 150 335 92 425 150Z" fill="#315e50"/><g fill="#183e34"><path d="m38 145 22-45 22 45Zm20 0h5v5h-5Z"/><path d="m405 145 25-61 25 61Zm22 0h6v5h-6Z"/><path d="m450 145 19-45 19 45Zm17 0h4v5h-4Z"/></g></svg>
      </div>
      <ClassroomLiveStatus/>
    </header>
    {plan.id==='first-full-day'&&<a className="day-plan-update" href={shapeOfDayHref('first-full-day-flexible')}>Open our updated plan: supplies, games &amp; class choices →</a>}
    <div className="day-board-heading"><div><h2>Shape of our day</h2><p>{plan.date?`Plan for ${plan.date}`:'Our plan · room to adjust'}</p></div><button type="button" className="day-language-toggle" aria-pressed={koreanSupport} onClick={toggleKorean}>English + <span lang="ko">한국어</span><span className="day-language-state">{koreanSupport?'On':'Off'}</span></button></div>
    <ol className="day-board-sequence">{plan.blocks.map((b,i)=>{
      const hasDetails=!!(b.studentSteps?.some(s=>s.trim())||b.firstAction?.trim()||studentDayMaterial(b.activity)||studentDayMaterial(b.worksheet));
      const reference=b.href&&isSafeDayHref(b.href)?b.href:null;
      return <li key={i}>
        <span className="day-block-icon" aria-hidden="true">{blockIcon(b.title)}</span>
        <div className="day-block-content"><span className="day-block-time">{b.time}</span>{hasDetails?<button type="button" className="day-block-title" aria-haspopup="dialog" onClick={()=>setFocused({planKey,index:i})}>{b.title}<span className="day-block-open-hint">What to do →</span></button>:reference?<a className="day-block-title" href={reference} target={reference.startsWith('https://')?'_blank':undefined} rel={reference.startsWith('https://')?'noopener noreferrer':undefined}>{b.title}<span aria-hidden="true"> →</span></a>:<strong className="day-block-title">{b.title}</strong>}{koreanSupport&&b.titleKo?.trim()&&<p className="day-block-korean day-korean" lang="ko">{b.titleKo}</p>}<DayMaterialLinks block={b} includeReference={false}/></div>
      </li>;
    })}</ol>
    <nav className="day-board-links" aria-label="Day activity shortcuts"><GameVideoLinks/><a href="?view=Games+%26+Activities&mode=student">Conversation cards</a><a href="?view=Responsibilities&mode=student">Our responsibilities</a><a href="?subject=English+Language+Arts&experience=werewolf-learn&mode=student">Werewolf · if we choose</a></nav>
    <dialog ref={dialog} className="day-step-dialog" aria-labelledby="day-step-title" onClose={()=>setFocused(null)} onClick={e=>{if(e.target===dialog.current)dialog.current?.close();}}>
      <button type="button" className="day-step-close" onClick={()=>dialog.current?.close()} autoFocus>← Back to our day</button>
      {block&&<DayBlockDetails block={block} koreanSupport={koreanSupport}/>}
    </dialog>
  </section>;
}
