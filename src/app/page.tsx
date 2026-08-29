import { Hero } from "@/components/sections/Hero";
import { BotauraSpotlight } from "@/components/sections/BotauraSpotlight";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";

export default function Home() {
  return (
    <main id="main">
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
                text: "Full-Stack and AI systems, primarily with Next.js, TypeScript, Python, FastAPI, and PostgreSQL. He built Botaura, a multi-tenant RAG chatbot SaaS with Meta WhatsApp Tech Provider accreditation; Bait-ul-Kutub LMS with AI semantic search; the AI Humanoid Robotics interactive platform; and high-performance headless e-commerce stores.",
              },
            },
            {
              "@type": "Question",
              name: "What is Talha's experience with AI, RAG, and WhatsApp APIs?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "He is an accredited Meta WhatsApp Tech Provider and architected end-to-end Hybrid RAG pipelines using pgvector cosine similarity, BM25 retrieval, OpenAI SDK, and WhatsApp Cloud API webhook routing across 162+ production endpoints.",
              },
            },
            {
              "@type": "Question",
              name: "What roles is Talha looking for?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Talha is actively seeking Full-Stack Engineer, Frontend Engineer, and AI/RAG Engineer roles where he can ship reliable, high-performance web systems and AI automations.",
              },
            },
          ],
        }}
      />
      <Hero />
      <BotauraSpotlight />
      <Projects />
      <Skills />
      <ExperienceTimeline />
      <About />
      <Contact />
    </main>
  );
}

