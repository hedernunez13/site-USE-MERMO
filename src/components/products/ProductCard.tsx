import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { cn, formatBRL, discountPercent } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/toast";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();
  const favorited = has(product.id);

  const off = product.compareAtPrice
    ? discountPercent(product.compareAtPrice, product.price)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, product.colors[0], 1);
    toast(`${product.name} adicionado à sacola`);
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product.id);
    toast(
      favorited ? "Removido dos favoritos" : `${product.name} salvo nos favoritos`,
    );
  };

  return (
    <motion.article
      className="group relative"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      <Link to={`/produto/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-offwhite">
          {/* Badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="gold">Novo</Badge>}
            {off > 0 && <Badge variant="sale">-{off}%</Badge>}
          </div>

          {/* Favoritar */}
          <button
            onClick={handleFav}
            aria-label="Favoritar"
            className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/80 backdrop-blur transition-transform duration-300 hover:scale-110"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                favorited ? "fill-cta text-cta" : "text-ink",
              )}
            />
          </button>

          {/* Imagens com troca no hover */}
          <motion.img
            src={product.images[0].url}
            alt={product.images[0].alt}
            loading="lazy"
            variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 size-full object-cover"
          />
          <motion.img
            src={product.images[1]?.url ?? product.images[0].url}
            alt={product.images[1]?.alt ?? product.images[0].alt}
            loading="lazy"
            variants={{
              rest: { opacity: 0, scale: 1 },
              hover: { opacity: 1, scale: 1.03 },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 size-full object-cover"
          />

          {/* Botão comprar (revela no hover) */}
          <motion.button
            onClick={handleAdd}
            variants={{
              rest: { y: "120%" },
              hover: { y: "0%" },
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 z-10 flex h-12 items-center justify-center gap-2 bg-ink text-xs uppercase tracking-widest text-white"
          >
            <ShoppingBag className="size-4" /> Adicionar
          </motion.button>
        </div>

        <div className="space-y-1.5 pt-4">
          <p className="text-[11px] uppercase tracking-widest text-gray-mid">
            {product.brand}
          </p>
          <h3 className="font-serif text-lg leading-tight text-ink">
            {product.name}
          </h3>
          <Rating value={product.rating} count={product.reviewsCount} />
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-base font-semibold text-ink">
              {formatBRL(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-mid line-through">
                {formatBRL(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
