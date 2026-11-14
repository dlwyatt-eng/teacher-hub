# Fractions: guided amounts beyond three wholes

Base: `2769e53`. Scope is the existing fraction explorer and its paper companion only.

The explorer could already build 11/3 and 3 2/5, but neither appeared in its guided question deck. Added named challenges that start at zero with the correct denominator, retain prediction-before-reveal, and work with the existing strip/number-line views. The reverse check now asks about fifths for 3 2/5, rather than a fixed thirds prompt. Switching questions clears old predictions, reveal and regroup states.

The paper companion retains its original questions and adds optional continuation with four actual equal strips divided into thirds and four into fifths. Students predict bounds, shade, regroup, rename and compare; teacher answers are not printed. No assignment, deadline, taught-content claim or family policy changes.

## Mathematical and curriculum review

11/3 = 3 2/3, and 3 2/5 = 17/5. Both fall between 3 and 4. Because the wholes stay equal, 2/3 > 2/5 and therefore 11/3 > 17/5. The existing 0–4 number line locates both exactly; regrouping must not move their points. This is Grade 6 improper-fraction/mixed-number work, with benchmark comparison and fraction strips as described in the [current BC curriculum](https://www.curriculum.gov.bc.ca/curriculum/mathematics/6/core), checked November 14.

## Verification

Full npm test passed: public-window consistency, TypeScript, 348 tests, production build and Pages artifact validation (117 emitted files and all copied assets). Added production-handler tests cover both new question choices, correct denominator/range, resetting reveal, reverse feedback, regrouping and reset. Paper tests verify actual strip and part counts and no printed answers.

Local Vite preview starts on 127.0.0.1:5175, but the supported cloud browser cannot reach that executor (ERR_CONNECTION_REFUSED). Fresh local visual, mobile, browser-print and physical classroom checks are not claimed. Live visual and deployment checks are recorded separately after publication. No family sync is needed for this math-only interface/companion refinement.
