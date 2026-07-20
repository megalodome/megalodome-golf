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
    <section className="border-b border-[var(--line)] bg-[linear-gradient(180deg,rgba(18,40,31,.55),transparent)]">
      <div className="container py-14">
        {eyebrow ? <div className="eyebrow mb-3">{eyebrow}</div> : null}
        <h1 className="display max-w-4xl text-4xl leading-tight md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="muted mt-4 max-w-3xl text-lg">{subtitle}</p>
        ) : null}
        <div className="mt-6">
          <Link href="/contact" className="btn btn-primary">
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
