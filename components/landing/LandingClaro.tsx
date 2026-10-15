"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Plus, Minus } from "lucide-react"

const WHATSAPP = "5543988585127"

/* ───────────────────────────────────────────────────────────────────
 * Sistemas: só entra o que é verificável. `status` é opcional de
 * propósito — se um sistema sair do ar, tire o status, não deixe
 * envelhecer. Mesma regra do CasesSection do site principal.
 * ─────────────────────────────────────────────────────────────── */
const SISTEMAS = [
  {
    tipo: "Cliente corporativo",
    cliente: "Indústria multinacional",
    titulo: "Portal de peças e pedidos",
    desc: "Pedido, negociação e acompanhamento de peças num portal só, no lugar de planilha e e-mail solto.",
    status: "Em implantação",
  },
  {
    tipo: "Plataforma própria",
    cliente: "BlessSystem Clinic",
    titulo: "Gestão completa para clínicas",
    desc: "Agenda, confirmação por WhatsApp, prontuário e financeiro no mesmo lugar — para a clínica que hoje marca no caderno e fecha o mês no Excel.",
    status: "Em operação",
  },
  {
    tipo: "Plataforma própria",
    cliente: "ERP Imobiliário e Financeiro",
    titulo: "Da captação à rescisão, num sistema só",
    desc: "O ciclo inteiro do contrato dentro de um sistema, com o financeiro conversando com a operação.",
    status: "Em operação",
  },
]

/* Depoimentos: a seção só aparece quando houver depoimento REAL, com
 * nome, cargo e empresa de quem autorizou. Enquanto o array estiver
 * vazio, a seção não renderiza — é melhor não ter do que ter inventado. */
const DEPOIMENTOS: { nome: string; cargo: string; texto: string }[] = []

const FAQ = [
  {
    q: "Em quanto tempo eu tenho alguma coisa rodando?",
    a: "Depende do tamanho, e o diagnóstico existe para responder isso com número em vez de chute. O que não muda é a ordem: primeiro vai para o ar a parte que resolve o seu gargalo, não o sistema inteiro de uma vez.",
  },
  {
    q: "Vocês trabalham com sistema pronto ou fazem do zero?",
    a: "Do zero, para o jeito que a sua empresa já trabalha. Nada vem de template de terceiro — é por isso que o sistema se encaixa na operação em vez de obrigar a operação a se encaixar nele.",
  },
  {
    q: "E se eu já tiver um sistema e quiser só integrar?",
    a: "Também fazemos. Boa parte do trabalho é exatamente isso: ligar o que já existe — ERP, planilha, WhatsApp, banco — para parar a digitação dupla.",
  },
  {
    q: "O que é o Diagnóstico de Operação?",
    a: "Uma conversa de uma hora em que eu olho como a sua operação funciona hoje e te digo onde está o gargalo e o que ele custa por mês. É gratuito e não obriga a nada depois.",
  },
  {
    q: "Quem vai tocar o meu projeto?",
    a: "Eu, Juan. Quem escreve o código é quem responde o seu WhatsApp — não tem call center, nem nível 1, nem ticket.",
  },
]

export default function Start() {
  const [aberta, setAberta] = useState<number | null>(0)
  const [form, setForm] = useState({
    nome: "", empresa: "", whatsapp: "", email: "", assunto: "", tamanho: "", problema: "",
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value })

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    const msg = [
      `Olá, quero o Diagnóstico de Operação.`,
      ``,
      `Nome: ${form.nome}`,
      form.empresa && `Empresa: ${form.empresa}`,
      form.email && `E-mail: ${form.email}`,
      form.assunto && `Preciso de: ${form.assunto}`,
      form.tamanho && `Tamanho da operação: ${form.tamanho}`,
      form.problema && ``,
      form.problema && `O que quero resolver: ${form.problema}`,
    ].filter(Boolean).join("\n")
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank")
  }

  return (
    <>
      {/* ── navegação ─────────────────────────────────────────── */}
      <nav className="nav">
        <div className="wrap nav-inner">
          <Link href="/" scroll={true} style={{ fontWeight: 700, fontSize: 18, color: "var(--ink)", textDecoration: "none", letterSpacing: "-0.02em" }}>
            Garbato<span style={{ color: "var(--accent)" }}>.</span>
          </Link>
          <div style={{ display: "flex", gap: 26, marginLeft: "auto" }}>
            <a className="link" href="#como">Como funciona</a>
            <a className="link" href="#sistemas">Sistemas</a>
            <a className="link" href="#faq">Perguntas</a>
          </div>
          <a className="btn btn-dark" href="#contato">Diagnóstico gratuito</a>
        </div>
      </nav>

      {/* ── 1. hero ───────────────────────────────────────────── */}
      <section>
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Software sob medida</p>
            <h1>
              O sistema da sua operação,{" "}
              <span className="mark">construído do zero para ela</span>
            </h1>
            <p className="lead" style={{ marginBottom: 32 }}>
              ERP, CRM, financeiro, dashboards e automação feitos para o jeito que a
              sua empresa já trabalha. Nada vem de template de terceiro.
            </p>
            <a className="btn btn-accent" href="#contato">
              Quero meu diagnóstico gratuito <ArrowRight size={17} />
            </a>
          </div>

          {/* Moldura de produto. A barra do navegador avisa "dados fictícios",
              mesma convenção do ProductScroll — é o que permite número aqui. */}
          <div className="shot-wrap" style={{ position: "relative" }} aria-hidden="true">
            <div className="shot">
              <div className="chrome">
                <span className="dot" style={{ background: "#FF5F57" }} />
                <span className="dot" style={{ background: "#FEBC2E" }} />
                <span className="dot" style={{ background: "#28C840" }} />
                <span className="url">app.garbatosolution.com.br/dashboard</span>
                <span className="fict">dados fictícios</span>
              </div>

              <div className="app">
                <div className="rail">
                  <div className="mk">Garbato</div>
                  <span className="sel">Dashboard</span>
                  <span>Pedidos</span>
                  <span>Clientes</span>
                  <span>Financeiro</span>
                  <span>Estoque</span>
                </div>

                <div className="board">
                  <div className="kpis">
                    <div className="kpi"><i>Receita</i><b>R$ 284k</b><em>+12%</em></div>
                    <div className="kpi"><i>Contratos</i><b>142</b><em>+8</em></div>
                    <div className="kpi"><i>Pendências</i><b>23</b><em>−5</em></div>
                  </div>
                  <div className="panel">
                    <h4>Faturamento por mês</h4>
                    <div className="cols">
                      {[44, 58, 50, 71, 63, 86, 74].map((h, i) => (
                        <div key={i} className={`col${i === 5 ? " on" : ""}`} style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="float">
              <div className="t">Tempo no fechamento</div>
              <div className="v">1h 20min</div>
              <div className="s">−68% vs. planilha</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. como funciona ──────────────────────────────────── */}
      <section id="como">
        <div className="wrap">
          <p className="eyebrow">Como funciona</p>
          <h2>Três passos até saber o que fazer.</h2>
          <div className="grid3">
            {[
              ["Diagnóstico gratuito de uma hora", "Eu olho como a sua operação funciona hoje e te digo onde está o gargalo e quanto ele custa por mês."],
              ["Proposta com escopo e telas", "Você vê as telas principais e o escopo antes de assumir qualquer compromisso."],
              ["Construção acompanhada", "Você acompanha o que está sendo feito em vez de esperar a entrega final para descobrir."],
            ].map(([t, d], i) => (
              <div key={t} className="card">
                <div className="step-num">{i + 1}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. sistemas ───────────────────────────────────────── */}
      <section id="sistemas" className="tint">
        <div className="wrap">
          <p className="eyebrow">Sistemas selecionados</p>
          <h2>Software que a gente construiu, rodando de verdade.</h2>
          <div className="grid3">
            {SISTEMAS.map((s) => (
              <div key={s.cliente} className="card">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  <span className="chip">{s.tipo}</span>
                  {s.status && <span className="chip chip-live">{s.status}</span>}
                </div>
                <h3>{s.titulo}</h3>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-faint)", marginBottom: 10 }}>
                  {s.cliente}
                </p>
                <p style={{ fontSize: 15 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. depoimentos (só com nome real) ─────────────────── */}
      {DEPOIMENTOS.length > 0 && (
        <section id="depoimentos">
          <div className="wrap">
            <p className="eyebrow">O que dizem os clientes</p>
            <h2>Nas palavras deles.</h2>
            <div className="grid2">
              {DEPOIMENTOS.map((d) => (
                <div key={d.nome} className="card">
                  <p style={{ fontSize: 17, color: "var(--ink)", marginBottom: 18 }}>“{d.texto}”</p>
                  <p style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)" }}>{d.nome}</p>
                  <p className="small">{d.cargo}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. faq ────────────────────────────────────────────── */}
      <section id="faq" className="tint">
        <div className="wrap narrow">
          <p className="eyebrow">Dúvidas</p>
          <h2>Antes de entrar em contato.</h2>
          {FAQ.map((f, i) => (
            <div key={f.q} className="faq-item">
              <button className="faq-q" onClick={() => setAberta(aberta === i ? null : i)} aria-expanded={aberta === i}>
                {f.q}
                {aberta === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {aberta === i && <p className="faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. contato ────────────────────────────────────────── */}
      <section id="contato">
        <div className="wrap grid2">
          <div>
            <p className="eyebrow">Fale com a gente</p>
            <h2 style={{ marginBottom: 20 }}>Conte o que está te custando tempo hoje.</h2>
            <p style={{ marginBottom: 16 }}>
              Preencha e o WhatsApp abre com tudo escrito. Respondo em até um dia útil.
            </p>
            <p className="small">
              A Garbato é de uma pessoa só — eu. Por isso pego poucos projetos por vez.
            </p>
          </div>

          <form onSubmit={enviar} className="card">
            <div className="field">
              <label htmlFor="nome">Nome completo</label>
              <input id="nome" required value={form.nome} onChange={set("nome")} />
            </div>
            <div className="field">
              <label htmlFor="empresa">Empresa</label>
              <input id="empresa" value={form.empresa} onChange={set("empresa")} />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" value={form.email} onChange={set("email")} />
            </div>
            <div className="field">
              <label htmlFor="assunto">Em que posso ajudar?</label>
              <select id="assunto" value={form.assunto} onChange={set("assunto")}>
                <option value="">Selecione uma opção</option>
                <option>Sistema sob medida</option>
                <option>IA e automação</option>
                <option>Integrar sistemas que já existem</option>
                <option>Dashboards e relatórios</option>
                <option>Ainda não sei</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="tamanho">Quantas pessoas trabalham na operação?</label>
              <select id="tamanho" value={form.tamanho} onChange={set("tamanho")}>
                <option value="">Selecione uma opção</option>
                <option>1 a 5 pessoas</option>
                <option>6 a 10 pessoas</option>
                <option>11 a 30 pessoas</option>
                <option>31 a 50 pessoas</option>
                <option>Mais de 50 pessoas</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="problema">O que você quer resolver?</label>
              <textarea id="problema" rows={3} value={form.problema} onChange={set("problema")} />
            </div>
            <button className="btn btn-accent" type="submit" style={{ width: "100%", justifyContent: "center" }}>
              Quero meu diagnóstico gratuito <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </section>

      <footer>
        <div className="wrap" style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
          <span>© {new Date().getFullYear()} Garbato Solution</span>
          <Link href="/completo" style={{ color: "inherit", marginLeft: "auto" }}>Ver o site completo</Link>
        </div>
      </footer>
    </>
  )
}
