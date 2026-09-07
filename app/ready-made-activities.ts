export type ReadyMadeActivity = {
  id: string; lessonIds: readonly string[]; title: string; publisher: string;
  url: string; minutes: string; when: string; directions: string;
  access: string; note: string; offline: string; reviewed: string;
};

// Links and our teaching notes only. Publisher question banks stay on their sites.
export const readyMadeActivities: readonly ReadyMadeActivity[] = [
  {
    id: "phet-net-force", lessonIds: ["force-patterns-lab"],
    title: "Tug-of-war: predict the net force", publisher: "PhET · University of Colorado Boulder",
    url: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_all.html",
    minutes: "8–10 minutes", when: "After students draw the forces on an object; before comparing force and motion trials.",
    directions: "Choose Net Force. Drag one small blue and one small red puller onto the ropes. Ask pairs to predict the cart's motion. Turn on Sum of Forces and Values, then press Go. Add one more small blue puller: predict, observe and explain what changed.",
    access: "Free simulation opened without an account. Teacher controls the projector; students use arrows, talk or mini-whiteboards. Drag-and-drop interaction was tested.",
    note: "The first trial has equal opposing forces on the cart and a zero net force. In this simplified model a cart starting at rest stays at rest. Zero net force can also mean constant velocity for an already moving object. These are forces on ONE object, not a Newton's third-law pair on different objects.",
    offline: "Draw a cart with two equal, opposite arrows. Ask what happens from rest. Add an extra arrow on one side and revise the prediction. Use the existing force lesson's supplied trial data for evidence.", reviewed: "2026-09-07",
  },
  {
    id: "kahoot-thousandths", lessonIds: ["magnitude-gallery", "decimal-dispatch"],
    title: "Decimal place value to thousandths", publisher: "Math by Kahoot!",
    url: "https://create.kahoot.it/details/1-1-decimal-place-value-to-thousandths/f400b2b7-2675-4940-b234-49c7fc73815b",
    minutes: "5–8 minutes", when: "After the worked thousandths model; revisit before decimal calculations.",
    directions: "Open the set and choose Flashcards. Partners write the digit AND its value before you flip. Ask one pair to explain using a place-value chart.",
    access: "Flashcards opened without payment or sign-in in our review. Teacher laptop and projector; students need no devices. Live hosting is a separate mode and may require an account or plan features.",
    note: "Six items, including a confidence check. Some pictures highlight the answer: use this as supported practice, not a scored assessment. Ask students to say the value before reading the picture.",
    offline: "Use the existing Tiny decimals model and independent questions on paper or the board. Each partner explains what one digit is worth.", reviewed: "2026-09-07",
  },
  {
    id: "kahoot-factors", lessonIds: ["pack-and-sync"],
    title: "Factors, multiples, prime and composite", publisher: "Math by Kahoot!",
    url: "https://create.kahoot.it/details/3-1-factors-multiples-prime-composite-numbers/09d64bc5-a34f-48ac-88d4-34b77898bd94",
    minutes: "8–12 minutes", when: "After making equal packs and listing factors; before the repeating-events problem.",
    directions: "Open the set and choose Flashcards. Give partners thinking time. They show all answers they believe fit, explain one reason, then watch you flip the card.",
    access: "Flashcards opened and flipped without payment or sign-in in our review. Teacher projects; students answer on mini-whiteboards. Live hosting and team limits were not tested.",
    note: "Twelve items include a worked factor tree and a confidence scale. Pictures sometimes give hints. This reviews factors and multiples; it does not replace teaching greatest common factors or least common multiples.",
    offline: "Use the lesson's 24 red and 36 blue counters. List possible numbers of identical packs, then explain why a proposed number works or fails.", reviewed: "2026-09-07",
  },
  {
    id: "kahoot-equivalent-fractions", lessonIds: ["fraction-ratio-remix"],
    title: "Understanding equivalent fractions", publisher: "Math by Kahoot!",
    url: "https://create.kahoot.it/details/5-1-understanding-equivalent-fractions/0297d235-cb87-49b4-8fdf-c93ed61365dd",
    minutes: "8–10 minutes", when: "After folding equal wholes; before comparing fractions, ratios and percentages.",
    directions: "Open the set and choose Flashcards. Partners sketch matching fraction bars, predict an answer, then explain why the amounts stay equal after the reveal.",
    access: "Flashcards opened without payment or sign-in in our review. Teacher projects; students use paper. Live hosting and premium question-type availability were not tested.",
    note: "Ten items use bars, number lines and a measuring-cup example. When multiplying or dividing both fraction numbers, the multiplier or divisor must be nonzero. The same whole is essential.",
    offline: "Fold equal-size paper strips into halves, quarters and eighths. Match equal lengths and explain one equivalent pair using the lesson's fraction workshop.", reviewed: "2026-09-07",
  },
];

export function readyMadeForLesson(lessonId?: string) {
  return lessonId ? readyMadeActivities.filter(activity => activity.lessonIds.includes(lessonId)) : [];
}
