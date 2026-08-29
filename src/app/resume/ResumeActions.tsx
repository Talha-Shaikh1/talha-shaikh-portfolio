"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ResumeActions({ downloadHref }: { downloadHref: string }) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyMarkdown = async () => {
    try {
      const resumeText = `MUHAMMAD TALHA SHAIKH
Junior Full-Stack & AI Engineer
Karachi, Pakistan · Talha369852@gmail.com · +92 312 1964939 · https://talhaweb.xyz · https://github.com/Talha-Shaikh1 · https://linkedin.com/in/talha-shaikh

PROFESSIONAL SUMMARY
High-velocity Junior Full-Stack & AI Engineer (~1.5 years experience) trained through GIAIC (Governor Sindh Initiative for GenAI & Web3). Mastered Next.js, TypeScript, Python, FastAPI, and OpenAI Agent SDK / RAG. Architected Botaura (multi-tenant RAG chatbot SaaS & Meta WhatsApp Tech Provider) and built TikTok Follow Exchange (getf4f). Proficient in Next.js, TypeScript, Tailwind CSS, Node.js, Python, FastAPI, PostgreSQL, and production RAG pipelines with pgvector.

TECHNICAL SKILLS
- Frontend: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Python, FastAPI (asyncpg), Prisma ORM, Drizzle ORM, REST APIs
- AI & RAG: OpenAI SDK, OpenAI Agent SDK, pgvector cosine similarity, BM25 Hybrid Retrieval, LangChain, Multilingual Embeddings
- Databases: PostgreSQL, Neon DB, Supabase, MongoDB, Cloudflare R2
- Cloud & Integrations: WhatsApp Cloud API (Meta Tech Provider), Stripe Payments, Resend, Vercel, Docker, Git

FEATURED PROJECTS
1. Botaura — Multi-Tenant RAG AI Chatbot & WhatsApp Commerce SaaS (Flagship)
- Architected & deployed multi-tenant SaaS with 162+ production routes solo.
- Built hybrid RAG pipeline with pgvector & BM25 retrieval for Roman-Urdu & English context grounding.
- Meta WhatsApp Tech Provider token routing engine handling webhooks & template reconciliation.
- Full COD order automation, cart recovery, and universal Store API for WooCommerce/Shopify sync.

2. TikTok Follow Exchange (getf4f) — P2P Creator Growth Platform
- Architected organic P2P creator exchange with 24-hour delayed matching to prevent shadowbans.
- Screenshot proof verification, trust scoring, credit economy, and 48-hour inactivity auto-protection.

3. Bait-ul-Kutub — Smart Library Management System (LMS)
- Full-stack LMS in PostgreSQL via Prisma with active loans, reservations, and inventory tracking.
- AI-powered natural language catalog search using OpenAI API.

4. AI Humanoid Robotics Interactive Platform
- Visualized ROS 2 publisher-subscriber architecture and control loops with embedded OpenAI QA tutor.

5. The Arqa & Comforty — Headless E-Commerce Platforms
- Headless storefronts on Sanity CMS with Stripe checkout and persistent global cart; 90+ Lighthouse score.

EDUCATION & CREDENTIALS
- Cloud Native Applied Generative AI & Full-Stack Engineering — Governor Sindh Initiative (GIAIC)
  (Next.js, TypeScript, Python, FastAPI, OpenAI Agent SDK, RAG & Vector Databases)
- Meta WhatsApp Tech Provider Status — Verified Cloud API Architecture
- Intensive Project-Based Systems Development (2022 – Present)`;

      await navigator.clipboard.writeText(resumeText);

      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleCopyMarkdown}
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg px-3 py-1.5 font-mono text-xs text-muted hover:text-text hover:border-accent/40 transition-all"
      >
        {copied ? "✓ Copied Text!" : "📋 Copy Text"}
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg px-3 py-1.5 font-mono text-xs text-text hover:border-accent/40 transition-all"
      >
        🖨️ Print / Save ATS
      </button>

      <Button href={downloadHref} className="text-xs px-3.5 py-1.5">
        📥 Download PDF
      </Button>
    </div>
  );
}
