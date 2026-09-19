import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Talha Shaikh`,
    description: project.tagline,
    alternates: { canonical: `${SITE.url}/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Talha Shaikh`,
      description: project.description,
      url: `${SITE.url}/projects/${project.slug}`,
      images: project.image ? [{ url: `${SITE.url}${project.image}` }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const cs = project.caseStudy;

  return (
    <main id="main" className="py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.name,
          description: project.description,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          url: `${SITE.url}/projects/${project.slug}`,
          author: {
            "@type": "Person",
            name: "Muhammad Talha Shaikh",
            url: SITE.url,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Projects",
              item: `${SITE.url}/#projects`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: project.name,
              item: `${SITE.url}/projects/${project.slug}`,
            },
          ],
        }}
      />
      <Container className="max-w-3xl">
        <Button href="/#projects" variant="ghost" className="mb-8">← Back to projects</Button>
        <p className="font-mono text-sm text-accent">Case study</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-text sm:text-5xl">{project.name}</h1>
        {cs?.slogan ? (
          <p className="mt-3 font-display text-xl italic text-accent">{cs.slogan}</p>
        ) : null}
        {cs ? <p className="mt-3 font-mono text-sm text-muted">{cs.context}</p> : null}
        <p className="mt-4 text-lg text-muted">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        {/* Vercel-Style Live Web Preview Frame */}
        {project.image ? (
          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
            {/* Browser top chrome */}
            <div className="flex items-center justify-between border-b border-border bg-bg/90 px-4 py-2.5 font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1 text-xs text-muted">
                <span className="text-accent">🔒</span>
                <span>
                  {project.previewUrl ||
                    project.links.live?.replace(/^https?:\/\//, "").replace(/\/$/, "") ||
                    `${project.slug}.vercel.app`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Production</span>
              </div>
            </div>
            {/* Screenshot view */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg">
              <img
                src={project.image}
                alt={`${project.name} live web preview`}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        ) : null}

        {cs ? (
          <>
            <section className="mt-14">
              <h2 className="font-display text-2xl font-semibold text-text">Overview</h2>
              <p className="mt-4 leading-relaxed text-muted">{cs.overview}</p>
            </section>

            {cs.problem ? (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-semibold text-text">The problem</h2>
                <p className="mt-4 leading-relaxed text-muted">{cs.problem}</p>
              </section>
            ) : null}

            {cs.solution ? (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-semibold text-text">The solution</h2>
                <p className="mt-4 leading-relaxed text-muted">{cs.solution}</p>
                {cs.capabilities?.length ? (
                  <ul className="mt-5 space-y-3">
                    {cs.capabilities.map((c, i) => (
                      <li key={i} className="flex gap-3 text-muted">
                        <span aria-hidden className="mt-1 text-accent">▹</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ) : null}

            {cs.architecture?.length ? (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-semibold text-text">Technical architecture</h2>
                <div className="mt-6 space-y-4">
                  {cs.architecture.map((b, i) => (
                    <div key={i} className="rounded-xl border border-border bg-surface p-6">
                      <h3 className="font-display text-lg font-semibold text-text">{b.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{b.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-14">
              <h2 className="font-display text-2xl font-semibold text-text">Problems I ran into</h2>
              <p className="mt-2 text-sm text-muted">…and how I worked through them.</p>
              <div className="mt-6 space-y-4">
                {cs.challenges.map((c, i) => (
                  <div key={i} className="rounded-xl border border-border bg-surface p-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-accent">The problem</p>
                    <p className="mt-2 text-text">{c.problem}</p>
                    <p className="mt-5 font-mono text-xs uppercase tracking-wider text-accent">How I solved it</p>
                    <p className="mt-2 text-muted">{c.solution}</p>
                  </div>
                ))}
              </div>
            </section>

            {cs.results?.length ? (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-semibold text-text">Results</h2>
                <ul className="mt-4 space-y-3">
                  {cs.results.map((r, i) => (
                    <li key={i} className="flex gap-3 text-muted">
                      <span aria-hidden className="mt-1 text-accent">▹</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {cs.uiux?.length ? (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-semibold text-text">UI / UX decisions</h2>
                <ul className="mt-4 space-y-3">
                  {cs.uiux.map((u, i) => (
                    <li key={i} className="flex gap-3 text-muted">
                      <span aria-hidden className="mt-1 text-accent">▹</span>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {cs.learned?.length ? (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-semibold text-text">What I learned</h2>
                <ul className="mt-4 space-y-3">
                  {cs.learned.map((l, i) => (
                    <li key={i} className="flex gap-3 text-muted">
                      <span aria-hidden className="mt-1 text-accent">▹</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {cs.stackSummary?.length ? (
              <section className="mt-14">
                <h2 className="font-display text-2xl font-semibold text-text">Full tech stack</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cs.stackSummary.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </section>
            ) : null}
          </>
        ) : (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-text">Engineering highlights</h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-muted">
                  <span aria-hidden className="mt-1 text-accent">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-14 flex flex-wrap gap-3 border-t border-border pt-8">
          {project.links.live ? <Button href={project.links.live}>Visit live ↗</Button> : null}
          {project.links.github ? <Button href={project.links.github} variant="ghost">GitHub ↗</Button> : null}
        </div>
      </Container>
    </main>
  );
}
