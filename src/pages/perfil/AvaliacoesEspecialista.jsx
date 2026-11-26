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

export default function AvaliacoesEspecialista({ avaliacoes = [] }) {
  return (
    <CartaoSecao titulo="O que dizem os clientes">
      {!avaliacoes || avaliacoes.length === 0 ? (
        <p className="text-base text-texto-secundario">
          Ainda não há avaliações publicadas para este conselheiro.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-divisoria">
          {avaliacoes.map((avaliacao, indice) => (
            <li
              key={avaliacao.id || `${avaliacao.autor}-${indice}`}
              className="flex flex-col gap-2 py-5 first:pt-0 last:pb-0"
            >
              <div className="flex flex-wrap items-center gap-3">
                {avaliacao.avatarUrl && (
                  <img
                    src={avaliacao.avatarUrl}
                    alt=""
                    className="h-9 w-9 rounded-full border border-divisoria object-cover"
                  />
                )}
                <Estrelas nota={avaliacao.nota} />
                <p className="text-lg font-bold text-verde-titulo">
                  {avaliacao.autor}
                  {avaliacao.negocio ? (
                    <span className="font-normal text-texto-secundario">, {avaliacao.negocio}</span>
                  ) : null}
                </p>
              </div>
              <p className="text-lg text-verde-titulo">“{avaliacao.texto}”</p>
            </li>
          ))}
        </ul>
      )}
    </CartaoSecao>
  )
}
