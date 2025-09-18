import { useRef, useEffect, useState } from "react";

const VIDEO_DURATION = 67; // segundos

type Props = {
  onContinue?: () => void;
};

export default function EnqueteDepoimento({ onContinue }: Props) {
  const [playing, setPlaying] = useState(false);
  const [fakeProgress, setFakeProgress] = useState(0); // 0 a 1
  const [videoReady, setVideoReady] = useState(false);
  const [iframeVisible, setIframeVisible] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Barra de progresso: curva acelerada no início, lenta no fim, em 67s
  useEffect(() => {
    if (!playing || fakeProgress >= 1) return;
    intervalRef.current && clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setFakeProgress((prev) => {
        if (prev >= 1) return 1;
        // Simulando easeOut: rápido no início, lento no fim
        // Tempo total = 67s, intervalo = 100ms, então 670 "ticks"
        // Usando easeOutQuad: progress = t*(2-t)
        const t = prev;
        const speed = 0.017 * (2 - t); // diminui com o tempo
        return Math.min(prev + speed / (VIDEO_DURATION * 10), 1);
      });
    }, 100);

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [playing, fakeProgress]);

  // Pausa ao terminar
  useEffect(() => {
    if (fakeProgress >= 1) setPlaying(false);
  }, [fakeProgress]);

  // Reset ao montar
  useEffect(() => {
    setFakeProgress(0);
    setPlaying(false);
    setIframeVisible(false);
  }, []);

  function handlePlayPause() {
    if (!videoReady && !iframeVisible) return;
    if (!playing) {
      setIframeVisible(true); // Mostra o vídeo real só ao dar play
    }
    setPlaying((p) => !p);
  }

  // Quando iframe carrega, libera play
  function handleIframeLoad() {
    setVideoReady(true);
  }

  // Overlay para bloquear interação com YouTube
  function Overlay() {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
          style={{ fontSize: 42 }}
          aria-label="Reproduzir depoimento"
          onClick={handlePlayPause}
        >
          {/* Ícone de play grande */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="18" fill="white" fillOpacity="0.18"/>
            <polygon points="13,10 28,18 13,26" fill="white"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-4 text-center">
          Veja o que mulheres reais dizem depois de treinar com a gente!
        </h2>
        <div className="flex justify-center mb-2">
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden bg-black shadow-lg aspect-video">
            {/* Vídeo YouTube (fica invisível até clicar no play customizado) */}
            <iframe
              src={`https://www.youtube.com/embed/mBFjVKu13L0?autoplay=${playing ? 1 : 0}&controls=0&modestbranding=1&rel=0`}
              title="Depoimento"
              className="w-full h-[220px] md:h-[330px] block"
              style={{
                visibility: iframeVisible ? "visible" : "hidden",
                pointerEvents: "none", // Nunca permite interação no iframe
                position: "absolute",
                top: 0, left: 0, width: "100%", height: "100%",
                background: "#111",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleIframeLoad}
            />
            {/* Overlay: só remove ao dar play */}
            {!iframeVisible && <Overlay />}
            {/* Barra de progresso customizada */}
            <div className="absolute left-0 right-0 bottom-0 px-3 pt-8 pb-3 bg-gradient-to-t from-black/60 to-transparent z-20">
              <div className="w-full h-2 bg-neutral-200/40 rounded">
                <div
                  className="h-2 bg-blue-500 rounded transition-all"
                  style={{
                    width: `${fakeProgress * 100}%`,
                    transition: playing ? "width 0.12s linear" : undefined,
                  }}
                />
              </div>
              {/* Controles personalizados */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={handlePlayPause}
                  className="text-white bg-blue-600 hover:bg-blue-800 rounded-full w-9 h-9 flex items-center justify-center shadow transition"
                  aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
                  disabled={!videoReady}
                  style={{ opacity: videoReady ? 1 : 0.6, cursor: videoReady ? "pointer" : "default" }}
                >
                  {playing ? (
                    // Pause icon
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                    </svg>
                  ) : (
                    // Play icon
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="7,5 19,12 7,19" fill="currentColor"/>
                    </svg>
                  )}
                </button>
                <span className="text-neutral-200 text-sm font-medium select-none opacity-60">Assista o depoimento</span>
              </div>
            </div>
          </div>
        </div>
        {onContinue && (
          <div className="flex justify-center mt-6">
            <button
              onClick={onContinue}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-xl text-base shadow-lg transition-all duration-300"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
