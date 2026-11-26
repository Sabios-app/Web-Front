import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import { authService } from '../services/sabiosServices'
import {
  EVENTO_SESSAO_EXPIRADA,
  lerSessaoAuth,
  limparSessaoAuth,
  normalizarPerfil,
  salvarSessaoAuth,
} from '../utils/authStorage'

export default function AuthProvider({ children }) {
  const [sessaoInicial] = useState(() => lerSessaoAuth())
  const [user, setUser] = useState(sessaoInicial.user)
  const [token, setToken] = useState(sessaoInicial.token)
  const [perfil, setPerfil] = useState(sessaoInicial.perfil)
  const [carregando, setCarregando] = useState(() => Boolean(sessaoInicial.token))

  const sair = useCallback(() => {
    setToken(null)
    setUser(null)
    setPerfil(null)
    limparSessaoAuth()
  }, [])

  const aplicarSessao = useCallback((tokenRecebido, usuarioRecebido) => {
    const perfilNormalizado = normalizarPerfil(usuarioRecebido?.role)
    setToken(tokenRecebido)
    setUser(usuarioRecebido)
    setPerfil(perfilNormalizado)
    salvarSessaoAuth({
      token: tokenRecebido,
      user: usuarioRecebido,
      perfil: perfilNormalizado,
    })
    return perfilNormalizado
  }, [])

  // Ao iniciar com token salvo, valida e sincroniza os dados com o backend
  useEffect(() => {
    if (!sessaoInicial.token) return undefined

    let ativo = true

    async function sincronizarUsuario() {
      try {
        const dados = await authService.getMe()
        if (!ativo) return
        const perfilNormalizado = normalizarPerfil(dados?.role)
        setUser(dados)
        setPerfil(perfilNormalizado)
        salvarSessaoAuth({ user: dados, perfil: perfilNormalizado })
      } catch {
        if (ativo) sair()
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    sincronizarUsuario()
    return () => {
      ativo = false
    }
  }, [sessaoInicial.token, sair])

  // Sincroniza estado se o interceptor HTTP detectar 401 (sessão expirada)
  useEffect(() => {
    function aoExpirarSessao() {
      sair()
    }

    window.addEventListener(EVENTO_SESSAO_EXPIRADA, aoExpirarSessao)
    return () => {
      window.removeEventListener(EVENTO_SESSAO_EXPIRADA, aoExpirarSessao)
    }
  }, [sair])

  const login = useCallback(async (email, password) => {
    const authData = await authService.login(email, password)
    return aplicarSessao(authData.token, authData.user)
  }, [aplicarSessao])

  const cadastrar = useCallback(async ({ name, email, password, role, phone }) => {
    const authData = await authService.register({ name, email, password, role, phone })
    return aplicarSessao(authData.token, authData.user)
  }, [aplicarSessao])

  const entrar = useCallback((novoPerfil) => {
    setPerfil(novoPerfil)
    salvarSessaoAuth({ perfil: novoPerfil })
  }, [])

  const valor = useMemo(() => ({
    user,
    token,
    perfil,
    carregando,
    login,
    cadastrar,
    entrar,
    sair,
  }), [user, token, perfil, carregando, login, cadastrar, entrar, sair])

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
