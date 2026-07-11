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
};

export type SkillGroup = { category: string; items: string[] };
export type Social = { label: string; href: string; handle: string };
