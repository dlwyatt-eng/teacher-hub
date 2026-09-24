import type { ReactNode } from "react";
import "./visual-teaching-moments.css";

/** A short, projectable task. The illustration must carry the idea, not decorate it. */
export function VisualTeachingMoment({ label, question, children, notice, response }: {
  label: string;
  question: string;
  children: ReactNode;
  notice: string;
  response: string;
}) {
  return <section className="visual-teaching-moment" aria-label={label}>
    <header><small>{label}</small><h2>{question}</h2></header>
    <div className="visual-teaching-moment__model">{children}</div>
    <div className="visual-teaching-moment__task"><p><b>Notice</b>{notice}</p><p><b>Show your thinking</b>{response}</p></div>
  </section>;
}

export function DecimalInvoiceLaunch() {
  return <VisualTeachingMoment label="LOOK · DECIMAL DISPATCH" question="Would you approve this invoice?" notice="Where might a decimal point have gone wrong?" response="Estimate with 6 × $2 and 6 × $3. Point, sketch, say, or write a reason before calculating exactly.">
    <div className="visual-invoice" aria-label="Fictional invoice: six notebooks at two dollars and thirty-five cents each, with a claimed total of one hundred forty-one dollars">
      <div><span>NOTEBOOKS</span><strong>6</strong></div>
      <span aria-hidden="true">×</span>
      <div><span>EACH</span><strong>$2.35</strong></div>
      <span aria-hidden="true">→</span>
      <div className="visual-invoice__claim"><span>INVOICE CLAIMS</span><strong>$141.00</strong></div>
    </div>
  </VisualTeachingMoment>;
}

export function DecimalInvoiceModel() {
  return <VisualTeachingMoment label="MODEL · DECIMAL DISPATCH" question="Find the real total, then check its size." notice="The six dollars-and-cents groups stay together." response="Explain why $141.00 cannot be right. Then try a second invoice with your partner.">
    <div className="visual-decimal-model" aria-label="Six notebooks at two dollars and thirty-five cents: twelve dollars plus two dollars and ten cents equals fourteen dollars and ten cents">
      <div><small>DOLLARS</small><strong>6 × $2 = $12</strong></div>
      <span aria-hidden="true">+</span>
      <div><small>CENTS</small><strong>6 × 35¢ = 210¢ = $2.10</strong></div>
      <span aria-hidden="true">=</span>
      <div className="visual-decimal-model__result"><small>REAL TOTAL</small><strong>$14.10</strong><em>Between $12 and $18 ✓</em></div>
    </div>
  </VisualTeachingMoment>;
}

export function EvidenceInferenceLaunch() {
  return <VisualTeachingMoment label="THINK · ONE MOMENT, THREE VOICES" question="What does the picture show? What are we adding?" notice="Point to a detail in the shared image that anyone could check." response="Tell a partner one possible inference and one question the image cannot answer.">
    <div className="visual-evidence-chain" aria-label="Evidence supports a possible inference, while some information remains unknown">
      <div><small>VISIBLE EVIDENCE</small><strong>A student holds a page near the display.</strong></div>
      <span aria-hidden="true">→</span>
      <div><small>POSSIBLE INFERENCE</small><strong>They may be preparing to present.</strong></div>
      <span aria-hidden="true">?</span>
      <div><small>STILL UNKNOWN</small><strong>What are they thinking?</strong></div>
    </div>
  </VisualTeachingMoment>;
}
