import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import EnqueteIdade from "./components/EnqueteIdade";
import EnqueteObjetivo from "./components/EnqueteObjetivo";
import EnqueteBiotipo from "./components/EnqueteBiotipo";
import EnqueteTravamento from "./components/EnqueteTravamento";
import EnqueteDepoimento from "./components/EnqueteDepoimento";
import EnqueteDesafioAgoravai from "./components/EnqueteDesafioAgoravai";
import Desafio40PlayFeatures from "./components/Desafio40PlayFeatures";
import DuvidaGarantia from "./components/DuvidaGarantia";
import CadastroAluno from "./components/CadastroAluno";
import Admin from "./pages/Admin";

export default function App() {
  const [step, setStep] = useState<
    | "capa"
    | "idade"
    | "biotipo"
    | "objetivo"
    | "travamento"
    | "depoimento"
    | "desafioAgoravai"
    | "features"
    | "cadastro"
    | "duvidas"
    | "final"
  >("capa");
  const [idadeSelecionada, setIdadeSelecionada] = useState<string | null>(null);
  const [biotipoSelecionado, setBiotipoSelecionado] = useState<string | null>(null);
  const [objetivoSelecionado, setObjetivoSelecionado] = useState<string | null>(null);
  const [travamentoSelecionado, setTravamentoSelecionado] = useState<string | null>(null);

  function textoDepoimento(travamento: string | null) {
    switch (travamento) {
      case "começo animada mas logo desanimo":
        return "Se você costuma começar cheia de energia e acaba desanimando, veja o que mulheres reais que passaram por isso têm a dizer após treinarem conosco:";
      case "não tenho tempo":
        return "Se o tempo sempre foi seu maior desafio, assista a esses depoimentos de mulheres que encontraram uma forma prática de se cuidar, mesmo na rotina corrida:";
      case "não consigo fazer sozinha":
        return "Se você sente dificuldade em treinar sozinha, confira como outras alunas superaram isso com nosso apoio e motivação:";
      case "não vejo resultado":
        return "Se você já tentou de tudo e não vê resultados, veja os relatos de quem finalmente conquistou mudanças reais:";
      default:
        return "Veja o que nossas alunas contam sobre vencer desafios e transformar sua rotina de treinos!";
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* CAPA */}
              {step === "capa" && (
                <div className="custom-bg px-2 flex flex-col items-center space-y-6">
                  <div className="backdrop-blur-lg bg-blue-800/75 p-5 rounded-3xl shadow-2xl shadow-blue-900/50 w-full max-w-sm border-4 border-blue-600
                    transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_12px_32px_8px_rgba(0,0,60,0.35)] 
                    ring-2 ring-yellow-300/40 drop-shadow-lg"
                  >
                    <h1 className="text-2xl font-extrabold text-white mb-3 drop-shadow-lg">
                      Bem-vinda ao Desafio 40+ Play!
                    </h1>
                    <p className="text-white mb-6 font-medium drop-shadow">
                      Faça parte do desafio mais divertido e motivador para mulheres com mais de 40 anos!
                    </p>
                    <button
                      className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-blue-900 font-bold px-6 py-2 rounded-xl text-lg shadow-lg hover:scale-105 hover:brightness-105 transition-all duration-300 ring-2 ring-yellow-100/50"
                      onClick={() => setStep("idade")}
                    >
                      Quero participar
                    </button>
                  </div>
                </div>
              )}

              {/* ENQUETE IDADE */}
              {step === "idade" && !idadeSelecionada && (
                <div className="custom-bg px-2">
                  <EnqueteIdade
                    onSelect={(idade) => {
                      setIdadeSelecionada(idade);
                      setStep("biotipo");
                    }}
                  />
                </div>
              )}

              {/* ENQUETE BIOTIPO */}
              {step === "biotipo" && idadeSelecionada && !biotipoSelecionado && (
                <div className="custom-bg px-2">
                  <EnqueteBiotipo
                    onSelect={(biotipo) => {
                      setBiotipoSelecionado(biotipo);
                      setStep("objetivo");
                    }}
                  />
                </div>
              )}

              {/* ENQUETE OBJETIVO */}
              {step === "objetivo" && idadeSelecionada && biotipoSelecionado && !objetivoSelecionado && (
                <div className="custom-bg px-2">
                  <EnqueteObjetivo
                    onSelect={(objetivo) => {
                      setObjetivoSelecionado(objetivo);
                      setStep("travamento");
                    }}
                  />
                </div>
              )}

              {/* ENQUETE TRAVAMENTO */}
              {step === "travamento" &&
                idadeSelecionada &&
                biotipoSelecionado &&
                objetivoSelecionado &&
                !travamentoSelecionado && (
                  <div className="custom-bg px-2">
                    <EnqueteTravamento
                      onSelect={(travamento) => {
                        setTravamentoSelecionado(travamento);
                        setStep("depoimento");
                      }}
                    />
                  </div>
                )}

              {/* DEPOIMENTO */}
              {step === "depoimento" &&
                idadeSelecionada &&
                biotipoSelecionado &&
                objetivoSelecionado &&
                travamentoSelecionado && (
                  <div className="custom-bg px-2">
                    <div className="depoimento-video-bloco">
                      <div className="mb-4 text-lg font-bold text-center text-indigo-900">
                        {textoDepoimento(travamentoSelecionado)}
                      </div>

                      {/* EnqueteDepoimento recebe os props obrigatórios */}
                      <EnqueteDepoimento
                        travamento={travamentoSelecionado}
                        onContinue={() => setStep("desafioAgoravai")}
                        onDoubt={() => setStep("duvidas")}
                      />
                    </div>
                  </div>
                )}

              {/* EXPLICAÇÃO DO DESAFIO - AGORAVAI */}
              {step === "desafioAgoravai" &&
                idadeSelecionada &&
                biotipoSelecionado &&
                objetivoSelecionado &&
                travamentoSelecionado && (
                  <EnqueteDesafioAgoravai onContinue={() => setStep("features")} />
                )}

              {/* FEATURES DO DESAFIO */}
              {step === "features" &&
                idadeSelecionada &&
                biotipoSelecionado &&
                objetivoSelecionado &&
                travamentoSelecionado && (
                  <Desafio40PlayFeatures onContinue={() => setStep("cadastro")} />
                )}

              {/* CADASTRO (nome + whatsapp) */}
              {step === "cadastro" &&
                idadeSelecionada &&
                biotipoSelecionado &&
                objetivoSelecionado &&
                travamentoSelecionado && (
                  <div className="custom-bg px-2">
                    <CadastroAluno
                      idade={idadeSelecionada || ""}
                      biotipo={biotipoSelecionado || ""}
                      objetivo={objetivoSelecionado || ""}
                      travamento={travamentoSelecionado || ""}
                      treinoCasa={"desafio40play"}
                      onContinue={() => {
                        setStep("final");
                      }}
                    />
                  </div>
                )}

              {/* GARANTIA PARA DÚVIDAS */}
              {step === "duvidas" && (
                <div className="custom-bg px-2">
                  {/* DuvidaGarantia tem onConfirm, não é EnqueteDepoimento */}
                  <DuvidaGarantia onConfirm={() => setStep("depoimento")} />
                </div>
              )}

              {/* FINAL */}
              {step === "final" &&
                idadeSelecionada &&
                biotipoSelecionado &&
                objetivoSelecionado &&
                travamentoSelecionado && (
                  <div className="custom-bg px-2">
                    <div className="backdrop-blur-lg bg-green-700/80 p-5 rounded-3xl shadow-2xl shadow-green-900/50 w-full max-w-sm border-4 border-green-900 text-center
                      transform transition-transform duration-300
                      md:mb-0 mb-3"
                    >
                      <h1 className="text-xl font-bold text-white mb-3">Obrigado!</h1>
                      <p className="text-white">Sua faixa etária: <span className="font-bold">{idadeSelecionada}</span></p>
                      <p className="text-white">Seu biotipo: <span className="font-bold">{biotipoSelecionado}</span></p>
                      <p className="text-white">Seu objetivo: <span className="font-bold">{objetivoSelecionado}</span></p>
                      <p className="text-white">O que mais te trava: <span className="font-bold">{travamentoSelecionado}</span></p>
                      <p className="text-white">Sobre o desafio 40+ Play</p>
                      <a
                        href="https://chat.whatsapp.com/DboiSaIt3WW9ua5Mv76bmb"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: 24,
                          background: "#25D366",
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 18,
                          padding: "12px 28px",
                          borderRadius: 12,
                          textDecoration: "none",
                          boxShadow: "0 2px 8px #25D36644",
                          transition: "background 0.18s"
                        }}
                      >
                        Entrar no Grupo Exclusivo do WhatsApp
                      </a>
                    </div>
                  </div>
                )}
            </>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}
