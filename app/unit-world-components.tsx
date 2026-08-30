"use client";

import type { CSSProperties, ReactNode } from "react";
import { studentWorldCall, type UnitWorldTheme, worldSpectrumLabel, worldStyle } from "./unit-worlds";

type WorldPortalProps = {
  theme: UnitWorldTheme;
  eyebrow?: string;
  compact?: boolean;
  audience?: "student" | "teacher";
};

export function WorldPortal({ theme, eyebrow = "UNIT WORLD", compact = false, audience = "teacher" }: WorldPortalProps) {
  return (
    <section className={`world-portal world-family-${theme.family} ${compact ? "compact" : ""}`} style={worldStyle(theme)} aria-label={`${theme.name}: ${theme.environment}`}>
      <div className="world-portal-art" aria-hidden="true">
        <span className="world-sun" />
        <span className="world-ridge ridge-one" />
        <span className="world-ridge ridge-two" />
        <span className="world-path" />
        <i className="world-spark spark-one" />
        <i className="world-spark spark-two" />
        <i className="world-spark spark-three" />
      </div>
      <div className="world-portal-copy">
        <small>{audience === "student" ? "ENTER THIS WORLD" : `${eyebrow} · ${worldSpectrumLabel(theme)}`}</small>
        <strong><span>{theme.icon}</span>{theme.name}</strong>
        {!compact && <p>{audience === "student" ? studentWorldCall(theme) : theme.environment}</p>}
      </div>
      <div className="world-portal-route"><span>{theme.entry}</span><b>→</b><span>{theme.destination}</span></div>
    </section>
  );
}

export function WorldAtlasIntroduction({ children }: { children?: ReactNode }) {
  return (
    <section className="world-atlas-intro">
      <div>
        <p className="section-kicker">ONE CLASSROOM OS · MANY LEARNING WORLDS</p>
        <h2>A world atlas of learning</h2>
        <p>The landscape changes to match the emotional and conceptual character of the unit. Home, lesson flow, vocabulary, discussion, Try It work, evidence, inquiry, current location, and SpacesEDU remain familiar.</p>
      </div>
      <div className="world-spectrum" aria-label="Range of unit environments">
        {["Natural", "Fantastical", "Historical", "Artistic", "Architectural", "Scientific", "Technological", "Cosmic"].map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>)}
      </div>
      {children}
    </section>
  );
}

type JourneyStop = {
  id: string;
  title: string;
  label?: string;
};

export function WorldJourney({ theme, stops, activeId, onSelect, audience = "student" }: { theme: UnitWorldTheme; stops: JourneyStop[]; activeId?: string; onSelect?: (id: string) => void; audience?: "student" | "teacher" }) {
  const activeIndex = stops.findIndex((stop) => stop.id === activeId);
  const routeCount = stops.length + 1;
  return (
    <section className={`world-journey world-family-${theme.family} world-audience-${audience}`} style={{ ...worldStyle(theme), "--world-route-count": routeCount, "--world-route-min-width": `${Math.max(routeCount * 172, 520)}px` } as CSSProperties}>
      <header>
        <div><small>{audience === "student" ? `UNIT MAP · ${stops.length} PLACES` : `${worldSpectrumLabel(theme)} · ROUTE MAP · ${stops.length} LANDMARKS`}</small><h2>{theme.name}</h2><p>{audience === "student" ? studentWorldCall(theme) : theme.metaphor}</p></div>
        <span>{activeIndex >= 0 ? `YOU ARE AT ${activeIndex + 1}` : "LOOK AHEAD"}</span>
      </header>
      <div className="world-journey-landscape" role="group" aria-label={`${theme.name} route map. Selection does not indicate completion.`}>
        <div className="world-journey-atmosphere" aria-hidden="true"><span /><span /><span /><i /><i /><i /></div>
        <div className="world-journey-route" aria-hidden="true" />
        <ol>
          {stops.map((stop, index) => {
            const isActive = index === activeIndex;
            const content = <><b>{index + 1}</b><span><small>{stop.label ?? `LANDMARK ${index + 1}`}</small><strong>{stop.title}</strong></span></>;
            return <li key={stop.id} className={isActive ? "active" : ""}>{onSelect ? <button onClick={() => onSelect(stop.id)} aria-current={isActive ? "location" : undefined}>{content}</button> : <div aria-current={isActive ? "location" : undefined}>{content}</div>}</li>;
          })}
          <li className="world-destination"><div><b>{theme.icon}</b><span><small>DESTINATION</small><strong>{theme.destination}</strong></span></div></li>
        </ol>
      </div>
      <footer><span>BEGIN · {theme.entry}</span><strong>{audience === "student" ? `Choose the place your teacher names. Your destination is ${theme.destination}.` : theme.environment}</strong>{theme.careNote && <p><b>{audience === "student" ? "Use sources with care:" : "Source care:"}</b> {theme.careNote}</p>}</footer>
    </section>
  );
}

export function WorldContextBand({ theme, teacher = false }: { theme: UnitWorldTheme; teacher?: boolean }) {
  return (
    <aside className="world-context-band" style={worldStyle(theme)}>
      <span>{theme.icon}</span>
      <div><small>{teacher ? "UNIT WORLD · TEACHER ORIENTATION" : "YOU ARE HERE"}</small><strong>{theme.name}</strong><p>{teacher ? theme.metaphor : studentWorldCall(theme)}</p>{teacher && theme.careNote && <p className="world-context-care"><b>Source care:</b> {theme.careNote}</p>}</div>
      <b>{theme.entry} → {theme.destination}</b>
    </aside>
  );
}
