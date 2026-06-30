import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { formatBRL } from "@/lib/utils";

export function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shape.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query]);

  const suggestions = ["Aviador", "Premium", "Ray-Ban", "Solar", "Titânio"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-ink/30 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-0 w-full bg-white shadow-card"
          >
            <div className="container-mermo py-6">
              <div className="flex items-center gap-4 border-b border-ink/15 pb-4">
                <Search className="size-5 text-gray-mid" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="O que você procura?"
                  className="flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-gray-mid"
                />
                <button onClick={onClose} aria-label="Fechar">
                  <X className="size-5 text-ink" />
                </button>
              </div>

              {results.length === 0 ? (
                <div className="py-6">
                  <p className="eyebrow mb-4">Buscas populares</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-ink/15 px-4 py-2 text-xs uppercase tracking-widest text-gray-dark transition-colors hover:border-ink hover:bg-ink hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid gap-2 py-4 sm:grid-cols-2">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      to={`/produto/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-2 transition-colors hover:bg-offwhite"
                    >
                      <img
                        src={p.images[0].url}
                        alt={p.name}
                        className="size-16 object-cover"
                      />
                      <div>
                        <p className="text-[11px] uppercase tracking-widest text-gray-mid">
                          {p.brand}
                        </p>
                        <p className="font-serif text-base text-ink">{p.name}</p>
                        <p className="text-sm text-ink">{formatBRL(p.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
