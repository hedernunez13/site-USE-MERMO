import type { Customer, Order } from "@/types";

export const currentUser: Customer = {
  id: "user-1",
  name: "Heder Nunez",
  email: "hedernunez13@gmail.com",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  since: "2024-02-10",
  orders: 5,
};

export const orders: Order[] = [
  {
    id: "MM-2026-0312",
    date: "2026-06-18",
    status: "enviado",
    total: 1439.8,
    items: [
      {
        name: "Imperial Black",
        qty: 1,
        price: 1490,
        image:
          "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
  {
    id: "MM-2026-0287",
    date: "2026-05-30",
    status: "entregue",
    total: 749.9,
    items: [
      {
        name: "Aurora Gold",
        qty: 1,
        price: 749.9,
        image:
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
  {
    id: "MM-2026-0190",
    date: "2026-04-12",
    status: "entregue",
    total: 1149.8,
    items: [
      {
        name: "Voo Aviador",
        qty: 1,
        price: 899.9,
        image:
          "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=200&q=80",
      },
    ],
  },
];

export const addresses = [
  {
    id: "addr-1",
    label: "Casa",
    line: "Av. Tancredo Neves, 2227 — Apt 1204",
    city: "Salvador, BA",
    cep: "41820-021",
    main: true,
  },
];

export const cards = [
  { id: "card-1", brand: "Visa", last4: "4242", exp: "12/28", main: true },
];

// ---------------- Dados agregados para o admin ----------------
export const adminCustomers: Customer[] = [
  currentUser,
  {
    id: "user-2",
    name: "Marina Costa",
    email: "marina@email.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    since: "2025-08-01",
    orders: 3,
  },
  {
    id: "user-3",
    name: "Rafael Mendes",
    email: "rafael@email.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    since: "2025-11-20",
    orders: 7,
  },
];

export const adminOrders: Order[] = [
  ...orders,
  {
    id: "MM-2026-0315",
    date: "2026-06-29",
    status: "processando",
    total: 689.9,
    items: [{ name: "Eclipse Carbon", qty: 1, price: 689.9, image: "" }],
  },
  {
    id: "MM-2026-0314",
    date: "2026-06-28",
    status: "processando",
    total: 459.9,
    items: [{ name: "Costa Polarizado", qty: 1, price: 459.9, image: "" }],
  },
];
