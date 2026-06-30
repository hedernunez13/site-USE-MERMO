# Camada de Serviços

Esta pasta isola toda a comunicação com APIs externas. Hoje os dados vêm de
`/src/data` (mock). Para ir a produção, troque a implementação interna de cada
serviço **sem alterar os componentes** que os consomem.

| Arquivo | Responsabilidade | Integração futura |
|---|---|---|
| `supabase.ts` | Cliente do banco/auth | Supabase |
| `products.service.ts` | CRUD de produtos | Supabase / API própria |
| `payments.service.ts` | Pagamentos | Stripe · Mercado Pago · PagSeguro |
| `shipping.service.ts` | Cálculo de frete | Melhor Envio · Frenet |
| `analytics.ts` | Eventos e tracking | GA4 · GTM · Meta Pixel |

> Padrão recomendado: cada serviço expõe funções assíncronas que retornam os
> tipos de `/src/types`, permitindo plugar React Query nos componentes.
