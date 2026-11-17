import {
  CalendarDays,
  Clock,
  Inbox,
  Lightbulb,
  Star,
} from 'lucide-react'
import { useState } from 'react'
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
        <CabecalhoConselheiro
          conselheiro={conselheiro}
          disponivel={disponivel}
          onAlternarDisponibilidade={alternarDisponibilidade}
          onAbrirDisponibilidade={irParaDisponibilidade}
        />

        {/* Métricas e resumo de impacto */}
        <div className="mt-8">
          <MetricasConselheiro metricas={conselheiro.metricas} />
        </div>

        {/* Próxima mentoria (Destaque urgente) */}
        <div className="mt-8">
          <ProximaSessaoConselheiro sessao={conselheiro.proximaSessao} />
        </div>

        {/* Seção com Abas de Gestão */}
        <div id="secao-abas" className="mt-10">
          <div className="flex border-b border-divisoria overflow-x-auto gap-2">
            <button
              type="button"
              onClick={() => setAbaAtiva('sessoes')}
              className={`flex min-h-12 items-center gap-2 border-b-2 px-5 text-base font-bold whitespace-nowrap transition-colors ${
                abaAtiva === 'sessoes'
                  ? 'border-verde-petroleo text-verde-petroleo'
                  : 'border-transparent text-texto-secundario hover:text-verde-petroleo'
              }`}
            >
              <CalendarDays size={18} />
              Sessões Agendadas
              <span className="rounded-full bg-campo px-2 py-0.5 text-xs">
                {conselheiro.sessoesAgendadas.length + 1}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setAbaAtiva('solicitacoes')}
              className={`flex min-h-12 items-center gap-2 border-b-2 px-5 text-base font-bold whitespace-nowrap transition-colors ${
                abaAtiva === 'solicitacoes'
                  ? 'border-verde-petroleo text-verde-petroleo'
                  : 'border-transparent text-texto-secundario hover:text-verde-petroleo'
              }`}
            >
              <Inbox size={18} />
              Solicitações Pendentes
              {conselheiro.solicitacoesPendentes.length > 0 && (
                <span className="rounded-full bg-dourado-aviso text-dourado-escuro px-2 py-0.5 text-xs font-bold">
                  {conselheiro.solicitacoesPendentes.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setAbaAtiva('disponibilidade')}
              className={`flex min-h-12 items-center gap-2 border-b-2 px-5 text-base font-bold whitespace-nowrap transition-colors ${
                abaAtiva === 'disponibilidade'
                  ? 'border-verde-petroleo text-verde-petroleo'
                  : 'border-transparent text-texto-secundario hover:text-verde-petroleo'
              }`}
            >
              <Clock size={18} />
              Grade de Horários
            </button>

            <button
              type="button"
              onClick={() => setAbaAtiva('avaliacoes')}
              className={`flex min-h-12 items-center gap-2 border-b-2 px-5 text-base font-bold whitespace-nowrap transition-colors ${
                abaAtiva === 'avaliacoes'
                  ? 'border-verde-petroleo text-verde-petroleo'
                  : 'border-transparent text-texto-secundario hover:text-verde-petroleo'
              }`}
            >
              <Star size={18} />
              Depoimentos Recebidos
            </button>
          </div>

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
        <div className="mt-12 rounded-3xl border border-dourado-claro/30 bg-dourado-aviso/50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-dourado-escuro shadow-xs">
              <Lightbulb size={24} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-titulo text-xl font-bold text-verde-titulo">
                Dicas Sábios: Como conduzir conversas transformadoras
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-verde-petroleo sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-dourado-escuro">•</span>
                  <span>
                    <strong>Ouça primeiro:</strong> Peça para o cliente contar a rotina do negócio antes de apontar soluções.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-dourado-escuro">•</span>
                  <span>
                    <strong>Foco em 3 ações:</strong> Combine no máximo três tarefas simples e objetivas para a semana seguinte.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-dourado-escuro">•</span>
                  <span>
                    <strong>Linguagem direta:</strong> Evite jargões complexos do mundo corporativo; valorize a realidade prática de quem empreende.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AreaUsuarioLayout>
  )
}
