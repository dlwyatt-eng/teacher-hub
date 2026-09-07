type LessonCoaching = { purpose: string; before: string; instruction: string; finish: string; withoutAi: string; };

// These are prepared coaching instructions, not published SchoolAI Spaces.
export const schoolAILessonCoaching: Readonly<Record<string, LessonCoaching>> = {
  "magnitude-gallery": {
    purpose: "Decimal error detective", before: "After the Tiny decimals model, partners compare 0.008 and 0.08 and draw both on a labelled number line.",
    instruction: "Ask learners to explain their comparison of 0.008 and 0.08. Do not tell them the order first. If needed, ask what each 8 is worth and model a DIFFERENT decimal comparison. Ask for a corrected line and a new example. Check that their interval labels fit the scale.",
    finish: "Close AI. Draw a new decimal comparison and explain it to a partner.", withoutAi: "Partners ask what each digit is worth, check the number line against the lesson model, then each make a new comparison.",
  },
  "pack-and-sync": {
    purpose: "Factors or multiples?", before: "After building packs, pairs attempt the lesson's 24 red / 36 blue counter problem and list possible pack counts.",
    instruction: "Ask why their pack count divides BOTH supplies with no remainder. If they confuse factors with multiples, use counters or a small different example before returning to their attempt. Only after they explain packs, ask how repeated flashing intervals differ. Do not supply a final solution before an attempt.",
    finish: "Close AI. Explain one packing answer and why a repeating-time problem uses multiples.", withoutAi: "One partner proposes a number of kits; the other checks both colours with counters. Switch roles, then explain a repeating timeline from the lesson.",
  },
  "fraction-ratio-remix": {
    purpose: "Equivalent-fraction coach", before: "After folding equal wholes, partners draw one equivalent pair and explain how they know the amounts match.",
    instruction: "Ask whether both pictures use the same whole. Ask what changed in the numerator and denominator and what stayed the same. Use one contrasting example if needed. Never use zero as a multiplier or divisor when generating equivalent fractions. Keep ratios and fractions distinct.",
    finish: "Close AI. Each partner draws and explains a different equivalent pair.", withoutAi: "Overlay equal-size strips, check the shaded lengths and ask a partner to explain why both fraction numbers change together.",
  },
  "ordinary-object-story": {
    purpose: "One useful revision", before: "After the first oral telling, the student chooses a short, non-private section of their own story and names what a listener found unclear. A fictional story is welcome.",
    instruction: "Use only the student's supplied draft or retelling. Give one specific strength, the exact evidence noticed, one manageable next step, and one thinking question. Keep the response under 80 words. Do not rewrite the story, invent personal experiences, or ask for private details.",
    finish: "Close AI. Revise in your own voice, tell it again and explain one change.", withoutAi: "A listener names one clear detail, points to one confusing moment and asks one question. The storyteller revises and retells.",
  },
  "character-council": {
    purpose: "Evidence-based debate partner", before: "After reading, pairs choose a character decision and bring a short teacher-approved excerpt plus their initial claim.",
    instruction: "Use only the supplied excerpt. Ask for one detail supporting the recommendation, offer one possible counterargument grounded in that text, and invite revision. If the excerpt does not support a claim, say so. Do not invent plot events or impersonate the character.",
    finish: "Close AI. Return to the text and give a recommendation, evidence and response to a counterargument.", withoutAi: "Partners take turns proposing and challenging a recommendation using the same excerpt, then each revise their claim.",
  },
  "trace-the-claim": {
    purpose: "Evidence-checking coach", before: "Pairs inspect the lesson source and write one claim, its source and one uncertainty before AI.",
    instruction: "Ask which exact source detail supports the claim. Separate a testable claim, a value judgment, an inference and verified evidence. A false or unverified factual claim is not automatically an opinion. Do not pretend to have opened a link; request the relevant excerpt. Ask whose perspective needs an authentic source.",
    finish: "Close AI. Check the original source and write one supported claim with a limit.", withoutAi: "One partner points to the evidence while the other asks what it cannot prove; switch, then revise the claim on paper.",
  },
  "force-patterns-lab": {
    purpose: "Inquiry lab coach", before: "After one real or simulated trial, pairs bring their prediction, changed variable and observed results.",
    instruction: "Ask what changed and what was held constant. Distinguish an observation from an explanation. Ask whether repeated trials support the claim. Do not fabricate measurements. Equal and opposite interaction forces act on different objects; balanced forces on one object do not mean it must be stationary. Ask learners to explain a limit of a simulation.",
    finish: "Close AI. Write a claim supported by two observations and one limit; name a fair next test.", withoutAi: "Partners compare trial records, circle the changed variable and use the lesson model to test their explanation.",
  },
};
