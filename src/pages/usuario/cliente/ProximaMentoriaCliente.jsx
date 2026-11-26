import {
  CalendarDays,
  ChevronDown,
  Clock,
  HelpCircle,
  Plus,
  Trash2,
  Video,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import BadgeStatusMentoria from '../../../components/mentoria/BadgeStatusMentoria'
import { obterInfoStatusMentoria } from '../../../utils/mentoriaStatus'

export default function ProximaMentoriaCliente({ mentoria }) {
  const [perguntas, setPerguntas] = useState(mentoria?.perguntasAnotadas || [])
  const [novaPergunta, setNovaPergunta] = useState('')

  function adicionarPergunta(e) {
    e.preventDefault()
    if (!novaPergunta.trim()) return
    setPerguntas([...perguntas, novaPergunta.trim()])
    setNovaPergunta('')
  }

  function removerPergunta(index) {
    setPerguntas(perguntas.filter((_, i) => i !== index))
  }

  if (!mentoria) {
    return (
      <div className="rounded-3xl border border-dashed border-divisoria bg-white p-8 text-center">
        <h3 className="font-titulo text-xl font-bold text-verde-titulo">
          Nenhuma mentoria agendada no momento
        </h3>
        <p className="mt-2 text-texto-secundario">
          Encontre um profissional sênior para conversar sobre os desafios do seu negócio.
        </p>
        <Link
          to="/especialistas"
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-verde-petroleo px-6 text-sm font-bold text-white hover:bg-verde-hover"
        >
          Ver conselheiros disponíveis
        </Link>
      </div>
    )
  }

  const infoStatus = obterInfoStatusMentoria(mentoria.status)
  const podeExibirLink = Boolean(mentoria.linkChamada) && !infoStatus.encerrada

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-verde-petroleo/20 bg-white shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-divisoria bg-dourado-aviso/60 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-dourado animate-pulse motion-reduce:animate-none" />
          <span className="font-bold text-verde-titulo">
            Sua Próxima Mentoria
          </span>
        </div>
        <div className="flex items-center gap-2">
          {mentoria.status && <BadgeStatusMentoria status={mentoria.status} />}
          {mentoria.emBreveTexto && (
            <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-sm font-semibold text-dourado-escuro">
              <Clock size={16} aria-hidden="true" />
              <span>{mentoria.emBreveTexto}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <img
              src={mentoria.especialistaFoto}
              alt={mentoria.especialistaNome}
              className="h-18 w-18 rounded-full border-2 border-verde-petroleo object-cover"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-dourado-escuro">
                Seu Conselheiro Sênior
              </span>
              <h2 className="font-titulo text-2xl font-bold text-verde-titulo">
                {mentoria.especialistaNome}
              </h2>
              <p className="text-sm font-medium text-texto-secundario">
                {mentoria.especialistaDescricao}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-verde-petroleo">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={16} className="text-dourado-escuro" aria-hidden="true" />
                  {mentoria.data}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={16} className="text-dourado-escuro" aria-hidden="true" />
                  {mentoria.horario}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {podeExibirLink ? (
              <a
                href={mentoria.linkChamada}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-verde-petroleo px-7 text-base font-bold text-white shadow-sm transition-colors hover:bg-verde-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dourado-foco"
              >
                <Video size={20} aria-hidden="true" />
                Entrar na sala de mentoria
              </a>
            ) : !infoStatus.encerrada ? (
              <p className="inline-flex min-h-14 items-center gap-2 rounded-full border border-divisoria bg-campo px-5 text-sm font-semibold text-texto-secundario">
                <Video size={18} aria-hidden="true" />
                O conselheiro ainda não informou o link
              </p>
            ) : null}

            {mentoria.especialistaId && (
              <Link
                to={`/especialistas/${mentoria.especialistaId}`}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border-2 border-verde-petroleo bg-white px-5 text-base font-bold text-verde-petroleo transition-colors hover:bg-campo"
              >
                Ver perfil completo
              </Link>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-campo p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-texto-secundario">
            Assunto Principal da Conversa
          </p>
          <p className="mt-1 text-lg font-semibold text-verde-titulo">
            {mentoria.tema}
          </p>
        </div>

        {/* Bloco de perguntas para não esquecer na hora da reunião */}
        <details className="group mt-6 border-t border-divisoria pt-6">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl text-verde-titulo focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dourado-foco">
            <HelpCircle size={18} className="shrink-0 text-dourado-escuro" aria-hidden="true" />
            <span className="flex-1 font-titulo text-lg font-bold">
              Perguntas para esta sessão ({perguntas.length})
            </span>
            <ChevronDown
              size={20}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>

          <div className="mt-4">
            <ul className="space-y-2">
              {perguntas.map((p, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-divisoria bg-white px-4 py-2.5 text-sm font-medium text-verde-petroleo"
                >
                  <span>• {p}</span>
                  <button
                    type="button"
                    onClick={() => removerPergunta(idx)}
                    className="text-texto-secundario hover:text-red-600"
                    title="Remover pergunta"
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={adicionarPergunta} className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={novaPergunta}
                onChange={(e) => setNovaPergunta(e.target.value)}
                placeholder="Digite mais uma dúvida que gostaria de perguntar..."
                className="h-11 flex-1 rounded-xl border border-divisoria bg-white px-4 text-sm text-verde-petroleo focus:outline-none focus:ring-2 focus:ring-dourado-foco"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-verde-petroleo px-4 text-sm font-bold text-white transition-colors hover:bg-verde-hover sm:shrink-0"
              >
                <Plus size={16} aria-hidden="true" />
                Anotar
              </button>
            </form>
          </div>
        </details>
      </div>
    </div>
  )
}
