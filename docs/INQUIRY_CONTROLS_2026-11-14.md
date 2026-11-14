# Inquiry teaching controls — 14 November 2026

The existing four-scene opening now has named jump buttons (Map, Survey, Headlines, Our question), an accessible selected state, and left/right arrow navigation in projection mode. Escape returns focus to the projection toggle. Keyboard navigation leaves editing controls and modified keys alone and does not intercept arrow keys outside projection mode.

Changing scenes closes revealed model answers, so returning to a source does not silently show its answer to the class. A visible note explains this behavior. Content, teaching sequence, printable, curriculum scope and assignment expectations are unchanged. No storage, tracking or personal information was added. Jump controls and shortcut guidance are excluded from print; the existing print rule still shows all four scenes and hides models.

Verification: nine focused inquiry tests passed, including executed control behavior (clamping, scene selection, selection state, focus, model reset, keyboard and modifier/editing guards). TypeScript check passed. Local browser launch was attempted normally and through approved escalation, but Chromium failed before opening with `process_singleton socket() failed: Operation not permitted`. Desktop/mobile render, physical projector use and print-preview checks therefore remain unverified. This is a control enhancement, not a claim of a fully revalidated classroom sequence.

Full `npm test` passed: public-window checks, TypeScript, 346 tests, production build and emitted-asset validation. Build retains a chunk-size warning.

Follow-up live review found new HTML with the old launch script still cached: the new jump group remained hidden while the older projection button worked. Versioned launch CSS/JS URLs now keep those assets paired with this markup. The new script also tolerates earlier markup without the jump group, preventing errors in older cached pages. This is a cache-compatibility repair; live interaction is checked separately after deployment.
