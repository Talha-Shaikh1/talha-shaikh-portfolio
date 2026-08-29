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
    stack: ["Next.js 16", "TypeScript", "FastAPI", "Neon Postgres", "pgvector", "WhatsApp Cloud API", "OpenAI / Grok", "Cloudflare R2"],
    highlights: [
      "Architected multi-tenant RAG pipeline combining pgvector cosine similarity, BM25 retrieval, and bilingual English/Roman-Urdu context grounding.",
      "Accredited as Meta WhatsApp Tech Provider — built centralized token routing by phone_number_id with ad attribution and webhook orchestration.",
      "Enforced strict server-side tenant isolation with JWT authentication and UUID cascading across 162+ production endpoints.",
    ],
    links: { live: "https://botaura.app", caseStudy: "/projects/botaura" },
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
    slug: "getf4f-tiktok",
    name: "TikTok Follow Exchange (getf4f)",
    category: "fullstack",
    metrics: ["1,000+ Creators", "Proof Verification", "Credit Economy"],
    tagline: "Organic P2P TikTok growth platform with screenshot verification & 24h delayed matching.",
    description:
      "A full-stack creator growth platform designed to safely exchange TikTok follows. Features screenshot proof peer verification, 24-hour delayed reciprocal matching to prevent algorithmic shadowbans, automated credit economy, trust scoring, and an interactive growth calculator.",
    stack: ["Next.js", "TypeScript", "Clerk Auth", "Tailwind CSS", "PostgreSQL", "PWA"],
    highlights: [
      "Engineered a peer-to-peer reciprocal task engine with 24-hour delayed matching to protect creators from algorithmic shadowbans.",
      "Implemented peer screenshot proof verification and an anti-cheat trust scoring system (-15 trust penalty for unfollows).",
      "Built an automated credit economy with referral bonuses, 48-hour inactivity auto-protection, and cold-start admin seed pools.",
    ],
    links: { live: "https://f4f-tiktok.vercel.app/" },
    featured: true,
    deepDive: false,
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
    links: { live: "https://bait-ul-kutub.vercel.app/", github: "https://github.com/Talha-Shaikh1" },
    featured: true,
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
    links: { live: "https://humanoid-robotic-book-eight.vercel.app/", github: "https://github.com/Talha-Shaikh1/humanoid-robotic-book" },
    featured: true,
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
    links: { live: "https://thearqa.com/", github: "https://github.com/Talha-Shaikh1" },
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
    links: { live: "https://t-comforty2.vercel.app/", caseStudy: "/projects/comforty" },
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
    links: { live: "https://t-resume-build.vercel.app/", caseStudy: "/projects/resume-builder" },
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

