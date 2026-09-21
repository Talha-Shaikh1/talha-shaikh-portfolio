"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const ROTATING_WORDS = [
  "modern web apps.",
  "clean backend APIs.",
  "practical AI systems.",
  "WhatsApp automations.",
  "fast client tools.",
];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@talhaweb.xyz");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Aesthetic Cyber Grid Background Pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_0%,#000_70%,transparent_100%)]"
      >
        <svg className="h-full w-full stroke-accent/15 dark:stroke-accent/10">
          <defs>
            <pattern id="hero-grid-pattern" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M.5 36V.5H36" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-grid-pattern)" />
        </svg>
      </div>

      {/* Floating Ambient Aurora Glow with slow breathe animation */}
      <motion.div
        aria-hidden
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-accent via-amber-500/20 to-orange-600/30 blur-[110px]"
      />

      <Container>
        <Reveal>
          {/* Availability Status & Remote Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {profile.status}
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 font-mono text-xs text-muted backdrop-blur">
              <span>Karachi, PK</span>
              <span>·</span>
              <span className="text-text">Remote Available</span>
            </div>
          </div>

          {/* Role Kicker */}
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            {profile.role}
          </p>

          {/* Headline with Aesthetic Kinetic Word Rotator */}
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold leading-[1.12] tracking-tight text-text sm:text-5xl md:text-6xl lg:text-7xl">
            Building{" "}
            <span className="relative inline-block overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_WORDS[wordIndex]}
                  initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -40, opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block bg-gradient-to-r from-accent via-amber-400 to-orange-500 bg-clip-text text-transparent pb-1"
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Grounded & Natural Subtext */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.subtext}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Button href="#projects" className="shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow">
              Explore Shipped Systems ↓
            </Button>
            <Button href="/resume" variant="ghost">
              View Résumé (ATS) →
            </Button>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/80 px-3.5 py-2 font-mono text-xs text-text hover:border-accent/50 hover:bg-surface transition-all shadow-sm"
              title="Click to copy email address"
            >
              <span className="text-muted font-normal">email:</span>
              <span className="font-semibold text-accent">hello@talhaweb.xyz</span>
              <span className="rounded bg-bg px-1.5 py-0.5 text-[10px] text-muted">
                {copied ? "✓ Copied!" : "copy"}
              </span>
            </button>
          </div>

          {/* Interactive Bento Stats Grid with Aesthetic Hover Lift */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {profile.stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-4 sm:p-5 backdrop-blur transition-colors hover:border-accent/40 shadow-sm hover:shadow-md"
              >
                {/* Subtle top card glow line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-xs text-muted group-hover:text-text transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
