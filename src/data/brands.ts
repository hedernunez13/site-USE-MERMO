import type { Brand } from "@/types";

// Marcas parceiras — preparado para adicionar novas facilmente.
export const brands: Brand[] = [
  { id: "ray-ban", name: "Ray-Ban", featured: true },
  { id: "oakley", name: "Oakley", featured: true },
  { id: "persol", name: "Persol", featured: true },
  { id: "vogue", name: "Vogue", featured: false },
  { id: "prada", name: "Prada", featured: true },
  { id: "carrera", name: "Carrera", featured: true },
  { id: "hb", name: "HB", featured: false },
  { id: "mormaii", name: "Mormaii", featured: false },
  { id: "police", name: "Police", featured: false },
  { id: "guess", name: "Guess", featured: false },
  { id: "calvin-klein", name: "Calvin Klein", featured: true },
  { id: "armani-exchange", name: "Armani Exchange", featured: false },
  { id: "emporio-armani", name: "Emporio Armani", featured: true },
  { id: "michael-kors", name: "Michael Kors", featured: false },
  { id: "chilli-beans", name: "Chilli Beans", featured: true },
];

export const brandNames = brands.map((b) => b.name);
