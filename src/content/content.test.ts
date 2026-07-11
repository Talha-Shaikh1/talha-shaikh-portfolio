import { describe, it, expect } from "vitest";
import { projects } from "./projects";
import { skillGroups } from "./skills";
import { socials, email } from "./socials";
import { profile } from "./profile";

describe("content integrity", () => {
  it("every project has required non-empty fields", () => {
    for (const p of projects) {
      expect(p.slug, "slug").toBeTruthy();
      expect(p.name, `${p.slug} name`).toBeTruthy();
      expect(p.tagline, `${p.slug} tagline`).toBeTruthy();
      expect(p.stack.length, `${p.slug} stack`).toBeGreaterThan(0);
      expect(p.highlights.length, `${p.slug} highlights`).toBeGreaterThanOrEqual(2);
    }
  });

  it("project slugs are unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all project links are absolute or rooted", () => {
    for (const p of projects) {
      for (const href of Object.values(p.links)) {
        if (href) expect(href).toMatch(/^(https?:\/\/|\/)/);
      }
    }
  });

  it("skill groups are non-empty", () => {
    expect(skillGroups.length).toBeGreaterThan(0);
    for (const g of skillGroups) expect(g.items.length).toBeGreaterThan(0);
  });

  it("email looks valid and socials have hrefs", () => {
    expect(email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    for (const s of socials) expect(s.href).toMatch(/^https?:\/\//);
  });

  it("profile has positioning and about copy", () => {
    expect(profile.positioning).toBeTruthy();
    expect(profile.about.length).toBeGreaterThan(0);
  });
});
