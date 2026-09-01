"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { socialInquiryProject, socialLessons, socialPacing, socialUnits, unit1SocialLessons, unit2SocialLessons, unit4SocialLessons, type SocialLesson } from "./social-program";
import { socialReadinessFor } from "./readiness-supports";
import { CityMovesLab, CooperationControlRoomLab, DataSkylineLab, SupplyChainLab } from "./social-unit3-experiences";
import { ExpertExchangeLab, MakeItTeachableLab, ResponsesUnderPressureLab, SystemThreadLab } from "./social-unit4-experiences";
import { spacesPolicyForActivity } from "./classroom-program";
import { WorldAtlasIntroduction, WorldContextBand, WorldJourney, WorldPortal } from "./unit-world-components";
import { worldFor, worldStyle } from "./unit-worlds";
import { isReviewedStudentLessonId, resolveStudentLessonContract } from "./student-lesson-contract";
import { CivicCaseWorkbench, civicTeacherGuideForScene } from "./social-unit2-experiences";
import { unit2ScenarioCards } from "./civic-evidence-data";
import { CivicEvidencePathway, CivicReasoningRoute, civicDeliveryByLesson, isCivicLessonId } from "./civic-evidence-pathway";
import { CivicDecisionBriefLab } from "./civic-decision-brief-lab";
import type { DailyLaunch } from "./daily-launch";
import { TeacherDailyLaunchButton } from "./student-home-portal";
import { TeacherRunSheet, teacherRunSheetSaveTarget } from "./teacher-run-sheet";
import { coreCompetencyMovesFor, runSheetAccessibilityFor } from "./learning-lens";
import CurrentConnectionPlayer from "./current-connection";
import { currentConnectionForLesson } from "./current-connections";
import { issueInvestigationsForLesson } from "./issue-investigations";
import { SurreyElectionBridge, SurreyElectionPacing } from "./surrey-election-2026";
import "./social-studies.css";
import "./social-unit1.css";
import "./social-unit2.css";
import "./social-unit3.css";
import "./social-unit4.css";
import "./social-unit2-workbench.css";
import "./surrey-election-2026.css";
import "./surrey-election-2026-activities.css";
import "./current-connection.css";
import "./teacher-run-sheet.css";

type StudentSceneCopy = { title: string; action: string; product: string };
type StudentLessonCopy = { question: string; learning: string; success: string[]; scenes: StudentSceneCopy[] };

const civicSceneQuestions = [
  "Who could be affected by this rule? What might change for them?",
  "Which clues are facts we have, questions to investigate, or people we still need to hear?",
  "Which starting plan should the city test first? What change would make it fairer?",
  "What should council try, what evidence supports it, and when should the city check back?",
] as const;
const civicLessonBigIdea = "Rules can protect people, ignore people, or be changed when the evidence shows a better way.";

function socialSpacesDecision(lesson: SocialLesson) {
  return spacesPolicyForActivity(lesson.id)?.decision ?? lesson.spacesUse;
}

function socialSpacesDisplay(lesson: SocialLesson) {
  const policy = spacesPolicyForActivity(lesson.id);
  const decision = policy?.decision ?? lesson.spacesUse;
  return {
    decision,
    teacherPrompt: policy?.teacherPrompt ?? lesson.spacesPrompt,
    activityPrompt: policy ? lesson.spacesPrompt : null,
    studentPrompt: policy?.studentPrompt ?? lesson.spacesPrompt,
  };
}

const studentLessonCopy: Record<string, StudentLessonCopy> = {
  "maps-make-arguments": {
    question: "Why do three maps of Fleetwood show us different things?",
    learning: "Mapmakers make choices. Each map shows the information that helps it do a particular job.",
    success: ["I can point to something the map really shows.", "I can explain the job each map was made to do.", "I can use more than one map and say what is still missing."],
    scenes: [
      { title: "Meet the three maps", action: "Watch the class screen. For each map, point to one detail you can actually see. Say it aloud, add it to the board, or sketch it on paper.", product: "One visible detail and one question from each map" },
      { title: "Find each map’s job", action: "Look at who made the map and what it shows. Decide what the map helps people find, understand, or plan.", product: "A spoken, board, or paper comparison of the three map jobs" },
      { title: "Use the maps together", action: "Choose useful details from more than one map. Explain something about Fleetwood that one map could not show by itself.", product: "One class claim with evidence and one thing the maps still cannot tell us" },
      { title: "Teach the mapmaker’s choices", action: "Choose a Fleetwood question. Explain what each map adds, what it leaves out, and why several perspectives help.", product: "A short explanation shared aloud, on the board, or on paper" },
    ],
  },
  "trace-the-claim": {
    question: "How can we check a post before we believe or share it?",
    learning: "We are learning to tell what a source really shows—and what it does not show.",
    success: ["I can pause before I share.", "I can find the truth and explain which evidence makes it believable.", "I can find the first source and point to the exact proof."],
    scenes: [
      { title: "Pause before you share", action: "Read the field-trip post. Find the words that push you to react and the proof that is missing.", product: "Three clues to pause and one respectful reply" },
      { title: "Quick game: Two Lies and a Truth", action: "This is one practice game inside Trace the Claim. Read the source, show A, B, or C for the statement it proves, and point to the exact word or number that helped you.", product: "Three spoken choices supported by something students can point to; no writing or handout" },
      { title: "Find where the rumour began", action: "Start with a cropped group-chat post. Follow its clues back to the full school update and dated evidence.", product: "A four-stop trail from rumour to reliable update" },
    ],
  },
  "perspective-without-guessing": {
    question: "How can we understand what may matter to someone without pretending we know their thoughts?",
    learning: "Start with what the card or source really tells you. Then say what might matter and keep the unknown parts as questions.",
    success: ["I can sort what the source says, what might be true, and what I do not know.", "I can point to the detail that supports my idea.", "I can notice who may be helped, who may have a new problem, and who has not been heard."],
    scenes: [
      { title: "Notice before you choose", action: "Study the generated practice street. Name only what you can see, then read the proposal and make a first choice with one reason.", product: "Visible details, a first choice, and evidence you still need" },
      { title: "Use facts before guessing", action: "Read each card. Mark what is stated, what you can carefully infer, and what you cannot know.", product: "Four fact–inference–unknown notes" },
      { title: "Change one condition", action: "When the priority changes, reconsider the options. Explain who may gain or face a cost.", product: "A revised choice and impact chart" },
      { title: "Hear another group. Make your plan better.", action: "Repeat their concern in your own words and ask if you understood. Then change one part of your plan—or explain why you kept it.", product: "What you heard, what you changed or kept, and one question you still have" },
    ],
  },
  "fleetwood-case-file": {
    question: "How can we make a careful recommendation about a real Fleetwood question?",
    learning: "We are learning to use different sources and local voices to study a public choice.",
    success: ["I can ask a focused question about a real place and decision.", "I can use three different kinds of sources.", "I can recommend a next step and name a limit."],
    scenes: [
      { title: "Choose a question we can study", action: "Name the Fleetwood place, the public choice, who may be affected, and who can decide.", product: "One focused case question" },
      { title: "Build the case with three sources", action: "Use a map or plan, community evidence, and independent information. Record what each source adds.", product: "A three-source case board" },
      { title: "Check possible results", action: "Think about what may happen soon and later, including results nobody planned.", product: "A consequence map and a revised option" },
      { title: "Present and improve your recommendation", action: "Share your best-supported option. Listen to questions and make one final change.", product: "A revised case file and two-minute explanation" },
      { title: "Reflect on your own thinking", action: "Explain which source changed your thinking, what you contributed, and what evidence is still missing.", product: "Your own short portfolio reflection" },
    ],
  },
  "power-in-the-room": {
    question: "Who gets to decide, who can shape the choice, and how could the rules become fairer?",
    learning: "Power can come from making the final choice, holding most of the materials, knowing something important, or being taken seriously.",
    success: ["I can show who made the final choice, held the tokens, knew important information, and was heard.", "I can use one moment from the game to explain what felt fair or unfair.", "I can change one rule and explain whose power changed."],
    scenes: [
      { title: "Build the room with unequal roles", action: "Get into a group of four. Read only your own role card. Use the ten counters and the six-minute timer on screen to make one room plan.", product: "One paper room plan and a first reaction to how the decision happened" },
      { title: "Show where the power was", action: "Use moments from the game: who made the last call, who held most counters, who knew a hidden need, and who struggled to be heard?", product: "One class power map with examples from the game" },
      { title: "Which fairness check was weakest?", action: "Choose one: everyone had a voice, everyone had the needed information, reasons were explained, the choice could be questioned, or the decision-maker had to answer for the result.", product: "One fairness choice and one moment from the game that proves it" },
      { title: "Change one rule and play again", action: "Choose one new rule from the screen. Replay the decision for six minutes. Compare what people could do and what the group built.", product: "One before-and-after comparison and one thing that is still not fair" },
    ],
  },
  "compare-government-systems": {
    question: "How can different government systems change who decides and how people respond?",
    learning: "We are learning to compare how systems share power, make decisions, protect rights, and correct mistakes.",
    success: ["I can use the same questions to compare systems.", "I can explain a strength and a cost without saying faster is always better.", "I can remember that real countries are more complex than a simple model."],
    scenes: [
      { title: "A water decision cannot wait", action: "Study the fictional emergency. Protect essential needs and predict which decision rule may act well.", product: "A first response and one question" },
      { title: "Run the decision relay", action: "Move the same emergency through three simplified decision models. Rotate roles and cross-teach your path.", product: "One team decision path and oral cross-teach" },
      { title: "Build the trade-off scoreboard", action: "Place each model for speed, public voice, clear reasons, rights checks, and correction. Point to evidence for every placement.", product: "A class comparison wall and one defended trade-off" },
      { title: "Build Canada as a system stack", action: "Layer representative democracy, Parliament, constitutional monarchy, federalism, the Charter, courts, media, and public participation.", product: "A Canada system stack and one corrected oversimplification" },
    ],
  },
  "rights-in-tension": {
    question: "How can a city make a fair decision when one shared place affects people in different ways?",
    learning: "A fair public decision listens to people affected, uses evidence, explains what each choice may change, and can be revised if it is not working.",
    success: ["I can explain how one rule affects several groups.", "I can separate what we know, need to ask, and need to hear.", "I can recommend a plan using a fact and a real check-back."],
    scenes: [
      { title: "Who lives with the decision?", action: "Meet the fictional Juniper Park night-court decision. Predict and reveal how four groups could be affected before deciding what you think.", product: "A whole-class impact picture" },
      { title: "Hear the park. Build the evidence wall.", action: "Read four community voices, paraphrase each fairly, then sort six clues into WE KNOW, WE NEED TO ASK, or WE NEED TO HEAR.", product: "A class wall of facts, questions, and voices" },
      { title: "Choose a starting plan. Make it stronger.", action: "Compare three realistic city responses. Choose one the class can both defend and question, then add one fairness improvement.", product: "A testable first plan and one improvement" },
      { title: "Build a 30-second council recommendation.", action: "Choose a supporting fact and a check-back plan. Build the class recommendation, then improve one sentence on paper.", product: "A short recommendation with evidence and a way to revise the rule" },
    ],
  },
  "civic-decision-brief": {
    question: "How should government respond to a public problem while protecting rights and answering to people?",
    learning: "We are using what we learned about power, government, rights, evidence, and consequences to recommend a responsible next step.",
    success: ["I can name which government or public group can act.", "I can use trustworthy sources to study power, rights, viewpoints, and results.", "I can recommend a plan with protections, a review step, and an honest limit."],
    scenes: [
      { title: "Run the jurisdiction dash", action: "Send each issue to a government level or public group that can actually act. Then focus your team’s public question.", product: "A focused decision and correct decision-maker" },
      { title: "Build one civic case wall", action: "Use three sources that do different jobs. Connect authority, influence, rights, affected people, and a missing voice.", product: "A shared civic case wall" },
      { title: "Put options under pressure", action: "Rotate through effectiveness, rights, consequences, safeguards, and review. Improve more than one possible response.", product: "A challenged and improved set of options" },
      { title: "Hold a 90-second civic hearing", action: "Teach your recommendation in an approved format, answer one panel question, and revise one feature.", product: "A final team artifact or link" },
      { title: "Show your own thinking", action: "Explain what changed your mind, what you contributed, and one responsible way people could take part.", product: "Your own SpacesEDU reflection" },
    ],
  },
  "city-moves": {
    question: "Why do people move, and how can movement change people and places?",
    learning: "We are learning that movement stories have different routes, reasons, and results—and that no single story represents everyone.",
    success: ["I can tell movement within a country from movement across a border.", "I can connect more than one reason or result using evidence.", "I can show what changed, what stayed, and why it matters."],
    scenes: [
      { title: "Map four different routes", action: "Read the story cards and place each route on the floor map. Use the evidence to name the kind of movement.", product: "A mapped route and careful movement labels" },
      { title: "Build a many-reasons web", action: "Connect the reasons stated in each story. Keep questions and unknowns open instead of guessing.", product: "A reason web with one honest unknown" },
      { title: "Send changes through the city", action: "Add housing, transit, school, health, work, language, and gathering-place cards. Trace results now and later.", product: "A cause-and-result route through the city" },
      { title: "Show change and continuity", action: "Build a before–during–after timeline. Explain one change, one thing that continued, and why it matters.", product: "A timeline with a significance claim" },
    ],
  },
  "data-skyline": {
    question: "What can an average show—and what can it hide about inequality?",
    learning: "We are learning to read poverty and inequality data without turning one number into a story about every person or place.",
    success: ["I can build and label a data display correctly.", "I can explain what an average hides.", "I can make one careful claim and name a limit."],
    scenes: [
      { title: "Raise the data skyline", action: "Build bars from the data cards. Match every height to its indicator, unit, place, year, and source.", product: "One correctly labelled skyline" },
      { title: "Solve a mystery match", action: "Match evidence to an anonymous profile. Defend the match and reject one tempting assumption.", product: "A defended match and one rejected assumption" },
      { title: "Look inside the average", action: "Split one overall bar by wealth, gender, or urban–rural location. Mark the gap without pretending the pattern proves its cause.", product: "An annotated comparison showing what was hidden" },
      { title: "Write the caption it deserves", action: "Write one precise claim and one limitation. Audit another team’s labels and language.", product: "A sourced caption with a visible limit" },
    ],
  },
  "supply-chain-shockwave": {
    question: "How do trade and resource decisions connect people—and create benefits, costs, and conflict?",
    learning: "We are learning to trace the hidden system behind familiar products and test who gains, who carries risk, and who decides.",
    success: ["I can trace several links in a supply chain.", "I can follow a disruption through the system.", "I can improve one link and explain the trade-off."],
    scenes: [
      { title: "Build the hidden product web", action: "Connect material, component, transport, work, and sales cards with string. Mark who decides at each step.", product: "A labelled supply-chain web" },
      { title: "Send a shockwave through it", action: "Draw a disruption card and trace at least three effects. Notice who can adjust and who carries the risk.", product: "A three-step ripple map" },
      { title: "Study one real resource decision", action: "Compare a source from the named Indigenous Nation or organization with a public decision source. Keep benefits, effects, authority, and missing evidence specific.", product: "An attributed resource-decision case card" },
      { title: "Improve one link", action: "Change one rule or part of the route, run the shock again, and explain the benefit, new cost, and review needed.", product: "A redesign with an honest trade-off" },
    ],
  },
  "cooperation-control-room": {
    question: "Why do global problems need cooperation—and why is cooperation still hard?",
    learning: "We are learning what governments, Indigenous organizations, NGOs, and international groups can do together—and where their power ends.",
    success: ["I can compare how two sources cover the same event.", "I can explain what different groups can contribute and what limits them.", "I can build and test a shared plan."],
    scenes: [
      { title: "Same event, different coverage", action: "Compare two dated reports. Mark shared facts, different focus, source purpose, and missing context.", product: "A same-facts/different-frame source card" },
      { title: "Enter the control room", action: "Inspect the fictional river basin and your team’s capacity card. Show what your group can offer and what it cannot do alone.", product: "A capacity-and-limit board" },
      { title: "Negotiate a shared agreement", action: "Trade evidence and resources, assign responsibilities, then add a constraint and show where interests still clash.", product: "A shared agreement map with one tension" },
      { title: "Audit and patch the plan", action: "Test evidence, representation, fairness, feasibility, and unintended effects. Add one patch and a signal to check later.", product: "A revised plan and review signal" },
    ],
  },
  "pull-the-system-thread": {
    question: "What keeps our issue going, and where could change travel through the system?",
    learning: "We are learning to build an evidence-based system map before proposing change.",
    success: ["I can connect symptoms, causes, power, and affected people.", "I can explain why the issue matters and to whom.", "I can trace possible effects and name a limit."],
    scenes: [
      { title: "Reopen the inquiry", action: "Restate the issue, who is affected, why it matters, and what your team no longer assumes.", product: "A focused question and significance statement" },
      { title: "Build the system web", action: "Connect what happened, what keeps it going, who shapes it, and who feels it. Attach evidence to every connection.", product: "A sourced system map" },
      { title: "Tug one system thread", action: "Change one policy, resource, information flow, relationship, or decision point. Trace three effects, including an unintended one.", product: "A three-effect change path" },
      { title: "Choose a leverage question", action: "Choose one place to investigate further. Name evidence, people who should shape the decision, and one limit in your map.", product: "A revised map and leverage question" },
    ],
  },
  "responses-under-pressure": {
    question: "What can real responses teach us when none is a perfect solution?",
    learning: "We are learning to test responses for evidence, reach, fairness, costs, limits, and unexpected results.",
    success: ["I can compare responses with the same questions.", "I can explain who benefits and who carries costs.", "I can keep, adapt, or question one feature for a reason."],
    scenes: [
      { title: "Discover three real responses", action: "At each station, find the actor, goal, action, evidence, scale, and stated limit.", product: "Three concise response records" },
      { title: "Sort by what the response does", action: "Place responses on relief, prevention, and system-change lines. Overlap is allowed when the evidence supports it.", product: "A defended and revised response sort" },
      { title: "Put each response under pressure", action: "Test evidence, reach, fairness, cost, rights, and unintended effects. Add one surprise constraint.", product: "A comparison with one serious limit" },
      { title: "Borrow carefully", action: "Keep, adapt, or question one feature. Turn your reason into a design rule for your own project.", product: "One evidence-backed design principle" },
    ],
  },
  "make-it-teachable": {
    question: "How can we turn strong research into an experience that helps classmates think?",
    learning: "We are learning to choose a useful form, prototype before polishing, and check accuracy before production.",
    success: ["I can choose a form that fits the learning.", "I can build a strong learning spine in any format.", "I can revise accuracy and experience design from feedback."],
    scenes: [
      { title: "Match the form to the learning", action: "Decide what classmates must understand and do, then test which format actually helps that happen.", product: "A justified format and learning spine" },
      { title: "Make it on paper first", action: "Storyboard the opening, three essential ideas, evidence, perspectives, audience decision, and honest ending.", product: "A complete paper prototype" },
      { title: "Pass the accuracy gate", action: "Check claims, sources, timeline, significance, causes, power, responses, and limits before adding polish.", product: "An approved evidence passport" },
      { title: "Build the minimum useful experience", action: "Create only what classmates need to learn and respond. Make roles, access, timing, citations, and a realistic action pathway clear.", product: "A testable experience; polish is not assessed" },
    ],
  },
  "expert-exchange": {
    question: "What did our audience actually learn, and how should that change our teaching?",
    learning: "We are learning to use audience evidence to revise, teach accurately, and explain our own contribution and growth.",
    success: ["I can collect useful audience feedback.", "I can revise one idea and one experience feature for clear reasons.", "I can teach, answer questions, and reflect on my own learning."],
    scenes: [
      { title: "Run a cold test", action: "Another team tries your experience without a preview. Observe; do not coach. Collect: I learned / I got stuck / I need proof for.", product: "Three kinds of audience evidence" },
      { title: "Listen to the audience teach back", action: "Testers explain the main idea, why it matters, evidence, and one limit. Compare that with what you meant to teach.", product: "A learning-gap map" },
      { title: "Revise an idea and the experience", action: "Correct one content claim and improve one direction, interaction, access feature, or evidence moment. Name the signal behind each change.", product: "A before-and-after revision record" },
      { title: "Hold the expert exchange", action: "Teach, answer questions, and post the team artifact once. Then add your own short audio, video, or text reflection.", product: "One shared product plus your own SpacesEDU reflection" },
    ],
  },
};

const socialWordHelp: Record<string, string> = {
  source: "where information or an idea came from",
  inference: "a careful idea based on clues",
  perspective: "a way of seeing an issue shaped by experience and position",
  territory: "land connected to a people, Nation, or government",
  unceded: "not given up through a treaty or agreement",
  claim: "an idea someone says is true",
  "original source": "the first report, data, image, or statement behind a claim",
  corroborate: "check whether another independent source supports the same idea",
  context: "details that help information make sense",
  reliable: "worthy of trust for this purpose",
  uncertain: "not yet clear from the available evidence",
  uncertainty: "what the available evidence does not yet let us know for sure",
  cause: "something that helps make an event or change happen",
  consequence: "a result or effect that follows a choice, event, or change",
  "ethical judgment": "a reasoned decision about what is fair, responsible, or harmful",
  recommendation: "a suggested action supported by reasons and evidence",
  stakeholder: "a person or group affected by a decision",
  interest: "something a person or group wants to protect or improve",
  value: "an idea or principle someone believes is important",
  constraint: "a limit or rule a plan must work within",
  "trade-off": "when gaining one thing may mean giving up some of another",
  power: "the ability to shape choices or results",
  "public space": "a place shared by a community, such as a park, library, plaza, or recreation centre",
  evidence: "a fact, count, observation, or source that helps us judge an idea",
  "fair process": "a way of deciding that hears affected people, uses evidence, gives reasons, and can be checked",
  review: "a planned check to see what happened and whether a decision should change",
  authority: "official power given by a role, rule, or law",
  legitimacy: "being accepted as fair and rightful",
  accountability: "having to explain decisions and answer for their effects",
  influence: "the ability to shape a choice without making the final decision",
  democracy: "a system in which people have ways to choose leaders and take part",
  authoritarian: "a system where power is held by one leader or a small group with few checks",
  constitutional: "limited and guided by a constitution or basic laws",
  federal: "power is shared between a national government and provinces or states",
  unitary: "most government power is held at the national level",
  representation: "people choosing or appointing others to speak and decide for them",
  "human rights": "basic protections and freedoms that belong to every person",
  freedom: "the ability to think, speak, believe, or act within fair limits",
  equality: "fair protection, dignity, and opportunity",
  discrimination: "unfair treatment connected to identity or a protected characteristic",
  responsibility: "a duty to act with care toward others or the community",
  proportionate: "not more harmful or restrictive than the problem requires",
  jurisdiction: "which government or public body has the power to act",
  "public policy": "a government plan, rule, or action for a public issue",
  safeguard: "a protection that lowers the chance of harm",
  remedy: "a fair step taken to repair or respond to harm",
  "civic participation": "responsible ways people take part in public life",
  migration: "people moving from one place to another to live for a time or longer",
  urbanization: "the growth and change of cities and towns as more people live in them",
  "internal migration": "moving to a new place within the same country",
  "international migration": "moving from one country to another",
  refugee: "a person forced to leave their country because returning would not be safe",
  continuity: "something important that continues across a period of change",
  poverty: "not having reliable access to the resources and conditions needed for a secure life",
  inequality: "an uneven distribution of opportunities, resources, rights, or outcomes",
  average: "a number that summarizes a group but may hide differences inside it",
  indicator: "a specific measurement used as evidence about a larger condition",
  multidimensional: "made of several connected parts or measures",
  disaggregate: "separate combined data into useful groups to see differences",
  interdependence: "when people, places, or systems rely on one another",
  "supply chain": "the connected steps that move materials into a finished product and to a user",
  trade: "the exchange of goods or services between people, businesses, or places",
  "economic policy": "a public rule or decision that shapes money, work, trade, or resources",
  "resource management": "decisions about how land, water, materials, or energy are used and cared for",
  "self-interest": "trying to protect or improve one’s own goals or benefits",
  "international cooperation": "countries and organizations working together on a shared issue",
  conflict: "a serious disagreement or struggle over needs, interests, rights, power, or resources",
  "non-governmental organization": "a group that works on public needs without being part of government",
  "indigenous organization": "a specific Indigenous-led body with its own members, role, and authority",
  mandate: "the job and limits officially given to a person or organization",
  agreement: "a recorded understanding about what different people or groups will do",
  system: "connected parts that affect one another over time",
  symptom: "a visible result or sign of a deeper condition",
  "root cause": "a deeper condition helping a problem continue",
  "leverage point": "a place in a system where a change might affect other parts",
  significance: "why something matters, to whom, and with what effects",
  "unintended consequence": "a result that was not planned or expected",
  response: "an action taken to address a need, problem, or event",
  prevention: "action meant to stop harm before it happens or returns",
  scale: "the size or level at which an action or pattern operates",
  feasibility: "whether a plan can realistically be done with available time, power, and resources",
  "design principle": "a reasoned rule that guides how something should be made or improved",
  prototype: "an early version used to test and improve an idea",
  audience: "the people a message or experience is designed to reach",
  "learning spine": "the essential ideas, evidence, and audience action holding a teaching experience together",
  citation: "a note showing where information or evidence came from",
  accuracy: "being correct and precise enough for the purpose",
  feedback: "specific information about what worked, what was unclear, or what needs proof",
  "teach-back": "explaining an idea in your own words to show what you understood",
  revision: "a meaningful change made after testing an idea or product",
  contribution: "a specific part of the thinking or work a person added",
  "action pathway": "a realistic route showing who could do what next, with limits and review",
};

function IssueSourceSetDrawer({ lessonId, audience }: { lessonId: string; audience: "teacher" | "student" }) {
  const investigations = issueInvestigationsForLesson(lessonId);
  if (investigations.length === 0) return null;

  const summary = investigations.length === 1
    ? investigations[0].title
    : `${investigations.length} issue source sets`;

  return (
    <details className={`social-source-drawer social-issue-source-drawer social-issue-source-drawer--${audience}`}>
      <summary><span><small>AUTHENTIC ISSUE SOURCES</small><strong>{summary}</strong></span><b>Open ▾</b></summary>
      <div className="social-issue-source-drawer__sets">
        {investigations.map((issue) => {
          const visibleSources = audience === "student"
            ? issue.sources.filter((source) => source.access === "student-ready")
            : issue.sources;

          return (
            <article className="social-issue-source-card" key={issue.id}>
              <header><small>{issue.scope}</small><h3>{issue.title}</h3><p>{issue.question}</p></header>
              <nav aria-label={`${issue.title} sources`}>
                {visibleSources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.id}>
                  <small>{source.organization} · {source.kind.replaceAll("-", " ")}{audience === "teacher" ? ` · ${source.access.replaceAll("-", " ")}` : ""}</small>
                  <strong>{source.title}</strong>
                  <p>{source.lookFor}</p>
                  <b>Open source ↗</b>
                </a>)}
              </nav>
              {audience === "student" ? (
                <footer><small>LOOK + WONDER</small><strong>Choose one source. Point to a detail before offering an explanation.</strong><span>Team destination: {issue.teamProduct}</span></footer>
              ) : (
                <div className="social-issue-source-card__teacher">
                  <section><small>WHY THIS FITS</small><p>{issue.whyItMatters}</p></section>
                  <section><small>QUICK PROJECTOR ROUTE</small><ol>{issue.quickLook.map((move) => <li key={move}>{move}</li>)}</ol></section>
                  <aside><small>PREP + SAFETY</small><p>{issue.teacherNote}</p><p><b>If a link fails:</b> {issue.offlineFallback}</p></aside>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </details>
  );
}

export function SocialStudiesProgramTab({ tab, mode, lessonId, onLesson, scene, onScene }: { tab: string; mode: "teacher" | "projector"; lessonId: string; onLesson: (id: string) => void; scene: number; onScene: (scene: number) => void }) {
  const selected = socialLessons.find((lesson) => lesson.id === lessonId) ?? socialLessons[0];

  if (mode === "projector") return <SocialStudiesStudentLaunch lessonId={lessonId} onLesson={onLesson} scene={scene} onScene={onScene} />;

  if (tab === "Units" || tab === "Journey") return <SocialUnitsOverview onLesson={onLesson} />;
  if (tab === "Lessons") return <SocialLessons selected={selected} onLesson={onLesson} scene={scene} onScene={onScene} />;
  if (tab === "Assessments") return <SocialAssessment onLesson={onLesson} />;
  if (tab === "Final Inquiry") return <SocialFinalInquiry onLesson={onLesson} />;
  if (tab === "Pacing") return <SocialPacing />;
  return <SocialResources />;
}

function SocialUnitSwitcher({ currentUnitId, onLesson }: { currentUnitId: SocialLesson["unitId"]; onLesson: (id: string) => void }) {
  return (
    <nav className="social-direct-unit-switcher" aria-label="Change Social Studies unit">
      <div><small>SOCIAL STUDIES UNITS</small><strong>Jump straight to another unit</strong></div>
      <section>
        {socialUnits.map((unit) => {
          const firstLesson = socialLessons.find((lesson) => lesson.unitId === unit.id);
          const selected = unit.id === currentUnitId;
          return <button type="button" key={unit.id} aria-current={selected ? "page" : undefined} className={selected ? "selected" : ""} onClick={() => firstLesson && onLesson(firstLesson.id)}><b>{Number(unit.number)}</b><span><small>{selected ? "CURRENT UNIT" : `UNIT ${Number(unit.number)}`}</small><strong>{unit.title}</strong></span></button>;
        })}
      </section>
    </nav>
  );
}

export function SocialStudiesStudentLaunch({ lessonId, onLesson, scene, onScene }: { lessonId: string; onLesson: (id: string) => void; scene: number; onScene: (scene: number) => void }) {
  const lesson = socialLessons.find((item) => item.id === lessonId) ?? socialLessons[0];
  const lessonNumber = socialLessons.findIndex((item) => item.id === lesson.id) + 1;
  const theme = worldFor(lesson.unitId);
  const unitLessons = socialLessons.filter((item) => item.unitId === lesson.unitId);
  const unit = socialUnits.find((item) => item.id === lesson.unitId);
  const copy = studentLessonCopy[lesson.id];
  const studentScene = copy?.scenes[scene];
  const contract = isReviewedStudentLessonId(lesson.id) ? resolveStudentLessonContract(lesson.id) : null;
  const contractStep = contract?.steps[scene] ?? contract?.steps[0];
  const readinessLaunch = socialReadinessFor(lesson);
  const currentConnection = currentConnectionForLesson(lesson.id);
  const civicGuide = lesson.id === "rights-in-tension" ? civicTeacherGuideForScene(scene) : null;
  const lessonPickerRef = useRef<HTMLDetailsElement>(null);
  const chooseStudentLesson = (id: string) => {
    onLesson(id);
    lessonPickerRef.current?.removeAttribute("open");
  };
  const bigIdea = lesson.id === "rights-in-tension"
    ? civicLessonBigIdea
    : unit?.question ?? copy?.question ?? lesson.question;
  const scrollToMap = () => document.getElementById("social-unit-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <section className="social-student-launch world-surface" data-world={theme.id} style={worldStyle(theme)}>
      <header className="social-projector-header"><div><small>SOCIAL STUDIES · {unit ? `UNIT ${unit.number}` : "INQUIRY"} · PART {scene + 1}</small><h1>{lesson.title}</h1><p>{contract?.challenge ?? copy?.question ?? lesson.question}</p></div><button type="button" onClick={scrollToMap}>Change lesson</button></header>
      {lesson.unitId === "power-rights-government" && scene === 0 && <CivicReasoningRoute compact />}
      {scene === 0 && currentConnection && <details className="social-source-drawer"><summary><span><small>OPTIONAL SOURCE</small><strong>Open today&apos;s Source Lab</strong></span><b>Open ▾</b></summary><CurrentConnectionPlayer connection={currentConnection} /></details>}
      {scene === 0 && <SurreyElectionBridge lessonId={lesson.id} audience="student" />}
      {scene === 0 && <IssueSourceSetDrawer lessonId={lesson.id} audience="student" />}
      <SocialStudentLesson lesson={lesson} scene={scene} onScene={onScene} />
      <details className="social-unit-switcher-drawer"><summary>Change Social Studies unit</summary><SocialUnitSwitcher currentUnitId={lesson.unitId} onLesson={chooseStudentLesson} /></details>
      <details ref={lessonPickerRef} className="social-lesson-switcher" id="social-unit-map">
        <summary><span><small>TODAY&apos;S LESSON</small><strong>{lessonNumber}. {lesson.title}</strong></span><b>Change lesson</b></summary>
        <div className="social-lesson-tabs">{socialLessons.map((item, index) => <button key={item.id} className={item.id === lesson.id ? "selected" : ""} onClick={() => chooseStudentLesson(item.id)}><b>{index + 1}</b><span><small>{item.kind}</small><strong>{item.title}</strong></span></button>)}</div>
        <WorldJourney theme={theme} stops={unitLessons.map((item) => ({ id: item.id, title: item.title, label: item.kind }))} activeId={lesson.id} onSelect={chooseStudentLesson} />
      </details>
    </section>
  );
}

function SocialUnitsOverview({ onLesson }: { onLesson: (id: string) => void }) {
  return (
    <div className="social-program">
      <section className="social-heading"><div><span className="recent-section-badge">● FOUR SOCIAL STUDIES UNITS · AUG. 14</span><p className="section-kicker">SEPTEMBER–FEBRUARY SOCIAL STUDIES PLAN</p><h2>Four units. One connected inquiry arc.</h2><p>Each unit has games, movement, physical models, source comparisons, simulations, making, and audience testing. Most practice stays in the room; SpacesEDU holds selected portfolio evidence.</p></div><span>BUILD, TEACH, ADJUST</span></section>
      <section className="social-inquiry-arc"><div><small>SUPPORTED INQUIRY</small><strong>Read sources carefully</strong></div><b>→</b><div><small>GUIDED CASES</small><strong>Compare evidence and perspectives</strong></div><b>→</b><div><small>EXPERT TEAMS</small><strong>Investigate and teach</strong></div><b>→</b><div><small>SOLUTIONARY</small><strong>Consider responsible action</strong></div></section>
      <SocialInquiryOverview compact />
      <WorldAtlasIntroduction />
      <div className="social-unit-map">{socialUnits.map((unit) => {
        const firstLesson = socialLessons.find((lesson) => lesson.unitId === unit.id) ?? socialLessons[0];
        const theme = worldFor(unit.id);
        return <article key={unit.id} className="world-themed-card" data-world={theme.id} style={worldStyle(theme)}>
          <header><span>{unit.number}</span><small>{unit.status}</small></header>
          <WorldPortal theme={theme} compact audience="student" />
          <span className="unit-updated-badge">{unit.number === "01" ? "CLASSROOM BUILD" : unit.number === "02" ? "EXPERIENCE BUILD" : "NEW FIRST PASS"} · AUG. 12</span>
          <p>{unit.subtitle}</p><h3>{unit.title}</h3><blockquote>{unit.question}</blockquote>
          <div>{unit.content.map((item) => <span key={item}>{item}</span>)}</div>
          <details className="arc-spaces-bookends"><summary>SpacesEDU possibilities ▾</summary><section><strong>Optional entry snapshot</strong><p>Answer the unit question with what you think now, the evidence you already have, and one wonder.</p><div><span>20-second audio</span><span>Quick map or system sketch</span><span>Two-sentence first claim</span></div></section><section><strong>Possible end evidence</strong><p>Choose one source comparison, decision, system model, or teaching piece that shows growth. Keep routine practice in class.</p><div><span>Image + caption</span><span>Audio explanation</span><span>Short video or text reflection</span></div></section></details>
          <footer><b>{unit.weeks}</b><button onClick={() => onLesson(firstLesson.id)}>Open Unit {Number(unit.number)} →</button></footer>
        </article>;
      })}</div>
      <section className="social-local-note"><span>PLACE-BASED START</span><div><h3>Begin with Fleetwood—then widen toward global systems.</h3><p>Students can investigate a change they can see: Surrey–Langley SkyTrain guideway and station construction is happening now through Fleetwood. That is different from future passenger service, currently anticipated for late 2029. Use the official project updates to keep “being built now” separate from “planned for later.”</p><a href="https://surreylangleyskytrain.gov.bc.ca/current-work/" target="_blank" rel="noreferrer">Open the official current-work page ↗</a></div></section>
    </div>
  );
}

function SocialLessons({ selected, onLesson, scene, onScene }: { selected: SocialLesson; onLesson: (id: string) => void; scene: number; onScene: (scene: number) => void }) {
  const current = selected.scenes[scene] ?? selected.scenes[0];
  const choose = (id: string) => onLesson(id);
  const spaces = socialSpacesDisplay(selected);
  const theme = worldFor(selected.unitId);
  const unit = socialUnits.find((item) => item.id === selected.unitId);
  const contract = resolveStudentLessonContract(selected.id);
  const studentCopy = studentLessonCopy[selected.id];
  const readinessLaunch = socialReadinessFor(selected);
  const currentConnection = currentConnectionForLesson(selected.id);
  const civicDelivery = isCivicLessonId(selected.id) ? civicDeliveryByLesson[selected.id] : null;
  const planBigIdea = selected.id === "rights-in-tension" ? civicLessonBigIdea : unit?.question;
  const teacherRunSteps = contract.reviewState === "reviewed"
    ? contract.steps
    : (studentCopy?.scenes.map((item) => ({ title: item.title, action: item.action, finishCheck: item.product }))
      ?? selected.scenes.map((item) => ({ title: item.title, action: item.prompt, finishCheck: item.studentTask })));
  const plannedRunSteps = currentConnection
    ? [{ title: "Source Lab · Quick Look", action: "Open the named source on the projector. Move through Look, Notice, Claim, and Next as one class; students can point, talk, use the board, or use paper.", finishCheck: "The class names what the source supports, what remains uncertain, and the next check." }, ...teacherRunSteps]
    : teacherRunSteps;
  const dailyLaunch = {
    kind: "social",
    socialId: selected.id,
    worldId: selected.unitId,
    subject: "Social Studies",
    unit: unit ? `Unit ${unit.number} · ${unit.title}` : "Today’s inquiry",
    title: selected.title,
    question: contract.reviewState === "reviewed" ? contract.challenge : studentCopy?.question ?? selected.question,
    firstAction: contract.reviewState === "reviewed" ? contract.firstAction : studentCopy?.scenes[0]?.action ?? selected.scenes[0].prompt,
    finish: contract.reviewState === "reviewed" ? contract.finishEvidence.at(-1) ?? selected.scenes.at(-1)?.studentTask ?? selected.evidenceLevel : studentCopy?.scenes.at(-1)?.product ?? selected.scenes.at(-1)?.studentTask ?? selected.evidenceLevel,
  } satisfies DailyLaunch;
  return (
    <div className="social-program social-lessons-page world-surface" data-world={theme.id} style={worldStyle(theme)}>
      <WorldContextBand theme={theme} teacher />
      <SocialUnitSwitcher currentUnitId={selected.unitId} onLesson={onLesson} />
      {selected.unitId === "power-rights-government" && <CivicEvidencePathway currentLessonId={selected.id} onLesson={onLesson} />}
      <details className="social-lesson-picker-drawer">
        <summary><span><small>CURRENT LESSON</small><strong>{socialLessons.findIndex((item) => item.id === selected.id) + 1}. {selected.title}</strong></span><b>Change lesson ▾</b></summary>
        <div className="social-lesson-picker">{socialLessons.map((lesson, index) => <button key={lesson.id} className={lesson.id === selected.id ? "selected" : ""} onClick={() => choose(lesson.id)}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{lesson.kind} · {lesson.duration}</small><strong>{lesson.title}</strong><p>{lesson.question}</p></div><b>{lesson.evidenceLevel}</b></button>)}</div>
      </details>
      <article className="social-teacher-brief">
        <TeacherDailyLaunchButton launch={dailyLaunch} />
        <SurreyElectionBridge lessonId={selected.id} audience="teacher" />
        <IssueSourceSetDrawer lessonId={selected.id} audience="teacher" />
        <TeacherRunSheet
          title={selected.title}
          duration={selected.duration}
          bigIdea={planBigIdea}
          coreCompetencies={coreCompetencyMovesFor("Social Studies")}
          learningQuestion={dailyLaunch.question}
          learningPurpose={contract.reviewState === "reviewed" ? contract.why : studentCopy?.learning ?? selected.learning}
          provocation={selected.scenes[0]?.prompt}
          firstAction={dailyLaunch.firstAction}
          steps={plannedRunSteps.map((step, index) => ({ ...step, minutes: currentConnection && index === 0 ? currentConnection.minutes : selected.scenes[currentConnection ? index - 1 : index]?.time }))}
          finishEvidence={contract.reviewState === "reviewed" ? contract.finishEvidence : studentCopy?.success ?? selected.success}
          saveTarget={teacherRunSheetSaveTarget(spaces.decision, spaces.teacherPrompt)}
          lookFors={selected.lookFors}
          discussionMoves={selected.teacherMoves}
          misconception={{ idea: selected.misconceptions[0], respond: readinessLaunch.reteach }}
          accessibility={civicDelivery ? [...runSheetAccessibilityFor("Social Studies"), ...civicDelivery.accessibility] : runSheetAccessibilityFor("Social Studies")}
          readiness={selected.id === "rights-in-tension" ? undefined : { ideas: readinessLaunch.background, modelTitle: readinessLaunch.example.title, modelConclusion: readinessLaunch.example.conclusion, check: readinessLaunch.questions[0], reteach: readinessLaunch.reteach }}
          prepare={civicDelivery ? selected.beforeClass : selected.beforeClass.slice(0, 3)}
          materials={selected.materials}
          shortRoute={selected.lowerPrep}
          routes={civicDelivery ?? {
            projector: "Use Teach / Project mode for the shared source, question, and one student move at a time; keep teacher-only source notes in the planning view.",
            sharedDevice: "Use one teacher-controlled screen and table talk. Students point, sort, annotate paper, or contribute to a shared class record.",
            offline: selected.lowerPrep,
          }}
          safetyPrivacyCleanup={civicDelivery?.safetyPrivacyCleanup}
          extension={civicDelivery?.extension}
          dayPlanLesson={{ sourceId: selected.id, subject: "Social Studies", title: selected.title, timing: selected.duration, runSteps: plannedRunSteps.map((step) => `${step.title}: ${step.action}`), notes: civicDelivery?.continuity }}
        />
        {civicDelivery && <details className="teacher-planning-details civic-full-preview"><summary><span><small>FULL PREP + PRINT</small><strong>Preview the exact projector lesson and teacher-only cues</strong></span><b>Open ▾</b></summary><div><p className="civic-preview-note">Use this preview to test each part, print in-lesson materials, and prepare the handoff. Teacher-only guidance remains outside the student view.</p><SocialStudentLab lessonId={selected.id} scene={scene} audience="teacher" /></div></details>}
        <details className="teacher-planning-details">
          <summary><span><small>MORE DETAIL</small><strong>Sources, misconceptions, and assessment notes</strong></span><b>Open ▾</b></summary>
          <div>
            <section className="social-run-sheet">
              <article><h3>Teacher moves</h3><ul>{selected.teacherMoves.map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><h3>Look-fors & misconceptions</h3><ul>{selected.lookFors.map((item) => <li key={item}>{item}</li>)}</ul><details><summary>Common misconceptions</summary>{selected.misconceptions.map((item) => <p key={item}>• {item}</p>)}</details></article>
            </section>
            <section className={`social-evidence ${selected.evidenceLevel.toLowerCase().replaceAll(" ", "-")}`} data-spaces={spaces.decision}><span>{selected.evidenceLevel}</span><div><strong>{selected.evidenceSubjects.join(" · ")}</strong><small className="social-spaces-status">{spaces.decision === "required" ? "REGISTERED PORTFOLIO" : spaces.decision === "reuse" ? "FEEDS REGISTERED POST · NO NEW POST" : spaces.decision === "optional" ? "OPTIONAL PORTFOLIO EVIDENCE" : "IN-CLASS EVIDENCE"}</small><p>{spaces.teacherPrompt}</p>{spaces.activityPrompt && <p><b>Activity-specific evidence:</b> {spaces.activityPrompt}</p>}</div></section>
            <section className="social-resource-cards"><small>PURPOSEFUL SOURCES</small>{selected.resources.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><span>↗</span><div><small>{resource.gradeFit} · {resource.source}</small><strong>{resource.label}</strong><p>{resource.purpose}</p></div></a>)}</section>
          </div>
        </details>
      </article>
    </div>
  );
}

function SocialAssessment({ onLesson }: { onLesson: (id: string) => void }) {
  const civic = unit2SocialLessons.find(({ id }) => id === "civic-decision-brief") ?? unit2SocialLessons[0];
  const expert = unit4SocialLessons[3];
  const highlights = [
    { lesson: civic, unit: "UNIT 2", title: "Civic decision brief", note: "One team artifact or link + one short individual reflection", assess: ["Correct jurisdiction and power map", "Specific rights evidence and affected perspectives", "Options, consequences, safeguards, and review", "Evidence-led recommendation with a serious limit"] },
    { lesson: expert, unit: "UNIT 4", title: "Expert-team teaching experience", note: "One revised team experience + one short individual reflection", assess: ["Explains significance, change, systems, and power accurately", "Uses varied evidence and evaluates real responses", "Makes classmates think, decide, create, or respond", "Shows individual contribution and evidence-led revision"] },
  ];
  return <div className="social-program"><section className="social-heading"><div><p className="section-kicker">LEAN SPACES EDU EVIDENCE PLAN</p><h2>Enjoyable practice first. Save only the strongest evidence.</h2><p>Most games, movement tasks, shared boards, source talks, and prototypes receive live feedback and stay in the room. These two unit highlights are the required Social Studies posts in the current November–February pathway.</p></div><span>2 REQUIRED UNIT HIGHLIGHTS</span></section><div className="social-assessment-highlights">{highlights.map(({ lesson, unit, title, note, assess }) => <article key={lesson.id}><small>{unit} · {lesson.evidenceLevel.toUpperCase()} · SAVE TO SPACES</small><h3>{title}</h3><p>{lesson.question}</p><div>{assess.map((item) => <span key={item}>✓ {item}</span>)}</div><footer><strong>{note}</strong><button onClick={() => onLesson(lesson.id)}>Open experience →</button></footer></article>)}</div><section className="social-rubric"><article><span>EMERGING</span><p>Names parts of the issue but needs support to connect evidence, systems, power, and effects.</p></article><article><span>DEVELOPING</span><p>Uses relevant evidence and perspectives, with some gaps in explanation, comparison, or limits.</p></article><article><span>PROFICIENT</span><p>Explains the issue accurately, evaluates evidence and responses, and makes accountable decisions.</p></article><article><span>EXTENDING</span><p>Connects systems and perspectives insightfully, anticipates consequences, and revises from strong evidence.</p></article></section><p className="assessment-polish-note"><strong>Production polish is not assessed as Social Studies understanding.</strong> Communication, collaboration, ADST, and Arts evidence can be assessed separately when appropriate.</p></div>;
}

function SocialFinalInquiry({ onLesson }: { onLesson: (id: string) => void }) {
  return <div className="social-program"><section className="social-heading"><div><p className="section-kicker">UNIT 4 · JANUARY–FEBRUARY</p><h2>Research becomes an experience classmates can test.</h2><p>The inquiry uses one common content spine across every product choice. Teams prototype on paper, pass an accuracy conference, test with a cold audience, revise from evidence, and post only the final shared experience plus individual reflection.</p></div><span>UNDERSTAND → TEST → REVISE → TEACH</span></section><SocialInquiryOverview /><section className="final-inquiry-launch"><div><small>START THE FOUR-STUDIO PATH</small><h3>Pull a system thread before choosing a response.</h3><p>The same saved Unit 3 map travels through response comparison, prototype design, audience testing, and the expert exchange.</p></div><ol>{unit4SocialLessons.map((lesson, index) => { const decision = socialSpacesDecision(lesson); return <li key={lesson.id}><button onClick={() => onLesson(lesson.id)}><b>{index + 1}</b><span><strong>{lesson.title}</strong><small>{lesson.duration} · {decision === "required" ? "final SpacesEDU highlight" : decision === "reuse" ? "reused in the final post" : "in-class learning"}</small></span><em>Open →</em></button></li>; })}</ol></section></div>;
}

function SocialInquiryOverview({ compact = false }: { compact?: boolean }) {
  return <section className={`social-inquiry-project ${compact ? "compact" : ""}`}><header><div><small>THREAD THROUGH UNITS 1–4 · GROUPS OF {socialInquiryProject.teamSize.replace(" students", "")}</small><h2>{socialInquiryProject.title}</h2><p>{socialInquiryProject.question}</p></div><span>CHOOSE → INVESTIGATE → CREATE → TEACH → REFLECT</span></header><p className="social-inquiry-promise">{socialInquiryProject.promise}</p>{!compact && <><div className="social-inquiry-topics">{socialInquiryProject.topicFamilies.map((topic) => <article key={topic.title}><strong>{topic.title}</strong><p>{topic.examples}</p></article>)}</div><div className="social-inquiry-checkpoints">{socialInquiryProject.checkpoints.map((step, index) => <article key={step.when}><b>{String(index + 1).padStart(2, "0")}</b><div><small>{step.when}</small><strong>{step.action}</strong><p>{step.evidence}</p></div></article>)}</div><div className="social-inquiry-detail"><article><h3>Possible teaching products</h3>{socialInquiryProject.productChoices.map((item) => <p key={item}>• {item}</p>)}</article><article><h3>Non-negotiables</h3>{socialInquiryProject.requirements.map((item) => <p key={item}>✓ {item}</p>)}</article><article><h3>Individual SpacesEDU reflection</h3>{socialInquiryProject.reflection.map((item) => <p key={item}>→ {item}</p>)}</article></div></>}</section>;
}

function SocialPacing() {
  return <div className="social-program"><section className="social-heading"><div><p className="section-kicker">DATED 2026–27 FLEXIBLE ARC</p><h2>Supported cases become independent inquiry.</h2><p>The route respects the Sept. 8 opening, the live Surrey election, winter break, February closures, presentation time, and the transition into Science. Flex blocks remain available for reteaching, current opportunities, conferences, and revision.</p></div><span>≈ 3 BLOCKS / WEEK</span></section><SurreyElectionPacing /><div className="social-pacing-list">{socialPacing.map((item, index) => <article key={item[0]}><span>{index + 1}</span><div><small>{item[0]}</small><h3>{item[1]}</h3><p>{item[2]}</p></div></article>)}</div></div>;
}

function SocialResources() {
  const resources = socialLessons.flatMap((lesson) => lesson.resources.map((resource) => ({ ...resource, lesson: lesson.title })));
  return <div className="social-program"><section className="social-heading"><div><p className="section-kicker">PURPOSEFUL SOURCES · RECHECK BEFORE TEACHING</p><h2>Every link has a named job.</h2><p>Sources are labelled for intended Grade 6 use, but live pages can move or change. Reopen each assigned source, save the needed excerpt or screenshot, and prepare an offline route before class. Teacher-preview items are not assigned without adaptation.</p></div><span>{resources.length} UNIT 1–4 LINKS</span></section><div className="social-resource-index">{resources.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={`${resource.lesson}-${resource.url}`}><small>{resource.gradeFit} · {resource.lesson}</small><strong>{resource.label}</strong><p>{resource.purpose}</p><b>{resource.source} ↗</b></a>)}</div></div>;
}

function SocialStudentLesson({ lesson, scene, onScene }: { lesson: SocialLesson; scene: number; onScene: (scene: number) => void }) {
  const current = lesson.scenes[scene];
  const copy = studentLessonCopy[lesson.id];
  const studentScene = copy?.scenes[scene];
  const studentResources = lesson.id === "maps-make-arguments" ? [] : lesson.resources.filter((resource) => resource.gradeFit !== "Teacher preview");
  const spaces = socialSpacesDisplay(lesson);
  const contract = isReviewedStudentLessonId(lesson.id) ? resolveStudentLessonContract(lesson.id) : null;
  return (
    <article className="social-student-lesson" id="social-mission">
        <div className={`social-scene-layout social-scene-layout--lean ${lesson.id === "rights-in-tension" ? "civic-scene-navigation" : ""}`}><nav aria-label={`${lesson.title} parts`}>{lesson.scenes.map((item, index) => <button type="button" key={item.title} className={scene === index ? "selected" : ""} aria-current={scene === index ? "step" : undefined} onClick={() => onScene(index)}><b>{index + 1}</b><span><small>PART {index + 1}</small><strong>{copy?.scenes[index]?.title ?? item.title}</strong></span></button>)}</nav>{lesson.id !== "rights-in-tension" && <section className="social-scene-action"><small>DO</small><strong>{studentScene?.action ?? current.prompt}</strong><span><b>READY WHEN</b>{studentScene?.product ?? current.studentTask}</span></section>}</div>
        <SocialStudentLab lessonId={lesson.id} scene={scene} />
        <details className="social-help-drawer"><summary><span><small>HELP</small><strong>Words, sources, and finish check</strong></span><b>Open ▾</b></summary><div><section><small>FINISH</small>{(contract?.finishEvidence ?? copy?.success ?? lesson.success).slice(0, 2).map((item) => <p key={item}>✓ {item}</p>)}{(spaces.decision === "required" || spaces.decision === "reuse") && <p><b>SpacesEDU:</b> {contract?.saveAction.message ?? spaces.studentPrompt}</p>}</section><section className="social-help-words">{lesson.vocabulary.map((word) => <details key={word}><summary>{word}<span>＋</span></summary><p>{socialWordHelp[word.toLowerCase()]}</p></details>)}</section>{studentResources.length > 0 && <section className="social-resource-cards">{studentResources.map((resource) => <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}><span>↗</span><div><small>{resource.source}</small><strong>{resource.label}</strong></div></a>)}</section>}</div></details>
    </article>
  );
}

function Unit1ClassroomMove({ lessonId, scene, student = false }: { lessonId: string; scene: number; student?: boolean }) {
  const moves: Record<string, Array<{ launch: string; investigate: string; evidence: string; place: string }>> = {
    "maps-make-arguments": [
      { launch: "Open each real map on the class projector, one at a time.", investigate: "Students point to one visible detail and decide what kind of information the mapmaker made easy to see.", evidence: "Collect one detail and one question per map aloud, on the whiteboard, or on paper.", place: "One projector · whole-class noticing · no copies or student devices" },
      { launch: "Return to the three map choices on the shared screen.", investigate: "Use the creator, title, legend, and labels to work out what job each map was designed to do.", evidence: "Complete one shared sentence for each map: ‘This map helps people… but it cannot tell us…’", place: "Projector comparison · turn-and-talk · class whiteboard" },
      { launch: "Bring one visible detail from each projected source into the on-screen comparison.", investigate: "Connect details that reveal different parts of Fleetwood rather than choosing one map as the whole truth.", evidence: "Say or record one careful class claim and one kind of knowledge still missing.", place: "Projector evidence conference · board or paper backup" },
      { launch: "Choose one Fleetwood question from the shared screen.", investigate: "Explain what each map adds, what each leaves out, and why several perspectives help answer the question.", evidence: "Share the explanation aloud, build it together on the board, or make a short paper response.", place: "Whole-class model · oral, board, or paper response" },
    ],
    "trace-the-claim": [
      { launch: "Receive a realistic social post with the account name and source link hidden.", investigate: "Mark the words, numbers, and image choices that create urgency before judging truth.", evidence: "Record what the post claims, what it only implies, and what information is missing.", place: "Printed post · highlighters · table talk" },
      { launch: "Project one Two Lies and a Truth round at a time.", investigate: "Students show A/B/C for the truth, then say which word, number, or visible detail makes it believable before the reveal.", evidence: "Listen for reasons that point to the source instead of saying only that a statement sounds right.", place: "12–15 minute whole-class game · no handout · no student devices" },
      { launch: "Leave the repost and trace the number back through a news summary to its origin.", investigate: "Compare boundary, date range, creator, purpose, and what the original chart actually measures.", evidence: "Annotate the moment where the viral wording becomes too broad.", place: "Source packet · partner provenance audit" },
    ],
    "perspective-without-guessing": [
      { launch: "Study the clearly labelled generated school-street scene and list only details students can point to.", investigate: "Separate visible detail from inference, read the fictional proposal, and make one private first choice.", evidence: "Record one observation, an initial choice and reason, and evidence still needed before deciding well.", place: "Projected practice scene · notebook · private first response" },
      { launch: "Read short stakeholder cards based on observable circumstances—not invented feelings.", investigate: "Sort each statement into evidence, reasonable inference, or unknown.", evidence: "Underline the exact detail supporting every inference and keep an ‘unknowns we need to ask about’ list.", place: "Stakeholder stations · three-column sort" },
      { launch: "A planning constraint changes midway through the discussion.", investigate: "Move physically toward the option that now deserves investigation, then explain the evidence—not a personal preference.", evidence: "Track who gains, who carries costs, and whose voice is missing after the change.", place: "Four-corners simulation · impact tracker" },
      { launch: "Represent one evidence-based concern in a listening circle without inventing how a stakeholder feels or would vote.", investigate: "Paraphrase another group accurately, ask a genuine question, and revise one part of the recommendation.", evidence: "Show the before-and-after safeguard, the evidence that motivated it, and one tension that remains.", place: "Listening circle · design revision · gallery feedback" },
    ],
    "fleetwood-case-file": [
      { launch: "Begin with a place students can point to and a decision a real public body could make.", investigate: "Narrow broad concerns into a question with a location, decision-maker, and affected people.", evidence: "Post a focused case question that can be investigated with available sources.", place: "Large Fleetwood map · question clinic" },
      { launch: "Rotate through a map/plan, community voice, and independent evidence station.", investigate: "Record what each source contributes, why it exists, and where it is limited.", evidence: "Build a three-source case board rather than a list of links.", place: "Source stations · case-board assembly" },
      { launch: "Teams receive consequence cards after choosing an initial option.", investigate: "Place short- and long-term, intended and unintended effects around the proposal.", evidence: "Revise or qualify the option after the consequence walk.", place: "Consequence walk · stakeholder feedback" },
      { launch: "Present the recommendation to a mock community review panel.", investigate: "Panel members challenge evidence, missing voices, jurisdiction, and safeguards.", evidence: "Submit the revised one-page case file plus one individual reflection sentence.", place: "Civic panel · public display · SpacesEDU reflection" },
      { launch: "Move from the group case file to quiet individual thinking.", investigate: "Name one piece of evidence that changed your thinking, one contribution you made, and one question that remains.", evidence: "Post a short individual reflection that shows your own learning rather than repeating the team recommendation.", place: "Quiet reflection · notebook or SpacesEDU" },
    ],
  };
  const move = moves[lessonId]?.[scene] ?? moves[lessonId]?.[0];
  if (!move) return null;
  if (student) {
    const copy = studentLessonCopy[lessonId]?.scenes[scene];
    return <section className="unit1-classroom-move"><header><small>GET READY TO WORK TOGETHER</small><h3>The screen gives the steps. The real learning happens with your group.</h3><p>Your teacher will explain the materials, places, and group roles.</p></header><div><article><b>1</b><span><small>GET READY</small><strong>Listen for the setup. Ask if any direction is unclear.</strong></span></article><article><b>2</b><span><small>DO THE WORK</small><strong>{copy?.action ?? "Use the evidence to complete today’s investigation."}</strong></span></article><article><b>3</b><span><small>SHOW YOUR THINKING</small><strong>{copy?.product ?? "Share what your evidence helped you understand."}</strong></span></article></div></section>;
  }
  return <section className="unit1-classroom-move"><header><small>THE SCREEN IS THE LAUNCHPAD</small><h3>Today’s inquiry happens in the room and in the place.</h3><p>{move.place}</p></header><div><article><b>1</b><span><small>ENCOUNTER</small><strong>{move.launch}</strong></span></article><article><b>2</b><span><small>INVESTIGATE</small><strong>{move.investigate}</strong></span></article><article><b>3</b><span><small>MAKE THINKING VISIBLE</small><strong>{move.evidence}</strong></span></article></div></section>;
}

export function SocialStudentLab({ lessonId, scene, audience = "student" }: { lessonId: string; scene: number; audience?: "teacher" | "student" }) {
  if (lessonId === "maps-make-arguments") return <MapLensLab scene={scene} audience={audience} />;
  if (lessonId === "trace-the-claim") return <ClaimTrailLab scene={scene} />;
  if (lessonId === "perspective-without-guessing") return <PerspectiveSimulator scene={scene} />;
  if (lessonId === "fleetwood-case-file") return <CaseFileStudio scene={scene} />;
  if (lessonId === "power-in-the-room") return <PowerRoomLab scene={scene} audience={audience} />;
  if (lessonId === "compare-government-systems") return <GovernmentSystemsLab scene={scene} audience={audience} />;
  if (lessonId === "rights-in-tension") return <CivicCaseWorkbench sceneIndex={scene} audience={audience} />;
  if (lessonId === "civic-decision-brief") return <CivicDecisionBriefLab scene={scene} audience={audience} />;
  if (lessonId === "city-moves") return <CityMovesLab sceneIndex={scene} audience={audience} />;
  if (lessonId === "data-skyline") return <DataSkylineLab sceneIndex={scene} audience={audience} />;
  if (lessonId === "supply-chain-shockwave") return <SupplyChainLab sceneIndex={scene} audience={audience} />;
  if (lessonId === "cooperation-control-room") return <CooperationControlRoomLab sceneIndex={scene} audience={audience} />;
  if (lessonId === "pull-the-system-thread") return <SystemThreadLab sceneIndex={scene} audience={audience} />;
  if (lessonId === "responses-under-pressure") return <ResponsesUnderPressureLab sceneIndex={scene} audience={audience} />;
  if (lessonId === "make-it-teachable") return <MakeItTeachableLab sceneIndex={scene} audience={audience} />;
  if (lessonId === "expert-exchange") return <ExpertExchangeLab sceneIndex={scene} audience={audience} />;
  return <SocialChecklistLab lessonId={lessonId} scene={scene} />;
}

function SocialChecklistLab({ lessonId, scene }: { lessonId: string; scene: number }) {
  const [choices, setChoices] = useState<Record<string, boolean>>({});
  const toggle = (label: string) => setChoices((current) => ({ ...current, [label]: !current[label] }));
  const configs: Record<string, string[][]> = {
    "maps-make-arguments": scene === 0 ? [["Observation", "The map uses a thick blue line beside Fraser Highway."], ["Inference", "The maker thinks transit is more important than parks."], ["Question", "What time period does this map represent?"]] : scene === 1 ? [["Creator", "Who made or published it?"], ["Purpose", "What action is it designed to support?"], ["Visible", "What does the legend make easy to notice?"], ["Missing", "What would require another source?"]] : scene === 2 ? [["Street map", "Routes and named locations"], ["First Peoples’ map", "Languages, communities, and place knowledge"], ["Planning map", "Proposed growth and public decisions"]] : [["Audience", "I named who will use this map."], ["Purpose", "I named the decision it supports."], ["Evidence", "I cited the source of my information."], ["Limit", "I stated one important omission."]],
    "trace-the-claim": scene === 0 ? [["Emotional pull", "The post pushes urgency or outrage."], ["Missing origin", "No original report or data is linked."], ["Context gap", "The image, date, or number may be incomplete."]] : scene === 1 ? [["Check", "Look for an existing fact-check."], ["Find", "Trace the claim to the original."], ["Verify", "Investigate who is behind the source."], ["Compare", "Check independent sources."]] : scene === 2 ? [["Origin", "Original creator and publication date"], ["Evidence", "What the original actually supports"], ["Corroboration", "Independent reporting or data"], ["Context", "What the viral version omitted"]] : [["Supported", "Several relevant independent sources agree."], ["Contradicted", "Reliable evidence directly conflicts."], ["Uncertain", "The available evidence cannot settle it yet."]],
    "perspective-without-guessing": scene < 2 ? [["Evidence", "What the person or source actually states"], ["Inference", "A possible priority supported by evidence"], ["Unknown", "What we cannot responsibly claim"]] : [["Benefit", "Who gains access, safety, time, space, or opportunity?"], ["Cost", "Who gives up money, access, time, space, or security?"], ["Missing voice", "Who is affected but not represented?"], ["Revision", "What change would reduce harm?"]],
    "fleetwood-case-file": scene === 0 ? [["Place", "The geographic area is clear."], ["Decision", "The choice or issue is specific."], ["People", "Affected stakeholders are named."], ["Possible evidence", "Sources exist to investigate it."]] : scene === 1 ? [["Different work", "Each source adds a different kind of evidence."], ["Creator/date", "Source details are recorded."], ["Purpose", "Why it was created is considered."], ["Limit", "A weakness or gap is named."]] : scene === 2 ? [["Short term", "Immediate benefits and costs"], ["Long term", "Possible future consequences"], ["Intended", "What the option is meant to change"], ["Unintended", "What else might happen"]] : [["Claim", "A clear, qualified recommendation"], ["Evidence", "Specific support from several sources"], ["Perspective", "Affected people represented carefully"], ["Limit", "Uncertainty is visible"], ["Reflection", "Individual thinking and contribution"]],
    "power-in-the-room": scene === 0 ? [["Decide", "Who can make the final choice?"], ["Influence", "Who can shape what others choose?"], ["Benefit", "Who is likely to gain?"], ["Cost", "Who carries the consequences?"]] : scene === 1 ? [["Authority", "Power granted by a role or rule"], ["Information", "Access to facts others do not have"], ["Resources", "Control of time, money, space, or materials"], ["Voice", "Ability to be heard and taken seriously"]] : scene === 2 ? [["Voice", "Affected people can participate"], ["Reasons", "The decision is explained"], ["Review", "The decision can be challenged"], ["Accountability", "Decision-makers answer for impacts"]] : [["Rule changed", "A specific process feature is different"], ["Power shifted", "Who gained or lost influence?"], ["Outcome", "What changed in the result?"], ["Limit", "What remains unfair or uncertain?"]],
    "compare-government-systems": scene === 0 ? [["Decision-maker", "Who is authorized to act?"], ["Speed", "Where might action move quickly or slowly?"], ["Voice", "Who participates before the decision?"], ["Challenge", "Who can question or reverse it?"]] : scene === 1 ? [["Proposal", "How does an idea enter the system?"], ["Decision", "Who approves it?"], ["Implementation", "Who carries it out?"], ["Review", "Who checks or challenges it?"]] : [["Participation", "How people have a voice"], ["Transparency", "How decisions and reasons become visible"], ["Rights", "How people are protected"], ["Correction", "How errors or abuses can be challenged"]],
    "civic-decision-brief": scene === 0 ? [["Decision", "What exact public choice is being made?"], ["Jurisdiction", "Which level or institution can act?"], ["People", "Who is affected?"], ["Rights", "Which protections or freedoms may matter?"]] : scene === 1 ? [["Authority", "Who has formal decision-making power?"], ["Influence", "Who shapes the decision?"], ["Rights evidence", "Which source clarifies protections?"], ["Missing voice", "Who is affected but not represented?"]] : scene === 2 ? [["Effectiveness", "Could the option meet its purpose?"], ["Rights impact", "Who is protected or restricted?"], ["Consequence", "What else could happen?"], ["Safeguard", "What check reduces harm?"]] : [["Recommendation", "A clear and qualified next step"], ["Accountability", "Who acts and reports back?"], ["Review", "How can the decision be challenged?"], ["Participation", "How can people respond responsibly?"], ["Limit", "What remains uncertain?"]],
  };
  const items = configs[lessonId] ?? [];
  const count = items.filter(([label]) => choices[`${lessonId}-${scene}-${label}`]).length;
  const toolTitle = lessonId === "maps-make-arguments" ? "Interrogate the map" : lessonId === "trace-the-claim" ? "Build the evidence trail" : lessonId === "perspective-without-guessing" ? "Separate evidence from assumption" : lessonId === "power-in-the-room" ? "Map the power" : lessonId === "compare-government-systems" ? "Trace the decision system" : lessonId === "civic-decision-brief" ? "Audit the civic brief" : "Audit the case file";
  return <section className="social-student-lab social-checklist-lab"><header><small>THINK IT THROUGH</small><h3>{toolTitle}</h3><p>Use these choices to help your group talk and plan. Record your real evidence in your notebook or project.</p></header><div className="social-checklist-grid">{items.map(([label, detail]) => { const key = `${lessonId}-${scene}-${label}`; return <button key={key} className={choices[key] ? "checked" : ""} onClick={() => toggle(key)}><b>{choices[key] ? "✓" : "?"}</b><span><strong>{label}</strong><small>{detail}</small></span></button>; })}</div><footer><strong>{count} of {items.length} considered</strong><span>A checked box is not proof. Be ready to point to the source or explain your reason.</span></footer></section>;
}

function LabFrame({ eyebrow, title, prompt, children, footer, className = "" }: { eyebrow: string; title: string; prompt: string; children: React.ReactNode; footer?: string; className?: string }) {
  return <section className={`social-student-lab social-deep-lab ${className}`.trim()}><header><small>{eyebrow}</small><h3>{title}</h3><p>{prompt}</p></header>{children}{footer && <footer><strong>TALK IT THROUGH</strong><span>{footer}</span></footer>}</section>;
}

function MapLensLab({ scene, audience = "student" }: { scene: number; audience?: "teacher" | "student" }) {
  const maps = [
    {
      name: "Surrey COSMOS",
      shortName: "City map",
      tag: "WHAT IS HERE NOW?",
      source: "City of Surrey",
      url: "https://cosmos.surrey.ca/external/cosmosmobile/new/",
      job: "Help people locate roads, parks, schools, parcels, and City services.",
      choices: ["roads", "parks", "schools", "city data"],
      classPrompt: "What feature can you point to? What could this map help someone find?",
      limit: "It cannot show how every person experiences the place, what they remember, or all the relationships connected to it.",
    },
    {
      name: "First Peoples’ Map of B.C.",
      shortName: "Language + place map",
      tag: "LIVING LANGUAGES & PLACE",
      source: "First Peoples’ Cultural Council",
      url: "https://maps.fpcc.ca/",
      job: "Share languages, communities, place names, and knowledge contributed by participating communities.",
      choices: ["languages", "communities", "place names", "shared audio"],
      classPrompt: "What language, community, or place-name information is shared? Who provided that information?",
      limit: "Language regions are not borders or property lines. The map cannot replace learning from the Nations and communities represented.",
    },
    {
      name: "Fleetwood Plan",
      shortName: "Future planning map",
      tag: "WHAT IS BEING BUILT—AND WHAT COMES LATER?",
      source: "City of Surrey",
      url: "https://fleetwoodplan.surrey.ca/",
      job: "Help people examine how growth, future SkyTrain stations, land use, and public spaces connect.",
      choices: ["growth areas", "future stations", "land use", "public spaces"],
      classPrompt: "What construction can people notice in Fleetwood now? What part of the map describes a future change?",
      limit: "Guideway and station construction is happening now, but trains are not serving the extension yet. A future plan cannot predict every result or include every affected perspective.",
    },
  ] as const;
  const focusQuestions = [
    "What makes Fleetwood more than roads and buildings?",
    "What should people understand before Fleetwood changes?",
    "Whose knowledge is needed before making a decision about this place?",
  ];
  const [active, setActive] = useState(0);
  const [evidence, setEvidence] = useState([false, false, false]);
  const [focus, setFocus] = useState(0);
  const selected = maps[active];
  const sourceAction = audience === "teacher" ? "Open official source" : "Teacher: open on projector";

  if (scene === 0 || scene === 1) {
    const title = scene === 0 ? "Three maps. One Fleetwood. Different choices." : "What job is each map doing?";
    const prompt = scene === 0
      ? "Use one class screen. Choose a map, look together, and name only details everyone can point to before explaining what they might mean."
      : "Mapmakers cannot include everything. Look at the creator and the information selected, then decide what each map helps people do.";
    return (
      <LabFrame className="map-perspective-lab" eyebrow="ONE PROJECTOR · WHOLE CLASS" title={title} prompt={prompt} footer="If this were the only map we used, what might we miss or misunderstand?">
        <section className="map-big-idea">
          <b>THE POINT OF TODAY&apos;S LESSON</b>
          <p>Maps are not just pictures of places. <strong>Mapmakers choose what to show</strong> so the map can do a particular job. Different choices create different views of the same place.</p>
        </section>

        <nav className="map-perspective-tabs" aria-label="Choose one of three Fleetwood map sources">
          {maps.map((map, index) => (
            <button type="button" key={map.name} aria-pressed={active === index} onClick={() => setActive(index)}>
              <b>{index + 1}</b>
              <span><small>{map.tag}</small><strong>{map.shortName}</strong></span>
              <em>{active === index ? "ON SCREEN" : "CHOOSE"}</em>
            </button>
          ))}
        </nav>

        <article className="map-perspective-stage" data-map={active}>
          <header>
            <div><small>{selected.tag}</small><h4>{selected.name}</h4><p>Created or published by {selected.source}</p></div>
            <a href={selected.url} target="_blank" rel="noreferrer"><span aria-hidden="true">↗</span><strong>{sourceAction}</strong><small>One class screen · no student login</small></a>
          </header>
          <section className="map-choice-picture" aria-label={`Information emphasized by ${selected.name}`}>
            <div><small>THIS MAP CHOOSES TO EMPHASIZE</small><strong>{selected.choices.map((choice) => <span key={choice}>{choice}</span>)}</strong></div>
            <aside><b>THE MAP&apos;S JOB</b><p>{selected.job}</p></aside>
          </section>
          <footer>
            <article><b>LOOK + POINT</b><p>{selected.classPrompt}</p></article>
            <article><b>IT CANNOT ANSWER EVERYTHING</b><p>{selected.limit}</p></article>
          </footer>
        </article>

        {active === 2 && <aside className="skytrain-now-later" aria-label="Surrey Langley SkyTrain now and later"><header><small>LOCAL CHANGE STUDENTS CAN SEE</small><h4>SkyTrain: separate now from later</h4></header><div><article><b>HAPPENING NOW · AUGUST 2026</b><p>Elevated guideway and station construction is underway, including work through Fleetwood.</p></article><article><b>PLANNED FOR LATER</b><p>Passenger trains are not running on the extension yet. The official project site currently anticipates service in late 2029; that date can change.</p></article></div><a href="https://surreylangleyskytrain.gov.bc.ca/current-work/" target="_blank" rel="noreferrer">Check today&apos;s official construction updates ↗</a></aside>}

        <section className="map-response-route" aria-label="Ways students can respond">
          <div><small>EVERYONE CAN JOIN IN</small><strong>Choose the easiest response route for this moment.</strong></div>
          <span><b>Say it</b> aloud</span><span><b>Add it</b> to the board</span><span><b>Sketch it</b> on paper</span>
        </section>
      </LabFrame>
    );
  }

  if (scene === 2) {
    return (
      <LabFrame className="map-perspective-lab" eyebrow="CLASS EVIDENCE CONFERENCE" title="What can all three maps show us together?" prompt="Bring one detail from each projected source. The teacher taps READY after the class can point to evidence—not just give a guess." footer="Finish aloud: Together, these maps suggest… But they still cannot tell us…">
        <section className="map-big-idea map-big-idea--compare"><b>WHY USE THREE?</b><p>One map shows city features, one shares living language and place information, and one shows proposed change. <strong>Using them together gives a fuller view—but still not the whole story.</strong></p></section>
        <div className="source-evidence-grid map-compare-grid">
          {maps.map((map, index) => (
            <article key={map.name} className={evidence[index] ? "ready" : ""}>
              <small>MAP {index + 1} · {map.tag}</small>
              <h4>{map.shortName}</h4>
              <p><b>Class brings:</b> one visible detail and what this map helps people understand or do.</p>
              <button type="button" aria-pressed={evidence[index]} className="evidence-ready-button" onClick={() => setEvidence((current) => current.map((value, i) => i === index ? !value : value))}>
                <span aria-hidden="true">{evidence[index] ? "✓" : index + 1}</span><strong>{evidence[index] ? "Class evidence ready" : "Tap when class is ready"}</strong>
              </button>
            </article>
          ))}
        </div>
        <div className="source-synthesis map-class-synthesis">
          <small>BUILD ONE CLASS STATEMENT · SAY IT, BOARD IT, OR COPY IT ON PAPER</small>
          <p><b>What we can say:</b> These maps together show that Fleetwood…</p>
          <p><b>Evidence:</b> The city map shows…, the language and place map adds…, and the future plan shows…</p>
          <p><b>What is still missing:</b> We still need to learn from… because…</p>
        </div>
      </LabFrame>
    );
  }

  return (
    <LabFrame className="map-perspective-lab" eyebrow="SHARED FLEETWOOD EXPLANATION" title="Teach what the mapmakers chose." prompt="Choose one question. Use the three map lenses on this screen to build a short explanation aloud, together on the board, or individually on paper." footer="Final check: Did we explain what each map adds, what remains missing, and why several perspectives matter?">
      <div className="place-question-grid map-question-choices" aria-label="Choose a Fleetwood inquiry question">
        {focusQuestions.map((question, index) => (
          <button type="button" key={question} aria-pressed={focus === index} className={focus === index ? "selected" : ""} onClick={() => setFocus(index)}>
            <span>QUESTION {index + 1}</span><strong>{question}</strong><b>{focus === index ? "CHOSEN ✓" : "CHOOSE"}</b>
          </button>
        ))}
      </div>
      <div className="place-claim-brief map-shared-explanation">
        <header><small>OUR QUESTION</small><h4>{focusQuestions[focus]}</h4><p>The three boxes below are speaking prompts, not extra worksheets.</p></header>
        <div>
          <article><b>1 · WHAT EACH MAP ADDS</b><p>The city map adds… The language and place map adds… The future plan adds…</p></article>
          <article><b>2 · WHAT WE CAN EXPLAIN</b><p>When we use the three together, we can say… because the maps show…</p></article>
          <article><b>3 · WHAT IS STILL MISSING</b><p>The maps cannot tell us… We would also need to learn from…</p></article>
        </div>
        <footer><b>CHOOSE A RESPONSE</b><span>Speak for 30 seconds, help build the class answer on the board, or write/sketch a short answer on plain paper.</span></footer>
      </div>
    </LabFrame>
  );
}

function ClaimTrailLab({ scene }: { scene: number }) {
  const [step, setStep] = useState(0);
  const [xray, setXray] = useState([false, false, false]);
  const [gameRound, setGameRound] = useState(0);
  const [gameChoice, setGameChoice] = useState<number | null>(null);
  const [gameRevealed, setGameRevealed] = useState(false);
  const trail = [
    { label: "Cropped group-chat post", evidence: "‘All field trips are cancelled for the rest of the year!’ The cropped post hides the sender, date, and original message.", strength: "Attention—not evidence" },
    { label: "School update", evidence: "Says one museum trip is postponed because buses are unavailable on the original date.", strength: "Original announcement" },
    { label: "Class calendar", evidence: "Marks the trip ‘new date coming’ rather than cancelled.", strength: "Specific evidence with context" },
    { label: "New permission form", evidence: "Names the same museum trip and gives a new date two weeks later.", strength: "Independent confirmation" },
  ];
  if (scene === 0) {
    const clueCount = xray.filter(Boolean).length;
    const clues = [
      ["Look at the words", "FOREVER, the alarm emoji, and ‘share this now’ are trying to make you react fast."],
      ["Follow the source", "‘My friend heard’ is far away from the person who made the decision."],
      ["Find the missing proof", "There is no name, date, school update, calendar, or link to check."],
    ];
    return <LabFrame className="claim-xray-lab" eyebrow="CLAIM X-RAY" title="Pause before you share." prompt="This cropped group-chat post is designed to make you react fast. Tap each detective lens, then decide what you would check first."><article className="claim-post student-rumour-post" aria-label="Fictional cropped group-chat post for practice"><div className="rumour-post-meta"><small>FICTIONAL EXAMPLE · FOR PRACTICE</small><span>GROUP CHAT</span></div><strong>🚨 ALL field trips are cancelled for the rest of the year!</strong><p>“My friend heard it from someone. Share this now before the school deletes it!”</p><em>237 reactions · sender, date, and original message cropped out</em></article><div className="claim-xray-grid" aria-label="Three clues to inspect">{clues.map(([label, detail], index) => <button key={label} aria-pressed={xray[index]} className={xray[index] ? "selected" : ""} onClick={() => setXray((current) => current.map((value, i) => i === index ? !value : value))}><b>{xray[index] ? "✓" : index + 1}</b><span><strong>{label}</strong><small>{xray[index] ? detail : "Tap to inspect this clue."}</small></span></button>)}</div><div className="claim-pause-meter" role="status" aria-live="polite"><span>{clueCount} of 3 clues checked</span><strong>{clueCount === 3 ? "Good pause. Find the full source next. ✓" : "Inspect every clue before sharing."}</strong></div><div className="leave-screen-callout"><b>TURN AND TALK</b><span>What would you check first? How could you slow the rumour without embarrassing the person who shared it?</span></div></LabFrame>;
  }
  if (scene === 1) {
    const rounds = [
      {
        visual: "POLL",
        title: "The indoor lunch poll",
        source: "FICTIONAL GRADE 6 CLASS POLL",
        skill: "Keep the group the same",
        excerpt: "After outdoor play, 19 of 26 students in one Grade 6 class answered a quick poll about indoor eating time. Twelve chose low music, five chose quiet, and two chose table talk. Seven students did not answer.",
        claims: ["Most Grade 6 students at the school want music while they eat.", "Of the 19 students who answered, low music received the most votes.", "The poll proves low music helps students eat more calmly."],
        supported: 1,
        proof: "Twelve of the 19 students who answered chose low music; five chose quiet and two chose table talk.",
        why: "B stays with the one class and the students who answered. A turns one class poll into a claim about the whole school. C claims the poll measured calm eating, but it only measured a choice.",
      },
      {
        visual: "COUNT",
        title: "Where students played",
        source: "FICTIONAL THREE-DAY OBSERVATION",
        skill: "Separate a count from a reason",
        excerpt: "During the first 10 minutes of lunch on three dry days, observers counted an average of 28 students on the field, 17 on the blacktop, and 9 under the covered area. A soccer game was running on one of the days.",
        claims: ["The field had the highest average count during these observations.", "The field is every student’s favourite place to play.", "Soccer caused more students to go outside at lunch."],
        supported: 0,
        proof: "The average counts were 28 on the field, 17 on the blacktop, and 9 under cover.",
        why: "A reports exactly what was counted. B changes a three-day count into everyone’s favourite. C names a cause even though the observation did not test why students chose a space.",
      },
      {
        visual: "DRAFT",
        title: "The Fleetwood park draft",
        source: "FICTIONAL FLEETWOOD PLANNING DRAFT",
        skill: "Separate an idea from a decision",
        excerpt: "Draft concept: possible features include more trees, seating, a walking path, and a small sports court. Funding and the final design have not been approved.",
        claims: ["The sports court will definitely be built.", "The draft includes a small sports court as one possible feature.", "Fleetwood residents chose the sports court as their top priority."],
        supported: 1,
        proof: "The source calls it a ‘draft,’ lists ‘possible features,’ and says the final design is not approved.",
        why: "B keeps the careful words from the draft. A turns a possible feature into a promise. C invents a community vote that the source never mentions.",
      },
    ];
    const round = rounds[gameRound];
    const chooseRound = (index: number) => { setGameRound(index); setGameChoice(null); setGameRevealed(false); };
    const fullyCorrect = gameChoice === round.supported;
    const checkRound = () => setGameRevealed(true);
    const nextRound = () => chooseRound((gameRound + 1) % rounds.length);
    return <LabFrame eyebrow="TWO LIES AND A TRUTH" title="Which one is the truth?" prompt="Two statements go beyond the source. One matches it. Vote A, B, or C, then explain what makes your choice believable." footer="Believable does not mean ‘sounds confident.’ A strong reason points to something you can actually see, count, or read."><div className="claim-case"><header><div><small>ROUND {gameRound + 1} OF {rounds.length}</small><strong>{round.skill}</strong></div><span className="claim-case-routine">FIND THE TRUTH</span></header><article className="claim-case-source"><span className="claim-source-kind" aria-hidden="true">{round.visual}</span><div><small>{round.source}</small><h4>{round.title}</h4><p>{round.excerpt}</p></div></article><section className="claim-case-question"><small>TWO LIES · ONE TRUTH</small><h4>Which statement is true?</h4><p>Show A, B, or C. Be ready to say why.</p></section><div className="truth-claim-grid">{round.claims.map((claim, index) => { const isCorrect = gameRevealed && index === round.supported; const isIncorrectChoice = gameRevealed && gameChoice === index && index !== round.supported; return <button key={claim} aria-pressed={gameChoice === index} className={`${gameChoice === index ? "selected" : ""} ${isCorrect ? "correct-answer" : ""} ${isIncorrectChoice ? "incorrect-choice" : ""}`} onClick={() => { setGameChoice(index); setGameRevealed(false); }}><b>{String.fromCharCode(65 + index)}</b><span>{claim}</span></button>; })}</div><div className="claim-game-say-why"><b>BEFORE THE REVEAL</b><span>“I think ___ is the truth because the source shows ___.”</span></div><div className="claim-case-action"><button disabled={gameChoice === null} onClick={checkRound}>{gameChoice === null ? "Choose A, B, or C" : "Reveal the truth"}</button></div>{gameRevealed && <aside className={`truth-game-reveal ${fullyCorrect ? "correct" : "retry"}`} aria-live="polite"><small>{fullyCorrect ? "YES—YOU FOUND THE TRUTH" : "THAT ONE IS A LIE"}</small><h4>Truth: {String.fromCharCode(65 + round.supported)}</h4><p>{round.why}</p><div className="claim-proof"><small>WHAT MAKES IT BELIEVABLE</small><strong>{round.proof}</strong></div><button className="next-claim-case" onClick={nextRound}>{gameRound === rounds.length - 1 ? "Play again ↻" : "Next round →"}</button></aside>}</div><div className="leave-screen-callout"><b>WHOLE-CLASS GAME · NO WRITING</b><span>1. Read. 2. Vote A/B/C. 3. Say why. 4. Reveal the truth.</span></div></LabFrame>;
  }
  if (scene === 2) return <LabFrame eyebrow="RUMOUR TRAIL" title="Leave the cropped post. Find out what really happened." prompt="Reveal one source at a time. At every stop, decide whether the ‘all field trips are cancelled’ rumour became stronger, weaker, or more specific." footer="Evidence product: a four-stop source trail showing exactly where one postponed trip became ‘all year.’"><div className="provenance-table"><header><b>SOURCE</b><b>WHAT IT ACTUALLY ADDS</b><b>STRENGTH</b></header>{trail.map((item, index) => <button key={item.label} className={index <= step ? "revealed" : ""} onClick={() => setStep(Math.max(step, index))}><strong>{item.label}</strong><span>{index <= step ? item.evidence : "Discuss the previous clue before revealing this one."}</span><small>{index <= step ? item.strength : "CLUE LOCKED"}</small></button>)}</div><div className="source-packet-prompts"><article><b>FIRST-HAND SOURCE</b><p>Which source is closest to the person who changed the plan?</p></article><article><b>HOW MUCH?</b><p>Does the evidence describe one trip—or every trip for the whole year?</p></article><article><b>LATEST WORD</b><p>Which later source confirms what finally happened?</p></article></div></LabFrame>;
  return null;
}

function PowerRoomLab({ scene, audience }: { scene: number; audience: "teacher" | "student" }) {
  const [revealed, setRevealed] = useState(false);
  const [redesign, setRedesign] = useState("Give every role one protected turn");
  const [secondsLeft, setSecondsLeft] = useState(360);
  const [timerRunning, setTimerRunning] = useState(false);
  useEffect(() => {
    if (!timerRunning || secondsLeft <= 0) return;
    const timer = window.setInterval(() => setSecondsLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [timerRunning, secondsLeft]);
  const resetTimer = () => { setTimerRunning(false); setSecondsLeft(360); };
  const toggleTimer = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(360);
      setTimerRunning(true);
      return;
    }
    setTimerRunning((value) => !value);
  };
  const printPowerRoles = () => {
    document.body.classList.add("print-power-room-roles");
    const cleanUp = () => document.body.classList.remove("print-power-room-roles");
    window.addEventListener("afterprint", cleanUp, { once: true });
    window.print();
  };
  const clock = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;
  const timerActive = timerRunning && secondsLeft > 0;
  if (scene === 0) return <LabFrame className="unit2-power-lab" eyebrow="WHO GETS THE ROOM? · ROUND 1" title="Build one plan and notice who shapes it." prompt="The room design is not the real test. The real test is noticing how the rules give different people different kinds of power." footer="After the round, point to the exact rule, counter, hidden fact, or speaking limit that shaped the result.">
    <section className="power-purpose-card"><b>WHY ARE WE DOING THIS?</b><p>Power is not only “being the boss.” It can also mean holding most of the materials, knowing something other people need, or having your ideas taken seriously. This game lets us feel those differences safely, then change the rules.</p></section>
    <figure className="power-room-visual"><Image unoptimized src="/images/visual-review/civic-decision-room-v1.webp" width={1672} height={941} alt="Illustrated community decision room where some people hold materials or information, others are affected by the plan, and different routes exist for speaking and review" /><figcaption><small>GENERATED FICTIONAL DECISION ROOM</small><strong>Who can speak? Who is affected? Who decides? Who can ask for review?</strong></figcaption></figure>
    <ol className="power-round-steps" aria-label="Power in the Room setup steps"><li><b>1</b><span><strong>Make groups of four</strong><small>A fifth person can use the observer card. Nobody is assigned a role because of their real identity.</small></span></li><li><b>2</b><span><strong>Take one private role card</strong><small>Read only your card. Keep it face down when you finish.</small></span></li><li><b>3</b><span><strong>Get 10 counters and one paper</strong><small>Each counter is one chunk of room space or budget. Only the person holding a counter may place or move it.</small></span></li><li><b>4</b><span><strong>Build for six minutes</strong><small>Use all 10 counters. Include a learning area, active area, quiet area, gathering area, and at least one access feature.</small></span></li><li><b>5</b><span><strong>Freeze when time ends</strong><small>The Chair announces the final plan. Do not improve it yet—we need the first result for the debrief.</small></span></li></ol>
    <div className="power-room-brief"><article><small>THE GROUP CHALLENGE</small><h4>Spend all 10 counters</h4><p>Learning · movement · quiet · gathering · access</p></article><div className={`power-timer ${secondsLeft === 0 ? "finished" : ""}`} role="timer" aria-live="polite"><small>ROUND 1 TIMER</small><strong>{clock}</strong><span>{secondsLeft === 0 ? "Freeze. Chair: announce the plan." : timerActive ? "Build the room." : "Ready when the role cards are out."}</span><div><button type="button" onClick={toggleTimer}>{secondsLeft === 0 ? "Start again" : timerActive ? "Pause" : secondsLeft < 360 ? "Continue" : "Start 6 minutes"}</button><button type="button" onClick={resetTimer}>Reset</button></div></div></div>
    {audience === "teacher" && <section className="power-print-tools"><div><small>TEACHER PREP · ONE SET PER GROUP</small><strong>Four private role cards + optional observer</strong><p>Print, cut, and keep the card names hidden until the first room plan is frozen.</p></div><button type="button" onClick={printPowerRoles}>Print role cards</button></section>}
    <button type="button" className="power-reveal-button" aria-expanded={revealed} onClick={() => setRevealed((value) => !value)}>{revealed ? "Hide roles before another class plays" : "Round finished? Reveal how power was divided"}</button>
    {revealed && <div className="power-role-grid" aria-live="polite">{unit2ScenarioCards.powerRoles.map((card) => <article key={card.role}><small>{card.role} · {card.tokens} {card.tokens === 1 ? "counter" : "counters"}</small><strong>{card.power}</strong><p>{card.limit}</p></article>)}</div>}
    <section className="power-role-print-sheet" aria-label="Printable Power in the Room role cards"><header><small>POWER IN THE ROOM · CUT-APART ROLE CARDS</small><h1>One set for each group</h1><p>Give one card to each player. Use the observer only for a group of five. Students read only their own card.</p></header><div>{unit2ScenarioCards.powerRoles.map((card) => <article key={card.role}><small>PRIVATE ROLE</small><h2>{card.role}</h2><b>YOU START WITH {card.tokens} {card.tokens === 1 ? "COUNTER" : "COUNTERS"}</b><p>{card.power}</p><p><strong>Your rule:</strong> {card.limit}</p><footer>{card.privateMove}</footer></article>)}<article className="observer-card"><small>OPTIONAL FIFTH PERSON</small><h2>{unit2ScenarioCards.powerObserver.role}</h2><b>YOU DO NOT GET A COUNTER OR VOTE</b><p>{unit2ScenarioCards.powerObserver.power}</p><p><strong>Your rule:</strong> {unit2ScenarioCards.powerObserver.limit}</p><footer>Bring specific observations to the debrief—not judgments about classmates.</footer></article></div><aside><b>GROUP CHALLENGE</b><span>Use all 10 counters to plan a community room with learning, movement, quiet, gathering, and at least one access feature. Freeze after six minutes. The Chair announces the final plan.</span></aside></section>
    <div className="leave-screen-callout"><b>{audience === "teacher" ? "DEBRIEF THE RULES—NOT THE CHILDREN" : "FOLLOW THE CARD, THEN QUESTION THE RULE"}</b><span>{audience === "teacher" ? "Ask: Which rule shaped the plan? Who had power without being Chair? Who lived with a result they could not control? Students may pass or observe." : "Use your role exactly as written for Round 1. Notice what you can change, what you cannot change, and whether your group hears you."}</span></div>
  </LabFrame>;
  if (scene === 1) return <LabFrame eyebrow="POWER MAP" title="Where was the power hiding?" prompt="Use moments from the game. A person may have more than one kind of power—and someone without the final word may still shape the result." footer="Say: “The ___ had power through ___ because, during the game, ___.”"><div className="power-mechanism-grid">{["FINAL CHOICE", "MOST COUNTERS", "HIDDEN INFORMATION", "BEING HEARD", "LIVING WITH THE RESULT"].map((item, index) => <article key={item}><b>{index + 1}</b><strong>{item}</strong><p>{index === 0 ? "Who announced the plan?" : index === 1 ? "Who could place most of the room?" : index === 2 ? "Who knew a need others did not?" : index === 3 ? "Whose idea changed the plan?" : "Who had little control over a plan that affected them?"}</p></article>)}</div></LabFrame>;
  if (scene === 2) return <LabFrame eyebrow="FAIRNESS CHECK" title="Which part of the process most needs a change?" prompt="Choose the weakest check. Use one thing that actually happened in Round 1 as your proof." footer="Fair does not mean everyone gets everything. It means people can be heard, understand the choice, question it, and see who must answer for the result."><div className="fairness-radar">{["A REAL CHANCE TO SPEAK", "THE NEEDED INFORMATION", "A REASON FOR THE CHOICE", "A WAY TO QUESTION IT", "SOMEONE ANSWERS FOR THE RESULT"].map((item) => <article key={item}><strong>{item}</strong><span>{item === "A REAL CHANCE TO SPEAK" ? "Could each person share before the final call?" : item === "THE NEEDED INFORMATION" ? "Did everyone know about the hidden access need?" : item === "A REASON FOR THE CHOICE" ? "Did the Chair explain the final plan?" : item === "A WAY TO QUESTION IT" ? "Could anyone ask for a change?" : "Who had to respond if the room did not work for people?"}</span></article>)}</div><div className="leave-screen-callout"><b>CHOOSE, THEN PROVE IT</b><span>Point to one moment from the game—not just “it felt unfair.”</span></div></LabFrame>;
  const redesigns = ["Give every role one protected turn", "Share the hidden information with everyone", "Let affected roles challenge the first decision", "Move two tokens away from the resource holder"];
  return <LabFrame eyebrow="ROUND 2 · CHANGE ONE RULE" title="Play again. Did power actually move?" prompt="Choose one new rule and replay for six minutes. Compare what people could do and what the group built—not just whether the conversation felt nicer." footer="Finish: “Our new rule moved power from ___ toward ___ because ___.”"><div className="redesign-choice-grid">{redesigns.map((item) => <button key={item} className={redesign === item ? "selected" : ""} onClick={() => setRedesign(item)}>{item}</button>)}</div><section className="redesign-replay"><small>YOUR ONE NEW RULE</small><h4>{redesign}</h4><p>Reset the counters and play again for six minutes. Track one action that changed, one part of the room that changed, and one unfair part that may remain.</p><div className={`power-timer compact ${secondsLeft === 0 ? "finished" : ""}`} role="timer" aria-live="polite"><strong>{clock}</strong><span>{secondsLeft === 0 ? "Freeze and compare the two plans." : timerActive ? "Round 2 is running." : "Reset, then start Round 2."}</span><div><button type="button" onClick={toggleTimer}>{secondsLeft === 0 ? "Start again" : timerActive ? "Pause" : secondsLeft < 360 ? "Continue" : "Start 6 minutes"}</button><button type="button" onClick={resetTimer}>Reset</button></div></div></section></LabFrame>;
}

function GovernmentSystemsLab({ scene, audience }: { scene: number; audience: "teacher" | "student" }) {
  const [system, setSystem] = useState(0);
  const selected = unit2ScenarioCards.systems[system];
  if (scene === 0) return <LabFrame className="unit2-government-lab" eyebrow="WATER EMERGENCY RELAY" title="A decision cannot wait." prompt="A damaged water main has cut the community’s supply. Hospitals, homes, schools, and businesses need a plan. What information must leaders know before acting?" footer="Make a prediction, but keep one question open until you test the decision models."><figure className="water-emergency-visual"><Image unoptimized src="/images/unit2-water-emergency-v1.webp" alt="Generated fictional water emergency scene with repair crews, a water tower, essential services, and residents collecting water" width={1672} height={941} /><figcaption>GENERATED FICTIONAL COMMUNITY · NOT A REAL EMERGENCY OR PLACE</figcaption></figure><div className="water-emergency-scene"><div><small>FICTIONAL COMMUNITY · 8:10 A.M.</small><h4>Only 40% of the usual water supply is available.</h4><p>Repair time is uncertain. The hospital needs protected supply. Families need drinking water. Schools and businesses need clear instructions.</p></div><ol><li>Protect essential needs</li><li>Make a decision</li><li>Explain it publicly</li><li>Allow a way to correct mistakes</li></ol></div><div className="leave-screen-callout"><b>{audience === "teacher" ? "DO NOT REVEAL A BEST SYSTEM" : "MAKE A FIRST PREDICTION"}</b><span>Which matters first: speed, voice, clear reasons, rights, or correction? You will need all five by the end.</span></div></LabFrame>;
  if (scene === 1) return <LabFrame eyebrow="DECISION-PATH RELAY" title="Build the path before the timer ends." prompt="Choose a simplified decision model. Arrange its four steps, rotate roles, and move the water-response card from warning to review." footer="These are models for comparison—not complete descriptions of real countries."><nav className="system-model-tabs" aria-label="Choose a decision model">{unit2ScenarioCards.systems.map((item, index) => <button key={item.name} className={system === index ? "selected" : ""} onClick={() => setSystem(index)}>{item.name}</button>)}</nav><div className="decision-path"><header><small>MODEL {system + 1}</small><h4>{selected.name}</h4><p>{selected.tradeoff}</p></header><div>{selected.route.map((step, index) => <article key={step}><b>{index + 1}</b><strong>{step}</strong></article>)}</div></div></LabFrame>;
  if (scene === 2) return <LabFrame eyebrow="TRADE-OFF SCOREBOARD" title="Fast for whom? Accountable to whom?" prompt="Use evidence from the relay. Place each model—not a real country—on the class comparison wall." footer="Every claim must name a feature of the decision path that supports it."><div className="systems-scoreboard">{["SPEED", "PUBLIC VOICE", "CLEAR REASONS", "RIGHTS CHECK", "WAY TO CORRECT"].map((item) => <article key={item}><strong>{item}</strong><span>Low</span><i></i><i></i><i></i><i></i><i></i><span>High</span></article>)}</div><div className="leave-screen-callout"><b>NO SINGLE TOTAL SCORE</b><span>A model can be strong on one criterion and weak on another. Explain the trade-off.</span></div></LabFrame>;
  return <LabFrame eyebrow="CANADA IS A LAYERED SYSTEM" title="Real governments do not fit one simple box." prompt="Build Canada as a stack of connected features, then revise one claim that treats a whole country like a single classroom model." footer="Compare mechanisms, not stereotypes about people or countries."><div className="canada-system-stack">{["REPRESENTATIVE PARLIAMENTARY DEMOCRACY", "CONSTITUTIONAL MONARCHY", "FEDERALISM: SHARED LEVELS OF GOVERNMENT", "CHARTER, COURTS, OPPOSITION, MEDIA, AND PUBLIC PARTICIPATION"].map((item, index) => <article key={item}><b>{index + 1}</b><strong>{item}</strong></article>)}</div><a className="official-game-link" href="https://learn.parl.ca/en/games/game4/index.html" target="_blank" rel="noreferrer">Play Parliament of Canada’s Levels of Government game ↗</a></LabFrame>;
}

function PerspectiveSimulator({ scene }: { scene: number }) {
  const proposal = "Test a safer school street for six weeks. For 30 minutes before and after school, cars that are only passing through would use another street. Emergency vehicles and people who need an accessible drop-off could still enter.";
  const options = ["Try it for six weeks, then check what happened", "Do not change the street yet", "Learn more before choosing"];
  const constraints = ["Safe crossings", "Affordable homes", "Reliable transit", "Small-business access", "Green space"];
  const people = [
    { name: "Middle-school student", facts: "Walks across two busy intersections; cannot drive.", priorities: ["Safe crossings", "Reliable transit"] },
    { name: "Renter with two children", facts: "Rent rose last year; relies on the bus for work and childcare.", priorities: ["Affordable homes", "Reliable transit"] },
    { name: "Shop owner", facts: "Most deliveries arrive by van; many customers walk from nearby homes.", priorities: ["Small-business access", "Safe crossings"] },
    { name: "Local habitat group", facts: "Tracks tree canopy and stream health using public data.", priorities: ["Green space"] },
  ];
  const [focus, setFocus] = useState(constraints[0]);
  const [decision, setDecision] = useState(0);
  if (scene === 0) return <LabFrame eyebrow="NOTICE → QUESTION → CHOOSE" title="Notice before you meet the stakeholders." prompt="Study the practice picture. First name only what everyone can see. Then read the idea and make a private first choice. You can change your mind later." footer="Show: what you can see, your first choice and reason, and one fact you still need."><figure className="perspective-scene-visual"><Image unoptimized src="/images/fleetwood-school-street-perspective-v1.png" width={1664} height={936} alt="Generated practice scene of a busy school street with students walking and cycling, a wheelchair user, crosswalk, bus, cars, delivery van, shops, trees, and a school entrance" /><figcaption><b>GENERATED PRACTICE SCENE · NOT WALNUT ROAD</b><span>What can you actually see? What might matter? What would require a real source?</span></figcaption></figure><article className="case-proposal"><small>FICTIONAL FLEETWOOD SCHOOL-STREET DECISION</small><h4>What could the school street test?</h4><p>{proposal}</p></article><div className="response-options">{options.map((item, index) => <button key={item} aria-pressed={decision === index} className={decision === index ? "selected" : ""} onClick={() => setDecision(index)}><small>CHOICE {index + 1}</small><strong>{item}</strong></button>)}</div><div className="source-synthesis"><small>PAUSE BEFORE THE NEXT PART</small><p><b>What I can see:</b> In the practice picture…</p><p><b>My first choice:</b> {options[decision]}</p><p><b>What I still need to know:</b> Before deciding, I need to find out…</p></div></LabFrame>;
  if (scene === 1) return <LabFrame eyebrow="WHAT IT SAYS · WHAT MIGHT BE TRUE · WHAT WE DO NOT KNOW" title="Use the facts before you imagine a viewpoint." prompt="Read each person card. Underline what the card actually says. Then name what might matter and what you still cannot know." footer="Finish with four notes: what the card says, what might matter, and one honest unknown."><article className="case-proposal compact"><small>THE SAME STREET IDEA</small><p>{proposal}</p></article><div className="stakeholder-board evidence-sort">{people.map((person) => <article key={person.name}><span>PERSON CARD</span><h4>{person.name}</h4><p>{person.facts}</p><div><b>This might affect:</b> this person&apos;s access, cost, safety, time, or work. Point to the card detail that supports your idea.</div><small>WE DO NOT KNOW: how they feel, which choice they prefer, how they would vote, or their whole life story.</small></article>)}</div></LabFrame>;
  if (scene === 2) return <LabFrame eyebrow="CHANGE ONE THING" title="The priority changes. Would you keep your choice?" prompt="Choose one class priority. Use the person cards to ask who might be helped, who might have a new problem, and what the class still needs to learn." footer="Show: your choice now, who may be helped, who may have a problem, and one unknown."><div className="constraint-controls">{constraints.map((item) => <button key={item} aria-pressed={focus === item} className={focus === item ? "selected" : ""} onClick={() => setFocus(item)}>{item}</button>)}</div><div className="response-options">{options.map((item, index) => <button key={item} aria-pressed={decision === index} className={decision === index ? "selected" : ""} onClick={() => setDecision(index)}><small>{decision === index ? "OUR CHOICE NOW" : `CHOICE ${index + 1}`}</small><strong>{item}</strong></button>)}</div><div className="stakeholder-board">{people.map((person) => { const impact = person.priorities.includes(focus); return <article className={impact ? "affected" : ""} key={person.name}><span>{impact ? "THIS CARD GIVES US A CLUE" : "WE NEED ANOTHER CLUE"}</span><h4>{person.name}</h4><p>{person.facts}</p><div><b>What we can say:</b> {impact ? `${focus} might affect this person’s access, cost, safety, time, or work.` : "This card does not tell us enough to say how this priority would affect the person."}</div><small>DO NOT PRETEND TO KNOW: how this person feels, votes, or ranks every priority.</small></article>; })}</div></LabFrame>;
  return <LabFrame eyebrow="HEAR IT · CHECK IT · IMPROVE IT" title="Hear another group. Make your plan better." prompt="Repeat their concern in your own words and ask if you understood. Then change one part of your plan—or explain why you kept it." footer="Show: what you heard, what you changed or kept, and one question you still have."><div className="listening-protocol"><article><b>1</b><h4>Point to a fact</h4><p>“The card or source says…”</p></article><article><b>2</b><h4>Say their concern back</h4><p>“I heard you say… Did I get that right?”</p></article><article><b>3</b><h4>Ask one honest question</h4><p>“What else would we need to know?”</p></article><article><b>4</b><h4>Change it—or keep it</h4><p>“We changed/kept… because…”</p></article></div><div className="safeguard-board student-plan-board"><header><small>OUR GROUP&apos;S IDEA RIGHT NOW</small><h4>{options[decision]}</h4><p>We are thinking most about: {focus}. This plan is not final. We can make it better.</p></header><div><article><b>A POSSIBLE PROBLEM</b><p>Who might have more trouble because of this plan? Point to a card or source.</p></article><article><b>ONE CHANGE WE COULD MAKE</b><p>Add a safer crossing, an access rule, a delivery time, or a date when the city must check again.</p></article><article><b>WHAT WE STILL DO NOT KNOW</b><p>Name one person we need to hear from or one fact we need to find.</p></article></div></div></LabFrame>;
}

function CaseFileStudio({ scene }: { scene: number }) {
  const questions = ["How should Fleetwood improve safe routes to school?", "How should growth protect green space?", "How should Fleetwood respond to SkyTrain construction now and future service later?", "How can transit changes support belonging and access?"];
  const [question, setQuestion] = useState(questions[0]);
  const [evidence, setEvidence] = useState([true, false, false]);
  const [option, setOption] = useState(0);
  const sources = ["Public map or plan", "Community or stakeholder evidence", "Independent data or reporting"];
  const options = ["Pilot and review", "Implement widely", "Gather evidence first"];
  if (scene === 0) return <LabFrame eyebrow="QUESTION CLINIC" title="Narrow the decision until it can be investigated." prompt="Choose a real Fleetwood question, then test it for place, decision-maker, affected people, and available evidence before posting it to the class case wall." footer="Evidence product: one focused case question with the likely public decision-maker and two groups whose perspectives require evidence."><div className="case-question-bank">{questions.map((item) => <button key={item} className={question === item ? "selected" : ""} onClick={() => setQuestion(item)}>{item}</button>)}</div><div className="question-clinic"><header><small>CURRENT CASE QUESTION</small><h4>{question}</h4></header><div>{[["PLACE", "Fleetwood or a clearly named part of it"], ["DECISION", "A public choice—not just a broad topic"], ["PEOPLE", "Groups affected in different ways"], ["EVIDENCE", "Sources that students can actually examine"]].map(([label, detail]) => <article key={label}><b>{label}</b><p>{detail}</p></article>)}</div></div></LabFrame>;
  if (scene === 1) return <LabFrame eyebrow="CASE-BOARD ASSEMBLY" title="Build a case—not a pile of links." prompt="Rotate through a map or plan, community or stakeholder evidence, and independent data or reporting. Mark a station ready only when your group can explain its contribution and limitation." footer="Evidence product: a three-source case board with creator, date, purpose, visible evidence, and limitation for every source."><div className="source-station-board">{sources.map((item, index) => <article key={item} className={evidence[index] ? "ready" : ""}><small>SOURCE STATION {index + 1}</small><h4>{item}</h4><p>{index === 0 ? "Shows the official geography, proposal, or public decision context." : index === 1 ? "Adds lived experience, priorities, questions, or documented community concern." : "Checks scale, patterns, consequences, or competing claims beyond the proposal."}</p><button onClick={() => setEvidence((current) => current.map((value, i) => i === index ? !value : value))}>{evidence[index] ? "✓ Evidence card complete" : "Mark after source card is complete"}</button></article>)}</div><div className="case-readiness"><b>{evidence.filter(Boolean).length >= 3 ? "THREE DIFFERENT SOURCES ARE READY" : "THE CASE STILL NEEDS A DIFFERENT KIND OF EVIDENCE"}</b><span>{evidence.filter(Boolean).length}/3 source stations complete</span><p>Different sources should do different work. Three links repeating the same claim still count as one narrow evidence stream.</p></div></LabFrame>;
  if (scene === 2) return <LabFrame eyebrow="CONSEQUENCE WALK" title="Make the trade-offs visible." prompt="Choose an initial response. Then place consequence cards around it: short-term, long-term, intended, unintended, benefits, costs, and missing voices." footer="Evidence product: a revised or qualified option with the consequence card that most changed the group’s thinking."><div className="response-options">{options.map((item, index) => <button key={item} className={option === index ? "selected" : ""} onClick={() => setOption(index)}><small>OPTION {index + 1}</small><strong>{item}</strong></button>)}</div><div className="consequence-quadrants"><article><b>SHORT TERM</b><p>What could change immediately? Who notices first?</p></article><article><b>LONG TERM</b><p>What may grow, accumulate, or become difficult to reverse?</p></article><article><b>INTENDED</b><p>Which result is the response designed to produce?</p></article><article><b>UNINTENDED</b><p>What else could happen, and who might carry the cost?</p></article></div></LabFrame>;
  if (scene === 3) return <LabFrame eyebrow="COMMUNITY REVIEW PANEL" title="Prepare an auditable recommendation." prompt="Present the case to a mock public panel. Panel members challenge the evidence, jurisdiction, missing voices, consequences, safeguards, and uncertainty before the team revises." footer="Evidence product: a revised case file and a two-minute explanation another person can audit."><div className="panel-brief"><header><small>RECOMMENDATION UNDER REVIEW</small><h4>{question}</h4><p>Current response: <strong>{options[option]}</strong></p></header><div>{[["CLAIM", "A clear, qualified recommendation"], ["EVIDENCE", "Specific support from three different source types"], ["PERSPECTIVE", "Affected people represented carefully, without invented feelings"], ["SAFEGUARD", "A concrete protection, condition, or review process"], ["LIMIT", "One serious uncertainty or counterargument stated honestly"]].map(([label, detail]) => <article key={label}><b>{label}</b><p>{detail}</p></article>)}</div><footer><b>PANEL&apos;S FINAL QUESTION</b><span>What is the strongest challenge to this recommendation, and what revision does that challenge require?</span></footer></div></LabFrame>;
  return <LabFrame eyebrow="INDIVIDUAL REFLECTION" title="Show the thinking that belongs to you." prompt="Step away from the group product. Explain which source or challenge changed your thinking, what you contributed, and what evidence would strengthen the case." footer="Portfolio evidence: a short individual writing or recording. Post only if your teacher selects this case file as a Portfolio Highlight."><div className="reflection-board"><article><b>1 · THINKING</b><p>At first I thought… Now I think… because the source or challenge showed…</p></article><article><b>2 · CONTRIBUTION</b><p>One specific part I contributed to the group’s evidence, reasoning, product, or revision was…</p></article><article><b>3 · LIMIT</b><p>The recommendation would be stronger if we had evidence about…</p></article><article><b>4 · NEXT QUESTION</b><p>A responsible next question for the decision-maker or affected community is…</p></article></div></LabFrame>;
}
