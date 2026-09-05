/** Teacher preparation, not a playback or classroom-readiness certificate. */
export type MediaViewingPlan = {
  title: string;
  timing: string;
  before: string;
  pause: string;
  bridge: string;
  fallback: string;
  access: string;
  verification: string;
  directUrl?: string;
};

const mathUrl = (slug: string) => `https://mathantics.com/lesson/${slug}`;
const excerptBudget = "Suggested excerpt budget: up to 3 minutes. This is not a verified excerpt; preview first and record the chosen start and stop.";
const sharedAccess = "Use one teacher-controlled screen. No student account is required by this lesson. Check sound, captions and school-network access before class.";
const mathVerification = "2026-09-05: title confirmed in the official Math Antics catalog. The lesson-page check reached a JavaScript/cookie notice. Transcript, selected excerpt and full playback have not been verified.";
const nacVerification = "2026-09-05: exact official destination is search-indexed, but the source-page check returned 503. This is a retrieval limitation, not a broken-link finding. Runtime, captions, transcript and full playback remain unverified.";

function mathPlan(title: string, before: string, pause: string, bridge: string, fallback: string): MediaViewingPlan {
  return { title, timing: excerptBudget, before, pause, bridge, fallback,
    access: `${sharedAccess} Allow the site's required JavaScript/cookies if permitted on the school device. Math Antics membership practice is separate; use the supplied Hub practice.`,
    verification: mathVerification };
}

export const firstTermMediaPlans: Record<string, MediaViewingPlan> = {
  [mathUrl("decimal-place-value")]: {
    ...mathPlan("Decimal Place Value",
      "What is the 8 worth in 0.8, 0.08 and 0.008? Make a prediction before watching.",
      "Pause before the narrator explains the value of a digit in tenths, hundredths or thousandths. Ask what changed its value.",
      "Build eight thousandths on the supplied 0–0.01 line; then compare the same 0.008 on the wider scales.",
      "Skip the video. Use the supplied decimal chart, three-scale worked model, partner questions and independent scale check."),
    verification: "2026-09-05: official mathantics YouTube title/channel confirmed; player loaded at 0:00 of 11:50 and displayed captions unavailable. This is not a playback pass. Full playback, selected excerpt and school-network access still need preview.",
    directUrl: "https://www.youtube.com/watch?v=KG6ILNOiMgM",
  },
  [mathUrl("number-line")]: mathPlan("The Number Line",
    "What must we know about a line before placing a number on it?",
    "Pause after the endpoints and equal intervals are established. Ask what one interval is worth before locating a point.",
    "Read each supplied scale, count ten equal intervals, and place the fixed value 0.008 without changing the number.",
    "Use the supplied blank number lines and the complete Magnitude Gallery worked explanation, partner practice and independent check."),
  [mathUrl("multi-digit-multiplication-pt2")]: mathPlan("Multi-Digit Multiplication Pt. 2",
    "About how large should 23 × 16 be? Explain an estimate.",
    "Pause before the final product. Split one factor and predict the easier partial products.",
    "Rebuild 23 × 16 as 23 × 10 + 23 × 6, then verify 368 by another route.",
    "Use the supplied operations pathway and partner cards; compare methods on the board before the independent calculation/check."),
  [mathUrl("long-division")]: mathPlan("Long Division",
    "How could equal groups or multiplication help us check a division?",
    "Pause before the next quotient digit. Predict how many groups fit and what multiplication would check that step.",
    "Connect the written steps to the supplied grouping or partial-quotient model, then compare a second checking method.",
    "Use the operations workshop's division examples and partner cards with board drawings; retain the estimate, exact result and inverse check."),
  [mathUrl("factoring")]: mathPlan("Factoring",
    "Which equal groups could use all 24 counters with none left?",
    "Pause after one factor pair. Predict another possible arrangement and check it with multiplication.",
    "Build the supplied packing cases, then distinguish dividing fixed supplies from finding repeating events that meet.",
    "Draw grouping circles and two signal timelines on plain paper. Use counters and the supplied packing/signal cases to teach and check GCF and LCM."),
  [mathUrl("prime-factorization")]: mathPlan("Prime Factorization",
    "When can a factor tree stop? What makes a number prime?",
    "Pause before splitting a composite factor. Ask which factors can still be broken down and why.",
    "Multiply the final prime factors to check the original number. Keep the separate packing and repeating-cycle models for GCF and LCM.",
    "Use the supplied factor-tree/divisibility questions and counters; complete the same factor and multiple checks without video."),
  [mathUrl("order-of-operations")]: mathPlan("Order of Operations",
    "Would 5 + 3 × 4 and (5 + 3) × 4 describe the same scoring rule? Predict both results.",
    "Pause when two possible answers are presented. Mark the operation the shared rule completes first.",
    "Build both scoring stories with the supplied number, operation and bracket tiles; explain why the results are 17 and 32.",
    "Use the supplied tile model, score-rule cards, bracket-change practice and independent check."),
  [mathUrl("ratios-and-rates")]: mathPlan("Ratios & Rates",
    "How could we double a batch of 2 red and 3 blue squares without changing its colour relationship?",
    "Pause before a scaled batch is shown. Build a prediction by repeating the entire original batch.",
    "Connect 2:3, 4:6 and 6:9 to the supplied models; distinguish the red-to-blue ratio from red's share of the whole.",
    "Use paper squares, equal-size fraction strips and the supplied ratio table, broken-batch repair and independent questions."),
  [mathUrl("fractions-and-decimal-numbers")]: mathPlan("Fractions & Decimal Numbers",
    "Can a fraction name and a decimal name describe the same amount? Show a possible example.",
    "Pause before a fraction is renamed as a decimal. Predict the name from the size of the equal parts.",
    "Show the same amount on equal-size grids or strips before writing its fraction and decimal names.",
    "Use the supplied fraction representations and partner/check questions. Keep the whole the same size when comparing."),
  [mathUrl("decimal-arithmetic")]: mathPlan("Decimal Arithmetic",
    "Estimate the chosen invoice calculation. Which answer sizes would be impossible?",
    "Select a multiplication or division example during preview; pause before its exact result and ask for a sensible range.",
    "Rebuild the calculation with the supplied place-value model, then audit an invoice and compare the exact result with the estimate.",
    "Use the decimal workshop, fictional invoices and place-value charts; keep estimation, modelling, calculation and error checking."),
  [mathUrl("finding-a-percent-of-a-number")]: mathPlan("Finding a Percent of a Number",
    "What is one quarter of $48? What would be left after that discount?",
    "Pause before the percent procedure. Find a benchmark such as 50%, 25% or 10% with a familiar fraction first.",
    "Use the supplied hundred grid and offer cards to distinguish the $12 discount from the $36 final price.",
    "Use the Sale Lab's fictional offers, grid, running total and independent part/whole/percent questions."),
  [mathUrl("what-are-percentages")]: mathPlan("What Are Percentages?",
    "What is the whole when we say 25%? What would 25 out of 100 look like?",
    "Pause at a hundred representation. Ask students to point to the whole and the selected part.",
    "Shade the supplied hundred grid and connect it to a fictional offer. Name the whole before computing a discount.",
    "Use the supplied benchmark fraction/percent models and Sale Lab offer cards; do not ask about family finances."),
  "https://nac-cna.ca/en/orchestrafieldtrip": {
    title: "Great Canadian Orchestra Field Trip",
    timing: "Suggested excerpt budget: up to 3 minutes. No episode or exact start/stop has been selected; record them after registration and preview.",
    before: "Which change will you listen for: instrument sound, loudness, rhythm or the number of layers? Choose one.",
    pause: "After the chosen musical change, stop and ask students to name audible evidence. Replay the same selected passage once.",
    bridge: "Use one observed musical choice to inform an original graphic score, then test whether another group can perform it.",
    fallback: "Perform the supplied four-layer Classroom OS sound model using voice, body percussion or objects; students complete the same listening card. Reschedule the orchestra encounter if needed.",
    access: "Teacher preparation gate: the official series asks schools to register for free access. Registration is not completed here. The teacher chooses an episode; no student account is required.",
    verification: nacVerification,
  },
  "https://nac-cna.ca/en/video/map-foundational-elements-of-dance-2-space": {
    title: "Foundational Elements of Dance: Aspects of Space · Allison Carrier",
    timing: `${excerptBudget} Runtime is not confirmed in this review.`,
    before: "What changes when a movement uses a different direction, level or pathway?",
    pause: "Freeze two preview-selected moments. Name one change in space using what is visible, not a guess about the dancer's thoughts.",
    bridge: "Change one spatial element in an original eight-count movement score; offer standing, seated, hand-only and prop routes.",
    fallback: "Demonstrate the supplied eight-count phrase twice with one spatial change. Students use the same comparison/notice card.",
    access: sharedAccess, verification: nacVerification,
  },
  "https://nac-cna.ca/en/video/theatre-works-kevin-loring": {
    title: "The power of storytelling in theatre: The Artistic Director's role · Kevin Loring",
    timing: "Suggested viewing budget: up to 3 minutes. The previously listed 2:55 runtime and captions need confirmation in the selected player; record the start and stop after preview.",
    before: "What can an artistic director shape besides spoken lines?",
    pause: "After a complete explanation or the short film, name one decision supported by Kevin Loring's account.",
    bridge: "Apply one decision about focus, relationship, place or transition to the supplied original tableau model; keep the artist and Nlaka'pamux context attached to the encounter.",
    fallback: "Read the credited role/context capsule and teach the supplied six-frame tableau model. This teaches the classroom task without impersonating the artist or reproducing his work.",
    access: sharedAccess, verification: nacVerification,
  },
  "https://nac-cna.ca/en/artsalive/resource/all-my-relations-rhythmic-fun-with-music-alive/module/36164": {
    title: "Rhythms of Resilience: Raps, Rhymes, and Improvisations",
    timing: "Module, not a selected clip. Suggested media budget: up to 3 minutes; first choose the exact activity/media and record start/stop after preview. Runtime unverified.",
    before: "What stays steady while the rhythm changes? Listen for evidence of one difference.",
    pause: "After a complete pattern, identify one use of beat, rhythm, silence or layers. Do not interrupt a word or decontextualize the artist's teaching.",
    bridge: "Credit the artist and source, then use one general musical element in an original graphic score; do not present the class composition as the artist's tradition.",
    fallback: "Read the supplied credited context capsule and perform the original Classroom OS rhythm model. Use the same listening card and reschedule the artist encounter.",
    access: `${sharedAccess} Verify the chosen activity and artist context on the exact module before presenting it.`, verification: nacVerification,
  },
  "https://nac-cna.ca/en/artsalive/resource/autorickshaw/module/39055": {
    title: "South Indian Carnatic Music with Autorickshaw",
    timing: "Module, not a selected clip. Suggested media budget: up to 3 minutes; first choose the exact activity/media and record start/stop after preview. Runtime unverified.",
    before: "Which musical element does this source name, and what can we actually hear?",
    pause: "Pause after a complete artist explanation. Separate the source's named element from students' own comparisons.",
    bridge: "Record the artists and one supported melodic or rhythmic observation; compare musical elements without ranking cultures or copying a tradition out of context.",
    fallback: "Use the supplied general rhythm/notation mini-labs and credited context capsule. Reschedule the artist encounter; the fallback is not Carnatic music instruction.",
    access: sharedAccess, verification: nacVerification,
  },
  "https://surreyschoolsone.ca/indigenous/resource-post/?permalink=chief-harley-chappell-tells-the-story-of-the-flood-": {
    title: "Chief Harley Chappell tells the Story of the Flood",
    timing: "Preview the complete source and confirm runtime before allocating the 60–75 minute lesson. First listening is uninterrupted; select any second-listen portion only within current sharing guidance.",
    before: "What does the district source explicitly tell us about its speaker, title and Semiahmoo context? What does access to listen allow us to do?",
    pause: "Do not insert an arbitrary mid-story pause. After the first listening, record one supported learning and one question. Revisit only the teacher-selected portion permitted by current guidance.",
    bridge: "Complete the supplied source card and distinguish heard, interpreted and wondered; preserve attribution and a sharing boundary.",
    fallback: "Use only the supplied fictional Classroom OS listening rehearsal. Reschedule the Semiahmoo source; the rehearsal does not count as First Peoples oral-tradition evidence. Never reconstruct the story from memory.",
    access: `${sharedAccess} Read the linked district storytelling protocol before listening. Public access is not permission to download, transcribe, retell, reenact, remix or repost.`,
    verification: "2026-09-05: district source and storytelling protocol pages opened; exact title, speaker and embedded video destination confirmed. Runtime, transcript, captions and full playback have not been verified.",
  },
  "https://surreyschoolsone.ca/indigenous/resource-post/?permalink=hnqminm-language-and-katzie-history-with-paula-james-part-2": {
    title: "hən̓q̓əmin̓əm̓ Language and Katzie History with Paula James: Part 2",
    timing: `${excerptBudget} Keep the speaker's introduction/context attached to the selected passage. Runtime unverified.`,
    before: "Who is speaking, and what does the district source say this video helps us learn?",
    pause: "Pause after a completed explanation, not inside a spoken word. Name one source-supported observation and one question.",
    bridge: "Keep Paula James, Katzie context and the district source attached to the learning; then make students' own local sound/place observations without claiming cultural meanings.",
    fallback: "Complete the supplied original sound-map/place-postcard activity and reschedule the language encounter. Do not invent pronunciation, reconstruct language teaching or detach language audio from its speaker.",
    access: sharedAccess,
    verification: "2026-09-05: district source page and its linked Surrey Schools Vimeo page opened; title/provider and seasons/weather scope confirmed. Runtime, captions, transcript and full playback remain unverified.",
  },
  "https://surreyschoolsone.ca/indigenous/resource-post/?permalink=our-grandmother-the-inlet": {
    title: "Our Grandmother the Inlet · SD36 clean film",
    timing: "The district lists the complete clean film as 8:45. Optional full-film encounter after preview, not a three-minute excerpt or an extra required foundation lesson.",
    before: "How do image and sound help this family communicate their relationship to place?",
    pause: "Discuss after the complete clean film. Point to an observed artistic choice while preserving the family, Nation and place context; do not fragment cultural meaning into decorative clips.",
    bridge: "Keep co-directors Kayah George and Jaime Leigh Gianopoulos, Ta7a, Tsleil-Waututh Nation and Burrard Inlet attached to the response. Use general artistic choices to inform original work, not copied cultural designs or teachings.",
    fallback: "Use the complete supplied original Four Arts foundation models and activities. Reschedule the film encounter; this fallback is not equivalent cultural evidence.",
    access: "Teacher preparation gate: use the SD36 clean film, not the original or the 45-minute interview. The district lists classroom/school rights and a teacher-held password available through its authorized channels. No password is provided or retrieved here; no student account is required. Preview sensitive content and accessibility before class.",
    verification: "2026-09-05: district source opened and identifies both films as 8:45, the original's profanity, and a bleeped clean version. Clean Vimeo destination confirmed; password-protected film playback, transcript and captions have not been verified.",
  },
};

export function mediaViewingPlanFor(url?: string): MediaViewingPlan | undefined {
  return url ? firstTermMediaPlans[url] : undefined;
}

export function mediaViewingPlansFor(urls: readonly (string | undefined)[]) {
  return [...new Set(urls.filter((url): url is string => Boolean(url)))].flatMap(url => {
    const plan = mediaViewingPlanFor(url);
    return plan ? [{ url, plan }] : [];
  });
}
