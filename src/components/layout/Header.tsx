"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="font-display text-lg font-semibold text-text">
          Talha Shaikh<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-text">
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md border border-border"
          >
            <span aria-hidden className="font-mono">{open ? "✕" : "≡"}</span>
          </button>
        </div>
      </div>

      <nav className={cn("md:hidden", open ? "block" : "hidden")} aria-label="Mobile">
        <ul className="border-t border-border px-6 py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
