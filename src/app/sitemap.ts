import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/blog"].map((path) => ({ url: `${SITE.url}${path}`, lastModified: now }));
  const posts = getAllPosts().map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: new Date(p.date) }));
  const deepDives = projects
    .filter((p) => p.deepDive)
    .map((p) => ({ url: `${SITE.url}/projects/${p.slug}`, lastModified: now }));
  return [...routes, ...deepDives, ...posts];
}
