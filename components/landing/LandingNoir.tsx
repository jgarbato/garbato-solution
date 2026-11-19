"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Plus, Minus } from "lucide-react"

/*
 * Página inicial escura ("noir"): preto, letreiro vermelho gigante, títulos
 * condensados em caixa alta e seções numeradas. O conteúdo é o mesmo da
 * landing clara (LandingClaro.tsx) — só entra o que é verificável.
 *
 * Todo bloco marcado com data-b é animado pelo efeito de montagem
 * (Montagem.tsx): pontinhos → molduras de rascunho → conteúdo.
 */

const WHATSAPP = "5543988585127"

const LABS = [
  "Busca IA com fontes", "Ditado por voz", "Leitor de Nota Fiscal", "Radar de Feedback", "Propostas em PDF",
  "Assistente do Setor", "Construtor de Formulários", "API de IA", "Micro-SaaS", "Editor de sites",
]

// As imagens são ILUSTRAÇÕES geradas, não capturas dos sistemas (ver LandingClaro.tsx).
const PROJETOS = [
  {
    img: "/sistemas/sis-clinica.webp",
    titulo: "BlessSystem Clinic",
    tag: "Plataforma própria",
    status: "Em operação",
    texto: "Agenda, confirmação por WhatsApp, prontuário e financeiro no mesmo lugar, para a clínica que hoje marca no caderno e fecha o mês no Excel.",
  },
  {
    img: "/sistemas/sis-portal-pecas.webp",
    titulo: "Portal de peças e pedidos",
    tag: "Cliente corporativo",
    status: "Em implantação",
    texto: "Pedido, cotação, negociação e acompanhamento de peças num portal só, no lugar de planilha e e-mail solto.",
  },
  {
    img: "/sistemas/sis-erp-imobiliario.webp",
    titulo: "ERP Imobiliário e Financeiro",
    tag: "Plataforma própria",
    status: "Em operação",
    texto: "O ciclo inteiro do contrato, da captação à rescisão, com o financeiro conversando com a operação.",
  },
]

const PASSOS = [
  ["Diagnóstico gratuito de uma hora", "Eu olho como a sua operação funciona hoje e te digo onde está o gargalo e quanto ele custa por mês."],
  ["Proposta com escopo e telas", "Você vê as telas principais e o escopo antes de assumir qualquer compromisso."],
  ["Construção com demo semanal", "Toda semana você vê funcionando o que foi feito. Não um relatório: a tela rodando."],
]

const ENTREGAS = ["ERP sob medida", "CRM comercial", "Financeiro", "Dashboards de gestão", "Automação com IA", "Integrações e APIs"]

const FAQ = [
  {
    q: "Em quanto tempo eu tenho alguma coisa rodando?",
    a: "Depende do tamanho, e o diagnóstico existe para responder isso com número em vez de chute. O que não muda é a ordem: primeiro vai para o ar a parte que resolve o seu gargalo, não o sistema inteiro de uma vez.",
  },
  {
    q: "Vocês trabalham com sistema pronto ou fazem do zero?",
    a: "Do zero, para o jeito que a sua empresa já trabalha. Nada vem de template de terceiro. É por isso que o sistema se encaixa na operação em vez de obrigar a operação a se encaixar nele.",
  },
  {
    q: "E se eu já tiver um sistema e quiser só integrar?",
    a: "Também fazemos. Boa parte do trabalho é exatamente isso: ligar o que já existe (ERP, planilha, WhatsApp, banco) para parar a digitação dupla.",
  },
  {
    q: "O que é o Diagnóstico de Operação?",
    a: "Uma conversa de uma hora em que eu olho como a sua operação funciona hoje e te digo onde está o gargalo e o que ele custa por mês. É gratuito e não obriga a nada depois.",
  },
  {
    q: "Quem vai tocar o meu projeto?",
    a: "Eu, Juan. Quem escreve o código é quem responde o seu WhatsApp. Não tem call center, nem nível 1, nem ticket.",
  },
]

export default function LandingNoir() {
  const [aberta, setAberta] = useState<number | null>(0)
  const [enviado, setEnviado] = useState(false)
  const [form, setForm] = useState({ nome: "", empresa: "", email: "", assunto: "", tamanho: "", problema: "" })

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
    setForm({ nome: "", empresa: "", email: "", assunto: "", tamanho: "", problema: "" })
    setEnviado(true)
    window.setTimeout(() => setEnviado(false), 6000)
  }

  return (
    <>
      <nav className="n-nav">
        <div className="n-wrap n-nav-in">
          <Link href="/" className="n-logo"><i aria-hidden="true" />GARBATO<span>.</span></Link>
          <div className="n-links">
            <a href="#projetos">Projetos</a>
            <a href="#como">Como funciona</a>
            <a href="#sobre">Sobre</a>
            <a href="#duvidas">Dúvidas</a>
            <a href="#contato">Contato</a>
          </div>
          <a className="n-cta-mini" href="#contato">Vamos conversar <ArrowUpRight size={14} /></a>
        </div>
      </nav>

      {/* ── topo ─────────────────────────────────────────────── */}
      <section className="n-hero">
        <div className="n-letreiro" data-b aria-hidden="true">SISTEMAS</div>
        <div className="n-wrap n-hero-grid">
          <div className="n-hero-txt">
            <p className="n-rotulo" data-b><b>Software sob medida</b><br />Automação · Sistemas</p>
            <p className="n-ola" data-b>Olá, eu sou</p>
            <h1 data-b>Juan<span>.</span></h1>
            <p className="n-cargo" data-b>Sistemas sob medida<br />&amp; automação</p>
            <p className="n-lead" data-b>
              Construo o sistema da sua operação do zero: ERP, CRM, financeiro, dashboards e
              automação feitos para o jeito que a sua empresa já trabalha. Nada vem de template.
            </p>
            <a className="n-btn" href="#contato" data-b>Quero meu diagnóstico gratuito <ArrowRight size={16} /></a>
          </div>

          <figure className="n-retrato" data-b>
            <img src="/sistemas/hero-painel.webp" alt="Painéis de vidro flutuantes exibindo interfaces de dashboard"
              width={1200} height={806} fetchPriority="high" />
            <figcaption>Imagem ilustrativa</figcaption>
          </figure>

          <div className="n-numeros">
            <div data-b><b>17</b><span>anos implantando<br />ERP corporativo</span></div>
            <div data-b><b>3</b><span>sistemas próprios<br />e de clientes</span></div>
            <div data-b><b>10</b><span>demos com IA para<br />testar no navegador</span></div>
          </div>
        </div>
      </section>

      {/* ── 01 projetos ──────────────────────────────────────── */}
      <section id="projetos">
        <div className="n-wrap">
          <p className="n-num" data-b>01 / Projetos selecionados</p>
          <h2 data-b>Trabalho que roda sozinho.</h2>
          <div className="n-proj">
            {PROJETOS.map((p, i) => (
              <article key={p.titulo} className="n-card" data-b>
                <div className="n-card-img"><img src={p.img} alt="" width={800} height={470} loading="lazy" /></div>
                <div className="n-card-meta">
                  <span className="n-idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="n-chip">{p.status}</span>
                </div>
                <h3>{p.titulo}</h3>
                <p className="n-tag">{p.tag}</p>
                <p>{p.texto}</p>
              </article>
            ))}
          </div>
          <p className="n-nota" data-b>Imagens ilustrativas. A tela real eu mostro no diagnóstico.</p>
        </div>
      </section>

      {/* ── demos ao vivo (projeto garbato-labs, servido em /labs) ── */}
      <section id="labs" className="n-labs">
        <div className="n-wrap">
          <p className="n-sub" data-b>Dez sistemas com IA que você testa agora, no navegador:</p>
          <div className="n-chips">
            {LABS.map((nome) => <span key={nome} className="n-chip n-chip-o" data-b>{nome}</span>)}
          </div>
          <a className="n-link" href="/labs" data-b>Abrir os sistemas <ArrowUpRight size={15} /></a>
        </div>
      </section>

      {/* ── 02 como funciona ─────────────────────────────────── */}
      <section id="como">
        <div className="n-wrap n-duo">
          <div>
            <p className="n-num" data-b>02 / Como funciona</p>
            <h2 data-b>Do rascunho<br /><em>ao ar.</em></h2>
            <p className="n-lead" data-b>
              Três passos até você saber o que fazer. Primeiro vai para o ar a parte que resolve
              o seu gargalo, não o sistema inteiro de uma vez.
            </p>
          </div>
          <div className="n-janela" data-b>
            <div className="n-janela-barra"><i /><i /><i /><span>diagnostico → proposta → construção</span></div>
            {PASSOS.map(([t, d], i) => (
              <div key={t} className="n-passo">
                <span className="n-idx">{String(i + 1).padStart(2, "0")}</span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 sobre ─────────────────────────────────────────── */}
      <section id="sobre">
        <div className="n-wrap">
          <p className="n-num" data-b>03 / Por trás do código</p>
          <div className="n-sobre">
            <div>
              <h2 data-b>Mais que código.<br />Sistemas que <em>trabalham.</em></h2>
              <p className="n-lead" data-b>
                Passei dezessete anos implantando ERP em corporação, boa parte em Oracle
                E-Business Suite. Sigo nesse mundo: hoje também presto consultoria em ERP corporativo.
              </p>
              <p className="n-lead" data-b>
                Ao atender empresa pequena, vi que as perguntas são exatamente as mesmas: o que dá
                lucro aqui dentro, por que tudo trava quando o dono não está. A diferença é que na
                PME ninguém tem a quem perguntar.
              </p>
            </div>
            <div className="n-col">
              <p className="n-mini" data-b>O que eu construo</p>
              <ul>
                {ENTREGAS.map((e) => <li key={e} data-b><i aria-hidden="true" />{e}</li>)}
              </ul>
            </div>
            <aside className="n-vermelho" data-b>
              <span>“</span>
              <p>Quem escreve o código é quem responde o seu WhatsApp.</p>
              <small>Juan Garbato · Londrina, PR</small>
            </aside>
          </div>
        </div>
      </section>

      {/* ── 04 dúvidas ───────────────────────────────────────── */}
      <section id="duvidas">
        <div className="n-wrap n-faq-grid">
          <div>
            <p className="n-num" data-b>04 / Antes de entrar em contato</p>
            <h2 data-b>Sempre construindo.<br />Sempre <em>no ar.</em></h2>
          </div>
          <div>
            {FAQ.map((f, i) => (
              <div key={f.q} className="n-faq" data-b>
                <button onClick={() => setAberta(aberta === i ? null : i)} aria-expanded={aberta === i}>
                  <span className="n-idx">{String(i + 1).padStart(2, "0")}</span>
                  {f.q}
                  {aberta === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                {aberta === i && <p>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 contato ───────────────────────────────────────── */}
      <section id="contato" className="n-contato">
        <div className="n-wrap n-duo">
          <div>
            <p className="n-num" data-b>05 / Seu próximo projeto</p>
            <h2 data-b>Me conta o que<br />se <em>repete.</em></h2>
            <p className="n-lead" data-b>
              Preencha e o WhatsApp abre com tudo escrito. Respondo em até um dia útil.
            </p>
            <p className="n-nota" data-b>A Garbato é de uma pessoa só: eu. Por isso pego poucos projetos por vez.</p>
          </div>

          <form onSubmit={enviar} className="n-form" data-b>
            <label htmlFor="nome">Nome completo<input id="nome" required value={form.nome} onChange={set("nome")} /></label>
            <label htmlFor="empresa">Empresa<input id="empresa" value={form.empresa} onChange={set("empresa")} /></label>
            <label htmlFor="email">E-mail<input id="email" type="email" value={form.email} onChange={set("email")} /></label>
            <label htmlFor="assunto">Em que posso ajudar?
              <select id="assunto" value={form.assunto} onChange={set("assunto")}>
                <option value="">Selecione uma opção</option>
                <option>Sistema sob medida</option>
                <option>IA e automação</option>
                <option>Integrar sistemas que já existem</option>
                <option>Dashboards e relatórios</option>
                <option>Ainda não sei</option>
              </select>
            </label>
            <label htmlFor="tamanho">Quantas pessoas trabalham na operação?
              <select id="tamanho" value={form.tamanho} onChange={set("tamanho")}>
                <option value="">Selecione uma opção</option>
                <option>1 a 5 pessoas</option>
                <option>6 a 10 pessoas</option>
                <option>11 a 30 pessoas</option>
                <option>31 a 50 pessoas</option>
                <option>Mais de 50 pessoas</option>
              </select>
            </label>
            <label htmlFor="problema">O que você quer resolver?
              <textarea id="problema" rows={3} value={form.problema} onChange={set("problema")} />
            </label>
            {enviado && (
              <p className="n-ok" role="status">
                Pronto, o WhatsApp abriu com a sua mensagem escrita. Se não abriu, o seu navegador
                bloqueou a janela: chama direto no{" "}
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">(43) 98858-5127</a>.
              </p>
            )}
            <button className="n-btn" type="submit">Quero meu diagnóstico gratuito <ArrowRight size={16} /></button>
          </form>
        </div>
      </section>

      <footer className="n-rodape">
        <div className="n-wrap">
          <span className="n-logo"><i aria-hidden="true" />GARBATO<span>.</span></span>
          <span>© {new Date().getFullYear()} Garbato Solution · Londrina, PR</span>
          <Link href="/completo">Ver o site completo</Link>
        </div>
      </footer>
    </>
  )
}
