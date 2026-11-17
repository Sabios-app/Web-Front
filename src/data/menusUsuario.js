import {
  CalendarDays,
  FileText,
  Grid2x2,
  MessageSquare,
  Search,
  Settings,
} from 'lucide-react'

export const menusUsuario = {
  cliente: [
    { rota: '/usuario/cliente', texto: 'Visão geral', Icone: Grid2x2 },
    { rota: '/#especialistas', texto: 'Encontrar conselheiro', Icone: Search, externo: true },
    { rota: '/usuario/cliente/agenda', texto: 'Minha agenda', Icone: CalendarDays },
    { rota: '/usuario/cliente/plano', texto: 'Plano de ação', Icone: FileText },
    { rota: '/usuario/cliente/mensagens', texto: 'Mensagens', Icone: MessageSquare, contador: 2 },
    { rota: '/usuario/cliente/perfil', texto: 'Configurações', Icone: Settings },
  ],
  conselheiro: [
    { rota: '/usuario/conselheiro', texto: 'Visão geral', Icone: Grid2x2 },
    { rota: '/usuario/conselheiro/agenda', texto: 'Minha agenda', Icone: CalendarDays },
    { rota: '/usuario/conselheiro/solicitacoes', texto: 'Solicitações', Icone: MessageSquare, contador: 2 },
    { rota: '/usuario/conselheiro/avaliacoes', texto: 'Avaliações', Icone: FileText },
    { rota: '/usuario/conselheiro/perfil', texto: 'Configurações', Icone: Settings },
  ],
}
