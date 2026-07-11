import Link from "next/link";
import type { Project } from "@/content/types";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold text-text">{project.name}</h3>
        {project.featured ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">Featured</span>
        ) : null}
      </div>
      <p className="mt-2 text-muted">{project.tagline}</p>

      <ul className="mt-5 space-y-2">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex gap-2 text-sm text-muted">
            <span aria-hidden className="mt-1 text-accent">▹</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-4 font-mono text-sm">
        {project.links.live ? (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Live ↗
          </a>
        ) : null}
        {project.links.github ? (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            GitHub ↗
          </a>
        ) : null}
        {project.deepDive ? (
          <Link href={`/projects/${project.slug}`} className="text-accent hover:underline">
            Case study →
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
