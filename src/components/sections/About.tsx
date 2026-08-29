import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-24">
      <Container>
        <SectionHeading
          id="about-heading"
          label="Background"
          title="Engineering Philosophy & Background"
          kicker="High ownership, rapid prototyping, and a deep commitment to robust software engineering."
        />
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              {profile.about.map((p, i) => (
                <p key={i} className={i === 0 ? "text-text font-normal" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <dl className="space-y-4 rounded-xl border border-border bg-surface p-6 font-mono text-xs sm:text-sm">
                {[
                  ["Role", profile.role],
                  ["Focus", "Full-Stack · RAG Systems · Applied AI"],
                  ["Status", profile.status],
                  ["Credentials", "Meta WhatsApp Tech Provider"],
                  ["Location", profile.location],
                  ["Availability", "Immediate (Remote / Relocation)"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-medium text-text">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 text-xs text-muted">
                <p className="font-mono font-semibold uppercase tracking-wider text-accent">
                  ⚡ Engineering Philosophy
                </p>
                <p className="mt-2 leading-relaxed">
                  "I believe the best software comes from understanding the whole stack — from database constraints and network latency to clean component ergonomics and reliable edge delivery."
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

