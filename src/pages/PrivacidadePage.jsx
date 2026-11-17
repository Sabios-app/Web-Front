import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

export default function PrivacidadePage() {
  return (
    <MainLayout>
      <article className="mx-auto max-w-3xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
        <Link to="/" className="text-sm font-bold text-dourado-escuro underline-offset-4 hover:underline">← Voltar para o início</Link>
        <p className="mt-8 text-sm font-extrabold uppercase tracking-[.18em] text-dourado-texto">Transparência</p>
        <h1 className="mt-3 font-titulo text-4xl text-verde-titulo sm:text-5xl">Privacidade</h1>
        <p className="mt-5 text-lg leading-relaxed text-texto-secundario">Na Sábios, usamos seus dados somente para conectar você às melhores experiências de mentoria, proteger sua conta e melhorar a plataforma.</p>
        <div className="mt-10 space-y-8 text-lg leading-relaxed text-verde-titulo">
          <section><h2 className="font-titulo text-2xl">Quais dados usamos</h2><p className="mt-2">Dados de cadastro, preferências de busca, agenda e histórico de sessões necessários para oferecer o serviço.</p></section>
          <section><h2 className="font-titulo text-2xl">Como protegemos seus dados</h2><p className="mt-2">Adotamos controles de acesso e boas práticas de segurança. Nunca vendemos seus dados pessoais.</p></section>
          <section><h2 className="font-titulo text-2xl">Seus direitos</h2><p className="mt-2">Você pode solicitar acesso, correção ou exclusão dos seus dados pelo canal de suporte.</p></section>
        </div>
      </article>
    </MainLayout>
  )
}
