"use client";

import {
  Circle,
  BarChart3,
  Users,
  FileText,
  Layers,
  Cpu,
  Bell,
} from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

function DashboardMockup() {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(15,22,36,0.06)] bg-[#F7F8FA] flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-1 rounded bg-white border border-[rgba(15,22,36,0.08)] text-[11px] text-[#5B6478] font-mono">
            app.garbatosolution.com.br/dashboard
          </div>
        </div>
      </div>

      {/* Dashboard layout */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-16 md:w-20 flex-shrink-0 bg-gradient-to-b from-[#3B82F6] to-[#7C3AED] flex flex-col items-center py-5 gap-4">
          <div className="w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center">
            <Circle className="w-4 h-4 text-white fill-white" />
          </div>
          {[BarChart3, Users, FileText, Layers, Cpu].map((Icon, i) => (
            <button
              key={i}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                i === 0
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 overflow-hidden flex flex-col bg-[#FAFBFC]">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(15,22,36,0.06)] bg-white flex-shrink-0">
            <div>
              <div className="text-sm md:text-base font-semibold text-[#0A0B14]">
                Dashboard Operacional
              </div>
              <div className="text-[11px] md:text-xs text-[#8D95A8]">
                Visão geral — Abril 2025
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-4 h-4 text-[#5B6478]" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#3B82F6]" />
              </div>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#7C3AED]" />
            </div>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-4 gap-3 px-5 py-4">
            {[
              { label: "Receita", value: "R$ 284k", change: "+12%", up: true },
              { label: "Contratos", value: "142", change: "+8", up: true },
              { label: "Pendências", value: "23", change: "-5", up: false },
              { label: "Eficiência", value: "94%", change: "+3%", up: true },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-white rounded-xl p-3 border border-[rgba(15,22,36,0.06)] shadow-[0_1px_2px_rgba(15,22,36,0.03)]"
              >
                <div className="text-[10px] md:text-[11px] text-[#8D95A8] mb-1">
                  {m.label}
                </div>
                <div className="text-sm md:text-lg font-bold text-[#0A0B14]">
                  {m.value}
                </div>
                <div
                  className={`text-[10px] md:text-[11px] font-medium ${
                    m.up ? "text-[#059669]" : "text-[#D97706]"
                  }`}
                >
                  {m.change}
                </div>
              </div>
            ))}
          </div>

          {/* Chart + list */}
          <div className="flex gap-3 px-5 pb-5 flex-1 min-h-0">
            {/* Chart area */}
            <div className="flex-1 bg-white rounded-2xl border border-[rgba(15,22,36,0.06)] p-4 flex flex-col shadow-[0_1px_2px_rgba(15,22,36,0.03)]">
              <div className="text-xs md:text-sm text-[#5B6478] font-semibold mb-3">
                Crescimento Mensal
              </div>
              <div className="flex-1 flex items-end gap-1.5">
                {[35, 55, 42, 68, 52, 80, 65, 90, 72, 95, 83, 100].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md"
                      style={{
                        height: `${h}%`,
                        background:
                          i === 11
                            ? "linear-gradient(to top, #3B82F6, #06B6D4)"
                            : i >= 9
                            ? "rgba(59,130,246,0.55)"
                            : "rgba(59,130,246,0.28)",
                      }}
                    />
                  )
                )}
              </div>
              <div className="flex justify-between mt-2">
                {["Jan", "Abr", "Jul", "Out", "Dez"].map((m) => (
                  <div key={m} className="text-[9px] md:text-[10px] text-[#8D95A8]">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent list */}
            <div className="w-36 md:w-44 bg-white rounded-2xl border border-[rgba(15,22,36,0.06)] p-4 shadow-[0_1px_2px_rgba(15,22,36,0.03)]">
              <div className="text-[10px] md:text-xs text-[#5B6478] font-semibold mb-3">
                Recentes
              </div>
              {[
                { name: "Contrato #284", status: "ok" },
                { name: "Proposta #92", status: "pending" },
                { name: "NF-e emitida", status: "ok" },
                { name: "Lead qualif.", status: "ok" },
                { name: "Pagamento OK", status: "ok" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-1.5 border-b border-[rgba(15,22,36,0.05)] last:border-0"
                >
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      item.status === "ok" ? "bg-[#10B981]" : "bg-[#F59E0B]"
                    }`}
                  />
                  <div className="text-[10px] md:text-[11px] text-[#5B6478] truncate">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductScroll() {
  return (
    <section className="relative overflow-hidden bg-white" id="produto">
      <ContainerScroll
        titleComponent={
          <div className="mb-4">
            <span className="badge-blue mb-4 inline-flex">Veja na prática</span>
            <h2
              className="text-3xl sm:text-4xl xl:text-5xl font-bold text-[#0A0B14] mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Sistemas que sua equipe{" "}
              <span className="text-gradient-blue">realmente usa</span>
            </h2>
            <p className="text-[#5B6478] text-lg max-w-xl mx-auto">
              Interfaces limpas, dados centralizados e visão gerencial em tempo
              real — desenhados para a operação do seu negócio.
            </p>
          </div>
        }
      >
        <DashboardMockup />
      </ContainerScroll>
    </section>
  );
}
