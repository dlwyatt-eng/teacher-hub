"use client";

import Image from "next/image";
import { useState } from "react";
import { bloxelsStoryGame, priorPracticeBank, priorPracticeSummary, returningPracticeIds } from "./cross-curricular-program";
import { printClosest } from "./print-support";
import "./cross-curricular-projects.css";

const tabs = ["Project plan", "Teacher kit", "Curriculum & Spaces", "2025–26 activity bank"] as const;
type ProjectTab = (typeof tabs)[number];

const useLabels = {
  return: "RETURN",
  adapt: "ADAPT",
  "archive or reference": "ARCHIVE / REFERENCE",
} as const;

const evidenceLabels = {
  practice: "IN-CLASS PRACTICE",
  checkpoint: "CHECKPOINT",
  "portfolio option": "PORTFOLIO OPTION",
  "not student evidence": "SUPPORT / NOT STUDENT EVIDENCE",
} as const;

export default function CrossCurricularProjects() {
  const [tab, setTab] = useState<ProjectTab>("Project plan");
  const [bankFilter, setBankFilter] = useState("All");
  const returning = returningPracticeIds.map(id => priorPracticeBank.find(item => item.id === id)).filter(Boolean);
  const visibleBank = bankFilter === "All" ? priorPracticeBank : priorPracticeBank.filter(item => item.nextUse === bankFilter);

  return (
    <div className="page cross-projects-page">
      <section className="bloxels-project-hero">
        <div className="bloxels-hero-copy">
          <p className="eyebrow">RECURRING JANUARY ANCHOR · ELA + ADST</p>
          <h1>{bloxelsStoryGame.title}</h1>
          <blockquote>{bloxelsStoryGame.drivingQuestion}</blockquote>
          <p>{bloxelsStoryGame.summary}</p>
          <div className="bloxels-hero-tags"><span>ORIGINAL STORY</span><span>PLAYABLE DESIGN</span><span>TEST + REVISE</span><span>ONE SHARED POST</span></div>
        </div>
        <figure>
          <Image unoptimized src="/images/bloxels-story-world-v1.png" width={1672} height={941} priority alt="Original pixel-art story world with a young adventurer, forest path, bridge, glowing doorway, and safe destination in the distance" />
          <figcaption><b>ORIGINAL GENERATED PLANNING SCENE</b><span>Where might the beginning, problem, turning point, and ending occur?</span></figcaption>
        </figure>
      </section>

      <section className="bloxels-project-facts" aria-label="Bloxels project summary">
        <article><small>WHEN</small><strong>{bloxelsStoryGame.timing}</strong></article>
        <article><small>TIME</small><strong>{bloxelsStoryGame.duration}</strong></article>
        <article><small>PRIMARY SUBJECTS</small><strong>{bloxelsStoryGame.primarySubjects.join(" + ")}</strong></article>
        <article><small>SPACES EDU</small><strong>One combined ELA/ADST post</strong></article>
      </section>

      <nav className="cross-project-tabs" aria-label="Bloxels project sections">
        {tabs.map(item => <button key={item} className={tab === item ? "selected" : ""} onClick={() => setTab(item)}>{item}</button>)}
      </nav>

      {tab === "Project plan" && <>
        <section className="bloxels-plan-intro">
          <div><p className="section-kicker">THE NON-NEGOTIABLE</p><h2>Write first. Build small. Watch a player. Change the work.</h2><p>Bloxels is the familiar tool, but device time alone is not the ADST learning. The story and design become assessable when students plan, test, explain, and revise.</p></div>
          <aside><span>01</span><strong>ELA asks</strong><p>Does the story have a clear sequence, purposeful language, and a revision that improves the player&apos;s understanding?</p><span>02</span><strong>ADST asks</strong><p>Does testing reveal a design problem, and does the student use that evidence to improve the game?</p></aside>
        </section>

        <section className="bloxels-phase-section">
          <header><div><p className="section-kicker">STUDENT PATHWAY</p><h2>Eight short stages protect the thinking.</h2></div><span>{bloxelsStoryGame.duration}</span></header>
          <div>{bloxelsStoryGame.phases.map((phase, index) => <article key={phase.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{phase.title}</h3><p>{phase.studentMove}</p><footer><b>SHOW</b>{phase.evidence}</footer></article>)}</div>
        </section>

        <section className="bloxels-product-grid">
          <div><p className="section-kicker">WHAT THE PROJECT PRODUCES</p><h2>A short game plus visible design evidence.</h2><ul>{bloxelsStoryGame.products.map(item => <li key={item}>{item}</li>)}</ul></div>
          <aside><p className="section-kicker">EQUIVALENT ACCESS ROUTE</p><h3>A device cannot decide achievement.</h3><p>{bloxelsStoryGame.accessRoute}</p><strong>Assess the same story, route, testing, feedback, and revision thinking.</strong></aside>
        </section>

        <section className="bloxels-source-routes">
          <header><p className="section-kicker">OFFICIAL BLOXELS ROUTES</p><h2>Open each link for a specific job.</h2></header>
          <div>
            <a href="https://www.bloxels.com/education" target="_blank" rel="noreferrer"><span>OVERVIEW</span><strong>Bloxels Education</strong><p>Confirm current EDU features, private class sharing, and educator resources.</p><b>OPEN ↗</b></a>
            <a href="https://www.bloxels.com/education/storytelling-in-games-part-one" target="_blank" rel="noreferrer"><span>ARTICLE</span><strong>Storytelling in Games</strong><p>Use a short teacher-selected section to discuss how players experience stories through choices and actions.</p><b>OPEN ↗</b></a>
            <a href="https://hub.bloxels.com/" target="_blank" rel="noreferrer"><span>TEACHER HUB</span><strong>Class setup and review</strong><p>Set up school-managed access, view student work, and confirm the private sharing route before launch.</p><b>OPEN ↗</b></a>
            <a href="https://play.bloxels.com/" target="_blank" rel="noreferrer"><span>STUDENT APP</span><strong>Play and build on the web</strong><p>Test the exact school device route before students begin. Use the paper route if access is interrupted.</p><b>OPEN ↗</b></a>
          </div>
        </section>

        <section className="returning-practice-preview">
          <header><div><p className="section-kicker">RETURNING CLASSROOM PRACTICE</p><h2>Familiar projects remain part of the year.</h2><p>These are the strongest recurring families from the 2025–26 SpacesEDU list. Open the full bank to see every original title.</p></div><button onClick={() => setTab("2025–26 activity bank")}>Open all {priorPracticeSummary.originalRecordCount} records →</button></header>
          <div>{returning.map(item => item && <article key={item.id}><span>{item.timing}</span><h3>{item.family}</h3><p>{item.note}</p><footer>{item.subjects.map(subject => <b key={subject}>{subject}</b>)}</footer></article>)}</div>
        </section>
      </>}

      {tab === "Teacher kit" && <>
        <section className="bloxels-kit-heading">
          <div><p className="section-kicker">READY-TO-USE PROJECT KIT</p><h2>Everything on this page can be projected or printed.</h2><p>The remaining setup is real and visible: confirm licences, class accounts, privacy settings, device access, and the teacher-approved sharing route.</p></div>
          <button onClick={(event) => printClosest(event.currentTarget, ".cross-projects-page")}>Print the Bloxels kit</button>
        </section>

        <section className="bloxels-logistics">
          <article><span>PROVIDED HERE</span><ul>{bloxelsStoryGame.provided.map(item => <li key={item}>{item}</li>)}</ul></article>
          <article><span>TEACHER GATHERS / CONFIRMS</span><ul>{bloxelsStoryGame.gather.map(item => <li key={item}>{item}</li>)}<li>Current Bloxels licence, logins, class privacy, and family-view route</li></ul></article>
          <article><span>SHORT ROUTE</span><p>{bloxelsStoryGame.shortRoute}</p><strong>Do not shorten away the playtest or the two revisions.</strong></article>
        </section>

        <section className="bloxels-print-kit" id="bloxels-print-kit">
          {bloxelsStoryGame.printables.map((sheet, index) => <article key={sheet.title}><header><span>BLOXELS PROJECT PAGE {index + 1}</span><h3>{sheet.title}</h3><p>{sheet.purpose}</p></header><ol>{sheet.prompts.map(prompt => <li key={prompt}>{prompt}<i></i></li>)}</ol></article>)}
        </section>

        <section className="bloxels-word-bank">
          <header><p className="section-kicker">PROJECT WORD HELP</p><h2>Define the word before students need it.</h2></header>
          <div>{bloxelsStoryGame.words.map(word => <article key={word.term}><strong>{word.term}</strong><p>{word.meaning}</p><small><b>Example:</b> {word.example}</small></article>)}</div>
        </section>
      </>}

      {tab === "Curriculum & Spaces" && <>
        <section className="bloxels-curriculum-header">
          <div><p className="section-kicker">ONE PROJECT · TWO SEPARATE LENSES</p><h2>Do not blend ELA and ADST into one score.</h2><p>The same artifact can hold evidence for both subjects. Proficiency is still decided separately from the exact learning visible in each subject.</p></div>
          <div><a href="https://curriculum.gov.bc.ca/curriculum/english-language-arts/6/core" target="_blank" rel="noreferrer">Grade 6 ELA curriculum ↗</a><a href="https://curriculum.gov.bc.ca/curriculum/adst/6/core" target="_blank" rel="noreferrer">Grade 6 ADST curriculum ↗</a></div>
        </section>

        <section className="bloxels-curriculum-lenses">
          {bloxelsStoryGame.curriculumLenses.map((lens, index) => <article key={lens.subject}><header><span>{String(index + 1).padStart(2, "0")}</span><h3>{lens.subject}</h3></header><ul>{lens.lookFors.map(item => <li key={item}>{item}</li>)}</ul></article>)}
        </section>

        <section className="bloxels-spaces-card">
          <header><span>ONE REQUIRED COMBINED POST</span><h2>Bloxels Story-Game · ELA + ADST</h2><p>{bloxelsStoryGame.spaces.noDuplicateRule}</p></header>
          <div className="bloxels-spaces-grid">
            <section><small>CHOOSE ONE CLEAR ARTIFACT ROUTE</small>{bloxelsStoryGame.spaces.artifactChoices.map(item => <p key={item}>✓ {item}</p>)}</section>
            <section><small>INDIVIDUAL EXPLANATION</small><blockquote>{bloxelsStoryGame.spaces.individualPrompt}</blockquote></section>
          </div>
          <footer><small>CURRICULUM TAG OPTIONS · USE ONLY WHEN VISIBLE</small>{bloxelsStoryGame.spaces.curriculumTags.map(tag => <span key={tag}>{tag}</span>)}</footer>
        </section>

        <section className="bloxels-assessment-safeguards">
          <article><strong>Assess</strong><p>Story structure, clarity, purpose, testing evidence, troubleshooting, revision, process explanation, and individual contribution.</p></article>
          <article><strong>Do not assess as achievement</strong><p>Game length, pixel-art polish, playing skill, work completed at home, device speed, or access to paid tools.</p></article>
          <article><strong>Protect</strong><p>Use school-managed accounts and teacher-approved sharing. No full names, personal details, real student images, or uncredited copied characters.</p></article>
        </section>
      </>}

      {tab === "2025–26 activity bank" && <section className="prior-practice-bank">
        <header><div><p className="section-kicker">MR WYATT · DIVISION 8 · 2025–26 SPACES EDU REFERENCE</p><h2>{priorPracticeSummary.originalRecordCount} original records, organized into {priorPracticeSummary.familyCount} useful families.</h2><p>The archive keeps the familiar titles and curriculum-tag counts while separating reusable classroom learning from optional portfolio evidence and private support records.</p></div><div><strong>{priorPracticeBank.filter(item => item.nextUse === "return").length}</strong><span>families ready to return</span></div></header>
        <nav aria-label="Filter prior practice bank">{["All", "return", "adapt", "archive or reference"].map(item => <button key={item} className={bankFilter === item ? "selected" : ""} onClick={() => setBankFilter(item)}>{item === "All" ? `All ${priorPracticeSummary.familyCount} families` : useLabels[item as keyof typeof useLabels]}</button>)}</nav>
        <div className="prior-practice-legend"><span className="role-portfolio-option">PORTFOLIO OPTION</span><span className="role-checkpoint">CHECKPOINT</span><span className="role-practice">IN-CLASS PRACTICE</span><span className="role-not-student-evidence">SUPPORT / NOT STUDENT EVIDENCE</span></div>
        <div className="prior-practice-grid">{visibleBank.map(item => <article key={item.id} className={`practice-${item.nextUse.replaceAll(" ", "-")} role-${item.evidenceRole.replaceAll(" ", "-")}`}><header><span>{useLabels[item.nextUse]}</span><b>{evidenceLabels[item.evidenceRole]}</b></header><small>{item.timing} · {item.kind}</small><h3>{item.family}</h3><p>{item.note}</p><div className="practice-subjects">{item.subjects.map(subject => <span key={subject}>{subject}</span>)}</div><details><summary>{item.originals.length} original {item.originals.length === 1 ? "title" : "titles"} ▾</summary>{item.originals.map(original => <p key={original.title}><strong>{original.title}</strong>{original.curriculumTags !== undefined && <span>{original.curriculumTags} curriculum {original.curriculumTags === 1 ? "tag" : "tags"}</span>}</p>)}</details></article>)}</div>
        <footer><strong>Important distinction</strong><span>ELL/LST records, teacher tracking, review status, and sensitive PHE information may belong in private workflows. They are not whole-class portfolio highlights.</span></footer>
      </section>}
    </div>
  );
}
