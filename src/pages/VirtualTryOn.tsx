import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  ImageUp,
  Minus,
  Plus,
  RotateCcw,
  ScanFace,
  ShoppingBag,
  X,
} from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { cn, formatBRL } from "@/lib/utils";

const MIN_SCALE = 0.5;
const MAX_SCALE = 2;
const SCALE_STEP = 0.1;
const clampScale = (value: number) =>
  Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(value.toFixed(2))));

/**
 * Prova Virtual — arquitetura preparada para IA.
 *
 * Esta tela já estrutura webcam, upload de selfie, seleção de modelo e
 * sobreposição do óculos. O posicionamento facial por IA (face landmarks)
 * pode ser plugado em `detectFaceAndPlaceOverlay()` usando, por exemplo,
 * MediaPipe FaceMesh ou TensorFlow.js. Veja README › Prova Virtual.
 */
export default function VirtualTryOn() {
  const [mode, setMode] = useState<"idle" | "webcam" | "photo">("idle");
  const [selfie, setSelfie] = useState<string | null>(null);
  const [selected, setSelected] = useState(products[0]);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ x: number; y: number; offsetX: number; offsetY: number } | null>(null);

  const resetAdjustment = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleOverlayPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    dragRef.current = { x: e.clientX, y: e.clientY, offsetX: offset.x, offsetY: offset.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleOverlayPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!dragRef.current) return;
    const { x, y, offsetX, offsetY } = dragRef.current;
    setOffset({ x: offsetX + (e.clientX - x), y: offsetY + (e.clientY - y) });
  };

  const handleOverlayPointerUp = () => {
    dragRef.current = null;
  };

  useSEO({
    title: "Prova Virtual — Experimente os óculos",
    description: "Experimente os óculos USE MERMO no seu rosto com nossa prova virtual com IA.",
  });

  const startWebcam = async () => {
    if (!window.isSecureContext) {
      alert(
        "A câmera só funciona em conexões seguras (HTTPS). Acesse o site pelo domínio publicado (https://) ou por localhost para testar a webcam.",
      );
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Seu navegador não tem suporte a acesso de câmera. Tente atualizá-lo ou use outro navegador.");
      return;
    }
    try {
      // facingMode "user" prioriza a câmera frontal — essencial em celulares,
      // que por padrão podem abrir a câmera traseira.
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      setMode("webcam");
      setSelfie(null);
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
      // detectFaceAndPlaceOverlay(videoRef.current) — plugar IA aqui.
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      const messages: Record<string, string> = {
        NotAllowedError:
          "Permissão de câmera negada. Habilite o acesso à câmera nas configurações do navegador e tente novamente.",
        NotFoundError: "Nenhuma câmera foi encontrada neste dispositivo.",
        NotReadableError: "A câmera já está sendo usada por outro aplicativo.",
        OverconstrainedError:
          "Não foi possível encontrar uma câmera compatível. Tente enviar uma selfie.",
      };
      alert(messages[name] ?? "Não foi possível acessar a webcam. Verifique as permissões do navegador.");
    }
  };

  const stopWebcam = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    stream?.getTracks().forEach((t) => t.stop());
    setMode("idle");
    resetAdjustment();
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelfie(URL.createObjectURL(file));
      setMode("photo");
      resetAdjustment();
    }
  };

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-mermo py-10">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-3">Tecnologia USE MERMO</p>
          <h1 className="display-title text-4xl md:text-6xl">Prova Virtual</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-mid md:text-base">
            Experimente qualquer modelo no seu rosto em tempo real. Ative a
            webcam ou envie uma selfie e troque entre os óculos com um clique.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Palco */}
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-offwhite">
            {mode === "idle" && (
              <div className="flex flex-col items-center gap-6 text-center">
                <ScanFace className="size-16 text-gray-mid" strokeWidth={1} />
                <p className="max-w-xs text-sm text-gray-mid">
                  Escolha como deseja experimentar:
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button onClick={startWebcam}>
                    <Camera className="size-4" /> Usar webcam
                  </Button>
                  <Button variant="outline" onClick={() => fileRef.current?.click()}>
                    <ImageUp className="size-4" /> Enviar selfie
                  </Button>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onUpload}
                />
              </div>
            )}

            {mode === "webcam" && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="size-full object-cover"
                />
                <button
                  onClick={stopWebcam}
                  className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/90 backdrop-blur"
                  aria-label="Parar"
                >
                  <X className="size-5" />
                </button>
              </>
            )}

            {mode === "photo" && selfie && (
              <>
                <img src={selfie} alt="Sua selfie" className="size-full object-cover" />
                <button
                  onClick={() => {
                    setMode("idle");
                    resetAdjustment();
                  }}
                  className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/90 backdrop-blur"
                  aria-label="Remover"
                >
                  <X className="size-5" />
                </button>
              </>
            )}

            {/* Sobreposição do óculos — arraste para posicionar, use os
                controles abaixo para ajustar o tamanho no rosto. */}
            {mode !== "idle" && (
              <img
                src={selected.tryOnImage ?? selected.images[0].url}
                alt={selected.name}
                draggable={false}
                onPointerDown={handleOverlayPointerDown}
                onPointerMove={handleOverlayPointerMove}
                onPointerUp={handleOverlayPointerUp}
                onPointerCancel={handleOverlayPointerUp}
                style={{
                  transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
                }}
                className="absolute left-1/2 top-[38%] w-1/2 cursor-grab touch-none select-none mix-blend-multiply opacity-90 drop-shadow-xl active:cursor-grabbing"
              />
            )}

            <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-[10px] uppercase tracking-widest text-white">
              <span className="size-1.5 animate-pulse rounded-full bg-cta" /> IA Preview
            </span>

            {/* Controles de tamanho e posição do óculos */}
            {mode !== "idle" && (
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1.5 shadow-card backdrop-blur">
                  <button
                    onClick={() => setScale((s) => clampScale(s - SCALE_STEP))}
                    disabled={scale <= MIN_SCALE}
                    aria-label="Diminuir óculos"
                    className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-muted disabled:opacity-30"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-11 text-center text-xs font-medium tabular-nums text-ink">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    onClick={() => setScale((s) => clampScale(s + SCALE_STEP))}
                    disabled={scale >= MAX_SCALE}
                    aria-label="Aumentar óculos"
                    className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-muted disabled:opacity-30"
                  >
                    <Plus className="size-4" />
                  </button>
                  <span className="mx-1 h-5 w-px bg-border" />
                  <button
                    onClick={resetAdjustment}
                    aria-label="Redefinir ajuste"
                    className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
                  >
                    <RotateCcw className="size-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Seletor de modelos */}
          <div>
            <p className="eyebrow mb-4">Escolha um modelo</p>
            <div className="grid max-h-[460px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-2">
              {products.slice(0, 10).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={cn(
                    "overflow-hidden border text-left transition-colors",
                    selected.id === p.id ? "border-ink" : "border-transparent hover:border-border",
                  )}
                >
                  <img src={p.images[0].url} alt={p.name} className="aspect-square w-full object-cover" />
                  <div className="p-2">
                    <p className="truncate font-serif text-sm">{p.name}</p>
                    <p className="text-xs text-gray-mid">{formatBRL(p.price)}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-6">
              <p className="font-serif text-lg">{selected.name}</p>
              <p className="text-sm text-gray-mid">{formatBRL(selected.price)}</p>
              <Button asChild className="mt-4 w-full">
                <Link to={`/produto/${selected.slug}`}>
                  <ShoppingBag className="size-4" /> Comprar este modelo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
