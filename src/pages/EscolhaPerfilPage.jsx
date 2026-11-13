import { Briefcase, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import ProfileCard from '../components/ProfileCard'

export default function EscolhaPerfilPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-xl text-center">
        <div className="motion-safe:animate-aparecer">
          <p className="text-sm font-bold uppercase tracking-widest text-dourado-texto">
            Crie sua conta gratuitamente
          </p>
          <h1 className="mt-3 font-titulo text-4xl text-verde-titulo">
            Como você quer usar a Sábios?
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-texto-secundario">
            Escolha seu perfil para prepararmos uma experiência feita para seus objetivos.
          </p>
        </div>

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-2">
          <ProfileCard
            icon={<Briefcase size={22} />}
            iconStyle="bg-campo text-verde-icone"
            title="Quero ser cliente"
            description="Preciso de orientação para tomar melhores decisões e fazer meu negócio crescer."
            linkText="Encontrar um conselheiro"
            to="/cadastro/cliente"
            className="motion-safe:animate-aparecer [animation-delay:120ms]"
          />
          <ProfileCard
            icon={<Star size={22} />}
            iconStyle="bg-dourado-aviso text-dourado-escuro"
            title="Quero ser conselheiro"
            description="Quero compartilhar minha experiência, gerar impacto e ter uma renda extra."
            linkText="Compartilhar experiência"
            to="/cadastro/conselheiro"
            className="motion-safe:animate-aparecer [animation-delay:240ms]"
          />
        </div>

        <p className="mt-8 text-sm text-texto-secundario motion-safe:animate-aparecer [animation-delay:360ms]">
          Já possui uma conta?{' '}
          <Link to="/login" className="font-semibold text-dourado-texto hover:underline">
            Entrar agora
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}