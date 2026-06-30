// ============================================================
// USE MERMO — Tipos centrais do domínio
// ============================================================

export type Gender = "masculino" | "feminino" | "unissex" | "infantil";

export type CategorySlug =
  | "oculos-de-grau"
  | "oculos-solar"
  | "masculino"
  | "feminino"
  | "infantil"
  | "premium"
  | "esportivo"
  | "lancamentos";

export type ProductShape =
  | "Aviador"
  | "Quadrado"
  | "Redondo"
  | "Gatinho"
  | "Retangular"
  | "Hexagonal"
  | "Wayfarer";

export type ProductMaterial =
  | "Acetato"
  | "Metal"
  | "Titânio"
  | "TR-90"
  | "Alumínio"
  | "Injetado";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categories: CategorySlug[];
  gender: Gender;
  shape: ProductShape;
  material: ProductMaterial;
  colors: ProductColor[];
  size: "P" | "M" | "G";
  uvProtection: boolean;
  price: number;
  /** Preço cheio (antes do desconto) — opcional. */
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  isNew: boolean;
  isBestSeller: boolean;
  images: ProductImage[];
  description: string;
  specs: Record<string, string>;
  /** Imagem transparente do óculos para prova virtual. */
  tryOnImage?: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  featured: boolean;
}

export interface Review {
  id: string;
  productId?: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  author: string;
  date: string;
  readingTime: number;
  content: string;
}

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  description: string;
  minPurchase?: number;
}

export interface Order {
  id: string;
  date: string;
  status: "processando" | "enviado" | "entregue" | "cancelado";
  total: number;
  items: { name: string; qty: number; price: number; image: string }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  since: string;
  orders: number;
}

export interface CartItem {
  product: Product;
  color: ProductColor;
  quantity: number;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  href: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
