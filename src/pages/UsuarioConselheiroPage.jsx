import {
  CalendarDays,
  Clock,
  Inbox,
  Star,
} from 'lucide-react'
import { useState } from 'react'
import BlocoDicas from '../components/feedback/BlocoDicas'
import NavegacaoAbas from '../components/navigation/NavegacaoAbas'
import { dadosConselheiro } from '../data/dadosUsuario'
import AreaUsuarioLayout from '../layouts/AreaUsuarioLayout'
import AvaliacoesConselheiro from './usuario/conselheiro/AvaliacoesConselheiro'
import CabecalhoConselheiro from './usuario/conselheiro/CabecalhoConselheiro'
import DisponibilidadeAgendaConselheiro from './usuario/conselheiro/DisponibilidadeAgendaConselheiro'
import ListaSessoesConselheiro from './usuario/conselheiro/ListaSessoesConselheiro'
import MetricasConselheiro from './usuario/conselheiro/MetricasConselheiro'
import ProximaSessaoConselheiro from './usuario/conselheiro/ProximaSessaoConselheiro'
import SolicitacoesPendentesConselheiro from './usuario/conselheiro/SolicitacoesPendentesConselheiro'

export default function UsuarioConselheiroPage() {
  const [conselheiro] = useState(dadosConselheiro)
  const [disponivel, setDisponivel] = useState(dadosConselheiro.disponivel)
  const [abaAtiva, setAbaAtiva] = useState('sessoes')
  const abas = [
    {
      id: 'sessoes',
      icone: CalendarDays,
      rotulo: 'Sessões Agendadas',
      contador: conselheiro.sessoesAgendadas.length + 1,
    },
    {
      id: 'solicitacoes',
      icone: Inbox,
      rotulo: 'Solicitações Pendentes',
      contador:
        conselheiro.solicitacoesPendentes.length > 0
          ? conselheiro.solicitacoesPendentes.length
          : undefined,
    },
    {
      id: 'disponibilidade',
      icone: Clock,
      rotulo: 'Grade de Horários',
    },
    {
      id: 'avaliacoes',
      icone: Star,
      rotulo: 'Depoimentos Recebidos',
    },
  ]
  const dicas = [
    {
      destaque: 'Ouça primeiro',
      texto:
        'Peça para o cliente contar a rotina do negócio antes de apontar soluções.',
    },
    {
      destaque: 'Foco em 3 ações',
      texto:
        'Combine no máximo três tarefas simples e objetivas para a semana seguinte.',
    },
    {
      destaque: 'Linguagem direta',
      texto:
        'Evite jargões complexos do mundo corporativo; valorize a realidade prática de quem empreende.',
    },
  ]

  function alternarDisponibilidade() {
    setDisponivel(!disponivel)
  }

  function irParaDisponibilidade() {
    setAbaAtiva('disponibilidade')
    const el = document.getElementById('secao-abas')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AreaUsuarioLayout usuario={conselheiro}>
      <div className="mx-auto max-w-275">
        {/* Banner de topo do Conselheiro */}
        <div className="motion-safe:animate-aparecer">
          <CabecalhoConselheiro
            conselheiro={conselheiro}
            disponivel={disponivel}
            onAlternarDisponibilidade={alternarDisponibilidade}
            onAbrirDisponibilidade={irParaDisponibilidade}
          />
        </div>

        {/* Métricas e resumo de impacto */}
        <div
          className="mt-8 motion-safe:animate-aparecer"
          style={{ animationDelay: '60ms' }}
        >
          <MetricasConselheiro metricas={conselheiro.metricas} />
        </div>

        {/* Próxima mentoria (Destaque urgente) */}
        <div
          className="mt-8 motion-safe:animate-aparecer"
          style={{ animationDelay: '120ms' }}
        >
          <ProximaSessaoConselheiro sessao={conselheiro.proximaSessao} />
        </div>

        {/* Seção com Abas de Gestão */}
        <div
          id="secao-abas"
          className="mt-10 motion-safe:animate-aparecer"
          style={{ animationDelay: '180ms' }}
        >
          <NavegacaoAbas
            id="abas-gestao"
            abas={abas}
            abaAtiva={abaAtiva}
            aoSelecionar={setAbaAtiva}
          />

          <div className="mt-6">
            {abaAtiva === 'sessoes' && (
              <ListaSessoesConselheiro
                sessoes={conselheiro.sessoesAgendadas}
              />
            )}

            {abaAtiva === 'solicitacoes' && (
              <SolicitacoesPendentesConselheiro
                solicitacoesIniciais={conselheiro.solicitacoesPendentes}
              />
            )}

            {abaAtiva === 'disponibilidade' && (
              <DisponibilidadeAgendaConselheiro
                diasIniciais={conselheiro.diasDisponiveis}
              />
            )}

            {abaAtiva === 'avaliacoes' && (
              <AvaliacoesConselheiro
                avaliacoes={conselheiro.avaliacoesRecentes}
              />
            )}
          </div>
        </div>

        {/* Card de boas práticas e suporte ao Conselheiro Sênior */}
        <BlocoDicas
          titulo="Dicas Sábios: Como conduzir conversas transformadoras"
          dicas={dicas}
        />
      </div>
    </AreaUsuarioLayout>
  )
}
