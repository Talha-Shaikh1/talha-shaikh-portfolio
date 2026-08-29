import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { email, socials } from "@/content/socials";
import { ResumeActions } from "./ResumeActions";

export const metadata: Metadata = {
  title: "Résumé — Muhammad Talha Shaikh | Junior Full-Stack & AI Engineer",
  description:
    "Professional ATS-optimized résumé of Muhammad Talha Shaikh. Junior Full-Stack & AI Engineer specializing in Next.js, TypeScript, Python/FastAPI, and production RAG systems.",
};

export default function ResumePage() {
  const whatsapp = socials.find((s) => s.label.toLowerCase() === "whatsapp");
  const github = socials.find((s) => s.label.toLowerCase() === "github");
  const linkedin = socials.find((s) => s.label.toLowerCase() === "linkedin");

  return (
    <main className="min-h-screen py-10 md:py-16">
      {/* Top Action Bar (Hidden on print) */}
      <Container className="max-w-4xl print:hidden">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm">
          <Button href="/" variant="ghost" className="text-xs">
            ← Back to Portfolio
          </Button>
          <ResumeActions downloadHref={profile.downloadResumeHref} />
        </div>
      </Container>

      {/* Printable / ATS Resume Container */}
      <Container className="max-w-4xl">
        <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 shadow-md print:border-none print:bg-white print:p-0 print:text-black print:shadow-none">
          {/* Header */}
          <header className="border-b border-border pb-6 print:border-gray-300">
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-text print:text-2xl print:text-black">
              MUHAMMAD TALHA SHAIKH
            </h1>
            <p className="mt-1 font-mono text-base md:text-lg font-semibold text-accent print:text-sm print:text-gray-800">
              Junior Full-Stack & AI Engineer
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted print:text-[11px] print:text-gray-700">
              <span>Karachi, Pakistan</span>
              <span>·</span>
              <a href={`mailto:${email}`} className="hover:text-accent print:text-black">
                {email}
              </a>
              <span>·</span>
              {whatsapp ? (
                <a href={whatsapp.href} className="hover:text-accent print:text-black">
                  {whatsapp.handle}
                </a>
              ) : null}
              <span>·</span>
              <a href="https://talhaweb.xyz" className="hover:text-accent print:text-black">
                talhaweb.xyz
              </a>
              <span>·</span>
              {github ? (
                <a href={github.href} className="hover:text-accent print:text-black">
                  github.com/Talha-Shaikh1
                </a>
              ) : null}
              <span>·</span>
              {linkedin ? (
                <a href={linkedin.href} className="hover:text-accent print:text-black">
                  linkedin.com/in/talha-shaikh
                </a>
              ) : null}
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mt-6">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent print:text-xs print:text-black">
              Professional Summary
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text print:text-xs print:text-gray-900">
              High-velocity <strong>Junior Full-Stack & AI Engineer</strong> (~1.5 years of intensive building experience) trained through <strong>GIAIC (Governor Sindh Initiative for GenAI & Web3)</strong>, with a proven track record of architecting, building, and deploying production-grade web systems and AI applications solo. Mastered <strong>Next.js, TypeScript, Python, FastAPI, and OpenAI Agent SDK / RAG</strong> during coursework and applied projects. Architected <strong>Botaura</strong>, a live multi-tenant RAG chatbot SaaS integrated with the WhatsApp Cloud API as a registered <strong>Meta WhatsApp Tech Provider</strong>, and built <strong>TikTok Follow Exchange (getf4f)</strong> with screenshot proof verification. Dedicated to rapid skill acquisition, clean system design, and immediate engineering impact.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mt-6 border-t border-border pt-6 print:border-gray-300 print:pt-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent print:text-xs print:text-black">
              Technical Skills
            </h2>
            <div className="mt-3 space-y-2 text-sm print:text-xs print:space-y-1">
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">Languages & Frameworks:</strong> TypeScript, JavaScript (ES6+), Python, Next.js 16 (App Router, Server Components, Server Actions), React 19, FastAPI, Node.js
              </p>
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">AI & Vector Retrieval (RAG):</strong> OpenAI SDK, OpenAI Agent SDK, LangChain, pgvector, Cosine Similarity & BM25 Hybrid Retrieval, Multilingual Embeddings, Chunking Strategies, Prompt Engineering
              </p>
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">Databases & ORM:</strong> PostgreSQL, Neon DB, Supabase, MongoDB, Prisma ORM, Drizzle ORM
              </p>
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">Cloud & DevOps:</strong> Vercel, Docker, Cloudflare R2, Git & GitHub Actions, Sentry, Hugging Face Spaces
              </p>
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">Integrations & Third-Party APIs:</strong> WhatsApp Cloud API (Meta Tech Provider), Webhook Orchestration, Stripe Payments, Resend, Sanity Headless CMS
              </p>
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">Architecture & Best Practices:</strong> Multi-Tenant Row-Level Security (RLS), RESTful API Design, JWT Authentication, Responsive UI/UX Design, Performance Optimization (90+ Lighthouse)
              </p>
            </div>
          </section>

          {/* Featured Projects & Experience */}
          <section className="mt-6 border-t border-border pt-6 print:border-gray-300 print:pt-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent print:text-xs print:text-black">
              Featured Systems & Engineering Projects
            </h2>

            {/* Botaura */}
            <div className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-bold text-text print:text-sm print:text-black">
                  Botaura — Multi-Tenant RAG AI Chatbot & WhatsApp Commerce SaaS{" "}
                  <span className="font-mono text-xs text-accent print:text-gray-800">[Flagship]</span>
                </h3>
                <span className="font-mono text-xs text-muted print:text-gray-600">Founder & Solo Engineer</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted print:text-[11px] print:text-gray-700">
                Live: <a href="https://botaura.app" className="underline">https://botaura.app</a> · Architecture: <a href="https://talhaweb.xyz/projects/botaura" className="underline">talhaweb.xyz/projects/botaura</a>
              </p>

              <ul className="mt-2.5 space-y-1.5 text-sm text-text print:text-xs print:text-gray-900 print:space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Architected and deployed a multi-tenant SaaS platform</strong> from scratch spanning <strong>162+ production routes</strong>, enabling businesses to train custom AI chatbots on proprietary knowledge bases (docs, catalogs, websites) and automate WhatsApp customer sales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Implemented an end-to-end Hybrid RAG Pipeline:</strong> Integrated OpenAI embeddings with <code className="font-mono text-xs print:text-black">pgvector</code> cosine similarity and BM25 search, handling multilingual English/Roman-Urdu conversations with automated confidence thresholds and human handoff.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Registered as a Meta WhatsApp Tech Provider:</strong> Built a centralized token routing engine by <code className="font-mono text-xs print:text-black">phone_number_id</code>, orchestrating real-time webhooks, message templates, ad attribution, and delivery reconciliations across multiple merchant accounts without exposing per-client secrets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Designed Strict Multi-Tenant Isolation:</strong> Enforced server-side tenant resolution using signed JWTs, business UUID cascading, and hashed API keys, preventing cross-tenant data leakage by design.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Engineered Full Commerce Automation:</strong> Implemented zero-code WhatsApp cash-on-delivery (COD) checkout, cart-recovery automations, broadcast marketing campaigns, and a universal Store API for WooCommerce/Shopify sync.</span>
                </li>
              </ul>
              <p className="mt-2 font-mono text-xs text-muted print:text-[10px] print:text-gray-600">
                <strong>Tech:</strong> Next.js 16, TypeScript, FastAPI, Python (asyncpg), PostgreSQL (Neon), pgvector, Cloudflare R2, Clerk Auth, Resend, Sentry, Meta Graph API.
              </p>
            </div>

            {/* TikTok Follow Exchange (getf4f) */}
            <div className="mt-5 border-t border-border/50 pt-4 print:border-gray-200">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-bold text-text print:text-sm print:text-black">
                  TikTok Follow Exchange (getf4f) — P2P Creator Growth Platform
                </h3>
                <span className="font-mono text-xs text-muted print:text-gray-600">Full-Stack Engineer</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted print:text-[11px] print:text-gray-700">
                Live: <a href="https://f4f-tiktok.vercel.app/" className="underline">https://f4f-tiktok.vercel.app/</a>
              </p>
              <ul className="mt-2.5 space-y-1.5 text-sm text-text print:text-xs print:text-gray-900 print:space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Architected an organic P2P creator exchange platform</strong> with a 24-hour delayed reciprocal task matching engine to protect creators from TikTok algorithmic shadowbans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Engineered screenshot proof verification</strong> and automated trust scoring with -15 penalty rules for unfollow violations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span>Implemented a credit economy with referral bonuses, 48-hour inactivity auto-protection, and admin seed pool cold-start mechanisms.</span>
                </li>
              </ul>
              <p className="mt-2 font-mono text-xs text-muted print:text-[10px] print:text-gray-600">
                <strong>Tech:</strong> Next.js, TypeScript, Clerk Auth, Tailwind CSS, PostgreSQL, PWA.
              </p>
            </div>

            {/* Bait-ul-Kutub */}
            <div className="mt-5 border-t border-border/50 pt-4 print:border-gray-200">

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-bold text-text print:text-sm print:text-black">
                  Bait-ul-Kutub — Smart Library Management System (LMS)
                </h3>
                <span className="font-mono text-xs text-muted print:text-gray-600">Full-Stack Engineer</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-text print:text-xs print:text-gray-900">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span>Modeled relational database architecture in PostgreSQL via Prisma ORM with active loan lifecycles, member tiers, and real-time inventory tracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span>Integrated OpenAI semantic search enabling natural language book queries and contextual recommendations.</span>
                </li>
              </ul>
              <p className="mt-1.5 font-mono text-xs text-muted print:text-[10px] print:text-gray-600">
                <strong>Tech:</strong> Next.js, TypeScript, Prisma ORM, PostgreSQL, Tailwind CSS, OpenAI API.
              </p>
            </div>

            {/* AI Humanoid Robotics Platform */}
            <div className="mt-5 border-t border-border/50 pt-4 print:border-gray-200">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-bold text-text print:text-sm print:text-black">
                  AI Humanoid Robotics Interactive Platform
                </h3>
                <span className="font-mono text-xs text-muted print:text-gray-600">AI & Frontend Engineer</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-text print:text-xs print:text-gray-900">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span>Visualized ROS 2 publisher-subscriber node graphs, sensor loops, and kinematics principles for interactive learning with embedded OpenAI QA.</span>
                </li>
              </ul>
              <p className="mt-1.5 font-mono text-xs text-muted print:text-[10px] print:text-gray-600">
                <strong>Tech:</strong> Next.js, TypeScript, Python, ROS 2 Architecture Visualizer, OpenAI API, Tailwind CSS.
              </p>
            </div>

            {/* The Arqa & Comforty */}
            <div className="mt-5 border-t border-border/50 pt-4 print:border-gray-200">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-bold text-text print:text-sm print:text-black">
                  The Arqa & Comforty — Headless E-Commerce Platforms
                </h3>
                <span className="font-mono text-xs text-muted print:text-gray-600">Frontend / Full-Stack Engineer</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-text print:text-xs print:text-gray-900">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span>Engineered performant headless storefronts on Sanity CMS with Stripe checkout and persistent global cart state, achieving <strong>90+ Google Lighthouse score</strong>.</span>
                </li>
              </ul>
              <p className="mt-1.5 font-mono text-xs text-muted print:text-[10px] print:text-gray-600">
                <strong>Tech:</strong> Next.js, Sanity CMS (GROQ), Stripe Checkout, TypeScript, Tailwind CSS.
              </p>
            </div>
          </section>

          {/* Education & Credentials */}
          <section className="mt-6 border-t border-border pt-6 print:border-gray-300 print:pt-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent print:text-xs print:text-black">
              Education & Credentials
            </h2>
            <div className="mt-3 space-y-2 text-sm print:text-xs print:space-y-1 text-text print:text-gray-900">
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p>
                    <strong>Cloud Native Applied Generative AI & Full-Stack Engineering</strong> — Governor Sindh Initiative (GIAIC)
                  </p>
                  <span className="font-mono text-xs text-muted print:text-gray-600">Ongoing</span>
                </div>
                <p className="mt-0.5 text-xs text-muted print:text-[11px] print:text-gray-700">
                  Comprehensive training & hands-on development in Next.js, TypeScript, Python, FastAPI, OpenAI Agent SDK, RAG pipelines, and Vector Databases.
                </p>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
                <p>
                  <strong>Meta WhatsApp Tech Provider Accreditation</strong> — Verified Cloud API Integration Architecture
                </p>
                <span className="font-mono text-xs text-muted print:text-gray-600">Verified</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 pt-1">
                <p>
                  <strong>Intensive Project-Based Systems Development</strong> — Real-world full-stack & AI applications
                </p>
                <span className="font-mono text-xs text-muted print:text-gray-600">2022 – Present</span>
              </div>
            </div>
          </section>

        </div>
      </Container>
    </main>
  );
}
