// Dados de exemplo da página inicial (os mesmos do protótipo no Figma).
// Quando a API estiver pronta, os especialistas em destaque virão do back-end.

const unsplash = (id, largura) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${largura}&q=80`

export const imagens = {
  hero: unsplash('photo-1714974528737-3e6c7e4d11af', 1000),
  paraMentores: unsplash('photo-1577415124269-fc1140a69e91', 1000),
}

export const buscasFrequentes = ['Fluxo de caixa', 'Vendas', 'Liderança']

export const passos = [
  {
    numero: '01',
    titulo: 'Encontre a experiência certa',
    texto: 'Conte seu desafio e conheça especialistas que já passaram por ele.',
  },
  {
    numero: '02',
    titulo: 'Escolha o melhor horário',
    texto: 'Veja a agenda, reserve uma conversa e pague com total segurança.',
  },
  {
    numero: '03',
    titulo: 'Converse e avance',
    texto: 'Receba orientação prática e saia da sessão com um plano de ação.',
  },
]

// Os especialistas ficam em src/data/especialistas.js (usados também na página de perfil).
export { especialistas as especialistasEmDestaque } from '../../data/especialistas'

export const vantagensMentor = [
  'Defina seus horários',
  'Escolha seus valores',
  'Atenda de onde estiver',
  'Conte com nosso suporte',
]
