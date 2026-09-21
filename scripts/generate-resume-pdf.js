const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const resumeHtmlPath = path.join(__dirname, 'resume_export.html');
const pdf1 = path.join(__dirname, '../public/Muhammad_Talha_Resume.pdf');
const pdf2 = path.join(__dirname, '../public/talha-shaikh-resume.pdf');

const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Muhammad Talha Shaikh - Resume</title>
<style>
  @page {
    size: A4 portrait;
    margin: 8mm 10mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  body {
    color: #111827;
    background: #fff;
    line-height: 1.28;
    font-size: 8.3pt;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  header {
    border-bottom: 1.5px solid #d97736;
    padding-bottom: 5px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .header-left h1 {
    font-size: 18pt;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #111827;
    line-height: 1;
  }
  .header-left .title {
    font-size: 9.5pt;
    font-weight: 700;
    color: #d97736;
    margin-top: 2px;
  }
  .contact-col {
    text-align: right;
    font-size: 7.8pt;
    color: #374151;
    line-height: 1.35;
  }
  .contact-col a {
    color: #111827;
    text-decoration: none;
  }
  
  section {
    margin-top: 6px;
  }
  h2 {
    font-size: 8pt;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #d97736;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 1.5px;
    margin-bottom: 4px;
  }
  
  .summary-text {
    font-size: 8pt;
    color: #1f2937;
    line-height: 1.3;
  }
  
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 7.8pt;
  }
  .skills-row strong {
    color: #111827;
  }
  .skills-row {
    color: #374151;
  }
  
  .project {
    margin-bottom: 5px;
  }
  .proj-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .proj-title {
    font-size: 8.5pt;
    font-weight: 700;
    color: #111827;
  }
  .proj-role {
    font-size: 7.5pt;
    color: #6b7280;
    font-style: italic;
  }
  .proj-links {
    font-size: 7.4pt;
    color: #6b7280;
    margin-top: 0.5px;
  }
  .proj-links a {
    color: #d97736;
    text-decoration: none;
  }
  
  ul {
    list-style: none;
    margin-top: 2px;
  }
  li {
    position: relative;
    padding-left: 11px;
    margin-bottom: 1.5px;
    font-size: 7.8pt;
    color: #1f2937;
    line-height: 1.25;
  }
  li::before {
    content: "▪";
    position: absolute;
    left: 0;
    color: #d97736;
    font-size: 7.5pt;
    top: -1px;
  }
  
  .tech-tags {
    font-size: 7.2pt;
    color: #4b5563;
    margin-top: 1.5px;
  }
  .tech-tags strong {
    color: #111827;
  }

  .edu-row {
    display: flex;
    justify-content: space-between;
    font-size: 7.8pt;
    margin-bottom: 2px;
  }
  .edu-row strong {
    color: #111827;
  }
  .edu-status {
    color: #6b7280;
    font-style: italic;
    font-size: 7.5pt;
  }
</style>
</head>
<body>
  <header>
    <div class="header-left">
      <h1>MUHAMMAD TALHA SHAIKH</h1>
      <div class="title">Junior Full-Stack & AI Engineer</div>
    </div>
    <div class="contact-col">
      <div>Karachi, Pakistan · <a href="mailto:hello@talhaweb.xyz">hello@talhaweb.xyz</a> · +92 312 2843477</div>
      <div>
        <a href="https://talhaweb.xyz">talhaweb.xyz</a> · 
        <a href="https://github.com/Talha-Shaikh1">github.com/Talha-Shaikh1</a> · 
        <a href="https://linkedin.com/in/talha-shaikh">linkedin.com/in/talha-shaikh</a>
      </div>
    </div>
  </header>

  <section>
    <h2>Professional Summary</h2>
    <p class="summary-text">
      High-velocity <strong>Junior Full-Stack & AI Engineer</strong> (~1.5 years experience) trained through <strong>GIAIC (Governor Sindh Initiative for GenAI & Web3)</strong>. Proven track record architecting and deploying scalable web systems, agentic AI pipelines, and multi-tenant platforms solo. Shipped <strong>Botaura</strong> (162+ route multi-tenant RAG SaaS with Meta WhatsApp Tech Provider status), <strong>FlowCreator OS</strong> (AI video directing engine via Google Gemini SDK), <strong>ShieldTools</strong> (zero-server client-side privacy & COD economics platform), and <strong>Volvelo</strong> (luxury European marketplace with Clerk RBAC). Focused on clean architecture, sub-second latency, and immediate engineering impact.
    </p>
  </section>

  <section>
    <h2>Technical Skills</h2>
    <div class="skills-list">
      <div class="skills-row"><strong>Languages & Frameworks:</strong> TypeScript, JavaScript (ES6+), Python, Next.js 16 (App Router, Server Actions), React 19, FastAPI, Node.js, HTML5 Canvas API, jsPDF</div>
      <div class="skills-row"><strong>AI & Vector Retrieval (RAG):</strong> Google Gemini 2.5/3.6 Flash SDK, Reference Image Anchoring, OpenAI SDK, pgvector cosine similarity, BM25 Hybrid Retrieval, LangChain, Zod Structured Outputs</div>
      <div class="skills-row"><strong>Databases & Cloud:</strong> Neon PostgreSQL, Prisma ORM 6, Drizzle ORM, Supabase, Cloudflare R2, AWS S3, Vercel (Edge & Cron), Docker, Git & GitHub Actions</div>
      <div class="skills-row"><strong>Integrations & Architecture:</strong> WhatsApp Cloud API (Meta Tech Provider), Clerk Auth (RBAC Sync), Stripe Checkout, Resend, PWA, Zero-Knowledge Client Architecture, Multi-Tenant Row-Level Security</div>
    </div>
  </section>

  <section>
    <h2>Featured Systems & Engineering Projects</h2>

    <div class="project">
      <div class="proj-head">
        <span class="proj-title">Botaura — Multi-Tenant RAG AI Chatbot & WhatsApp Commerce SaaS [Flagship]</span>
        <span class="proj-role">Founder & Solo Engineer</span>
      </div>
      <div class="proj-links">Live: <a href="https://botaura.app">https://botaura.app</a> · Case Study: <a href="https://talhaweb.xyz/projects/botaura">talhaweb.xyz/projects/botaura</a></div>
      <ul>
        <li>Architected and deployed a multi-tenant SaaS across <strong>162+ production routes</strong>, enabling SMBs to train custom AI chatbots and automate WhatsApp sales.</li>
        <li>Implemented Hybrid RAG pipeline combining OpenAI embeddings with <code>pgvector</code> cosine similarity and BM25 search for English & Roman-Urdu queries with confidence thresholds.</li>
        <li>Meta WhatsApp Tech Provider: engineered token routing by <code>phone_number_id</code>, handling webhooks, templates, and ad attribution across merchant accounts with zero secret exposure.</li>
        <li>Enforced strict server-side tenant isolation with signed JWTs, UUID cascading, and hashed API keys, preventing cross-tenant data leaks by design.</li>
      </ul>
      <div class="tech-tags"><strong>Tech:</strong> Next.js 16, TypeScript, FastAPI, Python, PostgreSQL (Neon), pgvector, Cloudflare R2, Clerk Auth, Resend, Meta Graph API.</div>
    </div>

    <div class="project">
      <div class="proj-head">
        <span class="proj-title">FlowCreator OS — Autonomous AI Video Directing & CreatorOps Operating System</span>
        <span class="proj-role">Lead System Architect</span>
      </div>
      <div class="proj-links">Live: <a href="https://flow-creator-os.vercel.app/">https://flow-creator-os.vercel.app/</a> · Case Study: <a href="https://talhaweb.xyz/projects/flow-creator-os">talhaweb.xyz/projects/flow-creator-os</a></div>
      <ul>
        <li>Engineered Autonomous AI Director using Google Gemini Flash SDK to convert creative premises into camera-sequenced video prompt bundles for Google Veo 2 and Sora.</li>
        <li>Designed Reference Image Anchoring injecting master biometric tokens to eliminate diffusion face-drift, and Temporal Choreography for continuous room-tone match-cuts.</li>
        <li>Constructed CreatorOps WhatsApp bot with PKT time-zoned cron reminders via Green-API & CallMeBot for daily multi-platform upload tracking.</li>
      </ul>
      <div class="tech-tags"><strong>Tech:</strong> Next.js 16, React 19, Tailwind CSS v4, Google Gemini Flash, Neon Postgres, Prisma ORM 6, Clerk Auth, Vercel Cron, WhatsApp API.</div>
    </div>

    <div class="project">
      <div class="proj-head">
        <span class="proj-title">ShieldTools — Zero-Server Digital Privacy & COD E-Commerce Economics Platform</span>
        <span class="proj-role">Lead Architect & Creator</span>
      </div>
      <div class="proj-links">Live: <a href="https://tools.talhaweb.xyz/">https://tools.talhaweb.xyz/</a> · Case Study: <a href="https://talhaweb.xyz/projects/shield-tools">talhaweb.xyz/projects/shield-tools</a></div>
      <ul>
        <li>Built 100% in-browser zero-knowledge watermarking studio (DocShield™) using HTML5 Canvas & jsPDF to watermark CNIC/Passports in RAM with $0 backend cost.</li>
        <li>Engineered EcomShield™ COD unit economics engine isolating reverse courier penalties, packaging waste, and wasted ad spend on COD returns with automated WhatsApp summaries.</li>
        <li>Shipped installable Progressive Web App (PWA) with early prompt capture, achieving sub-second load times across 22 statically prerendered routes.</li>
      </ul>
      <div class="tech-tags"><strong>Tech:</strong> Next.js 16 (App Router + SSG), TypeScript, Tailwind CSS v4, HTML5 Canvas API, jsPDF, PWA Service Worker.</div>
    </div>

    <div class="project">
      <div class="proj-head">
        <span class="proj-title">Volvelo — Luxury Multi-Tenant European Dropshipping Marketplace</span>
        <span class="proj-role">Full-Stack Architect</span>
      </div>
      <div class="proj-links">Live: <a href="https://vovelo.vercel.app/">https://vovelo.vercel.app/</a> · Case Study: <a href="https://talhaweb.xyz/projects/volvelo">talhaweb.xyz/projects/volvelo</a></div>
      <ul>
        <li>Architected 48-route platform separating customer storefront, merchant atelier portal (/portal), and super-admin hub (/admin) on Neon PostgreSQL via Prisma ORM.</li>
        <li>Built bidirectional Clerk Cloud RBAC synchronization with Neon PostgreSQL, ensuring instant permission propagation to user session claims without re-login.</li>
        <li>Engineered dynamic client-side multi-currency engine (EUR, USD, GBP, PKR) with Zustand persistence and SSR hydration guards.</li>
      </ul>
      <div class="tech-tags"><strong>Tech:</strong> Next.js 16, React 19, TypeScript, Tailwind CSS v4, Neon Postgres, Prisma ORM, Clerk Core 3, Zustand.</div>
    </div>
  </section>

  <section>
    <h2>Education & Credentials</h2>
    <div class="edu-row">
      <span><strong>Cloud Native Applied Generative AI & Full-Stack Engineering</strong> — Governor Sindh Initiative (GIAIC)</span>
      <span class="edu-status">Ongoing</span>
    </div>
    <div class="edu-row">
      <span><strong>Meta WhatsApp Tech Provider Accreditation</strong> — Verified Cloud API Integration Architecture</span>
      <span class="edu-status">Verified</span>
    </div>
    <div class="edu-row">
      <span><strong>Intensive Project-Based Systems Development</strong> — Real-world production full-stack & AI software</span>
      <span class="edu-status">2022 – Present</span>
    </div>
  </section>
</body>
</html>`;

fs.writeFileSync(resumeHtmlPath, resumeHtml, 'utf8');

console.log('Generating 1-page ATS Resume PDF...');
try {
  const cmd = `"${edgePath}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${pdf1}" "file:///${resumeHtmlPath.replace(/\\\\/g, '/')}"`;
  execSync(cmd, { timeout: 15000 });
  fs.copyFileSync(pdf1, pdf2);
  const stats = fs.statSync(pdf1);
  console.log(`✓ Successfully created 1-page ATS Resume PDF (${stats.size} bytes)!`);
} catch (err) {
  console.error(`Failed generating PDF: ${err.message}`);
}
