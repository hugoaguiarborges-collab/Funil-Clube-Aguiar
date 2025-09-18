type Props = {
  onSelect: (value: string) => void;
};

const options = [
  { value: "Biotipo 1", img: "/biotipo-1.png" },
  { value: "Biotipo 2", img: "/biotipo-2.png" },
  { value: "Biotipo 3", img: "/biotipo-3.png" },
  { value: "Biotipo 4", img: "/biotipo-4.png" },
  { value: "Biotipo 5", img: "/biotipo-5.png" },
];

export default function EnqueteBiotipo({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-3xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-8 text-center">
          Qual desses corpos mais se parece com o seu biotipo hoje?
        </h2>
        <div className="flex flex-row justify-center gap-[1px] md:gap-[6px]">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className="rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-shadow shadow-lg hover:scale-105 bg-white p-0"
              aria-label={option.value}
              type="button"
              style={{margin: 0}}
            >
              <img
                src={option.img}
                alt={option.value}
                className="w-[60px] md:w-[100px] h-auto block"
                draggable={false}
                style={{margin: 0, padding: 0, display: "block"}}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
