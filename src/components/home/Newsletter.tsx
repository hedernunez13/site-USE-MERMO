import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    setDone(true);
    // TODO: integrar com serviço de e-mail (Supabase / Mailchimp).
  };

  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="container-mermo max-w-2xl text-center">
        <p className="eyebrow mb-3 text-gold-soft">Ofertas exclusivas</p>
        <h2 className="display-title text-3xl md:text-5xl">
          Ganhe 10% OFF na primeira compra.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
          Assine nossa newsletter e receba lançamentos, tendências e descontos
          em primeira mão.
        </p>

        {done ? (
          <div className="mt-10 flex items-center justify-center gap-3 text-gold-soft">
            <Check className="size-5" />
            <span className="text-sm tracking-wide">
              Tudo certo! Seu cupom MERMO10 já está a caminho.
            </span>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-10 flex max-w-md items-center gap-3 border-b border-white/30 pb-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40"
            />
            <Button type="submit" variant="gold" size="sm" className="shrink-0">
              Assinar <ArrowRight className="size-4" />
            </Button>
          </form>
        )}
        <p className="mt-4 text-[11px] text-white/40">
          Ao assinar, você concorda com nossa Política de Privacidade.
        </p>
      </div>
    </section>
  );
}
