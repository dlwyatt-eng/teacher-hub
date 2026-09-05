const scales = [
  { max: 0.01, jump: "0.001", halfway: "0.005", note: "8 equal jumps reach 0.008." },
  { max: 0.1, jump: "0.01", halfway: "0.05", note: "0.008 is between 0 and the first mark, 0.01." },
  { max: 1, jump: "0.1", halfway: "0.5", note: "0.008 is very close to 0, before the first mark, 0.1. Use the 0–0.01 line to see it precisely." },
] as const;

export function DecimalScale({ index, blank = false }: { index: number; blank?: boolean }) {
  const scale = scales[index];
  const x = 35 + 570 * (0.008 / scale.max);
  return <section className="magnitude-scale" aria-label={`${blank ? "Blank n" : "N"}umber line from 0 to ${scale.max}`}>
    <h4>0 → {scale.max}</h4>
    <svg viewBox="0 0 640 120" role="img" aria-label={`Ten equal spaces from 0 to ${scale.max}.${blank ? " Mark your prediction." : ` Each jump is ${scale.jump}. ${scale.note}`}`}>
      <path d="M35 55H605" />
      {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${35 + i * 57} 45V65`} />)}
      {!blank && <><circle cx={x} cy="55" r="5" /><text x={Math.max(55, x)} y="24" textAnchor={x < 70 ? "start" : "middle"}>0.008</text>{x < 70 && <path className="magnitude-pointer" d={`M${x} 45L55 29`} />}</>}
      <text x="35" y="100">0</text><text x="320" y="100" textAnchor="middle">{scale.halfway}</text><text x="605" y="100" textAnchor="end">{scale.max}</text>
    </svg>
    <p><b>One equal jump = {blank ? "________" : scale.jump}</b>{!blank && <span>{scale.note}</span>}</p>
  </section>;
}

export function LargeNumberPeriodChart({ blank = false }: { blank?: boolean }) {
  return <section className="magnitude-period-chart" aria-label={blank ? "Blank large-number period chart" : "Worked large-number comparison"}>
    <h4>{blank ? "Group digits in threes. Compare from the left." : "Which is greater: 2,306,000,000 or 2,360,000,000?"}</h4>
    <table><caption>Each period holds three digit places.</caption><thead><tr>{["Billions", "Millions", "Thousands", "Ones"].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>
      {(blank ? [["", "", "", ""], ["", "", "", ""]] : [["2", "306", "000", "000"], ["2", "360", "000", "000"]]).map((row, i) => <tr key={i}>{row.map((value, j) => <td key={j}>{value || "___"}</td>)}</tr>)}
    </tbody></table>
    {!blank && <p>The billions digits are both 2. The hundred-millions digits are both 3. The ten-millions digits differ: <b>0 &lt; 6</b>, so <b>2,360,000,000 is greater.</b></p>}
  </section>;
}

export function MagnitudeWorkedModel({ step }: { step?: number }) {
  const active = step === undefined ? undefined : step < 3 ? 0 : step < 5 ? step - 2 : 3;
  return <div className="magnitude-worked-model">
    {scales.map((scale, index) => <div key={scale.max} data-current={active === undefined || active === index}>
      <div className="math-place-value-row" aria-label="Zero ones, zero tenths, zero hundredths and eight thousandths">{["Ones", "Tenths", "Hundredths", "Thousandths"].map((label, i) => <span key={label}><small>{label}</small><b>{i === 3 ? 8 : 0}</b></span>)}</div>
      <DecimalScale index={index} />
    </div>)}
    <div data-current={active === undefined || active === 3}><LargeNumberPeriodChart /></div>
  </div>;
}

export function MagnitudePaperSheets() {
  return <section className="magnitude-paper-sheets" aria-label="Reusable number lines and period chart">
    <h3>Paper for this workshop</h3>
    <p>Use these blank scales again for practice. Before the example, predict where 0.008 belongs on each line. Label one jump and mark your prediction.</p>
    <p className="magnitude-pdf-link"><a href="/printables/magnitude-number-lines-and-periods.pdf" target="_blank" rel="noreferrer">Open the two-page maths sheet (PDF) ↗</a></p>
    {scales.map((scale, index) => <DecimalScale key={scale.max} index={index} blank />)}
    <p>What stayed the same? What changed?</p><div className="magnitude-response-space" />
    <LargeNumberPeriodChart blank />
    <p>The first different place is __________. I know __________ is greater because:</p><div className="magnitude-response-space" />
  </section>;
}
