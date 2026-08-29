import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend Architecture",
    description: "Production web applications, state synchronization, and reactive UIs.",
    items: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Responsive & Print CSS"],
    featured: true,
  },
  {
    category: "Backend & Systems",
    description: "Asynchronous APIs, multi-tenant isolation, and high-throughput routing.",
    items: ["Node.js", "Python", "FastAPI (asyncpg)", "Prisma ORM", "Drizzle ORM", "REST & Webhook Handlers"],
    featured: true,
  },
  {
    category: "AI & Vector Search (RAG)",
    description: "End-to-end document chunking, hybrid vector retrieval, and LLM orchestration.",
    items: ["OpenAI & Grok APIs", "pgvector (Cosine Similarity)", "BM25 Hybrid Retrieval", "LangChain", "Multilingual Embeddings", "Context Grounding"],
    featured: true,
  },
  {
    category: "Databases & Storage",
    description: "Relational data modeling, tenant cascading, and cloud object storage.",
    items: ["PostgreSQL", "Neon Serverless", "Supabase", "MongoDB", "Cloudflare R2"],
    featured: false,
  },
  {
    category: "Third-Party APIs & Ecosystem",
    description: "Certified integrations, webhook orchestration, and payment engines.",
    items: ["WhatsApp Cloud API", "Meta Tech Provider Token Router", "Stripe Checkout", "Resend Email", "Sanity Headless CMS"],
    featured: true,
  },
  {
    category: "Cloud, DevOps & Tooling",
    description: "Deployment pipelines, observability, containerization, and version control.",
    items: ["Vercel", "Docker", "Git & GitHub Actions", "Sentry Monitoring", "Hugging Face Spaces"],
    featured: false,
  },
];

