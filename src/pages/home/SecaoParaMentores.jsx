import { ArrowRight, Check } from 'lucide-react'
import BotaoLink from '../../components/BotaoLink'
import { imagens, vantagensMentor } from './dadosHome'

export default function SecaoParaMentores() {
  return (
    <section id="para-mentores" className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24">
      <div className="grid overflow-hidden rounded-[32px] bg-dourado-areia lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative min-h-[320px] lg:min-h-[500px]">
          <img
            src={imagens.paraMentores}
            alt="Mentor sênior orientando um empreendedor"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="text-sm font-extrabold uppercase tracking-[.18em] text-dourado-texto">Você tem muito a compartilhar</p>
          <h2 className="mt-4 font-titulo text-4xl leading-tight tracking-tight text-verde-titulo sm:text-5xl">
            Sua experiência pode abrir caminhos.
          </h2>
          <p className="mt-5 max-w-xl text-xl leading-relaxed text-verde-titulo">
            Transforme sua trajetória em impacto, propósito e uma nova fonte de renda — no seu ritmo.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {vantagensMentor.map((vantagem) => (
              <li key={vantagem} className="flex items-center gap-3 text-lg font-bold text-verde-titulo">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-verde-petroleo text-white">
                  <Check aria-hidden="true" size={18} strokeWidth={3} />
                </span>
                {vantagem}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <BotaoLink href="/cadastro?perfil=mentor">
              Quero ser mentor
              <ArrowRight aria-hidden="true" size={22} />
            </BotaoLink>
          </div>
        </div>
      </div>
    </section>
  )
}
