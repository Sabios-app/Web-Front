import { ChevronDown, Lightbulb } from 'lucide-react'

export default function BlocoDicas({ titulo, dicas }) {
  return (
    <section className="mt-12 rounded-3xl border border-dourado-claro/30 bg-dourado-aviso/50 p-6 sm:p-8">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-start gap-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dourado-foco">
          <h2 className="flex w-full items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-dourado-escuro shadow-xs">
              <Lightbulb size={24} aria-hidden="true" />
            </span>
            <span className="flex flex-1 items-center justify-between gap-3">
              <span className="font-titulo text-xl font-bold text-verde-titulo">
                {titulo}
              </span>
              <ChevronDown
                size={20}
                aria-hidden="true"
                className="shrink-0 text-verde-petroleo transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              />
            </span>
          </h2>
        </summary>
        <div className="mt-4 pl-16">
          <ul className="space-y-2 text-sm text-verde-petroleo sm:text-base">
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
      </details>
    </section>
  )
}
