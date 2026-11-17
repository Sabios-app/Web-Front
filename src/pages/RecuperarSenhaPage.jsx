import { useState } from 'react'
import { Link } from 'react-router-dom'
import Botao from '../components/Botao'
import CampoTexto from '../components/CampoTexto'
import AuthLayout from '../layouts/AuthLayout'

export default function RecuperarSenhaPage() {
  const [enviado, setEnviado] = useState(false)
  const [email, setEmail] = useState('')

  function enviar(event) {
    event.preventDefault()
    setEnviado(true)
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <Link to="/login" className="text-sm font-bold text-dourado-escuro underline-offset-4 hover:underline">← Voltar para entrar</Link>
        <h1 className="mt-8 font-titulo text-4xl text-verde-titulo">Recupere sua senha</h1>
        <p className="mt-3 text-texto-secundario">Informe seu e-mail e enviaremos as instruções para criar uma nova senha.</p>
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
              aoMudar={(event) => setEmail(event.target.value)}
              obrigatorio
            />
            <Botao type="submit">Enviar instruções</Botao>
          </form>
        )}
      </div>
    </AuthLayout>
  )
}
