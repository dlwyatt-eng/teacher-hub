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
    <h4>{blank ? "Try together: compare 3,405,000,000 and 3,450,000,000." : "Which is greater: 2,306,000,000 or 2,360,000,000?"}</h4>
    <table><caption>Commas separate groups of three places, called periods. The leftmost group may have fewer digits.</caption><thead><tr>{["Billions", "Millions", "Thousands", "Ones"].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead><tbody>
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
    <h3>Compare large whole numbers · a separate short activity</h3>
    <p><strong>We are learning:</strong> to explain which whole number is greater using place value. Just as 0.8 and 0.08 have different values, a digit in the millions place has a different value from the same digit in the thousands place.</p>
    <p><strong>Watch one example:</strong> each chart column holds a group of places. In the Millions column, 306 means 306 million: 3 hundred-millions, 0 ten-millions and 6 millions.</p>
    <LargeNumberPeriodChart />
    <ol><li>Read the two numbers aloud. Separate the groups at each comma.</li><li>Write the first number in the first row and the second number in the second row. Keep each group under its matching heading.</li><li>Compare matching digit places from left to right. If the digits match, move to the next place. Stop at the first different digit.</li><li>Circle the greater number. Explain which place decided your answer.</li></ol>
    <LargeNumberPeriodChart blank />
    <p>The first place with different digits is __________. The digits there are ____ and ____. The greater number is __________ because:</p><div className="magnitude-response-space" />
    <h4>Try on your own: compare 807,090,000 and 870,009,000.</h4>
    <p>Circle the greater number and explain which digit place decides. Hand in your chart and both comparison explanations.</p><div className="magnitude-response-space" />
    <p><strong>Check your work:</strong> are matching places lined up? Did you compare from the greatest place first? Did you name the place that decides?</p>
  </section>;
}
