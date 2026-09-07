"use client";

import { CedarCase, internetSource, minimumProduct } from "./social-studies-source-cards";

const aids: Record<string, {title: string; first: string; cards: [string,string][]; prompts: string[]}> = {
  "city-moves": {title:"Movement cards and timeline", first:"Read the four fictional cards on the lesson screen. Sketch two places and a border; no real-world route is claimed.", cards:[
    ["Card 1 · Work and school","A family moves from a smaller town to a city in the same country after a parent finds work and an older child needs a nearby secondary school."],
    ["Card 2 · Work and family","A nurse accepts a job in another country. Their partner and child move with them to be closer to relatives."],
    ["Card 3 · Safety","After repeated flooding damages homes, several families move to an inland city in the same country."],
    ["Card 4 · Unknown","A caption says: New neighbours arrived this month. It gives no starting place, destination or reason."],
    ["City planning cards","Homes · school spaces · transit · health services · public space. Choose two to investigate for a fictional district expecting 100 new households."],
    ["Condition cards","Many residents rely on transit. The nearest school uses every classroom. New housing is far from clinics. Choose one; revise your plan."]], prompts:["Before → during → after: write only what the story supports. Mark missing information with a question mark.","Name one change, one thing that continued, and why it matters. Do not invent feelings or a refugee status."]},
  "data-skyline": {title:"Four real data tiles · Canada", first:"Draw a 0–100% axis. Build two bars for one year; then add the other year.", cards:[
    ["2020 · age 15+","92% used the Internet."],["2020 · age 75+","62% used the Internet."],["2022 · age 15+","95% used the Internet."],["2022 · age 75+","72% used the Internet."],
    ["Source and meaning","Statistics Canada, Canadian Internet Use Survey; summary published 14 August 2023. Survey population: people 15+ in the ten provinces; excludes institutional residents and people living on reserves. Percent of each named age group, not share of all Internet users."],
    ["Gender and opportunity · five-minute discussion","The World Inequality Report 2026 finds that women do more unpaid domestic and care work on average. Sort cooking, paid nursing, childcare and paid building work by whether payment is stated—not by gender. How might time available for paid work affect opportunity? This describes a broad pattern, not every person or household."],
    ["Read carefully","Age 75+ is inside age 15+: these are overlapping groups. Do not add or average their rates. Internet use does not measure affordability, connection quality, wealth or a person’s ability."]], prompts:["Label each bar with group, year, % and source. Describe one gap or change in percentage points.","Write one supported claim and one thing the numbers cannot explain. How could a public service include people who do not use the Internet?"]},
  "supply-chain-shockwave": {title:"Product chain and resource decision", first:"Use the existing T-shirt model in Earth, Stuff & Fairness or the supplied backpack screen. Both are simplified models, not a traced brand.", cards:[
    ["Product path","Cotton/resources → fabric and sewing → transport/shop → use/repair → reuse or disposal. Add one decision-maker and question at each step."],
    ["Shock cards","Shipping is delayed two weeks. Repair parts become unavailable. A purchasing rule now requires pay records. Choose one; trace three possible effects, not guaranteed results."],
    ["Redesign cards","Offer repair parts; change a supplier contract; add worker negotiation; change public purchasing. Choose two, name who can act, and explain a cost or limit."]],prompts:["Product → three possible ripple effects → one rule change → who decides → a trade-off.","For Cedar LNG, compare the supplied dated source pair. An approval, a prediction and a measured result are different kinds of evidence."]},
  "cooperation-control-room": {title:"From a promise to a result",first:"Start with the Cedar LNG source pair, then the fictional river challenge. For a replacement or follow-up stage comparison, use three existing Earth cards: Canada microbeads, loss-and-damage funding, and China’s historical poverty reduction.",cards:[
    ["Evidence ladder","Proposal → agreement → implementation → measured result. A card may show several stages; leave any unsupported stage blank."],
    ["Source comparison","Use Cedar LNG A and B below as a bounded same-event comparison. These are a joint project announcement and public decision bulletin, not independent journalism. Compare their purposes and missing evidence."],
    ["Fictional river challenge","Plastic pellets cross two regions into a shared bay. Choose three actions: prevent spills, monitor with communities, share findings, clean up, or review later. No group can do everything."],
    ["Stress cards","Rain spreads the pellets. Funding ends. A different upstream source is found. A community rejects a harmful cleanup method. Choose one and revise."],
    ["Two practice plans","Plan A: spend everything cleaning the bay once. Plan B: split effort between spill prevention, community-led monitoring and a six-month review. Neither has measured results yet. Which missing evidence would change your choice?"]],prompts:["For each real card: action, source/date, stage supported, result still unknown, next check.","For your fictional agreement: lead, resources, rights/decision role, three actions, one uncovered need, review date and one measurable signal."]},
  "pull-the-system-thread": {title:"Keep the inquiry small",first:"Reuse one Unit 3 case or Earth’s borrowing-station example. Ask one question a small team can investigate.",cards:[
    ["Bounded question","What could help shared supplies come back while keeping borrowing easy for everyone? This is the supplied fictional case, not a claim about our class."],
    ["Starting evidence","20 items were borrowed; 14 returned by the end of the day. Six locations are unknown. The count does not show theft or why items are missing."],
    ["Map labels","Visible result · possible cause · decision-maker · affected people · rule or resource. Use 4–6 boxes. Solid arrows for supported links; dashed arrows for ideas to check."],
    ["Change cards","Add a reachable return tray; change the borrowing routine; publish an anonymous item count. Trace three possible effects, including an access barrier or extra work."]],prompts:["Our question / why it matters / 4–6 box map with sources / one possible change / one unknown.","Finish a useful map before adding more research. No separate upload."]},
  "responses-under-pressure": {title:"Three shared response stations",first:"Open Earth’s existing change cards. Use Canada microbeads, Surrey green infrastructure, and climate loss-and-damage funding as the shared environmental set.",cards:[
    ["Same questions at every station","Who acts? What changes? What evidence exists? Who helps decide? What result is not yet established?"],
    ["Keep the issues distinct","These address different environmental problems. Compare mechanisms and evidence stages; do not rank them as if they solve the same problem."],
    ["Pressure cards","Funding is cut; a group cannot access the response; implementation is delayed; monitoring shows no improvement. Choose one, then name what you would need to check."],
    ["Team scope","Study three shared cards, but compare only two responses in your final product. Teams with another inquiry can reuse their existing source trail with teacher approval."]],prompts:["Response A / response B / evidence of action / evidence of effect / limit / what we would keep, adapt or question.","A sensible prediction is not a measured result. No new SpacesEDU post."]},
  "make-it-teachable": {title:"Minimum successful product",first:"Fold one sheet into four parts: question, explain, audience task, and limit. This paper version can be your final product.",cards:[
    ["Enough to succeed",minimumProduct],
    ["Equal-status formats","Paper exhibit, tabletop model, poster, short live workshop, simple slides, or audio with a paper choice card. Digital building and film editing are optional only if time remains."],
    ["Evidence passport","For each of three ideas: claim → source creator/title/date → supporting detail → limitation. Add a source beside the idea, not just in a link pile."],
    ["Stop rule","One question and one team artifact. Use existing Unit 3–4 research. Do not add a second topic or new production tool after the paper prototype is approved."]],prompts:["Opening question / three ideas and sources / small system map / two responses and limits / 5–8 minute audience task.","We can cut… We must check… Each person can explain…"]},
  "expert-exchange": {title:"Test, revise, teach",first:"Plan five 60-minute blocks. Keep the same small product; audience feedback is a reason to improve it, not rebuild it.",cards:[
    ["Block 1 · 60 minutes","Set up 10; paired tests 20; teach-backs 15; record signals 10; reset 5."],
    ["Block 2 · 60 minutes","Finish teach-backs and choose fixes 20; revise 35; reset 5."],
    ["Block 3 · 60 minutes","Finish revisions 25; accuracy/access check 15; rehearse 15; reset 5."],
    ["Block 4 · 60 minutes","Set up 10; three 10-minute exchange rounds (30); three 5-minute move/reset periods (15); debrief 5. In each round, use a 5–8 minute task then a question."],
    ["Block 5 · 60 minutes","More exchange or absences 20; individual reflection 20; select/upload final evidence 15; reset 5. Paper reflection can be uploaded during a later device block."],
    ["Feedback slip","I learned… I got stuck at… I need proof for… Creators: we changed one idea and one direction because…"]],prompts:["Before / audience evidence / content revision / participation revision / after.","Individual reflection: one thing I understand, the evidence that changed my thinking, my contribution, and one remaining limit. Share the team artifact once."]}
};

export default function SocialStarter({lessonId, teacher = false}: {lessonId:string; teacher?:boolean}) {
  const aid = aids[lessonId];
  if (!aid) return null;
  const earthActivity = lessonId === "responses-under-pressure" || lessonId === "cooperation-control-room" ? "change" : lessonId === "supply-chain-shockwave" ? "stuff" : "action";
  const base = typeof window !== "undefined" && window.location.pathname.startsWith("/teacher-hub") ? "/teacher-hub/" : "/";
  const print = () => {
    const sheet = document.querySelector(".ss-starter-sheet");
    if (!sheet) return;
    const root = document.createElement("div");
    root.className = "ss-print-root" + (sheet.closest(".large-text-mode") ? " ss-print-large" : "");
    root.appendChild(sheet.cloneNode(true));
    document.body.appendChild(root);
    document.body.classList.add("print-social-starter");
    const clean = () => { document.body.classList.remove("print-social-starter"); root.remove(); };
    window.addEventListener("afterprint", clean, {once:true});
    window.print();
  };
  return <details className="ss-starter" open={teacher}>
    <summary>Supplied materials · {aid.title}</summary>
    <div className="ss-starter-sheet">
      <header><small>GRADE 6 · {aid.title} · prepared 7 September 2026</small><h3>{aid.title}</h3><p><b>Start here:</b> {aid.first}</p></header>
      <div className="ss-starter-cards">{aid.cards.map(([title,body])=><article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div>
      {lessonId === "data-skyline" && <p><a href={internetSource}>Statistics Canada · dated source</a> · <a href="https://wir2026.wid.world/insight/executive-summary/">World Inequality Report 2026 · gender and unpaid work</a>. Report edition is not a single data-collection year.</p>}
      {(lessonId === "supply-chain-shockwave" || lessonId === "cooperation-control-room") && <CedarCase />}
      {["responses-under-pressure","cooperation-control-room","supply-chain-shockwave"].includes(lessonId) && <p className="ss-starter-tools"><a href={`${base}earth-stuff-fairness/?band=6%E2%80%937&activity=${earthActivity}`} target="_blank" rel="noreferrer">Open the existing Earth source cards and their print view</a> · Select just the named cards. Their source dates and limitations travel with them.</p>}
      <section className="ss-response"><h4>Our thinking · name / team: __________________</h4>{aid.prompts.map(p=><div key={p}><p>{p}</p><div className="ss-writing-space" /></div>)}</section>
    </div>
    <div className="ss-starter-tools"><button type="button" onClick={print}>Print these student materials</button> <a href={`${base}printables/social-studies/${lessonId}.pdf`} target="_blank" rel="noreferrer">Student PDF</a> · <a href={`${base}printables/social-studies/${lessonId}-large.pdf`} target="_blank" rel="noreferrer">Large-text PDF</a><p>Paper, board or spoken responses all work. No student account or AI required. Read the supplied summaries if an external link is unavailable.</p>{teacher && <p>For a current-events extension, reopen the original source and record the new date before changing a historical claim. Assess evidence, connections and limits, not the chosen political position or production polish.</p>}</div>
  </details>;
}
