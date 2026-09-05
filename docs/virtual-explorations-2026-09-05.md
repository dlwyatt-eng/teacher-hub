# Virtual explorations release · 5 September 2026

Eight guided visits are integrated into seven existing Grade 6 lessons. ISS and Mars are alternatives in one lesson. The Teacher Year Plan contains the flexible annual map; Learn / Learning contains optional revisits; Equity has standalone City Hall and animal-viewpoint adaptations.

## Lesson placement audit

| Window | Existing lesson | Gap addressed / replacement |
|---|---|---|
| November–December · optional earlier civic bridge | `civic-decision-brief` / Social Studies | Concrete institution encounter replaces a short source overview; retain other viewpoints and the civic case wall. |
| January–early February | `responses-under-pressure` / Social Studies | Prepared interview case supplies a real actor/action/evidence record at one response station. Video supplies optional place/context. |
| April–June | `cosmic-scale-gallery` / Arts Education | Specific credited creator and architectural features replace one opening mentor encounter; retain artist-response card and original making. |
| March–April | `precision-poetry` / English Language Arts | A real observation replaces the generic poetry stimulus; retain drafting and revision. |
| March | `balance-case` / Science | Animation replaces the overview source during kidney modelling; retain the cases and separate blood/urine routes. |
| June | `cosmic-exhibit-studio` / Science | One bounded source encounter helps focus the exhibit on a design relationship; retain source comparison and exhibit work. |
| June · alternative to ISS | `cosmic-exhibit-studio` / Science | Alternative to ISS: observed features vs inference helps focus one exhibit explanation. |
| May–June | `career-constellation` / Career Education | A real conservation workplace replaces one profile in the career investigation; retain two other profiles and skills/pathway work. |

Mathematics was inspected but received no tour: an architectural video alone does not provide reliable quantities or a scale. Existing mathematics repairs are preserved. ADST and PHE retain their current practical learning routes; no weak media placement was added to fill a subject quota.

## Resource register and access evidence

Canonical records: `content/virtual-explorations.json`. Each includes original source/direct launch links, media type, goal, stops, task, entry/extension, ready backup, teacher model, misconception, assessment, placement, logistics, source review and separate access limitations.

| Experience | Original / context | Format and access status |
|---|---|---|
| Who makes the decisions? | [City of Surrey](https://www.surrey.ca/city-government/city-hall/city-hall-tours) · [Launch](https://www.youtube.com/watch?v=yd8Ls6mLTW0) | Recorded civic tour; preview needed; direct YouTube route retained |
| Meet rainforest researchers | [National Geographic](https://blog.education.nationalgeographic.org/2022/04/12/this-earth-day-join-us-on-a-virtual-field-trip-to-the-amazon/) · [Launch](https://www.youtube.com/watch?v=LzAN4mHl5Pc) | Recorded field visits and interviews; preview needed; direct YouTube route retained |
| A building that borrows from nature | [Casa Batlló](https://www.casabatllo.es/en/360-video/) · [Launch](https://www.youtube.com/watch?v=fJ-fejHFiPI) | Produced 360° architectural experience; preview needed; direct YouTube route retained |
| Swim along with a sea turtle | [WWF-Australia](https://www.youtube.com/watch?v=2I6hDqCrI9o) · [Launch](https://www.youtube.com/watch?v=2I6hDqCrI9o) | Real turtle-mounted camera footage; preview needed; direct YouTube route retained |
| Travel inside a kidney | [TED-Ed · Emma Bryce](https://ed.ted.com/lessons/how-do-your-kidneys-work-emma-bryce) · [Launch](https://www.youtube.com/watch?v=FN3MFhYPWWo) | Scientific animation; preview needed; direct YouTube route retained |
| Make a home in orbit | [NASA Johnson](https://www.nasa.gov/international-space-station/suni-iss-tour/) · [Launch](https://www.youtube.com/watch?v=tBVUTFPate0) | Archival astronaut footage · 2012; preview needed; direct YouTube route retained |
| Stand on Mars with a rover | [NASA Jet Propulsion Laboratory](https://science.nasa.gov/resource/perseverances-360-degree-view-from-airey-hill/) · [Launch](https://www.youtube.com/watch?v=CIaHiGbFybQ) | Guided panorama · enhanced-colour rover images; preview needed; direct YouTube route retained |
| Meet the people protecting an island | [Hawaiʻi DLNR Forestry & Wildlife](https://dlnr.hawaii.gov/dofaw/education/virtual/) · [Launch](https://kuula.co/share/collection/7D6Lp?autorotate=0.14&fs=1&info=0&initload=0&logo=1&sd=1&thumbs=1&vr=1) | Interactive 360° photographs and interviews; open in original site |

No booking, private session, payment, sign-in or student upload has been created. These are flexible recorded/self-guided sources, not scheduled trips. No third-party video was downloaded or rehosted.

Surrey direct-video access is confirmed by Daryl. The assistant browser loaded the 17:02 player but media time did not advance. That is a limit of the available test, not a broken-video finding. The kidney watch page also loaded without observed sustained playback. Lehua loaded 14 stop thumbnails and a selected stop; its panorama remained blurred and complete hotspot rendering was not confirmed. All video embeds and school-network compatibility still need a successful playback check. Captions listed by metadata are recorded separately from observed caption playback.

Kidney uses the full 0:00–3:55 video; Mars 0:00–3:01. Their discussion stops are questions after viewing, not asserted internal timestamps. ISS suggested excerpts 0:36–2:25 and 3:05–4:40 come from YouTube automatic chapter markers and need teacher preview. Casa uses verified locations from the official illustrated interior guide; the optional produced video is not credited as Gaudí’s own imagery. Amazon’s prepared evidence card comes from a separate later article about July 2022 interviews, not from the April tour.

## Curriculum check

Current official Grade 6 pages checked on 5 September 2026: [Science](https://curriculum.gov.bc.ca/curriculum/science/6/core), [Social Studies](https://curriculum.gov.bc.ca/curriculum/social-studies/6/core), [English Language Arts](https://curriculum.gov.bc.ca/curriculum/english-language-arts/6/core), [Arts Education](https://curriculum.gov.bc.ca/curriculum/arts-education/6/core) and [Career Education](https://curriculum.gov.bc.ca/curriculum/career-education/6/core). Space visits support extreme environments and exploration; existing Canadian-contribution teaching remains necessary. Ecosystem detail is useful enrichment and does not replace Grade 6 science systems.

## Implementation and maintenance

- Teacher Hub owns `app/exploration-player.tsx`, its CSS and the register. Run `node scripts/sync-virtual-explorations.mjs` with sibling Learn and Equity checkouts present, then `--check` to confirm identical generated views. Commit and release all affected repositories. Each site still builds independently.
- Learn generation removes teacher records. Equity generation selects two relevant resources and adapts tasks to its own lessons. The shared renderer only renders teacher responses in teacher mode.
- Heavy media loads only on an explicit click during a stop; there is no autoplay. Closing the visit, switching destination or leaving viewing stops unmounts media. Direct originals remain available.
- A single space destination is mounted at a time. Learn mounts only the selected revisit. Student step labels and prompts stay near the source.
- Printable text/physical backups live outside collapsed disclosures so they remain in print markup. No new worksheet or required SpacesEDU post is added.
- Generic Arts/ELA/Career lesson links now use the existing subject navigation contract through the `experience` URL parameter. Browser history and session persistence preserve the choice.

## Release verification

The new content/SSR checks cover real lesson and scene targets, canonical URLs, teacher-answer separation, no eager media, one mounted space alternative and printable backups outside closed disclosures. Release checks passed: Teacher 120/120, Learn 13/13, Equity 22/22; TypeScript and static artifact validation passed for all three repositories. Local supported preview was healthy, but its browser route was blocked by the browsing environment; this does not constitute visual verification. Public-site checks are recorded after deployment. A successful software test does not establish media playback or classroom suitability.

## Before the first classroom use

Preview the selected excerpt on the school computer, including captions/audio and any navigation. If unavailable, choose Without video: every essential task can proceed from the prepared text or physical activity. No student needs an individual device or home access. Do not ask Daryl to reconfirm the already confirmed direct City Hall access.
