# Optional SchoolAI support and lesson usability

Baseline: local a66916751cac04d943a1d25bab235740fd95c91d and remote c39c0119d39f7af874ef7927bacd27fcfdad31f4 share tree 65dfc4d5a18e06a92aaa45bc319d074465e32099. Working tree was clean. Checkpoint branch: checkpoint-before-schoolai-navigation.

Changes:
- Shared TeacherRunSheet now exposes a compact optional SchoolAI panel with six reusable coaching purposes, teacher projection / partner / individual modes, lesson-specific question and product, copyable setup instructions, preview checks and an explicit setup-needed label. No student Space is created or claimed tested. SchoolAI's public setup destination resolves to its Discover route.
- Common learning-program teacher and projector routes gain previous / next and direct lesson selection. Scope is the common subject renderer; separate Science and Social Studies navigation is not broadly rewritten.
- Magnitude companion starts with discussion, worked number lines and a large-number example, followed by two comparison tasks. Blank paper organizers remain in collapsed optional printable details. Existing PDF remains available. Expected independent comparisons: 3,450,000,000 (ten millions); 870,009,000 (ten millions).
- SpacesEDU remains the submission/reporting route. No migration, exports, additional tracking system or student data processing.

Verification scope:
- Existing magnitude render test updated to verify no blank response spaces in the default screen portion and three equal-interval blank scales in the optional printable portion.
- Full existing test suite, TypeScript, production build and artifact checks are the automated gate.
- Local cloud-browser preview returned ERR_BLOCKED_BY_CLIENT; live verification follows publication. Physical printing, school-projector readability, all-subject rehearsal and actual SchoolAI conversation quality remain separate classroom checks.
- Teacher setup panel and lesson navigation are excluded from print via CSS. No new teacher answers are added to student routes. Prompts receive the public lesson question and product, not an answer key.
