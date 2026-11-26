import { useMemo, useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { authService } from '../services/sabiosServices'

const CHAVE_TOKEN = 'sabios:token'
const CHAVE_USER = 'sabios:user'
const CHAVE_PERFIL = 'sabios:perfil'
const PERFIS_VALIDOS = ['cliente', 'conselheiro']

function lerJSON(chave) {
  try {
    const item = localStorage.getItem(chave)
    return item ? JSON.parse(item) : null
  } catch {
    return null
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => lerJSON(CHAVE_USER))
  const [token, setToken] = useState(() => localStorage.getItem(CHAVE_TOKEN) || null)
  const [perfil, setPerfil] = useState(() => localStorage.getItem(CHAVE_PERFIL) || null)
  const [carregando, setCarregando] = useState(true)

  // Ao iniciar, se tiver token, valida e sincroniza dados com o backend
  useEffect(() => {
    async function sincronizarUsuario() {
      if (!token) {
        setCarregando(false)
        return
      }

      try {
        const dados = await authService.getMe()
        const perfilNormalizado = dados.role === 'COUNSELOR' ? 'conselheiro' : 'cliente'
        setUser(dados)
        setPerfil(perfilNormalizado)
        localStorage.setItem(CHAVE_USER, JSON.stringify(dados))
        localStorage.setItem(CHAVE_PERFIL, perfilNormalizado)
      } catch (err) {
        sair()
      } finally {
        setCarregando(false)
      }
    }

    sincronizarUsuario()
  }, [token])

  async function login(email, password) {
    const authData = await authService.login(email, password)
    const tokenRecebido = authData.token
    const usuarioRecebido = authData.user
    const perfilNormalizado = usuarioRecebido.role === 'COUNSELOR' ? 'conselheiro' : 'cliente'

    setToken(tokenRecebido)
    setUser(usuarioRecebido)
    setPerfil(perfilNormalizado)

    localStorage.setItem(CHAVE_TOKEN, tokenRecebido)
    localStorage.setItem(CHAVE_USER, JSON.stringify(usuarioRecebido))
    localStorage.setItem(CHAVE_PERFIL, perfilNormalizado)

    return perfilNormalizado
  }

  async function cadastrar({ name, email, password, role, phone }) {
    const authData = await authService.register({ name, email, password, role, phone })
    const tokenRecebido = authData.token
    const usuarioRecebido = authData.user
    const perfilNormalizado = usuarioRecebido.role === 'COUNSELOR' ? 'conselheiro' : 'cliente'

    setToken(tokenRecebido)
    setUser(usuarioRecebido)
    setPerfil(perfilNormalizado)

    localStorage.setItem(CHAVE_TOKEN, tokenRecebido)
    localStorage.setItem(CHAVE_USER, JSON.stringify(usuarioRecebido))
    localStorage.setItem(CHAVE_PERFIL, perfilNormalizado)

    return perfilNormalizado
  }

  function entrar(novoPerfil) {
    // Compatibilidade temporária para testes rápidos
    setPerfil(novoPerfil)
    localStorage.setItem(CHAVE_PERFIL, novoPerfil)
  }

  function sair() {
    setToken(null)
    setUser(null)
    setPerfil(null)
    localStorage.removeItem(CHAVE_TOKEN)
    localStorage.removeItem(CHAVE_USER)
    localStorage.removeItem(CHAVE_PERFIL)
  }

  const valor = useMemo(() => ({
    user,
    token,
    perfil,
    carregando,
    login,
    cadastrar,
    entrar,
    sair,
  }), [user, token, perfil, carregando])

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
