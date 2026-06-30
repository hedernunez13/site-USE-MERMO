import { motion } from "framer-motion";
import { Eye, Gem, Heart, Leaf } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui/reveal";
import { useSEO } from "@/hooks/useSEO";

const values = [
  { icon: Gem, title: "Qualidade Premium", text: "Materiais nobres e acabamento impecável em cada peça." },
  { icon: Heart, title: "Conforto Real", text: "Ergonomia pensada para o uso o dia inteiro." },
  { icon: Eye, title: "Saúde Visual", text: "Proteção UV400 e lentes de alta tecnologia." },
  { icon: Leaf, title: "Responsabilidade", text: "Embalagens sustentáveis e produção consciente." },
];

const timeline = [
  { year: "2019", title: "O começo", text: "Nasce a USE MERMO em Salvador, com a missão de democratizar o óculos premium." },
  { year: "2021", title: "Primeira loja", text: "Inauguramos nosso primeiro showroom físico." },
  { year: "2023", title: "Expansão nacional", text: "Passamos a entregar para todo o Brasil com loja online." },
  { year: "2026", title: "Prova virtual com IA", text: "Lançamos a tecnologia de prova virtual com inteligência artificial." },
];

const team = [
  { name: "Heder Nunez", role: "Fundador & CEO", img: "1500648767791-00dcc994a43e" },
  { name: "Marina Costa", role: "Diretora de Design", img: "1494790108377-be9c29b29330" },
  { name: "Rafael Mendes", role: "Head de Tecnologia", img: "1507003211169-0a1dd7228f2d" },
  { name: "Júlia Andrade", role: "Atendimento", img: "1438761681033-6461ffad8d80" },
];

export default function About() {
  useSEO({
    title: "Sobre Nós — Nossa História",
    description: "Conheça a história, missão e valores da USE MERMO.",
  });

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative flex h-[60svh] min-h-[400px] items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80"
          alt="USE MERMO"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="container-mermo relative z-10 text-center text-white"
        >
          <p className="eyebrow mb-4 text-gold-soft">Nossa História</p>
          <h1 className="display-title text-4xl md:text-6xl">
            Vendemos mais do que óculos.<br />Vendemos identidade.
          </h1>
        </motion.div>
      </section>

      {/* Missão */}
      <section className="container-mermo grid gap-10 py-20 md:grid-cols-2 md:py-28">
        <Reveal>
          <p className="eyebrow mb-4">Quem somos</p>
          <h2 className="display-title text-3xl md:text-4xl">
            Uma marca brasileira com alma global.
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="space-y-5 text-sm leading-relaxed text-gray-dark md:text-base">
            <p>
              A USE MERMO une moda, tecnologia, conforto e personalidade. Cada
              modelo é desenhado para transmitir estilo próprio, qualidade
              premium e a confiança de quem sabe o que quer.
            </p>
            <p>
              Acreditamos que um óculos é muito mais que um acessório — é uma
              extensão de quem você é. Por isso, cuidamos de cada detalhe, do
              acetato italiano às lentes com proteção total.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                { n: "12k+", l: "Clientes" },
                { n: "4.9", l: "Avaliação média" },
                { n: "50+", l: "Modelos" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-serif text-3xl text-ink">{s.n}</p>
                  <p className="text-xs uppercase tracking-widest text-gray-mid">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Valores */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="container-mermo">
          <SectionHeading align="center" eyebrow="No que acreditamos" title="Nossos Valores" />
          <div className="grid gap-8 md:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i}>
                <div className="text-center">
                  <v.icon className="mx-auto size-8 text-gold" strokeWidth={1.3} />
                  <h3 className="mt-4 font-serif text-xl">{v.title}</h3>
                  <p className="mt-2 text-sm text-gray-mid">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Linha do tempo */}
      <section className="container-mermo py-20 md:py-28">
        <SectionHeading align="center" eyebrow="Nossa jornada" title="Linha do Tempo" />
        <div className="mx-auto max-w-2xl">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i}>
              <div className="flex gap-6 border-l-2 border-border pb-10 pl-8 last:pb-0 relative">
                <span className="absolute -left-[7px] top-1 size-3 rounded-full bg-gold" />
                <div>
                  <p className="font-serif text-2xl text-gold">{t.year}</p>
                  <h3 className="mt-1 font-semibold text-ink">{t.title}</h3>
                  <p className="mt-1 text-sm text-gray-mid">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Equipe */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="container-mermo">
          <SectionHeading align="center" eyebrow="Gente que faz acontecer" title="Nossa Equipe" />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i}>
                <div className="text-center">
                  <div className="aspect-square overflow-hidden rounded-full">
                    <img
                      src={`https://images.unsplash.com/photo-${m.img}?auto=format&fit=crop&w=400&q=80`}
                      alt={m.name}
                      className="size-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-lg">{m.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-gray-mid">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
