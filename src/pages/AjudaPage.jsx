import { ChevronDown, Mail, MessageCircleQuestion } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const perguntas = [
  {
    pergunta: 'Como encontro um especialista?',
    resposta: 'Pesquise por desafio ou área de atuação, veja os perfis e escolha o profissional que combina com o momento do seu negócio.',
  },
  {
    pergunta: 'Como funciona a mentoria?',
    resposta: 'Você agenda uma conversa de uma hora com um conselheiro experiente e recebe orientação prática para avançar com mais segurança.',
  },
  {
    pergunta: 'Posso cancelar uma sessão?',
    resposta: 'Sim. As regras de cancelamento e reagendamento aparecem durante a confirmação da sessão.',
  },
]

export default function AjudaPage() {
  const [aberta, setAberta] = useState(0)

  return (
    <MainLayout>
      <section className="mx-auto max-w-3xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
        <Link to="/" className="text-sm font-bold text-dourado-escuro underline-offset-4 hover:underline">← Voltar para o início</Link>
        <div className="mt-8 flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-dourado-aviso text-dourado-escuro">
            <MessageCircleQuestion aria-hidden="true" size={28} />
          </span>
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-dourado-texto">Central de ajuda</p>
            <h1 className="mt-1 font-titulo text-4xl text-verde-titulo sm:text-5xl">Como podemos ajudar?</h1>
          </div>
        </div>
        <div className="mt-10 divide-y divide-divisoria rounded-3xl border border-divisoria bg-white px-5 shadow-sm sm:px-7">
          {perguntas.map((item, index) => (
            <div key={item.pergunta}>
              <button
                type="button"
                onClick={() => setAberta(aberta === index ? -1 : index)}
                aria-expanded={aberta === index}
                className="flex min-h-16 w-full items-center justify-between gap-4 text-left font-bold text-verde-titulo"
              >
                {item.pergunta}
                <ChevronDown aria-hidden="true" size={20} className={`shrink-0 transition-transform motion-reduce:transition-none ${aberta === index ? 'rotate-180' : ''}`} />
              </button>
              {aberta === index && <p className="pb-5 pr-8 leading-relaxed text-texto-secundario">{item.resposta}</p>}
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-3xl bg-campo p-6 sm:p-8">
          <Mail aria-hidden="true" className="text-dourado-escuro" />
          <h2 className="mt-4 font-titulo text-2xl text-verde-titulo">Ainda ficou com dúvida?</h2>
          <p className="mt-2 text-texto-secundario">Envie uma mensagem para nosso suporte e responderemos assim que possível.</p>
          <a href="mailto:suporte@sabios.com.br" className="mt-5 inline-flex min-h-12 items-center rounded-full bg-verde-petroleo px-5 font-bold text-white hover:bg-verde-hover">Falar com o suporte</a>
        </div>
      </section>
    </MainLayout>
  )
}
