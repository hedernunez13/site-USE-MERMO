import { Link } from "react-router-dom";
import { brands } from "@/data/brands";

export function BrandStrip() {
  const loop = [...brands, ...brands];
  return (
    <section className="border-y border-border bg-offwhite py-12 md:py-16">
      <p className="eyebrow mb-8 text-center">As maiores marcas, um só lugar</p>
      <div className="no-scrollbar relative overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-12 md:gap-20">
          {loop.map((b, i) => (
            <Link
              key={b.id + i}
              to={`/produtos?marca=${encodeURIComponent(b.name)}`}
              className="whitespace-nowrap font-serif text-xl text-gray-mid transition-colors hover:text-ink md:text-2xl"
            >
              {b.name}
            </Link>
          ))}
        </div>
        {/* fades laterais */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-offwhite to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-offwhite to-transparent" />
      </div>
    </section>
  );
}
