import { supabase } from "@/services/supabase";

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Envia uma mensagem do formulário de contato para a tabela
 * `contact_messages` no Supabase. Não requer autenticação — a tabela tem
 * RLS liberando apenas INSERT para o papel `anon` (sem leitura/edição
 * pública), então este client nunca consegue listar mensagens de volta.
 */
export async function submitContactForm(data: ContactSubmission): Promise<void> {
  if (!supabase) {
    throw new Error(
      "Supabase não está configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no .env.",
    );
  }

  const { error } = await supabase.from("contact_messages").insert({
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
  });

  if (error) {
    throw new Error(error.message);
  }
}
