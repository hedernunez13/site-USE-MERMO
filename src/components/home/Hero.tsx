import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden">
      {/* Imagem de fundo */}
      <motion.img
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1920&q=85"
        alt="Pessoa usando óculos premium USE MERMO"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/60" />

      {/* Conteúdo */}
      <div className="container-mermo relative z-10 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-5 text-[11px] font-semibold uppercase tracking-brand text-gold-soft"
        >
          Nova Coleção 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="display-title mx-auto max-w-4xl text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Enxergue o mundo com personalidade.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-balance text-sm leading-relaxed text-white/85 md:text-base"
        >
          Óculos premium desenvolvidos para quem valoriza estilo, conforto e
          autenticidade.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild size="lg" variant="gold">
            <Link to="/produtos">Comprar Agora</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="border-white/40 bg-transparent text-white hover:bg-white hover:text-ink"
            variant="outline"
          >
            <Link to="/produtos?categoria=lancamentos">Conheça a Coleção</Link>
          </Button>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <ChevronDown className="size-6" />
      </motion.div>
    </section>
  );
}
