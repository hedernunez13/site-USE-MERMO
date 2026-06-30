import type { Category } from "@/types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

export const categories: Category[] = [
  {
    slug: "oculos-de-grau",
    name: "Óculos de Grau",
    description: "Visão nítida com design autoral.",
    image: img("1574258495973-f010dfbb5371"),
  },
  {
    slug: "oculos-solar",
    name: "Óculos Solar",
    description: "Proteção UV400 com atitude.",
    image: img("1511499767150-a48a237f0083"),
  },
  {
    slug: "masculino",
    name: "Masculino",
    description: "Linhas marcantes e presença.",
    image: img("1488161628813-04466f872be2"),
  },
  {
    slug: "feminino",
    name: "Feminino",
    description: "Elegância em cada detalhe.",
    image: img("1517841905240-472988babdf9"),
  },
  {
    slug: "infantil",
    name: "Infantil",
    description: "Conforto e segurança para os pequenos.",
    image: img("1503454537195-1dcabb73ffb9"),
  },
  {
    slug: "premium",
    name: "Premium",
    description: "Edição limitada. Materiais nobres.",
    image: img("1577803645773-f96470509666"),
  },
  {
    slug: "esportivo",
    name: "Esportivo",
    description: "Performance que acompanha o movimento.",
    image: img("1530541930197-ff16ac917b0e"),
  },
  {
    slug: "lancamentos",
    name: "Lançamentos",
    description: "O que há de mais novo na USE MERMO.",
    image: img("1572635196237-14b3f281503f"),
  },
];

export const categoryBySlug = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);
