import type { ReactNode } from "react";
import "./classroom-companions.css";

/**
 * Small, repo-native learning companions drawn from familiar B.C. wildlife.
 * The animals are visual wayfinding cues, not cultural symbols or stand-ins for
 * Indigenous teachings. Keep the learning move in text whenever a companion is
 * used; the illustration never carries meaning by itself.
 */
export type CompanionRole = "notice" | "question" | "build" | "connect" | "reflect";
export type CompanionDensity = "standard" | "compact" | "projector";
export type CompanionMotion = "once" | "idle" | "none";

export type CompanionGuide = {
  species: string;
  label: string;
  action: string;
  prompt: string;
  placement: string;
};

export const CLASSROOM_COMPANION_GUIDE: Record<CompanionRole, CompanionGuide> = {
  notice: {
    species: "Steller’s jay",
    label: "Notice + verify",
    action: "Gather evidence before making a claim.",
    prompt: "What do you notice? Which detail can you point to, and what remains uncertain?",
    placement: "Source cards, evidence checks, observations, and modelled noticing.",
  },
  question: {
    species: "Pacific tree frog",
    label: "Question + shift view",
    action: "Look again from another position.",
    prompt: "Whose position, purpose, or access changes what can be seen?",
    placement: "Perspective work, discussion prompts, misconceptions, and inquiry questions.",
  },
  build: {
    species: "North American beaver",
    label: "Build + revise",
    action: "Make, test, and improve with evidence.",
    prompt: "Make a first version. Test one part. What evidence should shape the next revision?",
    placement: "Worked models, drafts, design cycles, feedback, and revision checkpoints.",
  },
  connect: {
    species: "Pacific salmon",
    label: "Connect the system",
    action: "Trace relationships, flows, and effects.",
    prompt: "What moves between the parts? Where could one change create another effect?",
    placement: "Systems diagrams, cause and consequence, cross-curricular links, and synthesis.",
  },
  reflect: {
    species: "Great blue heron",
    label: "Pause + look back",
    action: "Name growth, uncertainty, and a next move.",
    prompt: "What changed in your thinking? What evidence matters now, and what will you try next?",
    placement: "Exit reflections, self-assessment, conferencing, and SpacesEDU handoffs.",
  },
};

// Canonical DOM-token order for data-companion-role attributes and trails.
const COMPANION_ROLE_DATA = {
  "data-companion-role": ["notice", "question", "build", "connect", "reflect"],
} as const;
const ROLE_ORDER: readonly CompanionRole[] = COMPANION_ROLE_DATA["data-companion-role"];

type CompanionArtworkProps = {
  role: CompanionRole;
};

function CompanionArtwork({ role }: CompanionArtworkProps) {
  if (role === "notice") return (
    <svg viewBox="0 0 220 150" focusable="false" aria-hidden="true">
      <path className="cc-art-bg" d="M0 113c32-16 58-16 88-4 26 10 52 10 76-1 22-10 40-9 56-1v43H0z" />
      <circle className="cc-art-soft" cx="176" cy="36" r="24" />
      <path className="cc-art-line cc-branch" d="M20 116c42-8 77-10 116-2 24 5 43 4 64-2" />
      <g className="cc-animal">
        <ellipse className="cc-art-accent" cx="112" cy="87" rx="39" ry="27" transform="rotate(8 112 87)" />
        <path className="cc-art-secondary" d="M118 69c18 7 25 22 16 39-9-5-23-8-39-7 4-17 10-26 23-32z" />
        <path className="cc-art-ink" d="M79 75c-2-12 2-23 13-28 11-5 24-2 31 7l-11 4-33 17z" />
        <path className="cc-art-ink" d="M86 50l7-20 7 17 9-15 1 21z" />
        <path className="cc-art-secondary" d="M74 61l-21 7 22 7z" />
        <circle className="cc-art-eye" cx="91" cy="57" r="3.5" />
        <path className="cc-art-line" d="M98 110l-4 12m22-10 1 11" />
        <path className="cc-art-ink" d="M143 92l39 28-48-12z" />
      </g>
      <g className="cc-cue cc-notice-rings">
        <circle cx="43" cy="96" r="5" />
        <circle cx="43" cy="96" r="13" />
      </g>
    </svg>
  );

  if (role === "question") return (
    <svg viewBox="0 0 220 150" focusable="false" aria-hidden="true">
      <path className="cc-art-bg" d="M0 115c33-8 63-5 91 6 31 12 74 10 129-7v36H0z" />
      <path className="cc-art-soft" d="M25 119c29-30 69-40 118-29-27 32-66 42-118 29z" />
      <path className="cc-art-line" d="M41 116c34-8 64-14 95-23" />
      <g className="cc-animal">
        <ellipse className="cc-art-accent" cx="111" cy="86" rx="31" ry="23" />
        <circle className="cc-art-accent" cx="95" cy="69" r="18" />
        <circle className="cc-art-ink" cx="88" cy="57" r="7" />
        <circle className="cc-art-ink" cx="105" cy="56" r="7" />
        <circle className="cc-art-eye" cx="88" cy="56" r="2.5" />
        <circle className="cc-art-eye" cx="105" cy="55" r="2.5" />
        <path className="cc-art-line" d="M84 91c-17 2-26 11-34 23m72-8c18 1 31 7 43 18m-72-22-13 18m39-20 16 17" />
        <path className="cc-art-secondary" d="M88 76c10 5 20 5 30 0-5 13-10 19-17 19-6 0-11-6-13-19z" />
      </g>
      <g className="cc-cue cc-ripples">
        <path d="M157 128c10-4 24-4 36 0" />
        <path d="M148 136c17-6 38-6 56 0" />
      </g>
    </svg>
  );

  if (role === "build") return (
    <svg viewBox="0 0 220 150" focusable="false" aria-hidden="true">
      <path className="cc-art-bg" d="M0 117c37-15 72-12 103 1 36 14 75 12 117-6v38H0z" />
      <g className="cc-logs">
        <path className="cc-art-soft" d="M28 112l76-22 5 16-76 22z" />
        <path className="cc-art-secondary" d="M39 128l75-24 5 15-75 25z" />
        <circle className="cc-art-line" cx="105" cy="98" r="8" />
      </g>
      <g className="cc-animal">
        <ellipse className="cc-art-accent" cx="135" cy="88" rx="40" ry="28" transform="rotate(-7 135 88)" />
        <circle className="cc-art-accent" cx="167" cy="76" r="22" />
        <circle className="cc-art-ink" cx="173" cy="70" r="3.5" />
        <ellipse className="cc-art-secondary" cx="185" cy="83" rx="14" ry="10" />
        <circle className="cc-art-ink" cx="197" cy="80" r="4" />
        <ellipse className="cc-art-ink" cx="98" cy="104" rx="27" ry="13" transform="rotate(-27 98 104)" />
        <path className="cc-art-line" d="M123 106l-6 17m34-17 4 16" />
        <path className="cc-art-eye" d="M181 89h5v8h-5z" />
      </g>
      <g className="cc-cue cc-build-marks">
        <path d="M24 79h23m-12-11v23" />
        <path d="M54 68l7 7 14-18" />
      </g>
    </svg>
  );

  if (role === "connect") return (
    <svg viewBox="0 0 220 150" focusable="false" aria-hidden="true">
      <path className="cc-art-bg" d="M0 42c44 14 72 14 108 1 35-12 70-12 112 5v102H0z" />
      <path className="cc-art-line cc-waterline" d="M5 64c27-10 51-10 73 0 26 12 54 11 81-1 22-10 40-9 56 0" />
      <path className="cc-art-line cc-waterline cc-waterline-two" d="M8 121c35-11 67-10 96 2 31 12 67 10 108-6" />
      <g className="cc-animal">
        <path className="cc-art-accent" d="M55 88c28-28 71-33 112-9-15 35-70 40-112 9z" />
        <path className="cc-art-secondary" d="M58 87L28 60l8 32-15 20 39-12z" />
        <path className="cc-art-ink" d="M162 80l34-13-12 21 9 18-32-10z" />
        <path className="cc-art-soft" d="M74 89c27-10 53-11 78-3-23 18-49 20-78 3z" />
        <circle className="cc-art-eye" cx="153" cy="82" r="3.5" />
        <path className="cc-art-line" d="M90 80c8 7 12 15 12 24m22-28c7 7 10 15 9 24" />
      </g>
      <g className="cc-cue cc-system-nodes">
        <circle cx="30" cy="39" r="5" />
        <circle cx="90" cy="27" r="5" />
        <circle cx="190" cy="37" r="5" />
        <path d="M35 38l50-10m10 0 90 8" />
      </g>
    </svg>
  );

  return (
    <svg viewBox="0 0 220 150" focusable="false" aria-hidden="true">
      <path className="cc-art-bg" d="M0 119c48-9 91-7 129 3 30 8 61 7 91-3v31H0z" />
      <circle className="cc-art-soft" cx="47" cy="45" r="27" />
      <path className="cc-art-line cc-waterline" d="M5 123c36-6 72-5 108 2 35 7 69 6 102-2" />
      <g className="cc-animal">
        <path className="cc-art-accent" d="M122 42c15 4 25 13 29 27-11 10-23 15-36 14-4-18-2-32 7-41z" />
        <path className="cc-art-ink" d="M126 44c-3-16 4-27 20-34-5 13-4 26 4 39z" />
        <path className="cc-art-accent" d="M119 70c-1 17 3 31 12 43l-13 2c-13-17-18-32-14-47z" />
        <path className="cc-art-secondary" d="M145 28l38 7-36 6z" />
        <circle className="cc-art-eye" cx="143" cy="28" r="3" />
        <path className="cc-art-line" d="M123 111l-4 25m11-25 10 23m-24 2h11m7-2h13" />
        <path className="cc-art-ink" d="M111 75c-8 13-15 24-22 32 14-4 25-11 34-21z" />
      </g>
      <g className="cc-cue cc-reflection-lines">
        <path d="M42 105h38m-28 9h47m38 17h37m-28 8h45" />
      </g>
    </svg>
  );
}

type CompanionMarkProps = {
  role: CompanionRole;
  size?: "small" | "standard" | "large";
  motion?: CompanionMotion;
  className?: string;
  decorative?: boolean;
  label?: string;
};

/** A square mark for headings, prompt chips, and proficiency-model labels. */
export function CompanionMark({
  role,
  size = "standard",
  motion = "none",
  className = "",
  decorative = true,
  label,
}: CompanionMarkProps) {
  const guide = CLASSROOM_COMPANION_GUIDE[role];
  return (
    <span
      className={`companion-mark companion-mark-${size} companion-role-${role} companion-motion-${motion} ${className}`.trim()}
      data-companion-role={role}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : (label ?? `${guide.species}: ${guide.label}`)}
    >
      <CompanionArtwork role={role} />
    </span>
  );
}

type ClassroomCompanionProps = {
  role: CompanionRole;
  title?: string;
  eyebrow?: string;
  prompt?: ReactNode;
  children?: ReactNode;
  density?: CompanionDensity;
  motion?: CompanionMotion;
  showSpecies?: boolean;
  className?: string;
};

/**
 * A complete, text-supported callout. Projector density enlarges the learning
 * move without fixing the card height; compact density fits a lesson edge.
 */
export function ClassroomCompanion({
  role,
  title,
  eyebrow,
  prompt,
  children,
  density = "standard",
  motion = "once",
  showSpecies = true,
  className = "",
}: ClassroomCompanionProps) {
  const guide = CLASSROOM_COMPANION_GUIDE[role];
  const body = children ?? prompt ?? guide.prompt;

  return (
    <aside
      className={`classroom-companion companion-role-${role} companion-density-${density} companion-motion-${motion} ${className}`.trim()}
      data-companion-role={role}
      aria-label={`${guide.label} learning companion`}
    >
      <div className="cc-illustration" aria-hidden="true"><CompanionArtwork role={role} /></div>
      <div className="cc-copy">
        <div className="cc-eyebrow">
          <span>{eyebrow ?? guide.label}</span>
          {showSpecies && <small>{guide.species}</small>}
        </div>
        <strong className="cc-title">{title ?? guide.action}</strong>
        <div className="cc-prompt">{body}</div>
      </div>
    </aside>
  );
}

type CompanionTrailProps = {
  activeRole?: CompanionRole;
  density?: "standard" | "compact" | "projector";
  motion?: CompanionMotion;
  title?: string;
  showPrompts?: boolean;
  className?: string;
};

/** A reusable five-move learning path for lesson launches and projector screens. */
export function CompanionTrail({
  activeRole,
  density = "standard",
  motion = "once",
  title = "A trail for thoughtful work",
  showPrompts = density !== "compact",
  className = "",
}: CompanionTrailProps) {
  return (
    <section
      className={`companion-trail companion-trail-${density} companion-motion-${motion} ${className}`.trim()}
      aria-label={title}
    >
      <header>
        <span>LEARNING MOVES</span>
        <strong>{title}</strong>
      </header>
      <ol>
        {ROLE_ORDER.map((role, index) => {
          const guide = CLASSROOM_COMPANION_GUIDE[role];
          return (
            <li key={role} className={`companion-role-${role}${activeRole === role ? " is-active" : ""}`} aria-current={activeRole === role ? "step" : undefined} data-companion-role={role}>
              <CompanionMark role={role} size={density === "projector" ? "large" : "standard"} motion="none" />
              <div>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <strong>{guide.label}</strong>
                {showPrompts && <span>{guide.action}</span>}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
