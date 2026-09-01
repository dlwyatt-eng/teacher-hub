import type { ProgramExperience, ReadinessLaunch, ReadinessQuestion, WordHelp } from "./program-types";

export type ProjectorLessonSupport = {
  id: string;
  screenOnly: true;
  purpose: string;
  background: string[];
  terms: WordHelp[];
  example: ReadinessLaunch["example"];
  checks: ReadinessQuestion[];
  reteach: string;
};

export type ResolvedProjectorLessonSupport = {
  support: ProjectorLessonSupport;
  isCustom: boolean;
};

export type ProjectorSupportIssue = {
  path: string;
  message: string;
};

type ProjectorLessonSupportDraft = Omit<ProjectorLessonSupport, "id" | "screenOnly">;

const support = (id: string, draft: ProjectorLessonSupportDraft): ProjectorLessonSupport => ({
  id,
  screenOnly: true,
  ...draft,
});

const terms = (...items: [term: string, meaning: string, example: string][]): WordHelp[] =>
  items.map(([term, meaning, example]) => ({ term, meaning, example }));

export const projectorLessonSupports: Record<string, ProjectorLessonSupport> = {
  "ordinary-object-story": support("ordinary-object-story", {
    purpose: "Turn one ordinary object into a short story a listener can follow, then fix one confusing part.",
    background: [
      "Start with details anyone can point to: colour, shape, marks, texture, size, and condition.",
      "You may invent the object's history. Make it clear which details are visible and which parts belong to the story.",
      "A clear short story has a beginning, a change or surprise, and an ending that connects to what came before.",
      "A listener's question shows exactly where the story needs another detail or a clearer connection.",
    ],
    terms: terms(
      ["detail", "one exact part that can be noticed", "The blue token has a silver star and a scratch across the number 8."],
      ["setting", "where and when a story happens", "The story begins in an arcade five minutes before closing."],
      ["turning point", "the moment that changes what happens next", "The token opens a game nobody has seen before."],
      ["sequence", "the order in which events happen", "First the token is found, then it is used, and finally it is returned."],
    ),
    example: {
      title: "Build a story from one scratched arcade token",
      steps: [
        "Visible facts: the token is blue, it has a silver star, the number 8, and one deep scratch. We do not claim to know its real history.",
        "Beginning: Amara finds the token beneath an old arcade cabinet five minutes before closing and wants to try one last game.",
        "Turning point: the token starts a hidden level. The screen shows a map leading to the arcade's lost-and-found box.",
        "Ending: Amara follows the map, returns a missing key, and leaves the token at the counter for the next player.",
        "A listener asks, ‘Why does Amara trust the map?’ Add: the map shows the same silver-star symbol stamped on the lost key.",
      ],
      conclusion: "The visible star became a story clue, and the listener's question led to a useful revision.",
    },
    checks: [
      {
        prompt: "Which sentence is a visible detail rather than an invented story event?",
        choices: ["The token once belonged to a champion.", "A silver star is stamped beside the number 8.", "The token unlocks a hidden level."],
        answer: 1,
        feedback: "The star and number can be pointed to. The other choices may be fun inventions, but they are not visible facts.",
      },
      {
        prompt: "A listener asks, ‘Why does Amara trust the hidden-level map?’ Which revision helps the arcade-token story most?",
        choices: ["Say maps are always trustworthy.", "Add three more arcade machines without connecting them to the question.", "Add that the map and lost key share the same silver-star mark, then show Amara checking at the counter."],
        answer: 2,
        feedback: "The revision answers the listener's exact question, returns to the token's visible star, and gives Amara a sensible way to check the clue.",
      },
    ],
    reteach: "Return to the token. Sort four sentences into ‘I can see it’ and ‘the storyteller invented it,’ then rebuild only the beginning and turning point.",
  }),

  "place-soundwalk": support("place-soundwalk", {
    purpose: "Gather exact sound evidence from one safe spot, separate observation from guesses, and build one line that helps a reader hear the place.",
    background: [
      "Listening can reveal layers of a place that our eyes miss: sounds may be near, in the middle, or far away.",
      "An observation names what you truly hear. An inference is a possible explanation that needs more evidence.",
      "Exact sound words, distance, direction, and pattern help an audience imagine a place without a recording.",
      "The same work can happen at a desk, doorway, or closed window. Nobody needs to perform or use a device.",
    ],
    terms: terms(
      ["observation", "a detail gathered directly with your senses", "I heard two bright pencil taps close to my left."],
      ["inference", "a possible explanation built from observations", "A rolling sound may come from a cart, but I need more evidence to be sure."],
      ["sound layer", "one sound placed by distance or position", "The near taps, middle wheel, and far rain make three layers."],
      ["pattern", "a sound or action that repeats in a noticeable way", "The pencil makes two taps, pauses, and repeats."],
    ),
    example: {
      title: "Map twenty seconds at a fictional library doorway",
      steps: [
        "Stay in one spot. The listening time is twenty seconds, and the three map rings are NEAR, MIDDLE, and FAR.",
        "Near: a pencil makes two bright tik-tik taps. Middle: a cart wheel makes rrr-stop while moving left.",
        "Far: rain makes a steady shhhh behind the window. Each note names a sound, distance, and pattern or direction.",
        "Observation: a wheel rumbled and stopped. Inference: someone was in a hurry. Mark the inference with ? because the sound cannot prove it.",
        "Place line: ‘Behind two bright pencil taps, a cart wheel rumbles left while rain brushes the far window with a steady shhhh.’",
      ],
      conclusion: "The line sounds vivid because every detail comes from the map; the unsupported guess stays out.",
    },
    checks: [
      {
        prompt: "Which note is an observation rather than a guess?",
        choices: ["A cart wheel made a low rrr-stop sound.", "The person pushing the cart was late.", "The cart was carrying a surprise."],
        answer: 0,
        feedback: "The wheel sound can be heard directly. The person's timing and the cart's contents are not proven by the sound.",
      },
      {
        prompt: "Which line gives the clearest sound map?",
        choices: ["The room was nice.", "There were many sounds everywhere.", "A near pencil taps twice while far rain makes a steady shhhh behind the window."],
        answer: 2,
        feedback: "It names exact sounds, distance, pattern, and location, so a reader can rebuild the layers.",
      },
    ],
    reteach: "Show only three notes: tik-tik near, rrr-stop middle, shhhh far. Place each note in one ring, then combine the three notes into one sentence.",
  }),

  "three-voices": support("three-voices", {
    purpose: "Retell one shared event through three honest viewpoints and show why the versions are different.",
    background: [
      "People can witness the same event and notice different details because they stand in different places and care about different things.",
      "A viewpoint changes selection and emphasis; it does not give permission to invent facts that the scene cannot support.",
      "An inference is a reasonable idea built from clues. It should be signalled as a possibility, not stated as a proven fact.",
      "What a narrator leaves out can shape the audience as much as what the narrator includes.",
    ],
    terms: terms(
      ["viewpoint", "the position and experience from which someone understands an event", "The goalie notices the rolling ball before the audience does."],
      ["narrator", "the voice that tells a story", "A first-person narrator says ‘I’ and only tells what that person knows."],
      ["evidence", "a detail that supports or challenges an idea", "The wet tape and bent poster show that the sign was damaged."],
      ["inference", "an idea worked out from clues and reasoning", "The dark clouds suggest more rain may be coming."],
      ["omission", "a detail that has been left out", "One version leaves out the classmates who stopped to help."],
    ),
    example: {
      title: "Hear three versions of the same windy lunch-hour moment",
      steps: [
        "Shared facts: a gust pulls a fundraiser poster from a fence, a red ball rolls toward it, Jo steps on one corner, and Ren tapes the poster back up.",
        "Jo's voice: ‘I saw the poster lift toward the puddle, so I pinned one corner with my shoe.’ This voice notices the rescue choice.",
        "Ren's voice: ‘The tape had peeled in the rain. I used two dry strips across the top.’ This voice notices the repair.",
        "The game player's voice: ‘Our ball rolled out just as the poster flew loose. I waited until Jo waved before getting it.’ This voice notices safety and timing.",
        "All three versions fit the shared facts. None claims to know what another person secretly thought.",
      ],
      conclusion: "The voices differ because each narrator notices a different part of the same supported event.",
    },
    checks: [
      {
        prompt: "Which line makes an unsupported guess about another person's thoughts?",
        choices: ["Ren used two strips of tape.", "Jo secretly wanted everyone to admire the rescue.", "The ball stopped beside the wet poster."],
        answer: 1,
        feedback: "The scene gives no clue about Jo's secret motive. A narrator may describe actions without pretending to read a mind.",
      },
      {
        prompt: "Why can the three honest versions sound different?",
        choices: ["Each narrator selects different supported details.", "Only one narrator is allowed to use facts.", "A viewpoint means facts no longer matter."],
        answer: 0,
        feedback: "Different selection and emphasis can produce different versions while the shared event stays accurate.",
      },
    ],
    reteach: "Show the four shared facts again. Give each narrator one fact to notice first, then ask which claims no narrator could honestly make.",
  }),

  "edit-room": support("edit-room", {
    purpose: "See how crops, captions, and order steer an audience, then build a fair version that keeps needed context.",
    background: [
      "A camera frame shows only part of an event. A crop can remove details that change the meaning.",
      "A caption tells the audience what to notice, but a confident caption is not automatically accurate.",
      "Changing the order of real images can suggest a cause that the full sequence does not support.",
      "A fair edit can still be short and interesting. It keeps the context needed to understand what happened.",
    ],
    terms: terms(
      ["crop", "remove the outer parts of an image", "A tight crop hides the ball beside the fallen tray."],
      ["caption", "words beside an image that guide its meaning", "‘Classmates help after a surprise spill’ gives more context than ‘Total disaster!’"],
      ["sequence", "the order in which images or events appear", "Frame 1 happened before Frame 2."],
      ["context", "surrounding information needed to understand something", "The wide frame shows that the student stepped aside to avoid a rolling ball."],
      ["emphasis", "extra attention given to one part", "A close-up and loud sound make the spill feel like the only important moment."],
    ),
    example: {
      title: "Repair a dramatic edit of a fictional hallway spill",
      steps: [
        "Full sequence: Lee carries a display tray; a ball rolls from an open gym door; Lee steps aside; the tray tips; two classmates help reset it.",
        "Misleading version: show only the tipping tray, crop out the ball, and add the caption ‘Student wrecks display.’",
        "The crop hides the reason for the sudden step, and the caption claims carelessness that the images cannot prove.",
        "Fair four-frame version: show the approaching ball, Lee moving, the spill, and the repair. Caption it ‘Quick sidestep avoids ball; display is reset.’",
        "The fair version is still brief, but the audience can see the cause, result, and response.",
      ],
      conclusion: "Editing always guides attention. Responsible editors can name their choices and keep the context the audience needs.",
    },
    checks: [
      {
        prompt: "Which choice most strongly pushes an unsupported conclusion?",
        choices: ["Showing the full four-frame order", "Cropping out the rolling ball and writing ‘Student wrecks display’", "Using a clear date on every frame"],
        answer: 1,
        feedback: "The crop removes a key cause, and the caption states blame the scene does not prove.",
      },
      {
        prompt: "Which short edit keeps the most useful context?",
        choices: ["Spill only", "Ball approaching → sidestep → spill → classmates help", "Classmates help → ball approaching → spill"],
        answer: 1,
        feedback: "That order lets the audience follow what happened without inventing a cause.",
      },
    ],
    reteach: "Reveal the five frames one at a time. Ask ‘What can we prove now?’ after each frame, then compare the wide view with the crop.",
  }),

  "character-council": support("character-council", {
    purpose: "Recommend what a character should do next using lines from the text, not just personal preference.",
    background: [
      "A strong recommendation begins with a clear choice and connects it to exact details from the text.",
      "A character's words, actions, situation, and repeated patterns can all count as evidence.",
      "A counterargument is the strongest reasonable reason someone might disagree.",
      "Changing your recommendation after better evidence appears is careful reading, not losing.",
    ],
    terms: terms(
      ["claim", "the idea you want others to accept", "Lina should ask for a new vote."],
      ["text evidence", "an exact detail from the reading that supports an idea", "The survey says 18 of 25 younger students chose the comics workshop."],
      ["motive", "a reason a character may have for acting", "Lina wants to keep a promise to her friend."],
      ["counterargument", "a strong reason someone might disagree with a claim", "Changing the vote may feel unfair after members already planned mystery night."],
      ["revise", "change an idea because new evidence makes it stronger", "After reading the event rules, the council adjusts its recommendation."],
    ),
    example: {
      title: "Council case: one library event slot, two defensible choices",
      steps: [
        "Text facts: Lina promised a friend she would support mystery night. A new survey shows 18 of 25 younger students prefer a comics workshop. The club has one event slot.",
        "Recommendation: Lina should ask the club to discuss the new survey before the final vote, rather than secretly switching sides or ignoring the evidence.",
        "Evidence: the survey represents most younger students, and the final vote has not happened yet.",
        "Counterargument: Lina made a promise, and her friend may have planned work based on it.",
        "Response: Lina can explain the new evidence honestly and propose combining a short mystery challenge with the comics workshop.",
      ],
      conclusion: "The council does more than choose a side: it uses the text, faces the strongest objection, and improves the recommendation.",
    },
    checks: [
      {
        prompt: "Which sentence is text evidence?",
        choices: ["Comics are always better.", "The survey reports that 18 of 25 younger students chose the comics workshop.", "Lina will definitely lose her friend."],
        answer: 1,
        feedback: "The survey result is stated in the case. The other sentences are preference or prediction.",
      },
      {
        prompt: "Which response takes the counterargument seriously?",
        choices: ["Promises do not matter.", "Ignore anyone who disagrees.", "Explain why the new evidence matters and offer a fair way to address the earlier promise."],
        answer: 2,
        feedback: "A strong response answers the real concern instead of dismissing it.",
      },
    ],
    reteach: "Use three colours on the case: one for facts, one for the recommendation, and one for the strongest reason to disagree.",
  }),

  "hook-cold-audience": support("hook-cold-audience", {
    purpose: "Choose an opening that earns attention and helps a new audience understand the real question.",
    background: [
      "A hook is the first moment that gives an audience a reason to pay attention.",
      "Attention is not the same as learning. A surprising opening still needs a clear path into the main idea.",
      "A useful audience test records what people notice, think the project is about, and still find confusing.",
      "Revision should answer the audience evidence, not simply make the opening louder or flashier.",
    ],
    terms: terms(
      ["hook", "an opening that draws an audience into the main idea", "‘Where would you stand if the pavement reached 38°C?’ begins with a question."],
      ["audience", "the people a message is made for", "A Grade 3 class needs a different starting explanation than a city planner."],
      ["purpose", "what the creator wants the audience to understand or do", "The purpose is to explain why shade changes how a courtyard feels."],
      ["audience evidence", "what new viewers actually say or do", "Three viewers notice the temperature but cannot name the proposed change."],
      ["revision", "a change made to improve meaning or effect", "Add the shade map immediately after the temperature question."],
    ),
    example: {
      title: "Choose an opening for the hot-courtyard investigation",
      steps: [
        "Opening A: ‘Today our group will present our research project.’ It names the task but gives the audience no reason to wonder.",
        "Opening B: ‘Where would you stand at lunch if this pavement reached 38°C?’ A heat map appears with one shaded bench.",
        "Opening C: a ten-second sparkle animation plays before the title. It may attract attention, but it does not reveal the question.",
        "Choose B because the audience must use the image, feel the decision, and meet the real investigation immediately.",
        "Test result: viewers understand heat matters but ask what can change. Revision: reveal three possible cooling moves next.",
      ],
      conclusion: "The strongest hook does two jobs: it earns attention and opens the door to the learning.",
    },
    checks: [
      {
        prompt: "Which opening best connects attention to the main idea?",
        choices: ["A loud sound with no explanation", "A surprising courtyard temperature beside a question about where students would choose to stand", "A long list of every source used"],
        answer: 1,
        feedback: "The temperature and choice create interest while pointing directly to the investigation.",
      },
      {
        prompt: "Viewers say, ‘The animation was cool, but we do not know the topic.’ What should change?",
        choices: ["Make the animation longer.", "Add more unrelated effects.", "Connect the opening image and words to the question in the first few seconds."],
        answer: 2,
        feedback: "The revision responds to the confusion instead of chasing attention alone.",
      },
    ],
    reteach: "Cover the labels on the three openings. Ask the class what question each one makes them expect, then reveal the real project question.",
  }),

  "metaphor-with-limits": support("metaphor-with-limits", {
    purpose: "Use a comparison to explain one difficult idea, then mark exactly where the comparison stops being accurate.",
    background: [
      "A metaphor connects a new idea to something an audience already understands.",
      "A useful comparison matches important features, not just appearance.",
      "Every model leaves something out. Naming the break point prevents the audience from carrying the comparison too far.",
      "Scientific words should remain visible beside the comparison so the metaphor supports accuracy instead of replacing it.",
    ],
    terms: terms(
      ["metaphor", "a comparison that says one thing is another to create meaning", "The nervous system is a message network."],
      ["feature", "an important part or quality", "Both systems carry signals between different locations."],
      ["accurate", "correct enough for the exact idea being explained", "Nerves do carry signals, so that part of the comparison is accurate."],
      ["limit", "the point where a comparison or model no longer fits", "Neurons are living cells, not copper wires."],
      ["literal", "meant as an exact fact rather than a comparison", "The brain is not literally a laptop."],
    ),
    example: {
      title: "Test ‘the nervous system is a message network’",
      steps: [
        "Idea to explain: nerves carry signals between the brain, spinal cord, and other parts of the body.",
        "Helpful match: a network also moves messages between connected locations.",
        "Second match: damage along a route can interrupt or change a message.",
        "Break point: neurons are living cells using electrical and chemical signals; they do not work exactly like internet cables and routers.",
        "Final wording: ‘A message network helps us picture signal routes, but it does not copy how living neurons create and process signals.’",
      ],
      conclusion: "A strong metaphor names the useful match and posts a clear stop sign where the match ends.",
    },
    checks: [
      {
        prompt: "Which statement uses the comparison responsibly?",
        choices: ["The brain is exactly a computer.", "A network helps show signal routes, but neurons are living cells and the match has limits.", "Any comparison is accurate if it sounds memorable."],
        answer: 1,
        feedback: "It names both the helpful connection and the place where the model breaks.",
      },
      {
        prompt: "Why add the scientific words beside a metaphor?",
        choices: ["So the comparison does not replace the real idea", "To make the sentence longer", "So no limit needs to be named"],
        answer: 0,
        feedback: "The comparison opens understanding; accurate subject words keep that understanding anchored.",
      },
    ],
    reteach: "Draw two columns: ‘matches’ and ‘breaks here.’ Sort each statement before asking the class to write the final comparison sentence.",
  }),

  "precision-poetry": support("precision-poetry", {
    purpose: "Turn an exact observation into a vivid poem without bending the science until it becomes false.",
    background: [
      "Observation records what can be noticed. Explanation tells why it may be happening. A poem can use both, but should not mix them carelessly.",
      "Precise subject words can carry sound, rhythm, and meaning; they do not have to be replaced by vague ‘poetic’ words.",
      "Imagery helps an audience picture, hear, or feel a moment through carefully chosen details.",
      "Line breaks and repeated sounds guide pace and emphasis when a poem is read aloud.",
    ],
    terms: terms(
      ["observation", "a detail noticed with senses or a tool", "Clear droplets appear on the outside of the cold bottle."],
      ["imagery", "words that help an audience picture, hear, or feel something", "Droplets gather, bright as tiny lenses."],
      ["precise", "exact enough to show the intended meaning", "Condensation is more precise than ‘water magic.’"],
      ["line break", "the place where one line ends and the next begins", "Ending a line after ‘cold’ gives that word extra weight."],
      ["rhythm", "the pattern of beats and pauses in words or movement", "Short lines slow the reader into separate observations."],
    ),
    example: {
      title: "Move from a science note to four accurate lines",
      steps: [
        "Science note: water vapour in warm air cools near the cold bottle and condenses into liquid droplets on the outside.",
        "Keep the exact anchor words ‘water vapour,’ ‘cools,’ ‘condenses,’ and ‘droplets.’",
        "Add observed imagery: ‘warm air meets / the bottle's winter skin— / droplets gather, bright / as tiny lenses.’",
        "Check accuracy: the poem does not claim the bottle leaks or creates water from nothing.",
        "Read it aloud and move the break after ‘meets’ if the class wants a quicker first beat.",
      ],
      conclusion: "The poem becomes vivid through image and rhythm while the exact process remains visible.",
    },
    checks: [
      {
        prompt: "Which line is vivid and still scientifically careful?",
        choices: ["The bottle magically invents an ocean.", "Droplets gather where water vapour cools against the glass.", "The glass leaks clouds because it feels sad."],
        answer: 1,
        feedback: "The line creates an image without changing where the droplets come from.",
      },
      {
        prompt: "What can a line break change?",
        choices: ["The pace and emphasis of the reading", "The scientific meaning of condensation by itself", "Whether evidence matters"],
        answer: 0,
        feedback: "A break guides voice and attention, but the words still need to carry an accurate idea.",
      },
    ],
    reteach: "Keep the science note on screen. Highlight one exact word, one sensory image, and one line break so students can see the three jobs separately.",
  }),

  "impossible-scene-repair": support("impossible-scene-repair", {
    purpose: "Find the broken rules in a fictional scene and repair them—or clearly invent a new rule the story follows every time.",
    background: [
      "A change in an object's motion needs an interaction such as a push, pull, collision, or other force.",
      "Sound needs matter to travel through. In the vacuum of space, an outside explosion would not send sound through the empty space to a nearby listener.",
      "Science fiction may invent new rules, but the audience needs clues and the story should use those rules consistently.",
      "A believable repair keeps the excitement while giving the action a cause the audience can follow.",
    ],
    terms: terms(
      ["physical rule", "a tested pattern for how matter, forces, or energy behave", "A push can change an object's speed or direction."],
      ["force", "a push or pull that can change motion", "A suit thruster pushes gas backward and changes the astronaut's motion."],
      ["vacuum", "a region with extremely little matter", "Space between a spacecraft and asteroid is close to a vacuum."],
      ["speculative", "deliberately imagined beyond what current evidence supports", "The story labels its instant gravity beam as invented technology."],
      ["consistent", "following the same rule across connected moments", "The portal needs the same energy key every time it opens."],
    ),
    example: {
      title: "Repair a silent-space chase without losing the action",
      steps: [
        "Broken draft: Kai leaps from a spacecraft, stops in empty space, turns left with no push, and hears an explosion outside the helmet.",
        "Motion repair: Kai fires a small suit thruster to slow down, then fires a side thruster to turn.",
        "Sound repair: the outside blast is silent to Kai; a warning vibration and radio alert arrive through the suit instead.",
        "Story clue: the fuel display drops after each thruster use, so the new motion rule creates a fresh problem.",
        "Repaired line: ‘The stars swung sideways as Kai tapped the left thruster. No boom crossed the vacuum—only the suit alarm buzzed against one wrist.’",
      ],
      conclusion: "Accurate causes can make a scene more tense because each repair adds limits and consequences.",
    },
    checks: [
      {
        prompt: "What lets Kai change direction in the repaired scene?",
        choices: ["Wanting to turn", "A push from the suit thruster", "The sound of the explosion"],
        answer: 1,
        feedback: "The thruster provides an interaction that changes Kai's motion.",
      },
      {
        prompt: "Which line handles sound in space most carefully?",
        choices: ["The boom crosses empty space to the helmet.", "The outside blast is silent, but the suit sends a radio alert and a vibration.", "Space becomes loud whenever a scene is exciting."],
        answer: 1,
        feedback: "Sound does not cross the vacuum, but a signal inside the suit can create sound or vibration for Kai.",
      },
    ],
    reteach: "Mark each action with ‘cause shown,’ ‘cause missing,’ or ‘invented rule.’ Repair only one missing cause before rereading the scene.",
  }),

  "four-arts-languages": support("four-arts-languages", {
    purpose: "Show the same moment through image, sound, a frozen pose, and movement, then notice what each form makes important.",
    background: [
      "Art forms do not simply wrap the same idea in different packaging. Each form makes some details stronger and others harder to show.",
      "Visual art can guide the eye with colour, line, shape, space, and contrast.",
      "Music and sound can build pattern, pace, mood, and expectation without showing a literal picture.",
      "Drama and movement use body position, focus, level, timing, pathway, and transition to show relationships and change.",
    ],
    terms: terms(
      ["visual art", "meaning made through visible choices such as line, colour, shape, and space", "Diagonal blue lines make the rain feel fast."],
      ["sound pattern", "an ordered set of sounds and silences", "Tap, tap, pause, whoosh suggests rain growing stronger."],
      ["tableau", "a still image made with bodies or arranged figures", "Three figures freeze beneath one small shelter."],
      ["movement phrase", "a short sequence of connected movements", "Reach, turn, duck, and slide form one phrase."],
      ["emphasis", "the choice that makes one part stand out", "A single bright umbrella becomes the main focus."],
    ),
    example: {
      title: "Translate ‘rain begins on the outdoor court’ four ways",
      steps: [
        "Image: diagonal blue lines cross a grey court while one orange ball stays bright. The contrast emphasizes the abandoned game.",
        "Sound: tap, tap, pause, then a growing brush of hands. The pattern emphasizes the rain arriving gradually.",
        "Tableau: two players lean toward a tiny shelter while one reaches back for the ball. The still image emphasizes a choice.",
        "Movement phrase: reach, zigzag, duck, slide, freeze. The pathway emphasizes the rush from open court to cover.",
        "Combine the sound pattern with the tableau: the final whoosh cues the reach back toward the ball.",
      ],
      conclusion: "The event stays the same, but each arts language guides the audience toward a different part of it.",
    },
    checks: [
      {
        prompt: "Which choice would best emphasize that the rain starts slowly?",
        choices: ["A sound pattern with wide pauses that gradually become shorter", "One unchanging loud sound", "Hiding every sound and visual clue"],
        answer: 0,
        feedback: "The changing spaces between sounds can make the audience hear the rain building.",
      },
      {
        prompt: "What is a tableau?",
        choices: ["A frozen image made with bodies or figures", "A paragraph explaining the whole scene", "A list of art supplies"],
        answer: 0,
        feedback: "A tableau communicates through still position, level, focus, and relationship.",
      },
    ],
    reteach: "Keep the rain scene fixed. Change only one form at a time and ask, ‘What does this version make you notice first?’",
  }),

  "map-what-maps-miss": support("map-what-maps-miss", {
    purpose: "Respond to one exact artist and place source, then use visual-art technique and an original symbol or metaphor while separating evidence, observation, interpretation, and unknown.",
    background: [
      "Begin with the artist, title, context, material, and place or Nation exactly as the source names them. A source is not a generic style bank.",
      "Visual artists guide attention through line, shape, colour and value, texture, positive and negative space, balance, contrast, repetition, unity, and emphasis.",
      "A direct observation can be pointed to. An artistic interpretation is the maker's chosen response. Both are valid, but they must not be labelled as the same kind of knowledge.",
      "A symbol carries an idea through a sign, object, colour, or mark; a visual metaphor shows one idea through another. Invent both from observation. Use distinct legend marks for source, observation, interpretation, and unknown.",
    ],
    terms: terms(
      ["composition", "the way visual parts are arranged", "A repeated curved path guides the eye from the roof to the garden."],
      ["negative space", "the open area around and between forms", "Quiet open paper around one shape creates emphasis."],
      ["visual metaphor", "showing one idea through another visual relationship", "A widening path can suggest a growing sense of possibility when the student labels that meaning as interpretation."],
      ["interpretation", "a meaning a viewer or artist builds from evidence and context", "The repeated curve may suggest movement, but the source must support any cultural claim."],
      ["attribution", "a clear credit naming the creator and source", "Artist, work title, date, host organization, and link appear on the source card."],
    ),
    example: {
      title: "Build one layered response to a fictional rain-courtyard evidence card",
      steps: [
        "Source layer: label the supplied card as Classroom OS fiction. It describes a rain channel, repeated bicycle-rack forms, panels, pavement, bench, wetland, and sounds.",
        "Observation layer: draw the curved water route, three repeated forms, and rough/smooth texture contrast without adding a claim about who made them.",
        "Interpretation layer: use repeated blue curves as an original symbol for movement and widening negative space as a visual metaphor for quiet attention; label both as the student's ideas.",
        "Unknown layer: mark that the card does not establish cultural meaning, community response, season, or how the site changes over time.",
        "Viewer response says the water path is clear but the bench disappears. Increase value contrast around the bench and test again.",
      ],
      conclusion: "Visual technique creates meaning while the four-part legend keeps evidence and imagination honest.",
    },
    checks: [
      { prompt: "Which note belongs under artistic interpretation?", choices: ["The official source names the artist and title.", "I directly counted three repeated forms.", "I used widening blue curves to make the water route feel more active."], answer: 2, feedback: "The artist chose the widening curves and their intended effect. The other choices are source context or direct observation." },
      { prompt: "What is the safest response to an artist-led cultural work?", choices: ["Copy its distinctive symbols into our own design.", "Credit the exact artist and context, study a technique, and create an original response without generalizing.", "Describe it as the style of all First Peoples."], answer: 1, feedback: "Exact attribution, context, technique study, and an original response protect both learning and cultural specificity." },
    ],
    reteach: "Use four different sticky-note colours. Sort six statements into source, observation, interpretation, and unknown before making another mark on the artwork.",
  }),

  "audience-remix": support("audience-remix", {
    purpose: "Curate a complete audience path, observe what a new viewer actually does, and revise one artistic choice from evidence.",
    background: [
      "Curation shapes an encounter through entry point, sequence, spacing, contrast, pacing, sound or silence, labels, audience action, and ending.",
      "An intention names what the maker hopes the audience will notice, feel, think, or do. It is a hypothesis until audience evidence supports it.",
      "A useful audience test records first notice, action, route, pause, question, misunderstanding, and barrier—not names, ratings, or popularity.",
      "Revision should target the strongest barrier or missed intention. Adding more decoration is not automatically improvement.",
    ],
    terms: terms(
      ["curation", "the selection and arrangement of a work's encounter", "The moth image becomes the entry point and the snail trail becomes the ending."],
      ["entry point", "the place or action that tells an audience how to begin", "One large image and a short prompt invite the first look."],
      ["pacing", "how quickly or slowly an encounter unfolds", "A silent pause separates two sound layers."],
      ["audience evidence", "observable actions or words gathered during a test", "The viewer started at the middle label and skipped the intended opening."],
    ),
    example: {
      title: "Repair the fictional Night Garden mini-exhibit",
      steps: [
        "First arrangement: three images, captions, and sound directions all begin at once; nothing names a starting point or ending.",
        "Intention: viewers should follow light, listen for a pattern, and trace one changing route.",
        "Test evidence: two viewers begin with different captions, one asks what to do, and both skip the sound pattern.",
        "Revision: enlarge the moth image as entry, sequence moth → rain → snail, place the sound cue at rain, and end with ‘trace one pattern.’",
        "Second test: viewers begin at the moth and reach the ending, but one cannot access the sound; add the printed graphic-score route beside it.",
      ],
      conclusion: "The revision follows audience actions and improves both artistic sequence and access.",
    },
    checks: [
      { prompt: "Which note is audience evidence?", choices: ["I think the display is beautiful.", "The viewer began at the middle caption, paused for twelve seconds, and asked where to start.", "Everyone will love the colours."], answer: 1, feedback: "It records an observable route, pause, and question without turning the test into a rating." },
      { prompt: "Which revision best addresses viewers missing the sound layer?", choices: ["Add unrelated decoration.", "Make every element flash.", "Move the sound cue into the main sequence and add a visible graphic-score route."], answer: 2, feedback: "The change targets the observed barrier and keeps an equivalent visual route." },
    ],
    reteach: "Give the class only the three Night Garden images. Ask them to build a beginning, middle, and ending, then test whether a viewer can point to the intended first action.",
  }),

  "cosmic-scale-gallery": support("cosmic-scale-gallery", {
    purpose: "Use technique trials in material, light, sound, and movement to build and safely curate one complete artistic encounter.",
    background: [
      "A technique trial is a small experiment made to learn what a material, sound, light, movement, or arrangement can do before choosing a final form.",
      "Kinetic form changes through balance, pivot, air, hand movement, gravity, or another safe interaction. A trial records both rest and motion.",
      "Light and shadow depend on opacity, translucency, colour, overlap, distance, angle, positive space, and negative space.",
      "A complete encounter has an entry, development or change, and ending, plus source credit, a readable score or label, a quiet/access route, and a deliberate limitation.",
    ],
    terms: terms(
      ["kinetic", "involving actual or suggested movement", "A balanced paper form turns gently around one pivot."],
      ["translucent", "allowing some light through", "Tracing paper layers make shadows lighter and colours overlap."],
      ["spatial score", "marks or directions showing where and how movement changes in space", "Arrows, levels, counts, and pauses map an eight-count route."],
      ["artistic intention", "the experience a creator deliberately works to shape", "The audience should notice a slow shift from separate patterns to connection."],
      ["limitation", "something the work deliberately cannot or does not show", "The tabletop form suggests wind but does not reproduce an outdoor ecosystem."],
    ),
    example: {
      title: "Turn four small trials into one tabletop encounter",
      steps: [
        "Kinetic trial: three paper shapes balance around one clip pivot and move only when a viewer gently fans from the marked spot.",
        "Light trial: translucent blue and opaque black layers create a changing shadow as the form turns.",
        "Sound trial: a printed graphic score offers tap–silence–brush; a silent visual rhythm route remains beside it.",
        "Movement trial: arrows and eight counts invite the viewer's hand to follow the changing shadow without touching the form.",
        "Test evidence shows the ending is unclear. Add a final still frame and the prompt ‘Where did separate patterns meet?’ Then retest.",
      ],
      conclusion: "The encounter grows from technique evidence, states its limit, and includes a safe equivalent route.",
    },
    checks: [
      { prompt: "Which is a technique trial rather than a finished product?", choices: ["A small test comparing opaque and translucent paper at three distances", "A decorated poster made before testing any material", "A title chosen without making"], answer: 0, feedback: "The small comparison produces evidence about what light and material can do." },
      { prompt: "Which curation plan is safest and most accessible?", choices: ["Darken all travel routes and use a strobe.", "Keep exits lit, use one steady safe light, mark a stable tabletop route, and provide visual and quiet alternatives.", "Hang strings across the doorway."], answer: 1, feedback: "The steady tabletop route protects movement, vision, sound, and exit safety while keeping the artistic investigation intact." },
    ],
    reteach: "Use only paper and one steady light. Compare opaque, translucent, near, and far arrangements; record what changes before deciding what the work should mean.",
  }),

  "same-facts-frame": support("same-facts-frame", {
    purpose: "Compose, notate, rehearse, perform, and revise a short work whose beat, rhythm, silence, timbre, dynamics, texture, and form serve an intention.",
    background: [
      "Music organizes sound and silence through time. A steady beat can support many rhythms; metre groups beats; form organizes larger sections.",
      "Pitch names how high or low a sound is. Timbre is its tone colour. Dynamics name changes in volume. Texture describes how sound layers combine.",
      "Graphic notation uses shapes, lines, spacing, symbols, and a key so another performer can follow the composer's intention.",
      "A performer test reveals whether the score communicates. The composer revises notation or musical structure from evidence—not from a popularity vote.",
    ],
    terms: terms(
      ["rhythm", "a pattern of sound lengths and silences", "Tap–tap–silence–brush uses four different time events."],
      ["timbre", "the tone colour that makes sound sources distinct", "The same rhythm sounds different on a desk, shaker, or voice."],
      ["dynamics", "how soft or loud music is and how volume changes", "The score grows from soft to medium, then stops."],
      ["texture", "how many sound layers combine and how they relate", "A steady pulse continues beneath two alternating patterns."],
      ["form", "the larger order of sections", "A–A–B–A repeats one idea, contrasts it, and returns."],
    ),
    example: {
      title: "Write a 24-second rain-window graphic score another group can perform",
      steps: [
        "Intention: begin with separate drops, build a layered downpour, then leave one quiet final sound.",
        "Key: dot = short tap; long line = held brush; empty box = two beats of silence; > = grow louder; stacked marks = play together; ×2 = repeat.",
        "Form: A uses four spaced taps. A repeats more softly. B layers a steady hand brush beneath eight faster taps and grows louder. The ending is two silent beats plus one soft tap.",
        "A new group performs without coaching. They stop at the stacked symbols because the start points are unclear.",
        "Revision: align the stacked marks on a timeline and add one conductor cue. The second group enters together and reaches the intended silent ending.",
      ],
      conclusion: "The revised score makes musical intention performable through clear notation, structure, sound, and silence.",
    },
    checks: [
      {
        prompt: "Which score direction changes dynamics?",
        choices: ["Grow from soft to medium across eight beats.", "Use a wood block instead of a voice.", "Repeat section A."],
        answer: 0,
        feedback: "Soft-to-medium changes volume. The other choices change timbre or form.",
      },
      {
        prompt: "What is the strongest evidence that graphic notation works?",
        choices: ["The composer likes how it looks.", "A new group can perform the intended sequence and ending without coaching.", "The page uses many colours."],
        answer: 1,
        feedback: "A no-coaching performance tests whether the score communicates its timing, layers, symbols, and ending.",
      },
    ],
    reteach: "Use four beats only. Put one dot, one long line, one silence box, and one repeat sign on a timeline; perform, swap scores, and repair one symbol.",
  }),

  "rights-in-thirty": support("rights-in-thirty", {
    purpose: "Compare three dramatic forms, then use one safe form, movement, and optional sound to show a barrier and possible repair without acting out harm.",
    background: [
      "A right names something people should be able to have, do, or be protected from. A barrier blocks fair access or participation.",
      "A remedy is an action that removes or reduces the barrier; it should connect directly to the problem shown.",
      "A tableau sequence uses connected frozen images; a narrated scene links safe action with narration; readers' theatre uses vocal interpretation and little movement. Rehearse one moment in two forms, then choose for intention.",
      "An audience response tells whether the right, barrier, and repair were understandable—not whether the performance was flashy.",
    ],
    terms: terms(
      ["barrier", "something in a design or system that blocks access or participation", "Tiny print and stairs-only entry block some people from joining the meeting."],
      ["dramatic form", "an organized way of shaping a drama", "The group compares a tableau sequence with readers' theatre before choosing."],
      ["tableau", "a frozen image made with bodies or arranged figures", "One figure faces a stairs-only entrance while others gather inside."],
      ["focus", "where the audience is guided to look", "Every figure turns toward the unreadable sign."],
      ["gesture", "a body or hand movement that communicates an idea", "An open hand points from the barrier to the new route."],
    ),
    example: {
      title: "Show access changing at a fictional youth meeting",
      steps: [
        "Case: the meeting notice uses tiny print, and the room is reached only by stairs. Some community members cannot get the information or enter the space.",
        "Before tableau: one figure faces the stairs, one holds the tiny notice at arm's length, and the group inside looks away.",
        "Transition: two low drum taps stop; the notice grows into large clear symbols while an open hand traces a step-free route.",
        "After tableau: the group forms one level semicircle around the shared information, with more than one way to join.",
        "Audience check: viewers name the tiny notice and stairs as barriers, then point to the larger information and new route as repairs.",
      ],
      conclusion: "The artistic choices make the change in access visible without asking anyone to perform a person's harm.",
    },
    checks: [
      {
        prompt: "Which change is a remedy for the case shown?",
        choices: ["Make the stairs a brighter colour only.", "Add a step-free route and information in clear visual and audio forms.", "Ask people facing barriers to try harder."],
        answer: 1,
        feedback: "The repair responds directly to both the entrance and information barriers.",
      },
      {
        prompt: "What should the audience be able to name after the scene?",
        choices: ["The right or access need, the barrier, and the repair", "Which performer was most dramatic", "A private story from a classmate"],
        answer: 0,
        feedback: "Understanding the case and change matters more than performance intensity or personal disclosure.",
      },
    ],
    reteach: "Use three on-screen labels—ACCESS, BARRIER, REPAIR—and place each detail from the fictional case under one label before rebuilding the tableaux.",
  }),

  "search-under-hood": support("search-under-hood", {
    purpose: "Turn a vague search into a focused question and choose a result because it fits the job—not because it appears first.",
    background: [
      "Search results are ranked by many signals. First can mean close word match, popularity, location, promotion, or other factors—not best evidence.",
      "A focused query names the topic, the exact question, and helpful details such as place, grade level, diagram, or date.",
      "An ad or sponsored result has paid for placement. It may be useful, but the label and selling purpose matter.",
      "A cropped post or repost is not usually the original source. Trace a claim back to who first published the complete information.",
    ],
    terms: terms(
      ["query", "the words entered into a search tool", "‘why Moon phases change Grade 6 diagram’ is more focused than ‘space.’"],
      ["sponsored result", "a result placed as advertising", "A moon-lamp shop appears above an educational explanation and is marked Sponsored."],
      ["snippet", "a short preview shown beneath a search result", "The snippet may leave out warnings or context from the full page."],
      ["original source", "the earliest available place where information was published", "Open the full science museum explanation instead of relying on a cropped repost."],
      ["purpose", "the reason a source was created", "A store page aims to sell; a museum page may aim to explain."],
    ),
    example: {
      title: "Choose among three fictional results for a Moon-phases question",
      steps: [
        "Vague query: ‘space.’ Focused query: ‘why Moon phases change Grade 6 diagram.’",
        "Result 1 is marked Sponsored: ‘Mega Moon Lamp—50% Off.’ It matches ‘Moon’ but aims to sell a lamp.",
        "Result 2 is a dated science-museum page titled ‘Moon phases: sunlight and our view,’ with a labelled diagram and named educator.",
        "Result 3 is an undated repost saying ‘Earth's shadow makes every phase,’ with no author or link to evidence.",
        "Choose Result 2, open the full page, and check whether its diagram and explanation directly answer the focused question.",
      ],
      conclusion: "A useful search path begins with a clear question and ends at a source that can actually support the answer.",
    },
    checks: [
      {
        prompt: "Which result best fits the question ‘Why do Moon phases change?’",
        choices: ["A sponsored moon-lamp store", "A named science-museum explanation with a labelled diagram", "An author-free repost that makes a claim but gives no source"],
        answer: 1,
        feedback: "The museum result matches the question and gives visible source information to check.",
      },
      {
        prompt: "A cropped post makes a surprising claim. What is the strongest next move?",
        choices: ["Share it because it looks polished.", "Trace it to the complete original source and check creator, date, purpose, and evidence.", "Assume the first search result confirms it."],
        answer: 1,
        feedback: "The complete source provides context that a cropped post or short snippet may hide.",
      },
    ],
    reteach: "Put TOPIC, EXACT QUESTION, and HELPFUL DETAIL on screen. Improve one word group at a time, then compare the jobs of the store, museum, and repost.",
  }),

  "access-by-design": support("access-by-design", {
    purpose: "Use a fictional user's own evidence to remove a barrier and give more than one clear way to use a design.",
    background: [
      "A barrier often comes from the design, not from a person failing to use it correctly.",
      "A user brief records what a fictional user says works, what gets in the way, and what the design needs to do.",
      "Do not pretend to experience another person's disability. Use stated evidence and ask users what works for them.",
      "An accessible design often offers more than one route: words and symbols, sound and text, touch and keyboard, or standing and seated use.",
    ],
    terms: terms(
      ["barrier", "something in a design that makes a task harder or blocks it", "One dense paragraph makes the recycling steps hard to track."],
      ["user evidence", "information a user gives about what works and what does not", "Sam says short numbered steps and matching icons help them keep their place."],
      ["requirement", "something the design must do", "The sign must separate containers, paper, and landfill clearly."],
      ["constraint", "a limit the design must work within", "The sign must fit above a bin station that is 60 centimetres wide."],
      ["prototype", "a first version built to test an idea", "A clickable sign mock-up is tested before the final sign is made."],
    ),
    example: {
      title: "Redesign a fictional recycling sign from the user's evidence",
      steps: [
        "First design: one small grey paragraph explains all three bins. Similar colours and no heading make the steps hard to scan.",
        "User brief: Sam can read the words but loses their place in dense blocks. Short numbered steps and matching icons help. Sam does not want sound to be the only route.",
        "Requirements: name all three bins, show one example item for each, and keep every instruction available as text.",
        "New version: three high-contrast columns use a number, icon, short label, and example item. Keyboard focus follows the same 1–2–3 order.",
        "Test result: a new user sorts all three example items but confuses the two blue icons. Revision: change the paper icon shape and add its word label below.",
      ],
      conclusion: "The change follows user evidence, keeps multiple routes, and improves a specific result from the test.",
    },
    checks: [
      {
        prompt: "Which change responds most directly to Sam's stated evidence?",
        choices: ["Replace the paragraph with short numbered steps, icons, and text labels.", "Remove every word and use sound only.", "Ask Sam to practise the original sign longer."],
        answer: 0,
        feedback: "The revised route uses the supports Sam named and keeps the information available in more than one form.",
      },
      {
        prompt: "What should happen after two icons are confused in the test?",
        choices: ["Blame the new user.", "Change the icons or labels and test that part again.", "Decorate the rest of the sign first."],
        answer: 1,
        feedback: "A test reveals where the design—not the user—needs another change.",
      },
    ],
    reteach: "Underline only the words spoken by the fictional user. Match each design change to one underlined detail before discussing extra ideas.",
  }),

  "bloxels-game-studio": support("bloxels-game-studio", {
    purpose: "Build a short game route that tells the player who they are, what to do, why it matters, and how the game responds.",
    background: [
      "A playable story connects the character's goal to actions the player can actually perform.",
      "A game mechanic is a repeated action or rule such as collecting, avoiding, choosing, unlocking, or protecting.",
      "Useful feedback shows what changed: a door opens, a counter rises, a sound confirms a choice, or the route changes.",
      "Watching a new player reveals confusing design. The designer should observe first and explain only after the test.",
    ],
    terms: terms(
      ["player goal", "the result the player is trying to reach", "Restore power to the shelter before the storm arrives."],
      ["game mechanic", "an action or rule that shapes play", "Collecting three energy cells unlocks the shelter door."],
      ["feedback", "a response that shows what an action changed", "The cell counter moves from 2/3 to 3/3 and the locked door glows."],
      ["level", "one playable area with a route, challenge, and endpoint", "The rooftop level ends when the shelter power turns on."],
      ["playtest", "watching someone try a game so the design can improve", "A new player misses the first clue, so the sign moves beside the starting point."],
    ),
    example: {
      title: "Read one complete story route before opening the builder",
      steps: [
        "Start screen: ‘You are Nova, the youngest rooftop keeper. Restore the storm shelter before the clouds arrive.’",
        "Route: START → clue sign → Cell 1 on the safe lower path → Cell 2 behind a moving gate → Cell 3 after helping a trapped drone → SHELTER.",
        "Mechanic: collect three cells. Feedback: the counter changes after each cell and the shelter door shifts from red to green at 3/3.",
        "Story change: helping the drone opens a shortcut, so the player's caring choice affects the route instead of appearing only in text.",
        "Playtest note: two players walk past the first clue. Revision: place the clue in the player's path and shorten it to one action sentence.",
      ],
      conclusion: "The story lives inside the route, choices, and feedback—not only in an introduction before play begins.",
    },
    checks: [
      {
        prompt: "Which version gives the clearest playable goal?",
        choices: ["Explore somehow.", "Collect three energy cells to unlock the shelter before the storm.", "Read a long backstory before moving."],
        answer: 1,
        feedback: "The player knows the action, amount, destination, and reason.",
      },
      {
        prompt: "Two new players miss the first clue. Which revision uses that evidence?",
        choices: ["Add more decoration to the final room.", "Move the clue into the starting route and shorten its instruction.", "Explain the clue aloud every time someone plays."],
        answer: 1,
        feedback: "The game itself should communicate without depending on the designer's live explanation.",
      },
    ],
    reteach: "Trace the example route with one finger. Stop at each point and ask: ‘What does the player know, do, and see change here?’",
  }),

  "everyone-in-game": support("everyone-in-game", {
    purpose: "Use a fictional participation tally to change one game rule so more players have useful choices and ways back into play.",
    background: [
      "A game can use the same rule for everyone and still give most choices, space, or touches to only a few players.",
      "Fair play includes safety, respect, useful participation, and a quick route back after a mistake.",
      "A tally can show patterns in the game design without ranking real classmates or judging skill.",
      "Change one feature, replay, and compare evidence before deciding whether the rule helped.",
    ],
    terms: terms(
      ["participation", "taking a useful part in an activity", "A player can pass, move into space, defend, coach, or restart play."],
      ["fair play", "safe and respectful play that gives people meaningful ways to join", "The rule has no elimination and uses calm restarts."],
      ["re-entry", "a clear way to return after leaving or pausing", "After a miss, the player returns through the side zone on the next pass."],
      ["open space", "an area a player can move into safely", "Spreading toward the sidelines creates another passing option."],
      ["evidence", "information used to judge whether a change worked", "The second-round tally shows touches spread across all four fictional players."],
    ),
    example: {
      title: "Compare two fictional rounds of a four-player passing game",
      steps: [
        "Round 1 rule: any player may score after one pass; a missed catch means sitting out until the next score. Touch tally: A 9, B 1, C 0, D 2.",
        "Problem shown: one player controls most touches, one has none, and sitting out removes chances to practise.",
        "Change: no elimination; the ball must reach two different teammates before a score; the restart begins with a player who had no touch in the last play.",
        "Round 2 fictional tally: A 4, B 3, C 3, D 4. Every player now has repeated choices and quick re-entry.",
        "Limit: touches do not show everything about safety, enjoyment, or movement quality, so observers also record those patterns.",
      ],
      conclusion: "The rule is kept because the new evidence shows wider participation, while the class still names what the tally cannot prove.",
    },
    checks: [
      {
        prompt: "Which change most directly addresses Player C receiving zero touches?",
        choices: ["Eliminate players after one miss.", "Restart with a player who had no touch and require passes to two teammates.", "Let Player A keep the ball longer."],
        answer: 1,
        feedback: "The change creates a real route into play instead of asking the excluded player to wait.",
      },
      {
        prompt: "What can the touch tally show?",
        choices: ["How choices were spread during the fictional rounds", "Every player's private feelings", "Which person is best"],
        answer: 0,
        feedback: "The tally shows one participation pattern. It cannot measure feelings or rank people.",
      },
    ],
    reteach: "Show only the two tallies first. Ask what changed, then reveal the rule change and connect one part of the rule to one change in the numbers.",
  }),

  "trusted-health-studio": support("trusted-health-studio", {
    purpose: "Check a health message for source, evidence, purpose, and safe next steps using only fictional examples.",
    background: [
      "A confident voice, polished video, or large follower count does not prove a health claim is accurate.",
      "Ask who created the message, what evidence is shown, when it was updated, and whether the creator benefits from the choice.",
      "Health messages may inform, support, entertain, persuade, or sell. The purpose changes how carefully the claim must be checked.",
      "For a real health decision, use current approved information and a trusted adult or qualified health professional; class discussion never requires personal disclosure.",
    ],
    terms: terms(
      ["source", "the person or organization that created information", "The drink company is the source of its own advertisement."],
      ["evidence", "information that supports or challenges a claim", "A slogan is not the same as results from careful research."],
      ["purpose", "the reason a message was created", "An advertisement aims to sell a product."],
      ["influence", "something that may shape a choice or belief", "Bright graphics and a famous creator may influence attention without proving the claim."],
      ["help-seeking", "choosing a safe person or service for support", "A student can bring a real health question privately to a trusted adult or qualified professional."],
    ),
    example: {
      title: "Check a fictional ‘focus drink’ advertisement",
      steps: [
        "Message: ‘NeonFocus guarantees perfect concentration all day!’ The video is posted by the company selling the drink.",
        "Source and purpose: the company is named, and the page includes a BUY NOW button, so selling is a clear purpose.",
        "Evidence check: the video gives no study, qualified reviewer, amount, limit, or date. A dramatic before-and-after clip cannot prove the guarantee.",
        "Safer conclusion: the claim is not supported by the information shown and should not guide a health choice.",
        "Next step for a real question: use an approved health source and ask a trusted adult or qualified health professional privately.",
      ],
      conclusion: "Checking the message does not require anyone to share what they use, feel, or experience.",
    },
    checks: [
      {
        prompt: "Which clue most clearly shows a selling purpose?",
        choices: ["A BUY NOW button from the company that posted the claim", "The video uses a blue background", "The title contains five words"],
        answer: 0,
        feedback: "The creator benefits if viewers purchase the product, so the evidence needs careful checking.",
      },
      {
        prompt: "What is the safest response to a real health question?",
        choices: ["Trust the most confident influencer.", "Use current approved information and ask a trusted adult or qualified health professional privately.", "Ask classmates to reveal their experiences."],
        answer: 1,
        feedback: "Reliable help and privacy matter more than popularity or public disclosure.",
      },
    ],
    reteach: "Place SOURCE, EVIDENCE, PURPOSE, and NEXT STEP around the fictional ad. Fill one box at a time and leave personal experiences out.",
  }),

  "learning-user-manual": support("learning-user-manual", {
    purpose: "Build a useful learning guide from actions you can point to, then pair one helpful condition with a responsibility and a small goal.",
    background: [
      "A learning guide describes what helps right now. It can change as you practise, grow, and meet different work.",
      "A strength is clearer when it names an action and evidence, not a fixed label such as ‘smart’ or ‘bad at writing.’",
      "A helpful condition and a responsibility work as a pair: name what helps, then name the action you can take.",
      "A small goal includes one result, one first step, a check date, and a person or place to ask for help.",
    ],
    terms: terms(
      ["strength", "a useful action or ability supported by an example", "Noor tested a new strip after the first paper bridge bent."],
      ["evidence", "an exact example that supports an idea", "The changed strip held ten counters on the second test."],
      ["learning condition", "a feature of the setting or task that helps learning", "Seeing one direction at a time helps Noor begin."],
      ["responsibility", "an action you agree to take", "Noor points to the current step and asks one clear question when stuck."],
      ["goal", "a result you plan to work toward", "Begin the first step within two minutes in three class tasks by September 30."],
    ),
    example: {
      title: "Build Noor's learning guide from one fictional class moment",
      steps: [
        "Class moment: Noor saw a paper bridge bend, moved one strip, tested it again, and later asked to see one writing direction at a time.",
        "Strength and evidence: ‘I test and improve ideas. When the bridge bent, I moved one strip and tested again.’",
        "Helpful condition: ‘I work best when I can see one direction at a time.’ This describes a current strategy, not a permanent label.",
        "Support and responsibility: ‘Show one direction at a time. I will point to my current step and ask one clear question if I am stuck.’",
        "Goal: ‘By September 30, I will begin within two minutes in three class tasks. First step: underline the action word. Check: Friday. Help: teacher or partner.’",
      ],
      conclusion: "Noor's guide is useful because every claim points to an action and ends with a next step that can be checked.",
    },
    checks: [
      {
        prompt: "Which strength statement includes evidence?",
        choices: ["I am just a creative person.", "I improved the bridge by moving one strip and testing it again.", "I am always good at every project."],
        answer: 1,
        feedback: "The bridge action is an exact example another person could point to; the other choices are broad labels.",
      },
      {
        prompt: "Which pair balances useful help with a student responsibility?",
        choices: ["Give me every answer; I will wait.", "Show one direction at a time; I will point to my step and ask one clear question.", "Remove every hard task; I will avoid practising."],
        answer: 1,
        feedback: "The condition makes the task clearer, and the student action keeps the learner involved.",
      },
    ],
    reteach: "Return to Noor's bridge action. Build only two boxes—‘What happened?’ and ‘What strength does that action show?’—before adding one helpful condition.",
  }),

  "project-rescue-studio": support("project-rescue-studio", {
    purpose: "Turn a stressful fictional project into small ordered tasks, fair roles, a check-in, and a backup plan.",
    background: [
      "A clear outcome says what will be finished and what ‘working’ will look like.",
      "Large work becomes manageable when it is divided into small visible tasks with an owner and a time window.",
      "Some tasks must happen before others: facts need checking before final labels are printed.",
      "A planned check-in catches problems early, and a backup plan protects the goal when something changes.",
    ],
    terms: terms(
      ["outcome", "the finished result the team is trying to create", "A three-station ecosystem display that teaches one food-web change accurately."],
      ["task", "one small action that can be finished and checked", "Confirm the three organism facts by Tuesday."],
      ["task order", "which jobs must happen before others can begin", "Check the facts before recording the final audio guide."],
      ["check-in", "a planned pause to see what is working and what needs to change", "On Wednesday, the team tests one complete station."],
      ["backup plan", "a second route used if the first plan is blocked", "If the printer fails, display the labels on the classroom screen."],
    ),
    example: {
      title: "Rescue the fictional Friday ecosystem display",
      steps: [
        "Broken plan: ‘Make it amazing by Friday.’ Eli does all research and building, materials are unknown, labels are printed before facts are checked, and there is no test.",
        "Clear outcome: three small stations must each show one accurate food-web change and give visitors one action to try.",
        "Ordered tasks: confirm facts → sketch stations → list available materials → build one station → test it Wednesday → revise → finish the other two.",
        "Fair roles rotate across fact checker, builder, visual designer, and visitor tester. No one person owns every difficult task.",
        "Surprise: the printer fails Thursday. Backup: use large handwritten labels and project the diagram already saved by the team.",
      ],
      conclusion: "The rescued plan is calmer because everyone can see the next task, the correct order, the check-in, and the backup route.",
    },
    checks: [
      {
        prompt: "Which task must happen before the final audio guide is recorded?",
        choices: ["Check the organism facts.", "Choose celebration music.", "Wait until Friday to look at the plan."],
        answer: 0,
        feedback: "Recording before checking could lock an error into every station.",
      },
      {
        prompt: "The printer fails on Thursday. Which response protects the goal?",
        choices: ["Cancel the whole display.", "Use readable handwritten labels and project the saved diagram.", "Pretend labels were never needed."],
        answer: 1,
        feedback: "The backup changes the tool while keeping the learning goal and visitor experience.",
      },
    ],
    reteach: "Drag the seven example tasks into order. Draw an arrow only when one task truly must happen before another.",
  }),

  "career-constellation": support("career-constellation", {
    purpose: "Reveal the many kinds of work behind one familiar project and connect each role to skills, tools, and more than one pathway.",
    background: [
      "Most useful projects depend on a network of paid work, care, service, technical skill, creative work, leadership, and volunteering.",
      "A transferable skill can help in many roles: explaining clearly, measuring, organizing, noticing patterns, repairing, or including others.",
      "People reach similar work through different combinations of school, training, practice, mentors, community experience, and changing technology.",
      "Career exploration expands possibilities; it does not require an eleven-year-old to choose one permanent job.",
    ],
    terms: terms(
      ["role", "one part of the work in a larger project", "An irrigation technician designs and checks the watering system."],
      ["transferable skill", "a skill useful in many kinds of work", "Clear explanation helps a garden educator, designer, organizer, and technician."],
      ["pathway", "a possible route for learning and entering work", "A person may begin through a class, mentor, club, course, job, or community project."],
      ["mentor", "a person who shares guidance and experience", "A parks worker shows a student team how planting plans are tested."],
      ["service", "work that helps people or a community need", "Volunteers and staff organize accessible garden events."],
    ),
    example: {
      title: "Build a career constellation around a community garden",
      steps: [
        "Visible roles: gardener, builder, and event leader. Hidden roles: soil scientist, irrigation technician, translator, graphic designer, purchaser, accessibility advisor, and volunteer coordinator.",
        "Skill links: measuring connects the builder and irrigation technician; clear communication connects the translator, designer, educator, and coordinator.",
        "Tool links: soil tests, mapping software, hand tools, budgets, signs, and scheduling tools support different parts of the same garden.",
        "Pathways differ: community volunteering, a school garden, a mentor, technical training, university study, and workplace practice can all add experience.",
        "Low-risk sample next step: interview a fictional role card on screen and choose one tiny task that lets a student try its skill.",
      ],
      conclusion: "The constellation replaces one ‘hero job’ with a connected system of roles, skills, tools, service, and learning routes.",
    },
    checks: [
      {
        prompt: "Which role may be easy to miss but is important for more people to use the garden?",
        choices: ["Accessibility advisor", "Only the person in the project photo", "No role beyond the gardener"],
        answer: 0,
        feedback: "Access work is part of the system even when it is less visible in the final picture.",
      },
      {
        prompt: "Which statement best describes a transferable skill?",
        choices: ["It belongs to only one job forever.", "It can support many roles and projects.", "It is a personality label a person cannot change."],
        answer: 1,
        feedback: "Skills such as explaining, measuring, organizing, and repairing can travel across many kinds of work.",
      },
    ],
    reteach: "Start with the garden in the centre. Add one role at a time and draw a line only after naming the exact skill, tool, or service that connects it.",
  }),

  "magnitude-gallery": support("magnitude-gallery", {
    purpose: "Place large whole numbers on the same scale and explain how place value changes their size.",
    background: [
      "A digit's value depends on its position. Moving one place left makes its value ten times as large.",
      "Commas separate groups of three digits: ones, thousands, millions, and billions.",
      "A benchmark such as 0, 10 million, or 50 million helps locate a number before exact calculation.",
      "Two numbers should be compared on the same scale; changing the scale can make a difference look larger or smaller.",
    ],
    terms: terms(
      ["place value", "the value a digit has because of its position", "The 4 in 42,800,000 means forty million."],
      ["magnitude", "the size of a number or amount", "42,800,000 has ten times the magnitude of 4,280,000."],
      ["benchmark", "a familiar value used for comparison", "25,000,000 is the halfway benchmark on a 0-to-50-million line."],
      ["scale", "the values shown and the spacing between marks", "Each mark increases by 10 million."],
    ),
    example: {
      title: "Place 4,280,000 and 42,800,000 on one number line",
      steps: [
        "Use a 0-to-50,000,000 line marked every 10,000,000. The halfway point is 25,000,000.",
        "4,280,000 is a little less than halfway from 0 to 10,000,000, so place it near 4.3 million.",
        "42,800,000 is a little more than two tenths of the way from 40,000,000 to 50,000,000, so place it near 42.8 million.",
        "The digits are the same, but every digit in 42,800,000 is one place farther left than in 4,280,000.",
        "Therefore 42,800,000 is exactly ten times 4,280,000.",
      ],
      conclusion: "Place value and a shared scale make the tenfold size difference visible.",
    },
    checks: [
      {
        prompt: "Which number belongs just past 40 million on a 0-to-50-million line?",
        choices: ["4,280,000", "42,800,000", "428,000"],
        answer: 1,
        feedback: "42.8 million lies between 40 million and 50 million, close to 40 million.",
      },
      {
        prompt: "What happens when 4,280,000 becomes 42,800,000?",
        choices: ["Each digit moves one place left, so the number becomes ten times as large.", "The number becomes twice as large.", "Only a zero is added, so the value stays the same."],
        answer: 0,
        feedback: "Moving every digit one place left multiplies its place value by ten.",
      },
    ],
    reteach: "Place both numbers in a place-value chart. Slide every digit one column left, then connect the columns to the same 0-to-50-million line.",
  }),

  "pack-and-sync": support("pack-and-sync", {
    purpose: "Decide when factors build equal kits and when multiples predict repeating events meeting again.",
    background: [
      "A factor divides a whole number with no remainder. Factors help when a fixed collection must be split into identical groups.",
      "A multiple is found by multiplying a whole number. Multiples help when a pattern repeats again and again.",
      "For the greatest number of identical kits, look for the greatest factor shared by every quantity.",
      "For the first time two schedules meet again, list multiples until the first shared value appears.",
    ],
    terms: terms(
      ["factor", "a whole number that divides another whole number with no remainder", "12 is a factor of 24 and 36."],
      ["common factor", "a factor shared by two or more numbers", "1, 2, 3, 4, 6, and 12 are common factors of 24 and 36."],
      ["greatest common factor", "the largest factor shared by the numbers", "The greatest common factor of 24 and 36 is 12."],
      ["multiple", "a number in a repeated multiplication pattern", "Multiples of 4 are 4, 8, 12, 16, and so on."],
      ["least common multiple", "the first positive multiple shared by two or more numbers", "The least common multiple of 4 and 6 is 12."],
    ),
    example: {
      title: "Solve one packing mission and one signal mission",
      steps: [
        "Packing: split 24 blue badges and 36 gold badges into the greatest possible number of identical kits with no leftovers.",
        "The greatest shared factor is 12, so make 12 kits. Each kit receives 24 ÷ 12 = 2 blue and 36 ÷ 12 = 3 gold badges.",
        "Signal: one beacon flashes every 4 seconds and another every 6 seconds. Find the first time after 0 when they flash together.",
        "Multiples of 4: 4, 8, 12. Multiples of 6: 6, 12. The first shared time is 12 seconds.",
        "Factors answer ‘how many equal groups?’ Multiples answer ‘when will repeating patterns meet?’",
      ],
      conclusion: "The story of the problem—not a keyword alone—tells us whether to group with factors or extend repeats with multiples.",
    },
    checks: [
      {
        prompt: "Which idea fits making the greatest number of identical kits from fixed supplies?",
        choices: ["Greatest common factor", "Least common multiple", "A random larger number"],
        answer: 0,
        feedback: "The number of kits must divide every supply amount with no leftovers.",
      },
      {
        prompt: "Lights flash every 3 seconds and 5 seconds. When do they first flash together after 0?",
        choices: ["8 seconds", "15 seconds", "30 seconds"],
        answer: 1,
        feedback: "15 is the first positive number that appears in both the multiples of 3 and the multiples of 5.",
      },
    ],
    reteach: "Draw two doors: ‘split fixed supplies’ and ‘extend repeating schedules.’ Sort the two example missions before calculating.",
  }),

  "each-one-teach-one": support("each-one-teach-one", {
    purpose: "Design one short experience that helps a learner understand a verified idea, then improve it using evidence from a new learner.",
    background: [
      "Start with a focused learning goal and at least two teacher-approved sources. A confident explanation is not enough when its claim cannot be checked.",
      "Draw the complete learner journey on paper before opening a build tool: invitation, action, information, choice or interaction, feedback, check, and ending.",
      "A physical station, paper branch, Bloxels route, Minecraft model, or approved private app/site can show the same design thinking.",
      "AI may offer questions or debugging ideas, but people verify claims, protect privacy, make the final choices, and write the final reflection.",
    ],
    terms: terms(
      ["learning intention", "a clear statement of what the learner should understand or be able to do", "I can explain why a wide base helps a tower resist tipping."],
      ["branch", "a choice that sends a learner to a different useful next step", "Choosing the narrow base opens feedback that asks the learner to compare its balance."],
      ["feedback", "information that helps a learner know what happened and what to try next", "The card explains why the wider base stayed inside its support area."],
      ["learner test", "watching a new learner use the first version so the designer can improve it", "The learner pauses before the first choice, so the designer adds a clear action cue."],
      ["source limit", "something a source or test cannot establish", "One classroom trial cannot prove every tower will behave the same way."],
    ),
    example: {
      title: "Plan a five-minute paper experience about stable towers",
      steps: [
        "Learning goal: the learner can explain how the base affects stability. Two teacher-approved sources and a small class test support the idea; the model does not cover every material or force.",
        "Invitation: compare a tall narrow tower sketch with a shorter wide-base sketch and predict which is harder to tip.",
        "Action and branch: choose a sketch, turn to its numbered card, and read feedback that points to the base and centre of mass rather than simply saying right or wrong.",
        "Understanding check: choose which redesign would make a third tower more stable and explain one reason. Ending: name one situation the paper model cannot predict.",
        "New-learner evidence: the first tester misses the numbered turn cue. Revision: enlarge the cue, add a shape as well as colour, and ask another learner to try that step.",
      ],
      conclusion: "The teaching works because verified content, learner action, useful feedback, an understanding check, and a tested revision form one complete path.",
    },
    checks: [
      {
        prompt: "Which first version is most ready for a learner test?",
        choices: ["A polished homepage with no learning goal yet", "A complete paper path with a verified idea, learner action, feedback, and ending", "A long list of copied facts with no sources"],
        answer: 1,
        feedback: "The complete paper path is small enough to change and already shows what the learner will do, receive, and understand.",
      },
      {
        prompt: "A new learner pauses because they cannot tell where to begin. What is the strongest next move?",
        choices: ["Explain the whole project aloud every time", "Add more decoration to every screen", "Revise the first action cue, then ask another learner to try that step"],
        answer: 2,
        feedback: "The observation points to a specific navigation problem. Change that feature and gather new evidence without coaching.",
      },
    ],
    reteach: "Show three cards only: LEARNING GOAL, LEARNER ACTION, FEEDBACK. Put them in order, add an understanding check, and ask what evidence would reveal a confusing step.",
  }),
};

const plainFallbackText = (value: string) => value
  .replace(/\bsource forms?\b/gi, "kinds of sources")
  .replace(/\bcandidate angles?\b/gi, "possible angles")
  .replace(/\bcold[- ]test(?:ing)?\b/gi, "ask a new audience to try")
  .replace(/\baudits?\b/gi, "checks")
  .replace(/\bcriteria\b/gi, "success rules")
  .replace(/\bmilestones?\b/gi, "small checkpoints")
  .replace(/\bdependencies\b/gi, "tasks that must happen first")
  .replace(/\bcontingency\b/gi, "backup plan")
  .replace(/\bstakeholders?\b/gi, "people affected")
  .replace(/\bartifacts?\b/gi, "finished work")
  .replace(/\bdeliverables?\b/gi, "finished work")
  .replace(/\bfacilitate\b/gi, "guide")
  .replace(/\s+/g, " ")
  .trim();

export function fallbackProjectorLessonSupport(experience: ProgramExperience): ProjectorLessonSupport {
  const firstStep = plainFallbackText(experience.steps[0] ?? "Study the example and name one detail you can use.");
  const success = plainFallbackText(experience.lookFors[0] ?? "The idea is clear and supported by something the class can point to.");
  const hook = plainFallbackText(experience.hook || experience.question);

  return support(experience.id, {
    purpose: plainFallbackText(experience.studentMission),
    background: [
      `Big question: ${plainFallbackText(experience.question)}`,
      `On-screen case: ${hook}`,
      `First idea to test: ${firstStep}`,
      `A strong response lets the class point to this: ${success}`,
    ],
    terms: terms(
      ["evidence", "an exact detail, number, source, observation, or result that supports an idea", "Point to the part of the example that makes the claim believable."],
      ["model", "a useful example or representation that shows how an idea works", "The class tests one small case before attempting the full challenge."],
      ["revision", "a change made because evidence reveals a way to improve", "Change the confusing step, then test that exact part again."],
    ),
    example: {
      title: `Try one small version of “${plainFallbackText(experience.title)}”`,
      steps: [
        `Begin with this shared case: ${hook}`,
        `Use the first move: ${firstStep}`,
        "Point to one exact detail, number, word, rule, or design choice used in the response.",
        `Compare the response with this check: ${success}`,
      ],
      conclusion: "A response becomes stronger when the class can point to the evidence and explain what it supports.",
    },
    checks: [
      {
        prompt: "Which explanation uses evidence rather than preference alone?",
        choices: ["It works because I like it.", "It works because this exact detail or result supports the choice.", "It works because we finished."],
        answer: 1,
        feedback: "A useful explanation points to something another person can inspect and connects it to the idea.",
      },
      {
        prompt: "A first version does not match the evidence. What is the strongest next move?",
        choices: ["Hide the mismatch.", "Change one relevant part and test it again.", "Add decoration without changing the idea."],
        answer: 1,
        feedback: "A focused change makes it possible to see whether the evidence improves.",
      },
    ],
    reteach: "Keep the shared case on screen. Model only the first move, name the evidence used, and ask the class to explain that connection before continuing.",
  });
}

export function resolveProjectorLessonSupport(experience: ProgramExperience): ResolvedProjectorLessonSupport {
  const custom = projectorLessonSupports[experience.id];
  return custom
    ? { support: custom, isCustom: true }
    : { support: fallbackProjectorLessonSupport(experience), isCustom: false };
}

export function projectorReadinessFromSupport(projectorSupport: ProjectorLessonSupport): ReadinessLaunch {
  return {
    background: projectorSupport.background,
    example: projectorSupport.example,
    questions: projectorSupport.checks,
    reteach: projectorSupport.reteach,
  };
}

export function projectorReadinessFor(experience: ProgramExperience): ReadinessLaunch {
  return projectorReadinessFromSupport(resolveProjectorLessonSupport(experience).support);
}

const bannedProjectorLanguage = /\b(?:source forms?|candidate angles?|artifact|deliverable|pedagogy|facilitate|metacognition|readiness|cold[- ]test(?:ing)?|audit|milestones?|dependencies|contingency|stakeholders?|portfolio)\b/i;
const disclosurePrompt = /(?:share|describe|tell (?:us|the class)|reveal)\s+(?:a |an |your )?(?:personal|private|family|medical|health|diagnosis|account|password|income|weight|body)\b/i;

export function projectorSupportText(projectorSupport: ProjectorLessonSupport): string {
  return [
    projectorSupport.purpose,
    ...projectorSupport.background,
    ...projectorSupport.terms.flatMap(word => [word.term, word.meaning, word.example]),
    projectorSupport.example.title,
    ...projectorSupport.example.steps,
    projectorSupport.example.conclusion,
    ...projectorSupport.checks.flatMap(item => [item.prompt, ...item.choices, item.feedback]),
    projectorSupport.reteach,
  ].join(" ");
}

export function validateProjectorLessonSupport(projectorSupport: ProjectorLessonSupport): ProjectorSupportIssue[] {
  const issues: ProjectorSupportIssue[] = [];
  const lengthCheck = (path: string, value: string, maximum: number) => {
    if (!value.trim()) issues.push({ path, message: "Text is empty." });
    if (value.length > maximum) issues.push({ path, message: `Text is longer than ${maximum} characters.` });
  };

  if (!projectorSupport.id.trim()) issues.push({ path: "id", message: "An experience id is required." });
  if (projectorSupport.screenOnly !== true) issues.push({ path: "screenOnly", message: "The core projector opening must require no materials." });
  lengthCheck("purpose", projectorSupport.purpose, 190);

  if (projectorSupport.background.length < 2 || projectorSupport.background.length > 4) {
    issues.push({ path: "background", message: "Use two to four short background ideas." });
  }
  projectorSupport.background.forEach((idea, index) => lengthCheck(`background.${index}`, idea, 230));

  if (projectorSupport.terms.length < 3 || projectorSupport.terms.length > 5) {
    issues.push({ path: "terms", message: "Use three to five essential terms." });
  }
  projectorSupport.terms.forEach((word, index) => {
    lengthCheck(`terms.${index}.term`, word.term, 36);
    lengthCheck(`terms.${index}.meaning`, word.meaning, 170);
    lengthCheck(`terms.${index}.example`, word.example, 210);
  });

  lengthCheck("example.title", projectorSupport.example.title, 120);
  if (projectorSupport.example.steps.length < 3 || projectorSupport.example.steps.length > 5) {
    issues.push({ path: "example.steps", message: "Use three to five model steps." });
  }
  projectorSupport.example.steps.forEach((step, index) => lengthCheck(`example.steps.${index}`, step, 250));
  lengthCheck("example.conclusion", projectorSupport.example.conclusion, 220);

  if (projectorSupport.checks.length < 1 || projectorSupport.checks.length > 2) {
    issues.push({ path: "checks", message: "Use one or two whole-class concept checks." });
  }
  projectorSupport.checks.forEach((item, index) => {
    lengthCheck(`checks.${index}.prompt`, item.prompt, 190);
    if (item.choices.length < 3 || item.choices.length > 4) {
      issues.push({ path: `checks.${index}.choices`, message: "Use three or four choices." });
    }
    item.choices.forEach((choice, choiceIndex) => lengthCheck(`checks.${index}.choices.${choiceIndex}`, choice, 210));
    if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer >= item.choices.length) {
      issues.push({ path: `checks.${index}.answer`, message: "The answer index does not match a choice." });
    }
    lengthCheck(`checks.${index}.feedback`, item.feedback, 220);
  });

  lengthCheck("reteach", projectorSupport.reteach, 240);
  const allText = projectorSupportText(projectorSupport);
  if (bannedProjectorLanguage.test(allText)) {
    issues.push({ path: "text", message: "Teacher/admin shorthand or previously confusing lesson language is present." });
  }
  if (disclosurePrompt.test(allText)) {
    issues.push({ path: "text", message: "The projector opening must not ask students for personal disclosure." });
  }

  return issues;
}
