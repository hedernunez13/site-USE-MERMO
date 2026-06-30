import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews } from "@/data/content";
import { Rating } from "@/components/ui/rating";
import { SectionHeading } from "@/components/ui/reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = reviews.length;
  const go = (dir: number) => setIndex((p) => (p + dir + total) % total);
  const current = reviews[index];

  return (
    <section className="bg-offwhite py-20 md:py-28">
      <div className="container-mermo">
        <SectionHeading
          align="center"
          eyebrow="Quem usa, recomenda"
          title="Mais de 12 mil clientes satisfeitos"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Quote className="mx-auto size-10 text-gold" strokeWidth={1.2} />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mx-auto mt-6 max-w-2xl font-serif text-xl leading-relaxed text-ink md:text-2xl">
                “{current.comment}”
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="size-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-ink">{current.author}</p>
                  <div className="mt-1 flex justify-center">
                    <Rating value={current.rating} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="flex size-11 items-center justify-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-white"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Depoimento ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-ink" : "w-1.5 bg-gray-light"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Próximo"
              className="flex size-11 items-center justify-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-white"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
