import { useEffect } from "react";

interface SEOOptions {
  title: string;
  description?: string;
  image?: string;
}

/** Atualiza title e meta tags básicas. Em produção, considere react-helmet-async / SSR. */
export function useSEO({ title, description, image }: SEOOptions) {
  useEffect(() => {
    const fullTitle = title.includes("USE MERMO")
      ? title
      : `${title} | USE MERMO`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, value?: string) => {
      if (!value) return;
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [key, val] = selector.replace(/meta\[|\]/g, "").split("=");
        el.setAttribute(key, val.replace(/['"]/g, ""));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", image);
  }, [title, description, image]);
}
