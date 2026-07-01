import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Coleções",
    links: [
      { label: "Óculos de Grau", to: "/produtos?categoria=oculos-de-grau" },
      { label: "Óculos Solar", to: "/produtos?categoria=oculos-solar" },
      { label: "Premium", to: "/produtos?categoria=premium" },
      { label: "Esportivo", to: "/produtos?categoria=esportivo" },
      { label: "Lançamentos", to: "/produtos?categoria=lancamentos" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre Nós", to: "/sobre" },
      { label: "Blog", to: "/blog" },
      { label: "Prova Virtual", to: "/virtual-try-on" },
      { label: "Contato", to: "/contato" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Minha Conta", to: "/conta" },
      { label: "Trocas e Devoluções", to: "/contato" },
      { label: "Política de Privacidade", to: "/contato" },
      { label: "Termos de Uso", to: "/contato" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-offwhite">
      <div className="container-mermo grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo markClassName="size-8" wordmarkClassName="text-xl" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-mid">
            Seu estilo. Sua visão. Use Mermo. Óculos premium brasileiros que unem
            moda, tecnologia, conforto e personalidade.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Phone].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Rede social"
                className="flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="eyebrow mb-5">{col.title}</p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="link-underline text-sm text-gray-dark hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-mermo flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left">
          <p className="text-xs text-gray-mid">
            © {new Date().getFullYear()} USE MERMO. Todos os direitos reservados.
            CNPJ 00.000.000/0001-00
          </p>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-gray-mid">
            <span>PIX</span>
            <span>·</span>
            <span>Visa</span>
            <span>·</span>
            <span>Master</span>
            <span>·</span>
            <span>Boleto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
