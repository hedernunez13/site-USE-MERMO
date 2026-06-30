import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BadgePercent,
  Boxes,
  DollarSign,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { products } from "@/data/products";
import { adminOrders, adminCustomers } from "@/data/account";
import { brands } from "@/data/brands";
import { coupons, reviews } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { cn, formatBRL } from "@/lib/utils";
import { useSEO } from "@/hooks/useSEO";

type Section =
  | "dashboard"
  | "produtos"
  | "pedidos"
  | "clientes"
  | "marcas"
  | "cupons"
  | "avaliacoes"
  | "config";

export default function Admin() {
  const [section, setSection] = useState<Section>("dashboard");
  useSEO({ title: "Painel Administrativo" });

  const revenue = adminOrders.reduce((a, o) => a + o.total, 0);
  const pending = adminOrders.filter((o) => o.status === "processando").length;

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "produtos", label: "Produtos", icon: Package },
    { id: "pedidos", label: "Pedidos", icon: ShoppingCart },
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "marcas", label: "Marcas", icon: Boxes },
    { id: "cupons", label: "Cupons", icon: Tag },
    { id: "avaliacoes", label: "Avaliações", icon: Star },
    { id: "config", label: "Configurações", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-offwhite pt-16 md:pt-20">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-60 shrink-0 flex-col border-r border-border bg-white p-4 lg:flex">
          <p className="px-3 py-2 font-serif text-lg tracking-[0.15em]">Admin</p>
          <nav className="mt-4 flex flex-col gap-1">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                  section === n.id ? "bg-ink text-white" : "text-gray-dark hover:bg-offwhite",
                )}
              >
                <n.icon className="size-4" /> {n.label}
              </button>
            ))}
          </nav>
          <Link to="/" className="mt-auto px-3 py-2 text-xs text-gray-mid hover:text-ink">
            ← Voltar à loja
          </Link>
        </aside>

        {/* Conteúdo */}
        <main className="flex-1 p-5 md:p-8">
          {/* Mobile nav */}
          <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-xs",
                  section === n.id ? "bg-ink text-white" : "bg-white text-gray-dark",
                )}
              >
                {n.label}
              </button>
            ))}
          </div>

          {section === "dashboard" && (
            <div>
              <h1 className="font-serif text-2xl md:text-3xl">Dashboard</h1>
              <p className="text-sm text-gray-mid">Visão geral da loja USE MERMO</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Faturamento", value: formatBRL(revenue), icon: DollarSign, trend: "+12%" },
                  { label: "Pedidos", value: adminOrders.length, icon: ShoppingCart, trend: "+8%" },
                  { label: "Clientes", value: adminCustomers.length, icon: Users, trend: "+5%" },
                  { label: "Pendentes", value: pending, icon: BadgePercent, trend: "ação" },
                ].map((c) => (
                  <div key={c.label} className="rounded-lg border border-border bg-white p-5">
                    <div className="flex items-center justify-between">
                      <c.icon className="size-5 text-gold" />
                      <span className="flex items-center gap-1 text-xs text-cta">
                        {c.trend} <ArrowUpRight className="size-3" />
                      </span>
                    </div>
                    <p className="mt-4 font-serif text-2xl">{c.value}</p>
                    <p className="text-xs uppercase tracking-widest text-gray-mid">{c.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-lg border border-border bg-white p-5">
                  <h2 className="font-serif text-lg">Pedidos recentes</h2>
                  <div className="mt-4 space-y-3">
                    {adminOrders.slice(0, 5).map((o) => (
                      <div key={o.id} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{o.id}</span>
                        <Badge variant="soft">{o.status}</Badge>
                        <span>{formatBRL(o.total)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-white p-5">
                  <h2 className="font-serif text-lg">Mais vendidos</h2>
                  <div className="mt-4 space-y-3">
                    {products.filter((p) => p.isBestSeller).slice(0, 5).map((p) => (
                      <div key={p.id} className="flex items-center gap-3 text-sm">
                        <img src={p.images[0].url} alt={p.name} className="size-10 object-cover" />
                        <span className="flex-1">{p.name}</span>
                        <span className="text-gray-mid">{p.reviewsCount} vendas</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === "produtos" && (
            <AdminTable
              title="Produtos"
              headers={["Produto", "Marca", "Preço", "Estoque", "Status"]}
              rows={products.map((p) => [
                <span className="flex items-center gap-3">
                  <img src={p.images[0].url} alt="" className="size-9 object-cover" />
                  {p.name}
                </span>,
                p.brand,
                formatBRL(p.price),
                String(p.stock),
                <Badge variant={p.stock > 0 ? "sale" : "outline"}>
                  {p.stock > 0 ? "Ativo" : "Esgotado"}
                </Badge>,
              ])}
            />
          )}

          {section === "pedidos" && (
            <AdminTable
              title="Pedidos"
              headers={["Pedido", "Data", "Total", "Status"]}
              rows={adminOrders.map((o) => [
                o.id,
                new Date(o.date).toLocaleDateString("pt-BR"),
                formatBRL(o.total),
                <Badge variant="soft">{o.status}</Badge>,
              ])}
            />
          )}

          {section === "clientes" && (
            <AdminTable
              title="Clientes"
              headers={["Cliente", "E-mail", "Desde", "Pedidos"]}
              rows={adminCustomers.map((c) => [
                <span className="flex items-center gap-3">
                  <img src={c.avatar} alt="" className="size-9 rounded-full object-cover" />
                  {c.name}
                </span>,
                c.email,
                new Date(c.since).toLocaleDateString("pt-BR"),
                String(c.orders),
              ])}
            />
          )}

          {section === "marcas" && (
            <AdminTable
              title="Marcas"
              headers={["Marca", "Destaque", "Produtos"]}
              rows={brands.map((b) => [
                b.name,
                <Badge variant={b.featured ? "gold" : "outline"}>
                  {b.featured ? "Sim" : "Não"}
                </Badge>,
                String(products.filter((p) => p.brand === b.name).length),
              ])}
            />
          )}

          {section === "cupons" && (
            <AdminTable
              title="Cupons"
              headers={["Código", "Tipo", "Valor", "Descrição"]}
              rows={coupons.map((c) => [
                c.code,
                c.type === "percent" ? "Percentual" : "Fixo",
                c.type === "percent" ? `${c.value}%` : formatBRL(c.value),
                c.description,
              ])}
            />
          )}

          {section === "avaliacoes" && (
            <AdminTable
              title="Avaliações"
              headers={["Cliente", "Nota", "Comentário", "Status"]}
              rows={reviews.map((r) => [
                r.author,
                `${r.rating} ★`,
                <span className="line-clamp-1 max-w-xs">{r.comment}</span>,
                <Badge variant="sale">Aprovada</Badge>,
              ])}
            />
          )}

          {section === "config" && (
            <div className="max-w-lg">
              <h1 className="font-serif text-2xl">Configurações</h1>
              <div className="mt-6 space-y-4">
                {["Dados da loja", "Métodos de pagamento", "Frete e logística", "Integrações (Supabase, Stripe, Mercado Pago)", "SEO e Analytics"].map((s) => (
                  <div key={s} className="flex items-center justify-between rounded-lg border border-border bg-white p-5">
                    <span className="text-sm">{s}</span>
                    <ArrowUpRight className="size-4 text-gray-mid" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function AdminTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl">{title}</h1>
      <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-widest text-gray-mid">
              {headers.map((h) => (
                <th key={h} className="whitespace-nowrap px-5 py-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-offwhite">
                {row.map((cell, j) => (
                  <td key={j} className="whitespace-nowrap px-5 py-3">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
