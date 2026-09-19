const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const resumeHtmlPath = path.join(__dirname, 'resume_export.html');
const pdf1 = path.join(__dirname, '../public/Muhammad_Talha_Resume.pdf');
const pdf2 = path.join(__dirname, '../public/talha-shaikh-resume.pdf');

const resumeHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Muhammad Talha Shaikh - Resume</title>
<style>
  @page { margin: 18mm 16mm; size: A4; }
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  body { color: #111827; background: #fff; line-height: 1.45; font-size: 10pt; }
  
  header { border-bottom: 2px solid #e5e7eb; padding-bottom: 12px; margin-bottom: 14px; }
  h1 { font-size: 22pt; font-weight: 800; letter-spacing: -0.02em; color: #111827; }
  .title { font-size: 11pt; font-weight: 700; color: #d97736; margin-top: 2px; }
  .contact { margin-top: 6px; font-size: 9pt; color: #4b5563; display: flex; flex-wrap: wrap; gap: 8px; }
  .contact a { color: #111827; text-decoration: none; }
  
  section { margin-top: 14px; }
  h2 { font-size: 9pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #d97736; border-bottom: 1px solid #e5e7eb; padding-bottom: 3px; margin-bottom: 8px; }
  
  .project { margin-bottom: 10px; page-break-inside: avoid; }
  .proj-head { display: flex; justify-content: space-between; align-items: baseline; }
  .proj-title { font-size: 10pt; font-weight: 700; color: #111827; }
  .proj-role { font-size: 8.5pt; color: #6b7280; font-style: italic; }
  .proj-links { font-size: 8pt; color: #6b7280; margin-top: 1px; }
  .proj-links a { color: #4b5563; }
  
  ul { list-style: none; margin-top: 4px; }
  li { position: relative; padding-left: 14px; margin-bottom: 3px; font-size: 9pt; color: #1f2937; }
  li::before { content: "▪"; position: absolute; left: 0; color: #d97736; font-size: 8pt; top: -1px; }
  
  .tech-tags { font-size: 8pt; color: #4b5563; margin-top: 3px; }
  .tech-tags strong { color: #111827; }

  .skills-grid p { margin-bottom: 4px; font-size: 8.8pt; }
  .skills-grid strong { color: #111827; }
</style>
</head>
<body>
  <header>
    <h1>MUHAMMAD TALHA SHAIKH</h1>
    <div class="title">Junior Full-Stack & AI Engineer</div>
    <div class="contact">
      <span>Karachi, Pakistan</span> ·
      <span>talhashaikh728@gmail.com</span> ·
      <span>+92 312 2843477</span> ·
      <span>talhaweb.xyz</span> ·
      <span>github.com/Talha-Shaikh1</span> ·
      <span>linkedin.com/in/talha-shaikh</span>
    </div>
  </header>

  <section>
    <h2>Professional Summary</h2>
    <p style="font-size: 9pt; color: #1f2937; line-height: 1.45;">
      High-velocity <strong>Junior Full-Stack & AI Engineer</strong> (~1.5 years intensive building experience) trained through <strong>GIAIC (Governor Sindh Initiative for GenAI & Web3)</strong>, with a proven track record of architecting and deploying scalable web systems, agentic AI pipelines, and multi-tenant platforms solo. Shipped <strong>Botaura</strong> (162+ route multi-tenant RAG SaaS with Meta WhatsApp Tech Provider accreditation), <strong>FlowCreator OS</strong> (autonomous AI video directing engine with locked facial geometry via Google Gemini SDK), <strong>ShieldTools</strong> (zero-server client-side privacy & e-commerce economics platform with PWA), and <strong>Volvelo</strong> (48-route luxury European marketplace with Clerk RBAC sync). Dedicated to rapid skill acquisition, clean system design, and immediate engineering impact.
    </p>
  </section>

  <section>
    <h2>Technical Skills</h2>
    <div class="skills-grid">
      <p><strong>Languages & Frameworks:</strong> TypeScript, JavaScript (ES6+), Python, Next.js 16 (App Router, Turbopack, Server Actions), React 19, FastAPI, Node.js, HTML5 Canvas API, jsPDF</p>
      <p><strong>AI & Vector Retrieval (RAG):</strong> Google Gemini 2.5/3.6 Flash SDK, Reference Image Anchoring, Temporal Choreography, OpenAI SDK, OpenAI Agent SDK, LangChain, pgvector, BM25 Hybrid Retrieval, Structured JSON (Zod)</p>
      <p><strong>Databases & ORM:</strong> Neon Serverless PostgreSQL, Prisma ORM 6, Drizzle ORM, Supabase, MongoDB</p>
      <p><strong>Cloud, Edge & DevOps:</strong> Vercel (Edge & Cron), Docker, Cloudflare R2, AWS S3, Git & GitHub Actions, Sentry, Hugging Face Spaces</p>
      <p><strong>Integrations & APIs:</strong> WhatsApp Cloud API (Meta Tech Provider), Green-API, CallMeBot, Clerk Auth (Core 3 / RBAC Sync), Stripe Checkout, Resend, Sanity Headless CMS</p>
      <p><strong>Architecture & Best Practices:</strong> Zero-Knowledge Client Architecture, Multi-Tenant Row-Level Security, Progressive Web Apps (PWA), Answer Engine Optimization (AEO/JSON-LD)</p>
    </div>
  </section>

  <section>
    <h2>Featured Systems & Engineering Projects</h2>

    <div class="project">
      <div class="proj-head">
        <span class="proj-title">Botaura — Multi-Tenant RAG AI Chatbot & WhatsApp Commerce SaaS [Flagship]</span>
        <span class="proj-role">Founder & Solo Engineer</span>
      </div>
      <div class="proj-links">Live: <a href="https://botaura.app">https://botaura.app</a> · Case Study: talhaweb.xyz/projects/botaura</div>
      <ul>
        <li>Architected and deployed a multi-tenant SaaS platform spanning <strong>162+ production routes</strong>, enabling SMBs to train custom AI chatbots on proprietary knowledge bases and automate WhatsApp sales.</li>
        <li>Implemented Hybrid RAG pipeline combining OpenAI embeddings with <code>pgvector</code> cosine similarity and BM25 search for bilingual English/Roman-Urdu queries with automated confidence thresholds.</li>
        <li>Registered as Meta WhatsApp Tech Provider: built centralized token routing by phone_number_id, orchestrating real-time webhooks, templates, and ad attribution across multiple merchants.</li>
        <li>Enforced strict server-side tenant isolation with signed JWTs, UUID cascading, and hashed API keys, preventing cross-tenant data leakage by design.</li>
      </ul>
      <div class="tech-tags"><strong>Tech:</strong> Next.js 16, TypeScript, FastAPI, Python (asyncpg), PostgreSQL (Neon), pgvector, Cloudflare R2, Clerk Auth, Resend, Meta Graph API.</div>
    </div>

    <div class="project">
      <div class="proj-head">
        <span class="proj-title">FlowCreator OS — Autonomous AI Video Directing & CreatorOps Operating System</span>
        <span class="proj-role">Lead System Architect</span>
      </div>
      <div class="proj-links">Case Study: talhaweb.xyz/projects/flow-creator-os</div>
      <ul>
        <li>Engineered Autonomous AI Director using Google Gemini 2.5/3.6 Flash SDK to transform creative premises into camera-sequenced video production bundles for Google Veo 2 and Sora.</li>
        <li>Designed Reference Image Anchoring injecting master biometric tokens to eliminate diffusion face-drift, and temporal match-cuts with continuous room-tone.</li>
        <li>Built an Infinite 8-Season Continuity Escalation Engine with 1-click season transitions and automated PKT time-zoned WhatsApp reminders via Green-API & CallMeBot.</li>
      </ul>
      <div class="tech-tags"><strong>Tech:</strong> Next.js 16, React 19, Tailwind CSS v4, Google Gemini Flash, Neon Postgres, Prisma ORM 6, Clerk Auth, Vercel Cron, WhatsApp API.</div>
    </div>

    <div class="project">
      <div class="proj-head">
        <span class="proj-title">ShieldTools — Zero-Server Digital Privacy & COD E-Commerce Economics Platform</span>
        <span class="proj-role">Lead Architect & Creator</span>
      </div>
      <div class="proj-links">Live: <a href="https://tools.talhaweb.xyz/">https://tools.talhaweb.xyz/</a> · Case Study: talhaweb.xyz/projects/shield-tools</div>
      <ul>
        <li>Built 100% in-browser zero-knowledge watermarking studio (DocShield™) using HTML5 Canvas API and jsPDF to watermark sensitive national IDs (CNIC/Passports) directly in RAM with $0 backend cost.</li>
        <li>Engineered EcomShield™ COD unit economics engine isolating courier reverse shipping penalties, packaging waste, and burned CAC on COD returns with automated WhatsApp summaries.</li>
        <li>Implemented installable Progressive Web App (PWA) with early beforeinstallprompt event capture, achieving sub-second load times across 22 statically prerendered routes.</li>
      </ul>
      <div class="tech-tags"><strong>Tech:</strong> Next.js 16 (App Router + SSG), TypeScript, Tailwind CSS v4, HTML5 Canvas API, jsPDF, PWA Service Worker.</div>
    </div>

    <div class="project">
      <div class="proj-head">
        <span class="proj-title">Volvelo — Luxury Multi-Tenant European Dropshipping Marketplace & Atelier Hub</span>
        <span class="proj-role">Full-Stack Architect</span>
      </div>
      <div class="proj-links">Case Study: talhaweb.xyz/projects/volvelo</div>
      <ul>
        <li>Architected 48-route platform separating customer storefront, merchant atelier portal (/portal), and super-admin hub (/admin) with strict tenant partitioning on Neon PostgreSQL via Prisma ORM.</li>
        <li>Built bidirectional Clerk Cloud RBAC synchronization with Neon PostgreSQL, ensuring instant permission propagation to user session claims without re-login.</li>
        <li>Engineered dynamic client-side multi-currency engine (EUR, USD, GBP, PKR) with Zustand persistence and hydration guards avoiding React 19 SSR hydration mismatches.</li>
      </ul>
      <div class="tech-tags"><strong>Tech:</strong> Next.js 16, React 19, TypeScript, Tailwind CSS v4, Neon Postgres, Prisma ORM, Clerk Core 3, Zustand.</div>
    </div>

    <div class="project">
      <div class="proj-head">
        <span class="proj-title">GetF4F — P2P TikTok Social Growth & Heuristic Proof Verification Exchange</span>
        <span class="proj-role">Full-Stack Engineer</span>
      </div>
      <div class="proj-links">Live: <a href="https://f4f-tiktok.vercel.app/">https://f4f-tiktok.vercel.app/</a> · Case Study: talhaweb.xyz/projects/getf4f-tiktok</div>
      <ul>
        <li>Designed an asynchronous 24-hour delayed matching engine to mimic natural creator discovery and prevent mutual-follow algorithmic penalties on TikTok.</li>
        <li>Implemented heuristic screenshot validation analyzing profile UI signals, button states, and handles backed by a 100-point Trust Score and 5-day dispute grace period.</li>
        <li>Developed double-entry credit ledger, streak gamification mechanics, and emergency admin kill switches using Drizzle ORM on Neon PostgreSQL.</li>
      </ul>
      <div class="tech-tags"><strong>Tech:</strong> Next.js 16, React 19, TypeScript, Tailwind CSS v4, Neon Postgres, Drizzle ORM, Clerk Auth, AWS S3, Resend, PWA.</div>
    </div>
  </section>

  <section>
    <h2>Education & Credentials</h2>
    <div style="font-size: 8.8pt;">
      <div style="display: flex; justify-content: space-between;">
        <strong>Cloud Native Applied Generative AI & Full-Stack Engineering</strong> — Governor Sindh Initiative (GIAIC)
        <span style="color: #6b7280; font-style: italic;">Ongoing</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 2px;">
        <strong>Meta WhatsApp Tech Provider Accreditation</strong> — Verified Cloud API Integration Architecture
        <span style="color: #6b7280; font-style: italic;">Verified</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 2px;">
        <strong>Intensive Project-Based Systems Development</strong> — Real-world production full-stack & AI software
        <span style="color: #6b7280; font-style: italic;">2022 – Present</span>
      </div>
    </div>
  </section>
</body>
</html>`;

fs.writeFileSync(resumeHtmlPath, resumeHtml, 'utf8');

console.log('Generating updated ATS Resume PDF...');
try {
  const cmd = `"${edgePath}" --headless --disable-gpu --print-to-pdf="${pdf1}" "file:///${resumeHtmlPath.replace(/\\\\/g, '/')}"`;
  execSync(cmd, { timeout: 15000 });
  fs.copyFileSync(pdf1, pdf2);
  const stats = fs.statSync(pdf1);
  console.log(`✓ Successfully created updated ATS Resume PDF (${stats.size} bytes)!`);
} catch (err) {
  console.error(`Failed generating PDF: ${err.message}`);
}
