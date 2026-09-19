import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "botaura",
    name: "Botaura",
    category: "ai-rag",
    metrics: ["162+ Routes Shipped", "Meta Tech Provider", "pgvector RAG"],
    tagline: "Multi-tenant RAG chatbot SaaS & WhatsApp commerce platform with deep order automation.",
    description:
      "A production multi-tenant RAG SaaS built for Pakistani SMBs. Businesses ingest domain content (websites, catalogs, PDFs) to deploy intelligent AI chatbots on web widgets and WhatsApp Business with zero code, automated COD checkout, and team inbox routing.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "FastAPI",
      "Neon Postgres",
      "pgvector",
      "WhatsApp Cloud API",
      "OpenAI / Grok",
      "Cloudflare R2",
    ],
    highlights: [
      "Architected multi-tenant RAG pipeline combining pgvector cosine similarity, BM25 retrieval, and bilingual English/Roman-Urdu context grounding.",
      "Accredited as Meta WhatsApp Tech Provider — built centralized token routing by phone_number_id with ad attribution and webhook orchestration.",
      "Enforced strict server-side tenant isolation with JWT authentication and UUID cascading across 162+ production endpoints.",
    ],
    links: { live: "https://botaura.app", caseStudy: "/projects/botaura" },
    image: "/previews/botaura.png",
    previewUrl: "botaura.app",
    featured: true,
    deepDive: true,
    caseStudy: {
      context: "Founder & Solo Systems Architect — Complete Product: Architecture, Backend, Frontend, and Cloud Infrastructure.",
      slogan: "Bot nahi. Aura.",
      overview:
        "Botaura is a multi-tenant AI platform enabling small and medium enterprises to train custom generative AI agents over their proprietary catalogs, PDFs, and web pages. It orchestrates zero-code web widgets and complete WhatsApp Business automations — including lead qualification, product recommendations, cash-on-delivery (COD) order placement, and live human-agent handoffs.",
      problem:
        "Pakistani SMBs conduct the vast majority of sales conversations on WhatsApp but lack automated 24/7 engagement. Generic chatbots fail because they lack domain catalog knowledge and cannot complete checkout flows, while international enterprise SaaS platforms are prohibitively expensive and lack local currency/payment support. Botaura solves this with instant, self-serve, localized AI commerce.",
      solution:
        "A highly scalable multi-tenant architecture where every merchant configures an AI assistant trained on custom business data, integrated directly into WhatsApp Cloud API with automatic catalog sync, COD checkout flows, broadcast messaging, and agent inbox handoffs.",
      capabilities: [
        "End-to-End RAG Knowledge Ingestion: Multi-format document parser, chunking engine, and vector indexing with pgvector.",
        "WhatsApp Commerce Engine: Conversational catalog search, automated COD order confirmation, and abandoned cart recovery.",
        "Meta Tech Provider Token Router: High-throughput webhook engine handling template approvals, message events, and delivery reconciliation.",
        "Universal Store API: Plug-and-play event ingestion layer with adapters for WooCommerce and Shopify.",
        "Enterprise Observability: Real-time bot health monitoring, telemetry dashboards, and automated fail-safe recovery.",
      ],
      architecture: [
        {
          title: "Cryptographic & Row-Level Tenant Isolation",
          body:
            "Every database entity strictly cascades from tenant business records. Request context resolves business IDs server-side from cryptographically signed JWTs, hashed API keys, or verified WhatsApp phone IDs — guaranteeing zero cross-tenant data leakage.",
        },
        {
          title: "Meta Tech Provider Centralized Routing Architecture",
          body:
            "Rather than managing fragile per-client API secrets, Botaura operates a single high-security Tech Provider token and dispatches outbound/inbound traffic dynamically by phone_number_id. Clients are billed directly by Meta while the platform securely orchestrates all messaging.",
        },
        {
          title: "Hybrid Retrieval with Multilingual Roman-Urdu Grounding",
          body:
            "Combines dense pgvector cosine embeddings with sparse BM25 keyword matching to accurately understand mixed English and Roman-Urdu queries common in Pakistani commerce. Features automated confidence scoring for seamless human agent handoffs.",
        },
        {
          title: "Production Infrastructure & Relay Topology",
          body:
            "Built a distributed relay layer between Next.js Edge routes on Vercel and high-performance Python FastAPI workers on Hugging Face Spaces / Neon DB to guarantee sub-second LLM streaming and flawless TLS handshakes with Meta Graph APIs.",
        },
      ],
      challenges: [
        {
          problem:
            "Production Token Regeneration Bug: A live system-level Meta credential rotation silently disrupted WhatsApp Business Account (WABA) asset delegation for a pilot merchant.",
          solution:
            "Rapidly diagnosed root cause via Meta Graph API logs, restored webhook routing without downtime, and implemented automated token renewal validation tests.",
        },
        {
          problem:
            "Silent Order Flow Discrepancies: COD checkout notifications failing due to unconfigured WABA multi-currency settings without visible error feedback.",
          solution:
            "Engineered dedicated logging tables, structured admin telemetry cards, and real-time merchant alert notifications to surface execution anomalies instantly.",
        },
        {
          problem:
            "Webhook Security & Fail-Open Vulnerability in Event Ingestion.",
          solution:
            "Hardened signature validation middleware with SHA-256 HMAC verification to enforce strict fail-safe rejection of untrusted payloads.",
        },
      ],
      results: [
        "Architected and shipped 162+ production routes solo across full-stack Next.js and FastAPI services.",
        "Successfully onboarded and automated operations for a live commercial pilot client (organic consumer goods brand).",
        "Shipped comprehensive revenue tools: Click-to-WhatsApp ad attribution, broadcast marketing campaigns, and cart recovery.",
        "Constructed zero-friction Store API for WooCommerce and Shopify inventory synchronization.",
      ],
      stackSummary: [
        "Next.js 16", "TypeScript", "Tailwind CSS", "Clerk Auth", "Drizzle ORM", "FastAPI",
        "Python (asyncpg)", "Neon Postgres", "pgvector", "Cloudflare R2", "Resend", "Sentry",
        "Meta Graph API (WhatsApp Business)", "OpenAI & Grok APIs",
      ],
    },
  },
  {
    slug: "flow-creator-os",
    name: "FlowCreator OS",
    category: "ai-rag",
    metrics: ["Gemini 2.5/3.6 Directing", "8-Season Continuity", "Zero Face-Drift", "4-Platform Ops"],
    tagline: "Autonomous AI Video Directing & CreatorOps Operating System with locked character biometrics.",
    description:
      "A next-generation AI video director and creator automation platform that transforms high-level creative premises into broadcast-grade, multi-clip video batches with locked character facial geometry, seamless match-cut cinematography, multi-season continuity, and automated multi-platform distribution.",
    stack: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS v4",
      "Google Gemini 2.5/3.6",
      "Neon Postgres",
      "Prisma ORM 6",
      "Clerk Auth",
      "Vercel Cron",
      "WhatsApp API",
    ],
    highlights: [
      "Engineered Autonomous AI Director using Google Gemini SDK with Reference Image Anchoring to eliminate face-drift across 28-clip weekly video batches.",
      "Built an Infinite 8-Season Continuity Escalation Engine with 1-click season transitions, dynamic stakes scaling, and temporal match-cut cinematography.",
      "Automated multi-platform distribution (YouTube Shorts, IG Reels, TikTok, FB) with time-zoned PKT WhatsApp reminders via Green-API and CallMeBot.",
    ],
    links: {
      live: "https://flow-creator-os.vercel.app/",
      github: "https://github.com/Talha-Shaikh1/flow-creator-os",
      caseStudy: "/projects/flow-creator-os",
    },
    image: "/previews/flow-creator-os.png",
    previewUrl: "flow-creator-os.vercel.app",
    featured: true,
    deepDive: true,
    caseStudy: {
      context: "Lead Engineer & System Architect — Autonomous Generative Video Directing & Creator Automation Platform.",
      slogan: "Autonomous AI Filmmaking. Mathematically Locked Continuity.",
      overview:
        "FlowCreator OS is an enterprise-grade autonomous video directing and operations engine built for high-output digital creators, media studios, and solo video entrepreneurs. While generative video models (Google Veo, OpenAI Sora, Runway Gen-3) produce breathtaking 5–10 second snippets, they lack cinematic continuity, spatial awareness, speaker choreography, and narrative pacing. FlowCreator OS bridges this industry gap by generating camera-sequenced prompt bundles with locked facial geometry, adaptive story pacing, and automated 4-platform distribution.",
      problem:
        "Creators lose hours wrestling with AI face-drift, stitched 10-second clips with jarring random cuts, voices hallucinating across multiple characters in one frame, and the friction of publishing daily across 4 social networks without missing scheduled engagement windows.",
      solution:
        "An autonomous director core powered by Google Gemini that generates locked prompt bundles with Reference Image Anchoring, temporal single-speaker choreography, eyeline match-cut rules with continuous room-tone, an 8-season stakes escalation ladder, and automated hourly WhatsApp upload tracking.",
      capabilities: [
        "Autonomous Cast Generation: Automatically parses story loglines to generate tailored character archetypes, biometric tokens, and psychological motivations.",
        "Reference Image Anchoring: Injects master facial reference geometry tokens while isolating wardrobe and scene lighting to eliminate hallucination.",
        "Adaptive Episode Pacing: Dynamically scales episode length (30s suspense hooks, 40s clue interrogations, 50s–60s season finales).",
        "Infinite 8-Season Continuity Engine: 1-click escalation carrying forward unresolved mysteries, protagonist DNA, and fresh antagonist archetypes.",
        "CreatorOps Multi-Platform Hub: 4-platform upload tracking (YouTube, Instagram, TikTok, Facebook) with time-zoned WhatsApp alerts.",
      ],
      architecture: [
        {
          title: "Autonomous Directing Core & Structured Output Validation",
          body:
            "Powered by Google Gemini 2.5/3.6 Flash via the official @google/genai SDK. Prompts are strictly validated through comprehensive Zod schemas to guarantee valid structured JSON production bundles, camera directives, and Midjourney master keyframe prompts.",
        },
        {
          title: "Reference Image Anchoring & Eyeline Match-Cut Directives",
          body:
            "Instead of repeatedly describing physical traits (which causes diffusion drift), prompts inject locked reference anchors. Inter-clip transitions use eyeline and action match-cuts with continuous acoustic room-tone; black cuts are strictly isolated to cliffhanger beats at 0:09.5s.",
        },
        {
          title: "Serverless Persistence & Anonymous-to-User Migration",
          body:
            "Relational data schema managed with Prisma ORM 6 on Neon Serverless PostgreSQL. Clerk Authentication with custom error boundaries protects against CDN dropouts and seamlessly migrates guest workflows into authenticated creator accounts.",
        },
        {
          title: "Timezone-Aware WhatsApp Automation & Edge Crons",
          body:
            "Vercel Cron scheduler triggers hourly background workers configured between 2:00 PM and 11:00 PM Pakistan Time (PKT). Messages dispatch through Green-API and CallMeBot gateways detailing pending video uploads across channels.",
        },
      ],
      challenges: [
        {
          problem:
            "AI Character Face-Drift: Generative video models hallucinate differing faces across consecutive clips when prompts re-describe character features.",
          solution:
            "Engineered Reference Image Anchoring that binds character geometry to master tokens, isolating per-clip wardrobe and lighting directives.",
        },
        {
          problem:
            "Dual-Speaker Animation Collisions: Having two characters speak in a single 10-second clip causes AI models to blend voices and animate incorrect lips.",
          solution:
            "Implemented Temporal Choreography enforcing strict single-speaker isolation per clip with explicit silence directives for off-screen/secondary characters.",
        },
        {
          problem:
            "Inconsistent Daily Posting Cycles: Digital creators struggle to post consistently across 4 social networks every day.",
          solution:
            "Constructed CreatorOps WhatsApp bot with PKT time-zoned hourly checks and a centralized 4-platform status dashboard.",
        },
      ],
      results: [
        "Reduced video production prompt engineering time by 95% (from 3 hours to 15 seconds for a 7-day schedule).",
        "Achieved zero face-drift across multi-episode story arcs using master biometric token locks.",
        "Quadrupled distribution output by generating tailored high-CTR titles, hashtags, and descriptions for 4 platforms in 1 click.",
        "Delivered 100% posting consistency through automated WhatsApp alerting workflows.",
      ],
      stackSummary: [
        "Next.js 16", "React 19", "Tailwind CSS v4", "Google Gemini Flash", "Neon Postgres",
        "Prisma ORM 6", "Clerk Auth", "Vercel Cron", "Green-API", "CallMeBot", "Zod",
      ],
    },
  },
  {
    slug: "shield-tools",
    name: "ShieldTools",
    category: "tools",
    metrics: ["$0 Server Costs", "100% In-Browser Privacy", "PWA Installable", "Live Production"],
    tagline: "Zero-server-cost web utilities platform for secure ID watermarking & COD e-commerce economics.",
    description:
      "An ultra-modern, zero-server-cost web utilities platform engineered to solve identity theft and COD return losses. Features DocShield™ for 100% in-browser CNIC/ID watermarking with zero file uploads, and EcomShield™ for COD return loss isolation and breakeven CAC modeling.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS v4",
      "HTML5 Canvas API",
      "jsPDF",
      "PWA Service Worker",
      "Schema.org JSON-LD",
    ],
    highlights: [
      "Built 100% client-side graphic processing pipeline using HTML5 Canvas API and jsPDF, watermarking confidential IDs in browser RAM with $0 backend cost.",
      "Engineered EcomShield™ COD unit economics engine isolating courier reverse penalties, wasted CAC, and return-to-origin loss matrices.",
      "Developed standalone Progressive Web App (PWA) with early beforeinstallprompt event capture and 22 statically prerendered routes.",
    ],
    links: {
      live: "https://tools.talhaweb.xyz/",
      github: "https://github.com/Talha-Shaikh1/shield-tools",
      caseStudy: "/projects/shield-tools",
    },
    image: "/previews/shield-tools.png",
    previewUrl: "tools.talhaweb.xyz",
    featured: true,
    deepDive: true,
    caseStudy: {
      context: "Lead Full-Stack Architect & Product Strategist — 100% In-Browser Privacy & E-Commerce Financial Intelligence.",
      slogan: "Zero-Knowledge Security. Brutal Financial Clarity.",
      overview:
        "ShieldTools is a zero-server-cost web utilities suite solving two pervasive digital problems: unsecured identity document sharing (DocShield™) and blindspot cash burn on Cash-on-Delivery e-commerce returns (EcomShield™). Operating on a Zero-Knowledge Architecture, all image transformations and financial calculations execute client-side in browser RAM—incurring $0 server costs while guaranteeing zero data leaks.",
      problem:
        "Millions of citizens share scans of national ID cards (CNIC, Aadhaar, Passports) via WhatsApp/email for SIMs, jobs, and banking, leaving them vulnerable to loan fraud and identity theft. Meanwhile, 70-85% of emerging-market e-commerce runs on COD with up to 30% RTO rates; merchants mistakenly calculate profits without factoring in double courier penalties and burned ad spend.",
      solution:
        "DocShield™ delivers zero-upload document watermarking with fraud-proof purpose stamping, institution locking, and cross-grid patterns in client RAM. EcomShield™ computes exact courier return penalties, marketing CAC burn, and diagnostic health matrices with 1-click WhatsApp and PDF reports.",
      capabilities: [
        "DocShield™ Dual Document Studio: Single-card and dual-side front & back stitching with automated vertical and horizontal layout merging.",
        "Fraud-Proof Preset Stamping: 1-click purpose presets ('FOR SIM VERIFICATION ONLY', 'FOR BANK KYC ONLY') with institution recipient locking and date stamps.",
        "Security Cross-Grid Matrix: Full-coverage diagonal security pattern to defeat AI inpainting, clone stamping, and crop attempts.",
        "EcomShield™ Return Loss Isolator: Isolates cash burned on reverse courier penalties, packaging loss, and wasted ad spend.",
        "Breakeven CAC Formula: Calculates the exact tolerable cost per acquisition before a product or campaign turns unprofitable.",
        "Viral Embed Engine: Distraction-free iframe widgets with attribution pills delivering organic backlink authority.",
      ],
      architecture: [
        {
          title: "Zero-Knowledge In-Memory Graphic Processing",
          body:
            "Engineered entirely on the HTML5 Canvas API in browser memory. Uploaded files pass through FileReader into memory buffers without network transmission. High-resolution exports generate locally via jsPDF and Canvas blob serialization.",
        },
        {
          title: "Hydration Race-Condition PWA Engine",
          body:
            "Injected an inline early-capture script into the HTML head to intercept beforeinstallprompt before Next.js React hydration finishes, caching the prompt on window.__pwaPrompt and triggering custom install modals smoothly.",
        },
        {
          title: "Tailwind CSS v4 Custom Variant Theme Engine",
          body:
            "Implemented @custom-variant dark (&:where(.dark, .dark *)) in globals.css paired with an early-execution localStorage script to guarantee instant theme switching without Flash of Unthemed Content (FOUC).",
        },
        {
          title: "Zero Marginal Cost Static Architecture",
          body:
            "Statically prerendered all 22 routes via Next.js Static Site Generation (SSG). Delivers sub-second initial load times worldwide on Vercel Edge Network with $0 monthly infrastructure overhead.",
        },
      ],
      challenges: [
        {
          problem:
            "Sensitive Document Privacy Vulnerability: Traditional watermarking tools upload user national IDs to server disks or third-party cloud buckets, risking privacy leaks.",
          solution:
            "Architected a 100% client-side pipeline using HTML5 Canvas and jsPDF, processing all pixel manipulations strictly inside browser RAM.",
        },
        {
          problem:
            "Next.js App Router PWA Prompt Race Condition: Native beforeinstallprompt fires prior to React hydration, causing install buttons to miss the prompt event.",
          solution:
            "Engineered an early-capture script in document head that stores the prompt reference and fires a custom event once UI mounts.",
        },
        {
          problem:
            "COD Profit Blindspot in Emerging E-Commerce: Sellers calculate profits on retail price minus wholesale cost, ignoring reverse courier penalties on 25%+ RTO.",
          solution:
            "Developed an automated diagnostic health matrix classifying margins (Healthy, Vulnerable, Cash Burning) and computing exact Breakeven CAC.",
        },
      ],
      results: [
        "Deployed to production with $0 monthly server costs serving unlimited global traffic.",
        "Engineered 100% private document processing with zero server-side telemetry or file storage.",
        "Integrated Schema.org JSON-LD (SoftwareApplication, FAQPage, Organization) for AI Answer Engine Optimization (Perplexity, SGE).",
        "Built standalone PWA running with zero address bar across desktop and mobile devices.",
      ],
      stackSummary: [
        "Next.js 16", "TypeScript", "Tailwind CSS v4", "HTML5 Canvas API", "jsPDF", "html2canvas",
        "PWA Service Worker", "Vercel Edge", "Lucide React", "Schema.org",
      ],
    },
  },
  {
    slug: "volvelo",
    name: "Volvelo — Luxury Atelier Marketplace",
    category: "ecommerce",
    metrics: ["48 Next.js Routes", "Strict Multi-Tenant", "Clerk Cloud RBAC Sync", "EUR/USD/GBP/PKR"],
    tagline: "Luxury multi-tenant European dropshipping marketplace & artisan atelier ecosystem.",
    description:
      "A production-grade, multi-tenant luxury e-commerce platform and artisan atelier marketplace built with Next.js 16 (Turbopack) and React 19. Connects independent European makers with international luxury consumers with strict tenant isolation, dynamic currency conversion, and enterprise admin suites.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Neon Postgres",
      "Prisma ORM",
      "Clerk Core 3",
      "Zustand",
    ],
    highlights: [
      "Architected strict multi-tenant data partitioning separating customer storefront, merchant atelier portal (/portal), and super-admin hub (/admin).",
      "Engineered bidirectional Clerk Cloud RBAC synchronization with Neon PostgreSQL, ensuring instant permission propagation without session desync.",
      "Built a client-side multi-currency engine (EUR, USD, GBP, PKR) with Zustand persistence and 3-tier international payment processing.",
    ],
    links: {
      live: "https://vovelo.vercel.app/",
      github: "https://github.com/Talha-Shaikh1/volvelo-ecommerce",
      caseStudy: "/projects/volvelo",
    },
    image: "/previews/volvelo.png",
    previewUrl: "vovelo.vercel.app",
    featured: true,
    deepDive: true,
    caseStudy: {
      context: "Author & Lead Full-Stack Architect — Enterprise Multi-Tenant E-Commerce & Merchant Atelier Ecosystem.",
      slogan: "European Craftsmanship. Multi-Tenant Enterprise Architecture.",
      overview:
        "Volvelo is a production-grade luxury marketplace connecting independent European artisans (Swiss horologists, Milanese leather ateliers, French cashmere weavers) with global consumers. The architecture incorporates strict tenant data isolation, real-time Clerk Cloud RBAC synchronization, dynamic multi-currency calculations, an abandoned cart recovery pipeline, and structured Answer Engine Optimization (AEO).",
      problem:
        "Luxury craft makers lack direct-to-consumer software infrastructure that preserves their boutique atelier branding while managing global fulfillment, multi-currency conversions, and commission splitting, while standard marketplace templates fail to convey bespoke European luxury aesthetics.",
      solution:
        "A modular three-tier architecture: an ultra-fast customer storefront with multi-currency shopping, an isolated Merchant Atelier Portal (/portal) where makers manage inventory and fulfillment, and an Enterprise Super-Admin Hub (/admin) spanning 48 Next.js routes.",
      capabilities: [
        "Strict Multi-Tenant Partitioning: Makers operate within isolated tenant boundaries; cross-tenant queries and orders are barred at middleware and database levels.",
        "Bidirectional Clerk RBAC Synchronization: Automatically syncs database role updates directly into Clerk Cloud publicMetadata via updateUserMetadata.",
        "Dynamic Multi-Currency Converter: Real-time client-side conversion between EUR (€), USD ($), GBP (£), and PKR (Rs.) persisted in Zustand.",
        "3-Tier International Checkout: Supports Credit/Debit card tokenization, Cash-on-Delivery (domestic), and Direct Bank Wire / IBAN for high-ticket orders.",
        "Enterprise Admin Suite: 48 routes covering inventory SKU management, multi-carrier tracking injection (DHL, FedEx), and abandoned cart recovery.",
        "AEO & AI Search Schemas: Organization, WebSite, FAQPage, CollectionPage, and BreadcrumbList structured data targeting GPTBot and Perplexity.",
      ],
      architecture: [
        {
          title: "Multi-Tenant Data Partitioning & Route Guards",
          body:
            "Implemented strict tenantId query scoping and Clerk middleware route guards. Super-admins have unified atelier switcher bars, while merchant sessions are cryptographically locked to their own inventory and sales data.",
        },
        {
          title: "Bidirectional Role Sync (Clerk Core 3 + Neon Postgres)",
          body:
            "Utilized async clerkClient() APIs to synchronize SUPER_ADMIN, ADMIN, SUPPORT, and MERCHANT roles between Neon PostgreSQL and Clerk session tokens, eliminating role propagation lag.",
        },
        {
          title: "Zero Hydration Mismatch Client State",
          body:
            "Configured hydration guards for Zustand stores (Cart, Wishlist, Currency) ensuring seamless server-to-client transitions with zero React 19 console errors.",
        },
        {
          title: "Relational Schema & Connection Pooling",
          body:
            "Prisma ORM with Neon Serverless PostgreSQL connection pooling handles complex atelier relationships, hierarchical product taxonomies, and multi-tier promotion codes.",
        },
      ],
      challenges: [
        {
          problem:
            "RBAC Session Desynchronization: Role updates made in admin dashboards failed to immediately update user JWT session claims in Clerk without forcing a re-login.",
          solution:
            "Implemented bidirectional metadata synchronization via Clerk updateUserMetadata, pushing instant claim updates to the cloud auth provider.",
        },
        {
          problem:
            "Multi-Tenant Cross-Contamination Risk: Without strict partitioning, concurrent queries could leak orders or customer data between competing ateliers.",
          solution:
            "Built a tenant isolation middleware guard that validates merchant ownership on every server action and database query.",
        },
        {
          problem:
            "React 19 SSR Hydration Mismatch with Persistent Zustand Stores: LocalStorage cart and currency data differing from server prerenders created client console warnings.",
          solution:
            "Engineered client-side hydration wrappers that mount persisted state cleanly after initial DOM paint.",
        },
      ],
      results: [
        "Engineered full enterprise platform spanning 48 dynamic and static Next.js 16 routes.",
        "Implemented real-time margin splitting (85% Maker Net Payout vs. 15% Platform Commission).",
        "Optimized Core Web Vitals and structured data for AI answer engines (ClaudeBot, PerplexityBot, GPTBot).",
        "Built responsive mega-menus, side-cart drawers, and animated checkout confetti micro-interactions.",
      ],
      stackSummary: [
        "Next.js 16", "React 19", "Tailwind CSS v4", "TypeScript", "Neon Postgres",
        "Prisma ORM", "Clerk Core 3", "Zustand", "Canvas Confetti", "Lucide React",
      ],
    },
  },
  {
    slug: "getf4f-tiktok",
    name: "GetF4F — TikTok Social Growth Exchange",
    category: "fullstack",
    metrics: ["24h Delayed Matching", "AI Proof Verification", "Double-Entry Ledger", "Trust Score System"],
    tagline: "Organic P2P TikTok growth platform with screenshot heuristics, delayed reciprocal matching & credit economy.",
    description:
      "A scalable, organic peer-to-peer social growth platform that enables TikTok creators to safely exchange followers, likes, and engagement through heuristic proof analysis, asynchronous reciprocal matching, and a self-healing credit economy.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Neon Postgres",
      "Drizzle ORM",
      "Clerk Auth",
      "AWS S3",
      "PWA",
    ],
    highlights: [
      "Engineered an asynchronous 24-hour delayed matching engine to mimic human discovery and prevent TikTok reciprocal-follow algorithmic penalties.",
      "Implemented AI-assisted screenshot proof verification pipeline analyzing UI element layouts, button states, and target handles.",
      "Constructed double-entry credit ledger, streak gamification mechanics, and a self-healing 100-point Trust Score reputation system.",
    ],
    links: {
      live: "https://f4f-tiktok.vercel.app/",
      github: "https://github.com/Talha-Shaikh1/getf4f",
      caseStudy: "/projects/getf4f-tiktok",
    },
    image: "/previews/getf4f-tiktok.png",
    previewUrl: "f4f-tiktok.vercel.app",
    featured: true,
    deepDive: true,
    caseStudy: {
      context: "Full-Stack Architect & Lead Developer — P2P Social Growth Exchange & Proof Verification Engine.",
      slogan: "Organic Creator Growth. Algorithm-Safe Reciprocal Matching.",
      overview:
        "GetF4F is a production-grade social growth platform designed to help TikTok creators overcome the critical 1,000-follower threshold needed for TikTok LIVE and monetization features. Operating without an official TikTok follow-verification API, GetF4F uses an asynchronous delayed-matching queue, heuristic screenshot validation, and a self-healing Trust Score economy to protect creators from fake bots and algorithmic shadowbans.",
      problem:
        "TikTok creators struggle to unlock LIVE features, buying fake bots results in shadowbans, and mutual following within seconds triggers TikTok's automated anti-spam flags. Furthermore, TikTok provides no commercial API to verify follower relationships.",
      solution:
        "A rule-governed peer exchange platform: tasks are assigned asynchronously with a 24-hour buffer, proof screenshots are verified with heuristic checks, and users maintain a 100-point Trust Score with automated penalties for unfollowers.",
      capabilities: [
        "Asynchronous Delayed Matching: Matches creators 24 hours apart to mimic organic discovery and eliminate reciprocal follow flag detection.",
        "AI-Assisted Screenshot Verification: Validates MIME payloads, minimum dimensions, profile button states ('Following' vs 'Follow'), and handles.",
        "Self-Healing Trust Score: All users start at 100 Trust Score. Freeloaders or unfollowers lose 15 points; accounts below 60 are automatically banned.",
        "Double-Entry Credit Ledger: Every credit earned, spent, or refunded is tracked with immutable transactional integrity.",
        "Admin Operations Suite: Global emergency kill switch, live cooldown settings manager, spot-check audit queue, and administrative activity logs.",
      ],
      architecture: [
        {
          title: "Asynchronous Queue & Anti-Bot Rate Limiting",
          body:
            "Server actions process task matching with cooldown windows and historical pair checking. Prevents duplicate pairings and enforces dynamic velocity limits (5-20 matches/day) to keep creators within safe social algorithmic parameters.",
        },
        {
          title: "Hybrid Consensus Verification Pipeline",
          body:
            "Combines immediate client-side screenshot analysis with a 5-day grace period. If a user unfollows during the grace period, peer reporting triggers evidence review before credit balances finalize.",
        },
        {
          title: "Relational Schema with Drizzle ORM on Neon Postgres",
          body:
            "Utilized Drizzle ORM's type-safe query builder on Neon Serverless PostgreSQL for transactional credit mutations, user status state machines, and relational match logs.",
        },
        {
          title: "Progressive Web App & Multi-Channel Alerts",
          body:
            "Configured installable PWA manifest with background service workers, transactional emails via Resend, and automated WhatsApp match notifications.",
        },
      ],
      challenges: [
        {
          problem:
            "Closed Social Ecosystem: TikTok offers no commercial API to programmatically verify whether User A followed User B.",
          solution:
            "Engineered a hybrid consensus model: client screenshot heuristic analysis paired with a 5-day grace period and peer accountability.",
        },
        {
          problem:
            "Algorithmic Reciprocal-Follow Penalties: Rapid instant follow-backs trigger TikTok anti-spam filters.",
          solution:
            "Built a time-delayed queue engine that defers follow-backs by 24–48 hours, blending actions into natural creator discovery patterns.",
        },
        {
          problem:
            "Freeloader Exploits: Bad actors attempting to gain followers without contributing follows to the community.",
          solution:
            "Enforced strict credit-gated queue access requiring earned credits before entering the follower queue, backed by -15 trust penalties.",
        },
      ],
      results: [
        "Architected full-stack application with Next.js 16 Server Actions, Neon PostgreSQL, and Drizzle ORM.",
        "Protected creator accounts with 24-hour delayed matching algorithms mimicking natural human activity.",
        "Cut fraudulent task submissions and manual moderation overhead via heuristic screenshot validation.",
        "Shipped complete administrative operations dashboard with live kill switches and audit trails.",
      ],
      stackSummary: [
        "Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Neon Postgres",
        "Drizzle ORM", "Clerk Auth", "AWS S3", "Resend", "PWA", "Zod",
      ],
    },
  },
  {
    slug: "bait-ul-kutub",
    name: "Bait-ul-Kutub LMS",
    category: "ai-rag",
    metrics: ["AI Semantic Search", "PostgreSQL & Prisma", "Full CRUD & Loans"],
    tagline: "Smart Full-Stack Library Management System with AI-powered semantic search.",
    description:
      "A modern full-stack LMS managing catalogs, member tiers, reservation queues, and loan tracking with an integrated AI natural-language discovery engine.",
    stack: ["Next.js", "TypeScript", "Prisma ORM", "PostgreSQL", "OpenAI API", "Tailwind CSS"],
    highlights: [
      "Modeled relational database architecture in PostgreSQL via Prisma with real-time inventory tracking and loan lifecycle management.",
      "Integrated OpenAI semantic search enabling natural language book queries and contextual recommendations.",
      "Engineered responsive member dashboards with loan history, active due dates, and fine calculation engine.",
    ],
    links: {
      live: "https://bait-ul-kutub.vercel.app/",
      github: "https://github.com/Talha-Shaikh1/bait-ul-kutub",
      caseStudy: "/projects/bait-ul-kutub",
    },
    image: "/previews/bait-ul-kutub.png",
    previewUrl: "bait-ul-kutub.vercel.app",
    featured: false,
    deepDive: false,
  },
  {
    slug: "humanoid-robotics",
    name: "AI Humanoid Robotics Platform",
    category: "ai-rag",
    metrics: ["ROS 2 Visualizer", "Physical AI Concept", "Natural Language QA"],
    tagline: "Interactive platform for teaching Physical AI and humanoid robotics with ROS 2 concepts.",
    description:
      "An interactive educational platform designed for exploring Physical AI, control theory, and humanoid robotics architectures with an integrated AI tutor.",
    stack: ["Next.js", "Python", "ROS 2 Architecture", "OpenAI API", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Visualized ROS 2 publisher-subscriber node graphs, sensor loops, and kinematics principles for interactive learning.",
      "Embedded an OpenAI-powered conversational assistant to answer technical robotics inquiries in real time.",
      "Designed responsive UI with dark mode optimized for technical diagram exploration and documentation reading.",
    ],
    links: {
      live: "https://humanoid-robotic-book-eight.vercel.app/",
      github: "https://github.com/Talha-Shaikh1/humanoid-robotic-book",
      caseStudy: "/projects/humanoid-robotics",
    },
    image: "/previews/humanoid-robotics.png",
    previewUrl: "humanoid-robotic-book-eight.vercel.app",
    featured: false,
    deepDive: false,
  },
  {
    slug: "the-arqa",
    name: "The Arqa — E-Commerce",
    category: "ecommerce",
    metrics: ["90+ Lighthouse Score", "Sanity Headless CMS", "Stripe Checkout"],
    tagline: "High-performance fashion store with headless Sanity CMS and Stripe integration.",
    description:
      "A production fashion e-commerce storefront engineered for speed and search visibility, featuring custom catalog schemas in Sanity and secure Stripe checkout.",
    stack: ["Next.js", "Sanity CMS", "Stripe", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Constructed headless content architecture with Sanity CMS for dynamic merchandising and instant catalog updates.",
      "Optimized Core Web Vitals to achieve a 90+ Lighthouse performance score with responsive image pipelines.",
      "Integrated secure end-to-end checkout with Stripe payment processing and order receipt generation.",
    ],
    links: {
      live: "https://thearqa.com/",
      github: "https://github.com/Talha-Shaikh1/the-arqa",
      caseStudy: "/projects/the-arqa",
    },
    image: "/previews/the-arqa.png",
    previewUrl: "thearqa.com",
    featured: false,
    deepDive: false,
  },
  {
    slug: "comforty",
    name: "Comforty — Furniture Store",
    category: "ecommerce",
    metrics: ["Headless CMS", "Persistent Cart", "GROQ Queries"],
    tagline: "Furniture e-commerce front end built on Next.js with Sanity as the headless content layer.",
    description:
      "A clean furniture e-commerce experience powered by Sanity CMS and Next.js, featuring persistent multi-page cart state, GROQ data fetching, and fluid responsive design.",
    stack: ["Next.js", "Sanity CMS", "Tailwind CSS", "TypeScript", "GROQ"],
    highlights: [
      "Queried and transformed structured furniture catalog data from Sanity CMS via optimized GROQ pipelines.",
      "Built resilient global shopping cart with React Context and localStorage persistence across page reloads.",
      "Configured Next.js image optimization pipelines for high-resolution responsive furniture showcases.",
    ],
    links: {
      live: "https://t-comforty2.vercel.app/",
      github: "https://github.com/Talha-Shaikh1/t-comforty",
      caseStudy: "/projects/comforty",
    },
    image: "/previews/comforty.png",
    previewUrl: "t-comforty2.vercel.app",
    featured: false,
    deepDive: true,
    caseStudy: {
      context: "Solo Frontend / CMS Project · Built to master headless CMS architecture with Next.js.",
      overview:
        "Comforty is a modern furniture storefront designed to demonstrate seamless integration between a headless CMS (Sanity) and a performant Next.js front end with persistent client-side state.",
      challenges: [
        {
          problem: "Complex data schema mapping from Sanity GROQ queries to typed React components.",
          solution: "Defined strict TypeScript interfaces and validated queries in Sanity Vision tool before frontend integration.",
        },
        {
          problem: "Image optimization errors with external Sanity asset host URLs in Next.js Image component.",
          solution: "Configured remotePatterns in next.config and utilized Sanity URL builder for dynamic resizing and WebP conversion.",
        },
        {
          problem: "State loss on page refresh across multi-step shopping journeys.",
          solution: "Implemented synchronized React Context cart with localStorage caching and hydration safeguards.",
        },
      ],
      uiux: [
        "Modern minimalist aesthetic with ergonomic typography and balanced white space.",
        "Adaptive product showcase grid optimized across mobile, tablet, and widescreen monitors.",
        "Interactive micro-interactions for add-to-cart feedback and badge notifications.",
      ],
      learned: [
        "Headless CMS integration best practices using GROQ and structured content modeling.",
        "Scalable client-side state management and hydration resilience in Next.js.",
        "Core Web Vitals optimization for media-rich e-commerce experiences.",
      ],
    },
  },
  {
    slug: "resume-builder",
    name: "Resume Builder",
    category: "tools",
    metrics: ["Vanilla JavaScript", "Live DOM Sync", "Print CSS Engine"],
    tagline: "Real-time resume builder with instant DOM updates and print-to-PDF formatting.",
    description:
      "A fast, lightweight resume creation engine crafted in vanilla HTML5, CSS3, and JavaScript without external frameworks, featuring real-time preview and ATS print styles.",
    stack: ["HTML5", "CSS3", "JavaScript (ES6+)", "Print CSS", "localStorage"],
    highlights: [
      "Engineered real-time reactive DOM syncing from multi-section form inputs to live preview without frameworks.",
      "Developed custom @media print stylesheets ensuring crisp, single/two-page ATS-ready PDF generation.",
      "Implemented automatic form persistence with localStorage so candidate data survives browser refreshes.",
    ],
    links: {
      live: "https://t-resume-build.vercel.app/",
      github: "https://github.com/Talha-Shaikh1/resume-builder",
      caseStudy: "/projects/resume-builder",
    },
    image: "/previews/resume-builder.png",
    previewUrl: "t-resume-build.vercel.app",
    featured: false,
    deepDive: true,
    caseStudy: {
      context: "Core Web Engineering Project · Mastered DOM manipulation and print layout architecture.",
      overview:
        "Engineered a zero-dependency resume builder in vanilla JavaScript to master raw browser APIs, event lifecycles, and exact print CSS formatting for professional document generation.",
      challenges: [
        {
          problem: "Low-latency DOM updates without reactive framework state management.",
          solution: "Implemented delegated event listeners and targeted DOM node mutations for sub-10ms UI sync.",
        },
        {
          problem: "Print output containing form controls and page-break layout breakages.",
          solution: "Engineered dedicated @media print CSS rules to isolate the resume canvas, normalize margins, and prevent broken bullet points.",
        },
        {
          problem: "Data loss on accidental navigation or tab close.",
          solution: "Added debounced localStorage sync to serialize form state automatically as the user types.",
        },
      ],
      uiux: [
        "Split-pane layout with editing controls on the left and live document rendering on the right.",
        "Single-column responsive flow on mobile devices with toggleable preview mode.",
        "Clean, executive typographic hierarchy following standard recruiter scanning patterns.",
      ],
      learned: [
        "Deep understanding of browser rendering pipelines and event dispatching.",
        "Precision print CSS design for downloadable document exports.",
        "Resilient client-side persistence strategies without backend dependencies.",
      ],
    },
  },
];
