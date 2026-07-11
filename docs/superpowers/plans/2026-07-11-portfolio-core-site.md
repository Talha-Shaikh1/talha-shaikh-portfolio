# Portfolio Core Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fast, distinctive dark-first developer portfolio (Editorial Warm design) with typed local content, a working contact form, MDX blog, and SEO+AEO — on the existing Next.js 16 scaffold.

**Architecture:** App Router, Server Components by default. Single long landing page (`/`) composed of section components fed by typed data in `src/content/`. Client islands only for theme toggle, mobile nav, scroll-reveal, and the contact form. Blog renders MDX from `src/content/blog/*.mdx` via `next-mdx-remote/rsc` + `gray-matter`. Contact form posts to a Route Handler that validates, rate-limits, and emails via Resend.

**Tech Stack:** Next.js 16.2, React 19.2, TypeScript (strict), Tailwind CSS v4, Framer Motion, Zod, Resend, next-mdx-remote, gray-matter, Vitest.

## Global Constraints

- Next.js 16.2.10 / React 19.2.4 / Tailwind v4 — read `node_modules/next/dist/docs/` before using any framework API; heed deprecations.
- `metadata` object / `generateMetadata` are **Server Components only**.
- All user-facing content lives in `src/content/` (typed TS or `.mdx`) — never hardcode copy in components.
- Design tokens (exact hex): dark `bg #14110E`, `surface #1C1813`, `text #EDE6DD`, `muted #A79E92`, `accent #F0803C`, `border rgba(237,230,221,.10)`; light `bg #FAF6F0`, `surface #FFFFFF`, `text #1A1613`, `muted #6B6157`, `accent #C25A1E`, `border rgba(26,22,19,.10)`.
- Fonts: Fraunces (`--font-fraunces`, display), Inter (`--font-inter`, body), JetBrains Mono (`--font-jetbrains`, mono).
- **Dark-first**: `<html>` ships with `class="dark"`; light mode is opt-in via toggle, persisted in `localStorage['theme']`.
- No purple→blue gradients; no generic-template aesthetics.
- All animation gated on `prefers-reduced-motion`. Server-first; minimize client JS.
- WCAG AA contrast on all text/accent pairs. Semantic HTML, visible focus rings, keyboard-navigable.
- Path alias `@/*` → `src/*` (already in `tsconfig.json`).
- Use `npm` (repo has `package-lock.json`).

---

### Task 1: Design system foundation (deps, fonts, tokens, theme, root layout)

**Files:**
- Modify: `package.json` (deps)
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/lib/cn.ts`
- Modify: `src/app/page.tsx` (temporary smoke content)

**Interfaces:**
- Produces: `cn(...classes)` from `@/lib/cn`; CSS utilities `bg-bg bg-surface text-text text-muted text-accent border-border`, fonts `font-display font-sans font-mono`; `<html class="dark">` default; `localStorage['theme']` = `'light' | 'dark'`.

- [ ] **Step 1: Install runtime deps**

```bash
npm install framer-motion clsx tailwind-merge zod resend next-mdx-remote gray-matter
```

- [ ] **Step 2: Install dev deps (test runner)**

```bash
npm install -D vitest @vitejs/plugin-react vite-tsconfig-paths jsdom @testing-library/react @testing-library/dom
```

- [ ] **Step 3: Add the `cn` helper**

`src/lib/cn.ts`:
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Write `globals.css` with tokens + dark variant**

Replace `src/app/globals.css` entirely:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --bg: #faf6f0;
  --surface: #ffffff;
  --text: #1a1613;
  --muted: #6b6157;
  --accent: #c25a1e;
  --accent-contrast: #ffffff;
  --border: rgba(26, 22, 19, 0.1);
}

.dark {
  --bg: #14110e;
  --surface: #1c1813;
  --text: #ede6dd;
  --muted: #a79e92;
  --accent: #f0803c;
  --accent-contrast: #14110e;
  --border: rgba(237, 230, 221, 0.1);
}

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-accent-contrast: var(--accent-contrast);
  --color-border: var(--border);

  --font-display: var(--font-fraunces);
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains);
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: var(--font-sans), ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection {
  background-color: var(--accent);
  color: var(--accent-contrast);
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

- [ ] **Step 5: Write the root layout with fonts + no-flash theme script**

Replace `src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/cn";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Talha Shaikh — Full-stack & AI Engineer",
  description: "Self-taught full-stack & AI engineer who builds and ships production SaaS solo.",
};

const noFlashTheme = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("dark", fraunces.variable, inter.variable, jetbrains.variable)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
      </head>
      <body className="min-h-dvh bg-bg text-text antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Temporary smoke content in `page.tsx`**

Replace `src/app/page.tsx`:
```tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-sm text-accent">design system online</p>
      <h1 className="mt-4 font-display text-5xl font-semibold text-text">Editorial Warm</h1>
      <p className="mt-4 text-muted">Warm charcoal, amber accent, Fraunces display type.</p>
    </main>
  );
}
```

- [ ] **Step 7: Verify dev build renders with correct fonts/colors**

Run: `npm run dev` then open `http://localhost:3000`.
Expected: dark warm-charcoal background, amber mono label, Fraunces heading. Toggle nothing yet. Stop server.

- [ ] **Step 8: Verify production build compiles**

Run: `npm run build`
Expected: build succeeds, no type errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: design system foundation (fonts, tokens, dark-first theme)"
```

---

### Task 2: Content data layer (types + data + integrity test)

**Files:**
- Create: `src/content/types.ts`
- Create: `src/content/profile.ts`
- Create: `src/content/socials.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/skills.ts`
- Create: `src/content/content.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json` (test script)

**Interfaces:**
- Produces:
  - `type Project = { slug: string; name: string; tagline: string; description: string; stack: string[]; highlights: string[]; links: { live?: string; github?: string; caseStudy?: string }; featured?: boolean; deepDive?: boolean }`
  - `type SkillGroup = { category: string; items: string[] }`
  - `type Social = { label: string; href: string; handle: string }`
  - `profile` (name, role, positioning, subtext, about[], resumeHref), `projects: Project[]`, `skillGroups: SkillGroup[]`, `socials: Social[]`, `email: string`.

- [ ] **Step 1: Configure Vitest**

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: { environment: "jsdom", globals: true, include: ["src/**/*.test.{ts,tsx}"] },
});
```

Add to `package.json` `"scripts"`: `"test": "vitest run"`.

- [ ] **Step 2: Write content types**

`src/content/types.ts`:
```ts
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
```

- [ ] **Step 3: Write the failing integrity test**

`src/content/content.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { projects } from "./projects";
import { skillGroups } from "./skills";
import { socials, email } from "./socials";
import { profile } from "./profile";

describe("content integrity", () => {
  it("every project has required non-empty fields", () => {
    for (const p of projects) {
      expect(p.slug, "slug").toBeTruthy();
      expect(p.name, `${p.slug} name`).toBeTruthy();
      expect(p.tagline, `${p.slug} tagline`).toBeTruthy();
      expect(p.stack.length, `${p.slug} stack`).toBeGreaterThan(0);
      expect(p.highlights.length, `${p.slug} highlights`).toBeGreaterThanOrEqual(2);
    }
  });

  it("project slugs are unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all project links are absolute or rooted", () => {
    for (const p of projects) {
      for (const href of Object.values(p.links)) {
        if (href) expect(href).toMatch(/^(https?:\/\/|\/)/);
      }
    }
  });

  it("skill groups are non-empty", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const g of skillGroups) expect(g.items.length).toBeGreaterThan(0);
  });

  it("email looks valid and socials have hrefs", () => {
    expect(email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    for (const s of socials) expect(s.href).toMatch(/^https?:\/\//);
  });

  it("profile has positioning and about copy", () => {
    expect(profile.positioning).toBeTruthy();
    expect(profile.about.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `./projects` etc.

- [ ] **Step 5: Write `socials.ts`**

`src/content/socials.ts`:
```ts
import type { Social } from "./types";

export const email = "Talha369852@gmail.com";

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/Talha-Shaikh1", handle: "@Talha-Shaikh1" },
  { label: "LinkedIn", href: "https://linkedin.com/in/talha-shaikh", handle: "in/talha-shaikh" },
  { label: "WhatsApp", href: "https://wa.me/923121964939", handle: "+92 312 1964939" },
];
```

- [ ] **Step 6: Write `profile.ts`**

`src/content/profile.ts`:
```ts
export const profile = {
  name: "Talha Shaikh",
  role: "Full-stack & AI Engineer",
  positioning: "I build and ship production SaaS and AI systems solo.",
  subtext:
    "Self-taught engineer from Karachi working across modern web (Next.js, TypeScript) and applied AI — from Botaura, a live multi-tenant RAG chatbot SaaS, to full-stack products like an LMS and an e-commerce store.",
  location: "Karachi, Pakistan",
  resumeHref: "/talha-shaikh-resume.pdf",
  about: [
    "I'm a self-taught full-stack and AI engineer based in Karachi. My formal schooling stops at matric — the rest I've taught myself by building and shipping real products.",
    "I built Botaura solo: a live multi-tenant RAG chatbot SaaS for Pakistani SMBs with WhatsApp Business automation, operated as a Meta WhatsApp Tech Provider. Every layer — data model, retrieval pipeline, tenant isolation, and the WhatsApp integration — is mine.",
    "I've also shipped Bait-ul-Kutub (an AI-powered Library Management System), The Arqa (a high-performance e-commerce store), and an interactive platform for teaching Physical AI and humanoid robotics.",
    "I'm deepening my foundations through GIAIC's Cloud Native Applied Generative AI program and looking for remote full-stack or AI-engineering roles where shipping matters more than a traditional CS degree.",
  ],
} as const;
```

- [ ] **Step 7: Write `projects.ts` (Botaura + WhatsApp wrapper)**

`src/content/projects.ts`:
```ts
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
    // TODO(talha): add the live Botaura URL (e.g. links.live) — confirmed live but URL not yet provided.
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
```

- [ ] **Step 8: Write `skills.ts`**

`src/content/skills.ts`:
```ts
import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  { category: "Frontend", items: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Python", "FastAPI", "Prisma", "REST APIs"] },
  { category: "AI / RAG", items: ["OpenAI SDK", "LangChain", "RAG & retrieval", "Vector search (pgvector)", "Prompt engineering"] },
  { category: "Database", items: ["PostgreSQL", "Neon", "Supabase", "MongoDB"] },
  { category: "Infra / Tools", items: ["Vercel", "Docker", "Git", "Sanity CMS"] },
  { category: "Integrations", items: ["WhatsApp Cloud API", "Meta Tech Provider", "Webhooks", "Stripe"] },
];
```

- [ ] **Step 9: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (all integrity tests green).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: typed content data layer with integrity tests"
```

---

### Task 3: UI primitives (Container, SectionHeading, Button, Tag, Card, Reveal)

**Files:**
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Tag.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Reveal.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/cn`.
- Produces:
  - `<Container className?>` — centered max-width wrapper.
  - `<SectionHeading id label title kicker?>` — section header with mono kicker.
  - `<Button href? variant='primary'|'ghost' children>` — link-styled button.
  - `<Tag>text</Tag>` — mono pill.
  - `<Card className? children>` — surface card.
  - `<Reveal delay?>children</Reveal>` — client scroll-reveal (reduced-motion safe).

- [ ] **Step 1: Container**

`src/components/ui/Container.tsx`:
```tsx
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-5xl px-6 sm:px-8", className)}>{children}</div>;
}
```

- [ ] **Step 2: SectionHeading**

`src/components/ui/SectionHeading.tsx`:
```tsx
export function SectionHeading({
  id,
  label,
  title,
  kicker,
}: {
  id: string;
  label: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span aria-hidden>{"// "}</span>
        {label}
      </p>
      <h2 id={id} className="mt-3 font-display text-3xl font-semibold text-text sm:text-4xl">
        {title}
      </h2>
      {kicker ? <p className="mt-3 max-w-2xl text-muted">{kicker}</p> : null}
    </div>
  );
}
```

- [ ] **Step 3: Button**

`src/components/ui/Button.tsx`:
```tsx
import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ href, variant = "primary", className, children, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-contrast hover:opacity-90"
      : "border border-border text-text hover:bg-surface";
  const cls = cn(base, styles, className);
  if (href) {
    const external = href.startsWith("http");
    return (
      <Link href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </Link>
    );
  }
  return <span className={cls}>{children}</span>;
}
```

- [ ] **Step 4: Tag**

`src/components/ui/Tag.tsx`:
```tsx
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Card**

`src/components/ui/Card.tsx`:
```tsx
import { cn } from "@/lib/cn";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 6: Reveal (client, reduced-motion safe)**

`src/components/ui/Reveal.tsx`:
```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 7: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: UI primitives (Container, SectionHeading, Button, Tag, Card, Reveal)"
```

---

### Task 4: Layout chrome (ThemeToggle, Header, MobileNav, Footer)

**Files:**
- Create: `src/lib/nav.ts`
- Create: `src/components/layout/ThemeToggle.tsx`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx` (mount Header/Footer + skip link)

**Interfaces:**
- Consumes: `cn`, `socials`, `email`, `profile`, UI primitives.
- Produces: `NAV_LINKS: { href: string; label: string }[]`; `<Header/>`, `<Footer/>`, `<ThemeToggle/>` (client).

- [ ] **Step 1: Nav config**

`src/lib/nav.ts`:
```ts
export const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];
```

- [ ] **Step 2: ThemeToggle (client, persists + toggles `.dark`)**

`src/components/layout/ThemeToggle.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-md border border-border text-text transition-colors hover:bg-surface"
    >
      <span aria-hidden className="font-mono text-sm">{dark ? "☾" : "☀"}</span>
    </button>
  );
}
```

- [ ] **Step 3: Header (client for mobile nav state)**

`src/components/layout/Header.tsx`:
```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="font-display text-lg font-semibold text-text">
          Talha Shaikh<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-text">
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md border border-border"
          >
            <span aria-hidden className="font-mono">{open ? "✕" : "≡"}</span>
          </button>
        </div>
      </div>

      <nav
        className={cn("md:hidden", open ? "block" : "hidden")}
        aria-label="Mobile"
      >
        <ul className="border-t border-border px-6 py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Footer**

`src/components/layout/Footer.tsx`:
```tsx
import { socials, email } from "@/content/socials";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-12">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <ul className="flex gap-5">
          <li>
            <a href={`mailto:${email}`} className="text-sm text-muted transition-colors hover:text-accent">
              Email
            </a>
          </li>
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 5: Mount chrome + skip link in root layout**

In `src/app/layout.tsx`, add imports and wrap children. Replace the `<body>` element:
```tsx
      <body className="min-h-dvh bg-bg text-text antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
```
Add imports at top: `import { Header } from "@/components/layout/Header";` and `import { Footer } from "@/components/layout/Footer";`.

- [ ] **Step 6: Verify toggle + nav work**

Run: `npm run dev`, open site. Click theme toggle → palette flips light/dark, persists on reload. Resize to mobile → hamburger opens/closes. Tab through header → visible focus rings. Stop server.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: header, footer, mobile nav, theme toggle, skip link"
```

---

### Task 5: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `profile`, `Container`, `Button`, `Reveal`.
- Produces: `<Hero/>`.

- [ ] **Step 1: Hero component**

`src/components/sections/Hero.tsx`:
```tsx
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <Container>
        <Reveal>
          <p className="font-mono text-sm text-accent">{profile.role}</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.05] text-text sm:text-6xl md:text-7xl">
            {profile.positioning}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{profile.subtext}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="ghost">Contact / Résumé</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Render Hero on the page**

Replace `src/app/page.tsx`:
```tsx
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main id="main">
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run dev`. Hero shows large Fraunces headline, amber role label, two CTAs; subtle fade-in on load. Stop server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: hero section"
```

---

### Task 6: About section

**Files:**
- Create: `src/components/sections/About.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `profile`, `Container`, `SectionHeading`, `Reveal`.
- Produces: `<About/>`.

- [ ] **Step 1: About component**

`src/components/sections/About.tsx`:
```tsx
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading id="about-heading" label="About" title="Shipping over credentials" />
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {profile.about.map((p, i) => (
                <p key={i} className={i === 0 ? "text-text" : undefined}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="space-y-4 rounded-xl border border-border bg-surface p-6 font-mono text-sm">
              {[
                ["Role", profile.role],
                ["Focus", "RAG SaaS · Full-stack · AI"],
                ["Status", "Open to remote roles"],
                ["Based", "Karachi, Pakistan"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right text-text">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Add About to page (after Hero)**

Update `src/app/page.tsx` to import and render `<About />` after `<Hero />`.

- [ ] **Step 3: Verify + commit**

Run `npm run dev`, confirm About renders with narrative + fact card. Then:
```bash
git add -A
git commit -m "feat: about section"
```

---

### Task 7: Projects section + deep-dive route

**Files:**
- Create: `src/components/sections/Projects.tsx`
- Create: `src/components/projects/ProjectCard.tsx`
- Create: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `projects`, `Project`, `Container`, `SectionHeading`, `Card`, `Tag`, `Reveal`, `Button`.
- Produces: `<Projects/>`, `<ProjectCard project/>`, deep-dive page with `generateStaticParams` over `deepDive` projects.

- [ ] **Step 1: ProjectCard**

`src/components/projects/ProjectCard.tsx`:
```tsx
import Link from "next/link";
import type { Project } from "@/content/types";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold text-text">{project.name}</h3>
        {project.featured ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">Featured</span>
        ) : null}
      </div>
      <p className="mt-2 text-muted">{project.tagline}</p>

      <ul className="mt-5 space-y-2">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted">
            <span aria-hidden className="mt-1 text-accent">▹</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-4 font-mono text-sm">
        {project.links.live ? (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Live ↗
          </a>
        ) : null}
        {project.links.github ? (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            GitHub ↗
          </a>
        ) : null}
        {project.deepDive ? (
          <Link href={`/projects/${project.slug}`} className="text-accent hover:underline">
            Case study →
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
```

- [ ] **Step 2: Projects section**

`src/components/sections/Projects.tsx`:
```tsx
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading
          id="projects-heading"
          label="Projects"
          title="Things I've built and shipped"
          kicker="Real engineering decisions, not feature lists."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Deep-dive route**

`src/app/projects/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return projects.filter((p) => p.deepDive).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Talha Shaikh`, description: project.tagline };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main id="main" className="py-20">
      <Container className="max-w-3xl">
        <Button href="/#projects" variant="ghost" className="mb-8">← Back to projects</Button>
        <p className="font-mono text-sm text-accent">Case study</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-text sm:text-5xl">{project.name}</h1>
        <p className="mt-4 text-lg text-muted">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-semibold text-text">Engineering highlights</h2>
        <ul className="mt-4 space-y-3">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-muted">
              <span aria-hidden className="mt-1 text-accent">▹</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          {project.links.live ? <Button href={project.links.live}>Visit live ↗</Button> : null}
          {project.links.github ? <Button href={project.links.github} variant="ghost">GitHub ↗</Button> : null}
        </div>
      </Container>
    </main>
  );
}
```

> **Note:** In Next.js 16, dynamic route `params` is a Promise — always `await` it. Confirm against `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md` if the type errors.

- [ ] **Step 4: Add Projects to page (after About)**

Update `src/app/page.tsx` to render `<Projects />` after `<About />`.

- [ ] **Step 5: Verify**

Run `npm run dev`. Projects grid renders both cards with highlights/tags/links. Click "Case study" on Botaura → deep-dive page renders; back link works. Non-deep-dive project has no case-study link. Stop server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: projects section and project deep-dive pages"
```

---

### Task 8: Skills section

**Files:**
- Create: `src/components/sections/Skills.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `skillGroups`, `Container`, `SectionHeading`, `Card`, `Reveal`.
- Produces: `<Skills/>`.

- [ ] **Step 1: Skills component**

`src/components/sections/Skills.tsx`:
```tsx
import { skillGroups } from "@/content/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading id="skills-heading" label="Stack" title="Skills, grouped by where they live" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.05}>
              <Card className="h-full">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{g.category}</h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="text-muted">{item}</li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Add Skills to page + verify + commit**

Render `<Skills />` after `<Projects />` in `src/app/page.tsx`. Run `npm run dev`, confirm five labeled groups. Then:
```bash
git add -A
git commit -m "feat: skills section"
```

---

### Task 9: Contact section + form + Route Handler (validation, honeypot, rate limit)

**Files:**
- Create: `src/lib/rate-limit.ts`
- Create: `src/lib/contact-schema.ts`
- Create: `src/app/api/contact/route.ts`
- Create: `src/app/api/contact/route.test.ts`
- Create: `src/components/sections/Contact.tsx`
- Create: `src/components/contact/ContactForm.tsx`
- Create: `.env.example`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `email`, `socials`, `Container`, `SectionHeading`, `Button`, Zod.
- Produces:
  - `contactSchema` (Zod) + `type ContactInput`.
  - `rateLimit(key: string): { ok: boolean }` — best-effort in-memory limiter (5 req / 10 min).
  - `POST /api/contact` → `200 {ok:true}` | `400 {error}` | `429 {error}`.
  - `<Contact/>`, `<ContactForm/>` (client).

- [ ] **Step 1: Zod schema**

`src/lib/contact-schema.ts`:
```ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email."),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(2000),
  // Honeypot: must be empty. Bots fill it.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 2: Rate limiter**

`src/lib/rate-limit.ts`:
```ts
type Entry = { count: number; resetAt: number };
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const store = new Map<string, Entry>();

/** Best-effort in-memory limiter. Per serverless instance; fine for spam control. */
export function rateLimit(key: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX - 1 };
  }
  if (entry.count >= MAX) return { ok: false, remaining: 0 };
  entry.count += 1;
  return { ok: true, remaining: MAX - entry.count };
}
```

- [ ] **Step 3: Write the failing route test**

`src/app/api/contact/route.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

// Prevent real emails: mock resend before importing the route.
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: vi.fn().mockResolvedValue({ data: { id: "test" }, error: null }) };
  },
}));

import { POST } from "./route";

function req(body: unknown, ip = "1.2.3.4") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const valid = { name: "Jane Dev", email: "jane@example.com", message: "Hello, I'd like to talk about a role." };

beforeEach(() => {
  process.env.RESEND_API_KEY = "test";
  process.env.CONTACT_TO_EMAIL = "to@example.com";
});

describe("POST /api/contact", () => {
  it("accepts a valid submission", async () => {
    const res = await POST(req(valid, "10.0.0.1"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("rejects invalid input with 400", async () => {
    const res = await POST(req({ name: "x", email: "nope", message: "short" }, "10.0.0.2"));
    expect(res.status).toBe(400);
  });

  it("rejects when honeypot is filled", async () => {
    const res = await POST(req({ ...valid, company: "spam co" }, "10.0.0.3"));
    expect(res.status).toBe(400);
  });

  it("rate-limits after 5 requests from one IP", async () => {
    const ip = "10.0.0.99";
    for (let i = 0; i < 5; i++) {
      const ok = await POST(req(valid, ip));
      expect(ok.status).toBe(200);
    }
    const blocked = await POST(req(valid, ip));
    expect(blocked.status).toBe(429);
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run src/app/api/contact/route.test.ts`
Expected: FAIL — `./route` has no `POST` export.

- [ ] **Step 5: Implement the Route Handler**

`src/app/api/contact/route.ts`:
```ts
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0]!.trim() : "unknown";
}

export async function POST(req: Request): Promise<Response> {
  const { ok } = rateLimit(clientIp(req));
  if (!ok) {
    return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  const { name, email, message, company } = parsed.data;
  if (company) return Response.json({ error: "Invalid input." }, { status: 400 }); // honeypot tripped

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json({ error: "Contact is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) return Response.json({ error: "Could not send message." }, { status: 502 });
  return Response.json({ ok: true }, { status: 200 });
}
```

> **Note:** Confirm Route Handler signature/exports against `node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`. `onboarding@resend.dev` is Resend's shared test sender; swap for a verified domain sender once available.

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/app/api/contact/route.test.ts`
Expected: PASS (all 4 cases).

- [ ] **Step 7: ContactForm (client)**

`src/components/contact/ContactForm.tsx`:
```tsx
"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const field = "w-full rounded-md border border-border bg-bg px-4 py-2.5 text-text placeholder:text-muted focus-visible:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot: visually hidden, not focusable */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-muted">Name</label>
        <input id="name" name="name" required className={field} placeholder="Jane Developer" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-muted">Email</label>
        <input id="email" name="email" type="email" required className={field} placeholder="jane@company.com" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-muted">Message</label>
        <textarea id="message" name="message" required rows={5} className={field} placeholder="Tell me about the role…" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p aria-live="polite" className="text-sm">
        {status === "ok" ? <span className="text-accent">Thanks — I'll get back to you soon.</span> : null}
        {status === "error" ? <span className="text-red-400">{error}</span> : null}
      </p>
    </form>
  );
}
```

- [ ] **Step 8: Contact section**

`src/components/sections/Contact.tsx`:
```tsx
import { email, socials } from "@/content/socials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading
          id="contact-heading"
          label="Contact"
          title="Let's talk"
          kicker="Open to remote backend, full-stack, and AI-engineering roles."
        />
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <a href={`mailto:${email}`} className="block font-display text-2xl text-text hover:text-accent">
              {email}
            </a>
            <ul className="space-y-2 font-mono text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                    {s.label} — {s.handle} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 9: `.env.example` + wire into page**

`.env.example`:
```
# Contact form (Resend — https://resend.com). Free tier is fine.
RESEND_API_KEY=
CONTACT_TO_EMAIL=talha369852@gmail.com
```
Render `<Contact />` last in `src/app/page.tsx`.

- [ ] **Step 10: Full test run + build**

Run: `npm test` then `npm run build`
Expected: all tests pass; build succeeds.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: contact section with validated, rate-limited, honeypot-guarded form"
```

---

### Task 10: Blog (MDX pipeline + list + post page + sample post)

**Files:**
- Create: `src/content/blog/hello-rag.mdx`
- Create: `src/lib/blog.ts`
- Create: `src/lib/blog.test.ts`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `gray-matter`, `next-mdx-remote/rsc`, `Container`, `SectionHeading`.
- Produces:
  - `type PostMeta = { slug: string; title: string; description: string; date: string }`
  - `getAllPosts(): PostMeta[]` (sorted newest-first), `getPost(slug): { meta: PostMeta; content: string } | null`.

- [ ] **Step 1: Sample post**

`src/content/blog/hello-rag.mdx`:
```mdx
---
title: "Grounding an LLM: what RAG actually buys you"
description: "A short note on why retrieval beats bigger prompts for factual answers."
date: "2026-07-11"
---

Retrieval-augmented generation isn't magic — it's a filing system. You chunk
your content, embed it, and at query time you pull only the passages that
actually matter, then ask the model to answer **from those passages only**.

The payoff is grounding: the model stops guessing and starts citing. That's
the same pattern behind Botaura, just scaled down.
```

- [ ] **Step 2: Write the failing blog-lib test**

`src/lib/blog.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { getAllPosts, getPost } from "./blog";

describe("blog lib", () => {
  it("lists at least the sample post with required meta", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    const sample = posts.find((p) => p.slug === "hello-rag");
    expect(sample?.title).toBeTruthy();
    expect(sample?.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("returns content for a known slug and null for unknown", () => {
    expect(getPost("hello-rag")?.content).toContain("Retrieval");
    expect(getPost("does-not-exist")).toBeNull();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/lib/blog.test.ts`
Expected: FAIL — `./blog` not found.

- [ ] **Step 4: Implement `blog.ts`**

`src/lib/blog.ts`:
```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export type PostMeta = { slug: string; title: string; description: string; date: string };

function readFileFor(slug: string): string | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const { data } = matter(readFileFor(slug)!);
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const raw = readFileFor(slug);
  if (!raw) return null;
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
    },
    content,
  };
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/lib/blog.test.ts`
Expected: PASS.

- [ ] **Step 6: Blog list page**

`src/app/blog/page.tsx`:
```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Blog — Talha Shaikh",
  description: "Technical write-ups on RAG, SaaS, and shipping products solo.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main id="main" className="py-20">
      <Container className="max-w-3xl">
        <SectionHeading id="blog-heading" label="Blog" title="Notes & write-ups" />
        {posts.length === 0 ? (
          <p className="text-muted">No posts yet — coming soon.</p>
        ) : (
          <ul className="divide-y divide-border">
            {posts.map((p) => (
              <li key={p.slug} className="py-6">
                <Link href={`/blog/${p.slug}`} className="group block">
                  <p className="font-mono text-xs text-muted">{p.date}</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-text group-hover:text-accent">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-muted">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
```

- [ ] **Step 7: Blog post page (renders MDX)**

`src/app/blog/[slug]/page.tsx`:
```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.meta.title} — Talha Shaikh`, description: post.meta.description };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main id="main" className="py-20">
      <Container className="max-w-3xl">
        <Button href="/blog" variant="ghost" className="mb-8">← All posts</Button>
        <p className="font-mono text-sm text-muted">{post.meta.date}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-text">{post.meta.title}</h1>
        <div className="prose-portfolio mt-8 space-y-5 text-lg leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_strong]:text-text">
          <MDXRemote source={post.content} />
        </div>
      </Container>
    </main>
  );
}
```

> **Note:** `next-mdx-remote/rsc` compiles MDX in a Server Component — no `mdx-components.tsx` or `next.config` change required. If Next 16 flags MDX serialization, cross-check `node_modules/next/dist/docs/01-app/02-guides/mdx.md`.

- [ ] **Step 8: Verify + build + commit**

Run `npm run dev`; visit `/blog` (sample post listed) and the post page (MDX renders with styled links/bold). Then `npm test` and `npm run build`. Then:
```bash
git add -A
git commit -m "feat: MDX blog (list, post pages, sample post)"
```

---

### Task 11: SEO + AEO (metadata, OG image, sitemap, robots, JSON-LD, manifest)

**Files:**
- Create: `src/lib/site.ts`
- Create: `src/components/seo/JsonLd.tsx`
- Modify: `src/app/layout.tsx` (metadataBase, richer metadata, Person+WebSite JSON-LD)
- Modify: `src/app/page.tsx` (FAQ/Person on landing)
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/manifest.ts`
- Modify: `src/app/blog/[slug]/page.tsx` (Article JSON-LD)

**Interfaces:**
- Consumes: `profile`, `socials`, `getAllPosts`, `projects`.
- Produces: `SITE` constant (`url`, `name`, `title`, `description`); `<JsonLd data />` component.

- [ ] **Step 1: Site constants**

`src/lib/site.ts`:
```ts
export const SITE = {
  url: "https://talhashaikh.dev", // TODO(talha): set to real production domain
  name: "Talha Shaikh",
  title: "Talha Shaikh — Full-stack & AI Engineer",
  description:
    "Self-taught full-stack & AI engineer who builds and ships production SaaS solo — RAG systems, multi-tenant SaaS, and WhatsApp Business API integrations.",
} as const;
```

- [ ] **Step 2: JsonLd component**

`src/components/seo/JsonLd.tsx`:
```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 3: Upgrade root metadata + Person/WebSite JSON-LD**

In `src/app/layout.tsx`: replace the `metadata` export and add JSON-LD into `<body>`:
```tsx
import { SITE } from "@/lib/site";
import { socials } from "@/content/socials";
import { profile } from "@/content/profile";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s" },
  description: SITE.description,
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  alternates: { canonical: SITE.url },
};
```
Add inside `<body>`, before `<Header />`:
```tsx
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.role,
            url: SITE.url,
            email: `mailto:talha369852@gmail.com`,
            sameAs: socials.map((s) => s.href),
            description: SITE.description,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.name,
            url: SITE.url,
          }}
        />
```

- [ ] **Step 4: FAQ JSON-LD on landing (AEO — answerable content)**

In `src/app/page.tsx`, add a `<JsonLd>` with a `FAQPage` covering real recruiter questions:
```tsx
import { JsonLd } from "@/components/seo/JsonLd";

// inside the returned <main>, at the top:
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Talha Shaikh build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Full-stack products and applied AI. His flagship is Botaura, a live multi-tenant RAG chatbot SaaS for Pakistani SMBs with WhatsApp automation. He has also built an AI-powered LMS (Bait-ul-Kutub), an e-commerce store (The Arqa), and a Physical-AI teaching platform, using Next.js, TypeScript, Python, and the OpenAI SDK.",
        },
      },
      {
        "@type": "Question",
        name: "What is Talha's experience with WhatsApp APIs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "He is a Meta WhatsApp Tech Provider and integrated the WhatsApp Cloud API into Botaura — handling webhooks, message templates, and delivery/status reconciliation.",
        },
      },
      {
        "@type": "Question",
        name: "Does Talha have a computer science degree?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. He is self-taught, with formal education to matric level, and is currently in GIAIC's Cloud Native Applied Generative AI program. He learns by building and shipping real products.",
        },
      },
    ],
  }}
/>
```

- [ ] **Step 5: OG image (edge, uses accent identity)**

`src/app/opengraph-image.tsx`:
```tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#14110e",
          color: "#ede6dd",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ color: "#f0803c", fontSize: 28, fontFamily: "monospace" }}>Full-stack & AI Engineer</div>
        <div style={{ fontSize: 72, fontWeight: 600, marginTop: 20, lineHeight: 1.1 }}>
          I build and ship production SaaS products solo.
        </div>
        <div style={{ fontSize: 30, color: "#a79e92", marginTop: 28 }}>Talha Shaikh</div>
      </div>
    ),
    size,
  );
}
```

> **Note:** Confirm `next/og` `ImageResponse` import path against `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/image-response.md`.

- [ ] **Step 6: sitemap + robots + manifest**

`src/app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/blog"].map((path) => ({ url: `${SITE.url}${path}`, lastModified: now }));
  const posts = getAllPosts().map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: new Date(p.date) }));
  const deepDives = projects
    .filter((p) => p.deepDive)
    .map((p) => ({ url: `${SITE.url}/projects/${p.slug}`, lastModified: now }));
  return [...routes, ...deepDives, ...posts];
}
```

`src/app/robots.ts`:
```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```

`src/app/manifest.ts`:
```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Talha",
    start_url: "/",
    display: "standalone",
    background_color: "#14110e",
    theme_color: "#14110e",
  };
}
```

- [ ] **Step 7: Article JSON-LD on blog posts**

In `src/app/blog/[slug]/page.tsx`, inside the returned `<main>`, add:
```tsx
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

// inside <Container>, after the heading block:
<JsonLd
  data={{
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { "@type": "Person", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/blog/${post.meta.slug}`,
  }}
/>
```

- [ ] **Step 8: Verify metadata output**

Run: `npm run build` then `npm run start`. Open `http://localhost:3000`, view source: confirm `<title>`, OG tags, and JSON-LD `Person`/`WebSite`/`FAQPage` present. Visit `/sitemap.xml`, `/robots.txt`, `/opengraph-image` — all render. Stop server.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: SEO + AEO (metadata, OG image, sitemap, robots, JSON-LD)"
```

---

### Task 12: Polish, accessibility, performance, completion gate

**Files:**
- Modify: any section needing spacing/contrast fixes
- Modify: `README.md` (setup + content-editing guide)
- Create: `.env.local` (local only — gitignored; do not commit)

**Interfaces:** none new.

- [ ] **Step 1: Consult the AEO skill for any content gaps**

Invoke the `seo-aeo-best-practices` skill; apply any high-value, low-effort recommendations (heading hierarchy, answerable phrasing, structured-data completeness) that aren't already covered. Skip anything requiring content you don't have.

- [ ] **Step 2: Accessibility pass**

Verify manually: single `<h1>` per page; sections use `<section>` with headings; all interactive elements reachable by keyboard with visible focus; color contrast of `muted`-on-`bg` and `accent`-on-`bg` meets AA (check with browser devtools). Fix any failures (e.g. bump `muted` lightness) inline.

- [ ] **Step 3: Reduced-motion check**

In devtools, emulate `prefers-reduced-motion: reduce`. Confirm `Reveal` renders content statically and smooth-scroll is disabled.

- [ ] **Step 4: Lighthouse pass**

Run: `npm run build && npm run start`. In Chrome devtools Lighthouse, run Performance + Accessibility + SEO on `/`. Target ≥95 Performance, ≥95 Accessibility, 100 SEO. Address regressions (image sizing, unused JS). Stop server.

- [ ] **Step 5: Update README**

Rewrite `README.md` with: project overview, `npm install` / `npm run dev`, how to edit content (`src/content/*.ts`, add blog posts as `src/content/blog/*.mdx`), env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`), and a note that the RAG chatbot is Phase 2.

- [ ] **Step 6: Final full verification**

Run: `npm test && npm run build`
Expected: all tests pass; production build clean.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: a11y/perf polish, README, completion gate"
```

---

## Notes for the implementer

- Before using any Next.js API (dynamic `params`, `next/og`, route handlers, MDX, metadata files), open the matching file under `node_modules/next/dist/docs/01-app/` and confirm the current signature — this Next.js 16 differs from older training data.
- `page.tsx` grows across tasks 5–11; each task specifies where the new section/JsonLd slots in. Final landing order: `FAQ JsonLd → Hero → About → Projects → Skills → Contact`.
- Placeholders left intentionally (marked `TODO(talha)`): GitHub/LinkedIn URLs, résumé PDF at `public/talha-shaikh-resume.pdf`, production domain in `src/lib/site.ts`, Resend env vars. None block build or tests; the contact route returns a clean 500 until env is set.
