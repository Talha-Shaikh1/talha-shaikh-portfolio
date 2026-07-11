import { cn } from "@/lib/cn";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
