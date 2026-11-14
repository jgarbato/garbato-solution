/**
 * Limite de requisições por IP, em memória.
 *
 * Em ambiente serverless cada instância tem a própria memória, então isto é
 * só a primeira barreira contra rajadas vindas de um mesmo endereço. A
 * barreira que vale entre instâncias é a contagem no banco, feita na rota.
 */

type Janela = { inicio: number; total: number }

const janelas = new Map<string, Janela>()
const MAX_CHAVES = 5000

/** `true` quando a chave ainda está dentro do limite na janela atual. */
export function dentroDoLimite(chave: string, maximo: number, janelaMs: number): boolean {
  const agora = Date.now()
  const atual = janelas.get(chave)

  if (!atual || agora - atual.inicio >= janelaMs) {
    // Evita crescimento sem fim: ao encher, descarta as janelas já vencidas.
    if (janelas.size >= MAX_CHAVES) {
      for (const [k, v] of janelas) {
        if (agora - v.inicio >= janelaMs) janelas.delete(k)
      }
      if (janelas.size >= MAX_CHAVES) janelas.clear()
    }
    janelas.set(chave, { inicio: agora, total: 1 })
    return true
  }

  atual.total += 1
  return atual.total <= maximo
}

/** IP do cliente conforme o cabeçalho que a Vercel preenche. */
export function ipDoCliente(req: Request): string {
  const encaminhado = req.headers.get("x-forwarded-for")
  return encaminhado?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "desconhecido"
}
