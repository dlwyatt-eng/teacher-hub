import { useId } from "react";
import { fractionModel, FRACTION_MAX_WHOLES } from "./fraction-explorer-model.mjs";

/** A fixed 0–4 scale: changing the denominator never stretches the whole. */
export default function FractionNumberLine({ numerator, denominator, regrouped = false }: { numerator: number; denominator: number; regrouped?: boolean }) {
  const id = useId();
  const model = fractionModel(numerator, denominator);
  const left = 32;
  const wholeWidth = 144;
  const position = left + (numerator * wholeWidth) / denominator;
  return <div className="fraction-explorer__number-line">
    <h4>Same amount, on a line</h4>
    <p className="fraction-explorer__note">Each space from one whole number to the next is one whole, just like one strip. Each small interval is 1/{denominator}.</p>
    <svg viewBox="0 0 640 116" role="img" aria-labelledby={`${id}-title ${id}-description`}>
      <title id={`${id}-title`}>{`${numerator}/${denominator} on a number line from 0 to 4`}</title>
      <desc id={`${id}-description`}>Each whole has {denominator} equal intervals. Starting at zero, the marker is {numerator} intervals to the right. The endpoint 4 is always in the same place.</desc>
      {Array.from({ length: FRACTION_MAX_WHOLES }, (_, whole) => <rect key={whole} x={left + whole * wholeWidth} y="31" width={wholeWidth} height="36" rx="3" className={`fraction-line__band${whole % 2 === 1 ? " fraction-line__band--alternate" : ""}${regrouped && whole < model.whole ? " is-grouped" : ""}`} />)}
      <line x1={left} y1="56" x2={left + FRACTION_MAX_WHOLES * wholeWidth} y2="56" className="fraction-line__axis" />
      {numerator > 0 && <line x1={left} y1="56" x2={position} y2="56" className="fraction-line__amount" />}
      {Array.from({ length: FRACTION_MAX_WHOLES * denominator + 1 }, (_, part) => {
        const whole = part % denominator === 0;
        const x = left + part * wholeWidth / denominator;
        return <g key={part}><line x1={x} x2={x} y1={whole ? 40 : 48} y2={whole ? 72 : 64} className={whole ? "fraction-line__tick fraction-line__tick--whole" : "fraction-line__tick"} />{whole && <text x={x} y="101" textAnchor="middle">{part / denominator}</text>}</g>;
      })}
      <path d={`M ${position - 8} 16 L ${position + 8} 16 L ${position} 28 Z`} className="fraction-line__pointer" />
      <circle cx={position} cy="56" r="9" className="fraction-line__marker" />
    </svg>
    <p className="fraction-explorer__line-caption" aria-live="polite">{regrouped && <><b>{model.whole > 0 ? "Outlined intervals show complete wholes." : "There is no complete whole yet."}</b> The parts and marker have not moved. </>}<b>{numerator} equal {denominator === 2 ? "half-steps" : denominator === 3 ? "third-steps" : denominator === 4 ? "quarter-steps" : `steps of 1/${denominator}`}</b> from zero. Regrouping does not move the marker.</p>
  </div>;
}
