import { Briefcase, Star } from 'lucide-react'
import AuthLayout from '../layouts/AuthLayout'
import ProfileCard from '../components/ProfileCard'

export default function EscolhaPerfilPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-dourado-escuro">
          Crie sua conta gratuitamente
        </p>
        <h1 className="mt-3 font-titulo text-4xl text-verde-titulo">
          Como você quer usar a Sábios?
        </h1>
        <p className="mt-3 text-texto-secundario">
          Escolha seu perfil para prepararmos uma experiência feita para seus objetivos.
        </p>

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-2">
          <ProfileCard
            icon={<Briefcase size={22} />}
            iconStyle="bg-campo text-verde-icone"
            title="Quero ser cliente"
            description="Preciso de orientação para tomar melhores decisões e fazer meu negócio crescer."
            linkText="Encontrar um conselheiro"
          />
          <ProfileCard
            icon={<Star size={22} />}
            iconStyle="bg-dourado-aviso text-dourado-escuro"
            title="Quero ser conselheiro"
            description="Quero compartilhar minha experiência, gerar impacto e ter uma renda extra."
            linkText="Compartilhar experiência"
          />
        </div>

        <p className="mt-8 text-sm text-texto-secundario">
          Já possui uma conta?{' '}
          <a href="#" className="font-semibold text-dourado-escuro">Entrar agora</a>
        </p>
      </div>
    </AuthLayout>
  )
}