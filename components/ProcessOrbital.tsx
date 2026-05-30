"use client";

import {
  Search,
  LayoutPanelLeft,
  Palette,
  Code2,
  Rocket,
  RefreshCcw,
} from "lucide-react";
import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Levantamento",
    date: "Etapa 01",
    content:
      "Mergulhamos na operação da empresa. Entrevistas, mapeamento de processos e identificação de gargalos antes de qualquer linha de código.",
    category: "Descoberta",
    icon: Search,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Estruturação",
    date: "Etapa 02",
    content:
      "Definimos a arquitetura do sistema, os módulos necessários, as regras de negócio e o fluxo de uso de cada perfil de usuário.",
    category: "Arquitetura",
    icon: LayoutPanelLeft,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Protótipo",
    date: "Etapa 03",
    content:
      "Criamos o protótipo navegável com as interfaces do sistema. Validamos com o cliente antes de iniciar o desenvolvimento.",
    category: "Design",
    icon: Palette,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 70,
  },
  {
    id: 4,
    title: "Desenvolvimento",
    date: "Etapa 04",
    content:
      "Desenvolvimento em sprints com entregas incrementais. O cliente acompanha o progresso e valida cada funcionalidade.",
    category: "Build",
    icon: Code2,
    relatedIds: [3, 5],
    status: "in-progress",
    energy: 55,
  },
  {
    id: 5,
    title: "Implantação",
    date: "Etapa 05",
    content:
      "Treinamento da equipe, migração de dados e lançamento supervisionado para garantir uma transição sem impacto na operação.",
    category: "Deploy",
    icon: Rocket,
    relatedIds: [4, 6],
    status: "pending",
    energy: 30,
  },
  {
    id: 6,
    title: "Evolução",
    date: "Contínuo",
    content:
      "O sistema cresce com o negócio. Novos módulos, integrações e melhorias são planejadas e implementadas de forma contínua.",
    category: "Suporte",
    icon: RefreshCcw,
    relatedIds: [5],
    status: "pending",
    energy: 15,
  },
];

export default function ProcessOrbital() {
  return (
    <section
      id="processo"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(15,22,36,0.10)] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="badge-blue mb-4 inline-flex">Como trabalhamos</span>
          <h2
            className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#0A0B14] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Do levantamento à{" "}
            <span className="text-gradient-blue">evolução contínua</span>
          </h2>
          <p className="text-[#5B6478] text-lg max-w-xl mx-auto">
            Um processo estruturado em órbita. Clique em cada etapa para ver os
            detalhes e as conexões entre as fases do projeto.
          </p>
        </div>

        {/* Orbital timeline */}
        <RadialOrbitalTimeline timelineData={timelineData} />
      </div>
    </section>
  );
}
