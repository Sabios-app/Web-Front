export const STATUS_MENTORIA = {
  REQUESTED: 'REQUESTED',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
  EXPIRED: 'EXPIRED',
}

const LEGADO_PARA_STATUS = {
  solicitada: STATUS_MENTORIA.REQUESTED,
  pendente: STATUS_MENTORIA.REQUESTED,
  confirmada: STATUS_MENTORIA.CONFIRMED,
  agendada: STATUS_MENTORIA.CONFIRMED,
  concluida: STATUS_MENTORIA.COMPLETED,
  'concluída': STATUS_MENTORIA.COMPLETED,
  realizada: STATUS_MENTORIA.COMPLETED,
  recusada: STATUS_MENTORIA.REJECTED,
  rejeitada: STATUS_MENTORIA.REJECTED,
  cancelada: STATUS_MENTORIA.CANCELED,
  expirada: STATUS_MENTORIA.EXPIRED,
}

export const CONFIG_STATUS_MENTORIA = {
  [STATUS_MENTORIA.REQUESTED]: {
    valor: STATUS_MENTORIA.REQUESTED,
    rotulo: 'Solicitada',
    classeBadge: 'border-amber-200 bg-amber-50 text-amber-900',
    ativa: true,
    encerrada: false,
  },
  [STATUS_MENTORIA.CONFIRMED]: {
    valor: STATUS_MENTORIA.CONFIRMED,
    rotulo: 'Confirmada',
    classeBadge: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    ativa: true,
    encerrada: false,
  },
  [STATUS_MENTORIA.COMPLETED]: {
    valor: STATUS_MENTORIA.COMPLETED,
    rotulo: 'Concluída',
    classeBadge: 'border-verde-petroleo/20 bg-campo text-verde-petroleo',
    ativa: false,
    encerrada: true,
  },
  [STATUS_MENTORIA.REJECTED]: {
    valor: STATUS_MENTORIA.REJECTED,
    rotulo: 'Recusada',
    classeBadge: 'border-red-200 bg-red-50 text-red-800',
    ativa: false,
    encerrada: true,
  },
  [STATUS_MENTORIA.CANCELED]: {
    valor: STATUS_MENTORIA.CANCELED,
    rotulo: 'Cancelada',
    classeBadge: 'border-red-200 bg-red-50 text-red-800',
    ativa: false,
    encerrada: true,
  },
  [STATUS_MENTORIA.EXPIRED]: {
    valor: STATUS_MENTORIA.EXPIRED,
    rotulo: 'Expirada',
    classeBadge: 'border-divisoria bg-campo/80 text-texto-secundario',
    ativa: false,
    encerrada: true,
  },
}

export const OPCOES_FILTRO_MENTORIA = [
  { valor: 'ALL', rotulo: 'Todas' },
  { valor: STATUS_MENTORIA.REQUESTED, rotulo: CONFIG_STATUS_MENTORIA.REQUESTED.rotulo },
  { valor: STATUS_MENTORIA.CONFIRMED, rotulo: CONFIG_STATUS_MENTORIA.CONFIRMED.rotulo },
  { valor: STATUS_MENTORIA.COMPLETED, rotulo: CONFIG_STATUS_MENTORIA.COMPLETED.rotulo },
  { valor: STATUS_MENTORIA.REJECTED, rotulo: CONFIG_STATUS_MENTORIA.REJECTED.rotulo },
  { valor: STATUS_MENTORIA.CANCELED, rotulo: CONFIG_STATUS_MENTORIA.CANCELED.rotulo },
  { valor: STATUS_MENTORIA.EXPIRED, rotulo: CONFIG_STATUS_MENTORIA.EXPIRED.rotulo },
]

export function normalizarStatusMentoria(status) {
  if (!status) return STATUS_MENTORIA.CONFIRMED
  const raw = String(status).trim()
  const upper = raw.toUpperCase()
  if (CONFIG_STATUS_MENTORIA[upper]) return upper
  const lower = raw.toLowerCase()
  return LEGADO_PARA_STATUS[lower] ?? upper
}

export function obterInfoStatusMentoria(status) {
  const normalizado = normalizarStatusMentoria(status)
  return (
    CONFIG_STATUS_MENTORIA[normalizado] ?? {
      valor: normalizado,
      rotulo: normalizado,
      classeBadge: 'border-divisoria bg-campo text-texto-secundario',
      ativa: false,
      encerrada: false,
    }
  )
}

export function filtrarMentoriasPorStatus(mentorias, filtro = 'ALL') {
  const lista = Array.isArray(mentorias) ? mentorias : []
  if (!filtro || filtro === 'ALL') return lista
  const filtroNormalizado = normalizarStatusMentoria(filtro)
  return lista.filter((item) => normalizarStatusMentoria(item?.status) === filtroNormalizado)
}
