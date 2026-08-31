import type { CurriculumRecord } from "./curriculum";

export type StandardPair = [number, number];

export type ArcAlignment = {
  bigIdeas: number[];
  competencies: StandardPair[];
  content: StandardPair[];
  stage: "Introduce" | "Practise" | "Demonstrate" | "Introduce + practise" | "Practise + demonstrate";
  note: string;
};

export const alignmentByArc: Record<string, ArcAlignment> = {
  "ela-belonging": { bigIdeas: [0, 1], competencies: [[0, 1], [0, 5], [0, 7], [0, 8], [0, 11], [1, 0], [1, 4]], content: [[0, 0], [1, 1], [2, 0]], stage: "Introduce + practise", note: "Oral story, listening, identity, and source context open the year. The First Peoples oral-tradition competency is introduced only through the attributed district source—not through the fictional offline rehearsal." },
  "ela-media": { bigIdeas: [2, 4], competencies: [[0, 0], [0, 3], [0, 5], [1, 2]], content: [[0, 1], [0, 4]], stage: "Practise + demonstrate", note: "Students read visual choices, compare perspectives, and create ethical media." },
  "ela-reading-power": { bigIdeas: [0, 1, 2, 3], competencies: [[0, 3], [0, 9], [0, 10], [1, 1], [1, 2], [1, 3], [1, 5], [1, 6]], content: [[0, 0], [0, 2], [1, 3], [2, 3], [2, 4], [2, 5]], stage: "Practise + demonstrate", note: "Choice reading, turning-point transformations, and the Bloxels story blueprint connect literary structure, original writing, conventions, audience, and revision." },
  "ela-research": { bigIdeas: [3, 4], competencies: [[0, 0], [0, 2], [1, 1], [1, 2]], content: [[0, 1], [1, 0], [1, 2]], stage: "Practise + demonstrate", note: "Different sources do different work; students combine and teach an explanation." },
  "ela-language-lab": { bigIdeas: [0, 3], competencies: [[0, 9], [1, 2], [1, 6]], content: [[0, 3], [2, 0], [2, 5]], stage: "Introduce + practise", note: "Poetry, image, sound, and metaphor develop precise language without losing accuracy." },
  "ela-worldbuilding": { bigIdeas: [0, 1, 3], competencies: [[0, 10], [1, 1], [1, 2], [1, 5]], content: [[0, 0], [0, 2], [1, 3], [2, 5]], stage: "Demonstrate", note: "Narrative design, revision, conventions, and publication come together for an audience." },

  "math-number": { bigIdeas: [1], competencies: [[0, 1], [0, 2], [0, 3], [2, 1]], content: [[0, 0], [0, 1], [0, 2], [0, 3]], stage: "Introduce + practise", note: "Number size, operations, factors, multiples, and flexible strategy are built together." },
  "math-fractions": { bigIdeas: [0, 1], competencies: [[0, 2], [1, 0], [2, 1], [3, 2]], content: [[0, 4], [0, 5], [0, 6], [0, 7], [3, 2]], stage: "Practise + demonstrate", note: "Visual models connect mixed numbers, ratios, decimals, percents, and consumer decisions." },
  "math-patterns": { bigIdeas: [2], competencies: [[0, 0], [0, 4], [1, 1], [2, 1]], content: [[1, 0], [1, 1]], stage: "Introduce + practise", note: "Students move among models, tables, expressions, graphs, and equations." },
  "math-data": { bigIdeas: [4], competencies: [[0, 4], [1, 1], [2, 1], [3, 0]], content: [[3, 0], [3, 1]], stage: "Practise + demonstrate", note: "Line graphs and repeated trials connect claims, scale, and probability." },
  "math-geometry": { bigIdeas: [3], competencies: [[0, 1], [0, 5], [1, 2], [2, 1], [2, 3]], content: [[2, 0], [2, 1], [2, 2], [2, 4], [2, 5]], stage: "Practise + demonstrate", note: "Visual workshops, field measurement, a supplied Zoo design, and a transformation game develop complex perimeter, derived area, angles, triangles, and transformations before the final volume/capacity application." },
  "math-design": { bigIdeas: [3], competencies: [[0, 5], [1, 0], [2, 1], [3, 0]], content: [[2, 0], [2, 1], [2, 3], [3, 2]], stage: "Demonstrate", note: "The final design restores perimeter, area, volume, capacity, and budgeting as a connected application." },

  "arts-place": { bigIdeas: [0, 1, 2], competencies: [[0, 0], [0, 1], [0, 2], [2, 1]], content: [[0, 0], [0, 1], [1, 2]], stage: "Introduce + practise", note: "Students meet visual art, sound, drama, and movement as distinct languages." },
  "arts-power": { bigIdeas: [1, 2, 3], competencies: [[0, 3], [1, 2], [1, 4], [2, 4]], content: [[0, 3], [0, 6], [1, 2]], stage: "Practise + demonstrate", note: "Context, symbol, metaphor, framing, and empathy connect Arts to rights learning." },
  "arts-audience": { bigIdeas: [0, 2], competencies: [[1, 1], [2, 0], [2, 1], [2, 5]], content: [[0, 0], [0, 1], [1, 2]], stage: "Practise + demonstrate", note: "Audience evidence drives artistic intention, critique, and revision." },
  "arts-systems": { bigIdeas: [2], competencies: [[0, 0], [1, 1], [1, 3], [2, 5]], content: [[0, 0], [0, 1], [1, 2]], stage: "Demonstrate", note: "Mixed-media work communicates accurate Science relationships and model limits." },

  "adst-systems": { bigIdeas: [1, 2], competencies: [[1, 4], [2, 2], [2, 7], [3, 1]], content: [[0, 1], [1, 0], [1, 1], [2, 4]], stage: "Introduce + practise", note: "Selected modules: computational thinking, devices/networks, and digital literacy." },
  "adst-access": { bigIdeas: [0], competencies: [[0, 0], [0, 2], [1, 2], [2, 8]], content: [[1, 2], [3, 0], [3, 1]], stage: "Practise + demonstrate", note: "Evidence about users guides requirements, drafting, access, testing, and revision." },
  "adst-game": { bigIdeas: [0, 1, 2], competencies: [[0, 2], [0, 3], [1, 0], [1, 5], [1, 7], [1, 8], [2, 0], [2, 1], [2, 2], [2, 7], [3, 0], [3, 3]], content: [[0, 0], [0, 1], [2, 0], [2, 2], [3, 0], [3, 1], [6, 0], [6, 1], [6, 2], [6, 3]], stage: "Practise + demonstrate", note: "Original narrative, paper planning, Bloxels media production, private playtesting, troubleshooting, creative credit, and revision form one complete design cycle without falsely claiming visual programming." },
  "adst-prototype": { bigIdeas: [0, 1, 2], competencies: [[1, 1], [1, 6], [2, 5], [2, 9]], content: [], stage: "Practise + demonstrate", note: "The design cycle is assessed through connected projects; a specific optional content module is not falsely claimed." },
  "adst-code": { bigIdeas: [1, 2], competencies: [[1, 5], [2, 3], [2, 7], [3, 1]], content: [[0, 0], [0, 1], [0, 3], [1, 2]], stage: "Demonstrate", note: "Algorithms, branches, inputs, outputs, visual code, testing, and communication come together." },

  "phe-belonging": { bigIdeas: [0, 1, 4], competencies: [[0, 0], [0, 1], [0, 3], [1, 9]], content: [[0, 0], [0, 1], [0, 3]], stage: "Introduce + practise", note: "Movement skills, safety, fair play, and access are developed through repeated play." },
  "phe-strategy": { bigIdeas: [0, 1], competencies: [[0, 0], [0, 1], [0, 3], [0, 4]], content: [[0, 0], [0, 1], [0, 3]], stage: "Practise + demonstrate", note: "Small-sided games and rhythm work connect movement concepts with strategy." },
  "phe-health": { bigIdeas: [2, 3, 4], competencies: [[1, 3], [1, 4], [1, 7], [2, 1]], content: [[1, 0], [1, 2], [1, 3], [1, 5]], stage: "Introduce + practise", note: "Teacher-approved sources and fictional cases support private, accurate health learning." },
  "phe-life": { bigIdeas: [0, 1, 3], competencies: [[0, 2], [0, 4], [1, 1], [1, 5]], content: [[0, 2], [0, 4]], stage: "Demonstrate", note: "Students apply effort monitoring, FITT/SAID, preference, and goal setting without ranking bodies." },

  "career-learning": { bigIdeas: [0, 3], competencies: [[0, 0], [0, 8]], content: [[0, 0], [0, 1], [0, 4]], stage: "Introduce + practise", note: "Observable strengths, learning conditions, responsibilities, and realistic goals begin the year." },
  "career-trust": { bigIdeas: [1, 2, 3, 4], competencies: [[0, 1], [0, 3], [0, 6], [0, 7]], content: [[0, 3], [1, 1], [2, 1]], stage: "Practise + demonstrate", note: "Digital identity, inclusion, safety, collaboration, and leadership are connected." },
  "career-project": { bigIdeas: [3, 4, 5], competencies: [[0, 4], [0, 5], [0, 6], [0, 12]], content: [[0, 2], [0, 4], [1, 0]], stage: "Practise + demonstrate", note: "A real project-management lab builds milestones, roles, safety, feedback, and adaptation." },
  "career-futures": { bigIdeas: [0, 5], competencies: [[0, 0], [0, 9], [0, 10], [0, 11]], content: [[1, 0], [1, 3], [2, 0], [2, 2]], stage: "Demonstrate", note: "Work, service, mentors, technology, transferable skills, and low-risk next experiences widen possibilities." },

  "science-body-systems": { bigIdeas: [0], competencies: [[0, 1], [1, 3], [2, 3], [5, 0]], content: [[0, 0]], stage: "Introduce + practise", note: "Students use models, cases, observations, and evidence to explain connected body systems." },
  "science-mixtures": { bigIdeas: [1], competencies: [[0, 2], [1, 1], [2, 2], [3, 0]], content: [[1, 0], [1, 1]], stage: "Practise + demonstrate", note: "Mixture properties, fair tests, separation, local knowledge, and design decisions form one investigation arc." },
  "science-forces-motion": { bigIdeas: [2], competencies: [[0, 3], [1, 3], [2, 4], [4, 2]], content: [[1, 2], [1, 3], [1, 4]], stage: "Practise + demonstrate", note: "Newton's laws, balanced/unbalanced forces, gravity, physical activity, data, and design connect logically." },
  "science-earth-space": { bigIdeas: [3], competencies: [[0, 0], [2, 3], [3, 3], [5, 0]], content: [[2, 0], [2, 1]], stage: "Practise + demonstrate", note: "Evidence, models, scale, position, motion, and Canadian exploration lead to the expert showcase." },

  "social-place-evidence": { bigIdeas: [3], competencies: [[0, 0], [1, 1], [1, 4]], content: [[0, 0], [0, 8]], stage: "Introduce + practise", note: "Maps, claims, perspectives, and a local case teach the evidence tools used later." },
  "social-power-rights": { bigIdeas: [2], competencies: [[0, 0], [1, 4], [1, 5]], content: [[0, 2], [0, 3]], stage: "Practise + demonstrate", note: "Simulations and cases connect power, government systems, rights, remedies, and civic decisions." },
  "social-global-systems": { bigIdeas: [0, 1], competencies: [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5]], content: [[0, 0], [0, 1], [0, 4], [0, 5], [0, 6], [0, 7]], stage: "Introduce + practise", note: "Movement, inequality, resources, trade, conflict, cooperation, and continuity/change are studied as connected systems." },
  "social-solutionary-inquiry": { bigIdeas: [0, 1, 2, 3], competencies: [[0, 0], [0, 1], [1, 0], [1, 1], [1, 3], [1, 4], [1, 5]], content: [[0, 2], [0, 4], [0, 6], [0, 7], [0, 8]], stage: "Demonstrate", note: "Students investigate a system, compare responses, make a teachable prototype, and plan informed action." },
};

export const subjectCoverageNotes: Record<string, { scope: string; strength: string; next: string[] }> = {
  "English Language Arts": { scope: "Coherent year pathway + visible workshop rhythm", strength: "Stories, perspective, media, choice reading, research, poetry, creation, revision, audience, and an attributed Semiahmoo oral-text source lab form a logical year.", next: ["Pilot the Chief Harley Chappell source lab and reconfirm current district and source permissions before teaching.", "Build a compact just-in-time bank for paragraphing, sentence structure, Canadian conventions, spelling, grammar, and punctuation.", "Add two or three accessible shared-text sets so the recurring reading-strategy rhythm is not dependent on one novel."] },
  Mathematics: { scope: "Complete first-pass B.C. content pathway + labelled resource bridges", strength: "Math Antics visual explanations now lead into varied Classroom OS investigations for number, fractions/decimals, patterns/equations, data/probability, geometry, measurement, and financial decisions; MathUP remains the coverage check and optional game/practice shelf.", next: ["Use MathUP and on-page formative checks to decide where the class needs extra practice rather than assigning every extension.", "Keep negative coordinates in May as a short MathUP/WNCP bridge into four-quadrant graphing; do not turn them into a separate Grade 6 integer-operations unit.", "Pilot the sc̓e:ɬxʷəy̓əm and OCAP® source panels in the data lesson, and request local review before publishing any new synthesis of Nation knowledge."] },
  Science: { scope: "Complete thematic map · materials still being supplied", strength: "The four official Big Ideas and content strands align directly to four units; inquiry competencies recur across the half year.", next: ["Complete exact student packs and teacher keys for lessons still marked corrections required.", "Classroom-test the supplied Surrey Indigenous Learning source routes, and request district or local review before publishing a new synthesis graphic.", "Map selected SpacesEDU evidence to exact inquiry competencies."] },
  "Social Studies": { scope: "Broad and logically sequenced", strength: "Evidence and perspective lead into power and rights, global systems, conflict/cooperation, and a solutionary inquiry.", next: ["Attach exact current source excerpts closer to teaching time.", "Deepen the regional/international conflict case without overloading the year.", "Keep Unit 4 response stations current and source-specific."] },
  "Arts Education": { scope: "Four-arts first pass", strength: "Image, sound, drama, movement, perspective, audience, critique, and mixed media recur across the year.", next: ["Add named artists and works from diverse places and times.", "Build an attributed traditional/contemporary First Peoples arts study.", "Add more technique progression, choreographic devices, and music/dance notation."] },
  "Applied Design, Skills & Technologies": { scope: "Selected modules—not every optional ADST strand", strength: "Design process, digital systems, search, accessibility, drafting, Bloxels Media Arts/game design, testing, and visual coding make a coherent selected pathway.", next: ["Label the selected modules clearly in planning and reporting.", "Add one entrepreneurship or food module if time permits.", "Do not claim metalwork, robotics, textiles, woodwork, or every optional strand without teaching them."] },
  "Physical & Health Education": { scope: "Conceptual year-round pathway", strength: "Movement, strategy, exertion, health literacy, identity, relationships, safety, and help seeking are connected.", next: ["Add a recurring movement-skill and FITT/SAID progression.", "Supply a year-round bank of exact games and activity choices.", "Add a concrete food-choice/community-health task using district-approved materials."] },
  "Career Education": { scope: "Strong embedded first pass", strength: "Strengths, goals, identity, teamwork, leadership, project management, mentors, and possible futures connect to real class work.", next: ["Add an authentic service or volunteer experience.", "Return to goals at recurring checkpoints.", "Collect explicit safety evidence through experiential projects."] },
};

export function resolveAlignment(record: CurriculumRecord, alignment: ArcAlignment) {
  const competency = ([group, item]: StandardPair) => record.competencies[group]?.items[item];
  const content = ([group, item]: StandardPair) => record.content[group]?.items[item];
  return {
    bigIdeas: alignment.bigIdeas.map(index => record.bigIdeas[index]).filter(Boolean),
    competencies: alignment.competencies.map(competency).filter(Boolean),
    content: alignment.content.map(content).filter(Boolean),
  };
}
