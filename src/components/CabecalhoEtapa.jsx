import { ArrowLeft } from 'lucide-react'

export default function CabecalhoEtapa({ etapa, perfil, titulo, subtitulo, aoVoltar }) {
  return (
    <div>
      <button
        type="button"
        onClick={aoVoltar}
        className="flex items-center gap-1 text-base font-semibold text-texto-secundario hover:text-verde-petroleo"
      >
        <ArrowLeft size={18} aria-hidden="true" /> Voltar
      </button>

      <div className="mt-8 flex items-center justify-between text-sm font-bold">
        <span className="uppercase tracking-widest text-dourado-texto">Etapa {etapa} de 2</span>
        <span className="text-texto-secundario">{perfil}</span>
      </div>

      <div className="mt-2 h-1.5 w-full rounded-full bg-divisoria">
        <div className={`h-full rounded-full bg-dourado ${etapa === 1 ? 'w-1/2' : 'w-full'}`} />
      </div>

      <h1 className="mt-6 font-titulo text-3xl font-semibold text-verde-titulo">{titulo}</h1>
      <p className="mt-2 text-lg text-texto-secundario">{subtitulo}</p>
    </div>
  )
}