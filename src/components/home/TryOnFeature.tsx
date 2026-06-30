import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, ScanFace, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Camera, label: "Ative a webcam" },
  { icon: Upload, label: "ou envie uma selfie" },
  { icon: ScanFace, label: "Ajuste automático do rosto" },
  { icon: Sparkles, label: "Experimente em segundos" },
];

export function TryOnFeature() {
  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="container-mermo grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 aspect-[4/3] overflow-hidden lg:order-1"
        >
          <img
            src="https://images.unsplash.com/photo-1620231150904-a86b9802656a?auto=format&fit=crop&w=1000&q=80"
            alt="Prova virtual de óculos USE MERMO"
            className="size-full object-cover"
          />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-widest backdrop-blur">
            <span className="size-2 animate-pulse rounded-full bg-cta" /> Powered by IA
          </div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <p className="eyebrow mb-3 text-gold-soft">Prova Virtual</p>
          <h2 className="display-title text-3xl md:text-5xl">
            Experimente antes de comprar.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
            Nossa tecnologia de prova virtual posiciona o óculos no seu rosto em
            tempo real. Troque de modelo com um clique e descubra qual combina
            mais com você — sem sair de casa.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {steps.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full border border-white/15">
                  <s.icon className="size-4 text-gold-soft" />
                </span>
                <span className="text-sm text-white/80">{s.label}</span>
              </div>
            ))}
          </div>

          <Button asChild size="lg" variant="gold" className="mt-10">
            <Link to="/virtual-try-on">Experimentar Agora</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
