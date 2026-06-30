import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check,
  Heart,
  Minus,
  Plus,
  RefreshCw,
  ScanFace,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getProductBySlug, relatedProducts } from "@/data/products";
import { reviews } from "@/data/content";
import {
  cn,
  formatBRL,
  installments,
  pixPrice,
  discountPercent,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/components/ui/toast";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useSEO } from "@/hooks/useSEO";
import NotFound from "@/pages/NotFound";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug ?? "");
  const recent = useRecentlyViewed(product?.id);

  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs" | "reviews">("desc");

  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { toast } = useToast();

  useSEO({
    title: product ? `${product.name} — ${product.brand}` : "Produto",
    description: product?.description,
    image: product?.images[0].url,
  });

  if (!product) return <NotFound />;

  const off = product.compareAtPrice
    ? discountPercent(product.compareAtPrice, product.price)
    : 0;
  const favorited = has(product.id);
  const related = relatedProducts(product);

  const handleAdd = () => {
    addItem(product, product.colors[color], qty);
    toast(`${product.name} adicionado à sacola`);
  };

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-mermo">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-mid">
          <Link to="/" className="hover:text-ink">Início</Link>
          <span>/</span>
          <Link to="/produtos" className="hover:text-ink">Óculos</Link>
          <span>/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Galeria */}
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            <div className="flex gap-3 md:flex-col">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={cn(
                    "size-20 shrink-0 overflow-hidden border transition-colors",
                    activeImg === i ? "border-ink" : "border-transparent opacity-60",
                  )}
                >
                  <img src={img.url} alt={img.alt} className="size-full object-cover" />
                </button>
              ))}
            </div>
            <div className="group relative flex-1 overflow-hidden bg-offwhite">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={product.images[activeImg].url}
                alt={product.images[activeImg].alt}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {product.isNew && <Badge variant="gold">Novo</Badge>}
                {off > 0 && <Badge variant="sale">-{off}%</Badge>}
              </div>
              <Link
                to="/virtual-try-on"
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-widest backdrop-blur transition-transform hover:scale-105"
              >
                <ScanFace className="size-4" /> Provar virtual
              </Link>
            </div>
          </div>

          {/* Informações */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-mid">
              {product.brand}
            </p>
            <h1 className="display-title mt-2 text-3xl md:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-4">
              <Rating value={product.rating} count={product.reviewsCount} size="md" />
              {product.stock < 12 && (
                <span className="text-xs font-medium text-cta">
                  Apenas {product.stock} em estoque
                </span>
              )}
            </div>

            {/* Preço */}
            <div className="mt-6 border-y border-border py-6">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl text-ink">
                  {formatBRL(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-lg text-gray-mid line-through">
                    {formatBRL(product.compareAtPrice)}
                  </span>
                )}
                {off > 0 && <Badge variant="sale">-{off}%</Badge>}
              </div>
              <p className="mt-2 text-sm text-cta">
                {formatBRL(pixPrice(product.price))} no PIX (8% OFF)
              </p>
              <p className="text-sm text-gray-mid">
                ou 10x de {installments(product.price)} sem juros
              </p>
            </div>

            {/* Cores */}
            <div className="mt-6">
              <p className="mb-3 text-xs uppercase tracking-widest text-gray-dark">
                Cor: <span className="text-ink">{product.colors[color].name}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(i)}
                    aria-label={c.name}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border transition-all",
                      color === i ? "border-ink ring-1 ring-ink" : "border-border",
                    )}
                  >
                    <span
                      className="size-6 rounded-full border border-black/10"
                      style={{ background: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantidade + ações */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex size-12 items-center justify-center hover:bg-muted"
                  aria-label="Diminuir"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="flex size-12 items-center justify-center hover:bg-muted"
                  aria-label="Aumentar"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button onClick={handleAdd} size="lg" className="flex-1">
                Adicionar à sacola
              </Button>
              <button
                onClick={() => {
                  toggle(product.id);
                  toast(favorited ? "Removido dos favoritos" : "Salvo nos favoritos");
                }}
                aria-label="Favoritar"
                className={cn(
                  "flex size-14 items-center justify-center border transition-colors",
                  favorited ? "border-cta text-cta" : "border-border hover:border-ink",
                )}
              >
                <Heart className={cn("size-5", favorited && "fill-cta")} />
              </button>
            </div>

            <Button asChild variant="cta" size="lg" className="mt-3 w-full">
              <Link to="/checkout">Comprar agora</Link>
            </Button>

            {/* Selos */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
              {[
                { icon: Truck, label: "Frete grátis acima de R$ 299" },
                { icon: ShieldCheck, label: "Garantia de 12 meses" },
                { icon: RefreshCw, label: "30 dias para troca" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2">
                  <b.icon className="size-5 text-gold" strokeWidth={1.4} />
                  <span className="text-[11px] leading-tight text-gray-mid">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="mt-16 border-t border-border pt-10 md:mt-24">
          <div className="flex gap-8 border-b border-border">
            {[
              { id: "desc", label: "Descrição" },
              { id: "specs", label: "Especificações" },
              { id: "reviews", label: `Avaliações (${product.reviewsCount})` },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                className={cn(
                  "relative pb-4 text-sm tracking-wide transition-colors",
                  tab === t.id ? "text-ink" : "text-gray-mid hover:text-ink",
                )}
              >
                {t.label}
                {tab === t.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-ink"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {tab === "desc" && (
              <p className="max-w-2xl text-sm leading-relaxed text-gray-dark md:text-base">
                {product.description}
              </p>
            )}
            {tab === "specs" && (
              <dl className="grid max-w-2xl gap-px overflow-hidden rounded-md bg-border md:grid-cols-2">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between bg-white px-4 py-3 text-sm">
                    <dt className="text-gray-mid">{k}</dt>
                    <dd className="font-medium capitalize text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {tab === "reviews" && (
              <div className="grid max-w-3xl gap-6 md:grid-cols-2">
                {reviews.slice(0, 4).map((r) => (
                  <div key={r.id} className="border border-border p-5">
                    <div className="flex items-center gap-3">
                      <img src={r.avatar} alt={r.author} className="size-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-semibold">{r.author}</p>
                        {r.verified && (
                          <span className="flex items-center gap-1 text-[11px] text-cta">
                            <Check className="size-3" /> Compra verificada
                          </span>
                        )}
                      </div>
                    </div>
                    <Rating value={r.rating} className="mt-3" />
                    <p className="mt-2 font-medium text-ink">{r.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-dark">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <div className="py-16">
            <SectionHeading eyebrow="Você também pode gostar" title="Produtos relacionados" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Vistos recentemente */}
        {recent.length > 0 && (
          <div className="border-t border-border py-16">
            <SectionHeading eyebrow="Continue de onde parou" title="Vistos recentemente" />
            <div className="no-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 md:mx-0 md:px-0">
              {recent.map((p) => (
                <div key={p.id} className="w-[60%] shrink-0 sm:w-[30%] lg:w-[18%]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
