type Props = {
  onYes: () => void;
  onNo: () => void;
};

const alternativas = [
  {
    titulo: 'Reduzir dores no corpo e articulações 🦵',
    texto: '💡 Exercícios leves que fortalecem músculos de suporte e aliviam sobrecarga nas articulações.',
  },
  {
    titulo: 'Se sentir mais confiante com o corpo 💃',
    texto: '💡 Treinos que melhoram postura, tonificam e trazem autoestima de volta.',
  },
  {
    titulo: 'Prevenir doenças e envelhecer com saúde ❤️',
    texto: '💡 Atividades que regulam pressão, fortalecem o coração e aumentam a longevidade.',
  },
  {
    titulo: 'Diminuir a barriga 👖',
    texto: '💡 Estratégia com exercícios funcionais e orientações que ajudam a reduzir gordura abdominal.',
  },
];

export default function EnqueteResumoObjetivos({ onYes, onNo }: Props) {
  return (
    <div className="flex flex-col items-center w-full py-5">
      <div className="w-full max-w-xl bg-white/80 rounded-3xl border border-blue-400 shadow-2xl p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold text-neutral-900 mb-8 text-center">
          E se eu te contar que com esse desafio, você vai atingir TODOS esses objetivos?
        </h2>
        <div className="flex flex-col gap-4 mb-10">
          {alternativas.map((alt) => (
            <div
              key={alt.titulo}
              className="border-2 border-green-400 bg-green-50/80 rounded-2xl px-6 py-4 flex flex-col shadow transition"
            >
              <span className="font-bold text-green-800 text-base mb-1">{alt.titulo}</span>
              <span className="text-green-900 text-[15px] font-medium">{alt.texto}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={onYes}
            className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-extrabold text-lg rounded-xl py-3 shadow transition-transform hover:scale-105"
          >
            <span className="text-2xl">😍</span>
            Sim! eu quero!
          </button>
          <button
            onClick={onNo}
            className="flex items-center justify-center gap-3 bg-green-200 hover:bg-green-300 text-green-900 font-bold text-lg rounded-xl py-3 shadow transition-transform hover:scale-105"
          >
            <span className="text-2xl">😔</span>
            Acho que não...
          </button>
        </div>
      </div>
    </div>
  );
}
