/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_STRIPE_PUBLIC_KEY: string;
  readonly VITE_MERCADOPAGO_PUBLIC_KEY: string;
  readonly VITE_GOOGLE_MAPS_KEY: string;
  readonly VITE_GA4_ID: string;
  readonly VITE_META_PIXEL_ID: string;
  readonly VITE_WHATSAPP_NUMBER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
