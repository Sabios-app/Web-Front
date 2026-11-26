import { Compass, History } from 'lucide-react'
import { useEffect, useState } from 'react'
import BlocoDicas from '../components/feedback/BlocoDicas'
import NavegacaoAbas from '../components/navigation/NavegacaoAbas'
import { dadosCliente } from '../data/dadosUsuario'
import useAuth from '../hooks/useAuth'
import AreaUsuarioLayout from '../layouts/AreaUsuarioLayout'
import {
  actionPlanService,
  mentoringService,
  specialistService,
} from '../services/sabiosServices'
import {
  AVATAR_PADRAO,
  extrairListaPaginada,
  mapearEspecialistaApi,
  mapearMentoriaApi,
} from '../utils/especialistaMapper'
import { formatarDataBR } from '../utils/formatadores'
import CabecalhoCliente from './usuario/cliente/CabecalhoCliente'
import ConselheirosRecomendadosCliente from './usuario/cliente/ConselheirosRecomendadosCliente'
import HistoricoMentoriasCliente from './usuario/cliente/HistoricoMentoriasCliente'
import PlanoDeAcaoCliente from './usuario/cliente/PlanoDeAcaoCliente'
import ProximaMentoriaCliente from './usuario/cliente/ProximaMentoriaCliente'

export default function UsuarioClientePage() {
  const { user } = useAuth()
  const [proximaMentoria, setProximaMentoria] = useState(null)
  const [historicoMentorias, setHistoricoMentorias] = useState([])
  const [conselheirosRecomendados, setConselheirosRecomendados] = useState([])
  const [planoDeAcao, setPlanoDeAcao] = useState([])
  const [planoVersao, setPlanoVersao] = useState(0)
  const [abaAtiva, setAbaAtiva] = useState('plano')

  const cliente = {
    ...dadosCliente,
    nome: user?.name || dadosCliente.nome,
    foto: user?.avatarUrl || AVATAR_PADRAO,
    historicoMentorias,
    conselheirosRecomendados,
  }

  useEffect(() => {
    let ativo = true

    async function carregarDadosDashboard() {
      const [nextRes, listRes, planosRes, espRes] = await Promise.allSettled([
        mentoringService.getNextMentoring(),
        mentoringService.listMyMentorings(),
        actionPlanService.list(),
        specialistService.listSpecialists({ page: 0, size: 3 }),
      ])

      if (!ativo) return

      if (nextRes.status === 'fulfilled' && nextRes.value && nextRes.value.id) {
        setProximaMentoria(mapearMentoriaApi(nextRes.value))
      } else {
        setProximaMentoria(null)
      }

      if (listRes.status === 'fulfilled') {
        const mentorias = extrairListaPaginada(listRes.value).map(mapearMentoriaApi)
        setHistoricoMentorias(mentorias)
      }

      if (planosRes.status === 'fulfilled') {
        const planos = extrairListaPaginada(planosRes.value)
        const planosMapeados = planos.map((p) => ({
          id: p.id,
          titulo: p.title,
          prazo: p.deadline ? formatarDataBR(p.deadline) : 'Em andamento',
          concluido: Boolean(p.completed),
          conselheiro: p.conselheiroNome || 'Conselheiro Sábios',
        }))
        setPlanoDeAcao(planosMapeados)
        setPlanoVersao((v) => v + 1)
      }

      if (espRes.status === 'fulfilled') {
        setConselheirosRecomendados(
          extrairListaPaginada(espRes.value).map(mapearEspecialistaApi),
        )
      }
    }

    carregarDadosDashboard()
    return () => {
      ativo = false
    }
  }, [user])

  const abas = [
    {
      id: 'plano',
      icone: Compass,
      rotulo: 'Conselheiros Recomendados para Você',
    },
    {
      id: 'historico',
      icone: History,
      rotulo: 'Histórico de Mentorias',
      contador: historicoMentorias.length,
    },
  ]

  const dicas = [
    {
      destaque: 'Traga seus números e dúvidas reais',
      texto:
        'Quanto mais transparente você for com suas dificuldades, mais rápido o conselheiro poderá te guiar.',
    },
    {
      destaque: 'Execute uma ação por vez',
      texto:
        'Não tente mudar tudo de um dia para o outro. Foque na primeira tarefa do seu plano de ação.',
    },
    {
      destaque: 'Peça novos encontros se precisar',
      texto:
        'A consistência de acompanhar seu progresso a cada 15 ou 30 dias evita erros caros no seu negócio.',
    },
  ]

  return (
    <AreaUsuarioLayout usuario={cliente}>
      <div className="mx-auto max-w-275">
        {/* Banner de boas-vindas do Cliente Empreendedor */}
        <div className="motion-safe:animate-aparecer">
          <CabecalhoCliente cliente={cliente} />
        </div>

        {/* Próxima Mentoria (Destaque principal) */}
        <div
          className="mt-8 motion-safe:animate-aparecer"
          style={{ animationDelay: '60ms' }}
        >
          <ProximaMentoriaCliente
            key={proximaMentoria?.id ?? 'sem-mentoria'}
            mentoria={proximaMentoria}
          />
        </div>

        {/* Plano de Ação das Mentorias */}
        <div
          className="mt-8 motion-safe:animate-aparecer"
          style={{ animationDelay: '120ms' }}
        >
          <PlanoDeAcaoCliente key={planoVersao} acoesIniciais={planoDeAcao} />
        </div>

        {/* Abas: Conselheiros Recomendados & Histórico */}
        <div
          className="mt-10 motion-safe:animate-aparecer"
          style={{ animationDelay: '180ms' }}
        >
          <NavegacaoAbas abas={abas} abaAtiva={abaAtiva} aoSelecionar={setAbaAtiva} />

          <div className="mt-6">
            {abaAtiva === 'plano' && (
              <ConselheirosRecomendadosCliente
                conselheiros={conselheirosRecomendados}
              />
            )}

            {abaAtiva === 'historico' && (
              <HistoricoMentoriasCliente
                historico={historicoMentorias}
              />
            )}
          </div>
        </div>

        {/* Dicas para o empreendedor */}
        <BlocoDicas titulo="Como aproveitar ao máximo cada mentoria no Sábios" dicas={dicas} />
      </div>
    </AreaUsuarioLayout>
  )
}
