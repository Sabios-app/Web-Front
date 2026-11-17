import { ArrowRight, Star } from 'lucide-react'
import BotaoLink from './BotaoLink'
import { formatarNota, formatarReais } from '../data/especialistas'

export default function CartaoEspecialista({ especialista }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition duration-500 ease-suave hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-4/3 shrink-0 overflow-hidden bg-campo">
        <img
          src={especialista.foto}
          alt={`Retrato de ${especialista.nome}`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 ease-suave hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-titulo text-2xl text-verde-titulo">{especialista.nome}</h2>
          <p className="flex shrink-0 items-center gap-1 text-base sm:text-lg">
            <Star aria-hidden="true" size={18} className="fill-dourado text-dourado" />
            <strong>{formatarNota(especialista.avaliacao)}</strong>
            <span className="text-sm text-texto-secundario">
              ({especialista.totalAvaliacoes})
              <span className="sr-only"> avaliações</span>
            </span>
          </p>
        </div>
        <p className="mt-1 text-base font-bold text-dourado-texto">{especialista.area}</p>
        <p className="mt-3 text-base leading-relaxed text-texto-secundario">{especialista.descricao}</p>

        <ul className="so-completo mt-4 flex flex-wrap gap-2">
          {especialista.temas.map((tema) => (
            <li key={tema} className="rounded-full bg-campo px-3 py-1 text-sm font-semibold text-verde-titulo">
              {tema}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-divisoria pt-5">
          <p className="flex flex-col">
            <span className="text-sm text-texto-secundario">a partir de</span>
            <span>
              <strong className="text-xl text-verde-titulo sm:text-2xl">{formatarReais(especialista.valorSessao)}</strong>
              <span className="text-sm text-texto-secundario"> / sessão</span>
            </span>
          </p>
          <BotaoLink
            href={`/especialistas/${especialista.id}`}
            variante="contorno"
            className="min-h-12 px-4 text-base sm:px-5 sm:text-lg"
            aria-label={`Ver perfil de ${especialista.nome}`}
          >
            Ver perfil
            <ArrowRight aria-hidden="true" size={18} />
          </BotaoLink>
        </div>
      </div>
    </article>
  )
}
