import type { CartItem } from "@/types";

export type PaymentMethod = "pix" | "card" | "boleto";
export type PaymentProvider = "stripe" | "mercadopago" | "pagseguro";

export interface CheckoutSession {
  id: string;
  url?: string;
  qrCode?: string;
  status: "pending" | "paid" | "failed";
}

/**
 * Cria uma sessão de checkout.
 *
 * Implementação real (exemplos):
 *  - Stripe:        POST /api/stripe/create-session (Checkout Sessions)
 *  - Mercado Pago:  POST /api/mercadopago/preferences
 *  - PagSeguro:     POST /api/pagseguro/orders
 *
 * O ideal é que a criação aconteça no backend (Edge Function do Supabase),
 * nunca expondo chaves secretas no cliente.
 */
export async function createCheckoutSession(
  items: CartItem[],
  method: PaymentMethod,
  _provider: PaymentProvider = "mercadopago",
): Promise<CheckoutSession> {
  const amount = items.reduce((a, i) => a + i.product.price * i.quantity, 0);
  // TODO: chamar backend e retornar a sessão real.
  return {
    id: `session_${Date.now()}`,
    status: "pending",
    qrCode: method === "pix" ? "00020126..." : undefined,
  };
  void amount;
}
