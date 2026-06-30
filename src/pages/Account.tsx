import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  Package,
  User,
} from "lucide-react";
import { currentUser, orders, addresses, cards } from "@/data/account";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatBRL } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";

type Tab = "perfil" | "pedidos" | "favoritos" | "enderecos" | "cartoes";

const statusColor: Record<string, string> = {
  processando: "soft",
  enviado: "gold",
  entregue: "sale",
  cancelado: "outline",
};

export default function Account() {
  const [params, setParams] = useSearchParams();
  const [logged, setLogged] = useState(true);
  const { ids } = useWishlist();
  const tab = (params.get("tab") as Tab) ?? "pedidos";
  useSEO({ title: "Minha Conta" });

  const favorites = products.filter((p) => ids.includes(p.id));

  const nav = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "pedidos", label: "Pedidos", icon: Package },
    { id: "favoritos", label: "Favoritos", icon: Heart },
    { id: "enderecos", label: "Endereços", icon: MapPin },
    { id: "cartoes", label: "Cartões", icon: CreditCard },
  ] as const;

  if (!logged) return <LoginScreen onLogin={() => setLogged(true)} />;

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-mermo py-10">
        <div className="mb-10 flex items-center gap-4">
          <img src={currentUser.avatar} alt={currentUser.name} className="size-16 rounded-full object-cover" />
          <div>
            <h1 className="display-title text-2xl md:text-3xl">Olá, {currentUser.name.split(" ")[0]}</h1>
            <p className="text-sm text-gray-mid">{currentUser.email}</p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Nav lateral */}
          <aside>
            <nav className="flex gap-2 overflow-x-auto lg:flex-col">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setParams({ tab: n.id })}
                  className={cn(
                    "flex items-center gap-3 whitespace-nowrap px-4 py-3 text-sm transition-colors",
                    tab === n.id ? "bg-ink text-white" : "text-gray-dark hover:bg-offwhite",
                  )}
                >
                  <n.icon className="size-4" /> {n.label}
                </button>
              ))}
              <button
                onClick={() => setLogged(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-mid hover:text-ink"
              >
                <LogOut className="size-4" /> Sair
              </button>
            </nav>
          </aside>

          {/* Conteúdo */}
          <div>
            {tab === "pedidos" && (
              <div className="space-y-4">
                <h2 className="font-serif text-xl">Meus pedidos</h2>
                {orders.map((o) => (
                  <div key={o.id} className="border border-border p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                      <div>
                        <p className="text-sm font-medium">Pedido {o.id}</p>
                        <p className="text-xs text-gray-mid">
                          {new Date(o.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <Badge variant={statusColor[o.status] as never}>{o.status}</Badge>
                    </div>
                    {o.items.map((it, i) => (
                      <div key={i} className="flex items-center gap-4 pt-4">
                        <img src={it.image} alt={it.name} className="size-16 object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{it.name}</p>
                          <p className="text-xs text-gray-mid">Qtd {it.qty}</p>
                        </div>
                        <span className="text-sm">{formatBRL(it.price)}</span>
                      </div>
                    ))}
                    <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm">
                      <span className="text-gray-mid">Total</span>
                      <span className="font-semibold">{formatBRL(o.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "favoritos" && (
              <div>
                <h2 className="mb-6 font-serif text-xl">Favoritos</h2>
                {favorites.length === 0 ? (
                  <p className="text-sm text-gray-mid">
                    Você ainda não favoritou nenhum produto.{" "}
                    <Link to="/produtos" className="link-underline text-ink">Explorar coleção</Link>
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
                    {favorites.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "perfil" && (
              <div className="max-w-md space-y-6">
                <h2 className="font-serif text-xl">Meus dados</h2>
                <div><label className="mb-1 block text-xs uppercase tracking-widest text-gray-dark">Nome</label><Input defaultValue={currentUser.name} /></div>
                <div><label className="mb-1 block text-xs uppercase tracking-widest text-gray-dark">E-mail</label><Input defaultValue={currentUser.email} /></div>
                <div><label className="mb-1 block text-xs uppercase tracking-widest text-gray-dark">Telefone</label><Input placeholder="(71) 99999-9999" /></div>
                <Button>Salvar alterações</Button>
              </div>
            )}

            {tab === "enderecos" && (
              <div className="space-y-4">
                <h2 className="font-serif text-xl">Endereços</h2>
                {addresses.map((a) => (
                  <div key={a.id} className="flex items-start justify-between border border-border p-5">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-medium">
                        {a.label} {a.main && <Badge variant="soft">Principal</Badge>}
                      </p>
                      <p className="mt-1 text-sm text-gray-mid">{a.line}</p>
                      <p className="text-sm text-gray-mid">{a.city} · {a.cep}</p>
                    </div>
                    <button className="text-xs text-gray-mid hover:text-ink">Editar</button>
                  </div>
                ))}
                <Button variant="outline">+ Adicionar endereço</Button>
              </div>
            )}

            {tab === "cartoes" && (
              <div className="space-y-4">
                <h2 className="font-serif text-xl">Cartões salvos</h2>
                {cards.map((c) => (
                  <div key={c.id} className="flex items-center justify-between border border-border p-5">
                    <div className="flex items-center gap-3">
                      <CreditCard className="size-5" />
                      <div>
                        <p className="text-sm font-medium">{c.brand} •••• {c.last4}</p>
                        <p className="text-xs text-gray-mid">Validade {c.exp}</p>
                      </div>
                    </div>
                    {c.main && <Badge variant="soft">Principal</Badge>}
                  </div>
                ))}
                <Button variant="outline">+ Adicionar cartão</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return (
    <div className="flex min-h-[80svh] items-center justify-center px-6 pt-20">
      <div className="w-full max-w-sm">
        <h1 className="display-title text-center text-3xl">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-mid">
          {mode === "login" ? "Acesse sua conta USE MERMO" : "Junte-se à USE MERMO"}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
          className="mt-8 space-y-5"
        >
          {mode === "signup" && (
            <div><label className="mb-1 block text-xs uppercase tracking-widest text-gray-dark">Nome</label><Input /></div>
          )}
          <div><label className="mb-1 block text-xs uppercase tracking-widest text-gray-dark">E-mail</label><Input type="email" required /></div>
          <div><label className="mb-1 block text-xs uppercase tracking-widest text-gray-dark">Senha</label><Input type="password" required /></div>
          <Button type="submit" size="lg" className="w-full">
            {mode === "login" ? "Entrar" : "Cadastrar"}
          </Button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-widest text-gray-mid">ou</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="mt-6 space-y-3">
          <Button variant="outline" className="w-full" onClick={onLogin}>Continuar com Google</Button>
          <Button variant="outline" className="w-full" onClick={onLogin}>Continuar com Apple</Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-mid">
          {mode === "login" ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="link-underline text-ink"
          >
            {mode === "login" ? "Cadastre-se" : "Entrar"}
          </button>
        </p>
      </div>
    </div>
  );
}
