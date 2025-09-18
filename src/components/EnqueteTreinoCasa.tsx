type Props = {
  onSelect: (value: string) => void;
};

const options = [
  {
    text: "Sério? Quero aprender como",
    emoji: "😍",
  },
  {
    text: "Não sabia, mas faz sentido!",
    emoji: "🤓",
  },
];

export default function EnqueteTreinoCasa({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-2 text-center">
          Você sabia que dá pra conquistar resultados incríveis treinando em casa usando apenas objetos do dia a dia?
        </h2>
        <p className="text-neutral-700 text-center mb-8">
          Selecione uma das opções para continuar:
        </p>
        <div className="flex flex-col gap-4">
          {options.map((opt) => (
            <button
              key={opt.text}
              onClick={() => onSelect(opt.text)}
              className="flex items-center justify-start gap-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-xl px-6 py-4 shadow transition-transform hover:scale-105"
            >
              <span className="text-3xl">{opt.emoji}</span>
              <span>{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
