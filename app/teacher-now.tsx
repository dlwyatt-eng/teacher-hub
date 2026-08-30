import currentLearning from "../content/current-learning-window-v2.json";
import { currentLearningState, currentLearningWindow } from "./current-learning-phase";

function scenarioClass(call: string) {
  if (call === "HELPS LEARNING") return "helps";
  if (call === "CHECK IT") return "check";
  return "stop";
}

export default function TeacherNow({ onNavigate }: { onNavigate: (page: string) => void }) {
  const window = currentLearningWindow();
  const state = currentLearningState(window);
  const resource = window.shared.primaryResource;

  return <section className="teacher-now" aria-labelledby="teacher-now-title">
    <header>
      <div>
        <p>{state === "active" ? "TEACHING NOW" : state === "up-next" ? "UP NEXT" : "RECENT"} · {window.teacher.timing}</p>
        <h2 id="teacher-now-title">{window.shared.title}</h2>
        <blockquote>{window.shared.bigQuestion}</blockquote>
      </div>
      <dl>
        <div><dt>TIME</dt><dd>{window.teacher.duration}</dd></div>
        <div><dt>GROUPING</dt><dd>{window.teacher.grouping}</dd></div>
      </dl>
    </header>

    {resource && <aside className="teacher-now-resource" aria-label="Primary lesson resource">
      <div>
        <small>PRINT BEFORE THE ROTATION</small>
        <strong>{resource.label}</strong>
        <span>{resource.format} · {resource.description}</span>
      </div>
      <a href={resource.href} download>Download agreement PDF</a>
    </aside>}

    <div className="teacher-now-grid">
      <article className="teacher-now-prepare">
        <small>BEFORE STUDENTS ARRIVE</small>
        <ul>{window.teacher.prepare.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>

      <article className="teacher-now-run-card">
        <small>RUN OF SHOW</small>
        <ol className="teacher-now-run">
          {window.teacher.runOfShow.map((phase) => <li key={`${phase.timing}-${phase.move}`}>
            <time>{phase.timing}</time>
            <div><strong>{phase.move}</strong><p>{phase.teacherAction}</p></div>
          </li>)}
        </ol>
      </article>

      <article className="teacher-now-launch-card">
        <small>SAY TO LAUNCH</small>
        <blockquote>{window.teacher.launch}</blockquote>
        <small>LOOK FOR</small>
        <ul>{window.teacher.lookFors.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>
    </div>

    {window.teacher.scenarios.length > 0 && <article className="teacher-now-scenario-card">
      <header>
        <div><small>READY-TO-RUN DECISION CARDS</small><h3>Six situations with the call and reason</h3></div>
        <p>Run at least four. Include <b>Private details</b> and <b>Confident local fact</b>.</p>
      </header>
      <div className="teacher-now-scenarios">
        {window.teacher.scenarios.map((scenario) => <section key={scenario.title}>
          <div><strong>{scenario.title}</strong><span className={scenarioClass(scenario.call)}>{scenario.call}</span></div>
          <p>{scenario.situation}</p>
          <small>{scenario.reason}</small>
        </section>)}
      </div>
    </article>}

    <aside className="teacher-now-handoff">
      <div>
        <small>EVIDENCE &amp; HANDOFF</small>
        <p>{window.teacher.evidenceHandoff}</p>
      </div>
      <div className="teacher-now-thinking" aria-label="Thinking moves">
        {window.shared.thinkingMoves.map((move) => <span key={move.id}>{move.label}</span>)}
      </div>
    </aside>

    <footer>
      <div><strong>Current source</strong><span>{currentLearning.contentVersion} · one canonical lesson window feeding Teacher, Student, and Family views</span></div>
      <nav aria-label="Current teaching actions">
        <button onClick={() => onNavigate(window.teacher.primaryView)}>Open full mission</button>
        <button onClick={() => onNavigate(window.teacher.secondaryView)}>Open weekly plan</button>
        {resource && <a className="secondary" href={resource.href} download>{resource.label}</a>}
      </nav>
    </footer>
  </section>;
}
