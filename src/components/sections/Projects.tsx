"use client";

import { useState } from "react";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/cn";

const CATEGORIES = [
  { id: "all", label: "All Systems" },
  { id: "ai-rag", label: "AI & RAG" },
  { id: "fullstack", label: "Full-Stack Platforms" },
  { id: "ecommerce", label: "Headless E-Commerce" },
  { id: "tools", label: "Core Tools" },
] as const;


export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="scroll-mt-20 py-20 md:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="projects-heading"
            label="Portfolio"
            title="Featured Engineering Projects"
            kicker="Production applications, AI retrieval systems, and full-stack software built to solve real-world problems."
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-surface p-1.5 text-xs font-medium">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 font-mono text-xs transition-all",
                  activeCategory === cat.id
                    ? "bg-accent text-accent-contrast shadow-sm"
                    : "text-muted hover:text-text"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filteredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

