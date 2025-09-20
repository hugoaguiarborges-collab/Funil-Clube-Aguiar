import { useState } from "react";

export default function CadastroAluno() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [erro, setErro] = useState("");

  function validarNumero(numero: string) {
    // Aceita (XX) 9XXXXXXX ou XX9XXXXXXXX ou 11999999999
    return /^(\(?\d{2}\)?\s?)?\d{9}$/.test(numero.replace(/\D/g, ""));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (nome.trim().length < 2) {
      setErro("Digite seu nome completo.");
      return;
    }
    if (!validarNumero(whatsapp)) {
      setErro("Digite um número de WhatsApp válido (com DDD).");
      return;
    }
    setErro("");

    // Opcional: salve no localStorage
    localStorage.setItem("aluna_nome", nome);
    localStorage.setItem("aluna_whatsapp", whatsapp);

    // Direciona para o WhatsApp (personalize o link se quiser mensagem automática)
    const numeroLimpo = whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/55${numeroLimpo}`, "_blank");
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen py-10 bg-white">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">
          Preencha seus dados para avançar
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block font-semibold mb-1" htmlFor="nome">
              Nome completo:
            </label>
            <input
              id="nome"
              type="text"
              className="w-full border rounded px-4 py-3 focus:outline-blue-600"
              placeholder="Digite seu nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="whatsapp">
              WhatsApp (com DDD):
            </label>
            <input
              id="whatsapp"
              type="tel"
              className="w-full border rounded px-4 py-3 focus:outline-blue-600"
              placeholder="Ex: 11999999999"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              required
            />
          </div>
          {erro && (
            <div className="text-red-600 text-center">{erro}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-lg mt-2 transition"
          >
            Avançar para o WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
