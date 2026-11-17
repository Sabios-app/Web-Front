import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatarNota, formatarReais } from '../../../data/especialistas'

export default function ConselheirosRecomendadosCliente({ conselheiros }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {conselheiros.map((esp) => (
        <div
          key={esp.id}
          className="flex flex-col justify-between rounded-3xl border border-divisoria bg-white p-5 shadow-sm transition duration-500 ease-suave hover:-translate-y-1 hover:border-dourado-claro hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
        >
          <div>
            <div className="flex items-center gap-4">
              <img
                src={esp.foto}
                alt={esp.nome}
                className="h-16 w-16 rounded-full border-2 border-verde-petroleo object-cover"
              />
              <div>
                <h3 className="font-titulo text-xl font-bold text-verde-titulo">
                  {esp.nome}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-dourado-escuro">
                  {esp.area}
                </p>
                <div className="mt-1 flex items-center gap-1 text-sm font-semibold text-verde-titulo">
                  <Star size={14} className="fill-current text-dourado" />
                  <span>{formatarNota(esp.avaliacao)}</span>
                  <span className="text-xs text-texto-secundario">
                    ({esp.totalAvaliacoes})
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-texto-secundario leading-relaxed">
              {esp.descricao}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {esp.temas.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-campo px-2.5 py-0.5 text-xs font-semibold text-verde-petroleo"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-divisoria pt-4">
            <div>
              <span className="text-xs text-texto-secundario">Sessão de 1h</span>
              <p className="text-lg font-bold text-verde-titulo">
                {formatarReais(esp.valorSessao)}
              </p>
            </div>

            <Link
              to={`/especialistas/${esp.id}`}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-verde-petroleo px-4 text-xs font-bold text-white transition hover:bg-verde-hover"
            >
              <span>Ver agenda</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
