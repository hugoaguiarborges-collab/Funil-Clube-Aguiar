const options = [
  { value: "20–29 Anos", img: "/idade-20-29.png" },
  { value: "30–39 Anos", img: "/idade-30-39.png" },
  { value: "40–49 Anos", img: "/idade-40-49.png" },
  { value: "50–65+ Anos", img: "/idade-50-65.png" },
];

type Props = {
  onSelect: (value: string) => void;
};

export default function EnqueteIdade({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-6 text-center">Qual sua idade?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md mx-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="relative rounded-2xl overflow-hidden shadow-md transition-transform hover:scale-105 focus:outline-none group bg-white"
              onClick={() => onSelect(option.value)}
            >
              <img
                src={option.img}
                alt={option.value}
                className="w-full h-[210px] object-contain bg-white"
                style={{ aspectRatio: "3/4" }}
                draggable={false}
              />
              {/* Nenhum texto sobreposto */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
