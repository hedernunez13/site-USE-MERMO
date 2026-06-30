import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBRL } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    setQty,
    subtotal,
    shipping,
    total,
    count,
  } = useCart();

  const freeShippingLeft = Math.max(0, 299 - subtotal);
  const progress = Math.min(100, (subtotal / 299) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-white"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-serif text-xl">
                Sacola <span className="text-gray-mid">({count})</span>
              </h2>
              <button onClick={closeCart} aria-label="Fechar sacola">
                <X className="size-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="size-12 text-gray-light" strokeWidth={1} />
                <p className="font-serif text-xl">Sua sacola está vazia</p>
                <p className="text-sm text-gray-mid">
                  Descubra os óculos que combinam com você.
                </p>
                <Button onClick={closeCart} asChild className="mt-2">
                  <Link to="/produtos">Explorar coleção</Link>
                </Button>
              </div>
            ) : (
              <>
                {/* Frete grátis progress */}
                <div className="border-b border-border px-6 py-4">
                  {freeShippingLeft > 0 ? (
                    <p className="mb-2 text-xs text-gray-dark">
                      Faltam{" "}
                      <span className="font-semibold text-ink">
                        {formatBRL(freeShippingLeft)}
                      </span>{" "}
                      para o frete grátis
                    </p>
                  ) : (
                    <p className="mb-2 text-xs font-semibold text-cta">
                      🎉 Você ganhou frete grátis!
                    </p>
                  )}
                  <div className="h-1 w-full overflow-hidden rounded-full bg-gray-light">
                    <motion.div
                      className="h-full bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id + item.color.name}
                      className="flex gap-4 border-b border-border py-4 last:border-0"
                    >
                      <Link
                        to={`/produto/${item.product.slug}`}
                        onClick={closeCart}
                        className="shrink-0"
                      >
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="size-24 object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-mid">
                              {item.product.brand}
                            </p>
                            <p className="font-serif text-base leading-tight">
                              {item.product.name}
                            </p>
                            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-mid">
                              <span
                                className="inline-block size-3 rounded-full border border-black/10"
                                style={{ background: item.color.hex }}
                              />
                              {item.color.name}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeItem(item.product.id, item.color.name)
                            }
                            aria-label="Remover"
                            className="text-gray-mid transition-colors hover:text-ink"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() =>
                                setQty(
                                  item.product.id,
                                  item.color.name,
                                  item.quantity - 1,
                                )
                              }
                              className="flex size-8 items-center justify-center hover:bg-muted"
                              aria-label="Diminuir"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                setQty(
                                  item.product.id,
                                  item.color.name,
                                  item.quantity + 1,
                                )
                              }
                              className="flex size-8 items-center justify-center hover:bg-muted"
                              aria-label="Aumentar"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatBRL(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border px-6 py-5">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-mid">Subtotal</span>
                    <span>{formatBRL(subtotal)}</span>
                  </div>
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-gray-mid">Frete</span>
                    <span>{shipping === 0 ? "Grátis" : formatBRL(shipping)}</span>
                  </div>
                  <div className="mb-4 flex justify-between border-t border-border pt-3 text-base font-semibold">
                    <span>Total</span>
                    <span>{formatBRL(total)}</span>
                  </div>
                  <Button asChild size="lg" className="w-full" variant="cta">
                    <Link to="/checkout" onClick={closeCart}>
                      Finalizar compra
                    </Link>
                  </Button>
                  <button
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-xs uppercase tracking-widest text-gray-mid hover:text-ink"
                  >
                    Continuar comprando
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
