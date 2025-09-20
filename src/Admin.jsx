import React from "react";

export default function Admin() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #e0e7ff 0%, #f0f4ff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1 style={{ color: "#222b45", fontSize: "2.2rem", marginBottom: "0.5em" }}>Área Administrativa</h1>
      <p style={{ color: "#525f7f", fontSize: "1.1rem", textAlign: "center" }}>
        Bem-vindo, administrador! <br />
        Aqui você pode gerenciar as enquetes, visualizar resultados e editar conteúdos do Clube Aguiar.
      </p>
      {/* Adicione botões e funcionalidades administrativas aqui se desejar */}
    </div>
  );
}
