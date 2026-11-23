import { useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'

const PERFIS_VALIDOS = ['cliente', 'conselheiro']

export default function AuthProvider({ children }) {
  const [perfil, setPerfil] = useState(null)

  function entrar(novoPerfil) {
    if (!PERFIS_VALIDOS.includes(novoPerfil)) {
      throw new Error(`Perfil de acesso inválido: ${novoPerfil}`)
    }

    setPerfil(novoPerfil)
  }

  function sair() {
    setPerfil(null)
  }

  const valor = useMemo(() => ({ perfil, entrar, sair }), [perfil])

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
