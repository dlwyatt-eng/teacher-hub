"use client";
import { useState } from 'react';
import { mathSupportPacks, mathPacksFor } from './math-program-supports';
import { mathAnticsPlans } from './math-antics-year';
import { mathAnticsCatalogue } from './math-antics-catalogue';
import { mathAnticsDownloadLinks } from './math-antics-download-links';
import { games, readyGameIds } from './math-games';
import { savedMathResources } from './math-saved-resources';
import { worksheetCompanions } from './math-worksheet-companions';
import { printClosest } from './print-support';
import ScoreboardRuleLab from './math-scoreboard-lab';
import { StudentMathPack } from './math-program';

const equivalentPlan: Record<string,string> = {
  'one-step-equations-pack':'pattern-relations-pack',
  'formula-perimeter-pack':'polygon-classification-pack',
  'area-recompose-pack':'polygon-classification-pack',
  'first-quadrant-transformations-pack':'integer-number-line-pack',
};
function slugsFor(id: string, experienceId?: string) {
  if (experienceId === "scoreboard-rules") return ["order-of-operations"] as const;
  if (experienceId === "sale-lab") return ["what-are-percentages", "finding-a-percent-of-a-number"] as const;
  // Keep adjacent unit videos out of an individual skill session.
  const choices = mathAnticsPlans[id] ?? mathAnticsPlans[equivalentPlan[id]];
  const exact: Record<string, (keyof typeof mathAnticsCatalogue)[]> = {
    'one-step-equations-pack':['solving-basic-equations-1'],
    'pattern-relations-pack':['number-patterns'],
    'polygon-classification-pack':['polygons'],
    'formula-perimeter-pack':['perimeter'],
    'area-recompose-pack':['area'],
    'first-quadrant-transformations-pack':['graphing-on-the-coordinate-plane'],
    'integer-number-line-pack':['negative-numbers','graphing-on-the-coordinate-plane'],
  };
  return exact[id] ?? choices?.core ?? [];
}

export function MathWorksheetDiscussion({ packId, teacher = false }: { packId: string; teacher?: boolean }) {
  const task = worksheetCompanions[packId];
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  if (!task) return null;
  const stages = ['Discuss a problem','Use your worksheet','Quick check'];
  return <section className="math-sheet-discussion" data-step={step}>
    <header><div><small>WORKSHEET COMPANION · PAPER, TALK AND A PENCIL</small><h2>{task.title}</h2></div><button type="button" onClick={e=>printClosest(e.currentTarget,'.math-sheet-discussion')}>Print discussion &amp; check</button></header>
    <nav aria-label="Worksheet companion steps">{stages.map((s,i)=><button type="button" key={s} aria-pressed={i===step} onClick={()=>{setStep(i);setRevealed(false);}}>{i+1} · {s}</button>)}</nav>
    <article className="math-sheet-step" data-current={step===0}><small>THINK · SKETCH · EXPLAIN</small><h3>{task.prompt}</h3><p>Try on your own first. Compare your explanation with a partner.</p></article>
    <article className="math-sheet-step" data-current={step===1}><small>PRACTISE THE SKILL</small><h3>Work on the questions your teacher has selected.</h3><p>Show your method for one question. Mark a question you want to discuss. Compare methods before checking answers.</p>{teacher && <p className="math-sheet-teacher-note"><strong>Choose the practice:</strong> {task.paper}</p>}</article>
    <article className="math-sheet-step" data-current={step===2}><small>TRY THIS ON YOUR OWN</small><h3>{task.check}</h3><p>Show a calculation, drawing or explanation. Hand it to your teacher; no online post is needed.</p></article>
    {step!==1 && <div className="math-sheet-answer"><button type="button" aria-expanded={revealed} onClick={()=>setRevealed(v=>!v)}>{revealed?'Hide explanation':'Reveal after discussing'}</button>{revealed && <p>{step===0?task.answer:task.checkAnswer}</p>}</div>}
  </section>;
}

export function MathResourceWorkbench({ experienceId, allTopics = false, projector = false }: { experienceId?: string; allTopics?: boolean; projector?: boolean }) {
  const scoped = experienceId ? mathPacksFor(experienceId) : [];
  const choices = allTopics ? mathSupportPacks : experienceId === "sale-lab" ? scoped.filter(p=>p.id==="decimal-operations-pack") : scoped;
  const [selection, setSelection] = useState(choices.find(p=>p.role!=='MATHUP / WNCP BRIDGE')?.id ?? choices[0]?.id ?? '');
  const pack = choices.find(p=>p.id===selection) ?? choices[0];
  const [panel, setPanel] = useState(projector ? '' : 'worksheets');
  if (!pack) return null;
  const companionId = experienceId && worksheetCompanions[experienceId] ? experienceId : pack.id;
  const task = worksheetCompanions[companionId];
  const activityChoices = games.filter(g=>experienceId === 'sale-lab' ? ['budget-choice','ratio-batches'].includes(g.id) : (g.units.includes(pack.id) || (['formula-perimeter-pack','area-recompose-pack'].includes(pack.id)&&g.units.includes('polygon-classification-pack'))));
  const saved = savedMathResources.filter(r=>r.packIds.includes(pack.id));
  const tabs = [{id:'worksheets',label:'Worksheets & videos'}, {id:'games',label:'Games & tools'}, ...(!projector?[{id:'saved',label:'Saved teaching resources'}]:[]), {id:'practice',label:'Hub examples & practice'}];
  return <section className={`math-workbench ${projector?'math-workbench--projector':''}`} aria-label="Mathematics teaching resources">
    <header><div><small>{allTopics?'MATH RESOURCE LIBRARY':'OPEN FOR THIS LESSON'}</small><h2>{projector?'Worksheets, videos and games': 'Choose your teaching materials'}</h2></div>
    <label>Topic<select value={pack.id} onChange={e=>setSelection(e.target.value)}>{choices.map(p=><option key={p.id} value={p.id}>{experienceId && worksheetCompanions[experienceId] ? worksheetCompanions[experienceId].title : worksheetCompanions[p.id]?.title??p.shortTitle}{p.role==='MATHUP / WNCP BRIDGE'?' · optional bridge':''}</option>)}</select></label></header>
    <nav className="math-workbench-tabs" aria-label="Math resources">{tabs.map(t=><button type="button" key={t.id} aria-expanded={panel===t.id} onClick={()=>setPanel(panel===t.id?'':t.id)}>{t.label}{t.id==='saved'&&saved.length?` (${saved.length})`:''}</button>)}</nav>
    {panel==='worksheets' && <div className="math-workbench-panel"><div className="math-workbench-grid">{slugsFor(pack.id,experienceId).map(slug=>{const video=mathAnticsCatalogue[slug];const links=mathAnticsDownloadLinks[slug];return <article key={slug}><small>MATH ANTICS</small><h3>{video.title}</h3><div className="math-workbench-links">{links?.worksheets && <a href={links.worksheets} target="_blank" rel="noreferrer">Worksheet PDF ↗</a>}<a href={video.youtube} target="_blank" rel="noreferrer">Watch video ↗</a><a href={video.url} target="_blank" rel="noreferrer">Lesson &amp; exercises ↗</a>{!projector&&links?.answers&&<a className="math-key-link" href={links.answers} target="_blank" rel="noreferrer">Teacher answer key ↗</a>}</div></article>;})}</div><p>{task?.paper}</p><p className="math-access-note">Math Antics worksheets require your membership. Sign in on Math Antics if prompted. Files open on the publisher’s site.</p></div>}
    {panel==='games'&&<div className="math-workbench-panel"><div className="math-workbench-grid">{activityChoices.map(g=><article key={g.id}><small>{readyGameIds.has(g.id)?'READY-MADE GAME':'OPEN TOOL + CLASS CHALLENGE'}</small><h3>{g.title}</h3><a className="math-play-link" href={g.url} target="_blank" rel="noreferrer">Open {readyGameIds.has(g.id)?'game':'tool'} ↗</a><p>{g.start}</p><p><strong>Whole class:</strong> {g.together}</p><details><summary>Paper version &amp; support</summary><p>{g.fallback}</p><p>{g.support}</p><p><strong>Finish:</strong> {g.check}</p></details></article>)}</div>{!activityChoices.length&&<p>Use the Hub example and paper practice for this topic. Browse another topic for previously taught game practice.</p>}</div>}
    {panel==='saved'&&!projector&&<div className="math-workbench-panel"><p>These links open your teaching copies in Google Drive. Google Drive controls access; other teachers need their own licensed copies.</p><p><a href="?view=Saved+Resources">Browse all 59 saved resources →</a></p>{saved.length?<div className="math-workbench-grid">{saved.map(r=><article key={r.id}><h3>{r.title}</h3><a href={r.url} target="_blank" rel="noreferrer">Open saved resource ↗</a><p>{r.use}</p><p><strong>Before using:</strong> {r.note}</p></article>)}</div>:<p>No uploaded file has been matched to this exact topic. The Math Antics and Hub practice options are above.</p>}</div>}
    {panel==='practice'&&<div className="math-workbench-panel">{experienceId==='scoreboard-rules'?<ScoreboardRuleLab />:experienceId==='sale-lab'?<SalePractice />:<StudentMathPack key={pack.id} pack={pack} />}</div>}
    {!projector&&<><div className="math-workbench-fast-games"><strong>Quick game/tool:</strong>{activityChoices.slice(0,3).map(g=><a key={g.id} href={g.url} target="_blank" rel="noreferrer">{g.title} ↗</a>)}{!activityChoices.length&&<span>Use the Hub practice tab for this topic.</span>}</div><MathWorksheetDiscussion key={pack.id} packId={companionId} teacher /></>}
  </section>;
}

export function MathCompanionSelector({ packIds, experienceId }: { packIds: string[]; experienceId?: string }) {
  const [selected, setSelected] = useState(packIds[0]);
  const id = packIds.includes(selected) ? selected : packIds[0];
  if (!id) return null;
  if (experienceId && worksheetCompanions[experienceId]) return <MathWorksheetDiscussion packId={experienceId} />;
  return <div>{packIds.length > 1 && <label className="math-companion-topic">Discussion topic <select value={id} onChange={e=>setSelected(e.target.value)}>{packIds.map(p=><option key={p} value={p}>{worksheetCompanions[p]?.title ?? p}</option>)}</select></label>}<MathWorksheetDiscussion key={id} packId={id} /></div>;
}

function SalePractice() {
 const [show,setShow]=useState(false);
 return <section><h3>Worked example: 25% off $40</h3><p>Split $40 into four equal $10 parts. A 25% discount removes one part. Three parts remain: $30 to pay.</p><div className="math-sale-model" aria-label="Four equal ten-dollar parts; one is the discount and three remain">{[0,1,2,3].map(i=><span key={i}>{i===0?'$10 discount':'$10 to pay'}</span>)}</div><h3>Try together</h3><p>A $60 kit is 25% off. Draw four equal parts. Label the discount and the final price. Ignore tax.</p><h3>Try on your own</h3><p>An $80 game is 10% off. Find the discount and the final price. Explain why you subtract only the discount.</p><button type="button" aria-expanded={show} onClick={()=>setShow(!show)}>Check after trying</button>{show&&<p className="math-sheet-answer">Kit: $15 off, $45 to pay. Game: $8 off, $72 to pay. The discount is the amount removed from the original price.</p>}</section>;
}
