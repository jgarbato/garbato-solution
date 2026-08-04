import {
  FileText, Users, BarChart2,
  Building2, DollarSign, Globe,
  Map, Key, Home, TrendingUp,
} from "lucide-react"
import type { Product } from "@/lib/products/types"

export const mobProduct: Product = {
  slug: "mob",
  path: "/blesssystemmob",
  appUrl: "https://imob.blesssystem.app",
  name: "BlessSystemMob",
  logoIcon: Building2,
  logoSuffix: "Mob",

  seo: {
    title: "BlessSystemMob — ERP para imobiliárias e loteadoras",
    description:
      "Sistema completo de gestão para imobiliárias e loteadoras: lotes e quadras com mapa interativo, contratos, financeiro com boletos e conciliação bancária, reajuste por IGPM/IPCA e relatórios gerenciais.",
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
    primary: "#22B8F5",
    primaryLight: "#5CCBF8",
    accent: "#39E6A0",
    bg: "#060810",
    bgSoft: "#0A0E1A",
    bgTinted: "#08131F",
    card: "#0E1320",
    border: "rgba(255,255,255,0.10)",
    dark: "#EEF1F8",
    body: "#AFB6CC",
    muted: "#71789A",
    shadowRgba: "34,184,245",
  },

  hero: {
    badge: { icon: Building2, label: "Para imobiliárias e loteadoras" },
    titlePre: "Tecnologia de ponta para sua",
    titleHighlight: "imobiliária crescer",
    description:
      "ERP completo com gestão de lotes, contratos, financeiro integrado e conciliação bancária — construído sobre operações reais de loteamento e gestão patrimonial.",
    primaryCta: "Começar agora",
    secondaryCta: "Falar no WhatsApp",
    bullets: ["✓ Implantação guiada", "✓ Suporte incluído", "✓ Cancele quando quiser"],
  },

  stats: [
    { value: "IA 24/7", label: "Atende leads no WhatsApp" },
    { value: "100%", label: "Na nuvem" },
    { value: "48h", label: "Implantação guiada" },
    { value: "LGPD", label: "Dados protegidos" },
  ],

  features: {
    badge: "Funcionalidades",
    titlePre: "Da captação ao pós-venda,",
    titleHighlight: "tudo integrado",
    subtitle: "Elimine planilhas e sistemas desconectados de uma vez por todas.",
    items: [
      { icon: Map, title: "Gestão de lotes e quadras", desc: "Mapa interativo com situação de cada lote em tempo real — disponível, reservado, vendido ou em obras." },
      { icon: FileText, title: "Contratos completos", desc: "Venda, locação e cessão com geração automática em PDF, parcelas, multas, juros e distrato com cálculo automático." },
      { icon: DollarSign, title: "Financeiro integrado", desc: "Parcelas, inadimplência, repasses e comissões com integração boleto e PIX via gateway bancário." },
      { icon: Users, title: "Clientes e corretores", desc: "Cadastro completo de compradores, corretores e fornecedores, com registro de contatos e histórico de cada negociação." },
      { icon: Globe, title: "Reajuste automático", desc: "Índices IGPM, IPCA e INPC buscados direto do Banco Central, com prévia do cálculo e histórico por contrato." },
      { icon: BarChart2, title: "Relatórios gerenciais", desc: "Dashboards com visão completa: vendas, inadimplência, estoque de lotes e performance do time comercial." },
    ],
  },

  howItWorks: {
    badge: "Como funciona",
    titlePre: "Implantação em",
    titleHighlight: "3 etapas simples",
    steps: [
      { n: "01", icon: Key, title: "Escolha seu plano", desc: "Selecione conforme o tamanho da operação e assine em minutos." },
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
        price: 70,
        priceAnnual: 56,
        desc: "Para iniciar sua jornada",
        features: ["Até 3 usuários", "Imóveis e contratos", "Financeiro básico", "Documentos em nuvem", "Infraestrutura em nuvem", "4h de treinamento", "Suporte WhatsApp comercial"],
      },
      {
        id: "profissional",
        name: "Profissional",
        price: 110,
        priceAnnual: 88,
        desc: "Para empresas em crescimento",
        hot: true,
        features: ["Tudo do Essencial", "Até 10 usuários", "Loteamentos + mapa de lotes", "Reajuste IGPM/IPCA automático", "Distrato com cálculo automático", "Boletos e PIX (Asaas)", "Vistorias e controle de chaves", "6h de treinamento"],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 170,
        priceAnnual: 136,
        desc: "Solução completa",
        features: ["Tudo do Profissional", "Usuários ilimitados", "Boletos Itaú direto + borderô CNAB240", "Conciliação bancária (OFX)", "Múltiplas empresas/CNPJs", "Suporte prioritário", "10h de treinamento"],
      },
    ],
  },

  faq: {
    badge: "FAQ",
    items: [
      { q: "Funciona para loteadoras e imobiliárias?", a: "Sim. O sistema possui módulos específicos para cada operação — loteamento, locação, venda e gestão de contratos." },
      { q: "Consigo controlar mais de uma empresa?", a: "Sim. O plano Enterprise suporta múltiplas empresas/CNPJs na mesma conta, com permissões por usuário e perfil." },
      { q: "Como funcionam os contratos?", a: "Contratos de venda, locação e cessão são gerados automaticamente em PDF com os dados do imóvel e do comprador, com parcelas, reajustes e distrato calculados pelo sistema." },
      { q: "Posso ver o sistema antes de assinar?", a: "Sim. Oferecemos uma demonstração guiada pelo WhatsApp com a sua operação em mente. Período de teste gratuito está previsto em breve." },
      { q: "Como é feita a implantação?", a: "Nossa equipe realiza configuração e treinamento do time conforme o plano contratado — 4h, 6h ou 10h — de forma online." },
    ],
  },

  cta: {
    title: "Sua imobiliária merece tecnologia de ponta",
    subtitle: "Implantação guiada. Suporte especializado. Cancele quando quiser.",
    primaryCta: "Começar agora",
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
