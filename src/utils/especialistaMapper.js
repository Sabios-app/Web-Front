import { formatarDataBR, formatarHoraBR } from './formatadores.js'
import { normalizarStatusMentoria, obterInfoStatusMentoria } from './mentoriaStatus.js'

export const AVATAR_PADRAO =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'

export function extrairListaPaginada(response) {
  if (Array.isArray(response)) return response
  if (response && Array.isArray(response.content)) return response.content
  return []
}

/**
 * Converte uma avaliação da API.
 * Contrato atual de `review.client`: apenas `{ name, avatarUrl }`.
 */
export function mapearAvaliacaoApi(review) {
  const client = review?.client ?? null
  return {
    id: review?.id ?? `${client?.name || 'cliente'}-${review?.createdAt || ''}`,
    autor: client?.name || 'Cliente Sábios',
    avatarUrl: client?.avatarUrl || AVATAR_PADRAO,
    negocio: review?.clientBusiness || 'Empreendedor Sábios',
    nota: Number(review?.rating ?? review?.nota ?? 5),
    texto: review?.comment ?? review?.texto ?? '',
    data: review?.createdAt ? formatarDataBR(review.createdAt) : '',
  }
}

/**
 * Converte um especialista da API para o formato da UI.
 * Contrato atual de `specialist.user`: apenas `{ id, name, avatarUrl }`.
 */
export function mapearEspecialistaApi(esp) {
  const user = esp?.user ?? null
  const specialty = esp?.specialty || 'Consultoria Geral'
  const temas = specialty
    .split(',')
    .map((tema) => tema.trim())
    .filter(Boolean)

  const avaliacoes = Array.isArray(esp?.reviews)
    ? esp.reviews.map(mapearAvaliacaoApi)
    : []

  return {
    id: esp?.id,
    userId: user?.id ?? null,
    nome: user?.name || esp?.name || 'Conselheiro Sábios',
    area: specialty,
    cidade: esp?.city || 'Atendimento online',
    foto: user?.avatarUrl || esp?.avatarUrl || AVATAR_PADRAO,
    avaliacao: Number(esp?.rating ?? 5.0),
    totalAvaliacoes: Number(esp?.totalReviews ?? avaliacoes.length),
    valorSessao: Number(esp?.hourlyRate ?? 150.0),
    duracaoSessao: esp?.sessionDuration || '1 hora',
    descricao: esp?.bio || 'Conselheiro experiente pronto para apoiar o seu negócio.',
    sobre: esp?.bio || 'Conselheiro experiente pronto para apoiar o seu negócio.',
    temas: temas.length > 0 ? temas : ['Estratégia'],
    trajetoria: Array.isArray(esp?.careerHistory) ? esp.careerHistory : [],
    avaliacoes,
    agenda: Array.isArray(esp?.agenda) ? esp.agenda : [],
  }
}

/**
 * Converte uma mentoria da API para o formato da UI.
 * Respeita `meetingLink: null` (sem gerar link falso) e lê apenas
 * `{ id, name, avatarUrl }` de `specialist.user` e `{ name, avatarUrl }` de `client`.
 */
export function mapearMentoriaApi(mentoring) {
  const specialistUser = mentoring?.specialist?.user ?? null
  const client = mentoring?.client ?? null
  const status = normalizarStatusMentoria(mentoring?.status)
  const infoStatus = obterInfoStatusMentoria(status)

  return {
    id: mentoring?.id,
    status,
    statusRotulo: infoStatus.rotulo,
    especialistaId: mentoring?.specialist?.id ?? null,
    especialistaNome: specialistUser?.name || 'Conselheiro Sábios',
    especialistaArea: mentoring?.specialist?.specialty || 'Mentoria',
    especialistaDescricao: mentoring?.specialist?.specialty || mentoring?.title || 'Mentoria Sábios',
    especialistaFoto: specialistUser?.avatarUrl || AVATAR_PADRAO,
    clienteNome: client?.name || 'Empreendedor Sábios',
    clienteFoto: client?.avatarUrl || AVATAR_PADRAO,
    data: formatarDataBR(mentoring?.scheduledAt),
    horario: formatarHoraBR(mentoring?.scheduledAt),
    emBreveTexto: infoStatus.rotulo,
    tema: mentoring?.title || mentoring?.description || 'Sessão de mentoria',
    resumo: mentoring?.description || mentoring?.doubts || 'Sessão registrada na plataforma.',
    notaDada: mentoring?.review?.rating ?? null,
    linkChamada: mentoring?.meetingLink || null,
    perguntasAnotadas: mentoring?.doubts ? [mentoring.doubts] : [],
  }
}
