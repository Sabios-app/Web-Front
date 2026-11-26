import { useState } from 'react'
import { Link } from 'react-router-dom'
import Botao from '../components/Botao'
import CampoTexto from '../components/CampoTexto'
import AlertaFormulario from '../components/feedback/AlertaFormulario'
import useBloqueioPorTentativas from '../hooks/useBloqueioPorTentativas'
import AuthLayout from '../layouts/AuthLayout'
import { authService } from '../services/sabiosServices'
import {
  extrairErrosDeCampo,
  formatarTempoEspera,
  parseApiError,
} from '../utils/apiError'

export default function RecuperarSenhaPage() {
  const [enviado, setEnviado] = useState(false)
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState('')
  const [errosCampos, setErrosCampos] = useState({})
  const [carregando, setCarregando] = useState(false)
  const { bloqueado, segundosRestantes, iniciarBloqueio, limparBloqueio } =
    useBloqueioPorTentativas()

  function atualizarEmail(valor) {
    setEmail(valor)
    if (errosCampos.email) {
      setErrosCampos((atual) => ({ ...atual, email: '' }))
    }
  }

  async function enviar(event) {
    event.preventDefault()
    if (bloqueado) return

    setErro('')
    setErrosCampos({})
    setCarregando(true)

    try {
      await authService.forgotPassword(email.trim())
      limparBloqueio()
      setEnviado(true)
    } catch (err) {
      const parsed = parseApiError(
        err,
        'Não foi possível enviar as instruções agora. Tente novamente.',
      )
      if (parsed.status === 429 && parsed.retryAfterSeconds) {
        iniciarBloqueio(parsed.retryAfterSeconds)
      }
      const { errosCampos: campos, mensagemGeral } = extrairErrosDeCampo(
        parsed,
        {},
        ['email'],
      )
      setErrosCampos(campos)
      setErro(mensagemGeral)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <Link to="/login" className="text-sm font-bold text-dourado-escuro underline-offset-4 hover:underline">
          ← Voltar para entrar
        </Link>
        <h1 className="mt-8 font-titulo text-4xl text-verde-titulo">Recupere sua senha</h1>
        <p className="mt-3 text-texto-secundario">
          Informe seu e-mail e enviaremos as instruções para criar uma nova senha.
        </p>

        <AlertaFormulario tipo="erro">
          {erro}
          {bloqueado && (
            <span className="mt-1 block font-bold">
              Tente novamente em {formatarTempoEspera(segundosRestantes)}.
            </span>
          )}
        </AlertaFormulario>

        {enviado ? (
          <div role="status" className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
            <strong>Instruções enviadas.</strong>
            <p className="mt-1">Verifique sua caixa de entrada e a pasta de spam.</p>
          </div>
        ) : (
          <form onSubmit={enviar} className="mt-8 space-y-5">
            <CampoTexto
              id="email-recuperacao"
              rotulo="E-mail"
              type="email"
              placeholder="seuemail@exemplo.com"
              valor={email}
              aoMudar={(event) => atualizarEmail(event.target.value)}
              erro={errosCampos.email}
              obrigatorio
            />
            <Botao type="submit" desabilitado={carregando || bloqueado}>
              {carregando
                ? 'Enviando...'
                : bloqueado
                  ? `Aguarde (${formatarTempoEspera(segundosRestantes)})`
                  : 'Enviar instruções'}
            </Botao>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}
