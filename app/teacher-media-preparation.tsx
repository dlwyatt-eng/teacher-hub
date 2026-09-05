import { mediaViewingPlansFor } from "./first-term-media-preparation";
import "./teacher-media-preparation.css";

/** Mount only in teacher surfaces; no media, account request or storage is created. */
export function TeacherMediaPreparation({ urls }: { urls: readonly (string | undefined)[] }) {
  const plans = mediaViewingPlansFor(urls);
  if (!plans.length) return null;
  return <section className="teacher-media-preparation" aria-label="Teacher media preparation">
    <h4>Before opening media · teacher preparation</h4>
    <p className="teacher-media-preparation__boundary">Optional support. Choose the useful resource, preview it, or use the complete non-video lesson. A source check is not a playback pass.</p>
    {plans.filter(({ plan }) => plan.directUrl).map(({ url, plan }) => <p className="teacher-media-preparation__direct" key={url}><a href={plan.directUrl} target="_blank" rel="noreferrer">Open {plan.title} on YouTube ↗</a></p>)}
    <details><summary>Viewing questions, access checks and fallbacks · expand before use</summary>
    {plans.map(({ url, plan }) => <section className="teacher-media-preparation__plan" key={url}>
      <h5>{plan.title}</h5>
      <dl>
        <dt>Timing / selection</dt><dd>{plan.timing}</dd>
        <dt>Before viewing</dt><dd>{plan.before}</dd>
        <dt>Pause / respond</dt><dd>{plan.pause}</dd>
        <dt>Return to the lesson</dt><dd>{plan.bridge}</dd>
        <dt>Without this media</dt><dd>{plan.fallback}</dd>
        <dt>Access / preparation gate</dt><dd>{plan.access}</dd>
        <dt>Evidence / preview status</dt><dd>{plan.verification}</dd>
      </dl>
    </section>)}
    </details>
  </section>;
}
