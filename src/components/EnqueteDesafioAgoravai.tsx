type Props = {
  onContinue: () => void;
};

export default function EnqueteDesafioAgoravai({ onContinue }: Props) {
  return (
    <div className="custom-bg px-2 flex flex-col items-center space-y-6">
      <div className="backdrop-blur-lg bg-white/80 p-5 rounded-3xl shadow-2xl shadow-blue-900/30 w-full max-w-lg border-4 border-blue-300 text-center">
        <img
          src="/agoravai.png"
          alt="Desafio 40+ Play"
          style={{ width: "100%", borderRadius: "18px", marginBottom: "18px" }}
          loading="lazy"
        />
        <div className="text-xl font-bold text-gray-800 mb-3">
          Imagine conquistar resultados de verdade, treinando em casa e se divertindo junto com outras mulheres.
        </div>
        <div className="text-gray-700 mb-5">
          No Desafio 40+ Play, cada treino é uma vitória.<br />
          Você ganha prêmios, participa de sorteios e tem uma galera que te motiva todos os dias para você não desistir.<br />
          Bora descobrir como funciona na prática?
        </div>
        <button
          className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl text-lg shadow-lg hover:scale-105 hover:brightness-105 transition-all duration-300 ring-2 ring-blue-100/50"
          onClick={onContinue}
        >
          Quero ver como funciona!
        </button>
      </div>
    </div>
  );
}
