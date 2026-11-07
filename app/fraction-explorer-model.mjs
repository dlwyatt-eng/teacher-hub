/** Exact whole-and-remainder model. Parts always belong to an unchanged whole. */
export function fractionModel(numerator, denominator) {
  if (!Number.isInteger(denominator) || denominator < 2 || denominator > 8 || !Number.isInteger(numerator) || numerator < 0 || numerator > denominator * 3) throw new RangeError('Choose 0–3 wholes in equal parts, with denominator 2–8.');
  const whole = Math.floor(numerator / denominator);
  const remainder = numerator % denominator;
  return { numerator, denominator, whole, remainder, mixed: remainder === 0 ? `${whole}` : whole === 0 ? `${remainder}/${denominator}` : `${whole} ${remainder}/${denominator}` };
}
export function countParts(whole, remainder, denominator) {
  if (!Number.isInteger(whole) || !Number.isInteger(remainder) || whole < 0 || remainder < 0 || remainder >= denominator) throw new RangeError('Use complete wholes and a proper fractional part.');
  return fractionModel(whole * denominator + remainder, denominator).numerator;
}
