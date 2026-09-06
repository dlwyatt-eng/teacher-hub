/** Reviewed news for one day's morning routine; never an automatic live feed. */
export const HOPE_FIELDS = [
  ["title", "Story headline", 100],
  ["date", "Story date (YYYY-MM-DD)", 10],
  ["sourceLabel", "Source name", 100],
  ["sourceUrl", "Full article link (https://)", 2000],
  ["story", "What happened and where?", 400],
  ["barrier", "What rule or system excluded people?", 320],
  ["action", "What did people do together?", 320],
  ["change", "What changed? What evidence shows it?", 320],
  ["limits", "What still needs to change?", 240],
  ["takeaway", "One idea we can use", 240],
  ["question", "Partner discussion question", 240],
] as const;
export type HopeStory = Record<typeof HOPE_FIELDS[number][0], string>;
export const emptyHopeStory = (): HopeStory => Object.fromEntries(HOPE_FIELDS.map(([key]) => [key, ""])) as HopeStory;

export function parseHopeStory(value: unknown): HopeStory | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const raw = value as Record<string, unknown>;
  const result = emptyHopeStory();
  for (const [key, , max] of HOPE_FIELDS) {
    if (typeof raw[key] !== "string") return null;
    const cleaned = raw[key].replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
    if (!cleaned || cleaned.length > max) return null;
    result[key] = cleaned;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(result.date)) return null;
  const date = new Date(`${result.date}T12:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== result.date) return null;
  try {
    const url = new URL(result.sourceUrl);
    if (url.protocol !== "https:" || url.username || url.password) return null;
  } catch { return null; }
  return result;
}

export function importHopeStory(input: string): HopeStory | null {
  if (input.length > 12000) return null;
  try {
    const fenced = input.match(/```(?:json)?\s*([\s\S]*?)```/i);
    return parseHopeStory(JSON.parse(fenced ? fenced[1] : input.trim()));
  } catch { return null; }
}
