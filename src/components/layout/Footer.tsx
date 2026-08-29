import { socials, email } from "@/content/socials";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-12 print:hidden">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">

        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <ul className="flex gap-5">
          <li>
            <a href={`mailto:${email}`} className="text-sm text-muted transition-colors hover:text-accent">
              Email
            </a>
          </li>
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
