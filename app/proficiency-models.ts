export const proficiencyLevels = ["Emerging", "Developing", "Proficient", "Extending"] as const;

export type ProficiencyLevel = (typeof proficiencyLevels)[number];

export type ProficiencyModel = {
  level: ProficiencyLevel;
  growthLabel: string;
  sample: string;
  whatWorks: readonly string[];
  nextImprovement: string;
  teacherUseNote: string;
};

export type ProficiencyModelSet = {
  id: string;
  title: string;
  subtitle: string;
  activityIds: readonly string[];
  spacesEvidenceIds: readonly string[];
  prompt: string;
  sourceCapsule?: {
    label: string;
    text: string;
  };
  criteria: readonly string[];
  copyGuard: string;
  teacherUse: readonly string[];
  models: readonly ProficiencyModel[];
};

export const proficiencyModelProtocol = {
  title: "Notice a move. Name its effect. Try it your way.",
  studentSteps: [
    "Notice one move that makes the thinking easier to follow.",
    "Point to the evidence in the model—do not judge handwriting, confidence, length, or decoration skill.",
    "Choose one useful move to try with your own evidence and ideas.",
    "Leave the model behind before creating; your work should not sound or look the same.",
  ],
  teacherGuardrails: [
    "Use models after students understand the task but before a major revision. Reveal one or two levels at a time rather than projecting four answers to copy.",
    "Describe what is visible and what could improve. Never introduce Emerging as failure or Extending as the amount everyone must produce.",
    "Proficiency comes from recent, varied evidence. A single model, product, post, performance, or polished page never determines a term level.",
    "Keep the learning target stable while accepting writing, audio, diagram, pointing, scribing, conference, and approved communication-support routes.",
    "Do not reward length, artistic polish, device fluency, speaking speed, political agreement, or disclosure unless that feature is an explicitly taught curricular criterion.",
  ],
} as const;

export const proficiencyModelSets = [
  {
    id: "civic-decision-brief",
    title: "Civic Decision Brief",
    subtitle: "One team artifact plus thinking that belongs to the individual student",
    activityIds: ["civic-decision-brief", "rights-in-tension"],
    spacesEvidenceIds: ["spaces-nov-civic"],
    prompt: "What should happen? Use case evidence, name affected people, include a safeguard and review, then explain what changed your thinking and what you contributed.",
    criteria: ["Correct decision-maker", "Relevant evidence", "Affected perspectives", "Safeguard and review", "Individual reasoning"],
    copyGuard: "These Juniper Park responses show possible reasoning moves—not the correct council answer. Students must make and defend their own team recommendation.",
    teacherUse: [
      "Compare Emerging and Developing first. Ask what one added fact makes possible before revealing a longer response.",
      "Colour-code evidence, affected people, safeguard, review, and uncertainty; content matters more than sentence length.",
      "Invite students to borrow one reasoning move, then close the model while teams revise their own brief.",
      "Assess the shared civic reasoning and each student’s individual reflection separately; do not assess political agreement or speaking confidence.",
    ],
    models: [
      {
        level: "Emerging",
        growthLabel: "A position and a starting reason",
        sample: "Our group thinks the Juniper Park court should stay open later because young people need a free place to play. I helped our group choose this plan.",
        whatWorks: ["States a clear position", "Notices one affected group", "Names an individual contribution"],
        nextImprovement: "Add one exact case fact, a safeguard aimed at the reported noise, and a time when the city will check whether the plan worked.",
        teacherUseNote: "Name the civic thinking already present. Conference with three prompts—Which fact? How could harm be reduced? When will the city check?—instead of asking for a longer paragraph.",
      },
      {
        level: "Developing",
        growthLabel: "Evidence begins to support the plan",
        sample: "We recommend keeping the court open until 10:30 with no speakers after 8:30. Fourteen of the 18 reports were about noise after 9:30, so the city needs to respond. I found this evidence for my team.",
        whatWorks: ["Recommends a specific action", "Uses an exact fact for a relevant purpose", "Shows a clear team contribution"],
        nextImprovement: "Explain how the plan affects both court users and neighbours, name a serious risk, and add a review that could actually change the rule.",
        teacherUseNote: "Ask students to underline the evidence and circle the decision it supports. The useful next move is consequence and accountability—not extra decoration or another unrelated fact.",
      },
      {
        level: "Proficient",
        growthLabel: "An accountable recommendation",
        sample: "We recommend a six-week trial that keeps the court open until 10:30, bans speakers after 8:30, and adds an evening host. Most late reports named speakers or shouting, while staff still counted 18–31 court users between 8:00 and 10:00. I first wanted an early closing, but Mr. Chen’s need for sleep and Rae’s access point helped me support a rule aimed at the noise instead. I organized our option chart. After six weeks, the city should compare reports by time and type and hear from youth and neighbours. We still do not know whether a host will reduce shouting.",
        whatWorks: ["Connects two relevant facts to a specific recommendation", "Represents more than one affected perspective fairly", "Includes a safeguard, evidence-based review, contribution, change in thinking, and uncertainty"],
        nextImprovement: "Name the exact city authority and decide what result would trigger keeping, changing, or ending the trial.",
        teacherUseNote: "Treat this as one way to meet Grade 6 expectations, not a script. Ask students which sentence does each assessment job, then replace the model with their own team evidence wall.",
      },
      {
        level: "Extending",
        growthLabel: "Criteria transfer to a harder decision",
        sample: "Surrey’s parks decision-makers should authorize a six-week, reversible trial of later hours with a no-speaker rule, trained host, and accessible complaint route. This targets the noise named in most reports without ignoring the 18–31 evening users or the three-kilometre distance to another lit court. The strongest counterargument is that a host may not protect sleep; the city should publish use and noise patterns by time, then revise the hours if late reports do not meaningfully fall. I changed our matrix so youth, neighbours, and access voices share the check-back. Four observation nights cannot show every seasonal pattern, so I would not make the rule permanent yet.",
        whatWorks: ["Coordinates authority, evidence, counterargument, access, safeguard, and a reversible decision", "Uses a source limitation to shape the recommendation", "Transfers fairness criteria into a shared review process"],
        nextImprovement: "Verify the decision and review route in an authoritative city source, then explain how someone could question the decision if the public check-back is inadequate.",
        teacherUseNote: "Extending is depth and transfer, not compulsory length. Use this only after the class has built the shared case; students should not be expected to reproduce its vocabulary or recommendation.",
      },
    ],
  },
  {
    id: "evidence-and-claim",
    title: "Evidence → Claim",
    subtitle: "Say only what the evidence can support, then keep a useful limit visible",
    activityIds: ["trace-the-claim", "fleetwood-case-file", "graph-story-lab", "signal-case"],
    spacesEvidenceIds: ["spaces-oct-case", "spaces-mar-science"],
    sourceCapsule: {
      label: "Fictional practice evidence · school pollinator garden",
      text: "During three 10-minute observations in the same garden bed, observers counted 18, 21, and 17 bee visits to purple flowers and 9, 12, and 10 visits to yellow flowers. Flower number, scent, and position were not changed or measured.",
    },
    prompt: "Make a claim from the observation evidence. Point to the numbers that support it, avoid claiming more than the observations show, and name a useful next check.",
    criteria: ["Focused claim", "Exact evidence", "Reasoning link", "Honest limitation", "Useful next check"],
    copyGuard: "This fictional garden capsule teaches evidence boundaries. Change the context or data before using it for assessment, and never present the sample claim as a scientific fact about all bees.",
    teacherUse: [
      "Ask students to box the claim, underline evidence, draw an arrow through the reasoning, and bracket the limit.",
      "Compare certainty words—‘love,’ ‘visited more during these observations,’ and ‘may’—before comparing length.",
      "Replace the source capsule for assessed work. Students need to reason from fresh evidence rather than recall the model sentence.",
    ],
    models: [
      {
        level: "Emerging",
        growthLabel: "A pattern is noticed",
        sample: "Bees love purple flowers best.",
        whatWorks: ["Notices the main direction of the observed pattern", "Offers a claim the class can test and improve"],
        nextImprovement: "Replace ‘love’ and ‘best’ with what was actually counted, then add one pair of numbers from the evidence.",
        teacherUseNote: "Treat the overclaim as a productive starting point. Ask ‘What did the observers see?’ before introducing vocabulary such as limitation.",
      },
      {
        level: "Developing",
        growthLabel: "Numbers begin to support a careful claim",
        sample: "Bees visited the purple flowers more during our observations. Purple had 18–21 visits each time, while yellow had 9–12.",
        whatWorks: ["Uses cautious language tied to the observation period", "Selects exact ranges that match the claim"],
        nextImprovement: "Explain why the counts support the comparison and name one unmeasured factor that could have affected the pattern.",
        teacherUseNote: "Celebrate that the claim now fits the data. Prompt with ‘What else differed besides colour?’ rather than asking for more statistics.",
      },
      {
        level: "Proficient",
        growthLabel: "Claim, evidence, reasoning, and limit align",
        sample: "In these three observations, bees visited purple flowers more often than yellow flowers: purple received 18, 21, and 17 visits, compared with 9, 12, and 10. The pattern repeated each time, which supports a claim about this garden and these observation periods. It does not prove colour caused the difference because flower number, scent, and position were not controlled.",
        whatWorks: ["Matches the claim’s scope to the available observations", "Connects repeated evidence to the conclusion", "Names a limitation that changes what can be concluded"],
        nextImprovement: "Design one fair next test that changes or controls a single factor and predict what evidence would strengthen or challenge the claim.",
        teacherUseNote: "Use as an expectation-level reasoning model. A diagram or audio response can demonstrate the same evidence chain without matching this paragraph form.",
      },
      {
        level: "Extending",
        growthLabel: "The limit shapes a stronger investigation",
        sample: "Purple flowers received 56 visits across the three observation periods and yellow flowers received 31, with purple higher in every period. This is consistent evidence of a visit difference in this bed, but colour is only one possible explanation because scent, flower number, and position were not separated. A stronger test would use equal numbers of similar flowers and switch their positions while observing on several days. If the pattern followed colour after the switch, the colour explanation would become more credible; if it followed position, the claim would need revision.",
        whatWorks: ["Synthesizes the repeated observations without expanding the claim too far", "Uses competing explanations to design a fairer test", "States evidence that could strengthen or challenge the explanation"],
        nextImprovement: "Plan how observations would be recorded consistently and consider whether time, weather, or different pollinators limit transfer to other settings.",
        teacherUseNote: "The extension is the transfer into test design, not the totals or vocabulary. Do not require this length when a labelled investigation plan shows the same reasoning more clearly.",
      },
    ],
  },
  {
    id: "inquiry-system-explanation",
    title: "Inquiry / System Explanation",
    subtitle: "Trace what happens, explain why, and admit what the classroom model leaves out",
    activityIds: ["packet-rescue", "signal-case", "science-expert-showcase", "pull-the-system-thread"],
    spacesEvidenceIds: ["spaces-mar-science", "spaces-june-minecraft"],
    sourceCapsule: {
      label: "Simplified Packet Rescue model",
      text: "A device splits one picture into six numbered packets. A router directs packets along an open route. The receiver gets 1, 2, 3, 5, and 6, notices packet 4 is missing, and requests it again. The server sends packet 4 so the receiver can reassemble the picture.",
    },
    prompt: "Explain how the parts work together when packet 4 is missing. Use a cause-and-effect chain, identify the repair, and name one limit of the model.",
    criteria: ["Parts and jobs", "Sequence", "Cause and effect", "Repair or feedback", "Model limitation"],
    copyGuard: "Packet Rescue is an intentionally simplified system. Students should use the same explanation moves with a new system, disruption, or evidence set before a proficiency decision is made.",
    teacherUse: [
      "Build the physical model first. The written examples explain an experienced system; they are not a substitute for acting, testing, observing, or drawing it.",
      "Highlight system verbs—splits, directs, checks, requests, resends, reassembles—rather than rewarding a list of part names.",
      "Invite a diagram, oral trace, physical teach-back, or written explanation. Require the same causal relationships in every format.",
    ],
    models: [
      {
        level: "Emerging",
        growthLabel: "Important parts are identified",
        sample: "The network has a server, router, device, and packets. Packet 4 is missing, so it gets sent again.",
        whatWorks: ["Names several important system parts", "Recognizes the disruption and repair"],
        nextImprovement: "Put the events in order and explain which part notices the missing packet, which part directs it, and why the picture cannot be rebuilt yet.",
        teacherUseNote: "Use role cards or arrows to externalize the sequence. The next move is a relationship among parts, not memorizing a longer definition.",
      },
      {
        level: "Developing",
        growthLabel: "Parts connect in a sequence",
        sample: "The device splits the picture into six packets. The router sends them on an open route. The receiver gets only five packets, notices number 4 is missing, and asks for it again. Then the server resends it.",
        whatWorks: ["Places the parts and their jobs in a logical order", "Explains the feedback that starts the repair"],
        nextImprovement: "Explain how the missing packet affects the output and name something the classroom role-play makes simpler than a real network.",
        teacherUseNote: "Ask the student to point to each causal arrow while reading or speaking. Listen for function, not perfect technical vocabulary.",
      },
      {
        level: "Proficient",
        growthLabel: "Cause, repair, output, and limit are visible",
        sample: "The sending device divides the picture into six numbered packets, and the router directs each packet along an open route. Because packet 4 does not arrive, the receiver can detect a gap in the sequence and cannot reassemble the complete picture. Its request causes the server to resend packet 4; once it arrives, the receiver checks the set and rebuilds the picture. Our model shows jobs and feedback clearly, but real packets may take different routes and the Internet uses many more devices and rules than our classroom line.",
        whatWorks: ["Explains how one disruption changes the system output", "Traces feedback and repair through the correct parts", "Names a meaningful limit of the classroom model"],
        nextImprovement: "Predict what would happen if one route closed, then test the prediction and revise the diagram using the result.",
        teacherUseNote: "This meets the intended explanation target. Transfer it by changing one condition rather than asking for more network vocabulary or a polished animation.",
      },
      {
        level: "Extending",
        growthLabel: "The explanation predicts and tests a new condition",
        sample: "Packet 4 is detectable because numbering lets the receiver compare what arrived with the expected set. A resend request creates feedback: the server sends the missing information, while the router can use an available route. I predict that closing one classroom route will slow or redirect delivery but will not prevent reassembly if another route stays open. The role-play suggests resilience, but it does not model congestion, packet corruption, security checks, or how routing decisions are actually calculated. I would test several closed-route patterns and record arrival order before changing the model.",
        whatWorks: ["Uses a system feature to explain how feedback is possible", "Makes a testable prediction about a new disruption", "Distinguishes evidence from the physical model and identifies several relevant limits"],
        nextImprovement: "Use an authoritative source to verify one real routing or error-checking mechanism, then label which parts of the revised model are evidence-based and which remain analogy.",
        teacherUseNote: "The extension is prediction, test, and model critique. Students can show it through a revised route map and short conference rather than matching this language.",
      },
    ],
  },
  {
    id: "creative-making-reflection",
    title: "Creative / Making Reflection",
    subtitle: "Show the test evidence, the revision it caused, and the thinking that belongs to the maker",
    activityIds: ["bloxels-game-studio", "cold-test-prototype", "audience-remix", "safer-impact-studio", "zoo-design-studio"],
    spacesEvidenceIds: ["spaces-jan-bloxels", "spaces-apr-zoo", "spaces-may-design"],
    prompt: "What did you create? What did a test or audience reveal? What meaningful change did you make, what did you contribute, and what would you improve next?",
    criteria: ["Purpose and contribution", "Specific test evidence", "Meaningful revision", "Reason for the change", "Honest next improvement"],
    copyGuard: "The forest game is one fictional model. Students use evidence from their own game, prototype, artwork, investigation, or design; production polish and access to materials are not proficiency criteria.",
    teacherUse: [
      "Show the before-and-after artifact beside the reflection. A claim that something improved needs visible test or audience evidence.",
      "Separate subject lenses: story revision can show ELA, usability testing can show ADST, and artistic intention can show Arts inside one shared artifact.",
      "Team products need individual contribution and reasoning evidence before assigning individual proficiency.",
      "Accept labelled photos, a short screen recording, audio, conference, diagram, or text. Do not require a second polished product for SpacesEDU.",
    ],
    models: [
      {
        level: "Emerging",
        growthLabel: "A creation and change are named",
        sample: "I helped make the forest level. The player got lost, so I added arrows. Next time I would make the ending clearer.",
        whatWorks: ["Names an individual contribution", "Connects one user problem to one change", "Identifies a next direction"],
        nextImprovement: "Describe where the player became lost and explain how the arrows changed the story or gameplay during a second test.",
        teacherUseNote: "This already contains the seed of iteration. Ask for one observable moment and result rather than a longer summary of everything the team built.",
      },
      {
        level: "Developing",
        growthLabel: "A test causes a purposeful revision",
        sample: "I built the first forest route and watched a new player stop at the river because they could not see the safe jump. I added two stepping stones and a sign. On the next try, the player crossed without help. I would improve the final message because it appears too quickly.",
        whatWorks: ["Uses a specific silent-test observation", "Explains a revision and evidence that usability changed", "Keeps a genuine next improvement visible"],
        nextImprovement: "Explain how the revision supports the project’s story or audience, and distinguish your contribution from the team’s shared work.",
        teacherUseNote: "Ask what the revision was meant to improve—access, story, challenge, accuracy, or another criterion. Do not equate a working game with complete reasoning.",
      },
      {
        level: "Proficient",
        growthLabel: "Evidence improves both meaning and use",
        sample: "Our goal was to make the forest feel risky without hiding the story path. I wrote the river scene and built its playable route. In the silent test, two players missed the journal clue and one could not tell the safe stepping stone from the water. I moved the clue before the river, shortened it to one readable line, and added a shape symbol as well as colour. In the second test, all three players found the clue and crossed without coaching. The symbol improved access, while moving the clue made the character’s choice clearer. I would next test whether the final scene shows the consequence of that choice.",
        whatWorks: ["Names purpose and individual contribution", "Uses precise audience evidence rather than opinion alone", "Explains meaningful story and access revisions and a focused next test"],
        nextImprovement: "Collect evidence from someone unfamiliar with the story and decide what result would show that the ending communicates the intended consequence.",
        teacherUseNote: "This is an expectation-level reflection because evidence drives revision. Students may demonstrate the same chain with two labelled screenshots and a 30–60 second audio response.",
      },
      {
        level: "Extending",
        growthLabel: "Testing transfers across audiences and constraints",
        sample: "I led the forest route and narrative clue. Our first test showed two different problems: experienced players rushed past the journal, while a new player stopped at a colour-only crossing. I separated the fixes—moving and shortening the clue for story pacing, then adding shape and sound cues for access—and recorded what each tester did in round two. The revisions helped both testers continue without coaching, but the sound cue cannot be the only route because devices may be muted. My next version would keep the shape cue, add a replayable clue, and test with someone who has not heard our explanation. The team’s art remains shared; my evidence is the route, clue revision, and test record.",
        whatWorks: ["Distinguishes different audience needs and tests targeted revisions", "Considers an access feature across a realistic device constraint", "Clarifies individual evidence inside a shared creative product"],
        nextImprovement: "Set one success criterion before the next test and explain how conflicting feedback will be weighed without trying to satisfy every preference.",
        teacherUseNote: "Extending means transfer, discrimination among evidence, and accountable trade-offs—not extra effects or a longer game. A concise design log can show the same depth.",
      },
    ],
  },
] as const satisfies readonly ProficiencyModelSet[];

export type ProficiencyModelSetId = (typeof proficiencyModelSets)[number]["id"];

export function proficiencyModelSetById(id: string): ProficiencyModelSet | null {
  return proficiencyModelSets.find((set) => set.id === id) ?? null;
}

export function proficiencyModelSetsForActivity(activityId: string): readonly ProficiencyModelSet[] {
  return proficiencyModelSets.filter((set) => (set.activityIds as readonly string[]).includes(activityId));
}

export function proficiencyModelSetsForSpacesEvidence(evidenceId: string): readonly ProficiencyModelSet[] {
  return proficiencyModelSets.filter((set) => (set.spacesEvidenceIds as readonly string[]).includes(evidenceId));
}
