import { CheckSquare, ChevronDown, Plus, Square } from 'lucide-react'
import { useState, useEffect } from 'react'
import { actionPlanService } from '../../../services/sabiosServices'

export default function PlanoDeAcaoCliente({ acoesIniciais }) {
  const [acoes, setAcoes] = useState(acoesIniciais || [])
  const [novaAcao, setNovaAcao] = useState('')

  useEffect(() => {
    if (acoesIniciais && acoesIniciais.length > 0) {
      setAcoes(acoesIniciais)
    }
  }, [acoesIniciais])

  async function alternarAcao(id) {
    // Atualização otimista
    setAcoes(
      acoes.map((a) => (a.id === id ? { ...a, concluido: !a.concluido } : a))
    )

    // Se for um ID numérico da API, dispara chamada ao backend
    if (typeof id === 'number' || !isNaN(Number(id))) {
      try {
        await actionPlanService.toggle(id)
      } catch (err) {
        console.warn('Erro ao atualizar plano no backend:', err)
      }
    }
  }

  async function adicionarAcao(e) {
    e.preventDefault()
    if (!novaAcao.trim()) return

    const texto = novaAcao.trim()
    const novoLocal = {
      id: `acao-${Date.now()}`,
      titulo: texto,
      prazo: 'Em andamento',
      concluido: false,
      conselheiro: 'Minha anotação',
    }
    setAcoes([...acoes, novoLocal])
    setNovaAcao('')

    try {
      const criado = await actionPlanService.create({
        title: texto,
        deadline: new Date().toISOString(),
        conselheiroNome: 'Minha anotação',
      })
      if (criado && criado.id) {
        setAcoes((prev) =>
          prev.map((a) => (a.id === novoLocal.id ? { ...a, id: criado.id } : a))
        )
      }
    } catch (err) {
      console.warn('Erro ao persistir plano de ação no backend:', err)
    }
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

      <details className="group mt-6 border-t border-divisoria pt-5">
        <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl text-sm font-bold text-verde-petroleo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dourado-foco">
          <span className="flex-1">Ver tarefas e adicionar ação</span>
          <ChevronDown
            size={20}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
          />
        </summary>

        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-divisoria">
            <div
              className="h-full rounded-full bg-dourado transition-all duration-500 ease-suave motion-reduce:transition-none"
              style={{ width: `${porcentagem}%` }}
            />
          </div>

          <div className="mt-5 space-y-3">
            {acoes.map((a) => (
              <div
                key={a.id}
                onClick={() => alternarAcao(a.id)}
                className={`flex cursor-pointer items-start gap-3.5 rounded-2xl border p-4 transition ${
                  a.concluido
                    ? 'border-dourado-claro/60 bg-dourado-aviso/40 text-texto-secundario'
                    : 'border-divisoria bg-white hover:border-verde-petroleo'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 shrink-0 text-verde-petroleo"
                  aria-label={a.concluido ? 'Marcar como pendente' : 'Marcar como concluída'}
                >
                  {a.concluido ? (
                    <CheckSquare size={22} className="text-dourado-escuro" />
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
                    <span className="font-bold text-dourado-escuro">{a.prazo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={adicionarAcao} className="mt-6 flex flex-col gap-2 border-t border-divisoria pt-6 sm:flex-row">
            <input
              type="text"
              value={novaAcao}
              onChange={(e) => setNovaAcao(e.target.value)}
              placeholder="Adicionar nova meta ou tarefa para seu negócio..."
              className="h-12 flex-1 rounded-xl border border-divisoria bg-white px-4 text-sm text-verde-petroleo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-verde-petroleo px-5 text-sm font-bold text-white transition-colors hover:bg-verde-hover sm:shrink-0"
            >
              <Plus size={16} aria-hidden="true" />
              Adicionar
            </button>
          </form>
        </div>
      </details>
    </div>
  )
}
