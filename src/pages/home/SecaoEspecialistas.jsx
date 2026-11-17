import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CartaoEspecialista from '../../components/CartaoEspecialista'
import { especialistasEmDestaque } from './dadosHome'

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
          <Link
            to="/especialistas"
            className="inline-flex items-center gap-2 text-lg font-bold text-dourado-texto underline-offset-4 hover:underline"
          >
            Ver todos os especialistas
            <ArrowRight aria-hidden="true" size={20} />
          </Link>
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
