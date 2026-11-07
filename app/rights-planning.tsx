import { schoolAIActivities, schoolAICreationPack } from "./schoolai-activities";

export function RightsPlanning() {
  return <section className="simple-callout" aria-labelledby="rights-plan-title" style={{padding:24,border:"1px solid #abc7be",borderLeft:"6px solid #b88a24",borderRadius:12,margin:"24px 0",lineHeight:1.6}}>
    <small>PROPOSED NOVEMBER–JANUARY · SOCIAL STUDIES</small>
    <h2 id="rights-plan-title">Two Countries Shared Questions</h2>
    <p>How do decisions in different places affect people our age? Choose a question you care about and two countries to investigate. Begin with human and children’s rights around November 20, National Child Day. This is a starting connection, not a submission deadline.</p>
    <p><a href="printables/two-countries-shared-questions-student.pdf" target="_blank" rel="noreferrer">Open the student inquiry booklet · 15 printable pages ↗</a><br /><a href="printables/two-countries-shared-questions-teacher.pdf" target="_blank" rel="noreferrer">Open the teacher guide · sequence, source support and assessment ↗</a></p>
    <aside aria-label="Rights and evidence bridge" style={{background:"#f0f6f3",padding:18,borderRadius:10}}>
      <h3>A right on paper. A chance in real life.</h3>
      <p>Use this 35-minute bridge before independent country research, or after Juniper Park. Read six fictional source cards, model the difference between a promise and an experience, repair an overclaim, and try a student-chosen two-country question. Includes a teacher guide, five projector parts and a separate two-page student pack.</p>
      <p><a href="activities/rights-evidence-bridge.html">Open the rights-to-evidence lesson</a><br /><a href="printables/rights-evidence-bridge-student.pdf" target="_blank" rel="noreferrer">Open source cards and response sheet · 2-page PDF ↗</a></p>
      <p><small>Optional support for the existing inquiry, not another project or required upload. No real countries are ranked, and no personal experiences are requested.</small></p>
    </aside>
    <aside aria-label="Country inquiry SchoolAI coach">
      <h3>Challenge the Adviser: Who Gets a Fair Chance?</h3>
      <p>Can you improve the AI’s advice? Bring your own two-country question and a source, or make a search plan. Test assumptions, check missing voices and leave with a stronger question, checked comparison or revised recommendation.</p>
      <p>First session: 20–30 minutes for a question and one source check/search plan. Return for the adviser challenge once you have evidence from both countries. Keep your sources and explain what changed in your thinking. No extra required post.</p>
      <details><summary>Teacher setup · copy the SchoolAI creation pack</summary>
        <p>Also available in AI Activity Studio. This is prompt-ready, not a live student Space. Create and preview in your approved SchoolAI workflow before sharing a student link. Test no-source, unsupported “country A is better,” invented-statistic and “write it for me” responses.</p>
        <pre style={{whiteSpace:"pre-wrap",overflowWrap:"anywhere"}}>{schoolAICreationPack(schoolAIActivities.find(activity => activity.id === "schoolai-country-inquiry-challenge-adviser")!)}</pre>
      </details>
      <p><strong>Without AI:</strong> use printed sources and a partner who asks what supports your claim, whose voice is missing and who your proposal might miss. Write your own reflection.</p>
    </aside>
    <ol>
      <li><b>Start together:</b> use the fair-chance challenge on page 3 and a child-friendly rights source. Choose two countries and try a shared question on page 2, such as how children can get to school and take part.</li>
      <li><b>Build understanding:</b> explore the short class challenges on pages 3–8. Connect rights, government, migration, trade, land and resources, and cooperation to real examples.</li>
      <li><b>Investigate:</b> learn the news-checking routine on page 9, then use pages 10–12 to follow a story, compare evidence from both countries, and hear different perspectives. Check authors, purposes, evidence, publication and event dates.</li>
      <li><b>Explain and share:</b> use pages 13–14 to build a supported answer, consider a realistic response, rehearse and reflect. January presentations are proposed; timing and format remain flexible.</li>
    </ol>
    <p>Students find and compare sources with class guidance. Page 15 offers optional starting points; printed excerpts, read-aloud and paired searching are supports, not prerequisites. Every learner investigates both countries. Compare particular people, places and dates, rather than ranking a “best country.”</p>
    <p><small>Use small sections in class. No holiday homework or separate post for each page is required. Select evidence for the existing inquiry portfolio when ready. No new accounts or personal/family disclosures are needed; ask the teacher before contact, fundraising or sharing outside class. These are plans, not claims of completed learning.</small></p>
    <details><summary>Optional earlier rights and civic resources</summary>
      <p>Juniper Park, earlier government lessons, and rights scenarios remain useful practice when they help answer the chosen question. They do not add a separate required gallery or civic product.</p>
      <p><a href="?subject=Social+Studies&amp;socialLesson=rights-in-tension&amp;socialScene=0">Open Juniper Park civic practice</a><br /><a href="https://dlwyatt-eng.github.io/equity-hub/#rights" target="_blank" rel="noreferrer">Optional rights teacher guide and club pathway ↗</a><br /><a href="https://dlwyatt-eng.github.io/learn/#/rights" target="_blank" rel="noreferrer">Optional rights scenarios and printable case ↗</a></p>
      <p>December 10, Human Rights Day, can be a connection within the country inquiry. It is not a second project deadline.</p>
    </details>
  </section>;
}
