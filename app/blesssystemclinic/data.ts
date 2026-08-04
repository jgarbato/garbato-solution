import {
  Calendar, FileText, Users, BarChart2,
  Zap, CreditCard, Bell,
  Stethoscope, Package, TrendingUp,
} from "lucide-react"
import type { Product } from "@/lib/products/types"

export const clinicProduct: Product = {
  slug: "clinic",
  path: "/blesssystemclinic",
  appUrl: "https://blesssystem.app",
  name: "BlessSystemClinic",
  logoIcon: Stethoscope,
  logoSuffix: "Clinic",

  seo: {
    title: "BlessSystemClinic — Sistema de gestão para clínicas odontológicas e de estética",
    description:
      "Agenda inteligente, fichas digitais, financeiro integrado e notificações automáticas via WhatsApp. Centralize a operação da sua clínica e reduza faltas com lembretes e confirmações automáticas.",
    ogTitle: "BlessSystemClinic — O sistema que sua clínica merecia desde o início",
    ogDescription:
      "Plataforma completa para clínicas odontológicas e de estética: agenda, prontuários, financeiro e WhatsApp em um só lugar.",
    keywords: [
      "sistema para clínica odontológica",
      "software para estética",
      "agenda online clínica",
      "prontuário eletrônico",
      "gestão financeira clínica",
      "BlessSystemClinic",
    ],
  },

  whatsappMessage: "Quero saber mais sobre o BlessSystemClinic",

  theme: {
    primary: "#5B9BFF",
    primaryLight: "#8FBEFF",
    accent: "#2FE0D0",
    bg: "#060810",
    bgSoft: "#0A0E1A",
    bgTinted: "#0D1626",
    card: "#0E1320",
    border: "rgba(255,255,255,0.10)",
    dark: "#EEF1F8",
    body: "#AFB6CC",
    muted: "#71789A",
    shadowRgba: "59,110,246",
  },

  hero: {
    badge: { icon: Zap, label: "Clínicas odontológicas e de estética" },
    titlePre: "O sistema que sua clínica",
    titleHighlight: "merecia desde o início",
    description:
      "Agenda inteligente, fichas digitais, financeiro integrado e notificações automáticas — tudo em uma plataforma simples e completa.",
    primaryCta: "Começar agora",
    secondaryCta: "Falar no WhatsApp",
    bullets: ["✓ Implantação em 48h", "✓ Suporte incluído", "✓ Cancele quando quiser"],
  },

  stats: [
    { value: "IA 24/7", label: "Atende no WhatsApp" },
    { value: "48h", label: "Implantação guiada" },
    { value: "100%", label: "Na nuvem" },
    { value: "LGPD", label: "Dados protegidos" },
  ],

  features: {
    badge: "Funcionalidades",
    titlePre: "Tudo que sua clínica precisa,",
    titleHighlight: "em um só lugar",
    subtitle: "Do agendamento à nota fiscal — sem planilhas, sem sistemas desconectados.",
    items: [
      { icon: Calendar, title: "Agenda inteligente", desc: "Confirmações e lembretes automáticos via WhatsApp para reduzir as faltas." },
      { icon: FileText, title: "Fichas digitais", desc: "Prontuários personalizáveis para odontologia e estética, com histórico completo." },
      { icon: Users, title: "Gestão de pacientes", desc: "Cadastro, histórico de atendimentos, aniversários e comunicação integrada." },
      { icon: CreditCard, title: "Financeiro completo", desc: "Recebimentos, comissões, repasses e fluxo de caixa em tempo real." },
      { icon: Package, title: "Controle de estoque", desc: "Materiais, alertas de reposição e rastreabilidade por procedimento." },
      { icon: Bell, title: "Notificações Meta", desc: "Lembretes e cobranças automáticas via API oficial do WhatsApp." },
    ],
  },

  howItWorks: {
    badge: "Como funciona",
    titlePre: "Comece em",
    titleHighlight: "3 passos simples",
    steps: [
      { n: "01", icon: Zap, title: "Escolha seu plano", desc: "Selecione o plano ideal para o tamanho da sua clínica e assine em minutos." },
      { n: "02", icon: Users, title: "Implantação guiada", desc: "Nossa equipe configura e treina seu time em até 48 horas." },
      { n: "03", icon: TrendingUp, title: "Clínica funcionando", desc: "Agenda, fichas e financeiro rodando. Você foca no atendimento." },
    ],
  },

  pricing: {
    badge: "Planos e preços",
    titlePre: "Sem taxa de adesão.",
    titleHighlight: "Cancele quando quiser.",
    plans: [
      {
        id: "essencial",
        name: "Essencial",
        price: 70,
        priceAnnual: 56,
        desc: "Para clínicas que estão começando",
        features: ["Até 3 usuários", "Agenda inteligente", "Fichas personalizadas", "Agendamento online", "5 GB de armazenamento", "Notificações via Meta API"],
      },
      {
        id: "avancado",
        name: "Avançado",
        price: 110,
        priceAnnual: 88,
        desc: "Para clínicas em crescimento",
        hot: true,
        features: ["Até 10 usuários", "Tudo do Essencial", "Assinatura eletrônica", "Gestão financeira completa", "Controle de estoque", "Comissões automatizadas", "10 GB de armazenamento", "Painel de chamada"],
      },
      {
        id: "experts",
        name: "Experts",
        price: 170,
        priceAnnual: 136,
        desc: "Para clínicas que querem escalar",
        features: ["Usuários ilimitados", "Tudo do Avançado", "CRM integrado", "Emissão de NF", "Central no WhatsApp", "25 GB de armazenamento", "Suporte prioritário"],
      },
    ],
  },

  faq: {
    badge: "FAQ",
    items: [
      { q: "Preciso instalar algum programa?", a: "Não. O sistema é 100% na nuvem — acesse do computador, tablet ou celular com qualquer navegador." },
      { q: "Funciona para odontologia e estética?", a: "Sim. Há módulos e fichas específicos para cada especialidade, personalizáveis para a realidade da sua clínica." },
      { q: "Posso ver o sistema antes de assinar?", a: "Sim. Oferecemos uma demonstração guiada pelo WhatsApp. Fale com nosso time e agendaremos uma apresentação completa da plataforma. Período de trial está previsto em breve." },
      { q: "Como é o processo de implantação?", a: "Nossa equipe configura tudo e treina o seu time remotamente em até 48h após a assinatura." },
      { q: "Meus dados ficam seguros?", a: "Sim. Os dados trafegam criptografados via HTTPS/TLS e ficam em banco de dados gerenciado com criptografia em repouso. Backup diário automático e total conformidade com a LGPD." },
    ],
  },

  cta: {
    title: "Pronto para transformar sua clínica?",
    subtitle: "Implantação guiada em 48h. Suporte incluído. Cancele quando quiser.",
    primaryCta: "Começar agora",
  },

  mockup: {
    domain: "app.blesssystemclinic.com.br",
    logoIcon: Stethoscope,
    sidebarIcons: [Calendar, Users, FileText, BarChart2],
    header: {
      title: "Agenda — Hoje",
      subtitle: "Segunda, 28 de abril",
      badge: { label: "12 consultas", bg: "#DCFCE7", color: "#16A34A" },
    },
    stats: [
      { label: "Pacientes", value: "284", color: "#3B82F6" },
      { label: "Faturamento", value: "R$18k", color: "#10B981" },
      { label: "Confirmados", value: "94%", color: "#06B6D4" },
    ],
    items: [
      { leftBadge: "08:30", showAvatar: true, title: "Ana Paula Silva", subtitle: "Limpeza", statusColor: "#10B981", statusLabel: "Confirmado" },
      { leftBadge: "09:00", showAvatar: true, title: "Carlos Mendes", subtitle: "Clareamento", statusColor: "#F59E0B", statusLabel: "Aguardando" },
      { leftBadge: "09:30", showAvatar: true, title: "Maria Souza", subtitle: "Consulta", statusColor: "#10B981", statusLabel: "Confirmado" },
      { leftBadge: "10:00", showAvatar: true, title: "Pedro Lima", subtitle: "Aplicação", statusColor: "#6366F1", statusLabel: "Em atend." },
    ],
  },
}
