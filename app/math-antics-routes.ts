export type MathAnticsRoute = {
  title: string;
  url: string;
  pausePrompt: string;
  secondary?: { title: string; url: string };
};

const lesson = (slug: string) => `https://mathantics.com/lesson/${slug}`;

/**
 * The visual explanation lead for each Grade 6 Math experience.
 * MathUP remains the curriculum cross-check and optional game/practice shelf.
 */
export const mathAnticsRoutes: Record<string, MathAnticsRoute> = {
  "magnitude-gallery": {
    title: "Decimal Place Value",
    url: lesson("decimal-place-value"),
    pausePrompt: "Pause when tenths, hundredths, and thousandths appear. Ask: Which 8 is worth the most, and what changed its value?",
    secondary: { title: "The Number Line", url: lesson("number-line") },
  },
  "strategy-league": {
    title: "Multi-Digit Multiplication Pt. 2",
    url: lesson("multi-digit-multiplication-pt2"),
    pausePrompt: "Pause before the answer. Ask the class to split one factor and predict the two easier products.",
    secondary: { title: "Long Division", url: lesson("long-division") },
  },
  "pack-and-sync": {
    title: "Factoring",
    url: lesson("factoring"),
    pausePrompt: "Pause after the first factor pair. Ask: Could these supplies make that many equal kits with nothing left?",
    secondary: { title: "Prime Factorization", url: lesson("prime-factorization") },
  },
  "scoreboard-rules": {
    title: "Order of Operations",
    url: lesson("order-of-operations"),
    pausePrompt: "Pause at the first two possible answers. Let the room vote, then ask which operation the shared rule says to do first.",
  },
  "fraction-ratio-remix": {
    title: "Ratios & Rates",
    url: lesson("ratios-and-rates"),
    pausePrompt: "Pause after the first ratio. Ask students to draw or build a doubled batch that keeps the same colour relationship.",
    secondary: { title: "Fractions & Decimal Numbers", url: lesson("fractions-and-decimal-numbers") },
  },
  "decimal-dispatch": {
    title: "Decimal Arithmetic",
    url: lesson("decimal-arithmetic"),
    pausePrompt: "Before an exact calculation, ask: About how much should this cost? Which answers would be impossible?",
  },
  "sale-lab": {
    title: "Finding a Percent of a Number",
    url: lesson("finding-a-percent-of-a-number"),
    pausePrompt: "Pause before the calculation. Ask students to find 50%, 25%, or 10% with a familiar fraction first.",
    secondary: { title: "What Are Percentages?", url: lesson("what-are-percentages") },
  },
  "pattern-forecast": {
    title: "Number Patterns",
    url: lesson("number-patterns"),
    pausePrompt: "Pause after the first few stages. Ask: What changes every time, and what stays fixed?",
  },
  "equation-balance": {
    title: "Solving Basic Equations Pt. 1",
    url: lesson("solving-basic-equations-1"),
    pausePrompt: "Pause before the inverse move. Ask: What could we do to both sides without tipping the balance?",
  },
  "graph-story-lab": {
    title: "Data & Graphs",
    url: lesson("data-and-graphs"),
    pausePrompt: "Pause when the axes appear. Ask what each step is worth and how changing that spacing could change the story.",
  },
  "probability-game-audit": {
    title: "Basic Probability",
    url: lesson("basic-probability"),
    pausePrompt: "Pause before a result is shown. Ask what the game design predicts—and whether a short test must match it exactly.",
  },
  "geometry-field-lab": {
    title: "Angles & Degrees",
    url: lesson("angles-and-degrees"),
    pausePrompt: "Pause before measuring. Ask whether the opening is less than, equal to, or more than a square corner.",
    secondary: { title: "Angle Basics", url: lesson("angle-basics") },
  },
  "zoo-design-studio": {
    title: "Area",
    url: lesson("area"),
    pausePrompt: "Pause at the first model. Have students trace the inside surface for area and the outside edge for perimeter.",
    secondary: { title: "Perimeter", url: lesson("perimeter") },
  },
  "transformation-cipher": {
    title: "Graphing on the Coordinate Plane",
    url: lesson("graphing-on-the-coordinate-plane"),
    pausePrompt: "Pause before plotting. Ask which coordinate tells us to travel across first and which tells us to travel up.",
  },
  "space-under-constraints": {
    title: "Area",
    url: lesson("area"),
    pausePrompt: "Pause before the formula. Ask students to cover or split the planned floor space so the numbers have a visible meaning.",
    secondary: { title: "Volume", url: lesson("volume") },
  },
};

export function mathAnticsFor(experienceId: string) {
  return mathAnticsRoutes[experienceId] ?? null;
}
