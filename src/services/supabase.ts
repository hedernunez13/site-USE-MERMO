/**
 * Cliente Supabase — preparado, porém inativo por padrão.
 *
 * Para ativar:
 *   1. npm install @supabase/supabase-js
 *   2. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env
 *   3. Descomente o bloco abaixo.
 */

// import { createClient } from "@supabase/supabase-js";
//
// export const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY,
// );

export const isSupabaseEnabled = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const supabase = null;
