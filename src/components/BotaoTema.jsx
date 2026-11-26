import { Moon, Sun } from 'lucide-react'
import { useTema } from '../hooks/useTema'

export default function BotaoTema() {
  const { temaEscuro, alternarTema } = useTema()
  const proximoTema = temaEscuro ? 'claro' : 'escuro'
  const RotuloIcone = temaEscuro ? Sun : Moon

  return (
    <button
      type="button"
      aria-label={`Ativar tema ${proximoTema}`}
      aria-pressed={temaEscuro}
      onClick={alternarTema}
      title={`Ativar tema ${proximoTema}`}
      className="fixed bottom-4 right-20 z-40 flex h-12 w-12 items-center justify-center rounded-full border-2 border-verde-petroleo bg-superficie text-verde-titulo shadow-xl transition-colors hover:bg-campo sm:bottom-6 sm:right-24 sm:h-14 sm:w-14"
    >
      <RotuloIcone aria-hidden="true" size={22} />
    </button>
  )
}
