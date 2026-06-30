import type { Product } from "@/types";
import {
  products as mockProducts,
  getProductBySlug as mockGetBySlug,
} from "@/data/products";
import { isSupabaseEnabled } from "@/services/supabase";

/**
 * Serviço de produtos.
 *
 * Hoje retorna os mocks de `/src/data`. Quando o Supabase estiver ativo,
 * substitua o corpo destas funções por queries reais — a assinatura
 * (Promise<Product[]> etc.) já é compatível com React Query.
 */
export async function listProducts(): Promise<Product[]> {
  if (isSupabaseEnabled) {
    // return supabase.from("products").select("*").then(({ data }) => data ?? []);
  }
  return mockProducts;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  if (isSupabaseEnabled) {
    // return supabase.from("products").select("*").eq("slug", slug).single();
  }
  return mockGetBySlug(slug);
}
