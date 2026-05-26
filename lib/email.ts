import { Resend } from "resend"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Domínio configurado em https://resend.com/domains. Enquanto não verificado,
// usar "onboarding@resend.dev" como fallback (só envia para email da conta).
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "Garbato Solution <onboarding@resend.dev>"

type WelcomeEmailParams = {
  to: string
  customerName: string
  systemName: string
  appUrl: string
  planName: string
}

export async function sendWelcomeEmail(params: WelcomeEmailParams) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY ausente — pulando envio de welcome email", {
      to: params.to,
    })
    return { skipped: true as const }
  }

  const { to, customerName, systemName, appUrl, planName } = params

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background:#F7F8FA; padding:24px; color:#0A0B14;">
        <div style="max-width:520px; margin:0 auto; background:#FFFFFF; border-radius:16px; padding:32px; border:1px solid rgba(15,22,36,0.08);">
          <div style="font-size:14px; font-weight:600; color:#3B82F6; margin-bottom:8px;">${SITE_NAME}</div>
          <h1 style="margin:0 0 16px; font-size:22px; color:#0A0B14;">Bem-vindo ao ${systemName}!</h1>
          <p style="font-size:15px; line-height:1.6; color:#5B6478;">Olá ${customerName},</p>
          <p style="font-size:15px; line-height:1.6; color:#5B6478;">
            Seu pagamento do plano <strong>${planName}</strong> foi confirmado e o acesso ao
            <strong>${systemName}</strong> está liberado.
          </p>
          <div style="margin:24px 0;">
            <a href="${appUrl}"
               style="display:inline-block; background:#3B82F6; color:#FFFFFF; padding:12px 24px; border-radius:10px; text-decoration:none; font-weight:600; font-size:15px;">
              Acessar ${systemName}
            </a>
          </div>
          <p style="font-size:13px; line-height:1.6; color:#8D95A8;">
            Em até 24h úteis nossa equipe entra em contato para agendar a implantação e o treinamento.
          </p>
          <hr style="border:none; border-top:1px solid rgba(15,22,36,0.08); margin:24px 0;" />
          <p style="font-size:12px; color:#8D95A8; margin:0;">
            ${SITE_NAME} · <a href="${SITE_URL}" style="color:#3B82F6;">${SITE_URL.replace(/^https?:\/\//, "")}</a>
          </p>
        </div>
      </body>
    </html>
  `.trim()

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: `Bem-vindo ao ${systemName} — Acesso liberado`,
    html,
  })

  return { skipped: false as const, result }
}
