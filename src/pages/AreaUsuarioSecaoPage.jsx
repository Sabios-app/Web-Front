import { Link, useParams } from 'react-router-dom'
import { dadosCliente, dadosConselheiro } from '../data/dadosUsuario'
import AreaUsuarioLayout from '../layouts/AreaUsuarioLayout'
import AgendaCliente from './usuario/cliente/AgendaCliente'
import MensagensCliente from './usuario/cliente/MensagensCliente'
import AgendaConselheiro from './usuario/conselheiro/AgendaConselheiro'
import AvaliacoesConselheiro from './usuario/conselheiro/AvaliacoesConselheiro'
import SolicitacoesPendentesConselheiro from './usuario/conselheiro/SolicitacoesPendentesConselheiro'
import ConfiguracoesUsuario from './usuario/compartilhado/ConfiguracoesUsuario'
import PlanoDeAcaoCliente from './usuario/cliente/PlanoDeAcaoCliente'

const titulos = {
  cliente: {
    agenda: 'Minha agenda',
    plano: 'Meu plano de ação',
    mensagens: 'Mensagens',
    perfil: 'Configurações',
  },
  conselheiro: {
    agenda: 'Minha agenda',
    solicitacoes: 'Solicitações pendentes',
    avaliacoes: 'Avaliações recebidas',
    perfil: 'Configurações',
  },
}

function ConteudoCliente({ secao, usuario }) {
  const secoes = {
    agenda: <AgendaCliente usuario={usuario} />,
    plano: <PlanoDeAcaoCliente acoesIniciais={usuario.planoDeAcao} />,
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
    perfil: <ConfiguracoesUsuario perfil="conselheiro" usuario={usuario} />,
  }

  return secoes[secao] ?? null
}

export default function AreaUsuarioSecaoPage() {
  const { perfil, secao } = useParams()
  const usuario = perfil === 'cliente' ? dadosCliente : dadosConselheiro
  const titulo = titulos[perfil]?.[secao] ?? 'Área do usuário'
  const conteudo =
    perfil === 'cliente' ? (
      <ConteudoCliente secao={secao} usuario={usuario} />
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
