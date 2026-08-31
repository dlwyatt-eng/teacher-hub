"use client";

type Resource = {
  label: string;
  authority: string;
  url: string;
  use: string;
  caution: string;
};

const localResources: Record<string, Resource[]> = {
  "semiahmoo-story-source-lab": [
    {
      label: "Chief Harley Chappell tells the Story of the Flood",
      authority: "SURREY SCHOOLS INDIGENOUS PEOPLES LEARNING · CHIEF HARLEY CHAPPELL",
      url: "https://surreyschoolsone.ca/indigenous/resource-post/?permalink=chief-harley-chappell-tells-the-story-of-the-flood-",
      use: "Listen through the district page. Keep its exact title, speaker, Semiahmoo context, source route, and access date attached to the response.",
      caution: "Do not assume that public access authorizes downloading, transcription, excerpting, retelling, reenactment, remix, or reposting; check current guidance first.",
    },
    {
      label: "Storytelling protocols and source collection",
      authority: "SURREY SCHOOLS INDIGENOUS PEOPLES LEARNING",
      url: "https://surreyschoolsone.ca/indigenous/resources/storytelling/",
      use: "Read the district protocol note before listening. It foregrounds permission and acknowledging the owner of a story.",
      caution: "This page provides protocol guidance; it is not blanket permission to reproduce every source in the collection.",
    },
  ],
  "place-soundwalk": [
    {
      label: "hən̓q̓əmin̓əm̓ language and Katzie history with Paula James",
      authority: "SURREY SCHOOLS · KATZIE VOICE",
      url: "https://surreyschoolsone.ca/indigenous/resource-post/?permalink=hnqminm-language-and-katzie-history-with-paula-james-part-2",
      use: "Listen for seasonal and weather words, pronunciation, place, and the speaker’s own framing before students make a sound or place response.",
      caution: "Link to the district video. Do not copy, clone, or detach language audio from its speaker and context.",
    },
    {
      label: "First Peoples’ Map of B.C.",
      authority: "FPCC · COMMUNITY-CONTRIBUTED",
      url: "https://maps.fpcc.ca/",
      use: "Locate Surrey and listen where contributed audio is available. Record the Nation, language, place, source, and one limit of the map.",
      caution: "Language regions are not property lines, and the map does not replace learning directly from the Nations represented.",
    },
  ],
  "map-what-maps-miss": [
    {
      label: "Maps of local territories and language groups",
      authority: "SURREY SCHOOLS INDIGENOUS LEARNING",
      url: "https://surreyschoolsone.ca/indigenous/resource-post/?permalink=maps-that-show-local-language-groups-and-territories",
      use: "Compare several district-curated local maps as sources with different purposes, labels, scales, and limitations.",
      caution: "Link to the source page rather than merging or redrawing Nation territories as one fixed boundary map.",
    },
    {
      label: "Local Nations resource collection",
      authority: "SURREY SCHOOLS INDIGENOUS LEARNING",
      url: "https://surreyschoolsone.ca/indigenous/resources/local-nations/",
      use: "Open the Katzie, Kwantlen, and Semiahmoo Nation sites from the district-curated collection before making a local place claim.",
      caution: "Name the specific Nation whose public information supports each claim; do not combine distinct Nations into one generic perspective.",
    },
  ],
  "four-arts-languages": [
    {
      label: "Our Grandmother the Inlet",
      authority: "SURREY SCHOOLS · TSLEIL-WAUTUTH FILM · CLASSROOM SCREENING RIGHTS",
      url: "https://surreyschoolsone.ca/indigenous/resource-post/?permalink=our-grandmother-the-inlet",
      use: "Co-directed by Kayah George (Tulalip and Tsleil-Waututh) and Jaime Leigh Gianopoulos, the film centres Kayah, her grandmother Ta7a, and their relationship to Burrard Inlet. Use the district’s clean classroom route as a visual and audio mentor text.",
      caution: "Keep the directors, featured family, Tsleil-Waututh Nation, and Burrard Inlet attached to the response. Do not imitate cultural designs, extract teachings as decoration, or repost the film.",
    },
  ],
  "graph-story-lab": [
    {
      label: "sc̓e:ɬxʷəy̓əm (Salmon River) restoration and care",
      authority: "RIVERSHED · NATION AND LAND-GUARDIAN COLLABORATION",
      url: "https://rivershed.com/foodlands/foodlands-corridor-restoration-program/salmon-river/",
      use: "Read the dated project snapshot below, compare quantities carefully, and identify what the public data can and cannot establish.",
      caution: "Keep the place name, shared territory, contributors, date, and project scope attached to every graph or claim.",
    },
    {
      label: "Math First Peoples teacher resource guide",
      authority: "FNESC · B.C. FIRST NATIONS EDUCATION",
      url: "https://www.fnesc.ca/math-first-peoples/",
      use: "Use FNESC’s guidance and supplied activities for respectful, place-aware mathematics, sampling, graphing, probability, water, and salmon contexts.",
      caution: "Follow the guide’s protocols and do not turn cultural knowledge into a decorative word problem.",
    },
  ],
};

function InfoFrame({ eyebrow, title, summary, children, source }: { eyebrow: string; title: string; summary: string; children: React.ReactNode; source?: React.ReactNode }) {
  return (
    <section className="lesson-infographic">
      <header><span>{eyebrow}</span><div><h3>{title}</h3><p>{summary}</p></div></header>
      {children}
      {source && <footer>{source}</footer>}
    </section>
  );
}

export function ExperienceInfographic({ experienceId }: { experienceId: string }) {
  if (experienceId === "pattern-forecast") return (
    <InfoFrame eyebrow="VISUAL THINKING PATH" title="One pattern, five connected views" summary="Every representation must describe the same growth. If one view disagrees, find and repair the mismatch.">
      <div className="info-flow info-pattern">
        <article><b>MODEL</b><div className="tile-stages" aria-label="Stage 1 has 5 tiles, stage 2 has 8 tiles, and stage 3 has 11 tiles">{[5, 8, 11].map((count, stage) => <span key={count}><em>S{stage + 1}</em>{Array.from({ length: count }, (_, tile) => <i key={tile}/>)}</span>)}</div></article><i>→</i>
        <article><b>TABLE</b><p><strong>n</strong> 1 · 2 · 3<br/><strong>tiles</strong> 5 · 8 · 11</p></article><i>→</i>
        <article><b>RULE</b><p className="info-big-rule">3n + 2</p><small>grow by 3<br/>start with 2</small></article><i>→</i>
        <article><b>GRAPH</b><div className="mini-graph"><span/><span/><span/></div><p>same rule</p></article><i>→</i>
        <article><b>FORECAST</b><p>n = 50<br/><strong>152 tiles</strong></p></article>
      </div>
    </InfoFrame>
  );
  if (experienceId === "equation-balance") return (
    <InfoFrame eyebrow="EQUALITY MODEL" title="Keep both sides true" summary="An equals sign means both expressions have the same value. Whatever changes on one side must also change on the other.">
      <div className="info-balance">
        <article><b>START</b><p>x + 4 = 11</p><span>Both sides balance.</span></article>
        <i>−4<br/>BOTH SIDES</i>
        <article><b>ISOLATE</b><p>x = 7</p><span>The unknown is alone.</span></article>
        <i>CHECK</i>
        <article><b>SUBSTITUTE</b><p>7 + 4 = 11</p><span>The original equation is true.</span></article>
      </div>
    </InfoFrame>
  );
  if (experienceId === "three-voices") return (
    <InfoFrame eyebrow="PERSPECTIVE IS NOT GUESSING" title="Three honest voices can select different details" summary="Use shared evidence plus each narrator’s known position and purpose. Leave unsupported thoughts in the unknown column.">
      <div className="info-perspectives">
        {["NEAR THE DOOR", "AT THE TABLE", "ACROSS THE ROOM"].map((view, index) => <article key={view}><span>{index + 1}</span><b>{view}</b><p><strong>VISIBLE:</strong> facts this person could notice</p><p><strong>INFERENCE:</strong> a careful conclusion from evidence</p><p><strong>UNKNOWN:</strong> thoughts or motives not supported</p></article>)}
      </div>
    </InfoFrame>
  );
  if (experienceId === "map-what-maps-miss") return (
    <InfoFrame eyebrow="MAPS ARE PURPOSEFUL SOURCES" title="Put three maps in conversation" summary="Do not merge them into one ‘perfect’ map. Compare what each source helps an audience notice and what still requires another voice.">
      <div className="info-map-compare">
        <article><b>STREET MAP</b><p>routes · addresses · facilities</p><small>May miss relationships, sound, memory, and history.</small></article>
        <article><b>PLANNING MAP</b><p>growth · proposals · public decisions</p><small>May show a future plan more clearly than present lived experience.</small></article>
        <article><b>FIRST PEOPLES’ MAP</b><p>languages · communities · place knowledge</p><small>Language regions are not fixed property boundaries and cannot replace Nation-specific learning.</small></article>
      </div>
      <div className="info-source-rule"><b>LABEL EACH LAYER:</b><span>SOURCED EVIDENCE</span><span>ARTISTIC INTERPRETATION</span><span>STILL UNKNOWN</span></div>
    </InfoFrame>
  );
  if (experienceId === "access-by-design") return (
    <InfoFrame eyebrow="ACCESS DESIGN" title="Keep the learning goal; reduce the barrier" summary="Equivalent access does not mean everyone must use the same route. Ask users, test the design, and revise from evidence.">
      <div className="info-access">
        <article><b>SAME GOAL</b><p>Explain how the system works using accurate evidence.</p></article><i>→</i>
        <article><b>POSSIBLE BARRIERS</b><p>tiny text · sound only · one control method · rushed response</p></article><i>→</i>
        <article><b>EQUIVALENT ROUTES</b><p>large labels · captions · keyboard/touch · audio/diagram/text</p></article><i>→</i>
        <article><b>SAME EVIDENCE</b><p>Accurate explanation and clear reasoning.</p></article>
      </div>
    </InfoFrame>
  );
  if (experienceId === "trusted-health-studio") return (
    <InfoFrame eyebrow="HEALTH INFORMATION CHECK" title="Confidence is not evidence" summary="Pause before using or sharing health advice. Sensitive questions can go privately to a trusted adult or health professional.">
      <div className="info-health-path">
        {["WHO MADE IT?", "WHAT EVIDENCE?", "WHAT IS ITS PURPOSE?", "DO TRUSTED SOURCES AGREE?", "WHAT IS THE SAFEST NEXT STEP?"].map((item, index) => <article key={item}><span>{index + 1}</span><b>{item}</b></article>)}
      </div>
      <p className="info-safety-note"><b>STOP AND GET HELP:</b> urgent symptoms, pressure or unsafe relationships, substance risk, or advice that says to hide information from trusted adults or health professionals.</p>
    </InfoFrame>
  );
  if (experienceId === "project-rescue-studio") return (
    <InfoFrame eyebrow="PROJECT RESCUE MAP" title="A deadline is not a plan" summary="Make the outcome, task order, shared roles, check-in points, and backup plan visible before the project becomes urgent.">
      <div className="info-project-timeline">
        <article><b>1 · FINISH LINE</b><p>What must be ready?</p></article><i>→</i><article><b>2 · TASK ORDER</b><p>What must happen first?</p></article><i>→</i><article><b>3 · CHECKPOINTS</b><p>What can we see and check?</p></article><i>→</i><article><b>4 · REVIEW</b><p>When will feedback cause a change?</p></article><i>→</i><article><b>5 · BACKUP PLAN</b><p>What if time, tools, or people change?</p></article>
      </div>
    </InfoFrame>
  );
  if (experienceId === "fraction-ratio-remix") return (
    <InfoFrame eyebrow="ONE BATCH · SAME BALANCE" title="Grow the amount without changing the ratio" summary="Every complete batch has 3 blue parts for every 2 gold parts. Doubling or tripling means every part grows together.">
      <div className="info-batch-model" aria-label="One batch has three blue parts and two gold parts; two batches have six blue and four gold; three batches have nine blue and six gold">
        {[1, 2, 3].map((batches) => <article key={batches}><small>{batches} {batches === 1 ? "BATCH" : "BATCHES"}</small><div>{Array.from({ length: 3 * batches }, (_, index) => <i className="blue" key={`b-${index}`} />)}{Array.from({ length: 2 * batches }, (_, index) => <i className="gold" key={`g-${index}`} />)}</div><strong>{3 * batches} : {2 * batches}</strong></article>)}
      </div>
      <div className="info-batch-check"><b>THE BALANCE STAYS:</b><span>3 : 2 = 6 : 4 = 9 : 6</span><p>If only one side changes, it is a different mixture—not an equivalent ratio.</p></div>
    </InfoFrame>
  );
  if (experienceId === "decimal-dispatch") return (
    <InfoFrame eyebrow="ESTIMATE BEFORE THE CALCULATOR" title="Catch the invoice that only looks exact" summary="A decimal answer can be neatly formatted and still be impossible. Put the answer in a sensible range before calculating.">
      <div className="info-invoice-check">
        <article><small>FICTIONAL ORDER</small><strong>8 art boards × $6.45</strong><p>Estimate: 8 × about $6.50</p></article>
        <i>→</i>
        <article><small>SENSIBLE RANGE</small><strong>$48 to $56</strong><p>The exact total must land nearby.</p></article>
        <i>→</i>
        <article className="warning"><small>INVOICE SAYS</small><strong>$516.00</strong><p>The decimal moved. Reject and repair it.</p></article>
        <i>→</i>
        <article className="verified"><small>EXACT CHECK</small><strong>$51.60</strong><p>8 × $6.45 = $51.60</p></article>
      </div>
    </InfoFrame>
  );
  if (experienceId === "probability-game-audit") return (
    <InfoFrame eyebrow="PREDICT · TEST · COMPARE" title="Short-run results can wobble" summary="Theoretical probability comes from the game design. Experimental probability comes from what actually happened in the trials.">
      <div className="info-probability-compare">
        <article><div className="info-spinner" role="img" aria-label="Spinner with four equal sections: two blue, one gold, and one green" /><strong>THE DESIGN</strong><p>Blue covers 2 of 4 equal sections.</p><b>P(blue) = 2/4 = 1/2</b></article>
        <article><strong>20 FICTIONAL TRIALS</strong><div className="trial-row" aria-label="Blue occurred 12 times and not blue occurred 8 times"><span style={{ width: "60%" }}>12 blue</span><i>8 other</i></div><b>Experimental P(blue) = 12/20</b><p>That is not exactly 1/2—and it does not prove the spinner is unfair.</p></article>
        <article><strong>THE HONEST CLAIM</strong><p>“The design predicts blue half the time in the long run. Our 20 trials gave blue 12 times. More trials would give stronger evidence.”</p></article>
      </div>
    </InfoFrame>
  );
  if (experienceId === "hook-cold-audience") return (
    <InfoFrame eyebrow="AUDIENCE TEST" title="Attention is the doorway—not the whole lesson" summary="A strong opening gets people curious and gives them enough context to understand what comes next.">
      <div className="info-hook-test">
        {["QUESTION", "TINY STORY", "STRONG IMAGE", "QUICK DEMO"].map((hook) => <article key={hook}><b>{hook}</b><p>Try the same idea in this form.</p></article>)}
      </div>
      <div className="info-audience-signals"><span><b>I UNDERSTOOD</b> the idea I am about to learn.</span><span><b>I GOT STUCK</b> at this exact point.</span><span><b>I NEED PROOF</b> for this claim.</span></div>
    </InfoFrame>
  );
  if (experienceId === "edit-room") return (
    <InfoFrame eyebrow="SAME FACTS · DIFFERENT EDIT" title="An edit can clarify the evidence—or quietly bend it" summary="These two fictional edits begin with the same five facts. Track what each version keeps, moves, labels, and leaves out before trusting its message.">
      <div className="info-edit-facts" aria-label="Five facts from one fictional school-yard event">
        {[
          "12:10 · the bell rings",
          "a crowd gathers by a garden cart",
          "one wheel is stuck",
          "two students lift the wheel free",
          "the path opens again",
        ].map((fact, index) => <span key={fact}><b>{index + 1}</b>{fact}</span>)}
      </div>
      <div className="info-edit-compare">
        <article className="supported"><small>EDIT A · KEEPS THE CAUSE</small><div><span>1</span><i>→</i><span>2</span><i>→</i><span>3</span><i>→</i><span>4</span><i>→</i><span>5</span></div><strong>“Students help reopen a blocked path.”</strong><p>The caption fits the visible sequence. It does not claim a motive.</p></article>
        <article className="unsupported"><small>EDIT B · HIDES THE CAUSE</small><div><span>2</span><i>→</i><span>1</span><i>→</i><span>4</span></div><strong>“Chaos erupts around the cart!”</strong><p>The stuck wheel and repaired path disappeared. The dramatic claim goes beyond the evidence.</p></article>
      </div>
      <p className="info-decision-rule"><b>EDITING RULE:</b> Crop, order, caption, and sound may guide attention. They may not invent evidence. Ask: <strong>What would I believe if I saw the missing part?</strong></p>
    </InfoFrame>
  );
  if (experienceId === "precision-poetry") return (
    <InfoFrame eyebrow="ACCURACY CAN STILL SOUND ALIVE" title="Build a science line without losing the science" summary="Move from verified meaning to image and sound. At the end, read the line like a scientist and a poet.">
      <div className="info-poetry-build">
        <article><small>1 · VERIFIED IDEA</small><strong>Water vapour cools and condenses into liquid droplets.</strong><p>Keep the change of state accurate.</p></article><i>→</i>
        <article><small>2 · WORD CABINET</small><div><span>vapour</span><span>cools</span><span>condenses</span><span>droplets</span><span>gather</span><span>bead</span></div><p>Mix exact terms with observable verbs.</p></article><i>→</i>
        <article className="poem-line"><small>3 · POETRY LINE</small><strong>Invisible vapour cools,<br/>then beads the glass with water.</strong><p>The image is vivid; the phase change is still true.</p></article>
      </div>
      <div className="info-poetry-check"><span><b>SCIENCE CHECK</b> Did the meaning stay accurate?</span><span><b>IMAGE CHECK</b> Can the audience picture or sense it?</span><span><b>SOUND CHECK</b> Does the line earn its rhythm and words?</span></div>
    </InfoFrame>
  );
  if (experienceId === "search-under-hood") return (
    <InfoFrame eyebrow="FICTIONAL SEARCH SCREEN" title="First result does not mean best evidence" summary="A search engine ranks matches. You still decide which source fits the real question, who made it, and what its evidence can support.">
      <div className="info-search-query"><small>VAGUE QUERY</small><code>hot yard</code><i>→</i><small>FOCUSED QUERY</small><code>school courtyard shade surface temperature study</code></div>
      <div className="info-search-results">
        <article><span className="rank">1</span><small>SPONSORED · FICTIONAL VENDOR</small><strong>CoolDeck Pro: the only answer you need!</strong><p>Purpose: sell a product. No method appears in the snippet.</p><b>Useful for price or product claims—not independent proof.</b></article>
        <article className="best-fit"><span className="rank">2</span><small>FICTIONAL CITY PLANNING OFFICE · 2025</small><strong>Courtyard shade pilot: methods and temperature table</strong><p>Creator, date, test method, and data are visible.</p><b>Best fit for the evidence question—after opening the full report.</b></article>
        <article><span className="rank">3</span><small>FICTIONAL PERSONAL BLOG · DATE UNKNOWN</small><strong>Our yard felt cooler after the change</strong><p>A useful experience, but no measurements or comparison are shown.</p><b>May add a perspective; cannot answer the data question alone.</b></article>
      </div>
      <p className="info-decision-rule"><b>TRACE THE CLAIM:</b> snippet → full page → original creator → date → method or evidence → limit. Ranking is a clue about the search system, not a quality score.</p>
    </InfoFrame>
  );
  if (experienceId === "bloxels-game-studio") return (
    <InfoFrame eyebrow="MINIMUM PLAYABLE STORY" title="A player should learn by playing—not by asking the designer" summary="Build one short loop that makes the role, goal, action, feedback, and story change visible. Test it silently before adding more levels or decoration.">
      <div className="info-game-loop">
        <article><small>START SCREEN</small><strong>You are the station scout.</strong><p>Goal: recover the star map.<br/>Move: arrows. Use: space.</p></article><i>→</i>
        <article><small>PLAYER ACTION</small><strong>Choose a route and reach the locked gate.</strong><p>The level asks for one understandable choice.</p></article><i>→</i>
        <article><small>VISIBLE FEEDBACK</small><strong>The safe route lights; the gate opens.</strong><p>The game shows why the action mattered.</p></article><i>→</i>
        <article><small>STORY CHANGE</small><strong>The map powers the station.</strong><p>The ending connects play to the story problem.</p></article>
      </div>
      <div className="info-playtest-repair"><span><b>SILENT TEST EVIDENCE</b> New player passes the door three times.</span><i>→</i><span><b>DESIGNER REVISION</b> Add a bright gate signal and move it into the player’s path.</span><i>→</i><span><b>RETEST</b> Watch a new player. Do not coach.</span></div>
    </InfoFrame>
  );
  if (experienceId === "everyone-in-game") return (
    <InfoFrame eyebrow="CHANGE ONE RULE · REPLAY · CHECK" title="Fair on paper is not always full participation" summary="Use anonymous group evidence to see whether a rule opens the play. This fictional two-round example tests access—not who is best.">
      <div className="info-participation-test">
        <article><small>ROUND 1 · 12 PLAYERS</small><div className="participation-dots" role="img" aria-label="Five of twelve players joined a ball action; seven mostly waited">{Array.from({ length: 12 }, (_, index) => <i className={index < 5 ? "active" : "waiting"} key={index}>{index < 5 ? "joined" : "waited"}</i>)}</div><strong>5 joined a ball action · 7 mostly waited</strong></article>
        <i>→</i>
        <article className="rule-change"><small>CHANGE ONE RULE</small><strong>A point counts after four different teammates touch the ball.</strong><p>Keep the space, equipment, and teams the same so the rule is the change being tested.</p></article>
        <i>→</i>
        <article><small>ROUND 2 · SAME 12 PLAYERS</small><div className="participation-dots" role="img" aria-label="Ten of twelve players joined a ball action; two mostly waited">{Array.from({ length: 12 }, (_, index) => <i className={index < 10 ? "active" : "waiting"} key={index}>{index < 10 ? "joined" : "waited"}</i>)}</div><strong>10 joined a ball action · 2 mostly waited</strong></article>
      </div>
      <p className="info-decision-rule"><b>HONEST CLAIM:</b> Participation improved in this trial. One round is not proof that the rule works for everyone; ask players, notice safety and enjoyment, and test again.</p>
    </InfoFrame>
  );
  if (experienceId === "effort-meter-trail") return (
    <InfoFrame eyebrow="PRIVATE BODY EVIDENCE" title="Adjust the activity—not your worth" summary="Effort is a personal check-in, not a leaderboard. The same activity can feel different for different people and on different days.">
      <div className="info-effort-scale" aria-label="A private effort scale from one to five">
        <article><b>1</b><strong>VERY EASY</strong><p>Full conversation feels comfortable.</p></article>
        <article><b>2</b><strong>EASY</strong><p>You could continue and talk easily.</p></article>
        <article className="target"><b>3</b><strong>MODERATE</strong><p>Short sentences still feel possible.</p></article>
        <article><b>4</b><strong>HARD</strong><p>Talking takes more effort.</p></article>
        <article><b>5</b><strong>VERY HARD</strong><p>A few words at a time may be enough.</p></article>
      </div>
      <div className="info-effort-adjust"><span><b>NOTICE</b> How does this feel today?</span><i>→</i><span><b>CHOOSE</b> Pace, rest, route, resistance, or movement option.</span><i>→</i><span><b>RECHECK</b> Did the change reach your safe purpose?</span><i>→</i><span><b>PLAN</b> Change one FITT detail next time.</span></div>
      <p className="info-decision-rule"><b>KEEP IT PRIVATE:</b> No public pulse, speed, body, or fitness ranking. Follow body signals, safety directions, and the choice route your teacher provides.</p>
    </InfoFrame>
  );
  if (experienceId === "learning-user-manual") return (
    <InfoFrame eyebrow="A CURRENT PROFILE · NOT A PERMANENT LABEL" title="Turn a real moment into a useful learning plan" summary="Start with something observable. Then name a strength-in-action, a helpful condition, your responsibility, and one checkable next step.">
      <div className="info-learning-path">
        <article><small>EVIDENCE</small><strong>“During our map task, I noticed two missing labels and checked the source names.”</strong></article><i>→</i>
        <article><small>STRENGTH IN ACTION</small><strong>Careful checking</strong><p>Not “I am the checker type.”</p></article><i>→</i>
        <article><small>HELPFUL CONDITION</small><strong>A short checklist and quiet review time</strong></article><i>→</i>
        <article><small>MY RESPONSIBILITY</small><strong>Ask before changing a partner’s work</strong></article><i>→</i>
        <article><small>NEXT STEP</small><strong>Use a 3-point source check on two tasks by Oct. 15.</strong></article>
      </div>
      <p className="info-decision-rule"><b>UPDATE THE MANUAL:</b> Strategies can change as the task, group, place, tools, and you change. Keep private details private.</p>
    </InfoFrame>
  );
  if (experienceId === "career-constellation") return (
    <InfoFrame eyebrow="ONE FAMILIAR PROJECT · MANY CONTRIBUTIONS" title="A school showcase is a network, not one hero job" summary="Look beyond the most visible role. Paid work, creative work, technical work, care, leadership, and volunteering can share transferable skills.">
      <div className="info-career-constellation">
        <strong className="constellation-centre">SCHOOL<br/>SHOWCASE</strong>
        <article><small>FACILITIES &amp; CARE</small><b>safe setup · access · cleanup</b><p>planning · noticing · care</p></article>
        <article><small>CREATORS &amp; PERFORMERS</small><b>make · rehearse · explain</b><p>communication · creativity · revision</p></article>
        <article><small>OFFICE &amp; ORGANIZING</small><b>schedule · contact · coordinate</b><p>organization · writing · teamwork</p></article>
        <article><small>TECHNICAL SUPPORT</small><b>sound · projection · troubleshoot</b><p>testing · systems thinking · calm repair</p></article>
        <article><small>USER &amp; ACCESS TESTERS</small><b>try routes · report barriers · suggest</b><p>observation · empathy · clear feedback</p></article>
        <article><small>COMMUNITY VOLUNTEERS</small><b>welcome · guide · support</b><p>service · flexibility · connection</p></article>
      </div>
      <p className="info-decision-rule"><b>FUTURES MOVE:</b> Pick one skill—not one forever job. Choose a low-risk next experience where you could practise it, ask a question, or help.</p>
    </InfoFrame>
  );
  if (experienceId === "rhythm-movement-lab") return (
    <InfoFrame eyebrow="TEN-COUNT MOVEMENT SCORE" title="A movement phrase is designed, not just remembered" summary="Level, direction, timing, balance, pathway, and transition make the pattern readable. The same score can use standing, seated, directing, or card-based movement.">
      <div className="info-movement-score">
        <article><b>1–2</b><strong>ROOT</strong><p>low level · hold · balanced</p></article><i>→</i>
        <article><b>3–4</b><strong>REACH</strong><p>high level · diagonal · smooth</p></article><i>→</i>
        <article><b>5</b><strong>TURN</strong><p>one quarter turn · controlled</p></article><i>→</i>
        <article><b>6–8</b><strong>TRAVEL</strong><p>side pathway · three even beats</p></article><i>→</i>
        <article><b>9–10</b><strong>LAND</strong><p>new shape · hold · balanced</p></article>
      </div>
      <div className="info-movement-options"><span><b>SAME DESIGN GOAL</b> Show level, direction, timing, and a clear transition.</span><span><b>VALID ROUTES</b> full-body · seated · hands/props · director cards · music or silence.</span><span><b>EXPLAIN</b> “I used ___ between counts ___ because ___.”</span></div>
    </InfoFrame>
  );
  if (experienceId === "audience-remix") return (
    <InfoFrame eyebrow="COLD TEST · OBSERVE BEFORE EXPLAINING" title="Audience evidence should cause a visible revision" summary="This fictional projector example tests whether the design helps viewers find the teaching point. It does not ask which version is prettiest.">
      <div className="info-audience-remix">
        <article><small>INTENTION</small><strong>After 45 seconds, viewers can point to the hottest courtyard zone and name one evidence-based change.</strong></article><i>→</i>
        <article className="before"><small>VERSION 1</small><strong>Large title + six equal-size charts</strong><p>Cold test: 4 of 5 viewers read the title; only 1 of 5 found the temperature comparison.</p></article><i>→</i>
        <article><small>REVISION</small><strong>Enlarge the temperature map and add a 1–2–3 viewing path.</strong><p>The evidence changes scale and visual order—not the facts.</p></article><i>→</i>
        <article className="after"><small>RETEST</small><strong>4 of 5 viewers find the comparison.</strong><p>Useful improvement in a tiny test; try another audience before claiming the design is solved.</p></article>
      </div>
    </InfoFrame>
  );
  if (experienceId === "metaphor-with-limits") return (
    <InfoFrame eyebrow="MODEL WITH A WARNING LABEL" title="A comparison can help—and still be incomplete" summary="First learn the accurate idea. Then use the comparison only where its parts truly match.">
      <div className="info-metaphor-limit">
        <article><small>ACCURATE IDEA</small><strong>The nervous system sends signals through connected cells.</strong></article><i>→</i>
        <article><small>HELPFUL COMPARISON</small><strong>It can act a little like a communication network.</strong></article><i>→</i>
        <article className="warning"><small>BREAKS HERE</small><strong>Living cells change, connect, and respond in ways ordinary wires do not.</strong></article>
      </div>
    </InfoFrame>
  );
  if (experienceId === "four-arts-languages") return (
    <InfoFrame eyebrow="FOUR WAYS TO SHAPE AN EXPERIENCE" title="Change the art language; change what the audience notices" summary="Image, sound, movement, and drama can carry the same idea differently. Combine them because each one has a job.">
      <div className="info-arts-languages">
        <article><span aria-hidden="true">◐</span><b>IMAGE</b><p>colour · line · scale · framing</p></article>
        <article><span aria-hidden="true">≈</span><b>SOUND</b><p>rhythm · silence · pitch · texture</p></article>
        <article><span aria-hidden="true">↗</span><b>MOVEMENT</b><p>path · level · speed · energy</p></article>
        <article><span aria-hidden="true">◫</span><b>DRAMA</b><p>role · tension · space · focus</p></article>
      </div>
    </InfoFrame>
  );
  return null;
}

export function LocalRestorationInfographic() {
  return (
    <InfoFrame
      eyebrow="LOCAL DATA SNAPSHOT · FALL 2025"
      title="Care along sc̓e:ɬxʷəy̓əm (Salmon River)"
      summary="The public project update describes work in the shared territory of the Kwantlen, Katzie, Semiahmoo, and Matsqui Nations, guided through collaboration that includes Kwantlen Land Guardians, səýeḿ Qwantlen, Knowledge Holders, and technical partners."
      source={<><span><b>SOURCE:</b> Rivershed Society of B.C. · fall 2025 project update</span><a href="https://rivershed.com/foodlands/foodlands-corridor-restoration-program/salmon-river/" target="_blank" rel="noreferrer">Open the full source and credits ↗</a></>}
    >
      <div className="restoration-numbers">
        <article><strong>7 of 12</strong><span>identified parcels restored or under active care</span></article>
        <article><strong>16,500+</strong><span>native plants in the ground</span></article>
        <article><strong>13,000+ m²</strong><span>restored natural area along the river</span></article>
        <article><strong>60 m</strong><span>of bank stabilized with nature-based solutions</span></article>
      </div>
      <div className="data-can-cannot"><p><b>THE DATA CAN SHOW:</b> the reported scale and kinds of restoration work at a stated date.</p><p><b>THE DATA CANNOT SHOW BY ITSELF:</b> full ecosystem recovery, every relationship to the place, or whether every long-term goal has been met.</p></div>
    </InfoFrame>
  );
}

export function ResponsibleDataInfographic() {
  return (
    <InfoFrame eyebrow="BEFORE GRAPHING COMMUNITY DATA" title="Who has authority over the information?" summary="OCAP® is a First Nations framework for data sovereignty. It is not a generic label for every Indigenous people.">
      <div className="ocap-grid">
        <article><b>OWNERSHIP</b><p>Whose collective information is this?</p></article>
        <article><b>CONTROL</b><p>Who decides the questions and how the work happens?</p></article>
        <article><b>ACCESS</b><p>Who can see and use the information?</p></article>
        <article><b>POSSESSION</b><p>Who physically keeps and protects the data?</p></article>
      </div>
      <p className="ocap-credit">OCAP® is a registered trademark of the First Nations Information Governance Centre (FNIGC). <a href="https://fnigc.ca/ocap-training/" target="_blank" rel="noreferrer">Learn from FNIGC ↗</a></p>
    </InfoFrame>
  );
}

export function LocalIndigenousResourceDock({ experienceId, student = false }: { experienceId: string; student?: boolean }) {
  const resources = localResources[experienceId];
  if (!resources?.length) return null;
  return (
    <section className="local-resource-dock">
      <header><span>LOCAL &amp; AUTHENTIC SOURCE ROUTES</span><div><h3>{student ? "Open the exact source your teacher chooses." : "Start with Surrey Schools, Nation-authored, or First Nations-led sources."}</h3><p>{student ? "Keep the speaker, Nation, place, and source attached to what you learn." : "A trusted link is permission to learn from the public source—not blanket permission to copy, remix, or republish its knowledge, maps, audio, stories, or art."}</p></div></header>
      <div>{resources.map(resource => <a key={resource.label} href={resource.url} target="_blank" rel="noreferrer"><span>{resource.authority}</span><strong>{resource.label}</strong><p>{resource.use}</p><small><b>USE WITH CARE:</b> {resource.caution}</small><i>OPEN SOURCE ↗</i></a>)}</div>
    </section>
  );
}
