type Props = {
  onContinue: () => void;
};

export default function EnqueteDesafio40Play({ onContinue }: Props) {
  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-3xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm flex flex-col items-center">
        {/* Imagem bem grande e horizontal */}
        <img
          src="/gemini-treino-gamificado.jpg"
          alt="Treino Desafio 40+ Play"
          className="mb-6 w-full max-w-2xl h-auto rounded-xl object-cover shadow-lg"
          style={{ aspectRatio: '16/7', maxHeight: 340 }}
        />

        {/* Texto menor e em bloco, seguindo o padrão horizontal da foto */}
        <div className="w-full max-w-2xl mx-auto text-center">
          <p className="text-lg md:text-xl font-semibold text-neutral-900 mb-6 leading-snug">
            E se, além de conquistar resultados reais com treinos simples em casa,<br />
            você pudesse transformar sua rotina em uma experiência divertida,<br />
            colecionando pontos a cada treino, subindo no ranking<br />
            e participando de um jogo saudável de competição<br />
            com outras alunas e também consigo mesma?
          </p>
          <p className="text-base md:text-lg text-neutral-800 mb-8 leading-snug font-normal">
            No Desafio 40+ Play, cada treino vira uma conquista.<br />
            Você recebe recompensas, participa de sorteios,<br />
            é premiada pela sua constância e tem o apoio de uma comunidade<br />
            que incentiva você a chegar mais longe!
          </p>
        </div>
        <button
          onClick={onContinue}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-6 py-4 rounded-xl text-lg shadow-lg transition-all duration-300"
        >
          Que legal! Mas como isso funciona na prática?
        </button>
      </div>
    </div>
  );
}
