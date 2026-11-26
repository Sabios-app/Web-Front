import {
  EVENTO_SESSAO_EXPIRADA,
  limparSessaoAuth,
  marcarSessaoExpirada,
} from '../utils/authStorage.js'

export function ehRequisicaoDeLogin(url) {
  if (!url) return false
  return /(?:^|\/)auth\/login(?:[/?#]|$)/i.test(String(url))
}

function notificarEventoSessaoExpirada() {
  if (typeof globalThis.window !== 'undefined' && typeof CustomEvent !== 'undefined') {
    globalThis.window.dispatchEvent(new CustomEvent(EVENTO_SESSAO_EXPIRADA))
  }
}

function redirecionarPadrao(destino) {
  if (typeof globalThis.window !== 'undefined' && globalThis.window.location) {
    globalThis.window.location.assign(destino)
  }
}

function obterCaminhoPadrao() {
  if (typeof globalThis.window !== 'undefined' && globalThis.window.location) {
    return globalThis.window.location.pathname
  }
  return ''
}

export function criarTratadorErroResposta({
  limparSessao = limparSessaoAuth,
  marcarExpiracao = marcarSessaoExpirada,
  notificarExpiracao = notificarEventoSessaoExpirada,
  redirecionarParaLogin = redirecionarPadrao,
  obterCaminhoAtual = obterCaminhoPadrao,
} = {}) {
  return (error) => {
    const status = error?.response?.status
    const requestUrl = error?.config?.url

    if (status === 401 && !ehRequisicaoDeLogin(requestUrl)) {
      limparSessao()
      marcarExpiracao()
      notificarExpiracao()

      if (obterCaminhoAtual() !== '/login') {
        redirecionarParaLogin('/login?motivo=sessao-expirada')
      }
    }

    return Promise.reject(error)
  }
}
