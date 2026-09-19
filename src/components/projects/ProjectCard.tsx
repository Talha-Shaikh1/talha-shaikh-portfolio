import Link from "next/link";
import type { Project } from "@/content/types";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({ project }: { project: Project }) {
  const displayUrl =
    project.previewUrl ||
    (project.links.live
      ? project.links.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : `${project.slug}.vercel.app`);

  return (
    <Card className="group flex h-full flex-col overflow-hidden border border-border bg-surface transition-all duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
      {/* Vercel-style Live Web Preview Browser Frame */}
      <div className="relative border-b border-border/80 bg-bg/90">
        {/* Browser Top Navigation Chrome */}
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/40 bg-surface/60 text-[11px] font-mono">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 transition-opacity group-hover:opacity-100 opacity-70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 transition-opacity group-hover:opacity-100 opacity-70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 transition-opacity group-hover:opacity-100 opacity-70" />
          </div>

          {/* URL Bar */}
          <div className="mx-2 flex max-w-[210px] sm:max-w-[260px] truncate items-center gap-1.5 rounded-md border border-border/60 bg-bg/80 px-2.5 py-0.5 text-[10px] text-muted">
            <span className="text-accent/80 text-[10px]">🔒</span>
            <span className="truncate">{displayUrl}</span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="hidden sm:inline text-[10px] text-emerald-400 font-semibold">Production</span>
          </div>
        </div>

        {/* Screenshot Viewport */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface/40">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.name} live preview`}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg via-surface to-bg text-muted font-mono text-xs">
              Preview Ready
            </div>
          )}

          {/* Hover Overlay with Quick Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-bg/75 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100">
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-accent-contrast shadow-md transition-transform hover:scale-105"
              >
                Visit Live ↗
              </a>
            ) : null}
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/90 px-3.5 py-1.5 text-xs font-semibold text-text shadow-md transition-transform hover:scale-105 hover:text-accent"
            >
              Case Study →
            </Link>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-bold tracking-tight text-text group-hover:text-accent transition-colors">
              {project.name}
            </h3>
            {project.featured ? (
              <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-accent">
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
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 font-semibold text-text transition-colors hover:text-accent hover:underline"
            >
              Case Study →
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
