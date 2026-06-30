import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductRail } from "@/components/home/ProductRail";
import { BrandStrip } from "@/components/home/BrandStrip";
import { TryOnFeature } from "@/components/home/TryOnFeature";
import { Benefits } from "@/components/home/Benefits";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { Newsletter } from "@/components/home/Newsletter";
import { bestSellers, newArrivals } from "@/data/products";
import { useSEO } from "@/hooks/useSEO";

export default function Home() {
  useSEO({
    title: "USE MERMO — Óculos Premium | Seu estilo. Sua visão.",
    description:
      "Óculos premium brasileiros que unem moda, tecnologia, conforto e personalidade. Grau, solar, esportivo e infantil com prova virtual.",
  });

  return (
    <>
      <Hero />
      <CategoryGrid />
      <ProductRail
        eyebrow="Os queridinhos"
        title="Mais Vendidos"
        description="Os modelos que conquistaram o Brasil."
        products={bestSellers}
        to="/produtos?ordenar=mais-vendidos"
      />
      <BrandStrip />
      <ProductRail
        eyebrow="Acabou de chegar"
        title="Novidades"
        description="As novas peças da coleção 2026."
        products={newArrivals}
        variant="slider"
        to="/produtos?categoria=lancamentos"
      />
      <TryOnFeature />
      <Benefits />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
