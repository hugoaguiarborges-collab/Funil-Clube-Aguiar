import React from "react";

export default function CoverPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 custom-bg">
      <div className="w-full max-w-md bg-white bg-opacity-10 rounded-xl shadow-lg p-8 flex flex-col items-center">
        {/* Barra de progresso (exemplo) */}
        <div className="w-full mb-4">
          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: "12.5%" }} />
          </div>
          <div className="text-right text-xs text-white mt-1">Etapa 1 de 8</div>
        </div>
        {/* Pergunta */}
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Qual seu maior objetivo hoje?
        </h1>
        {/* Opções */}
        <div className="w-full flex flex-col gap-4 mb-4">
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 text-blue-900 font-semibold shadow hover:scale-105 transition">
            Emagrecer
          </button>
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 text-blue-900 font-semibold shadow hover:scale-105 transition">
            Ganhar massa
          </button>
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-300 to-yellow-500 text-blue-900 font-semibold shadow hover:scale-105 transition">
            Ter mais disposição
          </button>
        </div>
        {/* Dica */}
        <p className="text-sm text-white text-opacity-80 mt-2 text-center">
          Escolha uma opção para avançar
        </p>
      </div>
    </div>
  );
}
