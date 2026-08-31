"use client";

import { useState } from "react";
import { schoolAIActivities, schoolAICreationPack } from "./schoolai-activities";
import "./ai-activity-studio.css";

export default function AiActivityStudio({ onHome, initialActivityId }: { onHome: () => void; initialActivityId?: string }) {
  const initialId = schoolAIActivities.some((activity) => activity.id === initialActivityId) ? initialActivityId! : schoolAIActivities[0].id;
  const [selectedId, setSelectedId] = useState(initialId);
  const [copyMessage, setCopyMessage] = useState("");
  const activity = schoolAIActivities.find((item) => item.id === selectedId) ?? schoolAIActivities[0];
  const promptReadyCount = schoolAIActivities.filter((item) => item.status === "prompt-ready").length;
  const liveStudentLinkCount = schoolAIActivities.filter((item) => Boolean(item.studentLaunchUrl)).length;
  const activityStatus = `${activity.status.replaceAll("-", " ").toUpperCase()} · ${activity.studentLaunchUrl ? "TESTED STUDENT LINK READY" : "STUDENT LINK NEEDED"}`;

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label} copied. Paste it into SchoolAI.`);
    } catch {
      setCopyMessage("Copy was blocked in this browser. Select the text in the instructions box instead.");
    }
  };

  return <div className="page ai-studio">
    <button className="back-link" onClick={onHome}>← Back to dashboard</button>
    <header className="ai-studio-hero">
      <div><p className="section-kicker">TEACHER-ONLY · SCHOOLAI ACTIVITY STUDIO</p><h1>Prepare the thinking here. Launch it there.</h1><p>Each pilot begins with authentic classroom evidence, uses AI for a specific responsive purpose, and ends with student-owned human work. No student link is active until you create, test, and launch the Space.</p></div>
      <aside><small>PILOT READINESS</small><strong>{promptReadyCount} prompt-ready {promptReadyCount === 1 ? "pack" : "packs"}</strong><span>{liveStudentLinkCount} tested student {liveStudentLinkCount === 1 ? "link" : "links"}</span></aside>
    </header>

    <section className="ai-workflow" aria-label="Manual SchoolAI workflow">
      {[
        ["1", "Choose", "Select a lesson where responsive dialogue adds value."],
        ["2", "Create", "Copy the opening and instructions into SchoolAI."],
        ["3", "Test", "Try strong, vague, incorrect, off-task, and answer-seeking responses."],
        ["4", "Launch", "Copy the student-facing URL—not the teacher/edit link."],
        ["5", "Connect", "Return the URL here so it can be added to the lesson."],
      ].map(([number, title, detail]) => <article key={number}><b>{number}</b><div><strong>{title}</strong><p>{detail}</p></div></article>)}
    </section>

    <div className="ai-studio-layout">
      <nav aria-label="SchoolAI pilot activities">
        {schoolAIActivities.map((item) => <button key={item.id} className={item.id === activity.id ? "selected" : ""} onClick={() => { setSelectedId(item.id); setCopyMessage(""); }}><small>{item.outcome} · {item.status.replace("-", " ")}</small><strong>{item.title}</strong><span>{item.participation.label} · {item.duration}</span></button>)}
      </nav>

      <main className="ai-studio-record">
        <header><div><p>{activity.pattern} · {activity.subjects.join(" · ")}</p><h2>{activity.title}</h2><span>{activity.purpose}</span></div><b className="ai-status">{activityStatus}</b></header>

        <section className="ai-decision-grid">
          <article><small>PARTICIPATION</small><strong>{activity.participation.label}</strong><p>{activity.participation.rationale}</p><ul>{activity.participation.roles.map((role) => <li key={role}>{role}</li>)}</ul></article>
          <article><small>BEFORE SCHOOLAI</small><strong>Authentic evidence first</strong><p>{activity.prerequisiteExperience}</p><ol>{activity.preAiTask.map((item) => <li key={item}>{item}</li>)}</ol></article>
        </section>

        <section className="ai-copy-panel">
          <div><small>SPACE CREATION PACK</small><h3>Copy, preview, then revise from the test.</h3><p>The full instructions include the learning purpose, one-question-at-a-time behaviour, privacy boundaries, stop condition, and exact handoff.</p></div>
          <div className="ai-copy-actions">
            {activity.templateUrl && <a href={activity.templateUrl} target="_blank" rel="noreferrer">Open teacher template ↗</a>}
            {activity.studentLaunchUrl && <a href={activity.studentLaunchUrl} target="_blank" rel="noreferrer">Open tested student launch ↗</a>}
            <button onClick={() => copy("Opening message", activity.openingMessage)}>Copy opening</button>
            <button onClick={() => copy("Space instructions", activity.spaceInstructions)}>Copy instructions</button>
            <button className="primary" onClick={() => copy("Full creation pack", schoolAICreationPack(activity))}>Copy full pack</button>
          </div>
          {copyMessage && <p className="ai-copy-message" role="status">{copyMessage}</p>}
          <label><span>SPACE INSTRUCTIONS · SELECTABLE BACKUP</span><textarea readOnly value={activity.spaceInstructions} rows={18} /></label>
        </section>

        <section className="ai-after-grid">
          <article><small>TEACHER LOOK-FORS</small><ul>{activity.teacherLookFors.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><small>STOP</small><p>{activity.stopCondition}</p><small>VERIFY</small><p>{activity.verificationMove}</p></article>
          <article><small>AFTER AI · HUMAN WORK</small><p>{activity.postAiTask}</p><small>SPACES EDU</small><p>{activity.spacesDecision}</p></article>
        </section>

        <section className="ai-safety-row"><div><small>PRIVACY</small><p>{activity.privacyNote}</p></div><div><small>ASSESSMENT BOUNDARY</small><p>{activity.assessmentBoundary}</p></div><div><small>PRINT / SHARED-DEVICE ROUTE</small><p>{activity.offlineAlternative}</p></div></section>
      </main>
    </div>
  </div>;
}
