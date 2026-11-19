/**
 * Validação dos dados de cadastro recebidos pela rota de contratação.
 * Sem dependências: usado no servidor antes de qualquer chamada ao Asaas.
 */

export function somenteDigitos(valor: unknown): string {
  return typeof valor === "string" ? valor.replace(/\D/g, "") : ""
}

/** CPF com os dois dígitos verificadores corretos. */
export function cpfValido(cpf: string): boolean {
  if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) return false
  const digito = (tamanho: number) => {
    let soma = 0
    for (let i = 0; i < tamanho; i++) soma += Number(cpf[i]) * (tamanho + 1 - i)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }
  return digito(9) === Number(cpf[9]) && digito(10) === Number(cpf[10])
}

/** CNPJ numérico com os dois dígitos verificadores corretos. */
export function cnpjValido(cnpj: string): boolean {
  if (!/^\d{14}$/.test(cnpj) || /^(\d)\1{13}$/.test(cnpj)) return false
  const digito = (tamanho: number) => {
    const pesos = tamanho === 12
      ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
      : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let soma = 0
    for (let i = 0; i < tamanho; i++) soma += Number(cnpj[i]) * pesos[i]
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }
  return digito(12) === Number(cnpj[12]) && digito(13) === Number(cnpj[13])
}

export function cpfCnpjValido(digitos: string): boolean {
  return digitos.length === 11 ? cpfValido(digitos) : cnpjValido(digitos)
}

export function emailValido(email: string): boolean {
  return email.length <= 254 && /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/.test(email)
}

/** Texto livre: string, sem caracteres de controle, dentro do tamanho máximo. */
function texto(valor: unknown, max: number): string | null {
  if (valor === undefined || valor === null) return ""
  if (typeof valor !== "string") return null
  const limpo = valor.trim()
  if (limpo.length > max || /[\u0000-\u001f\u007f]/.test(limpo)) return null
  return limpo
}

export type CadastroValido = {
  nome: string
  cpfCnpj: string
  email: string
  telefone: string
  tipoPessoa: "pf" | "pj"
  cep: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  estado: string
}

/**
 * Confere e normaliza o cadastro. Devolve os dados limpos ou a mensagem de
 * erro que pode ser mostrada ao usuário.
 */
export function validarCadastro(
  entrada: unknown,
): { ok: true; dados: CadastroValido } | { ok: false; erro: string } {
  if (!entrada || typeof entrada !== "object") return { ok: false, erro: "cadastro incompleto" }
  const c = entrada as Record<string, unknown>

  const nome = texto(c.nome, 120)
  if (!nome || nome.length < 3) return { ok: false, erro: "nome inválido" }

  const email = texto(c.email, 254)?.toLowerCase() ?? ""
  if (!emailValido(email)) return { ok: false, erro: "e-mail inválido" }

  const cpfCnpj = somenteDigitos(c.cpfCnpj)
  if ((cpfCnpj.length !== 11 && cpfCnpj.length !== 14) || !cpfCnpjValido(cpfCnpj)) {
    return { ok: false, erro: "CPF/CNPJ inválido" }
  }

  const telefone = somenteDigitos(c.telefone)
  if (telefone && (telefone.length < 10 || telefone.length > 13)) {
    return { ok: false, erro: "telefone inválido" }
  }

  const cep = somenteDigitos(c.cep)
  if (cep && cep.length !== 8) return { ok: false, erro: "CEP inválido" }

  const rua = texto(c.rua, 120)
  const numero = texto(c.numero, 20)
  const bairro = texto(c.bairro, 80)
  const cidade = texto(c.cidade, 80)
  const estado = texto(c.estado, 2)
  if (rua === null || numero === null || bairro === null || cidade === null || estado === null) {
    return { ok: false, erro: "endereço inválido" }
  }
  if (estado && !/^[A-Za-z]{2}$/.test(estado)) return { ok: false, erro: "estado inválido" }

  return {
    ok: true,
    dados: {
      nome,
      cpfCnpj,
      email,
      telefone,
      // O tipo é deduzido do documento, não do que o navegador informa.
      tipoPessoa: cpfCnpj.length === 11 ? "pf" : "pj",
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado: estado.toUpperCase(),
    },
  }
}
