import { ArrowRight } from 'lucide-react'

export default function Botao({
  children,
  type = 'button',
  onClick,
  desabilitado = false,
  disabled = false,
}) {
  const estaDesabilitado = Boolean(desabilitado || disabled)

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={estaDesabilitado}
      className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-verde-petroleo px-7 text-lg font-bold text-white transition-colors hover:bg-verde-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado-foco disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
      <ArrowRight size={20} aria-hidden="true" />
    </button>
  )
}
