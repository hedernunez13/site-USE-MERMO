import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseEnabled = Boolean(url && publishableKey);

/**
 * Cliente Supabase para o navegador. Usa a chave "publishable"/anon —
 * segura para expor no cliente desde que cada tabela tenha Row Level
 * Security (RLS) configurado corretamente (ver policies no Supabase).
 *
 * Sem autenticação de usuário por enquanto: este client é usado apenas
 * para operações públicas explicitamente liberadas via RLS (ex.: inserir
 * uma mensagem de contato).
 */
export const supabase = isSupabaseEnabled ? createClient(url, publishableKey) : null;
