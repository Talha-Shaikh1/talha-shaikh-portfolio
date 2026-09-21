"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { ThemeToggle } from "./ThemeToggle";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur print:hidden">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">

        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg font-semibold text-text transition-colors"
        >
          <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <BrandLogo size={28} className="rounded-lg drop-shadow-sm" />
          </div>
          <span className="tracking-tight">
            Talha Shaikh<span className="text-accent">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-text">
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }))}
            className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted hover:border-accent/40 hover:text-text transition-colors"
            title="Press Cmd+K or Ctrl+K to search"
          >
            <span className="text-[11px]">Search</span>
            <kbd className="rounded bg-bg px-1 font-mono text-[9px] text-muted">⌘K</kbd>
          </button>
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
