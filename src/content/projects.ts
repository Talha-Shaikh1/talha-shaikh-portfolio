import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "botaura",
    name: "Botaura",
    tagline: "Live multi-tenant RAG chatbot SaaS for Pakistani SMBs, with WhatsApp automation.",
    description:
      "A production SaaS that lets small businesses run a grounded AI chatbot over their own content and connect it to WhatsApp Business — built solo, and operated as a Meta WhatsApp Tech Provider.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Python", "WhatsApp Cloud API", "OpenAI"],
    highlights: [
      "Designed row-level multi-tenant isolation so each business's documents, embeddings, and conversations stay separate.",
      "Built the RAG pipeline end to end: chunking, embeddings, cosine retrieval, and grounded generation with strict answer-only-from-context prompting.",
      "Integrated the WhatsApp Cloud API as a Meta Tech Provider — webhooks, message templates, and delivery/status reconciliation.",
    ],
    // TODO(talha): add the live Botaura URL (links.live) — confirmed live but URL not yet provided.
    links: { caseStudy: "/projects/botaura" },
    featured: true,
    deepDive: true,
  },
  {
    slug: "bait-ul-kutub",
    name: "Bait-ul-Kutub LMS",
    tagline: "Full-stack Library Management System with AI-powered search and real-time tracking.",
    description:
      "A full-stack library management system: catalog, members, and loans, with an AI-assisted search/recommendation layer over the collection.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI"],
    highlights: [
      "Modeled the full library domain (books, members, loans) in PostgreSQL via Prisma, with real-time availability tracking.",
      "Added an AI-powered search and recommendation layer over the catalog using the OpenAI SDK.",
    ],
    links: { live: "https://bait-ul-kutub.vercel.app/", github: "https://github.com/Talha-Shaikh1" },
    featured: true,
    deepDive: false,
  },
  {
    slug: "humanoid-robotics",
    name: "AI Humanoid Robotics Platform",
    tagline: "Interactive platform for teaching Physical AI and humanoid robotics with ROS 2.",
    description:
      "An interactive digital platform that teaches Physical AI and humanoid robotics concepts, visualizing ROS 2 architecture with natural-language search.",
    stack: ["Next.js", "Python", "ROS 2", "OpenAI"],
    highlights: [
      "Built an interactive teaching platform that visualizes ROS 2 architecture for Physical AI concepts.",
      "Integrated OpenAI-powered search so learners can query robotics topics in natural language.",
    ],
    links: { live: "https://humanoid-robotic-book-eight.vercel.app/", github: "https://github.com/Talha-Shaikh1/humanoid-robotic-book" },
    featured: true,
    deepDive: false,
  },
  {
    slug: "the-arqa",
    name: "The Arqa — E-Commerce",
    tagline: "High-performance fashion store with a custom admin panel and Stripe checkout.",
    description:
      "A production fashion e-commerce store on a headless CMS, with a custom admin panel and a performance-optimized storefront.",
    stack: ["Next.js", "Sanity", "Stripe", "Tailwind"],
    highlights: [
      "Built a headless storefront on Sanity CMS with a custom admin panel for catalog management.",
      "Optimized for Core Web Vitals and SEO (90+ Lighthouse) and integrated Stripe checkout.",
    ],
    links: { live: "https://thearqa.com/", github: "https://github.com/Talha-Shaikh1" },
    featured: false,
    deepDive: false,
  },
];
