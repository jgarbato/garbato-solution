"use client"

import { useEffect } from "react"

/*
 * Efeito "o site se monta": quando uma seção entra na tela, aparecem
 * pontinhos soltos, depois as molduras de rascunho de cada bloco (título,
 * texto, cartão, botão, imagem) e só então o conteúdo de verdade.
 *
 * Não desenha nada por conta própria: lê os blocos que já existem na página
 * e anima por cima. Sem JavaScript, ou com "reduzir movimento" ligado no
 * aparelho, a página aparece inteira como sempre. Cada seção monta uma vez.
 *
 * Anima todo elemento marcado com data-b dentro de [data-montagem].
 * O estilo fica em noir.css, no trecho "montagem".
 */

const BLOCOS = "[data-b]"
const PONTOS = 54
const CLARO = "235,238,245"
const AQUA = "47,224,208"

export default function Montagem() {
  useEffect(() => {
    const raiz = document.querySelector<HTMLElement>("[data-montagem]")
    if (!raiz) return
    const liberar = () => raiz.classList.remove("mt-ssr")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      liberar()
      return
    }

    const temporizadores: number[] = []
    const quadros: number[] = []
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

    function montar(sec: HTMLElement) {
      const blocos = mapa.get(sec) ?? []
      const base = sec.getBoundingClientRect()
      const passo = Math.min(45, 520 / Math.max(blocos.length, 1))
      const camada = document.createElement("div")
      camada.className = "mt-camada"
      camada.setAttribute("aria-hidden", "true")

      const alvos: [number, number][] = []
      blocos.forEach((b, i) => {
        const r = b.getBoundingClientRect()
        const atraso = 260 + i * passo
        if (r.width > 4 && r.height > 4) {
          const x = r.left - base.left, y = r.top - base.top
          const fio = document.createElement("div")
          fio.className = r.height > 64 ? "mt-fio mt-fio-g" : "mt-fio"
          fio.style.cssText =
            `left:${x}px;top:${y}px;width:${r.width}px;height:${r.height}px;animation-delay:${atraso}ms;` +
            `--dx:${Math.round(Math.random() * 120 - 60)}px;--dy:${Math.round(Math.random() * 80 - 40)}px`
          camada.appendChild(fio)
          alvos.push([x, y], [x + r.width, y], [x, y + r.height], [x + r.width, y + r.height])
        }
        temporizadores.push(window.setTimeout(() => b.classList.add("mt-in"), atraso + 620))
      })

      const fim = 260 + blocos.length * passo + 1500
      const tela = document.createElement("canvas")
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      tela.width = Math.round(base.width * dpr)
      tela.height = Math.round(base.height * dpr)
      tela.style.cssText = "position:absolute;inset:0;width:100%;height:100%"
      camada.appendChild(tela)
      sec.appendChild(camada)

      // Pontinhos: nascem espalhados, vagam, e depois correm para os cantos das molduras.
      const ctx = tela.getContext("2d")
      const topo = Math.max(0, -base.top), baixo = Math.min(base.height, window.innerHeight - base.top)
      const pts = Array.from({ length: alvos.length ? PONTOS : 0 }, (_, i) => {
        const [ax, ay] = alvos[Math.floor(Math.random() * alvos.length)]
        return {
          x: Math.random() * base.width, y: topo + Math.random() * Math.max(baixo - topo, 120),
          vx: Math.random() * 1.2 - 0.6, vy: Math.random() * 1.2 - 0.6, ax, ay, seta: i % 3 === 0, gira: Math.random() * 6.28,
        }
      })
      const inicio = performance.now()
      const dura = Math.min(fim, 1700)
      function pintar(agora: number) {
        if (!ctx) return
        const t = Math.min((agora - inicio) / dura, 1)
        ctx.clearRect(0, 0, tela.width, tela.height)
        const puxa = t < 0.3 ? 0 : Math.min((t - 0.3) / 0.45, 1)
        const forca = puxa * puxa * (3 - 2 * puxa)
        const alfa = t < 0.12 ? t / 0.12 : t > 0.72 ? Math.max(0, 1 - (t - 0.72) / 0.28) : 1
        for (const p of pts) {
          p.x += p.vx
          p.y += p.vy
          const x = p.x + (p.ax - p.x) * forca, y = p.y + (p.ay - p.y) * forca
          if (p.seta) {
            // uma em cada três é uma setinha, como cursores soltos pela tela
            const a = p.gira + t * 1.5, r = 6 * dpr
            ctx.fillStyle = `rgba(${CLARO},${0.9 * alfa})`
            ctx.beginPath()
            ctx.moveTo(x * dpr + Math.cos(a) * r, y * dpr + Math.sin(a) * r)
            ctx.lineTo(x * dpr + Math.cos(a + 2.5) * r, y * dpr + Math.sin(a + 2.5) * r)
            ctx.lineTo(x * dpr + Math.cos(a - 2.5) * r, y * dpr + Math.sin(a - 2.5) * r)
            ctx.fill()
          } else {
            ctx.fillStyle = `rgba(${AQUA},${0.85 * alfa})`
            ctx.fillRect(x * dpr - 1.5 * dpr, y * dpr - 1.5 * dpr, 3 * dpr, 3 * dpr)
          }
        }
        if (t < 1) quadros.push(requestAnimationFrame(pintar))
      }
      quadros.push(requestAnimationFrame(pintar))

      temporizadores.push(window.setTimeout(() => {
        camada.remove()
        blocos.forEach((b) => b.classList.remove("mt-b", "mt-in"))
      }, fim + 700))
    }

    // Monta quando o topo da seção passa do meio da tela, para a pessoa ver acontecer.
    const pendentes = new Set(secoes)
    const disparar = (sec: HTMLElement) => {
      if (!pendentes.delete(sec)) return
      olho.unobserve(sec)
      montar(sec)
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
      olho.disconnect()
      window.removeEventListener("scroll", noFim)
      temporizadores.forEach((t) => window.clearTimeout(t))
      quadros.forEach((q) => cancelAnimationFrame(q))
      raiz.querySelectorAll(".mt-camada").forEach((c) => c.remove())
      raiz.querySelectorAll(".mt-b").forEach((b) => b.classList.remove("mt-b", "mt-in"))
    }
  }, [])

  return null
}
