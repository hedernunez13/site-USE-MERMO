import { cn } from "@/lib/utils";

/**
 * Símbolo oficial da USE MERMO — o "olho/lente".
 * Recriado em SVG (vetorial, nítido em qualquer tamanho).
 * As cores da marca são fixas para preservar a identidade visual.
 */
export function MermoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="USE MERMO"
    >
      {/* anel externo laranja */}
      <circle cx="50" cy="50" r="49" fill="#E94E2B" />
      {/* anel branco */}
      <circle cx="50" cy="50" r="35" fill="#FFFFFF" />
      {/* pupila laranja */}
      <circle cx="50" cy="50" r="26" fill="#E94E2B" />
      {/* brilho (crescente branco) */}
      <circle cx="45" cy="43" r="14" fill="#FFFFFF" />
      <circle cx="54" cy="49" r="14" fill="#E94E2B" />
    </svg>
  );
}

/**
 * Logotipo completo: símbolo + wordmark.
 * `tone` controla a cor do texto (a marca/olho é sempre laranja).
 */
export function Logo({
  className,
  wordmark = "USE MERMO",
  showWordmark = true,
  tone = "dark",
  markClassName,
  wordmarkClassName,
}: {
  className?: string;
  wordmark?: string;
  showWordmark?: boolean;
  tone?: "dark" | "light";
  markClassName?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <MermoMark className={cn("size-7", markClassName)} />
      {showWordmark && (
        <span
          className={cn(
            "font-sans text-lg font-light uppercase tracking-[0.32em] md:text-xl",
            tone === "light" ? "text-white" : "text-ink",
            wordmarkClassName,
          )}
        >
          {wordmark}
        </span>
      )}
    </span>
  );
}
