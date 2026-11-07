import CartaoSecao from './CartaoSecao'

/** Linha do tempo com os cargos mais importantes da carreira. */
export default function TrajetoriaEspecialista({ trajetoria }) {
  return (
    <CartaoSecao titulo="Trajetória">
      <ol className="flex flex-col gap-6">
        {trajetoria.map((item) => (
          <li key={`${item.cargo}-${item.periodo}`} className="relative flex gap-4">
            <span aria-hidden="true" className="mt-2 h-3.5 w-3.5 shrink-0 rounded-full bg-dourado" />
            <div>
              <p className="text-xl font-bold text-verde-titulo">{item.cargo}</p>
              <p className="text-lg text-texto-secundario">
                {item.empresa} · {item.periodo}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </CartaoSecao>
  )
}
