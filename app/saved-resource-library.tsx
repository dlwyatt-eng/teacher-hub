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
  <section className="saved-resource-worksheet-bank" aria-labelledby="worksheet-bank-title">
   <p className="eyebrow">LOW-INK STUDENT PRINTABLES</p>
   <h2 id="worksheet-bank-title">Six-page worksheet bank</h2>
   <p>Choose one undated page for a short block. White backgrounds, name/date blanks and space to explain thinking. Pencil only; a ruler is optional.</p>
   <ul>
    <li><strong>Fractions reasoning</strong> · PDF pages 1–2 · 12–18 minutes each: benchmarks and explaining an addition error.</li>
    <li><strong>Reading with evidence</strong> · PDF pages 3–4 · 15–20 minutes each: a short story and a library-trial report.</li>
    <li><strong>Independent practice</strong> · PDF pages 5–6 · 8–12 minutes each: fraction constraints and precise drawing directions.</li>
   </ul>
   <a className="saved-resource-open" href="/printables/worksheet-bank-1-student.pdf" download>Download six student worksheets (PDF)</a>
   <p className="worksheet-bank-print-note">Print selected pages at actual size on Letter paper, or Fit on A4. Student pages only. For the fraction tasks, review equivalent fractions first if needed.</p>
  </section>
  <section className="saved-resource-colouring" aria-labelledby="colouring-puzzles-title">
   <p className="eyebrow">CHOOSE A PAGE · KEEP A COPY</p>
   <h2 id="colouring-puzzles-title">Colouring &amp; Puzzles</h2>
   <p>Ready-to-download student pages. Open a PDF, pick the pages you want, and print only those.</p>
   <div className="saved-resource-grid">
    <article>
     <p className="eyebrow">20 PAGES · LETTER · PORTRAIT</p>
     <h3>Otherworlds colouring collection</h3>
     <p>Explore ocean depths, future neighbourhoods, tiny habitats and imagined worlds. Twenty detailed, low-ink colouring scenes for older kids.</p>
     <a className="saved-resource-open" href="/printables/otherworlds-colouring.pdf" download>Download Otherworlds (PDF)</a>
    </article>
    <article>
     <p className="eyebrow">8 PAGES · LETTER · PORTRAIT</p>
     <h3>Winter Puzzle Club</h3>
     <p>Five puzzle and design pages, then three colouring pages. Try a logic grid, picture puzzle, cipher, route challenge or fraction design.</p>
     <a className="saved-resource-open" href="/printables/winter-puzzle-club.pdf" download>Download Winter Puzzle Club (PDF)</a>
    </article>
   </div>
   <p className="worksheet-bank-print-note">Both PDFs: Letter (8½ × 11 in). Print selected pages at actual size on Letter, or choose Fit on A4. Student pages only; no answer keys.</p>
  </section>
  <div className="saved-resource-filters"><label>Search resources<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try ratios, drawing, division or sub plans" /></label><label>Subject<select value={category} onChange={e=>setCategory(e.target.value)}>{['All subjects',...new Set(savedResourceIndex.map(r=>r.category))].map(c=><option key={c}>{c}</option>)}</select></label></div>
  <p role="status">{items.length} of {savedResourceIndex.length} resources</p>
  <details className="saved-resource-review-note"><summary>About this review and file access</summary><p>Reviewed September 13, 2026 using the supplied files’ extractable content. Image-heavy or unreadable files are marked “Preview needed.” This is not a claim that every page or answer has been visually checked.</p><p>Google Drive controls access to these teaching copies. Opening a link does not change sharing. Other teachers should use their own licensed copies.</p></details>
  <div className="saved-resource-grid">{items.map(r=><article key={r.id}><div className="saved-resource-badges"><span>{r.category}</span><strong data-fit={r.fit}>{r.fit}</strong></div><h2>{r.title}</h2><a className="saved-resource-open" href={r.url} target="_blank" rel="noreferrer">Open teaching copy ↗</a><p>{r.use}</p><p><b>Before using:</b> {r.note}</p><details><summary>Original filename &amp; review scope</summary><p>{r.originalTitle}</p><small>{r.review}</small></details></article>)}</div>
  {!items.length&&<p>No matches. Try a shorter search or choose All subjects.</p>}
 </div>;
}
