import type { Metadata } from "next"
import Link from "next/link"
import { SITE_NAME, SITE_URL, whatsappUrl } from "@/lib/constants"
import "./padarias.css"

const PATH = "/padarias"

const WA_DIAGNOSTICO = whatsappUrl(
  "Oi! Vi a página de padarias e quero o diagnóstico grátis para a minha padaria."
)

export const metadata: Metadata = {
  title: "IA para Padarias: atendente no WhatsApp que anota encomenda",
  description:
    "Implantamos uma atendente de IA no WhatsApp da sua padaria em 30 dias. Ela responde o cardápio, anota encomendas, lê o comprovante de Pix e chama a equipe quando precisa.",
  keywords: [
    "IA para padaria",
    "atendente de WhatsApp para padaria",
    "chatbot padaria",
    "encomenda de salgados WhatsApp",
    "sistema para padaria",
    "Garbato Solution",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    title: "IA para Padarias | Garbato Solution",
    description:
      "Sua padaria respondendo e anotando encomenda no WhatsApp 24 horas, sem tirar você do balcão.",
    url: `${SITE_URL}${PATH}`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
}

const DORES = [
  {
    titulo: "WhatsApp lotado",
    texto:
      "Preço do cento, horário, se tem pão de queijo. As mesmas perguntas o dia inteiro, com fila no balcão.",
  },
  {
    titulo: "Encomenda perdida",
    texto:
      "Anotada no caderno ou num áudio. Some, sai com o sabor errado ou fica pronta no dia errado.",
  },
  {
    titulo: "Sobra no fim do dia",
    texto:
      "Pão e doce que não saíram viram prejuízo, porque ninguém avisou os clientes na hora certa.",
  },
]

const PASSOS = [
  {
    titulo: "Dossiê da Padaria",
    texto: "Cardápio, preços, prazos de encomenda, horários de fornada e o seu jeito de falar.",
  },
  {
    titulo: "Configuração",
    texto: "A IA no seu WhatsApp, anotando as encomendas numa planilha ou no seu sistema.",
  },
  {
    titulo: "30 dias de ajuste",
    texto: "Acompanhamos as conversas e corrigimos as respostas até ficarem do seu jeito.",
  },
  {
    titulo: "Mensalidade",
    texto: "Manutenção, avisos de fornada e promoção, e 8 posts por mês para o Instagram.",
  },
]

const DUVIDAS = [
  {
    p: "Vai parecer robô?",
    r: "Não. A IA fala com o tom que você definir no Dossiê e passa para você tudo que for reclamação, preço especial ou pergunta fora do roteiro.",
  },
  {
    p: "E quando a IA não souber responder?",
    r: "Ela nunca inventa preço nem prazo. Quando não sabe, chama alguém da equipe e avisa o cliente que já vão responder.",
  },
  {
    p: "Preciso saber programar?",
    r: "Não. Nós configuramos tudo. Você só responde o Dossiê e diz o que está certo ou errado nas primeiras semanas.",
  },
  {
    p: "Funciona com o meu sistema de caixa?",
    r: "Na maioria dos casos, sim. Trabalhamos com sistemas de gestão há 17 anos e vemos isso com você no diagnóstico.",
  },
  {
    p: "E se eu quiser cancelar?",
    r: "Depois dos 3 primeiros meses, você cancela a mensalidade quando quiser, avisando com 30 dias.",
  },
]

export default function Page() {
  return (
    <div className="pd">
      <header className="pd-wrap pd-top">
        <Link className="pd-brand" href="/">
          Garbato <span>Solution</span>
        </Link>
        <a className="pd-link" href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
          Falar no WhatsApp
        </a>
      </header>

      <main>
        <div className="pd-wrap pd-hero">
          <div className="pd-copy">
            <p className="pd-eyebrow">IA para padarias</p>
            <h1>
              Sua padaria anotando encomenda e respondendo no WhatsApp 24 horas, sem tirar você do
              balcão.
            </h1>
            <p className="pd-lead">
              Implantamos uma atendente de IA na sua padaria em 30 dias. Ela responde o cardápio,
              anota encomenda e avisa quando sai a fornada.
            </p>
            <div>
              <a className="pd-btn" href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
                Quero um diagnóstico grátis
              </a>
            </div>
            <p className="pd-note">Conversa de 20 minutos pelo WhatsApp. Sem compromisso.</p>
          </div>

          <div className="pd-demo" aria-label="Exemplo de conversa da IA anotando uma encomenda">
            <div className="pd-phone">
              <div className="pd-phone-head">WhatsApp da padaria · exemplo</div>
              <div className="pd-msg in">
                Boa tarde! Quanto é o cento de coxinha? Queria 200 pra sábado<small>14:02</small>
              </div>
              <div className="pd-msg out">
                Boa tarde! O cento de salgado frito sai R$ 90. Para 200 unidades fica R$ 180. Pode
                ser coxinha e bolinha de queijo, meio a meio?<small>14:02</small>
              </div>
              <div className="pd-msg in">
                Pode sim. Retiro às 10h<small>14:03</small>
              </div>
              <div className="pd-msg out">
                Anotado! Para garantir, o sinal é de 50% no Pix. Te mando a chave?<small>14:03</small>
              </div>
            </div>
            <div className="pd-ticket" aria-label="Comanda de encomenda gerada pela IA">
              <div>
                <b>ENCOMENDA</b> · gerada pela IA
              </div>
              <div className="pd-row">
                <span>200 salgados (½ coxinha, ½ bolinha)</span>
                <span>R$ 180,00</span>
              </div>
              <div className="pd-row">
                <span>Retirada</span>
                <span>sábado 10:00</span>
              </div>
              <div className="pd-row">
                <span>Sinal Pix 50%</span>
                <span>R$ 90,00</span>
              </div>
            </div>
          </div>
        </div>

        <section className="pd-section">
          <div className="pd-wrap">
            <p className="pd-eyebrow">O problema</p>
            <h2>Pedido sem resposta é encomenda que vai para a padaria da outra esquina.</h2>
            <div className="pd-cards">
              {DORES.map((d) => (
                <div className="pd-card" key={d.titulo}>
                  <h3>{d.titulo}</h3>
                  <p>{d.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pd-section">
          <div className="pd-wrap">
            <p className="pd-eyebrow">Feito primeiro numa padaria de verdade</p>
            <h2>Padaria &amp; Confeitaria Expressa, Londrina, desde 1991</h2>
            <div className="pd-case">
              <p className="pd-quote">
                Antes de oferecer para outras padarias, montamos tudo na padaria da família: site,
                atendente de IA no WhatsApp e o portal de gestão com caixa.
              </p>
              <div className="pd-facts">
                <div className="pd-fact">
                  <strong>32</strong>
                  <span>itens do cardápio que a IA conhece, com preço</span>
                </div>
                <div className="pd-fact">
                  <strong>Pix</strong>
                  <span>a IA lê o comprovante do sinal e confirma a encomenda</span>
                </div>
                <div className="pd-fact">
                  <strong>Coffee break</strong>
                  <span>coleta data, pessoas e sabores e monta a ficha do pedido</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pd-section">
          <div className="pd-wrap">
            <p className="pd-eyebrow">Como funciona</p>
            <h2>Do caderno de encomendas para a IA em 30 dias</h2>
            <ol className="pd-steps">
              {PASSOS.map((s) => (
                <li key={s.titulo}>
                  <h3>{s.titulo}</h3>
                  <p>{s.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pd-section">
          <div className="pd-wrap pd-about">
            <div className="pd-avatar" aria-hidden="true">
              J
            </div>
            <div className="pd-about-text">
              <p className="pd-eyebrow">Quem implanta</p>
              <h2>17 anos colocando sistema para rodar em empresa</h2>
              <p className="pd-lead">
                Sou o Juan Garbato, da Garbato Solution. Passei 17 anos implantando ERP. Agora uso
                essa experiência para implantar IA em padaria, do jeito que funciona no dia a dia do
                balcão. Mostro os bastidores no canal Deploy na Sexta.
              </p>
            </div>
          </div>
        </section>

        <section className="pd-section" id="preco">
          <div className="pd-wrap">
            <p className="pd-eyebrow">Investimento</p>
            <h2>Implantação completa</h2>
            <div className="pd-plan">
              <div className="pd-price">
                R$ 2.500 <small>de implantação + R$ 397/mês</small>
              </div>
              <ul>
                <li>Atendente de IA no WhatsApp da padaria</li>
                <li>Encomendas anotadas com sabor, data e sinal</li>
                <li>Avisos de fornada e promoção para os clientes</li>
                <li>8 posts por mês e ajuste mensal</li>
                <li>Contrato mínimo de 3 meses</li>
              </ul>
              <div>
                <a className="pd-btn" href={WA_DIAGNOSTICO} target="_blank" rel="noopener noreferrer">
                  Quero um diagnóstico grátis
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="pd-section">
          <div className="pd-wrap">
            <p className="pd-eyebrow">Dúvidas</p>
            <h2>Perguntas que todo dono de padaria faz</h2>
            <div className="pd-faq">
              {DUVIDAS.map((d) => (
                <details key={d.p}>
                  <summary>{d.p}</summary>
                  <p>{d.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="pd-footer">
        <div className="pd-wrap">
          <div>
            <strong>Garbato Solution</strong> · IA para padarias · Instagram @garbatosolution
          </div>
          <Link className="pd-link" href="/">
            Sistemas sob medida
          </Link>
        </div>
      </footer>

      <a
        className="pd-btn pd-float"
        href={WA_DIAGNOSTICO}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </div>
  )
}
