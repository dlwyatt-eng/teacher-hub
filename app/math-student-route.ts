import { mathModePlanFor } from "./math-delivery-modes";
import { mathPacksFor, type MathSupportPack } from "./math-program-supports";

export type MathStudentWorkshopPlacement = "before" | "extension";

/**
 * Keep student-safe workshops tied to the concept packs named by the delivery
 * plan. This separates required B.C. core teaching from optional bridges.
 */
export function mathStudentPacksFor(
  experienceId: string,
  placement: MathStudentWorkshopPlacement = "before",
): MathSupportPack[] {
  const packs = mathPacksFor(experienceId);
  const plan = mathModePlanFor(experienceId);

  if (!plan) return placement === "before" ? packs : [];

  const corePackIds = new Set(plan.conceptPackIds);
  if (placement === "extension") {
    return packs.filter((pack) => !corePackIds.has(pack.id) && pack.role === "MATHUP / WNCP BRIDGE");
  }

  const packById = new Map(packs.map((pack) => [pack.id, pack]));
  return plan.conceptPackIds
    .map((packId) => packById.get(packId))
    .filter((pack): pack is MathSupportPack => Boolean(pack));
}
