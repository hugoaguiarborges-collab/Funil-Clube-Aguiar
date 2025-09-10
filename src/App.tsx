import React, { useState } from "react";
import { useFunnelSteps } from "./components/useFunnelSteps";
import { AnimatePresence, motion } from "framer-motion";

// Confetti effect (simple, for fun)
function ConfettiBurst({ show }: { show: boolean }) {
  if (!show) return null;
  const confetti = Array.from({ length: 9 });
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-40">
      {confetti.map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: [1, 1.4, 0.7],
            x: 60 * Math.cos((i / confetti.length) * 2 * Math.PI),
            y: 60 * Math.sin((i / confetti.length) * 2 * Math.PI),
          }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="w-4 h-4 rounded-full absolute"
          style={{
            background:
              i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#34d399" : "#f472b6",
          }}
        />
      ))}
    </div>
  );
}

// Barra de progresso animada (pulsando ao avançar)
function ProgressBar({
  value,
  max,
  pulse,
}: {
  value: number;
  max: number;
  pulse: boolean;
}) {
  const percent = Math.round((value / max) * 100);
  return (
    <motion.div
      className="w-full h-3 bg-blue-700 rounded mb-6 overflow-hidden"
      animate={pulse ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      transition={
        pulse ? { duration: 0.5, ease: "easeInOut" } : { duration: 0 }
      }
    >
      <motion.div
        className="h-full bg-yellow-400"
        initial={false}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// Botão animado para opções do funil, sem filter!
function AnimatedOptionButton({
  children,
  onClick,
  selected,
  disabled,
  showCheck,
}: {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
  showCheck?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.93, rotate: -3 }}
      whileHover={{
        boxShadow: "0 0 0 4px #fef3c7, 0 8px 32px 0px rgba(251,191,36,0.18)",
      }}
      animate={{
        scale: selected ? 1.11 : 1,
        background: selected
          ? "linear-gradient(90deg,#fde68a 70%,#fbbf24 100%)"
          : "linear-gradient(90deg,#fbbf24 85%,#fde68a 100%)",
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 20,
      }}
      className={`relative rounded-xl px-5 py-3 font-bold text-lg cursor-pointer focus:outline-none border-2 border-yellow-400 transition-all
        ${selected ? "ring-4 ring-yellow-200" : ""}
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      `}
      style={{
        marginBottom: 12,
        color: "#1e3a8a",
        overflow: "hidden",
        // filter: "brightness(1)", // REMOVIDO!
      }}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{children}</span>
      {/* Check animado */}
      <AnimatePresence>
        {showCheck && (
          <motion.span
            initial={{ scale: 0, opacity: 0, y: -12 }}
            animate={{ scale: 1.1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 600, damping: 25 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 text-2xl"
          >
            ✓
          </motion.span>
        )}
      </AnimatePresence>
      {/* Brilho animado */}
      <motion.div
        className="absolute left-0 top-0 w-full h-full pointer-events-none"
        initial={false}
        animate={
          selected
            ? { opacity: [0.2, 0.7, 0.09], x: [0, 12, 0] }
            : { opacity: 0 }
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(90deg,#fff7ed 0%,#fde68a 100%)",
          filter: "blur(10px)",
          zIndex: 0,
        }}
      />
    </motion.button>
  );
}

// Redireciona para checkout
function RedirectToCheckout({ url }: { url: string }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 2000);
    return () => clearTimeout(timer);
  }, [url]);
  return null;
}

function App() {
  const steps = useFunnelSteps();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [direction, setDirection] = useState<1 | -1>(1);
  const [confetti, setConfetti] = useState(false);
  const [progressPulse, setProgressPulse] = useState(false);
  const [answeredAt, setAnsweredAt] = useState<number | null>(null);

  if (steps.length === 0) {
    return <div className="text-center p-8">Carregando...</div>;
  }

  const step = steps[stepIndex];

  // Avança etapa e salva resposta
  function handleChoice(option: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: option }));
    setDirection(1);
    setConfetti(true);
    setProgressPulse(true);
    setAnsweredAt(Date.now());
    setTimeout(() => setConfetti(false), 900);
    setTimeout(() => setProgressPulse(false), 600);
    setTimeout(() => {
      if (stepIndex < steps.length - 1) {
        setStepIndex((i) => i + 1);
      }
    }, 500);
  }

  function handleNext() {
    setDirection(1);
    setProgressPulse(true);
    setTimeout(() => setProgressPulse(false), 600);
    if (stepIndex < steps.length - 1) {
      setTimeout(() => setStepIndex((i) => i + 1), 340);
    }
  }

  function handleBack() {
    setDirection(-1);
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
    }
  }

  function ResumoRespostas() {
    return (
      <div className="bg-blue-700 rounded-lg p-4 mt-6 text-sm">
        <div className="font-bold mb-2">Suas respostas:</div>
        <ul>
          {steps
            .filter((s) => s.type === "choice")
            .map((s) => (
              <li key={s.id}>
                <span className="text-blue-200">{s.question}</span>
                <br />
                <span className="text-yellow-300 font-bold">
                  {answers[s.id] || "Não respondido"}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }

  // Animações de transição de página
  const pageVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 80 : -80,
      scale: 0.98,
      filter: "blur(3px)",
    }),
    animate: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -80 : 80,
      scale: 0.98,
      filter: "blur(3px)",
    }),
  };

  // Badge animada de "Salvo!" ao responder etapa
  function EtapaSalvaBadge() {
    if (!answeredAt) return null;
    return (
      <motion.div
        key={answeredAt}
        initial={{ opacity: 0, y: -16, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.5 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2 -top-8 bg-green-400 text-blue-900 font-bold rounded-full px-4 py-2 shadow-lg border border-green-700 z-50"
      >
        Etapa Salva!
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-800 text-white px-2">
      <div className="relative bg-blue-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-700 overflow-x-hidden">
        <EtapaSalvaBadge />
        <ProgressBar
          value={stepIndex + 1}
          max={steps.length}
          pulse={progressPulse}
        />
        <div className="mb-2 text-right text-xs text-blue-200">
          Etapa {stepIndex + 1} de {steps.length}
        </div>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={stepIndex}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.38, ease: "easeInOut" }}
            className="relative"
          >
            <ConfettiBurst show={confetti} />

            {step.type === "choice" && (
              <>
                <h1 className="text-2xl font-bold mb-5 text-yellow-200 drop-shadow">
                  {step.question}
                </h1>
                <div className="flex flex-col gap-2">
                  {step.options?.map((option, idx) => (
                    <AnimatedOptionButton
                      key={idx}
                      onClick={() => handleChoice(option)}
                      selected={answers[step.id] === option}
                      showCheck={answers[step.id] === option}
                      disabled={!!answers[step.id]}
                    >
                      {option}
                    </AnimatedOptionButton>
                  ))}
                </div>
                <div className="mt-5 text-xs text-blue-200 italic">
                  Escolha uma opção para avançar
                </div>
                {stepIndex > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 text-xs text-blue-300 underline hover:text-yellow-200 transition"
                  >
                    Voltar
                  </button>
                )}
              </>
            )}

            {step.type === "video" && (
              <>
                <h1 className="text-xl font-bold mb-4">{step.description}</h1>
                <div className="relative w-full pt-[56.25%] mb-4 rounded-xl overflow-hidden shadow">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    src={step.video_url}
                    title="Vídeo"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95, rotate: -2 }}
                  className="bg-yellow-400 text-blue-900 font-bold rounded-xl px-5 py-3 mt-4 transition hover:bg-yellow-300 shadow"
                  onClick={handleNext}
                >
                  Avançar
                </motion.button>
                {stepIndex > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 text-xs text-blue-300 underline hover:text-yellow-200 transition block"
                  >
                    Voltar
                  </button>
                )}
              </>
            )}

            {step.type === "redirect" && (
              <>
                <h1 className="text-2xl font-bold mb-4 animate-pulse">
                  Redirecionando...
                </h1>
                <p className="mb-4">
                  Aguarde um instante, você será encaminhada para o checkout.
                </p>
                <RedirectToCheckout url="https://hub.la/r/desafio40mais_play" />
                <ResumoRespostas />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
