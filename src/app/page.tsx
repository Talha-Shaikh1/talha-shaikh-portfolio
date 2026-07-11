import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
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
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
