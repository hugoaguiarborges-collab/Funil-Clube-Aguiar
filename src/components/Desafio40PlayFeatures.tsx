type Props = {
  onContinue: () => void;
};

export default function Desafio40PlayFeatures({ onContinue }: Props) {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-2 py-8"
      style={{
        backgroundImage: "url('/bg-fundo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl py-8 px-4 md:px-12 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-4 justify-center mb-8">
          {/* CARD 1 */}
          <div className="flex-1 bg-white rounded-2xl shadow-md py-8 px-5 flex flex-col items-center border border-neutral-100">
            <img
              src="/check.jpg"
              alt="Check-in do treino"
              className="w-60 h-60 object-contain mb-5 rounded-xl shadow"
              draggable={false}
            />
            <h3 className="text-xl font-extrabold text-neutral-900 mb-2 text-center uppercase tracking-tight">
              Cada treino vale pontos
            </h3>
            <p className="text-base text-neutral-700 text-center">
              Em toda aula, mostro o que chamo de <b>código treino</b>. Só com ele você confirma sua presença no treino, faz o check-in e soma pontos no ranking!
            </p>
          </div>
          {/* CARD 2 */}
          <div className="flex-1 bg-white rounded-2xl shadow-md py-8 px-5 flex flex-col items-center border border-neutral-100">
            <img
              src="/rank.jpg"
              alt="Ranking do desafio"
              className="w-60 h-60 object-contain mb-5 rounded-xl shadow"
              draggable={false}
            />
            <h3 className="text-xl font-extrabold text-neutral-900 mb-2 text-center uppercase tracking-tight">
              Suba no ranking
            </h3>
            <p className="text-base text-neutral-700 text-center">
              Os pontos vão direto para o ranking, onde você compete com outras alunas ou consigo mesma. E toda semana temos <b>desafios especiais</b> que valem pontos em dobro!
            </p>
          </div>
          {/* CARD 3 */}
          <div className="flex-1 bg-white rounded-2xl shadow-md py-8 px-5 flex flex-col items-center border border-neutral-100">
            <img
              src="/gemini-generate.png"
              alt="Prêmios do desafio"
              className="w-60 h-60 object-contain mb-5 rounded-xl shadow"
              draggable={false}
            />
            <h3 className="text-xl font-extrabold text-neutral-900 mb-2 text-center uppercase tracking-tight">
              Ganhe prêmios!
            </h3>
            <p className="text-base text-neutral-700 text-center">
              Tudo isso vale prêmios: materiais para treinar em casa e até prêmios em dinheiro! Você treina, se diverte, tem resultados e ainda pode ganhar um Pix por isso. Tem coisa melhor?
            </p>
          </div>
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg transition-all duration-300 mb-4"
          onClick={onContinue}
        >
          QUERO ENTRAR!
        </button>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 justify-center items-center text-sm text-neutral-500">
          <a
            href="/termos-de-uso"
            className="underline hover:text-neutral-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Termos de Uso
          </a>
          <span className="hidden md:inline">|</span>
          <a
            href="/politica-de-privacidade"
            className="underline hover:text-neutral-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </div>
  );
}
