// Dados de exemplo dos especialistas.
// Quando a API estiver pronta, troque estas listas pelas respostas do back-end.

const unsplash = (id, largura) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${largura}&q=80`

export const especialistas = [
  {
    id: 1,
    nome: 'Helena Martins',
    area: 'Finanças & Gestão',
    cidade: 'Aracaju, SE',
    descricao: 'Ex-diretora financeira com 32 anos de experiência',
    sobre:
      'Fui diretora financeira por mais de três décadas. Hoje ajudo pequenos negócios a organizar o caixa, definir preços e crescer sem sustos.',
    avaliacao: 4.9,
    totalAvaliacoes: 128,
    temas: ['Fluxo de caixa', 'Planejamento', 'Precificação'],
    valorSessao: 180,
    duracaoSessao: '1 hora',
    foto: unsplash('photo-1758691737605-69a0e78bd193', 800),
    trajetoria: [
      { cargo: 'Diretora financeira', empresa: 'Rede varejista', periodo: '2002 – 2022' },
      { cargo: 'Gerente de controladoria', empresa: 'Indústria têxtil', periodo: '1990 – 2002' },
    ],
    avaliacoes: [
      {
        autor: 'Marcos',
        negocio: 'Padaria',
        nota: 5,
        texto: 'Em uma conversa saí com uma planilha de caixa que uso até hoje.',
      },
      {
        autor: 'Juliana',
        negocio: 'Loja de roupas',
        nota: 5,
        texto: 'Me ajudou a entender quanto cobrar sem perder clientes.',
      },
    ],
    agenda: [
      { id: 'seg-10', diaSemana: 'Seg', data: '10/11', horarios: ['09:00', '10:30', '14:00'] },
      { id: 'ter-11', diaSemana: 'Ter', data: '11/11', horarios: ['09:00', '15:30'] },
      { id: 'qui-13', diaSemana: 'Qui', data: '13/11', horarios: ['10:30', '14:00', '16:00'] },
    ],
  },
  {
    id: 2,
    nome: 'Carlos Almeida',
    area: 'Vendas & Estratégia',
    cidade: 'Lagarto, SE',
    descricao: 'Liderou times comerciais por mais de 28 anos',
    sobre:
      'Passei a vida montando e treinando equipes de vendas. Gosto de ajudar quem está começando a vender mais, sem fórmulas mágicas.',
    avaliacao: 4.8,
    totalAvaliacoes: 96,
    temas: ['Vendas B2B', 'Negociação', 'Treinamento de equipe'],
    valorSessao: 160,
    duracaoSessao: '1 hora',
    foto: unsplash('photo-1750853752220-0facda334bd7', 800),
    trajetoria: [
      { cargo: 'Diretor comercial', empresa: 'Distribuidora de alimentos', periodo: '2005 – 2023' },
      { cargo: 'Gerente de vendas', empresa: 'Indústria de bebidas', periodo: '1995 – 2005' },
    ],
    avaliacoes: [
      {
        autor: 'Fernanda',
        negocio: 'Distribuidora',
        nota: 5,
        texto: 'Reorganizei minha equipe de vendas com as dicas dele e as metas finalmente saíram.',
      },
      {
        autor: 'Paulo',
        negocio: 'Oficina mecânica',
        nota: 4,
        texto: 'Conversa direta e prática. Aprendi a fazer orçamento que o cliente aceita.',
      },
    ],
    agenda: [
      { id: 'seg-10', diaSemana: 'Seg', data: '10/11', horarios: ['14:00', '16:00'] },
      { id: 'qua-12', diaSemana: 'Qua', data: '12/11', horarios: ['09:00', '10:30', '14:00'] },
      { id: 'sex-14', diaSemana: 'Sex', data: '14/11', horarios: ['09:00', '11:00'] },
    ],
  },
  {
    id: 3,
    nome: 'Roberto Salles',
    area: 'Liderança & Pessoas',
    cidade: 'Itabaiana, SE',
    descricao: 'Conselheiro e ex-VP de pessoas em empresas nacionais',
    sobre:
      'Cuidei de pessoas e de cultura em empresas grandes. Agora ajudo donos de negócio a contratar bem, liderar e manter a equipe motivada.',
    avaliacao: 5.0,
    totalAvaliacoes: 74,
    temas: ['Liderança', 'Cultura', 'Contratação'],
    valorSessao: 200,
    duracaoSessao: '1 hora',
    foto: unsplash('photo-1624245532111-8f4aba352ba9', 800),
    trajetoria: [
      { cargo: 'Vice-presidente de pessoas', empresa: 'Grupo de varejo nacional', periodo: '2008 – 2021' },
      { cargo: 'Diretor de RH', empresa: 'Construtora', periodo: '1994 – 2008' },
    ],
    avaliacoes: [
      {
        autor: 'Ana',
        negocio: 'Clínica odontológica',
        nota: 5,
        texto: 'Me mostrou como dar feedback para a equipe sem criar conflito.',
      },
      {
        autor: 'Ricardo',
        negocio: 'Restaurante',
        nota: 5,
        texto: 'Paramos de perder funcionários depois das mudanças que ele sugeriu.',
      },
    ],
    agenda: [
      { id: 'ter-11', diaSemana: 'Ter', data: '11/11', horarios: ['10:00', '15:00'] },
      { id: 'qui-13', diaSemana: 'Qui', data: '13/11', horarios: ['09:00', '14:00'] },
      { id: 'sex-14', diaSemana: 'Sex', data: '14/11', horarios: ['10:00', '16:00'] },
    ],
  },
]

export function buscarEspecialistaPorId(id) {
  return especialistas.find((especialista) => especialista.id === Number(id))
}

export const formatarReais = (valor) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export const formatarNota = (nota) => nota.toFixed(1).replace('.', ',')
