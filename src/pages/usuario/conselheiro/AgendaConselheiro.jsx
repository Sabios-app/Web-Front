import DisponibilidadeAgendaConselheiro from './DisponibilidadeAgendaConselheiro'
import ListaSessoesConselheiro from './ListaSessoesConselheiro'

export default function AgendaConselheiro({ usuario }) {
  return (
    <div className="space-y-6">
      <ListaSessoesConselheiro sessoes={usuario.sessoesAgendadas} />
      <DisponibilidadeAgendaConselheiro diasIniciais={usuario.diasDisponiveis} />
    </div>
  )
}
