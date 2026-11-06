import { CalendarDays, Search, Video } from 'lucide-react'
import { passos } from './dadosHome'

const icones = [Search, CalendarDays, Video]

export default function SecaoComoFunciona() {
  return (
    <section id="como-funciona" className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-extrabold uppercase tracking-[.18em] text-dourado-texto">Simples, humano e seguro</p>
        <h2 className="mt-4 font-titulo text-4xl leading-tight tracking-tight text-verde-titulo sm:text-5xl">
          Da dúvida a um plano claro
          <br />
          em poucos passos
        </h2>
        <p className="mt-4 text-xl text-texto-secundario">
          Sem burocracia. Você escolhe com quem conversar e quando começar.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {passos.map((passo, indice) => {
          const Icone = icones[indice]
          return (
            <li key={passo.numero} className="rounded-3xl border border-divisoria bg-white p-8 shadow-sm">
              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-campo text-verde-icone">
                  <Icone aria-hidden="true" size={26} />
                </span>
                <span aria-hidden="true" className="font-titulo text-5xl text-dourado-claro">
                  {passo.numero}
                </span>
              </div>
              <h3 className="mt-8 font-titulo text-2xl text-verde-titulo">
                <span className="sr-only">Passo {indice + 1}: </span>
                {passo.titulo}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-texto-secundario">{passo.texto}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
