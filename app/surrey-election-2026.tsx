export type ElectionConnection = {
  lessonId: string;
  window: string;
  whyNow: string;
  studentQuestion: string;
  display: string;
  studentMove: string;
  grouping: string;
  minutes: string;
  skip: string;
  next: string;
};

import { surreyElectionCalendar, surreyElectionSources } from "./surrey-election-2026-data";

export const electionConnections: ElectionConnection[] = [
  { lessonId: "maps-make-arguments", window: "Early September", whyNow: "A city map is also a map of public decisions.", studentQuestion: "Which public decision is hiding inside this map?", display: "Open Surrey COSMOS or the Fleetwood Plan beside the election timeline.", studentMove: "Point to one place students use. Ask which public body can change it and what evidence that body would need.", grouping: "Whole class → pairs", minutes: "12–20 min", skip: "Skip candidate names; keep the map-and-jurisdiction question.", next: "Power in the Room or Compare Government Systems" },
  { lessonId: "power-in-the-room", window: "Early September", whyNow: "Students need to separate final authority from influence before studying campaigns.", studentQuestion: "Who can decide—and who can only influence the choice?", display: "Use the built-in power map, then add the ten on-screen decision scenarios.", studentMove: "Sort who can decide, recommend, administer, vote, or speak publicly in each school/city scenario.", grouping: "Groups of 3–4", minutes: "20–30 min", skip: "Run four scenario cards instead of all ten.", next: "Compare Government Systems" },
  { lessonId: "compare-government-systems", window: "Sept. 8–18", whyNow: "The live election makes levels and institutions concrete.", studentQuestion: "Who can actually make each Surrey or school decision?", display: "Project Who Decides What? and the official City and Surrey Schools source doors.", studentMove: "Move scenario cards to school, school district, city, province, or federal government—and name the exact decision.", grouping: "Teams → whole-class check", minutes: "25–40 min", skip: "Use only school capacity, parks, transit, and curriculum cards.", next: "Rights in Tension" },
  { lessonId: "perspective-without-guessing", window: "Mid/Late September", whyNow: "Campaigns claim to speak for communities; sources help students test who is represented.", studentQuestion: "Who is represented—and whose voice is missing?", display: "Use one official issue source and one dated candidate statement selected by the teacher.", studentMove: "Mark what is stated, what is inferred, who is affected, and whose voice is still missing.", grouping: "Pairs", minutes: "20–35 min", skip: "Analyze the official issue source only.", next: "Trace the Claim" },
  { lessonId: "trace-the-claim", window: "Late September–Early October", whyNow: "Candidate statements provide authentic but interested claims to verify.", studentQuestion: "What does this campaign claim prove—and what still needs checking?", display: "Show one short, teacher-selected campaign promise beside the original official data or policy source.", studentMove: "Label fact, opinion, claim, or promise; trace the strongest checkable part; report supported, contradicted, or still uncertain.", grouping: "Pairs or triads", minutes: "25–40 min", skip: "Verify one sentence together on the projector.", next: "Civic Decision Brief" },
  { lessonId: "rights-in-tension", window: "Late September", whyNow: "Local issues involve real needs, limited money, and people who may be affected differently.", studentQuestion: "How should Surrey make a fair choice when money and space are limited?", display: "Keep Juniper Park fictional, then run the 10–15 minute Surrey City Budget transfer on screen.", studentMove: "Build a testable public recommendation with evidence, a missing voice, and a date to check the result.", grouping: "Whole class → partners", minutes: "Existing lesson + 10–15 min", skip: "Keep the excellent fictional case; use Surrey only in the final transfer question.", next: "Civic Decision Brief" },
  { lessonId: "civic-decision-brief", window: "Oct. 1–16", whyNow: "Students can now judge jurisdiction, evidence, trade-offs, and accountability before a mock vote.", studentQuestion: "What evidence belongs in a fair comparison before a private vote?", display: "Use the official candidate list after Sept. 11 and a teacher-curated comparison of directly sourced statements.", studentMove: "Prepare a neutral comparison, hold the existing civic hearing, then vote privately. Explain a decision using evidence without pressuring anyone to reveal a choice.", grouping: "Teams + private individual ballot", minutes: "2–3 blocks", skip: "Hold the hearing and reflection without a ballot.", next: "Post-election Newsroom reflection" },
] as const;

export function electionConnectionForLesson(lessonId: string) {
  return electionConnections.find(connection => connection.lessonId === lessonId) ?? null;
}

const electionSourceIdsByLesson: Record<string, readonly string[]> = {
  "maps-make-arguments": ["surrey-election", "surrey-roles"],
  "power-in-the-room": ["surrey-roles", "surrey-board", "surrey-school-capacity"],
  "compare-government-systems": ["surrey-roles", "surrey-board", "surrey-school-capacity"],
  "perspective-without-guessing": ["surrey-candidates", "surrey-budget", "surrey-school-capacity"],
  "trace-the-claim": ["surrey-candidates", "digital-democracy", "surrey-budget"],
  "rights-in-tension": ["surrey-budget", "surrey-roles"],
  "civic-decision-brief": ["surrey-candidates", "surrey-roles", "student-vote", "digital-democracy"],
};

function sourcesForElectionLesson(lessonId: string) {
  const sourceIds = electionSourceIdsByLesson[lessonId] ?? ["surrey-election"];
  return sourceIds.flatMap(sourceId => {
    const source = surreyElectionSources.find(item => item.id === sourceId);
    return source ? [source] : [];
  });
}

const officeCards = [
  ["SCHOOL", "Teacher", "Classroom learning, feedback, routines"],
  ["SCHOOL", "Principal", "School operations, safety, staff leadership"],
  ["DISTRICT", "Superintendent / staff", "Carry out district direction and manage the system"],
  ["ELECTED BOARD", "School trustee", "District policy, budget oversight, superintendent accountability"],
  ["CITY", "Councillor", "Votes on city bylaws, services, plans, and budgets"],
  ["CITY", "Mayor", "Leads council and represents the city; does not decide alone"],
  ["PROVINCE", "MLA", "Represents a riding; debates and votes on provincial laws and budgets"],
  ["PROVINCE", "Premier", "Leads the provincial government and Cabinet; does not pass laws alone"],
  ["CANADA", "MP", "Represents a riding; debates and votes on federal laws and budgets"],
  ["CANADA", "Prime Minister", "Leads the federal government and Cabinet; does not pass laws alone"],
] as const;

const decisionScenarios = [
  { prompt: "Choose how tomorrow's classroom concept will be practised and checked.", answer: "Teacher", reason: "The teacher plans classroom instruction and feedback." },
  { prompt: "Set the school's emergency procedures and organize safe school operations.", answer: "Principal", reason: "The principal leads day-to-day school operations and safety." },
  { prompt: "Carry out board direction across the district and manage the school system.", answer: "Superintendent / district administration", reason: "District staff implement board policy and administer the system." },
  { prompt: "Approve district priorities, policy, and a school-system budget.", answer: "Board of Education / trustees", reason: "Trustees decide collectively as the elected board—not one trustee acting alone." },
  { prompt: "Vote on a city bylaw, service plan, or municipal budget.", answer: "City Council", reason: "Mayor and councillors make council decisions together at an official meeting." },
  { prompt: "Chair council, recommend action, and represent Surrey publicly.", answer: "Mayor", reason: "The mayor leads council but cannot pass a council decision alone." },
  { prompt: "Represent local constituents and vote on a proposed B.C. education law or provincial budget.", answer: "MLA", reason: "An MLA represents a provincial riding and votes in the Legislative Assembly; one MLA does not set the law or budget alone." },
  { prompt: "Lead the B.C. government as it proposes an education plan and budget.", answer: "Premier", reason: "The premier leads the provincial government and Cabinet, while laws and budgets still move through the Legislative Assembly." },
  { prompt: "Represent a Surrey-area riding and vote on a proposed federal citizenship or immigration law.", answer: "MP", reason: "An MP represents a federal riding and votes in the House of Commons; one MP does not make federal law alone." },
  { prompt: "Lead the federal government as it proposes a national defence or immigration policy.", answer: "Prime Minister", reason: "The prime minister leads the federal government and Cabinet, while laws and budgets still move through Parliament." },
] as const;

function DecisionScenarioSort() {
  return <section className="decision-scenario-sort" aria-label="Who decides what scenario sort"><header><small>PROJECTOR SORT · POINT, MOVE, REVEAL</small><strong>Ten decisions. Which role has the authority?</strong><p>Partners choose first. Open the card only after they name the exact decision and one role that can influence it.</p></header><div>{decisionScenarios.map((scenario, index) => <details key={scenario.prompt}><summary><small>SCENARIO {index + 1}</small><strong>{scenario.prompt}</strong><span>Reveal</span></summary><p><b>{scenario.answer}</b>{scenario.reason}</p></details>)}</div></section>;
}

export function SurreyElectionBridge({ lessonId, audience }: { lessonId: string; audience: "teacher" | "student" }) {
  const connection = electionConnectionForLesson(lessonId);
  if (!connection) return null;
  const sources = sourcesForElectionLesson(lessonId);
  if (audience === "student") return <details className="surrey-election-bridge surrey-election-bridge--student">
    <summary><span>LIVE SURREY CASE · 2026</span><strong>{connection.studentQuestion}</strong><b>Open</b></summary>
    <div><p className="surrey-election-action">{connection.studentMove}</p>{lessonId === "compare-government-systems" && <><section className="who-decides-grid" aria-label="Who decides what"><header><small>WHO DECIDES WHAT?</small><strong>Match the decision—not just the topic.</strong></header>{officeCards.map(card => <article key={card[1]}><small>{card[0]}</small><strong>{card[1]}</strong><p>{card[2]}</p></article>)}</section><DecisionScenarioSort /></>}{lessonId === "rights-in-tension" && <section className="who-decides-grid" aria-label="Real Surrey budget transfer"><header><small>10–15 MIN · REAL SURREY TRANSFER</small><strong>One city budget. Many needs.</strong></header><article><small>LOOK</small><strong>Read the current numbers.</strong><p>Keep one-year operating money separate from five-year capital money.</p></article><article><small>WEIGH</small><strong>Name the trade-off.</strong><p>Compare safety, roads and transportation, parks, recreation, and neighbourhood investments.</p></article><article><small>CHECK</small><strong>Find a missing voice.</strong><p>What evidence should guide the choice—and whose perspective is not visible yet?</p></article><article><small>OPEN</small><strong>City of Surrey source</strong><p><a href={sources[0]?.url} target="_blank" rel="noreferrer">2026 City Budget ↗</a></p></article></section>}{lessonId !== "rights-in-tension" && <a href={sources[0]?.url ?? surreyElectionSources[0].url} target="_blank" rel="noreferrer">Open the first official source ↗</a>}</div>
  </details>;
  return <section className="surrey-election-bridge surrey-election-bridge--teacher">
    <header><div><small>LIVE SURREY CASE · {connection.window}</small><strong>{connection.whyNow}</strong></div><span>{connection.minutes} · {connection.grouping}</span></header>
    <div className="surrey-election-teacher-grid"><article><small>DISPLAY</small><p>{connection.display}</p></article><article><small>STUDENTS</small><p>{connection.studentMove}</p></article><article><small>SHORT ROUTE</small><p>{connection.skip}</p></article><article><small>NEXT</small><p>{connection.next}</p></article></div>
    <nav aria-label="Official Surrey election source doors">{sources.map(source => <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><small>{source.organization} · {source.dated}</small><strong>{source.title}</strong><span>{source.use}</span></a>)}</nav>
  </section>;
}

export function SurreyElectionPacing() {
  return <section className="surrey-election-pacing"><header><small>LIVE CASE SPINE · SEPT. 1–OCT. 17, 2026</small><h3>Use the election when it sharpens the lesson.</h3><p>The existing units remain intact. These dated stops bring forward selected lessons without turning the campaign into a separate unit.</p></header><ol>{surreyElectionCalendar.map(item => <li key={item.date}><b>{item.date}</b><div><strong>{item.label}</strong><p>{item.action}</p></div></li>)}</ol><footer><strong>After Oct. 17:</strong><span>What happened? What surprised us? What can each winner actually do—and who can still question, influence, or review the decision?</span></footer></section>;
}
