/**
 * Camada de analytics — GA4, Google Tag Manager e Meta Pixel.
 *
 * Os IDs são lidos do .env. Em produção, carregue os scripts no index.html
 * (ou via gerenciador de consentimento LGPD) e use `track()` para eventos.
 */

type EventName =
  | "view_item"
  | "add_to_cart"
  | "begin_checkout"
  | "purchase"
  | "search"
  | "sign_up";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: EventName, params: Record<string, unknown> = {}) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, params);
    return;
  }
  window.gtag?.("event", event, params);
  window.fbq?.("track", mapToMeta(event), params);
}

function mapToMeta(event: EventName): string {
  const map: Record<EventName, string> = {
    view_item: "ViewContent",
    add_to_cart: "AddToCart",
    begin_checkout: "InitiateCheckout",
    purchase: "Purchase",
    search: "Search",
    sign_up: "CompleteRegistration",
  };
  return map[event];
}
