# Grade 6 Classroom OS — Teacher Hub

Private-planning interface and orchestration layer for the existing Grade 6 Classroom OS. The GitHub Pages artifact is built at `/teacher-hub/`; Student, Family, SpacesEDU, SchoolAI, Microsoft 365, and physical-classroom workflows remain separate systems.

## Local quality gate

Requires Node 22.13 or newer.

```bash
npm ci
npm test
```

`npm test` verifies the canonical/public learning window, TypeScript, content and asset integrity, a fresh Pages build, and the complete deployment artifact. `npm run dev` starts the same Vite entry used for Pages.

## Privacy boundary

Do not put student names, confidential learner information, attendance details, or protected operational records into this static site or its browser storage. Keep those records in district-approved systems. Repository and Pages access controls are hosting settings, not guarantees made by the interface label.
