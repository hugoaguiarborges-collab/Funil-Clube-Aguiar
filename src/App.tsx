import { useState } from "react";

const steps = [
  {
    id: "objetivo",
    question: "Qual seu maior objetivo hoje?",
    options: ["Emagrecer", "Ganhar massa", "Ter mais disposição"],
  },
  // Adicione mais perguntas se quiser aqui...
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // Exibe a capa se ainda não começou
  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-2 custom-bg">
        <div className="bg-blue-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-700 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Bem-vindo ao Clube Aguiar!</h1>
          <p className="text-white mb-8">Clique em começar para iniciar seu diagnóstico personalizado.</p>
          <button
            className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg text-xl hover:bg-yellow-300 transition"
            onClick={() => setStarted(true)}
          >
            Começar
          </button>
        </div>
      </div>
    );
  }

  // Pergunta atual
  const step = steps[stepIndex];

  // Quando clicar em uma opção
  function handleOptionClick(option: string) {
    setAnswers((prev) => ({ ...prev, [step.id]: option }));
    // Se tiver mais perguntas, vai pra próxima
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      // Se acabou, pode mostrar um resumo ou tela final
      alert("Respostas enviadas! Obrigado.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 custom-bg">
      <div className="bg-blue-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-700">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">{step.question}</h1>
        <div className="w-full flex flex-col gap-4 mb-4">
          {step.options.map((option) => (
            <button
              key={option}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 text-blue-900 font-semibold shadow hover:scale-105 transition"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="text-sm text-white text-opacity-80 mt-2 text-center">
          Escolha uma opção para avançar
        </p>
      </div>
    </div>
  );
}
