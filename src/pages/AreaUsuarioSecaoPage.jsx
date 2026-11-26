import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dadosCliente, dadosConselheiro } from '../data/dadosUsuario'
import useAuth from '../hooks/useAuth'
import AreaUsuarioLayout from '../layouts/AreaUsuarioLayout'
import { actionPlanService, mentoringService } from '../services/sabiosServices'
import {
  AVATAR_PADRAO,
  extrairListaPaginada,
  mapearMentoriaApi,
} from '../utils/especialistaMapper'
import { formatarDataBR } from '../utils/formatadores'
import AgendaCliente from './usuario/cliente/AgendaCliente'
import AvaliacoesCliente from './usuario/cliente/AvaliacoesCliente'
import MensagensCliente from './usuario/cliente/MensagensCliente'
import PlanoDeAcaoCliente from './usuario/cliente/PlanoDeAcaoCliente'
import ConfiguracoesUsuario from './usuario/compartilhado/ConfiguracoesUsuario'
import AgendaConselheiro from './usuario/conselheiro/AgendaConselheiro'
import AvaliacoesConselheiro from './usuario/conselheiro/AvaliacoesConselheiro'
import MensagensConselheiro from './usuario/conselheiro/MensagensConselheiro'
import SolicitacoesPendentesConselheiro from './usuario/conselheiro/SolicitacoesPendentesConselheiro'

const titulos = {
  cliente: {
    agenda: 'Minha agenda',
    plano: 'Meu plano de ação',
    avaliacoes: 'Minhas avaliações',
    mensagens: 'Mensagens',
    perfil: 'Configurações',
  },
  conselheiro: {
    agenda: 'Minha agenda',
    solicitacoes: 'Solicitações pendentes',
    mensagens: 'Mensagens',
    avaliacoes: 'Avaliações recebidas',
    perfil: 'Configurações',
  },
}

function ConteudoCliente({ secao, usuario, planoVersao }) {
  const secoes = {
    agenda: <AgendaCliente usuario={usuario} />,
    plano: <PlanoDeAcaoCliente key={planoVersao} acoesIniciais={usuario.planoDeAcao} />,
    avaliacoes: <AvaliacoesCliente />,
    mensagens: <MensagensCliente />,
    perfil: <ConfiguracoesUsuario perfil="cliente" usuario={usuario} />,
  }

  return secoes[secao] ?? null
}

function ConteudoConselheiro({ secao, usuario }) {
  const secoes = {
    agenda: <AgendaConselheiro usuario={usuario} />,
    solicitacoes: (
      <SolicitacoesPendentesConselheiro solicitacoesIniciais={usuario.solicitacoesPendentes} />
    ),
    avaliacoes: <AvaliacoesConselheiro avaliacoes={usuario.avaliacoesRecentes} />,
    mensagens: <MensagensConselheiro />,
    perfil: <ConfiguracoesUsuario perfil="conselheiro" usuario={usuario} />,
  }

  return secoes[secao] ?? null
}

export default function AreaUsuarioSecaoPage({ perfil }) {
  const { secao } = useParams()
  const { user } = useAuth()
  const [proximaMentoria, setProximaMentoria] = useState(null)
  const [historicoMentorias, setHistoricoMentorias] = useState([])
  const [planoDeAcao, setPlanoDeAcao] = useState([])
  const [planoVersao, setPlanoVersao] = useState(0)

  useEffect(() => {
    let ativo = true

    async function carregarDados() {
      if (perfil === 'cliente') {
        const [nextRes, listRes, planosRes] = await Promise.allSettled([
          mentoringService.getNextMentoring(),
          mentoringService.listMyMentorings(),
          actionPlanService.list(),
        ])

        if (!ativo) return

        if (nextRes.status === 'fulfilled' && nextRes.value && nextRes.value.id) {
          setProximaMentoria(mapearMentoriaApi(nextRes.value))
        } else {
          setProximaMentoria(null)
        }

        if (listRes.status === 'fulfilled') {
          setHistoricoMentorias(
            extrairListaPaginada(listRes.value).map(mapearMentoriaApi),
          )
        }

        if (planosRes.status === 'fulfilled') {
          const planos = extrairListaPaginada(planosRes.value)
          setPlanoDeAcao(
            planos.map((p) => ({
              id: p.id,
              titulo: p.title,
              dueDate: p.dueDate ?? null,
              prazo: p.dueDate
                ? new Date(p.dueDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                : p.deadline
                ? formatarDataBR(p.deadline)
                : 'Sem prazo',
              concluido: Boolean(p.completed),
              overdue: Boolean(p.overdue),
              assignedByCounselor: Boolean(p.assignedByCounselor),
              completedAt: p.completedAt ?? null,
              mentoringId: p.mentoringId ?? null,
              conselheiro: p.conselheiroNome || 'Conselheiro Sábios',
            })),
          )
          setPlanoVersao((v) => v + 1)
        }
      } else if (perfil === 'conselheiro') {
        const [nextRes, listRes] = await Promise.allSettled([
          mentoringService.getNextMentoring(),
          mentoringService.listMyMentorings(),
        ])

        if (!ativo) return

        if (nextRes.status === 'fulfilled' && nextRes.value && nextRes.value.id) {
          setProximaMentoria(mapearMentoriaApi(nextRes.value))
        } else {
          setProximaMentoria(null)
        }

        if (listRes.status === 'fulfilled') {
          setHistoricoMentorias(
            extrairListaPaginada(listRes.value).map(mapearMentoriaApi),
          )
        }
      }
    }

    carregarDados()
    return () => {
      ativo = false
    }
  }, [perfil])

  const usuarioBase = perfil === 'cliente' ? dadosCliente : dadosConselheiro
  const sessoesAgendadasConselheiro =
    historicoMentorias.length > 0
      ? historicoMentorias
      : usuarioBase.sessoesAgendadas || []

  const solicitacoesPendentesConselheiro =
    historicoMentorias.filter((m) => m.status === 'PENDING').length > 0
      ? historicoMentorias.filter((m) => m.status === 'PENDING')
      : usuarioBase.solicitacoesPendentes || []

  const usuario =
    perfil === 'cliente'
      ? {
          ...usuarioBase,
          nome: user?.name || usuarioBase.nome,
          foto: user?.avatarUrl || AVATAR_PADRAO,
          proximaMentoria,
          historicoMentorias,
          planoDeAcao,
        }
      : {
          ...usuarioBase,
          nome: user?.name || usuarioBase.nome,
          foto: user?.avatarUrl || usuarioBase.foto,
          proximaMentoria,
          historicoMentorias,
          sessoesAgendadas: sessoesAgendadasConselheiro,
          solicitacoesPendentes: solicitacoesPendentesConselheiro,
        }

  const titulo = titulos[perfil]?.[secao] ?? 'Área do usuário'
  const conteudo =
    perfil === 'cliente' ? (
      <ConteudoCliente secao={secao} usuario={usuario} planoVersao={planoVersao} />
    ) : (
      <ConteudoConselheiro secao={secao} usuario={usuario} />
    )

  return (
    <AreaUsuarioLayout usuario={usuario}>
      <div className="mx-auto max-w-275">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-dourado-texto">
              Área do {perfil}
            </p>
            <h1 className="mt-2 font-titulo text-4xl text-verde-titulo">{titulo}</h1>
          </div>
          <Link
            to={perfil === 'cliente' ? '/usuario/cliente' : '/usuario/conselheiro'}
            className="hidden rounded-full border border-divisoria bg-white px-5 py-3 font-bold text-verde-titulo hover:bg-campo sm:block"
          >
            Voltar à visão geral
          </Link>
        </div>
        {conteudo}
      </div>
    </AreaUsuarioLayout>
  )
}
