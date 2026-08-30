"use client";

import { useId, useState, useSyncExternalStore } from "react";
import {
  clearDailyLaunch,
  getDailyLaunchServerSnapshot,
  getDailyLaunchSnapshot,
  setDailyLaunch,
  subscribeDailyLaunch,
  type DailyLaunch,
  vancouverDateKey,
} from "./daily-launch";
import { worldFor, worldStyle } from "./unit-worlds";
import "./student-home-portal.css";

export type StudentHomePortalProps = {
  featured: DailyLaunch;
  onOpenMission: (launch: DailyLaunch) => void;
  className?: string;
};

export function TeacherDailyLaunchButton({ launch }: { launch: DailyLaunch }) {
  const [message, setMessage] = useState("");

  const pinMission = () => {
    const saved = setDailyLaunch(launch);
    setMessage(saved
      ? `“${launch.title}” is now the mission students see first on this device.`
      : `“${launch.title}” is pinned for this open classroom session.`);
  };

  return (
    <div className="teacher-daily-launch-control">
      <button type="button" onClick={pinMission}>Set as today&apos;s mission</button>
      {message && <span role="status">{message}</span>}
    </div>
  );
}

export function TeacherDailyLaunchManager() {
  const pinned = useSyncExternalStore(
    subscribeDailyLaunch,
    getDailyLaunchSnapshot,
    getDailyLaunchServerSnapshot,
  );
  const activeDate = vancouverDateKey();
  const [year, month, day] = activeDate.split("-").map(Number);
  const activeDateLabel = new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Vancouver",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));

  return (
    <section className="teacher-daily-launch-manager" aria-label="Classroom screen mission">
      <div>
        <small>CLASSROOM SCREEN · {activeDateLabel.toUpperCase()}</small>
        <strong>{pinned?.title ?? `No lesson is pinned for ${activeDateLabel}`}</strong>
        <p>{pinned
          ? `${pinned.subject} · ${pinned.unit} · opens first today`
          : "Open a lesson and choose “Set as today’s mission.”"}</p>
      </div>
      {pinned && <button type="button" onClick={clearDailyLaunch}>Clear pinned mission</button>}
    </section>
  );
}

/**
 * The single, large return point for Student mode. A mission pinned on this
 * classroom device wins; otherwise the caller's featured mission is shown.
 */
export function StudentHomePortal({ featured, onOpenMission, className = "" }: StudentHomePortalProps) {
  const pinned = useSyncExternalStore(
    subscribeDailyLaunch,
    getDailyLaunchSnapshot,
    getDailyLaunchServerSnapshot,
  );
  const launch = pinned ?? featured;
  const theme = worldFor(launch.worldId);
  const titleId = useId();
  const questionId = useId();

  return (
    <section
      className={`student-home-portal world-family-${theme.family} ${className}`.trim()}
      data-world={theme.id}
      data-launch-source={pinned ? "today" : "featured"}
      style={worldStyle(theme)}
      aria-labelledby={titleId}
      aria-describedby={questionId}
    >
      <div className="student-home-portal-art" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <header className="student-home-portal-context">
        <strong>{pinned ? "TODAY'S MISSION" : "READY TO EXPLORE"}</strong>
        <span>{launch.subject} · {launch.unit}</span>
      </header>

      <div className="student-home-portal-copy">
        <p className="student-home-portal-world"><span aria-hidden="true">{theme.icon}</span>{theme.name}</p>
        <h1 id={titleId}>{launch.title}</h1>
        <p id={questionId} className="student-home-portal-question">{launch.question}</p>
      </div>

      <div className="student-home-portal-plan">
        <dl>
          <div>
            <dt>FIRST MOVE</dt>
            <dd>{launch.firstAction}</dd>
          </div>
          <div>
            <dt>FINISH WITH</dt>
            <dd>{launch.finish}</dd>
          </div>
        </dl>
        <button type="button" onClick={() => onOpenMission(launch)} aria-label={`Open mission: ${launch.title}`}>
          Open mission <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

export function StudentWorldAtlas({ launches, onOpenMission }: { launches: readonly DailyLaunch[]; onOpenMission: (launch: DailyLaunch) => void }) {
  return (
    <section className="student-world-atlas" aria-labelledby="student-world-atlas-title">
      <header>
        <div><small>MORE MISSIONS</small><h2 id="student-world-atlas-title">Choose another place to explore.</h2></div>
      </header>
      <div className="student-world-atlas-grid">
        {launches.map((launch) => {
          const theme = worldFor(launch.worldId);
          return <button key={`${launch.kind}-${theme.id}`} type="button" className={`world-family-${theme.family}`} data-world={theme.id} style={worldStyle(theme)} onClick={() => onOpenMission(launch)} aria-label={`Enter ${theme.name}: ${launch.title}`}>
            <span className="student-world-atlas-art" aria-hidden="true" />
            <span className="student-world-atlas-copy"><small>{launch.subject}</small><strong>{theme.name}</strong><em>{launch.title}</em></span>
            <b aria-hidden="true">→</b>
          </button>;
        })}
      </div>
    </section>
  );
}

export default StudentHomePortal;
