"use client"

import { useEffect } from "react"

/*
 * Efeito "o site se monta": quando uma seção entra na tela, quatro cursores
 * com nome voam até cada bloco, desenham a moldura de rascunho arrastando do
 * canto, e o conteúdo aparece. Os títulos são "digitados", com o cursor
 * acompanhando o texto.
 *
 * Anima todo elemento marcado com data-b dentro de [data-montagem]. Não
 * altera o conteúdo: só classes e estilos temporários, removidos no fim.
 * Sem JavaScript, ou com "reduzir movimento" ligado no aparelho, a página
 * aparece inteira. Cada seção monta uma vez. Estilo em noir.css ("montagem").
 *
 * A ideia vem do "Swarm", de Joel Califa. A organização em agentes com fila
 * própria (cada cursor faz uma coisa por vez, os quatro em paralelo) segue o
 * cursor-swarm de Nguyen Tuan Anh, licença MIT:
 * https://github.com/anhnt256/cursor-swarm
 */

const BLOCOS = "[data-b]"
const AGENTES = [
  { nome: "ERP", cor: "#E3131E" },
  { nome: "CRM", cor: "#2FE0D0" },
  { nome: "IA", cor: "#FF6A2B" },
  { nome: "API", cor: "#4C8DFF" },
]
const SETA =
  '<svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true"><path d="M1.5 1.2 16 9.4l-6.5 1.7L6.3 18 1.5 1.2Z" fill="#fff" stroke="#08080A" stroke-width="1.2" stroke-linejoin="round"/></svg>'

type Agente = { el: HTMLElement; x: number; y: number }

export default function Montagem() {
  useEffect(() => {
    const raiz = document.querySelector<HTMLElement>("[data-montagem]")
    if (!raiz) return
    const liberar = () => raiz.classList.remove("mt-ssr")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      liberar()
      return
    }

    let vivo = true
    const temporizadores = new Set<number>()
    const dormir = (ms: number) =>
      new Promise<void>((ok) => {
        const t = window.setTimeout(() => { temporizadores.delete(t); ok() }, ms)
        temporizadores.add(t)
      })

    const blocosDe = (sec: HTMLElement) => {
      const todos = Array.from(sec.querySelectorAll<HTMLElement>(BLOCOS))
      return todos.filter((el) => !todos.some((o) => o !== el && o.contains(el)))
    }
    const secoes = Array.from(raiz.querySelectorAll<HTMLElement>("section"))
    const mapa = new Map<HTMLElement, HTMLElement[]>()
    for (const sec of secoes) {
      const blocos = blocosDe(sec)
      blocos.forEach((b) => b.classList.add("mt-b"))
      mapa.set(sec, blocos)
    }
    liberar()

    function voar(a: Agente, x: number, y: number, teto = 420) {
      const dist = Math.hypot(x - a.x, y - a.y)
      const dura = Math.max(120, Math.min(teto, dist * 0.5))
      a.x = x
      a.y = y
      a.el.style.transitionDuration = `${dura}ms`
      a.el.style.transform = `translate(${x}px, ${y}px)`
      return dormir(dura * 0.92)
    }

    // "Digita" um título: revela linha a linha com clip-path, o cursor no ponto da escrita.
    async function digitar(a: Agente, el: HTMLElement, x: number, y: number, w: number, h: number) {
      const altura = parseFloat(getComputedStyle(el).lineHeight) || h
      const linhas = Math.max(1, Math.round(h / altura))
      const passos = Math.max(8, Math.min(18, Math.round(w / 46)))
      el.style.clipPath = "inset(0 100% 0 0)"
      el.classList.add("mt-in")
      a.el.style.transitionDuration = "40ms"
      for (let l = 0; l < linhas && vivo; l++) {
        const y0 = (l / linhas) * 100, y1 = ((l + 1) / linhas) * 100
        for (let p = 1; p <= passos && vivo; p++) {
          const px = (p / passos) * 100
          el.style.clipPath = `polygon(0 0, 100% 0, 100% ${y0}%, ${px}% ${y0}%, ${px}% ${y1}%, 0 ${y1}%)`
          a.x = x + (w * p) / passos
          a.y = y + (h * (l + 0.55)) / linhas
          a.el.style.transform = `translate(${a.x}px, ${a.y}px)`
          await dormir(24)
        }
      }
      el.style.clipPath = ""
    }

    async function construir(a: Agente, b: HTMLElement, sec: HTMLElement, camada: HTMLElement) {
      const base = sec.getBoundingClientRect()
      const r = b.getBoundingClientRect()
      if (r.width < 4 || r.height < 4) { b.classList.add("mt-in"); return }
      const x = r.left - base.left, y = r.top - base.top
      const titulo = b.tagName === "H1" || b.tagName === "H2"

      await voar(a, x - 6, y - 6)
      if (!vivo) return
      if (r.height < 44 && !titulo) {             // peça pequena: encosta e solta
        b.classList.add("mt-in", "mt-pop")
        await dormir(70)
        return
      }
      const fio = document.createElement("div")   // moldura desenhada a partir do canto
      fio.className = r.height > 64 ? "mt-fio mt-fio-g" : "mt-fio"
      fio.style.cssText = `left:${x}px;top:${y}px;width:${r.width}px;height:${r.height}px;--cor:${a.el.dataset.cor}`
      camada.insertBefore(fio, camada.firstChild)
      void fio.offsetWidth
      fio.classList.add("mt-abre")
      await voar(a, x + r.width, y + r.height, 300)
      if (!vivo) return
      await dormir(90)
      if (titulo) await digitar(a, b, x, y, r.width, r.height)
      else b.classList.add("mt-in")
      fio.classList.add("mt-some")
      await dormir(60)
    }

    async function montar(sec: HTMLElement) {
      const blocos = mapa.get(sec) ?? []
      const base = sec.getBoundingClientRect()
      const camada = document.createElement("div")
      camada.className = "mt-camada"
      camada.setAttribute("aria-hidden", "true")
      sec.appendChild(camada)

      // Os cursores entram pelas bordas da parte visível da seção.
      const topo = Math.max(0, -base.top), fundo = Math.min(base.height, window.innerHeight - base.top)
      const agentes: Agente[] = AGENTES.map((def, i) => {
        const el = document.createElement("div")
        el.className = "mt-cursor"
        el.dataset.cor = def.cor
        el.innerHTML = `${SETA}<span style="background:${def.cor}">${def.nome}</span>`
        const x = i % 2 ? base.width + 30 : -70
        const y = topo + ((fundo - topo) * (i < 2 ? 0.25 : 0.7))
        el.style.transform = `translate(${x}px, ${y}px)`
        camada.appendChild(el)
        return { el, x, y }
      })
      void camada.offsetWidth
      camada.classList.add("mt-vai")

      // Cada cursor tem a sua fila: nunca faz duas coisas ao mesmo tempo, mas os quatro trabalham juntos.
      const filas = agentes.map(() => [] as HTMLElement[])
      blocos.forEach((b, i) => filas[i % agentes.length].push(b))
      const guarda = window.setTimeout(() => blocos.forEach((b) => b.classList.add("mt-in")), 9000)
      temporizadores.add(guarda)
      await Promise.all(agentes.map(async (a, i) => {
        await dormir(i * 110)
        for (const b of filas[i]) {
          if (!vivo) return
          await construir(a, b, sec, camada)
        }
        a.el.classList.add("mt-sai")
      }))
      window.clearTimeout(guarda)
      if (!vivo) return
      await dormir(650)
      camada.remove()
      blocos.forEach((b) => { b.classList.remove("mt-b", "mt-in", "mt-pop"); b.style.clipPath = "" })
    }

    // Monta quando o topo da seção passa do meio da tela, para a pessoa ver acontecer.
    const pendentes = new Set(secoes)
    const disparar = (sec: HTMLElement) => {
      if (!pendentes.delete(sec)) return
      olho.unobserve(sec)
      void montar(sec)
    }
    const olho = new IntersectionObserver((entradas) => {
      for (const e of entradas) if (e.isIntersecting) disparar(e.target as HTMLElement)
    }, { rootMargin: "0px 0px -42% 0px" })
    secoes.forEach((s) => olho.observe(s))

    // Uma seção curta no fim da página pode nunca chegar ao meio da tela:
    // ao bater no fim da rolagem, monta o que ainda estiver escondido.
    const noFim = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        Array.from(pendentes).forEach(disparar)
      }
    }
    window.addEventListener("scroll", noFim, { passive: true })

    return () => {
      vivo = false
      olho.disconnect()
      window.removeEventListener("scroll", noFim)
      temporizadores.forEach((t) => window.clearTimeout(t))
      raiz.querySelectorAll(".mt-camada").forEach((c) => c.remove())
      raiz.querySelectorAll<HTMLElement>(".mt-b").forEach((b) => {
        b.classList.remove("mt-b", "mt-in", "mt-pop")
        b.style.clipPath = ""
      })
    }
  }, [])

  return null
}
