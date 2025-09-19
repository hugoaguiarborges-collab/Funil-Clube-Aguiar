const options = [
  { value: "Diminuir a barriga", emoji: "👖" },
  { value: "Se sentir mais confiante com o corpo", emoji: "💃" },
  { value: "Reduzir dores nas articulações", emoji: "🦵" },
  { value: "Outros" },
];

type Props = {
  onSelect: (value: string) => void;
};

export default function EnqueteObjetivo({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-6 text-center">Qual é o seu maior objetivo?</h2>
        <div className="grid grid-cols-1 gap-4 w-full max-w-md mx-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="rounded-xl px-6 py-4 bg-blue-100 text-blue-900 font-bold text-lg flex items-center justify-center gap-3 shadow transition-transform hover:scale-105 hover:bg-blue-200"
              onClick={() => onSelect(option.value)}
            >
              <span className="text-2xl">{option.emoji}</span>
              <span>{option.value}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
