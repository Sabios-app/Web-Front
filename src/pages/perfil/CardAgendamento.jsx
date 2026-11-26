import { CalendarCheck, Lock, Video } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AlertaFormulario from '../../components/feedback/AlertaFormulario'
import useAuth from '../../hooks/useAuth'
import { mentoringService } from '../../services/sabiosServices'
import { extrairErrosDeCampo, parseApiError } from '../../utils/apiError'
import { formatarReais } from '../../utils/formatadores'

const estiloOpcao =
  'flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 px-2 text-center text-lg font-semibold transition-colors'
const opcaoAtiva = 'border-verde-petroleo bg-verde-petroleo text-white'
const opcaoInativa = 'border-divisoria bg-white text-verde-titulo hover:border-verde-petroleo'

const ALIASES_AGENDAMENTO = {
  scheduledAt: 'dataHora',
  title: 'assunto',
  doubts: 'duvidas',
}
const CAMPOS_AGENDAMENTO = ['dataHora', 'assunto', 'duvidas']

export default function CardAgendamento({ especialista }) {
  const { token, perfil } = useAuth()
  const agenda = especialista.agenda || []
  const usaAgendaFixa = agenda.length > 0

  const [diaId, setDiaId] = useState('')
  const [horario, setHorario] = useState('')
  const [dataHora, setDataHora] = useState('')
  const [assunto, setAssunto] = useState('')
  const [duvidas, setDuvidas] = useState('')
  const [erro, setErro] = useState('')
  const [errosCampos, setErrosCampos] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [confirmado, setConfirmado] = useState(false)

  const diaEscolhido = agenda.find((dia) => dia.id === diaId)

  function escolherDia(id) {
    setDiaId(id)
    setHorario('')
    setErro('')
    setConfirmado(false)
  }

  async function agendar(evento) {
    evento.preventDefault()
    setErro('')
    setErrosCampos({})
    setConfirmado(false)

    if (usaAgendaFixa) {
      if (!diaId) return setErro('Escolha um dia para a conversa.')
      if (!horario) return setErro('Escolha um horário para a conversa.')
      setConfirmado(true)
      return
    }

    if (!token) {
      setErro('Entre na sua conta de cliente para solicitar uma mentoria.')
      return
    }
    if (perfil === 'conselheiro') {
      setErro('Acesse com uma conta de cliente para agendar uma mentoria.')
      return
    }
    if (!dataHora) {
      setErrosCampos({ dataHora: 'Informe a data e o horário desejados.' })
      return
    }
    if (!assunto.trim()) {
      setErrosCampos({ assunto: 'Informe o assunto principal da conversa.' })
      return
    }

    setEnviando(true)
    try {
      const scheduledAt = new Date(dataHora).toISOString()
      await mentoringService.requestMentoring({
        specialistId: especialista.id,
        title: assunto.trim(),
        description: assunto.trim(),
        doubts: duvidas.trim(),
        scheduledAt,
      })
      setConfirmado(true)
      setAssunto('')
      setDuvidas('')
      setDataHora('')
    } catch (err) {
      const parsed = parseApiError(err, 'Não foi possível solicitar a mentoria.')
      const { errosCampos: campos, mensagemGeral } = extrairErrosDeCampo(
        parsed,
        ALIASES_AGENDAMENTO,
        CAMPOS_AGENDAMENTO,
      )
      setErrosCampos(campos)
      setErro(mensagemGeral)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form
      id="agendar"
      onSubmit={agendar}
      aria-labelledby="titulo-agendamento"
      className="rounded-3xl border-2 border-verde-petroleo bg-white p-6 shadow-sm"
    >
      <h2 id="titulo-agendamento" className="sr-only">
        Agendar conversa com {especialista.nome}
      </h2>
      <p className="text-texto-secundario">a partir de</p>
      <p className="text-verde-titulo">
        <strong className="text-3xl">{formatarReais(especialista.valorSessao)}</strong>
        <span className="text-lg text-texto-secundario"> / sessão de {especialista.duracaoSessao}</span>
      </p>

      {usaAgendaFixa ? (
        <>
          <fieldset className="mt-6">
            <legend className="text-lg font-bold text-verde-titulo">1. Escolha o dia</legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {agenda.map((dia) => (
                <label key={dia.id} className={`${estiloOpcao} ${diaId === dia.id ? opcaoAtiva : opcaoInativa}`}>
                  <input
                    type="radio"
                    name="dia"
                    value={dia.id}
                    checked={diaId === dia.id}
                    onChange={() => escolherDia(dia.id)}
                    className="sr-only"
                  />
                  <span>{dia.diaSemana}</span>
                  <span className="text-base font-normal">{dia.data}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-6" disabled={!diaEscolhido}>
            <legend className="text-lg font-bold text-verde-titulo">2. Escolha o horário</legend>
            {diaEscolhido ? (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {diaEscolhido.horarios.map((hora) => (
                  <label key={hora} className={`${estiloOpcao} ${horario === hora ? opcaoAtiva : opcaoInativa}`}>
                    <input
                      type="radio"
                      name="horario"
                      value={hora}
                      checked={horario === hora}
                      onChange={() => {
                        setHorario(hora)
                        setErro('')
                        setConfirmado(false)
                      }}
                      className="sr-only"
                    />
                    {hora}
                  </label>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-texto-secundario">Escolha um dia primeiro.</p>
            )}
          </fieldset>
        </>
      ) : (
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="data-mentoria" className="mb-1.5 block text-base font-bold text-verde-titulo">
              Data e horário sugeridos
            </label>
            <input
              id="data-mentoria"
              type="datetime-local"
              value={dataHora}
              onChange={(e) => {
                setDataHora(e.target.value)
                setErrosCampos((atual) => ({ ...atual, dataHora: '' }))
              }}
              aria-invalid={Boolean(errosCampos.dataHora)}
              className={`h-12 w-full rounded-xl border bg-white px-3 text-base text-verde-petroleo focus:outline-none! focus:ring-2 ${
                errosCampos.dataHora
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-divisoria focus:border-dourado-foco focus:ring-dourado-foco/15'
              }`}
            />
            {errosCampos.dataHora && (
              <p role="alert" className="mt-1 text-sm font-semibold text-red-700">
                {errosCampos.dataHora}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="assunto-mentoria" className="mb-1.5 block text-base font-bold text-verde-titulo">
              Assunto da mentoria
            </label>
            <input
              id="assunto-mentoria"
              type="text"
              value={assunto}
              onChange={(e) => {
                setAssunto(e.target.value)
                setErrosCampos((atual) => ({ ...atual, assunto: '' }))
              }}
              placeholder="Ex.: Organização do fluxo de caixa"
              aria-invalid={Boolean(errosCampos.assunto)}
              className={`h-12 w-full rounded-xl border bg-white px-3 text-base text-verde-petroleo focus:outline-none! focus:ring-2 ${
                errosCampos.assunto
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-divisoria focus:border-dourado-foco focus:ring-dourado-foco/15'
              }`}
            />
            {errosCampos.assunto && (
              <p role="alert" className="mt-1 text-sm font-semibold text-red-700">
                {errosCampos.assunto}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="duvidas-mentoria" className="mb-1.5 block text-base font-bold text-verde-titulo">
              Principais dúvidas (opcional)
            </label>
            <textarea
              id="duvidas-mentoria"
              rows={2}
              value={duvidas}
              onChange={(e) => {
                setDuvidas(e.target.value)
                setErrosCampos((atual) => ({ ...atual, duvidas: '' }))
              }}
              placeholder="Conte brevemente o que gostaria de resolver..."
              aria-invalid={Boolean(errosCampos.duvidas)}
              className={`w-full rounded-xl border bg-white p-3 text-base text-verde-petroleo focus:outline-none! focus:ring-2 ${
                errosCampos.duvidas
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-divisoria focus:border-dourado-foco focus:ring-dourado-foco/15'
              }`}
            />
            {errosCampos.duvidas && (
              <p role="alert" className="mt-1 text-sm font-semibold text-red-700">
                {errosCampos.duvidas}
              </p>
            )}
          </div>
        </div>
      )}

      <AlertaFormulario tipo="erro">
        {erro}
        {!token && erro && (
          <span className="mt-2 block">
            <Link to="/login" className="font-bold underline">
              Ir para o login
            </Link>
          </span>
        )}
      </AlertaFormulario>

      <button
        type="submit"
        disabled={enviando}
        className="mt-6 min-h-14 w-full rounded-full bg-dourado px-6 text-lg font-bold text-verde-escuro transition-colors hover:bg-dourado-claro disabled:cursor-not-allowed disabled:opacity-60"
      >
        {enviando ? 'Enviando solicitação...' : 'Agendar conversa'}
      </button>

      {confirmado && (
        <div role="status" className="mt-4 flex gap-3 rounded-2xl bg-campo p-4 text-verde-titulo">
          <CalendarCheck aria-hidden="true" size={24} className="shrink-0" />
          <p className="text-base">
            {usaAgendaFixa && diaEscolhido ? (
              <>
                Horário escolhido: <strong>{diaEscolhido.diaSemana}, {diaEscolhido.data} às {horario}</strong>. Na
                próxima etapa você confirma e faz o pagamento.
              </>
            ) : (
              <>
                Solicitação enviada para <strong>{especialista.nome}</strong>! Acompanhe o status no seu painel.
              </>
            )}
          </p>
        </div>
      )}

      <ul className="mt-5 flex flex-col gap-2 text-texto-secundario">
        <li className="flex items-center gap-2">
          <Lock aria-hidden="true" size={18} /> Pagamento seguro pela plataforma
        </li>
        <li className="flex items-center gap-2">
          <Video aria-hidden="true" size={18} /> Conversa por vídeo, no celular ou computador
        </li>
      </ul>
    </form>
  )
}
