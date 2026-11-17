import PainelMensagens from '../../../components/mensagens/PainelMensagens'

const conversas = [
  {
    id: 'helena',
    nome: 'Helena Martins',
    descricao: 'Conselheira • Finanças & Gestão',
    foto: 'https://images.unsplash.com/photo-1758691737605-69a0e78bd193?auto=format&fit=crop&w=400&q=80',
    ultimaMensagem: 'Perfeito, até a nossa sessão...',
    mensagens: [
      { id: 'h1', texto: 'Olá! Revisei o material que você enviou. Está evoluindo muito bem.', propria: false, horario: 'Ontem, 16:40' },
      { id: 'h2', texto: 'Perfeito! Vou revisar antes da nossa sessão.', propria: true, horario: 'Ontem, 16:45' },
    ],
  },
]

export default function MensagensCliente() {
  return <PainelMensagens contatosIniciais={conversas} />
}
