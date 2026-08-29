import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const MILESTONES = [
  {
    period: "2024 – Present",
    role: "Founder & Full-Stack / AI Engineer",
    organization: "Botaura (Multi-Tenant RAG SaaS)",
    description:
      "Engineered a production-ready AI chatbot platform for Pakistani businesses. Architected multi-tenant RAG pipeline with pgvector, integrated WhatsApp Cloud API as a Meta Tech Provider, and deployed automated COD checkout across 162+ routes.",
    tags: ["Next.js 16", "FastAPI", "pgvector", "Meta WhatsApp API", "Multi-Tenancy"],
  },
  {
    period: "2024 – Present",
    role: "Full-Stack & Generative AI Fellow",
    organization: "Governor Sindh Initiative for GenAI (GIAIC)",
    description:
      "Trained in full-stack web systems and agentic AI architectures — mastering Next.js (App Router), TypeScript, Python, FastAPI, OpenAI Agent SDK, vector search (pgvector), and cloud-native containerization.",
    tags: ["Next.js", "Python", "FastAPI", "OpenAI Agent SDK", "RAG & Vector DBs"],
  },

  {
    period: "2023 – 2024",
    role: "Full-Stack Systems & Headless Storefronts",
    organization: "Independent Software Projects",
    description:
      "Built and shipped Bait-ul-Kutub LMS with relational schema design & AI recommendations, The Arqa fashion store with 90+ Lighthouse score, and Comforty headless CMS storefront.",
    tags: ["Prisma", "PostgreSQL", "Sanity CMS", "Stripe", "Core Web Vitals"],
  },
  {
    period: "2022 – 2023",
    role: "Foundational Web Architecture",
    organization: "Self-Directed Intensive Engineering",
    description:
      "Deep dive into TypeScript, modern JavaScript ES6+, browser DOM rendering mechanics, responsive layouts, and print CSS layout engines (Resume Builder).",
    tags: ["TypeScript", "DOM APIs", "Print CSS", "Data Structures"],
  },
];

export function ExperienceTimeline() {
  return (
    <section className="scroll-mt-20 py-20 md:py-24">
      <Container>
        <SectionHeading
          id="experience-heading"
          label="Velocity & Milestones"
          title="Engineering Journey & Track Record"
          kicker="Demonstrated track record of learning rapidly, mastering complex systems, and shipping production software."
        />

        <div className="relative mt-12 border-l border-border pl-6 sm:pl-8 space-y-12">
          {MILESTONES.map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="relative group">
                {/* Timeline indicator node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg group-hover:bg-accent transition-colors" />

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-text">
                    {m.role}{" "}
                    <span className="font-sans text-sm font-normal text-muted">
                      · {m.organization}
                    </span>
                  </h3>
                  <span className="font-mono text-xs font-semibold text-accent">
                    {m.period}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted max-w-3xl">
                  {m.description}
                </p>

                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
