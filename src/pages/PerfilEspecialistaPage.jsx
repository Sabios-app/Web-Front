import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { buscarEspecialistaPorId } from '../data/especialistas'
import MainLayout from '../layouts/MainLayout'
import CardAgendamento from './perfil/CardAgendamento'
import AvaliacoesEspecialista from './perfil/AvaliacoesEspecialista'
import CartaoSecao from './perfil/CartaoSecao'
import ResumoEspecialista from './perfil/ResumoEspecialista'
import TrajetoriaEspecialista from './perfil/TrajetoriaEspecialista'
import NaoEncontradaPage from './NaoEncontradaPage'

export default function PerfilEspecialistaPage() {
  const { id } = useParams()
  const especialista = buscarEspecialistaPorId(id)

  if (!especialista) return <NaoEncontradaPage mensagem="Não encontramos esse especialista." />

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-8 lg:px-8">
        <Link
          to="/#especialistas"
          className="inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-verde-titulo underline-offset-4 hover:underline"
        >
          <ArrowLeft aria-hidden="true" size={22} />
          Voltar para especialistas
        </Link>

        {/* No celular o agendamento aparece logo depois do resumo; no computador fica fixo à direita. */}
        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="lg:col-start-1">
            <ResumoEspecialista especialista={especialista} />
          </div>
          <aside
            aria-label="Agendamento"
            className="lg:sticky lg:top-28 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:self-start"
          >
            <CardAgendamento especialista={especialista} />
          </aside>
          <div className="lg:col-start-1">
            <CartaoSecao titulo="Sobre">
              <p className="text-xl leading-relaxed text-verde-titulo">{especialista.sobre}</p>
            </CartaoSecao>
          </div>
          <div className="lg:col-start-1">
            <TrajetoriaEspecialista trajetoria={especialista.trajetoria} />
          </div>
          <div className="lg:col-start-1">
            <AvaliacoesEspecialista avaliacoes={especialista.avaliacoes} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
