export const WHATSAPP_NUMBER = "5543988720576"
export const SITE_URL = "https://garbatosolution.com.br"
export const SITE_NAME = "Garbato Solution"

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
