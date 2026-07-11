import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ href, variant = "primary", className, children, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-contrast hover:opacity-90"
      : "border border-border text-text hover:bg-surface";
  const cls = cn(base, styles, className);
  if (href) {
    const external = href.startsWith("http");
    return (
      <Link href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </Link>
    );
  }
  return <span className={cls}>{children}</span>;
}
