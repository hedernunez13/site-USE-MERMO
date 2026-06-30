# USE MERMO — E-commerce Premium de Óculos

> **Seu estilo. Sua visão. Use Mermo.**

E-commerce premium para a marca brasileira de óculos **USE MERMO**. Design
minimalista, editorial e luxuoso — inspirado em Apple, Aesop, Prada e Gentle
Monster — com arquitetura escalável pronta para crescer.

![Stack](https://img.shields.io/badge/React-18-111?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-111?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5-111?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-111?logo=tailwindcss)

---

## ✨ Stack Técnica

| Categoria | Tecnologia |
|---|---|
| Framework | **React 18 + Vite 6 + TypeScript** |
| Estilo | **Tailwind CSS** + design tokens (shadcn/ui pattern) |
| Componentes | Radix UI (base shadcn/ui), CVA |
| Roteamento | **React Router 6** (com code-splitting por rota) |
| Formulários | **React Hook Form + Zod** |
| Dados assíncronos | **React Query** (`@tanstack/react-query`) |
| Animações | **Framer Motion** |
| Ícones | **Lucide React** |

---

## 🚀 Como instalar e executar

```bash
# 1. Instalar dependências
npm install

# 2. Ambiente de desenvolvimento (http://localhost:5173)
npm run dev

# 3. Build de produção
npm run build

# 4. Pré-visualizar o build
npm run preview
```

Requisitos: **Node 18+** (testado em Node 24).

---

## 📁 Estrutura do projeto

```
/src
  /assets            # imagens e estáticos locais
  /components
    /layout          # Navbar, Footer, Layout, SearchModal, WhatsApp
    /home            # seções da home (Hero, CategoryGrid, ProductRail...)
    /products        # ProductCard e afins
    /cart            # CartDrawer
    /account         # componentes da área do cliente
    /admin           # componentes do painel
    /ui              # primitives (Button, Badge, Input, Toast, Rating...)
  /context           # CartContext, WishlistContext (estado global + localStorage)
  /hooks             # useSEO, useRecentlyViewed
  /lib               # utils (formatBRL, cn, slugify...)
  /services          # camada de integração (Supabase, pagamentos, frete, analytics)
  /types             # tipos centrais do domínio
  /data              # dados mockados (produtos, marcas, categorias, blog...)
  /pages             # páginas/rotas
```

### Rotas

| Rota | Página |
|---|---|
| `/` | Home |
| `/produtos` | Listagem com filtros e ordenação |
| `/produto/:slug` | Detalhe do produto |
| `/virtual-try-on` | Prova virtual (webcam/upload, pronta para IA) |
| `/blog` · `/blog/:slug` | Blog e post |
| `/sobre` · `/contato` | Institucional |
| `/conta` · `/carrinho` · `/checkout` | Jornada de compra |
| `/admin` | Painel administrativo |

---

## 🎨 Identidade Visual

**Paleta** (definida em `src/index.css` como CSS variables e em `tailwind.config.ts`):

| Token | Cor | Hex |
|---|---|---|
| Branco | `white` | `#FFFFFF` |
| Off White | `offwhite` | `#F8F7F5` |
| Preto | `ink` | `#111111` |
| Cinza Claro | `gray-light` | `#ECECEC` |
| Cinza Médio | `gray-mid` | `#9A9A9A` |
| Cinza Escuro | `gray-dark` | `#3A3A3A` |
| Dourado Premium | `gold` | `#C4A76A` |
| Verde CTA | `cta` | `#2E7D32` |

**Tipografia:** Playfair Display (títulos) · Inter (corpo) — carregadas via Google Fonts no `index.html`.

---

## 🛍️ Como cadastrar novos produtos

Edite **`src/data/products.ts`**. Adicione um objeto ao array `seeds` — `id`,
`slug`, `images` e `specs` são gerados automaticamente:

```ts
{
  name: "Nome do Modelo",
  brand: "USE MERMO",
  categories: ["oculos-solar", "premium"],
  gender: "unissex",
  shape: "Aviador",
  material: "Acetato",
  colors: [{ name: "Preto", hex: "#111111" }],
  size: "M",
  uvProtection: true,
  price: 599.9,
  compareAtPrice: 799,      // opcional (gera badge de desconto)
  rating: 4.8,
  reviewsCount: 120,
  stock: 20,
  isNew: true,
  isBestSeller: true,
  description: "...",
  imgA: 0, imgB: 4,          // índices do POOL de imagens
}
```

> Em produção, troque os mocks por dados reais implementando os métodos de
> `src/services/products.service.ts` (a assinatura já é compatível com React Query).

## 🏷️ Como adicionar novas marcas

Edite **`src/data/brands.ts`** e inclua `{ id, name, featured }`. A marca aparece
automaticamente no slider da home, no mega menu e nos filtros.

## 🖼️ Como trocar banners

- **Hero da home:** `src/components/home/Hero.tsx` (imagem, headline, CTAs).
- **Imagens de categoria:** `src/data/categories.ts`.
- **Banner do mega menu:** `src/components/layout/Navbar.tsx`.

---

## 🔌 Integrações (preparadas)

Toda comunicação externa fica isolada em `src/services`. Variáveis de ambiente
em **`.env`** (veja `.env.example`).

### Supabase
1. `npm install @supabase/supabase-js`
2. Defina `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no `.env`.
3. Descomente o cliente em `src/services/supabase.ts`.
4. Substitua os mocks em `*.service.ts` por queries reais.

### Pagamentos (Stripe · Mercado Pago · PagSeguro)
- Implemente em `src/services/payments.service.ts`.
- **Crie a sessão sempre no backend** (ex.: Supabase Edge Function); o cliente
  recebe apenas a chave pública (`VITE_STRIPE_PUBLIC_KEY` / `VITE_MERCADOPAGO_PUBLIC_KEY`).

### Frete (Melhor Envio · Frenet)
- Implemente `quoteShipping()` em `src/services/shipping.service.ts`.

### Analytics (GA4 · GTM · Meta Pixel)
- IDs em `.env`; chame `track()` de `src/services/analytics.ts` nos eventos
  (`view_item`, `add_to_cart`, `purchase`...).

### Login social (Google / Apple) e WhatsApp Business
- Botões já presentes na tela de conta; conecte via Supabase Auth.
- Número do WhatsApp em `VITE_WHATSAPP_NUMBER`.

---

## 🤖 Prova Virtual (arquitetura para IA)

`src/pages/VirtualTryOn.tsx` já estrutura **webcam**, **upload de selfie**,
**seleção de modelo** e **sobreposição** do óculos. Para reconhecimento facial,
plugue **MediaPipe FaceMesh** ou **TensorFlow.js** no ponto marcado
`detectFaceAndPlaceOverlay()`, usando os _face landmarks_ para posicionar o
overlay (campo `tryOnImage` de cada produto).

---

## 🔍 SEO & Performance

- Meta tags, Open Graph, Twitter Cards e **JSON-LD (Schema.org)** em `index.html`.
- `useSEO()` atualiza title/description por página.
- `robots.txt` e `sitemap.xml` em `/public`.
- **Code-splitting** por rota (`React.lazy`), lazy loading de imagens,
  `manualChunks` no Vite. URLs amigáveis e breadcrumbs.
- Acessibilidade: navegação por teclado, `alt` nas imagens, foco visível,
  contraste AA.

---

## ☁️ Como publicar (Vercel ou Netlify)

O projeto é uma SPA — configure o _fallback_ para `index.html`.

**Vercel**
```bash
npm i -g vercel && vercel
```
Build: `npm run build` · Output: `dist`. (As reescritas de SPA são automáticas.)

**Netlify**
```bash
npm i -g netlify-cli && netlify deploy --prod
```
Build: `npm run build` · Publish: `dist`. Adicione um `_redirects` com:
```
/*  /index.html  200
```

Não esqueça de cadastrar as variáveis de ambiente (`VITE_*`) no painel do provedor.

---

## 📦 Scripts

| Comando | Ação |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Type-check + build de produção |
| `npm run preview` | Servir o build localmente |

---

© USE MERMO — Projeto front-end premium. Dados de produto são fictícios (mock).
Imagens via Unsplash para fins de demonstração.
