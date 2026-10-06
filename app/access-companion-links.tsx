export function AccessCompanionLinks({ subject }: { subject: "phe" | "maths" }) {
  const base = "downloads/access-companions/";
  const visual = subject === "phe" ? "PHE_Visual_Companions" : "Maths_Visual_Companions";
  return <details className="teaching-pathway__details">
    <summary>Visual and language companions</summary>
    <p>Choose a page for the current lesson. Use the supplied visual, model and response choices; students can point, speak, draw or write.</p>
    <div className="teaching-pathway__downloads">
      <a href={`${base}${visual}.pdf`} target="_blank" rel="noreferrer"><strong>{subject === "phe" ? "PHE visual pages" : "Maths visual and concrete pages"} ↗</strong><span>{subject === "phe" ? "Six health activities and reusable movement cues" : "Place-value visuals, oral checks and optional foundational number work"}</span></a>
      <a href={`${base}English_Korean_Speaking_Companions.pdf`} target="_blank" rel="noreferrer"><strong>English–Korean speaking pages ↗</strong><span>Maths reasoning, health choices and partner practice</span></a>
      <a href={`${base}Access_Companions_Teacher_Guide.pdf`} target="_blank" rel="noreferrer"><strong>Companion teacher guide & keys ↗</strong><span>Page choices, teaching cues and what to notice</span></a>
    </div>
    <p>Read on screen: <a href={`${base}${visual}.html`} target="_blank" rel="noreferrer">visual companion pages</a> · <a href={`${base}English_Korean_Speaking_Companions.html`} target="_blank" rel="noreferrer">English–Korean pages</a>.</p>
    <p>{subject === "maths" ? "Language support keeps the mathematical challenge. Choose foundational number pages separately when the learner's current work calls for those goals." : "Communication and strategy choices support participation. Observe actual movement separately when checking a physical skill."}</p>
  </details>;
}
