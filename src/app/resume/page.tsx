import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { email, socials } from "@/content/socials";
import { ResumeActions } from "./ResumeActions";

export const metadata: Metadata = {
  title: "Résumé — Muhammad Talha Shaikh | Junior Full-Stack & AI Engineer",
  description:
    "Professional ATS-optimized résumé of Muhammad Talha Shaikh. Junior Full-Stack & AI Engineer specializing in Next.js 16, TypeScript, Python/FastAPI, Google Gemini, and production RAG & multi-tenant systems.",
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
              High-velocity <strong>Junior Full-Stack & AI Engineer</strong> (~1.5 years intensive building experience) trained through <strong>GIAIC (Governor Sindh Initiative for GenAI & Web3)</strong>, with a proven track record of architecting and deploying scalable web systems, agentic AI pipelines, and multi-tenant platforms solo. Shipped <strong>Botaura</strong> (162+ route multi-tenant RAG SaaS with Meta WhatsApp Tech Provider accreditation), <strong>FlowCreator OS</strong> (autonomous AI video directing engine with locked facial geometry via Google Gemini SDK), <strong>ShieldTools</strong> (zero-server client-side privacy & e-commerce economics platform with PWA), and <strong>Volvelo</strong> (48-route luxury European marketplace with Clerk RBAC sync). Dedicated to rapid skill acquisition, clean system design, and immediate engineering impact.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mt-6 border-t border-border pt-6 print:border-gray-300 print:pt-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-accent print:text-xs print:text-black">
              Technical Skills
            </h2>
            <div className="mt-3 space-y-2 text-sm print:text-xs print:space-y-1">
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">Languages & Frameworks:</strong> TypeScript, JavaScript (ES6+), Python, Next.js 16 (App Router, Turbopack, Server Actions), React 19, FastAPI, Node.js, HTML5 Canvas API, jsPDF
              </p>
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">AI & Vector Retrieval (RAG):</strong> Google Gemini 2.5/3.6 Flash SDK, Reference Image Anchoring, Temporal Choreography, OpenAI SDK, OpenAI Agent SDK, LangChain, pgvector, BM25 Hybrid Retrieval, Structured JSON Outputs (Zod)
              </p>
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">Databases & ORM:</strong> Neon Serverless PostgreSQL, Prisma ORM 6, Drizzle ORM, Supabase, MongoDB
              </p>
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">Cloud & DevOps:</strong> Vercel (Edge & Cron), Docker, Cloudflare R2, AWS S3, Git & GitHub Actions, Sentry, Hugging Face Spaces
              </p>
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">Integrations & Third-Party APIs:</strong> WhatsApp Cloud API (Meta Tech Provider), Green-API, CallMeBot, Clerk Authentication (Core 3 / RBAC Sync), Stripe Checkout, Resend, Sanity Headless CMS (GROQ)
              </p>
              <p className="text-text print:text-gray-900">
                <strong className="font-semibold">Architecture & Best Practices:</strong> Zero-Knowledge Client Architecture, Multi-Tenant Row-Level Security, Progressive Web Apps (PWA), Answer Engine Optimization (AEO/JSON-LD), Sub-second TTFB
              </p>
            </div>
          </section>

          {/* Featured Systems & Engineering Projects */}
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
                Live: <a href="https://botaura.app" className="underline">https://botaura.app</a> · Case Study: <a href="https://talhaweb.xyz/projects/botaura" className="underline">talhaweb.xyz/projects/botaura</a>
              </p>

              <ul className="mt-2.5 space-y-1.5 text-sm text-text print:text-xs print:text-gray-900 print:space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Architected and deployed a multi-tenant SaaS platform</strong> spanning <strong>162+ production routes</strong>, enabling SMBs to train custom AI chatbots on proprietary knowledge bases and automate WhatsApp customer sales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Hybrid RAG Pipeline:</strong> Integrated OpenAI embeddings with <code className="font-mono text-xs print:text-black">pgvector</code> cosine similarity and BM25 search, handling multilingual English/Roman-Urdu conversations with automated confidence thresholds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Meta WhatsApp Tech Provider:</strong> Built centralized token routing engine by <code className="font-mono text-xs print:text-black">phone_number_id</code>, orchestrating real-time webhooks, templates, and ad attribution across merchant accounts without exposing secrets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Strict Multi-Tenant Isolation:</strong> Enforced server-side tenant resolution using signed JWTs, UUID cascading, and hashed API keys, preventing cross-tenant leakage by design.</span>
                </li>
              </ul>
              <p className="mt-2 font-mono text-xs text-muted print:text-[10px] print:text-gray-600">
                <strong>Tech:</strong> Next.js 16, TypeScript, FastAPI, Python (asyncpg), PostgreSQL (Neon), pgvector, Cloudflare R2, Clerk Auth, Resend, Sentry, Meta Graph API.
              </p>
            </div>

            {/* FlowCreator OS */}
            <div className="mt-5 border-t border-border/50 pt-4 print:border-gray-200">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-bold text-text print:text-sm print:text-black">
                  FlowCreator OS — Autonomous AI Video Directing & CreatorOps Operating System
                </h3>
                <span className="font-mono text-xs text-muted print:text-gray-600">Lead System Architect</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted print:text-[11px] print:text-gray-700">
                Live: <a href="https://flow-creator-os.vercel.app/" className="underline">https://flow-creator-os.vercel.app/</a> · Case Study: <a href="https://talhaweb.xyz/projects/flow-creator-os" className="underline">talhaweb.xyz/projects/flow-creator-os</a>
              </p>
              <ul className="mt-2.5 space-y-1.5 text-sm text-text print:text-xs print:text-gray-900 print:space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Engineered Autonomous AI Director</strong> using Google Gemini 2.5/3.6 Flash SDK to transform high-level premises into camera-sequenced video production bundles for Google Veo 2 and Sora.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Zero Face-Drift Architecture:</strong> Designed Reference Image Anchoring injecting master biometric tokens, and Temporal Choreography isolating single-speaker clips with continuous room-tone match-cuts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>CreatorOps WhatsApp Automation:</strong> Built an automated PKT time-zoned cron engine tracking 4-platform uploads (YouTube, IG Reels, TikTok, Facebook) with CallMeBot and Green-API alerts.</span>
                </li>
              </ul>
              <p className="mt-2 font-mono text-xs text-muted print:text-[10px] print:text-gray-600">
                <strong>Tech:</strong> Next.js 16, React 19, Tailwind CSS v4, Google Gemini Flash, Neon Postgres, Prisma ORM 6, Clerk Auth, Vercel Cron, WhatsApp API.
              </p>
            </div>

            {/* ShieldTools */}
            <div className="mt-5 border-t border-border/50 pt-4 print:border-gray-200">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-bold text-text print:text-sm print:text-black">
                  ShieldTools — Zero-Server Digital Privacy & COD E-Commerce Economics
                </h3>
                <span className="font-mono text-xs text-muted print:text-gray-600">Lead Architect & Creator</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted print:text-[11px] print:text-gray-700">
                Live: <a href="https://tools.talhaweb.xyz/" className="underline">https://tools.talhaweb.xyz/</a> · Case Study: <a href="https://talhaweb.xyz/projects/shield-tools" className="underline">talhaweb.xyz/projects/shield-tools</a>
              </p>
              <ul className="mt-2.5 space-y-1.5 text-sm text-text print:text-xs print:text-gray-900 print:space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>100% In-Browser Zero-Knowledge Privacy:</strong> Built DocShield™ using HTML5 Canvas API and jsPDF to watermark confidential national IDs (CNIC/Passports) directly in RAM with $0 backend cost.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>EcomShield™ COD Unit Economics:</strong> Engineered diagnostic engine isolating reverse courier penalties, packaging waste, and wasted ad spend on COD returns with automated WhatsApp summaries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>PWA with Early Prompt Capture:</strong> Injected custom inline head scripts to solve Next.js beforeinstallprompt race conditions, achieving sub-second load times across 22 statically prerendered routes.</span>
                </li>
              </ul>
              <p className="mt-2 font-mono text-xs text-muted print:text-[10px] print:text-gray-600">
                <strong>Tech:</strong> Next.js 16 (App Router + SSG), TypeScript, Tailwind CSS v4, HTML5 Canvas API, jsPDF, PWA Service Worker.
              </p>
            </div>

            {/* Volvelo */}
            <div className="mt-5 border-t border-border/50 pt-4 print:border-gray-200">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-bold text-text print:text-sm print:text-black">
                  Volvelo — Luxury Multi-Tenant European Dropshipping Marketplace
                </h3>
                <span className="font-mono text-xs text-muted print:text-gray-600">Full-Stack Architect</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted print:text-[11px] print:text-gray-700">
                Live: <a href="https://vovelo.vercel.app/" className="underline">https://vovelo.vercel.app/</a> · Case Study: <a href="https://talhaweb.xyz/projects/volvelo" className="underline">talhaweb.xyz/projects/volvelo</a>
              </p>
              <ul className="mt-2.5 space-y-1.5 text-sm text-text print:text-xs print:text-gray-900 print:space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Strict Multi-Tenant Partitioning:</strong> Architected 48-route platform separating customer storefront, merchant atelier portal (/portal), and super-admin hub (/admin) on Neon PostgreSQL via Prisma ORM.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Clerk Cloud RBAC Synchronization:</strong> Built bidirectional metadata sync between local database roles and Clerk publicMetadata via updateUserMetadata, eliminating session desync.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Multi-Currency Engine:</strong> Implemented real-time dynamic converter (EUR, USD, GBP, PKR) with Zustand persistence and hydration guards, avoiding React 19 SSR hydration mismatches.</span>
                </li>
              </ul>
              <p className="mt-2 font-mono text-xs text-muted print:text-[10px] print:text-gray-600">
                <strong>Tech:</strong> Next.js 16, React 19, TypeScript, Tailwind CSS v4, Neon Postgres, Prisma ORM, Clerk Core 3, Zustand.
              </p>
            </div>

            {/* GetF4F */}
            <div className="mt-5 border-t border-border/50 pt-4 print:border-gray-200">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-bold text-text print:text-sm print:text-black">
                  GetF4F — P2P TikTok Social Growth & Proof Verification Exchange
                </h3>
                <span className="font-mono text-xs text-muted print:text-gray-600">Full-Stack Engineer</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted print:text-[11px] print:text-gray-700">
                Live: <a href="https://f4f-tiktok.vercel.app/" className="underline">https://f4f-tiktok.vercel.app/</a> · Case Study: <a href="https://talhaweb.xyz/projects/getf4f-tiktok" className="underline">talhaweb.xyz/projects/getf4f-tiktok</a>
              </p>
              <ul className="mt-2.5 space-y-1.5 text-sm text-text print:text-xs print:text-gray-900 print:space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>Asynchronous 24-Hour Delayed Matching:</strong> Designed an algorithmic queue delaying reciprocal follow-backs by 24–48 hours to evade TikTok mutual-follow anti-spam flags.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span><strong>AI Heuristic Proof Engine:</strong> Validated screenshot uploads using layout signals (follow button state, handles) paired with a 100-point Trust Score and 5-day peer-reporting grace period.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold print:text-black">▹</span>
                  <span>Implemented double-entry credit ledger, streak gamification mechanics, and emergency admin kill switches using Drizzle ORM on Neon PostgreSQL.</span>
                </li>
              </ul>
              <p className="mt-2 font-mono text-xs text-muted print:text-[10px] print:text-gray-600">
                <strong>Tech:</strong> Next.js 16, React 19, TypeScript, Tailwind CSS v4, Neon Postgres, Drizzle ORM, Clerk Auth, AWS S3, Resend, PWA.
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
                  Comprehensive training & hands-on development in Next.js, TypeScript, Python, FastAPI, OpenAI Agent SDK, Gemini SDK, RAG pipelines, and Vector Databases.
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
                  <strong>Intensive Project-Based Systems Development</strong> — Real-world production full-stack & AI applications
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
