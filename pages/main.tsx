import React from "react";
import ReactDOM from "react-dom/client";
import Home from "../app/page";
import "../app/globals.css";
import "../app/readability.css";
import "../app/public-window-bridge.css";
import "../app/recent-updates.css";
import "../app/home-supplements.css";
import "../app/unit-worlds.css";
import "../app/student-mission.css";
import "../app/weekly-plan.css";
import "../app/site-search.css";
import "../app/subject-alignment.css";
import "../app/classroom-audit.css";
import "../app/teacher-home-operations.css";

document.documentElement.style.setProperty("--font-geist-sans", "Inter, ui-sans-serif, system-ui, sans-serif");
document.documentElement.style.setProperty("--font-geist-mono", "ui-monospace, SFMono-Regular, Menlo, monospace");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><Home /></React.StrictMode>,
);
