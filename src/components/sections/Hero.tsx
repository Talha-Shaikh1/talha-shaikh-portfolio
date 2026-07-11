import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <Container>
        <Reveal>
          <p className="font-mono text-sm text-accent">{profile.role}</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.05] text-text sm:text-6xl md:text-7xl">
            {profile.positioning}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{profile.subtext}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#projects">View Projects</Button>
            <Button href="#contact" variant="ghost">Contact / Résumé</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
