import { CalendarDays, Loader2, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import AlertaFormulario from '../../../components/feedback/AlertaFormulario'
import { actionPlanService } from '../../../services/sabiosServices'
import { parseApiError } from '../../../utils/apiError'

function hoje() {
  return new Date().toISOString().slice(0, 10)
}

export default function AtribuirTarefaMentoria({ mentoringId, nomeCliente }) {
  const [tarefas, setTarefas] = useState([])
  const [titulo, setTitulo] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [erro, setErro] = useState('')
  const [erroCampo, setErroCampo] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    if (!mentoringId) return
    async function carregar() {
      setCarregando(true)
      try {
        const data = await actionPlanService.listByMentoring(mentoringId)
        const lista = Array.isArray(data) ? data : (data?.content ?? [])
        setTarefas(
          lista.map((p) => ({
            id: p.id,
            titulo: p.title,
            dueDate: p.dueDate ?? null,
            concluido: Boolean(p.completed),
          })),
        )
      } catch {
        // mantém vazio
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [mentoringId])

  async function atribuirTarefa(e) {
    e.preventDefault()
    if (!titulo.trim()) {
      setErroCampo('O título é obrigatório.')
      return
    }
    if (dueDate && dueDate < hoje()) {
      setErroCampo('O prazo não pode ser no passado.')
      return
    }
    setErro('')
    setErroCampo('')
    setSalvando(true)
    try {
      const criada = await actionPlanService.assignToMentoring(mentoringId, {
        title: titulo.trim(),
        dueDate: dueDate || undefined,
      })
      setTarefas((prev) => [
        ...prev,
        {
          id: criada?.id ?? Date.now(),
          titulo: titulo.trim(),
          dueDate: dueDate || null,
          concluido: false,
        },
      ])
      setTitulo('')
      setDueDate('')
    } catch (err) {
      const parsed = parseApiError(err, 'Não foi possível atribuir a tarefa.')
      setErro(parsed.message)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="rounded-3xl border border-divisoria bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-3">
        <CalendarDays size={24} className="mt-1 shrink-0 text-dourado-escuro" />
        <div>
          <h3 className="font-titulo text-xl font-bold text-verde-titulo">
            Tarefas desta mentoria
          </h3>
          {nomeCliente && (
            <p className="text-sm text-texto-secundario">Cliente: {nomeCliente}</p>
          )}
        </div>
      </div>

      <AlertaFormulario tipo="erro">{erro}</AlertaFormulario>

      {/* Lista de tarefas existentes */}
      {carregando ? (
        <div className="mt-6 flex justify-center">
          <Loader2 className="animate-spin text-verde-petroleo" size={22} />
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {tarefas.length === 0 ? (
            <p className="text-sm text-texto-secundario">Nenhuma tarefa atribuída ainda.</p>
          ) : (
            tarefas.map((t) => (
              <div
                key={t.id}
                className={`flex items-center gap-3 rounded-xl border p-4 ${
                  t.concluido
                    ? 'border-dourado-claro/60 bg-dourado-aviso/30 text-texto-secundario'
                    : 'border-divisoria'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${t.concluido ? 'line-through' : 'text-verde-titulo'}`}>
                    {t.titulo}
                  </p>
                  {t.dueDate && (
                    <p className="text-xs text-texto-secundario mt-0.5">
                      Prazo:{' '}
                      {new Date(t.dueDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </p>
                  )}
                </div>
                {t.concluido && (
                  <span className="rounded-full bg-dourado-aviso px-2 py-0.5 text-[11px] font-bold text-dourado-escuro">
                    Concluída
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Formulário de nova tarefa */}
      <form
        onSubmit={atribuirTarefa}
        className="mt-6 flex flex-col gap-3 border-t border-divisoria pt-5"
      >
        <h4 className="text-sm font-bold text-verde-titulo">Atribuir nova tarefa</h4>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <input
              type="text"
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value)
                if (erroCampo) setErroCampo('')
              }}
              placeholder="Título da tarefa…"
              aria-invalid={Boolean(erroCampo)}
              className={`h-11 w-full rounded-xl border bg-white px-4 text-sm text-verde-petroleo focus:outline-none focus:ring-2 ${
                erroCampo
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-divisoria focus:ring-dourado-foco'
              }`}
            />
          </div>
          <input
            type="date"
            value={dueDate}
            min={hoje()}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="Prazo (opcional)"
            className="h-11 rounded-xl border border-divisoria bg-white px-3 text-sm text-verde-petroleo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
          />
          <button
            type="submit"
            disabled={salvando}
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-verde-petroleo px-5 text-sm font-bold text-white hover:bg-verde-hover disabled:opacity-60 sm:shrink-0"
          >
            {salvando ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Plus size={15} aria-hidden="true" />
            )}
            Atribuir
          </button>
        </div>
        {erroCampo && (
          <p role="alert" className="text-xs font-semibold text-red-700">
            {erroCampo}
          </p>
        )}
      </form>
    </div>
  )
}
