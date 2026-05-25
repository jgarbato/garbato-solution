import {
  Calendar, FileText, Users, BarChart2,
  Zap, CreditCard, Bell,
  Stethoscope, Package, TrendingUp,
} from "lucide-react"
import type { Product } from "@/lib/products/types"

export const clinicProduct: Product = {
  slug: "clinic",
  name: "BlessSystemClinic",
  logoIcon: Stethoscope,
  logoSuffix: "Clinic",

  seo: {
    title: "BlessSystemClinic — Sistema de gestão para clínicas odontológicas e de estética",
    description:
      "Agenda inteligente, fichas digitais, financeiro integrado e notificações automáticas via WhatsApp. Reduza faltas em até 60% e centralize a operação da sua clínica. 14 dias grátis.",
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
    primary: "#3B82F6",
    primaryLight: "#60A5FA",
    accent: "#06B6D4",
    bg: "#FFFFFF",
    bgSoft: "#FAFAFA",
    bgTinted: "#EFF6FF",
    border: "#DBEAFE",
    dark: "#18181B",
    body: "#52525B",
    muted: "#A1A1AA",
    shadowRgba: "124,58,237",
  },

  hero: {
    badge: { icon: Zap, label: "Clínicas odontológicas e de estética" },
    titlePre: "O sistema que sua clínica",
    titleHighlight: "merecia desde o início",
    description:
      "Agenda inteligente, fichas digitais, financeiro integrado e notificações automáticas — tudo em uma plataforma simples e completa.",
    primaryCta: "Começar 14 dias grátis",
    secondaryCta: "Falar com consultor",
    bullets: ["✓ 14 dias grátis", "✓ Sem cartão", "✓ Suporte incluído"],
  },

  stats: [
    { value: "500+", label: "Clínicas ativas" },
    { value: "98%", label: "Satisfação" },
    { value: "−60%", label: "Redução de faltas" },
    { value: "48h", label: "Implantação" },
  ],

  features: {
    badge: "Funcionalidades",
    titlePre: "Tudo que sua clínica precisa,",
    titleHighlight: "em um só lugar",
    subtitle: "Do agendamento à nota fiscal — sem planilhas, sem sistemas desconectados.",
    items: [
      { icon: Calendar, title: "Agenda inteligente", desc: "Confirmações automáticas via WhatsApp e redução de até 60% nas faltas." },
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
      { n: "01", icon: Zap, title: "Escolha seu plano", desc: "Selecione o plano ideal e inicie o trial gratuito de 14 dias." },
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
        price: 349,
        desc: "Para clínicas que estão começando",
        features: ["Até 3 usuários", "Agenda inteligente", "Fichas personalizadas", "Agendamento online", "5 GB de armazenamento", "Notificações via Meta API"],
      },
      {
        id: "avancado",
        name: "Avançado",
        price: 499,
        desc: "Para clínicas em crescimento",
        hot: true,
        features: ["Até 10 usuários", "Tudo do Essencial", "Assinatura eletrônica", "Gestão financeira completa", "Controle de estoque", "Comissões automatizadas", "10 GB de armazenamento", "Painel de chamada"],
      },
      {
        id: "experts",
        name: "Experts",
        price: 899,
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
      { q: "Posso testar antes de pagar?", a: "Sim, são 14 dias gratuitos com acesso completo ao plano Avançado. Sem cartão de crédito." },
      { q: "Como é o processo de implantação?", a: "Nossa equipe configura tudo e treina o seu time remotamente em até 48h após a assinatura." },
      { q: "Meus dados ficam seguros?", a: "Sim. Criptografia de ponta a ponta, backup diário automático e total conformidade com a LGPD." },
    ],
  },

  cta: {
    title: "Pronto para transformar sua clínica?",
    subtitle: "14 dias grátis. Sem cartão. Suporte na implantação.",
    primaryCta: "Começar gratuitamente",
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
