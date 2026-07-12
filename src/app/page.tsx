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
                text: "Full-stack web projects, mostly with Next.js, React, and TypeScript. He built Botaura, a WhatsApp chatbot that answers from a small business's own content; Comforty, a furniture e-commerce store on Next.js and Sanity; a resume builder in plain HTML, CSS, and JavaScript; a library management system (Bait-ul-Kutub); and a couple of other projects.",
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
                text: "No. He is self-taught, with formal education to matric level, and is currently in GIAIC's Cloud Native Applied Generative AI program. He's about 1.5 years into coding and learns by building real projects.",
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
