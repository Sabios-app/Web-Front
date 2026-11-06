import { CalendarCheck, Lock, Video } from 'lucide-react'
import { useState } from 'react'
import { formatarReais } from '../../data/especialistas'

const estiloOpcao =
  'flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 px-2 text-center text-lg font-semibold transition-colors'
const opcaoAtiva = 'border-verde-petroleo bg-verde-petroleo text-white'
const opcaoInativa = 'border-divisoria bg-white text-verde-titulo hover:border-verde-petroleo'

/**
 * Agendamento em dois passos: escolher o dia e depois o horário.
 * Usa <input type="radio"> de verdade, então funciona com teclado e leitor de tela.
 * O pagamento ainda não existe: por enquanto mostramos só a confirmação da escolha.
 */
export default function CardAgendamento({ especialista }) {
  const [diaId, setDiaId] = useState('')
  const [horario, setHorario] = useState('')
  const [erro, setErro] = useState('')
  const [confirmado, setConfirmado] = useState(false)

  const diaEscolhido = especialista.agenda.find((dia) => dia.id === diaId)

  function escolherDia(id) {
    setDiaId(id)
    setHorario('')
    setErro('')
    setConfirmado(false)
  }

  function agendar(evento) {
    evento.preventDefault()
    if (!diaId) return setErro('Escolha um dia para a conversa.')
    if (!horario) return setErro('Escolha um horário para a conversa.')
    setErro('')
    setConfirmado(true)
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

      <fieldset className="mt-6">
        <legend className="text-lg font-bold text-verde-titulo">1. Escolha o dia</legend>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {especialista.agenda.map((dia) => (
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

      {erro && (
        <p role="alert" className="mt-4 font-semibold text-red-700">
          {erro}
        </p>
      )}

      <button
        type="submit"
        className="mt-6 min-h-14 w-full rounded-full bg-dourado px-6 text-lg font-bold text-verde-escuro transition-colors hover:bg-dourado-claro"
      >
        Agendar conversa
      </button>

      {confirmado && (
        <div role="status" className="mt-4 flex gap-3 rounded-2xl bg-campo p-4 text-verde-titulo">
          <CalendarCheck aria-hidden="true" size={24} className="shrink-0" />
          <p className="text-lg">
            Horário escolhido: <strong>{diaEscolhido.diaSemana}, {diaEscolhido.data} às {horario}</strong>. Na
            próxima etapa você confirma e faz o pagamento.
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
