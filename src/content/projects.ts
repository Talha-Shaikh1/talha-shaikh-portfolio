import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "botaura",
    name: "Botaura",
    tagline: "AI chatbot platform for Pakistani SMBs, with deep WhatsApp commerce — from lead gen to order automation.",
    description:
      "A multi-tenant RAG chatbot SaaS built for small and medium businesses in Pakistan. Each business gets an AI chatbot trained on its own content — website, catalog, FAQs — deployable as a web widget and as full WhatsApp Business automation, including order-taking and cash-on-delivery checkout, with no code. I built the whole product solo.",
    stack: ["Next.js 16", "TypeScript", "FastAPI", "Neon Postgres", "pgvector", "WhatsApp Business API", "Grok / OpenRouter", "Cloudflare R2"],
    highlights: [
      "Multi-tenant platform where each business gets an AI chatbot trained on its own content.",
      "WhatsApp Business automation: Q&A, a full COD order flow, a team inbox, and broadcast campaigns.",
      "Strict server-side tenant isolation, and a single Tech Provider token routed by phone_number_id.",
    ],
    links: { live: "https://botaura.app", caseStudy: "/projects/botaura" },
    featured: true,
    deepDive: true,
    caseStudy: {
      context: "Founder & solo developer — full product: architecture, backend, frontend, and infra.",
      slogan: "Bot nahi. Aura.",
      overview:
        "Botaura is a multi-tenant platform where each business gets its own AI chatbot trained on its own content — website, product catalog, FAQs, documents — deployable as a web widget and as full WhatsApp Business automation, including order-taking and COD checkout, without writing any code. It's my biggest project, and I built and run all of it myself.",
      problem:
        "Pakistani SMBs — retailers, service businesses, D2C brands — get most of their sales inquiries on WhatsApp but have no scalable way to answer them. Customers ask the same things (pricing, availability, delivery) over and over, businesses lose leads overnight and during rush hours, and existing chatbot tools are either too generic (not trained on the business's actual catalog and FAQs) or too expensive and complex for a small team to set up. Botaura had to give a small shop owner in Karachi enterprise-grade AI customer engagement — but self-serve, affordable in PKR, and live within a day.",
      solution:
        "A multi-tenant platform where each business gets an AI chatbot trained on its own content, deployable as a web widget and as full WhatsApp Business automation — inbound Q&A, a complete order flow with cash-on-delivery, a team inbox for human handoff, and marketing tools — all self-serve, no code required.",
      capabilities: [
        "RAG-powered chatbot answering from a business's own knowledge base (crawled web content, uploaded docs, product catalogs).",
        "WhatsApp Business automation — inbound Q&A, a full COD order flow, a team inbox for human handoff, and customer segmentation.",
        "Marketing tools — broadcast campaigns via Meta's Marketing Messages API, Click-to-WhatsApp ad attribution, and automated abandoned-cart recovery.",
        "Store API — a universal event-ingestion layer with thin adapters for WooCommerce and Shopify, so store data flows in without per-client integration work.",
        "Observability & support — an admin health dashboard, a client-facing 'Bot Health' view, and a built-in support ticketing system.",
      ],
      architecture: [
        {
          title: "Strict tenant isolation by design, not convention",
          body:
            "Every tenant-scoped table cascades from a businesses table, and the business_id for each request is never trusted from the request body — it's resolved server-side from context that can't be spoofed: the authenticated user ID for the dashboard, a signed JWT subject for the widget, a hashed API key for the Store API, and the WhatsApp phone_number_id for messaging traffic. That closes off a whole class of cross-tenant data-leak bugs before they can happen.",
        },
        {
          title: "A Tech Provider model for WhatsApp at scale",
          body:
            "Instead of storing a separate Meta access token per client (which doesn't scale and multiplies the security surface), Botaura uses a single system-level token and routes traffic by phone_number_id. One codebase serves every tenant's WhatsApp number without per-client credential management — while Meta still bills each client directly, keeping the platform out of the payments loop.",
        },
        {
          title: "Hybrid retrieval tuned for real conversations",
          body:
            "The RAG pipeline combines pgvector cosine similarity with BM25 keyword search, using multilingual embeddings so it handles the English / Roman-Urdu code-switching that's normal in real customer messages — with a confidence threshold that decides when the bot should hand off to a human instead of guessing.",
        },
        {
          title: "A topology shaped by real infra constraints",
          body:
            "Hugging Face Spaces can't complete Meta's TLS handshake directly, so all outbound WhatsApp / Graph API calls route through a relay layer on Vercel — a constraint found in production and solved architecturally rather than patched per-call.",
        },
      ],
      challenges: [
        {
          problem:
            "A live production incident: regenerating the platform's system-level Meta token silently broke WhatsApp Business Account (WABA) asset assignment for the pilot client.",
          solution:
            "Diagnosed and resolved it without extended downtime, then hardened the setup so a token change can't silently break asset assignment again.",
        },
        {
          problem:
            "Silent failures in the order flow — e.g. COD confirmations failing because a WABA currency wasn't configured — with no visibility until a client noticed.",
          solution:
            "This directly motivated the observability stack: dedicated logging tables, admin runbook cards, and a client-facing health view, so failures surface immediately instead of silently.",
        },
        {
          problem:
            "A fail-open risk in the webhook / event-ingestion path that could let unverified events through.",
          solution:
            "Closed it before the first paying-adjacent client went live, so the ingestion path fails safe.",
        },
      ],
      results: [
        "162 routes shipped across a full-stack, multi-tenant SaaS product, built solo.",
        "Onboarded and supported a live pilot client (an organic-products business) through the full Tech Provider WhatsApp setup, catalog ingestion, and order automation.",
        "Shipped a complete revenue engine: broadcast campaigns, ad-attribution tracking, and automated cart recovery.",
        "Built a Store API layer that lets WooCommerce and Shopify stores connect without bespoke work — WooCommerce first, given its share of the Pakistani market.",
      ],
      stackSummary: [
        "Next.js 16", "TypeScript", "Tailwind CSS", "Clerk Auth", "Drizzle ORM", "FastAPI",
        "Python (asyncpg)", "Neon Postgres", "pgvector", "Cloudflare R2", "Resend", "Sentry",
        "Meta Graph API (WhatsApp Business)", "Grok / OpenRouter",
      ],
    },
  },
  {
    slug: "comforty",
    name: "Comforty — Furniture Store",
    tagline: "A furniture e-commerce front end built on Next.js with Sanity as the CMS.",
    description:
      "A furniture e-commerce store I built solo to learn how a headless CMS fits into a Next.js app. Products come from Sanity, and the cart works across the whole site.",
    stack: ["Next.js", "Sanity", "Tailwind CSS", "TypeScript"],
    highlights: [
      "Pulled the product catalog from Sanity and built listing and product-detail pages.",
      "Made a cart that keeps its items when you move between pages or refresh.",
    ],
    links: { live: "https://t-comforty2.vercel.app/", caseStudy: "/projects/comforty" },
    featured: false,
    deepDive: true,
    // TODO(talha): read through this case study and fix anything that isn't exactly how it happened
    //   — the exact features (checkout/Stripe? search?), which errors you actually hit, and how you fixed them.
    caseStudy: {
      context: "Solo project · built to learn a headless CMS with Next.js.",
      overview:
        "Comforty is a furniture store front end. I wanted to understand how a real content source (a CMS) connects to a Next.js app instead of hard-coding products, so I set up Sanity as the backend and built the storefront on top of it — product listing, product details, and a cart.",
      challenges: [
        {
          problem:
            "I'd never used Sanity before, so getting the product data out of it and into my pages was confusing at first.",
          solution:
            "I learned GROQ (Sanity's query language), set up the Sanity client, and tested my queries in Sanity's Vision tool before wiring them into the pages.",
        },
        {
          problem:
            "Product images from Sanity wouldn't load with Next.js's Image component and threw a config error.",
          solution:
            "I used Sanity's image URL builder to generate proper URLs and added Sanity's image host to the images config in next.config, which fixed the loading and let Next optimize them.",
        },
        {
          problem:
            "The cart kept emptying when I moved between pages or refreshed, so it didn't feel like a real store.",
          solution:
            "I moved the cart into a shared React Context and saved it to localStorage, so the items stay put across navigation and page reloads.",
        },
      ],
      uiux: [
        "Stayed close to the original design so spacing, type, and colors feel consistent across pages.",
        "Used a responsive product grid so it reads well on phones as well as desktop.",
        "Kept clear cart feedback (item count in the header) so it's obvious when something's added.",
      ],
      learned: [
        "How a headless CMS works and how GROQ queries pull structured content.",
        "How to manage shared state (the cart) and keep it between page loads.",
        "How to turn a design into a working, responsive front end.",
      ],
    },
  },
  {
    slug: "resume-builder",
    name: "Resume Builder",
    tagline: "A resume builder in plain HTML, CSS, and JavaScript — fill a form, see a live preview, print it.",
    description:
      "A resume builder I made with core HTML5, CSS, and vanilla JavaScript — no framework. You fill in your details, the preview updates as you type, and you can print or save it as a PDF.",
    stack: ["HTML5", "CSS", "JavaScript"],
    highlights: [
      "Live preview that updates as you type, built with plain DOM and JavaScript.",
      "Print / save-as-PDF that keeps the resume clean and leaves the form controls out.",
    ],
    links: { live: "https://t-resume-build.vercel.app/", caseStudy: "/projects/resume-builder" },
    featured: false,
    deepDive: true,
    // TODO(talha): confirm the details — how you actually did the PDF export (print CSS vs a library like html2pdf),
    //   whether it saves to localStorage, and which errors you really ran into.
    caseStudy: {
      context: "Solo project · built with no framework to strengthen my JavaScript basics.",
      overview:
        "I built this with only HTML, CSS, and vanilla JavaScript on purpose — I wanted to get comfortable with the DOM and events before leaning on a framework. You fill in a form for each section (details, experience, education, skills), a live preview shows the resume, and you can print or save it as a PDF.",
      challenges: [
        {
          problem:
            "Keeping the preview in sync with the form as the user typed, without a framework doing it for me.",
          solution:
            "I listened for input events on the form fields and updated the matching parts of the preview in the DOM directly, so the preview changes instantly as you type.",
        },
        {
          problem:
            "When I printed, the browser included the form and buttons and the resume layout broke on the page.",
          solution:
            "I added a print stylesheet (an @media print block) that hides the form and controls and styles just the resume, so print / save-as-PDF comes out clean.",
        },
        {
          problem:
            "Refreshing the page wiped everything the user had typed.",
          solution:
            "I saved the form data to localStorage and loaded it back on start, so your details survive a refresh.",
        },
      ],
      uiux: [
        "Two-panel layout — form on one side, live preview on the other — so you see changes as you make them.",
        "Stacks to a single column on mobile so it stays usable on a phone.",
        "Kept the resume itself clean and print-friendly, since the whole point is a document you can hand in.",
      ],
      learned: [
        "DOM manipulation and event handling without a framework.",
        "How print CSS differs from screen CSS, and how browsers handle print / PDF.",
        "Saving and restoring user data with localStorage.",
      ],
    },
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
