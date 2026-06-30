import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, CreditCard, FileText, QrCode } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn, formatBRL, installments, pixPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { useSEO } from "@/hooks/useSEO";

const STEPS = ["Dados", "Entrega", "Pagamento"];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState<"pix" | "card" | "boleto">("pix");
  const { items, subtotal, discount, shipping, total, clear } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  useSEO({ title: "Checkout" });

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70svh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="display-title text-3xl">Nada para finalizar</h1>
        <Button asChild>
          <Link to="/produtos">Ver produtos</Link>
        </Button>
      </div>
    );
  }

  const finish = () => {
    toast("Pedido realizado com sucesso! 🎉");
    clear();
    navigate("/conta?tab=pedidos");
  };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="mb-1 block text-xs uppercase tracking-widest text-gray-dark">
      {children}
    </label>
  );

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-mermo py-10">
        {/* Stepper */}
        <div className="mx-auto mb-12 flex max-w-xl items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border text-sm transition-colors",
                    i <= step ? "border-ink bg-ink text-white" : "border-border text-gray-mid",
                  )}
                >
                  {i < step ? <Check className="size-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-[11px] uppercase tracking-widest",
                    i <= step ? "text-ink" : "text-gray-mid",
                  )}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-px flex-1 transition-colors",
                    i < step ? "bg-ink" : "bg-border",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {/* Etapa 1 — Dados */}
            {step === 0 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl">Seus dados</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div><Label>Nome completo</Label><Input placeholder="Maria Silva" /></div>
                  <div><Label>CPF</Label><Input placeholder="000.000.000-00" /></div>
                  <div><Label>E-mail</Label><Input type="email" placeholder="voce@email.com" /></div>
                  <div><Label>Telefone</Label><Input type="tel" placeholder="(71) 99999-9999" /></div>
                </div>
                <Button size="lg" onClick={() => setStep(1)}>Continuar para entrega</Button>
              </div>
            )}

            {/* Etapa 2 — Entrega */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl">Endereço de entrega</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Label>CEP</Label><Input placeholder="40000-000" /></div>
                  <div className="sm:col-span-2"><Label>Endereço</Label><Input placeholder="Rua, número" /></div>
                  <div><Label>Bairro</Label><Input /></div>
                  <div><Label>Complemento</Label><Input /></div>
                  <div><Label>Cidade</Label><Input /></div>
                  <div><Label>Estado</Label><Input /></div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-gray-dark">Frete</p>
                  {[
                    { label: "Sedex — 2 a 4 dias úteis", price: shipping },
                    { label: "PAC — 5 a 8 dias úteis", price: 0 },
                  ].map((opt, i) => (
                    <label key={i} className="flex cursor-pointer items-center justify-between border border-border p-4">
                      <span className="flex items-center gap-3 text-sm">
                        <input type="radio" name="frete" defaultChecked={i === 0} className="accent-ink" />
                        {opt.label}
                      </span>
                      <span className="text-sm font-medium">
                        {opt.price === 0 ? "Grátis" : formatBRL(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" onClick={() => setStep(0)}>Voltar</Button>
                  <Button size="lg" onClick={() => setStep(2)}>Ir para pagamento</Button>
                </div>
              </div>
            )}

            {/* Etapa 3 — Pagamento */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-serif text-2xl">Pagamento</h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "pix", label: "PIX", icon: QrCode },
                    { id: "card", label: "Cartão", icon: CreditCard },
                    { id: "boleto", label: "Boleto", icon: FileText },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPayment(m.id as typeof payment)}
                      className={cn(
                        "flex flex-col items-center gap-2 border p-4 transition-colors",
                        payment === m.id ? "border-ink bg-offwhite" : "border-border hover:border-ink/40",
                      )}
                    >
                      <m.icon className="size-5" />
                      <span className="text-xs uppercase tracking-widest">{m.label}</span>
                    </button>
                  ))}
                </div>

                {payment === "pix" && (
                  <div className="border border-border p-6 text-center">
                    <div className="mx-auto grid size-40 place-items-center bg-offwhite">
                      <QrCode className="size-24 text-ink" strokeWidth={0.8} />
                    </div>
                    <p className="mt-4 text-sm text-gray-mid">
                      Escaneie o QR Code e pague{" "}
                      <span className="font-semibold text-cta">{formatBRL(pixPrice(total))}</span>{" "}
                      com 8% de desconto.
                    </p>
                  </div>
                )}
                {payment === "card" && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2"><Label>Número do cartão</Label><Input placeholder="0000 0000 0000 0000" /></div>
                    <div className="sm:col-span-2"><Label>Nome impresso</Label><Input /></div>
                    <div><Label>Validade</Label><Input placeholder="MM/AA" /></div>
                    <div><Label>CVV</Label><Input placeholder="123" /></div>
                    <div className="sm:col-span-2">
                      <Label>Parcelas</Label>
                      <select className="h-12 w-full border-b border-ink/15 bg-transparent text-sm outline-none">
                        {Array.from({ length: 10 }).map((_, i) => (
                          <option key={i}>{i + 1}x de {installments(total, i + 1)} sem juros</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {payment === "boleto" && (
                  <div className="border border-border p-6 text-sm text-gray-mid">
                    O boleto será gerado após a confirmação. O prazo de compensação é de até 2 dias úteis.
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)}>Voltar</Button>
                  <Button variant="cta" size="lg" onClick={finish} className="flex-1">
                    Finalizar pedido · {formatBRL(payment === "pix" ? pixPrice(total) : total)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Resumo */}
          <aside className="h-fit border border-border p-6 lg:sticky lg:top-28">
            <h2 className="font-serif text-xl">Resumo</h2>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={item.product.id + item.color.name} className="flex gap-3">
                  <img src={item.product.images[0].url} alt={item.product.name} className="size-16 object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-mid">
                      {item.color.name} · Qtd {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm">{formatBRL(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-gray-mid">Subtotal</dt><dd>{formatBRL(subtotal)}</dd></div>
              {discount > 0 && <div className="flex justify-between text-cta"><dt>Desconto</dt><dd>- {formatBRL(discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-gray-mid">Frete</dt><dd>{shipping === 0 ? "Grátis" : formatBRL(shipping)}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total</dt><dd>{formatBRL(total)}</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
