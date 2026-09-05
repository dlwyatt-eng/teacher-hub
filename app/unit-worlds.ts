import type { CSSProperties } from "react";

export type WorldFamily =
  | "forest"
  | "river"
  | "mountain"
  | "garden"
  | "archive"
  | "city"
  | "studio"
  | "workshop"
  | "laboratory"
  | "civic"
  | "cosmic"
  | "harbour";

export type WorldSpectrum =
  | "Natural"
  | "Fantastical"
  | "Historical"
  | "Artistic"
  | "Architectural"
  | "Scientific"
  | "Technological"
  | "Cosmic";

export type UnitWorldTheme = {
  id: string;
  name: string;
  family: WorldFamily;
  spectrum: WorldSpectrum[];
  environment: string;
  metaphor: string;
  entry: string;
  destination: string;
  progressNoun: string;
  icon: string;
  sky: string;
  /** Pale surface used by older cards that still consume a `*-soft` alias. */
  paperSoft?: string;
  ground: string;
  accent: string;
  accent2: string;
  ink: string;
  glow: string;
  image?: string;
  imagePosition?: string;
  careNote?: string;
};

const world = (theme: UnitWorldTheme) => theme;

/**
 * Unit-level design tokens. Shared lesson components consume these values while
 * navigation, readiness, evidence, accessibility, and SpacesEDU behaviour stay global.
 */
export const unitWorlds: Record<string, UnitWorldTheme> = {
  "ela-belonging": world({ id: "ela-belonging", name: "The Listening Grove", family: "forest", spectrum: ["Natural", "Artistic"], environment: "A quiet woodland edge where paths begin with careful noticing, small stories, and the sounds of place.", metaphor: "Each observation becomes a trail marker; each respectfully shared story helps the class find its bearings.", entry: "Forest edge", destination: "Listening circle", progressNoun: "trail markers", icon: "◌", sky: "#dfe9d9", ground: "#183b30", accent: "#d8a954", accent2: "#7fad87", ink: "#f7f3e7", glow: "#f8d989", image: "/images/visual-review/unit-world-listening-grove-v1.webp", imagePosition: "center 52%" }),
  "ela-media": world({ id: "ela-media", name: "The House of Many Windows", family: "archive", spectrum: ["Architectural", "Artistic"], environment: "An old house of windows, lenses, crop frames, listening rooms, and doors that reveal different parts of the same event.", metaphor: "Students move from noticing one frame to comparing what every frame reveals, emphasizes, or leaves outside.", entry: "Front window", destination: "Full-context gallery", progressNoun: "windows opened", icon: "▣", sky: "#e8d9c4", ground: "#38283d", accent: "#e8b85a", accent2: "#a47fc1", ink: "#fff8ec", glow: "#ffd88b", image: "/images/visual-review/unit-world-house-many-windows-v1.webp", imagePosition: "center 48%" }),
  "ela-reading-power": world({ id: "ela-reading-power", name: "Storywood Crossroads", family: "forest", spectrum: ["Fantastical", "Artistic"], environment: "A deep story forest where character paths split, turning points open hidden routes, and game worlds wait beyond the trees.", metaphor: "Text evidence lights the defensible path; counterarguments and transformations reveal routes a first reading missed.", entry: "Reader's gate", destination: "Worldbuilder's clearing", progressNoun: "story paths", icon: "✧", sky: "#243f4b", paperSoft: "#edf4ea", ground: "#102c25", accent: "#f2bf63", accent2: "#8dc99b", ink: "#fff7df", glow: "#f8d778", image: "/images/visual-review/unit-world-storywood-crossroads-v1.webp", imagePosition: "center 48%" }),
  "ela-research": world({ id: "ela-research", name: "The Mosaic Library", family: "archive", spectrum: ["Historical", "Artistic"], environment: "A many-level library of maps, data, voices, source tables, and mosaic walls that only become clear when pieces are connected.", metaphor: "Every source earns a job; synthesis builds a larger picture without hiding cracks or missing tiles.", entry: "Source desk", destination: "Public teaching gallery", progressNoun: "source tiles", icon: "▤", sky: "#ead9ba", ground: "#493424", accent: "#c66f45", accent2: "#5c8792", ink: "#fff8e9", glow: "#efc97c", image: "/images/unit-worlds/mosaic-library-v1.webp", imagePosition: "center 54%" }),
  "ela-language-lab": world({ id: "ela-language-lab", name: "The River of Exact Words", family: "river", spectrum: ["Natural", "Artistic"], environment: "A luminous river, echo cave, and word garden where sound, image, rhythm, and precise scientific language travel together.", metaphor: "Students test how language bends meaning, then keep the beauty and accuracy that survive the current.", entry: "Word spring", destination: "Echo falls", progressNoun: "river bends", icon: "≈", sky: "#d6edf0", ground: "#17404c", accent: "#e7b95f", accent2: "#66aeb3", ink: "#f6fdff", glow: "#c8f2e6" }),
  "ela-worldbuilding": world({ id: "ela-worldbuilding", name: "The Atlas-Maker's Tower", family: "studio", spectrum: ["Fantastical", "Architectural", "Artistic"], environment: "A high map room filled with unfinished worlds, rule ledgers, impossible scenes, revision bridges, and a public gallery at the top.", metaphor: "A believable world grows when its rules, facts, inventions, and audience experience are tested together.", entry: "Unfinished map room", destination: "Open atlas gallery", progressNoun: "world layers", icon: "⌖", sky: "#d8d6ed", ground: "#2c2852", accent: "#f0bd5c", accent2: "#8d80cf", ink: "#fff9e8", glow: "#dfd2ff" }),

  "math-number": world({ id: "math-number", name: "Scale City", family: "city", spectrum: ["Architectural", "Artistic"], environment: "A city of zooming number lines, stacked place-value towers, factor blocks, strategy streets, and quantities from thousandths to billions.", metaphor: "Students learn the city by scale and structure, then choose efficient routes rather than following one fixed road.", entry: "Neighbourhood scale", destination: "Billion-view lookout", progressNoun: "districts mapped", icon: "▥", sky: "#d8e7ec", ground: "#233e50", accent: "#efaa4d", accent2: "#5d9cac", ink: "#f8fcfd", glow: "#ffcf75", image: "/images/unit-worlds/scale-city-v1.webp", imagePosition: "center 52%" }),
  "math-fractions": world({ id: "math-fractions", name: "The Mosaic Market", family: "city", spectrum: ["Artistic", "Architectural"], environment: "A bright market of tiled walls, recipe stalls, price boards, ratio fabrics, decimal routes, and decisions made with visible parts.", metaphor: "Equivalent representations are different stalls selling the same quantity; sensible estimates help students choose well.", entry: "Fraction tile gate", destination: "Decision plaza", progressNoun: "mosaics completed", icon: "◫", sky: "#f5dfc5", ground: "#653b30", accent: "#efb44f", accent2: "#63a6a2", ink: "#fff8ed", glow: "#ffd985" }),
  "math-patterns": world({ id: "math-patterns", name: "Mosslight Pattern Forest", family: "forest", spectrum: ["Natural", "Fantastical", "Artistic"], environment: "A vast mossy forest of branching paths, fern spirals, repeating stones, growing clearings, quiet streams, fungi rings, and changing light.", metaphor: "Students collect cases along the trail, name the rule that connects them, predict the unseen path, and prove why it continues.", entry: "Pattern forest edge", destination: "Great branching tree", progressNoun: "trail discoveries", icon: "⌁", sky: "#d6ead8", ground: "#123a2d", accent: "#edbd5c", accent2: "#82bd88", ink: "#fff9df", glow: "#f4db82", image: "/images/unit-worlds/mosslight-forest-v1.webp", imagePosition: "center 56%" }),
  "math-data": world({ id: "math-data", name: "The Evidence Observatory", family: "laboratory", spectrum: ["Scientific", "Natural"], environment: "A hilltop weather and data observatory with changing scales, trial tables, probability instruments, and windows onto real variation.", metaphor: "Students tune the instrument, gather repeated evidence, and decide how strong a claim the view can honestly support.", entry: "Observation deck", destination: "Claim horizon", progressNoun: "evidence readings", icon: "⌁", sky: "#dceaf1", ground: "#284451", accent: "#e3aa4f", accent2: "#6ba0bd", ink: "#f8fcff", glow: "#d7ecff" }),
  "math-geometry": world({ id: "math-geometry", name: "The Alpine Survey", family: "mountain", spectrum: ["Natural", "Architectural"], environment: "An alpine expedition of field stations, contour paths, measured shelters, habitat plans, transformed coordinates, and exact construction.", metaphor: "Every measurement earns a place on the map; designs improve as students calculate, test access, and revise.", entry: "Survey basecamp", destination: "Accessible summit plan", progressNoun: "survey stations", icon: "△", sky: "#d9edf2", ground: "#294b45", accent: "#f0ae4a", accent2: "#6a9c83", ink: "#f7fbf5", glow: "#dff3d8", image: "/images/unit-worlds/alpine-survey-v1.webp", imagePosition: "center 52%" }),
  "math-design": world({ id: "math-design", name: "Navigation Workshop", family: "workshop", spectrum: ["Architectural", "Technological"], environment: "A practical cartographer's workshop of coordinates, plans, capacity vessels, transformed routes, prototypes, and constraints.", metaphor: "Students use mathematics as a navigation tool: locate, compare, build, test, and explain a route that works.", entry: "Drafting table", destination: "Tested design harbour", progressNoun: "plans tested", icon: "⌖", sky: "#e8e0cf", ground: "#3e3d3a", accent: "#d99a48", accent2: "#658c99", ink: "#fffaf0", glow: "#f1cf8d" }),

  "body-systems": world({ id: "body-systems", name: "The Living Systems Expedition", family: "laboratory", spectrum: ["Scientific", "Natural"], environment: "An illustrated journey from signals and reactions into interacting body systems, balance, reproduction, development, and whole-system cases.", metaphor: "Each system is a region with a job; understanding grows by tracing the messages and resources moving between them.", entry: "Signal station", destination: "Whole-body systems map", progressNoun: "systems connected", icon: "◎", sky: "#e5d9df", ground: "#4e2739", accent: "#edab69", accent2: "#bb6d87", ink: "#fff7f7", glow: "#ffd2be" }),
  mixtures: world({ id: "mixtures", name: "Watershed Field Laboratory", family: "river", spectrum: ["Natural", "Scientific"], environment: "A stream-to-city watershed with mystery jars, separation stations, water routes, rescue challenges, and place-based evidence.", metaphor: "Students follow matter through the watershed, choosing methods that fit the properties and limits they observe.", entry: "Headwater sample", destination: "Clean-water confluence", progressNoun: "waterway stations", icon: "≈", sky: "#d6edf0", ground: "#174958", accent: "#e9b35e", accent2: "#5ca9a8", ink: "#f5fdff", glow: "#c8f4e8", image: "/images/unit-worlds/watershed-expedition-v1.webp", imagePosition: "center 58%" }),
  "forces-motion": world({ id: "forces-motion", name: "Kinetic Engineering Yard", family: "laboratory", spectrum: ["Scientific", "Technological"], environment: "An open engineering yard of motion tracks, force arrows, impact zones, stopping-time rigs, movement studies, and delivery-pod testing.", metaphor: "Every trial adds evidence to an engineering dossier; safer designs emerge from measured forces, motion, and revision.", entry: "Motion gate", destination: "Safety test hangar", progressNoun: "tests completed", icon: "↗", sky: "#dbe8e5", ground: "#263f3b", accent: "#f2a94e", accent2: "#5ea28f", ink: "#f8fcf8", glow: "#ffd178" }),
  "earth-space": world({ id: "earth-space", name: "Deep-Space Mission Control", family: "cosmic", spectrum: ["Cosmic", "Scientific", "Technological"], environment: "A dark-sky mission route through scale, rotation, revolution, gravity, solar-system models, viewpoints, and an expert showcase.", metaphor: "Students move from Earth-based observations to models of larger systems, checking what every model explains and where it breaks down.", entry: "Earth observation deck", destination: "Expert signal broadcast", progressNoun: "mission sectors", icon: "✦", sky: "#111d3b", paperSoft: "#eef2ff", ground: "#071020", accent: "#f0bf5b", accent2: "#718fd0", ink: "#f7f9ff", glow: "#aebfff", image: "/images/unit-worlds/deep-space-mission-control-v1.webp", imagePosition: "center 48%" }),

  "place-evidence-perspective": world({ id: "place-evidence-perspective", name: "The Cartographer's Workshop", family: "archive", spectrum: ["Historical", "Architectural", "Natural"], environment: "A source workshop of layered maps, planning tables, observation windows, local evidence, and intentionally visible omissions.", metaphor: "Students compare maps rather than treating one as the whole place, then build qualified claims with source context attached.", entry: "Observation table", destination: "Layered place atlas", progressNoun: "map layers", icon: "⌾", sky: "#dfe8e5", ground: "#304a46", accent: "#e5ad55", accent2: "#678eaa", ink: "#fbfaf2", glow: "#efcf86", careNote: "Maps and local Nation knowledge remain attributed to their specific sources; the world is a navigation metaphor, not a cultural costume." }),
  "power-rights-government": world({ id: "power-rights-government", name: "The Civic Evidence Room", family: "civic", spectrum: ["Architectural", "Historical"], environment: "A civic newsroom and hearing room of decision tables, rights case files, jurisdiction routes, public questions, and accountable recommendations.", metaphor: "Students trace who can decide, who is affected, which rights matter, and what safeguards or review a decision needs.", entry: "Question desk", destination: "Public hearing chamber", progressNoun: "case files", icon: "§", sky: "#e7e0ef", ground: "#382d4f", accent: "#e8b252", accent2: "#9a79ba", ink: "#fffaf0", glow: "#e7d0ff", image: "/images/unit-worlds/civic-evidence-room-v1.webp", imagePosition: "center 52%" }),
  "global-systems": world({ id: "global-systems", name: "The Riverport of Connections", family: "harbour", spectrum: ["Natural", "Architectural"], environment: "A busy riverport where migration stories, data skylines, resource routes, trade currents, cooperation, and unequal impacts intersect.", metaphor: "Students follow one movement through the system and notice how a change upstream can affect people far beyond the first stop.", entry: "Arrival quay", destination: "Cooperation bridge", progressNoun: "connections traced", icon: "⇄", sky: "#e9dfca", ground: "#4e402e", accent: "#e1a84f", accent2: "#5f91a1", ink: "#fff9ed", glow: "#f4cf83" }),
  "solutionary-inquiry": world({ id: "solutionary-inquiry", name: "The Restoration Commons", family: "garden", spectrum: ["Natural", "Artistic"], environment: "A shared garden and repair commons where system roots are traced, existing responses compared, prototypes grown, and claims tested with an audience.", metaphor: "A responsible response grows from understanding conditions, relationships, limits, and the people already doing the work.", entry: "System roots", destination: "Community teaching commons", progressNoun: "responses cultivated", icon: "✣", sky: "#dcebdc", ground: "#234936", accent: "#e7af52", accent2: "#78a873", ink: "#f9fff4", glow: "#e6ef9c", careNote: "Generated scenery explains systems and restoration only; authentic community voices, artwork, maps, and knowledge stay source-led and attributed." }),

  "arts-place": world({ id: "arts-place", name: "The Sensory Garden Atelier", family: "garden", spectrum: ["Natural", "Artistic"], environment: "An open garden studio where image, sound, movement, drama, light, texture, and place can be noticed and recombined.", metaphor: "Each arts language reveals a different layer; deliberate combinations guide what an audience notices.", entry: "Noticing gate", destination: "Four-language pavilion", progressNoun: "sensory layers", icon: "✤", sky: "#e4ead6", ground: "#3d4c35", accent: "#efad63", accent2: "#a66f8d", ink: "#fff9ee", glow: "#f4d784", careNote: "Named artists, contexts, and cultural works remain attributed; the garden never substitutes generic cultural decoration." }),
  "arts-power": world({ id: "arts-power", name: "The Lantern & Shadow Theatre", family: "studio", spectrum: ["Artistic", "Historical"], environment: "A theatre of lanterns, frames, symbols, shadows, viewpoints, and audience sightlines where power can be examined without impersonating others.", metaphor: "Students change framing, symbol, form, and context, then ask whose voice is present and whose is missing.", entry: "Backstage lantern", destination: "Responsible public frame", progressNoun: "scenes reframed", icon: "◐", sky: "#ead7df", ground: "#462637", accent: "#efb85f", accent2: "#c06987", ink: "#fff8ec", glow: "#ffd37d" }),
  "arts-audience": world({ id: "arts-audience", name: "The Living Gallery", family: "studio", spectrum: ["Artistic", "Architectural"], environment: "A gallery under construction where research becomes an experience, visitors get stuck or lean in, and critique reshapes the route.", metaphor: "The audience leaves evidence; artists use it to revise intention, sequence, access, and impact.", entry: "Prototype wall", destination: "Open-night gallery", progressNoun: "gallery rooms", icon: "▰", sky: "#ece5dc", ground: "#40383c", accent: "#dca353", accent2: "#8b759a", ink: "#fffaf3", glow: "#f1d9aa" }),
  "arts-systems": world({ id: "arts-systems", name: "Cosmic Systems Studio", family: "cosmic", spectrum: ["Cosmic", "Artistic"], environment: "A dark studio of scale, rhythm, orbit, layered sound, movement pathways, and visual systems inspired by scientific relationships.", metaphor: "Students translate a system across art forms while keeping the relationship—not merely the surface look—recognizable.", entry: "Scale chamber", destination: "Systems constellation", progressNoun: "translations composed", icon: "✺", sky: "#171b3e", paperSoft: "#f0edfb", ground: "#0d1026", accent: "#f1bd5e", accent2: "#827bd2", ink: "#fbf9ff", glow: "#c8bfff" }),

  "adst-systems": world({ id: "adst-systems", name: "The Network Workshop", family: "workshop", spectrum: ["Technological", "Architectural"], environment: "A hands-on routing workshop of devices, servers, packet cards, visible paths, search clues, and simplified systems that can be physically modelled.", metaphor: "Students first build the parts and language, then become the moving system and explain where the model is incomplete.", entry: "Parts bench", destination: "Working network route", progressNoun: "connections tested", icon: "⌘", sky: "#dce9ed", ground: "#263f49", accent: "#e8aa50", accent2: "#5c96a6", ink: "#f8fdff", glow: "#cfeef2" }),
  "adst-access": world({ id: "adst-access", name: "The Inclusive Design Village", family: "city", spectrum: ["Architectural", "Artistic"], environment: "A small design village of entrances, paths, signs, quiet spaces, tools, interfaces, and everyday barriers waiting to be noticed and repaired.", metaphor: "Every route is tested by varied users; access is a design requirement from the first sketch, not an add-on at the end.", entry: "Barrier walk", destination: "Open-for-everyone square", progressNoun: "routes repaired", icon: "◇", sky: "#e3eee7", ground: "#30483e", accent: "#e8ad56", accent2: "#6e9e82", ink: "#fbfff8", glow: "#ddf0c8" }),
  "adst-game": world({ id: "adst-game", name: "Pixel Story Arcade", family: "city", spectrum: ["Technological", "Fantastical", "Artistic"], environment: "A colourful pixel-world arcade of paper routes, story gates, playable choices, original art, feedback stations, and revised levels.", metaphor: "The player travels through the story; every mechanic, block, image, and line of text must help the route make sense.", entry: "Paper level map", destination: "Playable story portal", progressNoun: "levels unlocked", icon: "▦", sky: "#292852", paperSoft: "#f0efff", ground: "#171833", accent: "#f0b94f", accent2: "#73c29a", ink: "#fff8dc", glow: "#b9f39a" }),
  "adst-prototype": world({ id: "adst-prototype", name: "The Maker Foundry", family: "workshop", spectrum: ["Technological", "Architectural"], environment: "A practical foundry of material bins, sketch walls, safety checks, rough prototypes, test tables, failure notes, and revision bays.", metaphor: "Ideas become visible early, fail safely, and improve because teams record what a real test changed.", entry: "Problem bench", destination: "Evidence-tested prototype", progressNoun: "prototype cycles", icon: "⚙", sky: "#e8e1d4", ground: "#443d37", accent: "#e2a14c", accent2: "#708a91", ink: "#fffaf0", glow: "#f0c77d" }),
  "adst-code": world({ id: "adst-code", name: "Cosmic Code Mission", family: "cosmic", spectrum: ["Cosmic", "Technological"], environment: "A mission-control world of clear instructions, inputs, outputs, loops, debugging signals, accessibility checks, and explainable code.", metaphor: "A sequence becomes a mission plan; bugs become evidence that helps the team revise the next command.", entry: "Command console", destination: "Reliable signal launch", progressNoun: "systems debugged", icon: "{ }", sky: "#161c39", paperSoft: "#edf3ff", ground: "#0b1024", accent: "#eeb957", accent2: "#718dc7", ink: "#f8fbff", glow: "#a9c7ff" }),

  "phe-belonging": world({ id: "phe-belonging", name: "The Community Field", family: "garden", spectrum: ["Natural", "Architectural"], environment: "A welcoming field with many roles, safe edges, varied routes, team signals, and no elimination gate.", metaphor: "The field works when everyone can enter, contribute, adjust, and help the group play more safely and fairly.", entry: "Welcome line", destination: "Everyone-in play", progressNoun: "belonging moves", icon: "○", sky: "#dfeeda", ground: "#2b5136", accent: "#edb24f", accent2: "#73a66f", ink: "#fbfff6", glow: "#e3ef9f" }),
  "phe-strategy": world({ id: "phe-strategy", name: "The Living Gameboard", family: "city", spectrum: ["Architectural", "Artistic"], environment: "A changing gameboard of space, timing, teammates, rhythm routes, strategy zones, leadership roles, and fair rule remixes.", metaphor: "Students learn to read the whole field, choose a useful move, and redesign conditions so more people can succeed.", entry: "Notice zone", destination: "Strategy commons", progressNoun: "plays remixed", icon: "↗", sky: "#e0ecd9", ground: "#304b39", accent: "#edb04e", accent2: "#6f9f75", ink: "#fbfff7", glow: "#e7f0a5" }),
  "phe-health": world({ id: "phe-health", name: "Safe Harbour", family: "harbour", spectrum: ["Natural", "Architectural"], environment: "A calm harbour of trusted-source beacons, private question routes, fictional decision docks, boundaries, support maps, and safe next steps.", metaphor: "Reliable information and trusted help act as navigation lights; students choose a safer course without revealing private experiences.", entry: "Question cove", destination: "Trusted-help lighthouse", progressNoun: "safe routes", icon: "◉", sky: "#deedf0", ground: "#244751", accent: "#eab258", accent2: "#68a0a2", ink: "#f6fdff", glow: "#cdf0e9" }),
  "phe-life": world({ id: "phe-life", name: "Choose-Your-Trail Highlands", family: "mountain", spectrum: ["Natural", "Fantastical"], environment: "A broad highland trail system with gentle paths, steep routes, rest shelters, water stops, weather choices, and many satisfying destinations.", metaphor: "Students notice effort, access, skill, recovery, and enjoyment, then choose a realistic route that fits their life rather than someone else's pace.", entry: "Trail-choice board", destination: "Personal activity lookout", progressNoun: "trail choices", icon: "⌃", sky: "#dbecef", ground: "#2e4d43", accent: "#efb14f", accent2: "#6ea082", ink: "#f9fff8", glow: "#dff1b8" }),

  "career-learning": world({ id: "career-learning", name: "Learning Basecamp", family: "mountain", spectrum: ["Natural", "Architectural"], environment: "A flexible basecamp of strength tools, learning-condition shelters, goal routes, support signals, and space to change plans.", metaphor: "Students pack evidence of what helps right now, choose one responsibility, and set a realistic next camp rather than a permanent label.", entry: "Strengths supply table", destination: "Next-step camp", progressNoun: "tools gathered", icon: "⌂", sky: "#e8eadb", ground: "#4b4932", accent: "#e6aa4d", accent2: "#7c9a6b", ink: "#fffbee", glow: "#ece2a0" }),
  "career-trust": world({ id: "career-trust", name: "The Trust Commons", family: "city", spectrum: ["Architectural", "Technological"], environment: "A shared commons of team tables, public and private windows, digital footprints, rotating roles, repair stations, and community agreements.", metaphor: "Every choice leaves a trace; trust grows through credit, privacy, inclusion, follow-through, and repair.", entry: "Audience window", destination: "Reliable team square", progressNoun: "trust signals", icon: "◇", sky: "#e5e8df", ground: "#3c493f", accent: "#dfaa51", accent2: "#758e7e", ink: "#fbfff7", glow: "#eadb9d" }),
  "career-project": world({ id: "career-project", name: "The Project Rescue Yard", family: "workshop", spectrum: ["Architectural", "Technological"], environment: "A rescue yard of tangled task cards, milestone boards, role stations, dependency bridges, risk flags, and review checkpoints.", metaphor: "Students turn one stressful project into visible, ordered, safer work that a team can actually manage.", entry: "Tangled plan pile", destination: "Working project route", progressNoun: "milestones rescued", icon: "☷", sky: "#ece4d6", ground: "#494139", accent: "#dda048", accent2: "#778c91", ink: "#fffaf0", glow: "#efd08a" }),
  "career-futures": world({ id: "career-futures", name: "The Futures Constellation", family: "cosmic", spectrum: ["Cosmic", "Artistic"], environment: "A constellation map connecting people, care, service, tools, art, technology, community roles, mentors, pathways, and low-risk next experiences.", metaphor: "No future stands alone; students trace networks of contribution and choose one nearby star to explore next.", entry: "Familiar project star", destination: "Next-experience constellation", progressNoun: "connections illuminated", icon: "✦", sky: "#1d213d", paperSoft: "#f1f0fa", ground: "#101426", accent: "#efba58", accent2: "#8086cb", ink: "#fbfaff", glow: "#c8cfff" }),
};

const fallbackWorld = world({
  id: "classroom-os",
  name: "Classroom OS Basecamp",
  family: "workshop",
  spectrum: ["Architectural", "Artistic"],
  environment: "A familiar learning basecamp where questions, vocabulary, discussion, trying, evidence, inquiry, and reflection stay easy to find.",
  metaphor: "The environment changes; the learning tools remain in the same dependable places.",
  entry: "Wonder",
  destination: "Explain and reflect",
  progressNoun: "learning moves",
  icon: "⌂",
  sky: "#e7ece7",
  ground: "#28483a",
  accent: "#dda64f",
  accent2: "#6d9682",
  ink: "#fbfff9",
  glow: "#e7db9d",
});

export function worldFor(id?: string | null): UnitWorldTheme {
  return (id && unitWorlds[id]) || fallbackWorld;
}

export function worldStyle(theme: UnitWorldTheme): CSSProperties {
  const paperSoft = theme.paperSoft ?? theme.sky;
  return {
    "--world-sky": theme.sky,
    "--world-paper-soft": paperSoft,
    "--world-ground": theme.ground,
    "--world-accent": theme.accent,
    "--world-accent-2": theme.accent2,
    "--world-ink": theme.ink,
    "--world-glow": theme.glow,
    "--world-image": theme.image ? `url(${theme.image})` : "none",
    "--world-position": theme.imagePosition ?? "center",
    /* Compatibility aliases let existing renderers inherit a world safely. */
    "--subject": theme.ground,
    "--soft": paperSoft,
    "--unit": theme.ground,
    "--unit-soft": paperSoft,
    "--social": theme.ground,
    "--social-soft": paperSoft,
  } as CSSProperties;
}

export function worldSpectrumLabel(theme: UnitWorldTheme) {
  return theme.spectrum.join(" · ");
}

const studentCalls: Record<WorldFamily, string> = {
  forest: "Follow the strange clue. If the expected path does not work, test another one and show what you found.",
  river: "Follow what changes as it moves. Notice what gets carried, what gets stuck, and where you could change the flow.",
  mountain: "Take one measured step at a time. Check the route—and choose a different path when it works better for you.",
  garden: "Notice what is connected. Grow one idea, test it, and care for the people and places your choice affects.",
  archive: "Open the clues. Ask who chose what was saved, whose voice is missing, and what another source could change.",
  city: "Explore how the system works. Try more than one route. If a route leaves people out, redesign it.",
  studio: "Make something only you would make. Let an audience experience it, then change what truly helps.",
  workshop: "Build a rough version before it feels perfect. A failed test is information you can use—not the end.",
  laboratory: "Predict first. Make the test honest. Let the result surprise you or prove your first idea wrong.",
  civic: "Ask who gets to decide, who gets ignored, and how people can question power. Use evidence to make the next step fairer.",
  cosmic: "Zoom out. Stay curious. Test the model, then say what it explains and where the mystery continues.",
  harbour: "Trace who gains, who carries the cost, and who is missing from the story. Imagine what could change upstream.",
};

export function studentWorldCall(theme: UnitWorldTheme) {
  if (theme.id === "math-number") return "Zoom in. Zoom out. Put every number on a shared scale, then show how you know where it belongs.";
  return studentCalls[theme.family];
}
