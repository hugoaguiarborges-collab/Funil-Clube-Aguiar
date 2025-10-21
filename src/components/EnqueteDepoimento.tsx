import { useRef, useEffect, useState } from "react";

type Props = {
  travamento: string;
  onContinue: () => void;
  onDoubt?: () => void;
};

const VIDEO_DURATION = 67; // segundos
const REQUIRED_SECONDS = 15; // tempo mínimo (segundos) para liberar o botão

function easeOutQuad(t: number) {
  return t * (2 - t);
}

// Função para gerar texto persuasivo conforme o travamento
function textoDepoimento(travamento: string) {
  switch (travamento) {
    case "começo animada mas logo desanimo":
      return "Se você costuma começar cheia de energia e acaba desanimando, veja o que mulheres reais que passaram por isso têm a dizer após treinarem conosco:";
    case "não tenho tempo":
      return "Se o tempo sempre foi seu maior desafio, assista a esses depoimentos de mulheres que encontraram uma forma prática de se cuidar, mesmo na rotina corrida:";
    case "não consigo fazer sozinha":
      return "Se você sente dificuldade em treinar sozinha, confira como outras alunas superaram isso com nosso apoio e motivação:";
    case "não vejo resultado":
      return "Se você já tentou de tudo e não vê resultados, veja os relatos de quem finalmente conquistou mudanças reais:";
    default:
      return "Veja o que nossas alunas contam sobre vencer desafios e transformar sua rotina de treinos!";
  }
}

export default function EnqueteDepoimento({ travamento, onContinue, onDoubt }: Props) {
  const [playing, setPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [progress, setProgress] = useState(0); // 0 a 1
  const [elapsed, setElapsed] = useState(0); // segundos já assistidos (estimados)
  const intervalRef = useRef<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const startTimestampRef = useRef<number | null>(null); // timestamp em ms usado para cálculo do elapsed

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.67)",
    zIndex: 3,
    display: playing ? "none" : "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s"
  };

  function recalcProgress(elapsedTime: number) {
    const t = Math.min(elapsedTime / VIDEO_DURATION, 1);
    return easeOutQuad(t);
  }

  // Inicia o intervalo que atualiza elapsed/progress
  useEffect(() => {
    if (playing) {
      // define startTimestamp se ainda não existir (ou quando retomando)
      startTimestampRef.current = Date.now() - elapsed * 1000;

      // limpar qualquer intervalo anterior
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      intervalRef.current = window.setInterval(() => {
        const start = startTimestampRef.current ?? Date.now();
        const newElapsed = Math.min((Date.now() - start) / 1000, VIDEO_DURATION);
        setElapsed(newElapsed);
        setProgress(recalcProgress(newElapsed));
        if (newElapsed >= VIDEO_DURATION) {
          setPlaying(false);
        }
      }, 150);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    } else {
      // se pausou, limpa intervalo
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  // Sincroniza play/pause com iframe via postMessage para YouTube API
  function handlePlayPause() {
    if (!videoReady) return;
    if (!playing) {
      // iniciar
      startTimestampRef.current = Date.now() - elapsed * 1000;
      setPlaying(true);
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      }
    } else {
      // pausar
      setPlaying(false);
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    }
  }

  // Garante que ao atingir 100% o vídeo pare
  useEffect(() => {
    if (progress >= 1) {
      setPlaying(false);
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    }
  }, [progress]);

  function handleIframeLoad() {
    setVideoReady(true);
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(
        '{"event":"listening","id":1}',
        "*"
      );
    }
  }

  // Se o vídeo não estiver tocando, garantir que o iframe esteja em pause (quando pronto)
  useEffect(() => {
    if (!playing && progress < 1 && videoReady) {
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    }
  }, [playing, videoReady, progress]);

  // Ação ao clicar continuar - só dispara se onContinue existir (botão pode estar desabilitado)
  function handleContinue() {
    if (elapsed >= REQUIRED_SECONDS) {
      if (onContinue) onContinue();
    }
  }

  const secondsRemaining = Math.max(0, REQUIRED_SECONDS - Math.floor(elapsed));
  const continueDisabled = !videoReady || elapsed < REQUIRED_SECONDS;

  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm">
        {/* Logo e título do topo */}
        <div className="w-full flex flex-col items-center mb-5 mt-1">
          <img
            src="/logo-desafio40play.png"
            alt="Logo Desafio 40+ Play"
            className="w-28 h-auto mb-2"
            style={{ maxWidth: 120 }}
            draggable={false}
          />
          <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight text-center">
            Desafio 40+ Play
          </h1>
        </div>
        {/* Texto persuasivo conforme travamento */}
        <h2 className="text-2xl font-extrabold text-indigo-900 mb-4 text-center">
          {textoDepoimento(travamento)}
        </h2>
        <div className="flex justify-center mb-2">
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden bg-black shadow-lg aspect-video"
               style={{minHeight: 220}}>
            <div style={overlayStyle}>
              <button
                className="bg-blue-600 hover:bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
                style={{ fontSize: 42, zIndex: 4 }}
                aria-label="Reproduzir depoimento"
                onClick={handlePlayPause}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="18" fill="white" fillOpacity="0.18"/>
                  <polygon points="13,10 28,18 13,26" fill="white"/>
                </svg>
              </button>
            </div>
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/mBFjVKu13L0?enablejsapi=1&autoplay=0&controls=0&modestbranding=1&rel=0&fs=0&playsinline=1`}
              title="Depoimento"
              className="w-full h-[220px] md:h-[330px] block"
              style={{
                position: "absolute",
                top: 0, left: 0, width: "100%", height: "100%",
                background: "#111",
                zIndex: 2,
                pointerEvents: "none"
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleIframeLoad}
            />
            <div className="absolute left-0 right-0 bottom-0 px-3 pt-8 pb-3 bg-gradient-to-t from-black/60 to-transparent z-20">
              <div className="w-full h-2 bg-neutral-200/40 rounded">
                <div
                  className="h-2 bg-blue-500 rounded transition-all"
                  style={{
                    width: `${progress * 100}%`,
                    transition: playing ? "width 0.12s linear" : undefined,
                  }}
                />
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={handlePlayPause}
                  className="text-white bg-blue-600 hover:bg-blue-800 rounded-full w-9 h-9 flex items-center justify-center shadow transition"
                  aria-label={playing ? "Pausar vídeo" : "Reproduzir vídeo"}
                  disabled={!videoReady}
                  style={{ opacity: videoReady ? 1 : 0.6, cursor: videoReady ? "pointer" : "default" }}
                >
                  {playing ? (
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                    </svg>
                  ) : (
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
        <div className="flex flex-col gap-3 justify-center mt-6">
          <button
            onClick={handleContinue}
            className={`w-full text-white font-bold px-6 py-3 rounded-xl text-base shadow-lg transition-all duration-300 ${
              continueDisabled ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={continueDisabled}
            aria-disabled={continueDisabled}
            title={continueDisabled ? `Assista ${REQUIRED_SECONDS} segundos do vídeo para liberar` : undefined}
          >
            Está decidido! Quero entrar no Desafio!
          </button>

          {continueDisabled && (
            <div className="text-center text-sm text-neutral-600 mt-1 select-none">
              {videoReady ? (
                <span>Assista mais {secondsRemaining}s para liberar o botão</span>
              ) : (
                <span>Carregando vídeo...</span>
              )}
            </div>
          )}

          {onDoubt && (
            <button
              onClick={onDoubt}
              className="w-full bg-yellow-700 hover:bg-yellow-800 text-white font-bold px-6 py-3 rounded-xl text-base shadow-lg transition-all duration-300"
            >
              Eu ainda tenho dúvidas...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
