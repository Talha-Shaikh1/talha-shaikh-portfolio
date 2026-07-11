import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Blog — Talha Shaikh",
  description: "Technical write-ups on RAG, SaaS, and shipping products solo.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main id="main" className="py-20">
      <Container className="max-w-3xl">
        <SectionHeading id="blog-heading" label="Blog" title="Notes & write-ups" />
        {posts.length === 0 ? (
          <p className="text-muted">No posts yet — coming soon.</p>
        ) : (
          <ul className="divide-y divide-border">
            {posts.map((p) => (
              <li key={p.slug} className="py-6">
                <Link href={`/blog/${p.slug}`} className="group block">
                  <p className="font-mono text-xs text-muted">{p.date}</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-text group-hover:text-accent">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-muted">{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
