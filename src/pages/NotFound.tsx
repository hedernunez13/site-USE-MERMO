import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

export default function NotFound() {
  useSEO({ title: "Página não encontrada" });
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-4">Erro 404</p>
      <h1 className="display-title text-5xl md:text-7xl">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-sm text-gray-mid">
        O link que você seguiu pode estar quebrado ou a página foi removida.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link to="/">Voltar ao início</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/produtos">Ver coleção</Link>
        </Button>
      </div>
    </div>
  );
}
