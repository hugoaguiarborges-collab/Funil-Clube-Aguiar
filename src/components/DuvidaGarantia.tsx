type Props = {
  onConfirm?: () => void;
};

export default function DuvidaGarantia({ onConfirm }: Props) {
  // AÇÃO DO BOTÃO: DIRECIONA PARA O WHATSAPP
  function handleConfirm() {
    const numero = localStorage.getItem("aluna_whatsapp") || "";
    const numeroLimpo = numero.replace(/\D/g, "");
    window.open(`https://wa.me/55${numeroLimpo}`, "_blank");
    if (onConfirm) onConfirm();
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-4 bg-white">
      {/* Barra de progresso verde */}
      <div className="w-full max-w-xl mx-auto h-3 bg-green-100 rounded-full my-2">
        <div className="h-3 bg-green-500 rounded-full transition-all duration-700" style={{ width: "100%" }} />
      </div>

      {/* Mensagem principal */}
      <h2 className="text-2xl font-extrabold text-neutral-900 text-center mt-6 mb-5 px-2">
        CALMA LÁ! Se você está com dúvidas não se preocupe!
      </h2>

      {/* Card de garantia */}
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow p-6 mb-8">
        <div className="flex flex-col items-center">
          {/* Ícone de medalha */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-2">
            <circle cx="24" cy="24" r="20" fill="#111827" />
            <path d="M24 14l2.09 6.26H32l-5.045 3.66L28.18 30 24 26.77 19.82 30l1.225-6.08L16 20.26h5.91L24 14z" fill="white"/>
          </svg>
          <p className="text-lg font-bold text-neutral-900 mb-1">Seu risco é zero!</p>
          <p className="text-base text-neutral-700 text-center">
            Se, depois do desafio, você seguir TODAS as orientações e não estiver satisfeita, eu devolvo o seu dinheiro. Sem perguntas. Sem burocracia.
          </p>
        </div>
      </div>

      {/* Botão de ação */}
      <button
        onClick={handleConfirm}
        className="w-full max-w-md mx-auto bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl py-4 mb-4 transition-all duration-200 shadow-xl"
      >
        Não tenho nada a perder! Quero participar do Desafio!
      </button>
    </div>
  );
}
