/**
 * Choose the active dated entry, the next entry during a gap, or the most
 * recent entry after the sequence ends.
 *
 * @template {{ effectiveFrom: string, effectiveTo: string }} T
 * @param {readonly T[]} entries
 * @param {string} date
 * @returns {T | null}
 */
export function selectDatedEntry(entries, date) {
  const ordered = [...entries].sort((a, b) => a.effectiveFrom.localeCompare(b.effectiveFrom));
  return ordered.find(entry => entry.effectiveFrom <= date && date <= entry.effectiveTo)
    ?? ordered.find(entry => date < entry.effectiveFrom)
    ?? ordered.at(-1)
    ?? null;
}

/**
 * @param {{ effectiveFrom: string, effectiveTo: string }} entry
 * @param {string} date
 * @returns {"up-next" | "active" | "recent"}
 */
export function datedEntryState(entry, date) {
  if (date < entry.effectiveFrom) return "up-next";
  if (date > entry.effectiveTo) return "recent";
  return "active";
}
