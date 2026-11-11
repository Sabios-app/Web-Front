import { Calendar, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function DisponibilidadeAgendaConselheiro({ diasIniciais }) {
  const [dias, setDias] = useState(diasIniciais || [])
  const [novoHorarioDia, setNovoHorarioDia] = useState('')
  const [diaSelecionado, setDiaSelecionado] = useState(diasIniciais?.[0]?.dia || 'Segunda-feira')

  function adicionarHorario(e) {
    e.preventDefault()
    if (!novoHorarioDia) return
    setDias(
      dias.map((d) => {
        if (d.dia === diaSelecionado && !d.horarios.includes(novoHorarioDia)) {
          return { ...d, horarios: [...d.horarios, novoHorarioDia].sort() }
        }
        return d
      })
    )
    setNovoHorarioDia('')
  }

  function removerHorario(diaNome, horario) {
    setDias(
      dias.map((d) => {
        if (d.dia === diaNome) {
          return { ...d, horarios: d.horarios.filter((h) => h !== horario) }
        }
        return d
      })
    )
  }

  return (
    <div className="rounded-3xl border border-divisoria bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-titulo text-2xl font-bold text-verde-titulo">
            Sua Grade de Horários Semanais
          </h2>
          <p className="text-sm text-texto-secundario">
            Estes são os horários em que clientes podem agendar mentorias com você.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {dias.map((d) => (
          <div
            key={d.dia}
            className="rounded-2xl border border-divisoria bg-campo/40 p-4"
          >
            <div className="flex items-center justify-between border-b border-divisoria pb-2">
              <span className="font-bold text-verde-titulo flex items-center gap-1.5">
                <Calendar size={16} className="text-dourado-escuro" />
                {d.dia}
              </span>
              <span className="text-xs font-semibold text-texto-secundario">
                {d.horarios.length} horários
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {d.horarios.map((h) => (
                <span
                  key={h}
                  className="group inline-flex items-center gap-1 rounded-full border border-divisoria bg-white px-3 py-1 text-xs font-bold text-verde-petroleo shadow-2xs"
                >
                  {h}
                  <button
                    type="button"
                    onClick={() => removerHorario(d.dia, h)}
                    className="text-texto-secundario opacity-60 hover:opacity-100 hover:text-red-600"
                    title={`Remover ${h}`}
                  >
                    <Trash2 size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={adicionarHorario} className="mt-6 flex flex-wrap items-center gap-3 border-t border-divisoria pt-6">
        <label htmlFor="select-dia" className="text-sm font-bold text-verde-titulo">
          Adicionar horário:
        </label>
        <select
          id="select-dia"
          value={diaSelecionado}
          onChange={(e) => setDiaSelecionado(e.target.value)}
          className="h-11 rounded-xl border border-divisoria bg-white px-3 text-sm font-semibold text-verde-petroleo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
        >
          {dias.map((d) => (
            <option key={d.dia} value={d.dia}>
              {d.dia}
            </option>
          ))}
        </select>
        <input
          type="time"
          value={novoHorarioDia}
          onChange={(e) => setNovoHorarioDia(e.target.value)}
          required
          className="h-11 rounded-xl border border-divisoria bg-white px-3 text-sm font-semibold text-verde-petroleo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
        />
        <button
          type="submit"
          className="inline-flex h-11 items-center gap-1.5 rounded-full bg-verde-petroleo px-5 text-sm font-bold text-white transition hover:bg-verde-hover"
        >
          <Plus size={16} />
          Inserir horário
        </button>
      </form>
    </div>
  )
}
