import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formata um número como moeda brasileira (BRL). */
export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/** Calcula o valor de cada parcela sem juros. */
export function installments(price: number, count = 10): string {
  return formatBRL(price / count);
}

/** Valor com desconto PIX (padrão 8%). */
export function pixPrice(price: number, discount = 0.08): number {
  return price * (1 - discount);
}

/** Percentual de desconto entre preço cheio e preço atual. */
export function discountPercent(full: number, current: number): number {
  if (full <= current) return 0;
  return Math.round(((full - current) / full) * 100);
}

/** Cria um slug amigável para URLs. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
