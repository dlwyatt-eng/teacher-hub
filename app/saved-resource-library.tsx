"use client";
import {useState} from 'react';
import {savedResourceIndex} from './saved-resource-index';
import './saved-resource-library.css';

export default function SavedResourceLibrary({onHome}:{onHome:()=>void}) {
 const [query,setQuery]=useState('');
 const [category,setCategory]=useState('All subjects');
 const items=savedResourceIndex.filter(r=>(category==='All subjects'||r.category===category)&&`${r.title} ${r.originalTitle} ${r.use} ${r.note}`.toLowerCase().includes(query.trim().toLowerCase()));
 return <div className="page saved-resource-library">
  <button className="back-link" onClick={onHome}>← Teacher Home</button>
  <header><p className="eyebrow">YOUR TEACHING MATERIALS</p><h1>Saved Resources</h1><p>Find the file, see where it fits, and open your teaching copy.</p><a href="?subject=Mathematics">Open math lessons, worksheets &amp; games →</a><nav className="saved-resource-downloads" aria-label="Reviewed resource downloads"><a href="https://drive.google.com/file/d/1iOMu49HqdI5EqpvdFHSHKVTFL3FvCIbC/view" target="_blank" rel="noreferrer">My Math Antics archive · 174 PDFs ↗</a><a href="https://drive.google.com/file/d/1t5B7pw-utGH-pRD5tVnZ_Ro-QfpDpruP/view" target="_blank" rel="noreferrer">Resource review &amp; page-selection guide ↗</a></nav></header>
  <div className="saved-resource-filters"><label>Search resources<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try ratios, drawing, division or sub plans" /></label><label>Subject<select value={category} onChange={e=>setCategory(e.target.value)}>{['All subjects',...new Set(savedResourceIndex.map(r=>r.category))].map(c=><option key={c}>{c}</option>)}</select></label></div>
  <p role="status">{items.length} of {savedResourceIndex.length} resources</p>
  <details className="saved-resource-review-note"><summary>About this review and file access</summary><p>Reviewed September 13, 2026 using the supplied files’ extractable content. Image-heavy or unreadable files are marked “Preview needed.” This is not a claim that every page or answer has been visually checked.</p><p>Google Drive controls access to these teaching copies. Opening a link does not change sharing. Other teachers should use their own licensed copies.</p></details>
  <div className="saved-resource-grid">{items.map(r=><article key={r.id}><div className="saved-resource-badges"><span>{r.category}</span><strong data-fit={r.fit}>{r.fit}</strong></div><h2>{r.title}</h2><a className="saved-resource-open" href={r.url} target="_blank" rel="noreferrer">Open teaching copy ↗</a><p>{r.use}</p><p><b>Before using:</b> {r.note}</p><details><summary>Original filename &amp; review scope</summary><p>{r.originalTitle}</p><small>{r.review}</small></details></article>)}</div>
  {!items.length&&<p>No matches. Try a shorter search or choose All subjects.</p>}
 </div>;
}
