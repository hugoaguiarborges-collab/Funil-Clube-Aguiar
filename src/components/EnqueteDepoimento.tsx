import { useRef, useEffect, useState } from "react";

type Props = {
  onContinue?: () => void;
};

export default function EnqueteDepoimento({ onContinue }: Props) {
  // Custom progress bar states
  const [playing, setPlaying] = useState(false);
  const [fakeProgress, setFakeProgress] = useState(0); // 0 to 1
  const [videoLoaded, setVideoLoaded] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Custom progress simulation (fast at start, slow at end)
  useEffect(() => {
    if (!playing || fakeProgress >= 1) return;
    intervalRef.current && clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setFakeProgress((prev) => {
        if (prev >= 1) return 1;
        // Fast at the beginning, slow at the end
        if (prev < 0.5) return Math.min(prev + 0.04, 1);
        if (prev < 0.8) return Math.min(prev + 0.013, 1);
        return Math.min(prev + 0.004, 1);
      });
    }, 60);

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [playing, fakeProgress]);

  // Pause on video end
  useEffect(() => {
    if (fakeProgress >= 1) setPlaying(false);
  }, [fakeProgress]);

  // Controls for play/pause
  function handlePlayPause() {
    if (!videoLoaded) return;
    setPlaying((p) => !p);
  }

  // Reset progress if remounted
  useEffect(() => {
    setFakeProgress(0);
    setPlaying(false);
  }, []);

  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-4 text-center">
          Veja o que mulheres reais dizem depois de treinar com a gente!
        </h2>
        <div className="flex justify-center mb-2">
          {/* Custom video player */}
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden bg-black shadow-lg">
            {/* YouTube embed */}
            <iframe
              src="https://www.youtube.com/embed/mBFjVKu13L0?si=nshfFGhekV7h64Ji&autoplay=0&controls=0&modestbranding=1&rel=0"
              title="Depoimento"
              className="w-full h-[320px] md:h-[330px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setVideoLoaded(true)}
              style={{ pointerEvents: playing ? "auto" : "none" }}
            />
            {/* Overlay for custom controls/progress */}
            <div className="absolute left-0 right-0 bottom-0 px-3 pt-8 pb-3 bg-gradient-to-t from-black/60 to-transparent">
              {/* Fake progress bar */}
              <div className="w-full h-2 bg-neutral-200/40 rounded">
                <div
                  className="h-2 bg-blue-500 rounded transition-all"
                  style={{
                    width: `${fakeProgress * 100}%`,
                    transition: playing ? "width 0.12s linear" : undefined,
                  }}
                />
              </div>
              {/* Controls */}
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={handlePlayPause}
                  className="text-white bg-blue-600 hover:bg-blue-800 rounded-full w-9 h-9 flex items-center justify-center shadow transition"
                  aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
                  disabled={!videoLoaded}
                  style={{ opacity: videoLoaded ? 1 : 0.6, cursor: videoLoaded ? "pointer" : "default" }}
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
                {/* No time display */}
                <span className="text-neutral-200 text-sm font-medium select-none opacity-60">Assista o depoimento</span>
              </div>
            </div>
            {/* Cover for hiding default YouTube controls */}
            <div className="pointer-events-none absolute inset-0" />
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
