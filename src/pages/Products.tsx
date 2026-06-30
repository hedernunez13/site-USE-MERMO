import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import type { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { cn } from "@/lib/utils";

const SHAPES = ["Aviador", "Quadrado", "Redondo", "Gatinho", "Retangular", "Hexagonal", "Wayfarer"];
const MATERIALS = ["Acetato", "Metal", "Titânio", "TR-90", "Alumínio", "Injetado"];
const GENDERS = ["masculino", "feminino", "unissex", "infantil"];

const SORTS = [
  { value: "mais-vendidos", label: "Mais vendidos" },
  { value: "novidades", label: "Novidades" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "avaliados", label: "Melhor avaliados" },
];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoria = params.get("categoria") ?? "";
  const marca = params.get("marca") ?? "";
  const formato = params.get("formato") ?? "";
  const material = params.get("material") ?? "";
  const sexo = params.get("sexo") ?? "";
  const uv = params.get("uv") === "1";
  const ordenar = params.get("ordenar") ?? "mais-vendidos";

  const activeCat = categories.find((c) => c.slug === categoria);
  useSEO({
    title: activeCat ? `${activeCat.name} — Óculos` : "Todos os Óculos",
    description: "Explore a coleção completa de óculos premium USE MERMO.",
  });

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && next.get(key) !== value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list: Product[] = [...products];
    if (categoria) list = list.filter((p) => p.categories.includes(categoria as never));
    if (marca) list = list.filter((p) => p.brand === marca);
    if (formato) list = list.filter((p) => p.shape === formato);
    if (material) list = list.filter((p) => p.material === material);
    if (sexo) list = list.filter((p) => p.gender === sexo);
    if (uv) list = list.filter((p) => p.uvProtection);

    switch (ordenar) {
      case "menor-preco":
        list.sort((a, b) => a.price - b.price);
        break;
      case "maior-preco":
        list.sort((a, b) => b.price - a.price);
        break;
      case "avaliados":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "novidades":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
    return list;
  }, [categoria, marca, formato, material, sexo, uv, ordenar]);

  const activeFilters = [categoria, marca, formato, material, sexo].filter(Boolean).length + (uv ? 1 : 0);

  const FilterGroup = ({
    title,
    items,
    activeValue,
    paramKey,
    labelMap,
  }: {
    title: string;
    items: string[];
    activeValue: string;
    paramKey: string;
    labelMap?: (s: string) => string;
  }) => (
    <div className="border-b border-border py-5">
      <p className="eyebrow mb-4">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const active = activeValue === item;
          return (
            <button
              key={item}
              onClick={() => setParam(paramKey, item)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs capitalize tracking-wide transition-colors",
                active
                  ? "border-ink bg-ink text-white"
                  : "border-ink/15 text-gray-dark hover:border-ink",
              )}
            >
              {labelMap ? labelMap(item) : item}
            </button>
          );
        })}
      </div>
    </div>
  );

  const Sidebar = (
    <div>
      <FilterGroup
        title="Categoria"
        items={categories.map((c) => c.slug)}
        activeValue={categoria}
        paramKey="categoria"
        labelMap={(s) => categories.find((c) => c.slug === s)?.name ?? s}
      />
      <FilterGroup
        title="Marca"
        items={brands.map((b) => b.name)}
        activeValue={marca}
        paramKey="marca"
      />
      <FilterGroup title="Formato" items={SHAPES} activeValue={formato} paramKey="formato" />
      <FilterGroup title="Material" items={MATERIALS} activeValue={material} paramKey="material" />
      <FilterGroup title="Gênero" items={GENDERS} activeValue={sexo} paramKey="sexo" />
      <div className="py-5">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={uv}
            onChange={(e) => setParam("uv", e.target.checked ? "1" : "")}
            className="size-4 accent-ink"
          />
          <span className="text-sm text-gray-dark">Apenas com proteção UV400</span>
        </label>
      </div>
      {activeFilters > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setParams(ordenar !== "mais-vendidos" ? { ordenar } : {})}
          className="mt-2"
        >
          Limpar filtros ({activeFilters})
        </Button>
      )}
    </div>
  );

  return (
    <div className="pt-28 md:pt-36">
      <div className="container-mermo">
        {/* Cabeçalho */}
        <nav className="mb-4 flex items-center gap-2 text-xs text-gray-mid">
          <Link to="/" className="hover:text-ink">Início</Link>
          <span>/</span>
          <span className="text-ink">{activeCat?.name ?? "Todos os óculos"}</span>
        </nav>
        <div className="flex flex-col gap-2 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="display-title text-3xl md:text-5xl">
              {activeCat?.name ?? "Coleção Completa"}
            </h1>
            <p className="mt-2 text-sm text-gray-mid">
              {filtered.length} {filtered.length === 1 ? "modelo" : "modelos"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs uppercase tracking-widest lg:hidden"
            >
              <SlidersHorizontal className="size-4" /> Filtros
              {activeFilters > 0 && ` (${activeFilters})`}
            </button>
            <select
              value={ordenar}
              onChange={(e) => setParam("ordenar", e.target.value)}
              className="h-10 border-b border-ink/15 bg-transparent pr-6 text-sm outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  Ordenar: {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid + sidebar */}
        <div className="flex gap-10 py-10">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-28">{Sidebar}</div>
          </aside>

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <p className="font-serif text-2xl">Nenhum modelo encontrado</p>
                <p className="text-sm text-gray-mid">
                  Tente ajustar os filtros para ver mais opções.
                </p>
                <Button variant="outline" onClick={() => setParams({})}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawer de filtros mobile */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-white p-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-serif text-xl">Filtros</p>
              <button onClick={() => setFiltersOpen(false)} aria-label="Fechar">
                <X className="size-5" />
              </button>
            </div>
            {Sidebar}
            <Button className="mt-6 w-full" onClick={() => setFiltersOpen(false)}>
              Ver {filtered.length} produtos
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
