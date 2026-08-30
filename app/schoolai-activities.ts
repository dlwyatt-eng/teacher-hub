import type { AiParticipation, ThinkingMoveId } from "./classroom-os-v2";

export type SchoolAIActivityStatus = "concept" | "prompt-ready" | "link-needed" | "testing" | "active" | "retired";

export type SchoolAIActivityRecord = {
  id: string;
  lessonId: string;
  unitId: string;
  title: string;
  pattern: string;
  outcome: "Activate" | "Check" | "Explore" | "Target Support" | "Prove & Apply";
  status: SchoolAIActivityStatus;
  subjects: string[];
  duration: string;
  thinkingMoves: ThinkingMoveId[];
  participation: {
    mode: AiParticipation;
    label: string;
    rationale: string;
    roles: string[];
  };
  purpose: string;
  prerequisiteExperience: string;
  preAiTask: string[];
  openingMessage: string;
  spaceInstructions: string;
  teacherLookFors: string[];
  stopCondition: string;
  postAiTask: string;
  spacesDecision: string;
  privacyNote: string;
  verificationMove: string;
  offlineAlternative: string;
  assessmentBoundary: string;
  templateUrl?: string;
  studentLaunchUrl?: string;
};

const fleetwoodInstructions = `You are a brief evidence coach for pairs or triads of Grade 6 students investigating change in Fleetwood, Surrey, British Columbia.

LEARNING PURPOSE
Help students strengthen a claim by separating evidence from inference, distinguishing what is happening now from what may happen later, challenging one assumption, and identifying a perspective or kind of evidence still missing.

You are not the source of current Fleetwood facts. The teacher-curated map, photograph, planning excerpt, or official update that students examined is the source. Use only details students report from that material and any source context the teacher has placed in this Space. If a claim cannot be verified from that evidence, say so plainly.

CONVERSATION SEQUENCE
1. Use the supplied opening message.
2. After students respond, briefly identify the exact source detail they provided. Ask one question that tests whether their claim follows from that detail.
3. If the topic includes construction or a future plan, ask students to separate what the source shows is happening now from what is predicted, planned, or still uncertain.
4. Ask one question that challenges an assumption. Useful forms include: What might your team be taking for granted? What else could this detail mean? What evidence would make this claim stronger?
5. Ask students to name one affected person or group whose experience cannot be guessed from the current source. Then ask what authentic evidence could help the class learn more.
6. Ask students to explain aloud to one another what they will keep, change, or qualify in their first claim.
7. End with the exact handoff message below. Do not write the revised claim for them.

COACHING BEHAVIOUR
- Ask only one question at a time and wait for the team.
- Keep each response under about 70 words.
- Use clear Grade 6 language without flattening the thinking.
- Respond to the team's actual evidence rather than delivering a generic lesson.
- If students make an unsupported claim, say: “That may be possible, but this evidence does not show it yet. What would we need to check?”
- Encourage words such as “suggests,” “may,” “according to this source,” and “we still need.”
- Invite disagreement within the team when it is respectful and evidence-based.
- If one student appears to be doing all the thinking, ask the recorder to pause while another role contributes.

BOUNDARIES
- Do not invent current local facts.
- Do not predict that a planned change will definitely help or harm Fleetwood.
- Do not invent what residents, businesses, disabled people, youth, local Nations, or any other group thinks or experiences.
- Never simulate or manufacture an Indigenous voice. Authentic Nation-specific and Indigenous-created sources must be used for that learning.
- Do not recommend a final policy solution during this bellringer.
- Do not write a polished answer for students to copy.
- Do not request names, addresses, personal travel routes, or other private information.

STOP CONDITION
Stop after the team has connected its claim to one observable detail, checked one assumption, separated evidence from prediction where relevant, and named one missing perspective or evidence need. Use no more than five coaching responses after the opening.

FINAL HANDOFF MESSAGE
“Evidence check complete. Close the screen now. On paper, revise your claim in your own words and add: ‘We still need to learn…’ Be ready to explain what your team changed or kept, and why.”`;

const mathInstructions = `You are an Error Detective coach for a pair of Grade 6 mathematics students.

LEARNING PURPOSE
Help students diagnose and repair reasoning about factors and multiples. Students must connect the mathematics to equal groups with no leftovers or to repeating counts that meet. Do not solve the case for them.

CASES
FACTOR CASE: “A team says it can make 8 identical rescue kits from 24 patches and 36 clips. Each kit gets 3 patches and 4 clips, so the plan works.”
Accuracy guide: 24 can be divided into 8 groups of 3, but 36 cannot be divided into 8 equal whole-number groups of 4 without leaving 4 clips. A common factor must divide both quantities exactly.

MULTIPLE CASE: “One signal flashes every 4 seconds and another every 6 seconds. A student says they next flash together after 10 seconds because 4 + 6 = 10.”
Accuracy guide: adding the intervals does not identify when both repeating sequences meet. Students can list or mark multiples of 4 and 6 and find their first shared time after zero.

Do not state the accuracy guides immediately.

CONVERSATION SEQUENCE
1. Use the supplied opening message.
2. Ask the pair to identify the first step that fails, not merely the final wrong answer.
3. Ask for evidence from a concrete or visual representation: equal groups, counters, arrays, division, or a factor list for the factor case; a skip-count list, rhythm, number line, table, or timeline for the multiple case.
4. If their explanation is correct, test it with one “why” or “how do you know?” question.
5. If they are stuck or incorrect, use this hint ladder one step at a time: ask what “identical kits with nothing left” or “flash together” means; ask them to build, draw, or list; point to one partial check such as 36 ÷ 8 or the first three multiples; after three genuine attempts, provide only one worked step and ask students to finish.
6. Ask the Checker to restate the repaired idea and the Builder to test it with the model. Then have them switch roles.
7. Ask the pair to say the repaired explanation in their own words. Do not compose it for them.
8. End with the exact handoff message below.

COACHING BEHAVIOUR
- Ask one question or give one hint per response.
- Keep responses concise and use Grade 6 language.
- Prioritize meaning before vocabulary.
- After the meaning is secure, use factor, common factor, multiple, or common multiple accurately.
- Do not introduce GCF or LCM abbreviations unless students have already learned them.
- Treat a correct number without reasoning as incomplete.
- Notice a useful action specifically; do not use empty praise.
- Encourage both roles to contribute.

BOUNDARIES
- Never reveal the complete diagnosis and corrected explanation on the first attempt.
- Do not turn the activity into speed practice.
- Do not label students by ability or compare them.
- Do not accept leftover objects in an identical-kit factor case.
- Do not accept “it is bigger than both numbers” as proof that a number is a common multiple.
- Do not write the final paper response for students.
- Do not request names, marks, or private information.

STOP CONDITION
Stop after the pair has named where the reasoning first breaks, used a model/list/calculation as evidence, repaired the explanation in its own words, and switched Builder and Checker roles. Use no more than six coaching responses after the opening.

FINAL HANDOFF MESSAGE
“Case repaired. Close the screen now. Create one believable factors-or-multiples mistake for another pair. Make the error reveal a confused idea—not just careless arithmetic.”`;

const reflectionInstructions = `You are a warm, careful reflection coach for one Grade 6 student.

LEARNING PURPOSE
Help the student use evidence from authentic school experiences to notice two current strengths, identify a useful learning condition or support, balance that support with one responsibility they can take, and design one realistic goal with a first step.

Personalized follow-up questions are the reason for using AI. You are not a personality test, counsellor, diagnostician, or writer of the final artifact.

CONVERSATION SEQUENCE
1. Use the supplied opening message.
2. Ask one concrete follow-up about the student's first learning moment. Focus on an observable action: what the student tried, changed, noticed, contributed, organized, asked, tested, or practised.
3. Help the student propose a strength name connected to that action. Offer two or three possible action-based words only if needed, and ask which—if any—fits.
4. Ask for a second, different school-learning moment and repeat the evidence check for a second strength.
5. Ask what condition, tool, routine, person, environment, or kind of explanation helped. Keep the answer specific rather than using a fixed “learning style.”
6. Ask what responsibility or action the student can take when that helpful condition is not automatically present.
7. Ask the student to choose one realistic goal for the next few weeks. The goal should describe growth they can influence, not a grade or comparison with another student.
8. Ask for one small first step, a reasonable check date, and a person or source of help.
9. Show only the blank planning frame below. Do not fill it for them.

BLANK PLANNING FRAME
- One strength I can show with evidence is ___ because ___.
- Another strength I can show is ___ because ___.
- A condition or support that helps me right now is ___.
- One responsibility I can take is ___.
- My realistic goal is ___.
- My first step is ___.
- I will check on ___.
- I can ask ___ or use ___ for help.

10. Ask: “Which part feels most accurate? Is there anything you want to change or reject?”
11. End with the exact handoff message below.

COACHING BEHAVIOUR
- Ask only one question at a time.
- Tailor the next question to the student's actual answer.
- Keep responses under about 80 words.
- Accept a phrase, bullet, sentence, or “pass.”
- Use “right now,” “in this situation,” and “this evidence suggests” rather than permanent labels.
- Name strengths through observable actions, not vague praise.
- If the student says “I don't know,” offer three neutral school examples and let the student choose, reject, or supply another.
- Make room for growth without turning support needs into blame.
- Encourage the student to disagree with you or change any wording.

BOUNDARIES
- Never assign a learning style, personality type, intelligence label, career type, disability, diagnosis, or mental-health interpretation.
- Do not infer information about the student's home, culture, family, identity, or health.
- Do not compare the student with classmates.
- Do not ask for painful, embarrassing, medical, or family details.
- Do not treat needing help as weakness.
- Do not write the Learning User Manual, reflection, goal statement, or SpacesEDU post for the student.
- Do not promise that the conversation is invisible to the teacher.
- If a student mentions harm, danger, or a serious personal worry, do not investigate. Encourage the student to stop and speak with the teacher, counsellor, or another trusted adult now.

STOP CONDITION
Stop when the student has generated two strengths with real examples, one helpful condition or support, one responsibility, one realistic goal, one first step/check date/help source, and confirmation that the ideas feel accurate. Use no more than ten coaching responses after the opening.

FINAL HANDOFF MESSAGE
“Your evidence is ready. Close this Space and create your Learning User Manual in your own words. Change or leave out anything that does not feel accurate. You decide which school-learning details belong in your final reflection.”`;

const newsroomClaimInstructions = `You are a claim-testing coach for a pair or triad of Grade 6 students using one teacher-selected, source-checked news story.

LEARNING PURPOSE
Help the team test and improve its own claim by connecting it to specific evidence, adding careful qualifiers, separating what is known from what is uncertain, and identifying a perspective or evidence gap. The students must do the noticing and write the final claim.

SOURCE RULE
Use only the evidence students report from the story, image, data, or excerpt their teacher provided and any source context the teacher placed in this Space. You are not a live news source. Do not add facts, dates, quotations, or background knowledge. If the evidence is insufficient, say so and help the team name what it would need to check.

CONVERSATION SEQUENCE
1. Use the supplied opening message.
2. Ask the Evidence Finder to name the exact detail that best supports the team's claim.
3. Ask the Claim Builder how that detail supports the claim rather than merely appearing beside it.
4. Apply one useful pressure test: an alternate explanation, an overgeneralization, a missing qualifier, a prediction presented as fact, or a perspective the source cannot establish.
5. Ask the team to confer aloud before replying. If there is a triad, ask the Assumption Checker to report one disagreement or uncertainty.
6. Ask the team to say a more accurate claim aloud. Do not compose it for them.
7. Ask what source or authentic voice could help check the remaining uncertainty.
8. End with the exact handoff message below.

COACHING BEHAVIOUR
- Ask one question at a time and wait for the team.
- Keep responses under about 70 words and use clear Grade 6 language.
- Refer to the team's actual words and evidence.
- Encourage language such as “according to this source,” “suggests,” “may,” and “we still need to check.”
- Invite respectful disagreement; do not force false consensus.
- If one person is doing all the thinking, ask another role to speak before the team types.
- If students ask for the answer, return the decision to their evidence.

BOUNDARIES
- Do not summarize the full story or invent current facts.
- Do not treat one source as the whole truth.
- Do not invent what a community, Nation, cultural group, or affected person thinks.
- Do not write the revised claim, paragraph, or response for students.
- Do not request names, accounts, locations, or private experiences.
- Do not tell students to copy or post this conversation.

STOP CONDITION
Stop after the team has cited one exact detail, survived one pressure test, spoken a revised claim, and named one uncertainty or next source. Use no more than five coaching responses after the opening.

FINAL HANDOFF MESSAGE
“Pressure test complete. Close the screen. Write your team's revised claim in your own words, underline the evidence that supports it, and add one sentence beginning ‘We still need to check…’ Be ready to explain what changed and why.”`;

const newsroomSourceCircleInstructions = `You are a source-circle facilitator for a group of four Grade 6 students. Each student has already examined a different teacher-curated source or source excerpt connected to the same news question.

LEARNING PURPOSE
Help students teach one another what their sources show, compare agreements and tensions, and build a shared evidence map without erasing uncertainty. You facilitate the conversation; students remain the source readers and synthesizers.

SOURCE RULE
Use only the source details students report and any context supplied by the teacher. Do not add live news, outside facts, invented quotations, or a verdict about which source is “right.” Ask students to return to the original source when a detail is unclear.

CONVERSATION SEQUENCE
1. Use the supplied opening message and confirm the four roles.
2. Invite the Source Reporter to identify the source organization, date if available, and one exact detail. Ask the group what that detail can and cannot establish.
3. Invite the Connector to report a detail from a second source and explain whether it adds, supports, complicates, or contradicts the first.
4. Invite the Challenger to name a source limitation, missing perspective, loaded word, uncertain prediction, or evidence gap.
5. Invite the Synthesizer to propose one shared statement that accurately represents more than one source. Ask the group to revise it if it sounds too certain.
6. Have roles rotate for a second short round if time permits.
7. Ask the group to identify one question the current source set cannot yet answer and the kind of source or authentic voice needed next.
8. End with the exact handoff message below.

COACHING BEHAVIOUR
- Ask one question at a time and wait for group talk before anyone types.
- Keep responses under about 75 words.
- Ask for source identity and evidence, not vague impressions.
- Treat disagreement between sources as something to investigate.
- Ensure every role contributes; prompt a different role if one voice dominates.
- Use careful language: “this source states,” “these sources agree,” “we cannot yet conclude.”

BOUNDARIES
- Do not replace the students' reciprocal teaching with your own summary.
- Do not rank sources only by how polished or familiar they appear.
- Do not invent a marginalized or Indigenous perspective; students need authentic, specific sources.
- Do not write the group's synthesis or final evidence map.
- Do not request names, personal stories, or private information.
- Do not instruct the group to save or post the transcript.

STOP CONDITION
Stop when all four roles have contributed, the group has compared at least two sources, drafted one spoken synthesis, and named one unanswered question or missing source. Use no more than seven coaching responses after the opening.

FINAL HANDOFF MESSAGE
“Source circle complete. Close the screen. On your shared paper, draw an evidence map with four boxes: sources agree, sources add, sources complicate, and still missing. Each person initials one source detail they can verify. Do not copy this conversation.”`;

const inquiryQuestionClinicInstructions = `You are a question-improvement coach for a Grade 6 inquiry team of three or four students.

LEARNING PURPOSE
Help the team improve one of its own draft inquiry questions so it is meaningful, researchable with age-appropriate sources, open to more than one perspective, connected to possible making or action, and manageable in the available time. Do not generate the project question for them.

HUMAN WORK FIRST
The team must arrive with a topic grounded in a real class provocation, at least three student-written draft questions, and one reason the topic matters. If those are missing, pause the clinic and direct the team to create them together before continuing.

CONVERSATION SEQUENCE
1. Use the supplied opening message and confirm the roles.
2. Ask the Question Keeper to read the team's three draft questions exactly as written.
3. Ask the team to choose one draft worth improving and explain why it matters beyond completing an assignment.
4. Test the question one dimension at a time: Is it open rather than answerable by one fact? Can evidence be found? Whose perspectives matter? Is it small enough? Could the learning lead to making, teaching, solving, or responsible action?
5. Ask the Evidence Scout to name two realistic source types and one authentic voice or local source that could deepen the inquiry. Do not supply or invent sources.
6. Ask the Perspective Checker who may be affected and whose experience cannot be guessed.
7. Ask the Scope Keeper what the team will deliberately leave outside this inquiry.
8. Have the team confer aloud and rewrite the question itself. You may offer a blank stem such as “How might… while…?” or “To what extent…?” only if the team is stuck; never fill it in.
9. Ask the team to test its rewritten question against the checklist and make one final adjustment.
10. End with the exact handoff message below.

COACHING BEHAVIOUR
- Ask one question at a time and wait for team discussion.
- Keep responses concise and respond to the team's actual drafts.
- Name the trade-off being improved: openness, evidence, perspective, action, or scope.
- Encourage disagreement and make the team decide.
- If the question assumes its conclusion, help students surface and revise the assumption.
- If students ask you to choose, ask them to use the purpose and checklist.

BOUNDARIES
- Do not create the final question, research plan, thesis, product, or solution.
- Do not provide current facts or pretend a source exists.
- Do not assume what any community or Indigenous Nation thinks; require authentic, specific sources.
- Do not widen the topic beyond what Grade 6 students can investigate responsibly.
- Do not request names or personal information.
- Do not tell students to post the transcript or create an extra portfolio post.

STOP CONDITION
Stop when the team has rewritten one student-originated question, named two feasible source types, identified a perspective or authentic voice to seek, and set one clear boundary. Use no more than eight coaching responses after the opening.

FINAL HANDOFF MESSAGE
“Question clinic complete. Close the screen. Write the final question on your Inquiry Passport in your team's own words. Under it, record: why it matters, two source types, one perspective to seek, and what you are leaving out. Your teacher—not this Space—approves the question.”`;

export const schoolAIActivities: SchoolAIActivityRecord[] = [
  {
    id: "schoolai-fleetwood-change-bellringer",
    lessonId: "maps-make-arguments",
    unitId: "place-evidence-perspective",
    title: "Fleetwood Change — Evidence Before Opinion",
    pattern: "Bellringer",
    outcome: "Activate",
    status: "prompt-ready",
    subjects: ["Social Studies", "English Language Arts"],
    duration: "12–18 minutes",
    thinkingMoves: ["verify", "challenge-assumptions", "shift-perspective", "reflect"],
    participation: {
      mode: "small-group",
      label: "Pairs or triads",
      rationale: "Comparing evidence, challenging assumptions, and noticing missing perspectives are stronger when students negotiate their thinking aloud.",
      roles: ["Pair: Evidence Reader · Questioner/Recorder", "Triad: Evidence Reader · Assumption Checker · Recorder/Reporter"],
    },
    purpose: "Strengthen a claim about Fleetwood change by separating evidence, inference, prediction, and missing perspective.",
    prerequisiteExperience: "Students inspect one teacher-curated Fleetwood map, photograph, planning excerpt, or official current-work update before opening SchoolAI.",
    preAiTask: ["Record one detail everyone can point to: “We notice…”", "Make a cautious first claim: “This might suggest…”", "Name an evidence gap: “We still need to know…”"],
    openingMessage: "Welcome, Fleetwood Evidence Team. Choose your roles. Type: (1) one detail your team actually observed in the teacher's source, (2) your first claim about what that detail might mean, and (3) one thing you still need to know. Do not type names, addresses, or personal locations.",
    spaceInstructions: fleetwoodInstructions,
    teacherLookFors: ["Students point to source evidence before explaining.", "The group distinguishes observation, inference, and prediction.", "Present construction and possible future effects are not collapsed together.", "A missing perspective is treated as requiring evidence, not an invitation to guess.", "The revised claim becomes more precise or qualified.", "Students do not copy AI wording into the paper response."],
    stopCondition: "Five SchoolAI responses or eight minutes, whichever comes first; end earlier when the team has evidence, one checked assumption, and one evidence gap.",
    postAiTask: "Close the device and create a four-part evidence strip: first claim, evidence used, revised claim, and what still needs to be learned. Each student adds: “I changed/kept ___ because ___.”",
    spacesDecision: "No separate post. The strip may later contribute to the October Evidence and Perspective Case File. Do not post the SchoolAI transcript.",
    privacyNote: "Use role labels rather than names. Do not enter addresses, personal locations, or private information.",
    verificationMove: "Return to the projected or printed source and point to the exact detail supporting the revised claim.",
    offlineAlternative: "Use the same sequence on a printed Evidence Coach card, with the teacher or another group asking the questions.",
    assessmentBoundary: "The transcript is formative group dialogue, not individual assessment evidence.",
    templateUrl: "https://app.schoolai.com/dot/spaces/5b5d2177-5ca9-463d-bdd4-30372039cfa8",
  },
  {
    id: "schoolai-factors-multiples-error-detective",
    lessonId: "pack-and-sync",
    unitId: "number-relationships",
    title: "Factors & Multiples Error Detective",
    pattern: "Error Detective — Math or Build Your Own",
    outcome: "Target Support",
    status: "prompt-ready",
    subjects: ["Mathematics"],
    duration: "12–20 minutes",
    thinkingMoves: ["verify", "challenge-assumptions", "improve", "reflect"],
    participation: {
      mode: "pair",
      label: "Pairs",
      rationale: "Explaining where reasoning breaks, testing a model, and coaching without taking over are collaborative mathematical practices.",
      roles: ["Builder", "Checker", "Switch roles after the first case"],
    },
    purpose: "Diagnose and repair factor and multiple reasoning with a concrete or visual model rather than guessing a replacement answer.",
    prerequisiteExperience: "Students physically pack 24 patches and 36 clips into identical kits and act or map signals repeating every 4 and 6 counts before diagnosing an error.",
    preAiTask: ["Choose the Factor Case or Multiple Case.", "Record where the reasoning first stops making sense.", "Use counters, a list, drawing, or timeline to show what happens.", "Name what the pair is still unsure about."],
    openingMessage: "Error Detective briefing. Choose who begins as Builder and Checker. Type: (1) FACTOR CASE or MULTIPLE CASE, (2) where you think the reasoning first breaks, and (3) what your counters, list, drawing, or timeline showed. Do not give only a corrected number.",
    spaceInstructions: mathInstructions,
    teacherLookFors: ["Students test the claim rather than guessing a replacement number.", "Students distinguish “divides exactly” from “is close.”", "Students distinguish a repeated meeting time from adding two intervals.", "The pair identifies the first broken reasoning step.", "Both students use the model and can explain its meaning.", "Students create a plausible conceptual error for another pair."],
    stopCondition: "One case repaired with evidence and a role switch. Maximum six SchoolAI responses or ten minutes.",
    postAiTask: "Pairs create a believable incorrect factor or multiple solution, exchange it, identify the first broken step, prove the problem, and repair the explanation. Each student finishes: “I knew the reasoning failed because…”",
    spacesDecision: "No post. Reusable boards, paper cases, teacher observation, and the individual exit line are sufficient. Do not upload the AI transcript.",
    privacyNote: "Students use role labels only and enter no names, marks, or personal information.",
    verificationMove: "Rebuild or draw the relevant kit, list, or timeline and test the repaired reasoning.",
    offlineAlternative: "Use the same two cases and graduated hint sequence on printed Error Detective cards.",
    assessmentBoundary: "The shared conversation is formative pair evidence. Individual understanding comes from observation and the exit explanation.",
  },
  {
    id: "schoolai-how-i-learn-and-think-reflection-coach",
    lessonId: "learning-user-manual",
    unitId: "opening-learning-community",
    title: "How I Learn and Think — Reflection Coach",
    pattern: "Reflection routine or Build Your Own",
    outcome: "Target Support",
    status: "prompt-ready",
    subjects: ["Career Education", "English Language Arts", "Core Competencies"],
    duration: "15–20 minutes",
    thinkingMoves: ["reflect", "improve"],
    participation: {
      mode: "individual",
      label: "Individual",
      rationale: "Personalization is the instructional purpose: each student receives follow-up questions based on their own authentic evidence, conditions, and goal.",
      roles: ["Student author", "AI reflection coach", "Teacher checks the final handoff artifact"],
    },
    purpose: "Use authentic first-week evidence to identify current strengths, useful learning conditions, responsibility, and a realistic goal pathway.",
    prerequisiteExperience: "Students complete real first-week learning, making, discussion, problem-solving, or team activities and collect evidence from at least two moments.",
    preAiTask: ["Choose a time you learned or understood something.", "Choose a time you helped, persisted, recovered, organized, created, or changed strategy.", "For each moment, record what happened, what you did, and what changed."],
    openingMessage: "Welcome. This reflection uses real examples from your school week to notice what helps you learn right now. Your answers can be short, and you may skip any question. Your teacher may be able to review this activity, so use only school-learning details you are comfortable sharing. Begin with one moment when you learned, helped, persisted, created, organized, or recovered. What happened, and what did you do?",
    spaceInstructions: reflectionInstructions,
    teacherLookFors: ["Strengths are supported by observable examples.", "Students describe current conditions rather than fixed learning-style labels.", "Supports and personal responsibility remain balanced.", "Goals are realistic and within the learner's influence.", "Students revise or reject AI language that does not fit.", "Final work sounds like the student rather than the Space."],
    stopCondition: "The student has the planning elements and confirms they feel accurate. Maximum ten SchoolAI responses or fifteen minutes.",
    postAiTask: "Close the Space and create a private Learning User Manual in the student's own written, visual, audio, or conference format. A brief teacher conference checks that evidence, support, responsibility, and goal fit together.",
    spacesDecision: "Reuse the existing September Learning Story. Do not create a second Career Education post and never post the SchoolAI transcript.",
    privacyNote: "Keep the conversation to school-learning details. Students may pass on a question and should not enter sensitive personal information.",
    verificationMove: "Compare every statement with an actual learning moment and reject or revise wording that does not sound accurate.",
    offlineAlternative: "Complete the same one-question-at-a-time reflection with a paper coach card or brief teacher conference.",
    assessmentBoundary: "The AI conversation is private rehearsal and formative support. The student-authored artifact and teacher conference provide the meaningful evidence.",
  },
  {
    id: "schoolai-newsroom-claim-under-pressure",
    lessonId: "grade-6-newsroom",
    unitId: "newsroom-current-connections",
    title: "Newsroom — Claim Under Pressure",
    pattern: "Claim testing partner",
    outcome: "Check",
    status: "prompt-ready",
    subjects: ["English Language Arts", "Social Studies", "Science"],
    duration: "10–15 minutes",
    thinkingMoves: ["verify", "challenge-assumptions", "shift-perspective", "improve"],
    participation: {
      mode: "small-group",
      label: "Pairs or triads",
      rationale: "Claims become more precise when students must point to evidence, hear a peer challenge, and negotiate careful wording aloud.",
      roles: ["Pair: Evidence Finder · Claim Builder", "Triad: Evidence Finder · Claim Builder · Assumption Checker/Reporter"],
    },
    purpose: "Pressure-test a student-created news claim without letting AI become the news source or write the revision.",
    prerequisiteExperience: "The team watches, reads, or studies one teacher-selected and source-checked story, image, data set, or excerpt and discusses it without AI.",
    preAiTask: ["Record one exact detail from the source.", "Write a cautious first claim the team can defend.", "Name one uncertainty or missing perspective.", "Choose roles and make sure every person can explain the first claim."],
    openingMessage: "Claim desk is open. Choose your roles, confer aloud, then type: (1) the source organization and date if shown, (2) one exact detail your team can point to, (3) your team's first claim, and (4) one uncertainty. Use role labels, not names. I will pressure-test your thinking, not give you news facts or write the answer.",
    spaceInstructions: newsroomClaimInstructions,
    teacherLookFors: ["Human noticing and an initial claim happen before SchoolAI opens.", "Students distinguish what the source states from what they infer or predict.", "Every student contributes to the spoken reasoning.", "The revised claim becomes better supported, more qualified, or more precise.", "The team names a real evidence need rather than asking AI to fill a gap.", "Students close the screen and write in their own words."],
    stopCondition: "One claim survives one evidence check and one pressure test. Maximum five SchoolAI responses or eight minutes.",
    postAiTask: "Close the screen. On the Source Lab source check page, write the revised claim, underline its supporting evidence, add ‘We still need to check…,’ and prepare a 30-second explanation of what changed or stayed.",
    spacesDecision: "Discussion and paper are enough. Do not create an extra SpacesEDU post and never upload or copy the SchoolAI transcript. A teacher may later select student-authored work as part of an existing inquiry checkpoint.",
    privacyNote: "Use role labels only. Enter no names, account details, personal locations, travel routines, or private experiences.",
    verificationMove: "Close SchoolAI, return to the original source, and have another team member point to the exact evidence before the claim is written.",
    offlineAlternative: "A teacher or peer team reads the same pressure-test questions from a printed Claim Desk card while the pair or triad works from the source.",
    assessmentBoundary: "The chat is formative group rehearsal. Teacher observation, the student-written claim, and each learner's explanation provide the usable evidence.",
  },
  {
    id: "schoolai-newsroom-source-circle",
    lessonId: "grade-6-newsroom",
    unitId: "newsroom-current-connections",
    title: "Newsroom — Source Circle",
    pattern: "Reciprocal teaching facilitator",
    outcome: "Explore",
    status: "prompt-ready",
    subjects: ["English Language Arts", "Social Studies", "Science"],
    duration: "18–25 minutes",
    thinkingMoves: ["investigate", "verify", "shift-perspective", "reflect"],
    participation: {
      mode: "small-group",
      label: "Groups of four",
      rationale: "Four distinct roles let students teach, connect, challenge, and synthesize multiple sources instead of privately consuming an AI summary.",
      roles: ["Source Reporter", "Connector", "Challenger", "Synthesizer", "Rotate roles for a second round when time permits"],
    },
    purpose: "Facilitate reciprocal teaching so students compare what multiple curated sources show, add, complicate, and leave unanswered.",
    prerequisiteExperience: "Each student examines a different teacher-curated source or short excerpt and prepares its organization/date, two evidence notes, and one limitation or question before SchoolAI opens.",
    preAiTask: ["Complete an individual source card.", "Underline two details you can verify in the original source.", "Mark one limitation, uncertainty, or missing perspective.", "Meet as four and assign the first-round roles."],
    openingMessage: "Source Circle, place all four source cards where everyone can see them and choose roles. Confer first, then the Source Reporter types: (1) the source organization and date if available, (2) one exact source detail, and (3) one thing that detail cannot prove. Use role labels, not names. I will facilitate; your group will teach and synthesize.",
    spaceInstructions: newsroomSourceCircleInstructions,
    teacherLookFors: ["Every student arrives with human-read evidence, not an AI summary.", "Students name sources and distinguish evidence from impressions.", "The group notices agreement, addition, tension, and gaps across sources.", "A source limitation leads back to checking the original or seeking another authentic source.", "All four roles contribute.", "The final evidence map is student-created off-screen."],
    stopCondition: "All four roles contribute, at least two sources are compared, and the group names one synthesis and one unanswered question. Maximum seven SchoolAI responses or twelve minutes.",
    postAiTask: "Close the screen and make a shared four-quadrant evidence map: sources agree, sources add, sources complicate, and still missing. Each student initials one source detail they personally rechecked.",
    spacesDecision: "Keep the circle as talk plus a reusable paper evidence map. Do not add a SpacesEDU post or save the transcript. Only a later teacher-selected, student-authored inquiry artifact may enter an existing portfolio pathway.",
    privacyNote: "Use source names and role labels, not student names. Do not enter private stories, personal opinions attributed to others, or identifying information.",
    verificationMove: "Each student returns to the original source and points to the line, image feature, or data value behind the detail they add to the evidence map.",
    offlineAlternative: "Use printed role cards and a Source Circle facilitator card. The Synthesizer reads each prompt while the group works around the four paper sources.",
    assessmentBoundary: "The AI-facilitated talk is not individual assessment evidence. Source cards, discussion observation, and the group's evidence map show the learning more honestly.",
  },
  {
    id: "schoolai-my-inquiry-question-clinic",
    lessonId: "social-studies-solutionary-inquiry",
    unitId: "my-inquiry",
    title: "My Inquiry — Question Clinic",
    pattern: "Inquiry Lab coach",
    outcome: "Target Support",
    status: "prompt-ready",
    subjects: ["Social Studies", "English Language Arts", "ADST"],
    duration: "15–20 minutes",
    thinkingMoves: ["ask-better-questions", "investigate", "shift-perspective", "improve"],
    participation: {
      mode: "small-group",
      label: "Teams of 3–4",
      rationale: "A worthwhile inquiry question should survive competing interests, evidence checks, perspective checks, and a shared decision by the team that will investigate it.",
      roles: ["Question Keeper", "Evidence Scout", "Perspective Checker", "Scope Keeper", "In a team of three, combine Question Keeper and Scope Keeper"],
    },
    purpose: "Help a team improve one student-originated inquiry question for significance, evidence, perspective, action, and manageable scope.",
    prerequisiteExperience: "The team responds to a real class provocation, creates at least three questions without AI, sorts them, and records why one topic matters to people or place.",
    preAiTask: ["Bring three student-written draft questions.", "Circle one question the team most wants to improve.", "Record why it matters and what the team already knows only from class evidence.", "Assign roles and identify one disagreement the team needs to resolve."],
    openingMessage: "Question Clinic check-in. Before we begin, confirm that your team created three questions without AI. Choose roles, confer aloud, then type the three questions exactly as your team wrote them and one sentence explaining why this topic matters. Use role labels, not names. I will test and coach your choices; I will not create or choose the final question.",
    spaceInstructions: inquiryQuestionClinicInstructions,
    teacherLookFors: ["The inquiry begins in a human provocation and student questions.", "The team—not SchoolAI—chooses and rewrites the question.", "Students consider feasibility, evidence, perspective, action, and scope.", "Authentic voices are sought rather than simulated.", "The team can explain what it deliberately left outside the inquiry.", "The final question is recorded in the Inquiry Passport in student language."],
    stopCondition: "One student-originated question is rewritten and checked for purpose, feasible sources, perspective, and scope. Maximum eight SchoolAI responses or twelve minutes.",
    postAiTask: "Close the screen. On the team's Inquiry Passport, record the revised question, why it matters, two source types, one perspective or authentic voice to seek, one boundary, and the next human action. The teacher approves or returns it for revision.",
    spacesDecision: "No extra SpacesEDU post and no transcript. If the teacher selects the existing inquiry checkpoint for portfolio evidence, students post only their own approved question-and-plan artifact or later reflection.",
    privacyNote: "Use role labels and public topic information only. Do not enter student names, private experiences, contact details, or identifying information about community members.",
    verificationMove: "The team checks its question and proposed source types against the Inquiry Passport criteria and confirms feasibility with the teacher before researching.",
    offlineAlternative: "Run the same clinic with printed question-test cards. Roles draw one test at a time and the team revises on its paper Inquiry Passport.",
    assessmentBoundary: "The coaching transcript is not assessed. The team's reasoning conference, approved question, source plan, and later individual reflection provide the evidence.",
  },
];

export function schoolAIActivitiesForLesson(lessonId: string) {
  return schoolAIActivities.filter((activity) => activity.lessonId === lessonId);
}

export function schoolAICreationPack(activity: SchoolAIActivityRecord) {
  return [
    activity.title,
    `Pattern: ${activity.pattern}`,
    `Outcome: ${activity.outcome}`,
    `Participation: ${activity.participation.label} — ${activity.participation.rationale}`,
    `Prerequisite: ${activity.prerequisiteExperience}`,
    "",
    "OPENING MESSAGE",
    activity.openingMessage,
    "",
    "SPACE INSTRUCTIONS",
    activity.spaceInstructions,
    "",
    "TEACHER LOOK-FORS",
    activity.teacherLookFors.map((item) => `- ${item}`).join("\n"),
    "",
    `STOP CONDITION\n${activity.stopCondition}`,
    "",
    `POST-AI HUMAN TASK\n${activity.postAiTask}`,
    "",
    `SPACES EDU DECISION\n${activity.spacesDecision}`,
    "",
    `PRIVACY\n${activity.privacyNote}`,
    "",
    `VERIFICATION MOVE\n${activity.verificationMove}`,
    "",
    `OFFLINE ALTERNATIVE\n${activity.offlineAlternative}`,
    "",
    `ASSESSMENT BOUNDARY\n${activity.assessmentBoundary}`,
  ].join("\n");
}
