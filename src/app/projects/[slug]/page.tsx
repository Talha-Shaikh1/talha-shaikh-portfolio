import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return projects.filter((p) => p.deepDive).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Talha Shaikh`, description: project.tagline };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main id="main" className="py-20">
      <Container className="max-w-3xl">
        <Button href="/#projects" variant="ghost" className="mb-8">← Back to projects</Button>
        <p className="font-mono text-sm text-accent">Case study</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-text sm:text-5xl">{project.name}</h1>
        <p className="mt-4 text-lg text-muted">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-semibold text-text">Engineering highlights</h2>
        <ul className="mt-4 space-y-3">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-muted">
              <span aria-hidden className="mt-1 text-accent">▹</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          {project.links.live ? <Button href={project.links.live}>Visit live ↗</Button> : null}
          {project.links.github ? <Button href={project.links.github} variant="ghost">GitHub ↗</Button> : null}
        </div>
      </Container>
    </main>
  );
}
