import { Clock, HelpCircle, MessageSquare, Video } from 'lucide-react'
import { useState } from 'react'

export default function ProximaSessaoConselheiro({ sessao }) {
  const [mostrarNotas, setMostrarNotas] = useState(false)
  const [minhasNotas, setMinhasNotas] = useState(
    'Focar em: demonstrativo simplificado de fluxo de caixa (entradas e saídas diárias) e separar a retirada fixa de pró-labore.'
  )

  if (!sessao) return null

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-verde-petroleo/20 bg-white shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-divisoria bg-emerald-50/70 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-emerald-700 animate-pulse" />
          <span className="font-bold text-emerald-900">
            Próxima Mentoria Agendada
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-sm font-semibold text-emerald-950">
          <Clock size={16} aria-hidden="true" />
          <span>{sessao.emBreveTexto}</span>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <img
              src={sessao.clienteFoto}
              alt={sessao.clienteNome}
              className="h-16 w-16 rounded-full border border-divisoria object-cover"
            />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-dourado-escuro">
                Cliente Mentorado
              </p>
              <h2 className="font-titulo text-2xl font-bold text-verde-titulo">
                {sessao.clienteNome}
              </h2>
              <p className="text-base text-texto-secundario">
                {sessao.clienteNegocio} • {sessao.clienteCidade}
              </p>
              <p className="mt-1 text-sm font-bold text-verde-petroleo">
                📅 {sessao.data} • ⏰ {sessao.horario}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={sessao.linkChamada}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-verde-petroleo px-7 text-base font-bold text-white shadow-sm transition-colors hover:bg-verde-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado-foco"
            >
              <Video size={20} aria-hidden="true" />
              Entrar na chamada
            </a>

            <button
              type="button"
              onClick={() => setMostrarNotas(!mostrarNotas)}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-verde-petroleo bg-white px-5 text-base font-bold text-verde-petroleo transition-colors hover:bg-campo"
            >
              <MessageSquare size={18} aria-hidden="true" />
              {mostrarNotas ? 'Ocultar anotações' : 'Anotações da sessão'}
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-campo p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-texto-secundario">
            Objetivo da Conversa
          </p>
          <p className="mt-1 text-lg font-semibold text-verde-titulo">
            {sessao.tema}
          </p>
          {sessao.duvidaCliente && (
            <div className="mt-3 flex items-start gap-2 text-sm text-texto-secundario">
              <HelpCircle size={18} className="shrink-0 text-dourado-escuro" />
              <p>
                <strong className="text-verde-titulo">Dúvida enviada pelo cliente:</strong> “
                {sessao.duvidaCliente}”
              </p>
            </div>
          )}
        </div>

        {mostrarNotas && (
          <div className="mt-4 rounded-2xl border border-divisoria bg-white p-5">
            <label
              htmlFor="anotacoes-sessao"
              className="block text-sm font-bold text-verde-titulo"
            >
              Suas anotações e pontos de orientação (visíveis apenas para você):
            </label>
            <textarea
              id="anotacoes-sessao"
              rows={3}
              value={minhasNotas}
              onChange={(e) => setMinhasNotas(e.target.value)}
              className="mt-2 w-full rounded-xl border border-divisoria bg-white p-3 text-sm text-verde-petroleo focus:border-dourado-foco focus:outline-none focus:ring-2 focus:ring-dourado-foco/30"
              placeholder="Escreva pontos que deseja abordar durante a chamada..."
            />
            <p className="mt-1 text-xs text-texto-secundario">
              As anotações são salvas automaticamente neste navegador.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
