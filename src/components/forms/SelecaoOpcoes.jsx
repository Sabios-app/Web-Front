export default function SelecaoOpcoes({ opcoes, selecionadas, aoAlternar }) {
  return (
    <div className="flex flex-wrap gap-2">
      {opcoes.map((opcao) => {
        const ativa = selecionadas.includes(opcao)

        return (
          <button
            key={opcao}
            type="button"
            onClick={() => aoAlternar(opcao)}
            aria-pressed={ativa}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              ativa
                ? 'bg-verde-petroleo text-white shadow-xs'
                : 'border border-divisoria bg-white text-verde-petroleo hover:bg-campo'
            }`}
          >
            {opcao}
          </button>
        )
      })}
    </div>
  )
}
