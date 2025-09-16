import { useState } from "react";

export default function App() {
  const [started, setStarted] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState("");

  // TELA DE CAPA ATUALIZADA
  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-2 custom-bg">
        <div className="bg-blue-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-700 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Bem-vinda ao Desafio 40+ Play!
          </h1>
          <p className="text-white mb-8">
            Faça parte do desafio mais divertido e motivador para mulheres com mais de 40 anos
          </p>
          <button
            className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg text-xl hover:bg-yellow-300 transition"
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
      <div className="min-h-screen flex flex-col items-center justify-center px-2 custom-bg">
        <div className="bg-green-700 p-8 rounded-2xl shadow-xl w-full max-w-md border border-green-900 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Obrigado!</h1>
          <p className="text-white">Você escolheu: <span className="font-bold">{answer}</span></p>
        </div>
      </div>
    );
  }

  // Pergunta principal
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 custom-bg">
      <div className="bg-blue-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-700">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Qual seu maior objetivo hoje?
        </h1>
        <div className="w-full flex flex-col gap-4 mb-4">
          {["Emagrecer", "Ganhar massa", "Ter mais disposição"].map((option) => (
            <button
              key={option}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 text-blue-900 font-semibold shadow hover:scale-105 transition"
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
