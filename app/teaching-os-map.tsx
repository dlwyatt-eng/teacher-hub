import {
  activeQueue,
  blockPressures,
  contractChecks,
  maturityStates,
  operatingLayers,
  preservationRules,
  projectThreads,
  readinessLevels,
  teachingOsCoverage,
} from "./teaching-os-data";
import { schoolAIActivities } from "./schoolai-activities";

type TeachingOsMapProps = {
  onHome: () => void;
  onYearPlan: () => void;
  onSpaces: () => void;
  onAiStudio: () => void;
  onScience: () => void;
};

export default function TeachingOsMap({ onHome, onYearPlan, onSpaces, onAiStudio, onScience }: TeachingOsMapProps) {
  return (
    <div className="page teaching-os-map">
      <button className="back-link" onClick={onHome}>← Back to dashboard</button>

      <section className="os-hero">
        <div className="os-hero-copy">
          <p className="eyebrow">PRIVATE CONTROL PLANE · AUGUST 16, 2026</p>
          <h1>Teaching OS Map</h1>
          <p>One path from prerequisite learning to evidence worth keeping. Use this map to see what is protected, what is ready, what is blocked, and what the next build must solve.</p>
          <div className="os-hero-actions">
            <button onClick={onYearPlan}>Open year plan <span>→</span></button>
            <button onClick={onSpaces}>Open evidence rhythm <span>→</span></button>
            <button onClick={onAiStudio}>Open AI activity studio <span>→</span></button>
            <button onClick={onScience}>Open Science audit <span>→</span></button>
          </div>
        </div>
        <aside className="os-hero-status" aria-label="Teaching OS snapshot">
          <span>SYSTEM SNAPSHOT</span>
          <strong>8 learning areas</strong>
          <p>Curriculum mapped across the full Grade 6 program.</p>
          <div><b>53 / 53</b><small>quality gates defined</small></div>
          <div><b>12</b><small>required portfolio anchors</small></div>
          <div><b>1</b><small>canonical current-learning record</small></div>
          <div><b>{schoolAIActivities.filter((activity) => activity.status === "prompt-ready").length}</b><small>prompt-ready SchoolAI packs</small></div>
        </aside>
      </section>

      <section className="os-loop" aria-labelledby="os-loop-title">
        <div><p className="section-kicker">THE OPERATING LOOP</p><h2 id="os-loop-title">Build learning forward—not page by page.</h2></div>
        <ol>
          {[
            ["01", "Check", "What do students already understand?"],
            ["02", "Teach", "What idea or language must be explicit?"],
            ["03", "Investigate / create", "Where will students use the idea?"],
            ["04", "Feedback", "What evidence changes the next move?"],
            ["05", "Revise", "What improves because of the evidence?"],
            ["06", "Keep", "What genuinely serves later learning?"],
          ].map(([number, title, detail]) => <li key={number}><span>{number}</span><strong>{title}</strong><small>{detail}</small></li>)}
        </ol>
      </section>

      <section className="os-section" aria-labelledby="os-queue-title">
        <header><div><p className="section-kicker">CURRENT RELEASE</p><h2 id="os-queue-title">Critical path</h2></div><p>Repair contradictions before multiplying lesson pages.</p></header>
        <div className="os-queue">
          {activeQueue.map(item => <article key={item.title} data-state={item.state.toLowerCase()}><span>{item.state}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}
        </div>
      </section>

      <section className="os-section" aria-labelledby="os-layers-title">
        <header><div><p className="section-kicker">SOURCE OF TRUTH</p><h2 id="os-layers-title">Six connected system layers</h2></div><p>A page is a view of the system—not a second copy of it.</p></header>
        <div className="os-layer-grid">
          {operatingLayers.map(layer => <article key={layer.number}><span>{layer.number}</span><h3>{layer.title}</h3><p>{layer.purpose}</p></article>)}
        </div>
      </section>

      <section className="os-section" aria-labelledby="os-audiences-title">
        <header><div><p className="section-kicker">CLASSROOM OS V2</p><h2 id="os-audiences-title">One lesson record. Three useful experiences.</h2></div><p>The audience changes the questions and depth—not the curriculum itself.</p></header>
        <div className="os-layer-grid">
          <article><span>T</span><h3>Teacher cockpit</h3><p>Today, preparation, launch, look-fors, evidence, handoff, full lesson flow, and private tool links.</p></article>
          <article><span>S</span><h3>Student launch</h3><p>What, why, first move, grouping, time, choices, finished product, destination, and catch-up support.</p></article>
          <article><span>F</span><h3>Family window</h3><p>Actual learning and products, why they matter, milestones, assessment status, SpacesEDU evidence, and support at home.</p></article>
          <article><span>AI</span><h3>SchoolAI tool door</h3><p>Teacher-authored prompt packs, deliberate participation, testing status, post-AI human work, and manually added student links.</p></article>
          <article><span>SP</span><h3>SpacesEDU evidence</h3><p>Selected secure artifacts, reflection, feedback, portfolio curation, and family viewing—not a duplicate assignment system.</p></article>
          <article><span>↗</span><h3>Sanitized public export</h3><p>A deterministic projection strips preparation, look-fors, internal evidence decisions, and every private or untested tool link.</p></article>
        </div>
      </section>

      <section className="os-section os-coverage" aria-labelledby="os-coverage-title">
        <header><div><p className="section-kicker">CURRICULUM SNAPSHOT</p><h2 id="os-coverage-title">Explicit mappings—not inflated claims</h2></div><p>Missing mappings identify work to verify; they do not prove missing classroom learning.</p></header>
        <div className="os-table-wrap">
          <table>
            <thead><tr><th>Learning area</th><th>Big Ideas</th><th>Competencies</th><th>Content</th><th>Next system move</th></tr></thead>
            <tbody>{teachingOsCoverage.map(row => <tr key={row.subject} data-signal={row.signal}><th>{row.subject}<span>{row.signal === "strong" ? "STRONG SPINE" : row.signal === "selected" ? "SELECTED MODULES" : "BUILD"}</span></th><td>{row.bigIdeas}</td><td>{row.competencies}</td><td>{row.content}</td><td>{row.next}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="os-section" aria-labelledby="os-time-title">
        <header><div><p className="section-kicker">MASTER BLOCK LEDGER</p><h2 id="os-time-title">Resolve pressure before locking dates</h2></div><p>Shared blocks count once even when evidence serves several learning areas.</p></header>
        <div className="os-pressure-grid">
          {blockPressures.map(item => <article key={item.window} data-level={item.level}><span>{item.window}</span><div><small>INTERFACE PROMISE</small><strong>{item.promise}</strong></div><div><small>SOURCE LOAD</small><strong>{item.source}</strong></div><p>{item.decision}</p></article>)}
        </div>
      </section>

      <section className="os-section os-contract" aria-labelledby="os-contract-title">
        <header><div><p className="section-kicker">LESSON CONTRACT V2 · ADAPTER MIGRATION</p><h2 id="os-contract-title">A runnable lesson has enforceable gates</h2></div><p>The shared contract sits above the strong subject registries; lessons migrate through adapters rather than a rewrite.</p></header>
        <div className="os-contract-grid">
          <div className="os-maturity">
            <h3>Lesson maturity</h3>
            <ol>{maturityStates.map(state => <li key={state.code}><span>{state.code}</span><div><strong>{state.title}</strong><p>{state.detail}</p></div></li>)}</ol>
          </div>
          <div className="os-readiness">
            <h3>Readiness maturity</h3>
            <div>{readinessLevels.map(([code, title, detail]) => <article key={code}><b>{code}</b><span><strong>{title}</strong><small>{detail}</small></span></article>)}</div>
          </div>
          <div className="os-contract-checks">
            <h3>Before a Pilot-ready label</h3>
            <ul>{contractChecks.map(check => <li key={check}><span>✓</span>{check}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="os-section" aria-labelledby="os-threads-title">
        <header><div><p className="section-kicker">CARRY-FORWARD ARCHITECTURE</p><h2 id="os-threads-title">Five project threads</h2></div><p>Artifacts earn their place by doing work later.</p></header>
        <div className="os-thread-list">{projectThreads.map((thread, index) => <article key={thread.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{thread.title}</strong><p>{thread.path}</p></article>)}</div>
      </section>

      <section className="os-guardrails" aria-labelledby="os-guardrails-title">
        <div><p className="section-kicker">PRESERVE</p><h2 id="os-guardrails-title">Strong foundations stay intact.</h2><p>Expansion must extend these decisions without duplicating or weakening them.</p></div>
        <ul>{preservationRules.map(rule => <li key={rule}><span>◆</span>{rule}</li>)}</ul>
      </section>

      <footer className="os-reminder">
        <span>OPERATING REMINDER</span>
        <p>A link is not a lesson. A polished screen is not readiness. A post is not automatically assessment. Teach the needed idea, make the evidence visible, and carry forward only what serves the next learning.</p>
      </footer>
    </div>
  );
}
