"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { scienceLessons, scienceUnits, type ScienceLesson } from "./science-program";
import { scienceReadinessFor } from "./readiness-supports";
import { printClosest } from "./print-support";
import { WorldContextBand } from "./unit-world-components";
import { worldFor, worldStyle } from "./unit-worlds";
import { isReviewedStudentLessonId, resolveStudentLessonContract } from "./student-lesson-contract";
import type { DailyLaunch } from "./daily-launch";
import { TeacherDailyLaunchButton } from "./student-home-portal";
import { TeacherRunSheet, teacherRunSheetSaveTarget } from "./teacher-run-sheet";
import { coreCompetencyMovesFor, runSheetAccessibilityFor, runSheetDiscussionMovesFor } from "./learning-lens";
import { spacesPolicyForActivity } from "./classroom-program";

type Props = {
  lesson: ScienceLesson;
  mode: "teacher" | "projector";
  onHome: () => void;
  onUnitStart: () => void;
  onOpenLesson: (lesson: ScienceLesson) => void;
};

export const vocabularyHelp: Record<string, string> = {
  hypothesis: "an educated, testable prediction with a reason",
  evidence: "observations or measurements that help us judge an idea",
  variable: "something that can change in an investigation",
  stimulus: "a change the body can detect",
  receptor: "a cell or structure that detects a change",
  "nervous system": "the fast message network of brain, spinal cord, and nerves",
  hormone: "a chemical message carried through the body",
  response: "what an organism does after detecting a change",
  system: "connected parts that interact to carry out important jobs",
  structure: "a body part with a particular form and job",
  function: "the job or process a structure carries out",
  signal: "information carried from one part of a system to another",
  regulation: "adjusting a condition so it stays within a useful range",
  homeostasis: "active adjustment that keeps internal conditions in a useful range",
  kidney: "an organ that removes wastes and adjusts water and salts in blood",
  excretion: "removing metabolic waste from the body",
  feedback: "when a result influences what a system does next",
  reproduction: "the biological process that can produce new organisms",
  gamete: "a reproductive cell, such as an egg or sperm cell",
  ovary: "an organ that produces egg cells and hormones",
  testis: "an organ that produces sperm cells and hormones",
  fertilization: "the joining of an egg cell and sperm cell",
  embryo: "an early stage of development after a fertilized cell begins dividing",
  puberty: "a period of growth and body changes coordinated partly by hormones",
  mixture: "two or more substances together without becoming a new substance",
  component: "one substance or part inside a mixture",
  property: "a feature that can be observed or tested",
  heterogeneous: "a mixture whose parts are not evenly spread",
  solution: "a mixture that looks uniform because one substance is spread through another",
  solubility: "how much of a substance can dissolve in a certain liquid and condition",
  sieving: "separating pieces by particle size through openings",
  filtration: "separating undissolved particles from a fluid using a barrier",
  magnetism: "a property that lets some materials attract to a magnet",
  decanting: "carefully pouring off a liquid after heavier material settles",
  evaporation: "liquid changing into gas, leaving dissolved solids behind",
  chromatography: "separating parts of a mixture by how differently they travel through a material",
  purity: "how much a recovered sample contains only the intended substance",
  recovery: "how much of the intended material a process gets back",
  watershed: "an area of land where water drains toward the same river, lake, or ocean",
  sediment: "small solid particles carried or left behind by water, air, or ice",
  disinfection: "a process that destroys or inactivates harmful microorganisms",
  turbidity: "cloudiness in water caused by suspended particles",
  potable: "safe to drink",
  "place-based": "connected to a specific place, community, and relationship",
  protocol: "an agreed way of acting respectfully and responsibly in a situation",
  "knowledge holder": "a person recognized by a community for particular knowledge and responsibilities",
  responsibility: "a duty to act with care and answer for the effects of a choice",
  force: "a push or pull from an interaction",
  "force arrow": "a model showing where a force acts, its direction, and relative size",
  balanced: "forces combine to zero net force, so motion does not change",
  unbalanced: "forces combine to a non-zero net force, so motion changes",
  "net force": "the combined result after all forces on one object are considered",
  mass: "a measure of how much matter an object contains",
  friction: "a force that resists sliding or rolling between touching surfaces",
  "action–reaction pair": "equal and opposite forces that two interacting objects exert on each other",
  inertia: "the tendency of motion to stay the same unless a net force acts",
  acceleration: "a change in speed or direction",
  "force pair": "equal, opposite forces acting on two different interacting objects",
  impact: "a collision or sudden contact that changes motion",
  "stopping time": "how long an object takes to go from moving to stopped",
  "peak force": "the largest force measured during an impact",
  average: "a centre value found by adding results and dividing by how many results there are",
  gravity: "an attractive force between masses",
  "support force": "a contact force from a surface that pushes on an object",
  stability: "the ability to stay balanced or return to balance after a disturbance",
  interaction: "when two objects affect one another",
  constraint: "a limit a design must work within",
  criterion: "one success rule used to judge a design",
  prototype: "an early version built to test an idea",
  baseline: "the original result used for comparison",
  iteration: "a revised version based on evidence",
  revision: "a change made to improve an idea, explanation, or design",
  "trade-off": "when improving one feature may reduce another",
  "solar system": "a star and the objects held in orbit around it",
  galaxy: "a vast system of stars, gas, dust, and dark matter held by gravity",
  universe: "all space, time, matter, and energy",
  scale: "how a model's size compares with the real thing",
  "light-year": "the distance light travels in one year, used for very large space distances",
  rotation: "spinning around an axis",
  revolution: "travelling around another object",
  orbit: "a repeated curved path caused mainly by gravity and motion",
  viewpoint: "the position from which something is observed",
  "apparent motion": "movement an object seems to have because the observer or viewpoint is also moving",
  model: "a useful representation that explains some features and leaves others out",
  "indirect evidence": "clues that support an explanation without direct observation",
  limitation: "something a model, method, or result cannot show well",
  citation: "information that identifies where evidence or an idea came from",
};

type StudentMove = { label: string; action: string; response: string };

const studentMoves: Record<string, StudentMove[]> = {
  "science-launch": [
    { label: "Choose a plane and explain", action: "Choose the plane you think will fly farthest. Use one feature of its shape in your reason.", response: "A prediction that begins: ‘I predict… because…’" },
    { label: "Fix the flight test", action: "Make the launch, start line, measuring, and number of trials the same for every plane.", response: "A short list of rules for a fair test" },
    { label: "Run three rounds", action: "Test every plane three times. Compare all the results, not only the longest flight.", response: "Nine distances, three averages, and one pattern" },
    { label: "Choose the supported claim", action: "Use the average and how steady the flights were. Then name one limit of this test.", response: "A claim, two pieces of evidence, and one limit" },
  ],
  "signal-case": [
    { label: "Test your reaction time", action: "Complete three trials. Notice whether your results are exactly the same or different.", response: "Three results and one possible reason they changed" },
    { label: "Run a fair ruler-drop test", action: "Compare one teacher-approved condition. Keep the release method the same and collect at least five trials in each condition.", response: "A fair plan, repeated distances, an average or median, and one limitation" },
    { label: "Build the signal pathway", action: "Put the six steps in order from the ruler beginning to fall to your fingers closing.", response: "A six-part pathway with arrows and one model limitation" },
    { label: "Explain what the data support", action: "Compare the two conditions, explain variation, and connect the measured response to the signal pathway.", response: "A cautious claim, repeated evidence, reasoning, and one limitation" },
  ],
  "balance-case": [
    { label: "Open the hot-practice evidence", action: "Reveal the fictional timeline in order. Record three details the case shows, then mark any graph line that is a modelled prediction rather than a measurement.", response: "Three evidence notes and one supported claim about the first changing response" },
    { label: "Change one condition", action: "Predict first, then change either heat or water—not both. Compare three settings and record where the model surprises you.", response: "A three-condition comparison table and one model limitation" },
    { label: "Decide what kidneys keep or remove", action: "Use the approved source and solve all three kidney cases. Trace kidneys → ureters → bladder → urethra and justify every decision with the case clue.", response: "A labelled urinary route and three evidence-based kidney decisions" },
    { label: "Build the feedback loop", action: "Arrange change → detection → signal → response → effect. Explain how nervous, hormonal, and excretory systems help conditions move toward a useful range.", response: "A five-arrow feedback loop and a short multi-system explanation" },
  ],
  "systems-jigsaw": [
    { label: "Become one-system experts", action: "Use your assigned source to find the system job, important structures, what moves, one connection, and one model limit. Build a route, not a part list.", response: "Five sourced notes and one arrow-and-verb route model" },
    { label: "Prepare a three-minute lesson", action: "Plan one prediction, one visual route, one moving token, and one check question. Rehearse so classmates have to think rather than only listen.", response: "A checked and rehearsed three-minute expert lesson" },
    { label: "Teach in mixed groups", action: "Take turns teaching the four systems. After each mini-lesson, record the job, route, what moves, and one evidence-supported connection.", response: "A four-system comparison with three cross-system connections" },
    { label: "Solve a new body case", action: "Choose the systems required by the case clues. Trace what changes or moves and explain why one system is not enough; revise after one challenge question.", response: "One multi-system explanation and one visible revision" },
  ],
  "life-systems-studio": [
    { label: "Spot the assumption", action: "Compare the statements in the audit. Find wording that adds an identity or family assumption to a biological fact.", response: "Explain which words should change and why." },
    { label: "Use precise language", action: "Match each structure, cell, or hormone with its biological job.", response: "Use “can,” “may,” and accurate body-part names." },
    { label: "Create for a younger audience", action: "Make one clear diagram or short explanation without stereotypes.", response: "A partner checks it for both accuracy and respect." },
    { label: "Keep or skip a question", action: "Save a science question only if it is safe, respectful, and appropriate to investigate at school.", response: "Private questions can go to the anonymous question box." },
  ],
  "body-case-conference": [
    { label: "Read the clues", action: "Study the body clues. Do not choose an answer yet.", response: "Sort each clue by the body system it may connect to." },
    { label: "Build two explanations", action: "Use the clues to make two possible explanations.", response: "Show which clues support each idea." },
    { label: "Test your best idea", action: "Look for a clue that supports or weakens your explanation.", response: "Revise your idea if the evidence points somewhere else." },
    { label: "Explain the case", action: "Show how two or more systems worked together in this case.", response: "Use a labelled model or a short recorded explanation." },
  ],
  "mixture-mystery": [
    { label: "Observe before naming", action: "Look closely at the sealed jar and list only what you can actually see.", response: "Make two columns: I observe / I think it might be." },
    { label: "Test and revise", action: "Use magnetism, floating, particle size, and solubility evidence to check your first ideas.", response: "Four test records and at least two revised inferences" },
    { label: "Classify with evidence", action: "Use the videos and station results to decide whether each example is a solution, a heterogeneous mixture, or still uncertain.", response: "Two classifications defended with observable or testable properties" },
    { label: "Return to the mystery jar", action: "Build a supported component list, name what remains hidden, and explain one conclusion.", response: "One claim–evidence–reasoning response and one unanswered question" },
  ],
  "mixture-toolkit": [
    { label: "Test one property", action: "Choose a mixture part and test one useful property.", response: "Record what you observed, not what you expected." },
    { label: "Match property to method", action: "Choose a separation method that uses the property you found.", response: "Say: ‘This method works because…’" },
    { label: "Try the method", action: "Use the method and check what separated and what stayed mixed.", response: "Draw or describe the mixture before and after." },
    { label: "Build a method guide", action: "Make a quick guide that helps another group choose a method.", response: "Include the property, method, example, and one limit." },
  ],
  "separation-rescue": [
    { label: "Plan before opening", action: "Build a sequence that names the property used and predicts what separates and what remains after every step.", response: "A movable plan with a because-statement and predicted result for each step" },
    { label: "Run, pause, and revise", action: "Carry out the approved plan safely. Halfway through, compare evidence with another team and improve one weak step.", response: "Labelled fractions, one problem record, peer feedback, and one revision" },
    { label: "Evaluate more than recovery", action: "Inspect the final fractions and judge purity, recovery, efficiency, and safety separately.", response: "Specific evidence for at least two criteria and one trade-off" },
    { label: "Defend and critique", action: "Explain the strongest decision, the weakest decision, and what your team would change next.", response: "One CER response plus an answer to a classmate’s question" },
  ],
  "water-treatment-case": [
    { label: "Follow the water", action: "Put the treatment steps in the order the water moves through them.", response: "Write one job beside each step." },
    { label: "Match the problem to the step", action: "Decide which step helps with each material in the water.", response: "Explain what the step removes and what it may not remove." },
    { label: "Test a small model", action: "Use the class model to observe how the water changes.", response: "Record what improved and one thing the model cannot prove." },
    { label: "Protect the whole system", action: "Choose one action that could stop pollution before treatment is needed.", response: "Explain who could act and how it would help." },
  ],
  "place-mixtures-studio": [
    { label: "Name the source first", action: "Identify the Nation, community, knowledge holder, and place before summarizing anything.", response: "Use the exact source your teacher has provided." },
    { label: "Notice relationships", action: "Find the property, method, purpose, responsibility, and relationship to place.", response: "Record only what the approved source actually supports." },
    { label: "Compare without flattening", action: "Ask what this source helps you notice that a generic textbook description would miss.", response: "Do not turn distinct knowledge systems into matching vocabulary lists." },
    { label: "Create a respectful source card", action: "Write the attribution, key learning, and any limit on how the knowledge should be shared.", response: "Your teacher checks it before it joins the class library." },
  ],
  "force-sprint": [
    { label: "Show your first thinking", action: "Answer the force questions before the class explanation.", response: "Keep your first answers visible so you can revise them later." },
    { label: "Review only what we need", action: "Join the clinic that matches the class evidence. Repair one idea about force arrows, balanced forces, or force and mass.", response: "One corrected explanation and one labelled model" },
    { label: "Decide what comes next", action: "Return to one answer you changed, then create a question that could reveal a force pattern.", response: "An exit model, the evidence that changed your thinking, and one investigation question" },
  ],
  "force-patterns-lab": [
    { label: "Predict at each station", action: "Say what you think will happen before you test.", response: "Give a reason connected to force, mass, friction, or motion." },
    { label: "Change one thing", action: "Keep the setup fair and change only the planned part.", response: "Record at least three results." },
    { label: "Find the pattern", action: "Compare all of the results, not only the most exciting one.", response: "Write the pattern in a clear sentence." },
    { label: "Connect the pattern to a law", action: "Choose the Newton pattern that best explains your evidence.", response: "Use a diagram and name one limit of the test." },
  ],
  "crash-lab": [
    { label: "Make the crash fair", action: "Keep the cart, speed, and mass the same. Change only the padding.", response: "Check the setup before starting the trials." },
    { label: "Run repeated trials", action: "Test each padding choice three times.", response: "Record stopping time and largest force for every trial." },
    { label: "Compare the patterns", action: "Look for how stopping time and force change together.", response: "Use two measured results in your explanation." },
    { label: "Explain safer stopping", action: "Explain how padding can change a fast stop into a longer stop.", response: "Name one thing this model cannot show about a real crash." },
  ],
  "movement-forces": [
    { label: "Choose one movement", action: "Watch or perform one safe movement and choose the object you will study.", response: "Mark a before, during, and after moment." },
    { label: "Map the forces", action: "Name what pushes or pulls on the object in each moment.", response: "Draw arrows with clear sources and directions." },
    { label: "Find the force pair", action: "Choose one contact and name the force on each object.", response: "Show that the two forces act on different objects." },
    { label: "Give a useful movement tip", action: "Use the evidence to suggest one safe or effective change.", response: "Describe the movement, not the person’s ability." },
  ],
  "safer-impact-studio": [
    { label: "Study the challenge", action: "Read the goal, limits, and shared materials before building.", response: "Choose one safety idea your design will use." },
    { label: "Build a first design", action: "Make a labelled sketch, then build with the common kit.", response: "Give every feature a clear job." },
    { label: "Test and improve", action: "Use one controlled practice drop. Watch what moves, bends, or fails.", response: "Change one feature and explain the evidence behind it." },
    { label: "Complete the measured challenge", action: "Use the agreed height ladder or equivalent test. Record every result, including a useful failure.", response: "A final measured result and one comparison with the class evidence" },
    { label: "Show what the evidence means", action: "Use your design, result, and revision to explain what likely helped and what remains uncertain.", response: "An individual explanation with one successful feature, one limit, and one next test" },
  ],
  "cosmic-zoom": [
    { label: "Predict the next zoom", action: "Before clicking, name what contains the current level.", response: "Earth → solar system → Milky Way → observable universe." },
    { label: "Locate our solar system", action: "Decide whether we are near the centre or well away from it.", response: "Use a trusted source image to check your answer." },
    { label: "Catch the distortion", action: "Identify what the model enlarges, shrinks, or moves closer.", response: "Complete: “This model helps with ___, but it cannot show ___.”" },
    { label: "Save one cosmic question", action: "Choose a question about scale, origin, motion, planets, stars, or galaxies.", response: "Mark it researchable now, researchable with help, or too broad." },
  ],
  "space-motion-lab": [
    { label: "Separate seeing from explaining", action: "Describe what the sky appears to do without yet explaining why.", response: "Make two columns: observation / possible explanation." },
    { label: "Model a day", action: "Use rotation mode to follow one place from daylight into darkness.", response: "Explain day and night in one sentence." },
    { label: "Compare days and years", action: "Use planet data to compare rotation time and revolution time. Choose graph scales that keep unusual values visible.", response: "Two graphs or tables, one supported pattern, one outlier, and one question." },
    { label: "Change viewpoint", action: "Compare the view from space with the view from Earth.", response: "Explain one apparent motion and one limit of the model." },
  ],
  "cosmic-exhibit-studio": [
    { label: "Find the beautiful mistakes", action: "Open each poster claim and decide what is misleading.", response: "Classify it as scale, structure, motion, evidence, or a missing warning." },
    { label: "Choose one story", action: "Decide on the single idea your audience should remember.", response: "If the title includes “and,” the topic may still be too broad." },
    { label: "Build, cite, and warn", action: "Create the exhibit and add a visible note explaining what the model distorts.", response: "A partner checks accuracy before decoration." },
    { label: "Bring possible topics", action: "Compare your four topic possibilities for interest, evidence, safety, scope, and value to the class.", response: "Bring your best two to the expert-team planning conference." },
  ],
};

type SceneContract = {
  teacher: ScienceLesson["scenes"][number];
  student: StudentMove;
};

function sceneContractsFor(lesson: ScienceLesson): SceneContract[] {
  const moves = studentMoves[lesson.id];
  if (!moves || moves.length !== lesson.scenes.length) {
    throw new Error(`Teacher/Student scene contract mismatch for ${lesson.id}: ${lesson.scenes.length} teacher scenes and ${moves?.length ?? 0} student scenes.`);
  }
  return lesson.scenes.map((teacher, index) => ({ teacher, student: moves[index] }));
}

const forcePrintContent: Record<string, { title: string; directions: string; sections: { heading: string; prompts: string[] }[] }> = {
  "force-sprint": { title: "Forces readiness evidence", directions: "Respond before the class explanation. Keep your first idea visible, then revise in a different colour.", sections: [
    { heading: "Six-question record", prompts: ["1 ___   2 ___   3 ___   4 ___   5 ___   6 ___", "One answer I revised: ______________________________", "Evidence that changed my thinking: ______________________________"] },
    { heading: "Exit model", prompts: ["Draw one object and every important force acting on it.", "Begin each arrow on the receiving object; label the interaction.", "The motion will / will not change because ____________________________"] },
  ] },
  "force-patterns-lab": { title: "Newton-pattern station record", directions: "At every station: predict, change one condition, repeat, and name a limitation.", sections: [
    { heading: "Station 1 · Coin and card", prompts: ["Prediction: ____________________", "Repeated evidence: ____________________", "Pattern + limitation: ____________________"] },
    { heading: "Station 2 · Loaded cart", prompts: ["Kept the same: __________  Changed: __________", "Measurements: trial 1 ____  trial 2 ____  trial 3 ____", "Pattern + force diagram: ____________________"] },
    { heading: "Station 3 · Friction surfaces", prompts: ["Surfaces: __________ and __________", "Evidence: ____________________", "What the model leaves out: ____________________"] },
    { heading: "Station 4 · Interaction pair", prompts: ["Object A pushes on object B: ____________________", "Object B pushes on object A: ____________________", "Why the forces do not cancel on one object: ____________________"] },
  ] },
  "crash-lab": { title: "Crash Lab: nine trials + explanation", directions: "Keep mass and speed fixed. Change only padding. Record stopping time and largest force for every trial.", sections: [
    { heading: "Prediction", prompts: ["If padding changes from __________ to __________, then __________ because __________."] },
    { heading: "Data", prompts: ["No padding · time: ____ ____ ____ · force: ____ ____ ____ · averages: ____ / ____", "Thin foam · time: ____ ____ ____ · force: ____ ____ ____ · averages: ____ / ____", "Thick foam · time: ____ ____ ____ · force: ____ ____ ____ · averages: ____ / ____"] },
    { heading: "Graph + CER", prompts: ["Graph both averages with labelled axes and a key.", "Claim: ____________________", "Two measured pieces of evidence: ____________________", "Reasoning: ____________________", "One model limitation: ____________________"] },
  ] },
  "movement-forces": { title: "Movement force-frame analysis", directions: "Analyse the evidence, not athletic ability. A video, object, seated, or standing route is equally valid.", sections: [
    { heading: "Three frames", prompts: ["Before contact / change: ____________________", "During contact / change: ____________________", "After contact / change: ____________________"] },
    { heading: "Object–interaction map", prompts: ["Receiving object: __________  Force from: __________  Direction: __________", "Partner force acts on: __________  Force from: __________  Direction: __________", "Gravity still acts when: ____________________"] },
    { heading: "Respectful explanation", prompts: ["Evidence-based cue: ____________________", "This may vary because: ____________________"] },
  ] },
  "safer-impact-studio": { title: "Delivery Pod design + result sheet", directions: "One common kit, one sealed egg, one controlled practice drop, one evidence-based revision, and one individual explanation.", sections: [
    { heading: "Criteria and constraints", prompts: ["Protect the sealed egg · use only the common kit · fit the agreed size limit · release without a push", "Our chosen mechanism: restraint / longer stop / load spreading / another approved idea", "Labelled first sketch and feature jobs:", "____________________________________________________________"] },
    { heading: "Practice test + visible revision", prompts: ["Height: ____  Result: ____  What moved/deformed: ____________________", "One feature changed: ____________________", "Evidence-based reason: ____________________"] },
    { heading: "Measured challenge", prompts: ["Height(s): ____________________  Result(s): ____________________", "What this evidence supports: ____________________", "What it cannot prove: ____________________"] },
    { heading: "Individual SpacesEDU explanation", prompts: ["Show: team design photo/model + results table", "Explain one feature, evidence, revision, and next step in your own words.", "My strongest evidence is __________ because __________."] },
  ] },
};

function ForcePrintPack({ lesson }: { lesson: ScienceLesson }) {
  const pack = forcePrintContent[lesson.id];
  if (!pack) return null;
  return <section className="force-print-pack"><small>PRINTABLE STUDENT PAGE</small><h3>{pack.title}</h3><p>{pack.directions}</p>{pack.sections.map(section => <article key={section.heading}><h4>{section.heading}</h4>{section.prompts.map(prompt => <p key={prompt}>{prompt}</p>)}</article>)}</section>;
}

function MiniBrief({ lesson, unit, onClose }: { lesson: ScienceLesson; unit: (typeof scienceUnits)[number]; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const background = [...(dialogRef.current?.parentElement?.children ?? [])].filter((element): element is HTMLElement => element instanceof HTMLElement && element !== dialogRef.current);
    const previousInert = background.map((element) => [element, element.inert] as const);
    background.forEach((element) => { element.inert = true; });
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        closeRef.current?.focus();
        return;
      }
      const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])') ?? [])].filter((element) => !element.hasAttribute("disabled") && element.tabIndex >= 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      previousInert.forEach(([element, inert]) => { element.inert = inert; });
      returnFocus?.focus();
    };
  }, [onClose]);
  return (
    <div ref={dialogRef} className="journey-brief" role="dialog" aria-modal="true" aria-labelledby="journey-brief-title">
      <button className="journey-brief-scrim" onClick={onClose} aria-label="Close teacher brief" tabIndex={-1} />
      <aside>
        <header><div><small>TEACHER BRIEF · UNIT {unit.number}</small><h2 id="journey-brief-title">{lesson.title}</h2><p>{lesson.duration} · {lesson.journeyType}</p></div><div className="journey-brief-actions"><button onClick={(event) => printClosest(event.currentTarget, ".journey-brief")}>Print</button><button ref={closeRef} onClick={onClose} aria-label="Close teacher brief">×</button></div></header>
        <section><small>WHY THIS EXPERIENCE EXISTS</small><h3>{lesson.projectContribution}</h3><p>{lesson.learning}</p></section>
        {lesson.teacherPrep && <section className="teacher-prep-pack"><small>READY-TO-RUN PREPARATION</small><h3>Set up once. Teach from this page.</h3><div className="prep-columns"><article><b>BEFORE CLASS</b><ul>{lesson.teacherPrep.beforeClass.map(item => <li key={item}>{item}</li>)}</ul></article>{lesson.teacherPrep.perGroup && <article><b>PER GROUP</b><ul>{lesson.teacherPrep.perGroup.map(item => <li key={item}>{item}</li>)}</ul></article>}{lesson.teacherPrep.displayOrPrint && <article><b>DISPLAY OR PRINT</b><ul>{lesson.teacherPrep.displayOrPrint.map(item => <li key={item}>{item}</li>)}</ul></article>}{lesson.teacherPrep.cleanup && <article><b>SAFETY &amp; CLEANUP</b><ul>{lesson.teacherPrep.cleanup.map(item => <li key={item}>{item}</li>)}</ul></article>}</div>{lesson.teacherPrep.answerKey && <div className="prep-answer"><b>TEACHER KEY</b><ul>{lesson.teacherPrep.answerKey.map(item => <li key={item}>{item}</li>)}</ul></div>}{lesson.teacherPrep.offlineRoute && <p className="prep-fallback"><b>No internet / device route:</b> {lesson.teacherPrep.offlineRoute}</p>}{lesson.teacherPrep.lowPrepAlternative && <p className="prep-fallback"><b>Lower-prep route:</b> {lesson.teacherPrep.lowPrepAlternative}</p>}</section>}
        <ForcePrintPack lesson={lesson} />
        <section><small>CURRICULUM COVERAGE</small><p><b>Big Idea:</b> {unit.bigIdea}</p>{lesson.curriculumFocus ? <><p>{lesson.curriculumFocus.whyThisFits}</p>{lesson.curriculumFocus.content?.length ? <div className="journey-brief-tags">{lesson.curriculumFocus.content.map(item => <span key={item}>{item}</span>)}</div> : null}<ul>{lesson.curriculumFocus.competencies.map(item => <li key={item}>{item}</li>)}</ul></> : <div className="journey-brief-tags">{unit.content.map(item => <span key={item}>{item}</span>)}</div>}</section>
        {lesson.learningModes && <section><small>LEARNING MODES</small><div className="journey-brief-tags">{lesson.learningModes.map(mode => <span key={mode}>{mode}</span>)}</div></section>}
        <section><small>FLOW</small>{lesson.scenes.map((scene, index) => <div className="journey-brief-step" key={scene.title}><b>{index + 1}</b><div><strong>{scene.label}: {scene.title}{scene.time ? ` · ${scene.time}` : ""}</strong>{scene.learningMode && <small>{scene.learningMode}</small>}<p>{scene.teacherCue}</p>{scene.studentTask && <p><b>Students produce:</b> {scene.studentTask}</p>}</div></div>)}</section>
        {lesson.lessonResources && <section><small>GRADE 6 RESOURCE CHECK</small>{lesson.lessonResources.map((resource, index) => <div className="journey-brief-step" key={`${resource.label}-${index}`}><b>{resource.scene + 1}</b><div><strong>{resource.type}: {resource.url ? <a href={resource.url} target="_blank" rel="noreferrer">{resource.label} ↗</a> : resource.label}</strong><small>{resource.gradeFit ?? "Teacher preview"} · {resource.source}</small>{resource.support && <p><b>Use it well:</b> {resource.support}</p>}<p><b>Student purpose:</b> {resource.task}</p></div></div>)}</section>}
        <section><small>ASSESSMENT EVIDENCE</small><p>{lesson.evidence}</p><small>COMMON MISCONCEPTION</small><p>{lesson.misconception}</p></section>
        <section><small>SPACES EDU / FINAL INQUIRY CONNECTION</small><p>{lesson.projectContribution}</p></section>
        <section><small>MATERIALS</small><ul>{lesson.materials.map(item => <li key={item}>{item}</li>)}</ul></section>
        <section><small>KEEP IT INQUIRY-FIRST</small><ul><li>Invite a prediction before explanation.</li><li>Teach vocabulary only when students need it to name an observed pattern.</li><li>Skip a refresher when readiness evidence is already secure.</li><li>End by saving a question, useful evidence, or a model—not a disconnected worksheet.</li></ul></section>
      </aside>
    </div>
  );
}

const planeDesigns = [
  { name: "Dart", note: "narrow wings · pointed nose", className: "dart", flights: [8.4, 4.2, 5.1] },
  { name: "Glider", note: "wide wings · blunt nose", className: "glider", flights: [6.2, 6.5, 6.3] },
  { name: "Stunt", note: "short wings · lifted tips", className: "stunt", flights: [4.9, 5.2, 5.0] },
];

function PaperPlaneEvidenceLab({ scene }: { scene: number }) {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [fairAnswers, setFairAnswers] = useState<Record<number, number>>({});
  const [rounds, setRounds] = useState(0);
  const [claim, setClaim] = useState<number | null>(null);

  if (scene === 0) return <section className="evidence-sim plane-prediction">
    <header><small>THE SCHOOL HALLWAY FLIGHT TEST</small><h3>Three designs. No results yet.</h3><p>A hypothesis is an educated prediction: choose a plane and give a reason based on a feature you notice.</p></header>
    <div className="plane-choice-grid">{planeDesigns.map((plane, index) => <button key={plane.name} className={prediction === index ? "selected" : ""} onClick={() => setPrediction(index)}><i className={`paper-plane ${plane.className}`}></i><strong>{plane.name}</strong><small>{plane.note}</small><span>{prediction === index ? "MY HYPOTHESIS ✓" : "CHOOSE"}</span></button>)}</div>
    <footer><b>Say it like a scientist:</b><p>“I predict the <strong>{prediction === null ? "_____" : planeDesigns[prediction].name}</strong> will travel farthest because _____.”</p></footer>
  </section>;

  if (scene === 1) {
    const fairQuestions = [
      { prompt: "How should the planes be launched?", choices: ["Use the same launcher and launch motion", "Throw each plane however works best"], answer: 0, why: "The launch must stay the same so a harder throw does not decide the result." },
      { prompt: "Where should each flight begin?", choices: ["Give the Glider a head start", "Use the same starting line"], answer: 1, why: "The same starting line makes every measured distance comparable." },
      { prompt: "How many times should each design fly?", choices: ["Three or more times", "Once is enough"], answer: 0, why: "Repeated flights show whether a result is typical or just unusually good or bad." },
    ];
    const fairLaunch = fairAnswers[0] === fairQuestions[0].answer;
    const fairStart = fairAnswers[1] === fairQuestions[1].answer;
    const fairRepeat = fairAnswers[2] === fairQuestions[2].answer;
    const allFair = fairQuestions.every((question, index) => fairAnswers[index] === question.answer);
    return <section className="evidence-sim fair-test-lab">
      <div className={`unfair-flight ${fairLaunch ? "fair-launch" : ""} ${fairStart ? "fair-start" : ""} ${fairRepeat ? "fair-repeat" : ""}`}>
        <header><small>{allFair ? "NOW THE DIAGRAM SHOWS A FAIR TEST" : "WATCH THE TEST CHANGE AS YOU FIX IT"}</small><strong>{allFair ? "Only the plane design changes" : "Fix all three problems"}</strong></header>
        {planeDesigns.map((plane, index) => <div className="flight-setup-lane" key={plane.name}>
          <span className={`start-line start-${index}`}>START</span><i className={`paper-plane ${plane.className}`}></i>
          <div><b>{plane.name}</b><small>{fairLaunch ? "same launcher" : index === 0 ? "hard throw" : index === 1 ? "gentle throw" : "medium throw"}</small></div>
          <em>{fairRepeat ? "3 flights" : "1 flight"}</em>
        </div>)}
        <footer><span className={fairLaunch ? "fixed" : ""}>Launch {fairLaunch ? "✓" : "?"}</span><span className={fairStart ? "fixed" : ""}>Start line {fairStart ? "✓" : "?"}</span><span className={fairRepeat ? "fixed" : ""}>Repeats {fairRepeat ? "✓" : "?"}</span></footer>
      </div>
      <div className="fair-question-panel"><header><small>CHOOSE THE FAIR TEST</small><b>{Object.keys(fairAnswers).length} of 3 answered</b></header>{fairQuestions.map((question, questionIndex) => <article key={question.prompt}><strong>{questionIndex + 1}. {question.prompt}</strong><div>{question.choices.map((choice, choiceIndex) => { const answered = fairAnswers[questionIndex] !== undefined; const selected = fairAnswers[questionIndex] === choiceIndex; const correct = choiceIndex === question.answer; return <button key={choice} className={selected ? (correct ? "correct" : "incorrect") : answered && correct ? "answer" : ""} onClick={() => setFairAnswers(current => ({ ...current, [questionIndex]: choiceIndex }))}>{choice}</button>; })}</div>{fairAnswers[questionIndex] !== undefined && <p className={fairAnswers[questionIndex] === question.answer ? "correct" : "incorrect"}>{fairAnswers[questionIndex] === question.answer ? "Yes. " : "Try again. "}{question.why}</p>}</article>)}{allFair && <footer><b>Now it is a fair comparison:</b> only the plane design changes. The launch, starting line, measuring method, and number of trials stay the same.</footer>}</div>
    </section>;
  }

  if (scene === 2) {
    const averages = planeDesigns.map(plane => (plane.flights.reduce((sum, value) => sum + value, 0) / plane.flights.length).toFixed(1));
    return <section className="evidence-sim flight-trials">
      <header><div><small>REPEATED FLIGHT TEST</small><h3>{rounds === 0 ? "Ready for round one" : rounds < 3 ? `Round ${rounds} recorded` : "Three rounds complete"}</h3></div><button disabled={rounds >= 3} onClick={() => setRounds(value => Math.min(3, value + 1))}>{rounds >= 3 ? "All evidence collected" : `Fly all three · round ${rounds + 1}`}</button></header>
      <div className="flight-lanes">{planeDesigns.map((plane, planeIndex) => <article key={plane.name}><strong>{plane.name}</strong><div>{plane.flights.map((distance, trialIndex) => <span key={trialIndex} className={trialIndex < rounds ? "revealed" : ""}><i style={{ width: trialIndex < rounds ? `${distance * 10}%` : "0%" }}></i><b>{trialIndex < rounds ? `${distance} m` : `Round ${trialIndex + 1}`}</b></span>)}</div><em>{rounds === 3 ? `Average ${averages[planeIndex]} m` : "Average —"}</em></article>)}</div>
      {rounds === 1 && <aside className="evidence-pause"><b>PAUSE BEFORE CLAIMING A WINNER</b><p>The Dart flew 8.4 m—an amazing first flight. Is one result enough to prove it is the best design?</p></aside>}
      {rounds === 3 && <aside className="evidence-pattern"><b>THE PATTERN</b><p>The Dart had the longest single flight, but its results changed a lot. The Glider had the highest average and stayed close to the same distance each time.</p></aside>}
    </section>;
  }

  const claims = [
    "The Dart is best because its first flight was the longest.",
    "The Glider has the strongest evidence here: the highest average and three consistent flights.",
    "All three designs are equally effective because every plane flew.",
  ];
  return <section className="evidence-sim evidence-conclusion">
    <header><small>CLAIM + EVIDENCE</small><h3>What can we honestly conclude?</h3><p>Choose the claim supported by all three rounds—not just the most dramatic result.</p></header>
    <div>{claims.map((item, index) => <button key={item} className={claim === index ? (index === 1 ? "correct" : "incorrect") : ""} onClick={() => setClaim(index)}><span>{String.fromCharCode(65 + index)}</span>{item}</button>)}</div>
    {claim !== null && <aside className={claim === 1 ? "correct" : "incorrect"}><b>{claim === 1 ? "Yes—this matches the pattern." : "Not yet—use all three trials."}</b><p>{claim === 1 ? "This conclusion is limited to this fair test. It does not prove the Glider is best in every room, with every paper, or with every launcher." : "One exciting result or a very broad statement is weaker than repeated, comparable evidence."}</p></aside>}
    <footer><small>USE THIS STRUCTURE FOR AN INQUIRY QUESTION</small><p><strong>How does</strong> wing width <strong>affect</strong> flight distance <strong>when we keep</strong> the paper, launcher, start line, and room the same?</p><div><span>CHANGE · wing width</span><span>MEASURE · distance</span><span>KEEP THE SAME · launch conditions</span></div></footer>
  </section>;
}

function SignalLab({ scene }: { scene: number }) {
  const [timerState, setTimerState] = useState<"idle" | "waiting" | "go" | "result" | "early">("idle");
  const [trials, setTrials] = useState<number[]>([]);
  const [pathway, setPathway] = useState<number[]>([]);
  const [comparison, setComparison] = useState<number | null>(null);
  const [cerChecks, setCerChecks] = useState<Record<number, boolean>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const goTimeRef = useRef(0);
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const beginReaction = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setTimerState("waiting");
    timerRef.current = setTimeout(() => {
      goTimeRef.current = performance.now();
      setTimerState("go");
    }, 900 + Math.random() * 1700);
  };
  const tapReaction = () => {
    if (timerState === "waiting") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setTimerState("early");
      return;
    }
    if (timerState === "go") {
      const result = Math.max(1, Math.round(performance.now() - goTimeRef.current));
      setTrials(current => [...current.slice(-2), result]);
      setTimerState("result");
    }
  };
  const rulerComparisons = [
    "Dominant hand / non-dominant hand",
    "Quiet / partner talking",
    "First five trials / last five trials",
  ];
  const pathwayParts = ["Ruler begins to fall (stimulus)", "Eye receptors detect movement", "Sensory nerves carry a message", "Brain processes it", "Motor nerves carry a message", "Finger muscles close (response)"];
  const cerItems = [
    "Claim cautiously compares the two conditions",
    "Evidence uses repeated results and an average or median",
    "Reasoning connects the falling ruler to the six-part pathway",
    "Limitation names variation or a measurement weakness",
  ];
  const choosePathwayPart = (index: number) => {
    if (!pathway.includes(index) && index === pathway.length) setPathway(current => [...current, index]);
  };

  if (scene === 0) return <section className="evidence-sim reaction-lab">
    <header><small>REACTION-TIME TEST</small><h3>Wait for green. Then tap.</h3><p>Complete three trials. Do not tap early—the signal should cause the response.</p></header>
    <button className={`reaction-target ${timerState}`} onClick={timerState === "idle" || timerState === "result" || timerState === "early" ? beginReaction : tapReaction}>
      <strong>{timerState === "idle" ? "Start trial" : timerState === "waiting" ? "Wait…" : timerState === "go" ? "TAP!" : timerState === "early" ? "Too early—try again" : `${trials[trials.length - 1]} ms`}</strong>
      <span>{timerState === "go" ? "The screen changed—respond now" : timerState === "waiting" ? "Keep your hand ready" : trials.length < 3 ? `Trial ${trials.length + 1} of 3` : "Three results collected"}</span>
    </button>
    <div className="reaction-results">{[0,1,2].map(index => <article key={index}><small>TRIAL {index + 1}</small><b>{trials[index] ? `${trials[index]} ms` : "—"}</b></article>)}</div>
    {trials.length === 3 && <footer><b>Notice the variation:</b><span>Your results do not need to match. Attention, anticipation, practice, and ordinary measurement variation can all affect reaction time.</span></footer>}
  </section>;

  if (scene === 1) return <section className="evidence-sim spaces-checkpoint life-spaces">
    <header><small>FAIR RULER-DROP INVESTIGATION</small><h3>Change one safe factor. Repeat both conditions.</h3><p>Your teacher approves one comparison. Keep the partner, ruler, release without warning, starting mark, catching fingers, and reading method the same.</p></header>
    <div>{rulerComparisons.map((item, index) => <button key={item} className={comparison === index ? "checked" : ""} onClick={() => setComparison(index)}><b>{comparison === index ? "✓" : index + 1}</b><span>{item}</span></button>)}</div>
    <footer><strong>Record before concluding:</strong><span>five ruler-drop distances per condition · average or median · noticed pattern · one limitation. A smaller catch distance means a shorter response time; never rank classmates by speed.</span></footer>
  </section>;

  if (scene === 2) return <section className="evidence-sim reaction-pathway">
    <header><small>SIX-PART SIGNAL PATHWAY</small><h3>What happened between falling and catching?</h3><p>Choose the six cards in order. If a card does not move, another step comes first.</p></header>
    <div className="pathway-built">{pathwayParts.map((part, index) => <span key={part} className={pathway.includes(index) ? "placed" : ""}><b>{index + 1}</b>{pathway.includes(index) ? part : "?"}</span>)}</div>
    <div className="pathway-bank">{pathwayParts.map((part, index) => <button key={part} disabled={pathway.includes(index)} className={index === pathway.length ? "next" : ""} onClick={() => choosePathwayPart(index)}>{part}</button>)}</div>
    {pathway.length === pathwayParts.length && <footer><b>One useful model:</b> receptors, nerves, the brain, and muscles each do a different job. The cards simplify signals that happen in a connected system.</footer>}
  </section>;

  return <section className="evidence-sim spaces-checkpoint life-spaces">
    <header><small>DATA CONFERENCE · CER</small><h3>What does the ruler-drop evidence actually support?</h3><p>Use careful language: a difference in this small test does not automatically prove that the changed factor caused the result.</p></header>
    <div>{cerItems.map((item, index) => <button key={item} className={cerChecks[index] ? "checked" : ""} onClick={() => setCerChecks(value => ({ ...value, [index]: !value[index] }))}><b>{cerChecks[index] ? "✓" : index + 1}</b><span>{item}</span></button>)}</div>
    <footer><strong>CER frame:</strong><span>Our data suggest ___ because across repeated trials ___. This may make sense because stimulus → receptor → sensory message → processing → motor message → response. One limitation is ___.</span></footer>
  </section>;
}

function BalanceLab({ scene }: { scene: number }) {
  const [heat, setHeat] = useState(2);
  const [water, setWater] = useState(2);
  const [caseStep, setCaseStep] = useState(0);
  const [kidneyCase, setKidneyCase] = useState(0);
  const [kidneyAnswers, setKidneyAnswers] = useState<Record<number, number>>({});
  const [loop, setLoop] = useState<number[]>([]);
  const strain = Math.max(0, Math.min(4, heat + (3 - water)));
  const timeline = [
    { time: "3:10", event: "Practice begins", evidence: "Shade temperature 30°C · water bottle full · urine earlier was pale yellow" },
    { time: "3:25", event: "Body heat rises", evidence: "Skin feels warmer · sweating begins · heart rate rises with activity" },
    { time: "3:45", event: "Water loss continues", evidence: "Bottle half empty · strong thirst · less saliva · sweat continues" },
    { time: "5:30", event: "After practice", evidence: "Body cools · thirst remains · later urine amount is smaller and colour is darker" },
  ];
  const kidneyCases = [
    { title: "Hot practice, little water", clue: "Water is being lost in sweat and intake is low.", choices: ["Return more water to blood; make less concentrated urine", "Return more water to blood; make less, more concentrated urine", "Remove extra water; make more dilute urine"], answer: 1, why: "Conserving more water helps protect blood-water balance. Less water leaves in urine, so the urine becomes more concentrated." },
    { title: "Cool day, plenty of water", clue: "Water intake is high and sweating is low.", choices: ["Remove more extra water; urine can be more dilute", "Keep every drop of water; no urine forms", "Add waste back into the blood"], answer: 0, why: "Kidneys continually adjust. When extra water is available, more can leave in a larger amount of more dilute urine." },
    { title: "Waste made by cells", clue: "Normal cell activity adds dissolved wastes to blood.", choices: ["Keep all wastes because they are dissolved", "Filter blood, return needed materials, and send wastes toward urine", "Move wastes directly from the stomach to the bladder"], answer: 1, why: "Kidneys filter blood, return much of what the body needs, and help remove dissolved wastes and extra water through urine." },
  ];
  const loopParts = ["Heat and water loss increase", "Receptors and the brain detect change", "Nervous and hormonal signals travel", "Sweating, thirst, and kidney responses adjust", "Conditions move toward a useful range"];

  if (scene === 0) return <section className="evidence-sim body-case-timeline"><header><small>FICTIONAL CASE DATA · NOT A PERSONAL HEALTH TEST</small><h3>Open the evidence in time order.</h3><p>For each stage, separate what the case shows from what you infer the body is doing.</p></header><div>{timeline.map((item, index) => <button key={item.time} className={index <= caseStep ? "revealed" : ""} onClick={() => setCaseStep(Math.max(caseStep, index))}><b>{item.time}</b><span><strong>{item.event}</strong><small>{index <= caseStep ? item.evidence : "Predict before revealing"}</small></span></button>)}</div><footer><b>Graph it:</b><span>Use the four time points to sketch likely trends for body heat, thirst, sweating, and urine concentration. Mark which lines are measured evidence and which are modelled predictions.</span></footer></section>;

  if (scene === 1) return <div className="evidence-sim balance-sim">
    <div className="balance-readout"><span><small>BODY HEAT</small><b>{["cool", "mild", "warm", "hot", "very hot"][heat]}</b></span><span><small>WATER INTAKE</small><b>{["none", "low", "normal", "high"][water]}</b></span></div>
    <div className="body-response-meter"><i style={{ width: `${30 + strain * 14}%` }}></i><span>Adjustment effort</span></div>
    <div className="response-cards"><article><small>SWEAT</small><b>{strain > 2 ? "increases" : "lower"}</b></article><article><small>THIRST</small><b>{water < 2 || strain > 2 ? "increases" : "lower"}</b></article><article><small>KIDNEYS</small><b>{water < 2 ? "conserve more water" : water > 2 && heat < 3 ? "release more water" : "adjust water"}</b></article></div>
    <div className="range-controls"><label>Heat <input type="range" min="0" max="4" value={heat} onChange={event => setHeat(Number(event.target.value))} /></label><label>Water <input type="range" min="0" max="3" value={water} onChange={event => setWater(Number(event.target.value))} /></label></div>
    <footer><b>Model limit:</b><span>This shows broad response patterns. It cannot diagnose a person or predict an exact amount of sweat, thirst, or urine.</span></footer>
  </div>;

  if (scene === 2) {
    const current = kidneyCases[kidneyCase];
    const chosen = kidneyAnswers[kidneyCase];
    return <section className="evidence-sim kidney-decisions"><header><small>KIDNEY DECISION CASES</small><h3>Filter does not mean “throw everything away.”</h3><p>Use the condition and the source evidence to decide what adjustment makes sense.</p></header><nav>{kidneyCases.map((item, index) => <button key={item.title} className={kidneyCase === index ? "selected" : kidneyAnswers[index] === item.answer ? "solved" : ""} onClick={() => setKidneyCase(index)}><b>{kidneyAnswers[index] === item.answer ? "✓" : index + 1}</b>{item.title}</button>)}</nav><article><small>CASE EVIDENCE</small><h4>{current.title}</h4><p>{current.clue}</p><div>{current.choices.map((choice, index) => <button key={choice} className={chosen === index ? (index === current.answer ? "correct" : "try-again") : ""} onClick={() => setKidneyAnswers(value => ({ ...value, [kidneyCase]: index }))}>{choice}</button>)}</div>{chosen !== undefined && <aside className={chosen === current.answer ? "correct" : "try-again"}>{chosen === current.answer ? current.why : "Recheck what the blood needs to keep and what urine carries away in this condition."}</aside>}</article></section>;
  }

  return <section className="evidence-sim feedback-loop-builder"><header><small>BUILD A COORDINATED RESPONSE</small><h3>{loop.length} of {loopParts.length} links built</h3><p>Choose the next causal link. A list of organs is not yet a systems explanation.</p></header><div className="feedback-loop-route">{loopParts.map((item, index) => <span key={item} className={loop.includes(index) ? "placed" : ""}><b>{index + 1}</b>{loop.includes(index) ? item : "?"}</span>)}</div><div className="feedback-loop-bank">{[3, 0, 4, 1, 2].map(index => <button key={loopParts[index]} disabled={loop.includes(index)} onClick={() => { if (index === loop.length) setLoop(value => [...value, index]); }}>{loopParts[index]}</button>)}</div><footer><b>{loop.length === loopParts.length ? "Feedback loop complete:" : "Narrate every arrow:"}</b><span>{loop.length === loopParts.length ? "The responses change conditions, and that changing result influences what the system does next." : "What changes or travels between these two steps?"}</span></footer></section>;
}

function SystemsJigsaw({ scene }: { scene: number }) {
  const [system, setSystem] = useState(0);
  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const [caseIndex, setCaseIndex] = useState(0);
  const [caseChoice, setCaseChoice] = useState<Record<number, number>>({});
  const systems = [
    { name: "Nervous", job: "Detect change, process information, and send fast targeted signals.", route: "receptor → sensory nerve → brain/spinal cord → motor nerve → target", moves: "electrical and chemical signals", connection: "The brain can influence hormone release and receives information about internal conditions." },
    { name: "Hormonal", job: "Coordinate slower or longer-lasting changes through chemical messages.", route: "gland → hormone in blood → target cells → response", moves: "hormones carried in blood", connection: "Hormones influence growth, puberty, water balance, stress responses, and reproductive processes." },
    { name: "Excretory", job: "Remove metabolic wastes and regulate water and dissolved materials in blood.", route: "blood → kidneys → ureters → bladder → urethra", moves: "blood, filtered materials, returned water/salts, and urine", connection: "Hormonal messages help kidneys adjust how much water is returned to blood." },
    { name: "Reproductive", job: "Produce reproductive cells and hormones and include structures involved in fertilization and development.", route: "varies by structure and process; use the approved diagram", moves: "reproductive cells, hormones, and materials supporting development", connection: "Hormonal signals coordinate puberty and reproductive processes; blood supplies developing tissues." },
  ];
  const cases = [
    { title: "The starting light turns green", clue: "Eyes detect light and fingers press a button almost immediately.", choices: ["Nervous + excretory", "Nervous + muscles", "Hormonal + reproductive"], answer: 1, why: "A fast sensory-to-motor pathway carries the signal; muscles carry out the response." },
    { title: "A hot day with little water", clue: "Thirst rises and kidneys conserve more water.", choices: ["Nervous/hormonal + excretory", "Reproductive + nervous only", "Excretory only"], answer: 0, why: "Signals coordinate the response, while kidneys adjust water returned to blood and water leaving in urine." },
    { title: "Changes during puberty", clue: "Chemical messages coordinate growth and reproductive-system development over time.", choices: ["Nervous only", "Hormonal + reproductive", "Excretory only"], answer: 1, why: "Hormones act as messages that influence reproductive structures and other body tissues; timing and effects vary." },
  ];
  const current = systems[system];
  if (scene === 0) return <section className="evidence-sim system-expert-board"><header><small>ASSIGNED EXPERT LENS</small><h3>One system deeply—not four systems shallowly.</h3><p>Select a system to open its evidence brief. Your teacher assigns the final expert lens.</p></header><nav>{systems.map((item, index) => <button key={item.name} className={system === index ? "selected" : ""} onClick={() => setSystem(index)}><b>{index + 1}</b>{item.name}</button>)}</nav><article><small>EXPERT BRIEF</small><h3>{current.name} system</h3><div><b>Main job</b><p>{current.job}</p></div><div><b>Route to model</b><p>{current.route}</p></div><div><b>What moves</b><p>{current.moves}</p></div><aside><b>Connection to investigate</b><p>{current.connection}</p></aside></article></section>;
  if (scene === 1) { const items = ["One prediction classmates answer", "A labelled route—not a part list", "One token showing what moves", "One connection to another system", "One model limit", "One check question with an answer"]; return <section className="evidence-sim expert-lesson-builder"><header><small>THREE-MINUTE EXPERT LESSON</small><h3>{Object.values(checks).filter(Boolean).length} of {items.length} teaching elements planned</h3><p>Your classmates should predict, model, or decide something. They should not only listen.</p></header><div>{items.map((item, index) => <button key={item} className={checks[index] ? "checked" : ""} onClick={() => setChecks(value => ({ ...value, [index]: !value[index] }))}><b>{checks[index] ? "✓" : index + 1}</b>{item}</button>)}</div><footer><b>Rehearsal check:</b><span>Can a classmate explain the route after your lesson without reading your notes?</span></footer></section>; }
  if (scene === 2) return <section className="evidence-sim jigsaw-rotation"><header><small>MIXED-GROUP TEACHING</small><h3>Four experts build one connected body map.</h3><p>After each mini-lesson, listeners record the job, route, what moves, and one connection.</p></header><div>{systems.map((item, index) => <article key={item.name}><b>{index + 1}</b><strong>{item.name}</strong><span>job → route → what moves → connection → limit</span><small>LISTENERS ASK: What evidence supports that connection?</small></article>)}</div><footer><b>Do not copy every fact.</b><span>Record one accurate causal connection from each expert lesson.</span></footer></section>;
  const activeCase = cases[caseIndex]; const chosen = caseChoice[caseIndex];
  return <section className="evidence-sim multi-system-cases"><header><small>TRANSFER TO A NEW CASE</small><h3>{activeCase.title}</h3><p>{activeCase.clue}</p></header><nav>{cases.map((item, index) => <button key={item.title} className={caseIndex === index ? "selected" : caseChoice[index] === item.answer ? "solved" : ""} onClick={() => setCaseIndex(index)}>Case {index + 1}</button>)}</nav><div>{activeCase.choices.map((choice, index) => <button key={choice} className={chosen === index ? (index === activeCase.answer ? "correct" : "try-again") : ""} onClick={() => setCaseChoice(value => ({ ...value, [caseIndex]: index }))}>{choice}</button>)}</div>{chosen !== undefined && <footer className={chosen === activeCase.answer ? "correct" : "try-again"}><b>{chosen === activeCase.answer ? "Supported" : "Not enough"}</b><span>{chosen === activeCase.answer ? activeCase.why : "Select the systems required by the evidence, then explain what each contributes."}</span></footer>}</section>;
}

function MixtureJar({ scene }: { scene: number }) {
  const [sorts, setSorts] = useState<Record<number, "observation" | "inference">>({});
  const [contentsRevealed, setContentsRevealed] = useState(false);
  const [caseIndex, setCaseIndex] = useState(0);
  const [identityAnswers, setIdentityAnswers] = useState<Record<number, string>>({});
  const [methodAnswers, setMethodAnswers] = useState<Record<number, string>>({});
  const [classificationIndex, setClassificationIndex] = useState(0);
  const [classificationAnswers, setClassificationAnswers] = useState<Record<number, string>>({});
  const [classificationEvidence, setClassificationEvidence] = useState<Record<number, string>>({});
  const statements = [
    { text: "Some pieces are much larger than others.", answer: "observation" },
    { text: "The dark pieces must be steel.", answer: "inference" },
    { text: "Some light pieces are floating.", answer: "observation" },
    { text: "There is dissolved salt in the water.", answer: "inference" },
  ] as const;
  const evidenceCases = [
    { code: "Sample D", description: "Dull silver pieces sink to the bottom.", test: "A bagged magnet pulls every piece sideways through the jar.", identity: "Steel pieces", identityChoices: ["Gravel", "Steel pieces", "Cork pieces"], method: "Magnet", methodChoices: ["Filter", "Magnet", "Sieve"], why: "The magnetic response is stronger evidence than colour or sinking. A magnet can recover the steel while leaving the non-magnetic components behind." },
    { code: "Sample B", description: "Light tan chunks stay at the surface after stirring stops.", test: "The pieces do not dissolve, and a magnet has no effect.", identity: "Cork pieces", identityChoices: ["Cork pieces", "Salt", "Steel pieces"], method: "Skim", methodChoices: ["Evaporate", "Skim", "Filter"], why: "Persistent floating distinguishes the cork. Skimming targets material at the surface without trying to filter the whole jar." },
    { code: "Sample E", description: "Large irregular pieces remain solid in water.", test: "A 4 mm screen holds them while smaller grains and liquid pass through.", identity: "Gravel", identityChoices: ["Sand", "Gravel", "Salt"], method: "Sieve", methodChoices: ["Sieve", "Skim", "Evaporate"], why: "The screen result is evidence of larger particle size. A sieve with suitable openings can separate the gravel." },
    { code: "Sample A", description: "Fine gritty particles settle slowly and make the water cloudy when stirred.", test: "They pass through a coarse screen but remain on filter paper.", identity: "Sand", identityChoices: ["Salt", "Steel pieces", "Sand"], method: "Filter", methodChoices: ["Magnet", "Filter", "Skim"], why: "The particles are undissolved and small enough to pass a sieve, but large enough for filter paper to trap." },
    { code: "Sample C", description: "After the visible solids are removed, the liquid looks clear.", test: "Filtering changes nothing, but crystals remain after a small sample evaporates.", identity: "Dissolved salt", identityChoices: ["Dissolved salt", "Fine sand", "Cork pieces"], method: "Evaporate", methodChoices: ["Sieve", "Evaporate", "Magnet"], why: "Crystals after evaporation show that dissolved material remained in the clear liquid. Ordinary filtering cannot trap dissolved salt." },
  ];
  const classificationCases = [
    { code: "Example 1", title: "Salt water after stirring", observation: "The salt is no longer visible. The liquid looks clear, and crystals remain after a small sample evaporates.", classification: "Solution", classificationChoices: ["Heterogeneous mixture", "Solution", "Not enough evidence"], evidence: "Crystals remain after evaporation", evidenceChoices: ["The liquid looks clear", "Crystals remain after evaporation", "Salt started as a solid"], why: "The evaporation result shows that salt was still present and spread through the water even when it could not be seen." },
    { code: "Example 2", title: "Gravel and sand", observation: "Two sizes of solid pieces remain visible, and a screen holds the gravel while sand passes through.", classification: "Heterogeneous mixture", classificationChoices: ["Solution", "Not enough evidence", "Heterogeneous mixture"], evidence: "Different solid parts remain visible and can be sorted by size", evidenceChoices: ["Both materials are solids", "Different solid parts remain visible and can be sorted by size", "The gravel is darker"], why: "The parts are not evenly spread at the particle level; they remain visibly different and can be separated using particle size." },
    { code: "Example 3", title: "Sugar water", observation: "After stirring, no sugar grains are visible. A later evaporation test leaves sugar crystals behind.", classification: "Solution", classificationChoices: ["Not enough evidence", "Heterogeneous mixture", "Solution"], evidence: "Sugar crystals return after the water evaporates", evidenceChoices: ["Sugar crystals return after the water evaporates", "The cup feels smooth", "The water is colourless"], why: "The test shows that sugar remains present even though it is no longer visible, which supports classifying the sample as a solution." },
    { code: "Example 4", title: "Unknown clear liquid", observation: "The sealed cup looks colourless and clear. No property test has been completed.", classification: "Not enough evidence", classificationChoices: ["Solution", "Heterogeneous mixture", "Not enough evidence"], evidence: "A clear appearance cannot show whether something is dissolved", evidenceChoices: ["Clear liquids are always solutions", "A clear appearance cannot show whether something is dissolved", "Nothing is visible, so it is pure water"], why: "Appearance alone cannot confirm a solution or a pure substance. A safe property test is still needed." },
  ];
  const contents = ["water", "cork pieces", "steel washers", "gravel", "fine sand", "dissolved salt · not visible"];

  if (scene === 0) {
    const correct = statements.filter((item, index) => sorts[index] === item.answer).length;
    return <section className="evidence-sim mixtures-ui mixture-observe"><div className="mixture-photo"><img src="/images/mixture-jar-v1.png" width="1672" height="941" alt="A sealed clear jar with water, floating cork pieces, steel washers, gravel, and fine sand" /><span>CLASS SAMPLE · SALT MAY BE PRESENT EVEN WHEN IT CANNOT BE SEEN</span>{contentsRevealed && <div className="mixture-reveal" aria-live="polite"><small>TEACHER-PREPARED CONTENTS</small>{contents.map(item => <b key={item}>{item}</b>)}</div>}<button onClick={() => setContentsRevealed(value => !value)}>{contentsRevealed ? "Hide contents" : "Reveal contents after observing"}</button></div><div><header><small>OBSERVATION OR INFERENCE?</small><h3>{correct} of {statements.length} correctly sorted</h3><p>The jar starts as a mystery, but it does not stay vague. First record what is visible; then reveal and test the prepared components.</p></header><div className="mixture-statement-list">{statements.map((item, index) => <article key={item.text} className={sorts[index] ? (sorts[index] === item.answer ? "correct" : "try-again") : ""}><p>{item.text}</p><div><button onClick={() => setSorts(current => ({ ...current, [index]: "observation" }))}>Observation</button><button onClick={() => setSorts(current => ({ ...current, [index]: "inference" }))}>Inference</button></div>{sorts[index] && <b>{sorts[index] === item.answer ? "✓ That fits." : "Try again: could you confirm this just by looking?"}</b>}</article>)}</div></div></section>;
  }

  if (scene === 1) {
    const current = evidenceCases[caseIndex];
    const identity = identityAnswers[caseIndex];
    const chosenMethod = methodAnswers[caseIndex];
    const solved = identity === current.identity && chosenMethod === current.method;
    const completed = evidenceCases.filter((item, index) => identityAnswers[index] === item.identity && methodAnswers[index] === item.method).length;
    return <section className="evidence-sim mixtures-ui mixture-evidence-cases"><header><small>IDENTIFY FROM TEST EVIDENCE · ROTATE, TEST, REVISE</small><h3>{completed} of {evidenceCases.length} evidence cases solved</h3><p>Use the hands-on property stations first. Then use these shuffled cases to revise an inference and connect each test result to a useful method.</p></header><div className="evidence-case-tabs">{evidenceCases.map((item, index) => <button key={item.code} className={caseIndex === index ? "selected" : identityAnswers[index] === item.identity && methodAnswers[index] === item.method ? "solved" : ""} onClick={() => setCaseIndex(index)}><span>{identityAnswers[index] === item.identity && methodAnswers[index] === item.method ? "✓" : index + 1}</span>{item.code}</button>)}</div><div className="evidence-case-body"><article className="sample-evidence"><small>{current.code}</small><h4>What the team observed</h4><p>{current.description}</p><h4>Property-test result</h4><strong>{current.test}</strong></article><div className="evidence-decisions"><section><small>REVISE · WHAT IS IT?</small>{current.identityChoices.map(choice => <button key={choice} className={identity === choice ? (choice === current.identity ? "correct" : "try-again") : ""} onClick={() => setIdentityAnswers(value => ({ ...value, [caseIndex]: choice }))}>{choice}</button>)}</section><section><small>APPLY · WHAT METHOD FITS?</small>{current.methodChoices.map(choice => <button key={choice} className={chosenMethod === choice ? (choice === current.method ? "correct" : "try-again") : ""} onClick={() => setMethodAnswers(value => ({ ...value, [caseIndex]: choice }))}>{choice}</button>)}</section></div></div><footer className={solved ? "correct" : identity || chosenMethod ? "try-again" : ""}><strong>{solved ? "Inference revised with evidence" : "Use the property-test result"}</strong><span>{solved ? current.why : "A strong revision must fit the observation, the test result, and the method—not just the material’s appearance."}</span></footer></section>;
  }

  if (scene === 2) {
    const current = classificationCases[classificationIndex];
    const chosenClassification = classificationAnswers[classificationIndex];
    const chosenEvidence = classificationEvidence[classificationIndex];
    const solved = chosenClassification === current.classification && chosenEvidence === current.evidence;
    const completed = classificationCases.filter((item, index) => classificationAnswers[index] === item.classification && classificationEvidence[index] === item.evidence).length;
    return <section className="evidence-sim mixtures-ui mixture-evidence-cases"><header><small>MIXTURE, SOLUTION, OR UNCERTAIN?</small><h3>{completed} of {classificationCases.length} examples defended</h3><p>Use the video ideas and property evidence together. “It looks clear” is not enough evidence by itself.</p></header><div className="evidence-case-tabs">{classificationCases.map((item, index) => <button key={item.code} className={classificationIndex === index ? "selected" : classificationAnswers[index] === item.classification && classificationEvidence[index] === item.evidence ? "solved" : ""} onClick={() => setClassificationIndex(index)}><span>{classificationAnswers[index] === item.classification && classificationEvidence[index] === item.evidence ? "✓" : index + 1}</span>{item.code}</button>)}</div><div className="evidence-case-body"><article className="sample-evidence"><small>{current.code}</small><h4>{current.title}</h4><p>{current.observation}</p><h4>Question</h4><strong>Which classification is supported—and what evidence matters most?</strong></article><div className="evidence-decisions"><section><small>DECISION 1 · CLASSIFY</small>{current.classificationChoices.map(choice => <button key={choice} className={chosenClassification === choice ? (choice === current.classification ? "correct" : "try-again") : ""} onClick={() => setClassificationAnswers(value => ({ ...value, [classificationIndex]: choice }))}>{choice}</button>)}</section><section><small>DECISION 2 · CITE EVIDENCE</small>{current.evidenceChoices.map(choice => <button key={choice} className={chosenEvidence === choice ? (choice === current.evidence ? "correct" : "try-again") : ""} onClick={() => setClassificationEvidence(value => ({ ...value, [classificationIndex]: choice }))}>{choice}</button>)}</section></div></div><footer className={solved ? "correct" : chosenClassification || chosenEvidence ? "try-again" : ""}><strong>{solved ? "Classification defended" : "Use testable evidence"}</strong><span>{solved ? current.why : "Choose a classification and the strongest observable or testable evidence. Uncertainty is a valid answer when the evidence is missing."}</span></footer></section>;
  }

  const supportedComponents = ["Water · the visible liquid; its purity is not confirmed by sight", "Steel · pulled by a magnet", "Cork · stays floating and is non-magnetic", "Gravel + sand · distinguished by particle-size tests", "Dissolved salt · hidden by sight; supported only by an evaporation result"];
  return <section className="evidence-sim mixtures-ui mixture-mission-brief"><header><small>RETURN TO THE ORIGINAL JAR</small><h3>What is supported—and what is still hidden?</h3><p>Build the component list from the class evidence board. Do not treat a good guess as a confirmed component.</p></header><div className="mission-steps">{supportedComponents.map((item, index) => <article key={item}><b>{index + 1}</b><span>{item}</span></article>)}</div><footer><strong>CER + unanswered question</strong><span>Claim one component. Cite its specific test result. Explain why that property supports the claim. Then name evidence that is still missing or a safe test that would reduce uncertainty.</span></footer></section>;
}

function SeparationLab({ scene }: { scene: number }) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [message, setMessage] = useState("Several first moves can work. Name the property before choosing a tool.");
  const [recovered, setRecovered] = useState<Record<string, boolean>>({});
  const [testChecks, setTestChecks] = useState<Record<number, boolean>>({});
  const [criteriaChecks, setCriteriaChecks] = useState<Record<string, boolean>>({});
  const [explanation, setExplanation] = useState(0);
  const methods = [
    { key: "magnet", label: "Magnet", component: "steel", property: "magnetism", rule: () => true, result: "Steel is recovered because the magnet attracts it. Everything else remains." },
    { key: "skim", label: "Skim", component: "cork", property: "floating", rule: () => true, result: "Cork is recovered because it floats at the surface." },
    { key: "sieve", label: "Sieve", component: "gravel", property: "particle size", rule: () => true, result: "Large gravel is caught while smaller materials and liquid pass through." },
    { key: "filter", label: "Filter", component: "sand", property: "particle size", rule: () => sequence.includes("sieve") && sequence.includes("skim"), result: "Sand is trapped by the filter. Dissolved salt passes through with the water." },
    { key: "evaporate", label: "Evaporate", component: "salt", property: "water evaporates", rule: () => sequence.includes("filter"), result: "Water slowly leaves as vapour and salt remains. The water is not recovered." },
  ];
  const tryMethod = (method: (typeof methods)[number]) => {
    if (!method.rule()) {
      setMessage(method.key === "filter" ? "The filter would clog with large or floating pieces. Remove those first so the filter can trap the sand." : "Filter out the sand first. Otherwise the dry salt would still be mixed with sand.");
      return;
    }
    setSequence(current => [...current, method.key]);
    setMessage(method.result);
  };
  const reset = () => { setSequence([]); setMessage("Several first moves can work. Name the property before choosing a tool."); };
  const resultItems = ["Steel pieces", "Floating cork", "Gravel", "Sand", "Clear salt-water fraction"];
  const score = resultItems.filter(item => recovered[item]).length;
  const explanations = [
    { method: "Magnet", sentence: "We used a magnet because the steel was magnetic. The steel moved to the magnet while the other components stayed in the mixture.", limit: "A magnet only separates materials that respond strongly to it." },
    { method: "Sieve", sentence: "We used a sieve because the gravel pieces were larger than the openings. The gravel stayed while smaller material and water passed through.", limit: "A sieve cannot separate pieces that are all smaller than its openings." },
    { method: "Filter", sentence: "We filtered because sand is an undissolved solid. The sand stayed in the filter while salt water passed through.", limit: "A filter does not remove salt that is dissolved in water." },
    { method: "Evaporation", sentence: "Water can evaporate while dissolved salt remains behind because the two substances change state differently.", limit: "This takes time and does not collect the water unless a more complex process is used." },
  ];
  const testItems = [
    "Label every collection cup before the first step",
    "Carry out the approved plan one step at a time",
    "Photograph or describe one problem at the midpoint",
    "Compare one fraction or step with another team",
    "Record one specific piece of peer feedback",
    "Revise one weak step, then continue safely",
  ];
  const criteria = [
    { name: "Purity", prompt: "How much unwanted material remains?" },
    { name: "Recovery", prompt: "How much target material was collected?" },
    { name: "Efficiency", prompt: "Where were time, tools, or material wasted?" },
    { name: "Safety", prompt: "Which observations show the process stayed safe?" },
  ];

  if (scene === 0) return <section className="evidence-sim mixtures-ui separation-sim"><header><small>PLAN BEFORE OPENING THE SAMPLE</small><h3>Build the first separation sequence.</h3><p>Name the property before each method. After each click, add the predicted result and what remains mixed to your team’s movable plan.</p></header><div className="separation-status"><span>STEPS PLANNED</span><b>{sequence.length} / 5</b><button onClick={reset}>Reset</button></div><div className="remaining-components">{methods.map(item => <span key={item.key} className={sequence.includes(item.key) ? "recovered" : ""}>{sequence.includes(item.key) ? "✓" : "•"} {item.component}</span>)}</div><div className="method-bank">{methods.map(method => <button key={method.key} disabled={sequence.includes(method.key)} onClick={() => tryMethod(method)}>{method.label}<small>uses {method.property}</small></button>)}</div><div className="sequence-line">{sequence.length ? sequence.map((key, index) => { const selectedMethod = methods.find(item => item.key === key); return <span key={key}><b>{index + 1}</b>{selectedMethod?.label}{index < sequence.length - 1 && <i>→</i>}</span>; }) : <p>Choose a method only after naming the property it uses.</p>}</div><div className={`method-feedback ${sequence.length === 5 ? "complete" : ""}`}><b>{sequence.length === 5 ? "PLAN READY FOR TEACHER CHECK" : "PREDICTED RESULT"}</b><p>{sequence.length === 5 ? "You built one workable first plan. The first three methods could be ordered differently; filtering and evaporation depend on earlier cleanup. Narrate every because-statement before opening the sample." : message}</p></div><div className="rescue-rules"><strong>Approval checks</strong><span>Property named</span><span>Result predicted</span><span>What remains tracked</span><span>No tasting or heating</span></div></section>;

  if (scene === 1) return <section className="evidence-sim mixtures-ui source-save"><header><small>HANDS-ON RESCUE · MIDPOINT STOP</small><h3>Run the plan, compare evidence, revise one step.</h3><p>The screen is a pause guide, not a substitute for the materials. Collect every fraction in a labelled cup and stop when your teacher calls the midpoint.</p></header><div>{testItems.map((item, index) => <button key={item} className={testChecks[index] ? "checked" : ""} onClick={() => setTestChecks(value => ({ ...value, [index]: !value[index] }))}><b>{testChecks[index] ? "✓" : index + 1}</b><span>{item}</span></button>)}</div><footer><strong>Keep visible</strong><span>Goggles on · no tasting or heating · nothing down the sink · teacher manages evaporation. Record: before ___; peer evidence ___; we changed ___; we predict ___.</span></footer></section>;

  if (scene === 2) return <section className="evidence-sim mixtures-ui rescue-score"><header><small>EVALUATE · DO NOT COLLAPSE THIS TO ONE SCORE</small><h3>Inspect five fractions. Judge four criteria separately.</h3><p>{score} of {resultItems.length} fractions are marked ready to inspect. That count is evidence—not the final evaluation.</p></header><div>{resultItems.map((item, index) => <button key={item} className={recovered[item] ? "recovered" : ""} onClick={() => setRecovered(current => ({ ...current, [item]: !current[item] }))}><b>{recovered[item] ? "✓" : index + 1}</b><span>{item}</span></button>)}</div><section className="source-save"><header><small>RECORD SPECIFIC EVIDENCE</small><h3>What did each criterion reveal?</h3></header><div>{criteria.map((item, index) => <button key={item.name} className={criteriaChecks[item.name] ? "checked" : ""} onClick={() => setCriteriaChecks(value => ({ ...value, [item.name]: !value[item.name] }))}><b>{criteriaChecks[item.name] ? "✓" : index + 1}</b><span>{item.name} · {item.prompt}</span></button>)}</div></section><footer><strong>{Object.values(criteriaChecks).filter(Boolean).length} of {criteria.length} criteria discussed</strong><span>Compare at least two with evidence. A process can recover a lot of material but still have low purity, waste time, or create a safety concern.</span></footer></section>;

  const currentExplanation = explanations[explanation];
  return <section className="evidence-sim mixtures-ui rescue-explain"><header><small>DEFEND ONE DECISION · CRITIQUE ANOTHER</small><h3>Use the team’s actual evidence—not a perfect story.</h3><p>Select a method for a property → method → result model, then compare that model with what really happened.</p></header><div className="explain-methods">{explanations.map((item, index) => <button key={item.method} className={explanation === index ? "selected" : ""} onClick={() => setExplanation(index)}>{item.method}</button>)}</div><article><small>MODEL ONE DECISION</small><p>{currentExplanation.sentence}</p><aside><b>Limit:</b> {currentExplanation.limit}</aside></article><div className="mission-steps">{["Strongest · What evidence shows this decision worked?", "Weakest · Where did purity, loss, time, or safety become a problem?", "Next · What exact change would improve the result?"].map((item, index) => <article key={item}><b>{index + 1}</b><span>{item}</span></article>)}</div><footer><strong>CER + peer question</strong><span>Our strongest decision was ___; evidence shows ___. It worked because ___. A weakness was ___, so next time ___. Then answer one classmate’s question with evidence.</span></footer></section>;
}

function SeparationToolkit({ scene }: { scene: number }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [expertMethod, setExpertMethod] = useState(0);
  const cases = [
    { name: "Muddy water", clue: "Tiny solid particles remain suspended", choices: ["Particle size", "Magnetism", "Boiling point"], answer: 0 },
    { name: "Steel + plastic", clue: "Only one material is strongly attracted", choices: ["Solubility", "Magnetism", "Floating"], answer: 1 },
    { name: "Salt water", clue: "The solid is spread through the water", choices: ["Particle size", "Colour", "Different evaporation behaviour"], answer: 2 },
    { name: "Gravel + sand", clue: "The solid pieces have different sizes", choices: ["Particle size", "Magnetism", "Solubility"], answer: 0 },
    { name: "Cork + water", clue: "One material stays at the surface", choices: ["Floating", "Boiling point", "Magnetism"], answer: 0 },
    { name: "Black marker ink", clue: "Several pigments travel differently through paper", choices: ["Chromatography movement", "Magnetism", "Sieving"], answer: 0 },
  ];
  const methods = [
    { name: "Sieving", property: "particle size", test: "two useful mixtures + one failure case" },
    { name: "Magnetism", property: "magnetic response", test: "steel among magnetic and non-magnetic solids" },
    { name: "Skimming / decanting", property: "floating or settling", test: "surface and settled materials" },
    { name: "Filtration", property: "undissolved particle size", test: "muddy water and salt water" },
    { name: "Evaporation", property: "different state-change behaviour", test: "dissolved salt or sugar" },
    { name: "Chromatography", property: "different movement through paper", test: "water-soluble marker pigments" },
  ];
  if (scene === 0) {
    const current = cases[caseIndex];
    const chosen = answers[caseIndex];
    return <section className="mixtures-ui toolkit-board"><header><small>PROPERTY-FIRST CARD SORT</small><h3>{Object.keys(answers).length} of {cases.length} cases considered</h3><p>Choose the property difference before naming a tool.</p></header><div className="toolkit-cases">{cases.map((item, index) => <button key={item.name} className={caseIndex === index ? "selected" : answers[index] === item.answer ? "complete" : ""} onClick={() => setCaseIndex(index)}><span>{answers[index] === item.answer ? "✓" : index + 1}</span><strong>{item.name}</strong><small>{item.clue}</small></button>)}</div><article className="toolkit-question"><small>WHAT DIFFERENCE COULD WE USE?</small><h3>{current.name}</h3><p>{current.clue}</p><div>{current.choices.map((choice, index) => <button key={choice} className={chosen === index ? (index === current.answer ? "correct" : "try-again") : ""} onClick={() => setAnswers(value => ({ ...value, [caseIndex]: index }))}>{choice}</button>)}</div>{chosen !== undefined && <aside>{chosen === current.answer ? "That property could support a separation method. Now name a possible tool and its limit." : "That difference would not separate this case reliably. Re-read the clue."}</aside>}</article></section>;
  }
  if (scene === 1) return <section className="mixtures-ui expert-method-board"><header><small>EXPERT-GROUP INVESTIGATION</small><h3>One method. Three tests. Three-minute teaching.</h3><p>Select a method to see the evidence every expert group must gather.</p></header><div className="expert-method-grid">{methods.map((item, index) => <button key={item.name} className={expertMethod === index ? "selected" : ""} onClick={() => setExpertMethod(index)}><b>{index + 1}</b><span><strong>{item.name}</strong><small>uses {item.property}</small></span></button>)}</div><article><small>YOUR EXPERT BRIEF</small><h3>{methods[expertMethod].name}</h3><p>Test: {methods[expertMethod].test}.</p><ol><li>Show what starts together.</li><li>Demonstrate what moves, passes through, or remains.</li><li>Explain the property.</li><li>Reveal one case where the method fails.</li></ol></article></section>;
  if (scene === 2) return <section className="mixtures-ui carousel-board"><header><small>CLASS TOOLKIT CAROUSEL</small><h3>Six stations · six challenge questions</h3><p>Every group teaches. Every visitor leaves with evidence and a limitation.</p></header><div>{methods.map((item, index) => <article key={item.name}><b>{index + 1}</b><div><strong>{item.name}</strong><span>{item.property}</span></div><small>VISITORS RECORD: what separates · what remains · one limit</small></article>)}</div><footer><strong>Challenge question</strong><span>“What would happen if the component were dissolved, much smaller, non-magnetic, or the same density?”</span></footer></section>;
  const applicationCases = ["Muddy stream water", "Mixed recycling fragments", "Salt water", "Trail mix ingredients"];
  return <section className="mixtures-ui application-board"><header><small>NO SINGLE SECRET SEQUENCE</small><h3>Defend a process for an unfamiliar problem.</h3><p>Choose two cases. Build a sequence, then name a trade-off or limit.</p></header><div>{applicationCases.map((item, index) => <article key={item}><b>{index + 1}</b><strong>{item}</strong><p>Property → method → result → next problem</p><button>Discuss and sketch a defensible sequence</button></article>)}</div><footer><strong>A strong answer</strong><span>explains why each method follows from evidence and why a tempting alternative would not fully work.</span></footer></section>;
}

function WaterTreatmentLab({ scene }: { scene: number }) {
  const [opened, setOpened] = useState<number[]>([]);
  const [sequence, setSequence] = useState<string[]>([]);
  const [claim, setClaim] = useState<number | null>(null);
  const stages = [
    { name: "Protected watershed", job: "Protect source water before treatment begins." },
    { name: "Treatment", job: "Use processes chosen for the source-water conditions." },
    { name: "Testing", job: "Check whether water meets safety and quality requirements." },
    { name: "Storage", job: "Hold treated water and balance changing demand." },
    { name: "Delivery", job: "Move water through mains to communities and schools." },
  ];
  const train = ["Source protection", "Particle removal", "Disinfection", "Testing", "Storage + delivery"];
  const addStage = (item: string) => { if (!sequence.includes(item)) setSequence(value => [...value, item]); };
  if (scene === 0) return <section className="mixtures-ui water-route"><header><small>LOCAL SYSTEM CASE FILE</small><h3>Follow one drop toward our school.</h3><p>Open each stage after finding evidence for its job in the Metro Vancouver source.</p></header><div>{stages.map((item, index) => <button key={item.name} className={opened.includes(index) ? "opened" : ""} onClick={() => setOpened(value => value.includes(index) ? value.filter(number => number !== index) : [...value, index])}><b>{index + 1}</b><strong>{item.name}</strong><span>{opened.includes(index) ? item.job : "Find evidence, then open"}</span></button>)}</div><footer><strong>Source check</strong><span>Which stages are shown directly? Which parts of the route to this particular school are still inferences?</span></footer></section>;
  if (scene === 1) return <section className="mixtures-ui treatment-train"><header><small>SYSTEMS PUZZLE</small><h3>Build a treatment train with more than a filter.</h3><p>Add stages, then defend the order. A changed source-water problem may require a different design.</p></header><div className="train-bank">{train.map(item => <button key={item} disabled={sequence.includes(item)} onClick={() => addStage(item)}>{item}</button>)}</div><div className="train-line">{sequence.length ? sequence.map((item, index) => <span key={item}><b>{index + 1}</b>{item}{index < sequence.length - 1 && <i>→</i>}</span>) : <p>Begin with the problem the system must solve.</p>}</div><aside><button onClick={() => setSequence([])}>Reset</button><p>{sequence.includes("Particle removal") && sequence.includes("Disinfection") && sequence.includes("Testing") ? "Your system recognizes that clear-looking water still needs other barriers and evidence." : "A complete defence must address visible particles, microorganisms, and proof of safety."}</p></aside></section>;
  if (scene === 2) return <section className="mixtures-ui filter-model"><header><small>MODEL, NOT DRINKING-WATER TEST</small><h3>A clearer sample is not proven safe.</h3><p>Build and revise a particle filter, but keep the limits visible throughout the investigation.</p></header><div className="filter-column"><span>GRAVEL</span><span>COARSE SAND</span><span>FINE MATERIAL</span><i>prepared muddy water</i><b>collect for observation only</b></div><div className="filter-evidence"><article><small>MEASURE OR DESCRIBE</small><strong>Visible particles · colour · relative turbidity · flow time</strong></article><article><small>THIS MODEL CANNOT PROVE</small><strong>Microbe removal · dissolved contaminant removal · safe-to-drink status</strong></article><article><small>REDESIGN ONE FEATURE</small><strong>Layer order · layer depth · filter material · pouring rate</strong></article></div><footer><strong>DO NOT DRINK</strong><span>All samples remain investigation materials, even when the collected water looks clear.</span></footer></section>;
  const claims = [
    { text: "It looks clear, so it is safe to drink.", answer: false, why: "Appearance does not reveal microbes or many dissolved substances. Testing and other treatment barriers are still required." },
    { text: "Our filter reduced visible particles in this sample.", answer: true, why: "This stays within the evidence the classroom model can actually provide." },
    { text: "Every water system must use exactly the same process.", answer: false, why: "Treatment depends on source-water conditions, regulations, risks, infrastructure, and ongoing evidence." },
  ];
  return <section className="mixtures-ui public-claim"><header><small>PUBLIC INFORMATION CHALLENGE</small><h3>Correct the dangerous claim.</h3><p>Choose a statement, decide whether the evidence supports it, and turn the correction into a clear public message.</p></header><div>{claims.map((item, index) => <button key={item.text} className={claim === index ? (item.answer ? "correct" : "warning") : ""} onClick={() => setClaim(index)}><b>{String.fromCharCode(65 + index)}</b><span>{item.text}</span></button>)}</div>{claim !== null && <article><strong>{claims[claim].answer ? "Supported—with this careful wording" : "Not supported"}</strong><p>{claims[claim].why}</p><small>Now create a mini-poster, 60-second announcement, or Minecraft information-kiosk sketch.</small></article>}</section>;
}

function SourceLab({ scene }: { scene: number }) {
  const [lens, setLens] = useState(0);
  const [claim, setClaim] = useState(0);
  const [claimSorts, setClaimSorts] = useState<Record<number, number>>({});
  const [saved, setSaved] = useState<number[]>([]);
  const organizer = [
    ["SOURCE", "Who created or shared it? Name the Nation, community, organization, or knowledge holder exactly."],
    ["PLACE", "What place, season, materials, or relationships are part of the knowledge?"],
    ["METHOD", "What action or process does the source actually describe?"],
    ["PURPOSE", "Why is the method used, and what responsibilities or protocols accompany it?"],
  ];
  const claims = [
    { text: "The named source describes this method for this place and purpose.", answer: 0 },
    { text: "Particle size, solubility, or another property may help us explain part of the process scientifically.", answer: 1 },
    { text: "All First Peoples used this same method in the same way.", answer: 2 },
  ];
  const categories = ["Supported by the source", "Separate science connection", "Not supported—do not claim"];

  if (scene === 0) return <section className="evidence-sim mixtures-ui source-prepare"><header><small>TEACHER-PROVIDED SOURCE</small><h3>Four details must be visible before we begin.</h3><p>This lesson needs one specific, locally appropriate source. A generic paragraph about “First Peoples” is not enough.</p></header><div>{["Nation, community, or knowledge holder", "Title and creator of the source", "Place connected to the learning", "Any guidance about attribution or sharing"].map((item, index) => <article key={item}><b>{index + 1}</b><span>{item}</span></article>)}</div><footer><strong>Students:</strong><span>Use the exact source your teacher opens. Do not search for a generic replacement.</span></footer></section>;

  if (scene === 1) return <section className="evidence-sim mixtures-ui source-sim"><div className="source-rings">{organizer.map((item, index) => <button key={item[0]} className={lens === index ? "selected" : ""} onClick={() => setLens(index)}><span>{index + 1}</span>{item[0]}</button>)}</div><article><small>SOURCE NOTE ORGANIZER</small><h3>{organizer[lens][0]}</h3><p>{organizer[lens][1]}</p><b>Record only what the selected source supports. A blank box is better than a guess.</b></article></section>;

  if (scene === 2) {
    const current = claims[claim];
    return <section className="evidence-sim mixtures-ui source-claims"><header><small>CAREFUL CONNECTION</small><h3>What kind of statement is this?</h3><p>{current.text}</p></header><div className="claim-tabs">{claims.map((_, index) => <button key={index} className={claim === index ? "selected" : ""} onClick={() => setClaim(index)}>Statement {index + 1}</button>)}</div><div className="claim-sort">{categories.map((item, index) => <button key={item} className={claimSorts[claim] === index ? (current.answer === index ? "correct" : "try-again") : ""} onClick={() => setClaimSorts(currentSorts => ({ ...currentSorts, [claim]: index }))}>{item}</button>)}</div>{claimSorts[claim] !== undefined && <footer className={claimSorts[claim] === current.answer ? "correct" : "try-again"}><strong>{claimSorts[claim] === current.answer ? "Yes." : "Try again."}</strong><span>{current.answer === 0 ? "This claim stays close to the named source." : current.answer === 1 ? "This is a science interpretation, so keep it separate from what the source itself says." : "One source cannot support a claim about all Nations or communities."}</span></footer>}</section>;
  }

  const saveItems = ["Exact source and attribution", "One learning the source supports", "One connection to mixture science", "One notice and one wonder for later"];
  return <section className="evidence-sim mixtures-ui source-save"><header><small>BRIEF SPACES EDU NOTE · OPTIONAL</small><h3>Save learning—not a final topic.</h3><p>You may use a different inquiry topic later. Today’s note simply keeps useful evidence and a question from disappearing.</p></header><div>{saveItems.map((item, index) => <button key={item} className={saved.includes(index) ? "checked" : ""} onClick={() => setSaved(current => current.includes(index) ? current.filter(value => value !== index) : [...current, index])}><b>{saved.includes(index) ? "✓" : index + 1}</b><span>{item}</span></button>)}</div><footer><strong>{saved.length === saveItems.length ? "Enough for now." : "No presentation is required today."}</strong><span>Any later inquiry involving community knowledge needs teacher approval before research begins.</span></footer></section>;
}

function LifeSystemsStudio({ scene }: { scene: number }) {
  const [selected, setSelected] = useState(0);
  const [caseIndex, setCaseIndex] = useState(0);
  const [caseAnswers, setCaseAnswers] = useState<Record<number, number>>({});
  const [claimIndex, setClaimIndex] = useState(0);
  const [claimAnswers, setClaimAnswers] = useState<Record<number, number>>({});
  const [sequence, setSequence] = useState<number[]>([]);
  const [limits, setLimits] = useState<number[]>([]);
  const statements = [
    { text: "Ovaries can produce egg cells and hormones.", verdict: "Accurate biological function", explanation: "This names what an organ can do without making a claim about a person’s identity or family role." },
    { text: "Reproductive body parts tell us a person’s personality and interests.", verdict: "Science cannot support this claim", explanation: "Body structures have biological functions. They do not tell us someone’s personality, interests, or how they describe themselves." },
    { text: "Everyone begins and finishes puberty at the same age.", verdict: "Inaccurate generalization", explanation: "The timing and sequence of puberty vary. Accurate explanations allow for normal human variation." },
    { text: "A diagram shows every detail of human reproduction.", verdict: "A model with limits", explanation: "A diagram can make a process easier to understand, but it leaves out variation, scale, timing, and many details." },
  ];
  const evidenceCases = [
    { title: "Case A · cell evidence", clue: "A single large reproductive cell contains stored materials and can join with a sperm cell.", choices: ["Egg cell", "Hormone", "Uterus"], answer: 0, why: "The clue identifies a reproductive cell and describes the biological role of an egg cell." },
    { title: "Case B · cell evidence", clue: "A small mobile reproductive cell carries genetic information and can join with an egg cell.", choices: ["Embryo", "Sperm cell", "Ovary"], answer: 1, why: "The clue describes a sperm cell. Mobility alone is not enough; the reproductive-cell role is the stronger evidence." },
    { title: "Case C · organ evidence", clue: "This organ can release egg cells and produces hormones involved in reproductive processes.", choices: ["Testis", "Uterus", "Ovary"], answer: 2, why: "An ovary can produce egg cells and hormones. The singular term is ovary; the plural is ovaries." },
    { title: "Case D · organ evidence", clue: "This organ can produce sperm cells and hormones. Two are called testes.", choices: ["Testis", "Uterus", "Egg cell"], answer: 0, why: "One organ is a testis; the plural is testes." },
    { title: "Case E · development evidence", clue: "After implantation, this muscular organ can support development of an embryo and fetus.", choices: ["Ovary", "Uterus", "Bladder"], answer: 1, why: "The uterus can support development. A diagram should not imply that every fertilized cell implants or develops." },
    { title: "Case F · message evidence", clue: "These chemical messages travel through the body and help coordinate growth, puberty, and reproductive processes.", choices: ["Hormones", "Gametes", "Nerves"], answer: 0, why: "Hormones are chemical messages. They act through target cells and do not create one identical puberty timeline for everyone." },
  ];
  const claims = [
    { text: "Everyone starts puberty at age 11.", choices: ["Supported pattern", "Too fixed—rewrite it", "Not a science question"], answer: 1, why: "Puberty timing varies. Better: ‘Puberty often begins during late childhood or adolescence, but the age and sequence vary.’" },
    { text: "Hormones help coordinate changes during puberty.", choices: ["Supported pattern", "Too fixed—rewrite it", "Not a science question"], answer: 0, why: "This accurately describes a biological role without claiming the same timing or changes for everyone." },
    { text: "Reproductive anatomy tells us a person's personality or identity.", choices: ["Supported pattern", "Too fixed—rewrite it", "Science cannot support the claim"], answer: 2, why: "Anatomy has biological functions, but it does not determine personality, interests, family role, or how a person identifies." },
    { text: "Bodies may experience puberty changes in different orders and at different times.", choices: ["Supported pattern", "Too fixed—rewrite it", "Science cannot support the claim"], answer: 0, why: "This wording recognizes common biological patterns and normal variation." },
  ];
  const events = ["Egg and sperm cells are produced", "An egg cell and sperm cell may join in fertilization", "The fertilized cell begins dividing", "An embryo may implant in the lining of the uterus", "Development continues through embryo and fetal stages"];
  const limitOptions = ["The cards compress months of development into five steps.", "The model does not show scale or most intermediate changes.", "The word ‘may’ matters: not every cell or fertilization leads to implantation or birth.", "The sequence explains every person’s identity and family story."];

  if (scene === 0) {
    const current = statements[selected];
    return <section className="evidence-sim life-audit">
      <div className="life-statement-list"><small>AFTER THE DIAGRAM LESSON · AUDIT ALL FOUR</small>{statements.map((item, index) => <button key={item.text} className={selected === index ? "selected" : ""} onClick={() => setSelected(index)}><span>{index + 1}</span>{item.text}</button>)}</div>
      <article><small>WHAT CAN THE EVIDENCE SUPPORT?</small><h3>{current.verdict}</h3><p>{current.explanation}</p><b>Strong science says exactly what the evidence supports—no more and no less.</b></article>
    </section>;
  }

  if (scene === 1) {
    const current = evidenceCases[caseIndex]; const chosen = caseAnswers[caseIndex];
    return <section className="evidence-sim life-evidence-cases"><header><small>SHUFFLED EVIDENCE CASES</small><h3>{Object.entries(caseAnswers).filter(([key, value]) => evidenceCases[Number(key)].answer === value).length} of {evidenceCases.length} solved</h3><p>Use the clue that rules out the alternatives. Position on the screen gives no hint.</p></header><nav>{evidenceCases.map((item, index) => <button key={item.title} className={caseIndex === index ? "selected" : caseAnswers[index] === item.answer ? "solved" : ""} onClick={() => setCaseIndex(index)}><b>{caseAnswers[index] === item.answer ? "✓" : index + 1}</b>{item.title.split(" · ")[0]}</button>)}</nav><article><small>{current.title}</small><h4>Evidence</h4><p>{current.clue}</p><div>{current.choices.map((choice, index) => <button key={choice} className={chosen === index ? (index === current.answer ? "correct" : "try-again") : ""} onClick={() => setCaseAnswers(value => ({ ...value, [caseIndex]: index }))}>{choice}</button>)}</div>{chosen !== undefined && <aside className={chosen === current.answer ? "correct" : "try-again"}>{chosen === current.answer ? current.why : "That choice does not fit every clue. Name the strongest evidence and rule out one alternative."}</aside>}</article></section>;
  }

  if (scene === 2) { const current = claims[claimIndex]; const chosen = claimAnswers[claimIndex]; return <section className="evidence-sim puberty-claim-lab"><header><small>SOURCE-BASED CLAIM AUDIT</small><h3>Common pattern or fixed rule?</h3><p>Do not use classmates’ bodies as evidence. Use the approved sources.</p></header><nav>{claims.map((_, index) => <button key={index} className={claimIndex === index ? "selected" : claimAnswers[index] === claims[index].answer ? "solved" : ""} onClick={() => setClaimIndex(index)}>Claim {index + 1}</button>)}</nav><article><p>{current.text}</p><div>{current.choices.map((choice, index) => <button key={choice} className={chosen === index ? (index === current.answer ? "correct" : "try-again") : ""} onClick={() => setClaimAnswers(value => ({ ...value, [claimIndex]: index }))}>{choice}</button>)}</div>{chosen !== undefined && <aside className={chosen === current.answer ? "correct" : "try-again"}>{chosen === current.answer ? current.why : "Return to the source. Does this wording allow variation and stay within what biological evidence can support?"}</aside>}</article></section>; }

  return <section className="evidence-sim development-sequence"><header><small>SIMPLIFIED PROCESS MODEL</small><h3>{sequence.length} of {events.length} events placed</h3><p>Build the sequence, then choose the three scientifically honest model warnings.</p></header><div className="development-route">{events.map((item, index) => <span key={item} className={sequence.includes(index) ? "placed" : ""}><b>{index + 1}</b>{sequence.includes(index) ? item : "?"}</span>)}</div><div className="development-bank">{[2, 4, 0, 3, 1].map(index => <button key={events[index]} disabled={sequence.includes(index)} onClick={() => { if (index === sequence.length) setSequence(value => [...value, index]); }}>{events[index]}</button>)}</div><aside><small>MODEL-LIMIT CHECK</small>{limitOptions.map((item, index) => <button key={item} className={limits.includes(index) ? (index < 3 ? "correct" : "try-again") : ""} onClick={() => setLimits(value => value.includes(index) ? value.filter(number => number !== index) : [...value, index])}><b>{limits.includes(index) ? "✓" : "?"}</b>{item}</button>)}</aside><footer><b>Private exit option:</b><span>Explain one event accurately and one thing this model leaves out. A topic-bank post is optional, and no personal disclosure is required.</span></footer></section>;
}

function BodyCaseConference({ scene }: { scene: number }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [systems, setSystems] = useState<Record<string, boolean>>({});
  const [buildChecks, setBuildChecks] = useState<Record<number, boolean>>({});
  const [peerChecks, setPeerChecks] = useState<Record<number, boolean>>({});
  const cases = [
    { title: "Hot tournament", evidence: ["Air temperature is high", "Sweating and thirst rise", "Later urine is smaller in amount and darker"], systems: ["Nervous", "Hormonal", "Excretory"], caution: "The case cannot diagnose dehydration severity or predict one person’s exact response." },
    { title: "Starting signal", evidence: ["Eyes detect a light change", "A hand responds in about 250 ms", "Repeated times vary"], systems: ["Nervous", "Muscular"], caution: "The timer does not measure intelligence, athletic ability, or a simple reflex." },
    { title: "Growth and sleep changes", evidence: ["Growth occurs over months", "Sleep timing shifts", "Puberty timing differs among people"], systems: ["Hormonal", "Nervous", "Reproductive"], caution: "The case cannot predict a person’s exact development or identity." },
    { title: "Long bus ride", evidence: ["Water intake is high", "Activity and sweating are low", "A bathroom stop is needed later"], systems: ["Hormonal", "Excretory", "Nervous"], caution: "The simplified case leaves out medicines, health conditions, temperature, and individual variation." },
  ];
  const allSystems = ["Nervous", "Hormonal", "Excretory", "Reproductive", "Muscular"];
  const current = cases[caseIndex];
  if (scene === 0) return <section className="evidence-sim case-triage"><header><small>FICTIONAL CASE · EVIDENCE TRIAGE</small><h3>{current.title}</h3><p>Select a case, then choose systems only when a clue requires them.</p></header><nav>{cases.map((item, index) => <button key={item.title} className={caseIndex === index ? "selected" : ""} onClick={() => { setCaseIndex(index); setSystems({}); }}>{item.title}</button>)}</nav><div className="case-evidence-list">{current.evidence.map((item, index) => <article key={item}><b>{index + 1}</b>{item}</article>)}</div><div className="case-system-bank">{allSystems.map(item => <button key={item} className={systems[item] ? (current.systems.includes(item) ? "supported" : "unsupported") : ""} onClick={() => setSystems(value => ({ ...value, [item]: !value[item] }))}>{item}</button>)}</div><footer><b>Missing-information marker:</b><span>{current.caution}</span></footer></section>;
  if (scene === 1) { const items = ["Every system is required by case evidence", "Every arrow begins and ends at a named part or condition", "Every arrow uses a verb: detects, sends, carries, filters, returns, removes, changes", "At least one arrow connects two systems", "One missing-information or model-limit marker is visible"]; return <section className="evidence-sim causal-model-check"><header><small>MODEL CONFERENCE BEFORE DECORATION</small><h3>{Object.values(buildChecks).filter(Boolean).length} of {items.length} checks complete</h3><p>Paper, slides, video, or Minecraft can work. First make the causal chain scientifically useful.</p></header><div>{items.map((item, index) => <button key={item} className={buildChecks[index] ? "checked" : ""} onClick={() => setBuildChecks(value => ({ ...value, [index]: !value[index] }))}><b>{buildChecks[index] ? "✓" : index + 1}</b>{item}</button>)}</div><footer><b>Required chain:</b><span>case evidence → system part → what moves or changes → response → effect</span></footer></section>; }
  if (scene === 2) { const items = ["The claim answers the case question", "At least two systems have clear jobs", "A listener can follow every arrow", "Evidence—not just vocabulary—supports the explanation", "The team names what its model cannot conclude"]; return <section className="evidence-sim peer-case-panel"><header><small>TWO-MINUTE CASE CONFERENCE</small><h3>Listeners test the explanation.</h3><p>Check only what you can hear or see. Ask one question about evidence or a causal connection.</p></header><div>{items.map((item, index) => <button key={item} className={peerChecks[index] ? "checked" : ""} onClick={() => setPeerChecks(value => ({ ...value, [index]: !value[index] }))}><b>{peerChecks[index] ? "✓" : "?"}</b>{item}</button>)}</div><aside><b>Challenge question stem</b><p>“What evidence shows that the _____ system is needed between _____ and _____?”</p></aside></section>; }
  return <section className="evidence-sim case-revision"><header><small>VISIBLE REVISION</small><h3>Improve the explanation—not just the appearance.</h3><p>Choose the change that would help a learner most.</p></header><div>{["Repair a weak or missing arrow", "Add evidence beside a claim", "Remove a system the case does not require", "Clarify what moves between systems", "Add a specific model limitation"].map((item, index) => <article key={item}><b>{index + 1}</b><strong>{item}</strong><span>Before: _____ → After: _____ → Why this is stronger: _____</span></article>)}</div><footer><b>SpacesEDU is optional here.</b><span>Save the model only if it will support later expert-team inquiry. One individual reflection sentence is enough.</span></footer></section>;
}

const readinessQuestions = [
  {
    skill: "receiving object",
    title: "A foot kicks a soccer ball",
    prompt: "Which object receives the push that changes its motion?",
    choices: ["The foot", "The ball", "The field", "The goal"],
    answer: 1,
    explanation: "The foot applies the force; the ball receives it. Force explanations should name both objects: the foot pushes on the ball.",
    visual: "kick",
  },
  {
    skill: "force arrows",
    title: "Drawing a force arrow",
    prompt: "If you're drawing a force arrow, which description best describes how to do that?",
    choices: ["Draw the arrow beside the object to show which way it is moving", "Start the arrow on the object, point it in the direction of the force, and label the force", "Start the arrow on the object causing the force and point it backward", "Point the arrow down because gravity is always present"],
    answer: 1,
    explanation: "Start the arrow on the object receiving the force. Point it in the direction the force acts. Then label the force—for example, ‘push from foot.’",
    visual: "arrow",
  },
  {
    skill: "force versus motion",
    title: "A skateboard rolls right while friction acts left",
    prompt: "What happens next?",
    choices: ["It instantly moves left", "It keeps the same speed", "It slows down while still moving right", "It speeds up to the right"],
    answer: 2,
    explanation: "The board is still moving right, but the leftward friction changes that motion by slowing it. Force direction and motion direction are not always the same.",
    visual: "friction",
  },
  {
    skill: "balanced forces",
    title: "Two teams pull equally in opposite directions",
    prompt: "What do the equal arrows predict?",
    choices: ["A change to the left", "A change to the right", "No change in motion", "No forces are acting"],
    answer: 2,
    explanation: "The opposite forces balance, so the net force is zero. That means no change in motion—not that no forces exist.",
    visual: "balance",
  },
  {
    skill: "everyday forces",
    title: "A book rests on a table",
    prompt: "Which force description is most complete?",
    choices: ["No forces act", "Only gravity acts downward", "Gravity acts down and the table supports up", "The table pushes the book sideways"],
    answer: 2,
    explanation: "Earth pulls the book down and the table pushes it up. Those forces balance, so the book's motion does not change.",
    visual: "book",
  },
  {
    skill: "force and mass",
    title: "The same push acts on two carts",
    prompt: "One cart is empty and one is loaded. Which changes speed more?",
    choices: ["The lighter cart", "The heavier cart", "They must change equally", "Neither cart changes"],
    answer: 0,
    explanation: "With the same force, the lower-mass cart has the greater acceleration. This is the pattern we will use—not an equation we need to memorize first.",
    visual: "mass",
  },
] as const;

function KickSequence({ reveal = "none", focus = 1 }: { reveal?: "none" | "ball" | "pair"; focus?: number }) {
  return <figure className={`kick-sequence focus-${focus}`}>
    <Image unoptimized src="/images/forces-kick-sequence.png" width={1774} height={887} alt="Three side-view frames show the same student before touching a soccer ball, during foot-to-ball contact, and after the ball moves away." />
    <figcaption><span>BEFORE CONTACT</span><span>DURING CONTACT</span><span>AFTER CONTACT</span></figcaption>
    {reveal !== "none" && <div className="kick-force force-on-ball"><i></i><b>force on ball from foot</b></div>}
    {reveal === "pair" && <div className="kick-force force-on-foot"><i></i><b>force on foot from ball</b></div>}
    {reveal !== "none" && <div className="kick-motion"><i></i><b>motion after contact</b></div>}
    {reveal === "pair" && <p className="kick-pair-note">Equal and opposite forces act during contact—but on different objects.</p>}
  </figure>;
}

function ReadinessPicture({ visual, revealed }: { visual: (typeof readinessQuestions)[number]["visual"]; revealed: boolean }) {
  if (visual === "kick") return <div className="readiness-picture kick-accurate"><KickSequence reveal={revealed ? "ball" : "none"} /></div>;
  if (visual === "arrow") return <div className="readiness-picture kick-accurate"><KickSequence reveal={revealed ? "pair" : "none"} /></div>;
  if (visual === "friction") return <div className="readiness-picture friction"><span className="motion-label">CURRENT MOTION →</span><span className="picture-board">SKATEBOARD</span><span className="picture-friction"><b>← friction from ground</b></span></div>;
  if (visual === "balance") return <div className="readiness-picture balance"><span className="pull left">← 4 units</span><span className="picture-rope">ROPE</span><span className="pull right">4 units →</span></div>;
  if (visual === "book") return <div className="readiness-picture book"><span className="gravity">gravity from Earth ↓</span><span className="picture-book">BOOK</span><span className="picture-table"></span><span className="support">support from table ↑</span></div>;
  return <div className="readiness-picture mass"><span className="same-push one">same push →</span><span className="cart light">EMPTY CART</span><span className="same-push two">same push →</span><span className="cart heavy">LOADED CART</span></div>;
}

function ForceReadiness({ scene }: { scene: number }) {
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [clinic, setClinic] = useState("force-arrow");
  const item = readinessQuestions[question];
  const selected = answers[question];
  const score = readinessQuestions.reduce((total, current, index) => total + (answers[index] === current.answer ? 1 : 0), 0);
  const completed = Object.keys(answers).length;
  const missed = readinessQuestions.filter((current, index) => answers[index] !== undefined && answers[index] !== current.answer);
  const clinics = [
    { id: "force-arrow", skills: ["receiving object", "force arrows"], title: "How to draw a force arrow", copy: "1. Choose the object you are explaining. 2. Start the arrow on that object. 3. Point it in the direction the force acts. 4. Label the force, such as ‘push from foot.’", visual: <div className="clinic-arrow"><span>BALL</span><i></i><b>push from foot</b></div> },
    { id: "motion-force", skills: ["force versus motion"], title: "Motion and force can point different ways", copy: "A skateboard can still be moving right while friction pushes left. The leftward force makes it slow down; it does not instantly make it move left.", visual: <div className="clinic-motion"><span>motion →</span><b>BOARD</b><i>← friction</i></div> },
    { id: "balanced", skills: ["balanced forces", "everyday forces"], title: "Balanced forces", copy: "Equal forces in opposite directions balance. The object's motion does not change. It may stay still, or keep moving at the same speed in the same direction.", visual: <div className="clinic-balance"><span>← 4</span><b>BOX</b><span>4 →</span></div> },
    { id: "force-mass", skills: ["force and mass"], title: "Same force, different mass", copy: "With the same push, a lighter cart changes speed more than a heavier cart. That is the pattern we need for Crash Lab.", visual: <div className="clinic-carts"><span>EMPTY</span><span>LOADED</span></div> },
  ];
  const reviewClinics = clinics.filter(current => current.skills.some(skill => missed.some(item => item.skill === skill)));
  const currentClinic = reviewClinics.find(current => current.id === clinic) ?? reviewClinics[0];

  if (scene === 1) return <section className="evidence-sim force-clinic">
    <header><div><small>QUICK REVIEW</small><h3>{completed < 6 ? "Finish the six questions first" : missed.length ? "Review the ideas we missed" : "You are ready to move on"}</h3></div><span>{completed < 6 ? `${6 - completed} question${6 - completed === 1 ? "" : "s"} left` : missed.length ? `${reviewClinics.length} topic${reviewClinics.length === 1 ? "" : "s"} to review` : "No review needed"}</span></header>
    {completed < 6 ? <div className="clinic-empty"><b>Go back to Check</b><p>Answer every question first. Then this page will show only the ideas your class needs to review.</p></div> : missed.length === 0 ? <div className="clinic-empty ready"><b>All six answers were correct.</b><p>Continue to the results, then begin Crash Lab.</p></div> : <>
      <nav>{reviewClinics.map(current => <button key={current.id} className={currentClinic?.id === current.id ? "selected" : ""} onClick={() => setClinic(current.id)}>{current.title}</button>)}</nav>
      {currentClinic && <div className="clinic-card">{currentClinic.visual}<article><small>QUICK EXPLANATION</small><h4>{currentClinic.title}</h4><p>{currentClinic.copy}</p></article></div>}
      <p className="clinic-note"><b>That is all you need for now.</b> Return to the missed question and try it again, or move on when the idea is clear.</p>
    </>}
  </section>;

  if (scene === 2) {
    const decision = completed < 6 ? "Finish the six questions first" : score >= 5 ? "Ready for Crash Lab" : score >= 3 ? "Review the missed ideas, then continue" : "Pause for a force foundations lesson";
    return <section className="evidence-sim readiness-result">
      <div className="result-score"><small>OUR CLASS RESULT</small><strong>{score}<span>/6</span></strong><b>{decision}</b></div>
      <div className="result-details"><h3>What should we do next?</h3>{completed < 6 ? <p>{6 - completed} question{6 - completed === 1 ? " is" : "s are"} still unanswered. Return to Check and finish first.</p> : missed.length ? <>{reviewClinics.map(current => <span key={current.id}><b>Review:</b> {current.title}</span>)}<p>Review these ideas briefly. There is no need to repeat everything the class already knows.</p></> : <p>The class is ready. Move directly into Crash Lab.</p>}</div>
    </section>;
  }

  return <section className="evidence-sim readiness-check">
    <header><div><small>QUESTION {question + 1} OF 6</small><h3>{item.title}</h3></div><div className="readiness-progress">{readinessQuestions.map((_, index) => <i key={index} className={answers[index] === readinessQuestions[index].answer ? "correct" : answers[index] !== undefined ? "missed" : index === question ? "current" : ""}></i>)}</div></header>
    <ReadinessPicture visual={item.visual} revealed={selected !== undefined} />
    <div className="readiness-question"><small>VOTE FIRST, THEN CLICK</small><h4>{item.prompt}</h4><div>{item.choices.map((choice, index) => <button key={choice} disabled={selected !== undefined} className={selected === index ? (index === item.answer ? "correct" : "missed") : selected !== undefined && index === item.answer ? "answer" : ""} onClick={() => setAnswers(current => ({ ...current, [question]: index }))}><b>{String.fromCharCode(65 + index)}</b><span>{choice}</span></button>)}</div></div>
    {selected !== undefined && <aside className={selected === item.answer ? "correct" : "missed"}><b>{selected === item.answer ? "✓ Correct" : "Let’s review this one"}</b><p>{item.explanation}</p></aside>}
    <footer><button disabled={question === 0} onClick={() => setQuestion(value => value - 1)}>← Previous</button><span>{completed} of 6 recorded</span><button disabled={selected === undefined || question === 5} onClick={() => setQuestion(value => value + 1)}>Next question →</button></footer>
  </section>;
}

const crashConditions = [
  { name: "No padding", short: "NONE", className: "none", times: [42, 44, 43], forces: [238, 227, 233] },
  { name: "Thin foam", short: "THIN", className: "thin", times: [78, 82, 80], forces: [128, 122, 125] },
  { name: "Thick foam", short: "THICK", className: "thick", times: [145, 150, 147], forces: [69, 67, 68] },
] as const;

function mean(values: readonly number[]) {
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function CrashLab({ scene }: { scene: number }) {
  const [belt, setBelt] = useState<"belt" | "no-belt">("belt");
  const [demoRun, setDemoRun] = useState(0);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [condition, setCondition] = useState(0);
  const [trials, setTrials] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0 });
  const [run, setRun] = useState(0);
  const [comparisonRun, setComparisonRun] = useState(0);
  const [claim, setClaim] = useState<number | null>(null);
  const allComplete = crashConditions.every((_, index) => trials[index] === 3);
  const current = crashConditions[condition];
  const currentTrial = trials[condition];

  if (scene === 0) return <section className="evidence-sim stop-demo">
    <header><div><small>SUDDEN-STOP DEMO</small><h3>What stops the passenger?</h3></div><button onClick={() => setDemoRun(value => value + 1)}>▶ {demoRun ? "Replay" : "Run demo"}</button></header>
    <div className={`stop-road ${belt}`} key={`${belt}-${demoRun}`}><span className="stop-car"><i className="passenger">●</i><b className="belt-line"></b></span><span className="stop-wall">STOP</span><i className="stop-marker"></i></div>
    <div className="stop-controls"><button className={belt === "no-belt" ? "selected" : ""} onClick={() => { setBelt("no-belt"); setDemoRun(value => value + 1); }}>No belt</button><button className={belt === "belt" ? "selected" : ""} onClick={() => { setBelt("belt"); setDemoRun(value => value + 1); }}>Seat belt</button></div>
    <div className="stop-explanation"><b>{belt === "belt" ? "The belt supplies the stopping force" : "Nothing safely stops the passenger with the vehicle"}</b><p>The vehicle stops first. The passenger keeps moving forward until another object exerts a force. A belt stretches slightly and changes the passenger&apos;s motion over a longer time.</p></div>
  </section>;

  if (scene === 2) return <section className="evidence-sim stopping-model">
    <header><div><small>SAME CART · SAME SPEED · DIFFERENT STOP</small><h3>Watch the foam stretch out the stop</h3><p>All three carts reach the padding together. Focus on what happens after contact.</p></div><button onClick={() => setComparisonRun(value => value + 1)}>▶ Replay comparison</button></header>
    <div className="stopping-comparison" key={comparisonRun}>
      {crashConditions.map((item, index) => {
        const stopTime = mean(item.times);
        const peakForce = mean(item.forces);
        const duration = ["0.18s", "0.48s", "0.9s"][index];
        const crush = ["3px", "20px", "46px"][index];
        return <article className={`stop-lane stop-${item.className}`} key={item.name} style={{ "--stop-duration": duration, "--crush-distance": crush, "--force-width": `${Math.round(peakForce / 2.5)}%` } as React.CSSProperties}>
          <div className="stop-lane-label"><strong>{item.name}</strong><span>{stopTime} ms to stop</span></div>
          <div className="compare-track"><span className="compare-cart"><i></i></span><span className="compare-foam"></span><span className="compare-wall"></span></div>
          <div className="stop-readouts"><span><small>STOPPING TIME</small><i><b></b></i><strong>{stopTime} ms</strong></span><span><small>LARGEST FORCE</small><i className="force-peak"><b></b></i><strong>{peakForce} N</strong></span></div>
        </article>;
      })}
    </div>
    <div className="stopping-explanation"><b>Why does thicker foam increase stopping time?</b><p>The cart starts with the same motion and ends at rest in every test. Thick foam can squash farther, so the cart slows down over more distance and more time. The change is less sudden, so the largest force is lower.</p><small>Padding does not remove the force. It spreads the stop out.</small></div>
  </section>;

  if (scene === 3) return <section className="evidence-sim crash-conclusion">
    <header><small>CLAIM · EVIDENCE · LIMIT</small><h3>{allComplete ? "Which conclusion does our evidence support?" : "The investigation is not finished yet"}</h3><p>{allComplete ? "Choose a claim, then use the table—not appearance—to defend it." : "Return to Scene 2 and collect three trials for all three conditions."}</p></header>
    {allComplete && <><div className="averages"><article><small>NO PADDING</small><b>{mean(crashConditions[0].times)} ms</b><span>{mean(crashConditions[0].forces)} N largest force</span></article><article><small>THIN FOAM</small><b>{mean(crashConditions[1].times)} ms</b><span>{mean(crashConditions[1].forces)} N largest force</span></article><article><small>THICK FOAM</small><b>{mean(crashConditions[2].times)} ms</b><span>{mean(crashConditions[2].forces)} N largest force</span></article></div><div className="claim-choices">{["Padding removed the force completely.", "Thicker foam made the stop last longer and lowered the largest force in this model.", "The cart had less mass when foam was added."].map((choice, index) => <button key={choice} className={claim === index ? (index === 1 ? "correct" : "missed") : ""} onClick={() => setClaim(index)}><b>{String.fromCharCode(65 + index)}</b>{choice}</button>)}</div>{claim !== null && <div className={claim === 1 ? "claim-feedback correct" : "claim-feedback missed"}><b>{claim === 1 ? "Supported by the results" : "Not supported by this fair test"}</b><p>{claim === 1 ? `Average stopping time increased from ${mean(crashConditions[0].times)} ms to ${mean(crashConditions[2].times)} ms while the average largest force fell from ${mean(crashConditions[0].forces)} N to ${mean(crashConditions[2].forces)} N.` : "Mass and speed were locked, and every impact still involved force. Compare the measured columns again."}</p><small>MODEL LIMIT · Real protection also depends on material behaviour, fit, impact angle, area, speed, and human anatomy.</small></div>}</>}
  </section>;

  return <section className="evidence-sim crash-investigation">
    <header><div><small>SIMULATED MODEL OUTPUT · NOT PHYSICAL SENSOR DATA</small><h3>How does foam thickness change stopping time and the largest force?</h3></div><button onClick={() => { setTrials({ 0: 0, 1: 0, 2: 0 }); setPrediction(null); setClaim(null); }}>Reset lab</button></header>
    <div className="variable-strip"><span><small>CHANGE</small><b>Foam thickness</b></span><span><small>MEASURE</small><b>Stopping time + largest force</b></span><span className="locked"><small>KEEP THE SAME</small><b>1 kg mass · 3 m/s speed</b></span></div>
    <div className="hypothesis"><small>1 · MAKE AN EDUCATED GUESS BEFORE TESTING</small><p>Which condition will produce the lowest peak force?</p><div>{crashConditions.map((item, index) => <button key={item.name} className={prediction === index ? "selected" : ""} onClick={() => setPrediction(index)}>{item.name}</button>)}</div>{prediction === null && <span>Choose one to unlock the trials. You can change your mind after seeing evidence.</span>}</div>
    <div className="crash-workbench">
      <div className="crash-condition-tabs">{crashConditions.map((item, index) => <button key={item.name} className={condition === index ? "selected" : ""} onClick={() => setCondition(index)}><span>{item.short}</span><b>{trials[index]} / 3 trials</b></button>)}</div>
      <div className={`lab-track pad-${current.className}`} style={{ "--impact-duration": ["0.18s", "0.48s", "0.9s"][condition], "--lab-crush": ["3px", "16px", "34px"][condition] } as React.CSSProperties}><span className={`lab-cart pad-${current.className}`} key={`${condition}-${run}`}><i></i></span><span className={`lab-barrier pad-${current.className}`} key={`barrier-${condition}-${run}`}></span><b>SAME STARTING SPEED · 3 m/s</b><em>{currentTrial > 0 ? `${current.times[currentTrial - 1]} ms stop · ${current.forces[currentTrial - 1]} N largest force` : "Run a trial to measure the stop"}</em></div>
      <div className="trial-control"><div><small>NEXT TRIAL</small><b>{current.name} · {Math.min(currentTrial + 1, 3)} of 3</b></div><button disabled={prediction === null || currentTrial >= 3} onClick={() => { setTrials(value => ({ ...value, [condition]: Math.min(3, value[condition] + 1) })); setRun(value => value + 1); }}>▶ Run impact</button></div>
    </div>
    <div className="crash-data"><table><thead><tr><th>Condition</th><th>Trial 1</th><th>Trial 2</th><th>Trial 3</th><th>Average</th></tr></thead><tbody>{crashConditions.map((item, index) => <tr key={item.name}><th>{item.name}<small>stopping time / largest force</small></th>{[0, 1, 2].map(trial => <td key={trial}>{trials[index] > trial ? <><b>{item.times[trial]} ms</b><span>{item.forces[trial]} N</span></> : <i>—</i>}</td>)}<td>{trials[index] === 3 ? <><b>{mean(item.times)} ms</b><span>{mean(item.forces)} N</span></> : <i>complete 3</i>}</td></tr>)}</tbody></table></div>
    <p className="lab-status">{allComplete ? "✓ Nine simulated trials complete. Go to Scene 4 to build the conclusion." : `${trials[0] + trials[1] + trials[2]} of 9 simulated trials complete. Test every condition three times.`} These values are an illustrative dataset generated by the model; they are not measurements from a real cart or force sensor.</p>
  </section>;
}

const podMaterials = ["1 paper cup", "1 sheet of card", "4 paper straws", "60 cm tape", "2 elastic bands", "1 paper towel"];
const podIdeas = [
  { icon: "◜", title: "Slow the fall", example: "Try a canopy or fins." },
  { icon: "≋", title: "Soften the landing", example: "Try padding or a part that can squash." },
  { icon: "◎", title: "Hold the egg still", example: "Try a snug nest or suspended cradle." },
] as const;
const podRounds = ["Practice · 50 cm", "Round 1 · 1 m", "Round 2 · 1.5 m", "Round 3 · 2 m", "Finals · add 25 cm"];

function DeliveryPodLab({ scene }: { scene: number }) {
  const [round, setRound] = useState(0);
  const [practiceChecks, setPracticeChecks] = useState<Record<number, boolean>>({});
  const [portfolioChecks, setPortfolioChecks] = useState<Record<number, boolean>>({});

  if (scene === 0) return <section className="evidence-sim pod-mission">
    <header><div><small>STEM DESIGN CHALLENGE</small><h3>Protect the egg—and prove what helped.</h3><p>Your team will build, measure, revise, and explain. Survival matters, but evidence and reasoning decide the quality of the work.</p></div><span>2–3 BLOCKS</span></header>
    <div className="pod-hero"><div className="pod-drop"><span className="height-mark">DROP!</span><i className="fall-line"></i><div className="pod-shell"><b>RAW EGG</b></div><span className="landing-zone">LANDING ZONE</span></div><div className="pod-goal"><small>THE CHALLENGE</small><h4>How high can your egg survive?</h4><p>Everyone gets one raw egg sealed inside a sandwich bag and the same material kit. After one practice drop and a quick repair, the competition begins.</p><div><span>teams of 2–3</span><span>same materials</span><span>one sealed egg</span><span>release—do not throw</span></div></div></div>
    <div className="pod-simple-rules"><article><b>1</b><div><strong>Build</strong><p>Use only the class kit. The sealed egg must stay inside the pod.</p></div></article><article><b>2</b><div><strong>Practise</strong><p>Try one 50 cm drop, observe carefully, then make one evidence-based revision.</p></div></article><article><b>3</b><div><strong>Challenge</strong><p>Climb a safe height ladder. A crack ends testing, but the result remains valuable evidence.</p></div></article></div>
  </section>;

  if (scene === 1) return <section className="evidence-sim pod-plan">
    <header><div><small>35-MINUTE BUILD</small><h3>Sketch quickly. Then start building.</h3><p>Pick any idea—or invent your own. You do not need to complete a worksheet before you begin.</p></div><span>BUILD NOW</span></header>
    <div className="pod-build-board"><article><small>EACH TEAM GETS</small><div>{podMaterials.map(item => <span key={item}>✓ {item}</span>)}</div></article><article><small>THREE IDEAS IF YOU GET STUCK</small><div className="pod-idea-row">{podIdeas.map(item => <div key={item.title}><i>{item.icon}</i><strong>{item.title}</strong><p>{item.example}</p></div>)}</div></article></div>
    <div className="pod-build-prompt"><b>Before you build:</b><span>Draw one quick sketch.</span><span>Circle the part that will protect the egg.</span><span>Then build.</span></div>
    <div className="pod-constraints"><strong>THE ONLY LIMITS</strong><span>Use only the shared kit</span><span>Pod fits inside a 20 cm cube</span><span>Egg stays in its sealed bag</span><span>Nothing taped or glued to the egg</span></div>
  </section>;

  if (scene === 2) {
    const checks = ["Practice height measured", "Egg result recorded", "Internal movement or deformation described", "One weak point identified", "One feature revised", "Revision reason cites Crash Lab evidence"];
    return <section className="evidence-sim pod-practice-board"><header><small>PRACTICE DROP · 50 CM</small><h3>A surviving egg still gives evidence.</h3><p>Inspect movement, deformation, loose parts, load spreading, and how the pod stopped. Change one feature for a stated reason.</p></header><div>{checks.map((item, index) => <button key={item} className={practiceChecks[index] ? "checked" : ""} onClick={() => setPracticeChecks(value => ({ ...value, [index]: !value[index] }))}><b>{practiceChecks[index] ? "✓" : index + 1}</b>{item}</button>)}</div><footer><strong>{Object.values(practiceChecks).filter(Boolean).length} / {checks.length} visible</strong><span>Before: _____ → evidence: _____ → revision: _____ → expected effect: _____</span></footer></section>;
  }

  if (scene === 3) return <section className="evidence-sim pod-test pod-tournament">
    <header><div><small>MEASURED HEIGHT LADDER</small><h3>Record every result—not only survival</h3><p>After the practice revision, no new materials may be added. Teams may reattach a part only when the class rule allows it.</p></div><button onClick={() => setRound(0)}>Restart rounds</button></header>
    <div className="pod-round-display"><small>CURRENT ROUND</small><strong>{podRounds[round]}</strong><div><button disabled={round === 0} onClick={() => setRound(value => Math.max(0, value - 1))}>← Previous</button><button disabled={round === podRounds.length - 1} onClick={() => setRound(value => Math.min(podRounds.length - 1, value + 1))}>Next height →</button></div></div>
    <div className="pod-rounds">{podRounds.map((item, index) => <button key={item} className={round === index ? "active" : round > index ? "done" : ""} onClick={() => setRound(index)}><span>{round > index ? "✓" : index + 1}</span><b>{item}</b></button>)}</div>
    <div className="pod-tournament-rules"><article><b>1</b><p>Use the same release method and one drop per height.</p></article><article><b>2</b><p>Record height, survival, deformation, and loose parts.</p></article><article><b>3</b><p>A cracked or leaking egg stops testing; retrieve only when the zone is closed.</p></article></div>
    <div className="pod-cheer"><strong>After the height ladder:</strong><p>Compare mechanisms, not just teams. What evidence suggests protection—and what remains uncertain?</p></div>
  </section>;

  const portfolioItems = ["Team design photo or Minecraft model", "Results table with units", "One feature connected to a force mechanism", "Evidence that led to revision", "What the tests cannot prove", "One next test or design change"];
  return <section className="evidence-sim pod-portfolio-board"><header><small>INDIVIDUAL SPACES EDU EXPLANATION</small><h3>Prove more than survival.</h3><p>The team may share one design and results table. Every student explains the science, evidence, revision, limitation, and next step in their own words or recording.</p></header><div>{portfolioItems.map((item, index) => <button key={item} className={portfolioChecks[index] ? "checked" : ""} onClick={() => setPortfolioChecks(value => ({ ...value, [index]: !value[index] }))}><b>{portfolioChecks[index] ? "✓" : index + 1}</b>{item}</button>)}</div><aside><b>Explanation frame</b><p>Our _____ was designed to _____. At _____ m, we observed _____. We revised _____ because _____. This evidence supports _____, but it cannot prove _____. Next, I would test _____.</p></aside><footer><strong>{Object.values(portfolioChecks).filter(Boolean).length} / {portfolioItems.length} ready</strong><span>Assessment is based on evidence and explanation—not the highest surviving drop.</span></footer></section>;
}

function CosmicLab({ scene }: { scene: number }) {
  const address = ["School / community", "Earth", "Solar system", "Milky Way", "Observable universe"];
  const mixedAddress = ["Milky Way", "Earth", "Observable universe", "School / community", "Solar system"];
  const [chosen, setChosen] = useState<string[]>([]);
  const [location, setLocation] = useState<"centre" | "orion" | "edge" | null>(null);
  const [distancePlanet, setDistancePlanet] = useState("Earth");
  const [timeEvent, setTimeEvent] = useState("Universe begins");
  const addressCorrect = chosen.length === address.length && chosen.every((item, index) => item === address[index]);

  if (scene === 0) return <section className="evidence-sim cosmic-address-lab">
    <header><small>COSMIC ADDRESS · SMALLEST TO LARGEST</small><h3>What contains what?</h3><p>Choose the five cards in order. Keep your first attempt—then use NASA evidence to revise it.</p></header>
    <div className="cosmic-address-slots">{address.map((_, index) => <span key={index} className={chosen[index] ? "filled" : ""}><b>{index + 1}</b>{chosen[index] ?? "Choose a place"}</span>)}</div>
    <div className="cosmic-address-bank">{mixedAddress.map(item => <button key={item} disabled={chosen.includes(item)} onClick={() => setChosen(current => [...current, item])}>{item}</button>)}</div>
    <footer className={addressCorrect ? "correct" : chosen.length === address.length ? "incorrect" : ""}>{chosen.length < address.length ? <><b>Do not guess from size alone.</b><span>Ask which structure contains the next one.</span></> : addressCorrect ? <><b>Nested correctly.</b><span>Now find one NASA sentence that supports the order.</span></> : <><b>Revise with evidence.</b><span>Reset, then ask: is a galaxy inside a solar system, or are solar systems inside a galaxy?</span><button onClick={() => setChosen([])}>Reset cards</button></>}</footer>
  </section>;

  if (scene === 1) return <section className="evidence-sim galaxy-location-lab">
    <header><small>OUR PLACE IN THE MILKY WAY</small><h3>We are inside the galaxy we are trying to map.</h3><p>Choose the best-supported location for our solar system, then consider how scientists construct a view they cannot photograph from outside.</p></header>
    <div className="galaxy-map" aria-label="Simplified top-down model of the Milky Way"><span className="galaxy-core">GALACTIC CENTRE</span><i className="arm a1"></i><i className="arm a2"></i><i className="arm a3"></i>{location && <b className={`solar-location ${location}`}>OUR SOLAR SYSTEM</b>}</div>
    <div className="galaxy-location-choices"><button className={location === "centre" ? "selected" : ""} onClick={() => setLocation("centre")}>Near the centre</button><button className={location === "orion" ? "selected correct" : ""} onClick={() => setLocation("orion")}>In the Orion Spur, away from the centre</button><button className={location === "edge" ? "selected" : ""} onClick={() => setLocation("edge")}>Outside the Milky Way</button></div>
    {location && <footer className={location === "orion" ? "correct" : "incorrect"}><b>{location === "orion" ? "Supported by NASA evidence." : "That location does not fit the evidence."}</b><span>{location === "orion" ? "The top-down galaxy picture is a scientific model built from many observations—not a photograph taken from outside the Milky Way." : "Our solar system is in the Orion Spur, well away from the Milky Way's centre."}</span></footer>}
  </section>;

  if (scene === 2) {
    const distances = [
      ["Mercury", "0.6 m", "0.05 mm"], ["Venus", "1.1 m", "0.12 mm"], ["Earth", "1.5 m", "0.13 mm"], ["Mars", "2.3 m", "0.07 mm"],
      ["Jupiter", "7.8 m", "1.4 mm"], ["Saturn", "14.3 m", "1.2 mm"], ["Uranus", "28.7 m", "0.5 mm"], ["Neptune", "45.0 m", "0.5 mm"],
    ];
    const current = distances.find(item => item[0] === distancePlanet) ?? distances[2];
    return <section className="evidence-sim solar-distance-lab">
      <header><small>DISTANCE-ONLY MODEL · 1 M = 100 MILLION KM</small><h3>Neptune is 45 metres from our model Sun.</h3><p>Select a planet before placing its marker on the class route. Then compare the marker with the planet’s true scaled diameter.</p></header>
      <div className="distance-route"><span className="model-sun">SUN<b>0 m</b></span>{distances.slice(4).map(item => <button key={item[0]} className={distancePlanet === item[0] ? "selected" : ""} style={{ left: `${Math.max(10, Number.parseFloat(item[1]) / 45 * 88)}%` }} onClick={() => setDistancePlanet(item[0])}><i></i><b>{item[0]}</b></button>)}</div>
      <div className="inner-distance-route"><small>INNER-PLANET ZOOM · FIRST 2.3 M OF THE SAME ROUTE</small><div><span>SUN</span>{distances.slice(0, 4).map(item => <button key={item[0]} className={distancePlanet === item[0] ? "selected" : ""} style={{ left: `${8 + Number.parseFloat(item[1]) / 2.3 * 84}%` }} onClick={() => setDistancePlanet(item[0])}><i></i><b>{item[0]}</b><em>{item[1]}</em></button>)}</div></div>
      <div className="distance-detail"><small>PLACE THIS MARKER</small><strong>{current[0]} · {current[1]} from the Sun</strong><p>At the same scale, {current[0]} would be only <b>{current[2]}</b> wide. The classroom marker must be enlarged so people can see it.</p></div>
      <footer><b>Required model warning:</b><span>Distances use the scale. Planet markers are greatly enlarged. The route also leaves out most smaller objects and does not show orbital shape accurately.</span></footer>
    </section>;
  }

  const timeEvents = [
    ["Universe begins", "0 m", "13.8 billion years ago"], ["Early galaxies", "about 0.6 m", "more than 13 billion years ago"],
    ["Sun forms", "9.2 m", "about 4.6 billion years ago"], ["Earth forms", "9.3 m", "about 4.5 billion years ago"],
    ["Modern humans", "almost 13.8 m", "roughly 300,000 years ago"],
  ];
  const currentEvent = timeEvents.find(item => item[0] === timeEvent) ?? timeEvents[0];
  return <section className="evidence-sim cosmic-time-lab">
    <header><small>COSMIC TIME · 1 M = 1 BILLION YEARS</small><h3>Most of the timeline existed before Earth.</h3><p>Use the 13.8-metre line to place events. Then connect distance to evidence: far-away light began travelling long ago.</p></header>
    <div className="cosmic-time-track"><span>13.8 BILLION YEARS AGO</span><i></i><span>TODAY</span>{timeEvents.map((item, index) => <button key={item[0]} style={{ left: `${index === 0 ? 2 : index === 1 ? 6 : index === 2 ? 66 : index === 3 ? 67 : 96}%` }} className={timeEvent === item[0] ? "selected" : ""} onClick={() => setTimeEvent(item[0])}>{index + 1}</button>)}</div>
    <div className="cosmic-time-detail"><small>EVENT CARD</small><strong>{currentEvent[0]}</strong><p>Place at <b>{currentEvent[1]}</b> · {currentEvent[2]}.</p></div>
    <div className="lookback-claim"><b>Why does distant light show the past?</b><p>Light takes time to travel. If a galaxy is 2 million light-years away, the light we receive today began its journey about 2 million years ago.</p></div>
  </section>;
}

function OrbitLab({ scene }: { scene: number }) {
  const [motion, setMotion] = useState<"rotation" | "revolution" | "viewpoint">("rotation");
  const [sorts, setSorts] = useState<Record<number, "observation" | "explanation">>({});
  const [planet, setPlanet] = useState("Earth");
  const [comparePlanets, setComparePlanets] = useState<string[]>([]);
  const [planetClaim, setPlanetClaim] = useState<number | null>(null);
  const [dayChecks, setDayChecks] = useState<Record<number, "light" | "dark">>({});
  const [viewpointClaim, setViewpointClaim] = useState<number | null>(null);
  const statements = [
    ["The bright point moved from the left side of the frame to the right.", "observation"],
    ["The shadow became shorter near the middle of the sequence.", "observation"],
    ["Earth's rotation caused the apparent change.", "explanation"],
    ["The Sun travelled around Earth during the day.", "explanation"],
  ] as const;
  const dayPoints = [
    ["Sunrise", "light", "Surrey is rotating into sunlight. A low Sun can make a long shadow."],
    ["Noon", "light", "Surrey faces the Sun more directly. A shadow is often shorter."],
    ["Sunset", "light", "Surrey is rotating out of sunlight. A low Sun can make a long shadow."],
    ["Midnight", "dark", "Surrey is on the side facing away from the Sun."],
  ] as const;
  const sortVerified = statements.every((item, index) => sorts[index] === item[1]);
  const dayVerified = dayPoints.every((item, index) => dayChecks[index] === item[1]);
  const planetsVerified = comparePlanets.length === 2 && planetClaim === 1;
  const explanationVerified = viewpointClaim === 1;
  const missionSignals = [sortVerified, dayVerified, planetsVerified, explanationVerified];
  const signalCount = missionSignals.filter(Boolean).length;
  const explanations = {
    rotation: ["ROTATION · ABOUT 24 HOURS", "Earth spins on its axis. Surrey moves into sunlight and then into darkness, creating day and night."],
    revolution: ["REVOLUTION · ABOUT 1 YEAR", "Earth travels around the Sun. This is different from the daily spin that creates day and night."],
    viewpoint: ["VIEW FROM EARTH", "The Sun appears to cross our sky because the ground beneath us is rotating. Appearance is an observation; rotation is the explanation."],
  } as const;
  const missionLog = <section className="space-mission-log" aria-label={`${signalCount} of 4 mission evidence signals verified`}><header><div><small>MISSION EVIDENCE LOG</small><strong>{signalCount} of 4 signals verified</strong></div><div className="space-mission-meter" role="progressbar" aria-valuemin={0} aria-valuemax={4} aria-valuenow={signalCount}><i style={{ width: `${signalCount * 25}%` }} /></div></header><ol>{["Observation sorted", "One day modelled", "Two planets compared", "Explanation supported"].map((label, index) => <li key={label} data-verified={missionSignals[index]}><b>{missionSignals[index] ? "✓" : index + 1}</b><span>{label}</span></li>)}</ol><p>Signals appear only after your evidence is correct. Opening a part does not count.</p></section>;

  if (scene === 0) {
    return <>{missionLog}<section className="evidence-sim sky-evidence-lab"><header><small>OBSERVATION BEFORE EXPLANATION</small><h3>What does the sequence show—and what are we adding?</h3><p>Classify each statement. Ask: could a camera record this directly?</p></header><div>{statements.map((item, index) => <article key={item[0]} className={sorts[index] ? (sorts[index] === item[1] ? "correct" : "incorrect") : ""}><p>{item[0]}</p><span><button aria-pressed={sorts[index] === "observation"} onClick={() => setSorts(current => ({ ...current, [index]: "observation" }))}>Observation</button><button aria-pressed={sorts[index] === "explanation"} onClick={() => setSorts(current => ({ ...current, [index]: "explanation" }))}>Explanation</button></span>{sorts[index] && <b>{sorts[index] === item[1] ? "Yes. Keep it in that column." : "Look again: could a camera record this directly?"}</b>}</article>)}</div><footer><b>Next question:</b><span>Which explanation fits this evidence and also fits a view of Earth from space?</span></footer></section></>;
  }

  if (scene === 1) return <>{missionLog}<section className="evidence-sim orbit-sim orbit-day-lab">
    <div className={`orbit-scene motion-${motion}`}><span className="orbit-sun">SUN</span><span className="orbit-path"></span><span className="orbit-earth"><i></i><em>SURREY</em>EARTH</span><b>{explanations[motion][0]}</b>{motion === "viewpoint" && <span className="sky-path">SUN APPEARS TO MOVE →</span>}</div>
    <div className="sim-controls"><button className={motion === "rotation" ? "selected" : ""} onClick={() => setMotion("rotation")}>Rotate Earth</button><button className={motion === "viewpoint" ? "selected" : ""} onClick={() => setMotion("viewpoint")}>Stand in Surrey</button></div>
    <p className="sim-explanation">{motion === "rotation" ? "Track Surrey into and out of the lit half. Rotation changes which side faces the Sun." : explanations.viewpoint[1]} <b>Model limit:</b> the sizes, distance, speed, and brightness are not to scale.</p>
    <section className="orbit-checkpoints"><header><small>CHECK FOUR MOMENTS</small><h4>Is Surrey in sunlight or darkness?</h4><p>Choose first. Then use the model to check.</p></header><div>{dayPoints.map((point, index) => { const choice = dayChecks[index]; const correct = choice === point[1]; return <article key={point[0]} className={choice ? correct ? "correct" : "incorrect" : ""}><strong>{point[0]}</strong><div><button aria-pressed={choice === "light"} onClick={() => setDayChecks(current => ({ ...current, [index]: "light" }))}>In sunlight</button><button aria-pressed={choice === "dark"} onClick={() => setDayChecks(current => ({ ...current, [index]: "dark" }))}>In darkness</button></div>{choice && <p>{correct ? point[2] : "Try the model again. Find which half of Earth faces the Sun."}</p>}</article>; })}</div></section>
  </section></>;

  if (scene === 2) {
    const planetData = [
      ["Mercury", "1,408 h", "88 days"], ["Venus", "5,832 h", "225 days"], ["Earth", "24 h", "365 days"], ["Mars", "25 h", "687 days"],
      ["Jupiter", "10 h", "4,333 days"], ["Saturn", "11 h", "10,759 days"], ["Uranus", "17 h", "30,687 days"], ["Neptune", "16 h", "60,190 days"],
    ];
    const current = planetData.find(item => item[0] === planet) ?? planetData[2];
    const choosePlanet = (name: string) => { setPlanet(name); setComparePlanets(currentNames => currentNames.includes(name) ? currentNames.filter(item => item !== name) : currentNames.length < 2 ? [...currentNames, name] : [currentNames[1], name]); };
    return <>{missionLog}<section className="evidence-sim planet-data-lab"><header><small>ROTATION DATA + REVOLUTION DATA</small><h3>Choose two planets. What do their numbers show?</h3><p>Select exactly two worlds. Compare each day and year before choosing a claim.</p></header><div className="planet-data-table">{planetData.map(item => <button key={item[0]} aria-pressed={comparePlanets.includes(item[0])} className={comparePlanets.includes(item[0]) ? "selected" : ""} onClick={() => choosePlanet(item[0])}><strong>{item[0]}</strong><span>day · {item[1]}</span><span>year · {item[2]}</span></button>)}</div><aside><small>LAST WORLD SELECTED</small><h4>{current[0]}</h4><p>One rotation: <b>{current[1]}</b></p><p>One revolution: <b>{current[2]}</b></p><p><b>Compare:</b> {comparePlanets.length ? comparePlanets.join(" and ") : "Choose two planets"}</p></aside><section className="planet-claim-check"><h4>Which claim fits the data?</h4>{["A shorter day always means a shorter year.", "Day length and year length are different patterns.", "Every planet has a 24-hour day."].map((claim, index) => <button key={claim} disabled={comparePlanets.length !== 2} aria-pressed={planetClaim === index} className={planetClaim === index ? index === 1 ? "correct" : "incorrect" : ""} onClick={() => setPlanetClaim(index)}>{claim}</button>)}{planetClaim !== null && <p>{planetClaim === 1 ? `Supported. Use the exact day and year values for ${comparePlanets.join(" and ")} in your evidence log.` : "That claim does not fit all the values. Compare day and year as separate measurements."}</p>}</section><footer><b>Graphing challenge:</b><span>Mercury and Venus stretch the day-length scale; Neptune stretches the year-length scale. Keep difficult data visible.</span></footer></section></>;
  }

  const claims = [
    "The Sun circles Earth once every day.",
    "Earth's rotation makes the Sun appear to cross our sky each day.",
    "Earth's yearly revolution causes each sunrise and sunset.",
  ];
  return <>{missionLog}<section className="evidence-sim viewpoint-lab"><header><small>ONE SYSTEM · TWO VIEWPOINTS</small><h3>Choose the explanation that works from Earth and from space.</h3><p>A good explanation must fit the apparent motion we observe and Earth’s measured motion.</p></header><div className="viewpoint-panels"><article><small>VIEW FROM SURREY</small><span className="ground-view">SUN APPEARS TO CROSS THE SKY →</span><p>The horizon feels still beneath us.</p></article><article><small>VIEW FROM SPACE</small><span className="space-view">EARTH ROTATES ↻</span><p>Surrey is carried around with the rotating surface.</p></article></div><div className="viewpoint-claims">{claims.map((claim, index) => <button key={claim} aria-pressed={viewpointClaim === index} className={viewpointClaim === index ? (index === 1 ? "correct" : "incorrect") : ""} onClick={() => setViewpointClaim(index)}><span>{String.fromCharCode(65 + index)}</span>{claim}</button>)}</div>{viewpointClaim !== null && <footer className={viewpointClaim === 1 ? "correct" : "incorrect"}><b>{viewpointClaim === 1 ? "Fits both viewpoints." : "This confuses daily rotation with another motion."}</b><span>{viewpointClaim === 1 ? "The Sun’s daily path is apparent motion; Earth’s rotation is the explanation supported by both views. Your four-part mission log is now ready to explain." : "Earth revolves around the Sun once per year, not once per day."}</span></footer>}</section></>;
}

function ExhibitLab({ scene }: { scene: number }) {
  const [selected, setSelected] = useState(0);
  const [topic, setTopic] = useState(1);
  const [buildChecks, setBuildChecks] = useState<Record<number, boolean>>({});
  const [auditChecks, setAuditChecks] = useState<Record<number, boolean>>({});
  const issues = [
    { claim: "Earth is near the centre of the Milky Way.", type: "STRUCTURE", explanation: "Our solar system is well away from the Milky Way’s centre." },
    { claim: "The planets are shown only a few planet-widths apart.", type: "SCALE", explanation: "A poster cannot usually show planet size and distance accurately at the same time. It needs a warning." },
    { claim: "The Sun travels around Earth once each day.", type: "MOTION", explanation: "The daily path we see is apparent motion caused mainly by Earth’s rotation." },
    { claim: "The universe has exactly this shape and edge.", type: "EVIDENCE", explanation: "The observable universe is the region we can receive light from; a poster should not present an unknown whole as certain." },
    { claim: "No sources or model limits are named.", type: "MISSING WARNING", explanation: "A trustworthy exhibit identifies its evidence and clearly states what its model distorts." },
  ];
  const current = issues[selected];
  if (scene === 0) return <div className="evidence-sim exhibit-sim"><div className="exhibit-poster"><span>BEAUTIFUL SPACE POSTER</span><i>EARTH</i><i>SOLAR SYSTEM</i><i>MILKY WAY</i><i>UNIVERSE</i><small>Looks convincing—but five claims mislead the audience.</small></div><div className="exhibit-audit"><small>OPEN THE FIVE PROBLEMS</small>{issues.map((item, index) => <button key={item.claim} className={selected === index ? "selected" : ""} onClick={() => setSelected(index)}><span>{index + 1}</span>{item.claim}</button>)}<article><b>{current.type}</b><p>{current.explanation}</p></article></div></div>;

  if (scene === 1) {
    const topics = [
      ["The universe", "Too broad: no two-minute audience could know what to listen for."],
      ["Why looking farther away also means looking farther into the past", "Focused: one relationship, evidence to explain, and a useful visual model."],
      ["Planets, stars, galaxies, black holes, and space travel", "Still many unrelated stories joined together."],
      ["How Earth's rotation changes what the sky appears to do", "Focused: one motion, two viewpoints, and a claim that can be checked."],
    ];
    return <section className="evidence-sim exhibit-focus-lab"><header><small>FOCUS BEFORE RESEARCH</small><h3>Could an audience learn this in two minutes?</h3><p>Choose a topic and inspect its scope. A strong exhibit teaches one relationship—not every fact a team can collect.</p></header><div>{topics.map((item, index) => <button key={item[0]} className={topic === index ? "selected" : ""} onClick={() => setTopic(index)}><span>{index + 1}</span><strong>{item[0]}</strong><small>{item[1]}</small></button>)}</div><footer className={topic === 1 || topic === 3 ? "correct" : "incorrect"}><b>{topic === 1 || topic === 3 ? "Focused enough to research." : "Narrow it before collecting sources."}</b><span>Write: “After two minutes, our audience will be able to explain _____ because _____.”</span></footer></section>;
  }

  if (scene === 2) {
    const requirements = ["One focused learning goal", "Two approved sources with visible names", "One visual model that serves the explanation", "One specific 'This model distorts…' warning", "One explanation rehearsed in two minutes"];
    return <section className="evidence-sim exhibit-build-lab"><header><small>BUILD THE EXPLANATION FIRST</small><h3>Five checkpoints before decoration.</h3><p>Physical display, slides, video, or Minecraft can all work. The format must help the audience understand the evidence.</p></header><div>{requirements.map((item, index) => <button key={item} className={buildChecks[index] ? "checked" : ""} onClick={() => setBuildChecks(current => ({ ...current, [index]: !current[index] }))}><span>{buildChecks[index] ? "✓" : index + 1}</span>{item}</button>)}</div><aside><b>{Object.values(buildChecks).filter(Boolean).length} of 5 ready</b><p>Mid-build conference: show the learning goal, evidence, model, and warning before polishing the appearance.</p></aside></section>;
  }

  const auditItems = ["I can state the one idea this exhibit teaches.", "The structure or motion matches the evidence.", "Important numbers and images have named sources.", "The model warning says exactly what is distorted.", "I can name one revision that would help the audience."];
  return <section className="evidence-sim exhibit-peer-lab"><header><small>PEER AUDIT + VISIBLE REVISION</small><h3>Kind feedback is specific enough to use.</h3><p>Test another team’s exhibit as a learner. Check only what you can actually see or hear, then propose one high-value revision.</p></header><div>{auditItems.map((item, index) => <button key={item} className={auditChecks[index] ? "checked" : ""} onClick={() => setAuditChecks(current => ({ ...current, [index]: !current[index] }))}><span>{auditChecks[index] ? "✓" : "?"}</span>{item}</button>)}</div><footer><b>Revision sentence:</b><span>“The audience may think _____. We suggest changing _____ because the evidence shows _____.”</span></footer></section>;
}

function ForcePatternsLab({ scene }: { scene: number }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [stations, setStations] = useState<Record<number, boolean>>({});
  const [modelChecks, setModelChecks] = useState<Record<number, boolean>>({});
  const [teachChecks, setTeachChecks] = useState<Record<number, boolean>>({});
  const cases = [
    { title: "Coin above a cup", evidence: "The card moves away quickly; the coin drops almost straight down.", choices: ["Motion resists changing", "More mass always moves faster", "The forces vanish"], answer: 0 },
    { title: "Same ramp, loaded cart", evidence: "The loaded cart changes speed less than the empty cart after the same push.", choices: ["Friction must be zero", "Same force, more mass, less change", "Action and reaction cancel on one cart"], answer: 1 },
    { title: "Balloon rocket", evidence: "Air moves backward while the balloon moves forward.", choices: ["Only the balloon pushes", "Gravity switches off", "Two objects push in opposite directions"], answer: 2 },
    { title: "Equal tug", evidence: "The centre marker remains still while both sides pull equally.", choices: ["Zero net force", "No forces are acting", "The rope has no mass"], answer: 0 },
  ];
  if (scene === 0) {
    const current = cases[caseIndex];
    const chosen = answers[caseIndex];
    return <section className="evidence-sim force-pattern-lab"><header><small>PATTERN BEFORE LAW NUMBER</small><h3>{Object.keys(answers).length} of {cases.length} events explained</h3><p>Choose the pattern that best fits the evidence. Memorized slogans are not enough.</p></header><nav>{cases.map((item, index) => <button key={item.title} className={caseIndex === index ? "selected" : answers[index] === item.answer ? "solved" : ""} onClick={() => setCaseIndex(index)}><b>{answers[index] === item.answer ? "✓" : index + 1}</b><span>{item.title}</span></button>)}</nav><article><small>OBSERVED EVIDENCE</small><h4>{current.title}</h4><p>{current.evidence}</p><div>{current.choices.map((choice, index) => <button key={choice} className={chosen === index ? (index === current.answer ? "correct" : "try-again") : ""} onClick={() => setAnswers(value => ({ ...value, [caseIndex]: index }))}>{choice}</button>)}</div>{chosen !== undefined && <aside className={chosen === current.answer ? "correct" : "try-again"}>{chosen === current.answer ? "The pattern fits this evidence. Now name the objects and draw the interaction." : "That claim does not explain every observation. Return to what changed and what stayed the same."}</aside>}</article></section>;
  }
  if (scene === 1) {
    const stationNames = ["Inertia: coin + card", "Force and mass: loaded cart", "Friction: two surfaces", "Interaction: balloon rocket"];
    return <section className="evidence-sim station-rotation-board"><header><small>FOUR STATIONS · ONE EVIDENCE ROUTINE</small><h3>Predict → change one condition → repeat → describe the pattern</h3><p>Mark a station complete only when the group has measured or clearly observed a change and recorded a limitation.</p></header><div>{stationNames.map((name, index) => <button key={name} className={stations[index] ? "checked" : ""} onClick={() => setStations(value => ({ ...value, [index]: !value[index] }))}><b>{stations[index] ? "✓" : index + 1}</b><span><strong>{name}</strong><small>Force diagram · evidence · pattern · model limit</small></span></button>)}</div><footer><strong>{Object.values(stations).filter(Boolean).length} / 4 stations evidenced</strong><span>One result is not a pattern. Repeat before moving on.</span></footer></section>;
  }
  if (scene === 2) {
    const challenges = ["Build a balanced tug with visible forces", "Keep force the same; compare two masses", "Increase friction without changing the push", "Pause the model and name one way it simplifies real motion"];
    return <section className="evidence-sim model-challenge-board"><header><small>PHET MODEL CHECK</small><h3>Can the model reproduce the station pattern?</h3><p>Predict before touching a control. A model agreement strengthens a claim; it does not prove every real situation.</p></header><div>{challenges.map((item, index) => <button key={item} className={modelChecks[index] ? "checked" : ""} onClick={() => setModelChecks(value => ({ ...value, [index]: !value[index] }))}><span>{modelChecks[index] ? "✓" : index + 1}</span><strong>{item}</strong></button>)}</div><aside><b>Model-audit sentence</b><p>“The model helps us see _____, but it simplifies _____, so we cannot conclude _____.”</p></aside></section>;
  }
  const teachItems = ["Learners predict before the answer", "One receiving object is named", "Force arrows label interactions", "Station or model evidence is cited", "One limitation is visible"];
  return <section className="evidence-sim force-teach-board"><header><small>TWO-MINUTE EXPERT TEACH</small><h3>Make the audience use the law.</h3><p>A good mini-lesson is not a speech. Give classmates a case, let them commit, then reveal the evidence.</p></header><div>{teachItems.map((item, index) => <button key={item} className={teachChecks[index] ? "checked" : ""} onClick={() => setTeachChecks(value => ({ ...value, [index]: !value[index] }))}><b>{teachChecks[index] ? "✓" : "?"}</b>{item}</button>)}</div><footer><strong>{Object.values(teachChecks).filter(Boolean).length} of 5 teaching moves ready</strong><span>Finish with: “This is the _____-law pattern because the evidence shows _____.”</span></footer></section>;
}

function MovementForcesLab({ scene }: { scene: number }) {
  const [frame, setFrame] = useState(0);
  const [arrows, setArrows] = useState<Record<number, boolean>>({});
  const [route, setRoute] = useState(0);
  const [claim, setClaim] = useState(0);
  const frames = [
    ["Before contact", "The kicking foot is moving toward the ball; the ball has not yet changed position."],
    ["During contact", "The foot and ball touch. This is the short interaction interval when each can exert a force on the other."],
    ["After contact", "Contact has ended; the ball moves away while the foot follows through."],
  ];
  if (scene === 0) return <section className="evidence-sim movement-frame-lab"><header><small>THREE-FRAME EVIDENCE · OBSERVATION FIRST</small><h3>Freeze the instant when motion changes.</h3><p>Select a frame. Describe only what the picture shows before adding a force explanation.</p></header><nav>{frames.map((item, index) => <button key={item[0]} className={frame === index ? "selected" : ""} onClick={() => setFrame(index)}><b>{index + 1}</b>{item[0]}</button>)}</nav><article><KickSequence focus={frame} /><div><small>FRAME {frame + 1}</small><h4>{frames[frame][0]}</h4><p>{frames[frame][1]}</p><strong>Observation: _____ changed from _____ to _____.</strong></div></article></section>;
  if (scene === 1) {
    const forceLabels = ["Gravity on person · downward", "Ground on person · upward", "Person on ground · downward", "Friction at foot–ground contact"];
    return <section className="evidence-sim movement-force-map"><header><small>OBJECT–INTERACTION MAP</small><h3>Which object receives each force?</h3><p>Action–reaction forces belong on different objects. Balanced arrows do not mean “no forces.”</p></header><div className="movement-map-stage"><span>PERSON</span><i>GROUND</i>{forceLabels.map((item, index) => <button key={item} className={arrows[index] ? "selected" : ""} onClick={() => setArrows(value => ({ ...value, [index]: !value[index] }))}><b>{arrows[index] ? "✓" : "+"}</b>{item}</button>)}</div><footer><strong>{Object.values(arrows).filter(Boolean).length} forces placed</strong><span>Check: does every arrow begin on the object receiving that force?</span></footer></section>;
  }
  if (scene === 2) {
    const routes = ["Video only · annotate supplied clips", "Object test · roll, stop, and change surfaces", "Seated movement · safe push and stop", "Standing movement · low-intensity balance or landing"];
    return <section className="evidence-sim movement-choice-lab"><header><small>FOUR EQUALLY VALID ROUTES</small><h3>Choose evidence—not performance.</h3><p>Every route can show stability, friction, or stopping. Nobody needs to jump, race, or be filmed.</p></header><div>{routes.map((item, index) => <button key={item} className={route === index ? "selected" : ""} onClick={() => setRoute(index)}><b>{index + 1}</b><span>{item}</span></button>)}</div><aside><b>Your one changed condition</b><p>Change _____; observe or measure _____; keep _____ the same; stop if _____.</p></aside></section>;
  }
  const claims = [
    ["Bend your knees because that is the right way.", "Too vague: it names neither evidence nor the mechanism."],
    ["A longer, controlled landing can increase stopping time; compare the frames and name the body and ground forces.", "Scientifically useful and evidence focused."],
    ["Good athletes always land the same way.", "Unsupported and exclusionary: bodies, tasks, surfaces, and needs vary."],
  ];
  return <section className="evidence-sim coaching-claim-lab"><header><small>SCIENCE COMMUNICATION</small><h3>Repair the coaching slogan.</h3><p>Choose a claim, inspect why it works or fails, then write one that is accurate and respectful.</p></header><div>{claims.map((item, index) => <button key={item[0]} className={claim === index ? (index === 1 ? "correct" : "try-again") : ""} onClick={() => setClaim(index)}><b>{String.fromCharCode(65 + index)}</b><span>{item[0]}</span></button>)}</div><aside className={claim === 1 ? "correct" : "try-again"}><b>{claim === 1 ? "Strong explanation" : "Needs revision"}</b><p>{claims[claim][1]}</p></aside></section>;
}

function ExperienceVisual({ lesson, scene }: { lesson: ScienceLesson; scene: number }) {
  if (lesson.id === "science-launch") return <PaperPlaneEvidenceLab scene={scene} />;
  if (lesson.id === "signal-case") return <SignalLab scene={scene} />;
  if (lesson.id === "balance-case") return <BalanceLab scene={scene} />;
  if (lesson.id === "systems-jigsaw") return <SystemsJigsaw scene={scene} />;
  if (lesson.id === "life-systems-studio") return <LifeSystemsStudio scene={scene} />;
  if (lesson.id === "body-case-conference") return <BodyCaseConference scene={scene} />;
  if (lesson.id === "mixture-mystery") return <MixtureJar scene={scene} />;
  if (lesson.id === "mixture-toolkit") return <SeparationToolkit scene={scene} />;
  if (lesson.id === "separation-rescue") return <SeparationLab scene={scene} />;
  if (lesson.id === "water-treatment-case") return <WaterTreatmentLab scene={scene} />;
  if (lesson.id === "place-mixtures-studio") return <SourceLab scene={scene} />;
  if (lesson.id === "force-sprint") return <ForceReadiness scene={scene} />;
  if (lesson.id === "force-patterns-lab") return <ForcePatternsLab scene={scene} />;
  if (lesson.id === "crash-lab") return <CrashLab scene={scene} />;
  if (lesson.id === "movement-forces") return <MovementForcesLab scene={scene} />;
  if (lesson.id === "safer-impact-studio") return <DeliveryPodLab scene={scene} />;
  if (lesson.id === "cosmic-zoom") return <CosmicLab scene={scene} />;
  if (lesson.id === "space-motion-lab") return <OrbitLab scene={scene} />;
  return <ExhibitLab scene={scene} />;
}

export default function InquiryExperiencePlayer({ lesson, mode, onHome, onUnitStart, onOpenLesson }: Props) {
  const [initialProgress] = useState(() => {
    if (typeof window === "undefined") return { scene: 0 };
    try {
      const saved = JSON.parse(window.sessionStorage.getItem(`wyatt-science-progress-v2:${lesson.id}`) ?? "{}") as { scene?: number };
      if (lesson.id === "space-motion-lab") return { scene: 0 };
      return {
        scene: Number.isInteger(saved.scene) ? Math.min(Math.max(saved.scene as number, 0), lesson.scenes.length - 1) : 0,
      };
    } catch {
      return { scene: 0 };
    }
  });
  const [scene, setScene] = useState(initialProgress.scene);
  const [briefOpen, setBriefOpen] = useState(false);
  const closeBrief = useCallback(() => setBriefOpen(false), []);
  const unit = scienceUnits.find(item => item.id === lesson.unitId) ?? scienceUnits[0];
  const theme = worldFor(unit.id);
  const unitLessons = scienceLessons.filter(item => item.unitId === unit.id);
  const lessonIndex = unitLessons.findIndex(item => item.id === lesson.id);
  const sceneContracts = sceneContractsFor(lesson);
  const { teacher: current, student: studentMove } = sceneContracts[scene];
  const previous = unitLessons[lessonIndex - 1];
  const next = unitLessons[lessonIndex + 1];
  const studentTitle = mode === "projector" ? studentMove.label : current.title;
  const studentPrompt = mode === "projector" ? studentMove.action : current.prompt;
  const studentProduct = mode === "projector" ? studentMove.response : (current.studentTask ?? lesson.evidence);
  const currentResources = lesson.lessonResources?.filter(resource => resource.scene === scene) ?? [];
  const readinessLaunch = scienceReadinessFor(lesson);
  const dailyContract = resolveStudentLessonContract(lesson.id);
  const studentContract = isReviewedStudentLessonId(lesson.id) ? dailyContract : null;
  const teacherRunSteps = sceneContracts.map(({ teacher, student }) => ({
    title: student.label,
    action: teacher.learningMode ? `${teacher.learningMode}: ${student.action}` : student.action,
    finishCheck: student.response,
  }));
  const linkedResources = lesson.lessonResources?.filter((resource): resource is typeof resource & { url: string } => Boolean(resource.url)) ?? [];
  const primaryResource = linkedResources.find(resource => resource.gradeFit === "Core Grade 6") ?? linkedResources[0];
  const secondaryResource = linkedResources.find(resource => resource !== primaryResource);
  const launchResource = primaryResource ? {
    title: primaryResource.label,
    url: primaryResource.url,
    pausePrompt: primaryResource.task,
    secondary: secondaryResource ? { title: secondaryResource.label, url: secondaryResource.url } : undefined,
  } : undefined;
  const dailyLaunch = {
    kind: "science",
    scienceId: lesson.id,
    worldId: unit.id,
    subject: "Science",
    unit: `Unit ${unit.number} · ${unit.title}`,
    title: lesson.title,
    question: dailyContract.reviewState === "reviewed" ? dailyContract.challenge : lesson.question,
    firstAction: dailyContract.reviewState === "reviewed" ? dailyContract.firstAction : sceneContracts[0]?.student.action ?? "Listen for the first class direction.",
    finish: dailyContract.reviewState === "reviewed" ? dailyContract.finishEvidence.at(-1) ?? lesson.evidence : sceneContracts.at(-1)?.student.response ?? lesson.evidence,
  } satisfies DailyLaunch;
  const spacesPolicy = spacesPolicyForActivity(lesson.id);
  const spacesDecision = spacesPolicy?.decision ?? (lesson.spacesPrompt ? "optional" : "none");
  const spacesMessage = spacesPolicy?.teacherPrompt ?? lesson.spacesPrompt ?? "Keep this as in-class practice; no separate upload is needed.";

  useEffect(() => {
    if (lesson.id === "space-motion-lab") return;
    try { window.sessionStorage.setItem(`wyatt-science-progress-v2:${lesson.id}`, JSON.stringify({ scene })); } catch {}
  }, [lesson.id, scene]);
  useEffect(() => { document.querySelector(".journey-stage")?.scrollTo({ top: 0 }); }, [scene]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("input, textarea, select, button, a, summary, [contenteditable='true'], [role='slider']")) return;
      if (event.key === "ArrowRight") setScene(value => Math.min(lesson.scenes.length - 1, value + 1));
      if (event.key === "ArrowLeft") setScene(value => Math.max(0, value - 1));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lesson.scenes.length]);

  if (mode === "teacher") return <div className="journey-player journey-teacher science-plan-view world-surface" data-world={theme.id} style={worldStyle(theme)}>
    <header className="journey-toolbar">
      <div className="journey-home"><button onClick={onHome}>⌂ <span>Home</span></button><button onClick={onUnitStart}>← <span>Science units</span></button></div>
      <div className="journey-title"><span>{unit.icon}</span><div><small>PLAN / TTOC · SCIENCE 6 · UNIT {unit.number}</small><strong>{lesson.title}</strong></div></div>
      <div className="journey-actions"><button type="button" aria-haspopup="dialog" aria-expanded={briefOpen} onClick={() => setBriefOpen(true)}>Full prep / print</button></div>
    </header>
    <section className="science-plan-stage" aria-label={`${lesson.title} lesson plan`}>
      <WorldContextBand theme={theme} teacher />
      <TeacherDailyLaunchButton launch={dailyLaunch} />
      <TeacherRunSheet
        title={lesson.title}
        duration={lesson.duration}
        bigIdea={unit.bigIdea}
        coreCompetencies={coreCompetencyMovesFor("Science")}
        learningQuestion={studentContract?.challenge ?? lesson.question}
        learningPurpose={studentContract?.why ?? lesson.learning}
        provocation={lesson.hook}
        firstAction={studentContract?.firstAction ?? teacherRunSteps[0]?.action ?? "Open the first part in Teach View."}
        steps={(studentContract?.steps ?? teacherRunSteps).map((step, index) => ({ ...step, minutes: lesson.scenes[index]?.time }))}
        finishEvidence={studentContract?.finishEvidence ?? (lesson.success.length ? lesson.success : [lesson.evidence])}
        saveTarget={teacherRunSheetSaveTarget(spacesDecision, spacesMessage)}
        lookFors={lesson.success}
        discussionMoves={runSheetDiscussionMovesFor("Science")}
        misconception={{ idea: lesson.misconception, respond: readinessLaunch.reteach }}
        accessibility={runSheetAccessibilityFor("Science")}
        readiness={{ ideas: readinessLaunch.background, modelTitle: readinessLaunch.example.title, modelConclusion: readinessLaunch.example.conclusion, check: readinessLaunch.questions[0], reteach: readinessLaunch.reteach }}
        prepare={lesson.teacherPrep?.beforeClass}
        materials={lesson.materials}
        shortRoute={lesson.teacherPrep?.offlineRoute ?? lesson.teacherPrep?.lowPrepAlternative}
        routes={{
          projector: "Use Teach / Project mode to show one investigation part, exact prompt, and evidence target at a time.",
          sharedDevice: "Use one teacher-controlled screen for the visual or source; groups gather, model, discuss, and record their own evidence at tables.",
          offline: lesson.teacherPrep?.offlineRoute ?? lesson.teacherPrep?.lowPrepAlternative ?? "Read the hook aloud, sketch the model on the board, use the listed materials or a paper evidence set, and collect the same claim and reflection.",
        }}
        safetyPrivacyCleanup={lesson.teacherPrep?.cleanup}
        launchResource={launchResource}
        dayPlanLesson={{ sourceId: lesson.id, subject: "Science", title: lesson.title, timing: lesson.duration, runSteps: (studentContract?.steps ?? teacherRunSteps).map((step) => `${step.title}: ${step.action}`) }}
      />
      <details className="teacher-planning-details science-planning-details">
        <summary><span><small>PLANNING DETAILS</small><strong>Background, assessment, answers, and sources</strong></span><b>Open details ▾</b></summary>
        <div>
          <section><p className="section-kicker">JUST ENOUGH SCIENCE BACKGROUND</p><p>{lesson.learning}</p><p><b>Common misconception:</b> {lesson.misconception}</p></section>
          <section><p className="section-kicker">LOOK FOR</p><ul>{lesson.success.map((item) => <li key={item}>{item}</li>)}</ul><p><b>Final inquiry connection:</b> {lesson.projectContribution}</p></section>
          {lesson.curriculumFocus ? <section><p className="section-kicker">BC SCIENCE 6 ALIGNMENT</p><p>{lesson.curriculumFocus.whyThisFits}</p>{lesson.curriculumFocus.content?.length ? <><b>Content</b><ul>{lesson.curriculumFocus.content.map((item) => <li key={item}>{item}</li>)}</ul></> : null}<b>Curricular competencies</b><ul>{lesson.curriculumFocus.competencies.map((item) => <li key={item}>{item}</li>)}</ul></section> : null}
          {lesson.teacherPrep?.answerKey?.length ? <section><p className="section-kicker">ANSWERS / CHECKS</p><ul>{lesson.teacherPrep.answerKey.map((item) => <li key={item}>{item}</li>)}</ul></section> : null}
          {lesson.lessonResources?.length ? <section><p className="section-kicker">SOURCES</p><ul>{lesson.lessonResources.map((item) => <li key={`${item.scene}-${item.label}`}>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.label} ↗</a> : <b>{item.label}</b>} · Part {item.scene + 1} · {item.task}</li>)}</ul></section> : null}
        </div>
      </details>
    </section>
    <div className="journey-sequence"><button disabled={!previous} onClick={() => previous && onOpenLesson(previous)}>← {previous?.title ?? "Start of unit"}</button><span>LESSON {lessonIndex + 1} OF {unit.lessons.length}</span><button disabled={!next} onClick={() => next && onOpenLesson(next)}>{next?.title ?? "End of unit"} →</button></div>
    {briefOpen && <MiniBrief lesson={lesson} unit={unit} onClose={closeBrief} />}
  </div>;

  return <div className="journey-player journey-student world-surface" data-world={theme.id} style={worldStyle(theme)}>
    <header className="journey-toolbar">
      <div className="journey-home"><button onClick={onHome}>⌂ <span>Home</span></button><button onClick={onUnitStart}>← <span>Science units</span></button></div>
      <div className="journey-title"><span>{unit.icon}</span><div><small>SCIENCE 6 · UNIT {unit.number} · {lesson.journeyType.toUpperCase()}</small><strong>{lesson.title}</strong></div></div>
    </header>
    <div className="journey-body">
      <nav className="journey-scenes" aria-label="Experience flow">
        <div><small>TODAY&apos;S PARTS</small><b>{sceneContracts.length} PARTS</b></div>
        {sceneContracts.map(({ teacher: item, student: move }, index) => <button key={item.title} className={scene === index ? "active" : ""} onClick={() => setScene(index)}><span>{index + 1}</span><div><small>PART {index + 1}</small><strong>{move.label}</strong></div></button>)}
      </nav>
      <section className="journey-stage" aria-label={`${lesson.title} lesson stage`}>
        <section className="journey-stage-head"><div><small>PART {scene + 1} OF {lesson.scenes.length}</small><h1>{studentTitle}</h1><p>{studentPrompt}</p></div><span>{String(scene + 1).padStart(2, "0")}</span></section>
        <ExperienceVisual lesson={lesson} scene={scene} />
        {currentResources.some((resource) => resource.gradeFit !== "Teacher preview") && <details className="lesson-resource-set"><summary><span><small>SOURCE / VIDEO</small><strong>Open when the class is ready</strong></span><b>Open ▾</b></summary><div>{currentResources.filter((resource) => resource.gradeFit !== "Teacher preview").map((resource, index) => {
          const content = <><span>{resource.type === "Video" ? "▶" : resource.type === "Interactive" ? "↗" : resource.type === "Article" ? "▤" : "⌑"}</span><div><small>{resource.type.toUpperCase()} · {resource.source}</small><strong>{resource.label}</strong><p><b>Look for:</b> {resource.task}</p>{resource.studentBoundary && <p className="resource-boundary"><b>Respect and safety boundary:</b> {resource.studentBoundary}</p>}</div><b>{resource.url ? "OPEN" : "USE CLASS SOURCE"}</b></>;
          return resource.url ? <a key={`${resource.label}-${index}`} href={resource.url} target="_blank" rel="noreferrer">{content}</a> : <article key={`${resource.label}-${index}`}>{content}</article>;
        })}</div></details>}
        {lesson.resource && <a className="journey-resource" href={lesson.resource.url} target="_blank" rel="noreferrer"><span>↗</span><div><small>TRUSTED INTERACTIVE OR VISUAL RESOURCE</small><strong>{lesson.resource.label}</strong><p>{lesson.resource.note}</p></div><b>OPEN</b></a>}
        <footer className="journey-nav"><button disabled={scene === 0} onClick={() => setScene(value => value - 1)}>← Previous scene</button><span>{lesson.scenes.map((_, index) => <i key={index} className={scene === index ? "active" : ""}></i>)}</span><button disabled={scene === lesson.scenes.length - 1} onClick={() => setScene(value => value + 1)}>Next scene →</button></footer>
      </section>
    </div>
    <div className="journey-sequence"><button disabled={!previous} onClick={() => previous && onOpenLesson(previous)}>← {previous?.title ?? "Start of unit"}</button><span>LESSON {lessonIndex + 1} OF {unit.lessons.length}</span><button disabled={!next} onClick={() => next && onOpenLesson(next)}>{next?.title ?? "End of unit"} →</button></div>
  </div>;
}
