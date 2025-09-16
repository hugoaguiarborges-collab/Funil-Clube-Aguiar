export default function CoverPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        Qual seu maior objetivo hoje?
      </h1>
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
      <p className="text-sm text-white text-opacity-80 mt-2 text-center">
        Escolha uma opção para avançar
      </p>
    </div>
  );
}
