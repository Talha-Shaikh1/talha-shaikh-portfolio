import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.meta.title} — Talha Shaikh`, description: post.meta.description };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main id="main" className="py-20">
      <Container className="max-w-3xl">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.meta.title,
            description: post.meta.description,
            datePublished: post.meta.date,
            author: { "@type": "Person", name: SITE.name, url: SITE.url },
            url: `${SITE.url}/blog/${post.meta.slug}`,
          }}
        />
        <Button href="/blog" variant="ghost" className="mb-8">← All posts</Button>
        <p className="font-mono text-sm text-muted">{post.meta.date}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-text">{post.meta.title}</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_strong]:text-text">
          <MDXRemote source={post.content} />
        </div>
      </Container>
    </main>
  );
}
