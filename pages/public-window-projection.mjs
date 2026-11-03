import { createHash } from "node:crypto";

export const PUBLIC_WINDOW_SCHEMA = "classroom-os-public-window/v2";

export const PUBLIC_MANIFEST_KEYS = [
  "newsroom",
  "portfolioSummary",
  "yearMonths",
  "projects",
  "guideSections",
  "safeLinks",
];

export const PUBLIC_WINDOW_KEYS = [
  "id",
  "effectiveFrom",
  "effectiveTo",
  "state",
  "shared",
  "student",
  "family",
];

function pick(object, keys) {
  return Object.fromEntries(keys.filter((key) => Object.hasOwn(object, key)).map((key) => [key, object[key]]));
}

export function projectPublicWindow(window) {
  return {
    id: window.id,
    effectiveFrom: window.effectiveFrom,
    effectiveTo: window.effectiveTo,
    state: window.state ?? "published",
    shared: window.shared,
    student: window.student,
    family: window.family,
  };
}

export function projectLearningUpdates(updates) {
  return { ...pick(updates, ["updatedOn", "title", "summary", "note"]),
    subjects: updates.subjects.map(subject => pick(subject, ["subject", "status", "focus", "detail"])) };
}

export function manifestChecksum(manifest) {
  const body = { ...manifest };
  delete body.checksum;
  return `sha256:${createHash("sha256").update(`${JSON.stringify(body, null, 2)}\n`).digest("hex")}`;
}

export function buildPublicManifest(existing, source, homePractice) {
  const manifest = {
    schemaVersion: PUBLIC_WINDOW_SCHEMA,
    contentVersion: source.contentVersion,
    sourceUpdatedAt: source.sourceUpdatedAt,
    window: projectPublicWindow(source.window),
    ...pick(existing, PUBLIC_MANIFEST_KEYS),
    ...pick(source, ["classroomWelcome", "schoolEvents", "classSchedule", "guideSections"]),
    ...(source.learningUpdates ? { learningUpdates: projectLearningUpdates(source.learningUpdates) } : {}),
    ...(homePractice ? { homePractice } : {}),
    portfolioSummary: {
      ...existing.portfolioSummary,
      ...pick(source.publicPortfolioUpdate ?? {}, ["majorAnchorCount", "explanation"]),
    },
    projects: existing.projects.map(project => ({
      ...project,
      ...pick(source.publicProjectUpdates?.[project.id] ?? {}, ["timing", "title", "question", "subjects", "evidence", "assessment", "format", "reflection"]),
    })),
    yearMonths: existing.yearMonths.map(month => {
      const update = source.publicMonthUpdates?.[month.month];
      if (!update) return month;
      // Explicit replacement removes superseded plans; legacy single highlights still append.
      const highlights = update.highlights ?? [...new Set([...month.highlights, ...(update.highlight ? [update.highlight] : [])])];
      return { ...month, ...pick(update, ["phase", "focus", "learning", "subjects", "anticipatedShare"]), highlights };
    }),
    windows: [source.window, ...source.phaseOverrides].map(projectPublicWindow),
  };
  return { ...manifest, checksum: manifestChecksum(manifest) };
}
