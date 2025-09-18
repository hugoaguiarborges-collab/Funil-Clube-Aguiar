type Props = {
  onContinue: () => void;
};

export default function EnqueteDesafio40Play({ onContinue }: Props) {
  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm flex flex-col items-center">
        {/* Imagem ilustrativa do desafio, acima do botão */}
        <img
          src="/gemini-treino-gamificado.png"
          alt="Treino Desafio 40+ Play"
          className="mb-6 w-full max-w-md rounded-xl object-cover shadow-lg"
        />
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-4 text-center">
          E se, além de conquistar resultados reais com treinos simples em casa,<br />
          você pudesse transformar sua rotina em uma experiência divertida, colecionando pontos<br />
          a cada treino realizado, subindo no ranking e participando de um jogo saudável de competição
          com outras alunas e também consigo mesma?<br /><br />
          No Desafio 40+ Play, cada treino vira uma conquista! Você recebe recompensas, participa de sorteios,
          é premiada pela sua constância e tem motivos a mais para não desistir. Tudo isso com o nosso apoio e de uma comunidade que te incentiva a chegar mais longe!
        </h2>
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
