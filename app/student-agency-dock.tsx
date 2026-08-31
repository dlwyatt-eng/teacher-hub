"use client";

import "./student-agency-dock.css";

export default function StudentAgencyDock({ onNewsroom, onInquiry }: { onNewsroom: () => void; onInquiry: () => void }) {
  return (
    <section className="agency-dock" aria-labelledby="agency-dock-title">
      <header>
        <div><small>CHOOSE A PATH</small><h2 id="agency-dock-title">Look closely—or follow a question.</h2></div>
      </header>
      <div>
        <button type="button" onClick={onNewsroom} className="agency-dock__newsroom"><span aria-hidden="true">S</span><span><small>TEXT · IMAGE · MAP · DATA</small><strong>Source Lab &amp; Newsroom</strong></span><b aria-hidden="true">→</b></button>
        <button type="button" onClick={onInquiry} className="agency-dock__inquiry"><span aria-hidden="true">?</span><span><small>A QUESTION WORTH FOLLOWING</small><strong>My Inquiry</strong></span><b aria-hidden="true">→</b></button>
      </div>
    </section>
  );
}
