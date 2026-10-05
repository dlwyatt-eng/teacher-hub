export function TeachingPathwayLink({ subject, student = false }: { subject: string; student?: boolean }) {
  const isPhe = subject === "Physical & Health Education";
  if (!isPhe && subject !== "Mathematics") return null;
  return <aside className="teaching-pathway-entry">
    <div><strong>{isPhe ? "Six weeks of health & movement" : "Maths readiness & next steps"}</strong><p>{isPhe ? "A health lesson, a skill lesson and captain practice each week. Open the session and its printable pages." : "A short number-sense check, three practice routes and a separate multiplication readiness check."}</p></div>
    <a href={`?view=${isPhe ? "PHE+Sequence" : "Maths+Readiness"}${student ? "&mode=student" : ""}`}>{isPhe ? "Open PHE sequence →" : "Open maths readiness →"}</a>
  </aside>;
}
