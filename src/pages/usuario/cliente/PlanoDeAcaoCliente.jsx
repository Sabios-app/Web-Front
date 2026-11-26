import { CheckSquare, ChevronDown, Plus, Square } from 'lucide-react'
import { useState } from 'react'
import AlertaFormulario from '../../../components/feedback/AlertaFormulario'
import { actionPlanService } from '../../../services/sabiosServices'
import { extrairErrosDeCampo, parseApiError } from '../../../utils/apiError'

export default function PlanoDeAcaoCliente({ acoesIniciais }) {
  const [acoes, setAcoes] = useState(() => acoesIniciais || [])
  const [novaAcao, setNovaAcao] = useState('')
  const [erro, setErro] = useState('')
  const [erroCampo, setErroCampo] = useState('')

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

    setErro('')
    setErroCampo('')

    const texto = novaAcao.trim()
    const novoLocal = {
      id: `acao-${Date.now()}`,
      titulo: texto,
      prazo: 'Em andamento',
      concluido: false,
      conselheiro: 'Minha anotação',
    }
    setAcoes((atuais) => [...atuais, novoLocal])
    setNovaAcao('')

    try {
      const criado = await actionPlanService.create({
        title: texto,
        deadline: new Date().toISOString(),
        conselheiroNome: 'Minha anotação',
      })
      if (criado && criado.id) {
        setAcoes((prev) =>
          prev.map((a) => (a.id === novoLocal.id ? { ...a, id: criado.id } : a)),
        )
      }
    } catch (err) {
      const parsed = parseApiError(err, 'Não foi possível salvar a nova meta no servidor.')
      const { errosCampos, mensagemGeral } = extrairErrosDeCampo(
        parsed,
        { title: 'titulo' },
        ['titulo'],
      )
      setErroCampo(errosCampos.titulo || '')
      setErro(mensagemGeral)
      setAcoes((prev) => prev.filter((a) => a.id !== novoLocal.id))
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

          <AlertaFormulario tipo="erro">{erro}</AlertaFormulario>

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
              {erroCampo && (
                <p role="alert" className="mt-1 text-xs font-semibold text-red-700">
                  {erroCampo}
                </p>
              )}
            </div>
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
