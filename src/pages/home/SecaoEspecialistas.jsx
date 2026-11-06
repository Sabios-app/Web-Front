import { ArrowRight, Star } from 'lucide-react'
import BotaoLink from '../../components/BotaoLink'
import { formatarNota, formatarReais } from '../../data/especialistas'
import { especialistasEmDestaque } from './dadosHome'

function CartaoEspecialista({ especialista }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-campo">
        <img
          src={especialista.foto}
          alt={`Retrato de ${especialista.nome}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-titulo text-2xl text-verde-titulo">{especialista.nome}</h3>
          <p className="flex shrink-0 items-center gap-1 text-lg">
            <Star aria-hidden="true" size={18} className="fill-dourado text-dourado" />
            <strong>{formatarNota(especialista.avaliacao)}</strong>
            <span className="text-texto-secundario">
              ({especialista.totalAvaliacoes}
              <span className="sr-only"> avaliações</span>)
            </span>
          </p>
        </div>
        <p className="mt-1 text-lg font-bold text-dourado-texto">{especialista.area}</p>
        <p className="mt-3 text-lg text-texto-secundario">{especialista.descricao}</p>

        <ul className="so-completo mt-4 mb-auto flex flex-wrap gap-2">
          {especialista.temas.map((tema) => (
            <li key={tema} className="rounded-full bg-campo px-3 py-1 font-semibold text-verde-titulo">
              {tema}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-divisoria pt-5">
          <p className="flex flex-col">
            <span className="text-texto-secundario">a partir de</span>
            <span>
              <strong className="text-2xl text-verde-titulo">{formatarReais(especialista.valorSessao)}</strong>
              <span className="text-texto-secundario"> / sessão</span>
            </span>
          </p>
          <BotaoLink
            href={`/especialistas/${especialista.id}`}
            variante="contorno"
            className="min-h-12 px-5"
            aria-label={`Ver perfil de ${especialista.nome}`}
          >
            Ver perfil
          </BotaoLink>
        </div>
      </div>
    </article>
  )
}

export default function SecaoEspecialistas() {
  return (
    <section id="especialistas" className="bg-campo/70">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-dourado-texto">Experiência comprovada</p>
            <h2 className="mt-3 font-titulo text-4xl tracking-tight text-verde-titulo sm:text-5xl">
              Especialistas em destaque
            </h2>
            <p className="mt-3 text-xl text-texto-secundario">
              Pessoas que construíram histórias e agora ajudam você a construir a sua.
            </p>
          </div>
          <a
            href="/especialistas"
            className="inline-flex items-center gap-2 text-lg font-bold text-dourado-texto underline-offset-4 hover:underline"
          >
            Ver todos os especialistas
            <ArrowRight aria-hidden="true" size={20} />
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {especialistasEmDestaque.map((especialista) => (
            <CartaoEspecialista key={especialista.id} especialista={especialista} />
          ))}
        </div>
      </div>
    </section>
  )
}
