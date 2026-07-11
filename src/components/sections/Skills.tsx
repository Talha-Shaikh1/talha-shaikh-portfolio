import { skillGroups } from "@/content/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading id="skills-heading" label="Stack" title="Skills, grouped by where they live" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.05}>
              <Card className="h-full">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{g.category}</h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((item) => (
                    <li key={item} className="text-muted">{item}</li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
