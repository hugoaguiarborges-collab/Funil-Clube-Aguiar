interface Option {
  label: string;
  img: string;
}

const options: Option[] = [
  { label: "20–29 Anos", img: "/idade-20-29.png" },
  { label: "30–39 Anos", img: "/idade-30-39.png" },
  { label: "40–49 Anos", img: "/idade-40-49.png" },
  { label: "50–65+ Anos", img: "/idade-50-65.png" },
];

type Props = {
  onSelect: (label: string) => void;
};

export default function EnqueteIdade({ onSelect }: Props) {
  return (
    <div className="flex flex-col items-center w-full py-5">
      <h2 className="text-2xl font-extrabold text-neutral-900 mb-6 text-center">Qual sua idade?</h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            className="relative rounded-2xl overflow-hidden shadow-md transition-transform hover:scale-105 focus:outline-none group"
            onClick={() => onSelect(option.label)}
          >
            <img src={option.img} alt={option.label} className="w-full aspect-square object-cover" />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#235340] bg-opacity-85 px-4 py-2 rounded-lg text-white text-lg font-bold tracking-wide group-hover:bg-opacity-100 transition">
              {option.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
