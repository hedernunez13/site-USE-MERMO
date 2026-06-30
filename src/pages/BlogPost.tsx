import { Link, useParams } from "react-router-dom";
import { Facebook, Link2, Twitter } from "lucide-react";
import { getPostBySlug, blogPosts } from "@/data/content";
import { useSEO } from "@/hooks/useSEO";
import NotFound from "@/pages/NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug ?? "");
  useSEO({
    title: post?.title ?? "Artigo",
    description: post?.excerpt,
    image: post?.cover,
  });

  if (!post) return <NotFound />;

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Render simples de markdown (títulos, citações, listas, parágrafos).
  const blocks = post.content.trim().split("\n\n");

  return (
    <article className="pt-24 md:pt-32">
      <div className="container-mermo max-w-3xl py-10">
        <nav className="mb-6 text-xs text-gray-mid">
          <Link to="/blog" className="hover:text-ink">Blog</Link>
          <span> / {post.category}</span>
        </nav>

        <p className="eyebrow mb-3">{post.category}</p>
        <h1 className="display-title text-3xl md:text-5xl">{post.title}</h1>
        <div className="mt-5 flex items-center gap-4 border-b border-border pb-6 text-xs uppercase tracking-widest text-gray-mid">
          <span>{post.author}</span>
          <span>·</span>
          <span>{new Date(post.date).toLocaleDateString("pt-BR")}</span>
          <span>·</span>
          <span>{post.readingTime} min de leitura</span>
        </div>

        <img
          src={post.cover}
          alt={post.title}
          className="my-8 aspect-[16/9] w-full rounded-md object-cover"
        />

        <div className="prose-mermo space-y-5 text-[15px] leading-relaxed text-gray-dark">
          {blocks.map((block, i) => {
            if (block.startsWith("## "))
              return (
                <h2 key={i} className="font-serif text-2xl text-ink">
                  {block.replace("## ", "")}
                </h2>
              );
            if (block.startsWith("### "))
              return (
                <h3 key={i} className="font-serif text-xl text-ink">
                  {block.replace("### ", "")}
                </h3>
              );
            if (block.startsWith("> "))
              return (
                <blockquote
                  key={i}
                  className="border-l-2 border-gold pl-5 font-serif text-xl italic text-ink"
                >
                  {block.replace("> ", "")}
                </blockquote>
              );
            if (/^\d\./.test(block.trim()))
              return (
                <ol key={i} className="list-decimal space-y-2 pl-5">
                  {block.split("\n").map((li, j) => (
                    <li key={j}>{li.replace(/^\d\.\s*/, "").replace(/\*\*/g, "")}</li>
                  ))}
                </ol>
              );
            return <p key={i}>{block.replace(/\*\*/g, "")}</p>;
          })}
        </div>

        {/* Compartilhar */}
        <div className="mt-12 flex items-center gap-3 border-y border-border py-6">
          <span className="text-xs uppercase tracking-widest text-gray-mid">
            Compartilhar
          </span>
          {[Twitter, Facebook, Link2].map((Icon, i) => (
            <button
              key={i}
              className="flex size-9 items-center justify-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-white"
              aria-label="Compartilhar"
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>

        {/* Comentários (placeholder) */}
        <div className="mt-10">
          <h3 className="font-serif text-xl">Comentários</h3>
          <textarea
            placeholder="Deixe seu comentário..."
            className="mt-4 min-h-[100px] w-full border-b border-ink/15 bg-transparent py-2 text-sm outline-none focus:border-ink"
          />
        </div>
      </div>

      {/* Mais artigos */}
      <div className="border-t border-border bg-offwhite py-16">
        <div className="container-mermo">
          <h3 className="mb-8 font-serif text-2xl">Continue lendo</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {more.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-3">{p.category}</p>
                <h4 className="mt-1 font-serif text-lg leading-tight">{p.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
