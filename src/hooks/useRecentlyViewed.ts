import { useEffect, useState } from "react";
import { products } from "@/data/products";
import type { Product } from "@/types";

const KEY = "mermo.recently-viewed";

export function useRecentlyViewed(currentId?: string) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const stored: string[] = raw ? JSON.parse(raw) : [];
      setIds(stored.filter((id) => id !== currentId));
      if (currentId) {
        const next = [currentId, ...stored.filter((id) => id !== currentId)].slice(0, 8);
        localStorage.setItem(KEY, JSON.stringify(next));
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);

  const items: Product[] = ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return items;
}
