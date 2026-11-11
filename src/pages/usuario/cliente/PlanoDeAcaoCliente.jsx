import { CheckSquare, Plus, Square } from 'lucide-react'
import { useState } from 'react'

export default function PlanoDeAcaoCliente({ acoesIniciais }) {
  const [acoes, setAcoes] = useState(acoesIniciais || [])
  const [novaAcao, setNovaAcao] = useState('')

  function alternarAcao(id) {
    setAcoes(
      acoes.map((a) => (a.id === id ? { ...a, concluido: !a.concluido } : a))
    )
  }

  function adicionarAcao(e) {
    e.preventDefault()
    if (!novaAcao.trim()) return
    const nova = {
      id: `acao-${Date.now()}`,
      titulo: novaAcao.trim(),
      prazo: 'Em andamento',
      concluido: false,
      conselheiro: 'Minha anotação',
    }
    setAcoes([...acoes, nova])
    setNovaAcao('')
  }

  const concluidas = acoes.filter((a) => a.concluido).length
  const total = acoes.length
  const porcentagem = total > 0 ? Math.round((concluidas / total) * 100) : 0

  return (
    <div className="rounded-3xl border border-divisoria bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-titulo text-2xl font-bold text-verde-titulo">
            Seu Plano de Ação Prático
          </h2>
          <p className="text-sm text-texto-secundario">
            Tarefas e decisões combinadas com seus conselheiros sêniores para fazer seu negócio crescer.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs font-bold uppercase tracking-wider text-dourado-escuro">
            Progresso Geral
          </span>
          <p className="font-titulo text-xl font-bold text-verde-titulo">
            {concluidas} de {total} concluídas ({porcentagem}%)
          </p>
        </div>
      </div>

      <div className="mt-4 h-2 w-full rounded-full bg-divisoria">
        <div
          className="h-full rounded-full bg-emerald-700 transition-all duration-300"
          style={{ width: `${porcentagem}%` }}
        />
      </div>

      <div className="mt-6 space-y-3">
        {acoes.map((a) => (
          <div
            key={a.id}
            onClick={() => alternarAcao(a.id)}
            className={`flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition ${
              a.concluido
                ? 'border-emerald-200 bg-emerald-50/50 text-texto-secundario'
                : 'border-divisoria bg-white hover:border-verde-petroleo'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 text-verde-petroleo shrink-0"
              aria-label={a.concluido ? 'Marcar como pendente' : 'Marcar como concluída'}
            >
              {a.concluido ? (
                <CheckSquare size={22} className="text-emerald-700" />
              ) : (
                <Square size={22} className="text-texto-secundario" />
              )}
            </button>

            <div className="flex-1">
              <p
                className={`text-base font-semibold ${
                  a.concluido ? 'line-through text-texto-secundario' : 'text-verde-titulo'
                }`}
              >
                {a.titulo}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-texto-secundario">
                <span>Orientado por: <strong>{a.conselheiro}</strong></span>
                <span>•</span>
                <span className={a.concluido ? 'text-emerald-700 font-bold' : 'text-dourado-escuro font-bold'}>
                  {a.prazo}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={adicionarAcao} className="mt-6 flex gap-2 border-t border-divisoria pt-6">
        <input
          type="text"
          value={novaAcao}
          onChange={(e) => setNovaAcao(e.target.value)}
          placeholder="Adicionar nova meta ou tarefa para seu negócio..."
          className="h-12 flex-1 rounded-xl border border-divisoria bg-white px-4 text-sm text-verde-petroleo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
        />
        <button
          type="submit"
          className="inline-flex h-12 items-center gap-1.5 rounded-full bg-verde-petroleo px-5 text-sm font-bold text-white hover:bg-verde-hover"
        >
          <Plus size={16} />
          Adicionar
        </button>
      </form>
    </div>
  )
}
