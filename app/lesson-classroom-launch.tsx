"use client";

import { comparisonPractice, comparisonSort, libraryVoteCase, type ClassroomLaunch } from "./lesson-classroom-launches";
import { printClosest } from "./print-support";

function LaunchVisual({ id, model = false }: { id: string; model?: boolean }) {
  if (id === "magnitude-gallery") return model ? <div className="classroom-place-chart" aria-label="Compare 0.500 and 0.450 by place value">
    <table><thead><tr><th scope="col">Number</th><th scope="col">Ones</th><th scope="col">Tenths</th><th scope="col">Hundredths</th><th scope="col">Thousandths</th></tr></thead><tbody>{[["0.50", "0", "5", "0", "0"], ["0.45", "0", "4", "5", "0"]].map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index} data-deciding={index === 2 || undefined}>{cell}</td>)}</tr>)}</tbody></table>
    <p>First unequal place: <b>tenths</b> · 0.50 &gt; 0.45</p>
  </div> : <div className="classroom-number-pair" aria-label="Compare 0.50 with 0.405"><strong>0.50</strong><span>?</span><strong>0.405</strong></div>;
  if (id === "character-council") return model ? <blockquote className="classroom-fictional-case"><small>ORIGINAL FICTIONAL CASE</small><p>{libraryVoteCase}</p></blockquote> : <div className="classroom-choice-line"><strong>Keep a promise</strong><span>or</span><strong>Rethink a choice</strong></div>;
  return <div className="classroom-role-line" aria-label="Three connected roles"><span><b>Observe</b><small>What is happening?</small></span><i aria-hidden="true">→</i><span><b>Design</b><small>What could change?</small></span><i aria-hidden="true">→</i><span><b>Check</b><small>Would it help?</small></span></div>;
}

export function ClassroomLaunchStage({ launch, stageIndex }: { launch: ClassroomLaunch; stageIndex: number }) {
  const stage = launch.stages[stageIndex] ?? launch.stages[0];
  return <section className="classroom-launch-stage" data-lesson={launch.id} aria-labelledby={`classroom-launch-${launch.id}-${stageIndex}`}>
    <header><span>{stage.label.toUpperCase()} · {stage.minutes}</span><h2 id={`classroom-launch-${launch.id}-${stageIndex}`}>{stage.title}</h2><p>{stage.prompt}</p></header>
    {stageIndex < 2 && <LaunchVisual id={launch.id} model={stageIndex === 1} />}
    {launch.id === "magnitude-gallery" && stageIndex === 2 && <div className="classroom-comparison-practice"><div>{comparisonPractice.map(pair => <p key={pair.left}><b>{pair.left}</b><span>___</span><b>{pair.right}</b></p>)}</div><p className="classroom-sort-cards">{comparisonSort.map((value, index) => <b key={index}>{value}</b>)}</p></div>}
    <ol>{stage.moves.map(move => <li key={move}>{move}</li>)}</ol>
    {stageIndex === 2 && <p className="classroom-paper-route"><b>Paper route:</b> use the response sheet or copy its headings onto plain paper. Talk, draw and label, or use a scribe.</p>}
  </section>;
}

/** The student print contains the input and all tasks, never teacher answer notes. */
export function ClassroomResponseSheet({ launch }: { launch: ClassroomLaunch }) {
  return <section className="classroom-response-sheet" aria-label={`${launch.title} student response sheet`}>
    <header><div><small>{launch.subject.toUpperCase()} · STUDENT RESPONSE SHEET</small><h3>{launch.title}</h3></div><button type="button" onClick={event => printClosest(event.currentTarget, ".classroom-response-sheet")}>Print response sheet</button></header>
    <p className="classroom-sheet-goal">{launch.goal}</p>
    {launch.id === "magnitude-gallery" && <p className="classroom-sheet-case"><b>Model:</b> 0.50 = 0.500 and 0.45 = 0.450. The ones match; 5 tenths &gt; 4 tenths, so 0.50 &gt; 0.45. Compare from the greatest place and stop at the first unequal digit.</p>}
    {launch.id === "character-council" && <p className="classroom-sheet-case"><b>Offline model · original fiction:</b> {libraryVoteCase}</p>}
    {launch.id === "career-constellation" && <p className="classroom-sheet-case"><b>Offline input · fictional case:</b> A refill-station queue blocks a school doorway. How could a queue leave a clear route? Start with observer, designer and checker. Example: designer → sketches two layouts → planning. Connect the other roles to an action and a skill.</p>}
    <div>{launch.paperPrompts.map(item => <section key={item.title}><h4>{item.title}</h4><p>{item.prompt}</p><div className="classroom-writing-space" aria-hidden="true" /></section>)}</div>
    <footer>Write, draw + label, or explain to a scribe. Keep in class; no upload required.</footer>
  </section>;
}

export function ClassroomLaunchResources({ launch, teacher = false }: { launch: ClassroomLaunch; teacher?: boolean }) {
  return <div className="classroom-launch-resources">
    <details><summary>Response sheet · print or use plain paper</summary><ClassroomResponseSheet launch={launch} /></details>
    <details><summary>Teaching notes · setup, checks and sources</summary><p><b>Goal:</b> {launch.goal}</p><p><b>Gather:</b> {launch.materials}</p><ol>{launch.preparation.map(item => <li key={item}>{item}</li>)}</ol>{launch.source && <p><a href={launch.source.url} target="_blank" rel="noreferrer">{launch.source.label}</a><br />{launch.source.note}</p>}{teacher ? <><h4>Look for / respond</h4><ul>{launch.teacherCheck.map(item => <li key={item}>{item}</li>)}</ul></> : <p>Use the teacher lesson view for checking notes and answers.</p>}</details>
  </div>;
}

export function TeacherClassroomLaunch({ launch }: { launch: ClassroomLaunch }) {
  return <section className="teacher-classroom-launch">
    <header><div><small>FOCUSED CLASSROOM LESSON · {launch.duration}</small><h2>{launch.title}</h2><p>{launch.goal}</p></div><a href={`?subject=${encodeURIComponent(launch.subject)}&experience=${encodeURIComponent(launch.id)}&mode=student`}>Open lesson screens →</a></header>
    <p>{launch.materials}</p>
    <ol className="teacher-classroom-launch-flow">{launch.stages.map(stage => <li key={stage.label}><b>{stage.label} · {stage.minutes}</b><span>{stage.prompt}</span></li>)}</ol>
    <ClassroomLaunchResources launch={launch} teacher />
    <p className="classroom-full-note">The original full sequence and its materials remain below. In the lesson screens, choose “Full sequence” to open them.</p>
  </section>;
}
