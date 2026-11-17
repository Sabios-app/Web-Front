import { CheckCircle2, RotateCcw, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HistoricoMentoriasCliente({ historico }) {
  if (!historico || historico.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-divisoria p-8 text-center text-texto-secundario">
        Você ainda não concluiu mentorias. Suas sessões realizadas aparecerão aqui.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {historico.map((h) => (
        <div
          key={h.id}
          className="rounded-2xl border border-divisoria bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <img
                src={h.especialistaFoto}
                alt={h.especialistaNome}
                className="h-14 w-14 rounded-full border border-divisoria object-cover"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-titulo text-lg font-bold text-verde-titulo">
                    {h.especialistaNome}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-verde-icone">
                    <CheckCircle2 size={13} className="text-verde-icone" /> Realizada em {h.data}
                  </span>
                </div>

                <p className="text-xs font-bold uppercase tracking-wider text-dourado-escuro">
                  {h.especialistaArea}
                </p>

                <p className="mt-2 text-sm font-semibold text-verde-titulo">
                  Tema abordado: {h.tema}
                </p>

                <div className="mt-2 rounded-xl bg-campo/60 p-3 text-sm text-texto-secundario">
                  <strong className="text-verde-petroleo">Resumo dos aprendizados:</strong> {h.resumo}
                </div>

                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-verde-petroleo">
                  <span>Sua avaliação:</span>
                  <div className="flex items-center text-dourado">
                    {Array.from({ length: h.notaDada }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <Link
                to={`/especialistas/${h.especialistaId}`}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border-2 border-verde-petroleo bg-white px-4 text-xs font-bold text-verde-petroleo transition hover:bg-campo"
              >
                <RotateCcw size={14} />
                Agendar nova sessão
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
