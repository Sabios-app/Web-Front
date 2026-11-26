import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EstadoInterface from '../components/EstadoInterface'
import MainLayout from '../layouts/MainLayout'
import { specialistService } from '../services/sabiosServices'
import { parseApiError } from '../utils/apiError'
import { mapearEspecialistaApi } from '../utils/especialistaMapper'
import NaoEncontradaPage from './NaoEncontradaPage'
import AvaliacoesEspecialista from './perfil/AvaliacoesEspecialista'
import CardAgendamento from './perfil/CardAgendamento'
import CartaoSecao from './perfil/CartaoSecao'
import ResumoEspecialista from './perfil/ResumoEspecialista'
import TrajetoriaEspecialista from './perfil/TrajetoriaEspecialista'

export default function PerfilEspecialistaPage() {
  const { id } = useParams()
  const [especialista, setEspecialista] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [naoEncontrado, setNaoEncontrado] = useState(false)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true

    specialistService
      .getById(id)
      .then((dados) => {
        if (!ativo) return
        setEspecialista(mapearEspecialistaApi(dados))
        setErro('')
        setNaoEncontrado(false)
        setCarregando(false)
      })
      .catch((err) => {
        if (!ativo) return
        const parsed = parseApiError(err, 'Não foi possível carregar o perfil do especialista.')
        if (parsed.status === 404 || parsed.status === 400) {
          setNaoEncontrado(true)
          setErro('')
        } else {
          setNaoEncontrado(false)
          setErro(parsed.message)
        }
        setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [id, tentativa])

  function recarregarEspecialista() {
    setCarregando(true)
    setErro('')
    setNaoEncontrado(false)
    setTentativa((atual) => atual + 1)
  }

  if (naoEncontrado) {
    return <NaoEncontradaPage mensagem="Não encontramos esse especialista." />
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-8 lg:px-8">
        <Link
          to="/especialistas"
          className="inline-flex min-h-12 items-center gap-2 text-lg font-semibold text-verde-titulo underline-offset-4 hover:underline"
        >
          <ArrowLeft aria-hidden="true" size={22} />
          Voltar para especialistas
        </Link>

        {carregando ? (
          <div className="mt-6">
            <EstadoInterface
              tipo="carregando"
              titulo="Carregando perfil"
              descricao="Buscando as informações do conselheiro."
            />
          </div>
        ) : erro || !especialista ? (
          <div className="mt-6">
            <EstadoInterface tipo="erro" descricao={erro} acao={recarregarEspecialista} />
          </div>
        ) : (
          /* No celular o agendamento aparece logo depois do resumo; no computador fica fixo à direita. */
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
        )}
      </div>
    </MainLayout>
  )
}
