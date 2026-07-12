import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-24">
      <Container>
        <SectionHeading
          id="projects-heading"
          label="Projects"
          title="Things I've built"
          kicker="Personal and course projects I built while learning — with the problems I ran into."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
