import { Compass, History } from 'lucide-react'
import { useState } from 'react'
import BlocoDicas from '../components/feedback/BlocoDicas'
import NavegacaoAbas from '../components/navigation/NavegacaoAbas'
import { dadosCliente } from '../data/dadosUsuario'
import AreaUsuarioLayout from '../layouts/AreaUsuarioLayout'
import CabecalhoCliente from './usuario/cliente/CabecalhoCliente'
import ConselheirosRecomendadosCliente from './usuario/cliente/ConselheirosRecomendadosCliente'
import HistoricoMentoriasCliente from './usuario/cliente/HistoricoMentoriasCliente'
import PlanoDeAcaoCliente from './usuario/cliente/PlanoDeAcaoCliente'
import ProximaMentoriaCliente from './usuario/cliente/ProximaMentoriaCliente'

export default function UsuarioClientePage() {
  const [cliente] = useState(dadosCliente)
  const [abaAtiva, setAbaAtiva] = useState('plano')
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
        <CabecalhoCliente cliente={cliente} />

        {/* Próxima Mentoria (Destaque principal) */}
        <div className="mt-8">
          <ProximaMentoriaCliente mentoria={cliente.proximaMentoria} />
        </div>

        {/* Plano de Ação das Mentorias */}
        <div className="mt-8">
          <PlanoDeAcaoCliente acoesIniciais={cliente.planoDeAcao} />
        </div>

        {/* Abas: Conselheiros Recomendados & Histórico */}
        <div className="mt-10">
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
