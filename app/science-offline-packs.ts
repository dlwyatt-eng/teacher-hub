export type ScienceOfflinePack = {
  title: string;
  directions: string;
  sections: Array<{
    heading: string;
    prompts: string[];
  }>;
};

const packs = {
  "science-launch": {
    title: "The evidence challenge · offline investigation pack",
    directions: "Complete every section. Use a real paper-airplane test only in a clear, teacher-approved flight lane; use the supplied evidence table when a flight test cannot run. Diagnose the fictional unfair setup on paper—do not reenact unsafe throws, climb on furniture, or launch toward people.",
    sections: [
      {
        heading: "1 · Predict, then make the comparison fair",
        prompts: [
          "Prediction: Which design—Dart (narrow wings, pointed nose), Glider (wide wings, blunt nose), or Stunt (short wings, lifted tips)—will have the greatest typical distance? Name one visible feature as your reason.",
          "Paper-only unfair setup: the Dart receives a hard throw, the Glider receives a gentle throw and a head start, the Stunt receives a medium throw, and each design flies only once. Identify the three comparison problems; do not reenact this setup.",
          "Write five shared rules: same launcher and launch motion, same start line, same measuring method and space, same paper conditions, and three or more trials per design.",
        ],
      },
      {
        heading: "2 · Evidence set when flights cannot run",
        prompts: [
          "Distances in metres — Dart: 8.4, 4.2, 5.1 (mean 5.9). Glider: 6.2, 6.5, 6.3 (mean 6.3). Stunt: 4.9, 5.2, 5.0 (mean 5.0).",
          "For each design, circle the longest result, underline the mean, and describe consistency using the spread between the greatest and least result.",
          "The Dart's 8.4 m first flight is spectacular. Explain why that single result is not enough to name the Dart the strongest design.",
        ],
      },
      {
        heading: "3 · Conclude and focus a new question",
        prompts: [
          "Claim: The Glider has the strongest evidence in this test. Defend or revise that claim using its mean and consistency, then name one limitation of this small data set.",
          "Write a focused question in this form: How does changing ___ affect ___ when ___ stays the same?",
          "Name the changed variable, measured variable, and at least two controls. Add one next test that would make the conclusion more trustworthy.",
        ],
      },
    ],
  },

  "signal-case": {
    title: "Reaction-time investigation · offline evidence pack",
    directions: "Work with a partner and a 30 cm ruler, or analyze the anonymous fallback data. Never rank classmates; the investigation studies variation and method, not who is ‘fastest.’ Hold and drop the ruler only as modelled—never swing, strike, throw, or use it near a face.",
    sections: [
      {
        heading: "1 · Safe fair-test method",
        prompts: [
          "Partner A holds the ruler vertically with 0 cm level with Partner B's open thumb and finger. Partner A releases without warning; Partner B catches without moving the hand upward. Read the catch distance and rotate roles. Stop immediately if the ruler is swung, struck, thrown, or moved near a face.",
          "Choose one safe comparison only: quiet/talking, first five/last five, or dominant/non-dominant hand. Keep ruler position, release method, body position, number of trials, and reader consistent.",
          "Record at least five distances per condition. Approximate conversion: 5 cm ≈ 0.10 s; 10 cm ≈ 0.14 s; 15 cm ≈ 0.17 s; 20 cm ≈ 0.20 s; 25 cm ≈ 0.23 s; 30 cm ≈ 0.25 s.",
        ],
      },
      {
        heading: "2 · Anonymous fallback data",
        prompts: [
          "Condition Q (quiet), catch distance in cm: 13, 15, 12, 14, 16. Mean = 14.0 cm; median = 14 cm.",
          "Condition T (talking), catch distance in cm: 18, 21, 17, 20, 19. Mean = 19.0 cm; median = 19 cm. A greater catch distance represents a longer response time.",
          "Write one pattern and one cautious claim. Limitation: the conditions were tested in a fixed order with one fictional participant, so practice, fatigue, or anticipation could also affect the difference.",
        ],
      },
      {
        heading: "3 · Build the pathway",
        prompts: [
          "Arrange and connect: falling ruler/light change → receptors in the eye → sensory nerve message → brain/spinal-cord processing → motor nerve message → finger muscles close.",
          "For every arrow, add a verb such as detects, carries, processes, sends, or contracts. State that this measures a response, not a simple automatic reflex.",
          "Finish with claim–evidence–reasoning, one source of measurement error, one model limitation, and one useful next test. Use only anonymous group or supplied data in any portfolio post.",
        ],
      },
    ],
  },

  "balance-case": {
    title: "Case file: too hot, too thirsty · offline pack",
    directions: "Analyze this fictional model case only. Do not test dehydration, restrict water, compare urine, collect body fluids, or use the case to diagnose a person.",
    sections: [
      {
        heading: "1 · Fictional hot-practice timeline",
        prompts: [
          "3:10 · Practice begins — shade temperature 30 °C; water bottle full; urine earlier was pale yellow.",
          "3:25 · Body heat rises — skin feels warmer; sweating begins; heart rate rises with activity.",
          "3:45 · Water loss continues — bottle half empty; strong thirst; less saliva; sweat continues.",
          "5:30 · After practice — body cools; thirst remains; later urine amount is smaller and colour is darker.",
          "Record three details the case directly shows. Sketch likely trends for body heat, thirst, sweating, and urine concentration; label which marks are case evidence and which are modelled predictions.",
        ],
      },
      {
        heading: "2 · Kidney and message source capsule",
        prompts: [
          "Teacher-authored synthesis of NIDDK and medically reviewed KidsHealth material: kidneys filter blood, return needed water and dissolved materials, help balance water and salts, and remove wastes and excess water as urine. Ureters carry urine to the bladder; the bladder stores it; the urethra releases it.",
          "Hormones are chemical messages carried in blood. Nervous signals can act quickly; hormonal messages can coordinate longer-lasting adjustments. No single system works alone.",
          "Decision 1 · Hot practice, little water: water is being lost in sweat and intake is low. Supported response: return more water to blood and make less, more concentrated urine.",
          "Decision 2 · Cool day, plenty of water: intake is high and sweating is low. Supported response: remove more extra water; urine can be more dilute.",
          "Decision 3 · Waste made by cells: normal cell activity adds dissolved wastes to blood. Supported response: filter blood, return needed materials, and send wastes toward urine—not from the stomach directly to the bladder.",
        ],
      },
      {
        heading: "3 · Feedback loop and limit",
        prompts: [
          "Build five arrows: change in heat/water → receptor or signal → coordinated nervous/hormonal/excretory response → effect → movement toward a useful range.",
          "Apply the same pattern to the safe hypothetical case ‘moving from active play into shade with water available.’",
          "Explain why homeostasis means active adjustment, not ‘nothing changes.’ Add one thing the classroom model leaves out.",
        ],
      },
    ],
  },

  "systems-jigsaw": {
    title: "Four systems, one body · offline expert pack",
    directions: "Assign one expert brief per team. Experts complete all five fields, teach for three minutes, then mixed groups complete the comparison and source-integrity transfer.",
    sections: [
      {
        heading: "1 · Nervous and hormonal expert briefs",
        prompts: [
          "NERVOUS — Job: detect change, process information, and coordinate responses. Route: stimulus → receptor → sensory nerves → brain/spinal cord → motor nerves → responding structure. What moves: fast electrical/chemical signals. Connection: can help trigger hormonal or muscle responses. Limit: the route model leaves out many parallel signals and brain processes.",
          "HORMONAL — Job: coordinate growth, metabolism, reproduction, stress responses, and other longer patterns. Route: gland → hormone enters blood → target cells with matching receptors → response. What moves: chemical messages in blood. Connection: the nervous system can influence hormone release. Limit: one-arrow diagrams hide feedback and different response times.",
          "For the assigned brief, convert the facts into a route model with arrows, one prediction, one check question, and one connection to another system.",
        ],
      },
      {
        heading: "2 · Excretory and reproductive expert briefs",
        prompts: [
          "EXCRETORY — Job: filter blood, regulate water and dissolved materials, and remove wastes. Route: blood → kidneys → urine → ureters → bladder → urethra. What moves: blood, returned water/materials, and urine. Connection: hormones influence water balance. Limit: this system-level route does not show nephron detail.",
          "REPRODUCTIVE — Job: produce reproductive cells and hormones and, in some structures, support fertilization and development. Route: use only the district-approved diagram and terms supplied by the teacher. What moves or changes: cells, hormones, and developing tissues. Connection: hormonal messages coordinate puberty and reproductive function. Limit: anatomy models do not determine identity, family role, or one fixed development timeline.",
          "For the assigned brief, convert the facts into a route model with arrows, one prediction, one check question, and one connection to another system. Personal disclosure is never required.",
        ],
      },
      {
        heading: "3 · Mixed-group note catcher",
        prompts: [
          "For each system record: main job; three important structures; what information or matter moves; one cross-system connection; one limitation.",
          "Complete three chains using this frame: when ___ changes, the ___ system sends or moves ___, so the ___ system can ___.",
          "Choose the strongest chain. Label every arrow with a verb and identify one piece of evidence needed to test or strengthen it.",
        ],
      },
      {
        heading: "4 · FNESC/FNSA transfer integrity card",
        prompts: [
          "Named source: FNESC/FNSA, Science First Peoples Teacher Resource Guide (Grades 5–9), ‘Bears and Body Systems’ materials. Use only the exact teacher-selected ‘Inside a Bear,’ ‘Inside a Human,’ and comparison material supplied with its attribution.",
          "Record one bear–human structure–function relationship supported by that selected material, then quote or paraphrase the exact evidence and name the page/card. State one thing the source does not establish.",
          "If the selected FNESC/FNSA material is not present, stop this transfer section. Do not invent a comparison or a generic claim about First Peoples; complete another cross-system case and return when the named source is available.",
        ],
      },
    ],
  },

  "life-systems-studio": {
    title: "Reproduction and development studio · private offline pack",
    directions: "Use this after a teacher-guided lesson with district-approved diagrams. Complete every section privately or with an approved partner. No personal body, identity, family, or development disclosure is required.",
    sections: [
      {
        heading: "1 · Evidence cases",
        prompts: [
          "Case A · cell evidence: a single large reproductive cell contains stored materials and can join with a sperm cell. Choose Egg cell / Hormone / Uterus and justify with the reproductive-cell clue.",
          "Case B · cell evidence: a small mobile reproductive cell carries genetic information and can join with an egg cell. Choose Embryo / Sperm cell / Ovary and cite both clues.",
          "Case C · organ evidence: this organ can release egg cells and produces hormones involved in reproductive processes. Choose Testis / Uterus / Ovary; use ‘ovary’ for one and ‘ovaries’ for more than one.",
          "Case D · organ evidence: this organ can produce sperm cells and hormones; two are called testes. Choose Testis / Uterus / Egg cell and justify both functions.",
          "Case E · development evidence: after implantation, this muscular organ can support development of an embryo and fetus. Choose Ovary / Uterus / Bladder; do not imply that every fertilized cell implants or develops.",
          "Case F · message evidence: these chemical messages travel through the body and help coordinate growth, puberty, and reproductive processes. Choose Hormones / Gametes / Nerves and explain why the evidence supports hormones.",
        ],
      },
      {
        heading: "2 · Teacher-authored source capsules",
        prompts: [
          "Hormones capsule — Synthesis of medically reviewed Nemours KidsHealth material: glands release hormones, which travel in blood and act on target cells. Hormonal messages help coordinate growth, puberty, reproduction, metabolism, and other processes; effects and timing vary.",
          "Variation capsule — Synthesis of HealthLinkBC guidance for ages 11–14: puberty includes common patterns, but its starting age, pace, order, and visible changes vary. A range of variation is expected; a class activity cannot diagnose an individual.",
          "Audit all four live claims: ‘Ovaries can produce egg cells and hormones’; ‘Reproductive body parts tell us personality and interests’; ‘Everyone begins and finishes puberty at the same age’; ‘A diagram shows every detail of human reproduction.’ Label each accurate function, unsupported claim, overgeneralization, or model-with-limits, then repair the three weak statements.",
        ],
      },
      {
        heading: "3 · Simplified sequence and model warnings",
        prompts: [
          "Arrange the five live cards: egg and sperm cells are produced → an egg cell and sperm cell may join in fertilization → the fertilized cell begins dividing → an embryo may implant in the lining of the uterus → development continues through embryo and fetal stages.",
          "Select the three supported warnings: the cards compress months into five steps; the model omits scale and most intermediate changes; ‘may’ matters because not every cell or fertilization leads to implantation or birth. Reject the claim that the sequence explains every person's identity or family story.",
          "Private exit: use one source-supported fact to explain one structure, cell, process, or variation accurately. Submit without a name if the teacher directs; keep it in class rather than posting personal learning publicly.",
        ],
      },
    ],
  },

  "body-case-conference": {
    title: "Body systems case conference · fictional offline cases",
    directions: "Assign one fictional case per team. Use case evidence only—never substitute a student's medical or personal information. Build, defend, and visibly revise a multi-system model.",
    sections: [
      {
        heading: "1 · Choose one fictional case",
        prompts: [
          "CASE A · Hot tournament — Evidence: air temperature is high; sweating and thirst rise; later urine is smaller in amount and darker. Supported systems: nervous, hormonal, and excretory. Limit: the case cannot diagnose dehydration severity or predict one person's exact response.",
          "CASE B · Starting signal — Evidence: eyes detect a light change; a hand responds in about 250 ms; repeated times vary. Supported systems: nervous and muscular. Limit: the timer does not measure intelligence, athletic ability, or a simple reflex.",
          "CASE C · Growth and sleep changes — Evidence: growth occurs over months; sleep timing shifts; puberty timing differs among people. Supported systems: hormonal, nervous, and reproductive. Limit: the case cannot predict a person's exact development or identity.",
          "CASE D · Long bus ride — Evidence: water intake is high; activity and sweating are low; a bathroom stop is needed later. Supported systems: hormonal, excretory, and nervous. Limit: the case leaves out medicines, health conditions, temperature, and individual variation.",
        ],
      },
      {
        heading: "2 · Evidence bank",
        prompts: [
          "Nervous evidence: receptors detect a change; sensory messages travel to the brain/spinal cord; motor messages can produce a rapid response.",
          "Hormonal evidence: glands release chemical messages into blood; target cells respond; effects can be slower or longer-lasting than a rapid nerve signal.",
          "Excretory evidence: kidneys filter blood, return needed water/materials, and remove wastes; hormones can influence water conservation.",
          "Reproductive evidence: structures can produce reproductive cells and hormones; puberty timing and sequence vary and cannot establish identity or predict an exact individual pathway.",
          "Muscular evidence: motor nerve messages can cause muscles to contract and move a hand; this does not by itself require a hormonal explanation.",
        ],
      },
      {
        heading: "3 · Model, defend, revise",
        prompts: [
          "Separate the three supplied observations from assumptions. Select at least two systems and explain which case clue requires each one; remove any system the evidence does not require.",
          "Build five to eight arrows: case evidence → system structure → what moves or changes → response → effect. Put a verb on every arrow and add one ‘missing information’ marker.",
          "Teach for two minutes. Record one evidence-focused peer question, then show a visible before/after revision to the weakest arrow, evidence note, or limitation.",
          "Individual finish: explain the case in five arrows and state one conclusion the model cannot support. Keep fictional case work local unless the teacher selects it for later reuse.",
        ],
      },
    ],
  },

  "mixture-mystery": {
    title: "The mystery mixture · offline evidence pack",
    directions: "Use a sealed teacher sample or reveal the evidence cards in order. Do not taste any sample or use unknown materials. Use a bagged magnet and wash hands after the investigation.",
    sections: [
      {
        heading: "1 · Reveal the mystery one card at a time",
        prompts: [
          "Opening jar: visible water contains floating cork pieces, dull silver pieces, large irregular gravel, and fine sand; dissolved salt may be present even when it cannot be seen. Sort: ‘Some pieces are much larger’ as observation; ‘dark pieces must be steel’ as inference; ‘some light pieces float’ as observation; ‘there is dissolved salt’ as inference until tested.",
          "Sample D · dull silver pieces sink; a bagged magnet pulls every piece sideways. Supported identity: steel pieces. Useful method: magnetism—not colour or sinking alone.",
          "Sample B · light tan chunks remain at the surface, do not dissolve, and are not magnetic. Supported identity: cork pieces. Useful method: skimming.",
          "Sample E · large irregular pieces remain solid; a 4 mm screen holds them while smaller grains and liquid pass. Supported identity: gravel. Useful method: sieving.",
          "Sample A · fine gritty particles settle slowly, cloud the water when stirred, pass a coarse screen, and remain on filter paper. Supported identity: sand. Useful method: filtration.",
          "Sample C · after visible solids are removed, the liquid looks clear; filtering changes nothing, but teacher-managed evaporation leaves crystals. Supported identity: dissolved salt. Useful method: evaporation. Students do not heat samples.",
        ],
      },
      {
        heading: "2 · Live classification cases",
        prompts: [
          "Mixture-family reference — Solution: particles are spread evenly and do not settle or filter out; mechanical mixture: different parts remain observable; suspension: fine particles are spread through a fluid but settle or can be filtered; colloid/emulsion: tiny particles or droplets remain dispersed and do not quickly settle. Use test evidence rather than appearance alone.",
          "Example 1 · Salt water after stirring: the liquid looks clear and crystals return after evaporation. Classification: solution. Strongest evidence: the evaporation result, not clear appearance alone.",
          "Example 2 · Gravel and sand: different solid sizes stay visible and a screen sorts them. Classification: heterogeneous mixture. Strongest evidence: visible different parts separated by particle size.",
          "Example 3 · Sugar water: no grains remain visible and evaporation later leaves sugar crystals. Classification: solution. Strongest evidence: crystals return after the water leaves.",
          "Example 4 · Unknown clear liquid: it is colourless and no property test has been completed. Classification: not enough evidence. A clear appearance cannot distinguish a solution from a pure substance.",
        ],
      },
      {
        heading: "3 · Complete the evidence organizer",
        prompts: [
          "Make four columns—Observation / Inference / Test / Result—and enter every reveal card. Keep observations and material names in different columns.",
          "Return to the original jar and support all five entries: water as visible liquid whose purity is unconfirmed; steel from magnetism; cork from floating plus non-magnetic response; gravel and sand from different particle-size tests; dissolved salt only from the evaporation result.",
          "Design one next safe test and predict its result. Only familiar, teacher-labelled classroom materials may be used.",
        ],
      },
    ],
  },

  "mixture-toolkit": {
    title: "Separation toolkit lab · six offline method cards",
    directions: "Assign one method card per expert team. Test only teacher-labelled familiar materials. No tasting or eating; wash hands after the lab. Use only bagged magnets, water-soluble classroom markers, water, and teacher-approved equipment—no open flames, student heating, or solvents.",
    sections: [
      {
        heading: "1 · Sieving, magnetism, and skimming/decanting",
        prompts: [
          "SIEVING — Useful property: particle size. Test: gravel + sand; a mesh retains gravel while smaller sand passes. Difficult case: salt + fine sand of similar size. Limit: mesh size determines what separates.",
          "MAGNETISM — Useful property: magnetic response. Test: steel washers + sand using a sealed/bagged magnet. Difficult case: aluminum + sand. Limit: not all metals are magnetic; wipe and dry the bag before storage.",
          "SKIMMING / DECANTING — Useful property: floating or settling. Test surface cork and settled sand in teacher-prepared water. Skim a floating solid or gently decant upper liquid after settling. Difficult case: two materials that both float or a suspension that has not settled. Limit: pouring can remix or lose material.",
        ],
      },
      {
        heading: "2 · Filtration, evaporation, and chromatography",
        prompts: [
          "FILTRATION — Useful property: particle size relative to filter pores. Test: clean soil/clay + water; visible solids decrease in the filtrate. Difficult case: salt water. Limit: clear-looking filtrate is not proven safe to drink.",
          "EVAPORATION — Useful property: different volatility. Test: teacher-managed salt-water dish; water leaves and salt remains. Difficult case: two non-volatile dissolved solids. Limit: this setup does not recover the water and students do not heat samples.",
          "CHROMATOGRAPHY — Useful property: pigments move differently through paper with water. Test one dot of water-soluble black classroom marker on paper with the paper edge—not the ink dot—touching water. Difficult case: a water-insoluble marker. Limit: colour bands do not identify an unknown pigment by themselves; use no solvents or permanent markers.",
        ],
      },
      {
        heading: "3 · Build the complete toolkit",
        prompts: [
          "For all six methods record: property used; suitable mixture; what is recovered; what remains mixed; safety step; honest limitation.",
          "Apply to two live cases: Muddy stream water / Mixed recycling fragments / Salt water / Trail mix ingredients. Treat every sample as lab material: do not eat or taste the trail-mix case.",
          "For each chosen case write property → method → result → next problem. Some cases need a sequence; explain why a tempting alternative would not fully work.",
        ],
      },
    ],
  },

  "separation-rescue": {
    title: "Mixture Rescue Challenge · hands-on and no-lab pack",
    directions: "Plan before opening the sample. Use the hands-on route or the supplied stage-result cards. Do not taste or drink anything; students do not heat samples.",
    sections: [
      {
        heading: "1 · Starting mixture and Version 1 plan",
        prompts: [
          "Each team begins with 10 g gravel, 10 g sand, 5 steel washers/nuts, and 4 cork pieces. After the dry plan is approved, the teacher provides 50 mL water and 5 g salt separately.",
          "Available tools: bagged magnet, sieve, skimmer/spoon, funnel and filter paper, labelled cups, and one teacher-managed overnight evaporation dish.",
          "Build a movable sequence. For every step write: component targeted → property used → tool/method → predicted recovered fraction → what remains mixed. Add the safety checkpoint.",
        ],
      },
      {
        heading: "2 · No-lab stage-result cards",
        prompts: [
          "STAGE A · Bagged magnet first: all 5 steel pieces recovered; no visible sand attached. If the magnet touches the mixture directly, grains cling and cleanup becomes harder.",
          "STAGE B · After water is added, skimming recovers 4 cork pieces. One carries a few sand grains; rinsing over the same tray reduces loss.",
          "STAGE C · Sieving recovers 9.4 g gravel with about 0.6 g fine-grain contamination. A second gentle pass improves purity but costs time.",
          "STAGE D · Filtration recovers 8.8 g dry-equivalent sand. Some remains on the cup and filter edge; dissolved salt passes with the water.",
          "STAGE E · Teacher-managed evaporation recovers 4.3 g salt. Water is not recovered in this setup. All recovered materials remain non-food and non-potable.",
        ],
      },
      {
        heading: "3 · Midpoint revision and evaluation",
        prompts: [
          "At the midpoint, name one contamination or loss problem. Record one peer suggestion and create Version 2 by changing exactly one step.",
          "Evaluate purity and recovery separately. Use evidence from Stage A–E, then comment on efficiency and safety. Do not combine the criteria into one unexplained score.",
          "Defend the strongest decision, critique the weakest decision, and propose a next change. A defensible efficient route is magnet → add water/skim → sieve → filter → teacher evaporation, but another safe evidence-based sequence may work.",
        ],
      },
    ],
  },

  "water-treatment-case": {
    title: "Where does our water become safe? · local offline case",
    directions: "Use the official-source capsules and model data below. Every sample and container must say DO NOT DRINK. A classroom filter models visible-particle removal only.",
    sections: [
      {
        heading: "1 · Local system source capsule",
        prompts: [
          "Teacher-authored synthesis of Metro Vancouver K–12 water resources: the regional system draws from the protected Capilano, Seymour, and Coquitlam watersheds. Treatment is selected for source conditions; the system includes source protection, treatment/disinfection, testing, storage, and delivery through municipal networks.",
          "Teacher-authored synthesis of City of Surrey water-quality information: Surrey receives regional drinking water and monitors the local distribution system. An exact route to one school depends on the network, so mark the school route as an inference unless an official map confirms it.",
          "Source credits for the case: Metro Vancouver, ‘Water’ school resources, metrovancouver.org/school-programs/water; City of Surrey, ‘Water Quality,’ surrey.ca/services-payments/water-drainage-sewer/water/water-quality. These notes are concise paraphrases, not complete operating specifications.",
          "Build a route: protected watershed → regional treatment and disinfection → regional storage/transmission → Surrey distribution → school tap. Mark which links are source-supported and which local link remains uncertain.",
        ],
      },
      {
        heading: "2 · Treatment-train job cards",
        prompts: [
          "SOURCE PROTECTION reduces contamination risk before treatment. PARTICLE REMOVAL reduces suspended material. DISINFECTION targets harmful microorganisms. TESTING checks whether standards are being met. STORAGE/DELIVERY keeps treated water moving through a monitored system.",
          "Challenge A: a storm raises turbidity. Which jobs become especially important, and why is a single sand filter not a complete response?",
          "Challenge B: water looks clear but no microbial test was performed. Which claim is justified: ‘fewer visible particles’ or ‘safe to drink’? Explain.",
        ],
      },
      {
        heading: "3 · Classroom particle-filter evidence",
        prompts: [
          "Prepared model sample before filtering: brown/cloudy; a black-and-white card disappears behind 0.4 cm of sample; no microbe or dissolved-substance test performed.",
          "After gravel/sand/filter material: pale cloudy; the card remains visible through 2.2 cm; a small amount of fine material remains; no microbe or dissolved-substance test performed.",
          "Revise one layer for visible-particle removal and compare the same observation measure. Then state two limits: clearer appearance does not establish removal of microbes or dissolved contaminants, and a bottle model does not reproduce a full regional system.",
          "Correct the claim ‘It looks clear, so it is safe to drink’ in a mini-poster or 60-second announcement. Name filtration, one different system job, two limits, the DO NOT DRINK rule, and one source credit.",
        ],
      },
    ],
  },

  "place-mixtures-studio": {
    title: "Learning from place and source · offline integrity pack",
    directions: "Use one exact teacher-saved Surrey Schools Indigenous Learning source. This pack supplies context and boundaries, not community knowledge detached from its source. Observe only; do not harvest, taste, reenact, or make medical claims.",
    sections: [
      {
        heading: "1 · Choose one bounded source card",
        prompts: [
          "CARD A · ‘Indigenous plants to locate on nature walks,’ Surrey Schools Indigenous Learning; knowledge shared by Katzie members Roma Leon, Kayleigh Leon, and Paula James. Use only the saved approved excerpt for observation and attribution. The title does not authorize harvesting, tasting, or expanded medicinal claims.",
          "CARD B · ‘Cedar harvesting,’ Surrey Schools Indigenous Learning. MOA context identifies Jessica Silvey as Sechelt/Squamish and Robert Joe as Sechelt; filmed along a river in Sechelt on the Sunshine Coast. MOA states that only Indigenous people may harvest cedar this way in keeping with the named protocols and beliefs. Students learn from the documentation; they do not imitate it.",
          "Before viewing/reading, record creator or Knowledge Keeper, Nation/community, place, purpose, and sharing/protocol guidance exactly as supplied by the selected source.",
        ],
      },
      {
        heading: "2 · Source evidence before science connection",
        prompts: [
          "Encounter the saved excerpt twice: first for whole meaning; second for evidence. Record three supported details and the exact page, image, timestamp, or section for each. A blank is better than a guess.",
          "Create three columns: WHAT THE SOURCE SUPPORTS / A SCHOOL-SCIENCE IDEA THAT MAY CONNECT / WHAT WE MUST NOT ASSUME. Keep every source statement out of the science-connection column.",
          "A property or separation idea may be placed beside the source only when it genuinely helps the lesson; do not translate the whole source into a Western category or claim that knowledge systems are identical.",
        ],
      },
      {
        heading: "3 · Respectful response and outage boundary",
        prompts: [
          "Create one source note, concept sketch, or thank-you question with exact attribution. Include one responsibility or limit learned from the context.",
          "If the saved excerpt is unavailable, complete the attribution/context audit only and stop. Do not reconstruct community knowledge from memory or AI; return to the evidence section when the approved source is available.",
          "Keep notes local or private when the source has sharing limits. Do not upload copied media or community knowledge. Only teacher-selected, permission-appropriate evidence may be shared later.",
        ],
      },
    ],
  },

  "cosmic-zoom": {
    title: "You are here · offline cosmic models pack",
    directions: "Complete all three models. Use the supplied NASA-based teacher capsules and measurements; label what each model shows accurately, enlarges, compresses, or leaves out.",
    sections: [
      {
        heading: "1 · Nested address and trusted-source capsule",
        prompts: [
          "Order from smallest to largest: school/community → Earth → solar system → Milky Way galaxy → observable universe. Explain each ‘is inside’ relationship.",
          "Teacher-authored NASA synthesis: the solar system is the Sun and objects held in orbit around it. It lies in the Orion Spur/Orion Arm region of the Milky Way, about 26,000 light-years from the galactic centre—not at the centre.",
          "Draw a labelled Milky Way model with the solar system away from the centre. Add: scientists infer our galaxy's structure from measurements made inside it; the sketch is not a photograph taken from outside the Milky Way.",
        ],
      },
      {
        heading: "2 · Distance-only solar-system model",
        prompts: [
          "Scale: 1 m = 100 million km. Mark distance from the Sun: Mercury 0.6 m; Venus 1.1 m; Earth 1.5 m; Mars 2.3 m; Jupiter 7.8 m; Saturn 14.3 m; Uranus 28.7 m; Neptune 45.0 m. For a tabletop route, divide every distance by 10.",
          "Check one calculation using real average distance ÷ 100 million km per metre. At this scale, the Sun would be about 1.4 cm wide and Earth about 0.13 mm wide.",
          "Write the required warning: distances are scaled; visible planet markers are deliberately enlarged; orbits are shown as fixed points; objects and paths are simplified.",
        ],
      },
      {
        heading: "3 · Universe timeline and light-travel evidence",
        prompts: [
          "Timeline scale: 1 m = 1 billion years; total length 13.8 m. Place: universe begins 0 m; early Milky Way develops within the first few metres; Sun forms about 9.2 m; Earth about 9.3 m; modern humans occupy far less than the final millimetre.",
          "Light-travel table: Moon ≈ 1.3 light-seconds away; Sun ≈ 8.3 light-minutes; Proxima Centauri ≈ 4.24 light-years; Andromeda Galaxy ≈ 2.5 million light-years. A light-year is a distance.",
          "Explain why seeing Andromeda means receiving ancient light. Then add one timeline limitation and one uncertainty: dates are rounded, events unfolded over time, and the model compresses complex cosmic history into points.",
        ],
      },
    ],
  },

  "space-motion-lab": {
    title: "Patterns in motion · offline model and data pack",
    directions: "Use a lamp and ball when available; otherwise use the four-position evidence frame. Keep observations separate from explanations and graph rotation and revolution on different scales.",
    sections: [
      {
        heading: "1 · Observation, explanation, and day/night model",
        prompts: [
          "Shadow-sequence evidence: at 9:00 a fixed object's shadow is long toward the west; near noon it is shortest; at 15:00 it is long toward the east. Observation names visible change; explanation proposes a cause.",
          "List two possible explanations before choosing one. Then model a fixed Sun/light and rotating Earth with Surrey marked: sunrise → noon → sunset → midnight → sunrise.",
          "Explain: Earth's rotation carries Surrey into and out of sunlight, producing day and night. Draw one view from space and one from the ground. Add a limit: sizes, distances, light rays, and speed are not to scale.",
        ],
      },
      {
        heading: "2 · Planet rotation and revolution data",
        prompts: [
          "Approximate sidereal rotation period / revolution period — Mercury 1407.6 h / 0.24 Earth years; Venus 5832.5 h / 0.62 y; Earth 23.9 h / 1.00 y; Mars 24.6 h / 1.88 y.",
          "Jupiter 9.9 h / 11.86 y; Saturn 10.7 h / 29.45 y; Uranus 17.2 h / 84.0 y; Neptune 16.1 h / 164.8 y. Values are rounded NASA-based comparison data; positive rotation values show duration, not direction. Venus and Uranus rotate in the opposite direction to most planets.",
          "Make separate graphs or tables for rotation and revolution. Find one pattern, two anomalies/outliers, and one question. Do not call rotation period a solar day; Mercury and Venus especially require that distinction.",
        ],
      },
      {
        heading: "3 · Change viewpoint and evaluate models",
        prompts: [
          "From Earth's surface, the Sun appears to move across the sky each day. From space, a model shows Earth rotating while the Sun remains effectively fixed for this short timescale. Choose the explanation that fits both views.",
          "Distinguish terms: rotation = spin on an axis; revolution = one trip around another object; orbit = the curved path; apparent motion = movement that seems to occur from a viewpoint.",
          "Finish with an evidence-based explanation of day/night, a distinction between a rotation period and a revolution period, and one limitation for the shadow sequence, lamp model, and data graph.",
        ],
      },
    ],
  },

  "cosmic-exhibit-studio": {
    title: "Cosmic exhibit studio · offline audit and build pack",
    directions: "Audit first, focus second, build third. Every exhibit needs two source capsules, one accurate model, visible citations, one specific model warning, peer feedback, and a visible revision.",
    sections: [
      {
        heading: "1 · Find and repair five beautiful mistakes",
        prompts: [
          "ERROR 1 · ‘Our solar system is near the centre of the Milky Way.’ Category: structure. Repair with the NASA capsule: it is in the Orion Spur region, roughly 26,000 light-years from the centre.",
          "ERROR 2 · A 1 m poster shows the Sun and all planets as large circles with equal gaps and says ‘everything is to scale.’ Category: scale. Repair by naming which relationship is accurate and which is enlarged/compressed.",
          "ERROR 3 · ‘The Sun travels around Earth every day.’ Category: motion/viewpoint. Repair: Earth's rotation mainly explains the Sun's daily apparent path.",
          "ERROR 4 · ‘The Big Bang was an explosion at one known spot, and scientists know the universe's edge and shape.’ Category: evidence/uncertainty. Repair: evidence supports an early hot, dense universe and expansion; important questions and limits remain.",
          "ERROR 5 · A dramatic image has no title, creator, caption, date, or model warning and is used as proof. Category: source/evidence. Repair with a full credit and a sentence saying what the image supports and cannot prove.",
        ],
      },
      {
        heading: "2 · Offline source capsules",
        prompts: [
          "NASA Science · Solar System Facts: the solar system formed about 4.6 billion years ago and lies in the Orion Spur of the Milky Way; planets orbit the Sun. Use for structure, location, and checked planet facts—not for a claim about Indigenous knowledge or human meaning.",
          "NASA Science · Universe Overview/Cosmic History: observations support a universe about 13.8 billion years old that expanded from an early hot, dense state. The capsule does not establish a conventional explosion at one location or answer what caused the beginning.",
          "Canadian Space Agency · Canadian space milestones: Canadian robotic technologies such as Canadarm2 help move equipment and support work on the International Space Station. Select one named technology, problem, effect, and limitation; do not treat a timeline entry as proof of every impact.",
          "Canadian Space Agency · Indigenous ways of knowing: use only a bounded resource with its named contributor/Knowledge Keeper, Nation/community, purpose, and sharing context. If that exact source is not present, do not invent or blend a ‘sky story.’",
        ],
      },
      {
        heading: "3 · Focus, build, and peer-audit",
        prompts: [
          "Turn a broad topic into one two-minute learning goal—for example: why distant light is old, how rotation changes our sky view, why a scale model must distort size or distance, or what problem one Canadian technology addresses.",
          "Plan: learning goal; source capsule 1 and what it supports; source capsule 2 and what it supports; visual/model; audience action; exact ‘This model distorts…’ warning; two-minute teaching order.",
          "Peer-audit: Is the idea focused? Are important claims supported? Are creator/source names visible? Is structure or motion accurate? Is every distortion named? Is uncertainty honest? Does the audience do some thinking?",
          "Record feedback, make one visible before/after revision, teach for two minutes, and complete an individual reflection naming the evidence that caused the revision. Keep work local unless the teacher selects it for the June showcase.",
        ],
      },
    ],
  },
} satisfies Record<string, ScienceOfflinePack>;

export type ScienceOfflineLessonId = keyof typeof packs;

export const scienceOfflinePacks: Record<string, ScienceOfflinePack> = packs;
