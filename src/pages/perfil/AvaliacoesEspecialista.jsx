import { Star } from 'lucide-react'
import CartaoSecao from './CartaoSecao'

function Estrelas({ nota }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`Nota ${nota} de 5`}>
      {[1, 2, 3, 4, 5].map((posicao) => (
        <Star
          key={posicao}
          aria-hidden="true"
          size={18}
          className={posicao <= nota ? 'fill-dourado text-dourado' : 'text-divisoria'}
        />
      ))}
    </span>
  )
}

export default function AvaliacoesEspecialista({ avaliacoes }) {
  return (
    <CartaoSecao titulo="O que dizem os clientes">
      <ul className="flex flex-col divide-y divide-divisoria">
        {avaliacoes.map((avaliacao) => (
          <li key={avaliacao.autor} className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-center gap-3">
              <Estrelas nota={avaliacao.nota} />
              <p className="text-lg font-bold text-verde-titulo">
                {avaliacao.autor}, <span className="font-normal text-texto-secundario">{avaliacao.negocio}</span>
              </p>
            </div>
            <p className="text-lg text-verde-titulo">“{avaliacao.texto}”</p>
          </li>
        ))}
      </ul>
    </CartaoSecao>
  )
}
