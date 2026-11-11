import { Star } from 'lucide-react'

export default function AvaliacoesConselheiro({ avaliacoes }) {
  if (!avaliacoes || avaliacoes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-divisoria p-8 text-center text-texto-secundario">
        Ainda não há avaliações registradas.
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {avaliacoes.map((av) => (
        <div
          key={av.id}
          className="rounded-2xl border border-divisoria bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-verde-titulo">{av.clienteNome}</p>
              <p className="text-xs text-texto-secundario">{av.negocio}</p>
            </div>
            <div className="flex items-center gap-1 text-dourado">
              {Array.from({ length: av.nota }).map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm italic text-verde-titulo leading-relaxed">
            “{av.texto}”
          </p>
          <p className="mt-3 text-right text-xs text-texto-secundario">{av.data}</p>
        </div>
      ))}
    </div>
  )
}
