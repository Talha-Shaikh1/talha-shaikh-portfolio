# Talha Shaikh — Portfolio

A fast, dark-first developer portfolio built with Next.js 16, Tailwind v4, and TypeScript.
Design direction: **Editorial Warm** (Fraunces + Inter + JetBrains Mono; warm charcoal + amber).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm test           # run Vitest (content integrity, contact route, blog lib)
npm run lint       # eslint
```

## Editing content

All copy lives in typed files under `src/content/` — no component edits needed:

- `profile.ts` — name, positioning, about narrative, résumé path.
- `projects.ts` — the project cards (add a project = add an entry). Set `deepDive: true`
  to generate a `/projects/<slug>` case-study page.
- `skills.ts` — skill groups.
- `socials.ts` — email + social links.
- `blog/*.mdx` — blog posts. Add a `.mdx` file with `title` / `description` / `date`
  frontmatter and it appears at `/blog` automatically.

## Environment variables

The contact form emails via [Resend](https://resend.com) (free tier). Copy `.env.example`
to `.env.local` and fill in:

```
RESEND_API_KEY=...            # from resend.com
CONTACT_TO_EMAIL=Talha369852@gmail.com
```

Without these, the site builds and runs fine; the contact endpoint returns a clean
"not configured" response instead of sending.

## Structure

```
src/
  app/              routes (landing, /blog, /projects/[slug], /api/contact, sitemap/robots/og)
  components/       ui/ (primitives), layout/ (chrome), sections/ (page sections), seo/
  content/          typed data + MDX blog posts
  lib/              cn, nav, blog, rate-limit, contact-schema, site
```

## SEO + AEO

Metadata + OpenGraph on every route, generated OG image, `sitemap.xml`, `robots.txt`, and
JSON-LD structured data (`Person`, `WebSite`, `FAQPage`, `Article`) for both search engines
and AI answer engines.

## To do

- Add the live **Botaura** URL in `src/content/projects.ts` (`links.live`).
- Add `public/talha-shaikh-resume.pdf` (draft in `talha-shaikh-resume.md`).
- Set the production domain in `src/lib/site.ts`.
- **Phase 2:** "Ask About Me" RAG chatbot (separate spec) — local embeddings + free-tier
  hosted LLM + a "see how this works" transparency panel.

## Deploy

Deploys to [Vercel](https://vercel.com/new) as-is. Set the env vars above in the Vercel
project settings.
