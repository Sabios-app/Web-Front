import { CalendarCheck, Clock, Loader2, Lock, Video } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AlertaFormulario from '../../components/feedback/AlertaFormulario'
import useAuth from '../../hooks/useAuth'
import { agendaService, mentoringService } from '../../services/sabiosServices'
import { extrairErrosDeCampo, parseApiError } from '../../utils/apiError'
import { formatarReais } from '../../utils/formatadores'

const estiloOpcao =
  'flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 px-3 py-2 text-center text-sm font-semibold transition-colors'
const opcaoAtiva = 'border-verde-petroleo bg-verde-petroleo text-white shadow-sm'
const opcaoInativa = 'border-divisoria bg-white text-verde-titulo hover:border-verde-petroleo'

const ALIASES_AGENDAMENTO = {
  scheduledAt: 'dataHora',
  title: 'assunto',
  doubts: 'duvidas',
}
const CAMPOS_AGENDAMENTO = ['dataHora', 'assunto', 'duvidas']

export default function CardAgendamento({ especialista }) {
  const { token, perfil } = useAuth()

  const [slotsDisponiveis, setSlotsDisponiveis] = useState([])
  const [carregandoSlots, setCarregandoSlots] = useState(false)
  const [slotSelecionado, setSlotSelecionado] = useState(null)

  const [dataHora, setDataHora] = useState('')
  const [assunto, setAssunto] = useState('')
  const [duvidas, setDuvidas] = useState('')
  const [erro, setErro] = useState('')
  const [errosCampos, setErrosCampos] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [confirmado, setConfirmado] = useState(false)

  // Carrega slots reais da API para os próximos 30 dias
  useEffect(() => {
    let ativo = true
    if (!especialista?.id) return undefined

    async function buscarSlots() {
      try {
        setCarregandoSlots(true)
        const hoje = new Date()
        const em30Dias = new Date()
        em30Dias.setDate(hoje.getDate() + 30)

        const fromStr = hoje.toISOString().split('T')[0]
        const toStr = em30Dias.toISOString().split('T')[0]

        const slots = await agendaService.getSlots(especialista.id, fromStr, toStr)
        if (ativo && Array.isArray(slots)) {
          setSlotsDisponiveis(slots)
        }
      } catch (err) {
        // Ignora silenciosamente ou mantém fallback manual se a API não estiver respondendo
      } finally {
        if (ativo) setCarregandoSlots(false)
      }
    }

    buscarSlots()
    return () => {
      ativo = false
    }
  }, [especialista?.id])

  // Agrupa slots reais por data (YYYY-MM-DD)
  const slotsPorDia = slotsDisponiveis.reduce((acc, slotIso) => {
    const dataObj = new Date(slotIso)
    const diaChave = dataObj.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    })
    if (!acc[diaChave]) acc[diaChave] = []
    acc[diaChave].push({
      iso: slotIso,
      hora: dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    })
    return acc
  }, {})

  const diasComSlots = Object.keys(slotsPorDia)
  const temSlotsReais = diasComSlots.length > 0

  async function agendar(evento) {
    evento.preventDefault()
    setErro('')
    setErrosCampos({})
    setConfirmado(false)

    if (!token) {
      setErro('Entre na sua conta de cliente para solicitar uma mentoria.')
      return
    }
    if (perfil === 'conselheiro') {
      setErro('Acesse com uma conta de cliente para agendar uma mentoria.')
      return
    }

    const dataFinal = slotSelecionado || (dataHora ? new Date(dataHora).toISOString() : '')
    if (!dataFinal) {
      setErrosCampos({ dataHora: 'Escolha um horário para a conversa.' })
      return
    }
    if (!assunto.trim()) {
      setErrosCampos({ assunto: 'Informe o assunto principal da conversa.' })
      return
    }

    setEnviando(true)
    try {
      await mentoringService.requestMentoring({
        specialistId: especialista.id,
        title: assunto.trim(),
        description: assunto.trim(),
        doubts: duvidas.trim(),
        scheduledAt: dataFinal,
      })
      setConfirmado(true)
      setAssunto('')
      setDuvidas('')
      setDataHora('')
      setSlotSelecionado(null)
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

      {carregandoSlots ? (
        <div className="mt-8 flex items-center justify-center gap-2 py-6 text-verde-petroleo">
          <Loader2 className="animate-spin" size={24} />
          <span className="text-sm font-semibold">Consultando agenda do especialista...</span>
        </div>
      ) : temSlotsReais ? (
        <div className="mt-6 space-y-4">
          <label className="block text-base font-bold text-verde-titulo">
            Horários disponíveis na agenda
          </label>
          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {diasComSlots.map((dia) => (
              <div key={dia} className="rounded-xl border border-divisoria bg-campo/30 p-3">
                <span className="text-xs font-bold uppercase tracking-wider text-verde-titulo">
                  {dia}
                </span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {slotsPorDia[dia].map((slot) => {
                    const isSelected = slotSelecionado === slot.iso
                    return (
                      <button
                        key={slot.iso}
                        type="button"
                        onClick={() => {
                          setSlotSelecionado(slot.iso)
                          setErro('')
                          setErrosCampos({})
                        }}
                        className={`${estiloOpcao} ${isSelected ? opcaoAtiva : opcaoInativa}`}
                      >
                        <Clock size={14} className="mb-1" />
                        {slot.hora}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          {errosCampos.dataHora && (
            <p role="alert" className="mt-1 text-sm font-semibold text-red-700">
              {errosCampos.dataHora}
            </p>
          )}

          <div className="mt-4">
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
            Solicitação enviada para <strong>{especialista.nome}</strong>! Acompanhe o status no seu painel.
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
