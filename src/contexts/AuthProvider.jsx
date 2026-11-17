import { useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'

const CHAVE_PERFIL = 'sabios:perfil'
const PERFIS_VALIDOS = ['cliente', 'conselheiro']

function lerPerfil() {
  try {
    const perfil = localStorage.getItem(CHAVE_PERFIL)
    return PERFIS_VALIDOS.includes(perfil) ? perfil : null
  } catch {
    return null
  }
}

function salvarPerfil(perfil) {
  try {
    localStorage.setItem(CHAVE_PERFIL, perfil)
  } catch {
    // A sessão continua válida apenas durante a visita quando o armazenamento não está disponível.
  }
}

function removerPerfil() {
  try {
    localStorage.removeItem(CHAVE_PERFIL)
  } catch {
    // Não há ação adicional quando o armazenamento não está disponível.
  }
}

export default function AuthProvider({ children }) {
  const [perfil, setPerfil] = useState(lerPerfil)

  function entrar(novoPerfil) {
    if (!PERFIS_VALIDOS.includes(novoPerfil)) {
      throw new Error(`Perfil de acesso inválido: ${novoPerfil}`)
    }

    setPerfil(novoPerfil)
    salvarPerfil(novoPerfil)
  }

  function sair() {
    setPerfil(null)
    removerPerfil()
  }

  const valor = useMemo(() => ({ perfil, entrar, sair }), [perfil])

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
