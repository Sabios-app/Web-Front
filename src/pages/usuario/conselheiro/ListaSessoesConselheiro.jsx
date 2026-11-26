import { Calendar, Clock, Video } from 'lucide-react'
import { useMemo, useState } from 'react'
import BadgeStatusMentoria from '../../../components/mentoria/BadgeStatusMentoria'
import FiltroStatusMentoria from '../../../components/mentoria/FiltroStatusMentoria'
import {
  filtrarMentoriasPorStatus,
  obterInfoStatusMentoria,
} from '../../../utils/mentoriaStatus'

export default function ListaSessoesConselheiro({ sessoes }) {
  const [filtroStatus, setFiltroStatus] = useState('ALL')

  const lista = useMemo(
    () => filtrarMentoriasPorStatus(sessoes, filtroStatus),
    [sessoes, filtroStatus],
  )

  if (!sessoes || sessoes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-divisoria p-8 text-center text-texto-secundario">
        Nenhuma outra sessão agendada para esta semana.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <FiltroStatusMentoria
        filtro={filtroStatus}
        aoAlterar={setFiltroStatus}
        ariaLabel="Filtrar sessões por status"
      />

      {lista.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-divisoria p-8 text-center text-texto-secundario">
          Nenhuma sessão encontrada com esse status.
        </div>
      ) : (
        lista.map((s) => {
          const infoStatus = obterInfoStatusMentoria(s.status)
          const podeExibirLink = Boolean(s.linkChamada) && !infoStatus.encerrada

          return (
            <div
              key={s.id}
              className="flex flex-col gap-4 rounded-2xl border border-divisoria bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={s.clienteFoto}
                  alt={s.clienteNome}
                  className="h-14 w-14 rounded-full border border-divisoria object-cover"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-titulo text-lg font-bold text-verde-titulo">
                      {s.clienteNome}
                    </h3>
                    {s.clienteNegocio && (
                      <span className="rounded-full bg-campo px-2.5 py-0.5 text-xs font-bold text-verde-petroleo">
                        {s.clienteNegocio}
                      </span>
                    )}
                    <BadgeStatusMentoria status={s.status || 'CONFIRMED'} />
                  </div>
                  <p className="mt-0.5 text-sm text-texto-secundario">
                    {s.tema}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-verde-petroleo">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={14} className="text-dourado-escuro" />
                      {s.data}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} className="text-dourado-escuro" />
                      {s.horario}
                    </span>
                    {s.clienteCidade && (
                      <span className="text-texto-secundario">
                        📍 {s.clienteCidade}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center">
                {podeExibirLink ? (
                  <a
                    href={s.linkChamada}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-verde-petroleo bg-white px-4 text-sm font-bold text-verde-petroleo hover:bg-campo"
                  >
                    <Video size={16} />
                    Link da sala
                  </a>
                ) : !infoStatus.encerrada ? (
                  <span className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-divisoria bg-campo px-4 text-xs font-semibold text-texto-secundario">
                    <Video size={14} />
                    O conselheiro ainda não informou o link
                  </span>
                ) : null}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
