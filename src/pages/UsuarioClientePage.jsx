import { Compass, History } from 'lucide-react'
import { useState, useEffect } from 'react'
import BlocoDicas from '../components/feedback/BlocoDicas'
import NavegacaoAbas from '../components/navigation/NavegacaoAbas'
import { dadosCliente } from '../data/dadosUsuario'
import AreaUsuarioLayout from '../layouts/AreaUsuarioLayout'
import CabecalhoCliente from './usuario/cliente/CabecalhoCliente'
import ConselheirosRecomendadosCliente from './usuario/cliente/ConselheirosRecomendadosCliente'
import HistoricoMentoriasCliente from './usuario/cliente/HistoricoMentoriasCliente'
import PlanoDeAcaoCliente from './usuario/cliente/PlanoDeAcaoCliente'
import ProximaMentoriaCliente from './usuario/cliente/ProximaMentoriaCliente'
import useAuth from '../hooks/useAuth'
import { mentoringService, actionPlanService } from '../services/sabiosServices'

export default function UsuarioClientePage() {
  const { user } = useAuth()
  const [cliente, setCliente] = useState(dadosCliente)
  const [proximaMentoria, setProximaMentoria] = useState(dadosCliente.proximaMentoria)
  const [planoDeAcao, setPlanoDeAcao] = useState(dadosCliente.planoDeAcao)
  const [abaAtiva, setAbaAtiva] = useState('plano')

  useEffect(() => {
    async function carregarDadosDashboard() {
      // 1. Atualizar nome do usuário logado se disponível
      if (user?.name) {
        setCliente((prev) => ({
          ...prev,
          nome: user.name,
          email: user.email || prev.email,
        }))
      }

      // 2. Buscar próxima mentoria real no backend
      try {
        const next = await mentoringService.getNextMentoring()
        if (next && next.id) {
          const dataObj = new Date(next.scheduledAt)
          setProximaMentoria({
            id: next.id,
            especialistaId: next.specialist?.id || 1,
            especialistaNome: next.specialist?.user?.name || 'Conselheiro Sábios',
            especialistaDescricao: next.specialist?.specialty || next.title,
            especialistaFoto: next.specialist?.user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
            data: dataObj.toLocaleDateString('pt-BR'),
            horario: dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            emBreveTexto: 'Agendada',
            linkChamada: next.meetingLink || 'https://meet.google.com/new',
            perguntasAnotadas: next.doubts ? [next.doubts] : [],
          })
        }
      } catch (err) {
        console.warn('Usando próxima mentoria padrão ou vazia:', err)
      }

      // 3. Buscar planos de ação reais no backend
      try {
        const planos = await actionPlanService.list()
        if (planos && planos.length > 0) {
          const planosMapeados = planos.map((p) => ({
            id: p.id,
            titulo: p.title,
            prazo: p.deadline ? new Date(p.deadline).toLocaleDateString('pt-BR') : 'Em andamento',
            concluido: p.completed,
            conselheiro: p.conselheiroNome || 'Conselheiro Sábios',
          }))
          setPlanoDeAcao(planosMapeados)
        }
      } catch (err) {
        console.warn('Usando planos de ação padrão:', err)
      }
    }

    carregarDadosDashboard()
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
      rotulo: 'Histórico de Mentorias Realizadas',
      contador: cliente.historicoMentorias.length,
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
        <div className="mt-8 motion-safe:animate-aparecer [animation-delay:100ms]">
          <ProximaMentoriaCliente mentoria={proximaMentoria} />
        </div>

        {/* Plano de Ação das Mentorias */}
        <div className="mt-8 motion-safe:animate-aparecer [animation-delay:180ms]">
          <PlanoDeAcaoCliente acoesIniciais={planoDeAcao} />
        </div>

        {/* Abas: Conselheiros Recomendados & Histórico */}
        <div className="mt-10 motion-safe:animate-aparecer [animation-delay:260ms]">
          <NavegacaoAbas abas={abas} abaAtiva={abaAtiva} aoSelecionar={setAbaAtiva} />

          <div className="mt-6">
            {abaAtiva === 'plano' && (
              <ConselheirosRecomendadosCliente
                conselheiros={cliente.conselheirosRecomendados}
              />
            )}

            {abaAtiva === 'historico' && (
              <HistoricoMentoriasCliente
                historico={cliente.historicoMentorias}
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
