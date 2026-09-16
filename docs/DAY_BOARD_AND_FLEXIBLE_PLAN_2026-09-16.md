# Flexible first-day plan and live day board

The default undated template is now `content/day-plans/first-full-day-flexible.json`. It adds supplies organization, chess and other shared games, optional Werewolf, and a vote between feasible DPA choices. The earlier `first-full-day.json` and browser revisions are preserved. The old projector link offers a link to the updated plan; explicit saved-plan selection still takes precedence.

Open `?view=Morning+Screen&mode=student&dayPlan=first-full-day-flexible`.

The existing Morning Screen route renders the new day board for saved day plans. Student instructions for supplies, games and DPA open in a native dialog with Back and Escape support. Teacher notes and reflection remain out of the projector renderer. Optional studentSteps fields survive validation, backup and import and can be edited in Day Plans.

The clock uses America/Vancouver regardless of the device timezone and refreshes each second. Weather uses the existing Surrey coordinates with Open-Meteo current model conditions in Celsius. It refreshes every 15 minutes while visible, resumes after reconnect, times out after eight seconds, and provides Retry. Timestamps distinguish older cached estimates; data older than three hours is hidden. Date/time are live even when an undated or archived plan is displayed. Weather source: https://open-meteo.com/en/docs.

Local verification: TypeScript, 185 tests, production build and artifact checks. Tests cover timezone/date boundaries, zero-degree readings, freezing rain, stale/future/malformed responses, archive compatibility, and exclusion of teacher notes from the projector. Live deployment and browser results are reported in the release conversation; classroom use is not claimed.

Live review after initial deployment: current Surrey temperature and conditions loaded; the clock advanced; supplies and DPA dialogs opened and returned correctly. The desktop projector review prompted a compact-layout adjustment for displays up to 1000px high so the complete sequence and shortcut footer fit more comfortably.
