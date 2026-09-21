"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";

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
    <section id="projects" className="scroll-mt-20 py-20 md:py-28 relative">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="projects-heading"
            label="Portfolio & Systems"
            title="Featured Engineering Projects"
            kicker="Production applications, AI retrieval systems, and full-stack software built to solve real-world problems."
          />

          {/* Aesthetic Filter Tabs with Sliding Active Pill */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border bg-surface p-1.5 text-xs font-medium">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative rounded-lg px-3 py-1.5 font-mono text-xs transition-colors duration-200 ${
                    isActive ? "text-accent-contrast font-semibold" : "text-muted hover:text-text"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterPill"
                      className="absolute inset-0 rounded-lg bg-accent shadow-sm"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Animated Projects Grid */}
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
