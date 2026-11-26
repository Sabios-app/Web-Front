import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CartaoEspecialista from '../../components/CartaoEspecialista'
import EstadoInterface from '../../components/EstadoInterface'
import Revelar from '../../components/Revelar'
import { specialistService } from '../../services/sabiosServices'
import { parseApiError } from '../../utils/apiError'
import {
  extrairListaPaginada,
  mapearEspecialistaApi,
} from '../../utils/especialistaMapper'

export default function SecaoEspecialistas() {
  const [especialistas, setEspecialistas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true

    specialistService
      .listSpecialists({ page: 0, size: 3 })
      .then((response) => {
        if (!ativo) return
        setEspecialistas(extrairListaPaginada(response).map(mapearEspecialistaApi))
        setErro('')
        setCarregando(false)
      })
      .catch((err) => {
        if (!ativo) return
        const parsed = parseApiError(
          err,
          'Não foi possível carregar os especialistas em destaque.',
        )
        setEspecialistas([])
        setErro(parsed.message)
        setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [tentativa])

  function recarregarDestaques() {
    setCarregando(true)
    setErro('')
    setTentativa((atual) => atual + 1)
  }

  return (
    <section id="especialistas" className="bg-campo/70">
      <div className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Revelar>
            <p className="text-sm font-extrabold uppercase tracking-[.18em] text-dourado-texto">
              Experiência comprovada
            </p>
            <h2 className="mt-3 font-titulo text-4xl tracking-tight text-verde-titulo sm:text-5xl">
              Especialistas em destaque
            </h2>
            <p className="mt-3 text-xl text-texto-secundario">
              Pessoas que construíram histórias e agora ajudam você a construir
              a sua.
            </p>
          </Revelar>
          <Link
            to="/especialistas"
            className="inline-flex items-center gap-2 text-lg font-bold text-dourado-texto underline-offset-4 hover:underline"
          >
            Ver todos os especialistas
            <ArrowRight aria-hidden="true" size={20} />
          </Link>
        </div>

        <div className="mt-10">
          {carregando ? (
            <EstadoInterface tipo="carregando" />
          ) : erro ? (
            <EstadoInterface tipo="erro" descricao={erro} acao={recarregarDestaques} />
          ) : especialistas.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {especialistas.map((especialista, indice) => (
                <Revelar key={especialista.id} atraso={indice * 150}>
                  <CartaoEspecialista especialista={especialista} />
                </Revelar>
              ))}
            </div>
          ) : (
            <EstadoInterface
              tipo="vazio"
              titulo="Nenhum especialista em destaque no momento"
              descricao="Confira a lista completa de conselheiros disponíveis na plataforma."
            />
          )}
        </div>
      </div>
    </section>
  )
}
