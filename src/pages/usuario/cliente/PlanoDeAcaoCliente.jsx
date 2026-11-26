import {
  AlertTriangle,
  CheckSquare,
  ChevronDown,
  Pencil,
  Plus,
  Square,
  Trash2,
  UserCheck,
} from 'lucide-react'
import { useState } from 'react'
import AlertaFormulario from '../../../components/feedback/AlertaFormulario'
import useAuth from '../../../hooks/useAuth'
import { actionPlanService } from '../../../services/sabiosServices'
import { extrairErrosDeCampo, parseApiError } from '../../../utils/apiError'

function formatarData(iso) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
  } catch {
    return iso
  }
}

function hoje() {
  return new Date().toISOString().slice(0, 10)
}

export default function PlanoDeAcaoCliente({ acoesIniciais, filtro = 'pendentes' }) {
  const { user } = useAuth()
  const ehConselheiro = user?.role === 'COUNSELOR'

  const [acoes, setAcoes] = useState(() => acoesIniciais || [])
  const [novaAcao, setNovaAcao] = useState('')
  const [novaData, setNovaData] = useState('')
  const [erro, setErro] = useState('')
  const [erroCampo, setErroCampo] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [editTitulo, setEditTitulo] = useState('')
  const [editData, setEditData] = useState('')
  const [erroEdicao, setErroEdicao] = useState('')

  // Filtros internos
  const [filtroAtivo, setFiltroAtivo] = useState(filtro) // 'pendentes' | 'historico'

  const acoesFiltradas =
    filtroAtivo === 'historico'
      ? acoes.filter((a) => a.concluido)
      : acoes.filter((a) => !a.concluido)

  async function alternarAcao(id) {
    setErro('')
    const anteriores = acoes
    setAcoes((atuais) =>
      atuais.map((a) => (a.id === id ? { ...a, concluido: !a.concluido } : a)),
    )
    if (typeof id === 'number' || (typeof id === 'string' && !id.startsWith('acao-'))) {
      try {
        await actionPlanService.toggle(id)
      } catch (err) {
        const parsed = parseApiError(err, 'Não foi possível atualizar a tarefa.')
        setErro(parsed.message)
        setAcoes(anteriores)
      }
    }
  }

  async function adicionarAcao(e) {
    e.preventDefault()
    if (!novaAcao.trim()) return
    if (novaData && novaData < hoje()) {
      setErroCampo('A data de prazo não pode ser no passado.')
      return
    }

    setErro('')
    setErroCampo('')

    const texto = novaAcao.trim()
    const novoLocal = {
      id: `acao-${Date.now()}`,
      titulo: texto,
      dueDate: novaData || null,
      concluido: false,
      assignedByCounselor: false,
      overdue: false,
      conselheiro: 'Minha anotação',
    }
    setAcoes((atuais) => [...atuais, novoLocal])
    setNovaAcao('')
    setNovaData('')

    try {
      const payload = { title: texto, conselheiroNome: 'Minha anotação' }
      if (novaData) payload.dueDate = novaData
      const criado = await actionPlanService.create(payload)
      if (criado && criado.id) {
        setAcoes((prev) =>
          prev.map((a) =>
            a.id === novoLocal.id
              ? { ...a, id: criado.id, dueDate: criado.dueDate || novaData || null }
              : a,
          ),
        )
      }
    } catch (err) {
      const parsed = parseApiError(err, 'Não foi possível salvar a nova meta.')
      const { errosCampos, mensagemGeral } = extrairErrosDeCampo(parsed, { title: 'titulo' }, [
        'titulo',
      ])
      setErroCampo(errosCampos.titulo || '')
      setErro(mensagemGeral)
      setAcoes((prev) => prev.filter((a) => a.id !== novoLocal.id))
    }
  }

  function iniciarEdicao(acao) {
    setEditandoId(acao.id)
    setEditTitulo(acao.titulo)
    setEditData(acao.dueDate ? acao.dueDate.slice(0, 10) : '')
    setErroEdicao('')
  }

  async function salvarEdicao(id) {
    if (!editTitulo.trim()) return
    if (editData && editData < hoje()) {
      setErroEdicao('A data de prazo não pode ser no passado.')
      return
    }
    setErroEdicao('')
    const anteriores = acoes
    setAcoes((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, titulo: editTitulo.trim(), dueDate: editData || null }
          : a,
      ),
    )
    setEditandoId(null)
    try {
      await actionPlanService.update(id, {
        title: editTitulo.trim(),
        dueDate: editData || undefined,
      })
    } catch (err) {
      const parsed = parseApiError(err, 'Não foi possível editar a tarefa.')
      setErro(
        parsed.status === 403
          ? 'Você não tem permissão para editar esta tarefa.'
          : parsed.message,
      )
      setAcoes(anteriores)
    }
  }

  async function removerAcao(id) {
    if (!window.confirm('Remover esta tarefa?')) return
    setErro('')
    const anteriores = acoes
    setAcoes((prev) => prev.filter((a) => a.id !== id))
    try {
      await actionPlanService.delete(id)
    } catch (err) {
      const parsed = parseApiError(err, 'Não foi possível remover a tarefa.')
      setErro(
        parsed.status === 403
          ? 'Você não tem permissão para remover esta tarefa.'
          : parsed.message,
      )
      setAcoes(anteriores)
    }
  }

  const concluidas = acoes.filter((a) => a.concluido).length
  const total = acoes.length
  const porcentagem = total > 0 ? Math.round((concluidas / total) * 100) : 0

  return (
    <div className="rounded-3xl border border-divisoria bg-white p-6 shadow-sm sm:p-8">
      {/* Cabeçalho */}
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

      {/* Filtros */}
      <div className="mt-5 flex gap-2">
        {['pendentes', 'historico'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltroAtivo(f)}
            className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors ${
              filtroAtivo === f
                ? 'border-verde-petroleo bg-verde-petroleo text-white'
                : 'border-divisoria bg-white text-verde-petroleo hover:bg-campo'
            }`}
          >
            {f === 'pendentes' ? 'Pendentes' : 'Histórico'}
          </button>
        ))}
      </div>

      <details className="group mt-6 border-t border-divisoria pt-5">
        <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl text-sm font-bold text-verde-petroleo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dourado-foco">
          <span className="flex-1">Ver tarefas{filtroAtivo === 'historico' ? ' concluídas' : ' e adicionar ação'}</span>
          <ChevronDown
            size={20}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
          />
        </summary>

        <div className="mt-4">
          {/* Barra de progresso */}
          <div className="h-2 w-full rounded-full bg-divisoria">
            <div
              className="h-full rounded-full bg-dourado transition-all duration-500 ease-suave motion-reduce:transition-none"
              style={{ width: `${porcentagem}%` }}
            />
          </div>

          <AlertaFormulario tipo="erro">{erro}</AlertaFormulario>

          {/* Lista de ações */}
          <div className="mt-5 space-y-3">
            {acoesFiltradas.length === 0 && (
              <p className="text-center text-sm text-texto-secundario py-4">
                {filtroAtivo === 'historico'
                  ? 'Nenhuma tarefa concluída ainda.'
                  : 'Nenhuma tarefa pendente. Adicione uma abaixo!'}
              </p>
            )}
            {acoesFiltradas.map((a) => (
              <div
                key={a.id}
                className={`rounded-2xl border p-4 transition ${
                  a.concluido
                    ? 'border-dourado-claro/60 bg-dourado-aviso/40 text-texto-secundario'
                    : a.overdue
                    ? 'border-red-300 bg-red-50'
                    : 'border-divisoria bg-white hover:border-verde-petroleo'
                }`}
              >
                {editandoId === a.id ? (
                  /* Modo edição */
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editTitulo}
                      onChange={(e) => setEditTitulo(e.target.value)}
                      className="w-full rounded-xl border border-divisoria px-3 py-2 text-sm text-verde-titulo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
                    />
                    <input
                      type="date"
                      value={editData}
                      min={hoje()}
                      onChange={(e) => setEditData(e.target.value)}
                      className="rounded-xl border border-divisoria px-3 py-2 text-sm text-verde-titulo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
                    />
                    {erroEdicao && (
                      <p className="text-xs font-semibold text-red-700">{erroEdicao}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => salvarEdicao(a.id)}
                        className="rounded-full bg-verde-petroleo px-4 py-1.5 text-xs font-bold text-white hover:bg-verde-hover"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditandoId(null)}
                        className="rounded-full border border-divisoria px-4 py-1.5 text-xs font-bold text-verde-petroleo hover:bg-campo"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Modo visualização */
                  <div className="flex items-start gap-3.5">
                    <button
                      type="button"
                      onClick={() => alternarAcao(a.id)}
                      className="mt-0.5 shrink-0 text-verde-petroleo"
                      aria-label={a.concluido ? 'Marcar como pendente' : 'Marcar como concluída'}
                    >
                      {a.concluido ? (
                        <CheckSquare size={22} className="text-dourado-escuro" />
                      ) : (
                        <Square size={22} className="text-texto-secundario" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-base font-semibold ${
                          a.concluido ? 'line-through text-texto-secundario' : 'text-verde-titulo'
                        }`}
                      >
                        {a.titulo}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-texto-secundario">
                        <span>
                          Orientado por: <strong>{a.conselheiro}</strong>
                        </span>
                        {a.dueDate && (
                          <>
                            <span>•</span>
                            <span className={`font-bold ${a.overdue ? 'text-red-600' : 'text-dourado-escuro'}`}>
                              Prazo: {formatarData(a.dueDate)}
                            </span>
                          </>
                        )}
                        {/* Selos */}
                        {a.overdue && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-700">
                            <AlertTriangle size={11} /> Vencida
                          </span>
                        )}
                        {a.assignedByCounselor && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-dourado-aviso/60 px-2 py-0.5 text-[11px] font-bold text-dourado-escuro">
                            <UserCheck size={11} /> Conselheiro
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Botões editar / remover — apenas se não for tarefa do conselheiro (ou se o user for o criador) */}
                    {!a.assignedByCounselor && !ehConselheiro && (
                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          onClick={() => iniciarEdicao(a)}
                          aria-label="Editar tarefa"
                          className="rounded-lg p-1.5 text-texto-secundario hover:bg-campo hover:text-verde-petroleo"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removerAcao(a.id)}
                          aria-label="Remover tarefa"
                          className="rounded-lg p-1.5 text-texto-secundario hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Formulário de nova ação — só no filtro "pendentes" e para clientes */}
          {filtroAtivo === 'pendentes' && !ehConselheiro && (
            <form
              onSubmit={adicionarAcao}
              className="mt-6 flex flex-col gap-2 border-t border-divisoria pt-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex-1">
                  <input
                    type="text"
                    value={novaAcao}
                    onChange={(e) => {
                      setNovaAcao(e.target.value)
                      if (erroCampo) setErroCampo('')
                    }}
                    placeholder="Adicionar nova meta ou tarefa para seu negócio..."
                    aria-invalid={Boolean(erroCampo)}
                    className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-verde-petroleo focus:outline-none focus:ring-2 ${
                      erroCampo
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-divisoria focus:ring-dourado-foco'
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={novaData}
                    min={hoje()}
                    onChange={(e) => setNovaData(e.target.value)}
                    aria-label="Prazo (opcional)"
                    className="h-12 rounded-xl border border-divisoria bg-white px-3 text-sm text-verde-petroleo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-verde-petroleo px-5 text-sm font-bold text-white transition-colors hover:bg-verde-hover sm:shrink-0"
                >
                  <Plus size={16} aria-hidden="true" />
                  Adicionar
                </button>
              </div>
              {erroCampo && (
                <p role="alert" className="mt-1 text-xs font-semibold text-red-700">
                  {erroCampo}
                </p>
              )}
            </form>
          )}
        </div>
      </details>
    </div>
  )
}
