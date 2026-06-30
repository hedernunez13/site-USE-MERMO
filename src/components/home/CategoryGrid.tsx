import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Reveal, SectionHeading } from "@/components/ui/reveal";

export function CategoryGrid() {
  return (
    <section className="container-mermo py-20 md:py-28">
      <SectionHeading
        eyebrow="Navegue por categoria"
        title="Encontre o seu estilo"
        description="Do clássico ao esportivo, cada categoria foi pensada para um jeito de ver o mundo."
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {categories.map((cat, i) => (
          <Reveal key={cat.slug} delay={i}>
            <Link
              to={`/produtos?categoria=${cat.slug}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-offwhite"
            >
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <h3 className="font-serif text-lg text-white md:text-xl">
                    {cat.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-white/70">{cat.description}</p>
                </div>
                <ArrowUpRight className="size-5 -translate-y-1 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
