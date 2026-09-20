'use client';
import {useEffect,useRef,useState} from 'react';
import {categoryLabels,communityCards,type CardCategory} from './community-cards';
import CommunityArt from './community-art';
import './games-activities.css';
import BelongingSequence from './belonging-sequence';
import CommunityPractice,{CommunityPracticeLinks,WorkMusicResources} from './community-practice';
export default function GamesActivities({projector=false}:{projector?:boolean}){
 const deck=typeof window==='undefined'?'':new URLSearchParams(window.location.search).get('deck');
 if(deck==='belonging-sequence')return <BelongingSequence projector={projector}/>;
 if(deck==='agreements'||deck==='nvc'||deck==='belonging')return <CommunityPractice key={deck} deck={deck} projector={projector}/>;
 if(deck==='music'&&!projector)return <WorkMusicResources/>;
 return <ConnectionCards projector={projector}/>;
}
function ConnectionCards({projector=false}:{projector?:boolean}){
 const initial=()=>{const p=new URLSearchParams(window.location.search).get('deck');return p==='similar'||p==='different'||p==='rather'?p:'similar';};
 const [category,setCategory]=useState<CardCategory>(typeof window==='undefined'?'similar':initial),[index,setIndex]=useState(0),[follow,setFollow]=useState(false),[status,setStatus]=useState('');const surface=useRef<HTMLElement>(null);
 const cards=communityCards.filter(c=>c.category===category),card=cards[index];
 const move=(delta:number)=>{setIndex(i=>(i+delta+cards.length)%cards.length);setFollow(false);};
 const choose=(value:CardCategory)=>{setCategory(value);setIndex(0);setFollow(false);const url=new URL(window.location.href);url.searchParams.set('deck',value);window.history.replaceState(window.history.state,'',url);};
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.target instanceof HTMLElement&&e.target.closest('input,textarea,select,button,a')||e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='ArrowRight'){e.preventDefault();move(1);}if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[cards.length]);
 return <section ref={surface} className={`games-page ${projector?'games-projector':''}`}><CommunityPracticeLinks projector={projector}/><header className="games-heading"><div><p>QUICK CONNECTIONS · GRADE 6</p><h1>Games &amp; Activities</h1></div><a href="?view=Day+Plans">Day plans</a></header>
 {!projector&&<details className="games-guide" open><summary>Ready to run · 2 minutes or a whole block</summary><p><strong>Think → Move → Find → Ask → Listen.</strong> Walk safely, include anyone waiting and ask the follow-up before moving on. Change partners. Students may stay seated, point or pass. Similarities build connections; differences are a chance to be curious.</p><p>For Would You Rather, point to a choice, move to a teacher-selected area or tell a partner. Explain one reason; changing your mind is welcome. Try all three decks within an hour, or choose just a few cards. Learning preferences can change with the task.</p><p>Use these for first week, transitions, a class reset, oral language, TOC days or a few spare minutes. Stop when the purpose is met.</p><nav><a href="?subject=English+Language+Arts&experience=werewolf-learn">Werewolf lessons</a><a href="?view=First+Week+Mission">Discovery Booklets</a><a href="?view=TOC+%26+Emergency+Plans">TOC resources</a><a href="?view=Responsibilities">Responsibilities</a></nav></details>}
 <nav className="games-decks" aria-label="Choose a card deck">{(Object.keys(categoryLabels) as CardCategory[]).map(c=><button key={c} aria-pressed={category===c} onClick={()=>choose(c)}>{categoryLabels[c]} <span>{communityCards.filter(x=>x.category===c).length}</span></button>)}</nav>
 <article className={`conversation-card card-${category}`} aria-label={`Card ${index+1} of ${cards.length}`}><div className="conversation-copy"><p className="card-eyebrow">{categoryLabels[category]} · {index+1} / {cards.length}</p><h2>{card.prompt}</h2>{(category!=='rather'||follow)&&<div className="card-follow"><strong>Ask, then listen</strong><p>{card.followUp}</p></div>}{category==='rather'&&!follow&&<button className="card-reveal" onClick={()=>setFollow(true)}>Ask a follow-up</button>}</div><CommunityArt theme={card.art} variant={index}/></article>
 <nav className="games-controls" aria-label="Card controls"><button onClick={()=>move(-1)}>← Previous</button><span aria-live="polite">Card {index+1} of {cards.length}</span><button onClick={()=>move(1)}>Next →</button><button onClick={()=>{setIndex(i=>(i+1+Math.floor(Math.random()*(cards.length-1)))%cards.length);setFollow(false);}}>Random card</button><button onClick={async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(surface.current?.requestFullscreen)await surface.current.requestFullscreen();else setStatus('Use Teach / Project and your browser full-screen control.');}catch{setStatus('Use your browser full-screen control.');}}}>Full screen</button>{!projector&&<a href={`?view=Games+%26+Activities&mode=student&deck=${category}`}>Teach / Project</a>}</nav><p role="status">{status}</p>
 {index===cards.length-1&&<button className="games-next-deck" onClick={()=>choose(category==='similar'?'different':category==='different'?'rather':'similar')}>Continue to {categoryLabels[category==='similar'?'different':category==='different'?'rather':'similar']} →</button>}
 </section>;
}
