import type { ReactNode } from "react";

function Diagram({ title, children, question, limit }: { title: string; children: ReactNode; question: string; limit: string }) {
  return <article className="teaching-diagram"><h2>{title}</h2>{children}<p className="diagram-question"><strong>Talk about it:</strong> {question}</p><p className="diagram-limit">{limit}</p></article>;
}
function Flow({ items }: { items: [string, string][] }) {
  return <ol className="diagram-flow">{items.map(([title, note], i) => <li key={title}><strong>{i + 1}. {title}</strong><span>{note}</span></li>)}</ol>;
}
function PowerDiagram() { return <Diagram title="Who can shape a decision?" question="In our community-room activity, who controls the choice, the information, and the supplies? Are those the same person?" limit="This is a tool for examining power, not a claim that every government follows the same process.">
  <div className="diagram-scroll"><svg viewBox="0 0 800 390" role="img" aria-label="People affected, information, and resources each influence a decision. A review connects the result back to people affected.">
    <path d="M200 80L360 170M400 80V160M600 80L440 170M400 225V280M300 320H80V80H120" fill="none" stroke="#287891" strokeWidth="5" />
    {[["People affected", 30], ["Information", 290], ["Resources", 550]].map(([label,x]) => <g key={label}><rect x={x} y="25" width="220" height="65" rx="12" fill="#d5ebf2"/><text x={Number(x)+110} y="65" textAnchor="middle" fontSize="23">{label}</text></g>)}
    <rect x="260" y="155" width="280" height="75" rx="12" fill="#f8db91"/><text x="400" y="202" textAnchor="middle" fontSize="27">Who decides?</text>
    <rect x="260" y="280" width="280" height="75" rx="12" fill="#d5ebf2"/><text x="400" y="312" textAnchor="middle" fontSize="23">Result → review</text><text x="400" y="341" textAnchor="middle" fontSize="18">Who can challenge it?</text>
    <text x="85" y="260" fontSize="18">Listen again</text>
  </svg></div>
 </Diagram>; }
function SupplyDiagram() { return <Diagram title="Follow an object—not just its price" question="Choose a cotton T-shirt. At which step could a change improve workers’ lives or reduce waste? Who would need to act?" limit="A simplified cotton-shirt route. Real supply chains branch across many places; use a source before making claims about a particular brand."><Flow items={[["Grow cotton", "Land, water and farm work"],["Make fabric", "Spinning, weaving and energy"],["Sew and ship", "Factory work and transport"],["Sell and use", "Prices, wages and choices"],["Repair or discard", "Reuse, waste and responsibility"]]} /><p>At every step ask: <strong>Who does the work? Who decides? Who gains? Who bears the costs?</strong></p></Diagram>; }
function SignalDiagram() { return <Diagram title="A signal travels; a response follows" question="For the ruler-drop investigation, which parts of this route happen before your fingers close?" limit="A simplified route for a voluntary response to something you see. Reflex pathways can differ; this is not a medical test."><Flow items={[["Notice", "Your eyes detect the ruler moving."],["Send", "Sensory signals reach the brain."],["Process", "The brain processes the signal."],["Respond", "Motor signals reach muscles; your fingers close."]]} /><p><strong>Several parts cooperate.</strong> Your measured time includes more than one step.</p></Diagram>; }
function MixtureDiagram() { return <Diagram title="Choose a tool by the property" question="A mixture has gravel, water and dissolved salt. Which two steps could recover the gravel and then the salt?" limit="A classroom model, not a drinking-water treatment recipe. Clear water can still contain harmful substances; never taste a test mixture."><div className="diagram-scroll"><svg viewBox="0 0 840 310" role="img" aria-label="Large pieces: sieve by size. Undissolved small solid: filter. Dissolved salt: evaporate water to leave salt; a filter does not remove dissolved salt.">
    <text x="420" y="35" textAnchor="middle" fontSize="28">What is mixed into the water?</text><path d="M420 55V90H140V130M420 90V130M420 90H700V130" fill="none" stroke="#287891" strokeWidth="4"/>
    {[["Large pieces", "SIEVE", "Size separates them",140],["Undissolved solid", "FILTER", "Particles are trapped",420],["Dissolved salt", "EVAPORATE", "Water leaves; salt stays",700]].map(([top,tool,note,x])=><g key={tool}><rect x={Number(x)-125} y="130" width="250" height="140" rx="12" fill="#e1eff4"/><text x={x} y="170" textAnchor="middle" fontSize="22">{top}</text><text x={x} y="210" textAnchor="middle" fontSize="26" fontWeight="700">{tool}</text><text x={x} y="245" textAnchor="middle" fontSize="18">{note}</text></g>)}
  </svg></div></Diagram>; }
function ForceDiagram() { return <Diagram title="Forces can balance—or change motion" question="Which cart has a net force to the right? Does zero net force always mean an object is stopped?" limit="Horizontal forces only in this model. Zero net force means no change in velocity: an object may remain still or keep moving at constant speed in a straight line."><div className="diagram-scroll"><svg viewBox="0 0 820 360" role="img" aria-label="First cart: five newtons left and five right gives zero net force. Second cart: two newtons left and five right gives three newtons right.">
    {[80,240].map((y,i)=><g key={y}><rect x="350" y={y-35} width="120" height="70" fill="#d5ebf2" stroke="#205c6b" strokeWidth="3"/><text x="410" y={y+8} textAnchor="middle" fontSize="24">Cart</text><path d={`M470 ${y}H650l-15 -10m15 10l-15 10M350 ${y}H${i?278:170}l15 -10m-15 10l15 10`} fill="none" stroke="#205c6b" strokeWidth="5"/><text x="565" y={y-20} textAnchor="middle" fontSize="24">5 N</text><text x={i?305:260} y={y-20} textAnchor="middle" fontSize="24">{i?2:5} N</text><text x="410" y={y+75} textAnchor="middle" fontSize="24">{i?"5 − 2 = 3 N right":"5 − 5 = 0 N"}</text></g>)}
  </svg></div></Diagram>; }
function FractionDiagram() { return <Diagram title="Different names, same amount" question="Why does cutting each quarter into two pieces change the numbers but not the amount shaded?" limit="All three strips represent the same-sized whole. Equal fractions need equal-sized wholes for this picture comparison."><div className="diagram-scroll"><svg viewBox="0 0 800 300" role="img" aria-label="Three equal-length strips show one half, two quarters and four eighths shaded. All reach the same midpoint.">
    {[2,4,8].map((parts,row)=><g key={parts}><text x="70" y={row*90+55} fontSize="27" textAnchor="middle">{parts/2}/{parts}</text>{Array.from({length:parts},(_,i)=><rect key={i} x={150+i*600/parts} y={row*90+15} width={600/parts} height="65" fill={i<parts/2?"#287891":"#fff"} stroke="#163f50" strokeWidth="3" />)}</g>)}<path d="M450 0V290" stroke="#b97714" strokeWidth="4" strokeDasharray="8 7"/>
  </svg></div></Diagram>; }

const entries = [
  { id: "power-map", title: "Who can shape a decision?", lessons: ["power-in-the-room", "compare-government-systems", "rights-in-tension", "civic-decision-brief"], component: PowerDiagram },
  { id: "supply-map", title: "Follow an object's supply chain", lessons: ["supply-chain-shockwave", "pull-the-system-thread", "cooperation-control-room"], component: SupplyDiagram },
  { id: "signal-route", title: "From seeing to responding", lessons: ["signal-case", "systems-jigsaw", "body-case-conference"], component: SignalDiagram },
  { id: "mixture-tools", title: "Which separation tool?", lessons: ["mixture-mystery", "mixture-toolkit", "separation-rescue", "water-treatment-case"], component: MixtureDiagram },
  { id: "force-arrows", title: "Read the force arrows", lessons: ["force-sprint", "force-patterns-lab", "movement-forces", "crash-lab"], component: ForceDiagram },
  { id: "fraction-strips", title: "Equivalent fraction strips", lessons: ["fraction-ratio-remix"], component: FractionDiagram },
];
export function extraInfographics(lessonId: string) {
  return entries.filter(entry => entry.lessons.includes(lessonId)).map(({id,title,component: Component}) => ({id,title: `Diagram · ${title}`,content: <Component />}));
}
