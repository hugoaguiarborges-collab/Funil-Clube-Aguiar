import React, { useState } from "react";

// Altere para uma senha segura. Só quem souber poderá acessar o admin!
const SENHA_ADMIN = "112233hugo";

type Lead = {
  nome: string;
  whatsapp: string;
  data?: string;
};

const Admin: React.FC = () => {
  const [autorizado, setAutorizado] = useState(false);
  const [senha, setSenha] = useState("");
  const [leads, setLeads] = useState<Lead[]>(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("leads") || "[]")
      : []
  );

  // Atualiza os leads manualmente (caso algum lead novo seja salvo em outra aba)
  function atualizarLeads() {
    setLeads(JSON.parse(localStorage.getItem("leads") || "[]"));
  }

  // Exporta os leads para um arquivo CSV (Excel)
  function exportarCSV() {
    const header = "Nome,WhatsApp,Data\n";
    const body = leads
      .map(
        (l) =>
          `"${l.nome.replace(/"/g, "'") || ""}","${l.whatsapp || ""}","${l.data || ""}"`
      )
      .join("\n");
    const csv = header + body;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  // Abre o WhatsApp em uma nova aba para todos os leads (um a um)
  function abrirTodosWhatsApp() {
    leads.forEach((lead) => {
      const numeroLimpo = lead.whatsapp.replace(/\D/g, "");
      const msg = encodeURIComponent(
        `Olá ${lead.nome}, tudo bem? Obrigado por se inscrever no Desafio 40+ Play!`
      );
      window.open(`https://wa.me/55${numeroLimpo}?text=${msg}`, "_blank");
    });
  }

  // Copia todos os links de WhatsApp para área de transferência
  function copiarLinksWhatsApp() {
    const links = leads
      .map((lead) => {
        const numeroLimpo = lead.whatsapp.replace(/\D/g, "");
        return `https://wa.me/55${numeroLimpo}`;
      })
      .join("\n");
    navigator.clipboard.writeText(links);
    alert("Links copiados para a área de transferência!");
  }

  // Abre o WhatsApp individualmente para o lead selecionado
  function abrirUmWhatsApp(lead: Lead) {
    const numeroLimpo = lead.whatsapp.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Olá ${lead.nome}, tudo bem? Obrigado por se inscrever no Desafio 40+ Play!`
    );
    window.open(`https://wa.me/55${numeroLimpo}?text=${msg}`, "_blank");
  }

  // TELA DE SENHA
  if (!autorizado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold mb-3">Área restrita</h2>
        <input
          type="password"
          className="border px-4 py-2 rounded mb-2"
          placeholder="Digite a senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            if (senha === SENHA_ADMIN) setAutorizado(true);
            else alert("Senha incorreta!");
          }}
        >
          Entrar
        </button>
      </div>
    );
  }

  // TELA ADMIN
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin - Lista de Leads</h2>
      <div className="flex gap-3 flex-wrap mb-4">
        <button
          onClick={exportarCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Exportar para Excel (CSV)
        </button>
        <button
          onClick={abrirTodosWhatsApp}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Abrir todos no WhatsApp (um a um)
        </button>
        <button
          onClick={copiarLinksWhatsApp}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Copiar todos os links WhatsApp
        </button>
        <button
          onClick={atualizarLeads}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
        >
          Atualizar lista
        </button>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th className="border p-2">Nome</th>
            <th className="border p-2">WhatsApp</th>
            <th className="border p-2">Data</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 && (
            <tr>
              <td className="border p-2 text-center" colSpan={4}>
                Nenhum lead cadastrado ainda.
              </td>
            </tr>
          )}
          {leads.map((lead, i) => (
            <tr key={i}>
              <td className="border p-2">{lead.nome}</td>
              <td className="border p-2">{lead.whatsapp}</td>
              <td className="border p-2">
                {(lead.data && new Date(lead.data).toLocaleString("pt-BR")) || ""}
              </td>
              <td className="border p-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                  onClick={() => abrirUmWhatsApp(lead)}
                >
                  WhatsApp
                </button>
                <a
                  className="underline text-blue-700"
                  href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
