import type {
  Review,
  BlogPost,
  InstagramPost,
  FAQItem,
  Coupon,
  Benefit,
} from "@/types";

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`;
const wide = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;
const square = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`;

// ---------------- Depoimentos / Avaliações ----------------
export const reviews: Review[] = [
  {
    id: "rev-1",
    author: "Marina Costa",
    avatar: portrait("1494790108377-be9c29b29330"),
    rating: 5,
    title: "Simplesmente perfeito",
    comment:
      "A qualidade do acetato é impressionante. Recebi vários elogios e o conforto é incrível mesmo usando o dia todo.",
    date: "2026-05-12",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Rafael Mendes",
    avatar: portrait("1500648767791-00dcc994a43e"),
    rating: 5,
    title: "Atendimento impecável",
    comment:
      "Comprei o Eclipse Carbon e chegou em 2 dias. Embalagem premium, parece que comprei numa ótica de luxo.",
    date: "2026-05-03",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Júlia Andrade",
    avatar: portrait("1438761681033-6461ffad8d80"),
    rating: 5,
    title: "Virei cliente fiel",
    comment:
      "Já é meu terceiro óculos da USE MERMO. Marca brasileira com cara de marca internacional. Recomendo demais!",
    date: "2026-04-21",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Bruno Tavares",
    avatar: portrait("1507003211169-0a1dd7228f2d"),
    rating: 4,
    title: "Excelente custo-benefício",
    comment:
      "Lentes polarizadas de verdade, fazem toda diferença ao dirigir. Só achei a entrega um pouquinho lenta para minha região.",
    date: "2026-04-08",
    verified: true,
  },
  {
    id: "rev-5",
    author: "Carla Nogueira",
    avatar: portrait("1534528741775-53994a69daeb"),
    rating: 5,
    title: "Apaixonada",
    comment:
      "O Aurora Gold é ainda mais lindo pessoalmente. A prova virtual no site me ajudou muito a escolher o formato.",
    date: "2026-03-29",
    verified: true,
  },
  {
    id: "rev-6",
    author: "Diego Santos",
    avatar: portrait("1506794778202-cad84cf45f1d"),
    rating: 5,
    title: "Padrão internacional",
    comment:
      "Site rápido, checkout simples no PIX e produto premium. Nota 10 do começo ao fim.",
    date: "2026-03-15",
    verified: true,
  },
];

// ---------------- Blog ----------------
const lorem = (title: string) => `
## ${title}

Na USE MERMO acreditamos que escolher um óculos vai muito além da estética — é sobre conforto, saúde visual e expressar quem você é.

### Por que isso importa

A exposição prolongada à luz solar sem proteção adequada pode causar danos cumulativos à visão. Lentes com proteção UV400 bloqueiam 100% dos raios UVA e UVB, preservando a saúde dos seus olhos a longo prazo.

> O cuidado com a visão é um investimento, não um gasto.

### Como escolher

1. **Formato do rosto** — equilibre os ângulos do seu rosto com o formato da armação.
2. **Material** — acetato para conforto, titânio para leveza, TR-90 para esportes.
3. **Proteção** — sempre verifique se há certificação UV400.

A combinação certa transforma um simples acessório em parte da sua identidade.
`;

export const blogPosts: BlogPost[] = [
  {
    slug: "como-escolher-oculos-formato-rosto",
    title: "Como escolher o óculos ideal para o formato do seu rosto",
    excerpt:
      "Redondo, quadrado, oval ou coração? Descubra qual armação valoriza os seus traços.",
    cover: wide("1556306535-0f09a537f0a3"),
    category: "Como Escolher",
    author: "Equipe USE MERMO",
    date: "2026-06-10",
    readingTime: 6,
    content: lorem("O formato do rosto define tudo"),
  },
  {
    slug: "protecao-uv-tudo-que-voce-precisa-saber",
    title: "Proteção UV: tudo o que você precisa saber",
    excerpt:
      "UVA, UVB, UV400 e luz azul. Entenda os termos e proteja a sua visão de verdade.",
    cover: wide("1511499767150-a48a237f0083"),
    category: "Saúde Visual",
    author: "Dra. Helena Vidal",
    date: "2026-05-28",
    readingTime: 8,
    content: lorem("A importância da proteção UV400"),
  },
  {
    slug: "tendencias-eyewear-2026",
    title: "Tendências de eyewear para 2026",
    excerpt:
      "Tons terrosos, formatos hexagonais e o retorno do aviador. O que vai dominar o ano.",
    cover: wide("1572635196237-14b3f281503f"),
    category: "Tendências",
    author: "Equipe USE MERMO",
    date: "2026-05-14",
    readingTime: 5,
    content: lorem("As tendências que vêm por aí"),
  },
  {
    slug: "lentes-tipos-e-tecnologias",
    title: "Lentes: tipos, tecnologias e qual escolher",
    excerpt:
      "Polarizada, fotossensível, antirreflexo. Um guia completo sobre tecnologia de lentes.",
    cover: wide("1577803645773-f96470509666"),
    category: "Lentes",
    author: "Equipe USE MERMO",
    date: "2026-04-30",
    readingTime: 7,
    content: lorem("Tecnologia por trás das lentes"),
  },
];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);

// ---------------- Instagram ----------------
export const instagramPosts: InstagramPost[] = [
  "1483985988355-763728e1935b",
  "1502767089025-6572583495c9",
  "1473496169904-658ba7c44d8a",
  "1508296695146-257a814070b4",
  "1620231150904-a86b9802656a",
  "1606760227091-3dd870d97f1d",
].map((id, i) => ({
  id: `ig-${i}`,
  image: square(id),
  likes: 320 + i * 47,
  href: "https://instagram.com/usemermo",
}));

// ---------------- FAQ ----------------
export const faq: FAQItem[] = [
  {
    question: "Os óculos têm garantia?",
    answer:
      "Sim. Todos os produtos USE MERMO possuem 12 meses de garantia contra defeitos de fabricação.",
  },
  {
    question: "Como funciona a prova virtual?",
    answer:
      "Você ativa a webcam ou envia uma selfie e nosso sistema sobrepõe o modelo escolhido no seu rosto em tempo real. A arquitetura já está preparada para reconhecimento facial por IA.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "Capitais: 2 a 4 dias úteis. Demais regiões: 4 a 8 dias úteis. Frete grátis acima de R$ 299.",
  },
  {
    question: "Posso colocar lentes de grau?",
    answer:
      "Sim. A maioria das armações aceita lentes de grau. Entre em contato pelo WhatsApp para orçamento.",
  },
  {
    question: "Quais as formas de pagamento?",
    answer:
      "PIX (com desconto), cartão de crédito em até 10x sem juros e boleto bancário.",
  },
  {
    question: "Como funciona a troca?",
    answer:
      "Você tem até 30 dias para solicitar a troca. O processo é simples e o primeiro frete de troca é por nossa conta.",
  },
];

// ---------------- Cupons ----------------
export const coupons: Coupon[] = [
  {
    code: "MERMO10",
    type: "percent",
    value: 10,
    description: "10% OFF na primeira compra",
  },
  {
    code: "FRETEGRATIS",
    type: "fixed",
    value: 0,
    description: "Frete grátis em qualquer pedido",
  },
  {
    code: "PREMIUM15",
    type: "percent",
    value: 15,
    description: "15% OFF na linha Premium",
    minPurchase: 990,
  },
];

export const findCoupon = (code: string) =>
  coupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());

// ---------------- Benefícios ----------------
export const benefits: Benefit[] = [
  {
    icon: "Truck",
    title: "Frete Grátis",
    description: "Acima de R$ 299 para todo o Brasil",
  },
  {
    icon: "ShieldCheck",
    title: "Garantia de 12 meses",
    description: "Contra defeitos de fabricação",
  },
  {
    icon: "CreditCard",
    title: "Até 10x sem juros",
    description: "Ou PIX com desconto exclusivo",
  },
  {
    icon: "RefreshCw",
    title: "Troca Fácil",
    description: "30 dias para trocar ou devolver",
  },
  {
    icon: "Headphones",
    title: "Atendimento Humanizado",
    description: "Especialistas prontos no WhatsApp",
  },
  {
    icon: "Zap",
    title: "Entrega Rápida",
    description: "Expedição em até 24h úteis",
  },
];
