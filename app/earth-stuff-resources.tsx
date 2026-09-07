import type { TeachingResource } from "./optional-teaching-resources";

// Add an optional source investigation without changing the existing lesson sequence.
export const earthLessonRoutes: Record<string, { activity: string; purpose: string }> = {
  "supply-chain-shockwave": { activity: "stuff", purpose: "Trace an object, examine an optional film, and change one rule in a supplied fictional price model." },
  "data-skyline": { activity: "data", purpose: "Use the supplied wealth-share display and two fictional groups to investigate what averages hide." },
  "compare-government-systems": { activity: "power", purpose: "Separate North/South and East/West labels from evidence about money, public voice and decision-making." },
  "power-in-the-room": { activity: "power", purpose: "Map who decides and who lives with the result of a fictional supplier contract." },
  "cooperation-control-room": { activity: "change", purpose: "Choose three dated cases and distinguish a proposed change, an agreement, implementation and measured results." },
  "pull-the-system-thread": { activity: "action", purpose: "Compare a personal choice with a shared rule, then plan a small action and a follow-up check." },
  "responses-under-pressure": { activity: "change", purpose: "Compare three existing response cards with common criteria, then carry two into the final inquiry." },
  "make-it-teachable": { activity: "action", purpose: "Reuse one small action case and its evidence instead of opening a new research project." },
  "each-one-teach-one": { activity: "action", purpose: "Explain a change with a clear starting point, decision-maker, possible cost and review date." },
  "map-what-maps-miss": { activity: "power", purpose: "Question broad regional labels without ranking people or cultures." },
  "edit-room": { activity: "claims", purpose: "Compare a green advertising claim with its actual evidence and missing context." },
};

export function earthResources(lessonId: string, teacher: boolean): TeachingResource[] {
  const entry = earthLessonRoutes[lessonId];
  if (!entry) return [];
  const base = typeof window !== "undefined" && window.location.pathname.startsWith("/teacher-hub") ? "/teacher-hub/" : "/";
  const href = `${base}earth-stuff-fairness/?band=${encodeURIComponent("6–7")}&activity=${entry.activity}`;
  return [{ id: "earth-stuff-fairness", title: "Story of Stuff · evidence, fairness & action", content: <section>
    <h2>Earth, Stuff &amp; Fairness</h2>
    <p>{entry.purpose}</p>
    <p><a href={`${href}&project=1`} target="_blank" rel="noopener noreferrer">Open the Grade 6–7 student screen in a new tab</a></p>
    {teacher && <p><a href={href} target="_blank" rel="noopener noreferrer">Open the teaching plan, film choices and student print view</a></p>}
    <p>Close that tab to return to this lesson. Choose a short film section or the complete no-video route. This is optional support, not another required assignment or SpacesEDU post.</p>
    {teacher && <p>Original films are advocacy sources with dated claims. Preview the exact player and captions. The supplied activities distinguish real evidence from fictional models. More advanced ideas are adapted into the K–7 inquiry rather than shown as high-school routes.</p>}
  </section> }];
}
