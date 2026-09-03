/**
 * A student-language layer for lesson renderers.
 *
 * Reviewed contracts are written as complete Grade 6 directions. Unreviewed
 * generic lessons are built from their student-facing experience fields using
 * whole phrases and sentence boundaries—not one-word grammatical rewrites.
 * A final neutral fallback keeps malformed or incomplete data usable.
 */

import { pheStudentLessonContracts } from "./student-lesson-contracts-phe";
import { careerStudentLessonContracts } from "./student-lesson-contracts-career";
import { elaStudentLessonContracts } from "./student-lesson-contracts-ela";
import { mathStudentLessonContracts } from "./student-lesson-contracts-math";

export type StudentReadinessKind = "none" | "quick" | "teach";

export type StudentSaveActionKind =
  | "keep-in-class"
  | "add-to-existing-post"
  | "new-post";

export type StudentLessonChoice = {
  prompt: string;
  options: readonly {
    label: string;
    detail?: string;
  }[];
};

export type StudentLessonStep = {
  title: string;
  action: string;
  finishCheck: string;
  minutes?: string;
};

export type StudentLessonContract = {
  id: string;
  reviewState: "reviewed" | "safe-fallback";
  challenge: string;
  why: string;
  firstAction: string;
  materials: readonly string[];
  choices: readonly StudentLessonChoice[];
  steps: readonly StudentLessonStep[];
  finishEvidence: readonly string[];
  saveAction: {
    kind: StudentSaveActionKind;
    message: string;
  };
  readiness: StudentReadinessKind;
};

/** The student-facing subset of ProgramExperience used by the safe builder. */
export type StudentLessonExperienceSource = {
  id: string;
  question: string;
  studentMission: string;
  steps: readonly string[];
  product: string;
  materials: readonly string[];
  learningModes: readonly string[];
  lookFors: readonly string[];
  spacesUse: "none" | "optional" | "required";
};

const reviewedStudentLessonContracts = {
  "ordinary-object-story": {
    id: "ordinary-object-story",
    reviewState: "reviewed",
    challenge: "How can visible clues in one ordinary object help a group build a story a listener can follow?",
    why: "Storytellers choose exact details, put events in a clear order, listen for where an audience gets lost, and revise so the story becomes easier to picture and follow.",
    firstAction: "Choose one object image with a partner. Before anyone invents, take turns pointing to five details everyone can truly see.",
    materials: ["Shared object-image gallery", "Notebook or scrap paper", "Three-beat listener map", "Pencil", "Optional teacher-managed recorder for one class capture"],
    choices: [
      {
        prompt: "Which safe story route will you use?",
        options: [
          { label: "Completely fictional", detail: "Invent the people, place, history, and problem while keeping visible clues accurate." },
          { label: "Observation only", detail: "Describe the object closely and build questions without inventing a history." },
          { label: "Optional connection", detail: "Connect to an experience only if you choose. A private or personal story is never required." },
        ],
      },
    ],
    steps: [
      { title: "Choose + notice", action: "With a partner, choose one object image and list five visible clues before inventing anything.", finishCheck: "Both partners can point to every clue in the image and separate it from an invented idea." },
      { title: "Build three beats", action: "Plan a beginning, a turn that uses one visible clue, and an ending that connects to the turn.", finishCheck: "A partner can name the beginning, turn, and ending from the plan." },
      { title: "Tell + map", action: "Storyteller A tells for 60–90 seconds without reading a script. Listener B maps the three beats and waits until the telling ends.", finishCheck: "The listener can retell the sequence and point to one exact place that was especially clear or confusing." },
      { title: "Question + retell", action: "The listener asks one precise clarity question. The storyteller adds the needed detail and tells the story again.", finishCheck: "The second telling answers the listener's question without adding unrelated length." },
      { title: "Swap + compare", action: "Switch roles with a different object. Then join another pair and compare how two stories used visible clues differently.", finishCheck: "Everyone has told, listened, asked a question, and explained one different story choice." },
      { title: "Write the seed", action: "Independently turn your clearest telling into six sentences: two for the beginning, two for the turn, and two for the ending.", finishCheck: "The six sentences keep a clear sequence and one revised detail from the oral practice." },
    ],
    finishEvidence: ["Five visible clues", "A 60–90 second story with a beginning, turn, and connected ending", "A listener's three-beat map and one precise question", "A clearer retell", "A six-sentence written seed"],
    saveAction: { kind: "keep-in-class", message: "Keep the story seed in your ELA folder. You may choose it later as part of the September Learning Story; no separate upload is required." },
    readiness: "teach",
  },
  "magnitude-gallery": {
    id: "magnitude-gallery",
    reviewState: "reviewed",
    challenge: "Where does a number belong when the number line changes size?",
    why: "We are learning to read a number line from its endpoints and equal jumps. The number stays the same when the scale changes, but its spot on the line can move.",
    firstAction: "Open Tiny decimals on the 0-to-1 line. Choose one card, read both endpoints, and work out the value of one equal jump.",
    materials: ["The shared on-screen number line", "Board or paper", "Pencils and colours", "Optional number cards"],
    choices: [
      {
        prompt: "How will you make your first prediction?",
        options: [
          { label: "Point or vote", detail: "Choose section 1–10 before the teacher reveals the marker." },
          { label: "Sketch it", detail: "Draw the endpoints and ten equal jumps, then mark your prediction." },
          { label: "Say it", detail: "Tell a partner which section you chose and why." },
        ],
      },
    ],
    steps: [
      {
        title: "Read the line",
        action: "Start with Tiny decimals and the 0-to-1 scale. Choose one card. Read 0, 1, and the value of one jump.",
        finishCheck: "You can say what each small section is worth before placing the card.",
        minutes: "5–8 min",
      },
      {
        title: "Predict + reveal",
        action: "Point, vote, or sketch the section where the card belongs. Reveal its exact spot and repair your idea if needed.",
        finishCheck: "Your explanation names the number, both endpoints, and a useful jump or benchmark.",
        minutes: "8–10 min",
      },
      {
        title: "Change only the scale",
        action: "Keep the same card. Choose a new endpoint button, predict again, and reveal. Repeat once more.",
        finishCheck: "You can explain: ‘The number stayed __. The endpoint changed from __ to __, so its spot __.’",
        minutes: "10–12 min",
      },
      {
        title: "Try a giant number",
        action: "Open Millions or Up to a billion. Choose one card and repeat the read, predict, reveal, and scale-change routine.",
        finishCheck: "Your group uses the endpoint and equal jumps instead of guessing from the number of digits.",
        minutes: "10–12 min",
      },
      {
        title: "Show what changed",
        action: "Draw the same number on two equal-length lines with different endpoints. Add one sentence explaining why its spot changed.",
        finishCheck: "A classmate can read both scales and understand that the number did not change.",
        minutes: "12–15 min",
      },
    ],
    finishEvidence: [
      "One tested decimal prediction",
      "The same number tested on two different scales",
      "One tested millions-or-billions prediction",
      "A two-line drawing and a plain sentence that explains what changed",
    ],
    saveAction: {
      kind: "keep-in-class",
      message: "Keep the comparison in your Math folder. No SpacesEDU post is needed.",
    },
    readiness: "teach",
  },
  "pattern-forecast": {
    id: "pattern-forecast",
    reviewState: "reviewed",
    challenge: "Can you jump to Stage 10 without building every stage?",
    why: "A rule lets you predict a faraway stage and prove why the pattern keeps growing.",
    firstAction: "Choose one forest trail. Then build its missing Stage 4.",
    materials: ["Everything needed is in the on-screen Pattern Forest"],
    choices: [
      {
        prompt: "How will you enter and explain your thinking?",
        options: [
          { label: "Use the + and − buttons", detail: "Change the Stage 4 count one at a time." },
          { label: "Type the count", detail: "Enter the Stage 4 count directly." },
          { label: "Say or write your proof", detail: "Explain why the rule reaches Stage 10." },
        ],
      },
    ],
    steps: [
      {
        title: "Build Stage 4",
        action: "Use the first three stage cards to build the missing Stage 4 count.",
        finishCheck: "The on-screen trail verifies your Stage 4 count.",
      },
      {
        title: "Name the change",
        action: "Choose the amount added from one stage to the next.",
        finishCheck: "The same change works between every pair of shown stages.",
      },
      {
        title: "Test the rule",
        action: "Choose a rule and test it on Stage 3.",
        finishCheck: "The rule produces the Stage 3 count shown on the trail.",
      },
      {
        title: "Predict Stage 10",
        action: "Use the tested rule to predict Stage 10 without building every stage.",
        finishCheck: "The trail verifies the prediction and opens your evidence card.",
      },
    ],
    finishEvidence: [
      "A verified Stage 4 count",
      "The constant change and a rule tested on Stage 3",
      "A verified Stage 10 prediction",
      "One trail evidence card with your model, table, rule, prediction, and proof sentence",
    ],
    saveAction: {
      kind: "keep-in-class",
      message: "Keep this in your Math folder. Mr. Wyatt will tell you if it belongs in SpacesEDU.",
    },
    readiness: "quick",
  },
  "source-mosaic": {
    id: "source-mosaic",
    reviewState: "reviewed",
    challenge: "How could a school make a hot paved outdoor area cooler and more welcoming?",
    why: "Different source types answer different questions. Combining them helps us suggest a response without pretending we know more than the evidence shows.",
    firstAction: "Open Source 1. Read the temperature table and choose the statement it actually supports.",
    materials: ["On-screen Source Mosaic lab or printed Static Source Pack", "Plain paper or notebook for the offline route"],
    choices: [{
      prompt: "How will the class respond?",
      options: [
        { label: "Vote on screen", detail: "Choose an answer, then explain which source detail supports it." },
        { label: "Talk with a partner", detail: "Agree on one source detail before the class votes." },
        { label: "Point to the evidence", detail: "Use the table, map, voices, or guide without needing to speak." },
      ],
    }],
    steps: [
      { title: "Meet four source types", minutes: "20–25 min", action: "Inspect the temperature data, labelled site map, student voice excerpts, and public explanation.", finishCheck: "The class can name one useful job for each source type." },
      { title: "Match each job", minutes: "8–10 min", action: "Match each source type to the question it answers best.", finishCheck: "All four source jobs are verified on screen." },
      { title: "Choose evidence", minutes: "8–10 min", action: "Select useful evidence from at least two different source types.", finishCheck: "The evidence tray contains two source types that help answer the question." },
      { title: "Build a careful claim", minutes: "8–10 min", action: "Choose the recommendation that fits the selected evidence without making a guarantee.", finishCheck: "The claim responds to both heat and how people need to use the space." },
      { title: "Name what is missing", minutes: "8–10 min", action: "Choose the missing information, voice, or safety check needed before a permanent change, then share the brief.", finishCheck: "The final brief includes an honest limit and a next evidence step." },
    ],
    finishEvidence: ["Four matched source jobs", "Useful evidence from at least two source types", "A careful solutionary recommendation", "One honest limit and next evidence step"],
    saveAction: { kind: "keep-in-class", message: "Use this as practice for a larger inquiry. No separate SpacesEDU post is needed." },
    readiness: "none",
  },
  "geometry-field-lab": {
    id: "geometry-field-lab",
    reviewState: "reviewed",
    challenge: "Can your eyes tell an angle exactly—or do you need measurement evidence?",
    why: "Designers, builders, artists, athletes, and game makers use angles to control direction, fit, balance, and movement.",
    firstAction: "Look at the two rays and find the point where they meet. That point is the vertex.",
    materials: ["Everything needed is in the on-screen Angle Expedition"],
    choices: [{
      prompt: "Which build will the class scan?",
      options: [
        { label: "Skate ramp", detail: "Estimate and measure a 45° ramp angle." },
        { label: "Gaming stand", detail: "Test whether the stand forms a right angle." },
        { label: "Solar brace", detail: "Measure a wide obtuse angle in a structure." },
      ],
    }],
    steps: [
      { title: "Learn the angle parts", action: "Identify the vertex and two rays, then compare 45°, 90°, and 180° benchmark angles.", finishCheck: "You can point to the opening being measured—not the length of either ray." },
      { title: "Estimate a familiar build", action: "Choose a build and decide which benchmark angle it is closest to.", finishCheck: "The estimate is verified before any exact measurement appears." },
      { title: "Line up the protractor", action: "Put the protractor centre on the vertex and line up 0° with the starting ray.", finishCheck: "Both alignment checks are verified on screen." },
      { title: "Measure and classify", action: "Read the correct scale and classify the angle as acute, right, or obtuse.", finishCheck: "The measurement and classification agree." },
      { title: "Build from rules", action: "Choose the triangle that matches every stated side and angle rule.", finishCheck: "The evidence board verifies each rule instead of relying on appearance." },
    ],
    finishEvidence: ["A benchmark estimate", "A correctly aligned protractor", "An exact angle measurement and classification", "A triangle selected and verified from its rules"],
    saveAction: { kind: "keep-in-class", message: "Use the on-screen evidence as practice. No upload is needed." },
    readiness: "none",
  },
  "rights-in-tension": {
    id: "rights-in-tension",
    reviewState: "reviewed",
    challenge: "How can a city make a fair decision when one shared place affects people in different ways?",
    why: "Rules for shared places affect real people differently. A fair process listens, uses evidence, explains the choice, and checks whether it worked.",
    firstAction: "Look at Juniper Park at night. Before you choose a side, predict who might be affected by a new closing rule.",
    materials: ["One shared projector", "Paper or sticky notes", "Pencils and colours", "Optional printed voice and clue cards"],
    choices: [
      {
        prompt: "How will your class make its thinking visible?",
        options: [
          { label: "Talk and point", detail: "Build the evidence wall together on the shared screen." },
          { label: "Paper notes", detail: "Write or draw one fact, question, voice, or improvement." },
          { label: "Move or signal", detail: "Show a first choice, then change when new evidence changes your mind." },
        ],
      },
    ],
    steps: [
      {
        title: "Who lives with the decision?",
        action: "Meet the fictional Juniper Park night-court decision. Predict and reveal how four groups could be affected before deciding what you think.",
        finishCheck: "The class can name more than one group and one effect the rule could have on each.",
      },
      {
        title: "Hear the park",
        action: "Read four community voices fairly. Sort the clues into what we know, what we need to ask, and who we still need to hear.",
        finishCheck: "The evidence wall has a fact, an unanswered question, and a voice the city must include.",
      },
      {
        title: "Make a starting plan stronger",
        action: "Compare three city plans. Choose one the class can defend and question, then add one change that makes it fairer.",
        finishCheck: "The class can say who the plan helps, what might still go wrong, and how its improvement helps.",
      },
      {
        title: "Speak to council",
        action: "Choose one supporting fact and one check-back plan. Build a 30-second class recommendation, then improve one sentence on paper.",
        finishCheck: "The recommendation names a plan, a reason from the case, and a way the city will check and revise the rule.",
      },
    ],
    finishEvidence: [
      "A whole-class impact picture",
      "An evidence wall of facts, questions, and voices",
      "A starting plan plus one fairness improvement",
      "A short council recommendation with evidence and a real check-back",
    ],
    saveAction: {
      kind: "keep-in-class",
      message: "Keep the class recommendation as practice for the later civic decision brief. No separate upload is needed.",
    },
    readiness: "none",
  },
  "place-soundwalk": {
    id: "place-soundwalk",
    reviewState: "reviewed",
    challenge: "What can one small part of our school grounds tell us when we slow down and notice?",
    why: "Exact sounds, movement, texture, colour, and light can help an audience experience a place. Careful observers also separate what they noticed from what they inferred or wondered.",
    firstAction: "At your assigned station, listen or look quietly for 20 seconds. Record three exact details before explaining what any of them might mean.",
    materials: ["Clipboard or notebook", "Pencil", "Teacher-marked observation stations", "Indoor-window, seated, or photo route when needed", "Optional classroom objects for a soundscape"],
    choices: [{
      prompt: "How will you help an audience experience the place?",
      options: [
        { label: "100-word place postcard", detail: "Select exact sensory details and shape them into one short piece of writing." },
        { label: "45-second soundscape", detail: "Use voice, body percussion, silence, or safe classroom objects with a clear beginning, change, and ending." },
        { label: "Labelled visual route", detail: "Use a teacher-provided photo or window view and label the details an audience should notice in order." },
      ],
    }],
    steps: [
      { title: "Enter the station", action: "Review the boundary, movement route, signal, and observation position with your group.", finishCheck: "Everyone can name the safe boundary and one way to participate from the station." },
      { title: "Collect exact details", action: "Record at least five details across sound, movement, texture, colour, or light. Use small sketches when a word is not enough.", finishCheck: "Each detail points to something you truly heard, saw, or felt at the station." },
      { title: "Sort the thinking", action: "Mark each note O for observation, I for inference, or W for wonder. Revise any inference that sounds like a proven fact.", finishCheck: "A partner can tell which notes are evidence and which are ideas or questions." },
      { title: "Create for an audience", action: "Build the postcard, soundscape, or labelled visual route. Choose only the details that help the audience notice one small part of the place.", finishCheck: "The piece has a clear focus instead of becoming a list of everything you recorded." },
      { title: "Test + revise", action: "Share with a partner. Ask which detail made the place most vivid and where the audience got lost. Revise one line, sound, silence, or label.", finishCheck: "You can point to the revision and explain how the partner response changed it." },
    ],
    finishEvidence: ["Five exact field-note details", "Observation separated from inference and wonder", "A focused place postcard, soundscape, or labelled visual route", "One revision caused by audience feedback"],
    saveAction: { kind: "keep-in-class", message: "Keep this with the September learning-with-place work. No separate SpacesEDU post is needed." },
    readiness: "none",
  },
  "four-arts-languages": {
    id: "four-arts-languages",
    reviewState: "reviewed",
    challenge: "What can pictures, sounds, drama, and movement each help an audience notice?",
    why: "We are learning one useful technique in each Arts area, then choosing two areas to combine in a short original work.",
    firstAction: "Complete the visual-art page. Use contrast to make two parts look different and emphasis to show what the audience should notice first.",
    materials: ["Four teacher-selected mentor examples", "Complete four-part Arts folio", "Pencil, eraser, and colour tools", "Safe sound objects or instruments", "Open, seated, or tabletop performance space"],
    choices: [{
      prompt: "How will you share the two-form work?",
      options: [
        { label: "Live", detail: "Perform a short sound, drama, or movement piece with a visual part." },
        { label: "Tabletop", detail: "Use small figures, cards, drawings, and a sound or movement score." },
        { label: "Mini display", detail: "Arrange visual work with written sound, drama, or movement directions." },
      ],
    }],
    steps: [
      { title: "Make an image", action: "Complete the visual-art page. Use contrast to make two parts look different and emphasis to show what the audience should notice first.", finishCheck: "The whole section is complete, and a partner can point to the part you meant them to notice first." },
      { title: "Make a sound score", action: "Complete the music page. Draw and perform a 20-second score that uses a clear rhythm and at least one planned silence.", finishCheck: "Another group can follow the complete score from start to finish." },
      { title: "Make a drama picture", action: "Complete the drama page. Draw a before and after tableau that changes the audience's focus by changing body level.", finishCheck: "The two complete pictures show a clear change without anyone needing to explain it." },
      { title: "Make a movement phrase", action: "Complete the movement page. Draw an eight-count pathway and show where the timing becomes faster, slower, or still.", finishCheck: "Someone can follow all eight counts safely from your score." },
      { title: "Combine + improve", action: "Combine two finished pages into a short work. Ask what the audience noticed, revise one Arts choice, and purposefully decorate every folio section.", finishCheck: "All four folio sections are complete and purposefully decorated, the combined work has a clear beginning and ending, and the revision is visible." },
    ],
    finishEvidence: ["A complete and purposefully decorated four-part Arts folio", "One visual-art technique in use", "A playable graphic sound score", "A full tableau and movement plan", "A two-form work with audience feedback and one visible revision"],
    saveAction: { kind: "keep-in-class", message: "Keep the complete folio and revision in your Arts folder. No separate SpacesEDU post is needed." },
    readiness: "teach",
  },
  "map-what-maps-miss": {
    id: "map-what-maps-miss",
    reviewState: "reviewed",
    challenge: "How can an artwork help people notice a place in a new way?",
    why: "We are learning to use line, shape, colour, texture, space, contrast, and symbols to show what we observed while keeping facts, ideas, and questions separate.",
    firstAction: "Complete the artist card: creator, title, place, one fact from the source, one detail you can see, and one question. Write ‘not stated’ instead of guessing.",
    materials: ["Teacher-selected local artwork or artist video", "Complete place-art organizer", "Map or teacher-provided place evidence", "Large paper", "Drawing, collage, and colour tools"],
    choices: [{
      prompt: "How will you build the place artwork?",
      options: [
        { label: "Draw + colour", detail: "Layer drawing, colour, texture, and labels." },
        { label: "Collage", detail: "Arrange cut or torn shapes with original drawing and labels." },
        { label: "Mixed materials", detail: "Combine drawing, collage, rubbings, or safe reused materials." },
      ],
    }],
    steps: [
      { title: "Meet the artwork", action: "Complete the artist card: creator, title, place, one fact from the source, one detail you can see, and one question. Write ‘not stated’ instead of guessing.", finishCheck: "The creator and source are credited, and your possible meaning is not written as a proven fact." },
      { title: "Try visual techniques", action: "Complete the technique strip. Try contrast and emphasis first, then test line, shape, colour or value, texture, and open space.", finishCheck: "The whole technique page is complete and facts remain separate from possible meanings." },
      { title: "Notice the place", action: "Complete every place-observation box. Keep source facts, direct observations, your artistic ideas, and unknowns in separate parts.", finishCheck: "Every organizer part has useful detail and its correct label." },
      { title: "Make the artwork", action: "Make the full layered artwork and four-part legend. Add one original symbol or visual metaphor from your own observation; do not copy the mentor artist's cultural imagery or style.", finishCheck: "The artwork fills the planned space, the symbol is your own, and the legend helps a viewer read it." },
      { title: "Respond + revise", action: "Ask what a viewer notices first. Revise one contrast, emphasis, or symbol choice, then finish and purposefully decorate the whole organizer.", finishCheck: "The whole organizer is complete and purposefully decorated, and the before-and-after change is easy to find." },
    ],
    finishEvidence: ["A complete artist-and-source box", "Every place-observation box completed", "A layered place artwork using at least three visual techniques", "An original symbol and clear key", "Viewer feedback and one visible revision"],
    saveAction: { kind: "keep-in-class", message: "Keep the complete organizer and artwork in your Arts folder. Your teacher may later choose one image for an existing place-learning post." },
    readiness: "quick",
  },
  "same-facts-frame": {
    id: "same-facts-frame",
    reviewState: "reviewed",
    challenge: "Can another group perform your music by reading your marks?",
    why: "We are learning how beat, rhythm, sound colour, loud and quiet changes, repetition, and silence can be shown in a graphic music score.",
    firstAction: "Listen to the chosen music twice. Complete every listening box with something you can actually hear.",
    materials: ["Teacher-selected music or performance video", "Complete listening-and-score organizer", "Large paper and markers", "Voice, body percussion, safe found sounds, or classroom instruments"],
    choices: [{
      prompt: "Which sounds will you score?",
      options: [
        { label: "Voice + body", detail: "Use voice, claps, taps, snaps, or other safe body percussion." },
        { label: "Objects + instruments", detail: "Use approved classroom objects or instruments." },
        { label: "Mixed group", detail: "Combine two or more sound types, with a visual cue role available." },
      ],
    }],
    steps: [
      { title: "Listen like a musician", action: "Listen to the chosen music twice. Complete every listening box with something you can actually hear.", finishCheck: "Each answer names something that can actually be heard in the music." },
      { title: "Try the techniques", action: "Try the focus pair: make one clear rhythm and place one planned silence. Then change the sound type, volume, or number of layers.", finishCheck: "Your group can repeat the short pattern the same way twice." },
      { title: "Draw the whole score", action: "Draw the whole 30–45 second score with a key, timeline, start, rhythm, silence, change, and clear ending.", finishCheck: "Every organizer section is complete and a new group can start and finish without coaching." },
      { title: "Trade scores", action: "Trade scores. Let a new group perform without coaching and record where its members pause or disagree.", finishCheck: "The notes describe one clear part and one confusing part." },
      { title: "Improve + perform", action: "Revise the score, perform it again, and purposefully finish the whole organizer with one musical choice and one next improvement.", finishCheck: "The revision fixes a problem the performers actually found, and you can name one musical choice that still works well." },
    ],
    finishEvidence: ["A complete listening organizer", "A repeatable technique pattern", "A complete, readable, and purposefully decorated graphic score", "A first performance test", "A revised score and short composer explanation"],
    saveAction: { kind: "keep-in-class", message: "Keep the score, performer note, and revision in your Arts folder. No SpacesEDU post is needed." },
    readiness: "teach",
  },
  "rights-in-thirty": {
    id: "rights-in-thirty",
    reviewState: "reviewed",
    challenge: "How can actors and movers show that a situation changes?",
    why: "We are learning to use focus, body level, distance, gesture, timing, pathway, and energy so an audience can see a before, a change, and an after.",
    firstAction: "Watch the chosen drama or movement clip. Notice how focus and body level, or pathway and timing, change between two moments.",
    materials: ["Teacher-selected drama or movement example", "Fictional situation cards", "Complete six-frame storyboard and movement score", "Open, seated, hand-only, readers' theatre, or tabletop space"],
    choices: [{
      prompt: "Choose a safe way to show the scene:",
      options: [
        { label: "Tableau", detail: "Use three frozen pictures with one planned transition." },
        { label: "Narrated scene", detail: "Use simple action with a narrator; no personal stories are needed." },
        { label: "Storyboard", detail: "Draw all six frames and present them with movement and sound directions." },
      ],
    }],
    steps: [
      { title: "Notice the techniques", action: "Watch the chosen drama or movement clip. Notice how focus and body level, or pathway and timing, change between two moments.", finishCheck: "You can point to at least two visible changes and name the technique used." },
      { title: "Meet the situation", action: "Read one safe fictional case. Name the barrier and possible repair, then compare a tableau sequence, narrated scene, and readers' theatre.", finishCheck: "The plan is fictional and safe, and you can explain the three form choices." },
      { title: "Build three moments", action: "Choose one form. Complete the before and after pictures using focus and body level to guide the audience.", finishCheck: "Someone can put the complete moments in order without hearing an explanation." },
      { title: "Connect the moments", action: "Complete the change between them. Use a clear pathway and timing, with optional sound or silence.", finishCheck: "No frame or count is blank, and everyone has a safe way to take part." },
      { title: "Show + revise", action: "Show the whole scene or storyboard. Record what the audience understood, revise one Arts choice, and purposefully finish every organizer frame.", finishCheck: "The organizer is complete and purposefully decorated, the audience understands the change, and the revised choice is visible." },
    ],
    finishEvidence: ["A safe fictional situation plan", "A complete before-change-after sequence", "All six storyboard frames or the whole movement score", "At least three named drama or dance techniques", "Audience evidence and one visible revision"],
    saveAction: { kind: "keep-in-class", message: "Keep the full storyboard or score in your Arts folder. It may support Social Studies, but it does not need a separate post." },
    readiness: "teach",
  },
  "audience-remix": {
    id: "audience-remix",
    reviewState: "reviewed",
    challenge: "What does an audience notice first, and what one change could make your idea clearer?",
    why: "We are learning how spacing, order, contrast, pacing, sound, labels, and an entry point guide an audience through art.",
    firstAction: "Study the two sample displays. Notice how sequence and spacing change where the audience starts and what it sees next.",
    materials: ["Two curator examples", "Current artwork or supplied mini-artifact", "Complete before-and-after curation organizer", "No-name audience observation card", "Flexible display materials"],
    choices: [{
      prompt: "What will the audience experience?",
      options: [
        { label: "Visual display", detail: "Arrange artwork, objects, spacing, and labels." },
        { label: "Sound or performance", detail: "Plan the order, audience position, timing, and ending." },
        { label: "Tabletop version", detail: "Use a small complete model when space or performance is not a good fit." },
      ],
    }],
    steps: [
      { title: "Study the example", action: "Study the two sample displays. Notice how sequence and spacing change where the audience starts and what it sees next.", finishCheck: "You can name at least two exact choices and their effect." },
      { title: "Arrange the first version", action: "Choose the Night Garden mini-artifact or a current work. Complete the first arrangement and show the intended audience path.", finishCheck: "Every planning box is filled and a visitor can tell where to begin." },
      { title: "Watch without coaching", action: "Let a new viewer begin without coaching. Record the first notice, route, pause, and question without names or ratings.", finishCheck: "The notes describe audience actions instead of judging the person." },
      { title: "Change + compare", action: "Change the sequence, spacing, or one other Arts choice. Test the changed part again and compare the two records.", finishCheck: "The second test shows whether the change helped." },
      { title: "Finish the organizer", action: "Complete and purposefully decorate the whole before-and-after organizer, including what improved and what you would try next.", finishCheck: "The whole organizer is complete and purposefully decorated, and one next improvement remains." },
    ],
    finishEvidence: ["A clear audience goal", "A complete first curation plan", "A no-name audience observation", "One important Arts revision", "A complete before-and-after organizer with one next improvement"],
    saveAction: { kind: "keep-in-class", message: "Keep the before-and-after evidence in your Arts folder. Add it to another class post only if your teacher asks." },
    readiness: "quick",
  },
  "cosmic-scale-gallery": {
    id: "cosmic-scale-gallery",
    reviewState: "reviewed",
    challenge: "How can pattern, light, sound, or movement change the way an audience experiences a space?",
    why: "We are learning to test Arts techniques, choose a clear idea, make one complete work, and improve how the audience enters and follows it.",
    firstAction: "Complete both artist cards: creator, title, context, one technique you notice, one possible meaning, and one question.",
    materials: ["Two teacher-selected artist examples", "Complete technique-and-project folio", "Paper, card, reused materials, line, and safe lights", "Safe sound objects or instruments", "Open, seated, or tabletop space"],
    choices: [{
      prompt: "Choose a main Arts route:",
      options: [
        { label: "Pattern + light", detail: "Create a visual, shadow, colour, or moving-form work." },
        { label: "Sound", detail: "Create a short soundscape or graphic-score performance." },
        { label: "Movement + drama", detail: "Create a safe live, seated, hand-only, or tabletop sequence." },
        { label: "Mixed", detail: "Combine two routes only after both small trials work." },
      ],
    }],
    steps: [
      { title: "Meet the artists", action: "Complete both artist cards: creator, title, context, one technique you notice, one possible meaning, and one question.", finishCheck: "Both sources are credited and every observation points to something visible or audible." },
      { title: "Try four techniques", action: "Complete all four small trials: moving form; light, shadow, or colour; sound and silence; and movement through space.", finishCheck: "All four trials are finished and each has a note about what worked." },
      { title: "Plan one clear work", action: "Choose one idea and route. Complete every planning box, including pattern, change, safety, access, source credit, and one manageable creative risk.", finishCheck: "The complete plan is safe, possible with the materials, and has a clear beginning and ending." },
      { title: "Make the complete work", action: "Build or rehearse the smallest complete work. Give it a clear entry, sequence, label or score, and ending before adding detail.", finishCheck: "The work can be viewed or performed from start to finish and purposeful decoration supports the idea." },
      { title: "Invite + improve", action: "Watch an audience try it. Revise one Arts choice and one access choice, then purposefully finish the whole folio and its next-step reflection.", finishCheck: "The whole folio is complete and decorated, both changes connect to audience evidence, and one possible future improvement remains." },
    ],
    finishEvidence: ["Two complete artist cards", "All four technique trials", "A fully completed and purposefully decorated project folio", "One finished or performable Arts work", "Audience evidence", "One Arts revision, one access revision, and one suggested next improvement"],
    saveAction: { kind: "keep-in-class", message: "Keep the complete folio in your Arts folder. Share it in the June showcase only if it becomes your selected evidence." },
    readiness: "teach",
  },
  "learning-user-manual": {
    id: "learning-user-manual",
    reviewState: "reviewed",
    challenge: "What helps you learn and contribute right now—and what responsibility can you take?",
    why: "A useful learning profile is built from real examples and strategies. It can change as the task, group, place, tools, and learner change.",
    firstAction: "Choose one recent class moment when you learned, helped, persisted, organized, created, checked, or recovered. Record what you actually did.",
    materials: ["Strength-in-action cards", "Learning-conditions menu", "Goal pathway", "Notebook or profile page", "Spoken, visual, or written response route"],
    choices: [{
      prompt: "How will you build your private profile?",
      options: [
        { label: "Write + sketch", detail: "Use short sentences, labels, and simple diagrams." },
        { label: "Talk + teacher notes", detail: "Explain your evidence in a brief private conference while the teacher records key words." },
        { label: "Audio + goal card", detail: "Record a short private explanation and complete the checkable goal card." },
      ],
    }],
    steps: [
      { title: "Start with evidence", action: "Describe two moments using ‘I noticed… I did… The result was…’ Avoid personality labels and private details.", finishCheck: "Another person can see the action in each example instead of only reading a praise word." },
      { title: "Name strengths in action", action: "Choose two strengths that fit the examples, such as clarifying, checking, including, organizing, adapting, creating, or persisting.", finishCheck: "Each strength is connected to one exact example." },
      { title: "Pair support with responsibility", action: "Name two conditions that help you learn. Beside each, write one action you can take to use that support responsibly.", finishCheck: "The plan includes what the teacher or class can provide and what you will try." },
      { title: "Build one goal pathway", action: "Choose one realistic term goal. Add a first step, a check date, and a person or resource that can help.", finishCheck: "The first step can happen soon, and the check date will show whether the plan helped." },
      { title: "Choose what to share", action: "Review the profile privately with the teacher. Remove details the teacher does not need and choose one strength or goal for the September Learning Story.", finishCheck: "The private profile is useful to the teacher, and any shared part was chosen by you." },
    ],
    finishEvidence: ["Two observable learning examples", "Two strengths connected to evidence", "Two helpful conditions paired with student responsibility", "One realistic goal with a first step, check date, and help source", "One student-chosen idea for the September Learning Story"],
    saveAction: { kind: "add-to-existing-post", message: "Keep the full learning user manual private with the teacher. Add only the student-chosen strength or goal to the existing September Learning Story when your teacher asks." },
    readiness: "none",
  },
  "packet-rescue": {
    id: "packet-rescue",
    reviewState: "reviewed",
    challenge: "How does a message travel when no single device carries the whole system?",
    why: "We are learning how a network sends numbered parts of a message, checks that they arrived, and repairs a problem.",
    firstAction: "Study the network diagram. Point to the device, server, two routers, two routes, and six numbered packets.",
    materials: ["Network diagram", "Six-piece picture packet set", "Device, server, router, packet, and observer cards", "Tape or rope routes", "Problem cards", "Observer log and troubleshooting map"],
    choices: [{ prompt: "Choose a role:", options: [{ label: "Device, server, or router", detail: "Make a request, send packets, choose a route, or check the message." }, { label: "Packet", detail: "Carry one numbered piece along the chosen route." }, { label: "Observer or narrator", detail: "Check each job and explain the handoffs. This can be a seated role." }] }],
    steps: [
      { title: "Meet the parts", action: "Learn the job of a device, server, packet, router, and route. Trace one request on the diagram.", finishCheck: "You can point to each part and say what it does." },
      { title: "Build the message", action: "Send the six picture pieces from the server to the device. Put packets 1 to 6 in order.", finishCheck: "All six pieces arrived and the device rebuilt the complete picture." },
      { title: "Test the network", action: "Run one slow human-network round with both routes open. Let the observer check every handoff.", finishCheck: "The request, packet route, destination check, and rebuilt message all work." },
      { title: "Repair two problems", action: "Close one route and send the packets another way. Then remove packet 4, request only that piece, and rebuild.", finishCheck: "The message survives a closed route and the missing piece is found and replaced." },
      { title: "Teach the system", action: "Draw the route and repair. Label each job and add one way the model is simpler than a real network.", finishCheck: "Another student can follow the route, understand the repair, and name the model limit." },
    ],
    finishEvidence: ["A complete packet picture", "A checked human-network round", "Two tested repairs", "A labelled troubleshooting map with one model limit"],
    saveAction: { kind: "keep-in-class", message: "Keep the packet picture, observer log, and map in class. No SpacesEDU upload is needed." },
    readiness: "teach",
  },
  "search-under-hood": {
    id: "search-under-hood",
    reviewState: "reviewed",
    challenge: "Why is the first search result not always the best evidence?",
    why: "We are learning how search words, ads, ranking, source, date, and purpose shape what we find.",
    firstAction: "Study the three fictional results. Find the ad label, source, date, headline, and words that match the search.",
    materials: ["Fictional search screen", "Query cards", "Source-trail prompts", "Shared projector", "Board, scrap paper, or mini-whiteboard"],
    choices: [{ prompt: "Show your search decision by:", options: [{ label: "Speak and point", detail: "Point to result clues and explain aloud." }, { label: "Use the class board", detail: "Build the search and source trail together." }, { label: "Use paper", detail: "Write the improved search, result choice, and source trail." }] }],
    steps: [
      { title: "Meet the results", action: "Compare the sample results. Mark the ad, source, date, headline, preview, and matching words.", finishCheck: "You can name two reasons a result might appear first without calling it best." },
      { title: "Improve the search", action: "Turn one vague search into a focused question with precise words.", finishCheck: "The new search says exactly what information you need." },
      { title: "Choose and test", action: "Choose the result that best fits the question. Point to its source, date, purpose, or evidence—not its rank.", finishCheck: "Your reason uses visible clues from the result." },
      { title: "Trace and teach", action: "Follow one claim to the original source. Record who made it, when, why, what it supports, and what it cannot prove.", finishCheck: "A partner can follow the trail and see both the evidence and its limit." },
    ],
    finishEvidence: ["One improved search", "A result choice supported by clues", "A source trail", "One clear source limit"],
    saveAction: { kind: "add-to-existing-post", message: "Add this only to the existing Evidence and Perspective Case File if it strengthens that work. Do not make a separate post." },
    readiness: "quick",
  },
  "access-by-design": {
    id: "access-by-design",
    reviewState: "reviewed",
    challenge: "How can a design reduce a barrier without guessing what every person needs?",
    why: "We are learning to use what a fictional user says, build a small fix, watch someone try it, and improve from evidence.",
    firstAction: "Read one fictional user brief. Mark each detail as evidence from the brief or a guess that still needs checking.",
    materials: ["Fictional user briefs", "Barrier and success-rule map", "Drafting paper", "Prototype materials", "No-name feedback cards"],
    choices: [{ prompt: "Choose a first version:", options: [{ label: "Tool or control", detail: "Make an action possible in more than one clear way." }, { label: "Interface or sign", detail: "Make information or directions easier to notice and understand." }, { label: "Classroom system", detail: "Change a sequence, station, or routine to reduce the named barrier." }] }],
    steps: [
      { title: "Meet the need", action: "Read the brief. Separate the stated need from guesses. Do not simulate a disability.", finishCheck: "Every need you use comes from the brief and every guess is labelled." },
      { title: "Imagine two fixes", action: "Name the barrier and write simple success rules. Sketch at least two possible fixes.", finishCheck: "The rules say what the user must be able to notice, understand, or do." },
      { title: "Build one fix", action: "Make the smallest usable version. Label how each feature answers the brief.", finishCheck: "Another person can try the important action." },
      { title: "Test it", action: "Let classmates try it without coaching. Record what they do, where they pause, and one comment without names.", finishCheck: "The notes describe actions and feedback, not judgments about the person." },
      { title: "Improve it", action: "Change one access feature because of the test. Ask someone to try the changed part again.", finishCheck: "The before-and-after record shows the evidence, change, and result." },
    ],
    finishEvidence: ["An evidence-versus-guess check", "A barrier and success-rule map", "A labelled first design", "A no-name test record", "A tested access revision"],
    saveAction: { kind: "add-to-existing-post", message: "Add this only to the existing Civic or Community Needs Brief if your teacher chooses it. Do not make a separate post." },
    readiness: "quick",
  },
  "bloxels-game-studio": {
    id: "bloxels-game-studio",
    reviewState: "reviewed",
    challenge: "How can a player learn the story by playing—not only by reading before the game?",
    why: "We are learning to plan a small complete game, watch a new player, and improve the story and gameplay from evidence.",
    firstAction: "Trace one route in the shared game image. Point to the beginning, turning point, challenge, feedback, and ending.",
    materials: ["ELA story blueprint", "Paper level map", "Minimum playable game check", "Silent playtest sheet", "Revision log", "School-managed Bloxels or paper route"],
    choices: [{ prompt: "Choose one equal route:", options: [{ label: "School Bloxels route", detail: "Build in the teacher-approved private class space after the paper plan works." }, { label: "Paper playable route", detail: "Use pixel-grid paper and linked cards with the same challenge, feedback, testing, and revision." }] }],
    steps: [
      { title: "Meet the game loop", action: "Study a short teacher example. Name one player action and one story moment that work together.", finishCheck: "You can explain what the player learns by doing." },
      { title: "Plan the whole route", action: "Map the start, three story moments, one challenge, useful feedback, and a clear ending on paper.", finishCheck: "A partner can trace the route and knows what to do at each point." },
      { title: "Build it", action: "Build the smallest version that works from start to ending. Use original or approved, credited work and no private information.", finishCheck: "A player can start, understand the goal, get feedback, and finish." },
      { title: "Test it silently", action: "Watch a new player without giving hints. Record pauses, missed story clues, successes, and barriers without names.", finishCheck: "The record describes what happened and protects the player’s privacy." },
      { title: "Improve two parts", action: "Change one story feature and one game or access feature. Retest the changed parts.", finishCheck: "Both changes connect to test evidence and the retest result is recorded." },
      { title: "Show and explain", action: "Share through the teacher-approved route. Explain your contribution, strongest test clue, revisions, and next improvement.", finishCheck: "The route is complete, credits are visible, and your own design decisions are clear." },
    ],
    finishEvidence: ["A complete paper level map", "One short playable game or paper route", "A no-name playtest", "One story revision", "One game or access revision", "An individual creator explanation"],
    saveAction: { kind: "new-post", message: "Make one combined Bloxels Story-Game post after the class showcase. Never upload private player information." },
    readiness: "quick",
  },
  "cold-test-prototype": {
    id: "cold-test-prototype",
    reviewState: "reviewed",
    challenge: "Can someone use our first version without our help?",
    why: "We are learning to watch where a new user pauses, then change the design because of what actually happened.",
    firstAction: "Name the user, the one need your design must meet, and one sign that would show it works.",
    materials: ["Current inquiry content", "Design brief", "Paper or cardboard", "Classroom objects", "No-name observation notes", "Revision tags"],
    choices: [{ prompt: "Build the smallest version as:", options: [{ label: "Paper route", detail: "Use cards, a diagram, foldable, or paper interaction." }, { label: "Object model", detail: "Build only the parts needed for the main action." }, { label: "Live demonstration", detail: "Use a short repeatable demonstration with clear feedback." }] }],
    steps: [
      { title: "Meet the need", action: "Name the user, need, and accurate idea the prototype must communicate.", finishCheck: "The need is specific and the content has been checked." },
      { title: "Plan the test", action: "Write simple success rules and limits for time, safety, access, privacy, and materials. Sketch the route.", finishCheck: "The sketch has a clear beginning, action, feedback, and ending." },
      { title: "Build it", action: "Make the smallest complete version another person can really try.", finishCheck: "The main action works before extra detail or decoration is added." },
      { title: "Watch without helping", action: "Let another team try it. Record their first action, pauses, questions, and confusion without names.", finishCheck: "The notes show one content problem and one design or access problem." },
      { title: "Improve and retest", action: "Change one content part and one design or access part. Retest both changes.", finishCheck: "The before-and-after tags show what changed and whether it helped." },
    ],
    finishEvidence: ["A clear user, need, and success rules", "A smallest usable version", "A no-name test record", "One content revision", "One design or access revision", "A retest result"],
    saveAction: { kind: "add-to-existing-post", message: "Add this only to the existing Social Studies inquiry or expert teach-back if it shows useful ADST learning." },
    readiness: "quick",
  },
  "science-design-series": {
    id: "science-design-series",
    reviewState: "reviewed",
    challenge: "How can a fair test turn a first build into a better solution?",
    why: "We are learning to build safely, test the same way each time, change one feature, and compare the results.",
    firstAction: "Open the current Mixture Rescue or Delivery Pod brief. Circle the need, success rules, limits, safety rules, and material limits.",
    materials: ["Current Science challenge materials", "Design brief", "Test table", "Version labels", "Approved tools and safety equipment"],
    choices: [{ prompt: "Choose a visible team job:", options: [{ label: "Build and materials", detail: "Make within the rules and explain material choices." }, { label: "Test and measure", detail: "Keep test conditions comparable and record results." }, { label: "Observe and record", detail: "Track failures, feedback, and changes." }, { label: "Explain impacts", detail: "Connect performance to safety, waste, and the next problem." }] }],
    steps: [
      { title: "Meet the challenge", action: "Name the need, success rules, limits, safety rules, and material limits.", finishCheck: "The team can point to what will decide whether the design works safely." },
      { title: "Imagine and predict", action: "Sketch the smallest first version, choose materials for a reason, and predict the weak point.", finishCheck: "The prediction names a feature and a result the test can show." },
      { title: "Build safely", action: "Make the first version with approved tools and label the important choices.", finishCheck: "The build is ready for the planned test and follows every safety and material limit." },
      { title: "Test fairly", action: "Run comparable tests and record measurements, useful failures, and specific feedback.", finishCheck: "The test conditions are similar enough to compare and no failure is hidden." },
      { title: "Improve and explain", action: "Change one feature, retest it the same way, and explain the result, waste, impact, and next issue.", finishCheck: "The before-and-after evidence shows whether the change helped and what remains." },
    ],
    finishEvidence: ["A completed design brief", "A labelled first version and prediction", "A comparable test table", "A tested revision", "A result and impact explanation"],
    saveAction: { kind: "add-to-existing-post", message: "Add this only to the existing Force or Motion Design Evidence post when your teacher asks." },
    readiness: "quick",
  },
  "cosmic-mission-control": {
    id: "cosmic-mission-control",
    reviewState: "reviewed",
    challenge: "How can clear steps and choices guide someone through a space model?",
    why: "We are learning to build a simple start, choice, feedback, and ending, then fix one bug and show what the model cannot prove.",
    firstAction: "Choose one accurate space relationship and write the action you want the audience to take.",
    materials: ["Earth and Space source or class model", "Algorithm cards", "Flowchart symbols", "Test log", "Optional approved visual programming tool"],
    choices: [{ prompt: "Choose one equal route:", options: [{ label: "Unplugged cards", detail: "Build and run the full path with ordered cards, one choice, and visible feedback." }, { label: "Visual program", detail: "Use an approved visual tool after the complete card path works." }] }],
    steps: [
      { title: "Meet the idea", action: "Choose one accurate space relationship, an audience action, and one warning about the model.", finishCheck: "The idea is accurate and the warning says what the model cannot show." },
      { title: "Plan the path", action: "Write a start, ordered steps, one useful choice, feedback, and an ending.", finishCheck: "A partner can trace both choices without finding a missing step." },
      { title: "Build it", action: "Prototype the complete tour with cards or an approved visual tool. Keep the unplugged route working.", finishCheck: "The audience can start, choose, get feedback, and finish." },
      { title: "Test and debug", action: "Watch a new user without coaching. Record one wrong turn or unclear step, fix it, and retest.", finishCheck: "The changed path works and the model warning appears before a wrong conclusion." },
      { title: "Teach it", action: "Run the tour. Explain the steps, choice, feedback, bug, fix, and model limit.", finishCheck: "A visitor can finish the tour and explain the space idea plus one model limit." },
    ],
    finishEvidence: ["An accurate space idea", "A complete card or flow path", "A working prototype", "A no-name bug-and-fix record", "A model-limit warning", "A short teaching explanation"],
    saveAction: { kind: "add-to-existing-post", message: "Use this only inside the existing June Science Expert Showcase when your teacher asks." },
    readiness: "quick",
  },
  "each-one-teach-one": {
    id: "each-one-teach-one",
    reviewState: "reviewed",
    challenge: "Can you help someone learn one worthwhile idea through a complete, tested experience?",
    why: "Designers learn deeply when they verify an idea, plan what another learner will do, watch the first version fail usefully, and revise from evidence instead of guessing.",
    firstAction: "Write one safe, focused question you genuinely want to understand. Name a possible learner, such as a Grade 6 class or a younger buddy class, without naming a real person or sharing private information.",
    materials: ["Teacher-approved source shelf", "Plain paper or index cards", "Pencils, markers, sticky notes, scissors, and tape", "Source-check, learner-test, and revision cards", "Optional teacher-approved school creation tool"],
    choices: [
      {
        prompt: "Which complete creation route will help your learner best?",
        options: [
          { label: "Physical / no tech", detail: "Build a model, card sort, mini-demo, board game, foldable, or station." },
          { label: "Paper branching", detail: "Link numbered cards into a choose-your-own learning path with feedback and an ending." },
          { label: "Bloxels", detail: "Build a short teaching route after the complete paper plan, using the approved private class space." },
          { label: "Minecraft", detail: "Build a purposeful model or knowledge world with signs, narration, or a live guide." },
          { label: "Private app / site prototype", detail: "Wireframe first; use only a teacher-approved school route with no public publishing, comments, analytics, personal accounts, or student information." },
        ],
      },
      {
        prompt: "How will you use AI, if at all?",
        options: [
          { label: "No AI", detail: "Use sources, people, paper planning, testing, and your own revision." },
          { label: "Teacher model", detail: "Help the class compare or question one teacher-run output." },
          { label: "Approved support", detail: "Ask for questions, alternatives, or debugging ideas; verify every claim and make the final decisions yourself." },
        ],
      },
    ],
    steps: [
      { title: "Choose the question", action: "Choose one bounded, school-appropriate question and the learner you hope to help. Avoid personal advice, private information, unsafe instructions, and topics your teacher has not approved.", finishCheck: "The question is focused enough to teach in 5–10 minutes, and the audience is described without identifying anyone.", minutes: "Block 1 · 10–15 min" },
      { title: "Verify the idea", action: "Use at least two teacher-approved sources. Record creator or organization, title, date when available, source route, what it supports, and one limit or uncertainty.", finishCheck: "Every key teaching claim can be traced to a source, and one honest limit remains visible.", minutes: "Blocks 1–2" },
      { title: "Set the design rules", action: "Write one student-friendly learning intention, three signs that the experience works, and limits for time, tools, safety, access, privacy, and sharing.", finishCheck: "The rules describe learner understanding and use—not decoration, device power, or how much was built.", minutes: "Block 2 · 15–20 min" },
      { title: "Draw the whole path", action: "On paper, map the invitation, first action, information, meaningful choice or interaction, feedback, understanding check, and ending. Include a way back when a learner gets stuck.", finishCheck: "A partner can trace the complete path from beginning to ending without the designer filling a missing step.", minutes: "Block 2" },
      { title: "Build the smallest complete version", action: "Build only enough for another learner to try the full path. Keep the paper version working even when Wi-Fi, devices, accounts, or AI are unavailable.", finishCheck: "The learner can begin, act, receive useful feedback, reach the check, and finish through the chosen route.", minutes: "Blocks 3–4" },
      { title: "Watch a new learner", action: "Ask someone unfamiliar with the design to try it without coaching. Record the first action, pauses, understood idea, noticed feedback, and one barrier—never a name, account, image, or personal comment.", finishCheck: "The notes describe observable actions and one exact point to improve without identifying the learner.", minutes: "Block 5" },
      { title: "Revise and retest", action: "Change one content feature and one access, navigation, or feedback feature because of the test. Ask someone to try the changed part again.", finishCheck: "The before/after record connects each change to test evidence and shows what happened in the second try.", minutes: "Blocks 5–6" },
      { title: "Teach, check, and reflect", action: "Teach the experience and use four quick checks: identify, explain, apply, and name a source or limit. Credit sources and tools. Explain your own contribution, evidence, revision, limitation, and next improvement.", finishCheck: "The final explanation is in your own words; no raw AI output or learner responses are copied into SpacesEDU.", minutes: "Blocks 7–8" },
    ],
    finishEvidence: ["A focused question, audience, learning intention, success rules, and constraints", "Two teacher-approved source records with a limit", "A complete paper learner-flow map", "A usable first version through one of five equivalent routes", "A no-name learner-test record", "One content revision and one access, navigation, or feedback revision", "A four-part understanding check", "An individual reflection naming contribution, evidence, limitation, revision, and next improvement"],
    saveAction: { kind: "add-to-existing-post", message: "If this project becomes your class expert teach-back or June showcase format, add the final artifact once to that existing SpacesEDU post with your own reflection. Do not upload learner responses, confidential information, or raw AI output, and do not make a duplicate ADST post." },
    readiness: "teach",
  },
  "space-motion-lab": {
    id: "space-motion-lab",
    reviewState: "reviewed",
    challenge: "Why does the Sun seem to cross our sky even though Earth is moving?",
    why: "Changing viewpoint helps us explain day and night and tell rotation, revolution, and orbit apart.",
    firstAction: "Study the sky or shadow sequence. Write only what changed; do not explain it yet.",
    materials: ["Teacher-selected sky or shadow sequence", "Lamp or strong flashlight", "Globe or ball with a Surrey marker", "Planet day-and-year data", "Graph paper or a spreadsheet"],
    choices: [
      {
        prompt: "Which model job will you take first?",
        options: [
          { label: "Light keeper", detail: "Keep the model Sun still and aimed safely." },
          { label: "Earth mover", detail: "Rotate the model Earth in the agreed direction." },
          { label: "Surrey observer", detail: "Call out when Surrey enters and leaves the light." },
          { label: "Diagram recorder", detail: "Sketch each position and label the viewpoint." },
        ],
      },
      {
        prompt: "How will you explain the final model?",
        options: [
          { label: "Two labelled diagrams", detail: "Show the view from space and the view from Surrey." },
          { label: "Short model demonstration", detail: "Move the model and explain each change aloud." },
          { label: "Audio or video explanation", detail: "Use the model, correct words, and one model warning." },
        ],
      },
    ],
    steps: [
      {
        title: "Observe first",
        action: "Record the visible change in the sky or shadows. Keep possible explanations in a separate column.",
        finishCheck: "Your observation says what changed without claiming why it changed.",
      },
      {
        title: "Model one day",
        action: "Keep the light still and rotate Earth. Follow Surrey through sunrise, noon, sunset, and midnight.",
        finishCheck: "Your diagram shows Surrey moving into and out of the light.",
      },
      {
        title: "Compare days and years",
        action: "Graph or organize the planet data. Find one pattern, one unusual result, and one new question.",
        finishCheck: "Your scale keeps the unusual values visible instead of hiding them.",
      },
      {
        title: "Change viewpoint",
        action: "Compare the view from Surrey with the view from space. Choose the explanation that fits both views.",
        finishCheck: "Your explanation uses rotation and viewpoint and names one limit of the model.",
      },
    ],
    finishEvidence: [
      "Observation and possible-explanation notes",
      "A four-position day-and-night diagram",
      "Two planet-data graphs or tables with a pattern and an unusual result",
      "A final explanation using rotation, viewpoint, and one model limit",
    ],
    saveAction: {
      kind: "keep-in-class",
      message: "Keep this in your Science record. Save a space-motion question if it may become an expert topic later.",
    },
    readiness: "teach",
  },
  ...pheStudentLessonContracts,
  ...careerStudentLessonContracts,
  ...elaStudentLessonContracts,
  ...mathStudentLessonContracts,
} as const satisfies Record<string, StudentLessonContract>;

export type ReviewedStudentLessonId = keyof typeof reviewedStudentLessonContracts;

export const reviewedStudentLessonIds = Object.freeze(
  Object.keys(reviewedStudentLessonContracts) as ReviewedStudentLessonId[],
);

export function isReviewedStudentLessonId(id: string): id is ReviewedStudentLessonId {
  return Object.prototype.hasOwnProperty.call(reviewedStudentLessonContracts, id);
}

const experiencePhraseReplacements: readonly (readonly [RegExp, string])[] = [
  [/\bPredict which score claim follows the written rule\b/gi, "Read the sample scoring rule one move at a time. Use score cards or a quick sketch to test it, then choose the team's total that actually follows the rule"],
  [/\bPlace the expected answer inside a reasonable range\b/gi, "Use friendly nearby numbers before the exact calculation to write a low estimate and a high estimate, creating a low-to-high window that the answer should fall inside"],
  [/\bCalculate supply-order and equal-sharing cases with a chosen method\b/gi, "Solve the supply-order and sharing problems in a way that makes sense to you: draw place value, break apart the numbers, or use a written method you know"],
  [/\bWrite an unambiguous scoring expression for another team to decode\b/gi, "Write a scoring expression—a math sentence made with numbers and operation signs—that has only one possible meaning. Ask another team to decode it"],
  [/\btested game rule and written justification\b/gi, "game rule you tested, plus a short “because…” explanation that shows why it works"],
  [/\bwritten justification\b/gi, "written “because…” explanation"],
  [/\breasonable range\b/gi, "reasonable range (a low and high number the answer should fall between)"],
  [/\bsource types\b/gi, "source types (kinds of evidence, such as maps, numbers, interviews, or articles)"],
  [/\bone claim\b/gi, "one claim (an idea you think is true)"],
  [/\ba claim\b/gi, "a claim (an idea someone says is true)"],
  [/\bthe claim\b/gi, "the claim (the main idea being checked)"],
  [/\bclaims\b/gi, "claims (ideas people say are true)"],
  [/\bclaim\b(?!\s*\()/gi, "claim (the main idea someone says is true)"],
  [/\bjustification\b/gi, "justification (a “because…” explanation that shows how you know)"],
  [/\bscoring expressions\b/gi, "scoring expressions—math sentences made with numbers and operation signs"],
  [/\bscoring expression\b(?!—)/gi, "scoring expression—a math sentence made with numbers and operation signs"],
  [/\bdesign with before\/after access revision\b/gi, "design showing what changed from the first version to the easier-to-use version"],
  [/\bstandard algorithm\b/gi, "standard algorithm (the written method with digits lined up by place value)"],
  [/\bbreak(?:ing)? apart numbers\b/gi, "break numbers into friendlier parts"],
  [/\bdecompose numbers\b/gi, "break numbers into friendlier parts"],
  [/\bknown fact\b/gi, "known fact (a number fact you already remember, such as 6 × 7 = 42)"],
  [/\bsuccess criteria and constraints\b/gi, "success criteria (clear signs that it works) and constraints (limits such as time, size, materials, or safety)"],
  [/\bcriteria and constraints\b/gi, "criteria (what it must do) and constraints (limits such as time, size, materials, or safety)"],
  [/\bsuccess criteria\b/gi, "success criteria (clear signs that it works)"],
  [/\bselection criteria\b/gi, "selection criteria (the reasons you will use to choose)"],
  [/\bchosen method\b/gi, "method you choose (the way you will do the work)"],
  [/\bcompare methods\b/gi, "compare methods (different ways to solve it)"],
  [/\bPre-teach network, device or client, server, packet, router, route, request, and reassemble with the supplied diagram\b/gi, "Use the supplied diagram to learn the jobs of the device, server, router, route, and numbered packets"],
  [/\bUse the missing number as evidence, request it again\b/gi, "Use the missing number as evidence. Request it again"],
  [/\bDraw and explain the system, the repair, and one limit of the model\b/gi, "Draw the system and its repair. Explain one limit of the model"],
  [/\bCold-test the teaching experience\b/gi, "Ask a new person to try the opening"],
  [/\bCold-test with classmates who have not seen the project\b/gi, "Ask classmates who have not seen the project to try it"],
  [/\bcold-test it\b/gi, "ask a new person to try it"],
  [/\bPrototype the experience quickly in\b/gi, "Build a quick test version of the experience with"],
  [/\bPrototype the experience\b/gi, "Build a quick test version of the experience"],
  [/\bPrototype in\b/gi, "Build a test version using"],
  [/\brequest it again, and reassemble\b/gi, "request it again. Reassemble"],
  [/\bspoken strategy comparison and teacher conference evidence\b/gi, "spoken strategy comparison and reusable strategy explanation"],
  [/\bconstraint-built triangle\b/gi, "triangle built to match the limits"],
  [/\btested prototype\b/gi, "tested design"],
  [/\bprototype materials\b/gi, "building materials"],
  [/\bAn annotated\b/gi, "A clearly labelled"],
  [/\bsmall visible milestones\b/gi, "small visible steps"],
  [/\bvisible milestones\b/gi, "visible steps"],
  [/\bmilestones\b/gi, "small steps"],
  [/\bdependencies\b/gi, "tasks that must happen first"],
  [/\bdependency\b/gi, "task that must happen first"],
  [/\band contingency\b/gi, "and a backup plan"],
  [/\bwith contingency\b/gi, "with a backup plan"],
  [/\bcontingency plan\b/gi, "backup plan"],
  [/\bcontingency\b/gi, "backup plan"],
  [/\brisk check and (?:a )?review point\b/gi, "risk check and a planned pause to check the work"],
  [/\b(?:a )?review point\b/gi, "a planned pause to check the work"],
  [/\bdue windows\b/gi, "a deadline for each step"],
  [/\bunclear outcome\b/gi, "unclear goal"],
  [/\bworkload\b/gi, "amount of work"],
  [/\bdiagnose the plan\b/gi, "find the problems in the plan"],
  [/\bcriteria\b(?!\s*\()/gi, "criteria (what it must do)"],
  [/\bconstraints\b(?!\s*\()/gi, "constraints (the limits you must work within)"],
  [/\bconstraint\b(?!\s*\()/gi, "constraint (a limit you must work within)"],
  [/\bcold[- ]test(?:ing)?\b/gi, "ask a new person to try it"],
  [/\bteacher[- ](?:provided|selected|created|curated)\b/gi, "provided"],
  [/\bteacher[- ]approved\b/gi, "class-approved"],
  [/\bcurated\b/gi, "provided"],
  [/\bannotated\b/gi, "clearly labelled"],
  [/\bprototype\b/gi, "test version"],
  [/\bprototypes\b/gi, "test versions"],
  [/\bKanban\s*\/\s*timeline\b/gi, "task board or timeline"],
  [/\btimeline or Kanban board\b/gi, "timeline or task board"],
  [/\bKanban board\b/gi, "task board"],
  [/\bsource audit\b/gi, "source check"],
  [/\berror audit\b/gi, "error check"],
  [/\bpeer audit\b/gi, "partner check"],
  [/\baudit\b/gi, "check"],
  [/\baudits\b/gi, "checks"],
  [/\bunambiguous\b/gi, "clear enough to have one meaning"],
  [/\bsubstantive\b/gi, "meaningful"],
  [/\battribution\b/gi, "source credit"],
  [/\bsynthesize\b/gi, "combine"],
  [/\bsynthesis\b/gi, "combined explanation"],
  [/;?\s*this is the B\.C\. Grade 6 evidence\.?/gi, "."],
];

const lookForReplacements: readonly (readonly [RegExp, string])[] = [
  [/^Outcome clarified$/i, "The goal is clear"],
  [/^Dependencies ordered$/i, "Tasks that must happen first are in the right order"],
  [/^Workload safer\/fairer$/i, "The work is safer and fairer"],
  [/^Review and contingency present$/i, "There is a planned pause to check the work and a backup plan"],
  [/^Criteria specific$/i, "Your success criteria say exactly what the design must do"],
  [/^Constraints met$/i, "Your design stays within its limits for time, size, materials, and safety"],
  [/^Audit specific$/i, "The check names an exact detail"],
  [/^Expression unambiguous$/i, "Another team reads your math expression in the same order you intended"],
  [/^Mystery unambiguous$/i, "The mystery has one clear answer"],
  [/^Revision substantive$/i, "The revision makes a meaningful change"],
  [/^Prototype testable$/i, "The test version can be tried"],
  [/^Rule followed$/i, "Your total follows every move in the scoring rule"],
  [/^Grouping interpreted$/i, "You used brackets to show which operation happens first"],
  [/^Reason justified$/i, "Your “because…” sentence shows why the rule gives that score"],
  [/^Reasonable range$/i, "Your low and high estimates make sense for the numbers in the problem"],
  [/^Decimal method accurate$/i, "Your digits stay in the correct place-value columns"],
  [/^Error detected$/i, "You circled the exact place where the invoice went wrong"],
  [/^Check explained$/i, "You showed how your estimate helped you catch the mistake"],
  [/^Claim supported$/i, "Your claim is connected to an exact detail another person can check"],
  [/^Revision reduces a barrier$/i, "Your change makes one part easier for the intended user"],
];

const sourceAdminLanguage = /\b(?:teacher prep|learning modes?|look[- ]fors?|formative|summative|proficiency|curriculum alignment|assessment rubric|portfolio|upload|mastery record|readiness route|first[- ]pass|quality[- ]gat(?:e|ed)|audit complete|corrections required)\b/i;
const teacherFacingSentence = /\b(?:teacher|educator|instructor)\s+(?:should|must|will|can|needs? to|prepares?|assesses?|looks? for)\b/i;

function sentenceCase(text: string) {
  return text ? `${text[0].toUpperCase()}${text.slice(1)}` : text;
}

function endSentence(text: string) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function simplifyExperienceText(value: unknown) {
  if (typeof value !== "string") return "";
  let text = value.replace(/\s+/g, " ").trim();
  for (const [pattern, replacement] of experiencePhraseReplacements) {
    text = text.replace(pattern, replacement);
  }
  text = text.replace(/\s+([,.;!?])/g, "$1").replace(/\.{2,}/g, ".").trim();
  if (!text || text.length > 420 || sourceAdminLanguage.test(text) || teacherFacingSentence.test(text)) return "";
  return sentenceCase(text);
}

function simplifyLookFor(value: unknown) {
  const original = typeof value === "string" ? value.trim() : "";
  for (const [pattern, replacement] of lookForReplacements) {
    if (pattern.test(original)) return replacement;
  }
  return simplifyExperienceText(original).replace(/[.!?]$/, "");
}

const secondActionVerbs = [
  "add", "annotate", "apply", "arrange", "ask", "assign", "build", "calculate", "change", "check", "choose", "classify", "close", "coach", "collect",
  "combine", "compare", "connect", "create", "debug", "decide", "decode", "defend", "define", "describe", "design",
  "draft", "draw", "exchange", "explain", "explore", "extend", "find", "flag", "follow", "gather", "give", "graph",
  "hold", "identify", "inspect", "justify", "label", "learn", "listen", "make", "map", "mark", "measure", "model",
  "name", "notice", "observe", "organize", "perform", "place", "plan", "plot", "point", "predict", "practise", "publish",
  "present", "read", "rebuild", "record", "rehearse", "remove", "repair", "replay", "represent", "request", "research", "respond",
  "retell", "retest", "revise", "rewrite", "rotate", "run", "select", "separate", "set", "share", "shortlist", "show", "sketch", "solve", "sort",
  "state", "study", "substitute", "support", "take", "tell", "test", "trace", "trade", "transform", "try", "turn", "use",
  "walk", "watch", "write",
] as const;

const secondActionPattern = secondActionVerbs.join("|");
const commaActionVerbs = [
  "annotate", "arrange", "ask", "assign", "calculate", "collect", "combine", "compare", "connect", "create",
  "debug", "decide", "decode", "defend", "define", "draft", "draw", "exchange", "explain", "explore", "extend",
  "find", "flag", "follow", "gather", "give", "hold", "identify", "inspect", "label", "learn", "listen", "make",
  "mark", "measure", "name", "notice", "observe", "organize", "place", "predict", "practise", "present", "read",
  "rebuild", "rehearse", "remove", "repair", "replay", "represent", "respond", "retell", "retest", "revise",
  "rewrite", "rotate", "run", "select", "separate", "set", "share", "show", "sketch", "solve", "sort", "state",
  "study", "substitute", "support", "take", "tell", "trace", "trade", "transform", "try", "use", "walk", "watch", "write",
] as const;
const commaActionPattern = commaActionVerbs.join("|");
const actionBoundary = new RegExp(
  `(?<=[.!?])\\s+|;\\s*|,\\s*then\\s+(?=(?:${secondActionPattern})\\b)|,\\s*(?=(?:${commaActionPattern})\\b)|\\s+(?:and then|then)\\s+(?=(?:${secondActionPattern})\\b)|,?\\s+and\\s+(?=(?:${secondActionPattern})\\b)`,
  "i",
);

type SplitStudentAction = {
  action: string;
  sourceStepIndex: number;
  isLastInSourceStep: boolean;
  isOnlyActionInSourceStep: boolean;
};

function splitStudentActions(steps: readonly string[]): SplitStudentAction[] {
  return steps.flatMap((step, sourceStepIndex) => {
    const safeStep = simplifyExperienceText(step);
    if (!safeStep) return [];
    const parts = safeStep
      .split(actionBoundary)
      .map(part => part.replace(/^(?:and|then)\s+/i, "").trim())
      .filter(Boolean)
      .map(part => endSentence(sentenceCase(part)));
    return parts.map((action, index) => ({
      action,
      sourceStepIndex,
      isLastInSourceStep: index === parts.length - 1,
      isOnlyActionInSourceStep: parts.length === 1,
    }));
  });
}

const actionTitleByVerb: Readonly<Record<string, string>> = {
  add: "Add the next part", ask: "Ask and listen", assign: "Choose team jobs", build: "Build it", calculate: "Calculate", check: "Check it",
  choose: "Choose", collect: "Collect evidence", combine: "Combine", compare: "Compare", complete: "Complete it",
  connect: "Connect the ideas", create: "Create", defend: "Show why", design: "Design", draft: "Make a first version",
  describe: "Describe what you see", draw: "Draw it", explain: "Explain", find: "Find the clue", identify: "Identify", inspect: "Look closely",
  label: "Label it", learn: "Learn the parts", listen: "Listen", make: "Make it", map: "Map it", mark: "Mark it",
  measure: "Measure", model: "Model it", name: "Name it", notice: "Notice", observe: "Observe", organize: "Organize",
  order: "Put them in order", point: "Point it out",
  perform: "Perform", place: "Place it", plan: "Plan", predict: "Predict", read: "Read closely", record: "Record it",
  repair: "Repair it", replay: "Try it again", research: "Research", respond: "Respond", retell: "Tell it again",
  revise: "Improve it", run: "Run the test", share: "Share", show: "Show it", solve: "Solve", sort: "Sort",
  study: "Look closely", test: "Test it", trace: "Trace it", try: "Try it", turn: "Break it into steps", use: "Use the evidence", watch: "Watch",
  write: "Write it", zoom: "Zoom the scale",
};

function actionTitle(action: string, index: number) {
  const firstWord = action.match(/^[A-Za-z]+/)?.[0].toLowerCase() ?? "";
  if (actionTitleByVerb[firstWord]) return actionTitleByVerb[firstWord];
  const words = action.replace(/[.!?]$/, "").split(/\s+/).filter(Boolean);
  if (!words.length) return `Action ${index + 1}`;
  return words.slice(0, Math.min(4, words.length)).join(" ");
}

type ChoiceOption = StudentLessonChoice["options"][number];

function choiceOptionsFor(source: StudentLessonExperienceSource): ChoiceOption[] {
  const text = [
    ...source.learningModes,
    source.product,
    ...source.materials,
    ...source.steps,
  ].map(simplifyExperienceText).join(" ");
  const options: ChoiceOption[] = [];
  const add = (label: string, detail: string) => {
    if (!options.some(option => option.label === label)) options.push({ label, detail });
  };

  if (/task board|Kanban/i.test(text)) add("Task board", "Move each task to show what is ready, happening, or finished.");
  if (/timeline/i.test(text)) add("Timeline", "Place the tasks in time and show what must happen first.");
  if (/audio|record/i.test(text)) add("Audio", "Record a clear spoken explanation.");
  if (/paper|notebook|worksheet|grid|whiteboard|pencil|marker|sticky note/i.test(text)) add("Paper or whiteboard", "Write, sketch, or work with numbers using the supplies at your table.");
  if (/sort|card|tile|cut|scissor|collage/i.test(text)) add("Cut, sort, or arrange", "Move the pieces around before gluing or recording your final choice.");
  if (/write|writing|written|quickwrite|prose|note/i.test(text)) add("Writing", "Use clear sentences, labels, or bullets.");
  if (/visual|image|comic|draw|sketch|map|diagram|storyboard|graph|colour|art/i.test(text)) add("Draw, colour, or diagram", "Make the important idea visible with labels, colour, or a simple model.");
  if (/ruler|protractor|measure|measurement/i.test(text)) add("Measure and draw", "Use a ruler or measuring tool, then mark the evidence on paper.");
  if (/oral|spoken|talk|discussion|teach-back|presentation|explanation/i.test(text)) add("Speaking", "Explain the idea to a partner or audience.");
  if (/movement|tableau|drama|role-play|perform/i.test(text)) add("Movement or drama", "Use safe movement, a frozen scene, or role-play.");
  if (/model|build|construction|manipulative|test version/i.test(text)) add("Model or build", "Use materials to make the idea visible.");
  if (/projector|on-screen|whole-class|shared screen/i.test(text)) add("Whole-class screen", "Point, vote, or talk while the class works through the example together.");
  return options.slice(0, 4);
}

function fallbackSaveAction(spacesUse: StudentLessonExperienceSource["spacesUse"]): StudentLessonContract["saveAction"] {
  if (spacesUse === "required") return {
    kind: "new-post",
    message: "Keep your work. Mr. Wyatt will show you which part to add to SpacesEDU.",
  };
  if (spacesUse === "optional") return {
    kind: "keep-in-class",
    message: "Keep this work in class. Mr. Wyatt will tell you if one part would be useful in SpacesEDU.",
  };
  return { kind: "keep-in-class", message: "Keep this work in class. No upload is needed." };
}

function fallbackReadiness(source: StudentLessonExperienceSource): StudentReadinessKind {
  const text = [source.studentMission, ...source.steps, ...source.learningModes].join(" ");
  return /\b(?:pre-teach|direct instruction|teacher instruction|learn the|puberty|health|emergency|boundary)\b/i.test(text)
    ? "teach"
    : "quick";
}

type StudentConceptKind = "expression" | "estimate-range" | "source-type" | "criteria" | "claim" | "strategy";

type StudentConceptSupport = StudentLessonStep & {
  kind: StudentConceptKind;
  why: string;
};

function conceptTextFor(source: StudentLessonExperienceSource) {
  // Concept mini-lessons may only come from the task students are actually
  // being asked to do. Planning labels and assessment look-fors can contain a
  // stray word such as "justified" or "strategy"; using those here can inject
  // an unrelated claim/evidence or strategy lesson into a different topic.
  return [
    source.question,
    source.studentMission,
    ...source.steps,
    source.product,
  ].join(" ");
}

function countTerm(text: string, pattern: RegExp) {
  return text.match(pattern)?.length ?? 0;
}

/**
 * Abstract curriculum words stay available, but a child meets each word through
 * a tiny example before being asked to use it independently.
 */
function conceptSupportFor(source: StudentLessonExperienceSource): StudentConceptSupport | null {
  const text = conceptTextFor(source);

  if (/\b(?:scoring )?expressions?\b|\border of operations\b/i.test(text)) return {
    kind: "expression",
    title: "Try a tiny score",
    action: "Try 8 + 2 × 3 with score cards, a sketch, or mental math. Keep the two totals you get when you change which operation happens first. Then use the class rule card to decide which total is allowed.",
    finishCheck: "You can show which operation happened first and how that choice changed the score.",
    why: "Game rules can create different scores from the same numbers. Testing a tiny example helps you see the order, then write a rule another team can actually play.",
  };

  if (/\breasonable range\b|\breasonableness\b|\bdecimal\b[^.]{0,80}\bestimat|\bestimat[^.]{0,80}\bdecimal\b/i.test(text)) return {
    kind: "estimate-range",
    title: "Estimate before exact",
    action: "Try this quick check: if 4 items cost about $3 each, the total should be close to $12—not $1.20 or $120. Write a low number and a high number the exact answer could fit between. That space is called a reasonable range.",
    finishCheck: "Your low and high numbers make sense before you use an exact calculation or calculator.",
    why: "An estimate is a quick sense-check. It can catch a decimal that slid into the wrong place before a calculator makes the mistake look official.",
  };

  if (/\bsource types?\b|\bdifferent (?:kinds|types) of sources?\b/i.test(text)) return {
    kind: "source-type",
    title: "Meet the evidence",
    action: "Look at one sample map, number table, photo, interview, or article. Each is a source type—a different kind of evidence. Say one thing this source can tell you and one thing it cannot tell you.",
    finishCheck: "You named the source type and one question it could help answer.",
    why: "Maps, numbers, photos, interviews, and articles do different jobs. Knowing each job helps you choose evidence that really fits your question.",
  };

  if (/\b(?:success |selection )?criteria\b|\bconstraints?\b/i.test(text)) return {
    kind: "criteria",
    title: "Make success testable",
    action: "Compare these two design rules: “Make it awesome” and “It must hold 10 cubes for 30 seconds.” The second one is a criterion because you can test it. Circle what your design must do, then box its constraints—the limits for time, size, materials, or safety.",
    finishCheck: "Your criterion can be tested, and your constraints name the limits you must work within.",
    why: "Building gets more creative—not less—when everyone knows what the design must do and which limits can be pushed, changed, or worked around.",
  };

  if (/\bclaims?\b|\bjustif(?:y|ied|ication)\b/i.test(text)) return {
    kind: "claim",
    title: "Claim + clue",
    action: "A claim is the main idea you think is true. Evidence is the exact clue that helps prove or challenge it. Read the class example, underline the claim, and circle the clue that supports it. Add a “because…” sentence to connect them.",
    finishCheck: "A partner can point to your claim, your evidence, and the word “because” that connects them.",
    why: "An idea becomes more convincing when another person can see exactly what made you believe it—and can still ask questions or disagree.",
  };

  const strategyCount = countTerm(text, /\bstrateg(?:y|ies)\b/gi);
  const methodCount = countTerm(text, /\bmethods?\b/gi);
  if (strategyCount || methodCount) {
    if (/\b(?:numbers?|solve|calculations?|calculate|operations?|multiply|divide|decimals?|factors?|multiples?|equations?|place value|number facts?)\b/i.test(text)) return {
      kind: "strategy",
      title: "Try two ways",
      action: "A strategy is a plan for solving something. Try one small example in two ways: draw or break apart the numbers for one way, then use a fact or written method for the other. Notice which way fits these numbers better.",
      finishCheck: "Both ways reach the same answer, and you can name why one felt clearer or faster for this example.",
      why: "There can be more than one correct way to solve a problem. Comparing ways helps you choose one that fits the numbers instead of following a rule like a robot.",
    };
    return {
      kind: "strategy",
      title: "See the strategy",
      action: "A strategy is a plan you choose for reaching a goal. Look at the class example. Name the goal, the move being tried, and what result would show that the move helped.",
      finishCheck: "You can name the goal, the planned move, and the result you would watch for.",
      why: "A strategy is not a magic instruction. It is a choice people can try, watch, question, and change when the situation changes.",
    };
  }

  return null;
}

function finishCheckFor(action: string, lookFor: string | undefined, isLast: boolean) {
  if (/write a scoring expression/i.test(action)) {
    return "Another team can read the operations in the order you intended without needing an extra hint.";
  }
  if (/ask another team to decode/i.test(action)) {
    return "Their score matches the one you intended. If it does not, revise the rule and let them try again.";
  }
  if (/total that actually follows the rule/i.test(action)) {
    return "Test every move in the rule and show where your chosen total comes from.";
  }
  if (/move brackets or operations/i.test(action)) {
    return "Write the before-and-after scores so the change is easy to see.";
  }
  if (/observe what changes/i.test(action)) {
    return "Name the exact change: what moved, which operation happened first, and how the score changed.";
  }
  if (/\bclaim\b/i.test(action) && /\b(?:evidence|detail|source|clue)\b/i.test(action)) {
    return "Draw a line from the claim to the exact evidence that supports or challenges it.";
  }
  if (lookFor) return endSentence(lookFor);
  if (/^(?:solve|calculate|estimate|measure)/i.test(action)) {
    return "Use an estimate, model, or opposite operation to check that your answer makes sense.";
  }
  if (/^(?:choose|decide|predict|select)/i.test(action)) {
    return "Say what you chose and give one reason for that choice.";
  }
  if (/^(?:compare|sort|classify|order)/i.test(action)) {
    return "Name the most important match, group, or difference you found.";
  }
  if (/^(?:test|run|try|retest)/i.test(action)) {
    return "Record what actually happened, including a surprise or problem.";
  }
  if (/^(?:explain|defend|justify|state|respond)/i.test(action)) {
    return "Use a “because…” sentence and one exact example, detail, or result.";
  }
  if (/^(?:build|create|draw|write|draft|make|graph|map|design)/i.test(action)) {
    return "A partner can use or understand your work without guessing what a missing part means.";
  }
  if (/^(?:read|study|look|observe|notice|learn|inspect)/i.test(action)) {
    return "Tell a partner one important thing you noticed, in your own words.";
  }
  if (isLast) {
    return "Put a star beside the part that best shows your answer. A classmate should be able to find it without guessing.";
  }
  return "Show a partner what you did and name the part you are most sure about.";
}

const safeFallback: Omit<StudentLessonContract, "id"> = {
  reviewState: "safe-fallback",
  challenge: "Work with your class to investigate today's question.",
  why: "You will notice useful details, try an idea, and explain what helped you decide.",
  firstAction: "Listen for today's question. Point to one detail you notice or already know.",
  materials: ["The materials Mr. Wyatt provides"],
  choices: [
    {
      prompt: "How would you like to show your thinking?",
      options: [
        { label: "Speak", detail: "Explain your idea to a partner or the class." },
        { label: "Sketch", detail: "Draw and label the important parts." },
        { label: "Write", detail: "Use a few clear sentences or bullets." },
        { label: "Build or act it out", detail: "Use the class materials or a safe movement model." },
      ],
    },
  ],
  steps: [
    {
      title: "Notice",
      action: "Study the example, source, object, or problem your teacher opens.",
      finishCheck: "You can point to one detail that matters.",
    },
    {
      title: "Try",
      action: "Use the class directions to test one idea with your partner or group.",
      finishCheck: "You recorded what happened, including a surprise or problem.",
    },
    {
      title: "Explain",
      action: "Show what you learned and point to the detail, result, or source that supports it.",
      finishCheck: "Another student can follow your explanation.",
    },
  ],
  finishEvidence: ["One clear response", "One detail, result, or source that supports it", "One question, revision, or next step"],
  saveAction: {
    kind: "keep-in-class",
    message: "Keep this work in class unless Mr. Wyatt asks you to add it to SpacesEDU.",
  },
  readiness: "quick",
};

function safeContractId(id: string) {
  const candidate = id.trim();
  return /^[a-z0-9][a-z0-9-]*$/.test(candidate) ? candidate : "unreviewed-lesson";
}

/**
 * Returns reviewed copy when it exists and a complete, neutral contract when it
 * does not. The fallback never receives teacher prose, so it cannot leak admin
 * language or create grammatically broken word substitutions.
 */
export function resolveStudentLessonContract(id: string): StudentLessonContract {
  if (isReviewedStudentLessonId(id)) return reviewedStudentLessonContracts[id];
  return { id: safeContractId(id), ...safeFallback };
}

const reviewedExperienceLessonIds = new Set<string>();

/**
 * Builds a task-specific contract from fields already written for students.
 * Teacher preparation, assessment notes, and SpacesEDU prose are deliberately
 * absent from the input shape. Unsafe individual fields fall back without
 * discarding the safe, task-specific parts of the experience.
 */
export function resolveStudentLessonContractForExperience(source: StudentLessonExperienceSource): StudentLessonContract {
  if (isReviewedStudentLessonId(source.id)) return reviewedStudentLessonContracts[source.id];

  const id = safeContractId(source.id);
  const preserveAuthoredSteps = reviewedExperienceLessonIds.has(id);
  const challenge = simplifyExperienceText(source.question) || "What can you find out in this lesson?";
  const mission = simplifyExperienceText(source.studentMission);
  const product = simplifyExperienceText(source.product) || "A clear response that shows what you found out";
  // A lesson can opt into keeping its authored phases intact while it is being
  // reviewed. Fully reviewed lessons should use an explicit contract above.
  const authoredActions: SplitStudentAction[] = preserveAuthoredSteps
    ? source.steps.map((step, sourceStepIndex) => ({
      action: endSentence(simplifyExperienceText(step)),
      sourceStepIndex,
      isLastInSourceStep: true,
      isOnlyActionInSourceStep: true,
    })).filter(({ action }) => action !== ".")
    : [];
  const actions = preserveAuthoredSteps ? authoredActions : splitStudentActions(source.steps);
  const safeActions: SplitStudentAction[] = actions.length
    ? actions
    : [
      { action: "Study the question and record one useful detail.", sourceStepIndex: 0, isLastInSourceStep: true, isOnlyActionInSourceStep: true },
      { action: "Use that detail to make a clear response.", sourceStepIndex: 1, isLastInSourceStep: true, isOnlyActionInSourceStep: true },
    ];
  const conceptSupport = preserveAuthoredSteps ? null : conceptSupportFor(source);
  const studentActions = conceptSupport
    ? [{ action: conceptSupport.action, sourceStepIndex: -1, isLastInSourceStep: true, isOnlyActionInSourceStep: true }, ...safeActions]
    : safeActions;
  const lookFors = source.lookFors.map(simplifyLookFor).filter(Boolean);
  const materials = [...new Set(source.materials.map(simplifyExperienceText).filter(Boolean))].slice(0, 6);
  const choiceOptions = choiceOptionsFor(source);

  return {
    id,
    reviewState: reviewedExperienceLessonIds.has(id) ? "reviewed" : "safe-fallback",
    challenge,
    why: conceptSupport?.why ?? (mission
      ? endSentence(mission)
      : "This mission helps you answer the question with evidence another student can check."),
    firstAction: studentActions[0].action,
    materials: materials.length ? materials : ["Notebook or recording page", "Pencil"],
    choices: choiceOptions.length >= 2 ? [{
      prompt: "Choose a way to make your thinking visible:",
      options: choiceOptions,
    }] : [],
    steps: studentActions.map((studentAction, index) => {
      if (conceptSupport && index === 0) return conceptSupport;
      const { action, sourceStepIndex, isLastInSourceStep, isOnlyActionInSourceStep } = studentAction;
      return {
        title: actionTitle(action, index),
        action,
        finishCheck: finishCheckFor(
          action,
          isLastInSourceStep && isOnlyActionInSourceStep ? lookFors[sourceStepIndex] : undefined,
          index === studentActions.length - 1,
        ),
      };
    }),
    finishEvidence: [
      `Your answer to “${challenge}”`,
      "One exact example, detail, calculation, source, or test result that helped you decide",
      product,
    ],
    saveAction: fallbackSaveAction(source.spacesUse),
    readiness: fallbackReadiness(source),
  };
}

const bannedAdminLanguage = [
  ["first-pass", /\bfirst[- ]pass\b/i],
  ["registered portfolio", /\bregistered portfolio\b/i],
  ["portfolio thread", /\bportfolio thread\b/i],
  ["mastery record", /\bmastery record\b/i],
  ["session access", /\bsession access\b/i],
  ["readiness route", /\breadiness route\b/i],
  ["teacher-ready", /\bteacher[- ]ready\b/i],
  ["audit complete", /\baudit complete\b/i],
  ["curriculum imported", /\bcurriculum imported\b/i],
  ["broad baseline", /\bbroad baseline\b/i],
  ["quality-gated", /\bquality[- ]gated\b/i],
  ["corrections required", /\bcorrections required\b/i],
  ["teacher prep", /\bteacher prep\b/i],
  ["learning mode", /\blearning modes?\b/i],
  ["look-for", /\blook[- ]fors?\b/i],
  ["assessment", /\bassessment rubric\b/i],
  ["formative", /\bformative\b/i],
  ["summative", /\bsummative\b/i],
  ["proficiency", /\bproficiency\b/i],
  ["portfolio", /\bportfolio\b/i],
] as const;

export function studentContractText(contract: StudentLessonContract) {
  return [
    contract.challenge,
    contract.why,
    contract.firstAction,
    ...contract.materials,
    ...contract.choices.flatMap(choice => [
      choice.prompt,
      ...choice.options.flatMap(option => [option.label, option.detail ?? ""]),
    ]),
    ...contract.steps.flatMap(step => [step.title, step.action, step.finishCheck]),
    ...contract.finishEvidence,
    contract.saveAction.message,
  ].join(" ");
}

export function findStudentLanguageIssues(contract: StudentLessonContract) {
  const issues: string[] = [];
  const required = [
    ["challenge", contract.challenge],
    ["why", contract.why],
    ["firstAction", contract.firstAction],
    ["saveAction.message", contract.saveAction.message],
  ] as const;

  for (const [field, value] of required) {
    if (!value.trim()) issues.push(`${field} is empty.`);
  }
  if (!contract.materials.length) issues.push("materials must name at least one item.");
  if (!contract.steps.length) issues.push("steps must include at least one action.");
  if (!contract.finishEvidence.length) issues.push("finishEvidence must name what the student will show.");
  for (const choice of contract.choices) {
    if (!choice.prompt.trim()) issues.push("A choice prompt is empty.");
    if (choice.options.length < 2) issues.push(`Choice “${choice.prompt}” needs at least two meaningful options.`);
  }
  for (const step of contract.steps) {
    if (!step.title.trim() || !step.action.trim() || !step.finishCheck.trim()) {
      issues.push(`Step “${step.title || "untitled"}” needs a title, action, and finish check.`);
    }
  }

  const text = studentContractText(contract);
  for (const [label, pattern] of bannedAdminLanguage) {
    if (pattern.test(text)) issues.push(`Student copy contains admin language: ${label}.`);
  }
  return issues;
}

export function validateStudentLessonContract(contract: StudentLessonContract) {
  const issues = findStudentLanguageIssues(contract);
  return { valid: issues.length === 0, issues } as const;
}
