import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Core landing routes
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE.url}/resume`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  // All project URLs (each project has its own canonical case study/showcase page)
  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.featured ? 0.9 : 0.8,
  }));

  // Blog posts
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...projectUrls, ...posts];
}
