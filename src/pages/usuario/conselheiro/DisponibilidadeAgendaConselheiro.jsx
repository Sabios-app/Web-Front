import { Calendar, Loader2, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import AlertaFormulario from '../../../components/feedback/AlertaFormulario'
import { agendaService } from '../../../services/sabiosServices'

const DIAS_SEMANA = [
  { chave: 'MONDAY', label: 'Segunda-feira' },
  { chave: 'TUESDAY', label: 'Terça-feira' },
  { chave: 'WEDNESDAY', label: 'Quarta-feira' },
  { chave: 'THURSDAY', label: 'Quinta-feira' },
  { chave: 'FRIDAY', label: 'Sexta-feira' },
  { chave: 'SATURDAY', label: 'Sábado' },
  { chave: 'SUNDAY', label: 'Domingo' },
]

export default function DisponibilidadeAgendaConselheiro({ diasIniciais }) {
  const [disponibilidades, setDisponibilidades] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [diaSelecionado, setDiaSelecionado] = useState('MONDAY')
  const [horaInicio, setHoraInicio] = useState('09:00')
  const [horaFim, setHoraFim] = useState('12:00')

  useEffect(() => {
    let ativo = true
    async function carregar() {
      try {
        setCarregando(true)
        setErro('')
        const dados = await agendaService.getMyAgenda()
        if (ativo && Array.isArray(dados)) {
          setDisponibilidades(dados)
        }
      } catch (err) {
        if (ativo) {
          // Fallback gracioso se não conseguir carregar da API (ex: mock ou sem token)
          if (Array.isArray(diasIniciais)) {
            // Se vier de props mockadas
            const adaptados = []
            diasIniciais.forEach((d) => {
              const diaObj = DIAS_SEMANA.find((item) => item.label === d.dia)
              const dayOfWeek = diaObj ? diaObj.chave : 'MONDAY'
              ;(d.horarios || []).forEach((h, idx) => {
                adaptados.push({
                  id: `${dayOfWeek}-${h}-${idx}`,
                  dayOfWeek,
                  startTime: h,
                  endTime: h,
                })
              })
            })
            setDisponibilidades(adaptados)
          } else {
            setErro('Não foi possível carregar sua grade de horários da API.')
          }
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregar()
    return () => {
      ativo = false
    }
  }, [diasIniciais])

  async function adicionarHorario(e) {
    e.preventDefault()
    if (!horaInicio || !horaFim) return
    setErro('')
    setSalvando(true)

    try {
      const nova = await agendaService.createAvailability({
        dayOfWeek: diaSelecionado,
        startTime: horaInicio.length === 5 ? `${horaInicio}:00` : horaInicio,
        endTime: horaFim.length === 5 ? `${horaFim}:00` : horaFim,
      })
      setDisponibilidades((atuais) => [...atuais, nova])
    } catch (err) {
      setErro(err?.response?.data?.message || err?.message || 'Falha ao salvar horário na agenda.')
    } finally {
      setSalvando(false)
    }
  }

  async function removerHorario(id) {
    setErro('')
    try {
      if (typeof id === 'number') {
        await agendaService.removeAvailability(id)
      }
      setDisponibilidades((atuais) => atuais.filter((d) => d.id !== id))
    } catch (err) {
      setErro(err?.response?.data?.message || err?.message || 'Falha ao remover horário.')
    }
  }

  // Agrupa disponibilidades por dia
  const gradePorDia = DIAS_SEMANA.map(({ chave, label }) => {
    const slots = disponibilidades
      .filter((d) => d.dayOfWeek === chave)
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
    return {
      chave,
      label,
      slots,
    }
  })

  return (
    <div className="rounded-3xl border border-divisoria bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-titulo text-2xl font-bold text-verde-titulo">
            Sua Grade de Horários Semanais
          </h2>
          <p className="text-sm text-texto-secundario">
            Estes são os horários e turnos em que clientes podem agendar mentorias com você.
          </p>
        </div>
      </div>

      <AlertaFormulario tipo="erro">{erro}</AlertaFormulario>

      {carregando ? (
        <div className="mt-8 flex justify-center py-6 text-verde-petroleo">
          <Loader2 className="animate-spin" size={28} />
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {gradePorDia.map((d) => (
            <div
              key={d.chave}
              className="rounded-2xl border border-divisoria bg-campo/40 p-4"
            >
              <div className="flex items-center justify-between border-b border-divisoria pb-2">
                <span className="font-bold text-verde-titulo flex items-center gap-1.5">
                  <Calendar size={16} className="text-dourado-escuro" />
                  {d.label}
                </span>
                <span className="text-xs font-semibold text-texto-secundario">
                  {d.slots.length} turnos/horários
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {d.slots.length === 0 ? (
                  <span className="text-xs text-texto-secundario italic">Indisponível</span>
                ) : (
                  d.slots.map((s) => (
                    <span
                      key={s.id}
                      className="group inline-flex items-center gap-1 rounded-full border border-divisoria bg-white px-3 py-1 text-xs font-bold text-verde-petroleo shadow-2xs"
                    >
                      {s.startTime.slice(0, 5)} - {s.endTime.slice(0, 5)}
                      <button
                        type="button"
                        onClick={() => removerHorario(s.id)}
                        className="text-texto-secundario opacity-60 hover:opacity-100 hover:text-red-600"
                        title={`Remover ${s.startTime.slice(0, 5)} - ${s.endTime.slice(0, 5)}`}
                      >
                        <Trash2 size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={adicionarHorario} className="mt-6 flex flex-wrap items-center gap-3 border-t border-divisoria pt-6">
        <label htmlFor="select-dia" className="text-sm font-bold text-verde-titulo">
          Adicionar disponibilidade:
        </label>
        <select
          id="select-dia"
          value={diaSelecionado}
          onChange={(e) => setDiaSelecionado(e.target.value)}
          className="h-11 rounded-xl border border-divisoria bg-white px-3 text-sm font-semibold text-verde-petroleo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
        >
          {DIAS_SEMANA.map((d) => (
            <option key={d.chave} value={d.chave}>
              {d.label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            required
            className="h-11 rounded-xl border border-divisoria bg-white px-3 text-sm font-semibold text-verde-petroleo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
          />
          <span className="text-xs font-bold text-texto-secundario">até</span>
          <input
            type="time"
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            required
            className="h-11 rounded-xl border border-divisoria bg-white px-3 text-sm font-semibold text-verde-petroleo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
          />
        </div>
        <button
          type="submit"
          disabled={salvando}
          className="inline-flex h-11 items-center gap-1.5 rounded-full bg-verde-petroleo px-5 text-sm font-bold text-white transition hover:bg-verde-hover disabled:opacity-60"
        >
          {salvando ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          {salvando ? 'Salvando...' : 'Inserir horário'}
        </button>
      </form>
    </div>
  )
}
