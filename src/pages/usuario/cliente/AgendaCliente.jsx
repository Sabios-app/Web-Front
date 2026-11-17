import HistoricoMentoriasCliente from './HistoricoMentoriasCliente'
import ProximaMentoriaCliente from './ProximaMentoriaCliente'

export default function AgendaCliente({ usuario }) {
  return (
    <div className="space-y-6">
      <ProximaMentoriaCliente mentoria={usuario.proximaMentoria} />
      <HistoricoMentoriasCliente historico={usuario.historicoMentorias} />
    </div>
  )
}
