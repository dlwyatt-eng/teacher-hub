import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./readability.css";
import "./unit2-mixtures.css";
import "./forces-audit.css";
import "./social-studies.css";
import "./social-unit1.css";
import "./social-unit2.css";
import "./social-unit3.css";
import "./social-unit4.css";
import "./surrey-election-2026.css";
import "./surrey-election-2026-activities.css";
import "./public-window-bridge.css";
import "./recent-updates.css";
import "./learning-program.css";
import "./readiness-launch.css";
import "./math-program.css";
import "./infographic-system.css";
import "./cross-curricular-projects.css";
import "./unit-worlds.css";
import "./student-mission.css";
import "./projector-lesson.css";
import "./projector-case-deck.css";
import "./teacher-run-sheet.css";
import "./ttoc-day-plan.css";
import "./weekly-plan.css";
import "./first-week-mission.css";
import "./current-connection.css";
import "./site-search.css";
import "./student-teacher-layer.css";
import "./student-agency-hub.css";
import "./ela-source-mosaic-lab.css";
import "./ela-edit-room-lab.css";
import "./four-arts-lab.css";
import "./math-pattern-lab.css";
import "./math-equation-lab.css";
import "./math-geometry-screen-lab.css";
import "./math-scoreboard-lab.css";
import "./math-number-scale-lab.css";
import "./science-mission-log.css";
import "./social-unit2-workbench.css";
import "./classroom-audit.css";
import "./teaching-os-map.css";
import "./teacher-now.css";
import "./ai-activity-studio.css";
import "./ai-tensions-lab.css";
import "./teacher-home-operations.css";
import "./monthly-calendar.css";
import "./visual-review-studio.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mr. Wyatt's Teacher Hub",
  description:
    "A private Grade 6 teacher workspace for lesson preparation, projection, assessment, and the BC curriculum.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
