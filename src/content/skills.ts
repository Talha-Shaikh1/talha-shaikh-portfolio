import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  { category: "Frontend", items: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Python", "FastAPI", "Prisma", "REST APIs"] },
  { category: "AI / RAG", items: ["OpenAI SDK", "LangChain", "RAG & retrieval", "Vector search (pgvector)", "Prompt engineering"] },
  { category: "Database", items: ["PostgreSQL", "Neon", "Supabase", "MongoDB"] },
  { category: "Infra / Tools", items: ["Vercel", "Docker", "Git", "Sanity CMS"] },
  { category: "Integrations", items: ["WhatsApp Cloud API", "Meta Tech Provider", "Webhooks", "Stripe"] },
];
