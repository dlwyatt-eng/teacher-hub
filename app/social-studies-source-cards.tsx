export const internetSource = "https://www.statcan.gc.ca/o1/en/plus/4288-canadian-seniors-more-connected-ever";
export const cedarSource = "https://www.cedarlng.com/2023/03/14/cedar-lng-receives-b-c-environmental-approval-and-signs-memorandum-of-understanding-with-arc-resources-ltd/";
export const cedarDecision = "https://news.gov.bc.ca/releases/2023ENV0018-000321";
export const minimumProduct = "One question; three evidence-backed ideas; a small system map; two responses compared; one 5–8 minute audience task; one honest limit. Use two or three different sources. Each person explains one connection.";

export function CedarCase() {
  return <section className="ss-starter-cards" aria-label="Cedar LNG source pair">
    <h4>Cedar LNG · a B.C. decision in March 2023</h4>
    <p>Read A and B. Mark a shared fact, a different emphasis, and a result neither source proves.</p>
    <article><strong>A · Haisla-majority-owned project partnership · 14 March 2023</strong><p>The Haisla Nation and Pembina announced provincial approval for a proposed floating natural-gas export facility on Haisla-owned land in Kitimat. Haisla leadership connected the project to economic self-determination. The partners described expected jobs and environmental benefits. These are their aims and claims, not measured outcomes.</p><a href={cedarSource} target="_blank" rel="noreferrer">Read the joint announcement and attributed Haisla statement</a></article>
    <article><strong>B · B.C. public decision · 14 March 2023</strong><p>The Province reported issuing an environmental assessment certificate with 16 enforceable conditions. Requirements included emissions planning, community complaints, marine-use communication with First Nations, and hiring and housing plans. Approval with conditions does not prove there will be no harm.</p><a href={cedarDecision} target="_blank" rel="noreferrer">Read the provincial decision</a></article>
    <p><b>Your case card:</b> Who owns and decides? What benefit is claimed? Which condition addresses a possible cost? What later evidence would show whether it worked?</p>
    <p><b>Keep the limit:</b> This is a historical decision snapshot, not the project’s current status. Haisla is a specific Nation and government, not a voice for all Indigenous Peoples. The joint project source has a financial interest; the approval source is not independent proof of results. Do not role-play a Nation or infer unanimous consent.</p>
  </section>;
}

