# Portfolio — Phase 1: Core Site — Design Spec

**Date:** 2026-07-11
**Owner:** Talha Shaikh
**Status:** Approved (brainstorming) — pending spec review before planning

## Goal

A fast, distinctive developer-portfolio site that reads as the work of a senior
engineer, targeting **remote backend / full-stack / AI roles**. Content is
typed local data (no CMS). This spec covers **Phase 1: the core site**. The
"Ask About Me" RAG chatbot is **Phase 2** and gets its own spec.

## Existing state

Clean `create-next-app` scaffold: Next.js 16.2, React 19.2, Tailwind v4,
TypeScript, ESLint. Default boilerplate `page.tsx` / `layout.tsx` /
`globals.css` will be replaced. `AGENTS.md` warns Next.js 16 has breaking
changes from prior versions — **read `node_modules/next/dist/docs/` before
writing framework code** (routing, metadata, MDX, route handlers).

## Design direction — "Editorial Warm"

Deliberately not the templated-dev-portfolio look. Technical, precise,
confident; warm and human, not flashy.

### Typography (all via `next/font/google`, self-hosted, no layout shift)
- **Fraunces** — display / headings (variable serif; distinctive, editorial)
- **Inter** — body / UI
- **JetBrains Mono** — tags, code, technical labels

### Color tokens (dark-first + light mode)

| Token     | Dark                      | Light                     |
|-----------|---------------------------|---------------------------|
| `bg`      | `#14110E` warm charcoal   | `#FAF6F0` warm off-white  |
| `surface` | `#1C1813`                 | `#FFFFFF`                 |
| `text`    | `#EDE6DD`                 | `#1A1613`                 |
| `muted`   | `#A79E92`                 | `#6B6157`                 |
| `accent`  | `#F0803C` amber           | `#C25A1E` (darkened, AA)  |
| `border`  | `rgba(237,230,221,.10)`   | `rgba(26,22,19,.10)`      |

- Tokens defined **CSS-first** via Tailwind v4 `@theme` in `globals.css`.
- Light/dark swap via a `.dark` class on `<html>` (custom dark variant),
  toggled by a persisted theme switch (localStorage) with an **inline no-flash
  script** in `layout.tsx` to set the class before paint.
- 4px spacing grid, deliberate modular type scale, restrained radii.
- All accent-on-bg and text-on-bg pairs verified to **WCAG AA**.

## Architecture & structure

### Routes (App Router)
- `/` — single long landing, anchor-navigated: **Hero → About → Projects →
  Skills → Contact**. (Best for recruiters scanning fast.)
- `/projects/[slug]` — optional per-project deep-dive pages.
- `/blog` — post list; `/blog/[slug]` — MDX post.

### Content (typed, separated from JSX) — `src/content/`
- `profile.ts` — name, positioning line, about narrative, résumé path.
- `projects.ts` — typed `Project[]` (see shape below).
- `skills.ts` — typed skill groups.
- `socials.ts` — email, GitHub, LinkedIn.
- `blog/*.mdx` — posts with frontmatter.

`Project` shape (indicative):
```ts
type Project = {
  slug: string;
  name: string;
  tagline: string;              // one line
  description: string;
  stack: string[];              // tech tags
  highlights: string[];         // 2–3 real engineering decisions
  links: { live?: string; github?: string; caseStudy?: string };
  featured?: boolean;
  deepDive?: boolean;           // has a /projects/[slug] page
};
```

### Components — `src/components/`
- `layout/` — Header, Footer, ThemeToggle, MobileNav
- `sections/` — Hero, About, Projects, Skills, Contact
- `ui/` — Button, Tag, Card, SectionHeading
- `blog/` — post list + MDX renderer wrappers

### Rendering & motion
- **Server Components by default.** Client JS only where required: theme
  toggle, mobile nav, scroll-reveal animations, contact form.
- **Framer Motion** for subtle `whileInView` fades/slides only; gated on
  `prefers-reduced-motion`. No gimmicky animation.

## Content plan

- **Hero:** name; one-line positioning ("I build and ship production SaaS and AI
  systems solo"); subtext (Next.js/TypeScript + applied AI: Botaura RAG SaaS,
  plus LMS and e-commerce); CTAs **View Projects** and **Contact / Résumé**.
- **About:** self-taught path framed as a strength (shipping > coursework),
  stated confidently. Flagship **Botaura** (live multi-tenant RAG chatbot SaaS,
  WhatsApp automation, Meta WhatsApp Tech Provider), plus Bait-ul-Kutub LMS, The
  Arqa e-commerce, AI Humanoid Robotics; GIAIC (Cloud Native Applied Generative
  AI). **Truthful content only** — all claims (including Botaura live + Meta Tech
  Provider) confirmed real by the user 2026-07-12.
- **Projects (priority section):** card grid, real projects.
  - **Botaura** (flagship, featured, deep-dive) — live multi-tenant RAG SaaS,
    WhatsApp automation, Meta Tech Provider. (Live URL pending from user.)
  - **Bait-ul-Kutub LMS** (featured) — full-stack LMS, Prisma/PostgreSQL, AI
    search. Live demo.
  - **AI Humanoid Robotics Platform** (featured) — Next.js/Python/ROS 2/OpenAI.
    Live demo.
  - **The Arqa E-Commerce** — Next.js/Sanity/Stripe. Live demo.
  - Adding a project = editing `projects.ts`.
- **Skills:** grouped **Frontend / Backend / AI-RAG / Infra-DevOps /
  Integrations** — labeled groups, not a tag cloud.
- **Contact:** working form **plus** links (email, LinkedIn, GitHub).
- **Blog:** MDX pipeline scaffolded with **one sample post** to prove the
  machinery; real posts added as `.mdx` files later.

## Contact form

- Fields: Name, Email, Message. Client-side + server-side validation.
- **Anti-spam:** hidden honeypot field + simple per-IP/session rate limit on
  the route handler.
- **Submission:** Next.js Route Handler → email via **Resend** (free tier, one
  `RESEND_API_KEY`). Accessible success / error states, disabled-while-sending.
- **Alternative (no provider):** Web3Forms (free, access-key only, no backend)
  documented as a swap-in if a provider is undesirable.
- Progressive: links work even if the form/JS fails.

## SEO + AEO (both required)

### SEO
- Next `metadata` API on every route; per-page title/description.
- **OpenGraph + Twitter** card tags; a generated **OG image** using the accent
  identity.
- `sitemap.ts` and `robots.ts`.
- Semantic HTML, clean heading hierarchy, canonical URLs.

### AEO (Answer Engine Optimization)
- **JSON-LD structured data:** `Person` (name, role, sameAs → socials),
  `WebSite`, `BreadcrumbList`, and `Article` for blog posts.
- **EEAT signals:** clear authorship, real project evidence, external links.
- Content written to be **directly answerable** (concise, factual sections;
  clear question-shaped headings where natural), so answer engines can quote
  it. Consider `FAQPage` schema for an About/FAQ block.
- Consult the `seo-aeo-best-practices` skill during implementation.

## Non-negotiables

- **Performance:** `next/font`, `next/image`, minimal client bundle,
  server-first. Optimize images.
- **Accessibility:** semantic landmarks, skip-link, visible focus rings, AA
  contrast (verified), full keyboard navigation.
- **Readable codebase:** clean, focused components; content decoupled from JSX.

## Testing (pragmatic — not heavy TDD on presentational UI)

- **Content-integrity test:** every `Project` / skill group has required fields
  and valid link shapes.
- **Contact route test:** validation + honeypot rejection + rate-limit behavior.
- **Completion gate:** `tsc` clean, production `build` clean, manual Lighthouse
  pass and keyboard/contrast pass.

## Placeholders to fill later (non-blocking)
- Real **GitHub** and **LinkedIn** URLs.
- **Résumé PDF** for the download CTA.
- `RESEND_API_KEY` (or Web3Forms access key) for the contact form.

## Out of scope (Phase 2, separate spec)
- "Ask About Me" RAG chatbot: local build-time embeddings (all-MiniLM-L6-v2,
  $0) + JSON vector store + cosine retrieval + free-tier hosted LLM generation
  (Groq/Gemini — pinned when Phase 2 is specced) + chat widget + "see how this
  works" transparency panel + rate limiting + `scripts/ingest.ts`.
