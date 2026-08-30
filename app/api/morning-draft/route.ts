import {
  getMorningActivity,
  isIsoDateKey,
  suggestedMorningActivityId,
  vancouverDateKey,
  type MorningSource,
  type MorningWeather,
} from "../../morning-screen-state";

export const dynamic = "force-dynamic";

const SCHOOL_URL = "https://www.surreyschools.ca/walnutroad";
const WEATHER_ATTRIBUTION_URL = "https://open-meteo.com/";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const REQUEST_TIMEOUT_MS = 5_500;

type SchoolCandidate = {
  category: "announcement" | "event";
  text: string;
  source: MorningSource;
};

type MorningDraftPayload = {
  date: string;
  generatedAt: string;
  partial: boolean;
  weather: MorningWeather | null;
  schoolCandidates: SchoolCandidate[];
  suggestedActivityId: ReturnType<typeof suggestedMorningActivityId>;
  suggestedActivityPrompt: string;
  sources: MorningSource[];
  warnings: string[];
};

function json(payload: MorningDraftPayload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  });
}

async function fetchWithTimeout(url: string, init: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal, cache: "no-store" });
    if (!response.ok) throw new Error(`Source returned ${response.status}`);
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

function weatherDescription(code: number) {
  if (code === 0) return "Clear";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 85 && code <= 86) return "Snow showers";
  if (code >= 95) return "Thunderstorms possible";
  return "Forecast available";
}

function roundedNumber(value: unknown, minimum: number, maximum: number) {
  return typeof value === "number" && Number.isFinite(value) && value >= minimum && value <= maximum
    ? Math.round(value)
    : null;
}

async function fetchWeather(date: string, fetchedAt: string): Promise<MorningWeather> {
  const query = new URLSearchParams({
    latitude: "49.153",
    longitude: "-122.775",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "America/Vancouver",
    forecast_days: "7",
  });
  const response = await fetchWithTimeout(`${WEATHER_API_URL}?${query}`);
  const payload = await response.json() as {
    daily?: {
      time?: unknown[];
      weather_code?: unknown[];
      temperature_2m_max?: unknown[];
      temperature_2m_min?: unknown[];
      precipitation_probability_max?: unknown[];
    };
  };
  const days = payload.daily?.time;
  const index = Array.isArray(days) ? days.findIndex((day) => day === date) : -1;
  if (index < 0) throw new Error("No forecast was available for the requested date");
  const code = roundedNumber(payload.daily?.weather_code?.[index], 0, 99);
  const source: MorningSource = {
    kind: "weather",
    label: "Weather data by Open-Meteo.com",
    url: WEATHER_ATTRIBUTION_URL,
    fetchedAt,
  };
  return {
    summary: weatherDescription(code ?? -1),
    highC: roundedNumber(payload.daily?.temperature_2m_max?.[index], -60, 60),
    lowC: roundedNumber(payload.daily?.temperature_2m_min?.[index], -60, 60),
    rainChance: roundedNumber(payload.daily?.precipitation_probability_max?.[index], 0, 100),
    source,
  };
}

function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&mdash;|&#8212;/gi, "—")
    .replace(/&#(\d+);/g, (_match, digits: string) => {
      const code = Number(digits);
      return Number.isInteger(code) && code >= 32 && code <= 12_687 ? String.fromCharCode(code) : "";
    });
}

/** Convert the allowlisted school page to bounded plain-text lines. */
export function schoolPageLines(html: string) {
  return decodeEntities(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<(?:br\s*\/?|\/?(?:h[1-6]|p|li|article|section|time|div))\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .split(/\n+/)
    .map((line) => line.replace(/[<>]/g, "").replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 1 && line.length <= 220);
}

function section(lines: string[], start: string, end: string) {
  const startIndex = lines.findIndex((line) => line.toLowerCase() === start.toLowerCase());
  if (startIndex < 0) return [];
  const endIndex = lines.findIndex((line, index) => index > startIndex && line.toLowerCase() === end.toLowerCase());
  return lines.slice(startIndex + 1, endIndex > startIndex ? endIndex : startIndex + 45);
}

const dateLine = /^(?:(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s+)?(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\s*,?\s*\d{4}$/i;
const schoolNoise = /^(?:all day|all news|event details|useful links|add event to my calendar|notification)$/i;

export function extractSchoolCandidates(html: string, fetchedAt: string): SchoolCandidate[] {
  const lines = schoolPageLines(html);
  const source: MorningSource = {
    kind: "school",
    label: "Walnut Road official school page",
    url: SCHOOL_URL,
    fetchedAt,
  };

  const newsLines = section(lines, "News & Announcements", "Upcoming Events");
  const announcements = newsLines
    .filter((line) => !dateLine.test(line) && !schoolNoise.test(line))
    .slice(0, 3)
    .map((line) => ({ category: "announcement" as const, text: line, source }));

  const rawEvents = section(lines, "Upcoming Events", "Our Programs");
  const firstDetail = rawEvents.findIndex((line) => /^event details$/i.test(line));
  const eventLines = firstDetail >= 0 ? rawEvents.slice(0, firstDetail) : rawEvents.slice(0, 20);
  const events: SchoolCandidate[] = [];
  for (let index = 0; index < eventLines.length && events.length < 3; index += 1) {
    if (!dateLine.test(eventLines[index])) continue;
    const title = eventLines.slice(index + 1).find((line) => !dateLine.test(line) && !schoolNoise.test(line));
    if (title) events.push({ category: "event", text: `${eventLines[index]} — ${title}`, source });
  }
  return [...announcements, ...events];
}

async function fetchSchoolCandidates(fetchedAt: string) {
  const response = await fetchWithTimeout(SCHOOL_URL, {
    headers: { accept: "text/html,application/xhtml+xml" },
  });
  const html = await response.text();
  return extractSchoolCandidates(html, fetchedAt);
}

export async function GET(request: Request) {
  const suppliedDate = new URL(request.url).searchParams.get("date");
  const date = isIsoDateKey(suppliedDate) ? suppliedDate : vancouverDateKey();
  const generatedAt = new Date().toISOString();
  const results = await Promise.allSettled([
    fetchWeather(date, generatedAt),
    fetchSchoolCandidates(generatedAt),
  ]);

  const weather = results[0].status === "fulfilled" ? results[0].value : null;
  const schoolCandidates = results[1].status === "fulfilled" ? results[1].value : [];
  const warnings: string[] = [];
  if (!weather) warnings.push("Weather could not be refreshed. Add it manually or publish without it.");
  if (!schoolCandidates.length) warnings.push("No school-page items were found. Check the official page before adding an announcement.");
  const sources = [weather?.source, schoolCandidates[0]?.source]
    .filter((source): source is MorningSource => Boolean(source))
    .filter((source, index, all) => all.findIndex((item) => item.url === source.url) === index);
  const suggestedActivityId = suggestedMorningActivityId(date);

  return json({
    date,
    generatedAt,
    partial: results.some((result) => result.status === "rejected") || warnings.length > 0,
    weather,
    schoolCandidates,
    suggestedActivityId,
    suggestedActivityPrompt: getMorningActivity(suggestedActivityId).prompt,
    sources,
    warnings,
  });
}

