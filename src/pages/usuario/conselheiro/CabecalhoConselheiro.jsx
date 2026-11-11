import { CheckCircle2, ExternalLink, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CabecalhoConselheiro({
  conselheiro,
  disponivel,
  onAlternarDisponibilidade,
  onAbrirDisponibilidade,
}) {
  return (
    <div className="rounded-3xl border border-divisoria bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={conselheiro.foto}
              alt={conselheiro.nome}
              className="h-20 w-20 rounded-full border-2 border-verde-petroleo object-cover shadow-sm sm:h-24 sm:w-24"
            />
            <span
              className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white ${
                disponivel ? 'bg-emerald-500' : 'bg-gray-400'
              }`}
              title={disponivel ? 'Disponível' : 'Indisponível'}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-dourado-aviso px-3 py-1 text-xs font-bold uppercase tracking-wider text-dourado-escuro">
                <Sparkles size={13} aria-hidden="true" /> Conselheiro Sênior
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800">
                <CheckCircle2 size={14} className="text-emerald-700" /> Perfil Verificado
              </span>
            </div>

            <h1 className="mt-1 font-titulo text-2xl font-bold text-verde-titulo sm:text-3xl">
              {conselheiro.nome}
            </h1>

            <p className="text-base text-texto-secundario sm:text-lg">
              {conselheiro.cargo} • {conselheiro.area} ({conselheiro.cidade})
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onAlternarDisponibilidade}
            className={`inline-flex min-h-12 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors ${
              disponivel
                ? 'border-emerald-700/30 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                : 'border-divisoria bg-campo text-texto-secundario hover:bg-divisoria'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                disponivel ? 'bg-emerald-700' : 'bg-gray-400'
              }`}
            />
            {disponivel ? 'Recebendo agendamentos' : 'Agenda pausada'}
          </button>

          <button
            type="button"
            onClick={onAbrirDisponibilidade}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-verde-petroleo bg-white px-5 text-sm font-bold text-verde-petroleo transition-colors hover:bg-campo"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            Configurar horários
          </button>

          <Link
            to={`/especialistas/${conselheiro.id}`}
            className="inline-flex min-h-12 items-center gap-1.5 rounded-full bg-verde-petroleo px-5 text-sm font-bold text-white transition-colors hover:bg-verde-hover"
          >
            <span>Ver perfil público</span>
            <ExternalLink size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
