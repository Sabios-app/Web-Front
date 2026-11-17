export default function OpcaoConfiguracao({ titulo, descricao, ativo, aoAlternar }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ativo}
      onClick={aoAlternar}
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${
        ativo
          ? 'border-verde-petroleo bg-campo'
          : 'border-divisoria bg-white hover:border-verde-petroleo'
      }`}
    >
      <span>
        <span className="block font-bold text-verde-titulo">{titulo}</span>
        <span className="mt-1 block text-sm text-texto-secundario">{descricao}</span>
      </span>
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          ativo ? 'bg-verde-petroleo' : 'bg-divisoria'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            ativo ? 'left-6' : 'left-1'
          }`}
        />
      </span>
    </button>
  )
}
