import { Compass, History, Lightbulb } from 'lucide-react'
import { useState } from 'react'
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
          <div className="flex border-b border-divisoria overflow-x-auto gap-2">
            <button
              type="button"
              onClick={() => setAbaAtiva('plano')}
              className={`flex min-h-12 items-center gap-2 border-b-2 px-5 text-base font-bold whitespace-nowrap transition-colors ${
                abaAtiva === 'plano'
                  ? 'border-verde-petroleo text-verde-petroleo'
                  : 'border-transparent text-texto-secundario hover:text-verde-petroleo'
              }`}
            >
              <Compass size={18} />
              Conselheiros Recomendados para Você
            </button>

            <button
              type="button"
              onClick={() => setAbaAtiva('historico')}
              className={`flex min-h-12 items-center gap-2 border-b-2 px-5 text-base font-bold whitespace-nowrap transition-colors ${
                abaAtiva === 'historico'
                  ? 'border-verde-petroleo text-verde-petroleo'
                  : 'border-transparent text-texto-secundario hover:text-verde-petroleo'
              }`}
            >
              <History size={18} />
              Histórico de Mentorias Realizadas
              <span className="rounded-full bg-campo px-2 py-0.5 text-xs">
                {cliente.historicoMentorias.length}
              </span>
            </button>
          </div>

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
        <div className="mt-12 rounded-3xl border border-dourado-claro/30 bg-dourado-aviso/50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-dourado-escuro shadow-xs">
              <Lightbulb size={24} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-titulo text-xl font-bold text-verde-titulo">
                Como aproveitar ao máximo cada mentoria no Sábios
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-verde-petroleo sm:text-base">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-dourado-escuro">•</span>
                  <span>
                    <strong>Traga seus números e dúvidas reais:</strong> Quanto mais transparente você for com suas dificuldades, mais rápido o conselheiro poderá te guiar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-dourado-escuro">•</span>
                  <span>
                    <strong>Execute uma ação por vez:</strong> Não tente mudar tudo de um dia para o outro. Foque na primeira tarefa do seu plano de ação.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-dourado-escuro">•</span>
                  <span>
                    <strong>Peça novos encontros se precisar:</strong> A consistência de acompanhar seu progresso a cada 15 ou 30 dias evita erros caros no seu negócio.
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
