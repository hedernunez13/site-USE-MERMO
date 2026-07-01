import type { Product } from "@/types";
import { slugify } from "@/lib/utils";

// Imagens reais dos produtos MERMO (em /public/images/produtos).
const img = (file: string) => `/images/produtos/${file}`;

type Seed = Omit<Product, "id" | "slug" | "images" | "specs" | "tryOnImage"> & {
  image: string;
};

const seeds: Seed[] = [
  {
    name: "Trilha Pro",
    brand: "USE MERMO",
    categories: ["oculos-solar", "esportivo", "masculino", "lancamentos"],
    gender: "unissex",
    shape: "Retangular",
    material: "TR-90",
    colors: [
      { name: "Preto / Verde", hex: "#173d2b" },
      { name: "Preto", hex: "#111111" },
    ],
    size: "G",
    uvProtection: true,
    price: 289.9,
    compareAtPrice: 379,
    rating: 4.9,
    reviewsCount: 198,
    stock: 26,
    isNew: true,
    isBestSeller: true,
    description:
      "Wrap esportivo de alta performance com lentes espelhadas verde/azul e proteção UV400. Leveza em TR-90, pegada firme e estilo que acompanha cada movimento.",
    image: "esportivo-verde.jpg",
  },
  {
    name: "Redondo Rubi",
    brand: "USE MERMO",
    categories: ["oculos-solar", "premium", "lancamentos", "feminino"],
    gender: "unissex",
    shape: "Redondo",
    material: "TR-90",
    colors: [
      { name: "Preto Fosco", hex: "#1a1a1a" },
      { name: "Vermelho Espelhado", hex: "#c0392b" },
    ],
    size: "M",
    uvProtection: true,
    price: 249.9,
    compareAtPrice: 329,
    rating: 4.8,
    reviewsCount: 142,
    stock: 19,
    isNew: true,
    isBestSeller: true,
    description:
      "Redondo com ponte dupla e lentes espelhadas vermelho fogo. Um statement retrô-moderno em acetato fosco que combina atitude e exclusividade.",
    image: "redondo-vermelho.jpg",
  },
  {
    name: "Urbano Cristal",
    brand: "USE MERMO",
    categories: ["oculos-solar", "oculos-de-grau", "masculino", "feminino"],
    gender: "unissex",
    shape: "Quadrado",
    material: "Acetato",
    colors: [{ name: "Cristal Fumê", hex: "#8a8a92" }],
    size: "M",
    uvProtection: true,
    price: 269.9,
    compareAtPrice: 349,
    rating: 4.7,
    reviewsCount: 96,
    stock: 22,
    isNew: false,
    isBestSeller: true,
    description:
      "Transparência sofisticada em acetato cristal cinza com lentes fumê. Linhas quadradas e contemporâneas para um visual urbano e elegante.",
    image: "quadrado-cinza.jpg",
  },
  {
    name: "Costa Sport",
    brand: "USE MERMO",
    categories: ["oculos-solar", "esportivo", "masculino"],
    gender: "masculino",
    shape: "Retangular",
    material: "TR-90",
    colors: [{ name: "Preto Fosco", hex: "#1a1a1a" }],
    size: "G",
    uvProtection: true,
    price: 229.9,
    compareAtPrice: 299,
    rating: 4.8,
    reviewsCount: 213,
    stock: 31,
    isNew: false,
    isBestSeller: true,
    description:
      "Retangular esportivo com lentes G15 verde e armação emborrachada. Conforto o dia inteiro e a resistência que o seu ritmo exige.",
    image: "retangular-preto.jpg",
  },
  {
    name: "Retrô Amber",
    brand: "USE MERMO",
    categories: ["oculos-solar", "lancamentos", "premium"],
    gender: "unissex",
    shape: "Aviador",
    material: "Injetado",
    colors: [{ name: "Preto / Âmbar", hex: "#c4763a" }],
    size: "M",
    uvProtection: true,
    price: 259.9,
    compareAtPrice: 339,
    rating: 4.9,
    reviewsCount: 88,
    stock: 17,
    isNew: true,
    isBestSeller: false,
    description:
      "Aviador de ponte dupla com lentes âmbar translúcidas — inspiração setentista com leitura moderna. Para quem gosta de chamar atenção pelos detalhes.",
    image: "aviador-amarelo.jpg",
  },
  {
    name: "Clássico Smoke",
    brand: "USE MERMO",
    categories: ["oculos-solar", "masculino"],
    gender: "masculino",
    shape: "Wayfarer",
    material: "Acetato",
    colors: [{ name: "Cristal Fumê", hex: "#6f6f74" }],
    size: "M",
    uvProtection: true,
    price: 239.9,
    rating: 4.7,
    reviewsCount: 124,
    stock: 28,
    isNew: false,
    isBestSeller: false,
    description:
      "O wayfarer atemporal em acetato cristal fumê com hastes tartaruga. Um clássico que nunca sai de moda e combina com tudo.",
    image: "wayfarer-fume.jpg",
  },
  {
    name: "Atelier Tartaruga",
    brand: "USE MERMO",
    categories: ["oculos-solar", "feminino", "premium", "lancamentos"],
    gender: "feminino",
    shape: "Redondo",
    material: "Acetato",
    colors: [{ name: "Tartaruga", hex: "#6b4a2b" }],
    size: "M",
    uvProtection: true,
    price: 279.9,
    compareAtPrice: 359,
    rating: 4.9,
    reviewsCount: 167,
    stock: 21,
    isNew: true,
    isBestSeller: true,
    description:
      "Redondo em acetato tartaruga com lentes degradê marrom. Delicado, sofisticado e absolutamente fotogênico — o queridinho da coleção.",
    image: "redondo-tartaruga.jpg",
  },
];

export const products: Product[] = seeds.map((s, i) => {
  const { image, ...rest } = s;
  const url = img(image);
  return {
    ...rest,
    id: `prod-${String(i + 1).padStart(3, "0")}`,
    slug: slugify(s.name),
    images: [
      { url, alt: `${s.name} — USE MERMO` },
      { url, alt: `${s.name} — USE MERMO` },
    ],
    tryOnImage: url,
    specs: {
      Marca: s.brand,
      Formato: s.shape,
      Material: s.material,
      Tamanho: s.size,
      "Proteção UV": s.uvProtection ? "UV400" : "Não aplicável",
      Gênero: s.gender,
      Garantia: "12 meses",
      Lentes: s.uvProtection ? "Polarizadas / Categoria 3" : "Antirreflexo",
    },
  };
});

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const bestSellers = products.filter((p) => p.isBestSeller);
export const newArrivals = products.filter((p) => p.isNew);

export const relatedProducts = (product: Product, limit = 4) =>
  products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.categories.some((c) => product.categories.includes(c)),
    )
    .slice(0, limit);
