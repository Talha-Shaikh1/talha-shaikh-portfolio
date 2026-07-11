export function SectionHeading({
  id,
  label,
  title,
  kicker,
}: {
  id: string;
  label: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        <span aria-hidden>{"// "}</span>
        {label}
      </p>
      <h2 id={id} className="mt-3 font-display text-3xl font-semibold text-text sm:text-4xl">
        {title}
      </h2>
      {kicker ? <p className="mt-3 max-w-2xl text-muted">{kicker}</p> : null}
    </div>
  );
}
