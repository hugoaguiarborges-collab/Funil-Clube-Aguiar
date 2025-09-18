import { useState } from "react";
import EnqueteIdade from "./components/EnqueteIdade";
import EnqueteObjetivo from "./components/EnqueteObjetivo";
import EnqueteResumoObjetivos from "./components/EnqueteResumoObjetivos";
import EnqueteTravamento from "./components/EnqueteTravamento";
import EnqueteBiotipo from "./components/EnqueteBiotipo";
import EnqueteTreinoCasa from "./components/EnqueteTreinoCasa";

export default function App() {
  const [step, setStep] = useState<
    | "capa"
    | "idade"
    | "biotipo"
    | "objetivo"
    | "resumo"
    | "travamento"
    | "treinoCasa"
    | "final"
  >("capa");
  const [idadeSelecionada, setIdadeSelecionada] = useState<string | null>(null);
  const [biotipoSelecionado, setBiotipoSelecionado] = useState<string | null>(null);
  const [objetivoSelecionado, setObjetivoSelecionado] = useState<string | null>(null);
  const [travamentoSelecionado, setTravamentoSelecionado] = useState<string | null>(null);
  const [treinoCasaSelecionado, setTreinoCasaSelecionado] = useState<string | null>(null);

  // CAPA
  if (step === "capa") {
    return (
      <div className="custom-bg px-2">
        <div className="backdrop-blur-lg bg-blue-800/75 p-5 rounded-3xl shadow-2xl shadow-blue-900/50 w-full max-w-sm border-4 border-blue-600
          transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_12px_32px_8px_rgba(0,0,60,0.35)] 
          ring-2 ring-yellow-300/40 drop-shadow-lg"
        >
          <h1 className="text-2xl font-extrabold text-white mb-3 drop-shadow-lg">
            Bem-vinda ao Desafio 40+ Play!
          </h1>
          <p className="text-white mb-6 font-medium drop-shadow">
            Faça parte do desafio mais divertido e motivador para mulheres com mais de 40 anos
          </p>
          <button
            className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-blue-900 font-bold px-6 py-2 rounded-xl text-lg shadow-lg hover:scale-105 hover:brightness-105 transition-all duration-300 ring-2 ring-yellow-100/50"
            onClick={() => setStep("idade")}
          >
            Quero participar
          </button>
        </div>
      </div>
    );
  }

  // ENQUETE IDADE
  if (step === "idade" && !idadeSelecionada) {
    return (
      <div className="custom-bg px-2">
        <EnqueteIdade
          onSelect={(idade) => {
            setIdadeSelecionada(idade);
            setStep("biotipo");
          }}
        />
      </div>
    );
  }

  // ENQUETE BIOTIPO
  if (step === "biotipo" && idadeSelecionada && !biotipoSelecionado) {
    return (
      <div className="custom-bg px-2">
        <EnqueteBiotipo
          onSelect={(biotipo) => {
            setBiotipoSelecionado(biotipo);
            setStep("objetivo");
          }}
        />
      </div>
    );
  }

  // ENQUETE OBJETIVO
  if (step === "objetivo" && idadeSelecionada && biotipoSelecionado && !objetivoSelecionado) {
    return (
      <div className="custom-bg px-2">
        <EnqueteObjetivo
          onSelect={(objetivo) => {
            setObjetivoSelecionado(objetivo);
            setStep("resumo");
          }}
        />
      </div>
    );
  }

  // ENQUETE RESUMO DOS OBJETIVOS
  if (step === "resumo" && idadeSelecionada && biotipoSelecionado && objetivoSelecionado) {
    return (
      <div className="custom-bg px-2">
        <EnqueteResumoObjetivos
          onYes={() => setStep("travamento")}
          onNo={() => setStep("travamento")}
        />
      </div>
    );
  }

  // ENQUETE TRAVAMENTO
  if (
    step === "travamento" &&
    idadeSelecionada &&
    biotipoSelecionado &&
    objetivoSelecionado &&
    !travamentoSelecionado
  ) {
    return (
      <div className="custom-bg px-2">
        <EnqueteTravamento
          onSelect={(travamento) => {
            setTravamentoSelecionado(travamento);
            setStep("treinoCasa");
          }}
        />
      </div>
    );
  }

  // ENQUETE TREINO EM CASA
  if (
    step === "treinoCasa" &&
    idadeSelecionada &&
    biotipoSelecionado &&
    objetivoSelecionado &&
    travamentoSelecionado &&
    !treinoCasaSelecionado
  ) {
    return (
      <div className="custom-bg px-2">
        <EnqueteTreinoCasa
          onSelect={(treinoCasa) => {
            setTreinoCasaSelecionado(treinoCasa);
            setStep("final");
          }}
        />
      </div>
    );
  }

  // FINAL
  if (
    step === "final" &&
    idadeSelecionada &&
    biotipoSelecionado &&
    objetivoSelecionado &&
    travamentoSelecionado &&
    treinoCasaSelecionado
  ) {
    return (
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
          <p className="text-white">Sobre treinar em casa: <span className="font-bold">{treinoCasaSelecionado}</span></p>
        </div>
      </div>
    );
  }

  return null;
}
