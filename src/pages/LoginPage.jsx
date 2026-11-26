import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import fotoLogin from '../assets/homeLogin.jpg'
import Botao from '../components/Botao'
import CampoTexto from '../components/CampoTexto'
import AlertaFormulario from '../components/feedback/AlertaFormulario'
import useAuth from '../hooks/useAuth'
import useBloqueioPorTentativas from '../hooks/useBloqueioPorTentativas'
import AuthLayout from '../layouts/AuthLayout'
import {
  extrairErrosDeCampo,
  formatarTempoEspera,
  parseApiError,
} from '../utils/apiError'
import { consumirAvisoSessaoExpirada } from '../utils/authStorage'

const ALIASES_LOGIN = { password: 'senha' }
const CAMPOS_LOGIN = ['email', 'senha']

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { login } = useAuth()
  const { bloqueado, segundosRestantes, iniciarBloqueio, limparBloqueio } =
    useBloqueioPorTentativas()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [errosCampos, setErrosCampos] = useState({})
  const [carregando, setCarregando] = useState(false)
  const [avisoSessao, setAvisoSessao] = useState(() => {
    const porQuery = searchParams.get('motivo') === 'sessao-expirada'
    const porStorage = consumirAvisoSessaoExpirada()
    return porQuery || porStorage
      ? 'Sua sessão expirou. Faça login novamente para continuar.'
      : ''
  })

  function atualizarEmail(valor) {
    setEmail(valor)
    if (errosCampos.email) {
      setErrosCampos((atual) => ({ ...atual, email: '' }))
    }
  }

  function atualizarSenha(valor) {
    setSenha(valor)
    if (errosCampos.senha) {
      setErrosCampos((atual) => ({ ...atual, senha: '' }))
    }
  }

  async function handleLogin(e) {
    e.preventDefault()
    if (bloqueado) return

    setErro('')
    setErrosCampos({})
    setAvisoSessao('')
    if (searchParams.has('motivo')) {
      setSearchParams({}, { replace: true })
    }
    setCarregando(true)

    try {
      const perfilRetornado = await login(email, senha)
      limparBloqueio()
      navigate(perfilRetornado === 'conselheiro' ? '/usuario/conselheiro' : '/usuario/cliente')
    } catch (err) {
      const parsed = parseApiError(err, 'E-mail ou senha inválidos. Tente novamente.')
      if (parsed.status === 429 && parsed.retryAfterSeconds) {
        iniciarBloqueio(parsed.retryAfterSeconds)
      }
      const { errosCampos: campos, mensagemGeral } = extrairErrosDeCampo(
        parsed,
        ALIASES_LOGIN,
        CAMPOS_LOGIN,
      )
      setErrosCampos(campos)
      setErro(mensagemGeral)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <AuthLayout imagem={fotoLogin}>
      <div className="w-full max-w-md">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-dourado-escuro">
            Acesse sua conta
          </span>
          <h1 className="mt-2 font-titulo text-3xl font-bold text-verde-titulo sm:text-4xl">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-sm text-texto-secundario sm:text-base">
            Digite seus dados para acessar sua agenda e suas mentorias.
          </p>
        </div>

        <AlertaFormulario tipo="aviso">{avisoSessao}</AlertaFormulario>
        <AlertaFormulario tipo="erro">
          {erro}
          {bloqueado && (
            <span className="mt-1 block font-bold">
              Tente novamente em {formatarTempoEspera(segundosRestantes)}.
            </span>
          )}
        </AlertaFormulario>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <CampoTexto
            id="email"
            type="email"
            rotulo="E-mail"
            placeholder="seuemail@exemplo.com"
            valor={email}
            aoMudar={(e) => atualizarEmail(e.target.value)}
            erro={errosCampos.email}
            obrigatorio
          />

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="senha"
                className="block text-base font-bold text-verde-titulo"
              >
                Senha
              </label>
              <Link
                to="/recuperar-senha"
                className="text-xs font-semibold text-dourado-escuro hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => atualizarSenha(e.target.value)}
              placeholder="••••••••"
              required
              aria-invalid={Boolean(errosCampos.senha)}
              aria-describedby={errosCampos.senha ? 'senha-erro' : undefined}
              className={`h-14 w-full rounded-xl border bg-white px-4 text-lg text-verde-petroleo placeholder:text-texto-secundario/70 transition-all duration-200 focus:outline-none! focus:ring-2 focus:ring-offset-0 ${
                errosCampos.senha
                  ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                  : 'border-divisoria focus:border-dourado-foco focus:ring-dourado-foco/15'
              }`}
            />
            {errosCampos.senha && (
              <p id="senha-erro" role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
                {errosCampos.senha}
              </p>
            )}
          </div>

          <div className="pt-2">
            <Botao type="submit" desabilitado={carregando || bloqueado}>
              {carregando
                ? 'Entrando...'
                : bloqueado
                  ? `Aguarde (${formatarTempoEspera(segundosRestantes)})`
                  : 'Entrar na plataforma'}
            </Botao>
          </div>
        </form>

        <div className="mt-8 border-t border-divisoria pt-6 text-center">
          <p className="text-sm text-texto-secundario">
            Ainda não tem cadastro?{' '}
            <Link
              to="/cadastro"
              className="font-bold text-dourado-escuro hover:underline"
            >
              Criar conta gratuita
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
