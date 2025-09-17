import { useState } from "react";

export default function App() {
  const [started, setStarted] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState("");

  // CARD: estrutura principal sem centralização vertical forçada
  if (!started) {
    return (
      <div className="custom-bg px-2">
        <div className="backdrop-blur-lg bg-blue-800/75 p-5 rounded-3xl shadow-2xl shadow-blue-900/50 w-full max-w-sm border-4 border-blue-600
          transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_12px_32px_8px_rgba(0,0,60,0.35)] 
          ring-2 ring-yellow-300/40 drop-shadow-lg
          md:mb-0 mb-3"
        >
          <h1 className="text-2xl font-extrabold text-white mb-3 drop-shadow-lg">
            Bem-vinda ao Desafio 40+ Play!
          </h1>
          <p className="text-white mb-6 font-medium drop-shadow">
            Faça parte do desafio mais divertido e motivador para mulheres com mais de 40 anos
          </p>
          <button
            className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-blue-900 font-bold px-6 py-2 rounded-xl text-lg shadow-lg hover:scale-105 hover:brightness-105 transition-all duration-300 ring-2 ring-yellow-100/50"
            onClick={() => setStarted(true)}
          >
            Quero participar
          </button>
        </div>
      </div>
    );
  }

  // Tela de resposta (depois do clique)
  if (answered) {
    return (
      <div className="custom-bg px-2">
        <div className="backdrop-blur-lg bg-green-700/80 p-5 rounded-3xl shadow-2xl shadow-green-900/50 w-full max-w-sm border-4 border-green-900 text-center
          transform transition-transform duration-300
          md:mb-0 mb-3"
        >
          <h1 className="text-xl font-bold text-white mb-3">Obrigado!</h1>
          <p className="text-white">Você escolheu: <span className="font-bold">{answer}</span></p>
        </div>
      </div>
    );
  }

  // Pergunta principal
  return (
    <div className="custom-bg px-2">
      <div className="backdrop-blur-lg bg-blue-800/75 p-5 rounded-3xl shadow-2xl shadow-blue-900/50 w-full max-w-sm border-4 border-blue-600
        transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_12px_32px_8px_rgba(0,0,60,0.35)] 
        ring-2 ring-yellow-300/40 drop-shadow-lg
        md:mb-0 mb-3"
      >
        <h1 className="text-xl font-extrabold text-white mb-4 text-center drop-shadow-lg">
          Qual seu maior objetivo hoje?
        </h1>
        <div className="w-full flex flex-col gap-3 mb-3">
          {["Emagrecer", "Ganhar massa", "Ter mais disposição"].map((option) => (
            <button
              key={option}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-blue-900 font-bold shadow-lg hover:scale-105 hover:brightness-105 transition-all duration-300 ring-2 ring-yellow-200/50"
              onClick={() => { setAnswered(true); setAnswer(option); }}
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
