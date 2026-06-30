import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatBRL, pixPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { useSEO } from "@/hooks/useSEO";

export default function Cart() {
  const {
    items,
    removeItem,
    setQty,
    subtotal,
    discount,
    shipping,
    total,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  useSEO({ title: "Carrinho" });

  const handleCoupon = () => {
    if (applyCoupon(code)) {
      toast("Cupom aplicado com sucesso!");
      setCode("");
    } else {
      toast("Cupom inválido", "info");
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70svh] flex-col items-center justify-center gap-4 px-6 text-center">
        <ShoppingBag className="size-14 text-gray-light" strokeWidth={1} />
        <h1 className="display-title text-3xl">Sua sacola está vazia</h1>
        <p className="text-sm text-gray-mid">Que tal explorar nossa coleção?</p>
        <Button asChild className="mt-2">
          <Link to="/produtos">Ver óculos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-mermo py-10">
        <h1 className="display-title mb-8 text-3xl md:text-4xl">Sua Sacola</h1>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          {/* Itens */}
          <div className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <div key={item.product.id + item.color.name} className="flex gap-5 py-6">
                <Link to={`/produto/${item.product.slug}`} className="shrink-0">
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="size-28 object-cover md:size-32"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-mid">
                        {item.product.brand}
                      </p>
                      <Link
                        to={`/produto/${item.product.slug}`}
                        className="font-serif text-lg hover:text-gold"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-mid">
                        <span
                          className="inline-block size-3 rounded-full border border-black/10"
                          style={{ background: item.color.hex }}
                        />
                        {item.color.name}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.color.name)}
                      className="text-gray-mid hover:text-ink"
                      aria-label="Remover"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => setQty(item.product.id, item.color.name, item.quantity - 1)}
                        className="flex size-9 items-center justify-center hover:bg-muted"
                        aria-label="Diminuir"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => setQty(item.product.id, item.color.name, item.quantity + 1)}
                        className="flex size-9 items-center justify-center hover:bg-muted"
                        aria-label="Aumentar"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <span className="font-semibold">
                      {formatBRL(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <aside className="h-fit border border-border p-6 lg:sticky lg:top-28">
            <h2 className="font-serif text-xl">Resumo do pedido</h2>

            {/* Cupom */}
            <div className="mt-5">
              {coupon ? (
                <div className="flex items-center justify-between rounded-md bg-offwhite px-4 py-3 text-sm">
                  <span className="flex items-center gap-2 text-cta">
                    <Tag className="size-4" /> {coupon.code}
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-gray-mid hover:text-ink"
                  >
                    remover
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Cupom de desconto"
                    className="flex-1 border-b border-ink/15 bg-transparent py-2 text-sm outline-none focus:border-ink"
                  />
                  <Button variant="outline" size="sm" onClick={handleCoupon}>
                    Aplicar
                  </Button>
                </div>
              )}
            </div>

            <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-mid">Subtotal</dt>
                <dd>{formatBRL(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-cta">
                  <dt>Desconto</dt>
                  <dd>- {formatBRL(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-mid">Frete</dt>
                <dd>{shipping === 0 ? "Grátis" : formatBRL(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatBRL(total)}</dd>
              </div>
              <p className="text-xs text-cta">
                ou {formatBRL(pixPrice(total))} no PIX
              </p>
            </dl>

            <Button asChild variant="cta" size="lg" className="mt-6 w-full">
              <Link to="/checkout">Finalizar compra</Link>
            </Button>
            <Button asChild variant="link" className="mt-2 w-full">
              <Link to="/produtos">Continuar comprando</Link>
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
}
