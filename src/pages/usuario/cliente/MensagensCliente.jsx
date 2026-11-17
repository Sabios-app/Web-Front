export default function MensagensCliente() {
  return (
    <div className="grid gap-6 rounded-3xl bg-white p-6 shadow-sm lg:grid-cols-[18rem_1fr]">
      <div className="rounded-2xl bg-campo p-4">
        <p className="text-sm text-texto-secundario">Conversas recentes</p>
        <div className="mt-4 rounded-2xl bg-white p-4">
          <p className="font-bold text-verde-titulo">Helena Martins</p>
          <p className="mt-1 text-sm text-texto-secundario">Perfeito, até a nossa sessão...</p>
        </div>
      </div>
      <div className="flex min-h-64 flex-col justify-end rounded-2xl border border-divisoria p-5">
        <p className="max-w-md rounded-2xl bg-campo p-4 text-verde-titulo">
          Olá! Revisei o material que você enviou. Está evoluindo muito bem.
        </p>
        <p className="mt-3 self-end rounded-2xl rounded-br-sm bg-verde-petroleo p-4 text-white">
          Perfeito! Vou revisar antes da nossa sessão.
        </p>
      </div>
    </div>
  )
}
