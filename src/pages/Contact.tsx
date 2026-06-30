import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { useSEO } from "@/hooks/useSEO";

const schema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  message: z.string().min(10, "Escreva uma mensagem com pelo menos 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useSEO({
    title: "Contato — Fale com a USE MERMO",
    description: "Entre em contato com a USE MERMO por formulário, WhatsApp ou redes sociais.",
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 700)); // TODO: integrar com API.
    console.log("Contato enviado:", data);
    toast("Mensagem enviada! Responderemos em breve.");
    reset();
  };

  const Field = ({
    label,
    name,
    type = "text",
    textarea,
  }: {
    label: string;
    name: keyof FormData;
    type?: string;
    textarea?: boolean;
  }) => (
    <div>
      <label className="mb-1 block text-xs uppercase tracking-widest text-gray-dark">
        {label}
      </label>
      {textarea ? (
        <Textarea {...register(name)} />
      ) : (
        <Input type={type} {...register(name)} />
      )}
      {errors[name] && (
        <p className="mt-1 text-xs text-destructive">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-mermo py-10">
        <header className="mb-12 text-center">
          <p className="eyebrow mb-3">Estamos aqui por você</p>
          <h1 className="display-title text-4xl md:text-6xl">Fale Conosco</h1>
        </header>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Field label="Nome completo" name="name" />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="E-mail" name="email" type="email" />
              <Field label="Telefone" name="phone" type="tel" />
            </div>
            <Field label="Mensagem" name="message" textarea />
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </Button>
          </form>

          {/* Informações + mapa */}
          <div>
            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Endereço", value: "Av. Tancredo Neves, 2227 — Salvador, BA" },
                { icon: Phone, label: "Telefone / WhatsApp", value: "(71) 99999-9999" },
                { icon: Mail, label: "E-mail", value: "contato@usemermo.com.br" },
                { icon: Clock, label: "Atendimento", value: "Seg a Sex, 9h às 18h · Sáb, 9h às 13h" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/15">
                    <item.icon className="size-4 text-gold" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-mid">{item.label}</p>
                    <p className="text-sm text-ink">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Rede social"
                  className="flex size-11 items-center justify-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>

            {/* Google Maps (preparado para integração) */}
            <div className="mt-8 aspect-[16/10] overflow-hidden rounded-md border border-border">
              <iframe
                title="Localização USE MERMO"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-38.48%2C-12.99%2C-38.44%2C-12.97&layer=mapnik"
                className="size-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
