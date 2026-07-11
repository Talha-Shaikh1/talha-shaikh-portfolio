import { email, socials } from "@/content/socials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading
          id="contact-heading"
          label="Contact"
          title="Let's talk"
          kicker="Open to remote full-stack and AI-engineering roles."
        />
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <a href={`mailto:${email}`} className="block font-display text-2xl text-text hover:text-accent">
              {email}
            </a>
            <ul className="space-y-2 font-mono text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                    {s.label} — {s.handle} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
