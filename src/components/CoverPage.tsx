type Props = {
  onStart: () => void;
};

export default function CoverPage({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5ede4] px-4 py-8">
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden max-w-md w-full">
        {/* Imagem de fundo */}
        <img
          src="/capa-desafio.jpg.png"
          alt="Desafio para mulheres 40+"
          className="w-full h-[340px] object-cover"
          draggable={false}
        />
        {/* Logo sobre a imagem */}
        <div className="absolute top-7 left-7 flex flex-col items-start z-10">
          <img src="/logo-aguiar.svg" alt="Aguiar Clube" className="h-12 mb-2" />
        </div>
        {/* Box com texto e botão */}
        <div className="absolute bottom-0 left-0 w-full bg-[#f5ede4] px-6 py-8 rounded-t-3xl flex flex-col items-center shadow-lg z-10">
          <div className="flex items-center mb-4">
            {/* Ícone Yoga */}
            <svg width={46} height={62} viewBox="0 0 46 62" fill="none">
              <path d="M23 10C28.5228 10 33 5.52285 33 0C33 5.52285 28.5228 10 23 10ZM23 10C17.4772 10 13 5.52285 13 0C13 5.52285 17.4772 10 23 10ZM23 13C28.5228 13 33 17.4772 33 23C33 28.5228 28.5228 33 23 33C17.4772 33 13 28.5228 13 23C13 17.4772 17.4772 13 23 13ZM23 37C30.1797 37 36 42.8203 36 50H10C10 42.8203 15.8203 37 23 37Z" fill="#21517B"/>
            </svg>
          </div>
          <h1 className="text-[#21517B] text-2xl text-center font-bold leading-tight mb-4">
            Faça parte do desafio mais divertido e motivador para mulheres com mais de 40 anos
          </h1>
          <button
            onClick={onStart}
            className="bg-[#2A6847] hover:bg-[#21517B] transition-colors text-white font-bold rounded-xl px-6 py-3 mt-2 text-lg shadow-lg"
          >
            PARTICIPAR DO DESAFIO
          </button>
        </div>
      </div>
    </div>
  );
}
