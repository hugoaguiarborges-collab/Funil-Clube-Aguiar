type Props = {
  onSelect: (value: string) => void;
};

const alternativas = [
  {
    texto: "Tenho medo de me machucar por falta de orientação",
    emoji: "⚠️",
  },
  {
    texto: "Não consigo reduzir a barriga, mesmo tentando várias coisas",
    emoji: "👖",
  },
  {
    texto: "Sinto que perdi músculos depois da menopausa",
    emoji: "👎",
  },
  {
    texto: "Começo animada, mas logo desanimo",
    emoji: "😴",
  },
];

export default function EnqueteTravamento({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-2 text-center">
          Pra saber se esse desafio é pra você, me diz o que mais te trava hoje:
        </h2>
        <p className="text-neutral-700 text-center mb-8">
          Selecione uma das opções para continuar:
        </p>
        <div className="flex flex-col gap-4">
          {alternativas.map((alt) => (
            <button
              key={alt.texto}
              onClick={() => onSelect(alt.texto)}
              className="flex items-center justify-start gap-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-xl px-6 py-4 shadow transition-transform hover:scale-105"
            >
              <span className="text-3xl">{alt.emoji}</span>
              <span>{alt.texto}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
