import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return projects.filter((p) => p.deepDive).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} — Talha Shaikh`, description: project.tagline };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const cs = project.caseStudy;

  return (
    <main id="main" className="py-20">
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
