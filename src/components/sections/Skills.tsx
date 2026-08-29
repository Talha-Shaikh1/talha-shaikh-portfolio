import { skillGroups } from "@/content/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-20 md:py-24">
      <Container>
        <SectionHeading
          id="skills-heading"
          label="Technical Stack"
          title="Engineering Capabilities & Architecture"
          kicker="A breakdown of tools, frameworks, and protocols I use to architect and ship reliable production systems."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.05}>
              <Card className="group flex h-full flex-col justify-between transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-border pb-3">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                      {g.category}
                    </h3>
                    {g.featured ? (
                      <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] text-accent">
                        Core
                      </span>
                    ) : null}
                  </div>

                  {g.description ? (
                    <p className="mt-3 text-xs leading-relaxed text-muted">{g.description}</p>
                  ) : null}

                  <ul className="mt-4 space-y-2">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-text font-medium">
                        <span className="text-accent text-xs">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

