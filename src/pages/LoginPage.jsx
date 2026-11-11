import { Briefcase, Star } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import CampoTexto from '../components/CampoTexto'
import AuthLayout from '../layouts/AuthLayout'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipoPerfil, setTipoPerfil] = useState('conselheiro')

  function handleLogin(e) {
    e.preventDefault()
    if (tipoPerfil === 'conselheiro') {
      navigate('/usuario/conselheiro')
    } else {
      navigate('/usuario/cliente')
    }
  }

  return (
    <AuthLayout>
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

        {/* Escolha do tipo de acesso rápido */}
        <div className="mt-6 rounded-2xl border border-divisoria bg-campo/60 p-1.5 flex gap-1">
          <button
            type="button"
            onClick={() => setTipoPerfil('conselheiro')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition ${
              tipoPerfil === 'conselheiro'
                ? 'bg-verde-petroleo text-white shadow-xs'
                : 'text-texto-secundario hover:text-verde-petroleo'
            }`}
          >
            <Star size={16} />
            Conselheiro
          </button>
          <button
            type="button"
            onClick={() => setTipoPerfil('cliente')}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition ${
              tipoPerfil === 'cliente'
                ? 'bg-verde-petroleo text-white shadow-xs'
                : 'text-texto-secundario hover:text-verde-petroleo'
            }`}
          >
            <Briefcase size={16} />
            Cliente
          </button>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <CampoTexto
            id="email"
            rotulo="E-mail"
            placeholder="seuemail@exemplo.com"
            valor={email}
            aoMudar={(e) => setEmail(e.target.value)}
          />

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="senha" className="block text-base font-bold text-verde-titulo">
                Senha
              </label>
              <a href="#" className="text-xs font-semibold text-dourado-escuro hover:underline">
                Esqueceu a senha?
              </a>
            </div>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="h-14 w-full rounded-xl border border-divisoria bg-white px-4 text-lg text-verde-petroleo focus:border-dourado-foco focus:outline-none focus:ring-2 focus:ring-dourado-foco/30"
            />
          </div>

          <div className="pt-2">
            <Botao type="submit">
              Entrar como {tipoPerfil === 'conselheiro' ? 'Conselheiro' : 'Cliente'}
            </Botao>
          </div>
        </form>

        <div className="mt-8 border-t border-divisoria pt-6 text-center">
          <p className="text-sm text-texto-secundario">
            Ainda não tem cadastro?{' '}
            <Link to="/cadastro" className="font-bold text-dourado-escuro hover:underline">
              Criar conta gratuita
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
