export const CHAVES_AUTH = {
  token: 'sabios:token',
  user: 'sabios:user',
  perfil: 'sabios:perfil',
  sessaoExpirada: 'sabios:sessao-expirada',
}

export const EVENTO_SESSAO_EXPIRADA = 'sabios:sessao-expirada'

function obterStorage(tipo) {
  try {
    return globalThis?.[tipo] ?? null
  } catch {
    return null
  }
}

export function normalizarPerfil(role) {
  if (!role) return null
  return String(role).toUpperCase() === 'COUNSELOR' ? 'conselheiro' : 'cliente'
}

export function lerSessaoAuth(storage = obterStorage('localStorage')) {
  if (!storage) return { token: null, user: null, perfil: null }
  try {
    const token = storage.getItem(CHAVES_AUTH.token) || null
    const userRaw = storage.getItem(CHAVES_AUTH.user)
    const user = userRaw ? JSON.parse(userRaw) : null
    const perfil = storage.getItem(CHAVES_AUTH.perfil) || null
    return { token, user, perfil }
  } catch {
    return { token: null, user: null, perfil: null }
  }
}

export function salvarSessaoAuth(
  { token, user, perfil },
  storage = obterStorage('localStorage'),
) {
  if (!storage) return
  try {
    if (token) storage.setItem(CHAVES_AUTH.token, token)
    if (user) storage.setItem(CHAVES_AUTH.user, JSON.stringify(user))
    if (perfil) storage.setItem(CHAVES_AUTH.perfil, perfil)
  } catch {
    // Ignora falha caso armazenamento esteja bloqueado no navegador
  }
}

export function limparSessaoAuth(storage = obterStorage('localStorage')) {
  if (!storage) return
  try {
    storage.removeItem(CHAVES_AUTH.token)
    storage.removeItem(CHAVES_AUTH.user)
    storage.removeItem(CHAVES_AUTH.perfil)
  } catch {
    // Ignora falha caso armazenamento esteja bloqueado no navegador
  }
}

export function marcarSessaoExpirada(storage = obterStorage('sessionStorage')) {
  if (!storage) return
  try {
    storage.setItem(CHAVES_AUTH.sessaoExpirada, '1')
  } catch {
    // Ignora falha caso sessionStorage esteja indisponível
  }
}

export function consumirAvisoSessaoExpirada(storage = obterStorage('sessionStorage')) {
  if (!storage) return false
  try {
    const marcado = storage.getItem(CHAVES_AUTH.sessaoExpirada) === '1'
    if (marcado) {
      storage.removeItem(CHAVES_AUTH.sessaoExpirada)
    }
    return marcado
  } catch {
    return false
  }
}
