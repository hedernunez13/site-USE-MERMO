export interface ShippingQuote {
  carrier: string;
  service: string;
  price: number;
  deadlineDays: number;
}

/**
 * Cotação de frete por CEP.
 *
 * Integração real: Melhor Envio (`/api/v2/me/shipment/calculate`) ou Frenet.
 * Chame a partir de um backend para proteger o token.
 */
export async function quoteShipping(
  cep: string,
  subtotal: number,
): Promise<ShippingQuote[]> {
  // Frete grátis acima de R$ 299 (regra da loja).
  const base = subtotal >= 299 ? 0 : 29.9;
  void cep;
  return [
    { carrier: "Correios", service: "SEDEX", price: base, deadlineDays: 3 },
    { carrier: "Correios", service: "PAC", price: base === 0 ? 0 : 19.9, deadlineDays: 7 },
  ];
}
