import { MermoMark } from "@/components/ui/Logo";

/**
 * Fallback de carregamento para páginas lazy-loaded.
 *
 * Usado dentro do <Suspense> do Layout (envolvendo só o <Outlet />) para que
 * a Navbar e o menu mobile nunca sejam suspensos/remontados durante o
 * carregamento de uma rota nova — isso evitava que o AnimatePresence do
 * drawer mobile ficasse "preso" no meio da animação de fechar.
 */
export function PageFallback() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <MermoMark className="size-12 animate-pulse" />
        <span className="font-sans text-lg font-light uppercase tracking-[0.32em] text-ink">
          USE MERMO
        </span>
      </div>
    </div>
  );
}
