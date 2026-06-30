import { Heart, Instagram } from "lucide-react";
import { instagramPosts } from "@/data/content";
import { SectionHeading } from "@/components/ui/reveal";

export function InstagramFeed() {
  return (
    <section className="container-mermo py-20 md:py-24">
      <SectionHeading
        align="center"
        eyebrow="@usemermo"
        title="Siga a USE MERMO"
        description="Inspiração diária no nosso Instagram. Marque #UseMermo e apareça aqui."
      />
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
        {instagramPosts.map((post) => (
          <a
            key={post.id}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <img
              src={post.image}
              alt="Post no Instagram da USE MERMO"
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-1.5 bg-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Heart className="size-4 fill-white text-white" />
              <span className="text-sm font-semibold text-white">
                {post.likes}
              </span>
            </div>
            <Instagram className="absolute right-2 top-2 size-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </section>
  );
}
