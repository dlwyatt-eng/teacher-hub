"use client";

import { useId, useState } from "react";

export const civicCaseWorkbenchLessonId = "rights-in-tension";

export type CivicCaseWorkbenchProps = {
  sceneIndex: number;
  audience: "student" | "teacher";
};

export type AffectedId = "court-users" | "neighbours" | "access" | "park-community";
export type EvidenceTray = "know" | "ask" | "hear";
export type PlanId = "early-close" | "later-with-host" | "different-hours";
export type ImprovementId = "target-noise" | "keep-access" | "shared-review" | "clear-rules";
export type EvidenceId = "late-reports" | "noise-types" | "evening-use" | "few-alternatives";
export type ReviewId = "count-and-listen" | "community-checkin" | "compare-times";

export const affectedPeople: ReadonlyArray<{
  id: AffectedId;
  label: string;
  short: string;
  impact: string;
}> = [
  {
    id: "court-users",
    label: "Young people who use the court",
    short: "free place to play and be together",
    impact: "Many arrive after homework, dinner, work, or caring for younger family members. An earlier closing time leaves some of them almost no evening court time.",
  },
  {
    id: "neighbours",
    label: "People living beside the park",
    short: "sleep, rest, and use of their homes",
    impact: "Some neighbours hear music and shouting late in the evening. They should not have to give up sleep because they live beside a public park.",
  },
  {
    id: "access",
    label: "People who rely on this location",
    short: "a paved, lit court beside an accessible bus stop",
    impact: "The next lit public court is three kilometres away. Distance, cost, disability, family schedules, and transportation can make ‘just go somewhere else’ unrealistic.",
  },
  {
    id: "park-community",
    label: "Other park users and city staff",
    short: "a shared place that feels safe and cared for",
    impact: "People walking through the park need lighting and calm routes. City staff must use public money responsibly and explain whatever rule they make.",
  },
];

export const communityVoices = [
  {
    name: "Imani, 13 · court user",
    quote: "I help my little brother with homework before I come. The court is where my friends and I can play for free, and adults can see us from the path.",
    notice: "Time, cost, belonging, and a visible place",
  },
  {
    name: "Mr. Chen · nearby resident",
    quote: "My work shift starts at 5:30 in the morning. Loud music and yelling after ten has woken me several times. I am not asking young people to disappear.",
    notice: "Sleep, health, and a request aimed at late noise",
  },
  {
    name: "Rae, 12 · court user",
    quote: "I use a wheelchair and this court works for me. It is paved, close to the accessible bus stop, and lit. I want the noise problem fixed without losing the whole place.",
    notice: "Access needs and a possible shared goal",
  },
  {
    name: "Jo · parks worker",
    quote: "Most reports name speakers or shouting after 9:30. We have not measured sound at nearby homes or asked people who use the court what changes they would try.",
    notice: "What the file suggests—and what the city still does not know",
  },
] as const;

export const evidenceTrays: ReadonlyArray<{ id: EvidenceTray; label: string; description: string }> = [
  { id: "know", label: "WE KNOW", description: "Already stated or counted in the city file" },
  { id: "ask", label: "WE NEED TO ASK", description: "A question the current file cannot answer" },
  { id: "hear", label: "WE NEED TO HEAR", description: "People whose experience matters to the decision" },
];

export const evidenceCards: ReadonlyArray<{
  id: string;
  text: string;
  answer: EvidenceTray;
  why: string;
}> = [
  {
    id: "reports",
    text: "The city received 18 noise reports in six weeks. Fourteen were about noise after 9:30 p.m.",
    answer: "know",
    why: "Those numbers are already in the fictional city file. They are useful facts, but they do not make the decision for us.",
  },
  {
    id: "use-count",
    text: "On four observation nights, staff counted between 18 and 31 people using the court from 8:00 to 10:00 p.m.",
    answer: "know",
    why: "This is something staff counted. We can use it as evidence about how much the court is used in the evening.",
  },
  {
    id: "sound-level",
    text: "How loud is the park at nearby homes at 8:30, 9:30, and 10:30? Is it always the same kind of noise?",
    answer: "ask",
    why: "The case does not give us this answer. The city would need to observe or measure before claiming it knows.",
  },
  {
    id: "after-closing",
    text: "If the court closes earlier, do young people go home, use another safe place, or gather somewhere less visible?",
    answer: "ask",
    why: "That result has not happened yet. It is a question the city should investigate instead of guessing.",
  },
  {
    id: "quiet-neighbours",
    text: "Neighbours closest to the park—including people who complained and people who did not",
    answer: "hear",
    why: "This names people to listen to. One set of complaints cannot automatically speak for every neighbour.",
  },
  {
    id: "late-users",
    text: "Young people who use the court after 8:00, including people with transportation or access needs",
    answer: "hear",
    why: "This names people who will live with the result. A fair process makes space for their knowledge too.",
  },
];

export const plans: ReadonlyArray<{
  id: PlanId;
  title: string;
  action: string;
  helps: string;
  watch: string;
  recommendation: string;
}> = [
  {
    id: "early-close",
    title: "Try an earlier close",
    action: "For six weeks, turn the court lights off at 8:30 and store the basketball rims. Keep the walking-path lights on.",
    helps: "Late park noise would likely end sooner, giving nearby homes more quiet time.",
    watch: "Everyone loses the court—even though most reports named noise after 9:30 and often named speakers or shouting rather than basketball itself.",
    recommendation: "close the basketball court at 8:30 for a six-week trial while keeping the walking path lit",
  },
  {
    id: "later-with-host",
    title: "Keep the later hours—with help",
    action: "Keep the hoops and 10:30 lights. After 8:30, allow no speakers and have a trained community host remind everyone to lower voices.",
    helps: "Young people keep evening access while the rule aims directly at the noise named in most reports.",
    watch: "A host costs money, shouting may continue, and the city still needs evidence that this would protect neighbours’ sleep.",
    recommendation: "keep the court open until 10:30, add a no-speaker rule after 8:30, and provide a trained evening host",
  },
  {
    id: "different-hours",
    title: "Use different hours",
    action: "Keep the hoops. Turn court lights off at 9:00 on school nights and 10:00 on Fridays and Saturdays. Allow no speakers after 8:30.",
    helps: "This protects some later court time and creates earlier quiet on nights before school and work.",
    watch: "A compromise time is not automatically fair. It may still be too late for some neighbours and too early for some court users.",
    recommendation: "keep the hoops, close at 9:00 on school nights and 10:00 on Fridays and Saturdays, and stop speaker use after 8:30",
  },
];

export const improvements: ReadonlyArray<{
  id: ImprovementId;
  label: string;
  detail: string;
  sentence: string;
}> = [
  {
    id: "target-noise",
    label: "Aim the rule at the problem",
    detail: "Make the noise rule apply to everyone. Do not treat ‘young people’ as if they are the problem.",
    sentence: "apply the same clear noise rule to every park user rather than blaming an age group",
  },
  {
    id: "keep-access",
    label: "Protect a real alternative",
    detail: "If hours are cut, add a free and accessible evening court or gym time nearby—not just a suggestion to go elsewhere.",
    sentence: "provide a nearby free and accessible evening option if court time is reduced",
  },
  {
    id: "shared-review",
    label: "Share the check-back power",
    detail: "Include youth court users, neighbours, and accessibility voices when the city checks what happened.",
    sentence: "give youth users, nearby residents, and people with access needs a real role in the review",
  },
  {
    id: "clear-rules",
    label: "Make the rule easy to follow",
    detail: "Post the hours, explain why they exist, and show how people can report a problem or suggest a change.",
    sentence: "post the hours and reasons clearly, with a simple way to report problems and suggest changes",
  },
];

export const recommendationEvidence: ReadonlyArray<{ id: EvidenceId; label: string; sentence: string }> = [
  { id: "late-reports", label: "14 of 18 reports were about noise after 9:30.", sentence: "14 of the 18 noise reports were about noise after 9:30" },
  { id: "noise-types", label: "Most late reports named speakers or shouting.", sentence: "most late reports named speakers or shouting, so the city should test a response aimed at the noise itself" },
  { id: "evening-use", label: "Staff counted 18–31 court users between 8:00 and 10:00.", sentence: "staff counted 18 to 31 people using the court between 8:00 and 10:00 on four observation nights" },
  { id: "few-alternatives", label: "The indoor drop-in closes at 8:00; the next lit court is 3 km away.", sentence: "the indoor drop-in closes at 8:00 and the next lit public court is three kilometres away" },
];

export const reviewPlans: ReadonlyArray<{ id: ReviewId; label: string; detail: string; sentence: string }> = [
  {
    id: "count-and-listen",
    label: "Count and listen for six weeks",
    detail: "Count court use by hour, group noise reports by time and type, and ask both court users and nearby residents what changed.",
    sentence: "after six weeks, publish court-use counts and noise reports by time and type, then hear from both youth and nearby residents",
  },
  {
    id: "community-checkin",
    label: "Hold a four-week park check-in",
    detail: "Invite youth, neighbours, accessibility voices, and parks staff. Share anonymous feedback so more than the loudest voices count.",
    sentence: "after four weeks, hold an accessible park check-in using anonymous feedback from youth, neighbours, and staff",
  },
  {
    id: "compare-times",
    label: "Compare school nights and weekends",
    detail: "Track use, noise, and safety at different times. Publish the pattern before deciding on permanent hours.",
    sentence: "compare use, noise, and safety on school nights and weekends for six weeks before making the hours permanent",
  },
];

const sceneCopy = [
  {
    eyebrow: "PART 1 · OPEN THE CASE · ENTER THE NIGHT PARK",
    title: "A city rule will change this place. Who lives with the result?",
    prompt: "Read the city message. Then point to or tap each group. Predict the effect before you reveal it.",
    skill: "SOCIAL AWARENESS & RESPONSIBILITY",
    skillMove: "Notice who benefits, who gives something up, and who has not been asked yet.",
  },
  {
    eyebrow: "PART 2 OF 4 · HEAR THE PARK",
    title: "Listen first. Build the evidence wall second.",
    prompt: "Give the four voices to four readers. Then place each clue under WE KNOW, WE NEED TO ASK, or WE NEED TO HEAR.",
    skill: "COMMUNICATION",
    skillMove: "Retell a person’s idea fairly before agreeing, questioning, or adding another view.",
  },
  {
    eyebrow: "PART 3 OF 4 · DESIGN A FAIRER RULE",
    title: "Choose a starting plan. Then make it stronger.",
    prompt: "Every plan helps someone and creates a risk. Pick one to try—then add one change that makes it fairer.",
    skill: "CRITICAL & REFLECTIVE THINKING",
    skillMove: "Look for consequences. Improve your first idea instead of trying to win with it.",
  },
  {
    eyebrow: "PART 4 OF 4 · SPEAK TO COUNCIL",
    title: "Build a recommendation that can change when the evidence changes.",
    prompt: "Choose one useful fact and one check-back plan. Keep an open question visible. The screen will build a 30-second council recommendation for the class to improve.",
    skill: "COMMUNICATE · THINK · ACT RESPONSIBLY",
    skillMove: "Use evidence, name who is affected, explain your choice, and leave a real way to revise it.",
  },
] as const;

const teacherCues = [
  {
    say: "‘The city has power over this public place. Fair use of power begins by noticing everyone who will live with the rule.’",
    do: "Read the fictional city message aloud. Give partners 30 seconds to predict one effect before each reveal.",
    listen: "Students name access, sleep, safety, cost, transportation, belonging, and public responsibility—not only ‘for’ or ‘against.’",
  },
  {
    say: "‘A voice is not automatically a fact, but lived experience can tell us what to investigate. We listen before we decide.’",
    do: "Use four volunteer readers. After each voice, ask a student to paraphrase it. Sort the six clues as one class or with paper A/B/C cards.",
    listen: "Students separate what the file states from what must be checked and from who needs a place in the process.",
  },
  {
    say: "‘You are not choosing a perfect answer. You are choosing a testable first move and making its weak spot smaller.’",
    do: "Let students point, stand in three areas, or hold A/B/C. Invite one group to strengthen a different group’s plan before choosing an improvement.",
    listen: "Reasons connect to people and evidence. Students can revise without treating changed thinking as losing.",
  },
  {
    say: "‘Democracy is more than a vote. A public decision needs reasons, evidence, people who can question it, and a time to check what actually happened.’",
    do: "Build one class recommendation. Read it aloud once, then let pairs rewrite one sentence on paper to make it clearer or fairer.",
    listen: "Students explain the plan, evidence, affected people, remaining risk, and what would make council change course.",
  },
] as const;

export function civicTeacherGuideForScene(sceneIndex: number) {
  return teacherCues[safeScene(sceneIndex)];
}

function safeScene(sceneIndex: number) {
  if (!Number.isFinite(sceneIndex)) return 0;
  return Math.max(0, Math.min(3, Math.trunc(sceneIndex)));
}

function NightParkIllustration() {
  const id = useId().replaceAll(":", "");
  const titleId = `${id}-night-park-title`;
  const descriptionId = `${id}-night-park-desc`;
  const skyId = `${id}-night-sky`;
  const glowId = `${id}-lamp-glow`;
  return (
    <figure className="civic-night-park">
      <svg viewBox="0 0 820 360" role="img" aria-labelledby={`${titleId} ${descriptionId}`}>
        <title id={titleId}>Juniper Park basketball court at night</title>
        <desc id={descriptionId}>Young people play on a lit basketball court. Homes sit nearby, a bus arrives, and the city is considering earlier closing hours after noise reports.</desc>
        <defs>
          <linearGradient id={skyId} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#171532" /><stop offset="1" stopColor="#4b3970" /></linearGradient>
          <radialGradient id={glowId}><stop offset="0" stopColor="#fff8c7" stopOpacity=".88" /><stop offset="1" stopColor="#f5d878" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="820" height="360" rx="26" fill={`url(#${skyId})`} />
        <g className="civic-stars" fill="#fff7bf"><circle cx="94" cy="50" r="3" /><circle cx="151" cy="83" r="2" /><circle cx="272" cy="40" r="2.5" /><circle cx="379" cy="73" r="2" /><circle cx="632" cy="42" r="3" /><circle cx="751" cy="86" r="2.5" /></g>
        <circle className="civic-moon" cx="699" cy="72" r="34" fill="#fff5bc" />
        <path d="M0 198 Q90 142 181 190 T365 179 T551 188 T820 162 V360 H0Z" fill="#26384a" />
        <g className="civic-homes"><path d="M28 176 L91 126 L154 176 V251 H28Z" fill="#302842" stroke="#9a86b2" strokeWidth="3" /><rect x="48" y="191" width="28" height="24" rx="3" fill="#f7d987" /><rect x="101" y="190" width="30" height="25" rx="3" fill="#f7d987" /><path d="M666 180 L724 139 L785 180 V247 H666Z" fill="#312943" stroke="#9a86b2" strokeWidth="3" /><rect x="687" y="195" width="27" height="23" rx="3" fill="#f7d987" /><rect x="738" y="195" width="27" height="23" rx="3" fill="#6f6181" /></g>
        <path d="M99 360 Q215 272 389 277 T720 350" fill="#c7c1b4" opacity=".45" />
        <ellipse cx="425" cy="292" rx="242" ry="63" fill="#20293a" stroke="#8fb2ae" strokeWidth="4" /><path d="M218 292 H632 M425 230 V354" stroke="#6f9a99" strokeWidth="3" opacity=".8" /><circle cx="425" cy="292" r="33" fill="none" stroke="#6f9a99" strokeWidth="3" />
        <ellipse className="civic-lamp-glow civic-lamp-glow-one" cx="292" cy="217" rx="140" ry="126" fill={`url(#${glowId})`} /><ellipse className="civic-lamp-glow civic-lamp-glow-two" cx="560" cy="217" rx="140" ry="126" fill={`url(#${glowId})`} />
        <g stroke="#171528" strokeWidth="9" strokeLinecap="round"><path d="M280 246 V110" /><path d="M548 246 V110" /></g><g fill="#fff2a8" stroke="#5d4c37" strokeWidth="3"><rect x="259" y="102" width="43" height="16" rx="6" /><rect x="527" y="102" width="43" height="16" rx="6" /></g>
        <g className="civic-hoop" strokeLinecap="round"><path d="M576 255 V177 H617" fill="none" stroke="#e7e3db" strokeWidth="8" /><rect x="609" y="154" width="11" height="50" rx="2" fill="#d9d4ca" /><path d="M613 189 H645" stroke="#ef7a42" strokeWidth="6" /><path d="M617 192 L627 215 L638 192" fill="none" stroke="#e5e0d6" strokeWidth="3" /></g>
        <g className="civic-players" fill="#f1b24d" stroke="#171528" strokeWidth="5" strokeLinecap="round"><circle cx="387" cy="244" r="12" /><path d="M387 258 V300 M387 272 L365 286 M387 275 L409 259 M387 300 L369 327 M387 300 L407 327" fill="none" /><circle cx="470" cy="250" r="12" /><path d="M470 264 V306 M470 278 L449 264 M470 279 L492 292 M470 306 L452 333 M470 306 L489 332" fill="none" /></g>
        <g className="civic-basketball"><circle cx="432" cy="252" r="13" fill="#ef7a42" stroke="#5c2f23" strokeWidth="3" /><path d="M420 252 H444 M432 239 Q424 252 432 265 M432 239 Q440 252 432 265" fill="none" stroke="#5c2f23" strokeWidth="2" /></g>
        <g className="civic-sound-lines" fill="none" stroke="#f4cf78" strokeWidth="4" strokeLinecap="round"><path d="M510 239 Q532 226 548 236" /><path d="M513 225 Q541 205 563 220" /></g>
        <g className="civic-bus"><rect x="112" y="282" width="112" height="45" rx="10" fill="#5ab4ad" stroke="#152d35" strokeWidth="4" /><rect x="126" y="290" width="26" height="16" rx="3" fill="#d9f4ed" /><rect x="159" y="290" width="27" height="16" rx="3" fill="#d9f4ed" /><circle cx="139" cy="329" r="10" fill="#171528" /><circle cx="198" cy="329" r="10" fill="#171528" /></g>
        <text x="410" y="341" fill="#f8edc3" fontSize="15" fontWeight="800" textAnchor="middle">FICTIONAL JUNIPER PARK · 9:42 P.M.</text>
      </svg>
      <figcaption>One shared place. Several real needs. The city has power to make a rule—and a responsibility to listen, explain, and check what happens.</figcaption>
    </figure>
  );
}

function TeacherCue({ scene }: { scene: number }) {
  const cue = teacherCues[scene];
  const time = ["12–15", "18–25", "15–20", "12–18"][scene];
  return (
    <aside className="civic-teacher-cue" aria-label={`Teacher directions for part ${scene + 1}`}>
      <header><span>TTOC-FRIENDLY TEACHER CUE</span><strong>About {time} minutes</strong></header>
      <div><p><b>SAY</b><span>{cue.say}</span></p><p><b>DO</b><span>{cue.do}</span></p><p><b>LISTEN FOR</b><span>{cue.listen}</span></p></div>
    </aside>
  );
}

function SkillMove({ scene }: { scene: number }) {
  const copy = sceneCopy[scene];
  return <aside className="civic-skill-move"><small>HUMAN SKILL IN ACTION</small><strong>{copy.skill}</strong><span>{copy.skillMove}</span></aside>;
}

function CaseReminder() {
  return <aside className="civic-case-reminder"><span>THE DECISION</span><strong>What should Juniper Park do about evening court access and late noise?</strong><p>Fictional case · no personal stories or political beliefs required</p></aside>;
}

export function CivicCaseWorkbench({ sceneIndex, audience }: CivicCaseWorkbenchProps) {
  const scene = safeScene(sceneIndex);
  const titleId = useId();
  const [affectedSeen, setAffectedSeen] = useState<AffectedId[]>([]);
  const [assignments, setAssignments] = useState<Partial<Record<string, EvidenceTray>>>({});
  const [planId, setPlanId] = useState<PlanId | "">("");
  const [improvementId, setImprovementId] = useState<ImprovementId | "">("");
  const [evidenceId, setEvidenceId] = useState<EvidenceId | "">("");
  const [reviewId, setReviewId] = useState<ReviewId | "">("");
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [announcement, setAnnouncement] = useState("The fictional Juniper Park case is ready.");
  const [activeVoiceIndex, setActiveVoiceIndex] = useState(0);
  const [activeEvidenceIndex, setActiveEvidenceIndex] = useState(0);

  const chosenPlan = plans.find((item) => item.id === planId);
  const chosenImprovement = improvements.find((item) => item.id === improvementId);
  const chosenEvidence = recommendationEvidence.find((item) => item.id === evidenceId);
  const chosenReview = reviewPlans.find((item) => item.id === reviewId);
  const sortedCorrectly = evidenceCards.filter((card) => assignments[card.id] === card.answer).length;
  const recommendationReady = Boolean(chosenPlan && chosenImprovement && chosenEvidence && chosenReview);
  const activeVoice = communityVoices[activeVoiceIndex];
  const activeEvidenceCard = evidenceCards[activeEvidenceIndex];

  const toggleAffected = (id: AffectedId) => {
    const alreadySeen = affectedSeen.includes(id);
    setAffectedSeen((current) => alreadySeen ? current.filter((item) => item !== id) : [...current, id]);
    const person = affectedPeople.find((item) => item.id === id);
    setAnnouncement(`${person?.label ?? "Community voice"} ${alreadySeen ? "hidden" : "revealed"}.`);
  };

  const assignCard = (cardId: string, tray: EvidenceTray) => {
    const card = evidenceCards.find((item) => item.id === cardId);
    setAssignments((current) => ({ ...current, [cardId]: tray }));
    setAnnouncement(card?.answer === tray ? card.why : `Try another place. ${card?.why ?? "Look closely at what this clue does."}`);
  };

  const resetWorkbench = () => {
    setAffectedSeen([]); setAssignments({}); setPlanId(""); setImprovementId(""); setEvidenceId(""); setReviewId(""); setShowRecommendation(false); setActiveVoiceIndex(0); setActiveEvidenceIndex(0);
    setAnnouncement("All class choices cleared. The fictional Juniper Park case is ready again.");
  };

  return (
    <section className="social-student-lab social-deep-lab social-unit2-lab civic-case-workbench" data-audience={audience} data-lesson-id={civicCaseWorkbenchLessonId} aria-labelledby={titleId}>
      <header className="civic-workbench-header">
        <div className="civic-heading-copy"><small>{sceneCopy[scene].eyebrow}</small><h2 id={titleId}>{sceneCopy[scene].title}</h2><p>{sceneCopy[scene].prompt}</p></div>
        <div className="civic-big-idea"><small>THE BIG IDEA</small><strong>Fair decisions do more than count votes.</strong><span>They listen to people affected, use evidence, explain the trade-offs, and leave a way to change the rule.</span></div>
      </header>

      {audience === "teacher" && <TeacherCue scene={scene} />}
      <p className="civic-live-status" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>

      {scene === 0 && (
        <div className="civic-workbench-body">
          <NightParkIllustration />
          <article className="civic-city-message">
            <header><span>CITY MESSAGE · FICTIONAL</span><strong>A decision is coming</strong></header>
            <div><p>Juniper Park’s basketball court is free, paved, and lit until <b>10:30 p.m.</b> After 18 noise reports in six weeks, city staff suggest turning the court lights off at <b>8:30 p.m.</b> and storing the rims for the rest of fall. The walking-path lights would stay on.</p><p><b>Council has not voted.</b> It has asked the community what the city should try first.</p></div>
          </article>
          <section className="civic-just-enough-words" aria-label="Words needed for this situation">
            <header><small>JUST ENOUGH WORDS</small><strong>Meet the idea before the school vocabulary.</strong></header>
            <div><article><b>PUBLIC SPACE</b><span>A shared place the city manages for the community.</span></article><article><b>POWER</b><span>The city can make or change the rule.</span></article><article><b>RIGHT + RESPONSIBILITY</b><span>People need fair access and safety. They also share responsibility for how their choices affect others.</span></article><article><b>FAIR PROCESS</b><span>Hear people, show the evidence, give reasons, and check the result.</span></article></div>
          </section>
          <fieldset className="civic-affected-grid">
            <legend>Who lives with this decision?</legend><p><b>Class move:</b> Predict one effect. Then tap the card to reveal what this group may need the city to consider.</p>
            <div>{affectedPeople.map((person) => { const seen = affectedSeen.includes(person.id); return <button type="button" key={person.id} aria-pressed={seen} data-revealed={seen ? "true" : "false"} onClick={() => toggleAffected(person.id)}><small>{seen ? "✓ IMPACT REVEALED" : "PREDICT, THEN REVEAL"}</small><strong>{person.label}</strong><span>{seen ? person.impact : person.short}</span></button>; })}</div>
          </fieldset>
          <aside className="civic-scene-check" data-ready={affectedSeen.length === affectedPeople.length ? "true" : "false"}><strong>{affectedSeen.length === affectedPeople.length ? "The whole park is now in the picture." : `${affectedSeen.length} of ${affectedPeople.length} impacts revealed`}</strong><span>{affectedSeen.length === affectedPeople.length ? "No group automatically wins. Next, listen for what each voice adds to the evidence." : "Keep going until the decision is bigger than only ‘court users versus neighbours.’"}</span></aside>
          <SkillMove scene={scene} />
        </div>
      )}

      {scene === 1 && (
        <div className="civic-workbench-body">
          <CaseReminder />
          <section className="civic-voice-deck" aria-labelledby={`${titleId}-voices`}>
            <header><small>FOUR VOICES FROM THE FICTIONAL COMMUNITY</small><h3 id={`${titleId}-voices`}>Read a voice. Pass the microphone.</h3><p>After each reader, someone else begins: <b>“What I heard was…”</b> You may ask a question after you show that you listened.</p></header>
            <nav className="civic-deck-tabs" aria-label="Choose a community voice">{communityVoices.map((voice, index) => <button type="button" key={voice.name} aria-pressed={activeVoiceIndex === index} onClick={() => setActiveVoiceIndex(index)}><b>{index + 1}</b><span>{voice.name.split(" · ")[0]}</span></button>)}</nav>
            <div className="civic-voice-stage" aria-live="polite"><article><b aria-hidden="true">{activeVoiceIndex + 1}</b><div><small>VOICE {activeVoiceIndex + 1} OF {communityVoices.length}</small><strong>{activeVoice.name}</strong><blockquote>“{activeVoice.quote}”</blockquote><small>NOTICE: {activeVoice.notice}</small></div></article></div>
          </section>
          <section className="civic-evidence-explainer"><strong>EVIDENCE</strong><span>Evidence is information that helps us understand what is happening. It can include counts, observations, documents, and people’s direct experience. One piece rarely tells the whole story.</span></section>
          <section className="civic-tray-key" aria-label="Evidence wall categories">{evidenceTrays.map((tray) => <article key={tray.id} data-tray={tray.id}><strong>{tray.label}</strong><span>{tray.description}</span></article>)}</section>
          <fieldset className="civic-evidence-sort">
            <legend>Build the class evidence wall</legend><p>For each clue, choose the job it does. If a clue lands in the wrong place, the screen explains what to notice—no points are lost.</p>
            <nav className="civic-evidence-progress" aria-label="Choose an evidence clue">{evidenceCards.map((card, index) => <button type="button" key={card.id} aria-label={`Clue ${index + 1}${assignments[card.id] === card.answer ? ", placed correctly" : ""}`} aria-pressed={activeEvidenceIndex === index} data-complete={assignments[card.id] === card.answer ? "true" : "false"} onClick={() => setActiveEvidenceIndex(index)}>{assignments[card.id] === card.answer ? "✓" : index + 1}</button>)}</nav>
            <div className="civic-evidence-stage">{(() => { const assignment = assignments[activeEvidenceCard.id]; const correct = assignment === activeEvidenceCard.answer; return <article key={activeEvidenceCard.id} data-state={!assignment ? "open" : correct ? "placed" : "rethink"}><header><b>{activeEvidenceIndex + 1}</b><small>CLUE {activeEvidenceIndex + 1} OF {evidenceCards.length} · {!assignment ? "READY" : correct ? "✓ THIS FITS" : "LOOK AGAIN"}</small></header><p>{activeEvidenceCard.text}</p><div role="group" aria-label={`Choose a place for clue ${activeEvidenceIndex + 1}`}>{evidenceTrays.map((tray) => <button type="button" key={tray.id} aria-pressed={assignment === tray.id} onClick={() => assignCard(activeEvidenceCard.id, tray.id)}>{tray.label}</button>)}</div>{assignment && <span className="civic-card-feedback" role="status">{correct ? activeEvidenceCard.why : `Try another place. ${activeEvidenceCard.why}`}</span>}</article>; })()}</div>
            <div className="civic-evidence-controls"><button type="button" disabled={activeEvidenceIndex === 0} onClick={() => setActiveEvidenceIndex((index) => Math.max(0, index - 1))}>← Previous clue</button><strong>{sortedCorrectly} of {evidenceCards.length} placed</strong><button type="button" disabled={activeEvidenceIndex === evidenceCards.length - 1} onClick={() => setActiveEvidenceIndex((index) => Math.min(evidenceCards.length - 1, index + 1))}>Next clue →</button></div>
          </fieldset>
          <aside className="civic-scene-check" data-ready={sortedCorrectly === evidenceCards.length ? "true" : "false"}><strong>{sortedCorrectly === evidenceCards.length ? "Evidence wall ready" : `${sortedCorrectly} of ${evidenceCards.length} clues placed`}</strong><span>{sortedCorrectly === evidenceCards.length ? "You know what the file says, what it cannot answer, and who still needs a voice." : "A fact is not a question. A question is not a person. Keeping them separate helps a class think clearly."}</span></aside>
          <SkillMove scene={scene} />
        </div>
      )}

      {scene === 2 && (
        <div className="civic-workbench-body">
          <CaseReminder />
          <aside className="civic-rights-note"><strong>RIGHTS ARE NOT A WINNING CARD</strong><span>Public rules can protect access, safety, rest, and participation at the same time—or harm some of them. The class is looking for a reasonable first move, not pretending one need makes every other need vanish.</span></aside>
          <fieldset className="civic-plan-grid">
            <legend>Which plan should the city try first?</legend><p>Read all three. Choose the plan your class can defend <em>and</em> question.</p>
            <div>{plans.map((plan, index) => { const selected = planId === plan.id; return <button type="button" key={plan.id} aria-pressed={selected} data-selected={selected ? "true" : "false"} onClick={() => { setPlanId(plan.id); setShowRecommendation(false); setAnnouncement(`${plan.title} chosen as a starting idea. Now inspect what it helps and what could go wrong.`); }}><small>PLAN {String.fromCharCode(65 + index)} {selected ? "· CHOSEN FOR NOW" : ""}</small><strong>{plan.title}</strong><span>{plan.action}</span><div><b>COULD HELP</b><p>{plan.helps}</p></div><div><b>WATCH OUT</b><p>{plan.watch}</p></div></button>; })}</div>
          </fieldset>
          {chosenPlan && <aside className="civic-plan-consequence" aria-live="polite"><small>YOUR STARTING PLAN</small><strong>{chosenPlan.title}</strong><p>It may help: {chosenPlan.helps}</p><p>It may also cause: {chosenPlan.watch}</p></aside>}
          <fieldset className="civic-improvement-grid">
            <legend>Now make the plan fairer</legend><p>Choose one improvement. Another class could choose a different one and still give a strong reason.</p>
            <div>{improvements.map((improvement) => { const selected = improvementId === improvement.id; return <button type="button" key={improvement.id} aria-pressed={selected} data-selected={selected ? "true" : "false"} onClick={() => { setImprovementId(improvement.id); setShowRecommendation(false); setAnnouncement(`${improvement.label} added. The plan is stronger, not perfect.`); }}><b aria-hidden="true">{selected ? "✓" : "+"}</b><span><strong>{improvement.label}</strong><small>{improvement.detail}</small></span></button>; })}</div>
          </fieldset>
          <aside className="civic-scene-check" data-ready={chosenPlan && chosenImprovement ? "true" : "false"}><strong>{chosenPlan && chosenImprovement ? "You built a testable first move—not a forever rule." : !chosenPlan ? "Choose a starting plan." : "Add one improvement."}</strong><span>{chosenPlan && chosenImprovement ? "Next, tell council which evidence supports it and exactly when the city must check whether it worked." : "The goal is not the class’s one correct opinion. The goal is a reasoned choice that can be challenged and improved."}</span></aside>
          <SkillMove scene={scene} />
        </div>
      )}

      {scene === 3 && (
        <div className="civic-workbench-body">
          <CaseReminder />
          <section className="civic-checkback-explainer"><small>ONE LAST IDEA</small><strong>A check-back plan keeps power answerable.</strong><p>It says <b>when</b> the city will look again, <b>what information</b> it will use, <b>who gets heard</b>, and whether the rule should change.</p></section>
          {!chosenPlan || !chosenImprovement ? <aside className="civic-return-note"><strong>Bring your Part 3 choice here.</strong><span>{!chosenPlan ? "Choose one starting plan in Part 3. " : ""}{!chosenImprovement ? "Add one fairness improvement in Part 3." : ""}</span></aside> : <aside className="civic-choice-carryover"><article><small>PLAN WE ARE TESTING</small><strong>{chosenPlan.title}</strong><span>{chosenPlan.action}</span></article><article><small>HOW WE IMPROVED IT</small><strong>{chosenImprovement.label}</strong><span>{chosenImprovement.detail}</span></article></aside>}
          <fieldset className="civic-final-choice civic-final-evidence">
            <legend>1. Which fact belongs in your reason?</legend><p>Choose the fact that best supports your class’s plan. Be ready to explain the connection.</p>
            <div>{recommendationEvidence.map((item) => <button type="button" key={item.id} aria-pressed={evidenceId === item.id} data-selected={evidenceId === item.id ? "true" : "false"} onClick={() => { setEvidenceId(item.id); setShowRecommendation(false); setAnnouncement(`Evidence chosen: ${item.label}`); }}><b aria-hidden="true">{evidenceId === item.id ? "✓" : "?"}</b><span>{item.label}</span></button>)}</div>
          </fieldset>
          <fieldset className="civic-final-choice civic-final-review">
            <legend>2. How will the city check what happened?</legend><p>Choose one real check-back plan—not “we will see if it works.”</p>
            <div>{reviewPlans.map((item) => <button type="button" key={item.id} aria-pressed={reviewId === item.id} data-selected={reviewId === item.id ? "true" : "false"} onClick={() => { setReviewId(item.id); setShowRecommendation(false); setAnnouncement(`Check-back chosen: ${item.label}`); }}><small>{reviewId === item.id ? "✓ CHECK-BACK CHOSEN" : "CHECK-BACK OPTION"}</small><strong>{item.label}</strong><span>{item.detail}</span></button>)}</div>
          </fieldset>
          <button type="button" className="civic-build-recommendation" disabled={!recommendationReady} onClick={() => { setShowRecommendation(true); setAnnouncement("The class council recommendation is ready to read and improve."); }}>{recommendationReady ? "Build our 30-second council recommendation" : "Choose a plan, improvement, fact, and check-back first"}</button>
          {showRecommendation && chosenPlan && chosenImprovement && chosenEvidence && chosenReview && <article className="civic-council-recommendation" aria-live="polite"><header><small>JUNIPER PARK · CLASS RECOMMENDATION</small><h4>Try it. Watch what happens. Be willing to change it.</h4></header><blockquote>“We recommend that the city <b>{chosenPlan.recommendation}</b>. This is a reasonable first move because <b>{chosenEvidence.sentence}</b>. To make the plan fairer, the city should <b>{chosenImprovement.sentence}</b>. Council should <b>{chosenReview.sentence}</b>. If noise, safety, or fair access gets worse, the city should change the rule instead of defending a plan that is not working.”</blockquote><footer><strong>PAPER REMIX</strong><span>With a partner, rewrite one sentence so it is clearer, fairer, or better supported. You may disagree with the class plan—show the evidence and build a stronger one.</span></footer></article>}
          <SkillMove scene={scene} />
        </div>
      )}

      <footer className="civic-workbench-footer"><div><strong>ONE SHARED SCREEN</strong><span>Talk, point, move, or use paper A/B/C cards. One person can tap for the class. No student device or personal disclosure is needed.</span></div><div><strong>NO WINNING OPINION</strong><span>Strong civic thinking shows evidence, affected people, possible harm, and what could make us change our minds.</span></div><button type="button" onClick={resetWorkbench}>Reset class choices</button></footer>
    </section>
  );
}

export default CivicCaseWorkbench;
