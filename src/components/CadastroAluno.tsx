import { useState } from "react";

type Props = {
  idade: string;
  biotipo: string;
  objetivo: string;
  travamento: string;
  treinoCasa: string;
  onContinue: () => void;
};

export default function CadastroAluno({
  idade,
  biotipo,
  objetivo,
  travamento,
  treinoCasa,
  onContinue,
}: Props) {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui você pode enviar para o Firestore / API etc.
    // Para não quebrar o build, apenas chama onContinue
    if (onContinue) onContinue();
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Quase lá — cadastre-se</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
          />
        </div>

        {/* Informações do funil (só exibindo para debug/validação) */}
        <div className="text-sm text-neutral-600 mt-2">
          <p>Idade: <strong>{idade}</strong></p>
          <p>Biotipo: <strong>{biotipo}</strong></p>
          <p>Objetivo: <strong>{objetivo}</strong></p>
          <p>Travamento: <strong>{travamento}</strong></p>
          <p>TreinoCasa: <strong>{treinoCasa}</strong></p>
        </div>

        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded font-bold">
          Finalizar inscrição
        </button>
      </form>
    </div>
  );
}
