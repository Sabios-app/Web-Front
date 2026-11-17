import { Lightbulb } from 'lucide-react'

export default function BlocoDicas({ titulo, dicas }) {
  return (
    <section className="mt-12 rounded-3xl border border-dourado-claro/30 bg-dourado-aviso/50 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-dourado-escuro shadow-xs">
          <Lightbulb size={24} aria-hidden="true" />
        </div>
        <div>
          <h2 className="font-titulo text-xl font-bold text-verde-titulo">{titulo}</h2>
          <ul className="mt-3 space-y-2 text-sm text-verde-petroleo sm:text-base">
            {dicas.map(({ destaque, texto }) => (
              <li key={destaque} className="flex items-start gap-2">
                <span className="font-bold text-dourado-escuro" aria-hidden="true">
                  •
                </span>
                <span>
                  <strong>{destaque}:</strong> {texto}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
