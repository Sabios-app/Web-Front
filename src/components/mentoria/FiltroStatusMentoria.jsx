import { OPCOES_FILTRO_MENTORIA } from '../../utils/mentoriaStatus'

export default function FiltroStatusMentoria({
  filtro,
  aoAlterar,
  ariaLabel = 'Filtrar mentorias por status',
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-divisoria bg-campo/50 p-3">
      <span className="text-sm font-bold text-verde-titulo">
        Filtrar por status:
      </span>
      <div className="flex flex-wrap gap-2" role="group" aria-label={ariaLabel}>
        {OPCOES_FILTRO_MENTORIA.map((opcao) => {
          const ativo = filtro === opcao.valor
          return (
            <button
              key={opcao.valor}
              type="button"
              onClick={() => aoAlterar(opcao.valor)}
              aria-pressed={ativo}
              className={`min-h-9 rounded-full px-3.5 text-xs font-bold transition ${
                ativo
                  ? 'bg-verde-petroleo text-white'
                  : 'border border-divisoria bg-white text-verde-titulo hover:bg-campo'
              }`}
            >
              {opcao.rotulo}
            </button>
          )
        })}
      </div>
    </div>
  )
}
