import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Background ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[380px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[100px] dark:bg-accent/15"
      />

      <Container>
        <Reveal>
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-surface/80 px-3.5 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-medium text-text">{profile.status}</span>
          </div>

          <p className="mt-6 font-mono text-sm tracking-wide text-accent">{profile.role}</p>

          <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-text sm:text-5xl md:text-6xl lg:text-7xl">
            Building production systems & intelligent RAG platforms.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.subtext}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#projects" className="shadow-lg shadow-accent/20">
              Explore Projects ↓
            </Button>
            <Button href="/resume" variant="ghost">
              View Résumé (ATS) →
            </Button>
            <Button href="#contact" variant="ghost">
              Get in Touch
            </Button>
          </div>

          {/* Stats & Credibility Grid */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {profile.stats.map((stat, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl border border-border bg-surface/60 p-4 backdrop-blur transition-colors hover:border-accent/40"
              >
                <div className="font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-xs text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

