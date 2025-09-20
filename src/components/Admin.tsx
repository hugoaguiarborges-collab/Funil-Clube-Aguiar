import { useState } from "react";

type Lead = {
  nome: string;
  whatsapp: string;
  data?: string;
};

export default function Admin() {
  // Carrega leads do localStorage
  const [leads, setLeads] = useState<Lead[]>(() =>
    JSON.parse(localStorage.getItem("leads") || "[]")
  );

  // Atualizar leads manualmente (caso algum lead novo seja salvo em outra aba)
  function atualizarLeads() {
    setLeads(JSON.parse(localStorage.getItem("leads") || "[]"));
  }

  // Exportar para CSV
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

  // Gerar mensagem em massa para WhatsApp Web (um link para cada contato)
  function abrirTodosWhatsApp() {
    leads.forEach((lead) => {
      const numeroLimpo = lead.whatsapp.replace(/\D/g, "");
      // Mensagem personalizada (pode editar!)
      const msg = encodeURIComponent(
        `Olá ${lead.nome}, tudo bem? Obrigado por se inscrever no Desafio 40+ Play!`
      );
      window.open(`https://wa.me/55${numeroLimpo}?text=${msg}`, "_blank");
    });
  }

  // Copiar todos os links WhatsApp para área de transferência
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

  // Ação individual: abrir WhatsApp para lead
  function abrirUmWhatsApp(lead: Lead) {
    const numeroLimpo = lead.whatsapp.replace(/\D/g, "");
    const msg = encodeURIComponent(
      `Olá ${lead.nome}, tudo bem? Obrigado por se inscrever no Desafio 40+ Play!`
    );
    window.open(`https://wa.me/55${numeroLimpo}?text=${msg}`, "_blank");
  }

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
}
