export type Subject = {
  name: string;
  short: string;
  icon: string;
  color: string;
  soft: string;
  units: number;
  status: string;
  updated?: string;
  sourceUrl: string;
};

export const subjects: Subject[] = [
  { name: "English Language Arts", short: "Language Arts", icon: "Aa", color: "#7459a6", soft: "#eee9f7", units: 6, status: "6 arcs · 14 signature experiences", updated: "Updated Sep. 3", sourceUrl: "https://curriculum.gov.bc.ca/curriculum/english-language-arts/6/core" },
  { name: "Mathematics", short: "Mathematics", icon: "÷", color: "#98421f", soft: "#fae9df", units: 6, status: "6 units · 15 signature experiences", updated: "Updated Sep. 3", sourceUrl: "https://curriculum.gov.bc.ca/curriculum/mathematics/6/core" },
  { name: "Science", short: "Science", icon: "⌬", color: "#347d72", soft: "#deeeea", units: 4, status: "4 units · 19 classroom-ready lessons", updated: "Updated Sept. 1", sourceUrl: "https://curriculum.gov.bc.ca/curriculum/science/6/core" },
  { name: "Social Studies", short: "Social Studies", icon: "◎", color: "#4f75a6", soft: "#e2eaf4", units: 4, status: "4-unit experience pathway", updated: "Updated Aug. 13", sourceUrl: "https://curriculum.gov.bc.ca/curriculum/social-studies/6/core" },
  { name: "Arts Education", short: "Arts Education", icon: "✦", color: "#8f3e5d", soft: "#f7e3e9", units: 4, status: "4 arcs · 6 complete studio pathways", updated: "Updated Sept. 1", sourceUrl: "https://curriculum.gov.bc.ca/curriculum/arts-education/6/core" },
  { name: "Applied Design, Skills & Technologies", short: "ADST", icon: "⌘", color: "#4c677c", soft: "#e4eaee", units: 5, status: "5 arcs · 8 design missions", updated: "Updated Sept. 1", sourceUrl: "https://curriculum.gov.bc.ca/curriculum/adst/6/core" },
  { name: "Physical & Health Education", short: "Physical & Health", icon: "↗", color: "#2f6b3d", soft: "#e3f0e6", units: 4, status: "4 year-round arcs · 6 experiences", updated: "Updated Sep. 3", sourceUrl: "https://curriculum.gov.bc.ca/curriculum/physical-health-education/6/core" },
  { name: "Career Education", short: "Career Education", icon: "◇", color: "#765224", soft: "#f6ead7", units: 4, status: "4 arcs · 6 real-life studios", updated: "Updated Sep. 3", sourceUrl: "https://curriculum.gov.bc.ca/curriculum/career-education/6/core" },
];
