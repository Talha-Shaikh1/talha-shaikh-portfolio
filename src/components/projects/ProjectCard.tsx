"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { Project } from "@/content/types";
import { Tag } from "@/components/ui/Tag";

export function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const displayUrl =
    project.previewUrl ||
    (project.links.live
      ? project.links.live.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : `${project.slug}.vercel.app`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
    >
      {/* Interactive Cursor Spotlight Glow (Linear / Godly signature) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(240, 128, 60, 0.12), transparent 75%)`
            : undefined,
        }}
      />

      {/* Interactive Border Spotlight Highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-10 rounded-2xl border border-accent/0 transition-colors duration-300 group-hover:border-accent/30"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(240, 128, 60, 0.35), transparent 70%) border-box`
            : undefined,
        }}
      />

      {/* Vercel-style Live Web Preview Browser Frame */}
      <div className="relative z-10 border-b border-border/80 bg-bg/90">
        {/* Browser Navigation Bar */}
        <div className="flex items-center justify-between border-b border-border/40 bg-surface/70 px-3.5 py-2 font-mono text-[11px]">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 transition-opacity group-hover:opacity-100 opacity-70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 transition-opacity group-hover:opacity-100 opacity-70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 transition-opacity group-hover:opacity-100 opacity-70" />
          </div>

          {/* URL Pill */}
          <div className="mx-2 flex max-w-[210px] sm:max-w-[260px] truncate items-center gap-1.5 rounded-md border border-border/60 bg-bg/85 px-2.5 py-0.5 text-[10px] text-muted">
            <span className="text-accent/80 text-[10px]">🔒</span>
            <span className="truncate">{displayUrl}</span>
          </div>

          {/* Production Badge */}
          <div className="flex items-center gap-1.5 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="hidden sm:inline text-[10px] text-emerald-500 font-semibold">Live</span>
          </div>
        </div>

        {/* Screenshot Viewport */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface/40">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bg via-surface to-bg font-mono text-xs text-muted">
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
              href={project.links.caseStudy || "/#projects"}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface/90 px-3.5 py-1.5 text-xs font-semibold text-text shadow-md transition-transform hover:scale-105 hover:text-accent"
            >
              Case Study →
            </Link>
          </div>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="relative z-10 flex flex-1 flex-col justify-between p-5 md:p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-bold tracking-tight text-text transition-colors group-hover:text-accent">
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
                  className="rounded-md border border-border bg-bg/80 px-2 py-0.5 font-mono text-[11px] font-medium text-text"
                >
                  {m}
                </span>
              ))}
            </div>
          ) : null}

          {/* Structured Architectural Highlights */}
          <ul className="mt-4 space-y-1.5 border-l-2 border-accent/30 pl-3">
            {project.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="text-xs leading-relaxed text-muted">
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* Stack Tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>

          {/* Action Links */}
          <div className="mt-5 flex flex-wrap items-center justify-between border-t border-border pt-4 font-mono text-xs">
            <div className="flex items-center gap-3">
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
            </div>

            <Link
              href={project.links.caseStudy || "/#projects"}
              className="inline-flex items-center gap-1 font-semibold text-text transition-colors hover:text-accent hover:underline"
            >
              Case Study →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
