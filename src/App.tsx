import React, { useState, useEffect } from "react";
import { useFunnelSteps } from "./components/useFunnelSteps";
import { AnimatePresence, motion } from "framer-motion";
// ... (Demais imports e componentes auxiliares permanecem iguais)

function App() {
  const steps = useFunnelSteps();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [direction, setDirection] = useState<1 | -1>(1);
  const [confetti, setConfetti] = useState(false);
  const [progressPulse, setProgressPulse] = useState(false);
  const [answeredAt, setAnsweredAt] = useState<number | null>(null);

  // Adicione este estado para controlar a seleção temporária na etapa atual
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);
  // E este para controlar o botão desabilitado
  const [optionDisabled, setOptionDisabled] = useState(false);

  useEffect(() => {
    // Sempre que muda de etapa, reseta seleção e habilitação
    setCurrentSelection(answers[steps[stepIndex]?.id] || null);
    setOptionDisabled(!!answers[steps[stepIndex]?.id]);
  }, [stepIndex, steps, answers]);

  if (steps.length === 0) {
    return <div className="text-center p-8">Carregando...</div>;
  }

  const step = steps[stepIndex];

  // Avança etapa e salva resposta
  function handleChoice(option: string) {
    setCurrentSelection(option);
    setOptionDisabled(true);
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
      // Limpa a resposta da etapa atual ao voltar, se quiser
      // setAnswers((prev) => {
      //   const newPrev = { ...prev };
      //   delete newPrev[step.id];
      //   return newPrev;
      // });
      // Ou apenas deixa o usuário trocar de resposta normalmente
    }
  }

  // ... (ResumoRespostas, EtapaSalvaBadge, e demais funções permanecem iguais)

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
                      selected={currentSelection === option}
                      showCheck={currentSelection === option}
                      disabled={optionDisabled}
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

            {/* Mantenha o resto igual */}
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
