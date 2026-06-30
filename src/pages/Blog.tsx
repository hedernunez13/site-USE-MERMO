import { Link } from "react-router-dom";
import { blogPosts } from "@/data/content";
import { Reveal } from "@/components/ui/reveal";
import { useSEO } from "@/hooks/useSEO";

export default function Blog() {
  useSEO({
    title: "Blog — Moda, Lentes e Saúde Visual",
    description: "Dicas sobre óculos, proteção UV, tendências e como escolher o modelo ideal.",
  });

  const [featured, ...rest] = blogPosts;

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-mermo py-10">
        <header className="mb-12 text-center">
          <p className="eyebrow mb-3">Diário USE MERMO</p>
          <h1 className="display-title text-4xl md:text-6xl">Blog</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-mid">
            Moda, tecnologia de lentes, saúde visual e tudo sobre o universo dos óculos.
          </p>
        </header>

        {/* Destaque */}
        <Reveal>
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid gap-6 overflow-hidden md:grid-cols-2"
          >
            <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
              <img
                src={featured.cover}
                alt={featured.title}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow mb-3">{featured.category}</p>
              <h2 className="display-title text-3xl md:text-4xl">{featured.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-mid">
                {featured.excerpt}
              </p>
              <p className="mt-6 text-xs uppercase tracking-widest text-gray-mid">
                {featured.author} · {featured.readingTime} min de leitura
              </p>
            </div>
          </Link>
        </Reveal>

        {/* Grid */}
        <div className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i}>
              <Link to={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-4">{post.category}</p>
                <h3 className="mt-2 font-serif text-xl leading-tight group-hover:text-gold">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-mid">{post.excerpt}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-gray-mid">
                  {post.readingTime} min · {new Date(post.date).toLocaleDateString("pt-BR")}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
