import { MapPin, Star } from 'lucide-react'
import { formatarNota } from '../../utils/formatadores'

/** Topo do perfil: foto, nome, área, avaliação, cidade e temas. */
export default function ResumoEspecialista({ especialista }) {
  const temas = especialista.temas || []

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
      <div className="relative mx-auto w-40 shrink-0 sm:mx-0 sm:w-48">
        <div
          aria-hidden="true"
          className="absolute -right-3 -top-3 h-full w-full rounded-[44%_56%_45%_55%/52%_42%_58%_48%] bg-dourado-areia"
        />
        <div className="relative aspect-[.88] overflow-hidden rounded-[46%_54%_48%_52%/40%_43%_57%_60%] bg-campo">
          <img
            src={especialista.foto}
            alt={`Retrato de ${especialista.nome}`}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h1 className="font-titulo text-4xl leading-tight text-verde-titulo sm:text-5xl">{especialista.nome}</h1>
        <p className="text-xl font-bold text-dourado-texto">{especialista.area}</p>
        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-lg sm:justify-start">
          <span className="inline-flex items-center gap-1.5">
            <Star aria-hidden="true" size={20} className="fill-dourado text-dourado" />
            <strong>{formatarNota(especialista.avaliacao)}</strong>
            <span className="text-texto-secundario">({especialista.totalAvaliacoes} avaliações)</span>
          </span>
          {especialista.cidade && (
            <span className="inline-flex items-center gap-1.5 text-texto-secundario">
              <MapPin aria-hidden="true" size={20} />
              {especialista.cidade}
            </span>
          )}
        </p>
        {temas.length > 0 && (
          <ul aria-label="Temas" className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
            {temas.map((tema) => (
              <li key={tema} className="rounded-full bg-campo px-4 py-1.5 font-semibold text-verde-titulo">
                {tema}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
