export type CaseStudyStep = { problem: string; solution: string };
export type CaseStudyBlock = { title: string; body: string };

export type CaseStudy = {
  context: string; // small line under the title (role / project context)
  slogan?: string; // optional brand line, e.g. "Bot nahi. Aura."
  overview: string; // what it is and why I built it
  problem?: string; // "The problem" narrative (richer case studies)
  solution?: string; // "The solution" narrative
  capabilities?: string[]; // core capabilities / feature bullets
  architecture?: CaseStudyBlock[]; // key technical decisions (title + body)
  challenges: CaseStudyStep[]; // problem → how I solved it
  results?: string[]; // outcomes / what shipped
  uiux?: string[]; // UI/UX decisions
  learned?: string[]; // what I took away
  stackSummary?: string[]; // full tech stack (rendered as tags)
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  links: { live?: string; github?: string; caseStudy?: string };
  featured?: boolean;
  deepDive?: boolean;
  caseStudy?: CaseStudy;
};

export type SkillGroup = { category: string; items: string[] };
export type Social = { label: string; href: string; handle: string };
