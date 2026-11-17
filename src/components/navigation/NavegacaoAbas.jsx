export default function NavegacaoAbas({ abas, abaAtiva, aoSelecionar, id }) {
  return (
    <div id={id} className="sem-barra-rolagem flex gap-2 overflow-x-auto border-b border-divisoria">
      {abas.map(({ id: abaId, icone: Icone, rotulo, contador }) => {
        const ativa = abaAtiva === abaId

        return (
          <button
            key={abaId}
            id={`aba-${abaId}`}
            type="button"
            onClick={() => aoSelecionar(abaId)}
            aria-selected={ativa}
            className={`flex min-h-12 items-center gap-2 whitespace-nowrap border-b-2 px-3 text-sm font-bold transition-colors sm:px-5 sm:text-base ${
              ativa
                ? 'border-verde-petroleo text-verde-petroleo'
                : 'border-transparent text-texto-secundario hover:text-verde-petroleo'
            }`}
          >
            <Icone size={18} aria-hidden="true" />
            {rotulo}
            {contador !== undefined && (
              <span className="rounded-full bg-campo px-2 py-0.5 text-xs">{contador}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
