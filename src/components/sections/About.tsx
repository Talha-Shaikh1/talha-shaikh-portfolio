import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading id="about-heading" label="About" title="Shipping over credentials" />
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {profile.about.map((p, i) => (
                <p key={i} className={i === 0 ? "text-text" : undefined}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="space-y-4 rounded-xl border border-border bg-surface p-6 font-mono text-sm">
              {[
                ["Role", profile.role],
                ["Focus", "RAG SaaS · Full-stack · AI"],
                ["Status", "Open to remote roles"],
                ["Based", "Karachi, Pakistan"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right text-text">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
