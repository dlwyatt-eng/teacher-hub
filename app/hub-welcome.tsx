import Image from "next/image";

/** Shared visual entrances. The classroom's date, routes and tools remain owned by their existing components. */
export function HubWelcome() {
  return (
    <header className="hub-welcome" aria-labelledby="hub-welcome-title">
      <div className="hub-welcome-copy">
        <p className="section-kicker">BC GRADE 6 · PLAN, PROJECT, TEACH</p>
        <h1 id="hub-welcome-title">Make room<br />for wonder.</h1>
        <p>A familiar place to begin.<br />A whole world to explore.</p>
        <span className="hub-welcome-orientation">Start with your day below, or choose a learning area.</span>
      </div>
      <figure className="hub-welcome-art">
        <Image unoptimized priority src="/design/classroom-landscape.webp" width={1896} height={830} sizes="(max-width: 700px) 100vw, 50vw" alt="An imagined school courtyard with a library, gardens and places to learn together." />
        <figcaption>An imagined place for real possibilities.</figcaption>
      </figure>
    </header>
  );
}

export function HubInquiryInvitation() {
  return (
    <section className="hub-inquiry-invitation" aria-labelledby="hub-inquiry-title">
      <div>
        <p className="section-kicker">SOCIAL STUDIES · GLOBAL ISSUES &amp; GOVERNANCE</p>
        <h2 id="hub-inquiry-title">Two countries.<br />Shared questions.</h2>
        <p>How do choices in different places shape people’s lives and our shared world?</p>
        <a href="activities/better-world-journey.html">Explore A Better World</a>
      </div>
      <Image unoptimized src="/design/inquiry-landscape.webp" width={1568} height={1003} sizes="(max-width: 700px) 100vw, 50vw" alt="An imagined landscape connecting communities, public spaces, trade and the natural world." />
    </section>
  );
}
