export type IssueSource = {
  id: string;
  title: string;
  organization: string;
  url: string;
  kind: "map" | "policy" | "article" | "data" | "learning-resource";
  access: "student-ready" | "teacher-excerpt";
  lookFor: string;
};

export type IssueInvestigation = {
  id: string;
  scope: "CANADA" | "WORLD" | "CANADA + WORLD";
  title: string;
  question: string;
  whyItMatters: string;
  lessonIds: readonly string[];
  suggestedTiming: string;
  checkedOn: string;
  reviewBy: string;
  sources: readonly IssueSource[];
  quickLook: readonly string[];
  deepDive: readonly string[];
  teamProduct: string;
  groupRoles: string;
  teacherNote: string;
  offlineFallback: string;
  spacesUse: "none" | "possible-selected-evidence";
  familyPrompt: string;
};

export const issueInvestigations: readonly IssueInvestigation[] = [
  {
    id: "arctic-sovereignty-inuit-nunangat",
    scope: "CANADA + WORLD",
    title: "Who decides in the Arctic?",
    question: "What should sovereignty mean in a region that is Canadian territory, an Inuit homeland, and part of a changing international Arctic?",
    whyItMatters: "Students compare three real uses of power: a country protecting territory, Inuit exercising self-determination, and countries cooperating under international rules.",
    lessonIds: ["compare-government-systems", "cooperation-control-room"],
    suggestedTiming: "Unit 2 bridge or Unit 3 cooperation case · 30–55 min",
    checkedOn: "2026-08-22",
    reviewBy: "2027-01-31",
    sources: [
      { id: "itk-inuit-nunangat-map", title: "Inuit Nunangat Map", organization: "Inuit Tapiriit Kanatami", url: "https://itk.ca/inuit-nunangat-map/", kind: "map", access: "student-ready", lookFor: "Notice that Inuit Nunangat includes land, water, ice, and four regions. Compare it with a standard political map of Canada." },
      { id: "canada-arctic-foreign-policy", title: "Canada's Arctic Foreign Policy", organization: "Global Affairs Canada", url: "https://international.canada.ca/en/global-affairs/corporate/reports/arctic-policy-2024", kind: "policy", access: "teacher-excerpt", lookFor: "Find how the federal government connects sovereignty, security, international cooperation, Indigenous self-determination, and northern communities." },
      { id: "can-geo-who-owns-arctic", title: "On thin ice: Who ‘owns’ the Arctic?", organization: "Canadian Geographic", url: "https://canadiangeographic.ca/articles/on-thin-ice-who-owns-the-arctic/", kind: "article", access: "teacher-excerpt", lookFor: "Use one map, caption, or short passage to identify a disagreement, a shared interest, and a question the article cannot settle by itself." },
    ],
    quickLook: ["Project the ITK map without explanation for 30 seconds.", "Teams point to two details that change or complicate the phrase ‘Canada's North.’", "Build one careful sentence beginning: ‘Sovereignty here involves…’"],
    deepDive: ["Compare the ITK map with one paragraph from Canada's policy and one Canadian Geographic map or passage.", "Sort claims under territorial control, Inuit self-determination, environmental responsibility, and international cooperation.", "Write a recommendation naming who must help make an Arctic decision and why."],
    teamProduct: "A four-part Arctic decision map: territory · homeland · responsibility · cooperation",
    groupRoles: "Map reader · evidence finder · perspective checker · reporter",
    teacherNote: "Do not teach the Arctic as empty land Canada must ‘claim.’ Begin with Inuit Nunangat and keep Inuit-created evidence attached to the inquiry.",
    offlineFallback: "Print or project the credited ITK map and three short teacher-selected excerpts. The discussion and decision map need no student devices.",
    spacesUse: "possible-selected-evidence",
    familyPrompt: "When a place is both a homeland and part of a country, who should help make decisions about it?",
  },
  {
    id: "first-nations-data-sovereignty",
    scope: "CANADA",
    title: "Who controls community information?",
    question: "Why might a First Nation require ownership, control, access, and possession of information about its people and community?",
    whyItMatters: "Data is not neutral. This investigation connects research, privacy, power, and First Nations self-determination without treating one framework as universal to all Indigenous Peoples.",
    lessonIds: ["data-skyline", "trace-the-claim"],
    suggestedTiming: "Before community data, surveys, or graphing · 20–40 min",
    checkedOn: "2026-08-22",
    reviewBy: "2027-06-30",
    sources: [
      { id: "fnigc-ocap", title: "The First Nations Principles of OCAP®", organization: "First Nations Information Governance Centre", url: "https://fnigc.ca/ocap-training/", kind: "learning-resource", access: "student-ready", lookFor: "Find what each letter means and why FNIGC describes OCAP® as a path toward First Nations data sovereignty." },
      { id: "fnigc-data-sovereignty", title: "Data Sovereignty Research Collaborative", organization: "First Nations Information Governance Centre", url: "https://fnigc.ca/what-we-do/dsrc-2/", kind: "article", access: "teacher-excerpt", lookFor: "Find the connection between information, collective rights, self-determination, and self-government." },
    ],
    quickLook: ["Reveal Ownership, Control, Access, and Possession one at a time.", "Pairs match each principle to a realistic school or community-data decision.", "Name one question a researcher should ask before collecting or sharing information."],
    deepDive: ["Audit a fictional community survey: who chose the questions, stores the data, sees it, explains it, and decides what is published?", "Revise the plan so community authority and responsibility are visible.", "Explain why privacy alone does not answer every data-sovereignty question."],
    teamProduct: "A before-and-after information-governance plan",
    groupRoles: "Question reader · rights checker · plan reviser · reporter",
    teacherNote: "OCAP® is specifically a First Nations framework. Do not relabel it as a generic Indigenous framework or apply it to a Nation without context.",
    offlineFallback: "Use the existing Classroom OS OCAP® infographic and a fictional survey card; teams can complete the audit on paper.",
    spacesUse: "none",
    familyPrompt: "Who should decide how information about a community is collected, explained, and shared?",
  },
  {
    id: "democracy-information-pressure",
    scope: "CANADA",
    title: "Can a democracy decide well with unreliable information?",
    question: "How can people protect democratic decisions from misleading information without giving one person control over every idea?",
    whyItMatters: "Students practise verification, disagreement, and democratic responsibility using Canadian civic-education resources rather than partisan claims.",
    lessonIds: ["trace-the-claim", "compare-government-systems", "civic-decision-brief"],
    suggestedTiming: "Unit 1 media bridge or Unit 2 democracy case · 25–50 min",
    checkedOn: "2026-08-22",
    reviewBy: "2027-06-30",
    sources: [
      { id: "elections-digital-skills", title: "Digital Skills for Democracy", organization: "Elections Canada", url: "https://electionsanddemocracy.ca/digital-skills-democracy", kind: "learning-resource", access: "student-ready", lookFor: "Identify the verification strategies and why trustworthy information matters before a political or election decision." },
      { id: "mediasmarts-break-fake", title: "Break the Fake quizzes", organization: "MediaSmarts", url: "https://mediasmarts.ca/digital-media-literacy/educational-games/break-fake-quizzes", kind: "learning-resource", access: "student-ready", lookFor: "Try one teacher-previewed example, then name the clue that helped and the check that still matters." },
    ],
    quickLook: ["Project one teacher-previewed claim or quiz item.", "Teams vote: share, pause and check, or stop—and point to the reason.", "Choose the fastest trustworthy next check."],
    deepDive: ["Compare a claim, its original source, and a repost or altered version.", "Test which verification strategy works best and which could still fail.", "Design a three-step class response that protects both open discussion and careful checking."],
    teamProduct: "A Share · Pause + Check · Stop decision card with evidence",
    groupRoles: "Claim reader · source tracer · strategy tester · reporter",
    teacherNote: "Use fictional or low-temperature examples before live political claims. The assessment target is verification and reasoning—not agreement with a political position.",
    offlineFallback: "Print three versions of one fictional claim and its source record. Teams trace changes with highlighters or coloured pencils.",
    spacesUse: "none",
    familyPrompt: "What should we check before a dramatic online claim affects a public decision?",
  },
  {
    id: "ai-transparency-power-canada",
    scope: "CANADA",
    title: "Who should know when AI is involved?",
    question: "What should people be told about an AI system or AI-made content so they can question, challenge, and make an informed decision?",
    whyItMatters: "Canada is holding a real public consultation on AI transparency. Students can investigate a live governance question without being told that either unrestricted technology or maximum control is automatically best.",
    lessonIds: ["trace-the-claim", "compare-government-systems", "civic-decision-brief"],
    suggestedTiming: "Live Canadian Source Lab before Sept. 23, 2026; reusable governance case afterward · 20–45 min",
    checkedOn: "2026-08-27",
    reviewBy: "2026-09-23",
    sources: [
      { id: "ised-ai-transparency-consultation", title: "Have your say on advancing AI transparency in Canada", organization: "Innovation, Science and Economic Development Canada", url: "https://ised-isde.canada.ca/site/ised/en/have-your-say-advancing-ai-transparency-canada", kind: "policy", access: "student-ready", lookFor: "Find what information the government is considering requiring, who would use it, and what problem transparency is meant to solve. Keep the Sept. 23 consultation deadline attached." },
      { id: "unicef-ai-children-guidance", title: "Guidance on AI and children", organization: "UNICEF Innocenti", url: "https://www.unicef.org/innocenti/reports/policy-guidance-ai-children", kind: "learning-resource", access: "teacher-excerpt", lookFor: "Use the child-centred requirements on privacy, fairness, transparency, accountability, inclusion, well-being, and children's participation to test the Canadian questions." },
    ],
    quickLook: ["Project one consultation question without the surrounding explanation.", "Teams choose what a person should be told before trusting or challenging the system.", "Name who would benefit from that information and one limit of disclosure alone."],
    deepDive: ["Compare the Canadian consultation topics with two child-rights requirements from UNICEF.", "Design a short AI information label: purpose, data, limits, human responsibility, appeal, and environmental information.", "Stress-test the label against a school tutor, hiring screen, medical tool, deepfake, and AI companion."],
    teamProduct: "An AI information label plus one reason it helps and one serious limit",
    groupRoles: "Consultation reader · child-rights checker · rule designer · challenger",
    teacherNote: "A consultation describes possible policy choices; it is not settled law. Do not ask students to submit personal information. A class response, if ever shared, requires separate teacher and district review.",
    offlineFallback: "Use a teacher-selected excerpt from the consultation, six information-label cards, and the UNICEF child-rights headings. The decision task needs no accounts or student devices.",
    spacesUse: "none",
    familyPrompt: "What should a company or government have to tell you before AI influences an important decision about you?",
  },
  {
    id: "ai-energy-physical-system",
    scope: "CANADA + WORLD",
    title: "What does an AI answer physically require?",
    question: "When might using AI be worth the electricity, cooling, equipment, minerals, networks, and replacement hardware it requires?",
    whyItMatters: "Students connect apparently weightless digital activity to physical systems while also investigating ways AI could improve energy, climate research, monitoring, transportation, and waste reduction.",
    lessonIds: ["data-skyline", "responses-under-pressure", "space-under-constraints"],
    suggestedTiming: "Science systems, Mathematics data, Earth Day, or ADST constraints · 30–55 min",
    checkedOn: "2026-08-27",
    reviewBy: "2027-01-31",
    sources: [
      { id: "iea-energy-and-ai", title: "Energy and AI", organization: "International Energy Agency", url: "https://www.iea.org/reports/energy-and-ai", kind: "data", access: "teacher-excerpt", lookFor: "Use dated ranges and scenarios. Separate all data-centre demand from the AI share, distinguish observations from projections, and compare energy for AI with AI for energy." },
      { id: "iea-energy-ai-observatory", title: "Energy and AI Observatory", organization: "International Energy Agency", url: "https://www.iea.org/data-and-statistics/data-tools/energy-and-ai-observatory", kind: "data", access: "teacher-excerpt", lookFor: "Choose one teacher-prepared graph or comparison and keep its unit, geography, year, scenario, and uncertainty visible." },
      { id: "unesco-ai-environment", title: "Recommendation on the Ethics of Artificial Intelligence", organization: "UNESCO", url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics", kind: "policy", access: "student-ready", lookFor: "Find why environmental and ecosystem well-being belongs in AI decisions alongside human rights, fairness, and oversight." },
    ],
    quickLook: ["Build the chain: request → network → data centre → chips → electricity and cooling → response.", "Zoom out to minerals, manufacturing, transport, replacement, and e-waste.", "Sort four uses as likely worth it, likely not worth it, or need evidence—and name the missing measurement."],
    deepDive: ["Read one dated IEA chart as an estimate or projection, not a universal per-request fact.", "Compare one environmental cost with one possible environmental benefit and identify who receives each.", "Design a community decision card with need, alternatives, resource evidence, affected groups, safeguards, and review date."],
    teamProduct: "A physical AI system map plus a conditional recommendation: worth it when… not worth it when… still need to know…",
    groupRoles: "System mapper · data reader · benefit checker · uncertainty reporter",
    teacherNote: "Avoid viral claims that assign one fixed amount of water or electricity to every prompt. Model choice, location, grid, workload, cooling, and system boundary can change estimates substantially.",
    offlineFallback: "Use the Classroom OS physical-system infographic, one printed dated IEA graph, and use-case cards. Students can map and reason without running AI.",
    spacesUse: "possible-selected-evidence",
    familyPrompt: "Which uses of AI seem worth real resources, and what would you want measured before deciding?",
  },
  {
    id: "forced-displacement-education",
    scope: "WORLD",
    title: "What happens to learning when people are forced to move?",
    question: "What responsibilities do countries and communities have when conflict or persecution interrupts a child's home and education?",
    whyItMatters: "The lesson connects migration, rights, inequality, and international cooperation while avoiding simulations that ask students to pretend to be refugees.",
    lessonIds: ["city-moves", "cooperation-control-room"],
    suggestedTiming: "Unit 3 migration and cooperation · 30–55 min",
    checkedOn: "2026-08-22",
    reviewBy: "2027-01-31",
    sources: [
      { id: "unhcr-global-trends-2025", title: "Global Trends 2025", organization: "UNHCR", url: "https://www.unhcr.org/us/global-trends", kind: "data", access: "teacher-excerpt", lookFor: "Use only two or three dated figures. Distinguish refugees, asylum-seekers, and people displaced inside their own country." },
      { id: "unhcr-education", title: "Education for Refugees", organization: "UNHCR Canada", url: "https://www.unhcr.ca/our-work/ongoing-support/education/", kind: "article", access: "student-ready", lookFor: "Find why education is described as a right, a protection, and a pathway—not simply a charitable extra." },
    ],
    quickLook: ["Project one dated UNHCR chart and its definitions.", "Pairs say what the chart supports and one human experience it cannot show.", "Read one short education passage and add a rights question."],
    deepDive: ["Compare the jobs of a data source and a first-person or program source without treating either as the whole story.", "Map barriers to education before, during, and after displacement.", "Recommend one responsibility for a host government, an international organization, and a school community."],
    teamProduct: "A three-level responsibility map supported by one statistic and one rights source",
    groupRoles: "Data reader · definition checker · rights connector · reporter",
    teacherNote: "Do not run a refugee role-play or ask students to disclose family migration histories. Use named sources, voluntary connections, and asset-based language.",
    offlineFallback: "Use a printed UNHCR chart, a short attributed education excerpt, and responsibility cards at tables.",
    spacesUse: "possible-selected-evidence",
    familyPrompt: "If a child is forced to leave home, which responsibilities belong to governments, international organizations, and schools?",
  },
  {
    id: "climate-justice-adaptation",
    scope: "CANADA + WORLD",
    title: "Who faces the effects—and who shapes the response?",
    question: "How should climate responses change when causes, impacts, resources, and decision-making power are not shared equally?",
    whyItMatters: "Students move beyond a generic ‘save the planet’ message by comparing evidence, unequal impacts, Indigenous-led adaptation, and realistic responsibilities.",
    lessonIds: ["data-skyline", "cooperation-control-room", "responses-under-pressure"],
    suggestedTiming: "Unit 3 inequality/cooperation or Unit 4 response study · 35–60 min",
    checkedOn: "2026-08-22",
    reviewBy: "2027-01-31",
    sources: [
      { id: "indigenous-youth-climate", title: "Youth on the Frontlines: Indigenous Youth Leading Climate Innovation", organization: "Indigenous Climate Hub", url: "https://indigenousclimatehub.ca/2025/06/youth-on-the-frontlines-indigenous-youth-leading-climate-innovation/", kind: "article", access: "student-ready", lookFor: "Identify what young people are doing, what knowledge guides the work, and who controls the response." },
      { id: "unicef-school-disruption", title: "Nearly a quarter of a billion children's schooling was disrupted by climate crises in 2024", organization: "UNICEF Canada", url: "https://www.unicef.ca/en/press-release/nearly-quarter-billion-childrens-schooling-was-disrupted-climate-crises-2024-unicef", kind: "data", access: "teacher-excerpt", lookFor: "Keep the year, population, and definition attached to the headline number. Find one concrete adaptation response." },
      { id: "owid-co2-explorer", title: "CO₂ and Greenhouse Gas Emissions Data Explorer", organization: "Our World in Data · Global Carbon Project data", url: "https://ourworldindata.org/explorers/co2", kind: "data", access: "teacher-excerpt", lookFor: "Compare two carefully chosen measures. Notice how annual, per-person, and historical emissions answer different questions." },
    ],
    quickLook: ["Begin with one youth-led adaptation example—not a disaster montage.", "Teams name the problem, the response, who leads it, and one source detail.", "Ask what power or resource makes the response possible."],
    deepDive: ["Compare one impact indicator, one emissions measure, and one Indigenous-led adaptation example.", "Sort possible responses by relief, adaptation, prevention, and system change; allow overlap.", "Recommend a response while naming who must shape it and one serious limit."],
    teamProduct: "A climate-response card: evidence · affected people · decision-makers · action · limit",
    groupRoles: "Evidence reader · impact mapper · power checker · reporter",
    teacherNote: "Avoid doom-heavy imagery and individual-blame endings. Keep Indigenous youth and communities as present-day leaders and knowledge holders, not decorative perspectives.",
    offlineFallback: "Use one printed data card and one attributed adaptation story. Teams sort response cards and defend one placement.",
    spacesUse: "possible-selected-evidence",
    familyPrompt: "How should a climate response change when the people most affected did not create most of the problem?",
  },
];

/**
 * Returns the shared issue source sets intentionally mapped to a lesson.
 * The investigation records remain the single source of truth for Newsroom,
 * Teacher, and Student experiences.
 */
export function issueInvestigationsForLesson(lessonId: string): readonly IssueInvestigation[] {
  return issueInvestigations.filter((investigation) => investigation.lessonIds.includes(lessonId));
}
