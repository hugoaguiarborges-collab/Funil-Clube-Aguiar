import React, { useState } from "react";
import CoverPage from "./components/CoverPage";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "./components/ProgressBar";

export default function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progressPulse, setProgressPulse] = useState(false);
  const [answers, setAnswers] = useState({});
  const [answeredAt, setAnsweredAt] = useState(null);

  // Simulação dos dados
  const steps = [
    { id: 1, question: "Qual seu maior objetivo hoje?", type: "choice" },
    // ...outros passos
  ];

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
    initial: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 80 : -80,
      scale: 0.98,
      filter: "blur(3px)",
    }),
    animate: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
    exit: (dir) => ({
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
    <div className="min-h-screen flex flex-col items-center justify-center px-2 custom-bg">
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
            transition={{ duration: 0.45, ease: "easeInOut" }}
          >
            {/* Seu componente de etapas/páginas */}
            <CoverPage />
          </motion.div>
        </AnimatePresence>

        {/* Exemplo de resumo de respostas */}
        <ResumoRespostas />
      </div>
    </div>
  );
}
