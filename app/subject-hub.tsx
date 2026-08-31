"use client";

import { lazy, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { curriculum, type CurriculumGroup, type CurriculumRecord } from "./curriculum";
import { scienceInquiryProject, scienceLessons, sciencePacing, scienceUnits } from "./science-program";
import { coreLearningPrograms } from "./core-programs";
import { integratedLearningPrograms } from "./integrated-programs";
import { socialLessons, socialUnits } from "./social-program";
import { alignmentByArc, resolveAlignment, subjectCoverageNotes } from "./curriculum-alignment";
import { WorldAtlasIntroduction, WorldJourney, WorldPortal } from "./unit-world-components";
import { worldFor, worldStyle } from "./unit-worlds";
import { StudentWorldEntry } from "./student-mission";
import type { Subject } from "./subject-catalog";

const SocialStudiesProgramTab = lazy(() => import("./social-studies-program").then((module) => ({ default: module.SocialStudiesProgramTab })));
const SocialStudiesStudentLaunch = lazy(() => import("./social-studies-program").then((module) => ({ default: module.SocialStudiesStudentLaunch })));
const LearningProgramTab = lazy(() => import("./learning-program").then((module) => ({ default: module.LearningProgramTab })));
const StudentLearningProgram = lazy(() => import("./learning-program").then((module) => ({ default: module.StudentLearningProgram })));
const learningPrograms = { ...coreLearningPrograms, ...integratedLearningPrograms };

export type SubjectHubLocation = {
  tab?: string;
  socialLessonId?: string;
  socialScene?: number;
  scienceUnitId?: string;
  scienceUnitFilter?: string;
  programExperienceId?: string;
};

function readSubjectHubLocation(subjectName: string): SubjectHubLocation {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(`wyatt-subject-location:${subjectName}`) ?? "{}");
    return parsed && typeof parsed === "object" ? parsed as SubjectHubLocation : {};
  } catch {
    return {};
  }
}

export default function SubjectHub({ subject, mode, onBack, onOpenLesson }: { subject: Subject; mode: "teacher" | "projector"; onBack: () => void; onOpenLesson: (lessonId: string) => void }) {
  const program = learningPrograms[subject.name];
  const tabs = subject.name === "Science"
    ? ["Overview", "Big Ideas", "Competencies", "Content", "Units", "Lessons", "Alignment", "Final Inquiry", "Pacing", "Resources"]
    : subject.name === "Social Studies"
      ? ["Overview", "Big Ideas", "Competencies", "Content", "Units", "Lessons", "Alignment", "Assessments", "Pacing", "Resources"]
      : ["Overview", "Big Ideas", "Competencies", "Content", "Units", "Lessons", "Alignment", "Assessments", "Resources"];
  const [initialLocation] = useState(() => readSubjectHubLocation(subject.name));
  const initialSocialLesson = socialLessons.find((lesson) => lesson.id === initialLocation.socialLessonId) ?? socialLessons[0];
  const initialScienceUnit = scienceUnits.find((unit) => unit.id === initialLocation.scienceUnitId) ?? scienceUnits[0];
  const initialProgramExperience = program?.experiences.find((experience) => experience.id === initialLocation.programExperienceId) ?? program?.experiences[0];
  const [tab, setTab] = useState(() => tabs.includes(initialLocation.tab ?? "") ? initialLocation.tab! : "Overview");
  const [socialLessonId, setSocialLessonId] = useState(initialSocialLesson.id);
  const [socialScene, setSocialScene] = useState(() => initialSocialLesson.id === "rights-in-tension" ? 0 : Number.isInteger(initialLocation.socialScene) ? Math.min(Math.max(initialLocation.socialScene as number, 0), initialSocialLesson.scenes.length - 1) : 0);
  const [scienceUnitId, setScienceUnitId] = useState(initialScienceUnit.id);
  const [scienceUnitFilter, setScienceUnitFilter] = useState(() => initialLocation.scienceUnitFilter === "all" || scienceUnits.some((unit) => unit.id === initialLocation.scienceUnitFilter) ? initialLocation.scienceUnitFilter! : "all");
  const [programExperienceId, setProgramExperienceId] = useState(initialProgramExperience?.id ?? "");
  const previousModeRef = useRef(mode);
  const tabIdBase = `subject-${subject.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

  useEffect(() => {
    if (previousModeRef.current === "projector" && mode === "teacher") setTab("Lessons");
    previousModeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const location: SubjectHubLocation = { tab, socialLessonId, socialScene: socialLessonId === "rights-in-tension" ? 0 : socialScene, scienceUnitId, scienceUnitFilter, programExperienceId };
    try { window.sessionStorage.setItem(`wyatt-subject-location:${subject.name}`, JSON.stringify(location)); } catch {}
  }, [subject.name, tab, socialLessonId, socialScene, scienceUnitId, scienceUnitFilter, programExperienceId]);

  const resetLessonViewport = () => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })));
  };

  const chooseProgramExperience = (id: string) => {
    setProgramExperienceId(id);
    setTab("Lessons");
    resetLessonViewport();
  };
  const chooseSocialLesson = (id: string) => {
    if (id !== socialLessonId) setSocialScene(0);
    setSocialLessonId(id);
    setTab("Lessons");
    resetLessonViewport();
  };
  const chooseSocialScene = (scene: number) => {
    setSocialScene(scene);
    setTab("Lessons");
  };
  const chooseScienceUnit = (id: string) => {
    setScienceUnitFilter(id);
    if (id !== "all") setScienceUnitId(id);
    setTab("Lessons");
  };
  const record = curriculum[subject.name];
  const standardCount = record.bigIdeas.length + record.competencies.reduce((sum, group) => sum + group.items.length, 0) + record.content.reduce((sum, group) => sum + group.items.length, 0);
  const moveTabFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    document.getElementById(`${tabIdBase}-tab-${nextIndex}`)?.focus();
    setTab(tabs[nextIndex]);
  };
  const openOverviewTab = (nextTab: string) => {
    const nextIndex = tabs.indexOf(nextTab);
    if (nextIndex >= 0) document.getElementById(`${tabIdBase}-tab-${nextIndex}`)?.focus();
    setTab(nextTab);
  };

  if (mode === "projector") {
    return <StudentCurriculumView subject={subject} onBack={onBack} onOpenLesson={onOpenLesson} socialLessonId={socialLessonId} onSocialLesson={chooseSocialLesson} socialScene={socialScene} onSocialScene={chooseSocialScene} scienceUnitId={scienceUnitId} onScienceUnit={chooseScienceUnit} program={program} programExperienceId={programExperienceId} onProgramExperience={chooseProgramExperience} />;
  }

  return (
    <div className="page subject-page" style={{ "--subject": subject.color, "--soft": subject.soft } as CSSProperties}>
      <button className="back-link" onClick={onBack}>← Classroom home</button>
      <section className="subject-hero">
        <span className="subject-hero-icon">{subject.icon}</span>
        <div><p className="eyebrow">GRADE 6 · OFFICIAL BC CURRICULUM</p><h1>{subject.name}</h1><p>{record.summary}</p></div>
        <div className="subject-hero-badges"><span className="framework-badge curriculum-ready">{subject.name === "Science" ? "AUDIT · Units mapped; readiness varies" : subject.name === "Social Studies" ? "FIRST-PASS · 4-unit experience pathway" : program ? "FIRST-PASS · Build, teach, adjust" : "✓ Curriculum imported"}</span>{subject.updated && <span className="recent-section-badge">● {subject.updated}</span>}</div>
      </section>
      <div className="tab-bar" role="tablist" aria-label={`${subject.short} curriculum sections`}>
        {tabs.map((item, index) => <button id={`${tabIdBase}-tab-${index}`} role="tab" aria-controls={`${tabIdBase}-panel`} aria-selected={tab === item} tabIndex={tab === item ? 0 : -1} className={tab === item ? "selected" : ""} key={item} onClick={() => setTab(item)} onKeyDown={(event) => moveTabFocus(event, index)}>{item}</button>)}
      </div>
      <section id={`${tabIdBase}-panel`} role="tabpanel" aria-labelledby={`${tabIdBase}-tab-${tabs.indexOf(tab)}`} className={`subject-body ${["Units", "Journey", "Lessons", "Alignment", "Assessments", "Final Inquiry", "Pacing", "Resources"].includes(tab) ? "subject-body-workspace" : ""}`}>
        <div className="curriculum-main">
          {tab === "Overview" && <CurriculumOverview record={record} standardCount={standardCount} onTab={openOverviewTab} />}
          {tab === "Big Ideas" && <StandardsList eyebrow="OFFICIAL WORDING · PUBLISHED ORDER" title="Big Ideas" items={record.bigIdeas} />}
          {tab === "Competencies" && <GroupedStandards eyebrow="OFFICIAL WORDING · PUBLISHED ORDER" title="Curricular Competencies" groups={record.competencies} />}
          {tab === "Content" && <GroupedStandards eyebrow="OFFICIAL WORDING · PUBLISHED ORDER" title="Content Standards" groups={record.content} />}
          {["Units", "Journey", "Lessons", "Alignment", "Assessments", "Final Inquiry", "Pacing", "Resources"].includes(tab) && (tab === "Alignment" && (subject.name === "Science" || subject.name === "Social Studies") ? <SubjectAlignmentPage subject={subject.name} record={record} /> : subject.name === "Science" ? <ScienceProgramTab tab={tab} onOpenLesson={onOpenLesson} unitFilter={scienceUnitFilter} onUnitFilter={chooseScienceUnit} /> : subject.name === "Social Studies" ? <SocialStudiesProgramTab tab={tab} mode={mode} lessonId={socialLessonId} onLesson={chooseSocialLesson} scene={socialScene} onScene={chooseSocialScene} /> : program ? <LearningProgramTab program={program} record={record} tab={tab} selectedExperienceId={programExperienceId} onExperience={chooseProgramExperience} /> : <PhasePlaceholder tab={tab} subject={subject.short} />)}
        </div>
        <aside className="subject-sidebar-card">
          <p className="section-kicker">CURRICULUM MAP</p>
          <div><span>01</span><strong>Big Ideas</strong><b>{record.bigIdeas.length}</b></div>
          <div><span>02</span><strong>Competencies</strong><b>{record.competencies.reduce((sum, group) => sum + group.items.length, 0)}</b></div>
          <div><span>03</span><strong>Content</strong><b>{record.content.reduce((sum, group) => sum + group.items.length, 0)}</b></div>
          <a className="official-source" href={record.sourceUrl} target="_blank" rel="noreferrer"><span>↗</span><strong>Official BC source</strong><b>OPEN</b></a>
        </aside>
      </section>
    </div>
  );
}

function CurriculumOverview({ record, standardCount, onTab }: { record: CurriculumRecord; standardCount: number; onTab: (tab: string) => void }) {
  const counts = [
    [record.bigIdeas.length, "Big Ideas", "Big Ideas"],
    [record.competencies.reduce((sum, group) => sum + group.items.length, 0), "Competencies", "Competencies"],
    [record.content.reduce((sum, group) => sum + group.items.length, 0), "Content standards", "Content"],
  ];
  return (
    <div className="curriculum-overview">
      <div className="curriculum-intro"><p className="section-kicker">TEACHER REFERENCE</p><h2>{record.officialTitle}</h2><p>{record.summary}</p></div>
      <div className="alignment-note"><span>✓</span><div><strong>Official standards stored; teaching map audited</strong><p>{standardCount} standards are preserved in the official sequence. Open Alignment to see exact theme links and the coverage gaps that still need work.</p></div></div>
      <div className="curriculum-counts">{counts.map(([count, label, target]) => <button key={String(label)} onClick={() => onTab(String(target))}><strong>{count}</strong><span>{label}</span><b>Explore →</b></button>)}</div>
      <section className="student-translation-card"><p className="section-kicker">STUDENT-FRIENDLY LENS</p><h3>{record.student.learning}</h3><div>{record.student.canDo.map(item => <p key={item}><span>✓</span>{item}</p>)}</div><small>This concise language appears in Teach View. Official wording remains in Plan / TTOC.</small></section>
    </div>
  );
}

function StandardsList({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
  return (
    <div className="standards-page"><div className="standards-heading"><div><p className="section-kicker">{eyebrow}</p><h2>{title}</h2></div><span>{items.length} standards</span></div><div className="standards-list">{items.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><b>BC</b></article>)}</div></div>
  );
}

function GroupedStandards({ eyebrow, title, groups }: { eyebrow: string; title: string; groups: CurriculumGroup[] }) {
  return (
    <div className="standards-page"><div className="standards-heading"><div><p className="section-kicker">{eyebrow}</p><h2>{title}</h2></div><span>{groups.reduce((sum, group) => sum + group.items.length, 0)} standards</span></div>{groups.map((group, groupIndex) => { const offset = groups.slice(0, groupIndex).reduce((sum, previous) => sum + previous.items.length, 0); return <section className="standard-group" key={group.title}><h3>{group.title}</h3><div className="standards-list">{group.items.map((item, itemIndex) => <article key={item}><span>{String(offset + itemIndex + 1).padStart(2, "0")}</span><p>{item}</p><b>BC</b></article>)}</div></section>; })}</div>
  );
}

function SubjectAlignmentPage({ subject, record }: { subject: "Science" | "Social Studies"; record: CurriculumRecord }) {
  const coverage = subjectCoverageNotes[subject];
  const socialAlignmentIds: Record<string, string> = {
    "place-evidence-perspective": "social-place-evidence",
    "power-rights-government": "social-power-rights",
    "global-systems": "social-global-systems",
    "solutionary-inquiry": "social-solutionary-inquiry",
  };
  const units = subject === "Science"
    ? scienceUnits.map(unit => ({ id: `science-${unit.id}`, number: unit.number, title: unit.title, question: unit.question }))
    : socialUnits.map(unit => ({ id: socialAlignmentIds[unit.id], number: unit.number, title: unit.title, question: unit.question }));

  return (
    <div className="learning-program program-alignment">
      <section className="program-heading"><div><p className="section-kicker">TRACEABLE CURRICULUM MAP</p><h2>How the units build the official Grade 6 standards.</h2><p>Each row names the Big Ideas, competencies, and content that the unit can honestly introduce, practise, or demonstrate. The next-work list keeps gaps visible.</p></div><a href={record.sourceUrl} target="_blank" rel="noreferrer">Official curriculum ↗</a></section>
      <section className="coverage-honesty"><header><span>{coverage.scope}</span><h3>{coverage.strength}</h3></header><div><p className="section-kicker">NEXT COVERAGE WORK</p>{coverage.next.map(item => <p key={item}><span>→</span>{item}</p>)}</div></section>
      <div className="alignment-arc-list">{units.map(unit => {
        const alignment = alignmentByArc[unit.id];
        const resolved = alignment ? resolveAlignment(record, alignment) : null;
        return <article key={unit.id}><header><span>{unit.number}</span><div><small>{alignment?.stage ?? "MAP NEEDED"}</small><h3>{unit.title}</h3><p>{alignment?.note ?? unit.question}</p></div></header>{resolved && <div><section><b>BIG IDEAS</b>{resolved.bigIdeas.map(text => <p key={text}>{text}</p>)}</section><section><b>CURRICULAR COMPETENCIES</b>{resolved.competencies.map(text => <p key={text}>{text}</p>)}</section><section><b>CONTENT</b>{resolved.content.map(text => <p key={text}>{text}</p>)}</section></div>}</article>;
      })}</div>
    </div>
  );
}

function PhasePlaceholder({ tab, subject }: { tab: string; subject: string }) {
  const copy: Record<string, string> = {
    Units: "The official curriculum is available, but a complete classroom sequence has not been built for this subject yet.",
    Lessons: "There are no classroom-ready lessons here yet. Nothing on this page is being presented as ready to teach.",
    Assessments: "Assessment tasks will be added only after the teaching sequence has been classroom-tested.",
    Resources: "Resources will be added with the activities they support, not as an untested list of links.",
  };
  return <div className="empty-state phase-placeholder"><span className="empty-symbol">{tab === "Units" ? "▦" : tab === "Lessons" ? "▤" : tab === "Assessments" ? "✓" : "⌑"}</span><p className="section-kicker">CURRICULUM REFERENCE ONLY</p><h2>{subject} {tab}</h2><p>{copy[tab]}</p><span className="sequence-pill">Teaching program not yet developed</span></div>;
}

function ScienceProgramTab({ tab, onOpenLesson, unitFilter, onUnitFilter }: { tab: string; onOpenLesson: (lessonId: string) => void; unitFilter: string; onUnitFilter: (id: string) => void }) {
  const visibleLessons = unitFilter === "all" ? scienceLessons : scienceLessons.filter(item => item.unitId === unitFilter);
  const classroomReadyCount = scienceLessons.filter(item => item.auditStatus === "classroom-ready").length;
  const experienceCounts = ["Launch", "Case file", "Field lab", "Readiness check", "Digital investigation", "Design studio", "Inquiry studio"].map(type => ({ type, count: scienceLessons.filter(item => item.journeyType === type).length })).filter(item => item.count > 0);
  const experiencePlural: Record<string, string> = { "Launch": "Launches", "Case file": "Case files", "Field lab": "Field labs", "Readiness check": "Readiness checks", "Digital investigation": "Digital investigations", "Design studio": "Design studios", "Inquiry studio": "Inquiry studios" };

  if (tab === "Units" || tab === "Journey") return (
    <div className="science-program">
      <div className="science-program-heading"><div><p className="section-kicker">HALF-YEAR SCIENCE PLAN</p><h2>Four connected units. Many ways to learn.</h2><p>The full course is mapped. A lesson is marked teacher-ready draft only after a full depth, preparation, resource, projection, and Student/Teacher alignment audit. Classroom use will provide the final proof.</p></div><span>18–19 WEEKS</span></div>
      <section className="inquiry-north-star">
        <div><span>FINAL DESTINATION</span><h3>{scienceInquiryProject.title}</h3><p>{scienceInquiryProject.promise}</p></div>
        <ol>{scienceInquiryProject.stages.map((stage,index)=><li key={stage.name}><span>{index+1}</span><div><strong>{stage.name}</strong><small>{stage.detail}</small></div></li>)}</ol>
      </section>
      <WorldAtlasIntroduction />
      <div className="science-unit-map">
        {scienceUnits.map((unit, unitIndex) => { const theme = worldFor(unit.id); return <article key={unit.id} className="world-themed-card" data-world={theme.id} style={worldStyle(theme)}>
          <header><span>{unit.number}</span><i>{unit.icon}</i></header>
          <WorldPortal theme={theme} compact />
          <p>{unit.subtitle}</p><h3>{unit.title}</h3><blockquote>{unit.question}</blockquote>
          <div className="unit-content-tags">{unit.content.map(item => <span key={item}>{item}</span>)}</div>
          <div className="unit-inquiry-seed"><b>INQUIRY SEED {unitIndex+1}</b><span>What did you notice? What do you still wonder? What could you test, model, design, or explain?</span></div>
          <details className="arc-spaces-bookends"><summary>SpacesEDU possibilities ▾</summary><section><strong>Optional entry snapshot</strong><p>Before the unit, answer the unit question with what you think now and one wonder.</p><div><span>20-second audio</span><span>Quick model photo</span><span>Diagram + wonder</span></div></section><section><strong>Possible end evidence</strong><p>Choose one investigation, model, or explanation that shows how your thinking changed. Do not post every activity.</p><div><span>Photo + explanation</span><span>Short demonstration video</span><span>Audio reflection</span></div></section></details>
          <footer><b>{unit.lessons.length} lessons</b><button onClick={() => onOpenLesson(unit.lessons[0].id)}>Start unit →</button></footer>
        </article>})}
      </div>
      <section className="science-scope"><p className="section-kicker">WHAT STUDENTS BUILD ACROSS THE COURSE</p><div>{["Questions worth pursuing", "Fair and safe plans", "Useful evidence", "Models with limits", "Clear explanations"].map((item,index)=><span key={item}><i>{index+1}</i><b>{item}</b></span>)}</div></section>
    </div>
  );

  if (tab === "Lessons") return (
    <div className="science-program" id="science-lessons">
      <div className="science-program-heading"><div><p className="section-kicker">CLASSROOM LESSONS · AUDITED AUG. 12</p><h2>{classroomReadyCount} teacher-ready drafts. {scienceLessons.length - classroomReadyCount} have named corrections.</h2><p>Every lesson was checked. A ready draft sustains real learning, includes a practical run sheet, uses worthwhile sources or materials, and has matching Teacher and Student scenes. Lessons that miss any gate stay open for teacher review but are labelled honestly.</p></div><span>{visibleLessons.length} LESSONS</span></div>
      <div className="experience-legend">{experienceCounts.map(item=><div key={item.type}><span className={`experience-dot ${item.type.toLowerCase().replaceAll(" ","-")}`}></span><strong>{item.count} {item.count === 1 ? item.type : experiencePlural[item.type]}</strong></div>)}</div>
      <div className="science-filter" role="group" aria-label="Filter Science lessons"><button className={unitFilter === "all" ? "selected" : ""} onClick={() => onUnitFilter("all")}>All {scienceLessons.length}</button>{scienceUnits.map(unit => <button key={unit.id} className={unitFilter === unit.id ? "selected" : ""} onClick={() => onUnitFilter(unit.id)}>{unit.title}</button>)}</div>
      <div className="science-lesson-list">{visibleLessons.map((item,index)=>{const isReady=item.auditStatus === "classroom-ready";return <button key={item.id} className={isReady?"is-ready":"needs-audit"} onClick={() => onOpenLesson(item.id)} style={{ "--unit": item.unitColor, "--unit-soft": item.unitSoft } as CSSProperties}><span className="lesson-order">{String(index+1).padStart(2,"0")}</span><span className="lesson-kind">{item.journeyType}</span><span className="lesson-list-copy"><strong>{item.title}</strong><i className="lesson-audit-status">{isReady?"✓ Teacher-ready draft":"Audit complete · corrections required"}</i>{item.evidenceLevel && <i className={`lesson-evidence-level level-${item.evidenceLevel.toLowerCase().replaceAll(" ","-")}`}>{item.evidenceLevel}</i>}<small>{item.question}</small><em>Helps with the final inquiry: {item.projectContribution}</em></span><span className="lesson-duration">{item.duration}</span><b>OPEN →</b></button>})}</div>
    </div>
  );

  if (tab === "Assessments" || tab === "Final Inquiry") return (
    <div className="science-program final-inquiry-page">
      <div className="science-program-heading"><div><p className="section-kicker">CULMINATING INQUIRY PRESENTATION</p><h2>{scienceInquiryProject.title}</h2><p>{scienceInquiryProject.promise}</p></div><span>EXPERT-TEAM PROJECT</span></div>
      <div className="inquiry-stage-grid">{scienceInquiryProject.stages.map((stage,index)=><article key={stage.name}><span>{String(index+1).padStart(2,"0")}</span><h3>{stage.name}</h3><p>{stage.detail}</p></article>)}</div>
      <section className="inquiry-choice-panel"><div><p className="section-kicker">TEAM TEACHING CHOICES</p><h3>Different forms. Same scientific expectations.</h3><p>Every option must answer a focused question, communicate accurate science, use evidence, and help classmates learn.</p></div><div>{scienceInquiryProject.productChoices.map(choice=><span key={choice}>{choice}</span>)}</div></section>
      <section className="spaces-journey-plan"><div><p className="section-kicker">SCIENCE TOPIC BANK · ONE LIVING LOCAL RECORD</p><h3>Collect possibilities without creating four automatic posts.</h3><p>Students keep useful evidence, questions, models, and limits in one notebook or teacher-selected living record. They are not expected to explain or commit to a final topic before they have learned enough.</p></div><ol><li><b>1</b><span><strong>Body Systems</strong>Required March investigation story + possible topic</span></li><li><b>2</b><span><strong>Mixtures</strong>Class evidence + wonder; no default upload</span></li><li><b>3</b><span><strong>Forces</strong>Required May design evidence + possible topic</span></li><li><b>4</b><span><strong>Space</strong>Class evidence feeds the final showcase</span></li></ol><footer><strong>Then form expert teams.</strong><span>Each team investigates a different topic and teaches classmates. June uses one shared teaching artifact plus each student&apos;s individual explanation—Minecraft is optional.</span></footer></section>
      <div className="science-assessment-grid">{scienceUnits.map((unit,index) => <article key={unit.id} style={{ "--unit": unit.color, "--unit-soft": unit.soft } as CSSProperties}><span>{unit.icon}</span><p>TOPIC POSSIBILITY {index+1}</p><h3>{unit.title}</h3><strong>Save a notice, a wonder, a possible question, and one way evidence could be gathered.</strong><div><b>KNOW</b><small>{unit.content.join(" · ")}</small><b>TRY</b><small>{unit.assessment}</small><b>SAVE</b><small>One possible topic for the expert-team planning conference</small></div></article>)}</div>
    </div>
  );

  if (tab === "Pacing") return (
    <div className="science-program pacing-page">
      <div className="science-program-heading"><div><p className="section-kicker">FEB. 25–JUNE 24 · DATED HALF-YEAR PLAN</p><h2>Plan 45–51 Science blocks across the second half.</h2><p>The real sequence averages roughly 3–4 Science blocks per instructional week. Integrated ADST, Math, and ELA evidence is counted inside these projects—not added again.</p></div><span>≈ 3–4 BLOCKS / WEEK</span></div>
      <div className="pacing-list">{sciencePacing.map((period,index)=><article key={period.weeks}><span>{period.weeks}</span><div><small>WEEKS</small><h3>{period.focus}</h3><p>{period.purpose}</p></div><b>{period.blocks}<small>BLOCKS</small></b><em>{period.inquiryMove}</em>{index<sciencePacing.length-1&&<i>↓</i>}</article>)}</div>
      <section className="pacing-flex-note"><strong>Flexibility rule</strong><p>Use the published lower-prep and shortened routes when the calendar loses time. Protect concept teaching, the March investigation, the May design cycle, and the June individual explanation before adding optional production polish.</p></section>
    </div>
  );

  return (
    <div className="science-program"><div className="science-program-heading"><div><p className="section-kicker">REUSABLE CLASSROOM TOOLS</p><h2>Science resources</h2><p>Resources stay attached to the learning they support, with clear teacher preparation and student use.</p></div><span>{scienceUnits.reduce((sum,unit)=>sum+unit.resources.length,0)} RESOURCES</span></div><div className="science-resource-list">{scienceUnits.map(unit => <section key={unit.id} style={{ "--unit": unit.color, "--unit-soft": unit.soft } as CSSProperties}><header><span>{unit.icon}</span><div><p>UNIT {unit.number}</p><h3>{unit.title}</h3></div></header>{unit.resources.map((resource,index)=><article key={resource}><span>▤</span><strong>{resource}</strong><small>{index === unit.resources.length-1 ? "Assessment-ready" : "Reusable lesson tool"}</small></article>)}</section>)}</div></div>
  );
}

function StudentScienceProgram({ onOpenLesson, unitId, onUnit }: { onOpenLesson: (lessonId: string) => void; unitId: string; onUnit: (id: string) => void }) {
  const unitIndex = Math.max(0, scienceUnits.findIndex((item) => item.id === unitId));
  const unit = scienceUnits[unitIndex];
  const unitLessons = scienceLessons.filter(item => item.unitId === unit.id);
  const theme = worldFor(unit.id);
  const studentBigIdeas: Record<string, string> = {
    "body-systems": "Your body has connected systems that help you respond, stay balanced, grow, and reproduce.",
    mixtures: "Materials can be mixed and separated by using their different properties.",
    "forces-motion": "Forces can change how objects move, and evidence helps us explain those changes.",
    "earth-space": "Models and evidence help us understand Earth, space, motion, and enormous distances.",
  };
  const scrollToUnitMap = () => document.getElementById("science-unit-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <section className="student-science-program world-surface" data-world={theme.id} style={worldStyle(theme)}>
      <StudentWorldEntry theme={theme} subject="Science" unit={`Unit ${unit.number}`} title={theme.name} question={unit.question} firstMove="Choose the lesson your teacher names. Read its question before you open it." finish="A model, test result, design, or explanation that shows what you discovered." duration={`${unitLessons.length} missions`} materials={["Science notebook", "Pencil", "Lesson materials"]} onMap={scrollToUnitMap} startHref="#science-lessons" startLabel="Choose today’s mission" helpHref={null} />
      <div className="student-unit-focus">
        <div className="student-unit-question"><p>THE BIG IDEA</p><h3>{studentBigIdeas[unit.id] ?? "We will use questions, evidence, models, and discussion to build understanding."}</h3><blockquote>Keep asking: “What did we observe? What does our model explain? What is still uncertain?”</blockquote></div>
        <div className="student-unit-lessons" id="science-lessons">{unitLessons.map((item,index)=>{const ready=item.auditStatus === "classroom-ready";return <button key={item.id} className={ready?"student-lesson-ready":"student-lesson-planned"} onClick={()=>onOpenLesson(item.id)}><span>{index+1}</span><div><small>MISSION {index + 1} · {item.journeyType}</small><strong>{item.title}</strong><em>{item.question}</em></div><b>OPEN →</b></button>})}</div>
      </div>
      <details className="student-program-picker student-science-map" id="science-unit-map"><summary><span><small>WHOLE SCIENCE MAP</small><strong>Change unit or look ahead</strong></span><b>Open map ▾</b></summary><div className="student-unit-choices" role="tablist">{scienceUnits.map((item,index)=><button key={item.id} role="tab" aria-selected={unitIndex===index} className={unitIndex===index?"selected":""} onClick={()=>onUnit(item.id)}><span style={{background:item.soft,color:item.color}}>{item.icon}</span><strong>{item.title}</strong><small>Unit {index+1}</small></button>)}</div><WorldJourney theme={theme} stops={unitLessons.map((lesson) => ({ id: lesson.id, title: lesson.title, label: lesson.journeyType }))} onSelect={(id) => onOpenLesson(id)} /></details>
      <section className="student-science-showcase"><span>YOUR JUNE DESTINATION</span><h2>Become the expert on one Science idea you care about.</h2><p>For now, explore each unit. Save a question, photo, model, or result when it helps you remember. Mr. Wyatt will tell you exactly when something belongs in SpacesEDU.</p></section>
    </section>
  );
}

function StudentCurriculumView({ subject, onBack, onOpenLesson, socialLessonId, onSocialLesson, socialScene, onSocialScene, scienceUnitId, onScienceUnit, program, programExperienceId, onProgramExperience }: { subject: Subject; onBack: () => void; onOpenLesson: (lessonId: string) => void; socialLessonId: string; onSocialLesson: (id: string) => void; socialScene: number; onSocialScene: (scene: number) => void; scienceUnitId: string; onScienceUnit: (id: string) => void; program?: import("./program-types").LearningProgram; programExperienceId: string; onProgramExperience: (id: string) => void }) {
  if (subject.name === "Social Studies") {
    return (
      <div className="page student-curriculum" style={{ "--subject": subject.color, "--soft": subject.soft } as CSSProperties}>
        <button className="back-link" onClick={onBack}>← All subjects</button>
        <header className="student-space-header">
          <span className="student-space-icon" style={{ background: subject.soft, color: subject.color }}>{subject.icon}</span>
          <div><p>GRADE 6 · SOCIAL STUDIES</p><strong>Your inquiry studio</strong></div>
          <span className="student-mode-badge">TEACH VIEW · CLEAN BY DEFAULT</span>
        </header>
        <SocialStudiesStudentLaunch lessonId={socialLessonId} onLesson={onSocialLesson} scene={socialScene} onScene={onSocialScene} />
      </div>
    );
  }
  if (program) {
    return (
      <div className="page student-curriculum" style={{ "--subject": subject.color, "--soft": subject.soft } as CSSProperties}>
        <button className="back-link" onClick={onBack}>← All subjects</button>
        <header className="student-space-header">
          <span className="student-space-icon" style={{ background: subject.soft, color: subject.color }}>{subject.icon}</span>
          <div><p>GRADE 6 · {subject.short.toUpperCase()}</p><strong>{program.studioName}</strong></div>
          <span className="student-mode-badge">TEACH VIEW · CLEAN BY DEFAULT</span>
        </header>
        <StudentLearningProgram program={program} record={curriculum[subject.name]} selectedExperienceId={programExperienceId} key={programExperienceId} onExperience={onProgramExperience} />
      </div>
    );
  }
  if (subject.name !== "Science") {
    return (
      <div className="page student-curriculum" style={{ "--subject": subject.color, "--soft": subject.soft } as CSSProperties}>
        <button className="back-link" onClick={onBack}>← All subjects</button>
        <header className="student-space-header">
          <span className="student-space-icon" style={{ background: subject.soft, color: subject.color }}>{subject.icon}</span>
          <div><p>GRADE 6 · {subject.short.toUpperCase()}</p><strong>{subject.short}</strong></div>
          <span className="student-mode-badge">CURRICULUM PREVIEW</span>
        </header>
        <section className="student-not-ready">
          <span>{subject.icon}</span>
          <p className="section-kicker">STUDENT ACTIVITIES ARE NOT BUILT YET</p>
          <h1>This space is still being developed.</h1>
          <p>The official Grade 6 curriculum is available in Plan / TTOC, but there is not a classroom-ready Teach View activity here yet.</p>
          <button onClick={onBack}>Return to subjects</button>
        </section>
      </div>
    );
  }
  return (
    <div className="page student-curriculum" style={{ "--subject": subject.color, "--soft": subject.soft } as CSSProperties}>
      <button className="back-link" onClick={onBack}>← All subjects</button>
      <header className="student-space-header">
        <span className="student-space-icon" style={{ background: subject.soft, color: subject.color }}>{subject.icon}</span>
        <div><p>GRADE 6 · {subject.short.toUpperCase()}</p><strong>Your learning space</strong></div>
        <span className="student-mode-badge">TEACH VIEW · CLEAN BY DEFAULT</span>
      </header>

      <StudentScienceProgram onOpenLesson={onOpenLesson} unitId={scienceUnitId} onUnit={onScienceUnit} />
    </div>
  );
}
