"use client";

import { useState } from "react";
import { email, socials } from "@/content/socials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const whatsappSocial = socials.find((s) => s.label.toLowerCase() === "whatsapp");

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-24">
      <Container>
        <SectionHeading
          id="contact-heading"
          label="Direct Contact"
          title="Let's Build Something High-Impact"
          kicker="Open to Full-Stack & AI Engineering roles, technical collaborations, and ambitious contracts."
        />

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-muted">Response time: Typically within 2-4 hours</span>
              </div>

              <div className="mt-4">
                <p className="font-mono text-xs text-accent uppercase tracking-wider">Direct Email</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${email}`}
                    className="font-display text-xl sm:text-2xl font-bold text-text hover:text-accent transition-colors break-all"
                  >
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="rounded-md border border-border bg-bg px-2.5 py-1 font-mono text-xs text-muted hover:text-text hover:border-accent/40 transition-all"
                  >
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {whatsappSocial ? (
                <div className="mt-6 border-t border-border pt-6">
                  <p className="font-mono text-xs text-accent uppercase tracking-wider">Instant Chat</p>
                  <div className="mt-3">
                    <Button href={whatsappSocial.href}>
                      Chat on WhatsApp ↗
                    </Button>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 border-t border-border pt-6">
                <p className="font-mono text-xs text-accent uppercase tracking-wider">Developer Profiles</p>
                <ul className="mt-3 space-y-2 font-mono text-xs sm:text-sm">
                  {socials
                    .filter((s) => s.label.toLowerCase() !== "whatsapp")
                    .map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
                        >
                          <span className="text-accent">▹</span>
                          <span className="font-semibold text-text">{s.label}:</span> {s.handle} ↗
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

