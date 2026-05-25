import {
  FileText, Users, BarChart2,
  Building2, DollarSign, Globe,
  Map, Key, Home, TrendingUp,
} from "lucide-react"
import type { Product } from "@/lib/products/types"

export const mobProduct: Product = {
  slug: "mob",
  path: "/blesssystemmob",
  name: "BlessSystemMob",
  logoIcon: Building2,
  logoSuffix: "Mob",

  seo: {
    title: "BlessSystemMob — ERP para imobiliárias e loteadoras",
    description:
      "Sistema completo de gestão para imobiliárias e loteadoras: gestão de lotes, contratos digitais, CRM, financeiro integrado e sites inteligentes. Mais de 250 empresas atendidas. 14 dias grátis.",
    ogTitle: "BlessSystemMob — Tecnologia de ponta para sua imobiliária crescer",
    ogDescription:
      "ERP completo para imobiliárias e loteadoras: lotes, contratos, CRM, financeiro e sites em uma só plataforma.",
    keywords: [
      "ERP imobiliária",
      "sistema para loteadora",
      "gestão de lotes",
      "contratos digitais imobiliária",
      "CRM imobiliário",
      "BlessSystemMob",
    ],
  },

  whatsappMessage: "Quero saber mais sobre o BlessSystemMob",

  theme: {
    primary: "#0284C7",
    primaryLight: "#0EA5E9",
    accent: "#059669",
    bg: "#FFFFFF",
    bgSoft: "#F8FAFB",
    bgTinted: "#F0F9FF",
    border: "#E0F0FB",
    dark: "#0C1A2E",
    body: "#52525B",
    muted: "#A1A1AA",
    shadowRgba: "2,132,199",
  },

  hero: {
    badge: { icon: Building2, label: "Para imobiliárias e loteadoras" },
    titlePre: "Tecnologia de ponta para sua",
    titleHighlight: "imobiliária crescer",
    description:
      "ERP completo com gestão de lotes, contratos digitais, CRM integrado e sites inteligentes. Mais de 250 imobiliárias já confiam no BlessSystemMob.",
    primaryCta: "Começar 14 dias grátis",
    secondaryCta: "Falar com consultor",
    bullets: ["✓ 14 dias grátis", "✓ Sem cartão", "✓ Suporte incluído"],
  },

  stats: [
    { value: "250+", label: "Imobiliárias ativas" },
    { value: "R$2B+", label: "Em vendas gerenciadas" },
    { value: "98%", label: "Satisfação" },
    { value: "48h", label: "Implantação" },
  ],

  features: {
    badge: "Funcionalidades",
    titlePre: "Da captação ao pós-venda,",
    titleHighlight: "tudo integrado",
    subtitle: "Elimine planilhas e sistemas desconectados de uma vez por todas.",
    items: [
      { icon: Map, title: "Gestão de lotes e quadras", desc: "Mapa interativo com situação de cada lote em tempo real — disponível, reservado, vendido ou em obras." },
      { icon: FileText, title: "Contratos digitais", desc: "Geração automática com assinatura eletrônica. Sem papel, sem deslocamento, com validade jurídica." },
      { icon: DollarSign, title: "Financeiro integrado", desc: "Parcelas, inadimplência, repasses e comissões com integração boleto e PIX via gateway bancário." },
      { icon: Users, title: "CRM comercial", desc: "Funil visual com acompanhamento de leads, follow-ups automáticos e histórico completo de cada negociação." },
      { icon: Globe, title: "Sites inteligentes", desc: "Portal próprio com listagem de imóveis e integração automática com portais como ZAP, OLX e VivaReal." },
      { icon: BarChart2, title: "Relatórios gerenciais", desc: "Dashboards com visão completa: vendas, inadimplência, estoque de lotes e performance do time comercial." },
    ],
  },

  howItWorks: {
    badge: "Como funciona",
    titlePre: "Implantação em",
    titleHighlight: "3 etapas simples",
    steps: [
      { n: "01", icon: Key, title: "Escolha seu plano", desc: "Selecione conforme o tamanho da operação e inicie o trial gratuito de 14 dias." },
      { n: "02", icon: Users, title: "Implantação guiada", desc: "Nosso time configura e treina sua equipe com foco na sua operação específica." },
      { n: "03", icon: TrendingUp, title: "Operação funcionando", desc: "Lotes, contratos e financeiro rodando. Foque em vender mais." },
    ],
  },

  pricing: {
    badge: "Planos e preços",
    titlePre: "Sem fidelidade.",
    titleHighlight: "Cancele quando quiser.",
    plans: [
      {
        id: "essencial",
        name: "Essencial",
        price: 249,
        desc: "Para iniciar sua jornada",
        features: ["Até 3 usuários", "1 módulo principal", "Financeiro básico", "Central do Cliente", "Infraestrutura em nuvem", "4h de treinamento", "Suporte WhatsApp comercial"],
      },
      {
        id: "profissional",
        name: "Profissional",
        price: 399,
        desc: "Para empresas em crescimento",
        hot: true,
        features: ["Tudo do Essencial", "Até 10 usuários", "2 módulos + CRM", "Financeiro completo", "Sites inteligentes", "Integração boleto/PIX", "Integração com portais", "6h de treinamento"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 549,
        desc: "Solução completa",
        features: ["Tudo do Profissional", "Usuários ilimitados", "Todos os módulos", "Todas as integrações", "Customizações avançadas", "Suporte prioritário", "10h de treinamento"],
      },
    ],
  },

  faq: {
    badge: "FAQ",
    items: [
      { q: "Funciona para loteadoras e imobiliárias?", a: "Sim. O sistema possui módulos específicos para cada operação — loteamento, locação, venda e gestão de contratos." },
      { q: "Posso integrar com portais imobiliários?", a: "Sim. Os planos Profissional e Enterprise incluem integração com ZAP Imóveis, OLX e VivaReal." },
      { q: "Como funciona a assinatura eletrônica?", a: "Os contratos são gerados e enviados por e-mail para assinatura digital com validade jurídica, sem presença física." },
      { q: "Tem período de teste gratuito?", a: "Sim, 14 dias no plano Profissional sem precisar de cartão de crédito." },
      { q: "Como é feita a implantação?", a: "Nossa equipe realiza configuração e treinamento do time conforme o plano contratado — 4h, 6h ou 10h — de forma online." },
    ],
  },

  cta: {
    title: "Sua imobiliária merece tecnologia de ponta",
    subtitle: "14 dias grátis. Implantação guiada. Suporte especializado.",
    primaryCta: "Começar gratuitamente",
  },

  mockup: {
    domain: "app.blesssystemmob.com.br",
    logoIcon: Building2,
    sidebarIcons: [Home, Users, FileText, BarChart2],
    header: {
      title: "Painel — Residencial Bela Vista",
      subtitle: "Fase 2 · 284 lotes",
      badge: { label: "Ao vivo", bg: "#DCFCE7", color: "#16A34A" },
    },
    stats: [
      { label: "Lotes", value: "284", color: "#0284C7" },
      { label: "Vendidos", value: "187", color: "#059669" },
      { label: "Receita", value: "R$2.1M", color: "#F59E0B" },
    ],
    items: [
      { leftBadge: "LT-0047", leftBadgeWidth: "wide", title: "Roberto Alves", subtitle: "Venda", rightExtra: "R$85.000", statusColor: "#059669", statusLabel: "Assinado" },
      { leftBadge: "LT-0048", leftBadgeWidth: "wide", title: "Carla Souza", subtitle: "Reserva", rightExtra: "R$92.000", statusColor: "#F59E0B", statusLabel: "Pendente" },
      { leftBadge: "LT-0049", leftBadgeWidth: "wide", title: "Marcos Lima", subtitle: "Venda", rightExtra: "R$78.000", statusColor: "#059669", statusLabel: "Assinado" },
      { leftBadge: "LT-0050", leftBadgeWidth: "wide", title: "Juliana Reis", subtitle: "Locação", rightExtra: "R$1.800/m", statusColor: "#0284C7", statusLabel: "Ativo" },
    ],
  },
}
