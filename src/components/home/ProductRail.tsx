import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function ProductRail({
  eyebrow,
  title,
  description,
  products,
  variant = "grid",
  to = "/produtos",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  products: Product[];
  variant?: "grid" | "slider";
  to?: string;
}) {
  return (
    <section className="container-mermo py-16 md:py-24">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={
          <Button asChild variant="link" className="hidden md:inline-flex">
            <Link to={to}>Ver tudo →</Link>
          </Button>
        }
      />

      {variant === "slider" ? (
        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:px-0">
          {products.map((p) => (
            <div
              key={p.id}
              className="w-[68%] shrink-0 snap-start sm:w-[42%] lg:w-[23%]"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i % 4}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-10 text-center md:hidden">
        <Button asChild variant="outline">
          <Link to={to}>Ver tudo</Link>
        </Button>
      </div>
    </section>
  );
}
