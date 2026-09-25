/**
 * Optional teacher navigation into MathUP's Grade 6 catalog. These links
 * contain no MathUP lesson text, slides, questions, images, or answer keys.
 * The Games and Puzzles catalog was checked by topic in September 2026.
 */
const topicsWithGames = new Set([
  "Whole Number Operations",
  "Whole Numbers Greater Than One Million",
  "Factors and Multiples",
  "BC_Working With Factors and Multiples",
  "Proportional Reasoning",
  "Representing, Estimating, and Comparing Decimal Numbers",
  "Representing, Comparing, and Ordering Fractions",
  "Multiplying and Dividing With Decimal Numbers",
  "Patterns",
  "Angles",
  "BC_Capacity and Volume",
  "Developing Measurement Formulas",
  "BC_Areas of Parallelograms, Triangles, and Trapezoids",
  "Triangles",
  "Polygons",
  "Location and Movement",
  "Graphing Data",
  "WNCP_Probability",
  "BC_Probability",
]);

const planningTopicIds: Record<string, number> = {
  "WNCP_Representing and Comparing Integers": 186,
  "BC_Financial Literacy": 278,
  "Algebra": 71,
  "WNCP_Collecting and Summarizing Data": 78,
};

export function mathUpLinkFor(topic: string): { url: string; label: string } | null {
  if (topicsWithGames.has(topic)) return {
    url: `https://nat.mathup.ca/ui/GradePartMain/Games%20and%20Puzzles/7?topic=${encodeURIComponent(topic)}`,
    label: "Games & puzzles",
  };
  const id = planningTopicIds[topic];
  return id ? { url: `https://nat.mathup.ca/ui/Topic/7/0/${id}`, label: "Topic planning" } : null;
}
