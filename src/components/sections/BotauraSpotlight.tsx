"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

export function BotauraSpotlight() {
  const highlights = [
    {
      title: "Strict Multi-Tenant Isolation",
      desc: "Every query cascades from tenant IDs resolved server-side from signed JWTs and hashed API keys, preventing cross-tenant data leakage.",
    },
    {
      title: "Meta WhatsApp Tech Provider",
      desc: "Centralized system token routes traffic by phone_number_id. Handles webhooks, ad attribution, and templates without exposing per-client secrets.",
    },
    {
      title: "Hybrid RAG & Vector Retrieval",
      desc: "Combines pgvector cosine similarity with BM25 keyword matching and multilingual embeddings to handle Roman-Urdu & English code-switching.",
    },
    {
      title: "Zero-Code Commerce & COD",
      desc: "Automated cash-on-delivery order placement, abandoned cart recovery, team inbox human handoff, and plug-and-play WooCommerce sync.",
    },
  ];

  return (
    <section className="relative scroll-mt-20 py-16 md:py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-surface p-7 md:p-10 shadow-xl shadow-accent/5">
            {/* Glow background accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
            />

            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 items-center justify-center rounded-full bg-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-contrast" />
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                  Flagship Engineering Project
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-accent/20 bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                  162+ Routes
                </span>
                <span className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted">
                  Live Pilot Onboarded
                </span>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="font-display text-3xl font-bold tracking-tight text-text sm:text-4xl">
                  Botaura — Multi-Tenant RAG AI Chatbot & WhatsApp Commerce
                </h2>
                <p className="mt-2 font-display text-lg italic text-accent">"Bot nahi. Aura."</p>

                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                  A production SaaS platform built solo from architecture to deployment. Pakistani SMBs train custom AI chatbots over proprietary documents and catalogs, deploying instantly to web widgets and WhatsApp Business with automated cash-on-delivery checkout.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Next.js 16",
                    "TypeScript",
                    "FastAPI",
                    "PostgreSQL (Neon)",
                    "pgvector",
                    "WhatsApp Cloud API",
                    "OpenAI SDK",
                    "Cloudflare R2",
                  ].map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="https://botaura.app">
                    Launch Live App ↗
                  </Button>
                  <Button href="/projects/botaura" variant="ghost">
                    Read Deep Architecture Case Study →
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-bg/50 p-4.5 transition-colors hover:border-accent/30"
                  >
                    <div className="flex items-center gap-2 font-display text-sm font-semibold text-text">
                      <span className="text-accent">▹</span>
                      {h.title}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{h.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
