import type { ProficiencyModelSet } from "./proficiency-models";

/** Short, task-specific ELA models. Each one leaves a visible next revision. */
export const elaProficiencyModelSets = [
  {
    id: "ela-source-mosaic-brief",
    title: "Source Mosaic Brief",
    subtitle: "Bring sources together without making them say more than they do",
    activityIds: ["semiahmoo-story-source-lab", "hook-cold-audience"],
    spacesEvidenceIds: [],
    sourceCapsule: { label: "Fictional practice sources", text: "A map marks a creek. A 1998 article describes pollution. A community notice explains a recent restoration day. None tells the whole story." },
    prompt: "What can the sources support together? Credit each source, name a gap, and choose one next question.",
    criteria: ["Clear focus", "Evidence from more than one source", "Sources credited", "Gap or limit named", "Useful next question"],
    copyGuard: "These practice sources are fictional. Use approved, Nation-specific sources for local learning, and never invent or retell cultural knowledge that a source does not share.",
    teacherUse: ["Show the source notes beside the final brief.", "Reward careful limits as well as strong claims.", "Accept writing, audio, a labelled visual, or a short conference."],
    models: [
      { level: "Emerging", growthLabel: "One source idea is present", sample: "The creek was polluted and people fixed it.", whatWorks: ["Names the topic", "Attempts a main idea"], nextImprovement: "Say which source supports each part and replace ‘fixed’ with what the evidence actually shows.", teacherUseNote: "Ask: Which words came from the source, and what is still unknown?" },
      { level: "Developing", growthLabel: "Two sources begin to connect", sample: "The 1998 article says the creek had pollution. The recent notice says volunteers planted along the bank. This suggests people are helping the creek.", whatWorks: ["Uses two credited source types", "Connects evidence to a cautious idea"], nextImprovement: "Add what the sources cannot prove and one question that would deepen the account.", teacherUseNote: "Keep ‘suggests’; it protects the difference between evidence and certainty." },
      { level: "Proficient", growthLabel: "Evidence, limit, and question work together", sample: "The map shows where the creek runs, the 1998 article records a pollution problem, and the recent notice documents one restoration action. Together they show a place changing through human choices. They do not prove the creek is now healthy. I would ask for current water data and community guidance about what should be shared.", whatWorks: ["Combines three sources for one focus", "Uses careful claim language", "Names a real limit and next source"], nextImprovement: "Explain why each source was made and how that purpose may shape what it includes.", teacherUseNote: "This meets the target; extra length is not required." },
      { level: "Extending", growthLabel: "Source purpose changes the interpretation", sample: "The article documents a problem, while the event notice is meant to invite action, so it highlights progress. The map locates the creek but says little about responsibility. I can support that pollution and restoration both occurred; I cannot judge the present condition. Current data and guidance from the specific community would help test the story.", whatWorks: ["Compares source purposes", "Separates support from uncertainty", "Plans an ethical next step"], nextImprovement: "Ask whose perspective is still missing and whether you have permission to share the resulting account.", teacherUseNote: "Extending means better judgment about sources, not more complicated vocabulary." },
    ],
  },
  {
    id: "ela-character-council",
    title: "Character Council Recommendation",
    subtitle: "Use the text, hear another view, and revise when evidence matters",
    activityIds: ["character-council", "three-voices"],
    spacesEvidenceIds: [],
    sourceCapsule: { label: "Fictional scene", text: "Mara can reveal a friend’s mistake now or ask the friend to repair it first. The mistake has already affected the team." },
    prompt: "What should the character do? Use exact story evidence, answer a fair counterargument, and state what could change your mind.",
    criteria: ["Clear recommendation", "Exact text evidence", "Reasoning explained", "Counterargument answered fairly", "Revision or uncertainty visible"],
    copyGuard: "Mara is fictional. Change the character and scene before students make independent evidence; do not require personal disclosure.",
    teacherUse: ["Read the scene before showing the models.", "Invite two defensible answers.", "Assess evidence and revision, not agreement with the teacher."],
    models: [
      { level: "Emerging", growthLabel: "A choice is made", sample: "Mara should tell because lying is bad.", whatWorks: ["Makes a clear choice", "Gives a starting reason"], nextImprovement: "Point to one detail in the scene and explain how it supports the choice.", teacherUseNote: "Ask for a line, action, or consequence from the text." },
      { level: "Developing", growthLabel: "Text evidence supports the choice", sample: "Mara should ask the friend to repair the mistake first because the scene says the friend admitted it and wanted to help.", whatWorks: ["Uses a scene detail", "Connects evidence to a recommendation"], nextImprovement: "Address the risk that waiting may harm the team and say when Mara should change course.", teacherUseNote: "Offer a sentence stem: Some readers may argue…" },
      { level: "Proficient", growthLabel: "The recommendation survives a counterargument", sample: "Mara should give the friend one immediate chance to repair the mistake because the friend admits it and has a workable plan. Someone could argue that the team deserves the truth now. I agree if the repair is delayed or hides the harm, so Mara should set a short deadline and tell the team if it is missed.", whatWorks: ["Uses evidence precisely", "Treats the other view fairly", "Names a condition that could change the decision"], nextImprovement: "Compare how another character’s position changes what they notice in this choice.", teacherUseNote: "This is sufficient evidence even if delivered orally." },
      { level: "Extending", growthLabel: "Perspective and consequences reshape the claim", sample: "Mara’s private conversation protects a chance to repair, but a teammate already carrying the cost may see silence as another unfair choice. I would recommend a brief repair window plus an honest update to affected teammates. If the mistake created a safety risk, I would skip the private window and seek help now.", whatWorks: ["Weighs different positions", "Adjusts the choice to consequences", "Sets a clear boundary to the claim"], nextImprovement: "Test whether the recommendation still works after one key fact in the scene changes.", teacherUseNote: "Extending is flexible reasoning, not a longer speech." },
    ],
  },
  {
    id: "ela-story-blueprint",
    title: "Playable Story Blueprint",
    subtitle: "Make the whole story clear before adding polish",
    activityIds: ["turning-point-remix", "bloxels-story-blueprint", "impossible-scene-repair"],
    spacesEvidenceIds: [],
    sourceCapsule: { label: "Fictional practice route", text: "A courier crosses a flooded town to deliver medicine. The first plan has obstacles, but no clear turning point or ending consequence." },
    prompt: "Show the complete route: character, setting, problem, choices, turning point, ending, and the clue that helps an audience understand each part.",
    criteria: ["Whole organizer complete", "Cause and effect clear", "Turning point matters", "Ending follows choices", "Test evidence leads to revision"],
    copyGuard: "The courier route is a practice example. Students create and decorate their own complete organizer before building or publishing.",
    teacherUse: ["Compare structure before artistic polish.", "Ask a partner to follow the organizer without coaching.", "Credit drawing, oral labels, symbols, and written routes equally when the story is clear."],
    models: [
      { level: "Emerging", growthLabel: "A character and problem appear", sample: "A courier goes through water and wins. I drew the route.", whatWorks: ["Introduces a character", "Shows a starting problem"], nextImprovement: "Complete every organizer section and show a choice that causes the ending.", teacherUseNote: "Use the organizer boxes as a checklist, one at a time." },
      { level: "Developing", growthLabel: "The route has a beginning, middle, and end", sample: "The courier must choose the bridge or the hill. The bridge breaks, so the courier turns back and uses the hill. The medicine arrives.", whatWorks: ["Includes a meaningful choice", "Shows cause and effect", "Reaches an ending"], nextImprovement: "Add the character’s reason, a turning-point clue, and one tester’s confusion or success.", teacherUseNote: "Ask why the choice matters to the character, not only the player." },
      { level: "Proficient", growthLabel: "A complete route communicates without coaching", sample: "The courier chooses the shorter bridge because the medicine is urgent. A rising-water marker warns that the bridge may fail. When it breaks, the courier gives up a supply bag to climb the safe hill route. A cold tester missed the water marker, so I moved it before the choice and added a shape symbol. The ending shows both the delivery and the cost.", whatWorks: ["Completes the full story organizer", "Links choice, turning point, and consequence", "Uses tester evidence for a clear revision"], nextImprovement: "Test whether the ending communicates the main idea to someone new.", teacherUseNote: "The finished, decorated organizer is the core evidence; a digital build is optional." },
      { level: "Extending", growthLabel: "Form, audience, and trade-off are tested", sample: "Two testers understood the urgent choice, but one thought losing the bag was a punishment rather than a sacrifice. I added an earlier supply count and a final image of the town receiving medicine. The route is still short enough to play, while the consequence is clearer.", whatWorks: ["Distinguishes two audience readings", "Revises a specific communication problem", "Balances story meaning with playable length"], nextImprovement: "Change the form or narrator and decide which story truth must remain.", teacherUseNote: "Extending is purposeful revision across an audience constraint, not more levels or effects." },
    ],
  },
] as const satisfies readonly ProficiencyModelSet[];
