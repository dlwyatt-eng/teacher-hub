"use client";

import { useState } from "react";
import { TtocDayPlan, type TtocWeekImportOption } from "./ttoc-day-plan";
import {
  WeeklyPlan,
  WeeklyPlanPresetSelector,
  type WeekPlanSeed,
  type Weekday,
  type WeeklyPlanPresetOption,
} from "./weekly-plan";
import { vancouverDateKey } from "./morning-screen-state";
import {
  firstYearWeekLaunchForMonth,
  suggestedYearWeekLaunch,
  yearWeekLaunches,
} from "./year-week-registry";

export type SpecialWeekLaunch = WeeklyPlanPresetOption & {
  storageKey: string;
  seed: WeekPlanSeed;
  defaultWeekday: Weekday;
  legacyStorageKey?: string;
};

type PlanningProps = {
  specialLaunches: readonly SpecialWeekLaunch[];
};

function launchOptions(specialLaunches: readonly SpecialWeekLaunch[]): readonly SpecialWeekLaunch[] {
  return [
    ...specialLaunches,
    ...yearWeekLaunches.map((launch) => ({ ...launch, defaultWeekday: "monday" as const })),
  ];
}

function suggestedLaunchId(date = vancouverDateKey()) {
  if (date <= "2026-09-13") return "rotation-week";
  if (date <= "2026-09-20") return "first-formed-class-week";
  return suggestedYearWeekLaunch(date)?.id ?? "first-formed-class-week";
}

function resolveInitialLaunchId(initialLaunchId: string | undefined, options: readonly SpecialWeekLaunch[]) {
  if (initialLaunchId?.startsWith("month:")) {
    const month = initialLaunchId.slice("month:".length);
    const monthLaunch = month === "September"
      ? options.find((option) => option.id === "rotation-week")
      : firstYearWeekLaunchForMonth(month);
    if (monthLaunch) return monthLaunch.id;
  }
  if (initialLaunchId && options.some((option) => option.id === initialLaunchId)) return initialLaunchId;
  const suggested = suggestedLaunchId();
  return options.some((option) => option.id === suggested) ? suggested : options[0]?.id ?? "";
}

export function SchoolYearWeeklyPlan({ initialLaunchId, specialLaunches }: PlanningProps & { initialLaunchId?: string }) {
  const options = launchOptions(specialLaunches);
  const [selectedPreset, setSelectedPreset] = useState(() => resolveInitialLaunchId(initialLaunchId, options));
  const selected = options.find((option) => option.id === selectedPreset) ?? options[0];

  if (!selected) {
    return <section className="route-error" role="alert"><div><h2>No teaching weeks are available.</h2><p>Return Home and refresh the Hub.</p></div></section>;
  }

  return (
    <>
      <WeeklyPlanPresetSelector
        presets={options}
        value={selected.id}
        onChange={(presetId) => {
          if (options.some((option) => option.id === presetId)) setSelectedPreset(presetId);
        }}
      />
      <WeeklyPlan
        heading={`${selected.label} · ${selected.dateRange}`}
        seed={selected.seed}
        storageKey={selected.storageKey}
        legacyStorageKey={selected.legacyStorageKey}
        key={selected.storageKey}
      />
    </>
  );
}

export function SchoolYearTtocDayPlan({ specialLaunches }: PlanningProps) {
  const weekImportOptions = launchOptions(specialLaunches).map(({ id, label, dateRange, storageKey, seed, defaultWeekday }) => ({
    id,
    label: `${label} · ${dateRange}`,
    storageKey,
    seed,
    defaultWeekday,
  })) satisfies readonly TtocWeekImportOption[];

  return <TtocDayPlan heading="TTOC plan" showCurrentLesson={false} weekImportOptions={weekImportOptions} />;
}
