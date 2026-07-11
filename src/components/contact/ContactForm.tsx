"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Something went wrong.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const field =
    "w-full rounded-md border border-border bg-bg px-4 py-2.5 text-text placeholder:text-muted focus-visible:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot: visually hidden, not focusable */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block font-mono text-xs text-muted">Name</label>
        <input id="name" name="name" required className={field} placeholder="Jane Developer" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block font-mono text-xs text-muted">Email</label>
        <input id="email" name="email" type="email" required className={field} placeholder="jane@company.com" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs text-muted">Message</label>
        <textarea id="message" name="message" required rows={5} className={field} placeholder="Tell me about the role…" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>

      <p aria-live="polite" className="text-sm">
        {status === "ok" ? <span className="text-accent">Thanks — I&apos;ll get back to you soon.</span> : null}
        {status === "error" ? <span className="text-red-400">{error}</span> : null}
      </p>
    </form>
  );
}
