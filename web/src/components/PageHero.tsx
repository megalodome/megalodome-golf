import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[rgba(238,220,167,0.12)] bg-[linear-gradient(160deg,#0d0d0d_0%,#1a1408_50%,#0a0a0a_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(238,220,167,0.07)_0%,transparent_65%)]" />
      <div className="container relative py-16 text-center md:py-20">
        {eyebrow ? (
          <div className="section-label mb-4 opacity-90">{eyebrow}</div>
        ) : null}
        <h1 className="display mx-auto max-w-4xl text-4xl md:text-6xl">{title}</h1>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-3xl text-base italic text-[var(--text-muted)] md:text-lg">
            {subtitle}
          </p>
        ) : null}
        <div className="divider center" />
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/invest" className="btn btn-primary">
            Investors
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
