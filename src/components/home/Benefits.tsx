import {
  CreditCard,
  Headphones,
  RefreshCw,
  ShieldCheck,
  Truck,
  Zap,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { benefits } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";

// Mapa explícito evita importar toda a biblioteca de ícones no bundle.
const ICONS: Record<string, LucideIcon> = {
  Truck,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  Headphones,
  Zap,
};

export function Benefits() {
  return (
    <section className="container-mermo py-16 md:py-20">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
        {benefits.map((b, i) => {
          const Icon = ICONS[b.icon] ?? Sparkles;
          return (
            <Reveal key={b.title} delay={i}>
              <div className="flex flex-col items-center text-center">
                <Icon className="size-7 text-gold" strokeWidth={1.4} />
                <h3 className="mt-4 text-sm font-semibold tracking-wide text-ink">
                  {b.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-mid">
                  {b.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
