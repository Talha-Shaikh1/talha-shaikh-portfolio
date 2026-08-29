import Link from "next/link";
import type { Project } from "@/content/types";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex h-full flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold tracking-tight text-text group-hover:text-accent transition-colors">
            {project.name}
          </h3>
          {project.featured ? (
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-wide text-accent">
              Featured
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

        {/* Key Metrics Chips */}
        {project.metrics?.length ? (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.metrics.map((m, idx) => (
              <span
                key={idx}
                className="rounded-md border border-border bg-bg/80 px-2 py-0.5 font-mono text-[11px] text-text font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        ) : null}

        {/* Highlights */}
        <ul className="mt-4 space-y-2">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
              <span aria-hidden className="mt-0.5 font-bold text-accent">▹</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {/* Stack Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        {/* Links */}
        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4 font-mono text-xs">
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-accent transition-colors hover:underline"
            >
              Live Demo ↗
            </a>
          ) : null}
          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted transition-colors hover:text-text hover:underline"
            >
              GitHub ↗
            </a>
          ) : null}
          {project.deepDive ? (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 font-semibold text-text transition-colors hover:text-accent hover:underline"
            >
              Case Study →
            </Link>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

