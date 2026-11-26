import { Briefcase, Star } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import CampoTexto from '../components/CampoTexto'
import useAuth from '../hooks/useAuth'
import AuthLayout from '../layouts/AuthLayout'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipoPerfil, setTipoPerfil] = useState('conselheiro')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const perfilRetornado = await login(email, senha)
      navigate(perfilRetornado === 'conselheiro' ? '/usuario/conselheiro' : '/usuario/cliente')
    } catch (err) {
      const msg = err.response?.data?.message || 'E-mail ou senha inválidos. Tente novamente.'
      setErro(msg)
    } finally {
      setCarregando(false)
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

        {erro && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <CampoTexto
            id="email"
            rotulo="E-mail"
            placeholder="seuemail@exemplo.com"
            valor={email}
            aoMudar={(e) => setEmail(e.target.value)}
            obrigatorio
          />

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="senha" className="block text-base font-bold text-verde-titulo">
                Senha
              </label>
              <Link to="/recuperar-senha" className="text-xs font-semibold text-dourado-escuro hover:underline">
                Esqueceu a senha?
              </Link>
            </div>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              className="h-14 w-full rounded-xl border border-divisoria bg-white px-4 text-lg text-verde-petroleo placeholder:text-texto-secundario/70 transition-all duration-200 focus:border-dourado-foco focus:outline-none! focus:ring-2 focus:ring-dourado-foco/15 focus:ring-offset-0"
            />
          </div>

          <div className="pt-2">
            <Botao type="submit" desabilitado={carregando}>
              {carregando ? 'Entrando...' : 'Entrar na plataforma'}
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
