import PainelMensagens from '../../../components/mensagens/PainelMensagens'

const conversas = [
  {
    id: 'marcos',
    nome: 'Marcos Ribeiro',
    descricao: 'Cliente • Padaria Central',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    ultimaMensagem: 'Vou levar os números para nossa conversa.',
    mensagens: [
      { id: 'm1', texto: 'Olá, Helena! Separei os números do fluxo de caixa para nossa sessão.', propria: false, horario: 'Hoje, 09:20' },
      { id: 'm2', texto: 'Ótimo, Marcos. Com esses dados conseguiremos montar um plano bem prático.', propria: true, horario: 'Hoje, 09:26' },
      { id: 'm3', texto: 'Vou levar os números para nossa conversa.', propria: false, horario: 'Hoje, 09:28' },
    ],
  },
]

export default function MensagensConselheiro() {
  return <PainelMensagens contatosIniciais={conversas} />
}
