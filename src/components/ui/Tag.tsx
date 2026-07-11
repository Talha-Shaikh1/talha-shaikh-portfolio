export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
